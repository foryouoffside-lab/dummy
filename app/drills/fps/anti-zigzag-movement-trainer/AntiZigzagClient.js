'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';

import {
  Activity, AlertCircle, ArrowRight, ChevronRight,
  Clock, Crosshair, Eye, GraduationCap, Info, Lightbulb,
  Maximize2, Minimize2, Play, RefreshCw, Target,
  Timer, TrendingUp, Trophy, Volume2, VolumeX, Zap,
  Users, Shield, Sparkles, Flame,
  Share2, Sliders, RotateCcw
} from 'lucide-react';

const DRILL_DURATION = 60;
const TARGET_COLOR = '#ef4444'; // Hardcoded professional standard color

// Level configurations – target shrinks, speed increases, zigzag interval shrinks
const getLevelStats = (score) => {
  const lvl = Math.floor(score / 150) + 1;
  let radius, speedMult, zigzagInterval, maxLifespan;

  if (lvl === 1) {
    radius = 28; speedMult = 1.0; zigzagInterval = 1.2; maxLifespan = 4.0;
  } else if (lvl === 2) {
    radius = 24; speedMult = 1.3; zigzagInterval = 1.0; maxLifespan = 3.5;
  } else if (lvl === 3) {
    radius = 20; speedMult = 1.6; zigzagInterval = 0.85; maxLifespan = 3.0;
  } else if (lvl === 4) {
    radius = 17; speedMult = 2.0; zigzagInterval = 0.7; maxLifespan = 2.6;
  } else if (lvl === 5) {
    radius = 14; speedMult = 2.4; zigzagInterval = 0.55; maxLifespan = 2.2;
  } else {
    const scale = lvl - 5;
    radius = Math.max(9, 14 - scale * 0.7);
    speedMult = 2.4 + scale * 0.2;
    zigzagInterval = Math.max(0.25, 0.55 - scale * 0.05);
    maxLifespan = Math.max(1.6, 2.2 - scale * 0.1);
  }

  return { lvl, radius, speedMult, zigzagInterval, maxLifespan };
};

// Rank calculation from multi-metric performance
const calculateRank = (level, accuracy, stability, kills) => {
  if (level >= 6 && accuracy >= 75 && stability >= 80 && kills >= 20) return { rank: 'S+', color: 'text-fuchsia-400' };
  if (level >= 5 && accuracy >= 65 && stability >= 70 && kills >= 15) return { rank: 'S', color: 'text-yellow-400' };
  if (level >= 4 && accuracy >= 55 && stability >= 65 && kills >= 12) return { rank: 'A', color: 'text-green-400' };
  if (level >= 3 && accuracy >= 40) return { rank: 'B', color: 'text-blue-400' };
  if (level >= 2 && accuracy >= 30) return { rank: 'C', color: 'text-indigo-400' };
  return { rank: 'D', color: 'text-slate-400' };
};

const getSuggestion = (rank, accuracy, stability, kills, escapes) => {
  if (rank === 'S+' || rank === 'S') return "Elite anti-zigzag tracking. Your reactive corrections and damage uptime against erratic strafes are top-tier. Keep pushing higher difficulty levels!";
  if (accuracy < 40) return "Low tracking accuracy. You are likely over-flicking or trailing too far behind. Aim at the V-crossover point (center of the strafe path) rather than chasing the target.";
  if (escapes > kills && kills > 0) return "High escape rate. You aren't applying consistent damage. Maintain fire contact during the slide-cancel transitions instead of lifting off target.";
  if (stability < 55) return "Your cursor path exhibits high jitter during direction changes. Focus on keeping your wrist relaxed, and try lowering your sensitivity to improve stability.";
  return "Solid baseline. Focus on maintaining lock-on during rapid V-reversal transitions to build higher combo chains and faster kill times.";
};

