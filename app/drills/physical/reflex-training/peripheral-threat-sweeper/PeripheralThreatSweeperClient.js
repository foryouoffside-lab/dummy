'use client';
import { isIdleFrameSkippable } from '@/lib/performance';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';

import {
  Activity, AlertCircle, ArrowRight, ChevronRight, Crosshair,
  Eye, GraduationCap, Play, RefreshCw, Target,
  Timer, TrendingUp, Trophy, Volume2, VolumeX,
  Zap, ZapOff, Users, Share2, Sliders, Flame,
  LogOut, Award, ShieldAlert, BarChart3, Info, Lightbulb, Shield
} from 'lucide-react';

import generateShareCard, { shareScoreCard } from '../../../../../components/ShareScoreCard';
import { getPlayerName } from '../../../../../lib/leaderboard';
import { drillAudio } from '../../../../../lib/drillAudio';
import { useDrillSensitivity } from '../../../../../lib/drillSensitivity';
import { drillFlash } from '../../../../../lib/drillFlash';
import { drillTimeout } from '../../../../../lib/drillTimeout';
import { drillPenalty } from '../../../../../lib/drillPenalty';
import { MAX_LEVEL, getStartLevel, getDifficultyProgress, ramp } from '../../../../../lib/drillDifficulty';
import { getComboMultiplier, getFpsScoreGrade } from '../../../../../lib/scoringEngine';
import { createBackdropCache, getCanvasDpr, drawPulseRing, drawTacticalTarget } from '../../../../../lib/canvasFx';
import useUnexpectedExitGuard from '../../../../../lib/useUnexpectedExitGuard';
import DrillFooter from '../../../../../components/drill/DrillFooter';
import DrillCountdown from '../../../../../components/drill/DrillCountdown';
import DrillAccordion from '../../../../../components/drill/DrillAccordion';
import FpsStartCard from '../../../../../components/drill/FpsStartCard';
import DrillResultCard from '../../../../../components/drill/DrillResultCard';
import useImmersiveMode from '@/lib/useImmersiveMode';

// ============================================================
// TUNING CONSTANTS
// ============================================================
const DRILL_DURATION = 45; // starting clock only; a run grows past this
const POINTS_PER_LEVEL = 1750; // 250 -> 1750 (7x)
const ELITE_SCORE = 24000; // 17000 -> 24000 (1.4x)
const TIME_PER_HIT = 0.6; // +0.6s on threat sweep
const TIME_PENALTY = 0.8; // -0.8s on miss / core breach (opt-in gated)
const STORAGE_KEY = 'skilldrills_physical_peripheral_sweeper_v4';

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

// Continuous unbounded difficulty with streak heat
const getLevelConfig = (level, combo = 0) => {
  const p = getDifficultyProgress(level); // 0 at L1, 1 at L15, unbounded above
  const heat = (getComboMultiplier(combo) - 1) / 2;
  return {
    baseSpeed: ramp(80, 520, p) * (1 + heat * 0.25),
    spawnInterval: Math.max(0.20, ramp(1.4, 0.28, p) * (1 - heat * 0.25)),
    hitPad: Math.max(16, ramp(26, 18, p)),
  };
};

const RULES_ITEMS = [
  { title: "Threat Interception", text: "Click threat node in outer vision to score +100 PTS scaled with combo multiplier (+0.6s per sweep)." },
  { title: "Combo System", text: "Chain unbroken threat sweeps to build combo multiplier up to 3.0x max." },
  { title: "Level Progression", text: "Score increases level continuously. Threat speed & spawn density accelerate dynamically." },
  { title: "Core Breach / Miss", text: "Missing threat or allowing core breach resets combo streak (and deducts 0.8s if enabled in settings)." }
];

