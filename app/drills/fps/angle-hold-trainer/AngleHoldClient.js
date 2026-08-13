'use client';
import { isIdleFrameSkippable } from '@/lib/performance';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';

import {
  Activity, AlertCircle, ArrowRight, ChevronRight, Eye,
  Flame, RefreshCw, Target, Timer, TrendingUp,
  Trophy, Volume2, VolumeX, Zap, ZapOff, Share2,
  Users, LogOut, Award,
  Crosshair, Brain
} from 'lucide-react';

import generateShareCard, { shareScoreCard } from '../../../../components/ShareScoreCard';
import { getPlayerName } from '../../../../lib/leaderboard';
import { drillAudio } from '../../../../lib/drillAudio';
import { drillFlash } from '../../../../lib/drillFlash';
import { drillTimeout } from '../../../../lib/drillTimeout';
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
const DRILL_DURATION = 45; // 45 seconds focused duration
const POINTS_PER_LEVEL = 150; // Aggressive progression
const ELITE_SCORE = 12000; // 100% mark for letter grade
const STORAGE_KEY = 'skilldrills_fps_angle_hold_v2';

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


const getLevelConfig = (level) => {
  const p = getDifficultyProgress(level); // 0 -> 1 across L1..L15
  return {
    peekDuration:  Math.max(420, 1400 - p * 980),   // 1400 -> 420 ms exposure (PRIMARY AXIS)
    targetRadius:  Math.max(12, 26 - p * 14),        // 26 -> 12 px floor
    peekDelayMin:  900  - p * 550,                   // 900 -> 350 ms between peeks
    peekDelayMax:  1600 - p * 950,                   // 1600 -> 650 ms
    hitPad:        10   - p * 6,                     // 10 -> 4 px
    fakePeekChance: p < 0.6 ? 0 : (p - 0.6) * 0.6,   // 0 -> 0.24 from L10
    peekDistance:  52   - p * 28,                    // 52 -> 24 px into the lane — short, tight jiggle-peeks
    verticalSpread: 0.25 + p * 0.20,                 // ±25% -> ±45% of height
  };
};

// Distance of each peek corner from its side of the canvas. Pulled inward from the raw
// edge so both corners sit closer together — a tighter double-angle hold, harder to split
// attention between than two peeks at the extreme screen edges.
const getCornerMargin = (width) => Math.round(Math.max(70, Math.min(170, width * 0.19)));

// ============================================================
// ACCORDION DATA
// ============================================================
const RULES_ITEMS = [
  { num: "1", text: "Successful Peek Hit", highlight: "+100 PTS", result: "× Combo (3.0x) × Level Bonus (1.5x)" },
  { num: "2", text: "Level Progression", highlight: "+1 Level / 150 PTS", result: "Exposure window shrinks 1400ms → 420ms" },
  { num: "3", text: "Pre-fire / Miss / Escape", highlight: "Zero Penalties", result: "Combo resets, no time or score lost" },
  { num: "4", text: "Jiggle & Fake Peeks", highlight: "From Level 10", result: "Fast bait swings punish premature clicks" }
];

const ABOUT_INTRO = [
  "Angle Hold Pro trains crosshair placement and pre-aim discipline, the defensive skill that decides most site-anchor duels in tactical FPS games like CS2, Valorant, and Rainbow Six Siege. A peeking opponent moves toward you and gets to see your position on their screen a fraction of a second before your screen updates with theirs — this latency gap is peeker's advantage. The only reliable counter is pre-aiming the exact pixel where an enemy's head will appear and firing the instant they cross that plane, rather than reacting and flicking after the fact.",
  "Each round spawns a target peeking out from either the left or right chokepoint at a random height and exposure duration, so you can't memorize a rhythm — every peek demands fresh pre-aim discipline. Exposure window and target size both shrink as your score climbs, so the drill keeps pace with you instead of staying static once you've adapted to it."
];