export default function AntiZigzagClient() {
  // === UI & Viewport State ===
  const [gameState, setGameState] = useState('start');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [pointerLocked, setPointerLocked] = useState(false);
  const [showRotateWarning, setShowRotateWarning] = useState(false);
  const [isMobileLandscape, setIsMobileLandscape] = useState(false);
  const [isMobileDevice, setIsMobileDevice] = useState(false);

  // === Settings State ===
  const [universalSens, setUniversalSens] = useState(1.0);
  const [weaponSpray, setWeaponSpray] = useState(true);

  // === Gameplay HUD State ===
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [trackingAccuracy, setTrackingAccuracy] = useState(100);
  const [streak, setStreak] = useState(0);
  const [level, setLevel] = useState(1);
  const [timeLeft, setTimeLeft] = useState(DRILL_DURATION);
  const [isNewBest, setIsNewBest] = useState(false);

  // Analytics State
  const [analytics, setAnalytics] = useState({
    accuracy: 100,
    stabilityScore: 0,
    longestContinuousTrack: 0,
    targetsDestroyed: 0,
    targetsEscaped: 0,
    difficultyReached: 1,
    bestCombo: 0,
    rankData: null
  });

  // === High-performance Mutable Refs ===
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  const audioCtxRef = useRef(null);
  const progressBarRef = useRef(null);
  const lastTimeRef = useRef(DRILL_DURATION);

  // === Game Logic Engine Refs ===
  const engine = useRef({
    t: 0,
    timeLeft: DRILL_DURATION,
    crosshair: { x: 0, y: 0, initialized: false },

    // Target state
    target: {
      x: 0, y: 0,
      vx: 0, vy: 0,
      health: 120,
      lifespan: 0,
      maxLifespan: 4.0,
      zigzagTimer: 1.2,
      history: []
    },

    // Performance accumulators
    score: 0,
    level: 1,
    totalFrames: 0,
    framesOnTarget: 0,
    continuousTrackTime: 0,
    comboTime: 0,
    bestComboTime: 0,
    deviationSum: 0,
    deviationCount: 0,
    targetsDestroyed: 0,
    targetsEscaped: 0,

    // Spray mechanic
    isMouseDown: false,
    decals: [],
    bulletsFired: 0,
    bulletsHit: 0,
    lastFireTime: 0,
    screenShake: 0,
    particles: [],
    hitMarkers: []
  });

  const cmPer360 = (30 / universalSens).toFixed(1);

  // === Mobile Detection & Orientation ===
  useEffect(() => {
    const checkViewport = () => {
      if (typeof window === 'undefined') return;
      const ua = navigator.userAgent || '';
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua) || ('ontouchstart' in window);
      setIsMobileDevice(isMobile);
      const isPortrait = window.innerHeight > window.innerWidth;
      setShowRotateWarning(isMobile && isPortrait);
      setIsMobileLandscape(isMobile && !isPortrait);
    };
    checkViewport();
    window.addEventListener('resize', checkViewport);
    window.addEventListener('orientationchange', () => setTimeout(checkViewport, 150));
    return () => {
      window.removeEventListener('resize', checkViewport);
      window.removeEventListener('orientationchange', checkViewport);
    };
  }, []);

  // === Initialization & Local Storage ===
  useEffect(() => {
    try {
      const savedSens = localStorage.getItem('zigzag_sens');
      if (savedSens) setUniversalSens(parseFloat(savedSens));
      const savedBest = localStorage.getItem('zigzag_bestScore');
      if (savedBest) setBestScore(parseInt(savedBest, 10));
      const savedSpray = localStorage.getItem('zigzag_spray');
      if (savedSpray) setWeaponSpray(savedSpray === 'true');
    } catch (e) {}
  }, []);

  useEffect(() => {
    if (gameState !== 'playing') {
      try {
        localStorage.setItem('zigzag_sens', universalSens.toString());
        localStorage.setItem('zigzag_spray', weaponSpray.toString());
      } catch (e) {}
    }
  }, [universalSens, weaponSpray, gameState]);

  // === Zero-Latency Audio Engine ===
  const playSound = useCallback((type) => {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') ctx.resume();

      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.connect(g);
      g.connect(ctx.destination);
      const now = ctx.currentTime;

      if (type === 'hitmarker') {
        o.type = 'triangle';
        o.frequency.setValueAtTime(1200, now);
        o.frequency.exponentialRampToValueAtTime(600, now + 0.05);
        g.gain.setValueAtTime(0.04, now);
        g.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
        o.start(now);
        o.stop(now + 0.05);
      } else if (type === 'kill') {
        o.type = 'sine';
        o.frequency.setValueAtTime(880, now);
        o.frequency.exponentialRampToValueAtTime(1760, now + 0.1);
        g.gain.setValueAtTime(0.08, now);
        g.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
        o.start(now);
        o.stop(now + 0.2);
      } else if (type === 'escape') {
        o.type = 'sawtooth';
        o.frequency.setValueAtTime(150, now);
        o.frequency.exponentialRampToValueAtTime(60, now + 0.15);
        g.gain.setValueAtTime(0.1, now);
        g.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
        o.start(now);
        o.stop(now + 0.15);
      } else if (type === 'levelUp') {
        o.type = 'sine';
        o.frequency.setValueAtTime(523.25, now);
        o.frequency.setValueAtTime(659.25, now + 0.08);
        o.frequency.setValueAtTime(783.99, now + 0.16);
        o.frequency.setValueAtTime(1046.50, now + 0.24);
        g.gain.setValueAtTime(0.07, now);
        g.gain.exponentialRampToValueAtTime(0.001, now + 0.55);
        o.start(now);
        o.stop(now + 0.55);
      } else if (type === 'start') {
        o.type = 'sine';
        o.frequency.setValueAtTime(659.25, now);
        g.gain.setValueAtTime(0.05, now);
        g.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
        o.start(now);
        o.stop(now + 0.3);
      } else if (type === 'shoot') {
        o.type = 'sawtooth';
        o.frequency.setValueAtTime(130, now);
        o.frequency.exponentialRampToValueAtTime(40, now + 0.06);
        g.gain.setValueAtTime(0.06, now);
        g.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
        o.start(now);
        o.stop(now + 0.06);
      } else if (type === 'combo') {
        o.type = 'sine';
        o.frequency.setValueAtTime(1046.50, now);
        o.frequency.exponentialRampToValueAtTime(1318.51, now + 0.12);
        g.gain.setValueAtTime(0.06, now);
        g.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
        o.start(now);
        o.stop(now + 0.4);
      }
    } catch (e) {}
  }, [soundEnabled]);

  // === Target Spawning ===
  const spawnTarget = useCallback((W, H) => {
    const e = engine.current;
    const stats = getLevelStats(e.score);
    const radius = stats.radius;

    e.target.x = radius + Math.random() * (W - radius * 2);
    e.target.y = radius + Math.random() * (H - radius * 2);

    const baseSpeed = 350 * stats.speedMult;
    e.target.vx = (Math.random() > 0.5 ? 1 : -1) * baseSpeed;
    e.target.vy = (Math.random() - 0.5) * baseSpeed * 0.4;

    e.target.health = 120;
    e.target.lifespan = 0;
    e.target.maxLifespan = stats.maxLifespan;
    e.target.zigzagTimer = stats.zigzagInterval * (0.8 + Math.random() * 0.4);
    e.target.history = [];
  }, []);

  // === Core Game Management ===
  const endGame = useCallback(() => {
    setGameState('gameOver');
    if (document.pointerLockElement) document.exitPointerLock();

    const e = engine.current;

    const finalAccuracy = weaponSpray
      ? (e.bulletsFired > 0 ? Math.round((e.bulletsHit / e.bulletsFired) * 100) : 0)
      : (e.totalFrames > 0 ? Math.round((e.framesOnTarget / e.totalFrames) * 100) : 0);

    const avgDeviation = e.deviationCount > 0 ? Math.round(e.deviationSum / e.deviationCount) : 0;
    const stabilityScore = Math.max(0, Math.min(100, Math.round(100 - avgDeviation * 1.8)));
    const longestStreak = Math.round(e.bestComboTime * 10) / 10;
    const levelReached = e.level;
    const rank = calculateRank(levelReached, finalAccuracy, stabilityScore, e.targetsDestroyed);

    setTrackingAccuracy(finalAccuracy);
    setAnalytics({
      accuracy: finalAccuracy,
      stabilityScore: stabilityScore,
      longestContinuousTrack: longestStreak,
      targetsDestroyed: e.targetsDestroyed,
      targetsEscaped: e.targetsEscaped,
      difficultyReached: levelReached,
      bestCombo: longestStreak,
      rankData: rank
    });

    setScore(e.score);
    setBestScore(prev => {
      if (e.score > prev) {
        setIsNewBest(true);
        try { localStorage.setItem('zigzag_bestScore', e.score.toString()); } catch (err) {}
        return e.score;
      }
      return prev;
    });
  }, [weaponSpray]);

  const startGame = useCallback(() => {
    setIsNewBest(false);
    setScore(0);
    setStreak(0);
    setTrackingAccuracy(0);
    setLevel(1);
    setTimeLeft(DRILL_DURATION);
    lastTimeRef.current = DRILL_DURATION;
    playSound('start');

    engine.current = {
      t: 0,
      timeLeft: DRILL_DURATION,
      crosshair: { ...engine.current.crosshair },

      target: {
        x: 0, y: 0,
        vx: 0, vy: 0,
        health: 120,
        lifespan: 0,
        maxLifespan: 4.0,
        zigzagTimer: 1.2,
        history: []
      },

      score: 0,
      level: 1,
      totalFrames: 0,
      framesOnTarget: 0,
      continuousTrackTime: 0,
      comboTime: 0,
      bestComboTime: 0,
      deviationSum: 0,
      deviationCount: 0,
      targetsDestroyed: 0,
      targetsEscaped: 0,

      isMouseDown: false,
      decals: [],
      bulletsFired: 0,
      bulletsHit: 0,
      lastFireTime: 0,
      screenShake: 0,
      particles: [],
      hitMarkers: []
    };

    if (!isMobileDevice) {
      if (containerRef.current && !document.fullscreenElement) {
        containerRef.current.requestFullscreen().catch(() => {});
      }
      setTimeout(() => {
        if (canvasRef.current && !document.pointerLockElement) {
          canvasRef.current.requestPointerLock().catch(() => {});
        }
      }, 150);
    } else {
      if (containerRef.current && !document.fullscreenElement) {
        containerRef.current.requestFullscreen().catch(() => {});
      }
    }

    setGameState('playing');
  }, [playSound, isMobileDevice]);

  // === Pointer Lock Event Listeners (Desktop) ===
  useEffect(() => {
    if (isMobileDevice) return;
    const handlePointerLockChange = () => {
      const isLocked = document.pointerLockElement === canvasRef.current;
      setPointerLocked(isLocked);
      if (!isLocked) {
        engine.current.isMouseDown = false;
      }
    };
    document.addEventListener('pointerlockchange', handlePointerLockChange);
    return () => document.removeEventListener('pointerlockchange', handlePointerLockChange);
  }, [isMobileDevice]);

  // Desktop mouse input
  useEffect(() => {
    if (isMobileDevice) return;

    const handleMouseMove = (e) => {
      if (gameState !== 'playing' || !pointerLocked || !canvasRef.current) return;
      const cvs = canvasRef.current;
      const dx = e.movementX * universalSens;
      const dy = e.movementY * universalSens;
      engine.current.crosshair.x = Math.max(0, Math.min(cvs.width, engine.current.crosshair.x + dx));
      engine.current.crosshair.y = Math.max(0, Math.min(cvs.height, engine.current.crosshair.y + dy));
    };

    const handleMouseDown = (e) => {
      if (e.target.tagName === 'BUTTON' || e.target.closest('button')) return;
      if (gameState === 'playing') {
        if (!pointerLocked && canvasRef.current) {
          canvasRef.current.requestPointerLock();
        } else if (pointerLocked) {
          engine.current.isMouseDown = true;
        }
      }
    };

    const handleMouseUp = () => {
      engine.current.isMouseDown = false;
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [gameState, pointerLocked, universalSens, isMobileDevice]);

  // Mobile touch input
  useEffect(() => {
    if (!isMobileDevice) return;

    const handleTouchStart = (e) => {
      if (gameState !== 'playing' || !canvasRef.current) return;
      const cvs = canvasRef.current;
      const rect = cvs.getBoundingClientRect();
      const touch = e.touches[0];
      engine.current.crosshair.x = ((touch.clientX - rect.left) / rect.width) * cvs.width;
      engine.current.crosshair.y = ((touch.clientY - rect.top) / rect.height) * cvs.height;
      engine.current.isMouseDown = true;
    };

    const handleTouchMove = (e) => {
      if (gameState !== 'playing' || !canvasRef.current) return;
      const cvs = canvasRef.current;
      const rect = cvs.getBoundingClientRect();
      const touch = e.touches[0];
      engine.current.crosshair.x = ((touch.clientX - rect.left) / rect.width) * cvs.width;
      engine.current.crosshair.y = ((touch.clientY - rect.top) / rect.height) * cvs.height;
    };

    const handleTouchEnd = () => {
      engine.current.isMouseDown = false;
    };

    const cvs = canvasRef.current;
    if (cvs) {
      cvs.addEventListener('touchstart', handleTouchStart, { passive: true });
      cvs.addEventListener('touchmove', handleTouchMove, { passive: true });
      cvs.addEventListener('touchend', handleTouchEnd);
      cvs.addEventListener('touchcancel', handleTouchEnd);
    }
    return () => {
      if (cvs) {
        cvs.removeEventListener('touchstart', handleTouchStart);
        cvs.removeEventListener('touchmove', handleTouchMove);
        cvs.removeEventListener('touchend', handleTouchEnd);
        cvs.removeEventListener('touchcancel', handleTouchEnd);
      }
    };
  }, [gameState, isMobileDevice]);

  const toggleFullscreen = useCallback(async () => {
    if (!document.fullscreenElement) {
      if (containerRef.current) await containerRef.current.requestFullscreen().catch(() => {});
    } else {
      await document.exitFullscreen().catch(() => {});
    }
  }, []);

  useEffect(() => {
    const fsListener = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', fsListener);
    return () => document.removeEventListener('fullscreenchange', fsListener);
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

  // === Share Score ===
  const shareScore = useCallback(async () => {
    const text = `🎮 I scored ${score} PTS (Level ${analytics.difficultyReached}) on Anti-Zigzag Tracking! Accuracy: ${analytics.accuracy}%, Kills: ${analytics.targetsDestroyed}. Practice free at skilldrills.online! ⚡`;
    if (typeof navigator !== 'undefined' && navigator.share) {
      try { await navigator.share({ title: 'My Anti-Zigzag Score', text, url: 'https://skilldrills.online/drills/fps/anti-zigzag-movement-trainer' }); } catch (e) {}
    } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      alert('Score card copied to clipboard!');
    }
  }, [score, analytics]);

  // === Native Physics & Render Loop (Delta Time) ===
  useEffect(() => {
    const cvs = canvasRef.current;
    const container = containerRef.current;
    if (!cvs || !container) return;
    const ctx = cvs.getContext('2d', { alpha: false });

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        if (width > 0 && height > 0) {
          cvs.width = width;
          cvs.height = height;
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
    let needsSpawn = true;

    const loop = (time) => {
      const deltaTimeMs = time - lastTime;
      lastTime = time;
      const deltaSec = Math.min(deltaTimeMs / 1000, 0.1);
      const e = engine.current;

      const stats = getLevelStats(e.score);
      const prevLevel = e.level;
      e.level = stats.lvl;

      if (e.level > prevLevel) {
        playSound('levelUp');
        setLevel(e.level);
      }

      const isDesktopActive = !isMobileDevice && pointerLocked;
      const isMobileActive = isMobileDevice;
      const isActive = isDesktopActive || isMobileActive;

      if (gameState === 'playing' && isActive) {
        // Timer
        if (e.timeLeft > 0) {
          e.timeLeft -= deltaSec;
        }

        if (e.timeLeft <= 0) {
          e.timeLeft = 0;
          setTimeLeft(0);
          if (progressBarRef.current) progressBarRef.current.style.width = '0%';
          endGame();
          return;
        }

        if (progressBarRef.current) {
          progressBarRef.current.style.width = `${(e.timeLeft / DRILL_DURATION) * 100}%`;
          progressBarRef.current.className = `h-full ${e.timeLeft <= 10 ? 'bg-red-500 animate-pulse' : 'bg-red-500'}`;
        }

        const intTime = Math.ceil(e.timeLeft);
        if (intTime !== lastTimeRef.current) {
          setTimeLeft(intTime);
          lastTimeRef.current = intTime;
        }

        setLevel(stats.lvl);

        // Spawn target if needed
        if (needsSpawn) {
          spawnTarget(cvs.width, cvs.height);
          needsSpawn = false;
        }

        const tgt = e.target;
        const radius = stats.radius;
        const hitRadius = isMobileDevice ? radius * 2.5 : radius * 1.7;

        // --- Zigzag Physics ---
        tgt.x += tgt.vx * deltaSec;
        tgt.y += tgt.vy * deltaSec;

        // Wall bounce
        if (tgt.x < radius) { tgt.x = radius; tgt.vx *= -1; }
        if (tgt.x > cvs.width - radius) { tgt.x = cvs.width - radius; tgt.vx *= -1; }
        if (tgt.y < radius) { tgt.y = radius; tgt.vy *= -1; }
        if (tgt.y > cvs.height - radius) { tgt.y = cvs.height - radius; tgt.vy *= -1; }

        // Zigzag direction snap
        tgt.zigzagTimer -= deltaSec;
        if (tgt.zigzagTimer <= 0) {
          tgt.vx = -tgt.vx * 1.15;
          tgt.vy = (Math.random() - 0.5) * Math.abs(tgt.vx) * 0.8;
          tgt.zigzagTimer = stats.zigzagInterval * (0.8 + Math.random() * 0.4);
        }

        // Escape timer
        tgt.lifespan += deltaSec;
        if (tgt.lifespan >= tgt.maxLifespan) {
          e.targetsEscaped++;
          e.timeLeft = Math.max(0, e.timeLeft - 1.0);
          e.comboTime = 0;
          playSound('escape');
          spawnTarget(cvs.width, cvs.height);
        }

        // Trail history
        tgt.history.push({ x: tgt.x, y: tgt.y });
        if (tgt.history.length > 14) tgt.history.shift();

        // --- Firing & Damage ---
        const ch = e.crosshair;
        const dist = Math.hypot(ch.x - tgt.x, ch.y - tgt.y);

        if (weaponSpray && e.isMouseDown) {
          if (time - e.lastFireTime >= 80) {
            e.lastFireTime = time;
            e.bulletsFired++;
            const isHit = dist <= hitRadius;
            playSound('shoot');
            if (isHit) {
              e.bulletsHit++;
              e.decals.push({ x: ch.x, y: ch.y, time, type: 'hit' });
              createExplosion(ch.x, ch.y, '#10b981');
              createHitMarker(ch.x, ch.y);
              e.screenShake = Math.max(e.screenShake, 2.5);

              const damagePerBullet = isMobileDevice ? 18 : 14;
              tgt.health -= damagePerBullet;
            } else {
              e.decals.push({ x: ch.x, y: ch.y, time, type: 'miss' });
              createExplosion(ch.x, ch.y, '#ef4444');
              e.screenShake = Math.max(e.screenShake, 1.8);
            }

            if (tgt.health <= 0) {
              e.targetsDestroyed++;
              e.score += 10;
              e.timeLeft = Math.min(DRILL_DURATION, e.timeLeft + 1.0);
              setScore(e.score);
              playSound('kill');
              createExplosion(tgt.x, tgt.y, '#fbbf24');
              spawnTarget(cvs.width, cvs.height);
            }
          }
        } else if (!weaponSpray && e.isMouseDown) {
          // Passive tracking mode (hold to track)
          e.totalFrames++;
          e.deviationSum += dist;
          e.deviationCount++;

          if (dist <= hitRadius) {
            e.framesOnTarget++;
            const damagePerSec = isMobileDevice ? 180 : 130;
            tgt.health -= damagePerSec * deltaSec;

            if (time - e.lastFireTime > 90) {
              playSound('hitmarker');
              e.lastFireTime = time;
            }

            e.continuousTrackTime += deltaTimeMs;
            e.comboTime += deltaSec;
            if (e.comboTime > e.bestComboTime) e.bestComboTime = e.comboTime;

            if (tgt.health <= 0) {
              e.targetsDestroyed++;
              e.score += 10;
              e.timeLeft = Math.min(DRILL_DURATION, e.timeLeft + 1.0);
              setScore(e.score);
              playSound('kill');
              createExplosion(tgt.x, tgt.y, '#fbbf24');
              spawnTarget(cvs.width, cvs.height);
            }
          } else {
            e.comboTime = 0;
          }
        }

        // Weapon spray tracking metrics
        if (weaponSpray) {
          e.totalFrames++;
          e.deviationSum += dist;
          e.deviationCount++;
          if (dist <= hitRadius && e.isMouseDown) {
            e.framesOnTarget++;
            e.comboTime += deltaSec;
            if (e.comboTime > e.bestComboTime) e.bestComboTime = e.comboTime;
          } else {
            e.comboTime = 0;
          }
        }

        // Combo milestones
        if (e.comboTime >= 5 && !e.milestone5) { e.score += 15; e.milestone5 = true; setScore(e.score); playSound('combo'); }
        else if (e.comboTime >= 10 && !e.milestone10) { e.score += 25; e.milestone10 = true; setScore(e.score); playSound('combo'); }
        else if (e.comboTime >= 20 && !e.milestone20) { e.score += 50; e.milestone20 = true; setScore(e.score); playSound('combo'); }

        if (e.comboTime === 0) {
          e.milestone5 = false;
          e.milestone10 = false;
          e.milestone20 = false;
        }

        // HUD updates
        if (e.totalFrames % 15 === 0) {
          const fmtCombo = Math.round(e.comboTime * 10) / 10;
          setStreak(fmtCombo);
          const liveAcc = weaponSpray
            ? (e.bulletsFired > 0 ? Math.round((e.bulletsHit / e.bulletsFired) * 100) : 100)
            : (e.totalFrames > 0 ? Math.round((e.framesOnTarget / e.totalFrames) * 100) : 100);
          setTrackingAccuracy(liveAcc);
        }
      }

      // --- RENDERING PHASE ---
      ctx.save();

      // Screen shake
      if (engine.current.screenShake > 0) {
        const sx = (Math.random() - 0.5) * engine.current.screenShake;
        const sy = (Math.random() - 0.5) * engine.current.screenShake;
        ctx.translate(sx, sy);
        engine.current.screenShake *= 0.85;
        if (engine.current.screenShake < 0.5) engine.current.screenShake = 0;
      }

      // Background
      ctx.fillStyle = '#050508';
      ctx.fillRect(0, 0, cvs.width, cvs.height);

      // Cyber grid
      ctx.strokeStyle = 'rgba(239, 68, 68, 0.03)';
      ctx.lineWidth = 1;
      for (let i = 0; i < cvs.width; i += 60) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, cvs.height); ctx.stroke(); }
      for (let j = 0; j < cvs.height; j += 60) { ctx.beginPath(); ctx.moveTo(0, j); ctx.lineTo(cvs.width, j); ctx.stroke(); }

      if (gameState === 'playing' && isActive) {
        const tgt = engine.current.target;
        const radius = stats.radius;
        const hitRadius = isMobileDevice ? radius * 2.5 : radius * 1.7;
        const ch = engine.current.crosshair;
        const dist = Math.hypot(ch.x - tgt.x, ch.y - tgt.y);
        const isHitting = engine.current.isMouseDown && dist <= hitRadius;

        // Trail
        if (tgt.history.length > 1) {
          ctx.beginPath();
          ctx.moveTo(tgt.history[0].x, tgt.history[0].y);
          for (let i = 1; i < tgt.history.length; i++) ctx.lineTo(tgt.history[i].x, tgt.history[i].y);
          ctx.strokeStyle = `${TARGET_COLOR}25`;
          ctx.lineWidth = radius * 1.2;
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          ctx.stroke();
        }

        // Bullet decals
        engine.current.decals = engine.current.decals.filter(d => time - d.time < 6000);
        engine.current.decals.forEach((d) => {
          const age = time - d.time;
          const opacity = Math.max(0.1, 1 - (age / 6000));
          ctx.fillStyle = d.type === 'hit' ? `rgba(16, 185, 129, ${opacity})` : `rgba(239, 68, 68, ${opacity})`;
          ctx.beginPath();
          ctx.arc(d.x, d.y, 2.5, 0, Math.PI * 2);
          ctx.fill();
        });

        // Target rendering
        ctx.shadowColor = TARGET_COLOR;
        ctx.shadowBlur = isHitting ? 22 : 12;
        ctx.fillStyle = TARGET_COLOR;
        ctx.beginPath();
        ctx.arc(tgt.x, tgt.y, radius * 0.75, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Inner core
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(tgt.x, tgt.y, radius * 0.3, 0, Math.PI * 2);
        ctx.fill();

        // Health arc (Updated to 120 max health)
        if (tgt.health < 120) {
          ctx.beginPath();
          ctx.arc(tgt.x, tgt.y, radius + 8, -Math.PI / 2, -Math.PI / 2 + (tgt.health / 120) * Math.PI * 2);
          ctx.strokeStyle = '#22c55e';
          ctx.lineWidth = 3;
          ctx.stroke();
        }

        // Escape timer arc
        ctx.beginPath();
        ctx.arc(tgt.x, tgt.y, radius + 14, -Math.PI / 2, -Math.PI / 2 + (1 - tgt.lifespan / tgt.maxLifespan) * Math.PI * 2);
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Render particles
        for (let i = engine.current.particles.length - 1; i >= 0; i--) {
          const p = engine.current.particles[i];
          p.x += p.vx; p.y += p.vy; p.life -= deltaSec * 2.5;
          if (p.life <= 0) { engine.current.particles.splice(i, 1); continue; }
          ctx.globalAlpha = p.life; ctx.fillStyle = p.color; ctx.fillRect(p.x, p.y, 3, 3);
        }
        ctx.globalAlpha = 1.0;

        // Render hit markers
        for (let i = engine.current.hitMarkers.length - 1; i >= 0; i--) {
          const hm = engine.current.hitMarkers[i];
          hm.life -= deltaSec * 4.0;
          if (hm.life <= 0) { engine.current.hitMarkers.splice(i, 1); continue; }
          ctx.globalAlpha = hm.life; ctx.strokeStyle = '#ffffff';
          const s = 6 + (1 - hm.life) * 8;
          ctx.beginPath();
          ctx.moveTo(hm.x - s, hm.y - s); ctx.lineTo(hm.x + s, hm.y + s);
          ctx.moveTo(hm.x + s, hm.y - s); ctx.lineTo(hm.x - s, hm.y + s);
          ctx.lineWidth = 2;
          ctx.stroke();
        }
        ctx.globalAlpha = 1.0;

        // Crosshair rendering (desktop)
        if (!isMobileDevice && ch.initialized) {
          const activeColor = isHitting ? '#10b981' : TARGET_COLOR;
          ctx.strokeStyle = activeColor;
          ctx.fillStyle = activeColor;

          ctx.lineWidth = 2;
          ctx.beginPath(); ctx.arc(ch.x, ch.y, 20, 0, Math.PI * 2); ctx.stroke();

          ctx.lineWidth = 1.5;
          const gap = 8;
          ctx.beginPath();
          ctx.moveTo(ch.x, ch.y - 20); ctx.lineTo(ch.x, ch.y - gap);
          ctx.moveTo(ch.x, ch.y + 20); ctx.lineTo(ch.x, ch.y + gap);
          ctx.moveTo(ch.x - 20, ch.y); ctx.lineTo(ch.x - gap, ch.y);
          ctx.moveTo(ch.x + 20, ch.y); ctx.lineTo(ch.x + gap, ch.y);
          ctx.stroke();

          ctx.beginPath(); ctx.arc(ch.x, ch.y, 2, 0, Math.PI * 2); ctx.fill();
        }

        // Adrenaline vignette
        const timeElapsed = DRILL_DURATION - engine.current.timeLeft;
        let vignetteAlpha = 0;
        if (timeElapsed > 45) {
          const pulse = Math.sin(time * 0.003) * 0.05;
          vignetteAlpha = 0.38 + pulse;
        } else if (timeElapsed > 30) {
          vignetteAlpha = 0.25;
        } else if (timeElapsed > 15) {
          vignetteAlpha = 0.12;
        }

        if (vignetteAlpha > 0) {
          const grad = ctx.createRadialGradient(
            cvs.width / 2, cvs.height / 2, cvs.height * 0.45,
            cvs.width / 2, cvs.height / 2, cvs.width * 0.8
          );
          grad.addColorStop(0, 'rgba(5, 5, 8, 0)');
          grad.addColorStop(1, `rgba(239, 68, 68, ${vignetteAlpha * 0.4})`);
          ctx.fillStyle = grad;
          ctx.fillRect(0, 0, cvs.width, cvs.height);
        }
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
  }, [gameState, pointerLocked, playSound, endGame, weaponSpray, isMobileDevice, spawnTarget]);

  const isActive = isMobileDevice || pointerLocked;

  return (
    <div className="min-h-screen select-none bg-[#050508] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Navigation & Header */}
        {!isFullscreen && !isMobileLandscape && (
          <div className="mb-6">
            <nav className="mb-4">
              <ol className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
                <li><Link href="/" className="hover:text-gray-300">Home</Link></li>
                <li><ChevronRight className="w-4 h-4 text-gray-600" /></li>
                <li><Link href="/drills/fps" className="hover:text-gray-300">FPS</Link></li>
                <li><ChevronRight className="w-4 h-4 text-gray-600" /></li>
                <li className="text-red-400 font-medium">Anti-Zigzag Tracker</li>
              </ol>
            </nav>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-br from-red-500 to-orange-600 rounded-xl shadow-[0_0_20px_rgba(239,68,68,0.3)]">
                  <Crosshair className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Anti-Zigzag Tracker</h1>
                  <p className="text-sm text-gray-400 mt-1 font-medium">Counter Desync & Strafe Evasion • Endless Progression</p>
                </div>
              </div>

              <div className="flex gap-2">
                <button onClick={() => setSoundEnabled(v => !v)} className="p-2.5 rounded-lg border border-gray-700 bg-gray-900 text-gray-400 hover:text-white transition-all">
                  {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                </button>
                <button onClick={toggleFullscreen} className="p-2.5 rounded-lg border border-gray-700 bg-gray-900 text-gray-400 hover:text-white transition-all">
                  <Maximize2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Live HUD Stats */}
        {!isFullscreen && !isMobileLandscape && (
          <div className="grid grid-cols-5 gap-2 mb-2">
            <StatCard icon={<Trophy className="text-yellow-400" />} value={score} label="Score" />
            <StatCard icon={<TrendingUp className="text-blue-400" />} value={`Lv. ${level}`} label="Level" />
            <StatCard
              icon={<Flame className={streak >= 5 ? "text-orange-500 animate-pulse" : "text-gray-500"} />}
              value={`${streak}s`}
              label="Combo"
              highlight={streak >= 5}
            />
            <StatCard icon={<Timer className={timeLeft <= 10 ? 'text-red-400 animate-pulse' : 'text-green-400'} />} value={timeLeft} label="Time" unit="s" />
            <StatCard icon={<Info className="text-blue-400" />} value={isMobileDevice ? `${trackingAccuracy}%` : `${universalSens.toFixed(2)}x`} label={isMobileDevice ? "Accuracy" : "Sens"} />
          </div>
        )}

        {/* Engine Container */}
        <div
          ref={containerRef}
          className={`relative overflow-hidden transition-colors outline-none bg-[#05060b] ${
            isFullscreen ? 'w-full h-full' : isMobileLandscape ? 'fixed inset-0 z-50 w-screen h-screen' : 'w-full aspect-video min-h-[500px] rounded-2xl border border-gray-800 shadow-2xl'
          }`}
        >
          {/* Progress Bar */}
          {gameState === 'playing' && (
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gray-900 z-[60]">
              <div ref={progressBarRef} className="h-full bg-red-500" style={{ width: '100%' }} />
            </div>
          )}

          {/* Mobile Rotate Warning */}
          {showRotateWarning && !isMobileLandscape && (
            <div className="absolute inset-0 z-[100] bg-[#05070e]/98 flex flex-col items-center justify-center p-6 text-center select-none backdrop-blur-md">
              <RotateCcw className="w-14 h-14 mx-auto animate-bounce mb-5 text-red-500" />
              <h3 className="text-lg font-black text-white uppercase font-mono tracking-widest mb-2">Landscape Recommended</h3>
              <p className="text-xs text-slate-400 max-w-xs mb-6 mx-auto">Please rotate your device to landscape for optimal tracking space.</p>
              <div className="flex flex-col gap-2 max-w-[200px] w-full mx-auto">
                <button onClick={() => setShowRotateWarning(false)} className="px-6 py-3 bg-white text-black font-mono text-[10px] uppercase rounded-lg font-bold">Rotate Device</button>
                <button onClick={() => setShowRotateWarning(false)} className="px-6 py-2 bg-slate-900 border border-gray-800 text-slate-400 font-mono text-[9px] uppercase rounded-lg">Continue Anyway</button>
              </div>
            </div>
          )}

          {/* Fullscreen Overlay HUD */}
          {isFullscreen && gameState === 'playing' && (
            <>
              <div className="absolute top-6 left-6 z-[60] flex flex-col gap-2 pointer-events-none">
                <div className="bg-black/40 backdrop-blur border border-gray-800 px-4 py-2 rounded-xl flex items-center gap-4">
                  <div className="text-center">
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Score</p>
                    <p className="text-2xl font-black text-white leading-none">{score}</p>
                  </div>
                  <div className="w-px h-8 bg-gray-800"></div>
                  <div className="text-center">
                    <p className="text-[10px] text-red-400 font-bold uppercase tracking-widest">Level</p>
                    <p className="text-2xl font-black text-red-400 leading-none">{level}</p>
                  </div>
                  <div className="w-px h-8 bg-gray-800"></div>
                  <div className="text-center">
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Accuracy</p>
                    <p className="text-2xl font-black text-white leading-none">{trackingAccuracy}%</p>
                  </div>
                </div>

                {streak > 1 && (
                  <div className="bg-black/40 backdrop-blur border border-orange-500/30 px-4 py-2 rounded-xl flex items-center gap-3">
                    <Flame className="w-5 h-5 text-orange-500" />
                    <div>
                      <p className="text-[10px] text-orange-400 font-bold uppercase tracking-widest">Combo</p>
                      <p className="text-xl font-black text-white leading-none">{streak}s</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="absolute top-4 right-4 z-[60] flex gap-2">
                <button onClick={() => setSoundEnabled(v => !v)} className="p-3 bg-black/60 border border-gray-600 rounded-xl text-white hover:bg-gray-800 transition-colors">
                  {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                </button>
                <button onClick={toggleFullscreen} className="p-3 bg-black/60 border border-gray-600 rounded-xl text-white hover:bg-gray-800 transition-colors">
                  <Minimize2 className="w-5 h-5" />
                </button>
              </div>
            </>
          )}

          {/* Paused Overlay (Desktop) */}
          {gameState === 'playing' && !isMobileDevice && !pointerLocked && (
            <div
              className="absolute inset-0 z-40 bg-black/60 backdrop-blur-sm flex items-center justify-center cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                if (canvasRef.current) canvasRef.current.requestPointerLock();
              }}
            >
              <div className="text-center animate-pulse pointer-events-none">
                <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <h2 className="text-3xl font-black text-white tracking-widest uppercase mb-2">Game Paused</h2>
                <p className="text-gray-300 font-medium">Click anywhere on the screen to lock cursor and resume.</p>
              </div>
            </div>
          )}

          {/* Core Canvas */}
          <canvas
            ref={canvasRef}
            onClick={() => { if (gameState === 'playing' && !isMobileDevice && !pointerLocked) canvasRef.current?.requestPointerLock(); }}
            className={`block absolute top-0 left-0 w-full h-full touch-none z-10 ${gameState === 'playing' && !isMobileDevice ? 'cursor-none' : ''}`}
          />

          {/* START SCREEN */}
          {gameState === 'start' && (!showRotateWarning || isMobileLandscape) && (
            <div className="absolute inset-0 bg-[#05070e]/98 flex flex-col items-center justify-center p-6 z-30 select-none overflow-y-auto max-h-[100vh] backdrop-blur-sm">
              <div className="max-w-md w-full text-center">
                <h2 className="text-xl font-black text-white uppercase tracking-wider mb-1">
                  Anti-Zigzag Tracking
                </h2>
                <p className="text-xs text-slate-500 uppercase tracking-widest mb-6">
                  {isMobileDevice ? 'Touch Hold & Track Target' : 'Hardware Raw Input • Endless Progression'}
                </p>

                <div className="grid grid-cols-2 gap-3 mb-6 text-left">
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Destroy</span>
                    <span className="text-sm font-black text-green-400">+10 Pts / +1.0s</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Escape</span>
                    <span className="text-sm font-black text-red-400">-1.0s Penalty</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Time Limit</span>
                    <span className="text-sm font-black text-yellow-400">60 Seconds</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Mode</span>
                    <span className="text-sm font-black text-blue-400">{weaponSpray ? 'Weapon Spray' : 'Passive Track'}</span>
                  </div>
                </div>

                {/* Settings */}
                <div className="bg-[#0b0f19] border border-slate-850 p-4 rounded-xl mb-6 text-left text-xs text-slate-400 space-y-4">
                  {/* Sensitivity (desktop only) */}
                  {!isMobileDevice && (
                    <div>
                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-white uppercase mb-2">
                        <Sliders className="w-3.5 h-3.5 text-red-500" /> Universal Sens
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-red-400 font-mono text-sm font-bold">{universalSens.toFixed(2)}x</span>
                        <span className="text-[10px] text-slate-500">Approx: {cmPer360} cm/360</span>
                      </div>
                      <input
                        type="range" min="0.1" max="3.0" step="0.05"
                        value={universalSens}
                        onChange={(e) => setUniversalSens(parseFloat(e.target.value))}
                        className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-red-500"
                      />
                    </div>
                  )}

                  {/* Weapon Spray Toggle (desktop only) */}
                  {!isMobileDevice && (
                    <div className="border-t border-slate-800 pt-3 flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-white font-bold uppercase">Weapon Spray Mode</span>
                        <span className="text-[9px] text-slate-500">Hold Left-Click to fire bullets</span>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={weaponSpray}
                          onChange={(e) => setWeaponSpray(e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-9 h-5 bg-slate-850 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-slate-400 after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-red-600 peer-checked:after:bg-white"></div>
                      </label>
                    </div>
                  )}
                </div>

                <button
                  onClick={startGame}
                  className="w-full py-3 bg-white hover:bg-gray-200 text-black font-black rounded-xl text-xs flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.3)] uppercase tracking-widest font-mono transition-all duration-200 active:scale-95"
                >
                  <Play className="w-4 h-4 fill-black text-black" />
                  Begin Reflex Trial
                </button>
              </div>
            </div>
          )}

          {/* GAME OVER DASHBOARD */}
          {gameState === 'gameOver' && analytics.rankData && (
            <div className="absolute inset-0 bg-[#05070e]/98 flex flex-col items-center justify-center p-6 z-30 select-none overflow-y-auto max-h-[100vh] backdrop-blur-sm">
              <div className="max-w-md w-full text-center">
                {isNewBest && (
                  <div className="inline-block bg-yellow-500 text-black text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-3 shadow-[0_0_15px_rgba(234,179,8,0.5)] animate-bounce">
                    ⭐ NEW PERSONAL BEST!
                  </div>
                )}

                <h2 className="text-xl font-black text-white uppercase tracking-wider mb-1">
                  Simulation Complete
                </h2>
                <p className="text-xs text-slate-500 uppercase tracking-widest mb-6">
                  Peak difficulty reached: Level {analytics.difficultyReached}
                </p>

                <div className="grid grid-cols-3 gap-3 mb-6 text-left">
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Final Score</span>
                    <span className="text-lg font-black text-white">{score}</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Track Acc</span>
                    <span className="text-lg font-black text-white">{analytics.accuracy}%</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Stability</span>
                    <span className="text-lg font-black text-white">{analytics.stabilityScore}%</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Destroyed</span>
                    <span className="text-lg font-black text-green-400">{analytics.targetsDestroyed}</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Escaped</span>
                    <span className="text-lg font-black text-red-400">{analytics.targetsEscaped}</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Assigned Rank</span>
                    <span className={`text-lg font-black ${analytics.rankData.color}`}>
                      Rank {analytics.rankData.rank}
                    </span>
                  </div>
                </div>

                <div className="bg-[#0b0f19] border border-slate-850 p-4 rounded-xl mb-6 text-left text-xs text-slate-400">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-white uppercase mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-yellow-500" /> Improvement Suggestion:
                  </div>
                  <p className="leading-relaxed">
                    {getSuggestion(analytics.rankData.rank, analytics.accuracy, analytics.stabilityScore, analytics.targetsDestroyed, analytics.targetsEscaped)}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={startGame}
                    className="flex-1 py-3 bg-white hover:bg-gray-200 text-black font-black rounded-xl text-xs flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.3)] uppercase tracking-widest font-mono transition-all duration-200 active:scale-95"
                  >
                    <RefreshCw className="w-4 h-4 text-black" />
                    Run another trial
                  </button>
                  <button
                    onClick={shareScore}
                    className="p-3 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white rounded-xl transition-colors active:scale-95"
                    title="Share Score"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Progression & Scoring Rules */}
        {!isFullscreen && !isMobileLandscape && (
          <section className="mt-10">
            <div className="rounded-2xl border border-gray-800 overflow-hidden bg-gray-900 shadow-2xl pointer-events-none">
              <div className="px-6 py-5 border-b border-gray-800 bg-black/40 flex items-center gap-3">
                <Info className="w-5 h-5 text-red-400" /><h2 className="font-bold text-white text-lg tracking-wide">Progression & Scoring Rules</h2>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-5">
                  <RuleItem num="1" color="green" text="Destroy Target" highlight="+10 PTS / +1.0s" result="Depletes health via tracking" />
                  <RuleItem num="2" color="orange" text="Combo System" highlight="5s / 10s / 20s Milestones" result="Bonus score for sustained lock" />
                </div>
                <div className="space-y-5">
                  <RuleItem num="3" color="fuchsia" text="Level Progression" highlight="Every 150 Score" result="Speed, size, zigzag scale" />
                  <RuleItem num="4" color="red" text="Target Escape" highlight="-1.0s Penalty" result="Fail to kill before timeout" />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* About Section */}
        {!isFullscreen && !isMobileLandscape && (
          <article className="mt-12 text-gray-300">
            <div className="rounded-2xl border border-gray-800 overflow-hidden bg-gray-900 shadow-xl">
              <div className="px-6 py-5 border-b border-gray-800 bg-black/40 flex items-center gap-3">
                <GraduationCap className="w-5 h-5 text-red-400" />
                <h2 className="font-bold text-white text-lg tracking-wide">Countering Zigzag Movement</h2>
              </div>

              <div className="p-8 space-y-8">
                <section>
                  <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                    <Eye className="w-5 h-5 text-red-400" /> What is Anti-Zigzag Training?
                  </h3>
                  <p className="text-sm leading-relaxed mb-4">
                    <strong>Anti-zigzag tracking</strong> trains your ability to maintain continuous crosshair contact on targets that abuse erratic direction changes, slide-cancels, crouch spamming, and burst strafes. Unlike smooth pursuit training, this drill forces reactive corrections against unpredictable V-shaped snap reversals.
                  </p>
                  <p className="text-sm leading-relaxed">
                    In high-TTK games like Apex Legends, Warzone, and Call of Duty Mobile, opponents use aggressive zigzag movement to desync their hitbox from their visual model. This drill replicates that exact broken momentum shift to build your reactive tracking muscle memory.
                  </p>
                </section>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 py-4 border-y border-gray-800/50">
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40 hover:bg-gray-800/50 transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center"><Users className="w-4 h-4 text-white" /></div>
                      <h4 className="text-sm font-bold text-white">Who Should Train This?</h4>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">FPS players who struggle against aggressive strafing opponents. Essential for CODM, Apex, Warzone, and CS2 ranked play.</p>
                  </div>
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40 hover:bg-gray-800/50 transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-fuchsia-600 flex items-center justify-center"><TrendingUp className="w-4 h-4 text-white" /></div>
                      <h4 className="text-sm font-bold text-white">Reactive Discipline</h4>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Trains you to stop predicting and start reacting. Develops the muscle memory to snap back to center when a target reverses direction.</p>
                  </div>
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40 hover:bg-gray-800/50 transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-orange-600 flex items-center justify-center"><Zap className="w-4 h-4 text-white" /></div>
                      <h4 className="text-sm font-bold text-white">Movement Reading</h4>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Teaches you to identify the V-crossover point in a strafe pattern and aim at the center of the movement arc rather than chasing the edges.</p>
                  </div>
                </div>

                <section className="border-t border-gray-800 pt-6">
                  <h3 className="text-xl font-bold text-white mb-3">The Zigzag Desync Meta</h3>
                  <p className="text-sm leading-relaxed mb-4">
                    In games like Call of Duty Mobile, players rapidly alternate joystick directions causing network <strong>desync</strong>—the visual character model trails behind the actual server hitbox. This drill replicates that sudden, broken momentum shift with increasing speed and frequency at higher levels.
                  </p>
                </section>

                <section className="border-t border-gray-800 pt-6">
                  <h3 className="text-xl font-bold text-white mb-3">How to Counter It</h3>
                  <p className="text-sm leading-relaxed mb-4">
                    When facing a sweaty player zigzagging in CQC, avoid chasing their sweeps. Instead, aim at the <strong>V-crossover point</strong> (the center of their movement path). Wait for the direction change, make a controlled micro-flick to re-acquire, and maintain fire through the reversal.
                  </p>
                </section>
              </div>

              {/* FAQ Section */}
              <div className="bg-[#0b0f19] border-t border-gray-800 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Lightbulb className="w-6 h-6 text-yellow-400" />
                  <h3 className="text-xl font-bold text-white">Frequently Asked Questions</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FAQItem q="1. Why do players zigzag in CODM?" a="It throws off aim assist, desyncs the physical hitbox from the visual character model, and forces you to waste ammunition trying to track wide, unpredictable sweeps." />
                  <FAQItem q="2. Should I zigzag back during gunfights?" a="Yes and no. While strafing is vital, excessive zigzagging without proper crosshair alignment will ruin your own aim. Good players balance evasion with precision." />
                  <FAQItem q="3. Is this drill for touch screen or mouse?" a="Both. The engine dynamically scales the target sizes and hitboxes depending on whether you are swiping on a mobile device or aiming with a desktop mouse." />
                  <FAQItem q="4. How do I get a higher accuracy score?" a="Stop predicting. Reactive tracking means letting your eyes process the direction change first, then snapping to the target. Predicting leads to over-flicking." />
                  <FAQItem q="5. What is the V-crossover point?" a="It's the center of a zigzag strafe path. Instead of chasing the target to each extreme, aim at where the target crosses through the middle of its movement arc." />
                  <FAQItem q="6. How does the level progression work?" a="Every 150 points increases the level. Higher levels make targets smaller, faster, and perform more frequent direction changes with less time before escape." />
                  <FAQItem q="7. What sensitivity should I use?" a="For tracking, moderate to low sensitivity (25–45 cm/360) works best. Use the universal sensitivity slider to match your in-game settings before starting." />
                  <FAQItem q="8. What is the weapon spray mode?" a="When enabled, you hold left-click to fire bullets every 80ms. Each bullet is hit-tested against the target. This simulates actual firing mechanics with bullet accuracy tracking." />
                  <FAQItem q="9. How is stability score calculated?" a="Stability measures how steady your cursor path is. High deviation from the target center increases jitter score. Lower sensitivity and relaxed grip improve stability." />
                  <FAQItem q="10. Can this improve my Apex Legends tracking?" a="Yes significantly. Apex fights require 0.5–2s of continuous tracking to confirm kills. Training reactive tracking against direction changes directly improves your damage output." />
                  <FAQItem q="11. What causes the target to escape?" a="Each target has a lifespan timer (shown as a red arc). If you don't deplete its health before the timer runs out, it escapes and you lose 1 second from your clock." />
                  <FAQItem q="12. How do combo milestones work?" a="Maintaining continuous crosshair lock on a target earns bonus points at 5s, 10s, and 20s milestones. Breaking contact resets the combo timer." />
                  <FAQItem q="13. Does this help with recoil control?" a="Indirectly. The reactive micro-adjustments trained here apply to recoil tracking as well. For dedicated recoil training, try the Recoil Control drill." />
                  <FAQItem q="14. Is this aim trainer free?" a="Yes, this tracking trainer is 100% free, requires no sign-ups or downloads, and runs natively in modern browsers with hardware-level mouse input." />
                  <FAQItem q="15. How often should I train anti-zigzag tracking?" a="5–6 sessions per week of 10–15 minutes each. Daily warm-ups before ranked play are ideal for building and maintaining reactive tracking muscle memory." />
                </div>
              </div>
            </div>
          </article>
        )}

        {/* Related Drills Grid */}
        {!isFullscreen && !isMobileLandscape && (
          <section className="mt-14" aria-label="Explore related aim and response drills">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-5 rounded-full bg-red-500"></div>
              <h2 className="text-xs font-bold text-white uppercase tracking-widest font-mono">
                Explore Related FPS Drills
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <RelatedCard href="/drills/fps/pro-smooth-pursuit" title="Pro Smooth Pursuit" desc="Master smooth continuous target tracking on Lissajous curves." color="green" icon={<Target className="w-4 h-4" />} />
              <RelatedCard href="/drills/fps/reactive-sphere-tracking" title="Reactive Sphere" desc="Track targets performing rapid direction swaps." color="blue" icon={<Target className="w-4 h-4" />} />
              <RelatedCard href="/drills/fps/flick-shot-training" title="Flick Shot Training" desc="Snap-aim precision training for headshot consistency." color="orange" icon={<Flame className="w-4 h-4" />} />
              <RelatedCard href="/drills/fps/recoil-control" title="Recoil Control" desc="Weapon spray pattern compensation training." color="red" icon={<Activity className="w-4 h-4" />} />
            </div>
          </section>
        )}

        {/* Footer */}
        {!isFullscreen && !isMobileLandscape && (
          <footer className="mt-12 bg-[#05060b] border border-gray-800 text-gray-500 rounded-xl py-10 px-6 font-mono text-[10px]" role="contentinfo">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 mb-8">
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Motor & FPS</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/motor/hand-eye-coordination/aim-trainer" className="hover:text-red-400 transition-colors">Aim Trainer Elite</Link></li>
                    <li><Link href="/drills/fps/flick-shot-training" className="hover:text-red-400 transition-colors">Flick Shot Trainer</Link></li>
                    <li><Link href="/drills/fps/pro-smooth-pursuit" className="hover:text-red-400 transition-colors">Smooth Pursuit</Link></li>
                    <li><Link href="/drills/fps" className="text-red-500 hover:text-red-400 transition-colors font-bold">All FPS Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Memory</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/memory/working-memory/n-back" className="hover:text-red-400 transition-colors">3-Back Training</Link></li>
                    <li><Link href="/drills/memory/short-term-memory/color-sequence" className="hover:text-red-400 transition-colors">Color Sequence</Link></li>
                    <li><Link href="/drills/memory" className="text-red-500 hover:text-red-400 transition-colors font-bold">All Memory Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Cognitive</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/cognitive/memory/card-matching" className="hover:text-red-400 transition-colors">Memory Games</Link></li>
                    <li><Link href="/drills/cognitive/attention/divided-attention" className="hover:text-red-400 transition-colors">Attention Drills</Link></li>
                    <li><Link href="/drills/cognitive" className="text-red-500 hover:text-red-400 transition-colors font-bold">All Cognitive Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Academic</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/academic/writing-speed/typing-test" className="hover:text-red-400 transition-colors">Typing Speed Test</Link></li>
                    <li><Link href="/drills/academic/math-speed/mental-math" className="hover:text-red-400 transition-colors">Mental Math</Link></li>
                    <li><Link href="/drills/academic" className="text-red-500 hover:text-red-400 transition-colors font-bold">All Academic Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">More Sectors</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/visual" className="hover:text-red-400 transition-colors">Visual</Link></li>
                    <li><Link href="/drills/physical" className="hover:text-red-400 transition-colors">Physical</Link></li>
                    <li><Link href="/drills/reaction-speed" className="hover:text-red-400 transition-colors">Reaction Speed</Link></li>
                  </ul>
                </div>
              </div>

              <div className="border-t border-gray-800 pt-8 text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="w-6 h-6 bg-gradient-to-br from-red-500/20 to-orange-500/20 border border-red-500/30 rounded-lg flex items-center justify-center">
                    <Crosshair className="w-3.5 h-3.5 text-red-400" />
                  </div>
                  <span className="text-white font-black tracking-widest text-xs uppercase">SkillDrills</span>
                </div>
                <p className="text-[9px] mb-2">&copy; {new Date().getFullYear()} SkillDrills. All rights reserved.</p>
                <p className="text-[9px] max-w-2xl mx-auto leading-relaxed mb-6 font-sans">
                  Open-source telemetry training platform using hardware pointer lock. Free forever. No downloads required.
                </p>

                <div className="flex items-center justify-center gap-4 flex-wrap mt-6">
                  <a href="https://youtube.com/@skilldrills.online" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors p-2.5 bg-gray-900 rounded-full hover:bg-gray-800 shadow-md" title="YouTube">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93 .502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                  </a>
                  <a href="https://www.facebook.com/profile.php?id=61590093843779" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors p-2.5 bg-gray-900 rounded-full hover:bg-gray-800 shadow-md" title="Facebook">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  </a>
                  <a href="https://x.com/skilldrillss" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors p-2.5 bg-gray-900 rounded-full hover:bg-gray-800 shadow-md" title="Twitter / X">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  </a>
                  <a href="https://www.instagram.com/skilldrills.online/?__pwa=1" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors p-2.5 bg-gray-900 rounded-full hover:bg-gray-800 shadow-md" title="Instagram">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
                  </a>
                  <a href="https://pinterest.com/skilldrills" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors p-2.5 bg-gray-900 rounded-full hover:bg-gray-800 shadow-md" title="Pinterest">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/></svg>
                  </a>
                </div>
              </div>
            </div>
          </footer>
        )}
      </div>
    </div>
  );
}

// === Subcomponents ===
function StatCard({ icon, value, label, unit = '', highlight = false }) {
  return (
    <div className={`group rounded-xl border ${highlight ? 'border-orange-500/50 bg-orange-500/5' : 'border-gray-800 bg-gray-900/50'} p-2 text-center flex flex-col justify-center h-full transition-all duration-300 hover:scale-[1.03] hover:border-gray-700`}>
      <div className="mb-1 flex justify-center transition-transform duration-300 group-hover:scale-110">
        {icon}
      </div>
      <p className="text-xs sm:text-base font-black tracking-tight truncate text-white">
        {value} <span className="text-[10px] font-semibold text-gray-500">{unit}</span>
      </p>
      <p className="text-[9px] font-mono font-bold uppercase tracking-wider text-gray-500 truncate">{label}</p>
    </div>
  );
}

function RuleItem({ num, color, text, highlight = '', result }) {
  const colorMap = {
    blue: 'bg-blue-600 text-blue-300 border-blue-500',
    fuchsia: 'bg-fuchsia-600 text-fuchsia-300 border-fuchsia-500',
    red: 'bg-red-600 text-red-300 border-red-500',
    orange: 'bg-orange-600 text-orange-300 border-orange-500',
    green: 'bg-green-600 text-green-300 border-green-500'
  };
  const colors = colorMap[color] || 'bg-gray-600 text-gray-300 border-gray-500';
  const [bg, txt, border] = colors.split(' ');

  return (
    <div className="flex items-center gap-4 bg-[#0b0f19]/40 p-4 rounded-xl border border-gray-800 shadow-sm">
      <div className={`w-8 h-8 rounded-xl ${bg} border border-t-white/20 flex items-center justify-center text-white text-base font-black shadow-lg flex-shrink-0`}>{num}</div>
      <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <p className="text-sm font-medium text-gray-300">
          {text}{highlight && <span className={`font-black ${txt}`}> {highlight}</span>}
        </p>
        <div className={`text-xs font-black px-3 py-1.5 rounded-lg bg-[#050811] border ${border} ${txt} whitespace-nowrap shadow-inner tracking-wide text-center sm:text-left`}>
          {result}
        </div>
      </div>
    </div>
  );
}

function RelatedCard({ href, title, desc, color, icon }) {
  const gradients = {
    blue: 'from-blue-500 to-indigo-500',
    orange: 'from-orange-500 to-amber-500',
    red: 'from-red-500 to-rose-500',
    green: 'from-green-500 to-emerald-500',
  };
  return (
    <Link href={href} className="group relative overflow-hidden rounded-2xl border border-gray-800 bg-[#0b0f19]/40 transition-all hover:-translate-y-1 hover:border-gray-600 block p-5">
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${gradients[color]}`}></div>
      <div className="w-10 h-10 rounded-xl bg-[#050811] border border-gray-700 flex items-center justify-center text-gray-400 group-hover:text-white mb-3 shadow-inner transition-colors">
        {icon}
      </div>
      <h3 className="font-bold text-base mb-1.5 text-white transition-colors">{title}</h3>
      <p className="text-xs text-gray-500 mb-4">{desc}</p>
      <div className="flex items-center gap-1.5 text-red-400 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-wider">
        Start Drill <ArrowRight className="w-3.5 h-3.5" />
      </div>
    </Link>
  );
}

function FAQItem({ q, a }) {
  return (
    <div className="bg-[#05060b] border border-gray-800 rounded-xl p-5 hover:border-gray-700 transition-colors">
      <h4 className="text-sm font-bold text-gray-200 mb-2">{q}</h4>
      <p className="text-xs text-gray-400 leading-relaxed">{a}</p>
    </div>
  );
}