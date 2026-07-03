'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Head from 'next/head';

import { 
  Activity, AlertCircle, ArrowRight, BarChart3, ChevronRight, 
  Clock, Crosshair, Eye, GraduationCap, Info, Lightbulb, 
  Play, RefreshCw, Target, Timer, TrendingUp, Trophy, 
  Volume2, VolumeX, Zap, Users, CheckCircle2, XCircle, 
  Shield, Sparkles, Flame, Share2, Brain, RotateCw, Monitor,
  MousePointer2, Smartphone, Star, Maximize2, Minimize2, Sliders
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

  playHit(combo = 0) {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine'; 
      const baseFreq = 880;
      const freqPitch = Math.min(1600, baseFreq + (combo * 20));
      osc.frequency.setValueAtTime(freqPitch, this.ctx.currentTime); 
      osc.frequency.exponentialRampToValueAtTime(freqPitch * 0.5, this.ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.15, this.ctx.currentTime); 
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.15);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.15);
    } catch(e) {}
  }

  playPenalty() {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth'; 
      osc.frequency.setValueAtTime(150, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(50, this.ctx.currentTime + 0.2);
      gain.gain.setValueAtTime(0.15, this.ctx.currentTime); 
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.2);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.2);
    } catch(e) {}
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
  if (score >= 1200) return { level: 6, maxLife: 1.0, speed: 250, sizeMulti: 0.6, erratic: 1.0, color: '#e879f9', name: 'Grandmaster' }; 
  if (score >= 800)  return { level: 5, maxLife: 1.2, speed: 200, sizeMulti: 0.7, erratic: 0.8, color: '#ef4444', name: 'Master' };      
  if (score >= 500)  return { level: 4, maxLife: 1.5, speed: 160, sizeMulti: 0.8, erratic: 0.6, color: '#f97316', name: 'Diamond' };     
  if (score >= 250)  return { level: 3, maxLife: 2.0, speed: 120, sizeMulti: 0.9, erratic: 0.3, color: '#eab308', name: 'Platinum' };    
  if (score >= 100)  return { level: 2, maxLife: 2.5, speed: 80,  sizeMulti: 1.0, erratic: 0.1, color: '#3b82f6', name: 'Gold' };        
  return             { level: 1, maxLife: 3.0, speed: 50,  sizeMulti: 1.2, erratic: 0.0, color: '#22c55e', name: 'Silver' };       
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
  if (accuracy >= 95 && level >= 5) return "Elite mechanical control. Your precision and tracking speed are impeccable. Keep pushing your survival limits.";
  if (timeouts > misses) return "You are hesitating and allowing targets to expire. Timeouts cost you -1s without granting points. Speed up your target acquisition.";
  if (misses > timeouts) return "You are panic-clicking empty space and losing time (-1s per miss). Slow down slightly and ensure your crosshair is exactly on target before firing.";
  if (level < 3) return "Focus on tracking the singular target smoothly. As your score increases, it will shrink and move more erratically. Build consistency early.";
  return "Solid performance. Remember: your score never decreases, but time management is critical. Hit the target to buy more survival time.";
};

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function AimTrainerEliteClient() {
  const [gameState, setGameState] = useState('start'); 
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [pointerLocked, setPointerLocked] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [showRotationWarning, setShowRotationWarning] = useState(false);
  const [deviceType, setDeviceType] = useState('desktop');
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
    accuracy: 100, hits: 0, misses: 0, timeouts: 0, 
    avgReaction: 0, fastReaction: 0, maxCombo: 0, finalLevel: 1, 
    survivalTime: 0, rankData: null
  });

  // DOM Refs
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  const pageRef = useRef(null);

  // Engine State
  const engine = useRef({
    targets: [],
    score: 0, combo: 0, maxCombo: 0, timeLeft: 60, survivalTime: 0,
    hits: 0, misses: 0, timeouts: 0, totalActions: 0,
    reactionTimes: [], highestLevel: 1,
    particles: [], hitMarkers: [], flash: { color: null, alpha: 0 },
    pointerX: -100, pointerY: -100, isPointerDown: false
  });

  // Init & Settings Load
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
        const savedBest = localStorage.getItem('aimTrainerElite_bestScore'); 
        if (savedBest) setBestScore(parseInt(savedBest, 10));
        
        const savedSens = localStorage.getItem('aimTrainerElite_sens');
        if (savedSens) setUniversalSens(parseFloat(savedSens));
      } catch (e) {}

      return () => window.removeEventListener('resize', checkDevice);
    }
  }, []);

  useEffect(() => {
    if (gameState !== 'playing') {
      try { localStorage.setItem('aimTrainerElite_sens', universalSens.toString()); } catch (e) {}
    }
    if (audioSynth) audioSynth.setEnabled(soundEnabled);
  }, [soundEnabled, universalSens, gameState]);

  // Safety cleanup for pointer lock if unmounted mid-game
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
    const finalAccuracy = e.totalActions > 0 ? Math.round((e.hits / e.totalActions) * 100) : 0;
    const avgReact = e.reactionTimes.length > 0 ? Math.round(e.reactionTimes.reduce((a,b)=>a+b,0)/e.reactionTimes.length) : 0;
    const fastReact = e.reactionTimes.length > 0 ? Math.min(...e.reactionTimes) : 0;

    const rank = calculateRank(e.score, finalAccuracy, e.highestLevel);

    setAnalytics({
      accuracy: finalAccuracy, hits: e.hits, misses: e.misses, timeouts: e.timeouts,
      avgReaction: avgReact, fastReaction: fastReact, maxCombo: e.maxCombo, 
      finalLevel: e.highestLevel, survivalTime: Math.round(e.survivalTime), rankData: rank
    });

    setUiScore(e.score);

    setBestScore(prev => {
      if (e.score > prev) {
        setIsNewBest(true);
        try { localStorage.setItem('aimTrainerElite_bestScore', e.score.toString()); } catch(err){}
        return e.score;
      }
      return prev;
    });
  }, []);

  const spawnTarget = useCallback((width, height, config) => {
    let deviceMulti = 1.0;
    if (deviceType === 'desktop') deviceMulti = 1.2;
    if (deviceType === 'mobile') deviceMulti = 0.8;

    const baseRadius = 15; 
    const finalRadius = baseRadius * config.sizeMulti * deviceMulti;
    const pad = finalRadius + 10;
    const angle = Math.random() * Math.PI * 2;
    
    return {
      id: Math.random().toString(36).substring(2, 9),
      x: pad + Math.random() * (width - pad * 2),
      y: pad + Math.random() * (height - pad * 2),
      vx: Math.cos(angle) * config.speed,
      vy: Math.sin(angle) * config.speed,
      ax: 0, ay: 0,
      radius: finalRadius,
      maxRadius: finalRadius,
      age: 0,
      ttl: config.maxLife,
      color: config.color,
      erratic: config.erratic
    };
  }, [deviceType]);

  const createExplosion = (x, y, color) => {
    for (let i = 0; i < 12; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 4 + 1;
      engine.current.particles.push({ x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, life: 1.0, color });
    }
  };

  const startGame = useCallback(() => {
    if (audioSynth) audioSynth.init(); 

    // Synchronously request hardware locks to prevent browser blocking
    if (containerRef.current && !document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(()=>{});
    }
    if (deviceType === 'desktop' && canvasRef.current && !document.pointerLockElement) {
      canvasRef.current.requestPointerLock().catch(()=>{});
    }

    setIsNewBest(false);
    setUiScore(0); setUiCombo(0); setUiLevel(1); setUiAccuracy(100);
    setUiTimeLeft(60);
    
    setAnalytics({ accuracy: 100, hits: 0, misses: 0, timeouts: 0, avgReaction: 0, fastReaction: 0, maxCombo: 0, finalLevel: 1, survivalTime: 0, rankData: null });
    setGameState('playing');

    const startX = canvasRef.current ? canvasRef.current.width / 2 : 500;
    const startY = canvasRef.current ? canvasRef.current.height / 2 : 300;
    
    engine.current = {
      targets: [],
      score: 0, combo: 0, maxCombo: 0, timeLeft: 60, survivalTime: 0,
      hits: 0, misses: 0, timeouts: 0, totalActions: 0,
      reactionTimes: [], highestLevel: 1,
      particles: [], hitMarkers: [], flash: { color: null, alpha: 0 },
      pointerX: startX, pointerY: startY, isPointerDown: false
    };

    if (canvasRef.current) {
      const config = getLevelConfig(0);
      engine.current.targets.push(spawnTarget(canvasRef.current.width, canvasRef.current.height, config));
    }
  }, [spawnTarget, deviceType]);

  // Input Handling
  useEffect(() => {
    const cvs = canvasRef.current;
    if (!cvs || gameState !== 'playing') return;

    const updatePointer = (e) => {
      if (deviceType === 'desktop' && pointerLocked) {
        // Applying the universalSens multiplier to raw mouse movement
        engine.current.pointerX = Math.max(0, Math.min(cvs.width, engine.current.pointerX + e.movementX * universalSens));
        engine.current.pointerY = Math.max(0, Math.min(cvs.height, engine.current.pointerY + e.movementY * universalSens));
      } else if (deviceType !== 'desktop') {
        const rect = cvs.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        engine.current.pointerX = clientX - rect.left;
        engine.current.pointerY = clientY - rect.top;
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
      const px = eRef.pointerX;
      const py = eRef.pointerY;

      eRef.totalActions++;
      let hitIndex = -1;
      
      for (let i = eRef.targets.length - 1; i >= 0; i--) {
        const t = eRef.targets[i];
        const lifePercent = 1 - (t.age / t.ttl);
        const currentR = t.maxRadius * Math.max(0.3, lifePercent); 
        const dist = Math.hypot(px - t.x, py - t.y);
        
        if (dist <= currentR) { 
          hitIndex = i; break; 
        }
      }

      if (hitIndex !== -1) {
        const t = eRef.targets[hitIndex];
        eRef.hits++; eRef.combo++;
        if (eRef.combo > eRef.maxCombo) eRef.maxCombo = eRef.combo;
        eRef.reactionTimes.push(Math.round(t.age * 1000));
        eRef.score += 10; eRef.timeLeft += 1.0; 
        
        if (audioSynth) audioSynth.playHit(eRef.combo);
        createExplosion(t.x, t.y, t.color);
        eRef.hitMarkers.push({ x: px, y: py, life: 1.0 });
        eRef.targets.splice(hitIndex, 1);

        const config = getLevelConfig(eRef.score);
        if (config.level > eRef.highestLevel) eRef.highestLevel = config.level;
        
        setUiLevel(config.level); setUiScore(eRef.score);
        setUiCombo(eRef.combo); setUiAccuracy(Math.round((eRef.hits / eRef.totalActions) * 100));

        while (eRef.targets.length < 1) {
          eRef.targets.push(spawnTarget(cvs.width, cvs.height, config));
        }
      } else {
        eRef.misses++; eRef.combo = 0; eRef.timeLeft -= 1.0; 
        if (audioSynth) audioSynth.playPenalty();
        createExplosion(px, py, '#ef4444');
        eRef.flash = { color: '239, 68, 68', alpha: 0.2 };
        setUiCombo(0); setUiAccuracy(Math.round((eRef.hits / eRef.totalActions) * 100));
      }
    };

    const handlePointerUp = () => { engine.current.isPointerDown = false; };

    if (deviceType === 'desktop') {
      document.addEventListener('mousemove', updatePointer);
      document.addEventListener('mousedown', handlePointerDown);
    } else {
      cvs.addEventListener('pointermove', updatePointer);
      cvs.addEventListener('pointerdown', handlePointerDown);
      cvs.addEventListener('pointerup', handlePointerUp);
      cvs.addEventListener('pointercancel', handlePointerUp);
    }

    return () => {
      document.removeEventListener('mousemove', updatePointer);
      document.removeEventListener('mousedown', handlePointerDown);
      cvs.removeEventListener('pointermove', updatePointer);
      cvs.removeEventListener('pointerdown', handlePointerDown);
      cvs.removeEventListener('pointerup', handlePointerUp);
      cvs.removeEventListener('pointercancel', handlePointerUp);
    };
  }, [gameState, deviceType, pointerLocked, universalSens, spawnTarget]);

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

        for (let i = e.targets.length - 1; i >= 0; i--) {
          const t = e.targets[i];
          t.age += dt;

          if (t.age >= t.ttl) {
            e.timeouts++;
            e.timeLeft -= 1.0;
            e.combo = 0;
            e.flash = { color: '249, 115, 22', alpha: 0.2 }; 
            
            if (audioSynth) audioSynth.playPenalty();
            createExplosion(t.x, t.y, '#f97316');
            setUiCombo(0);

            e.targets.splice(i, 1);
            const config = getLevelConfig(e.score);
            e.targets.push(spawnTarget(cvs.width, cvs.height, config));
            continue;
          }

          if (t.erratic > 0 && Math.random() < t.erratic * dt * 5) {
            t.ax = (Math.random() - 0.5) * 2000 * t.erratic;
            t.ay = (Math.random() - 0.5) * 2000 * t.erratic;
          }

          t.vx += t.ax * dt;
          t.vy += t.ay * dt;

          const config = getLevelConfig(e.score);
          const maxSpd = config.speed * 1.5;
          const currentSpd = Math.hypot(t.vx, t.vy);
          if (currentSpd > maxSpd) {
            t.vx = (t.vx / currentSpd) * maxSpd;
            t.vy = (t.vy / currentSpd) * maxSpd;
          }

          t.x += t.vx * dt;
          t.y += t.vy * dt;

          const margin = t.maxRadius;
          if (t.x < margin) { t.x = margin; t.vx *= -1; t.ax *= -1; }
          else if (t.x > cvs.width - margin) { t.x = cvs.width - margin; t.vx *= -1; t.ax *= -1; }
          if (t.y < margin) { t.y = margin; t.vy *= -1; t.ay *= -1; }
          else if (t.y > cvs.height - margin) { t.y = cvs.height - margin; t.vy *= -1; t.ay *= -1; }
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

      ctx.strokeStyle = 'rgba(34, 197, 94, 0.03)';
      ctx.lineWidth = 1;
      for (let i = 0; i < cvs.width; i += 60) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, cvs.height); ctx.stroke(); }
      for (let j = 0; j < cvs.height; j += 60) { ctx.beginPath(); ctx.moveTo(0, j); ctx.lineTo(cvs.width, j); ctx.stroke(); }

      if (gameState === 'playing' || gameState === 'start') {
        e.targets.forEach(t => {
          const lifePercent = Math.max(0, 1 - (t.age / t.ttl));
          const currentR = t.maxRadius * Math.max(0.3, lifePercent); 
          
          ctx.shadowBlur = 10; 
          ctx.shadowColor = t.color; 
          
          ctx.fillStyle = t.color;
          ctx.beginPath(); ctx.arc(t.x, t.y, currentR, 0, Math.PI * 2); ctx.fill();
          ctx.shadowBlur = 0;

          ctx.fillStyle = '#ffffff';
          ctx.beginPath(); ctx.arc(t.x, t.y, currentR * 0.6, 0, Math.PI * 2); ctx.fill();

          ctx.fillStyle = t.color;
          ctx.beginPath(); ctx.arc(t.x, t.y, currentR * 0.25, 0, Math.PI * 2); ctx.fill();

          const ringColor = lifePercent > 0.4 ? t.color : '#ef4444';
          ctx.strokeStyle = ringColor;
          ctx.lineWidth = 2;
          ctx.beginPath(); ctx.arc(t.x, t.y, currentR + 4 + (lifePercent * 10), 0, Math.PI * 2); ctx.stroke();
        });
      }

      for (let i = e.particles.length - 1; i >= 0; i--) {
        const p = e.particles[i];
        p.x += p.vx; p.y += p.vy; p.life -= dt * 2.5;
        if (p.life <= 0) { e.particles.splice(i, 1); continue; }
        ctx.globalAlpha = p.life; ctx.fillStyle = p.color; ctx.beginPath(); ctx.arc(p.x, p.y, 2, 0, Math.PI*2); ctx.fill();
      }

      ctx.lineWidth = 2;
      for (let i = e.hitMarkers.length - 1; i >= 0; i--) {
        const hm = e.hitMarkers[i];
        hm.life -= dt * 3.0;
        if (hm.life <= 0) { e.hitMarkers.splice(i, 1); continue; }
        ctx.globalAlpha = hm.life; ctx.strokeStyle = '#ffffff';
        const s = 4 + (1 - hm.life) * 6;
        ctx.beginPath();
        ctx.moveTo(hm.x - s, hm.y - s); ctx.lineTo(hm.x + s, hm.y + s);
        ctx.moveTo(hm.x + s, hm.y - s); ctx.lineTo(hm.x - s, hm.y + s);
        ctx.stroke();
      }
      ctx.globalAlpha = 1.0;

      if ((gameState === 'playing' || gameState === 'start') && deviceType === 'desktop') {
        const px = e.pointerX;
        const py = e.pointerY;
        
        const activeColor = pointerLocked ? '#22c55e' : '#eab308';
        ctx.strokeStyle = activeColor;
        ctx.fillStyle = activeColor;
        
        ctx.lineWidth = 2;
        ctx.beginPath(); ctx.arc(px, py, 16, 0, Math.PI * 2); ctx.stroke();

        ctx.lineWidth = 1.5;
        const gap = 6;
        ctx.beginPath();
        ctx.moveTo(px, py - 16); ctx.lineTo(px, py - gap);
        ctx.moveTo(px, py + 16); ctx.lineTo(px, py + gap);
        ctx.moveTo(px - 16, py); ctx.lineTo(px - gap, py);
        ctx.moveTo(px + 16, py); ctx.lineTo(px + gap, py);
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
  }, [gameState, deviceType, pointerLocked, spawnTarget, endGame]);

  const shareScore = useCallback(async () => {
    const text = `🎯 I scored ${uiScore} PTS (${analytics.rankData.rank}) on Mouse Accuracy Test! Survival Time: ${analytics.survivalTime}s | Acc: ${analytics.accuracy}%. Try to beat my score at skilldrills.online!`;
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({ title: 'My Mouse Accuracy Score', text, url: 'https://skilldrills.online/drills/motor/hand-eye-coordination/aim-trainer' });
      } catch (e) {}
    } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      alert('Score card copied to clipboard!');
    }
  }, [uiScore, analytics]);

  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://skilldrills.online/" },
          { "@type": "ListItem", "position": 2, "name": "Motor Drills", "item": "https://skilldrills.online/drills/motor" },
          { "@type": "ListItem", "position": 3, "name": "Hand-Eye Coordination", "item": "https://skilldrills.online/drills/motor" },
          { "@type": "ListItem", "position": 4, "name": "Mouse Accuracy Test" }
        ]
      },
      {
        "@type": "WebApplication",
        "name": "Mouse Accuracy Test - Free Click Accuracy Drill & Aim Trainer",
        "applicationCategory": "GameApplication",
        "operatingSystem": "Any",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
      }
    ]
  };

  return (
    <div ref={pageRef} className="min-h-screen select-none bg-[#050508] text-white">
      <Head>
        <title>Mouse Accuracy Test - Free Click Accuracy Drill & Aim Trainer</title>
        <meta name="description" content="Free Mouse Accuracy Test and Click Accuracy Drill. Improve precision aiming, flick shots, hand-eye coordination, and FPS aim with adaptive difficulty. No download required." />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
      </Head>

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
                <li className="text-green-400 font-medium">Mouse Accuracy Test</li>
              </ol>
            </nav>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-[0_0_20px_rgba(34,197,94,0.3)]">
                  <MousePointer2 className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Mouse Accuracy Test</h1>
                  <p className="text-sm text-gray-400 mt-1 font-medium">Click Accuracy Drill • Adaptive Difficulty</p>
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
            <StatCard icon={<TrendingUp className={getLevelConfig(uiScore).color.replace('#', 'text-[')} />} value={`Lv. ${uiLevel}`} label="Level" />
            <StatCard icon={<Timer className={uiTimeLeft <= 10 ? 'text-red-400 animate-pulse' : 'text-green-400'} />} value={Math.floor(uiTimeLeft)} label="Time" unit="s" />
            <StatCard icon={<Target className="text-blue-400" />} value={`${uiAccuracy}%`} label="Accuracy" />
            <StatCard icon={<Flame className={uiCombo >= 10 ? "text-orange-500 animate-pulse" : "text-gray-500"} />} value={uiCombo} label="Combo" highlight={uiCombo >= 10} />
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
              <p className="text-sm text-gray-400 mb-6 max-w-xs">Landscape mode is highly recommended for the best target acquisition experience.</p>
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
                className={`h-full transition-all ease-linear ${uiTimeLeft <= 10 ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`}
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
                <AlertCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
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
                  Mouse Accuracy Test
                </h2>
                <p className="text-xs text-slate-500 uppercase tracking-widest mb-6">
                  Hardware Raw Input • Survival Mode
                </p>

                <div className="grid grid-cols-2 gap-3 mb-6 text-left">
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Objective</span>
                    <span className="text-sm font-black text-white">Click Targets</span>
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
                  className="w-full py-4 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl text-sm flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(34,197,94,0.3)] uppercase tracking-widest transition-all duration-200 active:scale-95"
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
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Fastest React</span>
                    <span className="text-lg font-black text-white">{analytics.fastReaction}ms</span>
                  </div>
                  
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Max Combo</span>
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
                    <Sparkles className="w-3.5 h-3.5 text-green-500" /> Coaching Insight:
                  </div>
                  <p className="leading-relaxed">
                    {getSuggestion(analytics.accuracy, analytics.misses, analytics.timeouts, analytics.finalLevel)}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={startGame}
                    className="flex-1 py-3 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg uppercase tracking-widest transition-all duration-200 active:scale-95"
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
                <Info className="w-5 h-5 text-green-400" /><h2 className="font-bold text-white text-lg tracking-wide">Progression & Rules</h2>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-5">
                  <RuleItem num="1" color="green" text="Correct Hit" highlight="+10 PTS & +1s Time" result="Score only goes up" />
                  <RuleItem num="2" color="blue" text="Level Scaling" highlight="Based on Score" result="Targets get faster & smaller" />
                </div>
                <div className="space-y-5">
                  <RuleItem num="3" color="red" text="Miss Click" highlight="-1s Time Penalty" result="No double punishments" />
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
                <GraduationCap className="w-5 h-5 text-green-400" />
                <h2 className="font-bold text-white text-lg tracking-wide">About the Mouse Accuracy Test</h2>
              </div>
              <div className="p-8 space-y-8">
                
                <section>
                  <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                    <MousePointer2 className="w-5 h-5 text-blue-400" /> What Is A Mouse Accuracy Test?
                  </h3>
                  <p className="text-sm leading-relaxed mb-4 text-gray-300">
                    A <strong>Mouse Accuracy Test</strong> is a specialized mechanical drill designed to measure and improve your hand-eye coordination, reaction speed, and precise clicking accuracy. Unlike static clicking tests, this aim trainer uses dynamic targets that move, shrink, and accelerate, requiring you to continuously adjust your crosshair and click with precision. 
                  </p>
                  <p className="text-sm leading-relaxed mb-4 text-gray-300">
                    This drill features a unique <strong>survival time mechanic</strong>. You are never punished with negative scores. Instead, mistakes (like clicking empty space or letting a target expire) drain your clock, forcing you to balance raw speed with careful, deliberate precision.
                  </p>
                </section>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 py-4">
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                    <h4 className="text-sm font-bold text-red-400 mb-2">Benefits for Valorant</h4>
                    <p className="text-xs leading-relaxed text-gray-400">Improves micro-adjustments and the first-shot accuracy necessary to win immediate tactical gunfights and hold tight angles.</p>
                  </div>
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                    <h4 className="text-sm font-bold text-yellow-400 mb-2">Benefits for CS2</h4>
                    <p className="text-xs leading-relaxed text-gray-400">Builds the foundational crosshair placement, precise clicking, and reaction speed required for effective AWPing and tapping.</p>
                  </div>
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                    <h4 className="text-sm font-bold text-blue-400 mb-2">Benefits for Apex / COD</h4>
                    <p className="text-xs leading-relaxed text-gray-400">The erratic, moving targets simulate the unpredictable strafing patterns found in fast-paced, high-TTK tracking shooters.</p>
                  </div>
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40">
                    <h4 className="text-sm font-bold text-emerald-400 mb-2">General Mouse Control</h4>
                    <p className="text-xs leading-relaxed text-gray-400">Refines overall hand-eye coordination, boosting general computer navigation speed and cognitive reaction time.</p>
                  </div>
                </div>

                <section className="bg-[#0b0f19] border border-gray-800 rounded-xl p-6">
                  <h3 className="text-base font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-500" /> How Score-Based Difficulty Works
                  </h3>
                  <p className="text-sm leading-relaxed mb-4 text-gray-400">
                    Many aim trainers use <em>streak-based</em> difficulty, meaning one missed shot completely resets your progress. We replaced this with an intelligent <strong>score-based difficulty engine</strong>. As your total score climbs, you ascend through 6 distinct levels. Targets will spawn smaller, move faster, behave more erratically, and expire quicker. This creates a challenging but fair environment where consistent practice is rewarded with measurable progression.
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
                  <FAQItem q="What is a Mouse Accuracy Test?" a="A Mouse Accuracy Test is a browser-based mechanical drill designed to measure and improve your hand-eye coordination, reaction speed, and precise clicking accuracy using dynamic targets." />
                  <FAQItem q="How does click accuracy training work?" a="By forcing you to quickly locate, track, and click targets that dynamically shrink and speed up, you build raw motor memory that translates directly to aiming mechanics in any environment." />
                  <FAQItem q="Can this improve FPS aim?" a="Yes. This drill specifically isolates the mechanical skills required to rapidly move your crosshair to a target and click precisely, which is the foundation of all FPS aiming." />
                  <FAQItem q="Is this good for Valorant or CS2?" a="Absolutely. Clicking small targets accurately under time pressure directly improves your micro-flicking, reaction speed, and first-shot accuracy necessary for tactical shooters." />
                  <FAQItem q="How is accuracy calculated?" a="Accuracy is the percentage of your clicks that successfully land on a target versus clicks that miss and hit empty space." />
                  <FAQItem q="How does score-based difficulty work?" a="As you earn more points, you ascend through levels 1-6. Targets become smaller, move faster, behave more erratically, and expire quicker to constantly push your skill ceiling." />
                  <FAQItem q="What is a good score?" a="A score over 500 (Diamond rank) is very good. Elite players can consistently score over 1200 (Grandmaster)." />
                  <FAQItem q="How does the time system work?" a="You start with 60 seconds. Every correct hit grants +1 second. Every miss or timeout deducts -1 second. Your goal is to survive as long as possible." />
                  <FAQItem q="Can I play on mobile?" a="Yes! The drill is fully responsive and supports touch inputs, dynamically scaling the target sizes to match your device." />
                  <FAQItem q="How often should I practice?" a="10-15 minutes of daily practice is recommended to build and maintain the muscle memory required for peak mouse accuracy." />
                  <FAQItem q="Does this help reaction speed?" a="Yes. The fast-expiring targets at higher levels force you to process visual information and execute physical clicks much faster." />
                  <FAQItem q="Is this free?" a="Yes, this Mouse Accuracy Test is 100% free with no sign-ups or downloads required." />
                </div>
              </div>
            </div>
          </article>
        )}

        {/* RELATED DRILLS SECTION */}
        {!isFullscreen && (
          <section className="mt-14" aria-label="Explore related aim and response drills">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-5 rounded-full bg-green-500"></div>
              <h2 className="text-xs font-bold text-white uppercase tracking-widest font-mono">
                Explore FPS Drills
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <RelatedCard href="/drills/fps/target-switching-swarm" title="Target Switching" desc="Continuous multi-target pressure." color="cyan" icon={<Users className="w-4 h-4" />} />
              <RelatedCard href="/drills/fps/180-degree-awareness" title="180° Awareness Pro" desc="Alternate snapping opposite horizons." color="orange" icon={<Zap className="w-4 h-4" />} />
              <RelatedCard href="/drills/fps/flick-shot-training" title="Pro Flick Trainer" desc="Snap to targets in time-attack mode." color="blue" icon={<Crosshair className="w-4 h-4" />} />
              <RelatedCard href="/drills/fps/angle-hold-trainer" title="Angle Hold Trainer" desc="React to peeking targets instantly." color="red" icon={<Shield className="w-4 h-4" />} />
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
                    <li><Link href="/drills/motor/hand-eye-coordination/aim-trainer" className="text-green-500 font-bold hover:text-green-400 transition-colors">Mouse Accuracy Test</Link></li>
                    <li><Link href="/drills/fps/flick-shot-training" className="hover:text-green-400 transition-colors">Flick Shot Trainer</Link></li>
                    <li><Link href="/drills/fps" className="hover:text-green-400 transition-colors font-bold">All FPS Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Memory</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/memory/working-memory/n-back" className="hover:text-green-400 transition-colors">3-Back Training</Link></li>
                    <li><Link href="/drills/memory/short-term-memory/color-sequence" className="hover:text-green-400 transition-colors">Color Sequence</Link></li>
                    <li><Link href="/drills/memory" className="hover:text-green-400 transition-colors font-bold">All Memory Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Cognitive</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/cognitive/memory/card-matching" className="hover:text-green-400 transition-colors">Memory Games</Link></li>
                    <li><Link href="/drills/cognitive/attention/divided-attention" className="hover:text-green-400 transition-colors">Attention Drills</Link></li>
                    <li><Link href="/drills/cognitive" className="hover:text-green-400 transition-colors font-bold">All Cognitive Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Academic</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/academic/writing-speed/typing-test" className="hover:text-green-400 transition-colors">Typing Speed Test</Link></li>
                    <li><Link href="/drills/academic/math-speed/mental-math" className="hover:text-green-400 transition-colors">Mental Math</Link></li>
                    <li><Link href="/drills/academic" className="hover:text-green-400 transition-colors font-bold">All Academic Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">More Sectors</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/visual" className="hover:text-green-400 transition-colors">Visual</Link></li>
                    <li><Link href="/drills/physical" className="hover:text-green-400 transition-colors">Physical</Link></li>
                  </ul>
                </div>
              </div>
              
              <div className="border-t border-slate-900 pt-8 text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="w-6 h-6 bg-gradient-to-br from-green-500/25 to-emerald-500/25 border border-green-500/30 rounded-lg flex items-center justify-center">
                    <MousePointer2 className="w-3.5 h-3.5 text-green-400" />
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
    <Link href={href} className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-[#0b0f19]/40 transition-all hover:-translate-y-1 hover:border-green-500/50 block p-5">
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${gradients[color] || 'from-green-500 to-emerald-500'}`}></div>
      <div className="w-10 h-10 rounded-xl bg-[#050811] border border-slate-700 flex items-center justify-center text-slate-400 group-hover:text-white mb-3 shadow-inner">
        {icon}
      </div>
      <h3 className="font-bold text-base mb-1.5 text-white group-hover:text-green-400 transition-colors">{title}</h3>
      <p className="text-xs text-slate-500 mb-4">{desc}</p>
      <div className="flex items-center gap-1.5 text-green-400 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-wider">
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