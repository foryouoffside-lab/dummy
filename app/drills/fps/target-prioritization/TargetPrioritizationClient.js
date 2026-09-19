'use client';
import { isIdleFrameSkippable } from '@/lib/performance';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';

import {
  Activity, AlertCircle, ArrowRight, ChevronRight, Crosshair,
  Eye, GraduationCap, RefreshCw, Target,
  Timer, TrendingUp, Volume2, VolumeX,
  Share2, LogOut,
  Award, Users, Zap, ZapOff
} from 'lucide-react';

import generateShareCard, { shareScoreCard } from '../../../../components/ShareScoreCard';
import { getPlayerName } from '../../../../lib/leaderboard';
import { drillAudio } from '../../../../lib/drillAudio';
import { useDrillSensitivity } from '../../../../lib/drillSensitivity';
import { drillFlash } from '../../../../lib/drillFlash';
import { drillTimeout } from '../../../../lib/drillTimeout';
import { drillPenalty } from '../../../../lib/drillPenalty';
import { getStartLevel, getDifficultyProgress, ramp } from '../../../../lib/drillDifficulty';
import { getComboMultiplier, getFpsScoreGrade } from '../../../../lib/scoringEngine';
import { createBackdropCache, getCanvasDpr, drawPulseRing, drawTacticalTarget, createHitRing, drawHitRings } from '../../../../lib/canvasFx';
import DrillCountdown from '../../../../components/drill/DrillCountdown';
import DrillAccordion from '../../../../components/drill/DrillAccordion';
import FpsStartCard from '../../../../components/drill/FpsStartCard';
import DrillResultCard from '../../../../components/drill/DrillResultCard';
import useImmersiveMode from '@/lib/useImmersiveMode';
import useUnexpectedExitGuard from '@/lib/useUnexpectedExitGuard';

// ============================================================
// TUNING CONSTANTS
// ============================================================
const DRILL_DURATION = 45; // starting clock only; a run grows past this
const POINTS_PER_LEVEL = 1400; // 200 -> 1400 (7x)
const ELITE_SCORE = 54000; // 18000 -> 54000 (3x)
const TIME_PER_HIT = 0.4; // +0.4s on valid threat elimination
const TIME_PENALTY = 0.6; // opt-in on friendly fire, wrong priority, miss, or timeout
const STORAGE_KEY = 'skilldrills_fps_target_prioritization_v3';

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
    maxTargets: Math.min(4, Math.floor(2 + p * 1.8 + heat * 0.5)),
    spawnDelay: Math.max(400, ramp(1100, 500, p) * (1 - heat * 0.20)),
    redRatio: Math.min(0.65, 0.25 + p * 0.30 + heat * 0.10),
    greenRatio: Math.min(0.40, 0.20 + p * 0.15),
    yellowTtl: Math.max(1000, ramp(2400, 1400, p) * (1 - heat * 0.20)),
    redTtl: Math.max(1100, ramp(2200, 1400, p) * (1 - heat * 0.20)),
    speed: ramp(35, 130, p) * (1 + heat * 0.20)
  };
};

// ============================================================
// ACCORDION & RELATED DRILLS DATA
// ============================================================
const RULES_ITEMS = [
  { num: "1", text: "High Threat Target", highlight: "Red (+100 PTS / +0.4s)", result: "Must be eliminated first" },
  { num: "2", text: "Medium Threat Target", highlight: "Yellow (+50 PTS / +0.4s)", result: "Escalates to Red after timer" },
  { num: "3", text: "Friendly Unit", highlight: "Green (DO NOT SHOOT)", result: "Friendly hit, wrong target, or miss resets combo (-0.6s with Time Penalty enabled)" },
  { num: "4", text: "Level Progression", highlight: "+1 Level / 1400 PTS", result: "Continuous Dynamic Density & Speed" }
];

