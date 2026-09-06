'use client';
import { isIdleFrameSkippable } from '@/lib/performance';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';

import {
  Activity, Eye, LogOut, Move, RefreshCw,
  Share2, Target, Volume2, VolumeX, Zap, ZapOff
} from 'lucide-react';

import generateShareCard, { shareScoreCard } from '../../../../../components/ShareScoreCard';
import { getPlayerName } from '../../../../../lib/leaderboard';
import { drillAudio } from '../../../../../lib/drillAudio';
import { useDrillSensitivity } from '../../../../../lib/drillSensitivity';
import { drillFlash } from '../../../../../lib/drillFlash';
import { MAX_LEVEL, getStartLevel, getNextLevel, getDifficultyProgress, getComboBonusLevel } from '../../../../../lib/drillDifficulty';
import { getComboMultiplier, getFpsScoreGrade } from '../../../../../lib/scoringEngine';
import { createBackdropCache, getCanvasDpr } from '../../../../../lib/canvasFx';
import useUnexpectedExitGuard from '../../../../../lib/useUnexpectedExitGuard';
import DrillFooter from '../../../../../components/drill/DrillFooter';
import DrillCountdown from '../../../../../components/drill/DrillCountdown';
import DrillAccordion from '../../../../../components/drill/DrillAccordion';
import FpsStartCard from '../../../../../components/drill/FpsStartCard';
import useImmersiveMode from '@/lib/useImmersiveMode';

// ============================================================
// TUNING CONSTANTS
// ============================================================
const DRILL_DURATION = 45; // Fixed 45 seconds duration
const POINTS_PER_LEVEL = 250; // Aggressive progression threshold
const ELITE_SCORE = 17000; // Target score for S grade
const STORAGE_KEY = 'skilldrills_physical_jump_sequence_v3';

const getSavedData = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const oldBest = localStorage.getItem('jumpSequence_bestScore');
      return { bestScore: oldBest ? parseInt(oldBest, 10) : 0, bestCombo: 0, bestLevel: 1, totalSessions: 0 };
    }
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

// ============================================================
// ACCORDION DATA
// ============================================================
const RULES_ITEMS = [
  { title: "Charge & Launch", text: "Hold mouse click over your player dot to charge jump velocity and release to launch vertically." },
  { title: "Mid-Air Steering", text: "Move mouse left and right while in mid-air to steer your trajectory toward the dynamic target." },
  { title: "Combo Multiplier", text: "Chain unbroken target hits in a single jump or streak to build combo multiplier up to 3.0x max." },
  { title: "Streak Reset", text: "Landing on the ground without hitting the target resets your combo streak to 1.0x." }
];

// ============================================================
// ABOUT & BIOMECHANICAL RESEARCH DATA
// ============================================================
const ABOUT_SECTIONS = [
  {
    icon: Target,
    title: "Stretch-Shortening Cycle & Vertical Impulse Regulation",
    subtitle: "Biomechanical force potentiation and launch velocity calibration",
    content: "Jump sequence training demands precise regulation of vertical takeoff impulse through neuromuscular stretch-shortening mechanics (Komi, 2000). By varying ground charge duration, the motor cortex modulates elastic energy storage in lower-limb extensor groups, translating force into reproducible ballistic flight parabolas."
  },
  {
    icon: Move,
    title: "Internal Forward Models & Mid-Air Trajectory Correction",
    subtitle: "Cerebellar predictive simulation during aerial flight",
    content: "Once airborne, ballistic flight paths cannot be altered by ground reaction forces; instead, fine mid-air course corrections rely on internal cerebellar forward models (Kawato, 1999). Players continuously compare the simulated future landing position with the moving target\'s vector to execute rapid lateral adjustments."
  },
  {
    icon: Eye,
    title: "Optical Tau & Dynamic Aerial Target Interception",
    subtitle: "Time-to-contact estimation under erratic target acceleration",
    content: "Interception timing is governed by optical tau (τ), the inverse rate of retinal image expansion (Lee, 1976). As target velocity escalates from 120 px/s up to 900 px/s, the visual cortex must extrapolate non-linear intersection coordinates before initiating jump liftoff."
  },
  {
    icon: Activity,
    title: "Two-Component Ballistic & Steering Convergence",
    subtitle: "Woodworth two-component impulse coupled with Fitts speed-accuracy constraints",
    content: "Motor execution follows Woodworth\'s (1899) classic two-phase model: an initial open-loop ballistic launch followed by closed-loop optical feedback guidance. Constricting target boundaries impose strict Fitts\'s Law (1954) speed-accuracy tradeoffs during terminal descent."
  }
];

