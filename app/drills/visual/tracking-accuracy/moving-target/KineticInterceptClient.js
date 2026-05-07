'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Target, Zap, Clock, Award, Activity, 
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, 
  Eye, Timer, Crosshair, Move, Brain, X, Trophy, Info, Check, Heart, RefreshCw
} from 'lucide-react';

export default function KineticInterceptClient() {
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
  const [totalHits, setTotalHits] = useState(0);
  const [lives, setLives] = useState(3);
  const [timeLeft, setTimeLeft] = useState(60);
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  const [targetSpeed, setTargetSpeed] = useState(12);
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  
  const targetRef = useRef({ x: -100, y: -100, vx: 0, vy: 0, r: 25, active: false });
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const streakRef = useRef(0);
  const scoreRef = useRef(0);
  const livesRef = useRef(3);
  const spawnTimeoutRef = useRef(null);
  const timerIntervalRef = useRef(null);
  const feedbackTimeoutRef = useRef(null);
  const isActiveRef = useRef(false);
  const gameStateRef = useRef('start');
  const audioCtxRef = useRef(null);
  const bestStreakRef = useRef(0);

  // Mark as client
  useEffect(() => { setIsClient(true); const t = setTimeout(() => setLoading(false), 300); return () => clearTimeout(t); }, []);

  // Load best score
  useEffect(() => {
    try {
      const s = localStorage.getItem('kineticInterceptBestScore');
      if (s) { const p = parseInt(s, 10); if (!isNaN(p)) setBestScore(p); }
    } catch (e) {}
  }, []);

  const updateBestScore = useCallback((fs) => {
    try {
      const c = parseInt(localStorage.getItem('kineticInterceptBestScore') || '0', 10);
      if (fs > c) { localStorage.setItem('kineticInterceptBestScore', fs.toString()); setBestScore(fs); }
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
    setFeedback(m); setFeedbackType(t);
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
      const ctx = initAudio(); if (!ctx) return;
      const o = ctx.createOscillator(); const g = ctx.createGain();
      o.connect(g); g.connect(ctx.destination);
      const now = ctx.currentTime;
      const f = { hit: 880, miss: 440, streak: 1046.5 };
      o.frequency.setValueAtTime(f[type] || 440, now);
      g.gain.setValueAtTime(type === 'streak' ? 0.12 : 0.1, now);
      g.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
      o.start(now); o.stop(now + 0.1);
    } catch (e) {}
  }, [soundEnabled, initAudio]);

  const spawn = useCallback((w, h) => {
    if (!w || !h) return;
    const side = Math.floor(Math.random() * 4); const m = 60;
    if (side === 0) { targetRef.current.x = m; targetRef.current.y = Math.random() * h; }
    else if (side === 1) { targetRef.current.x = w - m; targetRef.current.y = Math.random() * h; }
    else if (side === 2) { targetRef.current.x = Math.random() * w; targetRef.current.y = m; }
    else { targetRef.current.x = Math.random() * w; targetRef.current.y = h - m; }
    const angle = Math.atan2(h/2 - targetRef.current.y, w/2 - targetRef.current.x) + (Math.random() - 0.5) * 0.6;
    const speed = 12 + Math.random() * 10;
    targetRef.current.vx = Math.cos(angle) * speed;
    targetRef.current.vy = Math.sin(angle) * speed;
    setTargetSpeed(Math.round(speed));
    targetRef.current.active = true;
  }, []);

  const applyPenalty = useCallback(() => {
    if (!isActiveRef.current) return;
    if (spawnTimeoutRef.current) clearTimeout(spawnTimeoutRef.current);
    streakRef.current = 0; setStreak(0);
    if (livesRef.current > 0) { livesRef.current -= 1; setLives(livesRef.current); showFeedback('✗ Miss! -1 life', 'error'); playSound('miss'); if (livesRef.current === 0) { scoreRef.current = Math.max(0, scoreRef.current - 1); setScore(scoreRef.current); showFeedback('⚠️ No lives left! -1 point penalty!', 'warning'); } }
    else { scoreRef.current = Math.max(0, scoreRef.current - 1); setScore(scoreRef.current); showFeedback('✗ Miss! -1 point penalty!', 'error'); playSound('miss'); }
    targetRef.current.active = false;
    spawnTimeoutRef.current = setTimeout(() => { const c = canvasRef.current; if (c?.width && c?.height && isActiveRef.current) { spawn(c.width, c.height); spawnTimeoutRef.current = null; } }, 300);
  }, [showFeedback, playSound, spawn]);

  // Timer effect
  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      timerIntervalRef.current = setInterval(() => {
        setTimeLeft(p => {
          if (p <= 1) { setGameState('gameOver'); gameStateRef.current = 'gameOver'; isActiveRef.current = false; if (spawnTimeoutRef.current) clearTimeout(spawnTimeoutRef.current); if (timerIntervalRef.current) { clearInterval(timerIntervalRef.current); timerIntervalRef.current = null; } updateBestScore(scoreRef.current); return 0; }
          return p - 1;
        });
      }, 1000);
    }
    return () => { if (timerIntervalRef.current) { clearInterval(timerIntervalRef.current); timerIntervalRef.current = null; } };
  }, [gameState, timeLeft, updateBestScore]);

  // Mouse move
  useEffect(() => {
    const h = (e) => { const c = canvasRef.current; if (!c) return; const r = c.getBoundingClientRect(); mousePositionRef.current = { x: (e.clientX - r.left) * (c.width / r.width), y: (e.clientY - r.top) * (c.height / r.height) }; };
    window.addEventListener('mousemove', h); return () => window.removeEventListener('mousemove', h);
  }, []);

  // Canvas loop
  useEffect(() => {
    if (gameState !== 'playing') return;
    const cvs = canvasRef.current; if (!cvs) return; const ctx = cvs.getContext('2d');
    const updateSize = () => {
      const ct = containerRef.current; if (!ct) return; const r = ct.getBoundingClientRect();
      let w = r.width, h = w * (9/16); if (h > r.height) { h = r.height; w = h * (16/9); }
      cvs.width = w; cvs.height = h;
      cvs.style.position = 'absolute'; cvs.style.left = `${(r.width-w)/2}px`; cvs.style.top = `${(r.height-h)/2}px`;
      if (!targetRef.current.active && !spawnTimeoutRef.current && isActiveRef.current) spawn(w, h);
    };
    const ro = new ResizeObserver(updateSize); if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener('resize', updateSize); updateSize();
    function update() { if (!targetRef.current.active || !isActiveRef.current) return; targetRef.current.x += targetRef.current.vx; targetRef.current.y += targetRef.current.vy; if (targetRef.current.x < -60 || targetRef.current.x > cvs.width + 60 || targetRef.current.y < -60 || targetRef.current.y > cvs.height + 60) { targetRef.current.active = false; applyPenalty(); } }
    function draw() { update(); ctx.fillStyle = isBoxDarkMode ? "#020202" : "#f9fafb"; ctx.fillRect(0, 0, cvs.width, cvs.height); ctx.strokeStyle = isBoxDarkMode ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)'; ctx.lineWidth = 1; for (let i = 0; i < cvs.width; i += 40) { ctx.beginPath(); ctx.moveTo(i,0); ctx.lineTo(i,cvs.height); ctx.stroke(); } if (targetRef.current.active) { ctx.beginPath(); ctx.arc(targetRef.current.x, targetRef.current.y, targetRef.current.r, 0, Math.PI*2); ctx.fillStyle = "#FFFFFF"; ctx.shadowColor = "rgba(255,255,255,0.4)"; ctx.shadowBlur = 20; ctx.fill(); ctx.shadowBlur = 0; ctx.strokeStyle = isBoxDarkMode ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.15)"; ctx.lineWidth = 2; ctx.stroke(); ctx.beginPath(); ctx.arc(targetRef.current.x-4, targetRef.current.y-4, 7, 0, Math.PI*2); ctx.fillStyle = "rgba(255,255,255,0.2)"; ctx.fill(); } const m = mousePositionRef.current; if (m.x > 0 && m.x < cvs.width && m.y > 0 && m.y < cvs.height) { const over = targetRef.current.active && Math.hypot(m.x - targetRef.current.x, m.y - targetRef.current.y) < targetRef.current.r + 10; ctx.strokeStyle = over ? "#00ff88" : "#ff4444"; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(m.x-15,m.y); ctx.lineTo(m.x+15,m.y); ctx.moveTo(m.x,m.y-15); ctx.lineTo(m.x,m.y+15); ctx.stroke(); ctx.beginPath(); ctx.arc(m.x,m.y,20,0,Math.PI*2); ctx.strokeStyle = over ? 'rgba(0,255,136,0.3)' : 'rgba(255,68,68,0.3)'; ctx.stroke(); ctx.fillStyle = over ? '#00ff88' : '#ff4444'; ctx.fillRect(m.x-2,m.y-2,4,4); } animationRef.current = requestAnimationFrame(draw); }
    if (cvs.width && cvs.height && !targetRef.current.active && isActiveRef.current) spawn(cvs.width, cvs.height);
    animationRef.current = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(animationRef.current); window.removeEventListener('resize', updateSize); ro.disconnect(); if (spawnTimeoutRef.current) clearTimeout(spawnTimeoutRef.current); };
  }, [gameState, isBoxDarkMode, applyPenalty, spawn]);

  // Click handler
  useEffect(() => {
    const h = () => {
      if (gameState !== 'playing' || !isActiveRef.current || !targetRef.current.active) return;
      const m = mousePositionRef.current;
      if (Math.hypot(m.x - targetRef.current.x, m.y - targetRef.current.y) < targetRef.current.r + 10) {
        setTotalHits(p => p + 1); const ns = streakRef.current + 1; streakRef.current = ns; setStreak(ns);
        if (ns > bestStreakRef.current) { bestStreakRef.current = ns; setBestStreak(ns); }
        scoreRef.current += 1; setScore(scoreRef.current);
        if (ns % 5 === 0 && ns > 0) { playSound('streak'); showFeedback(`🔥 ${ns} Streak! +1`, 'success'); }
        else { playSound('hit'); showFeedback('✓ Hit! +1', 'success'); }
        targetRef.current.active = false;
        if (spawnTimeoutRef.current) clearTimeout(spawnTimeoutRef.current);
        spawnTimeoutRef.current = setTimeout(() => { const c = canvasRef.current; if (c?.width && c?.height && isActiveRef.current) { spawn(c.width, c.height); spawnTimeoutRef.current = null; } }, 200);
      }
    };
    window.addEventListener('mousedown', h); return () => window.removeEventListener('mousedown', h);
  }, [gameState, playSound, showFeedback, spawn]);

  const startGame = useCallback(() => { setGameState('playing'); gameStateRef.current = 'playing'; setScore(0); setStreak(0); setBestStreak(0); setTotalHits(0); setLives(3); setTimeLeft(60); setFeedback(''); isActiveRef.current = true; streakRef.current = 0; scoreRef.current = 0; livesRef.current = 3; bestStreakRef.current = 0; if (spawnTimeoutRef.current) clearTimeout(spawnTimeoutRef.current); const c = canvasRef.current; if (c?.width && c?.height) { targetRef.current.active = false; spawn(c.width, c.height); } }, [spawn]);
  const resetGame = useCallback(() => { isActiveRef.current = false; if (spawnTimeoutRef.current) clearTimeout(spawnTimeoutRef.current); if (timerIntervalRef.current) clearInterval(timerIntervalRef.current); if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current); setGameState('start'); gameStateRef.current = 'start'; setFeedback(''); setFeedbackType(''); }, []);

  useEffect(() => { return () => { isActiveRef.current = false; if (spawnTimeoutRef.current) clearTimeout(spawnTimeoutRef.current); if (timerIntervalRef.current) clearInterval(timerIntervalRef.current); if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current); if (animationRef.current) cancelAnimationFrame(animationRef.current); }; }, []);

  if (loading || !isClient) return (<div className="min-h-screen flex items-center justify-center bg-gray-50"><div className="text-center"><div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div><p className="text-gray-600">Loading moving target drill...</p></div></div>);

  return (
    <div className={`min-h-screen select-none ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", "name": "Kinetic Intercept - Moving Target Training", "url": "https://skilldrills.online/drills/visual/tracking-accuracy/moving-target", "description": "Hand-eye coordination training by clicking fast-moving white targets spawning from screen edges at 12-22 speed. 60s challenge with 3 lives, 5-streak bonuses, and hit tracking.", "applicationCategory": "EducationalApplication", "operatingSystem": "Web", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }, "author": { "@type": "Organization", "name": "Global Drill System" }, "educationalUse": ["Hand-Eye Coordination", "Target Tracking", "Aim Training", "Reflex Speed"], "learningResourceType": "Interactive Exercise", "timeRequired": "PT60S", "interactivityType": "active", "inLanguage": "en-US", "teaches": ["Moving Target Tracking", "Mouse Accuracy", "Hand-Eye Coordination", "Reflex Training"] }) }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <nav aria-label="Breadcrumb" className="mb-4"><ol className="flex flex-wrap items-center gap-2 text-sm"><li><Link href="/" className={`hover:underline transition-colors ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>Home</Link></li><li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} aria-hidden="true">/</li><li><Link href="/drills/visual" className={`hover:underline transition-colors ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>Visual Drills</Link></li><li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} aria-hidden="true">/</li><li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Tracking Accuracy</li><li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} aria-hidden="true">/</li><li className={`font-medium ${isDarkMode ? 'text-red-400' : 'text-red-600'}`} aria-current="page">Kinetic Intercept</li></ol></nav>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6"><div className="flex items-center gap-3"><div className="p-3 bg-gradient-to-r from-red-500 to-orange-600 rounded-xl flex-shrink-0"><Move className="w-6 h-6 text-white" /></div><div><h1 className={`text-2xl sm:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Kinetic Intercept</h1><p className={`text-sm sm:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Click moving targets • 12-22 speed • Build streak</p></div></div><div className="flex gap-2 flex-shrink-0">{gameState === 'playing' && <button onClick={resetGame} className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-100'}`} title="Reset session" aria-label="Reset drill session"><RefreshCw className="w-5 h-5" /></button>}<button onClick={() => setIsDarkMode(!isDarkMode)} className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`} aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'} title={isDarkMode ? 'Light mode' : 'Dark mode'}>{isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}</button><button onClick={() => setIsBoxDarkMode(!isBoxDarkMode)} className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`} aria-label="Toggle drill area theme" title="Toggle drill area theme"><Eye className="w-5 h-5" /></button><button onClick={() => setSoundEnabled(!soundEnabled)} className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`} aria-label={soundEnabled ? 'Mute sounds' : 'Enable sounds'} title={soundEnabled ? 'Mute' : 'Unmute'}>{soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}</button><button onClick={toggleFullscreen} className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`} aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'} title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}>{isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}</button></div></div>
        <section className="sr-only" aria-label="Drill description"><h2>Kinetic Intercept - Moving Target Tracking Training</h2><p>Train hand-eye coordination by clicking fast-moving white targets that spawn randomly from screen edges at 12-22 speed. Each hit scores +1 point. Missing a target loses 1 life (3 total). After lives reach 0, misses deduct 1 point. 5-streak bonus notifications. Cursor turns green when hovering over target. 60-second timed challenge.</p></section>
        <div className="grid grid-cols-6 gap-3 mb-4 h-[88px]"><StatCard icon={<Target className="text-blue-600" />} value={score} label="Score" isDark={isDarkMode} /><StatCard icon={<Trophy className="text-yellow-500" />} value={bestScore} label="Best" isDark={isDarkMode} /><StatCard icon={<Timer className={timeLeft < 15 ? 'text-red-600' : 'text-green-600'} />} value={timeLeft} label="Time" unit="s" isDark={isDarkMode} /><StatCard icon={<Zap className="text-orange-500" />} value={streak} label="Streak" isDark={isDarkMode} /><StatCard icon={<Check className="text-green-500" />} value={totalHits} label="Hits" isDark={isDarkMode} /><StatCard icon={<Heart className={lives > 0 ? 'text-red-500' : 'text-gray-500'} />} value={lives} label="Lives" isDark={isDarkMode} /></div>
        <div className="h-10 mb-2 flex justify-center items-center"><div className={`px-4 py-1.5 rounded-lg text-white font-semibold text-sm transition-all duration-200 ${feedback ? 'opacity-100 scale-100' : 'opacity-0 scale-95'} ${feedbackType === 'success' ? 'bg-green-500' : feedbackType === 'warning' ? 'bg-yellow-500' : 'bg-red-500'}`} role="status" aria-live="polite" aria-atomic="true">{feedback || '\u00A0'}</div></div>
        <div ref={containerRef} className={`relative ${isFullscreen ? 'fixed inset-0 z-50' : 'rounded-xl border-2'}`} style={{ background: isBoxDarkMode ? "#020202" : "#ffffff", aspectRatio: isFullscreen ? 'auto' : '16/9', maxWidth: '100%', margin: '0 auto', borderColor: isDarkMode ? '#374151' : '#e5e7eb', overflow: 'hidden' }}>
          {isFullscreen && gameState === 'playing' && (<><div className="absolute top-4 right-4 z-20 flex gap-3"><button onClick={resetGame} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all" title="Reset" aria-label="Reset"><RefreshCw className="w-5 h-5" /></button><button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all" aria-label="Dark mode">{isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}</button><button onClick={() => setIsBoxDarkMode(!isBoxDarkMode)} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all" aria-label="Theme"><Eye className="w-5 h-5" /></button><button onClick={() => setSoundEnabled(!soundEnabled)} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all" aria-label="Sound">{soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}</button><button onClick={toggleFullscreen} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all" aria-label="Exit fullscreen"><Minimize2 className="w-5 h-5" /></button></div><div className="absolute top-4 left-4 z-20 bg-black/50 backdrop-blur-sm rounded-lg px-4 py-2 text-white text-sm" aria-live="polite">Score: <span className="text-yellow-400 font-bold">{score}</span> | Speed: <span className="text-cyan-400 font-bold">{targetSpeed}</span> | Lives: <span className="text-red-400 font-bold">{lives}</span></div></>)}
          <canvas ref={canvasRef} style={{ display: 'block', position: 'absolute' }} aria-hidden="true" />
          {gameState === 'start' && (<div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}><div className={`rounded-2xl p-6 sm:p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}><div className="mb-4"><Crosshair className="w-16 h-16 text-red-500 mx-auto" aria-hidden="true" /></div><h2 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Kinetic Intercept</h2><p className={`mb-2 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>60-second challenge • Click moving targets</p><p className={`mb-6 text-sm ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>White targets spawn from edges at 12-22 speed. Cursor turns green on target. Build your streak!</p><button onClick={startGame} className="px-8 py-3 bg-gradient-to-r from-red-500 to-orange-600 text-white rounded-xl font-semibold hover:shadow-lg w-full transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2" aria-label="Start moving target training">Start Training</button></div></div>)}
          {gameState === 'gameOver' && (<div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}><div className={`rounded-2xl p-6 sm:p-8 shadow-xl border w-full max-w-[480px] mx-4 ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}><div className="flex items-center justify-center gap-3 mb-4"><Timer className="w-10 h-10 text-orange-500" aria-hidden="true" /><h2 className={`text-2xl font-bold ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Time&apos;s Up!</h2></div><p className={`text-center text-sm mb-6 ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Keep practicing to improve your tracking speed and precision.</p><div className="grid grid-cols-2 gap-3 mb-6"><ResultCard label="Final Score" value={score} icon={<Target className="w-4 h-4" />} color="blue" isDark={isBoxDarkMode} /><ResultCard label="Best Score" value={bestScore} icon={<Trophy className="w-4 h-4" />} color="yellow" isDark={isBoxDarkMode} /><ResultCard label="Total Hits" value={totalHits} icon={<Check className="w-4 h-4" />} color="emerald" isDark={isBoxDarkMode} /><ResultCard label="Best Streak" value={bestStreak} icon={<Zap className="w-4 h-4" />} color="orange" isDark={isBoxDarkMode} /><ResultCard label="Lives Remaining" value={lives} icon={<Heart className="w-4 h-4" />} color="red" isDark={isBoxDarkMode} /><ResultCard label="Avg Speed" value={targetSpeed} icon={<Move className="w-4 h-4" />} color="purple" isDark={isBoxDarkMode} /></div><div className="flex gap-3"><Link href="/drills/visual" className="flex-1"><button className={`w-full px-4 py-2.5 rounded-lg font-semibold transition-all ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>← Back to Drills</button></Link><button onClick={startGame} className="flex-1 px-4 py-2.5 bg-gradient-to-r from-red-500 to-orange-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">Play Again →</button></div></div></div>)}
        </div>
        {!isFullscreen && (<footer className="mt-6" aria-label="Drill rules"><div className={`rounded-xl border overflow-hidden ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}><div className={`px-4 py-3 border-b ${isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'}`}><div className="flex items-center gap-2"><Info className={`w-4 h-4 ${isDarkMode ? 'text-red-400' : 'text-red-600'}`} aria-hidden="true" /><h2 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>How Kinetic Intercept Works</h2></div></div><div className="p-4"><div className="grid grid-cols-1 md:grid-cols-2 gap-4"><div className="space-y-3"><div className="flex items-start gap-2"><div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">1</div><p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}><span className="font-semibold text-red-500">Click white targets</span> spawning from screen edges</p></div><div className="flex items-start gap-2"><div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">2</div><p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}><span className="font-semibold text-green-500">Hit: +1 point</span> with streak counter</p></div><div className="flex items-start gap-2"><div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">3</div><p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}><span className="font-semibold text-blue-500">Target speed: 12-22</span> from random edge positions</p></div></div><div className="space-y-3"><div className="flex items-start gap-2"><div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">4</div><p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}><span className="font-semibold text-yellow-500">5-Streak bonus notification</span></p></div><div className="flex items-start gap-2"><div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">5</div><p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}><span className="font-semibold text-purple-500">3 Lives system</span> • Miss = -1 life</p></div><div className="flex items-start gap-2"><div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">6</div><p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}><span className="font-semibold text-orange-500">0 lives = -1 point penalty</span> on miss</p></div></div></div><div className={`mt-4 pt-3 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs ${isDarkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'}`}><span>⚡ Targets spawn from 4 edges • Cursor turns green on target</span><span>🏆 Best Score saves locally</span></div></div></div></footer>)}
      </div>
    </div>
  );
}

