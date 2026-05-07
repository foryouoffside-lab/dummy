'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  Target, Zap, Timer, Trophy, 
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, Eye,
  Info, Activity, Crosshair,
  Lock, AlertCircle
} from 'lucide-react';

const TARGET_FPS = 360;
const TARGET_RADIUS = 25;
const GAME_DURATION = 60;
const SCORE_INTERVAL = 2000; // +1 point every 2 seconds on target

export default function ProSmoothPursuitClient() {
  const [loading, setLoading] = useState(true);
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
  const [trackingAccuracy, setTrackingAccuracy] = useState(0);
  const [bestAccuracy, setBestAccuracy] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  const [isClient, setIsClient] = useState(false);
  const [pointerLocked, setPointerLocked] = useState(false);
  const [lockCooldown, setLockCooldown] = useState(false);
  
  const tRef = useRef(0);
  const speedRef = useRef(1.5);
  const isHitRef = useRef(false);
  const framesOnTargetRef = useRef(0);
  const totalFramesRef = useRef(0);
  const scoreRef = useRef(0);
  const streakRef = useRef(0);
  const bestAccuracyRef = useRef(0);
  const bestStreakRef = useRef(0);
  const trackingAccumulatorRef = useRef(0);
  const timerIntervalRef = useRef(null);
  const feedbackTimeoutRef = useRef(null);
  const isActiveRef = useRef(false);
  const gameStateRef = useRef('start');
  const audioCtxRef = useRef(null);
  const virtualCrosshair = useRef({ x: 0, y: 0 });
  const canvasSizeRef = useRef({ width: 0, height: 0 });

  useEffect(() => { setIsClient(true); const timer = setTimeout(() => setLoading(false), 300); return () => clearTimeout(timer); }, []);

  useEffect(() => {
    try {
      const savedBestScore = localStorage.getItem('proSmoothPursuitBestScore');
      if (savedBestScore) { const parsed = parseInt(savedBestScore, 10); if (!isNaN(parsed)) setBestScore(parsed); }
    } catch (e) {}
  }, []);

  const updateBestScore = useCallback((finalScore) => {
    try {
      const currentBest = parseInt(localStorage.getItem('proSmoothPursuitBestScore') || '0', 10);
      if (finalScore > currentBest) { localStorage.setItem('proSmoothPursuitBestScore', finalScore.toString()); setBestScore(finalScore); }
    } catch (e) {}
  }, []);

  useEffect(() => { gameStateRef.current = gameState; }, [gameState]);

  const showFeedback = useCallback((message, type) => {
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    setFeedback(message); setFeedbackType(type);
    feedbackTimeoutRef.current = setTimeout(() => { setFeedback(''); setFeedbackType(''); }, 1000);
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
      const f = { score: 880, streak: 1046 };
      osc.frequency.setValueAtTime(f[type] || 880, now);
      gain.gain.setValueAtTime(type === 'streak' ? 0.12 : 0.08, now);
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
      }
      
      virtualCrosshair.current.x = Math.max(0, Math.min(cvs.width, virtualCrosshair.current.x));
      virtualCrosshair.current.y = Math.max(0, Math.min(cvs.height, virtualCrosshair.current.y));
    };
    window.addEventListener('mousemove', h);
    return () => window.removeEventListener('mousemove', h);
  }, []);

  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      timerIntervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) { 
            setGameState('gameOver'); 
            gameStateRef.current = 'gameOver'; 
            isActiveRef.current = false; 
            if (timerIntervalRef.current) { clearInterval(timerIntervalRef.current); timerIntervalRef.current = null; } 
            updateBestScore(scoreRef.current); 
            document.exitPointerLock(); 
            return 0; 
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => { if (timerIntervalRef.current) { clearInterval(timerIntervalRef.current); timerIntervalRef.current = null; } };
  }, [gameState, timeLeft, updateBestScore]);

  useEffect(() => {
    if (gameState !== 'playing') return;
    const cvs = canvasRef.current; if (!cvs) return;
    const ctx = cvs.getContext('2d');

    const updateCanvasSize = () => {
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

    const ro = new ResizeObserver(updateCanvasSize);
    if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener('resize', updateCanvasSize);
    updateCanvasSize();

    const STEP = 1 / TARGET_FPS;
    let lastTime = performance.now();
    let dt = 0;
    tRef.current = 0;
    trackingAccumulatorRef.current = 0;

    function update(step) {
      if (!isActiveRef.current) return { tx: 0, ty: 0 };
      
      tRef.current += speedRef.current * step;
      const w = cvs.width, h = cvs.height;
      const tx = w / 2 + Math.cos(tRef.current * 0.8) * (w / 2.5);
      const ty = h / 2 + Math.sin(tRef.current * 1.2) * (h / 3);

      const ch = virtualCrosshair.current;
      const dist = Math.hypot(ch.x - tx, ch.y - ty);
      isHitRef.current = dist < TARGET_RADIUS;

      totalFramesRef.current++;
      
      if (isHitRef.current) {
        framesOnTargetRef.current++;
        streakRef.current++; 
        setStreak(streakRef.current);
        if (streakRef.current > bestStreakRef.current) { 
          bestStreakRef.current = streakRef.current; 
          setBestStreak(streakRef.current); 
        }
        
        // Accumulate tracking time, score every 2 seconds
        trackingAccumulatorRef.current += step * 1000;
        while (trackingAccumulatorRef.current >= SCORE_INTERVAL) {
          scoreRef.current += 1;
          setScore(scoreRef.current);
          trackingAccumulatorRef.current -= SCORE_INTERVAL;
          playSound('score');
          showFeedback('✓ +1', 'success');
        }
      } else {
        trackingAccumulatorRef.current = 0;
        if (streakRef.current > 0) { streakRef.current = 0; setStreak(0); }
      }

      if (totalFramesRef.current % 10 === 0) {
        const acc = (framesOnTargetRef.current / totalFramesRef.current) * 100;
        setTrackingAccuracy(Math.round(acc * 10) / 10);
        if (acc > bestAccuracyRef.current) { 
          bestAccuracyRef.current = acc; 
          setBestAccuracy(Math.round(acc * 10) / 10); 
        }
      }
      
      return { tx, ty };
    }

    function draw(tx, ty) {
      ctx.fillStyle = isBoxDarkMode ? '#020202' : '#f9fafb';
      ctx.fillRect(0, 0, cvs.width, cvs.height);
      
      ctx.strokeStyle = isBoxDarkMode ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)';
      ctx.lineWidth = 1;
      for (let i = 0; i < cvs.width; i += 40) { 
        ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, cvs.height); ctx.stroke(); 
      }
      
      ctx.beginPath(); 
      ctx.arc(tx, ty, TARGET_RADIUS, 0, Math.PI * 2);
      if (isHitRef.current) { 
        ctx.fillStyle = '#00ff88'; ctx.shadowColor = '#00ff88'; ctx.shadowBlur = 12; 
      } else { 
        ctx.fillStyle = '#ffffff'; ctx.shadowBlur = 0; 
      }
      ctx.fill(); ctx.shadowBlur = 0;
      
      ctx.beginPath(); ctx.arc(tx, ty, TARGET_RADIUS * 0.5, 0, Math.PI * 2);
      ctx.strokeStyle = isHitRef.current ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.15)'; 
      ctx.lineWidth = 1.5; ctx.stroke();
      
      ctx.beginPath(); ctx.arc(tx, ty, 2, 0, Math.PI * 2); 
      ctx.fillStyle = '#000000'; ctx.fill();
      
      const ch = virtualCrosshair.current;
      if (ch.x > 0 && ch.x < cvs.width && ch.y > 0 && ch.y < cvs.height) {
        const cc = isHitRef.current ? '#00ff88' : 'rgba(255,255,255,0.6)';
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
        
        ctx.strokeStyle = 'rgba(255,255,255,0.2)'; ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(ch.x - 18, ch.y); ctx.lineTo(ch.x - 13, ch.y);
        ctx.moveTo(ch.x + 13, ch.y); ctx.lineTo(ch.x + 18, ch.y);
        ctx.moveTo(ch.x, ch.y - 18); ctx.lineTo(ch.x, ch.y - 13);
        ctx.moveTo(ch.x, ch.y + 13); ctx.lineTo(ch.x, ch.y + 18);
        ctx.stroke();
        
        ctx.beginPath(); ctx.moveTo(ch.x, ch.y); ctx.lineTo(tx, ty); 
        ctx.strokeStyle = `rgba(0,255,136,${0.15 + (isHitRef.current ? 0.2 : 0)})`; 
        ctx.lineWidth = 1; ctx.stroke();
        
        if (isHitRef.current) {
          ctx.beginPath(); ctx.arc(ch.x, ch.y, TARGET_RADIUS, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(0,255,136,0.25)'; ctx.lineWidth = 1.5; ctx.stroke();
        }
      }
    }

    function loop(now) {
      if (!isActiveRef.current) return;
      dt += Math.min(1, (now - lastTime) / 1000); 
      lastTime = now;
      let targetPos = { tx: cvs.width / 2, ty: cvs.height / 2 };
      while (dt > STEP) { 
        targetPos = update(STEP); 
        dt -= STEP; 
      }
      draw(targetPos.tx, targetPos.ty);
      animationRef.current = requestAnimationFrame(loop);
    }
    
    animationRef.current = requestAnimationFrame(loop);

    return () => { 
      cancelAnimationFrame(animationRef.current); 
      window.removeEventListener('resize', updateCanvasSize); 
      ro.disconnect(); 
    };
  }, [gameState, isBoxDarkMode, pointerLocked, playSound, showFeedback]);

  const startGame = useCallback(() => {
    setGameState('playing'); 
    gameStateRef.current = 'playing';
    setScore(0); setStreak(0); setBestStreak(0); setTrackingAccuracy(0); setBestAccuracy(0);
    setTimeLeft(GAME_DURATION); setFeedback('');
    
    isActiveRef.current = true; 
    scoreRef.current = 0; streakRef.current = 0;
    bestStreakRef.current = 0; bestAccuracyRef.current = 0;
    framesOnTargetRef.current = 0; totalFramesRef.current = 0; tRef.current = 0;
    trackingAccumulatorRef.current = 0;
    
    setTimeout(() => requestPointerLock(), 300);
    showFeedback('Track the target! +1pt every 2s', 'success');
  }, [showFeedback, requestPointerLock]);

  const resetGame = useCallback(() => {
    isActiveRef.current = false;
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    setGameState('start'); gameStateRef.current = 'start';
    setFeedback(''); setFeedbackType('');
    document.exitPointerLock();
    setLockCooldown(true); setTimeout(() => setLockCooldown(false), 1000);
  }, []);

  useEffect(() => () => { 
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current); 
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current); 
    if (animationRef.current) cancelAnimationFrame(animationRef.current); 
    document.exitPointerLock(); 
  }, []);

  if (loading || !isClient) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto" />
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
              <li><Link href="/drills/fps" className={`hover:underline ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>FPS Drills</Link></li>
              <li className={isDarkMode ? 'text-gray-500' : 'text-gray-400'}>/</li>
              <li className={`font-medium ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>Pro Smooth Pursuit</li>
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
                <h1 className={`text-2xl sm:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Pro Smooth Pursuit</h1>
                <p className={`text-sm sm:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {pointerLocked ? '🟢 Raw input active' : '🔴 Click canvas'} • +1pt/2s • Lissajous curve • Max 30
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
          <div className="grid grid-cols-5 gap-3 mb-4 h-[88px]">
            <StatCard icon={<Target className="text-blue-600" />} value={score} label="Score" d={isDarkMode} />
            <StatCard icon={<Trophy className="text-yellow-500" />} value={bestScore} label="Best" d={isDarkMode} />
            <StatCard icon={<Timer className={timeLeft < 15 ? 'text-red-600' : 'text-green-600'} />} value={timeLeft} label="Time" unit="s" d={isDarkMode} />
            <StatCard icon={<Activity className="text-purple-500" />} value={trackingAccuracy} label="Accuracy" unit="%" d={isDarkMode} />
            <StatCard icon={<Zap className="text-orange-500" />} value={streak} label="Streak" d={isDarkMode} />
          </div>
        )}
        
        <div className="h-10 mb-2 flex justify-center items-center">
          <div className={`px-4 py-1.5 rounded-lg text-white font-semibold text-sm transition-all duration-200 ${feedback ? 'opacity-100 scale-100' : 'opacity-0 scale-95'} ${feedbackType === 'success' ? 'bg-green-500' : 'bg-yellow-500'}`}>{feedback || '\u00A0'}</div>
        </div>
        
        <div ref={containerRef} className={`relative ${isFullscreen ? 'fixed inset-0 z-50' : 'rounded-xl border-2'}`} style={{ background: isBoxDarkMode ? '#020202' : '#f9fafb', aspectRatio: isFullscreen ? 'auto' : '16/9', maxWidth: '100%', margin: '0 auto', borderColor: isDarkMode ? '#374151' : '#e5e7eb', overflow: 'hidden', cursor: 'none' }}>
          {isFullscreen && gameState === 'playing' && (
            <div className="absolute top-4 right-4 z-20 pointer-events-none">
              <span className="text-white/40 text-xs font-medium bg-black/40 backdrop-blur-sm rounded-lg px-3 py-1.5">Press <span className="text-white/70 font-bold">ESC</span> to exit fullscreen</span>
            </div>
          )}
          <canvas ref={canvasRef} style={{ display: 'block', position: 'absolute' }} />
          
          {gameState === 'start' && (
            <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
              <div className={`rounded-2xl p-6 sm:p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <Crosshair className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h2 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Pro Smooth Pursuit</h2>
                <p className={`mb-4 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Raw input • +1pt/2s • Lissajous curve • 360Hz • Max 30</p>
                <div className={`mb-6 p-3 rounded-lg border ${isBoxDarkMode ? 'border-yellow-600 bg-yellow-900/20' : 'border-yellow-200 bg-yellow-50'}`}>
                  <div className="flex items-center gap-2 mb-2"><AlertCircle className="w-4 h-4 text-yellow-500" /><p className={`text-sm font-medium ${isBoxDarkMode ? 'text-yellow-400' : 'text-yellow-700'}`}>Raw Input via Pointer Lock</p></div>
                  <p className={`text-xs ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Track the target. +1pt every 2s on target. Max 30 points. Press ESC to unlock.</p>
                </div>
                <button onClick={startGame} className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-lg w-full">Start Training</button>
                <button onClick={resetGame} className="mt-3 w-full px-4 py-2 rounded-lg border border-gray-500 text-gray-400 hover:bg-gray-700 transition-all text-sm">Reset Session</button>
              </div>
            </div>
          )}
          
          {gameState === 'gameOver' && (
            <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
              <div className={`rounded-2xl p-6 sm:p-8 shadow-xl border max-w-[520px] mx-4 ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <div className="flex items-center justify-center gap-3 mb-4"><Trophy className="w-10 h-10 text-yellow-500" /><h2 className={`text-2xl font-bold ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Training Complete</h2></div>
                <p className={`text-center text-sm mb-4 ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Max possible: 30 points (60s ÷ 2s with perfect tracking)</p>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <RC label="Score" v={score} i={<Target className="w-4 h-4" />} c="blue" d={isBoxDarkMode} />
                  <RC label="Best" v={bestScore} i={<Trophy className="w-4 h-4" />} c="yellow" d={isBoxDarkMode} />
                  <RC label="Accuracy" v={bestAccuracy} u="%" i={<Activity className="w-4 h-4" />} c="purple" d={isBoxDarkMode} />
                  <RC label="Streak" v={bestStreak} i={<Zap className="w-4 h-4" />} c="orange" d={isBoxDarkMode} />
                </div>
                <div className="flex gap-3">
                  <Link href="/drills/fps" className="flex-1"><button className={`w-full px-4 py-2.5 rounded-lg font-semibold ${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'}`}>← Back</button></Link>
                  <button onClick={startGame} className="flex-1 px-4 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-semibold">Track Again →</button>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {!isFullscreen && (
          <footer className="mt-6">
            <div className={`rounded-xl border overflow-hidden ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <div className={`px-4 py-3 border-b ${isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'}`}>
                <div className="flex items-center gap-2"><Info className={`w-4 h-4 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} /><h2 className={`font-semibold text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Drill Rules & Professional Features</h2></div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-3">
                    <h3 className={`font-semibold ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>How to Play</h3>
                    <ul className={`space-y-2 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      <li>• Track the moving white target</li>
                      <li>• Cursor locks for raw input</li>
                      <li>• Score anywhere on the ball</li>
                      <li>• Green = tracked, White = off-target</li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h3 className={`font-semibold ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>Scoring</h3>
                    <ul className={`space-y-2 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      <li>• +1 point every 2 seconds</li>
                      <li>• Max 30 with perfect tracking</li>
                      <li>• Streak bonus notifications</li>
                      <li>• No penalties</li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h3 className={`font-semibold ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`}>Pro Features</h3>
                    <ul className={`space-y-2 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      <li>• Pointer Lock API</li>
                      <li>• Lissajous curve at 360Hz</li>
                      <li>• Real-time accuracy</li>
                      <li>• Best score saved</li>
                    </ul>
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
function RC({ label, v, unit = '', i, c, d }) { const m = { blue: 'bg-blue-500/10 border-blue-500/30 text-blue-500', yellow: 'bg-yellow-500/10 border-yellow-500/30 text-yellow-500', orange: 'bg-orange-500/10 border-orange-500/30 text-orange-500', purple: 'bg-purple-500/10 border-purple-500/30 text-purple-500' }; const o = m[c] || m.blue; const [bg, border, text] = o.split(' '); return (<div className={`flex items-center justify-between p-3 rounded-lg border ${bg} ${border}`}><div className="flex items-center gap-2"><div className={text}>{i}</div><span className={`text-xs sm:text-sm ${d ? 'text-gray-300' : 'text-gray-600'}`}>{label}</span></div><span className={`font-bold text-base sm:text-lg ${text}`}>{v}{unit}</span></div>); }