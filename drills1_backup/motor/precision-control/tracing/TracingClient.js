'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';

import { 
  Activity, AlertCircle, ArrowRight, BarChart3, ChevronRight, 
  Clock, Crosshair, Eye, GraduationCap, Info, Lightbulb, 
  Maximize2, Minimize2, Play, RefreshCw, Star, Target, 
  Timer, TrendingUp, Trophy, Volume2, VolumeX, Zap, 
  Share2, Code2, Calculator, CheckCircle2, Shield, Users, Waves
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

  playSoothingPop() {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine'; 
      osc.frequency.setValueAtTime(880, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(440, this.ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.15);
      osc.connect(gain); gain.connect(this.ctx.destination);
      osc.start(); osc.stop(this.ctx.currentTime + 0.15);
    } catch(e) {}
  }

  playSoftThud() {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle'; 
      osc.frequency.setValueAtTime(150, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.2);
      osc.connect(gain); gain.connect(this.ctx.destination);
      osc.start(); osc.stop(this.ctx.currentTime + 0.2);
    } catch(e) {}
  }
  
  setEnabled(status) {
    this.enabled = status;
  }
}

const audioSynth = typeof window !== 'undefined' ? new AudioSynthesizer() : null;

// ============================================================
// CORE DRILL LOGIC VARIABLES
// ============================================================
const DRILL_DURATION = 60;
const tolerance = 45;
const speed = 4.2;
let points = [];
let offset = 0;
let isOffPath = false; // Updated state to handle continuous tracking logic
let globalTime = 0;

