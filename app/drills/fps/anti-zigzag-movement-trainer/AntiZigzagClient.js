'use client';
import { isIdleFrameSkippable } from '@/lib/performance';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';

import {
  Activity, AlertCircle, ArrowRight, ChevronRight, Crosshair,
  Eye, GraduationCap, RefreshCw, Target,
  Timer, TrendingUp, Trophy, Volume2, VolumeX,
  Flame, Share2, LogOut,
  Award, Shield, Users, Zap, ZapOff, RotateCcw
} from 'lucide-react';

import generateShareCard, { shareScoreCard } from '../../../../components/ShareScoreCard';
import { getPlayerName } from '../../../../lib/leaderboard';
import { drillAudio } from '../../../../lib/drillAudio';
import { drillFlash } from '../../../../lib/drillFlash';
import { drillPenalty } from '../../../../lib/drillPenalty';
import { getStartLevel, getDifficultyProgress, ramp } from '../../../../lib/drillDifficulty';
import { getComboMultiplier, getFpsScoreGrade } from '../../../../lib/scoringEngine';
import { createBackdropCache, getCanvasDpr, drawPulseRing, drawTacticalTarget } from '../../../../lib/canvasFx';
import useUnexpectedExitGuard from '../../../../lib/useUnexpectedExitGuard';
import DrillFooter from '../../../../components/drill/DrillFooter';
import DrillCountdown from '../../../../components/drill/DrillCountdown';
import DrillAccordion from '../../../../components/drill/DrillAccordion';
import FpsStartCard from '../../../../components/drill/FpsStartCard';
import DrillResultCard from '../../../../components/drill/DrillResultCard';
import useImmersiveMode from '@/lib/useImmersiveMode';

// ============================================================
// TUNING CONSTANTS
// ============================================================
const DRILL_DURATION = 45; // starting clock only; a run grows past this
const POINTS_PER_LEVEL = 1400; // 150 -> 1400 (~7x)
const ELITE_SCORE = 54000; // 18000 -> 54000 (3x)
const TIME_PER_HIT = 0.4; // +0.1s per 0.25s tracking tick (+0.4s/sec)
const TIME_PENALTY = 0.6; // opt-in on escape or 1.0s tracking loss
const STORAGE_KEY = 'skilldrills_fps_anti_zigzag_v3';

const getSavedData = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { bestScore: 0, bestCombo: 0, bestLevel: 1, totalSessions: 0, ...JSON.parse(raw) };
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

const getLevelConfig = (level, combo = 0) => {
  const p = getDifficultyProgress(level); // 0 at L1, 1 at L15, unbounded above
  const heat = (getComboMultiplier(combo) - 1) / 2;
  return {
    radius: Math.max(8.5, ramp(16.0, 9.5, p) * (1 - heat * 0.15)),
    speedMult: ramp(1.0, 2.6, p) * (1 + heat * 0.20),
    zigzagInterval: Math.max(0.20, ramp(1.2, 0.25, p) * (1 - heat * 0.25)),
    maxLifespan: Math.max(1.5, ramp(4.2, 1.8, p) * (1 - heat * 0.15))
  };
};

// ============================================================
// ACCORDION DATA
// ============================================================
const RULES_ITEMS = [
  { num: "1", text: "Tracking Alignment", highlight: "+10 PTS / 0.25s", result: "Continuous Crosshair Lock On Target" },
  { num: "2", text: "Target Elimination", highlight: "+25 Bonus PTS", result: "Fully Deplete Target Health" },
  { num: "3", text: "Continuous Tracking Uptime", highlight: "+0.4s / sec", result: "Chain Streak Multipliers up to 3.0x" },
  { num: "4", text: "Escape / Tracking Loss", highlight: "Failure Penalty", result: "Combo resets to 0 (-0.6s with Time Penalty enabled)" }
];

const ABOUT_INTRO = [
  "Anti-zigzag tracking trains your ability to maintain continuous crosshair contact on targets that abuse erratic direction changes, slide-cancels, crouch spamming, and burst strafes. Unlike smooth pursuit training, this drill forces reactive corrections against unpredictable V-shaped snap reversals."
];

const ABOUT_CARDS = [
  { icon: Users, iconBg: "bg-blue-600", title: "Who Should Use This?", text: "Apex Legends, Warzone, and Call of Duty Mobile players facing opponents who zigzag to desync their hitbox from their visual model." },
  { icon: TrendingUp, iconBg: "bg-emerald-600", title: "Skills Improved", text: "Reactive tracking, direction-change correction, and the muscle memory needed to chase V-shaped snap reversals under pressure." },
  { icon: Target, iconBg: "bg-purple-600", title: "V-Crossover Targeting", text: "Avoid chasing outer sweeps. Aim at the V-crossover center, wait for the direction change, and maintain lock through the reversal." },
];

