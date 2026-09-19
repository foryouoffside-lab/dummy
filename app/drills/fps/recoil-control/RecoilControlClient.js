'use client';
import { isIdleFrameSkippable } from '@/lib/performance';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';

import {
  Activity, AlertCircle, ArrowRight, ChevronRight, Eye,
  Play, RefreshCw, Target, Timer, TrendingUp,
  Volume2, VolumeX, Zap, ZapOff, Share2,
  Users, Sparkles, Sliders, LogOut, Award,
  Crosshair
} from 'lucide-react';

import generateShareCard, { shareScoreCard } from '../../../../components/ShareScoreCard';
import { getPlayerName } from '../../../../lib/leaderboard';
import { drillAudio } from '../../../../lib/drillAudio';
import { useDrillSensitivity } from '../../../../lib/drillSensitivity';
import { drillFlash } from '../../../../lib/drillFlash';
import { drillPenalty } from '../../../../lib/drillPenalty';
import { getStartLevel, getDifficultyProgress, ramp } from '../../../../lib/drillDifficulty';
import { getComboMultiplier, getFpsScoreGrade } from '../../../../lib/scoringEngine';
import { createBackdropCache, getCanvasDpr, createHitRing, drawHitRings } from '../../../../lib/canvasFx';
import DrillCountdown from '../../../../components/drill/DrillCountdown';
import DrillAccordion from '../../../../components/drill/DrillAccordion';
import FpsStartCard from '../../../../components/drill/FpsStartCard';
import DrillResultCard from '../../../../components/drill/DrillResultCard';
import useImmersiveMode from '@/lib/useImmersiveMode';

// ============================================================
// TUNING CONSTANTS
// ============================================================
const DRILL_DURATION = 45; // starting clock only; a run grows past this
const POINTS_PER_LEVEL = 1400; // 200 -> 1400 (7x)
const ELITE_SCORE = 54000; // 18000 -> 54000 (3x)
const MAGAZINE_SIZE = 30;
const DISCIPLINE_HIT_RATE = 0.4; // minimum share of magazine required
const TIME_PENALTY = 0.6; // opt-in penalty on discipline failure
const STORAGE_KEY = 'skilldrills_fps_recoil_control_v3';

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

const getLevelConfig = (level, combo = 0) => {
  const p = getDifficultyProgress(level); // 0 at L1, 1 at L15, unbounded above
  const heat = (getComboMultiplier(combo) - 1) / 2;
  return {
    radius:         Math.max(10.0, ramp(16.0, 11.0, p) * (1 - heat * 0.15)),
    speed:          ramp(75, 220, p) * (1 + heat * 0.20),
    recoilMult:     ramp(1.8, 4.0, p) * (1 + heat * 0.15),
    strafeInterval: Math.max(0.4, ramp(1.3, 0.6, p) * (1 - heat * 0.20)),
    hitPad:         Math.max(2, ramp(7, 3, p) * (1 - heat * 0.25)),
  };
};

// ============================================================
// ACCORDION & DRILL DATA
// ============================================================
const RULES_ITEMS = [
  { num: "1", text: "Headshot Hit", highlight: "+100 PTS (+0.25s)", result: "×Combo Mult" },
  { num: "2", text: "Chest / Limb Hit", highlight: "+40 / +20 PTS", result: "Maintains Streak" },
  { num: "3", text: "Level Up", highlight: "+1 / 1400 PTS", result: "Adaptive Recoil" },
  { num: "4", text: "Empty Mag / Miss", highlight: "Penalty", result: "Resets Combo (-0.6s)" }
];

const ABOUT_INTRO = [
  "Recoil Control Training builds the continuous motor compensation required to keep automatic weapon fire centered on a target. Unlike single-tap or flick-shot drills that test instantaneous micro-corrections, recoil control requires smooth, sustained mouse translation opposite to a weapon's physical kick pattern.",
  "By conditioning your motor cortex to execute the initial vertical pull-down and subsequent horizontal counter-sway against evasively moving targets, this drill builds unconscious muscle memory for full-auto spraying in CS2, Valorant, Apex Legends, and Call of Duty."
];

