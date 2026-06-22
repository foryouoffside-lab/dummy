'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';

import { 
  Activity, AlertCircle, ArrowRight, BarChart3, ChevronRight, 
  Clock, Crosshair, Eye, GraduationCap, Info, Lightbulb, 
  Maximize2, Minimize2, Play, RefreshCw, Star, Target, 
  Timer, TrendingUp, Trophy, Volume2, VolumeX, Zap, 
  Share2, Code2, Calculator, CheckCircle2, Shield, Users,
  Move, XCircle, Award, Keyboard, Heart, Gauge
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
      const now = this.ctx.currentTime;
      
      const freqMap = { 
        perfect: 1046.5, // C6
        good: 880,       // A5
        ok: 523.25,      // C5
        miss: 300,       // D#4
        streak: 1318.52, // E6
        ready: 660       // E5
      };
      
      osc.type = type === 'miss' ? 'sawtooth' : 'sine';
      osc.frequency.setValueAtTime(freqMap[type] || 660, now);
      
      if (type === 'streak' || type === 'perfect') {
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
        osc.start(now); osc.stop(now + 0.2);
      } else if (type === 'miss') {
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
        osc.start(now); osc.stop(now + 0.3);
      } else {
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
        osc.start(now); osc.stop(now + 0.15);
      }
    } catch (e) {}
  }

  setEnabled(status) {
    this.enabled = status;
  }
}

const audioSynth = typeof window !== 'undefined' ? new AudioSynthesizer() : null;