const ABOUT_INTRO = [
  "Target Prioritization is the cognitive ability to rapidly evaluate multiple targets on screen and decide which threat to shoot first based on urgency, danger level, and role.",
  "By repeatedly practicing threat assessment drills, players build cognitive discipline to ignore non-threat visual distractors and eliminate high-danger targets instantly under pressure."
];

const ABOUT_CARDS = [
  { icon: Users, iconBg: "bg-blue-600", title: "Who Should Use This?", text: "Tactical FPS players, entry fraggers, and IGLa facing multi-enemy site pushes in Valorant, CS2, and Rainbow Six Siege." },
  { icon: TrendingUp, iconBg: "bg-fuchsia-600", title: "Skills Trained", text: "Threat assessment, distractor suppression, impulse control, tactical decision speed, and target selection under cognitive load." },
  { icon: Zap, iconBg: "bg-orange-600", title: "Why It Is Harder", text: "Under adrenaline, the brain naturally defaults to shooting the first visual movement. This drill forces active visual confirmation before clicking." }
];

const ABOUT_SECTIONS = [
  {
    icon: Eye,
    title: "Why Players Shoot The Wrong Enemy",
    paragraphs: [
      "Most panic firing errors occur when visual filtering fails. Training distractor suppression conditions your brain to verify target status before firing, preventing friendly fire and wasted shots."
    ]
  },
  {
    icon: Target,
    title: "How Pros Prioritize Threats",
    paragraphs: [
      "Elite players scan with peripheral vision while maintaining central focus. They rank targets based on weapon lethality, positioning, and health to maximize round win percentage."
    ]
  }
];



