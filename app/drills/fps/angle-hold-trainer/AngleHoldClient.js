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
  Share2, Copy
} from 'lucide-react';

// ============================================================
// ZERO-LATENCY AUDIO SYNTHESIZER
// ============================================================
class AudioSynthesizer {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }
  
  init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
  }

  playSuccess() {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, this.ctx.currentTime); // A5
      osc.frequency.setValueAtTime(1108.73, this.ctx.currentTime + 0.05); // C#6
      gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.2);
      osc.connect(gain); gain.connect(this.ctx.destination);
      osc.start(); osc.stop(this.ctx.currentTime + 0.2);
    } catch(e) {}
  }

  playFail() {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine'; // Soft sine wave
      osc.frequency.setValueAtTime(200, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(100, this.ctx.currentTime + 0.15); // Gentle pitch drop
      gain.gain.setValueAtTime(0.08, this.ctx.currentTime); // Lower volume
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.15); // Shorter duration
      osc.connect(gain); gain.connect(this.ctx.destination);
      osc.start(); osc.stop(this.ctx.currentTime + 0.15);
    } catch(e) {}
  }

  playPrefire() {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine'; // Soft sine wave
      osc.frequency.setValueAtTime(120, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(60, this.ctx.currentTime + 0.15); // Gentle thud
      gain.gain.setValueAtTime(0.08, this.ctx.currentTime); // Lower volume
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.15); // Shorter duration
      osc.connect(gain); gain.connect(this.ctx.destination);
      osc.start(); osc.stop(this.ctx.currentTime + 0.15);
    } catch(e) {}
  }
  
  setEnabled(status) {
    this.enabled = status;
  }
}

const audioSynth = typeof window !== 'undefined' ? new AudioSynthesizer() : null;
const DRILL_DURATION = 60; // 60 seconds strict starting time

// ============================================================
// PERFORMANCE ASSESSMENT & SUGGESTIONS
// ============================================================
const calculateRank = (timeSurvived, accuracy, rt) => {
  if (timeSurvived >= 55 && accuracy >= 90 && rt <= 210 && rt > 0) return { rank: 'S+', color: 'text-fuchsia-400' };
  if (timeSurvived >= 45 && accuracy >= 85 && rt <= 245 && rt > 0) return { rank: 'S', color: 'text-yellow-400' };
  if (timeSurvived >= 30 && accuracy >= 78 && rt <= 280 && rt > 0) return { rank: 'A', color: 'text-green-400' };
  if (timeSurvived >= 20 && accuracy >= 68) return { rank: 'B', color: 'text-blue-400' };
  if (timeSurvived >= 10 && accuracy >= 55) return { rank: 'C', color: 'text-indigo-400' };
  return { rank: 'D', color: 'text-slate-400' };
};

const getPerformanceAssessment = (accuracy, preFires, escapes, avgReactionTime) => {
  if (preFires > 3) {
    return {
      title: "Needs Better Trigger Discipline",
      color: "text-orange-400",
      desc: "You are pre-firing too often. This usually happens when you try to anticipate the peek rather than reacting to the visual stimulus. Try to stay calm, lock your eyes on the edge, and click only when you see the target."
    };
  }
  if (escapes > 3 || (avgReactionTime > 280 && avgReactionTime > 0)) {
    return {
      title: "React Faster To Wide Swings",
      color: "text-red-400",
      desc: "You are letting enemies escape back into cover. If your reaction time is slow, hold your crosshair slightly wider (further from the corner). This gives your eyes and hand more space to process the swing and click."
    };
  }
  if (accuracy >= 85 && preFires <= 1) {
    return {
      title: "Excellent Angle Discipline",
      color: "text-fuchsia-400",
      desc: "Outstanding trigger discipline and reaction speeds. Your hold mechanics are clean, with minimal pre-fires and extremely high shot precision."
    };
  }
  if (accuracy >= 70) {
    return {
      title: "Good Crosshair Placement",
      color: "text-green-400",
      desc: "Solid baseline crosshair placement. Work on tightening your hold distance and maintaining focus through longer survival stretches to handle faster swings."
    };
  }
  return {
    title: "Focus on Consistent Holding",
    color: "text-slate-400",
    desc: "Focus on keeping your crosshair static at head height. Do not make micro-flicks; let the target swing into your crosshair, and focus on trigger timing."
  };
};

