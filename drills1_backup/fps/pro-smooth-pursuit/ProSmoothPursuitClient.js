'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  Activity, AlertCircle, ArrowRight, BarChart3, ChevronRight, 
  Clock, Crosshair, Eye, GraduationCap, Info, Lightbulb, 
  Maximize2, Minimize2, Play, RefreshCw, Star, Target, 
  Timer, TrendingUp, Trophy, Volume2, VolumeX, Zap, 
  Share2, Code2, Calculator, CheckCircle2, Shield, Users, XCircle
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

  // Smooth melodic sound effect (A5 to C#6 chord sweep)
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
      osc.type = 'triangle'; 
      osc.frequency.setValueAtTime(150, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.25);
      osc.connect(gain); gain.connect(this.ctx.destination);
      osc.start(); osc.stop(this.ctx.currentTime + 0.25);
    } catch(e) {}
  }
  
  setEnabled(status) {
    this.enabled = status;
  }
}

const audioSynth = typeof window !== 'undefined' ? new AudioSynthesizer() : null;

const DRILL_DURATION = 60; // Strict 60 seconds

export default function ProSmoothPursuitClient() {
  // === UI & Viewport State ===
  const [gameState, setGameState] = useState('start'); // 'start', 'playing', 'gameOver'
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [pointerLocked, setPointerLocked] = useState(false);
  
  // === Settings State ===
  const [universalSens, setUniversalSens] = useState(1.0);
  const [baseSpeed, setBaseSpeed] = useState(1.5); 

  // === Gameplay State ===
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [trackingAccuracy, setTrackingAccuracy] = useState(0);
  const [bestAccuracy, setBestAccuracy] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(DRILL_DURATION);
  const [isNewBest, setIsNewBest] = useState(false);
  const [flashBg, setFlashBg] = useState(null);

  // === High-performance Mutable Refs ===
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  const timerRef = useRef(null);
  
  // === Game Logic Engine Refs ===
  const engine = useRef({
    t: 0,
    speed: baseSpeed,
    radius: 30,
    isHit: false,
    framesOnTarget: 0,
    totalFrames: 0,
    score: 0,
    streak: 0,
    bestStreak: 0,
    bestAccuracy: 0,
    focusTimer: 0,
    distractionTimer: 0,
    timeLeft: DRILL_DURATION,
    crosshair: { x: 0, y: 0, initialized: false }
  });

  const cmPer360 = (30 / universalSens).toFixed(1);

  // === Initialization & Local Storage ===
  useEffect(() => {
    try {
      const savedSens = localStorage.getItem('proPursuit_sens');
      if (savedSens) setUniversalSens(parseFloat(savedSens));
      const savedSpeed = localStorage.getItem('proPursuit_speed');
      if (savedSpeed) setBaseSpeed(parseFloat(savedSpeed));
      const savedBest = localStorage.getItem('proPursuit_bestScore');
      if (savedBest) setBestScore(parseInt(savedBest, 10));
    } catch (e) {}
  }, []);

  useEffect(() => {
    if (gameState !== 'playing') {
      try { 
        localStorage.setItem('proPursuit_sens', universalSens.toString());
        localStorage.setItem('proPursuit_speed', baseSpeed.toString());
      } catch (e) {}
    }
    if (audioSynth) audioSynth.setEnabled(soundEnabled);
  }, [universalSens, baseSpeed, gameState, soundEnabled]);

  // === Core Game Management ===
  const endGame = useCallback(() => {
    setGameState('gameOver');
    if (document.pointerLockElement) document.exitPointerLock();
    
    setBestScore(prev => {
      const isBetter = engine.current.score > prev;
      if (isBetter) {
        setIsNewBest(true);
        try { localStorage.setItem('proPursuit_bestScore', engine.current.score.toString()); } catch(e){}
        return engine.current.score;
      }
      return prev;
    });
  }, []);

  const startGame = useCallback(async () => {
    if (audioSynth) audioSynth.init(); 

    setIsNewBest(false);
    setScore(0);
    setStreak(0);
    setTrackingAccuracy(0);
    setBestAccuracy(0);
    setBestStreak(0);
    setTimeLeft(DRILL_DURATION);
    setGameState('playing');
    
    // Reset Engine variables
    engine.current = {
      t: 0,
      speed: baseSpeed, 
      radius: 30,
      isHit: false,
      framesOnTarget: 0,
      totalFrames: 0,
      score: 0,
      streak: 0,
      bestStreak: 0,
      bestAccuracy: 0,
      focusTimer: 0,
      distractionTimer: 0,
      timeLeft: DRILL_DURATION,
      crosshair: { ...engine.current.crosshair } // preserve position
    };

    // Native Container Fullscreen
    try {
      if (containerRef.current && !document.fullscreenElement) {
        await containerRef.current.requestFullscreen();
      }
    } catch(e) {}

    // Delay pointer lock slightly to ensure fullscreen transition finishes
    setTimeout(() => {
      if (canvasRef.current && !document.pointerLockElement) {
        canvasRef.current.requestPointerLock().catch(()=>{});
      }
    }, 100);
  }, [baseSpeed]);

  // === Strict Timer Management ===
  useEffect(() => {
    if (gameState === 'playing' && pointerLocked) {
      timerRef.current = setInterval(() => {
        engine.current.timeLeft -= 1;
        setTimeLeft(engine.current.timeLeft);
        
        if (engine.current.timeLeft <= 0) {
          clearInterval(timerRef.current);
          endGame();
        }
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [gameState, pointerLocked, endGame]);

  // === Raw Mouse Input & Pointer Lock ===
  useEffect(() => {
    const handlePointerLockChange = () => {
      setPointerLocked(document.pointerLockElement === canvasRef.current);
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

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, [gameState, pointerLocked, universalSens]);

  const toggleFullscreen = useCallback(async () => {
    if (!document.fullscreenElement) {
      if (containerRef.current) {
        await containerRef.current.requestFullscreen().catch(()=>{});
      }
    } else {
      await document.exitFullscreen().catch(()=>{});
    }
  }, []);

  useEffect(() => {
    const fsListener = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', fsListener);
    return () => document.removeEventListener('fullscreenchange', fsListener);
  }, []);

  // === Render & Game Loop (Optimized for Pure Delta Time) ===
  useEffect(() => {
    const cvs = canvasRef.current; 
    const container = containerRef.current;
    if (!cvs || !container) return;
    const ctx = cvs.getContext('2d', { alpha: false });

    // Robust Resize Observer: Exact 1:1 container matching
    const resizeObserver = new ResizeObserver(() => {
      const rect = container.getBoundingClientRect();
      cvs.width = rect.width;
      cvs.height = rect.height;
      
      // Auto-center crosshair initially
      if (!engine.current.crosshair.initialized && rect.width > 0) {
        engine.current.crosshair.x = rect.width / 2;
        engine.current.crosshair.y = rect.height / 2;
        engine.current.crosshair.initialized = true;
      }
    });
    resizeObserver.observe(container);

    let lastTime = performance.now();

    const loop = (time) => {
      const deltaTimeMs = time - lastTime;
      lastTime = time;
      const deltaSec = Math.min(deltaTimeMs / 1000, 0.1); 

      const e = engine.current;
      
      // Lissajous Curve Target Path Logic
      e.t += e.speed * deltaSec;
      const tx = (cvs.width / 2) + Math.cos(e.t * 0.85) * (cvs.width / 2.6);
      const ty = (cvs.height / 2) + Math.sin(e.t * 1.35) * (cvs.height / 3.2);

      // Interactive Logic
      if (gameState === 'playing' && pointerLocked) {
        const dist = Math.hypot(e.crosshair.x - tx, e.crosshair.y - ty);
        e.isHit = dist <= e.radius + 5; // 5px hitbox forgiveness
        e.totalFrames++;

        if (e.isHit) {
          e.framesOnTarget++;
          e.streak++;
          e.focusTimer += deltaSec;
          e.distractionTimer = 0;
          
          if (e.streak > e.bestStreak) e.bestStreak = e.streak;

          // Aggressive Scaling: Get faster and smaller
          e.speed = Math.min(baseSpeed * 2.5, e.speed + (0.1 * deltaSec));
          e.radius = Math.max(10, e.radius - (3 * deltaSec));

          // Valid Hit Reward (+5 PTS, +2.0s Time) per 1.5s tracking
          if (e.focusTimer >= 1.5) {
            e.score += 5;
            e.timeLeft += 2;
            e.focusTimer -= 1.5;
            setScore(e.score);
            
            if (audioSynth) audioSynth.playSuccess();
            setFlashBg('green');
            setTimeout(() => setFlashBg(null), 100);
          }
        } else {
          e.distractionTimer += deltaSec;
          e.focusTimer = 0;
          e.streak = 0;

          // Forgiveness: Slow down and grow
          e.speed = Math.max(baseSpeed, e.speed - (0.4 * deltaSec));
          e.radius = Math.min(35, e.radius + (8 * deltaSec));

          // Tracking Miss Penalty (-2 PTS, -1.0s Time) per 2.0s lost
          if (e.distractionTimer >= 2.0) {
            e.score = Math.max(0, e.score - 2);
            e.timeLeft -= 1;
            e.distractionTimer -= 2.0;
            setScore(e.score);
            
            if (audioSynth) audioSynth.playFail();
            setFlashBg('red');
            setTimeout(() => setFlashBg(null), 100);
          }
        }

        // Performance Throttled State Updates
        if (e.totalFrames % 15 === 0) {
          setStreak(e.streak);
          setBestStreak(e.bestStreak);
          const acc = (e.framesOnTarget / e.totalFrames) * 100;
          const roundedAcc = Math.round(acc * 10) / 10;
          setTrackingAccuracy(roundedAcc);
          if (roundedAcc > e.bestAccuracy) {
            e.bestAccuracy = roundedAcc;
            setBestAccuracy(roundedAcc);
          }
        }
      }

      // --- RENDERING PHASE ---
      ctx.fillStyle = '#050508';
      ctx.fillRect(0, 0, cvs.width, cvs.height);

      ctx.strokeStyle = 'rgba(0, 255, 136, 0.04)';
      ctx.lineWidth = 1;
      for (let i = 0; i < cvs.width; i += 60) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, cvs.height); ctx.stroke(); }
      for (let j = 0; j < cvs.height; j += 60) { ctx.beginPath(); ctx.moveTo(0, j); ctx.lineTo(cvs.width, j); ctx.stroke(); }

      // Trace Path (Faint background line)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let stepT = 0; stepT < Math.PI * 4; stepT += 0.05) {
        const px = (cvs.width / 2) + Math.cos(stepT * 0.85) * (cvs.width / 2.6);
        const py = (cvs.height / 2) + Math.sin(stepT * 1.35) * (cvs.height / 3.2);
        if (stepT === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
      }
      ctx.stroke();

      const isActiveAndHit = gameState === 'playing' && pointerLocked && e.isHit;
      
      // Target Rendering
      ctx.shadowBlur = isActiveAndHit ? 20 : 0;
      ctx.shadowColor = '#00ff88';
      ctx.strokeStyle = isActiveAndHit ? '#00ff88' : '#eab308';
      ctx.lineWidth = 2.5;
      
      ctx.beginPath();
      ctx.arc(tx, ty, e.radius, 0, Math.PI * 2);
      ctx.stroke();

      // Target Inner Core
      ctx.shadowBlur = 0;
      ctx.fillStyle = isActiveAndHit ? '#00ff88' : '#eab308';
      ctx.beginPath();
      ctx.arc(tx, ty, Math.max(3, e.radius * 0.25), 0, Math.PI * 2);
      ctx.fill();

      // Crosshair Rendering
      const ch = e.crosshair;
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
      }

      animationRef.current = requestAnimationFrame(loop);
    };

    animationRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animationRef.current);
      resizeObserver.disconnect();
    };
  }, [gameState, pointerLocked, baseSpeed]);

  const shareDrillLink = useCallback(() => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    if (navigator.share) {
      navigator.share({ title: 'Pro Smooth Pursuit', url }).catch(() => {});
    } else {
      navigator.clipboard.writeText(url).then(() => alert('Link copied!'));
    }
  }, []);

  return (
    <div className="min-h-screen select-none bg-[#050508] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header (Hidden in Fullscreen) */}
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
                <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-[0_0_20px_rgba(34,197,94,0.3)]">
                  <Target className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Pro Smooth Pursuit</h1>
                  <p className="text-sm text-gray-400 mt-1 font-medium">Desktop Exclusive • Dynamic Target Tracking</p>
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
          <div className="grid grid-cols-4 lg:grid-cols-8 gap-2 mb-2">
            <StatCard icon={<Target className="text-green-400" />} value={score} label="Score" />
            <StatCard icon={<Timer className={timeLeft <= 10 ? 'text-red-400 animate-pulse' : 'text-emerald-400'} />} value={timeLeft} label="Time" unit="s" />
            <StatCard icon={<Zap className="text-indigo-400" />} value={streak} label="Combo" />
            <StatCard icon={<Star className="text-yellow-400" />} value={bestStreak} label="Max Combo" />
            <StatCard icon={<BarChart3 className="text-purple-400" />} value={`${trackingAccuracy}%`} label="Accuracy" />
            <StatCard icon={<TrendingUp className="text-cyan-400" />} value={`${bestAccuracy}%`} label="Best Acc" />
            <StatCard icon={<Info className="text-blue-400" />} value={`${universalSens.toFixed(2)}x`} label="Sens" />
            <StatCard icon={<Trophy className="text-yellow-500" />} value={bestScore} label="Best" />
          </div>
        )}

        {/* Engine Container (Becomes the Fullscreen element directly) */}
        <div 
          ref={containerRef} 
          className={`relative overflow-hidden bg-[#050811] transition-colors outline-none ${
            isFullscreen ? 'w-full h-full' : 'w-full aspect-video min-h-[500px] rounded-2xl border border-gray-700 shadow-2xl'
          }`}
          style={{ backgroundColor: flashBg === 'red' ? '#2a0a0a' : flashBg === 'green' ? '#063020' : '#05060b' }}
        >
          {/* Progress Bar */}
          {gameState === 'playing' && (
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gray-900 z-[60]">
              <div 
                className={`h-full transition-all duration-1000 ease-linear ${timeLeft <= 10 ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`}
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
              onClick={() => { if (canvasRef.current) canvasRef.current.requestPointerLock(); }}
            >
              <div className="text-center animate-pulse pointer-events-none">
                <AlertCircle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
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
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl mx-auto flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(34,197,94,0.3)]">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-black mb-3 tracking-tight text-white uppercase">Pro Smooth Pursuit</h2>
                <p className="text-sm mb-6 text-gray-400 leading-relaxed">
                  Keep your crosshair inside the moving target. The longer you track it perfectly, the higher your score. The difficulty scales aggressively as you progress.
                </p>

                {/* Configuration Panel */}
                <div className="mb-8 p-5 bg-black/50 rounded-xl border border-gray-800 text-left space-y-5">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-xs text-gray-400 font-bold uppercase tracking-wider flex items-center gap-2">
                        <Crosshair className="w-4 h-4 text-green-500"/> Universal Sens
                      </label>
                      <span className="text-green-400 font-mono text-sm font-bold">{universalSens.toFixed(2)}x</span>
                    </div>
                    <input 
                      type="range" min="0.1" max="3.0" step="0.05" 
                      value={universalSens} 
                      onChange={(e) => setUniversalSens(parseFloat(e.target.value))} 
                      className="w-full h-1.5 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-green-500" 
                    />
                    <div className="text-[10px] text-gray-500 mt-1.5 text-right">Approx: {cmPer360} cm/360</div>
                  </div>

                  <div className="pt-4 border-t border-gray-800">
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-xs text-gray-400 font-bold uppercase tracking-wider flex items-center gap-2">
                        <Zap className="w-4 h-4 text-orange-500"/> Base Speed Multiplier
                      </label>
                      <span className="text-orange-400 font-mono text-sm font-bold">{baseSpeed.toFixed(1)}x</span>
                    </div>
                    <input 
                      type="range" min="0.5" max="3.0" step="0.1" 
                      value={baseSpeed} 
                      onChange={(e) => setBaseSpeed(parseFloat(e.target.value))} 
                      className="w-full h-1.5 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-orange-500" 
                    />
                  </div>
                </div>
                
                <button 
                  onClick={startGame}
                  className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-black text-lg hover:brightness-110 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_20px_rgba(34,197,94,0.3)]"
                >
                  <Play className="w-6 h-6 fill-white" /> BEGIN TACTICAL DRILL
                </button>
              </div>
            </div>
          )}

          {/* GAME OVER SCREEN */}
          {gameState === 'gameOver' && (
            <div className="absolute inset-0 flex items-center justify-center z-50 bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-300 overflow-y-auto">
              <div className="rounded-3xl max-w-2xl w-full shadow-2xl border border-gray-800 bg-gray-950 overflow-hidden my-auto">
                <div className="bg-gradient-to-br from-green-900/40 to-emerald-900/40 p-6 border-b border-gray-800 text-center relative">
                  {isNewBest && (
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-yellow-500 text-black text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-[0_0_15px_rgba(234,179,8,0.5)]">
                      ⭐ New Personal Best
                    </div>
                  )}
                  <h2 className="text-3xl font-black text-white tracking-tight mt-4">Pursuit Analysis Complete</h2>
                  <p className="text-green-400 font-medium text-sm mt-1">Endless Tracking Session</p>
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-center mb-6 bg-gray-900 rounded-2xl p-4 border border-gray-800">
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Final Score</span>
                      <div className="flex items-end gap-1">
                        <span className="text-5xl font-black text-white leading-none">{score}</span>
                        <span className="text-sm text-gray-500 font-bold mb-1">PTS</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1 block">Accuracy</span>
                      <span className={`text-3xl font-black ${trackingAccuracy >= 75 ? 'text-green-400' : trackingAccuracy >= 50 ? 'text-yellow-400' : 'text-red-400'}`}>
                        {trackingAccuracy}%
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 mb-6">
                    <div className="bg-gray-900 rounded-xl p-3 text-center border border-gray-800">
                      <div className="text-gray-400 text-[10px] uppercase font-bold tracking-wider mb-1">Max Combo</div>
                      <div className="text-xl font-black text-cyan-400">{bestStreak}</div>
                    </div>
                    <div className="bg-gray-900 rounded-xl p-3 text-center border border-gray-800">
                      <div className="text-gray-400 text-[10px] uppercase font-bold tracking-wider mb-1">Peak Acc</div>
                      <div className="text-xl font-black text-purple-400">{bestAccuracy}%</div>
                    </div>
                    <div className="bg-gray-900 rounded-xl p-3 text-center border border-gray-800">
                      <div className="text-gray-400 text-[10px] uppercase font-bold tracking-wider mb-1">Speed/Sens</div>
                      <div className="text-xl font-black text-white">{baseSpeed.toFixed(1)} / {universalSens.toFixed(1)}</div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button onClick={startGame} className="flex-1 py-4 bg-green-600 text-white rounded-xl font-black tracking-wide hover:bg-green-500 transition-all active:scale-95 flex items-center justify-center gap-2 shadow-lg">
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
                <Info className="w-5 h-5 text-green-400" /><h2 className="font-bold text-white text-lg tracking-wide">Drill Instructions & Scoring</h2>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-5">
                  <RuleItem num="1" color="green" text="Perfect Tracking" highlight="1.5s = +5 PTS | +2.0s" result="Builds streak & clock" />
                  <RuleItem num="2" color="indigo" text="Dynamic Scaling" highlight="Endless difficulty" result="Target speeds up & shrinks" />
                </div>
                <div className="space-y-5">
                  <RuleItem num="3" color="red" text="Tracking Loss Penalty" highlight=">2.0s miss = -2 PTS | -1.0s" result="Accuracy matters most" />
                  <RuleItem num="4" color="purple" text="Strict Mechanics" highlight="Desktop Exclusive" result="1:1 Raw Mouse Input" />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* FULL ABOUT THIS DRILL SECTION */}
        {!isFullscreen && (
          <section className="mt-12" aria-label="About this drill">
            <div className="rounded-2xl border border-gray-800 overflow-hidden bg-gray-900 shadow-xl">
              <div className="px-6 py-5 border-b border-gray-800 bg-black/40 flex items-center gap-3">
                <GraduationCap className="w-5 h-5 text-green-400" />
                <h2 className="font-bold text-white text-lg tracking-wide">About Pro Smooth Pursuit</h2>
              </div>
              <div className="p-8">
                <p className="text-sm leading-relaxed mb-6 text-gray-300">
                  This pro smooth pursuit drill is designed to refine tactical mechanical reflexes, hand-eye coordination, and continuous spatial mouse accuracy. By using 1:1 hardware raw input via the Pointer Lock API, it bypasses operating system cursor acceleration to build consistent physical muscle memory for tracking fast-moving targets.
                </p>

                {/* Grid Section */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center"><Users className="w-4 h-4 text-white" /></div>
                      <h3 className="text-sm font-bold text-white">Who It's For</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Esports athletes, competitive FPS gamers (Apex Legends, Overwatch), and players looking to build consistent, acceleration-free tracking aim.</p>
                  </div>
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-green-600 flex items-center justify-center"><TrendingUp className="w-4 h-4 text-white" /></div>
                      <h3 className="text-sm font-bold text-white">Skills Improved</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Continuous motor tracking, micro-adjustments, wrist stability, dynamic object path prediction, and foveal focus limits.</p>
                  </div>
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center"><BarChart3 className="w-4 h-4 text-white" /></div>
                      <h3 className="text-sm font-bold text-white">What You'll Track</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Total Score, tracking accuracy percentage, maximum tracking streak combo, and your peak accuracy performance.</p>
                  </div>
                </div>

                {/* How to Play & Mechanics */}
                <div className="mb-8 bg-[#0b0f19]/40 border border-gray-800 rounded-xl p-6">
                  <h3 className="text-base font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Target className="w-5 h-5 text-green-500" /> How to Play & Mechanics
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-6 text-sm text-gray-300">
                    <ol className="space-y-3 list-decimal pl-5">
                      <li>Adjust your <strong>Sens</strong> and <strong>Base Speed</strong> to match your primary game.</li>
                      <li>Click <strong>Begin Drill</strong>. The screen will automatically go fullscreen and lock your mouse.</li>
                      <li>Trace the moving ball smoothly inside its boundaries. Try to predict the trajectory.</li>
                    </ol>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> <span className="text-white font-bold">Valid Tracking:</span> 1.5s of continuous tracking grants +5 PTS and +2.0s Time.</li>
                      <li className="flex items-center gap-2"><TrendingUp className="w-4 h-4 text-purple-400" /> <span className="text-white font-bold">Aggressive Scaling:</span> Difficulty continuously scales. Target size shrinks and speed increases as you succeed.</li>
                      <li className="flex items-center gap-2"><XCircle className="w-4 h-4 text-red-500" /> <span className="text-white font-bold">Misses & Distractions:</span> Losing the target for 2.0s deducts -2 PTS and immediately subtracts -1.0s from your clock.</li>
                    </ul>
                  </div>
                </div>

                {/* FAQ Section */}
                <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                  <div className="flex items-center gap-3 mb-4">
                    <Lightbulb className="w-5 h-5 text-yellow-400" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">Frequently Asked Questions</h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-bold text-gray-200">Why does the target change size and speed?</h4>
                      <p className="text-xs text-gray-400 mt-1">This drill features an adaptive difficulty algorithm. As you maintain your tracking streak, the target gradually shrinks and moves faster to push your neurological tracking limits. If you fall off, it slowly grows and slows down to let you recover.</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-200">What is the optimal Universal Sens?</h4>
                      <p className="text-xs text-gray-400 mt-1">Adjust the slider until the movement mirrors your primary game (like Overwatch, Apex, or CS2). You want your cm/360 rotation to feel identical to build 1:1 transferable muscle memory.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* FULL 4 RELATED DRILLS SECTION */}
        {!isFullscreen && (
          <section className="mt-14" aria-label="Explore related aim and response drills">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-5 rounded-full bg-green-500"></div>
              <h2 className="text-xs font-bold text-white uppercase tracking-widest font-mono">
                Explore FPS Drills
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <RelatedCard href="/drills/fps/flick-shot-training" title="Pro Flick Trainer" desc="Snap to targets in time-attack mode." color="blue" icon={<Crosshair className="w-4 h-4" />} />
              <RelatedCard href="/drills/fps/instant-response" title="Instant Response" desc="Train raw neurological reflex speed." color="purple" icon={<Zap className="w-4 h-4" />} />
              <RelatedCard href="/drills/motor/hand-eye-coordination/aim-trainer" title="Aim Trainer Elite" desc="Hone spatial coordinate click speed." color="green" icon={<Target className="w-4 h-4" />} />
              <RelatedCard href="/drills/fps/angle-hold" title="Angle Hold Trainer" desc="React to peeking targets instantly." color="red" icon={<Shield className="w-4 h-4" />} />
            </div>
          </section>
        )}

        {/* FULL FOOTER SECTION */}
        {!isFullscreen && (
          <footer className="mt-12 bg-slate-950/40 border border-slate-900 text-slate-500 rounded-xl py-10 px-6 font-mono text-[10px]" role="contentinfo">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 mb-8">
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Motor & FPS</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/motor/hand-eye-coordination/aim-trainer" className="hover:text-green-400 transition-colors">Aim Trainer Elite</Link></li>
                    <li><Link href="/drills/fps/flick-shot-training" className="hover:text-green-400 transition-colors">Flick Shot Trainer</Link></li>
                    <li><Link href="/drills/fps" className="text-green-450 hover:text-green-400 transition-colors font-bold">All FPS Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Memory</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/memory/working-memory/n-back" className="hover:text-green-400 transition-colors">3-Back Training</Link></li>
                    <li><Link href="/drills/memory/short-term-memory/color-sequence" className="hover:text-green-400 transition-colors">Color Sequence</Link></li>
                    <li><Link href="/drills/memory" className="text-green-450 hover:text-green-400 transition-colors font-bold">All Memory Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Cognitive</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/cognitive/memory/card-matching" className="hover:text-green-400 transition-colors">Memory Games</Link></li>
                    <li><Link href="/drills/cognitive/attention/divided-attention" className="hover:text-green-400 transition-colors">Attention Drills</Link></li>
                    <li><Link href="/drills/cognitive" className="text-green-450 hover:text-green-400 transition-colors font-bold">All Cognitive Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Academic</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/academic/writing-speed/typing-test" className="hover:text-green-400 transition-colors">Typing Speed Test</Link></li>
                    <li><Link href="/drills/academic/math-speed/mental-math" className="hover:text-green-400 transition-colors">Mental Math</Link></li>
                    <li><Link href="/drills/academic" className="text-green-450 hover:text-green-400 transition-colors font-bold">All Academic Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">More Sectors</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/visual" className="hover:text-green-400 transition-colors">Visual (14)</Link></li>
                    <li><Link href="/drills/physical" className="hover:text-green-400 transition-colors">Physical (11)</Link></li>
                  </ul>
                </div>
              </div>
              
              <div className="border-t border-slate-900 pt-8 text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="w-6 h-6 bg-gradient-to-br from-green-500/25 to-blue-500/25 border border-green-500/30 rounded-lg flex items-center justify-center">
                    <Target className="w-3.5 h-3.5 text-green-400" />
                  </div>
                  <span className="text-white font-black tracking-widest text-xs uppercase">SkillDrills</span>
                </div>
                <p className="text-[9px] mb-2">&copy; 2026 SkillDrills. All rights reserved.</p>
                <p className="text-[9px] max-w-2xl mx-auto leading-relaxed mb-6">
                  Open-source telemetry training platform using hardware pointer lock. Free forever. No downloads required.
                </p>
                <div className="flex items-center justify-center gap-3 flex-wrap">
                  <a href="https://youtube.com/@skilldrills.online" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors p-2.5 bg-gray-900 rounded-full hover:bg-gray-800 shadow-md"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg></a>
                  <a href="https://www.facebook.com/profile.php?id=61590093843779" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors p-2.5 bg-gray-900 rounded-full hover:bg-gray-800 shadow-md"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg></a>
                  <a href="https://x.com/skilldrillss" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors p-2.5 bg-gray-900 rounded-full hover:bg-gray-800 shadow-md"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
                  <a href="https://www.instagram.com/skilldrills.online/?__pwa=1" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors p-2.5 bg-gray-900 rounded-full hover:bg-gray-800 shadow-md"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg></a>
                  <a href="https://pinterest.com/skilldrills" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors p-2.5 bg-gray-900 rounded-full hover:bg-gray-800 shadow-md"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/></svg></a>
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
    rose: 'from-rose-500 to-pink-500',
    emerald: 'from-emerald-500 to-green-500'
  };
  return (
    <Link href={href} className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-[#0b0f19]/40 transition-all hover:-translate-y-1 hover:border-green-500/50 block p-5">
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${gradients[color]}`}></div>
      <div className="w-10 h-10 rounded-xl bg-[#050811] border border-slate-700 flex items-center justify-center text-slate-400 group-hover:text-white mb-3 shadow-inner">
        {icon}
      </div>
      <h3 className="font-bold text-base mb-1.5 text-white group-hover:text-green-400 transition-colors">{title}</h3>
      <p className="text-xs text-slate-500 mb-4">{desc}</p>
      <div className="flex items-center gap-1.5 text-green-400 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-wider">
        Start Drill <ArrowRight className="w-3.5 h-3.5" />
      </div>
    </Link>
  );
}