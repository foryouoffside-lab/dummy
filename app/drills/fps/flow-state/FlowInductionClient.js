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
  Share2, Wind, Brain, Sliders, Waves, Focus
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

  playFlowTick(chain = 0) {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      
      const baseFreq = 440;
      const freqPitch = Math.min(880, baseFreq + (chain * 2)); 
      
      osc.frequency.setValueAtTime(freqPitch, this.ctx.currentTime); 
      gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.15);
      
      osc.connect(gain); 
      gain.connect(this.ctx.destination);
      osc.start(); 
      osc.stop(this.ctx.currentTime + 0.15);
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

  playBreak() {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(100, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.2);
      osc.connect(gain); gain.connect(this.ctx.destination);
      osc.start(); osc.stop(this.ctx.currentTime + 0.2);
    } catch(e) {}
  }

  setEnabled(status) {
    this.enabled = status;
  }
}

const audioSynth = typeof window !== 'undefined' ? new AudioSynthesizer() : null;
const DRILL_DURATION = 60; // 60 seconds

// ============================================================
// RANK CALCULATION & SUGGESTIONS
// ============================================================
const getFlowZone = (flow) => {
  if (flow >= 0.8) return { text: 'Peak Flow', color: 'text-fuchsia-400', hex: '#e879f9' };
  if (flow >= 0.6) return { text: 'Deep Flow', color: 'text-purple-400', hex: '#c084fc' };
  if (flow >= 0.4) return { text: 'Locked In', color: 'text-blue-400', hex: '#60a5fa' };
  if (flow >= 0.2) return { text: 'Focused', color: 'text-emerald-400', hex: '#34d399' };
  return { text: 'Distracted', color: 'text-slate-400', hex: '#94a3b8' };
};

const calculateRank = (score, peakFlow) => {
  if (score >= 4000 && peakFlow >= 95) return { rank: 'Peak Performance Master', color: 'text-fuchsia-400' };
  if (score >= 3000 && peakFlow >= 85) return { rank: 'Flow Specialist', color: 'text-purple-400' };
  if (score >= 2000 && peakFlow >= 70) return { rank: 'Deep Concentrator', color: 'text-blue-400' };
  if (score >= 1000 && peakFlow >= 50) return { rank: 'Focused Performer', color: 'text-emerald-400' };
  if (score >= 500 && peakFlow >= 30) return { rank: 'Steady Tracker', color: 'text-yellow-400' };
  if (score >= 200) return { rank: 'Emerging Focus', color: 'text-orange-400' };
  return { rank: 'Distracted Mind', color: 'text-slate-400' };
};

