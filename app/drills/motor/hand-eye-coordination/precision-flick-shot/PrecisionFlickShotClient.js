'use client';
import { isIdleFrameSkippable } from '@/lib/performance';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';

import { 
  Activity, AlertCircle, ArrowRight, Brain, ChevronRight, 
  Crosshair, Eye, GraduationCap, Info, Lightbulb, 
  Play, Target, Timer, TrendingUp, Trophy, 
  Volume2, VolumeX, Flame, Award,
  Shield, Users, Zap, ZapOff
} from 'lucide-react';

import generateShareCard, { shareScoreCard } from '../../../../../components/ShareScoreCard';
import { getPlayerName } from '../../../../../lib/leaderboard';
import { drillAudio } from '../../../../../lib/drillAudio';
import { drillFlash } from '../../../../../lib/drillFlash';
import { drillTimeout } from '../../../../../lib/drillTimeout';
import { drillPenalty } from '../../../../../lib/drillPenalty';
import { getStartLevel, getDifficultyProgress, ramp } from '../../../../../lib/drillDifficulty';
import { getComboMultiplier, getFpsScoreGrade } from '../../../../../lib/scoringEngine';
import { createBackdropCache, getCanvasDpr, drawPulseRing, drawTacticalTarget } from '../../../../../lib/canvasFx';
import useUnexpectedExitGuard from '../../../../../lib/useUnexpectedExitGuard';
import DrillFooter from '../../../../../components/drill/DrillFooter';
import DrillCountdown from '../../../../../components/drill/DrillCountdown';
import DrillAccordion from '../../../../../components/drill/DrillAccordion';
import FpsStartCard from '../../../../../components/drill/FpsStartCard';
import DrillResultCard from '../../../../../components/drill/DrillResultCard';
import useImmersiveMode from '@/lib/useImmersiveMode';

// ============================================================
// TUNING CONSTANTS
// ============================================================
const DRILL_DURATION = 45; // starting clock only; a run grows past this
const POINTS_PER_LEVEL = 1400; // 200 -> 1400 (7x)
const ELITE_SCORE = 51000; // 17000 -> 51000 (3x)
const TIME_PER_HIT = 0.6; // +0.6s on clean hit
const TIME_PENALTY = 0.8; // opt-in on miss or timeout
const STORAGE_KEY = 'skilldrills_motor_precision_flick_shot_v3';

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
    maxRadius: Math.max(10, ramp(36, 16, p) * (1 - heat * 0.15)),
    decayRate: ramp(18, 65, p) * (1 + heat * 0.20),
    targetCount: 2
  };
};

// ============================================================
// ACCORDION DATA
// ============================================================
const RULES_ITEMS = [
  { title: "Bulls-eye Hit", text: "Score +200 PTS × Combo (+0.6s) for hitting the inner 8px center ring." },
  { title: "Standard Hit", text: "Score +100 PTS × Combo (+0.6s) for hitting outer target ring." },
  { title: "Level Progression", text: "Level up every 1400 PTS. Targets shrink & decay faster dynamically." },
  { title: "Miss / Timeout", text: "Missing shots or letting targets decay resets combo streak and deducts time when enabled." }
];

const ABOUT_TEXT = `Precision Flick Shot Training is a high-speed motor drill engineered to refine mouse flick accuracy, target acquisition speed, and center-click timing.

By training your hand to rapidly snap to target coordinates and stop cleanly over target centers, you condition muscle memory for instant headshot acquiring in competitive FPS games.

As your score rises, target hitboxes shrink and decay rates accelerate dynamically, continuously pushing your spatial flick speed ceiling.`;

