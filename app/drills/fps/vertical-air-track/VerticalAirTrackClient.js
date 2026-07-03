'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';

import { 
  Activity, AlertCircle, ArrowRight, BarChart3, CheckCircle2, 
  CheckCircle, XCircle, ChevronRight, Clock, Crosshair, Eye, 
  GraduationCap, Info, Keyboard, Lightbulb, Maximize2, Minimize2, 
  Play, RefreshCw, Star, Target, Timer, TrendingUp, Trophy, 
  Users, Volume2, VolumeX, Zap, Share2, Brain, Sparkles, Award, Sliders,
  Flame
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

  playPop() {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine'; 
      osc.frequency.setValueAtTime(800, this.ctx.currentTime); 
      osc.frequency.exponentialRampToValueAtTime(400, this.ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.15, this.ctx.currentTime); 
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.1);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.1);
    } catch(e) {}
  }

  playThud() {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle'; 
      osc.frequency.setValueAtTime(120, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.2, this.ctx.currentTime); 
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.15);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.15);
    } catch(e) {}
  }

  playHitBeep() {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(650, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch(e) {}
  }

  playDestroy() {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(440, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(180, this.ctx.currentTime + 0.25);
      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.25);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.25);
    } catch(e) {}
  }
  
  setEnabled(status) {
    this.enabled = status;
  }
}

const audioSynth = typeof window !== 'undefined' ? new AudioSynthesizer() : null;

const DRILL_DURATION = 60; // Strict 60-second budget

// ============================================================
// RANK CALCULATION & SKILL ASSESSMENT
// ============================================================
const calculateRank = (level, accuracy, avgRt) => {
  if (level >= 5 && accuracy >= 60 && avgRt <= 400 && avgRt > 0) return { rank: 'S+', color: 'text-fuchsia-400' };
  if (level >= 4 && accuracy >= 50 && avgRt <= 500 && avgRt > 0) return { rank: 'S', color: 'text-yellow-400' };
  if (level >= 3 && accuracy >= 40) return { rank: 'A', color: 'text-green-400' };
  if (level >= 2 && accuracy >= 35) return { rank: 'B', color: 'text-blue-400' };
  if (level >= 1 && accuracy >= 30) return { rank: 'C', color: 'text-indigo-400' };
  return { rank: 'D', color: 'text-slate-400' };
};