const getSuggestion = (breaks, peakFlow, maxChain) => {
  if (peakFlow === 100 && maxChain >= 50) return "Peak Flow Achieved. Excellent focus retention and tracking consistency. You have incredible mental endurance.";
  if (breaks > 10) return "Too Many Flow Interruptions. Attention drift detected. Try to anticipate the target's path rather than reacting to it.";
  if (maxChain < 15) return "Needs Better Focus Recovery. You achieve flow but break it quickly. Work on sustaining concentration through the smooth curves.";
  if (peakFlow > 70) return "Strong Concentration Stability. Excellent deep flow duration. Push for the 100-chain multiplier bonus.";
  return "Solid focus foundation. Your goal is to keep the crosshair strictly inside the ring to build your Flow Meter up to 100%.";
};

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function FlowStateTrainerClient() {
  const [gameState, setGameState] = useState('start'); 
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [pointerLocked, setPointerLocked] = useState(false);
  const [universalSens, setUniversalSens] = useState(1.0);

  // HUD State
  const [uiScore, setUiScore] = useState(0);
  const [uiFlow, setUiFlow] = useState(0);
  const [uiChain, setUiChain] = useState(0);
  const [uiTimeLeft, setUiTimeLeft] = useState(DRILL_DURATION);
  const [bestScore, setBestScore] = useState(0);
  const [isNewBest, setIsNewBest] = useState(false);

  const [analytics, setAnalytics] = useState({
    finalScore: 0, peakFlow: 0, avgFlow: 0, timeInFlow: 0,
    longestChain: 0, focusBreaks: 0, rankData: null
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
    target: { x: 0, y: 0, startX: 0, startY: 0, destX: 0, destY: 0, ctrlX: 0, ctrlY: 0, r: 45, t: 1.0, duration: 2.0 },
    score: 0, flow: 0, chain: 0, timeLeft: DRILL_DURATION,
    focusTimer: 0, isTracking: false, wasTracking: false,
    peakFlow: 0, timeInFlow: 0, longestChain: 0, focusBreaks: 0, flowHistory: [],
    particles: [], screenShake: 0, flash: { color: null, alpha: 0 }
  });

  const cmPer360 = (30 / universalSens).toFixed(1);

  useEffect(() => {
    try {
      const savedSens = localStorage.getItem('flowTrainer_sens');
      if (savedSens) setUniversalSens(parseFloat(savedSens));
      const savedBest = localStorage.getItem('flowTrainer_bestScore'); 
      if (savedBest) setBestScore(parseInt(savedBest, 10));
    } catch (e) {}
  }, []);

  useEffect(() => {
    if (gameState !== 'playing') {
      try { localStorage.setItem('flowTrainer_sens', universalSens.toString()); } catch (e) {}
    }
    if (audioSynth) audioSynth.setEnabled(soundEnabled);
  }, [universalSens, gameState, soundEnabled]);

  const endGame = useCallback(() => {
    setGameState('gameOver');
    if (document.pointerLockElement) document.exitPointerLock();
    
    const e = engine.current;
    const peakFlowPct = Math.round(e.peakFlow * 100);
    const avgFlowPct = e.flowHistory.length > 0 
      ? Math.round((e.flowHistory.reduce((a, b) => a + b, 0) / e.flowHistory.length) * 100) 
      : 0;

    const rank = calculateRank(e.score, peakFlowPct);

    setAnalytics({
      finalScore: e.score,
      peakFlow: peakFlowPct,
      avgFlow: avgFlowPct,
      timeInFlow: Math.round(e.timeInFlow),
      longestChain: e.longestChain,
      focusBreaks: e.focusBreaks,
      rankData: rank
    });

    setUiScore(e.score);

    setBestScore(prev => {
      if (e.score > prev) {
        setIsNewBest(true);
        try { localStorage.setItem('flowTrainer_bestScore', e.score.toString()); } catch(err){}
        return e.score;
      }
      return prev;
    });
  }, []);

  const createParticles = (x, y, count, color) => {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 2 + 0.5;
      engine.current.particles.push({ x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, life: 1.0, color });
    }
  };

  const startGame = useCallback(async () => {
    if (audioSynth) audioSynth.init(); 

    setIsNewBest(false);
    setUiScore(0); setUiFlow(0); setUiChain(0);
    setUiTimeLeft(DRILL_DURATION);
    lastTimeRef.current = DRILL_DURATION;
    
    setAnalytics({ finalScore: 0, peakFlow: 0, avgFlow: 0, timeInFlow: 0, longestChain: 0, focusBreaks: 0, rankData: null });
    setGameState('playing');
    
    engine.current = {
      crosshair: { ...engine.current.crosshair },
      target: { x: 0, y: 0, startX: 0, startY: 0, destX: 0, destY: 0, ctrlX: 0, ctrlY: 0, r: 45, t: 1.0, duration: 2.0 },
      score: 0, flow: 0, chain: 0, timeLeft: DRILL_DURATION,
      focusTimer: 0, isTracking: false, wasTracking: false,
      peakFlow: 0, timeInFlow: 0, longestChain: 0, focusBreaks: 0, flowHistory: [],
      particles: [], screenShake: 0, flash: { color: null, alpha: 0 }
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
    }, 150);
  }, []);

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
          cvs.width = width; cvs.height = height;
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
        
        // Timer Logic
        if (e.timeLeft > 0) e.timeLeft -= dt;
        if (e.timeLeft <= 0) {
          e.timeLeft = 0;
          setUiTimeLeft(0);
          if (progressBarRef.current) progressBarRef.current.style.width = '0%';
          endGame();
          return; 
        }

        if (progressBarRef.current) {
            progressBarRef.current.style.width = `${(e.timeLeft / DRILL_DURATION) * 100}%`;
            progressBarRef.current.className = `h-full ${e.timeLeft <= 10 ? 'bg-red-500 animate-pulse' : 'bg-cyan-500'}`;
        }

        const intTime = Math.ceil(e.timeLeft);
        if (intTime !== lastTimeRef.current) {
            setUiTimeLeft(intTime);
            lastTimeRef.current = intTime;
        }

        // Target Movement Logic (Bezier Curve)
        const tObj = e.target;
        if (tObj.t >= 1.0) {
          tObj.startX = tObj.x || cvs.width/2;
          tObj.startY = tObj.y || cvs.height/2;
          
          // STRICT BOUNDING BOX LOGIC
          const pad = 60; // Safe margin ensuring target radius doesn't clip walls
          const safeWidth = Math.max(10, cvs.width - pad * 2);
          const safeHeight = Math.max(10, cvs.height - pad * 2);
          
          tObj.destX = pad + Math.random() * safeWidth;
          tObj.destY = pad + Math.random() * safeHeight;
          
          let rawCtrlX, rawCtrlY;

          // Difficulty Scaling based on Flow
          if (e.flow < 0.4) {
             // Jittery path
             rawCtrlX = tObj.startX + (Math.random() - 0.5) * cvs.width * 0.8;
             rawCtrlY = tObj.startY + (Math.random() - 0.5) * cvs.height * 0.8;
          } else if (e.flow < 0.8) {
             // Smoother curves
             rawCtrlX = (tObj.startX + tObj.destX) / 2 + (Math.random() - 0.5) * cvs.width * 0.4;
             rawCtrlY = (tObj.startY + tObj.destY) / 2 + (Math.random() - 0.5) * cvs.height * 0.4;
          } else {
             // Perfect elegant curves
             rawCtrlX = (tObj.startX + tObj.destX) / 2;
             rawCtrlY = (tObj.startY + tObj.destY) / 2;
          }

          // CONVEX HULL CLAMP: Lock Control Points entirely inside the screen bounds
          // Because Bezier curves are mathematically bound by their convex hull, 
          // if start, dest, and ctrl points are all inside the screen, the curve CANNOT exit the screen.
          tObj.ctrlX = Math.max(pad, Math.min(cvs.width - pad, rawCtrlX));
          tObj.ctrlY = Math.max(pad, Math.min(cvs.height - pad, rawCtrlY));

          tObj.t = 0;
          // Speed scales with flow: 1.5s to 2.5s base, speeds up slightly but stays smooth
          tObj.duration = Math.max(1.0, 2.5 - (e.flow * 1.0));
        }

        tObj.t += dt / tObj.duration;
        const tt = Math.min(1.0, tObj.t);
        const inv = 1 - tt;
        
        tObj.x = inv * inv * tObj.startX + 2 * inv * tt * tObj.ctrlX + tt * tt * tObj.destX;
        tObj.y = inv * inv * tObj.startY + 2 * inv * tt * tObj.ctrlY + tt * tt * tObj.destY;
        
        // Target Radius shrinks as flow increases
        tObj.r = Math.max(15, 45 - (e.flow * 25));

        // Tracking & Flow Logic
        const dist = Math.hypot(e.crosshair.x - tObj.x, e.crosshair.y - tObj.y);
        e.isTracking = dist <= tObj.r;

        if (e.isTracking) {
          e.timeInFlow += dt;
          if (!e.wasTracking) e.wasTracking = true;

          e.focusTimer += dt;
          if (e.focusTimer >= 1.0) {
            e.focusTimer -= 1.0;
            e.score += 10;
            e.chain += 1;
            if (e.chain > e.longestChain) e.longestChain = e.chain;
            
            // Flow Chain Bonuses
            if (e.chain === 25) { e.score += 100; if (audioSynth) audioSynth.playChainBonus(); e.flash = { color: '6, 182, 212', alpha: 0.3 }; }
            else if (e.chain === 50) { e.score += 250; if (audioSynth) audioSynth.playChainBonus(); e.flash = { color: '139, 92, 246', alpha: 0.3 }; }
            else if (e.chain === 100) { e.score += 500; if (audioSynth) audioSynth.playChainBonus(); e.flash = { color: '232, 121, 249', alpha: 0.4 }; }
            else if (e.chain === 200) { e.score += 1000; if (audioSynth) audioSynth.playChainBonus(); e.flash = { color: '244, 114, 182', alpha: 0.5 }; }
            else {
              if (audioSynth) audioSynth.playFlowTick(e.chain);
            }
          }
          
          e.flow = Math.min(1.0, e.flow + (dt / 10)); // 10s to max flow
          if (e.flow > e.peakFlow) e.peakFlow = e.flow;
          
          if (e.flow >= 1.0 && Math.random() < 0.1) {
             createParticles(tObj.x, tObj.y, 1, '#e879f9');
          }
        } else {
          if (e.wasTracking) {
            e.wasTracking = false;
            e.focusBreaks++;
            e.chain = 0;
            e.focusTimer = 0;
            if (audioSynth) audioSynth.playBreak();
            e.screenShake = 3;
          }
          e.flow = Math.max(0, e.flow - (dt / 5)); // 5s to drop to 0
        }

        e.flowHistory.push(e.flow);

        // UI Throttling
        if (Math.random() < 0.1) {
          setUiScore(e.score);
          setUiChain(e.chain);
          setUiFlow(Math.round(e.flow * 100));
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
        e.flash.alpha -= dt * 1.5; 
      }

      // Minimalist Grid
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.04)';
      ctx.lineWidth = 1;
      for (let i = 0; i < cvs.width; i += 80) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, cvs.height); ctx.stroke(); }
      for (let j = 0; j < cvs.height; j += 80) { ctx.beginPath(); ctx.moveTo(0, j); ctx.lineTo(cvs.width, j); ctx.stroke(); }

      const tObj = e.target;
      const zone = getFlowZone(e.flow);

      if (gameState === 'playing' || gameState === 'start') {
        // Soft Glow (Flow > 40%)
        if (e.flow > 0.4) {
          ctx.shadowBlur = e.flow * 20; 
          ctx.shadowColor = zone.hex;
        }
        
        ctx.fillStyle = 'rgba(0,0,0,0.5)';
        ctx.beginPath(); ctx.arc(tObj.x, tObj.y, tObj.r, 0, Math.PI * 2); ctx.fill();
        ctx.shadowBlur = 0;

        // Base Ring
        ctx.strokeStyle = zone.hex;
        ctx.lineWidth = 2.5;
        ctx.beginPath(); ctx.arc(tObj.x, tObj.y, tObj.r, 0, Math.PI * 2); ctx.stroke();

        // Dual Ring (Flow > 60%)
        if (e.flow > 0.6) {
          ctx.beginPath(); ctx.arc(tObj.x, tObj.y, tObj.r + 6, 0, Math.PI * 2); 
          ctx.lineWidth = 1; ctx.strokeStyle = `rgba(192, 132, 252, ${e.flow})`; ctx.stroke();
        }

        // Energy Pulse (Flow > 80%)
        if (e.flow > 0.8) {
          const pulse = (Math.sin(time / 150) + 1) / 2;
          ctx.beginPath(); ctx.arc(tObj.x, tObj.y, tObj.r + 12 + (pulse * 8), 0, Math.PI * 2); 
          ctx.lineWidth = 1; ctx.strokeStyle = `rgba(232, 121, 249, ${1 - pulse})`; ctx.stroke();
        }
      }

      for (let i = e.particles.length - 1; i >= 0; i--) {
        const p = e.particles[i];
        p.x += p.vx; p.y += p.vy; p.life -= dt * 1.5;
        if (p.life <= 0) { e.particles.splice(i, 1); continue; }
        ctx.globalAlpha = p.life; ctx.fillStyle = p.color; ctx.beginPath(); ctx.arc(p.x, p.y, 2, 0, Math.PI*2); ctx.fill();
      }
      ctx.globalAlpha = 1.0;

      const ch = e.crosshair;
      if (ch.initialized && (gameState === 'playing' || gameState === 'start')) {
        const activeColor = pointerLocked ? (e.isTracking ? '#34d399' : '#eab308') : '#ef4444';
        ctx.strokeStyle = activeColor;
        ctx.fillStyle = activeColor;
        
        ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.arc(ch.x, ch.y, 6, 0, Math.PI * 2); ctx.stroke();
        ctx.beginPath(); ctx.arc(ch.x, ch.y, 1.5, 0, Math.PI * 2); ctx.fill();
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
  }, [gameState, pointerLocked, endGame]);

  const shareScore = useCallback(async () => {
    const text = `🌊 I achieved ${analytics.peakFlow}% Peak Flow (${analytics.rankData.rank}) on the Flow State Trainer! Final Score: ${uiScore} PTS | Max Chain: ${analytics.longestChain}x. Practice your focus endurance at skilldrills.online!`;
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({ title: 'My Flow State Score', text, url: 'https://skilldrills.online/drills/visual/tracking-accuracy/flow-state' });
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
          { "@type": "ListItem", "position": 2, "name": "Visual Drills", "item": "https://skilldrills.online/drills/visual" },
          { "@type": "ListItem", "position": 3, "name": "Flow State Trainer" }
        ]
      },
      {
        "@type": "WebApplication",
        "name": "Flow State Training – Free Focus & Concentration Drill",
        "applicationCategory": "EducationalApplication",
        "operatingSystem": "Any",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
      },
      {
        "@type": "EducationalApplication",
        "name": "Flow State Trainer",
        "applicationCategory": "EducationalApplication",
        "operatingSystem": "Web",
        "description": "Train concentration, sustained attention, and flow state with this free focus drill. Improve deep work, cognitive endurance, tracking consistency, and mental performance."
      },
      {
        "@type": "HowTo",
        "name": "How to use the Flow State Trainer",
        "step": [
          { "@type": "HowToStep", "text": "Adjust your Universal Sens multiplier to match your game or OS." },
          { "@type": "HowToStep", "text": "Click 'Begin Induction' to lock your mouse and enter fullscreen." },
          { "@type": "HowToStep", "text": "Keep your crosshair continuously inside the moving target to build your Flow Meter." },
          { "@type": "HowToStep", "text": "Avoid tracking breaks to maintain your Flow Chain and trigger score multipliers." }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          { "@type": "Question", "name": "What is flow state?", "acceptedAnswer": { "@type": "Answer", "text": "Flow state, often called 'being in the zone', is a psychological state of deep focus and total immersion in an activity, resulting in peak performance and cognitive clarity." } },
          { "@type": "Question", "name": "Can flow state be trained?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, flow state can be trained by repeatedly engaging in activities that balance challenge and skill, such as sustained visual tracking drills, which build concentration endurance." } },
          { "@type": "Question", "name": "How long should I practice?", "acceptedAnswer": { "@type": "Answer", "text": "For building focus endurance, aim for 10-15 minute daily sessions. Stop when you notice severe mental fatigue or frequent attention drift." } },
          { "@type": "Question", "name": "What is deep focus?", "acceptedAnswer": { "@type": "Answer", "text": "Deep focus is the ability to sustain attention on a single complex task without succumbing to external distractions or internal cognitive drift." } },
          { "@type": "Question", "name": "How does flow improve learning?", "acceptedAnswer": { "@type": "Answer", "text": "Flow eliminates mental friction and distraction, allowing the brain's working memory to dedicate 100% of its resources to processing and storing new information." } },
          { "@type": "Question", "name": "How does flow improve gaming?", "acceptedAnswer": { "@type": "Answer", "text": "In competitive gaming, flow state allows players to react intuitively, track targets flawlessly, and make split-second strategic decisions without conscious hesitation." } },
          { "@type": "Question", "name": "Can flow improve productivity?", "acceptedAnswer": { "@type": "Answer", "text": "Absolutely. Operating in a flow state is the core principle behind 'Deep Work', allowing individuals to produce higher quality output in significantly less time." } },
          { "@type": "Question", "name": "What is sustained attention?", "acceptedAnswer": { "@type": "Answer", "text": "Sustained attention is a component of executive functioning that involves maintaining consistent behavioral response and focus during continuous and repetitive activity." } },
          { "@type": "Question", "name": "Why does focus break?", "acceptedAnswer": { "@type": "Answer", "text": "Focus breaks occur due to cognitive fatigue, external sensory interruptions, or when the task's difficulty either dramatically exceeds or falls below the user's skill level." } },
          { "@type": "Question", "name": "What is attention control?", "acceptedAnswer": { "@type": "Answer", "text": "Attention control is an individual's capacity to choose what they pay attention to and what they ignore. It is a critical metric for cognitive stability." } },
          { "@type": "Question", "name": "How long does it take to improve concentration?", "acceptedAnswer": { "@type": "Answer", "text": "With daily, deliberate practice using concentration tools, measurable improvements in sustained attention and focus duration can be seen in 2 to 4 weeks." } },
          { "@type": "Question", "name": "Can this improve ADHD-like focus problems?", "acceptedAnswer": { "@type": "Answer", "text": "While not a medical treatment, visual tracking exercises that provide immediate gamified feedback can help train the brain's reward pathways to sustain attention longer." } },
          { "@type": "Question", "name": "How often should I train?", "acceptedAnswer": { "@type": "Answer", "text": "Daily practice is optimal for neuroplasticity. Use this drill as a 5-minute mental warmup before starting work, studying, or competitive gaming sessions." } },
          { "@type": "Question", "name": "What is peak flow?", "acceptedAnswer": { "@type": "Answer", "text": "Peak flow occurs at the 80-100% mark of the Flow Meter. It represents total visual and motor synchronization, where tracking becomes predictive rather than reactive." } },
          { "@type": "Question", "name": "What is concentration endurance?", "acceptedAnswer": { "@type": "Answer", "text": "Concentration endurance is the mental stamina required to maintain a high-level flow state over prolonged periods without cognitive degradation." } }
        ]
      }
    ]
  };

  const currentZone = getFlowZone(uiFlow / 100);

  return (
    <div ref={pageRef} className="min-h-screen select-none bg-[#050508] text-white">
      <Head>
        <title>Flow State Training – Free Focus & Concentration Drill</title>
        <meta name="description" content="Train concentration, sustained attention, and flow state with this free focus drill. Improve deep work, cognitive endurance, tracking consistency, and mental performance." />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
      </Head>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {!isFullscreen && (
          <div className="mb-6">
            <nav className="mb-4">
              <ol className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
                <li><Link href="/" className="hover:text-gray-300">Home</Link></li>
                <li><ChevronRight className="w-4 h-4 text-gray-600" /></li>
                <li><Link href="/drills/visual" className="hover:text-gray-300">Visual</Link></li>
                <li><ChevronRight className="w-4 h-4 text-gray-600" /></li>
                <li className="text-cyan-400 font-medium">Flow State Trainer</li>
              </ol>
            </nav>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                  <Waves className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Flow State Training – Free Concentration Drill</h1>
                  <p className="text-sm text-gray-400 mt-1 font-medium">Hardware Raw Input • Concentration Endurance</p>
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
            <StatCard icon={<Wind className={currentZone.color} />} value={`${uiFlow}%`} label="Flow Meter" highlight={uiFlow >= 80} />
            <StatCard 
              icon={<Flame className={uiChain >= 25 ? "text-orange-500 animate-pulse" : "text-gray-500"} />} 
              value={uiChain} 
              label="Flow Chain" 
              highlight={uiChain >= 25}
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
                    <p className={`text-[10px] ${currentZone.color} font-bold uppercase tracking-widest`}>{currentZone.text}</p>
                    <p className={`text-2xl font-black ${currentZone.color} leading-none`}>{uiFlow}%</p>
                  </div>
                </div>
                
                {uiChain > 0 && (
                  <div className="bg-black/40 backdrop-blur border border-orange-500/30 px-4 py-2 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-left-4">
                    <Flame className="w-5 h-5 text-orange-500" />
                    <div>
                      <p className="text-[10px] text-orange-400 font-bold uppercase tracking-widest">Flow Chain</p>
                      <p className="text-xl font-black text-white leading-none">{uiChain}</p>
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
                <h2 className="text-3xl font-black text-white tracking-widest uppercase mb-2">Focus Paused</h2>
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
                  Flow State Trainer
                </h2>
                <p className="text-xs text-slate-500 uppercase tracking-widest mb-6">
                  Hardware Raw Input • Concentration Endurance
                </p>

                <div className="grid grid-cols-2 gap-3 mb-6 text-left">
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Objective</span>
                    <span className="text-sm font-black text-white">Maintain Focus</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Reward</span>
                    <span className="text-sm font-black text-cyan-400">Flow Chain Multipliers</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Penalty</span>
                    <span className="text-sm font-black text-red-400">Flow Decay</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Mechanic</span>
                    <span className="text-sm font-black text-blue-400">Adaptive Flow State</span>
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
                  <button
                    onClick={startGame}
                    className="flex-1 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg uppercase tracking-widest transition-all duration-200 active:scale-95"
                  >
                    <Waves className="w-3.5 h-3.5 fill-white" />
                    BEGIN INDUCTION
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
                  Session Complete
                </h2>
                <p className="text-xs text-slate-500 uppercase tracking-widest mb-6">
                  {analytics.timeInFlow} seconds spent in flow
                </p>

                <div className="grid grid-cols-3 gap-3 mb-6 text-left">
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Final Score</span>
                    <span className="text-lg font-black text-white">{uiScore}</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Peak Flow</span>
                    <span className="text-lg font-black text-white">{analytics.peakFlow}%</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Avg Flow</span>
                    <span className="text-lg font-black text-white">{analytics.avgFlow}%</span>
                  </div>
                  
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Max Chain</span>
                    <span className="text-lg font-black text-white">{analytics.longestChain}x</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Focus Breaks</span>
                    <span className="text-lg font-black text-white">{analytics.focusBreaks}</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl flex flex-col justify-center">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Assigned Rank</span>
                    <span className={`text-sm font-black ${analytics.rankData.color} leading-tight`}>
                      {analytics.rankData.rank}
                    </span>
                  </div>
                </div>

                <div className="bg-[#0b0f19] border border-slate-850 p-4 rounded-xl mb-6 text-left text-xs text-slate-400">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-white uppercase mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-500" /> Coaching Insight:
                  </div>
                  <p className="leading-relaxed">
                    {getSuggestion(analytics.focusBreaks, analytics.peakFlow, analytics.longestChain)}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={startGame}
                    className="flex-1 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg uppercase tracking-widest transition-all duration-200 active:scale-95"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    Run another session
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
                  <RuleItem num="1" color="cyan" text="Perfect Flow" highlight="Every 1s = +10 PTS" result="Builds flow meter smoothly" />
                  <RuleItem num="2" color="orange" text="Flow Chain" highlight="Up to +1000 Bonus" result="Rewards unbroken concentration" />
                </div>
                <div className="space-y-5">
                  <RuleItem num="3" color="fuchsia" text="Difficulty Scaling" highlight="Tied to Flow %" result="Target shrinks & smooths out" />
                  <RuleItem num="4" color="red" text="Focus Breaks" highlight="Chain Resets & Flow Decays" result="No raw point deductions" />
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
                <Brain className="w-5 h-5 text-cyan-400" />
                <h2 className="font-bold text-white text-lg tracking-wide">About Flow State Training</h2>
              </div>
              
              <div className="p-8 space-y-8">
                <section>
                  <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                    <Wind className="w-5 h-5 text-blue-400" /> What Is Flow State?
                  </h3>
                  <p className="text-sm leading-relaxed mb-4">
                    Flow state, conceptualized by psychologist Mihaly Csikszentmihalyi, is a psychological zone of absolute deep focus and total immersion. When you are in a flow state, your brain eliminates external distractions and internal mental friction, allowing you to operate at absolute peak performance.
                  </p>
                  <p className="text-sm leading-relaxed">
                    <strong>Flow State Training</strong> drills isolate the brain's sustained attention mechanisms. By practicing visual tracking tasks that continuously balance challenge and skill, you train your brain's cognitive control networks to enter deep focus faster and sustain concentration endurance for much longer periods.
                  </p>
                </section>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 py-4 border-y border-gray-800/50">
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40 hover:bg-gray-800/50 transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center"><Users className="w-4 h-4 text-white" /></div>
                      <h4 className="text-sm font-bold text-white">Who Should Use This?</h4>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Gamers, students, and professionals aiming to improve their capacity for Deep Work, productivity, and meditation preparation.</p>
                  </div>
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40 hover:bg-gray-800/50 transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-cyan-600 flex items-center justify-center"><Focus className="w-4 h-4 text-white" /></div>
                      <h4 className="text-sm font-bold text-white">Benefits of Training</h4>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Enhances focus endurance, stabilizes sustained attention span, and builds the cognitive resistance needed against common attention killers.</p>
                  </div>
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40 hover:bg-gray-800/50 transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center"><Activity className="w-4 h-4 text-white" /></div>
                      <h4 className="text-sm font-bold text-white">Tracking & Stability</h4>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Rather than pure speed, this drill rewards tracking consistency and flow stability, directly mapping to cognitive control capabilities.</p>
                  </div>
                </div>

                <section>
                  <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-yellow-400" /> How Flow Improves Performance
                  </h3>
                  <p className="text-sm leading-relaxed mb-4">
                    In gaming, flow state allows for predictive, rather than reactive, mechanics. In learning and productivity, flow bypasses the heavy cognitive load of task switching and procrastination. By systematically penalizing focus breaks (flow decay) without harsh score deductions, this drill creates a safe environment to push your mental endurance to its limits, perfectly mimicking the principles of Deep Work.
                  </p>
                </section>
              </div>

              <div className="bg-[#0b0f19] border-t border-gray-800 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Lightbulb className="w-6 h-6 text-yellow-400" />
                  <h3 className="text-xl font-bold text-white">Frequently Asked Questions</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FAQItem q="1. What is flow state?" a="Flow state, often called 'being in the zone', is a psychological state of deep focus and total immersion in an activity, resulting in peak performance and cognitive clarity." />
                  <FAQItem q="2. Can flow state be trained?" a="Yes, flow state can be trained by repeatedly engaging in activities that balance challenge and skill, such as sustained visual tracking drills, which build concentration endurance." />
                  <FAQItem q="3. How long should I practice?" a="For building focus endurance, aim for 10-15 minute daily sessions. Stop when you notice severe mental fatigue or frequent attention drift." />
                  <FAQItem q="4. What is deep focus?" a="Deep focus is the ability to sustain attention on a single complex task without succumbing to external distractions or internal cognitive drift." />
                  <FAQItem q="5. How does flow improve learning?" a="Flow eliminates mental friction and distraction, allowing the brain's working memory to dedicate 100% of its resources to processing and storing new information." />
                  <FAQItem q="6. How does flow improve gaming?" a="In competitive gaming, flow state allows players to react intuitively, track targets flawlessly, and make split-second strategic decisions without conscious hesitation." />
                  <FAQItem q="7. Can flow improve productivity?" a="Absolutely. Operating in a flow state is the core principle behind 'Deep Work', allowing individuals to produce higher quality output in significantly less time." />
                  <FAQItem q="8. What is sustained attention?" a="Sustained attention is a component of executive functioning that involves maintaining consistent behavioral response and focus during continuous and repetitive activity." />
                  <FAQItem q="9. Why does focus break?" a="Focus breaks occur due to cognitive fatigue, external sensory interruptions, or when the task's difficulty either dramatically exceeds or falls below the user's skill level." />
                  <FAQItem q="10. What is attention control?" a="Attention control is an individual's capacity to choose what they pay attention to and what they ignore. It is a critical metric for cognitive stability." />
                  <FAQItem q="11. How long does it take to improve concentration?" a="With daily, deliberate practice using concentration tools, measurable improvements in sustained attention and focus duration can be seen in 2 to 4 weeks." />
                  <FAQItem q="12. Can this improve ADHD-like focus problems?" a="While not a medical treatment, visual tracking exercises that provide immediate gamified feedback can help train the brain's reward pathways to sustain attention longer." />
                  <FAQItem q="13. How often should I train?" a="Daily practice is optimal for neuroplasticity. Use this drill as a 5-minute mental warmup before starting work, studying, or competitive gaming sessions." />
                  <FAQItem q="14. What is peak flow?" a="Peak flow occurs at the 80-100% mark of the Flow Meter. It represents total visual and motor synchronization, where tracking becomes predictive rather than reactive." />
                  <FAQItem q="15. What is concentration endurance?" a="Concentration endurance is the mental stamina required to maintain a high-level flow state over prolonged periods without cognitive degradation." />
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
          <footer className="mt-12 bg-[#05060b] border border-gray-800 text-gray-500 rounded-xl py-10 px-6 font-mono text-[10px]" role="contentinfo">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 mb-8">
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Motor & FPS</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/motor/hand-eye-coordination/aim-trainer" className="hover:text-cyan-400 transition-colors">Aim Trainer Elite</Link></li>
                    <li><Link href="/drills/fps/flick-shot-training" className="hover:text-cyan-400 transition-colors">Flick Shot Trainer</Link></li>
                    <li><Link href="/drills/fps" className="text-cyan-500 hover:text-cyan-400 transition-colors font-bold">All FPS Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Memory</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/memory/working-memory/n-back" className="hover:text-cyan-400 transition-colors">3-Back Training</Link></li>
                    <li><Link href="/drills/memory/short-term-memory/color-sequence" className="hover:text-cyan-400 transition-colors">Color Sequence</Link></li>
                    <li><Link href="/drills/memory" className="text-cyan-500 hover:text-cyan-400 transition-colors font-bold">All Memory Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Cognitive</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/cognitive/memory/card-matching" className="hover:text-cyan-400 transition-colors">Memory Games</Link></li>
                    <li><Link href="/drills/cognitive/attention/divided-attention" className="hover:text-cyan-400 transition-colors">Attention Drills</Link></li>
                    <li><Link href="/drills/cognitive" className="text-cyan-500 hover:text-cyan-400 transition-colors font-bold">All Cognitive Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Academic</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/academic/writing-speed/typing-test" className="hover:text-cyan-400 transition-colors">Typing Speed Test</Link></li>
                    <li><Link href="/drills/academic/math-speed/mental-math" className="hover:text-cyan-400 transition-colors">Mental Math</Link></li>
                    <li><Link href="/drills/academic" className="text-cyan-500 hover:text-cyan-400 transition-colors font-bold">All Academic Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">More Sectors</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/visual" className="hover:text-cyan-400 transition-colors">Visual</Link></li>
                    <li><Link href="/drills/physical" className="hover:text-cyan-400 transition-colors">Physical</Link></li>
                  </ul>
                </div>
              </div>
              
              <div className="border-t border-gray-800 pt-8 text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="w-6 h-6 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 rounded-lg flex items-center justify-center">
                    <Waves className="w-3.5 h-3.5 text-cyan-400" />
                  </div>
                  <span className="text-white font-black tracking-widest text-xs uppercase">SkillDrills</span>
                </div>
                <p className="text-[9px] mb-2">&copy; {new Date().getFullYear()} SkillDrills. All rights reserved.</p>
                <p className="text-[9px] max-w-2xl mx-auto leading-relaxed mb-6">
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
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/></svg>
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
    <div className={`group rounded-xl border ${highlight ? 'border-cyan-500/50 bg-cyan-500/5' : 'border-gray-800 bg-gray-900/50'} p-2 text-center flex flex-col justify-center h-full transition-all duration-300 hover:scale-[1.03] hover:border-gray-700`}>
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
    fuchsia: 'bg-fuchsia-600 text-fuchsia-300 border-fuchsia-500', 
    red: 'bg-red-600 text-red-300 border-red-500', 
    orange: 'bg-orange-600 text-orange-300 border-orange-500',
    cyan: 'bg-cyan-600 text-cyan-300 border-cyan-500',
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
    <Link href={href} className="group relative overflow-hidden rounded-2xl border border-gray-800 bg-[#0b0f19]/40 transition-all hover:-translate-y-1 hover:border-gray-600 block p-5">
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${gradients[color]}`}></div>
      <div className="w-10 h-10 rounded-xl bg-[#050811] border border-gray-700 flex items-center justify-center text-gray-400 group-hover:text-white mb-3 shadow-inner transition-colors">
        {icon}
      </div>
      <h3 className="font-bold text-base mb-1.5 text-white transition-colors">{title}</h3>
      <p className="text-xs text-gray-500 mb-4">{desc}</p>
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