const ABOUT_CARDS = [
  { icon: Users, iconBg: 'bg-blue-600', title: "Who Should Use This?", text: "Valorant defenders holding site angles, CS2 players covering bomb site chokepoints, and Rainbow Six Siege anchors who need fast, disciplined passive-hold reactions against tight-angle peeks." },
  { icon: TrendingUp, iconBg: 'bg-emerald-600', title: "Skills Improved", text: "Crosshair-to-corner distance calibration, trigger discipline, peek reaction speed, and visual tracking of fast, variable-height peeks." },
  { icon: Zap, iconBg: 'bg-purple-600', title: "Jiggle & Fake Peeks", text: "From Level 10, targets execute fast bait swings that punish premature clicking, forcing you to confirm a real exposure before you fire." },
];

const ABOUT_SECTIONS = [
  {
    icon: Activity,
    title: "How Far Should You Hold From The Wall?",
    paragraphs: [
      "Players hold corners by leaving a slight horizontal gap between the corner wall and their crosshair. This offset accommodates their visual reaction delay, letting them click without needing to flick when an enemy swings wide. If enemies consistently push past your crosshair before you can click, hold wider — further from the corner. If you shoot early and miss, hold tighter. The correct distance is whatever matches your personal reaction latency, and this drill's escalating peek speed helps you calibrate it under real time pressure."
    ]
  },
  {
    icon: Target,
    title: "Progressive Difficulty & Jiggle Peeks",
    paragraphs: [
      "The difficulty curve tightens gradually across 15 levels: exposure window shrinks from 1400ms down to 420ms, target radius drops from 26px to 12px, and peeks fire in tighter succession as your score climbs — mirroring how real angle holds feel, forgiving on early rounds, unforgiving in the clutch moments that matter.",
      "Starting at Level 10, a fraction of peeks become fast jiggle fakes that retreat almost immediately, testing whether you're actually confirming a target before you click or just pattern-matching movement."
    ]
  },
  {
    icon: Eye,
    title: "What The Drill Tracks",
    paragraphs: [
      "Average reaction time tells you how quickly your eyes and trigger finger convert a confirmed peek into a completed click. Max combo shows how consistently you land hits without a pre-fire or miss breaking your rhythm — a better predictor of real defensive performance than raw accuracy alone. Peak level reached tells you how far into the 15-level curve your discipline holds up before exposure windows and peek speed outpace your reaction time."
    ]
  }
];

const FAQ_ITEMS = [
  { q: "What is crosshair placement?", a: "Crosshair placement is a core shooter mechanic where you position your aim cursor exactly where an enemy's head is expected to spawn or appear, minimizing the physical distance required to shoot them." },
  { q: "What is peeker's advantage?", a: "Peeker's advantage is a latency-driven delay where a moving player rounding a corner gets to see a stationary player holding the angle slightly before the stationary player's screen updates with their presence." },
  { q: "How do CS2 and Valorant players hold angles?", a: "Players hold corners by leaving a slight horizontal gap between the corner wall and their crosshair. This offset accommodates their visual reaction delay, allowing them to click without needing to flick when an enemy swings wide." },
  { q: "How far should my crosshair be from the wall?", a: "If enemies consistently push past your crosshair before you can click, hold wider (further away from the corner). If you shoot early and miss, hold tighter. Adjust the distance to match your reaction latency." },
  { q: "Can this drill improve my reaction time and defensive gameplay?", a: "Yes. Exposing your brain to surprise, high-speed peeks and penalizing misses and premature clicking conditions you to react to visual movement faster, preventing you from getting caught off guard by wide peeks and making you a more effective defensive anchor." },
  { q: "Which competitive shooters does this drill help?", a: "This drill directly benefits Valorant defenders holding site angles, CS2 players covering bomb site holds against peeker swings, and Rainbow Six Siege anchors who need fast passive-hold reaction speed against tight-angle peeks." },
  { q: "What skills does this drill improve?", a: "It improves trigger discipline, peek reaction speed, crosshair-to-corner distance calibration, and visual tracking of fast, variable peeks." },
  { q: "How often should I practice crosshair placement?", a: "We recommend dedicating 10-15 minutes to crosshair placement and angle holding drills daily before your gaming sessions." },
  { q: "Is this drill free?", a: "Yes, this drill is completely free to use and runs directly in any modern browser without requiring any downloads or account registration." }
];