const getSuggestion = (rank, score, accuracy, timeouts) => {
  if (rank === 'S+' || rank === 'S') {
    return "Phenomenal performance! You have superb y-axis precision and tracking consistency. Practice keeping your crosshair centered on the target to handle Level 5 double-launches even more efficiently.";
  }
  if (timeouts > 3) {
    return "You are letting too many targets fall completely off the screen. Focus on tracking the targets near the apex of their parabolic arcs, where their vertical velocity drops to zero and they become easiest to hit.";
  }
  if (accuracy < 45) {
    return "Your tracking accuracy is a bit low, meaning your mouse adjustments are likely too jittery. Try lowering your Universal Sensitivity slightly to maintain smoother control during vertical translations.";
  }
  return "Solid effort! Work on reading the parabolic arc early, predicting the path, and maintaining a steady tracking alignment to scale up your combos and unlock higher score multipliers.";
};

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function VerticalAirTrackClient() {
  // === UI & Viewport State ===
  const [gameState, setGameState] = useState('start'); // 'start', 'playing', 'gameOver'
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [pointerLocked, setPointerLocked] = useState(false);
  
  // === Settings State ===
  const [universalSens, setUniversalSens] = useState(1.0);

  // === Live HUD Variables ===
  const [uiScore, setUiScore] = useState(0);
  const [uiLevel, setUiLevel] = useState(1);
  const [uiCombo, setUiCombo] = useState(0);
  const [uiTimeLeft, setUiTimeLeft] = useState(DRILL_DURATION);
  const [bestScore, setBestScore] = useState(0);
  const [isNewBest, setIsNewBest] = useState(false);
  const [flashBg, setFlashBg] = useState(null);
  
  // === Analytics State ===
  const [analytics, setAnalytics] = useState({
    accuracy: 100,
    hits: 0, // Targets destroyed
    misses: 0, // Off-target ticks while firing
    timeouts: 0, // Targets dropped
    avgReactionTime: 0,
    bestReactionTime: 0,
    maxCombo: 0,
    finalLevel: 1,
    rankData: null
  });

  // === High-performance Mutable Refs ===
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  const pageRef = useRef(null);
  const progressBarRef = useRef(null);
  const lastTimeRef = useRef(DRILL_DURATION);

  // === Game Logic Engine Ref ===
  const engine = useRef({
    crosshair: { x: 0, y: 0, initialized: false },
    targets: [], // Array of target objects
    score: 0,
    level: 1,
    combo: 0,
    maxCombo: 0,
    timeLeft: DRILL_DURATION,
    successfulHits: 0, // Targets destroyed
    timeouts: 0, // Targets dropped
    totalTicks: 0, // Total shot ticks fired
    onTargetTicks: 0, // Total hit ticks fired
    isFiring: false, // Is player holding down left click?
    reactionTimes: [], // Array of reaction time differences in ms
    particles: [],
    screenShake: 0,
    lastShotTime: 0
  });

  const cmPer360 = (30 / universalSens).toFixed(1);

  // === Initialization & Local Storage ===
  useEffect(() => {
    try {
      const savedSens = localStorage.getItem('verticalAirTrack_sens');
      if (savedSens) setUniversalSens(parseFloat(savedSens));
      const savedBest = localStorage.getItem('verticalAirTrack_bestScore');
      if (savedBest) setBestScore(parseInt(savedBest, 10));
    } catch (e) {}
  }, []);

  useEffect(() => {
    if (gameState !== 'playing') {
      try { localStorage.setItem('verticalAirTrack_sens', universalSens.toString()); } catch (e) {}
    }
    if (audioSynth) audioSynth.setEnabled(soundEnabled);
  }, [universalSens, gameState, soundEnabled]);

  // === Core Game Management ===
  const endGame = useCallback(() => {
    setGameState('gameOver');
    if (document.pointerLockElement) document.exitPointerLock();
    
    const e = engine.current;
    
    // Calculate final tracking accuracy
    const finalAccuracy = e.totalTicks > 0 ? Math.round((e.onTargetTicks / e.totalTicks) * 100) : 100;
    
    // Calculate reaction times
    const validRts = e.reactionTimes.filter(t => t > 0);
    const avgRt = validRts.length > 0 ? Math.round(validRts.reduce((a, b) => a + b, 0) / validRts.length) : 0;
    const bestRt = validRts.length > 0 ? Math.round(Math.min(...validRts)) : 0;

    const rank = calculateRank(e.level, finalAccuracy, avgRt);

    setAnalytics({
      accuracy: finalAccuracy,
      hits: e.successfulHits,
      misses: e.totalTicks - e.onTargetTicks,
      timeouts: e.timeouts,
      avgReactionTime: avgRt,
      bestReactionTime: bestRt,
      maxCombo: e.maxCombo,
      finalLevel: e.level,
      rankData: rank
    });

    setUiScore(e.score);

    setBestScore(prev => {
      if (e.score > prev) {
        setIsNewBest(true);
        try { localStorage.setItem('verticalAirTrack_bestScore', e.score.toString()); } catch(err){}
        return e.score;
      }
      return prev;
    });
  }, []);

  const spawnTarget = useCallback((width, height, level) => {
    // Determine target size, gravity, and launch speeds based on Level
    const radius = Math.max(16, 35 - (level - 1) * 3.5); // Level 1 = 35px, Level 5 = 21px, Level 6+ = 16px
    const gravity = 720 + (level - 1) * 55; // Level 1 = 720, Level 5 = 940
    const power = 650 + (level - 1) * 40; // Launch upward power
    
    // Spawn horizontally within the middle 60% of screen width
    const x = width * (0.2 + Math.random() * 0.6);
    const y = height + radius + 15;
    
    // Upward launch and horizontal drift
    const vx = (Math.random() - 0.5) * (power * 0.45);
    const vy = -(power + Math.random() * 120);

    return {
      id: Math.random(),
      x,
      y,
      vx,
      vy,
      radius,
      maxHp: 100,
      hp: 100,
      gravity,
      color: '#ef4444',
      spawnTime: performance.now(),
      firstHitTime: null,
      hasBeenHit: false,
      nextEvasionTime: performance.now() + 900 + Math.random() * 700,
      bounceCount: 0
    };
  }, []);

  const createExplosion = (x, y, color) => {
    for (let i = 0; i < 15; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 5 + 1.5;
      engine.current.particles.push({ 
        x, 
        y, 
        vx: Math.cos(angle) * speed, 
        vy: Math.sin(angle) * speed, 
        life: 1.0, 
        color 
      });
    }
  };

  const createSparks = (x, y) => {
    for (let i = 0; i < 3; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 3 + 1;
      engine.current.particles.push({ 
        x, 
        y, 
        vx: Math.cos(angle) * speed, 
        vy: Math.sin(angle) * speed - 1, 
        life: 0.7, 
        color: '#38bdf8' 
      });
    }
  };

  const startGame = useCallback(async () => {
    if (audioSynth) audioSynth.init(); 

    setIsNewBest(false);
    setUiScore(0);
    setUiLevel(1);
    setUiCombo(0);
    setUiTimeLeft(DRILL_DURATION);
    lastTimeRef.current = DRILL_DURATION;
    
    setAnalytics({
      accuracy: 100,
      hits: 0,
      misses: 0,
      timeouts: 0,
      avgReactionTime: 0,
      bestReactionTime: 0,
      maxCombo: 0,
      finalLevel: 1,
      rankData: null
    });
    setGameState('playing');
    
    engine.current = {
      crosshair: { ...engine.current.crosshair },
      targets: [],
      score: 0,
      level: 1,
      combo: 0,
      maxCombo: 0,
      timeLeft: DRILL_DURATION,
      successfulHits: 0,
      timeouts: 0,
      totalTicks: 0,
      onTargetTicks: 0,
      isFiring: false,
      reactionTimes: [],
      particles: [],
      screenShake: 0,
      lastShotTime: 0
    };

    try {
      if (containerRef.current && !document.fullscreenElement) {
        await containerRef.current.requestFullscreen().catch(()=>{});
      }
    } catch(e) {}

    setTimeout(() => {
      if (canvasRef.current && !document.pointerLockElement) {
        canvasRef.current.requestPointerLock().catch(()=>{});
      }
      if (canvasRef.current) {
        const cvs = canvasRef.current;
        engine.current.targets = [spawnTarget(cvs.width, cvs.height, 1)];
      }
    }, 150);
  }, [spawnTarget]);

  // === Raw Mouse Input & Pointer Lock Listeners ===
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
          canvasRef.current.requestPointerLock().catch(()=>{});
        } else if (pointerLocked) {
          engine.current.isFiring = true;
        }
      }
    };

    const handleMouseUp = () => {
      if (gameState === 'playing' && pointerLocked) {
        engine.current.isFiring = false;
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
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

  // Keyboard controls for game start
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (gameState === 'start' && (e.key === ' ' || e.key === 'Enter')) {
        e.preventDefault();
        startGame();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState, startGame]);

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

    const loop = (time) => {
      const deltaTimeMs = time - lastTime;
      lastTime = time;
      const dt = Math.min(deltaTimeMs / 1000, 0.1); 
      const e = engine.current;

      if (gameState === 'playing' && pointerLocked) {
        
        // Exact Zero-Stop Timer logic
        if (e.timeLeft > 0) {
          e.timeLeft -= dt;
        }

        // Hard interrupt if time hits zero
        if (e.timeLeft <= 0) {
          e.timeLeft = 0;
          setUiTimeLeft(0);
          if (progressBarRef.current) progressBarRef.current.style.width = '0%';
          endGame();
          return; 
        }

        if (progressBarRef.current) {
          progressBarRef.current.style.width = `${(e.timeLeft / DRILL_DURATION) * 100}%`;
          progressBarRef.current.className = `h-full ${e.timeLeft <= 10 ? 'bg-red-500 animate-pulse' : 'bg-red-600'}`;
        }

        const intTime = Math.ceil(e.timeLeft);
        if (intTime !== lastTimeRef.current) {
          setUiTimeLeft(intTime);
          lastTimeRef.current = intTime;
        }

        // Level calculated directly from score: Level = floor(score / 1000) + 1
        const calculatedLevel = Math.floor(e.score / 1000) + 1;
        if (calculatedLevel !== e.level) {
          e.level = calculatedLevel;
          setUiLevel(e.level);
        }

        // Adjust target count: 1 target for levels 1-4, 2 targets for levels 5+
        const requiredTargets = e.level >= 5 ? 2 : 1;
        while (e.targets.length < requiredTargets) {
          e.targets.push(spawnTarget(cvs.width, cvs.height, e.level));
        }

        // Physics Updates
        for (let i = e.targets.length - 1; i >= 0; i--) {
          const t = e.targets[i];
          
          t.x += t.vx * dt;
          t.y += t.vy * dt;
          t.vy += t.gravity * dt; // Apply gravity force

          // Bounce off left/right side boundaries
          if (t.x - t.radius < 0) {
            t.x = t.radius;
            t.vx = -t.vx * 0.85;
            createExplosion(t.x, t.y, '#ef4444');
            if (audioSynth) audioSynth.playThud();
          } else if (t.x + t.radius > cvs.width) {
            t.x = cvs.width - t.radius;
            t.vx = -t.vx * 0.85;
            createExplosion(t.x, t.y, '#ef4444');
            if (audioSynth) audioSynth.playThud();
          }

          // Unpredictable Evasions (when target is high in the air and rising)
          if (time >= t.nextEvasionTime && t.y < cvs.height * 0.7 && t.vy < 100) {
            const rand = Math.random();
            if (rand < 0.35) {
              // Double Jump: upward burst
              t.vy = -350 - Math.random() * 120;
              createExplosion(t.x, t.y, '#38bdf8'); // cyan particles
              if (audioSynth) audioSynth.playPop();
            } else if (rand < 0.70) {
              // Air Dash: sudden horizontal push
              t.vx = (Math.random() > 0.5 ? 1 : -1) * (350 + Math.random() * 150);
              createExplosion(t.x, t.y, '#c084fc'); // purple particles
              if (audioSynth) audioSynth.playPop();
            } else if (rand < 0.90) {
              // Gravity Drop: sudden downward push
              t.vy = 400;
              createExplosion(t.x, t.y, '#f87171'); // light red particles
              if (audioSynth) audioSynth.playThud();
            }
            // Schedule next evasion
            t.nextEvasionTime = time + 1000 + Math.random() * 800;
          }

          // Target dropped past bottom boundary (Timeout)
          if (t.y > cvs.height + t.radius + 20) {
            e.timeouts++;
            e.combo = 0; // Combo resets on Timeout
            setUiCombo(0);
            e.targets.splice(i, 1);
            continue;
          }
        }

        // Shooting damage & hit registry
        if (e.isFiring) {
          e.totalTicks++;
          const ch = e.crosshair;
          
          // Find if crosshair matches any active target
          let hitTarget = null;
          for (let i = 0; i < e.targets.length; i++) {
            const t = e.targets[i];
            const dist = Math.hypot(ch.x - t.x, ch.y - t.y);
            if (dist <= t.radius) {
              hitTarget = t;
              break;
            }
          }

          if (hitTarget) {
            e.onTargetTicks++;
            
            // Record reaction time on first target interaction
            if (!hitTarget.hasBeenHit) {
              hitTarget.firstHitTime = performance.now();
              const rt = hitTarget.firstHitTime - hitTarget.spawnTime;
              e.reactionTimes.push(rt);
              hitTarget.hasBeenHit = true;
            }

            // Inflict tracking damage over time
            hitTarget.hp -= dt * 250; // Deals damage based on delta time (250 HP/s, so takes 0.4s to kill)
            createSparks(ch.x, ch.y);
            
            if (time - e.lastShotTime > 75) {
              if (audioSynth) audioSynth.playHitBeep();
              e.lastShotTime = time;
            }

            // Target Eliminated (Target Hit)
            if (hitTarget.hp <= 0) {
              e.successfulHits++;
              
              // 1. Base Score
              const baseScore = 100;
              
              // 2. Airborne Height Precision Bonus
              const yNorm = (cvs.height - hitTarget.y) / cvs.height;
              let heightBonus = 0;
              if (yNorm >= 0.75) {
                heightBonus = 75;
              } else if (yNorm >= 0.50) {
                heightBonus = 50;
              } else if (yNorm >= 0.25) {
                heightBonus = 25;
              }
              
              // 3. Combo Multiplier
              e.combo++;
              if (e.combo > e.maxCombo) e.maxCombo = e.combo;
              
              let multiplier = 1.0;
              if (e.combo >= 20) multiplier = 2.0;
              else if (e.combo >= 15) multiplier = 1.5;
              else if (e.combo >= 10) multiplier = 1.25;
              else if (e.combo >= 5) multiplier = 1.1;

              // Calculate final score gained
              const gained = Math.round((baseScore + heightBonus) * multiplier);
              e.score += gained;
              
              setUiScore(e.score);
              setUiCombo(e.combo);

              // Play destruction sounds and explosions
              if (audioSynth) audioSynth.playDestroy();
              createExplosion(hitTarget.x, hitTarget.y, '#00ff88'); // green explosion
              
              // Remove target
              e.targets = e.targets.filter(t => t.id !== hitTarget.id);
            }
          }
        }
      }

      // --- RENDERING PHASE ---
      ctx.save();
      
      // Screen Shake
      if (e.screenShake > 0) {
        const sx = (Math.random() - 0.5) * e.screenShake;
        const sy = (Math.random() - 0.5) * e.screenShake;
        ctx.translate(sx, sy);
        e.screenShake *= 0.85;
        if (e.screenShake < 0.5) e.screenShake = 0;
      }

      ctx.fillStyle = '#050508';
      ctx.fillRect(0, 0, cvs.width, cvs.height);

      // Environment Grid lines
      ctx.strokeStyle = 'rgba(239, 68, 68, 0.025)';
      ctx.lineWidth = 1; 
      for(let i = 0; i < cvs.width; i += 50) { 
        ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, cvs.height); ctx.stroke(); 
      }
      for(let j = 0; j < cvs.height; j += 50) { 
        ctx.beginPath(); ctx.moveTo(0, j); ctx.lineTo(cvs.width, j); ctx.stroke(); 
      }

      // Render Targets
      if (gameState === 'playing' || gameState === 'start') {
        const ch = e.crosshair;
        e.targets.forEach(t => {
          const isHovered = Math.hypot(ch.x - t.x, ch.y - t.y) <= t.radius;
          
          // Glow effect around targets
          ctx.shadowBlur = 15;
          ctx.shadowColor = isHovered ? '#00ff88' : '#ef4444';
          ctx.fillStyle = isHovered ? 'rgba(0, 255, 136, 0.35)' : 'rgba(239, 68, 68, 0.35)';
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 1.5;

          ctx.beginPath(); 
          ctx.arc(t.x, t.y, t.radius, 0, Math.PI * 2); 
          ctx.fill(); 
          ctx.stroke();
          
          // Outer target rings
          ctx.shadowBlur = 0;
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
          ctx.beginPath(); 
          ctx.arc(t.x, t.y, t.radius * 0.5, 0, Math.PI * 2); 
          ctx.stroke();

          // Health Bar Overlay
          const hbW = t.radius * 1.6;
          const hbH = 4;
          const hbX = t.x - hbW / 2;
          const hbY = t.y - t.radius - 12;

          ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
          ctx.fillRect(hbX, hbY, hbW, hbH);

          const hpPct = Math.max(0, t.hp / t.maxHp);
          ctx.fillStyle = isHovered ? '#00ff88' : '#ef4444';
          ctx.fillRect(hbX, hbY, hbW * hpPct, hbH);
        });
      }

      // Draw Laser Beam when firing
      if (e.isFiring && gameState === 'playing' && pointerLocked) {
        const ch = e.crosshair;
        
        let isHitting = false;
        e.targets.forEach(t => {
          if (Math.hypot(ch.x - t.x, ch.y - t.y) <= t.radius) {
            isHitting = true;
          }
        });

        // 1. Draw glowing outer beam
        ctx.beginPath();
        ctx.moveTo(cvs.width / 2, cvs.height);
        ctx.lineTo(ch.x, ch.y);
        ctx.strokeStyle = isHitting ? 'rgba(0, 255, 136, 0.4)' : 'rgba(239, 68, 68, 0.3)';
        ctx.lineWidth = 6;
        ctx.stroke();

        // 2. Draw white core beam
        ctx.beginPath();
        ctx.moveTo(cvs.width / 2, cvs.height);
        ctx.lineTo(ch.x, ch.y);
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      // Render Explosion & Spark Particles
      for (let i = e.particles.length - 1; i >= 0; i--) {
        const p = e.particles[i];
        p.x += p.vx; 
        p.y += p.vy; 
        p.life -= dt * 2.2;
        if (p.life <= 0) { 
          e.particles.splice(i, 1); 
          continue; 
        }
        ctx.globalAlpha = p.life; 
        ctx.fillStyle = p.color; 
        ctx.fillRect(p.x, p.y, 3, 3);
      }
      ctx.globalAlpha = 1.0;

      // Draw Crosshair
      const ch = e.crosshair;
      if (ch.initialized && (gameState === 'playing' || gameState === 'start')) {
        const activeColor = pointerLocked ? '#00ff88' : '#f59e0b';
        ctx.strokeStyle = activeColor;
        ctx.fillStyle = activeColor;
        
        ctx.lineWidth = 2;
        ctx.beginPath(); 
        ctx.arc(ch.x, ch.y, 16, 0, Math.PI * 2); 
        ctx.stroke();

        ctx.lineWidth = 1.5;
        const gap = 6;
        ctx.beginPath();
        ctx.moveTo(ch.x, ch.y - 16); ctx.lineTo(ch.x, ch.y - gap);
        ctx.moveTo(ch.x, ch.y + 16); ctx.lineTo(ch.x, ch.y + gap);
        ctx.moveTo(ch.x - 16, ch.y); ctx.lineTo(ch.x - gap, ch.y);
        ctx.moveTo(ch.x + 16, ch.y); ctx.lineTo(ch.x + gap, ch.y);
        ctx.stroke();
        
        ctx.beginPath(); 
        ctx.arc(ch.x, ch.y, 2, 0, Math.PI * 2); 
        ctx.fill();
      }

      ctx.restore();
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
      navigator.share({ title: 'Vertical Aim Trainer', url }).catch(() => {});
    } else {
      navigator.clipboard.writeText(url).then(() => alert('Link copied to clipboard!'));
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
                <li className="text-red-400 font-medium">Vertical Air Track</li>
              </ol>
            </nav>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-br from-red-500 to-orange-600 rounded-xl shadow-[0_0_20px_rgba(239,68,68,0.3)]">
                  <Target className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Vertical Aim Trainer – Air Tracking & Aerial Aim Practice</h1>
                  <p className="text-sm text-gray-400 mt-1 font-medium">Desktop Exclusive • Vertical Air Track Branding</p>
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
          <div className="grid grid-cols-5 gap-2 mb-2">
            <StatCard icon={<Trophy className="text-yellow-400" />} value={uiScore} label="Score" />
            <StatCard icon={<TrendingUp className="text-fuchsia-400" />} value={`Lv. ${uiLevel}`} label="Level" />
            <StatCard 
              icon={<Flame className={uiCombo >= 10 ? "text-orange-500 animate-pulse" : "text-gray-500"} />} 
              value={uiCombo} 
              label="Combo" 
              highlight={uiCombo >= 10}
            />
            <StatCard icon={<Timer className={uiTimeLeft <= 10 ? 'text-red-400 animate-pulse' : 'text-green-400'} />} value={uiTimeLeft} label="Time" unit="s" />
            <StatCard icon={<Info className="text-blue-400" />} value={`${universalSens.toFixed(2)}x`} label="Sens" />
          </div>
        )}

        {/* Engine Container */}
        <div 
          ref={containerRef} 
          className={`relative overflow-hidden transition-colors outline-none ${
            isFullscreen ? 'w-full h-full' : 'w-full aspect-video min-h-[500px] rounded-2xl border border-gray-800 shadow-2xl'
          }`}
          style={{ backgroundColor: '#05060b' }}
        >
          {/* Progress Bar */}
          {gameState === 'playing' && (
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gray-955 z-[60]">
              <div 
                ref={progressBarRef}
                className="h-full bg-red-600 transition-all duration-100 ease-linear"
                style={{ width: '100%' }} 
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
                    <p className="text-2xl font-black text-white leading-none">{uiScore}</p>
                  </div>
                  <div className="w-px h-8 bg-gray-800"></div>
                  <div className="text-center">
                    <p className="text-[10px] text-fuchsia-400 font-bold uppercase tracking-widest">Level</p>
                    <p className="text-2xl font-black text-fuchsia-400 leading-none">{uiLevel}</p>
                  </div>
                </div>
                
                {uiCombo > 1 && (
                  <div className="bg-black/40 backdrop-blur border border-orange-500/30 px-4 py-2 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-left-4">
                    <Flame className="w-5 h-5 text-orange-500" />
                    <div>
                      <p className="text-[10px] text-orange-400 font-bold uppercase tracking-widest">Combo</p>
                      <p className="text-xl font-black text-white leading-none">{uiCombo}x</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="absolute top-4 right-4 z-[60] flex gap-2">
                <button onClick={() => setSoundEnabled(v => !v)} className="p-3 bg-black/60 border border-gray-700 rounded-xl text-white hover:bg-gray-800 transition-colors">
                  {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                </button>
                <button onClick={toggleFullscreen} className="p-3 bg-black/60 border border-gray-700 rounded-xl text-white hover:bg-gray-800 transition-colors">
                  <Minimize2 className="w-5 h-5" />
                </button>
              </div>
            </>
          )}

          {/* Paused Overlay */}
          {gameState === 'playing' && !pointerLocked && (
            <div 
              className="absolute inset-0 z-40 bg-black/75 backdrop-blur-sm flex items-center justify-center cursor-pointer"
              onClick={(e) => { 
                e.stopPropagation(); 
                if (canvasRef.current) canvasRef.current.requestPointerLock().catch(()=>{}); 
              }}
            >
              <div className="text-center animate-pulse pointer-events-none">
                <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <h2 className="text-3xl font-black text-white tracking-widest uppercase mb-2">Game Paused</h2>
                <p className="text-gray-300 font-medium text-sm">Click anywhere inside the box to lock cursor and resume tracking.</p>
              </div>
            </div>
          )}

          {/* Core Canvas */}
          <canvas 
            ref={canvasRef} 
            onClick={() => { if (gameState === 'playing' && !pointerLocked) canvasRef.current?.requestPointerLock().catch(()=>{}); }}
            className={`block absolute top-0 left-0 w-full h-full touch-none z-10 ${gameState === 'playing' ? 'cursor-none' : ''}`} 
          />

          {/* START SCREEN */}
          {gameState === 'start' && (
            <div className="absolute inset-0 bg-[#05070e]/98 flex flex-col items-center justify-center p-6 z-30 select-none overflow-y-auto max-h-[100vh] backdrop-blur-sm">
              <div className="max-w-md w-full text-center">
                <h2 className="text-xl font-black text-white uppercase tracking-wider mb-1">
                  Vertical Air Track
                </h2>
                <p className="text-xs text-slate-500 uppercase tracking-widest mb-6">
                  Hardware Raw Input • Parabolic Air Tracking
                </p>

                <div className="grid grid-cols-2 gap-3 mb-6 text-left">
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Objective</span>
                    <span className="text-sm font-black text-white">Track Airborne Targets</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Reward</span>
                    <span className="text-sm font-black text-green-400">+100 PTS & Height Bonus</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Penalty</span>
                    <span className="text-sm font-black text-red-400">0 Score Penalty</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Mechanic</span>
                    <span className="text-sm font-black text-blue-400">Popcorn Trajectories</span>
                  </div>
                </div>

                <div className="bg-[#0b0f19] border border-slate-850 p-4 rounded-xl mb-6 text-left text-xs text-slate-400">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-white uppercase mb-3">
                    <Sliders className="w-3.5 h-3.5 text-red-500" /> Universal Sens
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

                <div className="flex gap-2">
                  <button
                    onClick={startGame}
                    className="flex-1 py-3 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg uppercase tracking-widest transition-all duration-200 active:scale-95"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    Begin Tactical Drill
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* GAME OVER SCREEN */}
          {gameState === 'gameOver' && analytics.rankData && (
            <div className="absolute inset-0 bg-[#05070e]/98 flex flex-col items-center justify-center p-6 z-30 select-none overflow-y-auto max-h-[100vh] backdrop-blur-sm">
              <div className="max-w-md w-full text-center">
                {isNewBest && (
                  <div className="inline-block bg-yellow-500 text-black text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-3 shadow-[0_0_15px_rgba(234,179,8,0.5)] animate-bounce">
                    ⭐ NEW PERSONAL BEST!
                  </div>
                )}
                
                <h2 className="text-xl font-black text-white uppercase tracking-wider mb-1">
                  Drill Complete
                </h2>
                <p className="text-xs text-slate-500 uppercase tracking-widest mb-6">
                  Peak difficulty reached: Level {analytics.finalLevel}
                </p>

                <div className="grid grid-cols-3 gap-2 mb-6 text-left">
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold font-mono">Final Score</span>
                    <span className="text-lg font-black text-white">{uiScore}</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold font-mono">Accuracy</span>
                    <span className="text-lg font-black text-white">{analytics.accuracy}%</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold font-mono">Avg Reaction</span>
                    <span className="text-lg font-black text-white">{analytics.avgReactionTime}ms</span>
                  </div>
                  
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold font-mono">Best Streak</span>
                    <span className="text-lg font-black text-white">{analytics.maxCombo}x</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold font-mono">Targets Hit</span>
                    <span className="text-lg font-black text-white">{analytics.hits}</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold font-mono">Assigned Rank</span>
                    <span className={`text-lg font-black ${analytics.rankData.color}`}>
                      Rank {analytics.rankData.rank}
                    </span>
                  </div>

                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold font-mono">Best Reaction</span>
                    <span className="text-lg font-black text-white">{analytics.bestReactionTime}ms</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold font-mono">Dropped</span>
                    <span className="text-lg font-black text-white">{analytics.timeouts}</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold font-mono">Missed Ticks</span>
                    <span className="text-lg font-black text-red-500">{analytics.misses}</span>
                  </div>
                </div>

                {/* Diagnostics block */}
                <div className="bg-[#0b0f19] border border-slate-855 p-4 rounded-xl mb-6 text-left text-xs text-slate-400">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-white uppercase mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-yellow-500" /> Improvement Suggestion:
                  </div>
                  <p className="leading-relaxed">
                    {getSuggestion(analytics.rankData.rank, uiScore, analytics.accuracy, analytics.timeouts)}
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
                    onClick={shareDrillLink}
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

        {/* DRILL INSTRUCTIONS & SCORING SECTION */}
        {!isFullscreen && (
          <section className="mt-10">
            <div className="rounded-2xl border border-gray-800 overflow-hidden bg-gray-900/60 shadow-2xl pointer-events-none">
              <div className="px-6 py-5 border-b border-gray-800 bg-black/40 flex items-center gap-3">
                <Info className="w-5 h-5 text-red-400" /><h2 className="font-bold text-white text-lg tracking-wide">Drill Instructions & Scoring Rules</h2>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-5">
                  <RuleItem num="1" color="green" text="Target Hit" highlight="+100 PTS Base" result="Destroy target by tracking" />
                  <RuleItem num="2" color="blue" text="Precision Height Bonus" highlight="Up to +75 PTS" result="Hit targets at peak height" />
                </div>
                <div className="space-y-5">
                  <RuleItem num="3" color="orange" text="Tracking Streak Multiplier" highlight="Up to 2.0x Combo" result="Builds up every consecutive hit" />
                  <RuleItem num="4" color="red" text="Timeouts & Misses" highlight="0 Score Penalty" result="Combo resets only on Timeout" />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ABOUT & FAQ SECTION */}
        {!isFullscreen && (
          <article className="mt-12 text-gray-300">
            <div className="rounded-2xl border border-gray-800 overflow-hidden bg-gray-900 shadow-xl">
              <div className="px-6 py-5 border-b border-gray-800 bg-black/40 flex items-center gap-3">
                <GraduationCap className="w-5 h-5 text-red-400" />
                <h2 className="font-bold text-white text-lg tracking-wide">About the Vertical Aim Trainer</h2>
              </div>
              
              <div className="p-8 space-y-8">
                <section>
                  <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                    <Crosshair className="w-5 h-5 text-red-400" /> What Is Vertical Aim Training?
                  </h3>
                  <p className="text-sm leading-relaxed mb-4">
                    <strong>Vertical Aim Training</strong> is a mechanical motor coordination drill focused entirely on the y-axis. Unlike traditional aim drills that emphasize horizontal movements (x-axis), a vertical trainer isolates the muscles in your arm, wrist, and fingers required to translate your mouse up and down cleanly. In games featuring vertical map layouts or mobility abilities, having precise vertical tracking and airborne target prediction makes the difference between winning and losing fights.
                  </p>
                </section>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 py-4 border-y border-gray-800/50">
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40 hover:bg-gray-800/50 transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center">
                        <Users className="w-4 h-4 text-white" />
                      </div>
                      <h4 className="text-sm font-bold text-white">Who Is This For?</h4>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">FPS players looking to counter jumping, flying, or grappling opponents in fast-paced mobility shooters such as <strong>Apex Legends</strong>, <strong>Overwatch 2</strong>, and <strong>The Finals</strong>.</p>
                  </div>
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40 hover:bg-gray-800/50 transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-orange-600 flex items-center justify-center">
                        <TrendingUp className="w-4 h-4 text-white" />
                      </div>
                      <h4 className="text-sm font-bold text-white">Skills Trained</h4>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Vertical aim control, air tracking, popcorn tracking, arc reading, y-axis alignment correction, and airborne movement prediction.</p>
                  </div>
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40 hover:bg-gray-800/50 transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                        <Zap className="w-4 h-4 text-white" />
                      </div>
                      <h4 className="text-sm font-bold text-white">Why It Is Harder</h4>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Human physiology naturally adapts to horizontal arm swings. Vertical translation triggers unique muscle groups, requiring focused practice to build muscle memory.</p>
                  </div>
                </div>

                <section>
                  <h3 className="text-base font-bold text-white mb-3">How To Improve Vertical Tracking</h3>
                  <p className="text-sm leading-relaxed mb-4">
                    To build optimal vertical control, avoid tensing your wrist. Maintain a relaxed grip and sweep your entire forearm for large y-axis adjustments while using your fingers for micro-corrections near the apex of the arc. The target slows down as it approaches the peak height of its parabolic trajectory before gravity pulls it back down. Targeting during this brief zero-velocity window helps secure easy eliminations and build your combo streak.
                  </p>
                </section>

                <section>
                  <h3 className="text-base font-bold text-white mb-3">How Professional Apex Players Train Air Tracking</h3>
                  <p className="text-sm leading-relaxed mb-4">
                    In Apex Legends, heroes frequently launch off Octane pads, traverse gravity cannons, or float in Horizon lifts. Top professional players practice tracking targets in smooth arcs. They use air tracking trainers to isolate gravity-affected trajectories, standardizing their target leading and smoothing out crosshair stutter.
                  </p>
                </section>
              </div>

              <div className="bg-[#0b0f19] border-t border-gray-800 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Lightbulb className="w-6 h-6 text-yellow-400" />
                  <h3 className="text-xl font-bold text-white">Frequently Asked Questions</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FAQItem q="1. What is vertical aim training?" a="Vertical aim training is a method of practicing your vertical mouse control (the y-axis) by tracking targets moving along vertical or parabolic trajectories." />
                  <FAQItem q="2. How do I improve vertical tracking?" a="You can improve vertical tracking by practicing with a vertical aim trainer regularly, focusing on tracking targets at different heights and speeds, and learning to predict parabolic movement arcs." />
                  <FAQItem q="3. Why is vertical aim harder than horizontal aim?" a="Vertical aim is harder because most competitive games feature predominantly horizontal movement, causing players to under-develop their vertical muscle memory and y-axis arm/wrist translation." />
                  <FAQItem q="4. How do professional Apex players train air tracking?" a="Professional Apex Legends players use dedicated air tracking drills to simulate enemies flying through the air via gravity cannons, launch pads, or abilities like Horizon's Gravity Lift or Valkyrie's jetpack." />
                  <FAQItem q="5. How do Overwatch players improve aerial tracking?" a="Overwatch players practice tracking high-mobility heroes like Pharah, Echo, Mercy, or Winston during leaps. Using vertical aim trainers helps them smooth out their y-axis tracking adjustments." />
                  <FAQItem q="6. What is popcorn tracking?" a="Popcorn tracking is a specific FPS training scenario where targets are launched upward from the bottom of the screen in high, bouncing parabolic arcs, resembling popcorn kernels popping." />
                  <FAQItem q="7. Does this drill improve vertical aim?" a="Yes, this vertical air track trainer specifically isolates and trains y-axis micro-adjustments, arc prediction, and vertical mouse speed control." />
                  <FAQItem q="8. Does this help Apex Legends?" a="Yes, training vertical tracking helps you track targets using zip lines, jump pads, Horizon lifts, Octane pads, and airborne movement techniques." />
                  <FAQItem q="9. Does this help Overwatch 2?" a="Yes, it is highly beneficial for tracking jumping or airborne heroes such as Genji, Winston, Pharah, Echo, Doomfist, and Mercy." />
                  <FAQItem q="10. Does this help Halo Infinite?" a="Yes, it helps you track players launching off gravity lifts, using grapples, or jumping during firefights." />
                  <FAQItem q="11. Does this help Titanfall 2?" a="Yes, Titanfall 2 features extreme verticality, wall-running, and double jumping, which require excellent vertical tracking skills to counter." />
                  <FAQItem q="12. How often should I train vertical aim?" a="We recommend training vertical aim for 10-15 minutes per day as part of your warm-up routine to build consistent muscle memory on the y-axis." />
                  <FAQItem q="13. Is this drill free?" a="Yes, this Vertical Aim Trainer is 100% free, open-source, and runs directly in your web browser with zero ads or downloads." />
                  <FAQItem q="14. What skills does this drill improve?" a="This drill trains vertical tracking, air tracking, parabolic arc prediction, y-axis mouse control, visual processing speed, and tracking consistency." />
                  <FAQItem q="15. Can vertical aim training improve tracking consistency?" a="Yes, isolating vertical aim training smooths out jittery vertical movements, making your overall mouse tracking more consistent across both axes." />
                </div>
              </div>
            </div>
          </article>
        )}

        {/* RELATED DRILLS SECTION */}
        {!isFullscreen && (
          <section className="mt-14" aria-label="Explore related aim and response drills">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-5 rounded-full bg-red-500"></div>
              <h2 className="text-xs font-bold text-white uppercase tracking-widest font-mono">
                Explore FPS Drills
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <RelatedCard href="/drills/fps/flick-shot-training" title="Pro Flick Trainer" desc="Snap to targets in time-attack mode." color="blue" icon={<Crosshair className="w-4 h-4" />} />
              <RelatedCard href="/drills/fps/reactive-sphere-tracking" title="Reactive Sphere" desc="Micro-tracking direction shifts." color="green" icon={<Target className="w-4 h-4" />} />
              <RelatedCard href="/drills/fps/anti-strafe-jitter-duel" title="Anti-Strafe Jitter" desc="Flick & track reactive ADAD strafe targets." color="orange" icon={<Target className="w-4 h-4" />} />
              <RelatedCard href="/drills/fps/recoil-control" title="Recoil Control" desc="Calibrate pulling pattern compensation." color="red" icon={<Activity className="w-4 h-4" />} />
            </div>
          </section>
        )}

        {/* FOOTER SECTION */}
        {!isFullscreen && (
          <footer className="mt-12 bg-[#05060b] border border-gray-800 text-gray-500 rounded-xl py-10 px-6 font-mono text-[10px]" role="contentinfo">
            <div className="max-w-7xl mx-auto font-mono text-left">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 mb-8">
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider text-xs">Motor & FPS</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/motor/hand-eye-coordination/aim-trainer" className="hover:text-red-400 transition-colors">Aim Trainer Elite</Link></li>
                    <li><Link href="/drills/fps/flick-shot-training" className="hover:text-red-400 transition-colors">Flick Shot Trainer</Link></li>
                    <li><Link href="/drills/fps" className="text-red-400 hover:text-red-300 transition-colors font-bold">All FPS Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider text-xs">Memory</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/memory/working-memory/n-back" className="hover:text-red-400 transition-colors">3-Back Training</Link></li>
                    <li><Link href="/drills/memory/short-term-memory/color-sequence" className="hover:text-red-400 transition-colors">Color Sequence</Link></li>
                    <li><Link href="/drills/memory" className="text-red-400 hover:text-red-300 transition-colors font-bold">All Memory Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider text-xs">Cognitive</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/cognitive/memory/card-matching" className="hover:text-red-400 transition-colors">Memory Games</Link></li>
                    <li><Link href="/drills/cognitive/attention/divided-attention" className="hover:text-red-400 transition-colors">Attention Drills</Link></li>
                    <li><Link href="/drills/cognitive" className="text-red-400 hover:text-red-300 transition-colors font-bold">All Cognitive Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider text-xs">Academic</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/academic/writing-speed/typing-test" className="hover:text-red-400 transition-colors">Typing Speed Test</Link></li>
                    <li><Link href="/drills/academic/math-speed/mental-math" className="hover:text-red-400 transition-colors">Mental Math</Link></li>
                    <li><Link href="/drills/academic" className="text-red-400 hover:text-red-300 transition-colors font-bold">All Academic Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider text-xs">More Sectors</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/visual" className="hover:text-red-400 transition-colors">Visual</Link></li>
                    <li><Link href="/drills/physical" className="hover:text-red-400 transition-colors">Physical</Link></li>
                  </ul>
                </div>
              </div>
              
              <div className="border-t border-slate-900 pt-8 text-center font-mono">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="w-6 h-6 bg-gradient-to-br from-red-500/25 to-orange-500/25 border border-red-500/30 rounded-lg flex items-center justify-center animate-pulse">
                    <Crosshair className="w-3.5 h-3.5 text-red-400" />
                  </div>
                  <span className="text-white font-black tracking-widest text-xs uppercase">SkillDrills</span>
                </div>
                <p className="text-[9px] mb-2">&copy; {new Date().getFullYear()} SkillDrills. All rights reserved.</p>
                <p className="text-[9px] max-w-2xl mx-auto leading-relaxed mb-6">
                  Open-source telemetry training platform using hardware pointer lock. Free forever. No downloads required.
                </p>
                <div className="flex items-center justify-center gap-3 flex-wrap">
                  <a href="https://youtube.com/@skilldrills.online" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors p-2.5 bg-gray-900 rounded-full hover:bg-gray-800 shadow-md" title="YouTube">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93 .502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
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

function StatCard({ icon, value, label, unit = '', highlight = false }) {
  return (
    <div className={`group rounded-xl border ${
      highlight ? 'border-red-500/50 bg-red-500/5 shadow-[inset_0_0_12px_rgba(239,68,68,0.05)]' : 'border-gray-800 bg-gray-900/50'
    } p-2.5 text-center flex flex-col justify-center h-full transition-all duration-300 hover:scale-[1.03] hover:border-gray-700`}>
      <div className="mb-1 flex justify-center transition-transform duration-300 group-hover:scale-110">
        {icon}
      </div>
      <p className="text-xs sm:text-base font-black tracking-tight truncate text-white">
        {value} <span className="text-[10px] font-semibold text-gray-500">{unit}</span>
      </p>
      <p className="text-[9px] font-mono font-bold uppercase tracking-wider text-gray-500 truncate">{label}</p>
    </div>
  );
}

function RuleItem({ num, color, text, highlight = '', result }) {
  const colorMap = { 
    blue: 'bg-blue-600 text-blue-300 border-blue-500', 
    red: 'bg-red-600 text-red-300 border-red-500', 
    orange: 'bg-orange-600 text-orange-300 border-orange-500',
    green: 'bg-green-600 text-green-300 border-green-500' 
  };
  const colors = colorMap[color] || 'bg-gray-600 text-gray-300 border-gray-500';
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
    blue: 'from-blue-500 to-indigo-500',
    orange: 'from-orange-500 to-amber-500',
    red: 'from-red-500 to-rose-500',
    green: 'from-green-500 to-emerald-500',
  };
  return (
    <Link href={href} className="group relative overflow-hidden rounded-2xl border border-gray-800 bg-[#0b0f19]/40 transition-all hover:-translate-y-1 hover:border-red-500/50 block p-5">
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${gradients[color]}`}></div>
      <div className="w-10 h-10 rounded-xl bg-[#050811] border border-gray-700 flex items-center justify-center text-gray-400 group-hover:text-white mb-3 shadow-inner transition-colors">
        {icon}
      </div>
      <h3 className="font-bold text-base mb-1.5 text-white group-hover:text-red-400 transition-colors">{title}</h3>
      <p className="text-xs text-gray-500 mb-4">{desc}</p>
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