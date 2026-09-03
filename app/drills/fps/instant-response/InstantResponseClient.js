'use client';
import { isIdleFrameSkippable } from '@/lib/performance';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';

import {
  AlertCircle, Eye, Flame, Target, TrendingUp,
  Trophy, Volume2, VolumeX, Zap, ZapOff, Users
} from 'lucide-react';

import generateShareCard, { shareScoreCard } from '../../../../components/ShareScoreCard';
import { getPlayerName } from '../../../../lib/leaderboard';
import { drillAudio } from '../../../../lib/drillAudio';
import { drillFlash } from '../../../../lib/drillFlash';
import { drillTimeout } from '../../../../lib/drillTimeout';
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
const POINTS_PER_LEVEL = 1400; // 200 -> 1400 (7x)
const ELITE_SCORE = 48000; // 16000 -> 48000 (3x)

const TIME_PER_HIT = 0.6;
const TIME_PENALTY = 0.8;

const STORAGE_KEY = 'skilldrills_fps_instant_response_v3';
const SPAM_CALM_WINDOW = 350;

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
    flashWindow:   Math.max(40, ramp(550, 90, p) * (1 - heat * 0.35)),
    targetRadius:  35,
    idleMin:       ramp(700, 300, p) * (1 - heat * 0.40),
    idleMax:       ramp(2200, 1000, p) * (1 - heat * 0.35),
    hitPad:        Math.max(0.5, ramp(10, 2, p) * (1 - heat * 0.50)),
    feintChance:   p < 0.5 ? 0 : Math.min(0.35, (p - 0.5) * 0.35),
  };
};

// ============================================================
// ACCORDION DATA
// ============================================================
const RULES_ITEMS = [
  { num: "1", text: "Flash Reaction Hit", highlight: "+100 PTS", result: "Click Immediately On Flash" },
  { num: "2", text: "Speed Bonus System", highlight: "Up to +150 PTS", result: "Sub-150ms Reactions" },
  { num: "3", text: "Level Progression", highlight: "+1 Level / 1400 PTS", result: "Adaptive Flash Windows" },
  { num: "4", text: "Feint & Pre-fire Rule", highlight: "Failure Penalty", result: "Combo resets (-0.8s with Time Penalty enabled)" }
];

const ABOUT_INTRO = [
  "Instant Response Pro isolates and measures raw visual stimulus reaction latency. Unlike tracking or flicking drills that combine target motion with cursor trajectory, this drill keeps the target stationary at screen center to measure pure visual processing delay — the exact latency between target flash and motor cortex trigger execution."
];

const ABOUT_CARDS = [
  { icon: Users, iconBg: "bg-blue-600", title: "Who Should Use This?", text: "CS2, Valorant, and Apex Legends players sharpening raw visual reaction latency, plus any FPS player chasing faster trigger response without relying on hardware." },
  { icon: TrendingUp, iconBg: "bg-emerald-600", title: "Skills Improved", text: "Visual stimulus processing speed, trigger discipline, anticipation control, and consistent sub-200ms reaction latency." },
  { icon: Target, iconBg: "bg-purple-600", title: "Speed Bonus & Feints", text: "Sub-150ms reactions earn up to +150 bonus points, while dim feints unlocking at higher levels test your trigger discipline under pressure." },
];

const ABOUT_SECTIONS = [
  {
    icon: Zap,
    title: "Progressive Difficulty & Exposure Window",
    paragraphs: [
      "By exposing players to randomized idle intervals and shrinking flash windows, Instant Response Pro conditions the nervous system to react to visual flashes with zero hesitation while eliminating premature anticipation clicking."
    ]
  },
  {
    icon: Zap,
    title: "Speed Bonus & Trigger Discipline",
    paragraphs: [
      "Sub-150ms reactions earn up to +150 speed bonus points, directly rewarding high neurological processing speed. Pre-firing during idle states or clicking dim feints breaks your combo multiplier, forcing absolute trigger discipline under extreme speed constraints."
    ]
  }
];

