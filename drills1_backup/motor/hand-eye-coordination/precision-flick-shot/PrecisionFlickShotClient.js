'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';

import { 
  Activity, AlertCircle, ArrowRight, BarChart3, ChevronRight, 
  Clock, Crosshair, Eye, GraduationCap, Info, Lightbulb, 
  Maximize2, Minimize2, Play, RefreshCw, Target, 
  Timer, TrendingUp, Trophy, Volume2, VolumeX, 
  Share2, CheckCircle2, Zap, Users, Sparkles, XCircle
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
      
      if (type === 'bullseye') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(987.77, now);
        osc.frequency.exponentialRampToValueAtTime(1800, now + 0.15);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
        osc.start(now); osc.stop(now + 0.15);
      } else if (type === 'hit') { 
        osc.type = 'sine';
        osc.frequency.setValueAtTime(659.25, now);
        osc.frequency.exponentialRampToValueAtTime(1100, now + 0.12);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
        osc.start(now); osc.stop(now + 0.12);
      } else if (type === 'miss') { 
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(120, now);
        osc.frequency.exponentialRampToValueAtTime(40, now + 0.35);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        osc.start(now); osc.stop(now + 0.35);
      } else if (type === 'levelup') { 
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, now);
        osc.frequency.setValueAtTime(659.25, now + 0.08);
        osc.frequency.setValueAtTime(783.99, now + 0.16);
        osc.frequency.setValueAtTime(1046.50, now + 0.24);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
        osc.start(now); osc.stop(now + 0.4);
      }
    } catch (e) {}
  }
  
  setEnabled(status) {
    this.enabled = status;
  }
}

const audioSynth = typeof window !== 'undefined' ? new AudioSynthesizer() : null;
const GAME_DURATION = 45; 

