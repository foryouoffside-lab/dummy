'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { COACHES, getActiveCoach, getCoachResponse, speakCoachText, handleCoachFeedback } from '../../../../lib/coachVoice';
import { recordDrillResult } from '../../../../lib/performanceTelemetry';
import { getAdaptiveParams } from '../../../../lib/adaptiveDifficulty';
import Link from 'next/link';
import { 
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, 
  Eye, Timer, Trophy, Target, Zap, Activity, Info,
  Lock, AlertCircle, RefreshCw, Home, ChevronRight, Play,
  BarChart3, TrendingUp, Lightbulb, Clock, CheckCircle2, GraduationCap
} from 'lucide-react';

const DRILL_DURATION = 60; // 60 seconds
const BALL_COUNT = 6;

export default function ProTrackingClient() {


  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const containerRef = useRef(null);
  const pageRef = useRef(null);

  const [gameState, setGameState] = useState('start');

  // Pure 2D Universal Standard States
  const [universalSens, setUniversalSens] = useState(1.0);

  // Stubs to preserve telemetry and coaching dependencies
  const gameType = 'universal';
  const setGameType = () => {};
  const dpi = 800;
  const setDpi = () => {};
  const inGameSens = universalSens;
  const setInGameSens = setUniversalSens;
  const cmPer360 = (30 / universalSens).toFixed(1);
  const setCmPer360 = () => {};
  const sensitivityMultiplierRef = { current: universalSens };

  // Load saved settings
  useEffect(() => {
    try {
      const savedSens = localStorage.getItem('universalSens');
      if (savedSens) setUniversalSens(parseFloat(savedSens));
    } catch (e) {}
  }, []);

  // Auto-save user preferences
  useEffect(() => {
    if (gameState === 'playing') return;
    try {
      localStorage.setItem('universalSens', universalSens.toString());
    } catch (e) {}
  }, [universalSens, gameState]);

  // Pointer Lock Safety Cleanup
  useEffect(() => {
    return () => {
      if (typeof document !== 'undefined' && document.pointerLockElement) {
        document.exitPointerLock();
      }
    };
  }, []);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [trackingScore, setTrackingScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [trackingAccuracy, setTrackingAccuracy] = useState(100);
  const [bestAccuracy, setBestAccuracy] = useState(0);
  const [trackingCombo, setTrackingCombo] = useState(0);
  const [bestCombo, setBestCombo] = useState(0);
  const [timeLeft, setTimeLeft] = useState(DRILL_DURATION);
  const [currentSpeed, setCurrentSpeed] = useState(500);
  const [targetSwitches, setTargetSwitches] = useState(0);
  const [pointerLocked, setPointerLocked] = useState(false);
        
  // High-performance mutable refs (Esports Grade)
  const virtualCrosshair = useRef({ x: 0, y: 0 });
  const canvasSizeRef = useRef({ width: 800, height: 450 });
  const crosshairInitRef = useRef(false);
  
  // Ball states
  const ballsRef = useRef([]);
  const targetIndexRef = useRef(0);
  const lastSwitchTimeRef = useRef(0);
  const scoreRef = useRef(0);
  const comboRef = useRef(0);
  const timerIntervalRef = useRef(null);
  const trackingIntervalRef = useRef(null);
  const isActiveRef = useRef(false);
  const gameStateRef = useRef('start');
  const audioCtxRef = useRef(null);
  const timeLeftRef = useRef(DRILL_DURATION);
  const moveSpeedRef = useRef(500);
  const trackingTimeRef = useRef(0);
  const bestAccuracyRef = useRef(0);
  const bestComboRef = useRef(0);

  // Settings base values
  const ballRadiusRef = useRef(25);
  const switchDelayRef = useRef(1500); // 1.5s target switch

  // VFX Refs
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
  


  // S+ AI Coach Performance Tracking & Sensitivity Auto-Adjustment States
  

  

  


  // Auto-save user calibration preferences
  


  // Client-side initialization
  useEffect(() => {
    try {
      const s = localStorage.getItem('proTrackingBest');
      if (s) {
        const p = parseInt(s, 10);
        if (!isNaN(p)) setBestScore(p);
      }
            } catch(e){}
  }, []);

  useEffect(() => { gameStateRef.current = gameState; }, [gameState]);

  // Compute sensitivity
  

  const updateBestScore = useCallback((fs) => {
    try {
      const c = parseInt(localStorage.getItem('proTrackingBest') || '0', 10);
      if (fs > c) {
        localStorage.setItem('proTrackingBest', fs.toString());
        setBestScore(fs);
      }
    } catch(e){}
  }, []);

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
    } catch(e){ return null; }
  }, []);

  const playSound = useCallback((type) => {
    if (!soundEnabled) return;
    try {
      const ctx = initAudio(); if (!ctx) return;
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.connect(g); g.connect(ctx.destination);
      const now = ctx.currentTime;
      const profiles = {
        switch: { f1: 660, f2: 800, type: 'sine', dur: 0.08, vol: 0.06 },
        tracking: { f1: 880, f2: 1200, type: 'sine', dur: 0.06, vol: 0.05 },
        combo: { f1: 1046, f2: 1600, type: 'sine', dur: 0.12, vol: 0.08 }
      };
      const p = profiles[type] || profiles.tracking;
      o.type = p.type;
      o.frequency.setValueAtTime(p.f1, now);
      o.frequency.exponentialRampToValueAtTime(p.f2, now + p.dur);
      g.gain.setValueAtTime(p.vol, now);
      g.gain.exponentialRampToValueAtTime(0.001, now + p.dur);
      o.start(now); o.stop(now + p.dur);
    } catch(e){}
  }, [soundEnabled, initAudio]);

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
    const h = () => {
      const l = document.pointerLockElement === canvasRef.current;
      setPointerLocked(l);
      if (l) {
        crosshairInitRef.current = true;
      } else if (gameStateRef.current === 'playing') {
        showFeedbackText('CURSOR UNLOCKED - Click Canvas to Lock', 'error');
      }
    };
    document.addEventListener('pointerlockchange', h);
    return () => { document.removeEventListener('pointerlockchange', h); };
  }, [showFeedbackText]);

  // Mouse Input Handler
  useEffect(() => {
    const h = (e) =>  {
      if (document.pointerLockElement !== canvasRef.current && !document.pointerLockElement) return;
      const dx = (e.movementX || 0) * universalSens;
      const dy = (e.movementY || 0) * universalSens;
      const c = canvasRef.current;
      if (c) {
        virtualCrosshair.current.x = Math.max(0, Math.min(c.width, virtualCrosshair.current.x + dx));
        virtualCrosshair.current.y = Math.max(0, Math.min(c.height, virtualCrosshair.current.y + dy));
      }
    };
    document.addEventListener('mousemove', h);
    return () => document.removeEventListener('mousemove', h);
  }, []);

  const createBall = (isTarget) => {
    return {
      radius: ballRadiusRef.current,
      isTarget,
      x: 0,
      y: 0,
      vx: 0,
      vy: 0
    };
  };

  const spawnBall = (ball, cvs) => {
    ball.x = Math.random() * (cvs.width - ball.radius * 3) + ball.radius;
    ball.y = Math.random() * (cvs.height - ball.radius * 3) + ball.radius;
  };

  const setRandomVelocity = (ball, speed) => {
    const angle = Math.random() * Math.PI * 2;
    ball.vx = Math.cos(angle) * speed;
    ball.vy = Math.sin(angle) * speed;
  };

  const updateBallPhysics = (ball, dt, cvs) => {
    ball.x += ball.vx * dt;
    ball.y += ball.vy * dt;

    if (ball.x < ball.radius) { ball.x = ball.radius; ball.vx *= -1; }
    if (ball.x > cvs.width - ball.radius) { ball.x = cvs.width - ball.radius; ball.vx *= -1; }
    if (ball.y < ball.radius) { ball.y = ball.radius; ball.vy *= -1; }
    if (ball.y > cvs.height - ball.radius) { ball.y = cvs.height - ball.radius; ball.vy *= -1; }

    // Add slight random direction tweaks to mimic human dodge patterns
    if (Math.random() < 0.009) {
      setRandomVelocity(ball, Math.hypot(ball.vx, ball.vy));
    }
  };

  const switchTarget = useCallback(() => {
    if (!isActiveRef.current || ballsRef.current.length === 0) return;
    ballsRef.current[targetIndexRef.current].isTarget = false;
    targetIndexRef.current = (targetIndexRef.current + Math.floor(Math.random() * (BALL_COUNT - 1)) + 1) % BALL_COUNT;
    ballsRef.current[targetIndexRef.current].isTarget = true;
    moveSpeedRef.current += 15; // Infinitely scaling difficulty
    setCurrentSpeed(Math.round(moveSpeedRef.current));
    setTargetSwitches(prev => prev + 1);
    playSound('switch');
    showFeedbackText('🎯 NEW TARGET LOCKED', 'success');
  }, [playSound, showFeedbackText]);

  const resetGame = useCallback(() => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (trackingIntervalRef.current) clearInterval(trackingIntervalRef.current);
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    isActiveRef.current = false;
    setGameState('start'); gameStateRef.current = 'start';
    setTrackingScore(0); setTrackingAccuracy(100); setBestAccuracy(0); setTrackingCombo(0); setBestCombo(0);
    timeLeftRef.current = DRILL_DURATION; setTimeLeft(DRILL_DURATION);
    setCurrentSpeed(500); setTargetSwitches(0);
    crosshairInitRef.current = false;
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

  const endGame = useCallback(() => {
    setGameState('gameOver');
    gameStateRef.current = 'gameOver';
    isActiveRef.current = false;
    updateBestScore(scoreRef.current);
    document.exitPointerLock();

    // Record telemetry for AI coaching
    try {
      recordDrillResult('pro-tracking', {
        score: scoreRef.current,
        accuracy: bestAccuracyRef.current,
        reactionTimeMs: null,
        trackingAccuracy: bestAccuracyRef.current,
        comboMax: bestComboRef.current,
        overshoots: 0,
        undershoots: 0,
        sensitivity: inGameSens,
        dpi,
        gameType,
        duration: DRILL_DURATION
      });
    } catch (e) {}
  }, [updateBestScore, inGameSens, dpi, gameType]);

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

  // Tracking accuracy evaluation loop (every 100ms)
  useEffect(() => {
    if (gameState !== 'playing') {
      if (trackingIntervalRef.current) clearInterval(trackingIntervalRef.current);
      return;
    }
    trackingIntervalRef.current = setInterval(() => {
      if (!isActiveRef.current || !crosshairInitRef.current || ballsRef.current.length === 0) return;

      const t = ballsRef.current[targetIndexRef.current]; if (!t) return;
      const ch = virtualCrosshair.current;
      const dist = Math.hypot(ch.x - t.x, ch.y - t.y);

      if (dist < t.radius) { if (typeof checkSensitivityAdjustment === 'function') checkSensitivityAdjustment('hit'); if (typeof checkSensitivityAdjustment === 'function') checkSensitivityAdjustment('hit');
        trackingTimeRef.current += 0.1;
        if (trackingTimeRef.current >= 0.5) {
          scoreRef.current += 5;
          setTrackingScore(scoreRef.current);
          trackingTimeRef.current -= 0.5;
        }
        comboRef.current++;
        setTrackingCombo(comboRef.current);
        if (comboRef.current > bestComboRef.current) {
          bestComboRef.current = comboRef.current;
          setBestCombo(comboRef.current);
        }
        if (comboRef.current % 15 === 0) {
          playSound('combo');
          showFeedbackText(`🔥 COMBO x${comboRef.current}`, 'success');
        }
      } else {
        if (typeof checkSensitivityAdjustment === 'function') checkSensitivityAdjustment('tracking_tick', { isLocked: false, dist: dist, targetSize: t.radius, target: t });
        trackingTimeRef.current = 0;
        comboRef.current = 0;
        setTrackingCombo(0);
      }

      const acc = Math.max(0, Math.min(100, Math.round(100 - (dist / t.radius) * 75)));
      setTrackingAccuracy(acc);
      if (acc > bestAccuracyRef.current) {
        bestAccuracyRef.current = acc;
        setBestAccuracy(acc);
      }
    }, 100);

    return () => {
      if (trackingIntervalRef.current) clearInterval(trackingIntervalRef.current);
    };
  }, [gameState, playSound, showFeedbackText]);

  // Main Canvas Render Loop
  useEffect(() => {
    if (gameState !== 'playing') return;
    const cvs = canvasRef.current; if (!cvs) return;
    const ctx = cvs.getContext('2d', { alpha: false });

    const updateCanvasSize = () => {
      const cr = containerRef.current; if (!cr) return;
      const rr = cr.getBoundingClientRect();
      let w = rr.width, h = w * (9/16);
      if (h > rr.height) { h = rr.height; w = h * (16/9); }
      cvs.width = w; cvs.height = h;
      cvs.style.width = `${w}px`;
      cvs.style.height = `${h}px`;
      canvasSizeRef.current = { width: w, height: h };
      cvs.style.position = 'absolute';
      cvs.style.left = `${(rr.width - w) / 2}px`;
      cvs.style.top = `${(rr.height - h) / 2}px`;
      if (w > 0 && h > 0 && (!crosshairInitRef.current || (virtualCrosshair.current.x === 0 && virtualCrosshair.current.y === 0))) {
        virtualCrosshair.current = { x: w / 2, y: h / 2 };
        crosshairInitRef.current = true;
      };

      // Initialize balls if empty
      if (ballsRef.current.length === 0) {
        ballsRef.current = [];
        for (let i = 0; i < BALL_COUNT; i++) {
          const b = {
            radius: ballRadiusRef.current,
            isTarget: i === 0,
            x: 0, y: 0, vx: 0, vy: 0
          };
          spawnBall(b, cvs);
          setRandomVelocity(b, moveSpeedRef.current);
          ballsRef.current.push(b);
        }
        targetIndexRef.current = 0;
        lastSwitchTimeRef.current = performance.now();
      }
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    let lt = performance.now();

    const loop = (now) => {
      if (!isActiveRef.current) {
        animationRef.current = requestAnimationFrame(loop);
        return;
      }
      const dt = (now - lt) / 1000;
      lt = now;

      // Check target switch interval
      if (now - lastSwitchTimeRef.current > switchDelayRef.current) {
        switchTarget();
        lastSwitchTimeRef.current = now;
      }

      // Physics update
      ballsRef.current.forEach(b => updateBallPhysics(b, dt, cvs));

      // Draw background
      ctx.fillStyle = '#050508';
      ctx.fillRect(0, 0, cvs.width, cvs.height);

      // Grid
      ctx.strokeStyle = 'rgba(0, 255, 136, 0.03)';
      ctx.lineWidth = 1;
      for (let i = 0; i < cvs.width; i += 40) {
        ctx.beginPath();
        ctx.moveTo(i, 0); ctx.lineTo(i, cvs.height);
        ctx.stroke();
      }
      for (let j = 0; j < cvs.height; j += 40) {
        ctx.beginPath();
        ctx.moveTo(0, j); ctx.lineTo(cvs.width, j);
        ctx.stroke();
      }

      // Draw all balls
      ballsRef.current.forEach((b) => {
        ctx.shadowBlur = b.isTarget ? 15 : 0;
        ctx.shadowColor = '#00ff88';

        ctx.fillStyle = b.isTarget ? '#00ff88' : '#ffffff';
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI*2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Outer outline
        ctx.strokeStyle = b.isTarget ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.1)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI*2);
        ctx.stroke();
      });

      // Sniper Scope Crosshair Reticle (Exact Pure 2D design)
      {
        const ch = virtualCrosshair.current;
        if (ch && ch.x > 0 && ch.x < cvs.width && ch.y > 0 && ch.y < cvs.height) {
          const activeColor = pointerLocked ? '#00ff88' : '#ffbb00';
          ctx.strokeStyle = activeColor;
          
          // Outer Scope Ring
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(ch.x, ch.y, 20, 0, Math.PI * 2);
          ctx.stroke();

          // Inner Scope Crosshairs
          ctx.beginPath();
          ctx.lineWidth = 1.5;
          const innerGap = 8;
          ctx.moveTo(ch.x, ch.y - 20); ctx.lineTo(ch.x, ch.y - innerGap); // Top
          ctx.moveTo(ch.x, ch.y + 20); ctx.lineTo(ch.x, ch.y + innerGap); // Bottom
          ctx.moveTo(ch.x - 20, ch.y); ctx.lineTo(ch.x - innerGap, ch.y); // Left
          ctx.moveTo(ch.x + 20, ch.y); ctx.lineTo(ch.x + innerGap, ch.y); // Right
          ctx.stroke();
          
          // Center Dot
          ctx.fillStyle = activeColor;
          ctx.beginPath(); ctx.arc(ch.x, ch.y, 2, 0, Math.PI * 2); ctx.fill();
        }
      }

      animationRef.current = requestAnimationFrame(loop);
    };

    animationRef.current = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', updateCanvasSize);
    };
  }, [gameState, switchTarget, pointerLocked]);

  const startGame = useCallback(() => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (trackingIntervalRef.current) clearInterval(trackingIntervalRef.current);

    // Get adaptive difficulty params
    const adaptive = getAdaptiveParams('pro-tracking');

    try {
      const el = pageRef.current;
      if (el && !document.fullscreenElement) {
        el.requestFullscreen().catch((e) => console.warn("Fullscreen request blocked", e));
        setIsFullscreen(true);
      }
    } catch(e) {
      console.warn("Fullscreen request blocked", e);
    }

    setGameState('playing');
    gameStateRef.current = 'playing';
    setTrackingScore(0); setTrackingAccuracy(100); setBestAccuracy(0); setTrackingCombo(0); setBestCombo(0);
    timeLeftRef.current = DRILL_DURATION; setTimeLeft(DRILL_DURATION);
    setTargetSwitches(0);
    isActiveRef.current = true; scoreRef.current = 0; comboRef.current = 0; bestComboRef.current = 0;
    bestAccuracyRef.current = 0; trackingTimeRef.current = 0; ballsRef.current = [];
    crosshairInitRef.current = false;

    // Calibration based on profile
    if (gameType === 'valorant' || gameType === 'cs2') {
      ballRadiusRef.current = Math.round(14 * adaptive.targetSizeMultiplier);
      moveSpeedRef.current = Math.round(320 * adaptive.speedMultiplier);
      switchDelayRef.current = 1200; // switch faster
    } else if (gameType === 'apex') {
      ballRadiusRef.current = Math.round(24 * adaptive.targetSizeMultiplier);
      moveSpeedRef.current = Math.round(520 * adaptive.speedMultiplier);
      switchDelayRef.current = 1600;
    } else if (gameType === 'overwatch') {
      ballRadiusRef.current = Math.round(20 * adaptive.targetSizeMultiplier);
      moveSpeedRef.current = Math.round(580 * adaptive.speedMultiplier);
      switchDelayRef.current = 1400;
    } else { // fortnite
      ballRadiusRef.current = Math.round(18 * adaptive.targetSizeMultiplier);
      moveSpeedRef.current = Math.round(420 * adaptive.speedMultiplier);
      switchDelayRef.current = 1500;
    }
    setCurrentSpeed(moveSpeedRef.current);

    startTimer();

    if (canvasRef.current) {
      try {
        canvasRef.current.requestPointerLock();
      } catch (e) {
        console.warn("Pointer lock blocked", e);
      }
    }
    crosshairInitRef.current = true;
  }, [startTimer, requestPointerLock, gameType]);

  return (
    <div ref={pageRef} className="min-h-screen select-none font-mono bg-[#080d1a] text-slate-100 relative overflow-hidden">
      
      {/* Background patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-green-950/20 via-[#080d1a] to-[#080d1a] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,_transparent_1px),_linear-gradient(90deg,_rgba(16,185,129,0.03)_1px,_transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />

      <div className={`${isFullscreen ? 'w-full h-screen p-0 m-0' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'} relative z-10`}>
        
        {/* Navigation Breadcrumb */}
        {!isFullscreen && (
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-2 text-[10px] text-slate-400 uppercase tracking-widest">
              <li><Link href="/" className="hover:text-green-400 transition-colors"><Home className="w-3.5 h-3.5" /></Link></li>
              <li><ChevronRight className="w-3 h-3 text-slate-700" /></li>
              <li><Link href="/drills/fps" className="hover:text-green-400 transition-colors">FPS Sector</Link></li>
              <li><ChevronRight className="w-3 h-3 text-slate-700" /></li>
              <li><span className="text-green-400 font-bold">Pro Tracking</span></li>
            </ol>
          </nav>
        )}

        {/* Drill Header */}
        {!isFullscreen && (
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6 border-b border-slate-900 pb-5">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-950/30 border border-green-500/20 text-green-400 rounded-xl">
                <Target className="w-7 h-7 animate-pulse" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white uppercase bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                  Pro Tracking Trainer
                </h1>
                <p className="text-xs text-slate-400 tracking-wider mt-0.5">
                  {pointerLocked ? '🟢 RAW INPUT CAPTURING' : '🔴 CLICK CANVAS TO CAPTURE'} • {cmPer360} cm/360 • Switch Tracking
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Start / Settings Menu */}
        {gameState === 'start' && (
          <div className="absolute inset-0 bg-[#080d1a]/95 flex items-center justify-center p-6 z-30 overflow-y-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2 bg-[#0c1224]/85 border border-slate-900 rounded-xl p-6 shadow-2xl backdrop-blur-md">
              <h2 className="text-base font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-green-400" />
                Adaptive Multidirectional Tracking
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Esports-grade target acquisition training. Instantly recognize and track the green target ball as it moves rapidly alongside 5 distractor elements. The target switches periodically, scaling velocity upward to simulate extreme dynamic combat.
              </p>

              <div className="p-4 bg-slate-950/50 rounded-lg border border-green-500/10 mb-4">
                <h3 className="text-xs font-bold text-green-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5" />
                  Esports Fullscreen Pointer Lock
                </h3>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Clicking the button launches the trainer instantly into fullscreen and requests raw pointer input. Pressing <kbd className="px-1 py-0.5 bg-slate-800 text-slate-200 border border-slate-700 rounded text-[9px] font-mono">ESC</kbd> exits fullscreen and resets your lobby state.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-[#080d1a] border border-slate-900 rounded-lg p-3 text-center">
                  <span className="text-[10px] text-slate-550 block mb-0.5">DURABILITY</span>
                  <span className="text-white font-bold text-sm">60 SECONDS</span>
                </div>
                <div className="bg-[#080d1a] border border-slate-900 rounded-lg p-3 text-center">
                  <span className="text-[10px] text-slate-550 block mb-0.5">BALL CONFIGS</span>
                  <span className="text-green-400 font-bold text-sm">6 ELEMENT SWARM</span>
                </div>
                <div className="bg-[#080d1a] border border-slate-900 rounded-lg p-3 text-center">
                  <span className="text-[10px] text-slate-550 block mb-0.5">LOCKED SWAPS</span>
                  <span className="text-white font-bold text-sm">EVERY 1.5s</span>
                </div>
                <div className="bg-[#080d1a] border border-slate-900 rounded-lg p-3 text-center">
                  <span className="text-[10px] text-slate-550 block mb-0.5">VELOCITY STAGE</span>
                  <span className="text-green-400 font-bold text-sm">INFINITE</span>
                </div>
              </div>
            </div>

            <div className="bg-[#0c1224]/85 border border-slate-900 rounded-xl p-6 shadow-2xl backdrop-blur-md flex flex-col justify-between">
              <div>
                <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Calibration Panel</h2>
                
                <div className="mb-6 p-4 bg-slate-950/45 rounded border border-slate-900">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Universal Sens</label>
                    <span className="text-green-400 font-mono text-xs font-bold">{universalSens.toFixed(2)}x</span>
                  </div>
                  <input 
                    type="range" min="0.1" max="3.0" step="0.05" 
                    value={universalSens} 
                    onChange={(e) => setUniversalSens(parseFloat(e.target.value))} 
                    className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-green-500" 
                  />
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
                  className="w-full sm:w-auto px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg text-sm flex items-center justify-center gap-2 shadow-lg shadow-green-500/25 uppercase tracking-wider transition animate-pulse"
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
          {/* Large Esports HUD Telemetry */}
          

          <div 
            ref={containerRef} 
            className={isFullscreen 
              ? "w-full h-full bg-[#050811] relative overflow-hidden flex items-center justify-center animate-pulse" 
              : "w-full aspect-video min-h-[400px] lg:min-h-[500px] bg-[#050811] border border-slate-800 rounded-xl relative overflow-hidden flex items-center justify-center cursor-none"}
          >
            <canvas ref={canvasRef} onClick={handleCanvasClick} />

            {/* S+ Pro Coach Dynamic Audio Guidance HUD & Alerts (Visual Text Hidden) */}


            {/* S+ Pro Coach Dynamic Audio Guidance HUD & Alerts (Visual Text Hidden) */}

            


            

            {/* Feed Overlay */}
            <div className="absolute inset-0 pointer-events-none flex flex-col justify-center items-center gap-2 overflow-hidden select-none z-10">
              {feedbacks.map((f) => (
                <div 
                  key={f.id} 
                  className="px-4 py-2 rounded-lg font-bold text-lg border shadow-2xl transition-all duration-300 animate-bounce bg-green-950/90 border-green-500/40 text-green-400"
                >
                  {f.text}
                </div>
              ))}
            </div>

            {isFullscreen && (
              <div className="absolute bottom-4 right-4 bg-slate-950/80 border border-slate-800 px-3 py-1.5 rounded-lg text-slate-400 text-[10px] uppercase tracking-widest z-20">
                Press <span className="text-white font-bold">ESC</span> to exit fullscreen training
              </div>
            )}
          </div>
        </div>

        {/* Game Over Screen */}
        {gameState === 'gameOver' && (
          <div className="absolute inset-0 bg-[#080d1a]/95 flex items-center justify-center p-6 z-30 overflow-y-auto">
            <div className="max-w-xl mx-auto bg-[#0c1224]/95 border border-slate-800 rounded-2xl p-6 sm:p-8 text-center shadow-2xl backdrop-blur-md relative z-20">
            <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4 animate-bounce" />
            <h2 className="text-2xl font-black text-white uppercase tracking-wider mb-2">Tracking Swarm Concluded</h2>
            <p className="text-xs text-slate-400 leading-relaxed mb-6">
              You completed the {gameType.toUpperCase()} tracking swarm module. Constant target-switch workouts build solid reaction agility.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
              <div className="bg-[#080d1a] border border-slate-900 rounded-lg p-3">
                <span className="text-[10px] text-slate-550 block mb-0.5">FINAL SCORE</span>
                <span className="text-white font-bold text-lg">{trackingScore}</span>
              </div>
              <div className="bg-[#080d1a] border border-slate-900 rounded-lg p-3">
                <span className="text-[10px] text-slate-550 block mb-0.5">BEST RECORD</span>
                <span className="text-yellow-500 font-bold text-lg">{bestScore}</span>
              </div>
              <div className="bg-[#080d1a] border border-slate-900 rounded-lg p-3">
                <span className="text-[10px] text-slate-550 block mb-0.5">PEAK ACCURACY</span>
                <span className="text-green-400 font-bold text-lg">{bestAccuracy}%</span>
              </div>
              <div className="bg-[#080d1a] border border-slate-900 rounded-lg p-3">
                <span className="text-[10px] text-slate-550 block mb-0.5">BEST STREAK</span>
                <span className="text-blue-400 font-bold text-lg">{bestCombo} ticks</span>
              </div>
              <div className="bg-[#080d1a] border border-slate-900 rounded-lg p-3">
                <span className="text-[10px] text-slate-550 block mb-0.5">PEAK SPEED</span>
                <span className="text-purple-400 font-bold text-lg">{currentSpeed}px/s</span>
              </div>
              <div className="bg-[#080d1a] border border-slate-900 rounded-lg p-3">
                <span className="text-[10px] text-slate-550 block mb-0.5">SWITCHES HIT</span>
                <span className="text-white font-bold text-lg">{targetSwitches}</span>
              </div>
            </div>

            <div className="flex gap-4">
              <Link href="/drills/fps" className="flex-1">
                <button className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold rounded-lg text-xs uppercase tracking-wider transition">
                  Return to Lobby
                </button>
              </Link>
              <button 
                onClick={startGame} 
                className="flex-1 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg text-xs uppercase tracking-wider transition shadow-lg shadow-green-500/20"
              >
                Restart Session
              </button>
            </div>
          </div>
          </div>
        )}

      </div>
    </div>
  );
}