const FAQ_ITEMS = [
  { q: "What is FPS reaction training?", a: "FPS reaction training involves specific drills designed to improve your ability to detect, process, and react to visual stimuli and unexpected threats in a competitive gaming environment." },
  { q: "How do professional FPS players react so quickly?", a: "Pros combine lower hardware input latency with trained visual anticipation, crosshair placement, and high-speed neurological processing." },
  { q: "Can visual reaction speed be trained?", a: "Yes, consistent exposure to visual reflex stimuli strengthens the brain's neural pathways, reducing the delay between detection and trigger execution." },
  { q: "Does this drill help in Valorant?", a: "Yes. In Valorant, holding defensive angles requires fast visual stimulus reaction to click peeking opponents instantly." },
  { q: "Does this drill help in CS2?", a: "Absolutely. CS2 gunfights are won in milliseconds. Improving visual stimulus response speed directly translates to winning quick-peek engagements." },
  { q: "What is raw reflex latency?", a: "Raw reflex latency is the speed at which your motor reflex fires upon seeing a visual color/light change on screen, independent of cursor movement." },
  { q: "How often should I train my reflexes?", a: "We recommend daily 10-15 minute reflex sessions as a warm-up before queueing up competitive matches." },
  { q: "Why does missing reset my combo instead of penalizing my time or score?", a: "By default, pre-firing, missing, or timing out only resets your combo multiplier to keep baseline training accessible. If you want a stricter challenge with clock deductions (-0.8s per error), you can enable Time Penalty in the session settings." },
  { q: "What is click timing consistency?", a: "Consistency measures the deviation between your reaction times. Lower deviation means highly stable and predictable in-game reflexes." },
  { q: "Does sleep affect my reaction time?", a: "Yes, fatigue and sleep deprivation can degrade reaction time by 50ms or more, heavily impacting gaming performance." },
  { q: "What games benefit from reflex training?", a: "All fast-paced shooters like Apex Legends, Call of Duty, Overwatch 2, CS2, Valorant, and Spectre Divide." },
  { q: "Is this reflex test free?", a: "Yes, it is 100% free and runs directly in your browser with raw pointer lock precision." },
  { q: "How does dynamic scaling make the drill harder?", a: "As your score increases, the flash duration decreases dynamically with continuous progression, forcing higher neural speed." },
  { q: "What is anticipation clicking?", a: "Anticipation clicking (pre-firing) is clicking based on timing prediction rather than visual stimulus response, which is penalized in this drill." },
  { q: "Does peripheral vision play a role here?", a: "Even though the target is centered, keeping your visual focus sharp and relaxed helps register the flash state faster." }
];

