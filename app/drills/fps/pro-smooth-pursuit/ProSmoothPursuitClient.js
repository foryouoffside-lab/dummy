'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Head from 'next/head';

import { 
  Activity, AlertCircle, ArrowRight, BarChart3, ChevronRight, 
  Clock, Crosshair, Eye, GraduationCap, Info, Lightbulb, 
  Maximize2, Minimize2, Play, RefreshCw, Target, 
  Timer, TrendingUp, Trophy, Volume2, VolumeX, Zap, 
  Users, CheckCircle2, XCircle, Shield, Award, Sparkles, Flame,
  Share2, Sliders
} from 'lucide-react';

const DRILL_DURATION = 60; // Strict 60 seconds

// Level configurations based on Score (scales every 200 points)
const getLevelStats = (score) => {
  const lvl = Math.floor(score / 200) + 1;
  let radius, speed, horizontalFreq, verticalFreq;
  
  if (lvl === 1) {
    radius = 32;
    speed = 0.8;
    horizontalFreq = 0.3;
    verticalFreq = 0.7; // predictability
  } else if (lvl === 2) {
    radius = 27;
    speed = 1.1;
    horizontalFreq = 0.4;
    verticalFreq = 1.0;
  } else if (lvl === 3) {
    radius = 22;
    speed = 1.4;
    horizontalFreq = 0.5;
    verticalFreq = 1.5; // wider curves
  } else if (lvl === 4) {
    radius = 18;
    speed = 1.8;
    horizontalFreq = 0.65;
    verticalFreq = 2.0; // sharper turns
  } else if (lvl === 5) {
    radius = 14;
    speed = 2.2;
    horizontalFreq = 0.8;
    verticalFreq = 2.4; // precision focus
  } else {
    // Level 6+ infinite progression
    const scaleFactor = lvl - 5;
    radius = Math.max(9, 14 - scaleFactor * 0.8);
    speed = 2.2 + scaleFactor * 0.15;
    horizontalFreq = 0.8 + scaleFactor * 0.05;
    verticalFreq = 2.4 + scaleFactor * 0.1;
  }
  
  return { lvl, radius, speed, horizontalFreq, verticalFreq };
};

// Calculate tracking grade based on performance metrics
const calculateRank = (level, accuracy, stability, rt) => {
  if (level >= 6 && accuracy >= 75 && stability >= 80 && rt <= 200 && rt > 0) return { rank: 'S+', color: 'text-fuchsia-400' };
  if (level >= 5 && accuracy >= 65 && stability >= 70 && rt <= 240 && rt > 0) return { rank: 'S', color: 'text-yellow-400' };
  if (level >= 4 && accuracy >= 55 && stability >= 65 && rt <= 280 && rt > 0) return { rank: 'A', color: 'text-green-400' };
  if (level >= 3 && accuracy >= 40) return { rank: 'B', color: 'text-blue-400' };
  if (level >= 2 && accuracy >= 30) return { rank: 'C', color: 'text-indigo-400' };
  return { rank: 'D', color: 'text-slate-400' };
};

const getSuggestion = (rank, accuracy, stability) => {
  if (rank === 'S+' || rank === 'S') return "Elite pursuit mapping. Your tracking consistency and target transition reflexes are peak tier. Keep pushing the difficulty levels!";
  if (accuracy < 50) return "Your tracking accuracy is low. Try focusing on the target's center and reducing predictive arm movements. React, don't guess!";
  if (stability < 60) return "Your cursor path exhibits high jitter. Focus on keeping your wrist relaxed, or try lowering your universal sensitivity to improve stability.";
  return "Excellent baseline. Focus on maintaining a tight lock during rapid curve transitions to build higher combo chains.";
};

