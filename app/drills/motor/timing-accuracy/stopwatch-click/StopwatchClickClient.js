'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Target, Zap, Clock, Award, Activity, 
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, 
  Eye, Timer, Brain, X, Trophy, Info, RefreshCw
} from 'lucide-react';

export default function StopwatchClickClient() {
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
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [targetTime, setTargetTime] = useState(1000);
  const [lastError, setLastError] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [misses, setMisses] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  const [state, setState] = useState('TARGET');
  const [displayTimer, setDisplayTimer] = useState(1.5);
  const [perfectHits, setPerfectHits] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [clickedTime, setClickedTime] = useState(0);
  const [isClient, setIsClient] = useState(false);
  
  const scoreRef = useRef(0);
  const streakRef = useRef(0);
  const bestStreakRef = useRef(0);
  const targetTimeRef = useRef(1000);
  const lastErrorRef = useRef(0);
  const stateRef = useRef('TARGET');
  const startTimeRef = useRef(0);
  const displayTimerRef = useRef(1.5);
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const totalAttemptsRef = useRef(0);
  const hitsRef = useRef(0);
  const perfectHitsRef = useRef(0);
  const timerIntervalRef = useRef(null);
  const feedbackTimeoutRef = useRef(null);
  const isActiveRef = useRef(false);
  const gameStateRef = useRef('start');
  const audioCtxRef = useRef(null);
  const clickedTimeRef = useRef(0);

  const PENALTY = 1;

  // Mark as client-side rendered
  useEffect(() => { setIsClient(true); const t = setTimeout(() => setLoading(false), 300); return () => clearTimeout(t); }, []);

  // Load best scores
  useEffect(() => {
    try {
      const sb = localStorage.getItem('sustainedInterceptBestScore');
      const ss = localStorage.getItem('sustainedInterceptBestStreak');
      if (sb) { const p = parseInt(sb, 10); if (!isNaN(p)) setBestScore(p); }
      if (ss) { const p = parseInt(ss, 10); if (!isNaN(p)) setBestStreak(p); }
    } catch (e) { /* localStorage not available */ }
  }, []);

  const updateBestScore = useCallback((finalScore) => {
    try {
      const cb = parseInt(localStorage.getItem('sustainedInterceptBestScore') || '0', 10);
      if (finalScore > cb) { localStorage.setItem('sustainedInterceptBestScore', finalScore.toString()); setBestScore(finalScore); }
    } catch (e) { /* localStorage not available */ }
  }, []);

  useEffect(() => { gameStateRef.current = gameState; }, [gameState]);

  const toggleFullscreen = useCallback(async () => {
    try {
      if (!isFullscreen) { const el = containerRef.current; if (el?.requestFullscreen) { await el.requestFullscreen(); setIsFullscreen(true); } }
      else { if (document.fullscreenElement) await document.exitFullscreen(); setIsFullscreen(false); }
    } catch (e) { console.error('Fullscreen error:', e); }
  }, [isFullscreen]);

  useEffect(() => { const h = () => setIsFullscreen(!!document.fullscreenElement); document.addEventListener('fullscreenchange', h); return () => document.removeEventListener('fullscreenchange', h); }, []);

  const showFeedback = useCallback((message, type) => {
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    setFeedback(message); setFeedbackType(type);
    feedbackTimeoutRef.current = setTimeout(() => { setFeedback(''); setFeedbackType(''); }, 600);
  }, []);

  const initAudio = useCallback(() => {
    try { if (!audioCtxRef.current) audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)(); if (audioCtxRef.current.state === 'suspended') audioCtxRef.current.resume(); return audioCtxRef.current; }
    catch (e) { return null; }
  }, []);

  const playSound = useCallback((type) => {
    if (!soundEnabled) return;
    try {
      const audioCtx = initAudio(); if (!audioCtx) return;
      const osc = audioCtx.createOscillator(); const gain = audioCtx.createGain();
      osc.connect(gain); gain.connect(audioCtx.destination);
      const now = audioCtx.currentTime;
      const freqMap = { perfect: 1046.5, good: 880, miss: 440, streak: 1318.52, ready: 660 };
      osc.frequency.setValueAtTime(freqMap[type] || 660, now);
      gain.gain.setValueAtTime(type === 'streak' ? 0.15 : 0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      osc.start(now); osc.stop(now + 0.12);
    } catch (e) { /* Audio not supported */ }
  }, [soundEnabled, initAudio]);

  const updateAccuracy = useCallback(() => {
    const total = totalAttemptsRef.current;
    setAccuracy(total > 0 ? Math.round((hitsRef.current / total) * 100) : 100);
  }, []);

  // Timer
  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      timerIntervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) { setGameState('gameOver'); gameStateRef.current = 'gameOver'; isActiveRef.current = false; if (timerIntervalRef.current) clearInterval(timerIntervalRef.current); updateBestScore(scoreRef.current); return 0; }
          return prev - 1;
        });
      }, 1000);
    }
    return () => { if (timerIntervalRef.current) clearInterval(timerIntervalRef.current); };
  }, [gameState, timeLeft, updateBestScore]);

  const handleMiss = useCallback((reason) => {
    if (!isActiveRef.current) return;
    totalAttemptsRef.current++; setMisses(prev => prev + 1);
    streakRef.current = 0; setStreak(0);
    scoreRef.current = Math.max(0, scoreRef.current - PENALTY); setScore(scoreRef.current);
    playSound('miss'); showFeedback(`✗ ${reason}! -${PENALTY} point penalty`, 'error');
    updateAccuracy();
  }, [PENALTY, updateAccuracy, playSound, showFeedback]);

  // Mouse tracking
  useEffect(() => {
    const h = (e) => { const cvs = canvasRef.current; if (!cvs) return; const rect = cvs.getBoundingClientRect(); const sx = cvs.width / rect.width; const sy = cvs.height / rect.height; mousePositionRef.current = { x: (e.clientX - rect.left) * sx, y: (e.clientY - rect.top) * sy }; };
    window.addEventListener('mousemove', h); return () => window.removeEventListener('mousemove', h);
  }, []);

  const generateNewRound = useCallback(() => {
    if (!isActiveRef.current) return;
    const newTargetTime = 1000 + Math.floor(Math.random() * 7001);
    targetTimeRef.current = newTargetTime; setTargetTime(newTargetTime);
    stateRef.current = 'TARGET'; setState('TARGET');
    displayTimerRef.current = 1.5; setDisplayTimer(1.5);
    playSound('ready');
  }, [playSound]);

  // Click handler
  useEffect(() => {
    const handleMouseDown = () => {
      if (gameStateRef.current !== 'playing' || !isActiveRef.current) return;
      if (stateRef.current === 'TIMER') {
        const now = performance.now(); const elapsed = now - startTimeRef.current;
        const error = elapsed - targetTimeRef.current;
        lastErrorRef.current = error; setLastError(error);
        clickedTimeRef.current = elapsed; setClickedTime(elapsed);
        totalAttemptsRef.current++;
        const errorAbs = Math.abs(error);
        if (errorAbs < 150) {
          hitsRef.current++;
          if (errorAbs < 25) { perfectHitsRef.current++; setPerfectHits(perfectHitsRef.current); playSound('perfect'); }
          else playSound('good');
          scoreRef.current += 1; setScore(scoreRef.current);
          const newStreak = streakRef.current + 1; streakRef.current = newStreak; setStreak(newStreak);
          if (newStreak > bestStreakRef.current) { bestStreakRef.current = newStreak; setBestStreak(newStreak); try { localStorage.setItem('sustainedInterceptBestStreak', newStreak.toString()); } catch (e) {} }
          if (newStreak % 5 === 0 && newStreak > 0) { playSound('streak'); showFeedback(`🔥 ${newStreak} Streak! +1`, 'success'); }
          else { const rating = errorAbs < 25 ? 'PERFECT' : errorAbs < 75 ? 'GOOD' : 'OK'; showFeedback(`✓ ${rating}! +1 point`, 'success'); }
          updateAccuracy();
        } else handleMiss('MISS');
        stateRef.current = 'RESULT'; setState('RESULT');
      } else if (stateRef.current === 'RESULT') generateNewRound();
    };
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('contextmenu', (e) => e.preventDefault());
    return () => { window.removeEventListener('mousedown', handleMouseDown); window.removeEventListener('contextmenu', (e) => e.preventDefault()); };
  }, [playSound, showFeedback, handleMiss, generateNewRound, updateAccuracy]);

  // Cleanup
  useEffect(() => { return () => { isActiveRef.current = false; if (timerIntervalRef.current) clearInterval(timerIntervalRef.current); if (audioCtxRef.current) { audioCtxRef.current.close(); audioCtxRef.current = null; } }; }, []);

  // Canvas
  useEffect(() => {
    if (gameState !== 'playing') return;
    const cvs = canvasRef.current; if (!cvs) return; const ctx = cvs.getContext('2d');

    const updateCanvasSize = () => {
      const container = containerRef.current; if (!container) return;
      const rect = container.getBoundingClientRect();
      let w = rect.width; let h = w * (9 / 16); if (h > rect.height) { h = rect.height; w = h * (16 / 9); }
      cvs.width = w; cvs.height = h; cvs.style.position = 'absolute';
      cvs.style.left = `${(rect.width - w) / 2}px`; cvs.style.top = `${(rect.height - h) / 2}px`;
    };

    const ro = new ResizeObserver(updateCanvasSize); if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener('resize', updateCanvasSize); updateCanvasSize();
    generateNewRound();
    let lastFrameTime = performance.now();

    function update(dt) {
      if (!isActiveRef.current) return;
      if (stateRef.current === 'TARGET') { displayTimerRef.current -= dt; setDisplayTimer(Math.max(0, displayTimerRef.current)); if (displayTimerRef.current <= 0) { stateRef.current = 'TIMER'; setState('TIMER'); startTimeRef.current = performance.now(); } }
    }

    function draw() {
      const now = performance.now(); const dt = Math.min(0.033, (now - lastFrameTime) / 1000); lastFrameTime = now; update(dt);
      const cx = cvs.width / 2; const cy = cvs.height / 2;
      ctx.fillStyle = isBoxDarkMode ? "#020202" : "#f9fafb"; ctx.fillRect(0, 0, cvs.width, cvs.height);
      ctx.strokeStyle = isBoxDarkMode ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)'; ctx.lineWidth = 1;
      for (let i = 0; i < cvs.width; i += 40) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, cvs.height); ctx.stroke(); }
      
      if (stateRef.current === 'TARGET') { ctx.fillStyle = isBoxDarkMode ? "#FFFFFF" : "#000000"; ctx.font = "bold 50px monospace"; ctx.textAlign = "center"; ctx.fillText(`${(targetTimeRef.current / 1000).toFixed(3)}s`, cx, cy); ctx.fillStyle = "#00ff88"; ctx.font = "14px monospace"; ctx.fillText("TARGET", cx, cy + 50); }
      if (stateRef.current === 'TIMER') { const elapsed = performance.now() - startTimeRef.current; ctx.fillStyle = isBoxDarkMode ? "#FFFFFF" : "#000000"; ctx.font = "bold 80px monospace"; ctx.textAlign = "center"; ctx.fillText((elapsed / 1000).toFixed(3), cx, cy); ctx.fillStyle = "#00ff88"; ctx.font = "14px monospace"; ctx.fillText("CLICK", cx, cy + 60); }
      if (stateRef.current === 'RESULT') {
        const error = lastErrorRef.current; const errorAbs = Math.abs(error);
        const isHit = errorAbs < 150;
        const rating = isHit ? (errorAbs < 25 ? 'PERFECT' : errorAbs < 75 ? 'GOOD' : 'OK') : 'MISS';
        const color = isHit ? (errorAbs < 25 ? '#00ff88' : errorAbs < 75 ? '#00FFFF' : '#FFA500') : '#FF3E3E';
        ctx.fillStyle = color; ctx.font = "bold 50px monospace"; ctx.textAlign = "center"; ctx.fillText(rating, cx, cy - 40);
        ctx.fillStyle = isBoxDarkMode ? "#888" : "#666"; ctx.font = "20px monospace"; ctx.fillText(`${(clickedTimeRef.current / 1000).toFixed(3)}s`, cx, cy + 10);
        ctx.fillStyle = color; ctx.font = "16px monospace"; ctx.fillText(`${error > 0 ? '+' : ''}${error.toFixed(0)}ms`, cx, cy + 40);
        ctx.fillStyle = "#00ff88"; ctx.font = "12px monospace"; ctx.fillText("Click to continue", cx, cy + 80);
      }

      const m = mousePositionRef.current;
      if (m.x > 0 && m.x < cvs.width && m.y > 0 && m.y < cvs.height) {
        ctx.beginPath(); ctx.arc(m.x, m.y, 10, 0, Math.PI * 2); ctx.strokeStyle = "#00ff88"; ctx.lineWidth = 2; ctx.stroke();
        ctx.beginPath(); ctx.arc(m.x, m.y, 4, 0, Math.PI * 2); ctx.fillStyle = "#00ff88"; ctx.fill();
        ctx.strokeStyle = "rgba(0, 255, 136, 0.3)"; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(m.x - 20, m.y); ctx.lineTo(m.x - 14, m.y); ctx.moveTo(m.x + 14, m.y); ctx.lineTo(m.x + 20, m.y);
        ctx.moveTo(m.x, m.y - 20); ctx.lineTo(m.x, m.y - 14); ctx.moveTo(m.x, m.y + 14); ctx.lineTo(m.x, m.y + 20); ctx.stroke();
      }
      animationRef.current = requestAnimationFrame(draw);
    }

    animationRef.current = requestAnimationFrame(draw);
    return () => { if (animationRef.current) cancelAnimationFrame(animationRef.current); window.removeEventListener('resize', updateCanvasSize); ro.disconnect(); };
  }, [gameState, isBoxDarkMode, generateNewRound]);

  const startGame = useCallback(() => {
    setGameState('playing'); gameStateRef.current = 'playing';
    setScore(0); setStreak(0); setTargetTime(1000); setLastError(0); setTimeLeft(60); setMisses(0); setFeedback('');
    setPerfectHits(0); setAccuracy(100); setClickedTime(0);
    isActiveRef.current = true; scoreRef.current = 0; streakRef.current = 0; bestStreakRef.current = 0;
    totalAttemptsRef.current = 0; hitsRef.current = 0; perfectHitsRef.current = 0;
    generateNewRound(); showFeedback('60 seconds • Click at target time!', 'success');
  }, [generateNewRound, showFeedback]);

  const resetGame = useCallback(() => {
    isActiveRef.current = false; if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    if (audioCtxRef.current) { audioCtxRef.current.close(); audioCtxRef.current = null; }
    setGameState('start'); gameStateRef.current = 'start'; setFeedback(''); setFeedbackType('');
  }, []);

  if (loading || !isClient) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50"><div className="text-center"><div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div><p className="text-gray-600">Loading stopwatch timing drill...</p></div></div>;
  }

  return (
    <div className={`min-h-screen select-none ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "WebApplication",
        "name": "Sustained Intercept - Stopwatch Timing Drill",
        "url": "https://skilldrills.online/drills/motor/timing-accuracy/stopwatch-click",
        "description": "Mental chronometry training. Memorize a target time (1-8 seconds) and click at the exact moment. Perfect <25ms, Good <75ms, OK <150ms. +1 per hit, -1 per miss. 60-second challenge.",
        "applicationCategory": "GameApplication", "operatingSystem": "Web",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
        "author": { "@type": "Organization", "name": "Global Drill System" },
        "educationalUse": ["Timing Accuracy", "Mental Chronometry", "Time Estimation", "Precision Clicking"],
        "learningResourceType": "Interactive Exercise", "timeRequired": "PT60S",
        "interactivityType": "active", "inLanguage": "en-US",
        "teaches": ["Time Estimation", "Precision Timing", "Mental Clock", "Stopwatch Accuracy"]
      })}} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <nav aria-label="Breadcrumb" className="mb-4"><ol className="flex flex-wrap items-center gap-2 text-sm"><li><Link href="/" className={`hover:underline transition-colors ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>Home</Link></li><li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} aria-hidden="true">/</li><li><Link href="/drills/motor" className={`hover:underline transition-colors ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>Motor Drills</Link></li><li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} aria-hidden="true">/</li><li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Timing Accuracy</li><li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} aria-hidden="true">/</li><li className={`font-medium ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} aria-current="page">Sustained Intercept</li></ol></nav>
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3"><div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl flex-shrink-0"><Timer className="w-6 h-6 text-white" /></div><div><h1 className={`text-2xl sm:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Sustained Intercept</h1><p className={`text-sm sm:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>+1 per hit • -1 per miss • 1-8s targets • 60s challenge</p></div></div>
          <div className="flex gap-2 flex-shrink-0">
            {gameState === 'playing' && <button onClick={resetGame} className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-100'}`} title="Reset" aria-label="Reset stopwatch timing drill"><RefreshCw className="w-5 h-5" /></button>}
            <button onClick={() => setIsDarkMode(!isDarkMode)} className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`} aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}>{isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}</button>
            <button onClick={() => setIsBoxDarkMode(!isBoxDarkMode)} className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`} aria-label="Toggle canvas theme"><Eye className="w-5 h-5" /></button>
            <button onClick={() => setSoundEnabled(!soundEnabled)} className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`} aria-label={soundEnabled ? 'Mute sounds' : 'Enable sounds'}>{soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}</button>
            <button onClick={toggleFullscreen} className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`} aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}>{isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}</button>
          </div>
        </div>

        <section className="sr-only"><h2>Sustained Intercept - Stopwatch Timing Accuracy</h2><p>Mental chronometry drill. Memorize a target time (1-8 seconds) shown for 1.5 seconds. Click when you think the exact time has elapsed. Perfect within 25ms, Good within 75ms, OK within 150ms. +1 point per hit, -1 penalty per miss. 60-second challenge with streak tracking.</p></section>

        <div className="grid grid-cols-6 gap-3 mb-4 h-[88px]">
          <StatCard icon={<Target className="text-blue-600" />} value={score} label="Score" isDark={isDarkMode} />
          <StatCard icon={<Trophy className="text-yellow-600" />} value={bestScore} label="Best" isDark={isDarkMode} />
          <StatCard icon={<Timer className={timeLeft <= 10 ? 'text-red-600' : 'text-green-600'} />} value={timeLeft} label="Time" unit="s" isDark={isDarkMode} />
          <StatCard icon={<Zap className="text-orange-600" />} value={streak} label="Streak" isDark={isDarkMode} />
          <StatCard icon={<Award className="text-purple-600" />} value={perfectHits} label="Perfect" isDark={isDarkMode} />
          <StatCard icon={<Activity className="text-cyan-600" />} value={accuracy} label="Acc" unit="%" isDark={isDarkMode} />
        </div>

        <div className="h-10 mb-2 flex justify-center items-center"><div className={`px-4 py-1.5 rounded-lg text-white font-semibold text-sm transition-all duration-200 ${feedback ? 'opacity-100 scale-100' : 'opacity-0 scale-95'} ${feedbackType === 'success' ? 'bg-green-500' : feedbackType === 'warning' ? 'bg-yellow-500' : 'bg-red-500'}`} role="status" aria-live="polite">{feedback || '\u00A0'}</div></div>

        <div ref={containerRef} className={`relative ${isFullscreen ? 'fixed inset-0 z-50' : 'rounded-xl border-2'}`} style={{ background: isBoxDarkMode ? "#020202" : "#ffffff", aspectRatio: isFullscreen ? 'auto' : '16/9', maxWidth: '100%', margin: '0 auto', borderColor: isDarkMode ? '#374151' : '#e5e7eb', overflow: 'hidden', cursor: 'none' }}>
          {isFullscreen && gameState === 'playing' && (<><div className="absolute top-4 right-4 z-30 flex gap-3"><button onClick={resetGame} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all" aria-label="Reset"><RefreshCw className="w-5 h-5" /></button><button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all" aria-label="Toggle dark mode">{isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}</button><button onClick={() => setIsBoxDarkMode(!isBoxDarkMode)} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all" aria-label="Toggle canvas theme"><Eye className="w-5 h-5" /></button><button onClick={() => setSoundEnabled(!soundEnabled)} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all" aria-label="Toggle sound">{soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}</button><button onClick={toggleFullscreen} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all" aria-label="Exit fullscreen"><Minimize2 className="w-5 h-5" /></button></div><div className="absolute top-4 left-4 z-30 bg-black/50 backdrop-blur-sm rounded-lg px-4 py-2 text-white text-sm">Score: <span className="text-yellow-400 font-bold">{score}</span> | Target: <span className="text-cyan-400 font-bold">{(targetTime / 1000).toFixed(2)}s</span> | Streak: <span className="text-orange-400 font-bold">{streak}</span></div></>)}
          <canvas ref={canvasRef} style={{ display: 'block', position: 'absolute' }} aria-label="Stopwatch timing canvas. Click at the exact target time." />
          
          {gameState === 'start' && (<div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}><div className={`rounded-2xl p-6 sm:p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}><div className="mb-4"><Timer className="w-16 h-16 text-blue-500 mx-auto" aria-hidden="true" /></div><h2 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Sustained Intercept</h2><p className={`mb-2 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>60-second challenge • +1/hit • -1/miss • 1-8s targets</p><p className={`mb-6 text-sm ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Memorize the target time, then click at the exact moment. Perfect &lt;25ms, Good &lt;75ms, OK &lt;150ms.</p><button onClick={startGame} className="px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg w-full transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" aria-label="Start stopwatch timing training">Start Training</button></div></div>)}
          
          {gameState === 'gameOver' && (<div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}><div className={`rounded-2xl p-6 sm:p-8 shadow-xl border w-full max-w-[480px] mx-4 ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}><div className="flex items-center justify-center gap-3 mb-4"><Timer className="w-10 h-10 text-orange-500" aria-hidden="true" /><h2 className={`text-2xl font-bold ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Time&apos;s Up!</h2></div><p className={`text-center text-sm mb-6 ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Keep practicing to improve your internal clock accuracy.</p><div className="grid grid-cols-2 gap-3 mb-6"><ResultCard label="Final Score" value={score} icon={<Target className="w-4 h-4" />} color="blue" isDark={isBoxDarkMode} /><ResultCard label="Best Score" value={bestScore} icon={<Trophy className="w-4 h-4" />} color="yellow" isDark={isBoxDarkMode} /><ResultCard label="Best Streak" value={bestStreak} icon={<Zap className="w-4 h-4" />} color="orange" isDark={isBoxDarkMode} /><ResultCard label="Accuracy" value={accuracy} unit="%" icon={<Activity className="w-4 h-4" />} color="purple" isDark={isBoxDarkMode} /><ResultCard label="Perfect Hits" value={perfectHits} icon={<Award className="w-4 h-4" />} color="green" isDark={isBoxDarkMode} /><ResultCard label="Misses" value={misses} icon={<X className="w-4 h-4" />} color="red" isDark={isBoxDarkMode} /></div><div className="flex gap-3"><Link href="/drills/motor" className="flex-1"><button className={`w-full px-4 py-2.5 rounded-lg font-semibold transition-all ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>← Back to Motor</button></Link><button onClick={startGame} className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Play Again →</button></div></div></div>)}
        </div>

        {!isFullscreen && (<footer className="mt-6" aria-label="Drill rules"><div className={`rounded-xl border overflow-hidden ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}><div className={`px-4 py-3 border-b ${isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'}`}><div className="flex items-center gap-2"><Info className={`w-4 h-4 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} aria-hidden="true" /><h2 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Drill Rules & Scoring</h2></div></div><div className="p-4"><div className="grid grid-cols-1 md:grid-cols-2 gap-4"><div className="space-y-3"><div className="flex items-start gap-2"><div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">1</div><p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}><span className="font-semibold text-blue-500">Memorize target time</span> (1-8s shown for 1.5s)</p></div><div className="flex items-start gap-2"><div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">2</div><p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}><span className="font-semibold text-green-500">+1 point per hit</span> (within 150ms)</p></div><div className="flex items-start gap-2"><div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">3</div><p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}><span className="font-semibold text-red-500">-1 point penalty</span> for each miss</p></div></div><div className="space-y-3"><div className="flex items-start gap-2"><div className="w-5 h-5 rounded-full bg-cyan-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">4</div><p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>PERFECT &lt;25ms • GOOD &lt;75ms • OK &lt;150ms</p></div><div className="flex items-start gap-2"><div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">5</div><p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>5x streak <span className="font-semibold text-yellow-500">bonus notification</span></p></div></div></div><div className={`mt-4 pt-3 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs ${isDarkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'}`}><span>🟢 PERFECT • 🔵 GOOD • 🟠 OK • 🔴 MISS</span><span>⚡ Best Score saves locally</span></div></div></div></footer>)}
      </div>
    </div>
  );
}

function StatCard({ icon, value, label, unit = '', isDark }) { return <div className={`rounded-xl shadow-sm border p-2 sm:p-3 text-center flex flex-col justify-center h-full transition-colors ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}><div className="mb-1 flex justify-center" aria-hidden="true">{icon}</div><p className={`text-lg sm:text-xl font-bold truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>{value}{unit}</p><p className={`text-[10px] sm:text-xs truncate ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{label}</p></div>; }
function ResultCard({ label, value, unit = '', icon, color, isDark }) { const colorMap = { blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-500' }, yellow: { bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', text: 'text-yellow-500' }, orange: { bg: 'bg-orange-500/10', border: 'border-orange-500/30', text: 'text-orange-500' }, green: { bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-500' }, purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-500' }, red: { bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-500' } }; const c = colorMap[color] || colorMap.yellow; return <div className={`flex items-center justify-between p-3 rounded-lg border ${c.bg} ${c.border}`}><div className="flex items-center gap-2 min-w-0"><div className={c.text} aria-hidden="true">{icon}</div><span className={`text-xs sm:text-sm truncate ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{label}</span></div><span className={`font-bold text-base sm:text-lg flex-shrink-0 ml-2 ${c.text}`}>{value}{unit}</span></div>; }