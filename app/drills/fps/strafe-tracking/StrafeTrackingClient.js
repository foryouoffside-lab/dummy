'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { COACHES, getActiveCoach, getCoachResponse, speakCoachText, handleCoachFeedback } from '../../../../lib/coachVoice';
import { recordDrillResult } from '../../../../lib/performanceTelemetry';
import { getAdaptiveParams } from '../../../../lib/adaptiveDifficulty';
import Link from 'next/link';
import { 
  Crosshair, Zap, Timer, Trophy, 
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, Eye,
  Info, Activity, Lock, AlertCircle, RefreshCw,
  Home, ChevronRight, Calculator, Sparkles, Cpu, Award, Play
} from 'lucide-react';

const DRILL_DURATION = 60; // 60 seconds
const CAPSULE_RADIUS = 16;
const CAPSULE_HEIGHT = 45; // total height of segment is 90

const DIFFICULTIES = {
  easy: { name: "Beginner (Large, Slow)", scale: 1.4, speedMultiplier: 0.7, jumpChance: 0.1 },
  medium: { name: "Intermediate (Medium)", scale: 1.0, speedMultiplier: 1.0, jumpChance: 0.2 },
  hard: { name: "Advanced (Small, Fast)", scale: 0.75, speedMultiplier: 1.35, jumpChance: 0.35 },
  elite: { name: "Esports Elite (Pill, Hyper)", scale: 0.55, speedMultiplier: 1.7, jumpChance: 0.5 }
};

