'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { COACHES, getActiveCoach, getCoachResponse, speakCoachText, handleCoachFeedback } from '../../../../lib/coachVoice';
import { recordDrillResult } from '../../../../lib/performanceTelemetry';
import { getAdaptiveParams } from '../../../../lib/adaptiveDifficulty';
import Link from 'next/link';
import { Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, Eye, Timer, Trophy, Target, Zap, Activity, Info, Lock, AlertCircle, RefreshCw, Home, ChevronRight, Play, BarChart3, TrendingUp, Lightbulb, Clock, CheckCircle2, GraduationCap, ArrowRight, Sparkles, Award, Crosshair } from 'lucide-react';;

const DRILL_DURATION = 60; // 60 seconds
const BALL_COUNT = 6;


const RelatedDrillCard = ({ title, category, href, description }) => (
  <Link href={href} className="group block bg-[#0b0f19]/30 border border-slate-900 hover:border-slate-800 rounded-xl p-4 transition active:scale-98">
    <span className="text-[8px] text-slate-500 uppercase tracking-widest font-mono block mb-1">{category}</span>
    <h4 className="text-xs font-bold text-white group-hover:text-green-400 transition-colors flex items-center justify-between">
      {title}
      <ArrowRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-green-400 group-hover:translate-x-0.5 transition-all" />
    </h4>
    <p className="text-[10px] text-slate-450 leading-relaxed mt-2">{description}</p>
  </Link>
);

