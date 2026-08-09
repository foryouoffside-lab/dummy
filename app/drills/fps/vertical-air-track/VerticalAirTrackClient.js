'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';

import {
  Activity, AlertCircle, ArrowRight, ChevronRight, Crosshair,
  Eye, GraduationCap, RefreshCw, Target,
  Timer, TrendingUp, Trophy, Volume2, VolumeX,
  Flame, Share2, LogOut,
  Award, Shield, Users, Zap
} from 'lucide-react';

import generateShareCard, { shareScoreCard } from '../../../../components/ShareScoreCard';
import { getPlayerName } from '../../../../lib/leaderboard';
import { drillAudio } from '../../../../lib/drillAudio';
import { getStartLevel, getDifficultyProgress, getComboBonusLevel } from '../../../../lib/drillDifficulty';
import { getComboMultiplier, getFpsScoreGrade } from '../../../../lib/scoringEngine';
import { createBackdropCache, getCanvasDpr, drawPulseRing, drawTacticalTarget } from '../../../../lib/canvasFx';
import DrillFooter from '../../../../components/drill/DrillFooter';
import DrillCountdown from '../../../../components/drill/DrillCountdown';
import DrillAccordion from '../../../../components/drill/DrillAccordion';
import FpsStartCard from '../../../../components/drill/FpsStartCard';
import useUnexpectedExitGuard from '../../../../lib/useUnexpectedExitGuard';

const DRILL_DURATION = 45; // 45 seconds focused duration
const POINTS_PER_LEVEL = 200;
const ELITE_SCORE = 17000;
const STORAGE_KEY = 'skilldrills_fps_vertical_air_track_v2';
const OLD_STORAGE_KEY = 'verticalAirTrack_bestScore';

const RELATED_DRILLS = [
  { id: "flick-shot-training", name: "Pro Flick Trainer", cat: "FPS Flicking", desc: "Snap to targets in time-attack mode with precision flicking.", href: "/drills/fps/flick-shot-training" },
  { id: "180-degree-awareness", name: "180° Awareness Pro", cat: "FPS Awareness", desc: "Macro flicks under a forced 180-degree turn and audio cue.", href: "/drills/fps/180-degree-awareness" },
  { id: "recoil-control", name: "Recoil Control", cat: "FPS Recoil", desc: "Calibrate pulling pattern compensation for weapons.", href: "/drills/fps/recoil-control" },
  { id: "angle-hold-trainer", name: "Angle Hold Trainer", cat: "FPS Reaction", desc: "Test crosshair placement reaction speed on tight corners.", href: "/drills/fps/angle-hold-trainer" },
  { id: "instant-response", name: "Instant Response", cat: "FPS Reflex", desc: "Raw reaction speed against a fixed center-screen flash.", href: "/drills/fps/instant-response" },
  { id: "target-acquisition", name: "Target Acquisition", cat: "FPS Precision", desc: "Train rapid target identification and click timing.", href: "/drills/fps/target-acquisition" }
];

const getSavedData = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { bestScore: 0, bestCombo: 0, bestLevel: 1, totalSessions: 0, ...JSON.parse(raw) };
    const legacy = localStorage.getItem(OLD_STORAGE_KEY);
    if (legacy) return { bestScore: parseInt(legacy, 10) || 0, bestCombo: 0, bestLevel: 1, totalSessions: 0 };
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


const getLevelConfig = (level) => {
  const p = getDifficultyProgress(level); // 0 -> 1 across L1..L15
  return {
    radius:       Math.max(12, 32 - p * 20),   // 32 -> 12 px
    gravity:      700 + p * 400,              // 700 -> 1100 px/s²
    power:        650 + p * 300,              // 650 -> 950 px/s
    evasionProb:  0.15 + p * 0.65,            // 0.15 -> 0.80
    maxHp:        100,
    damageRate:   Math.max(140, 300 - p * 160), // Takes longer to kill target at higher level
  };
};

