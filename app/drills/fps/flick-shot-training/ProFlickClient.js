'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { COACHES, getActiveCoach, getCoachResponse, speakCoachText, handleCoachFeedback } from '../../../../lib/coachVoice';
import Link from 'next/link';
import { recordDrillResult } from '../../../../lib/performanceTelemetry';
import { getAdaptiveParams } from '../../../../lib/adaptiveDifficulty';

import { 
  Target, Zap, Timer, Trophy, Heart, 
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, Eye,
  Info, Activity, Check, Crosshair,
  Lock, AlertCircle, RefreshCw, ArrowRight,
  GraduationCap, Lightbulb, TrendingUp, Clock, Star, Share2, Copy, Home, ChevronRight, Calculator, Sparkles,
  Play, Award
} from 'lucide-react';

const TARGET_DURATION_START = 850;
const TARGET_DURATION_END = 600;
const SPAWN_INTERVAL = 800;

export default function ProFlickClient() {
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
  const telemetryCanvasRef = useRef(null);
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
  const [timeLeft, setTimeLeft] = useState(60);
  const [bestReaction, setBestReaction] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [pointerLocked, setPointerLocked] = useState(false);
  const [dpi, setDpi] = useState(800);
  const [inGameSens, setInGameSens] = useState(0.35);
  const [gameType, setGameType] = useState('valorant');
  const [cmPer360, setCmPer360] = useState(0);
  const sensitivityMultiplierRef = useRef(1);
  const [currentTargetSize, setCurrentTargetSize] = useState(40);
  const [currentTargetDuration, setCurrentTargetDuration] = useState(TARGET_DURATION_START);

  const [analyticsData, setAnalyticsData] = useState({
    overshoots: 0, undershoots: 0, totalShots: 0,
    reactionTimes: [], pathEfficiency: 0, averageDeviation: 0
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
  const timeLeftRef = useRef(60);
  const hitsRef = useRef(0);
  const missesRef = useRef(0);
  const bestComboRef = useRef(0);
  const currentTargetDurationRef = useRef(TARGET_DURATION_START);
  const movementHistoryRef = useRef([]);
  const crosshairInitializedRef = useRef(false);
  const crosshairHistoryRef = useRef([]);
  const shakeTimeRef = useRef(0);
  const flashOpacityRef = useRef(0);
  const lastFlashTimeRef = useRef(0);
  const nextFlashIntervalRef = useRef(12000 + Math.random() * 8000);
  
  const [fovSimulator, setFovSimulator] = useState(false);
  const [fovAngle, setFovAngle] = useState(103);
  const cameraYawRef = useRef(0);
  const cameraPitchRef = useRef(0);
  const shotLogRef = useRef([]);

  // S+ AI Coach Performance Tracking & Sensitivity Auto-Adjustment States
  const [activeCoach, setActiveCoach] = useState(null);
  const [coachSubtitle, setCoachSubtitle] = useState('');
  const [coachSpeaking, setCoachSpeaking] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [sensAdjustedAlert, setSensAdjustedAlert] = useState(null);
  const [activePlaylist, setActivePlaylist] = useState(null);
  const [playlistStep, setPlaylistStep] = useState(0);

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


  useEffect(() => {
    try {
      const s = localStorage.getItem('proFlickBestScore');
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
      
      const savedFovSim = localStorage.getItem('fovSimulator');
      if (savedFovSim) {
        setFovSimulator(savedFovSim === 'true');
      }
      const savedFovAngle = localStorage.getItem('fovAngle');
      if (savedFovAngle) {
        setFovAngle(parseInt(savedFovAngle, 10));
      }
      
      const savedPlaylist = sessionStorage.getItem('esportsPlaylist');
      if (savedPlaylist) {
        setActivePlaylist(JSON.parse(savedPlaylist));
        setPlaylistStep(parseInt(sessionStorage.getItem('esportsPlaylistStep') || '0', 10));
      }
    } catch (e) {}
  }, []);
  
  useEffect(() => { gameStateRef.current = gameState; }, [gameState]);

  // Compute sens & game type parameters
  useEffect(() => {
    const yaw = GAME_YAWS[gameType] || 0.07;
    const counts = 360 / (yaw * inGameSens);
    const inches = counts / dpi;
    const cm = inches * 2.54;
    setCmPer360(cm.toFixed(1));
    
    sensitivityMultiplierRef.current = 51.4 / cm;
    
    // Set visual target size based on selected gameType
    if (gameType === 'valorant' || gameType === 'cs2') {
      setCurrentTargetSize(22); // headshot size
    } else if (gameType === 'apex' || gameType === 'overwatch') {
      setCurrentTargetSize(50); // body tracking size
    } else {
      setCurrentTargetSize(32); // mid size
    }
  }, [dpi, inGameSens, gameType]);

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
      const f = { success: 980, fail: 440, combo: 1200, penalty: 200 }; 
      o.frequency.setValueAtTime(f[type] || 440, now); 
      g.gain.setValueAtTime(type==='combo'?0.12:type==='penalty'?0.15:0.1, now); 
      g.gain.exponentialRampToValueAtTime(0.001, now+0.15); 
      o.start(now); o.stop(now+0.15); 
    } catch (e) {} 
  }, [soundEnabled, initAudio]);

  const updateBestScore = useCallback((fs) => { 
    try { 
      const c = parseInt(localStorage.getItem('proFlickBestScore') || '0', 10); 
      if (fs > c) { 
        localStorage.setItem('proFlickBestScore', fs.toString()); 
        setBestScore(fs); 
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
        if (document.fullscreenElement) await document.exitFullscreen(); 
        setIsFullscreen(false); 
      } 
    } catch (e) {} 
  }, [isFullscreen]);

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
    const handlePointerChange = () => {
      const locked = document.pointerLockElement === canvasRef.current;
      setPointerLocked(locked);
      if (locked) {
        crosshairInitializedRef.current = true;
      }
    };
    document.addEventListener('pointerlockchange', handlePointerChange);
    return () => { document.removeEventListener('pointerlockchange', handlePointerChange); };
  }, []);

  // Pointer position tracker
  useEffect(() => {
    const handleRawMouse = (e) => {
      if (document.pointerLockElement !== canvasRef.current) return;
      const sens = sensitivityMultiplierRef.current;
      const dx = (e.movementX || 0) * sens;
      const dy = (e.movementY || 0) * sens;
      const now = performance.now();
      
      movementHistoryRef.current.push({ x: dx, y: dy, timestamp: now });
      movementHistoryRef.current = movementHistoryRef.current.filter(m => now - m.timestamp < 500);
      
      const c = canvasRef.current;
      if (!c) return;
      const cx = c.width / 2;
      const cy = c.height / 2;
      
      const is3D = localStorage.getItem('fovSimulator') === 'true';
      
      if (is3D) {
        // Find current game yaw degree per count
        const yawRate = GAME_YAWS[gameType] || 0.022;
        const sensScale = parseFloat(inGameSens) || 1.0;
        
        const dYaw = (e.movementX || 0) * sensScale * yawRate * (Math.PI / 180);
        const dPitch = (e.movementY || 0) * sensScale * yawRate * (Math.PI / 180);
        
        cameraYawRef.current += dYaw;
        cameraPitchRef.current -= dPitch;
        
        const maxPitch = 89 * Math.PI / 180;
        cameraPitchRef.current = Math.max(-maxPitch, Math.min(maxPitch, cameraPitchRef.current));
        
        virtualCrosshair.current.x = cx;
        virtualCrosshair.current.y = cy;
        
        crosshairHistoryRef.current.push({ yaw: cameraYawRef.current, pitch: cameraPitchRef.current, is3D: true });
      } else {
        virtualCrosshair.current.x += dx;
        virtualCrosshair.current.y += dy;
        virtualCrosshair.current.x = Math.max(0, Math.min(c.width, virtualCrosshair.current.x));
        virtualCrosshair.current.y = Math.max(0, Math.min(c.height, virtualCrosshair.current.y));
        
        crosshairHistoryRef.current.push({ x: virtualCrosshair.current.x, y: virtualCrosshair.current.y, is3D: false });
      }
      
      if (crosshairHistoryRef.current.length > 25) {
        crosshairHistoryRef.current.shift();
      }
    };
    document.addEventListener('mousemove', handleRawMouse);
    return () => document.removeEventListener('mousemove', handleRawMouse);
  }, [inGameSens, gameType]);

  const calculateTargetDuration = useCallback((tr) => {
    const progress = (60 - tr) / 60;
    return Math.round(TARGET_DURATION_START - (progress * (TARGET_DURATION_START - TARGET_DURATION_END)));
  }, []);

  function spawnTarget() {
    const c = canvasRef.current; if (!c) return null;
    const pad = currentTargetSize;
    
    const is3D = localStorage.getItem('fovSimulator') === 'true';
    if (is3D) {
      const activeFov = parseInt(localStorage.getItem('fovAngle') || '103', 10);
      const yawRange = (activeFov * Math.PI / 180) * 0.6;
      const pitchRange = (activeFov * (c.height / c.width) * Math.PI / 180) * 0.6;
      
      let vyaw = 0;
      let vpitch = 0;
      if (gameType === 'apex' || gameType === 'overwatch') {
        vyaw = (Math.random() - 0.5) * 0.25;
        vpitch = (Math.random() - 0.5) * 0.25;
      }
      
      return {
        x3d: cameraYawRef.current + (Math.random() - 0.5) * yawRange,
        y3d: cameraPitchRef.current + (Math.random() - 0.5) * pitchRange,
        vyaw,
        vpitch,
        x: 0,
        y: 0,
        startTime: performance.now()
      };
    } else {
      let vx = 0;
      let vy = 0;
      if (gameType === 'apex' || gameType === 'overwatch') {
        vx = (Math.random() - 0.5) * 110;
        vy = (Math.random() - 0.5) * 110;
      }
      
      return { 
        x: Math.random() * (c.width - pad * 2) + pad, 
        y: Math.random() * (c.height - pad * 2) + pad, 
        vx,
        vy,
        startTime: performance.now() 
      };
    }
  }

  const analyzeShot = useCallback((targetPos, clickPos, reactionTime) => {
    const distance = Math.hypot(clickPos.x - targetPos.x, clickPos.y - targetPos.y);
    setAnalyticsData(prev => {
      const newData = { ...prev };
      newData.totalShots++;
      if (distance <= currentTargetSize / 2) {
        newData.reactionTimes = [...prev.reactionTimes, reactionTime].slice(-50);
      } else {
        if (distance < currentTargetSize / 2) newData.undershoots++;
        else newData.overshoots++;
      }
      newData.averageDeviation = ((prev.averageDeviation * (prev.totalShots)) + distance) / (prev.totalShots + 1);
      const pathLength = movementHistoryRef.current.reduce((acc, move, i, arr) => { if (i === 0) return acc; return acc + Math.hypot(move.x - arr[i-1].x, move.y - arr[i-1].y); }, 0);
      newData.pathEfficiency = Math.hypot(clickPos.x - targetPos.x, clickPos.y - targetPos.y) / (pathLength || 1);
      return newData;
    });
  }, [currentTargetSize]);

  const handleShot = useCallback(() => {
    if (gameStateRef.current !== 'playing' || !isActiveRef.current || !crosshairInitializedRef.current) return;
    const currentTarget = targetRef.current;
    const now = performance.now();
    const clickPos = { ...virtualCrosshair.current };
    
    if (currentTarget) {
      const elapsed = now - currentTarget.startTime;
      const currentDuration = currentTargetDurationRef.current;
      const distance = Math.hypot(currentTarget.x - clickPos.x, currentTarget.y - clickPos.y);
      const wasHit = distance < currentTargetSize / 2 && elapsed < currentDuration;
      
      // Log telemetry path for diagnostics
      const c = canvasRef.current;
      if (c) {
        const cx = c.width / 2;
        const cy = c.height / 2;
        const is3D = localStorage.getItem('fovSimulator') === 'true';
        
        const path = crosshairHistoryRef.current.map(p => {
          if (is3D && p.is3D) {
            const yawRate = GAME_YAWS[gameType] || 0.022;
            const fovScale = cx / Math.tan(((fovAngle || 103) * Math.PI / 180) / 2);
            const rx = cx + (p.yaw - currentTarget.x3d) * fovScale;
            const ry = cy - (p.pitch - currentTarget.y3d) * fovScale;
            return { x: rx, y: ry };
          } else {
            return { x: p.x || cx, y: p.y || cy };
          }
        });
        
        shotLogRef.current.push({
          targetX: currentTarget.x,
          targetY: currentTarget.y,
          clickX: clickPos.x,
          clickY: clickPos.y,
          wasHit,
          path
        });
      }
      
      if (elapsed < currentDuration) {
        if (distance < currentTargetSize / 2) {
          scoreRef.current += 1; setScore(scoreRef.current);
          hitsRef.current++; setSuccessfulHits(hitsRef.current);
          comboRef.current++; setCombo(comboRef.current);
          if (comboRef.current > bestComboRef.current) { bestComboRef.current = comboRef.current; setBestCombo(comboRef.current); }
          if (bestReaction === 0 || elapsed < bestReaction) setBestReaction(Math.round(elapsed));
          playSound('success'); 
          if (typeof checkSensitivityAdjustment === 'function') checkSensitivityAdjustment('hit');
          
          if (comboRef.current % 5 === 0) { 
            playSound('combo'); 
          }
          targetRef.current = null;
          analyzeShot(currentTarget, clickPos, elapsed);
        } else {
          missesRef.current++; setMissedHits(missesRef.current);
          comboRef.current = 0; setCombo(0);
          playSound('fail'); 
          if (typeof checkSensitivityAdjustment === 'function') checkSensitivityAdjustment('miss', { dist: distance, targetSize: currentTargetSize / 2 });
          targetRef.current = null;
          analyzeShot(currentTarget, clickPos, elapsed);
        }
      } else {
        comboRef.current = 0; setCombo(0);
        missesRef.current++; setMissedHits(missesRef.current);
        playSound('fail'); 
        if (typeof checkSensitivityAdjustment === 'function') checkSensitivityAdjustment('miss', { dist: distance, targetSize: currentTargetSize / 2 });
        targetRef.current = null;
      }
      
      // Perform AI Fatigue Alert check if we have enough shots logged
      if (analyticsData.reactionTimes.length >= 10) {
        const times = analyticsData.reactionTimes;
        const recent = times.slice(-5);
        const early = times.slice(0, 5);
        const avgRecent = recent.reduce((a,b) => a+b, 0) / 5;
        const avgEarly = early.reduce((a,b) => a+b, 0) / 5;
        
        if (avgRecent > avgEarly + 45) {
          speakText("Aim decay detected. Reaction speed is slipping. Check wrist posture.", true);
        }
      }
    } else {
      comboRef.current = 0; setCombo(0);
      missesRef.current++; setMissedHits(missesRef.current);
      playSound('fail'); 
      if (typeof checkSensitivityAdjustment === 'function') checkSensitivityAdjustment('miss', { dist: 999, targetSize: currentTargetSize / 2 });
    }
  }, [playSound, analyzeShot, bestReaction, currentTargetSize, gameType, speakText, analyticsData.reactionTimes, checkSensitivityAdjustment]);

  useEffect(() => {
    const handleMouseDown = (e) => {
      if (e.target.tagName === 'BUTTON' || e.target.closest('button')) return;
      if (gameState === 'playing' && document.pointerLockElement) { 
        e.preventDefault(); 
        handleShot(); 
      }
    };
    document.addEventListener('mousedown', handleMouseDown);
    return () => document.removeEventListener('mousedown', handleMouseDown);
  }, [gameState, handleShot]);

  const startTimer = useCallback(() => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    timerIntervalRef.current = setInterval(() => {
      if (gameStateRef.current === 'playing' && isActiveRef.current) {
        timeLeftRef.current -= 1; setTimeLeft(timeLeftRef.current);
        currentTargetDurationRef.current = calculateTargetDuration(timeLeftRef.current);
        setCurrentTargetDuration(currentTargetDurationRef.current);
        if (timeLeftRef.current <= 0) {
          clearInterval(timerIntervalRef.current); timerIntervalRef.current = null;
          setGameState('gameOver'); gameStateRef.current = 'gameOver'; isActiveRef.current = false;
          const total = hitsRef.current + missesRef.current;
          setAccuracy(total === 0 ? 100 : Math.round((hitsRef.current / total) * 100));
          updateBestScore(scoreRef.current);
    // Record telemetry for AI coaching system
    try {
      recordDrillResult('pro-flick', {
        score: scoreRef.current,
        accuracy: accuracy,
        reactionTimeMs: avgReaction || null,
        trackingAccuracy: null,
        comboMax: bestCombo,
        overshoots: analyticsData.overshoots || 0,
        undershoots: analyticsData.undershoots || 0,
        sensitivity: inGameSens,
        dpi,
        gameType,
        duration: 60
      });
    } catch (e) {}

          document.exitPointerLock();
        }
      }
    }, 1000);
  }, [updateBestScore, calculateTargetDuration]);

  useEffect(() => {
    if (gameState !== 'playing') return;
    const cvs = canvasRef.current; if (!cvs) return;
    const ctx = cvs.getContext('2d');
    
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
      cvs.style.left = `${(rr.width-w)/2}px`;
      cvs.style.top = `${(rr.height-h)/2}px`;
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
      
      const is3D = localStorage.getItem('fovSimulator') === 'true';
      const cx = cvs.width / 2;
      const cy = cvs.height / 2;
      const fovScale = cx / Math.tan(((fovAngle || 103) * Math.PI / 180) / 2);
      const cameraYaw = cameraYawRef.current;
      const cameraPitch = cameraPitchRef.current;
      
      ctx.fillStyle = "#050508";
      ctx.fillRect(0, 0, cvs.width, cvs.height);
      
      if (is3D) {
        // Draw 3D Spherical Coordinate Grid lines
        ctx.strokeStyle = 'rgba(0, 255, 136, 0.04)';
        ctx.lineWidth = 1;
        
        // Latitude lines (pitch constant)
        for (let p = -80; p <= 80; p += 10) {
          const pitchRad = p * Math.PI / 180;
          ctx.beginPath();
          let first = true;
          const yawMin = cameraYaw - ((fovAngle || 103) * Math.PI / 180) * 0.9;
          const yawMax = cameraYaw + ((fovAngle || 103) * Math.PI / 180) * 0.9;
          const step = (yawMax - yawMin) / 20;
          
          for (let yVal = yawMin; yVal <= yawMax; yVal += step) {
            const tx = Math.cos(pitchRad) * Math.sin(yVal);
            const ty = Math.sin(pitchRad);
            const tz = Math.cos(pitchRad) * Math.cos(yVal);
            
            const ry_x = tx * Math.cos(-cameraYaw) - tz * Math.sin(-cameraYaw);
            const ry_y = ty;
            const ry_z = tx * Math.sin(-cameraYaw) + tz * Math.cos(-cameraYaw);
            
            const r_x = ry_x;
            const r_y = ry_y * Math.cos(-cameraPitch) - ry_z * Math.sin(-cameraPitch);
            const r_z = ry_y * Math.sin(-cameraPitch) + ry_z * Math.cos(-cameraPitch);
            
            if (r_z > 0.1) {
              const px = cx + (r_x / r_z) * fovScale;
              const py = cy - (r_y / r_z) * fovScale;
              if (first) {
                ctx.moveTo(px, py);
                first = false;
              } else {
                ctx.lineTo(px, py);
              }
            } else {
              first = true;
            }
          }
          ctx.stroke();
        }

        // Longitude lines (yaw constant)
        const yawInterval = 15 * Math.PI / 180;
        const yawStart = Math.floor((cameraYaw - ((fovAngle || 103) * Math.PI / 180) * 0.9) / yawInterval) * yawInterval;
        const yawEnd = Math.ceil((cameraYaw + ((fovAngle || 103) * Math.PI / 180) * 0.9) / yawInterval) * yawInterval;
        
        for (let yVal = yawStart; yVal <= yawEnd; yVal += yawInterval) {
          ctx.beginPath();
          let first = true;
          const pitchMin = -70 * Math.PI / 180;
          const pitchMax = 70 * Math.PI / 180;
          const step = (pitchMax - pitchMin) / 15;
          
          for (let pVal = pitchMin; pVal <= pitchMax; pVal += step) {
            const tx = Math.cos(pVal) * Math.sin(yVal);
            const ty = Math.sin(pVal);
            const tz = Math.cos(pVal) * Math.cos(yVal);
            
            const ry_x = tx * Math.cos(-cameraYaw) - tz * Math.sin(-cameraYaw);
            const ry_y = ty;
            const ry_z = tx * Math.sin(-cameraYaw) + tz * Math.cos(-cameraYaw);
            
            const r_x = ry_x;
            const r_y = ry_y * Math.cos(-cameraPitch) - ry_z * Math.sin(-cameraPitch);
            const r_z = ry_y * Math.sin(-cameraPitch) + ry_z * Math.cos(-cameraPitch);
            
            if (r_z > 0.1) {
              const px = cx + (r_x / r_z) * fovScale;
              const py = cy - (r_y / r_z) * fovScale;
              if (first) {
                ctx.moveTo(px, py);
                first = false;
              } else {
                ctx.lineTo(px, py);
              }
            } else {
              first = true;
            }
          }
          ctx.stroke();
        }
      } else {
        ctx.strokeStyle = 'rgba(255,255,255,0.02)';
        ctx.lineWidth = 1;
        for (let i = 0; i < cvs.width; i += 40) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, cvs.height); ctx.stroke(); }
      }
      
      if (!targetRef.current && gameStateRef.current === 'playing') {
        if (ct - lastSpawnTimeRef.current >= SPAWN_INTERVAL) {
          targetRef.current = spawnTarget();
          lastSpawnTimeRef.current = ct;
        }
      }
      
      if (targetRef.current) {
        const t = targetRef.current;
        const elapsed = ct - t.startTime;
        const dur = currentTargetDurationRef.current;
        
        if (is3D) {
          // Angular drift updating
          t.x3d += (t.vyaw || 0) * dt;
          t.y3d += (t.vpitch || 0) * dt;
          
          // Project to 2D screen coordinates
          const tx = Math.cos(t.y3d) * Math.sin(t.x3d);
          const ty = Math.sin(t.y3d);
          const tz = Math.cos(t.y3d) * Math.cos(t.x3d);

          const ry_x = tx * Math.cos(-cameraYaw) - tz * Math.sin(-cameraYaw);
          const ry_y = ty;
          const ry_z = tx * Math.sin(-cameraYaw) + tz * Math.cos(-cameraYaw);

          const r_x = ry_x;
          const r_y = ry_y * Math.cos(-cameraPitch) - ry_z * Math.sin(-cameraPitch);
          const r_z = ry_y * Math.sin(-cameraPitch) + ry_z * Math.cos(-cameraPitch);

          if (r_z > 0.1) {
            t.x = cx + (r_x / r_z) * fovScale;
            t.y = cy - (r_y / r_z) * fovScale;
            t.sizeMultiplier = Math.max(0.4, Math.min(1.8, 1.0 / r_z));
          } else {
            t.x = -9999;
            t.y = -9999;
            t.sizeMultiplier = 0.01;
          }
        } else {
          t.x += t.vx * dt;
          t.y += t.vy * dt;
          
          if (t.x - currentTargetSize/2 < 0 || t.x + currentTargetSize/2 > cvs.width) {
            t.vx *= -1;
          }
          if (t.y - currentTargetSize/2 < 0 || t.y + currentTargetSize/2 > cvs.height) {
            t.vy *= -1;
          }
          t.sizeMultiplier = 1.0;
        }

        if (elapsed < dur) {
          const opacity = Math.max(0.3, 1 - (elapsed/dur) * 0.7);
          const size = currentTargetSize * (t.sizeMultiplier || 1.0);
          
          ctx.shadowBlur = 15; ctx.shadowColor = "#00ff88";
          ctx.fillStyle = `rgba(255,255,255,${opacity})`;
          ctx.beginPath(); ctx.arc(t.x, t.y, size/2, 0, Math.PI*2); ctx.fill();
          ctx.shadowBlur = 0;
          
          ctx.beginPath(); ctx.arc(t.x, t.y, size/2 * 0.6, 0, Math.PI*2);
          ctx.strokeStyle = `rgba(0,255,136,${opacity * 0.3})`; ctx.lineWidth = 2; ctx.stroke();
          
          ctx.beginPath(); ctx.arc(t.x, t.y, size/6, 0, Math.PI*2);
          ctx.fillStyle = `rgba(0,0,0,${opacity})`; ctx.fill();
        } else targetRef.current = null;
      }

      // Draw Trajectory Trail
      const history = crosshairHistoryRef.current;
      if (history.length > 1) {
        ctx.beginPath();
        let first = true;
        for (let idx = 0; idx < history.length; idx++) {
          const p = history[idx];
          if (is3D && p.is3D) {
            const rx = cx + (p.yaw - cameraYaw) * fovScale;
            const ry = cy - (p.pitch - cameraPitch) * fovScale;
            if (first) {
              ctx.moveTo(rx, ry);
              first = false;
            } else {
              ctx.lineTo(rx, ry);
            }
          } else if (!is3D && !p.is3D) {
            if (first) {
              ctx.moveTo(p.x, p.y);
              first = false;
            } else {
              ctx.lineTo(p.x, p.y);
            }
          }
        }
        ctx.strokeStyle = 'rgba(0, 255, 136, 0.4)';
        ctx.lineWidth = 2;
        ctx.stroke();
      }
      
      const ch = virtualCrosshair.current;
      if (ch.x > 0 && ch.x < cvs.width && ch.y > 0 && ch.y < cvs.height) {
        ctx.strokeStyle = pointerLocked ? "#00ff88" : "#ffbb00";
        ctx.lineWidth = 2;
        ctx.beginPath(); ctx.arc(ch.x, ch.y, 12, 0, Math.PI*2); ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(ch.x-24, ch.y); ctx.lineTo(ch.x-10, ch.y);
        ctx.moveTo(ch.x+10, ch.y); ctx.lineTo(ch.x+24, ch.y);
        ctx.moveTo(ch.x, ch.y-24); ctx.lineTo(ch.x, ch.y-10);
        ctx.moveTo(ch.x, ch.y+10); ctx.lineTo(ch.x, ch.y+24);
        ctx.stroke();
        ctx.fillStyle = pointerLocked ? "#00ff88" : "#ffbb00";
        ctx.beginPath(); ctx.arc(ch.x, ch.y, 3, 0, Math.PI*2); ctx.fill();
      }
      
      if (!pointerLocked) {
        ctx.fillStyle = 'rgba(8, 13, 26, 0.85)';
        ctx.fillRect(cvs.width / 2 - 180, cvs.height / 2 - 25, 360, 50);
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(cvs.width / 2 - 180, cvs.height / 2 - 25, 360, 50);
        
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 12px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('CLICK CANVAS TO CAPTURE RAW MOUSE INPUT', cvs.width / 2, cvs.height / 2 + 4);
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
  }, [gameState, pointerLocked, currentTargetSize, gameType, fovSimulator, fovAngle]);

  const startGame = useCallback(() => {
    // Get adaptive difficulty parameters
    const adaptive = getAdaptiveParams('pro-flick');

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
    
    setAnalyticsData({ overshoots: 0, undershoots: 0, totalShots: 0, reactionTimes: [], pathEfficiency: 0, averageDeviation: 0 });
    cameraYawRef.current = 0;
    cameraPitchRef.current = 0;
    shotLogRef.current = [];
    setGameState('playing'); gameStateRef.current = 'playing';
    setScore(0); setSuccessfulHits(0); setMissedHits(0); setCombo(0); setBestCombo(0);
    timeLeftRef.current = 60; setTimeLeft(60); setBestReaction(0); setAccuracy(100);
    isActiveRef.current = true; scoreRef.current = 0; comboRef.current = 0; bestComboRef.current = 0;
    hitsRef.current = 0; missesRef.current = 0;
    targetRef.current = null; lastSpawnTimeRef.current = performance.now();
    currentTargetDurationRef.current = TARGET_DURATION_START; setCurrentTargetDuration(TARGET_DURATION_START);
    crosshairInitializedRef.current = false; movementHistoryRef.current = [];
    
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

  const avgReaction = analyticsData.reactionTimes.length > 0 ? Math.round(analyticsData.reactionTimes.reduce((a,b) => a+b, 0) / analyticsData.reactionTimes.length) : 0;

  useEffect(() => {
    if (gameState !== 'gameOver') return;
    const canvas = telemetryCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 280;
    canvas.height = 200;
    const tcx = canvas.width / 2;
    const tcy = canvas.height / 2;

    ctx.fillStyle = '#050811';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, tcy);
    ctx.lineTo(canvas.width, tcy);
    ctx.moveTo(tcx, 0);
    ctx.lineTo(tcx, canvas.height);
    ctx.stroke();

    const r = currentTargetSize / 2;
    ctx.beginPath();
    ctx.arc(tcx, tcy, r, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(0, 255, 136, 0.3)';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillStyle = 'rgba(0, 255, 136, 0.05)';
    ctx.fill();

    const logs = shotLogRef.current || [];
    logs.forEach((log) => {
      if (log.path && log.path.length > 1) {
        ctx.beginPath();
        let first = true;
        log.path.forEach((pt) => {
          const px = tcx + (pt.x - log.targetX);
          const py = tcy + (pt.y - log.targetY);
          if (first) {
            ctx.moveTo(px, py);
            first = false;
          } else {
            ctx.lineTo(px, py);
          }
        });
        ctx.strokeStyle = log.wasHit ? 'rgba(0, 255, 136, 0.15)' : 'rgba(239, 68, 68, 0.15)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      const cx_norm = tcx + (log.clickX - log.targetX);
      const cy_norm = tcy + (log.clickY - log.targetY);
      ctx.beginPath();
      ctx.arc(cx_norm, cy_norm, 3, 0, Math.PI * 2);
      ctx.fillStyle = log.wasHit ? '#00ff88' : '#ef4444';
      ctx.fill();
    });
  }, [gameState, currentTargetSize]);

  return (
    <div ref={pageRef} className="min-h-screen select-none font-mono bg-[#080d1a] text-slate-100 relative overflow-hidden">
      
      {/* Background patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-950/15 via-[#080d1a] to-[#080d1a] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,136,0.03)_1px,_transparent_1px),_linear-gradient(90deg,_rgba(0,255,136,0.03)_1px,_transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />
      
      <div className={`${isFullscreen ? 'w-full h-screen p-0 m-0' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'} relative z-10`}>
        
        {!isFullscreen && (
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-2 text-[10px] text-slate-400 uppercase tracking-widest">
              <li><Link href="/" className="hover:text-red-400 transition-colors"><Home className="w-3.5 h-3.5" /></Link></li>
              <li><ChevronRight className="w-3 h-3 text-slate-700" /></li>
              <li><Link href="/drills/fps" className="hover:text-red-400 transition-colors">FPS Sector</Link></li>
              <li><ChevronRight className="w-3 h-3 text-slate-700" /></li>
              <li><span className="text-red-400 font-bold">Pro Flick Trainer</span></li>
            </ol>
          </nav>
        )}
        
        {!isFullscreen && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 border-b border-slate-900 pb-5">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-950/30 border border-green-500/20 text-green-400 rounded-xl">
                <Crosshair className="w-7 h-7 animate-pulse" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white uppercase bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                  Pro Flick Trainer
                </h1>
                <p className="text-xs text-slate-400 tracking-wider mt-0.5">
                  {pointerLocked ? '🟢 RAW INPUT CAPTURING' : '🔴 CLICK CANVAS TO CAPTURE'} • {cmPer360} cm/360 • {gameType.toUpperCase()}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setSoundEnabled(!soundEnabled)} className="p-2 rounded-lg border border-slate-800 bg-[#0c1224] text-slate-350 hover:border-slate-700 transition" title="Sound">{soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}</button>
              <button onClick={toggleFullscreen} className="p-2 rounded-lg border border-slate-800 bg-[#0c1224] text-slate-350 hover:border-slate-700 transition" title="Fullscreen">{isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}</button>
            </div>
          </div>
        )}

        {/* HUD Stats Bar (always visible during gameplay) */}
        {gameState === 'playing' && (
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20 flex gap-4 bg-[#0c1224]/90 border border-slate-800 rounded-lg px-4 py-2 backdrop-blur-md">
            <div className="flex items-center gap-2 text-xs">
              <Timer className="w-3.5 h-3.5 text-yellow-400" />
              <span className="text-white font-bold">{timeLeft}s</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <Target className="w-3.5 h-3.5 text-green-400" />
              <span className="text-white font-bold">{score}</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <Zap className="w-3.5 h-3.5 text-purple-400" />
              <span className="text-white font-bold">{combo}x</span>
            </div>
          </div>
        )}

        {/* Start Game Screen */}
        {gameState === 'start' && (
          <div className="absolute inset-0 bg-[#080d1a]/95 flex items-center justify-center p-6 z-30 overflow-y-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            <div className="lg:col-span-1 bg-[#0c1224]/80 border border-slate-900 rounded-xl p-6 flex flex-col justify-between backdrop-blur-md">
              <div>
                <h3 className="text-sm font-bold text-green-400 mb-4 flex items-center gap-2 border-b border-slate-900 pb-2">
                  <Info className="w-4 h-4" />
                  DRILL MECHANICS
                </h3>
                <ul className="space-y-4 text-xs leading-relaxed text-slate-400">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 font-bold">1.</span>
                    <span>Random targets spawn on the screen with a decaying timer (850ms down to 600ms).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 font-bold">2.</span>
                    <span>Click and flick as fast as possible to hit the balls. Missing or clicking outside the window counts as a miss.</span>
                  </li>
                  <li className="flex items-start gap-2 text-green-300">
                    <span className="text-green-400 font-bold">★</span>
                    <span>**Esports calibration**: Game mode scales target size matching Valorant heads, Apex torso targets, and Fortnite builds.</span>
                  </li>
                </ul>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-900 text-[10px] text-slate-550 leading-normal">
                Perfects wrist mechanics and straight flick paths under strict timing.
              </div>
            </div>

            <div className="lg:col-span-2 bg-[#0c1224]/80 border border-slate-900 rounded-xl p-6 backdrop-blur-md flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2 border-b border-slate-900 pb-2">
                  <Calculator className="w-4 h-4 text-green-400" />
                  CALIBRATE AIM ENGINE
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  <div>
                    <label className="block text-[9px] text-slate-400 font-bold uppercase tracking-wider mb-2">Game Profile</label>
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
                      step="0.001"
                      value={inGameSens}
                      onChange={(e) => setInGameSens(Math.max(0.001, parseFloat(e.target.value) || 0.1))}
                      className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-2 text-xs text-white focus:outline-none focus:border-green-500/50"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] text-slate-400 font-bold uppercase tracking-wider mb-2">Mouse DPI</label>
                    <input 
                      type="number"
                      step="50"
                      value={dpi}
                      onChange={(e) => setDpi(Math.max(100, parseInt(e.target.value, 10) || 800))}
                      className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-2 text-xs text-white focus:outline-none focus:border-green-500/50"
                    />
                  </div>
                  </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 p-4 bg-slate-950/45 rounded border border-slate-900">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">3D FOV Simulator</label>
                      <span className="text-[9px] text-slate-500 block">Simulate true 3D spatial viewport</span>
                    </div>
                    <button
                      onClick={() => {
                        const newVal = !fovSimulator;
                        setFovSimulator(newVal);
                        localStorage.setItem('fovSimulator', newVal ? 'true' : 'false');
                      }}
                      className={`px-3 py-1.5 rounded font-mono font-bold uppercase text-[9px] border transition ${
                        fovSimulator
                          ? 'bg-green-950 text-green-400 border-green-500/35 shadow-md'
                          : 'bg-slate-900 border-slate-800 text-slate-500'
                      }`}
                    >
                      {fovSimulator ? 'ENABLED_3D' : 'DISABLED_2D'}
                    </button>
                  </div>
                  {fovSimulator && (
                    <div>
                      <label className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">
                        Simulation FOV: {fovAngle}°
                      </label>
                      <input
                        type="range"
                        min="60"
                        max="130"
                        value={fovAngle}
                        onChange={(e) => {
                          const val = parseInt(e.target.value, 10);
                          setFovAngle(val);
                          localStorage.setItem('fovAngle', val.toString());
                        }}
                        className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-green-500"
                      />
                    </div>
                  )}
                </div>

                <div className="p-4 bg-slate-950/80 rounded border border-slate-900 flex justify-between items-center text-xs">
                  <div>
                    <span className="text-[10px] text-slate-550 block uppercase">360° Distance</span>
                    <span className="text-white font-bold text-sm">{cmPer360} cm / 360°</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-550 block uppercase">Current Hitbox Size</span>
                    <span className="text-green-400 font-bold">{currentTargetSize} px Radius</span>
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
                  className="w-full sm:w-auto px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg text-sm flex items-center justify-center gap-2 shadow-lg shadow-green-500/25 uppercase tracking-wider transition animate-pulse"
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
          <div 
            ref={containerRef} 
            className={isFullscreen 
              ? "w-full h-full bg-[#050811] relative overflow-hidden flex items-center justify-center" 
              : "w-full aspect-video min-h-[400px] lg:min-h-[500px] bg-[#050811] border border-slate-800 rounded-xl relative overflow-hidden flex items-center justify-center"}
          >
            <canvas ref={canvasRef} onClick={handleCanvasClick} />
          </div>

          <div className="mt-4 text-center text-[10px] text-slate-550 flex items-center justify-center gap-4">
            <span>🖱 Click white targets as fast as they appear.</span>
            <span>• Hit targets before the visual timer ring shrinks.</span>
            <span>• Press <kbd className="px-1.5 py-0.5 bg-slate-900 border border-slate-800 text-slate-350 rounded font-sans text-[10px]">ESC</kbd> to return to lobby.</span>
          </div>
        </div>

        {/* Game Over Screen */}
        {gameState === 'gameOver' && (
          <div className="absolute inset-0 bg-[#080d1a]/95 flex items-center justify-center p-6 z-30 overflow-y-auto">
            <div className="bg-[#0c1224]/80 border border-slate-900 rounded-xl p-8 backdrop-blur-md max-w-3xl mx-auto">
            <h2 className="text-xl font-bold text-green-400 text-center mb-6 uppercase tracking-widest flex items-center justify-center gap-2">
              <Award className="w-5 h-5 text-yellow-500" />
              FLICK SESSION COMPLETED
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="space-y-4">
                <div className="bg-slate-950 p-4 rounded border border-slate-900">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-550 block uppercase">Final Flick Score:</span>
                    <span className="text-white font-bold text-xl">{score} PTS</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-950 p-3 rounded border border-slate-900 text-center">
                    <span className="text-[10px] text-slate-550 block uppercase">Hits</span>
                    <span className="text-white font-bold text-sm">{successfulHits}</span>
                  </div>
                  <div className="bg-slate-950 p-3 rounded border border-slate-900 text-center">
                    <span className="text-[10px] text-slate-550 block uppercase">Misses</span>
                    <span className="text-red-400 font-bold text-sm">{missedHits}</span>
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
                    <span className="text-slate-550 uppercase">Avg Reaction Time</span>
                    <span className="text-green-400 font-bold">{avgReaction} ms</span>
                  </div>
                  <div className="text-[10px] text-slate-550 leading-normal">
                    This tracks target spawn to hit duration. Competitive baseline is &lt;230ms.
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-slate-950 p-4 rounded border border-slate-900">
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-900 pb-2 mb-3">
                    SHOT PATH METRICS
                  </h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-550">Overshoots:</span>
                      <span className="text-red-400 font-bold">{analyticsData.overshoots}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-550">Undershoots:</span>
                      <span className="text-blue-400 font-bold">{analyticsData.undershoots}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-550">Path Efficiency:</span>
                      <span className="text-purple-400 font-bold">{Math.round(analyticsData.pathEfficiency * 100)}%</span>
                    </div>
                  </div>

                  <div className="bg-slate-950 p-4 rounded border border-slate-900 flex flex-col items-center">
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-900 pb-2 mb-3 w-full text-left">
                      AIM PATH SCANNER TELEMETRY
                    </h4>
                    <canvas ref={telemetryCanvasRef} className="border border-slate-900 rounded bg-[#050811] shadow-inner" style={{ width: '280px', height: '200px' }} />
                  </div>
                </div>
              </div>
            </div>

            {/* AI Coach Performance Diagnosis */}
            <div className="bg-[#080d1a] border border-slate-800 rounded-lg p-5 mb-8 text-left shadow-inner">
              <h3 className="text-xs font-bold text-green-400 font-mono uppercase tracking-widest border-b border-slate-800 pb-2 mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-green-500 animate-pulse" />
                AI COACH DIAGNOSTICS & RECOMMENDATION
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs leading-relaxed text-slate-350">
                <div className="space-y-2 border-r border-slate-900 pr-6">
                  <p className="font-bold text-white uppercase text-[10px] tracking-wider font-mono">Performance Index:</p>
                  <ul className="space-y-2 list-disc pl-4">
                    {analyticsData.overshoots > analyticsData.undershoots * 1.5 ? (
                      <li className="text-red-400">⚠️ Overshoot Penalty: You are sweeping past target boundaries. Actionable Advice: Pull down your in-game sensitivity slightly.</li>
                    ) : analyticsData.undershoots > analyticsData.overshoots * 1.5 ? (
                      <li className="text-blue-400">⚠️ Undershoot Penalty: You are halting flicks before target lock-on. Actionable Advice: Increase DPI or sensitivity scales.</li>
                    ) : (
                      <li className="text-green-400">🔥 Symmetrical Sweep: Well balanced mouse control. Excellent flick-stop mechanics.</li>
                    )}
                    {Math.round(analyticsData.pathEfficiency * 100) >= 80 ? (
                      <li className="text-green-400">🔥 Clean Pathing: Straight line mouse sweeps. Minimum excess trajectory drift.</li>
                    ) : (
                      <li className="text-slate-450">👤 Curve Error: You are drawing curves or hooks during clicks. Focus on straight, mechanical snaps.</li>
                    )}
                  </ul>
                </div>
                <div className="space-y-3 flex flex-col justify-between">
                  <div>
                    <p className="font-bold text-white uppercase text-[10px] tracking-wider font-mono mb-1">Prescribed Esports Routine:</p>
                    <p className="text-slate-350 leading-relaxed font-sans">
                      {analyticsData.overshoots > analyticsData.undershoots * 1.5 ? (
                        "Lower your sensitivity profile in small increments (e.g., -0.02 in Valorant). Spend 5 runs focusing exclusively on visual deceleration before firing."
                      ) : (
                        "Your speed sync is solid. Try practicing with CS2 or Valorant mode to force visual lock-on on smaller headshot volumes, keeping straight lines."
                      )}
                    </p>
                  </div>
                  <div className="pt-1">
                    <span className="inline-block bg-green-950/40 text-green-400 px-3 py-1.5 rounded text-[10px] font-mono font-bold uppercase border border-green-500/20 shadow-md">
                      FLICK PERFORMANCE INDEX: {Math.round(score * (accuracy / 100) * 10)} INDEX PTS
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
                  className="w-full sm:w-auto px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition"
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