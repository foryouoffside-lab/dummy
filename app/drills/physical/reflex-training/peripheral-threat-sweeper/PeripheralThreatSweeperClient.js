'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  Activity, AlertCircle, ArrowRight, BarChart3, ChevronRight, 
  Clock, Crosshair, Eye, GraduationCap, Info, Lightbulb, 
  Maximize2, Minimize2, Play, RefreshCw, Star, Target, 
  Timer, TrendingUp, Trophy, Volume2, VolumeX, Zap, Users,
  Share2, Shield, XCircle, Grid, Sparkles, CheckCircle2
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
      
      if (type === 'hit') { 
        osc.type = 'sine';
        osc.frequency.setValueAtTime(700, now);
        osc.frequency.exponentialRampToValueAtTime(1400, now + 0.12);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
        osc.start(now); osc.stop(now + 0.12);
      } else if (type === 'miss') { 
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(120, now);
        osc.frequency.exponentialRampToValueAtTime(40, now + 0.35);
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        osc.start(now); osc.stop(now + 0.35);
      } else if (type === 'clickmiss') { 
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(300, now);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
        osc.start(now); osc.stop(now + 0.05);
      } else if (type === 'levelup') { 
        osc.type = 'square';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.2);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
        osc.start(now); osc.stop(now + 0.2);
      } else if (type === 'streak') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1046.5, now);
        gain.gain.setValueAtTime(0.12, now);
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
const DRILL_DURATION = 60; // Strict 60 seconds

