'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';

import { 
  Activity, AlertCircle, ArrowRight, BarChart3, ChevronRight, 
  Clock, Crosshair, Eye, GraduationCap, Info, Lightbulb, 
  Maximize2, Minimize2, Play, RefreshCw, Target, 
  Timer, TrendingUp, Trophy, Volume2, VolumeX, 
  Share2, CheckCircle2, Zap, Users, Sparkles, XCircle, Waves, Move
} from 'lucide-react';

// ============================================================
// ZERO-LATENCY AUDIO SYNTHESIZER
// ============================================================
class AudioSynthesizer {
  constructor() {
    this.ctx = null;
    this.enabled = true;
    this.heartbeatTimer = 0;
  }
  
  init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
  }

  playLock() {
    if (!this.enabled || !this.ctx) return;
    try {
      if (this.ctx.state === 'suspended') this.ctx.resume();
      const o = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      o.connect(g); g.connect(this.ctx.destination);
      const n = this.ctx.currentTime;
      
      o.type = 'sine';
      o.frequency.setValueAtTime(880, n);
      g.gain.setValueAtTime(0.05, n);
      g.gain.exponentialRampToValueAtTime(0.001, n + 0.1);
      
      o.start(n); o.stop(n + 0.1);
    } catch (e) {}
  }

  playComboUp() {
    if (!this.enabled || !this.ctx) return;
    try {
      if (this.ctx.state === 'suspended') this.ctx.resume();
      const o = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      o.connect(g); g.connect(this.ctx.destination);
      const n = this.ctx.currentTime;
      
      o.type = 'sine';
      o.frequency.setValueAtTime(440, n);
      o.frequency.exponentialRampToValueAtTime(1046, n + 0.3);
      g.gain.setValueAtTime(0.1, n);
      g.gain.exponentialRampToValueAtTime(0.001, n + 0.4);
      
      o.start(n); o.stop(n + 0.4);
    } catch (e) {}
  }

  playHeartbeat() {
    if (!this.enabled || !this.ctx) return;
    try {
      const n = this.ctx.currentTime;
      if (n - this.heartbeatTimer < 0.6) return; // throttle beats
      this.heartbeatTimer = n;

      const o = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      o.connect(g); g.connect(this.ctx.destination);
      
      o.type = 'sine';
      o.frequency.setValueAtTime(60, n);
      o.frequency.exponentialRampToValueAtTime(40, n + 0.2);
      g.gain.setValueAtTime(0.3, n);
      g.gain.exponentialRampToValueAtTime(0.001, n + 0.4);
      
      o.start(n); o.stop(n + 0.4);
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
export default function FineMotorClient() {
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
  const [accuracy, setAccuracy] = useState(100);
  const [combo, setCombo] = useState(1.0);
  const [phase, setPhase] = useState('Warm-up');

  // Analytics State
  const [analytics, setAnalytics] = useState({
    accuracy: 100,
    maxStreak: 0,
    consistencyScore: 0,
    gradeData: { grade: 'D', color: 'text-slate-500', advice: '' }
  });

  // === High-performance Mutable Refs ===
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  const pageRef = useRef(null);
  
  // === Game Logic Engine Refs ===
  const engine = useRef({
    virtualCrosshair: { x: 0, y: 0 },
    points: [],
    crosshairInit: false,
    
    // Increased base difficulty parameters
    scrollPos: 0,
    scrollSpeed: 250, // Started higher
    amplitude: 150,
    frequency: 0.4,   // Tighter waves initially
    microJitter: 5,   // Baseline jitter
    phaseOffset: 0,
    flowTime: 0,
    
    isLocked: false,
    isActive: false,
    
    score: 0,
    streakFrames: 0,
    bestStreakFrames: 0,
    comboMultiplier: 1.0,
    
    totalFrames: 0,
    lockedFrames: 0,
    timeLeft: DRILL_DURATION
  });

  const cmPer360 = (30 / universalSens).toFixed(1);

  // === Initialization & Local Storage ===
  useEffect(() => {
    try {
      const savedSens = localStorage.getItem('fineMotor_sens');
      if (savedSens) setUniversalSens(parseFloat(savedSens));
      const savedBest = localStorage.getItem('fineMotor_bestScore2');
      if (savedBest) setBestScore(parseInt(savedBest, 10));
    } catch (e) {}
  }, []);

  useEffect(() => {
    if (gameState !== 'playing') {
      try { localStorage.setItem('fineMotor_sens', universalSens.toString()); } catch (e) {}
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

  // === Core Game Management ===
  const endGame = useCallback(() => {
    setGameState('gameOver');
    const e = engine.current;
    e.isActive = false;
    if (document.pointerLockElement) document.exitPointerLock();
    
    const finalAccuracy = e.totalFrames > 0 ? Math.round((e.lockedFrames / e.totalFrames) * 100) : 0;
    const consistency = Math.round((e.bestStreakFrames / Math.max(1, e.totalFrames)) * 100);

    let grade = 'D';
    let gradeColor = 'text-gray-400';
    let advice = 'Keep practicing! Your hand is very jittery. Lower your sensitivity and focus on smooth, relaxed wrist movements.';
    
    if (finalAccuracy >= 95 && consistency >= 50) {
      grade = 'S+';
      gradeColor = 'text-yellow-400';
      advice = 'Elite Smoothness! Your fine motor control and micro-tracking are surgically precise. You easily handled the Adrenaline Mode chaos.';
    } else if (finalAccuracy >= 85 && consistency >= 30) {
      grade = 'S';
      gradeColor = 'text-yellow-500';
      advice = 'Outstanding tracking! You have incredibly stable hand control. Try to push your combo higher in the Extreme phase to break S+ tier.';
    } else if (finalAccuracy >= 75 && consistency >= 20) {
      grade = 'A';
      gradeColor = 'text-fuchsia-400';
      advice = 'Great tracking stability! You struggled slightly during the micro-jitter sections. Focus on preventing over-corrections.';
    } else if (finalAccuracy >= 60) {
      grade = 'B';
      gradeColor = 'text-cyan-400';
      advice = 'Good fundamentals. You are letting your combo reset too often. Aim for consistency by keeping your crosshair dead center on the path.';
    } else if (finalAccuracy >= 40) {
      grade = 'C';
      gradeColor = 'text-indigo-400';
      advice = 'Average performance. Your path tracking is erratic. Relax your grip on the mouse to stop micro-stutters.';
    }

    setAnalytics({
      accuracy: finalAccuracy,
      maxStreak: Math.round(e.bestStreakFrames / 60), // Approx seconds
      consistencyScore: consistency,
      gradeData: { grade, color: gradeColor, advice }
    });

    setBestScore(prev => {
      const finalScore = Math.floor(e.score);
      if (finalScore > prev) {
        setIsNewBest(true);
        try { localStorage.setItem('fineMotor_bestScore2', finalScore.toString()); } catch(err){}
        return finalScore;
      }
      return prev;
    });
  }, []);

  const addNewPoint = useCallback((cvs, index) => {
    const e = engine.current;
    const pts = e.points;
    const lastP = pts.length > 0 ? pts[pts.length - 1] : { x: cvs.width / 2, y: cvs.height };
    const t = index * 0.12 + e.phaseOffset + e.flowTime * 0.1;
    
    // Procedural Wave Generation (Dynamic based on phase/score)
    const wave1 = Math.sin(t * e.frequency) * e.amplitude;
    const wave2 = Math.cos(t * e.frequency * 1.7) * (e.amplitude * 0.4);
    const wave3 = Math.sin(t * e.frequency * 3.2) * (e.amplitude * 0.2);
    
    // Jitter added in Advanced/Adrenaline modes
    const jitter = e.microJitter > 0 ? (Math.random() - 0.5) * e.microJitter : 0;
    
    pts.push({ x: cvs.width / 2 + wave1 + wave2 + wave3 + jitter, y: lastP.y - 120 });
  }, []);

  const initPoints = useCallback((cvs) => { 
    engine.current.points = []; 
    engine.current.phaseOffset = Math.random() * Math.PI * 2; 
    engine.current.flowTime = 0; 
    for (let i = 0; i < 30; i++) addNewPoint(cvs, i); 
  }, [addNewPoint]);

  const startGame = useCallback(async () => {
    if (audioSynth) audioSynth.init(); 

    setIsNewBest(false);
    setScore(0);
    setCombo(1.0);
    setAccuracy(100);
    setPhase('Warm-up');
    setTimeLeft(DRILL_DURATION);
    setGameState('playing');
    
    engine.current = {
      virtualCrosshair: { x: window.innerWidth / 2, y: window.innerHeight / 2 },
      points: [],
      crosshairInit: false,
      
      // Resetting to the new harder baseline
      scrollPos: 0,
      scrollSpeed: 250,
      amplitude: 150,
      frequency: 0.4,
      microJitter: 5,
      phaseOffset: 0,
      flowTime: 0,
      
      isLocked: false,
      isActive: true,
      
      score: 0,
      streakFrames: 0,
      bestStreakFrames: 0,
      comboMultiplier: 1.0,
      
      totalFrames: 0,
      lockedFrames: 0,
      timeLeft: DRILL_DURATION
    };

    if (containerRef.current && !document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(()=>{});
    }
    setTimeout(() => {
      if (canvasRef.current && !document.pointerLockElement) {
        canvasRef.current.requestPointerLock().catch(()=>{});
        initPoints(canvasRef.current);
        engine.current.crosshairInit = true;
      }
    }, 150);
  }, [initPoints]);

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
      const ch = engine.current.virtualCrosshair;
      ch.x = Math.max(0, Math.min(cvs.width, ch.x + dx));
      ch.y = Math.max(0, Math.min(cvs.height, ch.y + dy));
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, [gameState, pointerLocked, universalSens]);

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
          if (!engine.current.crosshairInit) {
            engine.current.virtualCrosshair = { x: width / 2, y: height / 2 };
          }
          initPoints(cvs);
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

      if (gameState === 'playing' && pointerLocked && e.isActive) {
        
        e.timeLeft = Math.max(0, e.timeLeft - dt);
        const elapsed = DRILL_DURATION - e.timeLeft;
        
        if (e.timeLeft <= 0) {
          endGame();
          return;
        }

        // ==========================================
        // AGGRESSIVE SCORE & TIME-BASED DIFFICULTY SCALING
        // ==========================================
        let currentPhase = 'Warm-up';
        
        // Base Physics scale significantly higher off time AND score
        let targetScroll = 250 + (elapsed * 4) + (e.score * 0.15); // Steeper speed increase
        let targetAmp = 150 + (elapsed * 4) + (e.score * 0.02);
        let targetFreq = 0.4 + (elapsed * 0.01) + (e.score * 0.0005); // Waves get rapidly tighter
        let targetJitter = 5 + (e.score * 0.015); // Jitter scales directly with score

        if (elapsed > 45) {
          currentPhase = 'Adrenaline';
          targetScroll += 200;
          targetFreq += 0.25;
          targetJitter += 35; // Severe erratic path shaking
          if (audioSynth) audioSynth.playHeartbeat();
        } else if (elapsed > 30) {
          currentPhase = 'Advanced';
          targetScroll += 100;
          targetFreq += 0.1;
          targetJitter += 15;
        } else if (elapsed > 15) {
          currentPhase = 'Dynamic';
          targetScroll += 50;
          targetJitter += 5;
        }

        // Apply smooth interpolation to physics parameters
        e.scrollSpeed += (targetScroll - e.scrollSpeed) * dt;
        e.amplitude += (targetAmp - e.amplitude) * dt;
        e.frequency += (targetFreq - e.frequency) * dt;
        e.microJitter = targetJitter;

        e.scrollPos += e.scrollSpeed * dt;
        e.flowTime += dt;

        // Add new points as path scrolls down
        const points = e.points;
        if (points[points.length - 1].y + e.scrollPos > -200) { 
          e.phaseOffset += 0.015; 
          addNewPoint(cvs, points.length); 
        }

        e.totalFrames++;
        let onPath = false;
        const ch = e.virtualCrosshair;

        // Path Collision Check (Distance to line segment)
        for (let i = 0; i < points.length - 1; i++) {
          const p1 = { x: points[i].x, y: points[i].y + e.scrollPos };
          const p2 = { x: points[i + 1].x, y: points[i + 1].y + e.scrollPos };
          
          if (ch.y >= p2.y && ch.y <= p1.y) { 
            const t = (ch.y - p1.y) / (p2.y - p1.y); 
            const px = p1.x + t * (p2.x - p1.x);
            
            // DYNAMIC HITBOX: Shrinks from 10px down to a minimum of 4px as score rises
            const currentHitbox = Math.max(4.0, 10.0 - (e.score * 0.003)); 
            
            if (Math.abs(ch.x - px) <= currentHitbox) { 
              onPath = true; 
              break; 
            } 
          }
        }

        const wasLocked = e.isLocked; 
        e.isLocked = onPath; 
        
        // Initial Lock audio
        if (onPath && !wasLocked && audioSynth) audioSynth.playLock();
        
        if (onPath) { 
          e.lockedFrames++; 
          e.streakFrames++; 
          if (e.streakFrames > e.bestStreakFrames) e.bestStreakFrames = e.streakFrames; 
          
          // Combo Multiplier Logic
          let newCombo = 1.0;
          if (e.streakFrames > 600) newCombo = 3.0; // 10 seconds
          else if (e.streakFrames > 300) newCombo = 2.0; // 5 seconds
          else if (e.streakFrames > 180) newCombo = 1.5; // 3 seconds
          else if (e.streakFrames > 60) newCombo = 1.2; // 1 second
          
          if (newCombo > e.comboMultiplier) {
            e.comboMultiplier = newCombo;
            if (audioSynth) audioSynth.playComboUp();
          }

          // Point Accumulation: 10 pts per sec * Combo
          e.score += (10 * e.comboMultiplier) * dt; 
          
        } else { 
          // Off-path logic: Reset combo, streak
          if (wasLocked) {
            setFlashBg('red');
            setTimeout(() => setFlashBg(null), 100);
            e.comboMultiplier = 1.0;
            e.streakFrames = 0;
            // Negative penalty logic handled implicitly by stopping score gain 
            // and combo reset. User requested no negative scoring.
          }
        }

        // Cleanup old points
        if (points[0].y + e.scrollPos > cvs.height + 250) points.shift();

        // UI Sync Throttle
        if (e.totalFrames % 10 === 0) {
          setScore(Math.floor(e.score));
          setCombo(e.comboMultiplier);
          setPhase(currentPhase);
          setTimeLeft(e.timeLeft);
          setAccuracy(Math.round((e.lockedFrames / e.totalFrames) * 100));
        }
      }

      // --- RENDERING PHASE ---
      ctx.save();

      // Adrenaline Screen Shake
      if (gameState === 'playing' && e.timeLeft <= 15) {
        const shake = Math.sin(time * 0.05) * 3;
        ctx.translate((Math.random() - 0.5) * shake, (Math.random() - 0.5) * shake);
      }

      ctx.fillStyle = e.isLocked ? "#05060b" : "#1a0505";
      ctx.fillRect(0, 0, cvs.width, cvs.height); 
      
      ctx.lineJoin = "round"; 
      ctx.lineCap = "round";
      
      // Grid
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.05)';
      ctx.lineWidth = 1;
      for (let i = 0; i < cvs.width; i += 50) {
        ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, cvs.height); ctx.stroke();
      }
      for (let j = 0; j < cvs.height; j += 50) {
        ctx.beginPath(); ctx.moveTo(0, j); ctx.lineTo(cvs.width, j); ctx.stroke();
      }

      // Draw Path
      if (e.points.length > 0) {
        ctx.beginPath(); 
        ctx.lineWidth = 14;
        ctx.strokeStyle = e.isLocked ? "#ffffff" : "#ff2222";
        
        const pts = e.points; 
        ctx.moveTo(pts[0].x, pts[0].y + e.scrollPos);
        for (let i = 0; i < pts.length - 1; i++) { 
          ctx.quadraticCurveTo(
            pts[i].x, pts[i].y + e.scrollPos, 
            (pts[i].x + pts[i+1].x) / 2, (pts[i].y + pts[i+1].y) / 2 + e.scrollPos
          ); 
        }
        ctx.stroke();
        
        if (e.isLocked) { 
          ctx.shadowBlur = 20; 
          ctx.shadowColor = "#3b82f6"; 
          ctx.stroke(); 
          ctx.shadowBlur = 0; 
        }
      }

      // Adrenaline Pulse Effect
      if (gameState === 'playing' && e.timeLeft <= 15) {
        const pulse = Math.sin(time * 0.01) * 0.15 + 0.15;
        ctx.fillStyle = `rgba(239, 68, 68, ${pulse})`;
        ctx.fillRect(0, 0, cvs.width, cvs.height);
      }

      // Draw Crosshair
      const ch = e.virtualCrosshair;
      if (ch && ch.x > 0 && ch.x < cvs.width && ch.y > 0 && ch.y < cvs.height && (gameState === 'playing' || gameState === 'start')) {
        const cc = e.isLocked ? '#00ff88' : pointerLocked ? '#ffffff' : '#ff4444';
        
        ctx.beginPath(); ctx.arc(ch.x, ch.y, 10, 0, Math.PI * 2); 
        ctx.strokeStyle = cc; ctx.lineWidth = 2; ctx.stroke();
        
        ctx.beginPath(); ctx.arc(ch.x, ch.y, 4, 0, Math.PI * 2); 
        ctx.fillStyle = cc; ctx.fill();
        
        ctx.strokeStyle = e.isLocked ? "rgba(0, 255, 136, 0.3)" : "rgba(255, 34, 34, 0.3)"; 
        ctx.lineWidth = 1.5;
        ctx.beginPath(); 
        ctx.moveTo(ch.x - 20, ch.y); ctx.lineTo(ch.x - 14, ch.y); 
        ctx.moveTo(ch.x + 14, ch.y); ctx.lineTo(ch.x + 20, ch.y);
        ctx.moveTo(ch.x, ch.y - 20); ctx.lineTo(ch.x, ch.y - 14); 
        ctx.moveTo(ch.x, ch.y + 14); ctx.lineTo(ch.x, ch.y + 20); 
        ctx.stroke();
      }

      ctx.restore();
      animationRef.current = requestAnimationFrame(loop);
    };

    animationRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animationRef.current);
      resizeObserver.disconnect();
    };
  }, [gameState, pointerLocked, addNewPoint, initPoints, endGame]);

  const shareScore = useCallback(async () => {
    const text = `🎯 I scored ${score} PTS (Grade: ${analytics.gradeData.grade}) in the Sequence Aim Trainer! Accuracy: ${analytics.accuracy}%, Max Combo: ${combo}x. Practice mouse control at skilldrills.online!`;
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({ title: 'My Fine Motor Score', text, url: 'https://skilldrills.online/drills/motor/precision-control/fine-motor' });
      } catch (e) {}
    } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      alert('Score card copied to clipboard!');
    }
  }, [score, analytics, combo]);

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
                <li className="text-blue-400 font-medium">Fine Motor Control</li>
              </ol>
            </nav>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                  <Waves className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Sequence Aim Trainer</h1>
                  <p className="text-sm text-gray-400 mt-1 font-medium">Mouse Precision Test • Smooth Aim Practice</p>
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
            <StatCard icon={<Trophy className="text-blue-400" />} value={score} label="Score" />
            <StatCard icon={<Zap className="text-yellow-400" />} value={`${combo.toFixed(1)}x`} label="Combo" highlight={combo >= 1.5} />
            <StatCard icon={<TrendingUp className={phase === 'Adrenaline' ? 'text-red-500 animate-pulse' : 'text-purple-400'} />} value={phase} label="Phase" />
            <StatCard icon={<Target className="text-green-500" />} value={`${accuracy}%`} label="Accuracy" />
            <StatCard icon={<Timer className={timeLeft <= 15 ? 'text-red-500 animate-pulse' : 'text-cyan-400'} />} value={timeLeft.toFixed(1)} label="Time" unit="s" />
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
                className={`h-full ${timeLeft <= 15 ? 'bg-red-500 animate-pulse' : 'bg-blue-500'}`}
                style={{ width: `${Math.min(100, (timeLeft / DRILL_DURATION) * 100)}%` }} 
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
                    <p className="text-2xl font-black text-yellow-400 leading-none">{combo.toFixed(1)}x</p>
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
                <AlertCircle className="w-12 h-12 text-blue-500 mx-auto mb-4" />
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
                  Sequence Aim Trainer
                </h2>
                <p className="text-xs text-slate-500 uppercase tracking-widest mb-6">
                  Mouse Precision Training • Cursor Control
                </p>

                <div className="grid grid-cols-2 gap-3 mb-6 text-left">
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Objective</span>
                    <span className="text-sm font-black text-white">Path Tracking</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Reward</span>
                    <span className="text-sm font-black text-green-400">Combo Multiplier</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Penalty</span>
                    <span className="text-sm font-black text-red-400">Combo Reset</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Mechanic</span>
                    <span className="text-sm font-black text-blue-400">Endless Wave</span>
                  </div>
                </div>

                <div className="bg-[#0b0f19] border border-slate-850 p-4 rounded-xl mb-4 text-left text-xs text-slate-400">
                  <span className="text-xs font-bold text-white block uppercase mb-1 flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-blue-500" /> Mouse Accuracy Test
                  </span>
                  <ul className="list-disc pl-4 space-y-1 text-[10px] text-slate-500 leading-relaxed">
                    <li>Keep your crosshair strictly inside the glowing white line.</li>
                    <li>Staying on the path builds your multiplier up to 3.0x.</li>
                    <li>Slipping off the line resets your combo to 1.0x (No point loss).</li>
                    <li>Prepare for Adrenaline Mode in the final 15 seconds!</li>
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
                    className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500" 
                  />
                </div>

                <button
                  onClick={startGame}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg uppercase tracking-widest transition-all duration-200 active:scale-95"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  Begin Precision Drill
                </button>
              </div>
            </div>
          )}

          {/* GAME OVER DASHBOARD */}
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
                  Final Phase: {analytics.phaseReached}
                </p>

                <div className="grid grid-cols-3 gap-2.5 mb-6 text-left">
                  <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
                    <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Final Score</span>
                    <span className="text-base font-black text-white">{score}</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
                    <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Tracking Acc</span>
                    <span className="text-base font-black text-white">{analytics.accuracy}%</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
                    <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Max Streak</span>
                    <span className="text-base font-black text-green-400">{analytics.maxStreak}s</span>
                  </div>
                  
                  <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
                    <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Consistency</span>
                    <span className="text-base font-black text-cyan-400">{analytics.consistencyScore}%</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
                    <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Time Alive</span>
                    <span className="text-base font-black text-purple-400">60s</span>
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
                    <Sparkles className="w-3 h-3 text-blue-400" /> Analytics Advice:
                  </div>
                  <p className="text-[10px] text-slate-400 leading-normal">
                    {analytics.gradeData.advice}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={startGame}
                    className="flex-1 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg uppercase tracking-widest transition-all duration-200 active:scale-95"
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
                <Info className="w-5 h-5 text-blue-400" /><h2 className="font-bold text-white text-lg tracking-wide">Game Rules & Combo Scoring</h2>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-5">
                  <RuleItem num="1" color="green" text="Continuous Flow" highlight="Builds Combo" result="Multiplier up to 3.0x" />
                  <RuleItem num="2" color="indigo" text="Zero Negative Scoring" highlight="No Point Deductions" result="Points only go up, never down" />
                </div>
                <div className="space-y-5">
                  <RuleItem num="3" color="red" text="Off-Path Penalty" highlight="Combo Reset" result="Flash red and start at 1.0x" />
                  <RuleItem num="4" color="blue" text="Adaptive Difficulty" highlight="Adrenaline Mode" result="Faster waves & screen pulse" />
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
                <GraduationCap className="w-5 h-5 text-blue-400" />
                <h2 className="font-bold text-white text-lg tracking-wide">About the Sequence Aim Trainer</h2>
              </div>
              
              <div className="p-8 space-y-8">
                <section>
                  <h2 className="text-xl font-bold text-white mb-3">Mastering the Mouse Accuracy Test</h2>
                  <p className="text-sm leading-relaxed mb-4">
                    This free cursor control game online is designed to test your fine motor skills and smooth pursuit tracking to the absolute limit. By demanding you keep your cursor perfectly aligned on a dynamically shifting wave path, it isolates the micro-muscles in your wrist required for surgical mouse precision. There is no negative scoring—your goal is to stay locked on the path to build massive combo multipliers. As time progresses, the game scales endlessly into Adrenaline Mode, forcing faster reaction times and erratic target tracking.
                  </p>
                </section>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
                  <div className="p-5 rounded-xl border bg-black/40 border-gray-800">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center"><Users className="w-4 h-4 text-white" /></div>
                      <h3 className="text-sm font-bold text-white">Who Should Play</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-slate-400">FPS gamers seeking smooth aim practice, digital artists looking to refine mouse control, and anyone testing their hand eye coordination.</p>
                  </div>
                  <div className="p-5 rounded-xl border bg-black/40 border-gray-800">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-green-600 flex items-center justify-center"><TrendingUp className="w-4 h-4 text-white" /></div>
                      <h3 className="text-sm font-bold text-white">Skills Targeted</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-slate-400">Improves smooth tracking aim, cursor accuracy, visual spatial coordinate snapping, and high-pressure motor steadiness.</p>
                  </div>
                  <div className="p-5 rounded-xl border bg-black/40 border-gray-800">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center"><BarChart3 className="w-4 h-4 text-white" /></div>
                      <h3 className="text-sm font-bold text-white">What You'll Track</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-slate-400">Total gamified score, your path accuracy percentage, maximum combo streaks, consistency metrics, and performance grade.</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#0b0f19] border-t border-gray-800 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Lightbulb className="w-6 h-6 text-yellow-400" />
                  <h2 className="text-xl font-bold text-white">Frequently Asked Questions</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FAQItem q="What is Fine Motor Skills Training?" a="Fine motor skills training involves exercises designed to improve the coordination of small muscle movements, usually involving the synchronization of hands and fingers with the eyes. In a digital context, it directly translates to mouse precision and cursor control." />
                  <FAQItem q="How does this cursor tracking game improve mouse accuracy?" a="By forcing you to keep your cursor perfectly aligned within a narrow, dynamically shifting path, this drill trains your micro-muscles to make minute, smooth adjustments, eliminating mouse jitter and over-correction." />
                  <FAQItem q="How do gamers benefit from steady hand training?" a="FPS gamers (Valorant, CS2, Apex Legends) rely on smooth tracking to keep their crosshair on moving targets. This drill builds the foundational steadiness required for elite recoil control and tracking aim." />
                  <FAQItem q="How do digital artists and designers benefit?" a="Digital artists, architects, and graphic designers require immense hand stability to draw smooth curves and precise lines. This path tracking game acts as a perfect warm-up to calibrate hand stability before using a mouse or drawing tablet." />
                  <FAQItem q="Can this be used for occupational therapy or rehabilitation?" a="Yes, many individuals use cursor control exercises to help rehabilitate hand mobility, regain fine motor control, or manage mild hand tremors through targeted, low-stress repetitive digital tasks." />
                  <FAQItem q="What is Adrenaline Mode in this game?" a="During the final 15 seconds of the drill, the game enters 'Adrenaline Mode.' The path distorts rapidly with micro-zigzags, the speed increases, and visual/audio cues simulate high-pressure scenarios to test your consistency under stress." />
                  <FAQItem q="How does the scoring combo system work?" a="Your score multiplier increases the longer you stay perfectly locked on the path (up to 3x). If your cursor slips off the path, your streak breaks and the combo resets to 1x, forcing you to focus on consistency." />
                  <FAQItem q="Is this mouse accuracy test free?" a="Yes, our sequence aim trainer is a free sequential clicking game online with no downloads required, offering immediate browser-based access to top-tier motor skills training." />
                </div>
              </div>
            </div>
          </article>
        )}

        {/* Related Drills */}
        {!isFullscreen && (
          <section className="mt-14" aria-label="Explore related hand eye coordination games">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-5 rounded-full bg-blue-500"></div>
              <h2 className="text-xs font-bold text-white uppercase tracking-widest font-mono">
                Explore More Aim Trainers
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <RelatedCard href="/drills/motor/hand-eye-coordination/aim-trainer" title="Aim Trainer" desc="Hone click speed on shrinking targets." color="green" icon={<Target className="w-4 h-4" />} />
              <RelatedCard href="/drills/fps/flick-shot-training" title="Pro Flick Trainer" desc="Snap to targets in time-attack mode." color="orange" icon={<Crosshair className="w-4 h-4" />} />
              <RelatedCard href="/drills/fps/recoil-control" title="Recoil Control" desc="Calibrate pulling pattern compensation." color="red" icon={<Activity className="w-4 h-4" />} />
              <RelatedCard href="/drills/motor/movement-speed/gesture-speed" title="Flick Aim Trainer" desc="Rapid gesture speed test." color="indigo" icon={<Move className="w-4 h-4" />} />
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
                    <li><Link href="/drills/motor/hand-eye-coordination/aim-trainer" className="hover:text-blue-400 transition-colors">Aim Trainer Elite</Link></li>
                    <li><Link href="/drills/fps/flick-shot-training" className="hover:text-blue-400 transition-colors">Flick Shot Trainer</Link></li>
                    <li><Link href="/drills/fps" className="text-blue-500 hover:text-blue-400 transition-colors font-bold">All FPS Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Memory</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/memory/working-memory/n-back" className="hover:text-blue-400 transition-colors">3-Back Training</Link></li>
                    <li><Link href="/drills/memory/short-term-memory/color-sequence" className="hover:text-blue-400 transition-colors">Color Sequence</Link></li>
                    <li><Link href="/drills/memory" className="text-blue-500 hover:text-blue-400 transition-colors font-bold">All Memory Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Cognitive</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/cognitive/memory/card-matching" className="hover:text-blue-400 transition-colors">Memory Games</Link></li>
                    <li><Link href="/drills/cognitive/attention/divided-attention" className="hover:text-blue-400 transition-colors">Attention Drills</Link></li>
                    <li><Link href="/drills/cognitive" className="text-blue-500 hover:text-blue-400 transition-colors font-bold">All Cognitive Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Academic</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/academic/writing-speed/typing-test" className="hover:text-blue-400 transition-colors">Typing Speed Test</Link></li>
                    <li><Link href="/drills/academic/math-speed/mental-math" className="hover:text-blue-400 transition-colors">Mental Math</Link></li>
                    <li><Link href="/drills/academic" className="text-blue-500 hover:text-blue-400 transition-colors font-bold">All Academic Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">More Sectors</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/visual" className="hover:text-blue-400 transition-colors">Visual Drills</Link></li>
                    <li><Link href="/drills/physical" className="hover:text-blue-400 transition-colors">Physical Drills</Link></li>
                  </ul>
                </div>
              </div>
              
              <div className="border-t border-gray-800 pt-8 text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="w-6 h-6 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-blue-500/30 rounded-lg flex items-center justify-center">
                    <Target className="w-3.5 h-3.5 text-blue-400" />
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
      <div className="flex items-center gap-1.5 text-blue-400 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-wider">
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