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
import { getStartLevel, getDifficultyProgress, getComboBonusLevel } from '../../../../lib/drillDifficulty';
import { getComboMultiplier, getFpsScoreGrade } from '../../../../lib/scoringEngine';
import { createBackdropCache, getCanvasDpr, drawPulseRing, drawTacticalTarget } from '../../../../lib/canvasFx';
import useUnexpectedExitGuard from '../../../../lib/useUnexpectedExitGuard';
import DrillFooter from '../../../../components/drill/DrillFooter';
import DrillCountdown from '../../../../components/drill/DrillCountdown';
import DrillAccordion from '../../../../components/drill/DrillAccordion';
import FpsStartCard from '../../../../components/drill/FpsStartCard';

// ============================================================
// TUNING CONSTANTS
// ============================================================
const DRILL_DURATION = 45;
const POINTS_PER_LEVEL = 150;
const ELITE_SCORE = 6000;
const STORAGE_KEY = 'skilldrills_fps_anti_zigzag_v2';
const OLD_STORAGE_KEY = 'zigzag_bestScore';

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
  const p = getDifficultyProgress(level);
  return {
    radius: Math.max(9.5, 15.0 - p * 5.5),
    speedMult: 1.0 + p * 1.6,
    zigzagInterval: Math.max(0.25, 1.2 - p * 0.95),
    maxLifespan: Math.max(1.6, 4.0 - p * 2.4)
  };
};

// ============================================================
// ACCORDION DATA
// ============================================================
const RULES_ITEMS = [
  { num: "1", text: "Tracking Alignment", highlight: "+10 PTS", result: "Per 0.25s Locked On Target" },
  { num: "2", text: "Target Elimination", highlight: "+25 Bonus PTS", result: "Fully Deplete Target Health" },
  { num: "3", text: "Target Escape", highlight: "Combo Reset", result: "Before Health Depletion" },
  { num: "4", text: "Level Progression", highlight: "+1 Level / 150 PTS", result: "Speed, Size & Zigzag Scale" }
];

const ABOUT_INTRO = [
  "Anti-zigzag tracking trains your ability to maintain continuous crosshair contact on targets that abuse erratic direction changes, slide-cancels, crouch spamming, and burst strafes. Unlike smooth pursuit training, this drill forces reactive corrections against unpredictable V-shaped snap reversals."
];

