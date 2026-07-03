'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Head from 'next/head';

import { 
  Activity, AlertCircle, ArrowRight, ChevronRight, 
  Clock, Crosshair, GraduationCap, Info, Lightbulb, 
  Maximize2, Minimize2, Play, RefreshCw, Star, Target, 
  TrendingUp, Trophy, Volume2, VolumeX, Zap, 
  Share2, Shield, Users, Sparkles, Sliders, Flame, Timer
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

  playCritical() {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine'; 
      osc.frequency.setValueAtTime(1100, this.ctx.currentTime); 
      osc.frequency.exponentialRampToValueAtTime(700, this.ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.18, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.1);
      osc.connect(gain); gain.connect(this.ctx.destination);
      osc.start(); osc.stop(this.ctx.currentTime + 0.1);
    } catch {}
  }

  playStandard() {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine'; 
      osc.frequency.setValueAtTime(650, this.ctx.currentTime); 
      osc.frequency.exponentialRampToValueAtTime(450, this.ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.1);
      osc.connect(gain); gain.connect(this.ctx.destination);
      osc.start(); osc.stop(this.ctx.currentTime + 0.1);
    } catch {}
  }

  playThud() {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle'; 
      osc.frequency.setValueAtTime(140, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.18);
      osc.connect(gain); gain.connect(this.ctx.destination);
      osc.start(); osc.stop(this.ctx.currentTime + 0.18);
    } catch {}
  }

  playBuzz() {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth'; 
      osc.frequency.setValueAtTime(95, this.ctx.currentTime); 
      gain.gain.setValueAtTime(0.22, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.22);
      osc.connect(gain); gain.connect(this.ctx.destination);
      osc.start(); osc.stop(this.ctx.currentTime + 0.22);
    } catch {}
  }

  setEnabled(status) {
    this.enabled = status;
  }
}

const audioSynth = typeof window !== 'undefined' ? new AudioSynthesizer() : null;

const DRILL_DURATION = 60; // Strict 60-second budget

// ============================================================
// RANK CALCULATION & TELEMETRY
// ============================================================
const calculateRank = (score, accuracy) => {
  if (score >= 4000 && accuracy >= 90) return { rank: 'S+', color: 'text-fuchsia-400' };
  if (score >= 3000 && accuracy >= 85) return { rank: 'S', color: 'text-yellow-400' };
  if (score >= 2000 && accuracy >= 80) return { rank: 'A', color: 'text-green-400' };
  if (score >= 1000 && accuracy >= 70) return { rank: 'B', color: 'text-blue-400' };
  if (score >= 500 && accuracy >= 60) return { rank: 'C', color: 'text-indigo-400' };
  return { rank: 'D', color: 'text-slate-400' };
};

const getPrescribedAdvice = (friendlyFire, expiredReds, misses, wrongPriority) => {
  if (friendlyFire > 2) {
    return "Friendly fire errors detected. Shooting friendly Green targets costs -1.0 seconds. Take an extra microsecond to verify the target's color before pulling the trigger—impulse control is critical.";
  }
  if (expiredReds > 3) {
    return "High Threat (Red) targets are expiring and draining your timer. Keep your eyes active, sweep the board, and prioritize Reds immediately to secure the +0.75s time bonus.";
  }
  if (wrongPriority > 3) {
    return "Priority ordering errors. You shot Yellow targets while Red threats were active. Hitting Yellow when Red is present resets your decision combo. Always eliminate Red targets first.";
  }
  if (misses > 6) {
    return "Visual accuracy is drifting. Clicking empty space drains -0.75 seconds. Ensure your crosshair has fully stopped over the target before firing to avoid wasting time.";
  }
  return "Excellent sorting speed and tactical prioritization! You processed visual clutter efficiently, ignored friendly targets, and cleared high-threat spawns with top efficiency.";
};

