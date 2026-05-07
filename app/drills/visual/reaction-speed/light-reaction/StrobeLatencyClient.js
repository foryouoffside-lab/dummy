'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  Target, Zap, Clock, Activity, 
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, 
  Eye, Timer, AlertCircle, Trophy, Info, Check, Heart,
  Lock
} from 'lucide-react';

const MIN_STAY_TIME = 100;
const MAX_STAY_TIME = 200;

export default function StrobeLatencyClient() {
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
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [bestReaction, setBestReaction] = useState(0);
  const [reactionWindow, setReactionWindow] = useState(200);
  const [timeLeft, setTimeLeft] = useState(60);
  const [lives, setLives] = useState(3);
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  const [successfulHits, setSuccessfulHits] = useState(0);
  const [isFlashing, setIsFlashing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const [pointerLocked, setPointerLocked] = useState(false);
  const [lockCooldown, setLockCooldown] = useState(false);
  
  const startTimeRef = useRef(0);
  const stayTimeRef = useRef(200);
  const streakRef = useRef(0);
  const scoreRef = useRef(0);
  const livesRef = useRef(3);
  const virtualCrosshair = useRef({ x: 0, y: 0 });
  const cycleTimeoutRef = useRef(null);
  const flashTimeoutRef = useRef(null);
  const timerIntervalRef = useRef(null);
  const feedbackTimeoutRef = useRef(null);
  const isActiveRef = useRef(false);
  const gameStateRef = useRef('start');
  const audioCtxRef = useRef(null);
  const bestStreakRef = useRef(0);
  const bestReactionRef = useRef(0);
  const canvasSizeRef = useRef({ width: 0, height: 0 });
  const isMountedRef = useRef(true);

  useEffect(() => { 
    setIsClient(true); 
    isMountedRef.current = true;
    const timer = setTimeout(() => setLoading(false), 300); 
    return () => { isMountedRef.current = false; clearTimeout(timer); };
  }, []);

  useEffect(() => {
    try {
      const savedBestScore = localStorage.getItem('strobeLatencyBestScore');
      if (savedBestScore) { const parsed = parseInt(savedBestScore, 10); if (!isNaN(parsed)) setBestScore(parsed); }
    } catch (e) {}
  }, []);

  const updateBestScore = useCallback((finalScore) => {
    try {
      const currentBestScore = parseInt(localStorage.getItem('strobeLatencyBestScore') || '0', 10);
      if (finalScore > currentBestScore) {
        localStorage.setItem('strobeLatencyBestScore', finalScore.toString());
        if (isMountedRef.current) setBestScore(finalScore);
      }
    } catch (e) {}
  }, []);

  useEffect(() => { gameStateRef.current = gameState; }, [gameState]);

  const showFeedback = useCallback((message, type) => {
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    if (isMountedRef.current) { setFeedback(message); setFeedbackType(type); }
    feedbackTimeoutRef.current = setTimeout(() => {
      if (isMountedRef.current) { setFeedback(''); setFeedbackType(''); }
    }, 600);
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
      const audioCtx = initAudio(); if (!audioCtx) return;
      const osc = audioCtx.createOscillator(), gain = audioCtx.createGain();
      osc.connect(gain); gain.connect(audioCtx.destination);
      const now = audioCtx.currentTime;
      const f = { success: 880, fail: 440, streak: 1046, ready: 660 };
      osc.frequency.setValueAtTime(f[type] || 440, now);
      gain.gain.setValueAtTime(type === 'streak' ? 0.12 : type === 'fail' ? 0.1 : 0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      osc.start(now); osc.stop(now + 0.12);
    } catch (e) {}
  }, [soundEnabled, initAudio]);

  const toggleFullscreen = useCallback(async () => {
    try {
      if (!isFullscreen) { const el = containerRef.current; if (el?.requestFullscreen) { await el.requestFullscreen(); setIsFullscreen(true); } }
      else { if (document.fullscreenElement) await document.exitFullscreen(); setIsFullscreen(false); }
    } catch (e) {}
  }, [isFullscreen]);

  useEffect(() => {
    const h = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', h);
    return () => document.removeEventListener('fullscreenchange', h);
  }, []);

  const requestPointerLock = useCallback(() => {
    if (!lockCooldown && canvasRef.current) canvasRef.current.requestPointerLock();
  }, [lockCooldown]);

  useEffect(() => {
    const h = () => {
      const l = document.pointerLockElement === canvasRef.current;
      setPointerLocked(l);
      if (!l && gameState === 'playing') { setLockCooldown(true); setTimeout(() => setLockCooldown(false), 1000); }
    };
    const e = () => { setLockCooldown(true); setTimeout(() => setLockCooldown(false), 1000); };
    document.addEventListener('pointerlockchange', h);
    document.addEventListener('pointerlockerror', e);
    return () => { document.removeEventListener('pointerlockchange', h); document.removeEventListener('pointerlockerror', e); };
  }, [gameState]);

  useEffect(() => {
    const c = canvasRef.current; if (!c) return;
    const h = () => { if (gameState === 'playing' && !pointerLocked && !lockCooldown) requestPointerLock(); };
    c.addEventListener('click', h);
    return () => c.removeEventListener('click', h);
  }, [gameState, pointerLocked, requestPointerLock, lockCooldown]);

  useEffect(() => {
    const h = (e) => {
      const cvs = canvasRef.current;
      if (!cvs) return;
      if (document.pointerLockElement === cvs) {
        virtualCrosshair.current.x += e.movementX || 0;
        virtualCrosshair.current.y += e.movementY || 0;
      } else {
        const rect = cvs.getBoundingClientRect();
        virtualCrosshair.current.x = (e.clientX - rect.left) * (cvs.width / rect.width);
        virtualCrosshair.current.y = (e.clientY - rect.top) * (cvs.height / rect.height);
      }
      virtualCrosshair.current.x = Math.max(0, Math.min(cvs.width, virtualCrosshair.current.x));
      virtualCrosshair.current.y = Math.max(0, Math.min(cvs.height, virtualCrosshair.current.y));
    };
    window.addEventListener('mousemove', h);
    return () => window.removeEventListener('mousemove', h);
  }, []);

  const cleanupAllTimers = useCallback(() => {
    if (cycleTimeoutRef.current) { clearTimeout(cycleTimeoutRef.current); cycleTimeoutRef.current = null; }
    if (flashTimeoutRef.current) { clearTimeout(flashTimeoutRef.current); flashTimeoutRef.current = null; }
    if (timerIntervalRef.current) { clearInterval(timerIntervalRef.current); timerIntervalRef.current = null; }
    if (feedbackTimeoutRef.current) { clearTimeout(feedbackTimeoutRef.current); feedbackTimeoutRef.current = null; }
    if (animationRef.current) { cancelAnimationFrame(animationRef.current); animationRef.current = null; }
  }, []);

  const applyPenalty = useCallback((reason) => {
    if (!isActiveRef.current) return;
    streakRef.current = 0;
    if (isMountedRef.current) setStreak(0);
    
    if (livesRef.current > 0) {
      livesRef.current -= 1;
      if (isMountedRef.current) setLives(livesRef.current);
      showFeedback(`✗ ${reason}! -1 life`, 'error');
      playSound('fail');
      if (livesRef.current === 0) {
        scoreRef.current = Math.max(0, scoreRef.current - 1);
        if (isMountedRef.current) setScore(scoreRef.current);
        showFeedback('⚠️ No lives! -1 point penalty', 'warning');
      }
    } else {
      scoreRef.current = Math.max(0, scoreRef.current - 1);
      if (isMountedRef.current) setScore(scoreRef.current);
      showFeedback(`✗ ${reason}! -1 point`, 'error');
      playSound('fail');
    }
    stayTimeRef.current = Math.min(MAX_STAY_TIME, stayTimeRef.current + 10);
    if (isMountedRef.current) setReactionWindow(stayTimeRef.current);
  }, [playSound, showFeedback]);

  const scheduleNextFlash = useCallback(() => {
    if (!isActiveRef.current || gameStateRef.current !== 'playing') return;
    const delay = 1000 + Math.random() * 2000;
    cycleTimeoutRef.current = setTimeout(() => {
      if (!isActiveRef.current || gameStateRef.current !== 'playing') return;
      startFlash();
    }, delay);
  }, []);

  const startFlash = useCallback(() => {
    if (!isActiveRef.current || gameStateRef.current !== 'playing') return;
    if (isMountedRef.current) setIsFlashing(true);
    startTimeRef.current = performance.now();
    playSound('ready');
    flashTimeoutRef.current = setTimeout(() => {
      if (isActiveRef.current && gameStateRef.current === 'playing' && isMountedRef.current) {
        setIsFlashing(false);
        scheduleNextFlash();
      }
    }, stayTimeRef.current);
  }, [playSound, scheduleNextFlash]);

  useEffect(() => {
    if (gameState === 'playing') {
      timerIntervalRef.current = setInterval(() => {
        if (!isMountedRef.current) return;
        setTimeLeft(prev => {
          if (prev <= 1) {
            setGameState('gameOver');
            gameStateRef.current = 'gameOver';
            isActiveRef.current = false;
            cleanupAllTimers();
            updateBestScore(scoreRef.current);
            document.exitPointerLock();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => { if (timerIntervalRef.current) { clearInterval(timerIntervalRef.current); timerIntervalRef.current = null; } };
  }, [gameState, updateBestScore, cleanupAllTimers]);

  useEffect(() => {
    if (gameState === 'playing' && isActiveRef.current) {
      scheduleNextFlash();
    }
    return () => { cleanupAllTimers(); };
  }, [gameState, scheduleNextFlash, cleanupAllTimers]);

  // FIXED: Changed from mouseup to mousedown for faster response
  useEffect(() => {
    const handleMouseDown = (e) => {
      if (e.target.tagName === 'BUTTON' || e.target.closest('button')) return;
      if (gameState !== 'playing' || !isActiveRef.current) return;
      
      const ch = virtualCrosshair.current;
      const cvs = canvasRef.current;
      if (!cvs) return;
      const dist = Math.hypot(ch.x - cvs.width/2, ch.y - cvs.height/2);
      if (dist > 80) return;
      
      if (isFlashing) {
        const reaction = Math.floor(performance.now() - startTimeRef.current);
        if (bestReactionRef.current === 0 || reaction < bestReactionRef.current) {
          bestReactionRef.current = reaction;
          if (isMountedRef.current) setBestReaction(reaction);
        }
        scoreRef.current += 1;
        if (isMountedRef.current) { setScore(scoreRef.current); setSuccessfulHits(prev => prev + 1); }
        
        const newStreak = streakRef.current + 1;
        streakRef.current = newStreak;
        if (isMountedRef.current) setStreak(newStreak);
        if (newStreak > bestStreakRef.current) { bestStreakRef.current = newStreak; if (isMountedRef.current) setBestStreak(newStreak); }
        
        if (newStreak % 5 === 0) { playSound('streak'); showFeedback(`🔥 ${newStreak} Streak!`, 'success'); }
        else { playSound('success'); showFeedback(`✓ ${reaction}ms`, 'success'); }
        
        stayTimeRef.current = Math.max(MIN_STAY_TIME, stayTimeRef.current - 5);
        if (isMountedRef.current) setReactionWindow(stayTimeRef.current);
        
        if (isMountedRef.current) setIsFlashing(false);
        if (flashTimeoutRef.current) { clearTimeout(flashTimeoutRef.current); flashTimeoutRef.current = null; }
        if (cycleTimeoutRef.current) { clearTimeout(cycleTimeoutRef.current); cycleTimeoutRef.current = null; }
        
        setTimeout(() => {
          if (gameStateRef.current === 'playing' && isActiveRef.current) scheduleNextFlash();
        }, 200);
      } else {
        applyPenalty("EARLY CLICK");
        if (cycleTimeoutRef.current) { clearTimeout(cycleTimeoutRef.current); cycleTimeoutRef.current = null; }
        if (flashTimeoutRef.current) { clearTimeout(flashTimeoutRef.current); flashTimeoutRef.current = null; }
        if (isMountedRef.current) setIsFlashing(false);
        setTimeout(() => {
          if (gameStateRef.current === 'playing' && isActiveRef.current) scheduleNextFlash();
        }, 300);
      }
    };
    
    // FIXED: mousedown instead of mouseup for immediate response
    window.addEventListener('mousedown', handleMouseDown);
    return () => window.removeEventListener('mousedown', handleMouseDown);
  }, [gameState, isFlashing, applyPenalty, scheduleNextFlash, playSound, showFeedback]);

  useEffect(() => {
    if (gameState !== 'playing') return;
    const cvs = canvasRef.current; if (!cvs) return;
    const ctx = cvs.getContext('2d');

    const update = () => {
      const container = containerRef.current; if (!container) return;
      const rr = container.getBoundingClientRect();
      let w = rr.width, h = w * (9 / 16);
      if (h > rr.height) { h = rr.height; w = h * (16 / 9); }
      cvs.width = w; cvs.height = h;
      canvasSizeRef.current = { width: w, height: h };
      cvs.style.position = 'absolute';
      cvs.style.left = `${(rr.width - w) / 2}px`;
      cvs.style.top = `${(rr.height - h) / 2}px`;
      virtualCrosshair.current = { x: w / 2, y: h / 2 };
    };

    const ro = new ResizeObserver(update);
    if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener('resize', update);
    update();

    const loop = () => {
      if (!isActiveRef.current && gameState !== 'playing') return;
      
      ctx.fillStyle = isBoxDarkMode ? "#020202" : "#f9fafb";
      ctx.fillRect(0, 0, cvs.width, cvs.height);
      
      ctx.strokeStyle = isBoxDarkMode ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)';
      ctx.lineWidth = 1;
      for (let i = 0; i < cvs.width; i += 40) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, cvs.height); ctx.stroke(); }
      
      const cx = cvs.width / 2, cy = cvs.height / 2, radius = 52;
      
      // Center ball
      ctx.beginPath(); ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      if (isFlashing) { 
        ctx.fillStyle = "#FFFFFF"; 
        ctx.shadowBlur = 15; 
        ctx.shadowColor = "#FFFFFF"; 
      } else { 
        ctx.fillStyle = isBoxDarkMode ? "#151515" : "#e0e0e0"; 
        ctx.shadowBlur = 0; 
      }
      ctx.fill(); ctx.shadowBlur = 0;
      
      // Inner ring
      ctx.beginPath(); ctx.arc(cx, cy, radius - 3, 0, Math.PI * 2);
      ctx.strokeStyle = isBoxDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)";
      ctx.lineWidth = 1; ctx.stroke();
      
      // Center dot
      ctx.beginPath(); ctx.arc(cx, cy, 4, 0, Math.PI * 2);
      ctx.fillStyle = isFlashing ? "#000000" : (isBoxDarkMode ? "#333333" : "#999999");
      ctx.fill();
      
      // Crosshair
      const ch = virtualCrosshair.current;
      if (ch.x > 0 && ch.x < cvs.width && ch.y > 0 && ch.y < cvs.height) {
        const cc = isFlashing ? '#00ff88' : 'rgba(255,255,255,0.6)';
        const lc = pointerLocked ? cc : 'rgba(255,255,255,0.4)';
        
        ctx.strokeStyle = lc; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.arc(ch.x, ch.y, 12, 0, Math.PI * 2); ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(ch.x - 24, ch.y); ctx.lineTo(ch.x - 10, ch.y);
        ctx.moveTo(ch.x + 10, ch.y); ctx.lineTo(ch.x + 24, ch.y);
        ctx.moveTo(ch.x, ch.y - 24); ctx.lineTo(ch.x, ch.y - 10);
        ctx.moveTo(ch.x, ch.y + 10); ctx.lineTo(ch.x, ch.y + 24);
        ctx.stroke();
        ctx.fillStyle = lc; ctx.beginPath(); ctx.arc(ch.x, ch.y, 3, 0, Math.PI * 2); ctx.fill();
      }
      
      animationRef.current = requestAnimationFrame(loop);
    };
    
    animationRef.current = requestAnimationFrame(loop);

    return () => { 
      cancelAnimationFrame(animationRef.current); 
      window.removeEventListener('resize', update); 
      ro.disconnect(); 
    };
  }, [gameState, isBoxDarkMode, isFlashing, pointerLocked]);

  const startGame = useCallback(() => {
    cleanupAllTimers();
    setGameState('playing'); gameStateRef.current = 'playing';
    setScore(0); setStreak(0); setBestStreak(0); setBestReaction(0);
    setReactionWindow(200); setTimeLeft(60); setLives(3);
    setSuccessfulHits(0); setFeedback(''); setIsFlashing(false);
    
    isActiveRef.current = true;
    stayTimeRef.current = 200; streakRef.current = 0; scoreRef.current = 0;
    livesRef.current = 3; bestStreakRef.current = 0; bestReactionRef.current = 0;
    
    setTimeout(() => requestPointerLock(), 300);
  }, [cleanupAllTimers, requestPointerLock]);

  const resetGame = useCallback(() => {
    cleanupAllTimers();
    isActiveRef.current = false;
    setIsFlashing(false);
    setGameState('start'); gameStateRef.current = 'start';
    setFeedback(''); setFeedbackType('');
    document.exitPointerLock();
    setLockCooldown(true); setTimeout(() => setLockCooldown(false), 1000);
  }, [cleanupAllTimers]);

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
      isActiveRef.current = false;
      cleanupAllTimers();
      document.exitPointerLock();
    };
  }, [cleanupAllTimers]);

  if (loading || !isClient) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
    </div>
  );

  return (
    <div className={`min-h-screen select-none ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!isFullscreen && (
          <nav className="mb-4">
            <ol className="flex flex-wrap items-center gap-2 text-sm">
              <li><Link href="/" className={`hover:underline ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>Home</Link></li>
              <li className={isDarkMode ? 'text-gray-500' : 'text-gray-400'}>/</li>
              <li><Link href="/drills/visual" className={`hover:underline ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>Visual Drills</Link></li>
              <li className={isDarkMode ? 'text-gray-500' : 'text-gray-400'}>/</li>
              <li className={`font-medium ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>Strobe-Latency Lab</li>
            </ol>
          </nav>
        )}
        
        {!isFullscreen && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl"><Timer className="w-6 h-6 text-white" /></div>
              <div>
                <h1 className={`text-2xl sm:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Strobe-Latency Lab</h1>
                <p className={`text-sm sm:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {pointerLocked ? '🟢 Raw input active' : '🔴 Click canvas'} • Click when ball flashes • 100-200ms
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setIsDarkMode(!isDarkMode)} className={`p-2 rounded-lg border ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`}>{isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}</button>
              <button onClick={() => setIsBoxDarkMode(!isBoxDarkMode)} className={`p-2 rounded-lg border ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`}><Eye className="w-5 h-5" /></button>
              <button onClick={() => setSoundEnabled(!soundEnabled)} className={`p-2 rounded-lg border ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`}>{soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}</button>
              <button onClick={toggleFullscreen} className={`p-2 rounded-lg border ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`}>{isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}</button>
              <button onClick={pointerLocked ? () => { document.exitPointerLock(); setLockCooldown(true); setTimeout(() => setLockCooldown(false), 1000); } : requestPointerLock} className={`p-2 rounded-lg border ${pointerLocked ? 'bg-green-500 border-green-600 text-white' : isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`}><Lock className="w-5 h-5" /></button>
            </div>
          </div>
        )}
        
        {!isFullscreen && (
          <div className="grid grid-cols-6 gap-3 mb-4 h-[88px]">
            <StatCard icon={<Target className="text-blue-600" />} value={score} label="Score" d={isDarkMode} />
            <StatCard icon={<Trophy className="text-yellow-500" />} value={bestScore} label="Best" d={isDarkMode} />
            <StatCard icon={<Clock className={timeLeft < 15 ? 'text-red-600' : 'text-green-600'} />} value={timeLeft} label="Time" unit="s" d={isDarkMode} />
            <StatCard icon={<Zap className="text-orange-500" />} value={streak} label="Streak" d={isDarkMode} />
            <StatCard icon={<Check className="text-green-500" />} value={successfulHits} label="Hits" d={isDarkMode} />
            <StatCard icon={<Heart className={lives > 0 ? 'text-red-500' : 'text-gray-500'} />} value={lives} label="Lives" d={isDarkMode} />
          </div>
        )}
        
        <div className="h-10 mb-2 flex justify-center items-center">
          <div className={`px-4 py-1.5 rounded-lg text-white font-semibold text-sm transition-all duration-200 ${feedback ? 'opacity-100 scale-100' : 'opacity-0 scale-95'} ${feedbackType === 'success' ? 'bg-green-500' : feedbackType === 'warning' ? 'bg-yellow-500' : 'bg-red-500'}`}>{feedback || '\u00A0'}</div>
        </div>
        
        <div ref={containerRef} className={`relative ${isFullscreen ? 'fixed inset-0 z-50' : 'rounded-xl border-2'}`} style={{ background: isBoxDarkMode ? "#020202" : "#fff", aspectRatio: isFullscreen ? 'auto' : '16/9', maxWidth: '100%', margin: '0 auto', borderColor: isDarkMode ? '#374151' : '#e5e7eb', overflow: 'hidden', cursor: 'none' }}>
          {isFullscreen && gameState === 'playing' && (
            <div className="absolute top-4 right-4 z-20 pointer-events-none">
              <span className="text-white/40 text-xs font-medium bg-black/40 backdrop-blur-sm rounded-lg px-3 py-1.5">Press <span className="text-white/70 font-bold">ESC</span> to exit fullscreen</span>
            </div>
          )}
          <canvas ref={canvasRef} style={{ display: 'block', position: 'absolute' }} />
          
          {gameState === 'start' && (
            <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
              <div className={`rounded-2xl p-6 sm:p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <Timer className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                <h2 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Strobe-Latency Lab</h2>
                <p className={`mb-4 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Raw input • 100-200ms window • 3 lives</p>
                <div className={`mb-6 p-3 rounded-lg border ${isBoxDarkMode ? 'border-yellow-600 bg-yellow-900/20' : 'border-yellow-200 bg-yellow-50'}`}>
                  <div className="flex items-center gap-2 mb-2"><AlertCircle className="w-4 h-4 text-yellow-500" /><p className={`text-sm font-medium ${isBoxDarkMode ? 'text-yellow-400' : 'text-yellow-700'}`}>Raw Input via Pointer Lock</p></div>
                  <p className={`text-xs ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Click ball when it flashes white. Press ESC to unlock.</p>
                </div>
                <button onClick={startGame} className="px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg w-full">Start Training</button>
                <button onClick={resetGame} className="mt-3 w-full px-4 py-2 rounded-lg border border-gray-500 text-gray-400 hover:bg-gray-700 transition-all text-sm">Reset Session</button>
              </div>
            </div>
          )}
          
          {gameState === 'gameOver' && (
            <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
              <div className={`rounded-2xl p-6 sm:p-8 shadow-xl border max-w-[520px] mx-4 ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <div className="flex items-center justify-center gap-3 mb-4"><Trophy className="w-10 h-10 text-yellow-500" /><h2 className={`text-2xl font-bold ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Training Complete</h2></div>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <RC label="Score" v={score} i={<Target className="w-4 h-4" />} c="blue" d={isBoxDarkMode} />
                  <RC label="Best" v={bestScore} i={<Trophy className="w-4 h-4" />} c="yellow" d={isBoxDarkMode} />
                  <RC label="Hits" v={successfulHits} i={<Check className="w-4 h-4" />} c="emerald" d={isBoxDarkMode} />
                  <RC label="Streak" v={bestStreak} i={<Zap className="w-4 h-4" />} c="orange" d={isBoxDarkMode} />
                  <RC label="Reaction" v={bestReaction||'-'} u="ms" i={<Clock className="w-4 h-4" />} c="cyan" d={isBoxDarkMode} />
                  <RC label="Window" v={reactionWindow} u="ms" i={<Activity className="w-4 h-4" />} c="purple" d={isBoxDarkMode} />
                </div>
                <div className="flex gap-3">
                  <Link href="/drills/visual" className="flex-1"><button className={`w-full px-4 py-2.5 rounded-lg font-semibold ${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'}`}>← Back</button></Link>
                  <button onClick={startGame} className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-lg font-semibold">Play Again →</button>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {!isFullscreen && (
          <footer className="mt-6">
            <div className={`rounded-xl border overflow-hidden ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <div className={`px-4 py-3 border-b ${isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'}`}>
                <div className="flex items-center gap-2"><Info className={`w-4 h-4 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} /><h2 className={`font-semibold text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Drill Rules & Professional Features</h2></div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-3">
                    <h3 className={`font-semibold flex items-center gap-2 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}><Timer className="w-5 h-5" />How to Play</h3>
                    <ul className={`space-y-2 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      <li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">1</span><span>Click <span className="font-semibold text-blue-400">Start Training</span></span></li>
                      <li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">2</span><span>Cursor locks for <span className="font-semibold text-blue-400">raw input</span></span></li>
                      <li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">3</span><span>Click when ball <span className="font-semibold text-blue-400">flashes white</span></span></li>
                      <li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">4</span><span>Window: <span className="font-semibold">100-200ms adaptive</span></span></li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h3 className={`font-semibold flex items-center gap-2 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}><Trophy className="w-5 h-5" />Scoring System</h3>
                    <ul className={`space-y-2 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      <li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">+1</span><span><span className="font-semibold text-green-400">Hit</span> = +1 point</span></li>
                      <li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">🔥</span><span><span className="font-semibold text-orange-400">Streak</span> every 5 hits</span></li>
                      <li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">-1</span><span><span className="font-semibold text-red-400">Early click</span> = -1 life</span></li>
                      <li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-red-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">-1</span><span><span className="font-semibold text-red-400">0 lives</span> = -1 point penalty</span></li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h3 className={`font-semibold flex items-center gap-2 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`}><Zap className="w-5 h-5" />Pro Features</h3>
                    <ul className={`space-y-2 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      <li className="flex items-start gap-2"><Lock className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" /><span><span className="font-semibold text-green-400">Raw Input</span> - Pointer Lock API</span></li>
                      <li className="flex items-start gap-2"><Activity className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" /><span><span className="font-semibold text-blue-400">Adaptive</span> - Window shrinks/expands</span></li>
                      <li className="flex items-start gap-2"><Clock className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" /><span><span className="font-semibold text-orange-400">Reaction</span> - Millisecond tracking</span></li>
                      <li className="flex items-start gap-2"><Timer className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" /><span><span className="font-semibold text-purple-400">Random</span> 1-3s intervals</span></li>
                    </ul>
                  </div>
                </div>
                <div className={`mt-4 p-4 rounded-lg border ${isDarkMode ? 'border-gray-600 bg-gray-800/50' : 'border-gray-200 bg-gray-50'}`}>
                  <h4 className={`text-sm font-semibold mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>🖱️ Controls</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}><span className="font-semibold">ESC ×2</span> - Unlock cursor, then exit</p>
                    <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}><span className="font-semibold">Click Canvas</span> - Re-lock cursor</p>
                    <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}><span className="font-semibold">F11</span> - Toggle fullscreen</p>
                    <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}><span className="font-semibold">Left Click</span> - Click when ball flashes</p>
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

function StatCard({ icon, value, label, unit = '', d }) { return (<div className={`rounded-xl shadow-sm border p-2 sm:p-3 text-center flex flex-col justify-center h-full ${d ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}><div className="mb-1 flex justify-center">{icon}</div><p className={`text-lg sm:text-xl font-bold truncate ${d ? 'text-white' : 'text-gray-900'}`}>{value}{unit}</p><p className={`text-[10px] sm:text-xs truncate ${d ? 'text-gray-400' : 'text-gray-500'}`}>{label}</p></div>); }
function RC({ label, v, unit = '', i, c, d }) { const m = { blue: 'bg-blue-500/10 border-blue-500/30 text-blue-500', yellow: 'bg-yellow-500/10 border-yellow-500/30 text-yellow-500', emerald: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-500', orange: 'bg-orange-500/10 border-orange-500/30 text-orange-500', purple: 'bg-purple-500/10 border-purple-500/30 text-purple-500', cyan: 'bg-cyan-500/10 border-cyan-500/30 text-cyan-500' }; const o = m[c] || m.blue; const [bg, border, text] = o.split(' '); return (<div className={`flex items-center justify-between p-3 rounded-lg border ${bg} ${border}`}><div className="flex items-center gap-2"><div className={text}>{i}</div><span className={`text-xs sm:text-sm ${d ? 'text-gray-300' : 'text-gray-600'}`}>{label}</span></div><span className={`font-bold text-base sm:text-lg ${text}`}>{v}{unit}</span></div>); }