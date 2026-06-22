'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';

import { 
  Activity, AlertCircle, ArrowRight, BarChart3, ChevronRight, 
  Clock, Crosshair, Eye, GraduationCap, Info, Lightbulb, 
  Maximize2, Minimize2, Play, RefreshCw, Star, Target, 
  Timer, TrendingUp, Trophy, Volume2, VolumeX, Zap, 
  Share2, Code2, Calculator, CheckCircle2, Shield, Users,
  GitBranch, Heart, XCircle, PenTool
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
        success: 880, 
        fail: 250, 
        streak: 1046.5
      };
      
      osc.type = type === 'fail' ? 'sawtooth' : 'sine';
      osc.frequency.setValueAtTime(freqMap[type] || 660, now);
      
      if (type === 'fail') {
        osc.frequency.exponentialRampToValueAtTime(50, now + 0.3);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
        osc.start(now); osc.stop(now + 0.3);
      } else {
        gain.gain.setValueAtTime(type === 'streak' ? 0.12 : 0.08, now);
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

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function ComplexPatternClient() {
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
  const [currentComplexity, setCurrentComplexity] = useState(3);
  const [phase, setPhase] = useState('memorize'); // 'memorize' -> 'draw' -> 'result'

  // Analytics State
  const [analytics, setAnalytics] = useState({
    avgAccuracy: 0,
    patternsCompleted: 0,
    misses: 0,
    maxStreak: 0,
    peakComplexity: 3
  });

  // === High-performance Mutable Refs ===
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  const timerRef = useRef(null);
  const pageRef = useRef(null);
  
  // === Game Logic Engine Refs ===
  const engine = useRef({
    crosshair: { x: 0, y: 0, initialized: false },
    
    // Physics & State
    timeLeft: DRILL_DURATION,
    score: 0,
    streak: 0,
    bestStreak: 0,
    
    // Pattern Logic
    targetPattern: [],
    userDrawing: [],
    isDrawing: false,
    complexityValue: 3.0,
    phaseTimer: 0,
    
    // Telemetry
    patternsCompleted: 0,
    misses: 0,
    totalAccuracySum: 0,
    totalAttempts: 0,
    totalFrames: 0,
    screenShake: 0
  });

  const lastTimeRef = useRef(0);
  const isActiveRef = useRef(false);

  const cmPer360 = (30 / universalSens).toFixed(1);

  // === Initialization & Local Storage ===
  useEffect(() => {
    try {
      const savedSens = localStorage.getItem('complexPattern_sens');
      if (savedSens) setUniversalSens(parseFloat(savedSens));
      const savedBest = localStorage.getItem('complexPattern_bestScore');
      if (savedBest) setBestScore(parseInt(savedBest, 10));
    } catch (e) {}
  }, []);

  useEffect(() => {
    if (gameState !== 'playing') {
      try { localStorage.setItem('complexPattern_sens', universalSens.toString()); } catch (e) {}
    }
    if (audioSynth) audioSynth.setEnabled(soundEnabled);
  }, [universalSens, gameState, soundEnabled]);

  // === Core Game Management ===
  const endGame = useCallback(() => {
    setGameState('gameOver');
    isActiveRef.current = false;
    if (document.pointerLockElement) document.exitPointerLock();
    
    const e = engine.current;

    const finalAvgAcc = e.totalAttempts > 0 ? Math.round(e.totalAccuracySum / e.totalAttempts) : 0;

    setAnalytics({
      avgAccuracy: finalAvgAcc,
      patternsCompleted: e.patternsCompleted,
      misses: e.misses,
      maxStreak: e.bestStreak,
      peakComplexity: Math.floor(e.complexityValue)
    });

    setBestScore(prev => {
      if (e.score > prev) {
        setIsNewBest(true);
        try { localStorage.setItem('complexPattern_bestScore', e.score.toString()); } catch(err){}
        return e.score;
      }
      return prev;
    });
  }, []);

  const generatePattern = useCallback((width, height) => { 
    const e = engine.current;
    const numWaypoints = Math.min(8, Math.max(1, Math.floor(e.complexityValue) - 1)); 
    const pattern = []; 
    const padding = 100; 
    
    // Start Point
    pattern.push({ 
      x: padding + Math.random() * (width - padding * 2), 
      y: padding + Math.random() * (height - padding * 2), 
      type: 'start'
    }); 
    
    // Waypoints
    for (let i = 0; i < numWaypoints; i++) { 
      pattern.push({ 
        x: padding + Math.random() * (width - padding * 2), 
        y: padding + Math.random() * (height - padding * 2), 
        type: 'waypoint'
      }); 
    } 
    
    // End Point
    pattern.push({ 
      x: padding + Math.random() * (width - padding * 2), 
      y: padding + Math.random() * (height - padding * 2), 
      type: 'end'
    }); 
    
    e.targetPattern = pattern; 
  }, []);

  const startNewPattern = useCallback((cvs) => { 
    const e = engine.current;
    generatePattern(cvs.width, cvs.height); 
    setPhase('memorize'); 
    e.phaseTimer = 2.0; // 2 seconds to memorize
    e.userDrawing = []; 
    e.isDrawing = false; 
  }, [generatePattern]);

  const calculatePathSimilarity = useCallback(() => { 
    const e = engine.current;
    if (e.targetPattern.length === 0 || e.userDrawing.length < 2) return { accurate: false, similarity: 0 }; 
    
    const resamplePath = (path, numPoints) => { 
      if (path.length < 2) return path; 
      let tl = 0; 
      const sl = []; 
      for (let i = 1; i < path.length; i++) { 
        const d = Math.hypot(path[i].x - path[i-1].x, path[i].y - path[i-1].y); 
        sl.push(d); 
        tl += d; 
      } 
      const r = []; 
      const ss = tl / (numPoints - 1); 
      let al = 0; 
      let si = 0; 
      r.push({ x: path[0].x, y: path[0].y }); 
      for (let i = 1; i < numPoints - 1; i++) { 
        const td = i * ss; 
        while (al + sl[si] < td && si < sl.length - 1) { 
          al += sl[si]; 
          si++; 
        } 
        const rd = td - al; 
        const slv = sl[si] || 1; 
        const t = Math.min(1, Math.max(0, rd / slv)); 
        const p1 = path[si]; 
        const p2 = path[si + 1] || p1; 
        r.push({ x: p1.x + (p2.x - p1.x) * t, y: p1.y + (p2.y - p1.y) * t }); 
      } 
      r.push({ x: path[path.length - 1].x, y: path[path.length - 1].y }); 
      return r; 
    }; 
    
    const normalizePath = (path) => { 
      let cx = 0, cy = 0; 
      path.forEach(p => { cx += p.x; cy += p.y; }); 
      cx /= path.length; 
      cy /= path.length; 
      const c = path.map(p => ({ x: p.x - cx, y: p.y - cy })); 
      let md = 0; 
      c.forEach(p => { 
        const d = Math.hypot(p.x, p.y); 
        if (d > md) md = d; 
      }); 
      if (md > 0) return c.map(p => ({ x: p.x / md, y: p.y / md })); 
      return c; 
    }; 
    
    const tr = resamplePath(e.targetPattern, 100); 
    const dr = resamplePath(e.userDrawing, 100); 
    const tn = normalizePath(tr); 
    const dn = normalizePath(dr); 
    
    let tpd = 0; 
    for (let i = 0; i < tn.length; i++) { 
      tpd += Math.hypot(tn[i].x - dn[i].x, tn[i].y - dn[i].y); 
    } 
    const apd = tpd / tn.length; 
    
    const getAngles = (path) => { 
      const a = []; 
      for (let i = 1; i < path.length; i++) { 
        a.push(Math.atan2(path[i].y - path[i-1].y, path[i].x - path[i-1].x)); 
      } 
      return a; 
    }; 
    const ta = getAngles(tr); 
    const da = getAngles(dr); 
    
    let tad = 0; 
    const mc = Math.min(ta.length, da.length); 
    for (let i = 0; i < mc; i++) { 
      let d = Math.abs(ta[i] - da[i]); 
      if (d > Math.PI) d = 2 * Math.PI - d; 
      tad += d; 
    } 
    const aad = tad / mc; 
    
    const sd = Math.hypot(e.targetPattern[0].x - e.userDrawing[0].x, e.targetPattern[0].y - e.userDrawing[0].y); 
    const ed = Math.hypot(e.targetPattern[e.targetPattern.length - 1].x - e.userDrawing[e.userDrawing.length - 1].x, e.targetPattern[e.targetPattern.length - 1].y - e.userDrawing[e.userDrawing.length - 1].y); 
    
    const ps = Math.max(0, 100 - (apd * 100)); 
    const as = Math.max(0, 100 - (aad * (100 / Math.PI))); 
    const sep = (sd > 30 ? 10 : 0) + (ed > 30 ? 10 : 0); 
    const sim = Math.max(0, Math.min(100, (ps * 0.6) + (as * 0.3) + (100 - sep) * 0.1)); 
    
    const acc = sim >= 60 && sd < 50 && ed < 50; 
    return { accurate: acc, similarity: sim, startDist: sd, endDist: ed }; 
  }, []);

  const submitDrawing = useCallback((cvs) => { 
    const e = engine.current;
    const result = calculatePathSimilarity(); 
    
    e.totalAttempts++;
    e.totalAccuracySum += result.similarity;

    if (result.accurate) { 
      e.patternsCompleted++;
      e.score += 10; // +10 PTS
      e.timeLeft += 5.0; // +5.0s Time Bonus
      
      e.streak++;
      if (e.streak > e.bestStreak) e.bestStreak = e.streak;
      
      // Adaptive Difficulty: Increase nodes
      e.complexityValue = Math.min(9, e.complexityValue + 0.5); 
      
      if (audioSynth) {
        if (e.streak % 3 === 0) audioSynth.playSound('streak');
        else audioSynth.playSound('success');
      }
      
      setFlashBg('green');
      setTimeout(() => setFlashBg(null), 100);

    } else { 
      e.misses++;
      e.score = Math.max(0, e.score - 5); // -5 PTS Penalty
      e.timeLeft -= 2.0; // -2.0s Time Penalty
      
      e.streak = 0; 
      e.complexityValue = Math.max(2, e.complexityValue - 0.5); 
      
      e.screenShake = 15;
      if (audioSynth) audioSynth.playSound('fail');
      
      setFlashBg('red');
      setTimeout(() => setFlashBg(null), 100);
    } 
    
    setScore(e.score);
    setStreak(e.streak);
    setCurrentComplexity(Math.floor(e.complexityValue));

    setPhase('result'); 
    e.phaseTimer = 1.0; // Show result for 1 second before next pattern
  }, [calculatePathSimilarity]);

  const startGame = useCallback(async () => {
    if (audioSynth) audioSynth.init(); 

    setIsNewBest(false);
    setScore(0);
    setStreak(0);
    setCurrentComplexity(3);
    setPhase('memorize');
    setGameState('playing');
    
    const e = engine.current;
    e.score = 0;
    e.streak = 0;
    e.bestStreak = 0;
    e.connections = 0;
    e.misses = 0;
    e.totalAttempts = 0;
    e.totalFrames = 0;
    e.totalAccuracySum = 0;
    e.patternsCompleted = 0;
    
    e.complexityValue = 3.0;
    e.phaseTimer = 2.0;
    e.targetPattern = [];
    e.userDrawing = [];
    e.isDrawing = false;
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
        startNewPattern(canvasRef.current);
      }
    }, 150);
  }, [startNewPattern]);

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
      
      // Store drawing path if in draw phase
      if (phase === 'draw' && eRef.isDrawing && eRef.totalFrames % 2 === 0) { // Throttle path points slightly
        eRef.userDrawing.push({ x: eRef.crosshair.x, y: eRef.crosshair.y });
      }
    };

    const handleMouseDown = (e) => {
      if (e.target.tagName === 'BUTTON' || e.target.closest('button')) return;
      if (gameState === 'playing' && pointerLocked && isActiveRef.current && phase === 'draw') {
        const eRef = engine.current;
        eRef.isDrawing = true;
        eRef.userDrawing = []; // Reset their line
      }
    };

    const handleMouseUp = (e) => {
      if (gameState === 'playing' && pointerLocked && isActiveRef.current && phase === 'draw') {
        const eRef = engine.current;
        if (eRef.isDrawing) {
          eRef.isDrawing = false;
          if (eRef.userDrawing.length > 5) { // Ensure they actually drew something
            submitDrawing(canvasRef.current);
          }
        }
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
  }, [gameState, pointerLocked, universalSens, phase, submitDrawing]);

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
        
        // Exact Delta-Time Clock processing
        e.timeLeft -= dt;
        if (e.timeLeft <= 0) {
          e.timeLeft = 0;
          endGame();
        }

        e.totalFrames++;

        // Phase Timing Logic
        e.phaseTimer -= dt;
        if (e.phaseTimer <= 0) {
          if (phase === 'memorize') {
            setPhase('draw');
          } else if (phase === 'result') {
            startNewPattern(cvs);
          }
        }

        // Throttle UI Sync
        if (e.totalFrames % 4 === 0) {
          setTimeLeft(e.timeLeft);
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
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.04)'; // Cyan tint
      ctx.lineWidth = 1; 
      for(let i = 0; i < cvs.width; i+= 50) { 
        ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, cvs.height); ctx.stroke(); 
        ctx.moveTo(0, i); ctx.lineTo(cvs.width, i); ctx.stroke();
      }

      if (gameState === 'playing' || gameState === 'start') {
        
        // Phase: Memorize (Show everything)
        if (phase === 'memorize' && e.targetPattern.length > 0) { 
          // Draw Path Lines
          ctx.beginPath(); 
          ctx.moveTo(e.targetPattern[0].x, e.targetPattern[0].y); 
          for (let i = 1; i < e.targetPattern.length; i++) {
            ctx.lineTo(e.targetPattern[i].x, e.targetPattern[i].y); 
          }
          ctx.strokeStyle = "rgba(16, 185, 129, 0.5)"; // Dim emerald
          ctx.lineWidth = 4; 
          ctx.stroke(); 
          
          // Draw Nodes
          e.targetPattern.forEach(p => { 
            ctx.beginPath(); 
            ctx.arc(p.x, p.y, p.type === 'start' || p.type === 'end' ? 12 : 8, 0, Math.PI * 2); 
            
            if (p.type === 'start') ctx.fillStyle = "#06b6d4"; // Cyan
            else if (p.type === 'end') ctx.fillStyle = "#d946ef"; // Magenta
            else ctx.fillStyle = "#10b981"; // Emerald waypoints
            
            ctx.fill(); 
          }); 

          // Countdown indicator
          ctx.fillStyle = "#ffffff";
          ctx.font = "bold 24px monospace";
          ctx.textAlign = "center";
          ctx.fillText(`MEMORIZE: ${Math.max(0, e.phaseTimer).toFixed(1)}s`, cvs.width / 2, 50);
        } 
        
        // Phase: Draw (Hide waypoints and path, only show Start/End)
        else if (phase === 'draw') { 
          
          if (e.targetPattern.length > 0) {
            const sp = e.targetPattern.find(p => p.type === 'start'); 
            const ep = e.targetPattern.find(p => p.type === 'end'); 
            
            if (sp) { 
              ctx.beginPath(); ctx.arc(sp.x, sp.y, 12, 0, Math.PI * 2); 
              ctx.fillStyle = "#06b6d4"; ctx.fill(); 
            } 
            if (ep) { 
              ctx.beginPath(); ctx.arc(ep.x, ep.y, 12, 0, Math.PI * 2); 
              ctx.fillStyle = "#d946ef"; ctx.fill(); 
            } 
          }

          // Draw User's Current Line
          if (e.userDrawing.length > 1) { 
            ctx.beginPath(); 
            ctx.moveTo(e.userDrawing[0].x, e.userDrawing[0].y); 
            for (let i = 1; i < e.userDrawing.length; i++) {
              ctx.lineTo(e.userDrawing[i].x, e.userDrawing[i].y); 
            }
            ctx.strokeStyle = "#f59e0b"; // Amber drawing line
            ctx.lineWidth = 4; 
            ctx.stroke(); 
          } 

          ctx.fillStyle = "#f59e0b";
          ctx.font = "bold 24px monospace";
          ctx.textAlign = "center";
          ctx.fillText("HOLD CLICK AND DRAW", cvs.width / 2, 50);
        } 
        
        // Phase: Result (Show both to compare)
        else if (phase === 'result') { 
          // Show Original Pattern
          if (e.targetPattern.length > 0) { 
            ctx.beginPath(); 
            ctx.moveTo(e.targetPattern[0].x, e.targetPattern[0].y); 
            for (let i = 1; i < e.targetPattern.length; i++) {
              ctx.lineTo(e.targetPattern[i].x, e.targetPattern[i].y); 
            }
            ctx.strokeStyle = "rgba(16, 185, 129, 0.4)"; 
            ctx.lineWidth = 3; 
            ctx.stroke(); 
            
            e.targetPattern.forEach(p => { 
              if (p.type === 'waypoint') { 
                ctx.beginPath(); ctx.arc(p.x, p.y, 6, 0, Math.PI * 2); 
                ctx.fillStyle = "rgba(16, 185, 129, 0.4)"; ctx.fill(); 
              } 
            }); 
          } 
          
          // Show User Pattern
          if (e.userDrawing.length > 1) { 
            ctx.beginPath(); 
            ctx.moveTo(e.userDrawing[0].x, e.userDrawing[0].y); 
            for (let i = 1; i < e.userDrawing.length; i++) {
              ctx.lineTo(e.userDrawing[i].x, e.userDrawing[i].y); 
            }
            ctx.strokeStyle = "#ffffff"; 
            ctx.lineWidth = 3; 
            ctx.stroke(); 
          } 
        }
      }

      // Draw Crosshair
      const ch = e.crosshair;
      if (ch.initialized && (gameState === 'playing' || gameState === 'start')) {
        const activeColor = pointerLocked ? (e.isDrawing ? '#f59e0b' : '#06b6d4') : '#ef4444';
        ctx.strokeStyle = activeColor;
        ctx.fillStyle = activeColor;
        
        ctx.lineWidth = 2;
        ctx.beginPath(); ctx.arc(ch.x, ch.y, 12, 0, Math.PI * 2); ctx.stroke();

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
  }, [gameState, pointerLocked, phase, startNewPattern, endGame]);

  const shareDrillLink = useCallback(() => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    if (navigator.share) {
      navigator.share({ title: 'Complex Pattern Elite', url }).catch(() => {});
    } else {
      navigator.clipboard.writeText(url).then(() => alert('Link copied!'));
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
                <li><Link href="/drills/physical" className="hover:text-gray-300">Physical</Link></li>
                <li><ChevronRight className="w-4 h-4 text-gray-600" /></li>
                <li className="text-cyan-400 font-medium">Complex Pattern Elite</li>
              </ol>
            </nav>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                  <GitBranch className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Complex Pattern Elite</h1>
                  <p className="text-sm text-gray-400 mt-1 font-medium">Desktop Exclusive • Spatial Memory Tracing</p>
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
            <StatCard icon={<Timer className={timeLeft <= 10 ? 'text-red-400 animate-pulse' : 'text-emerald-400'} />} value={Math.max(0, timeLeft).toFixed(1)} label="Time" unit="s" />
            <StatCard icon={<GitBranch className="text-blue-400" />} value={currentComplexity} label="Complexity" />
            <StatCard icon={<Zap className="text-yellow-400" />} value={streak} label="Current Streak" />
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
          style={{ backgroundColor: flashBg === 'red' ? '#450a0a' : flashBg === 'green' ? '#064e3b' : '#05060b' }}
        >
          {/* Progress Bar */}
          {gameState === 'playing' && (
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gray-900 z-[60]">
              <div 
                className={`h-full transition-all duration-1000 ease-linear ${timeLeft <= 10 ? 'bg-red-500 animate-pulse' : 'bg-cyan-500'}`}
                style={{ width: `${Math.min(100, (timeLeft / DRILL_DURATION) * 100)}%` }} 
              />
            </div>
          )}

          {/* Fullscreen Overlay Controls */}
          {isFullscreen && gameState === 'playing' && (
            <div className="absolute top-4 right-4 z-[60] flex gap-2">
              <button onClick={() => setSoundEnabled(v => !v)} className="p-3 bg-black/60 border border-gray-600 rounded-xl text-white hover:bg-gray-800 transition-colors">
                {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
              </button>
              <button onClick={toggleFullscreen} className="p-3 bg-black/60 border border-gray-600 rounded-xl text-white hover:bg-gray-800 transition-colors">
                <Minimize2 className="w-5 h-5" />
              </button>
            </div>
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
                <AlertCircle className="w-12 h-12 text-cyan-500 mx-auto mb-4" />
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
            <div className="absolute inset-0 flex items-center justify-center z-50 bg-black/70 backdrop-blur-md p-4 overflow-y-auto">
              <div className="rounded-3xl p-8 text-center max-w-lg w-full border border-gray-700 bg-gray-900 shadow-2xl my-auto">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl mx-auto flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(6,182,212,0.3)]">
                  <GitBranch className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-black mb-3 tracking-tight text-white uppercase">Complex Pattern Elite</h2>
                <p className="text-sm mb-6 text-gray-400 leading-relaxed">
                  Raw input spatial memory training. Memorize the pattern path during the 2-second flash. When the path vanishes, hold your click and redraw the exact shape from the <span className="font-bold text-cyan-400">Cyan Start</span> to the <span className="font-bold text-fuchsia-400">Magenta End</span>.
                </p>

                {/* Configuration Panel */}
                <div className="mb-8 p-5 bg-black/50 rounded-xl border border-gray-800 text-left space-y-5">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-xs text-gray-400 font-bold uppercase tracking-wider flex items-center gap-2">
                        <Crosshair className="w-4 h-4 text-cyan-500"/> Universal Sens
                      </label>
                      <span className="text-cyan-400 font-mono text-sm font-bold">{universalSens.toFixed(2)}x</span>
                    </div>
                    <input 
                      type="range" min="0.1" max="3.0" step="0.05" 
                      value={universalSens} 
                      onChange={(e) => setUniversalSens(parseFloat(e.target.value))} 
                      className="w-full h-1.5 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-cyan-500" 
                    />
                    <div className="text-[10px] text-gray-500 mt-1.5 text-right">Approx: {cmPer360} cm/360</div>
                  </div>
                </div>
                
                <button 
                  onClick={startGame}
                  className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-xl font-black text-lg hover:brightness-110 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_20px_rgba(6,182,212,0.3)]"
                >
                  <Play className="w-6 h-6 fill-white" /> BEGIN MEMORY DRILL
                </button>
              </div>
            </div>
          )}

          {/* GAME OVER DASHBOARD */}
          {gameState === 'gameOver' && (
            <div className="absolute inset-0 flex items-center justify-center z-50 bg-black/90 backdrop-blur-md p-4 animate-in fade-in duration-300 overflow-y-auto">
              <div className="rounded-3xl max-w-2xl w-full shadow-2xl border border-gray-800 bg-gray-950 overflow-hidden my-auto">
                <div className="bg-gradient-to-br from-cyan-900/40 to-blue-900/40 p-6 border-b border-gray-800 text-center relative">
                  {isNewBest && (
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-yellow-500 text-black text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-[0_0_15px_rgba(234,179,8,0.5)]">
                      ⭐ New Personal Best
                    </div>
                  )}
                  <h2 className="text-2xl font-black text-white tracking-tight mt-4">Memory Analysis Complete</h2>
                  <p className="text-cyan-400 font-medium text-sm mt-1">Time-Attack Session Concluded</p>
                </div>

                <div className="p-6">
                  {/* Top Stats */}
                  <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <div className="flex-1 bg-gray-900 rounded-2xl p-4 border border-gray-800 flex justify-between items-center">
                      <div>
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1 block">Final Score</span>
                        <div className="flex items-end gap-1">
                          <span className="text-4xl font-black text-white leading-none">{score}</span>
                          <span className="text-xs text-gray-500 font-bold mb-1">PTS</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1 block">Shape Accuracy</span>
                        <span className={`text-3xl font-black ${analytics.avgAccuracy >= 80 ? 'text-green-400' : analytics.avgAccuracy >= 50 ? 'text-yellow-400' : 'text-red-400'}`}>
                          {analytics.avgAccuracy}%
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Reaction Diagnostics Block */}
                  <div className="bg-[#0a0a0a] border border-cyan-900/50 rounded-xl p-5 mb-6 text-left shadow-inner">
                    <h3 className="text-xs font-bold text-cyan-400 font-mono uppercase tracking-widest border-b border-cyan-900/50 pb-2 mb-4 flex items-center gap-2">
                      <BarChart3 className="w-4 h-4 text-cyan-400" />
                      COGNITIVE TELEMETRY DIAGNOSTICS
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs leading-relaxed text-gray-300">
                      
                      <div className="space-y-3 sm:border-r border-gray-800 sm:pr-6">
                        <p className="font-bold text-white uppercase text-[10px] tracking-wider font-mono">Performance Log:</p>
                        <ul className="space-y-2">
                          <li className="flex justify-between items-center bg-gray-900/50 p-2 rounded border border-gray-800">
                            <span className="text-gray-400">Patterns Replicated:</span>
                            <span className="font-bold text-blue-400">{analytics.patternsCompleted}</span>
                          </li>
                          <li className="flex justify-between items-center bg-gray-900/50 p-2 rounded border border-gray-800">
                            <span className="text-gray-400">Failed Replications:</span>
                            <span className={`font-bold ${analytics.misses > 5 ? 'text-red-500' : 'text-yellow-500'}`}>{analytics.misses}</span>
                          </li>
                          <li className="flex justify-between items-center bg-gray-900/50 p-2 rounded border border-gray-800">
                            <span className="text-gray-400">Peak Complexity:</span>
                            <span className="font-bold text-purple-400">Level {analytics.peakComplexity}</span>
                          </li>
                          <li className="flex justify-between items-center bg-gray-900/50 p-2 rounded border border-gray-800">
                            <span className="text-gray-400">Max Survival Streak:</span>
                            <span className="font-bold text-emerald-400">{analytics.maxStreak}</span>
                          </li>
                        </ul>
                      </div>

                      <div className="space-y-3 flex flex-col justify-between">
                        <div>
                          <p className="font-bold text-white uppercase text-[10px] tracking-wider font-mono mb-2">Prescribed Advice:</p>
                          <p className="text-gray-400 leading-relaxed font-sans">
                            {analytics.misses > 5 ? (
                              <span className="text-red-300">You are struggling to visualize the vector geometry after it disappears. Failing a pattern deducts points and drains your clock. Focus purely on memorizing the angles and sharp turns rather than the exact pixel positions.</span>
                            ) : analytics.peakComplexity < 5 ? (
                              <span className="text-yellow-300">Your tracing accuracy is decent, but you are not connecting the nodes fast enough to scale the engine into the highest complexity thresholds.</span>
                            ) : (
                              <span className="text-green-300">Excellent spatial working memory! You are maintaining incredible shape replication despite the extreme node density. Keep pushing your limits.</span>
                            )}
                          </p>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <button onClick={startGame} className="flex-1 py-4 bg-cyan-600 text-white rounded-xl font-black tracking-wide hover:bg-cyan-500 transition-all active:scale-95 flex items-center justify-center gap-2 shadow-lg">
                      <RefreshCw className="w-5 h-5" /> TRAIN AGAIN
                    </button>
                    <button onClick={() => { if (typeof window !== "undefined") { if (navigator.share) { navigator.share({ title: document.title, url: window.location.href }).catch(() => {}); } else { navigator.clipboard.writeText(window.location.href).then(() => alert("Link copied! Share it with your friends.")).catch(() => {}); } } }} className="px-6 py-4 bg-gray-800 text-white rounded-xl font-bold hover:bg-gray-700 transition-all border border-gray-700 flex items-center gap-2 active:scale-95" title="Share this drill"><Share2 className="w-4 h-4 text-sky-400" /><span className="text-sm">Share</span></button>
                    {isFullscreen && (
                       <button onClick={toggleFullscreen} className="px-6 py-4 bg-gray-800 text-white rounded-xl font-bold hover:bg-gray-700 transition-all border border-gray-700">
                         Exit
                       </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
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
                  <RuleItem num="1" color="green" text="Valid Pattern Match" highlight="+10 PTS | +5.0s Time" result="≥60% Shape Accuracy" />
                  <RuleItem num="2" color="indigo" text="Dynamic Scaling" highlight="Endless difficulty" result="Nodes added on success" />
                </div>
                <div className="space-y-5">
                  <RuleItem num="3" color="red" text="Failed Shape Match" result="-5 PTS | -2.0s Time" />
                  <RuleItem num="4" color="purple" text="Strict Tracing" highlight="Desktop Exclusive" result="1:1 Raw Mouse Input" />
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
                <h2 className="font-bold text-white text-lg tracking-wide">About Complex Pattern Elite</h2>
              </div>
              <div className="p-8">
                <p className="text-sm leading-relaxed mb-6 text-gray-300">
                  This free complex pattern drill trains your spatial working memory and fine motor coordination by challenging you to memorize and physically redraw complex geometries. The physics engine utilizes advanced vector normalization to score your drawing purely on shape and angle accuracy, demanding a strong visual-motor connection.
                </p>

                {/* Grid Section */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center"><Users className="w-4 h-4 text-white" /></div>
                      <h3 className="text-sm font-bold text-white">Who It's For</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Anyone wanting to improve spatial memory, fine motor control, visual-motor integration, and pattern recognition skills.</p>
                  </div>
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-green-600 flex items-center justify-center"><TrendingUp className="w-4 h-4 text-white" /></div>
                      <h3 className="text-sm font-bold text-white">Skills Improved</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Pattern memory, fine motor control, spatial reasoning, hand-eye coordination, and visual processing.</p>
                  </div>
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center"><BarChart3 className="w-4 h-4 text-white" /></div>
                      <h3 className="text-sm font-bold text-white">What You'll Track</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Score, total shape accuracy, max survival streak, and peak complexity level defeated.</p>
                  </div>
                </div>

                {/* How to Play & Scoring */}
                <div className="mb-8 bg-[#0b0f19]/40 border border-gray-800 rounded-xl p-6">
                  <h3 className="text-base font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Target className="w-5 h-5 text-cyan-500" /> How to Play & Scoring
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-6 text-sm text-gray-300">
                    <ol className="space-y-3 list-decimal pl-5">
                      <li>Click <strong>Begin Drill</strong> to lock your mouse inside the game.</li>
                      <li>Memorize the exact shape of the green vector path while the timer counts down.</li>
                      <li>When the path disappears, <strong>Hold Left Click</strong> and draw the shape exactly, starting at the Cyan Node.</li>
                    </ol>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> <span className="text-white font-bold">Valid Match:</span> Achieving ≥60% shape accuracy grants +10 PTS and +5.0s. Complexity increases.</li>
                      <li className="flex items-center gap-2"><XCircle className="w-4 h-4 text-red-500" /> <span className="text-white font-bold">Failed Match:</span> Falling below 60% accuracy instantly deducts -5 PTS and -2.0s. Complexity drops.</li>
                    </ul>
                  </div>
                </div>

                {/* FAQ Section */}
                <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                  <div className="flex items-center gap-3 mb-4">
                    <Lightbulb className="w-5 h-5 text-yellow-400" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">Frequently Asked Questions</h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-bold text-gray-200">Why does my score go down?</h4>
                      <p className="text-xs text-gray-400 mt-1">Unlike standard aim trainers, this drill actively punishes bad accuracy. Failing to draw the shape correctly triggers a penalty, violently draining your points and your master clock. You must rely on visual memory to survive.</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-200">How does the scoring engine work?</h4>
                      <p className="text-xs text-gray-400 mt-1">The physics engine resamples your drawn line into 100 mathematical waypoints, then compares the geometry, angles, and distances against the original shape. It does not judge you on speed; it strictly grades your spatial replication.</p>
                    </div>
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
              <div className="w-1 h-5 rounded-full bg-cyan-500"></div>
              <h2 className="text-xs font-bold text-white uppercase tracking-widest font-mono">
                Explore Related Drills
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <RelatedCard href="/drills/motor/hand-eye-coordination/aim-trainer" title="Aim Trainer" desc="Hone spatial coordinate click speed." color="green" icon={<Target className="w-4 h-4" />} />
              <RelatedCard href="/drills/fps/flick-shot-training" title="Pro Flick Trainer" desc="Snap to targets in time-attack mode." color="blue" icon={<Crosshair className="w-4 h-4" />} />
              <RelatedCard href="/drills/fps/180-degree-awareness" title="180Â° Awareness" desc="Alternate snapping opposite horizons." color="orange" icon={<Zap className="w-4 h-4" />} />
              <RelatedCard href="/drills/fps/recoil-control" title="Recoil Control" desc="Calibrate pulling pattern compensation." color="red" icon={<Activity className="w-4 h-4" />} />
              <RelatedCard href="/drills/visual-tracking/saccadic-snap" title="Saccadic Calibration" desc="Optimize saccadic gaze acquisition limits." color="purple" icon={<Eye className="w-4 h-4" />} />
              <RelatedCard href="/drills/cognitive/processing-speed/reaction-time" title="Reaction Time" desc="Test visual reaction speed directly." color="cyan" icon={<Timer className="w-4 h-4" />} />
              <RelatedCard href="/drills/academic/math-speed/mental-math" title="Mental Math" desc="Advanced mental calculation speed tests." color="indigo" icon={<Calculator className="w-4 h-4" />} />
              <RelatedCard href="/drills/physical/fitness/speed-drill" title="Speed Drill" desc="Click shrinking rings. Reaction training." color="rose" icon={<Zap className="w-4 h-4" />} />
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
                    <li><Link href="/drills/fps" className="text-cyan-450 hover:text-cyan-400 transition-colors font-bold">All FPS Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Memory</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/memory/working-memory/n-back" className="hover:text-cyan-400 transition-colors">3-Back Training</Link></li>
                    <li><Link href="/drills/memory/short-term-memory/color-sequence" className="hover:text-cyan-400 transition-colors">Color Sequence</Link></li>
                    <li><Link href="/drills/memory" className="text-cyan-450 hover:text-cyan-400 transition-colors font-bold">All Memory Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Cognitive</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/cognitive/memory/card-matching" className="hover:text-cyan-400 transition-colors">Memory Games</Link></li>
                    <li><Link href="/drills/cognitive/attention/divided-attention" className="hover:text-cyan-400 transition-colors">Attention Drills</Link></li>
                    <li><Link href="/drills/cognitive" className="text-cyan-450 hover:text-cyan-400 transition-colors font-bold">All Cognitive Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Academic</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/academic/writing-speed/typing-test" className="hover:text-cyan-400 transition-colors">Typing Speed Test</Link></li>
                    <li><Link href="/drills/academic/math-speed/mental-math" className="hover:text-cyan-400 transition-colors">Mental Math</Link></li>
                    <li><Link href="/drills/academic" className="text-cyan-450 hover:text-cyan-400 transition-colors font-bold">All Academic Drills →</Link></li>
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
                <div className="flex items-center justify-center gap-3 flex-wrap">
                  <a href="https://youtube.com/@skilldrills.online" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors p-2.5 bg-gray-900 rounded-full hover:bg-gray-800 shadow-md" title="YouTube">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                  </a>
                  <a href="https://www.facebook.com/profile.php?id=61590093843779&amp;sk=directory_intro" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors p-2.5 bg-gray-900 rounded-full hover:bg-gray-800 shadow-md" title="Facebook">
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