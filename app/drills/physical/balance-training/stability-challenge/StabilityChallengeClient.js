'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';

import { 
  Activity, AlertCircle, ArrowRight, BarChart3, ChevronRight, 
  Crosshair, Eye, GraduationCap, Info, Lightbulb, 
  Maximize2, Minimize2, Play, RefreshCw, Target, 
  Timer, TrendingUp, Trophy, Volume2, VolumeX, Zap, 
  Share2, Calculator, CheckCircle2, Users,
  Move, XCircle, Sparkles, Flame, Star
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

  playSound(type) {
    if (!this.enabled || !this.ctx) return;
    try {
      if (this.ctx.state === 'suspended') this.ctx.resume();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.connect(gain); 
      gain.connect(this.ctx.destination);
      const n = this.ctx.currentTime;
      
      const f = { stable: 880, blowout: 150, levelup: 1046.5 }; 
      const gm = { stable: 0.05, blowout: 0.15, levelup: 0.1 }; 
      
      osc.type = type === 'blowout' ? 'sawtooth' : 'sine';
      osc.frequency.setValueAtTime(f[type] || 440, n); 
      if (type === 'blowout') {
        osc.frequency.exponentialRampToValueAtTime(50, n + 0.3);
      }
      gain.gain.setValueAtTime(gm[type] || 0.08, n); 
      gain.gain.exponentialRampToValueAtTime(0.001, n + (type === 'blowout' ? 0.3 : 0.15)); 
      
      osc.start(n); 
      osc.stop(n + 0.3);
    } catch (e) {}
  }

  setEnabled(status) {
    this.enabled = status;
  }
}

