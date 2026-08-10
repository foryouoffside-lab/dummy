'use client';
import { isIdleFrameSkippable } from '@/lib/performance';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';

import {
  Activity, AlertCircle, ArrowRight, Brain, ChevronRight, Crosshair,
  Eye, Flame, GraduationCap, RefreshCw, Target,
  Timer, TrendingUp, Trophy, Volume2, VolumeX,
  Zap, ZapOff, Users, Share2, LogOut, Award, ShieldAlert
} from 'lucide-react';

import generateShareCard, { shareScoreCard } from '../../../../../components/ShareScoreCard';
import { getPlayerName } from '../../../../../lib/leaderboard';
import { drillAudio } from '../../../../../lib/drillAudio';
import { drillFlash } from '../../../../../lib/drillFlash';
import { drillTimeout } from '../../../../../lib/drillTimeout';
import { getFpsScoreGrade } from '../../../../../lib/scoringEngine';
import { createBackdropCache, getCanvasDpr, drawTacticalTarget } from '../../../../../lib/canvasFx';
import useUnexpectedExitGuard from '../../../../../lib/useUnexpectedExitGuard';
import DrillFooter from '../../../../../components/drill/DrillFooter';
import DrillCountdown from '../../../../../components/drill/DrillCountdown';
import DrillAccordion from '../../../../../components/drill/DrillAccordion';
import FpsStartCard from '../../../../../components/drill/FpsStartCard';

// ============================================================
// TUNING CONSTANTS
// ============================================================
const DRILL_DURATION = 45; // 45 seconds duration
const ELITE_SCORE = 15000;
const STORAGE_KEY = 'skilldrills_reaction_chain_v2';

const getSavedData = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { bestScore: 0, bestCombo: 1.0, bestLevel: 1, totalSessions: 0 };
    return { bestScore: 0, bestCombo: 1.0, bestLevel: 1, totalSessions: 0, ...JSON.parse(raw) };
  } catch (e) {
    return { bestScore: 0, bestCombo: 1.0, bestLevel: 1, totalSessions: 0 };
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
  { title: "Kinetic Arrest (+50 PTS)", text: "Intercept incoming nodes and stop your cursor completely (ARREST READY) to score 50 points per hit." },
  { title: "Combo Multiplier (up to 3.0x)", text: "Chain arrests without errors to multiply score gains up to 3.0x max." },
  { title: "Slice-Through & Miss Errors", text: "Moving while over a node or missing it resets your combo streak without score deduction." },
  { title: "Brutal Speed Scaling", text: "As your score increases, node speeds accelerate up to 1800 px/s with smaller radiuses." }
];

const FAQ_ITEMS = [
  { q: "What is the Reaction Chain drill?", a: "An elite reflex training game focusing on mouse precision and impulse arrest. Instead of clicking targets, you must steer your cursor over them and stop completely to 'arrest' them." },
  { q: "How do impulse arrest mechanics work?", a: "When your crosshair is over a target, your mouse velocity must be under 1.5 pixels/frame ('ARREST READY' turns green). Stopping successfully scores 50 points base per hit." },
  { q: "What skills does this reflex drill improve?", a: "It trains kinetic brake control, hand-eye coordination, motor inhibition (stopping on a dime), and prevents over-flicking or spastic aiming in high-speed gaming." },
  { q: "How long does each round last?", a: "Each round lasts 45 seconds focused duration." },
  { q: "Why do targets change colors?", a: "As you level up, node velocities accelerate from 600px/s up to 1800px/s. Node colors shift from Green -> Orange -> Red to visually warn you of higher speeds." },
  { q: "How does the combo multiplier work?", a: "Chaining successful arrests increases your combo multiplier up to 3.0x. Maintaining high combos is the key to scaling score quickly." },
  { q: "Does this game help with Valorant or CS2 aim?", a: "Yes, it directly trains snap deceleration. In tactical shooters, you must stop moving your mouse and character to achieve perfect first-shot accuracy. This drill builds that muscle memory." },
  { q: "Do I need to sign up for this mouse precision test?", a: "No registration required. This free mouse precision and reflex game works instantly in your browser — no downloads needed." },
  { q: "Is this reflex game free to play?", a: "Yes, the Reaction Chain drill on SkillDrills is 100% free, ad-free, and runs entirely in your web browser." }
];