const ABOUT_SECTIONS = [
  {
    icon: Activity,
    title: "Why Enemies Zigzag In High-TTK Games",
    paragraphs: [
      "In high-TTK games like Apex Legends, Warzone, and Call of Duty Mobile, opponents use aggressive zigzag movement to desync their hitbox from their visual model. This drill replicates that exact momentum shift to build your reactive tracking muscle memory."
    ]
  }
];

const FAQ_ITEMS = [
  { q: "Why do players zigzag in CODM?", a: "It throws off aim assist, desyncs the physical hitbox from the visual character model, and forces you to waste ammunition trying to track wide, unpredictable sweeps." },
  { q: "Should I zigzag back during gunfights?", a: "Yes and no. While strafing is vital, excessive zigzagging without proper crosshair alignment will ruin your own aim. Good players balance evasion with precision." },
  { q: "Is this drill for touch screen or mouse?", a: "Both. The engine dynamically scales the target sizes and hitboxes depending on whether you are swiping on a mobile device or aiming with a desktop mouse." },
  { q: "How do I get a higher accuracy score?", a: "Stop predicting. Reactive tracking means letting your eyes process the direction change first, then snapping to the target. Predicting leads to over-flicking." },
  { q: "What is the V-crossover point?", a: "It's the center of a zigzag strafe path. Instead of chasing the target to each extreme, aim at where the target crosses through the middle of its movement arc." },
  { q: "How does the level progression work?", a: "Every 1400 points increases your continuous level. Higher levels make targets smaller, faster, and perform more frequent direction reversals with tighter lifespan windows." },
  { q: "What sensitivity should I use?", a: "For tracking, moderate to low sensitivity (25–45 cm/360) works best. Use the universal sensitivity slider to match your in-game settings before starting." },
  { q: "Do I need to click to damage the target?", a: "No. This drill uses pure dwell-tracking — hold your crosshair inside the target's hitbox and its health drains automatically for as long as you stay locked on. Break contact and the drain pauses until you reacquire it." },
  { q: "What stats does this drill track?", a: "Each run logs your tracking accuracy (frames on-target versus total frames), targets destroyed, targets that escaped, your best combo streak, and the peak level reached — all shown on the results screen after time runs out." },
  { q: "Can this improve my Apex Legends tracking?", a: "Yes significantly. Apex fights require 0.5–2s of continuous tracking to confirm kills. Training reactive tracking against direction changes directly improves your damage output." },
  { q: "How are errors penalised in Anti-Zigzag Movement?", a: "When a target escapes or tracking contact is broken for 1.0s, your combo resets to zero. When the optional Time Penalty setting is enabled, target escapes and 1.0s tracking losses deduct 0.6s from your clock." },
  { q: "How does the combo multiplier work?", a: "Every full second of unbroken crosshair lock adds +1 to your combo, which raises your score multiplier at fixed thresholds (3, 5, 7, 10, 15, 20, 30, and 50). Losing lock for a full second resets the combo back to zero." },
  { q: "Does this help with recoil control?", a: "Indirectly. The reactive micro-adjustments trained here apply to recoil tracking as well. For dedicated recoil training, try the Recoil Control drill." },
  { q: "Is this aim trainer free?", a: "Yes, this tracking trainer is 100% free, requires no sign-ups or downloads, and runs natively in modern browsers with hardware-level mouse input." },
  { q: "How often should I train anti-zigzag tracking?", a: "5–6 sessions per week of 10–15 minutes each. Daily warm-ups before ranked play are ideal for building and maintaining reactive tracking muscle memory." }
];