const ABOUT_CARDS = [
  { icon: Users, iconBg: "bg-blue-600", title: "Who Should Use This?", text: "CS2, Valorant, Apex Legends, and CoD players looking to improve spray transfers, evasive target tracking, and multi-kill spray control." },
  { icon: TrendingUp, iconBg: "bg-red-600", title: "First 10 Rounds Matter", text: "The first 5-8 rounds of any spray pattern have the most predictable vertical rise. Mastering this initial pull-down wins the vast majority of gunfights." },
  { icon: Zap, iconBg: "bg-orange-600", title: "Spray Discipline", text: "Teaches you not to dump full magazines aimlessly. Controlled bursts and tracking accuracy prevent empty mag penalties." },
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


const RELATED_DRILLS = [
  { id: "target-acquisition", name: "Target Acquisition Pro", cat: "FPS Precision", desc: "Master visual discrimination and threat selection under pressure.", href: "/drills/fps/target-acquisition" },
  { id: "strafe-tracking", name: "Strafe Tracking", cat: "FPS Tracking", desc: "Smooth pursuit tracking against erratic horizontal targets.", href: "/drills/fps/strafe-tracking" },
  { id: "micro-correction-precision", name: "Micro Flicks", cat: "FPS Precision", desc: "Optimize tight-angle crosshair micro corrections.", href: "/drills/fps/micro-correction-precision" },
  { id: "flick-shot-training", name: "Pro Flick Trainer", cat: "FPS Flicking", desc: "Snap to targets in time-attack mode with precision flicking.", href: "/drills/fps/flick-shot-training" },
  { id: "anti-strafe-jitter-duel", name: "Anti-Strafe Jitter", cat: "FPS Tracking", desc: "Flick & track reactive ADAD strafing targets.", href: "/drills/fps/anti-strafe-jitter-duel" },
  { id: "pro-smooth-pursuit", name: "Pro Smooth Pursuit", cat: "FPS Tracking", desc: "Train continuous target velocity matching.", href: "/drills/fps/pro-smooth-pursuit" }
];

export default function RecoilControlClient({ copy = null }) {
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
    particles: [], hitMarkers: [], hitRings: [], screenShake: 0,
    logicalWidth: 800, logicalHeight: 450
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

  // Timeout Cleanup on Unmount
  useEffect(() => {
    return () => {
      countdownTimeoutsRef.current.forEach(clearTimeout);
      if (reloadTimeoutRef.current) clearTimeout(reloadTimeoutRef.current);
    };
  }, []);

  const handleExitDrill = useCallback(() => {
    countdownTimeoutsRef.current.forEach(clearTimeout);
    countdownTimeoutsRef.current = [];
    if (reloadTimeoutRef.current) {
      clearTimeout(reloadTimeoutRef.current);
      reloadTimeoutRef.current = null;
    }
    gameActiveRef.current = false;
    startingRef.current = false;
    isMouseDownRef.current = false;

    setIsFullscreen(false);
    if (document.pointerLockElement) {
      document.exitPointerLock();
    }
    setGameState('start');
  }, []);

  const createExplosion = (x, y, color) => {
    for (let i = 0; i < 14; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 4 + 1.5;
      engine.current.particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1.0,
        radius: Math.random() * 2.2 + 1.2,
        color,
      });
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
    const peakLevel = Math.floor(bestLevelRunRef.current);
    const rating = getFpsScoreGrade(e.score, ELITE_SCORE);
    const grade = { letter: rating.grade, label: rating.label, color: rating.color };

    setAnalytics({
      accuracy: finalAccuracy, totalShots: e.totalShots, headshots: e.headshots,
      chestHits: e.chestHits, limbHits: e.limbHits, disciplineFailures: e.disciplineFailures,
      maxCombo: e.maxCombo, finalLevel: peakLevel, grade
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

    const startLevel = getStartLevel();
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
      particles: [], hitMarkers: [], hitRings: [], screenShake: 0,
      logicalWidth: w, logicalHeight: h
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

  // Pointer lock change listener — exit drill on pointer lock loss
  useEffect(() => {
    const handlePointerLockChange = () => {
      const locked = document.pointerLockElement === canvasRef.current;
      setPointerLocked(locked);
      if (!locked) {
        isMouseDownRef.current = false;
        engine.current.shotCountInSpray = 0;
        engine.current.recoilOffset = { x: 0, y: 0 };
        if (gameState === 'playing' || gameState === 'countdown') {
          handleExitDrill();
        }
      }
    };
    document.addEventListener('pointerlockchange', handlePointerLockChange);
    return () => document.removeEventListener('pointerlockchange', handlePointerLockChange);
  }, [gameState, handleExitDrill]);

  // Escape key & fullscreenchange exit handlers
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && (gameState === 'playing' || gameState === 'countdown')) {
        handleExitDrill();
      }
    };
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement && isFullscreen && (gameState === 'playing' || gameState === 'countdown')) {
        handleExitDrill();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [gameState, isFullscreen, handleExitDrill]);

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

      if (gameState === 'playing' && pointerLocked) {
        isMouseDownRef.current = true;
        if (engine.current.ammo <= 0 && !engine.current.isReloading) {
          drillAudio.playPenalty();
          reloadMagazine();
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
  }, [gameState, pointerLocked, universalSens, reloadMagazine]);

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
            bCtx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
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

        const config = getLevelConfig(e.level, e.combo);

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

              if (hitZone === 'head') {
                e.headshots++;
                e.timeLeft += 0.25;
              } else if (hitZone === 'chest') {
                e.chestHits++;
                e.timeLeft += 0.15;
              } else {
                e.limbHits++;
                e.timeLeft += 0.05;
              }

              const ZONE_POINTS = { head: 100, chest: 40, limb: 20 };
              const levelMult = 1 + getDifficultyProgress(e.level) * 0.5;
              e.score += Math.round(ZONE_POINTS[hitZone] * getComboMultiplier(e.combo) * levelMult);

              const rawLevel = (e.score / POINTS_PER_LEVEL) + 1;
              e.level = Math.max(e.level, rawLevel);
              bestLevelRunRef.current = Math.max(bestLevelRunRef.current, e.level);

              drillAudio.playHit();
              const isStreak = e.combo >= 10;
              const zoneColor = hitZone === 'head' ? (isStreak ? '#34d399' : '#10b981') : (isStreak ? '#6ee7b7' : '#059669');
              const zoneRadius = hitZone === 'head' ? rHead : hitZone === 'chest' ? rChest : rLimb;
              createExplosion(bulletX, bulletY, zoneColor);
              e.hitRings.push(createHitRing(bulletX, bulletY, zoneRadius, zoneColor));
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
                if (drillPenalty.isEnabled()) e.timeLeft -= TIME_PENALTY;
                e.combo = 0;
                triggerFlash();
                drillAudio.playPenalty();
              } else {
                e.timeLeft += 0.4;
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

      // Draw Target with zone boundaries (Emerald / Mint Tactical Palette)
      if (gameState === 'playing' || gameState === 'start') {
        const config = getLevelConfig(e.level, e.combo);
        const r = config.radius;
        const tx = e.target.x;
        const ty = e.target.y;
        const isStreak = e.combo >= 10;

        // Limb Zone (Bottom)
        ctx.fillStyle = isStreak ? 'rgba(52, 211, 153, 0.22)' : 'rgba(16, 185, 129, 0.22)';
        ctx.beginPath(); ctx.arc(tx, ty + r * 0.75, r * 0.55, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = 'rgba(16, 185, 129, 0.6)';
        ctx.lineWidth = 1.5; ctx.stroke();

        // Chest Zone (Middle)
        ctx.fillStyle = isStreak ? 'rgba(52, 211, 153, 0.42)' : 'rgba(16, 185, 129, 0.42)';
        ctx.beginPath(); ctx.arc(tx, ty, r * 0.7, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = 'rgba(16, 185, 129, 0.8)';
        ctx.lineWidth = 1.5; ctx.stroke();

        // Head Zone (Top - High-Priority Bullseye)
        ctx.fillStyle = isStreak ? '#34d399' : '#10b981';
        ctx.beginPath(); ctx.arc(tx, ty - r * 0.75, r * 0.4, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2; ctx.stroke();
      }

      // Render Particles (14 circular arc particles with delta-time alpha decay)
      for (let i = e.particles.length - 1; i >= 0; i--) {
        const p = e.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= dt * 2.5;
        if (p.life <= 0) {
          e.particles.splice(i, 1);
          continue;
        }
        ctx.save();
        ctx.globalAlpha = Math.max(0, p.life);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius || 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      drawHitRings(ctx, e.hitRings, dt);

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

      // Draw Tactical Pro White Crosshair (#ffffff with rgba(0,0,0,0.9) drop shadow blur 3)
      const ch = e.crosshair;
      if (ch.initialized && (gameState === 'playing' || gameState === 'start')) {
        const renderX = ch.x + (isMouseDownRef.current ? e.recoilOffset.x : 0);
        const renderY = ch.y + (isMouseDownRef.current ? e.recoilOffset.y : 0);

        ctx.save();
        ctx.shadowColor = 'rgba(0, 0, 0, 0.9)';
        ctx.shadowBlur = 3;
        ctx.strokeStyle = '#ffffff';
        ctx.fillStyle = '#ffffff';

        // Outer reticle circle
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(renderX, renderY, 15, 0, Math.PI * 2);
        ctx.stroke();

        // Cross lines
        const chSize = 14;
        const chGap = 5;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(renderX, renderY - chSize); ctx.lineTo(renderX, renderY - chGap);
        ctx.moveTo(renderX, renderY + chSize); ctx.lineTo(renderX, renderY + chGap);
        ctx.moveTo(renderX - chSize, renderY); ctx.lineTo(renderX - chGap, renderY);
        ctx.moveTo(renderX + chSize, renderY); ctx.lineTo(renderX + chGap, renderY);
        ctx.stroke();

        // Center dot
        ctx.beginPath();
        ctx.arc(renderX, renderY, 1.8, 0, Math.PI * 2);
        ctx.fill();
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
    <div className="min-h-screen bg-[#050508] text-white flex flex-col font-sans select-none">
      {/* ── MAIN CONTENT AREA ── */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6 flex flex-col gap-6">
        
        {/* Title */}
        {!isFullscreen && (
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              {copy?.h1Prefix || null}
              <span data-seo-kw="1">{copy?.h1Keyword || "Recoil Control"}</span>
              {copy?.h1Suffix || " Trainer"}
            </h1>
            <p className="text-[13px] text-slate-400 leading-relaxed">
              {copy?.caption || (
                <>
                  Recoil control is a learned open-loop motor program: the spray pattern is fixed, so you can run the counter-movement without waiting to see where the bullets land. Motor output gets more variable as a movement gets faster and more forceful (Schmidt et al., 1979), which is why a smooth pull-down repeats better than a hard one.
                </>
              )}
            </p>
          </div>
        )}

        {/* 4-STAT CARD ROW */}
        {!isFullscreen && (
          <div className="grid grid-cols-4 gap-2 w-full -mb-2">
            {[
              { label: copy?.statScore || 'Score', value: uiScore },
              { label: copy?.statTime || 'Time', value: `${uiTimeLeft}s`, color: uiTimeLeft <= 10 ? "text-red-400 animate-pulse" : "text-white" },
              { label: copy?.statAccuracy || 'Accuracy', value: `${accuracy}%`, color: "text-red-400" },
              { label: copy?.statBest || 'Best Score', value: bestScore, color: "text-amber-400" },
            ].map((card) => (
              <div key={card.label} className="border border-white/[0.06] bg-white/[0.015] px-2 py-2 rounded-xl text-center">
                <div className="text-[10px] font-bold tracking-wider uppercase text-slate-500">{card.label}</div>
                <div className={`text-base sm:text-lg font-black tabular-nums ${card.color || 'text-white'}`}>{card.value}</div>
              </div>
            ))}
          </div>
        )}

        {/* DRILL BOX CONTAINER */}
        <div 
          ref={containerRef} 
          onContextMenu={(e) => { if (gameActiveRef.current) e.preventDefault(); }}
          className={
            isFullscreen 
              ? "fixed inset-0 z-[100] w-screen h-[100dvh] bg-[#050508] flex flex-col items-center justify-center" 
              : "w-full rounded-2xl aspect-video min-h-[460px] md:min-h-[500px] max-h-[88vh] max-md:portrait:aspect-[3/4] max-md:portrait:min-h-[420px] max-md:portrait:max-h-[76vh] max-md:landscape:min-h-[340px] max-md:landscape:max-h-[85vh] bg-[#080811] border border-white/10 relative overflow-hidden flex flex-col"
          }
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
                <p className="text-[10px] font-semibold uppercase tracking-wider text-white/50">{copy?.statScore || 'Score'}</p>
                <p className="text-2xl sm:text-3xl font-bold text-white tabular-nums leading-tight">{uiScore}</p>
              </div>
              <div className="absolute top-4 right-4 z-30 pointer-events-none text-right">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-white/50">{copy?.statTime || 'Time'}</p>
                <p className={`text-2xl sm:text-3xl font-bold tabular-nums leading-tight ${uiTimeLeft <= 10 ? "text-red-400" : "text-white"}`}>{uiTimeLeft}s</p>
              </div>
              <div className="absolute bottom-4 left-4 z-30 pointer-events-none flex items-center gap-2">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-white/50">{copy?.statAmmo || 'Ammo'}</p>
                <p className={`text-lg font-bold font-mono tabular-nums ${uiIsReloading ? "text-yellow-400 animate-pulse" : uiAmmo <= 5 ? "text-red-400" : "text-white"}`}>
                  {uiIsReloading ? (copy?.statReloading || "RELOADING...") : `${uiAmmo} / 30`}
                </p>
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
                {flashEnabled ? <Zap className="w-4 h-4 text-emerald-400" /> : <ZapOff className="w-4 h-4 text-slate-500" />}
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
            className={`block absolute top-0 left-0 w-full h-full touch-none z-10 ${gameState === "playing" ? "cursor-none" : ""}`}
          />

          {/* START MODAL */}
          {gameState === 'start' && (
            <FpsStartCard
              icon={Crosshair}
              accent="emerald"
              title={copy?.startTitle || "Recoil Control Pro"}
              subtitle={copy?.startSubtitle || "Weapon Spray Patterns & Motor Compensation • Endless Level Progression"}
              startButtonText={copy?.startButtonText}
              isTouchOnlyDevice={isTouchOnlyDevice}
              onStart={enterDrill}
            />
          )}

          {/* COUNTDOWN OVERLAY */}
          {gameState === 'countdown' && (
            <DrillCountdown value={countdownValue} subtitle={copy?.getReady || "GET READY"} />
          )}

          {/* END SCREEN — Universal Result Card */}
          {gameState === 'gameOver' && analytics.grade && (
            <DrillResultCard
              accent="emerald"
              grade={analytics.grade}
              score={uiScore}
              isNewBest={isNewBest}
              stats={[
                { value: analytics.accuracy, suffix: "%", label: copy?.statAccuracy || "Accuracy" },
                { value: analytics.headshots, label: copy?.statHeadshots || "Headshots" },
                { value: `${analytics.maxCombo}x`, label: copy?.statMaxCombo || "Max Combo" },
                { value: `Lv. ${analytics.finalLevel}`, label: copy?.statPeakLevel || "Peak Level" },
              ]}
              playAgainText={copy?.playAgainText}
              shareText={copy?.shareText}
              exitText={copy?.exitText}
              onPlayAgain={enterDrill}
              onShare={shareScore}
              onExit={handleExitDrill}
            />
          )}
        </div>

        {/* Stage Caption */}
        {!isFullscreen && (
          <p className="text-xs text-slate-400 leading-relaxed -mt-2">
            {copy?.bottomCaption || "Counter weapon spray patterns with smooth mouse pull-down to keep full-auto bursts locked on target."}
          </p>
        )}

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
              title={copy?.aboutTitle || "About Recoil Control Trainer"}
              isOpen={openAccordion === 'about'}
              onToggle={() => setOpenAccordion(openAccordion === 'about' ? null : 'about')}
            >
              <div className="space-y-8 font-sans">
                <section>
                  <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                    <Crosshair className="w-4 h-4 text-emerald-400" /> {copy?.whyMattersTitle || "Why Recoil Control Matters"}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-300 mb-3">
                    {copy?.whyMattersLead || "Recoil control is a learned open-loop motor program: the spray pattern is fixed, so you can run the counter-movement without waiting to see where the bullets land. Motor output gets more variable as a movement gets faster and more forceful (Schmidt et al., 1979), which is why a smooth pull-down repeats better than a hard one."}
                  </p>
                  {(copy?.aboutIntro || ABOUT_INTRO).map((para, i, arr) => (
                    <p key={i} className={`text-sm leading-relaxed text-gray-300 ${i < arr.length - 1 ? "mb-3" : ""}`}>{para}</p>
                  ))}
                </section>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {(copy?.aboutCards || ABOUT_CARDS).map((card, i) => (
                    <div key={i} className="p-4 rounded-xl border border-gray-800 bg-white/[0.02]">
                      <div className="flex items-center gap-2.5 mb-2">
                        <div className={`w-7 h-7 rounded-lg ${card.iconBg || 'bg-emerald-600'} flex items-center justify-center`}>
                          {card.icon ? <card.icon className="w-3.5 h-3.5 text-white" /> : <Crosshair className="w-3.5 h-3.5 text-white" />}
                        </div>
                        <h4 className="text-xs font-bold text-white">{card.title}</h4>
                      </div>
                      <p className="text-xs text-gray-300 leading-relaxed">{card.text}</p>
                    </div>
                  ))}
                </div>

                {(copy?.aboutSections || ABOUT_SECTIONS).map((section, i) => (
                  <section key={i}>
                    <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                      {section.icon ? <section.icon className="w-4 h-4 text-emerald-400" /> : <Eye className="w-4 h-4 text-emerald-400" />} {section.title}
                    </h3>
                    {section.paragraphs.map((para, j) => (
                      <p key={j} className={`text-sm leading-relaxed text-gray-300 ${j < section.paragraphs.length - 1 ? "mb-3" : ""}`}>{para}</p>
                    ))}
                  </section>
                ))}
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