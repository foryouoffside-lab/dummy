'use client';
import { isIdleFrameSkippable } from '@/lib/performance';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';

import {
  Activity, AlertCircle, ArrowRight, ChevronRight, Crosshair,
  Eye, GraduationCap, Play, RefreshCw, Target,
  Timer, TrendingUp, Trophy, Volume2, VolumeX,
  Zap, ZapOff, Users, Share2, Sliders,
  LogOut, Award, ShieldAlert, BarChart3, Info, Lightbulb, Flame, Star,
  Copy, Check, Code, ShieldCheck, Sparkles
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
import FpsStartCard from '../../../../../components/drill/FpsStartCard';
import DrillResultCard from '../../../../../components/drill/DrillResultCard';
import useImmersiveMode from '@/lib/useImmersiveMode';

// ============================================================
// TUNING CONSTANTS
// ============================================================
const DRILL_DURATION = 45; // starting clock only; a run grows past this
const POINTS_PER_LEVEL = 1750; // 250 -> 1750 (7x)
const ELITE_SCORE = 24000; // 17000 -> 24000 (1.4x)
const TIME_PER_HIT = 0.6; // +0.6s on green catch
const TIME_PENALTY = 0.8; // -0.8s on missed green or red decoy click (opt-in gated)
const STORAGE_KEY = 'skilldrills_physical_drop_catch_v4';

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
    baseSpeed: ramp(400, 1250, p) * (1 + heat * 0.25),
    spawnDelay: Math.max(0.18, ramp(0.8, 0.22, p) * (1 - heat * 0.25)),
    fakeProb: Math.min(0.45, 0.15 + p * 0.25),
    ballRadius: Math.max(12, ramp(28, 14, p) * (1 - heat * 0.15))
  };
};

const RULES_ITEMS = [
  { title: "Catch Green Target", text: "Click falling green targets to score +100 Base PTS scaled with combo multiplier (+0.6s per catch)." },
  { title: "Combo System", text: "Chain unbroken catches to build combo multiplier up to 3.0x max." },
  { title: "Level Progression", text: "Score increases level continuously. Falling speed & decoy traps accelerate dynamically." },
  { title: "Miss / Decoy Trap", text: "Missing green target or clicking red decoy resets combo streak (and deducts 0.8s if enabled in settings)." }
];

const ABOUT_TEXT = `Reflex Drop Catch trains visual discrimination and impulse control. By forcing you to rapidly differentiate between valid green targets and red decoys moving at high speeds, you build the cognitive override necessary to prevent misclicks and friendly-fire incidents in high-pressure scenarios.

As you score points, the engine adaptively accelerates falling velocities from 400 px/s up to 1250 px/s, shrinks target radiuses, and increases the frequency of decoy traps.

Instantly distinguish between enemies, teammates, and decoy utility in chaos without sacrificing click execution time.`;

const FAQ_ITEMS = [
  { q: "What is a reflex test?", a: "A reflex test measures the speed and accuracy of your neuromuscular response to sudden visual stimuli, filtering out decoy targets." },
  { q: "How does target recognition improve gaming?", a: "In competitive FPS games like Valorant or CS2, you must rapidly distinguish between enemies, teammates, and utility (like flashes)." },
  { q: "Why are there red decoy balls?", a: "The red decoys test your impulse control. Pure reaction speed is useless if you shoot the wrong target." },
  { q: "How does adaptive difficulty work?", a: "As your score increases, difficulty scales continuously. Falling velocity accelerates, radiuses shrink, and decoy probability increases." },
  { q: "What happens when I miss or hit a decoy?", a: "Missing a green target or clicking a red decoy resets your combo multiplier back to 1.0x and triggers a red flash overlay. Clean catches add +0.6s to your timer, and missing a target or hitting a decoy deducts 0.8s when time penalty is enabled in settings." },
  { q: "How long does each session run?", a: "Each session starts with a 45-second timer. Catching green targets earns +0.6s time extensions, allowing skilled players to extend runs dynamically as difficulty ramps up." },
  { q: "What is impulse control training?", a: "Impulse control training conditions your brain to suppress an automatic physical reaction (clicking) until your visual cortex verifies the stimulus is correct (green vs red)." },
  { q: "Is this reflex game free to play?", a: "Yes! The SkillDrills Reflex Test is entirely free, open-source, and runs purely in your web browser with zero downloads required." },
  { q: "How long should I practice reflex training daily?", a: "For optimal cognitive adaptation and motor learning, practicing this drill for 5 to 10 minutes a day is more effective than occasional hour-long sessions." }
];

