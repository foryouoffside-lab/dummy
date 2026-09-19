'use client';
import { isIdleFrameSkippable } from '@/lib/performance';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';

import {
  Activity, Eye,
  Target, TrendingUp,
  Volume2, VolumeX, Zap, ZapOff,
  Users, Crosshair
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
import { createBackdropCache, getCanvasDpr, drawTacticalTarget, createHitRing, drawHitRings } from '../../../../lib/canvasFx';
import DrillCountdown from '../../../../components/drill/DrillCountdown';
import DrillAccordion from '../../../../components/drill/DrillAccordion';
import FpsStartCard from '../../../../components/drill/FpsStartCard';
import DrillResultCard from '../../../../components/drill/DrillResultCard';
import useImmersiveMode from '@/lib/useImmersiveMode';
import { useTranslation } from '@/lib/i18n/useTranslation';

// ============================================================
// TUNING CONSTANTS
// ============================================================
const DRILL_DURATION = 45; // starting clock only; a run grows past this
const POINTS_PER_LEVEL = 1400; // 200 -> 1400 (7x)
const ELITE_SCORE = 48000; // 16000 -> 48000 (3x)
const TIME_PER_HIT = 0.6; // +0.6s on confirmed hit
const TIME_PENALTY = 0.8; // opt-in on miss, pre-fire, or escape
const STORAGE_KEY = 'skilldrills_fps_angle_hold_v3';

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
    peekDuration: Math.max(220, ramp(1400, 420, p) * (1 - heat * 0.20)),
    targetRadius: Math.max(10, ramp(26, 12, p) * (1 - heat * 0.15)),
    peekDelayMin: Math.max(200, ramp(900, 350, p) * (1 - heat * 0.25)),
    peekDelayMax: Math.max(400, ramp(1600, 650, p) * (1 - heat * 0.25)),
    hitPad: Math.max(2, ramp(10, 4, p) * (1 - heat * 0.25)),
    fakePeekChance: p < 0.4 ? 0 : Math.min(0.35, (p - 0.4) * 0.45 + heat * 0.1),
    peekDistance: ramp(52, 24, p),
    verticalSpread: Math.min(0.48, 0.25 + p * 0.20)
  };
};

const getCornerMargin = (width) => Math.round(Math.max(70, Math.min(170, width * 0.19)));

// ============================================================
// ACCORDION DATA
// ============================================================
const RULES_ITEMS = [
  { num: "1", text: "Successful Peek Hit", highlight: "+100 PTS (+0.6s)", result: "×Combo Mult" },
  { num: "2", text: "Peeking Spawns", highlight: "Corner Outcrops", result: "Faster & Shorter" },
  { num: "3", text: "Level Progression", highlight: "+1 Level / 1400 PTS", result: "Adaptive Scaling" },
  { num: "4", text: "Miss / Pre-fire", highlight: "Failure Penalty", result: "Resets Combo (-0.8s)" }
];

const ABOUT_INTRO = [
  "Angle Hold Pro trains crosshair placement and pre-aim discipline, the defensive skill that decides most site-anchor duels in tactical FPS games like CS2, Valorant, and Rainbow Six Siege. A peeking opponent moves toward you and gets to see your position on their screen a fraction of a second before your screen updates with theirs — this latency gap is peeker's advantage. The only reliable counter is pre-aiming the exact pixel where an enemy's head will appear and firing the instant they cross that plane, rather than reacting and flicking after the fact.",
  "Each round spawns a target peeking out from either the left or right chokepoint at a random height and exposure duration, so you can't memorize a rhythm — every peek demands fresh pre-aim discipline. Exposure window and target size both shrink continuously as your score climbs, so the drill keeps pace with you instead of staying static once you've adapted to it."
];

