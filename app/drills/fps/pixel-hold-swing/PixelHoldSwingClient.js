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
const HOLD_GAP_WIDTH = 4; // ultra tight 4px pixel angle hold!

export default function PixelHoldSwingClient() {
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
  const [successfulHits, setSuccessfulHits] = useState(0);
  const [missedHits, setMissedHits] = useState(0);
  const [combo, setCombo] = useState(0);
  const [bestCombo, setBestCombo] = useState(0);
  const [timeLeft, setTimeLeft] = useState(DRILL_DURATION);
  const [accuracy, setAccuracy] = useState(100);
  const [lives, setLives] = useState(5);
  const [pointerLocked, setPointerLocked] = useState(false);

  const [dpi, setDpi] = useState(800);
  const [inGameSens, setInGameSens] = useState(0.28); // Siege style micro holding sens
  const [gameType, setGameType] = useState('siege'); // siege, valorant, cs2
  const [cmPer360, setCmPer360] = useState(0);
  const sensitivityMultiplierRef = useRef(1);

  // Target states
  const targetRef = useRef(null); // { type: 'head_peek'|'shoulder_bait'|'wide_swing', side: 'left'|'right', state: 'hiding'|'peeking'|'returning', startTime, x, y, duration }
  const lastSpawnTimeRef = useRef(0);

  // Telemetry logs
  const [analyticsData, setAnalyticsData] = useState({
    totalShots: 0,
    hits: 0,
    baitsFallenFor: 0,
    baitDiscipline: 100, // percentage of baits ignored
    reactionTimes: [],
    bestReaction: 0
  });

  const virtualCrosshair = useRef({ x: 0, y: 0 });
  const canvasSizeRef = useRef({ width: 800, height: 450 });
  const scoreRef = useRef(0);
  const comboRef = useRef(0);
  const timerIntervalRef = useRef(null);
  const isActiveRef = useRef(false);
  const gameStateRef = useRef('start');
  const audioCtxRef = useRef(null);
  const timeLeftRef = useRef(DRILL_DURATION);
  const livesRef = useRef(5);
  const hitsRef = useRef(0);
  const missesRef = useRef(0);
  const baitsIgnoredRef = useRef(0);
  const baitsFallenRef = useRef(0);
  const bestComboRef = useRef(0);
  
  // Snap tracking
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


  
  

  // TTS speech helper
  

  useEffect(() => {
    try {
      const s = localStorage.getItem('pixelHoldBestScore');
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
    } catch (e) {}

    // Warm up speech synthesis voices
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.getVoices();
    }
  }, []);

  useEffect(() => { gameStateRef.current = gameState; }, [gameState]);

  // Sensitivity math
  useEffect(() => {
    const yaw = GAME_YAWS[gameType] || 0.07;
    const counts = 360 / (yaw * inGameSens);
    const inches = counts / dpi;
    const cm = inches * 2.54;
    setCmPer360(cm.toFixed(1));
    sensitivityMultiplierRef.current = 50.0 / cm;
  }, [dpi, inGameSens, gameType]);

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
      const f = { success: 1200, fail: 220, combo: 1500, penalty: 80 };
      o.frequency.setValueAtTime(f[type] || 440, now);
      g.gain.setValueAtTime(type==='combo'?0.08:type==='penalty'?0.15:0.05, now);
      g.gain.exponentialRampToValueAtTime(0.001, now+0.1);
      o.start(now); o.stop(now+0.1);
    } catch (e) {}
  }, [soundEnabled, initAudio]);

  const updateBestScore = useCallback((fs) => {
    try {
      const c = parseInt(localStorage.getItem('pixelHoldBestScore') || '0', 10);
      if (fs > c) {
        localStorage.setItem('pixelHoldBestScore', fs.toString());
        setBestScore(fs);
      }
    } catch (e) {}
  }, []);

  const resetGame = useCallback(() => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    isActiveRef.current = false;
    setGameState('start'); gameStateRef.current = 'start';
    targetRef.current = null;
    crosshairInitializedRef.current = false;
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

  // Pointer Lock input mapping
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (document.pointerLockElement !== canvasRef.current || !isActiveRef.current) return;
      
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

  const spawnTarget = () => {
    const cvs = canvasRef.current;
    if (!cvs) return null;

    // S+ peek types: 
    // - 'head_peek' (shows only 4px at edge of gap, then retreats. Total exposure = 190ms)
    // - 'shoulder_bait' (shows shoulder silhouette, does NOT expose head. Ignored = safe, Clicked = penalty)
    // - 'wide_swing' (flies completely across the gap at 900px/s, exposure in gap = 160ms)
    const roll = Math.random();
    let type = 'head_peek';
    let duration = 210; // visual trigger window (ms)

    if (roll < 0.35) {
      type = 'shoulder_bait';
      duration = 260;
    } else if (roll < 0.65) {
      type = 'wide_swing';
      duration = 180;
    }

    const side = Math.random() < 0.5 ? 'left' : 'right';
    
    // Head peeks spawn exactly at vertical center.
    const py = cvs.height / 2 + (Math.random() - 0.5) * 40;

    return {
      type,
      side,
      state: 'peeking',
      startTime: performance.now(),
      duration,
      y: py,
      xOffset: 0,
      width: type === 'shoulder_bait' ? 12 : 6, // R6 style head vs shoulder
      height: 18,
    };
  };

  // Click Handler (Trigger Pull)
  useEffect(() => {
    const handleMouseClick = (e) => {
      if (document.pointerLockElement !== canvasRef.current || gameStateRef.current !== 'playing' || !isActiveRef.current) return;
      
      const clickTime = performance.now();
      const ch = virtualCrosshair.current;
      const t = targetRef.current;

      setAnalyticsData(prev => ({ ...prev, totalShots: prev.totalShots + 1 }));

      if (!t || t.state === 'hiding') {
        // Blind spam miss
        missesRef.current += 1;
        setMissedHits(missesRef.current);
        comboRef.current = 0;
        setCombo(0);
        playSound('fail'); if (typeof checkSensitivityAdjustment === 'function') checkSensitivityAdjustment('miss', { dist: typeof dist !== 'undefined' ? dist : 50, targetSize: typeof targetRadius !== 'undefined' ? targetRadius : (typeof TARGET_SIZE !== 'undefined' ? TARGET_SIZE : (typeof TARGET_RADIUS !== 'undefined' ? TARGET_RADIUS : 15)) }); if (typeof checkSensitivityAdjustment === 'function') checkSensitivityAdjustment('miss', { dist: typeof dist !== 'undefined' ? dist : 50, targetSize: typeof targetRadius !== 'undefined' ? targetRadius : (typeof TARGET_SIZE !== 'undefined' ? TARGET_SIZE : (typeof TARGET_RADIUS !== 'undefined' ? TARGET_RADIUS : 15)) });
        showFeedbackText('❌ PREMATURE TRIGGER', 'error');
        speakText('Premature trigger, wait for exposure.');

        livesRef.current -= 1;
        setLives(livesRef.current);
        if (livesRef.current <= 0) {
          playSound('penalty'); if (typeof checkSensitivityAdjustment === 'function') checkSensitivityAdjustment('miss', { dist: typeof dist !== 'undefined' ? dist : 50, targetSize: typeof targetRadius !== 'undefined' ? targetRadius : (typeof TARGET_SIZE !== 'undefined' ? TARGET_SIZE : (typeof TARGET_RADIUS !== 'undefined' ? TARGET_RADIUS : 15)) }); if (typeof checkSensitivityAdjustment === 'function') checkSensitivityAdjustment('miss', { dist: typeof dist !== 'undefined' ? dist : 50, targetSize: typeof targetRadius !== 'undefined' ? targetRadius : (typeof TARGET_SIZE !== 'undefined' ? TARGET_SIZE : (typeof TARGET_RADIUS !== 'undefined' ? TARGET_RADIUS : 15)) });
          // endGame();
        }
        return;
      }

      // Check if target is visible inside the vertical hold gap
      const cvs = canvasRef.current;
      if (!cvs) return;
      const gapLeft = cvs.width / 2 - HOLD_GAP_WIDTH / 2;
      const gapRight = cvs.width / 2 + HOLD_GAP_WIDTH / 2;

      // Calculate rendered target X
      let targetX = 0;
      if (t.type === 'wide_swing') {
        targetX = t.xOffset;
      } else {
        targetX = t.side === 'left' ? gapLeft - 10 + t.xOffset : gapRight + 10 - t.xOffset;
      }

      // Is target overlapping the gap?
      const targetInGap = targetX + t.width >= gapLeft && targetX <= gapRight;

      if (t.type === 'shoulder_bait') {
        // Clicked a bait peek! High penalty!
        baitsFallenRef.current += 1;
        missesRef.current += 1;
        setMissedHits(missesRef.current);
        comboRef.current = 0;
        setCombo(0);
        playSound('penalty'); if (typeof checkSensitivityAdjustment === 'function') checkSensitivityAdjustment('miss', { dist: typeof dist !== 'undefined' ? dist : 50, targetSize: typeof targetRadius !== 'undefined' ? targetRadius : (typeof TARGET_SIZE !== 'undefined' ? TARGET_SIZE : (typeof TARGET_RADIUS !== 'undefined' ? TARGET_RADIUS : 15)) }); if (typeof checkSensitivityAdjustment === 'function') checkSensitivityAdjustment('miss', { dist: typeof dist !== 'undefined' ? dist : 50, targetSize: typeof targetRadius !== 'undefined' ? targetRadius : (typeof TARGET_SIZE !== 'undefined' ? TARGET_SIZE : (typeof TARGET_RADIUS !== 'undefined' ? TARGET_RADIUS : 15)) });
        showFeedbackText('❌ BAITED - SHOULDER ONLY', 'error');
        speakText('Baited! Ignore shoulder exposure.');
        
        targetRef.current = null;
        lastSpawnTimeRef.current = clickTime;

        livesRef.current -= 1;
        setLives(livesRef.current);
        if (livesRef.current <= 0) {
          // endGame();
        }
      } else {
        // Head peek or wide swing. Click must overlap the target coordinate
        const hitX = ch.x >= targetX && ch.x <= targetX + t.width;
        const hitY = Math.abs(ch.y - t.y) <= 12;

        if (hitX && hitY && targetInGap) {
          // HIT!
          const react = Math.round(clickTime - t.startTime);
          hitsRef.current += 1;
          setSuccessfulHits(hitsRef.current);
          
          scoreRef.current += 300 + comboRef.current * 30;
          setScore(scoreRef.current);

          comboRef.current += 1;
          setCombo(comboRef.current);
          if (comboRef.current > bestComboRef.current) {
            bestComboRef.current = comboRef.current;
            setBestCombo(comboRef.current);
          }

          playSound('success'); if (typeof checkSensitivityAdjustment === 'function') checkSensitivityAdjustment('hit'); if (typeof checkSensitivityAdjustment === 'function') checkSensitivityAdjustment('hit');
          showFeedbackText(`🎯 ELITE CRACKSHOT - ${react}ms`, 'success');
          if (comboRef.current % 3 === 0) {
            speakText('Elite reaction speed!');
          }

          setAnalyticsData(prev => {
            const list = [...prev.reactionTimes, react];
            const best = prev.bestReaction === 0 ? react : Math.min(prev.bestReaction, react);
            return {
              ...prev,
              hits: hitsRef.current,
              reactionTimes: list,
              bestReaction: best
            };
          });

          targetRef.current = null;
          lastSpawnTimeRef.current = clickTime;
        } else {
          // Missed click
          missesRef.current += 1;
          setMissedHits(missesRef.current);
          comboRef.current = 0;
          setCombo(0);
          playSound('fail'); if (typeof checkSensitivityAdjustment === 'function') checkSensitivityAdjustment('miss', { dist: typeof dist !== 'undefined' ? dist : 50, targetSize: typeof targetRadius !== 'undefined' ? targetRadius : (typeof TARGET_SIZE !== 'undefined' ? TARGET_SIZE : (typeof TARGET_RADIUS !== 'undefined' ? TARGET_RADIUS : 15)) }); if (typeof checkSensitivityAdjustment === 'function') checkSensitivityAdjustment('miss', { dist: typeof dist !== 'undefined' ? dist : 50, targetSize: typeof targetRadius !== 'undefined' ? targetRadius : (typeof TARGET_SIZE !== 'undefined' ? TARGET_SIZE : (typeof TARGET_RADIUS !== 'undefined' ? TARGET_RADIUS : 15)) });
          showFeedbackText('❌ AIM DEVIATED FROM GAP', 'error');
          speakText('Missed, check crosshair centering.');

          livesRef.current -= 1;
          setLives(livesRef.current);
          if (livesRef.current <= 0) {
            playSound('penalty'); if (typeof checkSensitivityAdjustment === 'function') checkSensitivityAdjustment('miss', { dist: typeof dist !== 'undefined' ? dist : 50, targetSize: typeof targetRadius !== 'undefined' ? targetRadius : (typeof TARGET_SIZE !== 'undefined' ? TARGET_SIZE : (typeof TARGET_RADIUS !== 'undefined' ? TARGET_RADIUS : 15)) }); if (typeof checkSensitivityAdjustment === 'function') checkSensitivityAdjustment('miss', { dist: typeof dist !== 'undefined' ? dist : 50, targetSize: typeof targetRadius !== 'undefined' ? targetRadius : (typeof TARGET_SIZE !== 'undefined' ? TARGET_SIZE : (typeof TARGET_RADIUS !== 'undefined' ? TARGET_RADIUS : 15)) });
            // endGame();
          }
        }
      }

      // Re-calculate accuracy & discipline
      const total = hitsRef.current + missesRef.current;
      setAccuracy(total > 0 ? Math.round((hitsRef.current / total) * 100) : 100);

      const totalBaits = baitsIgnoredRef.current + baitsFallenRef.current;
      setAnalyticsData(prev => ({
        ...prev,
        baitsFallenFor: baitsFallenRef.current,
        baitDiscipline: totalBaits > 0 ? Math.round((baitsIgnoredRef.current / totalBaits) * 100) : 100
      }));
    };

    document.addEventListener('mousedown', handleMouseClick);
    return () => document.removeEventListener('mousedown', handleMouseClick);
  }, [speakText]);

  const endGame = useCallback(() => {
    setGameState('gameOver');
    gameStateRef.current = 'gameOver';
    isActiveRef.current = false;
    updateBestScore(scoreRef.current);
    // Record telemetry for AI coaching system
    try {
      recordDrillResult('pixel-hold-swing', {
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

    if (document.pointerLockElement) {
      document.exitPointerLock();
    }

    const avgReact = analyticsData.reactionTimes.length > 0 ? Math.round(analyticsData.reactionTimes.reduce((a,b)=>a+b,0)/analyticsData.reactionTimes.length) : 0;
    const discipline = analyticsData.baitDiscipline;
    
    let diagnoseText = `Pixel hold training complete. Final score is ${scoreRef.current}. `;
    if (avgReact < 190 && avgReact > 0) {
      diagnoseText += "Your visual trigger response is S-plus pro level. ";
    } else {
      diagnoseText += `Your trigger delay is ${avgReact} milliseconds. You are lacking raw threat response speed. `;
    }

    if (discipline >= 80) {
      diagnoseText += "Your trigger discipline is excellent. You ignored bait peeks correctly.";
    } else {
      diagnoseText += `Your bait discipline is only ${discipline} percent. You are falling for shoulder peeks. Focus on visual coherence.`;
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
    const adaptive = getAdaptiveParams('pixel-hold-swing');

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
    
    setAnalyticsData({ totalShots: 0, hits: 0, baitsFallenFor: 0, baitDiscipline: 100, reactionTimes: [], bestReaction: 0 });
    setGameState('playing'); gameStateRef.current = 'playing';
    setScore(0); setSuccessfulHits(0); setMissedHits(0); setCombo(0); setBestCombo(0);
    timeLeftRef.current = DRILL_DURATION; setTimeLeft(DRILL_DURATION);
    setAccuracy(100); setLives(5);
    isActiveRef.current = true; scoreRef.current = 0; comboRef.current = 0; bestComboRef.current = 0; livesRef.current = 5;
    hitsRef.current = 0; missesRef.current = 0;
    baitsIgnoredRef.current = 0; baitsFallenRef.current = 0;
    targetRef.current = null; lastSpawnTimeRef.current = performance.now();
    crosshairInitializedRef.current = false;
    
    // Vocal welcome instructions
    speakText("Initiating pixel hold and lean swing training. React to compact peeks instantly. Maintain absolute trigger discipline.", true);

    startTimer();
    
    if (canvasRef.current) {
      try {
        canvasRef.current.requestPointerLock();
      } catch (e) {
        console.warn("Pointer lock blocked", e);
      }
    }
    crosshairInitializedRef.current = true;
  }, [startTimer, speakText]);

  // Physics animation loop
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
        // Siege optimal pixel hold placement: resting cursor exactly inside hold gap center
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

      // 1. Draw solid concrete walls & visual gap
      ctx.fillStyle = "#030409"; // dark space
      ctx.fillRect(0, 0, cvs.width, cvs.height);

      const gapLeft = cvs.width / 2 - HOLD_GAP_WIDTH / 2;
      const gapRight = cvs.width / 2 + HOLD_GAP_WIDTH / 2;

      // Update target animations
      if (!targetRef.current && gameStateRef.current === 'playing') {
        const timeSinceLast = ct - lastSpawnTimeRef.current;
        if (timeSinceLast > (Math.random() * 800 + 700)) { // every 0.7 - 1.5s
          targetRef.current = spawnTarget();
          lastSpawnTimeRef.current = ct;
        }
      }

      if (targetRef.current) {
        const t = targetRef.current;
        const elapsed = ct - t.startTime;

        if (t.type === 'wide_swing') {
          // Wide swing speed integration (900px/s across the screen)
          const startX = t.side === 'left' ? gapLeft - 180 : gapRight + 120;
          const endX = t.side === 'left' ? gapRight + 180 : gapLeft - 180;
          const progress = elapsed / t.duration;
          
          if (progress < 1.0) {
            t.xOffset = startX + (endX - startX) * progress;
          } else {
            // Target escaped gap without trigger pull!
            missesRef.current += 1;
            setMissedHits(missesRef.current);
            comboRef.current = 0;
            setCombo(0);
            playSound('fail'); if (typeof checkSensitivityAdjustment === 'function') checkSensitivityAdjustment('miss', { dist: typeof dist !== 'undefined' ? dist : 50, targetSize: typeof targetRadius !== 'undefined' ? targetRadius : (typeof TARGET_SIZE !== 'undefined' ? TARGET_SIZE : (typeof TARGET_RADIUS !== 'undefined' ? TARGET_RADIUS : 15)) }); if (typeof checkSensitivityAdjustment === 'function') checkSensitivityAdjustment('miss', { dist: typeof dist !== 'undefined' ? dist : 50, targetSize: typeof targetRadius !== 'undefined' ? targetRadius : (typeof TARGET_SIZE !== 'undefined' ? TARGET_SIZE : (typeof TARGET_RADIUS !== 'undefined' ? TARGET_RADIUS : 15)) });
            showFeedbackText('⚠️ ESCAPED GAP', 'warn');
            speakText('Target escaped.');

            livesRef.current -= 1;
            setLives(livesRef.current);
            if (livesRef.current <= 0) {
              playSound('penalty'); if (typeof checkSensitivityAdjustment === 'function') checkSensitivityAdjustment('miss', { dist: typeof dist !== 'undefined' ? dist : 50, targetSize: typeof targetRadius !== 'undefined' ? targetRadius : (typeof TARGET_SIZE !== 'undefined' ? TARGET_SIZE : (typeof TARGET_RADIUS !== 'undefined' ? TARGET_RADIUS : 15)) }); if (typeof checkSensitivityAdjustment === 'function') checkSensitivityAdjustment('miss', { dist: typeof dist !== 'undefined' ? dist : 50, targetSize: typeof targetRadius !== 'undefined' ? targetRadius : (typeof TARGET_SIZE !== 'undefined' ? TARGET_SIZE : (typeof TARGET_RADIUS !== 'undefined' ? TARGET_RADIUS : 15)) });
              // endGame();
            }

            const total = hitsRef.current + missesRef.current;
            setAccuracy(total > 0 ? Math.round((hitsRef.current / total) * 100) : 100);

            targetRef.current = null;
            lastSpawnTimeRef.current = ct;
          }
        } else {
          // Head peek / shoulder bait (peek out from cover, pause, then return)
          const step = t.duration / 3; // divided into peeking, pausing, returning
          const maxExtension = t.type === 'shoulder_bait' ? 14 : 9; // extend slightly into gap

          if (elapsed < step) {
            // Extending
            t.xOffset = maxExtension * (elapsed / step);
          } else if (elapsed < step * 2) {
            // Paused
            t.xOffset = maxExtension;
          } else if (elapsed < t.duration) {
            // Returning
            const retProgress = (elapsed - step * 2) / step;
            t.xOffset = maxExtension * (1 - retProgress);
          } else {
            // Target returned safely behind wall
            if (t.type === 'shoulder_bait') {
              // Successfully ignored shoulder bait!
              baitsIgnoredRef.current += 1;
              showFeedbackText('🟢 DISCIPLINE CHECK', 'success');
              playSound('success'); if (typeof checkSensitivityAdjustment === 'function') checkSensitivityAdjustment('hit'); if (typeof checkSensitivityAdjustment === 'function') checkSensitivityAdjustment('hit');
              speakText('Good discipline.');
            } else {
              // Exposing target escaped click!
              missesRef.current += 1;
              setMissedHits(missesRef.current);
              comboRef.current = 0;
              setCombo(0);
              playSound('fail'); if (typeof checkSensitivityAdjustment === 'function') checkSensitivityAdjustment('miss', { dist: typeof dist !== 'undefined' ? dist : 50, targetSize: typeof targetRadius !== 'undefined' ? targetRadius : (typeof TARGET_SIZE !== 'undefined' ? TARGET_SIZE : (typeof TARGET_RADIUS !== 'undefined' ? TARGET_RADIUS : 15)) }); if (typeof checkSensitivityAdjustment === 'function') checkSensitivityAdjustment('miss', { dist: typeof dist !== 'undefined' ? dist : 50, targetSize: typeof targetRadius !== 'undefined' ? targetRadius : (typeof TARGET_SIZE !== 'undefined' ? TARGET_SIZE : (typeof TARGET_RADIUS !== 'undefined' ? TARGET_RADIUS : 15)) });
              showFeedbackText('⚠️ ESCAPED GAP', 'warn');
              speakText('Target escaped.');

              livesRef.current -= 1;
              setLives(livesRef.current);
              if (livesRef.current <= 0) {
                playSound('penalty'); if (typeof checkSensitivityAdjustment === 'function') checkSensitivityAdjustment('miss', { dist: typeof dist !== 'undefined' ? dist : 50, targetSize: typeof targetRadius !== 'undefined' ? targetRadius : (typeof TARGET_SIZE !== 'undefined' ? TARGET_SIZE : (typeof TARGET_RADIUS !== 'undefined' ? TARGET_RADIUS : 15)) }); if (typeof checkSensitivityAdjustment === 'function') checkSensitivityAdjustment('miss', { dist: typeof dist !== 'undefined' ? dist : 50, targetSize: typeof targetRadius !== 'undefined' ? targetRadius : (typeof TARGET_SIZE !== 'undefined' ? TARGET_SIZE : (typeof TARGET_RADIUS !== 'undefined' ? TARGET_RADIUS : 15)) });
                // endGame();
              }
            }

            const total = hitsRef.current + missesRef.current;
            setAccuracy(total > 0 ? Math.round((hitsRef.current / total) * 100) : 100);

            const totalBaits = baitsIgnoredRef.current + baitsFallenRef.current;
            setAnalyticsData(prev => ({
              ...prev,
              baitDiscipline: totalBaits > 0 ? Math.round((baitsIgnoredRef.current / totalBaits) * 100) : 100
            }));

            targetRef.current = null;
            lastSpawnTimeRef.current = ct;
          }
        }

        // Draw Target behind walls (occluded by walls!)
        if (targetRef.current) {
          let renderX = 0;
          if (t.type === 'wide_swing') {
            renderX = t.xOffset;
          } else {
            renderX = t.side === 'left' ? gapLeft - t.width + t.xOffset : gapRight - t.xOffset;
          }

          ctx.fillStyle = t.type === 'shoulder_bait' ? '#3b82f6' : '#e11d48'; // blue shoulder, red head
          ctx.beginPath();
          ctx.fillRect(renderX, t.y - t.height / 2, t.width, t.height);
        }
      }

      // Render solid obscuring concrete walls
      ctx.fillStyle = "#1e293b"; // heavy steel/concrete color
      ctx.fillRect(0, 0, gapLeft, cvs.height);
      ctx.fillRect(gapRight, 0, cvs.width - gapRight, cvs.height);

      // Wall edge highlights
      ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(gapLeft, 0); ctx.lineTo(gapLeft, cvs.height);
      ctx.moveTo(gapRight, 0); ctx.lineTo(gapRight, cvs.height);
      ctx.stroke();

      // Render Virtual Crosshair (small dot reticle)
      const ch = virtualCrosshair.current;
      if (ch.x > 0 && ch.x < cvs.width && ch.y > 0 && ch.y < cvs.height) {
        ctx.strokeStyle = "#00ff88";
        ctx.lineWidth = 1.0;
        const gap = 2;
        const len = 2;
        ctx.beginPath();
        ctx.moveTo(ch.x-gap-len, ch.y); ctx.lineTo(ch.x-gap, ch.y);
        ctx.moveTo(ch.x+gap, ch.y); ctx.lineTo(ch.x+gap+len, ch.y);
        ctx.moveTo(ch.x, ch.y-gap-len); ctx.lineTo(ch.x, ch.y-gap);
        ctx.moveTo(ch.x, ch.y+gap); ctx.lineTo(ch.x, ch.y+gap+len);
        ctx.stroke();

        ctx.fillStyle = "#00ff88";
        ctx.beginPath(); ctx.arc(ch.x, ch.y, 0.8, 0, Math.PI*2); ctx.fill();
      }

      if (!pointerLocked) {
        ctx.fillStyle = 'rgba(8, 13, 26, 0.9)';
        ctx.fillRect(cvs.width / 2 - 180, cvs.height / 2 - 25, 360, 50);
        ctx.strokeStyle = '#e11d48';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(cvs.width / 2 - 180, cvs.height / 2 - 25, 360, 50);
        
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 11px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('CLICK CANVAS TO CAPTURE RAW MOUSE INPUT', cvs.width / 2, cvs.height / 2 + 4);
      }

      animationRef.current = requestAnimationFrame(draw);
    }

    animationRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', updateSize);
    };
  }, [gameState, pointerLocked, speakText]);

  const avgReaction = analyticsData.reactionTimes.length > 0 
    ? Math.round(analyticsData.reactionTimes.reduce((a,b) => a+b, 0) / analyticsData.reactionTimes.length) 
    : 0;

  return (
    <div ref={pageRef} className="min-h-screen select-none font-mono bg-[#080d1a] text-slate-100 relative overflow-hidden">
      
      {/* Background patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-rose-950/20 via-[#080d1a] to-[#080d1a] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(239,68,68,0.02)_1px,_transparent_1px),_linear-gradient(90deg,_rgba(239,68,68,0.02)_1px,_transparent_1px)] bg-[size:30px_30px] pointer-events-none z-0" />

      <div className={`${isFullscreen ? 'w-full h-screen p-0 m-0' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'} relative z-10`}>
        
        {!isFullscreen && (
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-2 text-[10px] text-slate-400 uppercase tracking-widest">
              <li><Link href="/" className="hover:text-rose-400 transition-colors"><Home className="w-3.5 h-3.5" /></Link></li>
              <li><ChevronRight className="w-3 h-3 text-slate-700" /></li>
              <li><Link href="/drills/fps" className="hover:text-rose-400 transition-colors">FPS Sector</Link></li>
              <li><ChevronRight className="w-3 h-3 text-slate-700" /></li>
              <li><span className="text-rose-400 font-bold">S+ Pixel Hold & Lean Swing</span></li>
            </ol>
          </nav>
        )}

        {!isFullscreen && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 border-b border-slate-900 pb-5">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-rose-950/30 border border-rose-500/25 text-rose-500 rounded-xl shadow-lg shadow-rose-500/10">
                <Crosshair className="w-7 h-7 animate-pulse text-rose-550" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white uppercase bg-gradient-to-r from-rose-500 via-white to-slate-400 bg-clip-text text-transparent">
                  S+ Pixel Hold & Lean Swing
                </h1>
                <p className="text-xs text-slate-400 tracking-wider mt-0.5 animate-pulse">
                  {pointerLocked ? '🟢 NEURAL COGNITION SCANNING' : '🔴 ANGLE OCCLUSIONS DECONSTRUCTED'} • {cmPer360} cm/360 • R6 PHYSICS
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Lobby Start Screen */}
        {gameState === 'start' && (
          <div className="absolute inset-0 bg-[#080d1a]/95 flex items-center justify-center p-6 z-30 overflow-y-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl">
              
              <div className="lg:col-span-1 bg-[#0c1224]/80 border border-slate-900 rounded-xl p-6 flex flex-col justify-between backdrop-blur-md">
                <div>
                  <h3 className="text-sm font-bold text-rose-500 mb-4 flex items-center gap-2 border-b border-slate-900 pb-2">
                    <Info className="w-4 h-4" />
                    SIEGECRAFT PROTOCOLS
                  </h3>
                  <ul className="space-y-4 text-xs leading-relaxed text-slate-400">
                    <li className="flex items-start gap-2">
                      <span className="text-rose-500 font-bold">1.</span>
                      <span>Target head silhouttes peek across an ultra-thin 4px vertical gap.</span>
                    </li>
                    <li className="flex items-start gap-2 text-rose-350">
                      <span className="text-rose-500 font-bold">2.</span>
                      <span>Avoid shoulder baits (blue). Firing on shoulder targets incurs heavy penalties.</span>
                    </li>
                    <li className="flex items-start gap-2 text-rose-300">
                      <span className="text-rose-500 font-bold">★</span>
                      <span>Tests visual reaction speed trigger delays at sub-180ms threshold ranges.</span>
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
                    <Calculator className="w-4 h-4 text-rose-500" />
                    MATCH COORDINATION INDEX
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    <div>
                      <label className="block text-[9px] text-slate-400 font-bold uppercase tracking-wider mb-2">Tactical Setup</label>
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
                        step="0.01"
                        value={inGameSens}
                        onChange={(e) => setInGameSens(Math.max(0.001, parseFloat(e.target.value) || 0.1))}
                        className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-2 text-xs text-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] text-slate-400 font-bold uppercase tracking-wider mb-2">Mouse DPI</label>
                      <input 
                        type="number"
                        step="50"
                        value={dpi}
                        onChange={(e) => setDpi(Math.max(100, parseInt(e.target.value, 10) || 800))}
                        className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-2 text-xs text-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="p-4 bg-slate-950 rounded border border-slate-900 flex justify-between items-center text-xs">
                    <div>
                      <span className="text-[10px] text-slate-550 block uppercase">360 Sweep Distance</span>
                      <span className="text-white font-bold">{cmPer360} cm / 360°</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-slate-550 block uppercase">Hold Occluding Gap</span>
                      <span className="text-rose-500 font-bold">{HOLD_GAP_WIDTH} px</span>
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
                    className="w-full sm:w-auto px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg text-sm flex items-center justify-center gap-2 shadow-lg shadow-red-500/25 uppercase tracking-wider transition animate-pulse"
                  >
                    <Play className="w-4 h-4 fill-white" />
                    Enter S+ Fullscreen Sandbox
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Gameplay Canvas Container */}
        <div className={isFullscreen ? "w-full h-full" : "block"}>
          <div 
            ref={containerRef} 
            className={isFullscreen 
              ? "w-full h-full bg-[#020306] relative overflow-hidden flex items-center justify-center" 
              : "w-full aspect-video min-h-[400px] lg:min-h-[500px] bg-[#020306] border border-slate-800 rounded-xl relative overflow-hidden flex items-center justify-center"}
          >
            <canvas ref={canvasRef} onClick={handleCanvasClick} />

            {/* S+ Pro Coach Dynamic Audio Guidance HUD & Alerts (Visual Text Hidden) */}


            {/* S+ Pro Coach Dynamic Audio Guidance HUD & Alerts (Visual Text Hidden) */}

            
            {/* Feedback notifications */}
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
            <span>🖱 Shoot targets appearing inside the 4px gap. Ignore blue shoulder baits.</span>
            <span>• Press <kbd className="px-1.5 py-0.5 bg-slate-900 border border-slate-800 text-slate-350 rounded font-sans text-[10px]">ESC</kbd> to unlock.</span>
          </div>
        </div>

        {/* Game Over Screen */}
        {gameState === 'gameOver' && (
          <div className="absolute inset-0 bg-[#080d1a]/95 flex items-center justify-center p-6 z-30 overflow-y-auto">
            <div className="bg-[#0c1224]/85 border border-rose-500/20 rounded-xl p-8 backdrop-blur-md max-w-3xl mx-auto w-full shadow-2xl">
              <h2 className="text-xl font-bold text-rose-500 text-center mb-6 uppercase tracking-widest flex items-center justify-center gap-2 animate-pulse">
                <Award className="w-5 h-5 text-yellow-500" />
                S+ ANGLE HOLD COMPLETED
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="space-y-4">
                  <div className="bg-slate-950 p-4 rounded border border-slate-900">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-550 block uppercase">Final S+ Score:</span>
                      <span className="text-white font-bold text-xl">{score} PTS</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-950 p-3 rounded border border-slate-900 text-center">
                      <span className="text-[10px] text-slate-550 block uppercase">Accuracy %</span>
                      <span className="text-white font-bold text-sm">{accuracy}%</span>
                    </div>
                    <div className="bg-slate-950 p-3 rounded border border-slate-900 text-center">
                      <span className="text-[10px] text-slate-550 block uppercase">Bait Discipline</span>
                      <span className="text-white font-bold text-sm">{analyticsData.baitDiscipline}%</span>
                    </div>
                  </div>

                  <div className="bg-slate-950 p-4 rounded border border-slate-900">
                    <div className="flex justify-between items-center text-xs mb-1">
                      <span className="text-slate-550 uppercase">Avg Reaction Time:</span>
                      <span className="text-rose-500 font-bold">{avgReaction} ms</span>
                    </div>
                    <div className="text-[10px] text-slate-550 leading-normal">
                      Reaction trigger latency inside the 4px gap. Global pro target baseline is &lt; 180ms.
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-slate-950 p-4 rounded border border-slate-900">
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-900 pb-2 mb-3">
                      NEURAL REACTION PERFORMANCE
                    </h4>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-slate-550">Cracked Hits:</span>
                        <span className="text-green-400 font-bold">{successfulHits}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-550">Baits Fallen For:</span>
                        <span className="text-rose-500 font-bold">{analyticsData.baitsFallenFor}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-550">Best Visual Speed:</span>
                        <span className="text-white font-bold">{analyticsData.bestReaction} ms</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* S+ Coach Diagnostics */}
              <div className="bg-[#080d1a] border border-rose-500/10 rounded-lg p-5 mb-8 text-left shadow-inner">
                <h3 className="text-xs font-bold text-rose-500 font-mono uppercase tracking-widest border-b border-slate-800 pb-2 mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-rose-500 animate-pulse" />
                  S+ AI COGNITIVE TRIGGER COACH
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs leading-relaxed text-slate-350">
                  <div className="space-y-2 border-r border-slate-900 pr-6">
                    <p className="font-bold text-white uppercase text-[10px] tracking-wider font-mono">Reflex Calibration:</p>
                    <ul className="space-y-2 list-disc pl-4">
                      {avgReaction < 180 && avgReaction > 0 ? (
                        <li className="text-green-400">🔥 S+ Tier Reflexes: Trigger response ({avgReaction}ms) matches peak Pro-League visual reaction threshold metrics.</li>
                      ) : (
                        <li className="text-yellow-500">⚠️ Neural Delay: Average response time is ({avgReaction}ms). Anticipate the target transition by focusing strictly on the gap edges.</li>
                      )}
                      {analyticsData.baitDiscipline >= 90 ? (
                        <li className="text-green-400">🔥 Pro Discipline: Resisted baiting on {analyticsData.baitDiscipline}% of decoy peeks. Exceptional focus.</li>
                      ) : (
                        <li className="text-rose-400">⚠️ Baiting Deficit: Fell for {analyticsData.baitsFallenFor} decoy/shoulder peeks. Train visual differentiation.</li>
                      )}
                    </ul>
                  </div>
                  <div className="space-y-3 flex flex-col justify-between">
                    <div>
                      <p className="font-bold text-white uppercase text-[10px] tracking-wider font-mono mb-1">Global Pro Advice:</p>
                      <p className="text-slate-350 font-sans leading-relaxed">
                        {analyticsData.baitDiscipline >= 90 
                          ? "Your cognitive trigger discipline is impeccable. Keep practicing to shave off 10ms of input delay on fast wide swings."
                          : "Ignore shoulder motions by looking only for high-contrast red head silhouettes. Practice slow sweeps to recalibrate cognitive threat identification."}
                      </p>
                    </div>
                    <div className="pt-1">
                      <span className="inline-block bg-rose-950/40 text-rose-450 px-3 py-1.5 rounded text-[10px] font-mono font-bold uppercase border border-rose-550/20 shadow-md">
                        S+ PERFORMANCE RANK: {score >= 2500 ? "CHALLENGER" : score >= 1200 ? "DIAMOND" : "PLATINUM"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Back actions */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center border-t border-slate-900 pt-6">
                <button
                  onClick={startGame}
                  className="w-full sm:w-auto px-6 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-lg text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition shadow-lg shadow-rose-500/20"
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
