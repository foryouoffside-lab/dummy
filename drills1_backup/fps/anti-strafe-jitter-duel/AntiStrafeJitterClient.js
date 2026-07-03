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
  Share2, Copy, Sliders, Brain
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

  playTick() {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1000, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);
      osc.connect(gain); gain.connect(this.ctx.destination);
      osc.start(); osc.stop(this.ctx.currentTime + 0.05);
    } catch(e) {}
  }

  playFail() {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(180, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.15);
      osc.connect(gain); gain.connect(this.ctx.destination);
      osc.start(); osc.stop(this.ctx.currentTime + 0.15);
    } catch(e) {}
  }

  setEnabled(status) {
    this.enabled = status;
  }
}

const audioSynth = typeof window !== 'undefined' ? new AudioSynthesizer() : null;
const DRILL_DURATION = 60; // 60s limit

// ============================================================
// PERFORMANCE ASSESSMENT & SKILL GENERATOR
// ============================================================
const calculateRank = (timeSurvived, accuracy, maxCombo) => {
  if (timeSurvived >= 55 && accuracy >= 80 && maxCombo >= 35) return { rank: 'S+', color: 'text-fuchsia-400' };
  if (timeSurvived >= 45 && accuracy >= 70 && maxCombo >= 25) return { rank: 'S', color: 'text-yellow-400' };
  if (timeSurvived >= 30 && accuracy >= 60 && maxCombo >= 15) return { rank: 'A', color: 'text-green-400' };
  if (timeSurvived >= 20 && accuracy >= 50) return { rank: 'B', color: 'text-blue-400' };
  if (timeSurvived >= 10 && accuracy >= 40) return { rank: 'C', color: 'text-indigo-400' };
  return { rank: 'D', color: 'text-slate-400' };
};

const getSkillAssessment = (accuracy, bestCombo, avgCombo, efficiency) => {
  if (accuracy >= 78 && efficiency >= 85 && bestCombo >= 35) {
    return {
      title: "Elite Tracker",
      color: "text-fuchsia-400",
      desc: "Exceptional target lock maintenance and anti-strafe prediction. Your wrist corrections are smooth, keeping the crosshair highly centered even during rapid jitter phases."
    };
  }
  if (accuracy >= 68 && efficiency >= 75) {
    return {
      title: "Strong Reactive Tracking",
      color: "text-green-400",
      desc: "Excellent reaction to direction switches. You recover tracking alignment quickly and hold combos consistently through direction flips."
    };
  }
  if (accuracy >= 52) {
    return {
      title: "Good Movement Reading",
      color: "text-blue-400",
      desc: "Solid ability to follow the macro movement paths of the target. Focus on reducing hand tension during fast jitter frames to improve centering."
    };
  }
  if (bestCombo < 15) {
    return {
      title: "Improve Direction Change Recognition",
      color: "text-orange-400",
      desc: "Your tracking breaks frequently on ADAD turns. Keep your visual focus centered on the sphere itself rather than chasing the outline, and react to the speed changes."
    };
  }
  return {
    title: "Needs Better Target Retention",
    color: "text-red-400",
    desc: "Focus on maintaining steady mouse speed. Hold a passive, calm tracking arc and let the jitter target cross back through your crosshair instead of over-correcting."
  };
};

