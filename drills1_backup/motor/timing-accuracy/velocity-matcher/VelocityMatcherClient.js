'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';

import { 
  Activity, AlertCircle, ArrowRight, BarChart3, ChevronRight, 
  Clock, Crosshair, Eye, GraduationCap, Info, Lightbulb, 
  Maximize2, Minimize2, Play, RefreshCw, Target, 
  Timer, TrendingUp, Trophy, Volume2, VolumeX, 
  Share2, CheckCircle2, Zap, Users, Sparkles, XCircle, Route,
  Code2, Calculator, Shield, Brain, Hourglass
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

  playHitTier(tier) {
    if (!this.enabled || !this.ctx) return;
    try {
      if (this.ctx.state === 'suspended') this.ctx.resume();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      
      const freqMap = { 'PERFECT': 1318.51, 'EXCELLENT': 1046.50, 'GREAT': 880, 'GOOD': 659.25, 'CLOSE': 523.25 };
      osc.frequency.setValueAtTime(freqMap[tier] || 440, this.ctx.currentTime);
      
      gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.2);
      osc.connect(gain); gain.connect(this.ctx.destination);
      osc.start(); osc.stop(this.ctx.currentTime + 0.2);
    } catch(e) {}
  }

  playFail() {
    if (!this.enabled || !this.ctx) return;
    try {
      if (this.ctx.state === 'suspended') this.ctx.resume();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(120, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.3);
      osc.connect(gain); gain.connect(this.ctx.destination);
      osc.start(); osc.stop(this.ctx.currentTime + 0.3);
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

  playHeartbeat(intensity) {
    if (!this.enabled || !this.ctx) return;
    try {
      const n = this.ctx.currentTime;
      const throttle = intensity === 'max' ? 0.4 : intensity === 'high' ? 0.6 : 0.8;
      if (n - this.lastHeartbeat < throttle) return; 
      this.lastHeartbeat = n;

      const o = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      o.connect(g); g.connect(this.ctx.destination);
      
      o.type = 'sine';
      o.frequency.setValueAtTime(50, n);
      o.frequency.exponentialRampToValueAtTime(30, n + 0.2);
      g.gain.setValueAtTime(0.4, n);
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

export default function VelocityMatcherClient() {
  const [gameState, setGameState] = useState('start'); 
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [flashBg, setFlashBg] = useState(null);
  const [pointerLocked, setPointerLocked] = useState(false);
  
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(START_DURATION);
  const [isNewBest, setIsNewBest] = useState(false);
  
  const [combo, setCombo] = useState(0);
  const [comboMult, setComboMult] = useState(1.0);
  const [liveLevel, setLiveLevel] = useState(1);

  const [analytics, setAnalytics] = useState({
    accuracy: 100,
    perfectHits: 0,
    misses: 0,
    maxStreak: 0,
    levelReached: 1,
    avgError: 0,
    earlyCount: 0,
    lateCount: 0,
    gradeData: { grade: 'D', color: 'text-slate-500', advice: '' }
  });

  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  const pageRef = useRef(null);
  
  const engine = useRef({
    // Physics
    outerAngle: 0.0,
    outerSpeed: 2.0, 
    targetSpeed: 2.0, // Smooth interpolation target
    innerAngle: Math.PI, 
    innerSpeed: 2.0, 
    speedChangeTimer: 0,
    
    // Mechanics
    score: 0,
    timeLeft: START_DURATION,
    level: 1,
    combo: 0,
    maxCombo: 0,
    comboMultiplier: 1.0,
    
    // Telemetry
    totalAttempts: 0,
    hits: 0,
    misses: 0,
    perfectHits: 0,
    totalErrorAbs: 0,
    earlyCount: 0,
    lateCount: 0,
    
    particles: [],
    screenShake: 0,
    flashRed: 0,
    flashColor: null,
    ratingText: '',
    ratingTimer: 0
  });

  useEffect(() => {
    try {
      const savedBest = localStorage.getItem('velocityMatcherPro_bestScore');
      if (savedBest) setBestScore(parseInt(savedBest, 10));
    } catch (e) {}
  }, []);

  useEffect(() => {
    if (audioSynth) audioSynth.setEnabled(soundEnabled);
  }, [soundEnabled]);

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

  const endGame = useCallback(() => {
    setGameState('gameOver');
    if (document.pointerLockElement) document.exitPointerLock();
    
    const e = engine.current;
    const finalAccuracy = e.totalAttempts > 0 ? Math.round((e.hits / e.totalAttempts) * 100) : 0;
    const avgErr = e.hits > 0 ? Math.round(e.totalErrorAbs / e.hits) : 0;

    let grade = 'D';
    let gradeColor = 'text-gray-400';
    let advice = 'Keep practicing! Your motion prediction is erratic. ';
    
    if (e.earlyCount > e.lateCount * 1.5) {
      advice += "You consistently trigger EARLY. Trust your tracking and wait for the visual confirmation before clicking.";
    } else if (e.lateCount > e.earlyCount * 1.5) {
      advice += "You consistently trigger LATE. You are reacting rather than predicting. Anticipate the collision point.";
    } else {
      advice += "Focus on smoother prediction instead of reacting.";
    }
    
    if (e.level >= 15 && avgErr <= 15) {
      grade = 'S+';
      gradeColor = 'text-yellow-400';
      advice = 'Elite Prediction! Your velocity tracking and timing accuracy are flawlessly calibrated for esports-level execution.';
    } else if (e.level >= 10 && avgErr <= 25) {
      grade = 'S';
      gradeColor = 'text-yellow-500';
      advice = 'Outstanding aim! You have incredible motion prediction. Push your combo higher in the extreme speed variations.';
    } else if (e.level >= 7 && avgErr <= 35) {
      grade = 'A';
      gradeColor = 'text-fuchsia-400';
      advice = 'Great temporal accuracy! You struggled slightly as the orbital speeds randomized. Focus on tracking acceleration.';
    } else if (e.level >= 4 && avgErr <= 50) {
      grade = 'B';
      gradeColor = 'text-cyan-400';
      advice = 'Good fundamentals. You are letting your combo reset too often. Aim for consistency on the slower orbits to build time.';
    } else if (e.level >= 2) {
      grade = 'C';
      gradeColor = 'text-indigo-400';
      advice += ' Lower your panic clicking and establish a steady rhythm.';
    }

    setAnalytics({
      accuracy: finalAccuracy,
      perfectHits: e.perfectHits,
      misses: e.misses,
      maxStreak: e.maxCombo,
      levelReached: e.level,
      avgError: avgErr,
      earlyCount: e.earlyCount,
      lateCount: e.lateCount,
      gradeData: { grade, color: gradeColor, advice }
    });

    setBestScore(prev => {
      const finalScore = Math.floor(e.score);
      if (finalScore > prev) {
        setIsNewBest(true);
        try { localStorage.setItem('velocityMatcherPro_bestScore', finalScore.toString()); } catch(err){}
        return finalScore;
      }
      return prev;
    });
  }, []);

  const createExplosion = useCallback((x, y, color, count) => {
    const e = engine.current;
    for (let i = 0; i < count; i++) {
      const a = Math.random() * Math.PI * 2;
      const s = Math.random() * 6 + 1;
      e.particles.push({ x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s, life: 1.0, color });
    }
  }, []);

  const startGame = useCallback(async () => {
    if (audioSynth) audioSynth.init(); 

    setIsNewBest(false);
    setScore(0);
    setCombo(0);
    setComboMult(1.0);
    setLiveLevel(1);
    setTimeLeft(START_DURATION);
    setGameState('playing');
    
    engine.current = {
      outerAngle: 0.0, outerSpeed: 2.0, targetSpeed: 2.0, innerAngle: Math.PI, innerSpeed: 2.0, speedChangeTimer: 0,
      score: 0, timeLeft: START_DURATION, level: 1, combo: 0, maxCombo: 0, comboMultiplier: 1.0,
      totalAttempts: 0, hits: 0, misses: 0, perfectHits: 0, totalErrorAbs: 0, earlyCount: 0, lateCount: 0,
      particles: [], screenShake: 0, flashRed: 0, flashColor: null, ratingText: '', ratingTimer: 0
    };

    if (containerRef.current && !document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(()=>{});
    }
  }, []);

  const triggerMatchAttempt = useCallback(() => {
    if (gameState !== 'playing') return;
    const eRef = engine.current;
    if (!canvasRef.current) return;
    
    eRef.totalAttempts++;

    // Calculate angular distance
    let diff = (eRef.outerAngle - eRef.innerAngle) % (Math.PI * 2);
    if (diff < -Math.PI) diff += Math.PI * 2;
    if (diff > Math.PI) diff -= Math.PI * 2;
    
    const isEarly = diff > 0; // Relative to movement (assuming counter-clockwise base)
    const arcRadius = Math.min(canvasRef.current.width, canvasRef.current.height) * 0.32;
    const arcDist = Math.abs(diff) * arcRadius;
    
    const cx = canvasRef.current.width / 2;
    const cy = canvasRef.current.height / 2;
    const hitX = cx + Math.cos(eRef.outerAngle) * arcRadius;
    const hitY = cy + Math.sin(eRef.outerAngle) * arcRadius;

    // Hit Windows shrink based on level
    const windowScale = Math.max(0.6, 1.0 - (eRef.level * 0.015));
    const tPerfect = 10 * windowScale;
    const tExcellent = 25 * windowScale;
    const tGreat = 45 * windowScale;
    const tGood = 65 * windowScale;
    const tClose = 90 * windowScale;

    if (arcDist <= tClose) { 
      eRef.hits++;
      eRef.totalErrorAbs += arcDist;
      eRef.combo++;
      if (eRef.combo > eRef.maxCombo) eRef.maxCombo = eRef.combo;
      
      eRef.comboMultiplier = Math.min(4.0, 1.0 + Math.floor(eRef.combo / 10) * 0.5);

      let flashColor = '#06b6d4'; 
      let basePts = 0;
      let timeReward = 0;
      let rating = '';

      if (arcDist <= tPerfect) {
        basePts = 50; timeReward = 3.0; rating = 'PERFECT'; flashColor = '#fbbf24';
        eRef.perfectHits++;
      } else if (arcDist <= tExcellent) {
        basePts = 35; timeReward = 2.0; rating = 'EXCELLENT'; flashColor = '#00ff88';
      } else if (arcDist <= tGreat) {
        basePts = 20; timeReward = 1.0; rating = 'GREAT'; flashColor = '#3b82f6';
      } else if (arcDist <= tGood) {
        basePts = 10; timeReward = 0.5; rating = 'GOOD'; flashColor = '#8b5cf6';
      } else {
        basePts = 5; timeReward = 0.2; rating = 'CLOSE'; flashColor = '#d946ef';
      }

      eRef.score += basePts * eRef.comboMultiplier;
      eRef.timeLeft = Math.min(60.0, eRef.timeLeft + timeReward);
      
      if (isEarly) eRef.earlyCount++; else eRef.lateCount++;

      eRef.ratingText = rating;
      eRef.flashColor = flashColor;
      eRef.ratingTimer = 0.8;

      if (audioSynth) audioSynth.playHitTier(rating);
      createExplosion(hitX, hitY, flashColor, basePts);

      const newLevel = Math.floor(eRef.score / 100) + 1;
      if (newLevel > eRef.level) {
        eRef.level = newLevel;
        if (audioSynth) audioSynth.playLevelUp();
        setLiveLevel(eRef.level);
      }

      setFlashBg(rating === 'PERFECT' ? 'yellow' : rating === 'EXCELLENT' ? 'green' : 'cyan');
      setTimeout(() => setFlashBg(null), 100);

    } else { 
      // Miss
      eRef.misses++;
      eRef.combo = 0;
      eRef.comboMultiplier = 1.0;
      
      // Survival Penalty: -2.0s Time
      eRef.timeLeft = Math.max(0, eRef.timeLeft - 2.0); 
      eRef.screenShake = 15;
      eRef.flashRed = 0.25;
      
      eRef.ratingText = 'MISS';
      eRef.flashColor = '#ef4444';
      eRef.ratingTimer = 0.8;

      if (audioSynth) audioSynth.playFail();
      createExplosion(hitX, hitY, '#ef4444', 5);
    }

    setScore(Math.floor(eRef.score));
    setCombo(eRef.combo);
    setComboMult(eRef.comboMultiplier);

  }, [gameState, createExplosion]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (gameState !== 'playing') return;
      if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
        triggerMatchAttempt();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState, triggerMatchAttempt]);

  const handlePointerDown = (e) => {
    if (e.target.tagName === 'BUTTON' || e.target.closest('button')) return;
    triggerMatchAttempt();
  };

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
      const dt = Math.min(deltaTimeMs / 1000, 0.033); 
      const e = engine.current;

      if (gameState === 'playing') {
        e.timeLeft -= dt;
        if (e.timeLeft <= 0) {
          e.timeLeft = 0;
          endGame();
          return;
        }

        // Dynamic Velocity Engine
        e.speedChangeTimer -= dt;
        if (e.speedChangeTimer <= 0) {
          e.speedChangeTimer = Math.max(0.5, 3.0 - (e.level * 0.1)); // Changes happen faster at high levels
          
          const maxSpeed = 2.0 + (e.level * 0.4);
          const minSpeed = 1.0 + (e.level * 0.1);
          const dir = Math.random() > 0.3 ? 1 : -1; // 30% chance to reverse
          
          e.targetSpeed = dir * (minSpeed + Math.random() * (maxSpeed - minSpeed));
        }

        // Smooth acceleration/deceleration interpolation
        e.outerSpeed += (e.targetSpeed - e.outerSpeed) * dt * 2.0;

        e.outerAngle = (e.outerAngle + e.outerSpeed * dt) % (Math.PI * 2);
        e.innerAngle = (e.innerAngle + e.innerSpeed * dt) % (Math.PI * 2);

        // Adrenaline Audio
        if (e.timeLeft <= 15 && audioSynth) {
          if (e.timeLeft <= 3) audioSynth.playHeartbeat('max');
          else if (e.timeLeft <= 5) audioSynth.playHeartbeat('high');
          else audioSynth.playHeartbeat('med');
        }

        // FX Decay
        if (e.screenShake > 0) e.screenShake -= dt * 45;
        if (e.flashRed > 0) e.flashRed -= dt * 2.0;
        if (e.ratingTimer > 0) e.ratingTimer -= dt;

        setTimeLeft(e.timeLeft);
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
      const arcRadius = Math.min(cvs.width, cvs.height) * 0.32;

      // Background Grid
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.03)';
      ctx.lineWidth = 1; 
      for(let i = 0; i < cvs.width; i+= 50) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, cvs.height); ctx.stroke(); }
      for(let j = 0; j < cvs.height; j+= 50) { ctx.beginPath(); ctx.moveTo(0, j); ctx.lineTo(cvs.width, j); ctx.stroke(); }

      // Concentric track lane ring
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.beginPath();
      ctx.arc(cx, cy, arcRadius, 0, Math.PI * 2);
      ctx.stroke();
      
      // Central glowing engine core
      ctx.fillStyle = 'rgba(6, 182, 212, 0.05)';
      ctx.strokeStyle = '#06b6d4';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(cx, cy, 32, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Combo Glow Effects
      if (e.comboMultiplier >= 2.0) {
        ctx.shadowBlur = 20;
        ctx.shadowColor = e.comboMultiplier >= 3.0 ? '#d946ef' : '#fbbf24';
      }
      
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(cx, cy, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Draw Inner Controllable Orb (Cyan)
      const ix = cx + Math.cos(e.innerAngle) * arcRadius;
      const iy = cy + Math.sin(e.innerAngle) * arcRadius;
      ctx.fillStyle = '#06b6d4';
      ctx.beginPath();
      ctx.arc(ix, iy, 12, 0, Math.PI * 2);
      ctx.fill();
      
      // Draw Outer Target Ring (Gold)
      const ox = cx + Math.cos(e.outerAngle) * arcRadius;
      const oy = cy + Math.sin(e.outerAngle) * arcRadius;
      
      ctx.strokeStyle = '#eab308';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(ox, oy, 18, 0, Math.PI * 2);
      ctx.stroke();
      
      ctx.fillStyle = '#eab308';
      ctx.beginPath();
      ctx.arc(ox, oy, 6, 0, Math.PI * 2);
      ctx.fill();

      // Feedback Text
      if (e.ratingTimer > 0) {
        ctx.fillStyle = e.flashColor;
        ctx.font = "900 48px sans-serif";
        ctx.textAlign = "center";
        ctx.letterSpacing = "2px";
        ctx.globalAlpha = Math.min(1, e.ratingTimer * 2);
        ctx.fillText(e.ratingText, cx, cy - 80);
        ctx.globalAlpha = 1.0;
      }

      // Adrenaline Pulse Effect
      if (gameState === 'playing' && e.timeLeft <= 15) {
        const pulse = Math.sin(time * 0.01) * 0.15;
        ctx.fillStyle = `rgba(239, 68, 68, ${Math.max(0, pulse)})`;
        ctx.fillRect(0, 0, cvs.width, cvs.height);
      }

      if (e.flashRed > 0) {
        ctx.fillStyle = `rgba(239, 68, 68, ${e.flashRed})`;
        ctx.fillRect(0, 0, cvs.width, cvs.height);
      }

      // Particles
      for (let i = e.particles.length - 1; i >= 0; i--) {
        const p = e.particles[i];
        p.x += p.vx * dt * 60; 
        p.y += p.vy * dt * 60;
        p.life -= dt * 2.5;
        if (p.life <= 0) { e.particles.splice(i, 1); continue; }
        ctx.globalAlpha = p.life; ctx.fillStyle = p.color; ctx.fillRect(p.x, p.y, 4, 4);
      }
      ctx.globalAlpha = 1.0;

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
    const text = `⏱️ I reached Level ${analytics.levelReached} and scored ${score} PTS in the Timing Accuracy Game! Grade: ${analytics.gradeData.grade}. Test your motion prediction at skilldrills.online!`;
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({ title: 'My Motion Prediction Score', text, url: 'https://skilldrills.online/drills/motor/timing-accuracy/velocity-matcher' });
      } catch (e) {}
    } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      alert('Score card copied to clipboard!');
    }
  }, [score, analytics]);

  return (
    <div ref={pageRef} className="min-h-screen select-none bg-[#050508] text-white" onPointerDown={handlePointerDown}>
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
                <li className="text-cyan-400 font-medium">Timing Accuracy Game</li>
              </ol>
            </nav>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                  <Timer className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Timing Accuracy Game</h1>
                  <p className="text-sm text-gray-400 mt-1 font-medium">Velocity Matching • Motion Prediction Trainer</p>
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
            <StatCard icon={<Target className="text-cyan-400" />} value={score} label="Score" />
            <StatCard icon={<Zap className="text-yellow-400" />} value={`${comboMult.toFixed(1)}x`} label={`Combo: ${combo}`} highlight={comboMult >= 2.0} />
            <StatCard icon={<TrendingUp className="text-purple-400" />} value={`Lv. ${liveLevel}`} label="Difficulty" />
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
                className={`h-full transition-all duration-100 ease-linear ${timeLeft <= 15 ? 'bg-red-500 animate-pulse' : 'bg-cyan-500'}`}
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
                    <p className="text-[10px] text-yellow-400 font-bold uppercase tracking-widest">Combo</p>
                    <p className="text-2xl font-black text-yellow-400 leading-none">{comboMult.toFixed(1)}x</p>
                  </div>
                  <div className="w-px h-8 bg-gray-800"></div>
                  <div className="text-center hidden sm:block">
                    <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest">Time</p>
                    <p className={`text-2xl font-black leading-none ${timeLeft <= 15 ? 'text-red-500 animate-pulse' : 'text-emerald-400'}`}>{Math.max(0, timeLeft).toFixed(1)}s</p>
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

          {/* START SCREEN */}
          {gameState === 'start' && (
            <div className="absolute inset-0 bg-[#05070e]/98 flex flex-col items-center justify-center p-6 z-30 select-none overflow-y-auto max-h-[100vh] backdrop-blur-sm cursor-default">
              <div className="max-w-md w-full text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl mx-auto flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(6,182,212,0.3)]">
                  <Timer className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-black mb-3 tracking-tight text-white uppercase">Timing Accuracy Game</h2>
                <p className="text-sm mb-6 text-gray-400 leading-relaxed">
                  Train your motion prediction. Click, tap, or press SPACEBAR exactly when the two orbiting orbs perfectly overlap. The speed constantly changes—predict, don't react.
                </p>

                <div className="grid grid-cols-2 gap-3 mb-6 text-left">
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Objective</span>
                    <span className="text-sm font-black text-white">Motion Prediction</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Reward</span>
                    <span className="text-sm font-black text-green-400">Combo & +Time</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Penalty</span>
                    <span className="text-sm font-black text-red-400">Combo Reset & -2.0s</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Mechanic</span>
                    <span className="text-sm font-black text-cyan-400">Velocity Matching</span>
                  </div>
                </div>

                <div className="bg-[#0b0f19] border border-slate-850 p-4 rounded-xl mb-6 text-left text-xs text-slate-400">
                  <span className="text-xs font-bold text-white block uppercase mb-1 flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-cyan-500" /> Synchronization Training
                  </span>
                  <ul className="list-disc pl-4 space-y-1 text-[10px] text-slate-500 leading-relaxed">
                    <li>Trigger exactly as the orbitals align.</li>
                    <li>Perfect overlaps grant double points and +3.0s time.</li>
                    <li>Missing the window deducts 2.0s. There are no score point deductions.</li>
                    <li>Endless scaling: Velocity becomes faster and more erratic on Level Up.</li>
                  </ul>
                </div>
                
                <button 
                  onClick={startGame}
                  className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg uppercase tracking-widest transition-all duration-200 active:scale-95"
                >
                  <Play className="w-3.5 h-3.5 fill-white" /> Start Timing Drill
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
                    <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Avg Error</span>
                    <span className="text-base font-black text-white">±{analytics.avgError}px</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
                    <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Max Streak</span>
                    <span className="text-base font-black text-green-400">{analytics.maxStreak}</span>
                  </div>
                  
                  <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
                    <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Perfect Hits</span>
                    <span className="text-base font-black text-yellow-400">{analytics.perfectHits}</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
                    <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Misses</span>
                    <span className="text-base font-black text-red-400">{analytics.misses}</span>
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
                <Info className="w-5 h-5 text-cyan-400" /><h2 className="font-bold text-white text-lg tracking-wide">Game Rules & Survival Scoring</h2>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-5">
                  <RuleItem num="1" color="yellow" text="Perfect Timing" highlight="+50 PTS | +3.0s Time" result="Dead-center overlap" />
                  <RuleItem num="2" color="indigo" text="Zero Negative Scoring" highlight="No Point Deductions" result="Score only increases, never drops" />
                </div>
                <div className="space-y-5">
                  <RuleItem num="3" color="red" text="Miss Punishment" highlight="-2.0s Time Penalty" result="Combo reset & clock drain" />
                  <RuleItem num="4" color="cyan" text="Endless Scaling" highlight="Level up every 100pts" result="Faster speeds & tighter windows" />
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
                <h2 className="font-bold text-white text-lg tracking-wide">About the Timing Accuracy Game</h2>
              </div>
              
              <div className="p-8 space-y-8">
                <section>
                  <h2 className="text-xl font-bold text-white mb-3">Mastering Motion Prediction</h2>
                  <p className="text-sm leading-relaxed mb-4">
                    This free Timing Accuracy Game online is designed to test your motion prediction and velocity matching skills to the absolute limit. Unlike simple reaction tests, this is an endless survival game. You must observe the orbital speeds and trigger a hit exactly when the two nodes overlap. There is zero negative scoring—your goal is to survive the time drain by maintaining extreme millisecond accuracy to build massive combo multipliers. As your score rises, the game scales endlessly, triggering an adrenaline-pumping survival state with faster, more erratic orbital velocities.
                  </p>
                </section>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
                  <div className="p-5 rounded-xl border bg-black/40 border-gray-800">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center"><Users className="w-4 h-4 text-white" /></div>
                      <h3 className="text-sm font-bold text-white">Who Should Play</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-slate-400">Competitive esports athletes optimizing 'peeker's advantage', FPS gamers tracking moving targets, and anyone improving visual-motor timing.</p>
                  </div>
                  <div className="p-5 rounded-xl border bg-black/40 border-gray-800">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-green-600 flex items-center justify-center"><TrendingUp className="w-4 h-4 text-white" /></div>
                      <h3 className="text-sm font-bold text-white">Skills Targeted</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-slate-400">Motion prediction, velocity estimation, timing accuracy, visual synchronization, trigger discipline, and sustained mental focus.</p>
                  </div>
                  <div className="p-5 rounded-xl border bg-black/40 border-gray-800">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center"><BarChart3 className="w-4 h-4 text-white" /></div>
                      <h3 className="text-sm font-bold text-white">What You'll Track</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-slate-400">Total gamified score, your average pixel error variance, perfect hits, maximum combo streaks, and performance grade.</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#0b0f19] border-t border-gray-800 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Lightbulb className="w-6 h-6 text-yellow-400" />
                  <h2 className="text-xl font-bold text-white">Frequently Asked Questions</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FAQItem q="What is velocity matching?" a="Velocity matching is the cognitive and motor skill of assessing the speed and trajectory of a moving object, predicting its future location, and synchronizing a physical action (like clicking) with that predicted state." />
                  <FAQItem q="What is timing prediction?" a="Timing prediction goes beyond simple reaction time. Instead of just reacting to an unexpected event, you must anticipate when two moving elements will overlap based on their current acceleration and velocity." />
                  <FAQItem q="How does this improve FPS gaming?" a="In games like Valorant, CS2, and Apex Legends, enemies rarely stand still. This drill trains your brain to track target speed and click precisely when the target enters your crosshair (trigger discipline)." />
                  <FAQItem q="Does this improve hand-eye coordination?" a="Yes, deeply. It connects visual processing of dynamic motion to exact muscular timing, which is the foundational pillar of advanced hand-eye coordination." />
                  <FAQItem q="Is this useful for esports?" a="Absolutely. Professional esports athletes use motion prediction and timing accuracy games to isolate their trigger timing, reducing their margin of error during high-stress matches." />
                  <FAQItem q="Can athletes use it?" a="Yes, traditional athletes in sports like baseball, tennis, or racing use visual timing and object tracking exercises to improve their ability to intercept fast-moving objects." />
                  <FAQItem q="How often should I practice?" a="For the best neuroplastic adaptation, play this timing accuracy game for 10 minutes a day before your main gaming or training sessions." />
                  <FAQItem q="Does this improve trigger discipline?" a="Yes. By heavily penalizing spam-clicking and rewarding exact synchronization, it teaches you to wait for the perfect, high-percentage shot rather than panicking." />
                  <FAQItem q="What skills does it train?" a="It trains motion prediction, velocity tracking, speed estimation, timing accuracy, internal rhythm, and sustained focus under pressure." />
                  <FAQItem q="Does it work on mobile?" a="Yes, the drill is fully responsive. You can tap the screen on mobile devices to trigger the synchronization, making it a great portable brain training game." />
                  <FAQItem q="Why does the target change speed?" a="To prevent you from relying on simple rhythmic memorization. The dynamic acceleration forces your brain to constantly re-evaluate the target's trajectory in real-time." />
                  <FAQItem q="What is Adrenaline Mode?" a="When your survival clock drops below 15 seconds, the game increases visual and audio pressure (heartbeat, screen pulsing) to simulate clutch esports scenarios." />
                  <FAQItem q="How is this different from a reaction time test?" a="Reaction tests measure how fast you respond *after* an event occurs. This game measures how accurately you can *predict* when an event *will* occur." />
                  <FAQItem q="Is this a free timing game?" a="Yes, the Velocity Matcher is 100% free to play in your browser, with no downloads or subscriptions required." />
                  <FAQItem q="How do I level up?" a="You level up automatically every time you earn 100 points. Higher levels feature faster orbits, tighter hit windows, and more frequent direction reversals." />
                  <FAQItem q="What is a Perfect hit?" a="A Perfect hit occurs when you trigger the click while the two orbitals are overlapping with less than 10 pixels of deviation." />
                  <FAQItem q="Does my score ever decrease?" a="No. In this survival game, mistakes deduct from your *time*, not your score. Your score only goes up, representing how well you performed during your survival window." />
                  <FAQItem q="What does the combo multiplier do?" a="Consecutive hits without missing build your combo multiplier, which scales your score per hit. Missing resets the combo back to 1x." />
                  <FAQItem q="How do I get the 'Machine Precision' achievement?" a="You must maintain an average prediction error of under 15 pixels across an entire session with a high score." />
                  <FAQItem q="Why did my time run out so fast?" a="Misses deduct 2 seconds from your clock. If you spam click or misjudge the velocity frequently, your time will drain rapidly." />
                  <FAQItem q="Is this related to Human Benchmark?" a="This serves as a more advanced, gaming-focused alternative to standard human benchmark tests, offering endless scaling and deep performance analytics." />
                  <FAQItem q="Can I use the spacebar?" a="Yes, you can click, tap the screen, or use the spacebar to trigger the synchronization." />
                  <FAQItem q="What is the AI Coach?" a="The AI Coach analyzes your raw telemetry (early clicks, late clicks, misses) at the end of the round and provides personalized advice on how to fix your specific timing flaws." />
                  <FAQItem q="Is there a limit to the difficulty?" a="No, the difficulty scales infinitely. The target will continue to move faster and reverse more unpredictably as long as you survive." />
                  <FAQItem q="How is visual processing speed trained?" a="By forcing your eyes to track a fast-moving object and instantly relay that spatial data to your motor cortex, improving your overall visual processing latency." />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Related Drills */}
        {!isFullscreen && (
          <section className="mt-14" aria-label="Explore related aim and response drills">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-5 rounded-full bg-cyan-500"></div>
              <h2 className="text-xs font-bold text-white uppercase tracking-widest font-mono">
                Explore More Timing & Aim Trainers
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <RelatedCard href="/drills/motor/timing-accuracy/stopwatch-click" title="Stopwatch Timing" desc="Test your internal clock directly." color="cyan" icon={<Clock className="w-4 h-4" />} />
              <RelatedCard href="/drills/motor/timing-accuracy/synchronization" title="Synchronization" desc="Visual timing and convergence." color="purple" icon={<Target className="w-4 h-4" />} />
              <RelatedCard href="/drills/fps/flick-shot-training" title="Pro Flick Trainer" desc="Snap to targets in time-attack mode." color="blue" icon={<Crosshair className="w-4 h-4" />} />
              <RelatedCard href="/drills/motor/movement-speed/rapid-tapping" title="Click Speed Test" desc="Raw CPS and clicking endurance." color="red" icon={<Zap className="w-4 h-4" />} />
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
                    <li><Link href="/drills/visual" className="hover:text-cyan-400 transition-colors">Visual (14)</Link></li>
                    <li><Link href="/drills/physical" className="hover:text-cyan-400 transition-colors">Physical (11)</Link></li>
                  </ul>
                </div>
              </div>
              
              <div className="border-t border-gray-800 pt-8 text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="w-6 h-6 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 rounded-lg flex items-center justify-center">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" />
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
    cyan: 'bg-cyan-600 text-cyan-300 border-cyan-500',
    yellow: 'bg-yellow-600 text-yellow-300 border-yellow-500'
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
    teal: 'from-teal-500 to-green-500',
    rose: 'from-rose-500 to-pink-500'
  };
  return (
    <Link href={href} className="group relative overflow-hidden rounded-2xl border border-gray-800 bg-[#0b0f19]/40 transition-all hover:-translate-y-1 hover:border-cyan-500/50 block p-5">
      <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${gradients[color] || 'from-cyan-500 to-blue-500'}`}></div>
      <div className="w-10 h-10 rounded-xl bg-[#050811] border border-slate-700 flex items-center justify-center text-gray-400 group-hover:text-white mb-3 shadow-inner">
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

function FAQItem({ q, a }) {
  return (
    <div className="bg-[#05060b] border border-gray-800 rounded-xl p-5 hover:border-gray-700 transition-colors">
      <h4 className="text-sm font-bold text-gray-200 mb-2">{q}</h4>
      <p className="text-xs text-gray-400 leading-relaxed">{a}</p>
    </div>
  );
}