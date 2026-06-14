'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { Activity, AlertCircle, ArrowRight, Award, BarChart3, Calculator, Check, CheckCircle2, ChevronRight, Clock, Crosshair, GraduationCap, Heart, Home, Info, Lightbulb, Maximize2, MessageSquare, Minimize2, Play, RefreshCw, Sparkles, Star, Target, Timer, TrendingUp, Trophy, Volume2, VolumeX, Zap } from 'lucide-react';;;
import { COACHES, getActiveCoach, getCoachResponse, speakCoachText, handleCoachFeedback } from '../../../../lib/coachVoice';

import { recordDrillResult } from '../../../../lib/performanceTelemetry';
import { getAdaptiveParams } from '../../../../lib/adaptiveDifficulty';

const DRILL_DURATION = 60;
const BOLT_COOLDOWN = 1200; // Bolt action reload delay in ms
const TARGET_RADIUS = 10;
const BULLET_VELOCITY = 1000; // pixels per second in depth
const GRAVITY = 400; // pixels per second^2 vertical drop


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

export default function PUBGLeadDropClient() {


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
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [successfulHits, setSuccessfulHits] = useState(0);
  const [missedHits, setMissedHits] = useState(0);
  const [combo, setCombo] = useState(0);
  const [bestCombo, setBestCombo] = useState(0);
  const [timeLeft, setTimeLeft] = useState(DRILL_DURATION);
  const [accuracy, setAccuracy] = useState(100);
  const [lives, setLives] = useState(5);
  const [pointerLocked, setPointerLocked] = useState(false);
          
  // Telemetry metrics
  const [leadError, setLeadError] = useState(0); // Average horizontal mismatch in pixels
  const [dropError, setDropError] = useState(0); // Average vertical mismatch in pixels
  const [targetDistance, setTargetDistance] = useState(400); // meters (affects drop/lead math)

  const [analyticsData, setAnalyticsData] = useState({
    overshoots: 0, // Over-leading count
    undershoots: 0, // Under-leading count
    dropLowCount: 0, // Fired too low count
    totalShots: 0,
    leadErrorsList: [],
    dropErrorsList: []
  });
  
  const targetRef = useRef(null);
  const virtualCrosshair = useRef({ x: 0, y: 0 });
  const bulletsRef = useRef([]); // active flying bullets
  const tracesRef = useRef([]); // static bullet traces showing landing path
  const canvasSizeRef = useRef({ width: 800, height: 450 });
  
  const scoreRef = useRef(0);
  const comboRef = useRef(0);
  const timerIntervalRef = useRef(null);
  const isActiveRef = useRef(false);
  const gameStateRef = useRef('start');
  const audioCtxRef = useRef(null);
  const lastShotTimeRef = useRef(0);
  const timeLeftRef = useRef(DRILL_DURATION);
  const livesRef = useRef(5);
  const hitsRef = useRef(0);
  const missesRef = useRef(0);
  const bestComboRef = useRef(0);
  
  const leadErrorSumRef = useRef(0);
  const dropErrorSumRef = useRef(0);
  const leadShotsCountRef = useRef(0);
  
  // Feed overlay state
  const feedbacksRef = useRef([]);
  const [feedbacks, setFeedbacks] = useState([]);
  
  const crosshairHistoryRef = useRef([]);
  const shakeTimeRef = useRef(0);
  const flashOpacityRef = useRef(0);
  const lastFlashTimeRef = useRef(0);
  const nextFlashIntervalRef = useRef(15000 + Math.random() * 5000);
  const [activePlaylist, setActivePlaylist] = useState(null);
  const [playlistStep, setPlaylistStep] = useState(0);

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
  


  
  
  
  
  
  

  // Redefine speakText to route through active coach templates
  

  useEffect(() => {
    try {
      const s = localStorage.getItem('pubgLeadBestScore');
      if (s) {
        const p = parseInt(s, 10);
        if (!isNaN(p)) setBestScore(p);
      }
            const savedPlaylist = sessionStorage.getItem('esportsPlaylist');
      if (savedPlaylist) {
        setActivePlaylist(JSON.parse(savedPlaylist));
        setPlaylistStep(parseInt(sessionStorage.getItem('esportsPlaylistStep') || '0', 10));
      }
    } catch (e) {}
  }, []);
  
  useEffect(() => { gameStateRef.current = gameState; }, [gameState]);

  // Compute sensitivity
  // Compute sensitivity using GAME_YAWS
  

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
      const f = { success: 1200, fail: 200, combo: 1500, penalty: 100, shoot: 180 }; 
      o.frequency.setValueAtTime(f[type] || 440, now); 
      
      if (type === 'shoot') {
        o.type = 'triangle';
        g.gain.setValueAtTime(0.12, now);
        g.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
        o.start(now); o.stop(now + 0.25);
      } else if (type === 'success') {
        // crunch sound for sniper headshot
        o.type = 'sine';
        g.gain.setValueAtTime(0.1, now);
        g.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
        o.start(now); o.stop(now + 0.15);
      } else {
        g.gain.setValueAtTime(type==='combo'?0.1:type==='penalty'?0.15:0.06, now); 
        g.gain.exponentialRampToValueAtTime(0.001, now+0.1); 
        o.start(now); o.stop(now+0.1); 
      }
    } catch (e) {} 
  }, [soundEnabled, initAudio]);

  const updateBestScore = useCallback((fs) => { 
    try { 
      const c = parseInt(localStorage.getItem('pubgLeadBestScore') || '0', 10); 
      if (fs > c) { 
        localStorage.setItem('pubgLeadBestScore', fs.toString()); 
        setBestScore(fs); 
      } 
    } catch (e) {} 
  }, []);

  const resetGame = useCallback(() => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    isActiveRef.current = false;
    setGameState('start'); gameStateRef.current = 'start';
    targetRef.current = null;
    bulletsRef.current = [];
    tracesRef.current = [];
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
      if (!locked && gameStateRef.current === 'playing') {
        showFeedbackText('CURSOR UNLOCKED - Click Canvas to Lock', 'warn');
        speakText('Cursor unlocked. Recapture mouse control.');
      }
    };
    document.addEventListener('pointerlockchange', handlePointerLockChange);
    return () => document.removeEventListener('pointerlockchange', handlePointerLockChange);
  }, [showFeedbackText, speakText]);

  // Handle pointer locked mouse movements
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

  const spawnTarget = () => {
    const cvs = canvasRef.current;
    if (!cvs) return null;
    
    // Distances from 300m to 600m
    const dist = Math.round(300 + Math.random() * 300);
    setTargetDistance(dist);
    
    // Spawns left or right running horizontally at fixed vertical lane
    const runningLeft = Math.random() > 0.5;
    const runHeight = 160; // target running lane
    
    const speed = 160 + Math.random() * 100; // pixels per second
    
    return {
      x: runningLeft ? cvs.width : 0,
      y: runHeight,
      vx: runningLeft ? -speed : speed,
      dist: dist,
      spawnTime: performance.now()
    };
  };

  // Mouse Down Bullet Fire Handler
  useEffect(() => {
    const handleMouseClick = (e) => {
      if (document.pointerLockElement !== canvasRef.current || gameStateRef.current !== 'playing' || !isActiveRef.current) return;
      
      const now = performance.now();
      if (now - lastShotTimeRef.current < BOLT_COOLDOWN) {
        // Bolt action not reloaded yet
        return;
      }
      
      lastShotTimeRef.current = now;
      playSound('shoot');

      const ch = virtualCrosshair.current;
      const cvs = canvasRef.current;
      if (!cvs || !targetRef.current) return;

      const t = targetRef.current;
      // Calculate depth travel time based on target distance
      // e.g. 400m / 1000m/s = 0.4s
      const travelTime = t.dist / BULLET_VELOCITY;
      
      // Calculate where bullet lands in target plane after travelTime
      // Vertical bullet drop: 0.5 * gravity * t^2
      const dropOffset = 0.5 * GRAVITY * (travelTime * travelTime);
      const landingX = ch.x;
      const landingY = ch.y + dropOffset;

      // Spawn flying projectile tracing from bottom muzzle to target landing spot
      bulletsRef.current.push({
        startX: cvs.width / 2,
        startY: cvs.height,
        targetX: landingX,
        targetY: landingY,
        currentX: cvs.width / 2,
        currentY: cvs.height,
        startTime: now,
        travelTime: travelTime * 1000, // ms
        dropOffset: dropOffset,
        targetAtFire: { x: t.x, y: t.y, vx: t.vx, dist: t.dist }
      });
    };

    document.addEventListener('mousedown', handleMouseClick);
    return () => document.removeEventListener('mousedown', handleMouseClick);
  }, []);

  const endGame = useCallback(() => {
    setGameState('gameOver');
    gameStateRef.current = 'gameOver';
    isActiveRef.current = false;
    updateBestScore(scoreRef.current);
    // Record telemetry for AI coaching system
    try {
      recordDrillResult('pubg-lead-drop', {
        score: scoreRef.current,
        accuracy: accuracy,
        reactionTimeMs: null,
        trackingAccuracy: null,
        comboMax: bestCombo,
        overshoots: 0,
        undershoots: analyticsData.undershoots || 0,
        sensitivity: inGameSens,
        dpi,
        gameType,
        duration: DRILL_DURATION
      });
    } catch (e) {}

    if (document.pointerLockElement) {
      document.exitPointerLock();
    }

    const avgL = leadShotsCountRef.current > 0 ? Math.round(leadErrorSumRef.current / leadShotsCountRef.current) : 0;
    const avgD = leadShotsCountRef.current > 0 ? Math.round(dropErrorSumRef.current / leadShotsCountRef.current) : 0;

    let advice = `Bullet Lead Sniping complete. Score is ${scoreRef.current} points. `;
    if (avgL > 15) {
      advice += `Your horizontal lead error averages ${avgL} pixels. You are under-leading target velocity. Prescribed roadmap: Run Unpredictable Strafe Tracking for 10 minutes, then retry. `;
    } else if (avgD > 15) {
      advice += `Your bullet drop correction error averages ${avgD} pixels. You are failing to compensate vertical drop. Aim slightly higher. `;
    } else {
      advice += "Your bullet drop and lead corrections are pro tier. Exceptional predictive adjustments.";
    }

    speakText(advice, true);
  }, [updateBestScore, speakText]);

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

  // Main Canvas Loop
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
      
      if (w > 0 && h > 0) {
        virtualCrosshair.current = { x: w / 2, y: h / 2 };
      }
    };
    
    updateSize();
    window.addEventListener('resize', updateSize);
    
    lastShotTimeRef.current = 0;
    let lt = performance.now();
    
    function draw(ct) {
      if (!isActiveRef.current) { animationRef.current = requestAnimationFrame(draw); return; }
      let dt = (ct - lt) / 1000;
      lt = ct;
      if (dt > 0.1) dt = 0.1;
      
      // Stress flashbang interval check
      const stressMode = typeof window !== 'undefined' && localStorage.getItem('tournamentStress') === 'true';
      if (stressMode) {
        if (ct - lastFlashTimeRef.current > nextFlashIntervalRef.current) {
          flashOpacityRef.current = 1.0;
          lastFlashTimeRef.current = ct;
          nextFlashIntervalRef.current = 14000 + Math.random() * 10000;
          
          try {
            const audioCtx = initAudio();
            if (audioCtx) {
              const o = audioCtx.createOscillator(), g = audioCtx.createGain();
              o.connect(g); g.connect(audioCtx.destination);
              o.frequency.setValueAtTime(10000, audioCtx.currentTime);
              o.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 1.2);
              g.gain.setValueAtTime(0.12, audioCtx.currentTime);
              g.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.2);
              o.start(); o.stop(audioCtx.currentTime + 1.2);
            }
          } catch(e){}
        }
      }

      if (flashOpacityRef.current > 0) {
        flashOpacityRef.current = Math.max(0, flashOpacityRef.current - dt * 0.85);
      }

      let shakeOffsetX = 0;
      let shakeOffsetY = 0;
      if (stressMode && ct - shakeTimeRef.current < 250) {
        shakeOffsetX = (Math.random() - 0.5) * 12;
        shakeOffsetY = (Math.random() - 0.5) * 12;
      }

      ctx.save();
      ctx.translate(shakeOffsetX, shakeOffsetY);

      // Render canvas background
      ctx.fillStyle = "#020306";
      ctx.fillRect(0, 0, cvs.width, cvs.height);
      
      // Grid lines
      ctx.strokeStyle = 'rgba(239, 68, 68, 0.012)';
      ctx.lineWidth = 1;
      for (let i = 0; i < cvs.width; i += 40) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, cvs.height); ctx.stroke(); }
      for (let j = 0; j < cvs.height; j += 40) { ctx.beginPath(); ctx.moveTo(0, j); ctx.lineTo(cvs.width, j); ctx.stroke(); }
      
      // Spawn running targets
      if (!targetRef.current && gameStateRef.current === 'playing') {
        targetRef.current = spawnTarget();
      }
      
      // Update & Draw Target
      if (targetRef.current) {
        const t = targetRef.current;
        t.x += t.vx * dt;
        
        // Check if escaped screen boundaries
        if (t.x < -30 || t.x > cvs.width + 30) {
          missesRef.current += 1;
          setMissedHits(missesRef.current);
          comboRef.current = 0;
          setCombo(0);
          shakeTimeRef.current = ct;
          playSound('fail'); if (typeof checkSensitivityAdjustment === 'function') checkSensitivityAdjustment('miss', { dist: typeof dist !== 'undefined' ? dist : 50, targetSize: typeof targetRadius !== 'undefined' ? targetRadius : (typeof TARGET_SIZE !== 'undefined' ? TARGET_SIZE : (typeof TARGET_RADIUS !== 'undefined' ? TARGET_RADIUS : 15)) }); if (typeof checkSensitivityAdjustment === 'function') checkSensitivityAdjustment('miss', { dist: typeof dist !== 'undefined' ? dist : 50, targetSize: typeof targetRadius !== 'undefined' ? targetRadius : (typeof TARGET_SIZE !== 'undefined' ? TARGET_SIZE : (typeof TARGET_RADIUS !== 'undefined' ? TARGET_RADIUS : 15)) });
          showFeedbackText('⚠️ TARGET ESCAPED', 'error');
          speakText('Target escaped. Lead more.');
          
          livesRef.current -= 1;
          setLives(livesRef.current);
          if (livesRef.current <= 0) {
            playSound('penalty'); if (typeof checkSensitivityAdjustment === 'function') checkSensitivityAdjustment('miss', { dist: typeof dist !== 'undefined' ? dist : 50, targetSize: typeof targetRadius !== 'undefined' ? targetRadius : (typeof TARGET_SIZE !== 'undefined' ? TARGET_SIZE : (typeof TARGET_RADIUS !== 'undefined' ? TARGET_RADIUS : 15)) }); if (typeof checkSensitivityAdjustment === 'function') checkSensitivityAdjustment('miss', { dist: typeof dist !== 'undefined' ? dist : 50, targetSize: typeof targetRadius !== 'undefined' ? targetRadius : (typeof TARGET_SIZE !== 'undefined' ? TARGET_SIZE : (typeof TARGET_RADIUS !== 'undefined' ? TARGET_RADIUS : 15)) });
            // endGame();
          }
          
          const total = hitsRef.current + missesRef.current;
          setAccuracy(total > 0 ? Math.round((hitsRef.current / total) * 100) : 100);
          
          targetRef.current = spawnTarget(); // respawn
        } else {
          // Draw target circle with direction vector arrow
          ctx.shadowBlur = 8; ctx.shadowColor = "#3b82f6";
          ctx.fillStyle = "rgba(59, 130, 246, 0.8)";
          ctx.beginPath();
          ctx.arc(t.x, t.y, TARGET_RADIUS, 0, Math.PI*2);
          ctx.fill();
          ctx.shadowBlur = 0;

          // Inner critical head hitbox
          ctx.fillStyle = "#ffffff";
          ctx.beginPath();
          ctx.arc(t.x, t.y - 2, 4, 0, Math.PI*2);
          ctx.fill();

          // Distance Tag
          ctx.fillStyle = "rgba(148, 163, 184, 0.8)";
          ctx.font = "bold 9px monospace";
          ctx.textAlign = "center";
          ctx.fillText(`${t.dist}M`, t.x, t.y - 12);
        }
      }
      
      // Update & Draw Flying Bullets
      const activeBullets = [];
      bulletsRef.current.forEach((b) => {
        const elapsed = ct - b.startTime;
        const progress = Math.min(1.0, elapsed / b.travelTime);
        
        // Render bullet traces
        b.currentX = b.startX + (b.targetX - b.startX) * progress;
        b.currentY = b.startY + (b.targetY - b.startY) * progress;
        
        // Bullet size gets smaller as it travels in depth (simulating perspective)
        const depthSize = Math.max(1, 4 * (1 - progress));
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(b.currentX, b.currentY, depthSize, 0, Math.PI*2);
        ctx.fill();
        
        if (progress < 1.0) {
          activeBullets.push(b);
        } else {
          // Impact Event
          // Target position at moment of bullet impact
          if (targetRef.current) {
            const t = targetRef.current;
            const dist = Math.hypot(b.targetX - t.x, b.targetY - t.y);

            // Compute errors for telemetry
            const errX = Math.abs(b.targetX - t.x);
            const errY = Math.abs(b.targetY - t.y);
            
            leadErrorSumRef.current += errX;
            dropErrorSumRef.current += errY;
            leadShotsCountRef.current += 1;
            
            setLeadError(Math.round(leadErrorSumRef.current / leadShotsCountRef.current));
            setDropError(Math.round(dropErrorSumRef.current / leadShotsCountRef.current));

            setAnalyticsData(prev => ({
              ...prev,
              totalShots: prev.totalShots + 1,
              leadErrorsList: [...prev.leadErrorsList, errX],
              dropErrorsList: [...prev.dropErrorsList, errY]
            }));

            // Store trace for static drawing feedback
            tracesRef.current.push({
              x: b.targetX,
              y: b.targetY,
              targetX: t.x,
              targetY: t.y,
              hit: dist <= TARGET_RADIUS,
              spawnTime: ct
            });

            if (dist <= TARGET_RADIUS) {
              // HIT!
              hitsRef.current += 1;
              setSuccessfulHits(hitsRef.current);
              
              const distanceBonus = Math.round(t.dist * 0.5);
              scoreRef.current += 500 + comboRef.current * 50 + distanceBonus;
              setScore(scoreRef.current);
              
              comboRef.current += 1;
              setCombo(comboRef.current);
              if (comboRef.current > bestComboRef.current) {
                bestComboRef.current = comboRef.current;
                setBestCombo(comboRef.current);
              }
              
              if (comboRef.current % 3 === 0) {
                playSound('combo');
                showFeedbackText(`🎯 SNIPER GOD x${comboRef.current}`, 'success');
                speakText('Sensational lead prediction!');
              } else {
                playSound('success'); if (typeof checkSensitivityAdjustment === 'function') checkSensitivityAdjustment('hit'); if (typeof checkSensitivityAdjustment === 'function') checkSensitivityAdjustment('hit');
              }
              
              targetRef.current = spawnTarget(); // respawn new target
            } else {
              // MISS
              missesRef.current += 1;
              setMissedHits(missesRef.current);
              comboRef.current = 0;
              setCombo(0);
              shakeTimeRef.current = ct;
              playSound('fail'); if (typeof checkSensitivityAdjustment === 'function') checkSensitivityAdjustment('miss', { dist: typeof dist !== 'undefined' ? dist : 50, targetSize: typeof targetRadius !== 'undefined' ? targetRadius : (typeof TARGET_SIZE !== 'undefined' ? TARGET_SIZE : (typeof TARGET_RADIUS !== 'undefined' ? TARGET_RADIUS : 15)) }); if (typeof checkSensitivityAdjustment === 'function') checkSensitivityAdjustment('miss', { dist: typeof dist !== 'undefined' ? dist : 50, targetSize: typeof targetRadius !== 'undefined' ? targetRadius : (typeof TARGET_SIZE !== 'undefined' ? TARGET_SIZE : (typeof TARGET_RADIUS !== 'undefined' ? TARGET_RADIUS : 15)) });

              // Visual correction warning alerts
              if (b.targetX < t.x && t.vx > 0) {
                showFeedbackText('⚠️ UNDER-LEAD', 'error');
                speakText('Under leading target.');
                setAnalyticsData(prev => ({ ...prev, undershoots: prev.undershoots + 1 }));
              } else if (b.targetX > t.x && t.vx > 0) {
                showFeedbackText('⚠️ OVER-LEAD', 'warn');
                speakText('Over leading target.');
                setAnalyticsData(prev => ({ ...prev, overshoots: prev.overshoots + 1 }));
              } else if (b.targetY > t.y + 3) {
                showFeedbackText('⚠️ DROP OVER-CORRECTION', 'warn');
                speakText('Aim lower. Overcompensated drop.');
              } else if (b.targetY < t.y - 3) {
                showFeedbackText('⚠️ AIM HIGHER (DROP)', 'error');
                speakText('Bullet drop. Aim higher.');
                setAnalyticsData(prev => ({ ...prev, dropLowCount: prev.dropLowCount + 1 }));
              }

              livesRef.current -= 1;
              setLives(livesRef.current);
              if (livesRef.current <= 0) {
                playSound('penalty'); if (typeof checkSensitivityAdjustment === 'function') checkSensitivityAdjustment('miss', { dist: typeof dist !== 'undefined' ? dist : 50, targetSize: typeof targetRadius !== 'undefined' ? targetRadius : (typeof TARGET_SIZE !== 'undefined' ? TARGET_SIZE : (typeof TARGET_RADIUS !== 'undefined' ? TARGET_RADIUS : 15)) }); if (typeof checkSensitivityAdjustment === 'function') checkSensitivityAdjustment('miss', { dist: typeof dist !== 'undefined' ? dist : 50, targetSize: typeof targetRadius !== 'undefined' ? targetRadius : (typeof TARGET_SIZE !== 'undefined' ? TARGET_SIZE : (typeof TARGET_RADIUS !== 'undefined' ? TARGET_RADIUS : 15)) });
                // endGame();
              }
            }
            const total = hitsRef.current + missesRef.current;
            setAccuracy(total > 0 ? Math.round((hitsRef.current / total) * 100) : 100);
          }
        }
      });
      bulletsRef.current = activeBullets;

      // Draw static impact feedback traces (lasts 1.5 seconds)
      const activeTraces = [];
      tracesRef.current.forEach((tr) => {
        const age = ct - tr.spawnTime;
        if (age < 1500) {
          const opacity = 1 - age / 1500;
          
          // Draw landing point
          ctx.strokeStyle = tr.hit ? `rgba(0, 255, 136, ${opacity})` : `rgba(239, 68, 68, ${opacity})`;
          ctx.lineWidth = 1.0;
          
          // Red cross indicating landing click position
          ctx.beginPath();
          ctx.moveTo(tr.x - 4, tr.y); ctx.lineTo(tr.x + 4, tr.y);
          ctx.moveTo(tr.x, tr.y - 4); ctx.lineTo(tr.x, tr.y + 4);
          ctx.stroke();

          // Connection line to target position at impact
          ctx.strokeStyle = `rgba(148, 163, 184, ${opacity * 0.4})`;
          ctx.lineWidth = 0.8;
          ctx.setLineDash([3, 3]);
          ctx.beginPath();
          ctx.moveTo(tr.x, tr.y);
          ctx.lineTo(tr.targetX, tr.targetY);
          ctx.stroke();
          ctx.setLineDash([]);
          
          activeTraces.push(tr);
        }
      });
      tracesRef.current = activeTraces;
      
      
      
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
      
      

      // Flashbang render overlay
      if (flashOpacityRef.current > 0) {
        ctx.fillStyle = `rgba(255, 255, 255, ${flashOpacityRef.current})`;
        ctx.fillRect(0, 0, cvs.width, cvs.height);
      }

      ctx.restore();
      animationRef.current = requestAnimationFrame(draw);
    }
  }, [gameState, pointerLocked, initAudio]);

  const startGame = useCallback(() => {
    // Get adaptive difficulty parameters
    const adaptive = getAdaptiveParams('pubg-lead-drop');

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
    
    setAnalyticsData({ perfectRhythmCount: 0, fastTapsCount: 0, slowTapsCount: 0, overshoots: 0, undershoots: 0, dropLowCount: 0, totalShots: 0, leadErrorsList: [], dropErrorsList: [] });
    setGameState('playing'); gameStateRef.current = 'playing';
    setScore(0); setSuccessfulHits(0); setMissedHits(0); setCombo(0); setBestCombo(0);
    setLeadError(0); setDropError(0);
    timeLeftRef.current = DRILL_DURATION; setTimeLeft(DRILL_DURATION);
    setAccuracy(100); setLives(5);
    isActiveRef.current = true; scoreRef.current = 0; comboRef.current = 0; bestComboRef.current = 0; livesRef.current = 5;
    hitsRef.current = 0; missesRef.current = 0;
    leadErrorSumRef.current = 0; dropErrorSumRef.current = 0; leadShotsCountRef.current = 0;
    targetRef.current = null;
    bulletsRef.current = [];
    tracesRef.current = [];
    
    startTimer();
    
    if (canvasRef.current) {
      try {
        canvasRef.current.requestPointerLock();
      } catch (e) {}
    }
    speakText("Sniper calibration initialized. Aim ahead of the target path and slightly above to offset drop.", true);
  }, [startTimer, speakText]);

    // Display helpers for stats board
  const displayScore = score;
  const displayBest = bestScore;
  const displayTime = typeof timeLeft !== 'undefined' ? `${timeLeft}s` : '60s';
  const displayAccuracy = typeof trackingAccuracy !== 'undefined' ? `${trackingAccuracy}%` : '100%';
  const displayCombo = typeof combo !== 'undefined' ? combo : 0;
  const displayMaxCombo = typeof bestCombo !== 'undefined' ? bestCombo : '-';
  const displayReaction = '-';
  const displaySens = typeof universalSens !== 'undefined' ? `${universalSens.toFixed(2)}x` : '1.00x';

  return (
    <div ref={pageRef} className="min-h-screen select-none font-mono bg-[#080d1a] text-slate-100 relative overflow-hidden">
      
      {/* Background patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-950/20 via-[#080d1a] to-[#080d1a] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,_transparent_1px),_linear-gradient(90deg,_rgba(59,130,246,0.03)_1px,_transparent_1px)] bg-[size:30px_30px] pointer-events-none z-0" />
      
      <div className={`${isFullscreen ? 'w-full h-screen p-0 m-0' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'} relative z-10`}>
        
        {!isFullscreen && (
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-2 text-[10px] text-slate-400 uppercase tracking-widest">
              <li><Link href="/" className="hover:text-red-400 transition-colors"><Home className="w-3.5 h-3.5" /></Link></li>
              <li><ChevronRight className="w-3 h-3 text-slate-700" /></li>
              <li><Link href="/drills/fps" className="hover:text-red-400 transition-colors">FPS Sector</Link></li>
              <li><ChevronRight className="w-3 h-3 text-slate-700" /></li>
              <li><span className="text-red-400 font-bold">S+ PUBG Bullet Lead & Drop</span></li>
            </ol>
          </nav>
        )}
        
        {!isFullscreen && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 border-b border-slate-900 pb-5">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-950/30 border border-blue-500/25 text-blue-400 rounded-xl shadow-lg shadow-blue-500/10">
                <Crosshair className="w-7 h-7 animate-pulse text-blue-400" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white uppercase bg-gradient-to-r from-blue-500 via-white to-slate-400 bg-clip-text text-transparent">
                  S+ PUBG Bullet Lead & Drop
                </h1>
                <p className="text-xs text-slate-400 tracking-wider mt-0.5 animate-pulse">
                  {pointerLocked ? '🟢 ELITE CALIBRATION ACTIVE' : '🔴 CLICK CANVAS TO CAPTURE'} • {cmPer360} cm/360 • AWM SNIPE
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Start Game Screen */}
        

        {/* Playing Screen */}
        <div className={isFullscreen ? "w-full h-full" : "block"}>
          {gameState === 'playing' && (
            <div className="flex justify-between items-center bg-slate-950/90 border border-slate-800 rounded-lg p-3 mb-3 text-[11px] uppercase tracking-wider font-mono">
              <div className="flex gap-4">
                <span>Score: <strong className="text-blue-400">{score}</strong></span>
                <span>Time: <strong className="text-white">{timeLeft}s</strong></span>
                <span>Lives: <strong className="text-red-500">{'♥'.repeat(Math.max(0, lives))}</strong></span>
              </div>
              <div className="flex gap-4">
                <span>Combo: <strong className="text-yellow-500">{combo}</strong></span>
                <span>Lead Error: <strong className="text-red-400">{leadError}px</strong></span>
                <span>Drop Error: <strong className="text-blue-400">{dropError}px</strong></span>
              </div>
            </div>
          )}

          {/* Stats Board */}
          {!isFullscreen && (
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 sm:gap-3 mb-6 h-auto min-h-[88px] py-1">
              <StatCard icon={<Target className="text-red-500 w-5 h-5" />} value={displayScore} label="Score" />
              <StatCard icon={<Trophy className="text-yellow-500 w-5 h-5" />} value={displayBest} label="Best" />
              <StatCard icon={<Timer className="text-green-500 w-5 h-5" />} value={displayTime} label="Time" />
              <StatCard icon={<BarChart3 className="text-purple-500 w-5 h-5" />} value={displayAccuracy} label="Accuracy" />
              <StatCard icon={<Zap className="text-orange-500 w-5 h-5" />} value={displayCombo} label="Combo" />
              <StatCard icon={<Star className="text-yellow-400 w-5 h-5" />} value={displayMaxCombo} label="Max Combo" />
              <StatCard icon={<Clock className="text-blue-500 w-5 h-5" />} value={displayReaction} label="Avg Reaction" />
              <StatCard icon={<Crosshair className="text-green-400 w-5 h-5" />} value={displaySens} label="Sens" />
            </div>
          )}

          <div 
            ref={containerRef} 
            className={isFullscreen 
              ? "w-full h-full bg-[#020306] relative overflow-hidden flex items-center justify-center cursor-none" 
              : "w-full aspect-video min-h-[400px] lg:min-h-[500px] bg-[#020306] border border-slate-800 rounded-xl relative overflow-hidden flex items-center justify-center cursor-none"}
          >
            <canvas ref={canvasRef} onClick={handleCanvasClick} />
            {gameState === 'start' && (
          <div className="absolute inset-0 bg-[#080d1a]/95 flex items-center justify-center p-6 z-30 overflow-y-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl">
            
            <div className="lg:col-span-1 bg-[#0c1224]/80 border border-slate-900 rounded-xl p-6 flex flex-col justify-between backdrop-blur-md">
              <div>
                <h3 className="text-sm font-bold text-blue-500 mb-4 flex items-center gap-2 border-b border-slate-900 pb-2">
                  <Info className="w-4 h-4" />
                  BULLET PHYSICS DETAILS
                </h3>
                <ul className="space-y-4 text-xs leading-relaxed text-slate-400">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 font-bold">1.</span>
                    <span>Projectiles take **travel latency** (depth distance / velocity) to land in the target's plane.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 font-bold">2.</span>
                    <span>Aim **ahead** of running targets to lead them correctly, and **above** to offset gravity drop.</span>
                  </li>
                  <li className="flex items-start gap-2 text-blue-300 animate-pulse">
                    <span className="text-blue-500 font-bold">★</span>
                    <span>Bolt action takes **1.2 seconds** to reload. Wait for the reload ring to sweep fully.</span>
                  </li>
                </ul>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-900 flex justify-between items-center text-[10px]">
                <span className="text-slate-550 uppercase">Voice Guide:</span>
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
                  <Calculator className="w-4 h-4 text-blue-500" />
                  CALIBRATE LONG-RANGE SENSITIVITY
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
                    <span className="text-[10px] text-slate-550 block uppercase">360° Physical Distance</span>
                    <span className="text-white font-bold text-sm">{cmPer360} cm / 360°</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-550 block uppercase">Bullet Muzzle Velocity</span>
                    <span className="text-blue-400 font-bold">1000 px/s (Depth-wise)</span>
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
                  Launch Sniper Training
                </button>
              </div>
            </div>
          </div>
          </div>
        )}
            {gameState === 'gameOver' && (
          <div className="absolute inset-0 bg-[#080d1a]/95 flex items-center justify-center p-6 z-30 overflow-y-auto">
            <div className="bg-[#0c1224]/85 border border-blue-500/20 rounded-xl p-8 backdrop-blur-md max-w-3xl mx-auto w-full shadow-2xl">
            <h2 className="text-xl font-bold text-blue-400 text-center mb-6 uppercase tracking-widest flex items-center justify-center gap-2 animate-pulse">
              <Award className="w-5 h-5 text-yellow-500" />
              S+ PUBG SNIPER COMPLETE
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="space-y-4">
                <div className="bg-slate-950 p-4 rounded border border-slate-900">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-550 block uppercase">Final Score:</span>
                    <span className="text-white font-bold text-xl">{score} PTS</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-950 p-3 rounded border border-slate-900 text-center">
                    <span className="text-[10px] text-slate-550 block uppercase">Max Combo</span>
                    <span className="text-white font-bold text-sm">{bestCombo} Hits</span>
                  </div>
                  <div className="bg-slate-950 p-3 rounded border border-slate-900 text-center">
                    <span className="text-[10px] text-slate-550 block uppercase">Accuracy %</span>
                    <span className="text-white font-bold text-sm">{accuracy}%</span>
                  </div>
                </div>

                <div className="bg-slate-950 p-4 rounded border border-slate-900">
                  <div className="flex justify-between items-center text-xs mb-1">
                    <span className="text-slate-550 uppercase">Average Lead Error</span>
                    <span className="text-red-500 font-bold">{leadError} px</span>
                  </div>
                  <div className="text-[10px] text-slate-550 leading-normal">
                    Horizontal offset between bullet impact and target center. Target escapes if lead is under 10px.
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-slate-950 p-4 rounded border border-slate-900">
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-900 pb-2 mb-3">
                    SNIPING CALIBRATION TELEMETRY
                  </h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-550">Average Drop Error:</span>
                      <span className="text-blue-400 font-bold">{dropError} px</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-550">Under-Leaded Misses:</span>
                      <span className="text-red-400 font-bold">{analyticsData.undershoots}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-550">Drop Deficit Misses (Aim Low):</span>
                      <span className="text-yellow-400 font-bold">{analyticsData.dropLowCount}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* S+ AI Assistant Coach Performance Diagnostics */}
            <div className="bg-[#080d1a] border border-blue-500/10 rounded-lg p-5 mb-8 text-left shadow-inner">
              <h3 className="text-xs font-bold text-blue-400 font-mono uppercase tracking-widest border-b border-slate-800 pb-2 mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-400 animate-pulse" />
                S+ AI COACH TELEMETRY DIAGNOSTICS & ROADMAP
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs leading-relaxed text-slate-350">
                <div className="space-y-2 border-r border-slate-900 pr-6">
                  <p className="font-bold text-white uppercase text-[10px] tracking-wider font-mono">Predictive Accuracy Diagnostics:</p>
                  <ul className="space-y-2 list-disc pl-4">
                    {leadError <= 15 ? (
                      <li className="text-green-400">🔥 Lead Convergence: Outstanding velocity compensation. You track and fire perfectly ahead of target movement vectors.</li>
                    ) : (
                      <li className="text-red-400">⚠️ Velocity Lag: Lead error averages {leadError}px. You are releasing target triggers too early, behind target direction.</li>
                    )}
                    {dropError <= 15 ? (
                      <li className="text-green-400">🔥 Gravity Alignment: Excellent vertical offset adjustments. Drop error of {dropError}px represents high precision.</li>
                    ) : (
                      <li className="text-yellow-500">⚠️ Gravity Deficit: Aiming too close to target horizontal line. Bullet gravity drops below hitbox boundary.</li>
                    )}
                  </ul>
                </div>
                <div className="space-y-3 flex flex-col justify-between">
                  <div>
                    <p className="font-bold text-white uppercase text-[10px] tracking-wider font-mono mb-1">Prescribed Practice Roadmap:</p>
                    <p className="text-slate-350 leading-relaxed font-sans">
                      {leadError > 15 ? (
                        "Roadmap Prescribed: Spend 10 minutes in Unpredictable Strafe Tracking to lock in cursor tracking speed before returning to sniping."
                      ) : (
                        "Roadmap Prescribed: Predictive aim fully calibrated. Continue to PUBG Passenger Drive-by drill to challenge aiming from a moving vehicle."
                      )}
                    </p>
                  </div>
                  <div className="pt-1">
                    <span className="inline-block bg-blue-950/40 text-blue-400 px-3 py-1.5 rounded text-[10px] font-mono font-bold uppercase border border-blue-550/20 shadow-md animate-pulse">
                      S+ PERFORMANCE OVERALL: {(score * (accuracy / 100) * 1.5).toFixed(0)} INDEX PTS
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center border-t border-slate-900 pt-6">
              {activePlaylist && playlistStep + 1 < activePlaylist.length ? (
                <Link 
                  href={`/drills/fps/${activePlaylist[playlistStep + 1]}`}
                  onClick={() => {
                    sessionStorage.setItem('esportsPlaylistStep', (playlistStep + 1).toString());
                  }}
                  className="w-full sm:w-auto"
                >
                  <button
                    className="w-full px-6 py-2.5 bg-yellow-600 hover:bg-yellow-650 text-slate-950 font-extrabold rounded-lg text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition animate-pulse"
                  >
                    <span>Proceed to Stage {playlistStep + 2} →</span>
                  </button>
                </Link>
              ) : activePlaylist ? (
                <Link 
                  href="/drills/fps"
                  onClick={() => {
                    sessionStorage.removeItem('esportsPlaylist');
                    sessionStorage.removeItem('esportsPlaylistStep');
                  }}
                  className="w-full sm:w-auto"
                >
                  <button
                    className="w-full px-6 py-2.5 bg-yellow-600 hover:bg-yellow-650 text-slate-950 font-extrabold rounded-lg text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition"
                  >
                    <span>Finish Routine ✅</span>
                  </button>
                </Link>
              ) : (
                <button
                  onClick={startGame}
                  className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition shadow-lg shadow-blue-500/20"
                >
                  <RefreshCw className="w-4.5 h-4.5" />
                  Train Again
                </button>
              )}
              
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


            {/* S+ Pro Coach Dynamic Audio Guidance HUD */}
            {gameState === 'playing' && (
              <div className="absolute bottom-4 left-4 z-20 pointer-events-none flex items-center gap-3 bg-slate-950/85 border border-slate-850 rounded-xl px-4 py-3 backdrop-blur-md max-w-xs sm:max-w-sm transition-all duration-300 shadow-xl">
                <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${activeCoach?.avatarColor || 'from-cyan-600 to-blue-700'} flex items-center justify-center text-xl shrink-0 border border-white/10 shadow-md ${coachSpeaking ? 'ring-2 ring-red-500/50 scale-105 animate-pulse' : 'opacity-80'}`}>
                  {activeCoach?.avatarText || '🤖'}
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] font-mono text-red-500 font-extrabold uppercase tracking-widest flex items-center gap-1">
                    🟢 COACH {activeCoach?.name || 'ATHENA'} GUIDANCE
                  </span>
                  <p className="text-[10px] font-mono text-slate-350 leading-relaxed mt-0.5 max-w-[220px]">
                    {coachSubtitle ? `"${coachSubtitle}"` : '"Awaiting sniper calibration..."'}
                  </p>
                </div>
              </div>
            )}

            {/* Feed Notifications overlay */}
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
            <span>🖱 Aim ahead & above moving targets. Trace lines show landing offset.</span>
            <span>• Exit using <kbd className="px-1.5 py-0.5 bg-slate-900 border border-slate-800 text-slate-350 rounded font-sans text-[10px]">ESC</kbd>.</span>
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
                  About S+ PUBG Bullet Lead & Drop
                </h2>
              </div>
              <div className="p-6">
                <p className="text-xs text-slate-400 leading-relaxed mb-6">
                  This s+ pubg bullet lead & drop drill is designed to refine tactical mechanical reflexes, hand-eye coordination, and spatial mouse accuracy. By using 1:1 hardware raw input via the Pointer Lock API, it bypasses operating system cursor acceleration to build consistent physical muscle memory. With dynamic difficulty and AI-powered performance diagnostics, this tool conditions esports players for high-velocity target acquisition in games like CS2, Valorant, Apex Legends, and Overwatch.
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
                      <h3 className="font-bold text-white uppercase tracking-wider">Why Practice S+ PUBG Bullet Lead & Drop?</h3>
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


// Hoisted StatCard Component for unified HUD telemetry display
function StatCard({ icon, value, label, unit = '' }) {
  return (
    <div className="group rounded-xl border border-slate-900 bg-slate-950/40 p-2 text-center flex flex-col justify-center h-full transition-all duration-300 hover:scale-[1.03] hover:border-slate-800 backdrop-blur-sm">
      <div className="mb-0.5 flex justify-center transition-transform duration-300 group-hover:scale-110" aria-hidden="true">
        {icon}
      </div>
      <p className="text-xs sm:text-sm md:text-base font-extrabold tracking-tight truncate text-white">
        {value}
        <span className="text-[10px] sm:text-xs font-semibold ml-0.5 opacity-80 text-slate-400">{unit}</span>
      </p>
      <p className="text-[8px] sm:text-[9px] font-mono font-bold uppercase tracking-wider text-slate-500 truncate">{label}</p>
    </div>
  );
}
