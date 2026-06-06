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
const SPAWN_INTERVAL = 650; // fast spawns for S+ deadzone snapping
const TARGET_SIZE = 7; // micro S+ size (Valorant head at long distance)

// Counter-strafe movement physics constants
const MAX_SPEED = 320;
const ACCEL = 2200;
const FRICTION = 1600;
const COUNTER_FORCE = 4500; // instant AD braking
const DEADZONE_THRESHOLD = 25; // 7.8% of max speed

export default function DeadzoneJiggleSnapClient() {
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
  const [inGameSens, setInGameSens] = useState(0.35);
  const [gameType, setGameType] = useState('valorant'); // valorant, cs2
  const [botMovementProfile, setBotMovementProfile] = useState('standard'); // standard, radiant-jiggle, wide-swing-crouch
  const [cmPer360, setCmPer360] = useState(0);
  const sensitivityMultiplierRef = useRef(1);

  // Keyboard state
  const keysPressed = useRef({ KeyA: false, KeyD: false });
  const playerX = useRef(0);
  const playerVel = useRef(0);

  
  

  // Telemetry logs
  const [analyticsData, setAnalyticsData] = useState({
    totalShots: 0,
    deadzoneShots: 0,
    deadzoneAccuracy: 100,
    overshoots: 0,
    undershoots: 0,
    perfectStrafes: 0, // jiggle direction flips caught at deadzone
  });

  const targetRef = useRef(null);
  const virtualCrosshair = useRef({ x: 0, y: 0 });
  const canvasSizeRef = useRef({ width: 800, height: 450 });
  const scoreRef = useRef(0);
  const comboRef = useRef(0);
  const timerIntervalRef = useRef(null);
  const isActiveRef = useRef(false);
  const gameStateRef = useRef('start');
  const audioCtxRef = useRef(null);
  const lastSpawnTimeRef = useRef(0);
  const timeLeftRef = useRef(DRILL_DURATION);
  const livesRef = useRef(5);
  const hitsRef = useRef(0);
  const missesRef = useRef(0);
  const bestComboRef = useRef(0);
  
  // Snap tracking
  const startSnapPosRef = useRef({ x: 0, y: 0 });
  const crosshairInitializedRef = useRef(false);
  
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
  useEffect(() => {
    if (gameState === 'playing') return;
    try {
      localStorage.setItem('proSens', inGameSens.toString());
      localStorage.setItem('proDpi', dpi.toString());
      localStorage.setItem('proGame', gameType);
      localStorage.setItem('deadzoneBotProfile', botMovementProfile);
      if (gameType === 'pubg') {
        localStorage.setItem('pubgSens', inGameSens.toString());
      }
    } catch (e) {}
  }, [inGameSens, dpi, gameType, gameState, botMovementProfile]);


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
      const s = localStorage.getItem('deadzoneBestScore');
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
      
      const savedBotProfile = localStorage.getItem('deadzoneBotProfile');
      if (savedBotProfile) {
        setBotMovementProfile(savedBotProfile);
      }

      const savedPlaylist = sessionStorage.getItem('esportsPlaylist');
      if (savedPlaylist) {
        setActivePlaylist(JSON.parse(savedPlaylist));
        setPlaylistStep(parseInt(sessionStorage.getItem('esportsPlaylistStep') || '0', 10));
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
      const f = { success: 1000, fail: 250, combo: 1400, penalty: 120 };
      o.frequency.setValueAtTime(f[type] || 440, now);
      g.gain.setValueAtTime(type==='combo'?0.08:type==='penalty'?0.12:0.06, now);
      g.gain.exponentialRampToValueAtTime(0.001, now+0.1);
      o.start(now); o.stop(now+0.1);
    } catch (e) {}
  }, [soundEnabled, initAudio]);

  const updateBestScore = useCallback((fs) => {
    try {
      const c = parseInt(localStorage.getItem('deadzoneBestScore') || '0', 10);
      if (fs > c) {
        localStorage.setItem('deadzoneBestScore', fs.toString());
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
    playerVel.current = 0;
    playerX.current = 0;
    keysPressed.current = { KeyA: false, KeyD: false };
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

  // Keyboard Event Handlers
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (gameStateRef.current !== 'playing') return;
      if (e.code === 'KeyA' || e.code === 'KeyD') {
        keysPressed.current[e.code] = true;
      }
    };
    const handleKeyUp = (e) => {
      if (gameStateRef.current !== 'playing') return;
      if (e.code === 'KeyA' || e.code === 'KeyD') {
        keysPressed.current[e.code] = false;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Mouse move handler
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
      
      crosshairHistoryRef.current.push({ x: virtualCrosshair.current.x, y: virtualCrosshair.current.y });
      if (crosshairHistoryRef.current.length > 25) {
        crosshairHistoryRef.current.shift();
      }
    };
    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const spawnTarget = () => {
    const cvs = canvasRef.current;
    if (!cvs) return null;
    
    // Spawn targets in horizontal rows matching head height (+/- 50px of center)
    const tx = Math.random() * (cvs.width - 200) + 100;
    const ty = cvs.height / 2 + (Math.random() - 0.5) * 100;
    
    startSnapPosRef.current = { x: virtualCrosshair.current.x, y: virtualCrosshair.current.y };
    
    return {
      x: tx,
      y: ty,
      startTime: performance.now(),
      duration: 1100 // generous target window, but player must stop to click it!
    };
  };

  // Click handler (weapon fire)
  useEffect(() => {
    const handleMouseClick = (e) => {
      if (document.pointerLockElement !== canvasRef.current || gameStateRef.current !== 'playing' || !isActiveRef.current) return;
      
      const clickTime = performance.now();
      const ch = virtualCrosshair.current;
      const t = targetRef.current;
      if (!t) return;

      const speed = Math.abs(playerVel.current);
      const isDeadzone = speed <= DEADZONE_THRESHOLD;
      
      // Calculate shooting spread based on speed
      let spreadOffset = 0;
      if (!isDeadzone) {
        // High movement error penalty
        spreadOffset = (speed / MAX_SPEED) * 50; // up to 50px bullet spread deviation
      }
      
      // Randomize shot placement within spread
      const theta = Math.random() * Math.PI * 2;
      const spreadR = Math.random() * spreadOffset;
      const shotX = ch.x + Math.cos(theta) * spreadR;
      const shotY = ch.y + Math.sin(theta) * spreadR;

      // Draw position of moving target: it shifts based on player horizontal movement!
      const targetRenderX = t.x - (playerX.current % 1600);
      const dist = Math.hypot(shotX - targetRenderX, shotY - t.y);

      setAnalyticsData(prev => {
        const total = prev.totalShots + 1;
        const dead = prev.deadzoneShots + (isDeadzone ? 1 : 0);
        return {
          ...prev,
          totalShots: total,
          deadzoneShots: dead,
          deadzoneAccuracy: Math.round((dead / total) * 100)
        };
      });

      if (dist <= (t.currentSize || TARGET_SIZE)) {
        // HIT
        hitsRef.current += 1;
        setSuccessfulHits(hitsRef.current);
        
        // Multiplier based on speed: S+ elite hits are strictly at 0 speed!
        const bonusMultiplier = isDeadzone ? 2.5 : 0.5;
        scoreRef.current += Math.round((150 + comboRef.current * 15) * bonusMultiplier);
        setScore(scoreRef.current);
        
        comboRef.current += 1;
        setCombo(comboRef.current);
        if (comboRef.current > bestComboRef.current) {
          bestComboRef.current = comboRef.current;
          setBestCombo(comboRef.current);
        }
        
        if (isDeadzone) {
          if (comboRef.current % 5 === 0) {
            playSound('combo');
            showFeedbackText(`🔥 DEADZONE SYNC x${comboRef.current}`, 'success');
            speakText('Perfect deadzone sync!');
          } else {
            playSound('success'); if (typeof checkSensitivityAdjustment === 'function') checkSensitivityAdjustment('hit'); if (typeof checkSensitivityAdjustment === 'function') checkSensitivityAdjustment('hit');
            showFeedbackText('🎯 PERFECT DEADZONE', 'success');
          }
        } else {
          playSound('success'); if (typeof checkSensitivityAdjustment === 'function') checkSensitivityAdjustment('hit'); if (typeof checkSensitivityAdjustment === 'function') checkSensitivityAdjustment('hit');
          showFeedbackText('⚠️ LUCKY MOVING HIT', 'warn');
          speakText('Lucky hit while moving, check movement error spread.');
        }
        
        targetRef.current = null;
        lastSpawnTimeRef.current = clickTime;
      } else {
        // MISS
        missesRef.current += 1;
        setMissedHits(missesRef.current);
        comboRef.current = 0;
        setCombo(0);
        playSound('fail'); if (typeof checkSensitivityAdjustment === 'function') checkSensitivityAdjustment('miss', { dist: typeof dist !== 'undefined' ? dist : 50, targetSize: typeof targetRadius !== 'undefined' ? targetRadius : (typeof TARGET_SIZE !== 'undefined' ? TARGET_SIZE : (typeof TARGET_RADIUS !== 'undefined' ? TARGET_RADIUS : 15)) }); if (typeof checkSensitivityAdjustment === 'function') checkSensitivityAdjustment('miss', { dist: typeof dist !== 'undefined' ? dist : 50, targetSize: typeof targetRadius !== 'undefined' ? targetRadius : (typeof TARGET_SIZE !== 'undefined' ? TARGET_SIZE : (typeof TARGET_RADIUS !== 'undefined' ? TARGET_RADIUS : 15)) });

        if (!isDeadzone) {
          showFeedbackText('❌ MOVEMENT ERROR SPREAD', 'error');
          speakText('Movement error, stop moving before shooting.');
        } else {
          // Calculate overshoot/undershoot on pure static aim
          const snapStartX = startSnapPosRef.current.x;
          const snapStartY = startSnapPosRef.current.y;
          const snapVectorX = targetRenderX - snapStartX;
          const snapVectorY = t.y - snapStartY;
          const snapVectorLen = Math.hypot(snapVectorX, snapVectorY);

          if (snapVectorLen > 0) {
            const ux = snapVectorX / snapVectorLen;
            const uy = snapVectorY / snapVectorLen;
            const clickVectorX = ch.x - snapStartX;
            const clickVectorY = ch.y - snapStartY;
            const proj = clickVectorX * ux + clickVectorY * uy;

            if (proj > snapVectorLen) {
              setAnalyticsData(prev => ({ ...prev, overshoots: prev.overshoots + 1 }));
              showFeedbackText('⚠️ OVERSHOOT', 'warn');
              speakText('Overshoot, decelerate faster.');
            } else {
              setAnalyticsData(prev => ({ ...prev, undershoots: prev.undershoots + 1 }));
              showFeedbackText('⚠️ UNDERSHOOT', 'warn');
              speakText('Undershoot, accelerate your snap.');
            }
          }
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
      recordDrillResult('deadzone-jiggle-snap', {
        score: scoreRef.current,
        accuracy: accuracy,
        reactionTimeMs: null,
        trackingAccuracy: null,
        comboMax: bestCombo,
        overshoots: analyticsData.overshoots || 0,
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

    const deadPct = hitsRef.current + missesRef.current > 0 
      ? Math.round((analyticsData.deadzoneShots / (hitsRef.current + missesRef.current)) * 100) 
      : 100;
    let diagnoseText = `Deadzone training complete. Final score is ${scoreRef.current}. `;
    if (deadPct >= 80) {
      diagnoseText += "Your movement shooting synchronization is exceptional, S-plus pro level. ";
    } else {
      diagnoseText += `Your deadzone sync is only ${deadPct} percent. You are shooting before your velocity drops to zero. `;
    }
    if (analyticsData.overshoots > analyticsData.undershoots * 1.3) {
      diagnoseText += "You are overshooting. Decrease your in-game sensitivity slightly to stabilize your braking flicks.";
    } else if (analyticsData.undershoots > analyticsData.overshoots * 1.3) {
      diagnoseText += "You are undershooting. Focus on faster finger actuation or increase sensitivity.";
    } else {
      diagnoseText += "Your snapping mechanics are highly symmetrical and controlled. Excellent job.";
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
    const adaptive = getAdaptiveParams('deadzone-jiggle-snap');

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
    
    setAnalyticsData({ totalShots: 0, deadzoneShots: 0, deadzoneAccuracy: 100, overshoots: 0, undershoots: 0, perfectStrafes: 0 });
    setGameState('playing'); gameStateRef.current = 'playing';
    setScore(0); setSuccessfulHits(0); setMissedHits(0); setCombo(0); setBestCombo(0);
    timeLeftRef.current = DRILL_DURATION; setTimeLeft(DRILL_DURATION);
    setAccuracy(100); setLives(5);
    isActiveRef.current = true; scoreRef.current = 0; comboRef.current = 0; bestComboRef.current = 0; livesRef.current = 5;
    hitsRef.current = 0; missesRef.current = 0;
    playerX.current = 0; playerVel.current = 0;
    keysPressed.current = { KeyA: false, KeyD: false };
    targetRef.current = null; lastSpawnTimeRef.current = performance.now();
    crosshairInitializedRef.current = false;
    
    // Vocal welcome instructions
    speakText("Initiating deadzone jiggle snap training. Synchronize keyboard strafe direction swaps with raw mouse flicks. Keep trigger discipline high.", true);

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
    
    lastSpawnTimeRef.current = performance.now();
    let lt = performance.now();

    function draw(ct) {
      if (!isActiveRef.current) { animationRef.current = requestAnimationFrame(draw); return; }
      
      const dt = Math.min(0.05, (ct - lt) / 1000);
      lt = ct;

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

      // 1. Movement Physics & Deceleration
      const keys = keysPressed.current;
      let accelSign = 0;
      if (keys.KeyA) accelSign -= 1;
      if (keys.KeyD) accelSign += 1;

      const currentVel = playerVel.current;

      if (accelSign !== 0) {
        // If moving opposite to current velocity, apply high COUNTER_FORCE for instant deceleration
        const isBraking = (accelSign > 0 && currentVel < 0) || (accelSign < 0 && currentVel > 0);
        const force = isBraking ? COUNTER_FORCE : ACCEL;
        playerVel.current += accelSign * force * dt;
      } else {
        // Apply friction
        if (currentVel > 0) {
          playerVel.current = Math.max(0, currentVel - FRICTION * dt);
        } else if (currentVel < 0) {
          playerVel.current = Math.min(0, currentVel + FRICTION * dt);
        }
      }

      // Clamp speed
      playerVel.current = Math.max(-MAX_SPEED, Math.min(MAX_SPEED, playerVel.current));
      
      // Update horizontal coordinate frame
      playerX.current += playerVel.current * dt;

      // 2. Clear & Draw Canvas
      ctx.fillStyle = "#020306";
      ctx.fillRect(0, 0, cvs.width, cvs.height);

      // Fine grid lines shifting with player visual offset
      const xOffset = -(playerX.current % 30);
      ctx.strokeStyle = 'rgba(239, 68, 68, 0.015)';
      ctx.lineWidth = 1;
      for (let i = xOffset; i < cvs.width; i += 30) {
        ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, cvs.height); ctx.stroke();
      }
      for (let j = 0; j < cvs.height; j += 30) {
        ctx.beginPath(); ctx.moveTo(0, j); ctx.lineTo(cvs.width, j); ctx.stroke();
      }

      // Spawn target if empty
      if (!targetRef.current && gameStateRef.current === 'playing') {
        if (ct - lastSpawnTimeRef.current >= SPAWN_INTERVAL) {
          targetRef.current = spawnTarget();
          lastSpawnTimeRef.current = ct;
        }
      }

      // Draw target
      if (targetRef.current) {
        const t = targetRef.current;
        const elapsed = ct - t.startTime;
        
        // Movement Profile Update State Machine
        if (botMovementProfile === 'standard') {
          if (!t.vx) {
            t.vx = (Math.random() > 0.5 ? 1 : -1) * 150;
            t.lastDirectionChange = ct;
          }
          if (ct - t.lastDirectionChange > 1200 + Math.random() * 800) {
            t.vx *= -1;
            t.lastDirectionChange = ct;
          }
          t.x += t.vx * dt;
        } else if (botMovementProfile === 'radiant-jiggle') {
          if (!t.vx) {
            t.vx = (Math.random() > 0.5 ? 1 : -1) * 280;
            t.lastDirectionChange = ct;
          }
          if (ct - t.lastDirectionChange > 180 + Math.random() * 60) {
            t.vx *= -1;
            t.lastDirectionChange = ct;
          }
          t.x += t.vx * dt;
        } else if (botMovementProfile === 'wide-swing-crouch') {
          if (!t.state) {
            t.state = 'swing';
            t.vx = (Math.random() > 0.5 ? 1 : -1) * 350;
            t.lastStateChange = ct;
            t.baseY = t.y;
          }
          if (t.state === 'swing') {
            t.x += t.vx * dt;
            if (ct - t.lastStateChange > 700 + Math.random() * 300) {
              t.state = 'halt-crouch';
              t.vx = 0;
              t.y = t.baseY + 12;
              t.currentSize = TARGET_SIZE * 0.7;
              t.lastStateChange = ct;
            }
          } else if (t.state === 'halt-crouch') {
            if (ct - t.lastStateChange > 280 + Math.random() * 80) {
              t.state = 'swing';
              t.vx = (Math.random() > 0.5 ? 1 : -1) * 350;
              t.y = t.baseY;
              t.currentSize = TARGET_SIZE;
              t.lastStateChange = ct;
            }
          }
        }
        
        // Keep inside screen boundaries
        const pad = 100;
        if (t.x < pad) {
          t.x = pad;
          if (t.vx) t.vx = Math.abs(t.vx);
        } else if (t.x > cvs.width - pad) {
          t.x = cvs.width - pad;
          if (t.vx) t.vx = -Math.abs(t.vx);
        }

        if (elapsed < t.duration) {
          const ratio = elapsed / t.duration;
          const opacity = Math.max(0.3, 1 - ratio * 0.7);
          const currentSize = t.currentSize || TARGET_SIZE;

          // Position shifts relative to player coordinate frame
          const rx = t.x - (playerX.current % 1600);
          
          if (rx > 0 && rx < cvs.width) {
            // Decaying ring
            ctx.beginPath();
            ctx.arc(rx, t.y, currentSize * (1.6 - ratio * 1.0), 0, Math.PI*2);
            ctx.strokeStyle = `rgba(239, 68, 68, ${opacity * 0.4})`;
            ctx.lineWidth = 1.0;
            ctx.stroke();

            // Core hitbox
            ctx.shadowBlur = 10; ctx.shadowColor = "#ef4444";
            ctx.fillStyle = `rgba(239, 68, 68, ${opacity})`;
            ctx.beginPath(); ctx.arc(rx, t.y, currentSize, 0, Math.PI*2); ctx.fill();
            ctx.shadowBlur = 0;
          }
        } else {
          // EXPIRED target (miss)
          missesRef.current += 1;
          setMissedHits(missesRef.current);
          comboRef.current = 0;
          setCombo(0);
          shakeTimeRef.current = ct;
          playSound('fail'); if (typeof checkSensitivityAdjustment === 'function') checkSensitivityAdjustment('miss', { dist: typeof dist !== 'undefined' ? dist : 50, targetSize: typeof targetRadius !== 'undefined' ? targetRadius : (typeof TARGET_SIZE !== 'undefined' ? TARGET_SIZE : (typeof TARGET_RADIUS !== 'undefined' ? TARGET_RADIUS : 15)) }); if (typeof checkSensitivityAdjustment === 'function') checkSensitivityAdjustment('miss', { dist: typeof dist !== 'undefined' ? dist : 50, targetSize: typeof targetRadius !== 'undefined' ? targetRadius : (typeof TARGET_SIZE !== 'undefined' ? TARGET_SIZE : (typeof TARGET_RADIUS !== 'undefined' ? TARGET_RADIUS : 15)) });
          showFeedbackText('⚠️ TIME EXPIRED', 'error');
          speakText('Expired, speed up');

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
      }

      // Draw Trajectory Trail
      const history = crosshairHistoryRef.current;
      if (history.length > 1) {
        for (let idx = 1; idx < history.length; idx++) {
          ctx.beginPath();
          ctx.moveTo(history[idx-1].x, history[idx-1].y);
          ctx.lineTo(history[idx].x, history[idx].y);
          const alpha = (idx / history.length) * 0.35;
          ctx.strokeStyle = `rgba(239, 68, 68, ${alpha})`;
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      }

      // Draw reticle and dynamic movement error circle
      const ch = virtualCrosshair.current;
      const currentSpeed = Math.abs(playerVel.current);
      const isDeadzone = currentSpeed <= DEADZONE_THRESHOLD;

      if (ch.x > 0 && ch.x < cvs.width && ch.y > 0 && ch.y < cvs.height) {
        // Spread radius visualization
        const spreadRadius = isDeadzone ? 0 : (currentSpeed / MAX_SPEED) * 35;

        if (spreadRadius > 0) {
          ctx.strokeStyle = 'rgba(239, 68, 68, 0.45)';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(ch.x, ch.y, spreadRadius, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Reticle
        ctx.strokeStyle = isDeadzone ? "#00ff88" : "#ef4444";
        ctx.lineWidth = 1.2;
        const gap = 3;
        const len = 3;
        ctx.beginPath();
        ctx.moveTo(ch.x-gap-len, ch.y); ctx.lineTo(ch.x-gap, ch.y);
        ctx.moveTo(ch.x+gap, ch.y); ctx.lineTo(ch.x+gap+len, ch.y);
        ctx.moveTo(ch.x, ch.y-gap-len); ctx.lineTo(ch.x, ch.y-gap);
        ctx.moveTo(ch.x, ch.y+gap); ctx.lineTo(ch.x, ch.y+gap+len);
        ctx.stroke();

        ctx.fillStyle = isDeadzone ? "#00ff88" : "#ef4444";
        ctx.beginPath(); ctx.arc(ch.x, ch.y, 1.0, 0, Math.PI*2); ctx.fill();
      }

      // Draw a subtle horizontal ground / horizon reference line to aid coordinate alignment
      ctx.strokeStyle = 'rgba(255,255,255,0.06)';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(0, cvs.height / 2 + 100);
      ctx.lineTo(cvs.width, cvs.height / 2 + 100);
      ctx.stroke();

      // Subtle, non-obtrusive, narrow speed slider at absolute bottom edge (12px high)
      ctx.fillStyle = 'rgba(12, 18, 36, 0.6)';
      ctx.fillRect(0, cvs.height - 12, cvs.width, 12);
      
      const speedRatio = playerVel.current / MAX_SPEED; // -1 to 1
      const barX = cvs.width / 2 + speedRatio * (cvs.width / 4);
      
      // Highlight deadzone center region in dim neon green
      const dzWidth = (DEADZONE_THRESHOLD / MAX_SPEED) * (cvs.width / 4);
      ctx.fillStyle = 'rgba(0, 255, 136, 0.25)';
      ctx.fillRect(cvs.width / 2 - dzWidth, cvs.height - 12, dzWidth * 2, 12);

      // Draw speed pointer pin
      ctx.fillStyle = isDeadzone ? '#00ff88' : '#ef4444';
      ctx.fillRect(barX - 2, cvs.height - 12, 4, 12);

      if (!pointerLocked) {
        ctx.fillStyle = 'rgba(8, 13, 26, 0.9)';
        ctx.fillRect(cvs.width / 2 - 190, cvs.height / 2 - 25, 380, 50);
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(cvs.width / 2 - 190, cvs.height / 2 - 25, 380, 50);
        
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 11px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('CLICK CANVAS TO CAPTURE MOUSE & AD CONTROLS', cvs.width / 2, cvs.height / 2 + 4);
      }

      // Flashbang render overlay
      if (flashOpacityRef.current > 0) {
        ctx.fillStyle = `rgba(255, 255, 255, ${flashOpacityRef.current})`;
        ctx.fillRect(0, 0, cvs.width, cvs.height);
      }

      ctx.restore();
      animationRef.current = requestAnimationFrame(draw);
    }

    animationRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', updateSize);
    };
  }, [gameState, pointerLocked, speakText, initAudio, botMovementProfile]);

  return (
    <div ref={pageRef} className="min-h-screen select-none font-mono bg-[#080d1a] text-slate-100 relative overflow-hidden">
      
      {/* Background patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-950/20 via-[#080d1a] to-[#080d1a] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(239,68,68,0.03)_1px,_transparent_1px),_linear-gradient(90deg,_rgba(239,68,68,0.03)_1px,_transparent_1px)] bg-[size:30px_30px] pointer-events-none z-0" />

      <div className={`${isFullscreen ? 'w-full h-screen p-0 m-0' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'} relative z-10`}>
        
        {!isFullscreen && (
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-2 text-[10px] text-slate-400 uppercase tracking-widest">
              <li><Link href="/" className="hover:text-red-400 transition-colors"><Home className="w-3.5 h-3.5" /></Link></li>
              <li><ChevronRight className="w-3 h-3 text-slate-700" /></li>
              <li><Link href="/drills/fps" className="hover:text-red-400 transition-colors">FPS Sector</Link></li>
              <li><ChevronRight className="w-3 h-3 text-slate-700" /></li>
              <li><span className="text-red-400 font-bold">S+ Deadzone Jiggle & Snap</span></li>
            </ol>
          </nav>
        )}

        {!isFullscreen && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 border-b border-slate-900 pb-5">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-red-950/30 border border-red-500/25 text-red-500 rounded-xl shadow-lg shadow-red-500/10">
                <Target className="w-7 h-7 animate-pulse text-red-550" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white uppercase bg-gradient-to-r from-red-500 via-white to-slate-400 bg-clip-text text-transparent">
                  S+ Deadzone Jiggle & Snap
                </h1>
                <p className="text-xs text-slate-400 tracking-wider mt-0.5 animate-pulse">
                  {pointerLocked ? '🟢 DECOMPRESSION ENGINE CALIBRATED' : '🔴 INPUT FOCUS REQUIRED'} • {cmPer360} cm/360 • AD STRANGE MOTION
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
                  <h3 className="text-sm font-bold text-red-500 mb-4 flex items-center gap-2 border-b border-slate-900 pb-2">
                    <Info className="w-4 h-4" />
                    TACTICAL STRAFE LAWS
                  </h3>
                  <ul className="space-y-4 text-xs leading-relaxed text-slate-400">
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 font-bold">1.</span>
                      <span>Use <kbd className="px-1 py-0.5 bg-slate-950 border border-slate-800 rounded">A</kbd> and <kbd className="px-1 py-0.5 bg-slate-950 border border-slate-800 rounded">D</kbd> keys to strafe side-to-side.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 font-bold">2.</span>
                      <span>Moving weapon spread increases bullet deviation randomly (red circle).</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 font-bold">★</span>
                      <span>Shoot **only** at the exact deadzone velocity swap (green reticle). Halting cancels recoil spread entirely!</span>
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
                    <Calculator className="w-4 h-4 text-red-500" />
                    STANDARDIZE SENSITIVITY
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    <div>
                      <label className="block text-[9px] text-slate-400 font-bold uppercase tracking-wider mb-2">Tactical Game</label>
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
                      <label className="block text-[9px] text-slate-400 font-bold uppercase tracking-wider mb-2">Sensitivity</label>
                      <input 
                        type="number"
                        step="0.01"
                        value={inGameSens}
                        onChange={(e) => setInGameSens(Math.max(0.001, parseFloat(e.target.value) || 0.1))}
                        className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-2 text-xs text-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] text-slate-400 font-bold uppercase tracking-wider mb-2">DPI</label>
                      <input 
                        type="number"
                        step="50"
                        value={dpi}
                        onChange={(e) => setDpi(Math.max(100, parseInt(e.target.value, 10) || 800))}
                        className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-2 text-xs text-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-[9px] text-slate-400 font-bold uppercase tracking-wider mb-2">Bot Movement Profile</label>
                    <select
                      value={botMovementProfile}
                      onChange={(e) => {
                        setBotMovementProfile(e.target.value);
                        localStorage.setItem('deadzoneBotProfile', e.target.value);
                      }}
                      className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-2 text-xs text-white focus:outline-none focus:border-red-500/50 font-mono"
                    >
                      <option value="standard">Standard: Random constant-speed movements</option>
                      <option value="radiant-jiggle">Radiant AD-Jiggle: Rapid direction swaps (180-240ms)</option>
                      <option value="wide-swing-crouch">Wide Swing & Crouch: Sweeps, sudden stops, crouching target shrink</option>
                    </select>
                  </div>

                  <div className="p-4 bg-slate-950 rounded border border-slate-900 flex justify-between items-center text-xs">
                    <div>
                      <span className="text-[10px] text-slate-550 block uppercase">Friction Radius</span>
                      <span className="text-white font-bold">{cmPer360} cm / 360°</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-slate-550 block uppercase">Deadzone Margin</span>
                      <span className="text-green-400 font-bold">&lt; 25 px/s</span>
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

        {/* Gameplay container */}
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


            {/* Hit/Miss alerts feedback overlay */}
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
            <span>🖱 Click targets ONLY when velocity drops to 0 (AD keys counter-strafe).</span>
            <span>• Press <kbd className="px-1.5 py-0.5 bg-slate-900 border border-slate-800 text-slate-350 rounded font-sans text-[10px]">ESC</kbd> to unlock.</span>
          </div>
        </div>

        {/* Game Over Screen */}
        {gameState === 'gameOver' && (
          <div className="absolute inset-0 bg-[#080d1a]/95 flex items-center justify-center p-6 z-30 overflow-y-auto">
            <div className="bg-[#0c1224]/85 border border-red-500/20 rounded-xl p-8 backdrop-blur-md max-w-3xl mx-auto w-full shadow-2xl">
              <h2 className="text-xl font-bold text-red-500 text-center mb-6 uppercase tracking-widest flex items-center justify-center gap-2 animate-pulse">
                <Award className="w-5 h-5 text-yellow-500" />
                S+ COGNITIVE DECOMPRESSION RESOLVED
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
                      <span className="text-[10px] text-slate-550 block uppercase">Accuracy</span>
                      <span className="text-white font-bold text-sm">{accuracy}%</span>
                    </div>
                    <div className="bg-slate-950 p-3 rounded border border-slate-900 text-center">
                      <span className="text-[10px] text-slate-550 block uppercase">Best Streak</span>
                      <span className="text-white font-bold text-sm">{bestCombo} Hits</span>
                    </div>
                  </div>

                  <div className="bg-slate-950 p-4 rounded border border-slate-900">
                    <div className="flex justify-between items-center text-xs mb-1">
                      <span className="text-slate-550 uppercase">Deadzone Fire Sync:</span>
                      <span className="text-green-400 font-bold">{analyticsData.deadzoneAccuracy}%</span>
                    </div>
                    <div className="text-[10px] text-slate-550 leading-normal">
                      Percentage of clicks executed while moving below 25px/s.
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-slate-950 p-4 rounded border border-slate-900">
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-900 pb-2 mb-3">
                      MECHANICAL TELEMETRY
                    </h4>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-slate-550">Deadzone Snaps:</span>
                        <span className="text-green-400 font-bold">{analyticsData.deadzoneShots}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-550">Movement Error Shots:</span>
                        <span className="text-red-400 font-bold">{analyticsData.totalShots - analyticsData.deadzoneShots}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-550">Flick Overshoots:</span>
                        <span className="text-yellow-500 font-bold">{analyticsData.overshoots}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-550">Flick Undershoots:</span>
                        <span className="text-blue-500 font-bold">{analyticsData.undershoots}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* S+ Coach Diagnostics */}
              <div className="bg-[#080d1a] border border-red-500/10 rounded-lg p-5 mb-8 text-left shadow-inner">
                <h3 className="text-xs font-bold text-red-500 font-mono uppercase tracking-widest border-b border-slate-800 pb-2 mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-red-500 animate-pulse" />
                  S+ AI COORDINATION ANALYST
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs leading-relaxed text-slate-350">
                  <div className="space-y-2 border-r border-slate-900 pr-6">
                    <p className="font-bold text-white uppercase text-[10px] tracking-wider font-mono">Sync Diagnostics:</p>
                    <ul className="space-y-2 list-disc pl-4">
                      {analyticsData.deadzoneAccuracy >= 85 ? (
                        <li className="text-green-400">🔥 S+ Strafe Sync: Exceptional index finger synchronization. Weapon spread was eliminated on {analyticsData.deadzoneAccuracy}% of trigger pulls.</li>
                      ) : (
                        <li className="text-red-400">⚠️ Strafe Slip: You are rushing your clicks ({100 - analyticsData.deadzoneAccuracy}% fired before braking). Release movement keys slightly earlier before shooting.</li>
                      )}
                      {analyticsData.overshoots > analyticsData.undershoots * 1.3 ? (
                        <li className="text-yellow-500">⚠️ Friction Offset: Cursor snaps drift past targets. Lower sens or increase mousepad friction.</li>
                      ) : (
                        <li className="text-green-400 font-mono">🔥 Snapping Angle: Ideal deceleration centering curves.</li>
                      )}
                    </ul>
                  </div>
                  <div className="space-y-3 flex flex-col justify-between">
                    <div>
                      <p className="font-bold text-white uppercase text-[10px] tracking-wider font-mono mb-1">Global Pro Advice:</p>
                      <p className="text-slate-350 font-sans leading-relaxed">
                        {analyticsData.deadzoneAccuracy >= 85 
                          ? "Your counter-strafing deadzone click timing is fully dialed in. Practice Valorant Headshot Snaps to maintain muscle memory across crouch peek variances."
                          : "To fix movement error, configure your keyboard triggers to a shallower actuation point (0.2mm) or practice jiggle peeking without clicking to build stop synchronization."}
                      </p>
                    </div>
                    <div className="pt-1">
                      <span className="inline-block bg-red-950/40 text-red-500 px-3 py-1.5 rounded text-[10px] font-mono font-bold uppercase border border-red-550/20 shadow-md">
                        S+ PERFORMANCE RANK: {score >= 3000 ? "GRANDMASTER" : score >= 1500 ? "MASTER" : "CONTENDER"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Back actions */}
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
                    className="w-full sm:w-auto px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition shadow-lg shadow-red-500/20"
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

      </div>
    </div>
  );
}
