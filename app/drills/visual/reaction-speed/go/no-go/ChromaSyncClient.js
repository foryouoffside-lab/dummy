'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  Eye, Zap, Timer, Trophy, Volume2, VolumeX, Sun, Moon, 
  Target, Activity, Maximize2, Minimize2,
  Heart, Check, Info, RefreshCw
} from 'lucide-react';

const BALL_RADIUS = 50;
const colorPalette = {
  GO: "#00ff77",
  NO_GO: "#ff3344"
};

export default function ChromaSyncClient() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  
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
  const [displayWindow, setDisplayWindow] = useState(250);
  const [timeLeft, setTimeLeft] = useState(60);
  const [lives, setLives] = useState(3);
  const [successfulHits, setSuccessfulHits] = useState(0);
  const [feedbackMsg, setFeedbackMsg] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);

  const stateRef = useRef("WAITING");
  const currentTargetColorRef = useRef("#020202");
  const startTimeRef = useRef(0);
  const displayTimeRef = useRef(250);
  const minDisplayTime = 80;
  const maxDisplayTime = 400;
  const streakRef = useRef(0);
  const scoreRef = useRef(0);
  const livesRef = useRef(3);
  const initializedRef = useRef(false);
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const feedbackTimeoutRef = useRef(null);
  const cycleTimeoutRef = useRef(null);
  const signalTimeoutRef = useRef(null);
  const timerIntervalRef = useRef(null);
  const isActiveRef = useRef(false);
  const gameStateRef = useRef('start');
  const audioCtxRef = useRef(null);
  const bestStreakRef = useRef(0);

  useEffect(() => { setIsClient(true); const timer = setTimeout(() => setLoading(false), 300); return () => clearTimeout(timer); }, []);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('chromaSyncBestScore');
      if (saved) { const p = parseInt(saved, 10); if (!isNaN(p)) setBestScore(p); }
    } catch (e) {}
  }, []);

  const updateBestScore = useCallback((fs) => {
    try {
      const c = parseInt(localStorage.getItem('chromaSyncBestScore') || '0', 10);
      if (fs > c) { localStorage.setItem('chromaSyncBestScore', fs.toString()); setBestScore(fs); }
    } catch (e) {}
  }, []);

  useEffect(() => { gameStateRef.current = gameState; }, [gameState]);

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

  const showFeedback = useCallback((m, t) => {
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    setFeedbackMsg(m); setFeedbackType(t);
    feedbackTimeoutRef.current = setTimeout(() => { setFeedbackMsg(''); setFeedbackType(''); }, 600);
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
      const f = { success: 880, fail: 440, streak: 1046, inhibit: 660 };
      o.frequency.setValueAtTime(f[type] || 440, now);
      g.gain.setValueAtTime(type === 'streak' ? 0.12 : type === 'inhibit' ? 0.08 : 0.1, now);
      g.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      o.start(now); o.stop(now + 0.12);
    } catch (e) {}
  }, [soundEnabled, initAudio]);

  const isMouseOverBall = useCallback((mx, my, cx, cy) => {
    return Math.hypot(mx - cx, my - cy) <= BALL_RADIUS;
  }, []);

  const startCycle = useCallback(() => {
    if (!isActiveRef.current) return;
    if (cycleTimeoutRef.current) clearTimeout(cycleTimeoutRef.current);
    if (signalTimeoutRef.current) clearTimeout(signalTimeoutRef.current);
    
    stateRef.current = "WAITING";
    currentTargetColorRef.current = isBoxDarkMode ? "#151515" : "#d1d5db";
    
    const delay = 600 + Math.random() * 900;
    
    cycleTimeoutRef.current = setTimeout(() => {
      if (stateRef.current !== "WAITING" || gameStateRef.current !== 'playing' || !isActiveRef.current) return;
      
      stateRef.current = "SIGNAL";
      const isGo = Math.random() < 0.5;
      
      if (isGo) {
        currentTargetColorRef.current = colorPalette.GO;
        startTimeRef.current = performance.now();
        
        signalTimeoutRef.current = setTimeout(() => {
          if (stateRef.current === "SIGNAL" && currentTargetColorRef.current === colorPalette.GO && isActiveRef.current) {
            stateRef.current = "WAITING";
            startCycle();
          }
        }, displayTimeRef.current);
      } else {
        currentTargetColorRef.current = colorPalette.NO_GO;
        
        signalTimeoutRef.current = setTimeout(() => {
          if (stateRef.current === "SIGNAL" && isActiveRef.current) {
            stateRef.current = "WAITING";
            streakRef.current++; setStreak(streakRef.current);
            if (streakRef.current > bestStreakRef.current) { bestStreakRef.current = streakRef.current; setBestStreak(streakRef.current); }
            playSound('inhibit');
            showFeedback('✓ Good restraint!', 'success');
            startCycle();
          }
        }, displayTimeRef.current);
      }
    }, delay);
  }, [isBoxDarkMode, playSound, showFeedback]);

  const applyPenalty = useCallback((reason) => {
    if (!isActiveRef.current) return;
    streakRef.current = 0; setStreak(0);
    
    if (livesRef.current > 0) {
      livesRef.current -= 1; setLives(livesRef.current);
      showFeedback(`✗ ${reason}! -1 life`, 'error');
      playSound('fail');
      if (livesRef.current === 0) {
        scoreRef.current = Math.max(0, scoreRef.current - 1); setScore(scoreRef.current);
        showFeedback('⚠️ No lives! -1 point', 'warning');
      }
    } else {
      scoreRef.current = Math.max(0, scoreRef.current - 1); setScore(scoreRef.current);
      showFeedback(`✗ ${reason}! -1 point`, 'error');
      playSound('fail');
    }
    displayTimeRef.current = Math.min(maxDisplayTime, displayTimeRef.current + 40);
    setDisplayWindow(displayTimeRef.current);
  }, [playSound, showFeedback]);

  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      timerIntervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setGameState('gameOver'); gameStateRef.current = 'gameOver'; isActiveRef.current = false;
            if (cycleTimeoutRef.current) clearTimeout(cycleTimeoutRef.current);
            if (signalTimeoutRef.current) clearTimeout(signalTimeoutRef.current);
            if (timerIntervalRef.current) { clearInterval(timerIntervalRef.current); timerIntervalRef.current = null; }
            updateBestScore(scoreRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => { if (timerIntervalRef.current) { clearInterval(timerIntervalRef.current); timerIntervalRef.current = null; } };
  }, [gameState, timeLeft, updateBestScore]);

  useEffect(() => {
    const h = (e) => {
      const cvs = canvasRef.current; if (!cvs) return;
      const rect = cvs.getBoundingClientRect();
      mousePositionRef.current = {
        x: (e.clientX - rect.left) * (cvs.width / rect.width),
        y: (e.clientY - rect.top) * (cvs.height / rect.height)
      };
      if (!initializedRef.current && gameState === 'playing') {
        initializedRef.current = true;
        startCycle();
      }
    };
    window.addEventListener('mousemove', h);
    return () => window.removeEventListener('mousemove', h);
  }, [gameState, startCycle]);

  useEffect(() => {
    const h = (e) => {
      if (!initializedRef.current || gameState !== 'playing' || !isActiveRef.current) return;
      const cvs = canvasRef.current; if (!cvs) return;
      const rect = cvs.getBoundingClientRect();
      const mx = (e.clientX - rect.left) * (cvs.width / rect.width);
      const my = (e.clientY - rect.top) * (cvs.height / rect.height);
      const cx = cvs.width / 2, cy = cvs.height / 2;
      
      if (!isMouseOverBall(mx, my, cx, cy)) return;

      if (stateRef.current === "SIGNAL") {
        if (currentTargetColorRef.current === colorPalette.GO) {
          const reaction = Math.floor(performance.now() - startTimeRef.current);
          setSuccessfulHits(prev => prev + 1);
          if (bestReaction === 0 || reaction < bestReaction) setBestReaction(reaction);
          
          scoreRef.current += 1; setScore(scoreRef.current);
          streakRef.current++; setStreak(streakRef.current);
          if (streakRef.current > bestStreakRef.current) { bestStreakRef.current = streakRef.current; setBestStreak(streakRef.current); }
          
          if (streakRef.current % 5 === 0 && streakRef.current > 0) { playSound('streak'); showFeedback(`🔥 ${streakRef.current} Streak! +1`, 'success'); }
          else { playSound('success'); showFeedback(`✓ ${reaction}ms | +1`, 'success'); }
          
          const speedDiff = displayTimeRef.current - reaction;
          if (speedDiff > 50) displayTimeRef.current = Math.max(minDisplayTime, displayTimeRef.current - 20);
          else if (speedDiff < 10) displayTimeRef.current = Math.min(maxDisplayTime, displayTimeRef.current + 15);
          setDisplayWindow(displayTimeRef.current);
          
          if (signalTimeoutRef.current) clearTimeout(signalTimeoutRef.current);
          stateRef.current = "WAITING";
          startCycle();
        } else if (currentTargetColorRef.current === colorPalette.NO_GO) {
          if (cycleTimeoutRef.current) clearTimeout(cycleTimeoutRef.current);
          if (signalTimeoutRef.current) clearTimeout(signalTimeoutRef.current);
          applyPenalty("CLICKED RED");
          stateRef.current = "WAITING";
          setTimeout(() => { if (gameStateRef.current === 'playing') startCycle(); }, 400);
        }
      } else if (stateRef.current === "WAITING") {
        if (cycleTimeoutRef.current) clearTimeout(cycleTimeoutRef.current);
        if (signalTimeoutRef.current) clearTimeout(signalTimeoutRef.current);
        applyPenalty("EARLY CLICK");
        stateRef.current = "WAITING";
        setTimeout(() => { if (gameStateRef.current === 'playing') startCycle(); }, 400);
      }
    };
    window.addEventListener('mousedown', h);
    return () => window.removeEventListener('mousedown', h);
  }, [gameState, bestReaction, isMouseOverBall, applyPenalty, startCycle, playSound, showFeedback]);

  useEffect(() => {
    if (gameState !== 'playing') return;
    const cvs = canvasRef.current; if (!cvs) return;
    const ctx = cvs.getContext('2d');

    const update = () => {
      const cr = containerRef.current; if (!cr) return;
      const rr = cr.getBoundingClientRect();
      let w = rr.width, h = w * (9 / 16);
      if (h > rr.height) { h = rr.height; w = h * (16 / 9); }
      cvs.width = w; cvs.height = h;
      cvs.style.position = 'absolute';
      cvs.style.left = `${(rr.width - w) / 2}px`;
      cvs.style.top = `${(rr.height - h) / 2}px`;
    };

    const ro = new ResizeObserver(update);
    if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener('resize', update);
    update();

    const draw = () => {
      const cx = cvs.width / 2, cy = cvs.height / 2;
      
      ctx.fillStyle = isBoxDarkMode ? "#020202" : "#f9fafb";
      ctx.fillRect(0, 0, cvs.width, cvs.height);
      
      // Grid
      ctx.strokeStyle = isBoxDarkMode ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)';
      ctx.lineWidth = 1;
      for (let i = 0; i < cvs.width; i += 40) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, cvs.height); ctx.stroke(); }
      
      // Target ball
      ctx.beginPath(); ctx.arc(cx, cy, BALL_RADIUS, 0, Math.PI * 2);
      
      if (stateRef.current === "SIGNAL" && initializedRef.current) {
        ctx.fillStyle = currentTargetColorRef.current;
        ctx.shadowBlur = currentTargetColorRef.current === colorPalette.GO ? 25 : 15;
        ctx.shadowColor = currentTargetColorRef.current;
      } else {
        ctx.fillStyle = isBoxDarkMode ? "#151515" : "#d1d5db";
        ctx.shadowBlur = 0;
      }
      ctx.fill(); ctx.shadowBlur = 0;
      
      // Inner ring
      ctx.beginPath(); ctx.arc(cx, cy, BALL_RADIUS - 3, 0, Math.PI * 2);
      ctx.strokeStyle = isBoxDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)";
      ctx.lineWidth = 1; ctx.stroke();
      
      // Center dot
      ctx.beginPath(); ctx.arc(cx, cy, 4, 0, Math.PI * 2);
      ctx.fillStyle = stateRef.current === "SIGNAL" ? "#000000" : (isBoxDarkMode ? "#333333" : "#999999");
      ctx.fill();
      
      // Cursor
      const m = mousePositionRef.current;
      if (m.x > 0 && m.x < cvs.width && m.y > 0 && m.y < cvs.height) {
        const isOver = isMouseOverBall(m.x, m.y, cx, cy);
        const valid = stateRef.current === "SIGNAL" && currentTargetColorRef.current === colorPalette.GO;
        
        ctx.strokeStyle = isOver && valid ? "#00ff88" : "rgba(255,255,255,0.5)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(m.x - 15, m.y); ctx.lineTo(m.x + 15, m.y);
        ctx.moveTo(m.x, m.y - 15); ctx.lineTo(m.x, m.y + 15);
        ctx.stroke();
        
        ctx.beginPath(); ctx.arc(m.x, m.y, 12, 0, Math.PI * 2);
        ctx.strokeStyle = isOver && valid ? 'rgba(0,255,136,0.4)' : 'rgba(255,255,255,0.15)';
        ctx.stroke();
        
        ctx.fillStyle = isOver && valid ? "#00ff88" : "rgba(255,255,255,0.5)";
        ctx.beginPath(); ctx.arc(m.x, m.y, 2, 0, Math.PI * 2); ctx.fill();
      }
      
      animationRef.current = requestAnimationFrame(draw);
    };
    animationRef.current = requestAnimationFrame(draw);

    return () => { cancelAnimationFrame(animationRef.current); window.removeEventListener('resize', update); ro.disconnect(); };
  }, [gameState, isBoxDarkMode, isMouseOverBall]);

  const startGame = useCallback(() => {
    setGameState('playing'); gameStateRef.current = 'playing';
    setScore(0); setStreak(0); setBestStreak(0); setBestReaction(0);
    setDisplayWindow(250); setTimeLeft(60); setLives(3); setSuccessfulHits(0); setFeedbackMsg('');
    isActiveRef.current = true; stateRef.current = "WAITING";
    displayTimeRef.current = 250; streakRef.current = 0; scoreRef.current = 0;
    livesRef.current = 3; bestStreakRef.current = 0; initializedRef.current = false;
    currentTargetColorRef.current = isBoxDarkMode ? "#151515" : "#d1d5db";
    if (cycleTimeoutRef.current) clearTimeout(cycleTimeoutRef.current);
    if (signalTimeoutRef.current) clearTimeout(signalTimeoutRef.current);
  }, [isBoxDarkMode]);

  const resetGame = useCallback(() => {
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    isActiveRef.current = false;
    setGameState('start'); gameStateRef.current = 'start';
    setScore(0); setStreak(0); setBestStreak(0); setBestReaction(0);
    setDisplayWindow(250); setTimeLeft(60); setLives(3); setSuccessfulHits(0); setFeedbackMsg('');
    scoreRef.current = 0; stateRef.current = "WAITING"; displayTimeRef.current = 250;
    streakRef.current = 0; livesRef.current = 3; bestStreakRef.current = 0; initializedRef.current = false;
    currentTargetColorRef.current = isBoxDarkMode ? "#151515" : "#d1d5db";
    if (cycleTimeoutRef.current) clearTimeout(cycleTimeoutRef.current);
    if (signalTimeoutRef.current) clearTimeout(signalTimeoutRef.current);
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
  }, [isBoxDarkMode]);

  useEffect(() => () => {
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    if (cycleTimeoutRef.current) clearTimeout(cycleTimeoutRef.current);
    if (signalTimeoutRef.current) clearTimeout(signalTimeoutRef.current);
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
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
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex flex-wrap items-center gap-2 text-sm">
              <li><Link href="/" className={`hover:underline ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>Home</Link></li>
              <li className={isDarkMode ? 'text-gray-500' : 'text-gray-400'}>/</li>
              <li><Link href="/drills/visual" className={`hover:underline ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>Visual Drills</Link></li>
              <li className={isDarkMode ? 'text-gray-500' : 'text-gray-400'}>/</li>
              <li className={`font-medium ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>Chroma-Sync Lab</li>
            </ol>
          </nav>
        )}

        {!isFullscreen && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-green-500 to-teal-600 rounded-xl">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className={`text-2xl sm:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Chroma-Sync Lab</h1>
                <p className={`text-sm sm:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Go/No-Go • Click GREEN only • Adaptive 80-400ms window
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              {gameState === 'playing' && (
                <button onClick={resetGame} className={`p-2 rounded-lg border ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-100'}`} title="Reset"><RefreshCw className="w-5 h-5" /></button>
              )}
              <button onClick={() => setIsDarkMode(!isDarkMode)} className={`p-2 rounded-lg border ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`}>{isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}</button>
              <button onClick={() => setIsBoxDarkMode(!isBoxDarkMode)} className={`p-2 rounded-lg border ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`}><Eye className="w-5 h-5" /></button>
              <button onClick={() => setSoundEnabled(!soundEnabled)} className={`p-2 rounded-lg border ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`}>{soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}</button>
              <button onClick={toggleFullscreen} className={`p-2 rounded-lg border ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`}>{isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}</button>
            </div>
          </div>
        )}

        {!isFullscreen && (
          <div className="grid grid-cols-6 gap-3 mb-4 h-[88px]">
            <StatCard icon={<Target className="text-blue-600" />} value={score} label="Score" d={isDarkMode} />
            <StatCard icon={<Trophy className="text-yellow-500" />} value={bestScore} label="Best" d={isDarkMode} />
            <StatCard icon={<Timer className={timeLeft < 15 ? 'text-red-600' : 'text-green-600'} />} value={timeLeft} label="Time" unit="s" d={isDarkMode} />
            <StatCard icon={<Zap className="text-orange-500" />} value={streak} label="Streak" d={isDarkMode} />
            <StatCard icon={<Activity className="text-purple-500" />} value={bestReaction || '-'} label="Best RT" unit="ms" d={isDarkMode} />
            <StatCard icon={<Heart className={lives > 0 ? 'text-red-500' : 'text-gray-500'} />} value={lives} label="Lives" d={isDarkMode} />
          </div>
        )}

        <div className="h-10 mb-2 flex justify-center items-center">
          <div className={`px-4 py-1.5 rounded-lg text-white font-semibold text-sm transition-all duration-200 ${feedbackMsg ? 'opacity-100 scale-100' : 'opacity-0 scale-95'} ${feedbackType === 'success' ? 'bg-green-500' : feedbackType === 'warning' ? 'bg-yellow-500' : 'bg-red-500'}`}>
            {feedbackMsg || '\u00A0'}
          </div>
        </div>

        <div ref={containerRef} className={`relative ${isFullscreen ? 'fixed inset-0 z-50' : 'rounded-xl border-2'}`} style={{ background: isBoxDarkMode ? "#020202" : "#fff", aspectRatio: isFullscreen ? 'auto' : '16/9', maxWidth: '100%', margin: '0 auto', borderColor: isDarkMode ? '#374151' : '#e5e7eb', overflow: 'hidden' }}>
          {isFullscreen && gameState === 'playing' && (
            <div className="absolute top-4 right-4 z-20 pointer-events-none">
              <span className="text-white/40 text-xs font-medium bg-black/40 backdrop-blur-sm rounded-lg px-3 py-1.5">Press <span className="text-white/70 font-bold">ESC</span> to exit fullscreen</span>
            </div>
          )}
          <canvas ref={canvasRef} style={{ display: 'block', position: 'absolute' }} />

          {gameState === 'start' && (
            <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
              <div className={`rounded-2xl p-6 sm:p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <Target className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h2 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Chroma-Sync Lab</h2>
                <p className={`mb-4 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>60s Go/No-Go • Adaptive 80-400ms window</p>
                <p className={`mb-6 text-sm ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>GREEN = click (+1pt). RED = don't click (-1 life). Missing green has no penalty.</p>
                <button onClick={startGame} className="px-8 py-3 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-xl font-semibold hover:shadow-lg w-full">Start Training</button>
               
              </div>
            </div>
          )}

          {gameState === 'gameOver' && (
            <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
              <div className={`rounded-2xl p-6 sm:p-8 shadow-xl border max-w-[520px] mx-4 ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <div className="flex items-center justify-center gap-3 mb-4"><Trophy className="w-10 h-10 text-yellow-500" /><h2 className={`text-2xl font-bold ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Session Complete!</h2></div>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <RC label="Score" v={score} i={<Target className="w-4 h-4" />} c="blue" d={isBoxDarkMode} />
                  <RC label="Best" v={bestScore} i={<Trophy className="w-4 h-4" />} c="yellow" d={isBoxDarkMode} />
                  <RC label="Streak" v={bestStreak} i={<Zap className="w-4 h-4" />} c="orange" d={isBoxDarkMode} />
                  <RC label="Reaction" v={bestReaction || '-'} u="ms" i={<Timer className="w-4 h-4" />} c="cyan" d={isBoxDarkMode} />
                  <RC label="Hits" v={successfulHits} i={<Check className="w-4 h-4" />} c="emerald" d={isBoxDarkMode} />
                  <RC label="Lives" v={lives} i={<Heart className="w-4 h-4" />} c="red" d={isBoxDarkMode} />
                </div>
                <div className="flex gap-3">
                  <Link href="/drills/visual" className="flex-1"><button className={`w-full px-4 py-2.5 rounded-lg font-semibold ${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'}`}>← Back</button></Link>
                  <button onClick={startGame} className="flex-1 px-4 py-2.5 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-lg font-semibold">Play Again →</button>
                </div>
              </div>
            </div>
          )}
        </div>

        {!isFullscreen && (
          <footer className="mt-6">
            <div className={`rounded-xl border overflow-hidden ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <div className={`px-4 py-3 border-b ${isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'}`}>
                <div className="flex items-center gap-2"><Info className={`w-4 h-4 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} /><h2 className={`font-semibold text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Drill Rules & Scoring</h2></div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-3">
                    <h3 className={`font-semibold flex items-center gap-2 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}><Target className="w-5 h-5" />How to Play</h3>
                    <ul className={`space-y-2 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      <li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">1</span><span>Ball changes to <span className="font-semibold text-green-400">GREEN</span> or <span className="font-semibold text-red-400">RED</span></span></li>
                      <li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">2</span><span>Click only on <span className="font-semibold text-green-400">GREEN</span> balls</span></li>
                      <li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">3</span><span>Do <span className="font-semibold text-red-400">NOT</span> click RED balls</span></li>
                      <li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">4</span><span>Adaptive <span className="font-semibold">80-400ms</span> display window</span></li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h3 className={`font-semibold flex items-center gap-2 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}><Trophy className="w-5 h-5" />Scoring System</h3>
                    <ul className={`space-y-2 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      <li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">+1</span><span><span className="font-semibold text-blue-400">Green hit</span> = +1 point</span></li>
                      <li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">-1</span><span><span className="font-semibold text-red-400">Red click</span> = -1 life</span></li>
                      <li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">-1</span><span><span className="font-semibold text-orange-400">Early click</span> = -1 life</span></li>
                      <li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-red-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">-1</span><span><span className="font-semibold text-red-400">0 lives</span> = -1 point penalty</span></li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h3 className={`font-semibold flex items-center gap-2 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`}><Zap className="w-5 h-5" />Key Features</h3>
                    <ul className={`space-y-2 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      <li className="flex items-start gap-2"><Target className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" /><span><span className="font-semibold text-green-400">Go/No-Go</span> impulse control</span></li>
                      <li className="flex items-start gap-2"><Activity className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" /><span><span className="font-semibold text-blue-400">Adaptive</span> window 80-400ms</span></li>
                      <li className="flex items-start gap-2"><Timer className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" /><span><span className="font-semibold text-orange-400">Reaction</span> time tracking</span></li>
                      <li className="flex items-start gap-2"><Zap className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" /><span><span className="font-semibold text-purple-400">5-streak</span> bonus notifications</span></li>
                    </ul>
                  </div>
                </div>
                <div className={`mt-4 p-4 rounded-lg border ${isDarkMode ? 'border-gray-600 bg-gray-800/50' : 'border-gray-200 bg-gray-50'}`}>
                  <h4 className={`text-sm font-semibold mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>🖱️ Controls</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}><span className="font-semibold">Left Click</span> - Click green ball only</p>
                    <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}><span className="font-semibold">Restraint</span> - Don't click red balls</p>
                    <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}><span className="font-semibold">ESC</span> - Exit fullscreen</p>
                    <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}><span className="font-semibold">F11</span> - Toggle fullscreen</p>
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

function StatCard({ icon, value, label, unit = '', d }) { 
  return (<div className={`rounded-xl shadow-sm border p-2 sm:p-3 text-center flex flex-col justify-center h-full ${d ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}><div className="mb-1 flex justify-center">{icon}</div><p className={`text-lg sm:text-xl font-bold truncate ${d ? 'text-white' : 'text-gray-900'}`}>{value}{unit}</p><p className={`text-[10px] sm:text-xs truncate ${d ? 'text-gray-400' : 'text-gray-500'}`}>{label}</p></div>); 
}

function RC({ label, v, unit = '', i, c, d }) { 
  const m = { blue:'bg-blue-500/10 border-blue-500/30 text-blue-500', yellow:'bg-yellow-500/10 border-yellow-500/30 text-yellow-500', emerald:'bg-emerald-500/10 border-emerald-500/30 text-emerald-500', orange:'bg-orange-500/10 border-orange-500/30 text-orange-500', cyan:'bg-cyan-500/10 border-cyan-500/30 text-cyan-500', red:'bg-red-500/10 border-red-500/30 text-red-500' }; 
  const o = m[c] || m.blue; const [bg, border, text] = o.split(' '); 
  return (<div className={`flex items-center justify-between p-3 rounded-lg border ${bg} ${border}`}><div className="flex items-center gap-2"><div className={text}>{i}</div><span className={`text-xs sm:text-sm ${d ? 'text-gray-300' : 'text-gray-600'}`}>{label}</span></div><span className={`font-bold text-base sm:text-lg ${text}`}>{v}{unit}</span></div>); 
}