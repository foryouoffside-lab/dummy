'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Head from 'next/head';

import { 
  Activity, AlertCircle, ArrowRight, BarChart3, ChevronRight, 
  Clock, Crosshair, Eye, GraduationCap, Info, Lightbulb, 
  Maximize2, Minimize2, Play, RefreshCw, Target, 
  Timer, TrendingUp, Trophy, Volume2, VolumeX, Zap, 
  Users, CheckCircle2, XCircle, Shield, Award, Sparkles, Flame,
  Share2, Copy, Brain, Sliders, MonitorX
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

  playSuccess(combo = 0) {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      // Pitch goes up slightly as combo builds
      const baseFreq = 880;
      const freqPitch = Math.min(1300, baseFreq + (combo * 10)); 
      osc.frequency.setValueAtTime(freqPitch, this.ctx.currentTime); 
      osc.frequency.setValueAtTime(freqPitch * 1.25, this.ctx.currentTime + 0.05); 
      gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.2);
      osc.connect(gain); 
      gain.connect(this.ctx.destination);
      osc.start(); 
      osc.stop(this.ctx.currentTime + 0.2);
    } catch(e) {}
  }

  playFail() {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(150, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.25);
      osc.connect(gain); gain.connect(this.ctx.destination);
      osc.start(); osc.stop(this.ctx.currentTime + 0.25);
    } catch(e) {}
  }

  setEnabled(status) {
    this.enabled = status;
  }
}

const audioSynth = typeof window !== 'undefined' ? new AudioSynthesizer() : null;
const DRILL_DURATION = 60; // 60 seconds strict base

// ============================================================
// RANK CALCULATION & SUGGESTIONS
// ============================================================
const calculateRank = (level, accuracy) => {
  if (level >= 7 && accuracy >= 90) return { rank: 'Professional Aim Master', color: 'text-fuchsia-400' };
  if (level >= 6 && accuracy >= 85) return { rank: 'Elite Flick Specialist', color: 'text-purple-400' };
  if (level >= 5 && accuracy >= 80) return { rank: 'Competitive Fragger', color: 'text-red-400' };
  if (level >= 4 && accuracy >= 75) return { rank: 'Advanced Aimer', color: 'text-orange-400' };
  if (level >= 3 && accuracy >= 70) return { rank: 'Precision Shooter', color: 'text-yellow-400' };
  if (level >= 2) return { rank: 'Developing Aimer', color: 'text-blue-400' };
  return { rank: 'Beginner', color: 'text-slate-400' };
};

