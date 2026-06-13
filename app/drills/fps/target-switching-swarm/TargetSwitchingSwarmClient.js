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
const SWARM_COUNT = 3; // 3 targets on screen at a time

export default function TargetSwitchingSwarmClient() {


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
  const [accuracy, setAccuracy] = useState(100);
  const [combo, setCombo] = useState(0);
  const [bestCombo, setBestCombo] = useState(0);
  const [timeLeft, setTimeLeft] = useState(DRILL_DURATION);
  const [pointerLocked, setPointerLocked] = useState(false);
          const [currentTargetSize, setCurrentTargetSize] = useState(30);

  // High performance references
  const virtualCrosshair = useRef({ x: 0, y: 0 });
  const canvasSizeRef = useRef({ width: 800, height: 450 });
  const crosshairInitRef = useRef(false);
  
  // Target coordinates array
  const targetsRef = useRef([]);
  const scoreRef = useRef(0);
  const comboRef = useRef(0);
  const bestComboRef = useRef(0);
  const hitsRef = useRef(0);
  const missesRef = useRef(0);
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
      const s = localStorage.getItem('targetSwitchingSwarmBestScore');
      if (s) {
        const p = parseInt(s, 10);
        if (!isNaN(p)) setBestScore(p);
      }
            } catch(e){}
  }, []);

  useEffect(() => { gameStateRef.current = gameState; }, [gameState]);

  // Compute sensitivity & target radii
  

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
        hit: { f1: 880, f2: 1100, type: 'sine', dur: 0.08, vol: 0.05 },
        miss: { f1: 220, f2: 180, type: 'triangle', dur: 0.15, vol: 0.1 }
      };
      const p = profiles[type] || profiles.hit;
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

  const getRandomTarget = useCallback(() => {
    const { width: cw, height: ch } = canvasSizeRef.current;
    if (cw <= 0 || ch <= 0) return { x: 400, y: 220, r: currentTargetSize };
    
    // Spawns with a safety margin from borders
    return {
      x: 60 + Math.random() * (cw - 120),
      y: 60 + Math.random() * (ch - 120),
      r: currentTargetSize
    };
  }, [currentTargetSize]);

  const populateSwarm = useCallback(() => {
    const arr = [];
    for (let i = 0; i < SWARM_COUNT; i++) {
      arr.push(getRandomTarget());
    }
    targetsRef.current = arr;
  }, [getRandomTarget]);

  const fireShot = useCallback(() => {
    if (gameStateRef.current !== 'playing' || !isActiveRef.current || !crosshairInitRef.current) return;

    const ch = virtualCrosshair.current;
    let hitIndex = -1;

    for (let i = 0; i < targetsRef.current.length; i++) {
      const tg = targetsRef.current[i];
      const dist = Math.hypot(ch.x - tg.x, ch.y - tg.y);
      if (dist < tg.r + 8) {
        hitIndex = i;
        break;
      }
    }

    if (hitIndex !== -1) {
      hitsRef.current++;
      scoreRef.current++;
      setScore(scoreRef.current);
      comboRef.current++;
      setCombo(comboRef.current);
      if (comboRef.current > bestComboRef.current) {
        bestComboRef.current = comboRef.current;
        setBestCombo(comboRef.current);
      }
      playSound('hit');
      showFeedbackText('✓ HIT', 'success');

      // Replace hit target
      targetsRef.current[hitIndex] = getRandomTarget();
    } else {
      missesRef.current++;
      comboRef.current = 0;
      setCombo(0);
      playSound('miss');
      showFeedbackText('❌ Miss', 'error');
    }

    const total = hitsRef.current + missesRef.current;
    setAccuracy(total === 0 ? 100 : Math.round((hitsRef.current / total) * 100));
  }, [getRandomTarget, playSound, showFeedbackText]);

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
    setScore(0); setCombo(0); setBestCombo(0); setAccuracy(100);
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
      const c = parseInt(localStorage.getItem('targetSwitchingSwarmBestScore') || '0', 10);
      if (fs > c) {
        localStorage.setItem('targetSwitchingSwarmBestScore', fs.toString());
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
          updateBestScoreValue(scoreRef.current);
    // Record telemetry for AI coaching system
    try {
      recordDrillResult('target-switching-swarm', {
        score: scoreRef.current,
        accuracy: accuracy,
        reactionTimeMs: null,
        trackingAccuracy: null,
        comboMax: bestCombo,
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

  const startGameSwarm = useCallback(() => {
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
    setCombo(0); comboRef.current = 0; setBestCombo(0);
    setAccuracy(100); hitsRef.current = 0; missesRef.current = 0;
    timeLeftRef.current = DRILL_DURATION; setTimeLeft(DRILL_DURATION);
    isActiveRef.current = true;
    crosshairInitRef.current = false;

    // Populates static swarm targets
    populateSwarm();
    startTimerTick();

    if (canvasRef.current) {
      try {
        canvasRef.current.requestPointerLock();
      } catch (e) {
        console.warn("Pointer lock blocked", e);
      }
    }
    crosshairInitRef.current = true;
  }, [startTimerTick, requestPointerLock, populateSwarm]);

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
      const chRef = virtualCrosshair.current;

      ctx.fillStyle = '#05070c';
      ctx.fillRect(0, 0, cw, ch);

      // Grid background lines
      ctx.strokeStyle = 'rgba(239, 68, 68, 0.015)';
      ctx.lineWidth = 1;
      for (let i = 0; i < cw; i += 45) {
        ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, ch); ctx.stroke();
      }

      // Draw active swarm targets
      targetsRef.current.forEach((tg) => {
        ctx.shadowBlur = 12; ctx.shadowColor = '#ef4444';
        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        ctx.arc(tg.x, tg.y, tg.r, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(tg.x, tg.y, tg.r * 0.5, 0, Math.PI * 2);
        ctx.stroke();
        ctx.shadowBlur = 0;
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
      window.removeEventListener('resize', updateLayout);
    };
  }, [gameState, pointerLocked]);

  return (
    <div ref={pageRef} className="min-h-screen select-none font-mono bg-[#080d1a] text-slate-100 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-950/15 via-[#080d1a] to-[#080d1a] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(239,68,68,0.02)_1px,_transparent_1px),_linear-gradient(90deg,_rgba(239,68,68,0.02)_1px,_transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />

      <div className={`${isFullscreen ? 'w-full h-screen p-0 m-0' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'} relative z-10`}>
        {!isFullscreen && (
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-2 text-[10px] text-slate-400 uppercase tracking-widest">
              <li><Link href="/" className="hover:text-red-400 transition-colors"><Home className="w-3.5 h-3.5" /></Link></li>
              <li><ChevronRight className="w-3 h-3 text-slate-700" /></li>
              <li><Link href="/drills/fps" className="hover:text-red-400 transition-colors">FPS Sector</Link></li>
              <li><ChevronRight className="w-3 h-3 text-slate-700" /></li>
              <li><span className="text-red-400 font-bold">Target Switching Swarm</span></li>
            </ol>
          </nav>
        )}

        {!isFullscreen && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 border-b border-slate-900 pb-5">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-red-950/30 border border-red-500/20 text-red-400 rounded-xl">
                <Crosshair className="w-7 h-7 animate-pulse" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white uppercase bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                  Target Switching Swarm
                </h1>
                <p className="text-xs text-slate-400 tracking-wider mt-0.5 font-mono">
                  {pointerLocked ? '🟢 MOUSE LOCKED' : '🔴 CLICK CANVAS TO CAPTURE'} • {cmPer360} cm/360 • {gameType.toUpperCase()}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setSoundEnabled(!soundEnabled)} className="p-2 rounded-lg border border-slate-800 bg-[#0c1224] text-slate-350 hover:border-slate-700 transition" title="Sound">{soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}</button>
              <button onClick={startGameSwarm} className="px-4 py-2 rounded-lg border border-slate-800 bg-[#0c1224] hover:bg-slate-900 text-green-400 hover:border-slate-700 font-bold transition text-xs uppercase tracking-wider">Start Game</button>
            </div>
          </div>
        )}

        {gameState === 'start' && (
          <div className="absolute inset-0 bg-[#080d1a]/95 flex items-center justify-center p-6 z-30 overflow-y-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 bg-[#0c1224]/80 border border-slate-900 rounded-xl p-6 flex flex-col justify-between backdrop-blur-md">
              <div>
                <h3 className="text-xs font-bold text-red-400 mb-4 flex items-center gap-2 border-b border-slate-900 pb-2 uppercase tracking-wider">
                  <Info className="w-4 h-4" />
                  SWARM FLICK MECHANICS
                </h3>
                <ul className="space-y-4 text-xs leading-relaxed text-slate-400">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold">1.</span>
                    <span>Three targets spawn simultaneously. Clicking one target instantly replaces it with a new one at a random position.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold">2.</span>
                    <span>Practice immediate flick transitions. Flick to target 1, click, and instantly redirect your crosshair path to target 2.</span>
                  </li>
                  <li className="flex items-start gap-2 text-red-300">
                    <span className="text-red-400 font-bold">★</span>
                    <span>Trains fast target switching, muscle acceleration control, and short-term path prediction.</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="lg:col-span-2 bg-[#0c1224]/80 border border-slate-900 rounded-xl p-6 backdrop-blur-md flex flex-col justify-between">
              <div>
                <h3 className="text-xs font-bold text-white mb-4 flex items-center gap-2 border-b border-slate-900 pb-2 uppercase tracking-wider">
                  <TrendingUp className="w-4 h-4 text-red-400" />
                  GRIDSHOT SWITCH CALIBRATION
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
                    {bestScore} Points
                  </span>
                </div>
                <button
                  onClick={startGameSwarm}
                  className="w-full sm:w-auto px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg text-sm flex items-center justify-center gap-2 shadow-lg shadow-red-500/25 uppercase tracking-wider transition animate-pulse"
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
              <span>🖱 Click red target groups as fast as they appear. Avoid clicking empty spaces.</span>
              <span>• Press <kbd className="px-1.5 py-0.5 bg-slate-900 border border-slate-800 text-slate-350 rounded font-sans text-[10px]">ESC</kbd> to return to lobby.</span>
            </div>
          </div>
        )}

        {gameState === 'gameOver' && (
          <div className="absolute inset-0 bg-[#080d1a]/95 flex items-center justify-center p-6 z-30 overflow-y-auto">
            <div className="bg-[#0c1224]/80 border border-slate-900 rounded-xl p-8 backdrop-blur-md max-w-3xl mx-auto">
            <h2 className="text-xl font-bold text-red-400 text-center mb-6 uppercase tracking-widest flex items-center justify-center gap-2">
              <Award className="w-5 h-5 text-yellow-500" />
              SWARM SESSION COMPLETED
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="space-y-4">
                <div className="bg-slate-950 p-4 rounded border border-slate-900">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-550 block uppercase">Final Hits Score:</span>
                    <span className="text-white font-bold text-xl">{score} PTS</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-950 p-3 rounded border border-slate-900 text-center">
                    <span className="text-[10px] text-slate-550 block uppercase">Max Combo</span>
                    <span className="text-white font-bold text-sm">{bestCombo} hits</span>
                  </div>
                  <div className="bg-slate-950 p-3 rounded border border-slate-900 text-center">
                    <span className="text-[10px] text-slate-550 block uppercase">Accuracy %</span>
                    <span className="text-white font-bold text-sm">{accuracy}%</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-slate-950 p-4 rounded border border-slate-900">
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-900 pb-2 mb-3">
                    DIAGNOSTICS ANALYTICS
                  </h4>
                  <div className="text-xs leading-relaxed text-slate-350">
                    <p>Kills Per Second (KPS): <span className="text-white font-bold">{(score / DRILL_DURATION).toFixed(2)}</span></p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#080d1a] border border-slate-800 rounded-lg p-5 mb-8 text-left shadow-inner">
              <h3 className="text-xs font-bold text-red-400 font-mono uppercase tracking-widest border-b border-slate-800 pb-2 mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-red-500 animate-pulse" />
                AI COACH DIAGNOSTICS & RECOMMENDATION
              </h3>
              <div className="space-y-2 text-xs leading-relaxed text-slate-350">
                <p>
                  {accuracy >= 85 ? (
                    "🔥 Symmetrical Switching snaps: Your mouse speed-clicking accuracy is top-tier. Focus on maximizing target-to-target transitions velocity."
                  ) : (
                    "⚠️ Under-Deceleration Errors: You are rushing mouse sweeps and clicking before the crosshair stops on target. Slow down sweeps until accuracy &gt;90%."
                  )}
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center border-t border-slate-900 pt-6">
              <button onClick={startGame} className="w-full sm:w-auto px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition"><RefreshCw className="w-4.5 h-4.5" />Train Again</button>
              <Link href="/drills/fps" className="w-full sm:w-auto"><button className="w-full px-6 py-2.5 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-350 font-bold rounded-lg text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition">Return to Lobby</button></Link>
            </div>
          </div>
          </div>
        )}
      </div>
    </div>
  );
}
