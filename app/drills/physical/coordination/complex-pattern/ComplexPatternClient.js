'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';

import {
  Activity, AlertCircle, ArrowRight, ChevronRight, Crosshair,
  Eye, GraduationCap, Play, RefreshCw, Target,
  Timer, TrendingUp, Trophy, Volume2, VolumeX,
  Zap, Users, Share2, Sliders, Flame,
  LogOut, Award, ShieldAlert, BarChart3, Info, Lightbulb, Move, GitBranch
} from 'lucide-react';

import generateShareCard, { shareScoreCard } from '../../../../../components/ShareScoreCard';
import { getPlayerName } from '../../../../../lib/leaderboard';
import { drillAudio } from '../../../../../lib/drillAudio';
import { MAX_LEVEL, getStartLevel, getNextLevel, getDifficultyProgress, getComboBonusLevel } from '../../../../../lib/drillDifficulty';
import { getComboMultiplier, getFpsScoreGrade } from '../../../../../lib/scoringEngine';
import { createBackdropCache, getCanvasDpr } from '../../../../../lib/canvasFx';
import useUnexpectedExitGuard from '../../../../../lib/useUnexpectedExitGuard';
import DrillFooter from '../../../../../components/drill/DrillFooter';
import DrillCountdown from '../../../../../components/drill/DrillCountdown';
import DrillAccordion from '../../../../../components/drill/DrillAccordion';
import FpsStartCard from '../../../../../components/drill/FpsStartCard';

// ============================================================
// TUNING CONSTANTS
// ============================================================
const DRILL_DURATION = 45; // Fixed 45 seconds duration
const POINTS_PER_LEVEL = 250; // Aggressive progression threshold
const ELITE_SCORE = 17000; // Target score for S grade
const STORAGE_KEY = 'skilldrills_physical_complex_pattern_v3';

const getSavedData = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const oldBest = localStorage.getItem('complexPattern_bestScore');
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
  { title: "Pattern Memorization", text: "Study the multi-node vector geometric path flashed on screen before it vanishes." },
  { title: "Vector Tracing", text: "Click and drag your crosshair from the cyan start node to the magenta end node to recreate the pattern." },
  { title: "Accuracy Threshold", text: "Achieve the required path similarity percentage to successfully complete the pattern and build combo." },
  { title: "Streak Reset", text: "Failing to hit accuracy requirements resets your combo multiplier back to 1.0x." }
];

const ABOUT_TEXT = `Complex Pattern Pro tests spatial working memory, visual geometry retention, and fine vector control under extreme cognitive load. Players memorize intricate multi-waypoint geometric paths before tracing them from memory.

As your score increases, the level scales up to Level 15+. Waypoint count increases from 3 up to 8 nodes, memorization flash duration shortens to 0.6 seconds, and patterns include complex spirals, zig-zags, and rotations.

Successfully recreating patterns builds massive combo multipliers across a fixed 45-second session without negative score penalties.`;

const FAQ_ITEMS = [
  { q: "What is Complex Pattern Pro?", a: "Complex Pattern Pro is a physical coordination & visual memory drill testing spatial geometry retention and mouse tracing accuracy. Players memorize multi-node patterns flashed briefly on canvas and reproduce them accurately." },
  { q: "How do pattern tracing controls work?", a: "During the drawing phase, click and drag from the cyan start node through all waypoints to the magenta end node. Releasing mouse click submits your drawn trajectory for similarity evaluation." },
  { q: "Does this drill improve gaming performance?", a: "Yes. Retaining spatial geometry and executing fine cursor sweeps trains the visual cortex and motor precision needed for recoil control patterns, crosshair placement, and rapid gesture commands." },
  { q: "How does difficulty scaling work?", a: "As you score points, your level rises up to Level 15. Node count increases from 3 up to 8, memorization time drops from 2.0s to 0.6s, and required similarity accuracy increases." },
  { q: "Are there penalties for missing a pattern?", a: "No. Failing to achieve the required accuracy percentage resets your combo streak to 1.0x, but does not deduct points or reduce your 45-second timer." },
  { q: "How long does each session run?", a: "Each session runs for a fixed 45 seconds to provide a standard, reproducible performance benchmark." },
  { q: "What is a good score in Complex Pattern Pro?", a: "Scoring 8,000+ points earns a Gold or Platinum grade, while reaching 17,000+ points with 85%+ average accuracy places you in the Master tier." },
  { q: "Do I need special hardware to practice this drill?", a: "No special hardware is required. Any standard computer mouse with 1:1 raw input support works ideally with our pointer lock system." },
  { q: "Is this drill free to play?", a: "Yes, Complex Pattern Pro on SkillDrills is 100% free, ad-free, and runs entirely in your web browser with zero downloads." },
  { q: "How often should I practice daily?", a: "Practicing 5 to 10 minutes daily is recommended for optimal neuromuscular adaptation and spatial working memory development." }
];