// ============================================================
// MAIN CLIENT COMPONENT
// ============================================================
export default function TargetPrioritizationClient() {
  const [gameState, setGameState] = useState('start'); 
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [pointerLocked, setPointerLocked] = useState(false);
  
  const [universalSens, setUniversalSens] = useState(1.0);

  const [uiScore, setUiScore] = useState(0);
  const [uiLevel, setUiLevel] = useState(1);
  const [uiCombo, setUiCombo] = useState(0);
  const [uiTimeLeft, setUiTimeLeft] = useState(DRILL_DURATION);
  const [bestScore, setBestScore] = useState(0);
  const [isNewBest, setIsNewBest] = useState(false);
  const [flashBg, setFlashBg] = useState(null);

  const [analytics, setAnalytics] = useState({
    accuracy: 100, threatRecognitionPct: 0, correctDecisions: 0, wrongDecisions: 0,
    friendlyFireCount: 0, redHits: 0, yellowHits: 0, expiredReds: 0, expiredYellows: 0,
    bestCombo: 0, finalLevel: 1, duration: 0, rankData: null
  });

  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  const pageRef = useRef(null);
  const progressBarRef = useRef(null);
  const lastTimeRef = useRef(DRILL_DURATION);

  const engine = useRef({
    crosshair: { x: 0, y: 0, initialized: false },
    targets: [], 
    score: 0, level: 1, combo: 0, maxCombo: 0, timeLeft: DRILL_DURATION, gameStartTime: 0,
    redHits: 0, yellowHits: 0, friendlyFireCount: 0, missedClicks: 0, wrongPriorityClicks: 0,
    expiredRedCount: 0, expiredYellowCount: 0, totalActions: 0, correctDecisions: 0, wrongDecisions: 0,
    particles: [], hitMarkers: [], floatingTexts: [], screenShake: 0, nextSpawnTime: 0
  });

  const cmPer360 = (30 / universalSens).toFixed(1);

  useEffect(() => {
    try {
      const savedSens = localStorage.getItem('targetPrioritization_sens');
      if (savedSens) setUniversalSens(parseFloat(savedSens));
      const savedBest = localStorage.getItem('targetPrioritization_bestScore');
      if (savedBest) setBestScore(parseInt(savedBest, 10));
    } catch {}
  }, []);

  useEffect(() => {
    if (gameState !== 'playing') {
      try { localStorage.setItem('targetPrioritization_sens', universalSens.toString()); } catch {}
    }
    if (audioSynth) audioSynth.setEnabled(soundEnabled);
  }, [universalSens, gameState, soundEnabled]);

  const endGame = useCallback(() => {
    setGameState('gameOver');
    if (document.pointerLockElement) document.exitPointerLock();
    
    const e = engine.current;
    const totalCorrectHits = e.redHits + e.yellowHits;
    const finalAccuracy = e.totalActions > 0 ? Math.round((totalCorrectHits / e.totalActions) * 100) : 100;
    const spawnedRedsCount = e.redHits + e.expiredRedCount;
    const threatRecognition = spawnedRedsCount > 0 ? Math.round((e.redHits / spawnedRedsCount) * 100) : 100;

    const rank = calculateRank(e.score, finalAccuracy);
    const sessionDuration = Math.round((performance.now() - e.gameStartTime) / 1000);

    setAnalytics({
      accuracy: finalAccuracy, threatRecognitionPct: threatRecognition, correctDecisions: e.correctDecisions,
      wrongDecisions: e.wrongDecisions, friendlyFireCount: e.friendlyFireCount, redHits: e.redHits,
      yellowHits: e.yellowHits, expiredReds: e.expiredRedCount, expiredYellows: e.expiredYellowCount,
      bestCombo: e.maxCombo, finalLevel: e.level, duration: Math.min(60, sessionDuration), rankData: rank
    });

    setUiScore(e.score);
    setBestScore(prev => {
      if (e.score > prev) {
        setIsNewBest(true);
        try { localStorage.setItem('targetPrioritization_bestScore', e.score.toString()); } catch {}
        return e.score;
      }
      return prev;
    });
  }, []);

  const spawnTarget = useCallback((width, height, level) => {
    const pad = 48;
    const rand = Math.random();
    
    let type = 'yellow';
    let radius = 22;
    
    if (level === 1) {
      if (rand < 0.35) { type = 'green'; radius = 24; }
    } else if (level === 2) {
      if (rand < 0.15) { type = 'red'; radius = 18; } 
      else if (rand > 0.65) { type = 'green'; radius = 24; }
    } else if (level === 3) {
      if (rand < 0.25) { type = 'red'; radius = 18; } 
      else if (rand > 0.65) { type = 'green'; radius = 24; }
    } else if (level === 4) {
      if (rand < 0.35) { type = 'red'; radius = 18; } 
      else if (rand > 0.70) { type = 'green'; radius = 24; }
    } else {
      if (rand < 0.45) { type = 'red'; radius = 18; } 
      else if (rand > 0.75) { type = 'green'; radius = 24; }
    }

    const speedLimit = 40 + (level * 8);
    const vx = (Math.random() - 0.5) * speedLimit;
    const vy = (Math.random() - 0.5) * speedLimit;

    return { id: Math.random(), type, x: pad + Math.random() * (width - pad * 2), y: pad + Math.random() * (height - pad * 2), vx, vy, radius, age: 0 };
  }, []);

  const createExplosion = (x, y, color) => {
    for (let i = 0; i < 15; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 4.5 + 1.2;
      engine.current.particles.push({ x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, life: 1.0, color });
    }
  };

  const createHitMarker = (x, y) => {
    engine.current.hitMarkers.push({ x, y, life: 1.0 });
  };

  const startGame = useCallback(async () => {
    if (audioSynth) audioSynth.init();

    setIsNewBest(false);
    setUiScore(0);
    setUiLevel(1);
    setUiCombo(0);
    setUiTimeLeft(DRILL_DURATION);
    lastTimeRef.current = DRILL_DURATION;
    
    setAnalytics({
      accuracy: 100, threatRecognitionPct: 0, correctDecisions: 0, wrongDecisions: 0,
      friendlyFireCount: 0, redHits: 0, yellowHits: 0, expiredReds: 0, expiredYellows: 0,
      bestCombo: 0, finalLevel: 1, duration: 0, rankData: null
    });
    setGameState('playing');

    engine.current = {
      crosshair: { ...engine.current.crosshair }, targets: [], score: 0, level: 1, combo: 0, maxCombo: 0,
      timeLeft: DRILL_DURATION, gameStartTime: performance.now(), redHits: 0, yellowHits: 0, friendlyFireCount: 0,
      missedClicks: 0, wrongPriorityClicks: 0, expiredRedCount: 0, expiredYellowCount: 0, totalActions: 0,
      correctDecisions: 0, wrongDecisions: 0, particles: [], hitMarkers: [], floatingTexts: [], screenShake: 0,
      nextSpawnTime: performance.now() + 400
    };

    try {
      if (containerRef.current && !document.fullscreenElement) {
        await containerRef.current.requestFullscreen().catch(()=>{});
      }
    } catch {}

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

    const handleMouseDown = (e) => {
      if (e.target.tagName === 'BUTTON' || e.target.closest('button')) return;
      if (gameState === 'playing') {
        if (!pointerLocked && canvasRef.current) {
          canvasRef.current.requestPointerLock().catch(()=>{});
        } else if (pointerLocked) {
          
          const eRef = engine.current;
          eRef.totalActions++;
          const ch = eRef.crosshair;
          let clickedTarget = null;

          for (let i = eRef.targets.length - 1; i >= 0; i--) {
            const t = eRef.targets[i];
            const dist = Math.hypot(ch.x - t.x, ch.y - t.y);
            if (dist <= t.radius + 4) {
              clickedTarget = t;
              eRef.targets.splice(i, 1);
              break;
            }
          }

          if (clickedTarget) {
            createHitMarker(ch.x, ch.y);
            const activeRedsOnScreen = eRef.targets.some(t => t.type === 'red');

            if (clickedTarget.type === 'red') {
              eRef.redHits++;
              eRef.correctDecisions++;
              eRef.combo++;
              if (eRef.combo > eRef.maxCombo) eRef.maxCombo = eRef.combo;
              
              let multiplier = 1.0;
              if (eRef.combo >= 20) multiplier = 2.0;
              else if (eRef.combo >= 15) multiplier = 1.5;
              else if (eRef.combo >= 10) multiplier = 1.25;
              else if (eRef.combo >= 5) multiplier = 1.1;

              eRef.score += Math.round(100 * multiplier);
              eRef.timeLeft = Math.min(60, eRef.timeLeft + 0.75); 

              if (audioSynth) audioSynth.playCritical();
              createExplosion(clickedTarget.x, clickedTarget.y, '#ef4444');

            } else if (clickedTarget.type === 'yellow') {
              if (activeRedsOnScreen) {
                eRef.wrongPriorityClicks++;
                eRef.wrongDecisions++;
                eRef.combo = 0; 
                eRef.score += 50; 
                eRef.timeLeft = Math.min(60, eRef.timeLeft + 0.25); 

                if (audioSynth) audioSynth.playBuzz();
                createExplosion(clickedTarget.x, clickedTarget.y, '#eab308');
                
                setFlashBg('red');
                setTimeout(() => setFlashBg(null), 100);

              } else {
                eRef.yellowHits++;
                eRef.correctDecisions++;
                eRef.combo++;
                if (eRef.combo > eRef.maxCombo) eRef.maxCombo = eRef.combo;

                let multiplier = 1.0;
                if (eRef.combo >= 20) multiplier = 2.0;
                else if (eRef.combo >= 15) multiplier = 1.5;
                else if (eRef.combo >= 10) multiplier = 1.25;
                else if (eRef.combo >= 5) multiplier = 1.1;

                eRef.score += Math.round(50 * multiplier);
                eRef.timeLeft = Math.min(60, eRef.timeLeft + 0.25); 

                if (audioSynth) audioSynth.playStandard();
                createExplosion(clickedTarget.x, clickedTarget.y, '#eab308');
              }

            } else if (clickedTarget.type === 'green') {
              eRef.friendlyFireCount++;
              eRef.wrongDecisions++;
              eRef.combo = 0; 
              eRef.timeLeft = Math.max(0, eRef.timeLeft - 1.0); // PENALTY REDUCED TO 1s
              eRef.screenShake = 15;

              if (audioSynth) audioSynth.playBuzz();
              createExplosion(clickedTarget.x, clickedTarget.y, '#22c55e');

              setFlashBg('red');
              setTimeout(() => setFlashBg(null), 100);
            }

            setUiScore(eRef.score);
            setUiCombo(eRef.combo);
            setUiTimeLeft(Math.ceil(eRef.timeLeft));

          } else {
            eRef.missedClicks++;
            eRef.wrongDecisions++;
            eRef.combo = 0; 
            eRef.timeLeft = Math.max(0, eRef.timeLeft - 0.75); 
            eRef.screenShake = 6;

            if (audioSynth) audioSynth.playThud();
            createExplosion(ch.x, ch.y, '#64748b'); 

            setUiCombo(0);
            setUiTimeLeft(Math.ceil(eRef.timeLeft));
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
  }, [gameState, pointerLocked, universalSens]);

  const toggleFullscreen = useCallback(async () => {
    if (!document.fullscreenElement) {
      if (containerRef.current) await containerRef.current.requestFullscreen().catch(()=>{});
    } else {
      await document.exitFullscreen().catch(()=>{});
    }
  }, []);

  const shareDrillLink = useCallback(async () => {
    const text = `🎯 I scored ${uiScore} PTS (Level ${analytics.finalLevel}) on the Target Prioritization Trainer! Accuracy: ${analytics.accuracy}%, Best Combo: ${analytics.bestCombo}x. Practice your threat assessment at skilldrills.online!`;
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({ title: 'My Prioritization Score', text, url: 'https://skilldrills.online/drills/fps/target-prioritization' });
      } catch {}
    } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(text);
        alert('Score card copied to clipboard!');
      } catch {}
    }
  }, [uiScore, analytics]);

  useEffect(() => {
    const fsListener = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', fsListener);
    return () => document.removeEventListener('fullscreenchange', fsListener);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (gameState === 'start' && (e.key === ' ' || e.key === 'Enter')) {
        e.preventDefault();
        startGame();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState, startGame]);

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
          progressBarRef.current.style.width = `${(e.timeLeft / DRILL_DURATION) * 100}%`;
          progressBarRef.current.className = `h-full ${e.timeLeft <= 10 ? 'bg-red-500 animate-pulse' : 'bg-blue-600'}`;
        }

        const intTime = Math.ceil(e.timeLeft);
        if (intTime !== lastTimeRef.current) {
          setUiTimeLeft(intTime);
          lastTimeRef.current = intTime;
        }

        const calculatedLevel = Math.floor(e.score / 1000) + 1;
        if (calculatedLevel !== e.level) {
          e.level = calculatedLevel;
          setUiLevel(e.level);
        }

        const spawnDelay = Math.max(400, 1000 - (e.level - 1) * 110); 
        const maxTargets = Math.min(9, 3 + e.level); 

        if (time >= e.nextSpawnTime && e.targets.length < maxTargets) {
          e.targets.push(spawnTarget(cvs.width, cvs.height, e.level));
          e.nextSpawnTime = time + spawnDelay;
        }

        for (let i = e.targets.length - 1; i >= 0; i--) {
          const t = e.targets[i];
          t.age += deltaTimeMs;

          if (t.type === 'yellow' && t.age >= 1200) {
            t.type = 'red';
            t.age = 0; 
            t.radius = 18;
            if (audioSynth) audioSynth.playBuzz(); 
          }

          if (t.type === 'red' && t.age >= 1200) {
            e.expiredRedCount++;
            e.wrongDecisions++;
            e.combo = 0; 
            e.timeLeft = Math.max(0, e.timeLeft - 1.0); // PENALTY REDUCED TO 1s
            e.screenShake = 14;

            if (audioSynth) audioSynth.playThud();
            createExplosion(t.x, t.y, '#ef4444');

            e.targets.splice(i, 1);
            setUiCombo(0);
            setUiTimeLeft(Math.ceil(e.timeLeft));
            setFlashBg('red');
            setTimeout(() => setFlashBg(null), 100);
            continue;
          }

          if (t.type === 'yellow' && t.age >= 1500 && e.level === 1) { 
            e.expiredYellowCount++;
            e.timeLeft = Math.max(0, e.timeLeft - 0.5); 
            if (audioSynth) audioSynth.playThud();
            e.targets.splice(i, 1);
            setUiTimeLeft(Math.ceil(e.timeLeft));
            continue;
          }

          if (t.type === 'green' && t.age >= 3000) {
            e.targets.splice(i, 1);
            continue;
          }

          t.x += t.vx * dt;
          t.y += t.vy * dt;
          if (t.x - t.radius < 0) {
            t.x = t.radius; t.vx = Math.abs(t.vx);
          } else if (t.x + t.radius > cvs.width) {
            t.x = cvs.width - t.radius; t.vx = -Math.abs(t.vx);
          }
          if (t.y - t.radius < 0) {
            t.y = t.radius; t.vy = Math.abs(t.vy);
          } else if (t.y + t.radius > cvs.height) {
            t.y = cvs.height - t.radius; t.vy = -Math.abs(t.vy);
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

      ctx.fillStyle = '#050508';
      ctx.fillRect(0, 0, cvs.width, cvs.height);

      ctx.strokeStyle = 'rgba(59, 130, 246, 0.025)';
      ctx.lineWidth = 1;
      for (let i = 0; i < cvs.width; i += 50) {
        ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, cvs.height); ctx.stroke();
      }
      for (let j = 0; j < cvs.height; j += 50) {
        ctx.beginPath(); ctx.moveTo(0, j); ctx.lineTo(cvs.width, j); ctx.stroke();
      }

      if (gameState === 'playing' || gameState === 'start') {
        e.targets.forEach((t) => {
          const lifespan = t.type === 'green' ? 3000 : 1200;
          const lifePct = Math.max(0, 1 - (t.age / lifespan));
          const opacity = Math.max(0.35, lifePct);
          const drawRadius = t.radius * Math.max(0.65, lifePct); 

          let colorStr, shadowColor;
          if (t.type === 'red') {
            colorStr = `rgba(239, 68, 68, ${opacity})`;
            shadowColor = '#ef4444';
          } else if (t.type === 'yellow') {
            colorStr = `rgba(234, 179, 8, ${opacity})`;
            shadowColor = '#eab308';
          } else { 
            colorStr = `rgba(34, 197, 94, ${opacity})`;
            shadowColor = '#22c55e';
          }

          ctx.shadowBlur = t.type === 'red' ? 22 : 12;
          ctx.shadowColor = shadowColor;
          ctx.fillStyle = colorStr;

          ctx.beginPath();
          ctx.arc(t.x, t.y, drawRadius, 0, Math.PI * 2);
          ctx.fill();
          
          ctx.shadowBlur = 0;

          ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.45})`;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(t.x, t.y, drawRadius * 0.5, 0, Math.PI * 2);
          ctx.stroke();

          ctx.strokeStyle = t.type === 'red' ? `rgba(239,68,68,${opacity*0.5})` : t.type === 'yellow' ? `rgba(234,179,8,${opacity*0.5})` : `rgba(34,197,94,${opacity*0.5})`;
          ctx.lineWidth = 2.0;
          ctx.beginPath();
          ctx.arc(t.x, t.y, drawRadius + 4, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * lifePct);
          ctx.stroke();
        });
      }

      for (let i = e.particles.length - 1; i >= 0; i--) {
        const p = e.particles[i];
        p.x += p.vx; p.y += p.vy; p.life -= dt * 2.2;
        if (p.life <= 0) { e.particles.splice(i, 1); continue; }
        ctx.globalAlpha = p.life; ctx.fillStyle = p.color; ctx.fillRect(p.x, p.y, 3, 3);
      }
      ctx.globalAlpha = 1.0;

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
        const activeColor = pointerLocked ? '#3b82f6' : '#f59e0b';
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
  }, [gameState, pointerLocked, spawnTarget, endGame]);

  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://skilldrills.online/" },
          { "@type": "ListItem", "position": 2, "name": "FPS Drills", "item": "https://skilldrills.online/drills/fps" },
          { "@type": "ListItem", "position": 3, "name": "Target Prioritization Trainer" }
        ]
      },
      {
        "@type": "WebApplication",
        "name": "Target Prioritization Trainer – Cognitive FPS Decision Making Drill",
        "applicationCategory": "GameApplication",
        "operatingSystem": "Any",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
      },
      {
        "@type": "SoftwareApplication",
        "name": "Target Prioritization Trainer",
        "applicationCategory": "GameApplication",
        "operatingSystem": "Web",
        "description": "Improve your threat assessment speed, visual filtering, distractor suppression, and impulse control for competitive FPS games."
      },
      {
        "@type": "HowTo",
        "name": "How to use the Target Prioritization Trainer",
        "step": [
          { "@type": "HowToStep", "text": "Adjust your Universal Sens to match your game." },
          { "@type": "HowToStep", "text": "Click 'Begin Tactical Drill' to lock your mouse cursor and start." },
          { "@type": "HowToStep", "text": "Prioritize and eliminate High-Threat (Red) targets immediately." },
          { "@type": "HowToStep", "text": "Eliminate Medium-Threat (Yellow) targets before they escalate into Red threats." },
          { "@type": "HowToStep", "text": "Avoid shooting Friendly (Green) targets to prevent time penalties." }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          { "@type": "Question", "name": "What is target prioritization in FPS games?", "acceptedAnswer": { "@type": "Answer", "text": "Target prioritization is the cognitive process of evaluating multiple enemies on screen and deciding which threat to shoot first based on proximity, weapon threat level, and role." } },
          { "@type": "Question", "name": "How do professional FPS players choose targets?", "acceptedAnswer": { "@type": "Answer", "text": "Professional players assess threats instantaneously, prioritizing low-health enemies, immediate headshot threats, active duelists, and high-DPS opponents while ignoring non-threat distractors." } },
          { "@type": "Question", "name": "Why do I shoot the wrong enemy under pressure?", "acceptedAnswer": { "@type": "Answer", "text": "Shooting the wrong enemy is often caused by panic firing or poor visual filtering. Under high adrenaline, the brain defaults to shooting the first movement it detects rather than sorting target threat levels." } },
          { "@type": "Question", "name": "What is threat assessment training?", "acceptedAnswer": { "@type": "Answer", "text": "Threat assessment training uses cognitive drills to condition the brain to identify, rank, and eliminate targets in order of threat level (e.g., Red vs. Yellow) rather than raw visual proximity." } },
          { "@type": "Question", "name": "How can I improve target selection?", "acceptedAnswer": { "@type": "Answer", "text": "You can improve target selection by training with cognitive aim tools that actively punish you for shooting decoys, helping you build impulse control and target confirmation habits." } },
          { "@type": "Question", "name": "What is distractor suppression?", "acceptedAnswer": { "@type": "Answer", "text": "Distractor suppression is the ability to ignore moving visual elements, friendly teammates, or non-threatening details (like decoy targets) to maintain absolute focus on critical targets." } },
          { "@type": "Question", "name": "Can this drill improve decision making?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, this drill forces you to make split-second decisions under time pressure. Repeated practice builds the neural pathways required to make accurate tactical decisions in games." } },
          { "@type": "Question", "name": "Does this help Valorant players?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, Valorant features decoy abilities (like Yoru clones or flashes) and chaotic team fights. Target prioritization training helps you ignore decoys and target the actual threat." } },
          { "@type": "Question", "name": "Does this help CS2 players?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, CS2 requires high target discrimination, especially when holding angles or encountering multiple enemies pushing through choke points." } },
          { "@type": "Question", "name": "Does this help Rainbow Six Siege players?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, Siege features visual clutter, friendly teammates close to enemies, and decoy gadgets. Visual filtering is critical to prevent friendly fire and eliminate threats." } },
          { "@type": "Question", "name": "How often should I train target prioritization?", "acceptedAnswer": { "@type": "Answer", "text": "We recommend practicing target selection for 10 minutes daily during your warm-up routine to build visual discipline and reduce panic-firing habits." } },
          { "@type": "Question", "name": "Is this drill free?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, this Target Prioritization Trainer is 100% free, open-source, and runs directly in your web browser with zero downloads required." } },
          { "@type": "Question", "name": "What skills does this drill improve?", "acceptedAnswer": { "@type": "Answer", "text": "It trains threat assessment, visual filtering, distractor suppression, impulse control, tactical decision making, and target selection under intense cognitive pressure." } },
          { "@type": "Question", "name": "Can cognitive training improve FPS performance?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, mechanical aim is only half the battle. Cognitive training helps you make better decisions, ensuring that your physical aim is directed at the correct target." } },
          { "@type": "Question", "name": "Why is target selection important in competitive shooters?", "acceptedAnswer": { "@type": "Answer", "text": "Even with perfect aim, shooting a friendly teammate or a low-threat target while a high-threat enemy is shooting at you will result in losing the engagement. Target selection ensures you eliminate the most critical threats first." } }
        ]
      }
    ]
  };

  return (
    <div ref={pageRef} className="min-h-screen select-none bg-[#050508] text-white">
      <Head>
        <title>Target Prioritization Trainer – Cognitive FPS Drill</title>
        <meta name="description" content="Improve threat assessment speed, visual filtering, distractor suppression, and tactical decision making for competitive FPS games." />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
      </Head>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header Section */}
        {!isFullscreen && (
          <div className="mb-6">
            <nav className="mb-4">
              <ol className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
                <li><Link href="/" className="hover:text-gray-300">Home</Link></li>
                <li><ChevronRight className="w-4 h-4 text-gray-600" /></li>
                <li><Link href="/drills/fps" className="hover:text-gray-300">FPS</Link></li>
                <li><ChevronRight className="w-4 h-4 text-gray-600" /></li>
                <li className="text-blue-400 font-medium">Target Prioritization</li>
              </ol>
            </nav>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                  <Target className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-black tracking-tight uppercase">
                    Target Prioritization Trainer
                  </h1>
                  <p className="text-xs text-gray-400 mt-1 font-medium uppercase tracking-widest">Cognitive Threat Sorting • Hardware Raw Input</p>
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
          <div className="grid grid-cols-5 gap-2 mb-2">
            <StatCard icon={<Trophy className="text-yellow-400" />} value={uiScore} label="Score" />
            <StatCard icon={<TrendingUp className="text-blue-400" />} value={`Lv. ${uiLevel}`} label="Level" />
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

        {/* Canvas Engine Container */}
        <div 
          ref={containerRef} 
          className={`relative overflow-hidden transition-colors outline-none ${
            isFullscreen ? 'w-full h-full' : 'w-full aspect-video min-h-[500px] rounded-2xl border border-gray-800 shadow-2xl'
          }`}
          style={{ backgroundColor: flashBg === 'red' ? '#3b0712' : '#05060b' }}
        >
          {/* Top Progress bar */}
          {gameState === 'playing' && (
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gray-950 z-[60]">
              <div 
                ref={progressBarRef}
                className="h-full bg-blue-600 transition-all duration-100 ease-linear"
                style={{ width: '100%' }} 
              />
            </div>
          )}

          {/* Fullscreen HUD */}
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
                    <p className="text-[10px] text-blue-400 font-bold uppercase tracking-widest">Level</p>
                    <p className="text-2xl font-black text-blue-400 leading-none">{uiLevel}</p>
                  </div>
                </div>
                
                {uiCombo > 1 && (
                  <div className="bg-black/40 backdrop-blur border border-orange-500/30 px-4 py-2 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-left-4">
                    <Flame className="w-5 h-5 text-orange-500" />
                    <div>
                      <p className="text-[10px] text-orange-400 font-bold uppercase tracking-widest">Combo</p>
                      <p className="text-xl font-black text-white leading-none">{uiCombo}x</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="absolute top-4 right-4 z-[60] flex gap-2">
                <button onClick={() => setSoundEnabled(v => !v)} className="p-3 bg-black/60 border border-gray-700 rounded-xl text-white hover:bg-gray-800 transition-colors">
                  {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                </button>
                <button onClick={toggleFullscreen} className="p-3 bg-black/60 border border-gray-700 rounded-xl text-white hover:bg-gray-800 transition-colors">
                  <Minimize2 className="w-5 h-5" />
                </button>
              </div>
            </>
          )}

          {/* Paused lock overlay */}
          {gameState === 'playing' && !pointerLocked && (
            <div 
              className="absolute inset-0 z-40 bg-black/75 backdrop-blur-sm flex items-center justify-center cursor-pointer"
              onClick={(e) => { 
                e.stopPropagation(); 
                if (canvasRef.current) canvasRef.current.requestPointerLock().catch(()=>{}); 
              }}
            >
              <div className="text-center animate-pulse pointer-events-none">
                <AlertCircle className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                <h2 className="text-3xl font-black text-white tracking-widest uppercase mb-2">Game Paused</h2>
                <p className="text-gray-300 font-medium text-sm">Click anywhere on the screen to lock cursor and resume decision sorting.</p>
              </div>
            </div>
          )}

          {/* Canvas Component */}
          <canvas 
            ref={canvasRef} 
            onClick={() => { if (gameState === 'playing' && !pointerLocked) canvasRef.current?.requestPointerLock().catch(()=>{}); }}
            className={`block absolute top-0 left-0 w-full h-full touch-none z-10 ${gameState === 'playing' ? 'cursor-none' : ''}`} 
          />

          {/* START SCREEN */}
          {gameState === 'start' && (
            <div className="absolute inset-0 bg-[#05070e]/98 flex flex-col items-center justify-center p-6 z-30 select-none overflow-y-auto max-h-[100vh] backdrop-blur-sm">
              <div className="max-w-md w-full text-center animate-in fade-in zoom-in-95 duration-200">
                <h2 className="text-xl font-black text-white uppercase tracking-wider mb-1">
                  Target Prioritization
                </h2>
                <p className="text-xs text-slate-500 uppercase tracking-widest mb-6">
                  Hardware Raw Input • Endless Progression
                </p>

                <div className="grid grid-cols-2 gap-3 mb-6 text-left">
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Objective</span>
                    <span className="text-sm font-black text-white">Eliminate Threats</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Reward</span>
                    <span className="text-sm font-black text-green-400">Reds +100 / Yellows +50</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Penalty</span>
                    <span className="text-sm font-black text-red-400">Miss/Exp: -1.0s</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Mechanic</span>
                    <span className="text-sm font-black text-blue-400">{"Yellow -> Red Escalation"}</span>
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
                  <button
                    onClick={startGame}
                    className="flex-1 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg uppercase tracking-widest transition-all duration-200 active:scale-95"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    Begin Tactical Drill
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {/* GAME OVER SCREEN */}
          {gameState === 'gameOver' && analytics.rankData && (
            <div className="absolute inset-0 bg-[#05070e]/98 flex flex-col items-center justify-center p-6 z-30 select-none overflow-y-auto max-h-[100vh] backdrop-blur-sm">
              <div className="max-w-md w-full text-center animate-in fade-in zoom-in-95 duration-200">
                {isNewBest && (
                  <div className="inline-block bg-yellow-500 text-black text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-3 shadow-[0_0_15px_rgba(234,179,8,0.5)] animate-bounce">
                    ⭐ NEW PERSONAL BEST!
                  </div>
                )}
                
                <h2 className="text-xl font-black text-white uppercase tracking-wider mb-1">
                  Tactical Sorting Complete
                </h2>
                <p className="text-xs text-slate-500 uppercase tracking-widest mb-6">
                  Peak difficulty reached: Level {analytics.finalLevel}
                </p>

                <div className="grid grid-cols-3 gap-3 mb-6 text-left font-mono">
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Final Score</span>
                    <span className="text-lg font-black text-white">{uiScore}</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Accuracy</span>
                    <span className="text-lg font-black text-white">{analytics.accuracy}%</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Assigned Rank</span>
                    <span className={`text-lg font-black ${analytics.rankData.color}`}>
                      Rank {analytics.rankData.rank}
                    </span>
                  </div>
                  
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Correct Dec.</span>
                    <span className="text-lg font-black text-white">{analytics.correctDecisions}</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Errors Made</span>
                    <span className="text-lg font-black text-white">{analytics.wrongDecisions}</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Best Combo</span>
                    <span className="text-lg font-black text-white">{analytics.bestCombo}x</span>
                  </div>

                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Reds Hit/Exp</span>
                    <span className="text-xs font-black text-white truncate block mt-1">
                      {analytics.redHits} / <span className="text-red-400 font-bold">{analytics.expiredReds}</span>
                    </span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Yellows Hit/Exp</span>
                    <span className="text-xs font-black text-white truncate block mt-1">
                      {analytics.yellowHits} / <span className="text-yellow-400 font-bold">{analytics.expiredYellows}</span>
                    </span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Friendly Fire</span>
                    <span className={`text-lg font-black ${analytics.friendlyFireCount > 0 ? 'text-red-400' : 'text-green-400'}`}>
                      {analytics.friendlyFireCount}
                    </span>
                  </div>
                </div>

                <div className="bg-[#0b0f19] border border-slate-850 p-4 rounded-xl mb-6 text-left text-xs text-slate-400">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-white uppercase mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-yellow-500" /> Improvement Suggestion:
                  </div>
                  <p className="leading-relaxed">
                    {getPrescribedAdvice(analytics.friendlyFireCount, analytics.expiredReds, analytics.wrongDecisions - analytics.friendlyFireCount - analytics.expiredReds, analytics.wrongDecisions)}
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
                    onClick={shareDrillLink}
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

        {/* DRILL RULES SUMMARY */}
        {!isFullscreen && (
          <section className="mt-10">
            <div className="rounded-2xl border border-gray-800 overflow-hidden bg-gray-900/60 shadow-2xl pointer-events-none">
              <div className="px-6 py-5 border-b border-gray-800 bg-black/40 flex items-center gap-3">
                <Info className="w-5 h-5 text-blue-400" /><h2 className="font-bold text-white text-lg tracking-wide">Drill Instructions & Rules</h2>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-5">
                  <RuleItem num="1" color="red" text="Primary Target" highlight="Red (+100 PTS)" result="Shoot first if active" />
                  <RuleItem num="2" color="orange" text="Medium Target" highlight="Yellow (+50 PTS)" result="Evolves to Red after 1.2s" />
                </div>
                <div className="space-y-5">
                  <RuleItem num="3" color="green" text="Friendly Unit" highlight="Green (0 PTS)" result="Drains -1.0s if clicked" />
                  <RuleItem num="4" color="blue" text="Decision Combo" highlight="Up to 2.0x Multiplier" result="Resets on friendly/wrong/miss" />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* EDUCATIONAL ABOUT SECTION */}
        {!isFullscreen && (
          <article className="mt-12 text-gray-300">
            <div className="rounded-2xl border border-gray-800 overflow-hidden bg-gray-900 shadow-xl">
              <div className="px-6 py-5 border-b border-gray-800 bg-black/40 flex items-center gap-3">
                <GraduationCap className="w-5 h-5 text-blue-400" />
                <h2 className="font-bold text-white text-lg tracking-wide">About Target Prioritization Training</h2>
              </div>
              
              <div className="p-8 space-y-8">
                <section>
                  <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                    <Crosshair className="w-5 h-5 text-blue-400" /> What Is Target Prioritization?
                  </h3>
                  <p className="text-sm leading-relaxed mb-4">
                    <strong>Target Prioritization</strong> is the cognitive process of evaluating multiple enemies on screen and deciding which threat to shoot first based on proximity, weapon threat level, and role. In fast-paced competitive FPS games, entering a room or site often exposes you to multiple enemies. Choosing the correct target instantly prevents you from being eliminated before securing a return frag.
                  </p>
                </section>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 py-4 border-y border-gray-800/50">
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40 hover:bg-gray-800/50 transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-600/15 flex items-center justify-center border border-blue-500/20"><Users className="w-4 h-4 text-blue-400" /></div>
                      <h4 className="text-sm font-bold text-white">Who Is This For?</h4>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Competitive tactical FPS players in games like <strong>Valorant</strong>, <strong>CS2</strong>, and <strong>Rainbow Six Siege</strong> who struggle with panic-firing under chaos.</p>
                  </div>
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40 hover:bg-gray-800/50 transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-green-600/15 flex items-center justify-center border border-green-500/20"><TrendingUp className="w-4 h-4 text-green-400" /></div>
                      <h4 className="text-sm font-bold text-white">Skills Trained</h4>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Threat assessment speed, visual filtering, distractor suppression, impulse control, tactical decision making, and target selection.</p>
                  </div>
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40 hover:bg-gray-800/50 transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-yellow-600/15 flex items-center justify-center border border-yellow-500/20"><Zap className="w-4 h-4 text-yellow-400" /></div>
                      <h4 className="text-sm font-bold text-white">Cognitive Overload</h4>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Difficulty levels increase the density and overlap of targets, forcing your brain to filter visual distractors and react correctly.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-gray-300 pt-4">
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-bold text-white text-base">Why Players Shoot The Wrong Enemy</h3>
                      <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                        Most incorrect target decisions stem from panic reactions and poor visual filtering. Under high adrenaline, the brain&apos;s default reflex is to flick to the first moving object it registers, ignoring teammate markers, gadgets, or threat hierarchy. Isolating and practicing distractor suppression conditions you to verify the target&apos;s color before pulling the trigger, building muscle memory for target validation.
                      </p>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-bold text-white text-base">How Professional FPS Players Prioritize Targets</h3>
                      <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                        Elite tactical shooters scan visual fields using their peripheral vision while keeping their eyes focused centrally. They categorize targets into immediate threats (enemies looking directly at them or holding high-DPS angles) and secondary threats. Training visual discipline ensures that you ignore low-priority decoys and focus on the exact opponent firing at you.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#0b0f19] border-t border-gray-800 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Lightbulb className="w-6 h-6 text-yellow-400" />
                  <h3 className="text-xl font-bold text-white">Frequently Asked Questions</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FAQItem q="1. What is target prioritization in FPS games?" a="Target prioritization is the cognitive process of evaluating multiple enemies on screen and deciding which threat to shoot first based on proximity, weapon threat level, and role." />
                  <FAQItem q="2. How do professional FPS players choose targets?" a="Professional players assess threats instantaneously, prioritizing low-health enemies, immediate headshot threats, active duelists, and high-DPS opponents while ignoring non-threat distractors." />
                  <FAQItem q="3. Why do I shoot the wrong enemy under pressure?" a="Shooting the wrong enemy is often caused by panic firing or poor visual filtering. Under high adrenaline, the brain defaults to shooting the first movement it detects rather than sorting target threat levels." />
                  <FAQItem q="4. What is threat assessment training?" a="Threat assessment training uses cognitive drills to condition the brain to identify, rank, and eliminate targets in order of threat level (e.g., Red vs. Yellow) rather than raw visual proximity." />
                  <FAQItem q="5. How can I improve target selection?" a="You can improve target selection by training with cognitive aim tools that actively punish you for shooting decoys, helping you build impulse control and target confirmation habits." />
                  <FAQItem q="6. What is distractor suppression?" a="Distractor suppression is the ability to ignore moving visual elements, friendly teammates, or non-threatening details (like decoy targets) to maintain absolute focus on critical targets." />
                  <FAQItem q="7. Can this drill improve decision making?" a="Yes, this drill forces you to make split-second decisions under time pressure. Repeated practice builds the neural pathways required to make accurate tactical decisions in games." />
                  <FAQItem q="8. Does this help Valorant players?" a="Yes, Valorant features decoy abilities (like Yoru clones or flashes) and chaotic team fights. Target prioritization training helps you ignore decoys and target the actual threat." />
                  <FAQItem q="9. Does this help CS2 players?" a="Yes, CS2 requires high target discrimination, especially when holding angles or encountering multiple enemies pushing through choke points." />
                  <FAQItem q="10. Does this help Rainbow Six Siege players?" a="Yes, Siege features visual clutter, friendly teammates close to enemies, and decoy gadgets. Visual filtering is critical to prevent friendly fire and eliminate threats." />
                  <FAQItem q="11. How often should I train target prioritization?" a="We recommend practicing target selection for 10 minutes daily during your warm-up routine to build visual discipline and reduce panic-firing habits." />
                  <FAQItem q="12. Is this drill free?" a="Yes, this Target Prioritization Trainer is 100% free, open-source, and runs directly in your web browser with zero downloads required." />
                  <FAQItem q="13. What skills does this drill improve?" a="It trains threat assessment, visual filtering, distractor suppression, impulse control, tactical decision making, and target selection under intense cognitive pressure." />
                  <FAQItem q="14. Can cognitive training improve FPS performance?" a="Yes, mechanical aim is only half the battle. Cognitive training helps you make better decisions, ensuring that your physical aim is directed at the correct target." />
                  <FAQItem q="15. Why is target selection important in competitive shooters?" a="Even with perfect aim, shooting a friendly teammate or a low-threat target while a high-threat enemy is shooting at you will result in losing the engagement. Target selection ensures you eliminate the most critical threats first." />
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
                Explore Related FPS Drills
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <RelatedCard href="/drills/fps/180-degree-awareness" title="180° Awareness Pro" desc="Peripheral target acquisition response drills." color="orange" icon={<Zap className="w-4 h-4" />} />
              <RelatedCard href="/drills/fps/flick-shot-training" title="Pro Flick Trainer" desc="Snap to targets in time-attack mode." color="blue" icon={<Star className="w-4 h-4" />} />
              <RelatedCard href="/drills/fps/reactive-sphere-tracking" title="Reactive Sphere Tracking" desc="Continuous tracking path micro corrections." color="blue" icon={<Target className="w-4 h-4" />} />
              <RelatedCard href="/drills/fps/micro-correction-precision" title="Micro Flicks" desc="Optimize tight-angle crosshair corrections." color="orange" icon={<Zap className="w-4 h-4" />} />
            </div>
          </section>
        )}

        {/* FOOTER SECTION */}
        {!isFullscreen && (
          <footer className="mt-12 bg-slate-950/40 border border-slate-900 text-slate-500 rounded-xl py-10 px-6 font-mono text-[10px]" role="contentinfo">
            <div className="max-w-7xl mx-auto font-mono text-left">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 mb-8">
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider text-xs">Motor & FPS</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/motor/hand-eye-coordination/aim-trainer" className="hover:text-blue-400 transition-colors">Aim Trainer Elite</Link></li>
                    <li><Link href="/drills/fps/flick-shot-training" className="hover:text-blue-400 transition-colors">Flick Shot Trainer</Link></li>
                    <li><Link href="/drills/fps" className="text-blue-400 hover:text-blue-300 transition-colors font-bold">All FPS Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider text-xs">Memory</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/memory/working-memory/n-back" className="hover:text-blue-400 transition-colors">3-Back Training</Link></li>
                    <li><Link href="/drills/memory/short-term-memory/color-sequence" className="hover:text-blue-400 transition-colors">Color Sequence</Link></li>
                    <li><Link href="/drills/memory" className="text-blue-400 hover:text-blue-300 transition-colors font-bold">All Memory Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider text-xs">Cognitive</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/cognitive/memory/card-matching" className="hover:text-blue-400 transition-colors">Memory Games</Link></li>
                    <li><Link href="/drills/cognitive/attention/divided-attention" className="hover:text-blue-400 transition-colors">Attention Drills</Link></li>
                    <li><Link href="/drills/cognitive" className="text-blue-400 hover:text-blue-300 transition-colors font-bold">All Cognitive Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider text-xs">Academic</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/academic/writing-speed/typing-test" className="hover:text-blue-400 transition-colors">Typing Speed Test</Link></li>
                    <li><Link href="/drills/academic/math-speed/mental-math" className="hover:text-blue-400 transition-colors">Mental Math</Link></li>
                    <li><Link href="/drills/academic" className="text-red-400 hover:text-red-300 transition-colors font-bold">All Academic Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider text-xs">More Sectors</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/visual" className="hover:text-blue-400 transition-colors">Visual</Link></li>
                    <li><Link href="/drills/physical" className="hover:text-blue-400 transition-colors">Physical</Link></li>
                  </ul>
                </div>
              </div>
              
              <div className="border-t border-slate-900 pt-8 text-center font-mono">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="w-6 h-6 bg-gradient-to-br from-blue-500/25 to-indigo-500/25 border border-blue-500/30 rounded-lg flex items-center justify-center">
                    <Crosshair className="w-3.5 h-3.5 text-blue-400" />
                  </div>
                  <span className="text-white font-black tracking-widest text-xs uppercase">SkillDrills</span>
                </div>
                <p className="text-[9px] mb-2">&copy; {new Date().getFullYear()} SkillDrills. All rights reserved.</p>
                <p className="text-[9px] max-w-2xl mx-auto leading-relaxed mb-6 text-slate-650">
                  Open-source telemetry training platform using hardware pointer lock. Free forever. No downloads required.
                </p>
                <div className="flex items-center justify-center gap-3 flex-wrap">
                  <a href="https://youtube.com/@skilldrills.online" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors p-2.5 bg-gray-900 rounded-full hover:bg-gray-805 shadow-md" title="YouTube">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                  </a>
                  <a href="https://www.facebook.com/profile.php?id=61590093843779" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors p-2.5 bg-gray-900 rounded-full hover:bg-gray-805 shadow-md" title="Facebook">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  </a>
                  <a href="https://x.com/skilldrillss" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors p-2.5 bg-gray-900 rounded-full hover:bg-gray-805 shadow-md" title="X / Twitter">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  </a>
                  <a href="https://www.instagram.com/skilldrills.online/?__pwa=1" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors p-2.5 bg-gray-900 rounded-full hover:bg-gray-805 shadow-md" title="Instagram">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
                  </a>
                  <a href="https://pinterest.com/skilldrills" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors p-2.5 bg-gray-900 rounded-full hover:bg-gray-855 shadow-md" title="Pinterest">
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
    <div className={`group rounded-xl border ${
      highlight ? 'border-blue-500/30 bg-blue-500/5 shadow-[inset_0_0_12px_rgba(59,130,246,0.05)]' : 'border-gray-800 bg-gray-900/50'
    } p-2.5 text-center flex flex-col justify-center h-full transition-all duration-300 hover:scale-[1.03] hover:border-gray-700`}>
      <div className="mb-1 flex justify-center transition-transform duration-300 group-hover:scale-110">
        {icon}
      </div>
      <p className="text-sm sm:text-base font-black tracking-tight truncate text-white">
        {value} <span className="text-[10px] font-semibold text-gray-500">{unit}</span>
      </p>
      <p className="text-[9px] font-mono font-bold uppercase tracking-wider text-gray-500 truncate">{label}</p>
    </div>
  );
}

function RuleItem({ num, color, text, highlight = '', result }) {
  const colorMap = { 
    blue: 'bg-blue-600 text-blue-300 border-blue-500', 
    red: 'bg-red-600 text-red-300 border-red-500', 
    orange: 'bg-orange-600 text-orange-300 border-orange-500',
    green: 'bg-green-600 text-green-300 border-green-500' 
  };
  const colors = colorMap[color] || 'bg-gray-600 text-gray-300 border-gray-500';
  const [bg, txt, border] = colors.split(' ');
  
  return (
    <div className="flex items-center gap-4 bg-[#0b0f19]/40 p-4 rounded-xl border border-slate-800 shadow-sm">
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
    <Link href={href} className="group relative overflow-hidden rounded-2xl border border-gray-800 bg-[#0b0f19]/30 transition-all hover:-translate-y-1 hover:border-blue-500/50 block p-5">
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${gradients[color]}`}></div>
      <div className="w-10 h-10 rounded-xl bg-[#050811] border border-gray-700 flex items-center justify-center text-gray-400 group-hover:text-white mb-3 shadow-inner transition-colors">
        {icon}
      </div>
      <h3 className="font-bold text-sm mb-1 text-white group-hover:text-blue-400 transition-colors">{title}</h3>
      <p className="text-[11px] text-gray-500 leading-normal mb-3 line-clamp-2">{desc}</p>
      <div className="flex items-center gap-1.5 text-blue-400 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest">
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