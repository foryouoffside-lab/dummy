'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';

import {
  Activity, AlertCircle, ArrowRight, ChevronRight, Eye,
  Flame, Play, RefreshCw, Target, Timer, TrendingUp,
  Trophy, Volume2, VolumeX, Zap, Share2,
  Users, Sparkles, Sliders, LogOut, Award,
  Crosshair
} from 'lucide-react';

import generateShareCard, { shareScoreCard } from '../../../../components/ShareScoreCard';
import { getPlayerName } from '../../../../lib/leaderboard';
import { drillAudio } from '../../../../lib/drillAudio';
import { getStartLevel, getDifficultyProgress, getComboBonusLevel } from '../../../../lib/drillDifficulty';
import { getComboMultiplier, getFpsScoreGrade } from '../../../../lib/scoringEngine';
import { createBackdropCache, getCanvasDpr, drawPulseRing } from '../../../../lib/canvasFx';
import useUnexpectedExitGuard from '../../../../lib/useUnexpectedExitGuard';
import DrillFooter from '../../../../components/drill/DrillFooter';
import DrillCountdown from '../../../../components/drill/DrillCountdown';
import DrillAccordion from '../../../../components/drill/DrillAccordion';
import FpsStartCard from '../../../../components/drill/FpsStartCard';

const DRILL_DURATION = 45; // 45 seconds focused duration
const POINTS_PER_LEVEL = 2500; // Reach L15 in the first third of the run under sustained headshots (incl. reload cycles), not in ~2s
const ELITE_SCORE = 40000; // 100% mark for letter grade — realistic-perfect (100% headshots incl. reload cycles) ceiling is ~130000, so this rewards sustained headshot-heavy play without requiring literal robotic perfection
const MAGAZINE_SIZE = 30;
// Minimum share of a magazine that must land before emptying it counts as
// controlled fire. Below this, the player sprayed through the pattern instead of
// resetting — which is exactly the habit this drill exists to break.
const DISCIPLINE_HIT_RATE = 0.4;
const STORAGE_KEY = 'skilldrills_fps_recoil_control_v2';

// 30-bullet spray pattern (AK-47 style vertical rise & horizontal sweep)
const RECOIL_PATTERN = [
  { x: 0, y: -4 }, { x: 0, y: -8 }, { x: 1, y: -13 }, { x: -1, y: -18 }, { x: -2, y: -24 },
  { x: -3, y: -30 }, { x: -4, y: -35 }, { x: -5, y: -38 }, { x: -3, y: -40 }, { x: 0, y: -41 },
  { x: 3, y: -41 }, { x: 6, y: -40 }, { x: 8, y: -39 }, { x: 9, y: -39 }, { x: 7, y: -40 },
  { x: 4, y: -41 }, { x: 0, y: -41 }, { x: -4, y: -40 }, { x: -7, y: -39 }, { x: -9, y: -39 },
  { x: -8, y: -40 }, { x: -5, y: -41 }, { x: -1, y: -41 }, { x: 3, y: -40 }, { x: 6, y: -39 },
  { x: 8, y: -39 }, { x: 6, y: -40 }, { x: 3, y: -41 }, { x: 0, y: -41 }, { x: -3, y: -40 }
];

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

// ============================================================
// ACCORDION & DRILL DATA
// ============================================================
const RULES_ITEMS = [
  { num: "1", text: "Headshot Hit", highlight: "+100 PTS × Combo × Level", result: "Top Priority Target Zone" },
  { num: "2", text: "Chest / Limb Hit", highlight: "+40 / +20 PTS × Level", result: "Maintains Combo Streak" },
  { num: "3", text: "Level Progression", highlight: "+1 Level / 2500 PTS", result: "Speed & Recoil Scale" },
  { num: "4", text: "Magazine Discipline", highlight: "Mag Reset + Reload", result: "30-Bullet Controlled Spray" }
];

const ABOUT_INTRO = [
  "Recoil Control Training builds the continuous motor compensation required to keep automatic weapon fire centered on a target. Unlike single-tap or flick-shot drills that test instantaneous micro-corrections, recoil control requires smooth, sustained mouse translation opposite to a weapon's physical kick pattern.",
  "By conditioning your motor cortex to execute the initial vertical pull-down and subsequent horizontal counter-sway against evasively moving targets, this drill builds unconscious muscle memory for full-auto spraying in CS2, Valorant, Apex Legends, and Call of Duty."
];

const ABOUT_CARDS = [
  { icon: Users, iconBg: 'bg-blue-600', title: "Who Should Use This?", text: "CS2, Valorant, Apex Legends, and CoD players looking to improve spray transfers, evasive target tracking, and multi-kill spray control." },
  { icon: TrendingUp, iconBg: 'bg-red-600', title: "First 10 Rounds Matter", text: "The first 5-8 rounds of any spray pattern have the most predictable vertical rise. Mastering this initial pull-down wins the vast majority of gunfights." },
  { icon: Zap, iconBg: 'bg-orange-600', title: "Spray Discipline", text: "Teaches you not to dump full magazines aimlessly. Controlled bursts and tracking accuracy prevent empty mag penalties." },
];