const RELATED_DRILLS = [
  { id: "stability-challenge", name: "Stability Challenge", cat: "Physical Balance", desc: "Test static and dynamic balance holding capabilities.", href: "/drills/physical/balance-training/stability-challenge" },
  { id: "complex-pattern", name: "Complex Pattern", cat: "Physical Coordination", desc: "Train complex multi-limb movement patterns.", href: "/drills/physical/coordination/complex-pattern" },
  { id: "cross-body-movement", name: "Cross-Body Movement", cat: "Physical Coordination", desc: "Improve bilateral motor coordination and cross-body tracking.", href: "/drills/physical/coordination/cross-body-movement" },
  { id: "dynamic-grid-evasion", name: "Dynamic Grid Evasion", cat: "Physical Coordination", desc: "Evade dynamic grid hazards with rapid motor adjustments.", href: "/drills/physical/coordination/dynamic-grid-evasion" },
  { id: "speed-drill", name: "Speed Drill Pro", cat: "Physical Fitness", desc: "Rapid target acquisition & high-velocity tapping exercise.", href: "/drills/physical/fitness/speed-drill" },
];

const BENCHMARK_TIERS = [
  { tier: "Novice / Casual", level: "Lv. 1 – 4", latency: "320ms – 400ms", percentile: "Bottom 40%", target: "Casual browsing & everyday computer usage", color: "text-slate-400", badge: "bg-slate-500/10 border-slate-500/20" },
  { tier: "Trained Gamer", level: "Lv. 5 – 8", latency: "245ms – 310ms", percentile: "Top 35%", target: "Regular PC gamers with developed hand-eye tracking", color: "text-blue-400", badge: "bg-blue-500/10 border-blue-500/20" },
  { tier: "Advanced Competitor", level: "Lv. 9 – 12", latency: "195ms – 240ms", percentile: "Top 10%", target: "Competitive esports players / high-velocity reaction", color: "text-amber-400", badge: "bg-amber-500/10 border-amber-500/20" },
  { tier: "Genetic Elite", level: "Lv. 13+", latency: "< 190ms", percentile: "Top 1%", target: "Esports professionals / fighter pilot reaction limits", color: "text-emerald-400", badge: "bg-emerald-500/10 border-emerald-500/20" },
];

const HOW_TO_STEPS = [
  { step: "01", title: "Watch the Drop Zone", desc: "Balls spawn from the upper border and accelerate from 400 px/s up to 1,250 px/s as your level rises." },
  { step: "02", title: "Discriminate the Stimulus", desc: "Green balls are valid scoring targets. Red balls marked with 'X' are deceptive decoys designed to test impulse inhibition." },
  { step: "03", title: "Catch Green, Avoid Decoys", desc: "Click green targets before they exit the lower screen to earn +100 PTS and +0.6s time extensions while keeping your streak unbroken." },
];

