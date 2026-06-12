'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  Target, Zap, Clock, Activity, 
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, 
  Eye, Focus, Brain, Trophy, Info, Timer, AlertCircle, RefreshCw,
  Crosshair, GraduationCap, Lightbulb, TrendingUp, ArrowRight,
  Calculator, CheckCircle2, BarChart3, Star, Share2, Copy,
  Lock
} from 'lucide-react';

export default function DeepWorkLabClient() {
  const [showRotateWarning, setShowRotateWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState("Rotate Your Device");

  useEffect(() => {
    const checkSize = () => {
      if (typeof window === 'undefined') return;
      const ua = navigator.userAgent || '';
      const isMobile = /Mobi|Android|iPhone|iPad|iPod|Windows Phone/i.test(ua) || 
                       (navigator.maxTouchPoints > 0 && 
                        window.screen && Math.max(window.screen.width, window.screen.height) < 1024);
      if (!isMobile) {
        setShowRotateWarning(false);
        return;
      }
      const isPortrait = window.innerHeight > window.innerWidth;
      if (isPortrait) {
        if (window.innerWidth < 768) {
          setShowRotateWarning(true);
          setWarningMessage("Rotate Your Device");
          return;
        }
      } else {
        if (window.innerHeight < 320) {
          setShowRotateWarning(true);
          setWarningMessage("Screen height too small. Try entering Fullscreen mode.");
          return;
        }
      }
      setShowRotateWarning(false);
    };
    checkSize();
    window.addEventListener('resize', checkSize);
    window.addEventListener('orientationchange', checkSize);
    return () => {
      window.removeEventListener('resize', checkSize);
      window.removeEventListener('orientationchange', checkSize);
    };
  }, []);

  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const containerRef = useRef(null);
  const [gameState, setGameState] = useState('start');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isBoxDarkMode, setIsBoxDarkMode] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [focusMeter, setFocusMeter] = useState(100);
  const [bestFocus, setBestFocus] = useState(100);
  const [timeLeft, setTimeLeft] = useState(60);
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  const [mistakes, setMistakes] = useState(0);
  const pointerLocked = true;
  
  const virtualCrosshair = useRef({ x: 0, y: 0 });
  const crosshairInitRef = useRef(false);
  const canvasSizeRef = useRef({ width: 0, height: 0 });
  const zoneRef = useRef({ x: 0, y: 0, r: 35, vx: 130, vy: 130 });
  const focusMeterRef = useRef(100);
  const totalFramesRef = useRef(0);
  const focusFramesRef = useRef(0);
  const timerIntervalRef = useRef(null);
  const feedbackTimeoutRef = useRef(null);
  const isActiveRef = useRef(false);
  const gameStateRef = useRef('start');
  const audioCtxRef = useRef(null);
  const focusTimerRef = useRef(0);
  const scoreRef = useRef(0);
  const mistakesRef = useRef(0);
  const bestFocusRef = useRef(100);

  useEffect(() => { setIsClient(true); const t = setTimeout(() => setLoading(false), 300); return () => clearTimeout(t); }, []);
  useEffect(() => { try { const s = localStorage.getItem('deepWorkBestScore'); if (s) setBestScore(parseInt(s, 10)); const f = localStorage.getItem('deepWorkBestFocus'); if (f) { const p = parseInt(f, 10); setBestFocus(p); bestFocusRef.current = p; } } catch (e) {} }, []);
  useEffect(() => { gameStateRef.current = gameState; }, [gameState]);

  const updateBestScore = useCallback((fs) => { try { const c = parseInt(localStorage.getItem('deepWorkBestScore') || '0', 10); if (fs > c) { localStorage.setItem('deepWorkBestScore', fs.toString()); setBestScore(fs); } } catch (e) {} }, []);
  
  const showFeedback = useCallback((m, t) => { if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current); setFeedback(m); setFeedbackType(t); feedbackTimeoutRef.current = setTimeout(() => { setFeedback(''); setFeedbackType(''); }, 800); }, []);
  const initAudio = useCallback(() => { try { if (!audioCtxRef.current) audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)(); if (audioCtxRef.current.state === 'suspended') audioCtxRef.current.resume(); return audioCtxRef.current; } catch (e) { return null; } }, []);
  const playSound = useCallback((type) => { if (!soundEnabled) return; try { const a = initAudio(); if (!a) return; const o = a.createOscillator(), g = a.createGain(); o.connect(g); g.connect(a.destination); const n = a.currentTime; const f = { focus: 880, distracted: 440, penalty: 330 }; o.frequency.setValueAtTime(f[type] || 660, n); g.gain.setValueAtTime(type === 'penalty' ? 0.1 : 0.08, n); g.gain.exponentialRampToValueAtTime(0.001, n + 0.12); o.start(n); o.stop(n + 0.12); } catch (e) {} }, [soundEnabled, initAudio]);

  // Pointer Lock
  const requestPointerLock = useCallback(() => {}, []);
  
  

  

  // Raw input
  useEffect(() => {
    const h = (e) => {
      const c = canvasRef.current;
      if (!c) return;
      const rect = c.getBoundingClientRect();
      const clientX = e.touches && e.touches[0] ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches && e.touches[0] ? e.touches[0].clientY : e.clientY;
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      const scaleX = c.width / c.clientWidth;
      const scaleY = c.height / c.clientHeight;
      virtualCrosshair.current = {
        x: Math.max(0, Math.min(c.width, x * scaleX)),
        y: Math.max(0, Math.min(c.height, y * scaleY))
      };
    };
    document.addEventListener('mousemove', h);
    document.addEventListener('touchmove', h, { passive: true });
    document.addEventListener('touchstart', h, { passive: true });
    return () => {
      document.removeEventListener('mousemove', h);
      document.removeEventListener('touchmove', h);
      document.removeEventListener('touchstart', h);
    };
  }, []);

  const toggleFullscreen = useCallback(async () => { try { if (!isFullscreen) { const e = containerRef.current; if (e?.requestFullscreen) { await e.requestFullscreen(); setIsFullscreen(true); } } else { if (document.fullscreenElement) await document.exitFullscreen(); setIsFullscreen(false); } } catch (e) {} }, [isFullscreen]);
  useEffect(() => { const h = () => setIsFullscreen(!!document.fullscreenElement); document.addEventListener('fullscreenchange', h); return () => document.removeEventListener('fullscreenchange', h); }, []);

  const applyPenalty = useCallback(() => { if (!isActiveRef.current) return; mistakesRef.current++; setMistakes(mistakesRef.current); scoreRef.current = Math.max(0, scoreRef.current - 1); setScore(scoreRef.current); playSound('penalty'); showFeedback(`⚠️ Distraction! -1 point`, 'error'); updateBestScore(scoreRef.current); }, [playSound, showFeedback, updateBestScore]);

  const init = useCallback((cvs) => { if (cvs) { zoneRef.current.x = cvs.width / 2; zoneRef.current.y = cvs.height / 2; zoneRef.current.vx = 130; zoneRef.current.vy = 130; } }, []);

  const update = useCallback((dt, cvs) => {
    if (!cvs || !isActiveRef.current || !crosshairInitRef.current) return;
    const zone = zoneRef.current;
    const ch = virtualCrosshair.current;
    zone.x += zone.vx * dt; zone.y += zone.vy * dt;
    const pad = 100;
    if (zone.x < pad || zone.x > cvs.width - pad) zone.vx *= -1;
    if (zone.y < pad || zone.y > cvs.height - pad) zone.vy *= -1;
    zone.vx += (Math.random() - 0.5) * 20; zone.vy += (Math.random() - 0.5) * 20;
    const speed = Math.hypot(zone.vx, zone.vy);
    if (speed > 350) { zone.vx *= 0.95; zone.vy *= 0.95; }
    
    const dist = Math.hypot(ch.x - zone.x, ch.y - zone.y);
    totalFramesRef.current++;
    
    if (dist < zone.r) {
      focusFramesRef.current++;
      const wasLow = focusMeterRef.current < 25;
      focusMeterRef.current = Math.min(100, focusMeterRef.current + 10 * dt);
      focusTimerRef.current += dt;
      if (focusTimerRef.current >= 1.0) {
        const pts = Math.floor(focusTimerRef.current);
        scoreRef.current += pts; setScore(scoreRef.current);
        focusTimerRef.current -= pts;
        updateBestScore(scoreRef.current);
        if (pts > 0) showFeedback(`+${pts} Focus Point${pts > 1 ? 's' : ''}!`, 'success');
      }
      if (focusMeterRef.current > 25 && wasLow) showFeedback('✓ Focus restored', 'success');
      if (Math.random() < 0.005 && focusMeterRef.current > 50) playSound('focus');
    } else {
      const wasAbove = focusMeterRef.current >= 25;
      focusMeterRef.current = Math.max(0, focusMeterRef.current - 30 * dt);
      if (focusTimerRef.current >= 1.0) {
        const penalties = Math.floor(focusTimerRef.current);
        for (let i = 0; i < penalties; i++) applyPenalty();
        focusTimerRef.current -= penalties;
      } else { focusTimerRef.current = 0; }
      if (focusMeterRef.current < 25 && wasAbove) playSound('distracted');
    }
    setFocusMeter(Math.floor(focusMeterRef.current));
    if (focusMeterRef.current > bestFocusRef.current) { bestFocusRef.current = Math.floor(focusMeterRef.current); setBestFocus(bestFocusRef.current); try { localStorage.setItem('deepWorkBestFocus', bestFocusRef.current.toString()); } catch (e) {} }
  }, [applyPenalty, playSound, showFeedback, updateBestScore]);

  // Timer
  useEffect(() => {
    if (gameState !== 'playing') return;
    timerIntervalRef.current = setInterval(() => { setTimeLeft(prev => { if (prev <= 1) { setGameState('gameOver'); gameStateRef.current = 'gameOver'; isActiveRef.current = false; if (timerIntervalRef.current) { clearInterval(timerIntervalRef.current); timerIntervalRef.current = null; } updateBestScore(scoreRef.current);  return 0; } return prev - 1; }); }, 1000);
    return () => { if (timerIntervalRef.current) { clearInterval(timerIntervalRef.current); timerIntervalRef.current = null; } };
  }, [gameState, updateBestScore]);

  // Render loop
  useEffect(() => {
    if (gameState !== 'playing') return;
    const cvs = canvasRef.current; if (!cvs) return; const ctx = cvs.getContext('2d');
    const updateCanvasSize = () => {
      const cont = containerRef.current; if (!cont) return;
      const cr = cont.getBoundingClientRect();
      let w = cr.width, h = w * (9 / 16);
      if (h > cr.height) { h = cr.height; w = h * (16 / 9); }
      cvs.width = w; cvs.height = h; canvasSizeRef.current = { width: w, height: h };
      cvs.style.position = 'absolute'; cvs.style.left = `${(cr.width - w) / 2}px`; cvs.style.top = `${(cr.height - h) / 2}px`;
      if (!crosshairInitRef.current) virtualCrosshair.current = { x: w / 2, y: h / 2 };
      init(cvs);
    };
    const ro = new ResizeObserver(updateCanvasSize); if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener('resize', updateCanvasSize); updateCanvasSize();
    
    let lft = performance.now();
    const draw = () => {
      const now = performance.now();
      const dt = Math.min(0.033, (now - lft) / 1000); lft = now;
      update(dt, cvs);
      
      ctx.fillStyle = isBoxDarkMode ? "#020202" : "#f9fafb"; ctx.fillRect(0, 0, cvs.width, cvs.height);
      ctx.strokeStyle = isBoxDarkMode ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)'; ctx.lineWidth = 1;
      for (let i = 0; i < cvs.width; i += 40) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, cvs.height); ctx.stroke(); }
      
      const zone = zoneRef.current;
      ctx.beginPath(); ctx.arc(zone.x, zone.y, zone.r, 0, Math.PI * 2);
      ctx.lineWidth = 3;
      ctx.strokeStyle = focusMeterRef.current < 25 ? "#FF3E3E" : "#00ff88"; ctx.stroke();
      if (focusMeterRef.current > 70) {
        ctx.beginPath(); ctx.arc(zone.x, zone.y, zone.r + 4, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(0, 255, 136, 0.3)"; ctx.stroke();
      }
      
      // Focus meter
      const mW = 200, mH = 3, mX = cvs.width / 2 - mW / 2, mY = 50;
      ctx.fillStyle = isBoxDarkMode ? "#1a1a1a" : "#e5e7eb"; ctx.fillRect(mX, mY, mW, mH);
      ctx.fillStyle = focusMeterRef.current < 25 ? "#FF3E3E" : "#00ff88";
      ctx.fillRect(mX, mY, (focusMeterRef.current / 100) * mW, mH);
      ctx.fillStyle = isBoxDarkMode ? "#666" : "#aaa"; ctx.font = "11px monospace"; ctx.textAlign = "center";
      ctx.fillText(`${Math.floor(focusMeterRef.current)}%`, cvs.width / 2, mY - 6);
      
      // Professional crosshair
      const ch = virtualCrosshair.current;
      if (ch.x > 0 && ch.x < cvs.width && ch.y > 0 && ch.y < cvs.height) {
        const dist = Math.hypot(ch.x - zone.x, ch.y - zone.y);
        const tracking = dist < zone.r;
        const cc = tracking ? '#00ff88' : focusMeterRef.current < 25 ? '#FF3E3E' : pointerLocked ? '#ffffff' : '#ff4444';
        
        ctx.strokeStyle = cc; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.arc(ch.x, ch.y, 12, 0, Math.PI * 2); ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(ch.x - 24, ch.y); ctx.lineTo(ch.x - 10, ch.y);
        ctx.moveTo(ch.x + 10, ch.y); ctx.lineTo(ch.x + 24, ch.y);
        ctx.moveTo(ch.x, ch.y - 24); ctx.lineTo(ch.x, ch.y - 10);
        ctx.moveTo(ch.x, ch.y + 10); ctx.lineTo(ch.x, ch.y + 24);
        ctx.stroke();
        ctx.fillStyle = cc; ctx.beginPath(); ctx.arc(ch.x, ch.y, 3, 0, Math.PI * 2); ctx.fill();
        
        // Connection line when tracking
        if (tracking) {
          ctx.beginPath(); ctx.moveTo(ch.x, ch.y); ctx.lineTo(zone.x, zone.y);
          ctx.strokeStyle = 'rgba(0, 255, 136, 0.15)'; ctx.lineWidth = 1; ctx.stroke();
        }
      }
      animationRef.current = requestAnimationFrame(draw);
    };
    animationRef.current = requestAnimationFrame(draw);
    return () => { if (animationRef.current) cancelAnimationFrame(animationRef.current); window.removeEventListener('resize', updateCanvasSize); ro.disconnect(); };
  }, [gameState, isBoxDarkMode, pointerLocked, init, update]);

  const startGame = useCallback(() => {
    try {
      if (typeof window !== 'undefined' && !document.fullscreenElement) {
        if (typeof toggleFullscreen === 'function') toggleFullscreen();
      }
    } catch (err) {}

    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    setGameState('playing'); gameStateRef.current = 'playing';
    setScore(0); setFocusMeter(100); setBestFocus(100); setTimeLeft(60); setFeedback(''); setMistakes(0);
    isActiveRef.current = true; focusMeterRef.current = 100; bestFocusRef.current = 100;
    totalFramesRef.current = 0; focusFramesRef.current = 0; focusTimerRef.current = 0;
    scoreRef.current = 0; mistakesRef.current = 0;
    crosshairInitRef.current = false;
    if (canvasRef.current) { zoneRef.current.x = canvasRef.current.width / 2; zoneRef.current.y = canvasRef.current.height / 2; zoneRef.current.vx = 130; zoneRef.current.vy = 130; }
    setTimeout(() => requestPointerLock(), 200);
    setTimeout(() => { crosshairInitRef.current = true; }, 400);
    showFeedback('Track the ring to maintain focus!', 'success');
  }, [requestPointerLock, showFeedback]);

  const resetGame = useCallback(() => {
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    isActiveRef.current = false; setGameState('start'); gameStateRef.current = 'start';
    setScore(0); setFocusMeter(100); setBestFocus(100); setTimeLeft(60); setFeedback(''); setMistakes(0);
    focusMeterRef.current = 100; bestFocusRef.current = 100; totalFramesRef.current = 0;
    focusFramesRef.current = 0; focusTimerRef.current = 0; scoreRef.current = 0; mistakesRef.current = 0;
    crosshairInitRef.current = false; 
  }, []);

  const sharePage = async () => { if (navigator.share) { try { await navigator.share({ title: 'Deep Work Focus Training | SkillDrills', text: 'Train sustained attention with this free focus drill!', url: 'https://skilldrills.online/drills/productivity/focus-endurance/deep-work' }); } catch (e) {} } else { navigator.clipboard.writeText('https://skilldrills.online/drills/productivity/focus-endurance/deep-work'); } };
  const copyPageLink = () => { navigator.clipboard.writeText('https://skilldrills.online/drills/productivity/focus-endurance/deep-work'); };

  useEffect(() => () => { if (animationRef.current) cancelAnimationFrame(animationRef.current); if (timerIntervalRef.current) clearInterval(timerIntervalRef.current); if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);  }, []);

  if (loading || !isClient) return (<div className="min-h-screen flex items-center justify-center bg-gray-50"><div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" /></div>);

  return (
    <div className={`min-h-screen select-none ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!isFullscreen && (
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex flex-wrap items-center gap-2 text-sm">
              <li><Link href="/" className={`hover:underline ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>Home</Link></li>
              <li className={isDarkMode ? 'text-gray-500' : 'text-gray-400'}>/</li>
              <li><Link href="/drills/productivity" className={`hover:underline ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>Productivity</Link></li>
              <li className={isDarkMode ? 'text-gray-500' : 'text-gray-400'}>/</li>
              <li className={`font-medium ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>Deep Work Trainer</li>
            </ol>
          </nav>
        )}

        {!isFullscreen && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl"><Focus className="w-6 h-6 text-white" /></div>
              <div>
                <h1 className={`text-2xl sm:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Deep Work Trainer</h1>
                <p className={`text-sm sm:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{pointerLocked ? '🟢 Raw input active' : '🔴 Click canvas'} • +1pt/sec focus • -1pt distraction</p>
              </div>
            </div>
            <div className="flex gap-2">
              {gameState === 'playing' && (<button onClick={resetGame} className={`p-2 rounded-lg border ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-100'}`}><RefreshCw className="w-5 h-5" /></button>)}
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
            <StatCard icon={<Activity className="text-green-600" />} value={focusMeter} label="Focus" unit="%" d={isDarkMode} />
            <StatCard icon={<Trophy className="text-purple-600" />} value={bestFocus} label="Peak" unit="%" d={isDarkMode} />
            <StatCard icon={<AlertCircle className="text-red-500" />} value={mistakes} label="Distractions" d={isDarkMode} />
          </div>
        )}

        <div className="h-10 mb-2 flex justify-center items-center">
          <div className={`px-4 py-1.5 rounded-lg text-white font-semibold text-sm transition-all duration-200 ${feedback ? 'opacity-100 scale-100' : 'opacity-0 scale-95'} ${feedbackType === 'success' ? 'bg-green-500' : feedbackType === 'warning' ? 'bg-yellow-500' : 'bg-red-500'}`}>{feedback || '\u00A0'}</div>
        </div>

        <div ref={containerRef} className={`relative ${isFullscreen ? 'fixed inset-0 z-50' : 'rounded-xl border-2'}`} style={{ background: isBoxDarkMode ? "#020202" : "#fff", aspectRatio: isFullscreen ? 'auto' : '16/9', maxWidth: '100%', margin: '0 auto', borderColor: isDarkMode ? '#374151' : '#e5e7eb', overflow: 'hidden' }}>
          {/* Mobile Rotate Device Warning Overlay */}
      {showRotateWarning && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-gray-950/95 text-center p-6" aria-hidden="true">
          <div className="animate-bounce mb-4 text-blue-500">
            <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-white mb-2">{warningMessage}</h3>
          <p className="text-sm text-gray-400">Please use landscape orientation or fullscreen mode for the best training experience.</p>
        </div>
      )}

         {isFullscreen && gameState === 'playing' && (<div className="absolute top-4 right-4 z-20 opacity-0 pointer-events-none"><button onClick={toggleFullscreen} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70"><Minimize2 className="w-5 h-5" /></button></div>)}8
          <canvas ref={canvasRef} style={{ display: 'block', position: 'absolute', cursor: 'none' }} />

          {gameState === 'start' && (
            <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
              <div className={`rounded-2xl p-6 sm:p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <Focus className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                <h2 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Deep Work Trainer</h2>
                <p className={`mb-4 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Raw input • +1pt/sec focus • 60s challenge</p>
                <div className={`mb-6 p-3 rounded-lg border ${isBoxDarkMode ? 'border-yellow-600 bg-yellow-900/20' : 'border-yellow-200 bg-yellow-50'}`}>
                  
                  <p className={`text-xs ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Track the ring. ESC to unlock. Click canvas to re-lock.</p>
                </div>
                <button onClick={startGame} className="px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg w-full">Start Training</button>
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
                  <RC label="Peak Focus" v={bestFocus} u="%" i={<Activity className="w-4 h-4" />} c="emerald" d={isBoxDarkMode} />
                  <RC label="Distractions" v={mistakes} i={<AlertCircle className="w-4 h-4" />} c="red" d={isBoxDarkMode} />
                </div>
                <div className="flex gap-3">
                  <Link href="/drills/productivity" className="flex-1"><button className={`w-full px-4 py-2.5 rounded-lg font-semibold ${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'}`}>← Back</button></Link>
                  <button onClick={startGame} className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg font-semibold">Play Again →</button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Drill Rules */}
        {!isFullscreen && (
          <footer className="mt-6">
            <div className={`rounded-xl border overflow-hidden ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <div className={`px-4 py-3 border-b ${isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'}`}>
                <div className="flex items-center gap-2"><Info className={`w-4 h-4 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} /><h2 className={`font-semibold text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Drill Rules & Professional Features</h2></div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-3">
                    <h3 className={`font-semibold flex items-center gap-2 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}><Focus className="w-5 h-5" />How to Play</h3>
                    <ul className={`space-y-2 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      <li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">1</span><span>Click <span className="font-semibold text-blue-400">Start Training</span></span></li>
                      <li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">2</span><span>Cursor locks for <span className="font-semibold text-blue-400">raw input</span></span></li>
                      <li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">3</span><span>Keep crosshair <span className="font-semibold text-blue-400">inside the ring</span></span></li>
                      <li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">4</span><span>Glow at <span className="font-semibold">70%+ focus</span></span></li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h3 className={`font-semibold flex items-center gap-2 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}><Trophy className="w-5 h-5" />Scoring</h3>
                    <ul className={`space-y-2 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      <li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">+1</span><span><span className="font-semibold text-green-400">Focus</span> = +1 pt/sec inside</span></li>
                      <li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">-1</span><span><span className="font-semibold text-red-400">Distraction</span> = -1 pt/sec outside</span></li>
                      <li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">🔴</span><span><span className="font-semibold text-orange-400">Below 25%</span> ring turns red</span></li>
                      <li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">🟢</span><span><span className="font-semibold text-purple-400">70%+</span> glow effect</span></li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h3 className={`font-semibold flex items-center gap-2 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`}><Zap className="w-5 h-5" />Pro Features</h3>
                    <ul className={`space-y-2 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      <li className="flex items-start gap-2"><Lock className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" /><span><span className="font-semibold text-green-400">Raw Input</span> - Pointer Lock API</span></li>
                      <li className="flex items-start gap-2"><Activity className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" /><span><span className="font-semibold text-blue-400">Focus meter</span> - Real-time tracking</span></li>
                      <li className="flex items-start gap-2"><Crosshair className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" /><span><span className="font-semibold text-orange-400">Adaptive</span> crosshair color</span></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        )}

        {/* About Section - Preserved */}
        {!isFullscreen && (
          <section className="mt-8" aria-label="About this drill">
            <div className={`rounded-xl border overflow-hidden ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <div className={`px-4 py-3 border-b ${isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'}`}><div className="flex items-center gap-2"><GraduationCap className={`w-5 h-5 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} /><h2 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>About This Free Deep Work Drill</h2></div></div>
              <div className="p-5">
                <p className={`text-sm leading-relaxed mb-5 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>This free deep work drill trains sustained attention with raw mouse input via Pointer Lock API. Keep your crosshair inside the moving green ring to earn points and build focus. Letting it drift outside triggers distraction penalties. Perfect for improving concentration, flow state, and cognitive endurance for work, study, and productivity.</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
                  <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-blue-50 border-blue-100'}`}><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center"><GraduationCap className="w-4 h-4 text-white" /></div><h3 className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Who It's For</h3></div><p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Knowledge workers, students, programmers, writers, and anyone wanting to improve sustained attention and deep work capacity.</p></div>
                  <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-green-50 border-green-100'}`}><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-green-500 flex items-center justify-center"><TrendingUp className="w-4 h-4 text-white" /></div><h3 className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Skills Improved</h3></div><p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Sustained attention, distraction resistance, flow state entry, focus endurance, and cognitive stamina.</p></div>
                  <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-purple-50 border-purple-100'}`}><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-purple-500 flex items-center justify-center"><BarChart3 className="w-4 h-4 text-white" /></div><h3 className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>What You'll Track</h3></div><p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Score, peak focus percentage, distraction count, and real-time focus meter with visual feedback.</p></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-yellow-50 border-yellow-100'}`}><div className="flex items-center gap-2 mb-3"><div className="w-8 h-8 rounded-lg bg-yellow-500 flex items-center justify-center"><Lightbulb className="w-4 h-4 text-white" /></div><h3 className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Why Practice Deep Work?</h3></div><ul className={`text-xs space-y-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}><li className="flex items-start gap-2"><CheckCircle2 className="w-3 h-3 text-yellow-500 mt-0.5 flex-shrink-0" />Improves ability to enter flow state faster</li><li className="flex items-start gap-2"><CheckCircle2 className="w-3 h-3 text-yellow-500 mt-0.5 flex-shrink-0" />Builds resistance to digital distractions</li><li className="flex items-start gap-2"><CheckCircle2 className="w-3 h-3 text-yellow-500 mt-0.5 flex-shrink-0" />Increases productive output in less time</li></ul></div>
                  <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-amber-50 border-amber-100'}`}><div className="flex items-center gap-2 mb-3"><div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center"><Clock className="w-4 h-4 text-white" /></div><h3 className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>How to Practice Effectively</h3></div><ol className={`text-xs space-y-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}><li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-amber-500 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">1</span>Keep your eyes on the ring, not the cursor</li><li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-amber-500 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">2</span>Aim for 70%+ focus to activate glow effect</li><li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-amber-500 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">3</span>Practice 2-3 times daily before deep work sessions</li><li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-amber-500 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">4</span>Track peak focus improvement over multiple sessions</li></ol></div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Related Drills - Preserved */}
        {!isFullscreen && (
          <section className="mt-8" aria-label="Related drills">
            <div className="flex items-center gap-2 mb-4"><div className="w-1 h-6 rounded-full bg-gradient-to-b from-blue-500 to-indigo-600"></div><h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Explore Related Free Drills</h2></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { href: "/drills/productivity/focus-endurance/concentration-stamina", color: "blue", icon: <Brain className="w-4 h-4 text-blue-600" />, cat: "Focus Endurance", title: "Concentration Stamina", desc: "Build long-duration focus with progressive attention challenges." },
                { href: "/drills/productivity/focus-endurance/flow-state", color: "purple", icon: <Zap className="w-4 h-4 text-purple-600" />, cat: "Focus Endurance", title: "Flow State", desc: "Enter and maintain optimal performance flow state." },
                { href: "/drills/productivity/time-management/pomodoro-timer", color: "red", icon: <Timer className="w-4 h-4 text-red-600" />, cat: "Time Management", title: "Pomodoro Timer", desc: "Classic 25-minute focus sessions with 5-minute breaks." },
                { href: "/drills/cognitive/focus/concentration-grid", color: "teal", icon: <Target className="w-4 h-4 text-teal-600" />, cat: "Focus", title: "Concentration Grid", desc: "Find numbers in sequence under time pressure." },
                { href: "/drills/cognitive/attention/sustained-attention", color: "orange", icon: <Eye className="w-4 h-4 text-orange-600" />, cat: "Attention", title: "Sustained Attention", desc: "Maintain focus on a single task for extended periods." },
                { href: "/drills/academic/writing-speed/typing-test", color: "rose", icon: <Star className="w-4 h-4 text-rose-600" />, cat: "Writing Speed", title: "Typing Speed Test", desc: "WPM test with 30 quotes across Easy/Medium/Hard levels." },
                { href: "/drills/academic/math-speed/mental-math", color: "emerald", icon: <Calculator className="w-4 h-4 text-emerald-600" />, cat: "Math Speed", title: "Mental Math", desc: "Advanced mental calculation with 3 difficulty tiers." },
                { href: "/drills/memory/working-memory/n-back", color: "cyan", icon: <Brain className="w-4 h-4 text-cyan-600" />, cat: "Working Memory", title: "N-Back", desc: "Classic dual n-back working memory training." }
              ].map((d, i) => {
                const cm = { blue: 'hover:border-blue-500', purple: 'hover:border-purple-500', red: 'hover:border-red-500', teal: 'hover:border-teal-500', orange: 'hover:border-orange-500', rose: 'hover:border-rose-500', emerald: 'hover:border-emerald-500', cyan: 'hover:border-cyan-500' };
                return (
                  <Link key={i} href={d.href} className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDarkMode ? 'bg-gray-800 border-gray-700 ' + cm[d.color] : 'bg-white border-gray-200 ' + cm[d.color]}`}>
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-2"><div className={`w-8 h-8 rounded-lg bg-${d.color}-100 flex items-center justify-center`}>{d.icon}</div><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>{d.cat}</span></div>
                      <h3 className={`font-semibold text-sm mb-1 ${isDarkMode ? 'text-white group-hover:text-' + d.color + '-400' : 'text-gray-900 group-hover:text-' + d.color + '-600'} transition-colors`}>{d.title}</h3>
                      <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>{d.desc}</p>
                      <div className="flex items-center gap-1 mt-3 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Start Drill <ArrowRight className="w-3 h-3" /></div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* Footer - Preserved */}
        {!isFullscreen && (
          <footer className="mt-12 bg-gray-900 text-gray-400 rounded-xl py-10 px-6" role="contentinfo">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 mb-8">
                <div><h3 className="text-white font-semibold mb-3 text-sm">FPS Training</h3><ul className="space-y-2 text-sm"><li><Link href="/drills/fps/flick-shot-training" className="hover:text-white transition-colors">Flick Shot Trainer</Link></li><li><Link href="/drills/fps/target-acquisition" className="hover:text-white transition-colors">Target Acquisition</Link></li><li><Link href="/drills/fps/reactive-tracking" className="hover:text-white transition-colors">Reactive Tracking</Link></li><li><Link href="/drills/fps" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">All FPS Drills →</Link></li></ul></div>
                <div><h3 className="text-white font-semibold mb-3 text-sm">Cognitive</h3><ul className="space-y-2 text-sm"><li><Link href="/drills/cognitive/memory/card-matching" className="hover:text-white transition-colors">Memory Games</Link></li><li><Link href="/drills/cognitive/attention/divided-attention" className="hover:text-white transition-colors">Attention Drills</Link></li><li><Link href="/drills/cognitive/problem-solving/logic-puzzles" className="hover:text-white transition-colors">Logic Puzzles</Link></li><li><Link href="/drills/cognitive" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">All Cognitive Drills →</Link></li></ul></div>
                <div><h3 className="text-white font-semibold mb-3 text-sm">Academic</h3><ul className="space-y-2 text-sm"><li><Link href="/drills/academic/writing-speed/typing-test" className="hover:text-white transition-colors">Typing Speed Test</Link></li><li><Link href="/drills/academic/reading-speed/speed-reader" className="hover:text-white transition-colors">Speed Reader</Link></li><li><Link href="/drills/academic/math-speed/mental-math" className="hover:text-white transition-colors">Mental Math</Link></li><li><Link href="/drills/academic" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">All Academic Drills →</Link></li></ul></div>
                <div><h3 className="text-white font-semibold mb-3 text-sm">Visual & Motor</h3><ul className="space-y-2 text-sm"><li><Link href="/drills/visual/reaction-speed/light-reaction" className="hover:text-white transition-colors">Reaction Time Test</Link></li><li><Link href="/drills/motor/hand-eye-coordination/aim-trainer" className="hover:text-white transition-colors">Hand-Eye Coordination</Link></li><li><Link href="/drills/visual/tracking-accuracy/moving-target" className="hover:text-white transition-colors">Moving Target Tracking</Link></li><li><Link href="/drills/visual" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">All Visual Drills →</Link></li></ul></div>
                <div><h3 className="text-white font-semibold mb-3 text-sm">More</h3><ul className="space-y-2 text-sm"><li><Link href="/drills/memory" className="hover:text-white transition-colors">Memory (15 drills)</Link></li><li><Link href="/drills/productivity" className="hover:text-white transition-colors">Productivity (10 drills)</Link></li><li><Link href="/drills/mental-fitness" className="hover:text-white transition-colors">Mental Fitness (6 drills)</Link></li><li><Link href="/drills/physical" className="hover:text-white transition-colors">Physical (11 drills)</Link></li></ul></div>
              </div>
              <div className="border-t border-gray-800 pt-8 text-center">
                <div className="flex items-center justify-center gap-3 mb-4"><div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center"><Brain className="w-5 h-5 text-white" /></div><span className="text-white font-bold text-lg">SkillDrills</span></div>
                <p className="text-sm mb-2">&copy; 2026 SkillDrills. All rights reserved.</p>
                <p className="text-xs max-w-2xl mx-auto leading-relaxed mb-6">Free online deep work focus training with raw mouse input via Pointer Lock API. Track a moving ring to build sustained attention and flow state.</p>
                <div className="flex items-center justify-center gap-5 flex-wrap">
                  <button onClick={sharePage} className="text-gray-500 hover:text-white transition-colors"><Share2 className="w-5 h-5" /></button>
                  <button onClick={copyPageLink} className="text-gray-500 hover:text-white transition-colors"><Copy className="w-5 h-5" /></button>
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
function RC({ label, v, unit = '', i, c, d }) { const m = { blue:'bg-blue-500/10 border-blue-500/30 text-blue-500', yellow:'bg-yellow-500/10 border-yellow-500/30 text-yellow-500', emerald:'bg-emerald-500/10 border-emerald-500/30 text-emerald-500', red:'bg-red-500/10 border-red-500/30 text-red-500' }; const o = m[c] || m.blue; const [bg, border, text] = o.split(' '); return (<div className={`flex items-center justify-between p-3 rounded-lg border ${bg} ${border}`}><div className="flex items-center gap-2"><div className={text}>{i}</div><span className={`text-xs sm:text-sm ${d ? 'text-gray-300' : 'text-gray-600'}`}>{label}</span></div><span className={`font-bold text-base sm:text-lg ${text}`}>{v}{unit}</span></div>); }