export default function PeripheralThreatSweeperClient() {
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
  const [timeLeft, setTimeLeft] = useState(DRILL_DURATION);
  const [isNewBest, setIsNewBest] = useState(false);
  
  // Real-time HUD State
  const [streak, setStreak] = useState(0);
  const [level, setLevel] = useState(1);
  const [comboMultiplier, setComboMultiplier] = useState(1.0);
  const [accuracy, setAccuracy] = useState(100);

  // Analytics State — FIX: use rankData.rank/color/advice consistently with JSX
  const [analytics, setAnalytics] = useState({
    sweeps: 0,
    breaches: 0,
    falseClicks: 0,
    accuracy: 100,
    maxStreak: 0,
    peakLevel: 1,
    coachAdvice: '',
    rankData: { rank: 'D', color: 'text-slate-500' }
  });

  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  const pageRef = useRef(null);
  const gameStateRef = useRef('start');
  const loopRef = useRef(null);
  
  // Real-time engine variables
  const engine = useRef({
    threats: [], // { id, angle, distance, speed, type, active, spawnTime, wobbleOffset }
    nextThreatId: 0,
    spawnTimer: 0,
    
    // Adaptive Parameters
    spawnInterval: 1.8, 
    baseSpeed: 50,
    
    timeLeft: DRILL_DURATION,
    score: 0,
    level: 1,
    combo: 1.0,
    bestCombo: 1.0,
    streak: 0,
    maxStreak: 0,
    
    // Telemetry
    sweeps: 0,
    breaches: 0,
    falseClicks: 0,
    totalAttempts: 0,
    
    particles: [],
    screenShake: 0,
    flashRed: 0,
    flashGreen: 0,
    shieldGlow: 0 
  });

  const lastTimeRef = useRef(0);
  const isActiveRef = useRef(false);

  const cmPer360 = (30 / universalSens).toFixed(1);

  // Load High Score
  useEffect(() => {
    try {
      const savedBest = localStorage.getItem('threatSweeper_bestScore3');
      if (savedBest) setBestScore(parseInt(savedBest, 10));
    } catch (e) {}
  }, []);

  useEffect(() => {
    if (gameState !== 'playing') {
      try { localStorage.setItem('threatSweeper_sens', universalSens.toString()); } catch (e) {}
    }
    if (audioSynth) audioSynth.setEnabled(soundEnabled);
  }, [universalSens, gameState, soundEnabled]);

  // FIX: keep gameStateRef in sync so handlers never close over stale gameState
  useEffect(() => {
    gameStateRef.current = gameState;
  }, [gameState]);

  // FIX: ResizeObserver sizes the canvas to match its CSS layout dimensions
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const syncSize = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (w > 0 && h > 0 && (canvas.width !== w || canvas.height !== h)) {
        canvas.width = w;
        canvas.height = h;
      }
    };
    syncSize();
    const ro = new ResizeObserver(syncSize);
    ro.observe(canvas);
    return () => ro.disconnect();
  }, []);

  // Request Fullscreen
  const toggleFullscreen = useCallback(async () => {
    try {
      const el = containerRef.current;
      if (!isFullscreen) {
        if (el?.requestFullscreen) {
          await el.requestFullscreen();
          setIsFullscreen(true);
        }
      } else {
        if (document.fullscreenElement) {
          await document.exitFullscreen();
        }
        setIsFullscreen(false);
      }
    } catch (e) {}
  }, [isFullscreen]);

  useEffect(() => {
    const handleFsChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  const spawnExplosion = (x, y, color, count) => {
    const eng = engine.current;
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 180 + 60;
      eng.particles.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: Math.random() * 5 + 2,
        color,
        life: 0.35
      });
    }
  };

  const endGame = useCallback(() => {
    setGameState('gameOver');
    isActiveRef.current = false;
    
    const e = engine.current;
    const finalAccuracy = e.totalAttempts > 0 ? Math.round((e.sweeps / e.totalAttempts) * 100) : 100;
    
    // Rank logic based on Score and Accuracy
    let grade = 'D'; let gradeColor = 'text-gray-400';
    let advice = 'Keep practicing! Your peripheral acquisition is too slow. Increase your scanning velocity to clear threat vectors faster.';
    
    if (e.score >= 3500 && finalAccuracy >= 90) { 
      grade = 'S+'; gradeColor = 'text-yellow-400'; 
      advice = 'Elite Peripheral Reflex! You maintained absolute shield integrity under extreme multi-directional density and evasive threats.';
    }
    else if (e.score >= 2000 && finalAccuracy >= 82) { 
      grade = 'S'; gradeColor = 'text-yellow-500'; 
      advice = 'Outstanding awareness! You handled the fast and wobbling threats perfectly. Try to reduce your false clicks to preserve your time clock.';
    }
    else if (e.score >= 1000 && finalAccuracy >= 75) { 
      grade = 'A'; gradeColor = 'text-fuchsia-400'; 
      advice = 'Great spatial coordination! Threats occasionally breached your core. Keep your physical gaze anchored dead-center and trust your peripheral vision.';
    }
    else if (e.score >= 500 && finalAccuracy >= 65) { 
      grade = 'B'; gradeColor = 'text-cyan-400'; 
      advice = 'Good fundamentals. You are panic-clicking empty space. Misclicks violently drain your survival clock by -1.5s. Verify the target before flicking.';
    }
    else if (e.score >= 150) { 
      grade = 'C'; gradeColor = 'text-indigo-400'; 
      advice = 'Average performance. Focus purely on hitting the target to build your combo multiplier, rather than clicking frantically.';
    }

    setAccuracy(finalAccuracy);

    // FIX: use rankData.rank/color and top-level coachAdvice to match JSX expectations
    setAnalytics({
      accuracy: finalAccuracy,
      sweeps: e.sweeps,
      breaches: e.breaches,
      falseClicks: e.falseClicks,
      maxStreak: e.maxStreak,
      peakLevel: e.level,
      coachAdvice: advice,
      rankData: { rank: grade, color: gradeColor }
    });

    setBestScore(prev => {
      if (e.score > prev) {
        setIsNewBest(true);
        try { localStorage.setItem('threatSweeper_bestScore3', e.score.toString()); } catch(err){}
        return e.score;
      }
      return prev;
    });
  }, []);

  // FIX: use gameStateRef so this never reads stale gameState from closure
  const handlePointerDown = useCallback((e) => {
    if (gameStateRef.current !== 'playing' || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    
    const eng = engine.current;
    eng.totalAttempts++;
    
    // Find closest threat inside hit radius
    let hitIndex = -1;
    let closestDist = 9999;
    
    eng.threats.forEach((th, idx) => {
      if (!th.active) return;
      const tX = cx + Math.cos(th.angle) * th.distance + th.wobbleOffset.x;
      const tY = cy + Math.sin(th.angle) * th.distance + th.wobbleOffset.y;
      
      const d = Math.hypot(tX - clickX, tY - clickY);
      if (d < 35 && d < closestDist) { // 35px click boundary forgiveness
        closestDist = d;
        hitIndex = idx;
      }
    });
    
    if (hitIndex !== -1) {
      // --- HIT SUCCESS ---
      const hitThreat = eng.threats[hitIndex];
      hitThreat.active = false;
      
      eng.sweeps++;
      
      // Combo Logic
      let multi = 1.0;
      if (eng.streak >= 40) multi = 3.0;
      else if (eng.streak >= 20) multi = 2.0;
      else if (eng.streak >= 10) multi = 1.5;
      else if (eng.streak >= 5) multi = 1.2;
      
      if (multi > eng.bestCombo) eng.bestCombo = multi;
      
      // Score = Base 10 * Multiplier
      eng.score += Math.floor(10 * multi);
      
      // Time Bonus (Capped at 60s)
      eng.timeLeft = Math.min(60.0, eng.timeLeft + 1.0);
      
      eng.streak++;
      if (eng.streak > eng.maxStreak) eng.maxStreak = eng.streak;

      // Level Up Logic
      const newLevel = Math.floor(eng.score / 150) + 1;
      if (newLevel > eng.level) {
        eng.level = newLevel;
        // Adaptive Scaling
        eng.spawnInterval = Math.max(0.35, 1.8 - (newLevel * 0.15));
        eng.baseSpeed = Math.min(300, 50 + (newLevel * 25));
        if (audioSynth) audioSynth.playSound('levelup'); // FIX: playLevelUp() doesn't exist
      } else {
        if (eng.streak % 5 === 0 && audioSynth) {
          audioSynth.playSound('streak');
        } else if (audioSynth) {
          audioSynth.playSound('hit');
        }
      }
      
      // VFX
      let explodeColor = '#10b981'; // Default Emerald
      if (hitThreat.type === 'fast') explodeColor = '#f59e0b'; // Amber
      if (hitThreat.type === 'wobble') explodeColor = '#a855f7'; // Purple
      
      spawnExplosion(clickX, clickY, explodeColor, 12);
      eng.shieldGlow = 0.8;
      eng.flashGreen = 0.2;
      
      setScore(eng.score);
      setStreak(eng.streak);
      setLevel(eng.level);
      setComboMultiplier(multi);
      
      setFlashBg('green');
      setTimeout(() => setFlashBg(null), 100);

    } else {
      // --- EMPTY CLICK PENALTY ---
      eng.falseClicks++;
      eng.timeLeft = Math.max(0, eng.timeLeft - 1.5); // -1.5s drain
      eng.streak = 0;
      eng.combo = 1.0;
      
      if (audioSynth) audioSynth.playSound('clickmiss');
      
      eng.flashRed = 0.2;
      setStreak(0);
      setComboMultiplier(1.0);
      
      setFlashBg('red');
      setTimeout(() => setFlashBg(null), 100);
    }
    
    setAccuracy(Math.round((eng.sweeps / eng.totalAttempts) * 100));
  }, [endGame]);

  const startDrill = () => {
    if (audioSynth) audioSynth.init();

    // Auto-enter fullscreen when Start is clicked
    const el = containerRef.current;
    if (el && !document.fullscreenElement) {
      el.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    }
    
    const eng = engine.current;
    eng.timeLeft = DRILL_DURATION;
    eng.score = 0;
    eng.level = 1;
    eng.combo = 1.0;
    eng.bestCombo = 1.0;
    eng.streak = 0;
    eng.maxStreak = 0;
    eng.sweeps = 0;
    eng.breaches = 0;
    eng.falseClicks = 0;
    eng.totalAttempts = 0;
    
    eng.particles = [];
    eng.threats = [];
    eng.spawnTimer = 0;
    eng.spawnInterval = 1.8;
    eng.baseSpeed = 50;
    eng.shieldGlow = 0;
    eng.screenShake = 0;
    eng.flashRed = 0;
    eng.flashGreen = 0;
    
    // FIX: ensure canvas pixel dimensions match layout size before first frame
    const canvas = canvasRef.current;
    if (canvas) {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (w > 0 && h > 0) {
        canvas.width = w;
        canvas.height = h;
      }
    }

    setScore(0);
    setTimeLeft(DRILL_DURATION);
    setStreak(0);
    setLevel(1);
    setComboMultiplier(1.0);
    setAccuracy(100);
    setIsNewBest(false);
    
    gameStateRef.current = 'playing'; // FIX: sync ref immediately
    setGameState('playing');
    isActiveRef.current = true;
    lastTimeRef.current = 0;
    
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    animationRef.current = requestAnimationFrame((ts) => loopRef.current(ts));
  };

  // Main game loop — FIX: written to a stable ref so RAF callbacks never go stale
  loopRef.current = (timestamp) => {
    if (!isActiveRef.current) return;
    
    if (!lastTimeRef.current) lastTimeRef.current = timestamp;
    const dt = Math.min((timestamp - lastTimeRef.current) / 1000, 0.033);
    lastTimeRef.current = timestamp;
    
    const eng = engine.current;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width;
    const H = canvas.height;
    const cx = W / 2;
    const cy = H / 2;
    // Scale radar based on minimum dimension to support widescreen properly
    const radarLimit = Math.min(W, H) * 0.46; 
    const coreRadius = 40; 
    
    // 1. Update Game Timer
    eng.timeLeft = Math.max(0, eng.timeLeft - dt);
    if (eng.timeLeft <= 0) {
      endGame();
      return;
    }
    
    // 2. Threat Spawner
    eng.spawnTimer += dt;
    if (eng.spawnTimer >= eng.spawnInterval) {
      eng.spawnTimer = 0;
      const angle = Math.random() * Math.PI * 2;
      
      // Determine Threat Type based on Level
      let type = 'standard';
      let speedMult = 1.0;
      
      if (eng.level >= 3 && Math.random() < 0.20) {
        type = 'fast';
        speedMult = 1.5;
      } else if (eng.level >= 5 && Math.random() < 0.25) {
        type = 'wobble';
      }

      eng.threats.push({
        id: eng.nextThreatId++,
        angle,
        distance: radarLimit,
        speed: eng.baseSpeed * speedMult,
        type: type,
        active: true,
        spawnTime: timestamp / 1000,
        wobbleOffset: { x: 0, y: 0 }
      });
    }
    
    // 3. Shield glow fade
    if (eng.shieldGlow > 0) eng.shieldGlow -= dt * 3.5;
    if (eng.flashRed > 0) eng.flashRed -= dt * 2.0;
    if (eng.flashGreen > 0) eng.flashGreen -= dt * 2.0;
    if (eng.screenShake > 0) eng.screenShake -= dt * 45;
    
    // 4. Update Threat positions
    for (let i = eng.threats.length - 1; i >= 0; i--) {
      const th = eng.threats[i];
      if (!th.active) {
        eng.threats.splice(i, 1);
        continue;
      }
      
      th.distance -= th.speed * dt;
      
      // Wobble Logic
      if (th.type === 'wobble') {
        const timeAlive = (timestamp / 1000) - th.spawnTime;
        const wobbleAmount = 30 * Math.sin(timeAlive * 8); 
        th.wobbleOffset.x = Math.cos(th.angle + Math.PI/2) * wobbleAmount;
        th.wobbleOffset.y = Math.sin(th.angle + Math.PI/2) * wobbleAmount;
      }

      const tX = cx + Math.cos(th.angle) * th.distance + th.wobbleOffset.x;
      const tY = cy + Math.sin(th.angle) * th.distance + th.wobbleOffset.y;
      
      // Core breach threshold check
      if (th.distance <= coreRadius) {
        th.active = false;
        
        eng.breaches++;
        eng.streak = 0;
        eng.combo = 1.0;
        
        // Heavy Time Penalty on Core Breach
        eng.timeLeft = Math.max(0, eng.timeLeft - 3.5);
        eng.screenShake = 15;
        eng.flashRed = 0.4;
        
        if (audioSynth) audioSynth.playSound('miss');
        spawnExplosion(tX, tY, '#ef4444', 15); 
        eng.threats.splice(i, 1);

        setFlashBg('red');
        setTimeout(() => setFlashBg(null), 100);
      }
    }
    
    // Throttle UI Updates
    eng.totalFrames = (eng.totalFrames || 0) + 1;
    if (eng.totalFrames % 4 === 0) {
      setTimeLeft(eng.timeLeft);
      setStreak(eng.streak);
      setComboMultiplier(eng.combo);
    }

    // --- RENDERING PHASE ---
    ctx.save();
    if (eng.screenShake > 0) {
      ctx.translate((Math.random() - 0.5) * eng.screenShake, (Math.random() - 0.5) * eng.screenShake);
    }
    
    // Base canvas background
    ctx.fillStyle = '#05060b';
    ctx.fillRect(0, 0, W, H);
    
    // Draw concentric radar lines
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(6, 182, 212, 0.05)'; 
    ctx.beginPath();
    ctx.arc(cx, cy, radarLimit * 0.7, 0, Math.PI * 2);
    ctx.arc(cx, cy, radarLimit * 0.4, 0, Math.PI * 2);
    ctx.stroke();
    
    // Radar scope crosshair lines
    ctx.beginPath();
    ctx.moveTo(cx, cy - radarLimit); ctx.lineTo(cx, cy + radarLimit);
    ctx.moveTo(cx - radarLimit, cy); ctx.lineTo(cx + radarLimit, cy);
    ctx.stroke();
    
    // Draw outer boundary ring
    ctx.strokeStyle = 'rgba(6, 182, 212, 0.1)';
    ctx.beginPath();
    ctx.arc(cx, cy, radarLimit, 0, Math.PI * 2);
    ctx.stroke();
    
    // Draw central shield core
    if (eng.shieldGlow > 0) {
      ctx.fillStyle = `rgba(16, 185, 129, ${eng.shieldGlow * 0.35})`;
      ctx.beginPath();
      ctx.arc(cx, cy, coreRadius + 6, 0, Math.PI * 2);
      ctx.fill();
    }
    
    ctx.fillStyle = 'rgba(6, 182, 212, 0.08)';
    ctx.strokeStyle = '#06b6d4';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(cx, cy, coreRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(cx, cy, 8, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw homing threat nodes
    eng.threats.forEach(th => {
      if (!th.active) return;
      
      const tX = cx + Math.cos(th.angle) * th.distance + th.wobbleOffset.x;
      const tY = cy + Math.sin(th.angle) * th.distance + th.wobbleOffset.y;

      const pulse = Math.abs(Math.sin(timestamp * 0.009));
      
      let baseColor = '#ef4444'; // Red
      if (th.type === 'fast') baseColor = '#f59e0b'; // Amber
      if (th.type === 'wobble') baseColor = '#a855f7'; // Purple

      ctx.shadowColor = baseColor;
      ctx.shadowBlur = 10 + pulse * 10;
      
      ctx.fillStyle = baseColor;
      ctx.beginPath();
      ctx.arc(tX, tY, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
      
      // Outward threat ring indicator
      ctx.strokeStyle = baseColor;
      ctx.globalAlpha = 0.35 + pulse * 0.4;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(tX, tY, 14, 0, Math.PI * 2);
      ctx.stroke();
      ctx.globalAlpha = 1.0;
      
      // Speed arrow pointer pointing to center core
      ctx.strokeStyle = baseColor;
      ctx.lineWidth = 2;
      ctx.beginPath();
      const ax = tX - Math.cos(th.angle) * 16;
      const ay = tY - Math.sin(th.angle) * 16;
      ctx.moveTo(tX, tY);
      ctx.lineTo(ax, ay);
      ctx.stroke();
    });
    
    // Render particles
    for (let i = eng.particles.length - 1; i >= 0; i--) {
      const p = eng.particles[i];
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.life -= dt;
      
      if (p.life <= 0) {
        eng.particles.splice(i, 1);
        continue;
      }
      
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.life;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1.0;
    
    // Damage Red screen flash
    if (eng.flashRed > 0) {
      ctx.fillStyle = `rgba(239, 68, 68, ${eng.flashRed})`;
      ctx.fillRect(0, 0, W, H);
    }
    // Success Green screen flash
    if (eng.flashGreen > 0) {
      ctx.fillStyle = `rgba(16, 185, 129, ${eng.flashGreen})`;
      ctx.fillRect(0, 0, W, H);
    }
    
    ctx.restore();
    animationRef.current = requestAnimationFrame((ts) => loopRef.current(ts));
  };

  const shareScore = useCallback(async () => {
    const text = `🎯 I reached Level ${level} and scored ${score} PTS on the Peripheral Threat Sweeper Drill! Accuracy: ${accuracy}%. Test your visual motor integration at skilldrills.online!`;
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({ title: 'Peripheral Sweeper Score', text, url: 'https://skilldrills.online/drills/physical/reflex-training/peripheral-threat-sweeper' });
      } catch (e) {}
    } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      alert('Score card copied to clipboard!');
    }
  }, [score, level, accuracy]);

  return (
    <div ref={pageRef} className="min-h-screen select-none bg-[#050508] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Navigation Breadcrumbs */}
        {!isFullscreen && (
          <div className="mb-6">
            <nav aria-label="Breadcrumb" className="mb-4">
              <ol className="flex items-center gap-2 text-sm text-slate-500">
                <li><Link href="/" className="hover:text-cyan-400 transition-colors">Home</Link></li>
                <li><ChevronRight className="w-4 h-4 text-gray-600" /></li>
                <li><Link href="/drills" className="hover:text-cyan-400 transition-colors">Drills Hub</Link></li>
                <li><ChevronRight className="w-4 h-4 text-gray-600" /></li>
                <li><Link href="/drills/physical" className="hover:text-cyan-400 transition-colors">Physical Training</Link></li>
                <li><ChevronRight className="w-4 h-4 text-gray-600" /></li>
                <li><Link href="/drills/physical" className="hover:text-cyan-400 transition-colors">Reflex Training</Link></li>
                <li><ChevronRight className="w-4 h-4 text-gray-600" /></li>
                <li className="text-cyan-400 font-medium">Peripheral Threat Sweeper</li>
              </ol>
            </nav>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                  <Eye className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Peripheral Threat Sweeper</h1>
                  <p className="text-sm text-gray-400 mt-1 font-medium">Peripheral Field Defense • Reaction Game</p>
                </div>
              </div>

              <div className="flex gap-2">
                <button 
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className="p-2.5 rounded-lg border border-gray-700 bg-gray-900 text-gray-400 hover:text-white transition-all active:scale-95"
                  title="Toggle Audio Cues"
                >
                  {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                </button>
                <button 
                  onClick={toggleFullscreen}
                  className="p-2.5 rounded-lg border border-gray-700 bg-gray-900 text-gray-400 hover:text-white transition-all active:scale-95"
                  title="Toggle Viewport Fullscreen"
                >
                  {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Live HUD Stats */}
        {!isFullscreen && (
          <div className="grid grid-cols-4 lg:grid-cols-7 gap-2 mb-2">
            <StatCard icon={<Target className="text-cyan-400" />} value={score} label="Score" />
            <StatCard icon={<Zap className="text-yellow-400" />} value={`${comboMultiplier.toFixed(1)}x`} label="Combo" highlight={comboMultiplier >= 2.0} />
            <StatCard icon={<TrendingUp className="text-purple-400" />} value={`Lv. ${level}`} label="Difficulty" />
            <StatCard icon={<Shield className="text-emerald-400" />} value={streak} label="Current Streak" />
            <StatCard icon={<BarChart3 className="text-indigo-400" />} value={`${accuracy}%`} label="Accuracy" />
            <StatCard icon={<Timer className={timeLeft <= 15 ? 'text-red-400 animate-pulse' : 'text-blue-400'} />} value={Math.max(0, timeLeft).toFixed(1)} label="Time" unit="s" />
            <StatCard icon={<Trophy className="text-yellow-500" />} value={bestScore} label="Best Score" />
          </div>
        )}

        {/* Engine Container */}
        <div 
          ref={containerRef} 
          className={`relative overflow-hidden transition-colors outline-none ${
            isFullscreen ? 'w-full h-full' : 'w-full aspect-video min-h-[500px] rounded-2xl border border-gray-800 shadow-2xl bg-[#05060b]'
          }`}
          style={{ backgroundColor: flashBg === 'red' ? '#450a0a' : flashBg === 'green' ? '#064e3b' : '#05060b', cursor: 'crosshair' }}
          onPointerDown={handlePointerDown}
        >
          {/* Progress Bar */}
          {gameState === 'playing' && (
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gray-900 z-[60]">
              <div 
                className={`h-full transition-all duration-100 ease-linear ${timeLeft <= 15 ? 'bg-red-500 animate-pulse' : 'bg-cyan-500'}`}
                style={{ width: `${Math.min(100, (timeLeft / DRILL_DURATION) * 100)}%` }} 
              />
            </div>
          )}

          {/* Fullscreen Overlay HUD */}
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
                    <p className="text-[10px] text-yellow-400 font-bold uppercase tracking-widest">Combo</p>
                    <p className="text-2xl font-black text-yellow-400 leading-none">{comboMultiplier.toFixed(1)}x</p>
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

          {/* Start Overlay Screen */}
          {gameState === 'start' && (
            <div className="absolute inset-0 bg-[#05070e]/98 flex flex-col items-center justify-center p-6 z-30 select-none overflow-y-auto max-h-[100vh] backdrop-blur-sm cursor-default">
              <div className="max-w-md w-full text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl mx-auto flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(6,182,212,0.3)]">
                  <Eye className="w-8 h-8 text-white" />
                </div>
                
                <h2 className="text-xl font-black uppercase tracking-wider mb-1 font-mono text-white">
                  Peripheral Threat Sweeper
                </h2>
                <p className="text-xs text-slate-500 uppercase tracking-widest mb-6">
                  Peripheral Field Defense • Reaction Game
                </p>

                <div className="grid grid-cols-2 gap-3 mb-6 text-left">
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Objective</span>
                    <span className="text-sm font-black text-white">Threat Interception</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Reward</span>
                    <span className="text-sm font-black text-green-400">Combo & +1.0s Time</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Penalty</span>
                    <span className="text-sm font-black text-red-400">Core Breach = -3.5s</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Mechanic</span>
                    <span className="text-sm font-black text-cyan-400">Radial Scanning</span>
                  </div>
                </div>

                <div className="bg-[#0b0f19] border border-slate-850 p-4 rounded-xl mb-6 text-left text-xs text-slate-400">
                  <span className="text-xs font-bold text-white block uppercase mb-1 flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-cyan-500" /> Peripheral Training
                  </span>
                  <ul className="list-disc pl-4 space-y-1 text-[10px] text-slate-500 leading-relaxed">
                    <li>Keep your eyes centered on the cyan core shield.</li>
                    <li>Use peripheral vision to detect and click inward-moving red threats.</li>
                    <li>False clicks deduct 1.5s. Core breaches deduct 3.5s.</li>
                    <li>Adaptive difficulty: Faster speeds and evasive patterns unlock at higher levels.</li>
                  </ul>
                </div>

                <button
                  onClick={startDrill}
                  className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg uppercase tracking-widest font-mono transition-all duration-200 active:scale-95 mx-auto"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  Start Vision Sweep
                </button>
              </div>
            </div>
          )}

          {/* Game Over Screen — FIX: check gradeData was renamed to rankData */}
          {gameState === 'gameOver' && analytics.rankData && (
            <div className="absolute inset-0 bg-[#05070e]/98 flex flex-col items-center justify-center p-6 z-30 select-none overflow-y-auto max-h-[100vh] backdrop-blur-sm cursor-default">
              <div className="max-w-md w-full text-center">
                {isNewBest && (
                  <div className="inline-block bg-yellow-500 text-black text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-3 shadow-[0_0_15px_rgba(234,179,8,0.5)] font-mono animate-bounce">
                    ⭐ NEW PERSONAL BEST!
                  </div>
                )}
                
                <h2 className="text-xl font-black uppercase tracking-wider mb-1 font-mono text-white">
                  Trial Complete
                </h2>
                <p className="text-xs text-slate-500 uppercase tracking-widest mb-6 font-mono">
                  Difficulty Level Reached: Level {level}
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
                    <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Total Sweeps</span>
                    <span className="text-base font-black text-blue-400">{analytics.sweeps}</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
                    <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Core Breaches</span>
                    <span className="text-base font-black text-red-400">{analytics.breaches}</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
                    <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Performance Rank</span>
                    <span className={`text-base font-black ${analytics.rankData?.color}`}>{analytics.rankData?.rank}</span>
                  </div>
                </div>

                <div className="bg-[#0b0f19] border border-slate-850 p-3 rounded-xl mb-4 text-left">
                  <span className={`text-xs font-black block text-center uppercase tracking-widest ${analytics.rankData?.color} mb-2`}>
                    Rank: {analytics.rankData?.rank}
                  </span>
                  <div className="w-full h-px bg-slate-850 mb-2"></div>
                  <div className="flex items-center gap-1.5 text-[9px] font-bold text-white uppercase mb-1">
                    <Sparkles className="w-3 h-3 text-cyan-400" /> Analytics Advice:
                  </div>
                  <p className="text-[10px] text-slate-400 leading-normal">
                    {analytics.coachAdvice}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={startDrill}
                    className="flex-1 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg uppercase tracking-widest font-mono transition-all duration-200 active:scale-95"
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

          {/* Rendering Canvas */}
          <canvas 
            ref={canvasRef} 
            className="block w-full h-full cursor-crosshair z-10" 
          />
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
                  <RuleItem num="1" color="green" text="Threat Interception" highlight="Base PTS & +1.0s" result="Click threat node in outer vision" />
                  <RuleItem num="2" color="orange" text="Combo System" highlight="Up to 3.0x Multiplier" result="Chain intercepts flawlessly" />
                </div>
                <div className="space-y-5">
                  <RuleItem num="3" color="red" text="Core Shield Breach" highlight="-3.5s Time Penalty" result="Score remains non-negative" />
                  <RuleItem num="4" color="purple" text="Adaptive Difficulty" highlight="Level Up" result="Every 150 PTS adds threat types" />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ABOUT DRILL EXPLAINER */}
        {!isFullscreen && (
          <section className="mt-12" aria-label="About this drill">
            <div className="rounded-2xl border border-gray-800 overflow-hidden bg-gray-900 shadow-xl">
              <div className="px-6 py-5 border-b border-gray-800 bg-black/40 flex items-center gap-3">
                <GraduationCap className="w-5 h-5 text-cyan-400" />
                <h2 className="font-bold text-white text-lg tracking-wide">About Peripheral Threat Sweeper</h2>
              </div>
              <div className="p-8">
                <p className="text-sm leading-relaxed mb-6 text-slate-400">
                  This free peripheral threat sweeper drill is designed to push your peripheral field of view, spatial coordination, and reaction precision. By spawning red target markers at random radial border coordinates, it demands players to keep focus centered on the cyan core shield and intercept danger indicators using fast, accurate clicks before they breach the center. As your score climbs, the engine adaptively introduces multi-directional density and evasive threats to simulate real combat chaos.
                </p>

                {/* Grid Section */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
                  <div className="p-5 rounded-xl border bg-black/40 border-gray-800">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center"><Users className="w-4 h-4 text-white" /></div>
                      <h3 className="text-sm font-bold text-white">Who It's For</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-slate-500">Esports athletes, physical coordination trainers, and gamers looking to maximize radar/map visual response speed.</p>
                  </div>
                  <div className="p-5 rounded-xl border bg-black/40 border-gray-800">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-green-600 flex items-center justify-center"><TrendingUp className="w-4 h-4 text-white" /></div>
                      <h3 className="text-sm font-bold text-white">Skills Improved</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-slate-500">Active peripheral visual awareness, micro-flick target acquisition, directional mapping, and temporal focus stability.</p>
                  </div>
                  <div className="p-5 rounded-xl border bg-black/40 border-gray-800">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center"><BarChart3 className="w-4 h-4 text-white" /></div>
                      <h3 className="text-sm font-bold text-white">What You'll Track</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-slate-500">Final score, total threat sweeps, core breaches, maximum intercept streaks, and current difficulty level.</p>
                  </div>
                </div>

                {/* FAQ Section */}
                <div className="p-5 rounded-xl border bg-black/40 border-gray-800">
                  <div className="flex items-center gap-3 mb-4">
                    <Lightbulb className="w-5 h-5 text-yellow-400" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">Frequently Asked Questions</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FAQItem 
                      q="What is peripheral vision training?" 
                      a="Peripheral vision training involves exercises designed to expand your active field of view, allowing your brain to process and react to visual stimuli occurring outside of your direct central focus." 
                    />
                    <FAQItem 
                      q="How does the Peripheral Threat Sweeper work?" 
                      a="You must keep your gaze anchored to a central core while identifying and intercepting threat nodes that spawn at the screen's edges and move inward, bridging the gap between visual detection and motor execution." 
                    />
                    <FAQItem 
                      q="Why is peripheral awareness important for gamers?" 
                      a="In esports titles like Valorant, CS2, and Apex Legends, players must keep their crosshair focused centrally while simultaneously monitoring the minimap, ammo, and flanking enemies. Strong peripheral vision reduces tunnel vision and reaction delay." 
                    />
                    <FAQItem 
                      q="What are the different threat types?" 
                      a="As the game difficulty adapts, you will face Standard threats (linear path), Fast threats (Orange, moving 1.5x speed), and Evasive threats (Purple, wobbling and altering their trajectory)." 
                    />
                    <FAQItem 
                      q="Why do I lose time for clicking empty space?" 
                      a="To prevent 'spam clicking'. The drill trains precise visual-motor integration. If you fire without acquiring a valid target, the engine deducts 1.5 seconds from your survival clock to enforce accuracy." 
                    />
                    <FAQItem 
                      q="What happens during a core breach?" 
                      a="If a threat hits the central shield, it violently drains -3.5s from your master survival clock and immediately resets your combo multiplier back to 1.0x." 
                    />
                    <FAQItem 
                      q="How does the Combo System work?" 
                      a="Consecutive intercepts without a core breach or false click build your multiplier. Reach a 40+ streak to unlock the maximum 3.0x score multiplier and rapidly scale the levels." 
                    />
                    <FAQItem 
                      q="Does the difficulty scale automatically?" 
                      a="Yes. Every 150 points you score triggers a Level Up. The engine will accelerate target speeds, decrease the spawn intervals, and introduce harder threat variations." 
                    />
                    <FAQItem 
                      q="Is this reflex game free to play?" 
                      a="Yes! The SkillDrills Peripheral Sweeper is entirely free, open-source, and runs purely in your web browser with zero downloads required." 
                    />
                    <FAQItem 
                      q="What is a good score for the Peripheral Threat Sweeper?" 
                      a="A score of 1000+ is Platinum tier. 2000+ indicates Diamond-level peripheral acquisition, and 3500+ with 90% accuracy places you in the Elite Master tier." 
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* RELATED DRILLS SECTION */}
        {!isFullscreen && (
          <section className="mt-14" aria-label="Explore related reflex and response drills">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-5 rounded-full bg-cyan-500"></div>
              <h2 className="text-xs font-bold text-white uppercase tracking-widest font-mono">
                Explore Related Drills
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <RelatedCard href="/drills/physical/reflex-training/visual-rhythm-intercept" title="Rhythm Intercept" desc="Intercept timing pulses on 4 paths." color="green" icon={<Target className="w-4 h-4" />} />
              <RelatedCard href="/drills/physical/coordination/dynamic-grid-evasion" title="Grid Evasion" desc="Dodge warnings inside 3x3 cells." color="cyan" icon={<Grid className="w-4 h-4" />} />
              <RelatedCard href="/drills/motor/hand-eye-coordination/precision-flick-shot" title="Flick Shot Trainer" desc="Snap onto rapid shrinking targets." color="blue" icon={<Crosshair className="w-4 h-4" />} />
              <RelatedCard href="/drills/motor/hand-eye-coordination/aim-trainer" title="Aim Trainer" desc="Hone spatial coordination click accuracy." color="indigo" icon={<Crosshair className="w-4 h-4" />} />
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
                    <li><Link href="/drills/visual" className="hover:text-cyan-400 transition-colors">Visual Drills</Link></li>
                    <li><Link href="/drills/physical" className="hover:text-cyan-400 transition-colors">Physical Drills</Link></li>
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
                  Open-source telemetry training platform using hardware pointer lock. Free forever. No downloads required.
                </p>
                
                {/* 5 Social Media Links restored to benchmark */}
                <div className="flex items-center justify-center gap-3 flex-wrap">
                  <a href="https://youtube.com/@skilldrills.online" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full transition-colors shadow-md bg-gray-900 text-gray-400 hover:text-white hover:bg-gray-800" title="YouTube">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                  </a>
                  <a href="https://www.facebook.com/profile.php?id=61590093843779" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full transition-colors shadow-md bg-gray-900 text-gray-400 hover:text-white hover:bg-gray-800" title="Facebook">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  </a>
                  <a href="https://x.com/skilldrillss" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full transition-colors shadow-md bg-gray-900 text-gray-400 hover:text-white hover:bg-gray-800" title="Twitter / X">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  </a>
                  <a href="https://www.instagram.com/skilldrills.online/?__pwa=1" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full transition-colors shadow-md bg-gray-900 text-gray-400 hover:text-white hover:bg-gray-800" title="Instagram">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
                  </a>
                  <a href="https://pinterest.com/skilldrills" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full transition-colors shadow-md bg-gray-900 text-gray-400 hover:text-white hover:bg-gray-800" title="Pinterest">
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
    cyan: 'from-cyan-500 to-blue-500',
    indigo: 'from-indigo-500 to-purple-500',
    rose: 'from-rose-500 to-pink-500'
  };
  return (
    <Link href={href} className="group relative overflow-hidden rounded-2xl border border-gray-800 bg-[#0b0f19]/40 transition-all hover:-translate-y-1 hover:border-cyan-500/50 block p-5">
      <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${gradients[color] || 'from-cyan-500 to-blue-500'}`}></div>
      <div className="w-10 h-10 rounded-xl bg-[#050811] border border-slate-700 flex items-center justify-center text-gray-400 group-hover:text-white mb-3 shadow-inner">
        {icon}
      </div>
      <h3 className="font-bold text-base mb-1.5 text-white group-hover:text-cyan-400 transition-colors">{title}</h3>
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