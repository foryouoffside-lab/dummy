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
  Share2, Copy, Brain, Sliders
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

  playSuccess(combo = 0) {
    if (!this.enabled || !this.ctx) return;
    try {
      if (this.ctx.state === 'suspended') this.ctx.resume();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      const baseFreq = 880;
      const freqPitch = Math.min(1300, baseFreq + (combo * 10)); 
      osc.frequency.setValueAtTime(freqPitch, this.ctx.currentTime); 
      osc.frequency.setValueAtTime(freqPitch * 1.2, this.ctx.currentTime + 0.04); 
      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.15);
      osc.connect(gain); 
      gain.connect(this.ctx.destination);
      osc.start(); 
      osc.stop(this.ctx.currentTime + 0.15);
    } catch(e) {}
  }

  playFail() {
    if (!this.enabled || !this.ctx) return;
    try {
      if (this.ctx.state === 'suspended') this.ctx.resume();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(140, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.18);
      osc.connect(gain); gain.connect(this.ctx.destination);
      osc.start(); osc.stop(this.ctx.currentTime + 0.18);
    } catch(e) {}
  }

  playShoot() {
    if (!this.enabled || !this.ctx) return;
    try {
      if (this.ctx.state === 'suspended') this.ctx.resume();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(320, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(100, this.ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.03, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);
      osc.connect(gain); gain.connect(this.ctx.destination);
      osc.start(); osc.stop(this.ctx.currentTime + 0.08);
    } catch(e) {}
  }

  setEnabled(status) {
    this.enabled = status;
  }
}

const audioSynth = typeof window !== 'undefined' ? new AudioSynthesizer() : null;
const DRILL_DURATION = 60; // 60 seconds strict

// ============================================================
// LEVEL CONFIGURATOR
// ============================================================
const getLevelStats = (lvl) => {
  let speed = 350;
  let radius = 22;
  let height = 45;
  
  if (lvl === 1) {
    speed = 350;
    radius = 24;
    height = 50;
  } else if (lvl === 2) {
    speed = 450;
    radius = 21;
    height = 45;
  } else if (lvl === 3) {
    speed = 550;
    radius = 18;
    height = 40;
  } else if (lvl === 4) {
    speed = 650;
    radius = 16;
    height = 36;
  } else if (lvl === 5) {
    speed = 750;
    radius = 14;
    height = 32;
  }
  
  return { lvl, speed, radius, height };
};

// ============================================================
// RANK CALCULATION & SUGGESTIONS
// ============================================================
const calculateRank = (score, accuracy, maxChain) => {
  if (accuracy >= 95 && maxChain >= 40) return { rank: 'Aim Laboratory Master', color: 'text-fuchsia-400' };
  if (accuracy >= 90 && maxChain >= 30) return { rank: 'Tracking Specialist', color: 'text-pink-400' };
  if (accuracy >= 85 && maxChain >= 20) return { rank: 'Professional Tracker', color: 'text-yellow-400' };
  if (accuracy >= 78 && maxChain >= 15) return { rank: 'Elite Tracker', color: 'text-green-400' };
  if (accuracy >= 70 && maxChain >= 10) return { rank: 'Competitive Tracker', color: 'text-blue-400' };
  if (accuracy >= 62) return { rank: 'Advanced Tracker', color: 'text-indigo-400' };
  if (accuracy >= 55) return { rank: 'Reactive Tracker', color: 'text-slate-400' };
  if (accuracy >= 45) return { rank: 'Steady Tracker', color: 'text-slate-500' };
  return { rank: 'Recruit Tracker', color: 'text-slate-600' };
};