const audioSynth = typeof window !== 'undefined' ? new AudioSynthesizer() : null;
const DRILL_DURATION = 60; // Strict 60 seconds

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function StabilityChallengeClient() {
  // === UI & Viewport State ===
  const [gameState, setGameState] = useState('start'); 
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [pointerLocked, setPointerLocked] = useState(false);
  const [flashBg, setFlashBg] = useState(null);
  
  // === Settings State ===
  const [universalSens, setUniversalSens] = useState(1.0);

  // === Gameplay State ===
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(DRILL_DURATION);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [isNewBest, setIsNewBest] = useState(false);
  
  // Real-time HUD State
  const [stabilityMeter, setStabilityMeter] = useState(0);
  const [comboMultiplier, setComboMultiplier] = useState(1.0);

  // Analytics State
  const [analytics, setAnalytics] = useState({
    maxDifficulty: 1.0,
    longestStability: 0,
    bestCombo: 1.0,
    avgStability: 100,
    timeInsideZone: 0,
    blowouts: 0,
    peakForce: 0,
    perfectCenterTime: 0,
    rankData: { rank: 'Bronze', color: 'text-slate-500' },
    coachAdvice: ''
  });

  // === High-performance Mutable Refs ===
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  const pageRef = useRef(null);
  
  // === Game Logic Engine Refs ===
  const engine = useRef({
    crosshair: { x: 0, y: 0, initialized: false },
    force: { x: 0, y: 0, targetX: 0, targetY: 0 },
    
    timeLeft: DRILL_DURATION,
    score: 0,
    level: 1,
    stability: 0, // 0 to 100% meter
    
    // Combo & Timing
    currentStableTime: 0,
    totalStableTime: 0,
    maxStableTime: 0,
    totalTimeElapsed: 0,
    perfectCenterTime: 0,
    scoreTimer: 0,
    bestCombo: 1.0,
    blowouts: 0,
    
    // Wind Dynamics
    windChangeTimer: 0,
    maxDifficulty: 1.0,
    peakForce: 0,
    
    totalFrames: 0,
    screenShake: 0
  });

  const lastTimeRef = useRef(0);
  const isActiveRef = useRef(false);

  const cmPer360 = (30 / universalSens).toFixed(1);

  // === Initialization & Local Storage ===
  useEffect(() => {
    try {
      const savedSens = localStorage.getItem('stabilityChallenge_sens');
      if (savedSens) setUniversalSens(parseFloat(savedSens));
      const savedBest = localStorage.getItem('stabilityChallenge_bestScore');
      if (savedBest) setBestScore(parseInt(savedBest, 10));
    } catch (e) {}
  }, []);

  useEffect(() => {
    if (gameState !== 'playing') {
      try { localStorage.setItem('stabilityChallenge_sens', universalSens.toString()); } catch (e) {}
    }
    if (audioSynth) audioSynth.setEnabled(soundEnabled);
  }, [universalSens, gameState, soundEnabled]);

  // === End Game & Ingest Analytics ===
  const endGame = useCallback(() => {
    setGameState('gameOver');
    isActiveRef.current = false;
    if (document.pointerLockElement) document.exitPointerLock();
    
    const e = engine.current;
    
    const avgStab = e.totalTimeElapsed > 0 ? Math.floor((e.totalStableTime / e.totalTimeElapsed) * 100) : 0;
    
    // Rank logic matching the benchmark format
    let rank = 'Bronze'; let rankColor = 'text-slate-500';
    if (e.score >= 1200 && avgStab >= 90) { rank = 'Master'; rankColor = 'text-fuchsia-400'; }
    else if (e.score >= 800 && avgStab >= 82) { rank = 'Diamond'; rankColor = 'text-cyan-400'; }
    else if (e.score >= 500 && avgStab >= 75) { rank = 'Platinum'; rankColor = 'text-indigo-400'; }
    else if (e.score >= 250 && avgStab >= 65) { rank = 'Gold'; rankColor = 'text-yellow-400'; }
    else if (e.score >= 100) { rank = 'Silver'; rankColor = 'text-gray-300'; }

    let advice = 'Excellent gravitational resistance! You maintained incredible center-lock stability despite the chaotic force scaling. Keep pushing your limits.';
    if (e.blowouts > 3) {
      advice = 'High blowout count detected. You are letting the force vector build up too much momentum. Watch the wind arrow in the center and gently pull against it before your cursor is thrown out.';
    } else if (e.maxStableTime < 5) {
      advice = 'You are struggling to maintain continuous locks. A lower Universal Sens may grant you the physical friction needed to resist the simulated wind. Avoid jerky overcorrections.';
    } else if (avgStab < 60) {
      advice = 'Your average stability is low. The wind utilizes momentum and turbulence. Watch the force arrow and smoothly anticipate the drag rather than reacting only when you get pushed out.';
    }

    setAnalytics({
      maxDifficulty: parseFloat(e.maxDifficulty.toFixed(1)),
      longestStability: parseFloat(e.maxStableTime.toFixed(1)),
      bestCombo: e.bestCombo,
      avgStability: avgStab,
      timeInsideZone: Math.floor(e.totalStableTime),
      blowouts: e.blowouts,
      peakForce: Math.floor(e.peakForce),
      perfectCenterTime: Math.floor(e.perfectCenterTime),
      rankData: { rank, color: rankColor },
      coachAdvice: advice
    });

    setBestScore(prev => {
      if (e.score > prev) {
        setIsNewBest(true);
        try { localStorage.setItem('stabilityChallenge_bestScore', e.score.toString()); } catch(err){}
        return e.score;
      }
      return prev;
    });
  }, []);

  const startGame = useCallback(async () => {
    if (audioSynth) audioSynth.init(); 

    setIsNewBest(false);
    setScore(0);
    setStabilityMeter(0);
    setComboMultiplier(1.0);
    setCurrentLevel(1);
    setGameState('playing');
    
    const e = engine.current;
    e.score = 0;
    e.level = 1;
    e.stability = 0;
    
    e.currentStableTime = 0;
    e.totalStableTime = 0;
    e.maxStableTime = 0;
    e.totalTimeElapsed = 0;
    e.perfectCenterTime = 0;
    e.scoreTimer = 0;
    e.bestCombo = 1.0;
    e.blowouts = 0;
    
    e.windChangeTimer = 0;
    e.maxDifficulty = 1.0;
    e.peakForce = 0;
    
    e.totalFrames = 0;
    e.screenShake = 0;
    e.force = { x: 0, y: 0, targetX: 0, targetY: 0 };
    
    e.timeLeft = DRILL_DURATION; 
    setTimeLeft(DRILL_DURATION);
    
    lastTimeRef.current = performance.now();
    isActiveRef.current = true;
    e.crosshair.initialized = false;

    try {
      if (containerRef.current && !document.fullscreenElement) {
        await containerRef.current.requestFullscreen();
      }
    } catch(err) {}

    setTimeout(() => {
      if (canvasRef.current && !document.pointerLockElement) {
        canvasRef.current.requestPointerLock().catch(()=>{});
        e.crosshair.x = canvasRef.current.width / 2;
        e.crosshair.y = canvasRef.current.height / 2;
        e.crosshair.initialized = true;
      }
    }, 150);
  }, []);

  // === Mouse Input Listeners ===
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
      eRef.crosshair.x = Math.max(0, Math.min(cvs.width, eRef.crosshair.x + dx));
      eRef.crosshair.y = Math.max(0, Math.min(cvs.height, eRef.crosshair.y + dy));
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
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

  // === Native Physics & Render Loop ===
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
          }
        }
      }
    });
    resizeObserver.observe(container);

    lastTimeRef.current = performance.now();

    const loop = (time) => {
      const deltaTimeMs = time - lastTimeRef.current;
      lastTimeRef.current = time; 
      const dt = Math.min(deltaTimeMs / 1000, 0.033); 
      const e = engine.current;

      const cx = cvs.width / 2;
      const cy = cvs.height / 2;

      if (gameState === 'playing' && pointerLocked && isActiveRef.current) {
        
        // Strict 60s countdown
        e.timeLeft -= dt;
        e.totalTimeElapsed += dt;
        
        if (e.timeLeft <= 0) {
          e.timeLeft = 0;
          endGame();
        }

        e.totalFrames++;

        // Calculate Level based on Score (Level +1 every 100 score)
        const newLevel = Math.floor(e.score / 100) + 1;
        if (newLevel > e.level) {
          e.level = newLevel;
          if (audioSynth) audioSynth.playSound('levelup');
        }

        // ==========================================
        // DYNAMIC WIND PHYSICS
        // ==========================================
        const baseForce = 80 + (e.level * 40);
        const directionInterval = Math.max(0.6, 2.0 - (e.level * 0.15));
        
        e.windChangeTimer += dt;
        if (e.windChangeTimer >= directionInterval) {
          e.windChangeTimer = 0;
          e.force.targetX = (Math.random() - 0.5) * 2 * baseForce;
          e.force.targetY = (Math.random() - 0.5) * 2 * baseForce;
        }

        // Interpolate momentum
        e.force.x += (e.force.targetX - e.force.x) * 2 * dt;
        e.force.y += (e.force.targetY - e.force.y) * 2 * dt;

        // Apply Micro-Vibrations (Turbulence)
        const turbulence = e.level * 8;
        e.force.x += (Math.random() - 0.5) * turbulence;
        e.force.y += (Math.random() - 0.5) * turbulence;
        
        const currentForceMagnitude = Math.hypot(e.force.x, e.force.y);
        if (currentForceMagnitude > e.peakForce) e.peakForce = currentForceMagnitude;

        // Apply force to crosshair
        e.crosshair.x += e.force.x * dt;
        e.crosshair.y += e.force.y * dt;

        // Clamp to screen bounds
        e.crosshair.x = Math.max(0, Math.min(cvs.width, e.crosshair.x));
        e.crosshair.y = Math.max(0, Math.min(cvs.height, e.crosshair.y));

        const dist = Math.hypot(e.crosshair.x - cx, e.crosshair.y - cy);

        // ==========================================
        // SCORING & COMBO SYSTEM
        // ==========================================
        if (dist < 15) { // Inside Safe Zone
          e.currentStableTime += dt;
          e.totalStableTime += dt;
          if (dist < 5) e.perfectCenterTime += dt;
          
          if (e.currentStableTime > e.maxStableTime) e.maxStableTime = e.currentStableTime;
          
          e.stability += dt * 30; 
          if (e.stability > 100) e.stability = 100;
          
          e.scoreTimer += dt;
          
          // Determine Combo Multiplier
          let multi = 1.0;
          if (e.currentStableTime >= 20) multi = 2.0;
          else if (e.currentStableTime >= 15) multi = 1.5;
          else if (e.currentStableTime >= 10) multi = 1.3;
          else if (e.currentStableTime >= 5) multi = 1.1;
          
          if (multi > e.bestCombo) e.bestCombo = multi;
          setComboMultiplier(multi);

          // Every 1 full second
          if (e.scoreTimer >= 1.0) {
            e.score += Math.floor(10 * multi);
            e.scoreTimer -= 1.0;
            if (audioSynth) audioSynth.playSound('stable');
          }
        } else { 
          // Outside Safe Zone - Resets Combo & Stability
          e.stability -= dt * 50; 
          if (e.stability < 0) e.stability = 0;
          
          e.currentStableTime = 0;
          e.scoreTimer = 0;
          setComboMultiplier(1.0);

          // BLOWOUT: Let player recover
          if (dist > 300) {
            e.blowouts++;
            e.crosshair.x = cx;
            e.crosshair.y = cy;
            e.force.x = 0; 
            e.force.y = 0;
            e.windChangeTimer = 0;
            
            e.screenShake = 15;
            if (audioSynth) audioSynth.playSound('blowout');
            
            setFlashBg('red');
            setTimeout(() => setFlashBg(null), 100);
          }
        }

        if (e.level > e.maxDifficulty) e.maxDifficulty = e.level;

        // Throttle UI Sync
        if (e.totalFrames % 4 === 0) {
          setTimeLeft(e.timeLeft);
          setScore(e.score);
          setStabilityMeter(Math.floor(e.stability));
          setCurrentLevel(e.level);
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

      ctx.fillStyle = '#050508';
      ctx.fillRect(0, 0, cvs.width, cvs.height);

      // Environment Grid
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.04)'; 
      ctx.lineWidth = 1; 
      for(let i = 0; i < cvs.width; i+= 50) { 
        ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, cvs.height); ctx.stroke(); 
        ctx.moveTo(0, i); ctx.lineTo(cvs.width, i); ctx.stroke();
      }

      const ch = e.crosshair; 
      const dist = Math.hypot(ch.x - cx, ch.y - cy); 
      const isStable = dist < 15;

      // Draw Center Safe Zone
      ctx.beginPath(); 
      ctx.arc(cx, cy, 15, 0, Math.PI * 2); 
      ctx.strokeStyle = isStable ? "#ffffff" : "#334155"; 
      ctx.lineWidth = 2; 
      ctx.stroke(); 
      
      ctx.beginPath(); 
      ctx.arc(cx, cy, 8, 0, Math.PI * 2); 
      ctx.fillStyle = isStable ? "rgba(0, 255, 136, 0.2)" : "transparent"; 
      ctx.fill();

      // Draw Wind / Force Arrow
      if (e.force.x !== 0 || e.force.y !== 0) { 
        ctx.beginPath(); 
        ctx.moveTo(cx, cy); 
        ctx.lineTo(cx + e.force.x * 0.1, cy + e.force.y * 0.1); 
        ctx.strokeStyle = "rgba(255,255,255,0.08)"; 
        ctx.lineWidth = 2; 
        ctx.stroke(); 
        
        // Arrow head
        const arrowAngle = Math.atan2(e.force.y, e.force.x); 
        const arrowX = cx + e.force.x * 0.1; 
        const arrowY = cy + e.force.y * 0.1; 
        ctx.beginPath(); 
        ctx.moveTo(arrowX, arrowY); 
        ctx.lineTo(arrowX - Math.cos(arrowAngle - 0.8) * 10, arrowY - Math.sin(arrowAngle - 0.8) * 10); 
        ctx.lineTo(arrowX - Math.cos(arrowAngle + 0.8) * 10, arrowY - Math.sin(arrowAngle + 0.8) * 10); 
        ctx.closePath(); 
        ctx.fillStyle = "rgba(255,255,255,0.15)"; 
        ctx.fill(); 
      }

      // Draw Crosshair
      if (ch.initialized && (gameState === 'playing' || gameState === 'start')) {
        const activeColor = pointerLocked ? (isStable ? '#00ff88' : 'rgba(255,255,255,0.6)') : '#ef4444';
        ctx.strokeStyle = activeColor;
        ctx.fillStyle = activeColor;
        
        ctx.lineWidth = 2;
        ctx.beginPath(); ctx.arc(ch.x, ch.y, 12, 0, Math.PI * 2); ctx.stroke();

        ctx.lineWidth = 1.5;
        const gap = 6;
        ctx.beginPath();
        ctx.moveTo(ch.x, ch.y - 16); ctx.lineTo(ch.x, ch.y - gap);
        ctx.moveTo(ch.x, ch.y + 16); ctx.lineTo(ch.x, ch.y + gap);
        ctx.moveTo(ch.x - 16, ch.y); ctx.lineTo(ch.x - gap, ch.y);
        ctx.moveTo(ch.x + 16, ch.y); ctx.lineTo(ch.x + gap, ch.y);
        ctx.stroke();
        
        ctx.beginPath(); ctx.arc(ch.x, ch.y, 3, 0, Math.PI * 2); ctx.fill();
      }

      ctx.restore();
      animationRef.current = requestAnimationFrame(loop);
    };

    animationRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animationRef.current);
      resizeObserver.disconnect();
    };
  }, [gameState, pointerLocked, endGame]);

  const shareScore = useCallback(async () => {
    const text = `🎯 I reached Level ${currentLevel} and scored ${score} PTS on the Cursor Stability Test! Avg Stability: ${analytics.avgStability}%. Test your mouse control at skilldrills.online!`;
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({ title: 'My Stability Score', text, url: 'https://skilldrills.online/drills/physical/balance-training/stability-challenge' });
      } catch (e) {}
    } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      alert('Score card copied to clipboard!');
    }
  }, [score, currentLevel, analytics]);

  return (
    <div ref={pageRef} className="min-h-screen select-none bg-[#050508] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        {!isFullscreen && (
          <div className="mb-6">
            <nav className="mb-4">
              <ol className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
                <li><Link href="/" className="hover:text-gray-300">Home</Link></li>
                <li><ChevronRight className="w-4 h-4 text-gray-600" /></li>
                <li><Link href="/drills/physical" className="hover:text-gray-300">Physical</Link></li>
                <li><ChevronRight className="w-4 h-4 text-gray-600" /></li>
                <li className="text-indigo-400 font-medium">Balance Test Online</li>
              </ol>
            </nav>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-xl shadow-[0_0_20px_rgba(99,102,241,0.3)]">
                  <Move className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Balance Test Online - Cursor Stability</h1>
                  <p className="text-sm text-gray-400 mt-1 font-medium">Desktop Exclusive • Mouse Control Game</p>
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
        {!isFullscreen && (
          <div className="grid grid-cols-4 lg:grid-cols-7 gap-2 mb-2">
            <StatCard icon={<Trophy className="text-indigo-400" />} value={score} label="Score" />
            <StatCard icon={<Timer className={timeLeft <= 10 ? 'text-red-400 animate-pulse' : 'text-emerald-400'} />} value={Math.max(0, timeLeft).toFixed(1)} label="Time" unit="s" />
            <StatCard icon={<TrendingUp className="text-orange-400" />} value={`Lv. ${currentLevel}`} label="Level" />
            <StatCard icon={<Flame className="text-rose-400" />} value={`${comboMultiplier}x`} label="Combo" />
            <StatCard icon={<Activity className="text-violet-400" />} value={stabilityMeter} label="Stability" unit="%" />
            <StatCard icon={<Info className="text-gray-400" />} value={`${universalSens.toFixed(2)}x`} label="Sens" />
            <StatCard icon={<Star className="text-yellow-500" />} value={bestScore} label="Best Score" />
          </div>
        )}

        {/* Engine Container */}
        <div 
          ref={containerRef} 
          className={`relative overflow-hidden transition-colors outline-none bg-[#05060b] ${
            isFullscreen ? 'w-full h-full' : 'w-full aspect-video min-h-[500px] rounded-2xl border border-gray-800 shadow-2xl'
          }`}
          style={{ backgroundColor: flashBg === 'red' ? '#450a0a' : '#05060b' }}
        >
          {/* Progress Bar (Max 60s) */}
          {gameState === 'playing' && (
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gray-900 z-[60]">
              <div 
                className={`h-full transition-all duration-100 ease-linear ${timeLeft <= 10 ? 'bg-red-500 animate-pulse' : 'bg-indigo-500'}`}
                style={{ width: `${Math.min(100, (timeLeft / DRILL_DURATION) * 100)}%` }} 
              />
            </div>
          )}

          {/* Fullscreen Overlay Controls */}
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
                    <p className="text-[10px] text-orange-400 font-bold uppercase tracking-widest">Level</p>
                    <p className="text-2xl font-black text-orange-400 leading-none">{currentLevel}</p>
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
                <AlertCircle className="w-12 h-12 text-indigo-500 mx-auto mb-4" />
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
                  Cursor Stability Test
                </h2>
                <p className="text-xs text-slate-500 uppercase tracking-widest mb-6">
                  Fine Motor Skills • 60-Second Challenge
                </p>

                <div className="grid grid-cols-2 gap-3 mb-6 text-left">
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Objective</span>
                    <span className="text-sm font-black text-white">Resist Force</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Reward</span>
                    <span className="text-sm font-black text-green-400">+10 PTS</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Combo</span>
                    <span className="text-sm font-black text-orange-400">Up to 2.0x</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Mechanic</span>
                    <span className="text-sm font-black text-indigo-400">Score Scales Wind</span>
                  </div>
                </div>

                <div className="bg-[#0b0f19] border border-slate-850 p-4 rounded-xl mb-4 text-left text-xs text-slate-400">
                  <span className="text-xs font-bold text-white block uppercase mb-1 flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-indigo-500" /> What this trains
                  </span>
                  <ul className="list-disc pl-4 space-y-1 text-[10px] text-slate-500 leading-relaxed">
                    <li>Mouse control precision and fine motor stability</li>
                    <li>Adaptive reaction control against momentum shifts</li>
                    <li>Building long combo chains under scaling turbulence</li>
                  </ul>
                </div>

                <div className="bg-[#0b0f19] border border-slate-850 p-4 rounded-xl mb-6 text-left text-xs text-slate-400">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-white uppercase mb-3">
                    <Crosshair className="w-3.5 h-3.5 text-blue-500" /> Universal Sens
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-indigo-400 font-mono text-sm font-bold">{universalSens.toFixed(2)}x</span>
                    <span className="text-[10px] text-slate-500">Approx: {cmPer360} cm/360</span>
                  </div>
                  <input 
                    type="range" min="0.1" max="3.0" step="0.05" 
                    value={universalSens} 
                    onChange={(e) => setUniversalSens(parseFloat(e.target.value))} 
                    className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500" 
                  />
                </div>

                <button
                  onClick={startGame}
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg uppercase tracking-widest transition-all duration-200 active:scale-95"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  Begin Balance Test
                </button>
              </div>
            </div>
          )}

          {/* GAME OVER DASHBOARD */}
          {gameState === 'gameOver' && analytics.rankData && (
            <div className="absolute inset-0 bg-[#05070e]/98 flex flex-col items-center justify-center p-6 z-30 select-none overflow-y-auto max-h-[100vh] backdrop-blur-sm">
              <div className="max-w-xl w-full text-center">
                {isNewBest && (
                  <div className="inline-block bg-yellow-500 text-black text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-3 shadow-[0_0_15px_rgba(234,179,8,0.5)] animate-bounce">
                    ⭐ NEW PERSONAL BEST!
                  </div>
                )}
                
                <h2 className="text-xl font-black text-white uppercase tracking-wider mb-1">
                  Stability Analysis Complete
                </h2>
                <p className="text-xs text-slate-500 uppercase tracking-widest mb-6">
                  Peak Speed Level: Level {currentLevel}
                </p>

                {/* 3x3 Telemetry Grid */}
                <div className="grid grid-cols-3 gap-2.5 mb-6 text-left">
                  <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
                    <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Final Score</span>
                    <span className="text-base font-black text-white">{score}</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
                    <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Avg Stability</span>
                    <span className="text-base font-black text-white">{analytics.avgStability}%</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
                    <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Best Combo</span>
                    <span className="text-base font-black text-rose-400">{analytics.bestCombo}x</span>
                  </div>
                  
                  <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
                    <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Longest Hold</span>
                    <span className="text-base font-black text-emerald-400">{analytics.longestStability}s</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
                    <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Time In Zone</span>
                    <span className="text-base font-black text-blue-400">{analytics.timeInsideZone}s</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
                    <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Blowouts</span>
                    <span className="text-base font-black text-red-400">{analytics.blowouts}</span>
                  </div>

                  <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
                    <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Max Difficulty</span>
                    <span className="text-base font-black text-orange-400">Lv. {analytics.maxDifficulty}</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
                    <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Peak Force Resisted</span>
                    <span className="text-base font-black text-indigo-400">{analytics.peakForce} N</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
                    <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Perfect Centering</span>
                    <span className="text-base font-black text-teal-400">{analytics.perfectCenterTime}s</span>
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
                    {analytics.coachAdvice}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={startGame}
                    className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg uppercase tracking-widest transition-all duration-200 active:scale-95"
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

        {/* Rules Section */}
        {!isFullscreen && (
          <section className="mt-10">
            <div className="rounded-2xl border border-gray-800 overflow-hidden bg-gray-900 shadow-2xl pointer-events-none">
              <div className="px-6 py-5 border-b border-gray-800 bg-black/40 flex items-center gap-3">
                <Info className="w-5 h-5 text-indigo-400" /><h2 className="font-bold text-white text-lg tracking-wide">Progression & Scoring Rules</h2>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-5">
                  <RuleItem num="1" color="green" text="Stable Center" highlight="+10 PTS" result="Every 1s perfectly centered" />
                  <RuleItem num="2" color="orange" text="Combo System" highlight="Up to 2.0x Multiplier" result="Hold center to scale points" />
                </div>
                <div className="space-y-5">
                  <RuleItem num="3" color="purple" text="Adaptive Difficulty" highlight="Level Up" result="Every 100 PTS increases wind chaos" />
                  <RuleItem num="4" color="blue" text="60-Second Drill" highlight="No Deductions" result="Clock strictly counts down" />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ============================================================ */}
        {/* ABOUT THIS DRILL */}
        {/* ============================================================ */}
        {!isFullscreen && (
          <section className="mt-12" aria-label="About this drill">
            <div className="rounded-2xl border border-gray-800 overflow-hidden bg-gray-900 shadow-xl">
              <div className="px-6 py-5 border-b border-gray-800 bg-black/40 flex items-center gap-3">
                <GraduationCap className="w-5 h-5 text-indigo-400" />
                <h2 className="font-bold text-white text-lg tracking-wide">About the Cursor Stability Test</h2>
              </div>
              <div className="p-8">
                <p className="text-sm leading-relaxed mb-6 text-gray-300">
                  Take the ultimate online balance test by challenging your mouse control against dynamic simulated wind forces. This cursor stability game tests your fine motor skills and hand-eye coordination by forcing you to maintain a strict center lock over exactly 60 seconds. The adaptive difficulty constantly increases, creating a pure mechanical challenge.
                </p>

                {/* Grid Section */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center"><Users className="w-4 h-4 text-white" /></div>
                      <h3 className="text-sm font-bold text-white">Who It's For</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Gamers improving FPS mouse control, users training fine motor skills, and anyone seeking a high-score stability challenge.</p>
                  </div>
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-green-600 flex items-center justify-center"><TrendingUp className="w-4 h-4 text-white" /></div>
                      <h3 className="text-sm font-bold text-white">Skills Improved</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Motor coordination, cursor stability, reaction control, mouse precision, and physical balance alignment.</p>
                  </div>
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center"><BarChart3 className="w-4 h-4 text-white" /></div>
                      <h3 className="text-sm font-bold text-white">What You'll Track</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Total score, maximum combo multiplier, longest sustained stability sequence, and peak difficulty level.</p>
                  </div>
                </div>

                {/* How to Play & Scoring */}
                <div className="mb-8 bg-[#0b0f19]/40 border border-gray-800 rounded-xl p-6">
                  <h3 className="text-base font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Target className="w-5 h-5 text-indigo-500" /> How to Play & Scoring
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-6 text-sm text-gray-300">
                    <ol className="space-y-3 list-decimal pl-5">
                      <li>Click <strong>Begin Balance Test</strong> to lock your mouse inside the game.</li>
                      <li>Watch the directional arrow in the center to anticipate the wind vector.</li>
                      <li>Physically pull your mouse in the opposite direction to resist the force and stay strictly centered.</li>
                    </ol>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> <span className="text-white font-bold">Stable Center:</span> Holding center for 1.0s grants +10 PTS.</li>
                      <li className="flex items-center gap-2"><Flame className="w-4 h-4 text-orange-500" /> <span className="text-white font-bold">Combo Multiplier:</span> Sustained holds scale points up to 2.0x automatically.</li>
                    </ul>
                  </div>
                </div>

                {/* FAQ Section Expanded to 15 robust SEO FAQs */}
                <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                  <div className="flex items-center gap-3 mb-4">
                    <Lightbulb className="w-5 h-5 text-yellow-400" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">Frequently Asked Questions</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FAQItem 
                      q="What is a cursor stability test?" 
                      a="A cursor stability test is an interactive digital assessment that measures your ability to maintain precise mouse control against chaotic, simulated forces, testing your visual-motor pathways." 
                    />
                    <FAQItem 
                      q="Does this improve mouse control for gaming?" 
                      a="Yes, by demanding smooth resistance over jittery corrections, it actively trains the fine motor precision required for high-level FPS mouse control." 
                    />
                    <FAQItem 
                      q="Can this improve my FPS aim?" 
                      a="Absolutely. It isolates the micro-adjustments needed for precise tracking and recoil control, which translates directly to maintaining crosshair placement in games like Valorant and Apex Legends." 
                    />
                    <FAQItem 
                      q="How does the adaptive difficulty work?" 
                      a="Every time you score 100 points, your Level increases. Higher levels introduce stronger wind acceleration, violent momentum shifts, random gusts, and intense turbulence." 
                    />
                    <FAQItem 
                      q="How is my balance score calculated?" 
                      a="You earn +10 points for every full second perfectly centered. Staying stable continuously builds a combo multiplier up to 2.0x. Leaving the safe zone breaks the combo." 
                    />
                    <FAQItem 
                      q="Is this hand eye coordination game suitable for beginners?" 
                      a="Yes! The drill starts at Level 1 with minimal wind drag, allowing beginners to easily build combos before the chaotic momentum naturally scales up." 
                    />
                    <FAQItem 
                      q="How do professional gamers train tracking accuracy?" 
                      a="Pros use dedicated aim trainers and browser drills to isolate their tracking mechanics, practicing smooth, non-jittery mouse paths to eliminate overcorrection and build a consistent visual-motor link." 
                    />
                    <FAQItem 
                      q="What is fine motor control in gaming?" 
                      a="Fine motor control is the ability to make millimeter-perfect adjustments with your mouse hand without tensing your wrist or over-flicking past your target." 
                    />
                    <FAQItem 
                      q="How long should I practice mouse stability daily?" 
                      a="For optimal cognitive adaptation, practicing this drill for 5 to 10 minutes a day is more effective than occasional hour-long sessions." 
                    />
                    <FAQItem 
                      q="Is this balance game free to play?" 
                      a="Yes! The SkillDrills Balance Test is entirely free, open-source, and runs purely in your web browser with zero downloads required." 
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* RELATED DRILLS SECTION */}
        {!isFullscreen && (
          <section className="mt-14" aria-label="Explore related aim and response drills">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-5 rounded-full bg-indigo-500"></div>
              <h2 className="text-xs font-bold text-white uppercase tracking-widest font-mono">
                Explore Related Drills
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <RelatedCard href="/drills/motor/hand-eye-coordination/aim-trainer" title="Aim Trainer" desc="Hone spatial coordinate click speed." color="green" icon={<Target className="w-4 h-4" />} />
              <RelatedCard href="/drills/fps/flick-shot-training" title="Pro Flick Trainer" desc="Snap to targets in time-attack mode." color="blue" icon={<Crosshair className="w-4 h-4" />} />
              <RelatedCard href="/drills/fps/180-degree-awareness" title="180° Awareness" desc="Alternate snapping opposite horizons." color="orange" icon={<Zap className="w-4 h-4" />} />
              <RelatedCard href="/drills/physical/balance-training/dynamic-balance" title="Dynamic Balance" desc="Cursor tracking training game." color="red" icon={<Activity className="w-4 h-4" />} />
            </div>
          </section>
        )}

        {/* FOOTER SECTION */}
        {!isFullscreen && (
          <footer className="mt-12 bg-slate-950/40 border border-slate-900 text-slate-500 rounded-xl py-10 px-6 font-mono text-[10px]" role="contentinfo">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 mb-8">
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Motor & FPS</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/motor/hand-eye-coordination/aim-trainer" className="hover:text-indigo-400 transition-colors">Aim Trainer Elite</Link></li>
                    <li><Link href="/drills/fps/flick-shot-training" className="hover:text-indigo-400 transition-colors">Flick Shot Trainer</Link></li>
                    <li><Link href="/drills/fps" className="text-indigo-450 hover:text-indigo-400 transition-colors font-bold">All FPS Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Memory</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/memory/working-memory/n-back" className="hover:text-indigo-400 transition-colors">3-Back Training</Link></li>
                    <li><Link href="/drills/memory/short-term-memory/color-sequence" className="hover:text-indigo-400 transition-colors">Color Sequence</Link></li>
                    <li><Link href="/drills/memory" className="text-indigo-450 hover:text-indigo-400 transition-colors font-bold">All Memory Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Cognitive</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/cognitive/memory/card-matching" className="hover:text-indigo-400 transition-colors">Memory Games</Link></li>
                    <li><Link href="/drills/cognitive/attention/divided-attention" className="hover:text-indigo-400 transition-colors">Attention Drills</Link></li>
                    <li><Link href="/drills/cognitive" className="text-indigo-450 hover:text-indigo-400 transition-colors font-bold">All Cognitive Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Academic</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/academic/writing-speed/typing-test" className="hover:text-indigo-400 transition-colors">Typing Speed Test</Link></li>
                    <li><Link href="/drills/academic/math-speed/mental-math" className="hover:text-indigo-400 transition-colors">Mental Math</Link></li>
                    <li><Link href="/drills/academic" className="text-indigo-450 hover:text-indigo-400 transition-colors font-bold">All Academic Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">More Sectors</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/visual" className="hover:text-indigo-400 transition-colors">Visual</Link></li>
                    <li><Link href="/drills/physical" className="hover:text-indigo-400 transition-colors">Physical</Link></li>
                  </ul>
                </div>
              </div>
              
              <div className="border-t border-slate-900 pt-8 text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="w-6 h-6 bg-gradient-to-br from-indigo-500/25 to-violet-500/25 border border-indigo-500/30 rounded-lg flex items-center justify-center">
                    <Crosshair className="w-3.5 h-3.5 text-indigo-400" />
                  </div>
                  <span className="text-white font-black tracking-widest text-xs uppercase">SkillDrills</span>
                </div>
                <p className="text-[9px] mb-2">&copy; {new Date().getFullYear()} SkillDrills. All rights reserved.</p>
                <p className="text-[9px] max-w-2xl mx-auto leading-relaxed mb-6 font-sans text-gray-500">
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

function StatCard({ icon, value, label, unit = '' }) {
  return (
    <div className="group rounded-xl border border-slate-900 bg-slate-950/40 p-2 text-center flex flex-col justify-center h-full transition-all duration-300 hover:scale-[1.03] hover:border-slate-800">
      <div className="mb-1 flex justify-center transition-transform duration-300 group-hover:scale-110">
        {icon}
      </div>
      <p className="text-xs sm:text-sm font-extrabold tracking-tight truncate text-white">
        {value} <span className="text-[10px] font-semibold text-slate-400">{unit}</span>
      </p>
      <p className="text-[9px] font-mono font-bold uppercase tracking-wider text-slate-500 truncate">{label}</p>
    </div>
  );
}

function RuleItem({ num, color, text, highlight = '', result }) {
  const colorMap = { 
    blue: 'bg-blue-600 text-blue-300 border-blue-500', 
    indigo: 'bg-indigo-600 text-indigo-300 border-indigo-500', 
    red: 'bg-red-600 text-red-300 border-red-500', 
    orange: 'bg-orange-600 text-orange-300 border-orange-500',
    purple: 'bg-purple-600 text-purple-300 border-purple-500',
    cyan: 'bg-cyan-600 text-cyan-300 border-cyan-500',
    green: 'bg-green-600 text-green-300 border-green-500' 
  };
  const colors = colorMap[color] || 'bg-slate-600 text-slate-300 border-slate-500';
  const [bg, txt, border] = colors.split(' ');
  
  return (
    <div className="flex items-center gap-4 bg-[#0b0f19]/40 p-4 rounded-xl border border-slate-800 shadow-sm">
      <div className={`w-8 h-8 rounded-xl ${bg} border border-t-white/20 flex items-center justify-center text-white text-base font-black shadow-lg flex-shrink-0`}>{num}</div>
      <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <p className="text-sm font-medium text-slate-300">
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
    purple: 'from-purple-500 to-violet-500',
    green: 'from-green-500 to-emerald-500',
    cyan: 'from-cyan-500 to-blue-500',
    indigo: 'from-indigo-500 to-purple-500',
    rose: 'from-rose-500 to-pink-500'
  };
  return (
    <Link href={href} className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-[#0b0f19]/40 transition-all hover:-translate-y-1 hover:border-indigo-500/50 block p-5">
      <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${gradients[color] || 'from-indigo-500 to-violet-500'}`}></div>
      <div className="w-10 h-10 rounded-xl bg-[#050811] border border-slate-700 flex items-center justify-center text-slate-400 group-hover:text-white mb-3 shadow-inner">
        {icon}
      </div>
      <h3 className="font-bold text-base mb-1.5 text-white group-hover:text-indigo-400 transition-colors">{title}</h3>
      <p className="text-xs text-slate-500 mb-4">{desc}</p>
      <div className="flex items-center gap-1.5 text-indigo-400 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-wider">
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