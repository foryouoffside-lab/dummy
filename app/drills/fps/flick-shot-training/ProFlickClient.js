'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  Target, Zap, Timer, Trophy, Heart, 
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, Eye,
  Info, Activity, Check, Crosshair,
  Lock, AlertCircle
} from 'lucide-react';

const TARGET_SIZE = 50;
const TARGET_DURATION_START = 700;
const TARGET_DURATION_END = 600;
const SPAWN_INTERVAL = 800;

const GAME_MULTIPLIERS = {
  valorant: 0.07,
  cs2: 1,
  overwatch: 0.0066,
  apex: 0.022,
  fortnite: 0.01,
  quake: 0.022
};

export default function ProFlickClient() {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const containerRef = useRef(null);
  
  const [gameState, setGameState] = useState('start');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isBoxDarkMode, setIsBoxDarkMode] = useState(true);
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
  const [lives, setLives] = useState(5);
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const [currentTargetDuration, setCurrentTargetDuration] = useState(TARGET_DURATION_START);
  const [pointerLocked, setPointerLocked] = useState(false);
  const [lockCooldown, setLockCooldown] = useState(false);
  
  const [dpi, setDpi] = useState(800);
  const [inGameSens, setInGameSens] = useState(0.35);
  const [gameType, setGameType] = useState('valorant');
  const [cmPer360, setCmPer360] = useState(0);
  const sensitivityMultiplierRef = useRef(1);
  
  const [analyticsData, setAnalyticsData] = useState({
    overshoots: 0, undershoots: 0, totalShots: 0,
    reactionTimes: [], motorTimes: [],
    pathEfficiency: 0, averageDeviation: 0,
    anglePerformance: Array(8).fill(null).map(() => ({ hits: 0, misses: 0 }))
  });
  
  const targetRef = useRef(null);
  const virtualCrosshair = useRef({ x: 0, y: 0 });
  const canvasSizeRef = useRef({ width: 0, height: 0 });
  const scoreRef = useRef(0);
  const comboRef = useRef(0);
  const timerIntervalRef = useRef(null);
  const feedbackTimeoutRef = useRef(null);
  const isActiveRef = useRef(false);
  const gameStateRef = useRef('start');
  const audioCtxRef = useRef(null);
  const lastSpawnTimeRef = useRef(0);
  const timeLeftRef = useRef(60);
  const livesRef = useRef(5);
  const hitsRef = useRef(0);
  const missesRef = useRef(0);
  const bestComboRef = useRef(0);
  const currentTargetDurationRef = useRef(TARGET_DURATION_START);
  const movementHistoryRef = useRef([]);
  const crosshairInitializedRef = useRef(false);

  useEffect(() => { setIsClient(true); const t = setTimeout(() => setLoading(false), 300); return () => clearTimeout(t); }, []);
  useEffect(() => { try { const s = localStorage.getItem('proFlickBestScore'); if (s) { const p = parseInt(s, 10); if (!isNaN(p)) setBestScore(p); } } catch (e) {} }, []);
  useEffect(() => { gameStateRef.current = gameState; }, [gameState]);

  useEffect(() => {
    const multiplier = GAME_MULTIPLIERS[gameType] || 0.07;
    const counts = 360 / (multiplier * inGameSens);
    const inches = counts / dpi;
    const cm = inches * 2.54;
    setCmPer360(cm.toFixed(1));
    sensitivityMultiplierRef.current = 51.4 / cm;
    try {
      localStorage.setItem('proFlickDpi', dpi.toString());
      localStorage.setItem('proFlickSens', inGameSens.toString());
      localStorage.setItem('proFlickGame', gameType);
    } catch (e) {}
  }, [dpi, inGameSens, gameType]);

  const showFeedback = useCallback((m, t) => {
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    setFeedback(m); setFeedbackType(t);
    feedbackTimeoutRef.current = setTimeout(() => { setFeedback(''); setFeedbackType(''); }, 1500);
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
      const f = { success: 880, fail: 440, combo: 1046, penalty: 220 };
      o.frequency.setValueAtTime(f[type] || 440, now);
      g.gain.setValueAtTime(type==='combo'?0.12:type==='penalty'?0.15:0.1, now);
      g.gain.exponentialRampToValueAtTime(0.001, now+0.15);
      o.start(now); o.stop(now+0.15);
    } catch (e) {}
  }, [soundEnabled, initAudio]);

  const updateBestScore = useCallback((fs) => {
    try {
      const c = parseInt(localStorage.getItem('proFlickBestScore') || '0', 10);
      if (fs > c) { localStorage.setItem('proFlickBestScore', fs.toString()); setBestScore(fs); }
    } catch (e) {}
  }, []);

  const toggleFullscreen = useCallback(async () => {
    try {
      if (!isFullscreen) {
        const el = containerRef.current;
        if (el?.requestFullscreen) { await el.requestFullscreen(); setIsFullscreen(true); }
      } else {
        if (document.fullscreenElement) await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch (e) {}
  }, [isFullscreen]);

  useEffect(() => {
    const h = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', h);
    return () => document.removeEventListener('fullscreenchange', h);
  }, []);

  const requestPointerLock = useCallback(() => {
    if (!lockCooldown && canvasRef.current) {
      canvasRef.current.requestPointerLock();
    }
  }, [lockCooldown]);

  useEffect(() => {
    const handlePointerChange = () => {
      const locked = document.pointerLockElement === canvasRef.current;
      setPointerLocked(locked);
      if (locked) {
        crosshairInitializedRef.current = true;
      } else if (gameState === 'playing') {
        setLockCooldown(true);
        setTimeout(() => setLockCooldown(false), 1000);
      }
    };

    const handlePointerError = () => {
      setLockCooldown(true);
      setTimeout(() => setLockCooldown(false), 1000);
    };

    document.addEventListener('pointerlockchange', handlePointerChange);
    document.addEventListener('pointerlockerror', handlePointerError);
    
    return () => {
      document.removeEventListener('pointerlockchange', handlePointerChange);
      document.removeEventListener('pointerlockerror', handlePointerError);
    };
  }, [gameState]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const handleCanvasClick = () => {
      if (gameState === 'playing' && !pointerLocked && !lockCooldown) {
        requestPointerLock();
      }
    };
    
    canvas.addEventListener('click', handleCanvasClick);
    return () => canvas.removeEventListener('click', handleCanvasClick);
  }, [gameState, pointerLocked, requestPointerLock, lockCooldown]);

  // ESC key handler for fullscreen exit
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isFullscreen && gameState === 'playing') {
        // Don't prevent default - let ESC also unlock pointer if needed
        // Just show feedback that ESC exits fullscreen
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen, gameState]);

  useEffect(() => {
    const handleRawMouse = (e) => {
      if (document.pointerLockElement !== canvasRef.current) return;
      
      const sens = sensitivityMultiplierRef.current;
      const dx = (e.movementX || 0) * sens;
      const dy = (e.movementY || 0) * sens;
      
      const now = performance.now();
      movementHistoryRef.current.push({ x: dx, y: dy, timestamp: now });
      movementHistoryRef.current = movementHistoryRef.current.filter(m => now - m.timestamp < 500);
      
      virtualCrosshair.current.x += dx;
      virtualCrosshair.current.y += dy;
      
      const c = canvasRef.current;
      if (c) {
        virtualCrosshair.current.x = Math.max(0, Math.min(c.width, virtualCrosshair.current.x));
        virtualCrosshair.current.y = Math.max(0, Math.min(c.height, virtualCrosshair.current.y));
      }
    };

    document.addEventListener('mousemove', handleRawMouse);
    return () => document.removeEventListener('mousemove', handleRawMouse);
  }, []);

  const calculateTargetDuration = useCallback((timeRemaining) => {
    const progress = (60 - timeRemaining) / 60;
    return Math.round(TARGET_DURATION_START - (progress * (TARGET_DURATION_START - TARGET_DURATION_END)));
  }, []);

  function spawnTarget() {
    const c = canvasRef.current; if (!c) return null;
    const pad = TARGET_SIZE;
    return {
      x: Math.random() * (c.width - pad * 2) + pad,
      y: Math.random() * (c.height - pad * 2) + pad,
      startTime: performance.now()
    };
  }

  const analyzeShot = useCallback((targetPos, clickPos, reactionTime) => {
    const distance = Math.hypot(clickPos.x - targetPos.x, clickPos.y - targetPos.y);
    const angle = Math.atan2(clickPos.y - targetPos.y, clickPos.x - targetPos.x) * (180 / Math.PI);
    const normalizedAngle = ((angle + 360) % 360);
    const angleSector = Math.floor(normalizedAngle / 45) % 8;
    
    setAnalyticsData(prev => {
      const newData = { ...prev };
      newData.totalShots++;
      newData.anglePerformance = [...prev.anglePerformance];
      newData.anglePerformance[angleSector] = { ...newData.anglePerformance[angleSector] };
      
      if (distance <= TARGET_SIZE / 2) {
        newData.anglePerformance[angleSector].hits++;
        newData.reactionTimes = [...prev.reactionTimes, reactionTime].slice(-50);
      } else {
        if (distance < TARGET_SIZE / 2) newData.undershoots++;
        else newData.overshoots++;
        newData.anglePerformance[angleSector].misses++;
      }
      
      newData.averageDeviation = ((prev.averageDeviation * (prev.totalShots)) + distance) / (prev.totalShots + 1);
      
      const pathLength = movementHistoryRef.current.reduce((acc, move, i, arr) => {
        if (i === 0) return acc;
        return acc + Math.hypot(move.x - arr[i-1].x, move.y - arr[i-1].y);
      }, 0);
      
      newData.pathEfficiency = Math.hypot(clickPos.x - targetPos.x, clickPos.y - targetPos.y) / (pathLength || 1);
      
      return newData;
    });
  }, []);

  const handleShot = useCallback(() => {
    if (gameStateRef.current !== 'playing' || !isActiveRef.current) return;
    if (!crosshairInitializedRef.current) return;
    
    const currentTarget = targetRef.current;
    const now = performance.now();
    const clickPos = { ...virtualCrosshair.current };
    
    if (currentTarget) {
      const elapsed = now - currentTarget.startTime;
      const currentDuration = currentTargetDurationRef.current;
      const distance = Math.hypot(currentTarget.x - clickPos.x, currentTarget.y - clickPos.y);
      
      if (elapsed < currentDuration) {
        if (distance < TARGET_SIZE / 2) {
          scoreRef.current += 1; setScore(scoreRef.current);
          hitsRef.current++; setSuccessfulHits(hitsRef.current);
          comboRef.current++; setCombo(comboRef.current);
          if (comboRef.current > bestComboRef.current) { bestComboRef.current = comboRef.current; setBestCombo(comboRef.current); }
          if (bestReaction === 0 || elapsed < bestReaction) setBestReaction(Math.round(elapsed));
          playSound('success');
          if (comboRef.current % 5 === 0) { playSound('combo'); showFeedback(`🔥 ${comboRef.current} Combo! (${Math.round(elapsed)}ms)`, 'success'); }
          else { showFeedback(`✓ +1 | ${Math.round(elapsed)}ms`, 'success'); }
          targetRef.current = null;
          analyzeShot(currentTarget, clickPos, elapsed);
        } else {
          missesRef.current++; setMissedHits(missesRef.current);
          comboRef.current = 0; setCombo(0);
          if (livesRef.current > 0) { livesRef.current -= 1; setLives(livesRef.current); playSound('fail'); showFeedback(`⚠️ Missed! (${distance.toFixed(0)}px) -1 life`, 'error'); }
          else { scoreRef.current = Math.max(0, scoreRef.current-1); setScore(scoreRef.current); playSound('penalty'); showFeedback('💔 No lives! -1 point', 'error'); }
          targetRef.current = null;
          analyzeShot(currentTarget, clickPos, elapsed);
        }
      } else {
        comboRef.current = 0; setCombo(0);
        if (livesRef.current > 0) { livesRef.current -= 1; setLives(livesRef.current); playSound('fail'); showFeedback('⏰ Too slow! -1 life', 'error'); }
        else { scoreRef.current = Math.max(0, scoreRef.current-1); setScore(scoreRef.current); playSound('penalty'); showFeedback('💔 No lives! -1 point', 'error'); }
        targetRef.current = null;
      }
    } else {
      comboRef.current = 0; setCombo(0);
      if (livesRef.current > 0) { livesRef.current -= 1; setLives(livesRef.current); playSound('fail'); showFeedback('❌ No target! -1 life', 'error'); }
      else { scoreRef.current = Math.max(0, scoreRef.current-1); setScore(scoreRef.current); playSound('penalty'); showFeedback('💔 No lives! -1 point', 'error'); }
    }
  }, [playSound, showFeedback, analyzeShot, bestReaction]);

  useEffect(() => {
    const handleMouseDown = (e) => {
      if (e.target.tagName === 'BUTTON' || e.target.closest('button')) return;
      if (gameState === 'playing') {
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
          setAccuracy(total===0?100:Math.round((hitsRef.current/total)*100));
          updateBestScore(scoreRef.current);
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
      canvasSizeRef.current = { width: w, height: h };
      cvs.style.position = 'absolute';
      cvs.style.left = `${(rr.width-w)/2}px`;
      cvs.style.top = `${(rr.height-h)/2}px`;
      if (!crosshairInitializedRef.current) {
        virtualCrosshair.current = { x: w/2, y: h/2 };
      }
    };
    updateSize();
    lastSpawnTimeRef.current = performance.now();
    
    function draw(ct) {
      if (!isActiveRef.current) { animationRef.current = requestAnimationFrame(draw); return; }
      
      ctx.fillStyle = isBoxDarkMode ? "#020202" : "#f9fafb";
      ctx.fillRect(0, 0, cvs.width, cvs.height);
      
      ctx.strokeStyle = isBoxDarkMode ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)';
      ctx.lineWidth = 1;
      for (let i = 0; i < cvs.width; i += 40) {
        ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, cvs.height); ctx.stroke();
      }
      
      if (!targetRef.current && gameStateRef.current === 'playing') {
        if (ct - lastSpawnTimeRef.current >= SPAWN_INTERVAL) {
          targetRef.current = spawnTarget();
          lastSpawnTimeRef.current = ct;
        }
      }
      
      if (targetRef.current) {
        const elapsed = ct - targetRef.current.startTime;
        const dur = currentTargetDurationRef.current;
        if (elapsed < dur) {
          const opacity = Math.max(0.3, 1 - (elapsed/dur) * 0.7);
          ctx.shadowBlur = 15; ctx.shadowColor = "#00ff88";
          ctx.fillStyle = `rgba(0,255,136,${opacity})`;
          ctx.beginPath(); ctx.arc(targetRef.current.x, targetRef.current.y, TARGET_SIZE/2, 0, Math.PI*2); ctx.fill();
          ctx.strokeStyle = `rgba(255,255,255,${opacity})`; ctx.lineWidth = 3; ctx.stroke();
          ctx.beginPath(); ctx.arc(targetRef.current.x, targetRef.current.y, TARGET_SIZE/6, 0, Math.PI*2);
          ctx.fillStyle = `rgba(255,255,255,${opacity})`; ctx.fill();
          ctx.shadowBlur = 0;
        } else { targetRef.current = null; }
      }
      
      const ch = virtualCrosshair.current;
      if (ch.x > 0 && ch.x < cvs.width && ch.y > 0 && ch.y < cvs.height) {
        ctx.strokeStyle = pointerLocked ? "#00ff88" : "#ff4444";
        ctx.lineWidth = 2;
        ctx.beginPath(); ctx.arc(ch.x, ch.y, 12, 0, Math.PI*2); ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(ch.x-24, ch.y); ctx.lineTo(ch.x-10, ch.y);
        ctx.moveTo(ch.x+10, ch.y); ctx.lineTo(ch.x+24, ch.y);
        ctx.moveTo(ch.x, ch.y-24); ctx.lineTo(ch.x, ch.y-10);
        ctx.moveTo(ch.x, ch.y+10); ctx.lineTo(ch.x, ch.y+24);
        ctx.stroke();
        ctx.fillStyle = pointerLocked ? "#00ff88" : "#ff4444";
        ctx.beginPath(); ctx.arc(ch.x, ch.y, 3, 0, Math.PI*2); ctx.fill();
      }
      
      animationRef.current = requestAnimationFrame(draw);
    }
    animationRef.current = requestAnimationFrame(draw);
    
    const hr = () => { cancelAnimationFrame(animationRef.current); updateSize(); animationRef.current = requestAnimationFrame(draw); };
    window.addEventListener('resize', hr);
    const ro = new ResizeObserver(() => hr());
    if (containerRef.current) ro.observe(containerRef.current);
    return () => { cancelAnimationFrame(animationRef.current); window.removeEventListener('resize', hr); ro.disconnect(); targetRef.current = null; };
  }, [gameState, isBoxDarkMode, pointerLocked]);

  const startGame = useCallback(() => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    setAnalyticsData({ overshoots: 0, undershoots: 0, totalShots: 0, reactionTimes: [], motorTimes: [], pathEfficiency: 0, averageDeviation: 0, anglePerformance: Array(8).fill(null).map(() => ({ hits: 0, misses: 0 })) });
    setGameState('playing'); gameStateRef.current = 'playing';
    setScore(0); setSuccessfulHits(0); setMissedHits(0); setCombo(0); setBestCombo(0);
    timeLeftRef.current = 60; setTimeLeft(60); setBestReaction(0); setAccuracy(100); setLives(5); setFeedback('');
    isActiveRef.current = true; scoreRef.current = 0; comboRef.current = 0; bestComboRef.current = 0; livesRef.current = 5;
    hitsRef.current = 0; missesRef.current = 0;
    targetRef.current = null; lastSpawnTimeRef.current = performance.now();
    currentTargetDurationRef.current = TARGET_DURATION_START; setCurrentTargetDuration(TARGET_DURATION_START);
    crosshairInitializedRef.current = false;
    movementHistoryRef.current = [];
    
    startTimer();
    setTimeout(() => requestPointerLock(), 300);
    setTimeout(() => { crosshairInitializedRef.current = true; }, 500);
  }, [startTimer, requestPointerLock]);

  const resetGame = useCallback(() => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    isActiveRef.current = false;
    setGameState('start'); gameStateRef.current = 'start';
    targetRef.current = null; setFeedback(''); setFeedbackType('');
    crosshairInitializedRef.current = false;
    document.exitPointerLock();
    setLockCooldown(true);
    setTimeout(() => setLockCooldown(false), 1000);
  }, []);

  useEffect(() => () => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
  }, []);

  if (loading || !isClient) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto" />
    </div>
  );

  const avgReaction = analyticsData.reactionTimes.length > 0
    ? Math.round(analyticsData.reactionTimes.reduce((a,b) => a+b, 0) / analyticsData.reactionTimes.length)
    : 0;

  return (
    <div className={`min-h-screen select-none ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!isFullscreen && (
          <nav className="mb-4">
            <ol className="flex flex-wrap items-center gap-2 text-sm">
              <li><Link href="/" className={`hover:underline ${isDarkMode?'text-gray-400 hover:text-gray-200':'text-gray-600 hover:text-gray-900'}`}>Home</Link></li>
              <li className={isDarkMode?'text-gray-500':'text-gray-400'}>/</li>
              <li><Link href="/drills/fps" className={`hover:underline ${isDarkMode?'text-gray-400 hover:text-gray-200':'text-gray-600 hover:text-gray-900'}`}>FPS Drills</Link></li>
              <li className={isDarkMode?'text-gray-500':'text-gray-400'}>/</li>
              <li className={`font-medium ${isDarkMode?'text-green-400':'text-green-600'}`}>Pro Flick Trainer</li>
            </ol>
          </nav>
        )}
        
        {!isFullscreen && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl">
                <Crosshair className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className={`text-2xl sm:text-3xl font-bold ${isDarkMode?'text-white':'text-gray-900'}`}>Pro Flick Training Tool</h1>
                <p className={`text-sm sm:text-base ${isDarkMode?'text-gray-400':'text-gray-500'}`}>
                  {pointerLocked ? '🟢 Raw input active' : '🔴 Click canvas to lock'} • {cmPer360}cm/360 • {gameType}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setIsDarkMode(!isDarkMode)} className={`p-2 rounded-lg border ${isDarkMode?'bg-gray-800 border-gray-700 text-gray-300':'bg-white border-gray-200 text-gray-700'}`} title="Theme">
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button onClick={() => setIsBoxDarkMode(!isBoxDarkMode)} className={`p-2 rounded-lg border ${isDarkMode?'bg-gray-800 border-gray-700 text-gray-300':'bg-white border-gray-200 text-gray-700'}`} title="Box theme">
                <Eye className="w-5 h-5" />
              </button>
              <button onClick={() => setSoundEnabled(!soundEnabled)} className={`p-2 rounded-lg border ${isDarkMode?'bg-gray-800 border-gray-700 text-gray-300':'bg-white border-gray-200 text-gray-700'}`} title="Sound">
                {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
              </button>
              <button onClick={toggleFullscreen} className={`p-2 rounded-lg border ${isDarkMode?'bg-gray-800 border-gray-700 text-gray-300':'bg-white border-gray-200 text-gray-700'}`} title="Fullscreen">
                {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
              </button>
              <button onClick={pointerLocked ? () => { document.exitPointerLock(); setLockCooldown(true); setTimeout(() => setLockCooldown(false), 1000); } : requestPointerLock} className={`p-2 rounded-lg border ${pointerLocked?'bg-green-500 border-green-600 text-white':isDarkMode?'bg-gray-800 border-gray-700 text-gray-300':'bg-white border-gray-200 text-gray-700'}`} title="Pointer lock">
                <Lock className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
        
        {!isFullscreen && (
          <div className="grid grid-cols-7 gap-3 mb-4 h-[88px]">
            <StatCard icon={<Target className="text-blue-600" />} value={score} label="Score" dark={isDarkMode} />
            <StatCard icon={<Trophy className="text-yellow-500" />} value={bestScore} label="Best" dark={isDarkMode} />
            <StatCard icon={<Timer className={timeLeft<=10?'text-red-600':'text-green-600'} />} value={timeLeft} label="Time" unit="s" dark={isDarkMode} />
            <StatCard icon={<Zap className="text-orange-500" />} value={combo} label="Combo" dark={isDarkMode} />
            <StatCard icon={<Check className="text-green-500" />} value={successfulHits} label="Hits" dark={isDarkMode} />
            <StatCard icon={<Activity className="text-purple-500" />} value={currentTargetDuration} label="Speed" unit="ms" dark={isDarkMode} />
            <StatCard icon={<Heart className="text-red-500" />} value={lives} label="Lives" dark={isDarkMode} />
          </div>
        )}
        
        <div className="h-10 mb-2 flex justify-center items-center">
          <div className={`px-4 py-1.5 rounded-lg text-white font-semibold text-sm transition-all duration-200 ${feedback?'opacity-100 scale-100':'opacity-0 scale-95'} ${feedbackType==='success'?'bg-green-500':'bg-red-500'}`}>
            {feedback || '\u00A0'}
          </div>
        </div>
        
        <div ref={containerRef} className={`relative ${isFullscreen?'fixed inset-0 z-50':'rounded-xl border-2'}`} style={{background:isBoxDarkMode?"#020202":"#fff",aspectRatio:isFullscreen?'auto':'16/9',maxWidth:'100%',margin:'0 auto',borderColor:isDarkMode?'#374151':'#e5e7eb',overflow:'hidden'}}>
          {/* Fullscreen: ESC hint text only - no buttons */}
          {isFullscreen && gameState === 'playing' && (
            <div className="absolute top-4 right-4 z-20 pointer-events-none">
              <span className="text-white/40 text-xs font-medium bg-black/40 backdrop-blur-sm rounded-lg px-3 py-1.5">
                Press <span className="text-white/70 font-bold">ESC</span> to exit fullscreen
              </span>
            </div>
          )}
          
          <canvas ref={canvasRef} style={{display:'block',position:'absolute',cursor:'none'}} />
          
          {gameState === 'start' && (
            <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm z-40 ${isBoxDarkMode?'bg-gray-900/95':'bg-white/95'}`}>
              <div className={`rounded-2xl p-6 sm:p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode?'bg-gray-800 border-gray-700':'bg-white border-gray-200'}`}>
                <Crosshair className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h2 className={`text-2xl font-bold mb-2 ${isBoxDarkMode?'text-white':'text-gray-900'}`}>Professional Flick Trainer</h2>
                <p className={`mb-2 ${isBoxDarkMode?'text-gray-300':'text-gray-600'}`}>Raw mouse input • Sensitivity matched • 60s challenge</p>
                <div className={`mb-4 p-3 rounded-lg ${isBoxDarkMode?'bg-gray-700':'bg-gray-50'}`}>
                  <p className={`text-sm ${isBoxDarkMode?'text-gray-400':'text-gray-600'}`}>{cmPer360}cm/360 • {gameType} • {dpi} DPI • {inGameSens} sens</p>
                </div>
                <div className={`mb-6 p-3 rounded-lg border ${isBoxDarkMode?'border-yellow-600 bg-yellow-900/20':'border-yellow-200 bg-yellow-50'}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="w-4 h-4 text-yellow-500" />
                    <p className={`text-sm font-medium ${isBoxDarkMode?'text-yellow-400':'text-yellow-700'}`}>Raw Input via Pointer Lock</p>
                  </div>
                  <p className={`text-xs ${isBoxDarkMode?'text-gray-400':'text-gray-600'}`}>Cursor locks to canvas. Press ESC to unlock and exit fullscreen. {cmPer360}cm/360 sensitivity applied.</p>
                </div>
                <button onClick={startGame} className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-lg w-full">Start Training</button>
              
              </div>
            </div>
          )}
          
          {gameState === 'gameOver' && (
            <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm z-40 ${isBoxDarkMode?'bg-gray-900/95':'bg-white/95'}`}>
              <div className={`rounded-2xl p-6 sm:p-8 shadow-xl border max-w-[520px] mx-4 ${isBoxDarkMode?'bg-gray-800 border-gray-700':'bg-white border-gray-200'}`}>
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Trophy className="w-10 h-10 text-yellow-500" />
                  <h2 className={`text-2xl font-bold ${isBoxDarkMode?'text-white':'text-gray-900'}`}>Training Complete</h2>
                </div>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <RCard label="Score" value={score} icon={<Target className="w-4 h-4" />} color="blue" dark={isBoxDarkMode} />
                  <RCard label="Best" value={bestScore} icon={<Trophy className="w-4 h-4" />} color="yellow" dark={isBoxDarkMode} />
                  <RCard label="Hits" value={successfulHits} icon={<Check className="w-4 h-4" />} color="emerald" dark={isBoxDarkMode} />
                  <RCard label="Combo" value={bestCombo} icon={<Zap className="w-4 h-4" />} color="orange" dark={isBoxDarkMode} />
                  <RCard label="Reaction" value={bestReaction||'-'} unit="ms" icon={<Timer className="w-4 h-4" />} color="cyan" dark={isBoxDarkMode} />
                  <RCard label="Accuracy" value={accuracy} unit="%" icon={<Activity className="w-4 h-4" />} color="purple" dark={isBoxDarkMode} />
                </div>
                
                {analyticsData.totalShots > 0 && (
                  <div className={`mb-4 p-3 rounded-lg border ${isBoxDarkMode?'border-gray-600 bg-gray-800/50':'border-gray-200 bg-gray-50'}`}>
                    <h3 className={`text-sm font-semibold mb-2 ${isBoxDarkMode?'text-gray-300':'text-gray-700'}`}>Shot Analysis</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <div className={`p-2 rounded text-center ${isBoxDarkMode?'bg-gray-700':'bg-white'}`}><p className="text-xs">Overshoots</p><p className="text-lg font-bold text-red-400">{analyticsData.overshoots}</p></div>
                      <div className={`p-2 rounded text-center ${isBoxDarkMode?'bg-gray-700':'bg-white'}`}><p className="text-xs">Undershoots</p><p className="text-lg font-bold text-blue-400">{analyticsData.undershoots}</p></div>
                      <div className={`p-2 rounded text-center ${isBoxDarkMode?'bg-gray-700':'bg-white'}`}><p className="text-xs">Avg Reaction</p><p className="text-lg font-bold">{avgReaction}ms</p></div>
                      <div className={`p-2 rounded text-center ${isBoxDarkMode?'bg-gray-700':'bg-white'}`}><p className="text-xs">Path Efficiency</p><p className="text-lg font-bold text-purple-400">{(analyticsData.pathEfficiency*100).toFixed(0)}%</p></div>
                    </div>
                  </div>
                )}
                
                {analyticsData.overshoots > analyticsData.undershoots * 1.5 && (
                  <div className={`mb-4 p-2 rounded-lg text-sm ${isBoxDarkMode?'bg-red-900/20 border border-red-800 text-red-400':'bg-red-50 border border-red-200 text-red-600'}`}>💡 You're overshooting - lower sensitivity may help</div>
                )}
                
                <div className="flex gap-3">
                  <Link href="/drills/fps" className="flex-1"><button className={`w-full px-4 py-2.5 rounded-lg font-semibold ${isDarkMode?'bg-gray-700 text-gray-300':'bg-gray-200 text-gray-700'}`}>← Back</button></Link>
                  <button onClick={startGame} className="flex-1 px-4 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-semibold">Train Again →</button>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {!isFullscreen && (
          <footer className="mt-6">
            <div className={`rounded-xl border overflow-hidden ${isDarkMode?'bg-gray-800 border-gray-700':'bg-white border-gray-200'}`}>
              <div className={`px-4 py-3 border-b ${isDarkMode?'border-gray-700 bg-gray-800/50':'border-gray-200 bg-gray-50'}`}>
                <div className="flex items-center gap-2">
                  <Info className={`w-4 h-4 ${isDarkMode?'text-green-400':'text-green-600'}`} />
                  <h2 className={`font-semibold text-lg ${isDarkMode?'text-white':'text-gray-900'}`}>Drill Rules & Professional Features</h2>
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-3">
                    <h3 className={`font-semibold flex items-center gap-2 ${isDarkMode?'text-green-400':'text-green-600'}`}>
                      <Crosshair className="w-5 h-5" /> How to Play
                    </h3>
                    <ul className={`space-y-2 text-sm ${isDarkMode?'text-gray-300':'text-gray-600'}`}>
                      <li className="flex items-start gap-2">
                        <span className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">1</span>
                        <span>Click <span className="font-semibold text-green-400">Start Training</span> to begin</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">2</span>
                        <span>Cursor locks via <span className="font-semibold text-green-400">Pointer Lock API</span> for raw input</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">3</span>
                        <span>Click <span className="font-semibold text-green-400">green targets</span> before they disappear</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">4</span>
                        <span>Targets: <span className="font-semibold">700ms → 600ms</span> over 60 seconds</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className={`font-semibold flex items-center gap-2 ${isDarkMode?'text-blue-400':'text-blue-600'}`}>
                      <Trophy className="w-5 h-5" /> Scoring System
                    </h3>
                    <ul className={`space-y-2 text-sm ${isDarkMode?'text-gray-300':'text-gray-600'}`}>
                      <li className="flex items-start gap-2">
                        <span className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">+1</span>
                        <span><span className="font-semibold text-blue-400">Hit bonus</span> - Each successful hit = +1 point</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">🔥</span>
                        <span><span className="font-semibold text-orange-400">Combo streaks</span> - Every 5 consecutive hits</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">-1</span>
                        <span><span className="font-semibold text-red-400">Life loss</span> - Miss, expired target, or wrong click</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-5 h-5 rounded-full bg-red-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">-1</span>
                        <span><span className="font-semibold text-red-400">Penalty</span> - After 0 lives: -1 point per mistake</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className={`font-semibold flex items-center gap-2 ${isDarkMode?'text-purple-400':'text-purple-600'}`}>
                      <Zap className="w-5 h-5" /> Pro Features
                    </h3>
                    <ul className={`space-y-2 text-sm ${isDarkMode?'text-gray-300':'text-gray-600'}`}>
                      <li className="flex items-start gap-2">
                        <Lock className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                        <span><span className="font-semibold text-green-400">Raw Input</span> - No Windows acceleration</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Target className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                        <span><span className="font-semibold text-purple-400">Sensitivity</span> - {cmPer360}cm/360 ({gameType})</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Activity className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                        <span><span className="font-semibold text-blue-400">Analytics</span> - Path efficiency, reaction time</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Timer className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
                        <span><span className="font-semibold text-orange-400">Dynamic</span> - 700ms → 600ms speed scaling</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className={`mt-4 p-4 rounded-lg border ${isDarkMode?'border-gray-600 bg-gray-800/50':'border-gray-200 bg-gray-50'}`}>
                  <h4 className={`text-sm font-semibold mb-2 ${isDarkMode?'text-gray-300':'text-gray-700'}`}>🖱️ Controls</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <p className={`text-xs ${isDarkMode?'text-gray-400':'text-gray-500'}`}><span className="font-semibold">ESC ×2</span> - Unlock cursor, then exit fullscreen</p>
                    <p className={`text-xs ${isDarkMode?'text-gray-400':'text-gray-500'}`}><span className="font-semibold">Click Canvas</span> - Re-lock cursor</p>
                    <p className={`text-xs ${isDarkMode?'text-gray-400':'text-gray-500'}`}><span className="font-semibold">F11</span> - Toggle fullscreen</p>
                    <p className={`text-xs ${isDarkMode?'text-gray-400':'text-gray-500'}`}><span className="font-semibold">Left Click</span> - Shoot target</p>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        )}
      </div>
    </div>
  );
}

