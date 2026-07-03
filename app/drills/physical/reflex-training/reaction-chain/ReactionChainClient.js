'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';

import { 
  Activity, AlertCircle, ArrowRight, BarChart3, ChevronRight, 
  Crosshair, Eye, GraduationCap, Info, Lightbulb, 
  Maximize2, Minimize2, Play, RefreshCw, Target, 
  Timer, TrendingUp, Trophy, Volume2, VolumeX, Zap, 
  Share2, Calculator, CheckCircle2, Users,
  XCircle, Sparkles, Flame, ShieldAlert, Star, Move
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
        arrest: 880, 
        miss: 150, 
        streak: 1046.5, 
        levelup: 1318.52 
      }; 
      
      osc.type = type === 'miss' ? 'sawtooth' : 'sine';
      osc.frequency.setValueAtTime(freqMap[type] || 880, now);
      
      if (type === 'miss') {
        osc.frequency.exponentialRampToValueAtTime(50, now + 0.3);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
        osc.start(now); osc.stop(now + 0.3);
      } else {
        gain.gain.setValueAtTime(type === 'levelup' ? 0.12 : 0.08, now);
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
export default function ReactionChainClient() {
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
  const [currentSpeed, setCurrentSpeed] = useState(600);
  const [streak, setStreak] = useState(0);
  const [comboMultiplier, setComboMultiplier] = useState(1.0);
  const [accuracy, setAccuracy] = useState(100);
  const [activeNodes, setActiveNodes] = useState(1);

  // Analytics State
  const [analytics, setAnalytics] = useState({
    accuracy: 100,
    arrests: 0,
    misses: 0,
    maxStreak: 0,
    peakSpeed: 600,
    peakLevel: 1,
    bestCombo: 1.0,
    timeEarned: 0,
    timeLost: 0,
    rankData: { rank: 'Bronze', color: 'text-slate-500' },
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
    nodes: [], // {x, y, vx, vy, active, r}
    
    // Core Loop Mechanics
    score: 0,
    level: 1,
    timeLeft: DRILL_DURATION,
    cursorVel: 0,
    lastMouse: { x: 0, y: 0 },
    
    // Adaptive Parameters
    baseSpeed: 600,
    maxNodes: 1,
    nodeRadius: 15,
    basePoints: 5,
    
    // State Tracking
    streak: 0,
    maxStreak: 0,
    combo: 1.0,
    bestCombo: 1.0,
    
    // Telemetry & VFX
    arrests: 0,
    misses: 0,
    totalAttempts: 0,
    totalFrames: 0,
    timeEarned: 0,
    timeLost: 0,
    screenShake: 0
  });

  const lastTimeRef = useRef(0);
  const isActiveRef = useRef(false);

  const cmPer360 = (30 / universalSens).toFixed(1);

  // === Initialization & Local Storage ===
  useEffect(() => {
    try {
      const savedSens = localStorage.getItem('reactionChain_sens_opt');
      if (savedSens) setUniversalSens(parseFloat(savedSens));
      const savedBest = localStorage.getItem('reactionChain_bestScore_opt');
      if (savedBest) setBestScore(parseInt(savedBest, 10));
    } catch (e) {}
  }, []);

  useEffect(() => {
    if (gameState !== 'playing') {
      try { localStorage.setItem('reactionChain_sens_opt', universalSens.toString()); } catch (e) {}
    }
    if (audioSynth) audioSynth.setEnabled(soundEnabled);
  }, [universalSens, gameState, soundEnabled]);

  // === Progressive Difficulty Scaling ===
  const updateLevelParams = (currentScore) => {
    const e = engine.current;
    let lv = 1; let spd = 600; let mx = 1; let r = 15; let bp = 5;
    
    // Brutal Scaling Curve
    if (currentScore >= 4000) { lv=10; spd=1800; mx=5; r=6; bp=25; }
    else if (currentScore >= 2500) { lv=9; spd=1500; mx=4; r=7; bp=20; }
    else if (currentScore >= 1600) { lv=8; spd=1300; mx=4; r=8; bp=16; }
    else if (currentScore >= 1000) { lv=7; spd=1100; mx=3; r=9; bp=12; }
    else if (currentScore >= 600) { lv=6; spd=950; mx=3; r=10; bp=9; }
    else if (currentScore >= 350) { lv=5; spd=800; mx=2; r=11; bp=7; }
    else if (currentScore >= 150) { lv=4; spd=700; mx=2; r=12; bp=6; }
    else if (currentScore >= 50) { lv=3; spd=650; mx=2; r=13; bp=5; }
    else if (currentScore >= 10) { lv=2; spd=600; mx=1; r=14; bp=5; }

    // Fullscreen scaling bonus
    if (document.fullscreenElement) {
      mx = Math.min(mx + 1, 6);
      spd = Math.floor(spd * 1.15); // +15% speed in fullscreen due to more space
    }
    
    if (lv > e.level) {
      if (audioSynth) audioSynth.playSound('levelup');
      setFlashBg('level');
      setTimeout(() => setFlashBg(null), 150);
    } else if (lv < e.level) {
      setFlashBg('red');
      setTimeout(() => setFlashBg(null), 150);
    }
    
    e.level = lv;
    e.baseSpeed = spd;
    e.maxNodes = mx;
    e.nodeRadius = r;
    e.basePoints = bp;
  };

  // === Core Game Management ===
  const endGame = useCallback(() => {
    setGameState('gameOver');
    isActiveRef.current = false;
    if (document.pointerLockElement) document.exitPointerLock();
    
    const e = engine.current;
    
    // Rank & Grade Logic
    const finalAccuracy = e.totalAttempts > 0 ? Math.round((e.arrests / e.totalAttempts) * 100) : 0;
    
    let rank = 'Rookie'; let rankColor = 'text-gray-400';
    if (e.score >= 4000 && finalAccuracy >= 90) { rank = 'Kinetic Master'; rankColor = 'text-fuchsia-400'; }
    else if (e.score >= 2000 && finalAccuracy >= 85) { rank = 'Diamond'; rankColor = 'text-cyan-400'; }
    else if (e.score >= 1000 && finalAccuracy >= 78) { rank = 'Platinum'; rankColor = 'text-indigo-400'; }
    else if (e.score >= 500 && finalAccuracy >= 70) { rank = 'Gold'; rankColor = 'text-yellow-400'; }
    else if (e.score >= 150) { rank = 'Silver'; rankColor = 'text-gray-300'; }

    let advice = 'Incredible impulse inhibition! You successfully arrested ultra-high velocity targets while maintaining perfect kinetic control.';
    if (e.misses > 8) {
      advice = 'You lack impulse control. You are tracking the target but failing to STOP your hand completely before it arrives. The crosshair must turn green ("ARREST READY") before the target passes under you.';
    } else if (e.level < 4) {
      advice = 'Your stopping precision is okay, but you are not intercepting targets fast enough. Build your Combo Multiplier by chaining perfect arrests to rapidly scale into the higher, more rewarding levels.';
    }

    setAccuracy(finalAccuracy);

    setAnalytics({
      accuracy: finalAccuracy,
      arrests: e.arrests,
      misses: e.misses,
      maxStreak: e.maxStreak,
      peakSpeed: Math.floor(e.baseSpeed),
      peakLevel: e.level,
      bestCombo: e.bestCombo,
      timeEarned: parseFloat(e.timeEarned.toFixed(1)),
      timeLost: parseFloat(e.timeLost.toFixed(1)),
      rankData: { rank, color: rankColor },
      coachAdvice: advice
    });

    setBestScore(prev => {
      if (e.score > prev) {
        setIsNewBest(true);
        try { localStorage.setItem('reactionChain_bestScore_opt', e.score.toString()); } catch(err){}
        return e.score;
      }
      return prev;
    });
  }, []);

  const spawnNode = useCallback((cvs) => {
    const e = engine.current;
    const side = Math.floor(Math.random() * 4); 
    
    let x, y, vx, vy;
    
    if (side === 0) { 
      x = -20; y = Math.random() * cvs.height; 
      vx = e.baseSpeed; vy = 0; 
    } else if (side === 1) { 
      x = cvs.width + 20; y = Math.random() * cvs.height; 
      vx = -e.baseSpeed; vy = 0; 
    } else if (side === 2) { 
      x = Math.random() * cvs.width; y = -20; 
      vx = 0; vy = e.baseSpeed; 
    } else { 
      x = Math.random() * cvs.width; y = cvs.height + 20; 
      vx = 0; vy = -e.baseSpeed; 
    } 
    
    e.nodes.push({ x, y, vx, vy, active: true, r: e.nodeRadius });
  }, []);

  const applyPenalty = useCallback((nodeIndex) => {
    const e = engine.current;
    
    e.misses++;
    e.totalAttempts++;
    
    // Scaling Time Penalty
    const penalty = Math.min(6.0, 3.0 + (e.level * 0.3));
    e.timeLeft -= penalty;
    e.timeLost += penalty;
    
    // Score deduction
    const pointLoss = Math.min(e.score, 15 + (e.level * 2));
    e.score -= pointLoss;
    
    e.streak = 0;
    e.combo = 1.0;
    e.screenShake = 20;
    
    if (nodeIndex !== undefined && e.nodes[nodeIndex]) {
      e.nodes.splice(nodeIndex, 1);
    }
    
    if (audioSynth) audioSynth.playSound('miss');
    
    setScore(e.score);
    setStreak(0);
    setComboMultiplier(1.0);
    
    setFlashBg('red');
    setTimeout(() => setFlashBg(null), 100);
  }, []);

  const handleArrest = useCallback((nodeIndex) => {
    const e = engine.current;
    
    e.arrests++;
    e.totalAttempts++;
    e.streak++;
    if (e.streak > e.maxStreak) e.maxStreak = e.streak;
    
    // Combo Multiplier
    let multi = 1.0;
    if (e.streak >= 40) multi = 3.0;
    else if (e.streak >= 25) multi = 2.0;
    else if (e.streak >= 10) multi = 1.5;
    else if (e.streak >= 5) multi = 1.2;
    
    if (multi > e.bestCombo) e.bestCombo = multi;
    e.combo = multi;

    // Score Logic
    let pts = e.basePoints * e.combo;
    e.score += Math.floor(pts);
    
    // Diminishing Time Reward
    const tReward = Math.max(0.2, 1.5 - (e.level * 0.1));
    e.timeLeft = Math.min(60, e.timeLeft + tReward);
    e.timeEarned += tReward;

    e.nodes.splice(nodeIndex, 1);
    
    if (e.streak % 10 === 0) { 
      if (audioSynth) audioSynth.playSound('streak'); 
    } else { 
      if (audioSynth) audioSynth.playSound('arrest'); 
    }
    
    setScore(e.score);
    setStreak(e.streak);
    setComboMultiplier(e.combo);
  }, []);

  const startGame = useCallback(async () => {
    if (audioSynth) audioSynth.init(); 

    setIsNewBest(false);
    setScore(0);
    setStreak(0);
    setAccuracy(100);
    setCurrentSpeed(600);
    setCurrentLevel(1);
    setComboMultiplier(1.0);
    setGameState('playing');
    
    const e = engine.current;
    e.score = 0;
    e.level = 1;
    e.streak = 0;
    e.maxStreak = 0;
    e.combo = 1.0;
    e.bestCombo = 1.0;
    
    e.baseSpeed = 600;
    e.maxNodes = 1;
    e.nodeRadius = 15;
    e.basePoints = 5;
    
    e.arrests = 0;
    e.misses = 0;
    e.totalAttempts = 0;
    e.totalFrames = 0;
    e.timeEarned = 0;
    e.timeLost = 0;
    e.screenShake = 0;
    
    e.nodes = [];
    
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
    const fsListener = () => {
      const isFs = !!document.fullscreenElement;
      setIsFullscreen(isFs);
    };
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
            engine.current.lastMouse.x = width / 2;
            engine.current.lastMouse.y = height / 2;
          }
        }
      }
    });
    resizeObserver.observe(container);

    lastTimeRef.current = performance.now();

    const loop = (time) => {
      const deltaTimeMs = time - lastTimeRef.current;
      lastTimeRef.current = time; 
      const dt = Math.min(deltaTimeMs / 1000, 0.033); // Clamp dt
      const e = engine.current;

      if (gameState === 'playing' && pointerLocked && isActiveRef.current) {
        
        // Accelerated Time Drain
        const timeDrainMultiplier = 1.0 + (e.level * 0.05);
        e.timeLeft -= dt * timeDrainMultiplier;
        
        if (e.timeLeft <= 0) {
          e.timeLeft = 0;
          endGame();
        }

        e.totalFrames++;
        const ch = e.crosshair; 
        
        // Calculate Cursor Velocity (for arrest detection)
        const velX = ch.x - e.lastMouse.x; 
        const velY = ch.y - e.lastMouse.y; 
        e.cursorVel = Math.hypot(velX, velY); 
        e.lastMouse.x = ch.x; 
        e.lastMouse.y = ch.y; 
        
        // Sync Difficulty Parameters
        updateLevelParams(e.score);

        // Ensure max nodes exist
        while (e.nodes.length < e.maxNodes) { 
          spawnNode(cvs); 
        } 
        
        // Process Nodes
        for (let i = e.nodes.length - 1; i >= 0; i--) { 
          const node = e.nodes[i]; 
          
          node.x += node.vx * dt; 
          node.y += node.vy * dt; 
          
          const dist = Math.hypot(ch.x - node.x, ch.y - node.y); 
          
          // Collision Check
          if (dist < node.r + 8) { 
            // Arrest Condition: Cursor must be practically still
            if (e.cursorVel < 1.5) { 
              handleArrest(i); 
              break; 
            } else { 
              // Sliced right through it without stopping!
              applyPenalty(i); 
              break; 
            } 
          } 
          
          // Missed Node (Went off screen)
          const padding = 150; 
          if (node.x < -padding || node.x > cvs.width + padding || node.y < -padding || node.y > cvs.height + padding) { 
            applyPenalty(i); 
            break; 
          } 
        }

        // Throttle UI Sync
        if (e.totalFrames % 4 === 0) {
          setTimeLeft(e.timeLeft);
          setCurrentSpeed(Math.floor(e.baseSpeed));
          setActiveNodes(e.nodes.length);
          setCurrentLevel(e.level);
          setAccuracy(e.totalAttempts > 0 ? Math.round((e.arrests / e.totalAttempts) * 100) : 100);
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

      // Environment Grid
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.03)'; // Emerald tint
      ctx.lineWidth = 1; 
      for(let i = 0; i < cvs.width; i+= 50) { 
        ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, cvs.height); ctx.stroke(); 
        ctx.moveTo(0, i); ctx.lineTo(cvs.width, i); ctx.stroke();
      }

      // Draw Nodes
      const currentVelocity = e.baseSpeed;
      e.nodes.forEach(node => { 
        // Speed Radar Visualization (Green -> Orange -> Red)
        const speedIntensity = Math.min(1, (currentVelocity - 600) / 1000); 
        
        ctx.beginPath(); 
        ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2); 
        
        if (speedIntensity > 0.5) { 
          const g = Math.floor(255 * (1 - speedIntensity)); 
          ctx.fillStyle = `rgb(255, ${g}, 0)`; 
          ctx.strokeStyle = `rgb(255, ${g}, 0)`; 
          ctx.shadowColor = `rgb(255, ${g}, 0)`;
        } else { 
          ctx.fillStyle = "#10b981"; 
          ctx.strokeStyle = "#10b981"; 
          ctx.shadowColor = "#10b981";
        } 
        
        ctx.shadowBlur = 10;
        ctx.fill(); 
        ctx.shadowBlur = 0;
        
        // Trailing Line
        const angle = Math.atan2(node.vy, node.vx); 
        ctx.beginPath(); 
        ctx.moveTo(node.x, node.y); 
        ctx.lineTo(node.x - Math.cos(angle) * 20, node.y - Math.sin(angle) * 20); 
        ctx.lineWidth = 3; 
        ctx.stroke(); 
        
        // Outer Radar Ring
        ctx.beginPath(); 
        ctx.arc(node.x, node.y, node.r * 2.0, 0, Math.PI * 2); 
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 + speedIntensity * 0.4})`; 
        ctx.lineWidth = 1; 
        ctx.stroke(); 
      });

      // Draw Crosshair
      const ch = e.crosshair;
      if (ch.initialized && (gameState === 'playing' || gameState === 'start')) {
        const isStill = e.cursorVel < 1.5; 
        
        const activeColor = pointerLocked ? (isStill ? "#10b981" : "rgba(255,255,255,0.6)") : "#ef4444";
        
        if (e.combo >= 2.0 && isStill) {
          ctx.shadowBlur = 15;
          ctx.shadowColor = "#10b981";
        }

        ctx.beginPath(); 
        ctx.arc(ch.x, ch.y, 15, 0, Math.PI * 2); 
        ctx.strokeStyle = activeColor; 
        ctx.lineWidth = 2; 
        ctx.stroke(); 
        ctx.shadowBlur = 0;
        
        ctx.beginPath(); 
        ctx.arc(ch.x, ch.y, 22, 0, Math.PI * 2); 
        ctx.strokeStyle = pointerLocked ? (isStill ? 'rgba(16,185,129,0.3)' : 'rgba(255,255,255,0.15)') : 'rgba(239,68,68,0.3)'; 
        ctx.lineWidth = 1; 
        ctx.stroke(); 
        
        ctx.beginPath(); 
        ctx.moveTo(ch.x - 24, ch.y); ctx.lineTo(ch.x - 10, ch.y); 
        ctx.moveTo(ch.x + 10, ch.y); ctx.lineTo(ch.x + 24, ch.y); 
        ctx.moveTo(ch.x, ch.y - 24); ctx.lineTo(ch.x, ch.y - 10); 
        ctx.moveTo(ch.x, ch.y + 10); ctx.lineTo(ch.x, ch.y + 24); 
        ctx.strokeStyle = activeColor; 
        ctx.stroke(); 
        
        ctx.fillStyle = activeColor; 
        ctx.beginPath(); ctx.arc(ch.x, ch.y, 3, 0, Math.PI * 2); ctx.fill(); 
        
        ctx.font = "bold 10px monospace"; 
        ctx.textAlign = "center"; 
        ctx.fillStyle = activeColor; 
        ctx.fillText(isStill ? "ARREST READY" : `VEL: ${e.cursorVel.toFixed(1)}`, ch.x, ch.y - 30);
      }

      ctx.restore();
      animationRef.current = requestAnimationFrame(loop);
    };

    animationRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animationRef.current);
      resizeObserver.disconnect();
    };
  }, [gameState, pointerLocked, applyPenalty, handleArrest, spawnNode, endGame]);

  const shareScore = useCallback(async () => {
    const text = `🎯 I reached Level ${currentLevel} and scored ${score} PTS on Reaction Chain Elite! Max Combo: ${analytics.bestCombo}x. Test your impulse control at skilldrills.online!`;
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({ title: 'My Reflex Score', text, url: 'https://skilldrills.online/drills/physical/reflex-training/reaction-chain' });
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
                <li className="text-emerald-400 font-medium">Reaction Chain</li>
              </ol>
            </nav>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                  <Crosshair className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Reaction Chain</h1>
                  <p className="text-sm text-gray-400 mt-1 font-medium">Desktop Exclusive • Impulse Arrest</p>
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
            <StatCard icon={<Target className="text-emerald-400" />} value={score} label="Score" />
            <StatCard icon={<Timer className={timeLeft <= 10 ? 'text-red-400 animate-pulse' : 'text-teal-400'} />} value={Math.max(0, timeLeft).toFixed(1)} label="Time" unit="s" />
            <StatCard icon={<TrendingUp className="text-blue-400" />} value={`Lv. ${currentLevel}`} label="Level" />
            <StatCard icon={<Flame className="text-orange-400" />} value={`${comboMultiplier.toFixed(1)}x`} label="Combo" />
            <StatCard icon={<Activity className="text-purple-400" />} value={currentSpeed} label="Node Speed" unit="px/s" />
            <StatCard icon={<Info className="text-gray-400" />} value={`${universalSens.toFixed(2)}x`} label="Sens" />
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
            backgroundColor: flashBg === 'red' ? '#450a0a' : 
                             flashBg === 'level' ? '#064e3b' : '#05060b' 
          }}
        >
          {/* Progress Bar */}
          {gameState === 'playing' && (
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gray-900 z-[60]">
              <div 
                className={`h-full transition-all duration-100 ease-linear ${timeLeft <= 10 ? 'bg-orange-500 animate-pulse' : 'bg-emerald-500'}`}
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
                    <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest">Level</p>
                    <p className="text-2xl font-black text-emerald-400 leading-none">{currentLevel}</p>
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
                <AlertCircle className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
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
                  Reaction Chain
                </h2>
                <p className="text-xs text-slate-500 uppercase tracking-widest mb-6">
                  Impulse Arrest • Adaptive Drill
                </p>

                <div className="grid grid-cols-2 gap-3 mb-6 text-left">
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Objective</span>
                    <span className="text-sm font-black text-white">Stop on Nodes</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Reward</span>
                    <span className="text-sm font-black text-green-400">Score & +Time</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Penalty</span>
                    <span className="text-sm font-black text-red-400">-Time & Combos Lost</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Mechanic</span>
                    <span className="text-sm font-black text-emerald-400">Aggressive Scaling</span>
                  </div>
                </div>

                <div className="bg-[#0b0f19] border border-slate-850 p-4 rounded-xl mb-4 text-left text-xs text-slate-400">
                  <span className="text-xs font-bold text-white block uppercase mb-1 flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-emerald-500" /> What this trains
                  </span>
                  <ul className="list-disc pl-4 space-y-1 text-[10px] text-slate-500 leading-relaxed">
                    <li>Kinetic brake control and hand-eye coordination</li>
                    <li>Motor inhibition (stopping exactly on a target)</li>
                    <li>Preventing "lazy aiming" or over-flicking in high speed</li>
                  </ul>
                </div>

                <div className="bg-[#0b0f19] border border-slate-850 p-4 rounded-xl mb-6 text-left text-xs text-slate-400">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-white uppercase mb-3">
                    <Crosshair className="w-3.5 h-3.5 text-blue-500" /> Universal Sens
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-emerald-400 font-mono text-sm font-bold">{universalSens.toFixed(2)}x</span>
                    <span className="text-[10px] text-slate-500">Approx: {cmPer360} cm/360</span>
                  </div>
                  <input 
                    type="range" min="0.1" max="3.0" step="0.05" 
                    value={universalSens} 
                    onChange={(e) => setUniversalSens(parseFloat(e.target.value))} 
                    className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500" 
                  />
                </div>

                <button
                  onClick={startGame}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg uppercase tracking-widest transition-all duration-200 active:scale-95"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  Begin Arrest Drill
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
                  Kinetic Analysis Complete
                </h2>
                <p className="text-xs text-slate-500 uppercase tracking-widest mb-6">
                  Peak Velocity Arrested: {analytics.peakSpeed} px/s
                </p>

                {/* 3x4 Telemetry Grid */}
                <div className="grid grid-cols-3 gap-2.5 mb-6 text-left">
                  <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl col-span-3">
                    <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Final Score</span>
                    <span className="text-2xl font-black text-white">{score}</span>
                  </div>
                  
                  <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
                    <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Arrest Acc.</span>
                    <span className="text-base font-black text-fuchsia-400">{analytics.accuracy}%</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
                    <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Peak Level</span>
                    <span className="text-base font-black text-emerald-400">Lv. {analytics.peakLevel}</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
                    <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Max Combo</span>
                    <span className="text-base font-black text-orange-400">{analytics.bestCombo.toFixed(1)}x</span>
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
                    <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Max Streak</span>
                    <span className="text-base font-black text-indigo-400">{analytics.maxStreak}</span>
                  </div>
                  
                  <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
                    <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Total Arrests</span>
                    <span className="text-base font-black text-teal-400">{analytics.arrests}</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
                    <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Slice-Throughs</span>
                    <span className="text-base font-black text-rose-400">{analytics.misses}</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
                    <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Peak Speed</span>
                    <span className="text-base font-black text-yellow-400">{analytics.peakSpeed} px/s</span>
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
                    className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg uppercase tracking-widest transition-all duration-200 active:scale-95"
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
                <Info className="w-5 h-5 text-emerald-400" /><h2 className="font-bold text-white text-lg tracking-wide">Progression & Scoring Rules</h2>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-5">
                  <RuleItem num="1" color="green" text="Kinetic Arrest" highlight="Base PTS & Time" result="Stop perfectly on targets" />
                  <RuleItem num="2" color="orange" text="Combo Multiplier" highlight="Up to 3.0x" result="Score scales massively on streaks" />
                </div>
                <div className="space-y-5">
                  <RuleItem num="3" color="red" text="Slice-Through Penalty" highlight="Scaling Time Drain" result="Moving while hitting loses time" />
                  <RuleItem num="4" color="purple" text="Brutal Scaling" highlight="Speed & Shrinkage" result="Difficulty spikes up to 1800 px/s" />
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
                <GraduationCap className="w-5 h-5 text-emerald-400" />
                <h2 className="font-bold text-white text-lg tracking-wide">About Reaction Chain</h2>
              </div>
              <div className="p-8">
                <p className="text-sm leading-relaxed mb-6 text-gray-300">
                  This free Reaction Chain drill trains precision stopping and impulse control (motor inhibition). Instead of simply clicking moving targets, you must move to intercept them and force your hand to stop completely. The adaptive difficulty engine violently scales the target velocities, shrinks the target radius, and accelerates the game clock to test your kinetic braking limits.
                </p>

                {/* Grid Section */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center"><Users className="w-4 h-4 text-white" /></div>
                      <h3 className="text-sm font-bold text-white">Who It's For</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">FPS Gamers wanting to eliminate "lazy aiming" and over-flicking, and athletes seeking advanced motor inhibition training under high stress.</p>
                  </div>
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-green-600 flex items-center justify-center"><TrendingUp className="w-4 h-4 text-white" /></div>
                      <h3 className="text-sm font-bold text-white">Skills Improved</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Precision stopping, kinetic friction control, impulse inhibition, and high-speed target interception.</p>
                  </div>
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center"><BarChart3 className="w-4 h-4 text-white" /></div>
                      <h3 className="text-sm font-bold text-white">What You'll Track</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Total score, arrest accuracy, peak velocity defeated, max combo multiplier, and total slice-through errors.</p>
                  </div>
                </div>

                {/* How to Play & Scoring */}
                <div className="mb-8 bg-[#0b0f19]/40 border border-gray-800 rounded-xl p-6">
                  <h3 className="text-base font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Target className="w-5 h-5 text-emerald-500" /> How to Play & Scoring
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-6 text-sm text-gray-300">
                    <ol className="space-y-3 list-decimal pl-5">
                      <li>Click <strong>Begin Arrest Drill</strong> to lock your mouse inside the game.</li>
                      <li>Move your crosshair into the path of the incoming nodes.</li>
                      <li><strong>Stop moving your mouse completely</strong> (Crosshair turns green).</li>
                    </ol>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> <span className="text-white font-bold">Valid Arrest:</span> If the node passes under you while you are stopped, you earn Base PTS and restore decaying time to your clock.</li>
                      <li className="flex items-center gap-2"><XCircle className="w-4 h-4 text-red-500" /> <span className="text-white font-bold">Slice-through Error:</span> If you are moving when you hit the node, you brutally lose time and de-level your score.</li>
                    </ul>
                  </div>
                </div>

                {/* FAQ Section Expanded */}
                <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                  <div className="flex items-center gap-3 mb-4">
                    <Lightbulb className="w-5 h-5 text-yellow-400" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">Frequently Asked Questions</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FAQItem 
                      q="What is the Reaction Chain drill?" 
                      a="An elite reflex training game focusing on mouse precision and impulse arrest. Instead of clicking targets, you must steer your cursor over them and stop completely to 'arrest' them." 
                    />
                    <FAQItem 
                      q="How do impulse arrest mechanics work?" 
                      a="When your crosshair is over a target, your mouse velocity must be under 1.5 pixels/frame ('ARREST READY' turns green). Stopping successfully scores points. If you slice through it while moving, it triggers a brutal penalty." 
                    />
                    <FAQItem 
                      q="What skills does this reflex drill improve?" 
                      a="It trains kinetic brake control, hand-eye coordination, motor inhibition (stopping on a dime), and prevents over-flicking or spastic aiming in high-speed gaming." 
                    />
                    <FAQItem 
                      q="Why does my clock drain?" 
                      a="Unlike standard aim trainers, this drill actively punishes bad accuracy and kinetic overflow. Missing a target or slicing through it without stopping deducts significant time from your master survival clock." 
                    />
                    <FAQItem 
                      q="How does the brutal difficulty scaling work?" 
                      a="As you score points, you level up. At higher levels, nodes spawn faster, physically shrink to tighter radiuses, and scale to speeds over 1800px/s. Your time-reward for dodging also diminishes, forcing you to execute faster." 
                    />
                    <FAQItem 
                      q="What is the combo system?" 
                      a="If you can arrest multiple nodes in a row without making a slice-through error, your score multiplier will scale up to 1.5x, 2.0x, and eventually 3.0x. Maintaining high combos is the only way to reach Master tier." 
                    />
                    <FAQItem 
                      q="Does this game help with Valorant or CS2 aim?" 
                      a="Yes, it directly trains snap deceleration. In tactical shooters, you must stop moving your mouse and character to achieve perfect first-shot accuracy. This drill builds that muscle memory." 
                    />
                    <FAQItem 
                      q="What is a good score in the Reaction Chain drill?" 
                      a="Surviving past 1000 points places you in the Platinum tier. Reaching 4000+ points requires mechanical perfection and places you in the Master tier." 
                    />
                    <FAQItem 
                      q="Do I need to sign up for this mouse precision test?" 
                      a="No registration required. This free mouse precision and reflex game works instantly in your browser — no downloads needed." 
                    />
                    <FAQItem 
                      q="Is this reflex game free to play?" 
                      a="Yes, the Reaction Chain drill on SkillDrills is 100% free, ad-free, and runs entirely in your web browser." 
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
              <div className="w-1 h-5 rounded-full bg-emerald-500"></div>
              <h2 className="text-xs font-bold text-white uppercase tracking-widest font-mono">
                Explore Related Drills
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <RelatedCard href="/drills/motor/hand-eye-coordination/aim-trainer" title="Aim Trainer" desc="Hone spatial coordinate click speed." color="green" icon={<Target className="w-4 h-4" />} />
              <RelatedCard href="/drills/fps/flick-shot-training" title="Pro Flick Trainer" desc="Snap to targets in time-attack mode." color="blue" icon={<Crosshair className="w-4 h-4" />} />
              <RelatedCard href="/drills/fps/180-degree-awareness" title="180° Awareness" desc="Alternate snapping opposite horizons." color="orange" icon={<Zap className="w-4 h-4" />} />
              <RelatedCard href="/drills/physical/coordination/quick-dodge" title="Quick Dodge" desc="Evasion and spatial awareness drill." color="red" icon={<ShieldAlert className="w-4 h-4" />} />
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
                    <li><Link href="/drills/motor/hand-eye-coordination/aim-trainer" className="hover:text-emerald-400 transition-colors">Aim Trainer Elite</Link></li>
                    <li><Link href="/drills/fps/flick-shot-training" className="hover:text-emerald-400 transition-colors">Flick Shot Trainer</Link></li>
                    <li><Link href="/drills/fps" className="text-emerald-450 hover:text-emerald-400 transition-colors font-bold">All FPS Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Memory</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/memory/working-memory/n-back" className="hover:text-emerald-400 transition-colors">3-Back Training</Link></li>
                    <li><Link href="/drills/memory/short-term-memory/color-sequence" className="hover:text-emerald-400 transition-colors">Color Sequence</Link></li>
                    <li><Link href="/drills/memory" className="text-emerald-450 hover:text-emerald-400 transition-colors font-bold">All Memory Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Cognitive</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/cognitive/memory/card-matching" className="hover:text-emerald-400 transition-colors">Memory Games</Link></li>
                    <li><Link href="/drills/cognitive/attention/divided-attention" className="hover:text-emerald-400 transition-colors">Attention Drills</Link></li>
                    <li><Link href="/drills/cognitive" className="text-emerald-450 hover:text-emerald-400 transition-colors font-bold">All Cognitive Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Academic</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/academic/writing-speed/typing-test" className="hover:text-emerald-400 transition-colors">Typing Speed Test</Link></li>
                    <li><Link href="/drills/academic/math-speed/mental-math" className="hover:text-emerald-400 transition-colors">Mental Math</Link></li>
                    <li><Link href="/drills/academic" className="text-emerald-450 hover:text-emerald-400 transition-colors font-bold">All Academic Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">More Sectors</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/visual" className="hover:text-emerald-400 transition-colors">Visual (14)</Link></li>
                    <li><Link href="/drills/physical" className="hover:text-emerald-400 transition-colors">Physical (11)</Link></li>
                  </ul>
                </div>
              </div>
              
              <div className="border-t border-slate-900 pt-8 text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="w-6 h-6 bg-gradient-to-br from-emerald-500/25 to-teal-500/25 border border-emerald-500/30 rounded-lg flex items-center justify-center">
                    <Crosshair className="w-3.5 h-3.5 text-emerald-400" />
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
    green: 'bg-emerald-600 text-emerald-300 border-emerald-500',
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
    green: 'from-emerald-500 to-teal-500',
    cyan: 'from-cyan-500 to-blue-500',
    indigo: 'from-indigo-500 to-purple-500',
    rose: 'from-rose-500 to-pink-500'
  };
  return (
    <Link href={href} className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-[#0b0f19]/40 transition-all hover:-translate-y-1 hover:border-emerald-500/50 block p-5">
      <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${gradients[color] || 'from-emerald-500 to-teal-500'}`}></div>
      <div className="w-10 h-10 rounded-xl bg-[#050811] border border-slate-700 flex items-center justify-center text-slate-400 group-hover:text-white mb-3 shadow-inner">
        {icon}
      </div>
      <h3 className="font-bold text-base mb-1.5 text-white group-hover:text-emerald-400 transition-colors">{title}</h3>
      <p className="text-xs text-slate-500 mb-4">{desc}</p>
      <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-wider">
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