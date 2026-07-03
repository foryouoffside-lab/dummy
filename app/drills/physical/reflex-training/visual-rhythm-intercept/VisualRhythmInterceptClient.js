'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  Activity, AlertCircle, ArrowRight, BarChart3, ChevronRight, 
  Clock, Crosshair, Eye, GraduationCap, Info, Lightbulb, 
  Maximize2, Minimize2, Play, RefreshCw, Star, Target, 
  Timer, TrendingUp, Trophy, Volume2, VolumeX, Zap, 
  Share2, Shield, XCircle, Grid, Sparkles, CheckCircle2,
  Sun, Moon, Users, Music, Flame 
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
      
      if (type === 'perfect') { 
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, now);
        osc.frequency.exponentialRampToValueAtTime(1600, now + 0.15);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
        osc.start(now); osc.stop(now + 0.15);
      } else if (type === 'good') { 
        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, now);
        osc.frequency.exponentialRampToValueAtTime(1000, now + 0.12);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
        osc.start(now); osc.stop(now + 0.12);
      } else if (type === 'miss') { 
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(130, now);
        osc.frequency.exponentialRampToValueAtTime(50, now + 0.3);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
        osc.start(now); osc.stop(now + 0.3);
      } else if (type === 'levelup') { 
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(523.25, now);
        osc.frequency.setValueAtTime(659.25, now + 0.08);
        osc.frequency.setValueAtTime(783.99, now + 0.16);
        osc.frequency.setValueAtTime(1046.50, now + 0.24);
        gain.gain.setValueAtTime(0.15, now);
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
const DRILL_DURATION = 60; 

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function VisualRhythmInterceptClient() {
  const [gameState, setGameState] = useState('start'); 
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [dayMode, setDayMode] = useState(false);
  
  // HUD State
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(DRILL_DURATION);
  const [isNewBest, setIsNewBest] = useState(false);
  const [streak, setStreak] = useState(0);
  const [level, setLevel] = useState(1);
  const [comboMultiplier, setComboMultiplier] = useState(1.0);
  const [accuracy, setAccuracy] = useState(100);
  
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  const pageRef = useRef(null);
  const gameStateRef = useRef('start');
  const loopRef = useRef(null);
  
  // Analytics State
  const [analytics, setAnalytics] = useState({
    accuracy: 100,
    perfectHits: 0,
    goodHits: 0,
    misses: 0,
    maxStreak: 0,
    peakLevel: 1,
    bestCombo: 1.0,
    timeEarned: 0,
    timeLost: 0,
    rankData: { rank: 'Bronze', color: 'text-slate-500' },
    coachAdvice: ''
  });

  // Real-time engine variables
  const engine = useRef({
    waves: [], 
    nextWaveId: 0,
    spawnTimer: 0,
    spawnInterval: 1.6, 
    
    timeLeft: DRILL_DURATION,
    score: 0,
    level: 1,
    streak: 0,
    maxStreak: 0,
    combo: 1.0,
    bestCombo: 1.0,
    
    perfectCount: 0,
    goodCount: 0,
    missCount: 0,
    timeEarned: 0,
    timeLost: 0,
    
    particles: [],
    screenShake: 0,
    flashRed: 0,
    dayMode: false,
    totalFrames: 0, // FIX: must be initialized so HUD sync works
    
    receptors: [0, 0, 0, 0] // Top, Right, Bottom, Left (alpha)
  });

  const lastTimeRef = useRef(0);
  const isActiveRef = useRef(false);

  // === Initialization & Local Storage ===
  useEffect(() => {
    try {
      const savedBest = localStorage.getItem('rhythmIntercept_bestScore_opt');
      if (savedBest) setBestScore(parseInt(savedBest, 10));
    } catch (e) {}
  }, []);

  useEffect(() => {
    if (audioSynth) {
      audioSynth.setEnabled(soundEnabled);
    }
  }, [soundEnabled]);

  useEffect(() => {
    engine.current.dayMode = dayMode;
  }, [dayMode]);

  // FIX: Keep gameStateRef in sync so keydown/loop can read current state without stale closure
  useEffect(() => {
    gameStateRef.current = gameState;
  }, [gameState]);

  // FIX: Resize canvas to match its CSS pixel dimensions whenever the container changes size
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

  const endGame = useCallback(() => {
    setGameState('gameOver');
    isActiveRef.current = false;
    
    const e = engine.current;
    
    const totalHits = e.perfectCount + e.goodCount + e.missCount;
    const finalAccuracy = totalHits > 0 ? Math.round(((e.perfectCount + e.goodCount) / totalHits) * 100) : 0;
    
    let rank = 'Rookie'; let rankColor = 'text-gray-400';
    if (e.score >= 10000 && finalAccuracy >= 95) { rank = 'Tempo Master'; rankColor = 'text-fuchsia-400'; }
    else if (e.score >= 5000 && finalAccuracy >= 90) { rank = 'Diamond'; rankColor = 'text-cyan-400'; }
    else if (e.score >= 2500 && finalAccuracy >= 82) { rank = 'Platinum'; rankColor = 'text-indigo-400'; }
    else if (e.score >= 1000 && finalAccuracy >= 70) { rank = 'Gold'; rankColor = 'text-yellow-400'; }
    else if (e.score >= 300) { rank = 'Silver'; rankColor = 'text-gray-300'; }

    let advice = 'Phenomenal rhythmic accuracy! You are executing perfect orbital interceptions even at maximum tempo scales. Your temporal calibration is elite.';
    if (e.missCount > 8) {
      advice = 'Your timing is out of sync or you are spamming inputs. Spamming keys registers instant misses and drastically drains your master clock. Focus purely on matching keypresses exactly as the circles overlap the guide.';
    } else if (e.level < 4) {
      advice = 'Good tempo control, but you are not scaling the engine fast enough. You must string together perfect alignments to build your Combo Multiplier and reach the higher point thresholds.';
    } else if (e.goodCount > e.perfectCount) {
      advice = 'You are surviving, but you are settling for "Good" (blue) hit thresholds. Focus on matching the beats exactly at the 0.8 mark (outer ring overlay) to trigger "Perfect" (green) hits for double points.';
    }

    setAccuracy(finalAccuracy);

    setAnalytics({
      accuracy: finalAccuracy,
      perfectHits: e.perfectCount,
      goodHits: e.goodCount,
      misses: e.missCount,
      maxStreak: e.maxStreak,
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
        try { localStorage.setItem('rhythmIntercept_bestScore_opt', e.score.toString()); } catch(err){}
        return e.score;
      }
      return prev;
    });
  }, []);

  const updateLevelAndCombo = () => {
    const e = engine.current;
    
    // Combo Multiplier
    if (e.streak >= 50) e.combo = 3.0;
    else if (e.streak >= 25) e.combo = 2.0;
    else if (e.streak >= 10) e.combo = 1.5;
    else if (e.streak >= 5) e.combo = 1.2;
    else e.combo = 1.0;
    
    if (e.combo > e.bestCombo) e.bestCombo = e.combo;
    
    // Adaptive Level Scaling
    const newLvl = Math.min(10, Math.floor(e.score / 500) + 1);
    if (newLvl > e.level) {
      e.level = newLvl;
      // Spawn interval shrinks dramatically at high levels
      e.spawnInterval = Math.max(0.3, 1.6 - (newLvl * 0.12));
      if (audioSynth) audioSynth.playSound('levelup');
    }
  };

  // FIX: Use gameStateRef instead of stale closure over gameState
  const triggerIntercept = useCallback((quadrant) => {
    if (gameStateRef.current !== 'playing') return;
    const eng = engine.current;
    
    eng.receptors[quadrant] = 1.0;
    
    const targetWaves = eng.waves
      .filter(w => w.quadrant === quadrant && !w.hit)
      .sort((a, b) => b.progress - a.progress);
      
    if (targetWaves.length === 0) {
      registerMiss();
      return;
    }
    
    const nearestWave = targetWaves[0];
    const distance = Math.abs(nearestWave.progress - 0.8); // 0.8 is target intercept line
    
    if (distance <= 0.05) { 
      nearestWave.hit = true;
      registerPerfect(nearestWave);
    } else if (distance <= 0.12) { 
      nearestWave.hit = true;
      registerGood(nearestWave);
    } else {
      registerMiss();
    }
  }, []);

  const registerPerfect = (wave) => {
    const e = engine.current;
    e.perfectCount++;
    e.streak++;
    if (e.streak > e.maxStreak) e.maxStreak = e.streak;
    
    updateLevelAndCombo();
    
    const pts = Math.floor(30 * e.level * e.combo);
    e.score += pts;
    
    const tReward = Math.max(0.5, 1.5 - (e.level * 0.05));
    e.timeLeft = Math.min(60.0, e.timeLeft + tReward);
    e.timeEarned += tReward;
    
    if (audioSynth) audioSynth.playSound('perfect');
    spawnExplosion(wave.quadrant, '#10b981', 15); 
  };

  const registerGood = (wave) => {
    const e = engine.current;
    e.goodCount++;
    e.streak++;
    if (e.streak > e.maxStreak) e.maxStreak = e.streak;
    
    updateLevelAndCombo();
    
    const pts = Math.floor(15 * e.level * e.combo);
    e.score += pts;
    
    const tReward = Math.max(0.2, 0.8 - (e.level * 0.05));
    e.timeLeft = Math.min(60.0, e.timeLeft + tReward);
    e.timeEarned += tReward;
    
    if (audioSynth) audioSynth.playSound('good');
    spawnExplosion(wave.quadrant, '#0ea5e9', 8); 
  };

  const registerMiss = () => {
    const e = engine.current;
    e.missCount++;
    e.streak = 0;
    e.combo = 1.0;
    
    // Scaling Time Penalty
    const penalty = Math.min(5.0, 2.0 + (e.level * 0.2));
    e.timeLeft = Math.max(0, e.timeLeft - penalty);
    e.timeLost += penalty;
    
    e.screenShake = 15;
    e.flashRed = 0.4;
    
    if (audioSynth) audioSynth.playSound('miss');
  };

  const spawnExplosion = (quadrant, color, count) => {
    const eng = engine.current;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const W = canvas.width;
    const H = canvas.height;
    const cx = W / 2;
    const cy = H / 2;
    
    const radius = Math.min(W, H) * 0.35;
    const angles = [-Math.PI / 2, 0, Math.PI / 2, Math.PI];
    const angle = angles[quadrant];
    
    const rx = cx + Math.cos(angle) * radius;
    const ry = cy + Math.sin(angle) * radius;
    
    for (let i = 0; i < count; i++) {
      const a = Math.random() * Math.PI * 2;
      const s = Math.random() * 150 + 50;
      eng.particles.push({
        x: rx,
        y: ry,
        vx: Math.cos(a) * s,
        vy: Math.sin(a) * s,
        radius: Math.random() * 4 + 2,
        color,
        life: 0.35
      });
    }
  };

  // Keyboard controls — FIX: use gameStateRef so handler is stable and never stale
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (gameStateRef.current !== 'playing') return;
      const key = e.key.toLowerCase();
      
      if (key === 'w' || e.key === 'ArrowUp') { e.preventDefault(); triggerIntercept(0); } 
      else if (key === 'd' || e.key === 'ArrowRight') { e.preventDefault(); triggerIntercept(1); } 
      else if (key === 's' || e.key === 'ArrowDown') { e.preventDefault(); triggerIntercept(2); } 
      else if (key === 'a' || e.key === 'ArrowLeft') { e.preventDefault(); triggerIntercept(3); }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [triggerIntercept]);

  // Pointer click on quadrant — FIX: use gameStateRef
  const handlePointerDown = useCallback((e) => {
    if (gameStateRef.current !== 'playing' || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left - canvas.width / 2;
    const y = e.clientY - rect.top - canvas.height / 2;
    
    let angle = Math.atan2(y, x); 
    
    let quadrant = 1; // Default right
    if (angle >= -2.35 && angle < -0.78) quadrant = 0; // Top
    else if (angle >= 0.78 && angle < 2.35) quadrant = 2; // Bottom
    else if (angle >= 2.35 || angle < -2.35) quadrant = 3; // Left
    
    triggerIntercept(quadrant);
  }, [triggerIntercept]);

  // Main game loop — FIX: defined as a stable ref so RAF callbacks are always consistent
  loopRef.current = (timestamp) => {
    if (!isActiveRef.current) return;
    
    if (!lastTimeRef.current) lastTimeRef.current = timestamp;
    const dt = Math.min((timestamp - lastTimeRef.current) / 1000, 0.033);
    lastTimeRef.current = timestamp;
    
    const e = engine.current;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    const W = canvas.width;
    const H = canvas.height;
    const cx = W / 2;
    const cy = H / 2;
    const maxRadius = Math.min(W, H) * 0.44; 
    
    e.totalFrames++;

    e.timeLeft -= dt;
    if (e.timeLeft <= 0) {
      e.timeLeft = 0;
      endGame();
      return;
    }
    
    // Wave Spawner
    e.spawnTimer += dt;
    if (e.spawnTimer >= e.spawnInterval) {
      e.spawnTimer = 0;
      const quad = Math.floor(Math.random() * 4);
      // Speed scales up with level
      const speed = 0.35 + e.level * 0.05; 
      e.waves.push({
        id: e.nextWaveId++,
        quadrant: quad,
        progress: 0.0,
        speed,
        hit: false
      });
    }
    
    // Update Receptors
    for (let i = 0; i < 4; i++) {
      if (e.receptors[i] > 0) e.receptors[i] -= dt * 6.0;
    }
    
    if (e.screenShake > 0) e.screenShake -= dt * 45;
    if (e.flashRed > 0) e.flashRed -= dt * 2.0;
    
    // Update Waves
    for (let i = e.waves.length - 1; i >= 0; i--) {
      const w = e.waves[i];
      w.progress += w.speed * dt;
      
      if (w.progress >= 0.94) {
        if (!w.hit) registerMiss();
        e.waves.splice(i, 1);
      }
    }

    // Sync UI
    if (e.totalFrames % 4 === 0) {
      setTimeLeft(e.timeLeft);
      setScore(e.score);
      setStreak(e.streak);
      setLevel(e.level);
      setComboMultiplier(e.combo);
      const totalHits = e.perfectCount + e.goodCount + e.missCount;
      setAccuracy(totalHits > 0 ? Math.round(((e.perfectCount + e.goodCount) / totalHits) * 100) : 100);
    }
    
    // --- RENDERING ---
    ctx.save();
    if (e.screenShake > 0) {
      ctx.translate((Math.random() - 0.5) * e.screenShake, (Math.random() - 0.5) * e.screenShake);
    }
    
    ctx.fillStyle = e.dayMode ? '#ffffff' : '#050508';
    ctx.fillRect(0, 0, W, H);
    
    // Grid Lines (Cyan tint)
    ctx.strokeStyle = e.dayMode ? 'rgba(6, 182, 212, 0.05)' : 'rgba(6, 182, 212, 0.03)';
    ctx.lineWidth = 1; 
    for(let i = 0; i < W; i+= 50) { 
      ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, H); ctx.stroke(); 
      ctx.moveTo(0, i); ctx.lineTo(W, i); ctx.stroke();
    }

    // Outer boundary
    ctx.strokeStyle = e.dayMode ? 'rgba(15, 23, 42, 0.15)' : 'rgba(255, 255, 255, 0.08)';
    ctx.beginPath();
    ctx.arc(cx, cy, maxRadius, 0, Math.PI * 2);
    ctx.stroke();

    // Intercept Target Line (0.8 progress)
    ctx.strokeStyle = e.dayMode ? 'rgba(15, 23, 42, 0.3)' : 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(cx, cy, maxRadius * 0.8, 0, Math.PI * 2);
    ctx.stroke();
    
    // Center destination core
    ctx.fillStyle = e.dayMode ? 'rgba(6, 182, 212, 0.2)' : 'rgba(6, 182, 212, 0.15)';
    ctx.beginPath();
    ctx.arc(cx, cy, 25, 0, Math.PI * 2);
    ctx.fill();
    
    // Quadrant guide lines
    ctx.strokeStyle = e.dayMode ? 'rgba(15, 23, 42, 0.05)' : 'rgba(255, 255, 255, 0.03)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(cx, cy - maxRadius); ctx.lineTo(cx, cy + maxRadius); 
    ctx.moveTo(cx - maxRadius, cy); ctx.lineTo(cx + maxRadius, cy); 
    ctx.stroke();
    
    // Draw Receptors
    const angles = [-Math.PI / 2, 0, Math.PI / 2, Math.PI];
    const receptorRadius = maxRadius * 0.8;
    const labels = ['W', 'D', 'S', 'A'];
    
    for (let i = 0; i < 4; i++) {
      const angle = angles[i];
      const rx = cx + Math.cos(angle) * receptorRadius;
      const ry = cy + Math.sin(angle) * receptorRadius;
      
      if (e.receptors[i] > 0) {
        ctx.fillStyle = `rgba(6, 182, 212, ${e.receptors[i] * 0.4})`;
        ctx.beginPath();
        ctx.arc(rx, ry, 26, 0, Math.PI * 2);
        ctx.fill();
      }
      
      ctx.strokeStyle = e.receptors[i] > 0 ? '#06b6d4' : (e.dayMode ? '#94a3b8' : '#334155');
      ctx.lineWidth = e.receptors[i] > 0 ? 3.5 : 2;
      ctx.beginPath();
      ctx.arc(rx, ry, 18, 0, Math.PI * 2);
      ctx.stroke();
      
      ctx.fillStyle = e.dayMode ? '#475569' : '#64748b';
      ctx.font = 'bold 12px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(labels[i], rx, ry);
    }
    
    // Draw Waves
    e.waves.forEach(w => {
      if (w.hit) return;
      
      const angle = angles[w.quadrant];
      const currentRadius = maxRadius * (1.0 - w.progress * 0.8);
      const wx = cx + Math.cos(angle) * currentRadius;
      const wy = cy + Math.sin(angle) * currentRadius;
      
      ctx.shadowColor = '#06b6d4';
      ctx.shadowBlur = e.dayMode ? 0 : 15;
      
      ctx.fillStyle = '#06b6d4';
      ctx.beginPath();
      ctx.arc(wx, wy, 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
      
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.5)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(wx, wy, 16, 0, Math.PI * 2);
      ctx.stroke();
    });
    
    // Render Particles
    for (let i = e.particles.length - 1; i >= 0; i--) {
      const p = e.particles[i];
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.life -= dt;
      
      if (p.life <= 0) {
        e.particles.splice(i, 1);
        continue;
      }
      
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();
    }
    
    // Flash Overlay
    if (e.flashRed > 0) {
      ctx.fillStyle = `rgba(239, 68, 68, ${e.flashRed})`;
      ctx.fillRect(0, 0, W, H);
    }
    
    ctx.restore();
    animationRef.current = requestAnimationFrame((ts) => loopRef.current(ts));
  };

  const startDrill = () => {
    if (audioSynth) audioSynth.init();

    // Auto-enter fullscreen when Start is clicked
    const el = containerRef.current;
    if (el && !document.fullscreenElement) {
      el.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    }
    
    const e = engine.current;
    e.timeLeft = DRILL_DURATION;
    e.score = 0;
    e.level = 1;
    e.streak = 0;
    e.maxStreak = 0;
    e.combo = 1.0;
    e.bestCombo = 1.0;
    
    e.perfectCount = 0;
    e.goodCount = 0;
    e.missCount = 0;
    e.timeEarned = 0;
    e.timeLost = 0;
    
    e.particles = [];
    e.waves = [];
    e.spawnTimer = 0;
    e.spawnInterval = 1.6;
    e.screenShake = 0;
    e.flashRed = 0;        // FIX: clear any leftover red flash from previous run
    e.receptors = [0, 0, 0, 0]; // FIX: clear receptor glow state
    e.totalFrames = 0;     // FIX: reset frame counter so HUD syncs from frame 1

    // FIX: ensure canvas pixel dimensions match its CSS size before the first frame
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
    
    gameStateRef.current = 'playing'; // FIX: sync ref immediately so loop/keys see 'playing' at once
    setGameState('playing');
    isActiveRef.current = true;
    lastTimeRef.current = 0;
    
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    animationRef.current = requestAnimationFrame((ts) => loopRef.current(ts));
  };

  const shareScore = useCallback(async () => {
    const text = `🎵 I reached Level ${level} and scored ${score} PTS on Visual Rhythm Intercept! Max Combo: ${analytics.bestCombo}x. Test your tempo coordination at skilldrills.online!`;
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({ title: 'My Rhythm Score', text, url: 'https://skilldrills.online/drills/physical/reflex-training/visual-rhythm-intercept' });
      } catch (e) {}
    } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      alert('Score card copied to clipboard!');
    }
  }, [score, level, analytics]);

  return (
    <div className={`min-h-screen font-sans select-none transition-colors duration-250 ${dayMode ? 'bg-[#f8fafc] text-slate-900' : 'bg-[#050508] text-white'}`}>
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
                <li className="text-cyan-400 font-medium">Visual Rhythm Intercept</li>
              </ol>
            </nav>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl shadow-lg ${dayMode ? 'bg-gradient-to-br from-cyan-400 to-blue-500 text-white' : 'bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-[0_0_20px_rgba(6,182,212,0.3)]'}`}>
                  <Music className="w-7 h-7" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Visual Rhythm Intercept</h1>
                  <p className={`text-sm mt-1 font-medium ${dayMode ? 'text-slate-500' : 'text-gray-400'}`}>Tempo Coordination • Rhythmic Reflex</p>
                </div>
              </div>
              
              <div className="flex gap-2">
                <button onClick={() => setSoundEnabled(v => !v)} className={`p-2.5 rounded-lg border transition-all ${dayMode ? 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50' : 'border-gray-700 bg-gray-900 text-gray-400 hover:text-white'}`}>
                  {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                </button>
                <button onClick={() => setDayMode(v => !v)} className={`p-2.5 rounded-lg border transition-all ${dayMode ? 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50' : 'border-gray-700 bg-gray-900 text-gray-400 hover:text-white'}`}>
                  {dayMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                </button>
                <button onClick={toggleFullscreen} className={`p-2.5 rounded-lg border transition-all ${dayMode ? 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50' : 'border-gray-700 bg-gray-900 text-gray-400 hover:text-white'}`}>
                  <Maximize2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Live HUD Stats */}
        {!isFullscreen && (
          <div className="grid grid-cols-4 lg:grid-cols-7 gap-2 mb-2">
            <StatCard icon={<Target className="text-cyan-400" />} value={score} label="Score" dayMode={dayMode} />
            <StatCard icon={<Timer className={timeLeft <= 10 ? 'text-red-400 animate-pulse' : 'text-emerald-400'} />} value={Math.max(0, timeLeft).toFixed(1)} label="Time" unit="s" dayMode={dayMode} />
            <StatCard icon={<TrendingUp className="text-indigo-400" />} value={`Lv. ${level}`} label="Tempo Level" dayMode={dayMode} />
            <StatCard icon={<Flame className="text-orange-400" />} value={`${comboMultiplier.toFixed(1)}x`} label="Combo" dayMode={dayMode} />
            <StatCard icon={<BarChart3 className="text-purple-400" />} value={`${accuracy}%`} label="Accuracy" dayMode={dayMode} />
            <StatCard icon={<Zap className="text-yellow-400" />} value={streak} label="Streak" dayMode={dayMode} />
            <StatCard icon={<Trophy className="text-yellow-500" />} value={bestScore} label="Best Score" dayMode={dayMode} />
          </div>
        )}

        {/* Engine Container */}
        <div 
          ref={containerRef} 
          className={`relative overflow-hidden transition-colors outline-none ${
            isFullscreen ? 'w-full h-full' : 'w-full aspect-video min-h-[500px] rounded-2xl shadow-2xl border'
          } ${dayMode ? 'bg-[#ffffff] border-slate-200' : 'bg-[#05060b] border-gray-800'}`}
        >
          {/* Progress Bar */}
          {gameState === 'playing' && (
            <div className={`absolute top-0 left-0 right-0 h-1.5 z-[60] ${dayMode ? 'bg-slate-100' : 'bg-gray-900'}`}>
              <div 
                className={`h-full transition-all duration-100 ease-linear ${timeLeft <= 10 ? 'bg-red-500 animate-pulse' : 'bg-cyan-500'}`}
                style={{ width: `${Math.min(100, (timeLeft / DRILL_DURATION) * 100)}%` }} 
              />
            </div>
          )}

          {/* Fullscreen Overlay Controls */}
          {isFullscreen && gameState === 'playing' && (
            <>
              <div className="absolute top-6 left-6 z-[60] flex flex-col gap-2 pointer-events-none">
                <div className={`backdrop-blur border px-4 py-2 rounded-xl flex items-center gap-4 ${dayMode ? 'bg-white/80 border-slate-200' : 'bg-black/40 border-gray-800'}`}>
                  <div className="text-center">
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Score</p>
                    <p className={`text-2xl font-black leading-none ${dayMode ? 'text-slate-800' : 'text-white'}`}>{score}</p>
                  </div>
                  <div className={`w-px h-8 ${dayMode ? 'bg-slate-300' : 'bg-gray-800'}`}></div>
                  <div className="text-center">
                    <p className="text-[10px] text-cyan-500 font-bold uppercase tracking-widest">Level</p>
                    <p className="text-2xl font-black text-cyan-500 leading-none">{level}</p>
                  </div>
                </div>
              </div>

              <div className="absolute top-4 right-4 z-[60] flex gap-2">
                <button onClick={() => setSoundEnabled(v => !v)} className={`p-3 rounded-xl transition-colors ${dayMode ? 'bg-white/80 border border-slate-200 text-slate-700 hover:bg-slate-50' : 'bg-black/60 border border-gray-600 text-white hover:bg-gray-800'}`}>
                  {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                </button>
                <button onClick={toggleFullscreen} className={`p-3 rounded-xl transition-colors ${dayMode ? 'bg-white/80 border border-slate-200 text-slate-700 hover:bg-slate-50' : 'bg-black/60 border border-gray-600 text-white hover:bg-gray-800'}`}>
                  <Minimize2 className="w-5 h-5" />
                </button>
              </div>
            </>
          )}

          {/* Core Canvas */}
          <canvas 
            ref={canvasRef} 
            onPointerDown={handlePointerDown}
            className={`block absolute top-0 left-0 w-full h-full touch-none z-10 ${gameState === 'playing' ? 'cursor-crosshair' : ''}`} 
          />

          {/* START SCREEN */}
          {gameState === 'start' && (
            <div className={`absolute inset-0 flex flex-col items-center justify-center p-6 z-30 select-none overflow-y-auto max-h-[100vh] backdrop-blur-md ${dayMode ? 'bg-white/95' : 'bg-[#05070e]/98'}`}>
              <div className="max-w-md w-full text-center">
                <h2 className={`text-xl font-black uppercase tracking-wider mb-1 ${dayMode ? 'text-slate-800' : 'text-white'}`}>
                  Visual Rhythm Intercept
                </h2>
                <p className="text-xs text-slate-500 uppercase tracking-widest mb-6">
                  Tempo Coordination • Adaptive Drill
                </p>

                <div className="grid grid-cols-2 gap-3 mb-6 text-left">
                  <div className={`p-3 rounded-xl border ${dayMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/60 border-slate-800'}`}>
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Objective</span>
                    <span className={`text-sm font-black ${dayMode ? 'text-slate-800' : 'text-white'}`}>Match Overlaps</span>
                  </div>
                  <div className={`p-3 rounded-xl border ${dayMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/60 border-slate-800'}`}>
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Reward</span>
                    <span className="text-sm font-black text-green-500">Score & +Time</span>
                  </div>
                  <div className={`p-3 rounded-xl border ${dayMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/60 border-slate-800'}`}>
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Penalty</span>
                    <span className="text-sm font-black text-red-500">Scaling Time Drop</span>
                  </div>
                  <div className={`p-3 rounded-xl border ${dayMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/60 border-slate-800'}`}>
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Mechanic</span>
                    <span className="text-sm font-black text-cyan-500">Aggressive Tempo</span>
                  </div>
                </div>

                <div className={`p-4 rounded-xl mb-6 text-left text-xs ${dayMode ? 'bg-slate-50 border border-slate-200 text-slate-600' : 'bg-[#0b0f19] border border-slate-850 text-slate-400'}`}>
                  <span className={`text-xs font-bold block uppercase mb-2 flex items-center gap-1.5 ${dayMode ? 'text-slate-800' : 'text-white'}`}>
                    <GraduationCap className="w-3.5 h-3.5 text-cyan-500" /> What this trains
                  </span>
                  <ul className="list-disc pl-4 space-y-1.5 text-[10px] leading-relaxed">
                    <li>Rhythmic visual prediction and temporal coordination</li>
                    <li>Synchronizing rapid tactile inputs with precise visual cues</li>
                    <li>Sustained focus and error recovery under scaling speeds</li>
                  </ul>
                  <div className="mt-3 pt-3 border-t border-dashed border-slate-500/30 text-[10px] text-center font-bold">
                    CONTROLS: Use W/A/S/D, Arrows, or Screen Taps
                  </div>
                </div>

                <button
                  onClick={startDrill}
                  className="w-full py-3.5 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg uppercase tracking-widest transition-all duration-200 active:scale-95"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  Begin Intercept Trial
                </button>
              </div>
            </div>
          )}

          {/* GAME OVER DASHBOARD */}
          {gameState === 'gameOver' && analytics.rankData && (
            <div className={`absolute inset-0 flex flex-col items-center justify-center p-6 z-30 select-none overflow-y-auto max-h-[100vh] backdrop-blur-md ${dayMode ? 'bg-white/95' : 'bg-[#05070e]/98'}`}>
              <div className="max-w-md w-full text-center">
                {isNewBest && (
                  <div className="inline-block bg-yellow-500 text-black text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-3 shadow-[0_0_15px_rgba(234,179,8,0.5)] animate-bounce">
                    ⭐ NEW PERSONAL BEST!
                  </div>
                )}
                
                <h2 className={`text-xl font-black uppercase tracking-wider mb-1 ${dayMode ? 'text-slate-800' : 'text-white'}`}>
                  Rhythm Analysis Complete
                </h2>
                <p className="text-xs text-slate-500 uppercase tracking-widest mb-6">
                  Peak Tempo Reached: Level {analytics.peakLevel}
                </p>

                {/* 3x4 Telemetry Grid */}
                <div className="grid grid-cols-3 gap-2.5 mb-6 text-left">
                  <div className={`p-2.5 rounded-xl col-span-3 border ${dayMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/60 border-slate-800'}`}>
                    <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Final Score</span>
                    <span className={`text-2xl font-black ${dayMode ? 'text-slate-800' : 'text-white'}`}>{score}</span>
                  </div>
                  
                  <div className={`p-2.5 rounded-xl border ${dayMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/60 border-slate-800'}`}>
                    <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Timing Acc.</span>
                    <span className="text-base font-black text-fuchsia-400">{analytics.accuracy}%</span>
                  </div>
                  <div className={`p-2.5 rounded-xl border ${dayMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/60 border-slate-800'}`}>
                    <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Peak Level</span>
                    <span className="text-base font-black text-emerald-400">Lv. {analytics.peakLevel}</span>
                  </div>
                  <div className={`p-2.5 rounded-xl border ${dayMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/60 border-slate-800'}`}>
                    <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Max Combo</span>
                    <span className="text-base font-black text-orange-400">{analytics.bestCombo.toFixed(1)}x</span>
                  </div>

                  <div className={`p-2.5 rounded-xl border ${dayMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/60 border-slate-800'}`}>
                    <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Time Earned</span>
                    <span className="text-base font-black text-blue-400">+{analytics.timeEarned}s</span>
                  </div>
                  <div className={`p-2.5 rounded-xl border ${dayMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/60 border-slate-800'}`}>
                    <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Time Lost</span>
                    <span className="text-base font-black text-red-400">-{analytics.timeLost}s</span>
                  </div>
                  <div className={`p-2.5 rounded-xl border ${dayMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/60 border-slate-800'}`}>
                    <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Max Streak</span>
                    <span className="text-base font-black text-indigo-400">{analytics.maxStreak}</span>
                  </div>
                  
                  <div className={`p-2.5 rounded-xl border ${dayMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/60 border-slate-800'}`}>
                    <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Perfect Hits</span>
                    <span className="text-base font-black text-teal-400">{analytics.perfectHits}</span>
                  </div>
                  <div className={`p-2.5 rounded-xl border ${dayMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/60 border-slate-800'}`}>
                    <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Good Hits</span>
                    <span className="text-base font-black text-blue-400">{analytics.goodHits}</span>
                  </div>
                  <div className={`p-2.5 rounded-xl border ${dayMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/60 border-slate-800'}`}>
                    <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Mistimings</span>
                    <span className="text-base font-black text-rose-400">{analytics.misses}</span>
                  </div>
                </div>

                <div className={`p-3 rounded-xl mb-4 text-left border ${dayMode ? 'bg-slate-50 border-slate-200' : 'bg-[#0b0f19] border-slate-850'}`}>
                  <span className={`text-xs font-black block text-center uppercase tracking-widest ${analytics.rankData.color} mb-2`}>
                    Rank: {analytics.rankData.rank}
                  </span>
                  <div className={`w-full h-px mb-2 ${dayMode ? 'bg-slate-200' : 'bg-slate-850'}`}></div>
                  <div className={`flex items-center gap-1.5 text-[9px] font-bold uppercase mb-1 ${dayMode ? 'text-slate-800' : 'text-white'}`}>
                    <Sparkles className="w-3 h-3 text-yellow-500" /> Diagnostics advice:
                  </div>
                  <p className={`text-[10px] leading-normal ${dayMode ? 'text-slate-600' : 'text-slate-400'}`}>
                    {analytics.coachAdvice}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={startDrill}
                    className="flex-1 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg uppercase tracking-widest transition-all duration-200 active:scale-95"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    Run another trial
                  </button>
                  <button
                    onClick={shareScore}
                    className={`p-3 rounded-xl transition-colors active:scale-95 border ${dayMode ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50' : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'}`}
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
            <div className={`rounded-2xl border overflow-hidden shadow-2xl pointer-events-none ${dayMode ? 'bg-white border-slate-200' : 'bg-gray-900 border-gray-800'}`}>
              <div className={`px-6 py-5 border-b flex items-center gap-3 ${dayMode ? 'bg-slate-50/50 border-slate-200' : 'bg-black/40 border-gray-800'}`}>
                <Info className="w-5 h-5 text-cyan-500" />
                <h2 className={`font-bold text-lg tracking-wide ${dayMode ? 'text-slate-800' : 'text-white'}`}>Progression & Scoring Rules</h2>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-5">
                  <RuleItem num="1" color="green" text="Perfect Intercept" highlight="+Base * Lv PTS | +1.5s" result="Overlap within 5% distance" dayMode={dayMode} />
                  <RuleItem num="2" color="blue" text="Good Intercept" highlight="+Half * Lv PTS | +0.8s" result="Overlap within 12% distance" dayMode={dayMode} />
                </div>
                <div className="space-y-5">
                  <RuleItem num="3" color="orange" text="Combo System" highlight="Up to 3.0x Multiplier" result="Chain perfects for massive points" dayMode={dayMode} />
                  <RuleItem num="4" color="red" text="Miss / Mistiming" highlight="Scaling Time Penalty" result="Incorrect inputs drain your clock" dayMode={dayMode} />
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
            <div className={`rounded-2xl border overflow-hidden shadow-xl ${dayMode ? 'bg-white border-slate-200' : 'bg-gray-900 border-gray-800'}`}>
              <div className={`px-6 py-5 border-b flex items-center gap-3 ${dayMode ? 'bg-slate-50/50 border-slate-200' : 'bg-black/40 border-gray-800'}`}>
                <GraduationCap className="w-5 h-5 text-cyan-400" />
                <h2 className={`font-bold text-lg tracking-wide ${dayMode ? 'text-slate-800' : 'text-white'}`}>About Visual Rhythm Intercept</h2>
              </div>
              <div className="p-8">
                <p className={`text-sm leading-relaxed mb-6 ${dayMode ? 'text-slate-600' : 'text-gray-300'}`}>
                  This free visual rhythm intercept game trains temporal tracking and rhythmic prediction by challenging players to trigger directional targets exactly as incoming orbital pulses overlap with guides. The physics engine measures the absolute coordinate overlap distance, actively rewarding precision timing while heavily punishing off-beat inputs or spammed keys.
                </p>

                {/* Grid Section */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
                  <div className={`p-5 rounded-xl border ${dayMode ? 'bg-slate-50 border-slate-100' : 'bg-black/40 border-gray-800'}`}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center"><Users className="w-4 h-4 text-white" /></div>
                      <h3 className={`text-sm font-bold ${dayMode ? 'text-slate-800' : 'text-white'}`}>Who It's For</h3>
                    </div>
                    <p className={`text-xs leading-relaxed ${dayMode ? 'text-slate-500' : 'text-gray-400'}`}>Esports athletes, rhythm game enthusiasts, and players seeking to sharpen temporal button-press timing and visual coordination.</p>
                  </div>
                  <div className={`p-5 rounded-xl border ${dayMode ? 'bg-slate-50 border-slate-100' : 'bg-black/40 border-gray-800'}`}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-green-600 flex items-center justify-center"><TrendingUp className="w-4 h-4 text-white" /></div>
                      <h3 className={`text-sm font-bold ${dayMode ? 'text-slate-800' : 'text-white'}`}>Skills Improved</h3>
                    </div>
                    <p className={`text-xs leading-relaxed ${dayMode ? 'text-slate-500' : 'text-gray-400'}`}>Rhythmic visual tracking, reaction timing synchronization, spatial prediction, and fast keyboard coordination under scaling pressure.</p>
                  </div>
                  <div className={`p-5 rounded-xl border ${dayMode ? 'bg-slate-50 border-slate-100' : 'bg-black/40 border-gray-800'}`}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center"><BarChart3 className="w-4 h-4 text-white" /></div>
                      <h3 className={`text-sm font-bold ${dayMode ? 'text-slate-800' : 'text-white'}`}>What You'll Track</h3>
                    </div>
                    <p className={`text-xs leading-relaxed ${dayMode ? 'text-slate-500' : 'text-gray-400'}`}>Total score, perfect intercept accuracy, good timing hits, combo streak multipliers, and total mistiming penalties.</p>
                  </div>
                </div>

                {/* How to Play & Scoring */}
                <div className={`rounded-xl border p-6 mb-8 ${dayMode ? 'bg-slate-50 border-slate-200' : 'bg-[#0b0f19]/40 border-slate-800'}`}>
                  <h3 className={`text-base font-bold uppercase tracking-wider mb-4 flex items-center gap-2 ${dayMode ? 'text-slate-800' : 'text-white'}`}>
                    <Target className="w-5 h-5 text-cyan-500" /> How to Play & Scoring
                  </h3>
                  <div className={`grid sm:grid-cols-2 gap-6 text-sm ${dayMode ? 'text-slate-600' : 'text-gray-300'}`}>
                    <ol className="space-y-3 list-decimal pl-5">
                      <li>Click <strong>Begin Intercept Trial</strong> to start.</li>
                      <li>Observe pulse waves propagating along the Top, Right, Bottom, and Left lanes.</li>
                      <li>Press <strong>W/A/S/D</strong>, <strong>Arrow keys</strong>, or tap the quadrant screen sectors precisely as circles overlap.</li>
                    </ol>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> <span className={`font-bold ${dayMode ? 'text-slate-800' : 'text-white'}`}>Perfect Overlap:</span> Overlapping exactly on the line builds your Combo Multiplier and grants huge time bonuses.</li>
                      <li className="flex items-center gap-2"><XCircle className="w-4 h-4 text-red-500" /> <span className={`font-bold ${dayMode ? 'text-slate-800' : 'text-white'}`}>Miss/Mistiming:</span> Mismatched clicks or letting a wave hit the center core penalizes the clock by a scaling amount.</li>
                    </ul>
                  </div>
                </div>

                {/* FAQ Section */}
                <div className={`p-5 rounded-xl border ${dayMode ? 'bg-slate-50 border-slate-100' : 'bg-black/40 border-gray-800'}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <Lightbulb className="w-5 h-5 text-yellow-400" />
                    <h3 className={`text-sm font-bold uppercase tracking-wider ${dayMode ? 'text-slate-800' : 'text-white'}`}>Frequently Asked Questions</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FAQItem 
                      q="What is the Visual Rhythm Intercept drill?" 
                      a="A timing and rhythm-based reflex trainer. Align keyboard actions (W/A/S/D or arrow keys) or tap sectors with incoming orbital pulses. Intercepting pulses at perfect overlap rewards you with score bonuses and time extensions." 
                      dayMode={dayMode}
                    />
                    <FAQItem 
                      q="How do the combo multipliers work?" 
                      a="As you chain perfect and good intercepts together without missing, your combo multiplier increases (up to 3.0x at 50 streaks). This exponentially scales the points you receive per intercept." 
                      dayMode={dayMode}
                    />
                    <FAQItem 
                      q="What are the score and time adjustments in Rhythm Intercept?" 
                      a="Perfect intercept adds base points * level * combo and +1.5s time; Good intercept gives half points and +0.8s time; any missed timing or misclick triggers a brutal scaling penalty." 
                      dayMode={dayMode}
                    />
                    <FAQItem 
                      q="What skills are trained by this rhythmic reflex game?" 
                      a="It trains precise timing, rhythmic visual prediction, high-frequency tactile response coordination, multi-quadrant scanning, and stress stabilization under tempo scaling." 
                      dayMode={dayMode}
                    />
                    <FAQItem 
                      q="Why does my survival clock drain so fast?" 
                      a="To punish button-mashing. Failing to press a key when a pulse overlaps the guide, or spamming keys when no pulse is present, instantly deducts time from your survival clock." 
                      dayMode={dayMode}
                    />
                    <FAQItem 
                      q="Can I use mobile touch controls?" 
                      a="Yes! You can tap directly on the Top, Right, Bottom, or Left quadrants on the screen. The game automatically adapts to touch gestures and registers quadrant overlaps." 
                      dayMode={dayMode}
                    />
                    <FAQItem 
                      q="How do levels change the game speed?" 
                      a="Every 500 points, the engine levels up. Higher levels drastically reduce the pulse spawn interval (from 1.6s down to 0.3s), putting your temporal reflexes to the ultimate test." 
                      dayMode={dayMode}
                    />
                    <FAQItem 
                      q="Does this game help with esports and FPS gaming?" 
                      a="Yes. Peak player performance relies on rhythmic timing consistency and spatial coordinate prediction. Synchronizing your physical inputs with rapidly shifting visual cues translates to better weapon shooting cadence and fluid movement." 
                      dayMode={dayMode}
                    />
                    <FAQItem 
                      q="What is a good score in Rhythm Intercept?" 
                      a="A score of 1000+ points is Gold tier. Hitting 5000+ points requires flawless timing at high levels, placing you in the Diamond tier." 
                      dayMode={dayMode}
                    />
                    <FAQItem 
                      q="Is this visual action game free?" 
                      a="Yes, the Visual Rhythm Intercept drill on SkillDrills is 100% free, ad-free, and runs entirely in your web browser with zero downloads." 
                      dayMode={dayMode}
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
              <h2 className={`text-xs font-bold uppercase tracking-widest font-mono ${dayMode ? 'text-slate-800' : 'text-white'}`}>
                Explore Related Drills
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <RelatedCard href="/drills/physical/reflex-training/peripheral-threat-sweeper" title="Peripheral Sweeper" desc="Scan and intercept peripheral targets." color="rose" icon={<Eye className="w-4 h-4" />} dayMode={dayMode} />
              <RelatedCard href="/drills/physical/coordination/dynamic-grid-evasion" title="Grid Evasion" desc="Evade warning blast zones inside grids." color="cyan" icon={<Grid className="w-4 h-4" />} dayMode={dayMode} />
              <RelatedCard href="/drills/motor/timing-accuracy/velocity-matcher" title="Velocity Matcher" desc="Match rotation speed of orbital nodes." color="orange" icon={<Timer className="w-4 h-4" />} dayMode={dayMode} />
              <RelatedCard href="/drills/physical/reflex-training/quick-dodge" title="Quick Dodge" desc="Raw input evasion training." color="red" icon={<AlertCircle className="w-4 h-4" />} dayMode={dayMode} />
            </div>
          </section>
        )}

        {/* FOOTER SECTION */}
        {!isFullscreen && (
          <footer className={`mt-12 border rounded-xl py-10 px-6 font-mono text-[10px] ${dayMode ? 'bg-slate-100 border-slate-200 text-slate-500' : 'bg-slate-950/40 border-slate-900 text-slate-500'}`} role="contentinfo">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 mb-8">
                <div>
                  <h3 className={`font-bold mb-3 uppercase tracking-wider ${dayMode ? 'text-slate-800' : 'text-white'}`}>Motor & FPS</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/motor/hand-eye-coordination/aim-trainer" className="hover:text-cyan-400 transition-colors">Aim Trainer Elite</Link></li>
                    <li><Link href="/drills/fps/flick-shot-training" className="hover:text-cyan-400 transition-colors">Flick Shot Trainer</Link></li>
                    <li><Link href="/drills/fps" className="hover:text-cyan-400 transition-colors font-bold text-cyan-500">All FPS Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className={`font-bold mb-3 uppercase tracking-wider ${dayMode ? 'text-slate-800' : 'text-white'}`}>Memory</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/memory/working-memory/n-back" className="hover:text-cyan-400 transition-colors">3-Back Training</Link></li>
                    <li><Link href="/drills/memory/short-term-memory/color-sequence" className="hover:text-cyan-400 transition-colors">Color Sequence</Link></li>
                    <li><Link href="/drills/memory" className="hover:text-cyan-400 transition-colors font-bold text-cyan-500">All Memory Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className={`font-bold mb-3 uppercase tracking-wider ${dayMode ? 'text-slate-800' : 'text-white'}`}>Cognitive</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/cognitive/memory/card-matching" className="hover:text-cyan-400 transition-colors">Memory Games</Link></li>
                    <li><Link href="/drills/cognitive/attention/divided-attention" className="hover:text-cyan-400 transition-colors">Attention Drills</Link></li>
                    <li><Link href="/drills/cognitive" className="hover:text-cyan-400 transition-colors font-bold text-cyan-500">All Cognitive Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className={`font-bold mb-3 uppercase tracking-wider ${dayMode ? 'text-slate-800' : 'text-white'}`}>Academic</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/academic/writing-speed/typing-test" className="hover:text-cyan-400 transition-colors">Typing Speed Test</Link></li>
                    <li><Link href="/drills/academic/math-speed/mental-math" className="hover:text-cyan-400 transition-colors">Mental Math</Link></li>
                    <li><Link href="/drills/academic" className="hover:text-cyan-400 transition-colors font-bold text-cyan-500">All Academic Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className={`font-bold mb-3 uppercase tracking-wider ${dayMode ? 'text-slate-800' : 'text-white'}`}>More Sectors</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/visual" className="hover:text-cyan-400 transition-colors">Visual Drills</Link></li>
                    <li><Link href="/drills/physical" className="hover:text-cyan-400 transition-colors">Physical Drills</Link></li>
                  </ul>
                </div>
              </div>
              
              <div className={`border-t pt-8 text-center ${dayMode ? 'border-slate-200' : 'border-slate-900'}`}>
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="w-6 h-6 bg-gradient-to-br from-cyan-500/25 to-blue-500/25 border border-cyan-500/30 rounded-lg flex items-center justify-center">
                    <Crosshair className="w-3.5 h-3.5 text-cyan-400" />
                  </div>
                  <span className={`font-black tracking-widest text-xs uppercase ${dayMode ? 'text-slate-800' : 'text-white'}`}>SkillDrills</span>
                </div>
                <p className="text-[9px] mb-2">&copy; 2026 SkillDrills. All rights reserved.</p>
                <p className="text-[9px] max-w-2xl mx-auto leading-relaxed mb-6">
                  Open-source telemetry training platform using hardware pointer lock. Free forever. No downloads required.
                </p>
                <div className="flex items-center justify-center gap-3 flex-wrap">
                  <a href="https://youtube.com/@skilldrills.online" target="_blank" rel="noopener noreferrer" className={`transition-colors p-2.5 rounded-full shadow-md ${dayMode ? 'bg-white text-slate-400 hover:text-slate-700 hover:bg-slate-50' : 'bg-gray-900 text-gray-400 hover:text-white hover:bg-gray-800'}`} title="YouTube">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                  </a>
                  <a href="https://www.facebook.com/profile.php?id=61590093843779" target="_blank" rel="noopener noreferrer" className={`transition-colors p-2.5 rounded-full shadow-md ${dayMode ? 'bg-white text-slate-400 hover:text-slate-700 hover:bg-slate-50' : 'bg-gray-900 text-gray-400 hover:text-white hover:bg-gray-800'}`} title="Facebook">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  </a>
                  <a href="https://x.com/skilldrillss" target="_blank" rel="noopener noreferrer" className={`transition-colors p-2.5 rounded-full shadow-md ${dayMode ? 'bg-white text-slate-400 hover:text-slate-700 hover:bg-slate-50' : 'bg-gray-900 text-gray-400 hover:text-white hover:bg-gray-800'}`} title="Twitter / X">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  </a>
                  <a href="https://www.instagram.com/skilldrills.online/?__pwa=1" target="_blank" rel="noopener noreferrer" className={`transition-colors p-2.5 rounded-full shadow-md ${dayMode ? 'bg-white text-slate-400 hover:text-slate-700 hover:bg-slate-50' : 'bg-gray-900 text-gray-400 hover:text-white hover:bg-gray-800'}`} title="Instagram">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
                  </a>
                  <a href="https://pinterest.com/skilldrills" target="_blank" rel="noopener noreferrer" className={`transition-colors p-2.5 rounded-full shadow-md ${dayMode ? 'bg-white text-slate-400 hover:text-slate-700 hover:bg-slate-50' : 'bg-gray-900 text-gray-400 hover:text-white hover:bg-gray-800'}`} title="Pinterest">
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

function StatCard({ icon, value, label, unit = '', dayMode }) {
  return (
    <div className={`group rounded-xl border p-2 text-center flex flex-col justify-center h-full transition-all duration-300 hover:scale-[1.03] ${dayMode ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-950/40 border-slate-900 hover:border-slate-800'}`}>
      <div className="mb-1 flex justify-center transition-transform duration-300 group-hover:scale-110">
        {icon}
      </div>
      <p className={`text-xs sm:text-sm font-extrabold tracking-tight truncate ${dayMode ? 'text-slate-800' : 'text-white'}`}>
        {value} <span className="text-[10px] font-semibold text-slate-400">{unit}</span>
      </p>
      <p className="text-[9px] font-mono font-bold uppercase tracking-wider text-slate-500 truncate">{label}</p>
    </div>
  );
}

function RuleItem({ num, color, text, highlight = '', result, dayMode }) {
  const colorMapDark = { 
    blue: 'bg-blue-600 text-blue-300 border-blue-500', 
    indigo: 'bg-indigo-600 text-indigo-300 border-indigo-500', 
    red: 'bg-red-600 text-red-300 border-red-500', 
    orange: 'bg-orange-600 text-orange-300 border-orange-500',
    purple: 'bg-purple-600 text-purple-300 border-purple-500',
    cyan: 'bg-cyan-600 text-cyan-300 border-cyan-500',
    green: 'bg-green-600 text-green-300 border-green-500' 
  };
  const colorMapLight = {
    blue: 'bg-blue-100 text-blue-700 border-blue-200', 
    indigo: 'bg-indigo-100 text-indigo-700 border-indigo-200', 
    red: 'bg-red-100 text-red-700 border-red-200', 
    orange: 'bg-orange-100 text-orange-700 border-orange-200',
    purple: 'bg-purple-100 text-purple-700 border-purple-200',
    cyan: 'bg-cyan-100 text-cyan-700 border-cyan-200',
    green: 'bg-green-100 text-green-700 border-green-200' 
  };
  
  const mapToUse = dayMode ? colorMapLight : colorMapDark;
  const colors = mapToUse[color] || (dayMode ? 'bg-slate-100 text-slate-700 border-slate-200' : 'bg-slate-600 text-slate-300 border-slate-500');
  const [bg, txt, border] = colors.split(' ');
  
  return (
    <div className={`flex items-center gap-4 p-4 rounded-xl border shadow-sm ${dayMode ? 'bg-slate-50 border-slate-200' : 'bg-[#0b0f19]/40 border-slate-800'}`}>
      <div className={`w-8 h-8 rounded-xl ${bg} ${dayMode ? '' : 'border-t-white/20'} flex items-center justify-center text-base font-black shadow-sm flex-shrink-0 ${dayMode ? txt : 'text-white border'}`}>{num}</div>
      <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <p className={`text-sm font-medium ${dayMode ? 'text-slate-700' : 'text-slate-300'}`}>
          {text}{highlight && <span className={`font-black ${txt}`}> {highlight}</span>}
        </p>
        <div className={`text-xs font-black px-3 py-1.5 rounded-lg border ${border} ${txt} whitespace-nowrap tracking-wide text-center sm:text-left ${dayMode ? 'bg-white shadow-sm' : 'bg-[#050811] shadow-inner'}`}>
          {result}
        </div>
      </div>
    </div>
  );
}

function RelatedCard({ href, title, desc, color, icon, dayMode }) {
  const gradientsDark = {
    blue: 'from-blue-500 to-indigo-500',
    orange: 'from-orange-500 to-amber-500',
    red: 'from-red-500 to-rose-500',
    purple: 'from-purple-500 to-violet-500',
    green: 'from-green-500 to-emerald-500',
    cyan: 'from-cyan-500 to-blue-500',
    indigo: 'from-indigo-500 to-purple-500',
    rose: 'from-rose-500 to-pink-500'
  };
  
  const gradient = gradientsDark[color] || 'from-cyan-500 to-blue-500';
  
  return (
    <Link href={href} className={`group relative overflow-hidden rounded-2xl border transition-all hover:-translate-y-1 block p-5 ${dayMode ? 'bg-white border-slate-200 hover:border-cyan-400 shadow-sm' : 'bg-[#0b0f19]/40 border-slate-800 hover:border-cyan-500/50'}`}>
      <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${gradient}`}></div>
      <div className={`w-10 h-10 rounded-xl border flex items-center justify-center mb-3 transition-colors ${dayMode ? 'bg-slate-50 border-slate-200 text-slate-500 group-hover:text-cyan-600' : 'bg-[#050811] border-slate-700 text-slate-400 group-hover:text-white shadow-inner'}`}>
        {icon}
      </div>
      <h3 className={`font-bold text-base mb-1.5 transition-colors ${dayMode ? 'text-slate-800 group-hover:text-cyan-600' : 'text-white group-hover:text-cyan-400'}`}>{title}</h3>
      <p className={`text-xs mb-4 ${dayMode ? 'text-slate-500' : 'text-slate-500'}`}>{desc}</p>
      <div className={`flex items-center gap-1.5 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-wider ${dayMode ? 'text-cyan-600' : 'text-cyan-400'}`}>
        Start Drill <ArrowRight className="w-3.5 h-3.5" />
      </div>
    </Link>
  );
}

function FAQItem({ q, a, dayMode }) {
  return (
    <div className={`p-5 rounded-xl border transition-colors ${dayMode ? 'bg-white border-slate-200 hover:border-slate-300' : 'bg-[#05060b] border-gray-800 hover:border-gray-700'}`}>
      <h4 className={`text-sm font-bold mb-2 ${dayMode ? 'text-slate-800' : 'text-gray-200'}`}>{q}</h4>
      <p className={`text-xs leading-relaxed ${dayMode ? 'text-slate-600' : 'text-gray-400'}`}>{a}</p>
    </div>
  );
}