const ABOUT_SECTIONS = [
  {
    icon: Eye,
    title: "Why Recoil Compensation Matters",
    paragraphs: [
      "Aiming in tactical and high-TTK shooters requires combining initial target acquisition with continuous recoil compensation. Mastering both ensures your follow-up bullets land precisely on target even while the enemy executes evasive strafe patterns.",
      "Smooth counter-pulling prevents vertical bullet climb and reduces horizontal spray dispersion during sustained engagements."
    ]
  }
];

const FAQ_ITEMS = [
  { q: "What is recoil control?", a: "Recoil control is the mechanical compensation players perform by moving their mouse in the exact opposite direction of a weapon's automatic firing kickback to keep bullet placement accurate." },
  { q: "How do I control recoil in CS2?", a: "In CS2, weapons like the AK-47 have set spray patterns. You must pull down your mouse for the first 10 bullets, then drift it left and right in a mirror shape of the spray pattern." },
  { q: "How do I improve spray control?", a: "You can improve spray control by practicing to slowly build the muscle memory to counter-steer the movement of the weapon accurately." },
  { q: "What is spray pattern training?", a: "Spray pattern training involves memorizing the exact offset path of bullets during sustained automatic fire and practicing the reverse path to hold a tight cluster." },
  { q: "How often should I practice recoil control?", a: "Daily practice of 5 to 10 minutes before launching competitive matches is highly recommended to build and maintain weapon control muscle memory." },
  { q: "Can recoil training improve aim?", a: "Yes, aim is a combination of initial flick acquisition and subsequent tracking or recoil compensation. Mastering recoil ensures your follow-up shots connect after the initial flick." },
  { q: "Does this help Valorant players?", a: "Yes, Valorant weapons like the Vandal have vertical recoil for the first few shots, followed by horizontal sway. Training spray control helps you manage the early vertical climb and control bursts." },
  { q: "Does this help CS2 players?", a: "Yes, CS2 has fixed spray patterns, making recoil control training extremely effective as the patterns can be memorized and executed perfectly with practice." },
  { q: "What is recoil compensation?", a: "Recoil compensation is the physical mouse pull-down and horizontal counter-steering done by players to keep their crosshair aligned on the target despite weapon climb." },
  { q: "Why do my bullets spread?", a: "Bullets spread due to a combination of recoil (the predictable path the gun kicks) and inaccuracy bloom (the random spread deviation caused by movement or sustained fire)." },
  { q: "How do professional players control recoil?", a: "Professional players rely on deeply ingrained muscle memory to instantly pull their mouse down and sway left-to-right at precise intervals based on the weapon they are firing." },
  { q: "What is spray transfer training?", a: "Spray transfer training is the advanced skill of shifting your spray from one target to another while maintaining continuous automatic fire, adjusting for the active recoil offsets." },
  { q: "Can recoil control improve consistency?", a: "Yes, knowing how to control your spray means you don't have to rely entirely on single-tap headshots, giving you a reliable backup option in close-to-medium range fights." },
  { q: "Is this recoil trainer free?", a: "Yes, this Recoil Control Trainer is 100% free, runs in any modern web browser, and does not require downloads or sign-ups." },
  { q: "What skills does this drill improve?", a: "It improves mouse pull-down timing, spray discipline, weapon pattern familiarity, horizontal control, and physical muscle memory." }
];

const RELATED_DRILLS = [
  { id: "target-acquisition", name: "Target Acquisition Pro", cat: "FPS Precision", desc: "Master visual discrimination and threat selection under pressure.", href: "/drills/fps/target-acquisition" },
  { id: "strafe-tracking", name: "Strafe Tracking", cat: "FPS Tracking", desc: "Smooth pursuit tracking against erratic horizontal targets.", href: "/drills/fps/strafe-tracking" },
  { id: "micro-correction-precision", name: "Micro Flicks", cat: "FPS Precision", desc: "Optimize tight-angle crosshair micro corrections.", href: "/drills/fps/micro-correction-precision" },
  { id: "flick-shot-training", name: "Pro Flick Trainer", cat: "FPS Flicking", desc: "Snap to targets in time-attack mode with precision flicking.", href: "/drills/fps/flick-shot-training" },
  { id: "anti-strafe-jitter-duel", name: "Anti-Strafe Jitter", cat: "FPS Tracking", desc: "Flick & track reactive ADAD strafing targets.", href: "/drills/fps/anti-strafe-jitter-duel" },
  { id: "pro-smooth-pursuit", name: "Pro Smooth Pursuit", cat: "FPS Tracking", desc: "Train continuous target velocity matching.", href: "/drills/fps/pro-smooth-pursuit" }
];

