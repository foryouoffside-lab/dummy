'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { COACHES, getActiveCoach, getCoachResponse, speakCoachText, handleCoachFeedback } from '../../../../lib/coachVoice';
import Link from 'next/link';
import { recordDrillResult } from '../../../../lib/performanceTelemetry';
import { getAdaptiveParams } from '../../../../lib/adaptiveDifficulty';

import { 
  Target, Zap, Trophy, Heart, 
  Volume2, VolumeX, Maximize2, Minimize2,
  Info, Activity, Check, Crosshair,
  AlertCircle, RefreshCw, Home, ChevronRight, Calculator, Sparkles,
  Play, Award
} from 'lucide-react';

const DRILL_DURATION = 60;
const TRACK_RADIUS = 12; // compact S+ tracking hitbox

export default function EvasiveSlideTrackClient() {
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

  const [gameState, setGameState] = useState('start');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(DRILL_DURATION);
  const [accuracy, setAccuracy] = useState(100); // tracking coherence percentage
  const [pointerLocked, setPointerLocked] = useState(false);

  const [dpi, setDpi] = useState(800);
  const [inGameSens, setInGameSens] = useState(1.2); // higher default tracking sens
  const [gameType, setGameType] = useState('apex'); // apex, overwatch, cod
  const [cmPer360, setCmPer360] = useState(0);
  const sensitivityMultiplierRef = useRef(1);

  // Target physics
  const targetPos = useRef({ x: 400, y: 225 });
  const targetVel = useRef({ x: 280, y: 0 });
  const targetState = useRef('gliding'); // gliding, sliding, jumping
  const lastStateChangeRef = useRef(0);
  const lastVelocitySwapRef = useRef(0);
  const slideAccelerationRef = useRef(0);
  const jumpTimeRef = useRef(0);

  // Recoil shake simulation
  const isFiring = useRef(false);
  const recoilOffset = useRef({ x: 0, y: 0 });

  // Telemetry logs
  const [analyticsData, setAnalyticsData] = useState({
    trackingTicks: 0,
    totalTicks: 0,
    stabilityIndex: 0, // RMSE deviation
    adjustLatency: 0, // reaction time to track direction swaps (ms)
  });

  const virtualCrosshair = useRef({ x: 0, y: 0 });
  const canvasSizeRef = useRef({ width: 800, height: 450 });
  const scoreRef = useRef(0);
  const timerIntervalRef = useRef(null);
  const isActiveRef = useRef(false);
  const gameStateRef = useRef('start');
  const audioCtxRef = useRef(null);
  const timeLeftRef = useRef(DRILL_DURATION);
  
  const trackingTicksRef = useRef(0);
  const totalTicksRef = useRef(0);
  const deviationsRef = useRef([]);
  const directionSwapsRef = useRef([]); // timestamps of direction swaps
  const lastAdjustTimesRef = useRef([]); // reaction delays to re-lock

  // Snap tracking
  const crosshairInitializedRef = useRef(false);
  
  // Feed overlay state
  const feedbacksRef = useRef([]);
  const [feedbacks, setFeedbacks] = useState([]);

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


  
  

  // TTS speech helper
  

  useEffect(() => {
    try {
      const s = localStorage.getItem('evasiveTrackBestScore');
      if (s) {
        const p = parseInt(s, 10);
        if (!isNaN(p)) setBestScore(p);
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

    // Warm up speech synthesis voices
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.getVoices();
    }
  }, []);

  useEffect(() => { gameStateRef.current = gameState; }, [gameState]);

  // Sensitivity math
  useEffect(() => {
    const yaw = GAME_YAWS[gameType] || 0.07;
    const counts = 360 / (yaw * inGameSens);
    const inches = counts / dpi;
    const cm = inches * 2.54;
    setCmPer360(cm.toFixed(1));
    sensitivityMultiplierRef.current = 50.0 / cm;
  }, [dpi, inGameSens, gameType]);

  const showFeedbackText = useCallback((text, type) => {
    const id = Math.random().toString(36).substr(2, 9);
    feedbacksRef.current.push({ id, text, type });
    setFeedbacks([...feedbacksRef.current]);
    
    setTimeout(() => {
      feedbacksRef.current = feedbacksRef.current.filter(f => f.id !== id);
      setFeedbacks([...feedbacksRef.current]);
    }, 1200);
  }, []);

  const initAudio = useCallback(() => {
    try {
      if (!audioCtxRef.current) audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      if (audioCtxRef.current.state === 'suspended') audioCtxRef.current.resume();
      return audioCtxRef.current;
    } catch (e) { return null; }
  }, []);

  const playSound = useCallback((type) => {
    if (!soundEnabled) return;
    try {
      const ctx = initAudio(); if (!ctx) return;
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.connect(g); g.connect(ctx.destination);
      const now = ctx.currentTime;
      const f = { success: 900, fail: 200, combo: 1300, penalty: 100 };
      o.frequency.setValueAtTime(f[type] || 440, now);
      g.gain.setValueAtTime(type==='combo'?0.05:type==='penalty'?0.1:0.04, now);
      g.gain.exponentialRampToValueAtTime(0.001, now+0.1);
      o.start(now); o.stop(now+0.1);
    } catch (e) {}
  }, [soundEnabled, initAudio]);

  const updateBestScore = useCallback((fs) => {
    try {
      const c = parseInt(localStorage.getItem('evasiveTrackBestScore') || '0', 10);
      if (fs > c) {
        localStorage.setItem('evasiveTrackBestScore', fs.toString());
        setBestScore(fs);
      }
    } catch (e) {}
  }, []);

  const resetGame = useCallback(() => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    isActiveRef.current = false;
    setGameState('start'); gameStateRef.current = 'start';
    crosshairInitializedRef.current = false;
    isFiring.current = false;
    if (document.pointerLockElement) {
      document.exitPointerLock();
    }
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      const active = !!document.fullscreenElement;
      setIsFullscreen(active);
      if (!active && gameStateRef.current === 'playing') {
        resetGame();
      }
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, [resetGame]);

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
      } else if (gameStateRef.current === 'playing') {
        showFeedbackText('CURSOR UNLOCKED - Click Canvas to Lock', 'warn');
        speakText('Cursor unlocked, click to lock raw input');
      }
    };
    document.addEventListener('pointerlockchange', handlePointerLockChange);
    return () => document.removeEventListener('pointerlockchange', handlePointerLockChange);
  }, [showFeedbackText, speakText]);

  // Pointer lock mouse input
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (document.pointerLockElement !== canvasRef.current || !isActiveRef.current) return;
      
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

  // Firing action (left click down / up)
  useEffect(() => {
    const handleMouseDown = (e) => {
      if (document.pointerLockElement !== canvasRef.current || gameStateRef.current !== 'playing') return;
      if (e.button === 0) isFiring.current = true;
    };
    const handleMouseUp = (e) => {
      if (e.button === 0) isFiring.current = false;
    };
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const endGame = useCallback(() => {
    setGameState('gameOver');
    gameStateRef.current = 'gameOver';
    isActiveRef.current = false;
    updateBestScore(scoreRef.current);
    // Record telemetry for AI coaching system
    try {
      recordDrillResult('evasive-slide-track', {
        score: scoreRef.current,
        accuracy: accuracy,
        reactionTimeMs: null,
        trackingAccuracy: null,
        comboMax: 0,
        overshoots: 0,
        undershoots: 0,
        sensitivity: inGameSens,
        dpi,
        gameType,
        duration: DRILL_DURATION
      });
    } catch (e) {}

    if (document.pointerLockElement) {
      document.exitPointerLock();
    }

    const coherence = totalTicksRef.current > 0 ? Math.round((trackingTicksRef.current / totalTicksRef.current) * 100) : 100;
    const stability = analyticsData.stabilityIndex;
    const adjustLatency = analyticsData.adjustLatency;

    let diagnoseText = `Evasive tracking complete. Final score is ${scoreRef.current}. `;
    if (coherence >= 65) {
      diagnoseText += "Your tracking coherence is exceptional. S-plus level. ";
    } else {
      diagnoseText += `Your tracking coherence is ${coherence} percent. You are lacking smooth arm sweep control. `;
    }

    if (stability <= 15) {
      diagnoseText += "Your mouse grip is highly stable under recoil shake.";
    } else {
      diagnoseText += `You have high correction jitter of ${stability} pixels. Relax your wrist grip or lower in-game sensitivity.`;
    }

    speakText(diagnoseText, true);
  }, [updateBestScore, analyticsData, speakText]);

  const startTimer = useCallback(() => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    timerIntervalRef.current = setInterval(() => {
      if (gameStateRef.current === 'playing' && isActiveRef.current) {
        timeLeftRef.current -= 1;
        setTimeLeft(timeLeftRef.current);
        if (timeLeftRef.current <= 0) {
          clearInterval(timerIntervalRef.current);
          timerIntervalRef.current = null;
          endGame();
        }
      }
    }, 1000);
  }, [endGame]);

  const startGame = useCallback(() => {
    // Get adaptive difficulty parameters
    const adaptive = getAdaptiveParams('evasive-slide-track');

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
    
    setGameState('playing'); gameStateRef.current = 'playing';
    setScore(0);
    timeLeftRef.current = DRILL_DURATION; setTimeLeft(DRILL_DURATION);
    setAccuracy(100);
    isActiveRef.current = true; scoreRef.current = 0;
    
    trackingTicksRef.current = 0;
    totalTicksRef.current = 0;
    deviationsRef.current = [];
    directionSwapsRef.current = [];
    lastAdjustTimesRef.current = [];
    isFiring.current = false;
    crosshairInitializedRef.current = false;

    setAnalyticsData({ trackingTicks: 0, totalTicks: 0, stabilityIndex: 0, adjustLatency: 0 });
    
    targetPos.current = { x: 400, y: 225 };
    targetVel.current = { x: 300, y: 0 };
    targetState.current = 'gliding';
    lastStateChangeRef.current = performance.now();
    lastVelocitySwapRef.current = performance.now();

    // Vocal welcome instructions
    speakText("Initiating S-plus evasive slide tracking. Maintain cursor lock on fast slide dashes. Hold left click to simulate recoil control.", true);

    startTimer();
  }, [startTimer, speakText]);

  // Main game logic loop
  useEffect(() => {
    if (gameState !== 'playing') return;
    const cvs = canvasRef.current; if (!cvs) return;
    const ctx = cvs.getContext('2d', { alpha: false });

    const updateSize = () => {
      const cr = containerRef.current; if (!cr) return;
      const rr = cr.getBoundingClientRect();
      let w = rr.width, h = w * (9/16);
      if (h > rr.height) { h = rr.height; w = h * (16/9); }
      
      cvs.width = w; cvs.height = h;
      cvs.style.width = `${w}px`;
      cvs.style.height = `${h}px`;
      canvasSizeRef.current = { width: w, height: h };
      cvs.style.position = 'absolute';
      cvs.style.left = `${(rr.width - w)/2}px`;
      cvs.style.top = `${(rr.height - h)/2}px`;
      
      if (w > 0 && h > 0 && (!crosshairInitializedRef.current || (virtualCrosshair.current.x === 0 && virtualCrosshair.current.y === 0))) {
        virtualCrosshair.current = { x: w / 2, y: h / 2 };
        crosshairInitializedRef.current = true;
      }
    };
    
    updateSize();
    window.addEventListener('resize', updateSize);
    
    let lt = performance.now();

    function draw(ct) {
      if (!isActiveRef.current) { animationRef.current = requestAnimationFrame(draw); return; }
      
      const dt = Math.min(0.05, (ct - lt) / 1000);
      lt = ct;

      // 1. Recoil shake simulation
      if (isFiring.current) {
        recoilOffset.current.x = (Math.random() - 0.5) * 4; // visual bounce
        recoilOffset.current.y = (Math.random() - 0.5) * 4;
      } else {
        recoilOffset.current.x *= 0.8;
        recoilOffset.current.y *= 0.8;
      }

      // 2. Target Movement Physics (Apex Legends evasive styles)
      const state = targetState.current;
      const stateDuration = ct - lastStateChangeRef.current;
      
      // Evasive State Changes
      if (stateDuration > 1400) {
        // Change state randomly: gliding (50%), sliding (30%), jumping (20%)
        const roll = Math.random();
        if (roll < 0.5) {
          targetState.current = 'gliding';
          targetVel.current.y = (Math.random() - 0.5) * 120; // gentle glide pitch
        } else if (roll < 0.8) {
          // Slide boost: sudden acceleration horizontal
          targetState.current = 'sliding';
          slideAccelerationRef.current = (targetVel.current.x > 0 ? 1 : -1) * 800; // rapid push
          playSound('success'); if (typeof checkSensitivityAdjustment === 'function') checkSensitivityAdjustment('hit'); if (typeof checkSensitivityAdjustment === 'function') checkSensitivityAdjustment('hit'); // visual slide warning
          speakText("Target sliding!");
        } else {
          // Jump pad launch: vertical boost
          targetState.current = 'jumping';
          targetVel.current.y = -420; // launch up
          jumpTimeRef.current = 0;
          playSound('combo');
          speakText("Target jumping!");
        }
        lastStateChangeRef.current = ct;
      }

      // Direction Swap Interval (Abrupt direction flips)
      const timeSinceVelSwap = ct - lastVelocitySwapRef.current;
      if (timeSinceVelSwap > (Math.random() * 400 + 400)) { // every 400-800ms
        // Flip horizontal velocity direction
        targetVel.current.x = (targetVel.current.x > 0 ? -1 : 1) * (Math.random() * 100 + 260);
        lastVelocitySwapRef.current = ct;
        directionSwapsRef.current.push({ time: ct, targetX: targetPos.current.x });
        speakText("Direction swap!");
      }

      // Physics integration
      if (targetState.current === 'sliding') {
        // Slide decay
        targetVel.current.x += slideAccelerationRef.current * dt;
        slideAccelerationRef.current *= 0.92; // slide friction
      } else if (targetState.current === 'jumping') {
        // Gravity influence
        targetVel.current.y += 850 * dt; // gravity constant
      } else {
        // Gliding deceleration towards standard speed
        const speed = Math.abs(targetVel.current.x);
        if (speed > 350) targetVel.current.x *= 0.95;
      }

      targetPos.current.x += targetVel.current.x * dt;
      targetPos.current.y += targetVel.current.y * dt;

      // Screen boundary bounces
      const radius = 18;
      if (targetPos.current.x < radius) {
        targetPos.current.x = radius;
        targetVel.current.x *= -1;
        lastVelocitySwapRef.current = ct;
        directionSwapsRef.current.push({ time: ct, targetX: targetPos.current.x });
      } else if (targetPos.current.x > cvs.width - radius) {
        targetPos.current.x = cvs.width - radius;
        targetVel.current.x *= -1;
        lastVelocitySwapRef.current = ct;
        directionSwapsRef.current.push({ time: ct, targetX: targetPos.current.x });
      }

      // Vertical bounce
      if (targetPos.current.y < radius) {
        targetPos.current.y = radius;
        targetVel.current.y *= -1;
      } else if (targetPos.current.y > cvs.height - 40 - radius) {
        targetPos.current.y = cvs.height - 40 - radius;
        targetVel.current.y = 0;
        targetState.current = 'gliding';
      }

      // 3. Render Canvas
      ctx.fillStyle = "#020306";
      ctx.fillRect(0, 0, cvs.width, cvs.height);

      // Fine grid layout
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.015)';
      ctx.lineWidth = 1;
      for (let i = 0; i < cvs.width; i += 30) {
        ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, cvs.height); ctx.stroke();
      }
      for (let j = 0; j < cvs.height; j += 30) {
        ctx.beginPath(); ctx.moveTo(0, j); ctx.lineTo(cvs.width, j); ctx.stroke();
      }

      // Draw sliding track floor
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.1)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, cvs.height - 40);
      ctx.lineTo(cvs.width, cvs.height - 40);
      ctx.stroke();

      // Render Target (Evasive Sphere)
      const tx = targetPos.current.x + recoilOffset.current.x;
      const ty = targetPos.current.y + recoilOffset.current.y;

      ctx.save();
      ctx.beginPath();
      ctx.arc(tx, ty, TRACK_RADIUS, 0, Math.PI * 2);
      
      // Dynamic shading based on state
      let glowColor = "#3b82f6";
      if (targetState.current === 'sliding') {
        glowColor = "#e11d48"; // red glow for slides
      } else if (targetState.current === 'jumping') {
        glowColor = "#fbbf24"; // amber glow for jump launches
      }

      ctx.fillStyle = glowColor;
      ctx.shadowBlur = 12;
      ctx.shadowColor = glowColor;
      ctx.fill();
      ctx.restore();

      // Render Virtual Crosshair
      const ch = virtualCrosshair.current;
      
      // Calculate tracking deviation
      const dev = Math.hypot(ch.x - tx, ch.y - ty);
      const isTracking = dev <= TRACK_RADIUS;

      // Track telemetry ticks
      totalTicksRef.current += 1;
      deviationsRef.current.push(dev);

      if (isTracking) {
        trackingTicksRef.current += 1;
        scoreRef.current += isFiring.current ? 4 : 1; // bonus score for active fire tracking
        if (typeof checkSensitivityAdjustment === 'function') checkSensitivityAdjustment('hit');
      } else {
        if (typeof checkSensitivityAdjustment === 'function') checkSensitivityAdjustment('tracking_tick', { isLocked: false, dist: dev, targetSize: TRACK_RADIUS, target: { vx: targetVel.current.x, vy: targetVel.current.y } });
      }

      // Analyze Reaction Latency to direction swaps
      directionSwapsRef.current.forEach((swap, idx) => {
        if (swap.processed) return;
        
        // Check if player cursor catches up to target direction swap (inside target within 600ms)
        const timeDiff = ct - swap.time;
        if (timeDiff > 0 && timeDiff < 600 && dev <= TRACK_RADIUS * 1.5) {
          lastAdjustTimesRef.current.push(timeDiff);
          swap.processed = true;
        } else if (timeDiff >= 600) {
          // Missed adjustment window
          swap.processed = true;
        }
      });

      // Update score display
      setScore(Math.floor(scoreRef.current));
      
      // Live Coherence
      const coherence = totalTicksRef.current > 0 ? Math.round((trackingTicksRef.current / totalTicksRef.current) * 100) : 100;
      setAccuracy(coherence);

      // Render compact pointer locked crosshair
      if (ch.x > 0 && ch.x < cvs.width && ch.y > 0 && ch.y < cvs.height) {
        ctx.strokeStyle = isTracking ? "#00ff88" : "#fbbf24";
        ctx.lineWidth = 1.2;
        const gap = 3;
        const len = 3;
        ctx.beginPath();
        ctx.moveTo(ch.x-gap-len, ch.y); ctx.lineTo(ch.x-gap, ch.y);
        ctx.moveTo(ch.x+gap, ch.y); ctx.lineTo(ch.x+gap+len, ch.y);
        ctx.moveTo(ch.x, ch.y-gap-len); ctx.lineTo(ch.x, ch.y-gap);
        ctx.moveTo(ch.x, ch.y+gap); ctx.lineTo(ch.x, ch.y+gap+len);
        ctx.stroke();

        ctx.fillStyle = isTracking ? "#00ff88" : "#fbbf24";
        ctx.beginPath(); ctx.arc(ch.x, ch.y, 1.0, 0, Math.PI*2); ctx.fill();
      }

      if (!pointerLocked) {
        ctx.fillStyle = 'rgba(8, 13, 26, 0.9)';
        ctx.fillRect(cvs.width / 2 - 190, cvs.height / 2 - 25, 380, 50);
        ctx.strokeStyle = '#3b82f6';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(cvs.width / 2 - 190, cvs.height / 2 - 25, 380, 50);
        
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 11px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('CLICK CANVAS TO CAPTURE RAW MOUSE INPUT', cvs.width / 2, cvs.height / 2 + 4);
      }

      // Background task updates stats at 3Hz
      if (totalTicksRef.current % 20 === 0) {
        // Calculate RMSE Stability
        const sumSquare = deviationsRef.current.reduce((a, b) => a + b * b, 0);
        const rmse = Math.sqrt(sumSquare / deviationsRef.current.length);

        // Average adjust latency
        const avgAdjust = lastAdjustTimesRef.current.length > 0 
          ? Math.round(lastAdjustTimesRef.current.reduce((a, b) => a + b, 0) / lastAdjustTimesRef.current.length) 
          : 0;

        setAnalyticsData({
          trackingTicks: trackingTicksRef.current,
          totalTicks: totalTicksRef.current,
          stabilityIndex: Math.round(rmse),
          adjustLatency: avgAdjust
        });
      }

      animationRef.current = requestAnimationFrame(draw);
    }

    animationRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', updateSize);
    };
  }, [gameState, pointerLocked, speakText]);

  return (
    <div ref={pageRef} className="min-h-screen select-none font-mono bg-[#080d1a] text-slate-100 relative overflow-hidden">
      
      {/* Background patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-950/20 via-[#080d1a] to-[#080d1a] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,_transparent_1px),_linear-gradient(90deg,_rgba(59,130,246,0.03)_1px,_transparent_1px)] bg-[size:30px_30px] pointer-events-none z-0" />

      <div className={`${isFullscreen ? 'w-full h-screen p-0 m-0' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'} relative z-10`}>
        
        {!isFullscreen && (
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-2 text-[10px] text-slate-400 uppercase tracking-widest">
              <li><Link href="/" className="hover:text-blue-400 transition-colors"><Home className="w-3.5 h-3.5" /></Link></li>
              <li><ChevronRight className="w-3 h-3 text-slate-700" /></li>
              <li><Link href="/drills/fps" className="hover:text-blue-400 transition-colors">FPS Sector</Link></li>
              <li><ChevronRight className="w-3 h-3 text-slate-700" /></li>
              <li><span className="text-blue-400 font-bold">S+ Evasive Slide & Track</span></li>
            </ol>
          </nav>
        )}

        {!isFullscreen && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 border-b border-slate-900 pb-5">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-950/30 border border-blue-500/25 text-blue-500 rounded-xl shadow-lg shadow-blue-500/10">
                <Target className="w-7 h-7 animate-pulse text-blue-500" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white uppercase bg-gradient-to-r from-blue-500 via-white to-slate-400 bg-clip-text text-transparent">
                  S+ Evasive Slide & Track
                </h1>
                <p className="text-xs text-slate-400 tracking-wider mt-0.5 animate-pulse">
                  {pointerLocked ? '🟢 COHERENCE SCANNER RESOLVED' : '🔴 LOCK-ON ENGAGEMENT REQUIRED'} • {cmPer360} cm/360 • APEX PHYSICS
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Start Game Lobby Screen */}
        {gameState === 'start' && (
          <div className="absolute inset-0 bg-[#080d1a]/95 flex items-center justify-center p-6 z-30 overflow-y-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl">
              
              <div className="lg:col-span-1 bg-[#0c1224]/80 border border-slate-900 rounded-xl p-6 flex flex-col justify-between backdrop-blur-md">
                <div>
                  <h3 className="text-sm font-bold text-blue-400 mb-4 flex items-center gap-2 border-b border-slate-900 pb-2">
                    <Info className="w-4 h-4" />
                    APEX/WARZONE SPECS
                  </h3>
                  <ul className="space-y-4 text-xs leading-relaxed text-slate-400">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 font-bold">1.</span>
                      <span>Target performs slide dashes (red) and jump-pad arcs (yellow).</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 font-bold">2.</span>
                      <span>Hold left mouse button (fire) while tracking to gain 4x score ticks. Firing triggers recoil viewport shake.</span>
                    </li>
                    <li className="flex items-start gap-2 text-blue-300">
                      <span className="text-blue-400 font-bold">★</span>
                      <span>Tests sub-pixel smooth pursuit coherence and direction swap react adjusting.</span>
                    </li>
                  </ul>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-900 flex justify-between items-center text-[10px]">
                  <span className="text-slate-550 uppercase">Voice Feedback:</span>
                  <button 
                    onClick={() => setVoiceEnabled(!voiceEnabled)} 
                    className={`px-3 py-1 rounded text-[10px] font-bold uppercase transition ${voiceEnabled ? 'bg-green-950 text-green-400 border border-green-500/30' : 'bg-slate-900 text-slate-550 border border-slate-800'}`}
                  >
                    {voiceEnabled ? 'SPEAK_ON' : 'SPEAK_OFF'}
                  </button>
                </div>
              </div>

              <div className="lg:col-span-2 bg-[#0c1224]/80 border border-slate-900 rounded-xl p-6 backdrop-blur-md flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2 border-b border-slate-900 pb-2">
                    <Calculator className="w-4 h-4 text-blue-400" />
                    CALIBRATE TRACKING
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    <div>
                      <label className="block text-[9px] text-slate-400 font-bold uppercase tracking-wider mb-2">Esport Setup</label>
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
                        step="0.01"
                        value={inGameSens}
                        onChange={(e) => setInGameSens(Math.max(0.001, parseFloat(e.target.value) || 0.1))}
                        className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-2 text-xs text-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] text-slate-400 font-bold uppercase tracking-wider mb-2">Mouse DPI</label>
                      <input 
                        type="number"
                        step="50"
                        value={dpi}
                        onChange={(e) => setDpi(Math.max(100, parseInt(e.target.value, 10) || 800))}
                        className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-2 text-xs text-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="p-4 bg-slate-950 rounded border border-slate-900 flex justify-between items-center text-xs">
                    <div>
                      <span className="text-[10px] text-slate-550 block uppercase">360 Sweep Distance</span>
                      <span className="text-white font-bold">{cmPer360} cm / 360°</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-slate-550 block uppercase">S+ Target Size</span>
                      <span className="text-blue-400 font-bold">{TRACK_RADIUS} px</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex flex-col sm:flex-row gap-4 items-center justify-between border-t border-slate-900 pt-6">
                  <div>
                    <span className="text-[10px] text-slate-550 block uppercase">Personal Record</span>
                    <span className="text-white font-bold text-lg flex items-center gap-1.5">
                      <Trophy className="w-4 h-4 text-yellow-500" />
                      {bestScore} PTS
                    </span>
                  </div>
                  <button
                    onClick={startGame}
                    className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 uppercase tracking-wider transition animate-pulse"
                  >
                    <Play className="w-4 h-4 fill-white" />
                    Enter S+ Fullscreen Sandbox
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Active gameplay container */}
        <div className={isFullscreen ? "w-full h-full" : "block"}>
          <div 
            ref={containerRef} 
            className={isFullscreen 
              ? "w-full h-full bg-[#020306] relative overflow-hidden flex items-center justify-center" 
              : "w-full aspect-video min-h-[400px] lg:min-h-[500px] bg-[#020306] border border-slate-800 rounded-xl relative overflow-hidden flex items-center justify-center"}
          >
            <canvas ref={canvasRef} onClick={handleCanvasClick} />

            {/* S+ Pro Coach Dynamic Audio Guidance HUD & Alerts (Visual Text Hidden) */}


            {/* S+ Pro Coach Dynamic Audio Guidance HUD & Alerts (Visual Text Hidden) */}

            
            {/* Feed notifications */}
            <div className="absolute inset-0 pointer-events-none flex flex-col justify-center items-center gap-2 overflow-hidden select-none z-10">
              {feedbacks.map((f) => (
                <div 
                  key={f.id} 
                  className={`px-5 py-2.5 rounded border text-sm font-extrabold animate-bounce shadow-lg uppercase tracking-wider backdrop-blur-sm ${
                    f.type === 'success' 
                      ? 'bg-green-950/90 border-green-500/30 text-green-400' 
                      : f.type === 'warn'
                        ? 'bg-yellow-950/90 border-yellow-500/30 text-yellow-400'
                        : 'bg-red-950/90 border-red-500/30 text-red-400'
                  }`}
                >
                  {f.text}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 text-center text-[10px] text-slate-550 flex items-center justify-center gap-4">
            <span>🖱 Hold left click (fire) while tracking target to maximize score. Recoil shake applies.</span>
            <span>• Press <kbd className="px-1.5 py-0.5 bg-slate-900 border border-slate-800 text-slate-350 rounded font-sans text-[10px]">ESC</kbd> to unlock.</span>
          </div>
        </div>

        {/* Game Over Screen */}
        {gameState === 'gameOver' && (
          <div className="absolute inset-0 bg-[#080d1a]/95 flex items-center justify-center p-6 z-30 overflow-y-auto">
            <div className="bg-[#0c1224]/85 border border-blue-500/20 rounded-xl p-8 backdrop-blur-md max-w-3xl mx-auto w-full shadow-2xl">
              <h2 className="text-xl font-bold text-blue-500 text-center mb-6 uppercase tracking-widest flex items-center justify-center gap-2 animate-pulse">
                <Award className="w-5 h-5 text-yellow-500" />
                S+ EVASIVE TRACK RESOLVED
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="space-y-4">
                  <div className="bg-slate-950 p-4 rounded border border-slate-900">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-550 block uppercase">Final Tracking Score:</span>
                      <span className="text-white font-bold text-xl">{score} PTS</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-950 p-3 rounded border border-slate-900 text-center">
                      <span className="text-[10px] text-slate-550 block uppercase">Coherence Acc %</span>
                      <span className="text-white font-bold text-sm">{accuracy}%</span>
                    </div>
                    <div className="bg-slate-950 p-3 rounded border border-slate-900 text-center">
                      <span className="text-[10px] text-slate-550 block uppercase">Swap Delay</span>
                      <span className="text-white font-bold text-sm">{analyticsData.adjustLatency} ms</span>
                    </div>
                  </div>

                  <div className="bg-slate-950 p-4 rounded border border-slate-900">
                    <div className="flex justify-between items-center text-xs mb-1">
                      <span className="text-slate-550 uppercase">Stability Index:</span>
                      <span className="text-blue-400 font-bold">{analyticsData.stabilityIndex} px RMSE</span>
                    </div>
                    <div className="text-[10px] text-slate-550 leading-normal font-mono">
                      Root Mean Square Error of cursor deviation from center. Lower is smoother.
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-slate-950 p-4 rounded border border-slate-900">
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-900 pb-2 mb-3">
                      SMOOTH PURSUIT STATISTICS
                    </h4>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-slate-550">Active Tracking Frames:</span>
                        <span className="text-green-400 font-bold">{analyticsData.trackingTicks}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-550">Total Frames Logged:</span>
                        <span className="text-white font-bold">{analyticsData.totalTicks}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-550">Evasive Direction Flips:</span>
                        <span className="text-yellow-500 font-bold">{directionSwapsRef.current.length}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* S+ Coach Telemetry */}
              <div className="bg-[#080d1a] border border-blue-500/10 rounded-lg p-5 mb-8 text-left shadow-inner">
                <h3 className="text-xs font-bold text-blue-550 font-mono uppercase tracking-widest border-b border-slate-800 pb-2 mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-blue-400 animate-pulse" />
                  S+ AI SMOOTHNESS EVALUATOR
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs leading-relaxed text-slate-350">
                  <div className="space-y-2 border-r border-slate-900 pr-6">
                    <p className="font-bold text-white uppercase text-[10px] tracking-wider font-mono">Smoothness Profile:</p>
                    <ul className="space-y-2 list-disc pl-4">
                      {analyticsData.stabilityIndex <= 15 ? (
                        <li className="text-green-400">🔥 S+ Smooth Pursuit: Extreme glide stability ({analyticsData.stabilityIndex}px deviation). Minimal corrective jitter.</li>
                      ) : (
                        <li className="text-yellow-500">⚠️ Jitter Detected: Your sweeps are shaky ({analyticsData.stabilityIndex}px deviation). Relax your wrist grip.</li>
                      )}
                      {analyticsData.adjustLatency < 200 && analyticsData.adjustLatency > 0 ? (
                        <li className="text-green-400">🔥 Reaction Adjust: Elite redirect speed ({analyticsData.adjustLatency}ms) following slide-swaps.</li>
                      ) : (
                        <li className="text-red-400">⚠️ Direction Lag: Slow adjustment ({analyticsData.adjustLatency}ms) when target flips vector direction.</li>
                      )}
                    </ul>
                  </div>
                  <div className="space-y-3 flex flex-col justify-between">
                    <div>
                      <p className="font-bold text-white uppercase text-[10px] tracking-wider font-mono mb-1">Global Pro Advice:</p>
                      <p className="text-slate-350 font-sans leading-relaxed">
                        {analyticsData.stabilityIndex <= 15
                          ? "Your pursuit accuracy is S+ pro grade. Focus on managing recoil shake while target executes vertical launch sequences."
                          : "To fix shakiness, switch to a smoother speed mousepad, reduce your DPI, or train your forearm sweep instead of wrist pivoting."}
                      </p>
                    </div>
                    <div className="pt-1">
                      <span className="inline-block bg-blue-950/40 text-blue-400 px-3 py-1.5 rounded text-[10px] font-mono font-bold uppercase border border-blue-550/20 shadow-md">
                        S+ PERFORMANCE RANK: {accuracy >= 65 ? "PREDATOR" : accuracy >= 45 ? "DIAMOND" : "GOLD"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Back actions */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center border-t border-slate-900 pt-6">
                <button
                  onClick={startGame}
                  className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition shadow-lg shadow-blue-500/20"
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