// ============================================================
// ABOUT & BIOMECHANICAL RESEARCH DATA
// ============================================================
const ABOUT_SECTIONS = [
  {
    icon: Eye,
    title: "Covert Attentional Orienting & Peripheral Scanning",
    subtitle: "Posner spatial cueing without foveal fixation shifts",
    content: "Peripheral threat interception trains covert orienting of visual attention (Posner, 1980). Rather than constantly shifting primary eye gaze away from the central core, players maintain central fixation while covertly allocating attentional resources across the 360-degree radial periphery."
  },
  {
    icon: Target,
    title: "Pre-Attentive Feature Integration & Saliency Maps",
    subtitle: "Treisman parallel visual search across radial angles",
    content: "Newly spawned inward-moving threat vectors trigger pre-attentive motion and color feature detectors across the peripheral retina (Treisman & Gelade, 1980). High-contrast red and orange threat nodes generate instantaneous pop-out effects, alerting the parietal cortex to compute intercept angles."
  },
  {
    icon: Shield,
    title: "Two-Component Ballistic Flick & Core Protection",
    subtitle: "Woodworth rapid motor snaps coupled with terminal capture adjustments",
    content: "Target sweeps demand Woodworth\'s (1899) classic two-component motor control: an initial open-loop ballistic wrist snap covering 85%+ of the radial distance, followed by fine visual adjustments to intercept targets before they breach the central perimeter."
  },
  {
    icon: Activity,
    title: "Useful Field of View & Multi-Vector Bandwidth",
    subtitle: "Expanding cognitive processing area under high-density spawn rates",
    content: "As levels scale, spawn intervals compress from 1.4s down to 0.20s, and threat velocities accelerate up to 520 px/s. This expands the functional Useful Field of View (UFOV), conditioning the central nervous system to process multi-vector spatial hazards simultaneously."
  }
];