const RELATED_DRILLS = [
  { id: "180-degree-awareness", name: "180° Awareness Pro", cat: "FPS Awareness", desc: "Train rapid target identification and 180° turnaround flicks.", href: "/drills/fps/180-degree-awareness" },
  { id: "quick-dodge", name: "Quick Dodge", cat: "Physical Reflex", desc: "Evasion and spatial coordinate reaction drill.", href: "/drills/physical/reflex-training/quick-dodge" },
  { id: "aim-trainer", name: "Aim Trainer", cat: "Motor Coordination", desc: "Hone spatial coordinate click speed and precision.", href: "/drills/motor/hand-eye-coordination/aim-trainer" },
  { id: "flick-shot-training", name: "Pro Flick Trainer", cat: "FPS Flicking", desc: "Snap to targets in time-attack mode with precision flicking.", href: "/drills/fps/flick-shot-training" },
  { id: "steady-hand", name: "Steady Hand", cat: "Motor Precision", desc: "Test steady pathing and micro-movement control.", href: "/drills/motor/precision-control/steady-hand" },
  { id: "reaction-time-test", name: "Reaction Time Test", cat: "Reaction Speed", desc: "Test raw visual reaction speed in milliseconds.", href: "/drills/reaction-speed/reaction-time-test" }
];

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function ReactionChainClient() {
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
  const [bestCombo, setBestCombo] = useState(1.0);
  const [bestLevel, setBestLevel] = useState(1);
  const [isNewBest, setIsNewBest] = useState(false);

  const [analytics, setAnalytics] = useState({
    accuracy: 100, arrests: 0, misses: 0, maxStreak: 0,
    peakSpeed: 600, peakLevel: 1, bestCombo: 1.0, grade: null
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
    nodes: [],
    score: 0,
    level: 1,
    timeLeft: DRILL_DURATION,
    cursorVel: 0,
    lastMouse: { x: 0, y: 0 },
    baseSpeed: 600,
    maxNodes: 1,
    nodeRadius: 15,
    basePoints: 50,
    streak: 0,
    maxStreak: 0,
    combo: 1.0,
    bestCombo: 1.0,
    arrests: 0,
    misses: 0,
    totalAttempts: 0,
    totalFrames: 0,
    screenShake: 0,
    logicalWidth: 800,
    logicalHeight: 450
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
        const savedSens = localStorage.getItem('reactionChain_sens_opt');
        if (savedSens) setUniversalSens(parseFloat(savedSens));
      } catch (e) {}

      const saved = getSavedData();
      setBestScore(saved.bestScore || 0);
      setBestCombo(saved.bestCombo || 1.0);
      setBestLevel(saved.bestLevel || 1);
    }
  }, []);

  // Countdown Timeout Cleanup on Unmount
  useEffect(() => {
    return () => {
      countdownTimeoutsRef.current.forEach(clearTimeout);
    };
  }, []);

  useEffect(() => {
    if (gameState !== 'playing') {
      try { localStorage.setItem('reactionChain_sens_opt', universalSens.toString()); } catch (e) {}
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
    gameActiveRef.current = false;

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

  const updateLevelParams = (currentScore) => {
    const e = engine.current;
    let lv = 1; let spd = 600; let mx = 1; let r = 15; let bp = 50;

    if (currentScore >= 15000) { lv = 10; spd = 1800; mx = 5; r = 6; bp = 50; }
    else if (currentScore >= 11000) { lv = 9; spd = 1500; mx = 4; r = 7; bp = 50; }
    else if (currentScore >= 8000) { lv = 8; spd = 1300; mx = 4; r = 8; bp = 50; }
    else if (currentScore >= 5500) { lv = 7; spd = 1100; mx = 3; r = 9; bp = 50; }
    else if (currentScore >= 3500) { lv = 6; spd = 950; mx = 3; r = 10; bp = 50; }
    else if (currentScore >= 2000) { lv = 5; spd = 800; mx = 2; r = 11; bp = 50; }
    else if (currentScore >= 1000) { lv = 4; spd = 700; mx = 2; r = 12; bp = 50; }
    else if (currentScore >= 500) { lv = 3; spd = 650; mx = 2; r = 13; bp = 50; }
    else if (currentScore >= 250) { lv = 2; spd = 600; mx = 1; r = 14; bp = 50; }

    if (document.fullscreenElement) {
      mx = Math.min(mx + 1, 6);
      spd = Math.floor(spd * 1.15);
    }

    e.level = lv;
    e.baseSpeed = spd;
    e.maxNodes = mx;
    e.nodeRadius = r;
    e.basePoints = bp;
    bestLevelRunRef.current = Math.max(bestLevelRunRef.current, lv);
  };

  const spawnNode = useCallback((w, h) => {
    const e = engine.current;
    const side = Math.floor(Math.random() * 4);
    let x, y, vx, vy;

    if (side === 0) {
      x = -20; y = Math.random() * h;
      vx = e.baseSpeed; vy = 0;
    } else if (side === 1) {
      x = w + 20; y = Math.random() * h;
      vx = -e.baseSpeed; vy = 0;
    } else if (side === 2) {
      x = Math.random() * w; y = -20;
      vx = 0; vy = e.baseSpeed;
    } else {
      x = Math.random() * w; y = h + 20;
      vx = 0; vy = -e.baseSpeed;
    }

    e.nodes.push({ x, y, vx, vy, active: true, r: e.nodeRadius });
  }, []);

  const handleArrest = useCallback((nodeIndex) => {
    const e = engine.current;
    e.arrests++;
    e.totalAttempts++;
    e.streak++;
    if (e.streak > e.maxStreak) e.maxStreak = e.streak;

    let multi = 1.0;
    if (e.streak >= 40) multi = 3.0;
    else if (e.streak >= 25) multi = 2.0;
    else if (e.streak >= 10) multi = 1.5;
    else if (e.streak >= 5) multi = 1.2;

    if (multi > e.bestCombo) e.bestCombo = multi;
    e.combo = multi;

    let pts = e.basePoints * e.combo;
    e.score += Math.floor(pts);

    e.nodes.splice(nodeIndex, 1);

    drillAudio.playHit();
    setUiScore(e.score);
  }, []);

  const applyPenalty = useCallback((nodeIndex) => {
    const e = engine.current;
    e.misses++;
    e.totalAttempts++;

    // Streak & Combo reset on miss, but NO score deduction and NO time deduction!
    e.streak = 0;
    e.combo = 1.0;
    e.screenShake = 20;

    if (nodeIndex !== undefined && e.nodes[nodeIndex]) {
      e.nodes.splice(nodeIndex, 1);
    }

    triggerFlash();
    drillAudio.playPenalty();
    setUiScore(e.score);
  }, [triggerFlash]);

  // End Game Management
  const endGame = useCallback(() => {
    gameActiveRef.current = false;
    startingRef.current = false;
    setGameState('gameOver');
    if (document.pointerLockElement) document.exitPointerLock();

    const e = engine.current;
    const finalAccuracy = e.totalAttempts > 0 ? Math.round((e.arrests / e.totalAttempts) * 100) : 0;
    const rating = getFpsScoreGrade(e.score, ELITE_SCORE);
    const grade = { letter: rating.grade, label: rating.label, color: rating.color };

    setAnalytics({
      accuracy: finalAccuracy,
      arrests: e.arrests,
      misses: e.misses,
      maxStreak: e.maxStreak,
      peakSpeed: Math.floor(e.baseSpeed),
      peakLevel: e.level,
      bestCombo: e.bestCombo,
      grade
    });

    setUiScore(e.score);

    const prevSaved = getSavedData();
    const isNewHigh = e.score > prevSaved.bestScore;
    setIsNewBest(isNewHigh);

    const runBestLevel = Math.max(prevSaved.bestLevel, bestLevelRunRef.current);
    const updatedData = {
      bestScore: Math.max(prevSaved.bestScore, e.score),
      bestCombo: Math.max(prevSaved.bestCombo || 1.0, e.bestCombo),
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
    bestLevelRunRef.current = 1;

    setAnalytics({
      accuracy: 100, arrests: 0, misses: 0, maxStreak: 0,
      peakSpeed: 600, peakLevel: 1, bestCombo: 1.0, grade: null
    });

    const cvs = canvasRef.current;
    const w = cvs ? cvs.width : 800;
    const h = cvs ? cvs.height : 450;

    engine.current = {
      crosshair: { x: w / 2, y: h / 2, initialized: true },
      nodes: [],
      score: 0,
      level: 1,
      timeLeft: DRILL_DURATION,
      cursorVel: 0,
      lastMouse: { x: w / 2, y: h / 2 },
      baseSpeed: 600,
      maxNodes: 1,
      nodeRadius: 15,
      basePoints: 50,
      streak: 0,
      maxStreak: 0,
      combo: 1.0,
      bestCombo: 1.0,
      arrests: 0,
      misses: 0,
      totalAttempts: 0,
      totalFrames: 0,
      screenShake: 0,
      logicalWidth: w,
      logicalHeight: h
    };

    try {
      if (containerRef.current && !document.fullscreenElement) {
        await containerRef.current.requestFullscreen();
      }
    } catch (e) {}

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
      const cvs = canvasRef.current;
      const dx = e.movementX * universalSens;
      const dy = e.movementY * universalSens;

      const eRef = engine.current;
      const w = eRef.logicalWidth || cvs.width;
      const h = eRef.logicalHeight || cvs.height;

      eRef.crosshair.x = Math.max(0, Math.min(w, eRef.crosshair.x + dx));
      eRef.crosshair.y = Math.max(0, Math.min(h, eRef.crosshair.y + dy));
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

            bCtx.strokeStyle = 'rgba(16, 185, 129, 0.04)';
            bCtx.lineWidth = 1;
            const gridSize = 50;
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
            engine.current.lastMouse.x = width / 2;
            engine.current.lastMouse.y = height / 2;
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
      const dt = Math.min(deltaTimeMs / 1000, 0.033);
      const e = engine.current;
      const dpr = getCanvasDpr();
      const w = e.logicalWidth || cvs.width;
      const h = e.logicalHeight || cvs.height;

      if (gameState === 'playing' && pointerLocked && gameActiveRef.current) {
        // Standard 1x time decay in seconds
        e.timeLeft -= dt;

        if (e.timeLeft <= 0) {
          e.timeLeft = 0;
          setUiTimeLeft(0);
          endGame();
          return;
        }

        const intTime = Math.max(0, Math.ceil(e.timeLeft));
        if (intTime !== lastTimeRef.current) {
          setUiTimeLeft(intTime);
          lastTimeRef.current = intTime;
        }

        e.totalFrames++;
        const ch = e.crosshair;

        const velX = ch.x - e.lastMouse.x;
        const velY = ch.y - e.lastMouse.y;
        e.cursorVel = Math.hypot(velX, velY);
        e.lastMouse.x = ch.x;
        e.lastMouse.y = ch.y;

        updateLevelParams(e.score);

        while (e.nodes.length < e.maxNodes) {
          spawnNode(w, h);
        }

        for (let i = e.nodes.length - 1; i >= 0; i--) {
          const node = e.nodes[i];
          node.x += node.vx * dt;
          node.y += node.vy * dt;

          const dist = Math.hypot(ch.x - node.x, ch.y - node.y);

          if (dist < node.r + 8) {
            if (e.cursorVel < 1.5) {
              handleArrest(i);
              break;
            } else {
              applyPenalty(i);
              break;
            }
          }

          const padding = 150;
          const outOfBounds = node.x < -padding || node.x > w + padding || node.y < -padding || node.y > h + padding;
          if (outOfBounds && !drillTimeout.isEnabled()) {
            node.x = Math.max(-padding, Math.min(w + padding, node.x));
            node.y = Math.max(-padding, Math.min(h + padding, node.y));
            node.vx *= -1;
            node.vy *= -1;
            continue;
          }
          if (outOfBounds) {
            applyPenalty(i);
            break;
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

      // TARGET NODES DRAWING
      const currentVelocity = e.baseSpeed;
      e.nodes.forEach((node) => {
        const speedIntensity = Math.min(1, (currentVelocity - 600) / 1000);
        let nodeColor = '#10b981';
        if (speedIntensity > 0.5) {
          const g = Math.floor(255 * (1 - speedIntensity));
          nodeColor = `rgb(255, ${g}, 0)`;
        } else if (e.combo >= 10) {
          nodeColor = '#38bdf8';
        }

        drawTacticalTarget(ctx, node.x, node.y, node.r, nodeColor, false);

        // Trailing Line
        const angle = Math.atan2(node.vy, node.vx);
        ctx.beginPath();
        ctx.moveTo(node.x, node.y);
        ctx.lineTo(node.x - Math.cos(angle) * 20, node.y - Math.sin(angle) * 20);
        ctx.lineWidth = 3;
        ctx.strokeStyle = nodeColor;
        ctx.stroke();

        // Outer Radar Ring
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.r * 2.0, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 + speedIntensity * 0.4})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // CROSSHAIR DRAWING (WITHOUT GLOW)
      const ch = e.crosshair;
      if (ch.initialized && (gameState === 'playing' || gameState === 'start')) {
        const isStill = e.cursorVel < 1.5;
        const activeColor = pointerLocked
          ? isStill
            ? '#10b981'
            : 'rgba(255,255,255,0.6)'
          : '#ef4444';

        ctx.beginPath();
        ctx.arc(ch.x, ch.y, 15, 0, Math.PI * 2);
        ctx.strokeStyle = activeColor;
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(ch.x, ch.y, 22, 0, Math.PI * 2);
        ctx.strokeStyle = pointerLocked
          ? isStill
            ? 'rgba(16,185,129,0.3)'
            : 'rgba(255,255,255,0.15)'
          : 'rgba(239,68,68,0.3)';
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(ch.x - 24, ch.y); ctx.lineTo(ch.x - 10, ch.y);
        ctx.moveTo(ch.x + 10, ch.y); ctx.lineTo(ch.x + 24, ch.y);
        ctx.moveTo(ch.x, ch.y - 24); ctx.lineTo(ch.x, ch.y - 10);
        ctx.moveTo(ch.x, ch.y + 10); ctx.lineTo(ch.x, ch.y + 24);
        ctx.strokeStyle = activeColor;
        ctx.stroke();

        ctx.fillStyle = activeColor;
        ctx.beginPath(); ctx.arc(ch.x, ch.y, 3, 0, Math.PI * 2); ctx.fill();

        ctx.font = 'bold 10px monospace';
        ctx.textAlign = 'center';
        ctx.fillStyle = activeColor;
        ctx.fillText(isStill ? 'ARREST READY' : `VEL: ${e.cursorVel.toFixed(1)}`, ch.x, ch.y - 30);
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
  }, [gameState, pointerLocked, spawnNode, endGame, handleArrest, applyPenalty]);

  const shareScore = useCallback(async () => {
    const url = 'https://skilldrills.online/drills/physical/reflex-training/reaction-chain';
    try {
      const canvas = generateShareCard({
        score: uiScore,
        bestScore,
        accuracy: analytics.accuracy,
        bestCombo: analytics.bestCombo,
        rating: { letter: analytics.grade?.letter || 'C', label: analytics.grade?.label || 'Keep Going', emoji: '🎯' },
        newBest: isNewBest,
        drillName: 'Reaction Chain',
        playerName: getPlayerName(),
      });
      await shareScoreCard(url, canvas);
    } catch (e) {
      const text = `🎯 I scored ${uiScore} PTS (Level ${analytics.peakLevel}) on Reaction Chain! Accuracy: ${analytics.accuracy}%. Test your reflexes at skilldrills.online!`;
      if (typeof navigator !== 'undefined' && navigator.share) {
        navigator.share({ title: 'My Reaction Chain Score', text, url }).catch(() => {});
      } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
        navigator.clipboard.writeText(text);
        alert('Score card copied to clipboard!');
      }
    }
  }, [uiScore, bestScore, analytics, isNewBest]);

  const accuracy = gameState === 'gameOver'
    ? analytics.accuracy
    : (engine.current.totalAttempts > 0 ? Math.round((engine.current.arrests / engine.current.totalAttempts) * 100) : 100);

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
              <span className="text-emerald-400 font-medium">Reaction Chain</span>
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
                {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-emerald-400" />}
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
                {flashEnabled ? <Zap className="w-4 h-4 text-red-400" /> : <ZapOff className="w-4 h-4 text-red-400" />}
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
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight bg-gradient-to-r from-white via-slate-200 to-emerald-400 bg-clip-text text-transparent uppercase">
              REACTION CHAIN
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Desktop Exclusive • Impulse Arrest
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
          className={`relative overflow-hidden flex flex-col transition-all duration-150 select-none bg-[#080811] text-white ${
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
              accent="emerald"
              title="Reaction Chain"
              subtitle="Desktop Exclusive • Impulse Arrest"
              rules={[
                { icon: Zap, accent: 'emerald', title: 'Stop on Nodes (+50 PTS)', text: 'Intercept moving nodes and bring cursor to a complete halt (ARREST READY)' },
                { icon: ShieldAlert, accent: 'blue', title: 'Maintain Combo Streak', text: 'Chain successful arrests to scale your score multiplier up to 3.0x' },
              ]}
              sensitivity={{ value: universalSens, onChange: setUniversalSens, cmPer360 }}
              stats={[
                { icon: Trophy, label: 'Best Score', value: bestScore, color: 'text-white', accent: 'slate' },
                { icon: Flame, label: 'Best Combo', value: `${bestCombo.toFixed(1)}x`, color: 'text-emerald-400', accent: 'emerald' },
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
              <div className="w-[36%] flex flex-col items-center justify-center gap-1 border-r border-white/5 px-4" style={{ background: 'radial-gradient(ellipse 260px 200px at 50% 30%, rgba(16,185,129,.12), transparent 70%)' }}>
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
                    <p className="text-sm sm:text-base font-black text-white">{analytics.arrests}</p>
                    <p className="text-[7.5px] sm:text-[8.5px] font-bold uppercase tracking-wider text-gray-400 mt-0.5">Total Arrests</p>
                  </div>
                  <div className="bg-black border border-white/5 p-2.5 rounded-xl text-center">
                    <p className="text-sm sm:text-base font-black text-white">{analytics.bestCombo.toFixed(1)}x</p>
                    <p className="text-[7.5px] sm:text-[8.5px] font-bold uppercase tracking-wider text-gray-400 mt-0.5">Max Combo</p>
                  </div>
                  <div className="bg-black border border-white/5 p-2.5 rounded-xl text-center">
                    <p className="text-sm sm:text-base font-black text-white">Lv. {analytics.peakLevel}</p>
                    <p className="text-[7.5px] sm:text-[8.5px] font-bold uppercase tracking-wider text-gray-400 mt-0.5">Peak Level</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={enterDrill}
                    className="flex-1 py-3 rounded-[13px] bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-xs uppercase tracking-wide cursor-pointer transition-transform active:scale-[0.98] shadow-md flex items-center justify-center gap-1.5"
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
              title="About Reaction Chain"
              isOpen={openAccordion === 'about'}
              onToggle={() => setOpenAccordion(openAccordion === 'about' ? null : 'about')}
            >
              <div className="space-y-8">
                <section>
                  <h4 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                    <Brain className="w-4 h-4 text-emerald-400" /> What Is Reaction Chain Training?
                  </h4>
                  <p className="text-sm leading-relaxed mb-3 text-gray-300">
                    <strong>Reaction Chain</strong> isolates and exercises your precision stopping ability and impulse control (motor inhibition). Instead of simply clicking moving targets, you must move to intercept them and force your hand to stop completely.
                  </p>
                  <p className="text-sm leading-relaxed text-gray-300">
                    By consistently performing kinetic arrest drills, players train their central nervous system to rapidly decelerate crosshair velocity. This eliminates over-flicking and builds clean first-shot accuracy in tactical shooters like CS2 and Valorant.
                  </p>
                </section>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl border border-gray-800 bg-white/[0.02]">
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center"><Users className="w-3.5 h-3.5 text-white" /></div>
                      <h5 className="text-xs font-bold text-white">Who Should Use This?</h5>
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed">FPS gamers wanting to eliminate "lazy aiming" and over-flicking, and players seeking advanced motor inhibition training.</p>
                  </div>
                  <div className="p-4 rounded-xl border border-gray-800 bg-white/[0.02]">
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="w-7 h-7 rounded-lg bg-emerald-600 flex items-center justify-center"><TrendingUp className="w-3.5 h-3.5 text-white" /></div>
                      <h5 className="text-xs font-bold text-white">Skills Improved</h5>
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed">Precision stopping, kinetic friction control, impulse inhibition, and high-speed target interception.</p>
                  </div>
                  <div className="p-4 rounded-xl border border-gray-800 bg-white/[0.02]">
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="w-7 h-7 rounded-lg bg-purple-600 flex items-center justify-center"><Zap className="w-3.5 h-3.5 text-white" /></div>
                      <h5 className="text-xs font-bold text-white">Kinetic Control</h5>
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed">Intercept high-velocity incoming targets and bring your hand to a complete stop to score points and build combos.</p>
                  </div>
                </div>
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

        {/* ── RELATED DRILLS ── */}
        {!isFullscreen && (
          <section className="mt-4">
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3 font-sans">
              Related Drills
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