const getSuggestion = (accuracy, timeouts, missedClicks, combo) => {
  if (accuracy < 70) return "Good speed but low accuracy. You are overshooting targets. Micro-adjustments need work.";
  if (missedClicks < 5 && timeouts > 5) return "Excellent precision but too slow. Don't hesitate. Trust your first flick and increase hand speed.";
  if (combo > 30) return "Elite flick control and strong flick consistency. You are chaining targets perfectly. Push for higher multi-kills.";
  if (accuracy >= 90) return "Excellent first shot discipline. You are mapping your mousepad correctly. Try pushing your speed slightly higher.";
  return "Solid baseline performance. Focus on accuracy over speed to secure the end-of-session accuracy bonus points.";
};

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function FlickShotTrainerClient() {
  const [gameState, setGameState] = useState('start'); 
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [pointerLocked, setPointerLocked] = useState(false);
  const [universalSens, setUniversalSens] = useState(1.0);
  const [isMobile, setIsMobile] = useState(false);

  // HUD State
  const [uiScore, setUiScore] = useState(0);
  const [uiLevel, setUiLevel] = useState(1);
  const [uiCombo, setUiCombo] = useState(0);
  const [uiTimeLeft, setUiTimeLeft] = useState(DRILL_DURATION);
  const [bestScore, setBestScore] = useState(0);
  const [isNewBest, setIsNewBest] = useState(false);

  const [analytics, setAnalytics] = useState({
    accuracy: 100, successfulHits: 0, missedClicks: 0, timeouts: 0, 
    avgReactionTime: 0, fastestReaction: 0, slowestReaction: 0,
    maxCombo: 0, finalLevel: 1, rankData: null, accuracyBonus: 0
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
    target: { active: false, x: 0, y: 0, radius: 30, age: 0, spawnTime: 0 },
    score: 0, level: 1, combo: 0, timeLeft: DRILL_DURATION, nextSpawnTime: 0,
    successfulHits: 0, missedClicks: 0, timeouts: 0, maxCombo: 0, reactionTimes: [], totalActions: 0,
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
      const savedSens = localStorage.getItem('flickAim_sens');
      if (savedSens) setUniversalSens(parseFloat(savedSens));
      const savedBest = localStorage.getItem('flickAim_bestScore'); 
      if (savedBest) setBestScore(parseInt(savedBest, 10));
    } catch (e) {}
  }, []);

  useEffect(() => {
    if (gameState !== 'playing') {
      try { localStorage.setItem('flickAim_sens', universalSens.toString()); } catch (e) {}
    }
    if (audioSynth) audioSynth.setEnabled(soundEnabled);
  }, [universalSens, gameState, soundEnabled]);

  // Core Game Management
  const getLevelConfig = (score) => {
    // Level 1: 0-100 (Scale 1.0)
    let scale = 1.0, level = 1;
    if (score >= 1500) { scale = 0.70; level = 7; }
    else if (score >= 1000) { scale = 0.75; level = 6; }
    else if (score >= 750) { scale = 0.80; level = 5; }
    else if (score >= 500) { scale = 0.85; level = 4; }
    else if (score >= 250) { scale = 0.90; level = 3; }
    else if (score >= 100) { scale = 0.95; level = 2; }

    const baseRadius = 30; // 100% size
    const baseTtl = 1000;  // 1000ms delay/ttl
    const baseSpawnDelay = 400; 

    return {
      level,
      scale,
      radius: baseRadius * scale,
      ttl: baseTtl * scale,
      spawnDelay: baseSpawnDelay * scale
    };
  };

  const getComboMultiplier = (combo) => {
    if (combo >= 30) return 3.0;
    if (combo >= 20) return 2.0;
    if (combo >= 10) return 1.5;
    if (combo >= 5) return 1.2;
    return 1.0;
  };

  const endGame = useCallback(() => {
    setGameState('gameOver');
    if (document.pointerLockElement) document.exitPointerLock();
    
    const e = engine.current;
    const finalAccuracy = e.totalActions > 0 ? Math.round((e.successfulHits / e.totalActions) * 100) : 0;
    
    let avgRt = 0, fastRt = 0, slowRt = 0;
    if (e.reactionTimes.length > 0) {
      avgRt = Math.round(e.reactionTimes.reduce((a, b) => a + b, 0) / e.reactionTimes.length);
      fastRt = Math.round(Math.min(...e.reactionTimes));
      slowRt = Math.round(Math.max(...e.reactionTimes));
    }

    // Accuracy Bonus Calculation
    let accuracyBonus = 0;
    if (finalAccuracy >= 95) accuracyBonus = 500;
    else if (finalAccuracy >= 90) accuracyBonus = 300;
    else if (finalAccuracy >= 80) accuracyBonus = 150;
    else if (finalAccuracy >= 70) accuracyBonus = 50;

    const finalScore = e.score + accuracyBonus;
    const rank = calculateRank(e.level, finalAccuracy);

    setAnalytics({
      accuracy: finalAccuracy, successfulHits: e.successfulHits, missedClicks: e.missedClicks,
      timeouts: e.timeouts, avgReactionTime: avgRt, fastestReaction: fastRt, slowestReaction: slowRt,
      maxCombo: e.maxCombo, finalLevel: e.level, rankData: rank, accuracyBonus
    });

    setUiScore(finalScore);

    setBestScore(prev => {
      if (finalScore > prev) {
        setIsNewBest(true);
        try { localStorage.setItem('flickAim_bestScore', finalScore.toString()); } catch(err){}
        return finalScore;
      }
      return prev;
    });
  }, []);

  const spawnTarget = useCallback((time, width, height, currentScore) => {
    const e = engine.current;
    const config = getLevelConfig(currentScore);
    
    const pad = Math.max(config.radius + 10, 50);
    const targetX = pad + Math.random() * (width - pad * 2);
    const targetY = pad + Math.random() * (height - pad * 2);
    
    e.target = {
      active: true, x: targetX, y: targetY, radius: config.radius,
      age: 0, spawnTime: time, ttl: config.ttl 
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
    setUiScore(0);
    setUiLevel(1);
    setUiCombo(0);
    setUiTimeLeft(DRILL_DURATION);
    lastTimeRef.current = DRILL_DURATION;
    
    setAnalytics({ accuracy: 100, successfulHits: 0, missedClicks: 0, timeouts: 0, avgReactionTime: 0, fastestReaction: 0, slowestReaction: 0, maxCombo: 0, finalLevel: 1, rankData: null, accuracyBonus: 0 });
    setGameState('playing');
    
    engine.current = {
      crosshair: { ...engine.current.crosshair },
      target: { active: false, x: 0, y: 0, radius: 30, age: 0, spawnTime: 0, ttl: 1000 },
      score: 0, level: 1, combo: 0, timeLeft: DRILL_DURATION,
      nextSpawnTime: performance.now() + 400,
      successfulHits: 0, missedClicks: 0, timeouts: 0, maxCombo: 0, reactionTimes: [], totalActions: 0,
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
    }, 150);
  }, [isMobile]);

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

          if (!eRef.target.active) {
            // Miss when no target is active
            eRef.missedClicks++;
            eRef.timeLeft = Math.max(0, eRef.timeLeft - 1); // Miss Penalty: -1s
            eRef.combo = 0;
            eRef.screenShake = 5;
            eRef.flash = { color: '239, 68, 68', alpha: 0.2 }; 
            setUiCombo(0);
            if (audioSynth) audioSynth.playFail();
          } else {
            const ch = eRef.crosshair;
            const t = eRef.target;
            const dist = Math.hypot(ch.x - t.x, ch.y - t.y);
            
            if (dist <= t.radius + 12) { 
              // Hit target!
              eRef.successfulHits++;
              eRef.combo++;
              if (eRef.combo > eRef.maxCombo) eRef.maxCombo = eRef.combo;
              eRef.reactionTimes.push(t.age);
              
              const multiplier = getComboMultiplier(eRef.combo);
              eRef.score += Math.round(10 * multiplier); // +10 Base Score * Multiplier
              eRef.timeLeft += 1; // +1s Time Reward
              
              const config = getLevelConfig(eRef.score);
              eRef.level = config.level;
              
              setUiScore(eRef.score);
              setUiCombo(eRef.combo);
              setUiLevel(eRef.level);

              if (audioSynth) audioSynth.playSuccess(eRef.combo);
              createExplosion(t.x, t.y, '#00ff88');
              createHitMarker(ch.x, ch.y);
              eRef.target.active = false;
              
              eRef.nextSpawnTime = performance.now() + config.spawnDelay;
              
            } else {
              // Miss target active
              eRef.missedClicks++;
              eRef.timeLeft = Math.max(0, eRef.timeLeft - 1); // Miss Penalty: -1s
              eRef.combo = 0;
              eRef.screenShake = 8;
              eRef.flash = { color: '239, 68, 68', alpha: 0.3 };
              setUiCombo(0);
              if (audioSynth) audioSynth.playFail();
              createExplosion(ch.x, ch.y, '#ef4444');
            }
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
        
        if (e.timeLeft > 0) {
          e.timeLeft -= dt;
        }

        if (e.timeLeft <= 0) {
          e.timeLeft = 0;
          setUiTimeLeft(0);
          if (progressBarRef.current) progressBarRef.current.style.width = '0%';
          endGame();
          return; 
        }

        if (progressBarRef.current) {
            progressBarRef.current.style.width = `${Math.min(100, (e.timeLeft / DRILL_DURATION) * 100)}%`;
            progressBarRef.current.className = `h-full transition-all ease-linear ${e.timeLeft <= 10 ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`;
        }

        const intTime = Math.ceil(e.timeLeft);
        if (intTime !== lastTimeRef.current) {
            setUiTimeLeft(intTime);
            lastTimeRef.current = intTime;
        }

        if (!e.target.active && time >= e.nextSpawnTime) {
          spawnTarget(time, cvs.width, cvs.height, e.score);
        }

        if (e.target.active) {
          e.target.age += deltaTimeMs;

          if (e.target.age >= e.target.ttl) {
            // Timeout!
            e.target.active = false;
            e.timeouts++;
            e.totalActions++;
            e.timeLeft = Math.max(0, e.timeLeft - 1); // Timeout Penalty -1s
            e.combo = 0;
            e.screenShake = 12;
            e.flash = { color: '239, 68, 68', alpha: 0.4 };
            setUiCombo(0);
            if (audioSynth) audioSynth.playFail();
            createExplosion(e.target.x, e.target.y, '#ef4444');
            
            const config = getLevelConfig(e.score);
            e.nextSpawnTime = time + config.spawnDelay;
          }
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
      ctx.strokeStyle = 'rgba(0, 255, 136, 0.03)';
      ctx.lineWidth = 1;
      for (let i = 0; i < cvs.width; i += 60) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, cvs.height); ctx.stroke(); }
      for (let j = 0; j < cvs.height; j += 60) { ctx.beginPath(); ctx.moveTo(0, j); ctx.lineTo(cvs.width, j); ctx.stroke(); }

      if (e.target.active && (gameState === 'playing' || gameState === 'start')) {
        const t = e.target;
        const lifePercent = 1 - (t.age / t.ttl);
        
        ctx.shadowBlur = 15 + (e.level * 2); 
        ctx.shadowColor = e.combo >= 10 ? '#38bdf8' : '#00ff88'; 
        ctx.fillStyle = '#05060b';
        ctx.beginPath(); ctx.arc(t.x, t.y, t.radius, 0, Math.PI * 2); ctx.fill();
        ctx.shadowBlur = 0;

        ctx.fillStyle = e.combo >= 10 ? '#38bdf8' : '#00ff88';
        ctx.beginPath(); ctx.arc(t.x, t.y, t.radius * 0.35, 0, Math.PI * 2); ctx.fill();

        const ringColor = lifePercent > 0.5 ? (e.combo >= 10 ? '#38bdf8' : '#00ff88') : (lifePercent > 0.25 ? '#eab308' : '#ef4444');
        ctx.strokeStyle = ringColor;
        ctx.lineWidth = 2.5;
        ctx.beginPath(); ctx.arc(t.x, t.y, t.radius + 4 + (Math.max(0, lifePercent) * 12), 0, Math.PI * 2); ctx.stroke();
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
        const activeColor = pointerLocked ? '#00ff88' : '#eab308';
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
    const text = `🎯 I scored ${uiScore} PTS (${analytics.rankData.rank}) on the Pro Flick Aim Trainer! Accuracy: ${analytics.accuracy}% | Best Combo: ${analytics.maxCombo}x. Practice your target acquisition at skilldrills.online!`;
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({ title: 'My Flick Aim Score', text, url: 'https://skilldrills.online/drills/fps/flick-shot-training' });
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
          { "@type": "ListItem", "position": 3, "name": "Flick Aim Trainer" }
        ]
      },
      {
        "@type": "WebApplication",
        "name": "Flick Aim Trainer - Free FPS Aim Training & Flick Shot Practice",
        "applicationCategory": "GameApplication",
        "operatingSystem": "Any",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
      },
      {
        "@type": "SoftwareApplication",
        "name": "Flick Aim Trainer",
        "applicationCategory": "GameApplication",
        "operatingSystem": "Web",
        "description": "Train flick aim, target acquisition, and first-shot accuracy with this free FPS aim trainer. Improve mouse precision for Valorant, CS2, Apex Legends, and more."
      },
      {
        "@type": "HowTo",
        "name": "How to use the Flick Aim Trainer",
        "step": [
          { "@type": "HowToStep", "text": "Adjust your Universal Sens multiplier to match your game." },
          { "@type": "HowToStep", "text": "Click 'Begin Tactical Drill' to lock your mouse and enter fullscreen." },
          { "@type": "HowToStep", "text": "Flick quickly to targets as they spawn across your screen." },
          { "@type": "HowToStep", "text": "Maintain high accuracy to build score multipliers and increase survival time." }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          { "@type": "Question", "name": "What is flick aim?", "acceptedAnswer": { "@type": "Answer", "text": "Flick aim is the mechanical ability to quickly snap your crosshair to a target outside of your immediate focus area using a single, swift mouse movement." } },
          { "@type": "Question", "name": "How do I improve flick aim?", "acceptedAnswer": { "@type": "Answer", "text": "Improve flick aim by practicing raw input drills that penalize misses and reward speed, forcing you to map the physical mousepad space to your monitor accurately." } },
          { "@type": "Question", "name": "What is a good flick accuracy?", "acceptedAnswer": { "@type": "Answer", "text": "A good baseline flick accuracy is around 70%. Advanced players aim for 80%+, while professional esports players maintain 90%+ precision during high-speed target acquisition." } },
          { "@type": "Question", "name": "Does flick training help Valorant?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, Valorant heavily relies on crosshair placement and first-shot accuracy. Flick training improves your ability to react and snap to off-angle enemies instantly." } },
          { "@type": "Question", "name": "Does flick training help CS2?", "acceptedAnswer": { "@type": "Answer", "text": "Absolutely. Counter-Strike requires immense micro and macro flicking, especially with AWPing or reacting to unexpected peekers." } },
          { "@type": "Question", "name": "Can flick aim be learned?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, flick aim is a physical motor skill. Through repetitive practice with zero hardware acceleration, you develop muscle memory that makes flicking subconscious." } },
          { "@type": "Question", "name": "How long should I practice?", "acceptedAnswer": { "@type": "Answer", "text": "Aim for 15-20 minutes of dedicated flick aim training daily before playing competitive matches to optimize muscle memory retention without causing fatigue." } },
          { "@type": "Question", "name": "Should I use arm aim?", "acceptedAnswer": { "@type": "Answer", "text": "For macro-flicks (large distances across the screen), arm aiming is generally preferred as it provides better stability and consistency on low sensitivities." } },
          { "@type": "Question", "name": "Should I use wrist aim?", "acceptedAnswer": { "@type": "Answer", "text": "Wrist and fingertip aiming should be used for micro-flicks and fine adjustments once your arm brings the crosshair near the target." } },
          { "@type": "Question", "name": "How important is sensitivity?", "acceptedAnswer": { "@type": "Answer", "text": "Sensitivity is crucial. You must find a consistent sensitivity (eDPI) and stick to it so your brain can properly map physical hand movement to virtual crosshair movement." } },
          { "@type": "Question", "name": "Can aim trainers improve rank?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, aim trainers isolate mechanical flaws. By improving your raw mechanical skill, you win more aim duels, which naturally translates to ranking up." } },
          { "@type": "Question", "name": "What is target acquisition?", "acceptedAnswer": { "@type": "Answer", "text": "Target acquisition is the combined cognitive and physical process of visually locating an enemy and moving your crosshair onto them." } },
          { "@type": "Question", "name": "What is snap aiming?", "acceptedAnswer": { "@type": "Answer", "text": "Snap aiming is another term for flicking. It emphasizes the fast, abrupt 'snapping' motion of the crosshair onto a target." } },
          { "@type": "Question", "name": "Why do I overshoot targets?", "acceptedAnswer": { "@type": "Answer", "text": "Overshooting usually means your sensitivity is too high, or you haven't built enough stopping power (deceleration control) in your wrist." } },
          { "@type": "Question", "name": "How do pro players train aim?", "acceptedAnswer": { "@type": "Answer", "text": "Pros use a combination of dedicated aim trainers (like this one), in-game deathmatches, and routine warmup regimens to maintain peak mechanical precision." } },
          { "@type": "Question", "name": "How does the scoring system work?", "acceptedAnswer": { "@type": "Answer", "text": "Hits grant +10 base score and +1s time. Misses/timeouts deduct -1s time. Score multipliers scale up with combo streaks, and difficulty scales with total score." } }
        ]
      }
    ]
  };

  return (
    <div ref={pageRef} className="min-h-screen select-none bg-[#050508] text-white">
      <Head>
        <title>Flick Aim Trainer - Free FPS Aim Training & Flick Shot Practice</title>
        <meta name="description" content="Train flick aim, target acquisition, and first-shot accuracy with this free FPS aim trainer. Improve mouse precision for Valorant, CS2, Apex Legends, Rainbow Six Siege, and other competitive shooters." />
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
                <li className="text-green-400 font-medium">Flick Aim Trainer</li>
              </ol>
            </nav>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-[0_0_20px_rgba(34,197,94,0.3)]">
                  <Crosshair className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Flick Aim Trainer – Free FPS Aim Training</h1>
                  <p className="text-sm text-gray-400 mt-1 font-medium">Desktop Exclusive • Dynamic Score-Based Scaling</p>
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

        <div 
          ref={containerRef} 
          className={`relative overflow-hidden transition-colors outline-none bg-[#05060b] ${
            isFullscreen ? 'w-full h-full' : 'w-full aspect-video min-h-[500px] rounded-2xl border border-gray-800 shadow-2xl'
          }`}
        >
          {gameState === 'playing' && (
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gray-900 z-[60]">
              <div ref={progressBarRef} className="h-full bg-green-500" style={{ width: '100%' }} />
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
                    <p className="text-[10px] text-fuchsia-400 font-bold uppercase tracking-widest">Level</p>
                    <p className="text-2xl font-black text-fuchsia-400 leading-none">{uiLevel}</p>
                  </div>
                </div>
                
                {uiCombo > 1 && (
                  <div className="bg-black/40 backdrop-blur border border-orange-500/30 px-4 py-2 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-left-4">
                    <Flame className="w-5 h-5 text-orange-500" />
                    <div>
                      <p className="text-[10px] text-orange-400 font-bold uppercase tracking-widest">Combo Multiplier</p>
                      <p className="text-xl font-black text-white leading-none">{getComboMultiplier(uiCombo)}x</p>
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
                <AlertCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
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
                  Professional Flick Aim Trainer
                </h2>
                <p className="text-xs text-slate-500 uppercase tracking-widest mb-6">
                  Hardware Raw Input • Endless Progression
                </p>

                <div className="grid grid-cols-2 gap-3 mb-6 text-left">
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Objective</span>
                    <span className="text-sm font-black text-white">Snap & Shoot</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Reward</span>
                    <span className="text-sm font-black text-green-400">+10 PTS & +1s Time</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Penalty</span>
                    <span className="text-sm font-black text-red-400">-1s Time Penalty</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Mechanic</span>
                    <span className="text-sm font-black text-blue-400">Score-Based Scaling</span>
                  </div>
                </div>

                <div className="bg-[#0b0f19] border border-slate-850 p-4 rounded-xl mb-6 text-left text-xs text-slate-400">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-white uppercase mb-3">
                    <Sliders className="w-3.5 h-3.5 text-blue-500" /> Universal Sens
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

                <div className="flex gap-2">
                  {isMobile ? (
                    <div className="flex-1 py-3 bg-red-900/50 border border-red-500/50 text-red-200 font-bold rounded-xl text-xs flex items-center justify-center gap-2 uppercase tracking-widest cursor-not-allowed">
                      <MonitorX className="w-4 h-4" /> Desktop Only (Raw Mouse Required)
                    </div>
                  ) : (
                    <button
                      onClick={startGame}
                      className="flex-1 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg uppercase tracking-widest transition-all duration-200 active:scale-95"
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
                    {analytics.accuracyBonus > 0 && <span className="text-[9px] text-green-400 block">+{analytics.accuracyBonus} Acc Bonus</span>}
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Accuracy</span>
                    <span className="text-lg font-black text-white">{analytics.accuracy}%</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Avg Reaction</span>
                    <span className="text-lg font-black text-white">{analytics.avgReactionTime}ms</span>
                  </div>
                  
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Max Combo</span>
                    <span className="text-lg font-black text-white">{analytics.maxCombo}x</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Total Hits</span>
                    <span className="text-lg font-black text-white">{analytics.successfulHits}</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Assigned Rank</span>
                    <span className={`text-sm font-black ${analytics.rankData.color} truncate block mt-1`}>
                      {analytics.rankData.rank}
                    </span>
                  </div>
                </div>

                <div className="bg-[#0b0f19] border border-slate-850 p-4 rounded-xl mb-6 text-left text-xs text-slate-400">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-white uppercase mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-yellow-500" /> Improvement Suggestion:
                  </div>
                  <p className="leading-relaxed">
                    {getSuggestion(analytics.accuracy, analytics.timeouts, analytics.missedClicks, analytics.maxCombo)}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={startGame}
                    className="flex-1 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg uppercase tracking-widest transition-all duration-200 active:scale-95"
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
                <Info className="w-5 h-5 text-fuchsia-400" /><h2 className="font-bold text-white text-lg tracking-wide">Progression & Scoring Rules</h2>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-5">
                  <RuleItem num="1" color="green" text="Successful Hit" highlight="+10 PTS & +1s Time" result="Builds combo multiplier" />
                  <RuleItem num="2" color="orange" text="Combo System" highlight="Up to 3.0x Multiplier" result="Breaks upon miss/timeout" />
                </div>
                <div className="space-y-5">
                  <RuleItem num="3" color="fuchsia" text="Dynamic Scaling" highlight="Based on Score" result="Targets shrink & speed up" />
                  <RuleItem num="4" color="red" text="Time Penalties" highlight="-1s Time Penalty" result="No raw point deductions" />
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
                <GraduationCap className="w-5 h-5 text-green-400" />
                <h2 className="font-bold text-white text-lg tracking-wide">About the Flick Aim Trainer</h2>
              </div>
              
              <div className="p-8 space-y-8">
                <section>
                  <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                    <Eye className="w-5 h-5 text-blue-400" /> What Is Flick Aim?
                  </h3>
                  <p className="text-sm leading-relaxed mb-4">
                    <strong>Flick Aim</strong> is the core mechanical skill of quickly and accurately snapping your crosshair onto a target that appears outside your immediate focus area. Unlike tracking, which requires smooth continuous motion, <strong>flick training</strong> develops spatial mouse control, first-shot precision, and rapid target acquisition.
                  </p>
                  <p className="text-sm leading-relaxed">
                    This drill dynamically scales difficulty based on your score, forcing you to maintain high precision as targets become smaller and faster. It is engineered specifically for tactical shooters like Valorant, CS2, and Rainbow Six Siege.
                  </p>
                </section>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 py-4 border-y border-gray-800/50">
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40 hover:bg-gray-800/50 transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center"><Users className="w-4 h-4 text-white" /></div>
                      <h4 className="text-sm font-bold text-white">Who Should Use This?</h4>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">FPS competitors playing Valorant, CS2, Apex Legends, FragPunk, or Spectre Divide looking to refine their micro and macro snap aim.</p>
                  </div>
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40 hover:bg-gray-800/50 transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-fuchsia-600 flex items-center justify-center"><TrendingUp className="w-4 h-4 text-white" /></div>
                      <h4 className="text-sm font-bold text-white">Benefits of Flick Training</h4>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Develops raw motor memory for mouse control, improves first-shot accuracy, and trains faster crosshair placement recovery.</p>
                  </div>
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40 hover:bg-gray-800/50 transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-orange-600 flex items-center justify-center"><Target className="w-4 h-4 text-white" /></div>
                      <h4 className="text-sm font-bold text-white">Accuracy Focus</h4>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Misses deduct time but not score. High precision yields massive accuracy bonuses at the end of the session, encouraging careful, fast shots.</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#0b0f19] border-t border-gray-800 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Lightbulb className="w-6 h-6 text-yellow-400" />
                  <h3 className="text-xl font-bold text-white">Frequently Asked Questions</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FAQItem q="1. What is flick aim?" a="Flick aim is the mechanical ability to quickly snap your crosshair to a target outside of your immediate focus area using a single, swift mouse movement." />
                  <FAQItem q="2. How do I improve flick aim?" a="Improve flick aim by practicing raw input drills that penalize misses and reward speed, forcing you to map the physical mousepad space to your monitor accurately." />
                  <FAQItem q="3. What is a good flick accuracy?" a="A good baseline flick accuracy is around 70%. Advanced players aim for 80%+, while professional esports players maintain 90%+ precision during high-speed target acquisition." />
                  <FAQItem q="4. Does flick training help Valorant?" a="Yes, Valorant heavily relies on crosshair placement and first-shot accuracy. Flick training improves your ability to react and snap to off-angle enemies instantly." />
                  <FAQItem q="5. Does flick training help CS2?" a="Absolutely. Counter-Strike requires immense micro and macro flicking, especially with AWPing or reacting to unexpected peekers." />
                  <FAQItem q="6. Can flick aim be learned?" a="Yes, flick aim is a physical motor skill. Through repetitive practice with zero hardware acceleration, you develop muscle memory that makes flicking subconscious." />
                  <FAQItem q="7. How long should I practice?" a="Aim for 15-20 minutes of dedicated flick aim training daily before playing competitive matches to optimize muscle memory retention without causing fatigue." />
                  <FAQItem q="8. Should I use arm aim?" a="For macro-flicks (large distances across the screen), arm aiming is generally preferred as it provides better stability and consistency on low sensitivities." />
                  <FAQItem q="9. Should I use wrist aim?" a="Wrist and fingertip aiming should be used for micro-flicks and fine adjustments once your arm brings the crosshair near the target." />
                  <FAQItem q="10. How important is sensitivity?" a="Sensitivity is crucial. You must find a consistent sensitivity (eDPI) and stick to it so your brain can properly map physical hand movement to virtual crosshair movement." />
                  <FAQItem q="11. Can aim trainers improve rank?" a="Yes, aim trainers isolate mechanical flaws. By improving your raw mechanical skill, you win more aim duels, which naturally translates to ranking up." />
                  <FAQItem q="12. What is target acquisition?" a="Target acquisition is the combined cognitive and physical process of visually locating an enemy and moving your crosshair onto them." />
                  <FAQItem q="13. What is snap aiming?" a="Snap aiming is another term for flicking. It emphasizes the fast, abrupt 'snapping' motion of the crosshair onto a target." />
                  <FAQItem q="14. Why do I overshoot targets?" a="Overshooting usually means your sensitivity is too high, or you haven't built enough stopping power (deceleration control) in your wrist." />
                  <FAQItem q="15. How do pro players train aim?" a="Pros use a combination of dedicated aim trainers (like this one), in-game deathmatches, and routine warmup regimens to maintain peak mechanical precision." />
                  <FAQItem q="16. How does the scoring system work?" a="Hits grant +10 base score and +1s time. Misses/timeouts deduct -1s time. Score multipliers scale up with combo streaks, and difficulty scales with total score." />
                </div>
              </div>
            </div>
          </article>
        )}

        {!isFullscreen && (
          <section className="mt-14" aria-label="Explore related aim and response drills">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-5 rounded-full bg-green-500"></div>
              <h2 className="text-xs font-bold text-white uppercase tracking-widest font-mono">
                Explore FPS Drills
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <RelatedCard href="/drills/fps/180-degree-awareness" title="180° Awareness Pro" desc="Alternate snapping opposite horizons." color="orange" icon={<Zap className="w-4 h-4" />} />
              <RelatedCard href="/drills/motor/hand-eye-coordination/aim-trainer" title="Aim Trainer Elite" desc="Hone spatial coordinate click speed." color="green" icon={<Target className="w-4 h-4" />} />
              <RelatedCard href="/drills/fps/recoil-control" title="Recoil Control" desc="Calibrate pulling pattern compensation." color="red" icon={<Activity className="w-4 h-4" />} />
              <RelatedCard href="/drills/fps/micro-correction-precision" title="Micro Flicks" desc="Optimize tight-angle crosshair corrections." color="blue" icon={<Crosshair className="w-4 h-4" />} />
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
                    <li><Link href="/drills/motor/hand-eye-coordination/aim-trainer" className="hover:text-green-400 transition-colors">Aim Trainer Elite</Link></li>
                    <li><Link href="/drills/fps/flick-shot-training" className="hover:text-green-400 transition-colors">Flick Shot Trainer</Link></li>
                    <li><Link href="/drills/fps" className="text-green-450 hover:text-green-400 transition-colors font-bold">All FPS Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Memory</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/memory/working-memory/n-back" className="hover:text-green-400 transition-colors">3-Back Training</Link></li>
                    <li><Link href="/drills/memory/short-term-memory/color-sequence" className="hover:text-green-400 transition-colors">Color Sequence</Link></li>
                    <li><Link href="/drills/memory" className="text-green-450 hover:text-green-400 transition-colors font-bold">All Memory Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Cognitive</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/cognitive/memory/card-matching" className="hover:text-green-400 transition-colors">Memory Games</Link></li>
                    <li><Link href="/drills/cognitive/attention/divided-attention" className="hover:text-green-400 transition-colors">Attention Drills</Link></li>
                    <li><Link href="/drills/cognitive" className="text-green-450 hover:text-green-400 transition-colors font-bold">All Cognitive Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Academic</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/academic/writing-speed/typing-test" className="hover:text-green-400 transition-colors">Typing Speed Test</Link></li>
                    <li><Link href="/drills/academic/math-speed/mental-math" className="hover:text-green-400 transition-colors">Mental Math</Link></li>
                    <li><Link href="/drills/academic" className="text-green-450 hover:text-green-400 transition-colors font-bold">All Academic Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">More Sectors</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/visual" className="hover:text-green-400 transition-colors">Visual (14)</Link></li>
                    <li><Link href="/drills/physical" className="hover:text-green-400 transition-colors">Physical (11)</Link></li>
                  </ul>
                </div>
              </div>
              
              <div className="border-t border-slate-900 pt-8 text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="w-6 h-6 bg-gradient-to-br from-green-500/25 to-blue-500/25 border border-green-500/30 rounded-lg flex items-center justify-center">
                    <Crosshair className="w-3.5 h-3.5 text-green-400" />
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
    <div className={`group rounded-xl border ${highlight ? 'border-orange-500/50 bg-orange-500/5' : 'border-gray-800 bg-gray-900/50'} p-2 text-center flex flex-col justify-center h-full transition-all duration-300 hover:scale-[1.03] hover:border-gray-700`}>
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