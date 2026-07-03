'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';

import { 
  Activity, AlertCircle, ArrowRight, BarChart3, ChevronRight, 
  Clock, Crosshair, Eye, GraduationCap, Info, Lightbulb, 
  Play, RefreshCw, Target, Timer, TrendingUp, Trophy, 
  Volume2, VolumeX, Zap, Users, CheckCircle2, XCircle, 
  Shield, Sparkles, Flame, Share2, Brain, RotateCw, Monitor,
  MousePointer2, Smartphone, Move, Award, PenTool, Video, Star, Maximize2, Minimize2, Sliders
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
    if (!this.ctx && typeof window !== 'undefined') {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
  }

  playSound(type, combo = 0) {
    if (!this.enabled || !this.ctx) return;
    try {
      if (this.ctx.state === 'suspended') this.ctx.resume();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.connect(gain); 
      gain.connect(this.ctx.destination);
      const now = this.ctx.currentTime;
      
      let freq = 440;
      let duration = 0.15;
      osc.type = 'sine';

      if (type === 'drag') {
        freq = 660;
        duration = 0.1;
      } else if (type === 'drop') {
        freq = Math.min(1200, 880 + (combo * 15));
        osc.frequency.setValueAtTime(freq, now);
        osc.frequency.exponentialRampToValueAtTime(freq * 0.5, now + duration);
      } else if (type === 'miss' || type === 'timeout') {
        osc.type = 'sawtooth';
        freq = 150;
        duration = 0.2;
        osc.frequency.setValueAtTime(freq, now);
        osc.frequency.exponentialRampToValueAtTime(50, now + duration);
      } else if (type === 'streak') {
        freq = 1046.5;
        duration = 0.3;
        osc.frequency.setValueAtTime(880, now);
        osc.frequency.setValueAtTime(freq, now + 0.1);
      }
      
      gain.gain.setValueAtTime(type === 'miss' || type === 'timeout' ? 0.15 : 0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
      
      osc.start(now); 
      osc.stop(now + duration);
    } catch (e) {}
  }

  setEnabled(status) {
    this.enabled = status;
  }
}

const audioSynth = typeof window !== 'undefined' ? new AudioSynthesizer() : null;

// ============================================================
// RANK & DIFFICULTY SYSTEM (Score-Based)
// ============================================================
const getLevelConfig = (score) => {
  // Difficulty shifted: the old Level 2 is now Level 1. New extremely hard Level 6 added.
  if (score >= 1200) return { level: 6, maxLife: 1.2, speed: 420, targetR: 12, margin: 0, erratic: 1.2, color: '#e879f9', name: 'Grandmaster' }; 
  if (score >= 800)  return { level: 5, maxLife: 1.5, speed: 350, targetR: 14, margin: 0, erratic: 1.0, color: '#ef4444', name: 'Master' };      
  if (score >= 500)  return { level: 4, maxLife: 2.0, speed: 280, targetR: 18, margin: 2, erratic: 0.8, color: '#f97316', name: 'Diamond' };     
  if (score >= 250)  return { level: 3, maxLife: 2.5, speed: 220, targetR: 24, margin: 5, erratic: 0.6, color: '#eab308', name: 'Platinum' };    
  if (score >= 100)  return { level: 2, maxLife: 3.0, speed: 160, targetR: 30, margin: 8, erratic: 0.4, color: '#3b82f6', name: 'Gold' };        
  return             { level: 1, maxLife: 3.5, speed: 110, targetR: 36, margin: 12, erratic: 0.2, color: '#22c55e', name: 'Silver' };       
};

const calculateRank = (score, accuracy, highestLevel) => {
  if (score >= 1200 && accuracy >= 90) return { rank: 'Grandmaster', color: 'text-fuchsia-400' };
  if (score >= 800 && accuracy >= 85) return { rank: 'Master', color: 'text-red-400' };
  if (score >= 500 && accuracy >= 80) return { rank: 'Diamond', color: 'text-cyan-400' };
  if (score >= 250 && accuracy >= 75) return { rank: 'Platinum', color: 'text-emerald-400' };
  if (score >= 100 && accuracy >= 70) return { rank: 'Gold', color: 'text-yellow-400' };
  if (score >= 50) return { rank: 'Silver', color: 'text-slate-300' };
  return { rank: 'Bronze', color: 'text-orange-700' };
};

const getSuggestion = (accuracy, misses, timeouts, level) => {
  if (accuracy >= 95 && level >= 5) return "Elite motor control. Your drag trajectories and release timings are impeccable. Keep pushing your survival limits.";
  if (timeouts > misses) return "You are hesitating and allowing the target to expire. Timeouts cost you -1s. Accelerate your initial drag motion and commit to the drop faster.";
  if (misses > timeouts) return "You are dropping the ball too early or missing the bucket boundaries. Slow your deceleration as you approach the moving target to secure the exact drop.";
  if (level < 3) return "Focus on smooth, straight-line drags. As your score increases, the bucket will shrink and move faster. Build consistency in your release timing.";
  return "Solid precision. Remember: your score never decreases, but time management is critical. Secure exact drops to buy more survival time.";
};

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function DragAndDropClient() {
  const [gameState, setGameState] = useState('start'); 
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [showRotationWarning, setShowRotationWarning] = useState(false);
  const [deviceType, setDeviceType] = useState('desktop');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [pointerLocked, setPointerLocked] = useState(false);
  const [universalSens, setUniversalSens] = useState(1.0);

  // HUD State
  const [uiScore, setUiScore] = useState(0);
  const [uiCombo, setUiCombo] = useState(0);
  const [uiLevel, setUiLevel] = useState(1);
  const [uiTimeLeft, setUiTimeLeft] = useState(60);
  const [uiAccuracy, setUiAccuracy] = useState(100);
  const [bestScore, setBestScore] = useState(0);
  const [isNewBest, setIsNewBest] = useState(false);

  const [analytics, setAnalytics] = useState({
    accuracy: 100, drops: 0, misses: 0, timeouts: 0, 
    maxCombo: 0, finalLevel: 1, survivalTime: 0, rankData: null
  });

  // DOM Refs
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  const pageRef = useRef(null);

  // Engine State
  const engine = useRef({
    ball: { x: 0, y: 0, r: 12, dragging: false },
    bucket: { x: 0, y: 0, r: 36, vx: 0, vy: 0, tx: 0, ty: 0 },
    config: getLevelConfig(0),
    lifeTimer: 0,
    
    score: 0, combo: 0, maxCombo: 0, timeLeft: 60, survivalTime: 0,
    drops: 0, misses: 0, timeouts: 0, totalActions: 0,
    highestLevel: 1,
    
    particles: [], hitMarkers: [], flash: { color: null, alpha: 0 },
    pointerX: -100, pointerY: -100, isPointerDown: false
  });

  // Init & Device Detection
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const checkDevice = () => {
        const width = window.innerWidth;
        const isTouch = ('ontouchstart' in window) || navigator.maxTouchPoints > 0;
        
        let type = 'desktop';
        if (width < 768 || (isTouch && width < 1024)) type = 'mobile';
        else if (width < 1280 && isTouch) type = 'tablet';
        
        setIsMobile(type === 'mobile');
        setDeviceType(type);

        if (type === 'mobile' && window.innerHeight > window.innerWidth) {
          setShowRotationWarning(true);
        } else {
          setShowRotationWarning(false);
        }
      };

      checkDevice();
      window.addEventListener('resize', checkDevice);
      
      try {
        const savedBest = localStorage.getItem('dragAndDropPro_bestScore'); 
        if (savedBest) setBestScore(parseInt(savedBest, 10));
        
        const savedSens = localStorage.getItem('dragAndDropPro_sens');
        if (savedSens) setUniversalSens(parseFloat(savedSens));
      } catch (e) {}

      return () => window.removeEventListener('resize', checkDevice);
    }
  }, []);

  useEffect(() => {
    if (gameState !== 'playing') {
      try { localStorage.setItem('dragAndDropPro_sens', universalSens.toString()); } catch (e) {}
    }
    if (audioSynth) audioSynth.setEnabled(soundEnabled);
  }, [soundEnabled, universalSens, gameState]);

  // Cleanup pointer lock on unmount
  useEffect(() => {
    return () => {
      if (typeof document !== 'undefined' && document.pointerLockElement) {
        document.exitPointerLock();
      }
    };
  }, []);

  // Fullscreen Handlers
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

  // Pointer Lock Handlers
  useEffect(() => {
    const handlePointerLockChange = () => setPointerLocked(document.pointerLockElement === canvasRef.current);
    document.addEventListener('pointerlockchange', handlePointerLockChange);
    return () => document.removeEventListener('pointerlockchange', handlePointerLockChange);
  }, []);

  // Core Game Management
  const endGame = useCallback(() => {
    setGameState('gameOver');
    if (document.pointerLockElement) document.exitPointerLock();
    
    const e = engine.current;
    const finalAccuracy = e.totalActions > 0 ? Math.round((e.drops / e.totalActions) * 100) : 0;

    const rank = calculateRank(e.score, finalAccuracy, e.highestLevel);

    setAnalytics({
      accuracy: finalAccuracy, drops: e.drops, misses: e.misses, timeouts: e.timeouts,
      maxCombo: e.maxCombo, finalLevel: e.highestLevel, survivalTime: Math.round(e.survivalTime), rankData: rank
    });

    setUiScore(e.score);

    setBestScore(prev => {
      if (e.score > prev) {
        setIsNewBest(true);
        try { localStorage.setItem('dragAndDropPro_bestScore', e.score.toString()); } catch(err){}
        return e.score;
      }
      return prev;
    });
  }, []);

  const spawnPositions = useCallback((cvs, config) => {
    const e = engine.current;
    
    let deviceMulti = 1.0;
    if (deviceType === 'desktop') deviceMulti = 1.2;
    if (deviceType === 'mobile') deviceMulti = 0.8;

    const pad = (config.targetR * deviceMulti) + 40;
    
    e.ball.x = pad + Math.random() * (cvs.width - pad * 2);
    e.ball.y = pad + Math.random() * (cvs.height - pad * 2);
    e.ball.r = 12 * deviceMulti; 
    e.ball.dragging = false;
    
    e.bucket.r = config.targetR * deviceMulti;
    e.bucket.x = pad + Math.random() * (cvs.width - pad * 2);
    e.bucket.y = pad + Math.random() * (cvs.height - pad * 2);
    e.bucket.tx = e.bucket.x;
    e.bucket.ty = e.bucket.y;
    e.bucket.vx = 0;
    e.bucket.vy = 0;
    
    const dist = Math.hypot(e.ball.x - e.bucket.x, e.ball.y - e.bucket.y);
    if (dist < e.bucket.r * 3) {
      spawnPositions(cvs, config);
      return;
    }

    e.lifeTimer = config.maxLife;
  }, [deviceType]);

  const createExplosion = (x, y, color) => {
    for (let i = 0; i < 15; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 5 + 1;
      engine.current.particles.push({ x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, life: 1.0, color });
    }
  };

  const applyPenalty = useCallback((cvs, reason) => {
    const e = engine.current;
    
    if (reason === 'miss') e.misses++;
    if (reason === 'timeout') e.timeouts++;
    e.totalActions++;

    e.timeLeft -= 1.0; 
    e.combo = 0;
    e.flash = { color: '239, 68, 68', alpha: 0.2 }; 
    
    if (audioSynth) audioSynth.playSound(reason);
    createExplosion(e.ball.x, e.ball.y, '#ef4444');
    
    setUiCombo(0);
    setUiAccuracy(Math.round((e.drops / e.totalActions) * 100));

    spawnPositions(cvs, e.config);
  }, [spawnPositions]);

  const handleDrop = useCallback((cvs) => {
    const e = engine.current;
    e.totalActions++;

    const dist = Math.hypot(e.ball.x - e.bucket.x, e.ball.y - e.bucket.y);
    const dropMargin = Math.max(0, e.bucket.r - e.ball.r + (e.config.margin || 0));

    if (dist <= dropMargin) {
      e.drops++;
      e.combo++;
      if (e.combo > e.maxCombo) e.maxCombo = e.combo;
      
      e.score += 10;
      e.timeLeft += 1.0; 
      
      if (e.combo % 5 === 0 && audioSynth) audioSynth.playSound('streak');
      else if (audioSynth) audioSynth.playSound('drop', e.combo);
      
      createExplosion(e.bucket.x, e.bucket.y, e.config.color);

      e.config = getLevelConfig(e.score);
      if (e.config.level > e.highestLevel) e.highestLevel = e.config.level;
      
      setUiLevel(e.config.level);
      setUiScore(e.score);
      setUiCombo(e.combo);
      setUiAccuracy(Math.round((e.drops / e.totalActions) * 100));

      e.flash = { color: '34, 197, 94', alpha: 0.1 };

      spawnPositions(cvs, e.config);
    } else {
      applyPenalty(cvs, 'miss');
    }
  }, [spawnPositions, applyPenalty]);

  const startGame = useCallback(() => {
    if (audioSynth) audioSynth.init(); 

    if (containerRef.current && !document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(()=>{});
    }
    if (deviceType === 'desktop' && canvasRef.current && !document.pointerLockElement) {
      canvasRef.current.requestPointerLock().catch(()=>{});
    }

    setIsNewBest(false);
    setUiScore(0); setUiCombo(0); setUiLevel(1); setUiAccuracy(100);
    setUiTimeLeft(60);
    
    setAnalytics({ accuracy: 100, drops: 0, misses: 0, timeouts: 0, maxCombo: 0, finalLevel: 1, survivalTime: 0, rankData: null });
    setGameState('playing');
    
    const startX = canvasRef.current ? canvasRef.current.width / 2 : 500;
    const startY = canvasRef.current ? canvasRef.current.height / 2 : 300;

    const startConfig = getLevelConfig(0);
    engine.current = {
      ball: { x: 0, y: 0, r: 12, dragging: false },
      bucket: { x: 0, y: 0, r: 36, vx: 0, vy: 0, tx: 0, ty: 0 },
      config: startConfig,
      lifeTimer: startConfig.maxLife,
      
      score: 0, combo: 0, maxCombo: 0, timeLeft: 60, survivalTime: 0,
      drops: 0, misses: 0, timeouts: 0, totalActions: 0,
      highestLevel: 1,
      
      particles: [], hitMarkers: [], flash: { color: null, alpha: 0 },
      pointerX: startX, pointerY: startY, isPointerDown: false
    };

    setTimeout(() => {
      if (canvasRef.current) {
        spawnPositions(canvasRef.current, startConfig);
      }
    }, 50);
  }, [spawnPositions, deviceType]);

  // Input Handling (Raw Input for Desktop, Absolute for Mobile)
  useEffect(() => {
    const cvs = canvasRef.current;
    if (!cvs || gameState !== 'playing') return;

    const updatePointer = (e) => {
      if (deviceType === 'desktop' && pointerLocked) {
        engine.current.pointerX = Math.max(0, Math.min(cvs.width, engine.current.pointerX + e.movementX * universalSens));
        engine.current.pointerY = Math.max(0, Math.min(cvs.height, engine.current.pointerY + e.movementY * universalSens));
      } else if (deviceType !== 'desktop') {
        const rect = cvs.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        engine.current.pointerX = clientX - rect.left;
        engine.current.pointerY = clientY - rect.top;
      }

      const eRef = engine.current;
      if (eRef.ball.dragging) {
        eRef.ball.x = eRef.pointerX;
        eRef.ball.y = eRef.pointerY;
      }
    };

    const handlePointerDown = (e) => {
      if (e.target.tagName === 'BUTTON' || e.target.closest('button')) return;

      if (deviceType === 'desktop' && !pointerLocked) {
        cvs.requestPointerLock().catch(()=>{});
        return; 
      }

      e.preventDefault(); 
      updatePointer(e);
      engine.current.isPointerDown = true;

      const eRef = engine.current;
      const dist = Math.hypot(eRef.pointerX - eRef.ball.x, eRef.pointerY - eRef.ball.y);
      
      if (dist < eRef.ball.r + 20) { 
        eRef.ball.dragging = true;
        if (audioSynth) audioSynth.playSound('drag');
      }
    };

    const handlePointerUp = (e) => {
      if (e) e.preventDefault();
      const eRef = engine.current;
      eRef.isPointerDown = false;
      
      if (eRef.ball.dragging) {
        eRef.ball.dragging = false;
        handleDrop(cvs);
      }
    };

    if (deviceType === 'desktop') {
      document.addEventListener('mousemove', updatePointer);
      document.addEventListener('mousedown', handlePointerDown);
      document.addEventListener('mouseup', handlePointerUp);
    } else {
      cvs.addEventListener('pointermove', updatePointer);
      cvs.addEventListener('pointerdown', handlePointerDown);
      cvs.addEventListener('pointerup', handlePointerUp);
      cvs.addEventListener('pointercancel', handlePointerUp);
    }

    return () => {
      document.removeEventListener('mousemove', updatePointer);
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('mouseup', handlePointerUp);
      cvs.removeEventListener('pointermove', updatePointer);
      cvs.removeEventListener('pointerdown', handlePointerDown);
      cvs.removeEventListener('pointerup', handlePointerUp);
      cvs.removeEventListener('pointercancel', handlePointerUp);
    };
  }, [gameState, deviceType, pointerLocked, universalSens, handleDrop]);

  // Main Render & Physics Loop
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
      const dt = Math.min(deltaTimeMs / 1000, 0.1); 
      const e = engine.current;

      if (gameState === 'playing') {
        
        e.timeLeft -= dt;
        e.survivalTime += dt;

        if (e.timeLeft <= 0) {
          e.timeLeft = 0;
          setUiTimeLeft(0);
          endGame();
          return; 
        }

        if (Math.random() < 0.1) {
          setUiTimeLeft(e.timeLeft);
        }

        // --- BUCKET PHYSICS & MOVEMENT ---
        const distToWaypoint = Math.hypot(e.bucket.tx - e.bucket.x, e.bucket.ty - e.bucket.y);
        
        if (distToWaypoint < 40 || Math.random() < (e.config.erratic * dt * 2)) {
          const padding = e.bucket.r + 20;
          e.bucket.tx = padding + Math.random() * (cvs.width - padding * 2);
          e.bucket.ty = padding + Math.random() * (cvs.height - padding * 2);
        }

        const angle = Math.atan2(e.bucket.ty - e.bucket.y, e.bucket.tx - e.bucket.x);
        const acceleration = e.config.speed * 5; 
        
        e.bucket.vx += Math.cos(angle) * acceleration * dt;
        e.bucket.vy += Math.sin(angle) * acceleration * dt;

        e.bucket.vx *= 0.90;
        e.bucket.vy *= 0.90;

        e.bucket.x += e.bucket.vx * dt;
        e.bucket.y += e.bucket.vy * dt;

        const margin = e.bucket.r;
        if (e.bucket.x < margin) { e.bucket.x = margin; e.bucket.vx *= -1; }
        else if (e.bucket.x > cvs.width - margin) { e.bucket.x = cvs.width - margin; e.bucket.vx *= -1; }
        if (e.bucket.y < margin) { e.bucket.y = margin; e.bucket.vy *= -1; }
        else if (e.bucket.y > cvs.height - margin) { e.bucket.y = cvs.height - margin; e.bucket.vy *= -1; }

        // --- LIFE TIMER (TIMEOUT) ---
        e.lifeTimer -= dt;
        if (e.lifeTimer <= 0) {
          applyPenalty(cvs, 'timeout');
        }
      }

      ctx.save();
      
      ctx.fillStyle = '#05060b';
      ctx.fillRect(0, 0, cvs.width, cvs.height);

      if (e.flash.alpha > 0) {
        ctx.fillStyle = `rgba(${e.flash.color}, ${e.flash.alpha})`;
        ctx.fillRect(0, 0, cvs.width, cvs.height);
        e.flash.alpha -= dt * 2.0; 
      }

      ctx.strokeStyle = 'rgba(59, 130, 246, 0.04)'; 
      ctx.lineWidth = 1;
      for (let i = 0; i < cvs.width; i += 60) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, cvs.height); ctx.stroke(); }
      for (let j = 0; j < cvs.height; j += 60) { ctx.beginPath(); ctx.moveTo(0, j); ctx.lineTo(cvs.width, j); ctx.stroke(); }

      if (gameState === 'playing' || gameState === 'start') {
        
        // 1. Render Bucket (Target)
        const lifePercent = Math.max(0, e.lifeTimer / e.config.maxLife);
        
        ctx.beginPath();
        ctx.arc(e.bucket.x, e.bucket.y, e.bucket.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${hexToRgb(e.config.color)}, 0.08)`;
        ctx.fill();
        
        ctx.strokeStyle = e.ball.dragging ? e.config.color : "#334155";
        ctx.lineWidth = 3; 
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(e.bucket.x, e.bucket.y, Math.max(1, e.bucket.r - 6), -Math.PI / 2, (-Math.PI / 2) + (Math.PI * 2 * lifePercent));
        ctx.strokeStyle = lifePercent > 0.3 ? e.config.color : "#ef4444";
        ctx.lineWidth = 4;
        ctx.stroke();

        // 2. Render Ball (Draggable)
        ctx.beginPath();
        ctx.arc(e.ball.x, e.ball.y, e.ball.r, 0, Math.PI * 2);
        ctx.fillStyle = e.ball.dragging ? e.config.color : "#3b82f6"; 
        
        if (e.ball.dragging) {
          ctx.shadowBlur = 15;
          ctx.shadowColor = e.config.color;
        }
        ctx.fill();
        ctx.shadowBlur = 0;
        
        ctx.beginPath();
        ctx.arc(e.ball.x, e.ball.y, e.ball.r * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.fill();

        if (e.ball.dragging) {
          ctx.beginPath();
          ctx.moveTo(e.ball.x, e.ball.y); 
          ctx.lineTo(e.bucket.x, e.bucket.y);
          ctx.strokeStyle = `rgba(${hexToRgb(e.config.color)}, 0.3)`;
          ctx.lineWidth = 1.5; 
          ctx.setLineDash([5, 5]);
          ctx.stroke();
          ctx.setLineDash([]);
        }
      }

      // Particles
      for (let i = e.particles.length - 1; i >= 0; i--) {
        const p = e.particles[i];
        p.x += p.vx; p.y += p.vy; p.life -= dt * 2.5;
        if (p.life <= 0) { e.particles.splice(i, 1); continue; }
        ctx.globalAlpha = p.life; ctx.fillStyle = p.color; ctx.beginPath(); ctx.arc(p.x, p.y, 3, 0, Math.PI*2); ctx.fill();
      }
      ctx.globalAlpha = 1.0;

      // Draw Custom Crosshair (Desktop only)
      if ((gameState === 'playing' || gameState === 'start') && deviceType === 'desktop') {
        const px = e.pointerX;
        const py = e.pointerY;
        
        const activeColor = pointerLocked ? (e.ball.dragging ? e.config.color : '#22c55e') : '#eab308';
        ctx.strokeStyle = activeColor;
        ctx.fillStyle = activeColor;
        
        ctx.lineWidth = 2;
        ctx.beginPath(); ctx.arc(px, py, 14, 0, Math.PI * 2); ctx.stroke();

        ctx.lineWidth = 1.5;
        const gap = 5;
        ctx.beginPath();
        ctx.moveTo(px, py - 14); ctx.lineTo(px, py - gap);
        ctx.moveTo(px, py + 14); ctx.lineTo(px, py + gap);
        ctx.moveTo(px - 14, py); ctx.lineTo(px - gap, py);
        ctx.moveTo(px + 14, py); ctx.lineTo(px + gap, py);
        ctx.stroke();
        
        ctx.beginPath(); ctx.arc(px, py, 2, 0, Math.PI * 2); ctx.fill();
      }

      ctx.restore();
      if (gameState !== 'gameOver') {
         animationRef.current = requestAnimationFrame(loop);
      }
    };

    animationRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animationRef.current);
      resizeObserver.disconnect();
    };
  }, [gameState, deviceType, pointerLocked, applyPenalty, endGame]);

  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '59, 130, 246';
  };

  const shareScore = useCallback(async () => {
    const text = `🖱️ I scored ${uiScore} PTS (${analytics.rankData.rank}) on the Precision Drag & Drop Pro! Survival Time: ${analytics.survivalTime}s | Drops: ${analytics.drops}. Train your mouse precision at skilldrills.online!`;
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({ title: 'My Mouse Precision Score', text, url: 'https://skilldrills.online/drills/motor/hand-eye-coordination/drag-and-drop' });
      } catch (e) {}
    } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      alert('Score card copied to clipboard!');
    }
  }, [uiScore, analytics]);

  return (
    <div ref={pageRef} className="min-h-screen select-none bg-[#050508] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        {!isFullscreen && (
          <div className="mb-6">
            <nav className="mb-4">
              <ol className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
                <li><Link href="/" className="hover:text-gray-300">Home</Link></li>
                <li><ChevronRight className="w-4 h-4 text-gray-600" /></li>
                <li><Link href="/drills/motor" className="hover:text-gray-300">Motor Skills</Link></li>
                <li><ChevronRight className="w-4 h-4 text-gray-600" /></li>
                <li className="text-blue-400 font-medium">Drag & Drop Pro</li>
              </ol>
            </nav>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                  <Move className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Precision Drag & Drop Pro</h1>
                  <p className="text-sm text-gray-400 mt-1 font-medium">Strict Mouse Training • Adaptive Scaling</p>
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
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-2">
            <StatCard icon={<Trophy className="text-yellow-400" />} value={uiScore} label="Score" />
            <StatCard icon={<TrendingUp className={getLevelConfig(uiScore).color.replace('#', 'text-[')} />} value={`Lv. ${uiLevel}`} label={getLevelConfig(uiScore).name} />
            <StatCard icon={<Timer className={uiTimeLeft <= 10 ? 'text-red-400 animate-pulse' : 'text-blue-400'} />} value={Math.floor(uiTimeLeft)} label="Time" unit="s" />
            <StatCard icon={<Target className="text-emerald-400" />} value={`${uiAccuracy}%`} label="Accuracy" />
            <StatCard icon={<Flame className={uiCombo >= 5 ? "text-orange-500 animate-pulse" : "text-gray-500"} />} value={uiCombo} label="Streak" highlight={uiCombo >= 5} />
            <StatCard icon={<Star className="text-yellow-500" />} value={bestScore} label="Best Score" />
          </div>
        )}

        {/* Engine Container */}
        <div 
          ref={containerRef} 
          className={`relative overflow-hidden transition-colors outline-none bg-[#05060b] ${
            gameState === 'playing' && deviceType === 'desktop' ? 'cursor-none' : ''
          } ${
            isFullscreen ? 'w-full h-full fixed inset-0 z-50' : 'w-full aspect-video min-h-[500px] rounded-2xl border border-gray-800 shadow-2xl touch-none'
          }`}
          style={{ touchAction: 'none' }} 
        >
          {showRotationWarning && gameState === 'start' && (
            <div className="absolute inset-0 z-50 bg-black/90 backdrop-blur flex flex-col items-center justify-center p-6 text-center">
              <RotateCw className="w-12 h-12 text-yellow-500 mb-4 animate-spin-slow" />
              <h3 className="text-xl font-bold text-white mb-2">Rotate Your Device</h3>
              <p className="text-sm text-gray-400 mb-6 max-w-xs">Landscape mode is highly recommended for the best drag-and-drop area.</p>
              <button 
                onClick={() => setShowRotationWarning(false)}
                className="px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-xl text-sm font-bold text-white transition-colors"
              >
                Continue Anyway
              </button>
            </div>
          )}

          {gameState === 'playing' && (
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gray-900 z-[60]">
              <div 
                className={`h-full transition-all ease-linear ${uiTimeLeft <= 10 ? 'bg-red-500 animate-pulse' : 'bg-blue-500'}`}
                style={{ width: `${Math.min(100, (uiTimeLeft / 60) * 100)}%` }} 
              />
            </div>
          )}

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

          {gameState === 'playing' && deviceType === 'desktop' && !pointerLocked && (
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
                <p className="text-gray-300 font-medium">Click anywhere to lock cursor and resume.</p>
              </div>
            </div>
          )}

          <canvas 
            ref={canvasRef} 
            className="block absolute top-0 left-0 w-full h-full touch-none z-10" 
          />

          {/* OPTIMIZED START SCREEN */}
          {gameState === 'start' && !showRotationWarning && (
            <div className="absolute inset-0 bg-[#05070e]/98 flex flex-col items-center justify-center p-6 z-30 select-none overflow-y-auto backdrop-blur-sm">
              <div className="max-w-md w-full text-center">
                <h2 className="text-xl font-black text-white uppercase tracking-wider mb-1">
                  Precision Drag & Drop Pro
                </h2>
                <p className="text-xs text-slate-500 uppercase tracking-widest mb-6">
                  Hardware Raw Input • Survival Mode
                </p>

                <div className="grid grid-cols-2 gap-3 mb-6 text-left">
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Objective</span>
                    <span className="text-sm font-black text-white">Drag Ball to Bucket</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Reward</span>
                    <span className="text-sm font-black text-green-400">+10 PTS & +1s</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Penalty</span>
                    <span className="text-sm font-black text-red-400">-1s Time Penalty</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Mechanic</span>
                    <span className="text-sm font-black text-blue-400">Score = Difficulty</span>
                  </div>
                </div>

                {deviceType === 'desktop' && (
                  <div className="bg-[#0b0f19] border border-slate-850 p-4 rounded-xl mb-6 text-left text-xs text-slate-400">
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-white uppercase mb-3">
                      <Sliders className="w-3.5 h-3.5 text-blue-500" /> Universal Sens
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-green-400 font-mono text-sm font-bold">{universalSens.toFixed(2)}x</span>
                      <span className="text-[10px] text-slate-500">Raw Input Multiplier</span>
                    </div>
                    <input 
                      type="range" min="0.1" max="3.0" step="0.05" 
                      value={universalSens} 
                      onChange={(e) => setUniversalSens(parseFloat(e.target.value))} 
                      className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500" 
                    />
                  </div>
                )}

                <button
                  onClick={startGame}
                  className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-sm flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(59,130,246,0.3)] uppercase tracking-widest transition-all duration-200 active:scale-95"
                >
                  <Play className="w-4 h-4 fill-white" />
                  BEGIN TRAINING
                </button>
              </div>
            </div>
          )}

          {/* GAME OVER DASHBOARD */}
          {gameState === 'gameOver' && analytics.rankData && (
            <div className="absolute inset-0 bg-[#05070e]/98 flex flex-col items-center justify-center p-6 z-30 select-none overflow-y-auto backdrop-blur-sm">
              <div className="max-w-md w-full text-center">
                {isNewBest && (
                  <div className="inline-block bg-yellow-500 text-black text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-3 shadow-[0_0_15px_rgba(234,179,8,0.5)] animate-bounce">
                    ⭐ NEW PERSONAL BEST!
                  </div>
                )}
                
                <h2 className="text-xl font-black text-white uppercase tracking-wider mb-1">
                  Session Complete
                </h2>
                <p className="text-xs text-slate-500 uppercase tracking-widest mb-6">
                  Survival Time: {analytics.survivalTime} Seconds
                </p>

                <div className="grid grid-cols-3 gap-3 mb-6 text-left">
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Final Score</span>
                    <span className="text-lg font-black text-white">{uiScore}</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Accuracy</span>
                    <span className="text-lg font-black text-white">{analytics.accuracy}%</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Total Drops</span>
                    <span className="text-lg font-black text-white">{analytics.drops}</span>
                  </div>
                  
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Max Streak</span>
                    <span className="text-lg font-black text-white">{analytics.maxCombo}x</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Peak Level</span>
                    <span className="text-lg font-black text-white">Lv. {analytics.finalLevel}</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl flex flex-col justify-center">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Assigned Rank</span>
                    <span className={`text-[12px] font-black ${analytics.rankData.color} truncate block mt-0.5`}>
                      {analytics.rankData.rank}
                    </span>
                  </div>
                </div>

                <div className="bg-[#0b0f19] border border-slate-850 p-4 rounded-xl mb-6 text-left text-xs text-slate-400">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-white uppercase mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-blue-500" /> Coaching Insight:
                  </div>
                  <p className="leading-relaxed">
                    {getSuggestion(analytics.accuracy, analytics.misses, analytics.timeouts, analytics.finalLevel)}
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

        {/* DRILL INSTRUCTIONS & SCORING */}
        {!isFullscreen && (
          <section className="mt-10">
            <div className="rounded-2xl border border-gray-800 overflow-hidden bg-gray-900 shadow-2xl pointer-events-none">
              <div className="px-6 py-5 border-b border-gray-800 bg-black/40 flex items-center gap-3">
                <Info className="w-5 h-5 text-blue-400" /><h2 className="font-bold text-white text-lg tracking-wide">Progression & Rules</h2>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-5">
                  <RuleItem num="1" color="green" text="Successful Drop" highlight="+10 PTS & +1s Time" result="Score only goes up" />
                  <RuleItem num="2" color="blue" text="Level Scaling" highlight="Based on Score" result="Targets get faster & smaller" />
                </div>
                <div className="space-y-5">
                  <RuleItem num="3" color="red" text="Missed Drop" highlight="-1s Time Penalty" result="No double punishments" />
                  <RuleItem num="4" color="orange" text="Target Timeout" highlight="-1s Time Penalty" result="Clock determines survival" />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* FULL ABOUT THIS DRILL SECTION */}
        {!isFullscreen && (
          <article className="mt-12" aria-label="About this drill">
            <div className="rounded-2xl border border-gray-800 overflow-hidden bg-gray-900 shadow-xl">
              <div className="px-6 py-5 border-b border-gray-800 bg-black/40 flex items-center gap-3">
                <GraduationCap className="w-5 h-5 text-blue-400" />
                <h2 className="font-bold text-white text-lg tracking-wide">About Drag and Drop Training</h2>
              </div>
              <div className="p-8 space-y-8">
                
                <section>
                  <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                    <Move className="w-5 h-5 text-blue-400" /> What Is A Drag and Drop Game?
                  </h3>
                  <p className="text-sm leading-relaxed mb-4 text-gray-300">
                    A <strong>Drag and Drop Game</strong> is a highly focused mechanical drill designed to isolate and test fine motor control. By forcing the user to click, hold, drag an object accurately across the screen, and release it precisely inside a moving target, this drill effectively improves cursor control, spatial accuracy, and hand-eye coordination.
                  </p>
                  <p className="text-sm leading-relaxed mb-4 text-gray-300">
                    Instead of harsh point deductions, this training utilizes a <strong>survival time mechanic</strong>. Earning successful drops grants you additional time. Failures—such as releasing the ball outside the target or letting the timer expire—subtract from your master clock. You must balance speed and accurate placement to survive.
                  </p>
                </section>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 py-4">
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                    <h4 className="text-sm font-bold text-red-400 mb-2 flex items-center gap-2"><Target className="w-4 h-4"/> Gamers</h4>
                    <p className="text-xs leading-relaxed text-gray-400">Improves rapid mouse deceleration (stopping power), essential for accurate flick shots and fast inventory management.</p>
                  </div>
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                    <h4 className="text-sm font-bold text-yellow-400 mb-2 flex items-center gap-2"><PenTool className="w-4 h-4"/> Designers</h4>
                    <p className="text-xs leading-relaxed text-gray-400">Builds the exact micro-muscle memory needed to quickly drag layers, adjust bezier nodes, and snap objects to guides perfectly.</p>
                  </div>
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                    <h4 className="text-sm font-bold text-blue-400 mb-2 flex items-center gap-2"><Video className="w-4 h-4"/> Video Editors</h4>
                    <p className="text-xs leading-relaxed text-gray-400">Enhances spatial click-and-drag accuracy needed to swiftly move clips across dense timelines without dropping them on the wrong track.</p>
                  </div>
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                    <h4 className="text-sm font-bold text-emerald-400 mb-2 flex items-center gap-2"><Activity className="w-4 h-4"/> Productivity</h4>
                    <p className="text-xs leading-relaxed text-gray-400">Significantly reduces general cursor fumbling, increasing raw computer navigation speed and reducing wrist fatigue.</p>
                  </div>
                </div>

                <section className="bg-[#0b0f19] border border-gray-800 rounded-xl p-6">
                  <h3 className="text-base font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-blue-500" /> How Difficulty Progression Works
                  </h3>
                  <p className="text-sm leading-relaxed mb-4 text-gray-400">
                    To ensure constant skill development, this drill employs an intelligent <strong>score-based difficulty engine</strong>. As your total score increases, you will seamlessly transition through Levels 1 to 6. At higher levels, the target bucket drastically shrinks in size, moves much faster in erratic patterns, and requires strict drop completion before it expires.
                  </p>
                </section>
              </div>

              {/* FAQ Section */}
              <div className="bg-[#0b0f19] border-t border-gray-800 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Lightbulb className="w-6 h-6 text-yellow-400" />
                  <h3 className="text-xl font-bold text-white">Frequently Asked Questions</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FAQItem q="What is a drag and drop game?" a="A drag and drop game is a mechanical drill where users click, hold, and transport an object across the screen into a specific target zone to improve mouse or touch dexterity." />
                  <FAQItem q="How does mouse precision training work?" a="By requiring you to rapidly click, accurately move, and precisely release an object under time pressure, it strengthens the neural pathways responsible for fine motor control." />
                  <FAQItem q="Can this improve cursor control?" a="Yes. Continuous drag-and-drop actions smooth out erratic mouse movements and teach your hand to decelerate precisely over small targets." />
                  <FAQItem q="Is this useful for FPS games?" a="While mainly for desktop control, it highly benefits FPS players by improving mouse spatial awareness and rapid deceleration control (stopping power) needed for flick shots." />
                  <FAQItem q="Can designers benefit from this?" a="Absolutely. Graphic designers rely on pixel-perfect drag precision for adjusting nodes, layers, and masks in software like Photoshop or Illustrator." />
                  <FAQItem q="Can video editors benefit?" a="Yes, moving clips on a dense timeline requires exact drag-and-drop spatial accuracy, which this drill trains natively." />
                  <FAQItem q="How is accuracy calculated?" a="Accuracy is the percentage of successful drops directly inside the moving bucket versus missed drops (releasing outside the ring)." />
                  <FAQItem q="How does adaptive difficulty work?" a="Difficulty scales directly with your score. Earning points shrinks the target bucket, increases its movement speed, and reduces the time you have to complete the drop." />
                  <FAQItem q="What is a good score?" a="A score over 500 (Diamond rank) is impressive. A score over 1200 achieves the highest Grandmaster rank." />
                  <FAQItem q="Can I play on mobile?" a="Yes! The drill fully supports mobile touch interactions, allowing you to train touch-and-drag precision seamlessly." />
                  <FAQItem q="How often should I practice?" a="Practicing 5-10 minutes a day is sufficient to drastically improve and maintain your baseline cursor accuracy." />
                  <FAQItem q="Is the drill free?" a="Yes, this Drag and Drop precision training tool is 100% free with no downloads or sign-ups required." />
                </div>
              </div>
            </div>
          </article>
        )}

        {/* RELATED DRILLS SECTION */}
        {!isFullscreen && (
          <section className="mt-14" aria-label="Explore related aim and response drills">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-5 rounded-full bg-blue-500"></div>
              <h2 className="text-xs font-bold text-white uppercase tracking-widest font-mono">
                Explore Related Drills
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <RelatedCard href="/drills/motor/hand-eye-coordination/aim-trainer" title="Aim Trainer Elite" desc="Hone spatial coordinate click speed." color="green" icon={<Target className="w-4 h-4" />} />
              <RelatedCard href="/drills/motor/hand-eye-coordination/click-accuracy" title="Mouse Accuracy Test" desc="Single-target click precision drill." color="cyan" icon={<MousePointer2 className="w-4 h-4" />} />
              <RelatedCard href="/drills/fps/flick-shot-training" title="Pro Flick Trainer" desc="Snap to targets in time-attack mode." color="blue" icon={<Crosshair className="w-4 h-4" />} />
              <RelatedCard href="/drills/cognitive/processing-speed/reaction-time" title="Reaction Time" desc="Test visual reaction speed directly." color="purple" icon={<Timer className="w-4 h-4" />} />
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
                    <li><Link href="/drills/motor/hand-eye-coordination/drag-and-drop" className="text-blue-500 font-bold hover:text-blue-400 transition-colors">Precision Drag and Drop Pro</Link></li>
                    <li><Link href="/drills/motor/hand-eye-coordination/aim-trainer" className="hover:text-blue-400 transition-colors">Aim Trainer Elite</Link></li>
                    <li><Link href="/drills/fps" className="hover:text-blue-400 transition-colors font-bold">All Motor Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Memory</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/memory/working-memory/n-back" className="hover:text-blue-400 transition-colors">3-Back Training</Link></li>
                    <li><Link href="/drills/memory/short-term-memory/color-sequence" className="hover:text-blue-400 transition-colors">Color Sequence</Link></li>
                    <li><Link href="/drills/memory" className="hover:text-blue-400 transition-colors font-bold">All Memory Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Cognitive</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/cognitive/memory/card-matching" className="hover:text-blue-400 transition-colors">Memory Games</Link></li>
                    <li><Link href="/drills/cognitive/attention/divided-attention" className="hover:text-blue-400 transition-colors">Attention Drills</Link></li>
                    <li><Link href="/drills/cognitive" className="hover:text-blue-400 transition-colors font-bold">All Cognitive Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Academic</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/academic/writing-speed/typing-test" className="hover:text-blue-400 transition-colors">Typing Speed Test</Link></li>
                    <li><Link href="/drills/academic/math-speed/mental-math" className="hover:text-blue-400 transition-colors">Mental Math</Link></li>
                    <li><Link href="/drills/academic" className="hover:text-blue-400 transition-colors font-bold">All Academic Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">More Sectors</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/visual" className="hover:text-blue-400 transition-colors">Visual</Link></li>
                    <li><Link href="/drills/physical" className="hover:text-blue-400 transition-colors">Physical</Link></li>
                  </ul>
                </div>
              </div>
              
              <div className="border-t border-slate-900 pt-8 text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="w-6 h-6 bg-gradient-to-br from-blue-500/25 to-indigo-500/25 border border-blue-500/30 rounded-lg flex items-center justify-center">
                    <Move className="w-3.5 h-3.5 text-blue-400" />
                  </div>
                  <span className="text-white font-black tracking-widest text-xs uppercase">SkillDrills</span>
                </div>
                <p className="text-[9px] mb-2">&copy; {new Date().getFullYear()} SkillDrills. All rights reserved.</p>
                <p className="text-[9px] max-w-2xl mx-auto leading-relaxed mb-6">
                  Open-source telemetry training platform. Free forever. No downloads required.
                </p>
                <div className="flex items-center justify-center gap-3 flex-wrap">
                  <a href="https://youtube.com/@skilldrills.online" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors p-2.5 bg-gray-900 rounded-full hover:bg-gray-800 shadow-md" title="YouTube">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                  </a>
                  <a href="https://www.facebook.com/profile.php?id=61590093843779" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors p-2.5 bg-gray-900 rounded-full hover:bg-gray-800 shadow-md" title="Facebook">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
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
    <div className={`group rounded-xl border ${highlight ? 'border-orange-500/50 bg-orange-500/5' : 'border-slate-900 bg-slate-950/40'} p-2 text-center flex flex-col justify-center h-full transition-all duration-300 hover:scale-[1.03] hover:border-slate-800`}>
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
    green: 'bg-green-600 text-green-300 border-green-500',
    red: 'bg-red-600 text-red-300 border-red-500',
    orange: 'bg-orange-600 text-orange-300 border-orange-500',
    cyan: 'bg-cyan-600 text-cyan-300 border-cyan-500'
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
    green: 'from-green-500 to-emerald-500',
    cyan: 'from-cyan-500 to-blue-500',
    purple: 'from-purple-500 to-fuchsia-500'
  };
  return (
    <Link href={href} className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-[#0b0f19]/40 transition-all hover:-translate-y-1 hover:border-blue-500/50 block p-5">
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${gradients[color] || 'from-blue-500 to-indigo-500'}`}></div>
      <div className="w-10 h-10 rounded-xl bg-[#050811] border border-slate-700 flex items-center justify-center text-slate-400 group-hover:text-white mb-3 shadow-inner">
        {icon}
      </div>
      <h3 className="font-bold text-base mb-1.5 text-white group-hover:text-blue-400 transition-colors">{title}</h3>
      <p className="text-xs text-slate-500 mb-4">{desc}</p>
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