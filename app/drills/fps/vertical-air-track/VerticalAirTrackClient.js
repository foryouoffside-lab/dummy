'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { COACHES, getActiveCoach, getCoachResponse, speakCoachText, handleCoachFeedback } from '../../../../lib/coachVoice';
import Link from 'next/link';
import { recordDrillResult } from '../../../../lib/performanceTelemetry';
import { getAdaptiveParams } from '../../../../lib/adaptiveDifficulty';

import { 
  Target, Zap, Timer, Trophy, 
  Volume2, VolumeX, Maximize2, Minimize2, Home, ChevronRight, Play,
  Info, Activity, Crosshair, RefreshCw, BarChart3, TrendingUp, Lightbulb, Clock, CheckCircle2, GraduationCap, Sparkles, Award
} from 'lucide-react';

const DRILL_DURATION = 60;
const GRAVITY_CONSTANT = 350; // pixels per second squared

export default function VerticalAirTrackClient() {
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
  const [trackingAccuracy, setTrackingAccuracy] = useState(0);
  const [bestAccuracy, setBestAccuracy] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(DRILL_DURATION);
  const [pointerLocked, setPointerLocked] = useState(false);
  const [gameType, setGameType] = useState('apex'); // default apex for air tracking
  const [dpi, setDpi] = useState(800);
  const [inGameSens, setInGameSens] = useState(1.2);
  const [cmPer360, setCmPer360] = useState(0);
  const [currentTargetSize, setCurrentTargetSize] = useState(30);

  // Mutable High-performance Esports-grade values
  const virtualCrosshair = useRef({ x: 0, y: 0 });
  const canvasSizeRef = useRef({ width: 800, height: 450 });
  const crosshairInitRef = useRef(false);
  const sensitivityMultiplierRef = useRef(1);

  // Target physics variables
  const targetRef = useRef({ x: 0, y: 0, vx: 0, vy: 0, r: 25 });
  const onTargetFramesRef = useRef(0);
  const totalFramesRef = useRef(0);
  const scoreRef = useRef(0);
  const streakRef = useRef(0);
  const timerIntervalRef = useRef(null);
  const isActiveRef = useRef(false);
  const gameStateRef = useRef('start');
  const audioCtxRef = useRef(null);
  const timeLeftRef = useRef(DRILL_DURATION);
  const trackingAccumulatorRef = useRef(0);

  // Diagnostics metrics
  const overshootFramesRef = useRef(0);
  const undershootFramesRef = useRef(0);

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


  useEffect(() => {
    try {
      const s = localStorage.getItem('verticalAirTrackBestScore');
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
    } catch(e){}
  }, []);

  useEffect(() => { gameStateRef.current = gameState; }, [gameState]);

  // Compute sensitivity & target radii
  useEffect(() => {
    const yaw = GAME_YAWS[gameType] || 0.07;
    const counts = 360 / (yaw * inGameSens);
    const inches = counts / dpi;
    const cm = inches * 2.54;
    setCmPer360(cm.toFixed(1));

    sensitivityMultiplierRef.current = 45.0 / cm;

    if (gameType === 'valorant' || gameType === 'cs2') {
      setCurrentTargetSize(18); // small head targets
    } else if (gameType === 'apex' || gameType === 'overwatch') {
      setCurrentTargetSize(32); // normal airborne tracking volume
    } else {
      setCurrentTargetSize(26);
    }
  }, [dpi, inGameSens, gameType]);

  const showFeedbackText = useCallback((text, type) => {
    const id = Math.random().toString(36).substr(2, 9);
    feedbacksRef.current.push({ id, text, type });
    setFeedbacks([...feedbacksRef.current]);

    setTimeout(() => {
      feedbacksRef.current = feedbacksRef.current.filter(f => f.id !== id);
      setFeedbacks([...feedbacksRef.current]);
    }, 1000);
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
        tick: { f1: 650, f2: 850, type: 'triangle', dur: 0.06, vol: 0.04 },
        streak: { f1: 1046, f2: 1300, type: 'sine', dur: 0.1, vol: 0.08 }
      };
      const p = profiles[type] || profiles.tick;
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
      const locked = document.pointerLockElement === canvasRef.current;
      setPointerLocked(locked);
      if (locked) {
        crosshairInitRef.current = true;
      } else if (gameStateRef.current === 'playing') {
        showFeedbackText('CURSOR UNLOCKED - Click Canvas', 'error');
      }
    };
    document.addEventListener('pointerlockchange', h);
    return () => document.removeEventListener('pointerlockchange', h);
  }, [showFeedbackText]);

  // Capture relative pointer lock movements
  useEffect(() => {
    const h = (e) => {
      if (document.pointerLockElement !== canvasRef.current) return;
      const sens = sensitivityMultiplierRef.current;
      virtualCrosshair.current.x += (e.movementX || 0) * sens;
      virtualCrosshair.current.y += (e.movementY || 0) * sens;

      const c = canvasRef.current;
      if (c) {
        virtualCrosshair.current.x = Math.max(0, Math.min(c.width, virtualCrosshair.current.x));
        virtualCrosshair.current.y = Math.max(0, Math.min(c.height, virtualCrosshair.current.y));
      }
    };
    document.addEventListener('mousemove', h);
    return () => document.removeEventListener('mousemove', h);
  }, []);

  const resetGame = useCallback(() => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    isActiveRef.current = false;
    setGameState('start'); gameStateRef.current = 'start';
    setScore(0); setStreak(0); setBestStreak(0); setTrackingAccuracy(0);
    timeLeftRef.current = DRILL_DURATION; setTimeLeft(DRILL_DURATION);
    crosshairInitRef.current = false;
    if (document.pointerLockElement) {
      document.exitPointerLock();
    }
  }, []);

  useEffect(() => {
    const h = () => {
      const active = !!document.fullscreenElement;
      setIsFullscreen(active);
      if (!active && gameStateRef.current === 'playing') {
        resetGame();
      }
    };
    document.addEventListener('fullscreenchange', h);
    return () => document.removeEventListener('fullscreenchange', h);
  }, [resetGame]);

  const updateBestScore = useCallback((fs) => {
    try {
      const c = parseInt(localStorage.getItem('verticalAirTrackBestScore') || '0', 10);
      if (fs > c) {
        localStorage.setItem('verticalAirTrackBestScore', fs.toString());
        setBestScore(fs);
      }
    } catch(e){}
  }, []);

  const launchNewTarget = useCallback(() => {
    const { width: cw, height: ch } = canvasSizeRef.current;
    if (cw <= 0 || ch <= 0) return;

    // Launch from bottom edge
    targetRef.current.x = cw * (0.2 + Math.random() * 0.6);
    targetRef.current.y = ch - 20;
    targetRef.current.r = currentTargetSize;

    // High upward velocity, moderate horizontal velocity
    targetRef.current.vy = -350 - Math.random() * 120;
    targetRef.current.vx = (Math.random() - 0.5) * 220;
  }, [currentTargetSize]);

  const startTimer = useCallback(() => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    timerIntervalRef.current = setInterval(() => {
      if (gameStateRef.current === 'playing' && isActiveRef.current) {
        timeLeftRef.current -= 1;
        setTimeLeft(timeLeftRef.current);
        if (timeLeftRef.current <= 0) {
          clearInterval(timerIntervalRef.current);
          timerIntervalRef.current = null;
          setGameState('gameOver');
          gameStateRef.current = 'gameOver';
          isActiveRef.current = false;
          updateBestScore(scoreRef.current);
    // Record telemetry for AI coaching system
    try {
      recordDrillResult('vertical-air-track', {
        score: scoreRef.current,
        accuracy: null,
        reactionTimeMs: null,
        trackingAccuracy: trackingAccuracy,
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
        }
      }
    }, 1000);
  }, [updateBestScore]);

  const startGame = useCallback(() => {
    // Get adaptive difficulty parameters
    const adaptive = getAdaptiveParams('vertical-air-track');

    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    try {
      const el = pageRef.current;
      if (el && !document.fullscreenElement) {
        el.requestFullscreen().catch((e) => console.warn("Fullscreen request blocked", e));
        setIsFullscreen(true);
      }
    } catch(e) {
      console.warn("Fullscreen request blocked", e);
    }

    setGameState('playing'); gameStateRef.current = 'playing';
    setScore(0); scoreRef.current = 0;
    setStreak(0); streakRef.current = 0; if (typeof checkSensitivityAdjustment === 'function') checkSensitivityAdjustment('tracking_tick', { isLocked: false, dist: dist, targetSize: target.r, target: target }); if (typeof checkSensitivityAdjustment === 'function') checkSensitivityAdjustment('tracking_tick', { isLocked: false, dist: dist, targetSize: target.r, target: target }); setBestStreak(0);
    setTrackingAccuracy(0);
    onTargetFramesRef.current = 0;
    totalFramesRef.current = 0;
    overshootFramesRef.current = 0;
    undershootFramesRef.current = 0;
    trackingAccumulatorRef.current = 0;
    timeLeftRef.current = DRILL_DURATION; setTimeLeft(DRILL_DURATION);
    isActiveRef.current = true;
    crosshairInitRef.current = false;

    // Launch initial target
    launchNewTarget();
    startTimer();

    if (canvasRef.current) {
      try {
        canvasRef.current.requestPointerLock();
      } catch (e) {
        console.warn("Pointer lock blocked", e);
      }
    }
    crosshairInitRef.current = true;
  }, [startTimer, requestPointerLock, launchNewTarget]);

  // Main rendering loop (360Hz logical update sub-loop)
  useEffect(() => {
    if (gameState !== 'playing') return;
    const cvs = canvasRef.current; if (!cvs) return;
    const ctx = cvs.getContext('2d');

    const updateCanvasLayout = () => {
      const cr = containerRef.current; if (!cr) return;
      const rect = cr.getBoundingClientRect();
      let w = rect.width, h = w * (9/16);
      if (h > rect.height) { h = rect.height; w = h * (16/9); }
      cvs.width = w; cvs.height = h;
      cvs.style.width = `${w}px`;
      cvs.style.height = `${h}px`;
      canvasSizeRef.current = { width: w, height: h };
      cvs.style.position = 'absolute';
      cvs.style.left = `${(rect.width - w) / 2}px`;
      cvs.style.top = `${(rect.height - h) / 2}px`;

      if (w > 0 && h > 0 && (!crosshairInitRef.current || (virtualCrosshair.current.x === 0 && virtualCrosshair.current.y === 0))) {
        virtualCrosshair.current = { x: w / 2, y: h / 2 };
        crosshairInitRef.current = true;
      }
    };

    updateCanvasLayout();
    window.addEventListener('resize', updateCanvasLayout);

    let lastTime = performance.now();

    const loop = (now) => {
      const dt = Math.min(0.033, (now - lastTime) / 1000);
      lastTime = now;

      const { width: cw, height: ch } = canvasSizeRef.current;
      const target = targetRef.current;
      const crosshair = virtualCrosshair.current;

      if (isActiveRef.current && cw > 0 && ch > 0) {
        // Physics update: Parabolic arc with gravity drag
        target.x += target.vx * dt;
        target.y += target.vy * dt;
        target.vy += GRAVITY_CONSTANT * dt;

        // Screen boundaries bounce/relaunch
        if (target.x - target.r < 0) {
          target.x = target.r; target.vx = Math.abs(target.vx);
        } else if (target.x + target.r > cw) {
          target.x = cw - target.r; target.vx = -Math.abs(target.vx);
        }

        // Relaunch target if it hits bottom or goes out vertically
        if (target.y > ch - 10 && target.vy > 0) {
          launchNewTarget();
        } else if (target.y < -200) {
          launchNewTarget();
        }

        // Track frame overlaps
        totalFramesRef.current++;
        const dist = Math.hypot(crosshair.x - target.x, crosshair.y - target.y);
        const onTarget = dist < target.r;

        if (onTarget) { if (typeof checkSensitivityAdjustment === 'function') checkSensitivityAdjustment('hit'); if (typeof checkSensitivityAdjustment === 'function') checkSensitivityAdjustment('hit');
          onTargetFramesRef.current++;
          streakRef.current++;
          setStreak(streakRef.current);
          if (streakRef.current > bestStreak) {
            setBestStreak(streakRef.current);
          }

          // Accumulate tracking ticks
          trackingAccumulatorRef.current += dt;
          if (trackingAccumulatorRef.current >= 0.1) {
            scoreRef.current += Math.min(5, Math.floor(1 + streakRef.current / 80));
            setScore(scoreRef.current);
            trackingAccumulatorRef.current = 0;
            if (streakRef.current % 100 === 0) {
              playSound('streak');
              showFeedbackText(`🔥 STREAK x${streakRef.current}!`, 'success');
            } else if (streakRef.current % 10 === 0) {
              playSound('tick');
            }
          }
        } else {
          streakRef.current = 0; if (typeof checkSensitivityAdjustment === 'function') checkSensitivityAdjustment('tracking_tick', { isLocked: false, dist: dist, targetSize: target.r, target: target }); if (typeof checkSensitivityAdjustment === 'function') checkSensitivityAdjustment('tracking_tick', { isLocked: false, dist: dist, targetSize: target.r, target: target });
          setStreak(0);
          trackingAccumulatorRef.current = 0;

          // Track overshoots / undershoots
          if (dist > target.r && dist < target.r + 50) {
            overshootFramesRef.current++;
          } else if (dist >= target.r + 50) {
            undershootFramesRef.current++;
          }
        }

        setTrackingAccuracy(Math.round((onTargetFramesRef.current / totalFramesRef.current) * 100));
      }

      // Draw background
      ctx.fillStyle = '#060a13';
      ctx.fillRect(0, 0, cw, ch);

      // Grid background lines
      ctx.strokeStyle = 'rgba(0, 255, 136, 0.015)';
      ctx.lineWidth = 1;
      for (let i = 0; i < cw; i += 40) {
        ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, ch); ctx.stroke();
      }

      // Draw trajectory path helpers (subtle visual indicator)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      let tx = target.x, ty = target.y, tvy = target.vy;
      ctx.moveTo(tx, ty);
      for(let step = 0; step < 30; step++) {
        tx += target.vx * 0.05;
        ty += tvy * 0.05;
        tvy += GRAVITY_CONSTANT * 0.05;
        ctx.lineTo(tx, ty);
      }
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw target sphere
      const dist = Math.hypot(crosshair.x - target.x, crosshair.y - target.y);
      const isTracking = dist < target.r;
      
      ctx.shadowBlur = isTracking ? 18 : 6;
      ctx.shadowColor = isTracking ? '#3b82f6' : '#94a3b8';
      ctx.fillStyle = isTracking ? 'rgba(59, 130, 246, 0.85)' : 'rgba(148, 163, 184, 0.6)';
      ctx.beginPath();
      ctx.arc(target.x, target.y, target.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Outer rings
      ctx.strokeStyle = isTracking ? '#60a5fa' : '#475569';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(target.x, target.y, target.r + 5, 0, Math.PI * 2);
      ctx.stroke();

      // Draw crosshair
      if (crosshair.x > 0 && crosshair.x < cw && crosshair.y > 0 && crosshair.y < ch) {
        ctx.strokeStyle = pointerLocked ? '#00ff88' : '#ffbb00';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(crosshair.x, crosshair.y, 8, 0, Math.PI * 2);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(crosshair.x - 16, crosshair.y); ctx.lineTo(crosshair.x - 5, crosshair.y);
        ctx.moveTo(crosshair.x + 5, crosshair.y); ctx.lineTo(crosshair.x + 16, crosshair.y);
        ctx.moveTo(crosshair.x, crosshair.y - 16); ctx.lineTo(crosshair.x, crosshair.y - 5);
        ctx.moveTo(crosshair.x, crosshair.y + 5); ctx.lineTo(crosshair.x, crosshair.y + 16);
        ctx.stroke();

        ctx.fillStyle = pointerLocked ? '#00ff88' : '#ffbb00';
        ctx.beginPath();
        ctx.arc(crosshair.x, crosshair.y, 2, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!pointerLocked) {
        ctx.fillStyle = 'rgba(8, 13, 26, 0.9)';
        ctx.fillRect(cw / 2 - 190, ch / 2 - 25, 380, 50);
        ctx.strokeStyle = '#3b82f6';
        ctx.strokeRect(cw / 2 - 190, ch / 2 - 25, 380, 50);
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 11px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('CLICK CANVAS TO CAPTURE RAW MOUSE INPUT', cw / 2, ch / 2 + 4);
      }

      animationRef.current = requestAnimationFrame(loop);
    };

    animationRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', updateCanvasLayout);
    };
  }, [gameState, pointerLocked, launchNewTarget, playSound, bestStreak, showFeedbackText]);

  return (
    <div ref={pageRef} className="min-h-screen select-none font-mono bg-[#080d1a] text-slate-100 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-950/15 via-[#080d1a] to-[#080d1a] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,149,255,0.02)_1px,_transparent_1px),_linear-gradient(90deg,_rgba(0,149,255,0.02)_1px,_transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />

      <div className={`${isFullscreen ? 'w-full h-screen p-0 m-0' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'} relative z-10`}>
        {!isFullscreen && (
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-2 text-[10px] text-slate-400 uppercase tracking-widest">
              <li><Link href="/" className="hover:text-red-400 transition-colors"><Home className="w-3.5 h-3.5" /></Link></li>
              <li><ChevronRight className="w-3 h-3 text-slate-700" /></li>
              <li><Link href="/drills/fps" className="hover:text-red-400 transition-colors">FPS Sector</Link></li>
              <li><ChevronRight className="w-3 h-3 text-slate-700" /></li>
              <li><span className="text-blue-400 font-bold">Vertical Air-Track</span></li>
            </ol>
          </nav>
        )}

        {!isFullscreen && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 border-b border-slate-900 pb-5">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-950/30 border border-blue-500/20 text-blue-400 rounded-xl">
                <Crosshair className="w-7 h-7 animate-pulse" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white uppercase bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                  Vertical Air-Track
                </h1>
                <p className="text-xs text-slate-400 tracking-wider mt-0.5 font-mono">
                  {pointerLocked ? '🟢 MOUSE LOCKED' : '🔴 CLICK CANVAS TO CAPTURE'} • {cmPer360} cm/360 • {gameType.toUpperCase()}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setSoundEnabled(!soundEnabled)} className="p-2 rounded-lg border border-slate-800 bg-[#0c1224] text-slate-350 hover:border-slate-700 transition" title="Sound">{soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}</button>
              <button onClick={startGame} className="px-4 py-2 rounded-lg border border-slate-800 bg-[#0c1224] hover:bg-slate-900 text-green-400 hover:border-slate-700 font-bold transition text-xs uppercase tracking-wider">Start Game</button>
            </div>
          </div>
        )}

        {gameState === 'start' && (
          <div className="absolute inset-0 bg-[#080d1a]/95 flex items-center justify-center p-6 z-30 overflow-y-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 bg-[#0c1224]/80 border border-slate-900 rounded-xl p-6 flex flex-col justify-between backdrop-blur-md">
              <div>
                <h3 className="text-xs font-bold text-blue-400 mb-4 flex items-center gap-2 border-b border-slate-900 pb-2 uppercase tracking-wider">
                  <Info className="w-4 h-4" />
                  AIR TRAJECTORY MECHANICS
                </h3>
                <ul className="space-y-4 text-xs leading-relaxed text-slate-400">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 font-bold">1.</span>
                    <span>Sphere is launched vertically from the bottom screen edge and follows real parabolic paths subject to gravity drag.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 font-bold">2.</span>
                    <span>Smoothly trace the target continuously. Keeping the crosshair on target adds tracking points and multiplies streaks.</span>
                  </li>
                  <li className="flex items-start gap-2 text-blue-300">
                    <span className="text-blue-400 font-bold">★</span>
                    <span>Apex Legends & Overwatch modes set larger airborne tracking bodies, while CS2/Valorant features micro head sizes.</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="lg:col-span-2 bg-[#0c1224]/80 border border-slate-900 rounded-xl p-6 backdrop-blur-md flex flex-col justify-between">
              <div>
                <h3 className="text-xs font-bold text-white mb-4 flex items-center gap-2 border-b border-slate-900 pb-2 uppercase tracking-wider">
                  <TrendingUp className="w-4 h-4 text-blue-400" />
                  Aim Settings Calibration
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
                      step="0.01"
                      value={inGameSens}
                      onChange={(e) => setInGameSens(Math.max(0.01, parseFloat(e.target.value) || 1))}
                      className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-2 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] text-slate-400 font-bold uppercase tracking-wider mb-2">Mouse DPI</label>
                    <input 
                      type="number"
                      step="50"
                      value={dpi}
                      onChange={(e) => setDpi(Math.max(100, parseInt(e.target.value, 10) || 800))}
                      className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-2 text-xs text-white"
                    />
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

        {true && (
          <div className={isFullscreen ? "w-full h-full" : ""}>
            

            <div 
              ref={containerRef} 
              className={isFullscreen 
                ? "w-full h-full bg-[#050811] relative overflow-hidden flex items-center justify-center" 
                : "w-full aspect-video min-h-[400px] lg:min-h-[500px] bg-[#050811] border border-slate-800 rounded-xl relative overflow-hidden flex items-center justify-center"}
            >
              <canvas ref={canvasRef} onClick={handleCanvasClick} />

            {/* S+ Pro Coach Dynamic Audio Guidance HUD & Alerts (Visual Text Hidden) */}


            {/* S+ Pro Coach Dynamic Audio Guidance HUD & Alerts (Visual Text Hidden) */}

            


              
            </div>
            
            <div className="mt-4 text-center text-[10px] text-slate-550 flex items-center justify-center gap-4">
              <span>🖱 Trace targets as they follow parabolic flight paths.</span>
              <span>• Press <kbd className="px-1.5 py-0.5 bg-slate-900 border border-slate-800 text-slate-350 rounded font-sans text-[10px]">ESC</kbd> to return to lobby.</span>
            </div>
          </div>
        )}

        {gameState === 'gameOver' && (
          <div className="absolute inset-0 bg-[#080d1a]/95 flex items-center justify-center p-6 z-30 overflow-y-auto">
            <div className="bg-[#0c1224]/80 border border-slate-900 rounded-xl p-8 backdrop-blur-md max-w-3xl mx-auto">
            <h2 className="text-xl font-bold text-blue-400 text-center mb-6 uppercase tracking-widest flex items-center justify-center gap-2">
              <Award className="w-5 h-5 text-yellow-500" />
              AIR TRAJECTORY COMPLETED
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
                    <span className="text-[10px] text-slate-550 block uppercase">Best Combo</span>
                    <span className="text-white font-bold text-sm">{bestStreak} ticks</span>
                  </div>
                  <div className="bg-slate-950 p-3 rounded border border-slate-900 text-center">
                    <span className="text-[10px] text-slate-550 block uppercase">Accuracy %</span>
                    <span className="text-white font-bold text-sm">{trackingAccuracy}%</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-slate-950 p-4 rounded border border-slate-900">
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-900 pb-2 mb-3">
                    DIAGNOSTICS ANALYTICS
                  </h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-550">Target Sweeps (Overshoots):</span>
                      <span className="text-red-400 font-bold">{Math.round((overshootFramesRef.current / (totalFramesRef.current || 1)) * 100)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-550">Lagging behind (Undershoots):</span>
                      <span className="text-blue-400 font-bold">{Math.round((undershootFramesRef.current / (totalFramesRef.current || 1)) * 100)}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#080d1a] border border-slate-800 rounded-lg p-5 mb-8 text-left shadow-inner">
              <h3 className="text-xs font-bold text-blue-400 font-mono uppercase tracking-widest border-b border-slate-800 pb-2 mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-500 animate-pulse" />
                AI COACH DIAGNOSTICS & RECOMMENDATION
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs leading-relaxed text-slate-350">
                <div className="space-y-2 border-r border-slate-900 pr-6">
                  <p className="font-bold text-white uppercase text-[10px] tracking-wider font-mono">Performance Index:</p>
                  <ul className="space-y-2 list-disc pl-4">
                    {overshootFramesRef.current > undershootFramesRef.current * 1.5 ? (
                      <li className="text-red-400">⚠️ Deceleration Deficit: You sweep past targets when they reach the peak. Focus on decelerating your wrist.</li>
                    ) : (
                      <li className="text-blue-400">⚠️ Acceleration Lag: You are falling behind targets on gravity falls. Increase acceleration pulls during target falls.</li>
                    )}
                  </ul>
                </div>
                <div className="space-y-3">
                  <p className="font-bold text-white uppercase text-[10px] tracking-wider font-mono">Esports Prescription Routine:</p>
                  <p className="text-slate-350">
                    Your smooth parabolic tracing is solid. Spend 10 runs in Overwatch mode. Practicing with vertical gravity arcs helps muscle coordination transition between vertical and horizontal dimensions.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center border-t border-slate-900 pt-6">
              <button onClick={startGame} className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition"><RefreshCw className="w-4.5 h-4.5" />Train Again</button>
              <Link href="/drills/fps" className="w-full sm:w-auto"><button className="w-full px-6 py-2.5 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-350 font-bold rounded-lg text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition">Return to Lobby</button></Link>
            </div>
          </div>
          </div>
        )}
      </div>
    </div>
  );
}
