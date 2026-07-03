'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  Activity, AlertCircle, ArrowRight, BarChart3, ChevronRight, 
  Clock, Crosshair, Eye, GraduationCap, Info, Lightbulb, 
  Maximize2, Minimize2, Play, RefreshCw, Star, Target, 
  Timer, TrendingUp, Trophy, Volume2, VolumeX, Zap, 
  Share2, Shield, XCircle, Grid, Sparkles, CheckCircle2,
  Sun, Moon, Users
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
      
      if (type === 'perfect') { // High chime
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, now);
        osc.frequency.exponentialRampToValueAtTime(1600, now + 0.15);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
        osc.start(now); osc.stop(now + 0.15);
      } else if (type === 'good') { // Medium chime
        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, now);
        osc.frequency.exponentialRampToValueAtTime(1000, now + 0.12);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
        osc.start(now); osc.stop(now + 0.12);
      } else if (type === 'miss') { // Low buzzer
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(130, now);
        osc.frequency.exponentialRampToValueAtTime(50, now + 0.3);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
        osc.start(now); osc.stop(now + 0.3);
      } else if (type === 'levelup') { // Success scale
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

const DRILL_DURATION = 30; // Starts at 30s

export default function VisualRhythmInterceptClient() {
  const [gameState, setGameState] = useState('start'); 
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [dayMode, setDayMode] = useState(false);
  
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(DRILL_DURATION);
  const [isNewBest, setIsNewBest] = useState(false);
  const [streak, setStreak] = useState(0);
  const [level, setLevel] = useState(1);
  const [perfectHits, setPerfectHits] = useState(0);
  const [goodHits, setGoodHits] = useState(0);
  const [misses, setMisses] = useState(0);
  
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  
  // Real-time engine variables
  const engine = useRef({
    waves: [], // elements: { id, quadrant, progress, speed, hit: false }
    nextWaveId: 0,
    spawnTimer: 0,
    spawnInterval: 1.6, // seconds between wave spawns (decreases with level)
    
    timeLeft: DRILL_DURATION,
    score: 0,
    streak: 0,
    maxStreak: 0,
    perfectCount: 0,
    goodCount: 0,
    missCount: 0,
    
    particles: [],
    screenShake: 0,
    flashRed: 0,
    dayMode: false,
    
    // Key visual feedback timers for the 4 receptor targets
    receptors: [0, 0, 0, 0] // Top, Right, Bottom, Left (alpha from 0 to 1)
  });

  const lastTimeRef = useRef(0);
  const isActiveRef = useRef(false);

  // Load High Score
  useEffect(() => {
    try {
      const savedBest = localStorage.getItem('rhythmIntercept_bestScore');
      if (savedBest) setBestScore(parseInt(savedBest, 10));
    } catch (e) {}
  }, []);

  useEffect(() => {
    if (audioSynth) {
      audioSynth.setEnabled(soundEnabled);
    }
  }, [soundEnabled]);

  // Sync state dayMode to engine ref
  useEffect(() => {
    engine.current.dayMode = dayMode;
  }, [dayMode]);

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

  // Intercept trigger logic
  const triggerIntercept = (quadrant) => {
    if (gameState !== 'playing') return;
    const eng = engine.current;
    
    // Visual flash feedback for receptor
    eng.receptors[quadrant] = 1.0;
    
    // Find waves in this quadrant that are close to the target range
    // Target intercept line is at progress = 0.8
    // We sort the waves in this quadrant by progress descending (closest to center)
    const targetWaves = eng.waves
      .filter(w => w.quadrant === quadrant && !w.hit)
      .sort((a, b) => b.progress - a.progress);
      
    if (targetWaves.length === 0) {
      // Clicked with no target -> Miss
      registerMiss();
      return;
    }
    
    const nearestWave = targetWaves[0];
    const distance = Math.abs(nearestWave.progress - 0.8);
    
    if (distance <= 0.05) { // Perfect alignment
      nearestWave.hit = true;
      registerPerfect(nearestWave);
    } else if (distance <= 0.12) { // Good alignment
      nearestWave.hit = true;
      registerGood(nearestWave);
    } else {
      // Missed timing
      registerMiss();
    }
  };

  const registerPerfect = (wave) => {
    const eng = engine.current;
    eng.perfectCount++;
    eng.streak++;
    if (eng.streak > eng.maxStreak) eng.maxStreak = eng.streak;
    
    // Time increment
    eng.timeLeft = Math.min(60.0, eng.timeLeft + 1.5);
    
    // Score update
    const pts = 30 * level;
    eng.score += pts;
    
    setScore(eng.score);
    setStreak(eng.streak);
    setPerfectHits(eng.perfectCount);
    
    if (audioSynth) audioSynth.playSound('perfect');
    spawnExplosion(wave.quadrant, '#10b981', 15); // green explosion
    
    // Level up check
    const nextLvl = Math.min(6, Math.floor(eng.score / 250) + 1);
    if (nextLvl > level) {
      setLevel(nextLvl);
      eng.spawnInterval = Math.max(0.7, 1.6 - nextLvl * 0.15);
      if (audioSynth) audioSynth.playSound('levelup');
    }
  };

  const registerGood = (wave) => {
    const eng = engine.current;
    eng.goodCount++;
    eng.streak++;
    if (eng.streak > eng.maxStreak) eng.maxStreak = eng.streak;
    
    // Time increment
    eng.timeLeft = Math.min(60.0, eng.timeLeft + 0.8);
    
    const pts = 15 * level;
    eng.score += pts;
    
    setScore(eng.score);
    setStreak(eng.streak);
    setGoodHits(eng.goodCount);
    
    if (audioSynth) audioSynth.playSound('good');
    spawnExplosion(wave.quadrant, '#6366f1', 8); // indigo explosion
    
    // Level up check
    const nextLvl = Math.min(6, Math.floor(eng.score / 250) + 1);
    if (nextLvl > level) {
      setLevel(nextLvl);
      eng.spawnInterval = Math.max(0.7, 1.6 - nextLvl * 0.15);
      if (audioSynth) audioSynth.playSound('levelup');
    }
  };

  const registerMiss = () => {
    const eng = engine.current;
    eng.missCount++;
    eng.streak = 0;
    setStreak(0);
    
    // Time Penalty
    eng.timeLeft = Math.max(0, eng.timeLeft - 2.0);
    eng.screenShake = 10;
    eng.flashRed = 0.3;
    
    setMisses(eng.missCount);
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
    
    // Center point of receptor on quadrant
    // Receptors are drawn at radius = W * 0.35 (which is 0.7 * radial limit)
    // Angles: Top (-90 deg), Right (0 deg), Bottom (90 deg), Left (180 deg)
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

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (gameState !== 'playing') return;
      const key = e.key.toLowerCase();
      
      // Map keys: 
      // Top: W, ArrowUp (quadrant 0)
      // Right: D, ArrowRight (quadrant 1)
      // Bottom: S, ArrowDown (quadrant 2)
      // Left: A, ArrowLeft (quadrant 3)
      
      if (key === 'w' || e.key === 'ArrowUp') {
        e.preventDefault(); triggerIntercept(0);
      } else if (key === 'd' || e.key === 'ArrowRight') {
        e.preventDefault(); triggerIntercept(1);
      } else if (key === 's' || e.key === 'ArrowDown') {
        e.preventDefault(); triggerIntercept(2);
      } else if (key === 'a' || e.key === 'ArrowLeft') {
        e.preventDefault(); triggerIntercept(3);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState]);

  // Pointer click on quadrant
  const handlePointerDown = (e) => {
    if (gameState !== 'playing' || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left - canvas.width / 2;
    const y = e.clientY - rect.top - canvas.height / 2;
    
    // Determine quadrant based on click angle
    let angle = Math.atan2(y, x); // -PI to PI
    // Map to quadrants:
    // Top (around -Math.PI/2 = -1.57): -2.35 to -0.78
    // Right (around 0): -0.78 to 0.78
    // Bottom (around Math.PI/2 = 1.57): 0.78 to 2.35
    // Left (around PI / -PI): > 2.35 or < -2.35
    
    let quadrant = 1; // Default right
    if (angle >= -2.35 && angle < -0.78) quadrant = 0; // Top
    else if (angle >= 0.78 && angle < 2.35) quadrant = 2; // Bottom
    else if (angle >= 2.35 || angle < -2.35) quadrant = 3; // Left
    
    triggerIntercept(quadrant);
  };

  // Main game loop
  const loop = (timestamp) => {
    if (!isActiveRef.current) return;
    
    if (!lastTimeRef.current) lastTimeRef.current = timestamp;
    const dt = (timestamp - lastTimeRef.current) / 1000;
    lastTimeRef.current = timestamp;
    
    const eng = engine.current;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width;
    const H = canvas.height;
    const cx = W / 2;
    const cy = H / 2;
    const maxRadius = Math.min(W, H) * 0.44; // radial screen limit
    
    // 1. Update Game Timer
    eng.timeLeft = Math.max(0, eng.timeLeft - dt);
    setTimeLeft(eng.timeLeft);
    if (eng.timeLeft <= 0) {
      setGameState('gameOver');
      isActiveRef.current = false;
      
      try {
        const savedBest = localStorage.getItem('rhythmIntercept_bestScore') || 0;
        if (eng.score > parseInt(savedBest, 10)) {
          localStorage.setItem('rhythmIntercept_bestScore', eng.score.toString());
          setBestScore(eng.score);
          setIsNewBest(true);
        }
      } catch (e) {}
      
      setPerfectHits(eng.perfectCount);
      setGoodHits(eng.goodCount);
      setMisses(eng.missCount);
      setStreak(eng.maxStreak);
      return;
    }
    
    // 2. Wave Spawner
    eng.spawnTimer += dt;
    if (eng.spawnTimer >= eng.spawnInterval) {
      eng.spawnTimer = 0;
      const quad = Math.floor(Math.random() * 4);
      // Spawn wave moving inward (progress starts at 0.0, target is 0.8)
      // speed scales up slightly with levels
      const speed = 0.38 + level * 0.04; 
      eng.waves.push({
        id: eng.nextWaveId++,
        quadrant: quad,
        progress: 0.0,
        speed,
        hit: false
      });
    }
    
    // 3. Update Receptor Feedback alphas
    for (let i = 0; i < 4; i++) {
      if (eng.receptors[i] > 0) eng.receptors[i] -= dt * 6.0;
    }
    
    // 4. Update Screen shake and flash
    if (eng.screenShake > 0) eng.screenShake -= dt * 45;
    if (eng.flashRed > 0) eng.flashRed -= dt * 2.0;
    
    // 5. Update Wave Pulses progress
    for (let i = eng.waves.length - 1; i >= 0; i--) {
      const w = eng.waves[i];
      w.progress += w.speed * dt;
      
      // If a wave reaches center or exceeds receptor line without hitting
      if (w.progress >= 0.94) {
        if (!w.hit) {
          // Missed timing entirely!
          registerMiss();
        }
        eng.waves.splice(i, 1);
      }
    }
    
    // 6. Rendering
    ctx.save();
    if (eng.screenShake > 0) {
      ctx.translate((Math.random() - 0.5) * eng.screenShake, (Math.random() - 0.5) * eng.screenShake);
    }
    
    // Background color
    ctx.fillStyle = eng.dayMode ? '#ffffff' : '#05070f';
    ctx.fillRect(0, 0, W, H);
    
    // Draw concentric rhythm circles
    ctx.lineWidth = 1;
    // Intercept target line (0.8 progress)
    ctx.strokeStyle = eng.dayMode ? 'rgba(15, 23, 42, 0.15)' : 'rgba(255, 255, 255, 0.05)';
    ctx.beginPath();
    ctx.arc(cx, cy, maxRadius * 0.8, 0, Math.PI * 2);
    ctx.stroke();
    
    // Peripheral outer border boundary
    ctx.strokeStyle = eng.dayMode ? 'rgba(15, 23, 42, 0.3)' : 'rgba(255, 255, 255, 0.15)';
    ctx.beginPath();
    ctx.arc(cx, cy, maxRadius, 0, Math.PI * 2);
    ctx.stroke();
    
    // Center destination core
    ctx.fillStyle = eng.dayMode ? 'rgba(16, 185, 129, 0.2)' : 'rgba(16, 185, 129, 0.15)';
    ctx.beginPath();
    ctx.arc(cx, cy, 25, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw quadrant guide lines
    ctx.strokeStyle = eng.dayMode ? 'rgba(15, 23, 42, 0.05)' : 'rgba(255, 255, 255, 0.03)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(cx, cy - maxRadius); ctx.lineTo(cx, cy + maxRadius); // vertical
    ctx.moveTo(cx - maxRadius, cy); ctx.lineTo(cx + maxRadius, cy); // horizontal
    ctx.stroke();
    
    // Draw receptors (Top, Right, Bottom, Left)
    const angles = [-Math.PI / 2, 0, Math.PI / 2, Math.PI];
    const receptorRadius = maxRadius * 0.8;
    const labels = ['W', 'D', 'S', 'A'];
    
    for (let i = 0; i < 4; i++) {
      const angle = angles[i];
      const rx = cx + Math.cos(angle) * receptorRadius;
      const ry = cy + Math.sin(angle) * receptorRadius;
      
      // Glow background if tapped
      if (eng.receptors[i] > 0) {
        ctx.fillStyle = `rgba(6, 182, 212, ${eng.receptors[i] * 0.35})`;
        ctx.beginPath();
        ctx.arc(rx, ry, 26, 0, Math.PI * 2);
        ctx.fill();
      }
      
      // Outline receptor target ring
      ctx.strokeStyle = eng.receptors[i] > 0 ? '#06b6d4' : eng.dayMode ? '#0f172a' : '#1e293b';
      ctx.lineWidth = eng.receptors[i] > 0 ? 3.5 : 2;
      ctx.beginPath();
      ctx.arc(rx, ry, 18, 0, Math.PI * 2);
      ctx.stroke();
      
      // Draw key letters (W/A/S/D) inside target ring
      ctx.fillStyle = eng.dayMode ? '#0f172a' : '#94a3b8';
      ctx.font = 'bold 11px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(labels[i], rx, ry);
    }
    
    // Draw wave pulses (approaching inward from boundary to core)
    eng.waves.forEach(w => {
      if (w.hit) return;
      
      const angle = angles[w.quadrant];
      // Move inward: radius goes from maxRadius to 0.0
      // w.progress = 0.0 is outer, 0.8 is receptor, 1.0 is core
      const currentRadius = maxRadius * (1.0 - w.progress * 0.8);
      const wx = cx + Math.cos(angle) * currentRadius;
      const wy = cy + Math.sin(angle) * currentRadius;
      
      // Draw glowing pulse wave
      ctx.shadowColor = '#06b6d4';
      if (!eng.dayMode) {
        ctx.shadowBlur = 10;
      }
      ctx.fillStyle = '#06b6d4';
      ctx.beginPath();
      ctx.arc(wx, wy, 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
      
      // Pulse outline rings
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.5)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(wx, wy, 15, 0, Math.PI * 2);
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
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();
    }
    
    // Red flash screen overlay
    if (eng.flashRed > 0) {
      ctx.fillStyle = `rgba(239, 68, 68, ${eng.flashRed})`;
      ctx.fillRect(0, 0, W, H);
    }
    
    ctx.restore();
    animationRef.current = requestAnimationFrame(loop);
  };

  const startDrill = () => {
    if (audioSynth) audioSynth.init();
    
    const eng = engine.current;
    eng.timeLeft = DRILL_DURATION;
    eng.score = 0;
    eng.streak = 0;
    eng.maxStreak = 0;
    eng.perfectCount = 0;
    eng.goodCount = 0;
    eng.missCount = 0;
    eng.particles = [];
    eng.waves = [];
    eng.spawnTimer = 0;
    eng.spawnInterval = 1.6;
    
    setScore(0);
    setTimeLeft(DRILL_DURATION);
    setStreak(0);
    setLevel(1);
    setIsNewBest(false);
    setPerfectHits(0);
    setGoodHits(0);
    setMisses(0);
    
    setGameState('playing');
    isActiveRef.current = true;
    lastTimeRef.current = 0;
    
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    animationRef.current = requestAnimationFrame(loop);
  };

  const resetDrill = () => {
    isActiveRef.current = false;
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    setGameState('start');
    setTimeLeft(DRILL_DURATION);
  };

  // Resize canvas
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container) return;
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };
    
    if (gameState === 'playing') {
      handleResize();
      window.addEventListener('resize', handleResize);
    }
    return () => window.removeEventListener('resize', handleResize);
  }, [gameState]);

  useEffect(() => {
    return () => {
      isActiveRef.current = false;
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <div className={`min-h-screen ${dayMode ? 'bg-[#f8fafc] text-slate-900' : 'bg-[#030712] text-slate-100'} font-sans selection:bg-cyan-500/30 transition-colors duration-250`}>
      {!dayMode && <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/5 via-transparent to-black/30 pointer-events-none z-0" />}

      <div className={`${isFullscreen ? 'w-full h-screen p-0 m-0' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'} relative z-10`}>
        
        {/* Navigation Breadcrumbs */}
        {!isFullscreen && (
          <nav aria-label="Breadcrumb" className="mb-5">
            <ol className="flex items-center gap-2 text-[10px] text-slate-500 uppercase tracking-widest font-mono">
              <li><Link href="/" className="hover:text-cyan-400 transition-colors">Home</Link></li>
              <li><span className="text-slate-400">/</span></li>
              <li><Link href="/drills" className="hover:text-cyan-400 transition-colors">Drills Hub</Link></li>
              <li><span className="text-slate-400">/</span></li>
              <li><Link href="/drills/physical" className="hover:text-cyan-400 transition-colors">Physical Training</Link></li>
              <li><span className="text-slate-400">/</span></li>
              <li><Link href="/drills/physical/reflex-training" className="hover:text-cyan-400 transition-colors">Reflex Training</Link></li>
              <li><span className="text-slate-400">/</span></li>
              <li><span className="text-cyan-400 font-bold uppercase">Visual Rhythm Intercept</span></li>
            </ol>
          </nav>
        )}

        {/* Drill Header */}
        {!isFullscreen && (
          <div className={`flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6 border-b pb-5 ${dayMode ? 'border-slate-200' : 'border-slate-900'}`}>
            <div className="flex items-center gap-3.5">
              <div className={`p-3 border rounded-xl shadow-lg ${dayMode ? 'bg-white border-slate-200 text-cyan-600' : 'bg-cyan-950/30 border-cyan-500/20 text-cyan-500 shadow-cyan-950/20'}`}>
                <Activity className="w-7 h-7" />
              </div>
              <div>
                <h1 className={`text-xl sm:text-2xl font-black tracking-tight uppercase ${dayMode ? 'text-slate-900' : 'text-white'}`}>
                  Visual Rhythm Intercept
                </h1>
                <p className="text-xs text-slate-400 tracking-wider mt-0.5 font-mono uppercase">
                  Rhythmic timing reflex • Level {level}
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              {gameState === 'playing' && (
                <button 
                  onClick={resetDrill}
                  className={`p-2.5 rounded-lg border transition-all active:scale-95 ${dayMode ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50' : 'bg-[#0b0f19] border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'}`}
                  title="Reset Trial"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              )}
              <button 
                onClick={() => setSoundEnabled(!soundEnabled)}
                className={`p-2.5 rounded-lg border transition-all active:scale-95 ${dayMode ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50' : 'bg-[#0b0f19] border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'}`}
                title="Toggle Audio Cues"
              >
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>
              <button 
                onClick={() => setDayMode(!dayMode)}
                className={`p-2.5 rounded-lg border transition-all active:scale-95 ${dayMode ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50' : 'bg-[#0b0f19] border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'}`}
                title="Toggle Theme Mode"
              >
                {dayMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
              </button>
              <button 
                onClick={toggleFullscreen}
                className={`p-2.5 rounded-lg border transition-all active:scale-95 ${dayMode ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50' : 'bg-[#0b0f19] border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'}`}
                title="Toggle Viewport Fullscreen"
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
            </div>
          </div>
        )}

        {/* Dashboard Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
          
          {/* Settings Sidebar */}
          {!isFullscreen && (
            <div className={`lg:col-span-1 border rounded-2xl p-5 shadow-xl flex flex-col justify-between ${dayMode ? 'bg-white border-slate-200' : 'bg-[#0b0f19]/80 border-slate-900/90 backdrop-blur-md'}`}>
              <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-850 pb-2 mb-4 flex items-center gap-1.5 font-mono">
                  <Target className="w-3.5 h-3.5 text-cyan-400" />
                  Rhythm Controls
                </h3>

                <div className="space-y-4 font-mono text-xs text-slate-400">
                  <div className={`p-3 border rounded-xl ${dayMode ? 'bg-slate-50 border-slate-100' : 'bg-slate-950/60 border-slate-900'}`}>
                    <span className="block text-[9px] uppercase text-slate-500 mb-1">Receptors</span>
                    <span className={`font-bold ${dayMode ? 'text-slate-800' : 'text-white'}`}>4 Directional Lanes</span>
                  </div>
                  <div className={`p-3 border rounded-xl ${dayMode ? 'bg-slate-50 border-slate-100' : 'bg-slate-950/60 border-slate-900'}`}>
                    <span className="block text-[9px] uppercase text-slate-500 mb-1">Trigger Keys</span>
                    <span className={`font-bold ${dayMode ? 'text-slate-800' : 'text-white'}`}>W/A/S/D • Arrows • Taps</span>
                  </div>
                </div>
              </div>

              {/* Personal Best Info Card */}
              <div className={`mt-6 p-4 border rounded-xl font-mono text-xs ${dayMode ? 'bg-slate-50 border-slate-100' : 'bg-slate-950/60 border-slate-900'}`}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-slate-500 uppercase text-[9px]">Personal Best</span>
                  <Trophy className="w-3.5 h-3.5 text-yellow-500" />
                </div>
                <div className={`font-black text-base ${dayMode ? 'text-slate-800' : 'text-white'}`}>{bestScore} PTS</div>
              </div>
            </div>
          )}

          {/* Viewport Canvas Wrapper */}
          <div className={`${isFullscreen ? 'col-span-4' : 'lg:col-span-3'} flex flex-col`}>
            
            {/* Viewport HUD */}
            {!isFullscreen && (
              <div className="flex justify-between items-center mb-3 text-xs font-mono">
                <div className={`flex items-center gap-1 border rounded-lg px-3 py-1.5 ${dayMode ? 'bg-white border-slate-200' : 'bg-[#0b0f19]/60 border-slate-900'}`}>
                  <Activity className="w-3.5 h-3.5 text-cyan-500" />
                  <span className="text-slate-400 uppercase text-[9px] tracking-wider">Score:</span>
                  <span className={`font-bold ${dayMode ? 'text-slate-800' : 'text-white'}`}>{score}</span>
                  {streak >= 5 && (
                    <span className="ml-1 text-orange-400 font-extrabold animate-pulse">({streak}x)</span>
                  )}
                </div>

                <div className={`flex items-center gap-1 border rounded-lg px-3 py-1.5 ${dayMode ? 'bg-white border-slate-200' : 'bg-[#0b0f19]/60 border-slate-900'}`}>
                  <Clock className="w-3.5 h-3.5 text-yellow-500" />
                  <span className="text-slate-400 uppercase text-[9px] tracking-wider">Time Left:</span>
                  <span className={`font-bold ${timeLeft <= 8 ? 'text-red-500 animate-pulse' : dayMode ? 'text-slate-800' : 'text-white'}`}>
                    {timeLeft.toFixed(1)}s
                  </span>
                </div>
              </div>
            )}

            {/* Interactive Viewport Area */}
            <div 
              ref={containerRef} 
              className={
                isFullscreen 
                  ? 'fixed inset-0 z-50 bg-[#020306] flex items-center justify-center w-[100vw] h-[100vh]' 
                  : `relative w-full aspect-square max-w-[500px] mx-auto border rounded-2xl flex items-center justify-center shadow-2xl overflow-hidden ${dayMode ? 'bg-[#ffffff] border-slate-200' : 'bg-[#020306] border-slate-900'}`
              }
              style={{ touchAction: 'none' }}
              onPointerDown={handlePointerDown}
            >
              {/* Start Overlay Screen */}
              {gameState === 'start' && (
                <div className={`absolute inset-0 flex flex-col items-center justify-center p-6 z-30 select-none text-center ${dayMode ? 'bg-white/95 text-slate-800' : 'bg-[#05070e]/95 text-slate-100'}`}>
                  <div className="max-w-md">
                    <div className={`w-14 h-14 mx-auto mb-4 border rounded-full flex items-center justify-center shadow-lg ${dayMode ? 'bg-white border-slate-200 text-cyan-600' : 'bg-cyan-500/5 border-cyan-500/25 text-cyan-500 shadow-cyan-950/10'}`}>
                      <Activity className="w-6 h-6" />
                    </div>
                    
                    <h2 className={`text-lg font-black uppercase tracking-wider mb-2 font-mono ${dayMode ? 'text-slate-800' : 'text-white'}`}>
                      Visual Rhythm Intercept
                    </h2>
                    <p className="text-xs leading-relaxed mb-6 text-slate-450">
                      Rhythmic reflex and timing drill. Match keyboard key triggers (W, A, S, D or arrows) or tap quadrants exactly as incoming blue pulse wave orbits cross receptor targets. Success adds time; mistimings trigger a time penalty.
                    </p>

                    <button
                      onClick={startDrill}
                      className="px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold rounded-xl flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(6,182,212,0.4)] uppercase tracking-widest font-mono transition-all duration-300 active:scale-95 mx-auto"
                    >
                      <Play className="w-4 h-4 fill-white" />
                      Begin Intercept Trial
                    </button>
                  </div>
                </div>
              )}

              {/* Game Over Screen */}
              {gameState === 'gameOver' && (
                <div className={`absolute inset-0 flex flex-col items-center justify-center p-6 z-30 select-none text-center ${dayMode ? 'bg-white/98 text-slate-850' : 'bg-[#05070e]/98'}`}>
                  <div className="max-w-md w-full">
                    {isNewBest && (
                      <div className="inline-block bg-yellow-500 text-black text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-3 shadow-[0_0_15px_rgba(234,179,8,0.5)] font-mono animate-bounce">
                        ⭐ NEW PERSONAL BEST!
                      </div>
                    )}
                    
                    <h2 className={`text-xl font-black uppercase tracking-wider mb-1 font-mono ${dayMode ? 'text-slate-800' : 'text-white'}`}>
                      Trial Complete
                    </h2>
                    <p className="text-xs text-slate-500 uppercase tracking-widest mb-6 font-mono">
                      Max Difficulty reached: Level {level}
                    </p>

                    {/* Telemetry Diagnostics Block */}
                    <div className={`border p-4 mb-6 text-left shadow-inner rounded-xl ${dayMode ? 'bg-slate-50 border-slate-200' : 'bg-[#0a0a0a] border-cyan-900/50'}`}>
                      <h3 className="text-[10px] font-bold text-cyan-500 font-mono uppercase tracking-widest border-b border-cyan-900/20 pb-1.5 mb-3 flex items-center gap-2">
                        <BarChart3 className="w-3.5 h-3.5" />
                        COGNITIVE TELEMETRY DIAGNOSTICS
                      </h3>
                      <div className="grid grid-cols-1 gap-3 text-[10px] leading-relaxed text-slate-400">
                        <ul className="space-y-1.5">
                          <li className={`flex justify-between items-center p-1.5 rounded border ${dayMode ? 'bg-white border-slate-200 text-slate-700' : 'bg-gray-900/50 border-gray-800'}`}>
                            <span>Final Score:</span>
                            <span className="font-bold text-cyan-400 font-mono">{score} PTS</span>
                          </li>
                          <li className={`flex justify-between items-center p-1.5 rounded border ${dayMode ? 'bg-white border-slate-200 text-slate-700' : 'bg-gray-900/50 border-gray-800'}`}>
                            <span>Perfect Intercepts:</span>
                            <span className="font-bold text-green-400 font-mono">{perfectHits}</span>
                          </li>
                          <li className={`flex justify-between items-center p-1.5 rounded border ${dayMode ? 'bg-white border-slate-200 text-slate-700' : 'bg-gray-900/50 border-gray-800'}`}>
                            <span>Good Timing:</span>
                            <span className="font-bold text-blue-400 font-mono">{goodHits}</span>
                          </li>
                          <li className={`flex justify-between items-center p-1.5 rounded border ${dayMode ? 'bg-white border-slate-200 text-slate-700' : 'bg-gray-900/50 border-gray-800'}`}>
                            <span>Misses/Mistimings:</span>
                            <span className={`font-bold font-mono ${misses > 8 ? 'text-red-500' : 'text-yellow-500'}`}>{misses}</span>
                          </li>
                          <li className={`flex justify-between items-center p-1.5 rounded border ${dayMode ? 'bg-white border-slate-200 text-slate-700' : 'bg-gray-900/50 border-gray-800'}`}>
                            <span>Max Combo Streak:</span>
                            <span className="font-bold text-emerald-400 font-mono">{streak}x</span>
                          </li>
                        </ul>

                        <div className="border-t border-dashed border-gray-800 pt-2">
                          <span className="font-bold text-slate-300 uppercase text-[9px] tracking-wider block mb-1">Prescribed Advice:</span>
                          <p className="text-slate-400 text-[10px] font-sans">
                            {misses > 8 ? (
                              <span className="text-red-300">Your timing is out of sync or you are spamming inputs. Spamming keys registers instant misses and drains your master clock. Slow down and focus on matching keypresses exactly as the circles overlap.</span>
                            ) : (perfectHits / (perfectHits + goodHits + 0.1) >= 0.7 && perfectHits > 10) ? (
                              <span className="text-green-300">Phenomenal rhythmic accuracy! You are executing near-perfect orbital interceptions even at max speeds. Your temporal calibration is elite.</span>
                            ) : (
                              <span className="text-yellow-300">Good tempo control, but you are settling for 'Good' hit thresholds. Focus on matching the beats exactly at the 0.8 mark (outer ring overlay) to maximize your score multiplier.</span>
                            )}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={startDrill}
                        className="flex-1 py-3.5 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg uppercase tracking-widest font-mono transition-all duration-255 active:scale-95"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        Run Another Trial
                      </button>
                      <button 
                        onClick={() => { if (typeof window !== "undefined") { if (navigator.share) { navigator.share({ title: document.title, url: window.location.href }).catch(() => {}); } else { navigator.clipboard.writeText(window.location.href).then(() => alert("Link copied! Share it with your friends.")).catch(() => {}); } } }} 
                        className={`px-4 py-3.5 rounded-xl border text-xs flex items-center gap-1.5 font-bold uppercase transition-all active:scale-95 ${dayMode ? 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700' : 'bg-gray-800 border-gray-700 hover:bg-gray-750 text-sky-400'}`} 
                        title="Share this drill"
                      >
                        <Share2 className="w-3.5 h-3.5" />
                        Share
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Rendering Canvas */}
              {gameState === 'playing' && (
                <canvas 
                  ref={canvasRef} 
                  className="block w-full h-full cursor-pointer" 
                />
              )}
            </div>

            {/* Bottom status tip */}
            {!isFullscreen && (
              <div className="mt-3 text-center text-[10px] text-slate-500 flex items-center justify-center gap-2 font-mono">
                <Info className="w-3.5 h-3.5 text-slate-400" />
                <span>Synchronize key presses or taps with incoming pulses. Spawn speed scales up at higher levels.</span>
              </div>
            )}
          </div>
        </div>

        {/* Training Benefits */}
        {!isFullscreen && (
          <div className={`mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 border-t pt-8 ${dayMode ? 'border-slate-200' : 'border-slate-900'}`}>
            <div className={`md:col-span-2 border p-6 rounded-2xl flex flex-col justify-between ${dayMode ? 'bg-white border-slate-200' : 'bg-[#0b0f19]/40 border-slate-900'}`}>
              <div>
                <h3 className={`text-xs font-bold uppercase tracking-widest font-mono flex items-center gap-2 mb-3.5 ${dayMode ? 'text-slate-800' : 'text-white'}`}>
                  <Activity className="w-4 h-4 text-cyan-500" />
                  Rhythm-Reflex Dynamics
                </h3>
                <p className="text-xs leading-relaxed text-slate-400 mb-4 font-sans">
                  The Rhythm Intercept drill trains precise timing, rhythmic prediction, and high-frequency tactile response coordination. Esports athletes and traditional players rely on predicting spatial speed patterns and aligning inputs perfectly with dynamic triggers to improve action accuracy.
                </p>
              </div>
            </div>

            <div className={`border p-6 rounded-2xl ${dayMode ? 'bg-white border-slate-200' : 'bg-[#0b0f19]/40 border-slate-905'}`}>
              <h3 className={`text-xs font-bold uppercase tracking-widest font-mono flex items-center gap-2 mb-3.5 ${dayMode ? 'text-slate-800' : 'text-white'}`}>
                <Sparkles className="w-4 h-4 text-yellow-500" />
                TRAINING BENEFITS
              </h3>
              <ul className="space-y-3 text-xs text-slate-450 font-mono">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span><strong>Rhythm Consistency</strong>: Teaches temporal awareness and timing calibration.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span><strong>Multitasking</strong>: Enhances visual scanning across 4 separate threat lanes.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span><strong>Error Correction</strong>: Teaches immediate stabilization and recovery under pressure.</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* ABOUT THIS DRILL SECTION */}
        {!isFullscreen && (
          <section className="mt-10">
            <div className={`rounded-2xl border overflow-hidden shadow-2xl ${dayMode ? 'bg-white border-slate-200' : 'bg-gray-900 border-gray-800'}`}>
              <div className={`px-6 py-5 border-b flex items-center gap-3 ${dayMode ? 'bg-slate-50/50 border-slate-200' : 'bg-black/40 border-gray-800'}`}>
                <Info className="w-5 h-5 text-cyan-400" />
                <h2 className={`font-bold text-lg tracking-wide ${dayMode ? 'text-slate-800' : 'text-white'}`}>Drill Instructions & Scoring</h2>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-5">
                  <RuleItem num="1" color="green" text="Perfect Intercept" highlight="+30 * Level PTS | +1.5s" result="Overlap within 5% distance" />
                  <RuleItem num="2" color="blue" text="Good Intercept" highlight="+15 * Level PTS | +0.8s" result="Overlap within 12% distance" />
                </div>
                <div className="space-y-5">
                  <RuleItem num="3" color="red" text="Miss / Mistiming" highlight="-2.0s Time Penalty" result="Score remains non-negative" />
                  <RuleItem num="4" color="purple" text="Quadrant Guides" highlight="Keyboard or Mobile Taps" result="W-A-S-D or Arrow inputs" />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ABOUT DRILL EXPLAINER */}
        {!isFullscreen && (
          <section className="mt-12" aria-label="About this drill">
            <div className={`rounded-2xl border overflow-hidden shadow-xl ${dayMode ? 'bg-white border-slate-200' : 'bg-gray-900 border-gray-800'}`}>
              <div className={`px-6 py-5 border-b flex items-center gap-3 ${dayMode ? 'bg-slate-50/50 border-slate-200' : 'bg-black/40 border-gray-800'}`}>
                <GraduationCap className="w-5 h-5 text-cyan-400" />
                <h2 className={`font-bold text-lg tracking-wide ${dayMode ? 'text-slate-800' : 'text-white'}`}>About Visual Rhythm Intercept</h2>
              </div>
              <div className="p-8">
                <p className="text-sm leading-relaxed mb-6 text-slate-400">
                  This free visual rhythm intercept game trains temporal tracking and rhythmic prediction by challenging players to trigger directional targets exactly as incoming orbital pulses overlap with guides. The physics engine measures the absolute coordinate overlap distance, teaching gamers to build accurate timing muscle memory.
                </p>

                {/* Grid Section */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
                  <div className={`p-5 rounded-xl border ${dayMode ? 'bg-slate-50 border-slate-100' : 'bg-black/40 border-gray-800'}`}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center"><Users className="w-4 h-4 text-white" /></div>
                      <h3 className={`text-sm font-bold ${dayMode ? 'text-slate-800' : 'text-white'}`}>Who It's For</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-slate-500">Esports athletes, rhythm game enthusiasts, and players seeking to sharpen temporal button-press timing.</p>
                  </div>
                  <div className={`p-5 rounded-xl border ${dayMode ? 'bg-slate-50 border-slate-100' : 'bg-black/40 border-gray-800'}`}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-green-600 flex items-center justify-center"><TrendingUp className="w-4 h-4 text-white" /></div>
                      <h3 className={`text-sm font-bold ${dayMode ? 'text-slate-800' : 'text-white'}`}>Skills Improved</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-slate-500">Rhythmic visual tracking, reaction timing synchronization, spatial prediction, and fast keyboard coordination.</p>
                  </div>
                  <div className={`p-5 rounded-xl border ${dayMode ? 'bg-slate-50 border-slate-100' : 'bg-black/40 border-gray-800'}`}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center"><BarChart3 className="w-4 h-4 text-white" /></div>
                      <h3 className={`text-sm font-bold ${dayMode ? 'text-slate-800' : 'text-white'}`}>What You'll Track</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-slate-500">Final score, total perfect hits, good timing hits, combo streaks, and missed targets.</p>
                  </div>
                </div>

                {/* How to Play & Scoring */}
                <div className={`border rounded-xl p-6 mb-8 ${dayMode ? 'bg-slate-50 border-slate-200' : 'bg-[#0b0f19]/40 border-slate-800'}`}>
                  <h3 className={`text-base font-bold uppercase tracking-wider mb-4 flex items-center gap-2 ${dayMode ? 'text-slate-800' : 'text-white'}`}>
                    <Target className="w-5 h-5 text-cyan-500" /> How to Play & Scoring
                  </h3>
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                  <div className="flex items-center gap-3 mb-4">
                    <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">Frequently Asked Questions</h3>
                  </div>
                  <div className="space-y-5">
                    <div>
                      <h4 className="text-sm font-bold text-gray-200 tracking-tight">What is the Visual Rhythm Intercept drill?</h4>
                      <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">A timing and rhythm-based reflex trainer. Align keyboard actions (W/A/S/D or arrow keys) or tap sectors with incoming orbital pulses. Intercepting pulses at perfect overlap rewards you with score bonuses and time extensions.</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-200 tracking-tight">What are the score and time adjustments in Rhythm Intercept?</h4>
                      <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">Perfect intercept adds +1.5s; Good intercept adds +0.8s; any missed timing or misclick triggers a -2.0s penalty. The score scales based on level, and there is no negative scoring.</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-200 tracking-tight">What skills are trained by this rhythmic reflex game?</h4>
                      <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">It trains precise timing, rhythmic visual prediction, high-frequency tactile response coordination, multi-quadrant scanning, and stress stabilization.</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-200 tracking-tight">Do I need any special hardware or downloads for this game?</h4>
                      <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">No. This game works directly inside standard desktop and mobile browsers, requiring no registration, configuration, or software downloads.</p>
                    </div>
                  </div>
                </div>
                </div>

                {/* FAQ Section */}
                <div className={`p-5 rounded-xl border ${dayMode ? 'bg-slate-50 border-slate-100' : 'bg-black/40 border-gray-800'}`}>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className={`text-sm font-bold ${dayMode ? 'text-slate-850' : 'text-gray-200'}`}>Can I use mobile touch controls?</h4>
                      <p className="text-xs text-slate-400 mt-1">Yes! You can tap directly on the Top, Right, Bottom, or Left quadrants on the screen. The game automatically adapts to touch gestures and registers quadrant overlaps.</p>
                    </div>
                    <div>
                      <h4 className={`text-sm font-bold ${dayMode ? 'text-slate-850' : 'text-gray-200'}`}>How do levels change the game speed?</h4>
                      <p className="text-xs text-slate-400 mt-1">Every 250 points, the engine levels up. Higher levels reduce the pulse spawn interval (from 1.6s down to 0.7s) and accelerate pulse speeds, putting your temporal reflexes to the ultimate test.</p>
                    </div>
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
              <RelatedCard href="/drills/physical/reflex-training/peripheral-threat-sweeper" title="Peripheral Sweeper" desc="Scan and intercept peripheral targets." color="rose" icon={<Eye className="w-4 h-4" />} />
              <RelatedCard href="/drills/physical/coordination/dynamic-grid-evasion" title="Grid Evasion" desc="Evade warning blast zones inside 3x3 grids." color="cyan" icon={<Grid className="w-4 h-4" />} />
              <RelatedCard href="/drills/motor/timing-accuracy/velocity-matcher" title="Velocity Matcher" desc="Match rotation speed of orbital nodes." color="orange" icon={<Timer className="w-4 h-4" />} />
              <RelatedCard href="/drills/motor/hand-eye-coordination/precision-flick-shot" title="Flick Shot Trainer" desc="Snap onto rapid shrinking targets." color="blue" icon={<Crosshair className="w-4 h-4" />} />
            </div>
          </section>
        )}

        {/* FOOTER SECTION */}
        {!isFullscreen && (
          <footer className={`mt-12 border text-slate-500 rounded-xl py-10 px-6 font-mono text-[10px] ${dayMode ? 'bg-slate-100 border-slate-200' : 'bg-slate-950/40 border-slate-900'}`} role="contentinfo">
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
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
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

function RuleItem({ num, color, text, highlight = '', result }) {
  const colorMap = { 
    blue: 'bg-blue-600 text-blue-305 border-blue-500', 
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