const RELATED_DRILLS = [
  { id: "quick-dodge", name: "Reflex Game Online (Quick Dodge)", cat: "Reflex Training", desc: "Evade dynamic homing obstacles with fluid cursor agility.", href: "/drills/physical/reflex-training/quick-dodge" },
  { id: "reaction-chain", name: "Reaction Chain Pro", cat: "Reflex Training", desc: "Train precision stopping and impulse arrest on incoming targets.", href: "/drills/physical/reflex-training/reaction-chain" },
  { id: "jump-sequence", name: "Jump Sequence Pro", cat: "Physical Fitness", desc: "Vertical trajectory & mid-air steering exercise.", href: "/drills/physical/fitness/jump-sequence" },
  { id: "agility-ladder", name: "Motor Sequencing (Agility Ladder)", cat: "Physical Fitness", desc: "Master bilateral motor sequencing and rhythmic mouse sweeps.", href: "/drills/physical/fitness/agility-ladder" },
  { id: "cross-body-movement", name: "Cross-Body Movement", cat: "Physical Coordination", desc: "Improve bilateral motor coordination and cross-body tracking.", href: "/drills/physical/coordination/cross-body-movement" },
  { id: "dynamic-grid-evasion", name: "Dynamic Grid Evasion", cat: "Physical Coordination", desc: "Evade dynamic grid hazards with rapid motor adjustments.", href: "/drills/physical/coordination/dynamic-grid-evasion" }
];