export default function PeripheralThreatSweeperClient() {
  const [gameState, setGameState] = useState('start'); // 'start' | 'countdown' | 'playing' | 'gameOver'
  const [isFullscreen, setIsFullscreen] = useState(false);
  useImmersiveMode(isFullscreen); // locks the page behind while the drill fills the screen
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [flashEnabled, setFlashEnabled] = useState(true);
  const [penaltyEnabled, setPenaltyEnabled] = useState(false);
  const [pointerLocked, setPointerLocked] = useState(false);
  const universalSens = useDrillSensitivity();
  const [openAccordion, setOpenAccordion] = useState(null);
  const [isTouchOnlyDevice, setIsTouchOnlyDevice] = useState(false);
  const [countdownValue, setCountdownValue] = useState(3);
  const [flashes, setFlashes] = useState([]);

  // HUD & Best Stats State
  const [uiScore, setUiScore] = useState(0);
  const [uiTimeLeft, setUiTimeLeft] = useState(DRILL_DURATION);
  const [uiLevel, setUiLevel] = useState(1);
  const [bestScore, setBestScore] = useState(0);
  const [bestCombo, setBestCombo] = useState(0);
  const [bestLevel, setBestLevel] = useState(1);
  const [isNewBest, setIsNewBest] = useState(false);

  const [analytics, setAnalytics] = useState({
    accuracy: 100, successfulSweeps: 0, missedClicks: 0, breaches: 0,
    peakSpeed: 80, maxCombo: 0, finalLevel: 1, grade: null
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
    threats: [],
    nextThreatId: 0,
    score: 0, level: 1, combo: 0, timeLeft: DRILL_DURATION,
    successfulSweeps: 0, missedClicks: 0, breaches: 0, maxCombo: 0, totalActions: 0,
    spawnTimer: 0, particles: [], hitMarkers: [], screenShake: 0, shieldGlow: 0,
    logicalWidth: 800, logicalHeight: 450, peakSpeed: 80
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

  useEffect(() => {
    return () => {
      countdownTimeoutsRef.current.forEach(clearTimeout);
    };
  }, []);

  const handleExitDrill = useCallback(async () => {
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

  const spawnThreat = useCallback((width, height, currentLevel) => {
    const e = engine.current;
    const config = getLevelConfig(currentLevel, e.combo);

    const angle = Math.random() * Math.PI * 2;
    const radarLimit = Math.min(width, height) * 0.46;

    let type = 'standard';
    let speedMult = 1.0;

    const p = getDifficultyProgress(currentLevel);
    if (p >= 0.35 && Math.random() < 0.35) {
      type = 'wobble';
    } else if (p >= 0.15 && Math.random() < 0.30) {
      type = 'fast';
      speedMult = 1.6;
    }

    e.threats.push({
      id: e.nextThreatId++,
      angle,
      distance: radarLimit,
      speed: config.baseSpeed * speedMult,
      type,
      active: true,
      spawnTime: performance.now(),
      wobbleOffset: Math.random() * Math.PI * 2
    });
  }, []);

  const createExplosion = (x, y, color) => {
    for (let i = 0; i < 14; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 5 + 1;
      engine.current.particles.push({ x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, life: 1.0, color });
    }
  };

  const applyPenalty = useCallback(() => {
    const e = engine.current;
    if (drillPenalty.isEnabled()) {
      e.timeLeft -= TIME_PENALTY;
    }
    e.combo = 0;
    e.screenShake = 12;
    triggerFlash();
    drillAudio.playPenalty();
  }, [triggerFlash]);

  const endGame = useCallback(() => {
    markIntentionalExit();
    gameActiveRef.current = false;
    startingRef.current = false;
    setGameState('gameOver');
    if (document.pointerLockElement) document.exitPointerLock();

    const e = engine.current;
    const totalAttempts = e.successfulSweeps + e.missedClicks + e.breaches;
    const accuracyPct = totalAttempts > 0 ? Math.round((e.successfulSweeps / totalAttempts) * 100) : 100;
    const rating = getFpsScoreGrade(e.score, ELITE_SCORE);

    const grade = { letter: rating.grade || rating.letter || 'C', label: rating.label || 'Keep Going', color: rating.color || 'text-emerald-400' };

    setAnalytics({
      accuracy: accuracyPct, successfulSweeps: e.successfulSweeps, missedClicks: e.missedClicks, breaches: e.breaches,
      peakSpeed: Math.round(e.peakSpeed), maxCombo: e.maxCombo, finalLevel: Math.floor(bestLevelRunRef.current), grade
    });

    setUiScore(e.score);

    const prevSaved = getSavedData();
    const isNewHigh = e.score > prevSaved.bestScore;
    setIsNewBest(isNewHigh);

    const runBestLevel = Math.max(prevSaved.bestLevel || 1, Math.floor(bestLevelRunRef.current));
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
  }, [markIntentionalExit]);

  const enterDrill = useCallback(async () => {
    if (startingRef.current) return;
    startingRef.current = true;

    countdownTimeoutsRef.current.forEach(clearTimeout);
    countdownTimeoutsRef.current = [];

    drillAudio.init();

    const startLevel = getStartLevel();
    bestLevelRunRef.current = startLevel;

    setIsNewBest(false);
    setUiScore(0);
    setUiLevel(startLevel);
    setUiTimeLeft(DRILL_DURATION);
    lastTimeRef.current = DRILL_DURATION;

    const w = engine.current.logicalWidth || 800;
    const h = engine.current.logicalHeight || 450;

    engine.current = {
      crosshair: { x: w / 2, y: h / 2, initialized: true },
      threats: [],
      nextThreatId: 0,
      score: 0, level: startLevel, combo: 0, timeLeft: DRILL_DURATION,
      successfulSweeps: 0, missedClicks: 0, breaches: 0, maxCombo: 0, totalActions: 0,
      spawnTimer: 0, particles: [], hitMarkers: [], screenShake: 0, shieldGlow: 0,
      logicalWidth: w, logicalHeight: h, peakSpeed: 80
    };

    spawnThreat(w, h, startLevel);

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
  }, [isTouchOnlyDevice, spawnThreat]);

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
      if (!gameActiveRef.current || e.button !== 0) return;
      const eng = engine.current;
      const cx = eng.logicalWidth / 2;
      const cy = eng.logicalHeight / 2;
      const config = getLevelConfig(eng.level, eng.combo);

      let intercepted = false;
      for (let i = eng.threats.length - 1; i >= 0; i--) {
        const t = eng.threats[i];
        const tx = cx + Math.cos(t.angle) * t.distance;
        const ty = cy + Math.sin(t.angle) * t.distance;
        const dist = Math.hypot(eng.crosshair.x - tx, eng.crosshair.y - ty);

        if (dist <= config.hitPad) {
          intercepted = true;
          eng.successfulSweeps++;
          eng.timeLeft += TIME_PER_HIT;
          eng.combo++;
          if (eng.combo > eng.maxCombo) eng.maxCombo = eng.combo;

          const mult = getComboMultiplier(eng.combo);
          const levelBonus = 1 + getDifficultyProgress(eng.level) * 0.5;
          const basePts = Math.round(100 * mult * levelBonus);
          eng.score += basePts;

          // Continuous level progression
          const rawLevel = (eng.score / POINTS_PER_LEVEL) + 1;
          eng.level = Math.max(eng.level, rawLevel);
          bestLevelRunRef.current = Math.max(bestLevelRunRef.current, eng.level);

          setUiScore(eng.score);
          setUiLevel(Math.floor(eng.level));

          drillAudio.playHit();
          createExplosion(tx, ty, t.type === 'fast' ? '#f97316' : t.type === 'wobble' ? '#a855f7' : '#ef4444');
          eng.threats.splice(i, 1);
          return;
        }
      }

      if (!intercepted) {
        eng.missedClicks++;
        applyPenalty();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('pointerlockchange', handlePointerLockChange);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('pointerlockchange', handlePointerLockChange);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, [universalSens, gameState, isTouchOnlyDevice, handleExitDrill, applyPenalty]);

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
      const cx = w / 2;
      const cy = h / 2;

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

        const cfg = getLevelConfig(e.level, e.combo);
        if (cfg.baseSpeed > e.peakSpeed) e.peakSpeed = cfg.baseSpeed;

        e.spawnTimer += dt;
        if (e.spawnTimer >= cfg.spawnInterval) {
          e.spawnTimer = 0;
          spawnThreat(w, h, e.level);
        }

        for (let i = e.threats.length - 1; i >= 0; i--) {
          const t = e.threats[i];
          t.distance -= t.speed * dt;

          if (t.type === 'wobble') {
            t.wobbleOffset += dt * 4;
            t.angle += Math.sin(t.wobbleOffset) * 0.015;
          }

          if (t.distance <= 45) {
            e.breaches++;
            applyPenalty();
            e.threats.splice(i, 1);
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

      // Draw Center Shield Ring
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.25)';
      ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(cx, cy, 45, 0, Math.PI * 2); ctx.stroke();
      ctx.fillStyle = 'rgba(16, 185, 129, 0.05)';
      ctx.beginPath(); ctx.arc(cx, cy, 45, 0, Math.PI * 2); ctx.fill();

      if (gameState === 'playing' || gameState === 'start') {
        e.threats.forEach((t) => {
          const tx = cx + Math.cos(t.angle) * t.distance;
          const ty = cy + Math.sin(t.angle) * t.distance;

          const color = t.type === 'fast' ? '#f97316' : t.type === 'wobble' ? '#a855f7' : (e.combo >= 10 ? '#38bdf8' : '#ef4444');
          const progress = Math.max(0, Math.min(1, 1 - (t.distance / (Math.min(w, h) * 0.45))));

          drawPulseRing(ctx, tx, ty, 14, color, progress);
          drawTacticalTarget(ctx, tx, ty, 14, color, false);
        });
      }

      for (let i = e.particles.length - 1; i >= 0; i--) {
        const p = e.particles[i];
        p.x += p.vx; p.y += p.vy; p.life -= dt * 2.5;
        if (p.life <= 0) { e.particles.splice(i, 1); continue; }
        ctx.globalAlpha = p.life; ctx.fillStyle = p.color;
        ctx.beginPath(); ctx.arc(p.x, p.y, 3, 0, Math.PI * 2); ctx.fill();
      }
      ctx.globalAlpha = 1.0;

      const ch = e.crosshair;
      if (ch.initialized && (gameState === 'playing' || gameState === 'start')) {
        const activeColor = pointerLocked ? '#10b981' : '#eab308';
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
  }, [gameState, endGame, applyPenalty, spawnThreat]);

  const shareScore = useCallback(async () => {
    const url = 'https://skilldrills.online/drills/physical/reflex-training/peripheral-threat-sweeper';
    try {
      const canvas = generateShareCard({
        score: uiScore,
        bestScore,
        accuracy: analytics.accuracy,
        bestCombo: analytics.maxCombo,
        rating: { letter: analytics.grade?.letter || 'C', label: analytics.grade?.label || 'Keep Going', emoji: '🎯' },
        newBest: isNewBest,
        drillName: 'Peripheral Threat Sweeper',
        playerName: getPlayerName(),
      });
      await shareScoreCard(url, canvas);
    } catch (e) {
      const text = `🎯 I scored ${uiScore} PTS (Level ${analytics.finalLevel}) on Peripheral Threat Sweeper! Accuracy: ${analytics.accuracy}%. Test your reaction speed at skilldrills.online!`;
      if (typeof navigator !== 'undefined' && navigator.share) {
        navigator.share({ title: 'My Peripheral Threat Sweeper Score', text, url }).catch(() => {});
      } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
        navigator.clipboard.writeText(text);
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
              Peripheral Threat Sweeper
              <span data-seo-kw="1" className="block text-sm font-semibold text-slate-400 mt-1">
                Peripheral Vision Test
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-3xl leading-relaxed">
              Peripheral vision is what you can detect without looking directly at it. Detail falls away sharply from the centre of gaze, but attention can still be shifted to a peripheral location while the eyes stay put, and a valid cue to that location speeds responses up (Posner, 1980). A single distinguishing feature such as colour is found in roughly the same time however many distractors surround it, while a target needing two features combined has to be searched for (Treisman &amp; Gelade, 1980) &mdash; which is what makes some threats here easy to catch at the edge and others not.
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
              <div className="text-lg sm:text-2xl font-black text-emerald-400 tabular-nums">{bestCombo}x</div>
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
              <div className="absolute top-4 left-4 z-30 pointer-events-none flex flex-col gap-1">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-white/50">Score</p>
                  <p className="text-2xl sm:text-3xl font-bold text-white tabular-nums leading-tight">{uiScore}</p>
                </div>
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
              icon={Eye}
              accent="emerald"
              title="Peripheral Threat Sweeper"
              subtitle="Peripheral Vision & Shield Defense • Continuous Scaling"
              rules={[
                { icon: Target, accent: 'emerald', title: 'Intercept Edge Threats (+100 PTS)', text: '+100 PTS × Combo × Level multiplier (+0.6s per sweep)' },
                {
                  icon: Zap,
                  accent: 'red',
                  title: penaltyEnabled ? 'Core Breach Penalty (-0.8s)' : 'Core Breach Combo Reset',
                  text: penaltyEnabled
                    ? 'Allowing threats to breach the central core subtracts 0.8s and resets combo'
                    : 'Allowing threats to breach the central core resets your combo multiplier'
                },
              ]}
              stats={[
                { icon: Trophy, label: 'Best Score', value: bestScore, color: 'text-white', accent: 'slate' },
                { icon: Flame, label: 'Best Combo', value: `${bestCombo}x`, color: 'text-emerald-400', accent: 'emerald' },
                { icon: TrendingUp, label: 'Best Level', value: `Lv. ${bestLevel}`, color: 'text-blue-400', accent: 'blue' },
              ]}
              isTouchOnlyDevice={isTouchOnlyDevice}
              onStart={enterDrill}
            />
          )}

          {/* COUNTDOWN OVERLAY */}
          {gameState === 'countdown' && (
            <DrillCountdown value={countdownValue} subtitle="GET READY" />
          )}

          {/* UNIVERSAL RESULT CARD */}
          {gameState === 'gameOver' && analytics.grade && (
            <DrillResultCard
              accent="emerald"
              grade={analytics.grade}
              score={uiScore}
              isNewBest={isNewBest}
              stats={[
                { label: 'Accuracy', value: analytics.accuracy, suffix: '%' },
                { label: 'Sweeps', value: analytics.successfulSweeps },
                { label: 'Breaches', value: analytics.breaches },
                { label: 'Peak Level', value: `Lv. ${analytics.finalLevel}` },
              ]}
              onPlayAgain={enterDrill}
              onShare={shareScore}
              onExit={handleExitDrill}
            />
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
              title="About Peripheral Threat Sweeper"
              isOpen={openAccordion === 'about'}
              onToggle={() => setOpenAccordion(openAccordion === 'about' ? null : 'about')}
            >
              <div className="space-y-4">
                {ABOUT_SECTIONS.map((sec, idx) => {
                  const IconComp = sec.icon;
                  return (
                    <div key={idx} className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-1.5">
                        <IconComp className="w-4 h-4 text-emerald-400 shrink-0" />
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