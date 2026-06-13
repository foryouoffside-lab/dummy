'use client';

import { useState, useEffect, useRef, useCallback, useMemo, memo } from 'react';
import { COACHES, getActiveCoach, getCoachResponse, speakCoachText, handleCoachFeedback } from '../../../../lib/coachVoice';
import Link from 'next/link';
import { recordDrillResult } from '../../../../lib/performanceTelemetry';
import { getAdaptiveParams } from '../../../../lib/adaptiveDifficulty';
import { motion, AnimatePresence } from 'framer-motion';

import { 
  Target, Zap, Timer, Trophy, Heart, 
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, Eye,
  Info, Activity, Check, Crosshair,
  Lock, AlertCircle, RefreshCw, ArrowRight,
  GraduationCap, Lightbulb, TrendingUp, Clock, Star, Share2, Copy, Home, ChevronRight, Calculator, Sparkles,
  Play, Award, Settings, BarChart3, Cpu, Gauge, LineChart, X
} from 'lucide-react';

const TARGET_DURATION_START = 850;
const TARGET_DURATION_END = 600;
const SPAWN_INTERVAL = 800;
const GAME_DURATION = 60;

// Utility function for debouncing
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Performance optimized component sections
const StatsCard = memo(({ icon: Icon, label, value, color = 'green', subtitle }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-slate-900/50 border border-slate-800 rounded-lg p-4 backdrop-blur-sm"
  >
    <div className="flex items-center gap-3">
      <div className={`p-2 rounded-lg bg-${color}-500/10`}>
        <Icon className={`w-5 h-5 text-${color}-400`} />
      </div>
      <div>
        <p className="text-xs text-slate-400 uppercase tracking-wider">{label}</p>
        <p className="text-2xl font-bold text-white">{value}</p>
        {subtitle && <p className="text-xs text-slate-500 mt-1">{subtitle}</p>}
      </div>
    </div>
  </motion.div>
));

StatsCard.displayName = 'StatsCard';

