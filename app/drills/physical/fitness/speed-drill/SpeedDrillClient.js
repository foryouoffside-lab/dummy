'use client';
import { isIdleFrameSkippable } from '@/lib/performance';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';

import {
  Activity, AlertCircle, ArrowRight, ChevronRight, Crosshair,
  Eye, GraduationCap, Play, RefreshCw, Target,
  Timer, Volume2, VolumeX,
  Zap, ZapOff, Users, Share2, Sliders,
  LogOut, Award, ShieldAlert, BarChart3, Info, Lightbulb
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
const TIME_PER_HIT = 0.6; // +0.6s on target hit
const TIME_PENALTY = 0.8; // -0.8s on miss / target expiry (opt-in gated)
const STORAGE_KEY = 'skilldrills_physical_speed_drill_v4';

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
    maxRadius: Math.max(12, ramp(45, 14, p) * (1 - heat * 0.15)),
    speedMulti: ramp(1.0, 3.8, p) * (1 + heat * 0.25),
    shrinkSpeedFactor: ramp(0.6, 2.2, p) * (1 + heat * 0.20),
  };
};

const RULES_ITEMS = [
  { title: "Target Acquisition", text: "Click moving shrinking targets before radius decays to zero (+0.6s per hit). Each hit scores 100 points multiplied by your combo and level." },
  { title: "Combo Multiplier", text: "Chain unbroken target hits to build combo multiplier up to 3.0x max." },
  { title: "Level Progression", text: "Score increases level continuously. Target velocity & shrink rate accelerate dynamically." },
  { title: "Miss / Target Expiry", text: "Missing a target or letting target shrink to zero resets combo streak (and deducts 0.8s if enabled in settings)." }
];

// ============================================================
// ABOUT & BIOMECHANICAL RESEARCH DATA
// ============================================================
const ABOUT_SECTIONS = [
  {
    icon: Crosshair,
    title: "Ballistic Motor Flicks & Sub-Second Target Acquisition",
    subtitle: "Woodworth two-component motor control under extreme speed demands",
    content: "Rapid target acquisition relies on Woodworth\'s (1899) classic two-phase model: an initial open-loop ballistic motor impulse that snaps the cursor into the target vicinity, followed by fine visual adjustments before executing the click. As velocity scales up to 3.8x, the motor cortex minimizes dwell time between target detection and trigger execution."
  },
  {
    icon: Target,
    title: "Shrinking Spatial Boundaries & Fitts\'s Law Index of Difficulty",
    subtitle: "Logarithmic speed-accuracy tradeoffs during target decay",
    content: "Each target shrinks continuously from spawn until expiration. According to Fitts\'s Law (1954), the index of difficulty increases logarithmically as target width (W) constricts. Players must strike a balance between striking early at larger diameters versus waiting for stabilized tracking at smaller radii."
  },
  {
    icon: Eye,
    title: "Pre-Attentive Visual Saliency & Peripheral Detection",
    subtitle: "Feature integration and rapid covert orienting",
    content: "Formulated by Treisman & Gelade (1980), high-contrast moving targets trigger bottom-up visual saliency maps in the superior colliculus and parietal cortex. Peripheral vision flags target trajectory shifts instantly, directing saccadic eye movements to guide motor flick execution."
  },
  {
    icon: Timer,
    title: "Optical Tau & Time-to-Contact Interception Margin",
    subtitle: "Retinal expansion rate analysis before target extinction",
    content: "The visual system gauges target expiration via optical tau (τ), the inverse rate of retinal boundary decay (Lee, 1976). Accurate estimation of remaining time prevents premature frantic clicking or fatal hesitation, sustaining unbroken combo multipliers."
  }
];