const ABOUT_CARDS = [
  { icon: Users, iconBg: 'bg-blue-600', title: "Who Should Use This?", text: "Apex Legends, Warzone, and Call of Duty Mobile players facing opponents who zigzag to desync their hitbox from their visual model." },
  { icon: TrendingUp, iconBg: 'bg-emerald-600', title: "Skills Improved", text: "Reactive tracking, direction-change correction, and the muscle memory needed to chase V-shaped snap reversals under pressure." },
  { icon: Target, iconBg: 'bg-purple-600', title: "V-Crossover Targeting", text: "Avoid chasing outer sweeps. Aim at the V-crossover center, wait for the direction change, and maintain lock through the reversal." },
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
  { q: "How does the level progression work?", a: "Every 150 points increases the level. Higher levels make targets smaller, faster, and perform more frequent direction changes with less time before escape." },
  { q: "What sensitivity should I use?", a: "For tracking, moderate to low sensitivity (25–45 cm/360) works best. Use the universal sensitivity slider to match your in-game settings before starting." },
  { q: "Do I need to click to damage the target?", a: "No. This drill uses pure dwell-tracking — hold your crosshair inside the target's hitbox and its health drains automatically for as long as you stay locked on. Break contact and the drain pauses until you reacquire it." },
  { q: "What stats does this drill track?", a: "Each run logs your tracking accuracy (frames on-target versus total frames), targets destroyed, targets that escaped, your best combo streak, and the peak level reached — all shown on the results screen after time runs out." },
  { q: "Can this improve my Apex Legends tracking?", a: "Yes significantly. Apex fights require 0.5–2s of continuous tracking to confirm kills. Training reactive tracking against direction changes directly improves your damage output." },
  { q: "What causes the target to escape?", a: "Each target has a lifespan timer (shown as a red arc). If you don't deplete its health before the timer runs out, it escapes and you lose 1 second from your clock." },
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
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [flashEnabled, setFlashEnabled] = useState(true);
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

  const spawnTarget = useCallback((W, H, lvl) => {
    const cfg = getLevelConfig(lvl);
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
    const peakLevel = bestLevelRunRef.current;
    const grade = getFpsScoreGrade(e.score, ELITE_SCORE);

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

    const saved = getSavedData();
    const startLevel = getStartLevel(saved.bestLevel);
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

    spawnTarget(w, h, startLevel);

    try {
      if (containerRef.current && !document.fullscreenElement) {
        await containerRef.current.requestFullscreen();
      }
    } catch(e) {}

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

    if (document.fullscreenElement) {
      await document.exitFullscreen().catch(() => {});
    }
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
    if (containerRef.current && !document.fullscreenElement) {
      try { await containerRef.current.requestFullscreen(); } catch (e) {}
    }
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
    const handleFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
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
            spawnTarget(width, height, 1);
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

        const cfg = getLevelConfig(e.level);
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
          e.combo = 0;
          setCombo(0);
          e.screenShake = 6;
          triggerFlash();
          drillAudio.playPenalty();
          spawnTarget(w, h, e.level);
        }

        e.totalFrames++;

        const dist = Math.hypot(e.crosshair.x - tgt.x, e.crosshair.y - tgt.y);
        const isOnTarget = dist <= cfg.radius;

        if (isOnTarget) {
          e.framesOnTarget++;
          e.continuousTrackTime += dt;
          tgt.health -= dt * 65;

          e.focusTimer += dt;
          if (e.focusTimer >= 0.25) {
            e.focusTimer -= 0.25;
            const levelMult = 1 + getDifficultyProgress(e.level) * 0.5;
            const pts = Math.round(10 * getComboMultiplier(e.combo) * levelMult);
            e.score += pts;
            setScore(e.score);

            const rawLevel = Math.floor(e.score / POINTS_PER_LEVEL) + 1 + getComboBonusLevel(e.combo);
            e.level = Math.max(e.level, rawLevel);
            bestLevelRunRef.current = Math.max(bestLevelRunRef.current, e.level);
            setLevel(e.level);

            drillAudio.playHit();
            createHitMarker(e.crosshair.x, e.crosshair.y);
          }

          if (tgt.health <= 0) {
            e.targetsDestroyed++;
            e.score += Math.round(25 * getComboMultiplier(e.combo));
            setScore(e.score);
            drillAudio.playHit();
            spawnTarget(w, h, e.level);
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
        const cfg = getLevelConfig(e.level);
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
        rating: { letter: analytics.grade?.grade || 'C', label: analytics.grade?.label || 'Keep Going', emoji: '🔥' },
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
      {/* ── HEADER / BREADCRUMB ── */}
      {!isFullscreen && (
        <header className="border-b border-white/5 bg-[#080811]/80 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <Link href="/drills/fps" className="hover:text-white transition-colors">FPS</Link>
              <span>/</span>
              <span className="text-red-400 font-medium">Anti-Zigzag Movement</span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => {
                  const next = !soundEnabled;
                  setSoundEnabled(next);
                  drillAudio?.setEnabled?.(next);
                }}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
                title={soundEnabled ? "Mute Sound" : "Unmute Sound"}
              >
                {soundEnabled ? <Volume2 className="w-4 h-4 text-red-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
              </button>
              <button
                onClick={() => {
                  const next = !flashEnabled;
                  setFlashEnabled(next);
                  drillFlash?.setEnabled?.(next);
                }}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
                title={flashEnabled ? "Disable Miss Flash" : "Enable Miss Flash"}
              >
                {flashEnabled ? <Zap className="w-4 h-4 text-red-400" /> : <ZapOff className="w-4 h-4 text-slate-500" />}
              </button>
            </div>
          </div>
        </header>
      )}

      {/* ── MAIN CONTENT AREA ── */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6 flex flex-col gap-6">
        {/* Title */}
        {!isFullscreen && (
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight bg-gradient-to-r from-white via-slate-200 to-red-400 bg-clip-text text-transparent uppercase">
              Anti-Zigzag Movement
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Hardware Raw Input • 15 Difficulty Levels
            </p>
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
              <div className={`text-lg sm:text-xl font-black tabular-nums ${timeLeft <= 10 ? 'text-red-400 animate-pulse' : 'text-white'}`}>{timeLeft}s</div>
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
              ? 'fixed inset-0 z-[100] w-screen h-[100dvh] bg-[#080811] rounded-none border-none flex flex-col items-center justify-center' 
              : 'w-full rounded-2xl bg-[#080811] aspect-video min-h-[460px] sm:min-h-[500px] max-h-[88vh] relative overflow-hidden flex flex-col'
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
                <p className={`text-2xl sm:text-3xl font-bold tabular-nums leading-tight ${timeLeft <= 10 ? 'text-red-400' : 'text-white'}`}>{timeLeft}s</p>
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
                <p className="text-xs text-gray-300 font-medium">Click to resume — fullscreen and cursor lock will re-engage.</p>
              </div>
            </div>
          )}

          <canvas 
            ref={canvasRef} 
            onClick={() => { if (gameState === 'playing' && !pointerLocked) resumeDrill(); }}
            className={`block absolute top-0 left-0 w-full h-full touch-none z-10 ${gameState === 'playing' ? 'cursor-none' : ''}`} 
          />

          {/* START MODAL */}
          {gameState === 'start' && (
            <FpsStartCard
              icon={Crosshair}
              accent="redOrange"
              title="Anti-Zigzag Movement"
              subtitle="Hardware Raw Input • 15 Difficulty Levels"
              rules={[
                { icon: Target, accent: 'redOrange', title: 'Objective', text: 'Track Erratic Strafe Reversals' },
                { icon: AlertCircle, accent: 'red', title: 'Failure Rule', text: 'Target Escape → Resets Combo' },
              ]}
              sensitivity={{ value: universalSens, onChange: setUniversalSens, cmPer360 }}
              stats={[
                { icon: Trophy, label: 'Best Score', value: bestScore, color: 'text-white', accent: 'slate' },
                { icon: Flame, label: 'Best Combo', value: `${bestCombo}x`, color: 'text-red-400', accent: 'redOrange' },
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

          {/* END SCREEN */}
          {gameState === 'gameOver' && analytics.grade && (
            <div className="absolute inset-0 z-40 flex bg-neutral-950/98 select-none font-sans" style={{ background: 'rgba(5,5,8,0.97)' }} onPointerDown={e => e.stopPropagation()}>
              
              {/* Left Grade Panel */}
              <div className="w-[36%] flex flex-col items-center justify-center gap-1 border-r border-white/5 px-4" style={{ background: 'radial-gradient(ellipse 260px 200px at 50% 30%, rgba(239,68,68,.12), transparent 70%)' }}>
                {isNewBest && (
                  <span className="text-[9.5px] font-bold text-yellow-400 bg-yellow-500/10 border border-yellow-500/25 px-2.5 py-0.5 rounded-full mb-1 animate-pulse">
                    NEW BEST
                  </span>
                )}
                <div className={`text-5xl sm:text-6xl font-black leading-none ${analytics.grade.color}`}>
                  {analytics.grade.grade}
                </div>
                <div className="text-[10px] uppercase tracking-widest text-slate-500 text-center font-bold mt-1">
                  {analytics.grade.label}
                </div>
                <div className="text-3xl sm:text-4xl font-black text-white mt-2 tabular-nums">
                  {score}
                </div>
                <div className="text-[9px] uppercase tracking-widest text-slate-500">Points</div>
              </div>

              {/* Right Stats & Actions Panel */}
              <div className="flex-1 flex flex-col justify-center gap-3 px-6 py-4 min-w-0">
                
                {/* 4 Stat Tiles */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <div className="bg-black border border-white/5 p-2.5 rounded-xl text-center">
                    <p className="text-sm sm:text-base font-black text-white">{analytics.accuracy}%</p>
                    <p className="text-[7.5px] sm:text-[8.5px] font-bold uppercase tracking-wider text-gray-400 mt-0.5">Tracking Accuracy</p>
                  </div>
                  <div className="bg-black border border-white/5 p-2.5 rounded-xl text-center">
                    <p className="text-sm sm:text-base font-black text-white">{analytics.targetsDestroyed}</p>
                    <p className="text-[7.5px] sm:text-[8.5px] font-bold uppercase tracking-wider text-gray-400 mt-0.5">Targets Destroyed</p>
                  </div>
                  <div className="bg-black border border-white/5 p-2.5 rounded-xl text-center">
                    <p className="text-sm sm:text-base font-black text-white">{analytics.bestCombo}x</p>
                    <p className="text-[7.5px] sm:text-[8.5px] font-bold uppercase tracking-wider text-gray-400 mt-0.5">Max Combo</p>
                  </div>
                  <div className="bg-black border border-white/5 p-2.5 rounded-xl text-center">
                    <p className="text-sm sm:text-base font-black text-white">Lv. {analytics.levelReached}</p>
                    <p className="text-[7.5px] sm:text-[8.5px] font-bold uppercase tracking-wider text-gray-400 mt-0.5">Peak Level</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button 
                    onClick={enterDrill} 
                    className="flex-1 py-3 rounded-[13px] bg-gradient-to-r from-red-500 to-orange-600 text-white font-bold text-xs uppercase tracking-wide cursor-pointer transition-transform active:scale-[0.98] shadow-md flex items-center justify-center gap-1.5"
                  >
                    <RefreshCw className="w-3.5 h-3.5" /> Play Again
                  </button>
                  <button 
                    onClick={shareDrillLink} 
                    className="w-11 flex-shrink-0 rounded-[13px] bg-white/[0.04] border border-white/10 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer active:scale-90 transition-transform" 
                    title="Share Score"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={handleExitDrill} 
                    className="w-11 flex-shrink-0 rounded-[13px] bg-white/[0.04] border border-white/10 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer active:scale-90 transition-transform" 
                    title="Exit Fullscreen & Return"
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {RULES_ITEMS.map((item, i) => (
                  <RuleItem key={i} num={item.num} text={item.text} highlight={item.highlight} result={item.result} />
                ))}
              </div>
            </DrillAccordion>

            <DrillAccordion
              id="about"
              title="Countering Zigzag Movement"
              isOpen={openAccordion === 'about'}
              onToggle={() => setOpenAccordion(openAccordion === 'about' ? null : 'about')}
            >
              <div className="space-y-8">
                <section>
                  <h4 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                    <Crosshair className="w-4 h-4 text-red-400" /> What Is Anti-Zigzag Tracking?
                  </h4>
                  {ABOUT_INTRO.map((para, i) => (
                    <p key={i} className={`text-sm leading-relaxed text-gray-300 ${i < ABOUT_INTRO.length - 1 ? 'mb-3' : ''}`}>{para}</p>
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
                      <p key={j} className={`text-sm leading-relaxed text-gray-300 ${j < section.paragraphs.length - 1 ? 'mb-3' : ''}`}>{para}</p>
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
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3 font-sans">
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

        {/* ── FOOTER ── */}
        {!isFullscreen && <DrillFooter />}

      </main>
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