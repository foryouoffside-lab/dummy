'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Target, Zap, Timer, Trophy, Heart, 
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, Eye,
  Info, Award, Activity, Brain, RefreshCw
} from 'lucide-react';

export default function MultiTargetTrackingClient() {
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
  const [phase, setPhase] = useState("MEMORIZE");
  const [memorizeTimer, setMemorizeTimer] = useState(2.0);
  const [identificationPhase, setIdentificationPhase] = useState(false);
  const [selectedBalls, setSelectedBalls] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  
  const ballsRef = useRef([]);
  const targetIndicesRef = useRef([]);
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const phaseRef = useRef("MEMORIZE");
  const timerRef = useRef(2.0);
  const canvasSizeRef = useRef({ width: 0, height: 0 });
  const timerIntervalRef = useRef(null);
  const isActiveRef = useRef(false);
  const gameStateRef = useRef('start');
  const audioCtxRef = useRef(null);
  const timeLeftRef = useRef(60);
  const radius = 25;
  const speed = 5;
  const config = { targets: 3, total: 9 };

  useEffect(() => { setIsClient(true); const t = setTimeout(() => setLoading(false), 300); return () => clearTimeout(t); }, []);
  useEffect(() => { try { const s = localStorage.getItem('ghostLinkBestScore'); if (s) { const p = parseInt(s, 10); if (!isNaN(p)) setBestScore(p); } } catch (e) {} }, []);
  const updateBestScore = useCallback((fs) => { try { const c = parseInt(localStorage.getItem('ghostLinkBestScore') || '0', 10); if (fs > c) { localStorage.setItem('ghostLinkBestScore', fs.toString()); setBestScore(fs); } } catch (e) {} }, []);
  useEffect(() => { gameStateRef.current = gameState; }, [gameState]);
  const toggleFullscreen = useCallback(async () => { try { if (!isFullscreen) { const el = containerRef.current; if (el?.requestFullscreen) { await el.requestFullscreen(); setIsFullscreen(true); } } else { if (document.fullscreenElement) await document.exitFullscreen(); setIsFullscreen(false); } } catch (e) {} }, [isFullscreen]);
  useEffect(() => { const h = () => setIsFullscreen(!!document.fullscreenElement); document.addEventListener('fullscreenchange', h); return () => document.removeEventListener('fullscreenchange', h); }, []);

  const initAudio = useCallback(() => { try { if (!audioCtxRef.current) audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)(); if (audioCtxRef.current.state === 'suspended') audioCtxRef.current.resume(); return audioCtxRef.current; } catch (e) { return null; } }, []);
  const playSound = useCallback((type) => { if (!soundEnabled) return; try { const ctx = initAudio(); if (!ctx) return; const o = ctx.createOscillator(), g = ctx.createGain(); o.connect(g); g.connect(ctx.destination); const now = ctx.currentTime; const f = { select: 880, deselect: 440, memorize: 660, tracking: 880, bonus: 1318 }; o.frequency.setValueAtTime(f[type] || 440, now); g.gain.setValueAtTime(type === 'bonus' ? 0.15 : 0.1, now); g.gain.exponentialRampToValueAtTime(0.001, now + 0.15); o.start(now); o.stop(now + 0.15); } catch (e) {} }, [soundEnabled, initAudio]);

  const startTimer = useCallback(() => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    timerIntervalRef.current = setInterval(() => {
      if (gameStateRef.current === 'playing' && isActiveRef.current && !identificationPhase) {
        timeLeftRef.current -= 1; setTimeLeft(timeLeftRef.current);
        if (timeLeftRef.current <= 0) { clearInterval(timerIntervalRef.current); timerIntervalRef.current = null; startIdentificationPhase(); }
      }
    }, 1000);
  }, []);

  const startIdentificationPhase = useCallback(() => {
    setIdentificationPhase(true); isActiveRef.current = false; playSound('tracking');
  }, [playSound]);

  const calculateBonus = useCallback(() => {
    const cs = selectedBalls.filter(idx => targetIndicesRef.current.includes(idx)).length;
    const bonus = cs * 5; setCorrectCount(cs); setScore(bonus); setShowResults(true);
    if (bonus > 0) playSound('bonus');
    updateBestScore(bonus);
    setTimeout(() => { setGameState('gameOver'); gameStateRef.current = 'gameOver'; }, 2000);
  }, [selectedBalls, playSound, updateBestScore]);

  const handleBallClick = useCallback((index) => {
    if (!identificationPhase || showResults) return;
    if (selectedBalls.includes(index)) { setSelectedBalls(prev => prev.filter(i => i !== index)); playSound('deselect'); }
    else if (selectedBalls.length < 3) { setSelectedBalls(prev => [...prev, index]); playSound('select'); }
  }, [identificationPhase, showResults, selectedBalls, playSound]);

  useEffect(() => { const h = (e) => { const c = canvasRef.current; if (!c) return; const r = c.getBoundingClientRect(); mousePositionRef.current = { x: (e.clientX - r.left) * (c.width / r.width), y: (e.clientY - r.top) * (c.height / r.height) }; }; window.addEventListener('mousemove', h); return () => window.removeEventListener('mousemove', h); }, []);

  useEffect(() => {
    const h = (e) => {
      if (gameStateRef.current !== 'playing') return;
      const c = canvasRef.current; if (!c) return;
      const r = c.getBoundingClientRect();
      const cx = (e.clientX - r.left) * (c.width / r.width), cy = (e.clientY - r.top) * (c.height / r.height);
      if (identificationPhase && !showResults) {
        ballsRef.current.forEach((ball, index) => { if (Math.hypot(cx - ball.x, cy - ball.y) < ball.r) handleBallClick(index); });
        if (selectedBalls.length === 3) {
          const btnX = c.width / 2 - 60, btnY = c.height - 60, btnW = 120, btnH = 40;
          if (cx >= btnX && cx <= btnX + btnW && cy >= btnY && cy <= btnY + btnH) calculateBonus();
        }
      }
    };
    window.addEventListener('mousedown', h);
    return () => window.removeEventListener('mousedown', h);
  }, [identificationPhase, showResults, selectedBalls, handleBallClick, calculateBonus]);

  const initDrill = useCallback(() => {
    const cvs = canvasRef.current; if (!cvs) return;
    ballsRef.current = []; targetIndicesRef.current = [];
    setSelectedBalls([]); setShowResults(false); setScore(0); setCorrectCount(0);
    const indices = []; while (indices.length < config.targets) { const idx = Math.floor(Math.random() * config.total); if (!indices.includes(idx)) indices.push(idx); }
    targetIndicesRef.current = indices;
    for (let i = 0; i < config.total; i++) {
      const angle = Math.random() * Math.PI * 2;
      ballsRef.current.push({ x: radius + Math.random() * (cvs.width - radius * 2), y: radius + Math.random() * (cvs.height - radius * 2), r: radius, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, isTarget: indices.includes(i) });
    }
    phaseRef.current = "MEMORIZE"; setPhase("MEMORIZE"); timerRef.current = 2.0; setMemorizeTimer(2.0);
    setIdentificationPhase(false); playSound('memorize');
  }, [playSound]);

  const updatePhysics = useCallback(() => {
    const cvs = canvasRef.current; if (!cvs) return;
    ballsRef.current.forEach(ball => { ball.x += ball.vx; ball.y += ball.vy; if (ball.x < ball.r || ball.x > cvs.width - ball.r) ball.vx *= -1; if (ball.y < ball.r || ball.y > cvs.height - ball.r) ball.vy *= -1; });
  }, []);

  useEffect(() => {
    if (gameState !== 'playing' && gameState !== 'gameOver') return;
    const cvs = canvasRef.current; if (!cvs) return;
    const ctx = cvs.getContext('2d');
    const updateCanvasSize = () => {
      const cr = containerRef.current; if (!cr) return;
      const rr = cr.getBoundingClientRect();
      let w = rr.width, h = w * (9 / 16);
      if (h > rr.height) { h = rr.height; w = h * (16 / 9); }
      cvs.width = w; cvs.height = h; canvasSizeRef.current = { width: w, height: h };
      cvs.style.position = 'absolute'; cvs.style.left = `${(rr.width - w) / 2}px`; cvs.style.top = `${(rr.height - h) / 2}px`;
      if (gameState === 'playing' && ballsRef.current.length === 0) initDrill();
    };
    updateCanvasSize();
    let lt = performance.now();
    function draw(now) {
      const dt = Math.min(0.033, (now - lt) / 1000); lt = now;
      if (gameStateRef.current === 'playing' && isActiveRef.current && !identificationPhase) {
        if (phaseRef.current === "MEMORIZE") { timerRef.current -= dt; setMemorizeTimer(timerRef.current); if (timerRef.current <= 0) { phaseRef.current = "TRACKING"; setPhase("TRACKING"); playSound('tracking'); } }
        else if (phaseRef.current === "TRACKING") updatePhysics();
      }
      ctx.fillStyle = isBoxDarkMode ? '#020202' : '#f9fafb'; ctx.fillRect(0, 0, cvs.width, cvs.height);
      ctx.strokeStyle = isBoxDarkMode ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)'; ctx.lineWidth = 1;
      for (let i = 0; i < cvs.width; i += 40) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, cvs.height); ctx.stroke(); }
      ballsRef.current.forEach((ball, index) => {
        ctx.beginPath(); ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
        if (identificationPhase) {
          if (showResults) { ctx.fillStyle = ball.isTarget ? '#00ff88' : (isBoxDarkMode ? '#333333' : '#cccccc'); ctx.shadowBlur = ball.isTarget ? 30 : 0; ctx.shadowColor = ball.isTarget ? '#00ff88' : 'transparent'; }
          else { ctx.fillStyle = selectedBalls.includes(index) ? '#ffaa00' : '#ffffff'; ctx.shadowBlur = selectedBalls.includes(index) ? 30 : 0; ctx.shadowColor = selectedBalls.includes(index) ? '#ffaa00' : 'transparent'; }
        } else if (phaseRef.current === "MEMORIZE") { ctx.fillStyle = ball.isTarget ? '#00ff88' : (isBoxDarkMode ? '#1a1a1a' : '#cccccc'); ctx.shadowBlur = ball.isTarget ? 30 : 0; ctx.shadowColor = ball.isTarget ? '#00ff88' : 'transparent'; }
        else { ctx.fillStyle = '#ffffff'; ctx.shadowBlur = 0; }
        ctx.fill(); ctx.shadowBlur = 0;
        ctx.beginPath(); ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2); ctx.strokeStyle = isBoxDarkMode ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)'; ctx.lineWidth = 1.5; ctx.stroke();
        if (identificationPhase && !showResults && selectedBalls.includes(index)) { ctx.font = 'bold 24px Arial'; ctx.fillStyle = '#ffffff'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('✓', ball.x, ball.y); }
      });
      if (identificationPhase) {
        ctx.font = 'bold 20px Arial'; ctx.fillStyle = '#ffffff'; ctx.textAlign = 'center'; ctx.textBaseline = 'top';
        if (showResults) ctx.fillText(`You tracked ${correctCount}/3 correctly! +${score} points!`, cvs.width / 2, 20);
        else ctx.fillText(`Click the 3 balls you tracked! (${selectedBalls.length}/3 selected)`, cvs.width / 2, 20);
        if (!showResults && selectedBalls.length === 3) { const bx = cvs.width / 2 - 60, by = cvs.height - 60; ctx.fillStyle = '#00ff88'; ctx.fillRect(bx, by, 120, 40); ctx.fillStyle = '#000000'; ctx.font = 'bold 16px Arial'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('CONFIRM', cvs.width / 2, by + 20); }
      }
      if (!identificationPhase) { const m = mousePositionRef.current; if (m.x > 0 && m.x < cvs.width && m.y > 0 && m.y < cvs.height) { ctx.strokeStyle = '#00ff88'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(m.x - 15, m.y); ctx.lineTo(m.x + 15, m.y); ctx.moveTo(m.x, m.y - 15); ctx.lineTo(m.x, m.y + 15); ctx.stroke(); ctx.beginPath(); ctx.arc(m.x, m.y, 20, 0, Math.PI * 2); ctx.strokeStyle = 'rgba(0,255,136,0.3)'; ctx.stroke(); ctx.fillStyle = '#00ff88'; ctx.fillRect(m.x - 2, m.y - 2, 4, 4); } }
      animationRef.current = requestAnimationFrame(draw);
    }
    animationRef.current = requestAnimationFrame(draw);
    const hr = () => { cancelAnimationFrame(animationRef.current); updateCanvasSize(); animationRef.current = requestAnimationFrame(draw); };
    window.addEventListener('resize', hr);
    const ro = new ResizeObserver(() => hr()); if (containerRef.current) ro.observe(containerRef.current);
    return () => { cancelAnimationFrame(animationRef.current); window.removeEventListener('resize', hr); ro.disconnect(); };
  }, [gameState, isBoxDarkMode, identificationPhase, showResults, selectedBalls, correctCount, score, initDrill, updatePhysics, playSound]);

  const startGame = useCallback(() => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    setGameState('playing'); gameStateRef.current = 'playing';
    setScore(0); timeLeftRef.current = 60; setTimeLeft(60);
    setPhase("MEMORIZE"); setIdentificationPhase(false); setSelectedBalls([]); setShowResults(false); setCorrectCount(0);
    isActiveRef.current = true; ballsRef.current = []; targetIndicesRef.current = [];
    startTimer(); setTimeout(() => initDrill(), 50);
  }, [startTimer, initDrill]);

  const resetGame = useCallback(() => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    isActiveRef.current = false;
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    setGameState('start'); gameStateRef.current = 'start';
    setScore(0); timeLeftRef.current = 60; setTimeLeft(60);
    setIdentificationPhase(false); setSelectedBalls([]); setShowResults(false); setCorrectCount(0);
  }, []);

  useEffect(() => () => { if (timerIntervalRef.current) clearInterval(timerIntervalRef.current); if (animationRef.current) cancelAnimationFrame(animationRef.current); }, []);

  if (loading || !isClient) return (<div className="min-h-screen flex items-center justify-center bg-gray-50"><div className="text-center"><div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div><p className="text-gray-600">Loading multi-target tracking...</p></div></div>);

  return (
    <div className={`min-h-screen select-none ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", "name": "Ghost-Link Multi-Target Tracking", "url": "https://skilldrills.online/drills/fps/multi-target-tracking", "description": "Memorize 3 green targets from 9 bouncing balls. Track them for 60 seconds, then identify your targets. +5 points per correct ball (max 15). Tests visual working memory and multi-object tracking for FPS gaming.", "applicationCategory": "GameApplication", "operatingSystem": "Web", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }, "author": { "@type": "Organization", "name": "Global Drill System" } }) }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <nav aria-label="Breadcrumb" className="mb-4"><ol className="flex flex-wrap items-center gap-2 text-sm"><li><Link href="/" className={`hover:underline transition-colors ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>Home</Link></li><li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} aria-hidden="true">/</li><li><Link href="/drills/fps" className={`hover:underline transition-colors ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>FPS Drills</Link></li><li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} aria-hidden="true">/</li><li className={`font-medium ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} aria-current="page">Multi-Target Tracking</li></ol></nav>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3"><div className="p-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex-shrink-0"><Brain className="w-6 h-6 text-white" /></div><div><h1 className={`text-2xl sm:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Ghost-Link Tracking</h1><p className={`text-sm sm:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Memorize 3 targets • Track 60s • +5 per correct ball</p></div></div>
          <div className="flex gap-2 flex-shrink-0">
            {gameState === 'playing' && <button onClick={resetGame} className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-100'}`} title="Reset" aria-label="Reset"><RefreshCw className="w-5 h-5" /></button>}
            <button onClick={() => setIsDarkMode(!isDarkMode)} className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`} aria-label={isDarkMode ? 'Light mode' : 'Dark mode'}>{isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}</button>
            <button onClick={() => setIsBoxDarkMode(!isBoxDarkMode)} className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`} aria-label="Toggle theme"><Eye className="w-5 h-5" /></button>
            <button onClick={() => setSoundEnabled(!soundEnabled)} className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`} aria-label={soundEnabled ? 'Mute' : 'Unmute'}>{soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}</button>
            <button onClick={toggleFullscreen} className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`} aria-label={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}>{isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}</button>
          </div>
        </div>
        <section className="sr-only"><h2>Ghost-Link Multi-Target Tracking Drill</h2><p>Memorize 3 green targets from 9 bouncing balls during a 2-second preview. Track all 9 balls for 60 seconds (all turn white). Then identify your 3 original targets. +5 points per correct ball (max 15). Tests visual working memory and multi-object tracking.</p></section>
        <div className="grid grid-cols-3 gap-3 mb-4 h-[88px]">
          <StatCard icon={<Trophy className="text-yellow-500" />} value={score} label="Score" isDark={isDarkMode} />
          <StatCard icon={<Award className="text-purple-500" />} value={bestScore} label="Best" isDark={isDarkMode} />
          <StatCard icon={<Timer className={timeLeft <= 10 ? 'text-red-600' : 'text-green-600'} />} value={timeLeft} label="Time" unit="s" isDark={isDarkMode} />
        </div>
        <div ref={containerRef} className={`relative ${isFullscreen ? 'fixed inset-0 z-50' : 'rounded-xl border-2'}`} style={{ background: isBoxDarkMode ? "#020202" : "#ffffff", aspectRatio: isFullscreen ? 'auto' : '16/9', maxWidth: '100%', margin: '0 auto', borderColor: isDarkMode ? '#374151' : '#e5e7eb', overflow: 'hidden' }}>
          {isFullscreen && gameState === 'playing' && (<div className="absolute top-4 right-4 z-30 flex gap-3"><button onClick={resetGame} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all" aria-label="Reset"><RefreshCw className="w-5 h-5" /></button><button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all">{isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}</button><button onClick={() => setIsBoxDarkMode(!isBoxDarkMode)} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all"><Eye className="w-5 h-5" /></button><button onClick={() => setSoundEnabled(!soundEnabled)} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all">{soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}</button><button onClick={toggleFullscreen} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all"><Minimize2 className="w-5 h-5" /></button></div>)}
          <canvas ref={canvasRef} style={{ display: 'block', position: 'absolute', cursor: gameState === 'playing' && !identificationPhase ? 'none' : 'default' }} aria-label="Memorize green targets, then track them and identify after 60 seconds" />
          {gameState === 'start' && (<div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}><div className={`rounded-2xl p-6 sm:p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}><div className="mb-4"><Brain className="w-16 h-16 text-purple-500 mx-auto" aria-hidden="true" /></div><h2 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Ghost-Link Tracking</h2><p className={`mb-2 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Memorize 3 • Track 60s • +5 per correct</p><p className={`mb-6 text-sm ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>3 green targets revealed for 2s. Track them as all balls move. Identify after 60s.</p><button onClick={startGame} className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg w-full transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-purple-500">Start Tracking</button></div></div>)}
          {gameState === 'gameOver' && (<div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}><div className={`rounded-2xl p-6 sm:p-8 shadow-xl border w-full max-w-[400px] mx-4 ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}><div className="flex items-center justify-center gap-3 mb-4"><Award className="w-10 h-10 text-yellow-500" aria-hidden="true" /><h2 className={`text-2xl font-bold ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Session Complete!</h2></div><div className="text-center mb-6"><p className={`text-lg mb-2 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>You tracked</p><p className={`text-5xl font-bold mb-2 ${correctCount === 3 ? 'text-green-500' : correctCount === 2 ? 'text-yellow-500' : 'text-red-500'}`}>{correctCount}/3</p><p className={`text-lg ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>targets correctly!</p></div><div className="grid grid-cols-2 gap-3 mb-6"><ResultCard label="Final Score" value={score} icon={<Target className="w-4 h-4" />} color="blue" isDark={isBoxDarkMode} /><ResultCard label="Best Score" value={bestScore} icon={<Trophy className="w-4 h-4" />} color="yellow" isDark={isBoxDarkMode} /></div><div className="flex gap-3"><Link href="/drills/fps" className="flex-1"><button className={`w-full px-4 py-2.5 rounded-lg font-semibold transition-all ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>← Back to FPS</button></Link><button onClick={startGame} className="flex-1 px-4 py-2.5 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-purple-500">Play Again →</button></div></div></div>)}
        </div>
        {!isFullscreen && (<footer className="mt-6" aria-label="Drill rules"><div className={`rounded-xl border overflow-hidden ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}><div className={`px-4 py-3 border-b ${isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'}`}><div className="flex items-center gap-2"><Info className={`w-4 h-4 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} /><h2 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Multi-Object Tracking Rules</h2></div></div><div className="p-4"><div className="grid grid-cols-1 md:grid-cols-2 gap-4"><div className="space-y-3"><div className="flex items-start gap-2"><div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">1</div><p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}><span className="font-semibold text-purple-500">Memorize 3 GREEN targets</span> • 2 second preview</p></div><div className="flex items-start gap-2"><div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">2</div><p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}><span className="font-semibold text-blue-500">Track for 60 seconds</span> • All balls turn white</p></div><div className="flex items-start gap-2"><div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">3</div><p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}><span className="font-semibold text-green-500">Identify after 60s</span> • Click the 3 tracked balls</p></div></div><div className="space-y-3"><div className="flex items-start gap-2"><div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">4</div><p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}><span className="font-semibold text-orange-500">+5 points per correct</span> • Max 15 points</p></div><div className="flex items-start gap-2"><div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">5</div><p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}><span className="font-semibold text-yellow-500">Select exactly 3</span> • Confirm to see results</p></div><div className="flex items-start gap-2"><div className="w-5 h-5 rounded-full bg-cyan-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">6</div><p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Best Score <span className="font-semibold text-cyan-500">saves locally</span></p></div></div></div></div></div></footer>)}
      </div>
    </div>
  );
}

function StatCard({ icon, value, label, unit = '', isDark }) { return (<div className={`rounded-xl shadow-sm border p-2 sm:p-3 text-center flex flex-col justify-center h-full ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}><div className="mb-1 flex justify-center" aria-hidden="true">{icon}</div><p className={`text-lg sm:text-xl font-bold truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>{value}{unit}</p><p className={`text-[10px] sm:text-xs truncate ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{label}</p></div>); }
function ResultCard({ label, value, unit = '', icon, color, isDark }) { const m = { blue: 'bg-blue-500/10 border-blue-500/30 text-blue-500', yellow: 'bg-yellow-500/10 border-yellow-500/30 text-yellow-500' }; const c = m[color] || m.blue; const [bg, border, text] = c.split(' '); return (<div className={`flex items-center justify-between p-3 rounded-lg border ${bg} ${border}`}><div className="flex items-center gap-2 min-w-0"><div className={text} aria-hidden="true">{icon}</div><span className={`text-xs sm:text-sm truncate ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{label}</span></div><span className={`font-bold text-base sm:text-lg flex-shrink-0 ml-2 ${text}`}>{value}{unit}</span></div>); }