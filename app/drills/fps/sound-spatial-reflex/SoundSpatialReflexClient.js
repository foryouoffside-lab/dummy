'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { COACHES, getActiveCoach, getCoachResponse, speakCoachText, handleCoachFeedback } from '../../../../lib/coachVoice';
import Link from 'next/link';
import { recordDrillResult } from '../../../../lib/performanceTelemetry';
import { getAdaptiveParams } from '../../../../lib/adaptiveDifficulty';

import { Activity, ArrowRight, Award, BarChart3, CheckCircle2, ChevronRight, Clock, Crosshair, GraduationCap, Home, Info, Lightbulb, Maximize2, Minimize2, Play, RefreshCw, Sparkles, Star, Target, Timer, TrendingUp, Trophy, Volume2, VolumeX, Zap } from 'lucide-react';;;

const DRILL_DURATION = 60;
const VIEWPORT_WIDTH = 3600; // 360 degrees mapped to 3600 pixels


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

export default function SoundSpatialReflexClient() {


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
  const [avgReaction, setAvgReaction] = useState(0);
  const [timeLeft, setTimeLeft] = useState(DRILL_DURATION);
  const [pointerLocked, setPointerLocked] = useState(false);
        
  // High performance references
  const viewAngle = useRef(1800); // player view angle 0 to 3600
  const canvasSizeRef = useRef({ width: 800, height: 450 });
  const crosshairInitRef = useRef(false);
  
  // Sound source target properties
  const targetAngleRef = useRef(0);
  const targetYRef = useRef(200);
  const spawnTimeRef = useRef(0);
  const targetActiveRef = useRef(false);

  // Stats variables
  const hitsRef = useRef(0);
  const reactionTimesRef = useRef([]);
  const timerIntervalRef = useRef(null);
  const isActiveRef = useRef(false);
  const gameStateRef = useRef('start');
  const audioCtxRef = useRef(null);
  const timeLeftRef = useRef(DRILL_DURATION);

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
  


  useEffect(() => {
    try {
      const s = localStorage.getItem('soundSpatialReflexBestScore');
      if (s) {
        const p = parseInt(s, 10);
        if (!isNaN(p)) setBestScore(p);
      }
            } catch(e){}
  }, []);

  useEffect(() => { gameStateRef.current = gameState; }, [gameState]);

  // Compute sensitivity & eDPI
  

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

  const playSpatialSound = useCallback((panVal) => {
    if (!soundEnabled) return;
    try {
      const ctx = initAudio(); if (!ctx) return;
      const o = ctx.createOscillator();
      const g = ctx.createGain();

      let node = g;
      if (ctx.createStereoPanner) {
        const panner = ctx.createStereoPanner();
        panner.pan.setValueAtTime(panVal, ctx.currentTime);
        g.connect(panner);
        panner.connect(ctx.destination);
        node = panner;
      } else {
        g.connect(ctx.destination);
      }

      o.connect(g);
      o.type = 'sine';
      o.frequency.setValueAtTime(440, ctx.currentTime);
      o.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15);

      g.gain.setValueAtTime(0.08, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);

      o.start();
      o.stop(ctx.currentTime + 0.15);
    } catch(e){}
  }, [soundEnabled, initAudio]);

  const playHitSound = useCallback(() => {
    if (!soundEnabled) return;
    try {
      const ctx = initAudio(); if (!ctx) return;
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.connect(g); g.connect(ctx.destination);
      o.frequency.setValueAtTime(980, ctx.currentTime);
      g.gain.setValueAtTime(0.06, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
      o.start(); o.stop(ctx.currentTime + 0.1);
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

  // Capture relative pointer lock movements for 360-degree viewport scrolling
  useEffect(() => {
    const h = (e) =>  {
      if (document.pointerLockElement !== canvasRef.current && !document.pointerLockElement) return;
      const dx = (e.movementX || 0) * universalSens;
      viewAngle.current += dx * 1.5;
      if (viewAngle.current < 0) viewAngle.current += VIEWPORT_WIDTH;
      if (viewAngle.current >= VIEWPORT_WIDTH) viewAngle.current -= VIEWPORT_WIDTH;
    };
    document.addEventListener('mousemove', h);
    return () => document.removeEventListener('mousemove', h);
  }, []);

  const spawnTargetCue = useCallback(() => {
    const pAngle = viewAngle.current;
    
    // Spawn target at a random offset relative to player (e.g. between 900 to 2700 pixels off-screen)
    const sign = Math.random() < 0.5 ? -1 : 1;
    const offset = sign * (600 + Math.random() * 1200); // off-screen
    let tAngle = pAngle + offset;
    
    if (tAngle < 0) tAngle += VIEWPORT_WIDTH;
    if (tAngle >= VIEWPORT_WIDTH) tAngle -= VIEWPORT_WIDTH;

    targetAngleRef.current = tAngle;
    targetYRef.current = 150 + Math.random() * 150;
    targetActiveRef.current = true;
    spawnTimeRef.current = performance.now();

    // Map angle difference to panner pan value (-1 to 1)
    let diff = tAngle - pAngle;
    if (diff > VIEWPORT_WIDTH / 2) diff -= VIEWPORT_WIDTH;
    if (diff < -VIEWPORT_WIDTH / 2) diff += VIEWPORT_WIDTH;

    // Pan scale: -1800 to 1800 mapped to -1 to 1
    const panVal = Math.max(-1, Math.min(1, diff / 900));
    playSpatialSound(panVal);
  }, [playSpatialSound]);

  const fireShot = useCallback(() => {
    if (gameStateRef.current !== 'playing' || !isActiveRef.current || !crosshairInitRef.current) return;

    if (targetActiveRef.current) {
      const pAngle = viewAngle.current;
      const tAngle = targetAngleRef.current;
      
      let diff = tAngle - pAngle;
      if (diff > VIEWPORT_WIDTH / 2) diff -= VIEWPORT_WIDTH;
      if (diff < -VIEWPORT_WIDTH / 2) diff += VIEWPORT_WIDTH;

      // Click is within central 40 pixels (around 4 degrees target)
      if (Math.abs(diff) < 30) {
        hitsRef.current++;
        setScore(hitsRef.current);
        playHitSound(); if (typeof checkSensitivityAdjustment === 'function') checkSensitivityAdjustment('hit'); if (typeof checkSensitivityAdjustment === 'function') checkSensitivityAdjustment('hit');

        const duration = performance.now() - spawnTimeRef.current;
        reactionTimesRef.current.push(duration);
        setAvgReaction(Math.round(reactionTimesRef.current.reduce((a,b)=>a+b,0) / reactionTimesRef.current.length));

        showFeedbackText('🎯 LOCALIZED & KILLED!', 'success');
        targetActiveRef.current = false;
        
        // Spawn next audio cue after small delay
        setTimeout(() => {
          if (gameStateRef.current === 'playing' && isActiveRef.current) spawnTargetCue();
        }, 800);
      } else {
        showFeedbackText('❌ Auditory Miss', 'warn');
      }
    }
  }, [spawnTargetCue, playHitSound, showFeedbackText]);

  useEffect(() => {
    const handleMousedown = (e) => {
      if (e.target.tagName === 'BUTTON' || e.target.closest('button')) return;
      if (gameState === 'playing' && document.pointerLockElement) {
        e.preventDefault();
        fireShot();
      }
    };
    document.addEventListener('mousedown', handleMousedown);
    return () => document.removeEventListener('mousedown', handleMousedown);
  }, [gameState, fireShot]);

  const resetGameLobby = useCallback(() => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    isActiveRef.current = false;
    setGameState('start'); gameStateRef.current = 'start';
    setScore(0); setAvgReaction(0);
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
        resetGameLobby();
      }
    };
    document.addEventListener('fullscreenchange', h);
    return () => document.removeEventListener('fullscreenchange', h);
  }, [resetGameLobby]);

  const updateBestScoreValue = useCallback((fs) => {
    try {
      const c = parseInt(localStorage.getItem('soundSpatialReflexBestScore') || '0', 10);
      if (fs > c) {
        localStorage.setItem('soundSpatialReflexBestScore', fs.toString());
        setBestScore(fs);
      }
    } catch(e){}
  }, []);

  const startTimerTick = useCallback(() => {
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
          updateBestScoreValue(hitsRef.current);
    // Record telemetry for AI coaching system
    try {
      recordDrillResult('sound-spatial', {
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

          if (document.pointerLockElement) {
            document.exitPointerLock();
          }
        }
      }
    }, 1000);
  }, [updateBestScoreValue]);

  const startGameSpatial = useCallback(() => {
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
    setScore(0); hitsRef.current = 0;
    setAvgReaction(0); reactionTimesRef.current = [];
    viewAngle.current = 1800; // start center
    timeLeftRef.current = DRILL_DURATION; setTimeLeft(DRILL_DURATION);
    isActiveRef.current = true;
    crosshairInitRef.current = false;

    spawnTargetCue();
    startTimerTick();

    if (canvasRef.current) {
      try {
        canvasRef.current.requestPointerLock();
      } catch (e) {
        console.warn("Pointer lock blocked", e);
      }
    }
    crosshairInitRef.current = true;
  }, [startTimerTick, requestPointerLock, spawnTargetCue]);

  // Canvas drawing loop
  useEffect(() => {
    if (gameState !== 'playing') return;
    const cvs = canvasRef.current; if (!cvs) return;
    const ctx = cvs.getContext('2d');

    const updateLayout = () => {
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
    };

    updateLayout();
    window.addEventListener('resize', updateLayout);

    const loop = () => {
      const { width: cw, height: ch } = canvasSizeRef.current;
      const pAngle = viewAngle.current;

      ctx.fillStyle = '#05070c';
      ctx.fillRect(0, 0, cw, ch);

      // Draw horizontal scrolling panoramas and compass indicators
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 1;
      
      const degreesStep = 100; // degrees lines
      for (let offset = -VIEWPORT_WIDTH / 2; offset <= VIEWPORT_WIDTH / 2; offset += degreesStep) {
        let lineAngle = pAngle + offset;
        if (lineAngle < 0) lineAngle += VIEWPORT_WIDTH;
        if (lineAngle >= VIEWPORT_WIDTH) lineAngle -= VIEWPORT_WIDTH;

        // Render on screen
        const screenX = cw / 2 + offset;
        if (screenX >= 0 && screenX <= cw) {
          ctx.beginPath();
          ctx.moveTo(screenX, 0);
          ctx.lineTo(screenX, ch);
          ctx.stroke();

          // Compass text heading degrees
          ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
          ctx.font = '9px monospace';
          ctx.textAlign = 'center';
          const heading = Math.round(lineAngle / 10);
          ctx.fillText(`${heading}°`, screenX, 30);
        }
      }

      // Draw spatial target if active and within player's FOV
      if (targetActiveRef.current) {
        const tAngle = targetAngleRef.current;
        let diff = tAngle - pAngle;
        if (diff > VIEWPORT_WIDTH / 2) diff -= VIEWPORT_WIDTH;
        if (diff < -VIEWPORT_WIDTH / 2) diff += VIEWPORT_WIDTH;

        const screenX = cw / 2 + diff;
        if (screenX >= 0 && screenX <= cw) {
          ctx.shadowBlur = 20; ctx.shadowColor = '#00f2fe';
          ctx.fillStyle = '#00f2fe';
          ctx.beginPath();
          ctx.arc(screenX, targetYRef.current, 15, 0, Math.PI * 2);
          ctx.fill();

          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(screenX, targetYRef.current, 20, 0, Math.PI * 2);
          ctx.stroke();
          ctx.shadowBlur = 0;
        } else {
          // Draw horizontal arrow directing user to turn
          ctx.fillStyle = '#00f2fe';
          ctx.font = 'bold 16px monospace';
          ctx.textAlign = 'center';
          if (diff > 0) {
            ctx.fillText('TURN RIGHT ➔', cw - 80, ch / 2);
          } else {
            ctx.fillText('🡨 TURN LEFT', 80, ch / 2);
          }
        }
      }

      // Compass center mark
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(cw / 2, 10); ctx.lineTo(cw / 2, 45);
      ctx.stroke();

      // Sniper Scope Crosshair Reticle (Exact Pure 2D design, stationary center)
      {
        const activeColor = pointerLocked ? '#00ff88' : '#ffbb00';
        ctx.strokeStyle = activeColor;
        
        // Outer Scope Ring
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(cw / 2, ch / 2, 20, 0, Math.PI * 2);
        ctx.stroke();

        // Inner Scope Crosshairs
        ctx.beginPath();
        ctx.lineWidth = 1.5;
        const innerGap = 8;
        ctx.moveTo(cw / 2, ch / 2 - 20); ctx.lineTo(cw / 2, ch / 2 - innerGap); // Top
        ctx.moveTo(cw / 2, ch / 2 + 20); ctx.lineTo(cw / 2, ch / 2 + innerGap); // Bottom
        ctx.moveTo(cw / 2 - 20, ch / 2); ctx.lineTo(cw / 2 - innerGap, ch / 2); // Left
        ctx.moveTo(cw / 2 + 20, ch / 2); ctx.lineTo(cw / 2 - innerGap, ch / 2); // Right
        ctx.stroke();
        
        // Center Dot
        ctx.fillStyle = activeColor;
        ctx.beginPath(); ctx.arc(cw / 2, ch / 2, 2, 0, Math.PI * 2); ctx.fill();
      }      animationRef.current = requestAnimationFrame(loop);
    };

    animationRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', updateLayout);
    };
  }, [gameState, pointerLocked]);

    // Display helpers for stats board
  const displayScore = score;
  const displayBest = bestScore;
  const displayTime = typeof timeLeft !== 'undefined' ? `${timeLeft}s` : '60s';
  const displayAccuracy = typeof trackingAccuracy !== 'undefined' ? `${trackingAccuracy}%` : '100%';
  const displayCombo = typeof combo !== 'undefined' ? combo : 0;
  const displayMaxCombo = '-';
  const displayReaction = typeof avgReaction !== 'undefined' && avgReaction > 0 ? `${Math.round(avgReaction)}ms` : '-';
  const displaySens = typeof universalSens !== 'undefined' ? `${universalSens.toFixed(2)}x` : '1.00x';

  return (
    <div ref={pageRef} className="min-h-screen select-none font-mono bg-[#080d1a] text-slate-100 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-950/15 via-[#080d1a] to-[#080d1a] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.02)_1px,_transparent_1px),_linear-gradient(90deg,_rgba(6,182,212,0.02)_1px,_transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />

      <div className={`${isFullscreen ? 'w-full h-screen p-0 m-0' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'} relative z-10`}>
        {!isFullscreen && (
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-2 text-[10px] text-slate-400 uppercase tracking-widest">
              <li><Link href="/" className="hover:text-red-400 transition-colors"><Home className="w-3.5 h-3.5" /></Link></li>
              <li><ChevronRight className="w-3 h-3 text-slate-700" /></li>
              <li><Link href="/drills/fps" className="hover:text-red-400 transition-colors">FPS Sector</Link></li>
              <li><ChevronRight className="w-3 h-3 text-slate-700" /></li>
              <li><span className="text-cyan-400 font-bold">3D Audio-Spatial Reflex</span></li>
            </ol>
          </nav>
        )}

        {!isFullscreen && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 border-b border-slate-900 pb-5">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-cyan-950/30 border border-cyan-500/20 text-cyan-400 rounded-xl">
                <Volume2 className="w-7 h-7 animate-pulse" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white uppercase bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                  3D Audio-Spatial Reflex
                </h1>
                <p className="text-xs text-slate-400 tracking-wider mt-0.5 font-mono">
                  {pointerLocked ? '🟢 MOUSE LOCKED' : '🔴 CLICK CANVAS TO CAPTURE'} • {cmPer360} cm/360 • {gameType.toUpperCase()}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setSoundEnabled(!soundEnabled)} className="p-2 rounded-lg border border-slate-800 bg-[#0c1224] text-slate-350 hover:border-slate-700 transition" title="Sound">{soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}</button>
              <button onClick={startGameSpatial} className="px-4 py-2 rounded-lg border border-slate-800 bg-[#0c1224] hover:bg-slate-900 text-green-400 hover:border-slate-700 font-bold transition text-xs uppercase tracking-wider">Start Game</button>
            </div>
          </div>
        )}

        

        {true && (
          <div className={isFullscreen ? "w-full h-full" : ""}>
            

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
                ? "w-full h-full bg-[#050811] relative overflow-hidden flex items-center justify-center cursor-none" 
                : "w-full aspect-video min-h-[400px] lg:min-h-[500px] bg-[#050811] border border-slate-800 rounded-xl relative overflow-hidden flex items-center justify-center cursor-none"}
            >
              <canvas ref={canvasRef} onClick={handleCanvasClick} />
            {gameState === 'start' && (
          <div className="absolute inset-0 bg-[#080d1a]/95 flex items-center justify-center p-6 z-30 overflow-y-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 bg-[#0c1224]/80 border border-slate-900 rounded-xl p-6 flex flex-col justify-between backdrop-blur-md">
              <div>
                <h3 className="text-xs font-bold text-cyan-400 mb-4 flex items-center gap-2 border-b border-slate-900 pb-2 uppercase tracking-wider">
                  <Info className="w-4 h-4" />
                  AUDIO TARGET LOCATIONS
                </h3>
                <ul className="space-y-4 text-xs leading-relaxed text-slate-400">
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-500 font-bold">1.</span>
                    <span>Put on stereo headphones. High-frequency panned beeps are played in the left or right ear indicating off-screen targets.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-500 font-bold">2.</span>
                    <span>Sweep your mouse horizontally to scroll the 360° viewport in that direction.</span>
                  </li>
                  <li className="flex items-start gap-2 text-cyan-450">
                    <span className="text-cyan-400 font-bold">★</span>
                    <span>Find the glowing blue sphere, align it with the center crosshair and tap instantly!</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="lg:col-span-2 bg-[#0c1224]/80 border border-slate-900 rounded-xl p-6 backdrop-blur-md flex flex-col justify-between">
              <div>
                <h3 className="text-xs font-bold text-white mb-4 flex items-center gap-2 border-b border-slate-900 pb-2 uppercase tracking-wider">
                  <TrendingUp className="w-4 h-4 text-cyan-400" />
                  COGNITIVE CALIBRATION
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
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-4 items-center justify-between border-t border-slate-900 pt-6">
                <div>
                  <span className="text-[10px] text-slate-550 block uppercase">Personal Best Record</span>
                  <span className="text-white font-bold text-lg flex items-center gap-1.5">
                    <Trophy className="w-4 h-4 text-yellow-500" />
                    {bestScore} Kills
                  </span>
                </div>
                <button
                  onClick={startGameSpatial}
                  className="w-full sm:w-auto px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-bold rounded-lg text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 uppercase tracking-wider transition animate-pulse"
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
            <div className="bg-[#0c1224]/80 border border-slate-900 rounded-xl p-8 backdrop-blur-md max-w-3xl mx-auto">
            <h2 className="text-xl font-bold text-cyan-400 text-center mb-6 uppercase tracking-widest flex items-center justify-center gap-2">
              <Award className="w-5 h-5 text-yellow-500" />
              AUDIO SESSION COMPLETED
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="space-y-4">
                <div className="bg-slate-950 p-4 rounded border border-slate-900">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-550 block uppercase">Final Hits Score:</span>
                    <span className="text-white font-bold text-xl">{score} Kills</span>
                  </div>
                </div>

                <div className="bg-slate-950 p-4 rounded border border-slate-900 text-center">
                  <span className="text-[10px] text-slate-550 block uppercase">Avg Reaction Time</span>
                  <span className="text-cyan-400 font-bold text-lg">{avgReaction} ms</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-slate-950 p-4 rounded border border-slate-900">
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-900 pb-2 mb-3">
                    DIAGNOSTICS
                  </h4>
                  <p className="text-xs leading-relaxed text-slate-350">
                     auditory reflexes benchmarked. Target reaction baseline: &lt;450ms.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#080d1a] border border-slate-800 rounded-lg p-5 mb-8 text-left shadow-inner">
              <h3 className="text-xs font-bold text-cyan-400 font-mono uppercase tracking-widest border-b border-slate-800 pb-2 mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-500 animate-pulse" />
                AI COACH DIAGNOSTICS & RECOMMENDATION
              </h3>
              <div className="space-y-2 text-xs leading-relaxed text-slate-350">
                <p>
                  {avgReaction < 400 ? (
                    "🔥 Fast Auditory-Spatial Translation: You are mapping panning balances into mouse speed sweeps efficiently."
                  ) : (
                    "⚠️ Localization Lag: Slower response times detected. Practice moving your mouse immediately when the cue fires before searching visually."
                  )}
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center border-t border-slate-900 pt-6">
              <button onClick={startGame} className="w-full sm:w-auto px-6 py-2.5 bg-cyan-600 hover:bg-cyan-700 text-white font-bold rounded-lg text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition"><RefreshCw className="w-4.5 h-4.5" />Train Again</button>
              <Link href="/drills/fps" className="w-full sm:w-auto"><button className="w-full px-6 py-2.5 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-350 font-bold rounded-lg text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition">Return to Lobby</button></Link>
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

            


              
            </div>
            
            <div className="mt-4 text-center text-[10px] text-slate-550 flex items-center justify-center gap-4">
              <span>🎧 Put on headphones. Turn and click targets as they emit directional sound cues.</span>
              <span>• Press <kbd className="px-1.5 py-0.5 bg-slate-900 border border-slate-800 text-slate-350 rounded font-sans text-[10px]">ESC</kbd> to return to lobby.</span>
            </div>
          </div>
        )}

        
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
                  About 3D Audio-Spatial Reflex
                </h2>
              </div>
              <div className="p-6">
                <p className="text-xs text-slate-400 leading-relaxed mb-6">
                  This 3d audio-spatial reflex drill is designed to refine tactical mechanical reflexes, hand-eye coordination, and spatial mouse accuracy. By using 1:1 hardware raw input via the Pointer Lock API, it bypasses operating system cursor acceleration to build consistent physical muscle memory. With dynamic difficulty and AI-powered performance diagnostics, this tool conditions esports players for high-velocity target acquisition in games like CS2, Valorant, Apex Legends, and Overwatch.
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
                      <h3 className="font-bold text-white uppercase tracking-wider">Why Practice 3D Audio-Spatial Reflex?</h3>
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