export default function StrafeTrackingClient() {
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
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(DRILL_DURATION);
  const [pointerLocked, setPointerLocked] = useState(false);
  const [difficulty, setDifficulty] = useState('medium');
  
  // Sensitivity matched parameters
  const [dpi, setDpi] = useState(800);
  const [inGameSens, setInGameSens] = useState(0.35);
  const [gameType, setGameType] = useState('valorant');
  const [cmPer360, setCmPer360] = useState(0);
  const sensitivityMultiplierRef = useRef(1);
  
  const virtualCrosshair = useRef({ x: 0, y: 0 });
  const canvasSizeRef = useRef({ width: 800, height: 450 });
  
  // Target state
  const target = useRef({
    x: 400,
    y: 225,
    vx: 180,
    vy: 0,
    groundY: 300,
    width: CAPSULE_RADIUS * 2,
    height: CAPSULE_HEIGHT * 2
  });
  
  const nextDecisionTime = useRef(0);
  const lastTickTime = useRef(0);
  
  // Real-time scores and timers
  const scoreRef = useRef(0);
  const timeLeftRef = useRef(DRILL_DURATION);
  const timerIntervalRef = useRef(null);
  const audioCtxRef = useRef(null);
  const crosshairInitializedRef = useRef(false);
  
  // Tracking lock metrics
  const isTrackingLocked = useRef(false);
  const currentStreakStart = useRef(0);
  const longestStreak = useRef(0);
  const totalTicks = useRef(0);
  const lockOnTicks = useRef(0);

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

  
  // Directional accuracy
  const trackingStats = useRef({
    leftTotal: 0,
    leftHits: 0,
    rightTotal: 0,
    rightHits: 0
  });

  const [analytics, setAnalytics] = useState({
    timeOnTarget: 0,
    lockOnStreak: 0,
    leftAccuracy: 0,
    rightAccuracy: 0,
    totalTrackingPoints: 0,
    rank: 'Bronze'
  });

  // Load preferences
  const resetGame = useCallback(() => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    setGameState('start');
    if (document.pointerLockElement) {
      document.exitPointerLock();
    }
  }, []);

  useEffect(() => {
    try {
      const savedScore = localStorage.getItem('trackingBestScore');
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

  // Compute cm/360 and screen multipliers
  useEffect(() => {
    const yaw = GAME_YAWS[gameType] || 0.07;
    const counts = 360 / (yaw * inGameSens);
    const inches = counts / dpi;
    const cm = inches * 2.54;
    setCmPer360(cm.toFixed(1));
    
    // Convert to screen multiplier
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

  const playTrackingSound = useCallback(() => {
    if (!soundEnabled) return;
    try {
      const ctx = initAudio();
      if (!ctx) return;
      
      // Fast high pitch clicking sound for tracking lock
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      const now = ctx.currentTime;
      osc.frequency.setValueAtTime(1480, now); // F#6 high click
      gain.gain.setValueAtTime(0.012, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.02);
      osc.start(now);
      osc.stop(now + 0.02);
    } catch (e) {}
  }, [soundEnabled, initAudio]);

  const updateBestScore = useCallback((finalScore) => {
    try {
      const currentBest = parseInt(localStorage.getItem('trackingBestScore') || '0', 10);
      if (finalScore > currentBest) {
        localStorage.setItem('trackingBestScore', finalScore.toString());
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
      setPointerLocked(document.pointerLockElement === canvasRef.current);
      if (document.pointerLockElement === canvasRef.current) {
        crosshairInitializedRef.current = true;
      }
    };
    document.addEventListener('pointerlockchange', handlePointerLockChange);
    return () => document.removeEventListener('pointerlockchange', handlePointerLockChange);
  }, []);

  // Mouse displacement tracker
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (document.pointerLockElement !== canvasRef.current) return;
      
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

  // Main countdown timer
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
        
        // Finalize analytics calculations
        const tot = totalTicks.current || 1;
        const finalTimeOnTarget = Math.round((lockOnTicks.current / tot) * 100);
        
        const leftTotal = trackingStats.current.leftTotal || 1;
        const leftAcc = Math.round((trackingStats.current.leftHits / leftTotal) * 100);
        
        const rightTotal = trackingStats.current.rightTotal || 1;
        const rightAcc = Math.round((trackingStats.current.rightHits / rightTotal) * 100);
        
        // Calculate tracking rank
        let rank = 'Bronze Track';
        if (finalTimeOnTarget >= 85) rank = 'Esports Grandmaster';
        else if (finalTimeOnTarget >= 70) rank = 'Diamond Track';
        else if (finalTimeOnTarget >= 50) rank = 'Platinum Track';
        else if (finalTimeOnTarget >= 30) rank = 'Gold Track';
        
        setAnalytics({
          timeOnTarget: finalTimeOnTarget,
          lockOnStreak: (longestStreak.current / 1000).toFixed(2), // convert ms to seconds
          leftAccuracy: leftAcc,
          rightAccuracy: rightAcc,
          totalTrackingPoints: scoreRef.current,
          rank: rank
        });

        // Record telemetry for AI coaching
        try {
          recordDrillResult('strafe-tracking', {
            score: scoreRef.current,
            accuracy: finalTimeOnTarget,
            reactionTimeMs: null,
            trackingAccuracy: finalTimeOnTarget,
            comboMax: Math.round(longestStreak.current / 1000),
            overshoots: 0,
            undershoots: 0,
            sensitivity: inGameSens,
            dpi,
            gameType,
            duration: DRILL_DURATION
          });
        } catch (e) {}
      }
    }, 1000);
  }, [updateBestScore]);

  // Commence drill
  const startGame = useCallback(() => {
    // Get adaptive difficulty params
    const adaptive = getAdaptiveParams('strafe-tracking');
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
    
    // Reset analytics
    totalTicks.current = 0;
    lockOnTicks.current = 0;
    currentStreakStart.current = 0;
    longestStreak.current = 0;
    isTrackingLocked.current = false; if (typeof checkSensitivityAdjustment === 'function') checkSensitivityAdjustment('tracking_tick', { isLocked: false, dist: distToCapsule, targetSize: radius, target: target.current }); if (typeof checkSensitivityAdjustment === 'function') checkSensitivityAdjustment('tracking_tick', { isLocked: false, dist: distToCapsule, targetSize: radius, target: target.current });
    
    trackingStats.current = {
      leftTotal: 0,
      leftHits: 0,
      rightTotal: 0,
      rightHits: 0
    };
    
    const cvs = canvasRef.current;
    const w = cvs ? cvs.width : 800;
    const h = cvs ? cvs.height : 450;
    
    // Setup target initial states
    const diffConfig = DIFFICULTIES[difficulty];
    target.current = {
      x: w / 2,
      y: h / 2,
      vx: 200 * diffConfig.speedMultiplier * adaptive.speedMultiplier,
      vy: 0,
      groundY: h - 100
    };
    
    nextDecisionTime.current = performance.now() + 400;
    lastTickTime.current = performance.now();
    
    startTimer();
    if (canvasRef.current) {
      try {
        canvasRef.current.requestPointerLock();
      } catch (e) {
        console.warn("Pointer lock blocked", e);
      }
    }
    crosshairInitializedRef.current = true;
  }, [startTimer, requestPointerLock, difficulty]);


  // Main rendering loop and dodging AI physics calculations
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
      
      target.current.groundY = h - 80;
      
      if (w > 0 && h > 0 && (!crosshairInitializedRef.current || (virtualCrosshair.current.x === 0 && virtualCrosshair.current.y === 0))) {
        virtualCrosshair.current = { x: w / 2, y: h / 2 };
        crosshairInitializedRef.current = true;
      }
    };
    
    updateSize();
    window.addEventListener('resize', updateSize);
    
    let lastFrameTime = performance.now();
    let lastSoundTickTime = 0;
    
    const run = (timestamp) => {
      if (gameState !== 'playing') return;
      
      let dt = (timestamp - lastFrameTime) / 1000;
      lastFrameTime = timestamp;
      if (dt > 0.1) dt = 0.1;
      
      const diffConfig = DIFFICULTIES[difficulty];
      const radius = CAPSULE_RADIUS * diffConfig.scale;
      const height = CAPSULE_HEIGHT * diffConfig.scale;
      
      // 1. DODGING AI DECISION STATE MACHINE
      if (timestamp >= nextDecisionTime.current) {
        const choice = Math.random();
        
        // Randomize base speed
        const speed = (200 + Math.random() * 180) * diffConfig.speedMultiplier;
        
        if (choice < 0.35) {
          // Double Strafe Switch (dodge)
          target.current.vx = (target.current.vx > 0 ? -1 : 1) * speed;
        } else if (choice < 0.60) {
          // Soft deceleration/hesitation
          target.current.vx = target.current.vx * 0.4;
        } else if (choice < 0.60 + diffConfig.jumpChance && target.current.y >= target.current.groundY) {
          // Vertical dodge jump impulse
          target.current.vy = -450 * diffConfig.speedMultiplier;
        } else {
          // Normal redirection
          target.current.vx = (Math.random() > 0.5 ? 1 : -1) * speed;
        }
        
        // Schedule next random dodging action (150-450ms frequency spam)
        nextDecisionTime.current = timestamp + (Math.random() * 320 + 130);
      }
      
      // Apply gravity physics if target is mid-air
      const gravity = 1300;
      if (target.current.y < target.current.groundY) {
        target.current.vy += gravity * dt;
      }
      
      // Move target positions
      target.current.x += target.current.vx * dt;
      target.current.y += target.current.vy * dt;
      
      // Bounding check (Keep target strictly inside canvas bounds)
      const pad = radius + 30;
      if (target.current.x < pad) {
        target.current.x = pad;
        target.current.vx = Math.abs(target.current.vx); // reverse
        nextDecisionTime.current = timestamp + 100;
      } else if (target.current.x > cvs.width - pad) {
        target.current.x = cvs.width - pad;
        target.current.vx = -Math.abs(target.current.vx); // reverse
        nextDecisionTime.current = timestamp + 100;
      }
      
      if (target.current.y > target.current.groundY) {
        target.current.y = target.current.groundY;
        target.current.vy = 0;
      }
      
      // 2. CAPSULE COLLISION OVERLAP LOGIC (Time on Target checks)
      const ch = virtualCrosshair.current;
      
      // Bounding segment points for capsule pill: A(x, y - height) to B(x, y + height)
      const segAY = target.current.y - height;
      const segBY = target.current.y + height;
      
      // Project crosshair point onto segment line
      const lineLen = segBY - segAY;
      let t = (ch.y - segAY) / lineLen;
      t = Math.max(0, Math.min(1, t)); // clamp to line segment
      
      const closestPoint = {
        x: target.current.x,
        y: segAY + t * lineLen
      };
      
      const distToCapsule = Math.hypot(ch.x - closestPoint.x, ch.y - closestPoint.y);
      const isLocked = distToCapsule <= radius;
      
      // Tick scoring calculations
      totalTicks.current++;
      
      // Direction-based stats
      const isMovingLeft = target.current.vx < 0;
      if (isMovingLeft) {
        trackingStats.current.leftTotal++;
        if (isLocked) trackingStats.current.leftHits++;
      } else {
        trackingStats.current.rightTotal++;
        if (isLocked) trackingStats.current.rightHits++;
      }
      
      if (isLocked) {
        lockOnTicks.current++;
        
        // Add Tracking score (continuous points scaled by dt)
        scoreRef.current += Math.round(250 * dt);
        setScore(scoreRef.current);
        
        if (!isTrackingLocked.current) {
          isTrackingLocked.current = true;
          currentStreakStart.current = timestamp;
        } else {
          // Update longest streak
          const currentStreak = timestamp - currentStreakStart.current;
          if (currentStreak > longestStreak.current) {
            longestStreak.current = currentStreak;
          }
        }
        
        // Play lock clicking tick sound every 60ms
        if (timestamp - lastSoundTickTime >= 60) {
          playTrackingSound(); if (typeof checkSensitivityAdjustment === 'function') checkSensitivityAdjustment('hit'); if (typeof checkSensitivityAdjustment === 'function') checkSensitivityAdjustment('hit');
          lastSoundTickTime = timestamp;
        }
      } else {
        isTrackingLocked.current = false; if (typeof checkSensitivityAdjustment === 'function') checkSensitivityAdjustment('tracking_tick', { isLocked: false, dist: distToCapsule, targetSize: radius, target: target.current }); if (typeof checkSensitivityAdjustment === 'function') checkSensitivityAdjustment('tracking_tick', { isLocked: false, dist: distToCapsule, targetSize: radius, target: target.current });
      }
      
      // 3. RENDER SCENE
      ctx.fillStyle = '#080d1a';
      ctx.fillRect(0, 0, cvs.width, cvs.height);
      
      // Draw gridlines
      ctx.strokeStyle = 'rgba(239, 68, 68, 0.05)';
      ctx.lineWidth = 1;
      const spacing = 50;
      for (let x = 0; x < cvs.width; x += spacing) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, cvs.height); ctx.stroke();
      }
      for (let y = 0; y < cvs.height; y += spacing) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(cvs.width, y); ctx.stroke();
      }
      
      // Draw horizon floor path
      ctx.strokeStyle = 'rgba(239, 68, 68, 0.15)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, target.current.groundY + radius);
      ctx.lineTo(cvs.width, target.current.groundY + radius);
      ctx.stroke();
      
      // Render Dodging Capsule (Humanoid Pill)
      const pillX = target.current.x;
      const pillY = target.current.y;
      
      // Outer shadow glow depending on Lock states
      ctx.shadowBlur = isLocked ? 25 : 12;
      ctx.shadowColor = isLocked ? '#00ff88' : '#ef4444';
      
      // Fill neon color capsule
      ctx.fillStyle = isLocked ? 'rgba(0, 255, 136, 0.2)' : 'rgba(239, 68, 68, 0.12)';
      ctx.strokeStyle = isLocked ? '#00ff88' : '#ef4444';
      ctx.lineWidth = 3;
      
      // Draw Pill Capsule
      ctx.beginPath();
      ctx.arc(pillX, pillY - height, radius, Math.PI, 0, false); // top cap
      ctx.lineTo(pillX + radius, pillY + height); // right wall
      ctx.arc(pillX, pillY + height, radius, 0, Math.PI, false); // bottom cap
      ctx.lineTo(pillX - radius, pillY - height); // left wall
      ctx.closePath();
      ctx.fill(); ctx.stroke();
      
      ctx.shadowBlur = 0; // Reset shadow
      
      // Inner tactical brackets if Locked-on
      if (isLocked) {
        ctx.strokeStyle = 'rgba(0, 255, 136, 0.6)';
        ctx.lineWidth = 1.5;
        
        const bOffset = radius + 10;
        // L Bracket
        ctx.beginPath();
        ctx.moveTo(pillX - bOffset, pillY - height);
        ctx.lineTo(pillX - bOffset - 5, pillY - height);
        ctx.lineTo(pillX - bOffset - 5, pillY + height);
        ctx.lineTo(pillX - bOffset, pillY + height);
        ctx.stroke();
        
        // R Bracket
        ctx.beginPath();
        ctx.moveTo(pillX + bOffset, pillY - height);
        ctx.lineTo(pillX + bOffset + 5, pillY - height);
        ctx.lineTo(pillX + bOffset + 5, pillY + height);
        ctx.lineTo(pillX + bOffset, pillY + height);
        ctx.stroke();
        
        // LOCK ON text overlay above target
        ctx.fillStyle = '#00ff88';
        ctx.font = 'bold 9px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('TARGET LOCKED', pillX, pillY - height - radius - 10);
      }
      
      // 4. DRAW RETICLE
      ctx.strokeStyle = isLocked ? '#00ff88' : '#ef4444';
      ctx.lineWidth = 2;
      
      // Standard circular track crosshair
      ctx.beginPath();
      ctx.arc(ch.x, ch.y, 8, 0, Math.PI * 2);
      ctx.stroke();
      
      // Crosshair center dot
      ctx.fillStyle = isLocked ? '#00ff88' : '#ef4444';
      ctx.beginPath();
      ctx.arc(ch.x, ch.y, 2, 0, Math.PI * 2);
      ctx.fill();
      
      // Lock overlay instructions inside Canvas
      if (!pointerLocked) {
        ctx.fillStyle = 'rgba(8, 13, 26, 0.85)';
        ctx.fillRect(cvs.width / 2 - 170, cvs.height / 2 - 25, 340, 50);
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 1;
        ctx.strokeRect(cvs.width / 2 - 170, cvs.height / 2 - 25, 340, 50);
        
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 12px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('CLICK CANVAS TO CAPTURE & ENGAGE TRACK', cvs.width / 2, cvs.height / 2 + 4);
      }
      
      animationRef.current = requestAnimationFrame(run);
    };
    
    animationRef.current = requestAnimationFrame(run);
    
    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', updateSize);
    };
  }, [gameState, pointerLocked, difficulty]);

  return (
    <div ref={pageRef} className={`min-h-screen select-none font-mono ${isDarkMode ? 'bg-[#080d1a] text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      
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
              <li><span className="text-red-400 font-bold">Unpredictable Strafe Tracking</span></li>
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
                  Unpredictable Strafe Tracking
                </h1>
                <p className="text-xs text-slate-400 tracking-wider mt-0.5">
                  {pointerLocked ? '🟢 RAW TRACKING ON' : '🔴 UNLOCKED - CLICK CANVAS'} • {cmPer360} cm/360 • REACTIVE AI DODGE SPAM
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
              {gameState === 'playing' && (
                <button 
                  onClick={resetGame} 
                  className="px-3 py-1.5 rounded-lg border border-red-500/20 bg-red-950/20 text-red-400 hover:bg-red-950/40 text-xs flex items-center gap-1.5 transition"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>RESET</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* Start Game Screen */}
        {gameState === 'start' && (
          <div className="absolute inset-0 bg-[#080d1a]/95 flex items-center justify-center p-6 z-30 overflow-y-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Instruction Column */}
            <div className="lg:col-span-1 bg-[#0c1224]/80 border border-slate-900 rounded-xl p-6 flex flex-col justify-between backdrop-blur-md">
              <div>
                <h3 className="text-sm font-bold text-red-400 mb-4 flex items-center gap-2 border-b border-slate-900 pb-2">
                  <Info className="w-4 h-4" />
                  LAB PROTOCOLS
                </h3>
                <ul className="space-y-4 text-xs leading-relaxed text-slate-400">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold">1.</span>
                    <span>Hold your crosshair locked onto the moving capsule target. You do not need to click to shoot.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold">2.</span>
                    <span>The target uses real-time dodging scripts, performing high-frequency counter-strafes and jumps.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold">3.</span>
                    <span>Maintain contact to continuously gather tracking points. Locks trigger high-frequency sound clicks.</span>
                  </li>
                  <li className="flex items-start gap-2 text-green-400">
                    <span className="text-green-400 font-bold">★</span>
                    <span>Perfecting reactive tracking builds micro-correction reflexes, which are highly critical in games like Apex Legends.</span>
                  </li>
                </ul>
              </div>
              
              <div className="mt-6 pt-4 border-t border-slate-900 text-[10px] text-slate-500 leading-normal">
                Features direction-specific statistics to identify and fix physical visual weaknesses.
              </div>
            </div>

            {/* Config Column */}
            <div className="lg:col-span-2 bg-[#0c1224]/80 border border-slate-900 rounded-xl p-6 backdrop-blur-md flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2 border-b border-slate-900 pb-2">
                  <Cpu className="w-4 h-4 text-red-400" />
                  TRACKING SYSTEM CALIBRATION
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-[9px] text-slate-400 font-bold uppercase tracking-wider mb-2">Aim Difficulty Profile</label>
                    <select 
                      value={difficulty}
                      onChange={(e) => setDifficulty(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-2 text-xs text-white focus:outline-none focus:border-red-500/50 font-mono"
                    >
                      <option value="easy">Beginner (Large target, slower strafe)</option>
                      <option value="medium">Intermediate (Standard target)</option>
                      <option value="hard">Advanced (Small target, fast strafe)</option>
                      <option value="elite">Esports Elite (Hyper dodging capsule)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-[9px] text-slate-400 font-bold uppercase tracking-wider mb-2">Matched Game Sens</label>
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
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-[9px] text-slate-400 font-bold uppercase tracking-wider mb-2">Sensitivity multiplier</label>
                    <input 
                      type="number"
                      step="0.01"
                      value={inGameSens}
                      onChange={(e) => setInGameSens(Math.max(0.01, parseFloat(e.target.value) || 0.1))}
                      className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-2 text-xs text-white focus:outline-none focus:border-red-500/50"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] text-slate-400 font-bold uppercase tracking-wider mb-2">Mouse Hardware DPI</label>
                    <input 
                      type="number"
                      step="100"
                      value={dpi}
                      onChange={(e) => setDpi(Math.max(100, parseInt(e.target.value, 10) || 800))}
                      className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-2 text-xs text-white focus:outline-none focus:border-red-500/50"
                    />
                  </div>
                </div>

                <div className="p-4 bg-slate-950/80 rounded border border-slate-900 flex justify-between items-center text-xs">
                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase">Calculated cm/360</span>
                    <span className="text-white font-bold text-sm">{cmPer360} cm</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-500 block uppercase">Target capsule radius</span>
                    <span className="text-red-400 font-bold">
                      {Math.round(CAPSULE_RADIUS * DIFFICULTIES[difficulty].scale)} px
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-4 items-center justify-between border-t border-slate-900 pt-6">
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase">Best Tracking Score</span>
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
                  Initiate Tracking Drill
                </button>
              </div>
            </div>

          </div>
          </div>
        )}

        {/* Playing HUD Overlay & Canvas */}
        {true && (
          <div className={isFullscreen ? "w-full h-full" : "relative"}>
            

            {/* Interactive Canvas container */}
            <div 
              ref={containerRef} 
              className={isFullscreen 
                ? "w-full h-full bg-slate-950 relative overflow-hidden flex items-center justify-center cursor-none" 
                : "w-full aspect-video min-h-[400px] lg:min-h-[500px] bg-slate-950 border border-slate-800 rounded-xl relative overflow-hidden flex items-center justify-center cursor-none"}
            >
              <canvas ref={canvasRef} onClick={handleCanvasClick} />

            {/* S+ Pro Coach Dynamic Audio Guidance HUD & Alerts (Visual Text Hidden) */}


            {/* S+ Pro Coach Dynamic Audio Guidance HUD & Alerts (Visual Text Hidden) */}

            


              
            </div>

            {/* Guidance tips */}
            <div className="mt-4 text-center text-[10px] text-slate-550 flex items-center justify-center gap-4">
              <span>🖱 Hover crosshair over target</span>
              <span>• Keep lock-on green for maximum points</span>
              <span>• Target speeds scale based on difficulty profiles</span>
            </div>
          </div>
        )}

        {/* Game Over Screen */}
        {gameState === 'gameOver' && (
          <div className="absolute inset-0 bg-[#080d1a]/95 flex items-center justify-center p-6 z-30 overflow-y-auto">
            <div className="bg-[#0c1224]/80 border border-slate-900 rounded-xl p-8 backdrop-blur-md max-w-3xl mx-auto">
            <h2 className="text-xl font-bold text-red-400 text-center mb-6 uppercase tracking-widest flex items-center justify-center gap-2">
              <Award className="w-5 h-5 text-yellow-500" />
              SESSION LOG: TRACKING COMPLETED
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              
              {/* Left Column stats */}
              <div className="space-y-4">
                <div className="bg-slate-950 p-4 rounded border border-slate-900">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-550 uppercase">Final Rank Grade</span>
                    <span className="text-green-400 font-bold text-base uppercase">{analytics.rank}</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-950 p-3 rounded border border-slate-900 text-center">
                    <span className="text-[10px] text-slate-500 block uppercase">Time on Target</span>
                    <span className="text-white font-bold text-sm">{analytics.timeOnTarget}%</span>
                  </div>
                  <div className="bg-slate-950 p-3 rounded border border-slate-900 text-center">
                    <span className="text-[10px] text-slate-500 block uppercase">Longest Streak</span>
                    <span className="text-white font-bold text-sm">{analytics.lockOnStreak}s</span>
                  </div>
                </div>

                <div className="bg-slate-950 p-4 rounded border border-slate-900">
                  <div className="flex justify-between items-center text-xs mb-1">
                    <span className="text-slate-550 uppercase">Total Score Accumulated</span>
                    <span className="text-red-400 font-bold">{analytics.totalTrackingPoints} Points</span>
                  </div>
                  <div className="text-[10px] text-slate-550 leading-normal">
                    Points are awarded continuously for each frame where the crosshair successfully coordinates overlaps.
                  </div>
                </div>
              </div>

              {/* Right Column directional analytics */}
              <div className="space-y-4">
                <div className="bg-slate-950 p-4 rounded border border-slate-900">
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-900 pb-2 mb-3">
                    DIRECTIONAL TRACKING SPECS
                  </h4>
                  
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Left-Strafing Target Accuracy:</span>
                      <span className="text-slate-200 font-bold">{analytics.leftAccuracy}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Right-Strafing Target Accuracy:</span>
                      <span className="text-slate-200 font-bold">{analytics.rightAccuracy}%</span>
                    </div>
                    <div className="flex justify-between border-t border-slate-900 pt-2 mt-2">
                      <span className="text-slate-400">Tracking asymmetry gap:</span>
                      <span className={`font-bold ${Math.abs(analytics.leftAccuracy - analytics.rightAccuracy) <= 8 ? 'text-green-400' : 'text-yellow-500'}`}>
                        {Math.abs(analytics.leftAccuracy - analytics.rightAccuracy)}%
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
                    {analytics.timeOnTarget >= 65 ? (
                      <li className="text-green-400">🔥 Elite Tracking Lock: Symmetrical control over rapid velocity vector adjustments.</li>
                    ) : analytics.timeOnTarget >= 40 ? (
                      <li className="text-yellow-400">⚠️ Tracking Lag: Cursor drift occurs during horizontal target direction switches. Anticipate ADAD transitions.</li>
                    ) : (
                      <li className="text-red-400">🚨 Tracking Desync: Cursor fails to match dodging pacing. Slow down wrist movements to align speed.</li>
                    )}
                    {Math.abs(analytics.leftAccuracy - analytics.rightAccuracy) <= 8 ? (
                      <li className="text-green-400">🔥 Symmetrical Balance: Smooth tracking execution to both Left and Right axes. Symmetrical muscle memory.</li>
                    ) : (
                      <li className="text-yellow-400">⚠️ Directional Asymmetry: Sizable tracking gap of {Math.abs(analytics.leftAccuracy - analytics.rightAccuracy)}%. You struggle to track target moving {analytics.leftAccuracy < analytics.rightAccuracy ? "LEFT" : "RIGHT"}.</li>
                    )}
                    {parseFloat(analytics.lockOnStreak) >= 1.5 ? (
                      <li className="text-green-400">⚡ High Lock Stability: Exceptional uninterrupted lock streak of {analytics.lockOnStreak} seconds.</li>
                    ) : (
                      <li className="text-slate-400">⏳ Low Lock Duration: Aim is shaking on/off target. Focus on smooth mouse glides instead of rapid adjustments.</li>
                    )}
                  </ul>
                </div>
                <div className="space-y-3 flex flex-col justify-between">
                  <div>
                    <p className="font-bold text-white uppercase text-[10px] tracking-wider font-mono mb-1.5">Actionable Esports Training Prescription:</p>
                    <p className="text-slate-350 leading-relaxed font-sans">
                      {Math.abs(analytics.leftAccuracy - analytics.rightAccuracy) > 8 ? (
                        `Focus on target shifts moving to the ${analytics.leftAccuracy < analytics.rightAccuracy ? 'LEFT' : 'RIGHT'}. This asymmetry is common when clearing corners or tracking close range strafers. Spend 10 minutes performing slow-pursuit drills to iron out the directional muscle drag gap.`
                      ) : (
                        "Tracking is well-balanced. Challenge your hand-eye agility by shifting to high-refresh smooth pursuit Lissajous curves or increasing difficulty to Expert (fast dodging SMG targets with jumps)."
                      )}
                    </p>
                  </div>
                  <div className="pt-2">
                    <span className="inline-block bg-red-950/40 text-red-400 px-3 py-1.5 rounded text-[10px] font-mono font-bold uppercase border border-red-500/20 shadow-md">
                      REACTIVE TRACKING INDEX: {Math.round(analytics.timeOnTarget * parseFloat(analytics.lockOnStreak) * 10)} INDEX POINTS
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
                Track Again
              </button>
              <Link href="/drills/fps" className="w-full sm:w-auto">
                <button
                  className="w-full px-6 py-2.5 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-350 font-bold rounded-lg text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition"
                >
                  Return to Sector
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