export default function DropCatchClient() {
  const [gameState, setGameState] = useState('start'); // 'start' | 'countdown' | 'playing' | 'gameOver'
  const [isFullscreen, setIsFullscreen] = useState(false);
  useImmersiveMode(isFullscreen); // locks the page behind while the drill fills the screen
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [flashEnabled, setFlashEnabled] = useState(true);
  const [penaltyEnabled, setPenaltyEnabled] = useState(false);
  const [pointerLocked, setPointerLocked] = useState(false);
  const universalSens = useDrillSensitivity();
  const [isTouchOnlyDevice, setIsTouchOnlyDevice] = useState(false);
  const [copiedEmbed, setCopiedEmbed] = useState(false);
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
    accuracy: 100, catches: 0, misses: 0, decoyHits: 0,
    peakSpeed: 400, maxCombo: 0, finalLevel: 1, grade: null
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
    balls: [],
    score: 0, level: 1, combo: 0, timeLeft: DRILL_DURATION,
    catches: 0, misses: 0, decoyHits: 0, maxCombo: 0, totalActions: 0,
    baseSpeed: 400, spawnDelay: 0.8, spawnTimer: 0, fakeProb: 0.15, ballRadius: 28,
    particles: [], hitMarkers: [], screenShake: 0,
    logicalWidth: 800, logicalHeight: 450, peakSpeed: 400
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

  const spawnBall = useCallback((width, currentLevel) => {
    const e = engine.current;
    const config = getLevelConfig(currentLevel, e.combo);
    const padding = 60;

    const isFake = Math.random() < config.fakeProb;
    const speedVariation = (Math.random() - 0.5) * (config.baseSpeed * 0.15);

    e.balls.push({
      id: Math.random(),
      x: padding + Math.random() * (width - padding * 2),
      y: -50,
      r: config.ballRadius,
      speed: config.baseSpeed + speedVariation,
      isFake,
      spawnTime: performance.now()
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
    const totalAttempts = e.catches + e.misses + e.decoyHits;
    const accuracyPct = totalAttempts > 0 ? Math.round((e.catches / totalAttempts) * 100) : 100;
    const rating = getFpsScoreGrade(e.score, ELITE_SCORE);

    const grade = { letter: rating.grade || rating.letter || 'C', label: rating.label || 'Keep Going', color: rating.color || 'text-emerald-400' };

    setAnalytics({
      accuracy: accuracyPct, catches: e.catches, misses: e.misses, decoyHits: e.decoyHits,
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
      balls: [],
      score: 0, level: startLevel, combo: 0, timeLeft: DRILL_DURATION,
      catches: 0, misses: 0, decoyHits: 0, maxCombo: 0, totalActions: 0,
      baseSpeed: 400, spawnDelay: 0.8, spawnTimer: 0, fakeProb: 0.15, ballRadius: 28,
      particles: [], hitMarkers: [], screenShake: 0,
      logicalWidth: w, logicalHeight: h, peakSpeed: 400
    };

    spawnBall(w, startLevel);

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
  }, [isTouchOnlyDevice, spawnBall]);

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

      for (let i = eng.balls.length - 1; i >= 0; i--) {
        const b = eng.balls[i];
        const dist = Math.hypot(eng.crosshair.x - b.x, eng.crosshair.y - b.y);

        if (dist <= b.r) {
          if (b.isFake) {
            eng.decoyHits++;
            applyPenalty();
            createExplosion(b.x, b.y, '#ef4444');
          } else {
            eng.catches++;
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
            createExplosion(b.x, b.y, '#10b981');
          }

          eng.balls.splice(i, 1);
          return;
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
        if (e.spawnTimer >= cfg.spawnDelay) {
          e.spawnTimer = 0;
          spawnBall(w, e.level);
        }

        for (let i = e.balls.length - 1; i >= 0; i--) {
          const b = e.balls[i];
          b.y += b.speed * dt;

          if (!drillTimeout.isEnabled() && b.y - b.r > h) {
            b.y = h + b.r;
            continue;
          }

          if (b.y - b.r > h) {
            if (!b.isFake) {
              e.misses++;
              applyPenalty();
            }
            e.balls.splice(i, 1);
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
        e.balls.forEach((b) => {
          const targetColor = b.isFake ? '#ef4444' : (e.combo >= 10 ? '#38bdf8' : '#00ff88');
          const age = performance.now() - b.spawnTime;
          const progress = Math.min(1, age / 1500);

          drawPulseRing(ctx, b.x, b.y, b.r, targetColor, progress);
          drawTacticalTarget(ctx, b.x, b.y, b.r, targetColor, false);

          if (b.isFake) {
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(b.x - b.r * 0.35, b.y - b.r * 0.35); ctx.lineTo(b.x + b.r * 0.35, b.y + b.r * 0.35);
            ctx.moveTo(b.x + b.r * 0.35, b.y - b.r * 0.35); ctx.lineTo(b.x - b.r * 0.35, b.y + b.r * 0.35);
            ctx.stroke();
          }
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
  }, [gameState, endGame, applyPenalty, spawnBall]);

  const shareScore = useCallback(async () => {
    const url = 'https://skilldrills.online/drills/physical/reflex-training/drop-catch';
    try {
      const canvas = generateShareCard({
        score: uiScore,
        bestScore,
        accuracy: analytics.accuracy,
        bestCombo: analytics.maxCombo,
        rating: { letter: analytics.grade?.letter || 'C', label: analytics.grade?.label || 'Keep Going', emoji: '🎯' },
        newBest: isNewBest,
        drillName: 'Reflex Drop Catch',
        playerName: getPlayerName(),
      });
      await shareScoreCard(url, canvas);
    } catch (e) {
      const text = `🎯 I scored ${uiScore} PTS (Level ${analytics.finalLevel}) on Reflex Drop Catch! Accuracy: ${analytics.accuracy}%. Test your reaction speed at skilldrills.online!`;
      if (typeof navigator !== 'undefined' && navigator.share) {
        navigator.share({ title: 'My Reflex Drop Catch Score', text, url }).catch(() => {});
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
        {/* Title */}
        {!isFullscreen && (
          <div className="text-center max-w-3xl mx-auto pt-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-2xs font-mono font-bold uppercase tracking-widest mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Cognitive Reflex &amp; Impulse Control</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white uppercase">
              Reflex Drop Catch Test
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed max-w-xl mx-auto font-sans">
              Train reaction speed, visual discrimination, and inhibitory impulse control. Catch falling green targets, avoid deceptive red decoys, and calibrate your reflex thresholds.
            </p>
          </div>
        )}

        {/* Live Stat Cards (shown when playing or if player has established a score) */}
        {!isFullscreen && (gameState === 'playing' || gameState === 'gameOver' || bestScore > 0) && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-w-2xl mx-auto w-full">
            <div className="bg-[#0d0d18] border border-white/5 rounded-xl p-2.5 text-center">
              <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Score</div>
              <div className="text-lg sm:text-xl font-black text-white tabular-nums">{uiScore}</div>
            </div>
            <div className="bg-[#0d0d18] border border-white/5 rounded-xl p-2.5 text-center">
              <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Time</div>
              <div className={`text-lg sm:text-xl font-black tabular-nums ${uiTimeLeft <= 10 ? 'text-red-400 animate-pulse' : 'text-white'}`}>{uiTimeLeft}s</div>
            </div>
            <div className="bg-[#0d0d18] border border-white/5 rounded-xl p-2.5 text-center">
              <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Best Score</div>
              <div className="text-lg sm:text-xl font-black text-amber-400 tabular-nums">{bestScore}</div>
            </div>
            <div className="bg-[#0d0d18] border border-white/5 rounded-xl p-2.5 text-center">
              <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Best Combo</div>
              <div className="text-lg sm:text-xl font-black text-emerald-400 tabular-nums">{bestCombo}x</div>
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
              icon={Target}
              accent="emerald"
              title="Reflex Drop Catch"
              subtitle="Visual Discrimination & Impulse Control • Continuous Scaling"
              rules={[
                { icon: Zap, accent: 'emerald', title: 'Catch Green Target (+100 PTS)', text: '+100 PTS × Combo × Level multiplier (+0.6s per catch)' },
                {
                  icon: ShieldAlert,
                  accent: 'red',
                  title: penaltyEnabled ? 'Decoy Traps & Time Penalty' : 'Decoy Traps & Combo Reset',
                  text: penaltyEnabled
                    ? 'Ignore red decoys. Missed targets or decoys subtract 0.8s and reset combo'
                    : 'Ignore red decoys marked X. Missed targets or decoys reset combo streak'
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
                { label: 'Catches', value: analytics.catches },
                { label: 'Fatal Decoys', value: analytics.decoyHits },
                { label: 'Peak Level', value: `Lv. ${analytics.finalLevel}` },
              ]}
              onPlayAgain={enterDrill}
              onShare={shareScore}
              onExit={handleExitDrill}
            />
          )}
        </div>

        {/* ── RICH EDITORIAL & SEO RANKING SUITE ── */}
        {!isFullscreen && (
          <div className="space-y-8 mt-6">

            {/* 1. HOW TO PRACTICE (Direct 1:1 match with HowTo Schema) */}
            <section className="bg-surface-1/90 border border-hairline rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-xl">
              <div className="flex items-center gap-2.5 mb-5">
                <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                  <Play className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-white uppercase tracking-wider font-mono">
                    How to Practice the Reflex Drop Catch Drill
                  </h2>
                  <p className="text-xs text-ink-3">Step-by-step instructions to train reaction speed and stimulus discrimination</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {HOW_TO_STEPS.map((step) => (
                  <div key={step.step} className="bg-surface-2 border border-hairline rounded-2xl p-5 relative overflow-hidden">
                    <div className="text-xs font-mono font-bold text-emerald-400/60 uppercase tracking-wider mb-2">
                      Step {step.step}
                    </div>
                    <h3 className="text-sm font-bold text-white mb-2 font-mono">{step.title}</h3>
                    <p className="text-xs text-ink-2 leading-relaxed font-sans">{step.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* 2. HUMAN REFLEX BENCHMARKS & PERCENTILES (Information Gain Feature) */}
            <section className="bg-surface-1/90 border border-hairline rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-xl">
              <div className="flex items-center gap-2.5 mb-5">
                <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
                  <BarChart3 className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-white uppercase tracking-wider font-mono">
                    Human Reflex &amp; Reaction Speed Benchmarks
                  </h2>
                  <p className="text-xs text-ink-3">How your reaction time compares to average human performance tiers</p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono border-collapse">
                  <thead>
                    <tr className="border-b border-hairline text-ink-3 uppercase text-[11px]">
                      <th className="py-3 px-4 font-bold">Skill Tier</th>
                      <th className="py-3 px-4 font-bold">Drop Catch Level</th>
                      <th className="py-3 px-4 font-bold">Estimated Latency</th>
                      <th className="py-3 px-4 font-bold">Global Percentile</th>
                      <th className="py-3 px-4 font-bold hidden sm:table-cell">Real-World Profile</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-hairline">
                    {BENCHMARK_TIERS.map((tier) => (
                      <tr key={tier.tier} className="hover:bg-white/[0.02] transition-colors">
                        <td className="py-3.5 px-4 font-bold text-white flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${tier.badge.split(' ')[0].replace('/10', '')}`} />
                          <span>{tier.tier}</span>
                        </td>
                        <td className={`py-3.5 px-4 font-bold ${tier.color}`}>{tier.level}</td>
                        <td className="py-3.5 px-4 text-ink-1 font-bold">{tier.latency}</td>
                        <td className="py-3.5 px-4">
                          <span className={`px-2 py-0.5 rounded-md text-[10px] border font-bold ${tier.badge} ${tier.color}`}>
                            {tier.percentile}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-ink-3 hidden sm:table-cell">{tier.target}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* 3. COGNITIVE IMPULSE CONTROL (Neuroscience of Go / No-Go Paradigm) */}
            <section className="bg-surface-1/90 border border-hairline rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-xl">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
                  <Eye className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-white uppercase tracking-wider font-mono">
                    Visual Discrimination &amp; Inhibitory Impulse Control
                  </h2>
                  <p className="text-xs text-ink-3">Why raw reaction speed without discrimination leads to costly errors</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-ink-2 leading-relaxed font-sans pt-2">
                <div className="space-y-3">
                  <p>
                    Most online reaction time tests only test <em>simple reaction time</em> (clicking when a red box turns green). In real competitive gaming and athletics, simple reaction tests are rarely applicable because visual environments are packed with clutter, moving decoys, and teammates.
                  </p>
                  <p>
                    <strong>Reflex Drop Catch</strong> enforces the neuroscientific <strong>Go / No-Go paradigm</strong>. When a target enters your field of view, your motor cortex naturally wants to fire immediately. This drill forces your prefrontal cortex to perform a cognitive override, verifying target validity (green vs red decoy) before executing the click.
                  </p>
                </div>
                <div className="space-y-3">
                  <p>
                    As targets accelerate from <strong>400 px/s up to 1,250 px/s</strong>, the decision window shrinks to sub-200ms intervals. This directly trains your visual filtering pathways to suppress false positives and eliminate panic misclicks in competitive shooters like Valorant, CS2, and Apex Legends.
                  </p>
                  <div className="p-3.5 rounded-xl bg-surface-2 border border-hairline flex items-center gap-3">
                    <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                    <span className="text-2xs font-mono text-ink-1">
                      Adaptive velocity scaling and decoy probability increase continuously as score accumulates.
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* 4. SCORING MATRIX & TIME EXTENSION RULES */}
            <section className="bg-surface-1/90 border border-hairline rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-xl">
              <div className="flex items-center gap-2.5 mb-5">
                <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
                  <Trophy className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-white uppercase tracking-wider font-mono">
                    Scoring Rules &amp; Dynamic Multipliers
                  </h2>
                  <p className="text-xs text-ink-3">Mechanics governing points, combos, streak multipliers, and session timers</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {RULES_ITEMS.map((item, i) => (
                  <div key={i} className="bg-surface-2 border border-hairline p-4 rounded-xl">
                    <p className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider mb-1.5">{item.title}</p>
                    <p className="text-2xs text-ink-2 leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* 5. FREQUENTLY ASKED QUESTIONS (Direct 1:1 match with FAQPage Schema) */}
            <section className="bg-surface-1/90 border border-hairline rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-xl">
              <div className="flex items-center gap-2.5 mb-5">
                <div className="p-2 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-white uppercase tracking-wider font-mono">
                    Frequently Asked Questions
                  </h2>
                  <p className="text-xs text-ink-3">Common questions regarding reflex calibration, impulse control, and training cadence</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {FAQ_ITEMS.map((item, i) => (
                  <div key={i} className="bg-surface-2 border border-hairline rounded-xl p-4 sm:p-5">
                    <h3 className="text-xs sm:text-sm font-bold font-mono text-white mb-2 leading-snug">{item.q}</h3>
                    <p className="text-2xs sm:text-xs text-ink-2 leading-relaxed">{item.a}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* 6. EMBED TOOLKIT & BACKLINK MAGNET */}
            <section className="bg-surface-1/90 border border-hairline rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400">
                    <Code className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-white uppercase tracking-wider font-mono">
                      Embed This Drill on Your Website
                    </h2>
                    <p className="text-xs text-ink-3">Free interactive reflex game widget for esports portals, blogs, and community forums</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    const code = '<iframe src="https://skilldrills.online/drills/physical/reflex-training/drop-catch" width="100%" height="620" style="border:none;border-radius:16px;" allow="fullscreen"></iframe>';
                    navigator.clipboard.writeText(code);
                    setCopiedEmbed(true);
                    setTimeout(() => setCopiedEmbed(false), 2200);
                  }}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-500 text-white text-xs font-mono font-bold uppercase tracking-wider hover:bg-emerald-400 transition-colors shrink-0 shadow-lg shadow-emerald-500/20"
                >
                  {copiedEmbed ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedEmbed ? 'Copied!' : 'Copy Embed Code'}</span>
                </button>
              </div>

              <div className="p-3.5 bg-black/60 border border-hairline rounded-xl font-mono text-[11px] text-ink-3 overflow-x-auto select-all">
                <code>&lt;iframe src=&quot;https://skilldrills.online/drills/physical/reflex-training/drop-catch&quot; width=&quot;100%&quot; height=&quot;620&quot; style=&quot;border:none;border-radius:16px;&quot; allow=&quot;fullscreen&quot;&gt;&lt;/iframe&gt;</code>
              </div>
            </section>

          </div>
        )}

        {/* ── RELATED PHYSICAL DRILLS ── */}
        {!isFullscreen && (
          <section className="mt-4">
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3 font-sans">
              Related Physical &amp; Reflex Drills
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {RELATED_DRILLS.map((drill) => (
                <Link
                  key={drill.id}
                  href={drill.href}
                  className="group bg-[#0c0c16] border border-white/5 hover:border-emerald-500/40 rounded-xl p-3.5 transition-all duration-200 hover:-translate-y-0.5 flex flex-col justify-between"
                >
                  <div>
                    <div className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider mb-1">{drill.cat}</div>
                    <div className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors">{drill.name}</div>
                    <div className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">{drill.desc}</div>
                  </div>
                  <div className="text-[10px] font-bold text-slate-500 group-hover:text-emerald-400 mt-3 flex items-center gap-1 transition-colors">
                    Train Drill <span>→</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ── FOOTER ── */}
        {!isFullscreen && <DrillFooter />}

      </main>
    </div>
  );
}