export default function AngleHoldClient() {
  // === UI / Viewport States ===
  const [gameState, setGameState] = useState('start'); // 'start', 'playing', 'gameOver'
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [pointerLocked, setPointerLocked] = useState(false);

  // === Settings ===
  const [universalSens, setUniversalSens] = useState(1.0);
  const [baseSpeed, setBaseSpeed] = useState(100); // % modifier

  // === HUD States ===
  const [uiScore, setUiScore] = useState(0);
  const [uiTimeLeft, setUiTimeLeft] = useState(DRILL_DURATION);
  const [uiTimeSurvived, setUiTimeSurvived] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [isNewBest, setIsNewBest] = useState(false);

  // === Analytics ===
  const [analytics, setAnalytics] = useState({
    accuracy: 100,
    successfulHits: 0,
    targetsEscaped: 0,
    preFires: 0,
    missedClicks: 0,
    avgReactionTime: 0,
    bestReactionTime: 0,
    timeSurvived: 0,
    rankData: null
  });

  // === DOM Refs ===
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  const pageRef = useRef(null);
  const progressBarRef = useRef(null);
  const lastTimeRef = useRef(DRILL_DURATION);

  // === Mutable Engine Refs ===
  const engine = useRef({
    crosshair: { x: 0, y: 0, initialized: false },
    target: { active: false, x: 0, y: 0, startX: 0, startY: 0, side: 'left', type: 'wide', distCovered: 0, maxDist: 0, speed: 0, status: 'waiting', spawnTime: 0, radius: 14 },
    coverBox: { x: 0, y: 0, width: 120, height: 350 },
    nextPeekTime: 0,
    score: 0,
    timeLeft: DRILL_DURATION,
    timeSurvived: 0,

    // Counters
    successfulHits: 0,
    targetsEscaped: 0,
    preFires: 0,
    missedClicks: 0,
    reactionTimes: [],
    totalShots: 0,

    // Particles & Feedback
    particles: [],
    hitMarkers: [],
    screenShake: 0
  });

  const cmPer360 = (30 / universalSens).toFixed(1);

  // Load from localStorage
  useEffect(() => {
    try {
      const savedSens = localStorage.getItem('angleHold_sens_v2');
      if (savedSens) setUniversalSens(parseFloat(savedSens));
      const savedSpeed = localStorage.getItem('angleHold_speed_v2');
      if (savedSpeed) setBaseSpeed(parseFloat(savedSpeed));
      const savedBest = localStorage.getItem('angleHold_bestScore_v2');
      if (savedBest) setBestScore(parseInt(savedBest, 10));
    } catch (e) {}
  }, []);

  // Save changes
  useEffect(() => {
    if (gameState !== 'playing') {
      try {
        localStorage.setItem('angleHold_sens_v2', universalSens.toString());
        localStorage.setItem('angleHold_speed_v2', baseSpeed.toString());
      } catch (e) {}
    }
    if (audioSynth) audioSynth.setEnabled(soundEnabled);
  }, [universalSens, baseSpeed, gameState, soundEnabled]);

  // Keyboard accessibility: space or enter starts game
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (gameState === 'start') {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          startGame();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState]);

  // Core Game Manager
  const endGame = useCallback(() => {
    setGameState('gameOver');
    if (document.pointerLockElement) document.exitPointerLock();

    const e = engine.current;
    const finalAccuracy = e.totalShots > 0 ? Math.round((e.successfulHits / e.totalShots) * 100) : 0;
    const avgRt = e.reactionTimes.length > 0
      ? Math.round(e.reactionTimes.reduce((a, b) => a + b, 0) / e.reactionTimes.length)
      : 0;
    const bestRt = e.reactionTimes.length > 0
      ? Math.round(Math.min(...e.reactionTimes))
      : 0;

    const rank = calculateRank(e.timeSurvived, finalAccuracy, avgRt);

    setAnalytics({
      accuracy: finalAccuracy,
      successfulHits: e.successfulHits,
      targetsEscaped: e.targetsEscaped,
      preFires: e.preFires,
      missedClicks: e.missedClicks,
      avgReactionTime: avgRt,
      bestReactionTime: bestRt,
      timeSurvived: Math.round(e.timeSurvived * 10) / 10,
      rankData: rank
    });

    setUiScore(e.score);
    setUiTimeSurvived(Math.round(e.timeSurvived * 10) / 10);

    setBestScore(prev => {
      if (e.score > prev) {
        setIsNewBest(true);
        try { localStorage.setItem('angleHold_bestScore_v2', e.score.toString()); } catch(err){}
        return e.score;
      }
      return prev;
    });
  }, []);

  const createExplosion = (x, y, color) => {
    for (let i = 0; i < 15; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 4 + 1.5;
      engine.current.particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1.0,
        color
      });
    }
  };

  const createHitMarker = (x, y) => {
    engine.current.hitMarkers.push({ x, y, life: 1.0 });
  };

  const startGame = useCallback(async () => {
    if (audioSynth) audioSynth.init();

    setIsNewBest(false);
    setUiScore(0);
    setUiTimeLeft(DRILL_DURATION);
    setUiTimeSurvived(0);
    lastTimeRef.current = DRILL_DURATION;

    setAnalytics({
      accuracy: 100,
      successfulHits: 0,
      targetsEscaped: 0,
      preFires: 0,
      missedClicks: 0,
      avgReactionTime: 0,
      bestReactionTime: 0,
      timeSurvived: 0,
      rankData: null
    });
    setGameState('playing');

    engine.current = {
      crosshair: { ...engine.current.crosshair },
      target: { active: false, x: 0, y: 0, startX: 0, startY: 0, side: 'left', type: 'wide', distCovered: 0, maxDist: 0, speed: 0, status: 'waiting', spawnTime: 0, radius: 14 },
      coverBox: { x: 0, y: 0, width: 120, height: 350 },
      nextPeekTime: performance.now() + 800,
      score: 0,
      timeLeft: DRILL_DURATION,
      timeSurvived: 0,
      successfulHits: 0,
      targetsEscaped: 0,
      preFires: 0,
      missedClicks: 0,
      reactionTimes: [],
      totalShots: 0,
      particles: [],
      hitMarkers: [],
      screenShake: 0
    };

    try {
      if (containerRef.current && !document.fullscreenElement) {
        await containerRef.current.requestFullscreen();
      }
    } catch(e) {}

    setTimeout(() => {
      if (canvasRef.current && !document.pointerLockElement) {
        canvasRef.current.requestPointerLock().catch(()=>{});
      }
    }, 150);
  }, []);

  // Pointerlock changes
  useEffect(() => {
    const handlePointerLockChange = () => setPointerLocked(document.pointerLockElement === canvasRef.current);
    document.addEventListener('pointerlockchange', handlePointerLockChange);
    return () => document.removeEventListener('pointerlockchange', handlePointerLockChange);
  }, []);

  // Inputs: Mouse Movement & Clicking
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
          const time = performance.now();
          const eRef = engine.current;
          
          if (!eRef.target.active) {
            // Pre-fire click
            eRef.totalShots++;
            eRef.preFires++;
            eRef.timeLeft = Math.max(0, eRef.timeLeft - 1.5);
            eRef.screenShake = 6;
            if (audioSynth) audioSynth.playPrefire();
          } else {
            const ch = eRef.crosshair;
            const t = eRef.target;
            const dist = Math.hypot(ch.x - t.x, ch.y - t.y);

            eRef.totalShots++;
            
            if (dist <= t.radius + 10) { // Small validation cushion
              // Successful Hit
              const rt = time - t.spawnTime;
              eRef.reactionTimes.push(rt);
              eRef.successfulHits++;
              
              eRef.score += 100;
              eRef.timeLeft = Math.min(DRILL_DURATION, eRef.timeLeft + 1.0);

              setUiScore(eRef.score);
              if (audioSynth) audioSynth.playSuccess();
              createExplosion(t.x, t.y, '#00ff88');
              createHitMarker(ch.x, ch.y);

              eRef.target.active = false;
              
              const timeFactor = Math.min(2.5, 1.0 + (eRef.timeSurvived / 30.0));
              const delay = 600 + Math.random() * 800;
              eRef.nextPeekTime = time + (delay / timeFactor);
            } else {
              // Missed Click
              eRef.missedClicks++;
              eRef.timeLeft = Math.max(0, eRef.timeLeft - 1.5);
              eRef.screenShake = 8;
              if (audioSynth) audioSynth.playFail();
              createExplosion(ch.x, ch.y, '#ef4444');
            }
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

  // Main Loop
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

          engine.current.coverBox = {
            x: width / 2 - 60,
            y: height * 0.1,
            width: 120,
            height: height * 0.8
          };

          if (!engine.current.crosshair.initialized) {
            engine.current.crosshair.x = width / 2 - 140; // Default off-center position
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
      const dt = Math.min(deltaTimeMs / 1000, 0.1);
      const e = engine.current;
      const cBox = e.coverBox;

      if (gameState === 'playing' && pointerLocked) {
        // Accumulate survival time and decrease remaining time
        if (e.timeLeft > 0) {
          e.timeLeft -= dt;
          e.timeSurvived += dt;
        }

        // Hard stop if time is out
        if (e.timeLeft <= 0) {
          e.timeLeft = 0;
          setUiTimeLeft(0);
          if (progressBarRef.current) progressBarRef.current.style.width = '0%';
          endGame();
          return;
        }

        // Sync with HUD
        if (progressBarRef.current) {
          progressBarRef.current.style.width = `${(e.timeLeft / DRILL_DURATION) * 100}%`;
          progressBarRef.current.className = `h-full ${e.timeLeft <= 10 ? 'bg-red-500 animate-pulse' : 'bg-red-600'}`;
        }

        const intTime = Math.ceil(e.timeLeft);
        if (intTime !== lastTimeRef.current) {
          setUiTimeLeft(intTime);
          lastTimeRef.current = intTime;
        }

        // Scale difficulty with SURVIVAL TIME
        const timeFactor = Math.min(2.5, 1.0 + (e.timeSurvived / 30.0));

        // Target spawning
        if (!e.target.active && time >= e.nextPeekTime) {
          const side = Math.random() < 0.5 ? 'left' : 'right';
          const typeRnd = Math.random();
          let type = 'wide';

          // Shift peeking distributions towards crouch and jiggle peeks over time
          if (e.timeSurvived < 15) {
            if (typeRnd < 0.7) type = 'wide';
            else type = 'shoulder';
          } else if (e.timeSurvived < 35) {
            if (typeRnd < 0.4) type = 'wide';
            else if (typeRnd < 0.7) type = 'jiggle';
            else if (typeRnd < 0.9) type = 'shoulder';
            else type = 'crouch';
          } else {
            if (typeRnd < 0.2) type = 'wide';
            else if (typeRnd < 0.5) type = 'jiggle';
            else if (typeRnd < 0.8) type = 'crouch';
            else type = 'shoulder';
          }

          // Shrink target size over time survived
          const currentRadius = Math.max(9.5, 14.0 - (e.timeSurvived / 15.0));

          let maxDist = 55;
          let speed = 280;

          if (type === 'shoulder') {
            maxDist = 18;
            speed = 190;
          } else if (type === 'jiggle') {
            maxDist = 35;
            speed = 230;
          } else if (type === 'crouch') {
            maxDist = 45;
            speed = 250;
          }

          // Speed multipliers
          const speedMod = baseSpeed / 100;
          speed = speed * speedMod * timeFactor;

          const startX = side === 'left' ? cBox.x - currentRadius : cBox.x + cBox.width + currentRadius;
          const startY = cBox.y + 40 + Math.random() * (cBox.height - 80);

          e.target = {
            active: true,
            x: startX,
            y: startY,
            startY,
            startX,
            side,
            type,
            maxDist,
            speed,
            distCovered: 0,
            status: 'peeking',
            spawnTime: time,
            radius: currentRadius
          };
        }

        // Physics update
        if (e.target.active) {
          const t = e.target;
          const shift = t.speed * dt;

          if (t.status === 'peeking') {
            t.x += (t.side === 'left' ? -shift : shift);
            if (t.type === 'crouch') {
              t.y = t.startY + t.distCovered * 0.45;
            }
            t.distCovered += shift;

            if (t.distCovered >= t.maxDist) {
              t.status = 'retreating';
            }
          } else if (t.status === 'retreating') {
            t.x += (t.side === 'left' ? shift : -shift);
            if (t.type === 'crouch') {
              t.y = t.startY + t.distCovered * 0.45;
            }
            t.distCovered -= shift;

            if (t.distCovered <= 0) {
              // Target escapes back to cover
              t.active = false;
              e.targetsEscaped++;
              e.timeLeft = Math.max(0, e.timeLeft - 1.5);
              e.screenShake = 8;
              if (audioSynth) audioSynth.playFail();
              createExplosion(t.x, t.y, '#ef4444');

              const delay = 600 + Math.random() * 800;
              e.nextPeekTime = time + (delay / timeFactor);
            }
          }
        }
      }

      // Drawing
      ctx.save();

      if (e.screenShake > 0) {
        const sx = (Math.random() - 0.5) * e.screenShake;
        const sy = (Math.random() - 0.5) * e.screenShake;
        ctx.translate(sx, sy);
        e.screenShake *= 0.85;
        if (e.screenShake < 0.5) e.screenShake = 0;
      }

      ctx.fillStyle = '#05060b';
      ctx.fillRect(0, 0, cvs.width, cvs.height);

      // Background decorative lines
      ctx.strokeStyle = 'rgba(239, 68, 68, 0.03)';
      ctx.lineWidth = 1;
      for (let i = 0; i < cvs.width; i += 60) {
        ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, cvs.height); ctx.stroke();
      }
      for (let j = 0; j < cvs.height; j += 60) {
        ctx.beginPath(); ctx.moveTo(0, j); ctx.lineTo(cvs.width, j); ctx.stroke();
      }

      // Target behind cover
      if (e.target.active && (gameState === 'playing' || gameState === 'start')) {
        const t = e.target;
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#ef4444';
        ctx.fillStyle = '#ef4444';
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;

        ctx.beginPath();
        ctx.arc(t.x, t.y, t.radius, 0, Math.PI * 2);
        ctx.fill(); ctx.stroke();
        ctx.shadowBlur = 0;

        // Target core center
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(t.x, t.y, t.radius * 0.35, 0, Math.PI * 2);
        ctx.fill();
      }

      // Cover Box
      ctx.fillStyle = '#0e172a';
      ctx.strokeStyle = 'rgba(239, 68, 68, 0.2)';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.roundRect(cBox.x, cBox.y, cBox.width, cBox.height, 6);
      ctx.fill(); ctx.stroke();

      // Cover texture lines
      ctx.strokeStyle = 'rgba(239, 68, 68, 0.05)';
      ctx.lineWidth = 5;
      for (let i = 0; i < cBox.width; i += 20) {
        ctx.beginPath();
        ctx.moveTo(cBox.x + i, cBox.y);
        ctx.lineTo(cBox.x + i + 15, cBox.y + cBox.height);
        ctx.stroke();
      }

      // Particle physics
      for (let i = e.particles.length - 1; i >= 0; i--) {
        const p = e.particles[i];
        p.x += p.vx; p.y += p.vy; p.life -= dt * 2.5;
        if (p.life <= 0) { e.particles.splice(i, 1); continue; }
        ctx.globalAlpha = p.life; ctx.fillStyle = p.color; ctx.fillRect(p.x, p.y, 3, 3);
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
      if (ch.initialized && (gameState === 'playing' || gameState === 'start')) {
        const color = pointerLocked ? '#00ff88' : '#eab308';
        ctx.strokeStyle = color;
        ctx.fillStyle = color;

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
  }, [gameState, pointerLocked, baseSpeed]);

  const shareScore = useCallback(async () => {
    const text = `🎯 I scored ${uiScore} PTS and survived ${uiTimeSurvived}s on the Angle Hold Trainer! Practice your crosshair placement at skilldrills.online!`;
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({ title: 'My Angle Hold Score', text, url: 'https://skilldrills.online/drills/fps' });
      } catch (e) {}
    } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      alert('Score card copied to clipboard!');
    }
  }, [uiScore, uiTimeSurvived]);

  return (
    <div ref={pageRef} className="min-h-screen select-none bg-[#050508] text-white">
      <Head>
        <title>Crosshair Placement Training - Free Angle Hold Trainer for Valorant & CS2</title>
        <meta name="description" content="Improve crosshair placement, angle holding, and peek reaction speed with this free FPS training drill." />
      </Head>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {!isFullscreen && (
          <div className="mb-6">
            <nav className="mb-4">
              <ol className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
                <li><Link href="/" className="hover:text-gray-300">Home</Link></li>
                <li><ChevronRight className="w-4 h-4 text-gray-600" /></li>
                <li><Link href="/drills/fps" className="hover:text-gray-300">FPS</Link></li>
                <li><ChevronRight className="w-4 h-4 text-gray-600" /></li>
                <li className="text-red-400 font-medium font-sans">Angle Hold Trainer</li>
              </ol>
            </nav>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-br from-red-500 to-orange-600 rounded-xl shadow-[0_0_20px_rgba(239,68,68,0.3)]">
                  <Shield className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Crosshair Placement Training – Angle Hold & Peek Reaction Drill</h1>
                  <p className="text-sm text-gray-400 mt-1 font-medium font-sans">Desktop Exclusive • Survival Scaling</p>
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

        {!isFullscreen && (
          <div className="grid grid-cols-5 gap-2 mb-2">
            <StatCard icon={<Trophy className="text-yellow-400" />} value={uiScore} label="Score" />
            <StatCard icon={<Timer className="text-blue-400" />} value={uiTimeLeft} label="Time Left" unit="s" />
            <StatCard icon={<Clock className="text-green-400" />} value={uiTimeSurvived} label="Time Survived" unit="s" />
            <StatCard icon={<Info className="text-cyan-400" />} value={`${universalSens.toFixed(2)}x`} label="Sens" />
            <StatCard icon={<Trophy className="text-amber-500" />} value={bestScore} label="Best Score" />
          </div>
        )}

        <div 
          ref={containerRef} 
          className={`relative overflow-hidden transition-colors outline-none bg-[#05060b] ${
            isFullscreen ? 'w-full h-full' : 'w-full aspect-video min-h-[500px] rounded-2xl border border-gray-800 shadow-2xl'
          }`}
        >
          {gameState === 'playing' && (
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gray-900 z-[60]">
              <div ref={progressBarRef} className="h-full bg-red-600" style={{ width: '100%' }} />
            </div>
          )}

          {isFullscreen && gameState === 'playing' && (
            <>
              <div className="absolute top-6 left-6 z-[60] flex flex-col gap-2 pointer-events-none">
                <div className="bg-black/40 backdrop-blur border border-gray-800 px-4 py-2 rounded-xl flex items-center gap-4">
                  <div className="text-center">
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Score</p>
                    <p className="text-2xl font-black text-white leading-none">{uiScore}</p>
                  </div>
                  <div className="w-px h-8 bg-gray-800"></div>
                  <div className="text-center">
                    <p className="text-[10px] text-red-400 font-bold uppercase tracking-widest">Time Left</p>
                    <p className="text-2xl font-black text-red-500 leading-none">{uiTimeLeft}s</p>
                  </div>
                </div>
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

          {gameState === 'playing' && !pointerLocked && (
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

          <canvas 
            ref={canvasRef} 
            onClick={() => { if (gameState === 'playing' && !pointerLocked) canvasRef.current?.requestPointerLock(); }}
            className={`block absolute top-0 left-0 w-full h-full touch-none z-10 ${gameState === 'playing' ? 'cursor-none' : ''}`} 
          />

          {/* START SCREEN */}
          {gameState === 'start' && (
            <div className="absolute inset-0 bg-[#05070e]/98 flex flex-col items-center justify-center p-6 z-30 select-none overflow-y-auto max-h-[100vh] backdrop-blur-sm">
              <div className="max-w-md w-full text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-600 rounded-2xl mx-auto flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(239,68,68,0.2)]">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                
                <h2 className="text-xl font-black text-white uppercase tracking-wider mb-1">
                  Angle Hold Trainer
                </h2>
                <p className="text-xs text-slate-500 uppercase tracking-widest mb-6">
                  Hardware Raw Input • Survival Difficulty
                </p>

                <div className="grid grid-cols-2 gap-3 mb-6 text-left">
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Objective</span>
                    <span className="text-xs font-black text-white font-sans">React & Click Peeker</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Reward</span>
                    <span className="text-xs font-black text-green-400 font-sans">+100 Score & +1.0s</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Penalty</span>
                    <span className="text-xs font-black text-red-400 font-sans">-1.5s (Miss/Prefire/Escape)</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Scaling</span>
                    <span className="text-xs font-black text-blue-400 font-sans">Invisible (Time Survived)</span>
                  </div>
                </div>

                <div className="bg-[#0b0f19] border border-slate-850 p-4 rounded-xl mb-6 text-left text-xs text-slate-400 space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">Universal Sensitivity</span>
                      <span className="text-red-400 font-mono text-xs font-bold">{universalSens.toFixed(2)}x</span>
                    </div>
                    <input 
                      type="range" min="0.1" max="3.0" step="0.05" 
                      value={universalSens} 
                      onChange={(e) => setUniversalSens(parseFloat(e.target.value))} 
                      className="w-full h-1.5 bg-slate-850 rounded-lg appearance-none cursor-pointer accent-red-500" 
                    />
                    <div className="text-[9px] text-slate-500 text-right mt-1">Approx: {cmPer360} cm/360</div>
                  </div>

                  <div className="pt-3 border-t border-slate-800">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">Peeking Speed Modifier</span>
                      <span className="text-orange-400 font-mono text-xs font-bold">{baseSpeed}%</span>
                    </div>
                    <input 
                      type="range" min="50" max="200" step="10" 
                      value={baseSpeed} 
                      onChange={(e) => setBaseSpeed(parseFloat(e.target.value))} 
                      className="w-full h-1.5 bg-slate-850 rounded-lg appearance-none cursor-pointer accent-orange-500" 
                    />
                  </div>
                </div>

                <button
                  onClick={startGame}
                  className="w-full py-3.5 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg uppercase tracking-widest transition-all duration-200 active:scale-95"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  Start Training
                </button>
              </div>
            </div>
          )}

          {/* GAME OVER SCREEN */}
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
                  Session Survived: {analytics.timeSurvived} Seconds
                </p>

                <div className="grid grid-cols-3 gap-3 mb-6 text-left">
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Final Score</span>
                    <span className="text-lg font-black text-white font-sans">{uiScore}</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Accuracy</span>
                    <span className="text-lg font-black text-white font-sans">{analytics.accuracy}%</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Avg Reaction</span>
                    <span className="text-lg font-black text-white font-sans">{analytics.avgReactionTime}ms</span>
                  </div>
                  
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold font-sans">Best Reaction</span>
                    <span className="text-lg font-black text-white font-sans">{analytics.bestReactionTime}ms</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold font-sans">Targets Hit</span>
                    <span className="text-lg font-black text-white font-sans">{analytics.successfulHits}</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold font-sans">Assigned Rank</span>
                    <span className={`text-lg font-black font-sans ${analytics.rankData.color}`}>
                      Rank {analytics.rankData.rank}
                    </span>
                  </div>

                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold font-sans">Escapes</span>
                    <span className="text-lg font-black text-white font-sans">{analytics.targetsEscaped}</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold font-sans">Pre-Fires</span>
                    <span className="text-lg font-black text-white font-sans">{analytics.preFires}</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold font-sans">Misses</span>
                    <span className="text-lg font-black text-white font-sans">{analytics.missedClicks}</span>
                  </div>
                </div>

                {/* Diagnostics block */}
                {(() => {
                  const diagnostic = getPerformanceAssessment(analytics.accuracy, analytics.preFires, analytics.targetsEscaped, analytics.avgReactionTime);
                  return (
                    <div className="bg-[#0b0f19] border border-slate-850 p-4 rounded-xl mb-6 text-left text-xs text-slate-400">
                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-white uppercase mb-1">
                        <Sparkles className="w-3.5 h-3.5 text-red-500" /> Performance Analysis:
                      </div>
                      <p className={`font-bold ${diagnostic.color} mb-1`}>{diagnostic.title}</p>
                      <p className="leading-relaxed text-slate-400">
                        {diagnostic.desc}
                      </p>
                    </div>
                  );
                })()}

                <div className="flex gap-2">
                  <button
                    onClick={startGame}
                    className="flex-1 py-3.5 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg uppercase tracking-widest transition-all duration-200 active:scale-95"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    Run another trial
                  </button>
                  <button
                    onClick={shareScore}
                    className="p-3.5 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white rounded-xl transition-colors active:scale-95"
                    title="Share Score"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Progression and Rules Cards */}
        {!isFullscreen && (
          <section className="mt-10">
            <div className="rounded-2xl border border-gray-800 overflow-hidden bg-gray-900 shadow-2xl pointer-events-none">
              <div className="px-6 py-5 border-b border-gray-800 bg-black/40 flex items-center gap-3">
                <Info className="w-5 h-5 text-red-400" /><h2 className="font-bold text-white text-lg tracking-wide">Progression & Scoring Rules</h2>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-5">
                  <RuleItem num="1" color="green" text="Successful Hit" highlight="+100 PTS | +1.0s Time" result="Restores time budget" />
                  <RuleItem num="2" color="orange" text="Flares & Swings" highlight="Crouch & Jiggle Peeks" result="Difficulty scales invisibly" />
                </div>
                <div className="space-y-5">
                  <RuleItem num="3" color="red" text="Miss / Pre-fire / Escape" highlight="-1.5s Time penalty" result="No point deduction" />
                  <RuleItem num="4" color="blue" text="Decay Scaling" highlight="Timer is pressure mechanic" result="Survive as long as possible" />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Articles & SEO Blocks */}
        {!isFullscreen && (
          <article className="mt-12 text-gray-300">
            <div className="rounded-2xl border border-gray-800 overflow-hidden bg-gray-900 shadow-xl">
              <div className="px-6 py-5 border-b border-gray-800 bg-black/40 flex items-center gap-3">
                <GraduationCap className="w-5 h-5 text-red-400" />
                <h2 className="font-bold text-white text-lg tracking-wide">About the Crosshair Placement Training Drill</h2>
              </div>
              
              <div className="p-8 space-y-8">
                <section>
                  <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                    <Eye className="w-5 h-5 text-red-400" /> What Is Crosshair Placement?
                  </h3>
                  <p className="text-sm leading-relaxed mb-4">
                    <strong>Crosshair placement</strong> is the technique of positioning your aim cursor where an enemy's head is most likely to appear as you navigate or hold angles. Rather than relying on high-speed flick adjustments after an enemy appears, proper placement reduces the physical movement required to secure a hit to a single click, or a tiny adjustment.
                  </p>
                  <p className="text-sm leading-relaxed">
                    By holding passive head-level positions and tuning your horizontal offset based on reaction latency, you negate the opponent's momentum. This is the cornerstone of defensive tactical gameplay in esports.
                  </p>
                </section>

                <section>
                  <h3 className="text-lg font-bold text-white mb-3">What Is Crosshair Placement Training?</h3>
                  <p className="text-sm leading-relaxed">
                    This training drill isolates the visual reaction required to hold defensive angles. By simulating targets swinging from cover with varying swing widths, speeds, and postures (wide, jiggle, crouch, and shoulder peeks), players train their trigger discipline and learn to manage their crosshair's offset from corner walls based on visual feedback.
                  </p>
                </section>

                <section>
                  <h3 className="text-lg font-bold text-white mb-3">How To Improve Crosshair Placement In FPS Games</h3>
                  <p className="text-sm leading-relaxed mb-3">
                    To optimize your placement, follow these standard guidelines:
                  </p>
                  <ul className="list-disc pl-5 text-sm space-y-2">
                    <li><strong>Head-Level Aiming:</strong> Always visualize enemy head heights across different slopes and structural levels.</li>
                    <li><strong>Hold Distance (Offset):</strong> Do not glue your crosshair to the corner of the wall. Move it outward slightly so that if the enemy swings fast, they run directly into your crosshair.</li>
                    <li><strong>Anticipate Speed:</strong> Adjust your distance dynamically based on whether you expect a slow crawl (tight hold) or an aggressive wide swing (wide hold).</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-lg font-bold text-white mb-3">How Professional Valorant Players Hold Angles</h3>
                  <p className="text-sm leading-relaxed">
                    In Valorant, characters move with distinct deceleration mechanics, making wide swings very popular. Professional players hold passive angles slightly wider than their physical reaction limit. This ensures they can simply left-click the instant they register movement, turning defensive positions into high-accuracy zones without needing flick corrections.
                  </p>
                </section>

                <section>
                  <h3 className="text-lg font-bold text-white mb-3">How Professional CS2 Players Train Crosshair Placement</h3>
                  <p className="text-sm leading-relaxed">
                    CS2 players memorize map geometry (pre-aiming markers like bricks, crates, or textures) to keep their crosshairs pinned at head level. They train extensively against peeker's advantage by holding corners slightly off the wall, ensuring they fire at the midpoint of an opponent's swing path.
                  </p>
                </section>

                <section>
                  <h3 className="text-lg font-bold text-white mb-3">Benefits Of Angle Hold Training</h3>
                  <p className="text-sm leading-relaxed">
                    Training passive angle holding strengthens trigger discipline—helping you avoid clicking early (pre-firing) or letting the target escape. By forcing you to track shrinking targets swinging at rising speeds under strict time limits, this tool develops the neural pathways needed to process surprises and react under high pressure.
                  </p>
                </section>

                <section>
                  <h3 className="text-lg font-bold text-white mb-3">How This Peek Reaction Trainer Works</h3>
                  <p className="text-sm leading-relaxed">
                    The trainer simulates an enemy peeking out from cover. As the timer counts down, the difficulty scales invisibly based on your elapsed survival time. Targets swing faster, appear more frequently, change their peek types (wide, jiggle, crouch, shoulder), and slightly shrink in size, pushing your mechanical limit.
                  </p>
                </section>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 py-4 border-y border-gray-800/50">
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40 hover:bg-gray-800/50 transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center"><Users className="w-4 h-4 text-white" /></div>
                      <h4 className="text-sm font-bold text-white">Who Is This For?</h4>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Tactical shooter players looking to master defense, control pre-fire twitches, and improve their holds in games like Valorant, CS2, and Siege.</p>
                  </div>
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40 hover:bg-gray-800/50 transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-orange-600 flex items-center justify-center"><TrendingUp className="w-4 h-4 text-white" /></div>
                      <h4 className="text-sm font-bold text-white">Skills Trained</h4>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Head-level prediction, defensive holding offset calibration, visual peek reaction speed, and trigger discipline.</p>
                  </div>
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40 hover:bg-gray-800/50 transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center"><Zap className="w-4 h-4 text-white" /></div>
                      <h4 className="text-sm font-bold text-white">Why It Matters</h4>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Compensates for network peeker's advantage. Consistent, calm crosshair discipline wins more defensive rounds than flash flicks.</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#0b0f19] border-t border-gray-800 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Lightbulb className="w-6 h-6 text-yellow-400" />
                  <h3 className="text-xl font-bold text-white">Frequently Asked Questions</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FAQItem q="1. What is crosshair placement?" a="Crosshair placement is a core shooter mechanic where you position your aim cursor exactly where an enemy's head is expected to spawn or appear, minimizing the physical distance required to shoot them." />
                  <FAQItem q="2. How do professional Valorant players practice crosshair placement?" a="Pros train their placement by mapping head-height indicators in custom game maps, running pre-aim paths, and utilizing browser reflex trainers to perfect their click timings against cover-peeking targets." />
                  <FAQItem q="3. How do CS2 players hold angles?" a="CS2 players hold corners by leaving a slight horizontal gap between the corner wall and their crosshair. This offset accommodates their visual reaction delay, allowing them to click without needing to flick when an enemy swings wide." />
                  <FAQItem q="4. What is peeker's advantage?" a="Peeker's advantage is a latency-driven delay where a moving player rounding a corner gets to see a stationary player holding the angle slightly before the stationary player's screen updates with their presence." />
                  <FAQItem q="5. How can I improve angle holding?" a="Improve your angle holding by cultivating trigger discipline (avoiding clicking before the target is fully acquired), training with variable swing speeds, and adjusting your hold distance based on your reaction threshold." />
                  <FAQItem q="6. How far should my crosshair be from the wall?" a="If enemies consistently push past your crosshair before you can click, hold wider (further away from the corner). If you shoot early and miss, hold tighter. Adjust the distance to match your reaction latency." />
                  <FAQItem q="7. Can this drill improve reaction time?" a="Yes. Exposing your brain to surprise, high-speed peeks and penalizing misses and premature clicking conditions you to react to visual movement faster and with greater control." />
                  <FAQItem q="8. Does this help Valorant players?" a="Yes. Valorant defense hinges on holding tight angles and preventing attackers from clearing corners. This drill directly mirrors holding site angles." />
                  <FAQItem q="9. Does this help CS2 players?" a="Yes. CS2 bomb site holds and angles are heavily influenced by peeker swings. Mastery of corner offsets is critical for CS2 CT-side holds." />
                  <FAQItem q="10. Does this help Rainbow Six Siege players?" a="Yes. Siege features very fast peeks and tight angles. Improving passive hold response speeds is vital for anchor play." />
                  <FAQItem q="11. How often should I practice crosshair placement?" a="We recommend dedicating 10-15 minutes to crosshair placement and angle holding drills daily before your gaming sessions." />
                  <FAQItem q="12. Is this drill free?" a="Yes, this drill is completely free to use and runs directly in any modern browser without requiring any downloads or account registration." />
                  <FAQItem q="13. What skills does this drill improve?" a="It improves trigger discipline, peek reaction speed, crosshair-to-corner distance calibration, and visual tracking of fast, variable peeks." />
                  <FAQItem q="14. How do professional FPS players train angle discipline?" a="Pros train angle discipline by maintaining calm focus, keeping their crosshairs static, avoiding panic-clicking on visual decoys, and firing only when the target intersects their aim line." />
                  <FAQItem q="15. Can this drill improve defensive gameplay?" a="Yes. Refining your angle-holding speed and discipline prevents you from getting caught off guard by wide peeks, rendering you a highly effective defensive anchor." />
                </div>
              </div>
            </div>
          </article>
        )}

        {!isFullscreen && (
          <section className="mt-14" aria-label="Explore related aim and response drills">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-5 rounded-full bg-red-500"></div>
              <h2 className="text-xs font-bold text-white uppercase tracking-widest font-mono">
                Explore FPS Drills
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <RelatedCard href="/drills/fps/flick-shot-training" title="Pro Flick Trainer" desc="Snap to targets in time-attack mode." color="blue" icon={<Crosshair className="w-4 h-4" />} />
              <RelatedCard href="/drills/fps/180-degree-awareness" title="180° Awareness Pro" desc="Alternate snapping opposite horizons." color="green" icon={<Target className="w-4 h-4" />} />
              <RelatedCard href="/drills/fps/recoil-control" title="Recoil Control" desc="Calibrate pulling pattern compensation." color="red" icon={<Activity className="w-4 h-4" />} />
              <RelatedCard href="/drills/fps/micro-correction-precision" title="Micro Flicks" desc="Optimize tight-angle crosshair corrections." color="orange" icon={<Zap className="w-4 h-4" />} />
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
                    <li><Link href="/drills/motor/hand-eye-coordination/aim-trainer" className="hover:text-red-400 transition-colors">Aim Trainer Elite</Link></li>
                    <li><Link href="/drills/fps/flick-shot-training" className="hover:text-red-400 transition-colors">Flick Shot Trainer</Link></li>
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
                <p className="text-[9px] max-w-2xl mx-auto leading-relaxed mb-6">
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
    <div className={`group rounded-xl border ${highlight ? 'border-red-500/50 bg-red-500/5' : 'border-gray-800 bg-gray-900/50'} p-2 text-center flex flex-col justify-center h-full transition-all duration-300 hover:scale-[1.03] hover:border-gray-700`}>
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
        <p className="text-sm font-medium text-gray-300 font-sans">
          {text}{highlight && <span className={`font-black font-sans ${txt}`}> {highlight}</span>}
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