export default function VerticalAirTrackClient() {
  const [gameState, setGameState] = useState('start'); // start | countdown | playing | gameOver
  const [countdownValue, setCountdownValue] = useState(3);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [pointerLocked, setPointerLocked] = useState(false);
  const [openAccordion, setOpenAccordion] = useState(null);
  const [isTouchOnlyDevice, setIsTouchOnlyDevice] = useState(false);
  
  const [universalSens, setUniversalSens] = useState(1.0);

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

  const cmPer360 = (30 / universalSens).toFixed(1);

  useEffect(() => {
    try {
      const savedSens = localStorage.getItem('verticalAirTrack_sens');
      if (savedSens) setUniversalSens(parseFloat(savedSens));
    } catch (e) {}

    const saved = getSavedData();
    setBestScore(saved.bestScore || 0);
    setBestCombo(saved.bestCombo || 0);
    setBestLevel(saved.bestLevel || 1);
  }, []);

  useEffect(() => {
    drillAudio.setEnabled(soundEnabled);
  }, [soundEnabled]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
      const isTouchCapable = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      setIsTouchOnlyDevice(isTouchCapable && !hasFinePointer);
    }
  }, []);

  useEffect(() => {
    return () => countdownTimeoutsRef.current.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (gameState !== 'playing' && gameState !== 'countdown') {
      try { localStorage.setItem('verticalAirTrack_sens', universalSens.toString()); } catch (e) {}
    }
  }, [universalSens, gameState]);

  const triggerFlash = useCallback(() => {
    const id = Date.now() + Math.random();
    setFlashes((f) => [...f, { id }]);
    setTimeout(() => setFlashes((f) => f.filter((x) => x.id !== id)), 480);
  }, []);

  const spawnTarget = useCallback((width, height, currentLevel) => {
    const cfg = getLevelConfig(currentLevel);
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
    const peakLevel = bestLevelRunRef.current;
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

    const saved = getSavedData();
    const startLvl = getStartLevel(saved.bestLevel);
    setLevel(startLvl);
    bestLevelRunRef.current = startLvl;

    const w = engine.current.logicalWidth || canvasRef.current?.width || 800;
    const h = engine.current.logicalHeight || canvasRef.current?.height || 600;

    engine.current = {
      crosshair: { x: w / 2, y: h / 2, initialized: true },
      targets: [spawnTarget(w, h, startLvl)],
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

    if (containerRef.current && !document.fullscreenElement) {
      try { await containerRef.current.requestFullscreen(); } catch (e) {}
    }
    if (canvasRef.current && !document.pointerLockElement) {
      try { await canvasRef.current.requestPointerLock(); } catch (e) {}
    }
  }, [spawnTarget]);

  const handleExitDrill = useCallback(async () => {
    markIntentionalExit();
    countdownTimeoutsRef.current.forEach(clearTimeout);
    startingRef.current = false;
    if (document.fullscreenElement) await document.exitFullscreen().catch(() => {});
    if (document.pointerLockElement) document.exitPointerLock();
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
    const fsListener = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', fsListener);
    return () => document.removeEventListener('fullscreenchange', fsListener);
  }, []);

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

        const cfg = getLevelConfig(e.level);
        const targetCountRequired = e.level >= 5 ? 2 : 1;
        while (e.targets.length < targetCountRequired) {
          e.targets.push(spawnTarget(width, height, e.level));
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
            e.timeouts++;
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
              
              setScore(e.score);
              setCombo(e.combo);

              const rawLevel = Math.floor(e.score / POINTS_PER_LEVEL) + 1 + getComboBonusLevel(e.combo);
              e.level = Math.max(e.level, rawLevel);
              bestLevelRunRef.current = Math.max(bestLevelRunRef.current, e.level);
              setLevel(e.level);

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
  }, [gameState, pointerLocked, spawnTarget, createExplosion, createSparks, createHitMarker, triggerFlash, endGame]);

  const shareDrillLink = useCallback(async () => {
    const url = 'https://skilldrills.online/drills/fps/vertical-air-track';
    try {
      const canvas = generateShareCard({
        score,
        bestScore,
        accuracy: analytics.accuracy,
        bestCombo: analytics.bestCombo,
        rating: { letter: analytics.grade?.grade || 'C', label: analytics.grade?.label || 'Keep Going', emoji: '🎯' },
        newBest: isNewBest,
        drillName: 'Vertical Air Track',
        playerName: getPlayerName(),
      });
      await shareScoreCard(url, canvas);
    } catch (e) {
      const text = `🎯 I scored ${score} PTS on Vertical Air Track! Accuracy: ${analytics.accuracy}%. Practice your aerial tracking at skilldrills.online!`;
      if (typeof navigator !== 'undefined' && navigator.share) {
        navigator.share({ title: 'My Vertical Air Track Score', text, url }).catch(() => {});
      } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
        navigator.clipboard.writeText(text);
        alert('Score card copied to clipboard!');
      }
    }
  }, [score, bestScore, analytics, isNewBest]);

  return (
    <div className="min-h-screen bg-[#050508] text-white flex flex-col font-sans select-none">
      {/* ── HEADER / BREADCRUMB ── */}
      {!isFullscreen && (
        <header className="border-b border-white/5 bg-[#080811]/80 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <Link href="/drills/fps" className="hover:text-white transition-colors">FPS</Link>
              <span>/</span>
              <span className="text-red-400 font-medium">Vertical Air Track</span>
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
              {soundEnabled ? <Volume2 className="w-4 h-4 text-red-400" /> : <VolumeX className="w-4 h-4 text-red-400" />}
            </button>
          </div>
        </header>
      )}

      {/* ── MAIN CONTENT AREA ── */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6 flex flex-col gap-6">
        {/* Title */}
        {!isFullscreen && (
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight bg-gradient-to-r from-white via-slate-200 to-red-400 bg-clip-text text-transparent">
              VERTICAL AIR TRACK
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Hardware Raw Input • 15 Difficulty Levels
            </p>
          </div>
        )}

        {/* Live Stat Cards */}
        {!isFullscreen && (
          <div className="grid grid-cols-4 gap-2.5 max-w-2xl mx-auto w-full">
            <div className="bg-[#0d0d18] border border-white/5 rounded-xl p-2.5 text-center">
              <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Score</div>
              <div className="text-lg sm:text-xl font-black text-white tabular-nums">{score}</div>
            </div>
            <div className="bg-[#0d0d18] border border-white/5 rounded-xl p-2.5 text-center">
              <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Time</div>
              <div className={`text-lg sm:text-xl font-black tabular-nums ${timeLeft <= 10 ? 'text-red-400 animate-pulse' : 'text-white'}`}>{timeLeft}s</div>
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
          onContextMenu={(e) => { if (gameState === 'playing' || gameState === 'countdown') e.preventDefault(); }}
          className={`relative overflow-hidden flex flex-col transition-all duration-150 select-none bg-[#080811] text-white border border-white/10 ${
            isFullscreen 
              ? 'fixed inset-0 z-[100] w-screen h-[100dvh] bg-[#080811] rounded-none border-none flex flex-col items-center justify-center' 
              : 'w-full rounded-2xl bg-[#080811] aspect-video min-h-[460px] sm:min-h-[500px] max-h-[88vh] relative overflow-hidden flex flex-col'
          }`}
          style={{ touchAction: (gameState === 'playing' || gameState === 'countdown') ? 'none' : 'auto' }}
        >
          {/* Flash Overlays */}
          {flashes.map((f) => (
            <div key={f.id} className="fx-flash fx-flash-red" />
          ))}

          {/* IN-BOX OVERLAY HUD */}
          {(gameState === 'playing' || gameState === 'countdown') && (
            <>
              <div className="absolute top-4 left-4 z-30 pointer-events-none">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-white/50">Score</p>
                <p className="text-2xl sm:text-3xl font-bold text-white tabular-nums leading-tight">{score}</p>
              </div>

              <div className="absolute top-4 right-4 z-30 pointer-events-none text-right">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-white/50">Time</p>
                <p className={`text-2xl sm:text-3xl font-bold tabular-nums leading-tight ${timeLeft <= 10 ? 'text-red-400' : 'text-white'}`}>{timeLeft}s</p>
              </div>
            </>
          )}

          {/* IN-GAME HUD SOUND TOGGLE */}
          {(gameState === 'playing' || gameState === 'countdown') && (
            <button 
              onPointerDown={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.stopPropagation();
                setSoundEnabled(v => !v);
              }} 
              className="absolute bottom-4 right-4 z-40 p-2.5 rounded-full bg-black/60 border border-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer" 
              title="Toggle Sound"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-red-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
            </button>
          )}

          {/* Countdown Overlay */}
          {gameState === 'countdown' && (
            <DrillCountdown value={countdownValue} subtitle="GET READY" accent="#ef4444" />
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
                <p className="text-xs text-gray-300 font-medium">Click to resume — fullscreen and cursor lock will re-engage.</p>
              </div>
            </div>
          )}

          <canvas 
            ref={canvasRef} 
            onClick={() => { if (gameState === 'playing' && !pointerLocked) resumeDrill(); }}
            className={`block absolute top-0 left-0 w-full h-full touch-none z-10 ${gameState === 'playing' ? 'cursor-none' : ''}`} 
          />

          {/* Start Overlay */}
          {gameState === 'start' && (
            <FpsStartCard
              icon={Target}
              accent="redOrange"
              title="Vertical Air Track"
              subtitle="Hardware Raw Input • 15 Difficulty Levels"
              rules={[
                { icon: Target, accent: 'redOrange', title: 'Objective', text: 'Track Airborne Targets' },
                { icon: AlertCircle, accent: 'red', title: 'Failure Rule', text: 'Target Drop → Resets Combo' },
              ]}
              sensitivity={{ value: universalSens, onChange: setUniversalSens, cmPer360 }}
              stats={[
                { icon: Trophy, label: 'Best Score', value: bestScore, color: 'text-white', accent: 'slate' },
                { icon: Flame, label: 'Best Combo', value: `${bestCombo}x`, color: 'text-red-400', accent: 'redOrange' },
                { icon: TrendingUp, label: 'Best Level', value: `Lv. ${bestLevel}`, color: 'text-blue-400', accent: 'blue' },
              ]}
              isTouchOnlyDevice={isTouchOnlyDevice}
              onStart={enterDrill}
            />
          )}

          {/* Game Over / Result Overlay */}
          {gameState === 'gameOver' && analytics.grade && (
            <div className="absolute inset-0 z-40 flex bg-neutral-950/98 select-none font-sans" style={{ background: 'rgba(5,5,8,0.97)' }} onPointerDown={e => e.stopPropagation()}>
              
              {/* Left Grade Panel */}
              <div className="w-[36%] flex flex-col items-center justify-center gap-1 border-r border-white/5 px-4" style={{ background: 'radial-gradient(ellipse 260px 200px at 50% 30%, rgba(239,68,68,.12), transparent 70%)' }}>
                {isNewBest && (
                  <span className="text-[9.5px] font-bold text-yellow-400 bg-yellow-500/10 border border-yellow-500/25 px-2.5 py-0.5 rounded-full mb-1 animate-pulse">
                    NEW BEST
                  </span>
                )}
                <div className={`text-5xl sm:text-6xl font-black leading-none ${analytics.grade.color}`}>
                  {analytics.grade.grade}
                </div>
                <div className="text-[10px] uppercase tracking-widest text-slate-500 text-center font-bold mt-1">
                  {analytics.grade.label}
                </div>
                <div className="text-3xl sm:text-4xl font-black text-white mt-2 tabular-nums">
                  {score}
                </div>
                <div className="text-[9px] uppercase tracking-widest text-slate-500">Points</div>
              </div>

              {/* Right Stats & Actions Panel */}
              <div className="flex-1 flex flex-col justify-center gap-3 px-6 py-4 min-w-0">
                
                {/* Stat Tiles */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <div className="bg-black border border-white/5 p-2.5 rounded-xl text-center">
                    <p className="text-sm sm:text-base font-black text-white">{analytics.accuracy}%</p>
                    <p className="text-[7.5px] sm:text-[8.5px] font-bold uppercase tracking-wider text-gray-400 mt-0.5">Accuracy</p>
                  </div>
                  <div className="bg-black border border-white/5 p-2.5 rounded-xl text-center">
                    <p className="text-sm sm:text-base font-black text-white">{analytics.successfulHits}</p>
                    <p className="text-[7.5px] sm:text-[8.5px] font-bold uppercase tracking-wider text-gray-400 mt-0.5">Targets Destroyed</p>
                  </div>
                  <div className="bg-black border border-white/5 p-2.5 rounded-xl text-center">
                    <p className="text-sm sm:text-base font-black text-white">{analytics.bestCombo}x</p>
                    <p className="text-[7.5px] sm:text-[8.5px] font-bold uppercase tracking-wider text-gray-400 mt-0.5">Max Combo</p>
                  </div>
                  <div className="bg-black border border-white/5 p-2.5 rounded-xl text-center">
                    <p className="text-sm sm:text-base font-black text-white">Lv. {analytics.levelReached}</p>
                    <p className="text-[7.5px] sm:text-[8.5px] font-bold uppercase tracking-wider text-gray-400 mt-0.5">Peak Level</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button 
                    onClick={enterDrill} 
                    className="flex-1 py-3 rounded-[13px] bg-gradient-to-r from-red-600 to-orange-600 text-white font-bold text-xs uppercase tracking-wide cursor-pointer transition-transform active:scale-[0.98] shadow-md flex items-center justify-center gap-1.5"
                  >
                    <RefreshCw className="w-3.5 h-3.5" /> Play Again
                  </button>
                  <button 
                    onClick={shareDrillLink} 
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

        {/* ACCORDIONS */}
        {!isFullscreen && (
          <div className="[&>div]:!mt-0">
            <DrillAccordion
              id="rules"
              title="Drill Instructions & Scoring System"
              isOpen={openAccordion === 'rules'}
              onToggle={() => setOpenAccordion(openAccordion === 'rules' ? null : 'rules')}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <RuleItem num="1" text="Target Hit" highlight="+100 PTS Base" result="Destroy target by tracking" />
                <RuleItem num="2" text="Precision Height Bonus" highlight="Up to +75 PTS" result="Hit targets at peak height" />
                <RuleItem num="3" text="Combo System" highlight="Up to 3.0x Multiplier" result="Builds up every consecutive hit" />
                <RuleItem num="4" text="Timeouts & Drops" highlight="Resets Combo" result="No time or point loss" />
              </div>
            </DrillAccordion>

            <DrillAccordion
              id="about"
              title="About Vertical Air Tracking"
              isOpen={openAccordion === 'about'}
              onToggle={() => setOpenAccordion(openAccordion === 'about' ? null : 'about')}
            >
              <div className="space-y-8 font-sans">
                <section>
                  <h4 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                    <Eye className="w-4 h-4 text-blue-400" /> What Is Vertical Aim Training?
                  </h4>
                  <p className="text-sm leading-relaxed mb-3">
                    <strong>Vertical Aim Training</strong> is a mechanical motor coordination drill focused entirely on the y-axis. Unlike traditional aim drills that emphasize horizontal movements (x-axis), a vertical trainer isolates the muscles in your arm, wrist, and fingers required to translate your mouse up and down cleanly.
                  </p>
                  <p className="text-sm leading-relaxed">
                    By repeatedly performing <strong>air tracking training</strong>, players condition their y-axis tracking control to follow airborne targets in mobility shooters like Apex Legends and Overwatch 2.
                  </p>
                </section>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl border border-gray-800 bg-white/[0.02]">
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center"><Users className="w-3.5 h-3.5 text-white" /></div>
                      <h5 className="text-xs font-bold text-white">Who Should Use This?</h5>
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed">Esports athletes, entry fraggers, and players facing jumping or airborne enemies in games like Apex Legends, Overwatch 2, and Halo Infinite.</p>
                  </div>
                  <div className="p-4 rounded-xl border border-gray-800 bg-white/[0.02]">
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="w-7 h-7 rounded-lg bg-fuchsia-600 flex items-center justify-center"><TrendingUp className="w-3.5 h-3.5 text-white" /></div>
                      <h5 className="text-xs font-bold text-white">Skills Trained</h5>
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed">Vertical tracking, popcorn tracking, arc prediction, y-axis alignment correction, and airborne movement prediction.</p>
                  </div>
                  <div className="p-4 rounded-xl border border-gray-800 bg-white/[0.02]">
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="w-7 h-7 rounded-lg bg-orange-600 flex items-center justify-center"><Zap className="w-3.5 h-3.5 text-white" /></div>
                      <h5 className="text-xs font-bold text-white">Why It Is Harder</h5>
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed">Human physiology naturally adapts to horizontal arm swings. Vertical translation triggers unique muscle groups, requiring focused practice to build muscle memory.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
                  <div>
                    <h4 className="font-bold text-white text-base mb-2">How To Improve Vertical Tracking</h4>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      To build optimal vertical control, avoid tensing your wrist. Maintain a relaxed grip and sweep your entire forearm for large y-axis adjustments while using your fingers for micro-corrections near the apex of the arc.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-base mb-2">How Pro Players Train Air Tracking</h4>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      Top professional players practice tracking targets in smooth arcs. They use air tracking trainers to isolate gravity-affected trajectories, standardizing their target leading and smoothing out crosshair stutter.
                    </p>
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
                <FAQItem q="What is vertical aim training in FPS games?" a="Vertical aim training focuses on the Y-axis (up and down) movement of your mouse, which is systematically under-trained compared to horizontal tracking. Airborne targets require vertical mouse tracking to follow cleanly in games like Apex Legends and Overwatch 2." />
                <FAQItem q="What is popcorn tracking and does this drill train it?" a="Popcorn tracking is tracking targets that bounce or hop vertically, creating irregular parabolic movement patterns — similar to popcorn kernels popping. This drill trains the specific vertical mouse control needed to track bouncing aerial movement." />
                <FAQItem q="How does vertical aim training help in Apex Legends?" a="Apex Legends features high vertical movement — grappling hooks, jump pads, Horizon lifts, and air gliding all create aerial targets. Training vertical aim specifically enables you to track and punish opponents in the air rather than losing crosshair alignment." />
                <FAQItem q="What is an elevator peek in FPS shooters?" a="An elevator peek is when an opponent uses a building's height advantage or zipline to appear above your crosshair level unexpectedly. This drill trains the upward flick and hold motion needed to instantly adjust vertical crosshair position." />
                <FAQItem q="Why is vertical tracking harder than horizontal tracking?" a="Horizontal mouse movement is practiced constantly in daily computer use. Vertical mouse movement for precise aim is an unnatural motion that receives far less daily muscle memory training, making dedicated vertical practice essential." />
                <FAQItem q="How do Overwatch 2 players train aerial tracking?" a="Overwatch players practice tracking high-mobility heroes like Pharah, Echo, Mercy, or Winston during leaps. Using vertical aim trainers helps smooth out Y-axis tracking adjustments." />
                <FAQItem q="Does vertical aim training help in Halo Infinite?" a="Yes, Halo Infinite features grapples, repulsors, and jump pads that launch players high into the air. Vertical tracking practice helps you land consistent shots on airborne targets." />
                <FAQItem q="Does this drill improve vertical mouse control?" a="Yes, this vertical air track trainer specifically isolates and trains Y-axis micro-adjustments, arc prediction, and vertical mouse speed control." />
                <FAQItem q="How do professional players track parabolic arcs?" a="Pros anticipate target acceleration at the start of a jump and slow down their tracking near the apex of the arc where vertical velocity drops to zero, securing high-damage tracking ticks." />
                <FAQItem q="What is Y-axis mouse sensitivity calibration?" a="Y-axis sensitivity calibration ensures your vertical mouse movements feel natural and proportional to horizontal movements. Some players run a 1:1 ratio, while others adjust Y-sensitivity to compensate for wrist biomechanics." />
                <FAQItem q="Does vertical tracking help in Titanfall 2?" a="Yes, Titanfall 2 features extreme verticality, wall-running, and double jumping, which require excellent vertical tracking skills to counter." />
                <FAQItem q="How often should I train vertical aim?" a="We recommend training vertical aim for 10-15 minutes daily as part of your FPS warm-up routine to build consistent muscle memory on the Y-axis." />
                <FAQItem q="Is this vertical aim trainer free?" a="Yes, this Vertical Air Track Aim Trainer is 100% free, runs in any desktop browser using raw hardware pointer input, and contains no ads." />
                <FAQItem q="What skills does this drill improve?" a="This drill trains vertical tracking, air tracking, parabolic arc prediction, Y-axis mouse control, visual processing speed, and tracking consistency." />
                <FAQItem q="Can vertical aim training improve overall tracking consistency?" a="Yes, isolating vertical aim training smooths out jittery vertical movements, making your overall mouse tracking more consistent across both axes." />
              </div>
            </DrillAccordion>
          </div>
        )}

        {/* RELATED DRILLS GRID */}
        {!isFullscreen && (
          <section className="mt-4">
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3 font-sans">
              Related FPS Drills
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {RELATED_DRILLS.map((drill) => (
                <Link
                  key={drill.id}
                  href={drill.href}
                  className="group bg-[#0c0c16] border border-white/5 hover:border-red-500/40 rounded-xl p-3.5 transition-all duration-200 hover:-translate-y-0.5 flex flex-col justify-between"
                >
                  <div>
                    <div className="text-[10px] font-bold text-red-400 uppercase tracking-wider mb-1">{drill.cat}</div>
                    <div className="text-xs font-bold text-white group-hover:text-red-300 transition-colors">{drill.name}</div>
                    <div className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">{drill.desc}</div>
                  </div>
                  <div className="text-[10px] font-bold text-slate-500 group-hover:text-red-400 mt-3 flex items-center gap-1 transition-colors">
                    Train Drill <span>→</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* SITE FOOTER */}
        {!isFullscreen && <DrillFooter />}

      </main>
    </div>
  );
}

// === Subcomponents ===

function StatCard({ icon, value, label, unit = '', accentColor = 'border-white/10' }) {
  return (
    <div className={`rounded-xl border ${accentColor} bg-black backdrop-blur-md p-1.5 sm:p-2.5 text-center flex flex-col items-center justify-center transition-all duration-300 shadow-md hover:-translate-y-0.5 pointer-events-none font-sans`}>
      <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-black border border-white/10 flex items-center justify-center mb-1 shadow-inner">
        {icon}
      </div>
      <p className="text-xs sm:text-lg lg:text-xl font-black tracking-tight text-white leading-none truncate w-full font-sans font-mono tabular-nums">
        {value}<span className="text-[9px] sm:text-xs font-semibold ml-0.5 text-gray-400 font-sans">{unit}</span>
      </p>
      <p className="text-[8px] sm:text-[9.5px] font-bold uppercase tracking-wider text-gray-400 mt-1 truncate w-full">{label}</p>
    </div>
  );
}

function RuleItem({ num, text, highlight = '', result }) {
  return (
    <div className="flex items-center gap-4 bg-black p-4 rounded-xl border border-white/10 shadow-sm">
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

function RelatedCard({ href, title, desc }) {
  return (
    <Link href={href} className="group p-5 bg-black rounded-2xl border border-gray-800 hover:border-red-500/50 hover:bg-white/[0.02] transition-all flex flex-col justify-between">
      <div>
        <h4 className="font-bold text-white group-hover:text-red-400 transition-colors mb-1 text-base">{title}</h4>
        <p className="text-xs text-gray-400 leading-relaxed line-clamp-2">{desc}</p>
      </div>
      <div className="flex items-center gap-1 mt-4 text-xs text-red-400 font-bold font-mono">
        <span>TRY DRILL</span>
        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  );
}

function FAQItem({ q, a }) {
  return (
    <div className="bg-[#05060b] border border-gray-800 rounded-xl p-5 hover:border-gray-700 transition-colors">
      <h4 className="text-sm font-bold text-gray-200 mb-2">{q}</h4>
      <p className="text-xs text-gray-200 leading-relaxed">{a}</p>
    </div>
  );
}