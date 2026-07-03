'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Head from 'next/head';

import { 
  Activity, AlertCircle, ArrowRight, BarChart3, ChevronRight, 
  Clock, Crosshair, Eye, GraduationCap, Info, Lightbulb, 
  Maximize2, Minimize2, Play, RefreshCw, Star, Target, 
  Timer, TrendingUp, Trophy, Volume2, VolumeX, Zap, 
  Share2, CheckCircle2, XCircle, Sparkles, Flame, Award, Sliders,
  Shield, Users
} from 'lucide-react';

const DRILL_DURATION = 60; // Strict 60 seconds

// Level configurations based on Score (scales every 150 points)
const getLevelStats = (score) => {
  const lvl = Math.floor(score / 150) + 1;
  let anchorRadius, microRadius, ttl, minDistance, maxDistance;
  
  if (lvl === 1) {
    anchorRadius = 24;
    microRadius = 10;
    ttl = 1800; 
    minDistance = 60;
    maxDistance = 100;
  } else if (lvl === 2) {
    anchorRadius = 22;
    microRadius = 8;
    ttl = 1500;
    minDistance = 70;
    maxDistance = 120;
  } else if (lvl === 3) {
    anchorRadius = 20;
    microRadius = 7;
    ttl = 1300;
    minDistance = 120; 
    maxDistance = 180;
  } else if (lvl === 4) {
    anchorRadius = 18;
    microRadius = 5.5; 
    ttl = 1000; 
    minDistance = 130;
    maxDistance = 200;
  } else if (lvl === 5) {
    anchorRadius = 16;
    microRadius = 4.5;
    ttl = 800; 
    minDistance = 140;
    maxDistance = 220;
  } else {
    // Level 6+ infinite progression
    const scaleFactor = lvl - 5;
    anchorRadius = Math.max(10, 16 - scaleFactor * 0.5);
    microRadius = Math.max(3.5, 4.5 - scaleFactor * 0.25);
    ttl = Math.max(500, 800 - scaleFactor * 50);
    minDistance = Math.min(200, 140 + scaleFactor * 8);
    maxDistance = Math.min(260, 220 + scaleFactor * 10);
  }
  
  return { lvl, anchorRadius, microRadius, ttl, minDistance, maxDistance };
};

const getGrade = (accuracy, score, levelReached, combo, precision) => {
  if (accuracy >= 90 && score >= 350 && levelReached >= 5 && combo >= 12 && precision >= 85) return 'Professional Micro-Correction Master';
  if (accuracy >= 82 && score >= 250 && levelReached >= 4 && combo >= 8 && precision >= 75) return 'Elite Headshot Hunter';
  if (accuracy >= 72 && score >= 180 && levelReached >= 3 && combo >= 6 && precision >= 65) return 'Precision Specialist';
  if (accuracy >= 60 && score >= 110 && levelReached >= 2 && combo >= 4 && precision >= 50) return 'Accurate Shooter';
  if (accuracy >= 45 && score >= 50 && levelReached >= 1 && combo >= 2 && precision >= 35) return 'Developing Shooter';
  return 'Beginner';
};

const calculateRank = (score, accuracy, rt) => {
  if (score >= 400 && accuracy >= 90 && rt <= 300 && rt > 0) return { rank: 'S+', color: 'text-fuchsia-400' };
  if (score >= 300 && accuracy >= 85 && rt <= 350 && rt > 0) return { rank: 'S', color: 'text-yellow-400' };
  if (score >= 200 && accuracy >= 80 && rt <= 420 && rt > 0) return { rank: 'A', color: 'text-green-400' };
  if (score >= 120 && accuracy >= 70) return { rank: 'B', color: 'text-blue-400' };
  if (score >= 60 && accuracy >= 60) return { rank: 'C', color: 'text-indigo-400' };
  return { rank: 'D', color: 'text-slate-400' };
};

const getSuggestion = (rank, timeouts, missed) => {
  if (rank === 'S+' || rank === 'S') return "Masterful wrist discipline. Your micro correction snaps are elite. Try to raise your Universal Sens slightly to challenge your deceleration boundary.";
  if (timeouts > missed) return "You are timing out on the micro targets. Trust your initial flick and execute the micro-correction faster without overthinking.";
  if (missed > 5) return "Too many missed clicks. Ensure your crosshair has decelerated completely and confirmed target alignment before pulling the trigger.";
  return "Solid precision base. Keep training to scale difficulty level. Rhythmic flick-and-correct pacing will help you break into higher ranks.";
};