const ABOUT_CARDS = [
  { icon: Users, iconBg: "bg-blue-600", title: "Who Should Use This?", text: "Valorant defenders holding site angles, CS2 players covering bomb site chokepoints, and Rainbow Six Siege anchors who need fast, disciplined passive-hold reactions against tight-angle peeks." },
  { icon: TrendingUp, iconBg: "bg-orange-600", title: "Skills Improved", text: "Crosshair-to-corner distance calibration, trigger discipline, peek reaction speed, and visual tracking of fast, variable-height peeks." },
  { icon: Zap, iconBg: "bg-purple-600", title: "Jiggle & Fake Peeks", text: "As difficulty escalates, targets execute fast bait swings that punish premature clicking, forcing you to confirm a real exposure before you fire." },
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
    title: "Continuous Dynamic Escalation",
    paragraphs: [
      "The difficulty curve tightens smoothly with level progression: exposure window shrinks, target radius drops, and peeks fire in tighter succession as your score climbs — mirroring high-stakes clutch rounds in competitive shooters."
    ]
  },
  {
    icon: Eye,
    title: "What The Drill Tracks",
    paragraphs: [
      "Average reaction time tells you how quickly your eyes and trigger finger convert a confirmed peek into a completed click. Max combo shows how consistently you land hits without a pre-fire or miss breaking your rhythm."
    ]
  }
];




