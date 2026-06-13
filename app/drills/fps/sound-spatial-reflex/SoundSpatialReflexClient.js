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
const VIEWPORT_WIDTH = 3600; // 360 degrees mapped to 3600 pixels

export default function SoundSpatialReflexClient() {


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

        {true && (
          <div className={isFullscreen ? "w-full h-full" : ""}>
            

            <div 
              ref={containerRef} 
              className={isFullscreen 
                ? "w-full h-full bg-[#050811] relative overflow-hidden flex items-center justify-center cursor-none" 
                : "w-full aspect-video min-h-[400px] lg:min-h-[500px] bg-[#050811] border border-slate-800 rounded-xl relative overflow-hidden flex items-center justify-center cursor-none"}
            >
              <canvas ref={canvasRef} onClick={handleCanvasClick} />

            {/* S+ Pro Coach Dynamic Audio Guidance HUD & Alerts (Visual Text Hidden) */}


            {/* S+ Pro Coach Dynamic Audio Guidance HUD & Alerts (Visual Text Hidden) */}

            


              
            </div>
            
            <div className="mt-4 text-center text-[10px] text-slate-550 flex items-center justify-center gap-4">
              <span>🎧 Put on headphones. Turn and click targets as they emit directional sound cues.</span>
              <span>• Press <kbd className="px-1.5 py-0.5 bg-slate-900 border border-slate-800 text-slate-350 rounded font-sans text-[10px]">ESC</kbd> to return to lobby.</span>
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
      </div>
    </div>
  );
}
