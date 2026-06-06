'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { COACHES, getActiveCoach, getCoachResponse, speakCoachText, handleCoachFeedback } from '../../../../lib/coachVoice';
import Link from 'next/link';
import { recordDrillResult } from '../../../../lib/performanceTelemetry';
import { getAdaptiveParams } from '../../../../lib/adaptiveDifficulty';

import { 
  Crosshair, Zap, Timer, Trophy, 
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, Eye,
  Info, Activity, Lock, AlertCircle, RefreshCw,
  Home, ChevronRight, Calculator, Sparkles, Cpu, Award, Play
} from 'lucide-react';

const DRILL_DURATION = 60; // 60 seconds

export default function TargetPrioritizationClient() {
const GAME_YAWS = {
  valorant: 0.07,
  cs2: 0.022,
  apex: 0.022,
  overwatch: 0.0066,
  siege: 0.0057,
  fortnite: 0.01,
  cod: 0.022,
  pubg: 0.002222,
  destiny2: 0.0066,
  halo: 0.022,
  battlefield: 0.022,
  tf2: 0.022
};


  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const containerRef = useRef(null);
  const pageRef = useRef(null);
  
  const [gameState, setGameState] = useState('start'); // start, playing, gameOver
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(DRILL_DURATION);
  const [pointerLocked, setPointerLocked] = useState(false);
  const [gameType, setGameType] = useState('valorant'); // valorant, cs2, apex, overwatch, fortnite
  const [dpi, setDpi] = useState(800);
  const [inGameSens, setInGameSens] = useState(0.35);
  const [cmPer360, setCmPer360] = useState(0);
  
  const sensitivityMultiplierRef = useRef(1);
  const virtualCrosshair = useRef({ x: 0, y: 0 });
  const canvasSizeRef = useRef({ width: 800, height: 450 });
  const audioCtxRef = useRef(null);
  
  // Game state references
  const targetsRef = useRef([]); // list of active target nodes
  const feedbacksRef = useRef([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const scoreRef = useRef(0);
  const comboRef = useRef(0);
  const [combo, setCombo] = useState(0);
  const timeLeftRef = useRef(DRILL_DURATION);
  const timerIntervalRef = useRef(null);
  const crosshairInitializedRef = useRef(false);
  const lastSpawnTimeRef = useRef(0);

  // S+ AI Coach Performance Tracking & Sensitivity Auto-Adjustment States
  const [activeCoach, setActiveCoach] = useState(null);
  const [coachSubtitle, setCoachSubtitle] = useState('');
  const [coachSpeaking, setCoachSpeaking] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [sensAdjustedAlert, setSensAdjustedAlert] = useState(null);

  const speakText = useCallback((text, priority = false) => {
    if (typeof window === 'undefined') return;
    try {
      const coachId = localStorage.getItem('activeFpCoach') || 'athena';
      const coachObj = COACHES.find(c => c.id === coachId) || COACHES[0];
      setActiveCoach(coachObj);
      
      handleCoachFeedback(text, {
        inGameSens,
        setInGameSens,
        gameType,
        dpi,
        coachId,
        voiceEnabled,
        priority,
        setCoachSubtitle,
        setCoachSpeaking
      });
    } catch (e) {
      console.error("Coach speakText error:", e);
    }
  }, [voiceEnabled, inGameSens, gameType, dpi]);

  const checkSensitivityAdjustment = useCallback((type, extra = {}) => {
    const currentGameState = typeof gameState !== 'undefined' ? gameState : 'playing';
    if (currentGameState !== 'playing') return;
    try {
      const coachId = localStorage.getItem('activeFpCoach') || 'athena';
      handleCoachFeedback(type, {
        inGameSens,
        setInGameSens,
        gameType,
        dpi,
        coachId,
        voiceEnabled,
        extra,
        setSensAdjustedAlert
      });
    } catch (e) {
      console.error("Coach checkSensitivityAdjustment error:", e);
    }
  }, [inGameSens, gameState, gameType, dpi, voiceEnabled]);


  // Auto-save user calibration preferences
  useEffect(() => {
    if (gameState === 'playing') return;
    try {
      localStorage.setItem('proSens', inGameSens.toString());
      localStorage.setItem('proDpi', dpi.toString());
      localStorage.setItem('proGame', gameType);
      if (gameType === 'pubg') {
        localStorage.setItem('pubgSens', inGameSens.toString());
      }
    } catch (e) {}
  }, [inGameSens, dpi, gameType, gameState]);


  // S+ AI Coach Performance Tracking & Sensitivity Auto-Adjustment States
  

  

  


  // Auto-save user calibration preferences
  useEffect(() => {
    if (gameState === 'playing') return;
    try {
      localStorage.setItem('proSens', inGameSens.toString());
      localStorage.setItem('proDpi', dpi.toString());
      localStorage.setItem('proGame', gameType);
      if (gameType === 'pubg') {
        localStorage.setItem('pubgSens', inGameSens.toString());
      }
    } catch (e) {}
  }, [inGameSens, dpi, gameType, gameState]);

  
  // Analytics
  const [analytics, setAnalytics] = useState({
    totalShots: 0,
    criticalHits: 0,
    standardHits: 0,
    decoyClicks: 0,
    expiredTargets: 0,
    accuracy: 100,
    maxCombo: 0
  });
  
  const analyticsRef = useRef({
    totalShots: 0,
    criticalHits: 0,
    standardHits: 0,
    decoyClicks: 0,
    expiredTargets: 0,
    maxCombo: 0
  });

  // Load stats
  useEffect(() => {
    try {
      const savedScore = localStorage.getItem('priorityBestScore');
      if (savedScore) {
        const parsed = parseInt(savedScore, 10);
        if (!isNaN(parsed)) setBestScore(parsed);
      }
      const savedDpi = localStorage.getItem('proDpi');
      if (savedDpi) setDpi(parseInt(savedDpi, 10));
      const savedGameLocal = localStorage.getItem('proGame') || 'valorant';
      const savedSens = localStorage.getItem(savedGameLocal === 'pubg' ? 'pubgSens' : 'proSens');
      if (savedSens) setInGameSens(parseFloat(savedSens));
      const savedGame = localStorage.getItem('proGame');
      if (savedGame) {
        setGameType(savedGame);
      }
    } catch (e) {}
  }, []);

  // Compute sens
  useEffect(() => {
    const yaw = GAME_YAWS[gameType] || 0.07;
    const counts = 360 / (yaw * inGameSens);
    const inches = counts / dpi;
    const cm = inches * 2.54;
    setCmPer360(cm.toFixed(1));
    
    sensitivityMultiplierRef.current = 45.0 / cm;
  }, [dpi, inGameSens, gameType]);

  // Audio system
  const initAudio = useCallback(() => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }
      return audioCtxRef.current;
    } catch (e) {
      return null;
    }
  }, []);

  const playSound = useCallback((type) => {
    if (!soundEnabled) return;
    try {
      const ctx = initAudio();
      if (!ctx) return;
      
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      const now = ctx.currentTime;
      
      if (type === 'shoot') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(100, now + 0.07);
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);
        osc.start(now);
        osc.stop(now + 0.07);
      } else if (type === 'success') {
        osc.frequency.setValueAtTime(1046.50, now); // C6
        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
        osc.start(now);
        osc.stop(now + 0.12);
      } else if (type === 'critical') {
        osc.frequency.setValueAtTime(1318.51, now); // E6
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
        osc.start(now);
        osc.stop(now + 0.18);
      } else if (type === 'fail') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(180, now);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
        osc.start(now);
        osc.stop(now + 0.2);
      }
    } catch (e) {}
  }, [soundEnabled, initAudio]);

  const showFeedbackText = useCallback((text, type) => {
    const id = Math.random().toString(36).substr(2, 9);
    feedbacksRef.current.push({ id, text, type });
    setFeedbacks([...feedbacksRef.current]);
    
    setTimeout(() => {
      feedbacksRef.current = feedbacksRef.current.filter(f => f.id !== id);
      setFeedbacks([...feedbacksRef.current]);
    }, 1200);
  }, []);

  const updateBestScore = useCallback((finalScore) => {
    try {
      const currentBest = parseInt(localStorage.getItem('priorityBestScore') || '0', 10);
      if (finalScore > currentBest) {
        localStorage.setItem('priorityBestScore', finalScore.toString());
        setBestScore(finalScore);
      }
    } catch (e) {}
  }, []);

  const toggleFullscreen = useCallback(async () => {
    try {
      if (!isFullscreen) {
        const el = pageRef.current;
        if (el?.requestFullscreen) {
          el.requestFullscreen().catch((e) => console.warn("Fullscreen request blocked", e));
          setIsFullscreen(true);
        }
      } else {
        if (document.fullscreenElement) {
          await document.exitFullscreen();
        }
        setIsFullscreen(false);
      }
    } catch (e) {}
  }, [isFullscreen]);

  const resetGame = useCallback(() => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    setGameState('start');
    if (document.pointerLockElement) {
      document.exitPointerLock();
    }
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      const active = !!document.fullscreenElement;
      setIsFullscreen(active);
      if (!active && gameState === 'playing') {
        resetGame();
      }
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, [gameState, resetGame]);

  const requestPointerLock = useCallback(() => {
    if (canvasRef.current) {
      canvasRef.current.requestPointerLock();
    }
  }, []);

  const handleCanvasClick = useCallback(() => {
    if (gameState === 'playing' && !document.pointerLockElement) {
      canvasRef.current?.requestPointerLock();
    }
  }, [gameState]);

  useEffect(() => {
    const handlePointerLockChange = () => {
      const locked = document.pointerLockElement === canvasRef.current;
      setPointerLocked(locked);
      if (locked) {
        crosshairInitializedRef.current = true;
      } else if (gameState === 'playing') {
        showFeedbackText('CURSOR UNLOCKED - Click Canvas to Lock', 'error');
      }
    };
    document.addEventListener('pointerlockchange', handlePointerLockChange);
    return () => document.removeEventListener('pointerlockchange', handlePointerLockChange);
  }, [gameState, showFeedbackText]);

  // Pointer position tracker
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!document.pointerLockElement) return;
      
      const sens = sensitivityMultiplierRef.current;
      const dx = (e.movementX || 0) * sens;
      const dy = (e.movementY || 0) * sens;
      
      virtualCrosshair.current.x += dx;
      virtualCrosshair.current.y += dy;
      
      const cvs = canvasRef.current;
      if (cvs) {
        virtualCrosshair.current.x = Math.max(0, Math.min(cvs.width, virtualCrosshair.current.x));
        virtualCrosshair.current.y = Math.max(0, Math.min(cvs.height, virtualCrosshair.current.y));
      }
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Spawn target nodes
  const spawnTarget = useCallback(() => {
    const cvs = canvasRef.current;
    if (!cvs) return;
    
    const pad = 60;
    const x = Math.random() * (cvs.width - pad * 2) + pad;
    const y = Math.random() * (cvs.height - pad * 2) + pad;
    
    // Distribute types: 20% Critical (Red), 60% Standard (Blue), 20% Decoy (Yellow)
    const rand = Math.random();
    let type = 'standard';
    let targetRadius = 15;
    let lifeSpan = 2000;
    
    if (rand < 0.20) {
      type = 'critical';
      targetRadius = 11; // smaller headshot size
      lifeSpan = 1000; // decays fast
    } else if (rand > 0.80) {
      type = 'decoy';
      targetRadius = 14;
      lifeSpan = 2500;
    }
    
    // Scale features relative to gameTypes
    if (gameType === 'valorant' || gameType === 'cs2') {
      targetRadius = type === 'critical' ? 8 : type === 'decoy' ? 12 : 11;
      lifeSpan *= 0.8; // faster decay for tactical games
    } else if (gameType === 'apex' || gameType === 'overwatch') {
      targetRadius = type === 'critical' ? 14 : type === 'decoy' ? 18 : 17;
      lifeSpan *= 1.2;
    }
    
    // Bouncing velocity vectors for tracking styles
    let vx = 0;
    let vy = 0;
    if (gameType === 'apex' || gameType === 'overwatch') {
      vx = (Math.random() - 0.5) * 120;
      vy = (Math.random() - 0.5) * 120;
    }
    
    targetsRef.current.push({
      id: Math.random().toString(36).substr(2, 9),
      x,
      y,
      vx,
      vy,
      type,
      radius: targetRadius,
      maxRadius: targetRadius,
      spawnTime: performance.now(),
      lifeSpan,
      hit: false
    });
  }, [gameType]);

  // Click shot handler
  const handleShot = useCallback(() => {
    if (gameState !== 'playing') return;
    
    playSound('shoot');
    analyticsRef.current.totalShots++;
    
    const cross = virtualCrosshair.current;
    let hitSomething = false;
    
    // Loop backwards to hit top targets first
    for (let i = targetsRef.current.length - 1; i >= 0; i--) {
      const t = targetsRef.current[i];
      const dist = Math.hypot(cross.x - t.x, cross.y - t.y);
      
      if (dist <= t.radius) {
        hitSomething = true;
        t.hit = true;
        
        if (t.type === 'critical') {
          // Double score points
          analyticsRef.current.criticalHits++;
          comboRef.current++;
          setCombo(comboRef.current);
          if (comboRef.current > analyticsRef.current.maxCombo) {
            analyticsRef.current.maxCombo = comboRef.current;
          }
          
          const pts = 150 * (comboRef.current >= 5 ? 3 : comboRef.current >= 3 ? 2 : 1);
          scoreRef.current += pts;
          setScore(scoreRef.current);
          playSound('critical');
          showFeedbackText(`🔥 CRITICAL TARGET! x${comboRef.current} +${pts}`, 'success');
        } else if (t.type === 'standard') {
          analyticsRef.current.standardHits++;
          comboRef.current++;
          setCombo(comboRef.current);
          if (comboRef.current > analyticsRef.current.maxCombo) {
            analyticsRef.current.maxCombo = comboRef.current;
          }
          
          const pts = 50 * (comboRef.current >= 5 ? 3 : comboRef.current >= 3 ? 2 : 1);
          scoreRef.current += pts;
          setScore(scoreRef.current);
          playSound('success'); if (typeof checkSensitivityAdjustment === 'function') checkSensitivityAdjustment('hit'); if (typeof checkSensitivityAdjustment === 'function') checkSensitivityAdjustment('hit');
          showFeedbackText(`✓ Target hit! +${pts}`, 'info');
        } else if (t.type === 'decoy') {
          // Penalize decoy click
          analyticsRef.current.decoyClicks++;
          comboRef.current = 0;
          setCombo(0);
          scoreRef.current = Math.max(0, scoreRef.current - 100);
          setScore(scoreRef.current);
          playSound('fail'); if (typeof checkSensitivityAdjustment === 'function') checkSensitivityAdjustment('miss', { dist: typeof dist !== 'undefined' ? dist : 50, targetSize: typeof targetRadius !== 'undefined' ? targetRadius : (typeof TARGET_SIZE !== 'undefined' ? TARGET_SIZE : (typeof TARGET_RADIUS !== 'undefined' ? TARGET_RADIUS : 15)) }); if (typeof checkSensitivityAdjustment === 'function') checkSensitivityAdjustment('miss', { dist: typeof dist !== 'undefined' ? dist : 50, targetSize: typeof targetRadius !== 'undefined' ? targetRadius : (typeof TARGET_SIZE !== 'undefined' ? TARGET_SIZE : (typeof TARGET_RADIUS !== 'undefined' ? TARGET_RADIUS : 15)) });
          showFeedbackText('🚨 DECOY TRAP PENALTY -100PTS', 'error');
        }
        
        targetsRef.current.splice(i, 1);
        break;
      }
    }
    
    if (!hitSomething) {
      comboRef.current = 0;
      setCombo(0);
      showFeedbackText('❌ MISS', 'error');
    }
  }, [gameState, playSound, showFeedbackText]);

  // Canvas mousedown
  useEffect(() => {
    const handleMouseDown = (e) => {
      if (e.target.tagName === 'BUTTON' || e.target.closest('button')) return;
      if (gameState === 'playing') {
        if (!document.pointerLockElement) {
          requestPointerLock();
        } else {
          e.preventDefault();
          handleShot();
        }
      }
    };
    document.addEventListener('mousedown', handleMouseDown);
    return () => document.removeEventListener('mousedown', handleMouseDown);
  }, [gameState, handleShot, requestPointerLock]);

  // Main session timer
  const startTimer = useCallback(() => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    
    timeLeftRef.current = DRILL_DURATION;
    setTimeLeft(DRILL_DURATION);
    
    timerIntervalRef.current = setInterval(() => {
      timeLeftRef.current -= 1;
      setTimeLeft(timeLeftRef.current);
      
      if (timeLeftRef.current <= 0) {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
        setGameState('gameOver');
        document.exitPointerLock();
        updateBestScore(scoreRef.current);
    // Record telemetry for AI coaching system
    try {
      recordDrillResult('target-prioritization', {
        score: scoreRef.current,
        accuracy: null,
        reactionTimeMs: null,
        trackingAccuracy: null,
        comboMax: comboRef.current,
        overshoots: 0,
        undershoots: 0,
        sensitivity: inGameSens,
        dpi,
        gameType,
        duration: DRILL_DURATION
      });
    } catch (e) {}

        
        const tShots = analyticsRef.current.totalShots || 1;
        const totalHits = analyticsRef.current.criticalHits + analyticsRef.current.standardHits;
        
        setAnalytics({
          totalShots: analyticsRef.current.totalShots,
          criticalHits: analyticsRef.current.criticalHits,
          standardHits: analyticsRef.current.standardHits,
          decoyClicks: analyticsRef.current.decoyClicks,
          expiredTargets: analyticsRef.current.expiredTargets,
          maxCombo: analyticsRef.current.maxCombo,
          accuracy: Math.round((totalHits / tShots) * 100)
        });
      }
    }, 1000);
  }, [updateBestScore]);

  // Start trainer click
  const startGame = useCallback(() => {
    // Get adaptive difficulty parameters
    const adaptive = getAdaptiveParams('target-prioritization');

    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    
    try {
      const el = pageRef.current;
      if (el && !document.fullscreenElement) {
        el.requestFullscreen().catch((e) => console.warn("Fullscreen request blocked", e));
        setIsFullscreen(true);
      }
    } catch (e) {
      console.warn("Fullscreen request blocked", e);
    }
    
    setGameState('playing');
    setScore(0);
    scoreRef.current = 0;
    comboRef.current = 0;
    setCombo(0);
    
    analyticsRef.current = {
      totalShots: 0,
      criticalHits: 0,
      standardHits: 0,
      decoyClicks: 0,
      expiredTargets: 0,
      maxCombo: 0
    };
    
    targetsRef.current = [];
    feedbacksRef.current = [];
    setFeedbacks([]);
    
    lastSpawnTimeRef.current = performance.now();
    crosshairInitializedRef.current = false;
    
    // Spawn initial 3 targets
    setTimeout(() => {
      spawnTarget();
      spawnTarget();
      spawnTarget();
    }, 100);
    
    startTimer();
    
    if (canvasRef.current) {
      try {
        canvasRef.current.requestPointerLock();
      } catch (e) {
        console.warn("Pointer lock blocked", e);
      }
    }
    crosshairInitializedRef.current = true;
  }, [startTimer, requestPointerLock, spawnTarget]);

  // Game tick physics & render
  useEffect(() => {
    if (gameState !== 'playing') return;
    
    const cvs = canvasRef.current;
    if (!cvs) return;
    const ctx = cvs.getContext('2d');
    
    const updateSize = () => {
      const cr = containerRef.current;
      if (!cr) return;
      const rect = cr.getBoundingClientRect();
      
      let w = rect.width;
      let h = w * (9 / 16);
      
      if (h > rect.height) {
        h = rect.height;
        w = h * (16 / 9);
      }
      
      cvs.width = w;
      cvs.height = h;
      cvs.style.width = `${w}px`;
      cvs.style.height = `${h}px`;
      canvasSizeRef.current = { width: w, height: h };
      
      cvs.style.position = 'absolute';
      cvs.style.left = `${(rect.width - w) / 2}px`;
      cvs.style.top = `${(rect.height - h) / 2}px`;
      
      if (w > 0 && h > 0 && (!crosshairInitializedRef.current || (virtualCrosshair.current.x === 0 && virtualCrosshair.current.y === 0))) {
        virtualCrosshair.current = { x: w / 2, y: h / 2 };
        crosshairInitializedRef.current = true;
      }
    };
    
    updateSize();
    window.addEventListener('resize', updateSize);
    
    let lastFrameTime = performance.now();
    
    const run = (timestamp) => {
      if (gameState !== 'playing') return;
      
      let dt = (timestamp - lastFrameTime) / 1000;
      lastFrameTime = timestamp;
      if (dt > 0.1) dt = 0.1;
      
      // Clear
      ctx.fillStyle = '#080d1a';
      ctx.fillRect(0, 0, cvs.width, cvs.height);
      
      // Grid
      ctx.strokeStyle = 'rgba(239, 68, 68, 0.05)';
      ctx.lineWidth = 1;
      const step = 60;
      for (let x = 0; x < cvs.width; x += step) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, cvs.height); ctx.stroke();
      }
      for (let y = 0; y < cvs.height; y += step) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(cvs.width, y); ctx.stroke();
      }
      
      // 1. UPDATE TARGET SPAWNS
      const spawnInterval = gameType === 'valorant' || gameType === 'cs2' ? 700 : 900;
      if (timestamp - lastSpawnTimeRef.current >= spawnInterval) {
        if (targetsRef.current.length < 8) {
          spawnTarget();
        }
        lastSpawnTimeRef.current = timestamp;
      }
      
      // 2. PHYSICS & RENDER NODES
      for (let i = targetsRef.current.length - 1; i >= 0; i--) {
        const t = targetsRef.current[i];
        const age = timestamp - t.spawnTime;
        
        // Decay target radius over time
        const lifePercent = 1 - (age / t.lifeSpan);
        if (lifePercent <= 0) {
          if (t.type !== 'decoy') {
            analyticsRef.current.expiredTargets++;
            comboRef.current = 0; // break combo on expired
            setCombo(0);
          }
          targetsRef.current.splice(i, 1);
          continue;
        }
        
        // Move bounce targets (Apex/OW styles)
        t.x += t.vx * dt;
        t.y += t.vy * dt;
        
        // Bounce bounds
        if (t.x - t.radius < 0 || t.x + t.radius > cvs.width) {
          t.vx *= -1;
          t.x = Math.max(t.radius, Math.min(cvs.width - t.radius, t.x));
        }
        if (t.y - t.radius < 0 || t.y + t.radius > cvs.height) {
          t.vy *= -1;
          t.y = Math.max(t.radius, Math.min(cvs.height - t.radius, t.y));
        }
        
        // Draw target node
        ctx.save();
        ctx.shadowBlur = t.type === 'critical' ? 20 : 10;
        ctx.shadowColor = t.type === 'critical' ? '#ef4444' : t.type === 'decoy' ? '#eab308' : '#3b82f6';
        
        if (t.type === 'critical') {
          ctx.fillStyle = '#ef4444';
          ctx.strokeStyle = '#ffffff';
        } else if (t.type === 'decoy') {
          ctx.fillStyle = '#eab308';
          ctx.strokeStyle = '#ef4444';
        } else {
          ctx.fillStyle = '#3b82f6';
          ctx.strokeStyle = '#ffffff';
        }
        
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        // Target scales down as time runs out
        const activeRadius = t.maxRadius * (t.type === 'decoy' ? 1.0 : Math.max(0.4, lifePercent));
        ctx.arc(t.x, t.y, activeRadius, 0, Math.PI * 2);
        ctx.fill(); ctx.stroke();
        
        // Draw inner concentric ring
        ctx.shadowBlur = 0;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.beginPath();
        ctx.arc(t.x, t.y, activeRadius * 0.5, 0, Math.PI * 2);
        ctx.stroke();
        
        ctx.restore();
      }
      
      // 3. DRAW DYNAMIC RETICLE
      const ch = virtualCrosshair.current;
      const crosshairColor = pointerLocked ? '#00ff88' : '#ffbb00';
      
      ctx.strokeStyle = crosshairColor;
      ctx.lineWidth = 2;
      ctx.beginPath();
      
      const gap = 4;
      const len = 10;
      
      // reticle
      ctx.moveTo(ch.x - gap, ch.y);
      ctx.lineTo(ch.x - gap - len, ch.y);
      ctx.moveTo(ch.x + gap, ch.y);
      ctx.lineTo(ch.x + gap + len, ch.y);
      ctx.moveTo(ch.x, ch.y - gap);
      ctx.lineTo(ch.x, ch.y - gap - len);
      ctx.moveTo(ch.x, ch.y + gap);
      ctx.lineTo(ch.x, ch.y + gap + len);
      ctx.stroke();
      
      ctx.fillStyle = crosshairColor;
      ctx.beginPath();
      ctx.arc(ch.x, ch.y, 1.5, 0, Math.PI * 2);
      ctx.fill();
      
      // Pointer lock instruction
      if (!pointerLocked) {
        ctx.fillStyle = 'rgba(8, 13, 26, 0.8)';
        ctx.fillRect(cvs.width / 2 - 180, cvs.height / 2 - 25, 360, 50);
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(cvs.width / 2 - 180, cvs.height / 2 - 25, 360, 50);
        
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 12px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('CLICK CANVAS TO CAPTURE RAW MOUSE INPUT', cvs.width / 2, cvs.height / 2 + 4);
      }
      
      animationRef.current = requestAnimationFrame(run);
    };
    
    animationRef.current = requestAnimationFrame(run);
    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', updateSize);
    };
  }, [gameState, pointerLocked, gameType, spawnTarget]);

  return (
    <div ref={pageRef} className="min-h-screen select-none font-mono bg-[#080d1a] text-slate-100 relative overflow-hidden">
      
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-950/15 via-[#080d1a] to-[#080d1a] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.02)_1px,_transparent_1px),_linear-gradient(90deg,_rgba(59,130,246,0.02)_1px,_transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />
      
      <div className={`${isFullscreen ? 'w-full h-screen p-0 m-0' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'} relative z-10`}>
        
        {!isFullscreen && (
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-2 text-[10px] font-mono text-slate-400 uppercase tracking-widest">
              <li><Link href="/" className="hover:text-red-400 transition-colors">HQ</Link></li>
              <li><ChevronRight className="w-3 h-3 text-slate-700" /></li>
              <li><Link href="/drills/fps" className="hover:text-red-400 transition-colors">FPS Sector</Link></li>
              <li><ChevronRight className="w-3 h-3 text-slate-700" /></li>
              <li><span className="text-red-400 font-bold">Target Prioritization Swarm</span></li>
            </ol>
          </nav>
        )}

        {!isFullscreen && (
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6 border-b border-slate-900 pb-5">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-950/30 border border-blue-500/20 text-blue-400 rounded-xl">
                <Crosshair className="w-7 h-7 animate-pulse" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white uppercase bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                  Target Prioritization Swarm
                </h1>
                <p className="text-xs text-slate-400 tracking-wider mt-0.5">
                  {pointerLocked ? '🟢 RAW INPUT CAPTURING' : '🔴 CLICK CANVAS TO CAPTURE'} • {cmPer360} cm/360 • COGNITIVE FOCUS SWARM
                </p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <button 
                onClick={() => setSoundEnabled(!soundEnabled)} 
                className="px-3 py-1.5 rounded-lg border border-slate-800 bg-[#0c1224] text-slate-300 hover:border-slate-700 text-xs flex items-center gap-1.5 transition"
              >
                {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                <span>SOUNDS</span>
              </button>
              <button 
                onClick={toggleFullscreen} 
                className="px-3 py-1.5 rounded-lg border border-slate-800 bg-[#0c1224] text-slate-300 hover:border-slate-700 text-xs flex items-center gap-1.5 transition"
              >
                {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                <span>FULLSCREEN</span>
              </button>
            </div>
          </div>
        )}

        {/* Start Game Screen */}
        {gameState === 'start' && (
          <div className="absolute inset-0 bg-[#080d1a]/95 flex items-center justify-center p-6 z-30 overflow-y-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            <div className="lg:col-span-1 bg-[#0c1224]/80 border border-slate-900 rounded-xl p-6 flex flex-col justify-between backdrop-blur-md">
              <div>
                <h3 className="text-sm font-bold text-blue-400 mb-4 flex items-center gap-2 border-b border-slate-900 pb-2">
                  <Info className="w-4 h-4" />
                  COGNITIVE DRILL LOGIC
                </h3>
                <ul className="space-y-4 text-xs leading-relaxed text-slate-400">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold">🔴 RED Targets:</span>
                    <span>**Critical Priority** (+150 points). Small sizes and decay in 1 second. Flick to these first!</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 font-bold">🔵 BLUE Targets:</span>
                    <span>**Standard Priority** (+50 points). Exists for 2 seconds. Hit after criticals.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-500 font-bold">🟡 YELLOW Targets:</span>
                    <span>**Decoy Traps** (-100 points & resets combo). Avoid shooting at all costs!</span>
                  </li>
                  <li className="flex items-start gap-2 text-blue-300">
                    <span className="text-green-400 font-bold">★</span>
                    <span>**Combo Multipliers**: Consecutive target hits build a multiplier (x1, x2, x3 max). Missing or hitting decoys resets the multiplier.</span>
                  </li>
                </ul>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-900 text-[10px] text-slate-550 leading-normal">
                Trains selective attention, visual filtering, and quick aim transitions.
              </div>
            </div>

            <div className="lg:col-span-2 bg-[#0c1224]/80 border border-slate-900 rounded-xl p-6 backdrop-blur-md flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2 border-b border-slate-900 pb-2">
                  <Calculator className="w-4 h-4 text-blue-400" />
                  CALIBRATE AIM ENGINE
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  <div>
                    <label className="block text-[9px] text-slate-400 font-bold uppercase tracking-wider mb-2">Game Profile</label>
                    <select 
                      value={gameType}
                      onChange={(e) => setGameType(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-2 text-xs text-white focus:outline-none focus:border-red-500/50 font-mono"
                    >
                      <option value="valorant">Valorant</option>
                      <option value="cs2">CS2 / Global Offensive</option>
                      <option value="apex">Apex Legends</option>
                      <option value="overwatch">Overwatch 2</option>
                      <option value="siege">Rainbow Six Siege</option>
                      <option value="fortnite">Fortnite</option>
                      <option value="cod">Call of Duty / Warzone</option>
                      <option value="pubg">PUBG</option>
                      <option value="destiny2">Destiny 2</option>
                      <option value="halo">Halo Infinite</option>
                      <option value="battlefield">Battlefield 2042</option>
                      <option value="tf2">Team Fortress 2</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[9px] text-slate-400 font-bold uppercase tracking-wider mb-2">In-Game Sens</label>
                    <input 
                      type="number"
                      step="0.001"
                      value={inGameSens}
                      onChange={(e) => setInGameSens(Math.max(0.001, parseFloat(e.target.value) || 0.1))}
                      className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-2 text-xs text-white focus:outline-none focus:border-red-500/50"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] text-slate-400 font-bold uppercase tracking-wider mb-2">Mouse DPI</label>
                    <input 
                      type="number"
                      step="50"
                      value={dpi}
                      onChange={(e) => setDpi(Math.max(100, parseInt(e.target.value, 10) || 800))}
                      className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-2 text-xs text-white focus:outline-none focus:border-red-500/50"
                    />
                  </div>
                </div>

                <div className="p-4 bg-slate-950/80 rounded border border-slate-900 flex justify-between items-center text-xs">
                  <div>
                    <span className="text-[10px] text-slate-550 block uppercase">360° Translation</span>
                    <span className="text-white font-bold text-sm">{cmPer360} cm / 360°</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-550 block uppercase">Active Dynamic Obstructers</span>
                    <span className="text-blue-400 font-bold">Dynamic Decoy Yellow Orbs</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-4 items-center justify-between border-t border-slate-900 pt-6">
                <div>
                  <span className="text-[10px] text-slate-550 block uppercase">Personal Best Record</span>
                  <span className="text-white font-bold text-lg flex items-center gap-1.5">
                    <Trophy className="w-4 h-4 text-yellow-500" />
                    {bestScore} Points
                  </span>
                </div>
                <button
                  onClick={startGame}
                  className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 uppercase tracking-wider transition animate-pulse"
                >
                  <Play className="w-4 h-4 fill-white" />
                  Launch Fullscreen Training
                </button>
              </div>
            </div>
          </div>
          </div>
        )}

        {/* Playing Screen */}
        <div className={isFullscreen ? "w-full h-full" : "block"}>
          

          <div 
            ref={containerRef} 
            className={isFullscreen 
              ? "w-full h-full bg-[#050811] relative overflow-hidden flex items-center justify-center" 
              : "w-full aspect-video min-h-[400px] lg:min-h-[500px] bg-[#050811] border border-slate-800 rounded-xl relative overflow-hidden flex items-center justify-center"}
          >
            <canvas ref={canvasRef} onClick={handleCanvasClick} />

            {/* S+ Pro Coach Dynamic Audio Guidance HUD & Alerts (Visual Text Hidden) */}


            {/* S+ Pro Coach Dynamic Audio Guidance HUD & Alerts (Visual Text Hidden) */}

            


            

            {/* Feed float overlays */}
            <div className="absolute inset-0 pointer-events-none flex flex-col justify-center items-center gap-2 overflow-hidden select-none z-10">
              {feedbacks.map((f) => (
                <div 
                  key={f.id} 
                  className={`px-5 py-2.5 rounded border text-sm font-extrabold animate-bounce shadow-lg uppercase tracking-wider backdrop-blur-sm ${
                    f.type === 'success' 
                      ? 'bg-red-950/90 border-red-500/30 text-red-400' 
                      : f.type === 'warn'
                        ? 'bg-blue-950/90 border-blue-500/30 text-blue-400'
                        : f.type === 'info'
                          ? 'bg-slate-950/90 border-slate-800 text-slate-300'
                          : 'bg-yellow-950/90 border-yellow-500/30 text-yellow-400'
                  }`}
                >
                  {f.text}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 text-center text-[10px] text-slate-500 flex items-center justify-center gap-4">
            <span>🔴 Flick Red nodes first (Worth +150 & fast decaying).</span>
            <span>• Avoid Yellow decoys (Deducts -100).</span>
            <span>• Press <kbd className="px-1.5 py-0.5 bg-slate-900 border border-slate-800 text-slate-300 rounded font-sans text-[10px]">ESC</kbd> to exit and return to lobby.</span>
          </div>
        </div>

        {/* Game Over Screen */}
        {gameState === 'gameOver' && (
          <div className="absolute inset-0 bg-[#080d1a]/95 flex items-center justify-center p-6 z-30 overflow-y-auto">
            <div className="bg-[#0c1224]/80 border border-slate-900 rounded-xl p-8 backdrop-blur-md max-w-3xl mx-auto">
            <h2 className="text-xl font-bold text-blue-400 text-center mb-6 uppercase tracking-widest flex items-center justify-center gap-2">
              <Award className="w-5 h-5 text-yellow-500" />
              SWARM TRAINING COMPLETED
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="space-y-4">
                <div className="bg-slate-950 p-4 rounded border border-slate-900">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-550 block uppercase">Final Swarm Score:</span>
                    <span className="text-white font-bold text-xl">{score} PTS</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-950 p-3 rounded border border-slate-900 text-center">
                    <span className="text-[10px] text-slate-550 block uppercase">Max Combo Streak</span>
                    <span className="text-white font-bold text-sm">{analytics.maxCombo} Hits</span>
                  </div>
                  <div className="bg-slate-950 p-3 rounded border border-slate-900 text-center">
                    <span className="text-[10px] text-slate-550 block uppercase">Accuracy %</span>
                    <span className="text-white font-bold text-sm">{analytics.accuracy}%</span>
                  </div>
                </div>

                <div className="bg-slate-950 p-4 rounded border border-slate-900">
                  <div className="flex justify-between items-center text-xs mb-1">
                    <span className="text-slate-550 uppercase">Shots Fired:</span>
                    <span className="text-white font-bold">{analytics.totalShots}</span>
                  </div>
                  <div className="text-[10px] text-slate-550 leading-normal">
                    This measures total attempts. Missing clicks resets your streak, decreasing total potential score.
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-slate-950 p-4 rounded border border-slate-900">
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-900 pb-2 mb-3">
                    SWARM SORTING BREAKDOWN
                  </h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-550">Critical Red Hits:</span>
                      <span className="text-red-400 font-bold">{analytics.criticalHits}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-550">Standard Blue Hits:</span>
                      <span className="text-blue-400 font-bold">{analytics.standardHits}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-550">Decoy Yellow Click Penalties:</span>
                      <span className="text-yellow-500 font-bold">{analytics.decoyClicks}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-550">Targets Expired:</span>
                      <span className="text-slate-450 font-bold">{analytics.expiredTargets}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Coach Performance Diagnosis */}
            <div className="bg-[#080d1a] border border-slate-800 rounded-lg p-5 mb-8 text-left shadow-inner">
              <h3 className="text-xs font-bold text-blue-400 font-mono uppercase tracking-widest border-b border-slate-800 pb-2 mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-500 animate-pulse" />
                AI DECISION DIAGNOSTIC
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs leading-relaxed text-slate-350">
                <div className="space-y-2 border-r border-slate-900 pr-6">
                  <p className="font-bold text-white uppercase text-[10px] tracking-wider font-mono">Sorting Index Analysis:</p>
                  <ul className="space-y-2 list-disc pl-4">
                    {analytics.criticalHits >= 15 ? (
                      <li className="text-green-400">🔥 Elite Prioritization: Excellent focus on high-priority targets. Great eye alignment.</li>
                    ) : (
                      <li className="text-slate-450">👤 Target Neglect: You are leaving too many Red targets to decay. Speed up your prioritization scanning!</li>
                    )}
                    {analytics.decoyClicks >= 3 ? (
                      <li className="text-yellow-400">🚨 Tunnel Vision: High decoy click rate. You are flicking instantly to any motion. Filter out yellow targets.</li>
                    ) : (
                      <li className="text-green-400">🔥 Superb Visual Filtering: Zero or minimal decoy trap click errors. Excellent eye focus.</li>
                    )}
                  </ul>
                </div>
                <div className="space-y-3 flex flex-col justify-between">
                  <div>
                    <p className="font-bold text-white uppercase text-[10px] tracking-wider font-mono mb-1">Prescribed Swarm Routine:</p>
                    <p className="text-slate-350 leading-relaxed font-sans">
                      {analytics.decoyClicks > 2 ? (
                        "Slow down your clicks slightly to filters visual cues. Do not shoot immediately when seeing yellow movement. Build a rhythm of matching color to flick coordinates."
                      ) : (
                        "Excellent visual filtering speed. Practice keeping a higher combo streak by prioritizing red targets sequentially to take advantage of points scaling!"
                      )}
                    </p>
                  </div>
                  <div className="pt-1">
                    <span className="inline-block bg-blue-950/40 text-blue-400 px-3 py-1.5 rounded text-[10px] font-mono font-bold uppercase border border-blue-500/20 shadow-md">
                      SWARM INDEX SCORE: {Math.round(score * (analytics.accuracy / 100))} INDEX PTS
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center border-t border-slate-900 pt-6">
              <button
                onClick={startGame}
                className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition"
              >
                <RefreshCw className="w-4.5 h-4.5" />
                Train Again
              </button>
              <Link href="/drills/fps" className="w-full sm:w-auto">
                <button
                  className="w-full px-6 py-2.5 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-350 font-bold rounded-lg text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition"
                >
                  Return to Sector HQ
                </button>
              </Link>
            </div>
          </div>
          </div>
        )}

      </div>
    </div>
  );
}
