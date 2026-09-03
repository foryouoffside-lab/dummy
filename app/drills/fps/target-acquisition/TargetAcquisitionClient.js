'use client';
import { isIdleFrameSkippable } from '@/lib/performance';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';

import {
  AlertCircle, ArrowRight, ChevronRight, Eye, Flame,
  RefreshCw, Target, Timer, TrendingUp, Trophy,
  Volume2, VolumeX, Zap, ZapOff, Share2, Users, LogOut, Award
} from 'lucide-react';

import generateShareCard, { shareScoreCard } from '../../../../components/ShareScoreCard';
import { getPlayerName } from '../../../../lib/leaderboard';
import { drillAudio } from '../../../../lib/drillAudio';
import { drillFlash } from '../../../../lib/drillFlash';
import { drillPenalty } from '../../../../lib/drillPenalty';
import { getStartLevel, getDifficultyProgress, ramp } from '../../../../lib/drillDifficulty';
import { getComboMultiplier, getFpsScoreGrade } from '../../../../lib/scoringEngine';
import { createBackdropCache, getCanvasDpr, drawPulseRing } from '../../../../lib/canvasFx';
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
const POINTS_PER_LEVEL = 1400; // 300 -> 1400 (~7x)
const ELITE_SCORE = 54000; // 18000 -> 54000 (3x)
const TIME_PER_HIT = 0.4; // +0.4s on correct target hit
const TIME_PENALTY = 0.6; // opt-in on wrong target click or miss
const STORAGE_KEY = 'skilldrills_fps_target_acquisition_v3';

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
    count: Math.min(8, Math.round(2 + p * 4 + heat * 0.5)),
    radius: Math.max(12, ramp(32, 14, p) * (1 - heat * 0.15)),
    opacityDelta: Math.max(0.04, ramp(0.45, 0.06, p) * (1 - heat * 0.20)),
    margin: Math.max(25, ramp(120, 30, p)),
    hitPad: Math.max(2, ramp(10, 4, p) * (1 - heat * 0.25)),
  };
};

// ============================================================
// ACCORDION DATA
// ============================================================
const RULES_ITEMS = [
  { title: "Correct Target Hit (+100 PTS / +0.4s)", text: "Click the brightest target first. Multiplied by combo & level bonus." },
  { title: "Set Cleared Bonus (+400 PTS × Level)", text: "Clearing all targets in a set spawns the next target cluster." },
  { title: "Level Progression (Every 1400 PTS)", text: "Continuous target density, size, and fine opacity delta scaling." },
  { title: "Wrong Click / Miss Penalty", text: "Wrong target or miss resets combo to 0 (-0.6s with Time Penalty enabled)." }
];

const FAQ_ITEMS = [
  { q: "What is target acquisition in FPS games?", a: "Target acquisition is the combined process of visually detecting a threat, identifying it as an enemy (not a teammate), deciding to engage, and getting your crosshair on the target fast enough to fire first. It involves both cognitive processing (recognition and decision) and mechanical execution (crosshair movement). This is the skill that separates players who see enemies fast from those who react slowly." },
  { q: "How does target acquisition differ from reaction time?", a: "Reaction time measures the gap between stimulus appearance and your click. Target acquisition includes reaction time but adds the prior cognitive steps: visual scan → target detection → threat confirmation → aim → shoot. Better target acquisition means your brain identifies threats faster, giving your mechanical aim more time to respond accurately." },
  { q: "Why do some players always seem to see enemies before others?", a: "Players with trained target acquisition have learned unconscious threat pattern recognition — their visual system has been trained to flag enemy silhouettes, color cues, and movement patterns faster than untrained players. This creates the illusion that they see first when actually their brain is processing the same visual information faster and more efficiently." },
  { q: "How does this help in Valorant compared to other drills?", a: "Valorant's round-based structure means you often peek corners or angles with partial information. Fast target acquisition is critical for winning the split-second timing battle when two players simultaneously come into view of each other. This drill specifically trains the speed of the visual identification → aim decision → click sequence." },
  { q: "What cognitive skills does target acquisition training improve?", a: "Target acquisition training improves visual processing speed (how fast your eyes register a target), pattern recognition (identifying enemy silhouettes), selective attention (filtering enemies from background), and decision speed (choosing to engage). Together these create the faster perception that high-rank players possess." },
  { q: "How are errors penalised in Target Acquisition Pro?", a: "Clicking a darker target out of order or clicking empty space resets your streak combo multiplier. When the optional Time Penalty setting is enabled in your session preferences, each mistake also deducts 0.6s from your clock." },
  { q: "How does target acquisition impact CS2 and tactical shooters?", a: "In CS2, time-to-kill is extremely fast. Spotting a target's head pixel a fraction of a second earlier grants the critical advantage needed to secure first-bullet headshots." },
  { q: "What is the optimal daily target acquisition training routine?", a: "We recommend 10 to 15 minutes of target acquisition drills at the start of your gaming session to warm up visual processing speed before entering competitive matches." }
];

