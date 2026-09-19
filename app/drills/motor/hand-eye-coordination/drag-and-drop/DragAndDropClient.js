'use client';
import { isIdleFrameSkippable } from '@/lib/performance';

import React, { useState, useEffect, useRef, useCallback } from 'react';

import { 
  AlertCircle, Move, PenTool, RefreshCw, 
  Share2, TrendingUp, Volume2, VolumeX, 
  Users, Zap, ZapOff, LogOut
} from 'lucide-react';

import generateShareCard, { shareScoreCard } from '../../../../../components/ShareScoreCard';
import { getPlayerName } from '../../../../../lib/leaderboard';
import { drillAudio } from '../../../../../lib/drillAudio';
import { useDrillSensitivity } from '../../../../../lib/drillSensitivity';
import { drillFlash } from '../../../../../lib/drillFlash';
import { drillTimeout } from '../../../../../lib/drillTimeout';
import { MAX_LEVEL, getStartLevel, getDifficultyProgress, getComboBonusLevel } from '../../../../../lib/drillDifficulty';
import { getComboMultiplier, getFpsScoreGrade } from '../../../../../lib/scoringEngine';
import { createBackdropCache, getCanvasDpr, createHitRing, drawHitRings } from '../../../../../lib/canvasFx';
import DrillCountdown from '../../../../../components/drill/DrillCountdown';
import DrillAccordion from '../../../../../components/drill/DrillAccordion';
import FpsStartCard from '../../../../../components/drill/FpsStartCard';
import DrillResultCard from '../../../../../components/drill/DrillResultCard';
import useImmersiveMode from '@/lib/useImmersiveMode';
import useUnexpectedExitGuard from '@/lib/useUnexpectedExitGuard';

/**
 * Draws a hollow tactical bucket target container with empty inside space.
 */
function drawHollowBucketTarget(ctx, x, y, r, lifeRatio, isHighCombo) {
  const primaryEmerald = isHighCombo ? '#34d399' : '#10b981';
  const timerColor = lifeRatio < 0.25 ? '#ef4444' : (isHighCombo ? '#34d399' : '#10b981');

  ctx.save();

  // 1. Transparent / Faint radial gradient for empty inside space
  const insideGrad = ctx.createRadialGradient(x, y, 0, x, y, r);
  insideGrad.addColorStop(0, 'rgba(16, 185, 129, 0.08)');
  insideGrad.addColorStop(0.75, 'rgba(16, 185, 129, 0.02)');
  insideGrad.addColorStop(1, 'rgba(16, 185, 129, 0.0)');
  ctx.fillStyle = insideGrad;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();

  // 2. Inner subtle drop-zone guide ring
  ctx.strokeStyle = 'rgba(16, 185, 129, 0.3)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(x, y, Math.max(4, r * 0.7), 0, Math.PI * 2);
  ctx.stroke();

  // 3. Main Solid Emerald Bucket Rim
  ctx.strokeStyle = primaryEmerald;
  ctx.lineWidth = 3.5;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.stroke();

  ctx.restore();
}

/**
 * Draws the draggable ball with clean tactical styling.
 */
function drawDraggableBall(ctx, x, y, r, isDragging, isHighCombo) {
  ctx.save();

  const baseEmerald = (isDragging || isHighCombo) ? '#34d399' : '#10b981';

  // Solid clean emerald ball body without glow or white center dot
  ctx.fillStyle = baseEmerald;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();

  // Clean subtle inner border stroke for sharpness
  ctx.strokeStyle = '#059669';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.stroke();

  ctx.restore();
}

// ============================================================
// TUNING CONSTANTS
// ============================================================
const DRILL_DURATION = 45; // 45 seconds focused duration
const POINTS_PER_LEVEL = 250; // Aggressive progression
const ELITE_SCORE = 16000;
const STORAGE_KEY = 'skilldrills_motor_drag_and_drop_v2';
const OLD_STORAGE_KEY = 'dragAndDropPro_bestScore';

const getSavedData = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { bestScore: 0, bestCombo: 0, bestLevel: 1, totalSessions: 0, ...JSON.parse(raw) };
    const legacy = localStorage.getItem(OLD_STORAGE_KEY);
    if (legacy) return { bestScore: parseInt(legacy, 10) || 0, bestCombo: 0, bestLevel: 1, totalSessions: 0 };
    return { bestScore: 0, bestCombo: 0, bestLevel: 1, totalSessions: 0 };
  } catch (e) {
    return { bestScore: 0, bestCombo: 0, bestLevel: 1, totalSessions: 0 };
  }
};

const saveData = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {}
};

