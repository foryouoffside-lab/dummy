'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { COACHES, getActiveCoach, getCoachResponse, speakCoachText, handleCoachFeedback } from '../../../../lib/coachVoice';
import Link from 'next/link';
import { recordDrillResult } from '../../../../lib/performanceTelemetry';
import { getAdaptiveParams } from '../../../../lib/adaptiveDifficulty';

import { 
  Target, Zap, Timer, Trophy, 
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, Eye,
  Info, Activity, Wind,
  Lock, AlertCircle, RefreshCw, Crosshair, Award, Play, ChevronRight, Home, Calculator, Sparkles
} from 'lucide-react';

const DRILL_DURATION = 60; // 60 seconds

export default function KineticTrainerClient() {


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
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [kineticScore, setKineticScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [hits, setHits] = useState(0);
  const [misses, setMisses] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [combo, setCombo] = useState(0);
  const [bestCombo, setBestCombo] = useState(0);
  const [targetSpeed, setTargetSpeed] = useState(0);
  const [timeLeft, setTimeLeft] = useState(DRILL_DURATION);
  const [pointerLocked, setPointerLocked] = useState(false);
          const [currentTargetSize, setCurrentTargetSize] = useState(30);

  const virtualCrosshair = useRef({ x: 0, y: 0 });
  const canvasSizeRef = useRef({ width: 800, height: 450 });
  const crosshairInitRef = useRef(false);
    
  const targetRef = useRef({ x: 0, y: 0, r: 15 });
  const velRef = useRef({ x: 8, y: 6 });
  const teleportTimerRef = useRef(0);
  const lastPositionsRef = useRef([]);
  const scoreRef = useRef(0);
  const comboRef = useRef(0);
  const timerIntervalRef = useRef(null);
  const isActiveRef = useRef(false);
  const gameStateRef = useRef('start');
  const audioCtxRef = useRef(null);
  const timeLeftRef = useRef(DRILL_DURATION);
  const hitsRef = useRef(0);
  const missesRef = useRef(0);
  const bestComboRef = useRef(0);

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
      const s = localStorage.getItem('kineticDrillBestScore');
      if(s) {
        const p = parseInt(s, 10);
        if(!isNaN(p)) setBestScore(p);
      }
            } catch(e){}
  }, []);
  
  useEffect(() => { gameStateRef.current = gameState; }, [gameState]);
  
  // Compute sens
  

  const showFeedbackText = useCallback((text, type) => {
    const id = Math.random().toString(36).substr(2, 9);
    feedbacksRef.current.push({ id, text, type });
    setFeedbacks([...feedbacksRef.current]);
    
    setTimeout(() => {
      feedbacksRef.current = feedbacksRef.current.filter(f => f.id !== id);
      setFeedbacks([...feedbacksRef.current]);
    }, 1200);
  }, []);

  const updateBestScore = useCallback((fs) => { 
    try { 
      const c = parseInt(localStorage.getItem('kineticDrillBestScore') || '0', 10); 
      if(fs > c) { 
        localStorage.setItem('kineticDrillBestScore', fs.toString()); 
        setBestScore(fs); 
      } 
    } catch(e){} 
  }, []);

  const initAudio = useCallback(() => { 
    try { 
      if(!audioCtxRef.current) audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)(); 
      if(audioCtxRef.current.state === 'suspended') audioCtxRef.current.resume(); 
      return audioCtxRef.current; 
    } catch(e){ return null; } 
  }, []);

  const playSound = useCallback((type) => { 
    if(!soundEnabled) return; 
    try { 
      const ctx = initAudio(); if(!ctx) return; 
      const o = ctx.createOscillator(), g = ctx.createGain(); 
      o.connect(g); g.connect(ctx.destination); 
      const now = ctx.currentTime; 
      const f = { success: 920, fail: 440, teleport: 600, combo: 1100 }; 
      o.frequency.setValueAtTime(f[type] || 440, now); 
      g.gain.setValueAtTime(type==='combo'?0.12:type==='fail'?0.1:0.08, now); 
      g.gain.exponentialRampToValueAtTime(0.001, now+0.1); 
      o.start(now); o.stop(now+0.1); 
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
      if(l) {
        crosshairInitRef.current = true;
      } else if(gameStateRef.current === 'playing') {
        showFeedbackText('CURSOR UNLOCKED - Click Canvas to Lock', 'error');
      }
    };
    document.addEventListener('pointerlockchange', h);
    return () => document.removeEventListener('pointerlockchange', h);
  }, [showFeedbackText]);

  useEffect(() => {
    const h = (e) => {
      if(document.pointerLockElement !== canvasRef.current) return;
      const sens = sensitivityMultiplierRef.current;
      virtualCrosshair.current.x += (e.movementX || 0) * sens;
      virtualCrosshair.current.y += (e.movementY || 0) * sens;
      const c = canvasRef.current;
      if(c){
        virtualCrosshair.current.x = Math.max(0, Math.min(c.width, virtualCrosshair.current.x)); 
        virtualCrosshair.current.y = Math.max(0, Math.min(c.height, virtualCrosshair.current.y));
      }
    };
    document.addEventListener('mousemove', h);
    return () => document.removeEventListener('mousemove', h);
  }, []);

  const toggleFullscreen = useCallback(async () => { 
    try { 
      if(!isFullscreen){
        const el = pageRef.current;
        if(el?.requestFullscreen){
          el.requestFullscreen().catch((e) => console.warn("Fullscreen request blocked", e));
          setIsFullscreen(true);
        }
      } else {
        if(document.fullscreenElement) await document.exitFullscreen();
        setIsFullscreen(false);
      } 
    } catch(e){} 
  }, [isFullscreen]);

  const getRandomPosition = useCallback((avoidCurrent=true) => {
    const { width, height } = canvasSizeRef.current; 
    if(width === 0 || height === 0) return { x: width/2, y: height/2 };
    const pad = currentTargetSize + 25; 
    let nx, ny, tooClose = true, att = 0;
    while(tooClose && att < 100){
      nx = pad + Math.random()*(width-pad*2);
      ny = pad + Math.random()*(height-pad*2);
      if(avoidCurrent && Math.hypot(nx-targetRef.current.x, ny-targetRef.current.y) < 120){
        tooClose = true;
      } else {
        tooClose = false;
      }
      if(!tooClose && lastPositionsRef.current.length > 0){
        for(const p of lastPositionsRef.current){
          if(Math.hypot(nx-p.x, ny-p.y) < 100){
            tooClose = true;
            break;
          }
        }
      }
      att++;
    }
    lastPositionsRef.current.push({ x: nx, y: ny });
    if(lastPositionsRef.current.length > 5) lastPositionsRef.current.shift();
    return { x: nx, y: ny };
  }, [currentTargetSize]);

  const teleport = useCallback((isHit=false) => {
    const { width, height } = canvasSizeRef.current; 
    if(width === 0 || height === 0) return;
    const np = getRandomPosition(true); 
    targetRef.current.x = np.x; 
    targetRef.current.y = np.y;
    
    // Scale speed depending on selected gameType
    let baseSpeed = 8;
    if (gameType === 'apex' || gameType === 'overwatch') {
      baseSpeed = 14; // high speed tracking
    } else if (gameType === 'valorant' || gameType === 'cs2') {
      baseSpeed = 7;
    }
    
    const sm = 1 + Math.min(0.8, comboRef.current / 30);
    const bs = baseSpeed + Math.random() * 8;
    velRef.current = {
      x: (Math.random() > 0.5 ? 1 : -1) * (bs * sm),
      y: (Math.random() > 0.5 ? 1 : -1) * (bs * sm)
    };
    
    velRef.current.x = Math.max(-30, Math.min(30, velRef.current.x));
    velRef.current.y = Math.max(-30, Math.min(30, velRef.current.y));
    setTargetSpeed(Math.round(Math.abs(velRef.current.x) + Math.abs(velRef.current.y)));
    if(!isHit) playSound('teleport');
  }, [getRandomPosition, playSound, gameType]);

  const resetGame = useCallback(() => {
    if(timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if(animationRef.current) cancelAnimationFrame(animationRef.current);
    isActiveRef.current = false;
    setGameState('start'); gameStateRef.current = 'start';
    setFeedbackText('', 'info');
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

  const startTimer = useCallback(() => {
    if(timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    timerIntervalRef.current = setInterval(() => {
      if(gameStateRef.current === 'playing' && isActiveRef.current){
        timeLeftRef.current -= 1;
        setTimeLeft(timeLeftRef.current);
        if(timeLeftRef.current <= 0){
          clearInterval(timerIntervalRef.current);
          timerIntervalRef.current = null;
          setGameState('gameOver');
          gameStateRef.current = 'gameOver';
          isActiveRef.current = false;
          updateBestScore(scoreRef.current);
    // Record telemetry for AI coaching system
    try {
      recordDrillResult('kinetic-trainer', {
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

          document.exitPointerLock();
        }
      }
    }, 1000);
  }, [updateBestScore]);

  const handleMiss = useCallback((r) => {
    if(!isActiveRef.current) return;
    missesRef.current++;
    setMisses(missesRef.current);
    comboRef.current = 0;
    setCombo(0);
    playSound('fail'); if (typeof checkSensitivityAdjustment === 'function') checkSensitivityAdjustment('miss', { dist: typeof dist !== 'undefined' ? dist : 50, targetSize: typeof targetRadius !== 'undefined' ? targetRadius : (typeof TARGET_SIZE !== 'undefined' ? TARGET_SIZE : (typeof TARGET_RADIUS !== 'undefined' ? TARGET_RADIUS : 15)) }); if (typeof checkSensitivityAdjustment === 'function') checkSensitivityAdjustment('miss', { dist: typeof dist !== 'undefined' ? dist : 50, targetSize: typeof targetRadius !== 'undefined' ? targetRadius : (typeof TARGET_SIZE !== 'undefined' ? TARGET_SIZE : (typeof TARGET_RADIUS !== 'undefined' ? TARGET_RADIUS : 15)) });
    showFeedbackText(`✗ ${r}!`, 'error');
    const t = hitsRef.current + missesRef.current;
    setAccuracy(t === 0 ? 100 : Math.round((hitsRef.current / t) * 100));
  }, [playSound, showFeedbackText]);

  const handleShot = useCallback(() => {
    if(gameStateRef.current !== 'playing' || !isActiveRef.current || !crosshairInitRef.current) return;
    const ch = virtualCrosshair.current, t = targetRef.current;
    
    if(Math.hypot(ch.x - t.x, ch.y - t.y) < t.r + 10){
      scoreRef.current += 1;
      setKineticScore(scoreRef.current);
      hitsRef.current++;
      setHits(hitsRef.current);
      comboRef.current++;
      setCombo(comboRef.current);
      if(comboRef.current > bestComboRef.current){
        bestComboRef.current = comboRef.current;
        setBestCombo(comboRef.current);
      }
      playSound('success'); if (typeof checkSensitivityAdjustment === 'function') checkSensitivityAdjustment('hit'); if (typeof checkSensitivityAdjustment === 'function') checkSensitivityAdjustment('hit');
      showFeedbackText('✓ HIT', 'success');
      if(comboRef.current % 5 === 0){
        playSound('combo');
        showFeedbackText(`🔥 COMBO STREAK x${comboRef.current}!`, 'success');
      }
      teleport(true);
      const total = hitsRef.current + missesRef.current;
      setAccuracy(total === 0 ? 100 : Math.round((hitsRef.current / total) * 100));
    } else {
      handleMiss('Miss');
    }
  }, [teleport, handleMiss, playSound, showFeedbackText]);

  useEffect(() => {
    const h = (e) => {
      if(e.target.tagName === 'BUTTON' || e.target.closest('button')) return;
      if(gameState === 'playing' && document.pointerLockElement) {
        e.preventDefault();
        handleShot();
      }
    };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, [gameState, handleShot]);

  useEffect(() => {
    if(gameState !== 'playing') return;
    const cvs = canvasRef.current; if(!cvs) return;
    const ctx = cvs.getContext('2d');
    
    const update = () => {
      const cr = containerRef.current; if(!cr) return;
      const rr = cr.getBoundingClientRect();
      let w = rr.width, h = w * (9/16);
      if(h > rr.height){ h = rr.height; w = h * (16/9); }
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
      
      const cp = getRandomPosition(false);
      targetRef.current.x = cp.x;
      targetRef.current.y = cp.y;
      targetRef.current.r = currentTargetSize / 2;
      velRef.current = { x: 8, y: 6 };
      setTargetSpeed(14);
    };
    
    update();
    teleportTimerRef.current = 0;
    window.addEventListener('resize', update);
    let lt = performance.now();
    
    const loop = (now) => {
      const dt = Math.min(0.033, (now - lt) / 1000);
      lt = now;
      const { width: cw, height: ch } = canvasSizeRef.current;
      
      if(isActiveRef.current && cw > 0 && ch > 0){
        const t = targetRef.current;
        t.x += velRef.current.x * dt * 60;
        t.y += velRef.current.y * dt * 60;
        const r = t.r;
        
        if(t.x - r < 0){
          t.x = r; velRef.current.x = Math.abs(velRef.current.x);
        } else if(t.x + r > cw){
          t.x = cw - r; velRef.current.x = -Math.abs(velRef.current.x);
        }
        
        if(t.y - r < 0){
          t.y = r; velRef.current.y = Math.abs(velRef.current.y);
        } else if(t.y + r > ch){
          t.y = ch - r; velRef.current.y = -Math.abs(velRef.current.y);
        }
        
        teleportTimerRef.current += dt;
        // progressive teleports
        const tpCap = gameType === 'valorant' || gameType === 'cs2' ? 0.9 : 1.6;
        if(teleportTimerRef.current > Math.max(0.6, tpCap - comboRef.current * 0.025)){
          teleportTimerRef.current = 0;
          if(Math.random() < 0.6) teleport(false);
        }
      }
      
      ctx.fillStyle = '#050508';
      ctx.fillRect(0, 0, cw, ch);
      
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.02)';
      ctx.lineWidth = 1;
      for(let i = 0; i < cw; i += 40){
        ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, ch); ctx.stroke();
      }
      
      // Target Draw
      const tg = targetRef.current, cr = tg.r;
      ctx.shadowBlur = 15; ctx.shadowColor = '#00ff88';
      ctx.fillStyle = '#00ff88';
      ctx.beginPath(); ctx.arc(tg.x, tg.y, cr, 0, Math.PI * 2); ctx.fill();
      ctx.shadowBlur = 0;
      
      ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(tg.x, tg.y, cr * 0.5, 0, Math.PI * 2); ctx.stroke();
      
      // Sniper Scope Crosshair Reticle (Exact Pure 2D design)
      const vch = virtualCrosshair.current;
      if (vch && canvasRef.current && vch.x > 0 && vch.x < canvasRef.current.width && vch.y > 0 && vch.y < canvasRef.current.height) {
        const activeColor = pointerLocked ? '#00ff88' : '#ffbb00';
        ctx.strokeStyle = activeColor;
        
        // Outer Scope Ring
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(vch.x, vch.y, 20, 0, Math.PI * 2);
        ctx.stroke();

        // Inner Scope Crosshairs
        ctx.beginPath();
        ctx.lineWidth = 1.5;
        const innerGap = 8;
        ctx.moveTo(vch.x, vch.y - 20); ctx.lineTo(vch.x, vch.y - innerGap); // Top
        ctx.moveTo(vch.x, vch.y + 20); ctx.lineTo(vch.x, vch.y + innerGap); // Bottom
        ctx.moveTo(vch.x - 20, vch.y); ctx.lineTo(vch.x - innerGap, vch.y); // Left
        ctx.moveTo(vch.x + 20, vch.y); ctx.lineTo(vch.x - innerGap, vch.y); // Right
        ctx.stroke();
        
        // Center Dot
        ctx.fillStyle = activeColor;
        ctx.beginPath(); ctx.arc(vch.x, vch.y, 2, 0, Math.PI * 2); ctx.fill();

        // Target connection line
        ctx.beginPath(); ctx.moveTo(vch.x, vch.y); ctx.lineTo(tg.x, tg.y);
        ctx.strokeStyle = 'rgba(0, 255, 136, 0.1)'; ctx.lineWidth = 1; ctx.stroke();
      }
      
      

      animationRef.current = requestAnimationFrame(loop);
    };
    animationRef.current = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', update);
    };
  }, [gameState, pointerLocked, teleport, getRandomPosition, currentTargetSize, gameType]);

  const startGame = useCallback(() => {
    // Get adaptive difficulty parameters
    const adaptive = getAdaptiveParams('kinetic-trainer');

    if(timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    
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
    setKineticScore(0); setHits(0); setMisses(0); setAccuracy(100); setCombo(0); setBestCombo(0);
    timeLeftRef.current = DRILL_DURATION; setTimeLeft(DRILL_DURATION);
    isActiveRef.current = true; scoreRef.current = 0; comboRef.current = 0; bestComboRef.current = 0;
    hitsRef.current = 0; missesRef.current = 0; lastPositionsRef.current = [];
    
    targetRef.current.r = currentTargetSize / 2;
    velRef.current = { x: 8, y: 6 };
    setTargetSpeed(14);
    teleportTimerRef.current = 0;
    crosshairInitRef.current = false;
    
    startTimer();
    
    if (canvasRef.current) {
      try {
        canvasRef.current.requestPointerLock();
      } catch (e) {
        console.warn("Pointer lock blocked", e);
      }
    }
    crosshairInitRef.current = true;
  }, [startTimer, requestPointerLock, currentTargetSize]);

  return (
    <div ref={pageRef} className="min-h-screen select-none font-mono bg-[#080d1a] text-slate-100 relative overflow-hidden">
      
      {/* Visual cyber patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-950/20 via-[#080d1a] to-[#080d1a] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,136,0.03)_1px,_transparent_1px),_linear-gradient(90deg,_rgba(0,255,136,0.03)_1px,_transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />
      
      <div className={`${isFullscreen ? 'w-full h-screen p-0 m-0' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'} relative z-10`}>
        
        {!isFullscreen && (
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-2 text-[10px] text-slate-400 uppercase tracking-widest">
              <li><Link href="/" className="hover:text-red-400 transition-colors"><Home className="w-3.5 h-3.5" /></Link></li>
              <li><ChevronRight className="w-3 h-3 text-slate-700" /></li>
              <li><Link href="/drills/fps" className="hover:text-red-400 transition-colors">FPS Sector</Link></li>
              <li><ChevronRight className="w-3 h-3 text-slate-700" /></li>
              <li><span className="text-red-400 font-bold">High-Speed Kinetic Trainer</span></li>
            </ol>
          </nav>
        )}

        {!isFullscreen && (
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6 border-b border-slate-900 pb-5">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-950/30 border border-blue-500/20 text-blue-400 rounded-xl">
                <Wind className="w-7 h-7 animate-pulse" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white uppercase bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                  High-Speed Kinetic Trainer
                </h1>
                <p className="text-xs text-slate-400 tracking-wider mt-0.5">
                  {pointerLocked ? '🟢 RAW INPUT CAPTURING' : '🔴 CLICK CANVAS TO CAPTURE'} • {cmPer360} cm/360 • BOUNCING TELEPORTS
                </p>
              </div>
            </div>
            
            <div className="flex gap-2">
              <button onClick={() => setSoundEnabled(!soundEnabled)} className="p-2 rounded-lg border border-slate-800 bg-[#0c1224] text-slate-350 hover:border-slate-700 transition" title="Sound">{soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}</button>
              <button onClick={toggleFullscreen} className="p-2 rounded-lg border border-slate-800 bg-[#0c1224] text-slate-350 hover:border-slate-700 transition" title="Fullscreen">{isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}</button>
            </div>
          </div>
        )}

        {/* Start Game Screen */}
        {gameState === 'start' && (
          <div className="absolute inset-0 bg-[#080d1a]/95 flex items-center justify-center p-6 z-30 overflow-y-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            <div className="lg:col-span-1 bg-[#0c1224]/80 border border-slate-900 rounded-xl p-6 flex flex-col justify-between backdrop-blur-md">
              <div>
                <h3 className="text-sm font-bold text-blue-400 mb-4 flex items-center gap-2 border-b border-slate-900 pb-2">
                  <Info className="w-4 h-4" />
                  KINETIC DRILL RULES
                </h3>
                <ul className="space-y-4 text-xs leading-relaxed text-slate-400">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 font-bold">1.</span>
                    <span>Click bouncing targets. Targets teleport at random times to reset your orientation.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 font-bold">2.</span>
                    <span>No score penalties for misses. Focus purely on re-aligning your crosshair on the moving orb.</span>
                  </li>
                  <li className="flex items-start gap-2 text-blue-300">
                    <span className="text-green-400 font-bold">★</span>
                    <span>**High-speed calibration**: Target velocities scale up dynamically with your combo length!</span>
                  </li>
                </ul>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-900 text-[10px] text-slate-550 leading-normal">
                Builds muscle memory for tracking fast-moving targets (e.g. Apex slide jumps or OW dashes).
              </div>
            </div>

            <div className="lg:col-span-2 bg-[#0c1224]/80 border border-slate-900 rounded-xl p-6 backdrop-blur-md flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2 border-b border-slate-900 pb-2">
                  <Calculator className="w-4 h-4 text-blue-400" />
                  CALIBRATE AIM ENGINE
                </h3>
                
                <div className="space-y-4 mb-6">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Universal Sensitivity</label>
                  <span className="text-green-400 font-mono text-xs font-bold">{universalSens.toFixed(2)}x</span>
                </div>
                <input type="range" min="0.1" max="3.0" step="0.05" value={universalSens} onChange={(e) => setUniversalSens(parseFloat(e.target.value))} className="w-full h-1 bg-slate-800 rounded-lg accent-green-500 cursor-pointer" />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Target Size</label>
                  <span className="text-green-400 font-mono text-xs font-bold">{currentTargetSize}px</span>
                </div>
                <input type="range" min="10" max="50" step="2" value={currentTargetSize} onChange={(e) => setCurrentTargetSize(parseInt(e.target.value))} className="w-full h-1 bg-slate-800 rounded-lg accent-green-500 cursor-pointer" />
              </div>
            </div>

                <div className="p-4 bg-slate-950/80 rounded border border-slate-900 flex justify-between items-center text-xs">
                  <div>
                    <span className="text-[10px] text-slate-550 block uppercase">360° Translation</span>
                    <span className="text-white font-bold text-sm">{cmPer360} cm / 360°</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-550 block uppercase">Target Setup</span>
                    <span className="text-blue-400 font-bold">{currentTargetSize} px Radius</span>
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

        {/* Playing Screen */}
        <div className={isFullscreen ? "w-full h-full" : "block"}>
          {/* Bold Telemetry HUD */}
          

          <div 
            ref={containerRef} 
            className={isFullscreen 
              ? "w-full h-full bg-[#050811] relative overflow-hidden flex items-center justify-center cursor-none" 
              : "w-full aspect-video min-h-[400px] lg:min-h-[500px] bg-[#050811] border border-slate-800 rounded-xl relative overflow-hidden flex items-center justify-center cursor-none"}
          >
            <canvas ref={canvasRef} onClick={handleCanvasClick} />

            {/* S+ Pro Coach Dynamic Audio Guidance HUD & Alerts (Visual Text Hidden) */}


            {/* S+ Pro Coach Dynamic Audio Guidance HUD & Alerts (Visual Text Hidden) */}

            


            

            {/* Feed Overlay */}
            <div className="absolute inset-0 pointer-events-none flex flex-col justify-center items-center gap-2 overflow-hidden select-none z-10">
              {feedbacks.map((f) => (
                <div 
                  key={f.id} 
                  className={`px-5 py-2.5 rounded border text-sm font-extrabold animate-bounce shadow-lg uppercase tracking-wider backdrop-blur-sm ${
                    f.type === 'success' 
                      ? 'bg-blue-950/90 border-blue-500/30 text-blue-400' 
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
            <span>🖱 Click bouncing targets.</span>
            <span>• Press <kbd className="px-1.5 py-0.5 bg-slate-900 border border-slate-800 text-slate-350 rounded font-sans text-[10px]">ESC</kbd> to return to sector lobby.</span>
          </div>
        </div>

        {/* Game Over Screen */}
        {gameState === 'gameOver' && (
          <div className="absolute inset-0 bg-[#080d1a]/95 flex items-center justify-center p-6 z-30 overflow-y-auto">
            <div className="bg-[#0c1224]/80 border border-slate-900 rounded-xl p-8 backdrop-blur-md max-w-3xl mx-auto">
            <h2 className="text-xl font-bold text-blue-400 text-center mb-6 uppercase tracking-widest flex items-center justify-center gap-2">
              <Award className="w-5 h-5 text-yellow-500" />
              KINETIC SESSION COMPLETED
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="space-y-4">
                <div className="bg-slate-950 p-4 rounded border border-slate-900">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-550 block uppercase">Final Hits Score:</span>
                    <span className="text-white font-bold text-xl">{kineticScore} PTS</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-950 p-3 rounded border border-slate-900 text-center">
                    <span className="text-[10px] text-slate-550 block uppercase">Max Combo Streak</span>
                    <span className="text-white font-bold text-sm">{bestCombo} Hits</span>
                  </div>
                  <div className="bg-slate-950 p-3 rounded border border-slate-900 text-center">
                    <span className="text-[10px] text-slate-550 block uppercase">Tracking Accuracy</span>
                    <span className="text-white font-bold text-sm">{accuracy}%</span>
                  </div>
                </div>

                <div className="bg-slate-950 p-4 rounded border border-slate-900">
                  <div className="flex justify-between items-center text-xs mb-1">
                    <span className="text-slate-550 uppercase">Max Speed Scaled</span>
                    <span className="text-cyan-400 font-bold">{targetSpeed} px/s</span>
                  </div>
                  <div className="text-[10px] text-slate-550 leading-normal">
                    Target speeds accelerate as your streak climbs, testing mechanical tracking thresholds.
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-slate-950 p-4 rounded border border-slate-900">
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-900 pb-2 mb-3">
                    KINETIC PERFORMANCE BREAKDOWN
                  </h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-550">Successful Hits:</span>
                      <span className="text-green-400 font-bold">{hits}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-550">Missed Clicks:</span>
                      <span className="text-red-400 font-bold">{misses}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Coach Performance Diagnosis */}
            <div className="bg-[#080d1a] border border-slate-800 rounded-lg p-5 mb-8 text-left shadow-inner">
              <h3 className="text-xs font-bold text-blue-400 font-mono uppercase tracking-widest border-b border-slate-800 pb-2 mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-500 animate-pulse" />
                AI COACH DIAGNOSTIC REPORT
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs leading-relaxed text-slate-350">
                <div className="space-y-2 border-r border-slate-900 pr-6">
                  <p className="font-bold text-white uppercase text-[10px] tracking-wider font-mono">Sensory Summary:</p>
                  <ul className="space-y-2 list-disc pl-4">
                    {accuracy >= 75 ? (
                      <li className="text-green-400">🔥 Kinetic Precision: Symmetrical vector tracking. High click coordination on fast-moving points.</li>
                    ) : (
                      <li className="text-yellow-400">⚠️ Sweeping Desync: High miss rates on fast acceleration shifts. Smooth out cursor transitions.</li>
                    )}
                  </ul>
                </div>
                <div className="space-y-3 flex flex-col justify-between">
                  <div>
                    <p className="font-bold text-white uppercase text-[10px] tracking-wider font-mono mb-1">Prescribed Esports Routine:</p>
                    <p className="text-slate-350 leading-relaxed font-sans">
                      {accuracy < 75 ? (
                        "Focus on matching the target vector speed before clicking. Avoid rushing your shots on teleports."
                      ) : (
                        "Superb kinetic reflexes. Upgrade the calibration settings to Apex Legends mode to maximize target velocity swings."
                      )}
                    </p>
                  </div>
                  <div className="pt-1">
                    <span className="inline-block bg-blue-950/40 text-blue-400 px-3 py-1.5 rounded text-[10px] font-mono font-bold uppercase border border-blue-500/20 shadow-md">
                      KINETIC INDEX: {Math.round(scoreRef.current * (accuracy / 100) * 10)} INDEX PTS
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center border-t border-slate-900 pt-6">
              <button
                onClick={startGame}
                className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition"
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