const FAQ_ITEMS = [
  { q: "What is the Precision Flick Shot Trainer?", a: "The Precision Flick Shot Trainer is an advanced motor drill engineered to test and improve mouse flick accuracy, target acquisition speed, and center-click timing." },
  { q: "How does flick shot training improve FPS aim?", a: "By training your hand to rapidly snap to target coordinates and stop cleanly before clicking, you build refined muscle memory for flicking in tactical shooters." },
  { q: "Does flick accuracy training help Valorant and CS2 players?", a: "Yes, opening duels and headshots in Valorant and CS2 rely heavily on fast micro-flicks and precise crosshair placement trained in this drill." },
  { q: "How does difficulty scale in this trainer?", a: "Every 1400 points earned advances your level without cap, shrinking target hitboxes and accelerating target decay rates — two targets stay active on screen throughout." },
  { q: "What is the Bulls-eye mechanic?", a: "Clicking within the inner 8-pixel center of a target awards double points (+200 PTS) and spawns yellow spark effects." },
  { q: "What happens when you miss a click?", a: "Clicking empty space or letting a target decay out resets your combo multiplier to zero and triggers a red error flash. When the optional Time Penalty is enabled, 0.8s is deducted." },
  { q: "How is flick accuracy calculated?", a: "Accuracy is calculated as total target hits divided by total clicks, displayed as a real-time percentage." },
  { q: "Does this trainer support raw mouse input sensitivity?", a: "Yes, the Universal Sens slider allows you to match your raw input multiplier and cm/360 sensitivity setting." },
  { q: "Is this precision flick shot drill free?", a: "Yes, the drill is 100% free with no sign-ups or downloads required, running directly in modern web browsers." },
  { q: "How do combo multipliers work?", a: "Sustaining consecutive target hits without missing builds combo multipliers up to 3.0x bonus points per successful flick." },
  { q: "Does this drill support touch screen input?", a: "This drill requires pointer-lock mouse input for crosshair control, so it is not playable on touch-only phones or tablets. Use a desktop or laptop with a mouse for the full experience." },
  { q: "How long should I train flick accuracy daily?", a: "A 10-15 minute daily session before competitive gaming helps calibrate hand-eye coordination and spatial snapping accuracy." },
  { q: "How is high performance maintained during gameplay?", a: "The canvas engine utilizes cached backdrop grid rendering and hardware-accelerated requestAnimationFrame loops for smooth 60+ FPS performance." },
  { q: "What is the best technique for high flick scores?", a: "Focus on smooth deceleration so your cursor stops directly over the target center rather than over-shooting past the edges." },
  { q: "How does the session timer work?", a: "Each session starts with 45 seconds on the clock. Clean target hits add +0.6s to extend your run. When the optional Time Penalty setting is enabled, misses and expirations deduct 0.8s." }
];

