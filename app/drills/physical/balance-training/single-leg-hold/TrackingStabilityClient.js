'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';

import { 
  Activity, AlertCircle, ArrowRight, BarChart3, ChevronRight, 
  Crosshair, Eye, GraduationCap, Info, Lightbulb, 
  Maximize2, Minimize2, Play, RefreshCw, Target, 
  Timer, TrendingUp, Trophy, Volume2, VolumeX, Zap, 
  Share2, Calculator, CheckCircle2, Users,
  Move, Link as LinkIcon, XCircle, Sparkles
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
      
      const f = { focus: 880, break: 440, streak: 1046.5, penalty: 330 }; 
      const gm = { focus: 0.08, break: 0.08, streak: 0.1, penalty: 0.12 }; 
      
      osc.frequency.setValueAtTime(f[type] || 440, n); 
      gain.gain.setValueAtTime(gm[type] || 0.08, n); 
      gain.gain.exponentialRampToValueAtTime(0.001, n + 0.15); 
      
      osc.start(n); 
      osc.stop(n + 0.15);
    } catch (e) {}
  }

  setEnabled(status) {
    this.enabled = status;
  }
}

const audioSynth = typeof window !== 'undefined' ? new AudioSynthesizer() : null;

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function TrackingStabilityClient() {
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
  const [timeLeft, setTimeLeft] = useState(30);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [isNewBest, setIsNewBest] = useState(false);
  
  // Real-time HUD State
  const [linkStability, setLinkStability] = useState(100);
  const [streak, setStreak] = useState(0);
  const [mistakes, setMistakes] = useState(0);

  // Analytics State
  const [analytics, setAnalytics] = useState({
    stability: 100,
    mistakes: 0,
    maxStreak: 0,
    timeSurvived: 0,
    rankData: { rank: 'Beginner', color: 'text-slate-500' },
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
    anchor: { x: 0, y: 0, vx: 180, vy: 180 },
    
    score: 0,
    level: 1,
    timeLeft: 30,
    streak: 0,
    bestStreak: 0,
    mistakes: 0,
    
    opticalFlow: 0,
    totalFrames: 0,
    focusFrames: 0,
    
    connectedTimer: 0,
    disconnectedTimer: 0,
    totalTimeElapsed: 0
  });

  const lastTimeRef = useRef(0);
  const isActiveRef = useRef(false);

  const cmPer360 = (30 / universalSens).toFixed(1);

  // === Initialization & Local Storage ===
  useEffect(() => {
    try {
      const savedSens = localStorage.getItem('trackingStability_sens');
      if (savedSens) setUniversalSens(parseFloat(savedSens));
      const savedBest = localStorage.getItem('trackingStability_bestScore');
      if (savedBest) setBestScore(parseInt(savedBest, 10));
    } catch (e) {}
  }, []);

  useEffect(() => {
    if (gameState !== 'playing') {
      try { localStorage.setItem('trackingStability_sens', universalSens.toString()); } catch (e) {}
    }
    if (audioSynth) audioSynth.setEnabled(soundEnabled);
  }, [universalSens, gameState, soundEnabled]);

  // === End Game & Ingest Analytics ===
  const endGame = useCallback(() => {
    setGameState('gameOver');
    isActiveRef.current = false;
    if (document.pointerLockElement) document.exitPointerLock();
    
    const e = engine.current;
    
    const finalStability = e.totalFrames > 0 ? Math.floor((e.focusFrames / e.totalFrames) * 100) : 100;
    
    let rank = 'Beginner';
    let rankColor = 'text-gray-400';
    
    if (e.score >= 120 && finalStability >= 85) {
      rank = 'Elite'; rankColor = 'text-fuchsia-400';
    } else if (e.score >= 80 && finalStability >= 75) {
      rank = 'Advanced'; rankColor = 'text-purple-400';
    } else if (e.score >= 40 && finalStability >= 60) {
      rank = 'Intermediate'; rankColor = 'text-blue-400';
    } else if (e.score >= 15) {
      rank = 'Novice'; rankColor = 'text-green-400';
    }

    let advice = 'Excellent dynamic tracking! You navigated the high-speed anchors smoothly and maximized your survival time. Keep pushing your limits.';
    if (finalStability < 50) {
      advice = 'Your link stability is very low. The target uses chaotic velocity scaling. Stop predicting the bounces and focus purely on reactive, smooth tracking. Lowering your Universal Sens may help stabilize jitters.';
    } else if (e.mistakes > 15) {
      advice = 'Your overall stability is decent, but your link is breaking too frequently. Each second off-target drains your clock. Focus on continuous, unbroken mouse movements to survive longer.';
    }

    setLinkStability(finalStability);

    setAnalytics({
      stability: finalStability,
      mistakes: e.mistakes,
      maxStreak: e.bestStreak,
      timeSurvived: Math.floor(e.totalTimeElapsed),
      rankData: { rank, color: rankColor },
      coachAdvice: advice
    });

    setBestScore(prev => {
      if (e.score > prev) {
        setIsNewBest(true);
        try { localStorage.setItem('trackingStability_bestScore', e.score.toString()); } catch(err){}
        return e.score;
      }
      return prev;
    });
  }, []);

  const startGame = useCallback(async () => {
    if (audioSynth) audioSynth.init(); 

    setIsNewBest(false);
    setScore(0);
    setStreak(0);
    setMistakes(0);
    setLinkStability(100);
    setCurrentLevel(1);
    setGameState('playing');
    
    const e = engine.current;
    e.score = 0;
    e.level = 1;
    e.streak = 0;
    e.bestStreak = 0;
    e.mistakes = 0;
    e.totalFrames = 0;
    e.focusFrames = 0;
    e.opticalFlow = 0;
    e.connectedTimer = 0;
    e.disconnectedTimer = 0;
    e.totalTimeElapsed = 0;
    
    e.timeLeft = 30; // 30 seconds starting survival time
    setTimeLeft(30);
    
    lastTimeRef.current = performance.now();
    isActiveRef.current = true;
    e.crosshair.initialized = false;

    if (canvasRef.current) {
      e.anchor.x = canvasRef.current.width / 2; 
      e.anchor.y = canvasRef.current.height / 2; 
      e.anchor.vx = 180; 
      e.anchor.vy = 180;
    }

    try {
      if (containerRef.current && !document.fullscreenElement) {
        await containerRef.current.requestFullscreen();
      }
    } catch(err) {}

    setTimeout(() => {
      if (canvasRef.current && !document.pointerLockElement) {
        canvasRef.current.requestPointerLock().catch(()=>{});
        engine.current.crosshair.initialized = true;
      }
    }, 150);
  }, []);

  // === Raw Mouse Input Listeners ===
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

  // === Physics Engine & Render Loop ===
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

      if (gameState === 'playing' && pointerLocked && isActiveRef.current) {
        
        e.totalTimeElapsed += dt;
        
        if (e.timeLeft <= 0) {
          e.timeLeft = 0;
          endGame();
        }

        // Difficulty Scaling Logic
        e.level = Math.floor(e.score / 10) + 1;
        const targetBaseSpeed = 180 + ((e.level - 1) * 35);

        // Movement Update
        const a = e.anchor; 
        const ch = e.crosshair; 
        
        a.x += a.vx * dt; 
        a.y += a.vy * dt; 
        
        // Boundaries
        if (a.x <= 15 || a.x >= cvs.width - 15) { a.vx *= -1; a.x = Math.max(16, Math.min(cvs.width - 16, a.x)); } 
        if (a.y <= 15 || a.y >= cvs.height - 15) { a.vy *= -1; a.y = Math.max(16, Math.min(cvs.height - 16, a.y)); } 
        
        // Dynamic Chaos
        const randomness = 8 + (e.level * 2.5);
        a.vx += (Math.random() - 0.5) * randomness; 
        a.vy += (Math.random() - 0.5) * randomness; 
        
        // Speed Limiter
        const sp = Math.hypot(a.vx, a.vy); 
        if (sp > targetBaseSpeed * 1.25) { a.vx *= 0.9; a.vy *= 0.9; } 
        if (sp < targetBaseSpeed * 0.75) { a.vx *= 1.1; a.vy *= 1.1; } 
        
        const d = Math.hypot(ch.x - a.x, ch.y - a.y); 
        e.totalFrames++; 
        const isLinked = d < 60;
        
        // Time & Score Survival Loop
        if (isLinked) { 
          e.focusFrames++; 
          e.disconnectedTimer = 0;
          e.connectedTimer += dt;
          e.timeLeft += dt; // +1s time for every second connected
          
          if (e.connectedTimer >= 1.0) { 
            e.score += 1; // +1 point
            e.connectedTimer -= 1.0; 
            
            e.streak++; 
            if (e.streak > e.bestStreak) e.bestStreak = e.streak; 
            
            if (audioSynth) audioSynth.playSound('focus'); 
          } 
        } else { 
          e.streak = 0; 
          e.connectedTimer = 0; 
          e.disconnectedTimer += dt;
          e.timeLeft -= dt; // -1s time for every second disconnected
          
          if (e.disconnectedTimer >= 1.0) { 
            e.mistakes += 1; 
            e.disconnectedTimer -= 1.0; 
            if (audioSynth) audioSynth.playSound('penalty'); 
            
            setFlashBg('red');
            setTimeout(() => setFlashBg(null), 100);
          } 
        } 
        
        // Clamp Max Time
        e.timeLeft = Math.max(0, Math.min(120, e.timeLeft));
        e.opticalFlow += 100 * dt;

        // Throttle UI Sync
        if (e.totalFrames % 4 === 0) {
          setTimeLeft(e.timeLeft);
          setScore(e.score);
          setStreak(e.streak);
          setMistakes(e.mistakes);
          setCurrentLevel(e.level);
          setLinkStability(e.totalFrames > 0 ? Math.floor((e.focusFrames / e.totalFrames) * 100) : 100);
        }
      }

      // ==========================================
      // RENDER LOGIC
      // ==========================================
      ctx.save();

      ctx.fillStyle = '#050508';
      ctx.fillRect(0, 0, cvs.width, cvs.height);

      // Optical Flow Background
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.05)'; 
      ctx.lineWidth = 1; 
      for (let i = -cvs.width; i < cvs.width * 2; i += 100) { 
        ctx.beginPath(); 
        ctx.moveTo(i + (e.opticalFlow % 100), 0); 
        ctx.lineTo(i + (e.opticalFlow % 100) - 250, cvs.height); 
        ctx.stroke(); 
      }

      const ch = e.crosshair; 
      const a = e.anchor; 
      const d = Math.hypot(ch.x - a.x, ch.y - a.y); 
      const isLinked = d < 60; 

      // Draw Link Line
      ctx.beginPath(); 
      ctx.moveTo(ch.x, ch.y); 
      ctx.lineTo(a.x, a.y); 
      ctx.strokeStyle = isLinked ? "#10b981" : "#ef4444"; 
      ctx.lineWidth = isLinked ? 2.5 : 1.5; 
      if (!isLinked) ctx.setLineDash([5, 8]); 
      ctx.stroke(); 
      ctx.setLineDash([]); 

      // Draw Anchor
      ctx.beginPath(); 
      ctx.arc(a.x, a.y, 7, 0, Math.PI * 2); 
      ctx.fillStyle = isLinked ? "#10b981" : "#ef4444"; 
      ctx.fill();

      // Draw Crosshair
      if (ch.initialized && (gameState === 'playing' || gameState === 'start')) {
        const activeColor = pointerLocked ? (isLinked ? '#10b981' : '#ef4444') : '#f59e0b';
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
    const text = `🎯 I reached Level ${currentLevel} and scored ${score} PTS on the Tracking Stability Test! Time Survived: ${analytics.timeSurvived}s. Test your cursor tracking game at skilldrills.online!`;
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({ title: 'My Tracking Score', text, url: 'https://skilldrills.online/physical/tracking-stability-test' });
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
                <li className="text-emerald-400 font-medium">Hand Eye Coordination Training</li>
              </ol>
            </nav>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                  <Target className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Hand Eye Coordination Training Game</h1>
                  <p className="text-sm text-gray-400 mt-1 font-medium">Tracking Stability Test • Motor Control</p>
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
            <StatCard icon={<Trophy className="text-yellow-400" />} value={score} label="Score" />
            <StatCard icon={<Timer className={timeLeft <= 10 ? 'text-red-400 animate-pulse' : 'text-teal-400'} />} value={Math.max(0, timeLeft).toFixed(0)} label="Time" unit="s" />
            <StatCard icon={<LinkIcon className="text-blue-400" />} value={linkStability} label="Stability" unit="%" />
            <StatCard icon={<TrendingUp className="text-fuchsia-400" />} value={`Lv. ${currentLevel}`} label="Level" />
            
            <StatCard icon={<Zap className="text-amber-400" />} value={streak} label="Streak" />
            <StatCard icon={<Activity className="text-red-400" />} value={mistakes} label="Mistakes" />
            <StatCard icon={<Info className="text-gray-400" />} value={`${universalSens.toFixed(2)}x`} label="Sens" />
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
          {/* Progress Bar (Time Max 120s) */}
          {gameState === 'playing' && (
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gray-900 z-[60]">
              <div 
                className={`h-full transition-all duration-100 ease-linear ${timeLeft <= 10 ? 'bg-red-500 animate-pulse' : 'bg-emerald-500'}`}
                style={{ width: `${Math.min(100, (timeLeft / 120) * 100)}%` }} 
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
                    <p className="text-[10px] text-fuchsia-400 font-bold uppercase tracking-widest">Level</p>
                    <p className="text-2xl font-black text-fuchsia-400 leading-none">{currentLevel}</p>
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
                <AlertCircle className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
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
                  Tracking Stability Test
                </h2>
                <p className="text-xs text-slate-500 uppercase tracking-widest mb-6">
                  Hand Eye Coordination • Survival Loop
                </p>

                <div className="grid grid-cols-2 gap-3 mb-6 text-left">
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Objective</span>
                    <span className="text-sm font-black text-white">Cursor Tracking</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Reward</span>
                    <span className="text-sm font-black text-green-400">+1 PTS & +1s Time</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Penalty</span>
                    <span className="text-sm font-black text-red-400">-1s Time Drain</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Mechanic</span>
                    <span className="text-sm font-black text-purple-400">Survival Clock</span>
                  </div>
                </div>

                <div className="bg-[#0b0f19] border border-slate-850 p-4 rounded-xl mb-4 text-left text-xs text-slate-400">
                  <span className="text-xs font-bold text-white block uppercase mb-1 flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-emerald-500" /> What this trains
                  </span>
                  <ul className="list-disc pl-4 space-y-1 text-[10px] text-slate-500 leading-relaxed">
                    <li>Fine motor tracking and tracking accuracy</li>
                    <li>Visual-motor synchronization and cursor stability</li>
                    <li>Sustained cognitive attention under speed scaling</li>
                  </ul>
                </div>

                <div className="bg-[#0b0f19] border border-slate-850 p-4 rounded-xl mb-6 text-left text-xs text-slate-400">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-white uppercase mb-3">
                    <Crosshair className="w-3.5 h-3.5 text-blue-500" /> Universal Sens
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-emerald-400 font-mono text-sm font-bold">{universalSens.toFixed(2)}x</span>
                    <span className="text-[10px] text-slate-500">Approx: {cmPer360} cm/360</span>
                  </div>
                  <input 
                    type="range" min="0.1" max="3.0" step="0.05" 
                    value={universalSens} 
                    onChange={(e) => setUniversalSens(parseFloat(e.target.value))} 
                    className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500" 
                  />
                </div>

                <button
                  onClick={startGame}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg uppercase tracking-widest transition-all duration-200 active:scale-95"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  Begin Tracking Drill
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
                  Peak Speed Level: Level {currentLevel}
                </p>

                <div className="grid grid-cols-3 gap-2.5 mb-6 text-left">
                  <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
                    <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Final Score</span>
                    <span className="text-base font-black text-white">{score}</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
                    <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Link Stability</span>
                    <span className="text-base font-black text-white">{analytics.stability}%</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
                    <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Max Streak</span>
                    <span className="text-base font-black text-emerald-400">{analytics.maxStreak}</span>
                  </div>
                  
                  <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
                    <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Time Survived</span>
                    <span className="text-base font-black text-blue-400">{analytics.timeSurvived}s</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
                    <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Link Mistakes</span>
                    <span className="text-base font-black text-red-400">{analytics.mistakes}</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
                    <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Speed Scale</span>
                    <span className="text-base font-black text-purple-400">{currentLevel}x</span>
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
                    className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg uppercase tracking-widest transition-all duration-200 active:scale-95"
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
                <Info className="w-5 h-5 text-emerald-400" /><h2 className="font-bold text-white text-lg tracking-wide">Progression & Scoring Rules</h2>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-5">
                  <RuleItem num="1" color="green" text="Continuous Tracking" highlight="+1 PTS & +1s Time" result="Every 1s connected" />
                  <RuleItem num="2" color="red" text="Target Lost Penalty" highlight="-1s Time Drain" result="Every 1s disconnected" />
                </div>
                <div className="space-y-5">
                  <RuleItem num="3" color="purple" text="Dynamic Difficulty" highlight="Speed Scaling" result="Increases every 10 PTS" />
                  <RuleItem num="4" color="indigo" text="Survival Loop" highlight="Max 120s" result="Clock drops when missed" />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Expanded Educational Content */}
        {!isFullscreen && (
          <article className="mt-12 text-gray-300">
            <div className="rounded-2xl border border-gray-800 overflow-hidden bg-gray-900 shadow-xl">
              <div className="px-6 py-5 border-b border-gray-800 bg-black/40 flex items-center gap-3">
                <GraduationCap className="w-5 h-5 text-emerald-400" />
                <h2 className="font-bold text-white text-lg tracking-wide">About Hand Eye Coordination Training</h2>
              </div>
              
              <div className="p-8 space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center"><Users className="w-4 h-4 text-white" /></div>
                      <h3 className="text-sm font-bold text-white">Who Should Use This</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Gamers wanting better aim control, athletes training cognitive coordination, and anyone wanting to improve their cursor accuracy and fine motor skills.</p>
                  </div>
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-green-600 flex items-center justify-center"><TrendingUp className="w-4 h-4 text-white" /></div>
                      <h3 className="text-sm font-bold text-white">Benefits</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Enhances tracking stability, builds visual-motor integration, drastically improves smooth pursuit tracking accuracy, and strengthens sustained focus.</p>
                  </div>
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center"><BarChart3 className="w-4 h-4 text-white" /></div>
                      <h3 className="text-sm font-bold text-white">What You'll Track</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Overall score, tracking stability percentage, total time spent actively surviving on target, peak streak survival, and penalty frequency.</p>
                  </div>
                </div>

                <section className="border-t border-gray-800 pt-6">
                  <h2 className="text-xl font-bold text-white mb-3">What is Hand Eye Coordination Training?</h2>
                  <p className="text-sm leading-relaxed mb-4">
                    Hand eye coordination training involves specific visual-motor drills designed to measure and improve the efficiency of your brain's ability to translate visual shifts into precise physical movements. By forcing you to follow an unpredictable, smoothly moving target with a computer mouse, it evaluates how quickly your brain processes a target trajectory and executes the corresponding micro-adjustments.
                  </p>
                </section>

                <section className="border-t border-gray-800 pt-6">
                  <h2 className="text-xl font-bold text-white mb-3">Why Use a Cursor Tracking Game?</h2>
                  <p className="text-sm leading-relaxed mb-4">
                    Cursor tracking games are heavily utilized by professional esports athletes and cognitive researchers. Unlike clicking mechanics which rely on isolated muscle memory, smooth pursuit tracking stability forces you to match the speed and trajectory of a target seamlessly. This builds incredible foundational mouse control, benefiting everything from tracking opponents in fast-paced FPS games to improving general motor skills.
                  </p>
                </section>
              </div>

              <div className="bg-[#0b0f19] border-t border-gray-800 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Lightbulb className="w-6 h-6 text-yellow-400" />
                  <h3 className="text-xl font-bold text-white">Frequently Asked Questions</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FAQItem q="What is hand eye coordination training?" a="Hand eye coordination training involves specific drills, like cursor tracking games, that challenge your brain to rapidly process visual shifts and translate them into precise, fine motor hand movements." />
                  <FAQItem q="How can I improve hand eye coordination?" a="You can improve hand eye coordination by practicing continuous pursuit tracking stability tests online. Focusing on smooth cursor control rather than rapid clicks builds stronger neuromuscular pathways." />
                  <FAQItem q="Does cursor tracking improve gaming performance?" a="Yes, cursor tracking games directly train 'smooth pursuit', which is the mechanical skill required to track moving targets, control weapon recoil, and duel strafing opponents in FPS games." />
                  <FAQItem q="Can tracking games improve mouse control?" a="Absolutely. Tracking drills punish jittery, tense mouse movements and reward smooth, deliberate tracing, which directly improves fine motor mouse control." />
                  <FAQItem q="What is a tracking stability test?" a="A tracking stability test measures your ability to maintain a consistent visual link with a randomly moving target. It records accuracy, tracking time, and penalty frequency to evaluate your fine motor control." />
                  <FAQItem q="How do professional gamers train tracking accuracy?" a="Pros use dedicated aim trainers and browser drills to isolate their tracking mechanics, practicing smooth, non-jittery mouse paths to eliminate overcorrection and build a consistent visual-motor link." />
                  <FAQItem q="How does the survival loop work?" a="You start with 30 seconds. Every second you stay successfully locked on the target, you gain +1 second of time. Every second you fall off, you lose -1 second. If the timer hits zero, the game ends." />
                  <FAQItem q="Why does the target get faster?" a="The game features dynamic speed scaling. Every time you score 10 points, the target's base velocity and chaotic randomness increase, pushing your motor control limits further." />
                  <FAQItem q="Is this hand eye coordination game free?" a="Yes, this tracking trainer is completely free, open-source, and runs directly in your browser with zero downloads required." />
                  <FAQItem q="What is a good score for the tracking stability test?" a="A score above 40 points is considered Intermediate, while 80+ indicates Advanced tracking control. 120+ is Elite level." />
                </div>
              </div>
            </div>
          </article>
        )}

        {/* Related Drills */}
        {!isFullscreen && (
          <section className="mt-14" aria-label="Explore related aim and response drills">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-5 rounded-full bg-emerald-500"></div>
              <h2 className="text-xs font-bold text-white uppercase tracking-widest font-mono">
                Explore Related Drills
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <RelatedCard href="/drills/motor/hand-eye-coordination/aim-trainer" title="Aim Trainer" desc="Hone spatial coordinate click speed." color="green" icon={<Target className="w-4 h-4" />} />
              <RelatedCard href="/drills/fps/flick-shot-training" title="Pro Flick Trainer" desc="Snap to targets in time-attack mode." color="blue" icon={<Crosshair className="w-4 h-4" />} />
              <RelatedCard href="/drills/fps/180-degree-awareness" title="180° Awareness" desc="Alternate snapping opposite horizons." color="orange" icon={<Zap className="w-4 h-4" />} />
              <RelatedCard href="/drills/cognitive/processing-speed/reaction-time" title="Reaction Time Test" desc="Test visual reaction speed directly." color="purple" icon={<Timer className="w-4 h-4" />} />
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
                    <li><Link href="/drills/motor/hand-eye-coordination/aim-trainer" className="hover:text-emerald-400 transition-colors">Aim Trainer Elite</Link></li>
                    <li><Link href="/drills/fps/flick-shot-training" className="hover:text-emerald-400 transition-colors">Flick Shot Trainer</Link></li>
                    <li><Link href="/drills/fps" className="text-emerald-500 hover:text-emerald-400 transition-colors font-bold">All FPS Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Memory</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/memory/working-memory/n-back" className="hover:text-emerald-400 transition-colors">3-Back Training</Link></li>
                    <li><Link href="/drills/memory/short-term-memory/color-sequence" className="hover:text-emerald-400 transition-colors">Color Sequence</Link></li>
                    <li><Link href="/drills/memory" className="text-emerald-500 hover:text-emerald-400 transition-colors font-bold">All Memory Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Cognitive</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/cognitive/memory/card-matching" className="hover:text-emerald-400 transition-colors">Memory Games</Link></li>
                    <li><Link href="/drills/cognitive/attention/divided-attention" className="hover:text-emerald-400 transition-colors">Attention Drills</Link></li>
                    <li><Link href="/drills/cognitive" className="text-emerald-500 hover:text-emerald-400 transition-colors font-bold">All Cognitive Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Academic</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/academic/writing-speed/typing-test" className="hover:text-emerald-400 transition-colors">Typing Speed Test</Link></li>
                    <li><Link href="/drills/academic/math-speed/mental-math" className="hover:text-emerald-400 transition-colors">Mental Math</Link></li>
                    <li><Link href="/drills/academic" className="text-emerald-500 hover:text-emerald-400 transition-colors font-bold">All Academic Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">More Sectors</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/visual" className="hover:text-emerald-400 transition-colors">Visual</Link></li>
                    <li><Link href="/drills/physical" className="hover:text-emerald-400 transition-colors">Physical</Link></li>
                  </ul>
                </div>
              </div>
              
              <div className="border-t border-gray-800 pt-8 text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="w-6 h-6 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 rounded-lg flex items-center justify-center">
                    <Crosshair className="w-3.5 h-3.5 text-emerald-400" />
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

function StatCard({ icon, value, label, unit = '', highlight = false }) {
  return (
    <div className={`group rounded-xl border ${highlight ? 'border-emerald-500/50 bg-emerald-500/5' : 'border-gray-800 bg-gray-900/50'} p-2 text-center flex flex-col justify-center h-full transition-all duration-300 hover:scale-[1.03] hover:border-gray-700`}>
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
    indigo: 'bg-indigo-600 text-indigo-300 border-indigo-500', 
    purple: 'bg-purple-600 text-purple-300 border-purple-500',
    fuchsia: 'bg-fuchsia-600 text-fuchsia-300 border-fuchsia-500',
    gray: 'bg-gray-600 text-gray-300 border-gray-500', 
    green: 'bg-green-600 text-green-300 border-green-500',
    red: 'bg-red-600 text-red-300 border-red-500',
    orange: 'bg-orange-600 text-orange-300 border-orange-500'
  };
  const colors = colorMap[color] || 'bg-slate-600 text-slate-300 border-slate-500';
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
    purple: 'from-purple-500 to-violet-500',
    green: 'from-green-500 to-emerald-500',
    indigo: 'from-indigo-500 to-purple-500'
  };
  return (
    <Link href={href} className="group relative overflow-hidden rounded-2xl border border-gray-800 bg-[#0b0f19]/40 transition-all hover:-translate-y-1 hover:border-gray-600 block p-5">
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${gradients[color]}`}></div>
      <div className="w-10 h-10 rounded-xl bg-[#050811] border border-gray-700 flex items-center justify-center text-gray-400 group-hover:text-white mb-3 shadow-inner">
        {icon}
      </div>
      <h3 className="font-bold text-base mb-1.5 text-white transition-colors">{title}</h3>
      <p className="text-xs text-gray-500 mb-4">{desc}</p>
      <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-wider">
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