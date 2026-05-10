'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Target, Zap, Timer, Trophy, Heart, 
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, Eye,
  Info, Award, Activity, Brain, RefreshCw
} from 'lucide-react';

export default function GhostLinkClient() {
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
  const timerIntervalRef = useRef(null);
  const isActiveRef = useRef(false);
  const gameStateRef = useRef('start');
  const audioCtxRef = useRef(null);
  const timeLeftRef = useRef(60);
  const radius = 25;
  const speed = 5;
  const config = { targets: 2, total: 11, pointsPerTarget: 10 };

  // Mark as client
  useEffect(() => { setIsClient(true); const t = setTimeout(() => setLoading(false), 300); return () => clearTimeout(t); }, []);

  // Load best score
  useEffect(() => {
    try { const s = localStorage.getItem('ghostLinkBestScore'); if (s) { const p = parseInt(s, 10); if (!isNaN(p)) setBestScore(p); } } catch (e) {}
  }, []);

  const updateBestScore = useCallback((fs) => {
    try { const c = parseInt(localStorage.getItem('ghostLinkBestScore') || '0', 10); if (fs > c) { localStorage.setItem('ghostLinkBestScore', fs.toString()); setBestScore(fs); } } catch (e) {}
  }, []);

  useEffect(() => { gameStateRef.current = gameState; }, [gameState]);

  const toggleFullscreen = useCallback(async () => {
    try { if (!isFullscreen) { const el = containerRef.current; if (el?.requestFullscreen) { await el.requestFullscreen(); setIsFullscreen(true); } } else { if (document.fullscreenElement) await document.exitFullscreen(); setIsFullscreen(false); } } catch (e) {}
  }, [isFullscreen]);

  useEffect(() => { const h = () => setIsFullscreen(!!document.fullscreenElement); document.addEventListener('fullscreenchange', h); return () => document.removeEventListener('fullscreenchange', h); }, []);

  const initAudio = useCallback(() => {
    try { if (!audioCtxRef.current) audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)(); if (audioCtxRef.current.state === 'suspended') audioCtxRef.current.resume(); return audioCtxRef.current; } catch (e) { return null; }
  }, []);

  const playSound = useCallback((type) => {
    if (!soundEnabled) return;
    try { const ctx = initAudio(); if (!ctx) return; const o = ctx.createOscillator(); const g = ctx.createGain(); o.connect(g); g.connect(ctx.destination); const now = ctx.currentTime; const f = { select: 880, deselect: 440, memorize: 660, tracking: 880, bonus: 1318 }; o.frequency.setValueAtTime(f[type] || 440, now); g.gain.setValueAtTime(type === 'bonus' ? 0.15 : 0.12, now); g.gain.exponentialRampToValueAtTime(0.001, now + 0.15); o.start(now); o.stop(now + 0.15); } catch (e) {}
  }, [soundEnabled, initAudio]);

  const calculateBonus = useCallback(() => {
    const correctSelections = selectedBalls.filter(idx => targetIndicesRef.current.includes(idx)).length;
    const bonus = correctSelections * config.pointsPerTarget;
    setCorrectCount(correctSelections); 
    setScore(bonus); 
    setShowResults(true);
    if (bonus > 0) playSound('bonus');
    updateBestScore(bonus);
    setTimeout(() => { setGameState('gameOver'); gameStateRef.current = 'gameOver'; }, 2000);
  }, [selectedBalls, playSound, updateBestScore]);

  const handleBallClick = useCallback((index) => {
    if (!identificationPhase || showResults) return;
    if (selectedBalls.includes(index)) { setSelectedBalls(p => p.filter(i => i !== index)); playSound('deselect'); }
    else if (selectedBalls.length < config.targets) { setSelectedBalls(p => [...p, index]); playSound('select'); }
  }, [identificationPhase, showResults, selectedBalls, playSound]);

  const startIdentificationPhase = useCallback(() => { setIdentificationPhase(true); isActiveRef.current = false; playSound('tracking'); }, [playSound]);

  const startTimer = useCallback(() => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    timerIntervalRef.current = setInterval(() => { if (gameStateRef.current === 'playing' && isActiveRef.current && !identificationPhase) { timeLeftRef.current -= 1; setTimeLeft(timeLeftRef.current); if (timeLeftRef.current <= 0) { clearInterval(timerIntervalRef.current); timerIntervalRef.current = null; startIdentificationPhase(); } } }, 1000);
  }, [identificationPhase, startIdentificationPhase]);

  const initDrill = useCallback(() => {
    const cvs = canvasRef.current; if (!cvs) return;
    ballsRef.current = []; targetIndicesRef.current = []; setSelectedBalls([]); setShowResults(false); setScore(0); setCorrectCount(0);
    const indices = []; while (indices.length < config.targets) { const idx = Math.floor(Math.random() * config.total); if (!indices.includes(idx)) indices.push(idx); }
    targetIndicesRef.current = indices;
    for (let i = 0; i < config.total; i++) { const angle = Math.random() * Math.PI * 2; ballsRef.current.push({ x: radius + Math.random() * (cvs.width - radius * 2), y: radius + Math.random() * (cvs.height - radius * 2), r: radius, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, isTarget: targetIndicesRef.current.includes(i) }); }
    phaseRef.current = "MEMORIZE"; setPhase("MEMORIZE"); timerRef.current = 2.0; setMemorizeTimer(2.0); setIdentificationPhase(false); playSound('memorize');
  }, [playSound]);

  const updatePhysics = useCallback(() => {
    const cvs = canvasRef.current; if (!cvs) return;
    ballsRef.current.forEach(b => { b.x += b.vx; b.y += b.vy; if (b.x < b.r || b.x > cvs.width - b.r) b.vx *= -1; if (b.y < b.r || b.y > cvs.height - b.r) b.vy *= -1; });
  }, []);

  // Mouse handlers
  useEffect(() => { const h = (e) => { const c = canvasRef.current; if (!c) return; const r = c.getBoundingClientRect(); mousePositionRef.current = { x: (e.clientX - r.left) * (c.width / r.width), y: (e.clientY - r.top) * (c.height / r.height) }; }; window.addEventListener('mousemove', h); return () => window.removeEventListener('mousemove', h); }, []);
  useEffect(() => {
    const h = (e) => { if (gameState !== 'playing') return; const c = canvasRef.current; if (!c) return; const r = c.getBoundingClientRect(); const cx = (e.clientX - r.left) * (c.width / r.width); const cy = (e.clientY - r.top) * (c.height / r.height); if (identificationPhase && !showResults) ballsRef.current.forEach((b, i) => { if (Math.hypot(cx - b.x, cy - b.y) < b.r) handleBallClick(i); }); };
    window.addEventListener('mousedown', h); return () => window.removeEventListener('mousedown', h);
  }, [gameState, identificationPhase, showResults, handleBallClick]);
  useEffect(() => {
    const h = (e) => { if (!identificationPhase || showResults || selectedBalls.length !== config.targets) return; const c = canvasRef.current; if (!c) return; const r = c.getBoundingClientRect(); const cx = (e.clientX - r.left) * (c.width / r.width); const cy = (e.clientY - r.top) * (c.height / r.height); const bx = c.width/2 - 60, by = c.height - 60, bw = 120, bh = 40; if (cx >= bx && cx <= bx + bw && cy >= by && cy <= by + bh) calculateBonus(); };
    window.addEventListener('mousedown', h); return () => window.removeEventListener('mousedown', h);
  }, [identificationPhase, showResults, selectedBalls, calculateBonus]);

  // Canvas rendering
  useEffect(() => {
    if (gameState !== 'playing' && gameState !== 'gameOver') return;
    const cvs = canvasRef.current; if (!cvs) return; const ctx = cvs.getContext('2d');
    const updateSize = () => { const ct = containerRef.current; if (!ct) return; const cr = ct.getBoundingClientRect(); let w = cr.width, h = w * (9/16); if (h > cr.height) { h = cr.height; w = h * (16/9); } cvs.width = w; cvs.height = h; cvs.style.position = 'absolute'; cvs.style.left = `${(cr.width-w)/2}px`; cvs.style.top = `${(cr.height-h)/2}px`; if (gameState === 'playing' && ballsRef.current.length === 0) initDrill(); };
    const ro = new ResizeObserver(updateSize); if (containerRef.current) ro.observe(containerRef.current); window.addEventListener('resize', updateSize); updateSize();
    let lastTime = performance.now();
    function render(now) { const dt = Math.min(0.033, (now - lastTime) / 1000); lastTime = now; if (gameState === 'playing' && isActiveRef.current && !identificationPhase) { if (phaseRef.current === "MEMORIZE") { timerRef.current -= dt; setMemorizeTimer(timerRef.current); if (timerRef.current <= 0) { phaseRef.current = "TRACKING"; setPhase("TRACKING"); playSound('tracking'); } } else if (phaseRef.current === "TRACKING") updatePhysics(); }
      ctx.fillStyle = isBoxDarkMode ? '#020202' : '#f9fafb'; ctx.fillRect(0, 0, cvs.width, cvs.height);
      ballsRef.current.forEach((b, i) => { ctx.beginPath(); ctx.arc(b.x, b.y, b.r, 0, Math.PI*2); if (identificationPhase) { if (showResults) { ctx.fillStyle = b.isTarget ? "#00ff88" : (isBoxDarkMode ? "#333333" : "#cccccc"); ctx.shadowBlur = b.isTarget ? 30 : 0; ctx.shadowColor = b.isTarget ? "#00ff88" : "transparent"; } else { ctx.fillStyle = selectedBalls.includes(i) ? "#ffaa00" : "#ffffff"; ctx.shadowBlur = selectedBalls.includes(i) ? 30 : 0; ctx.shadowColor = selectedBalls.includes(i) ? "#ffaa00" : "transparent"; } } else if (phaseRef.current === "MEMORIZE") { ctx.fillStyle = b.isTarget ? "#00ff88" : (isBoxDarkMode ? "#1a1a1a" : "#cccccc"); ctx.shadowBlur = b.isTarget ? 30 : 0; ctx.shadowColor = b.isTarget ? "#00ff88" : "transparent"; } else { ctx.fillStyle = "#ffffff"; ctx.shadowBlur = 0; } ctx.fill(); ctx.shadowBlur = 0; ctx.strokeStyle = isBoxDarkMode ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.1)"; ctx.lineWidth = 1.5; ctx.stroke(); if (identificationPhase && !showResults && selectedBalls.includes(i)) { ctx.font = "bold 24px Arial"; ctx.fillStyle = "#ffffff"; ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.fillText("✓", b.x, b.y); } });
      if (identificationPhase) { ctx.font = "bold 20px Arial"; ctx.fillStyle = "#ffffff"; ctx.textAlign = "center"; ctx.textBaseline = "top"; if (showResults) ctx.fillText(`You tracked ${correctCount}/${config.targets} correctly! +${score} points!`, cvs.width/2, 20); else ctx.fillText(`Click the ${config.targets} balls you tracked! (${selectedBalls.length}/${config.targets} selected)`, cvs.width/2, 20); if (!showResults && selectedBalls.length === config.targets) { const bx = cvs.width/2-60, by = cvs.height-60; ctx.fillStyle = "#00ff88"; ctx.fillRect(bx, by, 120, 40); ctx.fillStyle = "#000000"; ctx.font = "bold 16px Arial"; ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.fillText("CONFIRM", cvs.width/2, by+20); } }
      if (!identificationPhase) { const m = mousePositionRef.current; if (m.x > 0 && m.x < cvs.width && m.y > 0 && m.y < cvs.height) { ctx.strokeStyle = "#00ff88"; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(m.x-15,m.y); ctx.lineTo(m.x+15,m.y); ctx.moveTo(m.x,m.y-15); ctx.lineTo(m.x,m.y+15); ctx.stroke(); ctx.beginPath(); ctx.arc(m.x,m.y,20,0,Math.PI*2); ctx.strokeStyle='rgba(0,255,136,0.3)'; ctx.stroke(); ctx.fillStyle='#00ff88'; ctx.fillRect(m.x-2,m.y-2,4,4); } }
      animationRef.current = requestAnimationFrame(render); }
    animationRef.current = requestAnimationFrame(render);
    return () => { cancelAnimationFrame(animationRef.current); window.removeEventListener('resize', updateSize); ro.disconnect(); };
  }, [gameState, isBoxDarkMode, identificationPhase, showResults, selectedBalls, correctCount, score, updatePhysics, playSound, initDrill]);

  const startGame = useCallback(() => { if (timerIntervalRef.current) { clearInterval(timerIntervalRef.current); timerIntervalRef.current = null; } setGameState('playing'); gameStateRef.current = 'playing'; setScore(0); timeLeftRef.current = 60; setTimeLeft(60); setPhase("MEMORIZE"); setIdentificationPhase(false); setSelectedBalls([]); setShowResults(false); setCorrectCount(0); isActiveRef.current = true; ballsRef.current = []; targetIndicesRef.current = []; startTimer(); setTimeout(() => initDrill(), 50); }, [startTimer, initDrill]);
  const resetGame = useCallback(() => { if (timerIntervalRef.current) { clearInterval(timerIntervalRef.current); timerIntervalRef.current = null; } if (animationRef.current) cancelAnimationFrame(animationRef.current); isActiveRef.current = false; setGameState('start'); gameStateRef.current = 'start'; setScore(0); timeLeftRef.current = 60; setTimeLeft(60); setPhase("MEMORIZE"); setIdentificationPhase(false); setSelectedBalls([]); setShowResults(false); setCorrectCount(0); setMemorizeTimer(2.0); ballsRef.current = []; targetIndicesRef.current = []; phaseRef.current = "MEMORIZE"; timerRef.current = 2.0; }, []);
  useEffect(() => { return () => { if (timerIntervalRef.current) clearInterval(timerIntervalRef.current); if (animationRef.current) cancelAnimationFrame(animationRef.current); }; }, []);

  if (loading || !isClient) return (<div className="min-h-screen flex items-center justify-center bg-gray-50"><div className="text-center"><div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div><p className="text-gray-600">Loading multi-target tracking drill...</p></div></div>);

  return (
    <div className={`min-h-screen select-none ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", "name": "Ghost-Link Tracking", "url": "https://skilldrills.online/drills/visual/tracking-accuracy/multiple-targets", "description": "Multi-object tracking and visual working memory training. Memorize 2 green targets among 11 moving balls. Track for 60s, then identify. 10 points per correct ball (max 20).", "applicationCategory": "EducationalApplication", "operatingSystem": "Web", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }, "author": { "@type": "Organization", "name": "Global Drill System" }, "educationalUse": ["Multi-Object Tracking", "Visual Working Memory", "Attention Training", "Cognitive Assessment"], "learningResourceType": "Interactive Exercise", "timeRequired": "PT60S", "interactivityType": "active", "inLanguage": "en-US", "teaches": ["Multiple Object Tracking", "Visual Memory", "Divided Attention", "Target Identification"] }) }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <nav aria-label="Breadcrumb" className="mb-4"><ol className="flex flex-wrap items-center gap-2 text-sm"><li><Link href="/" className={`hover:underline transition-colors ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>Home</Link></li><li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} aria-hidden="true">/</li><li><Link href="/drills/visual" className={`hover:underline transition-colors ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>Visual Drills</Link></li><li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} aria-hidden="true">/</li><li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Tracking Accuracy</li><li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} aria-hidden="true">/</li><li className={`font-medium ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} aria-current="page">Ghost-Link Tracking</li></ol></nav>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6"><div className="flex items-center gap-3"><div className="p-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex-shrink-0"><Brain className="w-6 h-6 text-white" /></div><div><h1 className={`text-2xl sm:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Ghost-Link Tracking</h1><p className={`text-sm sm:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Memorize 2 targets • Track for 60s • 10 points per correct ball</p></div></div><div className="flex gap-2 flex-shrink-0">{gameState === 'playing' && <button onClick={resetGame} className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-100'}`} title="Reset" aria-label="Reset"><RefreshCw className="w-5 h-5" /></button>}<button onClick={() => setIsDarkMode(!isDarkMode)} className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`} aria-label={isDarkMode ? 'Light mode' : 'Dark mode'}>{isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}</button><button onClick={() => setIsBoxDarkMode(!isBoxDarkMode)} className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`} aria-label="Theme"><Eye className="w-5 h-5" /></button><button onClick={() => setSoundEnabled(!soundEnabled)} className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`} aria-label="Sound">{soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}</button><button onClick={toggleFullscreen} className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`} aria-label="Fullscreen">{isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}</button></div></div>
        <section className="sr-only"><h2>Ghost-Link Tracking - Multi-Object Visual Memory Training</h2><p>Train multi-object tracking and visual working memory. Memorize 2 green targets among 11 moving balls during a 2-second preview. Track all balls for 60 seconds as they bounce around. After time expires, identify the 2 original targets by clicking them. 10 points per correct ball (max 20). Confirm button appears after selecting 2 balls.</p></section>
        <div className="grid grid-cols-3 gap-3 mb-4 h-[88px]"><StatCard icon={<Trophy className="text-yellow-500" />} value={score} label="Score" isDark={isDarkMode} /><StatCard icon={<Award className="text-purple-500" />} value={bestScore} label="Best" isDark={isDarkMode} /><StatCard icon={<Timer className={timeLeft <= 10 ? 'text-red-600' : 'text-green-600'} />} value={timeLeft} label="Time" unit="s" isDark={isDarkMode} /></div>
        <div ref={containerRef} className={`relative ${isFullscreen ? 'fixed inset-0 z-50' : 'rounded-xl border-2'}`} style={{ background: isBoxDarkMode ? "#020202" : "#ffffff", aspectRatio: isFullscreen ? 'auto' : '16/9', maxWidth: '100%', margin: '0 auto', borderColor: isDarkMode ? '#374151' : '#e5e7eb', overflow: 'hidden' }}>
          {isFullscreen && gameState === 'playing' && (<div className="absolute top-4 right-4 z-30 flex gap-3"><button onClick={resetGame} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all" title="Reset" aria-label="Reset"><RefreshCw className="w-5 h-5" /></button><button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all" aria-label="Dark mode">{isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}</button><button onClick={() => setIsBoxDarkMode(!isBoxDarkMode)} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all" aria-label="Theme"><Eye className="w-5 h-5" /></button><button onClick={() => setSoundEnabled(!soundEnabled)} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all" aria-label="Sound">{soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}</button><button onClick={toggleFullscreen} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all" aria-label="Exit fullscreen"><Minimize2 className="w-5 h-5" /></button></div>)}
          <canvas ref={canvasRef} style={{ display: 'block', position: 'absolute', cursor: gameState === 'playing' && !identificationPhase ? 'none' : 'default' }} aria-hidden="true" />
          {gameState === 'start' && (<div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}><div className={`rounded-2xl p-6 sm:p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}><div className="mb-4"><Brain className="w-16 h-16 text-purple-500 mx-auto" aria-hidden="true" /></div><h2 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Ghost-Link Tracking</h2><p className={`mb-2 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>60s • Memorize 2 targets • Track with eyes</p><p className={`mb-6 text-sm ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>2-second preview of 2 green targets. Then track them among 11 moving balls. Identify after 60s.</p><button onClick={startGame} className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg w-full transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2" aria-label="Start ghost-link tracking">Start Tracking</button></div></div>)}
          {gameState === 'gameOver' && (<div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}><div className={`rounded-2xl p-6 sm:p-8 shadow-xl border w-full max-w-[400px] mx-4 ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}><div className="flex items-center justify-center gap-3 mb-4"><Timer className="w-10 h-10 text-orange-500" aria-hidden="true" /><h2 className={`text-2xl font-bold ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Session Complete!</h2></div><div className="text-center mb-6"><p className={`text-lg mb-2 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>You tracked</p><p className={`text-5xl font-bold mb-2 ${correctCount === config.targets ? 'text-green-500' : correctCount >= 1 ? 'text-yellow-500' : 'text-red-500'}`}>{correctCount}/{config.targets}</p><p className={`text-lg ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>targets correctly!</p></div><div className="grid grid-cols-2 gap-3 mb-6"><ResultCard label="Final Score" value={score} icon={<Target className="w-4 h-4" />} color="blue" isDark={isBoxDarkMode} /><ResultCard label="Best Score" value={bestScore} icon={<Trophy className="w-4 h-4" />} color="yellow" isDark={isBoxDarkMode} /></div><div className="flex gap-3"><Link href="/drills/visual" className="flex-1"><button className={`w-full px-4 py-2.5 rounded-lg font-semibold transition-all ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>← Back to Drills</button></Link><button onClick={startGame} className="flex-1 px-4 py-2.5 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">Play Again →</button></div></div></div>)}
        </div>
        {!isFullscreen && (<footer className="mt-6" aria-label="Drill rules"><div className={`rounded-xl border overflow-hidden ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}><div className={`px-4 py-3 border-b ${isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'}`}><div className="flex items-center gap-2"><Info className={`w-4 h-4 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} aria-hidden="true" /><h2 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Multi-Object Tracking Rules</h2></div></div><div className="p-4"><div className="grid grid-cols-1 md:grid-cols-2 gap-4"><div className="space-y-3"><div className="flex items-start gap-2"><div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">1</div><p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}><span className="font-semibold text-purple-500">Memorize 2 GREEN targets</span> during 2-second preview</p></div><div className="flex items-start gap-2"><div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">2</div><p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}><span className="font-semibold text-blue-500">Track all 11 balls for 60s</span> • All balls appear white</p></div><div className="flex items-start gap-2"><div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">3</div><p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}><span className="font-semibold text-green-500">Identify phase: Click the 2 targets</span> • Select exactly 2</p></div></div><div className="space-y-3"><div className="flex items-start gap-2"><div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">4</div><p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}><span className="font-semibold text-orange-500">10 points per correct ball</span> • Max score: 20 points</p></div><div className="flex items-start gap-2"><div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">5</div><p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}><span className="font-semibold text-yellow-500">Click CONFIRM</span> after selecting 2 balls</p></div><div className="flex items-start gap-2"><div className="w-5 h-5 rounded-full bg-cyan-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">6</div><p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}><span className="font-semibold text-cyan-500">Best Score saves locally</span> • 11 balls, 5px speed</p></div></div></div><div className={`mt-4 pt-3 border-t text-xs ${isDarkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'} text-center`}>👁️ Green checkmark indicates selection • Orange glow = selected ball</div></div></div></footer>)}
      </div>
    </div>
  );
}

function StatCard({ icon, value, label, unit = '', isDark }) { return (<div className={`rounded-xl shadow-sm border p-2 sm:p-3 text-center flex flex-col justify-center h-full transition-colors ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}><div className="mb-1 flex justify-center" aria-hidden="true">{icon}</div><p className={`text-lg sm:text-xl font-bold truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>{value}{unit}</p><p className={`text-[10px] sm:text-xs truncate ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{label}</p></div>); }
function ResultCard({ label, value, unit = '', icon, color, isDark }) { const colorMap = { blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-500', icon: 'text-blue-500' }, yellow: { bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', text: 'text-yellow-500', icon: 'text-yellow-500' }, green: { bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-500', icon: 'text-green-500' } }; const c = colorMap[color] || colorMap.blue; return (<div className={`flex items-center justify-between p-3 rounded-lg border ${c.bg} ${c.border}`}><div className="flex items-center gap-2 min-w-0"><div className={c.icon} aria-hidden="true">{icon}</div><span className={`text-xs sm:text-sm truncate ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{label}</span></div><span className={`font-bold text-base sm:text-lg flex-shrink-0 ml-2 ${c.text}`}>{value}{unit}</span></div>); }