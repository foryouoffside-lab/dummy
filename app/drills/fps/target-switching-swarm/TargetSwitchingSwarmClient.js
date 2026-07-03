'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Head from 'next/head';

import { 
  Activity, AlertCircle, ArrowRight, BarChart3, ChevronRight, 
  Clock, Crosshair, Eye, GraduationCap, Info, Lightbulb, 
  Maximize2, Minimize2, Play, RefreshCw, Target, 
  Timer, TrendingUp, Trophy, Volume2, VolumeX, Zap, 
  Users, CheckCircle2, XCircle, Shield, Sparkles, Flame,
  Share2, Brain, Sliders, MonitorX, Cross
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

  playPop(combo = 0) {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine'; 
      const baseFreq = 600;
      const freqPitch = Math.min(1200, baseFreq + (combo * 15));
      osc.frequency.setValueAtTime(freqPitch, this.ctx.currentTime); 
      osc.frequency.exponentialRampToValueAtTime(freqPitch * 0.5, this.ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.15, this.ctx.currentTime); 
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.1);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.1);
    } catch(e) {}
  }

  playChainBonus() {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, this.ctx.currentTime);
      osc.frequency.setValueAtTime(1108.73, this.ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.4);
      osc.connect(gain); gain.connect(this.ctx.destination);
      osc.start(); osc.stop(this.ctx.currentTime + 0.4);
    } catch(e) {}
  }

  playThud() {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle'; 
      osc.frequency.setValueAtTime(150, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.2, this.ctx.currentTime); 
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
const DRILL_DURATION = 60; // 60 seconds strict

// ============================================================
// RANK & DIFFICULTY SYSTEM
// ============================================================
const getLevelConfig = (score) => {
  if (score >= 800) return { level: 5, count: 5, ttl: 800, speedBase: 220, color: '#ef4444', uiColor: 'text-red-500' };
  if (score >= 500) return { level: 4, count: 5, ttl: 1100, speedBase: 180, color: '#f97316', uiColor: 'text-orange-500' };
  if (score >= 250) return { level: 3, count: 4, ttl: 1400, speedBase: 140, color: '#f59e0b', uiColor: 'text-yellow-500' };
  if (score >= 100) return { level: 2, count: 3, ttl: 1800, speedBase: 100, color: '#3b82f6', uiColor: 'text-blue-500' };
  return { level: 1, count: 2, ttl: 2200, speedBase: 60, color: '#22c55e', uiColor: 'text-green-500' };
};

const calculateRank = (score, accuracy) => {
  if (score >= 1500 && accuracy >= 90) return { rank: 'Professional Entry Fragger', color: 'text-fuchsia-400' };
  if (score >= 1000 && accuracy >= 85) return { rank: 'Mechanical Predator', color: 'text-purple-400' };
  if (score >= 800 && accuracy >= 80) return { rank: 'Target Switching Master', color: 'text-red-400' };
  if (score >= 500 && accuracy >= 75) return { rank: 'Tactical Specialist', color: 'text-orange-400' };
  if (score >= 300 && accuracy >= 70) return { rank: 'Elite Fragger', color: 'text-yellow-400' };
  if (score >= 150) return { rank: 'Assaulter', color: 'text-blue-400' };
  if (score >= 50) return { rank: 'Operator', color: 'text-emerald-400' };
  if (score >= 20) return { rank: 'Shooter', color: 'text-slate-300' };
  if (score > 0) return { rank: 'Cadet', color: 'text-slate-400' };
  return { rank: 'Recruit', color: 'text-slate-500' };
};

const getSuggestion = (misses, timeouts, avgDist, maxChain) => {
  if (misses > timeouts && misses > 10) return "You are overflicking and missing the targets entirely. Ensure your crosshair completely stops before clicking. Try slightly lowering your Sens.";
  if (timeouts > misses && timeouts > 5) return "You hesitate after eliminations causing timeouts. The moment you click a target, your eyes should already be scanning for the next one.";
  if (avgDist > 400 && maxChain < 10) return "Inefficient pathing. You are wasting movement on unnecessary large flicks. Try to identify clusters and clear close targets first.";
  if (maxChain >= 20) return "Excellent target relocation and strong multi-target awareness. Your target pathing is highly efficient.";
  return "Solid target acquisition. Focus on maintaining your Switch Chain to build score multipliers without letting targets decay.";
};

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function TargetSwitchingSwarmClient() {
  const [gameState, setGameState] = useState('start'); 
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [pointerLocked, setPointerLocked] = useState(false);
  const [universalSens, setUniversalSens] = useState(1.0);
  const [isMobile, setIsMobile] = useState(false);

  // HUD State
  const [uiScore, setUiScore] = useState(0);
  const [uiChain, setUiChain] = useState(0);
  const [uiLevel, setUiLevel] = useState(1);
  const [uiTargets, setUiTargets] = useState(2);
  const [uiTimeLeft, setUiTimeLeft] = useState(DRILL_DURATION);
  const [bestScore, setBestScore] = useState(0);
  const [isNewBest, setIsNewBest] = useState(false);

  const [analytics, setAnalytics] = useState({
    accuracy: 100, successfulHits: 0, missedClicks: 0, timeouts: 0, 
    maxChain: 0, avgKillDist: 0, tpm: 0, finalLevel: 1, rankData: null
  });

  // DOM Refs
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  const pageRef = useRef(null);
  const progressBarRef = useRef(null); 
  const lastTimeRef = useRef(DRILL_DURATION); 

  // Engine State
  const engine = useRef({
    crosshair: { x: 0, y: 0, initialized: false },
    targets: [],
    score: 0, chain: 0, maxChain: 0, timeLeft: DRILL_DURATION,
    successfulHits: 0, missedClicks: 0, timeouts: 0, totalActions: 0,
    lastHitPos: null, totalKillDist: 0,
    particles: [], hitMarkers: [], screenShake: 0, flash: { color: null, alpha: 0 }
  });

  const cmPer360 = (30 / universalSens).toFixed(1);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const checkMobile = () => {
        setIsMobile(/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent) || window.innerWidth < 768 || ('ontouchstart' in window));
      };
      checkMobile();
      window.addEventListener('resize', checkMobile);
      return () => window.removeEventListener('resize', checkMobile);
    }
  }, []);

  useEffect(() => {
    try {
      const savedSens = localStorage.getItem('targetSwarm_sens');
      if (savedSens) setUniversalSens(parseFloat(savedSens));
      const savedBest = localStorage.getItem('targetSwarm_bestScore'); 
      if (savedBest) setBestScore(parseInt(savedBest, 10));
    } catch (e) {}
  }, []);

  useEffect(() => {
    if (gameState !== 'playing') {
      try { localStorage.setItem('targetSwarm_sens', universalSens.toString()); } catch (e) {}
    }
    if (audioSynth) audioSynth.setEnabled(soundEnabled);
  }, [universalSens, gameState, soundEnabled]);

  // Core Game Management
  const endGame = useCallback(() => {
    setGameState('gameOver');
    if (document.pointerLockElement) document.exitPointerLock();
    
    const e = engine.current;
    const finalAccuracy = e.totalActions > 0 ? Math.round((e.successfulHits / e.totalActions) * 100) : 0;
    const avgDist = e.successfulHits > 1 ? Math.round(e.totalKillDist / (e.successfulHits - 1)) : 0;
    const tpm = Math.round((e.successfulHits / DRILL_DURATION) * 60);

    const rank = calculateRank(e.score, finalAccuracy);

    setAnalytics({
      accuracy: finalAccuracy, successfulHits: e.successfulHits, missedClicks: e.missedClicks,
      timeouts: e.timeouts, maxChain: e.maxChain, avgKillDist: avgDist, tpm, 
      finalLevel: getLevelConfig(e.score).level, rankData: rank
    });

    setUiScore(e.score);

    setBestScore(prev => {
      if (e.score > prev) {
        setIsNewBest(true);
        try { localStorage.setItem('targetSwarm_bestScore', e.score.toString()); } catch(err){}
        return e.score;
      }
      return prev;
    });
  }, []);

  const spawnTarget = useCallback((width, height, config) => {
    const pad = 40;
    const archetypes = ['drifter', 'sprinter', 'zig-zag', 'bouncer'];
    const type = archetypes[Math.floor(Math.random() * archetypes.length)];
    
    let speed = config.speedBase + Math.random() * 50;
    if (type === 'sprinter') speed *= 1.5;
    
    const angle = Math.random() * Math.PI * 2;
    
    return {
      id: Math.random().toString(36).substring(2, 9),
      x: pad + Math.random() * (width - pad * 2),
      y: pad + Math.random() * (height - pad * 2),
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      baseSpeed: speed,
      archetype: type,
      radius: 22,
      age: 0,
      ttl: config.ttl,
      color: config.color,
      timer: 0 // for zig-zag logic
    };
  }, []);

  const createExplosion = (x, y, color) => {
    for (let i = 0; i < 15; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 5 + 1;
      engine.current.particles.push({ x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, life: 1.0, color });
    }
  };

  const createHitMarker = (x, y) => {
    engine.current.hitMarkers.push({ x, y, life: 1.0 });
  };

  const startGame = useCallback(async () => {
    if (isMobile) return;
    if (audioSynth) audioSynth.init(); 

    setIsNewBest(false);
    setUiScore(0); setUiChain(0); setUiLevel(1); setUiTargets(2);
    setUiTimeLeft(DRILL_DURATION);
    lastTimeRef.current = DRILL_DURATION;
    
    setAnalytics({ accuracy: 100, successfulHits: 0, missedClicks: 0, timeouts: 0, maxChain: 0, avgKillDist: 0, tpm: 0, finalLevel: 1, rankData: null });
    setGameState('playing');
    
    engine.current = {
      crosshair: { ...engine.current.crosshair },
      targets: [],
      score: 0, chain: 0, maxChain: 0, timeLeft: DRILL_DURATION,
      successfulHits: 0, missedClicks: 0, timeouts: 0, totalActions: 0,
      lastHitPos: null, totalKillDist: 0,
      particles: [], hitMarkers: [], screenShake: 0, flash: { color: null, alpha: 0 }
    };

    try {
      if (containerRef.current && !document.fullscreenElement) {
        await containerRef.current.requestFullscreen();
      }
    } catch(e) {}

    setTimeout(() => {
      if (canvasRef.current && !document.pointerLockElement) {
        canvasRef.current.requestPointerLock().catch(()=>{});
      }
      if (canvasRef.current) {
        const config = getLevelConfig(0);
        for(let i=0; i<config.count; i++) {
          engine.current.targets.push(spawnTarget(canvasRef.current.width, canvasRef.current.height, config));
        }
      }
    }, 150);
  }, [isMobile, spawnTarget]);

  // Event Listeners for Input
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
          canvasRef.current.requestPointerLock();
        } else if (pointerLocked) {
          
          const eRef = engine.current;
          eRef.totalActions++;
          
          const ch = eRef.crosshair;
          let hitIndex = -1;

          // Check hits backwards for visual layering
          for (let i = eRef.targets.length - 1; i >= 0; i--) {
            const t = eRef.targets[i];
            const dist = Math.hypot(ch.x - t.x, ch.y - t.y);
            if (dist <= t.radius + 8) { // Hitbox buffer
              hitIndex = i;
              break;
            }
          }

          if (hitIndex !== -1) {
            // HIT
            const t = eRef.targets[hitIndex];
            eRef.successfulHits++;
            eRef.chain++;
            if (eRef.chain > eRef.maxChain) eRef.maxChain = eRef.chain;
            
            // Path tracking
            if (eRef.lastHitPos) {
              eRef.totalKillDist += Math.hypot(ch.x - eRef.lastHitPos.x, ch.y - eRef.lastHitPos.y);
            }
            eRef.lastHitPos = { x: ch.x, y: ch.y };

            // Score & Chain Bonus
            eRef.score += 10;
            let chainBonus = 0;
            if (eRef.chain === 5) chainBonus = 25;
            if (eRef.chain === 10) chainBonus = 75;
            if (eRef.chain === 20) chainBonus = 200;
            if (eRef.chain === 40) chainBonus = 500;
            
            if (chainBonus > 0) {
              eRef.score += chainBonus;
              if (audioSynth) audioSynth.playChainBonus();
            } else {
              if (audioSynth) audioSynth.playPop(eRef.chain);
            }

            eRef.timeLeft = Math.min(60, eRef.timeLeft + 2); // +2s Time
            
            createExplosion(t.x, t.y, t.color);
            createHitMarker(ch.x, ch.y);
            eRef.targets.splice(hitIndex, 1);

            // Level & Swarm Sync
            const config = getLevelConfig(eRef.score);
            setUiLevel(config.level);
            setUiTargets(config.count);
            
            // Replenish swarm up to config count
            while (eRef.targets.length < config.count) {
              eRef.targets.push(spawnTarget(canvasRef.current.width, canvasRef.current.height, config));
            }

            setUiScore(eRef.score);
            setUiChain(eRef.chain);
            
          } else {
            // MISS
            eRef.missedClicks++;
            eRef.timeLeft = Math.max(0, eRef.timeLeft - 2); // -2s Time
            eRef.chain = 0;
            eRef.screenShake = 6;
            eRef.flash = { color: '239, 68, 68', alpha: 0.3 };
            setUiChain(0);
            if (audioSynth) audioSynth.playThud();
            createExplosion(ch.x, ch.y, '#ef4444');
          }
        }
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, [gameState, pointerLocked, universalSens, spawnTarget]);

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
        
        if (e.timeLeft > 0) e.timeLeft -= dt;

        if (e.timeLeft <= 0) {
          e.timeLeft = 0;
          setUiTimeLeft(0);
          if (progressBarRef.current) progressBarRef.current.style.width = '0%';
          endGame();
          return; 
        }

        if (progressBarRef.current) {
            progressBarRef.current.style.width = `${Math.min(100, (e.timeLeft / DRILL_DURATION) * 100)}%`;
            progressBarRef.current.className = `h-full transition-all ease-linear ${e.timeLeft <= 10 ? 'bg-red-500 animate-pulse' : 'bg-cyan-500'}`;
        }

        const intTime = Math.ceil(e.timeLeft);
        if (intTime !== lastTimeRef.current) {
            setUiTimeLeft(intTime);
            lastTimeRef.current = intTime;
        }

        // Target Update
        for (let i = e.targets.length - 1; i >= 0; i--) {
          const t = e.targets[i];
          t.age += deltaTimeMs;

          if (t.age >= t.ttl) {
            // TIMEOUT
            e.timeouts++;
            e.timeLeft = Math.max(0, e.timeLeft - 2); // -2s Time Penalty
            e.chain = 0;
            e.screenShake = 8;
            e.flash = { color: '239, 68, 68', alpha: 0.3 };
            setUiChain(0);
            if (audioSynth) audioSynth.playThud();
            createExplosion(t.x, t.y, '#ef4444');
            
            // Replace
            e.targets.splice(i, 1);
            const config = getLevelConfig(e.score);
            e.targets.push(spawnTarget(cvs.width, cvs.height, config));
            continue;
          }

          // Move Archetypes
          t.x += t.vx * dt;
          t.y += t.vy * dt;

          if (t.archetype === 'zig-zag') {
            t.timer += dt;
            if (t.timer > 0.5) {
              t.vy = -t.vy;
              t.timer = 0;
            }
          } else if (t.archetype === 'drifter') {
            // Smooth float, mostly straight
          }

          // Wall Bounce
          if (t.x - t.radius < 10) { t.x = 10 + t.radius; t.vx *= -1; }
          else if (t.x + t.radius > cvs.width - 10) { t.x = cvs.width - 10 - t.radius; t.vx *= -1; }
          if (t.y - t.radius < 10) { t.y = 10 + t.radius; t.vy *= -1; }
          else if (t.y + t.radius > cvs.height - 10) { t.y = cvs.height - 10 - t.radius; t.vy *= -1; }
        }
      }

      ctx.save();
      
      if (e.screenShake > 0) {
        const sx = (Math.random() - 0.5) * e.screenShake;
        const sy = (Math.random() - 0.5) * e.screenShake;
        ctx.translate(sx, sy);
        e.screenShake *= 0.85;
        if (e.screenShake < 0.5) e.screenShake = 0;
      }

      ctx.fillStyle = '#05060b';
      ctx.fillRect(0, 0, cvs.width, cvs.height);

      if (e.flash.alpha > 0) {
        ctx.fillStyle = `rgba(${e.flash.color}, ${e.flash.alpha})`;
        ctx.fillRect(0, 0, cvs.width, cvs.height);
        e.flash.alpha -= dt * 2.0; 
      }

      // Grid Pattern
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.03)';
      ctx.lineWidth = 1;
      for (let i = 0; i < cvs.width; i += 60) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, cvs.height); ctx.stroke(); }
      for (let j = 0; j < cvs.height; j += 60) { ctx.beginPath(); ctx.moveTo(0, j); ctx.lineTo(cvs.width, j); ctx.stroke(); }

      if (gameState === 'playing' || gameState === 'start') {
        e.targets.forEach(t => {
          const lifePercent = 1 - (t.age / t.ttl);
          
          ctx.shadowBlur = 15; 
          ctx.shadowColor = t.color; 
          ctx.fillStyle = '#05060b';
          ctx.beginPath(); ctx.arc(t.x, t.y, t.radius, 0, Math.PI * 2); ctx.fill();
          ctx.shadowBlur = 0;

          ctx.fillStyle = t.color;
          ctx.beginPath(); ctx.arc(t.x, t.y, t.radius * 0.4, 0, Math.PI * 2); ctx.fill();

          const ringColor = lifePercent > 0.5 ? t.color : (lifePercent > 0.25 ? '#eab308' : '#ef4444');
          ctx.strokeStyle = ringColor;
          ctx.lineWidth = 2.5;
          ctx.beginPath(); ctx.arc(t.x, t.y, t.radius + 4 + (Math.max(0, lifePercent) * 8), 0, Math.PI * 2); ctx.stroke();
        });
      }

      for (let i = e.particles.length - 1; i >= 0; i--) {
        const p = e.particles[i];
        p.x += p.vx; p.y += p.vy; p.life -= dt * 2.5;
        if (p.life <= 0) { e.particles.splice(i, 1); continue; }
        ctx.globalAlpha = p.life; ctx.fillStyle = p.color; ctx.fillRect(p.x, p.y, 3, 3);
      }

      ctx.lineWidth = 2;
      for (let i = e.hitMarkers.length - 1; i >= 0; i--) {
        const hm = e.hitMarkers[i];
        hm.life -= dt * 4.0;
        if (hm.life <= 0) { e.hitMarkers.splice(i, 1); continue; }
        ctx.globalAlpha = hm.life; ctx.strokeStyle = '#ffffff';
        const s = 6 + (1 - hm.life) * 8;
        ctx.beginPath();
        ctx.moveTo(hm.x - s, hm.y - s); ctx.lineTo(hm.x + s, hm.y + s);
        ctx.moveTo(hm.x + s, hm.y - s); ctx.lineTo(hm.x - s, hm.y + s);
        ctx.stroke();
      }
      ctx.globalAlpha = 1.0;

      const ch = e.crosshair;
      if (ch.initialized && (gameState === 'playing' || gameState === 'start')) {
        const activeColor = pointerLocked ? '#06b6d4' : '#eab308';
        ctx.strokeStyle = activeColor;
        ctx.fillStyle = activeColor;
        
        ctx.lineWidth = 2;
        ctx.beginPath(); ctx.arc(ch.x, ch.y, 16, 0, Math.PI * 2); ctx.stroke();

        ctx.lineWidth = 1.5;
        const gap = 6;
        ctx.beginPath();
        ctx.moveTo(ch.x, ch.y - 16); ctx.lineTo(ch.x, ch.y - gap);
        ctx.moveTo(ch.x, ch.y + 16); ctx.lineTo(ch.x, ch.y + gap);
        ctx.moveTo(ch.x - 16, ch.y); ctx.lineTo(ch.x - gap, ch.y);
        ctx.moveTo(ch.x + 16, ch.y); ctx.lineTo(ch.x + gap, ch.y);
        ctx.stroke();
        
        ctx.beginPath(); ctx.arc(ch.x, ch.y, 2, 0, Math.PI * 2); ctx.fill();
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
  }, [gameState, pointerLocked, spawnTarget, endGame]);

  const shareScore = useCallback(async () => {
    const text = `🎯 I scored ${uiScore} PTS (${analytics.rankData.rank}) on Target Switching Swarm! Acc: ${analytics.accuracy}% | Targets/Min: ${analytics.tpm}. Practice your multi-kill mechanics at skilldrills.online!`;
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({ title: 'My Target Switching Score', text, url: 'https://skilldrills.online/drills/fps/target-switching-swarm' });
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
          { "@type": "ListItem", "position": 2, "name": "FPS Drills", "item": "https://skilldrills.online/drills/fps" },
          { "@type": "ListItem", "position": 3, "name": "Target Switching Aim Trainer" }
        ]
      },
      {
        "@type": "WebApplication",
        "name": "Target Switching Aim Trainer – Free Multi Target FPS Practice",
        "applicationCategory": "GameApplication",
        "operatingSystem": "Any",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
      },
      {
        "@type": "EducationalApplication",
        "name": "Target Switching Swarm",
        "applicationCategory": "EducationalApplication",
        "operatingSystem": "Web",
        "description": "Train target switching, flick transitions, multi-kill mechanics, and target acquisition speed with this free FPS aim trainer. Practice against increasingly difficult target swarms."
      },
      {
        "@type": "HowTo",
        "name": "How to use the Target Switching Aim Trainer",
        "step": [
          { "@type": "HowToStep", "text": "Adjust your Universal Sens multiplier to match your game." },
          { "@type": "HowToStep", "text": "Click 'Begin Tactical Drill' to lock your mouse and enter fullscreen." },
          { "@type": "HowToStep", "text": "Quickly eliminate targets to build your Switch Chain and increase your score." },
          { "@type": "HowToStep", "text": "Do not let targets expire or miss your shots, as this penalizes your survival time." }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          { "@type": "Question", "name": "What is target switching?", "acceptedAnswer": { "@type": "Answer", "text": "Target switching is the mechanical ability to quickly transition your crosshair from a neutralized target to a new, active threat with minimal hesitation." } },
          { "@type": "Question", "name": "How do I improve target switching?", "acceptedAnswer": { "@type": "Answer", "text": "Improve target switching by practicing dynamic swarm drills where you must rapidly acquire, eliminate, and relocate to new targets under time pressure without resetting to a neutral position." } },
          { "@type": "Question", "name": "Why do I hesitate after kills?", "acceptedAnswer": { "@type": "Answer", "text": "Hesitation occurs because your brain waits for visual confirmation of the kill before searching for the next target. Drills train you to trust your shot and move your eyes to the next target immediately." } },
          { "@type": "Question", "name": "What is target acquisition?", "acceptedAnswer": { "@type": "Answer", "text": "Target acquisition is the combined cognitive process of identifying a threat on screen, predicting its path, and calculating the flick required to engage." } },
          { "@type": "Question", "name": "How do Valorant players train target switching?", "acceptedAnswer": { "@type": "Answer", "text": "Valorant players train target switching to handle multi-peek scenarios (like entry fragging on a site) by practicing fast, horizontal multi-target elimination drills." } },
          { "@type": "Question", "name": "How do CS2 players train spray transfers?", "acceptedAnswer": { "@type": "Answer", "text": "Target switching is the foundation of a spray transfer. Before you can control the recoil between two targets, your raw crosshair relocation speed must be instantaneous." } },
          { "@type": "Question", "name": "What is efficient pathing?", "acceptedAnswer": { "@type": "Answer", "text": "Efficient pathing means eliminating a cluster of targets in an order that requires the least amount of overall mouse movement, reducing total time-to-kill." } },
          { "@type": "Question", "name": "Should I move my eyes before my crosshair?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Your eyes should snap to the next target the millisecond you click on the current one. Your hand will naturally follow your eyes." } },
          { "@type": "Question", "name": "How often should I practice target switching?", "acceptedAnswer": { "@type": "Answer", "text": "Incorporate 10-15 minutes of pure target switching drills into your daily routine. Balance it with pure flicking and tracking exercises." } },
          { "@type": "Question", "name": "Does target switching improve flicking?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Target switching is essentially chaining multiple dynamic flicks together consecutively without returning to a center resting position." } }
        ]
      }
    ]
  };

  return (
    <div ref={pageRef} className="min-h-screen select-none bg-[#050508] text-white">
      <Head>
        <title>Target Switching Aim Trainer – Free Multi Target FPS Practice</title>
        <meta name="description" content="Train target switching, flick transitions, multi-kill mechanics, and target acquisition speed with this free FPS aim trainer. Practice against increasingly difficult target swarms." />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
      </Head>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {!isFullscreen && (
          <div className="mb-6">
            <nav className="mb-4">
              <ol className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
                <li><Link href="/" className="hover:text-gray-300">Home</Link></li>
                <li><ChevronRight className="w-4 h-4 text-gray-600" /></li>
                <li><Link href="/drills/fps" className="hover:text-gray-300">FPS</Link></li>
                <li><ChevronRight className="w-4 h-4 text-gray-600" /></li>
                <li className="text-cyan-400 font-medium">Target Switching Swarm</li>
              </ol>
            </nav>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                  <Crosshair className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Target Switching Aim Trainer</h1>
                  <p className="text-sm text-gray-400 mt-1 font-medium">Desktop Exclusive • Dynamic Swarm Escalation</p>
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

        {!isFullscreen && (
          <div className="grid grid-cols-5 gap-2 mb-2">
            <StatCard icon={<Trophy className="text-yellow-400" />} value={uiScore} label="Score" />
            <StatCard 
              icon={<Users className={getLevelConfig(uiScore).uiColor} />} 
              value={`${uiTargets} Active`} 
              label={`Level ${uiLevel}`} 
            />
            <StatCard 
              icon={<Flame className={uiChain >= 10 ? "text-orange-500 animate-pulse" : "text-gray-500"} />} 
              value={uiChain} 
              label="Switch Chain" 
              highlight={uiChain >= 10}
            />
            <StatCard icon={<Timer className={uiTimeLeft <= 10 ? 'text-red-400 animate-pulse' : 'text-cyan-400'} />} value={uiTimeLeft} label="Time" unit="s" />
            <StatCard icon={<Sliders className="text-blue-400" />} value={`${universalSens.toFixed(2)}x`} label="Sens" />
          </div>
        )}

        <div 
          ref={containerRef} 
          className={`relative overflow-hidden transition-colors outline-none bg-[#05060b] ${
            isFullscreen ? 'w-full h-full' : 'w-full aspect-video min-h-[500px] rounded-2xl border border-gray-800 shadow-2xl'
          }`}
        >
          {gameState === 'playing' && (
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gray-900 z-[60]">
              <div ref={progressBarRef} className="h-full bg-cyan-500" style={{ width: '100%' }} />
            </div>
          )}

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
                    <p className={`text-[10px] ${getLevelConfig(uiScore).uiColor} font-bold uppercase tracking-widest`}>Level {uiLevel}</p>
                    <p className={`text-2xl font-black ${getLevelConfig(uiScore).uiColor} leading-none`}>{uiTargets} Targets</p>
                  </div>
                </div>
                
                {uiChain > 1 && (
                  <div className="bg-black/40 backdrop-blur border border-orange-500/30 px-4 py-2 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-left-4">
                    <Flame className="w-5 h-5 text-orange-500" />
                    <div>
                      <p className="text-[10px] text-orange-400 font-bold uppercase tracking-widest">Switch Chain</p>
                      <p className="text-xl font-black text-white leading-none">{uiChain}x</p>
                    </div>
                  </div>
                )}
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

          <canvas 
            ref={canvasRef} 
            onClick={() => { if (gameState === 'playing' && !pointerLocked) canvasRef.current?.requestPointerLock(); }}
            className={`block absolute top-0 left-0 w-full h-full touch-none z-10 ${gameState === 'playing' ? 'cursor-none' : ''}`} 
          />

          {/* NORMAL FONT START SCREEN */}
          {gameState === 'start' && (
            <div className="absolute inset-0 bg-[#05070e]/98 flex flex-col items-center justify-center p-6 z-30 select-none overflow-y-auto max-h-[100vh] backdrop-blur-sm">
              <div className="max-w-md w-full text-center">
                <h2 className="text-xl font-black text-white uppercase tracking-wider mb-1">
                  Target Switching Swarm
                </h2>
                <p className="text-xs text-slate-500 uppercase tracking-widest mb-6">
                  Hardware Raw Input • Multi-Kill Mechanics
                </p>

                <div className="grid grid-cols-2 gap-3 mb-6 text-left">
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Objective</span>
                    <span className="text-sm font-black text-white">Chain Eliminations</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Reward</span>
                    <span className="text-sm font-black text-green-400">Score & +2s Time</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Penalty</span>
                    <span className="text-sm font-black text-red-400">-2s Time Pressure</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Mechanic</span>
                    <span className="text-sm font-black text-blue-400">Swarm Escalation</span>
                  </div>
                </div>

                <div className="bg-[#0b0f19] border border-slate-850 p-4 rounded-xl mb-6 text-left text-xs text-slate-400">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-white uppercase mb-3">
                    <Sliders className="w-3.5 h-3.5 text-cyan-500" /> Universal Sens
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-cyan-400 font-mono text-sm font-bold">{universalSens.toFixed(2)}x</span>
                    <span className="text-[10px] text-slate-500">Approx: {cmPer360} cm/360</span>
                  </div>
                  <input 
                    type="range" min="0.1" max="3.0" step="0.05" 
                    value={universalSens} 
                    onChange={(e) => setUniversalSens(parseFloat(e.target.value))} 
                    className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500" 
                  />
                </div>

                <div className="flex gap-2">
                  {isMobile ? (
                    <div className="flex-1 py-3 bg-red-900/50 border border-red-500/50 text-red-200 font-bold rounded-xl text-xs flex items-center justify-center gap-2 uppercase tracking-widest cursor-not-allowed">
                      <MonitorX className="w-4 h-4" /> Desktop Only (Raw Mouse Required)
                    </div>
                  ) : (
                    <button
                      onClick={startGame}
                      className="flex-1 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg uppercase tracking-widest transition-all duration-200 active:scale-95"
                    >
                      <Play className="w-3.5 h-3.5 fill-white" />
                      Begin Tactical Drill
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* NORMAL FONT GAME OVER SCREEN */}
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
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Targets / Min</span>
                    <span className="text-lg font-black text-white">{analytics.tpm}</span>
                  </div>
                  
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Max Chain</span>
                    <span className="text-lg font-black text-white">{analytics.maxChain}x</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Avg Kill Dist</span>
                    <span className="text-lg font-black text-white">{analytics.avgKillDist}px</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl flex flex-col justify-center">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Assigned Rank</span>
                    <span className={`text-[11px] font-black ${analytics.rankData.color} leading-tight truncate`}>
                      {analytics.rankData.rank}
                    </span>
                  </div>
                </div>

                <div className="bg-[#0b0f19] border border-slate-850 p-4 rounded-xl mb-6 text-left text-xs text-slate-400">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-white uppercase mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-500" /> Coaching Insight:
                  </div>
                  <p className="leading-relaxed">
                    {getSuggestion(analytics.missedClicks, analytics.timeouts, analytics.avgKillDist, analytics.maxChain)}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={startGame}
                    className="flex-1 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg uppercase tracking-widest transition-all duration-200 active:scale-95"
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

        {/* Info Cards (Visible outside Fullscreen) */}
        {!isFullscreen && (
          <section className="mt-10">
            <div className="rounded-2xl border border-gray-800 overflow-hidden bg-gray-900 shadow-2xl pointer-events-none">
              <div className="px-6 py-5 border-b border-gray-800 bg-black/40 flex items-center gap-3">
                <Info className="w-5 h-5 text-cyan-400" /><h2 className="font-bold text-white text-lg tracking-wide">Progression & Scoring Rules</h2>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-5">
                  <RuleItem num="1" color="green" text="Successful Hit" highlight="+2s Time (Score UP)" result="Builds Switch Chain" />
                  <RuleItem num="2" color="cyan" text="Swarm Escalation" highlight="Up to 5 Targets" result="Scales automatically with score" />
                </div>
                <div className="space-y-5">
                  <RuleItem num="3" color="orange" text="Chain Multipliers" highlight="Up to +500 Bonus" result="Rewards consecutive hits" />
                  <RuleItem num="4" color="red" text="Time Penalties" highlight="-2s for Miss/Timeout" result="No raw point deductions ever" />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Articles & SEO Blocks */}
        {!isFullscreen && (
          <article className="mt-12 text-gray-300">
            <div className="rounded-2xl border border-gray-800 overflow-hidden bg-gray-900 shadow-xl">
              <div className="px-6 py-5 border-b border-gray-800 bg-black/40 flex items-center gap-3">
                <GraduationCap className="w-5 h-5 text-cyan-400" />
                <h2 className="font-bold text-white text-lg tracking-wide">About Target Switching Training</h2>
              </div>
              
              <div className="p-8 space-y-8">
                <section>
                  <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                    <Crosshair className="w-5 h-5 text-blue-400" /> What Is Target Switching?
                  </h3>
                  <p className="text-sm leading-relaxed mb-4">
                    <strong>Target Switching</strong> is the mechanical execution of eliminating an opponent and instantly relocating your crosshair to the next threat. Unlike pure tracking or static precision, a target switching aim trainer forces you to process visual information rapidly, optimize your flick pathing, and engage multiple active targets simultaneously.
                  </p>
                  <p className="text-sm leading-relaxed">
                    By heavily penalizing hesitation (via strict timeouts) and rewarding unbroken hit chains, this drill bridges the gap between raw flicking aim and true in-game multi-kill potential.
                  </p>
                </section>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 py-4 border-y border-gray-800/50">
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40 hover:bg-gray-800/50 transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center"><Users className="w-4 h-4 text-white" /></div>
                      <h4 className="text-sm font-bold text-white">Who Should Use This?</h4>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Entry fraggers in Valorant or CS2, high-mobility players in Apex Legends, and anyone struggling to secure multi-kills when fighting grouped enemies.</p>
                  </div>
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40 hover:bg-gray-800/50 transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-cyan-600 flex items-center justify-center"><TrendingUp className="w-4 h-4 text-white" /></div>
                      <h4 className="text-sm font-bold text-white">Benefits of Training</h4>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Drastically reduces target acquisition delay, eliminates post-kill hesitation, and trains efficient crosshair pathing between complex moving targets.</p>
                  </div>
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40 hover:bg-gray-800/50 transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-orange-600 flex items-center justify-center"><Zap className="w-4 h-4 text-white" /></div>
                      <h4 className="text-sm font-bold text-white">Flick Transitions</h4>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Trains the transition phase *between* kills, ensuring your hand moves towards the next target while your brain is still verifying the first elimination.</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#0b0f19] border-t border-gray-800 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Lightbulb className="w-6 h-6 text-yellow-400" />
                  <h3 className="text-xl font-bold text-white">Frequently Asked Questions</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FAQItem q="1. What is target switching?" a="Target switching is the mechanical ability to quickly transition your crosshair from a neutralized target to a new, active threat with minimal hesitation." />
                  <FAQItem q="2. How do I improve target switching?" a="Improve target switching by practicing dynamic swarm drills where you must rapidly acquire, eliminate, and relocate to new targets under time pressure without resetting to a neutral position." />
                  <FAQItem q="3. Why do I hesitate after kills?" a="Hesitation occurs because your brain waits for visual confirmation of the kill before searching for the next target. Drills train you to trust your shot and move your eyes to the next target immediately." />
                  <FAQItem q="4. What is target acquisition?" a="Target acquisition is the combined cognitive process of identifying a threat on screen, predicting its path, and calculating the flick required to engage." />
                  <FAQItem q="5. How do Valorant players train target switching?" a="Valorant players train target switching to handle multi-peek scenarios (like entry fragging on a site) by practicing fast, horizontal multi-target elimination drills." />
                  <FAQItem q="6. How do CS2 players train spray transfers?" a="Target switching is the foundation of a spray transfer. Before you can control the recoil between two targets, your raw crosshair relocation speed must be instantaneous." />
                  <FAQItem q="7. What is efficient pathing?" a="Efficient pathing means eliminating a cluster of targets in an order that requires the least amount of overall mouse movement, reducing total time-to-kill." />
                  <FAQItem q="8. Should I move my eyes before my crosshair?" a="Yes. Your eyes should snap to the next target the millisecond you click on the current one. Your hand will naturally follow your eyes." />
                  <FAQItem q="9. How often should I practice target switching?" a="Incorporate 10-15 minutes of pure target switching drills into your daily routine. Balance it with pure flicking and tracking exercises." />
                  <FAQItem q="10. Does target switching improve flicking?" a="Yes. Target switching is essentially chaining multiple dynamic flicks together consecutively without returning to a center resting position." />
                </div>
              </div>
            </div>
          </article>
        )}

        {!isFullscreen && (
          <section className="mt-14" aria-label="Explore related aim and response drills">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-5 rounded-full bg-cyan-500"></div>
              <h2 className="text-xs font-bold text-white uppercase tracking-widest font-mono">
                Explore FPS Drills
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <RelatedCard href="/drills/fps/flick-shot-training" title="Pro Flick Trainer" desc="Snap to targets in time-attack mode." color="blue" icon={<Crosshair className="w-4 h-4" />} />
              <RelatedCard href="/drills/fps/180-degree-awareness" title="180° Awareness Pro" desc="Alternate snapping opposite horizons." color="orange" icon={<Zap className="w-4 h-4" />} />
              <RelatedCard href="/drills/motor/hand-eye-coordination/aim-trainer" title="Aim Trainer Elite" desc="Hone spatial coordinate click speed." color="green" icon={<Target className="w-4 h-4" />} />
              <RelatedCard href="/drills/fps/angle-hold-trainer" title="Angle Hold Trainer" desc="React to peeking targets instantly." color="red" icon={<Shield className="w-4 h-4" />} />
            </div>
          </section>
        )}

        {/* Footer */}
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
                <p className="text-[9px] mb-2">&copy; {new Date().getFullYear()} SkillDrills. All rights reserved.</p>
                <p className="text-[9px] max-w-2xl mx-auto leading-relaxed mb-6">
                  Open-source telemetry training platform using hardware pointer lock. Free forever. No downloads required.
                </p>
                <div className="flex items-center justify-center gap-3 flex-wrap">
                  <a href="https://youtube.com/@skilldrills.online" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors p-2.5 bg-gray-900 rounded-full hover:bg-gray-800 shadow-md" title="YouTube">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
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
    gray: 'bg-gray-600 text-gray-300 border-gray-500', 
    green: 'bg-green-600 text-green-300 border-green-500',
    red: 'bg-red-600 text-red-300 border-red-500',
    orange: 'bg-orange-600 text-orange-300 border-orange-500',
    yellow: 'bg-yellow-600 text-yellow-300 border-yellow-500',
    purple: 'bg-purple-600 text-purple-300 border-purple-500',
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
    purple: 'from-purple-500 to-violet-500',
    green: 'from-green-500 to-emerald-500',
    cyan: 'from-cyan-500 to-blue-500',
    indigo: 'from-indigo-500 to-purple-500',
    rose: 'from-rose-500 to-pink-500'
  };
  return (
    <Link href={href} className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-[#0b0f19]/40 transition-all hover:-translate-y-1 hover:border-cyan-500/50 block p-5">
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${gradients[color]}`}></div>
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

function FAQItem({ q, a }) {
  return (
    <div className="bg-[#05060b] border border-gray-800 rounded-xl p-5 hover:border-gray-700 transition-colors">
      <h4 className="text-sm font-bold text-gray-200 mb-2">{q}</h4>
      <p className="text-xs text-gray-400 leading-relaxed">{a}</p>
    </div>
  );
}