export default function PrecisionFlickShotClient() {
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
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [isNewBest, setIsNewBest] = useState(false);
  const [currentCombo, setCurrentCombo] = useState(0);
  const [comboMult, setComboMult] = useState(1.0);
  const [liveAccuracy, setLiveAccuracy] = useState(100);

  // Analytics State
  const [analytics, setAnalytics] = useState({
    accuracy: 100,
    perfectRate: 0,
    maxStreak: 0,
    levelReached: 1,
    gradeData: { grade: 'D', color: 'text-slate-500', advice: '' }
  });

  // === DOM Refs ===
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  const pageRef = useRef(null);
  
  // === Game Logic Engine Refs ===
  const engine = useRef({
    crosshair: { x: 0, y: 0, initialized: false },
    targets: [],
    nextTargetId: 0,
    spawnTimer: 0,
    
    score: 0,
    timeLeft: GAME_DURATION,
    level: 1,
    comboCount: 0,
    maxCombo: 0,
    comboMultiplier: 1.0,
    
    // Scaling Metrics
    spawnInterval: 1.4,
    maxRadius: 36,
    decayRate: 18,
    
    // Telemetry & Stats
    totalClicks: 0,
    hits: 0,
    bullseyes: 0,
    misses: 0,
    
    particles: [],
    screenShake: 0,
    flashRed: 0
  });

  const cmPer360 = (30 / universalSens).toFixed(1);

  // === Local Storage Ingest ===
  useEffect(() => {
    try {
      const savedSens = localStorage.getItem('precisionFlick_sens');
      if (savedSens) setUniversalSens(parseFloat(savedSens));
      const savedBest = localStorage.getItem('precisionFlick_bestScore2');
      if (savedBest) setBestScore(parseInt(savedBest, 10));
    } catch (e) {}
  }, []);

  useEffect(() => {
    if (gameState !== 'playing') {
      try { localStorage.setItem('precisionFlick_sens', universalSens.toString()); } catch (e) {}
    }
    if (audioSynth) audioSynth.setEnabled(soundEnabled);
  }, [universalSens, gameState, soundEnabled]);

  // === FULLSCREEN LOGIC ===
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
  // =================================

  // === End Game & Ingest Analytics ===
  const endGame = useCallback(() => {
    setGameState('gameOver');
    if (document.pointerLockElement) document.exitPointerLock();
    
    const e = engine.current;
    const finalAcc = e.totalClicks > 0 ? Math.round((e.hits / e.totalClicks) * 100) : 0;
    const perfectRate = e.hits > 0 ? Math.round((e.bullseyes / e.hits) * 100) : 0;

    let grade = 'D';
    let gradeColor = 'text-gray-400';
    let advice = 'Keep practicing! Focus on smooth cursor control and stopping directly on the target before clicking.';
    
    if (finalAcc >= 90 && perfectRate >= 50 && e.score >= 2000) {
      grade = 'S+';
      gradeColor = 'text-yellow-400';
      advice = 'Elite precision! Your flick accuracy and center-click timing are highly calibrated for esports-level play.';
    } else if (finalAcc >= 85 && perfectRate >= 40 && e.score >= 1500) {
      grade = 'S';
      gradeColor = 'text-yellow-500';
      advice = 'Outstanding aim! You have great target acquisition. Push your combo higher by eliminating edge-misses.';
    } else if (finalAcc >= 75 && perfectRate >= 30 && e.score >= 1000) {
      grade = 'A';
      gradeColor = 'text-fuchsia-400';
      advice = 'Great tracking and snapping! Try to click slightly faster as the targets shrink to increase your Bulls-eye rate.';
    } else if (finalAcc >= 65 && e.score >= 500) {
      grade = 'B';
      gradeColor = 'text-cyan-400';
      advice = 'Good fundamentals. You are letting your combo reset too often. Aim for consistency over raw speed.';
    } else if (finalAcc >= 50 && e.score >= 200) {
      grade = 'C';
      gradeColor = 'text-indigo-400';
      advice = 'Average performance. The screen is crowding because you are missing clicks. Make sure to confirm your crosshair is on target.';
    }

    setAnalytics({
      accuracy: finalAcc,
      perfectRate,
      maxStreak: e.maxCombo,
      levelReached: e.level,
      gradeData: { grade, color: gradeColor, advice }
    });

    setScore(Math.floor(e.score));

    setBestScore(prev => {
      const finalScore = Math.floor(e.score);
      if (finalScore > prev) {
        setIsNewBest(true);
        try { localStorage.setItem('precisionFlick_bestScore2', finalScore.toString()); } catch(err){}
        return finalScore;
      }
      return prev;
    });
  }, []);

  const spawnExplosion = useCallback((x, y, color, count) => {
    const e = engine.current;
    for (let i = 0; i < count; i++) {
      const a = Math.random() * Math.PI * 2;
      const s = Math.random() * 200 + 60;
      e.particles.push({
        x, y,
        vx: Math.cos(a) * s,
        vy: Math.sin(a) * s,
        radius: Math.random() * 4.5 + 1.5,
        color,
        life: 0.3
      });
    }
  }, []);

  const spawnTarget = useCallback((W, H) => {
    const e = engine.current;
    const padding = 50;
    const x = padding + Math.random() * (W - padding * 2);
    const y = padding + Math.random() * (H - padding * 2);
    
    e.targets.push({
      id: e.nextTargetId++,
      x, y,
      maxRadius: e.maxRadius,
      radius: e.maxRadius,
      decayRate: e.decayRate
    });
  }, []);

  const triggerMissEvent = useCallback((spawnAdditional = true) => {
    const e = engine.current;
    e.misses++;
    e.comboCount = 0;
    e.comboMultiplier = 1.0;
    e.screenShake = 8;
    e.flashRed = 0.25;
    
    // Deduct exactly 1 second for a miss or timeout
    e.timeLeft = Math.max(0, e.timeLeft - 1.0);
    
    if (audioSynth) audioSynth.playSound('miss');
    
    // Punish by crowding the screen, but enforce the strict MAX target limit based on level
    const maxTargets = Math.min(5, e.level);
    if (spawnAdditional && canvasRef.current && e.targets.length < maxTargets) {
      spawnTarget(canvasRef.current.width, canvasRef.current.height);
    }
  }, [spawnTarget]);

  const startGame = useCallback(() => {
    if (audioSynth) audioSynth.init(); 

    setIsNewBest(false);
    setScore(0);
    setCurrentCombo(0);
    setComboMult(1.0);
    setTimeLeft(GAME_DURATION);
    setLiveAccuracy(100);
    setGameState('playing');
    
    engine.current = {
      crosshair: { x: 250, y: 250, initialized: false },
      targets: [],
      nextTargetId: 0,
      spawnTimer: 0,
      
      score: 0,
      timeLeft: GAME_DURATION,
      level: 1,
      comboCount: 0,
      maxCombo: 0,
      comboMultiplier: 1.0,
      
      spawnInterval: 1.4,
      maxRadius: 36,
      decayRate: 18,
      
      totalClicks: 0,
      hits: 0,
      bullseyes: 0,
      misses: 0,
      
      particles: [],
      screenShake: 0,
      flashRed: 0
    };

    if (containerRef.current && !document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(()=>{});
    }
    if (canvasRef.current && !document.pointerLockElement) {
      canvasRef.current.requestPointerLock().catch(()=>{});
    }
  }, []);

  // === Mouse Input Handler ===
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
      
      const ch = engine.current.crosshair;
      ch.x = Math.max(0, Math.min(cvs.width, ch.x + dx));
      ch.y = Math.max(0, Math.min(cvs.height, ch.y + dy));
    };

    const handleMouseDown = (e) => {
      if (e.target.tagName === 'BUTTON' || e.target.closest('button')) return;
      if (gameState === 'playing') {
        if (!pointerLocked && canvasRef.current) {
          canvasRef.current.requestPointerLock();
          return;
        }
        
        const eng = engine.current;
        eng.totalClicks++;

        let hitIndex = -1;
        let closestDist = 9999;
        
        eng.targets.forEach((t, idx) => {
          const d = Math.hypot(t.x - eng.crosshair.x, t.y - eng.crosshair.y);
          if (d < t.radius && d < closestDist) {
            closestDist = d;
            hitIndex = idx;
          }
        });

        if (hitIndex !== -1) {
          const hitTarget = eng.targets[hitIndex];
          eng.hits++;
          eng.comboCount++;
          if (eng.comboCount > eng.maxCombo) eng.maxCombo = eng.comboCount;
          
          // Combo math: +0.1x per 10 hits
          eng.comboMultiplier = 1.0 + Math.floor(eng.comboCount / 10) * 0.1;
          
          const isBullseye = closestDist <= 8;
          if (isBullseye) {
            eng.bullseyes++;
            eng.score += 20 * eng.comboMultiplier;
            eng.timeLeft = Math.min(60.0, eng.timeLeft + 1.5);
            if (audioSynth) audioSynth.playSound('bullseye');
            spawnExplosion(hitTarget.x, hitTarget.y, '#eab308', 16);
          } else {
            eng.score += 10 * eng.comboMultiplier;
            eng.timeLeft = Math.min(60.0, eng.timeLeft + 0.8);
            if (audioSynth) audioSynth.playSound('hit');
            spawnExplosion(hitTarget.x, hitTarget.y, '#06b6d4', 8);
          }

          // Endless Level Scaling (Level up every 100 pts)
          const newLevel = Math.floor(eng.score / 100) + 1;
          if (newLevel > eng.level) {
            eng.level = newLevel;
            // Floor scaling to reasonable min/max
            eng.spawnInterval = Math.max(0.35, 1.4 - (eng.level * 0.1) + 0.1);
            eng.maxRadius = Math.max(16, 36 - (eng.level * 1.5) + 1.5);
            eng.decayRate = Math.min(50, 18 + (eng.level * 2.5) - 2.5);
            if (audioSynth) audioSynth.playSound('levelup');
          }

          eng.targets.splice(hitIndex, 1);
          setScore(Math.floor(eng.score));
          setCurrentCombo(eng.comboCount);
          setComboMult(eng.comboMultiplier);
          setLiveAccuracy(Math.round((eng.hits / eng.totalClicks) * 100));

        } else {
          // Misclicked empty space
          triggerMissEvent(true);
          setLiveAccuracy(Math.round((eng.hits / eng.totalClicks) * 100));
          setCurrentCombo(0);
          setComboMult(1.0);
        }
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, [gameState, pointerLocked, universalSens, triggerMissEvent, spawnExplosion]);

  // === Main Game Loop Renderer ===
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

    const loop = (time) => {
      const deltaTimeMs = time - lastTime;
      lastTime = time;
      const dt = Math.min(deltaTimeMs / 1000, 0.1); 
      const e = engine.current;

      if (gameState === 'playing' && pointerLocked) {
        e.timeLeft = Math.max(0, e.timeLeft - dt);
        setTimeLeft(e.timeLeft);

        if (e.timeLeft <= 0) {
          endGame();
          return;
        }

        // Target Spawner (Dynamic Max Targets based on Level)
        const maxTargets = Math.min(5, e.level);

        // Instant respawn if canvas is empty to keep game fast and engaging
        if (e.targets.length === 0 && e.spawnTimer < e.spawnInterval - 0.1) {
          e.spawnTimer = e.spawnInterval;
        }

        e.spawnTimer += dt;
        if (e.spawnTimer >= e.spawnInterval) {
          e.spawnTimer = 0;
          if (e.targets.length < maxTargets) {
            spawnTarget(cvs.width, cvs.height);
          }
        }

        // FX Decay
        if (e.screenShake > 0) e.screenShake -= dt * 45;
        if (e.flashRed > 0) e.flashRed -= dt * 2.0;

        // Target shrinking update
        for (let i = e.targets.length - 1; i >= 0; i--) {
          const t = e.targets[i];
          t.radius -= t.decayRate * dt;
          
          if (t.radius <= 4) {
            triggerMissEvent(true);
            spawnExplosion(t.x, t.y, '#ef4444', 10);
            e.targets.splice(i, 1);
            setCurrentCombo(0);
            setComboMult(1.0);
          }
        }
      }

      // --- Rendering Logic ---
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

      ctx.strokeStyle = 'rgba(6, 182, 212, 0.03)';
      ctx.lineWidth = 1; 
      for(let i = 0; i < cvs.width; i+= 60) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, cvs.height); ctx.stroke(); }
      for(let j = 0; j < cvs.height; j+= 60) { ctx.beginPath(); ctx.moveTo(0, j); ctx.lineTo(cvs.width, j); ctx.stroke(); }

      if (gameState === 'playing' || gameState === 'start') {
        e.targets.forEach(t => {
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
          ctx.lineWidth = 1;
          ctx.beginPath(); ctx.arc(t.x, t.y, t.maxRadius, 0, Math.PI * 2); ctx.stroke();
          
          ctx.strokeStyle = '#06b6d4';
          ctx.lineWidth = 2;
          ctx.beginPath(); ctx.arc(t.x, t.y, t.radius, 0, Math.PI * 2); ctx.stroke();
          
          ctx.fillStyle = 'rgba(6, 182, 212, 0.05)';
          ctx.beginPath(); ctx.arc(t.x, t.y, t.radius, 0, Math.PI * 2); ctx.fill();
          
          ctx.fillStyle = '#eab308';
          ctx.beginPath(); ctx.arc(t.x, t.y, 4, 0, Math.PI * 2); ctx.fill();
        });
      }

      // Particles
      for (let i = e.particles.length - 1; i >= 0; i--) {
        const p = e.particles[i];
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.life -= dt;
        if (p.life <= 0) { e.particles.splice(i, 1); continue; }
        ctx.fillStyle = p.color;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2); ctx.fill();
      }

      if (e.flashRed > 0) {
        ctx.fillStyle = `rgba(239, 68, 68, ${e.flashRed})`;
        ctx.fillRect(0, 0, cvs.width, cvs.height);
      }

      // Crosshair
      const ch = e.crosshair;
      if (ch.initialized && (gameState === 'playing' || gameState === 'start')) {
        const activeColor = pointerLocked ? '#06b6d4' : '#3b82f6';
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

      ctx.restore();
      animationRef.current = requestAnimationFrame(loop);
    };

    animationRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animationRef.current);
      resizeObserver.disconnect();
    };
  }, [gameState, pointerLocked, endGame, spawnTarget, triggerMissEvent, spawnExplosion]);

  const shareScore = useCallback(async () => {
    const text = `🎯 I scored ${score} PTS (Level ${analytics.levelReached}) in the Flick Aim Trainer! Grade: ${analytics.gradeData.grade}, Accuracy: ${analytics.accuracy}%, Max Combo: ${analytics.maxStreak}x. Practice mouse control at skilldrills.online!`;
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({ title: 'My Flick Aim Score', text, url: 'https://skilldrills.online/drills/motor/hand-eye-coordination/precision-flick-shot' });
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
                <li className="text-cyan-400 font-medium">Precision Flick Shot</li>
              </ol>
            </nav>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                  <Crosshair className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Precision Flick Shot</h1>
                  <p className="text-sm text-gray-400 mt-1 font-medium">Flick Aim Trainer • Mouse Accuracy Test</p>
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

        {/* Live HUD stats */}
        {!isFullscreen && (
          <div className="grid grid-cols-5 gap-2 mb-2">
            <StatCard icon={<Trophy className="text-cyan-400" />} value={score} label="Score" />
            <StatCard icon={<Zap className="text-yellow-400" />} value={`${comboMult.toFixed(1)}x`} label={`Combo: ${currentCombo}`} highlight={comboMult >= 1.2} />
            <StatCard icon={<TrendingUp className="text-fuchsia-400" />} value={`Lv. ${gameState === 'playing' ? engine.current.level : analytics.levelReached}`} label="Level" />
            <StatCard icon={<Target className="text-green-500" />} value={`${liveAccuracy}%`} label="Accuracy" />
            <StatCard icon={<Timer className={timeLeft <= 10 ? 'text-red-400 animate-pulse' : 'text-blue-400'} />} value={timeLeft.toFixed(1)} label="Time" unit="s" />
          </div>
        )}

        {/* Engine viewport */}
        <div 
          ref={containerRef} 
          className={`relative overflow-hidden transition-colors outline-none bg-[#05060b] ${
            isFullscreen ? 'w-full h-full' : 'w-full aspect-video min-h-[500px] rounded-2xl border border-gray-800 shadow-2xl'
          }`}
        >
          {gameState === 'playing' && (
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gray-900 z-[100]">
              <div 
                className={`h-full ${timeLeft <= 10 ? 'bg-red-500 animate-pulse' : 'bg-cyan-500'}`}
                style={{ width: `${Math.min(100, (timeLeft / Math.max(45, timeLeft)) * 100)}%` }} 
              />
            </div>
          )}

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

          {gameState === 'playing' && !pointerLocked && (
            <div 
              className="absolute inset-0 z-40 bg-black/60 backdrop-blur-sm flex items-center justify-center cursor-pointer"
              onClick={(e) => { 
                e.stopPropagation(); 
                if (canvasRef.current) canvasRef.current.requestPointerLock(); 
              }}
            >
              <div className="text-center animate-pulse pointer-events-none">
                <AlertCircle className="w-12 h-12 text-cyan-500 mx-auto mb-4" />
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
                  Precision Flick Shot
                </h2>
                <p className="text-xs text-slate-500 uppercase tracking-widest mb-6">
                  Flick Aim Trainer • Mouse Accuracy Test
                </p>

                <div className="grid grid-cols-2 gap-3 mb-6 text-left">
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Objective</span>
                    <span className="text-sm font-black text-white">Target Elimination</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Reward</span>
                    <span className="text-sm font-black text-green-400">+Combo & +Time</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Penalty</span>
                    <span className="text-sm font-black text-red-400">Combo Reset & -1.0s</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Mechanic</span>
                    <span className="text-sm font-black text-cyan-400">Shrinking Aperture</span>
                  </div>
                </div>

                <div className="bg-[#0b0f19] border border-slate-850 p-4 rounded-xl mb-4 text-left text-xs text-slate-400">
                  <span className="text-xs font-bold text-white block uppercase mb-1 flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-cyan-500" /> Mouse Control Training
                  </span>
                  <ul className="list-disc pl-4 space-y-1 text-[10px] text-slate-500 leading-relaxed">
                    <li>Hit inner center for Double Points & Max Time recovery</li>
                    <li>Missing deducts 1.0s and resets your combo multiplier</li>
                    <li>The game starts with 1 target, and scales up to 5 at high levels.</li>
                  </ul>
                </div>

                <div className="bg-[#0b0f19] border border-slate-850 p-4 rounded-xl mb-6 text-left text-xs text-slate-400">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-white uppercase mb-3">
                    <Crosshair className="w-3.5 h-3.5 text-blue-500" /> Universal Sens
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-green-400 font-mono text-sm font-bold">{universalSens.toFixed(2)}x</span>
                    <span className="text-[10px] text-slate-500">Approx: {cmPer360} cm/360</span>
                  </div>
                  <input 
                    type="range" min="0.1" max="3.0" step="0.05" 
                    value={universalSens} 
                    onChange={(e) => setUniversalSens(parseFloat(e.target.value))} 
                    className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500" 
                  />
                </div>

                <button
                  onClick={startGame}
                  className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg uppercase tracking-widest transition-all duration-200 active:scale-95"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  Play Flick Aim Trainer
                </button>
              </div>
            </div>
          )}

          {/* GAME OVER SCREEN */}
          {gameState === 'gameOver' && analytics.gradeData && (
            <div className="absolute inset-0 bg-[#05070e]/98 flex flex-col items-center justify-center p-6 z-30 select-none overflow-y-auto max-h-[100vh] backdrop-blur-sm">
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
                  Peak Level: Level {analytics.levelReached}
                </p>

                <div className="grid grid-cols-3 gap-2.5 mb-6 text-left">
                  <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
                    <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Final Score</span>
                    <span className="text-base font-black text-white">{score}</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
                    <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Hit Accuracy</span>
                    <span className="text-base font-black text-white">{analytics.accuracy}%</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
                    <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Max Streak</span>
                    <span className="text-base font-black text-green-400">{analytics.maxStreak}</span>
                  </div>
                  
                  <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
                    <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Level Reached</span>
                    <span className="text-base font-black text-cyan-400">{analytics.levelReached}</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
                    <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Perfect Center</span>
                    <span className="text-base font-black text-yellow-400">{analytics.perfectRate}%</span>
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
                    <Sparkles className="w-3 h-3 text-cyan-400" /> Analytics Advice:
                  </div>
                  <p className="text-[10px] text-slate-400 leading-normal">
                    {analytics.gradeData.advice}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={startGame}
                    className="flex-1 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg uppercase tracking-widest transition-all duration-200 active:scale-95"
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
                <Info className="w-5 h-5 text-cyan-400" /><h2 className="font-bold text-white text-lg tracking-wide">Game Rules & Combo Scoring</h2>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-5">
                  <RuleItem num="1" color="green" text="Bulls-eye Focus" highlight="Double Points" result="Inner center grants +20 & +1.5s" />
                  <RuleItem num="2" color="indigo" text="Zero Negative Scoring" highlight="No Point Deductions" result="Points only go up, never down" />
                </div>
                <div className="space-y-5">
                  <RuleItem num="3" color="red" text="Miss Punishment" highlight="-1.0s Time Penalty" result="Combo reset, -1.0s & target overload" />
                  <RuleItem num="4" color="cyan" text="Endless Difficulty" highlight="Level up every 100pts" result="Faster spawns & tighter radii" />
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
                <GraduationCap className="w-5 h-5 text-cyan-400" />
                <h2 className="font-bold text-white text-lg tracking-wide">About the Flick Aim Trainer</h2>
              </div>
              
              <div className="p-8 space-y-8">
                <section>
                  <h2 className="text-xl font-bold text-white mb-3">Mastering the Mouse Accuracy Test</h2>
                  <p className="text-sm leading-relaxed mb-4">
                    This free aim training game is designed to push your click precision and target acquisition speed to the absolute limit. There is no negative scoring—your goal is simply to survive by building up massive combo multipliers. As your score rises, the game scales endlessly, forcing faster reaction times and smaller target tracking. Missing a click resets your combo and immediately spawns another target (up to your level's maximum threshold), quickly overloading your screen if you lose mouse control.
                  </p>
                </section>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
                  <div className="p-5 rounded-xl border bg-black/40 border-gray-800">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center"><Users className="w-4 h-4 text-white" /></div>
                      <h3 className="text-sm font-bold text-white">Who Should Play</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-slate-400">FPS gamers seeking a dedicated flick shot trainer, esports competitors looking to refine mouse control, and anyone testing their hand eye coordination.</p>
                  </div>
                  <div className="p-5 rounded-xl border bg-black/40 border-gray-800">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-green-600 flex items-center justify-center"><TrendingUp className="w-4 h-4 text-white" /></div>
                      <h3 className="text-sm font-bold text-white">Skills Targeted</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-slate-400">Improves rapid flick aim, click accuracy, visual spatial coordinate snapping, and high-pressure reaction speed consistency.</p>
                  </div>
                  <div className="p-5 rounded-xl border bg-black/40 border-gray-800">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center"><BarChart3 className="w-4 h-4 text-white" /></div>
                      <h3 className="text-sm font-bold text-white">What You'll Track</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-slate-400">Total gamified score, your click accuracy percentage, maximum combo streaks, Bulls-eye percentage, and performance grade.</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#0b0f19] border-t border-gray-800 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Lightbulb className="w-6 h-6 text-yellow-400" />
                  <h2 className="text-xl font-bold text-white">Frequently Asked Questions</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FAQItem q="What is a Flick Aim Trainer?" a="A Flick Aim Trainer is a browser-based mouse accuracy test designed to improve your reaction speed, click accuracy, and spatial muscle memory by spawning targets that you must rapidly snap to and click before they disappear." />
                  <FAQItem q="How do professional FPS players improve flick aim?" a="Professional players build muscle memory through endless repetition in dedicated aim training games, isolating the raw mechanical flick and center-click precision required to instantly acquire targets under pressure." />
                  <FAQItem q="Does flick training improve Valorant aim?" a="Yes, tactical shooters like Valorant and CS2 rely heavily on fast target acquisition and micro-flicks to hit headshots efficiently. This drill isolates that exact mechanical requirement." />
                  <FAQItem q="Can this improve CS2 aim?" a="Absolutely. CS2 demands immediate, raw mouse accuracy to win gunfights. By training yourself to hit the inner bulls-eye nodes of shrinking targets, you directly condition the precision needed for CS2." />
                  <FAQItem q="Is this an aim trainer for beginners?" a="Yes! The game features endless dynamic scaling. It starts out slow and forgiving at Level 1, and only increases in difficulty as you reach higher score thresholds, making it perfect for all skill levels." />
                  <FAQItem q="How often should I practice flick shots?" a="For optimal results, implement 10 to 15 minutes of flick shot training into your daily gaming warmup to effectively calibrate your hand-eye coordination before jumping into competitive matches." />
                  <FAQItem q="Does this work on mobile?" a="Yes, the precision clicking game handles touch events perfectly, making it an excellent reaction time and hand-eye coordination game for mobile users as well." />
                  <FAQItem q="What skills does this improve?" a="This drill targets flick aim, click accuracy, visual target acquisition, reaction speed, fine mouse control, and high-pressure spatial coordination." />
                </div>
              </div>
            </div>
          </article>
        )}

        {/* Related Drills */}
        {!isFullscreen && (
          <section className="mt-14" aria-label="Explore related hand eye coordination games">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-5 rounded-full bg-cyan-500"></div>
              <h2 className="text-xs font-bold text-white uppercase tracking-widest font-mono">
                Explore More Aim Trainers
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <RelatedCard href="/drills/motor/hand-eye-coordination/aim-trainer" title="Aim Trainer" desc="Hone click speed on shrinking targets." color="green" icon={<Target className="w-4 h-4" />} />
              <RelatedCard href="/drills/fps/strafe-tracking" title="Strafe Tracking Pro" desc="Unpredictable dynamic tracking pursuit." color="orange" icon={<SlidersIcon />} />
              <RelatedCard href="/drills/fps/recoil-control" title="Recoil Control" desc="Calibrate pulling pattern compensation." color="red" icon={<Activity className="w-4 h-4" />} />
              <RelatedCard href="/drills/motor/hand-eye-coordination/mouse-tracking-trainer" title="Tracking Game" desc="Smooth pursuit mouse control training." color="blue" icon={<Crosshair className="w-4 h-4" />} />
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
                    <li><Link href="/drills/visual" className="hover:text-cyan-400 transition-colors">Visual</Link></li>
                    <li><Link href="/drills/physical" className="hover:text-cyan-400 transition-colors">Physical</Link></li>
                  </ul>
                </div>
              </div>
              
              <div className="border-t border-gray-800 pt-8 text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="w-6 h-6 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 rounded-lg flex items-center justify-center">
                    <Target className="w-3.5 h-3.5 text-cyan-400" />
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
      <div className="flex items-center gap-1.5 text-cyan-400 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-wider">
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

function SlidersIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line><line x1="2" y1="14" x2="6" y2="14"></line><line x1="10" y1="8" x2="14" y2="8"></line><line x1="18" y1="16" x2="22" y2="16"></line></svg>
  );
}