export default function RecoilControlClient() {
  const [gameState, setGameState] = useState('start'); // 'start' | 'countdown' | 'playing' | 'gameOver'
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [pointerLocked, setPointerLocked] = useState(false);
  const [universalSens, setUniversalSens] = useState(1.0);
  const [openAccordion, setOpenAccordion] = useState(null);
  const [isTouchOnlyDevice, setIsTouchOnlyDevice] = useState(false);
  const [countdownValue, setCountdownValue] = useState(3);
  const [flashes, setFlashes] = useState([]);

  // HUD & Best Stats State
  const [uiScore, setUiScore] = useState(0);
  const [uiTimeLeft, setUiTimeLeft] = useState(DRILL_DURATION);
  const [uiAmmo, setUiAmmo] = useState(30);
  const [uiAccuracy, setUiAccuracy] = useState(100);
  const [uiIsReloading, setUiIsReloading] = useState(false);
  const [bestScore, setBestScore] = useState(0);
  const [bestCombo, setBestCombo] = useState(0);
  const [bestLevel, setBestLevel] = useState(1);
  const [isNewBest, setIsNewBest] = useState(false);

  const [analytics, setAnalytics] = useState({
    accuracy: 100, totalShots: 0, headshots: 0, chestHits: 0, limbHits: 0,
    disciplineFailures: 0, maxCombo: 0, finalLevel: 1, grade: null
  });

  // DOM & Engine Refs
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  const lastTimeRef = useRef(DRILL_DURATION);
  const gameActiveRef = useRef(false);
  const startingRef = useRef(false);
  const isMouseDownRef = useRef(false);
  const reloadTimeoutRef = useRef(null);
  const countdownTimeoutsRef = useRef([]);
  const backdropCacheRef = useRef(null);
  const bestLevelRunRef = useRef(1);

  const engine = useRef({
    crosshair: { x: 0, y: 0, initialized: false },
    recoilOffset: { x: 0, y: 0 },
    target: { x: 0, y: 0, vx: 80, vy: 0, strafeTimer: 0.8, pulseSeed: 0.5 },
    score: 0, level: 1, combo: 0, timeLeft: DRILL_DURATION,
    ammo: 30, isReloading: false, shotCountInSpray: 0, lastShotTime: 0,
    hitsThisMagazine: 0,
    totalShots: 0, headshots: 0, chestHits: 0, limbHits: 0, disciplineFailures: 0, maxCombo: 0,
    particles: [], hitMarkers: [], screenShake: 0,
    logicalWidth: 800, logicalHeight: 450
  });

  const cmPer360 = (30 / universalSens).toFixed(1);

  const triggerFlash = useCallback(() => {
    const id = Date.now() + Math.random();
    setFlashes((f) => [...f, { id }]);
    setTimeout(() => setFlashes((f) => f.filter((x) => x.id !== id)), 480);
  }, []);

  // Touch Device Detection & Initial Storage Loading
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
      const isTouchCapable = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      setIsTouchOnlyDevice(isTouchCapable && !hasFinePointer);

      try {
        const savedSens = localStorage.getItem('recoil_sens');
        if (savedSens) setUniversalSens(parseFloat(savedSens));
      } catch (e) {}

      const saved = getSavedData();
      setBestScore(saved.bestScore || 0);
      setBestCombo(saved.bestCombo || 0);
      setBestLevel(saved.bestLevel || 1);
    }
  }, []);

  // Timeout Cleanup on Unmount
  useEffect(() => {
    return () => {
      countdownTimeoutsRef.current.forEach(clearTimeout);
      if (reloadTimeoutRef.current) clearTimeout(reloadTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (gameState !== 'playing') {
      try { localStorage.setItem('recoil_sens', universalSens.toString()); } catch (e) {}
    }
    drillAudio.setEnabled(soundEnabled);
  }, [universalSens, gameState, soundEnabled]);

  // Fullscreen change listener
  useEffect(() => {
    const handleFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const handleExitDrill = useCallback(async () => {
    markIntentionalExit();
    countdownTimeoutsRef.current.forEach(clearTimeout);
    countdownTimeoutsRef.current = [];
    if (reloadTimeoutRef.current) {
      clearTimeout(reloadTimeoutRef.current);
      reloadTimeoutRef.current = null;
    }
    startingRef.current = false;
    isMouseDownRef.current = false;

    if (document.fullscreenElement) {
      await document.exitFullscreen().catch(() => {});
    }
    if (document.pointerLockElement) {
      document.exitPointerLock();
    }
    setGameState('start');
  }, []);

  // Stop the drill if the player leaves any way other than the in-app Exit
  // button (back gesture, tab switch, Esc) instead of running invisibly.
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

  // Recalibrated Level configuration driving target size, movement, and recoil scaling
  const getLevelConfig = (level) => {
    const p = getDifficultyProgress(level); // 0 -> 1 across L1..L15
    return {
      radius:         Math.max(11.0, 16.0 - p * 5.0),
      speed:          75 + p * 145,                  // 75 -> 220 px/s slower smooth movement
      recoilMult:     1.8 + p * 2.2,                 // 1.8 -> 4.0x strong recoil kick magnitude
      strafeInterval: Math.max(0.6, 1.3 - p * 0.6), // Slower, calmer direction swaps (s)
      hitPad:         Math.max(3, 7 - p * 4),        // Hit padding
    };
  };

  const createExplosion = (x, y, color) => {
    for (let i = 0; i < 15; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 5 + 1;
      engine.current.particles.push({ x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, life: 1.0, color });
    }
  };

  const createHitMarker = (x, y) => {
    engine.current.hitMarkers.push({ x, y, life: 1.0 });
  };

  const reloadMagazine = useCallback(() => {
    const e = engine.current;
    if (e.isReloading) return;
    e.isReloading = true;
    setUiIsReloading(true);

    reloadTimeoutRef.current = setTimeout(() => {
      e.ammo = MAGAZINE_SIZE;
      e.shotCountInSpray = 0;
      e.hitsThisMagazine = 0;
      e.recoilOffset = { x: 0, y: 0 };
      e.isReloading = false;
      setUiAmmo(MAGAZINE_SIZE);
      setUiIsReloading(false);
    }, 1200);
  }, []);

  // End Game Management
  const endGame = useCallback(() => {
    gameActiveRef.current = false;
    startingRef.current = false;
    isMouseDownRef.current = false;
    if (reloadTimeoutRef.current) {
      clearTimeout(reloadTimeoutRef.current);
      reloadTimeoutRef.current = null;
    }
    setGameState('gameOver');
    if (document.pointerLockElement) document.exitPointerLock();
    
    const e = engine.current;
    const hits = e.headshots + e.chestHits + e.limbHits;
    const finalAccuracy = e.totalShots > 0 ? Math.round((hits / e.totalShots) * 100) : 0;
    
    const rating = getFpsScoreGrade(e.score, ELITE_SCORE);
    const grade = { letter: rating.grade, label: rating.label, color: rating.color };

    setAnalytics({
      accuracy: finalAccuracy, totalShots: e.totalShots, headshots: e.headshots,
      chestHits: e.chestHits, limbHits: e.limbHits, disciplineFailures: e.disciplineFailures,
      maxCombo: e.maxCombo, finalLevel: e.level, grade
    });

    setUiScore(e.score);

    const prevSaved = getSavedData();
    const isNewHigh = e.score > prevSaved.bestScore;
    setIsNewBest(isNewHigh);

    const runBestLevel = Math.max(prevSaved.bestLevel, bestLevelRunRef.current);
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
    isMouseDownRef.current = false;

    countdownTimeoutsRef.current.forEach(clearTimeout);
    countdownTimeoutsRef.current = [];

    drillAudio.init();

    setIsNewBest(false);
    setUiScore(0);
    setUiAccuracy(100);
    setUiTimeLeft(DRILL_DURATION);
    setUiAmmo(30);
    setUiIsReloading(false);
    lastTimeRef.current = DRILL_DURATION;

    const saved = getSavedData();
    const startLevel = getStartLevel(saved.bestLevel);
    bestLevelRunRef.current = startLevel;

    setAnalytics({
      accuracy: 100, totalShots: 0, headshots: 0, chestHits: 0, limbHits: 0,
      disciplineFailures: 0, maxCombo: 0, finalLevel: startLevel, grade: null
    });

    const w = engine.current.logicalWidth || 800;
    const h = engine.current.logicalHeight || 450;

    engine.current = {
      crosshair: { ...engine.current.crosshair },
      recoilOffset: { x: 0, y: 0 },
      target: { x: w / 2, y: h / 2 - 20, vx: 80, vy: 0, strafeTimer: 0.8, pulseSeed: Math.random() },
      score: 0, level: startLevel, combo: 0, timeLeft: DRILL_DURATION,
      ammo: 30, isReloading: false, shotCountInSpray: 0, lastShotTime: 0,
      hitsThisMagazine: 0,
      totalShots: 0, headshots: 0, chestHits: 0, limbHits: 0, disciplineFailures: 0, maxCombo: 0,
      particles: [], hitMarkers: [], screenShake: 0,
      logicalWidth: w, logicalHeight: h
    };

    try {
      if (containerRef.current && !document.fullscreenElement) {
        await containerRef.current.requestFullscreen();
      }
    } catch(e) {}

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

  // Pointer lock change listener — release trigger when pointer lock is lost
  useEffect(() => {
    const handlePointerLockChange = () => {
      const locked = document.pointerLockElement === canvasRef.current;
      setPointerLocked(locked);
      if (!locked) {
        isMouseDownRef.current = false;
        engine.current.shotCountInSpray = 0;
        engine.current.recoilOffset = { x: 0, y: 0 };
      }
    };
    document.addEventListener('pointerlockchange', handlePointerLockChange);
    return () => document.removeEventListener('pointerlockchange', handlePointerLockChange);
  }, []);

  // Scoped Raw Input Mouse Move & Mouse Down/Up Event Handlers
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (gameState !== 'playing' || !pointerLocked || !canvasRef.current) return;
      const w = engine.current.logicalWidth;
      const h = engine.current.logicalHeight;
      const dx = e.movementX * universalSens;
      const dy = e.movementY * universalSens;
      engine.current.crosshair.x = Math.max(0, Math.min(w, engine.current.crosshair.x + dx));
      engine.current.crosshair.y = Math.max(0, Math.min(h, engine.current.crosshair.y + dy));
    };

    const handleMouseDown = (e) => {
      if (e.target.tagName === 'BUTTON' || e.target.closest('button')) return;
      if (!containerRef.current || !containerRef.current.contains(e.target)) return;

      if (gameState === 'playing') {
        if (!pointerLocked && canvasRef.current) {
          resumeDrill();
        } else if (pointerLocked) {
          isMouseDownRef.current = true;
          if (engine.current.ammo <= 0 && !engine.current.isReloading) {
            drillAudio.playPenalty();
            reloadMagazine();
          }
        }
      }
    };

    const handleMouseUp = () => {
      isMouseDownRef.current = false;
      engine.current.shotCountInSpray = 0;
      engine.current.recoilOffset = { x: 0, y: 0 };
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [gameState, pointerLocked, universalSens, resumeDrill, reloadMagazine]);

  // Main Physics & Canvas Render Loop with Backdrop Caching and Capped DPR
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
            bCtx.strokeStyle = 'rgba(239, 68, 68, 0.04)';
            bCtx.lineWidth = 1;
            const cx = w / 2, cy = h / 2;
            bCtx.beginPath();
            for(let i = -10; i <= 10; i++) {
              bCtx.moveTo(cx, cy); bCtx.lineTo(cx + i * 250, h);
              bCtx.moveTo(cx, cy); bCtx.lineTo(cx + i * 250, 0);
            }
            bCtx.stroke();
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
      const deltaTimeMs = time - lastTime;
      lastTime = time;
      const dt = Math.min(deltaTimeMs / 1000, 0.1); 
      const e = engine.current;
      const dpr = getCanvasDpr();
      const w = e.logicalWidth;
      const h = e.logicalHeight;

      if (gameState === 'playing' && pointerLocked) {
        if (e.timeLeft > 0) {
          e.timeLeft -= dt;
        }

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

        // Move target with evasive random 2D strafe movement that scales with level (p)
        e.target.strafeTimer = (e.target.strafeTimer || 0) - dt;
        if (e.target.strafeTimer <= 0) {
          e.target.strafeTimer = config.strafeInterval * (0.7 + Math.random() * 0.6);
          const p = getDifficultyProgress(e.level);
          const hDir = Math.random() < 0.5 ? 1 : -1;
          e.target.vx = hDir * config.speed * (0.7 + Math.random() * 0.6);
          if (p > 0.1 && Math.random() < 0.65) {
            const vDir = Math.random() < 0.5 ? 1 : -1;
            e.target.vy = vDir * config.speed * (0.2 + p * 0.5) * Math.random();
          } else {
            e.target.vy = 0;
          }
        }

        e.target.x += e.target.vx * dt;
        e.target.y += (e.target.vy || 0) * dt;

        const targetRadius = config.radius;
        const wallBufferX = targetRadius + 30;
        const wallBufferY = targetRadius + 40;
        if (e.target.x < wallBufferX) { e.target.x = wallBufferX; e.target.vx = Math.abs(e.target.vx); }
        if (e.target.x > w - wallBufferX) { e.target.x = w - wallBufferX; e.target.vx = -Math.abs(e.target.vx); }
        if (e.target.y < wallBufferY) { e.target.y = wallBufferY; e.target.vy = Math.abs(e.target.vy || 100); }
        if (e.target.y > h - wallBufferY) { e.target.y = h - wallBufferY; e.target.vy = -Math.abs(e.target.vy || 100); }

        // Firing Mechanics (500 RPM = 120ms per shot)
        if (isMouseDownRef.current && !e.isReloading && e.ammo > 0) {
          if (time - e.lastShotTime >= 120) {
            e.lastShotTime = time;
            e.ammo--;
            e.totalShots++;
            setUiAmmo(e.ammo);

            // Apply recoil kick pattern
            const patternIndex = Math.min(e.shotCountInSpray, RECOIL_PATTERN.length - 1);
            const recoilShot = RECOIL_PATTERN[patternIndex];
            e.recoilOffset.x = recoilShot.x * config.recoilMult;
            e.recoilOffset.y = recoilShot.y * config.recoilMult;
            e.shotCountInSpray++;

            // Effective bullet landing coordinate = crosshair + recoil offset
            const bulletX = e.crosshair.x + e.recoilOffset.x;
            const bulletY = e.crosshair.y + e.recoilOffset.y;

            // Target zone geometry (Head, Chest, Limb) based on targetRadius
            const headY = e.target.y - targetRadius * 0.75;
            const chestY = e.target.y;
            const limbY = e.target.y + targetRadius * 0.75;

            const distHead = Math.hypot(bulletX - e.target.x, bulletY - headY);
            const distChest = Math.hypot(bulletX - e.target.x, bulletY - chestY);
            const distLimb = Math.hypot(bulletX - e.target.x, bulletY - limbY);

            const rHead = targetRadius * 0.4 + config.hitPad;
            const rChest = targetRadius * 0.7 + config.hitPad;
            const rLimb = targetRadius * 0.55 + config.hitPad;

            let hitZone = null;
            if (distHead <= rHead) hitZone = 'head';
            else if (distChest <= rChest) hitZone = 'chest';
            else if (distLimb <= rLimb) hitZone = 'limb';

            if (hitZone) {
              e.combo++;
              e.hitsThisMagazine++;
              if (e.combo > e.maxCombo) e.maxCombo = e.combo;

              if (hitZone === 'head') e.headshots++;
              else if (hitZone === 'chest') e.chestHits++;
              else e.limbHits++;

              const ZONE_POINTS = { head: 100, chest: 40, limb: 20 };
              const levelMult = 1 + getDifficultyProgress(e.level) * 0.5; // 1.0 -> 1.5
              e.score += Math.round(ZONE_POINTS[hitZone] * getComboMultiplier(e.combo) * levelMult);

              // Monotonic level progression
              const rawLevel = Math.floor(e.score / POINTS_PER_LEVEL) + 1 + getComboBonusLevel(e.combo);
              e.level = Math.max(e.level, rawLevel);
              bestLevelRunRef.current = Math.max(bestLevelRunRef.current, e.level);

              drillAudio.playHit();
              createExplosion(bulletX, bulletY, hitZone === 'head' ? '#ef4444' : '#f59e0b');
              createHitMarker(bulletX, bulletY);
              setUiScore(e.score);

            } else {
              // Missed shot resets combo
              e.combo = 0;
            }

            const totalHits = e.headshots + e.chestHits + e.limbHits;
            setUiAccuracy(e.totalShots > 0 ? Math.round((totalHits / e.totalShots) * 100) : 100);

            if (e.ammo === 0) {
              const magHitRate = e.hitsThisMagazine / MAGAZINE_SIZE;
              if (magHitRate < DISCIPLINE_HIT_RATE) {
                e.disciplineFailures++;
                e.combo = 0;
                triggerFlash();
                drillAudio.playPenalty();
              }
              reloadMagazine();
            }
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

      // Draw Target with zone boundaries
      if (gameState === 'playing' || gameState === 'start') {
        const config = getLevelConfig(e.level);
        const r = config.radius;
        const tx = e.target.x;
        const ty = e.target.y;

        drawPulseRing(ctx, tx, ty, r * 1.5, '#ef4444', e.target.pulseSeed);

        // Limb Zone (Bottom)
        ctx.fillStyle = 'rgba(239, 68, 68, 0.25)';
        ctx.beginPath(); ctx.arc(tx, ty + r * 0.75, r * 0.55, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = 'rgba(239, 68, 68, 0.6)';
        ctx.lineWidth = 1.5; ctx.stroke();

        // Chest Zone (Middle)
        ctx.fillStyle = 'rgba(239, 68, 68, 0.45)';
        ctx.beginPath(); ctx.arc(tx, ty, r * 0.7, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = 'rgba(239, 68, 68, 0.8)';
        ctx.lineWidth = 1.5; ctx.stroke();

        // Head Zone (Top - Brightest)
        ctx.fillStyle = '#ef4444';
        ctx.beginPath(); ctx.arc(tx, ty - r * 0.75, r * 0.4, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2; ctx.stroke();
      }

      // Render Particles
      for (let i = e.particles.length - 1; i >= 0; i--) {
        const p = e.particles[i];
        p.x += p.vx; p.y += p.vy; p.life -= dt * 2.5;
        if (p.life <= 0) { e.particles.splice(i, 1); continue; }
        ctx.globalAlpha = p.life; ctx.fillStyle = p.color; ctx.fillRect(p.x, p.y, 3, 3);
      }

      // Render Hit Markers
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

      // Draw Crosshair (incorporates recoil offset when firing)
      const ch = e.crosshair;
      if (ch.initialized && (gameState === 'playing' || gameState === 'start')) {
        const renderX = ch.x + (isMouseDownRef.current ? e.recoilOffset.x : 0);
        const renderY = ch.y + (isMouseDownRef.current ? e.recoilOffset.y : 0);
        const activeColor = pointerLocked ? '#ef4444' : '#3b82f6';
        
        ctx.strokeStyle = activeColor;
        ctx.fillStyle = activeColor;
        
        ctx.lineWidth = 2;
        ctx.beginPath(); ctx.arc(renderX, renderY, 16, 0, Math.PI * 2); ctx.stroke();

        ctx.lineWidth = 1.5;
        const gap = 6;
        ctx.beginPath();
        ctx.moveTo(renderX, renderY - 16); ctx.lineTo(renderX, renderY - gap);
        ctx.moveTo(renderX, renderY + 16); ctx.lineTo(renderX, renderY + gap);
        ctx.moveTo(renderX - 16, renderY); ctx.lineTo(renderX - gap, renderY);
        ctx.moveTo(renderX + 16, renderY); ctx.lineTo(renderX + gap, renderY);
        ctx.stroke();
        
        ctx.beginPath(); ctx.arc(renderX, renderY, 2, 0, Math.PI * 2); ctx.fill();
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
  }, [gameState, pointerLocked, endGame, reloadMagazine]);

  const shareScore = useCallback(async () => {
    const url = 'https://skilldrills.online/drills/fps/recoil-control';
    try {
      const canvas = generateShareCard({
        score: uiScore,
        bestScore,
        accuracy: analytics.accuracy,
        bestCombo: analytics.maxCombo,
        rating: { letter: analytics.grade?.letter || 'C', label: analytics.grade?.label || 'Keep Going', emoji: '🎯' },
        newBest: isNewBest,
        drillName: 'Recoil Control Pro',
        playerName: getPlayerName(),
      });
      await shareScoreCard(url, canvas);
    } catch (e) {
      const text = `🎯 I scored ${uiScore} PTS (Level ${analytics.finalLevel}) on Recoil Control Pro! Accuracy: ${analytics.accuracy}%. Master spray control at skilldrills.online!`;
      if (typeof navigator !== 'undefined' && navigator.share) {
        navigator.share({ title: 'My Reflex Score', text, url }).catch(() => {});
      } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
        navigator.clipboard.writeText(text);
        alert('Score card copied to clipboard!');
      }
    }
  }, [uiScore, bestScore, analytics, isNewBest]);

  const accuracy = gameState === 'gameOver' ? analytics.accuracy : uiAccuracy;

  return (
    <div className="min-h-screen select-none bg-[#050508] text-white font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 font-sans">
        
        {/* BREADCRUMB NAV */}
        {!isFullscreen && (
          <nav>
            <ol className="flex items-center gap-2 text-xs text-slate-400 font-sans">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li>/</li>
              <li><Link href="/drills/fps" className="hover:text-white transition-colors">FPS Drills</Link></li>
              <li>/</li>
              <li className="text-red-400 font-bold">Recoil Control Pro</li>
            </ol>
          </nav>
        )}

        {/* CENTERED PAGE HEADING */}
        {!isFullscreen && (
          <h1 className="text-2xl sm:text-3xl font-black text-center text-white tracking-tight font-sans">
            Recoil Control Pro
          </h1>
        )}

        {/* 4-STAT CARD ROW */}
        {!isFullscreen && (
          <div className="grid grid-cols-4 gap-2.5 max-w-2xl mx-auto w-full">
            <div className="bg-[#0d0d18] border border-white/5 rounded-xl p-2.5 text-center">
              <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Score</div>
              <div className="text-lg sm:text-xl font-black text-white tabular-nums">{uiScore}</div>
            </div>
            <div className="bg-[#0d0d18] border border-white/5 rounded-xl p-2.5 text-center">
              <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Time</div>
              <div className={`text-lg sm:text-xl font-black tabular-nums ${uiTimeLeft <= 10 ? 'text-red-400 animate-pulse' : 'text-white'}`}>{uiTimeLeft}s</div>
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

        {/* DRILL BOX CONTAINER */}
        <div 
          ref={containerRef} 
          onContextMenu={(e) => { if (gameActiveRef.current) e.preventDefault(); }}
          className={`relative overflow-hidden flex flex-col transition-all duration-150 select-none bg-[#080811] text-white border border-white/10 ${
            isFullscreen 
              ? 'fixed inset-0 z-[100] w-screen h-[100dvh] bg-[#080811] rounded-none border-none flex flex-col items-center justify-center' 
              : 'w-full rounded-2xl bg-[#080811] aspect-video min-h-[460px] sm:min-h-[500px] max-h-[88vh] relative overflow-hidden flex flex-col'
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
              <div className="absolute bottom-4 left-4 z-30 pointer-events-none flex items-center gap-2">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-white/50">Ammo</p>
                <p className={`text-lg font-bold font-mono tabular-nums ${uiIsReloading ? 'text-yellow-400 animate-pulse' : uiAmmo <= 5 ? 'text-red-400' : 'text-white'}`}>
                  {uiIsReloading ? 'RELOADING...' : `${uiAmmo} / 30`}
                </p>
              </div>
            </>
          )}

          {/* IN-GAME HUD SOUND TOGGLE */}
          {(gameState === 'playing' || gameState === 'countdown') && (
            <button
              onPointerDown={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.stopPropagation();
                setSoundEnabled((v) => {
                  drillAudio.setEnabled(!v);
                  return !v;
                });
              }}
              className="absolute bottom-4 right-4 z-40 p-2.5 rounded-full bg-black/60 border border-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
              title="Toggle Sound"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-red-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
            </button>
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
              title="Recoil Control Pro"
              subtitle="Weapon Spray Patterns & Motor Compensation • 15 Levels"
              rules={[
                { icon: Target, accent: 'red', title: 'Objective', text: 'Counteract 30-Bullet Kick' },
                { icon: Zap, accent: 'orange', title: 'Headshot', text: '+100 PTS Base' },
              ]}
              sensitivity={{ value: universalSens, onChange: setUniversalSens, cmPer360 }}
              stats={[
                { icon: Trophy, label: 'Best Score', value: bestScore, color: 'text-white', accent: 'slate' },
                { icon: Flame, label: 'Best Combo', value: `${bestCombo}x`, color: 'text-red-400', accent: 'red' },
                { icon: TrendingUp, label: 'Best Level', value: `Lv. ${bestLevel}`, color: 'text-blue-400', accent: 'blue' },
              ]}
              isTouchOnlyDevice={isTouchOnlyDevice}
              onStart={enterDrill}
            />
          )}

          {/* COUNTDOWN OVERLAY */}
          {gameState === 'countdown' && (
            <DrillCountdown value={countdownValue} subtitle="GET READY" accent="#ef4444" />
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
                    <p className="text-sm sm:text-base font-black text-white">{analytics.headshots}</p>
                    <p className="text-[7.5px] sm:text-[8.5px] font-bold uppercase tracking-wider text-gray-400 mt-0.5">Headshots</p>
                  </div>
                  <div className="bg-black border border-white/5 p-2.5 rounded-xl text-center">
                    <p className="text-sm sm:text-base font-black text-white">{analytics.maxCombo}x</p>
                    <p className="text-[7.5px] sm:text-[8.5px] font-bold uppercase tracking-wider text-gray-400 mt-0.5">Max Combo</p>
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
                    className="flex-1 py-3 rounded-[13px] bg-gradient-to-r from-red-600 to-orange-600 text-white font-bold text-xs uppercase tracking-wide cursor-pointer transition-transform active:scale-[0.98] shadow-md flex items-center justify-center gap-1.5"
                  >
                    <RefreshCw className="w-3.5 h-3.5" /> Play Again
                  </button>
                  <button 
                    onClick={shareScore} 
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
          <div className="[&>div]:!mt-0 font-sans">
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
              title="About Recoil Control Pro"
              isOpen={openAccordion === 'about'}
              onToggle={() => setOpenAccordion(openAccordion === 'about' ? null : 'about')}
            >
              <div className="space-y-8">
                <section>
                  <h4 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                    <Eye className="w-4 h-4 text-red-400" /> What Is Recoil Control Training?
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
          <section className="mt-4 font-sans">
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

      </div>
    </div>
  );
}

// === Subcomponents ===
function StatCard({ icon, value, label, unit = '', accentColor = 'border-white/10' }) {
  return (
    <div className={`rounded-xl border ${accentColor} bg-black backdrop-blur-md p-1.5 sm:p-2.5 text-center flex flex-col items-center justify-center transition-all duration-300 shadow-md hover:-translate-y-0.5 pointer-events-none font-sans`}>
      <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-black border border-white/10 flex items-center justify-center mb-1 shadow-inner">
        {icon}
      </div>
      <p className="text-xs sm:text-lg lg:text-xl font-black tracking-tight text-white leading-none truncate w-full font-sans font-mono tabular-nums">
        {value}<span className="text-[9px] sm:text-xs font-semibold ml-0.5 text-gray-400 font-sans">{unit}</span>
      </p>
      <p className="text-[8px] sm:text-[9.5px] font-bold uppercase tracking-wider text-gray-400 mt-1 truncate w-full">{label}</p>
    </div>
  );
}

function RuleItem({ num, color, text, highlight = '', result }) {
  const colorClasses = {
    red: 'bg-red-500/10 border-red-500/20 text-red-400',
    orange: 'bg-orange-500/10 border-orange-500/20 text-orange-400',
    blue: 'bg-blue-500/10 border-blue-500/20 text-blue-400',
    green: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
  };
  const badgeClass = colorClasses[color] || 'bg-white/10 border-white/20 text-white';

  return (
    <div className="flex items-center gap-4 bg-black p-4 rounded-xl border border-white/10 shadow-sm">
      <div className="w-8 h-8 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white text-base font-black shadow-lg flex-shrink-0">{num}</div>
      <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <p className="text-sm font-medium text-gray-100 font-sans">
          {text}{highlight && <span className="font-black font-sans text-white"> {highlight}</span>}
        </p>
        <div className={`text-xs font-black px-3 py-1.5 rounded-lg border whitespace-nowrap shadow-inner tracking-wide text-center sm:text-left ${badgeClass}`}>
          {result}
        </div>
      </div>
    </div>
  );
}

function RelatedCard({ href, title, desc }) {
  return (
    <Link href={href} className="group p-5 bg-black rounded-2xl border border-gray-800 hover:border-red-500/50 hover:bg-white/[0.02] transition-all flex flex-col justify-between">
      <div>
        <h4 className="font-bold text-white group-hover:text-red-400 transition-colors mb-1 text-base">{title}</h4>
        <p className="text-xs text-gray-400 leading-relaxed line-clamp-2">{desc}</p>
      </div>
      <div className="flex items-center gap-1 mt-4 text-xs text-red-400 font-bold font-mono">
        <span>TRY DRILL</span>
        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  );
}

function FAQItem({ q, a }) {
  return (
    <div className="bg-[#05060b] border border-gray-800 rounded-xl p-5 hover:border-gray-700 transition-colors">
      <h4 className="text-sm font-bold text-gray-200 mb-2">{q}</h4>
      <p className="text-xs text-gray-200 leading-relaxed">{a}</p>
    </div>
  );
}