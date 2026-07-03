'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';

import { 
  Activity, AlertCircle, ArrowRight, BarChart3, ChevronRight, 
  Clock, Crosshair, Eye, GraduationCap, Info, Lightbulb, 
  Maximize2, Minimize2, Play, RefreshCw, Star, Target, 
  Timer, TrendingUp, Trophy, Volume2, VolumeX, Zap, 
  Share2, Code2, Calculator, CheckCircle2, XCircle
} from 'lucide-react';

const DRILL_DURATION = 60; // Strict 60 seconds
const TARGET_FPS = 144;
const SCORE_INTERVAL = 500; // 500ms tracking threshold
const SCORE_REWARD = 2; // +2 points per 0.5 sec

export default function StrafeTrackingClient() {
  // === UI & Viewport State ===
  const [gameState, setGameState] = useState('start'); // 'start', 'playing', 'gameOver'
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [pointerLocked, setPointerLocked] = useState(false);
  
  // === Settings State ===
  const [universalSens, setUniversalSens] = useState(1.0);
  const [baseSpeed, setBaseSpeed] = useState(450); // Pixels per second

  // === Gameplay State ===
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [combo, setCombo] = useState(0);
  const [bestCombo, setBestCombo] = useState(0);
  const [timeLeft, setTimeLeft] = useState(DRILL_DURATION);
  const [isNewBest, setIsNewBest] = useState(false);

  // Analytics State
  const [analytics, setAnalytics] = useState({
    leftAccuracy: 0,
    rightAccuracy: 0,
  });

  // === High-performance Mutable Refs ===
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  const audioCtxRef = useRef(null);
  const timerRef = useRef(null);
  
  // === Game Logic Engine Refs ===
  const engine = useRef({
    target: { x: 0, y: 0, vx: 0, vy: 0, radius: 18, height: 45, groundY: 0 },
    crosshair: { x: 0, y: 0, initialized: false },
    score: 0,
    combo: 0,
    bestCombo: 0,
    accumulator: 0,
    timeLeft: DRILL_DURATION,
    
    // Telemetry
    totalTicks: 0,
    onTargetTicks: 0,
    leftTotal: 0,
    leftHits: 0,
    rightTotal: 0,
    rightHits: 0,
    nextDecisionTime: 0
  });

  const cmPer360 = (30 / universalSens).toFixed(1);

  // === Initialization & Local Storage ===
  useEffect(() => {
    try {
      const savedSens = localStorage.getItem('strafeTrack_sens');
      if (savedSens) setUniversalSens(parseFloat(savedSens));
      const savedSpeed = localStorage.getItem('strafeTrack_speed');
      if (savedSpeed) setBaseSpeed(parseFloat(savedSpeed));
      const savedBest = localStorage.getItem('strafeTrack_bestScore');
      if (savedBest) setBestScore(parseInt(savedBest, 10));
    } catch (e) {}
  }, []);

  useEffect(() => {
    if (gameState !== 'playing') {
      try { 
        localStorage.setItem('strafeTrack_sens', universalSens.toString());
        localStorage.setItem('strafeTrack_speed', baseSpeed.toString());
      } catch (e) {}
    }
  }, [universalSens, baseSpeed, gameState]);

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
        o.type = 'square';
        o.frequency.setValueAtTime(880, now);
        o.frequency.exponentialRampToValueAtTime(1200, now + 0.08);
        g.gain.setValueAtTime(0.015, now);
        g.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        o.start(now);
        o.stop(now + 0.08);
      }
    } catch(e) {}
  }, [soundEnabled]);

  // === Core Game Management ===
  const endGame = useCallback(() => {
    setGameState('gameOver');
    if (document.pointerLockElement) document.exitPointerLock();
    
    const e = engine.current;
    
    // Calculate Final Analytics
    const finalAccuracy = e.totalTicks > 0 ? Math.round((e.onTargetTicks / e.totalTicks) * 100) : 0;
    const lAcc = e.leftTotal > 0 ? Math.round((e.leftHits / e.leftTotal) * 100) : 0;
    const rAcc = e.rightTotal > 0 ? Math.round((e.rightHits / e.rightTotal) * 100) : 0;

    setAccuracy(finalAccuracy);
    setAnalytics({ leftAccuracy: lAcc, rightAccuracy: rAcc });

    setBestScore(prev => {
      if (e.score > prev) {
        setIsNewBest(true);
        try { localStorage.setItem('strafeTrack_bestScore', e.score.toString()); } catch(e){}
        return e.score;
      }
      return prev;
    });
  }, []);

  // Centralized Fullscreen Request Handler
  const requestFullscreen = async () => {
    if (containerRef.current && !document.fullscreenElement) {
      try {
        await containerRef.current.requestFullscreen();
      } catch (err) {
        console.warn("Fullscreen request blocked:", err);
      }
    }
  };

  const startGame = useCallback(async () => {
    setIsNewBest(false);
    setScore(0);
    setCombo(0);
    setAccuracy(100);
    setBestCombo(0);
    setTimeLeft(DRILL_DURATION);
    setGameState('playing');
    
    const spawnX = containerRef.current?.clientWidth / 2 || 400;
    const spawnY = containerRef.current?.clientHeight / 2 || 300;

    // Reset Engine State
    engine.current = {
      target: { 
        x: spawnX, 
        y: spawnY, 
        vx: baseSpeed, 
        vy: 0, 
        radius: 16, 
        height: 45, 
        groundY: spawnY + 100 
      },
      crosshair: { ...engine.current.crosshair },
      score: 0, combo: 0, bestCombo: 0, accumulator: 0, timeLeft: DRILL_DURATION,
      totalTicks: 0, onTargetTicks: 0, leftTotal: 0, leftHits: 0, rightTotal: 0, rightHits: 0,
      nextDecisionTime: performance.now() + 500
    };

    // Safely request fullscreen
    await requestFullscreen();

    // Small timeout to allow the browser to process fullscreen before locking pointer
    setTimeout(() => {
      if (canvasRef.current && !document.pointerLockElement) {
        canvasRef.current.requestPointerLock().catch(()=>{});
      }
    }, 150);
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

  // === Raw Mouse Input ===
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

  const toggleFullscreen = useCallback(async () => {
    if (!document.fullscreenElement) {
      await requestFullscreen();
    } else {
      await document.exitFullscreen().catch(()=>{});
    }
  }, []);

  useEffect(() => {
    const fsListener = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', fsListener);
    return () => document.removeEventListener('fullscreenchange', fsListener);
  }, []);

  // === Render & Game Loop (Delta Time Physics) ===
  useEffect(() => {
    const cvs = canvasRef.current; 
    const container = containerRef.current;
    if (!cvs || !container) return;
    const ctx = cvs.getContext('2d', { alpha: false });

    // Robust Resize Observer - Resolves Black Screen Issue natively
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
      const e = engine.current;
      const t = e.target;

      // 1. AI Dodging Logic (Runs independently to keep target moving)
      if (time >= e.nextDecisionTime) {
        const choice = Math.random();
        const curSpeed = baseSpeed * (0.8 + Math.random() * 0.4); 

        if (choice < 0.35) {
          t.vx = (t.vx > 0 ? -1 : 1) * curSpeed; // Reverse
        } else if (choice < 0.60) {
          t.vx *= 0.4; // Brake
        } else if (choice < 0.85 && t.y >= t.groundY) {
          t.vy = -450 * (baseSpeed / 450); // Jump
        } else {
          t.vx = (Math.random() > 0.5 ? 1 : -1) * curSpeed; // Random dash
        }
        e.nextDecisionTime = time + (Math.random() * 350 + 150);
      }

      // 2. Apply Physics
      if (t.y < t.groundY) {
        t.vy += 1300 * deltaSec; // Gravity
      }
      
      t.x += t.vx * deltaSec;
      t.y += t.vy * deltaSec;

      // X Bounds
      if (t.x < t.radius + 30) {
        t.x = t.radius + 30;
        t.vx = Math.abs(t.vx);
        e.nextDecisionTime = time + 100;
      } else if (t.x > cvs.width - t.radius - 30) {
        t.x = cvs.width - t.radius - 30;
        t.vx = -Math.abs(t.vx);
        e.nextDecisionTime = time + 100;
      }

      // Y Bounds (Floor)
      if (t.y > t.groundY) {
        t.y = t.groundY;
        t.vy = 0;
      }

      // 3. Collision & Scoring Logic
      if (gameState === 'playing' && pointerLocked) {
        const ch = e.crosshair;
        
        // Capsule Math
        const segAY = t.y - t.height;
        const segBY = t.y + t.height;
        const lineLen = segBY - segAY;
        
        let tParam = (ch.y - segAY) / (lineLen || 1);
        tParam = Math.max(0, Math.min(1, tParam)); 
        
        const closestY = segAY + tParam * lineLen;
        const dist = Math.hypot(ch.x - t.x, ch.y - closestY);
        const isHit = dist <= t.radius;

        // Telemetry
        e.totalTicks++;
        const isMovingLeft = t.vx < 0;
        if (isMovingLeft) {
          e.leftTotal++;
          if (isHit) e.leftHits++;
        } else {
          e.rightTotal++;
          if (isHit) e.rightHits++;
        }

        if (isHit) {
          e.onTargetTicks++;
          e.combo++;
          if (e.combo > e.bestCombo) e.bestCombo = e.combo;

          e.accumulator += deltaSec * 1000;
          if (e.accumulator >= SCORE_INTERVAL) {
            e.score += SCORE_REWARD;
            e.accumulator -= SCORE_INTERVAL;
            setScore(e.score); 
            playSound('score');
          }
        } else {
          e.combo = 0;
          e.accumulator = 0; 
        }

        // Periodic UI sync
        if (e.totalTicks % 15 === 0) {
          setCombo(e.combo);
          setBestCombo(e.bestCombo);
          setAccuracy(Math.round((e.onTargetTicks / e.totalTicks) * 100));
        }
      }

      // --- RENDERING PHASE ---
      ctx.fillStyle = '#050508';
      ctx.fillRect(0, 0, cvs.width, cvs.height);

      // Grid
      ctx.strokeStyle = 'rgba(239, 68, 68, 0.04)';
      ctx.lineWidth = 1;
      for (let i = 0; i < cvs.width; i += 60) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, cvs.height); ctx.stroke(); }
      for (let j = 0; j < cvs.height; j += 60) { ctx.beginPath(); ctx.moveTo(0, j); ctx.lineTo(cvs.width, j); ctx.stroke(); }

      // Floor Line
      ctx.strokeStyle = 'rgba(239, 68, 68, 0.15)';
      ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(0, t.groundY + t.radius); ctx.lineTo(cvs.width, t.groundY + t.radius); ctx.stroke();

      // Determine Hit State for visuals
      const ch = e.crosshair;
      const segAY = t.y - t.height;
      const segBY = t.y + t.height;
      const lineLen = segBY - segAY;
      let tParam = (ch.y - segAY) / (lineLen || 1);
      tParam = Math.max(0, Math.min(1, tParam)); 
      const closestY = segAY + tParam * lineLen;
      const dist = Math.hypot(ch.x - t.x, ch.y - closestY);
      const isActuallyHit = dist <= t.radius && gameState === 'playing' && pointerLocked;

      // Draw Capsule
      ctx.shadowBlur = isActuallyHit ? 25 : 10;
      ctx.shadowColor = isActuallyHit ? '#00ff88' : '#ef4444';
      ctx.fillStyle = isActuallyHit ? 'rgba(0, 255, 136, 0.25)' : 'rgba(239, 68, 68, 0.15)';
      ctx.strokeStyle = isActuallyHit ? '#00ff88' : '#ef4444';
      ctx.lineWidth = 2.5;

      ctx.beginPath();
      ctx.arc(t.x, t.y - t.height, t.radius, Math.PI, 0, false); 
      ctx.lineTo(t.x + t.radius, t.y + t.height); 
      ctx.arc(t.x, t.y + t.height, t.radius, 0, Math.PI, false); 
      ctx.lineTo(t.x - t.radius, t.y - t.height); 
      ctx.closePath();
      ctx.fill(); ctx.stroke();
      ctx.shadowBlur = 0;

      // Target Brackets
      if (isActuallyHit) {
        ctx.strokeStyle = 'rgba(0, 255, 136, 0.6)';
        ctx.lineWidth = 1.5;
        const bOff = t.radius + 10;
        
        ctx.beginPath();
        ctx.moveTo(t.x - bOff, t.y - t.height); ctx.lineTo(t.x - bOff - 5, t.y - t.height);
        ctx.lineTo(t.x - bOff - 5, t.y + t.height); ctx.lineTo(t.x - bOff, t.y + t.height);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(t.x + bOff, t.y - t.height); ctx.lineTo(t.x + bOff + 5, t.y - t.height);
        ctx.lineTo(t.x + bOff + 5, t.y + t.height); ctx.lineTo(t.x + bOff, t.y + t.height);
        ctx.stroke();
      }

      // Draw Crosshair
      if (ch.initialized && (gameState === 'playing' || gameState === 'start')) {
        const activeColor = pointerLocked ? '#00ff88' : '#eab308';
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

      animationRef.current = requestAnimationFrame(loop);
    };

    animationRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animationRef.current);
      resizeObserver.disconnect();
    };
  }, [gameState, pointerLocked, playSound, baseSpeed, isFullscreen]);

  const shareDrillLink = useCallback(() => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    if (navigator.share) {
      navigator.share({ title: 'Unpredictable Strafe Tracking', url }).catch(() => {});
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
                <li className="text-red-400 font-medium">Unpredictable Strafe Tracking</li>
              </ol>
            </nav>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-br from-red-600 to-orange-600 rounded-xl shadow-[0_0_20px_rgba(239,68,68,0.3)]">
                  <Crosshair className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Unpredictable Strafe Tracking</h1>
                  <p className="text-sm text-gray-400 mt-1 font-medium">Desktop Exclusive • 1:1 Raw Input</p>
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
            <StatCard icon={<Target className="text-red-400" />} value={score} label="Score" />
            <StatCard icon={<Timer className={timeLeft <= 10 ? 'text-orange-400 animate-pulse' : 'text-red-400'} />} value={timeLeft} label="Time" unit="s" />
            <StatCard icon={<Zap className="text-indigo-400" />} value={combo} label="Combo" />
            <StatCard icon={<Star className="text-yellow-400" />} value={bestCombo} label="Max Combo" />
            <StatCard icon={<BarChart3 className="text-purple-400" />} value={`${accuracy}%`} label="Accuracy" />
            <StatCard icon={<Activity className="text-rose-400" />} value={`${baseSpeed.toFixed(0)}`} label="Speed" unit="px/s" />
            <StatCard icon={<Info className="text-blue-400" />} value={`${universalSens.toFixed(2)}x`} label="Sens" />
            <StatCard icon={<Trophy className="text-yellow-500" />} value={bestScore} label="Best" />
          </div>
        )}

        {/* Engine Container */}
        <div 
          ref={containerRef} 
          className={`relative overflow-hidden bg-[#05060b] transition-colors outline-none ${
            isFullscreen ? 'w-full h-full' : 'w-full aspect-video min-h-[500px] rounded-2xl border border-gray-700 shadow-2xl'
          }`}
        >
          {/* Progress Bar */}
          {gameState === 'playing' && (
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gray-900 z-[60]">
              <div 
                className={`h-full transition-all duration-1000 ease-linear ${timeLeft <= 10 ? 'bg-orange-500 animate-pulse' : 'bg-red-600'}`}
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
                <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-orange-600 rounded-2xl mx-auto flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(239,68,68,0.3)]">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-black mb-3 tracking-tight text-white uppercase">Strafe Tracking</h2>
                <p className="text-sm mb-6 text-gray-400 leading-relaxed">
                  The target unpredictably dodges and jumps. Track it seamlessly. You gain <strong>+2 points</strong> every <strong>0.5s</strong> on target. Missing pauses your combo.
                </p>

                {/* Configuration Panel */}
                <div className="mb-8 p-5 bg-black/50 rounded-xl border border-gray-800 text-left space-y-5">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-xs text-gray-400 font-bold uppercase tracking-wider flex items-center gap-2">
                        <Crosshair className="w-4 h-4 text-red-500"/> Universal Sens
                      </label>
                      <span className="text-red-400 font-mono text-sm font-bold">{universalSens.toFixed(2)}x</span>
                    </div>
                    <input 
                      type="range" min="0.1" max="3.0" step="0.05" 
                      value={universalSens} 
                      onChange={(e) => setUniversalSens(parseFloat(e.target.value))} 
                      className="w-full h-1.5 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-red-500" 
                    />
                    <div className="text-[10px] text-gray-500 mt-1.5 text-right">Approx: {cmPer360} cm/360</div>
                  </div>

                  <div className="pt-4 border-t border-gray-800">
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-xs text-gray-400 font-bold uppercase tracking-wider flex items-center gap-2">
                        <Zap className="w-4 h-4 text-orange-500"/> Target Velocity
                      </label>
                      <span className="text-orange-400 font-mono text-sm font-bold">{baseSpeed.toFixed(0)} px/s</span>
                    </div>
                    <input 
                      type="range" min="200" max="1000" step="20" 
                      value={baseSpeed} 
                      onChange={(e) => setBaseSpeed(parseFloat(e.target.value))} 
                      className="w-full h-1.5 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-orange-500" 
                    />
                  </div>
                </div>
                
                <button 
                  onClick={startGame}
                  className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-xl font-black text-lg hover:brightness-110 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_20px_rgba(239,68,68,0.3)]"
                >
                  <Play className="w-6 h-6 fill-white" /> BEGIN DRILL
                </button>
              </div>
            </div>
          )}

          {/* GAME OVER DASHBOARD */}
          {gameState === 'gameOver' && (
            <div className="absolute inset-0 flex items-center justify-center z-50 bg-black/90 backdrop-blur-md p-4 animate-in fade-in duration-300 overflow-y-auto">
              <div className="rounded-3xl max-w-2xl w-full shadow-2xl border border-gray-800 bg-gray-950 overflow-hidden my-auto">
                <div className="bg-gradient-to-br from-red-900/40 to-orange-900/40 p-6 border-b border-gray-800 text-center relative">
                  {isNewBest && (
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-yellow-500 text-black text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-[0_0_15px_rgba(234,179,8,0.5)]">
                      ⭐ New Personal Best
                    </div>
                  )}
                  <h2 className="text-2xl font-black text-white tracking-tight mt-4">Tracking Analysis Complete</h2>
                  <p className="text-red-400 font-medium text-sm mt-1">60 Second Session</p>
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
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1 block">Overall Accuracy</span>
                        <span className={`text-3xl font-black ${accuracy >= 70 ? 'text-green-400' : accuracy >= 40 ? 'text-yellow-400' : 'text-red-400'}`}>
                          {accuracy}%
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Asymmetry Diagnostics Block */}
                  <div className="bg-[#0a0a0a] border border-red-900/50 rounded-xl p-5 mb-6 text-left shadow-inner">
                    <h3 className="text-xs font-bold text-red-400 font-mono uppercase tracking-widest border-b border-red-900/50 pb-2 mb-4 flex items-center gap-2">
                      <Target className="w-4 h-4 text-red-400" />
                      DIRECTIONAL ASYMMETRY DIAGNOSTICS
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs leading-relaxed text-gray-300">
                      
                      <div className="space-y-3 sm:border-r border-gray-800 sm:pr-6">
                        <p className="font-bold text-white uppercase text-[10px] tracking-wider font-mono">Telemetry Data:</p>
                        <ul className="space-y-2">
                          <li className="flex justify-between items-center bg-gray-900/50 p-2 rounded border border-gray-800">
                            <span className="text-gray-400">Left-Strafing Acc:</span>
                            <span className="font-bold text-blue-400">{analytics.leftAccuracy}%</span>
                          </li>
                          <li className="flex justify-between items-center bg-gray-900/50 p-2 rounded border border-gray-800">
                            <span className="text-gray-400">Right-Strafing Acc:</span>
                            <span className="font-bold text-indigo-400">{analytics.rightAccuracy}%</span>
                          </li>
                          <li className="flex justify-between items-center bg-gray-900/50 p-2 rounded border border-gray-800">
                            <span className="text-gray-400">Max Combo:</span>
                            <span className="font-bold text-orange-400">{bestCombo} Ticks</span>
                          </li>
                        </ul>
                      </div>

                      <div className="space-y-3 flex flex-col justify-between">
                        <div>
                          <p className="font-bold text-white uppercase text-[10px] tracking-wider font-mono mb-2">Prescribed Advice:</p>
                          <p className="text-gray-400 leading-relaxed font-sans">
                            {Math.abs(analytics.leftAccuracy - analytics.rightAccuracy) > 10 ? (
                              <span className="text-yellow-300">You have a severe asymmetry gap ({Math.abs(analytics.leftAccuracy - analytics.rightAccuracy)}%). You struggle significantly to track targets moving to the {analytics.leftAccuracy < analytics.rightAccuracy ? "left" : "right"}. Focus your wrist pivot training heavily in this direction.</span>
                            ) : (
                              <span className="text-green-300">Excellent directional balance. Your wrist pivots cleanly in both directions without heavy bias. Increase target velocity on your next run.</span>
                            )}
                          </p>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <button onClick={startGame} className="flex-1 py-4 bg-red-600 text-white rounded-xl font-black tracking-wide hover:bg-red-500 transition-all active:scale-95 flex items-center justify-center gap-2 shadow-lg">
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

        {/* DRILL INSTRUCTIONS & SCORING SECTION */}
        {!isFullscreen && (
          <section className="mt-10">
            <div className="rounded-2xl border border-gray-800 overflow-hidden bg-gray-900 shadow-2xl pointer-events-none">
              <div className="px-6 py-5 border-b border-gray-800 bg-black/40 flex items-center gap-3">
                <Info className="w-5 h-5 text-red-400" /><h2 className="font-bold text-white text-lg tracking-wide">Drill Instructions & Scoring</h2>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-5">
                  <RuleItem num="1" color="green" text="Accurate Tracking" highlight="+2 PTS" result="Per 0.5s on target" />
                  <RuleItem num="2" color="orange" text="Target Movement" highlight="Dodges & Jumps" result="Unpredictable" />
                </div>
                <div className="space-y-5">
                  <RuleItem num="3" color="indigo" text="Combo Multiplier" highlight="Build Streak" result="Missing resets combo" />
                  <RuleItem num="4" color="blue" text="Raw Input" highlight="Desktop Exclusive" result="1:1 Mouse Tracking" />
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
                <GraduationCap className="w-5 h-5 text-red-400" />
                <h2 className="font-bold text-white text-lg tracking-wide">About Unpredictable Strafe Tracking</h2>
              </div>
              <div className="p-8">
                <p className="text-sm leading-relaxed mb-6 text-gray-300">
                  This pure tracking benchmark is designed to refine tactical mechanical reflexes and continuous spatial mouse accuracy. By using 1:1 hardware raw input via the Pointer Lock API, it bypasses operating system cursor acceleration. The target performs high-frequency, unpredictable counter-strafes and jumps, mimicking elite movement in games like Apex Legends and Overwatch.
                </p>

                {/* Grid Section */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center"><GraduationCap className="w-4 h-4 text-white" /></div>
                      <h3 className="text-sm font-bold text-white">Who It's For</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Esports athletes, competitive FPS gamers, and players looking to build consistent, acceleration-free continuous muscle memory against dodging targets.</p>
                  </div>
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-orange-600 flex items-center justify-center"><TrendingUp className="w-4 h-4 text-white" /></div>
                      <h3 className="text-sm font-bold text-white">Skills Improved</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Continuous motor reflex speed, spatial coordinate sweep precision, wrist control, and direction-change timing.</p>
                  </div>
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center"><BarChart3 className="w-4 h-4 text-white" /></div>
                      <h3 className="text-sm font-bold text-white">What You'll Track</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Total Score, maximum lock-on streak, and crucial directional asymmetry (Left-Tracking vs Right-Tracking accuracy).</p>
                  </div>
                </div>

                {/* Integrated How to Play & Scoring Block */}
                <div className="mb-8 bg-[#0b0f19]/40 border border-gray-800 rounded-xl p-6">
                  <h3 className="text-base font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Crosshair className="w-5 h-5 text-red-500" /> How to Play & Scoring
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-6 text-sm text-gray-300">
                    <ol className="space-y-3 list-decimal pl-5">
                      <li>Adjust your <strong>Sens</strong> to match your main game, and pick a challenging <strong>Target Velocity</strong>.</li>
                      <li>Click <strong>Begin Drill</strong> to lock your mouse inside the physics engine.</li>
                      <li>Trace the capsule smoothly. Be ready for sudden counter-strafes and jumps.</li>
                      <li>Survive the strict 60-second time-attack clock to receive your telemetry report.</li>
                    </ol>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> <span className="text-white font-bold">Scoring:</span> Earn +2 Points per 0.5s of consecutive tracking.</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400" /> <span className="text-white font-bold">Combos:</span> Maintaining lock-on builds your Streak Combo.</li>
                      <li className="flex items-center gap-2"><XCircle className="w-4 h-4 text-gray-500" /> <span className="text-white font-bold">Misses:</span> Missing pauses your score timer and resets your Combo to zero. No point deductions.</li>
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
                      <h4 className="text-sm font-bold text-gray-200">What is Directional Asymmetry?</h4>
                      <p className="text-xs text-gray-400 mt-1">Due to the pivot point of the human wrist, most gamers find it easier to track a target moving in one direction (usually left for right-handed players) than the other. This drill splits your accuracy metrics to help you identify and train your weak side.</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-200">What is the optimal Universal Sens?</h4>
                      <p className="text-xs text-gray-400 mt-1">Adjust the slider until the movement mirrors your primary game (like Valorant, Apex, or CS2). You want your cm/360 rotation to feel identical to build transferable muscle memory.</p>
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
              <div className="w-1 h-5 rounded-full bg-red-500"></div>
              <h2 className="text-xs font-bold text-white uppercase tracking-widest font-mono">
                Explore Related FPS Drills
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <RelatedCard href="/drills/fps/flick-shot-training" title="Pro Flick Trainer" desc="Snap to targets in time-attack mode." color="blue" icon={<Crosshair className="w-4 h-4" />} />
              <RelatedCard href="/drills/motor/hand-eye-coordination/aim-trainer" title="Aim Trainer Elite" desc="Dynamic shrinking bullseye survival." color="green" icon={<Target className="w-4 h-4" />} />
              <RelatedCard href="/drills/fps/recoil-control" title="Recoil Control" desc="Calibrate pulling pattern compensation." color="red" icon={<Activity className="w-4 h-4" />} />
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
                    <li><Link href="/drills/motor/hand-eye-coordination/aim-trainer" className="hover:text-red-400 transition-colors">Aim Trainer Elite</Link></li>
                    <li><Link href="/drills/fps/flick-shot-training" className="hover:text-red-400 transition-colors">Flick Shot Trainer</Link></li>
                    <li><Link href="/drills/fps" className="text-red-450 hover:text-red-400 transition-colors font-bold">All FPS Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Memory</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/memory/working-memory/n-back" className="hover:text-red-400 transition-colors">3-Back Training</Link></li>
                    <li><Link href="/drills/memory/short-term-memory/color-sequence" className="hover:text-red-400 transition-colors">Color Sequence</Link></li>
                    <li><Link href="/drills/memory" className="text-red-450 hover:text-red-400 transition-colors font-bold">All Memory Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Cognitive</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/cognitive/memory/card-matching" className="hover:text-red-400 transition-colors">Memory Games</Link></li>
                    <li><Link href="/drills/cognitive/attention/divided-attention" className="hover:text-red-400 transition-colors">Attention Drills</Link></li>
                    <li><Link href="/drills/cognitive" className="text-red-450 hover:text-red-400 transition-colors font-bold">All Cognitive Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Academic</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/academic/writing-speed/typing-test" className="hover:text-red-400 transition-colors">Typing Speed Test</Link></li>
                    <li><Link href="/drills/academic/math-speed/mental-math" className="hover:text-red-400 transition-colors">Mental Math</Link></li>
                    <li><Link href="/drills/academic" className="text-red-450 hover:text-red-400 transition-colors font-bold">All Academic Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">More Sectors</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/visual" className="hover:text-red-400 transition-colors">Visual (14)</Link></li>
                                        
                    <li><Link href="/drills/physical" className="hover:text-red-400 transition-colors">Physical (11)</Link></li>
                  </ul>
                </div>
              </div>
              
              <div className="border-t border-slate-900 pt-8 text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="w-6 h-6 bg-gradient-to-br from-red-500/25 to-orange-500/25 border border-red-500/30 rounded-lg flex items-center justify-center">
                    <Crosshair className="w-3.5 h-3.5 text-red-400" />
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
    gray: 'bg-gray-600 text-gray-300 border-gray-500', 
    green: 'bg-green-600 text-green-300 border-green-500',
    red: 'bg-red-600 text-red-300 border-red-500',
    orange: 'bg-orange-600 text-orange-300 border-orange-500'
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
    <Link href={href} className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-[#0b0f19]/40 transition-all hover:-translate-y-1 hover:border-red-500/50 block p-5">
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${gradients[color]}`}></div>
      <div className="w-10 h-10 rounded-xl bg-[#050811] border border-slate-700 flex items-center justify-center text-slate-400 group-hover:text-white mb-3 shadow-inner">
        {icon}
      </div>
      <h3 className="font-bold text-base mb-1.5 text-white group-hover:text-red-400 transition-colors">{title}</h3>
      <p className="text-xs text-slate-500 mb-4">{desc}</p>
      <div className="flex items-center gap-1.5 text-red-400 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-wider">
        Start Drill <ArrowRight className="w-3.5 h-3.5" />
      </div>
    </Link>
  );
}