export default function MicroCorrectionClient() {
  const [gameState, setGameState] = useState('start'); 
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [pointerLocked, setPointerLocked] = useState(false);
  
  const [universalSens, setUniversalSens] = useState(1.0);

  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [combo, setCombo] = useState(0);
  const [bestCombo, setBestCombo] = useState(0);
  const [level, setLevel] = useState(1);
  const [timeLeft, setTimeLeft] = useState(DRILL_DURATION);
  const [isNewBest, setIsNewBest] = useState(false);
  const [flashBg, setFlashBg] = useState(null);

  const [analytics, setAnalytics] = useState({
    accuracy: 100, successfulCycles: 0, missedAttempts: 0, bestCombo: 0,
    avgCorrectionTime: 0, avgPrecisionScore: 0, microTargetAccuracy: 0,
    levelReached: 1, precisionRating: 'Acceptable Precision', consistencyScore: 0,
    grade: 'Beginner', rankData: null
  });

  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  const audioCtxRef = useRef(null);
  const lastTimeRef = useRef(DRILL_DURATION);
  
  const engine = useRef({
    crosshair: { x: 0, y: 0, initialized: false },
    anchor: { active: false, x: 0, y: 0, radius: 24, age: 0, ttl: 1800 },
    micro: { active: false, x: 0, y: 0, radius: 10, age: 0, ttl: 1800 },
    level: 1, score: 0, timeLeft: DRILL_DURATION,
    totalClicks: 0, successfulHits: 0, missedClicks: 0, missedAttempts: 0, totalCycles: 0,
    combo: 0, bestCombo: 0, precisionScores: [], correctionTimes: [], totalMicroClicks: 0, microHits: 0,
    microSpawnTime: 0, particles: [], popups: []
  });

  const cmPer360 = (30 / universalSens).toFixed(1);

  useEffect(() => {
    try {
      const savedSens = localStorage.getItem('microcorr_sens');
      if (savedSens) setUniversalSens(parseFloat(savedSens));
      const savedBest = localStorage.getItem('microcorr_bestScore');
      if (savedBest) setBestScore(parseInt(savedBest, 10));
    } catch (e) {}
  }, []);

  useEffect(() => {
    if (gameState !== 'playing') {
      try { localStorage.setItem('microcorr_sens', universalSens.toString()); } catch (e) {}
    }
  }, [universalSens, gameState]);

  const playSound = useCallback((type) => {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') ctx.resume();
      
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.connect(g);
      g.connect(ctx.destination);
      const now = ctx.currentTime;
      
      o.type = 'sine';
      
      if (type === 'score') {
        o.frequency.setValueAtTime(987.77, now); 
        o.frequency.exponentialRampToValueAtTime(1318.51, now + 0.05); 
        g.gain.setValueAtTime(0.04, now);
        g.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
        o.start(now); o.stop(now + 0.25);
      } else if (type === 'micro') {
        o.frequency.setValueAtTime(1318.51, now); 
        o.frequency.exponentialRampToValueAtTime(1975.53, now + 0.1); 
        g.gain.setValueAtTime(0.06, now);
        g.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        o.start(now); o.stop(now + 0.35);
      } else if (type === 'combo') {
        o.frequency.setValueAtTime(880.00, now); 
        o.frequency.exponentialRampToValueAtTime(1174.66, now + 0.12); 
        g.gain.setValueAtTime(0.06, now);
        g.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
        o.start(now); o.stop(now + 0.45);
      } else if (type === 'levelUp') {
        o.frequency.setValueAtTime(523.25, now); 
        o.frequency.setValueAtTime(659.25, now + 0.08); 
        o.frequency.setValueAtTime(783.99, now + 0.16); 
        o.frequency.setValueAtTime(1046.50, now + 0.24); 
        g.gain.setValueAtTime(0.07, now);
        g.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
        o.start(now); o.stop(now + 0.5);
      } else if (type === 'fail') {
        o.type = 'triangle';
        o.frequency.setValueAtTime(180, now);
        g.gain.setValueAtTime(0.12, now);
        g.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
        o.start(now); o.stop(now + 0.2);
      } else if (type === 'start') {
        o.frequency.setValueAtTime(783.99, now);
        g.gain.setValueAtTime(0.05, now);
        g.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
        o.start(now); o.stop(now + 0.3);
      }
    } catch(e) {}
  }, [soundEnabled]);

  const spawnAnchor = useCallback((width, height) => {
    const e = engine.current;
    const stats = getLevelStats(e.score);
    const padding = 120;
    
    e.anchor.x = padding + Math.random() * (width - padding * 2);
    e.anchor.y = padding + Math.random() * (height - padding * 2);
    e.anchor.radius = stats.anchorRadius;
    e.anchor.active = true;
    e.anchor.age = 0;
    e.anchor.ttl = stats.ttl;
    e.micro.active = false;
  }, []);

  const spawnMicro = useCallback((anchorX, anchorY, width, height) => {
    const e = engine.current;
    const stats = getLevelStats(e.score);
    const angle = Math.random() * Math.PI * 2;
    const distance = stats.minDistance + Math.random() * (stats.maxDistance - stats.minDistance);
    
    let targetX = anchorX + Math.cos(angle) * distance;
    let targetY = anchorY + Math.sin(angle) * distance;

    const borderPadding = 60;
    targetX = Math.max(borderPadding, Math.min(width - borderPadding, targetX));
    targetY = Math.max(borderPadding, Math.min(height - borderPadding, targetY));

    e.micro.x = targetX;
    e.micro.y = targetY;
    e.micro.radius = stats.microRadius;
    e.micro.active = true;
    e.micro.age = 0;
    e.micro.ttl = stats.ttl;
  }, []);

  const createExplosion = useCallback((x, y, color) => {
    const e = engine.current;
    for (let i = 0; i < 15; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1 + Math.random() * 4;
      e.particles.push({ x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, life: 1.0, color });
    }
  }, []);

  const endGame = useCallback(() => {
    setGameState('gameOver');
    if (document.pointerLockElement) document.exitPointerLock();

    const e = engine.current;
    const finalAccuracy = e.totalClicks > 0 ? Math.round((e.successfulHits / e.totalClicks) * 100) : 100;
    const avgPrecision = e.precisionScores.length > 0 ? Math.round(e.precisionScores.reduce((a, b) => a + b, 0) / e.precisionScores.length) : 0;
    const microAcc = e.totalMicroClicks > 0 ? Math.round((e.microHits / e.totalMicroClicks) * 100) : 0;
    const avgCorrection = e.correctionTimes.length > 0 ? Math.round(e.correctionTimes.reduce((a, b) => a + b, 0) / e.correctionTimes.length) : 0;

    let consistency = 100;
    if (e.correctionTimes.length > 1) {
      const mean = e.correctionTimes.reduce((a, b) => a + b, 0) / e.correctionTimes.length;
      const variance = e.correctionTimes.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / e.correctionTimes.length;
      const stdDev = Math.sqrt(variance);
      consistency = Math.max(10, Math.min(100, Math.round(100 - stdDev * 0.15)));
    }

    const precisionRating = avgPrecision >= 85 ? 'Elite Precision' : avgPrecision >= 70 ? 'Good Precision' : 'Acceptable Precision';
    const levelReached = Math.floor(e.score / 150) + 1;
    const grade = getGrade(finalAccuracy, e.score, levelReached, e.bestCombo, avgPrecision);
    const rank = calculateRank(e.score, finalAccuracy, avgCorrection);

    setAccuracy(finalAccuracy);
    setAnalytics({
      accuracy: finalAccuracy, successfulCycles: e.totalCycles, missedAttempts: e.missedAttempts, bestCombo: e.bestCombo,
      avgCorrectionTime: avgCorrection, avgPrecisionScore: avgPrecision, microTargetAccuracy: microAcc,
      levelReached: levelReached, precisionRating: precisionRating, consistencyScore: consistency, grade: grade, rankData: rank
    });

    setBestScore(prev => {
      if (e.score > prev) {
        setIsNewBest(true);
        try { localStorage.setItem('microcorr_bestScore', e.score.toString()); } catch(err){}
        return e.score;
      }
      return prev;
    });
  }, []);

  const startGame = useCallback(() => {
    setIsNewBest(false);
    setScore(0);
    setCombo(0);
    setAccuracy(100);
    setBestCombo(0);
    setLevel(1);
    setTimeLeft(DRILL_DURATION);
    lastTimeRef.current = DRILL_DURATION;
    setGameState('playing');
    playSound('start');

    engine.current = {
      crosshair: { ...engine.current.crosshair },
      anchor: { active: false, x: 0, y: 0, radius: 24, age: 0, ttl: 1800 },
      micro: { active: false, x: 0, y: 0, radius: 10, age: 0, ttl: 1800 },
      level: 1, score: 0, timeLeft: DRILL_DURATION,
      totalClicks: 0, successfulHits: 0, missedClicks: 0, missedAttempts: 0, totalCycles: 0,
      combo: 0, bestCombo: 0, precisionScores: [], correctionTimes: [], totalMicroClicks: 0, microHits: 0,
      microSpawnTime: 0, particles: []
    };

    if (containerRef.current && !document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(()=>{});
    }
    setTimeout(() => {
      if (canvasRef.current && !document.pointerLockElement) {
        canvasRef.current.requestPointerLock().catch(()=>{});
      }
    }, 150);
  }, [playSound]);

  useEffect(() => {
    const handlePointerLockChange = () => setPointerLocked(document.pointerLockElement === canvasRef.current);
    document.addEventListener('pointerlockchange', handlePointerLockChange);
    return () => document.removeEventListener('pointerlockchange', handlePointerLockChange);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (gameState !== 'playing' || !pointerLocked || !canvasRef.current) return;
      const ch = engine.current.crosshair;
      const sens = universalSens * 0.8;
      ch.x = Math.max(0, Math.min(canvasRef.current.width, ch.x + e.movementX * sens));
      ch.y = Math.max(0, Math.min(canvasRef.current.height, ch.y + e.movementY * sens));
    };

    const handleMouseDown = (e) => {
      if (e.target.tagName === 'BUTTON' || e.target.closest('button')) return;
      if (gameState !== 'playing') return;
      if (!pointerLocked) {
        if (canvasRef.current) canvasRef.current.requestPointerLock();
        return;
      }

      const eRef = engine.current;
      const ch = eRef.crosshair;
      eRef.totalClicks++;
      const oldStats = getLevelStats(eRef.score);

      if (eRef.anchor.active) {
        const dist = Math.hypot(ch.x - eRef.anchor.x, ch.y - eRef.anchor.y);
        if (dist <= eRef.anchor.radius + 8) {
          eRef.anchor.active = false;
          eRef.successfulHits++;
          eRef.score += 10;
          setScore(eRef.score);
          playSound('score');
          createExplosion(eRef.anchor.x, eRef.anchor.y, '#00ff88');

          spawnMicro(eRef.anchor.x, eRef.anchor.y, canvasRef.current.width, canvasRef.current.height);
          eRef.microSpawnTime = performance.now();
        } else {
          eRef.missedClicks++;
          eRef.missedAttempts++;
          eRef.timeLeft = Math.max(0, eRef.timeLeft - 0.5);
          eRef.combo = 0;
          setCombo(0);
          playSound('fail');
          setFlashBg('red');
          setTimeout(() => setFlashBg(null), 100);
        }
      } 
      else if (eRef.micro.active) {
        eRef.totalMicroClicks++;
        const dist = Math.hypot(ch.x - eRef.micro.x, ch.y - eRef.micro.y);
        if (dist <= eRef.micro.radius + 8) {
          eRef.micro.active = false;
          eRef.successfulHits++;
          eRef.microHits++;
          eRef.totalCycles++;
          
          const ratio = dist / eRef.micro.radius;
          const precisionScore = Math.max(0, Math.min(100, Math.round((1 - ratio) * 100)));
          eRef.precisionScores.push(precisionScore);
          
          let pts = 15; 
          let precColor = '#60a5fa'; 
          
          if (ratio <= 0.15) { pts = 30; precColor = '#00ff88'; } 
          else if (ratio <= 0.45) { pts = 20; precColor = '#eab308'; }
          
          eRef.score += pts;
          eRef.timeLeft = Math.min(DRILL_DURATION, eRef.timeLeft + 1.0);
          setScore(eRef.score);
          playSound('micro');
          createExplosion(eRef.micro.x, eRef.micro.y, precColor);

          const correctionTime = performance.now() - eRef.microSpawnTime;
          eRef.correctionTimes.push(correctionTime);

          eRef.combo++;
          if (eRef.combo > eRef.bestCombo) eRef.bestCombo = eRef.combo;
          setCombo(eRef.combo);

          if (eRef.combo === 5) { eRef.score += 25; setScore(eRef.score); playSound('combo'); } 
          else if (eRef.combo === 10) { eRef.score += 50; setScore(eRef.score); playSound('combo'); } 
          else if (eRef.combo === 20) { eRef.score += 100; setScore(eRef.score); playSound('combo'); } 
          else if (eRef.combo === 30) { eRef.score += 200; setScore(eRef.score); playSound('combo'); }

          const nextStats = getLevelStats(eRef.score);
          if (nextStats.lvl > oldStats.lvl) playSound('levelUp');

          spawnAnchor(canvasRef.current.width, canvasRef.current.height);
        } else {
          eRef.missedClicks++;
          eRef.missedAttempts++;
          eRef.timeLeft = Math.max(0, eRef.timeLeft - 0.5);
          eRef.combo = 0;
          setCombo(0);
          playSound('fail');
          setFlashBg('red');
          setTimeout(() => setFlashBg(null), 100);
        }
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, [gameState, pointerLocked, universalSens, spawnMicro, spawnAnchor, createExplosion, playSound]);

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
      const dtMs = time - lastTime;
      lastTime = time;
      const dt = Math.min(dtMs / 1000, 0.1);
      const e = engine.current;

      const stats = getLevelStats(e.score);
      e.level = stats.lvl;

      if (gameState === 'playing' && pointerLocked) {
        if (e.timeLeft > 0) e.timeLeft -= dt;
        if (e.timeLeft <= 0) {
          e.timeLeft = 0;
          setTimeLeft(0);
          endGame();
          return; 
        }

        const intTime = Math.ceil(e.timeLeft);
        if (intTime !== lastTimeRef.current) {
            setTimeLeft(intTime);
            lastTimeRef.current = intTime;
        }

        setLevel(stats.lvl);

        if (!e.anchor.active && !e.micro.active) spawnAnchor(cvs.width, cvs.height);

        if (e.anchor.active) {
          e.anchor.age += dtMs;
          if (e.anchor.age >= e.anchor.ttl) {
            e.anchor.active = false;
            e.missedAttempts++;
            e.timeLeft = Math.max(0, e.timeLeft - 0.5);
            e.combo = 0;
            setCombo(0);
            playSound('fail');
            createExplosion(e.anchor.x, e.anchor.y, '#f87171');
            spawnAnchor(cvs.width, cvs.height);
          }
        }

        if (e.micro.active) {
          e.micro.age += dtMs;
          if (e.micro.age >= e.micro.ttl) {
            e.micro.active = false;
            e.missedAttempts++;
            e.timeLeft = Math.max(0, e.timeLeft - 0.5);
            e.combo = 0;
            setCombo(0);
            playSound('fail');
            createExplosion(e.micro.x, e.micro.y, '#f87171');
            spawnAnchor(cvs.width, cvs.height); 
          }
        }

        if (e.totalClicks % 10 === 0 && e.totalClicks > 0) {
          setAccuracy(Math.round((e.successfulHits / e.totalClicks) * 100));
        }
      }

      ctx.fillStyle = '#050508';
      ctx.fillRect(0, 0, cvs.width, cvs.height);

      ctx.strokeStyle = 'rgba(56, 189, 248, 0.03)';
      ctx.lineWidth = 1;
      for (let i = 0; i < cvs.width; i += 60) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, cvs.height); ctx.stroke(); }
      for (let j = 0; j < cvs.height; j += 60) { ctx.beginPath(); ctx.moveTo(0, j); ctx.lineTo(cvs.width, j); ctx.stroke(); }

      if (e.anchor.active && gameState === 'playing') {
        const anchorLife = 1 - Math.min(1, e.anchor.age / e.anchor.ttl);
        ctx.save();
        ctx.shadowBlur = 15;
        ctx.shadowColor = '#00ff88';
        ctx.fillStyle = `rgba(0, 255, 136, ${0.4 + (anchorLife * 0.6)})`;
        ctx.beginPath(); ctx.arc(e.anchor.x, e.anchor.y, e.anchor.radius, 0, Math.PI * 2); ctx.fill();

        ctx.strokeStyle = anchorLife > 0.4 ? '#00ff88' : '#ef4444';
        ctx.lineWidth = 2.5;
        ctx.beginPath(); ctx.arc(e.anchor.x, e.anchor.y, e.anchor.radius + 5 + anchorLife * 12, 0, Math.PI * 2); ctx.stroke();
        ctx.restore();
      }

      if (e.micro.active && gameState === 'playing') {
        const microLife = 1 - Math.min(1, e.micro.age / e.micro.ttl);
        ctx.save();
        ctx.shadowBlur = 18;
        ctx.shadowColor = '#38bdf8';
        ctx.fillStyle = `rgba(56, 189, 248, ${0.5 + (microLife * 0.5)})`;
        ctx.beginPath(); ctx.arc(e.micro.x, e.micro.y, e.micro.radius, 0, Math.PI * 2); ctx.fill();

        ctx.strokeStyle = microLife > 0.4 ? '#38bdf8' : '#ef4444';
        ctx.lineWidth = 2;
        ctx.beginPath(); ctx.arc(e.micro.x, e.micro.y, e.micro.radius + 3 + microLife * 8, 0, Math.PI * 2); ctx.stroke();
        ctx.restore();
      }

      for (let i = e.particles.length - 1; i >= 0; i--) {
        const p = e.particles[i];
        p.x += p.vx; p.y += p.vy; p.life -= dt * 2.5;
        if (p.life <= 0) { e.particles.splice(i, 1); continue; }
        ctx.globalAlpha = p.life; ctx.fillStyle = p.color; ctx.fillRect(p.x, p.y, 3, 3);
      }
      ctx.globalAlpha = 1.0;

      const ch = e.crosshair;
      if (ch.initialized && (gameState === 'playing' || gameState === 'start')) {
        const activeColor = pointerLocked ? '#38bdf8' : '#eab308';
        ctx.fillStyle = activeColor;
        ctx.strokeStyle = activeColor;
        
        ctx.lineWidth = 2;
        ctx.beginPath(); ctx.arc(ch.x, ch.y, 14, 0, Math.PI * 2); ctx.stroke();
        
        const gap = 4;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(ch.x, ch.y - 14); ctx.lineTo(ch.x, ch.y - gap);
        ctx.moveTo(ch.x, ch.y + 14); ctx.lineTo(ch.x, ch.y + gap);
        ctx.moveTo(ch.x - 14, ch.y); ctx.lineTo(ch.x - gap, ch.y);
        ctx.moveTo(ch.x + 14, ch.y); ctx.lineTo(ch.x + gap, ch.y);
        ctx.stroke();

        ctx.beginPath(); ctx.arc(ch.x, ch.y, 1.5, 0, Math.PI * 2); ctx.fill();
      }

      animationRef.current = requestAnimationFrame(loop);
    };

    animationRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animationRef.current);
      resizeObserver.disconnect();
    };
  }, [gameState, pointerLocked, spawnAnchor, spawnMicro, createExplosion, playSound, endGame]);

  const shareDrillLink = useCallback(() => {
    const text = `🎯 I scored ${score} PTS (Level ${level}) on the Micro-Correction Aim Trainer! Accuracy: ${analytics.accuracy}%. Practice your precision at skilldrills.online!`;
    if (typeof navigator !== 'undefined' && navigator.share) {
      navigator.share({ title: 'Micro-Correction Aim Drill', text, url: 'https://skilldrills.online/drills/fps' }).catch(() => {});
    } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => alert('Score copied to clipboard!'));
    }
  }, [score, level, analytics.accuracy]);

  // JSON-LD Structured Data Configuration
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://skilldrills.online/" },
          { "@type": "ListItem", "position": 2, "name": "FPS Drills", "item": "https://skilldrills.online/drills/fps" },
          { "@type": "ListItem", "position": 3, "name": "Micro-Correction Precision Aim Trainer" }
        ]
      },
      {
        "@type": "WebApplication",
        "name": "Micro-Correction Precision Aim Trainer",
        "applicationCategory": "GameApplication",
        "operatingSystem": "Any",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
      },
      {
        "@type": "SoftwareApplication",
        "name": "Micro-Correction Aim Trainer",
        "applicationCategory": "GameApplication",
        "operatingSystem": "Web",
        "description": "Improve your first-bullet accuracy, crosshair deceleration control, and precision flicking for tactical FPS games."
      },
      {
        "@type": "HowTo",
        "name": "How to use the Micro-Correction Aim Trainer",
        "step": [
          { "@type": "HowToStep", "text": "Adjust your Universal Sens to match your exact in-game sensitivity." },
          { "@type": "HowToStep", "text": "Click 'Begin Tactical Drill' to lock your mouse cursor." },
          { "@type": "HowToStep", "text": "Flick to the large Anchor target to spawn the smaller Micro target." },
          { "@type": "HowToStep", "text": "Immediately correct your crosshair path to hit the micro target with maximum precision." }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          { "@type": "Question", "name": "What is a micro-correction in aiming?", "acceptedAnswer": { "@type": "Answer", "text": "A micro-correction is a tiny, precise adjustment made to your crosshair position after your initial flick aim lands close to the target. It bridges the gap between a fast flick and a perfect headshot, which is critical in tactical shooters like Valorant and CS2." } },
          { "@type": "Question", "name": "How do I improve headshot accuracy?", "acceptedAnswer": { "@type": "Answer", "text": "Improve headshot accuracy by practicing crosshair placement, training mouse deceleration to stop flicks cleanly, using micro-correction drills to refine your aim on tiny targets, and ensuring target confirmation before clicking." } },
          { "@type": "Question", "name": "Why do I overflick targets?", "acceptedAnswer": { "@type": "Answer", "text": "Overflicking is caused by poor mouse deceleration control, tensing your muscles, or running an excessively high sensitivity. Training micro-correction helps build the motor control to stop the mouse exactly on target." } },
          { "@type": "Question", "name": "What is mouse deceleration?", "acceptedAnswer": { "@type": "Answer", "text": "Mouse deceleration is the mechanical skill of stopping your mouse quickly and stably at the end of a swipe. Developing deceleration control prevents your crosshair from sliding past the enemy model." } },
          { "@type": "Question", "name": "How do pro Valorant players aim?", "acceptedAnswer": { "@type": "Answer", "text": "Professional Valorant players aim by keeping their crosshair at head-height (crosshair placement), executing clean flicks close to the target, making immediate micro-corrections, and timing their clicks perfectly." } },
          { "@type": "Question", "name": "How do CS2 players train precision?", "acceptedAnswer": { "@type": "Answer", "text": "CS2 players train precision using tactical aim drills, practicing counter-strafing timing, refining their crosshair micro-adjustments, and repeating click-timing patterns on static micro-targets." } },
          { "@type": "Question", "name": "Can micro-correction drills improve aim?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Most players miss targets because their initial flick is slightly off. Micro-correction drills train the brain and hand muscles to automatically adjust and hit the target center, increasing hit consistency." } },
          { "@type": "Question", "name": "Why do I miss easy headshots?", "acceptedAnswer": { "@type": "Answer", "text": "Missing headshots is usually due to clicking before your crosshair has fully stopped on the target's center (poor click-timing) or failing to correct a near-miss flick." } },
          { "@type": "Question", "name": "What is target confirmation?", "acceptedAnswer": { "@type": "Answer", "text": "Target confirmation is the cognitive split-second where your visual cortex registers that the crosshair is locked onto the target model before you trigger your index finger to click/shoot." } },
          { "@type": "Question", "name": "What is precision aiming?", "acceptedAnswer": { "@type": "Answer", "text": "Precision aiming is the mechanical capacity to hit extremely small targets consistently. It depends on fine motor control of the wrist and fingers, low-friction mouse movements, and disciplined click timing." } },
          { "@type": "Question", "name": "How often should I train micro-corrections?", "acceptedAnswer": { "@type": "Answer", "text": "We recommend training micro-corrections for 10–15 minutes daily as part of your FPS warm-up routine, or up to 30 minutes for a dedicated mechanical accuracy training session." } },
          { "@type": "Question", "name": "Can this improve flick accuracy?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. By training the deceleration and correction phase, your muscle memory learns to flick close and transition smoothly into a micro-flick adjustment rather than overshooting." } },
          { "@type": "Question", "name": "Does this help tactical shooters?", "acceptedAnswer": { "@type": "Answer", "text": "Definitely. Tactical shooters like Valorant, CS2, Rainbow Six Siege, Spectre Divide, and FragPunk rely heavily on low-TTK headshots, making micro-adjustments the most common aiming mechanic in gunfights." } },
          { "@type": "Question", "name": "Is this aim trainer free?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, this Micro-Correction Precision Aim Trainer is 100% free, runs in any desktop browser using raw hardware pointer input, and contains no ads." } },
          { "@type": "Question", "name": "What skills does this drill improve?", "acceptedAnswer": { "@type": "Answer", "text": "This drill improves micro-flicking adjustments, click timing, snap deceleration, target reacquisition speed, headshot precision, and consistency under pressure." } }
        ]
      }
    ]
  };

  return (
    <div className="min-h-screen select-none bg-[#050508] text-white">
      <Head>
        <title>Micro-Correction Aim Trainer – Tactical Precision Drill</title>
        <meta name="description" content="Improve first-bullet accuracy, crosshair deceleration control, and precision flicking for tactical FPS games like CS2 and Valorant." />
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
                <li className="text-cyan-400 font-medium">Micro-Correction Precision</li>
              </ol>
            </nav>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-br from-cyan-500 to-sky-600 rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                  <Crosshair className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-xl sm:text-3xl font-black tracking-tight text-white">
                    Micro-Correction Aim Trainer
                  </h1>
                  <p className="text-xs text-gray-400 mt-1 font-medium uppercase tracking-widest">Tactical FPS Calibration • Hardware Raw Input</p>
                </div>
              </div>
              
              <div className="flex gap-2">
                <button onClick={() => setSoundEnabled(v => !v)} className="p-2.5 rounded-lg border border-gray-700 bg-gray-900 text-gray-400 hover:text-white transition-all" aria-label="Toggle Sound">
                  {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                </button>
                <button onClick={toggleFullscreen} className="p-2.5 rounded-lg border border-gray-700 bg-gray-900 text-gray-400 hover:text-white transition-all" aria-label="Toggle Fullscreen">
                  <Maximize2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Live HUD Stats */}
        {!isFullscreen && (
          <div className="grid grid-cols-5 gap-2 mb-2">
            <StatCard icon={<Trophy className="text-yellow-400" />} value={score} label="Score" />
            <StatCard icon={<TrendingUp className="text-fuchsia-400" />} value={`Lv. ${level}`} label="Level" />
            <StatCard 
              icon={<Flame className={combo >= 10 ? "text-orange-500 animate-pulse" : "text-gray-500"} />} 
              value={combo} 
              label="Combo" 
              highlight={combo >= 10}
            />
            <StatCard icon={<Timer className={timeLeft <= 10 ? 'text-red-400 animate-pulse' : 'text-green-400'} />} value={timeLeft} label="Time" unit="s" />
            <StatCard icon={<Info className="text-blue-400" />} value={`${universalSens.toFixed(2)}x`} label="Sens" />
          </div>
        )}

        {/* Engine Container */}
        <div 
          ref={containerRef} 
          className={`relative overflow-hidden bg-[#05060b] transition-colors outline-none ${
            isFullscreen ? 'w-full h-full' : 'w-full aspect-video min-h-[500px] rounded-2xl border border-gray-700 shadow-2xl'
          }`}
          style={{ backgroundColor: flashBg === 'red' ? '#450a0a' : '#05060b' }}
        >
          {gameState === 'playing' && (
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gray-900 z-[60]">
              <div 
                className={`h-full transition-all duration-1000 ease-linear ${timeLeft <= 10 ? 'bg-red-500 animate-pulse' : 'bg-cyan-500'}`}
                style={{ width: `${Math.min(100, (timeLeft / DRILL_DURATION) * 100)}%` }} 
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
                    <p className="text-[10px] text-fuchsia-400 font-bold uppercase tracking-widest">Level</p>
                    <p className="text-2xl font-black text-fuchsia-400 leading-none">{level}</p>
                  </div>
                </div>
                
                {combo > 1 && (
                  <div className="bg-black/40 backdrop-blur border border-orange-500/30 px-4 py-2 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-left-4">
                    <Flame className="w-5 h-5 text-orange-500" />
                    <div>
                      <p className="text-[10px] text-orange-400 font-bold uppercase tracking-widest">Combo</p>
                      <p className="text-xl font-black text-white leading-none">{combo}x</p>
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
                <AlertCircle className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
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

          {gameState === 'start' && (
            <div className="absolute inset-0 bg-[#05070e]/98 flex flex-col items-center justify-center p-6 z-30 select-none overflow-y-auto max-h-[100vh] backdrop-blur-sm">
              <div className="max-w-md w-full text-center">
                <h2 className="text-xl font-black text-white uppercase tracking-wider mb-1">
                  Micro-Correction Precision
                </h2>
                <p className="text-xs text-slate-500 uppercase tracking-widest mb-6">
                  Hardware Raw Input • Endless Progression
                </p>

                <div className="grid grid-cols-2 gap-3 mb-6 text-left">
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Objective</span>
                    <span className="text-sm font-black text-white">Flick & Correct</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Reward</span>
                    <span className="text-sm font-black text-green-400">Micro Hit +1.0s</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Penalty</span>
                    <span className="text-sm font-black text-red-400">-0.5s on Miss</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Mechanic</span>
                    <span className="text-sm font-black text-blue-400">Precision Aim</span>
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
                    className="flex-1 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg uppercase tracking-widest transition-all duration-200 active:scale-95"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    Begin Tactical Drill
                  </button>
                </div>
              </div>
            </div>
          )}

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
                  Peak difficulty reached: Level {level}
                </p>

                <div className="grid grid-cols-3 gap-3 mb-6 text-left">
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Final Score</span>
                    <span className="text-lg font-black text-white">{score}</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Accuracy</span>
                    <span className="text-lg font-black text-white">{analytics.accuracy}%</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Avg Reaction</span>
                    <span className="text-lg font-black text-white">{analytics.avgCorrectionTime}ms</span>
                  </div>
                  
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Max Combo</span>
                    <span className="text-lg font-black text-white">{analytics.bestCombo}x</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Total Hits</span>
                    <span className="text-lg font-black text-white">{analytics.successfulCycles}</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Assigned Rank</span>
                    <span className={`text-lg font-black ${analytics.rankData.color}`}>
                      Rank {analytics.rankData.rank}
                    </span>
                  </div>

                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Missed Clicks</span>
                    <span className="text-lg font-black text-white">{analytics.missedAttempts}</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Precision Rating</span>
                    <span className="text-[10px] font-black text-white uppercase block mt-1">{analytics.precisionRating}</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold">Consistency</span>
                    <span className="text-lg font-black text-white">{analytics.consistencyScore}%</span>
                  </div>
                </div>

                <div className="bg-[#0b0f19] border border-slate-850 p-4 rounded-xl mb-6 text-left text-xs text-slate-400">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-white uppercase mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-yellow-500" /> Improvement Suggestion:
                  </div>
                  <p className="leading-relaxed">
                    {getSuggestion(analytics.rankData.rank, analytics.missedAttempts, analytics.missedAttempts)}
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

        {/* PROGRESSION & SCORING RULES */}
        {!isFullscreen && (
          <section className="mt-10">
            <div className="rounded-2xl border border-gray-800 overflow-hidden bg-gray-900 shadow-2xl pointer-events-none">
              <div className="px-6 py-5 border-b border-gray-800 bg-black/40 flex items-center gap-3">
                <Info className="w-5 h-5 text-cyan-400" /><h2 className="font-bold text-white text-lg tracking-wide">Progression & Scoring Rules</h2>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-5">
                  <RuleItem num="1" color="indigo" text="Hit Anchor" highlight="+10 PTS" result="Spawns Micro Target" />
                  <RuleItem num="2" color="green" text="Micro Hit" highlight="Up to +30 PTS" result="Scales w/ Precision" />
                </div>
                <div className="space-y-5">
                  <RuleItem num="3" color="orange" text="Combo System" highlight="Bonus +200 PTS" result="Resets on Miss/Timeout" />
                  <RuleItem num="4" color="red" text="Timeouts & Misses" highlight="-0.5s Time" result="Breaks Cycle Streak" />
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
                <GraduationCap className="w-5 h-5 text-cyan-400" />
                <h2 className="font-bold text-white text-lg tracking-wide">About Micro-Correction Aim Training</h2>
              </div>
              
              <div className="p-8 space-y-8">
                <section>
                  <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                    <Target className="w-5 h-5 text-cyan-400" /> What Is Micro-Correction Aiming?
                  </h3>
                  <p className="text-sm leading-relaxed mb-4">
                    <strong>Micro-Correction Aiming</strong> is the precise, immediate adjustment of your crosshair position after your initial flick lands close to a target. It bridges the crucial gap between a fast flick and a perfect headshot, a mechanic heavily utilized by professional players in tactical shooters.
                  </p>
                  <p className="text-sm leading-relaxed">
                    By repeatedly training your <strong>deceleration control</strong>, you condition your wrist and fingers to stop the mouse smoothly and correct spatial errors instantly, preventing over-flicking and increasing first-bullet accuracy in high-stress gunfights.
                  </p>
                </section>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 py-4 border-y border-gray-800/50">
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40 hover:bg-gray-800/50 transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center"><Activity className="w-4 h-4 text-white" /></div>
                      <h4 className="text-sm font-bold text-white">Deceleration Control</h4>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Master the mechanic of stopping your mouse quickly at the end of a swipe. Steady deceleration prevents overflicking and visual aim recovery delay.</p>
                  </div>
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40 hover:bg-gray-800/50 transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center"><Sliders className="w-4 h-4 text-white" /></div>
                      <h4 className="text-sm font-bold text-white">Flick → Correct Flow</h4>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Trains the exact tactical muscle pattern: flick to general area, halt mouse, correct center error, verify lock visually, and fire cleanly.</p>
                  </div>
                  <div className="p-5 rounded-xl border border-gray-800 bg-black/40 hover:bg-gray-800/50 transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-cyan-600 flex items-center justify-center"><Users className="w-4 h-4 text-white" /></div>
                      <h4 className="text-sm font-bold text-white">Who Should Use This?</h4>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">Designed specifically for tactical FPS players seeking to raise their headshot percentages and calibrate crosshair placement under pressure.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-gray-300 pt-4">
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-bold text-white text-base">Why Most Players Miss Headshots</h3>
                      <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                        Most competitive players can easily flick their cursor close to an opponent&apos;s head. However, they miss because they fail to <strong>deceleration-halt</strong> the mouse, or trigger the click before correcting the minor offset. This drill isolates that final correction phase.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="font-bold text-white text-base">Flicking vs Micro-Correction</h3>
                      <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                        Flick aiming is a fast, ballistic muscle action. Micro-correction relies heavily on visual feedback—recognizing the small displacement error from the targets center, commanding a fine wrist or finger adjustment, and confirming alignment.
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
                  <FAQItem q="1. What is a micro-correction in aiming?" a="A micro-correction is a tiny, precise adjustment made to your crosshair position after your initial flick aim lands close to the target. It bridges the gap between a fast flick and a perfect headshot, which is critical in tactical shooters like Valorant and CS2." />
                  <FAQItem q="2. How do I improve headshot accuracy?" a="Improve headshot accuracy by practicing crosshair placement, training mouse deceleration to stop flicks cleanly, using micro-correction drills to refine your aim on tiny targets, and ensuring target confirmation before clicking." />
                  <FAQItem q="3. Why do I overflick targets?" a="Overflicking is caused by poor mouse deceleration control, tensing your muscles, or running an excessively high sensitivity. Training micro-correction helps build the motor control to stop the mouse exactly on target." />
                  <FAQItem q="4. What is mouse deceleration?" a="Mouse deceleration is the mechanical skill of stopping your mouse quickly and stably at the end of a swipe. Developing deceleration control prevents your crosshair from sliding past the enemy model." />
                  <FAQItem q="5. How do pro Valorant players aim?" a="Professional Valorant players aim by keeping their crosshair at head-height (crosshair placement), executing clean flicks close to the target, making immediate micro-corrections, and timing their clicks perfectly." />
                  <FAQItem q="6. How do CS2 players train precision?" a="CS2 players train precision using tactical aim drills, practicing counter-strafing timing, refining their crosshair micro-adjustments, and repeating click-timing patterns on static micro-targets." />
                  <FAQItem q="7. Can micro-correction drills improve aim?" a="Yes. Most players miss targets because their initial flick is slightly off. Micro-correction drills train the brain and hand muscles to automatically adjust and hit the target center, increasing hit consistency." />
                  <FAQItem q="8. Why do I miss easy headshots?" a="Missing headshots is usually due to clicking before your crosshair has fully stopped on the target's center (poor click-timing) or failing to correct a near-miss flick." />
                  <FAQItem q="9. What is target confirmation?" a="Target confirmation is the cognitive split-second where your visual cortex registers that the crosshair is locked onto the target model before you trigger your index finger to click/shoot." />
                  <FAQItem q="10. What is precision aiming?" a="Precision aiming is the mechanical capacity to hit extremely small targets consistently. It depends on fine motor control of the wrist and fingers, low-friction mouse movements, and disciplined click timing." />
                  <FAQItem q="11. How often should I train micro-corrections?" a="We recommend training micro-corrections for 10–15 minutes daily as part of your FPS warm-up routine, or up to 30 minutes for a dedicated mechanical accuracy training session." />
                  <FAQItem q="12. Can this improve flick accuracy?" a="Yes. By training the deceleration and correction phase, your muscle memory learns to flick close and transition smoothly into a micro-flick adjustment rather than overshooting." />
                  <FAQItem q="13. Does this help tactical shooters?" a="Definitely. Tactical shooters like Valorant, CS2, Rainbow Six Siege, Spectre Divide, and FragPunk rely heavily on low-TTK headshots, making micro-adjustments the most common aiming mechanic in gunfights." />
                  <FAQItem q="14. Is this aim trainer free?" a="Yes, this Micro-Correction Precision Aim Trainer is 100% free, runs in any desktop browser using raw hardware pointer input, and contains no ads." />
                  <FAQItem q="15. What skills does this drill improve?" a="This drill improves micro-flicking adjustments, click timing, snap deceleration, target reacquisition speed, headshot precision, and consistency under pressure." />
                </div>
              </div>
            </div>
          </article>
        )}

        {/* RELATED DRILLS SECTION */}
        {!isFullscreen && (
          <section className="mt-14" aria-label="Explore related aim and response drills">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-5 rounded-full bg-cyan-500"></div>
              <h2 className="text-xs font-bold text-white uppercase tracking-widest font-mono">
                Explore Related FPS Drills
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <RelatedCard href="/drills/fps/flick-shot-training" title="Pro Flick Trainer" desc="Snap to targets in time-attack mode." color="blue" icon={<Crosshair className="w-4 h-4" />} />
              <RelatedCard href="/drills/fps/recoil-control" title="Recoil Control" desc="Weapon spray pattern compensation training." color="red" icon={<Activity className="w-4 h-4" />} />
              <RelatedCard href="/drills/fps/angle-hold-trainer" title="Angle Hold" desc="React to peeking targets and hold choke angles." color="orange" icon={<Shield className="w-4 h-4" />} />
              <RelatedCard href="/drills/fps/180-degree-awareness" title="180° Awareness" desc="Situational awareness target acquisition flicks." color="indigo" icon={<Sliders className="w-4 h-4" />} />
            </div>
          </section>
        )}

        {/* FOOTER SECTION */}
        {!isFullscreen && (
          <footer className="mt-12 bg-slate-950/40 border border-slate-900 text-slate-500 rounded-xl py-10 px-6 font-mono text-[10px]" role="contentinfo">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 mb-8">
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider font-mono">Motor & FPS</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/motor/hand-eye-coordination/aim-trainer" className="hover:text-cyan-400 transition-colors">Aim Trainer Elite</Link></li>
                    <li><Link href="/drills/fps/flick-shot-training" className="hover:text-cyan-400 transition-colors">Flick Shot Trainer</Link></li>
                    <li><Link href="/drills/fps" className="text-cyan-455 hover:text-cyan-400 transition-colors font-bold font-mono">All FPS Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider font-mono">Memory</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/memory/working-memory/n-back" className="hover:text-cyan-400 transition-colors">3-Back Training</Link></li>
                    <li><Link href="/drills/memory/short-term-memory/color-sequence" className="hover:text-cyan-400 transition-colors">Color Sequence</Link></li>
                    <li><Link href="/drills/memory" className="text-cyan-455 hover:text-cyan-400 transition-colors font-bold font-mono">All Memory Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider font-mono">Cognitive</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/cognitive/memory/card-matching" className="hover:text-cyan-400 transition-colors">Memory Games</Link></li>
                    <li><Link href="/drills/cognitive/attention/divided-attention" className="hover:text-cyan-400 transition-colors">Attention Drills</Link></li>
                    <li><Link href="/drills/cognitive" className="text-cyan-455 hover:text-cyan-400 transition-colors font-bold font-mono">All Cognitive Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider font-mono">Academic</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/academic/writing-speed/typing-test" className="hover:text-cyan-400 transition-colors">Typing Speed Test</Link></li>
                    <li><Link href="/drills/academic/math-speed/mental-math" className="hover:text-cyan-400 transition-colors">Mental Math</Link></li>
                    <li><Link href="/drills/academic" className="text-cyan-455 hover:text-cyan-400 transition-colors font-bold font-mono">All Academic Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 uppercase tracking-wider font-mono">More Sectors</h3>
                  <ul className="space-y-2">
                    <li><Link href="/drills/visual" className="hover:text-cyan-400 transition-colors">Visual</Link></li>
                    <li><Link href="/drills/physical" className="hover:text-cyan-400 transition-colors">Physical</Link></li>
                  </ul>
                </div>
              </div>
              
              <div className="border-t border-slate-900 pt-8 text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="w-6 h-6 bg-gradient-to-br from-cyan-500/25 to-blue-500/25 border border-cyan-500/30 rounded-lg flex items-center justify-center">
                    <Crosshair className="w-3.5 h-3.5 text-cyan-400" />
                  </div>
                  <span className="text-white font-black tracking-widest text-xs uppercase font-mono">SkillDrills</span>
                </div>
                <p className="text-[9px] mb-2">&copy; {new Date().getFullYear()} SkillDrills. All rights reserved.</p>
                <p className="text-[9px] max-w-2xl mx-auto leading-relaxed mb-6 font-sans">
                  Open-source telemetry training platform using hardware pointer lock. Free forever. No downloads required.
                </p>
                
                <div className="flex items-center justify-center gap-4 flex-wrap mt-6">
                  <a href="https://youtube.com/@skilldrills.online" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors p-2.5 bg-slate-900 rounded-full hover:bg-slate-800 shadow-md" title="YouTube">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                  </a>
                  <a href="https://www.facebook.com/profile.php?id=61590093843779" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors p-2.5 bg-slate-900 rounded-full hover:bg-slate-800 shadow-md" title="Facebook">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  </a>
                  <a href="https://x.com/skilldrillss" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors p-2.5 bg-slate-900 rounded-full hover:bg-slate-800 shadow-md" title="Twitter / X">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  </a>
                  <a href="https://www.instagram.com/skilldrills.online/?__pwa=1" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors p-2.5 bg-slate-900 rounded-full hover:bg-slate-800 shadow-md" title="Instagram">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
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
    indigo: 'bg-indigo-600 text-indigo-300 border-indigo-500', 
    gray: 'bg-gray-600 text-gray-300 border-gray-500', 
    green: 'bg-green-600 text-green-300 border-green-500',
    red: 'bg-red-600 text-red-300 border-red-500',
    orange: 'bg-orange-600 text-orange-300 border-orange-500'
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
      <h3 className="font-bold text-sm mb-1.5 text-white group-hover:text-cyan-400 transition-colors">{title}</h3>
      <p className="text-[11px] text-slate-500 mb-4 leading-normal">{desc}</p>
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