const RELATED_DRILLS = [
  { id: "180-degree-awareness", name: "180° Awareness Pro", cat: "FPS Awareness", desc: "Master 180-degree snap turns and peripheral threat detection.", href: "/drills/fps/180-degree-awareness" },
  { id: "target-switching-swarm", name: "Target Switching Swarm", cat: "FPS Switching", desc: "Train multi-target flick switching under high density.", href: "/drills/fps/target-switching-swarm" },
  { id: "target-prioritization", name: "Target Prioritization", cat: "FPS Strategy", desc: "Evaluate threat distances and prioritize high-risk targets.", href: "/drills/fps/target-prioritization" },
  { id: "flick-shot-training", name: "Pro Flick Trainer", cat: "FPS Flicking", desc: "Snap to targets in time-attack mode with precision flicking.", href: "/drills/fps/flick-shot-training" },
  { id: "micro-correction-precision", name: "Micro Flicks", cat: "FPS Precision", desc: "Optimize tight-angle crosshair micro corrections.", href: "/drills/fps/micro-correction-precision" },
  { id: "instant-response", name: "Instant Response", cat: "FPS Reaction", desc: "Train raw single-stimulus reflex acquisition.", href: "/drills/fps/instant-response" }
];

export default function TargetAcquisitionClient() {
  const [gameState, setGameState] = useState('start'); // 'start' | 'countdown' | 'playing' | 'gameOver'
  const [isFullscreen, setIsFullscreen] = useState(false);
  useImmersiveMode(isFullscreen); // locks the page behind while the drill fills the screen
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [flashEnabled, setFlashEnabled] = useState(true);
  const [penaltyEnabled, setPenaltyEnabled] = useState(false);
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
    accuracy: 100, successfulHits: 0, missedClicks: 0, sequenceErrors: 0,
    setsCleared: 0, maxCombo: 0, finalLevel: 1, grade: null
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
    targets: [],
    score: 0, level: 1, combo: 0, timeLeft: DRILL_DURATION,
    successfulHits: 0, missedClicks: 0, sequenceErrors: 0, setsCleared: 0,
    totalClicks: 0, correctHits: 0, maxCombo: 0,
    particles: [], hitMarkers: [], screenShake: 0,
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
      setPenaltyEnabled(drillPenalty.isEnabled());
      const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
      const isTouchCapable = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      setIsTouchOnlyDevice(isTouchCapable && !hasFinePointer);

      try {
        const savedSens = localStorage.getItem('targetacq_sens');
        if (savedSens) setUniversalSens(parseFloat(savedSens));
      } catch (e) {}

      const saved = getSavedData();
      setBestScore(saved.bestScore || 0);
      setBestCombo(saved.bestCombo || 0);
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
      try { localStorage.setItem('targetacq_sens', universalSens.toString()); } catch (e) {}
    }
  }, [universalSens, gameState]);

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

  const spawnTargetSet = useCallback((width, height, currentLevel, currentCombo = 0) => {
    const e = engine.current;
    const config = getLevelConfig(currentLevel, currentCombo);
    
    const targets = [];
    const minSpacing = config.radius * 2.8;

    for (let i = 0; i < config.count; i++) {
      let x, y, overlap;
      let attempts = 0;
      do {
        overlap = false;
        x = config.margin + Math.random() * Math.max(1, width - config.margin * 2);
        y = config.margin + Math.random() * Math.max(1, height - config.margin * 2);
        
        for (const t of targets) {
          if (Math.hypot(t.x - x, t.y - y) < minSpacing) {
            overlap = true;
            break;
          }
        }
        attempts++;
      } while (overlap && attempts < 150);

      targets.push({
        id: i, // 0 = brightest target, count-1 = dimmest
        x,
        y,
        radius: config.radius,
        val: Math.max(0.05, 1.0 - (i * config.opacityDelta)),
        seed: Math.random()
      });
    }

    // Scramble drawing order so array position does not give away target location
    e.targets = [...targets].sort(() => Math.random() - 0.5);
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
    const finalAccuracy = e.totalClicks > 0 ? Math.round((e.correctHits / e.totalClicks) * 100) : 0;
    const peakLevel = Math.floor(bestLevelRunRef.current);
    const rating = getFpsScoreGrade(e.score, ELITE_SCORE);
    const grade = { letter: rating.grade, label: rating.label, color: rating.color };

    setAnalytics({
      accuracy: finalAccuracy, successfulHits: e.correctHits, missedClicks: e.missedClicks,
      sequenceErrors: e.sequenceErrors, setsCleared: e.setsCleared, maxCombo: e.maxCombo,
      finalLevel: peakLevel, grade
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
      accuracy: 100, successfulHits: 0, missedClicks: 0, sequenceErrors: 0,
      setsCleared: 0, maxCombo: 0, finalLevel: startLevel, grade: null
    });

    const w = engine.current.logicalWidth || 800;
    const h = engine.current.logicalHeight || 450;

    engine.current = {
      crosshair: { ...engine.current.crosshair },
      targets: [],
      score: 0, level: startLevel, combo: 0, timeLeft: DRILL_DURATION,
      successfulHits: 0, missedClicks: 0, sequenceErrors: 0, setsCleared: 0,
      totalClicks: 0, correctHits: 0, maxCombo: 0,
      particles: [], hitMarkers: [], screenShake: 0,
      logicalWidth: w, logicalHeight: h
    };

    spawnTargetSet(w, h, startLevel, 0);

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
  }, [spawnTargetSet]);

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
          const eRef = engine.current;
          eRef.totalClicks++;

          if (eRef.targets.length === 0) return;

          const ch = eRef.crosshair;
          const config = getLevelConfig(eRef.level, eRef.combo);

          // Find the target with lowest id (brightest target remaining)
          const requiredTarget = [...eRef.targets].sort((a, b) => a.id - b.id)[0];

          let hitTarget = null;
          for (let i = eRef.targets.length - 1; i >= 0; i--) {
            const t = eRef.targets[i];
            if (Math.hypot(ch.x - t.x, ch.y - t.y) <= t.radius + config.hitPad) {
              hitTarget = t;
              break;
            }
          }

          if (hitTarget) {
            if (hitTarget.id === requiredTarget.id) {
              // CORRECT TARGET HIT
              eRef.correctHits++;
              eRef.combo++;
              if (eRef.combo > eRef.maxCombo) eRef.maxCombo = eRef.combo;

              const levelMult = 1 + getDifficultyProgress(eRef.level) * 0.5;
              eRef.score += Math.round(100 * getComboMultiplier(eRef.combo) * levelMult);
              eRef.timeLeft += TIME_PER_HIT; // +0.4s

              const rawLevel = (eRef.score / POINTS_PER_LEVEL) + 1;
              eRef.level = Math.max(eRef.level, rawLevel);
              bestLevelRunRef.current = Math.max(bestLevelRunRef.current, eRef.level);

              eRef.targets = eRef.targets.filter(t => t.id !== hitTarget.id);

              if (eRef.targets.length === 0) {
                // SET FULLY CLEARED
                eRef.setsCleared++;
                eRef.score += Math.round(400 * levelMult);
                const rawLevel2 = (eRef.score / POINTS_PER_LEVEL) + 1;
                eRef.level = Math.max(eRef.level, rawLevel2);
                bestLevelRunRef.current = Math.max(bestLevelRunRef.current, eRef.level);
                drillAudio.playHit();
                
                const w = eRef.logicalWidth;
                const h = eRef.logicalHeight;
                spawnTargetSet(w, h, eRef.level, eRef.combo);
              } else {
                drillAudio.playHit();
              }

              createExplosion(hitTarget.x, hitTarget.y, '#f59e0b');
              createHitMarker(ch.x, ch.y);
              setUiScore(eRef.score);

            } else {
              // SEQUENCE ERROR (Wrong target clicked)
              eRef.sequenceErrors++;
              if (drillPenalty.isEnabled()) eRef.timeLeft -= TIME_PENALTY;
              eRef.combo = 0;
              eRef.screenShake = 8;
              triggerFlash();
              drillAudio.playPenalty();
              createExplosion(hitTarget.x, hitTarget.y, '#ef4444');
            }
          } else {
            // MISS (Empty space clicked)
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
  }, [gameState, pointerLocked, universalSens, triggerFlash, resumeDrill, spawnTargetSet]);

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
            bCtx.strokeStyle = 'rgba(245, 158, 11, 0.04)';
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

      // Draw Targets
      if (gameState === 'playing' || gameState === 'start') {
        e.targets.forEach((t) => {
          ctx.save();

          drawPulseRing(
            ctx, t.x, t.y, t.radius,
            `rgba(245, 158, 11, ${t.val})`,
            ((time / 1600) + t.seed) % 1
          );

          const g = ctx.createRadialGradient(
            t.x - t.radius * 0.35, t.y - t.radius * 0.35, t.radius * 0.1,
            t.x, t.y, t.radius
          );
          g.addColorStop(0,    `rgba(255, 214, 138, ${t.val})`);
          g.addColorStop(0.55, `rgba(245, 158, 11,  ${t.val})`);
          g.addColorStop(1,    `rgba(154, 71,  8,   ${t.val})`);
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(t.x, t.y, t.radius, 0, Math.PI * 2);
          ctx.fill();

          ctx.strokeStyle = `rgba(253, 230, 138, ${t.val * 0.9})`;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(t.x, t.y, t.radius - 1, 0, Math.PI * 2);
          ctx.stroke();

          ctx.restore();
        });
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

      // Draw Crosshair
      const ch = e.crosshair;
      if (ch.initialized && (gameState === 'playing' || gameState === 'start')) {
        const activeColor = pointerLocked ? '#f59e0b' : '#3b82f6';
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
  }, [gameState, pointerLocked, endGame]);

  const shareScore = useCallback(async () => {
    const url = 'https://skilldrills.online/drills/fps/target-acquisition';
    try {
      const canvas = generateShareCard({
        score: uiScore,
        bestScore,
        accuracy: analytics.accuracy,
        bestCombo: analytics.maxCombo,
        rating: { letter: analytics.grade?.letter || 'C', label: analytics.grade?.label || 'Keep Going', emoji: '🎯' },
        newBest: isNewBest,
        drillName: 'Target Acquisition Pro',
        playerName: getPlayerName(),
      });
      await shareScoreCard(url, canvas);
    } catch (e) {
      const text = `🎯 I scored ${uiScore} PTS (Level ${analytics.finalLevel}) on Target Acquisition Pro! Accuracy: ${analytics.accuracy}%. Practice visual target selection at skilldrills.online!`;
      if (typeof navigator !== 'undefined' && navigator.share) {
        navigator.share({ title: 'My Reflex Score', text, url }).catch(() => {});
      } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
        navigator.clipboard.writeText(text);
        alert('Score card copied to clipboard!');
      }
    }
  }, [uiScore, bestScore, analytics, isNewBest]);

  const accuracy = gameState === 'gameOver' ? analytics.accuracy : (engine.current.totalClicks > 0 ? Math.round((engine.current.correctHits / engine.current.totalClicks) * 100) : 100);

  return (
    <div className="min-h-screen bg-[#050508] text-white flex flex-col font-sans select-none">
      {/* ── MAIN CONTENT AREA ── */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6 flex flex-col gap-6">
        {/* Title */}
        {!isFullscreen && (
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              TARGET ACQUISITION PRO
              <span data-seo-kw="1" className="block text-sm font-semibold text-slate-400 mt-1 normal-case tracking-normal">
                Target Acquisition Trainer
              </span>
            </h1>
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
              <div className={`text-lg sm:text-xl font-black tabular-nums ${uiTimeLeft <= 10 ? "text-red-400 animate-pulse" : "text-white"}`}>{uiTimeLeft}s</div>
            </div>
            <div className="bg-[#0d0d18] border border-white/5 rounded-xl p-2.5 text-center">
              <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Accuracy</div>
              <div className="text-lg sm:text-xl font-black text-amber-400 tabular-nums">{accuracy}%</div>
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
          className={`overflow-hidden flex flex-col transition-all duration-150 select-none bg-[#080811] text-white ${
            isFullscreen 
              ? "fixed inset-0 z-[100] w-screen h-[100dvh] bg-[#080811] rounded-none border-none flex flex-col items-center justify-center" 
              : "w-full rounded-2xl bg-[#080811] aspect-video min-h-[460px] sm:min-h-[500px] max-h-[88vh] relative overflow-hidden flex flex-col"
          }`}
          style={{ touchAction: gameActiveRef.current ? 'none' : 'auto' }}
        >
          {/* DOM Flash Overlay (Red only) */}
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
                {soundEnabled ? <Volume2 className="w-4 h-4 text-amber-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
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
                <AlertCircle className="w-12 h-12 text-amber-400 mx-auto mb-3" />
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
              accent="amber"
              title="Target Acquisition Pro"
              subtitle="Visual Discrimination Speed • Endless Level Progression"
              rules={[
                { icon: Target, accent: "amber", title: "Objective (+100 PTS)", text: "Click Brightest Target First" },
                { icon: AlertCircle, accent: "red", title: "Failure Rule", text: penaltyEnabled ? "Wrong Click / Miss → Resets Combo, -0.6s" : "Wrong Click / Miss → Resets Combo" },
              ]}
              sensitivity={{ value: universalSens, onChange: setUniversalSens, cmPer360 }}
              stats={[
                { icon: Trophy, label: "Best Score", value: bestScore, color: "text-white", accent: "slate" },
                { icon: Flame, label: "Best Combo", value: `${bestCombo}x`, color: "text-amber-400", accent: "amber" },
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
              accent="amber"
              grade={analytics.grade}
              score={uiScore}
              isNewBest={isNewBest}
              stats={[
                { value: analytics.accuracy, suffix: "%", label: "Accuracy" },
                { value: analytics.setsCleared, label: "Sets Cleared" },
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
                  <div key={i} className="bg-[#05060b] border border-gray-800 rounded-xl p-4">
                    <h4 className="text-xs font-bold text-gray-200 mb-1">{item.title}</h4>
                    <p className="text-xs text-gray-400 leading-relaxed">{item.text}</p>
                  </div>
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
                  <div key={i} className="bg-[#05060b] border border-gray-800 rounded-xl p-5 hover:border-gray-700 transition-colors">
                    <h4 className="text-sm font-bold text-gray-200 mb-2">{item.q}</h4>
                    <p className="text-xs text-gray-400 leading-relaxed">{item.a}</p>
                  </div>
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
                  className="group bg-[#0c0c16] border border-white/5 hover:border-amber-500/40 rounded-xl p-3.5 transition-all duration-200 hover:-translate-y-0.5 flex flex-col justify-between"
                >
                  <div>
                    <div className="text-[10px] font-bold text-amber-400 uppercase tracking-wider mb-1">{drill.cat}</div>
                    <div className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors">{drill.name}</div>
                    <div className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">{drill.desc}</div>
                  </div>
                  <div className="text-[10px] font-bold text-slate-500 group-hover:text-amber-400 mt-3 flex items-center gap-1 transition-colors">
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