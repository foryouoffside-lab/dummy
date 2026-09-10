'use client';
import { isIdleFrameSkippable } from '@/lib/performance';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';

import {
  Activity, AlertCircle, ArrowRight, ChevronRight, Crosshair,
  Eye, GraduationCap, RefreshCw, Target,
  Timer, TrendingUp, Volume2, VolumeX,
  Share2, LogOut,
  Award, Shield, Users, Zap, ZapOff
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
import { createBackdropCache, getCanvasDpr, drawPulseRing, drawTacticalTarget } from '../../../../lib/canvasFx';
import DrillFooter from '../../../../components/drill/DrillFooter';
import DrillCountdown from '../../../../components/drill/DrillCountdown';
import DrillAccordion from '../../../../components/drill/DrillAccordion';
import FpsStartCard from '../../../../components/drill/FpsStartCard';
import DrillResultCard from '../../../../components/drill/DrillResultCard';
import useUnexpectedExitGuard from '../../../../lib/useUnexpectedExitGuard';
import useImmersiveMode from '@/lib/useImmersiveMode';

// ============================================================
// TUNING CONSTANTS
// ============================================================
const DRILL_DURATION = 45; // starting clock only; a run grows past this
const POINTS_PER_LEVEL = 1400; // 200 -> 1400 (7x)
const ELITE_SCORE = 54000; // 18000 -> 54000 (3x)
const TIME_PER_HIT = 0.4; // +0.4s on target destruction
const TIME_PENALTY = 0.6; // opt-in on target dropped past bottom boundary
const STORAGE_KEY = 'skilldrills_fps_vertical_air_track_v3';

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
    radius:       Math.max(10, ramp(32, 12, p) * (1 - heat * 0.15)),
    gravity:      ramp(700, 1100, p) * (1 + heat * 0.15),
    power:        ramp(650, 950, p) * (1 + heat * 0.15),
    evasionProb:  Math.min(0.85, 0.15 + p * 0.65 + heat * 0.10),
    maxHp:        100,
    damageRate:   Math.max(120, ramp(300, 140, p) * (1 - heat * 0.15)),
  };
};

// ============================================================
// ACCORDION DATA
// ============================================================
const RULES_ITEMS = [
  { num: "1", text: "Airborne Target", highlight: "Destroy Target (+100 PTS / +0.4s)", result: "Track Parabolic Trajectory" },
  { num: "2", text: "Height Bonus", highlight: "Up to +75 PTS", result: "Higher Destructions Award More Points" },
  { num: "3", text: "Failure Rule", highlight: "Failure Penalty", result: "Dropping target resets combo streak (-0.6s with Time Penalty enabled)" },
  { num: "4", text: "Level Progression", highlight: "+1 Level / 1400 PTS", result: "Continuous Dynamic Gravity & Speed" }
];

const ABOUT_INTRO = [
  "Vertical Air-Track trains the specialized eye-hand tracking mechanics required to hit airborne targets moving in parabolic, gravity-governed trajectories.",
  "By practicing continuous Y-axis tracking against erratic upward evasions, players develop smooth vertical mouse control essential for Apex Legends, Overwatch 2, and Halo Infinite."
];

const ABOUT_CARDS = [
  { icon: Users, iconBg: "bg-red-600", title: "Who Should Use This?", text: "FPS players in movement shooters (Apex, Overwatch 2, Halo) who struggle to track jump-padded, grappled, or airborne opponents." },
  { icon: TrendingUp, iconBg: "bg-fuchsia-600", title: "Skills Trained", text: "Y-axis smooth pursuit, gravity prediction, vertical velocity matching, and mid-air evasion compensation." },
  { icon: Zap, iconBg: "bg-orange-600", title: "Why It Is Difficult", text: "Human wrists naturally track horizontally with ease, but vertical smooth pursuit requires whole-arm and fingertip micro-repositioning." }
];

