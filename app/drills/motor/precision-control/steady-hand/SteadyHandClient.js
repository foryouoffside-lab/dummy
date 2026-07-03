'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';

import { 
  Activity, AlertCircle, ArrowRight, BarChart3, ChevronRight, 
  Clock, Crosshair, Eye, GraduationCap, Info, Lightbulb, 
  Maximize2, Minimize2, Play, RefreshCw, Target, 
  Timer, TrendingUp, Trophy, Volume2, VolumeX, 
  Share2, CheckCircle2, Zap, Users, Sparkles, XCircle, Route,
  Code2, Calculator, Repeat
} from 'lucide-react';

// ============================================================
// ZERO-LATENCY AUDIO SYNTHESIZER
// ============================================================
class AudioSynthesizer {
  constructor() {
    this.ctx = null;
    this.enabled = true;
    this.lastHeartbeat = 0;
  }
  
  init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
  }

  playSuccess() {
    if (!this.enabled || !this.ctx) return;
    try {
      if (this.ctx.state === 'suspended') this.ctx.resume();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1200, this.ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.15);
      osc.connect(gain); gain.connect(this.ctx.destination);
      osc.start(); osc.stop(this.ctx.currentTime + 0.15);
    } catch(e) {}
  }

  playFail() {
    if (!this.enabled || !this.ctx) return;
    try {
      if (this.ctx.state === 'suspended') this.ctx.resume();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(150, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.2);
      osc.connect(gain); gain.connect(this.ctx.destination);
      osc.start(); osc.stop(this.ctx.currentTime + 0.2);
    } catch(e) {}
  }

  playLevelUp() {
    if (!this.enabled || !this.ctx) return;
    try {
      if (this.ctx.state === 'suspended') this.ctx.resume();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, this.ctx.currentTime);
      osc.frequency.setValueAtTime(659.25, this.ctx.currentTime + 0.08);
      osc.frequency.setValueAtTime(783.99, this.ctx.currentTime + 0.16);
      osc.frequency.setValueAtTime(1046.50, this.ctx.currentTime + 0.24);
      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.4);
      osc.connect(gain); gain.connect(this.ctx.destination);
      osc.start(); osc.stop(this.ctx.currentTime + 0.4);
    } catch(e) {}
  }

  playHeartbeat() {
    if (!this.enabled || !this.ctx) return;
    try {
      const n = this.ctx.currentTime;
      if (n - this.lastHeartbeat < 0.8) return; 
      this.lastHeartbeat = n;

      const o = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      o.connect(g); g.connect(this.ctx.destination);
      
      o.type = 'sine';
      o.frequency.setValueAtTime(50, n);
      o.frequency.exponentialRampToValueAtTime(30, n + 0.2);
      g.gain.setValueAtTime(0.3, n);
      g.gain.exponentialRampToValueAtTime(0.001, n + 0.4);
      
      o.start(n); o.stop(n + 0.4);
    } catch (e) {}
  }

  setEnabled(status) {
    this.enabled = status;
  }
}

const audioSynth = typeof window !== 'undefined' ? new AudioSynthesizer() : null;
const START_DURATION = 60; 

