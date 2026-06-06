'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { COACHES, getActiveCoach, getCoachResponse, speakCoachText, handleCoachFeedback } from '../../../../lib/coachVoice';
import { recordDrillResult } from '../../../../lib/performanceTelemetry';
import { getAdaptiveParams } from '../../../../lib/adaptiveDifficulty';
import Link from 'next/link';
import { 
  Target, Zap, Trophy, Heart, 
  Volume2, VolumeX, Maximize2, Minimize2,
  Info, Activity, Check, Crosshair,
  AlertCircle, RefreshCw, Home, ChevronRight, Calculator, Sparkles,
  Play, Award
} from 'lucide-react';

const DRILL_DURATION = 60;

export default function ReactiveSphereTrackingClient() {
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
  const [accuracy, setAccuracy] = useState(100);
  const [bestAccuracy, setBestAccuracy] = useState(0);
  const [combo, setCombo] = useState(0);
  const [bestCombo, setBestCombo] = useState(0);
  const [timeLeft, setTimeLeft] = useState(DRILL_DURATION);
  const [currentSpeed, setCurrentSpeed] = useState(480);
  const [pointerLocked, setPointerLocked] = useState(false);
  const [dpi, setDpi] = useState(800);
  const [inGameSens, setInGameSens] = useState(0.35);
  const [gameType, setGameType] = useState('valorant'); // valorant, cs2, apex, overwatch, fortnite
  const [cmPer360, setCmPer360] = useState(0);
  const sensitivityMultiplierRef = useRef(1);
  const [currentTargetSize, setCurrentTargetSize] = useState(24);

  // Tracking analytics
  const [analyticsData, setAnalyticsData] = useState({
    lockOnStability: 0, // avg deviation in pixels
    reactionDelay: 0, // avg reaction delay to direction changes in ms
    totalTicks: 0,
    onTargetTicks: 0
  });
  
  const targetRef = useRef(null);
  const virtualCrosshair = useRef({ x: 0, y: 0 });
  const canvasSizeRef = useRef({ width: 800, height: 450 });
  const scoreRef = useRef(0);
  const comboRef = useRef(0);
  const bestComboRef = useRef(0);
  const timerIntervalRef = useRef(null);
  const trackingIntervalRef = useRef(null);
  const isActiveRef = useRef(false);
  const gameStateRef = useRef('start');
  const audioCtxRef = useRef(null);
  const timeLeftRef = useRef(DRILL_DURATION);
  const crosshairInitializedRef = useRef(false);
  
  // Evasive timing telemetry
  const lastDirectionChangeTimeRef = useRef(0);
  const nextChangeDelayRef = useRef(600); // randomize change every 400-800ms
  const isAdjustingAfterSwapRef = useRef(false);
  const swapReactionTimeRef = useRef([]);
  const deviationSumRef = useRef(0);
  const deviationCountRef = useRef(0);
  
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



  useEffect(() => {
    try {
      const s = localStorage.getItem('reactiveSphereBestScore');
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
  }, []);
  
  useEffect(() => { gameStateRef.current = gameState; }, [gameState]);

  // Compute sens & game profiles
  useEffect(() => {
    const yaw = GAME_YAWS[gameType] || 0.07;
    const counts = 360 / (yaw * inGameSens);
    const inches = counts / dpi;
    const cm = inches * 2.54;
    setCmPer360(cm.toFixed(1));
    
    sensitivityMultiplierRef.current = 45.0 / cm;
    
    // Set target size
    if (gameType === 'valorant' || gameType === 'cs2') {
      setCurrentTargetSize(18); // small head targets
    } else if (gameType === 'apex') {
      setCurrentTargetSize(28); // medium body targets
    } else {
      setCurrentTargetSize(24);
    }
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
      const f = { tick: 980, swap: 1100, combo: 1500 }; 
      o.frequency.setValueAtTime(f[type] || 440, now); 
      g.gain.setValueAtTime(type==='combo'?0.1:0.06, now); 
      g.gain.exponentialRampToValueAtTime(0.001, now+0.08); 
      o.start(now); o.stop(now+0.08); 
    } catch (e) {} 
  }, [soundEnabled, initAudio]);

  const updateBestScore = useCallback((fs) => { 
    try { 
      const c = parseInt(localStorage.getItem('reactiveSphereBestScore') || '0', 10); 
      if (fs > c) { 
        localStorage.setItem('reactiveSphereBestScore', fs.toString()); 
        setBestScore(fs); 
      } 
    } catch (e) {} 
  }, []);

  const resetGame = useCallback(() => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (trackingIntervalRef.current) clearInterval(trackingIntervalRef.current);
    isActiveRef.current = false;
    setGameState('start'); gameStateRef.current = 'start';
    targetRef.current = null;
    crosshairInitializedRef.current = false;
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
      setPointerLocked(document.pointerLockElement === canvasRef.current);
      if (document.pointerLockElement === canvasRef.current) {
        crosshairInitializedRef.current = true;
      }
    };
    document.addEventListener('pointerlockchange', handlePointerLockChange);
    return () => document.removeEventListener('pointerlockchange', handlePointerLockChange);
  }, []);

  // Mouse movement input mapping
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (document.pointerLockElement !== canvasRef.current || !isActiveRef.current) return;
      
      const sens = sensitivityMultiplierRef.current;
      virtualCrosshair.current.x += (e.movementX || 0) * sens;
      virtualCrosshair.current.y += (e.movementY || 0) * sens;
      
      const cvs = canvasRef.current;
      if (cvs) {
        virtualCrosshair.current.x = Math.max(0, Math.min(cvs.width, virtualCrosshair.current.x));
        virtualCrosshair.current.y = Math.max(0, Math.min(cvs.height, virtualCrosshair.current.y));
      }
    };
    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const changeSphereVelocity = (target, speed) => {
    // Evade in random 2D angles
    const angle = Math.random() * Math.PI * 2;
    target.vx = Math.cos(angle) * speed;
    target.vy = Math.sin(angle) * speed;
    lastDirectionChangeTimeRef.current = performance.now();
    nextChangeDelayRef.current = 400 + Math.random() * 400; // 400-800ms
    isAdjustingAfterSwapRef.current = true;
  };

  const spawnSphere = (cvs) => {
    const t = {
      radius: currentTargetSize,
      x: cvs.width / 2,
      y: cvs.height / 2,
      vx: 0,
      vy: 0
    };
    changeSphereVelocity(t, currentSpeed);
    return t;
  };

  // Tracking evaluation interval loop (every 100ms)
  useEffect(() => {
    if (gameState !== 'playing') {
      if (trackingIntervalRef.current) clearInterval(trackingIntervalRef.current);
      return;
    }
    
    trackingIntervalRef.current = setInterval(() => {
      if (!isActiveRef.current || !crosshairInitializedRef.current || !targetRef.current) return;
      
      const t = targetRef.current;
      const ch = virtualCrosshair.current;
      const dist = Math.hypot(ch.x - t.x, ch.y - t.y);
      const now = performance.now();
      
      deviationSumRef.current += dist;
      deviationCountRef.current += 1;
      
      setAnalyticsData(prev => ({
        ...prev,
        totalTicks: prev.totalTicks + 1,
        lockOnStability: Math.round(deviationSumRef.current / deviationCountRef.current)
      }));
      
      // Target hit evaluation
      if (dist <= t.radius) { if (typeof checkSensitivityAdjustment === 'function') checkSensitivityAdjustment('hit'); if (typeof checkSensitivityAdjustment === 'function') checkSensitivityAdjustment('hit');
        scoreRef.current += 10;
        setScore(scoreRef.current);
        
        comboRef.current += 1;
        setCombo(comboRef.current);
        
        setAnalyticsData(prev => ({ ...prev, onTargetTicks: prev.onTargetTicks + 1 }));
        
        if (comboRef.current > bestComboRef.current) {
          bestComboRef.current = comboRef.current;
          setBestCombo(comboRef.current);
        }
        
        if (comboRef.current % 15 === 0) {
          playSound('combo');
          showFeedbackText(`🔥 STREAK x${comboRef.current}`, 'success');
        } else {
          playSound('tick');
        }
        
        // Check reaction tracking swap delay
        if (isAdjustingAfterSwapRef.current) {
          const delay = Math.round(now - lastDirectionChangeTimeRef.current);
          swapReactionTimeRef.current.push(delay);
          
          const avgDelay = Math.round(swapReactionTimeRef.current.reduce((a,b) => a+b, 0) / swapReactionTimeRef.current.length);
          setAnalyticsData(prev => ({ ...prev, reactionDelay: avgDelay }));
          
          isAdjustingAfterSwapRef.current = false;
        }
      } else {
        if (typeof checkSensitivityAdjustment === 'function') checkSensitivityAdjustment('tracking_tick', { isLocked: false, dist: dist, targetSize: t.radius, target: t });
        comboRef.current = 0;
        setCombo(0);
      }
      
      // Accuracy percentage evaluation (ticks on target vs total ticks)
      setAnalyticsData(prev => {
        const acc = prev.totalTicks > 0 ? Math.round((prev.onTargetTicks / prev.totalTicks) * 100) : 100;
        setAccuracy(acc);
        setBestAccuracy(prevAcc => Math.max(prevAcc, acc));
        return prev;
      });
      
    }, 100);
    
    return () => {
      if (trackingIntervalRef.current) clearInterval(trackingIntervalRef.current);
    };
  }, [gameState, playSound, showFeedbackText, currentSpeed]);

  const endGame = useCallback(() => {
    setGameState('gameOver');
    gameStateRef.current = 'gameOver';
    isActiveRef.current = false;
    updateBestScore(scoreRef.current);
    if (document.pointerLockElement) {
      document.exitPointerLock();
    }

    // Record telemetry for AI coaching
    try {
      const finalAccuracy = analyticsData.totalTicks > 0 ? Math.round((analyticsData.onTargetTicks / analyticsData.totalTicks) * 100) : 0;
      recordDrillResult('reactive-sphere', {
        score: scoreRef.current,
        accuracy: finalAccuracy,
        reactionTimeMs: analyticsData.reactionDelay || null,
        trackingAccuracy: finalAccuracy,
        comboMax: bestComboRef.current,
        overshoots: 0,
        undershoots: 0,
        sensitivity: inGameSens,
        dpi,
        gameType,
        duration: DRILL_DURATION
      });
    } catch (e) {}
  }, [updateBestScore, inGameSens, dpi, gameType, analyticsData]);

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

  // Main Canvas loop
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
      
      if (!targetRef.current) {
        targetRef.current = spawnSphere(cvs);
      }
    };
    
    updateSize();
    window.addEventListener('resize', updateSize);
    
    let lt = performance.now();
    
    function draw(ct) {
      if (!isActiveRef.current) { animationRef.current = requestAnimationFrame(draw); return; }
      
      let dt = (ct - lt) / 1000;
      lt = ct;
      if (dt > 0.1) dt = 0.1;
      
      ctx.fillStyle = "#05060b";
      ctx.fillRect(0, 0, cvs.width, cvs.height);
      
      // Grid lines
      ctx.strokeStyle = 'rgba(0, 255, 136, 0.015)';
      ctx.lineWidth = 1;
      for (let i = 0; i < cvs.width; i += 40) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, cvs.height); ctx.stroke(); }
      for (let j = 0; j < cvs.height; j += 40) { ctx.beginPath(); ctx.moveTo(0, j); ctx.lineTo(cvs.width, j); ctx.stroke(); }
      
      // Update Physics & Direction swaps
      if (targetRef.current) {
        const t = targetRef.current;
        
        if (ct - lastDirectionChangeTimeRef.current > nextChangeDelayRef.current) {
          changeSphereVelocity(t, currentSpeed);
          playSound('swap');
        }
        
        t.x += t.vx * dt;
        t.y += t.vy * dt;
        
        // Bounce limits
        if (t.x < t.radius) { t.x = t.radius; t.vx *= -1; }
        if (t.x > cvs.width - t.radius) { t.x = cvs.width - t.radius; t.vx *= -1; }
        if (t.y < t.radius) { t.y = t.radius; t.vy *= -1; }
        if (t.y > cvs.height - t.radius) { t.y = cvs.height - t.radius; t.vy *= -1; }
        
        // Draw target sphere
        const ch = virtualCrosshair.current;
        const dist = Math.hypot(ch.x - t.x, ch.y - t.y);
        const onTarget = dist <= t.radius;
        
        ctx.shadowBlur = onTarget ? 15 : 5;
        ctx.shadowColor = onTarget ? "#00ff88" : "#3b82f6";
        
        ctx.fillStyle = onTarget ? "rgba(0, 255, 136, 0.85)" : "rgba(59, 130, 246, 0.75)";
        ctx.beginPath();
        ctx.arc(t.x, t.y, t.radius, 0, Math.PI*2);
        ctx.fill();
        ctx.shadowBlur = 0;
        
        ctx.strokeStyle = onTarget ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.1)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(t.x, t.y, t.radius, 0, Math.PI*2);
        ctx.stroke();
      }
      
      // Draw Reticle
      const ch = virtualCrosshair.current;
      if (ch.x > 0 && ch.x < cvs.width && ch.y > 0 && ch.y < cvs.height) {
        const cc = pointerLocked ? "#00ff88" : "#ffaa00";
        ctx.fillStyle = cc;
        ctx.beginPath(); ctx.arc(ch.x, ch.y, 2, 0, Math.PI*2); ctx.fill();
        
        ctx.strokeStyle = cc;
        ctx.lineWidth = 1.5;
        const gap = 6;
        const len = 5;
        ctx.beginPath();
        ctx.moveTo(ch.x-gap-len, ch.y); ctx.lineTo(ch.x-gap, ch.y);
        ctx.moveTo(ch.x+gap, ch.y); ctx.lineTo(ch.x+gap+len, ch.y);
        ctx.moveTo(ch.x, ch.y-gap-len); ctx.lineTo(ch.x, ch.y-gap);
        ctx.moveTo(ch.x, ch.y+gap); ctx.lineTo(ch.x, ch.y+gap+len);
        ctx.stroke();
      }
      
      if (!pointerLocked) {
        ctx.fillStyle = 'rgba(8, 13, 26, 0.85)';
        ctx.fillRect(cvs.width / 2 - 180, cvs.height / 2 - 25, 360, 50);
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(cvs.width / 2 - 180, cvs.height / 2 - 25, 360, 50);
        
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 11px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('CLICK CANVAS TO CAPTURE RAW MOUSE INPUT', cvs.width / 2, cvs.height / 2 + 4);
      }

      animationRef.current = requestAnimationFrame(draw);
    }
    animationRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', updateSize);
    };
  }, [gameState, pointerLocked, currentSpeed, currentTargetSize]);

  const startGame = useCallback(() => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (trackingIntervalRef.current) clearInterval(trackingIntervalRef.current);

    // Get adaptive difficulty params
    const adaptive = getAdaptiveParams('reactive-sphere');
    
    try {
      const el = pageRef.current;
      if (el && !document.fullscreenElement) {
        el.requestFullscreen().catch((e) => console.warn("Fullscreen request blocked", e));
        setIsFullscreen(true);
      }
    } catch(e) {
      console.warn("Fullscreen request blocked", e);
    }
    
    setAnalyticsData({ lockOnStability: 0, reactionDelay: 0, totalTicks: 0, onTargetTicks: 0 });
    setGameState('playing'); gameStateRef.current = 'playing';
    setScore(0); setAccuracy(100); setBestAccuracy(0); setCombo(0); setBestCombo(0);
    timeLeftRef.current = DRILL_DURATION; setTimeLeft(DRILL_DURATION);
    isActiveRef.current = true; scoreRef.current = 0; comboRef.current = 0; bestComboRef.current = 0;
    targetRef.current = null;
    crosshairInitializedRef.current = false;
    deviationSumRef.current = 0; deviationCountRef.current = 0;
    swapReactionTimeRef.current = [];
    
    // Calibrate speeds based on selected profile (with adaptive multiplier)
    if (gameType === 'valorant' || gameType === 'cs2') {
      setCurrentSpeed(Math.round(380 * adaptive.speedMultiplier));
      setCurrentTargetSize(Math.round(18 * adaptive.targetSizeMultiplier));
    } else if (gameType === 'apex') {
      setCurrentSpeed(Math.round(560 * adaptive.speedMultiplier));
      setCurrentTargetSize(Math.round(28 * adaptive.targetSizeMultiplier));
    } else {
      setCurrentSpeed(Math.round(480 * adaptive.speedMultiplier));
      setCurrentTargetSize(Math.round(24 * adaptive.targetSizeMultiplier));
    }
    
    startTimer();
    
    if (canvasRef.current) {
      try {
        canvasRef.current.requestPointerLock();
      } catch (e) {
        console.warn("Pointer lock blocked", e);
      }
    }
    crosshairInitializedRef.current = true;
  }, [startTimer, requestPointerLock, gameType]);

  return (
    <div ref={pageRef} className="min-h-screen select-none font-mono bg-[#080d1a] text-slate-100 relative overflow-hidden">
      
      {/* Background patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-950/15 via-[#080d1a] to-[#080d1a] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.02)_1px,_transparent_1px),_linear-gradient(90deg,_rgba(59,130,246,0.02)_1px,_transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />
      
      <div className={`${isFullscreen ? 'w-full h-screen p-0 m-0' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'} relative z-10`}>
        
        {!isFullscreen && (
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-2 text-[10px] text-slate-400 uppercase tracking-widest">
              <li><Link href="/" className="hover:text-blue-400 transition-colors"><Home className="w-3.5 h-3.5" /></Link></li>
              <li><ChevronRight className="w-3 h-3 text-slate-700" /></li>
              <li><Link href="/drills/fps" className="hover:text-blue-400 transition-colors">FPS Sector</Link></li>
              <li><ChevronRight className="w-3 h-3 text-slate-700" /></li>
              <li><span className="text-blue-400 font-bold">Reactive Sphere Tracking</span></li>
            </ol>
          </nav>
        )}
        
        {!isFullscreen && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 border-b border-slate-900 pb-5">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-950/30 border border-blue-500/20 text-blue-400 rounded-xl">
                <Target className="w-7 h-7 animate-pulse" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white uppercase bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                  Reactive Sphere Tracking
                </h1>
                <p className="text-xs text-slate-400 tracking-wider mt-0.5">
                  {pointerLocked ? '🟢 RAW INPUT CAPTURING' : '🔴 CLICK CANVAS TO CAPTURE'} • {cmPer360} cm/360 • {gameType.toUpperCase()}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Start Game Screen */}
        {gameState === 'start' && (
          <div className="absolute inset-0 bg-[#080d1a]/95 flex items-center justify-center p-6 z-30 overflow-y-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl">
            
            <div className="lg:col-span-1 bg-[#0c1224]/80 border border-slate-900 rounded-xl p-6 flex flex-col justify-between backdrop-blur-md">
              <div>
                <h3 className="text-sm font-bold text-blue-400 mb-4 flex items-center gap-2 border-b border-slate-900 pb-2">
                  <Info className="w-4 h-4" />
                  DRILL MECHANICS
                </h3>
                <ul className="space-y-4 text-xs leading-relaxed text-slate-400">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 font-bold">1.</span>
                    <span>A single target sphere glides around, abruptly spiking velocity and switching direction every 400-800ms.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 font-bold">2.</span>
                    <span>Maintain crosshair lock-on the target. Score accumulates continuously for ticks on target.</span>
                  </li>
                  <li className="flex items-start gap-2 text-blue-300">
                    <span className="text-blue-400 font-bold">★</span>
                    <span>**Overwatch/Apex Strafes**: Trains reactive sweeping and instant target adjustment after unpredictable changes.</span>
                  </li>
                </ul>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-900 text-[10px] text-slate-550 leading-normal">
                Refines mouse acceleration response and tracking accuracy.
              </div>
            </div>

            <div className="lg:col-span-2 bg-[#0c1224]/80 border border-slate-900 rounded-xl p-6 backdrop-blur-md flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2 border-b border-slate-900 pb-2">
                  <Calculator className="w-4 h-4 text-blue-400" />
                  CALIBRATE MOUSE ENGINE
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

                <div className="p-4 bg-slate-950/80 rounded border border-slate-900 flex justify-between items-center text-xs">
                  <div>
                    <span className="text-[10px] text-slate-550 block uppercase">360° Distance</span>
                    <span className="text-white font-bold text-sm">{cmPer360} cm / 360°</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-550 block uppercase">Target Sphere Radius</span>
                    <span className="text-blue-400 font-bold">{currentTargetSize} px</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-4 items-center justify-between border-t border-slate-900 pt-6">
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
              ? "w-full h-full bg-[#05060b] relative overflow-hidden flex items-center justify-center" 
              : "w-full aspect-video min-h-[400px] lg:min-h-[500px] bg-[#05060b] border border-slate-800 rounded-xl relative overflow-hidden flex items-center justify-center"}
          >
            <canvas ref={canvasRef} onClick={handleCanvasClick} />

            {/* S+ Pro Coach Dynamic Audio Guidance HUD & Alerts (Visual Text Hidden) */}


            {/* S+ Pro Coach Dynamic Audio Guidance HUD & Alerts (Visual Text Hidden) */}


            {/* Feed Notifications overlay */}
            <div className="absolute inset-0 pointer-events-none flex flex-col justify-center items-center gap-2 overflow-hidden select-none z-10">
              {feedbacks.map((f) => (
                <div 
                  key={f.id} 
                  className="px-4 py-2 rounded border text-sm font-extrabold animate-bounce shadow-lg bg-blue-950/90 border-blue-500/30 text-blue-400 uppercase tracking-widest"
                >
                  {f.text}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 text-center text-[10px] text-slate-550 flex items-center justify-center gap-4">
            <span>🖱 Track the sphere with your crosshair continuously.</span>
            <span>• Exit using <kbd className="px-1.5 py-0.5 bg-slate-900 border border-slate-800 text-slate-350 rounded font-sans text-[10px]">ESC</kbd>.</span>
          </div>
        </div>

        {/* Game Over Screen */}
        {gameState === 'gameOver' && (
          <div className="absolute inset-0 bg-[#080d1a]/95 flex items-center justify-center p-6 z-30 overflow-y-auto">
            <div className="bg-[#0c1224]/80 border border-slate-900 rounded-xl p-8 backdrop-blur-md max-w-3xl mx-auto w-full">
            <h2 className="text-xl font-bold text-blue-400 text-center mb-6 uppercase tracking-widest flex items-center justify-center gap-2">
              <Award className="w-5 h-5 text-yellow-500" />
              REACTIVE TRACKING CONCLUDED
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
                    <span className="text-[10px] text-slate-550 block uppercase">Max Combo Ticks</span>
                    <span className="text-white font-bold text-sm">{bestCombo} ticks</span>
                  </div>
                  <div className="bg-slate-950 p-3 rounded border border-slate-900 text-center">
                    <span className="text-[10px] text-slate-550 block uppercase">Tracking Accuracy</span>
                    <span className="text-white font-bold text-sm">{accuracy}%</span>
                  </div>
                </div>

                <div className="bg-slate-950 p-4 rounded border border-slate-900">
                  <div className="flex justify-between items-center text-xs mb-1">
                    <span className="text-slate-550 uppercase">Lock-on Deviation</span>
                    <span className="text-blue-400 font-bold">{analyticsData.lockOnStability} px</span>
                  </div>
                  <div className="text-[10px] text-slate-550 leading-normal">
                    Average pixel distance from crosshair to target center. Clean tracking baseline is &lt;28px.
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-slate-950 p-4 rounded border border-slate-900">
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-900 pb-2 mb-3">
                    REACTION TELEMETRY
                  </h4>
                  <div className="space-y-3 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-550">Target Swaps Evaded:</span>
                      <span className="text-white font-bold">{Math.round(DRILL_DURATION * 1000 / 600)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-550">Direction Adjust Delay:</span>
                      <span className="text-green-400 font-bold">{analyticsData.reactionDelay} ms</span>
                    </div>
                    <div className="text-[10px] text-slate-550 leading-normal border-t border-slate-900 pt-2 mt-1">
                      Time taken to re-align tracking on the sphere after it executes sudden direction swaps.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Assistant Coach Diagnostics */}
            <div className="bg-[#080d1a] border border-slate-800 rounded-lg p-5 mb-8 text-left shadow-inner">
              <h3 className="text-xs font-bold text-blue-400 font-mono uppercase tracking-widest border-b border-slate-800 pb-2 mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-400 animate-pulse" />
                AI COACH REACTIVE-TRACK DIAGNOSTICS
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs leading-relaxed text-slate-350">
                <div className="space-y-2 border-r border-slate-900 pr-6">
                  <p className="font-bold text-white uppercase text-[10px] tracking-wider font-mono">Performance Index:</p>
                  <ul className="space-y-2 list-disc pl-4">
                    {analyticsData.reactionDelay > 240 ? (
                      <li className="text-red-400">⚠️ Reaction Latency: You are taking too long ({analyticsData.reactionDelay}ms) to lock back on target after direction changes. Actionable Advice: Practice visual anticipation.</li>
                    ) : (
                      <li className="text-green-400">🔥 Reactive Reflexes: Instant snap adjustment (<span className="font-bold">{analyticsData.reactionDelay}ms</span>) to target strafes.</li>
                    )}
                    {analyticsData.lockOnStability > 30 ? (
                      <li className="text-blue-400">⚠️ Jittery Smoothness: High centering deviation ({analyticsData.lockOnStability}px). Actionable Advice: Lower DPI or switch to a smoother pad. Relax wrist muscle tension.</li>
                    ) : (
                      <li className="text-green-400">🔥 Smooth Tracking: Clean glide sweeps. Kept crosshair locked near target center.</li>
                    )}
                  </ul>
                </div>
                <div className="space-y-3 flex flex-col justify-between">
                  <div>
                    <p className="font-bold text-white uppercase text-[10px] tracking-wider font-mono mb-1">Prescribed Global Esports Advice:</p>
                    <p className="text-slate-350 leading-relaxed font-sans">
                      {analyticsData.lockOnStability > 30 ? (
                        "Your speed response is good, but tracking sweeps are shaky. Lower your sensitivity, use finger-tips for micro-guidance, and focus on smooth constant sweeps rather than rapid adjustments."
                      ) : (
                        "Tracking is extremely smooth. To improve reaction speeds, switch to Apex Legends or Overwatch mode which scales target movement velocities, and practice micro-adjustments."
                      )}
                    </p>
                  </div>
                  <div className="pt-1">
                    <span className="inline-block bg-blue-950/40 text-blue-400 px-3 py-1.5 rounded text-[10px] font-mono font-bold uppercase border border-blue-500/20 shadow-md">
                      TRACKING INDEX: {score} INDEX PTS
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center border-t border-slate-900 pt-6">
              <button
                onClick={startGame}
                className="w-full sm:w-auto px-6 py-2.5 bg-blue-650 hover:bg-blue-700 text-white font-bold rounded-lg text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition"
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