const DRILL_DURATION = 60; // 60 seconds

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function StopwatchClickClient() {
  // === UI & Viewport State ===
  const [gameState, setGameState] = useState('start'); 
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [flashBg, setFlashBg] = useState(null);
  
  // === Gameplay State ===
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(DRILL_DURATION);
  const [isNewBest, setIsNewBest] = useState(false);
  
  // Real-time HUD State
  const [streak, setStreak] = useState(0);
  const [perfectHits, setPerfectHits] = useState(0);
  const [accuracy, setAccuracy] = useState(100);

  // Analytics State
  const [analytics, setAnalytics] = useState({
    finalScore: 0,
    perfectHits: 0,
    totalAttempts: 0,
    misses: 0,
    accuracy: 100,
    maxStreak: 0,
    avgError: 0
  });

  // === High-performance Mutable Refs ===
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  const pageRef = useRef(null);
  
  // === Game Logic Engine Refs ===
  const engine = useRef({
    state: 'TARGET', // 'TARGET', 'TIMER', 'RESULT'
    targetTime: 1000,
    startTime: 0,
    displayTimer: 1.5,
    
    lastError: 0,
    clickedTime: 0,
    
    score: 0,
    timeLeft: DRILL_DURATION,
    streak: 0,
    maxStreak: 0,
    
    totalAttempts: 0,
    hits: 0,
    misses: 0,
    perfectHits: 0,
    totalErrorAbs: 0,
    
    mousePos: { x: 0, y: 0 },
    particles: [],
    hitMarkers: [],
    screenShake: 0,
    totalFrames: 0
  });

  const PENALTY = 1;

  // === Initialization & Local Storage ===
  useEffect(() => {
    try {
      const savedBest = localStorage.getItem('stopwatchClick_bestScore_v3');
      if (savedBest) setBestScore(parseInt(savedBest, 10));
    } catch (e) {}
  }, []);

  useEffect(() => {
    if (audioSynth) audioSynth.setEnabled(soundEnabled);
  }, [soundEnabled]);

  // === Core Game Management ===
  const endGame = useCallback(() => {
    setGameState('gameOver');
    
    const e = engine.current;
    const finalAccuracy = e.totalAttempts > 0 ? Math.round((e.hits / e.totalAttempts) * 100) : 0;
    const avgErr = e.hits > 0 ? Math.round(e.totalErrorAbs / e.hits) : 0;
    
    setAccuracy(finalAccuracy);

    setAnalytics({
      finalScore: e.score,
      perfectHits: e.perfectHits,
      totalAttempts: e.totalAttempts,
      misses: e.misses,
      accuracy: finalAccuracy,
      maxStreak: e.maxStreak,
      avgError: avgErr
    });

    setBestScore(prev => {
      if (e.score > prev) {
        setIsNewBest(true);
        try { localStorage.setItem('stopwatchClick_bestScore_v3', e.score.toString()); } catch(err){}
        return e.score;
      }
      return prev;
    });
  }, []);

  const createExplosion = (x, y, color, count = 12) => {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 5 + 1;
      engine.current.particles.push({ x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, life: 1.0, color });
    }
  };

  const generateNewRound = useCallback(() => {
    const e = engine.current;
    e.targetTime = 1000 + Math.floor(Math.random() * 7001); // 1s to 8s
    e.state = 'TARGET';
    e.displayTimer = 1.5;
    if (audioSynth) audioSynth.playSound('ready');
  }, []);

  const startGame = useCallback(async () => {
    if (audioSynth) audioSynth.init(); 

    setIsNewBest(false);
    setScore(0);
    setStreak(0);
    setAccuracy(100);
    setPerfectHits(0);
    setGameState('playing');
    
    engine.current = {
      state: 'TARGET',
      targetTime: 1000,
      startTime: 0,
      displayTimer: 1.5,
      lastError: 0,
      clickedTime: 0,
      score: 0,
      timeLeft: DRILL_DURATION,
      streak: 0,
      maxStreak: 0,
      totalAttempts: 0,
      hits: 0,
      misses: 0,
      perfectHits: 0,
      totalErrorAbs: 0,
      mousePos: { x: window.innerWidth / 2, y: window.innerHeight / 2 },
      particles: [],
      hitMarkers: [],
      screenShake: 0,
      totalFrames: 0
    };

    generateNewRound();
    setTimeLeft(DRILL_DURATION);

    try {
      if (containerRef.current && !document.fullscreenElement) {
        await containerRef.current.requestFullscreen();
      }
    } catch(e) {}
  }, [generateNewRound]);

  // === Raw Mouse Input & Firing Listeners ===
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (gameState !== 'playing' || !canvasRef.current) return;
      const cvs = canvasRef.current;
      const rect = cvs.getBoundingClientRect();
      const sx = cvs.width / rect.width;
      const sy = cvs.height / rect.height;
      engine.current.mousePos = { 
        x: (e.clientX - rect.left) * sx, 
        y: (e.clientY - rect.top) * sy 
      };
    };

    const handleMouseDown = (e) => {
      if (e.target.tagName === 'BUTTON' || e.target.closest('button')) return;
      if (gameState === 'playing' && canvasRef.current) {
        const eRef = engine.current;
        const cvs = canvasRef.current;
        const cx = cvs.width / 2;
        const cy = cvs.height / 2;

        if (eRef.state === 'TIMER') {
          const now = performance.now();
          const elapsed = now - eRef.startTime;
          const error = elapsed - eRef.targetTime;
          const errorAbs = Math.abs(error);
          
          eRef.lastError = error;
          eRef.clickedTime = elapsed;
          eRef.totalAttempts++;

          if (errorAbs <= 150) { // Hit!
            eRef.hits++;
            eRef.totalErrorAbs += errorAbs;
            eRef.streak++;
            if (eRef.streak > eRef.maxStreak) eRef.maxStreak = eRef.streak;

            let flashColor = '#06b6d4'; // Default
            
            // Checking if the rounded error is strictly 0 for the exact 20 points
            if (Math.round(errorAbs) === 0) {
              eRef.score += 20; // EXACT
              eRef.perfectHits++;
              if (audioSynth) audioSynth.playSound('perfect');
              flashColor = '#fbbf24'; // Gold
              createExplosion(cx, cy, flashColor, 30);
            } else if (errorAbs <= 25) {
              eRef.score += 5; // Perfect
              eRef.perfectHits++;
              if (audioSynth) audioSynth.playSound('perfect');
              flashColor = '#00ff88'; // Green
              createExplosion(cx, cy, flashColor, 20);
            } else if (errorAbs <= 100) {
              eRef.score += 3; // Good
              if (audioSynth) audioSynth.playSound('good');
              flashColor = '#06b6d4'; // Cyan
              createExplosion(cx, cy, flashColor, 10);
            } else {
              eRef.score += 1; // OK
              if (audioSynth) audioSynth.playSound('ok');
              flashColor = '#f59e0b'; // Amber
              createExplosion(cx, cy, flashColor, 5);
            }

            if (eRef.streak % 5 === 0 && eRef.streak > 0) {
              if (audioSynth) audioSynth.playSound('streak');
            }

            setFlashBg(Math.round(errorAbs) === 0 ? 'yellow' : errorAbs <= 25 ? 'green' : errorAbs <= 100 ? 'cyan' : 'amber');
            setTimeout(() => setFlashBg(null), 100);

          } else { // Miss!
            eRef.misses++;
            eRef.score = Math.max(0, eRef.score - PENALTY);
            eRef.streak = 0;
            eRef.screenShake = 15;
            if (audioSynth) audioSynth.playSound('miss');
            
            setFlashBg('red');
            setTimeout(() => setFlashBg(null), 100);
          }

          eRef.state = 'RESULT';
          
          // Update React State
          setScore(eRef.score);
          setStreak(eRef.streak);
          setPerfectHits(eRef.perfectHits);
          setAccuracy(Math.round((eRef.hits / eRef.totalAttempts) * 100));

        } else if (eRef.state === 'RESULT') {
          generateNewRound();
        }
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, [gameState, generateNewRound]);

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
        }
      }
    });
    resizeObserver.observe(container);

    let lastTime = performance.now();

    const loop = (time) => {
      const deltaTimeMs = time - lastTime;
      lastTime = time; 
      const dt = Math.min(deltaTimeMs / 1000, 0.033); // Clamp dt
      const e = engine.current;

      if (gameState === 'playing') {
        // Exact Delta-Time Clock processing
        e.timeLeft -= dt;
        if (e.timeLeft <= 0) {
          e.timeLeft = 0;
          endGame();
        }

        if (e.state === 'TARGET') {
          e.displayTimer -= dt;
          if (e.displayTimer <= 0) {
            e.state = 'TIMER';
            e.startTime = performance.now();
          }
        }

        e.totalFrames++;
        // Throttle UI Timer Sync
        if (e.totalFrames % 3 === 0) {
          setTimeLeft(e.timeLeft);
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

      const cx = cvs.width / 2;
      const cy = cvs.height / 2;

      // Environment Grid
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.03)'; // Cyan tint
      ctx.lineWidth = 1; 
      for(let i = 0; i < cvs.width; i+= 50) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, cvs.height); ctx.stroke(); }
      for(let j = 0; j < cvs.height; j+= 50) { ctx.beginPath(); ctx.moveTo(0, j); ctx.lineTo(cvs.width, j); ctx.stroke(); }

      // --- State Specific Rendering ---
      if (e.state === 'TARGET') {
        ctx.fillStyle = "#ffffff";
        ctx.font = "900 64px monospace";
        ctx.textAlign = "center";
        ctx.fillText(`${(e.targetTime / 1000).toFixed(3)}s`, cx, cy + 15);
        
        ctx.fillStyle = "#06b6d4"; // Cyan
        ctx.font = "bold 16px sans-serif";
        ctx.letterSpacing = "4px";
        ctx.fillText("TARGET TIME", cx, cy - 50);
        
        // Progress bar for memorization phase
        const prog = e.displayTimer / 1.5;
        ctx.fillStyle = "rgba(6, 182, 212, 0.2)";
        ctx.fillRect(cx - 100, cy + 40, 200, 4);
        ctx.fillStyle = "#06b6d4";
        ctx.fillRect(cx - 100, cy + 40, 200 * prog, 4);
      }

      if (e.state === 'TIMER') {
        const elapsed = performance.now() - e.startTime;
        ctx.fillStyle = "rgba(255,255,255,0.8)";
        ctx.font = "900 80px monospace";
        ctx.textAlign = "center";
        
        // Render the elapsed time
        ctx.fillText((elapsed / 1000).toFixed(3), cx, cy + 25);
      }

      if (e.state === 'RESULT') {
        const errorAbs = Math.abs(e.lastError);
        const isHit = errorAbs <= 150;
        
        let rating = 'MISS';
        let color = '#ef4444'; // Red
        
        if (isHit) {
          if (Math.round(errorAbs) === 0) { rating = 'EXACT'; color = '#fbbf24'; }
          else if (errorAbs <= 25) { rating = 'PERFECT'; color = '#00ff88'; }
          else if (errorAbs <= 100) { rating = 'GOOD'; color = '#06b6d4'; }
          else { rating = 'OK'; color = '#f59e0b'; }
        }

        ctx.fillStyle = color;
        ctx.font = "900 56px sans-serif";
        ctx.textAlign = "center";
        ctx.letterSpacing = "2px";
        ctx.fillText(rating, cx, cy - 30);
        
        ctx.fillStyle = "rgba(255,255,255,0.5)";
        ctx.font = "24px monospace";
        ctx.fillText(`${(e.clickedTime / 1000).toFixed(3)}s`, cx, cy + 20);
        
        ctx.fillStyle = color;
        ctx.font = "bold 24px monospace";
        ctx.fillText(`${e.lastError > 0 ? '+' : ''}${e.lastError.toFixed(0)}ms`, cx, cy + 60);
        
        // Blinking prompt
        ctx.globalAlpha = 0.5 + Math.sin(time / 150) * 0.5;
        ctx.fillStyle = "#ffffff";
        ctx.font = "14px sans-serif";
        ctx.letterSpacing = "2px";
        ctx.fillText("CLICK TO CONTINUE", cx, cy + 110);
        ctx.globalAlpha = 1.0;
      }

      // Render Particles
      for (let i = e.particles.length - 1; i >= 0; i--) {
        const p = e.particles[i];
        p.x += p.vx; p.y += p.vy; p.life -= dt * 2.5;
        if (p.life <= 0) { e.particles.splice(i, 1); continue; }
        ctx.globalAlpha = p.life; ctx.fillStyle = p.color; ctx.fillRect(p.x, p.y, 4, 4);
      }
      ctx.globalAlpha = 1.0;

      // Draw Custom Cursor
      const m = e.mousePos;
      if (m.x > 0 && m.x < cvs.width && m.y > 0 && m.y < cvs.height && (gameState === 'playing' || gameState === 'start')) {
        ctx.strokeStyle = '#06b6d4';
        ctx.lineWidth = 2;
        ctx.beginPath(); ctx.arc(m.x, m.y, 12, 0, Math.PI * 2); ctx.stroke();

        ctx.lineWidth = 1.5;
        const gap = 5;
        ctx.beginPath();
        ctx.moveTo(m.x, m.y - 16); ctx.lineTo(m.x, m.y - gap);
        ctx.moveTo(m.x, m.y + 16); ctx.lineTo(m.x, m.y + gap);
        ctx.moveTo(m.x - 16, m.y); ctx.lineTo(m.x - gap, m.y);
        ctx.moveTo(m.x + 16, m.y); ctx.lineTo(m.x + gap, m.y);
        ctx.stroke();
        
        ctx.fillStyle = '#ffffff';
        ctx.beginPath(); ctx.arc(m.x, m.y, 2, 0, Math.PI * 2); ctx.fill();
      }

      ctx.restore();
      animationRef.current = requestAnimationFrame(loop);
    };

    animationRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animationRef.current);
      resizeObserver.disconnect();
    };
  }, [gameState, endGame]);

  const shareDrillLink = useCallback(() => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    if (navigator.share) {
      navigator.share({ title: 'Stopwatch Timing Drill', url }).catch(() => {});
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
                <li className="text-cyan-400 font-medium">Stopwatch Timing</li>
              </ol>
            </nav>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                  <Timer className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Stopwatch Timing</h1>
                  <p className="text-sm text-gray-400 mt-1 font-medium">Mental Chronometry • Precision Internal Clock</p>
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
            <StatCard icon={<Target className="text-cyan-400" />} value={score} label="Score" />
            <StatCard icon={<Timer className={timeLeft <= 10 ? 'text-red-400 animate-pulse' : 'text-emerald-400'} />} value={Math.max(0, timeLeft).toFixed(1)} label="Time" unit="s" />
            <StatCard icon={<Zap className="text-orange-400" />} value={streak} label="Current Streak" />
            <StatCard icon={<BarChart3 className="text-purple-400" />} value={`${accuracy}%`} label="Accuracy" />
            <StatCard icon={<Award className="text-green-400" />} value={perfectHits} label="Perfect Hits" />
            <StatCard icon={<XCircle className="text-red-400" />} value={engine.current.misses || 0} label="Misses" />
            <StatCard icon={<Trophy className="text-yellow-500" />} value={bestScore} label="Best Score" />
          </div>
        )}

        {/* Engine Container */}
        <div 
          ref={containerRef} 
          className={`relative overflow-hidden transition-colors outline-none ${
            isFullscreen ? 'w-full h-full' : 'w-full aspect-video min-h-[500px] rounded-2xl border border-gray-700 shadow-2xl'
          }`}
          style={{ backgroundColor: flashBg === 'red' ? '#450a0a' : flashBg === 'green' ? '#064e3b' : flashBg === 'cyan' ? '#083344' : flashBg === 'amber' ? '#451a03' : flashBg === 'yellow' ? '#422006' : '#05060b', cursor: 'none' }}
        >
          {/* Progress Bar */}
          {gameState === 'playing' && (
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gray-900 z-[60]">
              <div 
                className={`h-full transition-all duration-1000 ease-linear ${timeLeft <= 10 ? 'bg-red-500 animate-pulse' : 'bg-cyan-500'}`}
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

          {/* Core Canvas */}
          <canvas 
            ref={canvasRef} 
            className="block absolute top-0 left-0 w-full h-full touch-none z-10 cursor-none" 
          />

          {/* START SCREEN */}
          {gameState === 'start' && (
            <div className="absolute inset-0 flex items-center justify-center z-50 bg-black/70 backdrop-blur-md p-4 overflow-y-auto cursor-default">
              <div className="rounded-3xl p-8 text-center max-w-lg w-full border border-gray-700 bg-gray-900 shadow-2xl my-auto">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl mx-auto flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(6,182,212,0.3)]">
                  <Timer className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-black mb-3 tracking-tight text-white uppercase">Stopwatch Timing</h2>
                <p className="text-sm mb-6 text-gray-400 leading-relaxed">
                  Memorize the target time (1-8 seconds), then click at the exact moment it elapses. Achieve exactly 0ms error for massive bonuses.
                </p>
                
                <button 
                  onClick={startGame}
                  className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-xl font-black text-lg hover:brightness-110 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_20px_rgba(6,182,212,0.3)]"
                >
                  <Play className="w-6 h-6 fill-white" /> BEGIN CHRONOMETRY
                </button>
              </div>
            </div>
          )}

          {/* GAME OVER DASHBOARD */}
          {gameState === 'gameOver' && (
            <div className="absolute inset-0 flex items-center justify-center z-50 bg-black/90 backdrop-blur-md p-4 animate-in fade-in duration-300 overflow-y-auto cursor-default">
              <div className="rounded-3xl max-w-2xl w-full shadow-2xl border border-gray-800 bg-gray-950 overflow-hidden my-auto">
                <div className="bg-gradient-to-br from-cyan-900/40 to-blue-900/40 p-6 border-b border-gray-800 text-center relative">
                  {isNewBest && (
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-yellow-500 text-black text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-[0_0_15px_rgba(234,179,8,0.5)]">
                      ⭐ New Personal Best
                    </div>
                  )}
                  <h2 className="text-2xl font-black text-white tracking-tight mt-4">Time's Up</h2>
                  <p className="text-cyan-400 font-medium text-sm mt-1">Mental Chronometry Session Concluded</p>
                </div>

                <div className="p-6">
                  {/* Top Stats */}
                  <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <div className="flex-1 bg-gray-900 rounded-2xl p-4 border border-gray-800 flex justify-between items-center">
                      <div>
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1 block">Final Score</span>
                        <div className="flex items-end gap-1">
                          <span className="text-4xl font-black text-white leading-none">{analytics.finalScore}</span>
                          <span className="text-xs text-gray-500 font-bold mb-1">PTS</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1 block">Avg Timing Error</span>
                        <span className="text-3xl font-black text-cyan-400">
  &plusmn;{analytics.avgError} <span className="text-sm">ms</span>
</span>
                      </div>
                    </div>
                  </div>

                  {/* Reaction Diagnostics Block */}
                  <div className="bg-[#0a0a0a] border border-cyan-900/50 rounded-xl p-5 mb-6 text-left shadow-inner">
                    <h3 className="text-xs font-bold text-cyan-400 font-mono uppercase tracking-widest border-b border-cyan-900/50 pb-2 mb-4 flex items-center gap-2">
                      <BarChart3 className="w-4 h-4 text-cyan-400" />
                      CHRONOMETRY TELEMETRY DIAGNOSTICS
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs leading-relaxed text-gray-300">
                      
                      <div className="space-y-3 sm:border-r border-gray-800 sm:pr-6">
                        <p className="font-bold text-white uppercase text-[10px] tracking-wider font-mono">Performance Log:</p>
                        <ul className="space-y-2">
                          <li className="flex justify-between items-center bg-gray-900/50 p-2 rounded border border-gray-800">
                            <span className="text-gray-400">Timing Accuracy:</span>
                            <span className="font-bold text-blue-400">{analytics.accuracy}%</span>
                          </li>
                          <li className="flex justify-between items-center bg-gray-900/50 p-2 rounded border border-gray-800">
                            <span className="text-gray-400">Perfect Hits (&lt;25ms):</span>
                            <span className="font-bold text-green-400">{analytics.perfectHits}</span>
                          </li>
                          <li className="flex justify-between items-center bg-gray-900/50 p-2 rounded border border-gray-800">
                            <span className="text-gray-400">Misses (&gt;150ms):</span>
                            <span className={`font-bold ${analytics.misses > 3 ? 'text-red-500' : 'text-yellow-500'}`}>{analytics.misses}</span>
                          </li>
                          <li className="flex justify-between items-center bg-gray-900/50 p-2 rounded border border-gray-800">
                            <span className="text-gray-400">Max Survival Streak:</span>
                            <span className="font-bold text-orange-400">{analytics.maxStreak}</span>
                          </li>
                        </ul>
                      </div>

                      <div className="space-y-3 flex flex-col justify-between">
                        <div>
                          <p className="font-bold text-white uppercase text-[10px] tracking-wider font-mono mb-2">Prescribed Advice:</p>
                          <p className="text-gray-400 leading-relaxed font-sans">
                            {analytics.avgError > 100 ? (
                              <span className="text-red-300">Your internal clock is drifting significantly. Do not rely entirely on internal rhythm; tap your foot or mentally subdivide the seconds (1-and-2-and) to maintain a tighter temporal anchor.</span>
                            ) : analytics.misses > 2 ? (
                              <span className="text-yellow-300">You are occasionally losing focus on the longer 6s-8s targets. Maintain strict subdivisions in your head all the way through the longer intervals.</span>
                            ) : (
                              <span className="text-green-300">Exceptional mental chronometry! Your average millisecond error indicates a highly calibrated internal metronome and excellent temporal awareness.</span>
                            )}
                          </p>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <button onClick={startGame} className="flex-1 py-4 bg-cyan-600 text-white rounded-xl font-black tracking-wide hover:bg-cyan-500 transition-all active:scale-95 flex items-center justify-center gap-2 shadow-lg">
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

        {/* ABOUT THIS DRILL SECTION */}
        {!isFullscreen && (
          <section className="mt-10">
            <div className="rounded-2xl border border-gray-800 overflow-hidden bg-gray-900 shadow-2xl pointer-events-none">
              <div className="px-6 py-5 border-b border-gray-800 bg-black/40 flex items-center gap-3">
                <Info className="w-5 h-5 text-cyan-400" /><h2 className="font-bold text-white text-lg tracking-wide">Drill Instructions & Scoring</h2>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-5">
                  <RuleItem num="1" color="yellow" text="Exact Timing" highlight="+20 PTS" result="0ms Error" />
                  <RuleItem num="2" color="green" text="Perfect Timing" highlight="+5 PTS" result="<25ms Error" />
                </div>
                <div className="space-y-5">
                  <RuleItem num="3" color="cyan" text="Good / OK Timing" highlight="+3 PTS / +1 PTS" result="<100ms / <150ms Error" />
                  <RuleItem num="4" color="red" text="Miss Penalty" highlight="-1 PTS" result=">150ms Error" />
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
                <GraduationCap className="w-5 h-5 text-cyan-400" />
                <h2 className="font-bold text-white text-lg tracking-wide">About Stopwatch Timing</h2>
              </div>
              <div className="p-8">
                <p className="text-sm leading-relaxed mb-6 text-gray-300">
                  This mental chronometry drill trains your internal clock. By having you memorize a dynamic target time (ranging between 1-8 seconds) and asking you to click precisely when that time elapses, it calibrates your internal metronome and reduces temporal drifting.
                </p>

                {/* Grid Section */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center"><Users className="w-4 h-4 text-white" /></div>
                      <h3 className="text-sm font-bold text-white">Who It's For</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Musicians, drummers, competitive gamers tracking ability cooldowns, athletes, and anyone wanting a sharper sense of time.</p>
                  </div>
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-green-600 flex items-center justify-center"><TrendingUp className="w-4 h-4 text-white" /></div>
                      <h3 className="text-sm font-bold text-white">Skills Improved</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Mental chronometry, time estimation, sub-division of seconds, internal clock calibration, and sustained focus.</p>
                  </div>
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center"><BarChart3 className="w-4 h-4 text-white" /></div>
                      <h3 className="text-sm font-bold text-white">What You'll Track</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Total Score, Accuracy %, Perfect Hits, and—most importantly—your Average Millisecond Error variance.</p>
                  </div>
                </div>

                {/* How to Play & Strategy */}
                <div className="mb-8 bg-[#0b0f19]/40 border border-gray-800 rounded-xl p-6">
                  <h3 className="text-base font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Target className="w-5 h-5 text-cyan-500" /> How to Play & Strategy
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-6 text-sm text-gray-300">
                    <ol className="space-y-3 list-decimal pl-5">
                      <li>Watch the screen as a randomized target time appears.</li>
                      <li>Wait for the initial memorization phase to end.</li>
                      <li>Click exactly when you believe the target time has passed.</li>
                    </ol>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> <span className="text-white font-bold">Subdivisions:</span> Don't just count "1, 2, 3". Count "1-and-2-and-3" to stay tighter on rhythm.</li>
                      <li className="flex items-center gap-2"><AlertCircle className="w-4 h-4 text-orange-400" /> <span className="text-white font-bold">Drift:</span> Longer times (6s-8s) are naturally harder to track accurately.</li>
                    </ul>
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
              <div className="w-1 h-5 rounded-full bg-cyan-500"></div>
              <h2 className="text-xs font-bold text-white uppercase tracking-widest font-mono">
                Explore Related Drills
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <RelatedCard href="/drills/motor/timing-accuracy/stopwatch-click" title="Rhythm Tap" desc="Tap in sync with visual cues." color="cyan" icon={<Clock className="w-4 h-4" />} />
              <RelatedCard href="/drills/motor/timing-accuracy/synchronization" title="Synchronization" desc="Match clicks to moving visual targets." color="blue" icon={<Zap className="w-4 h-4" />} />
              <RelatedCard href="/drills/motor/hand-eye-coordination/aim-trainer" title="Aim Trainer" desc="Hone spatial coordinate click speed." color="green" icon={<Target className="w-4 h-4" />} />
              <RelatedCard href="/drills/fps/flick-shot-training" title="Pro Flick Trainer" desc="Snap to targets in time-attack mode." color="orange" icon={<Crosshair className="w-4 h-4" />} />
              <RelatedCard href="/drills/cognitive/processing-speed/reaction-time" title="Reaction Time" desc="Test visual reaction speed directly." color="teal" icon={<Timer className="w-4 h-4" />} />
              <RelatedCard href="/drills/academic/math-speed/mental-math" title="Mental Math" desc="Advanced mental calculation speed tests." color="indigo" icon={<Calculator className="w-4 h-4" />} />
              <RelatedCard href="/drills/academic/writing-speed/typing-test" title="Code Typing" desc="Practice syntax and symbol typing speed." color="rose" icon={<Code2 className="w-4 h-4" />} />
              <RelatedCard href="/drills/motor/precision-control/steady-hand" title="Steady Hand" desc="Navigate paths without touching edges." color="purple" icon={<Heart className="w-4 h-4" />} />
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
                    <li><Link href="/drills/visual" className="hover:text-cyan-400 transition-colors">Visual (14)</Link></li>
                                        
                    <li><Link href="/drills/physical" className="hover:text-cyan-400 transition-colors">Physical (11)</Link></li>
                  </ul>
                </div>
              </div>
              
              <div className="border-t border-slate-900 pt-8 text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="w-6 h-6 bg-gradient-to-br from-cyan-500/25 to-blue-500/25 border border-cyan-500/30 rounded-lg flex items-center justify-center">
                    <Crosshair className="w-3.5 h-3.5 text-cyan-400" />
                  </div>
                  <span className="text-white font-black tracking-widest text-xs uppercase">SkillDrills</span>
                </div>
                <p className="text-[9px] mb-2">&copy; 2026 SkillDrills. All rights reserved.</p>
                <p className="text-[9px] max-w-2xl mx-auto leading-relaxed mb-6">
                  Free online mental chronometry timing drill. Open-source telemetry training platform. Free forever. No downloads required.
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
    orange: 'bg-orange-600 text-orange-300 border-orange-500',
    purple: 'bg-purple-600 text-purple-300 border-purple-500',
    cyan: 'bg-cyan-600 text-cyan-300 border-cyan-500',
    green: 'bg-green-600 text-green-300 border-green-500',
    fuchsia: 'bg-fuchsia-600 text-fuchsia-300 border-fuchsia-500',
    yellow: 'bg-yellow-600 text-yellow-300 border-yellow-500'
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
    teal: 'from-teal-500 to-green-500',
    rose: 'from-rose-500 to-pink-500'
  };
  return (
    <Link href={href} className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-[#0b0f19]/40 transition-all hover:-translate-y-1 hover:border-cyan-500/50 block p-5">
      <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${gradients[color] || 'from-cyan-500 to-blue-500'}`}></div>
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