// Difficulty parameters formula driven by drillDifficulty
const getLevelConfig = (level, combo = 0) => {
  const p = getDifficultyProgress(level); // 0 -> 1 across L1..L15
  const heat = Math.min(1.0, combo / 50);

  return {
    baseTargetSpeed: 120 + p * 680 + heat * 100, // 120 -> 900 px/s
    targetRadius: Math.max(12, 35 - p * 23),    // 35 -> 12 px
    basePoints: Math.round(5 + p * 20)           // 5 -> 25
  };
};

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function JumpSequenceClient() {
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
    accuracy: 100, sequencesCleared: 0, missedSequences: 0,
    peakSpeed: 120, maxCombo: 0, finalLevel: 1, grade: null
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
    player: { x: 0, y: 0, vy: 0, radius: 14 },
    target: { x: 0, y: 0, r: 35, vx: 0, vy: 0 },
    isCharging: false,
    isJumping: false,
    chargeVal: 0,
    score: 0, level: 1, combo: 1.0, streak: 0, bestStreak: 0, timeLeft: DRILL_DURATION,
    hits: 0, misses: 0, totalAttempts: 0,
    particles: [], screenShake: 0,
    logicalWidth: 800, logicalHeight: 450, peakSpeed: 120
  });

  const triggerFlash = useCallback(() => {
    if (!drillFlash.isEnabled()) return;
    const id = Date.now() + Math.random();
    setFlashes((f) => [...f, { id }]);
    setTimeout(() => setFlashes((f) => f.filter((x) => x.id !== id)), 480);
  }, []);

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

  useEffect(() => {
    return () => {
      countdownTimeoutsRef.current.forEach(clearTimeout);
    };
  }, []);

  const resetPlayerAndTarget = useCallback((w, h, level, streak) => {
    const e = engine.current;
    const cfg = getLevelConfig(level, streak);

    e.player.y = h - 80;
    e.player.vy = 0;
    e.isJumping = false;
    e.isCharging = false;
    e.chargeVal = 0;

    const mx = 80;
    const maxX = w - 80;
    const my = 80;
    const maxY = h - 200;

    e.target.x = mx + Math.random() * (maxX - mx);
    e.target.y = my + Math.random() * (maxY - my);
    e.target.r = cfg.targetRadius;

    const speed = cfg.baseTargetSpeed;
    const angle = Math.random() * Math.PI * 2;
    e.target.vx = Math.cos(angle) * speed;
    e.target.vy = Math.sin(angle) * speed;
  }, []);

  const handleExitDrill = useCallback(async () => {
    markIntentionalExit();
    countdownTimeoutsRef.current.forEach(clearTimeout);
    countdownTimeoutsRef.current = [];
    startingRef.current = false;

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

  const createExplosion = (x, y, color) => {
    for (let i = 0; i < 14; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 5 + 1;
      engine.current.particles.push({ x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, life: 1.0, color });
    }
  };

  const applyPenalty = useCallback(() => {
    const e = engine.current;
    e.misses++;
    e.totalAttempts++;

    // Reset streak and player position without score or time penalties
    e.streak = 0;
    e.combo = 1.0;
    e.screenShake = 16;

    triggerFlash();
    drillAudio.playPenalty();

    resetPlayerAndTarget(e.logicalWidth, e.logicalHeight, e.level, e.streak);
  }, [triggerFlash, resetPlayerAndTarget]);

  const endGame = useCallback(() => {
    gameActiveRef.current = false;
    startingRef.current = false;
    setGameState('gameOver');
    if (document.pointerLockElement) document.exitPointerLock();

    const e = engine.current;
    const accuracyPct = e.totalAttempts > 0 ? Math.round((e.hits / e.totalAttempts) * 100) : 100;
    const rating = getFpsScoreGrade(e.score, ELITE_SCORE);

    const grade = { letter: rating.grade, label: rating.label, color: rating.color };

    setAnalytics({
      accuracy: accuracyPct,
      sequencesCleared: e.hits,
      missedSequences: e.misses,
      peakSpeed: Math.round(e.peakSpeed),
      maxCombo: Math.round(e.bestStreak),
      finalLevel: e.level,
      grade
    });

    setUiScore(e.score);

    const prevSaved = getSavedData();
    const isNewHigh = e.score > prevSaved.bestScore;
    setIsNewBest(isNewHigh);

    const runBestLevel = Math.max(prevSaved.bestLevel, bestLevelRunRef.current);
    const updatedData = {
      bestScore: Math.max(prevSaved.bestScore, e.score),
      bestCombo: Math.max(prevSaved.bestCombo, e.bestStreak),
      bestLevel: runBestLevel,
      totalSessions: (prevSaved.totalSessions || 0) + 1
    };
    saveData(updatedData);

    setBestScore(updatedData.bestScore);
    setBestCombo(updatedData.bestCombo);
    setBestLevel(updatedData.bestLevel);

    drillAudio.playSessionEnd();
  }, []);

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

    const w = engine.current.logicalWidth || 800;
    const h = engine.current.logicalHeight || 450;

    engine.current = {
      crosshair: { x: w / 2, y: h / 2, initialized: true },
      player: { x: w / 2, y: h - 80, vy: 0, radius: 14 },
      target: { x: w / 2, y: h / 3, r: 35, vx: 0, vy: 0 },
      isCharging: false, isJumping: false, chargeVal: 0,
      score: 0, level: startLevel, combo: 1.0, streak: 0, bestStreak: 0, timeLeft: DRILL_DURATION,
      hits: 0, misses: 0, totalAttempts: 0,
      particles: [], screenShake: 0,
      logicalWidth: w, logicalHeight: h, peakSpeed: getLevelConfig(startLevel, 0).baseTargetSpeed
    };

    resetPlayerAndTarget(w, h, startLevel, 0);

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
      if (canvasRef.current && !document.pointerLockElement && !isTouchOnlyDevice) {
        canvasRef.current.requestPointerLock().catch(() => {});
      }
    }, 2450);

    countdownTimeoutsRef.current = [t1, t2, t3, t4];
  }, [isTouchOnlyDevice, resetPlayerAndTarget]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && gameState === 'playing') {
        handleExitDrill();
      }
    };

    const handlePointerLockChange = () => {
      const isLocked = !!document.pointerLockElement;
      setPointerLocked(isLocked);
      if (!isLocked && gameActiveRef.current && !isTouchOnlyDevice) {
        handleExitDrill();
      }
    };

    const handleMouseMove = (e) => {
      if (!gameActiveRef.current) return;
      const eng = engine.current;
      const cvs = canvasRef.current;

      if (document.pointerLockElement) {
        eng.crosshair.x = Math.max(0, Math.min(eng.logicalWidth, eng.crosshair.x + e.movementX * universalSens));
        eng.crosshair.y = Math.max(0, Math.min(eng.logicalHeight, eng.crosshair.y + e.movementY * universalSens));
      } else if (cvs) {
        const rect = cvs.getBoundingClientRect();
        eng.crosshair.x = Math.max(0, Math.min(eng.logicalWidth, e.clientX - rect.left));
        eng.crosshair.y = Math.max(0, Math.min(eng.logicalHeight, e.clientY - rect.top));
      }
    };

    const handleMouseDown = (e) => {
      if (!gameActiveRef.current) return;
      const eng = engine.current;
      if (!eng.isJumping) {
        const distToPlayer = Math.hypot(eng.crosshair.x - eng.player.x, eng.crosshair.y - eng.player.y);
        if (distToPlayer < eng.player.radius + 18) {
          eng.isCharging = true;
        }
      }
    };

    const handleMouseUp = () => {
      if (!gameActiveRef.current) return;
      const eng = engine.current;
      if (eng.isCharging) {
        eng.player.vy = -eng.chargeVal * 12;
        eng.isJumping = true;
        eng.isCharging = false;
        eng.chargeVal = 0;
        drillAudio.playTick();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('pointerlockchange', handlePointerLockChange);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('pointerlockchange', handlePointerLockChange);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [universalSens, gameState, isTouchOnlyDevice, handleExitDrill]);

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

            bCtx.strokeStyle = 'rgba(6, 182, 212, 0.04)';
            bCtx.lineWidth = 1;
            const gridSize = 40;
            for (let x = 0; x < w; x += gridSize) {
              bCtx.beginPath(); bCtx.moveTo(x, 0); bCtx.lineTo(x, h); bCtx.stroke();
            }
            for (let y = 0; y < h; y += gridSize) {
              bCtx.beginPath(); bCtx.moveTo(0, y); bCtx.lineTo(w, y); bCtx.stroke();
            }
          });
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

      if (gameState === 'playing') {
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

        const cfg = getLevelConfig(e.level, e.streak);
        if (cfg.baseTargetSpeed > e.peakSpeed) e.peakSpeed = cfg.baseTargetSpeed;

        const ch = e.crosshair;
        const p = e.player;
        const t = e.target;

        // Target movement
        t.x += t.vx * dt;
        t.y += t.vy * dt;
        t.vx += (Math.random() - 0.5) * 60 * dt;
        t.vy += (Math.random() - 0.5) * 60 * dt;

        const margin = 40;
        if (t.x < margin || t.x > w - margin) t.vx *= -1;
        if (t.y < margin || t.y > h - 140) t.vy *= -1;

        const curTSpeed = Math.hypot(t.vx, t.vy);
        if (curTSpeed > cfg.baseTargetSpeed) {
          t.vx *= 0.95;
          t.vy *= 0.95;
        }

        // Charge accumulation
        if (e.isCharging && !e.isJumping) {
          e.chargeVal = Math.min(100, e.chargeVal + 100 * dt);
        }

        // Airborne Physics & Mid-Air Steering
        if (e.isJumping) {
          p.vy += 750 * dt;
          p.y += p.vy * dt;
          p.x += (ch.x - p.x) * 4.5 * dt;
          p.x = Math.max(20, Math.min(w - 20, p.x));

          const distToTarget = Math.hypot(p.x - t.x, p.y - t.y);
          if (distToTarget < t.r + p.radius) {
            e.hits++;
            e.totalAttempts++;
            e.streak++;
            if (e.streak > e.bestStreak) e.bestStreak = e.streak;

            const mult = getComboMultiplier(e.streak);
            e.combo = mult;

            const pts = Math.round(cfg.basePoints * mult);
            e.score += pts;
            setUiScore(e.score);

            const nextLvl = Math.max(e.level, getNextLevel(e.score, 1, POINTS_PER_LEVEL) + getComboBonusLevel(e.streak));
            if (nextLvl > e.level) {
              e.level = nextLvl;
              bestLevelRunRef.current = Math.max(bestLevelRunRef.current, nextLvl);
              drillAudio.playHit();
            }

            createExplosion(t.x, t.y, '#10b981');
            drillAudio.playHit();
            resetPlayerAndTarget(w, h, e.level, e.streak);
          } else if (p.y >= h - 80) {
            // Landed on floor without hitting target
            applyPenalty();
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

      // Draw Floor Line
      ctx.strokeStyle = "#06b6d4";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, h - 80);
      ctx.lineTo(w, h - 80);
      ctx.stroke();

      if (gameState === 'playing' || gameState === 'start') {
        // Draw Charge Bar
        if (e.isCharging || e.chargeVal > 0) {
          const bx = 25; const by = h - 140; const bw = 16; const bh = 90;
          ctx.fillStyle = "rgba(255,255,255,0.1)";
          ctx.fillRect(bx, by, bw, bh);
          const chg = (e.chargeVal / 100) * bh;
          ctx.fillStyle = "#06b6d4";
          ctx.fillRect(bx, by + bh - chg, bw, chg);
        }

        // Draw Dynamic Target
        ctx.beginPath();
        ctx.arc(e.target.x, e.target.y, e.target.r, 0, Math.PI * 2);
        ctx.strokeStyle = "#10b981";
        ctx.lineWidth = 3;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(e.target.x, e.target.y, e.target.r * 0.4, 0, Math.PI * 2);
        ctx.strokeStyle = "#34d399";
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(e.target.x, e.target.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = "#10b981";
        ctx.fill();

        // Draw Player
        ctx.beginPath();
        ctx.arc(e.player.x, e.player.y, e.player.radius, 0, Math.PI * 2);

        const ch = e.crosshair;
        const isHovering = !e.isJumping && !e.isCharging && Math.hypot(ch.x - e.player.x, ch.y - e.player.y) < e.player.radius + 18;

        ctx.fillStyle = isHovering ? "#f59e0b" : (e.isJumping ? "#06b6d4" : (e.isCharging ? "#ef4444" : "#10b981"));
        ctx.shadowBlur = e.isJumping ? 15 : 0;
        ctx.shadowColor = ctx.fillStyle;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Draw Crosshair
        if (ch.initialized) {
          let activeColor = pointerLocked ? '#06b6d4' : '#ef4444';
          if (e.combo >= 2.0) activeColor = '#a855f7';
          if (e.combo >= 3.0) activeColor = '#10b981';

          ctx.strokeStyle = activeColor;
          ctx.fillStyle = activeColor;

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
        }
      }

      for (let i = e.particles.length - 1; i >= 0; i--) {
        const p = e.particles[i];
        p.x += p.vx; p.y += p.vy; p.life -= dt * 2.5;
        if (p.life <= 0) { e.particles.splice(i, 1); continue; }
        ctx.globalAlpha = p.life; ctx.fillStyle = p.color;
        ctx.beginPath(); ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2); ctx.fill();
      }
      ctx.globalAlpha = 1.0;

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
  }, [gameState, endGame, applyPenalty, resetPlayerAndTarget]);

  const shareScore = useCallback(async () => {
    const url = 'https://skilldrills.online/drills/physical/fitness/jump-sequence';
    try {
      const canvas = generateShareCard({
        score: uiScore,
        bestScore,
        accuracy: analytics.accuracy,
        bestCombo: analytics.maxCombo,
        rating: { letter: analytics.grade?.letter || 'C', label: analytics.grade?.label || 'Keep Going', emoji: '🎯' },
        newBest: isNewBest,
        drillName: 'Jump Sequence Pro',
        playerName: getPlayerName(),
      });
      await shareScoreCard(url, canvas);
    } catch (e) {
      const text = `🎯 I scored ${uiScore} PTS (Level ${analytics.finalLevel}) on Jump Sequence Pro! Accuracy: ${analytics.accuracy}%. Test your aerial trajectory at skilldrills.online!`;
      if (typeof navigator !== 'undefined' && navigator.share) {
        navigator.share({ title: 'My Jump Sequence Score', text, url }).catch(() => {});
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
        {/* Title */}
        {!isFullscreen && (
          <div className="text-left">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Jump Sequence
              <span data-seo-kw="1" className="block text-sm font-semibold text-slate-400 mt-1">
                Jump Sequence Training
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-3xl leading-relaxed">
              Intercepting something that is falling means predicting where it will be, not reacting to where it is. The visual system can read time-to-contact directly from the rate at which an approaching object&apos;s image expands, without needing to know its size or speed (Lee, 1976), and the movement itself is planned in advance from an internal model rather than steered by feedback once it is airborne (Kawato, 1999). This is a cursor interception drill: it trains that prediction, and does not measure vertical jump or stretch-shortening cycle mechanics, which need force-plate measurement (Komi, 2000).
            </p>
          </div>
        )}

        {/* Live Stat Cards */}
        {!isFullscreen && (
          <div className="grid grid-cols-4 gap-2 w-full">
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-3 text-center">
              <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Score</div>
              <div className="text-lg sm:text-2xl font-black text-white tabular-nums">{uiScore}</div>
            </div>
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-3 text-center">
              <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Time</div>
              <div className={`text-lg sm:text-2xl font-black tabular-nums ${uiTimeLeft <= 10 ? 'text-red-400 animate-pulse' : 'text-white'}`}>{uiTimeLeft}s</div>
            </div>
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-3 text-center">
              <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Best Score</div>
              <div className="text-lg sm:text-2xl font-black text-amber-400 tabular-nums">{bestScore}</div>
            </div>
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-3 text-center">
              <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Best Combo</div>
              <div className="text-lg sm:text-2xl font-black text-rose-400 tabular-nums">{bestCombo}x</div>
            </div>
          </div>
        )}

        {/* Game Stage Container */}
        <div 
          ref={containerRef} 
          onContextMenu={(e) => { if (gameActiveRef.current) e.preventDefault(); }}
          className={`overflow-hidden flex flex-col transition-all duration-150 select-none bg-[#080811] text-white border border-white/10 ${
            isFullscreen 
              ? 'fixed inset-0 z-[100] w-screen h-[100dvh] bg-[#080811] rounded-none border-none flex flex-col items-center justify-center' 
              : 'w-full rounded-2xl bg-[#080811] aspect-video min-h-[460px] sm:min-h-[500px] max-h-[88vh] relative overflow-hidden flex flex-col'
          }`}
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
              icon={Move}
              accent="cyan"
              title="Jump Sequence"
              subtitle="Vertical Trajectory & Mid-Air Steering • 15 Levels"
              isTouchOnlyDevice={isTouchOnlyDevice}
              onStart={enterDrill}
            />
          )}

          {/* COUNTDOWN OVERLAY */}
          {gameState === 'countdown' && (
            <DrillCountdown value={countdownValue} subtitle="GET READY" />
          )}

          {/* END SCREEN */}
          {gameState === 'gameOver' && analytics.grade && (
            <div className="absolute inset-0 z-40 flex bg-neutral-950/98 select-none font-sans" style={{ background: 'rgba(5,5,8,0.97)' }} onPointerDown={e => e.stopPropagation()}>
              
              {/* Left Grade Panel */}
              <div className="w-[36%] flex flex-col items-center justify-center gap-1 border-r border-white/5 px-4" style={{ background: 'radial-gradient(ellipse 260px 200px at 50% 30%, rgba(6,182,212,.12), transparent 70%)' }}>
                {isNewBest && (
                  <span className="text-[9.5px] font-bold text-yellow-400 bg-yellow-500/10 border border-yellow-500/25 px-2.5 py-0.5 rounded-full mb-1 animate-pulse">
                    NEW BEST
                  </span>
                )}
                <div className={`text-5xl sm:text-6xl font-black leading-none ${analytics.grade.color}`}>
                  {analytics.grade.letter}
                </div>
                <div className="text-[10px] uppercase tracking-widest text-slate-500 text-center font-bold mt-1">
                  {analytics.grade.label}
                </div>
                <div className="text-3xl sm:text-4xl font-black text-white mt-2 tabular-nums">
                  {uiScore}
                </div>
                <div className="text-[9px] uppercase tracking-widest text-slate-500">Points</div>
              </div>

              {/* Right Stats & Actions Panel */}
              <div className="flex-1 flex flex-col justify-center gap-3 px-6 py-4 min-w-0">
                
                {/* 4 Stat Tiles */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <div className="bg-black border border-white/5 p-2.5 rounded-xl text-center">
                    <p className="text-sm sm:text-base font-black text-white">{analytics.accuracy}%</p>
                    <p className="text-[7.5px] sm:text-[8.5px] font-bold uppercase tracking-wider text-gray-400 mt-0.5">Accuracy</p>
                  </div>
                  <div className="bg-black border border-white/5 p-2.5 rounded-xl text-center">
                    <p className="text-sm sm:text-base font-black text-white">{analytics.sequencesCleared}</p>
                    <p className="text-[7.5px] sm:text-[8.5px] font-bold uppercase tracking-wider text-gray-400 mt-0.5">Target Hits</p>
                  </div>
                  <div className="bg-black border border-white/5 p-2.5 rounded-xl text-center">
                    <p className="text-sm sm:text-base font-black text-white">{analytics.peakSpeed} px/s</p>
                    <p className="text-[7.5px] sm:text-[8.5px] font-bold uppercase tracking-wider text-gray-400 mt-0.5">Peak Speed</p>
                  </div>
                  <div className="bg-black border border-white/5 p-2.5 rounded-xl text-center">
                    <p className="text-sm sm:text-base font-black text-white">Lv. {analytics.finalLevel}</p>
                    <p className="text-[7.5px] sm:text-[8.5px] font-bold uppercase tracking-wider text-gray-400 mt-0.5">Peak Level</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button 
                    onClick={enterDrill} 
                    className="flex-1 py-3 rounded-[13px] bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold text-xs uppercase tracking-wide cursor-pointer transition-transform active:scale-[0.98] shadow-md flex items-center justify-center gap-1.5"
                  >
                    <RefreshCw className="w-3.5 h-3.5" /> Play Again
                  </button>
                  <button 
                    onClick={shareScore} 
                    className="w-11 flex-shrink-0 rounded-[13px] bg-white/[0.04] border border-white/10 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer active:scale-90 transition-transform" 
                    title="Share Score"
                  >
                    <Share2 className="w-4 h-4 text-emerald-400" />
                  </button>
                  <button 
                    onClick={handleExitDrill} 
                    className="w-11 flex-shrink-0 rounded-[13px] bg-white/[0.04] border border-white/10 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer active:scale-90 transition-transform" 
                    title="Exit Drill & Return"
                  >
                    <LogOut className="w-4 h-4 text-red-400" />
                  </button>
                </div>

              </div>
            </div>
          )}
        </div>

        {/* ── ACCORDIONS ── */}
        {!isFullscreen && (
          <div className="[&>div]:!mt-0">
            <DrillAccordion
              id="rules"
              title="Drill Instructions & Scoring System"
              isOpen={openAccordion === 'rules'}
              onToggle={() => setOpenAccordion(openAccordion === 'rules' ? null : 'rules')}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {RULES_ITEMS.map((item, i) => (
                  <div key={i} className="bg-black p-4 rounded-xl border border-white/10">
                    <p className="text-sm font-bold text-white mb-1">{item.title}</p>
                    <p className="text-xs text-gray-300 leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            </DrillAccordion>

            <DrillAccordion
              id="about"
              title="About Jump Sequence Training"
              isOpen={openAccordion === 'about'}
              onToggle={() => setOpenAccordion(openAccordion === 'about' ? null : 'about')}
            >
              <div className="space-y-4">
                {ABOUT_SECTIONS.map((sec, idx) => {
                  const IconComp = sec.icon;
                  return (
                    <div key={idx} className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-1.5">
                        <IconComp className="w-4 h-4 text-cyan-400 shrink-0" />
                        <h3 className="text-sm font-bold text-white tracking-wide">{sec.title}</h3>
                      </div>
                      <h4 className="text-xs font-semibold text-slate-400 mb-2">{sec.subtitle}</h4>
                      <p className="text-xs leading-relaxed text-slate-300">{sec.content}</p>
                    </div>
                  );
                })}
              </div>
            </DrillAccordion>
          </div>
        )}

        {/* ── FOOTER ── */}
        {!isFullscreen && <DrillFooter />}

      </main>
    </div>
  );
}