export default function ProTrackingClient() {


  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const containerRef = useRef(null);
  const pageRef = useRef(null);

  // Viewport Orientation & Mobile Check (Aim Trainer spec)
  useEffect(() => {
    const checkSize = () => {
      if (typeof window === 'undefined') return;
      const ua = navigator.userAgent || '';
      const isMobile = /Mobi|Android|iPhone|iPad|iPod|Windows Phone/i.test(ua) || 
                       (navigator.maxTouchPoints > 0 && 
                        window.screen && Math.max(window.screen.width, window.screen.height) < 1024);
      if (isMobile) {
        setShowRotateWarning(true);
        setWarningMessage("This drill cannot be played on mobile phones");
        return;
      }
      const isPortrait = window.innerHeight > window.innerWidth;
      if (isPortrait) {
        if (window.innerWidth < 768) {
          setShowRotateWarning(true);
          setWarningMessage("Rotate Your Device");
          return;
        }
      } else {
        if (window.innerHeight < 320) {
          setShowRotateWarning(true);
          setWarningMessage("Screen height too small. Try entering Fullscreen mode.");
          return;
        }
      }
      setShowRotateWarning(false);
    };
    checkSize();
    window.addEventListener('resize', checkSize);
    window.addEventListener('orientationchange', checkSize);
    return () => {
      window.removeEventListener('resize', checkSize);
      window.removeEventListener('orientationchange', checkSize);
    };
  }, []);

  const [gameState, setGameState] = useState('start');
  const [showRotateWarning, setShowRotateWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState("Rotate Your Device");

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
            {showRotateWarning && (
              <div className="absolute inset-0 z-50 bg-[#05070e]/95 flex flex-col items-center justify-center p-6 text-center select-none animate-fade-in">
                <div className="animate-bounce mb-4 text-red-500">
                  <svg className="w-12 h-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-sm font-bold text-white uppercase font-mono tracking-widest mb-1.5">{warningMessage}</h3>
                <p className="text-xs text-slate-400 max-w-xs leading-relaxed mb-6 mx-auto">
                  {warningMessage === "This drill cannot be played on mobile phones" 
                    ? "This drill requires a physical mouse or keyboard and cannot be played on touchscreen devices." 
                    : "Please use landscape orientation or fullscreen mode for the best training experience."}
                </p>
                <div className="flex justify-center">
                  <Link href="/drills/fps">
                    <button className="px-6 py-2.5 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-350 hover:text-white font-mono text-[10px] uppercase tracking-wider rounded-lg flex items-center gap-2 transition active:scale-95 shadow-lg font-bold">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                      </svg>
                      Go Back
                    </button>
                  </Link>
                </div>
              </div>
            )}

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
        
        {/* DRILL RULES & PRO FEATURES */}
        {!isFullscreen && (
          <footer className="mt-8">
            <div className="rounded-2xl border border-slate-900 bg-[#0b0f19]/40 overflow-hidden backdrop-blur-md">
              <div className="px-5 py-4 border-b border-slate-900 bg-[#0b0f19]/60 flex items-center gap-2">
                <Info className="w-4 h-4 text-green-400" />
                <h2 className="font-bold text-xs uppercase tracking-widest font-mono text-white">
                  Drill Rules & Professional Features
                </h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs text-slate-400">
                  <div className="space-y-3">
                    <h3 className="font-bold text-white uppercase tracking-wider flex items-center gap-2">
                      <Crosshair className="w-4 h-4 text-green-400" />
                      How to Play
                    </h3>
                    <ol className="space-y-2 list-decimal pl-4">
                      <li>Click <span className="text-white">Launch Fullscreen Training</span> to begin.</li>
                      <li>Allow browser to lock cursor for <span className="text-green-400">1:1 raw mouse input</span>.</li>
                      <li>Focus on target coordinates to optimize reaction time.</li>
                      <li>Aim for high accuracy and fast snaps to maximize score.</li>
                    </ol>
                  </div>
                  <div className="space-y-3">
                    <h3 className="font-bold text-white uppercase tracking-wider flex items-center gap-2">
                      <Trophy className="w-4 h-4 text-yellow-500" />
                      Scoring
                    </h3>
                    <ul className="space-y-2 list-disc pl-4">
                      <li><span className="text-green-400 font-bold">Hits</span>: Adds to your total score and increases your current hit combo.</li>
                      <li><span className="text-red-400 font-bold">Misses</span>: Deducts points or resets your streak multiplier.</li>
                      <li><span className="text-slate-300 font-bold">Speed</span>: Faster response times are logged for precision benchmarking.</li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h3 className="font-bold text-white uppercase tracking-wider flex items-center gap-2">
                      <Zap className="w-4 h-4 text-orange-500" />
                      Pro Features
                    </h3>
                    <ul className="space-y-2 list-disc pl-4">
                      <li><span className="text-green-400">Pointer Lock API</span> locks cursor to capture raw input.</li>
                      <li><span className="text-blue-400">Tactical HUD</span>: Real-time latency tracking and telemetry analysis.</li>
                      <li><span className="text-purple-400">AI Diagnostics</span>: Dynamic performance feedback and posture tracking.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        )}

        {/* ABOUT DRILL */}
        {!isFullscreen && (
          <section className="mt-8" aria-label="About this drill">
            <div className="rounded-2xl border border-slate-900 bg-[#0b0f19]/40 overflow-hidden backdrop-blur-md">
              <div className="px-5 py-4 border-b border-slate-900 bg-[#0b0f19]/60 flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-green-400" />
                <h2 className="font-bold text-xs uppercase tracking-widest font-mono text-white">
                  About Pro Tracking Trainer
                </h2>
              </div>
              <div className="p-6">
                <p className="text-xs text-slate-400 leading-relaxed mb-6">
                  This pro tracking trainer drill is designed to refine tactical mechanical reflexes, hand-eye coordination, and spatial mouse accuracy. By using 1:1 hardware raw input via the Pointer Lock API, it bypasses operating system cursor acceleration to build consistent physical muscle memory. With dynamic difficulty and AI-powered performance diagnostics, this tool conditions esports players for high-velocity target acquisition in games like CS2, Valorant, Apex Legends, and Overwatch.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  <div className="p-4 rounded-xl border border-slate-900 bg-[#0b0f19]/20">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-7 h-7 rounded-lg bg-green-500/10 flex items-center justify-center">
                        <GraduationCap className="w-4 h-4 text-green-400" />
                      </div>
                      <h3 className="text-xs font-bold text-white uppercase tracking-wider">Who It's For</h3>
                    </div>
                    <p className="text-[10px] text-slate-400 leading-relaxed">
                      Esports athletes, competitive FPS gamers, and players looking to build consistent, acceleration-free muscle memory.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl border border-slate-900 bg-[#0b0f19]/20">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-7 h-7 rounded-lg bg-blue-500/10 flex items-center justify-center">
                        <TrendingUp className="w-4 h-4 text-blue-450" />
                      </div>
                      <h3 className="text-xs font-bold text-white uppercase tracking-wider">Skills Improved</h3>
                    </div>
                    <p className="text-[10px] text-slate-400 leading-relaxed">
                      Motor reflex speed, spatial coordinate sweep precision, wrist control, deceleration timing, and foveal target acquisition.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl border border-slate-900 bg-[#0b0f19]/20">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-7 h-7 rounded-lg bg-purple-500/10 flex items-center justify-center">
                        <BarChart3 className="w-4 h-4 text-purple-400" />
                      </div>
                      <h3 className="text-xs font-bold text-white uppercase tracking-wider">What You'll Track</h3>
                    </div>
                    <p className="text-[10px] text-slate-400 leading-relaxed">
                      Score, hit accuracy, maximum streak combo, fastest reaction speed, and shot efficiency via real-time telemetry logs.
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 font-mono text-xs text-slate-400">
                  <div className="p-4 rounded-xl border border-slate-900 bg-[#0b0f19]/10">
                    <div className="flex items-center gap-2 mb-3">
                      <Lightbulb className="w-4 h-4 text-yellow-500" />
                      <h3 className="font-bold text-white uppercase tracking-wider">Why Practice Pro Tracking Trainer?</h3>
                    </div>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-green-400 flex-shrink-0 mt-0.5" />
                        <span>Directly translates to higher precision in competitive aim duels.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-green-400 flex-shrink-0 mt-0.5" />
                        <span>Bypasses OS mouse acceleration to isolate physical arm/wrist muscle memory.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-green-400 flex-shrink-0 mt-0.5" />
                        <span>Builds robust peripheral reaction limits via adaptive target decay rates.</span>
                      </li>
                    </ul>
                  </div>
                  <div className="p-4 rounded-xl border border-slate-900 bg-[#0b0f19]/10">
                    <div className="flex items-center gap-2 mb-3">
                      <Clock className="w-4 h-4 text-orange-500" />
                      <h3 className="font-bold text-white uppercase tracking-wider">How to Practice Effectively</h3>
                    </div>
                    <ol className="space-y-2 list-decimal pl-4">
                      <li>Prioritize absolute accuracy and straight trajectory paths over high speeds.</li>
                      <li>Practice in short, focused blocks of 10-15 minutes to avoid cognitive fatigue.</li>
                      <li>Track your hit speed consistency and aim for continuous improvement.</li>
                      <li>Calibrate the universal sensitivity slider to match your primary game's multiplier.</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* RELATED DRILLS */}
        {!isFullscreen && (
          <section className="mt-8" aria-label="Explore related aim and response drills">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-5 rounded-full bg-green-500"></div>
              <h2 className="text-xs font-bold text-white uppercase tracking-widest font-mono">
                Explore Related Drills
              </h2>
              <span className="text-[9px] px-2 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-slate-500 font-mono font-bold uppercase">
                8 Drills
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <RelatedDrillCard 
                title="Aim Trainer" 
                category="Motor Sector" 
                href="/drills/motor/hand-eye-coordination/aim-trainer" 
                description="Hone spatial coordinate click speed."
              />
              <RelatedDrillCard 
                title="Click Accuracy" 
                category="Motor Sector" 
                href="/drills/motor/hand-eye-coordination/click-accuracy" 
                description="Develop micro-click spatial accuracy."
              />
              <RelatedDrillCard 
                title="Reflex Grade" 
                category="Visual Tracking" 
                href="/drills/visual-tracking/reaction-simulator" 
                description="Test visual stimulus identification speed."
              />
              <RelatedDrillCard 
                title="Saccadic Calibration" 
                category="Visual Tracking" 
                href="/drills/visual-tracking/saccadic-snap" 
                description="Optimize saccadic gaze acquisition limits."
              />
              <RelatedDrillCard 
                title="180° Awareness" 
                category="FPS Sector" 
                href="/drills/fps/180-degree-awareness" 
                description="Alternate snapping between opposite horizons."
              />
              <RelatedDrillCard 
                title="Angle Hold Trainer" 
                category="FPS Sector" 
                href="/drills/fps/angle-hold-trainer" 
                description="Hone tactical crosshair placement holds."
              />
              <RelatedDrillCard 
                title="Counter Strafe" 
                category="FPS Sector" 
                href="/drills/fps/counter-strafe-trainer" 
                description="Coordinate movement deadzones and firing accuracy."
              />
              <RelatedDrillCard 
                title="Recoil Control" 
                category="FPS Sector" 
                href="/drills/fps/recoil-control" 
                description="Calibrate mouse pulling pattern compensation."
              />
            </div>
          </section>
        )}

        {/* FOOTER */}
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
                    <li><Link href="/drills/productivity" className="hover:text-green-400 transition-colors">Productivity (10)</Link></li>
                    <li><Link href="/drills/mental-fitness" className="hover:text-green-400 transition-colors">Mental Fitness (6)</Link></li>
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
                <p className="text-[9px] mb-2">&copy; 2026 SkillDrills. All rights reserved.</p>
                <p className="text-[9px] max-w-2xl mx-auto leading-relaxed mb-6">
                  Open-source telemetry training platform using hardware pointer lock. Free forever. No downloads required.
                </p>
                <div className="flex items-center justify-center gap-4 flex-wrap text-slate-500">
                  <button 
                    onClick={() => {
                      if (typeof window !== 'undefined' && navigator.share) {
                        navigator.share({ title: document.title, url: window.location.href }).catch(() => {});
                      }
                    }} 
                    className="hover:text-white transition-colors"
                  >
                    Share Page
                  </button>
                  <button 
                    onClick={() => {
                      if (typeof window !== 'undefined') {
                        navigator.clipboard.writeText(window.location.href);
                        alert("Link copied to clipboard!");
                      }
                    }} 
                    className="hover:text-white transition-colors"
                  >
                    Copy Link
                  </button>
                  <a href="https://twitter.com/skilldrillss" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Twitter X</a>
                  <a href="https://instagram.com/skilldrills.online" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a>
                  <a href="https://youtube.com/@skilldrills.online" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">YouTube</a>
                  <a href="https://pinterest.com/skilldrills" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Pinterest</a>
                </div>
              </div>
            </div>
          </footer>
        )}


      </div>
    </div>
  );
}