export default function ProSmoothPursuitClient() {
  // === UI & Viewport State ===
  const [gameState, setGameState] = useState('start'); 
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [pointerLocked, setPointerLocked] = useState(false);
  
  // === Settings State ===
  const [universalSens, setUniversalSens] = useState(1.0);
  const [weaponSpray, setWeaponSpray] = useState(true); // Toggle spray option

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
    reactionDelay: 0,
    stabilityScore: 0,
    longestContinuousTrack: 0,
    avgReacquisitionTime: 0,
    directionChangeSuccess: 0,
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
    speed: 0.8,
    radius: 32,
    isHit: false,
    score: 0,
    timeLeft: DRILL_DURATION,
    crosshair: { x: 0, y: 0, initialized: false },
    
    // Performance accumulators
    totalFrames: 0,
    framesOnTarget: 0,
    continuousTrackTime: 0,
    comboTime: 0,
    bestComboTime: 0,
    peakAccuracy: 0,
    deviationSum: 0,
    deviationCount: 0,
    
    innerCoreHits: 0,
    totalHits: 0,
    
    velocityErrorSum: 0,
    velocityErrorCount: 0,
    lastTx: 0,
    lastTy: 0,
    
    level: 1,

    // Spray mechanic additions
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

  // === Initialization & Local Storage ===
  useEffect(() => {
    try {
      const savedSens = localStorage.getItem('proPursuit_sens');
      if (savedSens) setUniversalSens(parseFloat(savedSens));
      const savedBest = localStorage.getItem('proPursuit_bestScore');
      if (savedBest) setBestScore(parseInt(savedBest, 10));
      const savedSpray = localStorage.getItem('proPursuit_spray');
      if (savedSpray) setWeaponSpray(savedSpray === 'true');
    } catch (e) {}
  }, []);

  useEffect(() => {
    if (gameState !== 'playing') {
      try { 
        localStorage.setItem('proPursuit_sens', universalSens.toString());
        localStorage.setItem('proPursuit_spray', weaponSpray.toString());
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
      
      if (type === 'score') {
        o.type = 'sine';
        o.frequency.setValueAtTime(880, now); 
        o.frequency.setValueAtTime(1108.73, now + 0.05); 
        g.gain.setValueAtTime(0.05, now);
        g.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
        o.start(now);
        o.stop(now + 0.25);
      } else if (type === 'combo') {
        o.type = 'sine';
        o.frequency.setValueAtTime(1046.50, now); 
        o.frequency.exponentialRampToValueAtTime(1318.51, now + 0.12); 
        g.gain.setValueAtTime(0.06, now);
        g.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
        o.start(now);
        o.stop(now + 0.4);
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
      }
    } catch(e) {}
  }, [soundEnabled]);

  // === Core Game Management ===
  const endGame = useCallback(() => {
    setGameState('gameOver');
    if (document.pointerLockElement) document.exitPointerLock();
    
    const e = engine.current;
    
    const finalAccuracy = weaponSpray 
      ? (e.bulletsFired > 0 ? Math.round((e.bulletsHit / e.bulletsFired) * 100) : 0)
      : (e.totalFrames > 0 ? Math.round((e.framesOnTarget / e.totalFrames) * 100) : 0);
      
    const avgDeviation = e.deviationCount > 0 ? Math.round(e.deviationSum / e.deviationCount) : 0;
    const stabilityScore = Math.max(0, Math.min(100, Math.round(100 - avgDeviation * 2.0)));
    const longestStreak = Math.round(e.bestComboTime * 10) / 10;
    
    // Stability delay as reaction proxy
    const avgReaction = e.velocityErrorCount > 0 ? Math.max(100, Math.min(600, Math.round(300 + (e.velocityErrorSum / e.velocityErrorCount) * 0.1))) : 300;
    const levelReached = e.level;
    const rank = calculateRank(levelReached, finalAccuracy, stabilityScore, avgReaction);

    setTrackingAccuracy(finalAccuracy);
    setAnalytics({
      accuracy: finalAccuracy,
      reactionDelay: avgReaction,
      stabilityScore: stabilityScore,
      longestContinuousTrack: longestStreak,
      avgReacquisitionTime: 0,
      directionChangeSuccess: 0,
      difficultyReached: levelReached,
      bestCombo: longestStreak,
      rankData: rank
    });

    setScore(e.score);
    setBestScore(prev => {
      if (e.score > prev) {
        setIsNewBest(true);
        try { localStorage.setItem('proPursuit_bestScore', e.score.toString()); } catch(e){}
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
    setGameState('playing');
    playSound('start');
    
    engine.current = {
      t: 0,
      speed: 0.8,
      radius: 32,
      isHit: false,
      score: 0,
      timeLeft: DRILL_DURATION,
      crosshair: { ...engine.current.crosshair },
      
      totalFrames: 0,
      framesOnTarget: 0,
      continuousTrackTime: 0,
      comboTime: 0,
      bestComboTime: 0,
      peakAccuracy: 0,
      deviationSum: 0,
      deviationCount: 0,
      
      innerCoreHits: 0,
      totalHits: 0,
      
      velocityErrorSum: 0,
      velocityErrorCount: 0,
      lastTx: 0,
      lastTy: 0,
      
      level: 1,

      isMouseDown: false,
      decals: [],
      bulletsFired: 0,
      bulletsHit: 0,
      lastFireTime: 0,
      screenShake: 0,
      particles: [],
      hitMarkers: []
    };

    if (containerRef.current && !document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(()=>{});
    }
    setTimeout(() => {
      if (canvasRef.current && !document.pointerLockElement) {
        canvasRef.current.requestPointerLock().catch(()=>{});
      }
    }, 150);
  }, [playSound]);

  // === Pointer Lock Event Listeners ===
  useEffect(() => {
    const handlePointerLockChange = () => {
      const isLocked = document.pointerLockElement === canvasRef.current;
      setPointerLocked(isLocked);
      if (!isLocked) {
        engine.current.isMouseDown = false;
      }
    };
    document.addEventListener('pointerlockchange', handlePointerLockChange);
    return () => document.removeEventListener('pointerlockchange', handlePointerLockChange);
  }, []);

  useEffect(() => {
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
  }, [gameState, pointerLocked, universalSens]);

  const toggleFullscreen = useCallback(async () => {
    if (!document.fullscreenElement) {
      if (containerRef.current) await containerRef.current.requestFullscreen().catch(()=>{});
    } else {
      await document.exitFullscreen().catch(()=>{});
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

  // === Share Score Resolving the Reference Error ===
  const shareScore = useCallback(async () => {
    const text = `🎯 I scored ${score} PTS (Level ${analytics.difficultyReached}) on Pro Smooth Pursuit! Tracking Accuracy: ${analytics.accuracy}%. Practice your aim at skilldrills.online!`;
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({ title: 'My Tracking Score', text, url: 'https://skilldrills.online/drills/fps' });
      } catch (e) {}
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

    const loop = (time) => {
      const deltaTimeMs = time - lastTime;
      lastTime = time;
      const deltaSec = Math.min(deltaTimeMs / 1000, 0.1); 
      const e = engine.current;

      const stats = getLevelStats(e.score);
      e.level = stats.lvl;
      e.radius = stats.radius;
      e.speed = stats.speed;
      
      if (gameState === 'playing' && pointerLocked) {
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
          progressBarRef.current.className = `h-full ${e.timeLeft <= 10 ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`;
        }

        const intTime = Math.ceil(e.timeLeft);
        if (intTime !== lastTimeRef.current) {
          setTimeLeft(intTime);
          lastTimeRef.current = intTime;
        }

        setLevel(stats.lvl);

        // Lissajous curve trajectory logic
        e.t += stats.speed * deltaSec;
        const tx = (cvs.width / 2) + Math.cos(e.t * stats.horizontalFreq) * (cvs.width / 2.8);
        const ty = (cvs.height / 2) + Math.sin(e.t * stats.verticalFreq) * (cvs.height / 2.5);

        // Target velocities
        const targetVx = (tx - (e.lastTx || tx)) / deltaSec;
        const targetVy = (ty - (e.lastTy || ty)) / deltaSec;
        e.lastTx = tx;
        e.lastTy = ty;

        // Mouse velocity
        const ch = e.crosshair;
        const mouseVx = (ch.x - (e.lastCrosshairX || ch.x)) / deltaSec;
        const mouseVy = (ch.y - (e.lastCrosshairY || ch.y)) / deltaSec;
        e.lastCrosshairX = ch.x;
        e.lastCrosshairY = ch.y;

        // Firing weapon spray logic
        if (weaponSpray && e.isMouseDown) {
          if (time - e.lastFireTime >= 80) {
            e.lastFireTime = time;
            e.bulletsFired++;
            
            const dist = Math.hypot(e.crosshair.x - tx, e.crosshair.y - ty);
            const isTargetHit = dist <= stats.radius;
            
            playSound('shoot');
            
            if (isTargetHit) {
              e.bulletsHit++;
              e.decals.push({ x: e.crosshair.x, y: e.crosshair.y, time, type: 'hit' });
              createExplosion(e.crosshair.x, e.crosshair.y, '#10b981');
              createHitMarker(e.crosshair.x, e.crosshair.y);
              e.screenShake = Math.max(e.screenShake, 2.5);
            } else {
              // Miss fire creates a visual decal/explosion, but no time is penalized.
              e.decals.push({ x: e.crosshair.x, y: e.crosshair.y, time, type: 'miss' });
              createExplosion(e.crosshair.x, e.crosshair.y, '#ef4444');
              e.screenShake = Math.max(e.screenShake, 1.8);
            }
          }
        }

        // Overlap verification & scoring engine
        const dist = Math.hypot(ch.x - tx, ch.y - ty);
        const rawOverlap = dist <= stats.radius;
        const isHit = weaponSpray ? (rawOverlap && e.isMouseDown) : rawOverlap;

        e.deviationSum += dist;
        e.deviationCount++;
        e.totalFrames++;

        if (isHit) {
          const velocityError = Math.hypot(mouseVx - targetVx, mouseVy - targetVy);
          e.velocityErrorSum += velocityError;
          e.velocityErrorCount++;

          e.framesOnTarget++;
          e.totalHits++;

          if (dist <= stats.radius * 0.25) {
            e.innerCoreHits++;
          }

          e.continuousTrackTime += deltaTimeMs;
          if (e.continuousTrackTime >= 1000) {
            e.continuousTrackTime -= 1000;
            
            const currentAcc = weaponSpray 
              ? (e.bulletsFired > 0 ? Math.round((e.bulletsHit / e.bulletsFired) * 100) : 100)
              : (e.totalFrames > 0 ? Math.round((e.framesOnTarget / e.totalFrames) * 100) : 100);

            let pts = 0;
            if (currentAcc >= 95) pts = 8;
            else if (currentAcc >= 90) pts = 6;
            else if (currentAcc >= 80) pts = 4;
            else if (currentAcc >= 70) pts = 2;
            
            if (pts > 0) {
              e.score += pts;
              setScore(e.score);
              playSound('score');
            }
          }

          e.comboTime += deltaSec;
          if (e.comboTime > e.bestComboTime) {
            e.bestComboTime = e.comboTime;
          }

          // Trigger combo milestones
          if (e.comboTime >= 10 && !e.milestone10) {
            e.score += 25;
            e.milestone10 = true;
            setScore(e.score);
            playSound('combo');
          } else if (e.comboTime >= 20 && !e.milestone20) {
            e.score += 50;
            e.milestone20 = true;
            setScore(e.score);
            playSound('combo');
          } else if (e.comboTime >= 30 && !e.milestone30) {
            e.score += 100;
            e.milestone30 = true;
            setScore(e.score);
            playSound('combo');
          } else if (e.comboTime >= 45 && !e.milestone45) {
            e.score += 200;
            e.milestone45 = true;
            setScore(e.score);
            playSound('combo');
          }

        } else {
          e.continuousTrackTime = 0;
          e.comboTime = 0;
          e.milestone10 = false;
          e.milestone20 = false;
          e.milestone30 = false;
          e.milestone45 = false;
        }

        if (e.totalFrames % 15 === 0) {
          const fmtCombo = Math.round(e.comboTime * 10) / 10;
          setStreak(fmtCombo);
          
          const liveAcc = weaponSpray 
            ? (e.bulletsFired > 0 ? Math.round((e.bulletsHit / e.bulletsFired) * 100) : 100)
            : (e.totalFrames > 0 ? Math.round((e.framesOnTarget / e.totalFrames) * 100) : 100);
          setTrackingAccuracy(liveAcc);
        }
      }

      // Lissajous curve coordinates for drawing
      e.t += stats.speed * deltaSec;
      const tx = (cvs.width / 2) + Math.cos(e.t * stats.horizontalFreq) * (cvs.width / 2.8);
      const ty = (cvs.height / 2) + Math.sin(e.t * stats.verticalFreq) * (cvs.height / 2.5);

      // --- RENDERING PHASE ---
      ctx.save();

      // Recoil / camera shake translation
      if (e.screenShake > 0) {
        const sx = (Math.random() - 0.5) * e.screenShake;
        const sy = (Math.random() - 0.5) * e.screenShake;
        ctx.translate(sx, sy);
        e.screenShake *= 0.85;
        if (e.screenShake < 0.5) e.screenShake = 0;
      }

      ctx.fillStyle = '#050508';
      ctx.fillRect(0, 0, cvs.width, cvs.height);

      // Cyber Grid
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.04)';
      ctx.lineWidth = 1;
      for (let i = 0; i < cvs.width; i += 60) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, cvs.height); ctx.stroke(); }
      for (let j = 0; j < cvs.height; j += 60) { ctx.beginPath(); ctx.moveTo(0, j); ctx.lineTo(cvs.width, j); ctx.stroke(); }

      // Trace Path (Faint background curve)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      for (let stepT = 0; stepT < Math.PI * 4; stepT += 0.05) {
        const px = (cvs.width / 2) + Math.cos(stepT * stats.horizontalFreq) * (cvs.width / 2.8);
        const py = (cvs.height / 2) + Math.sin(stepT * stats.verticalFreq) * (cvs.height / 2.5);
        if (stepT === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
      }
      ctx.stroke();

      // Clean decals decay
      e.decals = e.decals.filter(d => time - d.time < 6000);
      e.decals.forEach((d) => {
        const age = time - d.time;
        const opacity = Math.max(0.1, 1 - (age / 6000));
        ctx.fillStyle = d.type === 'hit' ? `rgba(16, 185, 129, ${opacity})` : `rgba(239, 68, 68, ${opacity})`;
        ctx.beginPath();
        ctx.arc(d.x, d.y, 2.5, 0, Math.PI * 2);
        ctx.fill();
      });

      const isActiveAndHit = gameState === 'playing' && pointerLocked && (!weaponSpray || e.isMouseDown) && Math.hypot(e.crosshair.x - tx, e.crosshair.y - ty) <= stats.radius;
      
      // Target Ring Rendering
      ctx.shadowBlur = isActiveAndHit ? 20 : 0;
      ctx.shadowColor = '#10b981';
      ctx.strokeStyle = isActiveAndHit ? '#10b981' : '#eab308';
      ctx.lineWidth = 2.5;
      
      ctx.beginPath();
      ctx.arc(tx, ty, stats.radius, 0, Math.PI * 2);
      ctx.stroke();

      // Inner Core target
      ctx.shadowBlur = 0;
      ctx.fillStyle = isActiveAndHit ? '#10b981' : '#eab308';
      ctx.beginPath();
      ctx.arc(tx, ty, Math.max(3.5, stats.radius * 0.25), 0, Math.PI * 2);
      ctx.fill();

      // Render explosions particles
      for (let i = e.particles.length - 1; i >= 0; i--) {
        const p = e.particles[i];
        p.x += p.vx; p.y += p.vy; p.life -= deltaSec * 2.5;
        if (p.life <= 0) { e.particles.splice(i, 1); continue; }
        ctx.globalAlpha = p.life; ctx.fillStyle = p.color; ctx.fillRect(p.x, p.y, 3, 3);
      }
      ctx.globalAlpha = 1.0;

      // Render hitmarkers
      for (let i = e.hitMarkers.length - 1; i >= 0; i--) {
        const hm = e.hitMarkers[i];
        hm.life -= deltaSec * 4.0;
        if (hm.life <= 0) { e.hitMarkers.splice(i, 1); continue; }
        ctx.globalAlpha = hm.life; ctx.strokeStyle = '#ffffff';
        const s = 6 + (1 - hm.life) * 8;
        ctx.beginPath();
        ctx.moveTo(hm.x - s, hm.y - s); ctx.lineTo(hm.x + s, hm.y + s);
        ctx.moveTo(hm.x + s, hm.y - s); ctx.lineTo(hm.x - s, hm.y + s);
        ctx.stroke();
      }
      ctx.globalAlpha = 1.0;

      // Crosshair Rendering
      const ch = e.crosshair;
      if (ch.initialized && (gameState === 'playing' || gameState === 'start')) {
        const activeColor = pointerLocked ? '#10b981' : '#eab308';
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

      // Adrenaline Vignette Overlay
      if (gameState === 'playing' && pointerLocked) {
        const timeElapsed = DRILL_DURATION - e.timeLeft;
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
          ctx.save();
          const grad = ctx.createRadialGradient(
            cvs.width / 2, cvs.height / 2, cvs.height * 0.45,
            cvs.width / 2, cvs.height / 2, cvs.width * 0.8
          );
          grad.addColorStop(0, 'rgba(5, 5, 8, 0)');
          grad.addColorStop(1, `rgba(16, 185, 129, ${vignetteAlpha * 0.45})`); 
          ctx.fillStyle = grad;
          ctx.fillRect(0, 0, cvs.width, cvs.height);
          ctx.restore();
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
  }, [gameState, pointerLocked, playSound, endGame, weaponSpray]);

  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://skilldrills.online/" },
          { "@type": "ListItem", "position": 2, "name": "FPS Drills", "item": "https://skilldrills.online/drills/fps" },
          { "@type": "ListItem", "position": 3, "name": "Pro Smooth Pursuit", "item": "https://skilldrills.online/drills/fps/pro-smooth-pursuit" }
        ]
      },
      {
        "@type": "WebPage",
        "@id": "https://skilldrills.online/drills/fps/pro-smooth-pursuit",
        "url": "https://skilldrills.online/drills/fps/pro-smooth-pursuit",
        "name": "Pro Smooth Pursuit – Smooth Pursuit Aim Trainer",
        "description": "Improve your foveal visual tracking and arm stability on mathematical curves with this professional FPS pursuit trainer.",
        "breadcrumb": { "@id": "https://skilldrills.online/drills/fps/pro-smooth-pursuit#breadcrumb" },
        "inLanguage": "en-US"
      }
    ]
  };

  return (
    <div className="min-h-screen select-none bg-[#050508] text-white">
      <Head>
        <title>Pro Smooth Pursuit – Smooth Pursuit Aim Trainer</title>
        <meta name="description" content="Improve your foveal visual tracking and arm stability on mathematical curves with this professional FPS pursuit trainer." />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
      </Head>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Navigation & Header (Hidden in Fullscreen) */}
        {!isFullscreen && (
          <div className="mb-6">
            <nav className="mb-4">
              <ol className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
                <li><Link href="/" className="hover:text-gray-300">Home</Link></li>
                <li><ChevronRight className="w-4 h-4 text-gray-600" /></li>
                <li><Link href="/drills/fps" className="hover:text-gray-300">FPS</Link></li>
                <li><ChevronRight className="w-4 h-4 text-gray-600" /></li>
                <li className="text-green-400 font-medium">Pro Smooth Pursuit</li>
              </ol>
            </nav>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                  <Target className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Pro Smooth Pursuit</h1>
                  <p className="text-sm text-gray-400 mt-1 font-medium">Desktop Exclusive • Endless Level Progression</p>
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

        {/* Live HUD Stats (Outside Fullscreen) */}
        {!isFullscreen && (
          <div className="grid grid-cols-5 gap-2 mb-2">
            <StatCard icon={<Trophy className="text-yellow-400" />} value={score} label="Score" />
            <StatCard icon={<TrendingUp className="text-blue-400" />} value={`Lv. ${level}`} label="Level" />
            <StatCard 
              icon={<Flame className={streak >= 10 ? "text-orange-500 animate-pulse" : "text-gray-500"} />} 
              value={`${streak}s`} 
              label="Combo" 
              highlight={streak >= 10}
            />
            <StatCard icon={<Timer className={timeLeft <= 10 ? 'text-red-400 animate-pulse' : 'text-green-400'} />} value={timeLeft} label="Time" unit="s" />
            <StatCard icon={<Info className="text-blue-400" />} value={`${universalSens.toFixed(2)}x`} label="Sens" />
          </div>
        )}

        {/* Engine Container */}
        <div 
          ref={containerRef} 
          className={`relative overflow-hidden transition-colors outline-none bg-[#05060b] ${
            isFullscreen ? 'w-full h-full' : 'w-full aspect-video min-h-[500px] rounded-2xl border border-gray-800 shadow-2xl'
          }`}
        >
          {/* Progress Bar */}
          {gameState === 'playing' && (
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gray-900 z-[60]">
              <div ref={progressBarRef} className="h-full bg-green-500" style={{ width: '100%' }} />
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
                    <p className="text-[10px] text-green-400 font-bold uppercase tracking-widest">Level</p>
                    <p className="text-2xl font-black text-green-400 leading-none">{level}</p>
                  </div>
                </div>
                
                {streak > 1 && (
                  <div className="bg-black/40 backdrop-blur border border-orange-500/30 px-4 py-2 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-left-4">
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

          {/* Paused Overlay */}
          {gameState === 'playing' && !pointerLocked && (
            <div 
              className="absolute inset-0 z-40 bg-black/60 backdrop-blur-sm flex items-center justify-center cursor-pointer"
              onClick={(e) => { 
                e.stopPropagation(); 
                if (canvasRef.current) canvasRef.current.requestPointerLock(); 
              }}
            >
              <div className="text-center animate-pulse pointer-events-none">
                <AlertCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <h2 className="text-3xl font-black text-white tracking-widest uppercase mb-2">Game Paused</h2>
                <p className="text-gray-300 font-medium">Click anywhere on the screen to lock cursor and resume.</p>
              </div>
            </div>
          )}

          {/* Core Canvas */}
          <canvas 
            ref={canvasRef} 
            onClick={() => { if (gameState === 'playing' && !pointerLocked) canvasRef.current?.requestPointerLock(); }}
            className={`block absolute top-0 left-0 w-full h-full touch-none z-10 ${gameState === 'playing' ? 'cursor-none' : ''}`} 
          />

          {/* START SCREEN */}
          {gameState === 'start' && (
            <div className="absolute inset-0 bg-[#05070e]/98 flex flex-col items-center justify-center p-6 z-30 select-none overflow-y-auto max-h-[100vh] backdrop-blur-sm">
              <div className="max-w-md w-full text-center">
                <h2 className="text-xl font-black text-white uppercase tracking-wider mb-1">
                  Pro Smooth Pursuit
                </h2>
                <p className="text-xs text-slate-500 uppercase tracking-widest mb-6">
                  Hardware Raw Input • Endless Progression
                </p>

                <div className="grid grid-cols-2 gap-3 mb-6 text-left">
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Objective</span>
                    <span className="text-sm font-black text-white">Track Lissajous Curve</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Difficulty</span>
                    <span className="text-sm font-black text-blue-400">Scale every 200 PTS</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Time limit</span>
                    <span className="text-sm font-black text-yellow-400">60 Seconds</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Weapon Style</span>
                    <span className="text-sm font-black text-green-400">Weapon Spray Option</span>
                  </div>
                </div>

                <div className="bg-[#0b0f19] border border-slate-850 p-4 rounded-xl mb-6 text-left text-xs text-slate-400 space-y-4">
                  <div>
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-white uppercase mb-2">
                      <Sliders className="w-3.5 h-3.5 text-blue-500" /> Universal Sens
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-green-400 font-mono text-sm font-bold">{universalSens.toFixed(2)}x</span>
                      <span className="text-[10px] text-slate-500">Approx: {cmPer360} cm/360</span>
                    </div>
                    <input 
                      type="range" min="0.1" max="3.0" step="0.05" 
                      value={universalSens} 
                      onChange={(e) => setUniversalSens(parseFloat(e.target.value))} 
                      className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500" 
                    />
                  </div>

                  <div className="border-t border-slate-800 pt-3 flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-white font-bold uppercase">Weapon Spray Mode</span>
                      <span className="text-[9px] text-slate-500">Hold Left-Click to fire bullets and track</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={weaponSpray} 
                        onChange={(e) => setWeaponSpray(e.target.checked)} 
                        className="sr-only peer" 
                      />
                      <div className="w-9 h-5 bg-slate-850 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-slate-400 after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600 peer-checked:after:bg-white"></div>
                    </label>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={startGame}
                    className="flex-1 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg uppercase tracking-widest transition-all duration-200 active:scale-95"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    Begin Pursuit Drill
                  </button>
                </div>
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
                  Drill Complete
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
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Accuracy</span>
                    <span className="text-lg font-black text-white">{analytics.accuracy}%</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Avg Delay</span>
                    <span className="text-lg font-black text-white">{analytics.reactionDelay}ms</span>
                  </div>
                  
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Max Streak</span>
                    <span className="text-lg font-black text-white">{analytics.bestCombo}s</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Stability</span>
                    <span className="text-lg font-black text-white">{analytics.stabilityScore}%</span>
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
                    {getSuggestion(analytics.rankData.rank, analytics.accuracy, analytics.stabilityScore)}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={startGame}
                    className="flex-1 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg uppercase tracking-widest transition-all duration-200 active:scale-95"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
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

        {/* Progression & Scoring Rules (Visible outside Fullscreen) */}
        {!isFullscreen && (
          <section className="mt-10">
            <div className="rounded-2xl border border-gray-800 overflow-hidden bg-gray-900 shadow-2xl pointer-events-none">
              <div className="px-6 py-5 border-b border-gray-800 bg-black/40 flex items-center gap-3">
                <Info className="w-5 h-5 text-green-400" /><h2 className="font-bold text-white text-lg tracking-wide">Progression & Scoring Rules</h2>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-5">
                  <RuleItem num="1" color="green" text="Continuous Tracking" highlight="Score Reward per 1s" result="Builds level & tracking" />
                  <RuleItem num="2" color="orange" text="Combo System" highlight="1 point per 100ms" result="Resets on slip/timeout" />
                </div>
                <div className="space-y-5">
                  <RuleItem num="3" color="fuchsia" text="Level Progression" highlight="Every 200 Score" result="Target speed & curves scale" />
                  <RuleItem num="4" color="red" text="Weapon Spray Mode" highlight="Hold Left-Click to Shoot" result="Requires active firing" />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* About Pro Smooth Pursuit educational section */}
        {!isFullscreen && (
          <article className="mt-12 text-gray-300">
            <div className="rounded-2xl border border-gray-800 overflow-hidden bg-gray-900 shadow-xl">
              <div className="px-6 py-5 border-b border-gray-800 bg-black/40 flex items-center gap-3">
                <GraduationCap className="w-5 h-5 text-green-400" />
                <h2 className="font-bold text-white text-lg tracking-wide">About Pro Smooth Pursuit</h2>
              </div>
              
              <div className="p-8 space-y-8">
                <section>
                  <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                    <Eye className="w-5 h-5 text-green-400" /> What is Smooth Pursuit Training?
                  </h3>
                  <p className="text-sm leading-relaxed mb-4">
                    <strong>Smooth pursuit training</strong> isolates your eyes' ability to follow a moving coordinate without quick saccadic jerks. In fast-paced FPS shooters, players who master smooth pursuit keep their weapons locked onto targets at various ranges, matching their exact path velocity.
                  </p>
                  <p className="text-sm leading-relaxed">
                    By training on mathematically continuous Lissajous curves, you learn to read target speed transitions seamlessly, converting visual speed tracking directly into stable mouse adjustments.
                  </p>
                </section>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 py-4 border-y border-gray-800/50">
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40 hover:bg-gray-800/50 transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-green-600 flex items-center justify-center"><Users className="w-4 h-4 text-white" /></div>
                      <h4 className="text-sm font-bold text-white">Who Should Use This?</h4>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">FPS players wanting to improve visual track consistency. Highly recommended for Apex Legends, Overwatch 2, and Quake players.</p>
                  </div>
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40 hover:bg-gray-800/50 transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-fuchsia-600 flex items-center justify-center"><TrendingUp className="w-4 h-4 text-white" /></div>
                      <h4 className="text-sm font-bold text-white">Stability Training</h4>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Exercises fine motor control in the forearm and wrist. Stabilizes your aim lines and minimizes cursor jitter.</p>
                  </div>
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40 hover:bg-gray-800/50 transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-orange-600 flex items-center justify-center"><Zap className="w-4 h-4 text-white" /></div>
                      <h4 className="text-sm font-bold text-white">Visual Anticipation</h4>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Teaches visual prediction. Helps you follow organic movements rather than reacting after the opponent moves.</p>
                  </div>
                </div>
              </div>

              {/* FAQ Section */}
              <div className="bg-[#0b0f19] border-t border-gray-800 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Lightbulb className="w-6 h-6 text-yellow-400" />
                  <h3 className="text-xl font-bold text-white">Frequently Asked Questions</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FAQItem q="1. What is smooth pursuit training?" a="Smooth pursuit training develops your eyes' ability to track a moving target smoothly and continuously, which helps your brain calculate velocity and guides your arm to move the mouse at a matching speed without stutters." />
                  <FAQItem q="2. How do I improve tracking aim?" a="To improve tracking aim, focus your eyes entirely on the target model rather than your crosshair. Maintain a relaxed wrist and arm, practice continuous tracking drills regularly, and calibrate your sensitivity for consistent muscle memory." />
                  <FAQItem q="3. What is continuous tracking?" a="Continuous tracking is the skill of keeping your crosshair locked onto a moving target without losing connection. Unlike flick shots, it requires constant speed adjustments and micro-corrections over a long duration." />
                  <FAQItem q="4. How do pro players improve tracking?" a="Professional players improve tracking by using aim trainers to practice smooth pursuit, maintaining physical relaxation to avoid mouse jitter, using lightweight mice and slick mouse pads, and playing games with high time-to-kill (TTK)." />
                  <FAQItem q="5. What is visual pursuit?" a="Visual pursuit is the neurological tracking process of keeping a moving object centered in your fovea (the sharpest part of your vision). In aiming, strong visual pursuit ensures your brain registers trajectory changes early." />
                  <FAQItem q="6. Can tracking drills improve Apex aim?" a="Yes. Apex Legends has a very high time-to-kill (TTK), meaning you must track enemies through multiple strafes and jumps. Smooth pursuit drills are critical to mastering weapons like the R-99, Volt, and Flatline." />
                  <FAQItem q="7. Does this help Overwatch players?" a="Absolutely. Overwatch 2 features heroes with high movement speed and no inertia, meaning players must track Soldier: 76, Tracer, Zarya, and Sombra continuously to secure kills." />
                  <FAQItem q="8. Why is tracking harder than flicking?" a="Tracking is harder because it requires visual feedback processing and muscular speed adjustments over several seconds, whereas flicking is a single rapid muscle command that happens in a fraction of a second." />
                  <FAQItem q="9. What is tracking consistency?" a="Tracking consistency is the ability to maintain smooth, jitter-free cursor movements over long durations without drifting off the target, even when the target speeds up or changes its curve shape." />
                  <FAQItem q="10. How often should I train tracking?" a="We recommend training tracking for 10–15 minutes daily as a warm-up before matches, or 30 minutes for deep aim training to build muscle memory." />
                  <FAQItem q="11. What skills does smooth pursuit improve?" a="This drill improves smooth pursuit, visual response latency, ADAD strafe reading, target reacquisition speed, wrist micro-corrections, and tracking stability under pressure." />
                  <FAQItem q="12. Can this improve mouse control?" a="Yes. Tracking a target's center forces you to make steady, continuous mouse movements, which directly improves fine motor mouse control and reduces muscle-tension jitters." />
                  <FAQItem q="13. Does this improve hand-eye coordination?" a="Yes, it tightens the feedback loop between what your eyes see (the target's velocity) and what your hand does (mouse movement), improving coordination and visual reaction times." />
                  <FAQItem q="14. Is this smooth pursuit trainer free?" a="Yes, this tracking trainer is 100% free, requires no sign-ups or downloads, and runs natively in modern desktop browsers with 1:1 raw mouse input." />
                  <FAQItem q="15. Can tracking practice improve accuracy?" a="Definitely. Regular tracking practice builds forearm endurance, reduces jitter, increases your target tracking uptime, and directly increases your hit accuracy in competitive FPS games." />
                </div>
              </div>
            </div>
          </article>
        )}

        {/* Related Drills Grid */}
        {!isFullscreen && (
          <section className="mt-14" aria-label="Explore related aim and response drills">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-5 rounded-full bg-green-500"></div>
              <h2 className="text-xs font-bold text-white uppercase tracking-widest font-mono">
                Explore Related FPS Drills
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <RelatedCard href="/drills/fps/reactive-sphere-tracking" title="Reactive Sphere" desc="Track targets performing rapid direction swaps." color="blue" icon={<Target className="w-4 h-4" />} />
              <RelatedCard href="/drills/fps/anti-strafe-jitter-duel" title="Anti-Strafe Jitter" desc="Trace targets performing micro ADAD jitter jukes." color="orange" icon={<Flame className="w-4 h-4" />} />
              <RelatedCard href="/drills/fps/vertical-air-track" title="Vertical Air Track" desc="Practice vertical mouse control and aerial tracking." color="green" icon={<Sliders className="w-4 h-4" />} />
              <RelatedCard href="/drills/fps/recoil-control" title="Recoil Control" desc="Weapon spray pattern compensation training." color="red" icon={<Activity className="w-4 h-4" />} />
            </div>
          </section>
        )}

        {/* Footer */}
        {!isFullscreen && (
          <footer className="mt-12 bg-[#05060b] border border-gray-800 text-gray-500 rounded-xl py-10 px-6 font-mono text-[10px]" role="contentinfo">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 mb-8">
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Motor & FPS</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/motor/hand-eye-coordination/aim-trainer" className="hover:text-green-400 transition-colors">Aim Trainer Elite</Link></li>
                    <li><Link href="/drills/fps/flick-shot-training" className="hover:text-green-400 transition-colors">Flick Shot Trainer</Link></li>
                    <li><Link href="/drills/fps" className="text-green-555 hover:text-green-400 transition-colors font-bold">All FPS Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Memory</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/memory/working-memory/n-back" className="hover:text-green-400 transition-colors">3-Back Training</Link></li>
                    <li><Link href="/drills/memory/short-term-memory/color-sequence" className="hover:text-green-400 transition-colors">Color Sequence</Link></li>
                    <li><Link href="/drills/memory" className="text-green-555 hover:text-green-400 transition-colors font-bold">All Memory Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Cognitive</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/cognitive/memory/card-matching" className="hover:text-green-400 transition-colors">Memory Games</Link></li>
                    <li><Link href="/drills/cognitive/attention/divided-attention" className="hover:text-green-400 transition-colors">Attention Drills</Link></li>
                    <li><Link href="/drills/cognitive" className="text-green-555 hover:text-green-400 transition-colors font-bold">All Cognitive Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Academic</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/academic/writing-speed/typing-test" className="hover:text-green-400 transition-colors">Typing Speed Test</Link></li>
                    <li><Link href="/drills/academic/math-speed/mental-math" className="hover:text-green-400 transition-colors">Mental Math</Link></li>
                    <li><Link href="/drills/academic" className="text-green-555 hover:text-green-400 transition-colors font-bold">All Academic Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">More Sectors</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/visual" className="hover:text-green-400 transition-colors">Visual</Link></li>
                    <li><Link href="/drills/physical" className="hover:text-green-400 transition-colors">Physical</Link></li>
                  </ul>
                </div>
              </div>
              
              <div className="border-t border-gray-800 pt-8 text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="w-6 h-6 bg-gradient-to-br from-green-500/20 to-blue-500/20 border border-green-500/30 rounded-lg flex items-center justify-center">
                    <Target className="w-3.5 h-3.5 text-green-400" />
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
      <div className="flex items-center gap-1.5 text-green-400 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-wider">
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