export default function ProFlickClient() {
  const canvasRef = useRef(null);
  const telemetryCanvasRef = useRef(null);
  const animationRef = useRef(null);
  const containerRef = useRef(null);
  const pageRef = useRef(null);
  
  const [gameState, setGameState] = useState('start');
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
  const sensitivityMultiplierRef = useRef(universalSens);
  const fovSimulator = false;
  const setFovSimulator = () => {};
  const fovAngle = 103;
  const setFovAngle = () => {};
  const cameraYawRef = useRef(0);
  const cameraPitchRef = useRef(0);

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [successfulHits, setSuccessfulHits] = useState(0);
  const [missedHits, setMissedHits] = useState(0);
  const [combo, setCombo] = useState(0);
  const [bestCombo, setBestCombo] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [bestReaction, setBestReaction] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [pointerLocked, setPointerLocked] = useState(false);
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
  const timeLeftRef = useRef(GAME_DURATION);
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
  
  const shotLogRef = useRef([]);

  // S+ AI Coach Performance Tracking & Sensitivity Auto-Adjustment States
  const [activeCoach, setActiveCoach] = useState(null);
  const [coachSubtitle, setCoachSubtitle] = useState('');
  const [coachSpeaking, setCoachSpeaking] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [sensAdjustedAlert, setSensAdjustedAlert] = useState(null);
  const [activePlaylist, setActivePlaylist] = useState(null);
  const [playlistStep, setPlaylistStep] = useState(0);

  // Load saved settings
  useEffect(() => {
    try {
      const savedSens = localStorage.getItem('universalSens');
      if (savedSens) setUniversalSens(parseFloat(savedSens));
      
      const savedSound = localStorage.getItem('soundEnabled');
      if (savedSound) setSoundEnabled(savedSound === 'true');
      
      const savedBestScore = localStorage.getItem('proFlickBestScore');
      if (savedBestScore) {
        const parsed = parseInt(savedBestScore, 10);
        if (!isNaN(parsed)) setBestScore(parsed);
      }
      
      const savedPlaylist = sessionStorage.getItem('esportsPlaylist');
      if (savedPlaylist) {
        setActivePlaylist(JSON.parse(savedPlaylist));
        setPlaylistStep(parseInt(sessionStorage.getItem('esportsPlaylistStep') || '0', 10));
      }
    } catch (e) {
      console.warn('Failed to load saved data:', e);
    }
  }, []);

  // Auto-save user preferences with debounce
  const debouncedSave = useCallback(
    debounce((key, value) => {
      try {
        localStorage.setItem(key, value);
      } catch (e) {}
    }, 500),
    []
  );

  useEffect(() => {
    if (gameState === 'playing') return;
    debouncedSave('universalSens', universalSens.toString());
    debouncedSave('soundEnabled', soundEnabled.toString());
  }, [universalSens, soundEnabled, gameState, debouncedSave]);

  // Pointer Lock Safety Cleanup
  useEffect(() => {
    return () => {
      if (typeof document !== 'undefined' && document.pointerLockElement) {
        document.exitPointerLock();
      }
    };
  }, []);

  useEffect(() => { gameStateRef.current = gameState; }, [gameState]);

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
    const currentGameState = gameStateRef.current;
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
  }, [inGameSens, gameType, dpi, voiceEnabled]);

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
          await el.requestFullscreen().catch((e) => console.warn("Fullscreen request blocked", e)); 
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
    const handleRawMouse = (e) =>  {
      if (document.pointerLockElement !== canvasRef.current && !document.pointerLockElement) return;
      const dx = (e.movementX || 0) * universalSens;
      const dy = (e.movementY || 0) * universalSens;
      const c = canvasRef.current;
      if (c) {
        virtualCrosshair.current.x = Math.max(0, Math.min(c.width, virtualCrosshair.current.x + dx));
        virtualCrosshair.current.y = Math.max(0, Math.min(c.height, virtualCrosshair.current.y + dy));
      }
      const now = performance.now();
      movementHistoryRef.current.push({ x: dx, y: dy, timestamp: now });
      movementHistoryRef.current = movementHistoryRef.current.filter(m => now - m.timestamp < 500);
      
      crosshairHistoryRef.current.push({ x: virtualCrosshair.current.x, y: virtualCrosshair.current.y, is3D: false });
      if (crosshairHistoryRef.current.length > 25) {
        crosshairHistoryRef.current.shift();
      }
    };
    document.addEventListener('mousemove', handleRawMouse);
    return () => document.removeEventListener('mousemove', handleRawMouse);
  }, [universalSens]);

  const calculateTargetDuration = useCallback((tr) => {
    const progress = (GAME_DURATION - tr) / GAME_DURATION;
    return Math.round(TARGET_DURATION_START - (progress * (TARGET_DURATION_START - TARGET_DURATION_END)));
  }, []);

  function spawnTarget() {
    const c = canvasRef.current; if (!c) return null;
    const pad = currentTargetSize;
    
    let vx = 0;
    let vy = 0;
    
    return { 
      x: Math.random() * (c.width - pad * 2) + pad, 
      y: Math.random() * (c.height - pad * 2) + pad, 
      vx,
      vy,
      startTime: performance.now() 
    };
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
      const pathLength = movementHistoryRef.current.reduce((acc, move, i, arr) => { 
        if (i === 0) return acc; 
        return acc + Math.hypot(move.x - arr[i-1].x, move.y - arr[i-1].y); 
      }, 0);
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
      
      if (elapsed < currentDuration) {
        if (distance < currentTargetSize / 2) {
          scoreRef.current += 1; setScore(scoreRef.current);
          hitsRef.current++; setSuccessfulHits(hitsRef.current);
          comboRef.current++; setCombo(comboRef.current);
          if (comboRef.current > bestComboRef.current) { 
            bestComboRef.current = comboRef.current; 
            setBestCombo(comboRef.current); 
          }
          if (bestReaction === 0 || elapsed < bestReaction) setBestReaction(Math.round(elapsed));
          playSound('success'); 
          checkSensitivityAdjustment('hit');
          
          if (comboRef.current % 5 === 0) { 
            playSound('combo'); 
          }
          targetRef.current = null;
          analyzeShot(currentTarget, clickPos, elapsed);
        } else {
          missesRef.current++; setMissedHits(missesRef.current);
          comboRef.current = 0; setCombo(0);
          playSound('fail'); 
          checkSensitivityAdjustment('miss', { dist: distance, targetSize: currentTargetSize / 2 });
          targetRef.current = null;
          analyzeShot(currentTarget, clickPos, elapsed);
        }
      } else {
        comboRef.current = 0; setCombo(0);
        missesRef.current++; setMissedHits(missesRef.current);
        playSound('fail'); 
        targetRef.current = null;
      }
      
      // AI Fatigue Alert check
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
    }
  }, [playSound, analyzeShot, bestReaction, currentTargetSize, speakText, analyticsData.reactionTimes, checkSensitivityAdjustment]);

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
          
          // Record telemetry
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
              duration: GAME_DURATION
            });
          } catch (e) {}

          document.exitPointerLock();
        }
      }
    }, 1000);
  }, [updateBestScore, calculateTargetDuration, inGameSens, dpi, gameType, accuracy, bestCombo, analyticsData.overshoots, analyticsData.undershoots]);

  const avgReaction = useMemo(() => 
    analyticsData.reactionTimes.length > 0 
      ? Math.round(analyticsData.reactionTimes.reduce((a,b) => a+b, 0) / analyticsData.reactionTimes.length) 
      : 0,
    [analyticsData.reactionTimes]
  );

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
      
      ctx.fillStyle = "#050508";
      ctx.fillRect(0, 0, cvs.width, cvs.height);
      
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
        
        if (elapsed < dur) {
          const opacity = Math.max(0.3, 1 - (elapsed/dur) * 0.7);
          
          ctx.shadowBlur = 15; ctx.shadowColor = "#00ff88";
          ctx.fillStyle = `rgba(255,255,255,${opacity})`;
          ctx.beginPath(); ctx.arc(t.x, t.y, currentTargetSize/2, 0, Math.PI*2); ctx.fill();
          ctx.shadowBlur = 0;
          
          ctx.beginPath(); ctx.arc(t.x, t.y, currentTargetSize/2 * 0.6, 0, Math.PI*2);
          ctx.strokeStyle = `rgba(0,255,136,${opacity * 0.3})`; ctx.lineWidth = 2; ctx.stroke();
          
          ctx.beginPath(); ctx.arc(t.x, t.y, currentTargetSize/6, 0, Math.PI*2);
          ctx.fillStyle = `rgba(0,0,0,${opacity})`; ctx.fill();
        } else targetRef.current = null;
      }

      // Crosshair
      {
        const ch = virtualCrosshair.current;
        if (ch && ch.x > 0 && ch.x < cvs.width && ch.y > 0 && ch.y < cvs.height) {
          const activeColor = pointerLocked ? '#00ff88' : '#ffbb00';
          ctx.strokeStyle = activeColor;
          
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(ch.x, ch.y, 20, 0, Math.PI * 2);
          ctx.stroke();

          ctx.beginPath();
          ctx.lineWidth = 1.5;
          const innerGap = 8;
          ctx.moveTo(ch.x, ch.y - 20); ctx.lineTo(ch.x, ch.y - innerGap);
          ctx.moveTo(ch.x, ch.y + 20); ctx.lineTo(ch.x, ch.y + innerGap);
          ctx.moveTo(ch.x - 20, ch.y); ctx.lineTo(ch.x - innerGap, ch.y);
          ctx.moveTo(ch.x + 20, ch.y); ctx.lineTo(ch.x + innerGap, ch.y);
          ctx.stroke();
          
          ctx.fillStyle = activeColor;
          ctx.beginPath(); ctx.arc(ch.x, ch.y, 2, 0, Math.PI * 2); ctx.fill();
        }
      }
      
      animationRef.current = requestAnimationFrame(draw);
    }
    animationRef.current = requestAnimationFrame(draw);
    return () => { 
      cancelAnimationFrame(animationRef.current); 
      window.removeEventListener('resize', updateSize); 
    };
  }, [gameState, pointerLocked, currentTargetSize]);

  const startGame = useCallback(() => {
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
    shotLogRef.current = [];
    setGameState('playing'); gameStateRef.current = 'playing';
    setScore(0); setSuccessfulHits(0); setMissedHits(0); setCombo(0); setBestCombo(0);
    timeLeftRef.current = GAME_DURATION; setTimeLeft(GAME_DURATION); setBestReaction(0); setAccuracy(100);
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
  }, [startTimer]);

  return (
    <div ref={pageRef} className="min-h-screen select-none font-sans bg-[#080d1a] text-slate-100 relative overflow-hidden">
      
      {/* Background patterns */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-950/20 via-[#080d1a] to-[#080d1a] pointer-events-none z-0" />
      <div className="fixed inset-0 bg-[linear-gradient(rgba(0,255,136,0.02)_1px,_transparent_1px),_linear-gradient(90deg,_rgba(0,255,136,0.02)_1px,_transparent_1px)] bg-[size:60px_60px] pointer-events-none z-0" />
      
      <div className={`${isFullscreen ? 'w-full h-screen p-0 m-0' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'} relative z-10`}>
        
        {!isFullscreen && (
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-2 text-[10px] text-slate-400 uppercase tracking-widest">
              <li><Link href="/" className="hover:text-green-400 transition-colors"><Home className="w-3.5 h-3.5" /></Link></li>
              <li><ChevronRight className="w-3 h-3 text-slate-700" /></li>
              <li><Link href="/drills/fps" className="hover:text-green-400 transition-colors">FPS Sector</Link></li>
              <li><ChevronRight className="w-3 h-3 text-slate-700" /></li>
              <li><span className="text-green-400 font-bold">Pro Flick Trainer</span></li>
            </ol>
          </nav>
        )}
        
        {!isFullscreen && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 border-b border-slate-800 pb-5">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-green-500/20 to-blue-500/20 border border-green-500/30 rounded-xl">
                <Crosshair className="w-7 h-7 text-green-400" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                  Pro Flick Trainer
                </h1>
                <p className="text-xs text-slate-400 tracking-wider mt-0.5">
                  {pointerLocked ? '🟢 RAW INPUT CAPTURING' : '🔴 CLICK CANVAS TO CAPTURE'} • {cmPer360} cm/360
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setSoundEnabled(!soundEnabled)} className="p-2 rounded-lg border border-slate-800 bg-[#0c1224] text-slate-350 hover:border-slate-700 transition" title="Sound">
                {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
              </button>
              <button onClick={toggleFullscreen} className="p-2 rounded-lg border border-slate-800 bg-[#0c1224] text-slate-350 hover:border-slate-700 transition" title="Fullscreen">
                {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
              </button>
            </div>
          </div>
        )}

        {/* HUD Stats Bar */}
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
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl">
            
            <div className="lg:col-span-1 bg-slate-900/80 border border-slate-800 rounded-xl p-6 backdrop-blur-md">
              <div>
                <h3 className="text-sm font-bold text-green-400 mb-4 flex items-center gap-2 border-b border-slate-800 pb-2">
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
                    <span>Perfects wrist mechanics and straight flick paths under strict timing.</span>
                  </li>
                </ul>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-800 text-[10px] text-slate-500 leading-normal">
                Focus on smooth, straight-line movements for optimal performance.
              </div>
            </div>

            <div className="lg:col-span-2 bg-slate-900/80 border border-slate-800 rounded-xl p-6 backdrop-blur-md">
              <div>
                <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2 border-b border-slate-800 pb-2">
                  <Calculator className="w-4 h-4 text-green-400" />
                  CALIBRATE AIM ENGINE
                </h3>
                
                <div className="mb-6 p-4 bg-slate-950/50 rounded-lg border border-slate-800">
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

              <div className="mt-8 flex flex-col sm:flex-row gap-4 items-center justify-between border-t border-slate-800 pt-6">
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase">Personal Best Record</span>
                  <span className="text-white font-bold text-lg flex items-center gap-1.5">
                    <Trophy className="w-4 h-4 text-yellow-500" />
                    {bestScore} Points
                  </span>
                </div>
                <button
                  onClick={startGame}
                  className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white font-bold rounded-lg text-sm flex items-center justify-center gap-2 shadow-lg shadow-green-500/25 uppercase tracking-wider transition"
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
              ? "w-full h-full bg-[#050811] relative overflow-hidden flex items-center justify-center cursor-none" 
              : "w-full aspect-video min-h-[400px] lg:min-h-[500px] bg-[#050811] border border-slate-800 rounded-xl relative overflow-hidden flex items-center justify-center cursor-none shadow-2xl"}
          >
            <canvas ref={canvasRef} onClick={handleCanvasClick} />
          </div>
        </div>

        {/* Game Over Screen */}
        {gameState === 'gameOver' && (
          <div className="absolute inset-0 bg-[#080d1a]/95 flex items-center justify-center p-6 z-30 overflow-y-auto">
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-8 max-w-5xl mx-auto backdrop-blur-md shadow-2xl">
            <div className="text-center mb-6">
              <div className="inline-flex p-4 bg-gradient-to-br from-green-500/20 to-blue-500/20 border border-green-500/30 rounded-2xl mb-4">
                <Award className="w-10 h-10 text-yellow-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">Session Complete</h2>
              <p className="text-slate-400 mt-1">Performance Analysis Ready</p>
            </div>

            {/* Performance Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <StatsCard icon={Trophy} label="Final Score" value={score} color="yellow" />
              <StatsCard icon={Target} label="Accuracy" value={`${accuracy}%`} color="green" />
              <StatsCard icon={Zap} label="Max Combo" value={`${bestCombo}x`} color="purple" />
              <StatsCard icon={Timer} label="Avg Reaction" value={`${avgReaction}ms`} color="blue" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Shot Breakdown</h4>
                <div className="space-y-2">
                  <div className="flex justify-between p-2 bg-slate-900/50 rounded">
                    <span className="text-xs text-slate-400">Successful Hits</span>
                    <span className="text-sm font-bold text-green-400">{successfulHits}</span>
                  </div>
                  <div className="flex justify-between p-2 bg-slate-900/50 rounded">
                    <span className="text-xs text-slate-400">Missed Shots</span>
                    <span className="text-sm font-bold text-red-400">{missedHits}</span>
                  </div>
                  <div className="flex justify-between p-2 bg-slate-900/50 rounded">
                    <span className="text-xs text-slate-400">Overshoots</span>
                    <span className="text-sm font-bold text-red-400">{analyticsData.overshoots}</span>
                  </div>
                  <div className="flex justify-between p-2 bg-slate-900/50 rounded">
                    <span className="text-xs text-slate-400">Undershoots</span>
                    <span className="text-sm font-bold text-blue-400">{analyticsData.undershoots}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-green-400" />
                  AI Coach Analysis
                </h4>
                <div className="text-xs text-slate-300 leading-relaxed space-y-3">
                  <p>
                    {analyticsData.overshoots > analyticsData.undershoots * 1.5 
                      ? "⚠️ You're consistently overshooting targets. Consider reducing sensitivity by 0.05-0.1."
                      : analyticsData.undershoots > analyticsData.overshoots * 1.5
                      ? "⚠️ You're stopping short of targets. Try increasing sensitivity slightly."
                      : "✅ Excellent flick accuracy! Your sensitivity is well-calibrated."}
                  </p>
                  <p>
                    Path Efficiency: <span className="text-green-400 font-bold">{Math.round(analyticsData.pathEfficiency * 100)}%</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center border-t border-slate-800 pt-6">
              {activePlaylist && playlistStep + 1 < activePlaylist.length ? (
                <Link 
                  href={`/drills/fps/${activePlaylist[playlistStep + 1]}`}
                  onClick={() => {
                    sessionStorage.setItem('esportsPlaylistStep', (playlistStep + 1).toString());
                  }}
                  className="w-full sm:w-auto"
                >
                  <button className="w-full px-6 py-2.5 bg-yellow-600 hover:bg-yellow-700 text-white font-bold rounded-lg text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition">
                    Next Drill → Step {playlistStep + 2}
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
                  <button className="w-full px-6 py-2.5 bg-yellow-600 hover:bg-yellow-700 text-white font-bold rounded-lg text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition">
                    Finish Routine ✅
                  </button>
                </Link>
              ) : (
                <button
                  onClick={startGame}
                  className="w-full sm:w-auto px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition"
                >
                  <RefreshCw className="w-4 h-4" />
                  Train Again
                </button>
              )}
              <Link href="/drills/fps" className="w-full sm:w-auto">
                <button className="w-full px-6 py-2.5 bg-slate-800 border border-slate-700 hover:border-slate-600 text-slate-300 font-bold rounded-lg text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition">
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