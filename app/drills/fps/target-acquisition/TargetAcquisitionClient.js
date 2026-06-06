'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { COACHES, getActiveCoach, getCoachResponse, speakCoachText, handleCoachFeedback } from '../../../../lib/coachVoice';
import Link from 'next/link';
import { recordDrillResult } from '../../../../lib/performanceTelemetry';
import { getAdaptiveParams } from '../../../../lib/adaptiveDifficulty';

import { 
  Target, Zap, Timer, Trophy, 
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, Eye,
  Info, Activity, Crosshair, Home, ChevronRight, Play,
  Lock, AlertCircle, RefreshCw, BarChart3, TrendingUp, Lightbulb, Clock, CheckCircle2, GraduationCap
} from 'lucide-react';

const DRILL_DURATION = 60; // 60 seconds

export default function TargetAcquisitionClient() {
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
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(DRILL_DURATION);
  const [targetsCleared, setTargetsCleared] = useState(0);
  const [currentSet, setCurrentSet] = useState(1);
  const [pointerLocked, setPointerLocked] = useState(false);
  const [gameType, setGameType] = useState('valorant'); // valorant, cs2, apex, overwatch, fortnite
  const [dpi, setDpi] = useState(800);
  const [inGameSens, setInGameSens] = useState(0.35);
  const [cmPer360, setCmPer360] = useState(0);

  // High-performance mutable refs (Esports Grade)
  const virtualCrosshair = useRef({ x: 0, y: 0 });
  const canvasSizeRef = useRef({ width: 800, height: 450 });
  const crosshairInitRef = useRef(false);
  const sensitivityMultiplierRef = useRef(1);

  // Game Logic Refs
  const targetsRef = useRef([]);
  const scoreRef = useRef(0);
  const streakRef = useRef(0);
  const isPenaltyRef = useRef(false);
  const timerIntervalRef = useRef(null);
  const isActiveRef = useRef(false);
  const gameStateRef = useRef('start');
  const audioCtxRef = useRef(null);
  const timeLeftRef = useRef(DRILL_DURATION);
  const bestStreakRef = useRef(0);

  // VFX Refs
  const particlesRef = useRef([]);
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


  // Client-side initialization
  useEffect(() => {
    try {
      const s = localStorage.getItem('targetAcquisitionBestScore');
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

  // Compute sensitivity
  useEffect(() => {
    const yaw = GAME_YAWS[gameType] || 0.07;
    const counts = 360 / (yaw * inGameSens);
    const inches = counts / dpi;
    const cm = inches * 2.54;
    setCmPer360(cm.toFixed(1));

    sensitivityMultiplierRef.current = 45.0 / cm;
  }, [dpi, inGameSens, gameType]);

  const updateBestScore = useCallback((fs) => {
    try {
      const c = parseInt(localStorage.getItem('targetAcquisitionBestScore') || '0', 10);
      if (fs > c) {
        localStorage.setItem('targetAcquisitionBestScore', fs.toString());
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
        correct: { f1: 880, f2: 1200, type: 'sine', dur: 0.08, vol: 0.06 },
        wrong: { f1: 330, f2: 180, type: 'triangle', dur: 0.22, vol: 0.12 },
        streak: { f1: 1046, f2: 1800, type: 'sine', dur: 0.16, vol: 0.08 },
        setComplete: { f1: 1200, f2: 1500, type: 'sine', dur: 0.1, vol: 0.08 }
      };
      const p = profiles[type] || profiles.correct;
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

  const generateStack = useCallback(() => {
    const cvs = canvasRef.current; if (!cvs) return;
    const targets = [];
    
    // Scale target sizes based on gameType
    let size = 22;
    if (gameType === 'valorant' || gameType === 'cs2') size = 12;
    else if (gameType === 'apex') size = 26;
    else if (gameType === 'overwatch') size = 24;

    for (let i = 0; i < 5; i++) {
      targets.push({
        x: 120 + Math.random() * (cvs.width - 240),
        y: 100 + Math.random() * (cvs.height - 200),
        r: size,
        val: 1.0 - (i * 0.16) // Opacity hierarchy (brightest to dimmest)
      });
    }
    targets.sort(() => Math.random() - 0.5);
    targetsRef.current = targets;
  }, [gameType]);

  const triggerPenalty = useCallback(() => {
    if (!isActiveRef.current) return;
    isPenaltyRef.current = true;
    streakRef.current = 0;
    setStreak(0);
    scoreRef.current = Math.max(0, scoreRef.current - 1);
    setScore(scoreRef.current);
    playSound('wrong');
    showFeedbackText('✗ Wrong target! -1 Point', 'error');

    setTimeout(() => {
      isPenaltyRef.current = false;
      if (isActiveRef.current) generateStack();
    }, 450);
  }, [playSound, showFeedbackText, generateStack]);

  const handleShot = useCallback(() => {
    if (gameStateRef.current !== 'playing' || !isActiveRef.current || isPenaltyRef.current || !crosshairInitRef.current) return;

    const mouse = virtualCrosshair.current;
    const targets = targetsRef.current;
    if (targets.length === 0) return;

    // Find the current target (highest opacity value)
    const currentTarget = [...targets].sort((a, b) => b.val - a.val)[0];
    const dist = Math.hypot(mouse.x - currentTarget.x, mouse.y - currentTarget.y);
    const hitTolerance = currentTarget.r + 14;

    if (dist < hitTolerance) {
      targetsRef.current = targets.filter(t => t !== currentTarget);
      playSound('correct');

      if (targetsRef.current.length === 0) {
        scoreRef.current += 1;
        setScore(scoreRef.current);
        streakRef.current++;
        setStreak(streakRef.current);

        if (streakRef.current > bestStreakRef.current) {
          bestStreakRef.current = streakRef.current;
          setBestStreak(streakRef.current);
        }

        setTargetsCleared(p => p + 1);
        setCurrentSet(p => p + 1);
        playSound('setComplete');

        if (streakRef.current % 5 === 0) {
          playSound('streak');
          showFeedbackText(`🔥 COMBO STREAK x${streakRef.current}!`, 'success');
        } else {
          showFeedbackText('✓ Set complete! +1', 'success');
        }
        generateStack();
      }
    } else {
      // Check if clicked any other target incorrectly
      let hitWrong = false;
      targets.forEach(t => {
        if (Math.hypot(mouse.x - t.x, mouse.y - t.y) < (t.r + 14) && t !== currentTarget) {
          hitWrong = true;
        }
      });
      if (hitWrong) {
        triggerPenalty();
      }
    }
  }, [triggerPenalty, playSound, showFeedbackText, generateStack]);

  useEffect(() => {
    const h = (e) => {
      if (e.target.tagName === 'BUTTON' || e.target.closest('button')) return;
      if (gameState === 'playing' && document.pointerLockElement) {
        e.preventDefault();
        handleShot();
      }
    };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, [gameState, handleShot]);

  const resetGame = useCallback(() => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    isActiveRef.current = false;
    setGameState('start'); gameStateRef.current = 'start';
    setScore(0); setStreak(0); setBestStreak(0); setTimeLeft(DRILL_DURATION);
    setTargetsCleared(0); setCurrentSet(1);
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
    // Record telemetry for AI coaching system
    try {
      recordDrillResult('target-acquisition', {
        score: scoreRef.current,
        accuracy: null,
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

    document.exitPointerLock();
  }, [updateBestScore]);

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

  // Canvas render loop
  useEffect(() => {
    if (gameState !== 'playing') return;
    const cvs = canvasRef.current; if (!cvs) return;
    const ctx = cvs.getContext('2d', { alpha: false, desynchronized: true });

    const updateSize = () => {
      const ct = containerRef.current; if (!ct) return;
      const cr = ct.getBoundingClientRect();
      let w = cr.width, h = w * (9/16);
      if (h > cr.height) { h = cr.height; w = h * (16/9); }
      cvs.width = w; cvs.height = h;
      cvs.style.width = `${w}px`;
      cvs.style.height = `${h}px`;
      canvasSizeRef.current = { width: w, height: h };
      cvs.style.position = 'absolute';
      cvs.style.left = `${(cr.width - w) / 2}px`;
      cvs.style.top = `${(cr.height - h) / 2}px`;
      if (w > 0 && h > 0 && (!crosshairInitRef.current || (virtualCrosshair.current.x === 0 && virtualCrosshair.current.y === 0))) {
        virtualCrosshair.current = { x: w / 2, y: h / 2 };
        crosshairInitRef.current = true;
      };
      generateStack();
    };

    updateSize();
    window.addEventListener('resize', updateSize);

    function draw() {
      if (gameStateRef.current !== 'playing') return;

      ctx.fillStyle = isPenaltyRef.current ? "#200508" : "#050508";
      ctx.fillRect(0, 0, cvs.width, cvs.height);

      // Grid Pattern
      ctx.strokeStyle = 'rgba(0, 255, 136, 0.03)';
      ctx.lineWidth = 1;
      for (let x = 0; x < cvs.width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0); ctx.lineTo(x, cvs.height);
        ctx.stroke();
      }
      for (let y = 0; y < cvs.height; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y); ctx.lineTo(cvs.width, y);
        ctx.stroke();
      }

      // Draw targets
      targetsRef.current.forEach((t) => {
        ctx.shadowBlur = 10;
        ctx.shadowColor = `rgba(0, 255, 136, ${t.val})`;
        ctx.fillStyle = `rgba(0, 255, 136, ${t.val})`;
        ctx.beginPath();
        ctx.arc(t.x, t.y, t.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.strokeStyle = `rgba(255, 255, 255, ${t.val * 0.25})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(t.x, t.y, t.r + 6, 0, Math.PI * 2);
        ctx.stroke();
      });

      // Reticle
      const m = virtualCrosshair.current;
      if (m.x > 0 && m.x < cvs.width && m.y > 0 && m.y < cvs.height) {
        const cc = pointerLocked ? '#00ff88' : '#ffbb00';
        ctx.strokeStyle = cc;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(m.x - 14, m.y); ctx.lineTo(m.x + 14, m.y);
        ctx.moveTo(m.x, m.y - 14); ctx.lineTo(m.x, m.y + 14);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(m.x, m.y, 20, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(0, 255, 136, 0.2)';
        ctx.stroke();

        ctx.fillStyle = cc;
        ctx.beginPath();
        ctx.arc(m.x, m.y, 2, 0, Math.PI*2);
        ctx.fill();
      }

      animationRef.current = requestAnimationFrame(draw);
    }

    animationRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', updateSize);
    };
  }, [gameState, pointerLocked, generateStack]);

  const startGame = useCallback(() => {
    // Get adaptive difficulty parameters
    const adaptive = getAdaptiveParams('target-acquisition');

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

    setGameState('playing');
    gameStateRef.current = 'playing';
    setScore(0); setStreak(0); setBestStreak(0); setTimeLeft(DRILL_DURATION);
    setTargetsCleared(0); setCurrentSet(1);
    isActiveRef.current = true; scoreRef.current = 0; streakRef.current = 0; bestStreakRef.current = 0;
    isPenaltyRef.current = false;
    crosshairInitRef.current = false;

    if (canvasRef.current) generateStack();
    startTimer();

    if (canvasRef.current) {
      try {
        canvasRef.current.requestPointerLock();
      } catch (e) {
        console.warn("Pointer lock blocked", e);
      }
    }
    crosshairInitRef.current = true;
  }, [startTimer, requestPointerLock, generateStack]);

  return (
    <div ref={pageRef} className="min-h-screen select-none font-mono bg-[#080d1a] text-slate-100 relative overflow-hidden">
      
      {/* Background patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-950/20 via-[#080d1a] to-[#080d1a] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(245,158,11_0.03)_1px,_transparent_1px),_linear-gradient(90deg,_rgba(245,158,11_0.03)_1px,_transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />

      <div className={`${isFullscreen ? 'w-full h-screen p-0 m-0' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'} relative z-10`}>
        
        {/* Navigation Breadcrumb */}
        {!isFullscreen && (
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-2 text-[10px] text-slate-400 uppercase tracking-widest">
              <li><Link href="/" className="hover:text-amber-400 transition-colors"><Home className="w-3.5 h-3.5" /></Link></li>
              <li><ChevronRight className="w-3 h-3 text-slate-700" /></li>
              <li><Link href="/drills/fps" className="hover:text-amber-400 transition-colors">FPS Sector</Link></li>
              <li><ChevronRight className="w-3 h-3 text-slate-700" /></li>
              <li><span className="text-amber-400 font-bold">Target Acquisition</span></li>
            </ol>
          </nav>
        )}

        {/* Drill Header */}
        {!isFullscreen && (
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6 border-b border-slate-900 pb-5">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-amber-950/30 border border-amber-500/20 text-amber-400 rounded-xl">
                <Target className="w-7 h-7 animate-pulse" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white uppercase bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                  Target Acquisition
                </h1>
                <p className="text-xs text-slate-400 tracking-wider mt-0.5">
                  {pointerLocked ? '🟢 RAW INPUT CAPTURING' : '🔴 CLICK CANVAS TO CAPTURE'} • {cmPer360} cm/360 • Luminance Priority
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
                <GraduationCap className="w-5 h-5 text-amber-400" />
                Luminance Priority Aiming
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                This cognitive target identification drill works on your eye-to-hand priority decisions. Clear the target set of 5 balls by shooting them in sequence from brightest (highest opacity) to dimmest. Shooting out of sequence triggers a penalty.
              </p>

              <div className="p-4 bg-slate-950/50 rounded-lg border border-amber-500/10 mb-4">
                <h3 className="text-xs font-bold text-amber-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
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
                  <span className="text-[10px] text-slate-550 block mb-0.5">SET LAYOUT</span>
                  <span className="text-amber-400 font-bold text-sm">5 STACKS</span>
                </div>
                <div className="bg-[#080d1a] border border-slate-900 rounded-lg p-3 text-center">
                  <span className="text-[10px] text-slate-550 block mb-0.5">LUMINANCE RANGE</span>
                  <span className="text-white font-bold text-sm">0.4 - 1.0</span>
                </div>
                <div className="bg-[#080d1a] border border-slate-900 rounded-lg p-3 text-center">
                  <span className="text-[10px] text-slate-550 block mb-0.5">DIFFICULTY</span>
                  <span className="text-amber-400 font-bold text-sm">HARD</span>
                </div>
              </div>
            </div>

            <div className="bg-[#0c1224]/85 border border-slate-900 rounded-xl p-6 shadow-2xl backdrop-blur-md flex flex-col justify-between">
              <div>
                <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Calibration Panel</h2>
                
                <div className="space-y-4">
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
                      className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-2 text-xs text-white focus:outline-none focus:border-amber-500/50"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] text-slate-400 font-bold uppercase tracking-wider mb-2">Mouse DPI</label>
                    <input 
                      type="number"
                      step="50"
                      value={dpi}
                      onChange={(e) => setDpi(Math.max(100, parseInt(e.target.value, 10) || 800))}
                      className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-2 text-xs text-white focus:outline-none focus:border-amber-500/50"
                    />
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
                  className="w-full sm:w-auto px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/25 uppercase tracking-wider transition animate-pulse"
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
              : "w-full aspect-video min-h-[400px] lg:min-h-[500px] bg-[#050811] border border-slate-800 rounded-xl relative overflow-hidden flex items-center justify-center"}
          >
            <canvas ref={canvasRef} onClick={handleCanvasClick} />

            {/* S+ Pro Coach Dynamic Audio Guidance HUD & Alerts (Visual Text Hidden) */}


            {/* S+ Pro Coach Dynamic Audio Guidance HUD & Alerts (Visual Text Hidden) */}

            


            

            {/* Feed Overlay */}
            <div className="absolute inset-0 pointer-events-none flex flex-col justify-center items-center gap-2 overflow-hidden select-none z-10">
              {feedbacks.map((f) => (
                <div 
                  key={f.id} 
                  className={`px-4 py-2 rounded-lg font-bold text-lg border shadow-2xl transition-all duration-300 animate-bounce ${
                    f.type === 'success' 
                      ? 'bg-green-950/90 border-green-500/40 text-green-400' 
                      : 'bg-red-950/90 border-red-500/40 text-red-400'
                  }`}
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
            <h2 className="text-2xl font-black text-white uppercase tracking-wider mb-2">Acquisition Concluded</h2>
            <p className="text-xs text-slate-400 leading-relaxed mb-6">
              Luminance priority profile {gameType.toUpperCase()} completed. Practice builds high-speed threat prioritization.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
              <div className="bg-[#080d1a] border border-slate-900 rounded-lg p-3">
                <span className="text-[10px] text-slate-550 block mb-0.5">FINAL SCORE</span>
                <span className="text-white font-bold text-lg">{score}</span>
              </div>
              <div className="bg-[#080d1a] border border-slate-900 rounded-lg p-3">
                <span className="text-[10px] text-slate-550 block mb-0.5">BEST RECORD</span>
                <span className="text-yellow-500 font-bold text-lg">{bestScore}</span>
              </div>
              <div className="bg-[#080d1a] border border-slate-900 rounded-lg p-3">
                <span className="text-[10px] text-slate-550 block mb-0.5">MAX STREAK</span>
                <span className="text-amber-400 font-bold text-lg">{bestStreak}x</span>
              </div>
              <div className="bg-[#080d1a] border border-slate-900 rounded-lg p-3">
                <span className="text-[10px] text-slate-550 block mb-0.5">SETS SOLVED</span>
                <span className="text-blue-400 font-bold text-lg">{targetsCleared}</span>
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
                className="flex-1 py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg text-xs uppercase tracking-wider transition shadow-lg shadow-amber-500/20"
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