export default function SpeedDrillClient() {
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
    accuracy: 100, hits: 0, misses: 0, bestReaction: 0,
    peakSpeed: 1.0, maxCombo: 0, finalLevel: 1, grade: null
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
    target: { x: 0, y: 0, r: 45, maxR: 45, vx: 0, vy: 0, ax: 0, ay: 0 },
    targetSpeedMulti: 1.0,
    targetState: 'WAITING',
    spawnTime: 0,
    score: 0, level: 1, combo: 0, timeLeft: DRILL_DURATION,
    hits: 0, misses: 0, bestStreak: 0, bestReactionTime: 0, totalActions: 0,
    particles: [], hitMarkers: [], screenShake: 0,
    logicalWidth: 800, logicalHeight: 450, peakSpeed: 1.0
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

  const spawnTarget = useCallback((width, height, currentLevel) => {
    const e = engine.current;
    const config = getLevelConfig(currentLevel, e.combo);
    const padding = 60;

    let newX, newY;
    let attempts = 0;
    do {
      newX = padding + Math.random() * (width - padding * 2);
      newY = padding + Math.random() * (height - padding * 2);
      attempts++;
    } while (Math.hypot(newX - e.crosshair.x, newY - e.crosshair.y) < 100 && attempts < 10);

    const initialV = 120 * config.speedMulti;
    const angle = Math.random() * Math.PI * 2;

    e.target = {
      x: newX,
      y: newY,
      r: config.maxRadius,
      maxR: config.maxRadius,
      vx: Math.cos(angle) * initialV,
      vy: Math.sin(angle) * initialV,
      ax: (Math.random() - 0.5) * 50,
      ay: (Math.random() - 0.5) * 50
    };

    e.targetSpeedMulti = config.speedMulti;
    e.targetState = 'ACTIVE';
    e.spawnTime = performance.now();
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
    e.misses++;
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
    const totalAttempts = e.hits + e.misses;
    const accuracyPct = totalAttempts > 0 ? Math.round((e.hits / totalAttempts) * 100) : 100;
    const rating = getFpsScoreGrade(e.score, ELITE_SCORE);

    const grade = { letter: rating.grade || rating.letter || 'C', label: rating.label || 'Keep Going', color: rating.color || 'text-amber-400' };

    setAnalytics({
      accuracy: accuracyPct, hits: e.hits, misses: e.misses,
      bestReaction: Math.round(e.bestReactionTime), peakSpeed: parseFloat(e.peakSpeed.toFixed(1)),
      maxCombo: e.bestStreak, finalLevel: Math.floor(bestLevelRunRef.current), grade
    });

    setUiScore(e.score);

    const prevSaved = getSavedData();
    const isNewHigh = e.score > prevSaved.bestScore;
    setIsNewBest(isNewHigh);

    const runBestLevel = Math.max(prevSaved.bestLevel || 1, Math.floor(bestLevelRunRef.current));
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
      target: { x: w / 2, y: h / 2, r: 45, maxR: 45, vx: 0, vy: 0, ax: 0, ay: 0 },
      targetSpeedMulti: 1.0,
      targetState: 'WAITING',
      spawnTime: 0,
      score: 0, level: startLevel, combo: 0, timeLeft: DRILL_DURATION,
      hits: 0, misses: 0, bestStreak: 0, bestReactionTime: 9999, totalActions: 0,
      particles: [], hitMarkers: [], screenShake: 0,
      logicalWidth: w, logicalHeight: h, peakSpeed: 1.0
    };

    spawnTarget(w, h, startLevel);

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
  }, [isTouchOnlyDevice, spawnTarget]);

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
      const now = performance.now();

      if (eng.targetState === 'ACTIVE') {
        const dist = Math.hypot(eng.crosshair.x - eng.target.x, eng.crosshair.y - eng.target.y);
        if (dist <= eng.target.r) {
          const rxTime = now - eng.spawnTime;
          if (rxTime < eng.bestReactionTime) eng.bestReactionTime = rxTime;

          eng.hits++;
          eng.timeLeft += TIME_PER_HIT;
          eng.combo++;
          if (eng.combo > eng.bestStreak) eng.bestStreak = eng.combo;

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
          createExplosion(eng.target.x, eng.target.y, '#eab308');
          spawnTarget(eng.logicalWidth, eng.logicalHeight, eng.level);
        } else {
          applyPenalty();
        }
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
  }, [universalSens, gameState, isTouchOnlyDevice, handleExitDrill, applyPenalty, spawnTarget]);

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
        if (cfg.speedMulti > e.peakSpeed) e.peakSpeed = cfg.speedMulti;

        if (e.targetState === 'ACTIVE') {
          e.target.vx += e.target.ax * dt;
          e.target.vy += e.target.ay * dt;
          e.target.x += e.target.vx * dt;
          e.target.y += e.target.vy * dt;

          const shrinkRate = 18 * cfg.shrinkSpeedFactor;
          if (drillTimeout.isEnabled()) e.target.r -= shrinkRate * dt;

          if (e.target.x - e.target.r < 20 || e.target.x + e.target.r > w - 20) e.target.vx *= -1;
          if (e.target.y - e.target.r < 20 || e.target.y + e.target.r > h - 20) e.target.vy *= -1;

          if (drillTimeout.isEnabled() && e.target.r <= 4) {
            applyPenalty();
            spawnTarget(w, h, e.level);
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

      if (gameState === 'playing' || gameState === 'start') {
        if (e.targetState === 'ACTIVE') {
          const targetColor = e.combo >= 10 ? '#38bdf8' : '#eab308';
          const age = performance.now() - (e.spawnTime || performance.now());
          const progress = Math.min(1, age / 1500);

          drawPulseRing(ctx, e.target.x, e.target.y, e.target.r, targetColor, progress);
          drawTacticalTarget(ctx, e.target.x, e.target.y, e.target.r, targetColor, false);
        }
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
        const activeColor = pointerLocked ? '#eab308' : '#eab308';
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
  }, [gameState, endGame, applyPenalty, spawnTarget]);

  const shareScore = useCallback(async () => {
    const url = 'https://skilldrills.online/drills/physical/fitness/speed-drill';
    try {
      const canvas = generateShareCard({
        score: uiScore,
        bestScore,
        accuracy: analytics.accuracy,
        bestCombo: analytics.maxCombo,
        rating: { letter: analytics.grade?.letter || 'C', label: analytics.grade?.label || 'Keep Going', emoji: '⚡' },
        newBest: isNewBest,
        drillName: 'Speed Drill Pro',
        playerName: getPlayerName(),
      });
      await shareScoreCard(url, canvas);
    } catch (e) {
      const text = `⚡ I scored ${uiScore} PTS (Level ${analytics.finalLevel}) on Speed Drill! Accuracy: ${analytics.accuracy}%. Test your reaction speed at skilldrills.online!`;
      if (typeof navigator !== 'undefined' && navigator.share) {
        navigator.share({ title: 'My Speed Drill Score', text, url }).catch(() => {});
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
              Speed Drill
              <span data-seo-kw="1" className="block text-sm font-semibold text-slate-400 mt-1">
                Speed Drill Training
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-3xl leading-relaxed">
              A speed drill measures how fast you can move onto a target and click it as the target gets smaller and the time allowed gets shorter. Fitts&apos;s Law sets the floor: movement time grows with the logarithm of the distance to a target divided by its width, so a target half the size costs about the same extra time as one twice as far away (Fitts, 1954). The movement arrives in two parts &mdash; a fast ballistic impulse, then a slower visually guided correction (Woodworth, 1899) &mdash; and it is the correction that shrinking targets make expensive.
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
              <div className="text-lg sm:text-2xl font-black text-amber-400 tabular-nums">{bestCombo}x</div>
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
              icon={Zap}
              accent="amber"
              title="Speed Drill"
              subtitle="Rapid Target Acquisition & Tapping • Continuous Scaling"
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
              accent="amber"
              grade={analytics.grade}
              score={uiScore}
              isNewBest={isNewBest}
              stats={[
                { label: 'Accuracy', value: analytics.accuracy, suffix: '%' },
                { label: 'Hits', value: analytics.hits },
                { label: 'Best Reaction', value: analytics.bestReaction, suffix: 'ms' },
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
              title="About Speed Drill Training"
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