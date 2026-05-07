'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Target, Zap, Clock, Award, Activity, 
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, 
  Eye, Music, Brain, X, Trophy, Info, Timer, RefreshCw, Heart
} from 'lucide-react';

export default function RhythmTapClient() {
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
  const [bpm, setBpm] = useState(60);
  const [timeLeft, setTimeLeft] = useState(60);
  const [lives, setLives] = useState(3);
  const [misses, setMisses] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  const [feedbackMsg, setFeedbackMsg] = useState("");
  const [feedbackColor, setFeedbackColor] = useState("#00ff88");
  const [perfectHits, setPerfectHits] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [isClient, setIsClient] = useState(false);
  
  const streakRef = useRef(0);
  const bestStreakRef = useRef(0);
  const scoreRef = useRef(0);
  const livesRef = useRef(3);
  const lastBeatRef = useRef(performance.now());
  const lastBpmChangeRef = useRef(performance.now());
  const feedbackTimerRef = useRef(0);
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const totalAttemptsRef = useRef(0);
  const hitsRef = useRef(0);
  const perfectHitsRef = useRef(0);
  const timerIntervalRef = useRef(null);
  const feedbackTimeoutRef = useRef(null);
  const isActiveRef = useRef(false);
  const gameStateRef = useRef('start');
  const audioCtxRef = useRef(null);

  const PENALTY = 1;

  // Mark as client-side rendered
  useEffect(() => { setIsClient(true); const t = setTimeout(() => setLoading(false), 300); return () => clearTimeout(t); }, []);

  // Load best scores
  useEffect(() => {
    try {
      const savedBestScore = localStorage.getItem('rhythmTapBestScore');
      const savedBestStreak = localStorage.getItem('rhythmTapBestStreak');
      if (savedBestScore) { const p = parseInt(savedBestScore, 10); if (!isNaN(p)) setBestScore(p); }
      if (savedBestStreak) { const p = parseInt(savedBestStreak, 10); if (!isNaN(p)) setBestStreak(p); }
    } catch (e) { /* localStorage not available */ }
  }, []);

  const updateBestScore = useCallback((finalScore) => {
    try {
      const currentBestScore = parseInt(localStorage.getItem('rhythmTapBestScore') || '0', 10);
      if (finalScore > currentBestScore) { localStorage.setItem('rhythmTapBestScore', finalScore.toString()); setBestScore(finalScore); }
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
      const freqMap = { perfect: 1046.5, good: 880, miss: 440, streak: 1318.52, lifeLost: 330 };
      osc.frequency.setValueAtTime(freqMap[type] || 660, now);
      gain.gain.setValueAtTime(type === 'lifeLost' || type === 'streak' ? 0.15 : 0.1, now);
      const dur = type === 'lifeLost' ? 0.2 : 0.12;
      gain.gain.exponentialRampToValueAtTime(0.001, now + dur);
      osc.start(now); osc.stop(now + dur);
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

  const handleMiss = useCallback(() => {
    if (!isActiveRef.current) return;
    totalAttemptsRef.current++; setMisses(prev => prev + 1);
    streakRef.current = 0; setStreak(0);
    setFeedbackMsg("MISS"); setFeedbackColor("#FF3E3E"); feedbackTimerRef.current = 0.3;
    if (livesRef.current > 0) { livesRef.current--; setLives(livesRef.current); playSound('miss'); if (livesRef.current === 0) { playSound('lifeLost'); showFeedback('⚠️ Out of lives! Penalty now active!', 'warning'); } else showFeedback(`✗ Off-beat! No penalty • ${livesRef.current} lives left`, 'error'); }
    else { scoreRef.current = Math.max(0, scoreRef.current - PENALTY); setScore(scoreRef.current); playSound('miss'); showFeedback(`✗ Off-beat! -${PENALTY} point penalty`, 'error'); }
    updateAccuracy();
  }, [PENALTY, updateAccuracy, playSound, showFeedback]);

  // Mouse tracking
  useEffect(() => {
    const h = (e) => { const cvs = canvasRef.current; if (!cvs) return; const rect = cvs.getBoundingClientRect(); const sx = cvs.width / rect.width; const sy = cvs.height / rect.height; mousePositionRef.current = { x: (e.clientX - rect.left) * sx, y: (e.clientY - rect.top) * sy }; };
    window.addEventListener('mousemove', h); return () => window.removeEventListener('mousemove', h);
  }, []);

  // Click handler
  useEffect(() => {
    const handleMouseDown = () => {
      if (gameStateRef.current !== 'playing' || !isActiveRef.current) return;
      const now = performance.now();
      const interval = 60000 / bpm;
      const timeInCycle = (now - lastBeatRef.current) % interval;
      const error = Math.min(timeInCycle, interval - timeInCycle);
      totalAttemptsRef.current++;
      if (error < 40) {
        hitsRef.current++; perfectHitsRef.current++; setPerfectHits(perfectHitsRef.current);
        const pointsEarned = 1; scoreRef.current += pointsEarned; setScore(scoreRef.current);
        const newStreak = streakRef.current + 1; streakRef.current = newStreak; setStreak(newStreak);
        if (newStreak > bestStreakRef.current) { bestStreakRef.current = newStreak; setBestStreak(newStreak); try { localStorage.setItem('rhythmTapBestStreak', newStreak.toString()); } catch (e) {} }
        setFeedbackMsg("PERFECT!"); setFeedbackColor("#00ff88"); feedbackTimerRef.current = 0.3;
        if (newStreak % 5 === 0 && newStreak > 0) { playSound('streak'); showFeedback(`🔥 ${newStreak} Streak! +1`, 'success'); }
        else { playSound('perfect'); showFeedback('✓ PERFECT! +1 point', 'success'); }
        updateAccuracy();
      } else if (error < 80) {
        hitsRef.current++;
        const pointsEarned = 1; scoreRef.current += pointsEarned; setScore(scoreRef.current);
        const newStreak = streakRef.current + 1; streakRef.current = newStreak; setStreak(newStreak);
        if (newStreak > bestStreakRef.current) { bestStreakRef.current = newStreak; setBestStreak(newStreak); try { localStorage.setItem('rhythmTapBestStreak', newStreak.toString()); } catch (e) {} }
        setFeedbackMsg("GOOD"); setFeedbackColor("#00FFFF"); feedbackTimerRef.current = 0.25;
        playSound('good'); showFeedback('✓ GOOD! +1 point', 'success');
        updateAccuracy();
      } else { handleMiss(); }
    };
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('contextmenu', (e) => e.preventDefault());
    return () => { window.removeEventListener('mousedown', handleMouseDown); window.removeEventListener('contextmenu', (e) => e.preventDefault()); };
  }, [bpm, playSound, showFeedback, handleMiss, updateAccuracy]);

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
    let lastFrameTime = performance.now();
    lastBeatRef.current = performance.now(); lastBpmChangeRef.current = performance.now();

    function update(dt, now) {
      if (!isActiveRef.current) return;
      const interval = 60000 / bpm;
      if (now - lastBpmChangeRef.current > interval * 8) { const newBpm = 50 + Math.floor(Math.random() * 91); setBpm(newBpm); lastBpmChangeRef.current = now; lastBeatRef.current = now; }
      if (feedbackTimerRef.current > 0) feedbackTimerRef.current -= dt;
    }

    function draw() {
      const now = performance.now(); const dt = Math.min(0.033, (now - lastFrameTime) / 1000); lastFrameTime = now; update(dt, now);
      ctx.fillStyle = isBoxDarkMode ? "#020202" : "#f9fafb"; ctx.fillRect(0, 0, cvs.width, cvs.height);
      ctx.strokeStyle = isBoxDarkMode ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)'; ctx.lineWidth = 1;
      for (let i = 0; i < cvs.width; i += 40) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, cvs.height); ctx.stroke(); }
      const cx = cvs.width / 2; const cy = cvs.height / 2;
      const interval = 60000 / bpm;
      const progress = ((now - lastBeatRef.current) % interval) / interval;
      
      ctx.beginPath(); ctx.arc(cx, cy, 120, 0, Math.PI * 2);
      ctx.strokeStyle = feedbackTimerRef.current > 0 ? feedbackColor : (isBoxDarkMode ? "#1a1a1a" : "#e5e7eb"); ctx.lineWidth = feedbackTimerRef.current > 0 ? 3 : 2; ctx.stroke();
      
      const pulseRadius = 120 * progress;
      ctx.beginPath(); ctx.arc(cx, cy, pulseRadius, 0, Math.PI * 2);
      ctx.strokeStyle = progress > 0.8 ? "#00ff88" : (isBoxDarkMode ? "#333" : "#ccc"); ctx.lineWidth = progress > 0.8 ? 3 : 2; ctx.stroke();
      
      if (progress < 0.08) { ctx.beginPath(); ctx.arc(cx, cy, 8, 0, Math.PI * 2); ctx.fillStyle = "#00ff88"; ctx.fill(); }
      if (feedbackTimerRef.current > 0) { ctx.fillStyle = feedbackColor; ctx.font = "bold 16px monospace"; ctx.textAlign = "center"; ctx.fillText(feedbackMsg, cx, cy + 160); }
      ctx.fillStyle = isBoxDarkMode ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.3)"; ctx.font = "bold 14px monospace"; ctx.textAlign = "center"; ctx.fillText(`${bpm} BPM`, cx, cy - 100);

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
  }, [gameState, isBoxDarkMode, bpm]);

  const startGame = useCallback(() => {
    setGameState('playing'); gameStateRef.current = 'playing';
    setScore(0); setStreak(0); setBpm(60); setTimeLeft(60); setLives(3); setMisses(0); setFeedback('');
    setFeedbackMsg(""); setFeedbackColor("#00ff88"); setPerfectHits(0); setAccuracy(100);
    isActiveRef.current = true; scoreRef.current = 0; streakRef.current = 0; bestStreakRef.current = 0;
    livesRef.current = 3; totalAttemptsRef.current = 0; hitsRef.current = 0; perfectHitsRef.current = 0;
    lastBeatRef.current = performance.now(); lastBpmChangeRef.current = performance.now(); feedbackTimerRef.current = 0;
    showFeedback('60 seconds • Tap on the beat!', 'success');
  }, [showFeedback]);

  const resetGame = useCallback(() => {
    isActiveRef.current = false; if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    if (audioCtxRef.current) { audioCtxRef.current.close(); audioCtxRef.current = null; }
    setGameState('start'); gameStateRef.current = 'start'; setFeedback(''); setFeedbackType('');
  }, []);

  if (loading || !isClient) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50"><div className="text-center"><div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div><p className="text-gray-600">Loading rhythm tap drill...</p></div></div>;
  }

  return (
    <div className={`min-h-screen select-none ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "WebApplication",
        "name": "Rhythm Tap Elite - Timing Accuracy Drill",
        "url": "https://skilldrills.online/drills/motor/timing-accuracy/rhythm-tap",
        "description": "Rhythmic timing drill. Tap in sync with a dynamic BPM pulse (50-140). Perfect hits <40ms, Good hits <80ms. BPM changes every 8 beats. 60-second challenge with 3 lives and streak bonuses.",
        "applicationCategory": "GameApplication", "operatingSystem": "Web",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
        "author": { "@type": "Organization", "name": "Global Drill System" },
        "educationalUse": ["Timing Accuracy", "Rhythm Training", "Beat Synchronization", "Musical Timing"],
        "learningResourceType": "Interactive Exercise", "timeRequired": "PT60S",
        "interactivityType": "active", "inLanguage": "en-US",
        "teaches": ["Beat Matching", "Rhythmic Timing", "Tempo Adaptation", "Timing Precision"]
      })}} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <nav aria-label="Breadcrumb" className="mb-4"><ol className="flex flex-wrap items-center gap-2 text-sm"><li><Link href="/" className={`hover:underline transition-colors ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>Home</Link></li><li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} aria-hidden="true">/</li><li><Link href="/drills/motor" className={`hover:underline transition-colors ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>Motor Drills</Link></li><li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} aria-hidden="true">/</li><li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Timing Accuracy</li><li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} aria-hidden="true">/</li><li className={`font-medium ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} aria-current="page">Rhythm Tap Elite</li></ol></nav>
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3"><div className="p-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex-shrink-0"><Music className="w-6 h-6 text-white" /></div><div><h1 className={`text-2xl sm:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Rhythm Tap Elite</h1><p className={`text-sm sm:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>+1 per hit • 50-140 BPM • 3 lives • 60s challenge</p></div></div>
          <div className="flex gap-2 flex-shrink-0">
            {gameState === 'playing' && <button onClick={resetGame} className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-100'}`} title="Reset" aria-label="Reset rhythm tap drill"><RefreshCw className="w-5 h-5" /></button>}
            <button onClick={() => setIsDarkMode(!isDarkMode)} className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`} aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}>{isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}</button>
            <button onClick={() => setIsBoxDarkMode(!isBoxDarkMode)} className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`} aria-label="Toggle canvas theme"><Eye className="w-5 h-5" /></button>
            <button onClick={() => setSoundEnabled(!soundEnabled)} className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`} aria-label={soundEnabled ? 'Mute sounds' : 'Enable sounds'}>{soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}</button>
            <button onClick={toggleFullscreen} className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`} aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}>{isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}</button>
          </div>
        </div>

        <section className="sr-only"><h2>Rhythm Tap Elite - Timing Accuracy Training</h2><p>Rhythmic timing drill. Tap in sync with a dynamic BPM pulse (50-140 range). Perfect hits within 40ms earn +1 point. Good hits within 80ms earn +1 point. Misses cost 1 life first, then -1pt penalty. BPM changes every 8 beats. 60-second challenge with accuracy and streak tracking.</p></section>

        <div className="grid grid-cols-7 gap-3 mb-4 h-[88px]">
          <StatCard icon={<Target className="text-blue-600" />} value={score} label="Score" isDark={isDarkMode} />
          <StatCard icon={<Trophy className="text-yellow-600" />} value={bestScore} label="Best" isDark={isDarkMode} />
          <StatCard icon={<Timer className={timeLeft <= 10 ? 'text-red-600' : 'text-green-600'} />} value={timeLeft} label="Time" unit="s" isDark={isDarkMode} />
          <StatCard icon={<Heart className={lives === 0 ? 'text-yellow-500' : 'text-red-500'} />} value={lives} label="Lives" isDark={isDarkMode} />
          <StatCard icon={<Zap className="text-orange-600" />} value={streak} label="Streak" isDark={isDarkMode} />
          <StatCard icon={<Music className="text-purple-600" />} value={perfectHits} label="Hits" isDark={isDarkMode} />
          <StatCard icon={<Award className="text-amber-600" />} value={bestStreak} label="Best Streak" isDark={isDarkMode} />
        </div>

        <div className="h-10 mb-2 flex justify-center items-center"><div className={`px-4 py-1.5 rounded-lg text-white font-semibold text-sm transition-all duration-200 ${feedback ? 'opacity-100 scale-100' : 'opacity-0 scale-95'} ${feedbackType === 'success' ? 'bg-green-500' : feedbackType === 'warning' ? 'bg-yellow-500' : 'bg-red-500'}`} role="status" aria-live="polite">{feedback || '\u00A0'}</div></div>

        <div ref={containerRef} className={`relative ${isFullscreen ? 'fixed inset-0 z-50' : 'rounded-xl border-2'}`} style={{ background: isBoxDarkMode ? "#020202" : "#ffffff", aspectRatio: isFullscreen ? 'auto' : '16/9', maxWidth: '100%', margin: '0 auto', borderColor: isDarkMode ? '#374151' : '#e5e7eb', overflow: 'hidden', cursor: 'none' }}>
          {isFullscreen && gameState === 'playing' && (<><div className="absolute top-4 right-4 z-30 flex gap-3"><button onClick={resetGame} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all" aria-label="Reset"><RefreshCw className="w-5 h-5" /></button><button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all" aria-label="Toggle dark mode">{isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}</button><button onClick={() => setIsBoxDarkMode(!isBoxDarkMode)} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all" aria-label="Toggle canvas theme"><Eye className="w-5 h-5" /></button><button onClick={() => setSoundEnabled(!soundEnabled)} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all" aria-label="Toggle sound">{soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}</button><button onClick={toggleFullscreen} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all" aria-label="Exit fullscreen"><Minimize2 className="w-5 h-5" /></button></div><div className="absolute top-4 left-4 z-30 bg-black/50 backdrop-blur-sm rounded-lg px-4 py-2 text-white text-sm">Score: <span className="text-yellow-400 font-bold">{score}</span> | BPM: <span className="text-cyan-400 font-bold">{bpm}</span> | Streak: <span className="text-orange-400 font-bold">{streak}</span></div></>)}
          <canvas ref={canvasRef} style={{ display: 'block', position: 'absolute' }} aria-label="Rhythm tap canvas. Click when the pulse hits the ring." />
          
          {gameState === 'start' && (<div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}><div className={`rounded-2xl p-6 sm:p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}><div className="mb-4"><Music className="w-16 h-16 text-purple-500 mx-auto" aria-hidden="true" /></div><h2 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Rhythm Tap Elite</h2><p className={`mb-2 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>60-second challenge • Tap in sync with the beat • +1pt per hit</p><p className={`mb-6 text-sm ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Click when the expanding pulse reaches the ring. BPM changes every 8 beats. 3 lives protect your score.</p><button onClick={startGame} className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg w-full transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2" aria-label="Start rhythm tap training">Start Training</button></div></div>)}
          
          {gameState === 'gameOver' && (<div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}><div className={`rounded-2xl p-6 sm:p-8 shadow-xl border w-full max-w-[480px] mx-4 ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}><div className="flex items-center justify-center gap-3 mb-4"><Timer className="w-10 h-10 text-orange-500" aria-hidden="true" /><h2 className={`text-2xl font-bold ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Time&apos;s Up!</h2></div><p className={`text-center text-sm mb-6 ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Keep practicing to improve your rhythmic timing accuracy.</p><div className="grid grid-cols-2 gap-3 mb-6"><ResultCard label="Final Score" value={score} icon={<Target className="w-4 h-4" />} color="blue" isDark={isBoxDarkMode} /><ResultCard label="Best Score" value={bestScore} icon={<Trophy className="w-4 h-4" />} color="yellow" isDark={isBoxDarkMode} /><ResultCard label="Best Streak" value={bestStreak} icon={<Zap className="w-4 h-4" />} color="orange" isDark={isBoxDarkMode} /><ResultCard label="Accuracy" value={accuracy} unit="%" icon={<Activity className="w-4 h-4" />} color="purple" isDark={isBoxDarkMode} /><ResultCard label="Hits" value={perfectHits} icon={<Music className="w-4 h-4" />} color="green" isDark={isBoxDarkMode} /><ResultCard label="Misses" value={misses} icon={<X className="w-4 h-4" />} color="red" isDark={isBoxDarkMode} /></div><div className="flex gap-3"><Link href="/drills/motor" className="flex-1"><button className={`w-full px-4 py-2.5 rounded-lg font-semibold transition-all ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>← Back to Motor</button></Link><button onClick={startGame} className="flex-1 px-4 py-2.5 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">Play Again →</button></div></div></div>)}
        </div>

        {!isFullscreen && (<footer className="mt-6" aria-label="Drill rules"><div className={`rounded-xl border overflow-hidden ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}><div className={`px-4 py-3 border-b ${isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'}`}><div className="flex items-center gap-2"><Info className={`w-4 h-4 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} aria-hidden="true" /><h2 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Drill Rules & Scoring</h2></div></div><div className="p-4"><div className="grid grid-cols-1 md:grid-cols-2 gap-4"><div className="space-y-3"><div className="flex items-start gap-2"><div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">1</div><p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}><span className="font-semibold text-purple-500">Click when pulse hits the ring</span></p></div><div className="flex items-start gap-2"><div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">2</div><p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}><span className="font-semibold text-green-500">+1 point per hit</span> (Perfect &lt;40ms / Good &lt;80ms)</p></div><div className="flex items-start gap-2"><div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">3</div><p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}><span className="font-semibold text-red-500">-1 point penalty</span> only when out of lives</p></div></div><div className="space-y-3"><div className="flex items-start gap-2"><div className="w-5 h-5 rounded-full bg-cyan-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">4</div><p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>BPM changes <span className="font-semibold text-cyan-500">every 8 beats</span> (50-140)</p></div><div className="flex items-start gap-2"><div className="w-5 h-5 rounded-full bg-pink-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">5</div><p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}><span className="font-semibold text-pink-500">3 lives protection</span></p></div><div className="flex items-start gap-2"><div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">6</div><p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>5x streak <span className="font-semibold text-yellow-500">bonus notification</span></p></div></div></div><div className={`mt-4 pt-3 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs ${isDarkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'}`}><span>🎵 PERFECT (&lt;40ms) • GOOD (&lt;80ms) • BPM shown above</span><span>⚡ Best Score saves locally</span></div></div></div></footer>)}
      </div>
    </div>
  );
}

function StatCard({ icon, value, label, unit = '', isDark }) { return <div className={`rounded-xl shadow-sm border p-2 sm:p-3 text-center flex flex-col justify-center h-full transition-colors ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}><div className="mb-1 flex justify-center" aria-hidden="true">{icon}</div><p className={`text-lg sm:text-xl font-bold truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>{value}{unit}</p><p className={`text-[10px] sm:text-xs truncate ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{label}</p></div>; }
function ResultCard({ label, value, unit = '', icon, color, isDark }) { const colorMap = { blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-500' }, yellow: { bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', text: 'text-yellow-500' }, orange: { bg: 'bg-orange-500/10', border: 'border-orange-500/30', text: 'text-orange-500' }, green: { bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-500' }, purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-500' }, red: { bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-500' } }; const c = colorMap[color] || colorMap.yellow; return <div className={`flex items-center justify-between p-3 rounded-lg border ${c.bg} ${c.border}`}><div className="flex items-center gap-2 min-w-0"><div className={c.text} aria-hidden="true">{icon}</div><span className={`text-xs sm:text-sm truncate ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{label}</span></div><span className={`font-bold text-base sm:text-lg flex-shrink-0 ml-2 ${c.text}`}>{value}{unit}</span></div>; }