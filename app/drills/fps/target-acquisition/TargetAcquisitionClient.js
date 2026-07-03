'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';

import { 
  Activity, AlertCircle, ArrowRight, BarChart3, ChevronRight, 
  Clock, Crosshair, Eye, GraduationCap, Info, Lightbulb, 
  Maximize2, Minimize2, Play, RefreshCw, Star, Target, 
  Timer, TrendingUp, Trophy, Volume2, VolumeX, Zap, 
  Share2, CheckCircle2, XCircle, Users, Sparkles, Award
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
      if (this.ctx.state === 'suspended') this.ctx.resume();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine'; 
      osc.frequency.setValueAtTime(880, this.ctx.currentTime); 
      osc.frequency.exponentialRampToValueAtTime(1200, this.ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.12, this.ctx.currentTime); 
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.1);
      osc.connect(gain); gain.connect(this.ctx.destination);
      osc.start(); osc.stop(this.ctx.currentTime + 0.1);
    } catch(e) {}
  }

  playSetClear() {
    if (!this.enabled || !this.ctx) return;
    try {
      if (this.ctx.state === 'suspended') this.ctx.resume();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine'; 
      osc.frequency.setValueAtTime(1046, this.ctx.currentTime); 
      osc.frequency.exponentialRampToValueAtTime(2000, this.ctx.currentTime + 0.25);
      gain.gain.setValueAtTime(0.15, this.ctx.currentTime); 
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.3);
      osc.connect(gain); gain.connect(this.ctx.destination);
      osc.start(); osc.stop(this.ctx.currentTime + 0.3);
    } catch(e) {}
  }

  playThud() {
    if (!this.enabled || !this.ctx) return;
    try {
      if (this.ctx.state === 'suspended') this.ctx.resume();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle'; 
      osc.frequency.setValueAtTime(160, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.2, this.ctx.currentTime); 
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
const DRILL_DURATION = 60; // Strict 60 seconds

export default function TargetAcquisitionClient() {
  // === UI & Viewport State ===
  const [gameState, setGameState] = useState('start'); // 'start', 'playing', 'gameOver'
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [pointerLocked, setPointerLocked] = useState(false);
  
  // === Settings State ===
  const [universalSens, setUniversalSens] = useState(1.0);

  // === Gameplay State ===
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(DRILL_DURATION);
  const [isNewBest, setIsNewBest] = useState(false);
  const [flashBg, setFlashBg] = useState(null);

  // Analytics State
  const [analytics, setAnalytics] = useState({
    accuracy: 100,
    successfulHits: 0,
    missedClicks: 0,
    sequenceErrors: 0,
    setsCleared: 0,
    levelReached: 1,
    avgAcquisitionSpeed: 0.0,
    pathEfficiency: 100,
    threatRecognitionAccuracy: 100,
    fastestSetClear: 0.0,
    rankData: { rank: 'Bronze', color: 'text-slate-500' },
    coachAdvice: ''
  });

  // === DOM Refs ===
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  const timerRef = useRef(null);
  const pageRef = useRef(null);
  
  // === Game Logic Engine Refs ===
  const engine = useRef({
    crosshair: { x: 0, y: 0, initialized: false },
    targets: [],
    score: 0,
    timeLeft: DRILL_DURATION,
    
    // Telemetry & Stats
    successfulHits: 0,
    missedClicks: 0,
    sequenceErrors: 0,
    setsCleared: 0,
    totalActions: 0,
    particles: [],
    hitMarkers: [],
    screenShake: 0,
    
    // Advanced Performance metrics
    levelReached: 1,
    optimalDistance: 0,
    actualDistance: 0,
    setStartTime: 0,
    fastestSetClear: 9999,
    lastHitTime: 0,
    acquisitionTimes: [],
    pathEfficiencies: [],
    
    lastCrosshairX: 0,
    lastCrosshairY: 0
  });

  const cmPer360 = (30 / universalSens).toFixed(1);

  // === Local Storage Ingest ===
  useEffect(() => {
    try {
      const savedSens = localStorage.getItem('targetAcq_sens2');
      if (savedSens) setUniversalSens(parseFloat(savedSens));
      const savedBest = localStorage.getItem('targetAcq_bestScore2');
      if (savedBest) setBestScore(parseInt(savedBest, 10));
    } catch (e) {}
  }, []);

  useEffect(() => {
    if (gameState !== 'playing') {
      try { localStorage.setItem('targetAcq_sens2', universalSens.toString()); } catch (e) {}
    }
    if (audioSynth) audioSynth.setEnabled(soundEnabled);
  }, [universalSens, gameState, soundEnabled]);

  // === End Game & Ingest Analytics ===
  const endGame = useCallback(() => {
    setGameState('gameOver');
    if (document.pointerLockElement) document.exitPointerLock();
    
    const e = engine.current;
    const totalClicks = e.successfulHits + e.missedClicks + e.sequenceErrors;
    const threatAccuracy = totalClicks > 0 ? Math.round((e.successfulHits / totalClicks) * 100) : 0;
    
    const avgSpeed = e.acquisitionTimes.length > 0
      ? parseFloat((e.acquisitionTimes.reduce((sum, val) => sum + val, 0) / e.acquisitionTimes.length).toFixed(3))
      : 0.0;
      
    const avgPathEff = e.pathEfficiencies.length > 0
      ? Math.round(e.pathEfficiencies.reduce((sum, val) => sum + val, 0) / e.pathEfficiencies.length)
      : 100;
      
    const fastestClear = e.fastestSetClear < 9999 ? parseFloat(e.fastestSetClear.toFixed(3)) : 0.0;
    const maxLevel = e.levelReached || 1;

    let rank = 'Bronze';
    let rankColor = 'text-slate-500';
    
    if (e.score >= 2000 && threatAccuracy >= 90) {
      rank = 'Master';
      rankColor = 'text-fuchsia-400';
    } else if (e.score >= 1200 && threatAccuracy >= 82) {
      rank = 'Diamond';
      rankColor = 'text-cyan-400';
    } else if (e.score >= 700 && threatAccuracy >= 75) {
      rank = 'Platinum';
      rankColor = 'text-indigo-400';
    } else if (e.score >= 300 && threatAccuracy >= 65) {
      rank = 'Gold';
      rankColor = 'text-yellow-400';
    } else if (e.score >= 100) {
      rank = 'Silver';
      rankColor = 'text-gray-300';
    }

    let advice = 'Excellent run! Work on your path efficiency and scanning lines to glide seamlessly between targets.';
    if (e.sequenceErrors > 3) {
      advice = 'High Sequence Errors detected. Hitting targets out of order indicates rushed threat prioritization. Pause briefly on spawn to scan order.';
    } else if (e.missedClicks > 5) {
      advice = 'High missed clicks on empty background. Your mouse movements are slightly loose. Try lowering your universal sensitivity and focus on stopping on target.';
    } else if (avgPathEff < 65) {
      advice = 'Low Path Efficiency. You are taking curved lines between targets. Focus on straight, direct sweeps from circle to circle.';
    } else if (avgSpeed > 0.95) {
      advice = 'Slow acquisition delay. Scan the next brightest target peripherally before you complete clicking the current target.';
    }

    setAnalytics({
      accuracy: threatAccuracy,
      successfulHits: e.successfulHits,
      missedClicks: e.missedClicks,
      sequenceErrors: e.sequenceErrors,
      setsCleared: e.setsCleared,
      levelReached: maxLevel,
      avgAcquisitionSpeed: avgSpeed,
      pathEfficiency: avgPathEff,
      threatRecognitionAccuracy: threatAccuracy,
      fastestSetClear: fastestClear,
      rankData: { rank, color: rankColor },
      coachAdvice: advice
    });

    setScore(e.score);

    setBestScore(prev => {
      if (e.score > prev) {
        setIsNewBest(true);
        try { localStorage.setItem('targetAcq_bestScore2', e.score.toString()); } catch(err){}
        return e.score;
      }
      return prev;
    });
  }, []);

  // === Dynamic Spawn Set System (Levels 1-5) ===
  const spawnTargetSet = useCallback((width, height, currentScore) => {
    const e = engine.current;
    
    // Determine Adaptive Difficulty Level
    let level = 1;
    if (currentScore >= 2000) level = 5;
    else if (currentScore >= 1200) level = 4;
    else if (currentScore >= 700) level = 3;
    else if (currentScore >= 300) level = 2;
    
    e.levelReached = Math.max(e.levelReached || 1, level);
    
    // Parameters based on level
    const count = level === 1 ? 2 : level === 2 ? 3 : level === 3 ? 4 : 5;
    const radius = level === 1 ? 32 : level === 2 ? 28 : level === 3 ? 24 : level === 4 ? 20 : 16;
    const opacityDelta = level === 1 ? 0.45 : level === 2 ? 0.25 : level === 3 ? 0.15 : level === 4 ? 0.10 : 0.055;
    
    // Peripheral spawns & Edge Spawns - lower center bias at higher difficulty
    const marginX = level >= 4 ? 40 : level >= 3 ? 80 : 120;
    const marginY = level >= 4 ? 40 : level >= 3 ? 80 : 120;
    
    const targets = [];
    const minSpacing = radius * 2.8;

    for (let i = 0; i < count; i++) {
      let x, y, overlap;
      let attempts = 0;
      do {
        overlap = false;
        
        if (level >= 4) {
          // Increase edge/peripheral spawning (wide distribution)
          const isEdgeX = Math.random() > 0.3;
          const isEdgeY = Math.random() > 0.3;
          
          if (isEdgeX) {
            x = Math.random() > 0.5 
              ? marginX + Math.random() * 80 
              : width - marginX - 80 - Math.random() * 80;
          } else {
            x = marginX + 100 + Math.random() * (width - marginX * 2 - 200);
          }
          
          if (isEdgeY) {
            y = Math.random() > 0.5 
              ? marginY + Math.random() * 60 
              : height - marginY - 60 - Math.random() * 60;
          } else {
            y = marginY + 80 + Math.random() * (height - marginY * 2 - 160);
          }
        } else {
          // More centered spawns
          x = width * 0.15 + Math.random() * (width * 0.7);
          y = height * 0.20 + Math.random() * (height * 0.6);
        }
        
        for (const t of targets) {
          if (Math.hypot(t.x - x, t.y - y) < minSpacing) {
            overlap = true;
            break;
          }
        }
        attempts++;
      } while (overlap && attempts < 150);

      targets.push({
        id: i, // Sorting id: 0 = brightest, count-1 = dimmest
        x, 
        y, 
        radius,
        val: 1.0 - (i * opacityDelta)
      });
    }

    // Scramble drawing order
    const drawSorted = [...targets].sort(() => Math.random() - 0.5);
    e.targets = drawSorted;

    // Track Set clear metrics
    e.setStartTime = performance.now();
    
    // Calculate optimal path distance between sorted targets (Brightest to Dimmest)
    const prioritySorted = [...targets].sort((a, b) => b.val - a.val);
    let optDist = 0;
    let prevX = e.crosshair.x;
    let prevY = e.crosshair.y;
    for (const t of prioritySorted) {
      optDist += Math.hypot(t.x - prevX, t.y - prevY);
      prevX = t.x;
      prevY = t.y;
    }
    e.optimalDistance = optDist;
    e.actualDistance = 0;
    
    e.lastHitTime = performance.now();
  }, []);

  const createExplosion = (x, y, color) => {
    for (let i = 0; i < 15; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 4 + 1;
      engine.current.particles.push({ x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, life: 1.0, color });
    }
  };

  const createHitMarker = (x, y) => {
    engine.current.hitMarkers.push({ x, y, life: 1.0 });
  };

  const startGame = useCallback(async () => {
    if (audioSynth) audioSynth.init(); 

    setIsNewBest(false);
    setScore(0);
    setTimeLeft(DRILL_DURATION);
    setGameState('playing');
    
    engine.current = {
      crosshair: { ...engine.current.crosshair },
      targets: [],
      score: 0,
      timeLeft: DRILL_DURATION,
      successfulHits: 0,
      missedClicks: 0,
      sequenceErrors: 0,
      setsCleared: 0,
      totalActions: 0,
      particles: [],
      hitMarkers: [],
      screenShake: 0,
      
      levelReached: 1,
      optimalDistance: 0,
      actualDistance: 0,
      setStartTime: performance.now(),
      fastestSetClear: 9999,
      lastHitTime: performance.now(),
      acquisitionTimes: [],
      pathEfficiencies: [],
      
      lastCrosshairX: 0,
      lastCrosshairY: 0
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
        spawnTargetSet(canvasRef.current.width, canvasRef.current.height, 0);
      }
    }, 150);
  }, [spawnTargetSet]);

  // === Timer Management ===
  useEffect(() => {
    if (gameState === 'playing' && pointerLocked) {
      timerRef.current = setInterval(() => {
        engine.current.timeLeft -= 1;
        setTimeLeft(engine.current.timeLeft);
        if (engine.current.timeLeft <= 0) {
          clearInterval(timerRef.current);
          endGame();
        }
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [gameState, pointerLocked, endGame]);

  // === Mouse Input and Click Handler ===
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
      
      const ch = engine.current.crosshair;
      const prevX = ch.x;
      const prevY = ch.y;

      ch.x = Math.max(0, Math.min(cvs.width, ch.x + dx));
      ch.y = Math.max(0, Math.min(cvs.height, ch.y + dy));

      engine.current.actualDistance += Math.hypot(ch.x - prevX, ch.y - prevY);
    };

    const handleMouseDown = (e) => {
      if (e.target.tagName === 'BUTTON' || e.target.closest('button')) return;
      if (gameState === 'playing') {
        if (!pointerLocked && canvasRef.current) {
          canvasRef.current.requestPointerLock();
        } else if (pointerLocked) {
          const eRef = engine.current;
          if (eRef.targets.length === 0) return;
          
          eRef.totalActions++;
          const ch = eRef.crosshair;
          
          // Target brightest target (id = 0)
          const requiredTarget = [...eRef.targets].sort((a, b) => b.val - a.val)[0];
          let hitAnyTarget = null;

          for (let i = eRef.targets.length - 1; i >= 0; i--) {
            const t = eRef.targets[i];
            if (Math.hypot(ch.x - t.x, ch.y - t.y) <= t.radius + 6) {
              hitAnyTarget = t;
              break;
            }
          }

          if (hitAnyTarget) {
            if (hitAnyTarget.id === requiredTarget.id) {
              // CORRECT TARGET HIT
              eRef.targets = eRef.targets.filter(t => t.id !== hitAnyTarget.id);
              eRef.successfulHits++;
              eRef.score += 20; // +20 points correct hit
              
              // Speed timing
              const speed = (performance.now() - eRef.lastHitTime) / 1000;
              eRef.acquisitionTimes.push(speed);
              eRef.lastHitTime = performance.now();

              if (eRef.targets.length === 0) {
                // SET FULLY CLEARED
                eRef.setsCleared++;
                eRef.score += 100; // +100 points clear
                eRef.timeLeft = Math.min(60, eRef.timeLeft + 2.0); // +2s Time Clear
                
                // Track fastest clear
                const setDuration = (performance.now() - eRef.setStartTime) / 1000;
                eRef.fastestSetClear = Math.min(eRef.fastestSetClear, setDuration);
                
                // Track path efficiency
                const eff = eRef.optimalDistance / Math.max(eRef.optimalDistance, eRef.actualDistance) * 100;
                eRef.pathEfficiencies.push(eff);

                if (audioSynth) audioSynth.playSetClear();
                
                setTimeout(() => {
                  if (gameState === 'playing' && canvasRef.current) {
                    spawnTargetSet(canvasRef.current.width, canvasRef.current.height, eRef.score);
                  }
                }, 150);
              } else {
                if (audioSynth) audioSynth.playPop();
              }
              
              createExplosion(hitAnyTarget.x, hitAnyTarget.y, '#00ff88');
              createHitMarker(ch.x, ch.y);
              setScore(eRef.score);
              setTimeLeft(eRef.timeLeft);
            } else {
              // SEQUENCE ERROR (Wrong order)
              eRef.sequenceErrors++;
              eRef.timeLeft -= 2.0; // -2s penalty
              eRef.screenShake = 15;
              eRef.lastHitTime = performance.now(); // reset timing anchor

              if (audioSynth) audioSynth.playThud();
              setScore(eRef.score);
              
              if (eRef.timeLeft <= 0) {
                eRef.timeLeft = 0;
                setTimeLeft(0);
                endGame();
                return;
              }
              setTimeLeft(eRef.timeLeft);
              
              setFlashBg('red');
              setTimeout(() => setFlashBg(null), 100);
            }
          } else {
            // MISS CANVAS
            eRef.missedClicks++;
            eRef.timeLeft -= 2.0; // -2s penalty
            eRef.screenShake = 8;
            
            if (audioSynth) audioSynth.playThud();
            setScore(eRef.score);
            
            if (eRef.timeLeft <= 0) {
              eRef.timeLeft = 0;
              setTimeLeft(0);
              endGame();
              return;
            }
            setTimeLeft(eRef.timeLeft);
            
            setFlashBg('red');
            setTimeout(() => setFlashBg(null), 100);
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
  }, [gameState, pointerLocked, universalSens, spawnTargetSet, endGame]);

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

  // === Loop Renderer ===
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
          if (gameState === 'start' && engine.current.targets.length === 0) {
            spawnTargetSet(width, height, 0);
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

      ctx.save();
      
      // Screen Shake
      if (e.screenShake > 0) {
        const sx = (Math.random() - 0.5) * e.screenShake;
        const sy = (Math.random() - 0.5) * e.screenShake;
        ctx.translate(sx, sy);
        e.screenShake *= 0.85;
        if (e.screenShake < 0.5) e.screenShake = 0;
      }

      ctx.fillStyle = '#05060b';
      ctx.fillRect(0, 0, cvs.width, cvs.height);

      // Render grid lines
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.03)';
      ctx.lineWidth = 1; 
      for(let i = 0; i < cvs.width; i+= 60) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, cvs.height); ctx.stroke(); }
      for(let j = 0; j < cvs.height; j+= 60) { ctx.beginPath(); ctx.moveTo(0, j); ctx.lineTo(cvs.width, j); ctx.stroke(); }

      // Draw Targets
      if (gameState === 'playing' || gameState === 'start') {
        // Highlight brightest target at Level 1/2 to assist visual sorting
        const sorted = [...e.targets].sort((a, b) => b.val - a.val);
        const brightestId = sorted.length > 0 ? sorted[0].id : -1;

        e.targets.forEach((t) => {
          const isBrightest = t.id === brightestId && gameState === 'playing';
          
          ctx.save();
          ctx.shadowBlur = isBrightest ? 18 : 8;
          ctx.shadowColor = isBrightest ? '#f59e0b' : `rgba(245, 158, 11, ${t.val})`;
          
          ctx.fillStyle = `rgba(245, 158, 11, ${t.val})`;
          ctx.beginPath();
          ctx.arc(t.x, t.y, t.radius, 0, Math.PI * 2);
          ctx.fill();
          
          ctx.strokeStyle = isBrightest ? '#ffffff' : `rgba(255, 255, 255, ${t.val * 0.35})`;
          ctx.lineWidth = isBrightest ? 2.5 : 1.5;
          ctx.beginPath();
          ctx.arc(t.x, t.y, t.radius + 6, 0, Math.PI * 2);
          ctx.stroke();
          ctx.restore();
        });
      }

      // Render Particles
      for (let i = e.particles.length - 1; i >= 0; i--) {
        const p = e.particles[i];
        p.x += p.vx; p.y += p.vy; p.life -= dt * 2.5;
        if (p.life <= 0) { e.particles.splice(i, 1); continue; }
        ctx.globalAlpha = p.life; ctx.fillStyle = p.color; ctx.fillRect(p.x, p.y, 3, 3);
      }
      
      // Render Hit Markers
      ctx.lineWidth = 2.0;
      for (let i = e.hitMarkers.length - 1; i >= 0; i--) {
        const hm = e.hitMarkers[i];
        hm.life -= dt * 4.5;
        if (hm.life <= 0) { e.hitMarkers.splice(i, 1); continue; }
        ctx.globalAlpha = hm.life; ctx.strokeStyle = '#ffffff';
        const s = 6 + (1 - hm.life) * 8;
        ctx.beginPath();
        ctx.moveTo(hm.x - s, hm.y - s); ctx.lineTo(hm.x + s, hm.y + s);
        ctx.moveTo(hm.x + s, hm.y - s); ctx.lineTo(hm.x - s, hm.y + s);
        ctx.stroke();
      }
      ctx.globalAlpha = 1.0;

      // Draw Crosshair
      const ch = e.crosshair;
      if (ch.initialized && (gameState === 'playing' || gameState === 'start')) {
        const activeColor = pointerLocked ? '#f59e0b' : '#3b82f6';
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
      animationRef.current = requestAnimationFrame(loop);
    };

    animationRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animationRef.current);
      resizeObserver.disconnect();
    };
  }, [gameState, pointerLocked]);

  const shareScore = useCallback(async () => {
    const text = `🎯 I scored ${score} PTS (Level ${analytics.levelReached}) on Target Acquisition Trainer! Accuracy: ${analytics.accuracy}%, Path Eff: ${analytics.pathEfficiency}%. Practice threat assessment at skilldrills.online!`;
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({ title: 'My Target Acquisition Score', text, url: 'https://skilldrills.online/drills/fps' });
      } catch (e) {}
    } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      alert('Score card copied to clipboard!');
    }
  }, [score, analytics]);

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
                <li><Link href="/drills/fps" className="hover:text-gray-300">FPS</Link></li>
                <li><ChevronRight className="w-4 h-4 text-gray-600" /></li>
                <li className="text-amber-400 font-medium">Target Acquisition Trainer</li>
              </ol>
            </nav>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl shadow-[0_0_20px_rgba(245,158,11,0.3)]">
                  <Target className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Target Acquisition Trainer – FPS Strafe Drill</h1>
                  <p className="text-sm text-gray-400 mt-1 font-medium">Desktop Exclusive • Threat Sorting Practice</p>
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
            <StatCard icon={<Trophy className="text-amber-400" />} value={score} label="Score" />
            <StatCard icon={<TrendingUp className="text-fuchsia-400" />} value={`Lv. ${analytics.levelReached || (gameState === 'playing' ? engine.current.levelReached : 1)}`} label="Level" />
            <StatCard icon={<CheckCircle2 className="text-green-500" />} value={analytics.setsCleared || (gameState === 'playing' ? engine.current.setsCleared : 0)} label="Sets Cleared" />
            <StatCard icon={<Timer className={timeLeft <= 10 ? 'text-red-400 animate-pulse' : 'text-green-400'} />} value={timeLeft} label="Time" unit="s" />
            <StatCard icon={<Info className="text-blue-400" />} value={`${universalSens.toFixed(2)}x`} label="Sens" />
          </div>
        )}

        {/* Engine viewport */}
        <div 
          ref={containerRef} 
          className={`relative overflow-hidden transition-colors outline-none bg-[#05060b] ${
            isFullscreen ? 'w-full h-full' : 'w-full aspect-video min-h-[500px] rounded-2xl border border-gray-800 shadow-2xl'
          }`}
          style={{ backgroundColor: flashBg === 'red' ? '#450a0a' : '#05060b' }}
        >
          {gameState === 'playing' && (
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gray-900 z-[60]">
              <div 
                className={`h-full transition-all duration-100 ease-linear ${timeLeft <= 10 ? 'bg-red-500 animate-pulse' : 'bg-amber-500'}`}
                style={{ width: `${(timeLeft / DRILL_DURATION) * 100}%` }} 
              />
            </div>
          )}

          {isFullscreen && gameState === 'playing' && (
            <>
              <div className="absolute top-6 left-6 z-[60] flex flex-col gap-2 pointer-events-none">
                <div className="bg-black/40 backdrop-blur border border-gray-800 px-4 py-2 rounded-xl flex items-center gap-4">
                  <div className="text-center">
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Score</p>
                    <p className="text-2xl font-black text-white leading-none">{score}</p>
                  </div>
                  <div className="w-px h-8 bg-gray-800"></div>
                  <div className="text-center">
                    <p className="text-[10px] text-amber-400 font-bold uppercase tracking-widest">Level</p>
                    <p className="text-2xl font-black text-amber-400 leading-none">{engine.current.levelReached}</p>
                  </div>
                </div>
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
                <AlertCircle className="w-12 h-12 text-amber-500 mx-auto mb-4" />
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
                  Target Acquisition Pro
                </h2>
                <p className="text-xs text-slate-500 uppercase tracking-widest mb-6">
                  Adaptive Cognitive Sorting • Raw Input
                </p>

                <div className="grid grid-cols-2 gap-3 mb-6 text-left">
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Objective</span>
                    <span className="text-sm font-black text-white">Threat Sorting</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Reward</span>
                    <span className="text-sm font-black text-green-400">+20 PTS & Set Bonus</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Penalty</span>
                    <span className="text-sm font-black text-red-400">-2s Time Penalty</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Mechanic</span>
                    <span className="text-sm font-black text-blue-400">Luminance Sorting</span>
                  </div>
                </div>

                <div className="bg-[#0b0f19] border border-slate-850 p-4 rounded-xl mb-4 text-left text-xs text-slate-400">
                  <span className="text-xs font-bold text-white block uppercase mb-1 flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-amber-500" /> What this trains
                  </span>
                  <ul className="list-disc pl-4 space-y-1 text-[10px] text-slate-500 leading-relaxed">
                    <li>Target prioritization order based on threat evaluation</li>
                    <li>Foveal scanning speed & visual discrimination</li>
                    <li>Optimal movement pathing efficiency</li>
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
                  className="w-full py-3 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg uppercase tracking-widest transition-all duration-200 active:scale-95"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  Begin Acquisition Drill
                </button>
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
                  Peak Level: Level {analytics.levelReached}
                </p>

                <div className="grid grid-cols-3 gap-2.5 mb-6 text-left">
                  <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
                    <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Final Score</span>
                    <span className="text-base font-black text-white">{score}</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
                    <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Accuracy</span>
                    <span className="text-base font-black text-white">{analytics.accuracy}%</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
                    <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Path Efficiency</span>
                    <span className="text-base font-black text-white">{analytics.pathEfficiency}%</span>
                  </div>
                  
                  <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
                    <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Correct Hits</span>
                    <span className="text-base font-black text-green-400">{analytics.successfulHits}</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
                    <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Seq Errors</span>
                    <span className="text-base font-black text-orange-400">{analytics.sequenceErrors}</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
                    <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Miss Clicks</span>
                    <span className="text-base font-black text-red-400">{analytics.missedClicks}</span>
                  </div>

                  <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
                    <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Acquisition Speed</span>
                    <span className="text-base font-black text-blue-400">{analytics.avgAcquisitionSpeed}s</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
                    <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Fastest Set</span>
                    <span className="text-base font-black text-indigo-400">{analytics.fastestSetClear}s</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
                    <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Sets Cleared</span>
                    <span className="text-base font-black text-teal-400">{analytics.setsCleared}</span>
                  </div>
                </div>

                <div className="bg-[#0b0f19] border border-slate-850 p-3 rounded-xl mb-4 text-left">
                  <span className={`text-xs font-black block text-center uppercase tracking-widest ${analytics.rankData.color} mb-2`}>
                    Rank: {analytics.rankData.rank}
                  </span>
                  <div className="w-full h-px bg-slate-850 mb-2"></div>
                  <div className="flex items-center gap-1.5 text-[9px] font-bold text-white uppercase mb-1">
                    <Sparkles className="w-3 h-3 text-yellow-500" /> Diagnostics advice:
                  </div>
                  <p className="text-[10px] text-slate-400 leading-normal">
                    {analytics.coachAdvice}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={startGame}
                    className="flex-1 py-3 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg uppercase tracking-widest transition-all duration-200 active:scale-95"
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

        {/* Rules Section */}
        {!isFullscreen && (
          <section className="mt-10">
            <div className="rounded-2xl border border-gray-800 overflow-hidden bg-gray-900 shadow-2xl pointer-events-none">
              <div className="px-6 py-5 border-b border-gray-800 bg-black/40 flex items-center gap-3">
                <Info className="w-5 h-5 text-amber-400" /><h2 className="font-bold text-white text-lg tracking-wide">Difficulty & Target Rules</h2>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-5">
                  <RuleItem num="1" color="green" text="Correct Target" highlight="+20 PTS" result="Luminance Sorting Order" />
                  <RuleItem num="2" color="orange" text="Set Cleared" highlight="+100 PTS | +2s Time" result="All Active Targets" />
                </div>
                <div className="space-y-5">
                  <RuleItem num="3" color="fuchsia" text="Adaptive difficulty" highlight="Levels 1-5" result="Shrinking radius & contrast gap" />
                  <RuleItem num="4" color="red" text="Error Penalties" highlight="-2.0s Time Penalty" result="Wrong sequence or background clicks" />
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
                <GraduationCap className="w-5 h-5 text-amber-400" />
                <h2 className="font-bold text-white text-lg tracking-wide">About the Target Acquisition Trainer</h2>
              </div>
              
              <div className="p-8 space-y-8">
                <section>
                  <h2 className="text-xl font-bold text-white mb-3">What Is Target Acquisition?</h2>
                  <p className="text-sm leading-relaxed mb-4">
                    Target acquisition is the neurological and mechanical process of locating, identifying, and aligning your crosshair onto an active threat in a 3D gaming space. It is the critical first phase of aiming that precedes recoil administration, tracking, or shooting. Without rapid acquisition, a player's physical raw mechanical speed is wasted because they spend too much time selecting whom to shoot.
                  </p>
                </section>

                <section className="border-t border-gray-800 pt-6">
                  <h2 className="text-xl font-bold text-white mb-3">Why Target Prioritization Matters In FPS Games</h2>
                  <p className="text-sm leading-relaxed mb-4">
                    In competitive gaming scenarios, players are rarely presented with a single opponent. In multi-enemy situations (such as defending a site in Valorant or executing a push in Apex Legends), shooting targets randomly leads to split damage and failed kills. Threat prioritization is the strategic sorting of targets by proximity, weaponry, and role (e.g. eliminating a high-damage character first) to maximize your chances of winning a gunfight.
                  </p>
                </section>

                <section className="border-t border-gray-800 pt-6">
                  <h2 className="text-xl font-bold text-white mb-3">Target Acquisition vs Target Switching</h2>
                  <p className="text-sm leading-relaxed mb-4">
                    Although they sound similar, they train different pathways:
                  </p>
                  <ul className="list-disc pl-5 text-sm space-y-2 mb-4">
                    <li><strong>Target Switching:</strong> Trains the physical speed and deceleration control to quickly transfer your crosshair from target to target. It is primarily mechanical.</li>
                    <li><strong>Target Acquisition:</strong> Trains the cognitive sorting process. It forces your eyes and brain to select the correct target order based on external criteria (such as visual brightness/threat indicators) before the mouse movement begins.</li>
                  </ul>
                </section>

                <section className="border-t border-gray-800 pt-6">
                  <h2 className="text-xl font-bold text-white mb-3">Benefits Of Visual Target Recognition Training</h2>
                  <p className="text-sm leading-relaxed mb-4">
                    Deliberate cognitive aiming drills build spatial awareness and reduce visual sorting lag. Rather than tensing up during hectic engagements, players build automatic scanning patterns. This helps them isolate enemy colors, player shapes, and movement silhouettes instantly within their peripheral vision, decreasing total response delay.
                  </p>
                </section>

                <section className="border-t border-gray-800 pt-6">
                  <h2 className="text-xl font-bold text-white mb-3">How Professional FPS Players Assess Threats</h2>
                  <p className="text-sm leading-relaxed mb-4">
                    Professional esports athletes do not look directly at their crosshairs; they keep their eyes focused on the screen space, allowing their peripheral vision to guide the mouse. Through thousands of hours of conditioning, they prioritize threats automatically. By immediately registering enemy placement, health bars, and weapons, they create a mental path to eliminate targets efficiently.
                  </p>
                </section>

                <section className="border-t border-gray-800 pt-6">
                  <h2 className="text-xl font-bold text-white mb-3">Common Target Selection Mistakes</h2>
                  <ul className="list-disc pl-5 text-sm space-y-2 mb-4">
                    <li><strong>Panic Clicking:</strong> Shooting the closest target immediately without checking if a high-threat target is currently lining up a shot on you.</li>
                    <li><strong>Split Focus:</strong> Changing targets mid-fight before confirming the kill, which leaves multiple enemies alive at low health.</li>
                    <li><strong>Inefficient Pathing:</strong> Taking long, diagonal, or circular mouse paths between targets instead of straight, direct sweeps.</li>
                  </ul>
                </section>

                <section className="border-t border-gray-800 pt-6">
                  <h2 className="text-xl font-bold text-white mb-3">Daily Target Acquisition Practice Routine</h2>
                  <p className="text-sm leading-relaxed mb-4">
                    To integrate target acquisition into your warmup, practice this drill for 10 minutes daily. Focus on maintaining a clean, steady rhythm. Do not rush; build accuracy first. As your cognitive sorting threshold improves, the adaptive levels will automatically scale up your scan speed, transferring directly to competitive matches.
                  </p>
                </section>

                <section className="border-t border-gray-800 pt-6">
                  <h2 className="text-xl font-bold text-white mb-3">How This Drill Improves Cognitive FPS Skills</h2>
                  <p className="text-sm leading-relaxed mb-4">
                    By scaling target sizes down and narrowing brightness differences, this trainer pushes your visual discrimination limits. Level 4 and 5 adaptive thresholds force extreme foveal scanning and broad eye sweeps, building visual-motor reflexes that allow you to locate and eliminate targets cleanly under pressure.
                  </p>
                </section>
              </div>

              <div className="bg-[#0b0f19] border-t border-gray-800 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Lightbulb className="w-6 h-6 text-yellow-400" />
                  <h3 className="text-xl font-bold text-white">Frequently Asked Questions</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FAQItem q="What is target acquisition?" a="Target acquisition is the neurological and mechanical process of locating, identifying, and aligning your crosshair onto an active threat in a 3D gaming space." />
                  <FAQItem q="How does target acquisition improve FPS performance?" a="By training your brain to systematically process enemies instead of spraying randomly, reducing panic and maximizing visual sweep efficiency during complex gunfights." />
                  <FAQItem q="Why is target prioritization important?" a="In multi-enemy scenarios, failing to prioritize threats leads to split focus. Eliminating the highest-threat target first preserves your health pool and wins gunfights." />
                  <FAQItem q="How do professional players identify threats?" a="Pros utilize rapid foveal scanning to assess player proximity, weapon threat levels, and health pools, instantly selecting the most critical target to flick onto." />
                  <FAQItem q="What skills does this drill train?" a="This drill trains visual scanning range, threat discrimination under pressure, luminance sorting, pathing motor efficiency, and cognitive aim coordination." />
                  <FAQItem q="How often should I practice target acquisition?" a="We recommend 10-15 minutes of dedicated daily practice as part of your pre-game warmup routine to build cognitive muscle memory." />
                  <FAQItem q="Can target acquisition improve reaction time?" a="Yes, by conditioning your visual cortex to recognize and filter target states (contrast, outline) faster, reducing processing latency before you physically move your mouse." />
                  <FAQItem q="What is the difference between target acquisition and target switching?" a="Target switching focuses on the raw mechanical flick and transfer speed between targets, while target acquisition tests your cognitive selection ordering and threat prioritization before the mechanical movement begins." />
                </div>
              </div>
            </div>
          </article>
        )}

        {/* Related Drills */}
        {!isFullscreen && (
          <section className="mt-14" aria-label="Explore related aim and response drills">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-5 rounded-full bg-amber-500"></div>
              <h2 className="text-xs font-bold text-white uppercase tracking-widest font-mono">
                Explore Related FPS Drills
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <RelatedCard href="/drills/fps/180-degree-awareness" title="180° Awareness" desc="Situational target acquisition flicks." color="indigo" icon={<SlidersIcon />} />
              <RelatedCard href="/drills/fps/strafe-tracking" title="Strafe Tracking Pro" desc="Unpredictable dynamic tracking pursuit." color="orange" icon={<SlidersIcon />} />
              <RelatedCard href="/drills/fps/recoil-control" title="Recoil Control" desc="Calibrate pulling pattern compensation." color="red" icon={<Activity className="w-4 h-4" />} />
              <RelatedCard href="/drills/fps/flick-shot-training" title="Pro Flick Trainer" desc="Snap to targets in time-attack mode." color="blue" icon={<Crosshair className="w-4 h-4" />} />
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
                    <li><Link href="/drills/motor/hand-eye-coordination/aim-trainer" className="hover:text-amber-400 transition-colors">Aim Trainer Elite</Link></li>
                    <li><Link href="/drills/fps/flick-shot-training" className="hover:text-amber-400 transition-colors">Flick Shot Trainer</Link></li>
                    <li><Link href="/drills/fps" className="text-amber-500 hover:text-amber-400 transition-colors font-bold">All FPS Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Memory</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/memory/working-memory/n-back" className="hover:text-amber-400 transition-colors">3-Back Training</Link></li>
                    <li><Link href="/drills/memory/short-term-memory/color-sequence" className="hover:text-amber-400 transition-colors">Color Sequence</Link></li>
                    <li><Link href="/drills/memory" className="text-amber-500 hover:text-amber-400 transition-colors font-bold">All Memory Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Cognitive</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/cognitive/memory/card-matching" className="hover:text-amber-400 transition-colors">Memory Games</Link></li>
                    <li><Link href="/drills/cognitive/attention/divided-attention" className="hover:text-amber-400 transition-colors">Attention Drills</Link></li>
                    <li><Link href="/drills/cognitive" className="text-amber-500 hover:text-amber-400 transition-colors font-bold">All Cognitive Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">Academic</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/academic/writing-speed/typing-test" className="hover:text-amber-400 transition-colors">Typing Speed Test</Link></li>
                    <li><Link href="/drills/academic/math-speed/mental-math" className="hover:text-amber-400 transition-colors">Mental Math</Link></li>
                    <li><Link href="/drills/academic" className="text-amber-500 hover:text-amber-400 transition-colors font-bold">All Academic Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider">More Sectors</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/visual" className="hover:text-amber-400 transition-colors">Visual</Link></li>
                    <li><Link href="/drills/physical" className="hover:text-amber-400 transition-colors">Physical</Link></li>
                  </ul>
                </div>
              </div>
              
              <div className="border-t border-gray-800 pt-8 text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="w-6 h-6 bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30 rounded-lg flex items-center justify-center">
                    <Target className="w-3.5 h-3.5 text-amber-400" />
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
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  </a>
                  <a href="https://www.instagram.com/skilldrills.online/?__pwa=1" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors p-2.5 bg-gray-900 rounded-full hover:bg-gray-800 shadow-md" title="Instagram">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
                  </a>
                  <a href="https://pinterest.com/skilldrills" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors p-2.5 bg-gray-900 rounded-full hover:bg-gray-800 shadow-md" title="Pinterest">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/></svg>
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
    <div className={`group rounded-xl border ${highlight ? 'border-amber-500/50 bg-amber-500/5' : 'border-gray-800 bg-gray-900/50'} p-2 text-center flex flex-col justify-center h-full transition-all duration-300 hover:scale-[1.03] hover:border-gray-700`}>
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
    indigo: 'bg-indigo-600 text-indigo-300 border-indigo-500', 
    purple: 'bg-purple-600 text-purple-300 border-purple-500',
    fuchsia: 'bg-fuchsia-600 text-fuchsia-300 border-fuchsia-500',
    gray: 'bg-gray-600 text-gray-300 border-gray-500', 
    green: 'bg-green-600 text-green-300 border-green-500',
    red: 'bg-red-600 text-red-300 border-red-500',
    orange: 'bg-orange-600 text-orange-300 border-orange-500'
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
    blue: 'from-blue-500 to-indigo-500',
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

function SlidersIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line><line x1="2" y1="14" x2="6" y2="14"></line><line x1="10" y1="8" x2="14" y2="8"></line><line x1="18" y1="16" x2="22" y2="16"></line></svg>
  );
}