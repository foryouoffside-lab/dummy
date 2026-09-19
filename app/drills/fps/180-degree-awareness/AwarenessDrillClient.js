'use client';
import { isIdleFrameSkippable } from '@/lib/performance';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';

import {
  Brain, Crosshair,
  Target, TrendingUp, Volume2, VolumeX,
  Zap, ZapOff, Users
} from 'lucide-react';

import generateShareCard, { shareScoreCard } from '../../../../components/ShareScoreCard';
import { getPlayerName } from '../../../../lib/leaderboard';
import { drillAudio } from '../../../../lib/drillAudio';
import { useDrillSensitivity } from '../../../../lib/drillSensitivity';
import { drillFlash } from '../../../../lib/drillFlash';
import { drillTimeout } from '../../../../lib/drillTimeout';
import { drillPenalty } from '../../../../lib/drillPenalty';
import { getStartLevel, getDifficultyProgress, ramp } from '../../../../lib/drillDifficulty';
import { getComboMultiplier, getFpsScoreGrade } from '../../../../lib/scoringEngine';
import { createBackdropCache, getCanvasDpr, drawTacticalTarget, createHitRing, drawHitRings } from '../../../../lib/canvasFx';
import DrillCountdown from '../../../../components/drill/DrillCountdown';
import DrillAccordion from '../../../../components/drill/DrillAccordion';
import FpsStartCard from '../../../../components/drill/FpsStartCard';
import DrillResultCard from '../../../../components/drill/DrillResultCard';
import useImmersiveMode from '@/lib/useImmersiveMode';
import useUnexpectedExitGuard from '@/lib/useUnexpectedExitGuard';

// ============================================================
// TUNING CONSTANTS
// ============================================================
const DRILL_DURATION = 45; // starting clock only; a run grows past this
const POINTS_PER_LEVEL = 1750; // 250 -> 1750 (7x)
const ELITE_SCORE = 51000; // 17000 -> 51000 (3x)

const TIME_PER_HIT = 0.6;
const TIME_PENALTY = 0.8;

const STORAGE_KEY = 'skilldrills_fps_180_awareness_v3';

const getSavedData = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { bestScore: 0, bestCombo: 0, bestLevel: 1, totalSessions: 0 };
    return { bestScore: 0, bestCombo: 0, bestLevel: 1, totalSessions: 0, ...JSON.parse(raw) };
  } catch (e) {
    return { bestScore: 0, bestCombo: 0, bestLevel: 1, totalSessions: 0 };
  }
};

const saveData = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {}
};


const getLevelConfig = (level, combo = 0) => {
  const p = getDifficultyProgress(level); // 0 at L1, 1 at L15, unbounded above
  const heat = (getComboMultiplier(combo) - 1) / 2;

  return {
    radius:        Math.max(4, ramp(32,   7,   p) * (1 - heat * 0.38)),
    ttl:                       ramp(1300, 90,  p) * (1 - heat * 0.39),
    spawnDelayMin:             ramp(480,  20,  p) * (1 - heat * 0.54),
    spawnDelayMax:             ramp(680,  35,  p) * (1 - heat * 0.47),
    edgeProb:      Math.min(0.95, 0.25 + p * 0.65),
    hitPad:                    ramp(12,   0.2, p) * (1 - heat * 0.60),
    drift:         p < 0.6 ? 0 : (p - 0.6) * 55, // px/sec lateral drift from L10
  };
};

// ============================================================
// ACCORDION DATA
// ============================================================
const RULES_ITEMS = [
  { num: "1", text: "Edge Target Hit", highlight: "+100 PTS (+0.6s)", result: "×Combo Mult" },
  { num: "2", text: "180° Spawns", highlight: "Extreme Peripheral", result: "Faster & Smaller" },
  { num: "3", text: "Level Progression", highlight: "+1 Level / 1750 PTS", result: "Adaptive Scaling" },
  { num: "4", text: "Miss / Timeout", highlight: "Penalty", result: "Resets Combo (-0.8s)" }
];