function StatCard({ icon, value, label, unit = '', dark }) {
  return (
    <div className={`rounded-xl shadow-sm border p-2 sm:p-3 text-center flex flex-col justify-center h-full ${dark?'bg-gray-800 border-gray-700':'bg-white border-gray-100'}`}>
      <div className="mb-1 flex justify-center">{icon}</div>
      <p className={`text-lg sm:text-xl font-bold truncate ${dark?'text-white':'text-gray-900'}`}>{value}{unit}</p>
      <p className={`text-[10px] sm:text-xs truncate ${dark?'text-gray-400':'text-gray-500'}`}>{label}</p>
    </div>
  );
}

function RCard({ label, value, unit = '', icon, color, dark }) {
  const m = { blue:'bg-blue-500/10 border-blue-500/30 text-blue-500', yellow:'bg-yellow-500/10 border-yellow-500/30 text-yellow-500', emerald:'bg-emerald-500/10 border-emerald-500/30 text-emerald-500', orange:'bg-orange-500/10 border-orange-500/30 text-orange-500', purple:'bg-purple-500/10 border-purple-500/30 text-purple-500', cyan:'bg-cyan-500/10 border-cyan-500/30 text-cyan-500' };
  const c = m[color] || m.blue;
  const [bg, border, text] = c.split(' ');
  return (
    <div className={`flex items-center justify-between p-3 rounded-lg border ${bg} ${border}`}>
      <div className="flex items-center gap-2"><div className={text}>{icon}</div><span className={`text-xs sm:text-sm truncate ${dark?'text-gray-300':'text-gray-600'}`}>{label}</span></div>
      <span className={`font-bold text-base sm:text-lg ${text}`}>{value}{unit}</span>
    </div>
  );
}