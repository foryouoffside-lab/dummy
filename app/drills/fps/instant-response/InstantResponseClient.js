'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';

import { 
  Activity, AlertCircle, ArrowRight, BarChart3, ChevronRight, 
  Clock, Crosshair, Eye, GraduationCap, Info, Lightbulb, 
  Maximize2, Minimize2, Play, RefreshCw, Star, Target, 
  Timer, TrendingUp, Trophy, Volume2, VolumeX, Zap, 
  Share2, Code2, Calculator, CheckCircle2, Shield, Users, Cpu, MousePointer2,
  XCircle
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

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function InstantResponseClient() {
  // === UI & Viewport State ===
  const [gameState, setGameState] = useState('start'); // 'start', 'playing', 'gameOver'
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
  const [flashBg, setFlashBg] = useState(null);

  // Analytics State
  const [analytics, setAnalytics] = useState({
    accuracy: 100,
    successfulHits: 0,
    preFires: 0,
    missedClicks: 0,
    timeouts: 0,
    avgReactionTime: 0
  });

  // === High-performance Mutable Refs ===
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  const pageRef = useRef(null);
  
  // === Game Logic Engine Refs ===
  const engine = useRef({
    crosshair: { x: 0, y: 0, initialized: false },
    target: { active: false, x: 0, y: 0, radius: 30, age: 0 },
    
    // Adaptive Difficulty (Instant Flash Mechanics)
    responseWindow: 500, // Starts strictly at 500ms
    targetRadius: 30,
    
    score: 0,
    timeLeft: DRILL_DURATION,
    nextSpawnTime: 0,
    
    // Telemetry
    successfulHits: 0,
    preFires: 0,
    missedClicks: 0,
    timeouts: 0,
    reactionTimes: [],
    totalActions: 0
  });

  const cmPer360 = (30 / universalSens).toFixed(1);

  // === Initialization & Local Storage ===
  useEffect(() => {
    try {
      const savedSens = localStorage.getItem('instantResp_sens');
      if (savedSens) setUniversalSens(parseFloat(savedSens));
      const savedBest = localStorage.getItem('instantResp_bestScore');
      if (savedBest) setBestScore(parseInt(savedBest, 10));
    } catch (e) {}
  }, []);

  useEffect(() => {
    if (gameState !== 'playing') {
      try { localStorage.setItem('instantResp_sens', universalSens.toString()); } catch (e) {}
    }
    if (audioSynth) audioSynth.setEnabled(soundEnabled);
  }, [universalSens, gameState, soundEnabled]);

  // === Core Game Management ===
  const endGame = useCallback(() => {
    setGameState('gameOver');
    if (document.pointerLockElement) document.exitPointerLock();
    
    const e = engine.current;
    
    // Calculate Final Analytics
    const finalAccuracy = e.totalActions > 0 ? Math.round((e.successfulHits / e.totalActions) * 100) : 0;
    const avgRt = e.reactionTimes.length > 0 
      ? Math.round(e.reactionTimes.reduce((a, b) => a + b, 0) / e.reactionTimes.length) 
      : 0;

    setAnalytics({
      accuracy: finalAccuracy,
      successfulHits: e.successfulHits,
      preFires: e.preFires,
      missedClicks: e.missedClicks,
      timeouts: e.timeouts,
      avgReactionTime: avgRt
    });

    setBestScore(prev => {
      if (e.score > prev) {
        setIsNewBest(true);
        try { localStorage.setItem('instantResp_bestScore', e.score.toString()); } catch(err){}
        return e.score;
      }
      return prev;
    });
  }, []);

  const spawnTarget = useCallback((width, height) => {
    // Micro-flick randomization around center
    const xOffset = (Math.random() * 200) - 100;
    const yOffset = (Math.random() * 150) - 75;
    
    engine.current.target = {
      active: true,
      x: (width / 2) + xOffset,
      y: (height / 2) + yOffset,
      radius: engine.current.targetRadius,
      age: 0
    };
  }, []);

  const startGame = useCallback(async () => {
    if (audioSynth) audioSynth.init(); 

    setIsNewBest(false);
    setScore(0);
    setAnalytics({ accuracy: 100, successfulHits: 0, preFires: 0, missedClicks: 0, timeouts: 0, avgReactionTime: 0 });
    setTimeLeft(DRILL_DURATION);
    setGameState('playing');
    
    // Reset Engine State
    engine.current = {
      crosshair: { ...engine.current.crosshair },
      target: { active: false, x: 0, y: 0, radius: 30, age: 0 },
      responseWindow: 500, // Resets to 500ms max flash
      targetRadius: 30,
      score: 0,
      timeLeft: DRILL_DURATION,
      nextSpawnTime: performance.now() + 500, // Initial delay
      
      successfulHits: 0, preFires: 0, missedClicks: 0, timeouts: 0, reactionTimes: [], totalActions: 0
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
    }, 150);
  }, []);

  // === Raw Mouse Input & Firing Listeners ===
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
      engine.current.crosshair.x = Math.max(0, Math.min(cvs.width, engine.current.crosshair.x + dx));
      engine.current.crosshair.y = Math.max(0, Math.min(cvs.height, engine.current.crosshair.y + dy));
    };

    const handleMouseDown = (e) => {
      if (e.target.tagName === 'BUTTON' || e.target.closest('button')) return;
      if (gameState === 'playing') {
        if (!pointerLocked && canvasRef.current) {
          canvasRef.current.requestPointerLock();
        } else if (pointerLocked) {
          // SHOOT LOGIC
          const eRef = engine.current;
          eRef.totalActions++;

          if (!eRef.target.active) {
            // Pre-fire Penalty (-2 PTS, -1.0s Time)
            eRef.preFires++;
            eRef.score = Math.max(0, eRef.score - 2);
            eRef.timeLeft -= 1; 
            setScore(eRef.score);
            if (audioSynth) audioSynth.playFail();
            
            setFlashBg('red');
            setTimeout(() => setFlashBg(null), 100);
          } else {
            const ch = eRef.crosshair;
            const t = eRef.target;
            const dist = Math.hypot(ch.x - t.x, ch.y - t.y);
            
            if (dist <= t.radius + 8) { // Slight forgiveness hitbox
              // Valid Hit (+5 PTS, +2.0s Time)
              const rt = t.age;
              eRef.reactionTimes.push(rt);
              eRef.successfulHits++;
              
              eRef.score += 5;
              eRef.timeLeft += 2; 
              setScore(eRef.score);
              if (audioSynth) audioSynth.playSuccess();
              
              // Dynamic Difficulty Incrementation (Faster & Smaller)
              // Reduces flash time down to an absolute minimum of 25ms
              eRef.responseWindow = Math.max(25, eRef.responseWindow - 15);
              eRef.targetRadius = Math.max(10, eRef.targetRadius - 0.5);
              
              eRef.target.active = false;
              eRef.nextSpawnTime = performance.now() + (300 + Math.random() * 600);
              
              setFlashBg('green');
              setTimeout(() => setFlashBg(null), 100);
            } else {
              // Missed Click Penalty (-2 PTS, -1.0s Time)
              eRef.missedClicks++;
              eRef.score = Math.max(0, eRef.score - 2);
              eRef.timeLeft -= 1; 
              
              // Forgiveness mechanic
              eRef.responseWindow = Math.min(500, eRef.responseWindow + 20);
              eRef.targetRadius = Math.min(30, eRef.targetRadius + 1);
              
              setScore(eRef.score);
              if (audioSynth) audioSynth.playFail();
              
              setFlashBg('red');
              setTimeout(() => setFlashBg(null), 100);
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

  // === Render & Physics Loop (Delta Time) ===
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
    let secondAccumulator = 0;

    const loop = (time) => {
      const deltaTimeMs = time - lastTime;
      lastTime = time;
      const dt = Math.min(deltaTimeMs / 1000, 0.1); 
      const e = engine.current;

      if (gameState === 'playing' && pointerLocked) {
        
        // Custom Delta-Time Clock
        secondAccumulator += dt;
        if (secondAccumulator >= 1.0) {
          e.timeLeft -= 1;
          setTimeLeft(e.timeLeft);
          secondAccumulator -= 1.0;
          
          if (e.timeLeft <= 0) {
            endGame();
            return;
          }
        }

        // Target Spawning & Aging
        if (!e.target.active && time >= e.nextSpawnTime) {
          spawnTarget(cvs.width, cvs.height);
        }

        if (e.target.active) {
          e.target.age += deltaTimeMs;

          if (e.target.age >= e.responseWindow) {
            // Timeout Penalty (-2 PTS, -1.0s Time)
            e.target.active = false;
            e.timeouts++;
            e.totalActions++;
            e.score = Math.max(0, e.score - 2);
            e.timeLeft -= 1;
            
            // Forgiveness
            e.responseWindow = Math.min(500, e.responseWindow + 20);
            e.targetRadius = Math.min(30, e.targetRadius + 1.5);
            
            setScore(e.score);
            if (audioSynth) audioSynth.playFail();
            
            setFlashBg('red');
            setTimeout(() => setFlashBg(null), 100);

            e.nextSpawnTime = time + (300 + Math.random() * 600);
          }
        }
      }

      // --- RENDERING PHASE ---
      ctx.fillStyle = '#050508';
      ctx.fillRect(0, 0, cvs.width, cvs.height);

      // Grid
      ctx.strokeStyle = 'rgba(168, 85, 247, 0.04)';
      ctx.lineWidth = 1;
      for (let i = 0; i < cvs.width; i += 60) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, cvs.height); ctx.stroke(); }
      for (let j = 0; j < cvs.height; j += 60) { ctx.beginPath(); ctx.moveTo(0, j); ctx.lineTo(cvs.width, j); ctx.stroke(); }

      // Draw Target
      if (e.target.active && (gameState === 'playing' || gameState === 'start')) {
        const t = e.target;
        const lifePercent = 1 - (t.age / e.responseWindow);
        
        ctx.shadowBlur = 15;
        ctx.shadowColor = '#a855f7';
        ctx.fillStyle = '#a855f7';
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;

        ctx.beginPath();
        ctx.arc(t.x, t.y, t.radius, 0, Math.PI * 2);
        ctx.fill(); ctx.stroke();
        
        // Inner Dot
        ctx.shadowBlur = 0;
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(t.x, t.y, t.radius * 0.3, 0, Math.PI * 2);
        ctx.fill();

        // Shrinking Timer Ring
        ctx.strokeStyle = lifePercent > 0.5 ? '#22c55e' : (lifePercent > 0.25 ? '#eab308' : '#ef4444');
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(t.x, t.y, t.radius + 6 + (Math.max(0, lifePercent) * 25), 0, Math.PI * 2);
        ctx.stroke();
      }

      // Draw Crosshair
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
  }, [gameState, pointerLocked, spawnTarget, endGame]);

  const shareDrillLink = useCallback(() => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    if (navigator.share) {
      navigator.share({ title: 'Instant Response Trainer', url }).catch(() => {});
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
                <li><Link href="/drills/fps" className="hover:text-gray-300">FPS</Link></li>
                <li><ChevronRight className="w-4 h-4 text-gray-600" /></li>
                <li className="text-purple-400 font-medium">Instant Response Trainer</li>
              </ol>
            </nav>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl shadow-[0_0_20px_rgba(168,85,247,0.3)]">
                  <Zap className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Instant Response Trainer</h1>
                  <p className="text-sm text-gray-400 mt-1 font-medium">Desktop Exclusive • Endless Time-Attack</p>
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
          <div className="grid grid-cols-4 lg:grid-cols-4 gap-2 mb-2">
            <StatCard icon={<Target className="text-purple-400" />} value={score} label="Score / Reflex PTS" />
            <StatCard icon={<Timer className={timeLeft <= 10 ? 'text-red-400 animate-pulse' : 'text-purple-400'} />} value={timeLeft} label="Time" unit="s" />
            <StatCard icon={<Info className="text-blue-400" />} value={`${universalSens.toFixed(2)}x`} label="Sens" />
            <StatCard icon={<Trophy className="text-yellow-500" />} value={bestScore} label="Best Score" />
          </div>
        )}

        {/* Engine Container */}
        <div 
          ref={containerRef} 
          className={`relative overflow-hidden transition-colors outline-none ${
            isFullscreen ? 'w-full h-full' : 'w-full aspect-video min-h-[500px] rounded-2xl border border-gray-700 shadow-2xl'
          }`}
          style={{ backgroundColor: flashBg === 'red' ? '#450a0a' : flashBg === 'green' ? '#064e3b' : '#05060b' }}
        >
          {/* Progress Bar */}
          {gameState === 'playing' && (
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gray-900 z-[60]">
              <div 
                className={`h-full transition-all duration-1000 ease-linear ${timeLeft <= 10 ? 'bg-red-500 animate-pulse' : 'bg-purple-600'}`}
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
                <AlertCircle className="w-12 h-12 text-purple-500 mx-auto mb-4" />
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
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl mx-auto flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(168,85,247,0.3)]">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-black mb-3 tracking-tight text-white uppercase">Instant Response</h2>
                <p className="text-sm mb-6 text-gray-400 leading-relaxed">
                  Snap to the central flashing targets instantly. The target flash starts at 500ms and aggressively scales down to 25ms. Accurate hits build time and score.
                </p>

                {/* Configuration Panel */}
                <div className="mb-8 p-5 bg-black/50 rounded-xl border border-gray-800 text-left space-y-5">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-xs text-gray-400 font-bold uppercase tracking-wider flex items-center gap-2">
                        <Crosshair className="w-4 h-4 text-purple-500"/> Universal Sens
                      </label>
                      <span className="text-purple-400 font-mono text-sm font-bold">{universalSens.toFixed(2)}x</span>
                    </div>
                    <input 
                      type="range" min="0.1" max="3.0" step="0.05" 
                      value={universalSens} 
                      onChange={(e) => setUniversalSens(parseFloat(e.target.value))} 
                      className="w-full h-1.5 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-purple-500" 
                    />
                    <div className="text-[10px] text-gray-500 mt-1.5 text-right">Approx: {cmPer360} cm/360</div>
                  </div>
                </div>
                
                <button 
                  onClick={startGame}
                  className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-black text-lg hover:brightness-110 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_20px_rgba(168,85,247,0.3)]"
                >
                  <Play className="w-6 h-6 fill-white" /> BEGIN TACTICAL DRILL
                </button>
              </div>
            </div>
          )}

          {/* GAME OVER DASHBOARD */}
          {gameState === 'gameOver' && (
            <div className="absolute inset-0 flex items-center justify-center z-50 bg-black/90 backdrop-blur-md p-4 animate-in fade-in duration-300 overflow-y-auto">
              <div className="rounded-3xl max-w-2xl w-full shadow-2xl border border-gray-800 bg-gray-950 overflow-hidden my-auto">
                <div className="bg-gradient-to-br from-purple-900/40 to-indigo-900/40 p-6 border-b border-gray-800 text-center relative">
                  {isNewBest && (
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-yellow-500 text-black text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-[0_0_15px_rgba(234,179,8,0.5)]">
                      ⭐ New Personal Best
                    </div>
                  )}
                  <h2 className="text-2xl font-black text-white tracking-tight mt-4">Reflex Analysis Complete</h2>
                  <p className="text-purple-400 font-medium text-sm mt-1">Endless Time Attack Mode</p>
                </div>

                <div className="p-6">
                  {/* Top Stats */}
                  <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <div className="flex-1 bg-gray-900 rounded-2xl p-4 border border-gray-800 flex justify-between items-center">
                      <div>
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1 block">Final Score</span>
                        <div className="flex items-end gap-1">
                          <span className="text-4xl font-black text-white leading-none">{score}</span>
                          <span className="text-xs text-gray-500 font-bold mb-1">PTS</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1 block">Hit Accuracy</span>
                        <span className={`text-3xl font-black ${analytics.accuracy >= 80 ? 'text-green-400' : analytics.accuracy >= 50 ? 'text-yellow-400' : 'text-red-400'}`}>
                          {analytics.accuracy}%
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Reaction Diagnostics Block */}
                  <div className="bg-[#0a0a0a] border border-purple-900/50 rounded-xl p-5 mb-6 text-left shadow-inner">
                    <h3 className="text-xs font-bold text-purple-400 font-mono uppercase tracking-widest border-b border-purple-900/50 pb-2 mb-4 flex items-center gap-2">
                      <Timer className="w-4 h-4 text-purple-400" />
                      REACTION TELEMETRY DIAGNOSTICS
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs leading-relaxed text-gray-300">
                      
                      <div className="space-y-3 sm:border-r border-gray-800 sm:pr-6">
                        <p className="font-bold text-white uppercase text-[10px] tracking-wider font-mono">Performance Log:</p>
                        <ul className="space-y-2">
                          <li className="flex justify-between items-center bg-gray-900/50 p-2 rounded border border-gray-800">
                            <span className="text-gray-400">Avg Reaction Time:</span>
                            <span className={`font-bold ${analytics.avgReactionTime > 280 ? 'text-red-400' : 'text-green-400'}`}>{analytics.avgReactionTime} ms</span>
                          </li>
                          <li className="flex justify-between items-center bg-gray-900/50 p-2 rounded border border-gray-800">
                            <span className="text-gray-400">Successful Hits:</span>
                            <span className="font-bold text-blue-400">{analytics.successfulHits}</span>
                          </li>
                          <li className="flex justify-between items-center bg-gray-900/50 p-2 rounded border border-gray-800">
                            <span className="text-gray-400">Pre-Fires (Too Early):</span>
                            <span className="font-bold text-yellow-500">{analytics.preFires}</span>
                          </li>
                          <li className="flex justify-between items-center bg-gray-900/50 p-2 rounded border border-gray-800">
                            <span className="text-gray-400">Target Timeouts:</span>
                            <span className="font-bold text-red-500">{analytics.timeouts}</span>
                          </li>
                        </ul>
                      </div>

                      <div className="space-y-3 flex flex-col justify-between">
                        <div>
                          <p className="font-bold text-white uppercase text-[10px] tracking-wider font-mono mb-2">Prescribed Advice:</p>
                          <p className="text-gray-400 leading-relaxed font-sans">
                            {analytics.preFires > 3 ? (
                              <span className="text-yellow-300">You have too many pre-fires ({analytics.preFires}). You are anticipating the spawn and clicking before you acquire the visual target. Wait for the visual stimulus.</span>
                            ) : analytics.timeouts > 3 ? (
                              <span className="text-red-300">The drill dynamically speeds up as you hit targets. You are struggling to keep up with the shrinking reaction window. Focus purely on central foveal vision.</span>
                            ) : (
                              <span className="text-green-300">Excellent discipline! Low pre-fires and solid reaction times. Keep pushing the endless scaling to lower your baseline response time.</span>
                            )}
                          </p>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <button onClick={startGame} className="flex-1 py-4 bg-purple-600 text-white rounded-xl font-black tracking-wide hover:bg-purple-500 transition-all active:scale-95 flex items-center justify-center gap-2 shadow-lg">
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
                <Info className="w-5 h-5 text-purple-400" /><h2 className="font-bold text-white text-lg tracking-wide">Drill Instructions & Scoring</h2>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-5">
                  <RuleItem num="1" color="green" text="Hit Target" highlight="+5 PTS | +2.0s Time" result="Speeds up & shrinks" />
                  <RuleItem num="2" color="indigo" text="Instant Flash" highlight="500ms down to 25ms" result="Response window scales" />
                </div>
                <div className="space-y-5">
                  <RuleItem num="3" color="red" text="Miss / Timeout" highlight="-2 PTS | -1.0s Penalty" result="Accuracy matters most" />
                  <RuleItem num="4" color="purple" text="Strict Tracking" highlight="Desktop Exclusive" result="1:1 Raw Mouse Input" />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ABOUT THIS DRILL SECTION */}
        {!isFullscreen && (
          <section className="mt-12" aria-label="About this drill">
            <div className="rounded-2xl border border-gray-800 overflow-hidden bg-gray-900 shadow-xl">
              <div className="px-6 py-5 border-b border-gray-800 bg-black/40 flex items-center gap-3">
                <GraduationCap className="w-5 h-5 text-purple-400" />
                <h2 className="font-bold text-white text-lg tracking-wide">About Instant Response Trainer</h2>
              </div>
              <div className="p-8">
                <p className="text-sm leading-relaxed mb-6 text-gray-300">
                  This drill isolates pure raw reaction time and central neurological click reflexes. It enforces strict time penalties for missing or allowing targets to expire. By utilizing the browser's Pointer Lock API, it extracts 1:1 raw mouse telemetry uninhibited by OS cursor smoothing.
                </p>

                {/* Grid Section */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center"><Users className="w-4 h-4 text-white" /></div>
                      <h3 className="text-sm font-bold text-white">Who It's For</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Esports athletes, competitive FPS gamers, and players looking to train pure reaction speed combined with high-frequency micro-flicks.</p>
                  </div>
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-green-600 flex items-center justify-center"><TrendingUp className="w-4 h-4 text-white" /></div>
                      <h3 className="text-sm font-bold text-white">Skills Improved</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Raw motor reflex speed, central visual processing latency, impulse control (preventing pre-fires), and immediate click-timing accuracy.</p>
                  </div>
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center"><BarChart3 className="w-4 h-4 text-white" /></div>
                      <h3 className="text-sm font-bold text-white">What You'll Track</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Net Score, Average Reaction Latency (ms), Accuracy Percentage, and the exact count of anticipation pre-fires vs timeouts.</p>
                  </div>
                </div>

                {/* How to Play & Mechanics */}
                <div className="mb-8 bg-[#0b0f19]/40 border border-gray-800 rounded-xl p-6">
                  <h3 className="text-base font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Target className="w-5 h-5 text-purple-500" /> How to Play & Mechanics
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-6 text-sm text-gray-300">
                    <ol className="space-y-3 list-decimal pl-5">
                      <li>Adjust your <strong>Sens</strong> to match your main game speed.</li>
                      <li>Click <strong>Begin Drill</strong>. The screen will automatically go fullscreen and lock your mouse.</li>
                      <li>Wait for the target to spawn near the center. Micro-flick and shoot immediately.</li>
                    </ol>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> <span className="text-white font-bold">Valid Hits:</span> Hitting targets grants +5 PTS and +2.0s to your total survival clock.</li>
                      <li className="flex items-center gap-2"><TrendingUp className="w-4 h-4 text-purple-400" /> <span className="text-white font-bold">Aggressive Scaling:</span> Flash times start at 500ms and rapidly decrease down to 25ms.</li>
                      <li className="flex items-center gap-2"><XCircle className="w-4 h-4 text-red-500" /> <span className="text-white font-bold">Misses & Pre-Fires:</span> Clicking early or letting the target timeout deducts -2 PTS and -1.0s Time.</li>
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
                      <h4 className="text-sm font-bold text-gray-200">Why does my timer drop so fast?</h4>
                      <p className="text-xs text-gray-400 mt-1">Unlike standard aim trainers, this drill actively punishes bad accuracy. Missing a shot, pre-firing, or letting the target timeout pulls time directly off your clock. You must hit targets to earn time back and survive.</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-200">How fast does the target flash get?</h4>
                      <p className="text-xs text-gray-400 mt-1">The drill's initial response window gives you 500ms (half a second) to react. For every successful hit, this window drastically shrinks, bottoming out at an absolute minimum flash of 25ms. This forces you out of your comfort zone and builds true reflex speed.</p>
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
              <div className="w-1 h-5 rounded-full bg-purple-500"></div>
              <h2 className="text-xs font-bold text-white uppercase tracking-widest font-mono">
                Explore FPS Drills
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <RelatedCard href="/drills/fps/flick-shot-training" title="Pro Flick Trainer" desc="Snap to targets in time-attack mode." color="blue" icon={<Crosshair className="w-4 h-4" />} />
              <RelatedCard href="/drills/fps/180-degree-awareness" title="180° Awareness Pro" desc="Alternate snapping opposite horizons." color="orange" icon={<Zap className="w-4 h-4" />} />
              <RelatedCard href="/drills/motor/hand-eye-coordination/aim-trainer" title="Aim Trainer Elite" desc="Hone spatial coordinate click speed." color="green" icon={<Target className="w-4 h-4" />} />
              <RelatedCard href="/drills/fps/angle-hold" title="Angle Hold Trainer" desc="React to peeking targets instantly." color="red" icon={<Shield className="w-4 h-4" />} />
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
                    <li><Link href="/drills/motor/hand-eye-coordination/aim-trainer" className="hover:text-purple-400 transition-colors">Aim Trainer Elite</Link></li>
                    <li><Link href="/drills/fps/flick-shot-training" className="hover:text-purple-400 transition-colors">Flick Shot Trainer</Link></li>
                    <li><Link href="/drills/fps" className="text-purple-450 hover:text-purple-400 transition-colors font-bold">All FPS Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Memory</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/memory/working-memory/n-back" className="hover:text-purple-400 transition-colors">3-Back Training</Link></li>
                    <li><Link href="/drills/memory/short-term-memory/color-sequence" className="hover:text-purple-400 transition-colors">Color Sequence</Link></li>
                    <li><Link href="/drills/memory" className="text-purple-450 hover:text-purple-400 transition-colors font-bold">All Memory Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Cognitive</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/cognitive/memory/card-matching" className="hover:text-purple-400 transition-colors">Memory Games</Link></li>
                    <li><Link href="/drills/cognitive/attention/divided-attention" className="hover:text-purple-400 transition-colors">Attention Drills</Link></li>
                    <li><Link href="/drills/cognitive" className="text-purple-450 hover:text-purple-400 transition-colors font-bold">All Cognitive Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Academic</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/academic/writing-speed/typing-test" className="hover:text-purple-400 transition-colors">Typing Speed Test</Link></li>
                    <li><Link href="/drills/academic/math-speed/mental-math" className="hover:text-purple-400 transition-colors">Mental Math</Link></li>
                    <li><Link href="/drills/academic" className="text-purple-450 hover:text-purple-400 transition-colors font-bold">All Academic Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">More Sectors</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/visual" className="hover:text-purple-400 transition-colors">Visual (14)</Link></li>
                    <li><Link href="/drills/physical" className="hover:text-purple-400 transition-colors">Physical (11)</Link></li>
                  </ul>
                </div>
              </div>
              
              <div className="border-t border-slate-900 pt-8 text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="w-6 h-6 bg-gradient-to-br from-purple-500/25 to-indigo-500/25 border border-purple-500/30 rounded-lg flex items-center justify-center">
                    <Crosshair className="w-3.5 h-3.5 text-purple-400" />
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
    <Link href={href} className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-[#0b0f19]/40 transition-all hover:-translate-y-1 hover:border-purple-500/50 block p-5">
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${gradients[color]}`}></div>
      <div className="w-10 h-10 rounded-xl bg-[#050811] border border-slate-700 flex items-center justify-center text-slate-400 group-hover:text-white mb-3 shadow-inner">
        {icon}
      </div>
      <h3 className="font-bold text-base mb-1.5 text-white group-hover:text-purple-400 transition-colors">{title}</h3>
      <p className="text-xs text-slate-500 mb-4">{desc}</p>
      <div className="flex items-center gap-1.5 text-purple-400 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-wider">
        Start Drill <ArrowRight className="w-3.5 h-3.5" />
      </div>
    </Link>
  );
}