const ABOUT_SECTIONS = [
  {
    icon: Eye,
    title: "The Geometry of Airborne Fights",
    paragraphs: [
      "Airborne opponents change vertical velocity continuously under gravity. Training vertical pursuit conditions your tracking arm to decelerate at the apex of a jump and accelerate on the descent."
    ]
  },
  {
    icon: Target,
    title: "Height Advantage Scoring",
    paragraphs: [
      "Eliminating targets while they are high in their jump arc awards up to +75 bonus points. Punish opponents early in their jump trajectory before they hit the ground."
    ]
  }
];



// ============================================================
// MAIN COMPONENT
// ============================================================
export default function VerticalAirTrackClient() {
  const [gameState, setGameState] = useState('start'); // start | countdown | playing | gameOver
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
    accuracy: 100, successfulHits: 0, missedTicks: 0, timeouts: 0, bestCombo: 0,
    levelReached: 1, grade: null
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
    successfulHits: 0, timeouts: 0, totalTicks: 0, onTargetTicks: 0,
    combo: 0, bestCombo: 0, isFiring: false,
    particles: [], hitMarkers: [], screenShake: 0, lastShotTime: 0,
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
    const radius = cfg.radius;
    const gravity = cfg.gravity;
    const power = cfg.power;

    const x = width * (0.2 + Math.random() * 0.6);
    const y = height + radius + 15;
    const vx = (Math.random() - 0.5) * (power * 0.45);
    const vy = -(power + Math.random() * 120);

    return {
      id: Math.random(),
      x,
      y,
      vx,
      vy,
      radius,
      maxHp: cfg.maxHp,
      hp: cfg.maxHp,
      gravity,
      color: '#ef4444',
      spawnTime: performance.now(),
      nextEvasionTime: performance.now() + 800 + Math.random() * 600
    };
  }, []);

  const createExplosion = useCallback((x, y, color) => {
    const e = engine.current;
    for (let i = 0; i < 15; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1.5 + Math.random() * 4.5;
      e.particles.push({ x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, life: 1.0, color });
    }
  }, []);

  const createSparks = useCallback((x, y) => {
    const e = engine.current;
    for (let i = 0; i < 3; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1 + Math.random() * 3;
      e.particles.push({ x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed - 1, life: 0.7, color: '#38bdf8' });
    }
  }, []);

  const createHitMarker = useCallback((x, y) => {
    engine.current.hitMarkers.push({ x, y, life: 1.0 });
  }, []);

  const endGame = useCallback(() => {
    startingRef.current = false;
    setGameState('gameOver');
    drillAudio.playSessionEnd();
    if (document.pointerLockElement) document.exitPointerLock();

    const e = engine.current;
    const finalAccuracy = e.totalTicks > 0 ? Math.round((e.onTargetTicks / e.totalTicks) * 100) : 100;
    const missedTicks = e.totalTicks - e.onTargetTicks;
    const peakLevel = Math.floor(bestLevelRunRef.current);
    const grade = getFpsScoreGrade(e.score, ELITE_SCORE);

    setAccuracy(finalAccuracy);
    setAnalytics({
      accuracy: finalAccuracy,
      successfulHits: e.successfulHits,
      missedTicks,
      timeouts: e.timeouts,
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
      targets: [spawnTarget(w, h, startLvl, 0)],
      level: startLvl,
      score: 0,
      timeLeft: DRILL_DURATION,
      successfulHits: 0,
      timeouts: 0,
      totalTicks: 0,
      onTargetTicks: 0,
      combo: 0,
      bestCombo: 0,
      isFiring: false,
      particles: [],
      hitMarkers: [],
      screenShake: 0,
      lastShotTime: 0,
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
  }, [spawnTarget]);

  const handleExitDrill = useCallback(async () => {
    markIntentionalExit();
    countdownTimeoutsRef.current.forEach(clearTimeout);
    startingRef.current = false;
    setIsFullscreen(false);
    if (document.pointerLockElement) document.exitPointerLock();
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

  useEffect(() => {
    const handlePointerLockChange = () => setPointerLocked(document.pointerLockElement === canvasRef.current);
    document.addEventListener('pointerlockchange', handlePointerLockChange);
    return () => document.removeEventListener('pointerlockchange', handlePointerLockChange);
  }, []);

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
      if (!pointerLocked) {
        resumeDrill();
        return;
      }
      engine.current.isFiring = true;
    };

    const handleMouseUp = () => {
      if (gameState === 'playing') {
        engine.current.isFiring = false;
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [gameState, pointerLocked, universalSens, resumeDrill]);

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

        const cfg = getLevelConfig(e.level, e.combo);
        const targetCountRequired = e.level >= 5 ? 2 : 1;
        while (e.targets.length < targetCountRequired) {
          e.targets.push(spawnTarget(width, height, e.level, e.combo));
        }

        // Physics Updates
        for (let i = e.targets.length - 1; i >= 0; i--) {
          const t = e.targets[i];
          t.x += t.vx * dt;
          t.y += t.vy * dt;
          t.vy += t.gravity * dt;

          if (t.x - t.radius < 0) {
            t.x = t.radius;
            t.vx = -t.vx * 0.85;
            createExplosion(t.x, t.y, '#ef4444');
          } else if (t.x + t.radius > width) {
            t.x = width - t.radius;
            t.vx = -t.vx * 0.85;
            createExplosion(t.x, t.y, '#ef4444');
          }

          // Unpredictable Evasions
          if (time >= t.nextEvasionTime && t.y < height * 0.7 && t.vy < 100) {
            if (Math.random() < cfg.evasionProb) {
              const rand = Math.random();
              if (rand < 0.4) {
                t.vy = -350 - Math.random() * 120;
                createExplosion(t.x, t.y, '#38bdf8');
              } else if (rand < 0.75) {
                t.vx = (Math.random() > 0.5 ? 1 : -1) * (350 + Math.random() * 150);
                createExplosion(t.x, t.y, '#c084fc');
              } else {
                t.vy = 400;
                createExplosion(t.x, t.y, '#f87171');
              }
            }
            t.nextEvasionTime = time + 800 + Math.random() * 700;
          }

          // Target dropped past bottom boundary (Timeout)
          if (t.y > height + t.radius + 20) {
            if (!drillTimeout.isEnabled()) {
              t.y = height - t.radius;
              t.vy = -Math.abs(t.vy) * 0.85;
              continue;
            }
            e.timeouts++;
            if (drillPenalty.isEnabled()) e.timeLeft -= TIME_PENALTY;
            e.combo = 0;
            e.screenShake = 10;
            setCombo(0);
            drillAudio.playPenalty();
            triggerFlash();
            e.targets.splice(i, 1);
            continue;
          }
        }

        // Firing logic
        if (e.isFiring) {
          e.totalTicks++;
          const ch = e.crosshair;
          
          let hitTarget = null;
          for (let i = 0; i < e.targets.length; i++) {
            const t = e.targets[i];
            const dist = Math.hypot(ch.x - t.x, ch.y - t.y);
            if (dist <= t.radius) {
              hitTarget = t;
              break;
            }
          }

          if (hitTarget) {
            e.onTargetTicks++;
            hitTarget.hp -= dt * cfg.damageRate;
            createSparks(ch.x, ch.y);

            if (hitTarget.hp > 0 && time - e.lastShotTime > 75) {
              drillAudio.playHit();
              e.lastShotTime = time;
            }

            if (hitTarget.hp <= 0) {
              e.successfulHits++;
              
              const baseScore = 100;
              const yNorm = (height - hitTarget.y) / height;
              let heightBonus = yNorm >= 0.75 ? 75 : yNorm >= 0.50 ? 50 : yNorm >= 0.25 ? 25 : 0;
              
              e.combo++;
              if (e.combo > e.bestCombo) e.bestCombo = e.combo;
              
              const levelMult = 1 + getDifficultyProgress(e.level) * 0.5;
              const gained = Math.round((baseScore + heightBonus) * getComboMultiplier(e.combo) * levelMult);
              e.score += gained;
              e.timeLeft += TIME_PER_HIT; // +0.4s
              
              setScore(e.score);
              setCombo(e.combo);

              const rawLevel = (e.score / POINTS_PER_LEVEL) + 1;
              e.level = Math.max(e.level, rawLevel);
              bestLevelRunRef.current = Math.max(bestLevelRunRef.current, e.level);
              setLevel(Math.floor(e.level));

              drillAudio.playHit();
              createExplosion(hitTarget.x, hitTarget.y, '#00ff88');
              createHitMarker(hitTarget.x, hitTarget.y);
              
              e.targets = e.targets.filter(t => t.id !== hitTarget.id);
            }
          }
        }

        const totalTicks = e.totalTicks;
        if (totalTicks > 0) {
          setAccuracy(Math.round((e.onTargetTicks / totalTicks) * 100));
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

      // Cached backdrop
      if (backdropCacheRef.current) {
        ctx.drawImage(backdropCacheRef.current, 0, 0, width, height);
      } else {
        ctx.fillStyle = '#050508';
        ctx.fillRect(0, 0, width, height);
      }

      // Render Targets
      if (gameState === 'playing' || gameState === 'start') {
        const ch = e.crosshair;
        e.targets.forEach(t => {
          const isHovered = Math.hypot(ch.x - t.x, ch.y - t.y) <= t.radius;
          const targetColor = isHovered ? '#00ff88' : '#ef4444';

          drawPulseRing(ctx, t.x, t.y, t.radius, targetColor, 0.4);
          drawTacticalTarget(ctx, t.x, t.y, t.radius, targetColor, true);

          ctx.save();
          // Health Bar Overlay
          const hbW = t.radius * 1.6;
          const hbH = 4;
          const hbX = t.x - hbW / 2;
          const hbY = t.y - t.radius - 12;

          ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
          ctx.fillRect(hbX, hbY, hbW, hbH);
          
          const hpPct = Math.max(0, t.hp / t.maxHp);
          ctx.fillStyle = isHovered ? '#00ff88' : '#ef4444';
          ctx.fillRect(hbX, hbY, hbW * hpPct, hbH);
          ctx.restore();
        });
      }

      // Laser beam rendering when firing
      if (e.isFiring && (gameState === 'playing' || gameState === 'start') && pointerLocked) {
        const ch = e.crosshair;
        let isHitting = false;
        e.targets.forEach(t => {
          if (Math.hypot(ch.x - t.x, ch.y - t.y) <= t.radius) isHitting = true;
        });

        ctx.beginPath();
        ctx.moveTo(width / 2, height);
        ctx.lineTo(ch.x, ch.y);
        ctx.strokeStyle = isHitting ? 'rgba(0, 255, 136, 0.4)' : 'rgba(239, 68, 68, 0.3)';
        ctx.lineWidth = 6;
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(width / 2, height);
        ctx.lineTo(ch.x, ch.y);
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      // Particles
      for (let i = e.particles.length - 1; i >= 0; i--) {
        const p = e.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= dt * 2.2;
        if (p.life <= 0) { e.particles.splice(i, 1); continue; }
        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, 3, 3);
      }

      // Hit markers
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

      // Crosshair
      const ch = e.crosshair;
      if (ch.initialized && (gameState === 'playing' || gameState === 'start' || gameState === 'countdown')) {
        const activeColor = pointerLocked ? '#ef4444' : '#eab308';
        ctx.fillStyle = activeColor;
        ctx.strokeStyle = activeColor;

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
    const url = 'https://skilldrills.online/drills/fps/vertical-air-track';
    try {
      const canvas = generateShareCard({
        score,
        bestScore,
        accuracy: analytics.accuracy,
        bestCombo: analytics.bestCombo,
        rating: { letter: analytics.grade?.letter || 'C', label: analytics.grade?.label || 'Keep Going', emoji: '🎯' },
        newBest: isNewBest,
        drillName: 'Vertical Air-Track',
        playerName: getPlayerName(),
      });
      await shareScoreCard(url, canvas);
    } catch (e) {
      const text = `🎯 I scored ${score} PTS on Vertical Air-Track! Accuracy: ${analytics.accuracy}%. Master your aerial tracking at skilldrills.online!`;
      if (typeof navigator !== 'undefined' && navigator.share) {
        navigator.share({ title: 'My Vertical Air-Track Score', text, url }).catch(() => {});
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
        {/* Title & Definition Snippet */}
        {!isFullscreen && (
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Vertical Aim Trainer
            </h1>
          </div>
        )}

        {/* Live Stat Cards */}
        {!isFullscreen && (
          <div className="grid grid-cols-4 gap-2 w-full -mb-2">
            {[
              { label: "Score", val: score },
              { label: "Time", val: `${timeLeft}s`, highlight: timeLeft <= 10 },
              { label: "Accuracy", val: `${accuracy}%`, color: "text-red-400" },
              { label: "Best Score", val: bestScore, color: "text-amber-400" },
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
          {flashes.map((f) => (
            <div key={f.id} className="fx-flash fx-flash-red" />
          ))}

          {(gameState === 'playing' || gameState === 'countdown') && (
            <>
              <div className="absolute top-4 left-4 z-30 pointer-events-none">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-white/50">Score</p>
                <p className="text-2xl sm:text-3xl font-bold text-white tabular-nums leading-tight">{score}</p>
              </div>

              <div className="absolute top-4 right-4 z-30 pointer-events-none text-right">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-white/50">Time</p>
                <p className={`text-2xl sm:text-3xl font-bold tabular-nums leading-tight ${timeLeft <= 10 ? "text-red-400" : "text-white"}`}>{timeLeft}s</p>
              </div>
            </>
          )}

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
                {soundEnabled ? <Volume2 className="w-4 h-4 text-red-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
              </button>
            </div>
          )}

          {/* Countdown Overlay */}
          {gameState === 'countdown' && (
            <DrillCountdown value={countdownValue} subtitle="GET READY" />
          )}

          {/* Pause Overlay */}
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
                <p className="text-xs text-gray-300 font-medium">Click to resume — cursor lock will re-engage.</p>
              </div>
            </div>
          )}

          <canvas 
            ref={canvasRef} 
            onClick={() => { if (gameState === 'playing' && !pointerLocked) resumeDrill(); }}
            className={`block absolute top-0 left-0 w-full h-full touch-none z-10 ${gameState === "playing" ? "cursor-none" : ""}`}
          />

          {/* Start Overlay */}
          {gameState === 'start' && (
            <FpsStartCard
              icon={Crosshair}
              accent="redOrange"
              title="Vertical Air-Track"
              subtitle="Hardware Raw Input • Endless Level Progression"
              isTouchOnlyDevice={isTouchOnlyDevice}
              onStart={enterDrill}
            />
          )}

          {/* END SCREEN — Universal Result Card */}
          {gameState === 'gameOver' && analytics.grade && (
            <DrillResultCard
              accent="red"
              grade={analytics.grade}
              score={score}
              isNewBest={isNewBest}
              stats={[
                { value: analytics.accuracy, suffix: "%", label: "Tracking Accuracy" },
                { value: analytics.successfulHits, label: "Targets Destroyed" },
                { value: `${analytics.bestCombo}x`, label: "Max Combo" },
                { value: `Lv. ${analytics.levelReached}`, label: "Peak Level" },
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
            Track targets moving along parabolic vertical trajectories to build smooth vertical tracking precision.
          </p>
        )}

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
              title="About Vertical Air-Track"
              isOpen={openAccordion === 'about'}
              onToggle={() => setOpenAccordion(openAccordion === 'about' ? null : 'about')}
            >
              <div className="space-y-8">
                <section>
                  <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                    <Crosshair className="w-4 h-4 text-red-400" /> What Is Vertical Air-Track?
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-300 mb-3">
                    Vertical aim is tracking a target moving along the Y-axis, usually on a falling arc. Smooth pursuit follows accurately to roughly 30&deg;/s (Krauzlis, 2004), and skilled interceptors predict where a target will be rather than chasing where it currently is (Land &amp; McLeod, 2000).
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
                      <section.icon className="w-4 h-4 text-red-400" /> {section.title}
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