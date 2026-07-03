'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';

import { 
  Activity, AlertCircle, ArrowRight, BarChart3, ChevronRight, 
  Clock, Crosshair, Eye, GraduationCap, Info, Lightbulb, 
  Maximize2, Minimize2, Play, RefreshCw, Target, 
  Timer, TrendingUp, Trophy, Volume2, VolumeX, 
  Share2, CheckCircle2, Zap, Users, Sparkles, XCircle,
  Disc, Keyboard, Heart, Gauge
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
        click: 880, 
        score: 1200, 
        collapse: 200, 
        difficulty: 440 
      };
      
      osc.type = type === 'collapse' ? 'sawtooth' : 'sine';
      osc.frequency.setValueAtTime(freqMap[type] || 660, now);
      
      if (type === 'score') {
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
        osc.start(now); osc.stop(now + 0.3);
      } else if (type === 'collapse') {
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
        osc.start(now); osc.stop(now + 0.5);
      } else if (type === 'difficulty') {
        osc.type = 'triangle';
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
        osc.start(now); osc.stop(now + 0.4);
      } else {
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
        osc.start(now); osc.stop(now + 0.1);
      }
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
export default function RapidTappingClient() {
  // === UI & Viewport State ===
  const [gameState, setGameState] = useState('start'); 
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [flashBg, setFlashBg] = useState(null);
  
  // === Gameplay State ===
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [clicks, setClicks] = useState(0);
  const [survivalTime, setSurvivalTime] = useState(0);
  const [isNewBest, setIsNewBest] = useState(false);
  
  // Real-time HUD State
  const [radius, setRadius] = useState(50);
  const [shrinkRate, setShrinkRate] = useState(45);

  // Analytics State
  const [analytics, setAnalytics] = useState({
    finalScore: 0,
    survivalTime: 0,
    totalClicks: 0,
    maxDifficulty: 0,
    cps: 0,
    gradeData: { grade: 'D', color: 'text-slate-500', advice: '' }
  });

  // === High-performance Mutable Refs ===
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  const pageRef = useRef(null);
  
  // === Game Logic Engine Refs ===
  const engine = useRef({
    radius: 50,
    shrinkRate: 45,
    baseShrink: 45,
    lastDifficultyScore: 0,
    
    score: 0,
    clicks: 0,
    survivalTime: 0,
    
    mousePos: { x: 0, y: 0 },
    particles: [],
    screenShake: 0,
    totalFrames: 0
  });

  // === Initialization & Local Storage ===
  useEffect(() => {
    try {
      const savedBest = localStorage.getItem('rapidTapping_bestScore2');
      if (savedBest) setBestScore(parseInt(savedBest, 10));
    } catch (e) {}
  }, []);

  useEffect(() => {
    if (audioSynth) audioSynth.setEnabled(soundEnabled);
  }, [soundEnabled]);

  const formatTime = useCallback((s) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, '0')}`;
  }, []);

  // === Core Game Management ===
  const endGame = useCallback(() => {
    setGameState('gameOver');
    
    const e = engine.current;
    
    const finalTime = e.survivalTime;
    const finalCPS = finalTime > 0 ? parseFloat((e.clicks / finalTime).toFixed(1)) : 0;
    const diffPercent = Math.floor(((e.shrinkRate / e.baseShrink) - 1) * 100);

    let grade = 'D';
    let gradeColor = 'text-gray-400';
    let advice = 'Keep practicing! Focus on building raw finger speed. Try clicking with your index and middle finger simultaneously.';
    
    if (e.score >= 100 && finalCPS >= 10) {
      grade = 'S+';
      gradeColor = 'text-yellow-400';
      advice = 'Elite CPS Master! Your clicking endurance and raw speed easily rival top-tier competitive Minecraft and FPS players.';
    } else if (e.score >= 50 && finalCPS >= 8) {
      grade = 'S';
      gradeColor = 'text-yellow-500';
      advice = 'Outstanding endurance! You have extremely fast tapping mechanics. Focus on maintaining a steady rhythm to push your score even higher.';
    } else if (e.score >= 30 && finalCPS >= 7) {
      grade = 'A';
      gradeColor = 'text-fuchsia-400';
      advice = 'Great tapping speed! You are comfortably above average. Try experimenting with jitter or butterfly clicking to break into the S-tier.';
    } else if (e.score >= 15 && finalCPS >= 6) {
      grade = 'B';
      gradeColor = 'text-cyan-400';
      advice = 'Good fundamentals. Hand fatigue likely set in as the shrink rate became aggressive. Keep practicing to build neuromuscular stamina.';
    } else if (e.score >= 5 && finalCPS >= 5) {
      grade = 'C';
      gradeColor = 'text-indigo-400';
      advice = 'Average performance. To survive longer, you must rapidly expand the ball back to its 140px safe zone before resting.';
    }

    setAnalytics({
      finalScore: e.score,
      survivalTime: finalTime,
      totalClicks: e.clicks,
      maxDifficulty: diffPercent,
      cps: finalCPS,
      gradeData: { grade, color: gradeColor, advice }
    });

    setBestScore(prev => {
      if (e.score > prev) {
        setIsNewBest(true);
        try { localStorage.setItem('rapidTapping_bestScore2', e.score.toString()); } catch(err){}
        return e.score;
      }
      return prev;
    });
  }, []);

  const createExplosion = (x, y, color) => {
    for (let i = 0; i < 15; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 6 + 2;
      engine.current.particles.push({ x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, life: 1.0, color });
    }
  };

  const startGame = useCallback(async () => {
    if (audioSynth) audioSynth.init(); 

    setIsNewBest(false);
    setScore(0);
    setClicks(0);
    setSurvivalTime(0);
    setRadius(50);
    setShrinkRate(45);
    setGameState('playing');
    
    engine.current = {
      radius: 50,
      shrinkRate: 45,
      baseShrink: 45,
      lastDifficultyScore: 0,
      score: 0,
      clicks: 0,
      survivalTime: 0,
      mousePos: { x: window.innerWidth / 2, y: window.innerHeight / 2 },
      particles: [],
      screenShake: 0,
      totalFrames: 0
    };

    try {
      if (containerRef.current && !document.fullscreenElement) {
        await containerRef.current.requestFullscreen();
      }
    } catch(e) {}
  }, []);

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
        
        const dist = Math.hypot(eRef.mousePos.x - cx, eRef.mousePos.y - cy);
        
        // Hit Detection (+15px forgiveness buffer on visual edge)
        if (dist < eRef.radius + 15) { 
          eRef.radius = Math.min(140, eRef.radius + 10);
          eRef.clicks++;
          
          if (eRef.clicks % 10 === 0) {
            eRef.score++; // 10 clicks = 1 Score
            
            if (audioSynth) audioSynth.playSound('score');
            createExplosion(cx, cy, '#d946ef'); // Fuchsia explosion on point
            eRef.screenShake = 5;
            
            // === DYNAMIC SCORE-BASED DIFFICULTY SCALING ===
            // As requested: Every 30 score (+15%), Every 20 (+12%), Every 10 (+10%), Every 5 (+8%)
            if (eRef.score > eRef.lastDifficultyScore) {
              if (eRef.score % 30 === 0) {
                eRef.shrinkRate *= 1.15;
                eRef.lastDifficultyScore = eRef.score;
                if (audioSynth) audioSynth.playSound('difficulty');
              } else if (eRef.score % 20 === 0) {
                eRef.shrinkRate *= 1.12;
                eRef.lastDifficultyScore = eRef.score;
                if (audioSynth) audioSynth.playSound('difficulty');
              } else if (eRef.score % 10 === 0) {
                eRef.shrinkRate *= 1.10;
                eRef.lastDifficultyScore = eRef.score;
                if (audioSynth) audioSynth.playSound('difficulty');
              } else if (eRef.score % 5 === 0) {
                eRef.shrinkRate *= 1.08;
                eRef.lastDifficultyScore = eRef.score;
                if (audioSynth) audioSynth.playSound('difficulty');
              }
            }
            
            // Hard Cap shrink rate to prevent literally impossible gameplay
            eRef.shrinkRate = Math.min(eRef.shrinkRate, 600); // Max 600px per sec shrink

            setScore(eRef.score);
            
            setFlashBg('fuchsia');
            setTimeout(() => setFlashBg(null), 100);
          } else {
            if (audioSynth) audioSynth.playSound('click');
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
        e.survivalTime += dt;
        
        // Apply constant shrinking
        e.radius -= e.shrinkRate * dt;
        
        if (e.radius <= 0) {
          e.radius = 0;
          if (audioSynth) audioSynth.playSound('collapse');
          endGame();
        }

        e.totalFrames++;
        // Throttle UI Updates (every ~50ms)
        if (e.totalFrames % 3 === 0) {
          setSurvivalTime(e.survivalTime);
          setRadius(e.radius);
          setClicks(e.clicks);
          setShrinkRate(e.shrinkRate);
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

      const cx = cvs.width / 2;
      const cy = cvs.height / 2;

      // Environment Grid
      ctx.strokeStyle = 'rgba(217, 70, 239, 0.03)'; // Fuchsia tint
      ctx.lineWidth = 1; 
      for(let i = 0; i < cvs.width; i+= 50) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, cvs.height); ctx.stroke(); }
      for(let j = 0; j < cvs.height; j+= 50) { ctx.beginPath(); ctx.moveTo(0, j); ctx.lineTo(cvs.width, j); ctx.stroke(); }

      // Maximum Boundary Ring (140px)
      ctx.beginPath();
      ctx.arc(cx, cy, 140, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Active Target Ball
      const fillPercent = Math.max(0, e.radius / 140);
      ctx.beginPath();
      ctx.arc(cx, cy, Math.max(0, e.radius), 0, Math.PI * 2);
      
      // Gradient coloring based on size (Danger -> Safe)
      const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, e.radius);
      if (fillPercent < 0.3) {
        gradient.addColorStop(0, "rgba(239, 68, 68, 0.8)"); // Red
        gradient.addColorStop(1, "rgba(239, 68, 68, 0.2)");
        ctx.strokeStyle = "#ef4444";
      } else {
        gradient.addColorStop(0, "rgba(217, 70, 239, 0.8)"); // Fuchsia
        gradient.addColorStop(1, "rgba(217, 70, 239, 0.2)");
        ctx.strokeStyle = "#d946ef";
      }
      
      ctx.fillStyle = gradient;
      ctx.fill();
      ctx.lineWidth = 2.5; 
      ctx.stroke();

      // Center Dot
      ctx.beginPath();
      ctx.arc(cx, cy, 3, 0, Math.PI * 2);
      ctx.fillStyle = "#ffffff";
      ctx.fill();

      // Render Particles
      for (let i = e.particles.length - 1; i >= 0; i--) {
        const p = e.particles[i];
        p.x += p.vx; p.y += p.vy; p.life -= dt * 2.0;
        if (p.life <= 0) { e.particles.splice(i, 1); continue; }
        ctx.globalAlpha = p.life; ctx.fillStyle = p.color; ctx.fillRect(p.x, p.y, 3, 3);
      }
      ctx.globalAlpha = 1.0;

      // Draw Custom Cursor
      const m = e.mousePos;
      if (m.x > 0 && m.x < cvs.width && m.y > 0 && m.y < cvs.height && (gameState === 'playing' || gameState === 'start')) {
        ctx.strokeStyle = '#d946ef';
        ctx.lineWidth = 2;
        ctx.beginPath(); ctx.arc(m.x, m.y, 10, 0, Math.PI * 2); ctx.stroke();

        ctx.lineWidth = 1.5;
        const gap = 4;
        ctx.beginPath();
        ctx.moveTo(m.x, m.y - 14); ctx.lineTo(m.x, m.y - gap);
        ctx.moveTo(m.x, m.y + 14); ctx.lineTo(m.x, m.y + gap);
        ctx.moveTo(m.x - 14, m.y); ctx.lineTo(m.x - gap, m.y);
        ctx.moveTo(m.x + 14, m.y); ctx.lineTo(m.x + gap, m.y);
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

  const shareScore = useCallback(async () => {
    const text = `🎯 I achieved ${analytics.cps} CPS and scored ${score} PTS in the Click Speed Test! Grade: ${analytics.gradeData.grade}. Test your mouse endurance at skilldrills.online!`;
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({ title: 'My Click Speed Test Score', text, url: 'https://skilldrills.online/drills/motor/movement-speed/rapid-tapping' });
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
                <li><Link href="/drills" className="hover:text-gray-300">Drills Hub</Link></li>
                <li><ChevronRight className="w-4 h-4 text-gray-600" /></li>
                <li><Link href="/drills/motor" className="hover:text-gray-300">Motor Skills</Link></li>
                <li><ChevronRight className="w-4 h-4 text-gray-600" /></li>
                <li className="text-fuchsia-400 font-medium">Click Speed Test</li>
              </ol>
            </nav>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-br from-fuchsia-500 to-purple-600 rounded-xl shadow-[0_0_20px_rgba(217,70,239,0.3)]">
                  <Activity className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Click Speed Test</h1>
                  <p className="text-sm text-gray-400 mt-1 font-medium">Free CPS Test Online • Rapid Tapping Game</p>
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
            <StatCard icon={<Target className="text-fuchsia-400" />} value={score} label="Score" />
            <StatCard icon={<Timer className="text-emerald-400" />} value={formatTime(survivalTime)} label="Survival" />
            <StatCard icon={<Activity className="text-purple-400" />} value={clicks} label="Total Clicks" />
            <StatCard icon={<Disc className="text-cyan-400" />} value={Math.floor(radius)} label="Target Size" unit="px" />
            <StatCard icon={<TrendingUp className="text-orange-400" />} value={`+${Math.floor(((shrinkRate / 45) - 1) * 100)}%`} label="Difficulty Multiplier" />
            <StatCard icon={<Zap className="text-yellow-400" />} value={survivalTime > 0 ? (clicks / survivalTime).toFixed(1) : 0} label="Live CPS" />
            <StatCard icon={<Trophy className="text-yellow-500" />} value={bestScore} label="Best Score" />
          </div>
        )}

        {/* Engine Container */}
        <div 
          ref={containerRef} 
          className={`relative overflow-hidden transition-colors outline-none ${
            isFullscreen ? 'w-full h-full' : 'w-full aspect-video min-h-[500px] rounded-2xl border border-gray-800 shadow-2xl'
          }`}
          style={{ backgroundColor: flashBg === 'fuchsia' ? '#4a044e' : '#05060b', cursor: 'none' }}
        >
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

          {/* Core Canvas */}
          <canvas 
            ref={canvasRef} 
            className="block absolute top-0 left-0 w-full h-full touch-none z-10 cursor-none" 
          />

          {/* START SCREEN (Benchmark Layout) */}
          {gameState === 'start' && (
            <div className="absolute inset-0 bg-[#05070e]/98 flex flex-col items-center justify-center p-6 z-30 select-none overflow-y-auto max-h-[100vh] backdrop-blur-sm cursor-default">
              <div className="max-w-md w-full text-center">
                <h2 className="text-xl font-black text-white uppercase tracking-wider mb-1">
                  Click Speed Test
                </h2>
                <p className="text-xs text-slate-500 uppercase tracking-widest mb-6">
                  Free CPS Test Online • Rapid Tapping Game
                </p>

                <div className="grid grid-cols-2 gap-3 mb-6 text-left">
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Objective</span>
                    <span className="text-sm font-black text-white">Rapid Tapping</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Reward</span>
                    <span className="text-sm font-black text-green-400">+10px Expansion</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Penalty</span>
                    <span className="text-sm font-black text-red-400">Zero Radius = Death</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Mechanic</span>
                    <span className="text-sm font-black text-fuchsia-400">Endless Survival</span>
                  </div>
                </div>

                <div className="bg-[#0b0f19] border border-slate-850 p-4 rounded-xl mb-6 text-left text-xs text-slate-400">
                  <span className="text-xs font-bold text-white block uppercase mb-1 flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-fuchsia-500" /> Mouse Control Training
                  </span>
                  <ul className="list-disc pl-4 space-y-1 text-[10px] text-slate-500 leading-relaxed">
                    <li>Click the central ball rapidly to expand it and prevent it from shrinking to zero.</li>
                    <li>Every 10 clicks grants a point.</li>
                    <li>The shrink rate accelerates drastically as your score increases.</li>
                  </ul>
                </div>

                <button
                  onClick={startGame}
                  className="w-full py-3 bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg uppercase tracking-widest transition-all duration-200 active:scale-95"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  Play Click Speed Test
                </button>
              </div>
            </div>
          )}

          {/* GAME OVER DASHBOARD (Benchmark Layout) */}
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
                  Max Difficulty: +{analytics.maxDifficulty}% Shrink
                </p>

                <div className="grid grid-cols-3 gap-2.5 mb-6 text-left">
                  <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
                    <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Final Score</span>
                    <span className="text-base font-black text-white">{analytics.finalScore}</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
                    <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Click Speed</span>
                    <span className="text-base font-black text-white">{analytics.cps} CPS</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
                    <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Total Clicks</span>
                    <span className="text-base font-black text-green-400">{analytics.totalClicks}</span>
                  </div>
                  
                  <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
                    <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Survival Time</span>
                    <span className="text-base font-black text-cyan-400">{formatTime(analytics.survivalTime)}</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
                    <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Max Difficulty</span>
                    <span className="text-base font-black text-orange-400">+{analytics.maxDifficulty}%</span>
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
                    <Sparkles className="w-3 h-3 text-fuchsia-400" /> Analytics Advice:
                  </div>
                  <p className="text-[10px] text-slate-400 leading-normal">
                    {analytics.gradeData.advice}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={startGame}
                    className="flex-1 py-3 bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg uppercase tracking-widest transition-all duration-200 active:scale-95"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    Train Again
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
                <Info className="w-5 h-5 text-fuchsia-400" /><h2 className="font-bold text-white text-lg tracking-wide">Drill Instructions & Scoring</h2>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-5">
                  <RuleItem num="1" color="fuchsia" text="Expand the Target" highlight="+10px Per Click" result="Counters the shrink" />
                  <RuleItem num="2" color="indigo" text="Scoring Threshold" highlight="10 Clicks = 1 Point" result="Build score rapidly" />
                </div>
                <div className="space-y-5">
                  <RuleItem num="3" color="orange" text="Dynamic Difficulty" highlight="Scales with Score" result="Faster shrinking at high scores" />
                  <RuleItem num="4" color="blue" text="Collapse Condition" highlight="Target hits 0px" result="Game Over" />
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
                <GraduationCap className="w-5 h-5 text-fuchsia-400" />
                <h2 className="font-bold text-white text-lg tracking-wide">About the Click Speed Test</h2>
              </div>
              <div className="p-8 space-y-8">
                <section>
                  <h2 className="text-xl font-bold text-white mb-3">Mastering the CPS Test</h2>
                  <p className="text-sm leading-relaxed mb-4">
                    Our free Click Speed Test online is designed as an endless rapid tapping game to test and push your Clicks Per Second (CPS) to the maximum. By requiring you to rapidly expand a constantly shrinking ball, this clicking endurance drill forces you to maintain an extremely high mouse click speed over a sustained period, rather than just a 5-second burst. Difficulty scales aggressively as your score increases—demanding elite finger speed training to survive.
                  </p>
                </section>

                {/* Grid Section */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center"><Users className="w-4 h-4 text-white" /></div>
                      <h3 className="text-sm font-bold text-white">Who Should Play</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Competitive Minecraft PvP players, MOBA gamers needing high APM, FPS players building clicking endurance, and anyone taking a mouse speed test.</p>
                  </div>
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-green-600 flex items-center justify-center"><TrendingUp className="w-4 h-4 text-white" /></div>
                      <h3 className="text-sm font-bold text-white">Skills Targeted</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Improves raw Clicks Per Second (CPS), forearm endurance, jitter clicking technique, butterfly clicking consistency, and mouse control under fatigue.</p>
                  </div>
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center"><BarChart3 className="w-4 h-4 text-white" /></div>
                      <h3 className="text-sm font-bold text-white">What You'll Track</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Total gamified score, survival time, total clicks, maximum shrink difficulty, and your final performance grade.</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#0b0f19] border-t border-gray-800 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Lightbulb className="w-6 h-6 text-yellow-400" />
                  <h2 className="text-xl font-bold text-white">Frequently Asked Questions</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FAQItem q="What is CPS?" a="CPS stands for Clicks Per Second. It is a measurement of how fast you can click your mouse button within a single second, often used as a benchmark for gaming reflex speed and finger dexterity." />
                  <FAQItem q="How do I improve my click speed?" a="You can improve by regularly practicing with a CPS test, doing finger stretching exercises, and learning advanced mouse clicking techniques like jitter, butterfly, or drag clicking." />
                  <FAQItem q="What is a good CPS?" a="A good competitive CPS is generally between 8 and 10 clicks per second. Elite players can reach 12 to 15+ CPS using specialized clicking methods." />
                  <FAQItem q="What is an average CPS?" a="The average gamer scores around 5 to 7 clicks per second using standard, relaxed clicking techniques." />
                  <FAQItem q="How many clicks per second is good?" a="Anything above 8 clicks per second is considered highly competitive for casual gaming, while 12+ is the standard for top-tier PvP environments like Minecraft." />
                  <FAQItem q="Does CPS matter in Minecraft?" a="Yes, CPS is extremely important in Minecraft PvP. Higher click speeds allow you to land more hits, deal more knockback, and easily trap opponents in hit combos." />
                  <FAQItem q="Does CPS matter in FPS games?" a="In tactical shooters like CS2 and Valorant, raw CPS is less critical than aiming accuracy. However, having high finger agility helps you fire semi-automatic weapons rapidly without tensing your hand and ruining your aim." />
                  <FAQItem q="Can this improve clicking endurance?" a="Yes, because this is an endless survival game rather than a short 5-second timer, it actively builds forearm stamina and resistance to finger fatigue over prolonged gaming sessions." />
                  <FAQItem q="Does rapid tapping improve finger speed?" a="Yes. Consistently pushing your clicking limits trains your neuromuscular pathways, leading to faster twitch-muscle response times in your fingers." />
                  <FAQItem q="Is this drill free?" a="Absolutely. Our Click Speed Test is 100% free to use. There are no paywalls, downloads, or sign-ups required." />
                  <FAQItem q="Does it work on mobile?" a="Yes, the rapid tapping game is fully responsive and supports touch events, allowing you to test your screen tapping speed on smartphones and tablets." />
                  <FAQItem q="How often should I practice?" a="For best results, integrate 5 to 10 minutes of clicking endurance practice into your daily gaming warmup. Avoid over-practicing to prevent hand strain or injury." />
                  <FAQItem q="What is jitter clicking?" a="Jitter clicking is a technique where you tense your forearm to create a rapid vibration, transferring that micro-movement into the mouse button to achieve 10-14 CPS." />
                  <FAQItem q="What is butterfly clicking?" a="Butterfly clicking involves alternating rapid clicks between your index and middle fingers on the same mouse button, often yielding 15-20+ CPS on mice that allow double-clicking." />
                  <FAQItem q="What is drag clicking?" a="Drag clicking is dragging your finger forcefully across the surface of the mouse button. The friction causes the switch to bounce rapidly, sometimes generating 30+ CPS on specific hardware." />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* RELATED DRILLS SECTION */}
        {!isFullscreen && (
          <section className="mt-14" aria-label="Explore related aim and response drills">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-5 rounded-full bg-fuchsia-500"></div>
              <h2 className="text-xs font-bold text-white uppercase tracking-widest font-mono">
                Explore Related Drills
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <RelatedCard href="/drills/motor/hand-eye-coordination/aim-trainer" title="Aim Trainer" desc="Hone spatial coordinate click speed." color="blue" icon={<Target className="w-4 h-4" />} />
              <RelatedCard href="/drills/motor/movement-speed/finger-sequencing" title="Finger Sequencing" desc="Practice rapid finger patterns." color="purple" icon={<Keyboard className="w-4 h-4" />} />
              <RelatedCard href="/drills/fps/flick-shot-training" title="Flick Shot Trainer" desc="Snap to targets in time-attack mode." color="orange" icon={<Crosshair className="w-4 h-4" />} />
              <RelatedCard href="/drills/cognitive/processing-speed/reaction-time" title="Reaction Time" desc="Test visual reaction speed directly." color="green" icon={<Zap className="w-4 h-4" />} />
              <RelatedCard href="/drills/motor/timing-accuracy/stopwatch-click" title="Rhythm Tap" desc="Tap in sync with visual cues." color="cyan" icon={<Clock className="w-4 h-4" />} />
              <RelatedCard href="/drills/motor/hand-eye-coordination/click-accuracy" title="Click Accuracy" desc="Hit small targets precisely." color="red" icon={<Target className="w-4 h-4" />} />
              <RelatedCard href="/drills/motor/timing-accuracy/synchronization" title="360 FPS Reflex" desc="Ultra-fast reflex training." color="teal" icon={<Gauge className="w-4 h-4" />} />
              <RelatedCard href="/drills/motor/precision-control/steady-hand" title="Steady Hand" desc="Navigate paths without touching edges." color="indigo" icon={<Heart className="w-4 h-4" />} />
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
                    <li><Link href="/drills/motor/hand-eye-coordination/aim-trainer" className="hover:text-fuchsia-400 transition-colors">Aim Trainer Elite</Link></li>
                    <li><Link href="/drills/fps/flick-shot-training" className="hover:text-fuchsia-400 transition-colors">Flick Shot Trainer</Link></li>
                    <li><Link href="/drills/fps" className="text-fuchsia-500 hover:text-fuchsia-400 transition-colors font-bold">All FPS Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Memory</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/memory/working-memory/n-back" className="hover:text-fuchsia-400 transition-colors">3-Back Training</Link></li>
                    <li><Link href="/drills/memory/short-term-memory/color-sequence" className="hover:text-fuchsia-400 transition-colors">Color Sequence</Link></li>
                    <li><Link href="/drills/memory" className="text-fuchsia-500 hover:text-fuchsia-400 transition-colors font-bold">All Memory Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Cognitive</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/cognitive/memory/card-matching" className="hover:text-fuchsia-400 transition-colors">Memory Games</Link></li>
                    <li><Link href="/drills/cognitive/attention/divided-attention" className="hover:text-fuchsia-400 transition-colors">Attention Drills</Link></li>
                    <li><Link href="/drills/cognitive" className="text-fuchsia-500 hover:text-fuchsia-400 transition-colors font-bold">All Cognitive Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Academic</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/academic/writing-speed/typing-test" className="hover:text-fuchsia-400 transition-colors">Typing Speed Test</Link></li>
                    <li><Link href="/drills/academic/math-speed/mental-math" className="hover:text-fuchsia-400 transition-colors">Mental Math</Link></li>
                    <li><Link href="/drills/academic" className="text-fuchsia-500 hover:text-fuchsia-400 transition-colors font-bold">All Academic Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">More Sectors</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/visual" className="hover:text-fuchsia-400 transition-colors">Visual (14)</Link></li>
                                        
                    <li><Link href="/drills/physical" className="hover:text-fuchsia-400 transition-colors">Physical (11)</Link></li>
                  </ul>
                </div>
              </div>
              
              <div className="border-t border-slate-900 pt-8 text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="w-6 h-6 bg-gradient-to-br from-fuchsia-500/25 to-purple-500/25 border border-fuchsia-500/30 rounded-lg flex items-center justify-center">
                    <Crosshair className="w-3.5 h-3.5 text-fuchsia-400" />
                  </div>
                  <span className="text-white font-black tracking-widest text-xs uppercase">SkillDrills</span>
                </div>
                <p className="text-[9px] mb-2">&copy; 2026 SkillDrills. All rights reserved.</p>
                <p className="text-[9px] max-w-2xl mx-auto leading-relaxed mb-6 font-sans text-gray-500">
                  Open-source telemetry training platform using hardware pointer lock. Free forever. No downloads required.
                </p>
                <div className="flex items-center justify-center gap-4 flex-wrap mt-6">
                  <a href="https://youtube.com/@skilldrills.online" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors p-2.5 bg-gray-900 rounded-full hover:bg-gray-800 shadow-md" title="YouTube">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                  </a>
                  <a href="https://www.facebook.com/profile.php?id=61590093843779" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors p-2.5 bg-gray-900 rounded-full hover:bg-gray-800 shadow-md" title="Facebook">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  </a>
                  <a href="https://x.com/skilldrillss" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors p-2.5 bg-gray-900 rounded-full hover:bg-gray-800 shadow-md" title="Twitter / X">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
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
    indigo: 'from-indigo-500 to-purple-500',
    cyan: 'from-cyan-500 to-blue-500',
    teal: 'from-teal-500 to-emerald-500'
  };
  return (
    <Link href={href} className="group relative overflow-hidden rounded-2xl border border-gray-800 bg-[#0b0f19]/40 transition-all hover:-translate-y-1 hover:border-fuchsia-500/50 block p-5">
      <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${gradients[color] || 'from-fuchsia-500 to-purple-500'}`}></div>
      <div className="w-10 h-10 rounded-xl bg-[#050811] border border-gray-700 flex items-center justify-center text-gray-400 group-hover:text-white mb-3 shadow-inner">
        {icon}
      </div>
      <h3 className="font-bold text-base mb-1.5 text-white group-hover:text-fuchsia-400 transition-colors">{title}</h3>
      <p className="text-xs text-gray-500 mb-4">{desc}</p>
      <div className="flex items-center gap-1.5 text-fuchsia-400 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-wider">
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