const getAiSuggestions = (lAcc, rAcc, jAcc, csAcc, stability, smoothness, overtrack, undertrack) => {
  const suggestions = [];
  if (Math.abs(lAcc - rAcc) > 12) {
    suggestions.push(`Directional Bias: Your ${lAcc < rAcc ? "left-side" : "right-side"} tracking is significantly weaker (${Math.abs(lAcc - rAcc)}% gap). Focus on wrist pivot symmetry.`);
  }
  if (jAcc < 60) {
    suggestions.push("Weak Jump Tracking: You struggle to maintain lock-on when the target is airborne. Focus on vertical visual tracking.");
  }
  if (csAcc < 60) {
    suggestions.push("Counter-Strafe lag: Your response to target direction switches is slow. Anticipate momentum swaps and reduce reaction delay.");
  }
  if (overtrack > undertrack * 1.5) {
    suggestions.push("Overtracking Detected: You consistently overshoot targets, moving your crosshair faster than the target moves. Smooth out your hand speed.");
  } else if (undertrack > overtrack * 1.5) {
    suggestions.push("Undertracking Detected: Your crosshair consistently lags behind target acceleration. Be more reactive to speed bursts.");
  }
  if (stability < 70) {
    suggestions.push("Jittery Aim: Low stability indicates excessive micro-correction spam. Relax your wrist grip and track in sweeping lines.");
  }
  if (suggestions.length === 0) {
    suggestions.push("Excellent baseline! Directional balance, jump reading, and crosshair stability are all well within optimal ranges.");
  }
  return suggestions.slice(0, 2).join(" ");
};

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function StrafeTrackingClient() {
  const [gameState, setGameState] = useState('start'); 
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [pointerLocked, setPointerLocked] = useState(false);
  const [universalSens, setUniversalSens] = useState(1.0);
  const [weaponSpray, setWeaponSpray] = useState(true); // Default to on for tactical realism

  // HUD State
  const [uiScore, setUiScore] = useState(0);
  const [uiLevel, setUiLevel] = useState(1);
  const [uiCombo, setUiCombo] = useState(0);
  const [uiTimeLeft, setUiTimeLeft] = useState(DRILL_DURATION);
  const [bestScore, setBestScore] = useState(0);
  const [isNewBest, setIsNewBest] = useState(false);
  const [flashBg, setFlashBg] = useState(null);

  const [analytics, setAnalytics] = useState({
    accuracy: 100, successfulHits: 0, missedClicks: 0, timeouts: 0, 
    avgReactionTime: 0, maxCombo: 0, finalLevel: 1, rankData: null,
    leftAccuracy: 0, rightAccuracy: 0, jumpAccuracy: 0, counterStrafeAccuracy: 0,
    stabilityScore: 0, smoothnessScore: 0, overtrackPercent: 0, undertrackPercent: 0,
    coachSuggestion: ''
  });

  // DOM Refs
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  const pageRef = useRef(null);
  const progressBarRef = useRef(null); 
  const lastTimeRef = useRef(DRILL_DURATION); 

  // Engine State
  const engine = useRef({
    crosshair: { x: 0, y: 0, initialized: false },
    target: { x: 0, y: 0, vx: 0, vy: 0, radius: 22, height: 45, groundY: 0 },
    score: 0, level: 1, combo: 0, timeLeft: DRILL_DURATION, nextDecisionTime: 0,
    successfulHits: 0, missedClicks: 0, timeouts: 0, maxCombo: 0, reactionTimes: [], totalActions: 0,
    particles: [], screenShake: 0,
    
    // Telemetry & Firing state
    isMouseDown: false,
    bulletsFired: 0,
    bulletsHit: 0,
    lastFireTime: 0,
    decals: [],
    
    onTargetTimer: 0,
    continuousTrackTime: 0,
    comboTime: 0,
    bestComboTime: 0,
    
    playerX: 0,
    playerVx: 0,
    msOffTarget: 0,
    
    totalFrames: 0,
    framesOnTarget: 0,
    onTargetTime: 0,
    
    leftTime: 0,
    leftOnTargetTime: 0,
    rightTime: 0,
    rightOnTargetTime: 0,
    jumpTime: 0,
    jumpOnTargetTime: 0,
    counterStrafeTime: 0,
    counterStrafeOnTargetTime: 0,
    
    deviationSum: 0,
    deviationCount: 0,
    speedDeltaSum: 0,
    speedDeltaCount: 0,
    
    overtrackCount: 0,
    undertrackCount: 0,
    
    currentArchetype: 'wide',
    desiredVx: 0,
    lastVx: 0,
    counterStrafeEndTime: 0,
    counterStrafeStartTime: 0,
    hasReacted: false,
    
    lastCrosshairX: 0,
    lastCrosshairY: 0,
    lastTx: 0,
    lastTy: 0
  });

  const cmPer360 = (30 / universalSens).toFixed(1);

  useEffect(() => {
    try {
      const savedSens = localStorage.getItem('strafeTrack_sens2');
      if (savedSens) setUniversalSens(parseFloat(savedSens));
      const savedBest = localStorage.getItem('strafeTrack_bestScore2'); 
      if (savedBest) setBestScore(parseInt(savedBest, 10));
      const savedSpray = localStorage.getItem('strafeTrack_spray');
      if (savedSpray) setWeaponSpray(savedSpray === 'true');
    } catch (e) {}
  }, []);

  useEffect(() => {
    if (gameState !== 'playing') {
      try { 
        localStorage.setItem('strafeTrack_sens2', universalSens.toString()); 
        localStorage.setItem('strafeTrack_spray', weaponSpray.toString());
      } catch (e) {}
    }
    if (audioSynth) audioSynth.setEnabled(soundEnabled);
  }, [universalSens, gameState, soundEnabled, weaponSpray]);

  // Core Game Management
  const endGame = useCallback(() => {
    setGameState('gameOver');
    if (document.pointerLockElement) document.exitPointerLock();
    
    const e = engine.current;
    
    // Tracking accuracy (bullets accuracy if weapon spray is enabled, otherwise time on target accuracy)
    const finalAccuracy = weaponSpray 
      ? (e.bulletsFired > 0 ? Math.round((e.bulletsHit / e.bulletsFired) * 100) : 0)
      : (e.totalFrames > 0 ? Math.round((e.framesOnTarget / e.totalFrames) * 100) : 0);

    const lAcc = e.leftTime > 0 ? Math.round((e.leftOnTargetTime / e.leftTime) * 100) : 0;
    const rAcc = e.rightTime > 0 ? Math.round((e.rightOnTargetTime / e.rightTime) * 100) : 0;
    const jAcc = e.jumpTime > 0 ? Math.round((e.jumpOnTargetTime / e.jumpTime) * 100) : 0;
    const csAcc = e.counterStrafeTime > 0 ? Math.round((e.counterStrafeOnTargetTime / e.counterStrafeTime) * 100) : 0;

    // Stability & Smoothness
    const stability = e.deviationCount > 0 
      ? Math.max(10, Math.min(100, Math.round(100 - (e.deviationSum / e.deviationCount) * 1.4)))
      : 0;
    const smoothness = e.speedDeltaCount > 0
      ? Math.max(10, Math.min(100, Math.round(100 - (e.speedDeltaSum / e.speedDeltaCount) * 0.12)))
      : 0;

    const rank = calculateRank(e.score, finalAccuracy, e.maxCombo);
    const suggestion = getAiSuggestions(lAcc, rAcc, jAcc, csAcc, stability, smoothness, e.overtrackCount, e.undertrackCount);

    setAnalytics({
      accuracy: finalAccuracy, successfulHits: e.bulletsHit, missedClicks: e.bulletsFired - e.bulletsHit,
      timeouts: e.timeouts, avgReactionTime: 0, maxCombo: e.maxCombo, finalLevel: e.level, rankData: rank,
      leftAccuracy: lAcc, rightAccuracy: rAcc, jumpAccuracy: jAcc, counterStrafeAccuracy: csAcc,
      stabilityScore: stability, smoothnessScore: smoothness,
      overtrackPercent: e.totalFrames > 0 ? Math.round((e.overtrackCount / e.totalFrames) * 100) : 0,
      undertrackPercent: e.totalFrames > 0 ? Math.round((e.undertrackCount / e.totalFrames) * 100) : 0,
      coachSuggestion: suggestion
    });

    setUiScore(e.score);

    setBestScore(prev => {
      if (e.score > prev) {
        setIsNewBest(true);
        try { localStorage.setItem('strafeTrack_bestScore2', e.score.toString()); } catch(err){}
        return e.score;
      }
      return prev;
    });
  }, [weaponSpray]);

  const createExplosion = (x, y, color) => {
    for (let i = 0; i < 15; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 5 + 1;
      engine.current.particles.push({ x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, life: 1.0, color });
    }
  };

  const startGame = useCallback(async () => {
    if (audioSynth) audioSynth.init(); 

    setIsNewBest(false);
    setUiScore(0);
    setUiLevel(1);
    setUiCombo(0);
    setUiTimeLeft(DRILL_DURATION);
    lastTimeRef.current = DRILL_DURATION;
    
    setAnalytics({ accuracy: 100, successfulHits: 0, missedClicks: 0, timeouts: 0, avgReactionTime: 0, maxCombo: 0, finalLevel: 1, rankData: null });
    setGameState('playing');
    
    engine.current = {
      crosshair: { ...engine.current.crosshair },
      target: { x: 400, y: 300, vx: 350, vy: 0, radius: 22, height: 45, groundY: 300 },
      score: 0, level: 1, combo: 0, timeLeft: DRILL_DURATION,
      nextDecisionTime: performance.now() + 600,
      successfulHits: 0, missedClicks: 0, timeouts: 0, maxCombo: 0, reactionTimes: [], totalActions: 0,
      particles: [], screenShake: 0,
      
      isMouseDown: false,
      bulletsFired: 0,
      bulletsHit: 0,
      lastFireTime: 0,
      decals: [],
      
      onTargetTimer: 0,
      continuousTrackTime: 0,
      comboTime: 0,
      bestComboTime: 0,
      
      playerX: 0,
      playerVx: 0,
      msOffTarget: 0,
      
      totalFrames: 0,
      framesOnTarget: 0,
      onTargetTime: 0,
      
      leftTime: 0,
      leftOnTargetTime: 0,
      rightTime: 0,
      rightOnTargetTime: 0,
      jumpTime: 0,
      jumpOnTargetTime: 0,
      counterStrafeTime: 0,
      counterStrafeOnTargetTime: 0,
      
      deviationSum: 0,
      deviationCount: 0,
      speedDeltaSum: 0,
      speedDeltaCount: 0,
      
      overtrackCount: 0,
      undertrackCount: 0,
      
      currentArchetype: 'wide',
      desiredVx: 350,
      lastVx: 350,
      counterStrafeEndTime: 0,
      counterStrafeStartTime: 0,
      hasReacted: false,
      
      lastCrosshairX: 0,
      lastCrosshairY: 0,
      lastTx: 0,
      lastTy: 0
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

  // Event Listeners for Input
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

  // Keyboard Strafe listener for camera scrolling
  useEffect(() => {
    if (gameState !== 'playing') return;
    const activeKeys = new Set();
    const handleKeyDown = (e) => {
      if (e.code === 'KeyA' || e.code === 'KeyD') {
        activeKeys.add(e.code);
        updatePlayerVx();
      }
    };
    const handleKeyUp = (e) => {
      if (e.code === 'KeyA' || e.code === 'KeyD') {
        activeKeys.delete(e.code);
        updatePlayerVx();
      }
    };
    const updatePlayerVx = () => {
      const e = engine.current;
      if (activeKeys.has('KeyA') && !activeKeys.has('KeyD')) {
        e.playerVx = -350;
      } else if (activeKeys.has('KeyD') && !activeKeys.has('KeyA')) {
        e.playerVx = 350;
      } else {
        e.playerVx = 0;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [gameState]);

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

  // Main Render & Physics Loop
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
          engine.current.target.groundY = height - (document.fullscreenElement ? 150 : 80);
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
      const dt = deltaSec;
      const e = engine.current;
      const t = e.target;

      const stats = getLevelStats(e.level);
      t.radius = stats.radius;
      t.height = stats.height;

      // Define variables at loop function scope to avoid ReferenceError when rendering outside the active play state
      let ch = e.crosshair;
      let currentDrawX = t.x - e.playerX;
      let segAY = t.y - t.height;
      let segBY = t.y + t.height;
      let lineLen = segBY - segAY;
      let tParam = (ch.y - segAY) / (lineLen || 1);
      tParam = Math.max(0, Math.min(1, tParam)); 
      let closestY = segAY + tParam * lineLen;
      let dist = Math.hypot(ch.x - currentDrawX, ch.y - closestY);

      if (gameState === 'playing' && pointerLocked) {
        // Precise timer countdown
        if (e.timeLeft > 0) {
          e.timeLeft -= deltaSec;
        }

        // Hard interrupt if time hits zero
        if (e.timeLeft <= 0) {
          e.timeLeft = 0;
          setUiTimeLeft(0);
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
            setUiTimeLeft(intTime);
            lastTimeRef.current = intTime;
        }

        // Target AI dodge movement logic
        if (time >= e.nextDecisionTime) {
          const archetypes = ['micro', 'wide', 'counter', 'burst', 'jump', 'panic', 'swap'];
          e.currentArchetype = archetypes[Math.floor(Math.random() * archetypes.length)];
          const maxSpeed = stats.speed;

          if (e.currentArchetype === 'micro') {
            e.desiredVx = (Math.random() > 0.5 ? 1 : -1) * maxSpeed * 0.75;
            e.nextDecisionTime = time + (150 + Math.random() * 200);
          } else if (e.currentArchetype === 'wide') {
            e.desiredVx = (t.vx > 0 ? -1 : 1) * maxSpeed * 0.95;
            e.nextDecisionTime = time + (1000 + Math.random() * 700);
          } else if (e.currentArchetype === 'counter') {
            e.desiredVx = (t.vx > 0 ? -1 : 1) * maxSpeed * 1.1;
            e.nextDecisionTime = time + (300 + Math.random() * 200);
          } else if (e.currentArchetype === 'burst') {
            e.desiredVx = (Math.random() > 0.5 ? 1 : -1) * maxSpeed * 1.35;
            e.nextDecisionTime = time + (200 + Math.random() * 200);
          } else if (e.currentArchetype === 'jump') {
            e.desiredVx = (Math.random() > 0.5 ? 1 : -1) * maxSpeed * 0.8;
            if (t.y >= t.groundY) t.vy = -500;
            e.nextDecisionTime = time + (600 + Math.random() * 400);
          } else if (e.currentArchetype === 'panic') {
            e.desiredVx = (Math.random() > 0.7 ? 0 : (Math.random() > 0.5 ? 1 : -1) * maxSpeed * 1.25);
            e.nextDecisionTime = time + (100 + Math.random() * 150);
          } else {
            e.desiredVx = -t.vx * 0.9;
            e.nextDecisionTime = time + (400 + Math.random() * 300);
          }
          e.hasReacted = false;
        }

        // Apply natural momentum counters
        const accelRate = stats.lvl * 2.5 + 9.5;
        t.vx += (e.desiredVx - t.vx) * deltaSec * accelRate;

        // Jump physics
        if (t.y < t.groundY) {
          t.vy += 1400 * deltaSec; 
        }

        e.playerX += (e.playerVx || 0) * deltaSec;
        t.x += t.vx * deltaSec;
        t.y += t.vy * deltaSec;

        // --- EDGE STUCK BUG FIX ---
        // X Bounds check ensuring the AI desiredVx is properly inverted to bounce off the wall
        let drawX = t.x - e.playerX;
        if (drawX < t.radius + 30) {
          t.x = e.playerX + t.radius + 30;
          t.vx = Math.abs(t.vx); // Force visual velocity right
          e.desiredVx = Math.abs(e.desiredVx); // Force AI intention right
          if (e.desiredVx === 0) e.desiredVx = 350; // Prevent deadstops
          e.nextDecisionTime = time + 250; // Give it time to travel away from the wall
        } else if (drawX > cvs.width - t.radius - 30) {
          t.x = e.playerX + cvs.width - t.radius - 30;
          t.vx = -Math.abs(t.vx); // Force visual velocity left
          e.desiredVx = -Math.abs(e.desiredVx); // Force AI intention left
          if (e.desiredVx === 0) e.desiredVx = -350; // Prevent deadstops
          e.nextDecisionTime = time + 250; // Give it time to travel away from the wall
        }

        // Y Bounds check
        if (t.y > t.groundY) {
          t.y = t.groundY;
          t.vy = 0;
        }

        // --- SCORING & WEAPON STATE ---
        ch = e.crosshair;
        currentDrawX = t.x - e.playerX;
        segAY = t.y - t.height;
        segBY = t.y + t.height;
        lineLen = segBY - segAY;
        tParam = (ch.y - segAY) / (lineLen || 1);
        tParam = Math.max(0, Math.min(1, tParam)); 
        closestY = segAY + tParam * lineLen;
        dist = Math.hypot(ch.x - currentDrawX, ch.y - closestY);
        const isOverlap = dist <= t.radius;

        // Weapon Spray mechanic
        if (weaponSpray && e.isMouseDown) {
          if (time - e.lastFireTime >= 80) {
            e.lastFireTime = time;
            e.bulletsFired++;
            if (audioSynth) audioSynth.playShoot();
            
            // Decals absolute world coordinate conversion
            const worldX = ch.x + e.playerX;
            const worldY = ch.y;

            if (isOverlap) {
              e.bulletsHit++;
              e.decals.push({ worldX, worldY, life: 1.0, type: 'hit' });
              createExplosion(ch.x, ch.y, '#10b981');
              e.screenShake = Math.max(e.screenShake, 3.5);
              if (audioSynth) audioSynth.playSuccess(e.combo);
            } else {
              // REMOVED PENALTY FOR MISS FIRING: User still sees miss decal, but no time is lost and no screen flash
              e.decals.push({ worldX, worldY, life: 1.0, type: 'miss' });
              createExplosion(ch.x, ch.y, '#ef4444');
              e.screenShake = Math.max(e.screenShake, 1.8);
            }
          }
        }

        const isCurrentlyOnTarget = weaponSpray ? (isOverlap && e.isMouseDown) : isOverlap;

        // Telemetry accumulation
        e.totalFrames++;
        e.deviationSum += dist;
        e.deviationCount++;

        // Mouse vs target relative speeds for smoothness analytics
        const mouseVx = (ch.x - (e.lastCrosshairX || ch.x)) / deltaSec;
        const mouseVy = (ch.y - (e.lastCrosshairY || ch.y)) / deltaSec;
        e.lastCrosshairX = ch.x;
        e.lastCrosshairY = ch.y;
        
        const targetVx = (currentDrawX - (e.lastTx || currentDrawX)) / deltaSec;
        const targetVy = (t.y - (e.lastTy || t.y)) / deltaSec;
        e.lastTx = currentDrawX;
        e.lastTy = t.y;

        const mouseSpeed = Math.hypot(mouseVx, mouseVy);
        const targetSpeed = Math.hypot(targetVx, targetVy);
        e.speedDeltaSum += Math.abs(mouseSpeed - targetSpeed);
        e.speedDeltaCount++;

        // Bias checking
        if (isCurrentlyOnTarget) {
          e.framesOnTarget++;
          if (mouseSpeed > targetSpeed * 1.3) e.overtrackCount++;
          else if (mouseSpeed < targetSpeed * 0.7) e.undertrackCount++;
        }

        // Directional Left vs Right tracking
        const isMovingLeft = t.vx < 0;
        if (isMovingLeft) {
          e.leftTime += deltaSec;
          if (isCurrentlyOnTarget) e.leftOnTargetTime += deltaSec;
        } else {
          e.rightTime += deltaSec;
          if (isCurrentlyOnTarget) e.rightOnTargetTime += deltaSec;
        }

        // Airborne tracking
        if (t.y < t.groundY) {
          e.jumpTime += deltaSec;
          if (isCurrentlyOnTarget) e.jumpOnTargetTime += deltaSec;
        }

        // Counter-Strafe checking
        if (Math.sign(t.vx) !== Math.sign(e.lastVx)) {
          e.counterStrafeEndTime = time + 400; // 400ms window
          e.counterStrafeStartTime = time;
          e.hasReacted = false;
        }
        e.lastVx = t.vx;

        if (time <= e.counterStrafeEndTime) {
          e.counterStrafeTime += deltaSec;
          if (isCurrentlyOnTarget) {
            e.counterStrafeOnTargetTime += deltaSec;
            if (!e.hasReacted) {
              e.reactionTimes.push(time - e.counterStrafeStartTime);
              e.hasReacted = true;
            }
          }
        }

        // Scoring: +10 Tracking Points every 0.25s on target
        if (isCurrentlyOnTarget) {
          e.onTargetTimer += deltaSec;
          if (e.onTargetTimer >= 0.25) {
            e.score += 10;
            e.onTargetTimer -= 0.25;
            setUiScore(e.score);
            if (audioSynth) audioSynth.playSuccess(e.combo);
          }

          // Combo Chains: +1 chain every 1.0s
          e.continuousTrackTime += deltaSec;
          if (e.continuousTrackTime >= 1.0) {
            e.continuousTrackTime -= 1.0;
            e.comboTime += 1.0;
            e.combo++;
            
            if (e.combo > e.maxCombo) e.maxCombo = e.combo;
            setUiCombo(e.combo);

            // Reward time bonus: +0.25s per 1s tracked
            e.timeLeft = Math.min(DRILL_DURATION, e.timeLeft + 0.25);

            // Milestone scoring rewards
            if (e.combo === 10) e.score += 50;
            else if (e.combo === 25) e.score += 150;
            else if (e.combo === 50) e.score += 500;
            else if (e.combo === 100) e.score += 1000;

            e.level = Math.floor(e.score / 1000) + 1;
            setUiLevel(e.level);
            setUiScore(e.score);
          }
          e.msOffTarget = 0;
        } else {
          // Off target resets chain
          e.combo = 0;
          e.continuousTrackTime = 0;
          e.comboTime = 0;
          setUiCombo(0);

          // Off-target penalty: -0.5s for every 1.0s off-target
          e.msOffTarget += deltaSec;
          if (e.msOffTarget >= 1.0) {
            e.timeLeft = Math.max(0, e.timeLeft - 0.5);
            e.msOffTarget -= 1.0;
            if (audioSynth) audioSynth.playFail();
            setFlashBg('red');
            setTimeout(() => setFlashBg(null), 100);
          }
        }

        // Live HUD accuracy updates
        if (e.totalFrames % 15 === 0) {
          const liveAcc = weaponSpray 
            ? (e.bulletsFired > 0 ? Math.round((e.bulletsHit / e.bulletsFired) * 100) : 100)
            : (e.totalFrames > 0 ? Math.round((e.framesOnTarget / e.totalFrames) * 100) : 100);
          setAnalytics(prev => ({ ...prev, accuracy: liveAcc }));
        }
      }

      // --- RENDERING PHASE ---
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

      // Grid scrolling offset
      ctx.strokeStyle = 'rgba(239, 68, 68, 0.04)';
      ctx.lineWidth = 1;
      const gridOffset = -e.playerX % 60;
      for (let i = gridOffset; i < cvs.width; i += 60) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, cvs.height); ctx.stroke(); }
      for (let j = 0; j < cvs.height; j += 60) { ctx.beginPath(); ctx.moveTo(0, j); ctx.lineTo(cvs.width, j); ctx.stroke(); }

      // Ground line
      ctx.strokeStyle = 'rgba(239, 68, 68, 0.12)';
      ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(0, t.groundY + t.radius); ctx.lineTo(cvs.width, t.groundY + t.radius); ctx.stroke();

      // Check hit status for glowing outline
      const isCurrentlyHitVisual = dist <= t.radius && gameState === 'playing' && pointerLocked;
      const actualTrackingColor = isCurrentlyHitVisual ? '#00ff88' : '#ef4444';

      // Draw target capsule
      ctx.shadowBlur = isCurrentlyHitVisual ? 22 : 8;
      ctx.shadowColor = actualTrackingColor;
      ctx.fillStyle = isCurrentlyHitVisual ? 'rgba(0, 255, 136, 0.25)' : 'rgba(239, 68, 68, 0.15)';
      ctx.strokeStyle = actualTrackingColor;
      ctx.lineWidth = 2.5;

      ctx.beginPath();
      ctx.arc(currentDrawX, t.y - t.height, t.radius, Math.PI, 0, false); 
      ctx.lineTo(currentDrawX + t.radius, t.y + t.height); 
      ctx.arc(currentDrawX, t.y + t.height, t.radius, 0, Math.PI, false); 
      ctx.lineTo(currentDrawX - t.radius, t.y - t.height); 
      ctx.closePath();
      ctx.fill(); ctx.stroke();
      ctx.shadowBlur = 0;

      // Draw Target bracket lines
      if (isCurrentlyHitVisual) {
        ctx.strokeStyle = 'rgba(0, 255, 136, 0.6)';
        ctx.lineWidth = 1.5;
        const bOff = t.radius + 10;
        
        ctx.beginPath();
        ctx.moveTo(currentDrawX - bOff, t.y - t.height); ctx.lineTo(currentDrawX - bOff - 5, t.y - t.height);
        ctx.lineTo(currentDrawX - bOff - 5, t.y + t.height); ctx.lineTo(currentDrawX - bOff, t.y + t.height);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(currentDrawX + bOff, t.y - t.height); ctx.lineTo(currentDrawX + bOff + 5, t.y - t.height);
        ctx.lineTo(currentDrawX + bOff + 5, t.y + t.height); ctx.lineTo(currentDrawX + bOff, t.y + t.height);
        ctx.stroke();
      }

      // Draw Bullet Decals
      for (let i = e.decals.length - 1; i >= 0; i--) {
        const d = e.decals[i];
        d.life -= dt * 2.8; // Fades away in ~0.35s
        if (d.life <= 0) { e.decals.splice(i, 1); continue; }
        
        const drawDecalX = d.worldX - e.playerX;
        ctx.globalAlpha = d.life;
        ctx.fillStyle = d.type === 'hit' ? '#00ff88' : '#eab308';
        ctx.beginPath();
        ctx.arc(drawDecalX, d.worldY, d.type === 'hit' ? 3.5 : 2.0, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1.0;

      // Particles
      for (let i = e.particles.length - 1; i >= 0; i--) {
        const p = e.particles[i];
        p.x += p.vx; p.y += p.vy; p.life -= dt * 2.5;
        if (p.life <= 0) { e.particles.splice(i, 1); continue; }
        ctx.globalAlpha = p.life; ctx.fillStyle = p.color; ctx.fillRect(p.x, p.y, 3, 3);
      }
      ctx.globalAlpha = 1.0;

      // Draw Crosshair
      ch = e.crosshair;
      if (ch.initialized && (gameState === 'playing' || gameState === 'start')) {
        const activeColor = pointerLocked ? '#00ff88' : '#eab308';
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

        // Accuracy aura ring surrounding the crosshair
        const liveAcc = e.totalFrames > 0 ? Math.round((e.framesOnTarget / e.totalFrames) * 100) : 100;
        let auraColor = null;
        let glowRadius = 0;
        let glowPulse = false;

        if (liveAcc >= 95) {
          auraColor = 'rgba(217, 70, 239, 0.45)'; // Fuchsia Elite Aura
          glowRadius = 32;
          glowPulse = true;
        } else if (liveAcc >= 85) {
          auraColor = 'rgba(16, 185, 129, 0.35)'; // Green Aura
          glowRadius = 26;
        } else if (liveAcc >= 75) {
          auraColor = 'rgba(99, 102, 241, 0.3)'; // Indigo Aura
          glowRadius = 22;
        } else if (liveAcc >= 60) {
          auraColor = 'rgba(59, 130, 246, 0.25)'; // Blue Aura
          glowRadius = 18;
        }

        if (auraColor && glowRadius > 0 && isCurrentlyHitVisual) {
          ctx.save();
          ctx.strokeStyle = auraColor;
          ctx.lineWidth = 2.0;
          ctx.beginPath();
          const r = glowRadius + (glowPulse ? Math.sin(time / 80) * 3 : 0);
          ctx.arc(ch.x, ch.y, r, 0, Math.PI * 2);
          ctx.stroke();
          
          if (glowPulse) {
            ctx.shadowBlur = 15;
            ctx.shadowColor = 'rgba(217, 70, 239, 0.6)';
            ctx.fillStyle = 'rgba(217, 70, 239, 0.04)';
            ctx.beginPath();
            ctx.arc(ch.x, ch.y, r - 4, 0, Math.PI * 2);
            ctx.fill();
          }
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
  }, [gameState, pointerLocked, endGame, weaponSpray]);

  const shareScore = useCallback(async () => {
    const text = `🎯 I scored ${uiScore} PTS (Level ${analytics.finalLevel}) on Strafe Tracking Pro! Accuracy: ${analytics.accuracy}%. Practice your tracking at skilldrills.online!`;
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({ title: 'My Tracking Score', text, url: 'https://skilldrills.online/drills/fps' });
      } catch (e) {}
    } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      alert('Score card copied to clipboard!');
    }
  }, [uiScore, analytics]);

  return (
    <div ref={pageRef} className="min-h-screen select-none bg-[#050508] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {!isFullscreen && (
          <div className="mb-6">
            <nav className="mb-4">
              <ol className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
                <li><Link href="/" className="hover:text-gray-300">Home</Link></li>
                <li><ChevronRight className="w-4 h-4 text-gray-600" /></li>
                <li><Link href="/drills/fps" className="hover:text-gray-300">FPS</Link></li>
                <li><ChevronRight className="w-4 h-4 text-gray-600" /></li>
                <li className="text-red-400 font-medium">Strafe Tracking Trainer</li>
              </ol>
            </nav>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-br from-red-500 to-orange-600 rounded-xl shadow-[0_0_20px_rgba(239,68,68,0.3)]">
                  <Target className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Tracking Aim Trainer – FPS Strafe Tracking Drill</h1>
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

        {!isFullscreen && (
          <div className="grid grid-cols-5 gap-2 mb-2">
            <StatCard icon={<Trophy className="text-yellow-400" />} value={uiScore} label="Score" />
            <StatCard icon={<TrendingUp className="text-fuchsia-400" />} value={`Lv. ${uiLevel}`} label="Level" />
            <StatCard 
              icon={<Flame className={uiCombo >= 10 ? "text-orange-500 animate-pulse" : "text-gray-500"} />} 
              value={uiCombo} 
              label="Combo" 
              highlight={uiCombo >= 10}
            />
            <StatCard icon={<Timer className={uiTimeLeft <= 10 ? 'text-red-400 animate-pulse' : 'text-green-400'} />} value={uiTimeLeft} label="Time" unit="s" />
            <StatCard icon={<Info className="text-blue-400" />} value={`${universalSens.toFixed(2)}x`} label="Sens" />
          </div>
        )}

        <div 
          ref={containerRef} 
          className={`relative overflow-hidden transition-colors outline-none bg-[#05060b] ${
            isFullscreen ? 'w-full h-full' : 'w-full aspect-video min-h-[500px] rounded-2xl border border-gray-800 shadow-2xl'
          }`}
          style={{ backgroundColor: flashBg === 'red' ? '#450a0a' : '#05060b' }}
        >
          {gameState === 'playing' && (
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gray-900 z-[60]">
              <div ref={progressBarRef} className="h-full bg-green-500" style={{ width: '100%' }} />
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
                    <p className="text-[10px] text-fuchsia-400 font-bold uppercase tracking-widest">Level</p>
                    <p className="text-2xl font-black text-fuchsia-400 leading-none">{uiLevel}</p>
                  </div>
                </div>
                
                {uiCombo > 1 && (
                  <div className="bg-black/40 backdrop-blur border border-orange-500/30 px-4 py-2 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-left-4">
                    <Flame className="w-5 h-5 text-orange-500" />
                    <div>
                      <p className="text-[10px] text-orange-400 font-bold uppercase tracking-widest">Combo</p>
                      <p className="text-xl font-black text-white leading-none">{uiCombo}x</p>
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

          <canvas 
            ref={canvasRef} 
            onClick={() => { if (gameState === 'playing' && !pointerLocked) canvasRef.current?.requestPointerLock(); }}
            className={`block absolute top-0 left-0 w-full h-full touch-none z-10 ${gameState === 'playing' ? 'cursor-none' : ''}`} 
          />

          {/* NORMAL FONT START SCREEN */}
          {gameState === 'start' && (
            <div className="absolute inset-0 bg-[#05070e]/98 flex flex-col items-center justify-center p-6 z-30 select-none overflow-y-auto max-h-[100vh] backdrop-blur-sm">
              <div className="max-w-md w-full text-center">
                <h2 className="text-xl font-black text-white uppercase tracking-wider mb-1">
                  Strafe Tracking Pro
                </h2>
                <p className="text-xs text-slate-500 uppercase tracking-widest mb-6">
                  Hardware Raw Input • Endless Progression
                </p>

                <div className="grid grid-cols-2 gap-3 mb-6 text-left">
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Objective</span>
                    <span className="text-sm font-black text-white">Smooth Tracking</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Reward</span>
                    <span className="text-sm font-black text-green-400">+10 PTS & +Chain</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Penalty</span>
                    <span className="text-sm font-black text-red-400">-0.5s Off-Target</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Weapon Style</span>
                    <span className="text-sm font-black text-blue-400">Weapon Spray Option</span>
                  </div>
                </div>

                {/* Optimized Settings Panel matches the Reactified UI */}
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
                      className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-green-500" 
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
                      <div className="w-9 h-5 bg-slate-850 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-slate-400 after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-green-600 peer-checked:after:bg-white"></div>
                    </label>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={startGame}
                    className="flex-1 py-3 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg uppercase tracking-widest transition-all duration-200 active:scale-95"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    Begin Tactical Drill
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* NORMAL FONT GAME OVER SCREEN */}
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
                  Peak difficulty reached: Level {analytics.finalLevel}
                </p>

                <div className="grid grid-cols-3 gap-2.5 mb-6 text-left">
                  <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
                    <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Final Score</span>
                    <span className="text-base font-black text-white">{uiScore}</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
                    <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Accuracy</span>
                    <span className="text-base font-black text-white">{analytics.accuracy}%</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
                    <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Max Chain</span>
                    <span className="text-base font-black text-white">{analytics.maxCombo}s</span>
                  </div>
                  
                  <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
                    <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Left Acc</span>
                    <span className="text-base font-black text-blue-400">{analytics.leftAccuracy}%</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
                    <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Right Acc</span>
                    <span className="text-base font-black text-indigo-400">{analytics.rightAccuracy}%</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
                    <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Jump Acc</span>
                    <span className="text-base font-black text-green-400">{analytics.jumpAccuracy}%</span>
                  </div>

                  <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
                    <span className="text-[7.5px] text-slate-500 block uppercase font-bold">C-Strafe Acc</span>
                    <span className="text-base font-black text-orange-400">{analytics.counterStrafeAccuracy}%</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
                    <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Stability</span>
                    <span className="text-base font-black text-rose-400">{analytics.stabilityScore}%</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
                    <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Smoothness</span>
                    <span className="text-base font-black text-teal-400">{analytics.smoothnessScore}%</span>
                  </div>
                </div>

                <div className="bg-[#0b0f19] border border-slate-850 p-3 rounded-xl mb-4 text-left">
                  <span className={`text-xs font-black block text-center uppercase tracking-widest ${analytics.rankData.color} mb-2`}>
                    Rank: {analytics.rankData.rank}
                  </span>
                  <div className="w-full h-px bg-slate-850 mb-2"></div>
                  <div className="flex items-center gap-1.5 text-[9px] font-bold text-white uppercase mb-1">
                    <Sparkles className="w-3 h-3 text-yellow-500" /> Diagnostics advice:
                  </div>
                  <p className="text-[10px] text-slate-400 leading-normal">
                    {analytics.coachSuggestion}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={startGame}
                    className="flex-1 py-3 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg uppercase tracking-widest transition-all duration-200 active:scale-95"
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

        {/* Info Cards (Visible outside Fullscreen) */}
        {!isFullscreen && (
          <section className="mt-10">
            <div className="rounded-2xl border border-gray-800 overflow-hidden bg-gray-900 shadow-2xl pointer-events-none">
              <div className="px-6 py-5 border-b border-gray-800 bg-black/40 flex items-center gap-3">
                <Info className="w-5 h-5 text-fuchsia-400" /><h2 className="font-bold text-white text-lg tracking-wide">Progression & Scoring Rules</h2>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-5">
                  <RuleItem num="1" color="green" text="Tracking Score" highlight="+10 PTS" result="Per 0.25s on target" />
                  <RuleItem num="2" color="orange" text="Tracking Chain" highlight="+1 Combo per 1.0s" result="Milestone bonuses up to +1000 PTS" />
                </div>
                <div className="space-y-5">
                  <RuleItem num="3" color="fuchsia" text="Level Progression" highlight="Every 1000 PTS" result="Target speeds up & shrinks" />
                  <RuleItem num="4" color="red" text="Tracking Timeout" highlight="-0.5s Time Penalty" result="When off-target for 1s" />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Optimized Articles & SEO Blocks */}
        {!isFullscreen && (
          <article className="mt-12 text-gray-300">
            <div className="rounded-2xl border border-gray-800 overflow-hidden bg-gray-900 shadow-xl">
              <div className="px-6 py-5 border-b border-gray-800 bg-black/40 flex items-center gap-3">
                <GraduationCap className="w-5 h-5 text-green-400" />
                <h2 className="font-bold text-white text-lg tracking-wide">About the Strafe Tracking Aim Trainer</h2>
              </div>
              
              <div className="p-8 space-y-8">
                <section>
                  <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                    <Eye className="w-5 h-5 text-green-400" /> What is Strafe Tracking?
                  </h3>
                  <p className="text-sm leading-relaxed mb-4">
                    <strong>Strafe Tracking</strong> is the mechanical ability to keep your crosshair continuously locked onto an opponent moving dynamically across horizontal and vertical planes. In shooters with a high time-to-kill (TTK), maintaining constant cursor overlap is the defining factor for maximizing damage output.
                  </p>
                  <p className="text-sm leading-relaxed mb-4">
                    Unlike static flicking drills, this trainer requires you to recognize sudden momentum shifts, vertical jumps, and velocity changes in real-time. By actively adapting to unpredictability rather than guessing, you build pure visual-motor reactivity.
                  </p>
                </section>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 py-4 border-y border-gray-800/50">
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40 hover:bg-gray-800/50 transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center"><Users className="w-4 h-4 text-white" /></div>
                      <h4 className="text-sm font-bold text-white">Who Should Use This?</h4>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Esports athletes and ranked grinders in high-mobility titles like Apex Legends, Overwatch 2, and Call of Duty, where targets slide, jump, and counter-strafe continuously.</p>
                  </div>
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40 hover:bg-gray-800/50 transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-fuchsia-600 flex items-center justify-center"><TrendingUp className="w-4 h-4 text-white" /></div>
                      <h4 className="text-sm font-bold text-white">Tracking Consistency</h4>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Teaches smooth wrist glides. If you suffer from shaky aim or micro-jitters during firefights, this drill will expose and help correct excessive hand tension.</p>
                  </div>
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40 hover:bg-gray-800/50 transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-orange-600 flex items-center justify-center"><Zap className="w-4 h-4 text-white" /></div>
                      <h4 className="text-sm font-bold text-white">Counter-Strafe Reading</h4>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Forces you to stop predicting and start reacting. Improves your neurological speed in registering when an enemy reverses their horizontal direction.</p>
                  </div>
                </div>

                <section>
                  <h2 className="text-xl font-bold text-white mb-3">How To Improve Tracking Accuracy</h2>
                  <p className="text-sm leading-relaxed mb-4">
                    Improving aim consistency requires deliberate practice. If you consistently overshoot turns (overtracking) or lag behind acceleration (undertracking), you need to establish a strict practice routine. Common mistakes include:
                  </p>
                  <ul className="list-disc pl-5 text-sm text-gray-400 space-y-2 mb-4">
                    <li><strong className="text-white">Predictive aiming:</strong> Moving your mouse based on expected directions instead of reacting to literal visual stimuli.</li>
                    <li><strong className="text-white">Tensing the hand:</strong> Gripping your mouse too tightly, which introduces muscle fatigue and shaky jitters.</li>
                    <li><strong className="text-white">High-frequency corrections:</strong> Making jerky wrist flicks instead of smooth tracking sweeps.</li>
                  </ul>
                  <p className="text-sm leading-relaxed text-gray-400">
                    Lowering your sensitivity slightly (e.g., 30cm to 45cm/360 rotation) and practicing broad arm sweeps rather than purely wrist pivots is the fastest way to build better mouse control.
                  </p>
                </section>
              </div>

              <div className="bg-[#0b0f19] border-t border-gray-800 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Lightbulb className="w-6 h-6 text-yellow-400" />
                  <h3 className="text-xl font-bold text-white">Frequently Asked Questions</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FAQItem q="1. What is tracking aim?" a="Tracking aim is the mechanical ability to keep your crosshair continuously locked onto an opponent moving in a 3D environment, which is highly critical in games with a high time-to-kill (TTK)." />
                  <FAQItem q="2. How is tracking different from flicking?" a="Flicking requires rapid muscle memory snaps to hit a target and reset, while tracking requires continuous visual pursuit, direction change recognition, and smooth speed adjustment." />
                  <FAQItem q="3. How do I improve reactive tracking?" a="Improve reactive tracking by practicing against fast, unpredictable strafe speeds. Learn to read momentum changes without over-predicting or tensing your wrist." />
                  <FAQItem q="4. Why do I overtrack targets?" a="Overtracking happens when your crosshair moves faster than the target during a direction swap, which is often caused by predictive aiming or excessive mouse acceleration." />
                  <FAQItem q="5. What causes shaky aim?" a="Shaky aim is caused by excessive wrist tension, inappropriate mouse grip, or too high sensitivity. Smoothness aim drills help condition your hand to glide without micro-jitters." />
                  <FAQItem q="6. How much should I practice tracking?" a="We recommend practicing tracking for 10-15 minutes daily as a pre-game warmup routine to establish muscle memory consistency." />
                  <FAQItem q="7. Is tracking more important than flicking?" a="It depends on the game. Tracking is primary in high-TTK games (Apex Legends, Overwatch 2, The Finals), whereas flicking is more critical in tactical, low-TTK shooters (Valorant, CS2)." />
                  <FAQItem q="8. Can tracking improve Apex Legends aim?" a="Yes. Gunfights in Apex Legends require landing full automatic magazines on dodging enemies. Consistent tracking practice is the single best way to improve Apex aim." />
                  <FAQItem q="9. Can tracking improve Overwatch aim?" a="Absolutely. Trackers like Soldier: 76, Tracer, Zarya, and Sombra rely completely on smooth pursuit and direction change recognition to maximize their damage output." />
                  <FAQItem q="10. What is counter-strafe reading?" a="Counter-strafe reading is your neurological speed in registering when an enemy reverses their horizontal direction, allowing you to re-align your crosshair with minimal lag." />
                  <FAQItem q="11. What is aim smoothness?" a="Smoothness refers to moving your mouse at a constant, matching speed to the target without micro-corrections, jitters, or abrupt jerking movements." />
                  <FAQItem q="12. How do professional players train tracking?" a="Pros use specialized software aim trainers to practice isolating horizontal sweeps, vertical tracking, and reaction speed under variable speeds." />
                  <FAQItem q="13. What sensitivity is best for tracking?" a="A moderate-to-low sensitivity (e.g., 25cm to 45cm per 360 rotation) is generally best for tracking, as it provides enough physical space to make smooth micro-adjustments." />
                  <FAQItem q="14. Can this improve mouse control?" a="Yes. Keeping your crosshair on dodging targets forces your wrist and fingers to build subtle motor-control adjustments, optimizing mouse handling." />
                  <FAQItem q="15. How long does it take to improve tracking?" a="Most players notice improvements in crosshair smoothness and reaction time after 2 weeks of daily, focused 10-minute training sessions." />
                </div>
              </div>
            </div>
          </article>
        )}

        {!isFullscreen && (
          <section className="mt-14" aria-label="Explore related aim and response drills">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-5 rounded-full bg-green-500"></div>
              <h2 className="text-xs font-bold text-white uppercase tracking-widest font-mono">
                Explore FPS Drills
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <RelatedCard href="/drills/fps/180-degree-awareness" title="180° Awareness" desc="Situational awareness target acquisition flicks." color="indigo" icon={<Sliders className="w-4 h-4" />} />
              <RelatedCard href="/drills/fps/flick-shot-training" title="Pro Flick Trainer" desc="Snap to targets in time-attack mode." color="blue" icon={<Crosshair className="w-4 h-4" />} />
              <RelatedCard href="/drills/motor/hand-eye-coordination/aim-trainer" title="Aim Trainer Elite" desc="Hone spatial coordinate click speed." color="green" icon={<Target className="w-4 h-4" />} />
              <RelatedCard href="/drills/fps/recoil-control" title="Recoil Control" desc="Calibrate pulling pattern compensation." color="red" icon={<Activity className="w-4 h-4" />} />
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
                    <li><Link href="/drills/fps" className="text-green-500 hover:text-green-400 transition-colors font-bold">All FPS Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Memory</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/memory/working-memory/n-back" className="hover:text-green-400 transition-colors">3-Back Training</Link></li>
                    <li><Link href="/drills/memory/short-term-memory/color-sequence" className="hover:text-green-400 transition-colors">Color Sequence</Link></li>
                    <li><Link href="/drills/memory" className="text-green-500 hover:text-green-400 transition-colors font-bold">All Memory Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Cognitive</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/cognitive/memory/card-matching" className="hover:text-green-400 transition-colors">Memory Games</Link></li>
                    <li><Link href="/drills/cognitive/attention/divided-attention" className="hover:text-green-400 transition-colors">Attention Drills</Link></li>
                    <li><Link href="/drills/cognitive" className="text-green-500 hover:text-green-400 transition-colors font-bold">All Cognitive Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Academic</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/academic/writing-speed/typing-test" className="hover:text-green-400 transition-colors">Typing Speed Test</Link></li>
                    <li><Link href="/drills/academic/math-speed/mental-math" className="hover:text-green-400 transition-colors">Mental Math</Link></li>
                    <li><Link href="/drills/academic" className="text-green-500 hover:text-green-400 transition-colors font-bold">All Academic Drills →</Link></li>
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
                <p className="text-[9px] max-w-2xl mx-auto leading-relaxed mb-6 font-sans text-gray-500">
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
    indigo: 'from-indigo-500 to-purple-500'
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