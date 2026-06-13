'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { COACHES, getActiveCoach, getCoachResponse, speakCoachText, handleCoachFeedback } from '../../../../lib/coachVoice';
import Link from 'next/link';
import { recordDrillResult } from '../../../../lib/performanceTelemetry';
import { getAdaptiveParams } from '../../../../lib/adaptiveDifficulty';

import { 
  Target, Zap, Timer, Trophy, Heart, 
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, Eye,
  Info, Activity, Check, Crosshair, Home, ChevronRight, Play,
  Lock, AlertCircle, RefreshCw, BarChart3, TrendingUp, Lightbulb, Clock, CheckCircle2, GraduationCap
} from 'lucide-react';

const DRILL_DURATION = 60; // 60 seconds

export default function InstantResponseClient() {


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
  const [successfulHits, setSuccessfulHits] = useState(0);
  const [missedHits, setMissedHits] = useState(0);
  const [combo, setCombo] = useState(0);
  const [bestCombo, setBestCombo] = useState(0);
  const [timeLeft, setTimeLeft] = useState(DRILL_DURATION);
  const [bestReaction, setBestReaction] = useState(0);
  const [avgReaction, setAvgReaction] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [responseWindow, setResponseWindow] = useState(250);
  const [lives, setLives] = useState(3);
  const [pointerLocked, setPointerLocked] = useState(false);
        
  // High-performance mutable refs (Esports Grade)
  const virtualCrosshair = useRef({ x: 0, y: 0, expand: 0 });
  const canvasSizeRef = useRef({ width: 800, height: 450 });
  const crosshairInitRef = useRef(false);
  
  // Game Logic Refs
  const targetRef = useRef({ x: 0, y: 0, r: 25, active: false });
  const responseWindowRef = useRef(0.25);
  const MIN_RESPONSE_WINDOW = 0.08;
  const MAX_RESPONSE_WINDOW = 1.2;
  const reactionStartTimeRef = useRef(0);
  const scoreRef = useRef(0);
  const comboRef = useRef(0);
  const timerIntervalRef = useRef(null);
  const isActiveRef = useRef(false);
  const gameStateRef = useRef('start');
  const audioCtxRef = useRef(null);
  const timeLeftRef = useRef(DRILL_DURATION);
  const livesRef = useRef(3);
  const hitsRef = useRef(0);
  const missesRef = useRef(0);
  const bestComboRef = useRef(0);
  const totalReactionTimeRef = useRef(0);

  // VFX Refs
  const particlesRef = useRef([]);
  const floatingTextsRef = useRef([]);
  const hitMarkersRef = useRef([]);
  const screenShakeRef = useRef(0);

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
  


  // Client-side initialization
  useEffect(() => {
    try {
      const s = localStorage.getItem('instantResponseBest');
      if (s) {
        const p = parseInt(s, 10);
        if (!isNaN(p)) setBestScore(p);
      }
            } catch(e){}
  }, []);

  useEffect(() => { gameStateRef.current = gameState; }, [gameState]);

  // Compute sensitivity
  

  const updateBestScore = useCallback((fs) => {
    try {
      const c = parseInt(localStorage.getItem('instantResponseBest') || '0', 10);
      if (fs > c) {
        localStorage.setItem('instantResponseBest', fs.toString());
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
        success: { f1: 1000, f2: 1500, type: 'sine', dur: 0.08, vol: 0.08 },
        fail: { f1: 220, f2: 130, type: 'triangle', dur: 0.22, vol: 0.12 },
        combo: { f1: 750, f2: 2000, type: 'sine', dur: 0.16, vol: 0.12 },
        penalty: { f1: 140, f2: 90, type: 'square', dur: 0.28, vol: 0.16 },
        spawn: { f1: 520, f2: 640, type: 'sine', dur: 0.05, vol: 0.02 }
      };

      const p = profiles[type] || profiles.success;
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

  const resetGame = useCallback(() => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    isActiveRef.current = false;
    setGameState('start'); gameStateRef.current = 'start';
    setScore(0); setSuccessfulHits(0); setMissedHits(0); setCombo(0); setBestCombo(0);
    timeLeftRef.current = DRILL_DURATION; setTimeLeft(DRILL_DURATION); setBestReaction(0); setAccuracy(100); setLives(3);
    targetRef.current = { x: 0, y: 0, r: 25, active: false }; crosshairInitRef.current = false;
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
    const t = hitsRef.current + missesRef.current;
    setAccuracy(t === 0 ? 100 : Math.round((hitsRef.current / t) * 100));
    setAvgReaction(hitsRef.current === 0 ? 0 : Math.round(totalReactionTimeRef.current / hitsRef.current));
    updateBestScore(scoreRef.current);
    // Record telemetry for AI coaching system
    try {
      recordDrillResult('instant-response', {
        score: scoreRef.current,
        accuracy: accuracy,
        reactionTimeMs: avgReaction || null,
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

  // VFX
  const createExplosion = (x, y, color) => {
    for (let i = 0; i < 12; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 3.5 + 1;
      particlesRef.current.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1.0,
        color
      });
    }
  };

  const createFloatingText = (x, y, text, color) => {
    floatingTextsRef.current.push({ x, y, text, color, life: 1.0, vy: -1.4 });
  };

  const createHitMarker = (x, y) => {
    hitMarkersRef.current.push({ x, y, life: 1.0 });
  };

  const triggerFlash = useCallback(() => {
    const cvs = canvasRef.current; if (!cvs || !isActiveRef.current) return;
    targetRef.current.active = true;
    targetRef.current.x = cvs.width / 2;
    targetRef.current.y = cvs.height / 2;

    let targetRadius = 25;
    let baseTtl = 0.28; // default reaction time limit in seconds

    if (gameType === 'valorant' || gameType === 'cs2') {
      targetRadius = 13; // small target
      baseTtl = 0.22; // tight window
    } else if (gameType === 'apex' || gameType === 'overwatch') {
      targetRadius = 20;
      baseTtl = 0.32;
    } else {
      targetRadius = 17;
      baseTtl = 0.26;
    }

    targetRef.current.r = targetRadius;
    responseWindowRef.current = baseTtl;
    setResponseWindow(Math.round(baseTtl * 1000));
    reactionStartTimeRef.current = performance.now();
    playSound('spawn');
  }, [gameType, playSound]);

  const handleMiss = useCallback((r) => {
    if (!isActiveRef.current) return;

    screenShakeRef.current = 10;
    missesRef.current++;
    setMissedHits(missesRef.current);
    comboRef.current = 0;
    setCombo(0);

    if (livesRef.current > 0) {
      livesRef.current -= 1;
      setLives(livesRef.current);
      playSound('fail'); if (typeof checkSensitivityAdjustment === 'function') checkSensitivityAdjustment('miss', { dist: typeof dist !== 'undefined' ? dist : 50, targetSize: typeof targetRadius !== 'undefined' ? targetRadius : (typeof TARGET_SIZE !== 'undefined' ? TARGET_SIZE : (typeof TARGET_RADIUS !== 'undefined' ? TARGET_RADIUS : 15)) }); if (typeof checkSensitivityAdjustment === 'function') checkSensitivityAdjustment('miss', { dist: typeof dist !== 'undefined' ? dist : 50, targetSize: typeof targetRadius !== 'undefined' ? targetRadius : (typeof TARGET_SIZE !== 'undefined' ? TARGET_SIZE : (typeof TARGET_RADIUS !== 'undefined' ? TARGET_RADIUS : 15)) });
      showFeedbackText(`✗ ${r}`, 'error');
    }

    if (livesRef.current === 0) {
      scoreRef.current = Math.max(0, scoreRef.current - 1);
      setScore(scoreRef.current);
      playSound('penalty'); if (typeof checkSensitivityAdjustment === 'function') checkSensitivityAdjustment('miss', { dist: typeof dist !== 'undefined' ? dist : 50, targetSize: typeof targetRadius !== 'undefined' ? targetRadius : (typeof TARGET_SIZE !== 'undefined' ? TARGET_SIZE : (typeof TARGET_RADIUS !== 'undefined' ? TARGET_RADIUS : 15)) }); if (typeof checkSensitivityAdjustment === 'function') checkSensitivityAdjustment('miss', { dist: typeof dist !== 'undefined' ? dist : 50, targetSize: typeof targetRadius !== 'undefined' ? targetRadius : (typeof TARGET_SIZE !== 'undefined' ? TARGET_SIZE : (typeof TARGET_RADIUS !== 'undefined' ? TARGET_RADIUS : 15)) });
      showFeedbackText('✗ LIFE OUT! -1 Point', 'error');
    }

    // Adaptive buffer: reaction window increases when missing
    responseWindowRef.current = Math.min(MAX_RESPONSE_WINDOW, responseWindowRef.current + 0.08);
    setResponseWindow(Math.round(responseWindowRef.current * 1000));
  }, [playSound, showFeedbackText]);

  const handleShot = useCallback(() => {
    if (gameStateRef.current !== 'playing' || !isActiveRef.current || !crosshairInitRef.current) return;

    virtualCrosshair.current.expand = 8;
    const ch = virtualCrosshair.current, t = targetRef.current;

    if (t.active) {
      const hitTolerance = t.r + 15;
      const dist = Math.hypot(ch.x - t.x, ch.y - t.y);

      if (dist < hitTolerance) {
        const rt = performance.now() - reactionStartTimeRef.current;
        totalReactionTimeRef.current += rt;

        // Shrink the adaptive window for successful hits
        const efficiency = (responseWindowRef.current - (rt / 1000)) / responseWindowRef.current;
        responseWindowRef.current = Math.max(MIN_RESPONSE_WINDOW, responseWindowRef.current - efficiency * 0.08);
        setResponseWindow(Math.round(responseWindowRef.current * 1000));

        scoreRef.current += 1;
        setScore(scoreRef.current);
        hitsRef.current++;
        setSuccessfulHits(hitsRef.current);
        comboRef.current++;
        setCombo(comboRef.current);

        if (comboRef.current > bestComboRef.current) {
          bestComboRef.current = comboRef.current;
          setBestCombo(comboRef.current);
        }
        if (bestReaction === 0 || rt < bestReaction) setBestReaction(Math.round(rt));

        createExplosion(t.x, t.y, '#00ff88');
        createHitMarker(ch.x, ch.y);
        createFloatingText(t.x, t.y, `${Math.round(rt)}ms`, '#ffffff');

        playSound('success'); if (typeof checkSensitivityAdjustment === 'function') checkSensitivityAdjustment('hit'); if (typeof checkSensitivityAdjustment === 'function') checkSensitivityAdjustment('hit');

        if (comboRef.current % 5 === 0) {
          playSound('combo');
          showFeedbackText(`🔥 COMBO STREAK x${comboRef.current}!`, 'success');
        }

        t.active = false;
      } else {
        handleMiss('Aim Slip (Missed)');
        createExplosion(ch.x, ch.y, '#ff4444');
        t.active = false;
      }
    } else {
      handleMiss('Prefire (No Target Active)');
    }
  }, [bestReaction, handleMiss, playSound, showFeedbackText]);

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

  // Main Render Loop
  useEffect(() => {
    if (gameState !== 'playing') return;
    const cvs = canvasRef.current; if (!cvs) return;
    const ctx = cvs.getContext('2d', { alpha: false });

    const update = () => {
      const cr = containerRef.current; if (!cr) return;
      const rr = cr.getBoundingClientRect();
      let w = rr.width, h = w * (9/16);
      if (h > rr.height) { h = rr.height; w = h * (16/9); }
      cvs.width = w; cvs.height = h;
      cvs.style.width = `${w}px`;
      cvs.style.height = `${h}px`;
      canvasSizeRef.current = { width: w, height: h };
      cvs.style.position = 'absolute';
      cvs.style.left = `${(rr.width - w) / 2}px`;
      cvs.style.top = `${(rr.height - h) / 2}px`;
      if (w > 0 && h > 0 && (!crosshairInitRef.current || (virtualCrosshair.current.x === 0 && virtualCrosshair.current.y === 0))) {
        virtualCrosshair.current = { x: w / 2, y: h / 2, expand: 0 };
        crosshairInitRef.current = true;
      };
    };

    update();
    window.addEventListener('resize', update);
    let lt = performance.now();
    let spawnCountdown = 0.5 + Math.random() * 1.5;

    const loop = (now) => {
      if (!isActiveRef.current) {
        animationRef.current = requestAnimationFrame(loop);
        return;
      }

      const dt = (now - lt) / 1000;
      lt = now;
      const { width: cw, height: ch } = canvasSizeRef.current;

      // Update Screen Shake
      if (targetRef.current.active) {
        const timeAlive = now - reactionStartTimeRef.current;
        if (timeAlive > responseWindowRef.current * 1000) {
          handleMiss('Target Expired (Too Slow)');
          createExplosion(targetRef.current.x, targetRef.current.y, '#ff4444');
          createFloatingText(targetRef.current.x, targetRef.current.y, "TIMEOUT", '#ff4444');
          targetRef.current.active = false;
          spawnCountdown = 0.8 + Math.random() * 1.6;
        }
      } else {
        spawnCountdown -= dt;
        if (spawnCountdown <= 0) {
          triggerFlash();
          spawnCountdown = 0.8 + Math.random() * 1.6;
        }
      }

      // RENDER
      ctx.save();
      if (screenShakeRef.current > 0) {
        const sx = (Math.random() - 0.5) * screenShakeRef.current;
        const sy = (Math.random() - 0.5) * screenShakeRef.current;
        ctx.translate(sx, sy);
        screenShakeRef.current *= 0.85;
        if (screenShakeRef.current < 0.5) screenShakeRef.current = 0;
      }

      ctx.fillStyle = '#050508';
      ctx.fillRect(0, 0, cw, ch);

      // Grid Pattern
      ctx.strokeStyle = 'rgba(0, 255, 136, 0.03)';
      ctx.lineWidth = 1;
      for (let i = 0; i < cw; i += 40) {
        ctx.beginPath();
        ctx.moveTo(i, 0); ctx.lineTo(i, ch);
        ctx.stroke();
      }
      for (let j = 0; j < ch; j += 40) {
        ctx.beginPath();
        ctx.moveTo(0, j); ctx.lineTo(cw, j);
        ctx.stroke();
      }

      // Draw active target in center
      if (targetRef.current.active) {
        const t = targetRef.current;
        const timeAlive = now - reactionStartTimeRef.current;
        const timeRatio = 1 - Math.min(1, timeAlive / (responseWindowRef.current * 1000));

        ctx.shadowBlur = 20;
        ctx.shadowColor = '#ffffff';
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(t.x, t.y, t.r, 0, Math.PI*2);
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.strokeStyle = 'rgba(0,0,0,0.2)';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.arc(t.x, t.y, t.r * 0.5, 0, Math.PI*2);
        ctx.stroke();

        // Shrinking timer circle
        ctx.strokeStyle = timeRatio > 0.5 ? '#00ff88' : (timeRatio > 0.25 ? '#fbbf24' : '#ef4444');
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(t.x, t.y, t.r + 6 + (timeRatio * 12), 0, Math.PI*2);
        ctx.stroke();
      }

      // Render VFX particles
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= dt * 2.2;
        if (p.life <= 0) {
          particlesRef.current.splice(i, 1);
          continue;
        }
        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, 3, 3);
      }

      // Render hit markers
      ctx.lineWidth = 2;
      for (let i = hitMarkersRef.current.length - 1; i >= 0; i--) {
        const hm = hitMarkersRef.current[i];
        hm.life -= dt * 3.5;
        if (hm.life <= 0) {
          hitMarkersRef.current.splice(i, 1);
          continue;
        }
        ctx.globalAlpha = hm.life;
        ctx.strokeStyle = '#ffffff';
        const s = 6 + (1 - hm.life) * 6;
        ctx.beginPath();
        ctx.moveTo(hm.x - s, hm.y - s); ctx.lineTo(hm.x + s, hm.y + s);
        ctx.moveTo(hm.x + s, hm.y - s); ctx.lineTo(hm.x - s, hm.y + s);
        ctx.stroke();
      }
      ctx.globalAlpha = 1.0;

      // Render Floating Text
      ctx.font = 'bold 13px Inter, monospace';
      ctx.textAlign = 'center';
      for (let i = floatingTextsRef.current.length - 1; i >= 0; i--) {
        const ft = floatingTextsRef.current[i];
        ft.y += ft.vy;
        ft.life -= dt * 1.5;
        if (ft.life <= 0) {
          floatingTextsRef.current.splice(i, 1);
          continue;
        }
        ctx.globalAlpha = ft.life;
        ctx.fillStyle = ft.color;
        ctx.fillText(ft.text, ft.x, ft.y);
      }
      ctx.globalAlpha = 1.0;

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

      ctx.restore();
      animationRef.current = requestAnimationFrame(loop);
    };

    animationRef.current = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', update);
    };
  }, [gameState, pointerLocked, triggerFlash, gameType]);

  const startGame = useCallback(() => {
    // Get adaptive difficulty parameters
    const adaptive = getAdaptiveParams('instant-response');

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
    setScore(0); setSuccessfulHits(0); setMissedHits(0); setCombo(0); setBestCombo(0);
    timeLeftRef.current = DRILL_DURATION; setTimeLeft(DRILL_DURATION); setBestReaction(0); setAccuracy(100); setAvgReaction(0);
    setLives(3);

    isActiveRef.current = true; scoreRef.current = 0; comboRef.current = 0; bestComboRef.current = 0; livesRef.current = 3;
    hitsRef.current = 0; missesRef.current = 0; totalReactionTimeRef.current = 0;
    crosshairInitRef.current = false;

    particlesRef.current = [];
    floatingTextsRef.current = [];
    hitMarkersRef.current = [];

    // Base responsive window based on game type
    let baseTtl = 0.28;
    if (gameType === 'valorant' || gameType === 'cs2') baseTtl = 0.22;
    else if (gameType === 'apex' || gameType === 'overwatch') baseTtl = 0.32;
    responseWindowRef.current = baseTtl;
    setResponseWindow(Math.round(baseTtl * 1000));

    startTimer();

    if (canvasRef.current) {
      try {
        canvasRef.current.requestPointerLock();
      } catch (e) {
        console.warn("Pointer lock blocked", e);
      }
    }
    crosshairInitRef.current = true;
  }, [startTimer, requestPointerLock, gameType]);

  return (
    <div ref={pageRef} className="min-h-screen select-none font-mono bg-[#080d1a] text-slate-100 relative overflow-hidden">
      
      {/* Background patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-950/20 via-[#080d1a] to-[#080d1a] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,_transparent_1px),_linear-gradient(90deg,_rgba(139,92,246,0.03)_1px,_transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />

      <div className={`${isFullscreen ? 'w-full h-screen p-0 m-0' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'} relative z-10`}>
        
        {/* Navigation Breadcrumb */}
        {!isFullscreen && (
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-2 text-[10px] text-slate-400 uppercase tracking-widest">
              <li><Link href="/" className="hover:text-purple-400 transition-colors"><Home className="w-3.5 h-3.5" /></Link></li>
              <li><ChevronRight className="w-3 h-3 text-slate-700" /></li>
              <li><Link href="/drills/fps" className="hover:text-purple-400 transition-colors">FPS Sector</Link></li>
              <li><ChevronRight className="w-3 h-3 text-slate-700" /></li>
              <li><span className="text-purple-400 font-bold">Instant Reflex</span></li>
            </ol>
          </nav>
        )}

        {/* Drill Header */}
        {!isFullscreen && (
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6 border-b border-slate-900 pb-5">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-950/30 border border-purple-500/20 text-purple-400 rounded-xl">
                <Zap className="w-7 h-7 animate-pulse" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white uppercase bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                  Instant Response Trainer
                </h1>
                <p className="text-xs text-slate-400 tracking-wider mt-0.5">
                  {pointerLocked ? '🟢 RAW INPUT CAPTURING' : '🔴 CLICK CANVAS TO CAPTURE'} • {cmPer360} cm/360 • Reflex Test
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <button 
                onClick={() => setSoundEnabled(!soundEnabled)} 
                className="px-3 py-1.5 rounded-lg border border-slate-800 bg-[#0c1224] text-slate-300 hover:border-slate-700 text-xs flex items-center gap-1.5 transition"
              >
                {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        )}

        {/* Start / Settings Menu */}
        {gameState === 'start' && (
          <div className="absolute inset-0 bg-[#080d1a]/95 flex items-center justify-center p-6 z-30 overflow-y-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2 bg-[#0c1224]/85 border border-slate-900 rounded-xl p-6 shadow-2xl backdrop-blur-md">
              <h2 className="text-base font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-purple-400" />
                Reflex Optimization Training
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                This esports conditioning drill trains raw central neurological click reflexes. Wait for the central target to flash bright white and immediately snap click. The response timing adapts dynamically—becoming shorter on success and wider on miss.
              </p>

              <div className="p-4 bg-slate-950/50 rounded-lg border border-purple-500/10 mb-4">
                <h3 className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5" />
                  Esports Fullscreen Pointer Lock
                </h3>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Clicking the button launches the trainer instantly into fullscreen and requests raw pointer input. Pressing <kbd className="px-1 py-0.5 bg-slate-800 text-slate-200 border border-slate-700 rounded text-[9px] font-mono">ESC</kbd> exits fullscreen and resets your lobby state.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-[#080d1a] border border-slate-900 rounded-lg p-3 text-center">
                  <span className="text-[10px] text-slate-500 block mb-0.5">DURABILITY</span>
                  <span className="text-white font-bold text-sm">60 SECONDS</span>
                </div>
                <div className="bg-[#080d1a] border border-slate-900 rounded-lg p-3 text-center">
                  <span className="text-[10px] text-slate-500 block mb-0.5">TARGET LIMITS</span>
                  <span className="text-purple-400 font-bold text-sm">80ms - 1200ms</span>
                </div>
                <div className="bg-[#080d1a] border border-slate-900 rounded-lg p-3 text-center">
                  <span className="text-[10px] text-slate-500 block mb-0.5">ERRORS ALLOWED</span>
                  <span className="text-white font-bold text-sm">3 LIVES</span>
                </div>
                <div className="bg-[#080d1a] border border-slate-900 rounded-lg p-3 text-center">
                  <span className="text-[10px] text-slate-500 block mb-0.5">DIFFICULTY</span>
                  <span className="text-green-400 font-bold text-sm">ADAPTIVE</span>
                </div>
              </div>
            </div>

            <div className="bg-[#0c1224]/85 border border-slate-900 rounded-xl p-6 shadow-2xl backdrop-blur-md flex flex-col justify-between">
              <div>
                <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Calibration Panel</h2>
                
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
                  className="w-full sm:w-auto px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg text-sm flex items-center justify-center gap-2 shadow-lg shadow-purple-500/25 uppercase tracking-wider transition animate-pulse"
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
            <h2 className="text-2xl font-black text-white uppercase tracking-wider mb-2">Training Session Complete</h2>
            <p className="text-xs text-slate-400 leading-relaxed mb-6">
              You completed the {gameType.toUpperCase()} reflex profile. Consistent training stabilizes synaptic reaction speeds.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
              <div className="bg-[#080d1a] border border-slate-900 rounded-lg p-3">
                <span className="text-[10px] text-slate-500 block mb-0.5">FINAL SCORE</span>
                <span className="text-white font-bold text-lg">{score}</span>
              </div>
              <div className="bg-[#080d1a] border border-slate-900 rounded-lg p-3">
                <span className="text-[10px] text-slate-500 block mb-0.5">BEST RECORD</span>
                <span className="text-yellow-500 font-bold text-lg">{bestScore}</span>
              </div>
              <div className="bg-[#080d1a] border border-slate-900 rounded-lg p-3">
                <span className="text-[10px] text-slate-500 block mb-0.5">BEST REACTION</span>
                <span className="text-purple-400 font-bold text-lg">{bestReaction || '-'}ms</span>
              </div>
              <div className="bg-[#080d1a] border border-slate-900 rounded-lg p-3">
                <span className="text-[10px] text-slate-500 block mb-0.5">AVG REACTION</span>
                <span className="text-blue-400 font-bold text-lg">{avgReaction || '-'}ms</span>
              </div>
              <div className="bg-[#080d1a] border border-slate-900 rounded-lg p-3">
                <span className="text-[10px] text-slate-500 block mb-0.5">MAX STREAK</span>
                <span className="text-green-400 font-bold text-lg">{bestCombo}x</span>
              </div>
              <div className="bg-[#080d1a] border border-slate-900 rounded-lg p-3">
                <span className="text-[10px] text-slate-500 block mb-0.5">ACCURACY</span>
                <span className="text-white font-bold text-lg">{accuracy}%</span>
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
                className="flex-1 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg text-xs uppercase tracking-wider transition shadow-lg shadow-purple-500/20"
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