// ============================================================
// MAIN COMPONENT
// ============================================================
export default function AngleHoldClient({ copy = null }) {
  const { t, locale } = useTranslation();
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
    reactionTimes: [], maxCombo: 0, particles: [], hitMarkers: [], hitRings: [], screenShake: 0,
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

  const handleExitDrill = useCallback(() => {
    countdownTimeoutsRef.current.forEach(clearTimeout);
    countdownTimeoutsRef.current = [];
    startingRef.current = false;
    gameActiveRef.current = false;

    setIsFullscreen(false);
    if (document.pointerLockElement) {
      document.exitPointerLock();
    }
    setGameState('start');
    setUiScore(0);
    setUiTimeLeft(DRILL_DURATION);
    lastTimeRef.current = DRILL_DURATION;
    setAnalytics({
      accuracy: 100, successfulHits: 0, missedClicks: 0, preFires: 0,
      targetsEscaped: 0, avgReactionMs: 0, maxCombo: 0, finalLevel: 1, grade: null
    });
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (gameState === 'playing' || gameState === 'countdown') {
          e.preventDefault();
          e.stopPropagation();
          handleExitDrill();
        }
      }
    };

    const handleLockChange = () => {
      const isLocked = document.pointerLockElement === canvasRef.current;
      setPointerLocked(isLocked);
      if (!isLocked && (gameState === 'playing' || gameState === 'countdown')) {
        handleExitDrill();
      }
    };

    const handleFullscreenChange = () => {
      if (!document.fullscreenElement && isFullscreen && (gameState === 'playing' || gameState === 'countdown')) {
        handleExitDrill();
      }
    };

    window.addEventListener('keydown', handleKeyDown, true);
    document.addEventListener('pointerlockchange', handleLockChange);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      window.removeEventListener('keydown', handleKeyDown, true);
      document.removeEventListener('pointerlockchange', handleLockChange);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [gameState, isFullscreen, handleExitDrill]);

  const spawnPeekTarget = useCallback((time, width, height, currentLevel, currentCombo = 0) => {
    const e = engine.current;
    const config = getLevelConfig(currentLevel, currentCombo);
    
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
    for (let i = 0; i < 14; i++) {
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
    const peakLevel = Math.floor(bestLevelRunRef.current);

    const rating = getFpsScoreGrade(e.score, ELITE_SCORE);
    const grade = { letter: rating.grade, label: rating.label, color: rating.color };

    setAnalytics({
      accuracy: finalAccuracy, successfulHits: e.successfulHits, missedClicks: e.missedClicks,
      preFires: e.preFires, targetsEscaped: e.targetsEscaped, avgReactionMs: avgRt,
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

    countdownTimeoutsRef.current.forEach(clearTimeout);
    countdownTimeoutsRef.current = [];

    drillAudio.init();

    setIsNewBest(false);
    setUiScore(0);
    setUiTimeLeft(DRILL_DURATION);
    lastTimeRef.current = DRILL_DURATION;

    const startLevel = getStartLevel();
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
      particles: [], hitMarkers: [], hitRings: [], screenShake: 0, logicalWidth: w, logicalHeight: h
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

      if (gameState === 'playing' && pointerLocked) {
        const eRef = engine.current;
        const ch = eRef.crosshair;
        const tgt = eRef.target;
        const config = getLevelConfig(eRef.level, eRef.combo);

        eRef.totalShots++;

        if (!tgt.active) {
          eRef.preFires++;
          if (drillPenalty.isEnabled()) eRef.timeLeft -= TIME_PENALTY;
          eRef.combo = 0;
          eRef.screenShake = 6;
          triggerFlash();
          drillAudio.playPenalty();
        } else {
          const dist = Math.hypot(ch.x - tgt.x, ch.y - tgt.y);

          if (dist <= config.targetRadius + config.hitPad) {
            if (tgt.isFake) {
              eRef.preFires++;
              if (drillPenalty.isEnabled()) eRef.timeLeft -= TIME_PENALTY;
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
              eRef.timeLeft += TIME_PER_HIT; // +0.6s

              const rawLevel = (eRef.score / POINTS_PER_LEVEL) + 1;
              eRef.level = Math.max(eRef.level, rawLevel);
              bestLevelRunRef.current = Math.max(bestLevelRunRef.current, eRef.level);

              drillAudio.playHit();
              const hitColor = eRef.combo >= 10 ? '#34d399' : '#10b981';
              createExplosion(tgt.x, tgt.y, hitColor);
              eRef.hitRings.push(createHitRing(tgt.x, tgt.y, config.targetRadius, hitColor));
              createHitMarker(ch.x, ch.y);
              setUiScore(eRef.score);
            }

            tgt.active = false;
            const nextConfig = getLevelConfig(eRef.level, eRef.combo);
            eRef.nextPeekTime = performance.now() + (nextConfig.peekDelayMin + Math.random() * (nextConfig.peekDelayMax - nextConfig.peekDelayMin));
          } else {
            eRef.missedClicks++;
            if (drillPenalty.isEnabled()) eRef.timeLeft -= TIME_PENALTY;
            eRef.combo = 0;
            eRef.screenShake = 6;
            triggerFlash();
            drillAudio.playPenalty();
            createExplosion(ch.x, ch.y, '#ef4444');
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
  }, [gameState, pointerLocked, universalSens, triggerFlash]);

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
          spawnPeekTarget(time, w, h, e.level, e.combo);
        }

        if (e.target.active) {
          const tgt = e.target;
          const config = getLevelConfig(e.level, e.combo);
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
              if (drillPenalty.isEnabled()) e.timeLeft -= TIME_PENALTY;
              e.combo = 0;
              e.screenShake = 6;
              triggerFlash();
              drillAudio.playPenalty();
              createExplosion(tgt.x, tgt.y, '#ef4444');
            }

            const nextConfig = getLevelConfig(e.level, e.combo);
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
        const config = getLevelConfig(e.level, e.combo);
        const targetColor = tgt.isFake ? '#f97316' : (e.combo >= 10 ? '#34d399' : '#10b981');

        drawTacticalTarget(ctx, tgt.x, tgt.y, config.targetRadius, targetColor, true);
      }

      drawHitRings(ctx, e.hitRings, dt);

      for (let i = e.particles.length - 1; i >= 0; i--) {
        const p = e.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= dt * 2.5;
        if (p.life <= 0) {
          e.particles.splice(i, 1);
          continue;
        }
        ctx.globalAlpha = Math.max(0, p.life);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1.0;

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
        const activeColor = '#ffffff';
        ctx.save();
        ctx.shadowColor = 'rgba(0, 0, 0, 0.9)';
        ctx.shadowBlur = 3;
        ctx.strokeStyle = activeColor;
        ctx.fillStyle = activeColor;

        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(ch.x, ch.y, 14, 0, Math.PI * 2);
        ctx.stroke();

        const gap = 4;
        ctx.beginPath();
        ctx.moveTo(ch.x, ch.y - 14);
        ctx.lineTo(ch.x, ch.y - gap);
        ctx.moveTo(ch.x, ch.y + 14);
        ctx.lineTo(ch.x, ch.y + gap);
        ctx.moveTo(ch.x - 14, ch.y);
        ctx.lineTo(ch.x - gap, ch.y);
        ctx.moveTo(ch.x + 14, ch.y);
        ctx.lineTo(ch.x + gap, ch.y);
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
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              {copy?.h1Prefix || null}
              <span data-seo-kw="1">{copy?.h1Keyword || copy?.title || t('angleHold.title', 'Crosshair Placement & Angle Hold Trainer')}</span>
              {copy?.h1Suffix || null}
              {(copy?.subtitle || t('angleHold.subtitle', null)) && (
                <span className="block text-sm font-semibold text-slate-400 mt-1">
                  {copy?.subtitle || t('angleHold.subtitle', '')}
                </span>
              )}
            </h1>
            <p className="text-[13px] text-slate-400 leading-relaxed">
              {copy?.caption || t('angleHold.caption', 'Angle holding tests your simple reaction latency and trigger discipline when holding chokepoints against peeking opponents. Rather than dynamic flicking, defensive angle holding isolates visual onset reaction time and pre-aim offset geometry to neutralize peeker’s advantage in tactical shooters.')}
            </p>
          </div>
        )}

        {/* Live Stat Cards */}
        {!isFullscreen && (
          <div className="grid grid-cols-4 gap-2 w-full -mb-2">
            {[
              { label: copy?.statScore || t('angleHold.score', 'Score'), value: uiScore },
              { label: copy?.statTime || t('angleHold.time', 'Time'), value: `${uiTimeLeft}s`, color: uiTimeLeft <= 10 ? 'text-red-400 animate-pulse' : 'text-white' },
              { label: copy?.statAccuracy || t('angleHold.accuracy', 'Accuracy'), value: `${accuracy}%`, color: 'text-blue-400' },
              { label: copy?.statBestScore || t('angleHold.bestScore', 'Best Score'), value: bestScore, color: 'text-amber-400' },
            ].map((card) => (
              <div key={card.label} className="border border-white/[0.06] bg-white/[0.015] px-2 py-2 rounded-xl text-center">
                <div className="text-[10px] font-bold tracking-wider uppercase text-slate-500">{card.label}</div>
                <div className={`text-base sm:text-lg font-black tabular-nums ${card.color || 'text-white'}`}>{card.value}</div>
              </div>
            ))}
          </div>
        )}

        {/* Game Stage Container */}
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
                <p className="text-[10px] font-semibold uppercase tracking-wider text-white/50">{copy?.statScore || t('angleHold.score', 'Score')}</p>
                <p className="text-2xl sm:text-3xl font-bold text-white tabular-nums leading-tight">{uiScore}</p>
              </div>
              <div className="absolute top-4 right-4 z-30 pointer-events-none text-right">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-white/50">{copy?.statTime || t('angleHold.time', 'Time')}</p>
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
                {soundEnabled ? <Volume2 className="w-4 h-4 text-orange-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
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
              accent="orange"
              title={copy?.startTitle || t('angleHold.startTitle', 'Angle Hold Pro')}
              subtitle={copy?.startSubtitle || t('angleHold.startSubtitle', 'Crosshair Placement & Peek Reaction • Endless Level Progression')}
              isTouchOnlyDevice={isTouchOnlyDevice}
              onStart={enterDrill}
            />
          )}

          {/* COUNTDOWN OVERLAY */}
          {gameState === 'countdown' && (
            <DrillCountdown value={countdownValue} subtitle={copy?.getReady || t('angleHold.getReady', 'GET READY')} />
          )}

          {/* END SCREEN — Universal Result Card */}
          {gameState === 'gameOver' && analytics.grade && (
            <DrillResultCard
              accent="orange"
              grade={analytics.grade}
              score={uiScore}
              isNewBest={isNewBest}
              stats={[
                { value: analytics.accuracy, suffix: "%", label: copy?.statAccuracy || t('angleHold.accuracy', 'Accuracy') },
                { value: analytics.avgReactionMs, suffix: "ms", label: copy?.statAvgReaction || t('angleHold.avgReaction', 'Avg Reaction') },
                { value: `${analytics.maxCombo}x`, label: copy?.statMaxCombo || t('angleHold.maxCombo', 'Max Combo') },
                { value: `Lv. ${analytics.finalLevel}`, label: copy?.statPeakLevel || t('angleHold.peakLevel', 'Peak Level') },
              ]}
              onPlayAgain={enterDrill}
              onShare={shareScore}
              onExit={handleExitDrill}
            />
          )}
        </div>

        {/* Drill Caption */}
        {!isFullscreen && (
          <p className="text-xs text-slate-400 leading-relaxed -mt-2">
            {copy?.bottomCaption || t('angleHold.bottomCaption', 'Hold your crosshair against the corner and click the instant a peeking target appears.')}
          </p>
        )}

        {/* ── ACCORDIONS ── */}
        {!isFullscreen && (
          <div className="[&>div]:!mt-0">
            <DrillAccordion
              id="rules"
              title={copy?.accordionRulesTitle || t('angleHold.accordionRulesTitle', 'Drill Instructions & Scoring System')}
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
              title={copy?.accordionAboutTitle || t('angleHold.accordionAboutTitle', 'About Angle Hold Pro')}
              isOpen={openAccordion === 'about'}
              onToggle={() => setOpenAccordion(openAccordion === 'about' ? null : 'about')}
            >
              <div className="space-y-8">
                <section>
                  <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                    <Crosshair className="w-4 h-4 text-orange-400" /> {copy?.overviewTitle || t('angleHold.overviewTitle', 'What Is Crosshair Placement & Angle Holding?')}
                  </h3>
                  <p className="text-sm leading-relaxed mb-3 text-gray-300">
                    {copy?.overviewLead || 'Holding an angle means reacting to an opponent who appears exactly where you are already aiming. A typical adult reacts to one expected visual stimulus in 200–250 ms, and having to decide whether to shoot adds more, because reaction time rises with the number of alternatives (Donders, 1868; Hick, 1952).'}
                  </p>
                  {(copy?.aboutIntro || ABOUT_INTRO).map((para, i) => (
                    <p key={i} className={`text-sm leading-relaxed text-gray-300 ${i < (copy?.aboutIntro || ABOUT_INTRO).length - 1 ? "mb-3" : ""}`}>{para}</p>
                  ))}
                </section>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {(copy?.aboutCards || ABOUT_CARDS).map((card, i) => {
                  const CardIcon = card.icon || (i === 0 ? Users : i === 1 ? TrendingUp : Zap);
                  return (
                    <div key={i} className="p-4 rounded-xl border border-gray-800 bg-white/[0.02]">
                      <div className="flex items-center gap-2.5 mb-2">
                        <div className={`w-7 h-7 rounded-lg ${card.iconBg || 'bg-orange-600'} flex items-center justify-center`}>
                          <CardIcon className="w-3.5 h-3.5 text-white" />
                        </div>
                        <h4 className="text-xs font-bold text-white">{card.title}</h4>
                      </div>
                      <p className="text-xs text-gray-300 leading-relaxed">{card.text}</p>
                    </div>
                  );
                })}
              </div>

                {(copy?.aboutSections || ABOUT_SECTIONS).map((section, i) => {
                  const SectionIcon = section.icon || (i === 0 ? Activity : i === 1 ? Target : Eye);
                  return (
                    <section key={i}>
                      <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                        <SectionIcon className="w-4 h-4 text-orange-400" /> {section.title}
                      </h3>
                      {section.paragraphs.map((para, j) => (
                        <p key={j} className={`text-sm leading-relaxed text-gray-300 ${j < section.paragraphs.length - 1 ? "mb-3" : ""}`}>{para}</p>
                      ))}
                    </section>
                  );
                })}
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