function StatCard({ icon, value, label, unit = '', isDark }) { return (<div className={`rounded-xl shadow-sm border p-2 sm:p-3 text-center flex flex-col justify-center h-full transition-colors ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}><div className="mb-1 flex justify-center" aria-hidden="true">{icon}</div><p className={`text-lg sm:text-xl font-bold truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>{value}{unit}</p><p className={`text-[10px] sm:text-xs truncate ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{label}</p></div>); }
function ResultCard({ label, value, unit = '', icon, color, isDark }) { const colorMap = { blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-500', icon: 'text-blue-500' }, yellow: { bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', text: 'text-yellow-500', icon: 'text-yellow-500' }, green: { bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-500', icon: 'text-green-500' }, emerald: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-500', icon: 'text-emerald-500' }, orange: { bg: 'bg-orange-500/10', border: 'border-orange-500/30', text: 'text-orange-500', icon: 'text-orange-500' }, red: { bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-500', icon: 'text-red-500' }, purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-500', icon: 'text-purple-500' }, cyan: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', text: 'text-cyan-500', icon: 'text-cyan-500' } }; const colors = colorMap[color] || colorMap.blue; return (<div className={`flex items-center justify-between p-3 rounded-lg border ${colors.bg} ${colors.border}`}><div className="flex items-center gap-2 min-w-0"><div className={colors.icon} aria-hidden="true">{icon}</div><span className={`text-xs sm:text-sm truncate ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{label}</span></div><span className={`font-bold text-base sm:text-lg flex-shrink-0 ml-2 ${colors.text}`}>{value}{unit}</span></div>); }