const RELATED_DRILLS = [
  { id: "pro-smooth-pursuit", name: "Pro Smooth Pursuit", cat: "FPS Tracking", desc: "Lissajous curve tracking and smooth arm glide.", href: "/drills/fps/pro-smooth-pursuit" },
  { id: "vertical-air-track", name: "Vertical Air Track", cat: "FPS Tracking", desc: "Vertical axis mouse control and prediction trainer.", href: "/drills/fps/vertical-air-track" },
  { id: "strafe-tracking", name: "Strafe Tracking", cat: "FPS Tracking", desc: "Master ADAD movement reading and horizontal tracking.", href: "/drills/fps/strafe-tracking" },
  { id: "180-degree-awareness", name: "180° Awareness Pro", cat: "FPS Awareness", desc: "Macro flicks under a forced 180-degree turn.", href: "/drills/fps/180-degree-awareness" },
  { id: "flick-shot-training", name: "Pro Flick Trainer", cat: "FPS Flicking", desc: "Snap to targets in time-attack mode.", href: "/drills/fps/flick-shot-training" },
  { id: "target-acquisition", name: "Target Acquisition", cat: "FPS Precision", desc: "Train rapid target identification and click timing.", href: "/drills/fps/target-acquisition" }
];

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function AntiZigzagClient() {
  const [gameState, setGameState] = useState('start');
  const [countdownValue, setCountdownValue] = useState(3);
  const [isFullscreen, setIsFullscreen] = useState(false);
  useImmersiveMode(isFullscreen); // locks the page behind while the drill fills the screen
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [flashEnabled, setFlashEnabled] = useState(true);
  const [penaltyEnabled, setPenaltyEnabled] = useState(false);
  const [pointerLocked, setPointerLocked] = useState(false);
  const [openAccordion, setOpenAccordion] = useState(null);
  const [isTouchOnlyDevice, setIsTouchOnlyDevice] = useState(false);
  
  const [universalSens, setUniversalSens] = useState(1.0);

  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [bestCombo, setBestCombo] = useState(0);
  const [level, setLevel] = useState(1);
  const [bestLevel, setBestLevel] = useState(1);
  const [accuracy, setAccuracy] = useState(100);
  const [timeLeft, setTimeLeft] = useState(DRILL_DURATION);
  const [isNewBest, setIsNewBest] = useState(false);
  const [flashes, setFlashes] = useState([]);

  const [analytics, setAnalytics] = useState({
    accuracy: 100, onTargetFrames: 0, totalFrames: 0, targetsDestroyed: 0, targetsEscaped: 0,
    bestCombo: 0, levelReached: 1, grade: null
  });

  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  const lastTimeRef = useRef(DRILL_DURATION);
  const lastAccuracyRef = useRef(100);
  const bestLevelRunRef = useRef(1);
  const backdropCacheRef = useRef(null);
  const countdownTimeoutsRef = useRef([]);
  const startingRef = useRef(false);

  const engine = useRef({
    crosshair: { x: 0, y: 0, initialized: false },
    target: { x: 0, y: 0, vx: 0, vy: 0, health: 100, lifespan: 0, maxLifespan: 4.0, zigzagTimer: 1.2, history: [] },
    level: 1, score: 0, timeLeft: DRILL_DURATION,
    combo: 0, bestCombo: 0, focusTimer: 0, continuousTrackTime: 0, msOffTarget: 0,
    totalFrames: 0, framesOnTarget: 0, targetsDestroyed: 0, targetsEscaped: 0,
    particles: [], hitMarkers: [], screenShake: 0, logicalWidth: 0, logicalHeight: 0
  });

  const cmPer360 = (30 / universalSens).toFixed(1);

  useEffect(() => {
    try {
      const savedSens = localStorage.getItem('zigzag_sens');
      if (savedSens) setUniversalSens(parseFloat(savedSens));
    } catch (e) {}

    const saved = getSavedData();
    setBestScore(saved.bestScore || 0);
    setBestCombo(saved.bestCombo || 0);
    setBestLevel(saved.bestLevel || 1);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setSoundEnabled(drillAudio.isEnabled());
      setFlashEnabled(drillFlash.isEnabled());
      setPenaltyEnabled(drillPenalty.isEnabled());
      const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
      const isTouchCapable = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      setIsTouchOnlyDevice(isTouchCapable && !hasFinePointer);
    }
  }, []);

  useEffect(() => {
    return () => countdownTimeoutsRef.current.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (gameState !== 'playing' && gameState !== 'countdown') {
      try { localStorage.setItem('zigzag_sens', universalSens.toString()); } catch (e) {}
    }
  }, [universalSens, gameState]);

  const triggerFlash = useCallback(() => {
    if (!drillFlash.isEnabled()) return;
    const id = Date.now() + Math.random();
    setFlashes((f) => [...f, { id }]);
    setTimeout(() => setFlashes((f) => f.filter((x) => x.id !== id)), 480);
  }, []);

  const createHitMarker = useCallback((x, y) => {
    engine.current.hitMarkers.push({ x, y, life: 1.0 });
  }, []);

  const spawnTarget = useCallback((W, H, lvl, currentCombo = 0) => {
    const cfg = getLevelConfig(lvl, currentCombo);
    const radius = cfg.radius;
    const baseSpeed = 350 * cfg.speedMult;

    engine.current.target = {
      x: radius + Math.random() * Math.max(10, W - radius * 2),
      y: radius + Math.random() * Math.max(10, H - radius * 2),
      vx: (Math.random() > 0.5 ? 1 : -1) * baseSpeed,
      vy: (Math.random() - 0.5) * baseSpeed * 0.4,
      health: 100,
      lifespan: 0,
      maxLifespan: cfg.maxLifespan,
      zigzagTimer: cfg.zigzagInterval * (0.8 + Math.random() * 0.4),
      history: []
    };
  }, []);

  const endGame = useCallback(() => {
    setGameState('gameOver');
    drillAudio.playSessionEnd();
    if (document.pointerLockElement) document.exitPointerLock();

    const e = engine.current;
    const finalAccuracy = e.totalFrames > 0 ? Math.round((e.framesOnTarget / e.totalFrames) * 100) : 100;
    const peakLevel = Math.floor(bestLevelRunRef.current);
    const rating = getFpsScoreGrade(e.score, ELITE_SCORE);
    const grade = { letter: rating.grade, label: rating.label, color: rating.color };

    setAccuracy(finalAccuracy);
    setAnalytics({
      accuracy: finalAccuracy,
      onTargetFrames: e.framesOnTarget,
      totalFrames: e.totalFrames,
      targetsDestroyed: e.targetsDestroyed,
      targetsEscaped: e.targetsEscaped,
      bestCombo: e.bestCombo,
      levelReached: peakLevel,
      grade
    });

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

  const enterDrill = useCallback(async () => {
    if (startingRef.current) return;
    startingRef.current = true;

    countdownTimeoutsRef.current.forEach(clearTimeout);
    countdownTimeoutsRef.current = [];

    drillAudio.init();

    setIsNewBest(false);
    setScore(0);
    setCombo(0);
    setAccuracy(100);
    setTimeLeft(DRILL_DURATION);
    lastTimeRef.current = DRILL_DURATION;
    lastAccuracyRef.current = 100;

    const startLevel = getStartLevel();
    bestLevelRunRef.current = startLevel;
    setLevel(startLevel);

    setAnalytics({
      accuracy: 100, onTargetFrames: 0, totalFrames: 0, targetsDestroyed: 0,
      targetsEscaped: 0, bestCombo: 0, levelReached: startLevel, grade: null
    });

    const w = engine.current.logicalWidth || 800;
    const h = engine.current.logicalHeight || 450;

    engine.current = {
      crosshair: { ...engine.current.crosshair },
      target: { x: w / 2, y: h / 2, vx: 0, vy: 0, health: 100, lifespan: 0, maxLifespan: 4.0, zigzagTimer: 1.2, history: [] },
      level: startLevel, score: 0, timeLeft: DRILL_DURATION,
      combo: 0, bestCombo: 0, focusTimer: 0, continuousTrackTime: 0, msOffTarget: 0,
      totalFrames: 0, framesOnTarget: 0, targetsDestroyed: 0, targetsEscaped: 0,
      particles: [], hitMarkers: [], screenShake: 0, logicalWidth: w, logicalHeight: h
    };

    spawnTarget(w, h, startLevel, 0);

    setIsFullscreen(true);

    setGameState('countdown');
    setCountdownValue(3);
    drillAudio.playCountdownTick();

    const t1 = setTimeout(() => { setCountdownValue(2); drillAudio.playCountdownTick(); }, 700);
    const t2 = setTimeout(() => { setCountdownValue(1); drillAudio.playCountdownTick(); }, 1400);
    const t3 = setTimeout(() => { setCountdownValue('GO'); drillAudio.playGo(); }, 2100);
    const t4 = setTimeout(() => {
      startingRef.current = false;
      setGameState('playing');
      if (canvasRef.current && !document.pointerLockElement) {
        canvasRef.current.requestPointerLock().catch(() => {});
      }
    }, 2450);

    countdownTimeoutsRef.current = [t1, t2, t3, t4];
  }, [spawnTarget]);

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

  const resumeDrill = useCallback(async () => {
    setIsFullscreen(true);
    if (canvasRef.current && !document.pointerLockElement) {
      try { await canvasRef.current.requestPointerLock(); } catch (e) {}
    }
  }, []);

  useEffect(() => {
    const handlePointerLockChange = () => setPointerLocked(document.pointerLockElement === canvasRef.current);
    document.addEventListener('pointerlockchange', handlePointerLockChange);
    return () => document.removeEventListener('pointerlockchange', handlePointerLockChange);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (gameState !== 'playing' || !pointerLocked || !canvasRef.current) return;
      const w = engine.current.logicalWidth;
      const h = engine.current.logicalHeight;
      const sens = universalSens;
      engine.current.crosshair.x = Math.max(0, Math.min(w, engine.current.crosshair.x + e.movementX * sens));
      engine.current.crosshair.y = Math.max(0, Math.min(h, engine.current.crosshair.y + e.movementY * sens));
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, [gameState, pointerLocked, universalSens]);

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
          if (gameState === 'start') {
            spawnTarget(width, height, 1, 0);
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
          setTimeLeft(0);
          endGame();
          return;
        }

        const intTime = Math.ceil(e.timeLeft);
        if (intTime !== lastTimeRef.current) {
          setTimeLeft(intTime);
          lastTimeRef.current = intTime;
        }

        const cfg = getLevelConfig(e.level, e.combo);
        const tgt = e.target;

        tgt.lifespan += dt;
        tgt.zigzagTimer -= dt;

        if (tgt.zigzagTimer <= 0) {
          tgt.zigzagTimer = cfg.zigzagInterval * (0.8 + Math.random() * 0.4);
          const baseSpeed = 350 * cfg.speedMult;
          tgt.vx = (Math.random() > 0.5 ? 1 : -1) * baseSpeed;
          tgt.vy = (Math.random() - 0.5) * baseSpeed * 0.5;
        }

        tgt.x += tgt.vx * dt;
        tgt.y += tgt.vy * dt;

        const wallBuffer = cfg.radius + 15;
        if (tgt.x < wallBuffer) { tgt.x = wallBuffer; tgt.vx *= -1; }
        if (tgt.x > w - wallBuffer) { tgt.x = w - wallBuffer; tgt.vx *= -1; }
        if (tgt.y < wallBuffer) { tgt.y = wallBuffer; tgt.vy *= -1; }
        if (tgt.y > h - wallBuffer) { tgt.y = h - wallBuffer; tgt.vy *= -1; }

        tgt.history.push({ x: tgt.x, y: tgt.y });
        if (tgt.history.length > 8) tgt.history.shift();

        if (tgt.lifespan >= tgt.maxLifespan) {
          e.targetsEscaped++;
          if (drillPenalty.isEnabled()) e.timeLeft -= TIME_PENALTY;
          e.combo = 0;
          setCombo(0);
          e.screenShake = 6;
          triggerFlash();
          drillAudio.playPenalty();
          spawnTarget(w, h, e.level, e.combo);
        }

        e.totalFrames++;

        const dist = Math.hypot(e.crosshair.x - tgt.x, e.crosshair.y - tgt.y);
        const isOnTarget = dist <= cfg.radius;

        if (isOnTarget) {
          e.framesOnTarget++;
          e.continuousTrackTime += dt;
          tgt.health -= dt * 65;
          e.msOffTarget = 0;

          e.focusTimer += dt;
          if (e.focusTimer >= 0.25) {
            e.focusTimer -= 0.25;
            const levelMult = 1 + getDifficultyProgress(e.level) * 0.5;
            const pts = Math.round(10 * getComboMultiplier(e.combo) * levelMult);
            e.score += pts;
            e.timeLeft += TIME_PER_HIT * 0.25; // +0.1s per 0.25s locked-on
            setScore(e.score);

            const rawLevel = (e.score / POINTS_PER_LEVEL) + 1;
            e.level = Math.max(e.level, rawLevel);
            bestLevelRunRef.current = Math.max(bestLevelRunRef.current, e.level);
            setLevel(Math.floor(e.level));

            drillAudio.playHit();
            createHitMarker(e.crosshair.x, e.crosshair.y);
          }

          if (tgt.health <= 0) {
            e.targetsDestroyed++;
            e.score += Math.round(25 * getComboMultiplier(e.combo));
            setScore(e.score);
            drillAudio.playHit();
            spawnTarget(w, h, e.level, e.combo);
          }

          if (e.continuousTrackTime >= 1.0) {
            e.combo++;
            if (e.combo > e.bestCombo) e.bestCombo = e.combo;
            setCombo(e.combo);
            setBestCombo(e.bestCombo);
            e.continuousTrackTime -= 1.0;
          }
        } else {
          e.continuousTrackTime = 0;
          e.focusTimer = 0;
          e.msOffTarget += deltaTimeMs;

          if (e.msOffTarget >= 1000) {
            if (drillPenalty.isEnabled()) e.timeLeft -= TIME_PENALTY;
            if (e.combo > 0) {
              e.combo = 0;
              setCombo(0);
              e.screenShake = 6;
              triggerFlash();
              drillAudio.playPenalty();
            }
            e.msOffTarget = 0;
          }
        }

        const currAcc = Math.round((e.framesOnTarget / e.totalFrames) * 100);
        if (currAcc !== lastAccuracyRef.current) {
          setAccuracy(currAcc);
          lastAccuracyRef.current = currAcc;
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
        const cfg = getLevelConfig(e.level, e.combo);
        const tgt = e.target;
        const dist = Math.hypot(e.crosshair.x - tgt.x, e.crosshair.y - tgt.y);
        const isLocked = dist <= cfg.radius;

        const targetColor = isLocked ? '#00ff88' : '#ef4444';

        if (tgt.history.length > 1) {
          ctx.strokeStyle = targetColor;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(tgt.history[0].x, tgt.history[0].y);
          for (let i = 1; i < tgt.history.length; i++) {
            ctx.lineTo(tgt.history[i].x, tgt.history[i].y);
          }
          ctx.stroke();
        }

        drawPulseRing(ctx, tgt.x, tgt.y, cfg.radius, targetColor, (time % 1000) / 1000);

        drawTacticalTarget(ctx, tgt.x, tgt.y, cfg.radius, targetColor, true);

        // HP Bar (drawn above the target)
        const hpPct = Math.max(0, Math.min(1, tgt.health / 100));
        const hbW = cfg.radius * 1.8;
        const hbH = 4;
        const hbX = tgt.x - hbW / 2;
        const hbY = tgt.y - cfg.radius - 12;
        const hpColor = hpPct > 0.5 ? '#22c55e' : '#ef4444';

        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.beginPath();
        if (ctx.roundRect) ctx.roundRect(hbX, hbY, hbW, hbH, 2); else ctx.rect(hbX, hbY, hbW, hbH);
        ctx.fill();

        if (hpPct > 0) {
          ctx.fillStyle = hpColor;
          ctx.beginPath();
          if (ctx.roundRect) ctx.roundRect(hbX, hbY, hbW * hpPct, hbH, 2); else ctx.rect(hbX, hbY, hbW * hpPct, hbH);
          ctx.fill();
        }
      }

      ctx.lineWidth = 2.0;
      for (let i = e.hitMarkers.length - 1; i >= 0; i--) {
        const hm = e.hitMarkers[i];
        hm.life -= dt * 4.5;
        if (hm.life <= 0) { e.hitMarkers.splice(i, 1); continue; }
        ctx.globalAlpha = hm.life; ctx.strokeStyle = '#ef4444';
        const s = 5 + (1 - hm.life) * 6;
        ctx.beginPath();
        ctx.moveTo(hm.x - s, hm.y - s); ctx.lineTo(hm.x + s, hm.y + s);
        ctx.moveTo(hm.x + s, hm.y - s); ctx.lineTo(hm.x - s, hm.y + s);
        ctx.stroke();
      }
      ctx.globalAlpha = 1.0;

      const ch = e.crosshair;
      if (ch.initialized && (gameState === 'playing' || gameState === 'start')) {
        const activeColor = pointerLocked ? '#ef4444' : '#eab308';
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
  }, [gameState, pointerLocked, endGame, triggerFlash, spawnTarget, createHitMarker]);

  const shareDrillLink = useCallback(async () => {
    const url = 'https://skilldrills.online/drills/fps/anti-zigzag-movement-trainer';
    try {
      const canvas = generateShareCard({
        score,
        bestScore,
        accuracy: analytics.accuracy,
        bestCombo: analytics.bestCombo,
        rating: { letter: analytics.grade?.letter || 'C', label: analytics.grade?.label || 'Keep Going', emoji: '🔥' },
        newBest: isNewBest,
        drillName: 'Anti-Zigzag Movement',
        playerName: getPlayerName(),
      });
      await shareScoreCard(url, canvas);
    } catch (e) {
      const text = `🔥 I scored ${score} PTS (Level ${analytics.levelReached}) on Anti-Zigzag Movement! Tracking Accuracy: ${analytics.accuracy}%. Test your reflexes at skilldrills.online!`;
      if (typeof navigator !== 'undefined' && navigator.share) {
        navigator.share({ title: 'My Anti-Zigzag Score', text, url }).catch(() => {});
      } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
        navigator.clipboard.writeText(text);
        alert('Score card copied to clipboard!');
      }
    }
  }, [score, bestScore, analytics, isNewBest]);

  return (
    <div className="min-h-screen bg-[#050508] text-white flex flex-col font-sans select-none">
      {/* ── MAIN CONTENT AREA ── */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6 flex flex-col gap-6">
        {/* Title */}
        {!isFullscreen && (
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white uppercase">
              Anti-Zigzag Movement
              <span data-seo-kw="1" className="block text-sm font-semibold text-slate-400 mt-1 normal-case tracking-normal">
                Anti-Zigzag Aim Trainer
              </span>
            </h1>
          </div>
        )}

        {/* Live Stat Cards */}
        {!isFullscreen && (
          <div className="grid grid-cols-4 gap-2.5 max-w-2xl mx-auto w-full">
            <div className="bg-[#0d0d18] border border-white/5 rounded-xl p-2.5 text-center">
              <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Score</div>
              <div className="text-lg sm:text-xl font-black text-white tabular-nums">{score}</div>
            </div>
            <div className="bg-[#0d0d18] border border-white/5 rounded-xl p-2.5 text-center">
              <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Time</div>
              <div className={`text-lg sm:text-xl font-black tabular-nums ${timeLeft <= 10 ? "text-red-400 animate-pulse" : "text-white"}`}>{timeLeft}s</div>
            </div>
            <div className="bg-[#0d0d18] border border-white/5 rounded-xl p-2.5 text-center">
              <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Accuracy</div>
              <div className="text-lg sm:text-xl font-black text-red-400 tabular-nums">{accuracy}%</div>
            </div>
            <div className="bg-[#0d0d18] border border-white/5 rounded-xl p-2.5 text-center">
              <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Best Score</div>
              <div className="text-lg sm:text-xl font-black text-amber-400 tabular-nums">{bestScore}</div>
            </div>
          </div>
        )}

        {/* Game Stage Container */}
        <div 
          ref={containerRef} 
          onContextMenu={(e) => { if (gameState === 'playing') e.preventDefault(); }}
          className={`relative overflow-hidden flex flex-col transition-all duration-150 select-none bg-[#080811] text-white border border-white/10 ${
            isFullscreen 
              ? "fixed inset-0 z-[100] w-screen h-[100dvh] bg-[#080811] rounded-none border-none flex flex-col items-center justify-center" 
              : "w-full rounded-2xl bg-[#080811] aspect-video min-h-[460px] sm:min-h-[500px] max-h-[88vh] relative overflow-hidden flex flex-col"
          }`}
          style={{ touchAction: gameState === 'playing' ? 'none' : 'auto' }}
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
                <p className="text-2xl sm:text-3xl font-bold text-white tabular-nums leading-tight">{score}</p>
              </div>
              <div className="absolute top-4 right-4 z-30 pointer-events-none text-right">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-white/50">Time</p>
                <p className={`text-2xl sm:text-3xl font-bold tabular-nums leading-tight ${timeLeft <= 10 ? "text-red-400" : "text-white"}`}>{timeLeft}s</p>
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
                {soundEnabled ? <Volume2 className="w-4 h-4 text-red-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
              </button>
            </div>
          )}

          {/* PAUSE OVERLAY IF POINTER LOCK LOST DURING PLAY */}
          {gameState === 'playing' && !pointerLocked && (
            <div 
              className="absolute inset-0 z-40 bg-black/70 backdrop-blur-sm flex items-center justify-center cursor-pointer"
              onClick={(e) => { 
                e.stopPropagation(); 
                resumeDrill();
              }}
            >
              <div className="text-center animate-pulse pointer-events-none">
                <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-3" />
                <h2 className="text-2xl font-black text-white tracking-widest uppercase mb-1">Game Paused</h2>
                <p className="text-xs text-gray-300 font-medium">Click to resume — cursor lock will re-engage.</p>
              </div>
            </div>
          )}

          <canvas 
            ref={canvasRef} 
            onClick={() => { if (gameState === 'playing' && !pointerLocked) resumeDrill(); }}
            className={`block absolute top-0 left-0 w-full h-full touch-none z-10 ${gameState === "playing" ? "cursor-none" : ""}`}
          />

          {/* START MODAL */}
          {gameState === 'start' && (
            <FpsStartCard
              icon={Crosshair}
              accent="redOrange"
              title="Anti-Zigzag Movement"
              subtitle="Reactive Direction Snap • Endless Level Progression"
              rules={[
                { icon: Target, accent: "redOrange", title: "Objective (+10 / 0.25s)", text: "Track Erratic Strafe Reversals" },
                { icon: AlertCircle, accent: "red", title: "Failure Rule", text: penaltyEnabled ? "Target Escape → Resets Combo, -0.6s" : "Target Escape → Resets Combo" },
              ]}
              sensitivity={{ value: universalSens, onChange: setUniversalSens, cmPer360 }}
              stats={[
                { icon: Trophy, label: "Best Score", value: bestScore, color: "text-white", accent: "slate" },
                { icon: Flame, label: "Best Combo", value: `${bestCombo}x`, color: "text-red-400", accent: "redOrange" },
                { icon: TrendingUp, label: "Best Level", value: `Lv. ${bestLevel}`, color: "text-blue-400", accent: "blue" },
              ]}
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
              accent="red"
              grade={analytics.grade}
              score={score}
              isNewBest={isNewBest}
              stats={[
                { value: analytics.accuracy, suffix: "%", label: "Tracking Accuracy" },
                { value: analytics.targetsDestroyed, label: "Targets Destroyed" },
                { value: `${analytics.bestCombo}x`, label: "Max Combo" },
                { value: `Lv. ${analytics.levelReached}`, label: "Peak Level" },
              ]}
              onPlayAgain={enterDrill}
              onShare={shareDrillLink}
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {RULES_ITEMS.map((item, i) => (
                  <RuleItem key={i} num={item.num} text={item.text} highlight={item.highlight} result={item.result} />
                ))}
              </div>
            </DrillAccordion>

            <DrillAccordion
              id="about"
              title="About Anti-Zigzag Movement"
              isOpen={openAccordion === 'about'}
              onToggle={() => setOpenAccordion(openAccordion === 'about' ? null : 'about')}
            >
              <div className="space-y-8">
                <section>
                  <h4 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                    <Crosshair className="w-4 h-4 text-red-400" /> Why Train Anti-Zigzag Aim?
                  </h4>
                  {ABOUT_INTRO.map((para, i) => (
                    <p key={i} className={`text-sm leading-relaxed text-gray-300 ${i < ABOUT_INTRO.length - 1 ? "mb-3" : ""}`}>{para}</p>
                  ))}
                </section>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {ABOUT_CARDS.map((card, i) => (
                    <div key={i} className="p-4 rounded-xl border border-gray-800 bg-white/[0.02]">
                      <div className="flex items-center gap-2.5 mb-2">
                        <div className={`w-7 h-7 rounded-lg ${card.iconBg} flex items-center justify-center`}>
                          <card.icon className="w-3.5 h-3.5 text-white" />
                        </div>
                        <h5 className="text-xs font-bold text-white">{card.title}</h5>
                      </div>
                      <p className="text-xs text-gray-300 leading-relaxed">{card.text}</p>
                    </div>
                  ))}
                </div>

                {ABOUT_SECTIONS.map((section, i) => (
                  <section key={i}>
                    <h4 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                      <section.icon className="w-4 h-4 text-red-400" /> {section.title}
                    </h4>
                    {section.paragraphs.map((para, j) => (
                      <p key={j} className={`text-sm leading-relaxed text-gray-300 ${j < section.paragraphs.length - 1 ? "mb-3" : ""}`}>{para}</p>
                    ))}
                  </section>
                ))}
              </div>
            </DrillAccordion>

            <DrillAccordion
              id="faq"
              title="Frequently Asked Questions"
              isOpen={openAccordion === 'faq'}
              onToggle={() => setOpenAccordion(openAccordion === 'faq' ? null : 'faq')}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {FAQ_ITEMS.map((item, i) => (
                  <FAQItem key={i} q={item.q} a={item.a} />
                ))}
              </div>
            </DrillAccordion>
          </div>
        )}

        {/* ── RELATED FPS DRILLS ── */}
        {!isFullscreen && (
          <section className="mt-4">
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">
              Related FPS Drills
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {RELATED_DRILLS.map((drill) => (
                <Link
                  key={drill.id}
                  href={drill.href}
                  className="group bg-[#0c0c16] border border-white/5 hover:border-red-500/40 rounded-xl p-3.5 transition-all duration-200 hover:-translate-y-0.5 flex flex-col justify-between"
                >
                  <div>
                    <div className="text-[10px] font-bold text-red-400 uppercase tracking-wider mb-1">{drill.cat}</div>
                    <div className="text-xs font-bold text-white group-hover:text-red-300 transition-colors">{drill.name}</div>
                    <div className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">{drill.desc}</div>
                  </div>
                  <div className="text-[10px] font-bold text-slate-500 group-hover:text-red-400 mt-3 flex items-center gap-1 transition-colors">
                    Train Drill <span>→</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* ── FOOTER ── */}
      {!isFullscreen && <DrillFooter />}
    </div>
  );
}

// === Subcomponents ===
function RuleItem({ num, text, highlight = '', result }) {
  return (
    <div className="flex items-center gap-4 bg-black p-4 rounded-xl border border-white/10 shadow-sm font-sans">
      <div className="w-8 h-8 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white text-base font-black shadow-lg flex-shrink-0">{num}</div>
      <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <p className="text-sm font-medium text-gray-100 font-sans">
          {text}{highlight && <span className="font-black font-sans text-white"> {highlight}</span>}
        </p>
        <div className="text-xs font-black px-3 py-1.5 rounded-lg bg-[#050811] border border-white/10 text-white whitespace-nowrap shadow-inner tracking-wide text-center sm:text-left">
          {result}
        </div>
      </div>
    </div>
  );
}

function FAQItem({ q, a }) {
  return (
    <div className="bg-[#05060b] border border-gray-800 rounded-xl p-5 hover:border-gray-700 transition-colors font-sans">
      <h4 className="text-sm font-bold text-gray-200 mb-2">{q}</h4>
      <p className="text-xs text-gray-200 leading-relaxed">{a}</p>
    </div>
  );
}