const RELATED_DRILLS = [
  { id: "180-degree-awareness", name: "180° Awareness Pro", cat: "FPS Awareness", desc: "Master 180-degree snap turns and peripheral threat detection.", href: "/drills/fps/180-degree-awareness" },
  { id: "instant-response", name: "Instant Response", cat: "FPS Reaction", desc: "Train raw single-stimulus reflex acquisition.", href: "/drills/fps/instant-response" },
  { id: "target-acquisition", name: "Target Acquisition Pro", cat: "FPS Precision", desc: "Master visual discrimination and threat selection under pressure.", href: "/drills/fps/target-acquisition" },
  { id: "micro-correction-precision", name: "Micro Flicks", cat: "FPS Precision", desc: "Optimize tight-angle crosshair micro corrections.", href: "/drills/fps/micro-correction-precision" },
  { id: "flick-shot-training", name: "Pro Flick Trainer", cat: "FPS Flicking", desc: "Snap to targets in time-attack mode with precision flicking.", href: "/drills/fps/flick-shot-training" },
  { id: "anti-strafe-jitter-duel", name: "Anti-Strafe Jitter", cat: "FPS Duel", desc: "Flick & track reactive ADAD strafing targets.", href: "/drills/fps/anti-strafe-jitter-duel" }
];

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function AngleHoldClient() {
  const [gameState, setGameState] = useState('start'); // 'start' | 'countdown' | 'playing' | 'gameOver'
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [flashEnabled, setFlashEnabled] = useState(true);
  const [pointerLocked, setPointerLocked] = useState(false);
  const [universalSens, setUniversalSens] = useState(1.0);
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
    accuracy: 100, successfulHits: 0, missedClicks: 0, preFires: 0,
    targetsEscaped: 0, avgReactionMs: 0, maxCombo: 0, finalLevel: 1, grade: null
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
    target: { active: false, x: 0, y: 0, side: 'right', isFake: false, spawnTime: 0, peekDuration: 1400, pulseSeed: 0.5 },
    score: 0, level: 1, combo: 0, timeLeft: DRILL_DURATION, nextPeekTime: 0,
    successfulHits: 0, missedClicks: 0, preFires: 0, targetsEscaped: 0, totalShots: 0,
    reactionTimes: [], maxCombo: 0, particles: [], hitMarkers: [], screenShake: 0,
    logicalWidth: 800, logicalHeight: 450
  });

  const cmPer360 = (30 / universalSens).toFixed(1);

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
      const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
      const isTouchCapable = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      setIsTouchOnlyDevice(isTouchCapable && !hasFinePointer);

      try {
        const savedSens = localStorage.getItem('angleHold_sens_v2');
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
    };
  }, []);

  useEffect(() => {
    if (gameState !== 'playing') {
      try { localStorage.setItem('angleHold_sens_v2', universalSens.toString()); } catch (e) {}
    }
  }, [universalSens, gameState]);

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
    startingRef.current = false;

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

  const spawnPeekTarget = useCallback((time, width, height, currentLevel) => {
    const e = engine.current;
    const config = getLevelConfig(currentLevel);
    
    const side = Math.random() < 0.5 ? 'left' : 'right';
    const isFake = Math.random() < config.fakePeekChance;

    const verticalSpan = height * (config.verticalSpread * 2);
    const peekY = (height / 2) - (verticalSpan / 2) + Math.random() * verticalSpan;
    const margin = getCornerMargin(width);

    e.target = {
      active: true,
      x: side === 'left' ? margin : width - margin,
      y: peekY,
      side,
      isFake,
      spawnTime: time,
      peekDuration: isFake ? Math.min(220, config.peekDuration * 0.45) : config.peekDuration,
      pulseSeed: Math.random()
    };

    drillAudio.playBeep(side === 'left' ? 520 : 680, 'triangle', 0.05);
  }, []);

  const createExplosion = (x, y, color) => {
    for (let i = 0; i < 12; i++) {
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
    const totalAttempts = e.successfulHits + e.missedClicks + e.preFires + e.targetsEscaped;
    const finalAccuracy = totalAttempts > 0 ? Math.round((e.successfulHits / totalAttempts) * 100) : 0;
    const avgRt = e.reactionTimes.length > 0 
      ? Math.round(e.reactionTimes.reduce((a, b) => a + b, 0) / e.reactionTimes.length) 
      : 0;

    const rating = getFpsScoreGrade(e.score, ELITE_SCORE);
    const grade = { letter: rating.grade, label: rating.label, color: rating.color };

    setAnalytics({
      accuracy: finalAccuracy, successfulHits: e.successfulHits, missedClicks: e.missedClicks,
      preFires: e.preFires, targetsEscaped: e.targetsEscaped, avgReactionMs: avgRt,
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
      accuracy: 100, successfulHits: 0, missedClicks: 0, preFires: 0,
      targetsEscaped: 0, avgReactionMs: 0, maxCombo: 0, finalLevel: startLevel, grade: null
    });

    const w = engine.current.logicalWidth || 800;
    const h = engine.current.logicalHeight || 450;

    engine.current = {
      crosshair: { ...engine.current.crosshair },
      target: { active: false, x: 0, y: 0, side: 'right', isFake: false, spawnTime: 0, peekDuration: 1400, pulseSeed: 0.5 },
      score: 0, level: startLevel, combo: 0, timeLeft: DRILL_DURATION,
      nextPeekTime: performance.now() + 800, successfulHits: 0, missedClicks: 0,
      preFires: 0, targetsEscaped: 0, totalShots: 0, reactionTimes: [], maxCombo: 0,
      particles: [], hitMarkers: [], screenShake: 0, logicalWidth: w, logicalHeight: h
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

    const handleMouseDown = (e) => {
      if (e.target.tagName === 'BUTTON' || e.target.closest('button')) return;
      if (!containerRef.current || !containerRef.current.contains(e.target)) return;

      if (gameState === 'playing') {
        if (!pointerLocked && canvasRef.current) {
          resumeDrill();
        } else if (pointerLocked) {
          const eRef = engine.current;
          const ch = eRef.crosshair;
          const tgt = eRef.target;
          const config = getLevelConfig(eRef.level);

          eRef.totalShots++;

          if (!tgt.active) {
            eRef.preFires++;
            eRef.combo = 0;
            eRef.screenShake = 6;
            triggerFlash();
            drillAudio.playPenalty();
          } else {
            const dist = Math.hypot(ch.x - tgt.x, ch.y - tgt.y);

            if (dist <= config.targetRadius + config.hitPad) {
              if (tgt.isFake) {
                eRef.preFires++;
                eRef.combo = 0;
                eRef.screenShake = 6;
                triggerFlash();
                drillAudio.playPenalty();
                createExplosion(tgt.x, tgt.y, '#ef4444');
              } else {
                eRef.successfulHits++;
                eRef.combo++;
                if (eRef.combo > eRef.maxCombo) eRef.maxCombo = eRef.combo;
                
                const reactionMs = performance.now() - tgt.spawnTime;
                eRef.reactionTimes.push(reactionMs);

                const levelMult = 1 + getDifficultyProgress(eRef.level) * 0.5;
                eRef.score += Math.round(100 * getComboMultiplier(eRef.combo) * levelMult);

                const rawLevel = Math.floor(eRef.score / POINTS_PER_LEVEL) + 1 + getComboBonusLevel(eRef.combo);
                eRef.level = Math.max(eRef.level, rawLevel);
                bestLevelRunRef.current = Math.max(bestLevelRunRef.current, eRef.level);

                drillAudio.playHit();
                createExplosion(tgt.x, tgt.y, '#00ff88');
                createHitMarker(ch.x, ch.y);
                setUiScore(eRef.score);
              }

              tgt.active = false;
              const nextConfig = getLevelConfig(eRef.level);
              eRef.nextPeekTime = performance.now() + (nextConfig.peekDelayMin + Math.random() * (nextConfig.peekDelayMax - nextConfig.peekDelayMin));
            } else {
              eRef.missedClicks++;
              eRef.combo = 0;
              eRef.screenShake = 6;
              triggerFlash();
              drillAudio.playPenalty();
              createExplosion(ch.x, ch.y, '#ef4444');
            }
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
  }, [gameState, pointerLocked, universalSens, triggerFlash, resumeDrill]);

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

            const margin = getCornerMargin(w);
            bCtx.fillStyle = '#0f172a';
            bCtx.fillRect(0, 0, margin, h);
            bCtx.fillRect(w - margin, 0, margin, h);

            bCtx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
            bCtx.lineWidth = 2;
            bCtx.beginPath();
            bCtx.moveTo(margin, 0); bCtx.lineTo(margin, h);
            bCtx.moveTo(w - margin, 0); bCtx.lineTo(w - margin, h);
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

        if (!e.target.active && time >= e.nextPeekTime) {
          spawnPeekTarget(time, w, h, e.level);
        }

        if (e.target.active) {
          const tgt = e.target;
          const config = getLevelConfig(e.level);
          const age = time - tgt.spawnTime;
          const progress = Math.min(1, age / tgt.peekDuration);

          const peakDistance = config.peekDistance;
          let currentXOffset = Math.sin(progress * Math.PI) * peakDistance;
          const margin = getCornerMargin(w);

          if (tgt.side === 'left') {
            tgt.x = margin + currentXOffset;
          } else {
            tgt.x = (w - margin) - currentXOffset;
          }

          if (drillTimeout.isEnabled() && age >= tgt.peekDuration) {
            tgt.active = false;
            if (!tgt.isFake) {
              e.targetsEscaped++;
              e.combo = 0;
              e.screenShake = 6;
              triggerFlash();
              drillAudio.playPenalty();
              createExplosion(tgt.x, tgt.y, '#ef4444');
            }

            const nextConfig = getLevelConfig(e.level);
            e.nextPeekTime = time + (nextConfig.peekDelayMin + Math.random() * (nextConfig.peekDelayMax - nextConfig.peekDelayMin));
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

      if ((gameState === 'playing' || gameState === 'start') && e.target.active) {
        const tgt = e.target;
        const config = getLevelConfig(e.level);
        const age = time - tgt.spawnTime;
        const progress = Math.min(1, age / tgt.peekDuration);

        const targetColor = tgt.isFake ? '#f97316' : (e.combo >= 10 ? '#38bdf8' : '#00ff88');

        drawPulseRing(ctx, tgt.x, tgt.y, config.targetRadius, targetColor, progress);
        drawTacticalTarget(ctx, tgt.x, tgt.y, config.targetRadius, targetColor, true);
      }

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
        const activeColor = pointerLocked ? '#00ff88' : '#eab308';
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
  }, [gameState, pointerLocked, spawnPeekTarget, endGame, triggerFlash]);

  const shareScore = useCallback(async () => {
    const url = 'https://skilldrills.online/drills/fps/angle-hold-trainer';
    try {
      const canvas = generateShareCard({
        score: uiScore,
        bestScore,
        accuracy: analytics.accuracy,
        bestCombo: analytics.maxCombo,
        rating: { letter: analytics.grade?.letter || 'C', label: analytics.grade?.label || 'Keep Going', emoji: '🎯' },
        newBest: isNewBest,
        drillName: 'Angle Hold Pro',
        playerName: getPlayerName(),
      });
      await shareScoreCard(url, canvas);
    } catch (e) {
      const text = `🎯 I scored ${uiScore} PTS (Level ${analytics.finalLevel}) on Angle Hold Pro! Accuracy: ${analytics.accuracy}%. Test your reflexes at skilldrills.online!`;
      if (typeof navigator !== 'undefined' && navigator.share) {
        navigator.share({ title: 'My Angle Hold Score', text, url }).catch(() => {});
      } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
        navigator.clipboard.writeText(text);
        alert('Score card copied to clipboard!');
      }
    }
  }, [uiScore, bestScore, analytics, isNewBest]);

  const totalActions = engine.current.successfulHits + engine.current.missedClicks + engine.current.preFires + engine.current.targetsEscaped;
  const accuracy = gameState === 'gameOver' ? analytics.accuracy : (totalActions > 0 ? Math.round((engine.current.successfulHits / totalActions) * 100) : 100);

  return (
    <div className="min-h-screen bg-[#050508] text-white flex flex-col font-sans select-none">
      {/* ── MAIN CONTENT AREA ── */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6 flex flex-col gap-6">
        {/* Title */}
        {!isFullscreen && (
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              ANGLE HOLD PRO
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Crosshair Placement &amp; Peek Reaction • 15 Levels
            </p>
          </div>
        )}

        {/* Live Stat Cards */}
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
              <div className="text-lg sm:text-xl font-black text-blue-400 tabular-nums">{accuracy}%</div>
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
                {soundEnabled ? <Volume2 className="w-4 h-4 text-orange-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
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
                <AlertCircle className="w-12 h-12 text-orange-400 mx-auto mb-3" />
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
              accent="orange"
              title="Angle Hold Pro"
              subtitle="Crosshair Placement & Peek Reaction • 15 Levels"
              rules={[
                { icon: Target, accent: 'orange', title: 'Objective', text: 'Punish Cover Peeks (+100)' },
                { icon: AlertCircle, accent: 'red', title: 'Failure Rule', text: 'Pre-fire / Miss / Escape' },
              ]}
              sensitivity={{ value: universalSens, onChange: setUniversalSens, cmPer360 }}
              stats={[
                { icon: Trophy, label: 'Best Score', value: bestScore, color: 'text-white', accent: 'slate' },
                { icon: Flame, label: 'Best Combo', value: `${bestCombo}x`, color: 'text-orange-400', accent: 'orange' },
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
              <div className="w-[36%] flex flex-col items-center justify-center gap-1 border-r border-white/5 px-4" style={{ background: 'radial-gradient(ellipse 260px 200px at 50% 30%, rgba(249,115,22,.12), transparent 70%)' }}>
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
                    <p className="text-sm sm:text-base font-black text-white">{analytics.avgReactionMs}<span className="text-[10px] text-gray-500">ms</span></p>
                    <p className="text-[7.5px] sm:text-[8.5px] font-bold uppercase tracking-wider text-gray-400 mt-0.5">Avg Reaction</p>
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
                    className="flex-1 py-3 rounded-[13px] bg-gradient-to-r from-orange-500 to-amber-600 text-white font-bold text-xs uppercase tracking-wide cursor-pointer transition-transform active:scale-[0.98] shadow-md flex items-center justify-center gap-1.5"
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
              title="About Angle Hold Pro"
              isOpen={openAccordion === 'about'}
              onToggle={() => setOpenAccordion(openAccordion === 'about' ? null : 'about')}
            >
              <div className="space-y-8">
                <section>
                  <h4 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                    <Crosshair className="w-4 h-4 text-orange-400" /> What Is Crosshair Placement & Angle Holding?
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
                      <section.icon className="w-4 h-4 text-orange-400" /> {section.title}
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
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">
              Related FPS Drills
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {RELATED_DRILLS.map((drill) => (
                <Link
                  key={drill.id}
                  href={drill.href}
                  className="group bg-[#0c0c16] border border-white/5 hover:border-orange-500/40 rounded-xl p-3.5 transition-all duration-200 hover:-translate-y-0.5 flex flex-col justify-between"
                >
                  <div>
                    <div className="text-[10px] font-bold text-orange-400 uppercase tracking-wider mb-1">{drill.cat}</div>
                    <div className="text-xs font-bold text-white group-hover:text-orange-300 transition-colors">{drill.name}</div>
                    <div className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">{drill.desc}</div>
                  </div>
                  <div className="text-[10px] font-bold text-slate-500 group-hover:text-orange-400 mt-3 flex items-center gap-1 transition-colors">
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