export default function AntiStrafeJitterClient() {
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
  const [uiCombo, setUiCombo] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [isNewBest, setIsNewBest] = useState(false);

  // === Analytics ===
  const [analytics, setAnalytics] = useState({
    accuracy: 100,
    timeOnTarget: 0,
    timeOffTarget: 0,
    trackingEfficiency: 0,
    bestCombo: 0,
    averageCombo: 0,
    trackingUptime: 0,
    sessionDuration: 0,
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
    target: { x: 0, y: 0, vx: 5, vy: 0, radius: 15, width: 30, height: 30, direction: 1, isFakeOut: false, strafeTimer: 0 },
    score: 0,
    timeLeft: DRILL_DURATION,
    timeSurvived: 0,
    combo: 0,

    // Statistics
    ticksOnTarget: 0,
    totalTicks: 0,
    msOffTarget: 0,
    msOnTargetStreak: 0,
    nextStrafeTime: 0,
    maxCombo: 0,
    sumCombos: 0,
    countCombos: 0,
    distanceSum: 0,
    distanceCount: 0,

    // Visual Feedback
    particles: [],
    screenShake: 0,
    flash: { color: null, alpha: 0 }
  });

  const cmPer360 = (30 / universalSens).toFixed(1);

  // Load from localStorage
  useEffect(() => {
    try {
      const savedSens = localStorage.getItem('jitter_sens_v2');
      if (savedSens) setUniversalSens(parseFloat(savedSens));
      const savedSpeed = localStorage.getItem('jitter_speed_v2');
      if (savedSpeed) setBaseSpeed(parseFloat(savedSpeed));
      const savedBest = localStorage.getItem('jitter_bestScore_v2');
      if (savedBest) setBestScore(parseInt(savedBest, 10));
    } catch (e) {}
  }, []);

  // Save changes
  useEffect(() => {
    if (gameState !== 'playing') {
      try {
        localStorage.setItem('jitter_sens_v2', universalSens.toString());
        localStorage.setItem('jitter_speed_v2', baseSpeed.toString());
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
    
    // push last combo if exists
    if (e.combo > 0) {
      e.sumCombos += e.combo;
      e.countCombos++;
    }

    const uptime = e.totalTicks > 0 ? Math.round((e.ticksOnTarget / e.totalTicks) * 100) : 0;
    const timeOnTarget = Math.round(e.ticksOnTarget * 16.67) / 1000;
    const totalTime = Math.round(e.totalTicks * 16.67) / 1000;
    const timeOffTarget = Math.max(0, totalTime - timeOnTarget);
    
    // Tracking Efficiency: Based on how centered the aim was.
    // average distance vs target radius (where distance/radius <= 1.0)
    let efficiency = 0;
    if (e.distanceCount > 0) {
      const avgDistance = e.distanceSum / e.distanceCount;
      const targetAvgRadius = 12.0; // average target radius throughout scaling
      efficiency = Math.max(0, Math.round((1 - Math.min(1.0, avgDistance / (targetAvgRadius + 8))) * 100));
    }

    const avgCombo = e.countCombos > 0 ? Math.round((e.sumCombos / e.countCombos) * 10) / 10 : 0;
    const rank = calculateRank(e.timeSurvived, uptime, e.maxCombo);

    setAnalytics({
      accuracy: uptime,
      timeOnTarget: Math.round(timeOnTarget * 10) / 10,
      timeOffTarget: Math.round(timeOffTarget * 10) / 10,
      trackingEfficiency: efficiency,
      bestCombo: e.maxCombo,
      averageCombo: avgCombo,
      trackingUptime: uptime,
      sessionDuration: Math.round(e.timeSurvived * 10) / 10,
      rankData: rank
    });

    setUiScore(e.score);
    setUiTimeSurvived(Math.round(e.timeSurvived * 10) / 10);
    setUiCombo(0);

    setBestScore(prev => {
      if (e.score > prev) {
        setIsNewBest(true);
        try { localStorage.setItem('jitter_bestScore_v2', e.score.toString()); } catch(err){}
        return e.score;
      }
      return prev;
    });
  }, []);

  const createExplosion = useCallback((x, y, color) => {
    const e = engine.current;
    for (let i = 0; i < 6; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1.0 + Math.random() * 2.5;
      e.particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 0.7,
        color
      });
    }
  }, []);

  const spawnTarget = useCallback((width, height) => {
    const e = engine.current;
    e.target.x = width / 2;
    e.target.y = height / 2;
    e.target.radius = 15;
    e.target.vx = 4;
    e.target.vy = 0;
    e.target.direction = 1;
    e.target.isFakeOut = false;
    e.target.strafeTimer = 0;
  }, []);

  const startGame = useCallback(async () => {
    if (audioSynth) audioSynth.init();

    setIsNewBest(false);
    setUiScore(0);
    setUiTimeLeft(DRILL_DURATION);
    setUiTimeSurvived(0);
    setUiCombo(0);
    lastTimeRef.current = DRILL_DURATION;

    setAnalytics({
      accuracy: 100,
      timeOnTarget: 0,
      timeOffTarget: 0,
      trackingEfficiency: 0,
      bestCombo: 0,
      averageCombo: 0,
      trackingUptime: 0,
      sessionDuration: 0,
      rankData: null
    });
    setGameState('playing');

    engine.current = {
      crosshair: { ...engine.current.crosshair },
      target: { x: 0, y: 0, vx: 5, vy: 0, radius: 15, width: 30, height: 30, direction: 1, isFakeOut: false, strafeTimer: 0 },
      coverBox: { x: 0, y: 0, width: 120, height: 350 },
      nextStrafeTime: performance.now() + 600,
      score: 0,
      timeLeft: DRILL_DURATION,
      timeSurvived: 0,
      combo: 0,

      // Statistics
      ticksOnTarget: 0,
      totalTicks: 0,
      msOffTarget: 0,
      msOnTargetStreak: 0,
      maxCombo: 0,
      sumCombos: 0,
      countCombos: 0,
      distanceSum: 0,
      distanceCount: 0,

      particles: [],
      screenShake: 0,
      flash: { color: null, alpha: 0 }
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

  // Pointer lock change listeners
  useEffect(() => {
    const lockChange = () => {
      setPointerLocked(document.pointerLockElement === canvasRef.current);
    };
    document.addEventListener('pointerlockchange', lockChange);
    return () => document.removeEventListener('pointerlockchange', lockChange);
  }, []);

  // Inputs: Mouse Movement & Locking
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (gameState !== 'playing' || !pointerLocked || !canvasRef.current) return;
      const cvs = canvasRef.current;
      const dx = e.movementX * universalSens;
      const dy = e.movementY * universalSens;
      engine.current.crosshair.x = Math.max(0, Math.min(cvs.width, engine.current.crosshair.x + dx));
      engine.current.crosshair.y = Math.max(0, Math.min(cvs.height, engine.current.crosshair.y + dy));
    };

    const handleMouseDown = () => {
      if (gameState !== 'playing') return;
      if (!pointerLocked && canvasRef.current) {
        canvasRef.current.requestPointerLock();
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

        // Sync with HUD progress bar
        if (progressBarRef.current) {
          progressBarRef.current.style.width = `${(e.timeLeft / DRILL_DURATION) * 100}%`;
          progressBarRef.current.className = `h-full ${e.timeLeft <= 10 ? 'bg-red-500 animate-pulse' : 'bg-cyan-500'}`;
        }

        const intTime = Math.ceil(e.timeLeft);
        if (intTime !== lastTimeRef.current) {
          setUiTimeLeft(intTime);
          lastTimeRef.current = intTime;
        }

        // Spawn target
        if (e.target.x === 0) {
          spawnTarget(cvs.width, cvs.height);
        }

        e.totalTicks++;

        // --- DIFFICULTY PHYSICS SCALING ---
        const timeFactor = Math.min(2.5, 1.0 + (e.timeSurvived / 25.0));

        // Adjust target radius over survival time
        e.target.radius = Math.max(9.5, 15.0 - (e.timeSurvived / 12.0));

        // Unpredictable movement timing & physics changes
        if (time >= e.nextStrafeTime) {
          const speedMod = baseSpeed / 100;
          const baseSpeedScalar = 295 * speedMod * timeFactor;
          
          let speed = baseSpeedScalar;
          
          // Strafe pattern decisions
          const typeRnd = Math.random();
          let strafeDuration = (350 + Math.random() * 450) / timeFactor;
          
          e.target.direction = Math.random() > 0.15 ? -e.target.direction : e.target.direction; // 15% false commit
          
          if (typeRnd < 0.15) {
            // Burst acceleration
            speed = baseSpeedScalar * 1.6;
            strafeDuration = 180;
          } else if (typeRnd < 0.25) {
            // Micro hesitation
            speed = 20 * speedMod;
            strafeDuration = 100;
          } else if (typeRnd < 0.40) {
            // Micro deceleration
            speed = baseSpeedScalar * 0.5;
            strafeDuration = 220;
          }

          e.target.vx = e.target.direction * (speed / 60); // px/frame approximate conversion

          // Next switch timestamp
          e.nextStrafeTime = time + strafeDuration;
        }

        // Apply movement & check boundaries (with bounce)
        e.target.x += e.target.vx * dt * 60;
        
        // Boundaries cushion
        const sideOffset = 60;
        if (e.target.x - e.target.radius < sideOffset) {
          e.target.x = sideOffset + e.target.radius;
          e.target.vx = -e.target.vx;
          e.target.direction = -e.target.direction;
        } else if (e.target.x + e.target.radius > cvs.width - sideOffset) {
          e.target.x = cvs.width - sideOffset - e.target.radius;
          e.target.vx = -e.target.vx;
          e.target.direction = -e.target.direction;
        }

        // Subtle vertical target jitter (increases tracking pressure)
        if (Math.random() < 0.12) {
          e.target.vy = (Math.random() - 0.5) * 8 * timeFactor;
        }
        e.target.y = Math.max(cvs.height * 0.35, Math.min(cvs.height * 0.65, e.target.y + e.target.vy * dt * 60));
        e.target.vy *= 0.9; // damp vertical offset

        // --- TRACKING LOCK-ON ALIGNMENT CHECK ---
        const ch = e.crosshair;
        const dist = Math.hypot(ch.x - e.target.x, ch.y - e.target.y);
        const onTarget = dist <= e.target.radius + 8; // Slight buffer for hardware/centering check

        // Record tracking distance stats
        e.distanceSum += dist;
        e.distanceCount++;

        if (onTarget) {
          e.ticksOnTarget++;
          e.msOnTargetStreak += dtMs;
          e.msOffTarget = 0;

          // Reward score (+100 PTS) per 100ms tracking interval
          if (e.msOnTargetStreak >= 100) {
            e.combo++;
            if (e.combo > e.maxCombo) {
              e.maxCombo = e.combo;
            }

            // Combo multiplier mapping
            let multiplier = 1.0;
            if (e.combo >= 20) multiplier = 2.0;
            else if (e.combo >= 15) multiplier = 1.5;
            else if (e.combo >= 10) multiplier = 1.25;
            else if (e.combo >= 5) multiplier = 1.1;

            e.score += Math.round(100 * multiplier);
            setUiScore(e.score);
            setUiCombo(e.combo);
            e.msOnTargetStreak -= 100;

            if (audioSynth) audioSynth.playTick();
            createExplosion(e.target.x, e.target.y, '#22d3ee');

            // Continuous Successful Tracking restores +1s budget per 1.0s tracked (10 combo ticks)
            if (e.combo % 10 === 0) {
              e.timeLeft = Math.min(60, e.timeLeft + 1.0);
            }
          }
        } else {
          // Off target
          e.msOnTargetStreak = 0;
          e.msOffTarget += dtMs;

          // Reset combo if off target longer than 150ms
          if (e.msOffTarget >= 150 && e.combo > 0) {
            e.sumCombos += e.combo;
            e.countCombos++;
            e.combo = 0;
            setUiCombo(0);
          }

          // Off-target penalty: -1s time penalty when tracking is lost (>350ms off-target)
          if (e.msOffTarget >= 350) {
            e.timeLeft = Math.max(0, e.timeLeft - 1.0);
            
            e.screenShake = 5;
            e.flash = { color: '239, 68, 68', alpha: 0.15 };
            if (audioSynth) audioSynth.playFail();
            createExplosion(ch.x, ch.y, '#ef4444');

            // Reset off-target timer to prevent instant double-penalties
            e.msOffTarget = 0;
          }
        }
      }

      // Drawing Phase
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

      if (e.flash.alpha > 0) {
        ctx.fillStyle = `rgba(${e.flash.color}, ${e.flash.alpha})`;
        ctx.fillRect(0, 0, cvs.width, cvs.height);
        e.flash.alpha -= dt * 2.0;
      }

      // Grid lines
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.03)';
      ctx.lineWidth = 1;
      for (let i = 0; i < cvs.width; i += 60) {
        ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, cvs.height); ctx.stroke();
      }
      for (let j = 0; j < cvs.height; j += 60) {
        ctx.beginPath(); ctx.moveTo(0, j); ctx.lineTo(cvs.width, j); ctx.stroke();
      }

      // Draw Jitter Target
      if (gameState === 'playing' || gameState === 'start') {
        const t = e.target;
        ctx.save();
        ctx.shadowBlur = 16;
        ctx.shadowColor = '#06b6d4'; // Cyan glow
        ctx.fillStyle = 'rgba(6, 182, 212, 0.75)';
        ctx.beginPath(); ctx.arc(t.x, t.y, t.radius, 0, Math.PI * 2); ctx.fill();

        ctx.strokeStyle = '#22d3ee'; // Light cyan ring
        ctx.lineWidth = 2.5;
        ctx.beginPath(); ctx.arc(t.x, t.y, t.radius + 5, 0, Math.PI * 2); ctx.stroke();

        // White core center
        ctx.fillStyle = '#ffffff';
        ctx.beginPath(); ctx.arc(t.x, t.y, t.radius * 0.35, 0, Math.PI * 2); ctx.fill();
        ctx.restore();
      }

      // Draw Particles
      for (let i = e.particles.length - 1; i >= 0; i--) {
        const p = e.particles[i];
        p.x += p.vx; p.y += p.vy; p.life -= dt * 2.2;
        if (p.life <= 0) { e.particles.splice(i, 1); continue; }
        ctx.globalAlpha = p.life; ctx.fillStyle = p.color; ctx.fillRect(p.x, p.y, 3, 3);
      }
      ctx.globalAlpha = 1.0;

      // Draw Crosshair
      const ch = e.crosshair;
      if (ch.initialized && (gameState === 'playing' || gameState === 'start')) {
        const color = pointerLocked ? '#38bdf8' : '#eab308';
        ctx.strokeStyle = color;
        ctx.fillStyle = color;

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

        ctx.beginPath(); ctx.arc(ch.x, ch.y, 1.5, 0, Math.PI * 2); ctx.fill();
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
    const text = `🎯 I scored ${uiScore} PTS and survived ${uiTimeSurvived}s on the Anti-Strafe Jitter Duel! Practice reactive tracking at skilldrills.online!`;
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({ title: 'My Jitter Tracking Score', text, url: 'https://skilldrills.online/drills/fps' });
      } catch (e) {}
    } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      alert('Score card copied to clipboard!');
    }
  }, [uiScore, uiTimeSurvived]);

  return (
    <div ref={pageRef} className="min-h-screen select-none bg-[#050508] text-white">
      <Head>
        <title>Reactive Tracking Trainer - Anti-Strafe Aim Training for Apex & Overwatch</title>
        <meta name="description" content="Improve reactive tracking, anti-strafe aim, and close-range target tracking with this free FPS trainer." />
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
                <li className="text-cyan-400 font-medium">Anti-Strafe Jitter Duel</li>
              </ol>
            </nav>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-br from-cyan-500 to-sky-600 rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                  <Crosshair className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Reactive Tracking Trainer – Anti-Strafe Jitter Duel</h1>
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
            
            <StatCard 
              icon={<Flame className={uiCombo >= 10 ? "text-orange-500 animate-pulse" : "text-gray-500"} />} 
              value={uiCombo} 
              label="Combo" 
              highlight={uiCombo >= 10}
            />
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
              <div ref={progressBarRef} className="h-full bg-cyan-500" style={{ width: '100%' }} />
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
                    <p className="text-[10px] text-cyan-400 font-bold uppercase tracking-widest">Combo</p>
                    <p className="text-2xl font-black text-cyan-500 leading-none">{uiCombo}x</p>
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
                <AlertCircle className="w-12 h-12 text-cyan-500 mx-auto mb-4" />
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
                <h2 className="text-xl font-black text-white uppercase tracking-wider mb-1">
                  Anti-Strafe Jitter Duel
                </h2>
                <p className="text-xs text-slate-500 uppercase tracking-widest mb-6">
                  Hardware Raw Input • Survival Difficulty
                </p>

                <div className="grid grid-cols-2 gap-3 mb-6 text-left">
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Objective</span>
                    <span className="text-sm font-black text-white">Lock Crosshair</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Reward</span>
                    <span className="text-sm font-black text-green-400">+100 PTS & Combos</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Timer Uptime</span>
                    <span className="text-sm font-black text-blue-400">+1.0s / 1.0s Track</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Penalty</span>
                    <span className="text-sm font-black text-red-400">-1.0s Break penalty</span>
                  </div>
                </div>

                <div className="bg-[#0b0f19] border border-slate-850 p-4 rounded-xl mb-6 text-left text-xs text-slate-400 space-y-4">
                  <div>
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-white uppercase mb-3">
                      <Sliders className="w-3.5 h-3.5 text-cyan-500" /> Universal Sens
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-cyan-400 font-mono text-sm font-bold">{universalSens.toFixed(2)}x</span>
                      <span className="text-[10px] text-slate-500">Approx: {cmPer360} cm/360</span>
                    </div>
                    <input 
                      type="range" min="0.1" max="3.0" step="0.05" 
                      value={universalSens} 
                      onChange={(e) => setUniversalSens(parseFloat(e.target.value))} 
                      className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500" 
                    />
                  </div>

                  <div className="pt-3 border-t border-slate-800">
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-white uppercase mb-3">
                      <Sliders className="w-3.5 h-3.5 text-orange-500" /> Tracking Modifier
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-orange-400 font-mono text-sm font-bold">{baseSpeed}%</span>
                      <span className="text-[10px] text-slate-500">Base target speed modifier</span>
                    </div>
                    <input 
                      type="range" min="50" max="200" step="10" 
                      value={baseSpeed} 
                      onChange={(e) => setBaseSpeed(parseFloat(e.target.value))} 
                      className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-orange-500" 
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={startGame}
                    className="flex-1 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg uppercase tracking-widest transition-all duration-200 active:scale-95"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    Begin Tactical Drill
                  </button>
                </div>
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
                  Session Survived: {analytics.sessionDuration} Seconds
                </p>

                <div className="grid grid-cols-3 gap-2 mb-6 text-left">
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold font-mono">Final Score</span>
                    <span className="text-lg font-black text-white">{uiScore}</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold font-mono">Tracking Ratio</span>
                    <span className="text-lg font-black text-white">{analytics.accuracy}%</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold font-mono">Efficiency</span>
                    <span className="text-lg font-black text-white">{analytics.trackingEfficiency}%</span>
                  </div>
                  
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold font-mono">Time Tracked</span>
                    <span className="text-lg font-black text-white">{analytics.timeOnTarget}s</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold font-mono">Best Combo</span>
                    <span className="text-lg font-black text-white">{analytics.bestCombo}x</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold font-mono">Assigned Rank</span>
                    <span className={`text-lg font-black ${analytics.rankData.color}`}>
                      Rank {analytics.rankData.rank}
                    </span>
                  </div>

                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold font-mono">Time Missed</span>
                    <span className="text-lg font-black text-white">{analytics.timeOffTarget}s</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold font-mono">Average Combo</span>
                    <span className="text-lg font-black text-white">{analytics.averageCombo}x</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold font-mono">Uptime</span>
                    <span className="text-lg font-black text-white">{analytics.trackingUptime}%</span>
                  </div>
                </div>

                {/* Diagnostics block */}
                {(() => {
                  const diagnostic = getSkillAssessment(analytics.accuracy, analytics.bestCombo, analytics.averageCombo, analytics.trackingEfficiency);
                  return (
                    <div className="bg-[#0b0f19] border border-slate-850 p-4 rounded-xl mb-6 text-left text-xs text-slate-400">
                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-white uppercase mb-1">
                        <Sparkles className="w-3.5 h-3.5 text-yellow-500" /> Performance Diagnostics:
                      </div>
                      <p className={`font-bold ${diagnostic.color} mb-1`}>{diagnostic.title}</p>
                      <p className="leading-relaxed">
                        {diagnostic.desc}
                      </p>
                    </div>
                  );
                })()}

                <div className="flex gap-2">
                  <button
                    onClick={startGame}
                    className="flex-1 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg uppercase tracking-widest transition-all duration-200 active:scale-95"
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

        {/* Rules Card */}
        {!isFullscreen && (
          <section className="mt-10">
            <div className="rounded-2xl border border-gray-800 overflow-hidden bg-gray-900 shadow-2xl pointer-events-none">
              <div className="px-6 py-5 border-b border-gray-800 bg-black/40 flex items-center gap-3">
                <Info className="w-5 h-5 text-cyan-400" /><h2 className="font-bold text-white text-lg tracking-wide">Drill Instructions & Scoring</h2>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-5">
                  <RuleItem num="1" color="green" text="Track Jitter Target" highlight="+100 PTS per 100ms" result="Score only increases" />
                  <RuleItem num="2" color="blue" text="Combo Scaling" highlight="Up to 2.0x Multiplier" result="Sustain lock-on to double scores" />
                </div>
                <div className="space-y-5">
                  <RuleItem num="3" color="red" text="Tracking Failure" highlight="-1.0s Timer penalty" result="Triggers after 350ms off-target" />
                  <RuleItem num="4" color="orange" text="Decay Scaling" highlight="Target shrinks & speeds up" result="Survival scales difficulty" />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* About Article Section */}
        {!isFullscreen && (
          <article className="mt-12 text-gray-300">
            <div className="rounded-2xl border border-gray-800 overflow-hidden bg-gray-900 shadow-xl">
              <div className="px-6 py-5 border-b border-gray-800 bg-black/40 flex items-center gap-3">
                <GraduationCap className="w-5 h-5 text-cyan-400" />
                <h2 className="font-bold text-white text-lg tracking-wide">About the Reactive Tracking Trainer</h2>
              </div>
              
              <div className="p-8 space-y-8">
                <section>
                  <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                    <Eye className="w-5 h-5 text-cyan-400" /> What Is Reactive Tracking?
                  </h3>
                  <p className="text-sm leading-relaxed mb-4">
                    <strong>Reactive tracking</strong> is the core mechanical skill in shooters where a player continuously matches their crosshair coordinate position to the physical position of a rapidly and unpredictably moving target. Unlike click timing (flicks) or predictive tracking, reactive tracking relies entirely on visual processing reflexes to detect sudden velocity changes, micro-accelerations, and ADAD reversals, instantly correcting the crosshair.
                  </p>
                  <p className="text-sm leading-relaxed">
                    By training reactive tracking, players learn to suppress their panic responses during close-quarters engagements, building smooth wrist control and minimizing micro-hesitation delays.
                  </p>
                </section>

                <section>
                  <h3 className="text-lg font-bold text-white mb-3">How To Improve Tracking Aim</h3>
                  <p className="text-sm leading-relaxed mb-3">
                    To master smooth tracking aim:
                  </p>
                  <ul className="list-disc pl-5 text-sm space-y-2">
                    <li><strong>Focus on the Target:</strong> Do not stare at your crosshair; stare at the center of the target sphere. Let your peripheral vision automatically align the crosshair.</li>
                    <li><strong>Tension Control:</strong> Relax your hand and arm. Clenching your grip leads to jagged, blocky corrections instead of a fluid sweep.</li>
                    <li><strong>Direction-Change Reading:</strong> Do not guess when the target will change direction. Wait for the physical speed to hit zero, then follow the new direction.</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-lg font-bold text-white mb-3">How Professional Apex Players Train Tracking</h3>
                  <p className="text-sm leading-relaxed">
                    Apex Legends has an extremely high Time-To-Kill (TTK). To secure a knock-down, players must maintain a constant tracking lock for several seconds. Pro players train their tracking using close-quarters ADAD scenarios, practicing target lock-on retention and micro-jitter corrections to ensure maximum damage uptime while they strafe.
                  </p>
                </section>

                <section>
                  <h3 className="text-lg font-bold text-white mb-3">Benefits Of Anti-Strafe Training</h3>
                  <p className="text-sm leading-relaxed">
                    In shooters, players constantly counter-strafe to make themselves harder to hit. This drill conditions your nervous system to read ADAD movements, false direction commits, and direction fakes. By pushing your eye-to-hand coordination with survival time limits, the trainer conditions consistent close-quarters centering.
                  </p>
                </section>

                <section>
                  <h3 className="text-lg font-bold text-white mb-3">How This Reactive Tracking Trainer Works</h3>
                  <p className="text-sm leading-relaxed">
                    The target sphere starts moving horizontally in the center. As your survival time increases, the difficulty scales invisibly: the target shrinks slightly, accelerates faster, changes direction more frequently, and introduces human-like acceleration bursts and fake direction shifts. Your goal is to keep the target centered inside the crosshair to prevent the timer from running out.
                  </p>
                </section>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 py-4 border-y border-gray-800/50">
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40 hover:bg-gray-800/50 transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-cyan-600 flex items-center justify-center"><Users className="w-4 h-4 text-white" /></div>
                      <h4 className="text-sm font-bold text-white">Who Is This For?</h4>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Players of Apex Legends, Overwatch, The Finals, Quake, and Call of Duty looking to lock down their close-range automatic tracking accuracy.</p>
                  </div>
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40 hover:bg-gray-800/50 transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-green-600 flex items-center justify-center"><TrendingUp className="w-4 h-4 text-white" /></div>
                      <h4 className="text-sm font-bold text-white">Skills Trained</h4>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Anti-strafe tracking, jitter correction, wrist speed alignment, visual focus retention, and damage uptime efficiency.</p>
                  </div>
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40 hover:bg-gray-800/50 transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-red-650/20 border border-red-500/30 flex items-center justify-center"><Zap className="w-4 h-4 text-red-400" /></div>
                      <h4 className="text-sm font-bold text-white">Why It Matters</h4>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Close-quarters duels are won by the player who registers more shots on target. A high tracking efficiency directly increases TTK supremacy.</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#0b0f19] border-t border-gray-800 p-8">
                <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                  <div className="flex items-center gap-3 mb-4">
                    <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">Frequently Asked Questions</h3>
                  </div>
                  <div className="space-y-5">
                    <div>
                      <h4 className="text-sm font-bold text-gray-200 tracking-tight">What is the Anti Strafe Jitter Duel drill?</h4>
                      <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">A free interactive training exercise designed to test and sharpen your fps processing systems, eye-brain speed, and task focus.</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-200 tracking-tight">Who is this visual-cognitive training designed for?</h4>
                      <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">Competitive gamers, esports players (Valorant, CS2, Apex), students, and anyone looking to improve focus, concentration, and task execution.</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-200 tracking-tight">Is this training program free to play?</h4>
                      <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">Yes, all drills on SkillDrills are 100% free with no registration, log-ins, or software downloads required. You can train directly in your web browser.</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-200 tracking-tight">How often should I practice Anti Strafe Jitter Duel?</h4>
                      <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">We recommend practicing this training task for 5-10 minutes daily as a cognitive warmup to keep your focus reflexes sharp.</p>
                    </div>
                  </div>
                </div>
                  <div className="space-y-5">
                    <div>
                      <h4 className="text-sm font-bold text-gray-200 tracking-tight">What is the Anti Strafe Jitter Duel drill?</h4>
                      <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">A free interactive training exercise designed to test and sharpen your fps processing systems, eye-brain speed, and task focus.</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-200 tracking-tight">Who is this visual-cognitive training designed for?</h4>
                      <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">Competitive gamers, esports players (Valorant, CS2, Apex), students, and anyone looking to improve focus, concentration, and task execution.</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-200 tracking-tight">Is this training program free to play?</h4>
                      <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">Yes, all drills on SkillDrills are 100% free with no registration, log-ins, or software downloads required. You can train directly in your web browser.</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-200 tracking-tight">How often should I practice Anti Strafe Jitter Duel?</h4>
                      <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">We recommend practicing this training task for 5-10 minutes daily as a cognitive warmup to keep your focus reflexes sharp.</p>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FAQItem q="1. What is reactive tracking?" a="Reactive tracking is the mechanical ability in FPS games to continuously follow a rapidly and unpredictably moving target with your crosshair, requiring fast visual reaction and micro-corrections." />
                  <FAQItem q="2. How do I improve tracking aim?" a="Improve tracking aim by maintaining high visual focus on the target itself rather than your crosshair, training against fast direction changes, and practicing smooth, continuous mouse adjustments without tensing your hand." />
                  <FAQItem q="3. What is anti-strafe tracking?" a="Anti-strafe tracking is a specialized aiming skill to counter an enemy's ADAD movement patterns, where the target quickly switches horizontal directions to break tracking alignment." />
                  <FAQItem q="4. How do professional Apex players train tracking?" a="Professional Apex Legends players practice tracking by using high-strafe reactive tracking trainers, learning target velocity changes, and performing smooth close-quarters tracking warmups." />
                  <FAQItem q="5. How do Overwatch players improve tracking aim?" a="Overwatch players improve tracking aim by training against erratic movement patterns (like ADAD and crouch strafes) and maintaining crosshair alignment on high-mobility heroes like Tracer and Genji." />
                  <FAQItem q="6. Why is tracking important?" a="Tracking aim is critical for fully automatic weapons and high time-to-kill (TTK) games like Apex, Overwatch, and The Finals, where damage output is directly proportional to how long your crosshair remains on the enemy." />
                  <FAQItem q="7. Can this improve close-range aim?" a="Yes, this drill simulates rapid close-range strafes and jitter duels where targets move wide across your screen, forcing your eyes and wrist to make high-speed reactive adjustments." />
                  <FAQItem q="8. Does this help Apex Legends?" a="Absolutely. Apex duels are defined by fast ADAD strafes, slide jumps, and close-quarter jitter movements. This drill directly targets those reaction mechanics." />
                  <FAQItem q="9. Does this help Overwatch?" a="Yes. It trains your hand to match the instant, zero-momentum direction changes typical of Overwatch characters, improving hit registration for tracking heroes like Soldier: 76, Zarya, and Tracer." />
                  <FAQItem q="10. Does this help Call of Duty?" a="Yes, tracking and reading player movement changes is essential in Call of Duty for tracking slide cancelers and fast strafers in close-quarters gunfights." />
                  <FAQItem q="11. How often should I practice tracking?" a="We recommend dedicating 10-15 minutes to reactive tracking and direction change drills daily before launching your games." />
                  <FAQItem q="12. Is this drill free?" a="Yes, this reactive tracking trainer is completely free to use and runs directly in any modern browser without requiring any downloads or account registration." />
                  <FAQItem q="13. What skills does this improve?" a="It improves anti-strafe response, jitter correction speed, continuous tracking uptime, mouse tension control, and target lock-on retention." />
                  <FAQItem q="14. Can tracking drills improve consistency?" a="Yes, repetitive practice against high-speed direction shifts develops consistent wrist-to-screen coordinate mapping, minimizing mechanical errors and aiming panic." />
                  <FAQItem q="15. How do I read fast direction changes?" a="Do not try to guess when the target will turn. Relax your eyes, widen your focal awareness, and react to the target's change in velocity as a reflex rather than an anticipation." />
                </div>
              </div>
            </div>
          </article>
        )}

        {!isFullscreen && (
          <section className="mt-14" aria-label="Explore related aim and response drills">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-5 rounded-full bg-cyan-500"></div>
              <h2 className="text-xs font-bold text-white uppercase tracking-widest font-mono">
                Explore related drills
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              <RelatedCard href="/drills/fps/reactive-sphere-tracking" title="Reactive Sphere" desc="Micro-tracking direction shifts." color="orange" icon={<Target className="w-4 h-4" />} />
              <RelatedCard href="/drills/fps/strafe-tracking" title="Strafe Tracking" desc="Track targets while moving left/right." color="blue" icon={<Crosshair className="w-4 h-4" />} />
              <RelatedCard href="/drills/fps/target-switching" title="Target Switching" desc="Flick and track target arrays." color="green" icon={<Target className="w-4 h-4" />} />
              <RelatedCard href="/drills/fps/180-degree-awareness" title="180° Awareness Pro" desc="Flick to flanking perimeter spawns." color="indigo" icon={<Zap className="w-4 h-4" />} />
              <RelatedCard href="/drills/fps/flick-shot-training" title="Pro Flick Trainer" desc="Snap to targets in time-attack mode." color="rose" icon={<Activity className="w-4 h-4" />} />
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
                    <li><Link href="/drills/motor/hand-eye-coordination/aim-trainer" className="hover:text-cyan-400 transition-colors">Aim Trainer Elite</Link></li>
                    <li><Link href="/drills/fps/flick-shot-training" className="hover:text-cyan-400 transition-colors">Flick Shot Trainer</Link></li>
                    <li><Link href="/drills/fps" className="text-cyan-500 hover:text-cyan-400 transition-colors font-bold">All FPS Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Memory</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/memory/working-memory/n-back" className="hover:text-cyan-400 transition-colors">3-Back Training</Link></li>
                    <li><Link href="/drills/memory/short-term-memory/color-sequence" className="hover:text-cyan-400 transition-colors">Color Sequence</Link></li>
                    <li><Link href="/drills/memory" className="text-cyan-500 hover:text-cyan-400 transition-colors font-bold">All Memory Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Cognitive</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/cognitive/memory/card-matching" className="hover:text-cyan-400 transition-colors">Memory Games</Link></li>
                    <li><Link href="/drills/cognitive/attention/divided-attention" className="hover:text-cyan-400 transition-colors">Attention Drills</Link></li>
                    <li><Link href="/drills/cognitive" className="text-cyan-500 hover:text-cyan-400 transition-colors font-bold">All Cognitive Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Academic</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/academic/writing-speed/typing-test" className="hover:text-cyan-400 transition-colors">Typing Speed Test</Link></li>
                    <li><Link href="/drills/academic/math-speed/mental-math" className="hover:text-cyan-400 transition-colors">Mental Math</Link></li>
                    <li><Link href="/drills/academic" className="text-cyan-500 hover:text-cyan-400 transition-colors font-bold">All Academic Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">More Sectors</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/visual" className="hover:text-cyan-400 transition-colors">Visual</Link></li>
                    <li><Link href="/drills/physical" className="hover:text-cyan-400 transition-colors">Physical</Link></li>
                  </ul>
                </div>
              </div>
              
              <div className="border-t border-gray-800 pt-8 text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="w-6 h-6 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 rounded-lg flex items-center justify-center">
                    <Crosshair className="w-3.5 h-3.5 text-cyan-400" />
                  </div>
                  <span className="text-white font-black tracking-widest text-xs uppercase">SkillDrills</span>
                </div>
                <p className="text-[9px] mb-2">&copy; {new Date().getFullYear()} SkillDrills. All rights reserved.</p>
                <p className="text-[9px] max-w-2xl mx-auto leading-relaxed mb-6">
                  Open-source telemetry training platform using hardware pointer lock. Free forever. No downloads required.
                </p>
                
                <div className="flex items-center justify-center gap-4 flex-wrap mt-6">
                  <a href="https://youtube.com/@skilldrills.online" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors p-2.5 bg-gray-900 rounded-full hover:bg-gray-800 shadow-md" title="YouTube">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
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
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/></svg>
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
    <div className={`group rounded-xl border ${highlight ? 'border-cyan-550/50 bg-cyan-550/5' : 'border-gray-800 bg-gray-900/50'} p-2 text-center flex flex-col justify-center h-full transition-all duration-300 hover:scale-[1.03] hover:border-gray-700`}>
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
    purple: 'from-purple-500 to-violet-500',
    green: 'from-green-500 to-emerald-500',
    cyan: 'from-cyan-500 to-blue-500',
    indigo: 'from-indigo-500 to-purple-500',
    rose: 'from-rose-500 to-pink-500'
  };
  return (
    <Link href={href} className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-[#0b0f19]/45 transition-all duration-300 hover:shadow-[0_0_20px_rgba(6,182,212,0.1)] hover:-translate-y-1 hover:border-cyan-500/50 block p-5">
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${gradients[color]}`}></div>
      <div className="w-10 h-10 rounded-xl bg-[#050811] border border-slate-700 flex items-center justify-center text-slate-400 group-hover:text-white mb-3 shadow-inner">
        {icon}
      </div>
      <h3 className="font-bold text-base mb-1.5 text-white group-hover:text-cyan-400 transition-colors">{title}</h3>
      <p className="text-xs text-slate-500 mb-4">{desc}</p>
      <div className="flex items-center gap-1.5 text-cyan-400 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-wider">
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