// Difficulty parameters formula driven by drillDifficulty
const getLevelConfig = (level, combo = 0) => {
  const p = getDifficultyProgress(level); // 0 -> 1 across L1..L15
  const heat = Math.min(1.0, combo / 50);

  return {
    numNodes: Math.min(8, Math.round(3 + p * 5)),            // 3 -> 8 nodes
    memorizeTime: Math.max(0.6, 2.0 - p * 1.4),              // 2.0s -> 0.6s
    requiredAccuracy: Math.min(85, Math.round(50 + p * 35)), // 50% -> 85%
    basePoints: Math.round(15 + p * 45)                      // 15 -> 60
  };
};

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function ComplexPatternClient() {
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
  const [bestScore, setBestScore] = useState(0);
  const [bestCombo, setBestCombo] = useState(0);
  const [bestLevel, setBestLevel] = useState(1);
  const [isNewBest, setIsNewBest] = useState(false);

  const [analytics, setAnalytics] = useState({
    accuracy: 100, sequencesCleared: 0, missedSequences: 0,
    peakSpeed: 100, maxCombo: 0, finalLevel: 1, grade: null
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
    score: 0, level: 1, combo: 1.0, streak: 0, bestStreak: 0, timeLeft: DRILL_DURATION,
    targetPattern: [],
    userDrawing: [],
    isDrawing: false,
    phase: 'memorize', // 'memorize' | 'draw' | 'result'
    phaseTimer: 0,
    patternsCompleted: 0, misses: 0, totalAccuracySum: 0, totalAttempts: 0,
    particles: [], screenShake: 0,
    logicalWidth: 800, logicalHeight: 450, peakSpeed: 100
  });

  const cmPer360 = (30 / universalSens).toFixed(1);

  const triggerFlash = useCallback((color = 'red') => {
    const id = Date.now() + Math.random();
    setFlashes((f) => [...f, { id, color }]);
    setTimeout(() => setFlashes((f) => f.filter((x) => x.id !== id)), 480);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
      const isTouchCapable = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      setIsTouchOnlyDevice(isTouchCapable && !hasFinePointer);

      try {
        const savedSens = localStorage.getItem('complexPattern_sens');
        if (savedSens) setUniversalSens(parseFloat(savedSens));
      } catch (e) {}

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

  useEffect(() => {
    if (gameState !== 'playing') {
      try { localStorage.setItem('complexPattern_sens', universalSens.toString()); } catch (e) {}
    }
    drillAudio.setEnabled(soundEnabled);
  }, [universalSens, gameState, soundEnabled]);

  useEffect(() => {
    const handleFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const generatePattern = useCallback((w, h, level) => {
    const cfg = getLevelConfig(level, 0);
    const count = cfg.numNodes;
    const pattern = [];
    const padding = 100;

    const isSpiral = level >= 4 && Math.random() > 0.6;
    const isZigZag = level >= 3 && Math.random() > 0.6 && !isSpiral;

    if (isSpiral) {
      const cx = w / 2; const cy = h / 2;
      let angle = Math.random() * Math.PI * 2;
      let radius = 35;
      for (let i = 0; i < count + 2; i++) {
        pattern.push({
          x: cx + Math.cos(angle) * radius,
          y: cy + Math.sin(angle) * radius,
          type: i === 0 ? 'start' : (i === count + 1 ? 'end' : 'waypoint')
        });
        angle += (Math.PI / 2) + 0.2;
        radius += 30;
      }
    } else if (isZigZag) {
      const startX = padding + Math.random() * (w * 0.2);
      const startY = padding + Math.random() * (h - padding * 2);
      const endX = w - padding - Math.random() * (w * 0.2);
      const stepX = (endX - startX) / (count + 1);

      let currentY = startY;
      let currentX = startX;

      for (let i = 0; i < count + 2; i++) {
        pattern.push({
          x: currentX,
          y: currentY,
          type: i === 0 ? 'start' : (i === count + 1 ? 'end' : 'waypoint')
        });
        currentX += stepX;
        currentY = currentY > h / 2 ? padding + Math.random() * 80 : h - padding - Math.random() * 80;
      }
    } else {
      pattern.push({ x: padding + Math.random() * (w - padding * 2), y: padding + Math.random() * (h - padding * 2), type: 'start' });
      for (let i = 0; i < count; i++) {
        pattern.push({ x: padding + Math.random() * (w - padding * 2), y: padding + Math.random() * (h - padding * 2), type: 'waypoint' });
      }
      pattern.push({ x: padding + Math.random() * (w - padding * 2), y: padding + Math.random() * (h - padding * 2), type: 'end' });
    }

    engine.current.targetPattern = pattern;
  }, []);

  const startNewPattern = useCallback((w, h, level, streak) => {
    const e = engine.current;
    const cfg = getLevelConfig(level, streak);

    generatePattern(w, h, level);
    e.phase = 'memorize';
    e.phaseTimer = cfg.memorizeTime;
    e.userDrawing = [];
    e.isDrawing = false;
  }, [generatePattern]);

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

  const createExplosion = (x, y, color) => {
    for (let i = 0; i < 14; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 5 + 1;
      engine.current.particles.push({ x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, life: 1.0, color });
    }
  };

  const calculatePathSimilarity = useCallback(() => {
    const e = engine.current;
    const cfg = getLevelConfig(e.level, e.streak);

    if (e.targetPattern.length === 0 || e.userDrawing.length < 2) {
      return { accurate: false, similarity: 0 };
    }

    const resamplePath = (path, numPoints) => {
      if (path.length < 2) return path;
      let tl = 0;
      const sl = [];
      for (let i = 1; i < path.length; i++) {
        const d = Math.hypot(path[i].x - path[i - 1].x, path[i].y - path[i - 1].y);
        sl.push(d);
        tl += d;
      }
      const r = [{ x: path[0].x, y: path[0].y }];
      const ss = tl / (numPoints - 1);
      let al = 0, si = 0;

      for (let i = 1; i < numPoints - 1; i++) {
        const td = i * ss;
        while (al + sl[si] < td && si < sl.length - 1) {
          al += sl[si];
          si++;
        }
        const rd = td - al;
        const slv = sl[si] || 1;
        const t = Math.min(1, Math.max(0, rd / slv));
        const p1 = path[si];
        const p2 = path[si + 1] || p1;
        r.push({ x: p1.x + (p2.x - p1.x) * t, y: p1.y + (p2.y - p1.y) * t });
      }
      r.push({ x: path[path.length - 1].x, y: path[path.length - 1].y });
      return r;
    };

    const tr = resamplePath(e.targetPattern, 100);
    const dr = resamplePath(e.userDrawing, 100);

    let userToTargetSum = 0;
    for (let i = 0; i < dr.length; i++) {
      let minDist = Infinity;
      for (let j = 0; j < tr.length; j++) {
        const d = Math.hypot(dr[i].x - tr[j].x, dr[i].y - tr[j].y);
        if (d < minDist) minDist = d;
      }
      userToTargetSum += minDist;
    }
    const avgDev = userToTargetSum / dr.length;

    let targetToUserSum = 0;
    for (let i = 0; i < tr.length; i++) {
      let minDist = Infinity;
      for (let j = 0; j < dr.length; j++) {
        const d = Math.hypot(tr[i].x - dr[j].x, tr[i].y - dr[j].y);
        if (d < minDist) minDist = d;
      }
      targetToUserSum += minDist;
    }
    const avgCoverage = targetToUserSum / tr.length;

    const overallAvgError = (avgDev + avgCoverage) / 2;
    let sim = Math.max(0, 100 - overallAvgError);

    const sd = Math.hypot(e.targetPattern[0].x - e.userDrawing[0].x, e.targetPattern[0].y - e.userDrawing[0].y);
    const ed = Math.hypot(
      e.targetPattern[e.targetPattern.length - 1].x - e.userDrawing[e.userDrawing.length - 1].x,
      e.targetPattern[e.targetPattern.length - 1].y - e.userDrawing[e.userDrawing.length - 1].y
    );

    if (sd > 45 || ed > 45) {
      sim *= 0.5;
    }

    const acc = sim >= cfg.requiredAccuracy && sd <= 45 && ed <= 45;
    return { accurate: acc, similarity: sim };
  }, []);

  const submitDrawing = useCallback((w, h) => {
    const e = engine.current;
    const cfg = getLevelConfig(e.level, e.streak);
    const result = calculatePathSimilarity();

    e.totalAttempts++;
    e.totalAccuracySum += result.similarity;

    if (result.accurate) {
      e.patternsCompleted++;
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

      if (e.targetPattern.length > 0) {
        const lastP = e.targetPattern[e.targetPattern.length - 1];
        createExplosion(lastP.x, lastP.y, '#10b981');
      }

      triggerFlash('green');
      drillAudio.playHit();
    } else {
      e.misses++;
      e.streak = 0;
      e.combo = 1.0;
      e.screenShake = 16;

      triggerFlash('red');
      drillAudio.playPenalty();
    }

    e.phase = 'result';
    e.phaseTimer = 0.8;
  }, [calculatePathSimilarity, triggerFlash]);

  const endGame = useCallback(() => {
    gameActiveRef.current = false;
    startingRef.current = false;
    setGameState('gameOver');
    if (document.pointerLockElement) document.exitPointerLock();

    const e = engine.current;
    const avgAccPct = e.totalAttempts > 0 ? Math.round(e.totalAccuracySum / e.totalAttempts) : 100;
    const rating = getFpsScoreGrade(e.score, ELITE_SCORE);

    const grade = { letter: rating.grade, label: rating.label, color: rating.color };

    setAnalytics({
      accuracy: avgAccPct,
      sequencesCleared: e.patternsCompleted,
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
      score: 0, level: startLevel, combo: 1.0, streak: 0, bestStreak: 0, timeLeft: DRILL_DURATION,
      targetPattern: [], userDrawing: [], isDrawing: false, phase: 'memorize', phaseTimer: 0,
      patternsCompleted: 0, misses: 0, totalAccuracySum: 0, totalAttempts: 0,
      particles: [], screenShake: 0,
      logicalWidth: w, logicalHeight: h, peakSpeed: getLevelConfig(startLevel, 0).requiredAccuracy
    };

    startNewPattern(w, h, startLevel, 0);

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
      gameActiveRef.current = true;
      startingRef.current = false;
      setGameState('playing');
      if (canvasRef.current && !document.pointerLockElement && !isTouchOnlyDevice) {
        canvasRef.current.requestPointerLock().catch(() => {});
      }
    }, 2450);

    countdownTimeoutsRef.current = [t1, t2, t3, t4];
  }, [isTouchOnlyDevice, startNewPattern]);

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

      if (eng.isDrawing && eng.phase === 'draw') {
        eng.userDrawing.push({ x: eng.crosshair.x, y: eng.crosshair.y });
      }
    };

    const handleMouseDown = () => {
      if (!gameActiveRef.current) return;
      const eng = engine.current;
      if (eng.phase === 'draw' && eng.targetPattern.length > 0) {
        const startNode = eng.targetPattern[0];
        const dist = Math.hypot(eng.crosshair.x - startNode.x, eng.crosshair.y - startNode.y);
        if (dist <= 45) {
          eng.isDrawing = true;
          eng.userDrawing = [{ x: eng.crosshair.x, y: eng.crosshair.y }];
        }
      }
    };

    const handleMouseUp = () => {
      if (!gameActiveRef.current) return;
      const eng = engine.current;
      if (eng.isDrawing && eng.phase === 'draw') {
        eng.isDrawing = false;
        submitDrawing(eng.logicalWidth, eng.logicalHeight);
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
  }, [universalSens, gameState, isTouchOnlyDevice, handleExitDrill, submitDrawing]);

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

            bCtx.strokeStyle = 'rgba(168, 85, 247, 0.04)';
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

        // Handle phase transitions
        if (e.phase === 'memorize') {
          e.phaseTimer -= dt;
          if (e.phaseTimer <= 0) {
            e.phase = 'draw';
            e.userDrawing = [];
            e.isDrawing = false;
          }
        } else if (e.phase === 'result') {
          e.phaseTimer -= dt;
          if (e.phaseTimer <= 0) {
            startNewPattern(w, h, e.level, e.streak);
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
        // Render Pattern Lines & Nodes during Memorize or Result phase
        if (e.phase === 'memorize' || e.phase === 'result') {
          if (e.targetPattern.length > 1) {
            ctx.beginPath();
            ctx.moveTo(e.targetPattern[0].x, e.targetPattern[0].y);
            for (let i = 1; i < e.targetPattern.length; i++) {
              ctx.lineTo(e.targetPattern[i].x, e.targetPattern[i].y);
            }
            ctx.strokeStyle = e.phase === 'memorize' ? 'rgba(168, 85, 247, 0.7)' : 'rgba(16, 185, 129, 0.7)';
            ctx.lineWidth = 3;
            ctx.stroke();
          }

          // Draw Nodes
          for (let i = 0; i < e.targetPattern.length; i++) {
            const node = e.targetPattern[i];
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.type === 'start' || node.type === 'end' ? 14 : 9, 0, Math.PI * 2);
            let color = '#a855f7';
            if (node.type === 'start') color = '#06b6d4';
            if (node.type === 'end') color = '#ec4899';

            ctx.fillStyle = color;
            ctx.fill();
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 2;
            ctx.stroke();
          }
        }

        // Render Start / End hints during Draw phase
        if (e.phase === 'draw' && e.targetPattern.length > 0) {
          const startNode = e.targetPattern[0];
          const endNode = e.targetPattern[e.targetPattern.length - 1];

          // Start Node (Cyan)
          ctx.beginPath();
          ctx.arc(startNode.x, startNode.y, 14, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(6, 182, 212, 0.3)';
          ctx.fill();
          ctx.strokeStyle = '#06b6d4';
          ctx.lineWidth = 2.5;
          ctx.stroke();

          // End Node (Pink)
          ctx.beginPath();
          ctx.arc(endNode.x, endNode.y, 14, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(236, 72, 153, 0.3)';
          ctx.fill();
          ctx.strokeStyle = '#ec4899';
          ctx.lineWidth = 2.5;
          ctx.stroke();
        }

        // Render User Drawn Line
        if (e.userDrawing.length > 1) {
          ctx.beginPath();
          ctx.moveTo(e.userDrawing[0].x, e.userDrawing[0].y);
          for (let i = 1; i < e.userDrawing.length; i++) {
            ctx.lineTo(e.userDrawing[i].x, e.userDrawing[i].y);
          }
          ctx.strokeStyle = '#eab308';
          ctx.lineWidth = 3.5;
          ctx.stroke();
        }

        // Render Crosshair
        const ch = e.crosshair;
        if (ch.initialized) {
          let activeColor = pointerLocked ? '#a855f7' : '#ef4444';
          if (e.combo >= 2.0) activeColor = '#06b6d4';
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
  }, [gameState, endGame, startNewPattern]);

  const shareScore = useCallback(async () => {
    const url = 'https://skilldrills.online/drills/physical/coordination/complex-pattern';
    try {
      const canvas = generateShareCard({
        score: uiScore,
        bestScore,
        accuracy: analytics.accuracy,
        bestCombo: analytics.maxCombo,
        rating: { letter: analytics.grade?.letter || 'C', label: analytics.grade?.label || 'Keep Going', emoji: '🎯' },
        newBest: isNewBest,
        drillName: 'Complex Pattern Pro',
        playerName: getPlayerName(),
      });
      await shareScoreCard(url, canvas);
    } catch (e) {
      const text = `🎯 I scored ${uiScore} PTS (Level ${analytics.finalLevel}) on Complex Pattern Pro! Accuracy: ${analytics.accuracy}%. Test your spatial memory at skilldrills.online!`;
      if (typeof navigator !== 'undefined' && navigator.share) {
        navigator.share({ title: 'My Complex Pattern Score', text, url }).catch(() => {});
      } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
        navigator.clipboard.writeText(text);
        alert('Score card copied to clipboard!');
      }
    }
  }, [uiScore, bestScore, analytics, isNewBest]);

  return (
    <div className="min-h-screen bg-[#050508] text-white flex flex-col font-sans select-none">
      {/* ── HEADER / BREADCRUMB ── */}
      {!isFullscreen && (
        <header className="border-b border-white/5 bg-[#080811]/80 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <Link href="/drills/physical" className="hover:text-white transition-colors">Physical</Link>
              <span>/</span>
              <Link href="/drills/physical/coordination" className="hover:text-white transition-colors">Coordination</Link>
              <span>/</span>
              <span className="text-purple-400 font-medium">Complex Pattern Pro</span>
            </div>

            <button
              onClick={() => {
                const next = !soundEnabled;
                setSoundEnabled(next);
                drillAudio?.setEnabled?.(next);
              }}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
              title={soundEnabled ? "Mute Sound" : "Unmute Sound"}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
            </button>
          </div>
        </header>
      )}

      {/* ── MAIN CONTENT AREA ── */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6 flex flex-col gap-6">
        {/* Title */}
        {!isFullscreen && (
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight bg-gradient-to-r from-white via-slate-200 to-purple-400 bg-clip-text text-transparent uppercase">
              Complex Pattern Pro
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Spatial Working Memory &amp; Vector Tracing • 15 Levels
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
              <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Best Score</div>
              <div className="text-lg sm:text-xl font-black text-amber-400 tabular-nums">{bestScore}</div>
            </div>
            <div className="bg-[#0d0d18] border border-white/5 rounded-xl p-2.5 text-center">
              <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Best Combo</div>
              <div className="text-lg sm:text-xl font-black text-rose-400 tabular-nums">{bestCombo}x</div>
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
        >
          {/* DOM Flash Overlay */}
          {flashes.map((f) => (
            <div key={f.id} className={`fx-flash ${f.color === 'green' ? 'fx-flash-green' : 'fx-flash-red'}`} />
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
              {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
            </button>
          )}

          <canvas 
            ref={canvasRef} 
            className={`block absolute top-0 left-0 w-full h-full touch-none z-10 ${gameState === 'playing' ? 'cursor-none' : ''}`} 
          />

          {/* START MODAL */}
          {gameState === 'start' && (
            <FpsStartCard
              icon={GitBranch}
              accent="purple"
              title="Complex Pattern Pro"
              subtitle="Spatial Working Memory & Vector Tracing • 15 Levels"
              rules={[
                { icon: Target, accent: 'purple', title: 'Memorize Vector Path', text: 'Study multi-node geometric pattern shown briefly on canvas' },
                { icon: Zap, accent: 'emerald', title: 'Trace & Recreate', text: 'Click and drag from cyan start node to magenta end node' },
              ]}
              sensitivity={{ value: universalSens, onChange: setUniversalSens, cmPer360 }}
              stats={[
                { icon: Trophy, label: 'Best Score', value: bestScore, color: 'text-white', accent: 'slate' },
                { icon: Flame, label: 'Best Combo', value: `${bestCombo}x`, color: 'text-rose-400', accent: 'rose' },
                { icon: TrendingUp, label: 'Best Level', value: `Lv. ${bestLevel}`, color: 'text-blue-400', accent: 'blue' },
              ]}
              isTouchOnlyDevice={isTouchOnlyDevice}
              onStart={enterDrill}
            />
          )}

          {/* COUNTDOWN OVERLAY */}
          {gameState === 'countdown' && (
            <DrillCountdown value={countdownValue} subtitle="GET READY" accent="#a855f7" />
          )}

          {/* END SCREEN */}
          {gameState === 'gameOver' && analytics.grade && (
            <div className="absolute inset-0 z-40 flex bg-neutral-950/98 select-none font-sans" style={{ background: 'rgba(5,5,8,0.97)' }} onPointerDown={e => e.stopPropagation()}>
              
              {/* Left Grade Panel */}
              <div className="w-[36%] flex flex-col items-center justify-center gap-1 border-r border-white/5 px-4" style={{ background: 'radial-gradient(ellipse 260px 200px at 50% 30%, rgba(168,85,247,.12), transparent 70%)' }}>
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
                    <p className="text-[7.5px] sm:text-[8.5px] font-bold uppercase tracking-wider text-gray-400 mt-0.5">Avg Accuracy</p>
                  </div>
                  <div className="bg-black border border-white/5 p-2.5 rounded-xl text-center">
                    <p className="text-sm sm:text-base font-black text-white">{analytics.sequencesCleared}</p>
                    <p className="text-[7.5px] sm:text-[8.5px] font-bold uppercase tracking-wider text-gray-400 mt-0.5">Traced</p>
                  </div>
                  <div className="bg-black border border-white/5 p-2.5 rounded-xl text-center">
                    <p className="text-sm sm:text-base font-black text-white">{analytics.missedSequences}</p>
                    <p className="text-[7.5px] sm:text-[8.5px] font-bold uppercase tracking-wider text-gray-400 mt-0.5">Missed</p>
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
                    className="flex-1 py-3 rounded-[13px] bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xs uppercase tracking-wide cursor-pointer transition-transform active:scale-[0.98] shadow-md flex items-center justify-center gap-1.5"
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
              title="About Complex Pattern Pro"
              isOpen={openAccordion === 'about'}
              onToggle={() => setOpenAccordion(openAccordion === 'about' ? null : 'about')}
            >
              <div className="space-y-4">
                {ABOUT_TEXT.split('\n\n').map((para, i) => (
                  <p key={i} className="text-sm leading-relaxed text-gray-300">{para}</p>
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
                  <div key={i} className="bg-[#05060b] border border-gray-800 rounded-xl p-5">
                    <h4 className="text-sm font-bold text-gray-200 mb-2">{item.q}</h4>
                    <p className="text-xs text-gray-400 leading-relaxed">{item.a}</p>
                  </div>
                ))}
              </div>
            </DrillAccordion>
          </div>
        )}

        {/* ── RELATED PHYSICAL & REFLEX DRILLS ── */}
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
                  className="group bg-[#0c0c16] border border-white/5 hover:border-purple-500/40 rounded-xl p-3.5 transition-all duration-200 hover:-translate-y-0.5 flex flex-col justify-between"
                >
                  <div>
                    <div className="text-[10px] font-bold text-purple-400 uppercase tracking-wider mb-1">{drill.cat}</div>
                    <div className="text-xs font-bold text-white group-hover:text-purple-300 transition-colors">{drill.name}</div>
                    <div className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">{drill.desc}</div>
                  </div>
                  <div className="text-[10px] font-bold text-slate-500 group-hover:text-purple-400 mt-3 flex items-center gap-1 transition-colors">
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