const RELATED_DRILLS = [
  { id: "aim-trainer", name: "Aim Trainer Elite", cat: "Motor Coordination", desc: "Score-based dynamic target acquisition drill.", href: "/drills/motor/hand-eye-coordination/aim-trainer" },
  { id: "steady-hand", name: "Steady Hand Trainer", cat: "Motor Control", desc: "Improve fine motor mouse control and stability.", href: "/drills/motor/precision-control/steady-hand" },
  { id: "flick-shot-training", name: "Pro Flick Trainer", cat: "FPS Flicking", desc: "Snap to targets in time-attack mode with precision flicking.", href: "/drills/fps/flick-shot-training" },
  { id: "target-switching-swarm", name: "Target Switching", cat: "FPS Multi-Kill", desc: "Flick and track target arrays rapidly.", href: "/drills/fps/target-switching-swarm" },
  { id: "drag-and-drop", name: "Drag & Drop Precision", cat: "Motor Coordination", desc: "Master mouse spatial drag control and release timing.", href: "/drills/motor/hand-eye-coordination/drag-and-drop" },
  { id: "rapid-tapping", name: "Rapid Tapping", cat: "Motor Speed", desc: "Boost physical clicking speed and stamina.", href: "/drills/motor/movement-speed/rapid-tapping" }
];

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function PrecisionFlickShotClient() {
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
    accuracy: 100, hits: 0, bullseyes: 0, misses: 0, 
    bestCombo: 0, levelReached: 1, grade: null
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
    activeIndex: 0,
    spawnTimer: 0,
    score: 0, level: 1, combo: 0, bestCombo: 0, timeLeft: DRILL_DURATION,
    hits: 0, bullseyes: 0, misses: 0, totalClicks: 0,
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

  const createHitMarker = useCallback((x, y) => {
    engine.current.hitMarkers.push({ x, y, life: 1.0 });
  }, []);

  const createExplosion = useCallback((x, y, color) => {
    for (let i = 0; i < 10; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1.0 + Math.random() * 3.5;
      engine.current.particles.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 0.8,
        color
      });
    }
  }, []);

  const spawnTarget = useCallback((w, h, cfg, existingTargets = []) => {
    const pad = cfg.maxRadius + 40;
    let x = pad + Math.random() * Math.max(10, w - pad * 2);
    let y = pad + Math.random() * Math.max(10, h - pad * 2);

    for (let attempts = 0; attempts < 12; attempts++) {
      let tooClose = false;
      for (const other of existingTargets) {
        if (other && Math.hypot(x - other.x, y - other.y) < cfg.maxRadius * 3) {
          tooClose = true;
          break;
        }
      }
      if (!tooClose) break;
      x = pad + Math.random() * Math.max(10, w - pad * 2);
      y = pad + Math.random() * Math.max(10, h - pad * 2);
    }

    return {
      id: Math.random().toString(36).substring(2, 9),
      x,
      y,
      maxRadius: cfg.maxRadius,
      radius: cfg.maxRadius,
      decayRate: cfg.decayRate
    };
  }, []);

  // Touch Device Detection & Storage Loading
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setSoundEnabled(drillAudio.isEnabled());
      setFlashEnabled(drillFlash.isEnabled());
      setPenaltyEnabled(drillPenalty.isEnabled());
      const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
      const isTouchCapable = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      setIsTouchOnlyDevice(isTouchCapable && !hasFinePointer);

      try {
        const savedSens = localStorage.getItem('precisionFlick_sens');
        if (savedSens) setUniversalSens(parseFloat(savedSens));
      } catch (e) {}

      const saved = getSavedData();
      setBestScore(saved.bestScore || 0);
      setBestCombo(saved.bestCombo || 0);
      setBestLevel(saved.bestLevel || 1);
    }
  }, []);

  // Cleanup Countdown Timeouts
  useEffect(() => {
    return () => {
      countdownTimeoutsRef.current.forEach(clearTimeout);
    };
  }, []);

  useEffect(() => {
    if (gameState !== 'playing') {
      try { localStorage.setItem('precisionFlick_sens', universalSens.toString()); } catch (e) {}
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

  // End Game Management
  const endGame = useCallback(() => {
    gameActiveRef.current = false;
    startingRef.current = false;
    setGameState('gameOver');
    if (document.pointerLockElement) document.exitPointerLock();
    
    const e = engine.current;
    const totalAttempts = e.totalClicks;
    const finalAccuracy = totalAttempts > 0 ? Math.round((e.hits / totalAttempts) * 100) : 0;
    const peakLevel = Math.floor(bestLevelRunRef.current);
    const rating = getFpsScoreGrade(e.score, ELITE_SCORE);
    const grade = { letter: rating.grade, label: rating.label, color: rating.color };

    setAnalytics({
      accuracy: finalAccuracy, hits: e.hits, bullseyes: e.bullseyes, misses: e.misses,
      bestCombo: e.bestCombo, levelReached: peakLevel,
      grade
    });

    setUiScore(e.score);

    const prevSaved = getSavedData();
    const isNewHigh = e.score > prevSaved.bestScore;
    setIsNewBest(isNewHigh);

    const runBestLevel = Math.max(prevSaved.bestLevel, peakLevel);
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
      accuracy: 100, hits: 0, bullseyes: 0, misses: 0,
      bestCombo: 0, levelReached: startLevel, grade: null
    });

    const w = engine.current.logicalWidth || 800;
    const h = engine.current.logicalHeight || 450;
    const config = getLevelConfig(startLevel, 0);

    const targetA = spawnTarget(w, h, config, []);
    const targetB = spawnTarget(w, h, config, [targetA]);

    engine.current = {
      crosshair: { ...engine.current.crosshair },
      targets: [targetA, targetB],
      activeIndex: 0,
      spawnTimer: 0,
      score: 0, level: startLevel, combo: 0, bestCombo: 0, timeLeft: DRILL_DURATION,
      hits: 0, bullseyes: 0, misses: 0, totalClicks: 0,
      particles: [], hitMarkers: [], screenShake: 0, logicalWidth: w, logicalHeight: h
    };

    setIsFullscreen(true);

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
      if (canvasRef.current && !document.pointerLockElement) {
        canvasRef.current.requestPointerLock().catch(() => {});
      }
    }, 2450);

    countdownTimeoutsRef.current = [t1, t2, t3, t4];
  }, [spawnTarget]);

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
          let hitIndex = -1;
          let isBullseye = false;

          eRef.totalClicks++;

          for (let i = 0; i < eRef.targets.length; i++) {
            const tgt = eRef.targets[i];
            const dist = Math.hypot(ch.x - tgt.x, ch.y - tgt.y);
            if (dist <= tgt.radius + 6) {
              hitIndex = i;
              if (dist <= 8) isBullseye = true;
              break;
            }
          }

          if (hitIndex !== -1) {
            const hitTgt = eRef.targets[hitIndex];
            eRef.hits++;
            if (isBullseye) eRef.bullseyes++;
            eRef.combo++;
            if (eRef.combo > eRef.bestCombo) eRef.bestCombo = eRef.combo;

            const basePoints = isBullseye ? 200 : 100;
            const levelMult = 1 + getDifficultyProgress(eRef.level) * 0.5;
            eRef.score += Math.round(basePoints * getComboMultiplier(eRef.combo) * levelMult);
            eRef.timeLeft += TIME_PER_HIT;

            const rawLevel = (eRef.score / POINTS_PER_LEVEL) + 1;
            eRef.level = Math.max(eRef.level, rawLevel);
            bestLevelRunRef.current = Math.max(bestLevelRunRef.current, eRef.level);

            drillAudio.playHit();
            createExplosion(hitTgt.x, hitTgt.y, isBullseye ? '#eab308' : '#06b6d4');
            createHitMarker(ch.x, ch.y);
            setUiScore(eRef.score);

            const cfg = getLevelConfig(eRef.level, eRef.combo);
            const remainingIdx = 1 - hitIndex;
            const remainingTgt = eRef.targets[remainingIdx];

            // Respawn the hit target cleanly without overlapping
            eRef.targets[hitIndex] = spawnTarget(eRef.logicalWidth, eRef.logicalHeight, cfg, [remainingTgt]);

            // If player hit the active shrinking target, switch active target to standby target!
            if (hitIndex === eRef.activeIndex) {
              eRef.activeIndex = remainingIdx;
            }
          } else {
            eRef.misses++;
            eRef.combo = 0;
            eRef.screenShake = 6;
            triggerFlash();
            drillAudio.playPenalty();
            createExplosion(ch.x, ch.y, '#ef4444');
            if (drillPenalty.isEnabled()) eRef.timeLeft -= TIME_PENALTY;
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
  }, [gameState, pointerLocked, universalSens, triggerFlash, createExplosion, createHitMarker, spawnTarget, resumeDrill]);

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

        const config = getLevelConfig(e.level, e.combo);

        // Ensure 2 targets stay on screen at all times
        while (e.targets.length < 2) {
          e.targets.push(spawnTarget(w, h, config, e.targets));
        }

        if (e.activeIndex === undefined || e.activeIndex < 0 || e.activeIndex >= e.targets.length) {
          e.activeIndex = 0;
        }

        // Primary target shrinks at 100% rate
        const activeIdx = e.activeIndex;
        const activeTgt = e.targets[activeIdx];

        // Secondary target ALSO shrinks with a slight time delay (at ~58% rate)
        const secondaryIdx = 1 - activeIdx;
        const secondaryTgt = e.targets[secondaryIdx];

        if (activeTgt && drillTimeout.isEnabled()) {
          activeTgt.radius -= activeTgt.decayRate * dt;
        }

        if (secondaryTgt && drillTimeout.isEnabled()) {
          secondaryTgt.radius -= (secondaryTgt.decayRate * 0.58) * dt;
        }

        // Expiration check for active target
        if (activeTgt && drillTimeout.isEnabled() && activeTgt.radius <= 4) {
          e.combo = 0;
          e.screenShake = 6;
          triggerFlash();
          drillAudio.playPenalty();
          createExplosion(activeTgt.x, activeTgt.y, '#ef4444');
          if (drillPenalty.isEnabled()) e.timeLeft -= TIME_PENALTY;

          // Respawn expired active target
          e.targets[activeIdx] = spawnTarget(w, h, config, [secondaryTgt]);
          // Secondary target becomes the new primary shrinking target!
          e.activeIndex = secondaryIdx;
        } else if (secondaryTgt && drillTimeout.isEnabled() && secondaryTgt.radius <= 4) {
          // Secondary target expired
          e.combo = 0;
          e.screenShake = 6;
          triggerFlash();
          drillAudio.playPenalty();
          createExplosion(secondaryTgt.x, secondaryTgt.y, '#ef4444');
          if (drillPenalty.isEnabled()) e.timeLeft -= TIME_PENALTY;

          // Respawn expired secondary target
          e.targets[secondaryIdx] = spawnTarget(w, h, config, [activeTgt]);
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
        for (let i = 0; i < e.targets.length; i++) {
          const tgt = e.targets[i];
          const isActive = (i === e.activeIndex);
          const progress = Math.max(0, Math.min(1, 1 - (tgt.radius / tgt.maxRadius)));
          const targetColor = e.combo >= 10 ? '#38bdf8' : (isActive ? '#00ff88' : '#38bdf8');

          drawPulseRing(ctx, tgt.x, tgt.y, tgt.radius, targetColor, progress);
          drawTacticalTarget(ctx, tgt.x, tgt.y, tgt.radius, targetColor, isActive);
        }
      }

      ctx.lineWidth = 2.0;
      for (let i = e.hitMarkers.length - 1; i >= 0; i--) {
        const hm = e.hitMarkers[i];
        hm.life -= dt * 4.5;
        if (hm.life <= 0) { e.hitMarkers.splice(i, 1); continue; }
        ctx.globalAlpha = hm.life; ctx.strokeStyle = '#22d3ee';
        const s = 6 + (1 - hm.life) * 8;
        ctx.beginPath();
        ctx.moveTo(hm.x - s, hm.y - s); ctx.lineTo(hm.x + s, hm.y + s);
        ctx.moveTo(hm.x + s, hm.y - s); ctx.lineTo(hm.x - s, hm.y + s);
        ctx.stroke();
      }
      ctx.globalAlpha = 1.0;

      const ch = e.crosshair;
      if (ch.initialized && (gameState === 'playing' || gameState === 'start')) {
        const activeColor = pointerLocked ? '#06b6d4' : '#eab308';
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
  }, [gameState, pointerLocked, endGame, triggerFlash, createExplosion, spawnTarget]);

  const shareDrillLink = useCallback(async () => {
    const url = 'https://skilldrills.online/drills/motor/hand-eye-coordination/precision-flick-shot';
    try {
      const canvas = generateShareCard({
        score: uiScore,
        bestScore,
        accuracy: analytics.accuracy,
        bestCombo: analytics.bestCombo,
        rating: { letter: analytics.grade?.letter || 'C', label: analytics.grade?.label || 'Keep Going', emoji: '🎯' },
        newBest: isNewBest,
        drillName: 'Precision Flick Shot',
        playerName: getPlayerName(),
      });
      await shareScoreCard(url, canvas);
    } catch (e) {
      const text = `🎯 I scored ${uiScore} PTS (Level ${analytics.levelReached}) on Precision Flick Shot! Accuracy: ${analytics.accuracy}%. Test your reflexes at skilldrills.online!`;
      if (typeof navigator !== 'undefined' && navigator.share) {
        navigator.share({ title: 'My Precision Flick Shot Score', text, url }).catch(() => {});
      } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
        navigator.clipboard.writeText(text);
        alert('Score card copied to clipboard!');
      }
    }
  }, [uiScore, bestScore, analytics, isNewBest]);

  return (
    <div className="min-h-screen bg-[#050508] text-white flex flex-col font-sans select-none">
      {/* ── MAIN CONTENT AREA ── */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6 flex flex-col gap-6">
        {/* Title */}
        {!isFullscreen && (
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white uppercase">
              Precision Flick Shot
              <span data-seo-kw="1" className="block text-sm font-semibold text-slate-400 mt-1 normal-case tracking-normal">
                Mouse Accuracy Test
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
              <div className="text-lg sm:text-xl font-black text-cyan-400 tabular-nums">{analytics.accuracy}%</div>
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
                {soundEnabled ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
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
                <AlertCircle className="w-12 h-12 text-cyan-400 mx-auto mb-3" />
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
              icon={Crosshair}
              accent="cyan"
              title="Precision Flick Shot"
              subtitle="Target Decay & Bulls-Eye Micro-Flicks • Endless Level Progression"
              rules={[
                { icon: Target, accent: "emerald", title: "Bulls-eye Hit (+200 PTS)", text: "Micro-flick to target centers for double bonus points (+0.6s)" },
                { icon: Zap, accent: "red", title: "Miss / Timeout Penalty", text: penaltyEnabled ? "Missing or target decay expiration resets combo & deducts 0.8s" : "Missing or target decay expiration resets combo streak" },
              ]}
              sensitivity={{ value: universalSens, onChange: setUniversalSens, cmPer360 }}
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

          {/* END SCREEN — Universal Result Card */}
          {gameState === 'gameOver' && analytics.grade && (
            <DrillResultCard
              accent="cyan"
              grade={analytics.grade}
              score={uiScore}
              isNewBest={isNewBest}
              stats={[
                { value: analytics.accuracy, suffix: "%", label: "Accuracy" },
                { value: analytics.hits, label: "Target Hits" },
                { value: analytics.bullseyes, label: "Bulls-eyes" },
                { value: `Lv. ${analytics.levelReached}`, label: "Peak Level" },
              ]}
              onPlayAgain={enterDrill}
              onShare={shareDrillLink}
              onExit={handleExitDrill}
            />
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
              title="About Precision Flick Shot"
              isOpen={openAccordion === 'about'}
              onToggle={() => setOpenAccordion(openAccordion === 'about' ? null : 'about')}
            >
              <div className="space-y-4">
                <p className="text-xs text-gray-300 leading-relaxed">{ABOUT_TEXT}</p>
              </div>
            </DrillAccordion>

            <DrillAccordion
              id="faq"
              title="Frequently Asked Questions"
              isOpen={openAccordion === 'faq'}
              onToggle={() => setOpenAccordion(openAccordion === 'faq' ? null : 'faq')}
            >
              <div className="space-y-4">
                {FAQ_ITEMS.map((item, idx) => (
                  <div key={idx} className="border-b border-gray-800/80 pb-3 last:border-0 last:pb-0">
                    <h5 className="text-xs font-bold text-white mb-1">{item.q}</h5>
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
              Related Motor &amp; FPS Drills
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {RELATED_DRILLS.map((drill) => (
                <Link
                  key={drill.id}
                  href={drill.href}
                  className="group bg-[#0c0c16] border border-white/5 hover:border-cyan-500/40 rounded-xl p-3.5 transition-all duration-200 hover:-translate-y-0.5 flex flex-col justify-between"
                >
                  <div>
                    <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider mb-1">{drill.cat}</div>
                    <div className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">{drill.name}</div>
                    <div className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">{drill.desc}</div>
                  </div>
                  <div className="text-[10px] font-bold text-slate-500 group-hover:text-cyan-400 mt-3 flex items-center gap-1 transition-colors">
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