const RELATED_DRILLS = [
  { id: "flick-shot-training", name: "Pro Flick Trainer", cat: "FPS Flicking", desc: "Snap to targets in time-attack mode with precision flicking.", href: "/drills/fps/flick-shot-training" },
  { id: "recoil-control", name: "Recoil Control", cat: "FPS Recoil", desc: "Calibrate pulling pattern compensation for weapons.", href: "/drills/fps/recoil-control" },
  { id: "micro-correction-precision", name: "Micro Flicks", cat: "FPS Precision", desc: "Optimize tight-angle crosshair micro corrections.", href: "/drills/fps/micro-correction-precision" },
  { id: "target-acquisition", name: "Target Acquisition", cat: "FPS Precision", desc: "Train rapid target identification and click timing.", href: "/drills/fps/target-acquisition" },
  { id: "strafe-tracking", name: "Strafe Tracking", cat: "FPS Tracking", desc: "Smooth pursuit tracking against erratic horizontal targets.", href: "/drills/fps/strafe-tracking" },
  { id: "angle-hold-trainer", name: "Angle Hold Trainer", cat: "FPS Reaction", desc: "Test crosshair placement reaction speed on tight corners.", href: "/drills/fps/angle-hold-trainer" }
];

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function AwarenessDrillClient({ copy = null }) {
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
  const [penaltyEnabled, setPenaltyEnabled] = useState(false);

  const [analytics, setAnalytics] = useState({
    accuracy: 100, successfulHits: 0, missedClicks: 0, idleClicks: 0, timeouts: 0, 
    avgReactionTime: 0, maxCombo: 0, finalLevel: 1, grade: null
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
    crosshair: { x: 0, y: 0, initialized: false },
    target: { active: false, x: 0, y: 0, radius: 30, age: 0, spawnTime: 0, ttl: 1200, drift: 0, vx: 1 },
    score: 0, level: 1, combo: 0, timeLeft: DRILL_DURATION, nextSpawnTime: 0,
    successfulHits: 0, missedClicks: 0, idleClicks: 0, timeouts: 0, maxCombo: 0, reactionTimes: [], totalActions: 0,
    particles: [], hitMarkers: [], hitRings: [], screenShake: 0, logicalWidth: 800, logicalHeight: 450
  });

  const triggerFlash = useCallback(() => {
    if (!drillFlash.isEnabled()) return;
    const id = Date.now() + Math.random();
    setFlashes((f) => [...f, { id }]);
    setTimeout(() => setFlashes((f) => f.filter((x) => x.id !== id)), 480);
  }, []);

  // Touch Device Detection & Initial Storage Loading
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setSoundEnabled(drillAudio.isEnabled());
      setFlashEnabled(drillFlash.isEnabled());
      setPenaltyEnabled(drillPenalty.isEnabled());
      const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
      const isTouchCapable = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      setIsTouchOnlyDevice(isTouchCapable && !hasFinePointer);

      const saved = getSavedData();
      setBestScore(saved.bestScore || 0);
      setBestCombo(saved.bestCombo || 0);
      setBestLevel(saved.bestLevel || 1);
    }
  }, []);

  // Countdown Timeout Cleanup on Unmount
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

  const spawnTarget = useCallback((time, width, height, currentLevel, currentCombo) => {
    const e = engine.current;
    const config = getLevelConfig(currentLevel, currentCombo);
    
    const margin = config.radius + 15;
    const isEdge = Math.random() < config.edgeProb;
    let spawnX, spawnY;

    if (isEdge) {
      const isLeft = Math.random() < 0.5;
      const edgeMargin = Math.min(width * 0.15, 120);
      spawnX = isLeft 
        ? margin + Math.random() * edgeMargin 
        : width - margin - Math.random() * edgeMargin;
      spawnY = margin + Math.random() * (height - margin * 2);
    } else {
      spawnX = margin + Math.random() * (width - margin * 2);
      spawnY = margin + Math.random() * (height - margin * 2);
    }

    const vx = config.drift > 0 ? (Math.random() < 0.5 ? 1 : -1) : 0;

    e.target = {
      active: true,
      x: spawnX,
      y: spawnY,
      radius: config.radius,
      age: 0,
      spawnTime: time,
      ttl: config.ttl,
      drift: config.drift,
      vx
    };
    
    drillAudio.playBeep(isEdge ? 880 : 440, 'sine', 0.08);
  }, []);

  const createExplosion = (x, y, color) => {
    for (let i = 0; i < 14; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 4 + 1;
      engine.current.particles.push({ x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, life: 1.0, color });
    }
  };

  const createHitMarker = (x, y) => {
    engine.current.hitMarkers.push({ x, y, life: 1.0 });
  };

  // End Game Management
  const endGame = useCallback(() => {
    gameActiveRef.current = false;
    startingRef.current = false;
    setGameState('gameOver');
    if (document.pointerLockElement) document.exitPointerLock();
    
    const e = engine.current;
    const totalAttempts = e.successfulHits + e.missedClicks + e.idleClicks + e.timeouts;
    const finalAccuracy = totalAttempts > 0 ? Math.round((e.successfulHits / totalAttempts) * 100) : 0;
    const avgRt = e.reactionTimes.length > 0 
      ? Math.round(e.reactionTimes.reduce((a, b) => a + b, 0) / e.reactionTimes.length) 
      : 0;

    const rating = getFpsScoreGrade(e.score, ELITE_SCORE);
    const grade = { letter: rating.grade, label: rating.label, color: rating.color };

    setAnalytics({
      accuracy: finalAccuracy, successfulHits: e.successfulHits, missedClicks: e.missedClicks,
      idleClicks: e.idleClicks, timeouts: e.timeouts, avgReactionTime: avgRt, maxCombo: e.maxCombo,
      finalLevel: Math.floor(e.level), grade
    });

    setUiScore(e.score);

    const prevSaved = getSavedData();
    const isNewHigh = e.score > prevSaved.bestScore;
    setIsNewBest(isNewHigh);

    const runBestLevel = Math.max(prevSaved.bestLevel, Math.floor(bestLevelRunRef.current));
    const updatedData = {
      bestScore: Math.max(prevSaved.bestScore, e.score),
      bestCombo: Math.max(prevSaved.bestCombo, e.maxCombo),
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
    const startLevel = getStartLevel();
    bestLevelRunRef.current = startLevel;

    setAnalytics({
      accuracy: 100, successfulHits: 0, missedClicks: 0, idleClicks: 0, timeouts: 0,
      avgReactionTime: 0, maxCombo: 0, finalLevel: startLevel, grade: null
    });

    const w = engine.current.logicalWidth || 800;
    const h = engine.current.logicalHeight || 450;

    engine.current = {
      crosshair: { ...engine.current.crosshair },
      target: { active: false, x: 0, y: 0, radius: 30, age: 0, spawnTime: 0, ttl: 1200, drift: 0, vx: 1 },
      score: 0, level: startLevel, combo: 0, timeLeft: DRILL_DURATION,
      nextSpawnTime: performance.now() + 500, successfulHits: 0, missedClicks: 0,
      idleClicks: 0, timeouts: 0, maxCombo: 0, reactionTimes: [], totalActions: 0,
      particles: [], hitMarkers: [], hitRings: [], screenShake: 0, logicalWidth: w, logicalHeight: h
    };

    setIsFullscreen(true);

    setGameState('countdown');
    setCountdownValue(3);
    drillAudio.playCountdownTick();

    const t1 = setTimeout(() => {
      setCountdownValue(2);
      drillAudio.playCountdownTick();
    }, 700);

    const t2 = setTimeout(() => {
      setCountdownValue(1);
      drillAudio.playCountdownTick();
    }, 1400);

    const t3 = setTimeout(() => {
      setCountdownValue('GO');
      drillAudio.playGo();
    }, 2100);

    const t4 = setTimeout(() => {
      gameActiveRef.current = true;
      startingRef.current = false;
      setGameState('playing');
      if (canvasRef.current && !document.pointerLockElement) {
        canvasRef.current.requestPointerLock().catch(() => {});
      }
    }, 2450);

    countdownTimeoutsRef.current = [t1, t2, t3, t4];
  }, []);

  // Handle ESC / pointer lock drop / fullscreen exit directly
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Escape') {
        if (gameState === 'playing' || gameState === 'countdown') {
          handleExitDrill();
        }
      }
    };

    const handleLockChange = () => {
      const isLocked = document.pointerLockElement === canvasRef.current;
      setPointerLocked(isLocked);
      if (!isLocked && (gameState === 'playing' || gameState === 'countdown')) {
        handleExitDrill();
      }
    };

    const handleFullscreenChange = () => {
      const isFs = !!(document.fullscreenElement || document.webkitFullscreenElement);
      setIsFullscreen(isFs);
      if (!isFs && isFullscreen && (gameState === 'playing' || gameState === 'countdown')) {
        handleExitDrill();
      }
    };

    window.addEventListener('keydown', handleKeyDown, true);
    document.addEventListener('pointerlockchange', handleLockChange);
    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      window.removeEventListener('keydown', handleKeyDown, true);
      document.removeEventListener('pointerlockchange', handleLockChange);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [gameState, isFullscreen, handleExitDrill]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (gameState !== 'playing' || !pointerLocked || !canvasRef.current) return;
      const w = engine.current.logicalWidth;
      const h = engine.current.logicalHeight;
      const sens = universalSens;
      engine.current.crosshair.x = Math.max(0, Math.min(w, engine.current.crosshair.x + e.movementX * sens));
      engine.current.crosshair.y = Math.max(0, Math.min(h, engine.current.crosshair.y + e.movementY * sens));
    };

    const handleMouseDown = (e) => {
      if (e.target.tagName === 'BUTTON' || e.target.closest('button')) return;
      if (!containerRef.current || !containerRef.current.contains(e.target)) return;

      if (gameState === 'playing' && pointerLocked) {
        const eRef = engine.current;
          const ch = eRef.crosshair;
          const tgt = eRef.target;
          const config = getLevelConfig(eRef.level, eRef.combo);

          eRef.totalActions++;

          if (!tgt.active) {
            eRef.idleClicks++;
            if (drillPenalty.isEnabled()) eRef.timeLeft -= TIME_PENALTY;
            eRef.combo = 0;
            eRef.screenShake = 6;
            triggerFlash();
            drillAudio.playPenalty();
            createExplosion(ch.x, ch.y, '#ef4444');
          } else {
            const dist = Math.hypot(ch.x - tgt.x, ch.y - tgt.y);

            if (dist <= tgt.radius + config.hitPad) {
              eRef.successfulHits++;
              eRef.combo++;
              if (eRef.combo > eRef.maxCombo) eRef.maxCombo = eRef.combo;
              
              const reactionMs = performance.now() - tgt.spawnTime;
              eRef.reactionTimes.push(reactionMs);

              const levelMult = 1 + getDifficultyProgress(eRef.level) * 0.5;
              eRef.score += Math.round(100 * getComboMultiplier(eRef.combo) * levelMult);

              eRef.timeLeft += TIME_PER_HIT;

              const rawLevel = (eRef.score / POINTS_PER_LEVEL) + 1;
              eRef.level = Math.max(eRef.level, rawLevel);
              bestLevelRunRef.current = Math.max(bestLevelRunRef.current, eRef.level);

              drillAudio.playHit();
              const hitColor = eRef.combo >= 10 ? '#34d399' : '#10b981';
              createExplosion(tgt.x, tgt.y, hitColor);
              eRef.hitRings.push(createHitRing(tgt.x, tgt.y, tgt.radius, hitColor));
              createHitMarker(ch.x, ch.y);
              setUiScore(eRef.score);

              tgt.active = false;
              const nextConfig = getLevelConfig(eRef.level, eRef.combo);
              eRef.nextSpawnTime = performance.now() + (nextConfig.spawnDelayMin + Math.random() * (nextConfig.spawnDelayMax - nextConfig.spawnDelayMin));
            } else {
              eRef.missedClicks++;
              if (drillPenalty.isEnabled()) eRef.timeLeft -= TIME_PENALTY;
              eRef.combo = 0;
              eRef.screenShake = 6;
              triggerFlash();
              drillAudio.playPenalty();
              createExplosion(ch.x, ch.y, '#ef4444');
            }
          }
        }
      };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, [gameState, pointerLocked, universalSens, triggerFlash]);

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

        if (!e.target.active && time >= e.nextSpawnTime) {
          spawnTarget(time, w, h, e.level, e.combo);
        }

        if (e.target.active) {
          const tgt = e.target;
          tgt.age = time - tgt.spawnTime;

          if (tgt.drift > 0) {
            tgt.x += tgt.vx * tgt.drift * dt;
            if (tgt.x < tgt.radius + 15 || tgt.x > w - tgt.radius - 15) {
              tgt.vx *= -1;
            }
          }

          if (drillTimeout.isEnabled() && tgt.age >= tgt.ttl) {
            tgt.active = false;
            e.timeouts++;
            e.totalActions++;
            if (drillPenalty.isEnabled()) e.timeLeft -= TIME_PENALTY;
            e.combo = 0;
            e.screenShake = 6;
            triggerFlash();
            drillAudio.playPenalty();
            createExplosion(tgt.x, tgt.y, '#ef4444');

            const nextConfig = getLevelConfig(e.level, e.combo);
            e.nextSpawnTime = time + (nextConfig.spawnDelayMin + Math.random() * (nextConfig.spawnDelayMax - nextConfig.spawnDelayMin));
          }
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

      // Static center focus reticle — a fixed visual anchor point, like a scope's center mark,
      // for the player to hold their eyes on while spotting edge targets through peripheral vision.
      if (gameState === 'playing' || gameState === 'start') {
        const cx = w / 2;
        const cy = h / 2;
        const armLen = 11;
        const gap = 4;
        ctx.save();
        ctx.strokeStyle = '#5eead4';
        ctx.lineWidth = 1.5;

        ctx.globalAlpha = 0.18;
        ctx.beginPath();
        ctx.arc(cx, cy, 19, 0, Math.PI * 2);
        ctx.stroke();

        ctx.globalAlpha = 0.4;
        ctx.beginPath();
        ctx.moveTo(cx - armLen, cy); ctx.lineTo(cx - gap, cy);
        ctx.moveTo(cx + gap, cy); ctx.lineTo(cx + armLen, cy);
        ctx.moveTo(cx, cy - armLen); ctx.lineTo(cx, cy - gap);
        ctx.moveTo(cx, cy + gap); ctx.lineTo(cx, cy + armLen);
        ctx.stroke();
        ctx.restore();
      }

      if ((gameState === 'playing' || gameState === 'start') && e.target.active) {
        const tgt = e.target;
        const targetColor = e.combo >= 10 ? '#34d399' : '#10b981';

        drawTacticalTarget(ctx, tgt.x, tgt.y, tgt.radius, targetColor, true);
      }

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

      // Render dynamic particles
      for (let i = e.particles.length - 1; i >= 0; i--) {
        const p = e.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= dt * 2.5;
        if (p.life <= 0) {
          e.particles.splice(i, 1);
          continue;
        }
        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
        ctx.fill();
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
  }, [gameState, pointerLocked, spawnTarget, endGame, triggerFlash]);

  const shareScore = useCallback(async () => {
    const url = 'https://skilldrills.online/drills/fps/180-degree-awareness';
    try {
      const canvas = generateShareCard({
        score: uiScore,
        bestScore,
        accuracy: analytics.accuracy,
        bestCombo: analytics.maxCombo,
        rating: { letter: analytics.grade?.letter || 'C', label: analytics.grade?.label || 'Keep Going', emoji: '🎯' },
        newBest: isNewBest,
        drillName: '180° Awareness Pro',
        playerName: getPlayerName(),
      });
      await shareScoreCard(url, canvas);
    } catch (e) {
      const text = `🎯 I scored ${uiScore} PTS (Level ${analytics.finalLevel}) on 180° Awareness Pro! Accuracy: ${analytics.accuracy}%. Test your reflexes at skilldrills.online!`;
      if (typeof navigator !== 'undefined' && navigator.share) {
        navigator.share({ title: 'My 180° Awareness Score', text, url }).catch(() => {});
      } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
        navigator.clipboard.writeText(text);
        alert('Score card copied to clipboard!');
      }
    }
  }, [uiScore, bestScore, analytics, isNewBest]);

  const totalActions = engine.current.successfulHits + engine.current.missedClicks + engine.current.idleClicks + engine.current.timeouts;
  const accuracy = gameState === 'gameOver' ? analytics.accuracy : (totalActions > 0 ? Math.round((engine.current.successfulHits / totalActions) * 100) : 100);

  return (
    <div className="min-h-screen bg-[#050508] text-white flex flex-col font-sans select-none">
      {/* ── MAIN CONTENT AREA ── */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6 flex flex-col gap-6">
        {/* Title */}
        {!isFullscreen && (
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              <span data-seo-kw="1">{copy?.h1Keyword || "180° Aim Trainer"}</span>
              {copy?.h1Suffix !== undefined ? copy.h1Suffix : " — Snap Turn Awareness"}
            </h1>
            <p className="text-sm text-slate-400 font-medium">
              {copy?.subtitle || "Master rapid peripheral detection, large-angle flick transitions, and snap turn deceleration."}
            </p>
          </div>
        )}

        {/* Live Stat Cards */}
        {!isFullscreen && (
          <div className="grid grid-cols-4 gap-2 w-full -mb-2">
            {[
              { label: copy?.statScore || 'Score', value: uiScore },
              { label: copy?.statTime || 'Time', value: `${uiTimeLeft}s`, color: uiTimeLeft <= 10 ? 'text-red-400 animate-pulse' : 'text-white' },
              { label: copy?.statAccuracy || 'Accuracy', value: `${accuracy}%`, color: 'text-blue-400' },
              { label: copy?.statBestScore || 'Best Score', value: bestScore, color: 'text-amber-400' },
            ].map((card) => (
              <div key={card.label} className="border border-white/[0.06] bg-white/[0.015] px-2 py-2 rounded-xl text-center">
                <div className="text-[10px] font-bold tracking-wider uppercase text-slate-500">{card.label}</div>
                <div className={`text-base sm:text-lg font-black tabular-nums ${card.color || 'text-white'}`}>{card.value}</div>
              </div>
            ))}
          </div>
        )}

        {/* Game Stage Container */}
        <div 
          ref={containerRef} 
          onContextMenu={(e) => { if (gameActiveRef.current) e.preventDefault(); }}
          className={
            isFullscreen 
              ? 'fixed inset-0 z-[100] w-screen h-[100dvh] bg-[#050508] flex flex-col items-center justify-center' 
              : 'w-full rounded-2xl aspect-video min-h-[460px] md:min-h-[500px] max-h-[88vh] max-md:portrait:aspect-[3/4] max-md:portrait:min-h-[420px] max-md:portrait:max-h-[76vh] max-md:landscape:min-h-[340px] max-md:landscape:max-h-[85vh] bg-[#080811] border border-white/10 relative overflow-hidden flex flex-col'
          }
          style={{ touchAction: gameActiveRef.current ? 'none' : 'auto' }}
        >
          {/* DOM Flash Overlay (Red only) */}
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
                {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
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
              icon={Target}
              accent="emerald"
              title={copy?.startTitle || "180° Awareness Pro"}
              subtitle={copy?.startSubtitle || "Hardware Raw Input • Endless Level Progression"}
              isTouchOnlyDevice={isTouchOnlyDevice}
              onStart={enterDrill}
            />
          )}

          {/* COUNTDOWN OVERLAY */}
          {gameState === 'countdown' && (
            <DrillCountdown value={countdownValue} subtitle={copy?.getReady || "GET READY"} />
          )}

          {/* END SCREEN — universal card, shared by every drill */}
          {gameState === 'gameOver' && analytics.grade && (
            <DrillResultCard
              accent="emerald"
              grade={analytics.grade}
              score={uiScore}
              isNewBest={isNewBest}
              stats={[
                { value: analytics.accuracy, suffix: '%', label: 'Accuracy' },
                { value: analytics.avgReactionTime, suffix: 'ms', label: 'Avg Reaction' },
                { value: `${analytics.maxCombo}x`, label: 'Max Combo' },
                { value: `Lv. ${analytics.finalLevel}`, label: 'Peak Level' },
              ]}
              onPlayAgain={enterDrill}
              onShare={shareScore}
              onExit={handleExitDrill}
            />
          )}

        </div>

        {/* Stage Caption */}
        {!isFullscreen && (
          <p className="text-xs text-slate-400 leading-relaxed -mt-2">
            {copy?.stageCaption || "Spot and snap to targets spawning at extreme screen edges before they expire."}
          </p>
        )}

        {/* ── ACCORDIONS ── */}
        {!isFullscreen && (
          <div className="[&>div]:!mt-0">
            <DrillAccordion
              id="rules"
              title={copy?.rulesTitle || "Drill Instructions & Scoring System"}
              isOpen={openAccordion === 'rules'}
              onToggle={() => setOpenAccordion(openAccordion === 'rules' ? null : 'rules')}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-sans">
                {(copy?.rulesItems || RULES_ITEMS).map((item, i) => (
                  <RuleItem key={i} num={item.num} text={item.text} highlight={item.highlight} result={item.result} />
                ))}
              </div>
            </DrillAccordion>

            <DrillAccordion
              id="about"
              title={copy?.aboutTitle || "About 180° Awareness Pro"}
              isOpen={openAccordion === 'about'}
              onToggle={() => setOpenAccordion(openAccordion === 'about' ? null : 'about')}
            >
              <div className="space-y-8">
                <section>
                  <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                    <Brain className="w-4 h-4 text-red-400" /> {copy?.aboutHeading || "What Is 180° Awareness Training?"}
                  </h3>
                  <p className="text-sm leading-relaxed mb-3 text-gray-300">
                    {copy?.aboutText1 || "A 180° turn is the longest mouse movement in a shooter. Under Fitts's law the time it takes scales with how far you move and how small the target is (Fitts, 1954) — so most of the cost is not the turn itself, it is reacquiring the target once you land."}
                  </p>
                  <p className="text-sm leading-relaxed mb-3 text-gray-300">
                    {copy?.aboutText2 || "180° Awareness Pro isolates and exercises your ability to process visual information outside of your immediate focal point. Unlike standard aim trainers that prioritize micro-corrections, this awareness drill challenges spatial coordinate sweeps, forcing you to detect targets and execute rapid 180-degree turnarounds."}
                  </p>
                  <p className="text-sm leading-relaxed text-gray-300">
                    {copy?.aboutText3 || "By consistently performing situational awareness training, players map their physical mouse pad space to the game engine's virtual space, enabling accurate blind flicks and rapid threat responses in tactical shooters like CS2 and Valorant. Fast clicks before target expiration condition you to react to stimuli immediately, lowering baseline mechanical hesitation while building large-angle flick consistency."}
                  </p>
                </section>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl border border-gray-800 bg-white/[0.02]">
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center"><Users className="w-3.5 h-3.5 text-white" /></div>
                      <h4 className="text-xs font-bold text-white">Who Should Use This?</h4>
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed">FPS gamers who keep getting flanked, CS2 & Valorant players building clutch-round reflexes, and esports competitors sharpening blind-flick consistency.</p>
                  </div>
                  <div className="p-4 rounded-xl border border-gray-800 bg-white/[0.02]">
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="w-7 h-7 rounded-lg bg-emerald-600 flex items-center justify-center"><TrendingUp className="w-3.5 h-3.5 text-white" /></div>
                      <h4 className="text-xs font-bold text-white">Skills Improved</h4>
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed">Peripheral detection, audio-spatial translation, saccadic eye movement, large-angle flick consistency, and target acquisition speed.</p>
                  </div>
                  <div className="p-4 rounded-xl border border-gray-800 bg-white/[0.02]">
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="w-7 h-7 rounded-lg bg-purple-600 flex items-center justify-center"><Zap className="w-3.5 h-3.5 text-white" /></div>
                      <h4 className="text-xs font-bold text-white">180° Flick Consistency</h4>
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed">Chain rapid full-turn snaps onto edge-spawning targets to build the muscle memory for clean blind flicks under pressure.</p>
                  </div>
                </div>
              </div>
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