export default function SteadyHandClient() {
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
  const [timeLeft, setTimeLeft] = useState(START_DURATION);
  const [isNewBest, setIsNewBest] = useState(false);
  const [comboMult, setComboMult] = useState(1.0);
  const [uiLevel, setUiLevel] = useState(1);

  // Analytics State
  const [analytics, setAnalytics] = useState({
    laps: 0,
    mistakes: 0,
    maxStreak: 0,
    levelReached: 1,
    gradeData: { grade: 'D', color: 'text-slate-500', advice: '' }
  });

  // === High-performance Mutable Refs ===
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  const pageRef = useRef(null);
  
  // === Game Logic Engine Refs ===
  const engine = useRef({
    crosshair: { x: 0, y: 0, initialized: false },
    path: [],
    
    // Survival & Scaling Mechanics
    score: 0,
    timeLeft: START_DURATION,
    level: 1,
    
    combo: 0,
    maxCombo: 0,
    comboMultiplier: 1.0,
    pathThickness: 16, 
    
    // Telemetry & VFX
    laps: 0,
    mistakes: 0,
    screenShake: 0,
    flashRed: 0
  });

  const cmPer360 = (30 / universalSens).toFixed(1);

  // === Initialization & Local Storage ===
  useEffect(() => {
    try {
      const savedSens = localStorage.getItem('steadyHandSurvival_sens');
      if (savedSens) setUniversalSens(parseFloat(savedSens));
      const savedBest = localStorage.getItem('steadyHandSurvival_bestScore');
      if (savedBest) setBestScore(parseInt(savedBest, 10));
    } catch (e) {}
  }, []);

  useEffect(() => {
    if (gameState !== 'playing') {
      try { localStorage.setItem('steadyHandSurvival_sens', universalSens.toString()); } catch (e) {}
    }
    if (audioSynth) audioSynth.setEnabled(soundEnabled);
  }, [universalSens, gameState, soundEnabled]);

  // === FULLSCREEN LOGIC ===
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

  // === Core Game Management ===
  const endGame = useCallback(() => {
    setGameState('gameOver');
    if (document.pointerLockElement) document.exitPointerLock();
    
    const e = engine.current;

    let grade = 'D';
    let gradeColor = 'text-gray-400';
    let advice = 'Keep practicing! Your hand is jittery. Focus on drawing smooth, continuous lines rather than making small, jerky corrections.';
    
    if (e.level >= 15 && e.mistakes < 5) {
      grade = 'S+';
      gradeColor = 'text-yellow-400';
      advice = 'Elite Smoothness! Your fine motor control is surgically precise. You flawlessly handled the extreme micro-adjustments.';
    } else if (e.level >= 10 && e.mistakes < 10) {
      grade = 'S';
      gradeColor = 'text-yellow-500';
      advice = 'Outstanding tracking! You have incredibly stable hand control. Try to push your lap speed higher to rack up massive combo points.';
    } else if (e.level >= 7) {
      grade = 'A';
      gradeColor = 'text-fuchsia-400';
      advice = 'Great tracking stability! You struggled slightly as the path became narrower. Focus on preventing over-corrections.';
    } else if (e.level >= 4) {
      grade = 'B';
      gradeColor = 'text-cyan-400';
      advice = 'Good fundamentals. You are letting your combo reset too often. Aim for consistency by keeping your crosshair strictly centered.';
    } else if (e.level >= 2) {
      grade = 'C';
      gradeColor = 'text-indigo-400';
      advice = 'Average performance. Your path tracking is erratic. Lower your sensitivity to give yourself a wider margin of physical error.';
    }

    setAnalytics({
      laps: e.laps,
      mistakes: e.mistakes,
      maxStreak: e.maxCombo,
      levelReached: e.level,
      gradeData: { grade, color: gradeColor, advice }
    });

    setBestScore(prev => {
      const finalScore = Math.floor(e.score);
      if (finalScore > prev) {
        setIsNewBest(true);
        try { localStorage.setItem('steadyHandSurvival_bestScore', finalScore.toString()); } catch(err){}
        return finalScore;
      }
      return prev;
    });
  }, []);

  const generatePath = useCallback((width, height, level) => {
    const segments = Math.min(150, 10 + (level * 6)); 
    const startX = 100;
    const endX = width - 100;
    const step = (endX - startX) / segments;
    
    const amplitude = Math.min((height / 2) - 40, 40 + (level * 15)); 
    
    const newPath = [];
    let curY = height / 2;
    
    for (let i = 0; i <= segments; i++) {
      if (i === 0 || i === segments) {
        curY = height / 2; 
      } else {
        curY += (Math.random() - 0.5) * amplitude;
        curY = Math.max(60, Math.min(height - 60, curY));
      }
      newPath.push({ x: startX + i * step, y: curY });
    }
    return newPath;
  }, []);

  const resetCrosshairToStart = useCallback((height) => {
    engine.current.crosshair.x = 50; 
    engine.current.crosshair.y = height / 2;
  }, []);

  const startGame = useCallback(async () => {
    if (audioSynth) audioSynth.init(); 

    setIsNewBest(false);
    setScore(0);
    setComboMult(1.0);
    setUiLevel(1);
    setTimeLeft(START_DURATION);
    setGameState('playing');
    
    engine.current = {
      crosshair: { ...engine.current.crosshair },
      path: [],
      score: 0,
      timeLeft: START_DURATION,
      level: 1,
      combo: 0,
      maxCombo: 0,
      comboMultiplier: 1.0,
      pathThickness: 16, 
      laps: 0, mistakes: 0, screenShake: 0, flashRed: 0
    };

    if (containerRef.current && !document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(()=>{});
    }

    setTimeout(() => {
      if (canvasRef.current && !document.pointerLockElement) {
        canvasRef.current.requestPointerLock().catch(()=>{});
        engine.current.path = generatePath(canvasRef.current.width, canvasRef.current.height, 1);
        resetCrosshairToStart(canvasRef.current.height);
      }
    }, 150);
  }, [generatePath, resetCrosshairToStart]);

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
      engine.current.crosshair.x = Math.max(0, Math.min(cvs.width, engine.current.crosshair.x + dx));
      engine.current.crosshair.y = Math.max(0, Math.min(cvs.height, engine.current.crosshair.y + dy));
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, [gameState, pointerLocked, universalSens]);

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
          if (engine.current.path.length === 0) {
            engine.current.path = generatePath(width, height, engine.current.level);
          }
          if (!engine.current.crosshair.initialized) {
            resetCrosshairToStart(height);
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
      const dt = Math.min(deltaTimeMs / 1000, 0.033);
      const e = engine.current;

      if (gameState === 'playing' && pointerLocked && e.path.length > 0) {
        
        e.timeLeft -= dt;
        
        if (e.timeLeft <= 0) {
          endGame();
          return;
        }

        const ch = e.crosshair;
        const startZoneEnd = 100;
        const endZoneStart = cvs.width - 100;

        // Collision Logic
        if (ch.x > startZoneEnd && ch.x < endZoneStart) {
          let onPath = false;
          
          for (let i = 0; i < e.path.length - 1; i++) {
            const p1 = e.path[i];
            const p2 = e.path[i + 1];
            
            if (ch.x >= p1.x - e.pathThickness && ch.x <= p2.x + e.pathThickness) {
              const l2 = (p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2;
              const t = Math.max(0, Math.min(1, ((ch.x - p1.x) * (p2.x - p1.x) + (ch.y - p1.y) * (p2.y - p1.y)) / l2));
              const projX = p1.x + t * (p2.x - p1.x);
              const projY = p1.y + t * (p2.y - p1.y);
              const dist = Math.hypot(ch.x - projX, ch.y - projY);
              
              if (dist <= e.pathThickness) {
                onPath = true;
                break;
              }
            }
          }

          if (!onPath) {
            e.mistakes++;
            e.timeLeft = Math.max(0, e.timeLeft - 3.0); 
            e.combo = 0;
            e.comboMultiplier = 1.0;
            e.screenShake = 15;
            e.flashRed = 0.25;
            
            setComboMult(1.0);
            if (audioSynth) audioSynth.playFail();

            resetCrosshairToStart(cvs.height);
          }

        } else if (ch.x >= endZoneStart) {
          e.laps++;
          e.combo++;
          if (e.combo > e.maxCombo) e.maxCombo = e.combo;
          
          e.comboMultiplier = Math.min(3.0, 1.0 + (e.combo * 0.5));
          e.score += 100 * e.comboMultiplier; 
          e.timeLeft = Math.min(60.0, e.timeLeft + 10.0);
          
          const newLevel = Math.floor(e.score / 100) + 1;
          if (newLevel > e.level) {
            e.level = newLevel;
            e.pathThickness = Math.max(4, 16 - Math.floor(e.level / 3));
            if (audioSynth) audioSynth.playLevelUp();
          } else {
            if (audioSynth) audioSynth.playSuccess();
          }
          
          setScore(Math.floor(e.score));
          setComboMult(e.comboMultiplier);
          
          e.path = generatePath(cvs.width, cvs.height, e.level);
          resetCrosshairToStart(cvs.height);
        }

        if (e.timeLeft <= 15 && audioSynth) {
          audioSynth.playHeartbeat();
        }

        if (e.screenShake > 0) e.screenShake -= dt * 45;
        if (e.flashRed > 0) e.flashRed -= dt * 2.0;

        setTimeLeft(e.timeLeft);
        setUiLevel(e.level);
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

      ctx.strokeStyle = 'rgba(249, 115, 22, 0.03)';
      ctx.lineWidth = 1; 
      for(let i = 0; i < cvs.width; i+= 50) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, cvs.height); ctx.stroke(); }
      for(let j = 0; j < cvs.height; j+= 50) { ctx.beginPath(); ctx.moveTo(0, j); ctx.lineTo(cvs.width, j); ctx.stroke(); }

      ctx.fillStyle = 'rgba(0, 255, 136, 0.1)';
      ctx.fillRect(0, 0, 100, cvs.height);
      ctx.fillStyle = 'rgba(59, 130, 246, 0.1)';
      ctx.fillRect(cvs.width - 100, 0, 100, cvs.height);

      if (e.path.length > 0 && (gameState === 'playing' || gameState === 'start')) {
        ctx.beginPath();
        ctx.strokeStyle = '#06b6d4'; 
        ctx.lineWidth = 4;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.moveTo(e.path[0].x, e.path[0].y);
        for (let i = 1; i < e.path.length; i++) {
          ctx.lineTo(e.path[i].x, e.path[i].y);
        }
        ctx.shadowBlur = 15;
        ctx.shadowColor = '#06b6d4';
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      if (gameState === 'playing' && e.timeLeft <= 15) {
        const pulse = Math.sin(time * 0.01) * 0.1;
        ctx.fillStyle = `rgba(239, 68, 68, ${pulse})`;
        ctx.fillRect(0, 0, cvs.width, cvs.height);
      }

      if (e.flashRed > 0) {
        ctx.fillStyle = `rgba(239, 68, 68, ${e.flashRed})`;
        ctx.fillRect(0, 0, cvs.width, cvs.height);
      }

      const ch = e.crosshair;
      if (ch.initialized && (gameState === 'playing' || gameState === 'start')) {
        const activeColor = pointerLocked ? '#00ff88' : '#f59e0b';
        ctx.strokeStyle = activeColor;
        ctx.fillStyle = activeColor;
        
        ctx.beginPath(); ctx.arc(ch.x, ch.y, 4, 0, Math.PI * 2); ctx.fill();
        
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'rgba(0, 255, 136, 0.5)';
        ctx.beginPath(); ctx.arc(ch.x, ch.y, e.pathThickness, 0, Math.PI * 2); ctx.stroke();
      }

      ctx.restore();
      animationRef.current = requestAnimationFrame(loop);
    };

    animationRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animationRef.current);
      resizeObserver.disconnect();
    };
  }, [gameState, pointerLocked, generatePath, resetCrosshairToStart, endGame]);

  const shareScore = useCallback(async () => {
    const text = `🎯 I reached Level ${analytics.levelReached} and scored ${score} PTS in the Steady Hand Game! Grade: ${analytics.gradeData.grade}. Test your mouse precision and survival skills at skilldrills.online!`;
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({ title: 'My Mouse Precision Score', text, url: 'https://skilldrills.online/drills/motor/precision-control/steady-hand' });
      } catch (e) {}
    } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      alert('Score card copied to clipboard!');
    }
  }, [score, analytics]);

  return (
    <div ref={pageRef} className="min-h-screen select-none bg-[#050508] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Breadcrumb & Header */}
        {!isFullscreen && (
          <div className="mb-6">
            <nav className="mb-4">
              <ol className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
                <li><Link href="/" className="hover:text-gray-300">Home</Link></li>
                <li><ChevronRight className="w-4 h-4 text-gray-600" /></li>
                <li><Link href="/drills/motor" className="hover:text-gray-300">Motor Skills</Link></li>
                <li><ChevronRight className="w-4 h-4 text-gray-600" /></li>
                <li className="text-orange-400 font-medium">Steady Hand Game</li>
              </ol>
            </nav>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl shadow-[0_0_20px_rgba(249,115,22,0.3)]">
                  <Route className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Steady Hand Game</h1>
                  <p className="text-sm text-gray-400 mt-1 font-medium">Mouse Precision Training • Free Endless Survival Drill</p>
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
            <StatCard icon={<Target className="text-orange-400" />} value={score} label="Score" />
            <StatCard icon={<Zap className="text-yellow-400" />} value={`${comboMult.toFixed(1)}x`} label="Combo" highlight={comboMult >= 1.5} />
            <StatCard icon={<TrendingUp className="text-purple-400" />} value={`Lv. ${gameState === 'playing' ? engine.current.level : analytics.levelReached}`} label="Difficulty" />
            <StatCard icon={<Repeat className="text-indigo-400" />} value={gameState === 'playing' ? engine.current.laps : analytics.laps} label="Laps" />
            <StatCard icon={<Timer className={timeLeft <= 15 ? 'text-red-400 animate-pulse' : 'text-emerald-400'} />} value={Math.max(0, timeLeft).toFixed(1)} label="Time" unit="s" />
            <StatCard icon={<Trophy className="text-yellow-500" />} value={bestScore} label="Best Score" />
          </div>
        )}

        {/* Engine Container */}
        <div 
          ref={containerRef} 
          className={`relative overflow-hidden transition-colors outline-none ${
            isFullscreen ? 'w-full h-full' : 'w-full aspect-video min-h-[500px] rounded-2xl border border-gray-800 shadow-2xl'
          }`}
        >
          {/* Progress Bar */}
          {gameState === 'playing' && (
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gray-900 z-[60]">
              <div 
                className={`h-full transition-all duration-100 ease-linear ${timeLeft <= 15 ? 'bg-red-500 animate-pulse' : 'bg-orange-500'}`}
                style={{ width: `${Math.min(100, (timeLeft / START_DURATION) * 100)}%` }} 
              />
            </div>
          )}

          {/* Fullscreen Overlay Controls */}
          {isFullscreen && gameState === 'playing' && (
            <>
              {/* Fullscreen Enhanced HUD */}
              <div className="absolute top-6 left-6 z-[60] flex flex-col gap-2 pointer-events-none">
                <div className="bg-black/40 backdrop-blur border border-gray-800 px-4 py-2 rounded-xl flex items-center gap-4">
                  <div className="text-center">
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Score</p>
                    <p className="text-2xl font-black text-white leading-none">{score}</p>
                  </div>
                  <div className="w-px h-8 bg-gray-800"></div>
                  <div className="text-center">
                    <p className="text-[10px] text-fuchsia-400 font-bold uppercase tracking-widest">Level</p>
                    <p className="text-2xl font-black text-fuchsia-400 leading-none">{uiLevel}</p>
                  </div>
                  <div className="w-px h-8 bg-gray-800"></div>
                  <div className="text-center">
                    <p className="text-[10px] text-yellow-400 font-bold uppercase tracking-widest">Combo</p>
                    <p className="text-2xl font-black text-yellow-400 leading-none">{comboMult.toFixed(1)}x</p>
                  </div>
                </div>
              </div>

              <div className="absolute top-4 right-4 z-[60] flex gap-2">
                <button onClick={() => setSoundEnabled(v => !v)} className="p-3 bg-black/60 border border-gray-600 rounded-xl text-white hover:bg-gray-800 transition-colors pointer-events-auto">
                  {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                </button>
                <button onClick={toggleFullscreen} className="p-3 bg-black/60 border border-gray-600 rounded-xl text-white hover:bg-gray-800 transition-colors pointer-events-auto">
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
                <AlertCircle className="w-12 h-12 text-orange-500 mx-auto mb-4" />
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
            <div className="absolute inset-0 bg-[#05070e]/98 flex flex-col items-center justify-center p-6 z-30 select-none overflow-y-auto max-h-[100vh] backdrop-blur-sm cursor-default">
              <div className="max-w-md w-full text-center">
                <h2 className="text-xl font-black text-white uppercase tracking-wider mb-1">
                  Steady Hand Game
                </h2>
                <p className="text-xs text-slate-500 uppercase tracking-widest mb-6">
                  Mouse Precision Training • Path Tracing Drill
                </p>

                <div className="grid grid-cols-2 gap-3 mb-6 text-left">
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Objective</span>
                    <span className="text-sm font-black text-white">Path Tracing</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Reward</span>
                    <span className="text-sm font-black text-green-400">+10s & Combo PTS</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Penalty</span>
                    <span className="text-sm font-black text-red-400">-3.0s & Combo Reset</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Mechanic</span>
                    <span className="text-sm font-black text-orange-400">Endless Survival</span>
                  </div>
                </div>

                <div className="bg-[#0b0f19] border border-slate-850 p-4 rounded-xl mb-6 text-left text-xs text-slate-400">
                  <span className="text-xs font-bold text-white block uppercase mb-1 flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-orange-500" /> Mouse Control Training
                  </span>
                  <ul className="list-disc pl-4 space-y-1 text-[10px] text-slate-500 leading-relaxed">
                    <li>Guide your cursor strictly along the exact glowing line.</li>
                    <li>Deviating off the line instantly resets you and deducts 3.0s.</li>
                    <li>The path becomes more volatile and jagged on every successful lap.</li>
                  </ul>
                </div>

                <div className="bg-[#0b0f19] border border-slate-850 p-4 rounded-xl mb-6 text-left text-xs text-slate-400">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-white uppercase mb-3">
                    <Crosshair className="w-3.5 h-3.5 text-blue-500" /> Universal Sens
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-orange-400 font-mono text-sm font-bold">{universalSens.toFixed(2)}x</span>
                    <span className="text-[10px] text-slate-500">Approx: {cmPer360} cm/360</span>
                  </div>
                  <input 
                    type="range" min="0.1" max="3.0" step="0.05" 
                    value={universalSens} 
                    onChange={(e) => setUniversalSens(parseFloat(e.target.value))} 
                    className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-orange-500" 
                  />
                </div>
                
                <button 
                  onClick={startGame}
                  className="w-full py-3 bg-orange-600 hover:bg-orange-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg uppercase tracking-widest transition-all duration-200 active:scale-95"
                >
                  <Play className="w-3.5 h-3.5 fill-white" /> Start Survival Drill
                </button>
              </div>
            </div>
          )}

          {/* GAME OVER DASHBOARD */}
          {gameState === 'gameOver' && analytics.gradeData && (
            <div className="absolute inset-0 bg-[#05070e]/98 flex flex-col items-center justify-center p-6 z-30 select-none overflow-y-auto max-h-[100vh] backdrop-blur-sm cursor-default">
              <div className="max-w-md w-full text-center">
                {isNewBest && (
                  <div className="inline-block bg-yellow-500 text-black text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-3 shadow-[0_0_15px_rgba(234,179,8,0.5)] animate-bounce">
                    ⭐ NEW PERSONAL BEST!
                  </div>
                )}
                
                <h2 className="text-xl font-black text-white uppercase tracking-wider mb-1">
                  Game Over
                </h2>
                <p className="text-xs text-slate-500 uppercase tracking-widest mb-6">
                  Difficulty Level Reached: Level {analytics.levelReached}
                </p>

                <div className="grid grid-cols-3 gap-2.5 mb-6 text-left">
                  <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
                    <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Final Score</span>
                    <span className="text-base font-black text-white">{score}</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
                    <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Laps Cleared</span>
                    <span className="text-base font-black text-cyan-400">{analytics.laps}</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
                    <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Max Streak</span>
                    <span className="text-base font-black text-green-400">{analytics.maxStreak}</span>
                  </div>
                  
                  <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
                    <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Level Reached</span>
                    <span className="text-base font-black text-purple-400">{analytics.levelReached}</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
                    <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Off-Path Errors</span>
                    <span className="text-base font-black text-red-400">{analytics.mistakes}</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
                    <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Performance Grade</span>
                    <span className={`text-base font-black ${analytics.gradeData.color}`}>{analytics.gradeData.grade}</span>
                  </div>
                </div>

                <div className="bg-[#0b0f19] border border-slate-850 p-3 rounded-xl mb-4 text-left">
                  <span className={`text-xs font-black block text-center uppercase tracking-widest ${analytics.gradeData.color} mb-2`}>
                    Grade: {analytics.gradeData.grade}
                  </span>
                  <div className="w-full h-px bg-slate-850 mb-2"></div>
                  <div className="flex items-center gap-1.5 text-[9px] font-bold text-white uppercase mb-1">
                    <Sparkles className="w-3 h-3 text-orange-400" /> Analytics Advice:
                  </div>
                  <p className="text-[10px] text-slate-400 leading-normal">
                    {analytics.gradeData.advice}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={startGame}
                    className="flex-1 py-3 bg-orange-600 hover:bg-orange-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg uppercase tracking-widest transition-all duration-200 active:scale-95"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    Play Again
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
                <Info className="w-5 h-5 text-orange-400" /><h2 className="font-bold text-white text-lg tracking-wide">Game Rules & Survival Scoring</h2>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-5">
                  <RuleItem num="1" color="cyan" text="Trace the path" highlight="+10s Time & +Combo" result="Completing a lap safely" />
                  <RuleItem num="2" color="indigo" text="Zero Negative Scoring" highlight="No Point Deductions" result="Score only increases, never drops" />
                </div>
                <div className="space-y-5">
                  <RuleItem num="3" color="red" text="Off-Path Penalty" highlight="-3.0s Time Penalty" result="Teleport back & combo resets" />
                  <RuleItem num="4" color="purple" text="Endless Scaling" highlight="Level up every 100pts" result="Thinner path & violent zigzags" />
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
                <GraduationCap className="w-5 h-5 text-orange-400" />
                <h2 className="font-bold text-white text-lg tracking-wide">About the Steady Hand Game</h2>
              </div>
              <div className="p-8">
                <p className="text-sm leading-relaxed mb-6 text-gray-300">
                  This free Steady Hand Game online is designed to test your mouse precision and fine motor skills to their absolute breaking point. Unlike calm tracing games, this is an endless survival test. You must physically guide your cursor exactly along a volatile, shrinking path. There is zero negative scoring—your goal is simply to survive the time drain by maintaining continuous accuracy to build massive combo multipliers. As your score rises, the game scales endlessly, triggering an adrenaline-pumping survival state.
                </p>

                {/* Grid Section */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center"><Users className="w-4 h-4 text-white" /></div>
                      <h3 className="text-sm font-bold text-white">Who Should Play</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">FPS gamers seeking stable aim control, graphic designers building digital mouse precision, and individuals practicing fine motor coordination exercises.</p>
                  </div>
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-green-600 flex items-center justify-center"><TrendingUp className="w-4 h-4 text-white" /></div>
                      <h3 className="text-sm font-bold text-white">Skills Targeted</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Fine motor control, hand steadiness, continuous mouse tracking, visual accuracy, and high-pressure motor stability.</p>
                  </div>
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center"><BarChart3 className="w-4 h-4 text-white" /></div>
                      <h3 className="text-sm font-bold text-white">What You'll Track</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Net Survival Score, total laps cleared, max survival streak, tracking errors, and a calculated performance grade.</p>
                  </div>
                </div>
              </div>
              <div className="bg-[#0b0f19] border-t border-gray-800 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Lightbulb className="w-6 h-6 text-yellow-400" />
                  <h2 className="text-xl font-bold text-white">Frequently Asked Questions</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FAQItem q="What is the Steady Hand Game?" a="The Steady Hand Game is a browser-based cursor control drill that tests your fine motor skills. You must carefully guide your mouse through a glowing, randomly generated path without touching the edges to survive." />
                  <FAQItem q="How do I improve my mouse accuracy with this drill?" a="By forcing you to keep your cursor perfectly aligned within a narrow, highly jagged path, this drill trains the micro-muscles in your wrist and forearm, eliminating mouse jitter and improving raw aiming stability." />
                  <FAQItem q="Does the difficulty increase?" a="Yes, this is an endless survival game. Every time you score 100 points, the level increases. The path becomes narrower, the wave amplitude becomes sharper, and the amount of micro-corrections required scales infinitely." />
                  <FAQItem q="What happens when I make a mistake?" a="If your cursor slips off the glowing line, your combo multiplier resets to 1x and you lose 3 seconds off your survival clock. Your score is never reduced, meaning your final score directly reflects how long you survived." />
                  <FAQItem q="Is this a good warmup for FPS games like Valorant or CS2?" a="Absolutely. Before practicing fast flick shots, you must calibrate your mouse stability. Tracing paths builds the foundation for smooth tracking aim and controlled recoil compensation." />
                  <FAQItem q="Is this Steady Hand drill free?" a="Yes, our mouse precision training game is 100% free to play online. There are no downloads or sign-ups required, and it uses hardware pointer-lock for 1:1 raw mouse input." />
                  <FAQItem q="How does the Combo System work?" a="Every time you successfully complete a lap without slipping off the path, your combo multiplier increases. This multiplier drastically boosts the points you receive per lap. One mistake breaks the combo back to 1x." />
                  <FAQItem q="What is Adrenaline Mode?" a="When your survival timer drops below 15 seconds, Adrenaline Mode activates. The screen pulses, heartbeat audio begins, and tension increases, training you to maintain fine motor control under high pressure." />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* RELATED DRILLS SECTION */}
        {!isFullscreen && (
          <section className="mt-14" aria-label="Explore related aim and response drills">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-5 rounded-full bg-orange-500"></div>
              <h2 className="text-xs font-bold text-white uppercase tracking-widest font-mono">
                Explore Related Drills
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <RelatedCard href="/drills/motor/hand-eye-coordination/aim-trainer" title="Aim Trainer" desc="Hone spatial coordinate click speed." color="green" icon={<Target className="w-4 h-4" />} />
              <RelatedCard href="/drills/fps/flick-shot-training" title="Pro Flick Trainer" desc="Snap to targets in time-attack mode." color="blue" icon={<Crosshair className="w-4 h-4" />} />
              <RelatedCard href="/drills/motor/movement-speed/gesture-speed" title="Flick Aim Trainer" desc="Rapid gesture speed test." color="orange" icon={<Zap className="w-4 h-4" />} />
              <RelatedCard href="/drills/motor/precision-control/steady-hand" title="Steady Hand" desc="Smooth mouse path tracing." color="red" icon={<Activity className="w-4 h-4" />} />
            </div>
          </section>
        )}

        {/* FOOTER SECTION */}
        {!isFullscreen && (
          <footer className="mt-12 bg-[#05060b] border border-gray-800 text-gray-500 rounded-xl py-10 px-6 font-mono text-[10px]" role="contentinfo">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 mb-8">
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Motor & FPS</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/motor/hand-eye-coordination/aim-trainer" className="hover:text-orange-400 transition-colors">Aim Trainer Elite</Link></li>
                    <li><Link href="/drills/fps/flick-shot-training" className="hover:text-orange-400 transition-colors">Flick Shot Trainer</Link></li>
                    <li><Link href="/drills/fps" className="text-orange-500 hover:text-orange-400 transition-colors font-bold">All FPS Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Memory</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/memory/working-memory/n-back" className="hover:text-orange-400 transition-colors">3-Back Training</Link></li>
                    <li><Link href="/drills/memory/short-term-memory/color-sequence" className="hover:text-orange-400 transition-colors">Color Sequence</Link></li>
                    <li><Link href="/drills/memory" className="text-orange-500 hover:text-orange-400 transition-colors font-bold">All Memory Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Cognitive</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/cognitive/memory/card-matching" className="hover:text-orange-400 transition-colors">Memory Games</Link></li>
                    <li><Link href="/drills/cognitive/attention/divided-attention" className="hover:text-orange-400 transition-colors">Attention Drills</Link></li>
                    <li><Link href="/drills/cognitive" className="text-orange-500 hover:text-orange-400 transition-colors font-bold">All Cognitive Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Academic</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/academic/writing-speed/typing-test" className="hover:text-orange-400 transition-colors">Typing Speed Test</Link></li>
                    <li><Link href="/drills/academic/math-speed/mental-math" className="hover:text-orange-400 transition-colors">Mental Math</Link></li>
                    <li><Link href="/drills/academic" className="text-orange-500 hover:text-orange-400 transition-colors font-bold">All Academic Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">More Sectors</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/visual" className="hover:text-orange-400 transition-colors">Visual (14)</Link></li>
                                        
                    <li><Link href="/drills/physical" className="hover:text-orange-400 transition-colors">Physical (11)</Link></li>
                  </ul>
                </div>
              </div>
              
              <div className="border-t border-gray-800 pt-8 text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="w-6 h-6 bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-lg flex items-center justify-center">
                    <Target className="w-3.5 h-3.5 text-orange-400" />
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

function StatCard({ icon, value, label, unit = '', highlight = false }) {
  return (
    <div className={`group rounded-xl border ${highlight ? 'border-yellow-500/50 bg-yellow-500/10' : 'border-gray-800 bg-gray-900/50'} p-2 text-center flex flex-col justify-center h-full transition-all duration-300 hover:scale-[1.03] hover:border-gray-700`}>
      <div className="mb-1 flex justify-center transition-transform duration-300 group-hover:scale-110">
        {icon}
      </div>
      <p className={`text-xs sm:text-base font-black tracking-tight truncate ${highlight ? 'text-yellow-400' : 'text-white'}`}>
        {value} <span className="text-[10px] font-semibold opacity-70">{unit}</span>
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
    orange: 'bg-orange-600 text-orange-300 border-orange-500',
    cyan: 'bg-cyan-600 text-cyan-300 border-cyan-500'
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
    blue: 'from-blue-500 to-cyan-500',
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
      <div className="flex items-center gap-1.5 text-orange-400 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-wider">
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