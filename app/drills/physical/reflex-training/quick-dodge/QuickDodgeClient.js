'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';

import { 
  Activity, AlertCircle, ArrowRight, BarChart3, ChevronRight, 
  Crosshair, Eye, GraduationCap, Info, Lightbulb, 
  Maximize2, Minimize2, Play, RefreshCw, Target, 
  Timer, TrendingUp, Trophy, Volume2, VolumeX, Zap, 
  Share2, Calculator, CheckCircle2, Users,
  XCircle, Sparkles, Flame, ShieldAlert, Star
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
        dodge: 880, 
        hit: 100, 
        streak: 1046.5,
        levelup: 1318.52
      };
      
      osc.type = (type === 'hit') ? 'sawtooth' : 'sine';
      osc.frequency.setValueAtTime(freqMap[type] || 880, now);
      
      if (type === 'hit') {
        osc.frequency.exponentialRampToValueAtTime(30, now + 0.5);
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
        osc.start(now); osc.stop(now + 0.5);
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
const DRILL_DURATION = 60; 

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function QuickDodgeClient() {
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
  const [currentLevel, setCurrentLevel] = useState(1);
  const [isNewBest, setIsNewBest] = useState(false);
  
  // Real-time HUD State
  const [currentSpeed, setCurrentSpeed] = useState(300);
  const [streak, setStreak] = useState(0);
  const [comboMultiplier, setComboMultiplier] = useState(1.0);

  // Analytics State
  const [analytics, setAnalytics] = useState({
    timeSurvived: 0,
    peakLevel: 1,
    peakSpeed: 300,
    totalDodges: 0,
    totalHits: 0,
    maxCombo: 0,
    nearMisses: 0,
    timeEarned: 0,
    timeLost: 0,
    evasionGrade: 'F',
    rankData: { rank: 'Rookie', color: 'text-gray-400' },
    coachAdvice: ''
  });

  // === High-performance Mutable Refs ===
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  const pageRef = useRef(null);
  
  // === Game Logic Engine Refs ===
  const engine = useRef({
    crosshair: { x: 0, y: 0, initialized: false },
    obstacles: [],
    
    // Core Loop Mechanics
    score: 0,
    level: 1,
    timeLeft: DRILL_DURATION,
    
    // Adaptive Parameters
    speed: 300,
    spawnDelay: 0.7,
    maxEnemies: 8,
    basePoints: 2,
    spawnTimer: 0,
    
    // State Tracking
    streak: 0,
    maxStreak: 0,
    combo: 1.0,
    bestCombo: 1.0,
    hitsTaken: 0,
    
    // Telemetry & VFX
    dodges: 0,
    totalTimeSurvived: 0,
    timeEarned: 0,
    timeLost: 0,
    nearMisses: 0,
    totalFrames: 0,
    screenShake: 0
  });

  const lastTimeRef = useRef(0);
  const isActiveRef = useRef(false);

  const cmPer360 = (30 / universalSens).toFixed(1);

  // === Initialization & Local Storage ===
  useEffect(() => {
    try {
      const savedSens = localStorage.getItem('quickDodge_sens_raw');
      if (savedSens) setUniversalSens(parseFloat(savedSens));
      const savedBest = localStorage.getItem('quickDodge_bestScore_raw');
      if (savedBest) setBestScore(parseInt(savedBest, 10));
    } catch (e) {}
  }, []);

  useEffect(() => {
    if (gameState !== 'playing') {
      try { localStorage.setItem('quickDodge_sens_raw', universalSens.toString()); } catch (e) {}
    }
    if (audioSynth) audioSynth.setEnabled(soundEnabled);
  }, [universalSens, gameState, soundEnabled]);

  // === Progressive Difficulty Scaling ===
  const updateLevelParams = (currentScore) => {
    const e = engine.current;
    let lv = 1; let spd = 300; let spwn = 0.70; let mx = 8; let bp = 2;
    
    // Brutal Scaling Curve
    if (currentScore >= 4000) { lv=10; spd=1800; spwn=0.10; mx=80; bp=25; }
    else if (currentScore >= 2500) { lv=9; spd=1500; spwn=0.15; mx=65; bp=20; }
    else if (currentScore >= 1600) { lv=8; spd=1250; spwn=0.20; mx=50; bp=16; }
    else if (currentScore >= 1000) { lv=7; spd=1050; spwn=0.25; mx=40; bp=12; }
    else if (currentScore >= 600) { lv=6; spd=850; spwn=0.30; mx=32; bp=9; }
    else if (currentScore >= 350) { lv=5; spd=700; spwn=0.35; mx=26; bp=7; }
    else if (currentScore >= 150) { lv=4; spd=550; spwn=0.42; mx=20; bp=5; }
    else if (currentScore >= 50) { lv=3; spd=450; spwn=0.50; mx=15; bp=4; }
    else if (currentScore >= 10) { lv=2; spd=350; spwn=0.60; mx=10; bp=3; }
    
    if (lv > e.level) {
      if (audioSynth) audioSynth.playSound('levelup');
      setFlashBg('level');
      setTimeout(() => setFlashBg(null), 150);
    } else if (lv < e.level) {
      // Allow dropping a level if score plummets from hits
      setFlashBg('red');
      setTimeout(() => setFlashBg(null), 150);
    }
    
    e.level = lv;
    e.speed = spd;
    e.spawnDelay = spwn;
    e.maxEnemies = mx;
    e.basePoints = bp;
  };

  // === Core Game Management ===
  const endGame = useCallback(() => {
    setGameState('gameOver');
    isActiveRef.current = false;
    if (document.pointerLockElement) document.exitPointerLock();
    
    const e = engine.current;
    
    // Rank & Grade Logic
    const totalEvents = e.dodges + e.hitsTaken;
    const finalAccuracy = totalEvents > 0 ? Math.round((e.dodges / totalEvents) * 100) : 0;
    
    let rank = 'Rookie'; let grade = 'F'; let rankColor = 'text-gray-400';
    if (e.score >= 5000) { rank = 'Dodge Master'; grade = 'S+'; rankColor = 'text-fuchsia-400'; }
    else if (e.score >= 3500) { rank = 'Phantom'; grade = 'S'; rankColor = 'text-purple-400'; }
    else if (e.score >= 2200) { rank = 'Legend'; grade = 'A'; rankColor = 'text-cyan-400'; }
    else if (e.score >= 1200) { rank = 'Apex'; grade = 'B'; rankColor = 'text-indigo-400'; }
    else if (e.score >= 650) { rank = 'Predator'; grade = 'C'; rankColor = 'text-rose-400'; }
    else if (e.score >= 300) { rank = 'Elite'; grade = 'D'; rankColor = 'text-amber-400'; }
    else if (e.score >= 100) { rank = 'Veteran'; grade = 'E'; rankColor = 'text-gray-300'; }

    let advice = 'Phenomenal survival instinct! Your cursor agility is top-tier. You managed to weave through maximum density swarms flawlessly.';
    if (e.hitsTaken > 6) {
      advice = 'You took too much damage. The hit penalty severely drains your clock and score, which de-levels you. Stop cornering yourself. Make wider sweeps through the center to pull enemies into predictable clusters.';
    } else if (e.level < 4) {
      advice = 'Your survivability is decent, but you did not scale your score fast enough. You must build your Combo Multiplier by chaining perfect dodges to reach the higher, more rewarding levels.';
    } else if (e.timeLost > e.timeEarned) {
      advice = 'You are bleeding more time than you are earning. Even with a high combo, getting hit nullifies your progress. Rely on fluid, continuous tracking rather than panic flicking when surrounded.';
    }

    setAnalytics({
      timeSurvived: Math.floor(e.totalTimeSurvived),
      peakLevel: e.level,
      peakSpeed: Math.floor(e.speed),
      totalDodges: e.dodges,
      totalHits: e.hitsTaken,
      maxCombo: e.maxStreak,
      nearMisses: e.nearMisses,
      timeEarned: parseFloat(e.timeEarned.toFixed(1)),
      timeLost: parseFloat(e.timeLost.toFixed(1)),
      evasionGrade: grade,
      rankData: { rank, color: rankColor }, // <-- BUG FIX: Property properly included
      coachAdvice: advice
    });

    setBestScore(prev => {
      if (e.score > prev) {
        setIsNewBest(true);
        try { localStorage.setItem('quickDodge_bestScore_raw', e.score.toString()); } catch(err){}
        return e.score;
      }
      return prev;
    });
  }, []);

  const spawnObstacle = useCallback((cvs) => {
    const e = engine.current;
    const ch = e.crosshair;
    
    const side = Math.floor(Math.random() * 4);
    let x, y;
    
    if (side === 0) { x = Math.random() * cvs.width; y = -50; }
    else if (side === 1) { x = cvs.width + 50; y = Math.random() * cvs.height; }
    else if (side === 2) { x = Math.random() * cvs.width; y = cvs.height + 50; }
    else { x = -50; y = Math.random() * cvs.height; }
    
    const angle = Math.atan2(ch.y - y, ch.x - x);
    
    // Base scale based on level.
    const radiusScale = 1.0 + (e.level * 0.05); 
    
    e.obstacles.push({
      x, y,
      vx: Math.cos(angle) * e.speed,
      vy: Math.sin(angle) * e.speed,
      r: 10,
      maxR: (30 + Math.random() * 20) * radiusScale
    });
  }, []);

  const applyPenalty = useCallback(() => {
    const e = engine.current;
    
    e.hitsTaken++;
    
    // Scaling Time Penalty (-5s to -10s max)
    const penalty = Math.min(10.0, 4.0 + e.hitsTaken);
    e.timeLeft -= penalty;
    e.timeLost += penalty;
    
    // Score deduction (punishing drop to potentially de-level)
    const pointLoss = Math.min(e.score, 20 + (e.level * 5));
    e.score -= pointLoss;

    // Reset Streaks
    e.streak = 0;
    e.combo = 1.0;
    e.screenShake = 30;
    
    // Clear screen to give player a breather
    e.obstacles = []; 
    
    if (audioSynth) audioSynth.playSound('hit');
    setFlashBg('red');
    setTimeout(() => setFlashBg(null), 100);
    
    setScore(e.score);
    setStreak(0);
    setComboMultiplier(1.0);
  }, []);

  const startGame = useCallback(async () => {
    if (audioSynth) audioSynth.init(); 

    setIsNewBest(false);
    setScore(0);
    setStreak(0);
    setComboMultiplier(1.0);
    setCurrentLevel(1);
    setCurrentSpeed(300);
    setGameState('playing');
    
    const e = engine.current;
    e.score = 0;
    e.level = 1;
    e.streak = 0;
    e.maxStreak = 0;
    e.combo = 1.0;
    e.bestCombo = 1.0;
    e.hitsTaken = 0;
    
    e.speed = 300;
    e.spawnDelay = 0.70;
    e.maxEnemies = 8;
    e.basePoints = 2;
    e.spawnTimer = 0;
    
    e.dodges = 0;
    e.totalTimeSurvived = 0;
    e.timeEarned = 0;
    e.timeLost = 0;
    e.nearMisses = 0;
    e.totalFrames = 0;
    
    e.obstacles = [];
    e.screenShake = 0;
    
    e.timeLeft = DRILL_DURATION;
    setTimeLeft(DRILL_DURATION);
    
    lastTimeRef.current = performance.now();
    isActiveRef.current = true;
    e.crosshair.initialized = false;

    try {
      if (containerRef.current && !document.fullscreenElement) {
        await containerRef.current.requestFullscreen();
      }
    } catch(err) {}

    setTimeout(() => {
      if (canvasRef.current && !document.pointerLockElement) {
        canvasRef.current.requestPointerLock().catch(()=>{});
        engine.current.crosshair.initialized = true;
      }
    }, 150);
  }, []);

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
      
      const eRef = engine.current;
      eRef.crosshair.x = Math.max(0, Math.min(cvs.width, eRef.crosshair.x + dx));
      eRef.crosshair.y = Math.max(0, Math.min(cvs.height, eRef.crosshair.y + dy));
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

  // === Native Physics & Render Loop (Delta Time) ===
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
          }
        }
      }
    });
    resizeObserver.observe(container);

    lastTimeRef.current = performance.now();

    const loop = (time) => {
      const deltaTimeMs = time - lastTimeRef.current;
      lastTimeRef.current = time; 
      const dt = Math.min(deltaTimeMs / 1000, 0.033); 
      const e = engine.current;

      if (gameState === 'playing' && pointerLocked && isActiveRef.current) {
        
        // Time drain accelerates slightly at extremely high levels to force fast dodging
        const timeDrainMultiplier = 1.0 + (e.level * 0.03);
        e.timeLeft -= dt * timeDrainMultiplier;
        e.totalTimeSurvived += dt;
        
        if (e.timeLeft <= 0) {
          e.timeLeft = 0;
          endGame();
        }

        e.totalFrames++;

        // Sync Difficulty Parameters
        updateLevelParams(e.score);

        // Spawning Logic
        e.spawnTimer += dt;
        if (e.spawnTimer > e.spawnDelay && e.obstacles.length < e.maxEnemies) {
          spawnObstacle(cvs);
          e.spawnTimer = 0;
        }

        const ch = e.crosshair;
        let playerHit = false;

        // Update Obstacles
        for (let i = e.obstacles.length - 1; i >= 0; i--) {
          const o = e.obstacles[i];
          
          o.x += o.vx * dt;
          o.y += o.vy * dt;
          o.r += (o.maxR - o.r) * 2.0 * dt; // Grow as they "approach"

          // Collision Check
          const dist = Math.hypot(ch.x - o.x, ch.y - o.y);
          if (dist < o.r + 6) { // Tight 6px hitbox forgiveness
            playerHit = true;
            break; // Stop checking, trigger penalty
          } else if (dist < o.r + 20) {
            e.nearMisses++;
          }

          // Out of bounds check (Successful Dodge)
          if (o.x < -150 || o.x > cvs.width + 150 || o.y < -150 || o.y > cvs.height + 150) {
            e.obstacles.splice(i, 1);
            e.dodges++;
            e.streak++;
            if (e.streak > e.maxStreak) e.maxStreak = e.streak;

            // Update Combo Multiplier
            if (e.streak >= 100) e.combo = 3.0;
            else if (e.streak >= 75) e.combo = 2.5;
            else if (e.streak >= 50) e.combo = 2.0;
            else if (e.streak >= 35) e.combo = 1.6;
            else if (e.streak >= 20) e.combo = 1.4;
            else if (e.streak >= 10) e.combo = 1.2;
            else if (e.streak >= 5) e.combo = 1.1;
            
            if (e.combo > e.bestCombo) e.bestCombo = e.combo;
            
            // Score Logic
            let pts = e.basePoints * e.combo;
            e.score += Math.floor(pts);

            // Time Reward Logic (Diminishing returns as level increases)
            let tReward = Math.max(0.1, 1.0 - (e.level * 0.08));
            
            // Streak Milestone Time Injections
            if (e.streak === 10) tReward += 2.0;
            else if (e.streak === 25) tReward += 3.0;
            else if (e.streak === 50) tReward += 5.0;
            else if (e.streak === 100) tReward += 10.0;

            e.timeLeft = Math.min(60, e.timeLeft + tReward);
            e.timeEarned += tReward;

            // Audio Cues
            if (e.streak === 10 || e.streak === 25 || e.streak === 50 || e.streak === 100) {
              if (audioSynth) audioSynth.playSound('streak');
            } else if (e.dodges % 5 === 0) {
              if (audioSynth) audioSynth.playSound('dodge');
            }
          }
        }

        if (playerHit) {
          applyPenalty();
        }

        // Throttle UI Sync
        if (e.totalFrames % 4 === 0) {
          setTimeLeft(e.timeLeft);
          setScore(e.score);
          setStreak(e.streak);
          setComboMultiplier(e.combo);
          setCurrentLevel(e.level);
          setCurrentSpeed(Math.floor(e.speed));
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

      // Background Rendering
      ctx.fillStyle = '#050508';
      ctx.fillRect(0, 0, cvs.width, cvs.height);

      // Environment Grid
      ctx.strokeStyle = 'rgba(239, 68, 68, 0.03)'; 
      ctx.lineWidth = 1; 
      for(let i = 0; i < cvs.width; i+= 50) { 
        ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, cvs.height); ctx.stroke(); 
        ctx.moveTo(0, i); ctx.lineTo(cvs.width, i); ctx.stroke();
      }

      // Draw Obstacles
      for (const o of e.obstacles) {
        ctx.beginPath(); 
        ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2); 
        ctx.fillStyle = "rgba(239, 68, 68, 0.15)"; 
        
        // Pulse Effect at high levels
        if (e.level >= 7) {
          ctx.shadowBlur = 15;
          ctx.shadowColor = "#ef4444";
        }
        
        ctx.fill(); 
        ctx.shadowBlur = 0;
        
        ctx.strokeStyle = "#ef4444"; 
        ctx.lineWidth = 3; 
        ctx.stroke();
        
        // Inner core
        ctx.beginPath();
        ctx.arc(o.x, o.y, o.r * 0.3, 0, Math.PI * 2);
        ctx.fillStyle = "#ef4444";
        ctx.fill();
        
        // Trail logic
        if (e.level >= 5) {
          ctx.beginPath();
          ctx.moveTo(o.x, o.y);
          ctx.lineTo(o.x - o.vx * 0.05, o.y - o.vy * 0.05);
          ctx.strokeStyle = "rgba(239, 68, 68, 0.5)";
          ctx.lineWidth = 4;
          ctx.stroke();
        }
      }

      // Draw Crosshair
      const ch = e.crosshair;
      if (ch.initialized && (gameState === 'playing' || gameState === 'start')) {
        let activeColor = pointerLocked ? '#00ff88' : '#f59e0b';
        if (e.combo >= 2.0) activeColor = '#a855f7'; // Purple at high combo
        if (e.combo >= 3.0) activeColor = '#eab308'; // Gold at max combo
        
        ctx.strokeStyle = activeColor;
        ctx.fillStyle = activeColor;
        
        // Outer aura at high combo
        if (e.combo >= 1.5) {
          ctx.shadowBlur = 15;
          ctx.shadowColor = activeColor;
        }
        
        ctx.lineWidth = 2;
        ctx.beginPath(); ctx.arc(ch.x, ch.y, 12, 0, Math.PI * 2); ctx.stroke();
        ctx.shadowBlur = 0;

        ctx.lineWidth = 1.5;
        const gap = 6;
        ctx.beginPath();
        ctx.moveTo(ch.x, ch.y - 12); ctx.lineTo(ch.x, ch.y - gap);
        ctx.moveTo(ch.x, ch.y + 12); ctx.lineTo(ch.x, ch.y + gap);
        ctx.moveTo(ch.x - 12, ch.y); ctx.lineTo(ch.x - gap, ch.y);
        ctx.moveTo(ch.x + 12, ch.y); ctx.lineTo(ch.x + gap, ch.y);
        ctx.stroke();
        
        ctx.beginPath(); ctx.arc(ch.x, ch.y, 3, 0, Math.PI * 2); ctx.fill();
      }

      ctx.restore();
      animationRef.current = requestAnimationFrame(loop);
    };

    animationRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animationRef.current);
      resizeObserver.disconnect();
    };
  }, [gameState, pointerLocked, applyPenalty, spawnObstacle, endGame]);

  const shareScore = useCallback(async () => {
    const text = `🎯 I reached Level ${currentLevel} and scored ${score} PTS on the Reflex Game Online! Max Combo: ${analytics.maxCombo}x. Test your spatial awareness at skilldrills.online!`;
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({ title: 'My Reflex Game Score', text, url: 'https://skilldrills.online/drills/physical/reflex-training/quick-dodge' });
      } catch (e) {}
    } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      alert('Score card copied to clipboard!');
    }
  }, [score, currentLevel, analytics]);

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
                <li><Link href="/drills/physical" className="hover:text-gray-300">Physical</Link></li>
                <li><ChevronRight className="w-4 h-4 text-gray-600" /></li>
                <li className="text-red-400 font-medium">Reflex Game Online</li>
              </ol>
            </nav>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-br from-red-500 to-orange-600 rounded-xl shadow-[0_0_20px_rgba(239,68,68,0.3)]">
                  <ShieldAlert className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Reflex Game Online</h1>
                  <p className="text-sm text-gray-400 mt-1 font-medium">Dodge Challenge • Mouse Control Training</p>
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
            <StatCard icon={<Target className="text-red-400" />} value={score} label="Score" />
            <StatCard icon={<Timer className={timeLeft <= 10 ? 'text-orange-400 animate-pulse' : 'text-emerald-400'} />} value={Math.max(0, timeLeft).toFixed(1)} label="Time" unit="s" />
            <StatCard icon={<TrendingUp className="text-blue-400" />} value={`Lv. ${currentLevel}`} label="Level" />
            <StatCard icon={<Flame className="text-fuchsia-400" />} value={`${comboMultiplier.toFixed(1)}x`} label="Combo" />
            <StatCard icon={<Zap className="text-yellow-400" />} value={streak} label="Current Streak" />
            <StatCard icon={<Trophy className="text-yellow-500" />} value={bestScore} label="Best Score" />
          </div>
        )}

        {/* Engine Container */}
        <div 
          ref={containerRef} 
          className={`relative overflow-hidden transition-colors outline-none ${
            isFullscreen ? 'w-full h-full' : 'w-full aspect-video min-h-[500px] rounded-2xl border border-gray-700 shadow-2xl'
          }`}
          style={{ 
            backgroundColor: flashBg === 'red' ? '#7f1d1d' : 
                             flashBg === 'level' ? '#0f172a' : '#05060b' 
          }}
        >
          {/* Progress Bar (Visual scaling capped at 60s) */}
          {gameState === 'playing' && (
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gray-900 z-[60]">
              <div 
                className={`h-full transition-all duration-100 ease-linear ${timeLeft <= 10 ? 'bg-orange-500 animate-pulse' : 'bg-red-500'}`}
                style={{ width: `${Math.min(100, (timeLeft / 60) * 100)}%` }} 
              />
            </div>
          )}

          {/* Fullscreen Overlay Controls */}
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
                    <p className="text-[10px] text-red-400 font-bold uppercase tracking-widest">Level</p>
                    <p className="text-2xl font-black text-red-400 leading-none">{currentLevel}</p>
                  </div>
                </div>
              </div>

              <div className="absolute top-4 right-4 z-[60] flex gap-2">
                <button onClick={() => setSoundEnabled(v => !v)} className="p-3 bg-black/60 border border-gray-600 rounded-xl text-white hover:bg-gray-800 transition-colors">
                  {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                </button>
                <button onClick={toggleFullscreen} className="p-3 bg-black/60 border border-gray-600 rounded-xl text-white hover:bg-gray-800 transition-colors">
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
                <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
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
            <div className="absolute inset-0 bg-[#05070e]/98 flex flex-col items-center justify-center p-6 z-30 select-none overflow-y-auto max-h-[100vh] backdrop-blur-sm">
              <div className="max-w-md w-full text-center">
                <h2 className="text-xl font-black text-white uppercase tracking-wider mb-1">
                  Reflex Dodge Challenge
                </h2>
                <p className="text-xs text-slate-500 uppercase tracking-widest mb-6">
                  Mouse Control • 60s Survival Loop
                </p>

                <div className="grid grid-cols-2 gap-3 mb-6 text-left">
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Objective</span>
                    <span className="text-sm font-black text-white">Evade Targets</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Reward</span>
                    <span className="text-sm font-black text-green-400">Score & +Time</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Penalty</span>
                    <span className="text-sm font-black text-red-400">Scaling Time Drain</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Mechanic</span>
                    <span className="text-sm font-black text-cyan-400">Aggressive Scaling</span>
                  </div>
                </div>

                <div className="bg-[#0b0f19] border border-slate-850 p-4 rounded-xl mb-4 text-left text-xs text-slate-400">
                  <span className="text-xs font-bold text-white block uppercase mb-1 flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-red-500" /> What this trains
                  </span>
                  <ul className="list-disc pl-4 space-y-1 text-[10px] text-slate-500 leading-relaxed">
                    <li>Peripheral visual scanning and threat identification</li>
                    <li>Tactical mouse movement and cursor agility</li>
                    <li>Reaction coordination speed under extreme scaling</li>
                  </ul>
                </div>

                <div className="bg-[#0b0f19] border border-slate-850 p-4 rounded-xl mb-6 text-left text-xs text-slate-400">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-white uppercase mb-3">
                    <Crosshair className="w-3.5 h-3.5 text-blue-500" /> Universal Sens
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-red-400 font-mono text-sm font-bold">{universalSens.toFixed(2)}x</span>
                    <span className="text-[10px] text-slate-500">Approx: {cmPer360} cm/360</span>
                  </div>
                  <input 
                    type="range" min="0.1" max="3.0" step="0.05" 
                    value={universalSens} 
                    onChange={(e) => setUniversalSens(parseFloat(e.target.value))} 
                    className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-red-500" 
                  />
                </div>

                <button
                  onClick={startGame}
                  className="w-full py-3 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg uppercase tracking-widest transition-all duration-200 active:scale-95"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  Begin Evasion Drill
                </button>
              </div>
            </div>
          )}

          {/* GAME OVER DASHBOARD */}
          {gameState === 'gameOver' && analytics.rankData && (
            <div className="absolute inset-0 bg-[#05070e]/98 flex flex-col items-center justify-center p-6 z-30 select-none overflow-y-auto max-h-[100vh] backdrop-blur-sm">
              <div className="max-w-md w-full text-center">
                {isNewBest && (
                  <div className="inline-block bg-yellow-500 text-black text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-3 shadow-[0_0_15px_rgba(234,179,8,0.5)] animate-bounce">
                    ⭐ NEW PERSONAL BEST!
                  </div>
                )}
                
                <h2 className="text-xl font-black text-white uppercase tracking-wider mb-1">
                  Tactical Analysis Complete
                </h2>
                <p className="text-xs text-slate-500 uppercase tracking-widest mb-6">
                  Peak Speed Level: Level {analytics.peakLevel}
                </p>

                {/* 3x4 Telemetry Grid */}
                <div className="grid grid-cols-3 gap-2.5 mb-6 text-left">
                  <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl col-span-3">
                    <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Final Score</span>
                    <span className="text-2xl font-black text-white">{score}</span>
                  </div>
                  
                  <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
                    <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Evasion Grade</span>
                    <span className="text-base font-black text-fuchsia-400">{analytics.evasionGrade}</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
                    <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Peak Level</span>
                    <span className="text-base font-black text-emerald-400">Lv. {analytics.peakLevel}</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
                    <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Max Combo</span>
                    <span className="text-base font-black text-orange-400">{analytics.maxCombo.toFixed(1)}x</span>
                  </div>

                  <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
                    <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Time Earned</span>
                    <span className="text-base font-black text-blue-400">+{analytics.timeEarned}s</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
                    <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Time Lost</span>
                    <span className="text-base font-black text-red-400">-{analytics.timeLost}s</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
                    <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Peak Speed</span>
                    <span className="text-base font-black text-indigo-400">{analytics.peakSpeed} px/s</span>
                  </div>
                  
                  <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
                    <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Total Dodges</span>
                    <span className="text-base font-black text-teal-400">{analytics.totalDodges}</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
                    <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Total Hits</span>
                    <span className="text-base font-black text-rose-400">{analytics.totalHits}</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
                    <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Near Misses</span>
                    <span className="text-base font-black text-yellow-400">{analytics.nearMisses}</span>
                  </div>
                </div>

                <div className="bg-[#0b0f19] border border-slate-850 p-3 rounded-xl mb-4 text-left">
                  <span className={`text-xs font-black block text-center uppercase tracking-widest ${analytics.rankData.color} mb-2`}>
                    Rank: {analytics.rankData.rank}
                  </span>
                  <div className="w-full h-px bg-slate-850 mb-2"></div>
                  <div className="flex items-center gap-1.5 text-[9px] font-bold text-white uppercase mb-1">
                    <Sparkles className="w-3 h-3 text-yellow-500" /> Diagnostics advice:
                  </div>
                  <p className="text-[10px] text-slate-400 leading-normal">
                    {analytics.coachAdvice}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={startGame}
                    className="flex-1 py-3 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg uppercase tracking-widest transition-all duration-200 active:scale-95"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    Run another trial
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
                <Info className="w-5 h-5 text-red-400" /><h2 className="font-bold text-white text-lg tracking-wide">Progression & Scoring Rules</h2>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-5">
                  <RuleItem num="1" color="green" text="Safe Evasion" highlight="Base PTS & Time" result="Survive threats to build clock" />
                  <RuleItem num="2" color="orange" text="Combo Multiplier" highlight="Up to 3.0x" result="Score scales massively on streaks" />
                </div>
                <div className="space-y-5">
                  <RuleItem num="3" color="red" text="Explosion Damage" highlight="Scaling Time Drain" result="Hits drain time and reset combos" />
                  <RuleItem num="4" color="purple" text="Brutal Scaling" highlight="Speed & Swarm" result="Difficulty spikes up to 1800 px/s" />
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
                <GraduationCap className="w-5 h-5 text-red-400" />
                <h2 className="font-bold text-white text-lg tracking-wide">About the Reflex Game Online</h2>
              </div>
              <div className="p-8">
                <p className="text-sm leading-relaxed mb-6 text-gray-300">
                  Take the ultimate visual reaction test by challenging your spatial awareness and cursor agility. This free reflex game online tests your hand-eye coordination by forcing you to rapidly scan for safe zones and physically move your crosshair out of the way of exploding threats. The difficulty engine constantly and aggressively increases threat density and speed as your score scales, creating a brutal tactical movement challenge.
                </p>

                {/* Grid Section */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center"><Users className="w-4 h-4 text-white" /></div>
                      <h3 className="text-sm font-bold text-white">Who It's For</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">FPS gamers improving tactical movement, users training peripheral awareness, and anyone seeking a high-pressure coordination training game.</p>
                  </div>
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-green-600 flex items-center justify-center"><TrendingUp className="w-4 h-4 text-white" /></div>
                      <h3 className="text-sm font-bold text-white">Skills Improved</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Spatial awareness, peripheral visual scanning, cursor control agility, reflex speed, and tactical decision making under pressure.</p>
                  </div>
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center"><BarChart3 className="w-4 h-4 text-white" /></div>
                      <h3 className="text-sm font-bold text-white">What You'll Track</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Total score, overall evasion accuracy, damage taken (explosions hit), time earned vs lost, and the peak adaptive difficulty level you survived.</p>
                  </div>
                </div>

                {/* How to Play & Scoring */}
                <div className="mb-8 bg-[#0b0f19]/40 border border-gray-800 rounded-xl p-6">
                  <h3 className="text-base font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Target className="w-5 h-5 text-red-500" /> How to Play & Scoring
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-6 text-sm text-gray-300">
                    <ol className="space-y-3 list-decimal pl-5">
                      <li>Click <strong>Begin Evasion Drill</strong> to lock your mouse inside the game.</li>
                      <li>Scan the canvas using your peripheral vision. Red homing obstacles will spawn and track your cursor.</li>
                      <li>Never stop moving. Draw them into clumps and sweep out of the way before they hit you.</li>
                    </ol>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> <span className="text-white font-bold">Safe Evasion:</span> Successfully dodging a wave restores decaying time to your clock and builds your combo.</li>
                      <li className="flex items-center gap-2"><XCircle className="w-4 h-4 text-red-500" /> <span className="text-white font-bold">Explosion Hit:</span> Being caught by a threat brutally drains your master survival clock. The penalty scales from -5s up to -10s for consecutive hits.</li>
                    </ul>
                  </div>
                </div>

                {/* FAQ Section */}
                <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                  <div className="flex items-center gap-3 mb-4">
                    <Lightbulb className="w-5 h-5 text-yellow-400" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">Frequently Asked Questions</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FAQItem 
                      q="What is a Reflex Game Online?" 
                      a="A reflex game is an interactive browser drill where players must navigate a cursor to evade dynamic, homing threats. It tests raw reaction speed, spatial awareness, and cursor precision under heavy cognitive load." 
                    />
                    <FAQItem 
                      q="How does this dodge challenge improve coordination?" 
                      a="By forcing you to process multiple peripheral threats simultaneously and execute precise, non-jittery mouse movements to escape tight corridors, it heavily strengthens visual-motor integration." 
                    />
                    <FAQItem 
                      q="Does this improve FPS gaming?" 
                      a="Yes. Surviving high-level evasion drills requires elite mouse agility and peripheral scanning. These translate directly to dodging utility, counter-strafing, and fluid crosshair placement in tactical shooters." 
                    />
                    <FAQItem 
                      q="Is this good for Valorant or CS2?" 
                      a="Absolutely. The rapid threat identification and repositioning translates directly to dodging flashes, grenades, and ultimate abilities while maintaining crosshair control." 
                    />
                    <FAQItem 
                      q="Does it improve hand-eye coordination?" 
                      a="Yes, because you must physically move your mouse to navigate the safe coordinates you visually identified, syncing your visual cortex with your motor cortex." 
                    />
                    <FAQItem 
                      q="How does the brutal difficulty scaling work?" 
                      a="As you score points, you level up. At higher levels, the obstacles spawn up to 7 times faster, scale to speeds over 1800px/s, and your time-reward for dodging diminishes, forcing you to execute faster just to survive." 
                    />
                    <FAQItem 
                      q="Are there penalties for getting hit?" 
                      a="Yes. Getting hit triggers a scaling time deduction, slicing chunks off your master clock. Furthermore, getting hit violently drops your total score, which can de-level your run." 
                    />
                    <FAQItem 
                      q="How does the survival clock work?" 
                      a="You start with 60 seconds. Every dodge adds time, but the higher your level, the less time you get. Perfect streak milestones grant massive time injections (up to +10s). The game ends when the clock hits zero." 
                    />
                    <FAQItem 
                      q="What is a good score?" 
                      a="Surviving past 1000 points places you in the Platinum tier. Reaching 4000+ points requires mechanical perfection and places you in the Master tier." 
                    />
                    <FAQItem 
                      q="Is this free?" 
                      a="Yes! The SkillDrills Reflex Game Online is entirely free, open-source, and runs purely in your web browser with zero downloads required." 
                    />
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
                Explore Related Drills
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <RelatedCard href="/drills/motor/hand-eye-coordination/aim-trainer" title="Aim Trainer" desc="Hone spatial coordinate click speed." color="green" icon={<Target className="w-4 h-4" />} />
              <RelatedCard href="/drills/fps/flick-shot-training" title="Pro Flick Trainer" desc="Snap to targets in time-attack mode." color="blue" icon={<Crosshair className="w-4 h-4" />} />
              <RelatedCard href="/drills/fps/180-degree-awareness" title="180° Awareness" desc="Alternate snapping opposite horizons." color="orange" icon={<Zap className="w-4 h-4" />} />
              <RelatedCard href="/drills/physical/coordination/complex-pattern" title="Complex Pattern Elite" desc="Spatial memory and tracing game." color="purple" icon={<Activity className="w-4 h-4" />} />
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
                    <Target className="w-3.5 h-3.5 text-red-400" />
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
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/></svg>
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
    rose: 'bg-rose-600 text-rose-300 border-rose-500'
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
      <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${gradients[color] || 'from-red-500 to-orange-500'}`}></div>
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

function FAQItem({ q, a }) {
  return (
    <div className="bg-[#05060b] border border-gray-800 rounded-xl p-5 hover:border-gray-700 transition-colors">
      <h4 className="text-sm font-bold text-gray-200 mb-2">{q}</h4>
      <p className="text-xs text-gray-400 leading-relaxed">{a}</p>
    </div>
  );
}