const RELATED_DRILLS = [
  { id: "180-degree-awareness", name: "180° Awareness Pro", cat: "FPS Awareness", desc: "Master 180-degree snap turns and peripheral threat detection.", href: "/drills/fps/180-degree-awareness" },
  { id: "angle-hold-trainer", name: "Angle Hold Pro", cat: "FPS Angle Hold", desc: "Train defensive crosshair placement and peek reaction timing.", href: "/drills/fps/angle-hold-trainer" },
  { id: "target-acquisition", name: "Target Acquisition Pro", cat: "FPS Precision", desc: "Master visual discrimination and target selection under pressure.", href: "/drills/fps/target-acquisition" },
  { id: "flick-shot-training", name: "Pro Flick Trainer", cat: "FPS Flicking", desc: "Snap to targets in time-attack mode with precision flicking.", href: "/drills/fps/flick-shot-training" },
  { id: "micro-correction-precision", name: "Micro Flicks", cat: "FPS Precision", desc: "Optimize tight-angle crosshair micro corrections.", href: "/drills/fps/micro-correction-precision" },
  { id: "target-switching-swarm", name: "Target Switching Swarm", cat: "FPS Multi-Kill", desc: "Rapid multi-target switching and target acquisition.", href: "/drills/fps/target-switching-swarm" }
];

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function InstantResponseClient() {
  const [gameState, setGameState] = useState('start'); // 'start' | 'countdown' | 'playing' | 'gameOver'
  const [isFullscreen, setIsFullscreen] = useState(false);
  useImmersiveMode(isFullscreen); // locks the page behind while the drill fills the screen
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [flashEnabled, setFlashEnabled] = useState(true);
  const [penaltyEnabled, setPenaltyEnabled] = useState(false);
  const [pointerLocked, setPointerLocked] = useState(false);
  const [openAccordion, setOpenAccordion] = useState(null);
  const [isTouchOnlyDevice, setIsTouchOnlyDevice] = useState(false);
  const [countdownValue, setCountdownValue] = useState(3);
  const [flashes, setFlashes] = useState([]);

  // HUD & Best Stats State
  const [uiScore, setUiScore] = useState(0);
  const [uiTimeLeft, setUiTimeLeft] = useState(DRILL_DURATION);
  const [uiAccuracy, setUiAccuracy] = useState(100);
  const [bestScore, setBestScore] = useState(0);
  const [bestCombo, setBestCombo] = useState(0);
  const [bestLevel, setBestLevel] = useState(1);
  const [isNewBest, setIsNewBest] = useState(false);

  const [analytics, setAnalytics] = useState({
    accuracy: 100, successfulHits: 0, missedClicks: 0, preFires: 0,
    timeouts: 0, avgReactionMs: 0, maxCombo: 0, finalLevel: 1, grade: null
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
    target: { isExposed: false, isFeint: false, exposeStartTime: 0, flashWindow: 550 },
    score: 0, level: 1, combo: 0, timeLeft: DRILL_DURATION, nextExposeTime: 0, lastClickTime: -Infinity,
    successfulHits: 0, missedClicks: 0, preFires: 0, timeouts: 0, totalShots: 0,
    reactionTimes: [], maxCombo: 0, particles: [], hitMarkers: [], screenShake: 0,
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
    };
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

  // Stop the drill if the player leaves any way other than the in-app Exit
  // button (back gesture, tab switch, Esc) instead of running invisibly.
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

  const spawnTargetExposure = useCallback((time, currentLevel, currentCombo) => {
    const e = engine.current;
    const config = getLevelConfig(currentLevel, currentCombo);
    const isFeint = Math.random() < config.feintChance;
    
    const windowDuration = isFeint ? 60 : config.flashWindow;

    e.target = {
      isExposed: true,
      isFeint,
      exposeStartTime: time,
      flashWindow: windowDuration
    };
  }, []);

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

  // End Game Management
  const endGame = useCallback(() => {
    gameActiveRef.current = false;
    startingRef.current = false;
    setGameState('gameOver');
    if (document.pointerLockElement) document.exitPointerLock();
    
    const e = engine.current;
    const totalAttempts = e.successfulHits + e.missedClicks + e.preFires + e.timeouts;
    const finalAccuracy = totalAttempts > 0 ? Math.round((e.successfulHits / totalAttempts) * 100) : 0;
    const avgRt = e.reactionTimes.length > 0 
      ? Math.round(e.reactionTimes.reduce((a, b) => a + b, 0) / e.reactionTimes.length) 
      : 0;

    const rating = getFpsScoreGrade(e.score, ELITE_SCORE);
    const grade = { letter: rating.grade, label: rating.label, color: rating.color };

    setAnalytics({
      accuracy: finalAccuracy, successfulHits: e.successfulHits, missedClicks: e.missedClicks,
      preFires: e.preFires, timeouts: e.timeouts, avgReactionMs: avgRt,
      maxCombo: e.maxCombo, finalLevel: Math.floor(e.level), grade
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
    setUiAccuracy(100);
    setUiTimeLeft(DRILL_DURATION);
    lastTimeRef.current = DRILL_DURATION;

    const saved = getSavedData();
    const startLevel = getStartLevel();
    bestLevelRunRef.current = startLevel;

    setAnalytics({
      accuracy: 100, successfulHits: 0, missedClicks: 0, preFires: 0,
      timeouts: 0, avgReactionMs: 0, maxCombo: 0, finalLevel: startLevel, grade: null
    });

    const w = engine.current.logicalWidth || 800;
    const h = engine.current.logicalHeight || 450;

    engine.current = {
      crosshair: { ...engine.current.crosshair },
      target: { isExposed: false, isFeint: false, exposeStartTime: 0, flashWindow: 550 },
      score: 0, level: startLevel, combo: 0, timeLeft: DRILL_DURATION,
      nextExposeTime: performance.now() + 1000, lastClickTime: -Infinity,
      successfulHits: 0, missedClicks: 0, preFires: 0, timeouts: 0, totalShots: 0,
      reactionTimes: [], maxCombo: 0, particles: [], hitMarkers: [], screenShake: 0,
      logicalWidth: w, logicalHeight: h
    };

    setIsFullscreen(true);

    // Countdown sequence: 3 -> 2 -> 1 -> GO
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

  // Pointer lock change listener
  useEffect(() => {
    const handlePointerLockChange = () => setPointerLocked(document.pointerLockElement === canvasRef.current);
    document.addEventListener('pointerlockchange', handlePointerLockChange);
    return () => document.removeEventListener('pointerlockchange', handlePointerLockChange);
  }, []);

  // Scoped Raw Input Mouse Move & Mouse Down Event Handlers
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (gameState !== 'playing' || !pointerLocked || !canvasRef.current) return;
      const w = engine.current.logicalWidth;
      const h = engine.current.logicalHeight;
      engine.current.crosshair.x = Math.max(0, Math.min(w, engine.current.crosshair.x + e.movementX));
      engine.current.crosshair.y = Math.max(0, Math.min(h, engine.current.crosshair.y + e.movementY));
    };

    const handleMouseDown = (e) => {
      if (e.target.tagName === 'BUTTON' || e.target.closest('button')) return;
      if (!containerRef.current || !containerRef.current.contains(e.target)) return;

      if (gameState === 'playing') {
        if (!pointerLocked && canvasRef.current) {
          resumeDrill();
        } else if (pointerLocked) {
          const eRef = engine.current;
          const w = eRef.logicalWidth;
          const h = eRef.logicalHeight;
          const targetX = w / 2;
          const targetY = h / 2;
          const config = getLevelConfig(eRef.level, eRef.combo);

          eRef.totalShots++;
          eRef.lastClickTime = performance.now();

          if (!eRef.target.isExposed || eRef.target.isFeint) {
            // PRE-FIRE FAILURE
            eRef.preFires++;
            if (drillPenalty.isEnabled()) eRef.timeLeft -= TIME_PENALTY;
            eRef.combo = 0;
            eRef.screenShake = 8;
            triggerFlash();
            drillAudio.playPenalty();
            eRef.target.isExposed = false;
          } else {
            const ch = eRef.crosshair;
            const dist = Math.hypot(ch.x - targetX, ch.y - targetY);

            if (dist <= config.targetRadius + config.hitPad) {
              // SUCCESSFUL REACTION HIT
              eRef.successfulHits++;
              eRef.combo++;
              if (eRef.combo > eRef.maxCombo) eRef.maxCombo = eRef.combo;
              
              const reactionMs = performance.now() - eRef.target.exposeStartTime;
              eRef.reactionTimes.push(reactionMs);

              const speedBonus = Math.max(0, Math.min(150, Math.round((500 - reactionMs) / 350 * 150)));
              const levelMult = 1 + getDifficultyProgress(eRef.level) * 0.5;
              eRef.score += Math.round((100 + speedBonus) * getComboMultiplier(eRef.combo) * levelMult);

              eRef.timeLeft += TIME_PER_HIT;

              const rawLevel = (eRef.score / POINTS_PER_LEVEL) + 1;
              eRef.level = Math.max(eRef.level, rawLevel);
              bestLevelRunRef.current = Math.max(bestLevelRunRef.current, eRef.level);

              drillAudio.playHit();
              createExplosion(targetX, targetY, '#00ff88');
              createHitMarker(ch.x, ch.y);
              setUiScore(eRef.score);

              eRef.target.isExposed = false;
              const nextConfig = getLevelConfig(eRef.level, eRef.combo);
              eRef.nextExposeTime = performance.now() + (nextConfig.idleMin + Math.random() * (nextConfig.idleMax - nextConfig.idleMin));
            } else {
              // MISS FAILURE
              eRef.missedClicks++;
              if (drillPenalty.isEnabled()) eRef.timeLeft -= TIME_PENALTY;
              eRef.combo = 0;
              eRef.screenShake = 8;
              triggerFlash();
              drillAudio.playPenalty();
              createExplosion(ch.x, ch.y, '#ef4444');
            }
          }

          const totalAttempts = eRef.successfulHits + eRef.missedClicks + eRef.preFires + eRef.timeouts;
          setUiAccuracy(totalAttempts > 0 ? Math.round((eRef.successfulHits / totalAttempts) * 100) : 100);
        }
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, [gameState, pointerLocked, triggerFlash, resumeDrill]);

  // Main Physics & Canvas Render Loop
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
            
            bCtx.strokeStyle = 'rgba(0, 255, 136, 0.04)';
            bCtx.lineWidth = 1;
            const cx = w / 2, cy = h / 2;
            bCtx.beginPath();
            bCtx.arc(cx, cy, 80, 0, Math.PI * 2);
            bCtx.arc(cx, cy, 160, 0, Math.PI * 2);
            bCtx.arc(cx, cy, 240, 0, Math.PI * 2);
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

        if (!e.target.isExposed && time >= e.nextExposeTime && (time - e.lastClickTime) >= SPAM_CALM_WINDOW) {
          spawnTargetExposure(time, e.level, e.combo);
        }

        if (e.target.isExposed) {
          const age = time - e.target.exposeStartTime;

          if (drillTimeout.isEnabled() && age >= e.target.flashWindow) {
            e.target.isExposed = false;

            if (!e.target.isFeint) {
              e.timeouts++;
              if (drillPenalty.isEnabled()) e.timeLeft -= TIME_PENALTY;
              e.combo = 0;
              e.screenShake = 8;
              triggerFlash();
              drillAudio.playPenalty();
              createExplosion(w / 2, h / 2, '#ef4444');

              const totalAttempts = e.successfulHits + e.missedClicks + e.preFires + e.timeouts;
              setUiAccuracy(totalAttempts > 0 ? Math.round((e.successfulHits / totalAttempts) * 100) : 100);
            }

            const config = getLevelConfig(e.level, e.combo);
            e.nextExposeTime = time + (config.idleMin + Math.random() * (config.idleMax - config.idleMin));
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
        const config = getLevelConfig(e.level, e.combo);
        const r = config.targetRadius;
        const cx = w / 2;
        const cy = h / 2;
        const t = e.target;

        if (t.isExposed) {
          const age = time - t.exposeStartTime;
          const progress = Math.min(1, age / t.flashWindow);

          if (t.isFeint) {
            ctx.globalAlpha = 0.35;
            ctx.fillStyle = '#00ff88';
            ctx.beginPath(); ctx.arc(cx, cy, r * 0.85, 0, Math.PI * 2); ctx.fill();
            ctx.globalAlpha = 1.0;
          } else {
            const lifePercent = 1 - progress;
            const targetColor = e.combo >= 10 ? '#38bdf8' : '#00ff88';
            const ringColor = lifePercent > 0.5 ? targetColor : (lifePercent > 0.25 ? '#eab308' : '#ef4444');

            drawPulseRing(ctx, cx, cy, r, targetColor, progress);
            drawTacticalTarget(ctx, cx, cy, r, ringColor, true);
          }
        } else {
          ctx.fillStyle = '#1e293b';
          ctx.beginPath(); ctx.arc(cx, cy, r * 0.7, 0, Math.PI * 2); ctx.fill();
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
          ctx.lineWidth = 1.5; ctx.stroke();
        }
      }

      for (let i = e.particles.length - 1; i >= 0; i--) {
        const p = e.particles[i];
        p.x += p.vx; p.y += p.vy; p.life -= dt * 2.5;
        if (p.life <= 0) { e.particles.splice(i, 1); continue; }
        ctx.globalAlpha = p.life; ctx.fillStyle = p.color; ctx.fillRect(p.x, p.y, 3, 3);
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
        ctx.beginPath(); ctx.arc(ch.x, ch.y, 16, 0, Math.PI * 2); ctx.stroke();

        ctx.lineWidth = 1.5;
        const gap = 6;
        ctx.beginPath();
        ctx.moveTo(ch.x, ch.y - 16); ctx.lineTo(ch.x, ch.y - gap);
        ctx.moveTo(ch.x, ch.y + 16); ctx.lineTo(ch.x, ch.y + gap);
        ctx.moveTo(ch.x - 16, ch.y); ctx.lineTo(ch.x - gap, ch.y);
        ctx.moveTo(ch.x + 16, ch.y); ctx.lineTo(ch.x + gap, ch.y);
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
  }, [gameState, pointerLocked, spawnTargetExposure, endGame, triggerFlash]);

  const shareScore = useCallback(async () => {
    const url = 'https://skilldrills.online/drills/fps/instant-response';
    try {
      const canvas = generateShareCard({
        score: uiScore,
        bestScore,
        accuracy: analytics.accuracy,
        bestCombo: analytics.maxCombo,
        rating: { letter: analytics.grade?.letter || 'C', label: analytics.grade?.label || 'Keep Going', emoji: '🎯' },
        newBest: isNewBest,
        drillName: 'Instant Response Pro',
        playerName: getPlayerName(),
      });
      await shareScoreCard(url, canvas);
    } catch (e) {
      const text = `🎯 I scored ${uiScore} PTS (Level ${analytics.finalLevel}) on Instant Response Pro! Accuracy: ${analytics.accuracy}%. Test your reflexes at skilldrills.online!`;
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
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              INSTANT RESPONSE PRO
              <span data-seo-kw="1" className="block text-sm font-semibold text-slate-400 mt-1 normal-case tracking-normal">
                FPS Reaction Time Test
              </span>
            </h1>
          </div>
        )}

        {/* Live Stat Cards */}
        {!isFullscreen && (
          <div className="grid grid-cols-4 gap-2.5 max-w-2xl mx-auto w-full">
            <div className="bg-[#0d0d18] border border-white/5 rounded-xl p-2.5 text-center">
              <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Score</div>
              <div className="text-lg sm:text-xl font-black text-emerald-400 tabular-nums">{uiScore}</div>
            </div>
            <div className="bg-[#0d0d18] border border-white/5 rounded-xl p-2.5 text-center">
              <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Time</div>
              <div className={`text-lg sm:text-xl font-black tabular-nums ${uiTimeLeft <= 10 ? "text-red-400 animate-pulse" : "text-white"}`}>{uiTimeLeft}s</div>
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
          className={`overflow-hidden flex flex-col transition-all duration-150 select-none bg-[#080811] text-white border border-white/10 ${
            isFullscreen 
              ? "fixed inset-0 z-[100] w-screen h-[100dvh] bg-[#080811] rounded-none border-none flex flex-col items-center justify-center" 
              : "w-full rounded-2xl bg-[#080811] aspect-video min-h-[460px] sm:min-h-[500px] max-h-[88vh] relative overflow-hidden flex flex-col"
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
                <p className={`text-2xl sm:text-3xl font-bold tabular-nums leading-tight ${uiTimeLeft <= 10 ? "text-red-400" : "text-white"}`}>{uiTimeLeft}s</p>
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
                <AlertCircle className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
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
              icon={Target}
              accent="emerald"
              title="Instant Response Pro"
              subtitle="Visual Reaction Latency & Reflex • Endless Level Progression"
              rules={[
                { icon: Target, accent: "emerald", title: "Objective (+100 PTS)", text: "Click flash stimulus as fast as possible" },
                { icon: AlertCircle, accent: "red", title: "Failure Rule", text: penaltyEnabled ? "Pre-fire / Miss / Timeout → Combo Reset, -0.8s" : "Pre-fire / Miss / Timeout → Combo Reset" },
              ]}
              stats={[
                { icon: Trophy, label: "Best Score", value: bestScore, color: "text-white", accent: "slate" },
                { icon: Flame, label: "Best Combo", value: `${bestCombo}x`, color: "text-emerald-400", accent: "emerald" },
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

          {/* END SCREEN — universal card, shared by every drill */}
          {gameState === 'gameOver' && analytics.grade && (
            <DrillResultCard
              accent="emerald"
              grade={analytics.grade}
              score={uiScore}
              isNewBest={isNewBest}
              stats={[
                { value: analytics.accuracy, suffix: "%", label: "Accuracy" },
                { value: analytics.avgReactionMs, suffix: "ms", label: "Avg Reaction" },
                { value: `${analytics.maxCombo}x`, label: "Max Combo" },
                { value: `Lv. ${analytics.finalLevel}`, label: "Peak Level" },
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {RULES_ITEMS.map((item, i) => (
                  <RuleItem key={i} num={item.num} text={item.text} highlight={item.highlight} result={item.result} />
                ))}
              </div>
            </DrillAccordion>

            <DrillAccordion
              id="about"
              title="About Instant Response Pro"
              isOpen={openAccordion === 'about'}
              onToggle={() => setOpenAccordion(openAccordion === 'about' ? null : 'about')}
            >
              <div className="space-y-8">
                <section>
                  <h4 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                    <Eye className="w-4 h-4 text-emerald-400" /> What Is Instant Response Training?
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
                      <section.icon className="w-4 h-4 text-emerald-400" /> {section.title}
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