function getY(x, cvsHeight) { 
  const xPos = (x + offset) * 0.004; 
  const phase = (globalTime % 12); 
  if (phase < 6) {
    return (cvsHeight / 2) + Math.sin(xPos * 8.0) * 110 + Math.sin(xPos * 18.5) * 25; 
  } else {
    return (cvsHeight / 2) + Math.sin(xPos * 2.2) * 160; 
  }
}

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function FineMotorClient() {
  // === UI & Viewport State ===
  const [gameState, setGameState] = useState('start'); 
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [pointerLocked, setPointerLocked] = useState(false);
  
  // === Settings State ===
  const [universalSens, setUniversalSens] = useState(1.0);

  // === Gameplay State ===
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(DRILL_DURATION);
  const [isNewBest, setIsNewBest] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('success');

  // Real-time HUD State
  const [flowState, setFlowState] = useState(100);
  const [streak, setStreak] = useState(0);

  // Analytics State
  const [analytics, setAnalytics] = useState({
    peakFlow: 100,
    maxStreak: 0,
    totalScore: 0
  });

  // === High-performance Mutable Refs ===
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  const timerRef = useRef(null);
  const pageRef = useRef(null);
  const feedbackTimerRef = useRef(null);
  
  // === Game Logic Engine Refs ===
  const virtualCrosshair = useRef({ x: 0, y: 0 });
  const crosshairInitRef = useRef(false);
  
  const scoreRef = useRef(0);
  const streakRef = useRef(0);
  const bestStreakRef = useRef(0);
  const flowRef = useRef(100);
  const focusTimerRef = useRef(0);
  const distractionTimerRef = useRef(0);
  const isActiveRef = useRef(false);

  const cmPer360 = (30 / universalSens).toFixed(1);

  // === Initialization & Local Storage ===
  useEffect(() => {
    try {
      const savedSens = localStorage.getItem('waveTracing_sens');
      if (savedSens) setUniversalSens(parseFloat(savedSens));
      const savedBest = localStorage.getItem('waveTracing_bestScore');
      if (savedBest) setBestScore(parseInt(savedBest, 10));
    } catch (e) {}
  }, []);

  useEffect(() => {
    if (gameState !== 'playing') {
      try { localStorage.setItem('waveTracing_sens', universalSens.toString()); } catch (e) {}
    }
    if (audioSynth) audioSynth.setEnabled(soundEnabled);
  }, [universalSens, gameState, soundEnabled]);

  const showFeedback = useCallback((m, t) => { 
    if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current); 
    setFeedback(m); 
    setFeedbackType(t); 
    feedbackTimerRef.current = setTimeout(() => { setFeedback(''); }, 600); 
  }, []);

  // === Core Game Management ===
  const endGame = useCallback(() => {
    setGameState('gameOver');
    isActiveRef.current = false;
    if (document.pointerLockElement) document.exitPointerLock();

    setAnalytics({
      peakFlow: Math.floor(flowRef.current),
      maxStreak: bestStreakRef.current,
      totalScore: scoreRef.current
    });

    setBestScore(prev => {
      if (scoreRef.current > prev) {
        setIsNewBest(true);
        try { localStorage.setItem('waveTracing_bestScore', scoreRef.current.toString()); } catch(err){}
        return scoreRef.current;
      }
      return prev;
    });
  }, []);

  const startGame = useCallback(async () => {
    if (audioSynth) audioSynth.init(); 

    setIsNewBest(false);
    setScore(0);
    setTimeLeft(DRILL_DURATION);
    setFlowState(100);
    setStreak(0);
    setFeedback('');
    setGameState('playing');
    
    scoreRef.current = 0;
    streakRef.current = 0;
    bestStreakRef.current = 0;
    flowRef.current = 100;
    focusTimerRef.current = 0;
    distractionTimerRef.current = 0;
    isActiveRef.current = true;
    crosshairInitRef.current = false;
    
    points = [];
    offset = 0;
    isOffPath = false;
    globalTime = 0;

    try {
      if (containerRef.current && !document.fullscreenElement) {
        await containerRef.current.requestFullscreen();
      }
    } catch(e) {}

    setTimeout(() => {
      if (canvasRef.current && !document.pointerLockElement) {
        canvasRef.current.requestPointerLock().catch(()=>{});
        crosshairInitRef.current = true;
      }
    }, 150);
  }, []);

  // === Strict Timer Management ===
  useEffect(() => {
    if (gameState === 'playing' && pointerLocked) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            endGame();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [gameState, pointerLocked, endGame]);

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
      virtualCrosshair.current.x = Math.max(0, Math.min(cvs.width, virtualCrosshair.current.x + dx));
      virtualCrosshair.current.y = Math.max(0, Math.min(cvs.height, virtualCrosshair.current.y + dy));
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

  // === Render & Physics Loop ===
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
          if (!crosshairInitRef.current) {
            virtualCrosshair.current = { x: width / 2, y: height / 2 };
          }
          points = [];
          for (let i = 0; i < width; i++) {
            points[i] = getY(i, height);
          }
        }
      }
    });
    resizeObserver.observe(container);

    let lastTime = performance.now();

    function updateGame(dt) {
      if (!isActiveRef.current || !pointerLocked) return;
      
      const ch = virtualCrosshair.current;
      const mouseIdx = Math.floor(ch.x);
      const targetY = (mouseIdx >= 0 && mouseIdx < points.length) ? points[mouseIdx] : cvs.height / 2;
      const distFromWave = Math.abs(ch.y - targetY);
      
      const currentlyOffPath = distFromWave > tolerance;

      if (!currentlyOffPath) { 
        if (isOffPath) {
          // Re-engaged the wave
          isOffPath = false; 
          if (audioSynth) audioSynth.playSoothingPop();
        }

        flowRef.current = Math.min(100, flowRef.current + 5 * dt); 
        streakRef.current++; 
        
        if (streakRef.current > bestStreakRef.current) { 
          bestStreakRef.current = streakRef.current; 
        } 
        
        focusTimerRef.current += dt; 
        if (focusTimerRef.current >= 1.0) { 
          const pts = Math.floor(focusTimerRef.current); 
          scoreRef.current += pts; 
          focusTimerRef.current -= pts; 
          if (pts > 0) showFeedback(`+${pts} Flow!`, 'success'); 
        } 
        distractionTimerRef.current = 0; 
      } else { 
        if (!isOffPath) {
          // Just fell off the wave
          isOffPath = true; 
          showFeedback('⚠️ Lost Wave!', 'warning'); 
          if (audioSynth) audioSynth.playSoftThud();
        }

        flowRef.current = Math.max(0, flowRef.current - 15 * dt); 
        streakRef.current = 0; 
        distractionTimerRef.current += dt; 
        focusTimerRef.current = 0; 
      }
      
      // Update fast UI states
      if (Math.random() < 0.1) {
        setFlowState(Math.floor(flowRef.current));
        setScore(scoreRef.current);
        setStreak(streakRef.current);
      }
      
      // Wave continuous movement (never pauses)
      offset += speed; 
      globalTime += dt; 
      points.shift(); 
      points.push(getY(cvs.width + offset, cvs.height));
    }

    const loop = (time) => {
      const dt = Math.min(0.033, (time - lastTime) / 1000); 
      lastTime = time;
      
      if (gameState === 'playing') {
        updateGame(dt);
      }

      // --- RENDERING PHASE ---
      ctx.fillStyle = '#05060b';
      ctx.fillRect(0, 0, cvs.width, cvs.height);

      // Environment Grid
      ctx.strokeStyle = 'rgba(244, 63, 94, 0.04)'; 
      ctx.lineWidth = 1; 
      for(let i = 0; i < cvs.width; i+= 50) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, cvs.height); ctx.stroke(); }
      for(let j = 0; j < cvs.height; j+= 50) { ctx.beginPath(); ctx.moveTo(0, j); ctx.lineTo(cvs.width, j); ctx.stroke(); }

      // Draw Wave Path
      if (points.length > 0) {
        ctx.beginPath(); 
        ctx.lineWidth = 2.5; 
        ctx.lineJoin = "round"; 
        ctx.strokeStyle = isOffPath ? "#ef4444" : "#f43f5e"; 
        
        ctx.moveTo(0, points[0]); 
        for (let i = 1; i < points.length; i += 2) {
          ctx.lineTo(i, points[i]); 
        }
        
        if (!isOffPath) {
          ctx.shadowBlur = 10;
          ctx.shadowColor = "#f43f5e";
        }
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      // Draw Crosshair
      const ch = virtualCrosshair.current;
      if (gameState === 'playing' || gameState === 'start') {
        ctx.beginPath(); 
        ctx.arc(ch.x, ch.y, 8, 0, Math.PI * 2); 
        ctx.fillStyle = isOffPath ? "#64748b" : "#00ff88"; 
        ctx.fill();
        
        ctx.strokeStyle = "#475569"; 
        ctx.lineWidth = 1.5;
        ctx.beginPath(); 
        ctx.moveTo(ch.x - 18, ch.y); ctx.lineTo(ch.x + 18, ch.y); 
        ctx.moveTo(ch.x, ch.y - 18); ctx.lineTo(ch.x, ch.y + 18); 
        ctx.stroke();
        
        if (!isOffPath) { 
          ctx.beginPath(); 
          ctx.arc(ch.x, ch.y, 14, 0, Math.PI * 2); 
          ctx.strokeStyle = "#00ff88"; 
          ctx.lineWidth = 1.5; 
          ctx.stroke(); 
        }
      }

      animationRef.current = requestAnimationFrame(loop);
    };

    animationRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animationRef.current);
      resizeObserver.disconnect();
    };
  }, [gameState, pointerLocked, showFeedback]);

  const shareDrillLink = useCallback(() => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    if (navigator.share) {
      navigator.share({ title: 'Wave Tracing Trainer', url }).catch(() => {});
    } else {
      navigator.clipboard.writeText(url).then(() => alert('Link copied!'));
    }
  }, []);

  return (
    <div ref={pageRef} className="min-h-screen select-none bg-[#050508] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header (Hidden in Fullscreen) */}
        {!isFullscreen && (
          <div className="mb-6">
            <nav className="mb-4">
              <ol className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
                <li><Link href="/" className="hover:text-gray-300">Home</Link></li>
                <li><ChevronRight className="w-4 h-4 text-gray-600" /></li>
                <li><Link href="/drills/motor" className="hover:text-gray-300">Motor</Link></li>
                <li><ChevronRight className="w-4 h-4 text-gray-600" /></li>
                <li className="text-rose-400 font-medium">Wave Tracing</li>
              </ol>
            </nav>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-br from-rose-500 to-red-600 rounded-xl shadow-[0_0_20px_rgba(244,63,94,0.3)]">
                  <Activity className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Wave Tracing Trainer</h1>
                  <p className="text-sm text-gray-400 mt-1 font-medium">Desktop Exclusive • Dynamic Pathing</p>
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
          <div className="grid grid-cols-4 lg:grid-cols-6 gap-2 mb-2">
            <StatCard icon={<Target className="text-rose-400" />} value={score} label="Flow Score" />
            <StatCard icon={<Timer className={timeLeft <= 10 ? 'text-red-400 animate-pulse' : 'text-emerald-400'} />} value={timeLeft} label="Time" unit="s" />
            <StatCard icon={<Activity className="text-green-400" />} value={flowState} label="Flow Integrity" unit="%" />
            <StatCard icon={<Zap className="text-orange-400" />} value={streak} label="Current Streak" />
            <StatCard icon={<Info className="text-gray-400" />} value={`${universalSens.toFixed(2)}x`} label="Sens" />
            <StatCard icon={<Trophy className="text-yellow-500" />} value={bestScore} label="Best Score" />
          </div>
        )}

        {/* Dynamic Feedback Popup */}
        <div className="h-8 mb-2 flex justify-center items-center pointer-events-none z-50">
          {feedback && (
            <div className={`animate-in zoom-in-75 fade-in duration-150 px-5 py-1.5 rounded-full text-white font-black tracking-widest text-sm shadow-xl ${feedbackType === 'success' ? 'bg-green-500/20 text-green-400 border border-green-500/50 shadow-green-500/20' : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/50 shadow-yellow-500/20'}`}>
              {feedback}
            </div>
          )}
        </div>

        {/* Engine Container */}
        <div 
          ref={containerRef} 
          className={`relative overflow-hidden transition-colors outline-none ${
            isFullscreen ? 'w-full h-full' : 'w-full aspect-video min-h-[500px] rounded-2xl border border-gray-700 shadow-2xl'
          }`}
        >
          {/* Progress Bar */}
          {gameState === 'playing' && (
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gray-900 z-[60]">
              <div 
                className={`h-full transition-all duration-1000 ease-linear ${timeLeft <= 10 ? 'bg-red-500 animate-pulse' : 'bg-rose-500'}`}
                style={{ width: `${Math.min(100, (timeLeft / DRILL_DURATION) * 100)}%` }} 
              />
            </div>
          )}

          {/* Fullscreen Overlay Controls */}
          {isFullscreen && gameState === 'playing' && (
            <div className="absolute top-4 right-4 z-[60] flex gap-2">
              <button onClick={() => setSoundEnabled(v => !v)} className="p-3 bg-black/60 border border-gray-600 rounded-xl text-white hover:bg-gray-800 transition-colors">
                {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
              </button>
              <button onClick={toggleFullscreen} className="p-3 bg-black/60 border border-gray-600 rounded-xl text-white hover:bg-gray-800 transition-colors">
                <Minimize2 className="w-5 h-5" />
              </button>
            </div>
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
                <AlertCircle className="w-12 h-12 text-rose-500 mx-auto mb-4" />
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
            <div className="absolute inset-0 flex items-center justify-center z-50 bg-black/70 backdrop-blur-md p-4 overflow-y-auto">
              <div className="rounded-3xl p-8 text-center max-w-lg w-full border border-gray-700 bg-gray-900 shadow-2xl my-auto">
                <div className="w-16 h-16 bg-gradient-to-br from-rose-500 to-red-600 rounded-2xl mx-auto flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(244,63,94,0.3)]">
                  <Activity className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-black mb-3 tracking-tight text-white uppercase">Wave Tracing</h2>
                <p className="text-sm mb-6 text-gray-400 leading-relaxed">
                  Raw input continuous tracking. Keep your crosshair perfectly aligned with the glowing red wave. The wave never stops—re-acquire it quickly if you fall off to maintain flow.
                </p>

                {/* Configuration Panel */}
                <div className="mb-8 p-5 bg-black/50 rounded-xl border border-gray-800 text-left space-y-5">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-xs text-gray-400 font-bold uppercase tracking-wider flex items-center gap-2">
                        <Crosshair className="w-4 h-4 text-rose-500"/> Universal Sens
                      </label>
                      <span className="text-rose-400 font-mono text-sm font-bold">{universalSens.toFixed(2)}x</span>
                    </div>
                    <input 
                      type="range" min="0.1" max="3.0" step="0.05" 
                      value={universalSens} 
                      onChange={(e) => setUniversalSens(parseFloat(e.target.value))} 
                      className="w-full h-1.5 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-rose-500" 
                    />
                    <div className="text-[10px] text-gray-500 mt-1.5 text-right">Approx: {cmPer360} cm/360</div>
                  </div>
                </div>
                
                <button 
                  onClick={startGame}
                  className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-rose-600 to-red-600 text-white rounded-xl font-black text-lg hover:brightness-110 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_20px_rgba(244,63,94,0.3)]"
                >
                  <Play className="w-6 h-6 fill-white" /> BEGIN MOTOR DRILL
                </button>
              </div>
            </div>
          )}

          {/* GAME OVER DASHBOARD */}
          {gameState === 'gameOver' && (
            <div className="absolute inset-0 flex items-center justify-center z-50 bg-black/90 backdrop-blur-md p-4 animate-in fade-in duration-300 overflow-y-auto">
              <div className="rounded-3xl max-w-2xl w-full shadow-2xl border border-gray-800 bg-gray-950 overflow-hidden my-auto">
                <div className="bg-gradient-to-br from-rose-900/40 to-red-900/40 p-6 border-b border-gray-800 text-center relative">
                  {isNewBest && (
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-yellow-500 text-black text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-[0_0_15px_rgba(234,179,8,0.5)]">
                      ⭐ New Personal Best
                    </div>
                  )}
                  <h2 className="text-2xl font-black text-white tracking-tight mt-4">Tracing Analysis Complete</h2>
                  <p className="text-rose-400 font-medium text-sm mt-1">Flow Session Concluded</p>
                </div>

                <div className="p-6">
                  {/* Top Stats */}
                  <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <div className="flex-1 bg-gray-900 rounded-2xl p-4 border border-gray-800 flex justify-between items-center">
                      <div>
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1 block">Final Score</span>
                        <div className="flex items-end gap-1">
                          <span className="text-4xl font-black text-white leading-none">{analytics.totalScore}</span>
                          <span className="text-xs text-gray-500 font-bold mb-1">PTS</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1 block">Peak Flow State</span>
                        <span className={`text-3xl font-black ${analytics.peakFlow >= 80 ? 'text-green-400' : analytics.peakFlow >= 50 ? 'text-yellow-400' : 'text-red-400'}`}>
                          {analytics.peakFlow}%
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Reaction Diagnostics Block */}
                  <div className="bg-[#0a0a0a] border border-rose-900/50 rounded-xl p-5 mb-6 text-left shadow-inner">
                    <h3 className="text-xs font-bold text-rose-400 font-mono uppercase tracking-widest border-b border-rose-900/50 pb-2 mb-4 flex items-center gap-2">
                      <BarChart3 className="w-4 h-4 text-rose-400" />
                      MOTOR TELEMETRY DIAGNOSTICS
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs leading-relaxed text-gray-300">
                      
                      <div className="space-y-3 sm:border-r border-gray-800 sm:pr-6">
                        <p className="font-bold text-white uppercase text-[10px] tracking-wider font-mono">Performance Log:</p>
                        <ul className="space-y-2">
                          <li className="flex justify-between items-center bg-gray-900/50 p-2 rounded border border-gray-800">
                            <span className="text-gray-400">Total Tracking Score:</span>
                            <span className="font-bold text-blue-400">{analytics.totalScore}</span>
                          </li>
                          <li className="flex justify-between items-center bg-gray-900/50 p-2 rounded border border-gray-800">
                            <span className="text-gray-400">Max Survival Streak:</span>
                            <span className="font-bold text-yellow-500">{analytics.maxStreak} Frames</span>
                          </li>
                          <li className="flex justify-between items-center bg-gray-900/50 p-2 rounded border border-gray-800">
                            <span className="text-gray-400">Peak Flow Reached:</span>
                            <span className="font-bold text-green-400">{analytics.peakFlow}%</span>
                          </li>
                        </ul>
                      </div>

                      <div className="space-y-3 flex flex-col justify-between">
                        <div>
                          <p className="font-bold text-white uppercase text-[10px] tracking-wider font-mono mb-2">Prescribed Advice:</p>
                          <p className="text-gray-400 leading-relaxed font-sans">
                            {analytics.totalScore < 30 ? (
                              <span className="text-red-300">Your hand is shaking too much and drifting off the wave too often. Focus on smooth vertical tracking and keeping the cursor tightly bound to the filament. Lowering your Universal Sens might help if you find it too jittery.</span>
                            ) : analytics.maxStreak < 50 ? (
                              <span className="text-yellow-300">Your accuracy is decent, but your streaks are breaking too often. Focus on smooth, continuous movements rather than jerky corrections to catch up to the wave.</span>
                            ) : (
                              <span className="text-green-300">Excellent continuous tracking! Your fine motor control is incredibly smooth. You are maintaining high accuracy despite the continuous wave variations.</span>
                            )}
                          </p>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <button onClick={startGame} className="flex-1 py-4 bg-rose-600 text-white rounded-xl font-black tracking-wide hover:bg-rose-500 transition-all active:scale-95 flex items-center justify-center gap-2 shadow-lg">
                      <RefreshCw className="w-5 h-5" /> TRAIN AGAIN
                    </button>
                    {isFullscreen && (
                       <button onClick={toggleFullscreen} className="px-6 py-4 bg-gray-800 text-white rounded-xl font-bold hover:bg-gray-700 transition-all border border-gray-700">
                         Exit
                       </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* DRILL INSTRUCTIONS & SCORING */}
        {!isFullscreen && (
          <section className="mt-10">
            <div className="rounded-2xl border border-gray-800 overflow-hidden bg-gray-900 shadow-2xl pointer-events-none">
              <div className="px-6 py-5 border-b border-gray-800 bg-black/40 flex items-center gap-3">
                <Info className="w-5 h-5 text-rose-400" /><h2 className="font-bold text-white text-lg tracking-wide">Drill Instructions & Scoring</h2>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-5">
                  <RuleItem num="1" color="rose" text="Trace the exact" highlight="glowing red wave" result="+1 PTS / sec" />
                  <RuleItem num="2" color="indigo" text="Speed adapts" highlight="Dynamically" result="Varying waveforms" />
                </div>
                <div className="space-y-5">
                  <RuleItem num="3" color="yellow" text="Continuous Flow" result="Wave never stops, keep up!" />
                  <RuleItem num="4" color="purple" text="Strict Tracking" highlight="Desktop Exclusive" result="1:1 Raw Mouse Input" />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ============================================================ */}
        {/* ABOUT THIS DRILL (Now Includes How to Play & FAQ) */}
        {/* ============================================================ */}
        {!isFullscreen && (
          <section className="mt-12" aria-label="About this drill">
            <div className="rounded-2xl border border-gray-800 overflow-hidden bg-gray-900 shadow-xl">
              <div className="px-6 py-5 border-b border-gray-800 bg-black/40 flex items-center gap-3">
                <GraduationCap className="w-5 h-5 text-rose-400" />
                <h2 className="font-bold text-white text-lg tracking-wide">About Wave Tracing Trainer</h2>
              </div>
              <div className="p-8">
                <p className="text-sm leading-relaxed mb-6 text-gray-300">
                  This fine motor drill develops hand-eye coordination and path precision by challenging you to physically guide your cursor along a dynamic, scrolling wave. The wave moves continuously regardless of your position, challenging you to quickly re-acquire the target if you slip off, forcing you to develop seamless positional awareness and flow state endurance.
                </p>

                {/* Grid Section */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center"><Users className="w-4 h-4 text-white" /></div>
                      <h3 className="text-sm font-bold text-white">Who It's For</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Esports athletes, graphic designers, digital artists, and individuals seeking to improve hand stability and reduce hand tremors.</p>
                  </div>
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-green-600 flex items-center justify-center"><TrendingUp className="w-4 h-4 text-white" /></div>
                      <h3 className="text-sm font-bold text-white">Skills Improved</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Fine motor control, continuous hand stability, flow state endurance, and mouse sensitivity mastery.</p>
                  </div>
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center"><BarChart3 className="w-4 h-4 text-white" /></div>
                      <h3 className="text-sm font-bold text-white">What You'll Track</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Flow score, Flow integrity percentage, streak length, and performance across sessions.</p>
                  </div>
                </div>

                {/* HOW TO PLAY SECTION */}
                <div className="p-6 rounded-xl border border-gray-800 bg-black/40 mb-8">
                  <div className="flex items-center gap-3 mb-5">
                    <Play className="w-5 h-5 text-green-400" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">How to Play & Scoring</h3>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-8 text-sm text-gray-300">
                    <ol className="space-y-4 list-decimal pl-5">
                      <li><strong className="text-white">Start the Drill:</strong> Follow the on-screen prompt to begin the motor tracking sequence.</li>
                      <li><strong className="text-white">Trace Smoothly:</strong> Keep your cursor strictly within the bounded path as it dynamically curves and shifts.</li>
                      <li><strong className="text-white">Maintain Speed:</strong> The wave moves continuously without pausing. Balance raw speed with fine precision to stay centered.</li>
                    </ol>
                    <ul className="space-y-4 list-disc pl-5 border-l border-gray-800/50 sm:pl-8">
                      <li><strong className="text-green-400">Accuracy:</strong> Staying in bounds keeps your multiplier active and earns points.</li>
                      <li><strong className="text-blue-400">Pacing:</strong> Continuous tracking awards compounding flow-state bonuses.</li>
                      <li><strong className="text-red-400">Errors:</strong> Straying off the wave rapidly drops your Flow Integrity and breaks your active streak.</li>
                    </ul>
                  </div>
                </div>

                {/* FAQ SECTION */}
                <div className="p-6 rounded-xl border border-gray-800 bg-black/40">
                  <div className="flex items-center gap-3 mb-5">
                    <Lightbulb className="w-5 h-5 text-yellow-400" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">Frequently Asked Questions</h3>
                  </div>
                  <div className="space-y-5">
                    <div>
                      <h4 className="text-sm font-bold text-gray-200">What happens when I fall off the wave?</h4>
                      <p className="text-xs text-gray-400 mt-1 leading-relaxed">Unlike earlier versions of this drill, the wave will continue scrolling without you. You will stop scoring points, your streak will break, and your Flow Integrity will rapidly drain. You must quickly and physically guide your cursor back onto the glowing red line to re-engage the scoring system.</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-200">How should I grip the mouse?</h4>
                      <p className="text-xs text-gray-400 mt-1 leading-relaxed">Hold the mouse with a relaxed grip. Tensing your muscles will cause micro-jitters, pushing your crosshair off the continuous tracking line. Smooth, flowing arm and wrist motions are key.</p>
                    </div>
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
              <div className="w-1 h-5 rounded-full bg-rose-500"></div>
              <h2 className="text-xs font-bold text-white uppercase tracking-widest font-mono">
                Explore Related Drills
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <RelatedCard href="/drills/motor/precision-control/steady-hand" title="Steady Hand" desc="Navigate narrow paths without touching the edges." color="orange" icon={<Target className="w-4 h-4" />} />
              <RelatedCard href="/drills/fps/flick-shot-training" title="Pro Flick Trainer" desc="Snap to targets in time-attack mode." color="blue" icon={<Crosshair className="w-4 h-4" />} />
              <RelatedCard href="/drills/fps/180-degree-awareness" title="180° Awareness" desc="Alternate snapping opposite horizons." color="rose" icon={<Zap className="w-4 h-4" />} />
              <RelatedCard href="/drills/fps/recoil-control" title="Recoil Control" desc="Calibrate pulling pattern compensation." color="red" icon={<Activity className="w-4 h-4" />} />
              <RelatedCard href="/drills/visual-tracking/saccadic-snap" title="Saccadic Calibration" desc="Optimize saccadic gaze acquisition limits." color="purple" icon={<Eye className="w-4 h-4" />} />
              <RelatedCard href="/drills/cognitive/processing-speed/reaction-time" title="Reaction Time" desc="Test visual reaction speed directly." color="cyan" icon={<Timer className="w-4 h-4" />} />
              <RelatedCard href="/drills/academic/math-speed/mental-math" title="Mental Math" desc="Advanced mental calculation speed tests." color="indigo" icon={<Calculator className="w-4 h-4" />} />
              <RelatedCard href="/drills/academic/writing-speed/typing-test" title="Code Typing" desc="Practice syntax and symbol typing speed." color="green" icon={<Code2 className="w-4 h-4" />} />
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
                    <li><Link href="/drills/motor/hand-eye-coordination/aim-trainer" className="hover:text-rose-400 transition-colors">Aim Trainer Elite</Link></li>
                    <li><Link href="/drills/fps/flick-shot-training" className="hover:text-rose-400 transition-colors">Flick Shot Trainer</Link></li>
                    <li><Link href="/drills/fps" className="text-rose-450 hover:text-rose-400 transition-colors font-bold">All FPS Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Memory</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/memory/working-memory/n-back" className="hover:text-rose-400 transition-colors">3-Back Training</Link></li>
                    <li><Link href="/drills/memory/short-term-memory/color-sequence" className="hover:text-rose-400 transition-colors">Color Sequence</Link></li>
                    <li><Link href="/drills/memory" className="text-rose-450 hover:text-rose-400 transition-colors font-bold">All Memory Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Cognitive</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/cognitive/memory/card-matching" className="hover:text-rose-400 transition-colors">Memory Games</Link></li>
                    <li><Link href="/drills/cognitive/attention/divided-attention" className="hover:text-rose-400 transition-colors">Attention Drills</Link></li>
                    <li><Link href="/drills/cognitive" className="text-rose-450 hover:text-rose-400 transition-colors font-bold">All Cognitive Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Academic</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/academic/writing-speed/typing-test" className="hover:text-rose-400 transition-colors">Typing Speed Test</Link></li>
                    <li><Link href="/drills/academic/math-speed/mental-math" className="hover:text-rose-400 transition-colors">Mental Math</Link></li>
                    <li><Link href="/drills/academic" className="text-rose-450 hover:text-rose-400 transition-colors font-bold">All Academic Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">More Sectors</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/visual" className="hover:text-rose-400 transition-colors">Visual (14)</Link></li>
                    <li><Link href="/drills/physical" className="hover:text-rose-400 transition-colors">Physical (11)</Link></li>
                  </ul>
                </div>
              </div>
              
              <div className="border-t border-slate-900 pt-8 text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="w-6 h-6 bg-gradient-to-br from-rose-500/25 to-red-500/25 border border-rose-500/30 rounded-lg flex items-center justify-center">
                    <Crosshair className="w-3.5 h-3.5 text-rose-400" />
                  </div>
                  <span className="text-white font-black tracking-widest text-xs uppercase">SkillDrills</span>
                </div>
                <p className="text-[9px] mb-2">&copy; 2026 SkillDrills. All rights reserved.</p>
                <p className="text-[9px] max-w-2xl mx-auto leading-relaxed mb-6">
                  Open-source telemetry training platform using hardware pointer lock. Free forever. No downloads required.
                </p>
                <div className="flex items-center justify-center gap-3 flex-wrap">
                  <a href="https://youtube.com/@skilldrills.online" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors p-2.5 bg-gray-900 rounded-full hover:bg-gray-800 shadow-md" title="YouTube">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                  </a>
                  <a href="https://www.facebook.com/profile.php?id=61590093843779" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors p-2.5 bg-gray-900 rounded-full hover:bg-gray-800 shadow-md" title="Facebook">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  </a>
                  <a href="https://x.com/skilldrillss" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors p-2.5 bg-gray-900 rounded-full hover:bg-gray-800 shadow-md" title="X / Twitter">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  </a>
                  <a href="https://www.instagram.com/skilldrills.online/?__pwa=1" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors p-2.5 bg-gray-900 rounded-full hover:bg-gray-800 shadow-md" title="Instagram">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
                  </a>
                  <a href="https://pinterest.com/skilldrills" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors p-2.5 bg-gray-900 rounded-full hover:bg-gray-800 shadow-md" title="Pinterest">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/></svg>
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
    rose: 'bg-rose-600 text-rose-300 border-rose-500', 
    orange: 'bg-orange-600 text-orange-300 border-orange-500',
    purple: 'bg-purple-600 text-purple-300 border-purple-500',
    cyan: 'bg-cyan-600 text-cyan-300 border-cyan-500',
    yellow: 'bg-yellow-600 text-yellow-300 border-yellow-500',
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
    <Link href={href} className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-[#0b0f19]/40 transition-all hover:-translate-y-1 hover:border-rose-500/50 block p-5">
      <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${gradients[color] || 'from-rose-500 to-red-500'}`}></div>
      <div className="w-10 h-10 rounded-xl bg-[#050811] border border-slate-700 flex items-center justify-center text-slate-400 group-hover:text-white mb-3 shadow-inner">
        {icon}
      </div>
      <h3 className="font-bold text-base mb-1.5 text-white group-hover:text-rose-400 transition-colors">{title}</h3>
      <p className="text-xs text-slate-500 mb-4">{desc}</p>
      <div className="flex items-center gap-1.5 text-rose-400 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-wider">
        Start Drill <ArrowRight className="w-3.5 h-3.5" />
      </div>
    </Link>
  );
}