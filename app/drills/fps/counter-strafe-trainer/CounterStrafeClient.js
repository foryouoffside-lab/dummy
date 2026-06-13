'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { COACHES, getActiveCoach, getCoachResponse, speakCoachText, handleCoachFeedback } from '../../../../lib/coachVoice';
import Link from 'next/link';
import { recordDrillResult } from '../../../../lib/performanceTelemetry';
import { getAdaptiveParams } from '../../../../lib/adaptiveDifficulty';

import { Crosshair, Zap, Timer, Trophy, Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, Eye, Info, Activity, Lock, AlertCircle, RefreshCw, Home, ChevronRight, Calculator, Sparkles, Cpu, TrendingUp, Award, Play, Target, CheckCircle2, ArrowRight, GraduationCap, Clock, Lightbulb, BarChart3 } from 'lucide-react';;

const TARGET_SIZE = 45;
const SPAWN_INTERVAL = 1200; // time between target spawns in ms
const DRILL_DURATION = 60; // 60 seconds

const GAME_MULTIPLIERS = {
  valorant: 0.07, cs2: 1, overwatch: 0.0066, apex: 0.022, fortnite: 0.01, quake: 0.022
};


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

export default function CounterStrafeClient() {


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
  const [warningMessage, setWarningMessage] = useState("Rotate Your Device"); // start, playing, gameOver

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
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(DRILL_DURATION);
  const [pointerLocked, setPointerLocked] = useState(false);
          
    const virtualCrosshair = useRef({ x: 0, y: 0 });
  const canvasSizeRef = useRef({ width: 800, height: 450 });
  const activeKeys = useRef({ a: false, d: false });
  
  // Physics parameters (scaled by deltaTime)
  const velocityX = useRef(0);
  const maxSpeed = 400; // pixels per second
  const accel = 2200; // acceleration pixels/s^2
  const friction = 1200; // passive deceleration pixels/s^2
  const counterDecel = 5000; // active counter-strafe deceleration pixels/s^2
  const speedLimitForAccuracy = 35; // velocity under this is considered perfectly accurate
  
  const scrollOffset = useRef(0);
  const targetRef = useRef(null);
  const lastSpawnTimeRef = useRef(0);
  const scoreRef = useRef(0);
  const timeLeftRef = useRef(DRILL_DURATION);
  const timerIntervalRef = useRef(null);
  const audioCtxRef = useRef(null);
  const crosshairInitializedRef = useRef(false);
  
  // Feedback notifications list
  const [feedbacks, setFeedbacks] = useState([]);
  const feedbacksRef = useRef([]);
  
  // Bullets fired history for tracing/rendering
  const bulletsRef = useRef([]);

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
  

  
  // Detailed analytics
  const [analytics, setAnalytics] = useState({
    totalShots: 0,
    hits: 0,
    misses: 0,
    cleanStrafes: 0, // shot when speed <= speedLimitForAccuracy
    runAndGun: 0, // shot when speed > speedLimitForAccuracy
    perfectStops: 0, // shot when speed === 0
    accuracy: 100,
    reactionTimes: [],
    avgSpeedAtShot: 0,
    speedHistory: []
  });
  
  const analyticsRef = useRef({
    totalShots: 0,
    hits: 0,
    misses: 0,
    cleanStrafes: 0,
    runAndGun: 0,
    perfectStops: 0,
    reactionTimes: [],
    speedSumAtShot: 0
  });

  // Client-side initialization
  const resetGame = useCallback(() => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    setGameState('start');
    if (document.pointerLockElement) {
      document.exitPointerLock();
    }
  }, []);

  useEffect(() => {
    try {
      const savedScore = localStorage.getItem('counterStrafeBestScore');
      if (savedScore) {
        const parsed = parseInt(savedScore, 10);
        if (!isNaN(parsed)) setBestScore(parsed);
      }
            } catch (e) {}
  }, []);

  // Compute sensitivity and cm/360
  

  // Audio effects
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
      
      if (type === 'success') {
        // High beep
        osc.frequency.setValueAtTime(987.77, now); // B5
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
        osc.start(now);
        osc.stop(now + 0.15);
      } else if (type === 'fail') {
        // Low buzzy sound
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(220, now); // A3
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
        osc.start(now);
        osc.stop(now + 0.25);
      } else if (type === 'perfect') {
        // Double sweet ding
        osc.frequency.setValueAtTime(1318.51, now); // E6
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
        osc.start(now);
        osc.stop(now + 0.2);
        
        // Second note slightly delayed
        setTimeout(() => {
          try {
            const osc2 = ctx.createOscillator();
            const gain2 = ctx.createGain();
            osc2.connect(gain2);
            gain2.connect(ctx.destination);
            osc2.frequency.setValueAtTime(1567.98, ctx.currentTime); // G6
            gain2.gain.setValueAtTime(0.06, ctx.currentTime);
            gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
            osc2.start(ctx.currentTime);
            osc2.stop(ctx.currentTime + 0.25);
          } catch(err) {}
        }, 80);
      } else if (type === 'shoot') {
        // White noise explosion / click
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(350, now);
        osc.frequency.exponentialRampToValueAtTime(80, now + 0.08);
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.start(now);
        osc.stop(now + 0.08);
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
      const currentBest = parseInt(localStorage.getItem('counterStrafeBestScore') || '0', 10);
      if (finalScore > currentBest) {
        localStorage.setItem('counterStrafeBestScore', finalScore.toString());
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
    canvasRef.current?.requestPointerLock();
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

  // Mouse movement input
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

  // Keyboard controls for A/D
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'a' || e.key === 'A') { activeKeys.current.a = true; }
      if (e.key === 'd' || e.key === 'D') { activeKeys.current.d = true; }
    };
    
    const handleKeyUp = (e) => {
      if (e.key === 'a' || e.key === 'A') { activeKeys.current.a = false; }
      if (e.key === 'd' || e.key === 'D') { activeKeys.current.d = false; }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Spawn target logic
  const spawnTarget = useCallback(() => {
    const cvs = canvasRef.current;
    if (!cvs) return null;
    
    const pad = TARGET_SIZE + 40;
    return {
      x: Math.random() * (cvs.width - pad * 2) + pad,
      y: Math.random() * (cvs.height - pad * 3) + pad,
      radius: TARGET_SIZE / 2,
      startTime: performance.now(),
      hit: false
    };
  }, []);

  // Shoot trigger
  const handleShot = useCallback(() => {
    if (gameState !== 'playing' || !crosshairInitializedRef.current) return;
    
    const speed = Math.abs(velocityX.current);
    const accuracyPenalty = speed > speedLimitForAccuracy;
    
    playSound('shoot');
    
    // Spread calculation: bullet deviates randomly if moving
    let spread = 0;
    if (accuracyPenalty) {
      // Dynamic spread circle radius depending on speed
      spread = Math.min(75, (speed - speedLimitForAccuracy) * 0.18);
    }
    
    const angle = Math.random() * Math.PI * 2;
    const dist = Math.random() * spread;
    const bulletX = virtualCrosshair.current.x + Math.cos(angle) * dist;
    const bulletY = virtualCrosshair.current.y + Math.sin(angle) * dist;
    
    // Add bullet trace to canvas
    bulletsRef.current.push({
      x: bulletX,
      y: bulletY,
      crosshairX: virtualCrosshair.current.x,
      crosshairY: virtualCrosshair.current.y,
      spreadRadius: spread,
      time: performance.now(),
      accurate: !accuracyPenalty
    });
    bulletsRef.current = bulletsRef.current.slice(-15); // keep last 15
    
    // Analytics tracking
    analyticsRef.current.totalShots++;
    analyticsRef.current.speedSumAtShot += speed;
    
    if (accuracyPenalty) {
      analyticsRef.current.runAndGun++;
    } else {
      analyticsRef.current.cleanStrafes++;
      if (speed === 0) {
        analyticsRef.current.perfectStops++;
      }
    }
    
    // Check hit on current target
    const target = targetRef.current;
    if (target && !target.hit) {
      const distance = Math.hypot(bulletX - target.x, bulletY - target.y);
      const elapsed = performance.now() - target.startTime;
      
      if (distance <= target.radius) {
        // HIT!
        target.hit = true;
        scoreRef.current += 1;
        setScore(scoreRef.current);
        analyticsRef.current.hits++;
        analyticsRef.current.reactionTimes.push(elapsed);
        
        if (!accuracyPenalty) {
          if (speed === 0) {
            playSound('perfect');
            showFeedbackText(`🎯 PERFECT STOP! (${Math.round(elapsed)}ms)`, 'success');
          } else {
            playSound('success'); if (typeof checkSensitivityAdjustment === 'function') checkSensitivityAdjustment('hit'); if (typeof checkSensitivityAdjustment === 'function') checkSensitivityAdjustment('hit');
            showFeedbackText(`✓ ACCURATE SYNC! (${Math.round(elapsed)}ms)`, 'info');
          }
        } else {
          playSound('success'); if (typeof checkSensitivityAdjustment === 'function') checkSensitivityAdjustment('hit'); if (typeof checkSensitivityAdjustment === 'function') checkSensitivityAdjustment('hit');
          showFeedbackText(`⚠ LUCKY RUN & GUN HIT! (${Math.round(elapsed)}ms)`, 'warn');
        }
        
        targetRef.current = null; // spawn new target
      } else {
        // MISSED THE TARGET
        analyticsRef.current.misses++;
        playSound('fail'); if (typeof checkSensitivityAdjustment === 'function') checkSensitivityAdjustment('miss', { dist: typeof dist !== 'undefined' ? dist : 50, targetSize: typeof targetRadius !== 'undefined' ? targetRadius : (typeof TARGET_SIZE !== 'undefined' ? TARGET_SIZE : (typeof TARGET_RADIUS !== 'undefined' ? TARGET_RADIUS : 15)) }); if (typeof checkSensitivityAdjustment === 'function') checkSensitivityAdjustment('miss', { dist: typeof dist !== 'undefined' ? dist : 50, targetSize: typeof targetRadius !== 'undefined' ? targetRadius : (typeof TARGET_SIZE !== 'undefined' ? TARGET_SIZE : (typeof TARGET_RADIUS !== 'undefined' ? TARGET_RADIUS : 15)) });
        
        if (accuracyPenalty) {
          showFeedbackText('❌ RUN-AND-GUN PENALTY (INACCURATE)', 'error');
        } else {
          showFeedbackText('❌ MISSED TARGET (STABLE AIM SLIP)', 'warn');
        }
      }
    } else {
      // MISSED (No active target or clicked empty air)
      analyticsRef.current.misses++;
      playSound('fail'); if (typeof checkSensitivityAdjustment === 'function') checkSensitivityAdjustment('miss', { dist: typeof dist !== 'undefined' ? dist : 50, targetSize: typeof targetRadius !== 'undefined' ? targetRadius : (typeof TARGET_SIZE !== 'undefined' ? TARGET_SIZE : (typeof TARGET_RADIUS !== 'undefined' ? TARGET_RADIUS : 15)) }); if (typeof checkSensitivityAdjustment === 'function') checkSensitivityAdjustment('miss', { dist: typeof dist !== 'undefined' ? dist : 50, targetSize: typeof targetRadius !== 'undefined' ? targetRadius : (typeof TARGET_SIZE !== 'undefined' ? TARGET_SIZE : (typeof TARGET_RADIUS !== 'undefined' ? TARGET_RADIUS : 15)) });
      showFeedbackText('❌ MISSED', 'error');
    }
  }, [gameState, playSound, showFeedbackText]);

  // Handle manual canvas clicking to shoot
  useEffect(() => {
    const handleMouseDown = (e) => {
      if (e.target.tagName === 'BUTTON' || e.target.closest('button')) return;
      if (gameState === 'playing' && pointerLocked) {
        e.preventDefault();
        handleShot();
      } else if (gameState === 'playing' && !pointerLocked) {
        requestPointerLock();
      }
    };
    document.addEventListener('mousedown', handleMouseDown);
    return () => document.removeEventListener('mousedown', handleMouseDown);
  }, [gameState, pointerLocked, handleShot, requestPointerLock]);

  // Main game timer
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
      recordDrillResult('counter-strafe', {
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

        
        // Finalize analytics calculations
        const tShots = analyticsRef.current.totalShots || 1;
        setAnalytics({
          totalShots: analyticsRef.current.totalShots,
          hits: analyticsRef.current.hits,
          misses: analyticsRef.current.misses,
          cleanStrafes: analyticsRef.current.cleanStrafes,
          runAndGun: analyticsRef.current.runAndGun,
          perfectStops: analyticsRef.current.perfectStops,
          accuracy: Math.round((analyticsRef.current.hits / tShots) * 100),
          reactionTimes: analyticsRef.current.reactionTimes,
          avgSpeedAtShot: Math.round(analyticsRef.current.speedSumAtShot / tShots),
          speedHistory: []
        });
      }
    }, 1000);
  }, [updateBestScore]);

  // Starts the drill
  const startGame = useCallback(() => {
    // Get adaptive difficulty parameters
    const adaptive = getAdaptiveParams('counter-strafe');

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
    
    // Reset internal analytics
    analyticsRef.current = {
      totalShots: 0,
      hits: 0,
      misses: 0,
      cleanStrafes: 0,
      runAndGun: 0,
      perfectStops: 0,
      reactionTimes: [],
      speedSumAtShot: 0
    };
    
    bulletsRef.current = [];
    feedbacksRef.current = [];
    setFeedbacks([]);
    
    velocityX.current = 0;
    scrollOffset.current = 0;
    targetRef.current = null;
    lastSpawnTimeRef.current = performance.now();
    crosshairInitializedRef.current = false;
    
    startTimer();
    if (canvasRef.current) {
      try {
        canvasRef.current.requestPointerLock();
      } catch (e) {
        console.warn("Pointer lock blocked", e);
      }
    }
    crosshairInitializedRef.current = true;
  }, [startTimer, requestPointerLock]);

  // Returns to start menu

  // Main rendering & physics update loop
  useEffect(() => {
    if (gameState !== 'playing') return;
    
    const cvs = canvasRef.current;
    if (!cvs) return;
    const ctx = cvs.getContext('2d');
    
    const updateSize = () => {
      const cr = containerRef.current;
      if (!cr) return;
      const rect = cr.getBoundingClientRect();
      
      // Keep a locked 16:9 ratio box
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
      
      // Calculate delta time in seconds
      let dt = (timestamp - lastFrameTime) / 1000;
      lastFrameTime = timestamp;
      
      // Cap dt to prevent physics glitches during lag spikes
      if (dt > 0.1) dt = 0.1;
      
      // 1. UPDATE PHYSICS
      const A = activeKeys.current.a;
      const D = activeKeys.current.d;
      
      if (A && !D) {
        // Acceleration Left
        if (velocityX.current > 0) {
          // Counter-strafing (rapid deceleration)
          velocityX.current -= counterDecel * dt;
        } else {
          // Regular acceleration left
          velocityX.current -= accel * dt;
        }
      } else if (D && !A) {
        // Acceleration Right
        if (velocityX.current < 0) {
          // Counter-strafing (rapid deceleration)
          velocityX.current += counterDecel * dt;
        } else {
          // Regular acceleration right
          velocityX.current += accel * dt;
        }
      } else {
        // Passive friction decay when keys released or both pressed
        const currentSign = Math.sign(velocityX.current);
        const frictionAmt = friction * dt;
        
        if (Math.abs(velocityX.current) <= frictionAmt) {
          velocityX.current = 0;
        } else {
          velocityX.current -= currentSign * frictionAmt;
        }
      }
      
      // Clamp velocity to max speed
      velocityX.current = Math.max(-maxSpeed, Math.min(maxSpeed, velocityX.current));
      
      // Shift horizontal scroll background relative to player's velocity
      scrollOffset.current = (scrollOffset.current - velocityX.current * dt) % 80;
      
      // Shift screen position of target if it exists
      if (targetRef.current) {
        targetRef.current.x -= velocityX.current * dt;
        
        // Wrap/contain target on canvas or let it slide off-screen?
        // To make it Esports level, we let it slide off-screen.
        // But if it goes too far off-screen, let's draw an indicator.
      }
      
      // 2. SPAWN LOGIC
      if (!targetRef.current) {
        if (timestamp - lastSpawnTimeRef.current >= SPAWN_INTERVAL) {
          targetRef.current = spawnTarget();
          lastSpawnTimeRef.current = timestamp;
        }
      }
      
      // 3. CANVAS RENDER
      ctx.fillStyle = '#080d1a';
      ctx.fillRect(0, 0, cvs.width, cvs.height);
      
      // Draw gridlines with movement scroll offset
      ctx.strokeStyle = 'rgba(239, 68, 68, 0.06)';
      ctx.lineWidth = 1;
      
      const gridW = 80;
      const startX = scrollOffset.current;
      for (let x = startX; x < cvs.width; x += gridW) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, cvs.height);
        ctx.stroke();
      }
      for (let y = 0; y < cvs.height; y += gridW) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(cvs.width, y);
        ctx.stroke();
      }
      
      // Draw Horizon Ground lane
      ctx.strokeStyle = 'rgba(239, 68, 68, 0.2)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, cvs.height - 60);
      ctx.lineTo(cvs.width, cvs.height - 60);
      ctx.stroke();
      
      // Draw target if exists
      const target = targetRef.current;
      if (target) {
        const isOffscreenLeft = target.x < 0;
        const isOffscreenRight = target.x > cvs.width;
        
        if (!isOffscreenLeft && !isOffscreenRight) {
          // Draw target glowing node
          const pulse = Math.sin(timestamp * 0.015) * 4;
          
          // Glow layer
          ctx.shadowBlur = 20;
          ctx.shadowColor = '#ef4444';
          ctx.fillStyle = '#ef4444';
          ctx.beginPath();
          ctx.arc(target.x, target.y, target.radius + pulse, 0, Math.PI * 2);
          ctx.fill();
          
          // White core
          ctx.shadowBlur = 0;
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(target.x, target.y, target.radius * 0.45, 0, Math.PI * 2);
          ctx.fill();
          
          // Outer aim ring
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(target.x, target.y, target.radius, 0, Math.PI * 2);
          ctx.stroke();
        } else {
          // Draw Edge Warning Indicators if target is offscreen
          ctx.fillStyle = 'rgba(239, 68, 68, 0.7)';
          ctx.shadowBlur = 10;
          ctx.shadowColor = '#ef4444';
          
          const padding = 25;
          const indicatorY = target.y;
          
          ctx.beginPath();
          if (isOffscreenLeft) {
            // Draw left pointing triangle
            ctx.moveTo(padding, indicatorY);
            ctx.lineTo(padding + 15, indicatorY - 10);
            ctx.lineTo(padding + 15, indicatorY + 10);
          } else {
            // Draw right pointing triangle
            ctx.moveTo(cvs.width - padding, indicatorY);
            ctx.lineTo(cvs.width - padding - 15, indicatorY - 10);
            ctx.lineTo(cvs.width - padding - 15, indicatorY + 10);
          }
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }
      
      // Draw Bullet Traces
      bulletsRef.current.forEach((b) => {
        const age = timestamp - b.time;
        if (age > 400) return; // fade out after 400ms
        
        const opacity = 1 - (age / 400);
        
        // Draw hit point dot
        ctx.fillStyle = b.accurate ? `rgba(0, 255, 136, ${opacity})` : `rgba(239, 68, 68, ${opacity})`;
        ctx.beginPath();
        ctx.arc(b.x, b.y, 4, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw thin red tracer line from crosshair coordinates at shoot time
        ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.15})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(b.crosshairX, b.crosshairY);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
        
        // Draw spread indicator circle if they had spread
        if (b.spreadRadius > 0) {
          ctx.strokeStyle = `rgba(239, 68, 68, ${opacity * 0.3})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(b.crosshairX, b.crosshairY, b.spreadRadius, 0, Math.PI * 2);
          ctx.stroke();
        }
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
      }      // 5. DRAW TACTICAL COUNTER-STRAFE DEADZONE VELOCITY HUD BAR
      if (pointerLocked) {
        const barWidth = 120;
        const barHeight = 4;
        const barX = ch.x - barWidth / 2;
        const barY = ch.y + 30;
        
        // Draw background track
        ctx.fillStyle = 'rgba(15, 23, 42, 0.6)';
        ctx.fillRect(barX, barY, barWidth, barHeight);
        
        // Draw deadzone bracket (the accurate speed window)
        const deadzoneWidth = (speedLimitForAccuracy / maxSpeed) * barWidth;
        ctx.fillStyle = 'rgba(0, 255, 136, 0.3)';
        ctx.fillRect(ch.x - deadzoneWidth, barY, deadzoneWidth * 2, barHeight);
        
        // Draw horizontal boundaries
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.lineWidth = 1;
        ctx.strokeRect(barX, barY, barWidth, barHeight);
        
        // Draw current player velocity slider
        const sliderX = ch.x + (velocityX.current / maxSpeed) * (barWidth / 2);
        ctx.fillStyle = isMovingAccurate ? '#00ff88' : '#ef4444';
        
        // Draw slider dot
        ctx.beginPath();
        ctx.arc(sliderX, barY + barHeight / 2, 3.5, 0, Math.PI * 2);
        ctx.fill();
        
        // Glow effect for perfect stability (velocity === 0)
        if (speed === 0) {
          ctx.shadowBlur = 6;
          ctx.shadowColor = '#00ff88';
          ctx.strokeStyle = '#00ff88';
          ctx.lineWidth = 1;
          ctx.strokeRect(ch.x - deadzoneWidth, barY, deadzoneWidth * 2, barHeight);
          ctx.shadowBlur = 0;
        }

        // Mini status label
        ctx.fillStyle = isMovingAccurate ? 'rgba(0, 255, 136, 0.8)' : 'rgba(239, 68, 68, 0.8)';
        ctx.font = 'bold 7px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(isMovingAccurate ? 'STABLE' : 'UNSTABLE', ch.x, barY + 12);
      }
      
      // Visual instructions / lock notification inside screen
      
      
      animationRef.current = requestAnimationFrame(run);
    };
    
    animationRef.current = requestAnimationFrame(run);
    
    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', updateSize);
    };
  }, [gameState, pointerLocked]);

  const avgReaction = analytics.reactionTimes.length > 0
    ? Math.round(analytics.reactionTimes.reduce((a, b) => a + b, 0) / analytics.reactionTimes.length)
    : 0;

  const totalShots = analytics.totalShots || 1;
  const cleanStrafePercentage = Math.round((analytics.cleanStrafes / totalShots) * 100);

  return (
    <div ref={pageRef} className={`min-h-screen select-none font-mono ${isDarkMode ? 'bg-[#080d1a] text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      
      {/* Visual cyber-athletic grid pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-950/20 via-[#080d1a] to-[#080d1a] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(239,68,68,0.03)_1px,_transparent_1px),_linear-gradient(90deg,_rgba(239,68,68,0.03)_1px,_transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />
      
      <div className={`${isFullscreen ? 'w-full h-screen p-0 m-0' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'} relative z-10`}>
        
        {/* Navigation Breadcrumb */}
        {!isFullscreen && (
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-2 text-[10px] font-mono text-slate-400 uppercase tracking-widest">
              <li><Link href="/" className="hover:text-red-400 transition-colors">HQ</Link></li>
              <li><ChevronRight className="w-3 h-3 text-slate-700" /></li>
              <li><Link href="/drills/fps" className="hover:text-red-400 transition-colors">FPS Sector</Link></li>
              <li><ChevronRight className="w-3 h-3 text-slate-700" /></li>
              <li><span className="text-red-400 font-bold">Counter-Strafe Sync</span></li>
            </ol>
          </nav>
        )}

        {/* Drill Header */}
        {!isFullscreen && (
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6 border-b border-slate-900 pb-5">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-red-950/30 border border-red-500/20 text-red-400 rounded-xl">
                <Crosshair className="w-7 h-7 animate-pulse" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white uppercase bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                  Counter-Strafe Sync Trainer
                </h1>
                <p className="text-xs text-slate-400 tracking-wider mt-0.5">
                  {pointerLocked ? '🟢 RAW INPUT CAPTURING' : '🔴 CLICK CANVAS TO CAPTURE'} • {cmPer360} cm/360 • A/D STRAFING MODEL
                </p>
              </div>
            </div>
            
            {/* Topbar Settings Controls */}
            <div className="flex flex-wrap gap-2">
              <button 
                onClick={() => setSoundEnabled(!soundEnabled)} 
                className="px-3 py-1.5 rounded-lg border border-slate-800 bg-[#0c1224] text-slate-300 hover:border-slate-700 text-xs flex items-center gap-1.5 transition"
                title="Toggle SFX"
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
              {true && (
                <button 
                  onClick={resetGame} 
                  className="px-3 py-1.5 rounded-lg border border-red-500/20 bg-red-950/20 text-red-400 hover:bg-red-950/40 text-xs flex items-center gap-1.5 transition"
                >
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>RESET</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* Start Game Screen */}
        

        {/* Playing Screen */}
        {true && (
          <div className={isFullscreen ? "w-full h-full" : "relative"}>
            {/* Live Stats Overlay */}
            

            {/* Main Interactive Training Box */}
            <div 
              ref={containerRef} 
              className={isFullscreen 
                ? "w-full h-full bg-slate-950 relative overflow-hidden flex items-center justify-center cursor-none" 
                : "w-full aspect-video min-h-[400px] lg:min-h-[500px] bg-slate-950 border border-slate-800 rounded-xl relative overflow-hidden flex items-center justify-center cursor-none"}
            >
              <canvas ref={canvasRef} onClick={handleCanvasClick} />
            {gameState === 'start' && (
          <div className="absolute inset-0 bg-[#080d1a]/95 flex items-center justify-center p-6 z-30 overflow-y-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Instruction Column */}
            <div className="lg:col-span-1 bg-[#0c1224]/80 border border-slate-900 rounded-xl p-6 flex flex-col justify-between backdrop-blur-md">
              <div>
                <h3 className="text-sm font-bold text-red-400 mb-4 flex items-center gap-2 border-b border-slate-900 pb-2">
                  <Info className="w-4 h-4" />
                  DRILL MECHANICS
                </h3>
                <ul className="space-y-4 text-xs leading-relaxed text-slate-400">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold">1.</span>
                    <span>Use <kbd className="px-1.5 py-0.5 bg-slate-900 border border-slate-800 text-slate-300 rounded font-sans text-[10px]">A</kbd> and <kbd className="px-1.5 py-0.5 bg-slate-900 border border-slate-800 text-slate-300 rounded font-sans text-[10px]">D</kbd> keys to move left and right. This moves the visual target coordinate system.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold">2.</span>
                    <span>Shooting while moving applies a **huge inaccuracy spread penalty**. Fired bullets will deviate wildly.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold">3.</span>
                    <span>To shoot with 100% laser accuracy, your moving velocity must be **under 35 px/sec** (ideally 0).</span>
                  </li>
                  <li className="flex items-start gap-2 text-red-300">
                    <span className="text-green-400 font-bold">★</span>
                    <span>**Esports Hack**: Pressing the *opposite* key (e.g. tapping <kbd className="px-1 py-0.5 bg-slate-800 text-white rounded font-sans">D</kbd> while strafing left) brings you to an instant stop, bypassing passive momentum.</span>
                  </li>
                </ul>
              </div>
              
              <div className="mt-6 pt-4 border-t border-slate-900 text-[10px] text-slate-500 leading-normal">
                Perfecting movement-to-firing sync builds muscle memory required for tier-1 ranks in tactical esports.
              </div>
            </div>

            {/* Config & Calibration Column */}
            <div className="lg:col-span-2 bg-[#0c1224]/80 border border-slate-900 rounded-xl p-6 backdrop-blur-md flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2 border-b border-slate-900 pb-2">
                  <Calculator className="w-4 h-4 text-red-400" />
                  AIM ENGINE CALIBRATION
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

                <div className="p-4 bg-slate-950/80 rounded border border-slate-900 flex justify-between items-center text-xs">
                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase">Matched Aim Distance</span>
                    <span className="text-white font-bold text-sm">{cmPer360} cm / 360°</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-500 block uppercase">Pointer Lock Resolution</span>
                    <span className="text-red-400 font-bold">1:1 Raw input</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-4 items-center justify-between border-t border-slate-900 pt-6">
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase">Personal Best Record</span>
                  <span className="text-white font-bold text-lg flex items-center gap-1.5">
                    <Trophy className="w-4 h-4 text-yellow-500" />
                    {bestScore} Points
                  </span>
                </div>
                
                <button
                  onClick={startGame}
                  className="w-full sm:w-auto px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg text-sm flex items-center justify-center gap-2 shadow-lg shadow-red-500/25 uppercase tracking-wider transition"
                >
                  <Play className="w-4 h-4 fill-white" />
                  Start Training Protocol
                </button>
              </div>
            </div>

          </div>
          </div>
        )}
            {gameState === 'gameOver' && (
          <div className="absolute inset-0 bg-[#080d1a]/95 flex items-center justify-center p-6 z-30 overflow-y-auto">
            <div className="bg-[#0c1224]/80 border border-slate-900 rounded-xl p-8 backdrop-blur-md max-w-3xl mx-auto">
            <h2 className="text-xl font-bold text-red-400 text-center mb-6 uppercase tracking-widest flex items-center justify-center gap-2">
              <Award className="w-5 h-5 text-yellow-500" />
              DRILL SESSION TERMINATED
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              
              {/* Left summary metrics */}
              <div className="space-y-4">
                <div className="bg-slate-950 p-4 rounded border border-slate-900">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500 block uppercase">Final Hits Score</span>
                    <span className="text-white font-bold text-lg">{score} Hits</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-950 p-3 rounded border border-slate-900 text-center">
                    <span className="text-[10px] text-slate-500 block uppercase">Total Shots</span>
                    <span className="text-white font-bold text-sm">{analytics.totalShots}</span>
                  </div>
                  <div className="bg-slate-950 p-3 rounded border border-slate-900 text-center">
                    <span className="text-[10px] text-slate-500 block uppercase">Accuracy</span>
                    <span className="text-white font-bold text-sm">{analytics.accuracy}%</span>
                  </div>
                </div>

                <div className="bg-slate-950 p-4 rounded border border-slate-900">
                  <div className="flex justify-between items-center text-xs mb-1">
                    <span className="text-slate-500 uppercase">Average Reaction Time</span>
                    <span className="text-red-400 font-bold">{avgReaction} ms</span>
                  </div>
                  <div className="text-[10px] text-slate-500 leading-normal">
                    This measures duration from target spawn to accurate click completion. Target is &lt;200ms.
                  </div>
                </div>
              </div>

              {/* Right movement-sync analysis */}
              <div className="space-y-4">
                <div className="bg-slate-950 p-4 rounded border border-slate-900">
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-900 pb-2 mb-3">
                    MOVEMENT SYNC LOGIC ANALYSIS
                  </h4>
                  
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Perfect Stopped Shots (0 velocity):</span>
                      <span className="text-green-400 font-bold">{analytics.perfectStops}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Clean Counter-Strafed (&lt;35 px/s):</span>
                      <span className="text-blue-400 font-bold">{analytics.cleanStrafes}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Run-and-Gun Violations (Spread error):</span>
                      <span className="text-red-500 font-bold">{analytics.runAndGun}</span>
                    </div>
                    <div className="flex justify-between border-t border-slate-900 pt-2 mt-2">
                      <span className="text-slate-400">Sync Efficiency:</span>
                      <span className={`font-bold ${cleanStrafePercentage >= 80 ? 'text-green-400' : 'text-yellow-500'}`}>
                        {cleanStrafePercentage}%
                      </span>
                    </div>
                  </div>
                </div>
                
              </div>

            </div>

            {/* AI Coach Diagnostic Board */}
            <div className="bg-[#080d1a] border border-slate-800 rounded-lg p-5 mb-8 text-left shadow-inner">
              <h3 className="text-xs font-bold text-red-400 font-mono uppercase tracking-widest border-b border-slate-800 pb-2 mb-3.5 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-red-500 animate-pulse" />
                COACH PERFORMANCE DIAGNOSIS
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs leading-relaxed text-slate-350">
                <div className="space-y-2.5 border-r border-slate-900 pr-6">
                  <p className="font-bold text-white uppercase text-[10px] tracking-wider font-mono">Skill Index Analysis:</p>
                  <ul className="space-y-2 list-disc pl-4">
                    {cleanStrafePercentage >= 85 ? (
                      <li className="text-green-400">🔥 Elite Movement Sync: Your keystroke-to-click coordination is outstanding. Minimal dead time between tap and shot.</li>
                    ) : cleanStrafePercentage >= 60 ? (
                      <li className="text-yellow-400">⚠️ Deceleration Delay: You are shooting slightly too early before fully halting. Wait another 15-30ms after tapping A/D opposite.</li>
                    ) : (
                      <li className="text-red-400">🚨 Run-and-Gun Desync: High movement velocity penalty rate. You are firing while moving. Stop shooting while strafing!</li>
                    )}
                    {analytics.perfectStops >= (analytics.totalShots * 0.4) ? (
                      <li className="text-green-400">🔥 Zero-Velocity Precision: Excellent muscle memory for absolute-stop timing. High shot accuracy.</li>
                    ) : (
                      <li className="text-slate-400">👤 Slide Penalty: You are releasing movement keys to halt rather than active counter-strafing. Active taps halt you twice as fast.</li>
                    )}
                    {parseFloat(avgReaction) <= 220 ? (
                      <li className="text-green-400">⚡ Fast Reflex Sync: Reaction times match Tier-1 professional speeds.</li>
                    ) : (
                      <li className="text-slate-400">⏳ Heavy Reaction: Too slow to initiate the counter-strafe. Try predicting targets to pre-align movement.</li>
                    )}
                  </ul>
                </div>
                <div className="space-y-3 flex flex-col justify-between">
                  <div>
                    <p className="font-bold text-white uppercase text-[10px] tracking-wider font-mono mb-1.5">Actionable Esports Training Prescription:</p>
                    <p className="text-slate-350 leading-relaxed font-sans">
                      {cleanStrafePercentage < 70 ? (
                        "Your mechanical desync indicates keyboard-mouse delay. Practice tapping the opposite movement key (A to stop D) exaggeratedly hard to build physical stop feedback. Do NOT hold left click: tap single shots when velocity bar hits green."
                      ) : (
                        "Your movement stop synchronization is superb. To maximize difficulty, focus on doing wider strafes (holding A/D longer) before counter-strafing to increase average target transition velocities."
                      )}
                    </p>
                  </div>
                  <div className="pt-2">
                    <span className="inline-block bg-red-950/40 text-red-400 px-3 py-1.5 rounded text-[10px] font-mono font-bold uppercase border border-red-500/20 shadow-md">
                      MOVEMENT-AIM INDEX: {Math.round(score * (cleanStrafePercentage / 100) * 10)} INDEX POINTS
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center border-t border-slate-900 pt-6">
              <button
                onClick={startGame}
                className="w-full sm:w-auto px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition"
              >
                <RefreshCw className="w-4.5 h-4.5" />
                Train Again
              </button>
              <button
                onClick={resetGame}
                className="w-full sm:w-auto px-6 py-2.5 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-350 font-bold rounded-lg text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition"
              >
                Return to Hub
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

            


              
              
              {/* Feedback float overlay */}
              <div className="absolute inset-0 pointer-events-none flex flex-col justify-center items-center gap-2 overflow-hidden select-none z-10">
                {feedbacks.map((f) => (
                  <div 
                    key={f.id} 
                    className={`px-4 py-2 rounded border text-xs font-bold animate-bounce shadow-lg uppercase tracking-wider backdrop-blur-sm ${
                      f.type === 'success' 
                        ? 'bg-green-950/80 border-green-500/30 text-green-400' 
                        : f.type === 'warn'
                          ? 'bg-yellow-950/80 border-yellow-500/30 text-yellow-400'
                          : f.type === 'info'
                            ? 'bg-blue-950/80 border-blue-500/30 text-blue-400'
                            : 'bg-red-950/80 border-red-500/30 text-red-400'
                    }`}
                  >
                    {f.text}
                  </div>
                ))}
              </div>
            </div>

            {/* Instruction tooltip */}
            <div className="mt-4 text-center text-[10px] text-slate-500 flex items-center justify-center gap-4">
              <span>⌨ Strafing: <kbd className="px-1 py-0.5 bg-slate-900 text-slate-400 rounded">A</kbd> (left) / <kbd className="px-1 py-0.5 bg-slate-900 text-slate-400 rounded">D</kbd> (right)</span>
              <span>• Center line collapses when stationary. Shoot when green.</span>
              <span>• Tap opposite key to instantly stop.</span>
            </div>
          </div>
        )}

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
                  About Counter-Strafe Sync Trainer
                </h2>
              </div>
              <div className="p-6">
                <p className="text-xs text-slate-400 leading-relaxed mb-6">
                  This counter-strafe sync trainer drill is designed to refine tactical mechanical reflexes, hand-eye coordination, and spatial mouse accuracy. By using 1:1 hardware raw input via the Pointer Lock API, it bypasses operating system cursor acceleration to build consistent physical muscle memory. With dynamic difficulty and AI-powered performance diagnostics, this tool conditions esports players for high-velocity target acquisition in games like CS2, Valorant, Apex Legends, and Overwatch.
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
                      <h3 className="font-bold text-white uppercase tracking-wider">Why Practice Counter-Strafe Sync Trainer?</h3>
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
                title="Flick Shot Trainer" 
                category="FPS Sector" 
                href="/drills/fps/flick-shot-training" 
                description="Raw input flick training with adaptive target windows."
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
