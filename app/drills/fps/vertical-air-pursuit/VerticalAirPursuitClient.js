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
const TRACK_RADIUS = 11; // tight S+ tracking hitbox

export default function VerticalAirPursuitClient() {


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
  
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(DRILL_DURATION);
  const [accuracy, setAccuracy] = useState(100); // tracking coherence percentage
  const [pointerLocked, setPointerLocked] = useState(false);

          
  // Target physics
  const targetPos = useRef({ x: 400, y: 150 });
  const targetVel = useRef({ x: 200, y: 100 });
  const windDraft = useRef(0);
  const lastWindSwapRef = useRef(0);

  // Recoil shake simulation
  const isFiring = useRef(false);
  const recoilOffset = useRef({ x: 0, y: 0 });

  // Telemetry logs
  const [analyticsData, setAnalyticsData] = useState({
    trackingTicks: 0,
    totalTicks: 0,
    stabilityIndex: 0, // RMSE deviation
    adjustLatency: 0, // delay (ms) to adjust to wind swaps
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
  const windSwapsRef = useRef([]); // timestamps of wind direction swaps
  const lastAdjustTimesRef = useRef([]);
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
  


  // S+ AI Coach Performance Tracking & Sensitivity Auto-Adjustment States
  

  

  


  // Auto-save user calibration preferences
  


  // TTS speech helper
  

  useEffect(() => {
    try {
      const s = localStorage.getItem('verticalAirBestScore');
      if (s) {
        const p = parseInt(s, 10);
        if (!isNaN(p)) setBestScore(p);
      }
            } catch (e) {}
    
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.getVoices();
    }
  }, []);

  useEffect(() => { gameStateRef.current = gameState; }, [gameState]);

  // Sensitivity math
  

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
      const f = { success: 950, fail: 240, combo: 1350, penalty: 110 };
      o.frequency.setValueAtTime(f[type] || 440, now);
      g.gain.setValueAtTime(type==='combo'?0.05:type==='penalty'?0.1:0.04, now);
      g.gain.exponentialRampToValueAtTime(0.001, now+0.1);
      o.start(now); o.stop(now+0.1);
    } catch (e) {}
  }, [soundEnabled, initAudio]);

  const updateBestScore = useCallback((fs) => {
    try {
      const c = parseInt(localStorage.getItem('verticalAirBestScore') || '0', 10);
      if (fs > c) {
        localStorage.setItem('verticalAirBestScore', fs.toString());
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
    const handleMouseMove = (e) =>  {
      if (document.pointerLockElement !== canvasRef.current && !document.pointerLockElement) return;
      const dx = (e.movementX || 0) * universalSens;
      const dy = (e.movementY || 0) * universalSens;
      const c = canvasRef.current;
      if (c) {
        virtualCrosshair.current.x = Math.max(0, Math.min(c.width, virtualCrosshair.current.x + dx));
        virtualCrosshair.current.y = Math.max(0, Math.min(c.height, virtualCrosshair.current.y + dy));
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
      recordDrillResult('vertical-air-pursuit', {
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

    // AI Coach Speech Diagnostics at Game Over
    const trackingCoherence = totalTicksRef.current > 0 ? Math.round((trackingTicksRef.current / totalTicksRef.current) * 100) : 100;
    const stability = analyticsData.stabilityIndex;
    const reactionDelay = analyticsData.adjustLatency;

    let diagnoseText = `Air pursuit complete. Final score is ${scoreRef.current}. `;
    if (trackingCoherence >= 65) {
      diagnoseText += "Your smooth vertical tracking is predator level. ";
    } else {
      diagnoseText += `Your tracking coherence is ${trackingCoherence} percent. You are lacking arm sweep smoothness. `;
    }

    if (stability <= 15) {
      diagnoseText += "Your mouse sweeps are exceptionally stable under recoil vibration.";
    } else {
      diagnoseText += `You have high correction jitter measuring ${stability} pixels standard deviation. Reduce wrist tension or lower in-game sensitivity.`;
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
    const adaptive = getAdaptiveParams('vertical-air-pursuit');

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
    windSwapsRef.current = [];
    lastAdjustTimesRef.current = [];
    isFiring.current = false;
    crosshairInitializedRef.current = false;

    setAnalyticsData({ trackingTicks: 0, totalTicks: 0, stabilityIndex: 0, adjustLatency: 0 });
    
    targetPos.current = { x: 400, y: 150 };
    targetVel.current = { x: 180, y: 80 };
    windDraft.current = 0;
    lastWindSwapRef.current = performance.now();

    // Vocal instructions
    speakText("Initiating vertical air glide tracking. Smooth fore-arm sweeps required. Manage recoil shake.", true);

    startTimer();
  }, [startTimer, speakText]);

  // Main game physics loop
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

      // 1. Recoil shake
      if (isFiring.current) {
        recoilOffset.current.x = (Math.random() - 0.5) * 5.5; // intense recoil visual offset
        recoilOffset.current.y = (Math.random() - 0.5) * 5.5;
      } else {
        recoilOffset.current.x *= 0.8;
        recoilOffset.current.y *= 0.8;
      }

      // 2. Wind draft swaps (every 300ms, causes horizontal air drift shifts)
      const timeSinceWindSwap = ct - lastWindSwapRef.current;
      if (timeSinceWindSwap > (Math.random() * 200 + 250)) {
        windDraft.current = (Math.random() - 0.5) * 360; // sudden draft acceleration
        lastWindSwapRef.current = ct;
        windSwapsRef.current.push({ time: ct, targetX: targetPos.current.x });
        
        // Throttled warning to adjust sweeps
        if (Math.random() < 0.2) {
          speakText("Wind draft swap!");
        }
      }

      // Physics integration
      targetVel.current.x += windDraft.current * dt;
      targetVel.current.x = Math.max(-420, Math.min(420, targetVel.current.x));

      // Sine wave vertical glide loop
      targetVel.current.y = Math.sin(ct / 320) * 160 + (Math.sin(ct / 80) * 60);

      targetPos.current.x += targetVel.current.x * dt;
      targetPos.current.y += targetVel.current.y * dt;

      // Bounces
      const radius = 18;
      if (targetPos.current.x < radius) {
        targetPos.current.x = radius;
        targetVel.current.x *= -1;
        lastWindSwapRef.current = ct;
      } else if (targetPos.current.x > cvs.width - radius) {
        targetPos.current.x = cvs.width - radius;
        targetVel.current.x *= -1;
        lastWindSwapRef.current = ct;
      }

      if (targetPos.current.y < radius) {
        targetPos.current.y = radius;
        targetVel.current.y *= -1;
      } else if (targetPos.current.y > cvs.height - 50 - radius) {
        targetPos.current.y = cvs.height - 50 - radius;
        targetVel.current.y *= -1;
      }

      // 3. Clear & Render Canvas
      ctx.fillStyle = "#020306";
      ctx.fillRect(0, 0, cvs.width, cvs.height);

      // Fine grid layout
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.012)';
      ctx.lineWidth = 1;
      for (let i = 0; i < cvs.width; i += 30) {
        ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, cvs.height); ctx.stroke();
      }
      for (let j = 0; j < cvs.height; j += 30) {
        ctx.beginPath(); ctx.moveTo(0, j); ctx.lineTo(cvs.width, j); ctx.stroke();
      }

      // Render target
      const tx = targetPos.current.x + recoilOffset.current.x;
      const ty = targetPos.current.y + recoilOffset.current.y;

      ctx.save();
      ctx.beginPath();
      ctx.arc(tx, ty, TRACK_RADIUS, 0, Math.PI * 2);
      ctx.fillStyle = "#3b82f6";
      ctx.shadowBlur = 12;
      ctx.shadowColor = "#3b82f6";
      ctx.fill();
      ctx.restore();

      // Render crosshair and deviation telemetry
      const ch = virtualCrosshair.current;
      const dev = Math.hypot(ch.x - tx, ch.y - ty);
      const isTracking = dev <= TRACK_RADIUS;

      totalTicksRef.current += 1;
      deviationsRef.current.push(dev);

      if (isTracking) {
        trackingTicksRef.current += 1;
        scoreRef.current += isFiring.current ? 4.5 : 1.2;
        if (typeof checkSensitivityAdjustment === 'function') checkSensitivityAdjustment('hit');
      } else {
        if (typeof checkSensitivityAdjustment === 'function') checkSensitivityAdjustment('tracking_tick', { isLocked: false, dist: dev, targetSize: TRACK_RADIUS, target: { vx: targetVel.current.x, vy: targetVel.current.y } });
      }

      // Wind adjust latency math
      windSwapsRef.current.forEach((swap) => {
        if (swap.processed) return;
        const timeDiff = ct - swap.time;
        if (timeDiff > 0 && timeDiff < 600 && dev <= TRACK_RADIUS * 1.5) {
          lastAdjustTimesRef.current.push(timeDiff);
          swap.processed = true;
        } else if (timeDiff >= 600) {
          swap.processed = true;
        }
      });

      setScore(Math.floor(scoreRef.current));
      
      const coherence = totalTicksRef.current > 0 ? Math.round((trackingTicksRef.current / totalTicksRef.current) * 100) : 100;
      setAccuracy(coherence);

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

      

      // Telemetry analysis
      if (totalTicksRef.current % 25 === 0) {
        const sumSquare = deviationsRef.current.reduce((a, b) => a + b * b, 0);
        const rmse = Math.sqrt(sumSquare / deviationsRef.current.length);
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
              <li><span className="text-blue-400 font-bold">S+ Vertical Air-Pursuit</span></li>
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
                  S+ Vertical Air-Pursuit
                </h1>
                <p className="text-xs text-slate-400 tracking-wider mt-0.5 animate-pulse">
                  {pointerLocked ? '🟢 TTS COACH ENGAGED' : '🔴 SECTOR STANDBY'} • {cmPer360} cm/360 • GLIDE TRAJECTORIES
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
                    AIR SPEED DYNAMICS
                  </h3>
                  <ul className="space-y-4 text-xs leading-relaxed text-slate-400">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 font-bold">1.</span>
                      <span>Target glides vertical sine paths. Random wind drafts drift it horizontally.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 font-bold">2.</span>
                      <span>Hold left click while tracking to maximize scores. Recoil vibratory shake applies.</span>
                    </li>
                    <li className="flex items-start gap-2 text-blue-300">
                      <span className="text-blue-400 font-bold">★</span>
                      <span>**Interactive AI Voice Guide**: Voice coach reads out active cues during play and diagnostics at completion.</span>
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
                    CALIBRATE AIR SWEEPS
                  </h3>
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

                  <div className="p-4 bg-slate-950 rounded border border-slate-900 flex justify-between items-center text-xs">
                    <div>
                      <span className="text-[10px] text-slate-550 block uppercase">360 Sweep Distance</span>
                      <span className="text-white font-bold">{cmPer360} cm / 360°</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-slate-550 block uppercase">Air Pursuit Radius</span>
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
              ? "w-full h-full bg-[#020306] relative overflow-hidden flex items-center justify-center cursor-none" 
              : "w-full aspect-video min-h-[400px] lg:min-h-[500px] bg-[#020306] border border-slate-800 rounded-xl relative overflow-hidden flex items-center justify-center cursor-none"}
          >
            <canvas ref={canvasRef} onClick={handleCanvasClick} />

            {/* S+ Pro Coach Dynamic Audio Guidance HUD & Alerts (Visual Text Hidden) */}


            {/* S+ Pro Coach Dynamic Audio Guidance HUD & Alerts (Visual Text Hidden) */}

            
            {/* Feed notifications */}
            <div className="absolute inset-0 pointer-events-none flex flex-col justify-center items-center gap-2 overflow-hidden select-none z-10">
              {feedbacks.map((f) => (
                <div 
                  key={f.id} 
                  className={`px-5 py-2.5 rounded border text-sm font-extrabold shadow-lg uppercase tracking-wider backdrop-blur-sm ${
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
            <span>🖱 Hold left click while tracking to simulate recoil stabilizing.</span>
            <span>• Press <kbd className="px-1.5 py-0.5 bg-slate-900 border border-slate-800 text-slate-350 rounded font-sans text-[10px]">ESC</kbd> to unlock.</span>
          </div>
        </div>

        {/* Game Over Screen */}
        {gameState === 'gameOver' && (
          <div className="absolute inset-0 bg-[#080d1a]/95 flex items-center justify-center p-6 z-30 overflow-y-auto">
            <div className="bg-[#0c1224]/85 border border-blue-500/20 rounded-xl p-8 backdrop-blur-md max-w-3xl mx-auto w-full shadow-2xl">
              <h2 className="text-xl font-bold text-blue-550 text-center mb-6 uppercase tracking-widest flex items-center justify-center gap-2 animate-pulse">
                <Award className="w-5 h-5 text-yellow-500" />
                S+ AIR PURSUIT RESOLVED
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
                      <span className="text-[10px] text-slate-550 block uppercase">Adjust Latency</span>
                      <span className="text-white font-bold text-sm">{analyticsData.adjustLatency} ms</span>
                    </div>
                  </div>

                  <div className="bg-slate-950 p-4 rounded border border-slate-900">
                    <div className="flex justify-between items-center text-xs mb-1">
                      <span className="text-slate-550 uppercase">Stability Index:</span>
                      <span className="text-blue-400 font-bold">{analyticsData.stabilityIndex} px RMSE</span>
                    </div>
                    <div className="text-[10px] text-slate-550 leading-normal">
                      Root Mean Square Error of cursor deviation from target center.
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-slate-950 p-4 rounded border border-slate-900">
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-900 pb-2 mb-3">
                      VERTICAL PURSUIT TELEMETRY
                    </h4>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-slate-550">Active Pursuit Frames:</span>
                        <span className="text-green-400 font-bold">{analyticsData.trackingTicks}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-550">Total Frames Logged:</span>
                        <span className="text-white font-bold">{analyticsData.totalTicks}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-550">Wind Draft Swaps:</span>
                        <span className="text-yellow-500 font-bold">{windSwapsRef.current.length}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* S+ Coach Diagnostics */}
              <div className="bg-[#080d1a] border border-blue-500/10 rounded-lg p-5 mb-8 text-left shadow-inner">
                <h3 className="text-xs font-bold text-blue-400 font-mono uppercase tracking-widest border-b border-slate-800 pb-2 mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-blue-400 animate-pulse" />
                  S+ AI VOICE ASSISTANT COACH
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs leading-relaxed text-slate-350">
                  <div className="space-y-2 border-r border-slate-900 pr-6">
                    <p className="font-bold text-white uppercase text-[10px] tracking-wider font-mono">Pursuit Diagnostics:</p>
                    <ul className="space-y-2 list-disc pl-4">
                      {accuracy >= 65 ? (
                        <li className="text-green-400 font-mono">🔥 S+ Smooth Pursuit: Exceptional vertical pursuing index ({accuracy}% coherence).</li>
                      ) : (
                        <li className="text-yellow-500">⚠️ Jitter Detected: Tracking lag detected ({accuracy}% coherence). Relax grip.</li>
                      )}
                      {analyticsData.stabilityIndex <= 15 ? (
                        <li className="text-green-400">🔥 Recoil Compensation: High stability ({analyticsData.stabilityIndex}px deviation) under vibration.</li>
                      ) : (
                        <li className="text-red-400">⚠️ Correction Slip: Shaky sweeps measuring {analyticsData.stabilityIndex}px standard deviation.</li>
                      )}
                    </ul>
                  </div>
                  <div className="space-y-3 flex flex-col justify-between">
                    <div>
                      <p className="font-bold text-white uppercase text-[10px] tracking-wider font-mono mb-1">Global Pro Advice:</p>
                      <p className="text-slate-350 font-sans leading-relaxed">
                        {accuracy >= 65
                          ? "Your vertical flight glide anticipation is elite. Focus on micro horizontal adjustments when wind drafts change directions."
                          : "Maintain smooth sweeps instead of micro flick corrections. Lower your mouse DPI if cursor is shaking."}
                      </p>
                    </div>
                    <div className="pt-1 text-[10px]">
                      Voice Coach: <span className="text-blue-400 font-bold">{voiceEnabled ? 'ACTIVE' : 'MUTED'}</span>
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
