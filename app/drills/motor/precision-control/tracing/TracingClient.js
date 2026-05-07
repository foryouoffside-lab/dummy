'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Sun, Moon, Maximize2, Minimize2, Eye, 
  Volume2, VolumeX, Activity, Target, Timer, Zap, Award, 
  Info, Trophy, RefreshCw
} from 'lucide-react';

export default function TracingClient() {
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
  const [timeLeft, setTimeLeft] = useState(60);
  const [flowState, setFlowState] = useState(100);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  const [isClient, setIsClient] = useState(false);
  
  const tolerance = 45;
  const speed = 4.2;
  let points = [];
  let offset = 0;
  let isStopped = false;
  let globalTime = 0;
  
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const lastTimeRef = useRef(performance.now());
  const scoreRef = useRef(0);
  const streakRef = useRef(0);
  const bestStreakRef = useRef(0);
  const flowRef = useRef(100);
  const timerIntervalRef = useRef(null);
  const feedbackTimeoutRef = useRef(null);
  const isActiveRef = useRef(false);
  const gameStateRef = useRef('start');
  const focusTimerRef = useRef(0);
  const distractionTimerRef = useRef(0);
  const audioCtxRef = useRef(null);

  // Mark as client-side rendered
  useEffect(() => { setIsClient(true); const t = setTimeout(() => setLoading(false), 300); return () => clearTimeout(t); }, []);

  // Load best score
  useEffect(() => {
    try {
      const savedBestScore = localStorage.getItem('fluidFilamentBestScore');
      if (savedBestScore) { const p = parseInt(savedBestScore, 10); if (!isNaN(p)) setBestScore(p); }
    } catch (e) { /* localStorage not available */ }
  }, []);

  const updateBestScore = useCallback((finalScore) => {
    try {
      const currentBestScore = parseInt(localStorage.getItem('fluidFilamentBestScore') || '0', 10);
      if (finalScore > currentBestScore) { localStorage.setItem('fluidFilamentBestScore', finalScore.toString()); setBestScore(finalScore); }
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
    feedbackTimeoutRef.current = setTimeout(() => { setFeedback(''); setFeedbackType(''); }, 500);
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

  // Mouse tracking
  useEffect(() => {
    const h = (e) => { const cvs = canvasRef.current; if (!cvs) return; const rect = cvs.getBoundingClientRect(); const sx = cvs.width / rect.width; const sy = cvs.height / rect.height; mousePositionRef.current = { x: (e.clientX - rect.left) * sx, y: (e.clientY - rect.top) * sy }; };
    window.addEventListener('mousemove', h); return () => window.removeEventListener('mousemove', h);
  }, []);

  function getY(x, cvsHeight) {
    const xPos = (x + offset) * 0.004;
    const phase = (globalTime % 12);
    if (phase < 6) return (cvsHeight / 2) + Math.sin(xPos * 8.0) * 110 + Math.sin(xPos * 18.5) * 25;
    else return (cvsHeight / 2) + Math.sin(xPos * 2.2) * 160;
  }

  // Cleanup
  useEffect(() => { return () => { isActiveRef.current = false; if (audioCtxRef.current) { audioCtxRef.current.close(); audioCtxRef.current = null; } }; }, []);

  // Canvas
  useEffect(() => {
    if (gameState !== 'playing') return;
    const cvs = canvasRef.current; if (!cvs) return;
    const ctx = cvs.getContext('2d', { alpha: false, desynchronized: true });

    const updateCanvasSize = () => {
      const container = containerRef.current; if (!container) return;
      const rect = container.getBoundingClientRect();
      let w = rect.width; let h = w * (9 / 16); if (h > rect.height) { h = rect.height; w = h * (16 / 9); }
      cvs.width = w; cvs.height = h; cvs.style.position = 'absolute';
      cvs.style.left = `${(rect.width - w) / 2}px`; cvs.style.top = `${(rect.height - h) / 2}px`;
      points = []; for (let i = 0; i < cvs.width; i++) points[i] = getY(i, cvs.height);
    };

    const ro = new ResizeObserver(updateCanvasSize); if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener('resize', updateCanvasSize); updateCanvasSize();
    offset = 0; isStopped = false; globalTime = 0;
    let lastFrameTime = performance.now();

    function update(dt, cvs) {
      if (!isActiveRef.current) return;
      const mouse = mousePositionRef.current;
      const mouseIdx = Math.floor(mouse.x);
      const targetY = (mouseIdx >= 0 && mouseIdx < points.length) ? points[mouseIdx] : cvs.height / 2;
      const distFromWave = Math.abs(mouse.y - targetY);

      if (distFromWave < tolerance) {
        flowRef.current = Math.min(100, flowRef.current + 5 * dt);
        streakRef.current++; setStreak(streakRef.current);
        if (streakRef.current > bestStreakRef.current) { bestStreakRef.current = streakRef.current; setBestStreak(streakRef.current); }
        focusTimerRef.current += dt;
        if (focusTimerRef.current >= 1.0) { const pts = Math.floor(focusTimerRef.current); scoreRef.current += pts; setScore(scoreRef.current); focusTimerRef.current -= pts; if (pts > 0) showFeedback(`+${pts} Flow!`, 'success'); }
        distractionTimerRef.current = 0;
      } else {
        flowRef.current = Math.max(0, flowRef.current - 15 * dt); streakRef.current = 0; setStreak(0);
        distractionTimerRef.current += dt; focusTimerRef.current = 0;
      }
      setFlowState(Math.floor(flowRef.current));
      if (isStopped) { if (distFromWave < tolerance) isStopped = false; return; }
      offset += speed; globalTime += dt;
      points.shift(); points.push(getY(cvs.width + offset, cvs.height));
      if (distFromWave > tolerance) { isStopped = true; showFeedback('⚠️ Lost Wave!', 'warning'); }
    }

    function draw() {
      const now = performance.now(); const dt = Math.min(0.033, (now - lastFrameTime) / 1000); lastFrameTime = now; update(dt, cvs);
      ctx.fillStyle = isBoxDarkMode ? "#020202" : "#f9fafb"; ctx.fillRect(0, 0, cvs.width, cvs.height);
      ctx.strokeStyle = isBoxDarkMode ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)'; ctx.lineWidth = 1;
      for (let i = 0; i < cvs.width; i += 40) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, cvs.height); ctx.stroke(); }
      ctx.beginPath(); ctx.lineWidth = 2; ctx.lineJoin = "round"; ctx.strokeStyle = isStopped ? "#FF3E3E" : "#FF0000";
      ctx.moveTo(0, points[0]); for (let i = 1; i < points.length; i += 2) ctx.lineTo(i, points[i]); ctx.stroke();
      const mouse = mousePositionRef.current;
      ctx.beginPath(); ctx.arc(mouse.x, mouse.y, 8, 0, Math.PI * 2); ctx.fillStyle = isStopped ? "#666" : "#00ff88"; ctx.fill();
      ctx.strokeStyle = isBoxDarkMode ? "#444" : "#ccc"; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(mouse.x - 18, mouse.y); ctx.lineTo(mouse.x + 18, mouse.y); ctx.moveTo(mouse.x, mouse.y - 18); ctx.lineTo(mouse.x, mouse.y + 18); ctx.stroke();
      if (!isStopped) { ctx.beginPath(); ctx.arc(mouse.x, mouse.y, 14, 0, Math.PI * 2); ctx.strokeStyle = "#00ff88"; ctx.lineWidth = 1.5; ctx.stroke(); }
      animationRef.current = requestAnimationFrame(draw);
    }
    draw();
    return () => { if (animationRef.current) cancelAnimationFrame(animationRef.current); window.removeEventListener('resize', updateCanvasSize); ro.disconnect(); };
  }, [gameState, isBoxDarkMode, showFeedback]);

  const startGame = useCallback(() => {
    setGameState('playing'); gameStateRef.current = 'playing';
    setScore(0); setTimeLeft(60); setFlowState(100); setStreak(0); setBestStreak(0); setFeedback('');
    isActiveRef.current = true; scoreRef.current = 0; streakRef.current = 0; bestStreakRef.current = 0;
    flowRef.current = 100; focusTimerRef.current = 0; distractionTimerRef.current = 0;
  }, []);

  const resetGame = useCallback(() => {
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    if (audioCtxRef.current) { audioCtxRef.current.close(); audioCtxRef.current = null; }
    isActiveRef.current = false; setGameState('start'); gameStateRef.current = 'start';
    setScore(0); setTimeLeft(60); setFlowState(100); setStreak(0); setBestStreak(0); setFeedback('');
    scoreRef.current = 0; streakRef.current = 0; flowRef.current = 100; focusTimerRef.current = 0; distractionTimerRef.current = 0;
  }, []);

  if (loading || !isClient) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50"><div className="text-center"><div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div><p className="text-gray-600">Loading wave tracing drill...</p></div></div>;
  }

  return (
    <div className={`min-h-screen select-none ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "WebApplication",
        "name": "Fluid Filament - Wave Tracing Drill",
        "url": "https://skilldrills.online/drills/motor/precision-control/tracing",
        "description": "Smooth cursor tracking drill following a dynamic red wave filament. +1 point per second on the wave with 45px tolerance. Auto-pauses and resumes. Two waveform modes: Pulse and Harmonic. 60-second flow state challenge.",
        "applicationCategory": "GameApplication", "operatingSystem": "Web",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
        "author": { "@type": "Organization", "name": "Global Drill System" },
        "educationalUse": ["Wave Tracing", "Cursor Tracking", "Flow State", "Motor Precision"],
        "learningResourceType": "Interactive Exercise", "timeRequired": "PT60S",
        "interactivityType": "active", "inLanguage": "en-US",
        "teaches": ["Smooth Tracking", "Wave Following", "Flow State", "Cursor Control"]
      })}} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <nav aria-label="Breadcrumb" className="mb-4"><ol className="flex flex-wrap items-center gap-2 text-sm"><li><Link href="/" className={`hover:underline transition-colors ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>Home</Link></li><li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} aria-hidden="true">/</li><li><Link href="/drills/motor" className={`hover:underline transition-colors ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>Motor Drills</Link></li><li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} aria-hidden="true">/</li><li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Precision Control</li><li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} aria-hidden="true">/</li><li className={`font-medium ${isDarkMode ? 'text-red-400' : 'text-red-600'}`} aria-current="page">Fluid Filament</li></ol></nav>
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3"><div className="p-3 bg-gradient-to-r from-red-500 to-rose-600 rounded-xl flex-shrink-0"><Activity className="w-6 h-6 text-white" /></div><div><h1 className={`text-2xl sm:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Fluid Filament</h1><p className={`text-sm sm:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Wave tracking • +1/sec on wave • 45px tolerance • 60s challenge</p></div></div>
          <div className="flex gap-2 flex-shrink-0">
            {gameState === 'playing' && <button onClick={resetGame} className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-100'}`} title="Reset" aria-label="Reset wave tracing drill"><RefreshCw className="w-5 h-5" /></button>}
            <button onClick={() => setIsDarkMode(!isDarkMode)} className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`} aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}>{isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}</button>
            <button onClick={() => setIsBoxDarkMode(!isBoxDarkMode)} className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`} aria-label="Toggle canvas theme"><Eye className="w-5 h-5" /></button>
            <button onClick={() => setSoundEnabled(!soundEnabled)} className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`} aria-label={soundEnabled ? 'Mute sounds' : 'Enable sounds'}>{soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}</button>
            <button onClick={toggleFullscreen} className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`} aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}>{isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}</button>
          </div>
        </div>

        <section className="sr-only"><h2>Fluid Filament - Wave Tracing Flow State Training</h2><p>Smooth cursor tracking drill. Follow a dynamic scrolling red wave filament with your cursor. +1 point per second while within 45px of the wave. Auto-pauses when cursor leaves the wave and resumes when back on it. Two waveform modes alternate: Pulse (harmonic) and Harmonic (smooth). 60-second flow state challenge with no penalties - pure tracking practice.</p></section>

        <div className="grid grid-cols-5 gap-3 mb-4 h-[88px]">
          <StatCard icon={<Target className="text-blue-600" />} value={score} label="Flow Score" isDark={isDarkMode} />
          <StatCard icon={<Trophy className="text-yellow-500" />} value={bestScore} label="Best" isDark={isDarkMode} />
          <StatCard icon={<Timer className={timeLeft < 15 ? 'text-red-600' : 'text-green-600'} />} value={timeLeft} label="Time" unit="s" isDark={isDarkMode} />
          <StatCard icon={<Activity className="text-green-600" />} value={flowState} label="Flow" unit="%" isDark={isDarkMode} />
          <StatCard icon={<Zap className="text-orange-500" />} value={streak} label="Streak" isDark={isDarkMode} />
        </div>

        <div className="h-10 mb-2 flex justify-center items-center"><div className={`px-4 py-1.5 rounded-lg text-white font-semibold text-sm transition-all duration-200 ${feedback ? 'opacity-100 scale-100' : 'opacity-0 scale-95'} ${feedbackType === 'success' ? 'bg-green-500' : feedbackType === 'warning' ? 'bg-yellow-500' : 'bg-red-500'}`} role="status" aria-live="polite">{feedback || '\u00A0'}</div></div>

        <div ref={containerRef} className={`relative ${isFullscreen ? 'fixed inset-0 z-50' : 'rounded-xl border-2'}`} style={{ background: isBoxDarkMode ? "#020202" : "#ffffff", aspectRatio: isFullscreen ? 'auto' : '16/9', maxWidth: '100%', margin: '0 auto', borderColor: isDarkMode ? '#374151' : '#e5e7eb', overflow: 'hidden' }}>
          {isFullscreen && gameState === 'playing' && (<><div className="absolute top-4 right-4 z-20 flex gap-3"><button onClick={resetGame} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all" aria-label="Reset"><RefreshCw className="w-5 h-5" /></button><button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all" aria-label="Toggle dark mode">{isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}</button><button onClick={() => setIsBoxDarkMode(!isBoxDarkMode)} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all" aria-label="Toggle canvas theme"><Eye className="w-5 h-5" /></button><button onClick={() => setSoundEnabled(!soundEnabled)} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all" aria-label="Toggle sound">{soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}</button><button onClick={toggleFullscreen} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all" aria-label="Exit fullscreen"><Minimize2 className="w-5 h-5" /></button></div><div className="absolute top-4 left-4 z-20 bg-black/50 backdrop-blur-sm rounded-lg px-4 py-2 text-white text-sm">Score: <span className="text-yellow-400 font-bold">{score}</span> | Flow: <span className="text-green-400 font-bold">{flowState}%</span></div></>)}
          <canvas ref={canvasRef} style={{ display: 'block', position: 'absolute', cursor: 'none', width: '100%', height: '100%' }} aria-label="Wave tracing canvas. Follow the red filament with your cursor." />
          
          {gameState === 'start' && (<div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}><div className={`rounded-2xl p-6 sm:p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}><div className="mb-4"><Activity className="w-16 h-16 text-red-500 mx-auto" aria-hidden="true" /></div><h2 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Fluid Filament</h2><p className={`mb-2 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>60-second challenge • +1/sec on wave • 45px tolerance</p><p className={`mb-6 text-sm ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Follow the red wave with your cursor. Wave auto-pauses when you leave and resumes when you return. No penalties.</p><button onClick={startGame} className="px-8 py-3 bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-xl font-semibold hover:shadow-lg w-full transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2" aria-label="Start wave tracing flow training">Begin Flow Training</button></div></div>)}
          
          {gameState === 'gameOver' && (<div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}><div className={`rounded-2xl p-6 sm:p-8 shadow-xl border w-full max-w-[480px] mx-4 ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}><div className="flex items-center justify-center gap-3 mb-4"><Timer className="w-10 h-10 text-orange-500" aria-hidden="true" /><h2 className={`text-2xl font-bold ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Session Complete!</h2></div><p className={`text-center text-sm mb-6 ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Keep practicing to improve your wave tracking flow state endurance.</p><div className="grid grid-cols-2 gap-3 mb-6"><ResultCard label="Final Score" value={score} icon={<Target className="w-4 h-4" />} color="blue" isDark={isBoxDarkMode} /><ResultCard label="Best Score" value={bestScore} icon={<Trophy className="w-4 h-4" />} color="yellow" isDark={isBoxDarkMode} /><ResultCard label="Best Streak" value={bestStreak} icon={<Zap className="w-4 h-4" />} color="orange" isDark={isBoxDarkMode} /><ResultCard label="Peak Flow" value={flowState} unit="%" icon={<Activity className="w-4 h-4" />} color="green" isDark={isBoxDarkMode} /></div><div className="flex gap-3"><Link href="/drills/motor" className="flex-1"><button className={`w-full px-4 py-2.5 rounded-lg font-semibold transition-all ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>← Back to Motor</button></Link><button onClick={startGame} className="flex-1 px-4 py-2.5 bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">Play Again →</button></div></div></div>)}
        </div>

        {!isFullscreen && (<footer className="mt-6" aria-label="Drill rules"><div className={`rounded-xl border overflow-hidden ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}><div className={`px-4 py-3 border-b ${isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'}`}><div className="flex items-center gap-2"><Info className={`w-4 h-4 ${isDarkMode ? 'text-red-400' : 'text-red-600'}`} aria-hidden="true" /><h2 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Drill Rules & Instructions</h2></div></div><div className="p-4"><div className="grid grid-cols-1 md:grid-cols-2 gap-4"><div className="space-y-3"><div className="flex items-start gap-2"><div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">1</div><p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}><span className="font-semibold text-red-500">Follow the red wave</span> - 45px tolerance zone</p></div><div className="flex items-start gap-2"><div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">2</div><p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}><span className="font-semibold text-green-500">+1 point per second</span> on the wave</p></div><div className="flex items-start gap-2"><div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">3</div><p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Wave <span className="font-semibold text-yellow-500">auto-pauses and resumes</span></p></div></div><div className="space-y-3"><div className="flex items-start gap-2"><div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">4</div><p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}><span className="font-semibold text-blue-500">No penalties</span> - just pure flow tracking</p></div><div className="flex items-start gap-2"><div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">5</div><p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Two modes: <span className="font-semibold text-purple-500">Pulse & Harmonic</span></p></div><div className="flex items-start gap-2"><div className="w-5 h-5 rounded-full bg-cyan-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">6</div><p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>8px cursor • Flow meter • <span className="font-semibold text-cyan-500">Best Score saves locally</span></p></div></div></div><div className={`mt-4 pt-3 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs ${isDarkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'}`}><span>🌊 Larger cursor (8px) • 45px tolerance • Auto-resume</span><span>⚡ 60 second challenge • Build your flow streak</span></div></div></div></footer>)}
      </div>
    </div>
  );
}

function StatCard({ icon, value, label, unit = '', isDark }) { return <div className={`rounded-xl shadow-sm border p-2 sm:p-3 text-center flex flex-col justify-center h-full transition-colors ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}><div className="mb-1 flex justify-center" aria-hidden="true">{icon}</div><p className={`text-lg sm:text-xl font-bold truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>{value}{unit}</p><p className={`text-[10px] sm:text-xs truncate ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{label}</p></div>; }
function ResultCard({ label, value, unit = '', icon, color, isDark }) { const colorMap = { blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-500' }, yellow: { bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', text: 'text-yellow-500' }, orange: { bg: 'bg-orange-500/10', border: 'border-orange-500/30', text: 'text-orange-500' }, green: { bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-500' }, red: { bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-500' } }; const c = colorMap[color] || colorMap.yellow; return <div className={`flex items-center justify-between p-3 rounded-lg border ${c.bg} ${c.border}`}><div className="flex items-center gap-2 min-w-0"><div className={c.text} aria-hidden="true">{icon}</div><span className={`text-xs sm:text-sm truncate ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{label}</span></div><span className={`font-bold text-base sm:text-lg flex-shrink-0 ml-2 ${c.text}`}>{value}{unit}</span></div>; }