const getLevelConfig = (level) => {
  const p = getDifficultyProgress(level); // 0 -> 1 across L1..L15
  return {
    bucketR: Math.max(16, 42 - p * 24),
    ballR: Math.max(8, 14 - p * 5),
    speed: 120 + p * 280,
    maxLife: Math.max(1.2, 3.2 - p * 1.8),
    erratic: 0.2 + p * 1.2
  };
};

// ============================================================
// ACCORDION DATA
// ============================================================
const RULES_ITEMS = [
  { num: "1", text: "Target Drop", highlight: "+100 PTS", result: "×Combo Mult" },
  { num: "2", text: "Continuous Combo", highlight: "Up to 3.0× PTS", result: "Maintains Flow" },
  { num: "3", text: "Level Up", highlight: "+1 / 250 PTS", result: "Shrink & Accelerate" },
  { num: "4", text: "Miss / Timeout", highlight: "Penalty", result: "Resets Combo (-0.8s)" }
];

const ABOUT_TEXT = `Drag & Drop Precision Training is a mechanical motor drill designed to refine raw cursor control, spatial dragging accuracy, and deceleration release timing.

By click-holding, transporting, and releasing objects into moving target containers, players build smooth muscle memory for pixel-accurate computer navigation in competitive games and professional software.

As your score rises, target containers shrink and movement speed accelerates, continuously pushing your spatial control ceiling.`;

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function DragAndDropClient({ copy } = {}) {
  const [gameState, setGameState] = useState('start'); // 'start' | 'countdown' | 'playing' | 'gameOver'
  const [isFullscreen, setIsFullscreen] = useState(false);
  useImmersiveMode(isFullscreen); // locks the page behind while the drill fills the screen
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [flashEnabled, setFlashEnabled] = useState(true);
  const [pointerLocked, setPointerLocked] = useState(false);
  const universalSens = useDrillSensitivity();
  const [openAccordion, setOpenAccordion] = useState(null);
  const [isTouchOnlyDevice, setIsTouchOnlyDevice] = useState(false);
  const [countdownValue, setCountdownValue] = useState(3);
  const [flashes, setFlashes] = useState([]);

  // HUD & Best Stats State
  const [uiScore, setUiScore] = useState(0);
  const [uiTimeLeft, setUiTimeLeft] = useState(DRILL_DURATION);
  const [bestScore, setBestScore] = useState(0);
  const [bestCombo, setBestCombo] = useState(0);
  const [bestLevel, setBestLevel] = useState(1);
  const [isNewBest, setIsNewBest] = useState(false);

  const [analytics, setAnalytics] = useState({
    accuracy: 100, drops: 0, misses: 0, timeouts: 0, 
    bestCombo: 0, levelReached: 1, grade: null
  });

  // DOM & Engine Refs
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  const lastTimeRef = useRef(DRILL_DURATION);
  const gameActiveRef = useRef(false);
  const startingRef = useRef(false);
  const countdownTimeoutsRef = useRef([]);
  const backdropCacheRef = useRef(null);
  const bestLevelRunRef = useRef(1);

  const engine = useRef({
    ball: { x: 0, y: 0, r: 12, dragging: false },
    bucket: { x: 0, y: 0, r: 36, vx: 0, vy: 0, tx: 0, ty: 0 },
    lifeTimer: 0, maxLife: 3.2,
    crosshair: { x: 0, y: 0, initialized: false },
    score: 0, level: 1, combo: 0, bestCombo: 0, timeLeft: DRILL_DURATION,
    drops: 0, misses: 0, timeouts: 0, totalActions: 0,
    particles: [], hitMarkers: [], hitRings: [], screenShake: 0,
    logicalWidth: 800, logicalHeight: 450
  });

  const triggerFlash = useCallback(() => {
    if (!drillFlash.isEnabled()) return;
    const id = Date.now() + Math.random();
    setFlashes((f) => [...f, { id }]);
    setTimeout(() => setFlashes((f) => f.filter((x) => x.id !== id)), 480);
  }, []);

  const createHitMarker = useCallback((x, y) => {
    engine.current.hitMarkers.push({ x, y, life: 1.0 });
  }, []);

  const createExplosion = useCallback((x, y, color) => {
    for (let i = 0; i < 12; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1.0 + Math.random() * 3.5;
      engine.current.particles.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 0.8,
        color
      });
    }
  }, []);

  const spawnPositions = useCallback((w, h, cfg) => {
    const pad = cfg.bucketR + 30;
    const e = engine.current;

    e.ball.x = pad + Math.random() * Math.max(10, w - pad * 2);
    e.ball.y = pad + Math.random() * Math.max(10, h - pad * 2);
    e.ball.r = cfg.ballR;
    e.ball.dragging = false;

    e.bucket.r = cfg.bucketR;
    e.bucket.x = pad + Math.random() * Math.max(10, w - pad * 2);
    e.bucket.y = pad + Math.random() * Math.max(10, h - pad * 2);
    e.bucket.tx = e.bucket.x;
    e.bucket.ty = e.bucket.y;
    e.bucket.vx = 0;
    e.bucket.vy = 0;

    const dist = Math.hypot(e.ball.x - e.bucket.x, e.ball.y - e.bucket.y);
    if (dist < e.bucket.r * 3) {
      spawnPositions(w, h, cfg);
      return;
    }

    e.lifeTimer = cfg.maxLife;
    e.maxLife = cfg.maxLife;
  }, []);

  // Touch Device Detection & Storage Loading
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setSoundEnabled(drillAudio.isEnabled());
      setFlashEnabled(drillFlash.isEnabled());
      const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
      const isTouchCapable = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      setIsTouchOnlyDevice(isTouchCapable && !hasFinePointer);

      const saved = getSavedData();
      setBestScore(saved.bestScore || 0);
      setBestCombo(saved.bestCombo || 0);
      setBestLevel(saved.bestLevel || 1);
    }
  }, []);

  // Cleanup Countdown Timeouts
  useEffect(() => {
    return () => {
      countdownTimeoutsRef.current.forEach(clearTimeout);
    };
  }, []);

  const handleExitDrill = useCallback(() => {
    markIntentionalExit();
    countdownTimeoutsRef.current.forEach(clearTimeout);
    countdownTimeoutsRef.current = [];
    startingRef.current = false;
    gameActiveRef.current = false;

    setIsFullscreen(false);
    if (document.pointerLockElement) {
      document.exitPointerLock();
    }
    setGameState('start');
  }, []);

  const { markIntentionalExit } = useUnexpectedExitGuard({
    active: gameState === 'playing' || gameState === 'countdown',
    onUnexpectedExit: handleExitDrill,
  });

  // End Game Management
  const endGame = useCallback(() => {
    gameActiveRef.current = false;
    startingRef.current = false;
    setGameState('gameOver');
    if (document.pointerLockElement) document.exitPointerLock();
    
    const e = engine.current;
    const totalAttempts = e.totalActions;
    const finalAccuracy = totalAttempts > 0 ? Math.round((e.drops / totalAttempts) * 100) : 0;

    const rating = getFpsScoreGrade(e.score, ELITE_SCORE);
    const grade = { letter: rating.grade, label: rating.label, color: rating.color };

    setAnalytics({
      accuracy: finalAccuracy, drops: e.drops, misses: e.misses,
      timeouts: e.timeouts, bestCombo: e.bestCombo, levelReached: e.level,
      grade
    });

    setUiScore(e.score);

    const prevSaved = getSavedData();
    const isNewHigh = e.score > prevSaved.bestScore;
    setIsNewBest(isNewHigh);

    const runBestLevel = Math.max(prevSaved.bestLevel, bestLevelRunRef.current);
    const updatedData = {
      bestScore: Math.max(prevSaved.bestScore, e.score),
      bestCombo: Math.max(prevSaved.bestCombo, e.bestCombo),
      bestLevel: runBestLevel,
      totalSessions: (prevSaved.totalSessions || 0) + 1
    };
    saveData(updatedData);

    setBestScore(updatedData.bestScore);
    setBestCombo(updatedData.bestCombo);
    setBestLevel(updatedData.bestLevel);

    drillAudio.playSessionEnd();
  }, []);

  // Enter Drill (Start Countdown -> Playing)
  const enterDrill = useCallback(async () => {
    if (startingRef.current) return;
    startingRef.current = true;

    countdownTimeoutsRef.current.forEach(clearTimeout);
    countdownTimeoutsRef.current = [];

    drillAudio.init();

    setIsNewBest(false);
    setUiScore(0);
    setUiTimeLeft(DRILL_DURATION);
    lastTimeRef.current = DRILL_DURATION;

    const saved = getSavedData();
    const startLevel = getStartLevel(saved.bestLevel);
    bestLevelRunRef.current = startLevel;

    setAnalytics({
      accuracy: 100, drops: 0, misses: 0, timeouts: 0,
      bestCombo: 0, levelReached: startLevel, grade: null
    });

    const w = engine.current.logicalWidth || 800;
    const h = engine.current.logicalHeight || 450;
    const config = getLevelConfig(startLevel);

    engine.current = {
      ball: { x: 0, y: 0, r: 12, dragging: false },
      bucket: { x: 0, y: 0, r: 36, vx: 0, vy: 0, tx: 0, ty: 0 },
      lifeTimer: config.maxLife, maxLife: config.maxLife,
      crosshair: { ...engine.current.crosshair },
      score: 0, level: startLevel, combo: 0, bestCombo: 0, timeLeft: DRILL_DURATION,
      drops: 0, misses: 0, timeouts: 0, totalActions: 0,
      particles: [], hitMarkers: [], hitRings: [], screenShake: 0, logicalWidth: w, logicalHeight: h
    };

    spawnPositions(w, h, config);

    setIsFullscreen(true);

    setGameState('countdown');
    setCountdownValue(3);
    drillAudio.playCountdownTick();

    const t1 = setTimeout(() => { setCountdownValue(2); drillAudio.playCountdownTick(); }, 700);
    const t2 = setTimeout(() => { setCountdownValue(1); drillAudio.playCountdownTick(); }, 1400);
    const t3 = setTimeout(() => { setCountdownValue('GO'); drillAudio.playGo(); }, 2100);
    const t4 = setTimeout(() => {
      gameActiveRef.current = true;
      startingRef.current = false;
      setGameState('playing');
      if (canvasRef.current && !document.pointerLockElement) {
        canvasRef.current.requestPointerLock().catch(() => {});
      }
    }, 2450);

    countdownTimeoutsRef.current = [t1, t2, t3, t4];
  }, [spawnPositions]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleExitDrill();
      }
    };
    const handlePointerLockChange = () => {
      const isLocked = document.pointerLockElement === canvasRef.current;
      setPointerLocked(isLocked);
      if (!isLocked && (gameState === 'playing' || gameState === 'countdown')) {
        handleExitDrill();
      }
    };
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement && (gameState === 'playing' || gameState === 'countdown')) {
        handleExitDrill();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('pointerlockchange', handlePointerLockChange);
    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('pointerlockchange', handlePointerLockChange);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [gameState, handleExitDrill]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (gameState !== 'playing' || !pointerLocked || !canvasRef.current) return;
      const w = engine.current.logicalWidth;
      const h = engine.current.logicalHeight;
      const sens = universalSens;
      engine.current.crosshair.x = Math.max(0, Math.min(w, engine.current.crosshair.x + e.movementX * sens));
      engine.current.crosshair.y = Math.max(0, Math.min(h, engine.current.crosshair.y + e.movementY * sens));

      if (engine.current.ball.dragging) {
        engine.current.ball.x = engine.current.crosshair.x;
        engine.current.ball.y = engine.current.crosshair.y;
      }
    };

    const handleMouseDown = (e) => {
      if (e.target.tagName === 'BUTTON' || e.target.closest('button')) return;
      if (!containerRef.current || !containerRef.current.contains(e.target)) return;

      if (gameState === 'playing' && pointerLocked) {
        const eRef = engine.current;
        const ch = eRef.crosshair;
        const dist = Math.hypot(ch.x - eRef.ball.x, ch.y - eRef.ball.y);

        if (dist <= eRef.ball.r + 14) {
          eRef.ball.dragging = true;
          drillAudio.playBeep(400, 'sine', 0.05);
        }
      }
    };

    const handleMouseUp = () => {
      if (gameState === 'playing' && pointerLocked) {
        const eRef = engine.current;
        if (eRef.ball.dragging) {
          eRef.ball.dragging = false;
          eRef.totalActions++;

          const dist = Math.hypot(eRef.ball.x - eRef.bucket.x, eRef.ball.y - eRef.bucket.y);
          if (dist <= eRef.bucket.r) {
            eRef.drops++;
            eRef.combo++;
            if (eRef.combo > eRef.bestCombo) eRef.bestCombo = eRef.combo;

            const levelMult = 1 + getDifficultyProgress(eRef.level) * 0.5;
            eRef.score += Math.round(100 * getComboMultiplier(eRef.combo) * levelMult);

            const rawLevel = Math.floor(eRef.score / POINTS_PER_LEVEL) + 1 + getComboBonusLevel(eRef.combo);
            eRef.level = Math.max(eRef.level, rawLevel);
            bestLevelRunRef.current = Math.max(bestLevelRunRef.current, eRef.level);

            drillAudio.playHit();
            const bucketColor = eRef.combo >= 10 ? '#34d399' : '#10b981';
            createExplosion(eRef.bucket.x, eRef.bucket.y, bucketColor);
            eRef.hitRings.push(createHitRing(eRef.bucket.x, eRef.bucket.y, eRef.bucket.r, bucketColor));
            createHitMarker(eRef.ball.x, eRef.ball.y);
            setUiScore(eRef.score);

            const cfg = getLevelConfig(eRef.level);
            spawnPositions(eRef.logicalWidth, eRef.logicalHeight, cfg);
          } else {
            eRef.misses++;
            eRef.combo = 0;
            eRef.screenShake = 6;
            triggerFlash();
            drillAudio.playPenalty();
            createExplosion(eRef.ball.x, eRef.ball.y, '#ef4444');
          }
        }
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [gameState, pointerLocked, universalSens, triggerFlash, createExplosion, createHitMarker, spawnPositions]);

  useEffect(() => {
    const cvs = canvasRef.current;
    const container = containerRef.current;
    if (!cvs || !container) return;
    const ctx = cvs.getContext('2d', { alpha: false });

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        if (width > 0 && height > 0) {
          const dpr = getCanvasDpr();
          cvs.width = Math.ceil(width * dpr);
          cvs.height = Math.ceil(height * dpr);
          engine.current.logicalWidth = width;
          engine.current.logicalHeight = height;

          backdropCacheRef.current = createBackdropCache(width, height, (bCtx, w, h) => {
            bCtx.fillStyle = '#050508';
            bCtx.fillRect(0, 0, w, h);

            bCtx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
            bCtx.lineWidth = 1;
            const gridSize = 40;
            for (let x = 0; x < w; x += gridSize) {
              bCtx.beginPath(); bCtx.moveTo(x, 0); bCtx.lineTo(x, h); bCtx.stroke();
            }
            for (let y = 0; y < h; y += gridSize) {
              bCtx.beginPath(); bCtx.moveTo(0, y); bCtx.lineTo(w, y); bCtx.stroke();
            }
          });

          if (!engine.current.crosshair.initialized) {
            engine.current.crosshair.x = width / 2;
            engine.current.crosshair.y = height / 2;
            engine.current.crosshair.initialized = true;
          }
        }
      }
    });
    resizeObserver.observe(container);

    let lastTime = performance.now();

    const loop = (time) => {
      if (isIdleFrameSkippable(gameState === 'playing', time, lastTime)) {
        animationRef.current = requestAnimationFrame(loop);
        return;
      }
      const deltaTimeMs = time - lastTime;
      lastTime = time;
      const dt = Math.min(deltaTimeMs / 1000, 0.1);
      const e = engine.current;
      const dpr = getCanvasDpr();
      const w = e.logicalWidth;
      const h = e.logicalHeight;

      if (gameState === 'playing' && pointerLocked) {
        if (e.timeLeft > 0) e.timeLeft -= dt;
        if (e.timeLeft <= 0) {
          e.timeLeft = 0;
          setUiTimeLeft(0);
          endGame();
          return;
        }

        const intTime = Math.ceil(e.timeLeft);
        if (intTime !== lastTimeRef.current) {
          setUiTimeLeft(intTime);
          lastTimeRef.current = intTime;
        }

        const config = getLevelConfig(e.level);
        const b = e.bucket;

        const distToTarget = Math.hypot(b.tx - b.x, b.ty - b.y);
        if (distToTarget < 15 || Math.random() < dt * config.erratic) {
          const pad = b.r + 30;
          b.tx = pad + Math.random() * Math.max(10, w - pad * 2);
          b.ty = pad + Math.random() * Math.max(10, h - pad * 2);
        }

        const angle = Math.atan2(b.ty - b.y, b.tx - b.x);
        b.vx = Math.cos(angle) * config.speed;
        b.vy = Math.sin(angle) * config.speed;
        b.x += b.vx * dt;
        b.y += b.vy * dt;

        if (drillTimeout.isEnabled()) e.lifeTimer -= dt;
        if (drillTimeout.isEnabled() && e.lifeTimer <= 0) {
          e.timeouts++;
          e.combo = 0;
          e.screenShake = 6;
          triggerFlash();
          drillAudio.playPenalty();
          createExplosion(e.ball.x, e.ball.y, '#ef4444');
          spawnPositions(w, h, config);
        }
      }

      ctx.save();
      ctx.scale(dpr, dpr);

      if (e.screenShake > 0) {
        const sx = (Math.random() - 0.5) * e.screenShake;
        const sy = (Math.random() - 0.5) * e.screenShake;
        ctx.translate(sx, sy);
        e.screenShake *= 0.85;
        if (e.screenShake < 0.5) e.screenShake = 0;
      }

      if (backdropCacheRef.current) {
        ctx.drawImage(backdropCacheRef.current, 0, 0, w, h);
      } else {
        ctx.fillStyle = '#050508';
        ctx.fillRect(0, 0, w, h);
      }

      if (gameState === 'playing' || gameState === 'start') {
        const b = e.bucket;
        const lifeRatio = Math.max(0, e.lifeTimer / e.maxLife);
        const isHighCombo = e.combo >= 10;

        drawHollowBucketTarget(ctx, b.x, b.y, b.r, lifeRatio, isHighCombo);

        const ball = e.ball;
        drawDraggableBall(ctx, ball.x, ball.y, ball.r, ball.dragging, isHighCombo);
      }

      // Render particles
      for (let i = e.particles.length - 1; i >= 0; i--) {
        const p = e.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= dt * 2.5;
        if (p.life <= 0) { e.particles.splice(i, 1); continue; }
        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size || 2.5, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1.0;

      drawHitRings(ctx, e.hitRings, dt);

      ctx.lineWidth = 2.0;
      for (let i = e.hitMarkers.length - 1; i >= 0; i--) {
        const hm = e.hitMarkers[i];
        hm.life -= dt * 4.5;
        if (hm.life <= 0) { e.hitMarkers.splice(i, 1); continue; }
        ctx.globalAlpha = hm.life; ctx.strokeStyle = '#ffffff';
        const s = 6 + (1 - hm.life) * 8;
        ctx.beginPath();
        ctx.moveTo(hm.x - s, hm.y - s); ctx.lineTo(hm.x + s, hm.y + s);
        ctx.moveTo(hm.x + s, hm.y - s); ctx.lineTo(hm.x - s, hm.y + s);
        ctx.stroke();
      }
      ctx.globalAlpha = 1.0;

      const ch = e.crosshair;
      if (ch.initialized && (gameState === 'playing' || gameState === 'start')) {
        ctx.save();
        ctx.shadowColor = 'rgba(0, 0, 0, 0.9)';
        ctx.shadowBlur = 3;
        ctx.strokeStyle = '#ffffff';
        ctx.fillStyle = '#ffffff';

        ctx.lineWidth = 2;
        ctx.beginPath(); ctx.arc(ch.x, ch.y, 14, 0, Math.PI * 2); ctx.stroke();

        ctx.lineWidth = 1.5;
        const gap = 5;
        ctx.beginPath();
        ctx.moveTo(ch.x, ch.y - 14); ctx.lineTo(ch.x, ch.y - gap);
        ctx.moveTo(ch.x, ch.y + 14); ctx.lineTo(ch.x, ch.y + gap);
        ctx.moveTo(ch.x - 14, ch.y); ctx.lineTo(ch.x - gap, ch.y);
        ctx.moveTo(ch.x + 14, ch.y); ctx.lineTo(ch.x + gap, ch.y);
        ctx.stroke();

        ctx.beginPath(); ctx.arc(ch.x, ch.y, 2, 0, Math.PI * 2); ctx.fill();
        ctx.restore();
      }

      ctx.restore();
      if (gameState !== 'gameOver') {
        animationRef.current = requestAnimationFrame(loop);
      }
    };

    animationRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animationRef.current);
      resizeObserver.disconnect();
    };
  }, [gameState, pointerLocked, endGame, triggerFlash, createExplosion, spawnPositions]);

  const shareDrillLink = useCallback(async () => {
    const url = 'https://skilldrills.online/drills/motor/hand-eye-coordination/drag-and-drop';
    try {
      const canvas = generateShareCard({
        score: uiScore,
        bestScore,
        accuracy: analytics.accuracy,
        bestCombo: analytics.bestCombo,
        rating: { letter: analytics.grade?.letter || 'C', label: analytics.grade?.label || 'Keep Going', emoji: '🎯' },
        newBest: isNewBest,
        drillName: 'Drag & Drop Precision',
        playerName: getPlayerName(),
      });
      await shareScoreCard(url, canvas);
    } catch (e) {
      const text = `🎯 I scored ${uiScore} PTS (Level ${analytics.levelReached}) on Drag & Drop Precision! Accuracy: ${analytics.accuracy}%. Test your reflexes at skilldrills.online!`;
      if (typeof navigator !== 'undefined' && navigator.share) {
        navigator.share({ title: 'My Drag & Drop Precision Score', text, url }).catch(() => {});
      } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
        navigator.clipboard.writeText(text);
        alert('Score card copied to clipboard!');
      }
    }
  }, [uiScore, bestScore, analytics, isNewBest]);

  return (
    <div className="min-h-screen bg-[#050508] text-white flex flex-col font-sans select-none">
      {/* ── MAIN CONTENT AREA ── */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6 flex flex-col gap-6">
        {/* Title & AIO Header */}
        {!isFullscreen && (
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              <span data-seo-kw="1">{copy?.title || "Drag & Drop Mouse Trainer"}</span>
            </h1>
            <p className="text-[13px] text-slate-400 leading-relaxed">
              A drag and drop test measures how accurately you can pick up an object, carry it with the mouse button held down, and release it on a target. Dragging is measurably slower and more error-prone than simply pointing at the same target with the same device (MacKenzie, Sellen &amp; Buxton, 1991), and the carry obeys the Steering Law: the time to stay inside a corridor scales with its length divided by its width, so a lane half as wide takes about twice as long to cross cleanly (Accot &amp; Zhai, 1997).
            </p>
          </div>
        )}

        {/* Live Stat Cards */}
        {!isFullscreen && (
          <div className="grid grid-cols-4 gap-2 w-full -mb-2">
            {[
              { label: "Score", val: uiScore },
              { label: "Time Left", val: `${uiTimeLeft}s`, highlight: uiTimeLeft <= 10 },
              { label: "Accuracy", val: `${analytics.accuracy}%`, color: "text-blue-400" },
              { label: "Best Score", val: bestScore, color: "text-amber-400" },
            ].map((s, i) => (
              <div key={i} className="border border-white/[0.06] bg-white/[0.015] px-2 py-2 rounded-xl text-center">
                <div className="text-[9px] sm:text-[10px] uppercase font-bold text-slate-500 tracking-wider mb-0.5">{s.label}</div>
                <div className={`text-xs sm:text-sm md:text-base font-black tabular-nums truncate ${s.highlight ? "text-red-400 animate-pulse" : s.color || "text-white"}`}>{s.val}</div>
              </div>
            ))}
          </div>
        )}

        {/* Game Stage Container */}
        <div 
          ref={containerRef} 
          onContextMenu={(e) => { if (gameActiveRef.current) e.preventDefault(); }}
          className={`overflow-hidden flex flex-col transition-all duration-150 select-none bg-[#080811] text-white ${
            isFullscreen 
              ? 'fixed inset-0 z-[100] w-screen h-[100dvh] bg-[#050508] flex flex-col items-center justify-center' 
              : 'w-full rounded-2xl aspect-video min-h-[460px] md:min-h-[500px] max-h-[88vh] max-md:portrait:aspect-[3/4] max-md:portrait:min-h-[420px] max-md:portrait:max-h-[76vh] max-md:landscape:min-h-[340px] max-md:landscape:max-h-[85vh] bg-[#080811] border border-white/10 relative overflow-hidden flex flex-col'
          }`}
          style={{ touchAction: gameActiveRef.current ? 'none' : 'auto' }}
        >
          {/* DOM Flash Overlay */}
          {flashes.map((f) => (
            <div key={f.id} className="fx-flash fx-flash-red" />
          ))}

          {/* IN-BOX OVERLAY HUD */}
          {(gameState === 'playing' || gameState === 'countdown') && (
            <>
              <div className="absolute top-4 left-4 z-30 pointer-events-none">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-white/50">Score</p>
                <p className="text-2xl sm:text-3xl font-bold text-white tabular-nums leading-tight">{uiScore}</p>
              </div>
              <div className="absolute top-4 right-4 z-30 pointer-events-none text-right">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-white/50">Time</p>
                <p className={`text-2xl sm:text-3xl font-bold tabular-nums leading-tight ${uiTimeLeft <= 10 ? 'text-red-400' : 'text-white'}`}>{uiTimeLeft}s</p>
              </div>
            </>
          )}

          {/* IN-GAME HUD SOUND + FLASH TOGGLES */}
          {(gameState === 'playing' || gameState === 'countdown') && (
            <div className="absolute bottom-4 right-4 z-40 flex items-center gap-2">
              <button
                onPointerDown={(e) => e.stopPropagation()}
                onClick={(e) => {
                  e.stopPropagation();
                  setFlashEnabled((v) => {
                    drillFlash.setEnabled(!v);
                    return !v;
                  });
                }}
                className="p-2.5 rounded-full bg-black/60 border border-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
                title="Toggle Miss Flash"
              >
                {flashEnabled ? <Zap className="w-4 h-4 text-red-400" /> : <ZapOff className="w-4 h-4 text-slate-500" />}
              </button>
              <button
                onPointerDown={(e) => e.stopPropagation()}
                onClick={(e) => {
                  e.stopPropagation();
                  setSoundEnabled((v) => {
                    drillAudio.setEnabled(!v);
                    return !v;
                  });
                }}
                className="p-2.5 rounded-full bg-black/60 border border-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
                title="Toggle Sound"
              >
                {soundEnabled ? <Volume2 className="w-4 h-4 text-blue-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
              </button>
            </div>
          )}

          <canvas 
            ref={canvasRef} 
            className={`block absolute top-0 left-0 w-full h-full touch-none z-10 ${gameState === 'playing' ? 'cursor-none' : ''}`} 
          />

          {/* START MODAL */}
          {gameState === 'start' && (
            <FpsStartCard
              icon={Move}
              accent="emerald"
              title={copy?.title || "Drag & Drop Mouse Trainer"}
              subtitle={copy?.subtitle || "Spatial Drag & Drop Target Alignment • 15 Levels"}
              buttonText={copy?.startButtonText || "START DRILL"}
              isTouchOnlyDevice={isTouchOnlyDevice}
              onStart={enterDrill}
            />
          )}

          {/* COUNTDOWN OVERLAY */}
          {gameState === 'countdown' && (
            <DrillCountdown value={countdownValue} subtitle="GET READY" />
          )}

          {/* END SCREEN — Universal Result Card */}
          {gameState === 'gameOver' && analytics.grade && (
            <DrillResultCard
              accent="emerald"
              grade={analytics.grade}
              score={uiScore}
              isNewBest={isNewBest}
              playAgainText={copy?.playAgainText || "Play Again"}
              shareText={copy?.shareText || "Share Score"}
              exitText={copy?.exitText || "Exit"}
              stats={[
                { value: analytics.accuracy, suffix: "%", label: copy?.accuracyLabel || "Accuracy" },
                { value: analytics.drops, label: copy?.targetDropsLabel || "Target Drops" },
                { value: `${analytics.bestCombo}x`, label: copy?.maxComboLabel || "Max Combo" },
                { value: `Lv. ${analytics.levelReached}`, label: copy?.peakLevelLabel || "Peak Level" },
              ]}
              onPlayAgain={enterDrill}
              onShare={shareDrillLink}
              onExit={handleExitDrill}
            />
          )}
        </div>

        {/* ── ACCORDIONS ── */}
        {!isFullscreen && (
          <div className="[&>div]:!mt-0 font-sans">
            <DrillAccordion
              id="rules"
              title={copy?.rulesTitle || "Drill Instructions & Scoring System"}
              isOpen={openAccordion === 'rules'}
              onToggle={() => setOpenAccordion(openAccordion === 'rules' ? null : 'rules')}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(copy?.rulesItems || RULES_ITEMS).map((item, i) => (
                  <RuleItem key={i} num={item.num} text={item.text} highlight={item.highlight} result={item.result} />
                ))}
              </div>
            </DrillAccordion>

            <DrillAccordion
              id="about"
              title={copy?.aboutTitle || "About Drag & Drop Mouse Trainer"}
              isOpen={openAccordion === 'about'}
              onToggle={() => setOpenAccordion(openAccordion === 'about' ? null : 'about')}
            >
              {copy?.aboutContent ? (
                copy.aboutContent
              ) : (
                <div className="space-y-6">
                  <div className="space-y-3">
                    <h3 className="text-base font-bold text-white">Fine Motor Spatial Dragging &amp; Deceleration</h3>
                    {ABOUT_TEXT.split('\n\n').map((para, i) => (
                      <p key={i} className="text-sm leading-relaxed text-gray-300">{para}</p>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
                      <div className="flex items-center gap-2.5 mb-2">
                        <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center"><Users className="w-3.5 h-3.5 text-white" /></div>
                        <h4 className="text-xs font-bold text-white">Target Audiences</h4>
                      </div>
                      <p className="text-xs text-gray-300 leading-relaxed">Graphic designers dragging nodes and layers, video editors placing timeline clips, FPS gamers refining inventory drags, and anyone wanting steadier cursor control.</p>
                    </div>
                    <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
                      <div className="flex items-center gap-2.5 mb-2">
                        <div className="w-7 h-7 rounded-lg bg-emerald-600 flex items-center justify-center"><TrendingUp className="w-3.5 h-3.5 text-white" /></div>
                        <h4 className="text-xs font-bold text-white">Steering Dynamics</h4>
                      </div>
                      <p className="text-xs text-gray-300 leading-relaxed">Continuous cursor movement under sustained switch pressure tests Accot-Zhai steering law throughput and deceleration control.</p>
                    </div>
                    <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
                      <div className="flex items-center gap-2.5 mb-2">
                        <div className="w-7 h-7 rounded-lg bg-purple-600 flex items-center justify-center"><PenTool className="w-3.5 h-3.5 text-white" /></div>
                        <h4 className="text-xs font-bold text-white">Release Timing Precision</h4>
                      </div>
                      <p className="text-xs text-gray-300 leading-relaxed">Decelerate your cursor smoothly and release inside the moving container boundary — releasing outside it breaks your combo chain.</p>
                    </div>
                  </div>
                </div>
              )}
            </DrillAccordion>
          </div>
        )}
      </main>
    </div>
  );
}

// === Subcomponents ===
function RuleItem({ num, text, highlight = '', result }) {
  return (
    <div className="flex items-center gap-2.5 sm:gap-3 bg-black px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl border border-white/10 shadow-sm font-sans">
      <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-white text-xs sm:text-sm font-black shadow flex-shrink-0">
        {num}
      </div>
      <div className="flex-1 min-w-0 flex items-center justify-between gap-2">
        <p className="text-xs sm:text-sm font-medium text-gray-200 font-sans truncate">
          {text}{highlight && <span className="font-bold text-white"> {highlight}</span>}
        </p>
        <div className="text-[11px] sm:text-xs font-bold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md bg-[#050811] border border-white/10 text-white whitespace-nowrap shadow-inner flex-shrink-0">
          {result}
        </div>
      </div>
    </div>
  );
}