// ============================================================
// MAIN COMPONENT
// ============================================================
export default function TargetPrioritizationClient({ copy = null }) {
  const [gameState, setGameState] = useState('start'); // 'start' | 'countdown' | 'playing' | 'gameOver'
  const [countdownValue, setCountdownValue] = useState(3);
  const [isFullscreen, setIsFullscreen] = useState(false);
  useImmersiveMode(isFullscreen); // locks the page behind while the drill fills the screen
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [flashEnabled, setFlashEnabled] = useState(true);
  const [penaltyEnabled, setPenaltyEnabled] = useState(false);
  const [pointerLocked, setPointerLocked] = useState(false);
  const [openAccordion, setOpenAccordion] = useState(null);
  const [isTouchOnlyDevice, setIsTouchOnlyDevice] = useState(false);
  
  const universalSens = useDrillSensitivity();

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
    accuracy: 100, redHits: 0, yellowHits: 0, friendlyFire: 0, expiredReds: 0, wrongPriority: 0,
    bestCombo: 0, levelReached: 1, grade: null
  });

  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  const lastTimeRef = useRef(DRILL_DURATION);
  const bestLevelRunRef = useRef(1);
  const backdropCacheRef = useRef(null);
  const countdownTimeoutsRef = useRef([]);
  const startingRef = useRef(false);

  const engine = useRef({
    crosshair: { x: 0, y: 0, initialized: false },
    targets: [],
    level: 1, score: 0, timeLeft: DRILL_DURATION,
    redHits: 0, yellowHits: 0, friendlyFire: 0, missedClicks: 0, wrongPriority: 0, expiredReds: 0,
    totalActions: 0, combo: 0, bestCombo: 0,
    particles: [], hitMarkers: [], hitRings: [], screenShake: 0, nextSpawnTime: 0,
    logicalWidth: 0, logicalHeight: 0
  });

  useEffect(() => {
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

  const triggerFlash = useCallback(() => {
    if (!drillFlash.isEnabled()) return;
    const id = Date.now() + Math.random();
    setFlashes((f) => [...f, { id }]);
    setTimeout(() => setFlashes((f) => f.filter((x) => x.id !== id)), 480);
  }, []);

  const spawnTarget = useCallback((width, height, currentLevel, currentCombo = 0) => {
    const cfg = getLevelConfig(currentLevel, currentCombo);
    const pad = 48;
    const rand = Math.random();

    let type = 'yellow';
    let radius = 22;
    if (rand < cfg.redRatio) {
      type = 'red';
      radius = 18;
    } else if (rand > 1 - cfg.greenRatio) {
      type = 'green';
      radius = 24;
    }

    const speed = cfg.speed;
    const angle = Math.random() * Math.PI * 2;

    return {
      id: Math.random(),
      type,
      x: pad + Math.random() * (width - pad * 2),
      y: pad + Math.random() * (height - pad * 2),
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      radius,
      age: 0
    };
  }, []);

  const createExplosion = useCallback((x, y, color) => {
    const e = engine.current;
    for (let i = 0; i < 14; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1.8 + Math.random() * 4.2;
      e.particles.push({ x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, life: 1.0, color });
    }
  }, []);

  const createHitMarker = useCallback((x, y) => {
    engine.current.hitMarkers.push({ x, y, life: 1.0 });
  }, []);

  const endGame = useCallback(() => {
    setGameState('gameOver');
    drillAudio.playSessionEnd();
    if (document.pointerLockElement) document.exitPointerLock();

    const e = engine.current;
    const totalCorrect = e.redHits + e.yellowHits;
    const finalAccuracy = e.totalActions > 0 ? Math.round((totalCorrect / e.totalActions) * 100) : 100;
    const peakLevel = Math.floor(bestLevelRunRef.current);
    const rating = getFpsScoreGrade(e.score, ELITE_SCORE);
    const grade = { letter: rating.grade, label: rating.label, color: rating.color };

    setAccuracy(finalAccuracy);
    setAnalytics({
      accuracy: finalAccuracy,
      redHits: e.redHits,
      yellowHits: e.yellowHits,
      friendlyFire: e.friendlyFire,
      expiredReds: e.expiredReds,
      wrongPriority: e.wrongPriority,
      bestCombo: e.bestCombo,
      levelReached: peakLevel,
      grade
    });

    const saved = getSavedData();
    const newBestScore = Math.max(saved.bestScore, e.score);
    const newBestCombo = Math.max(saved.bestCombo, e.bestCombo);
    const newBestLevel = Math.max(saved.bestLevel, peakLevel);
    const isNew = e.score > saved.bestScore;

    saveData({
      bestScore: newBestScore, 
      bestCombo: newBestCombo,
      bestLevel: newBestLevel,
      totalSessions: (saved.totalSessions || 0) + 1
    });

    if (isNew) setIsNewBest(true);
    setBestScore(newBestScore);
    setBestCombo(newBestCombo);
    setBestLevel(newBestLevel);
  }, []);

  const enterDrill = useCallback(async () => {
    if (startingRef.current) return;
    startingRef.current = true;

    drillAudio.init();
    drillAudio.playCountdownTick();

    setIsNewBest(false);
    setScore(0);
    setCombo(0);
    setAccuracy(100);
    setTimeLeft(DRILL_DURATION);
    lastTimeRef.current = DRILL_DURATION;

    const startLvl = getStartLevel();
    setLevel(startLvl);
    bestLevelRunRef.current = startLvl;

    const w = engine.current.logicalWidth || canvasRef.current?.width || 800;
    const h = engine.current.logicalHeight || canvasRef.current?.height || 600;

    engine.current = {
      crosshair: { x: w / 2, y: h / 2, initialized: true },
      targets: [],
      level: startLvl,
      score: 0,
      timeLeft: DRILL_DURATION,
      redHits: 0,
      yellowHits: 0,
      friendlyFire: 0,
      missedClicks: 0,
      wrongPriority: 0,
      expiredReds: 0,
      totalActions: 0,
      combo: 0,
      bestCombo: 0,
      particles: [],
      hitMarkers: [],
      hitRings: [],
      screenShake: 0,
      nextSpawnTime: 0,
      logicalWidth: w,
      logicalHeight: h
    };

    countdownTimeoutsRef.current.forEach(clearTimeout);
    countdownTimeoutsRef.current = [];

    setGameState('countdown');
    setCountdownValue(3);

    const t1 = setTimeout(() => { setCountdownValue(2); drillAudio.playCountdownTick(); }, 700);
    const t2 = setTimeout(() => { setCountdownValue(1); drillAudio.playCountdownTick(); }, 1400);
    const t3 = setTimeout(() => { setCountdownValue('GO'); drillAudio.playGo(); }, 2100);
    const t4 = setTimeout(() => {
      startingRef.current = false;
      setGameState('playing');
    }, 2450);

    countdownTimeoutsRef.current = [t1, t2, t3, t4];

    setIsFullscreen(true);
    if (canvasRef.current && !document.pointerLockElement) {
      try { await canvasRef.current.requestPointerLock(); } catch (e) {}
    }
  }, []);

  const handleExitDrill = useCallback(() => {
    markIntentionalExit();
    countdownTimeoutsRef.current.forEach(clearTimeout);
    countdownTimeoutsRef.current = [];
    startingRef.current = false;

    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    if (document.pointerLockElement) {
      try { document.exitPointerLock(); } catch (e) {}
    }
    if (document.fullscreenElement) {
      try { document.exitFullscreen(); } catch (e) {}
    }

    setIsFullscreen(false);
    setPointerLocked(false);
    setGameState('start');
    setScore(0);
    setCombo(0);
    setAccuracy(100);
    setTimeLeft(DRILL_DURATION);

    const w = engine.current?.logicalWidth || 800;
    const h = engine.current?.logicalHeight || 600;
    engine.current = {
      crosshair: { x: w / 2, y: h / 2, initialized: false },
      targets: [],
      level: 1, score: 0, timeLeft: DRILL_DURATION,
      redHits: 0, yellowHits: 0, friendlyFire: 0, missedClicks: 0, wrongPriority: 0, expiredReds: 0,
      totalActions: 0, combo: 0, bestCombo: 0,
      particles: [], hitMarkers: [], hitRings: [], screenShake: 0, nextSpawnTime: 0,
      logicalWidth: w, logicalHeight: h
    };
  }, []);

  const { markIntentionalExit } = useUnexpectedExitGuard({
    active: gameState === 'playing' || gameState === 'countdown',
    onUnexpectedExit: handleExitDrill,
  });

  // ESC key capture: immediately exit to start page from playing, countdown, or gameOver
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (gameState === 'playing' || gameState === 'countdown' || gameState === 'gameOver') {
          e.preventDefault();
          e.stopPropagation();
          handleExitDrill();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown, true);
    return () => window.removeEventListener('keydown', handleKeyDown, true);
  }, [gameState, handleExitDrill]);

  // Pointer lock change: if lock is dropped mid-game, exit cleanly to start page
  useEffect(() => {
    const handlePointerLockChange = () => {
      const isLocked = document.pointerLockElement === canvasRef.current;
      setPointerLocked(isLocked);
      if (!isLocked && (gameState === 'playing' || gameState === 'countdown')) {
        handleExitDrill();
      }
    };
    document.addEventListener('pointerlockchange', handlePointerLockChange);
    return () => document.removeEventListener('pointerlockchange', handlePointerLockChange);
  }, [gameState, handleExitDrill]);

  // Fullscreen change: if native fullscreen is closed mid-game, exit cleanly to start page
  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement && isFullscreen && (gameState === 'playing' || gameState === 'countdown')) {
        handleExitDrill();
      }
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, [isFullscreen, gameState, handleExitDrill]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if ((gameState !== 'playing' && gameState !== 'countdown') || !pointerLocked || !canvasRef.current) return;
      const ch = engine.current.crosshair;
      const sens = universalSens;
      const width = engine.current.logicalWidth || canvasRef.current.width;
      const height = engine.current.logicalHeight || canvasRef.current.height;
      ch.x = Math.max(0, Math.min(width, ch.x + e.movementX * sens));
      ch.y = Math.max(0, Math.min(height, ch.y + e.movementY * sens));
    };

    const handleMouseDown = (e) => {
      if (e.target.tagName === 'BUTTON' || e.target.closest('button')) return;
      if (!containerRef.current || !containerRef.current.contains(e.target)) return;
      if (gameState !== 'playing') return;
      if (!pointerLocked) return;

      const eRef = engine.current;
      eRef.totalActions++;
      const ch = eRef.crosshair;
      let clickedIndex = -1;

      for (let i = eRef.targets.length - 1; i >= 0; i--) {
        const t = eRef.targets[i];
        const dist = Math.hypot(ch.x - t.x, ch.y - t.y);
        if (dist <= t.radius + 6) {
          clickedIndex = i;
          break;
        }
      }

      if (clickedIndex !== -1) {
        const clickedTarget = eRef.targets[clickedIndex];
        eRef.targets.splice(clickedIndex, 1);
        createHitMarker(ch.x, ch.y);

        const activeReds = eRef.targets.some(t => t.type === 'red');

        if (clickedTarget.type === 'red') {
          eRef.redHits++;
          eRef.combo++;
          if (eRef.combo > eRef.bestCombo) eRef.bestCombo = eRef.combo;

          const baseScore = 100;
          const levelMult = 1 + getDifficultyProgress(eRef.level) * 0.5;
          const gained = Math.round(baseScore * getComboMultiplier(eRef.combo) * levelMult);
          eRef.score += gained;
          eRef.timeLeft += TIME_PER_HIT; // +0.4s

          const hitColor = eRef.combo >= 10 ? '#34d399' : '#ef4444';
          drillAudio.playHit();
          createExplosion(clickedTarget.x, clickedTarget.y, hitColor);
          eRef.hitRings.push(createHitRing(clickedTarget.x, clickedTarget.y, clickedTarget.radius, hitColor));
        } else if (clickedTarget.type === 'yellow') {
          if (activeReds) {
            eRef.wrongPriority++;
            if (drillPenalty.isEnabled()) eRef.timeLeft -= TIME_PENALTY;
            eRef.combo = 0;
            eRef.screenShake = 6;
            drillAudio.playPenalty();
            triggerFlash();
            createExplosion(clickedTarget.x, clickedTarget.y, '#eab308');
          } else {
            eRef.yellowHits++;
            eRef.combo++;
            if (eRef.combo > eRef.bestCombo) eRef.bestCombo = eRef.combo;

            const baseScore = 50;
            const levelMult = 1 + getDifficultyProgress(eRef.level) * 0.5;
            const gained = Math.round(baseScore * getComboMultiplier(eRef.combo) * levelMult);
            eRef.score += gained;
            eRef.timeLeft += TIME_PER_HIT; // +0.4s

            const hitColor = eRef.combo >= 10 ? '#34d399' : '#eab308';
            drillAudio.playHit();
            createExplosion(clickedTarget.x, clickedTarget.y, hitColor);
            eRef.hitRings.push(createHitRing(clickedTarget.x, clickedTarget.y, clickedTarget.radius, hitColor));
          }
        } else if (clickedTarget.type === 'green') {
          eRef.friendlyFire++;
          if (drillPenalty.isEnabled()) eRef.timeLeft -= TIME_PENALTY;
          eRef.combo = 0;
          eRef.screenShake = 12;
          drillAudio.playPenalty();
          triggerFlash();
          createExplosion(clickedTarget.x, clickedTarget.y, '#22c55e');
        }

        setScore(eRef.score);
        setCombo(eRef.combo);

        const rawLevel = (eRef.score / POINTS_PER_LEVEL) + 1;
        eRef.level = Math.max(eRef.level, rawLevel);
        bestLevelRunRef.current = Math.max(bestLevelRunRef.current, eRef.level);
        setLevel(Math.floor(eRef.level));
      } else {
        eRef.missedClicks++;
        if (drillPenalty.isEnabled()) eRef.timeLeft -= TIME_PENALTY;
        eRef.combo = 0;
        eRef.screenShake = 6;
        setCombo(0);
        drillAudio.playPenalty();
        triggerFlash();
        createExplosion(ch.x, ch.y, '#ef4444');
      }

      if (eRef.totalActions > 0) {
        const totalHits = eRef.redHits + eRef.yellowHits;
        setAccuracy(Math.round((totalHits / eRef.totalActions) * 100));
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, [gameState, pointerLocked, universalSens, createExplosion, createHitMarker, triggerFlash]);

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
            bCtx.strokeStyle = 'rgba(59, 130, 246, 0.04)';
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
      const dtMs = time - lastTime;
      lastTime = time;
      const dt = Math.min(dtMs / 1000, 0.1);
      const e = engine.current;
      const dpr = getCanvasDpr();
      const width = e.logicalWidth || cvs.width / dpr;
      const height = e.logicalHeight || cvs.height / dpr;
      const cfg = getLevelConfig(e.level, e.combo);

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

        if (time >= e.nextSpawnTime && e.targets.length < cfg.maxTargets) {
          e.targets.push(spawnTarget(width, height, e.level, e.combo));
          e.nextSpawnTime = time + cfg.spawnDelay;
        }

        for (let i = e.targets.length - 1; i >= 0; i--) {
          const t = e.targets[i];
          t.age += dtMs;

          if (t.type === 'yellow' && t.age >= cfg.yellowTtl) {
            t.type = 'red';
            t.age = 0;
            t.radius = 18;
          }

          if (t.type === 'red' && drillTimeout.isEnabled() && t.age >= cfg.redTtl) {
            e.expiredReds++;
            if (drillPenalty.isEnabled()) e.timeLeft -= TIME_PENALTY;
            e.combo = 0;
            e.screenShake = 8;
            setCombo(0);
            drillAudio.playPenalty();
            triggerFlash();
            e.targets.splice(i, 1);
            continue;
          }

          if (t.type === 'green' && t.age >= 3000) {
            e.targets.splice(i, 1);
            continue;
          }

          t.x += t.vx * dt;
          t.y += t.vy * dt;

          if (t.x - t.radius < 10) { t.x = 10 + t.radius; t.vx = Math.abs(t.vx); }
          else if (t.x + t.radius > width - 10) { t.x = width - 10 - t.radius; t.vx = -Math.abs(t.vx); }
          if (t.y - t.radius < 10) { t.y = 10 + t.radius; t.vy = Math.abs(t.vy); }
          else if (t.y + t.radius > height - 10) { t.y = height - 10 - t.radius; t.vy = -Math.abs(t.vy); }
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
        ctx.drawImage(backdropCacheRef.current, 0, 0, width, height);
      } else {
        ctx.fillStyle = '#050508';
        ctx.fillRect(0, 0, width, height);
      }

      if (gameState === 'playing' || gameState === 'start') {
        e.targets.forEach(t => {
          const targetColor = t.type === 'red' ? '#ef4444' : t.type === 'yellow' ? '#eab308' : '#22c55e';
          drawPulseRing(ctx, t.x, t.y, t.radius, targetColor, 0.4);
          drawTacticalTarget(ctx, t.x, t.y, t.radius, targetColor, true);
        });
      }

      for (let i = e.particles.length - 1; i >= 0; i--) {
        const p = e.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= dt * 2.5;
        if (p.life <= 0) { e.particles.splice(i, 1); continue; }
        ctx.globalAlpha = p.life; 
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }

      drawHitRings(ctx, e.hitRings, dt);

      ctx.lineWidth = 2;
      for (let i = e.hitMarkers.length - 1; i >= 0; i--) {
        const hm = e.hitMarkers[i];
        hm.life -= dt * 4.0;
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
      if (ch.initialized && (gameState === 'playing' || gameState === 'start' || gameState === 'countdown')) {
        ctx.save();
        ctx.shadowColor = 'rgba(0, 0, 0, 0.9)';
        ctx.shadowBlur = 3;
        ctx.fillStyle = '#ffffff';
        ctx.strokeStyle = '#ffffff';

        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(ch.x, ch.y, 16, 0, Math.PI * 2);
        ctx.stroke();

        const gap = 6;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(ch.x, ch.y - 16); ctx.lineTo(ch.x, ch.y - gap);
        ctx.moveTo(ch.x, ch.y + 16); ctx.lineTo(ch.x, ch.y + gap);
        ctx.moveTo(ch.x - 16, ch.y); ctx.lineTo(ch.x - gap, ch.y);
        ctx.moveTo(ch.x + 16, ch.y); ctx.lineTo(ch.x + gap, ch.y);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(ch.x, ch.y, 2, 0, Math.PI * 2);
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
  }, [gameState, pointerLocked, spawnTarget, triggerFlash, endGame]);

  const shareDrillLink = useCallback(async () => {
    const url = 'https://skilldrills.online/drills/fps/target-prioritization';
    try {
      const canvas = generateShareCard({
        score,
        bestScore,
        accuracy: analytics.accuracy,
        bestCombo: analytics.bestCombo,
        rating: { letter: analytics.grade?.letter || 'C', label: analytics.grade?.label || 'Keep Going', emoji: '🎯' },
        newBest: isNewBest,
        drillName: copy?.h1Keyword || 'Target Prioritization',
        playerName: getPlayerName(),
      });
      await shareScoreCard(url, canvas);
    } catch (e) {
      const text = `🎯 I scored ${score} PTS on Target Prioritization! Accuracy: ${analytics.accuracy}%. Master your threat assessment at skilldrills.online!`;
      if (typeof navigator !== 'undefined' && navigator.share) {
        navigator.share({ title: 'My Target Prioritization Score', text, url }).catch(() => {});
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
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              <span data-seo-kw="1">{copy?.h1Keyword || "Target Prioritization Aim Trainer"}</span>
              {copy?.h1Suffix || ""}
            </h1>
            <p className="text-sm text-slate-400 font-medium">
              {copy?.subtitle || "Train threat evaluation, cognitive filtering, and shot inhibition with real-time feedback."}
            </p>
          </div>
        )}

        {/* Live Stat Cards */}
        {!isFullscreen && (
          <div className="grid grid-cols-4 gap-2 w-full -mb-2">
            {[
              { label: copy?.statScore || "Score", val: score },
              { label: copy?.statTime || "Time", val: `${timeLeft}s`, highlight: timeLeft <= 10 },
              { label: copy?.statAccuracy || "Accuracy", val: `${accuracy}%`, color: "text-blue-400" },
              { label: copy?.statBestScore || "Best Score", val: bestScore, color: "text-amber-400" },
            ].map((s, i) => (
              <div key={i} className="border border-white/[0.06] bg-white/[0.015] px-2 py-2 rounded-xl text-center">
                <div className="text-[9px] sm:text-[10px] uppercase font-bold text-slate-500 tracking-wider mb-0.5">{s.label}</div>
                <div className={`text-xs sm:text-sm md:text-base font-black tabular-nums truncate ${s.highlight ? "text-red-400 animate-pulse" : s.color || "text-white"}`}>{s.val}</div>
              </div>
            ))}
          </div>
        )}

        {/* Game Stage Container */}
        <div 
          ref={containerRef} 
          onContextMenu={(e) => { if (gameState === 'playing' || gameState === 'countdown') e.preventDefault(); }}
          className={`overflow-hidden flex flex-col transition-all duration-150 select-none bg-[#080811] text-white ${
            isFullscreen 
              ? "fixed inset-0 z-[100] w-screen h-[100dvh] bg-[#050508] flex flex-col items-center justify-center" 
              : "w-full rounded-2xl aspect-video min-h-[460px] md:min-h-[500px] max-h-[88vh] max-md:portrait:aspect-[3/4] max-md:portrait:min-h-[420px] max-md:portrait:max-h-[76vh] max-md:landscape:min-h-[340px] max-md:landscape:max-h-[85vh] bg-[#080811] border border-white/10 relative overflow-hidden flex flex-col"
          }`}
          style={{ touchAction: (gameState === 'playing' || gameState === 'countdown') ? 'none' : 'auto' }}
        >
          {/* DOM Flash Overlay */}
          {flashes.map((f) => (
            <div key={f.id} className="fx-flash fx-flash-red" />
          ))}

          {/* IN-BOX OVERLAY HUD */}
          {(gameState === 'playing' || gameState === 'countdown') && (
            <>
              <div className="absolute top-4 left-4 z-30 pointer-events-none">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-white/50">{copy?.statScore || "Score"}</p>
                <p className="text-2xl sm:text-3xl font-bold text-white tabular-nums leading-tight">{score}</p>
              </div>
              <div className="absolute top-4 right-4 z-30 pointer-events-none text-right">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-white/50">{copy?.statTime || "Time"}</p>
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
                title={copy?.toggleFlash || "Toggle Miss Flash"}
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
                title={copy?.toggleSound || "Toggle Sound"}
              >
                {soundEnabled ? <Volume2 className="w-4 h-4 text-blue-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
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
              icon={Target}
              accent="indigo"
              title={copy?.startTitle || "Target Prioritization"}
              subtitle={copy?.startSubtitle || "Threat Assessment & Cognitive Filtering • Endless Level Progression"}
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
              accent="blue"
              grade={analytics.grade}
              score={score}
              isNewBest={isNewBest}
              stats={[
                { value: analytics.accuracy, suffix: "%", label: copy?.statAccuracy || "Accuracy" },
                { value: analytics.redHits + analytics.yellowHits, label: copy?.statThreatsCleared || "Threats Cleared" },
                { value: `${analytics.bestCombo}x`, label: copy?.statMaxCombo || "Max Combo" },
                { value: `Lv. ${analytics.levelReached}`, label: copy?.statPeakLevel || "Peak Level" },
              ]}
              onPlayAgain={enterDrill}
              onShare={shareDrillLink}
              onExit={handleExitDrill}
            />
          )}
        </div>

        {/* Stage Caption */}
        {!isFullscreen && (
          <p className="text-xs text-slate-400 leading-relaxed -mt-2">
            {copy?.stageCaption || "Eliminate highest-threat red targets first and intermediate yellow targets while holding fire on green friendlies."}
          </p>
        )}

        {/* ── ACCORDIONS ── */}
        {!isFullscreen && (
          <div className="[&>div]:!mt-0">
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
              title={copy?.aboutTitle || "About Target Prioritization"}
              isOpen={openAccordion === 'about'}
              onToggle={() => setOpenAccordion(openAccordion === 'about' ? null : 'about')}
            >
              <div className="space-y-8">
                <section>
                  <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                    <Crosshair className="w-4 h-4 text-blue-400" /> {copy?.aboutHeading || "What Is Target Prioritization?"}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-300 mb-3">
                    {copy?.aboutText || "Target prioritization is choosing which threat to shoot while holding fire on everything else. Stopping an action you have already started is its own process, racing the one that launched it (Logan & Cowan, 1984) — which is why cancelling a shot is harder than taking one."}
                  </p>
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
                        <h4 className="text-xs font-bold text-white">{card.title}</h4>
                      </div>
                      <p className="text-xs text-gray-300 leading-relaxed">{card.text}</p>
                    </div>
                  ))}
                </div>

                {ABOUT_SECTIONS.map((section, i) => (
                  <section key={i}>
                    <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                      <section.icon className="w-4 h-4 text-blue-400" /> {section.title}
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