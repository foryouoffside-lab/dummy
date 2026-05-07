'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Target, Zap, Clock, Award, Activity, 
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, 
  Eye, Brain, BarChart3, Timer, Trophy, Info, Disc, RefreshCw
} from 'lucide-react';

export default function RapidTappingClient() {
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
  const [radius, setRadius] = useState(50);
  const [shrinkRate, setShrinkRate] = useState(45);
  const [difficultyTimer, setDifficultyTimer] = useState(0);
  const [survivalTime, setSurvivalTime] = useState(0);
  const [clicks, setClicks] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  const [isClient, setIsClient] = useState(false);
  
  const radiusRef = useRef(50);
  const shrinkRateRef = useRef(45);
  const baseShrinkRef = useRef(45);
  const difficultyTimerRef = useRef(0);
  const totalTimeRef = useRef(0);
  const scoreRef = useRef(0);
  const clicksRef = useRef(0);
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const feedbackTimeoutRef = useRef(null);
  const isActiveRef = useRef(false);
  const gameStateRef = useRef('start');
  const audioCtxRef = useRef(null);
  const survivalIntervalRef = useRef(null);

  // Mark as client-side rendered
  useEffect(() => {
    setIsClient(true);
    const t = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(t);
  }, []);

  // Load best score
  useEffect(() => {
    try {
      const savedBestScore = localStorage.getItem('perpetualSingularityBestScore');
      if (savedBestScore) { const p = parseInt(savedBestScore, 10); if (!isNaN(p)) setBestScore(p); }
    } catch (e) { /* localStorage not available */ }
  }, []);

  useEffect(() => { gameStateRef.current = gameState; }, [gameState]);

  const toggleFullscreen = useCallback(async () => {
    try {
      if (!isFullscreen) {
        const element = containerRef.current;
        if (element?.requestFullscreen) { await element.requestFullscreen(); setIsFullscreen(true); }
      } else {
        if (document.fullscreenElement) await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch (error) { console.error('Fullscreen error:', error); }
  }, [isFullscreen]);

  useEffect(() => {
    const handleFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const updateBestScore = useCallback((finalScore) => {
    try {
      const currentBestScore = parseInt(localStorage.getItem('perpetualSingularityBestScore') || '0', 10);
      if (finalScore > currentBestScore) {
        localStorage.setItem('perpetualSingularityBestScore', finalScore.toString());
        setBestScore(finalScore);
      }
    } catch (e) { /* localStorage not available */ }
  }, []);

  const showFeedback = useCallback((message, type) => {
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    setFeedback(message); setFeedbackType(type);
    feedbackTimeoutRef.current = setTimeout(() => { setFeedback(''); setFeedbackType(''); }, 500);
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
      const osc = audioCtx.createOscillator(); const gain = audioCtx.createGain();
      osc.connect(gain); gain.connect(audioCtx.destination);
      const now = audioCtx.currentTime;
      const freqMap = { click: 880, score: 1200, collapse: 200, difficulty: 440 };
      osc.frequency.setValueAtTime(freqMap[type] || 660, now);
      gain.gain.setValueAtTime(type === 'score' ? 0.12 : type === 'collapse' ? 0.15 : 0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      osc.start(now); osc.stop(now + 0.15);
    } catch (e) { /* Audio not supported */ }
  }, [soundEnabled, initAudio]);

  // Survival timer
  useEffect(() => {
    if (gameState !== 'playing') return;
    survivalIntervalRef.current = setInterval(() => { setSurvivalTime(prev => prev + 1); totalTimeRef.current += 1; }, 1000);
    return () => { if (survivalIntervalRef.current) clearInterval(survivalIntervalRef.current); };
  }, [gameState]);

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      const cvs = canvasRef.current; if (!cvs) return;
      const rect = cvs.getBoundingClientRect();
      const scaleX = cvs.width / rect.width; const scaleY = cvs.height / rect.height;
      mousePositionRef.current = { x: (e.clientX - rect.left) * scaleX, y: (e.clientY - rect.top) * scaleY };
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Click handler
  useEffect(() => {
    const handleMouseDown = () => {
      if (gameStateRef.current !== 'playing' || !isActiveRef.current) return;
      const mouse = mousePositionRef.current; const cvs = canvasRef.current; if (!cvs) return;
      const cx = cvs.width / 2; const cy = cvs.height / 2;
      const dist = Math.hypot(mouse.x - cx, mouse.y - cy);
      if (dist < radiusRef.current + 15) {
        radiusRef.current = Math.min(140, radiusRef.current + 10); setRadius(radiusRef.current);
        clicksRef.current += 1; setClicks(clicksRef.current);
        if (clicksRef.current % 10 === 0) { scoreRef.current += 1; setScore(scoreRef.current); playSound('score'); showFeedback(`⭐ +1 POINT! (${clicksRef.current} clicks)`, 'success'); }
        else { playSound('click'); showFeedback(`+1 click • ${10 - (clicksRef.current % 10)} to next point`, 'success'); }
      }
    };
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('contextmenu', (e) => e.preventDefault());
    return () => { window.removeEventListener('mousedown', handleMouseDown); window.removeEventListener('contextmenu', (e) => e.preventDefault()); };
  }, [playSound, showFeedback]);

  // Cleanup
  useEffect(() => { return () => { isActiveRef.current = false; if (survivalIntervalRef.current) clearInterval(survivalIntervalRef.current); }; }, []);

  // Canvas
  useEffect(() => {
    if (gameState !== 'playing') return;
    const cvs = canvasRef.current; if (!cvs) return;
    const ctx = cvs.getContext('2d');

    const updateCanvasSize = () => {
      const container = containerRef.current; if (!container) return;
      const containerRect = container.getBoundingClientRect();
      let width = containerRect.width; let height = width * (9 / 16);
      if (height > containerRect.height) { height = containerRect.height; width = height * (16 / 9); }
      cvs.width = width; cvs.height = height;
      cvs.style.position = 'absolute'; cvs.style.left = `${(containerRect.width - width) / 2}px`; cvs.style.top = `${(containerRect.height - height) / 2}px`;
    };

    const resizeObserver = new ResizeObserver(updateCanvasSize);
    if (containerRef.current) resizeObserver.observe(containerRef.current);
    window.addEventListener('resize', updateCanvasSize);
    updateCanvasSize();
    let lastFrameTime = performance.now();

    function update(dt) {
      if (!isActiveRef.current) return;
      difficultyTimerRef.current += dt;
      totalTimeRef.current += dt;
      if (difficultyTimerRef.current > 3) { shrinkRateRef.current *= 1.12; setShrinkRate(shrinkRateRef.current); difficultyTimerRef.current = 0; setDifficultyTimer(0); playSound('difficulty'); showFeedback('⚡ Difficulty +12%', 'warning'); }
      setDifficultyTimer(difficultyTimerRef.current);
      radiusRef.current -= shrinkRateRef.current * dt;
      setRadius(Math.max(0, radiusRef.current));
      if (radiusRef.current <= 0) { playSound('collapse'); isActiveRef.current = false; setGameState('gameOver'); gameStateRef.current = 'gameOver'; updateBestScore(scoreRef.current); }
    }

    function draw() {
      const now = performance.now(); const dt = Math.min(0.033, (now - lastFrameTime) / 1000); lastFrameTime = now; update(dt);
      ctx.fillStyle = isBoxDarkMode ? "#020202" : "#f9fafb"; ctx.fillRect(0, 0, cvs.width, cvs.height);
      const cx = cvs.width / 2; const cy = cvs.height / 2;
      const currentRadius = Math.max(0, radiusRef.current);
      const maxRadius = 140; const fillPercent = currentRadius / maxRadius;
      ctx.beginPath(); ctx.arc(cx, cy, maxRadius + 10, 0, Math.PI * 2); ctx.strokeStyle = isBoxDarkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"; ctx.lineWidth = 1; ctx.stroke();
      ctx.beginPath(); ctx.arc(cx, cy, currentRadius, 0, Math.PI * 2); ctx.strokeStyle = isBoxDarkMode ? "#ffffff" : "#000000"; ctx.lineWidth = 2; ctx.stroke();
      ctx.fillStyle = isBoxDarkMode ? `rgba(255,255,255,${0.05 + fillPercent * 0.1})` : `rgba(0,0,0,${0.03 + fillPercent * 0.07})`; ctx.fill();
      ctx.beginPath(); ctx.arc(cx, cy, 3, 0, Math.PI * 2); ctx.fillStyle = isBoxDarkMode ? "#ffffff" : "#000000"; ctx.fill();
      ctx.font = "12px monospace"; ctx.fillStyle = isBoxDarkMode ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.3)"; ctx.textAlign = "center"; ctx.fillText(`${Math.floor(fillPercent * 100)}%`, cx, cy - currentRadius - 10);

      // Crosshair
      const mouse = mousePositionRef.current;
      if (mouse.x > 0 && mouse.x < cvs.width && mouse.y > 0 && mouse.y < cvs.height) {
        ctx.beginPath(); ctx.arc(mouse.x, mouse.y, 10, 0, Math.PI * 2); ctx.strokeStyle = isBoxDarkMode ? "#ffffff" : "#000000"; ctx.lineWidth = 2; ctx.stroke();
        ctx.beginPath(); ctx.arc(mouse.x, mouse.y, 4, 0, Math.PI * 2); ctx.fillStyle = isBoxDarkMode ? "#ffffff" : "#000000"; ctx.fill();
        ctx.strokeStyle = isBoxDarkMode ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.2)"; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(mouse.x - 20, mouse.y); ctx.lineTo(mouse.x - 14, mouse.y); ctx.moveTo(mouse.x + 14, mouse.y); ctx.lineTo(mouse.x + 20, mouse.y);
        ctx.moveTo(mouse.x, mouse.y - 20); ctx.lineTo(mouse.x, mouse.y - 14); ctx.moveTo(mouse.x, mouse.y + 14); ctx.lineTo(mouse.x, mouse.y + 20); ctx.stroke();
      }

      animationRef.current = requestAnimationFrame(draw);
    }

    animationRef.current = requestAnimationFrame(draw);
    return () => { if (animationRef.current) cancelAnimationFrame(animationRef.current); window.removeEventListener('resize', updateCanvasSize); resizeObserver.disconnect(); };
  }, [gameState, isBoxDarkMode, playSound, showFeedback, updateBestScore]);

  const startGame = useCallback(() => {
    setGameState('playing'); gameStateRef.current = 'playing';
    setScore(0); setRadius(50); setShrinkRate(45); setDifficultyTimer(0); setSurvivalTime(0); setClicks(0); setFeedback('');
    isActiveRef.current = true; radiusRef.current = 50; shrinkRateRef.current = 45;
    difficultyTimerRef.current = 0; totalTimeRef.current = 0; scoreRef.current = 0; clicksRef.current = 0;
    showFeedback('10 clicks = 1 point • Click the ball!', 'success');
  }, [showFeedback]);

  const resetGame = useCallback(() => {
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    if (survivalIntervalRef.current) clearInterval(survivalIntervalRef.current);
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    isActiveRef.current = false; setGameState('start'); gameStateRef.current = 'start';
    setScore(0); setRadius(50); setShrinkRate(45); setDifficultyTimer(0); setSurvivalTime(0); setClicks(0); setFeedback('');
    radiusRef.current = 50; shrinkRateRef.current = 45; difficultyTimerRef.current = 0; totalTimeRef.current = 0; scoreRef.current = 0; clicksRef.current = 0;
  }, []);

  const formatTime = useCallback((s) => { const mins = Math.floor(s / 60); const secs = s % 60; return `${mins}:${secs.toString().padStart(2, '0')}`; }, []);

  if (loading || !isClient) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50"><div className="text-center"><div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div><p className="text-gray-600">Loading rapid tapping drill...</p></div></div>;
  }

  return (
    <div className={`min-h-screen select-none ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "WebApplication",
        "name": "Perpetual Singularity - Rapid Tapping Drill",
        "url": "https://skilldrills.online/drills/motor/movement-speed/rapid-tapping",
        "description": "Endless rapid tapping survival drill. Click a shrinking ball to expand it. 10 clicks = 1 point. Difficulty increases 12% every 3 seconds. Max ball size 140px. Survival-based with local best score.",
        "applicationCategory": "GameApplication", "operatingSystem": "Web",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
        "author": { "@type": "Organization", "name": "Global Drill System" },
        "educationalUse": ["Rapid Tapping", "Click Speed", "Mouse Endurance", "Motor Stamina"],
        "learningResourceType": "Interactive Exercise", "interactivityType": "active", "inLanguage": "en-US",
        "teaches": ["Click Speed", "Tapping Endurance", "Motor Stamina", "Survival Skills"]
      })}} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <nav aria-label="Breadcrumb" className="mb-4"><ol className="flex flex-wrap items-center gap-2 text-sm"><li><Link href="/" className={`hover:underline transition-colors ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>Home</Link></li><li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} aria-hidden="true">/</li><li><Link href="/drills/motor" className={`hover:underline transition-colors ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>Motor Drills</Link></li><li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} aria-hidden="true">/</li><li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Movement Speed</li><li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} aria-hidden="true">/</li><li className={`font-medium ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} aria-current="page">Perpetual Singularity</li></ol></nav>
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3"><div className="p-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex-shrink-0"><Disc className="w-6 h-6 text-white" /></div><div><h1 className={`text-2xl sm:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Perpetual Singularity</h1><p className={`text-sm sm:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>10 clicks = 1 point • Endless survival • Difficulty +12% every 3s</p></div></div>
          <div className="flex gap-2 flex-shrink-0">
            {gameState === 'playing' && <button onClick={resetGame} className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-100'}`} title="Reset" aria-label="Reset rapid tapping drill"><RefreshCw className="w-5 h-5" /></button>}
            <button onClick={() => setIsDarkMode(!isDarkMode)} className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`} aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}>{isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}</button>
            <button onClick={() => setIsBoxDarkMode(!isBoxDarkMode)} className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`} aria-label="Toggle canvas theme"><Eye className="w-5 h-5" /></button>
            <button onClick={() => setSoundEnabled(!soundEnabled)} className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`} aria-label={soundEnabled ? 'Mute sounds' : 'Enable sounds'}>{soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}</button>
            <button onClick={toggleFullscreen} className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`} aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}>{isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}</button>
          </div>
        </div>

        <section className="sr-only"><h2>Perpetual Singularity - Rapid Tapping Survival</h2><p>Endless rapid tapping survival drill. Click the central ball to expand it by 10px per click. 10 clicks earn 1 point. Ball constantly shrinks at an increasing rate (+12% difficulty every 3 seconds). Max ball size 140px. Game ends when ball reaches zero. Survival time and best score tracked locally.</p></section>

        <div className="grid grid-cols-5 gap-3 mb-4 h-[88px]">
          <StatCard icon={<Target className="text-blue-600" />} value={score} label="Score" isDark={isDarkMode} />
          <StatCard icon={<Trophy className="text-yellow-600" />} value={bestScore} label="Best" isDark={isDarkMode} />
          <StatCard icon={<Timer className="text-green-600" />} value={formatTime(survivalTime)} label="Survival" isDark={isDarkMode} />
          <StatCard icon={<Activity className="text-purple-600" />} value={clicks} label="Clicks" isDark={isDarkMode} />
          <StatCard icon={<Disc className="text-cyan-600" />} value={Math.floor(radius)} unit="px" label="Size" isDark={isDarkMode} />
        </div>

        <div className="h-10 mb-2 flex justify-center items-center"><div className={`px-4 py-1.5 rounded-lg text-white font-semibold text-sm transition-all duration-200 ${feedback ? 'opacity-100 scale-100' : 'opacity-0 scale-95'} ${feedbackType === 'success' ? 'bg-green-500' : feedbackType === 'warning' ? 'bg-yellow-500' : 'bg-red-500'}`} role="status" aria-live="polite">{feedback || '\u00A0'}</div></div>

        <div ref={containerRef} className={`relative ${isFullscreen ? 'fixed inset-0 z-50' : 'rounded-xl border-2'}`} style={{ background: isBoxDarkMode ? "#020202" : "#ffffff", aspectRatio: isFullscreen ? 'auto' : '16/9', maxWidth: '100%', margin: '0 auto', borderColor: isDarkMode ? '#374151' : '#e5e7eb', overflow: 'hidden', cursor: 'none' }}>
          {isFullscreen && gameState === 'playing' && (<div className="absolute top-4 right-4 z-30 flex gap-3"><button onClick={resetGame} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all" aria-label="Reset"><RefreshCw className="w-5 h-5" /></button><button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all" aria-label="Toggle dark mode">{isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}</button><button onClick={() => setIsBoxDarkMode(!isBoxDarkMode)} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all" aria-label="Toggle canvas theme"><Eye className="w-5 h-5" /></button><button onClick={() => setSoundEnabled(!soundEnabled)} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all" aria-label="Toggle sound">{soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}</button><button onClick={toggleFullscreen} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all" aria-label="Exit fullscreen"><Minimize2 className="w-5 h-5" /></button></div>)}
          <canvas ref={canvasRef} style={{ display: 'block', position: 'absolute' }} aria-label="Rapid tapping canvas. Click the central ball to keep it from shrinking." />
          
          {gameState === 'start' && (<div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}><div className={`rounded-2xl p-6 sm:p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}><div className="mb-4"><Disc className="w-16 h-16 text-purple-500 mx-auto" aria-hidden="true" /></div><h2 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Perpetual Singularity</h2><p className={`mb-2 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>10 clicks = 1 point • Endless survival</p><p className={`mb-6 text-sm ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Click the ball to expand it (+10px). It constantly shrinks faster every 3 seconds. Survive as long as possible!</p><button onClick={startGame} className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg w-full transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2" aria-label="Start rapid tapping survival">Start Training</button></div></div>)}
          
          {gameState === 'gameOver' && (<div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}><div className={`rounded-2xl p-6 sm:p-8 shadow-xl border w-full max-w-[480px] mx-4 ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}><div className="flex items-center justify-center gap-3 mb-4"><Award className="w-10 h-10 text-yellow-500" aria-hidden="true" /><h2 className={`text-2xl font-bold ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Collapse!</h2></div><p className={`text-center text-sm mb-6 ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>The ball has shrunk to zero. Try to survive longer next time!</p><div className="grid grid-cols-2 gap-3 mb-6"><ResultCard label="Final Score" value={score} icon={<Target className="w-4 h-4" />} color="blue" isDark={isBoxDarkMode} /><ResultCard label="Best Score" value={bestScore} icon={<Trophy className="w-4 h-4" />} color="yellow" isDark={isBoxDarkMode} /><ResultCard label="Survival Time" value={formatTime(survivalTime)} icon={<Timer className="w-4 h-4" />} color="green" isDark={isBoxDarkMode} /><ResultCard label="Total Clicks" value={clicks} icon={<Activity className="w-4 h-4" />} color="purple" isDark={isBoxDarkMode} /><ResultCard label="Final Size" value={`${Math.floor(radius)}px`} icon={<Disc className="w-4 h-4" />} color="cyan" isDark={isBoxDarkMode} /><ResultCard label="Max Difficulty" value={`+${Math.floor((shrinkRate / baseShrinkRef.current - 1) * 100)}%`} icon={<Zap className="w-4 h-4" />} color="orange" isDark={isBoxDarkMode} /></div><div className="flex gap-3"><Link href="/drills/motor" className="flex-1"><button className={`w-full px-4 py-2.5 rounded-lg font-semibold transition-all ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>← Back to Motor</button></Link><button onClick={startGame} className="flex-1 px-4 py-2.5 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">Play Again →</button></div></div></div>)}
        </div>

        {!isFullscreen && (<footer className="mt-6" aria-label="Drill rules"><div className={`rounded-xl border overflow-hidden ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}><div className={`px-4 py-3 border-b ${isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'}`}><div className="flex items-center gap-2"><Info className={`w-4 h-4 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} aria-hidden="true" /><h2 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Drill Rules & Scoring</h2></div></div><div className="p-4"><div className="grid grid-cols-1 md:grid-cols-2 gap-4"><div className="space-y-3"><div className="flex items-start gap-2"><div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">1</div><p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Click the <span className="font-semibold text-purple-500">central ball</span> to expand it (+10px per click)</p></div><div className="flex items-start gap-2"><div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">2</div><p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Ball constantly <span className="font-semibold text-red-500">shrinks at increasing rate</span></p></div><div className="flex items-start gap-2"><div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">3</div><p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Every 3 seconds: <span className="font-semibold text-orange-500">difficulty +12%</span></p></div></div><div className="space-y-3"><div className="flex items-start gap-2"><div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">4</div><p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Scoring: <span className="font-semibold text-green-500">1 point per 10 clicks</span></p></div><div className="flex items-start gap-2"><div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">5</div><p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Game ends when <span className="font-semibold text-blue-500">ball shrinks to zero</span></p></div><div className="flex items-start gap-2"><div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">6</div><p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Max size: <span className="font-semibold text-yellow-500">140px</span> • Best Score saves locally</p></div></div></div><div className={`mt-4 pt-3 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs ${isDarkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'}`}><span>🎯 Click ball to expand • Survive the perpetual collapse</span><span>🏆 Best Score saves locally</span></div></div></div></footer>)}
      </div>
    </div>
  );
}

function StatCard({ icon, value, label, unit = '', isDark }) { return <div className={`rounded-xl shadow-sm border p-2 sm:p-3 text-center flex flex-col justify-center h-full transition-colors ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}><div className="mb-1 flex justify-center" aria-hidden="true">{icon}</div><p className={`text-lg sm:text-xl font-bold truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>{value}{unit}</p><p className={`text-[10px] sm:text-xs truncate ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{label}</p></div>; }
function ResultCard({ label, value, unit = '', icon, color, isDark }) { const colorMap = { blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-500' }, yellow: { bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', text: 'text-yellow-500' }, green: { bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-500' }, purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-500' }, cyan: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', text: 'text-cyan-500' }, orange: { bg: 'bg-orange-500/10', border: 'border-orange-500/30', text: 'text-orange-500' } }; const c = colorMap[color] || colorMap.yellow; return <div className={`flex items-center justify-between p-3 rounded-lg border ${c.bg} ${c.border}`}><div className="flex items-center gap-2 min-w-0"><div className={c.text} aria-hidden="true">{icon}</div><span className={`text-xs sm:text-sm truncate ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{label}</span></div><span className={`font-bold text-base sm:text-lg flex-shrink-0 ml-2 ${c.text}`}>{value}{unit}</span></div>; }