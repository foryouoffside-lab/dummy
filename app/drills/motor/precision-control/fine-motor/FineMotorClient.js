'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  Target, Zap, Clock, Activity, 
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, 
  Eye, Brain, BarChart3, Timer, Trophy, Info, Waves, RefreshCw,
  Crosshair, GraduationCap, Lightbulb, TrendingUp, ArrowRight,
  CheckCircle2, Lock, AlertCircle
} from 'lucide-react';

export default function FineMotorClient() {
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
  const [timeLeft, setTimeLeft] = useState(60);
  const [isLocked, setIsLocked] = useState(false);
  const [scrollSpeed, setScrollSpeed] = useState(180);
  const [currentAmplitude, setCurrentAmplitude] = useState(220);
  const [currentFrequency, setCurrentFrequency] = useState(0.35);
  const [accuracy, setAccuracy] = useState(100);
  const [phase, setPhase] = useState('Dynamic');
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  const pointerLocked = true;
  
  const virtualCrosshair = useRef({ x: 0, y: 0 });
  const crosshairInitRef = useRef(false);
  const pointsRef = useRef([]);
  const scrollPosRef = useRef(0);
  const scrollSpeedRef = useRef(180);
  const currentAmplitudeRef = useRef(220);
  const currentFrequencyRef = useRef(0.35);
  const isLockedRef = useRef(false);
  const startTimeRef = useRef(0);
  const scoreRef = useRef(0);
  const streakRef = useRef(0);
  const bestStreakRef = useRef(0);
  const scoreAccumulatorRef = useRef(0);
  const totalFramesRef = useRef(0);
  const lockedFramesRef = useRef(0);
  const timerIntervalRef = useRef(null);
  const feedbackTimeoutRef = useRef(null);
  const isActiveRef = useRef(false);
  const gameStateRef = useRef('start');
  const audioCtxRef = useRef(null);
  const phaseOffsetRef = useRef(0);
  const flowTimeRef = useRef(0);

  useEffect(() => { setIsClient(true); const t = setTimeout(() => setLoading(false), 300); return () => clearTimeout(t); }, []);
  useEffect(() => { try { const s = localStorage.getItem('fineMotorBest'); if (s) { const p = parseInt(s, 10); if (!isNaN(p)) setBestScore(p); } const st = localStorage.getItem('fineMotorBestStreak'); if (st) { const p = parseInt(st, 10); if (!isNaN(p)) setBestStreak(p); } } catch (e) {} }, []);
  useEffect(() => { gameStateRef.current = gameState; }, [gameState]);

  const updateBestScore = useCallback((fs) => { try { const c = parseInt(localStorage.getItem('fineMotorBest') || '0', 10); if (fs > c) { localStorage.setItem('fineMotorBest', fs.toString()); setBestScore(fs); } } catch (e) {} }, []);
  const showFeedback = useCallback((m, t) => { if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current); setFeedback(m); setFeedbackType(t); feedbackTimeoutRef.current = setTimeout(() => { setFeedback(''); setFeedbackType(''); }, 600); }, []);
  const initAudio = useCallback(() => { try { if (!audioCtxRef.current) audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)(); if (audioCtxRef.current.state === 'suspended') audioCtxRef.current.resume(); return audioCtxRef.current; } catch (e) { return null; } }, []);
  const playSound = useCallback((type) => { if (!soundEnabled) return; try { const ctx = initAudio(); if (!ctx) return; const o = ctx.createOscillator(), g = ctx.createGain(); o.connect(g); g.connect(ctx.destination); const n = ctx.currentTime; o.frequency.setValueAtTime(type === 'lock' ? 880 : 1046.5, n); g.gain.setValueAtTime(type === 'streak' ? 0.12 : 0.03, n); g.gain.exponentialRampToValueAtTime(0.001, n + 0.1); o.start(n); o.stop(n + 0.1); } catch (e) {} }, [soundEnabled, initAudio]);

  const requestPointerLock = useCallback(() => {}, []);
  
  

  

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

  const toggleFullscreen = useCallback(async () => { try { if (!isFullscreen) { const el = containerRef.current; if (el?.requestFullscreen) { await el.requestFullscreen(); setIsFullscreen(true); } } else { if (document.fullscreenElement) await document.exitFullscreen(); setIsFullscreen(false); } } catch (e) {} }, [isFullscreen]);
  useEffect(() => { const h = () => setIsFullscreen(!!document.fullscreenElement); document.addEventListener('fullscreenchange', h); return () => document.removeEventListener('fullscreenchange', h); }, []);

  const updateAccuracy = useCallback(() => { setAccuracy(totalFramesRef.current > 0 ? Math.round((lockedFramesRef.current / totalFramesRef.current) * 100) : 100); }, []);

  const addNewPoint = useCallback((cvs, index) => {
    const points = pointsRef.current;
    const lastP = points.length > 0 ? points[points.length - 1] : { x: cvs.width / 2, y: cvs.height };
    const t = index * 0.12 + phaseOffsetRef.current + flowTimeRef.current * 0.1;
    const wave1 = Math.sin(t * currentFrequencyRef.current) * currentAmplitudeRef.current;
    const wave2 = Math.cos(t * currentFrequencyRef.current * 1.7) * (currentAmplitudeRef.current * 0.4);
    const wave3 = Math.sin(t * currentFrequencyRef.current * 3.2) * (currentAmplitudeRef.current * 0.2);
    const wave4 = Math.cos(t * currentFrequencyRef.current * 0.4) * (currentAmplitudeRef.current * 0.25);
    const wave5 = Math.sin(t * currentFrequencyRef.current * 1.2) * Math.cos(t * 0.8) * (currentAmplitudeRef.current * 0.15);
    points.push({ x: cvs.width / 2 + wave1 + wave2 + wave3 + wave4 + wave5, y: lastP.y - 180 });
  }, []);

  const initPoints = useCallback((cvs) => { pointsRef.current = []; phaseOffsetRef.current = Math.random() * Math.PI * 2; flowTimeRef.current = 0; for (let i = 0; i < 30; i++) addNewPoint(cvs, i); }, [addNewPoint]);

  useEffect(() => {
    if (gameState !== 'playing') return;
    timerIntervalRef.current = setInterval(() => { setTimeLeft(prev => { if (prev <= 1) { setGameState('gameOver'); gameStateRef.current = 'gameOver'; isActiveRef.current = false; if (timerIntervalRef.current) clearInterval(timerIntervalRef.current); updateBestScore(scoreRef.current);  return 0; } return prev - 1; }); }, 1000);
    return () => { if (timerIntervalRef.current) clearInterval(timerIntervalRef.current); };
  }, [gameState, updateBestScore]);

  useEffect(() => {
    if (gameState !== 'playing') return;
    const cvs = canvasRef.current; if (!cvs) return; const ctx = cvs.getContext('2d');
    const updateCanvasSize = () => { const cr = containerRef.current; if (!cr) return; const rr = cr.getBoundingClientRect(); let w = rr.width, h = w * (9 / 16); if (h > rr.height) { h = rr.height; w = h * (16 / 9); } cvs.width = w; cvs.height = h; cvs.style.position = 'absolute'; cvs.style.left = `${(rr.width - w) / 2}px`; cvs.style.top = `${(rr.height - h) / 2}px`; if (!crosshairInitRef.current) virtualCrosshair.current = { x: w / 2, y: h / 2 }; initPoints(cvs); };
    const ro = new ResizeObserver(updateCanvasSize); if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener('resize', updateCanvasSize); updateCanvasSize();
    let lft = performance.now();

    function updateGame(dt) {
      if (!isActiveRef.current) return;
      const elapsed = (performance.now() - startTimeRef.current) / 1000;
      scrollPosRef.current += scrollSpeedRef.current * dt;
      flowTimeRef.current += dt;
      if (elapsed < 30) {
        const pp = elapsed / 30;
        currentAmplitudeRef.current = (200 + pp * 60) + Math.sin(elapsed * 0.6) * 40 + Math.cos(elapsed * 0.4) * 30;
        currentFrequencyRef.current = (0.32 + pp * 0.08) + Math.sin(elapsed * 0.5) * 0.04 + Math.cos(elapsed * 0.7) * 0.03;
        setPhase('Dynamic');
      } else {
        const pp = (elapsed - 30) / 30;
        currentAmplitudeRef.current = (280 + pp * 80) + Math.sin(elapsed * 0.9) * 60 + Math.cos(elapsed * 0.6) * 50 + Math.sin(elapsed * 0.3) * 30;
        currentFrequencyRef.current = (0.42 + pp * 0.15) + Math.sin(elapsed * 0.8) * 0.06 + Math.cos(elapsed * 1.0) * 0.05 + Math.sin(elapsed * 0.5) * 0.03;
        setPhase('Extreme');
      }
      setCurrentAmplitude(Math.floor(currentAmplitudeRef.current)); setCurrentFrequency(currentFrequencyRef.current);
      const points = pointsRef.current;
      if (points[points.length - 1].y + scrollPosRef.current > -200) { phaseOffsetRef.current += 0.015; addNewPoint(cvs, points.length); }
      totalFramesRef.current++;
      let onPath = false;
      const ch = virtualCrosshair.current;
      for (let i = 0; i < points.length - 1; i++) {
        const p1 = { x: points[i].x, y: points[i].y + scrollPosRef.current };
        const p2 = { x: points[i + 1].x, y: points[i + 1].y + scrollPosRef.current };
        if (ch.y >= p2.y && ch.y <= p1.y) { const t = (ch.y - p1.y) / (p2.y - p1.y); if (Math.abs(ch.x - (p1.x + t * (p2.x - p1.x))) <= 7.0) { onPath = true; break; } }
      }
      const wasLocked = isLockedRef.current; isLockedRef.current = onPath; setIsLocked(onPath);
      if (onPath && !wasLocked) playSound('lock');
      if (onPath) { lockedFramesRef.current++; streakRef.current++; setStreak(streakRef.current); if (streakRef.current > bestStreakRef.current) { bestStreakRef.current = streakRef.current; setBestStreak(streakRef.current); try { localStorage.setItem('fineMotorBestStreak', streakRef.current.toString()); } catch (e) {} } scoreAccumulatorRef.current += dt; if (scoreAccumulatorRef.current >= 1.0) { const pts = Math.floor(scoreAccumulatorRef.current); scoreRef.current += pts; setScore(scoreRef.current); scoreAccumulatorRef.current -= pts; if (pts > 0 && Math.random() < 0.3) showFeedback(`+${pts} Focus!`, 'success'); } }
      else { streakRef.current = 0; setStreak(0); scoreAccumulatorRef.current = 0; }
      scrollSpeedRef.current = !isLockedRef.current ? Math.min(900, scrollSpeedRef.current + 4.0) : Math.max(160, scrollSpeedRef.current - 0.35);
      setScrollSpeed(Math.floor(scrollSpeedRef.current));
      if (points[0].y + scrollPosRef.current > cvs.height + 250) points.shift();
      updateAccuracy();
    }

    function draw() {
      const now = performance.now(); const dt = Math.min(0.033, (now - lft) / 1000); lft = now; updateGame(dt);
      ctx.fillStyle = isLockedRef.current ? (isBoxDarkMode ? "#020202" : "#f9fafb") : (isBoxDarkMode ? "#1a0000" : "#fee2e2");
      ctx.fillRect(0, 0, cvs.width, cvs.height); ctx.lineJoin = "round"; ctx.lineCap = "round";
      ctx.beginPath(); ctx.lineWidth = 10;
      ctx.strokeStyle = isLockedRef.current ? (isBoxDarkMode ? "#ffffff" : "#000000") : "#ff2222";
      const pts = pointsRef.current; ctx.moveTo(pts[0].x, pts[0].y + scrollPosRef.current);
      for (let i = 0; i < pts.length - 1; i++) { ctx.quadraticCurveTo(pts[i].x, pts[i].y + scrollPosRef.current, (pts[i].x + pts[i+1].x) / 2, (pts[i].y + pts[i+1].y) / 2 + scrollPosRef.current); }
      ctx.stroke();
      if (isLockedRef.current) { ctx.shadowBlur = 10; ctx.shadowColor = isBoxDarkMode ? "#ffffff" : "#000000"; ctx.stroke(); ctx.shadowBlur = 0; }

      const ch = virtualCrosshair.current;
      if (ch.x > 0 && ch.x < cvs.width && ch.y > 0 && ch.y < cvs.height) {
        const cc = isLockedRef.current ? '#00ff88' : pointerLocked ? '#ffffff' : '#ff4444';
        ctx.beginPath(); ctx.arc(ch.x, ch.y, 10, 0, Math.PI * 2); ctx.strokeStyle = cc; ctx.lineWidth = 2; ctx.stroke();
        ctx.beginPath(); ctx.arc(ch.x, ch.y, 4, 0, Math.PI * 2); ctx.fillStyle = cc; ctx.fill();
        ctx.strokeStyle = isLockedRef.current ? "rgba(0, 255, 136, 0.3)" : "rgba(255, 34, 34, 0.3)"; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(ch.x - 20, ch.y); ctx.lineTo(ch.x - 14, ch.y); ctx.moveTo(ch.x + 14, ch.y); ctx.lineTo(ch.x + 20, ch.y);
        ctx.moveTo(ch.x, ch.y - 20); ctx.lineTo(ch.x, ch.y - 14); ctx.moveTo(ch.x, ch.y + 14); ctx.lineTo(ch.x, ch.y + 20); ctx.stroke();
      }
      animationRef.current = requestAnimationFrame(draw);
    }
    animationRef.current = requestAnimationFrame(draw);
    return () => { if (animationRef.current) cancelAnimationFrame(animationRef.current); window.removeEventListener('resize', updateCanvasSize); ro.disconnect(); };
  }, [gameState, isBoxDarkMode, pointerLocked, updateAccuracy, initPoints, addNewPoint, playSound, showFeedback]);

  const startGame = useCallback(() => {
    try {
      if (typeof window !== 'undefined' && !document.fullscreenElement) {
        if (typeof toggleFullscreen === 'function') toggleFullscreen();
      }
    } catch (err) {}
 if (timerIntervalRef.current) clearInterval(timerIntervalRef.current); setGameState('playing'); gameStateRef.current = 'playing'; setScore(0); setTimeLeft(60); setIsLocked(false); setScrollSpeed(180); setCurrentAmplitude(220); setCurrentFrequency(0.35); setAccuracy(100); setPhase('Dynamic'); setStreak(0); setFeedback(''); isActiveRef.current = true; startTimeRef.current = performance.now(); scrollPosRef.current = 0; scrollSpeedRef.current = 180; currentAmplitudeRef.current = 220; currentFrequencyRef.current = 0.35; isLockedRef.current = false; scoreRef.current = 0; streakRef.current = 0; bestStreakRef.current = 0; scoreAccumulatorRef.current = 0; totalFramesRef.current = 0; lockedFramesRef.current = 0; flowTimeRef.current = 0; crosshairInitRef.current = false; if (canvasRef.current) initPoints(canvasRef.current); setTimeout(() => requestPointerLock(), 200); setTimeout(() => { crosshairInitRef.current = true; }, 400); showFeedback('Stay on the white path! (+5/sec)', 'success'); }, [initPoints, requestPointerLock, showFeedback]);

  const resetGame = useCallback(() => { if (timerIntervalRef.current) clearInterval(timerIntervalRef.current); if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current); isActiveRef.current = false; if (animationRef.current) cancelAnimationFrame(animationRef.current); setGameState('start'); gameStateRef.current = 'start'; setScore(0); setTimeLeft(60); setIsLocked(false); setScrollSpeed(180); setCurrentAmplitude(220); setCurrentFrequency(0.35); setAccuracy(100); setPhase('Dynamic'); setStreak(0); setFeedback(''); crosshairInitRef.current = false;  }, []);

  const sharePage = async () => { if (navigator.share) { try { await navigator.share({ title: 'Fine Motor Control | SkillDrills', text: 'Train precision cursor control with this free motor drill!', url: 'https://skilldrills.online/drills/motor/precision-control/fine-motor' }); } catch (e) {} } else { navigator.clipboard.writeText('https://skilldrills.online/drills/motor/precision-control/fine-motor'); } };
  const copyPageLink = () => { navigator.clipboard.writeText('https://skilldrills.online/drills/motor/precision-control/fine-motor'); };

  useEffect(() => () => { if (animationRef.current) cancelAnimationFrame(animationRef.current); if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);  }, []);

  if (loading || !isClient) return (<div className="min-h-screen flex items-center justify-center bg-gray-50"><div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" /></div>);

  return (
    <div className={`min-h-screen select-none ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!isFullscreen && (<nav className="mb-4"><ol className="flex flex-wrap items-center gap-2 text-sm"><li><Link href="/" className={`hover:underline ${isDarkMode?'text-gray-400 hover:text-gray-200':'text-gray-600 hover:text-gray-900'}`}>Home</Link></li><li className={isDarkMode?'text-gray-500':'text-gray-400'}>/</li><li><Link href="/drills/motor" className={`hover:underline ${isDarkMode?'text-gray-400 hover:text-gray-200':'text-gray-600 hover:text-gray-900'}`}>Motor Drills</Link></li><li className={isDarkMode?'text-gray-500':'text-gray-400'}>/</li><li className={`font-medium ${isDarkMode?'text-blue-400':'text-blue-600'}`}>Calibrated Dynamic Flow</li></ol></nav>)}
        
        {!isFullscreen && (<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6"><div className="flex items-center gap-3"><div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl"><Waves className="w-6 h-6 text-white" /></div><div><h1 className={`text-2xl sm:text-3xl font-bold ${isDarkMode?'text-white':'text-gray-900'}`}>Calibrated Dynamic Flow</h1><p className={`text-sm sm:text-base ${isDarkMode?'text-gray-400':'text-gray-500'}`}>{pointerLocked ? '🟢 Raw input active' : '🔴 Click canvas'} • +1/sec on path • No penalties • 2 phases</p></div></div><div className="flex gap-2">{gameState==='playing'&&<button onClick={resetGame} className={`p-2 rounded-lg border ${isDarkMode?'bg-gray-800 border-gray-700 text-gray-300':'bg-white border-gray-200 text-gray-700'}`}><RefreshCw className="w-5 h-5" /></button>}<button onClick={()=>setIsDarkMode(!isDarkMode)} className={`p-2 rounded-lg border ${isDarkMode?'bg-gray-800 border-gray-700 text-gray-300':'bg-white border-gray-200 text-gray-700'}`}>{isDarkMode?<Sun className="w-5 h-5"/>:<Moon className="w-5 h-5"/>}</button><button onClick={()=>setIsBoxDarkMode(!isBoxDarkMode)} className={`p-2 rounded-lg border ${isDarkMode?'bg-gray-800 border-gray-700 text-gray-300':'bg-white border-gray-200 text-gray-700'}`}><Eye className="w-5 h-5"/></button><button onClick={()=>setSoundEnabled(!soundEnabled)} className={`p-2 rounded-lg border ${isDarkMode?'bg-gray-800 border-gray-700 text-gray-300':'bg-white border-gray-200 text-gray-700'}`}>{soundEnabled?<Volume2 className="w-5 h-5"/>:<VolumeX className="w-5 h-5"/>}</button><button onClick={toggleFullscreen} className={`p-2 rounded-lg border ${isDarkMode?'bg-gray-800 border-gray-700 text-gray-300':'bg-white border-gray-200 text-gray-700'}`}>{isFullscreen?<Minimize2 className="w-5 h-5"/>:<Maximize2 className="w-5 h-5"/>}</button></div></div>)}

        {!isFullscreen && (<div className="grid grid-cols-6 gap-3 mb-4 h-[88px]"><StatCard icon={<Target className="text-blue-600" />} value={score} label="Score" d={isDarkMode} /><StatCard icon={<Trophy className="text-yellow-600" />} value={bestScore} label="Best" d={isDarkMode} /><StatCard icon={<Timer className={timeLeft<=10?'text-red-600':'text-green-600'} />} value={timeLeft} label="Time" unit="s" d={isDarkMode} /><StatCard icon={<Zap className="text-orange-600" />} value={streak} label="Streak" d={isDarkMode} /><StatCard icon={<BarChart3 className="text-purple-600" />} value={accuracy} unit="%" label="Accuracy" d={isDarkMode} /><StatCard icon={<Waves className="text-cyan-600" />} value={phase} label="Phase" d={isDarkMode} /></div>)}

        <div className="h-10 mb-2 flex justify-center items-center"><div className={`px-4 py-1.5 rounded-lg text-white font-semibold text-sm transition-all duration-200 ${feedback?'opacity-100 scale-100':'opacity-0 scale-95'} ${feedbackType==='success'?'bg-green-500':feedbackType==='warning'?'bg-yellow-500':'bg-red-500'}`}>{feedback||'\u00A0'}</div></div>

        <div ref={containerRef} className={`relative ${isFullscreen?'fixed inset-0 z-50':'rounded-xl border-2'}`} style={{background:isBoxDarkMode?"#020202":"#fff",aspectRatio:isFullscreen?'auto':'16/9',maxWidth:'100%',margin:'0 auto',borderColor:isDarkMode?'#374151':'#e5e7eb',overflow:'hidden'}}>
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

          {/* No buttons in fullscreen - user presses ESC to exit */}
          <canvas ref={canvasRef} style={{display:'block',position:'absolute',cursor:'none'}} />
          
          {gameState==='start'&&(<div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm z-40 ${isBoxDarkMode?'bg-gray-900/95':'bg-white/95'}`}><div className={`rounded-2xl p-6 sm:p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode?'bg-gray-800 border-gray-700':'bg-white border-gray-200'}`}><Waves className="w-16 h-16 text-blue-500 mx-auto mb-4" /><h2 className={`text-2xl font-bold mb-2 ${isBoxDarkMode?'text-white':'text-gray-900'}`}>Calibrated Dynamic Flow</h2><p className={`mb-4 ${isBoxDarkMode?'text-gray-300':'text-gray-600'}`}>Raw input • +1/sec on path • No penalties</p><button onClick={startGame} className="px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg w-full">Start Training</button></div></div>)}
          
          {gameState==='gameOver'&&(<div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm z-40 ${isBoxDarkMode?'bg-gray-900/95':'bg-white/95'}`}><div className={`rounded-2xl p-6 sm:p-8 shadow-xl border max-w-[520px] mx-4 ${isBoxDarkMode?'bg-gray-800 border-gray-700':'bg-white border-gray-200'}`}><div className="flex items-center justify-center gap-3 mb-4"><Trophy className="w-10 h-10 text-yellow-500" /><h2 className={`text-2xl font-bold ${isBoxDarkMode?'text-white':'text-gray-900'}`}>Training Complete</h2></div><div className="grid grid-cols-2 gap-3 mb-4"><RC label="Score" v={score} i={<Target className="w-4 h-4" />} c="blue" d={isBoxDarkMode} /><RC label="Best" v={bestScore} i={<Trophy className="w-4 h-4" />} c="yellow" d={isBoxDarkMode} /><RC label="Streak" v={bestStreak} i={<Zap className="w-4 h-4" />} c="orange" d={isBoxDarkMode} /><RC label="Accuracy" v={accuracy} u="%" i={<BarChart3 className="w-4 h-4" />} c="purple" d={isBoxDarkMode} /><RC label="Phase" v={phase} i={<Waves className="w-4 h-4" />} c="cyan" d={isBoxDarkMode} /></div><div className="flex gap-3"><Link href="/drills/motor" className="flex-1"><button className={`w-full px-4 py-2.5 rounded-lg font-semibold ${isDarkMode?'bg-gray-700 text-gray-300':'bg-gray-200 text-gray-700'}`}>← Back</button></Link><button onClick={startGame} className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg font-semibold">Play Again →</button></div></div></div>)}
        </div>

        {/* Drill Rules */}
        {!isFullscreen&&(<footer className="mt-6"><div className={`rounded-xl border overflow-hidden ${isDarkMode?'bg-gray-800 border-gray-700':'bg-white border-gray-200'}`}><div className={`px-4 py-3 border-b ${isDarkMode?'border-gray-700 bg-gray-800/50':'border-gray-200 bg-gray-50'}`}><div className="flex items-center gap-2"><Info className={`w-4 h-4 ${isDarkMode?'text-blue-400':'text-blue-600'}`} /><h2 className={`font-semibold text-lg ${isDarkMode?'text-white':'text-gray-900'}`}>Drill Rules & Professional Features</h2></div></div><div className="p-6"><div className="grid grid-cols-1 md:grid-cols-3 gap-6"><div className="space-y-3"><h3 className={`font-semibold flex items-center gap-2 ${isDarkMode?'text-blue-400':'text-blue-600'}`}><Waves className="w-5 h-5" />How to Play</h3><ul className={`space-y-2 text-sm ${isDarkMode?'text-gray-300':'text-gray-600'}`}><li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">1</span><span>Click <span className="font-semibold text-blue-400">Start Training</span></span></li><li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">2</span><span>Cursor locks for <span className="font-semibold text-blue-400">raw input</span></span></li><li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">3</span><span>Keep crosshair on the <span className="font-semibold text-blue-400">white path</span></span></li><li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">4</span><span>Dynamic → Extreme <span className="font-semibold">phase transition</span></span></li></ul></div><div className="space-y-3"><h3 className={`font-semibold flex items-center gap-2 ${isDarkMode?'text-green-400':'text-green-600'}`}><Trophy className="w-5 h-5" />Scoring</h3><ul className={`space-y-2 text-sm ${isDarkMode?'text-gray-300':'text-gray-600'}`}><li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">+1</span><span><span className="font-semibold text-green-400">On path</span> = +1 pt/sec</span></li><li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">✓</span><span><span className="font-semibold text-blue-400">No penalties</span> - pure practice</span></li><li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">∞</span><span><span className="font-semibold text-purple-400">Speed adapts</span> to performance</span></li><li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">🔥</span><span><span className="font-semibold text-orange-400">Streak</span> tracking</span></li></ul></div><div className="space-y-3"><h3 className={`font-semibold flex items-center gap-2 ${isDarkMode?'text-purple-400':'text-purple-600'}`}><Zap className="w-5 h-5" />Pro Features</h3><ul className={`space-y-2 text-sm ${isDarkMode?'text-gray-300':'text-gray-600'}`}><li className="flex items-start gap-2"><Lock className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" /><span><span className="font-semibold text-green-400">Raw Input</span> - Pointer Lock API</span></li><li className="flex items-start gap-2"><Activity className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" /><span><span className="font-semibold text-blue-400">2 Phases</span> - Dynamic & Extreme</span></li><li className="flex items-start gap-2"><Crosshair className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" /><span><span className="font-semibold text-orange-400">Adaptive</span> crosshair color</span></li></ul></div></div></div></div></footer>)}

        {/* About Section - Preserved */}
        {!isFullscreen && (
          <section className="mt-8" aria-label="About this drill">
            <div className={`rounded-xl border overflow-hidden ${isDarkMode?'bg-gray-800 border-gray-700':'bg-white border-gray-200'}`}><div className={`px-4 py-3 border-b ${isDarkMode?'border-gray-700 bg-gray-800/50':'border-gray-200 bg-gray-50'}`}><div className="flex items-center gap-2"><GraduationCap className={`w-5 h-5 ${isDarkMode?'text-blue-400':'text-blue-600'}`} /><h2 className={`font-semibold ${isDarkMode?'text-white':'text-gray-900'}`}>About This Free Fine Motor Drill</h2></div></div>
              <div className="p-5">
                <p className={`text-sm leading-relaxed mb-5 ${isDarkMode?'text-gray-300':'text-gray-600'}`}>This free fine motor control drill trains precision cursor tracking with raw mouse input via Pointer Lock API. Follow a dynamically scrolling wave path earning +5 points per second while staying on the white path with no penalties. Two phases increase difficulty: Dynamic (0-30s) and Extreme (30-60s). Adaptive scroll speed responds to your performance.</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
                  <div className={`p-4 rounded-xl border ${isDarkMode?'bg-gray-700/50 border-gray-600':'bg-blue-50 border-blue-100'}`}><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center"><GraduationCap className="w-4 h-4 text-white" /></div><h3 className={`text-sm font-semibold ${isDarkMode?'text-white':'text-gray-900'}`}>Who It's For</h3></div><p className={`text-xs leading-relaxed ${isDarkMode?'text-gray-400':'text-gray-500'}`}>Gamers, digital artists, surgeons-in-training, and anyone wanting better cursor precision and steady hand control.</p></div>
                  <div className={`p-4 rounded-xl border ${isDarkMode?'bg-gray-700/50 border-gray-600':'bg-green-50 border-green-100'}`}><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-green-500 flex items-center justify-center"><TrendingUp className="w-4 h-4 text-white" /></div><h3 className={`text-sm font-semibold ${isDarkMode?'text-white':'text-gray-900'}`}>Skills Improved</h3></div><p className={`text-xs leading-relaxed ${isDarkMode?'text-gray-400':'text-gray-500'}`}>Cursor control, smooth movement, path following, fine motor precision, and hand-eye coordination.</p></div>
                  <div className={`p-4 rounded-xl border ${isDarkMode?'bg-gray-700/50 border-gray-600':'bg-purple-50 border-purple-100'}`}><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-purple-500 flex items-center justify-center"><BarChart3 className="w-4 h-4 text-white" /></div><h3 className={`text-sm font-semibold ${isDarkMode?'text-white':'text-gray-900'}`}>What You'll Track</h3></div><p className={`text-xs leading-relaxed ${isDarkMode?'text-gray-400':'text-gray-500'}`}>Score, accuracy percentage, streak duration, current phase, and adaptive scroll speed.</p></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className={`p-4 rounded-xl border ${isDarkMode?'bg-gray-700/50 border-gray-600':'bg-yellow-50 border-yellow-100'}`}><div className="flex items-center gap-2 mb-3"><div className="w-8 h-8 rounded-lg bg-yellow-500 flex items-center justify-center"><Lightbulb className="w-4 h-4 text-white" /></div><h3 className={`text-sm font-semibold ${isDarkMode?'text-white':'text-gray-900'}`}>Why Practice Fine Motor Control?</h3></div><ul className={`text-xs space-y-2 ${isDarkMode?'text-gray-400':'text-gray-600'}`}><li className="flex items-start gap-2"><CheckCircle2 className="w-3 h-3 text-yellow-500 mt-0.5 flex-shrink-0" />Essential for precision mouse work and gaming aim</li><li className="flex items-start gap-2"><CheckCircle2 className="w-3 h-3 text-yellow-500 mt-0.5 flex-shrink-0" />Improves hand-eye coordination and steady movement</li><li className="flex items-start gap-2"><CheckCircle2 className="w-3 h-3 text-yellow-500 mt-0.5 flex-shrink-0" />Builds flow state endurance under increasing difficulty</li></ul></div>
                  <div className={`p-4 rounded-xl border ${isDarkMode?'bg-gray-700/50 border-gray-600':'bg-amber-50 border-amber-100'}`}><div className="flex items-center gap-2 mb-3"><div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center"><Clock className="w-4 h-4 text-white" /></div><h3 className={`text-sm font-semibold ${isDarkMode?'text-white':'text-gray-900'}`}>How to Practice Effectively</h3></div><ol className={`text-xs space-y-2 ${isDarkMode?'text-gray-400':'text-gray-600'}`}><li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-amber-500 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">1</span>Keep eyes on the white path as it scrolls upward</li><li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-amber-500 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">2</span>Use smooth, controlled movements - avoid jerky corrections</li><li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-amber-500 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">3</span>The speed adapts - staying on path slows it down</li><li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-amber-500 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">4</span>Practice 2-3 times daily for best improvement in 1-2 weeks</li></ol></div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Related Drills - Preserved */}
        {!isFullscreen && (
          <section className="mt-8" aria-label="Related drills">
            <div className="flex items-center gap-2 mb-4"><div className="w-1 h-6 rounded-full bg-gradient-to-b from-blue-500 to-indigo-600"></div><h2 className={`text-xl font-bold ${isDarkMode?'text-white':'text-gray-900'}`}>Explore Related Free Drills</h2></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { href: "/drills/motor/precision-control/steady-hand", color: "orange", icon: <Target className="w-4 h-4 text-orange-600" />, cat: "Precision Control", title: "Steady Hand", desc: "Navigate narrow paths without touching the edges with lives system." },
                { href: "/drills/motor/precision-control/tracing", color: "purple", icon: <Brain className="w-4 h-4 text-purple-600" />, cat: "Precision Control", title: "Tracing", desc: "Trace complex shapes with accuracy scoring and difficulty progression." },
                { href: "/drills/motor/hand-eye-coordination/aim-trainer", color: "cyan", icon: <Crosshair className="w-4 h-4 text-cyan-600" />, cat: "Coordination", title: "Aim Trainer", desc: "Click targets quickly and accurately with score tracking and stats." },
                { href: "/drills/motor/hand-eye-coordination/click-accuracy", color: "green", icon: <Target className="w-4 h-4 text-green-600" />, cat: "Coordination", title: "Click Accuracy", desc: "Click precisely on targets of varying sizes with accuracy scoring." },
                { href: "/drills/fps/flick-shot-training", color: "red", icon: <Crosshair className="w-4 h-4 text-red-600" />, cat: "FPS Training", title: "Flick Shot Training", desc: "Improve aim accuracy for FPS games with pro-grade flick training." },
                { href: "/drills/visual/tracking-accuracy/moving-target", color: "teal", icon: <Eye className="w-4 h-4 text-teal-600" />, cat: "Visual Training", title: "Moving Target", desc: "Track and click moving targets with visual pursuit accuracy training." },
                { href: "/drills/motor/timing-accuracy/rhythm-tap", color: "rose", icon: <Zap className="w-4 h-4 text-rose-600" />, cat: "Timing Accuracy", title: "Rhythm Tap", desc: "Tap in rhythm with visual and audio cues for timing precision." },
                { href: "/drills/motor/timing-accuracy/stopwatch-click", color: "indigo", icon: <Timer className="w-4 h-4 text-indigo-600" />, cat: "Timing Accuracy", title: "Stopwatch Click", desc: "Stop the clock exactly at target times with millisecond precision." }
              ].map((d, i) => {
                const cm = { orange:'hover:border-orange-500', purple:'hover:border-purple-500', cyan:'hover:border-cyan-500', green:'hover:border-green-500', red:'hover:border-red-500', teal:'hover:border-teal-500', rose:'hover:border-rose-500', indigo:'hover:border-indigo-500' };
                return (<Link key={i} href={d.href} className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDarkMode ? 'bg-gray-800 border-gray-700 ' + cm[d.color] : 'bg-white border-gray-200 ' + cm[d.color]}`}><div className="p-4"><div className="flex items-center gap-2 mb-2"><div className={`w-8 h-8 rounded-lg bg-${d.color}-100 flex items-center justify-center`}>{d.icon}</div><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isDarkMode?'bg-gray-700 text-gray-400':'bg-gray-100 text-gray-500'}`}>{d.cat}</span></div><h3 className={`font-semibold text-sm mb-1 ${isDarkMode?'text-white group-hover:text-'+d.color+'-400':'text-gray-900 group-hover:text-'+d.color+'-600'} transition-colors`}>{d.title}</h3><p className={`text-xs leading-relaxed ${isDarkMode?'text-gray-500':'text-gray-400'}`}>{d.desc}</p><div className="flex items-center gap-1 mt-3 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Start Drill <ArrowRight className="w-3 h-3" /></div></div></Link>);
              })}
            </div>
          </section>
        )}

        {/* Footer - Preserved */}
        {!isFullscreen && (<footer className="mt-12 bg-gray-900 text-gray-400 rounded-xl py-10 px-6" role="contentinfo"><div className="max-w-7xl mx-auto"><div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 mb-8"><div><h3 className="text-white font-semibold mb-3 text-sm">FPS Training</h3><ul className="space-y-2 text-sm"><li><Link href="/drills/fps/flick-shot-training" className="hover:text-white transition-colors">Flick Shot Trainer</Link></li><li><Link href="/drills/fps/target-acquisition" className="hover:text-white transition-colors">Target Acquisition</Link></li><li><Link href="/drills/fps/reactive-tracking" className="hover:text-white transition-colors">Reactive Tracking</Link></li><li><Link href="/drills/fps" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">All FPS Drills →</Link></li></ul></div><div><h3 className="text-white font-semibold mb-3 text-sm">Cognitive</h3><ul className="space-y-2 text-sm"><li><Link href="/drills/cognitive/memory/card-matching" className="hover:text-white transition-colors">Memory Games</Link></li><li><Link href="/drills/cognitive/attention/divided-attention" className="hover:text-white transition-colors">Attention Drills</Link></li><li><Link href="/drills/cognitive/problem-solving/logic-puzzles" className="hover:text-white transition-colors">Logic Puzzles</Link></li><li><Link href="/drills/cognitive" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">All Cognitive Drills →</Link></li></ul></div><div><h3 className="text-white font-semibold mb-3 text-sm">Academic</h3><ul className="space-y-2 text-sm"><li><Link href="/drills/academic/writing-speed/typing-test" className="hover:text-white transition-colors">Typing Speed Test</Link></li><li><Link href="/drills/academic/reading-speed/speed-reader" className="hover:text-white transition-colors">Speed Reader</Link></li><li><Link href="/drills/academic/math-speed/mental-math" className="hover:text-white transition-colors">Mental Math</Link></li><li><Link href="/drills/academic" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">All Academic Drills →</Link></li></ul></div><div><h3 className="text-white font-semibold mb-3 text-sm">Visual & Motor</h3><ul className="space-y-2 text-sm"><li><Link href="/drills/visual/reaction-speed/light-reaction" className="hover:text-white transition-colors">Reaction Time Test</Link></li><li><Link href="/drills/motor/hand-eye-coordination/aim-trainer" className="hover:text-white transition-colors">Hand-Eye Coordination</Link></li><li><Link href="/drills/visual/tracking-accuracy/moving-target" className="hover:text-white transition-colors">Moving Target</Link></li><li><Link href="/drills/visual" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">All Visual Drills →</Link></li></ul></div><div><h3 className="text-white font-semibold mb-3 text-sm">More</h3><ul className="space-y-2 text-sm"><li><Link href="/drills/memory" className="hover:text-white transition-colors">Memory (15 drills)</Link></li><li><Link href="/drills/productivity" className="hover:text-white transition-colors">Productivity (10 drills)</Link></li><li><Link href="/drills/mental-fitness" className="hover:text-white transition-colors">Mental Fitness (6 drills)</Link></li><li><Link href="/drills/physical" className="hover:text-white transition-colors">Physical (11 drills)</Link></li></ul></div></div><div className="border-t border-gray-800 pt-8 text-center"><div className="flex items-center justify-center gap-3 mb-4"><div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center"><Brain className="w-5 h-5 text-white" /></div><span className="text-white font-bold text-lg">SkillDrills</span></div><p className="text-sm mb-2">&copy; 2026 SkillDrills. All rights reserved.</p><p className="text-xs max-w-2xl mx-auto leading-relaxed mb-6">Free fine motor control drill with raw mouse input. Dynamic wave path tracking with adaptive difficulty.</p><div className="flex items-center justify-center gap-5 flex-wrap"><button onClick={sharePage} className="text-gray-500 hover:text-white transition-colors"><svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/></svg></button><button onClick={copyPageLink} className="text-gray-500 hover:text-white transition-colors"><svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/></svg></button></div></div></div></footer>)}
      </div>
    </div>
  );
}

function StatCard({ icon, value, label, unit = '', d }) { return (<div className={`rounded-xl shadow-sm border p-2 sm:p-3 text-center flex flex-col justify-center h-full ${d?'bg-gray-800 border-gray-700':'bg-white border-gray-100'}`}><div className="mb-1 flex justify-center">{icon}</div><p className={`text-lg sm:text-xl font-bold truncate ${d?'text-white':'text-gray-900'}`}>{value}{unit}</p><p className={`text-[10px] sm:text-xs truncate ${d?'text-gray-400':'text-gray-500'}`}>{label}</p></div>); }
function RC({ label, v, unit = '', i, c, d }) { const m = { blue:'bg-blue-500/10 border-blue-500/30 text-blue-500', yellow:'bg-yellow-500/10 border-yellow-500/30 text-yellow-500', orange:'bg-orange-500/10 border-orange-500/30 text-orange-500', purple:'bg-purple-500/10 border-purple-500/30 text-purple-500', cyan:'bg-cyan-500/10 border-cyan-500/30 text-cyan-500' }; const o = m[c] || m.blue; const [bg, border, text] = o.split(' '); return (<div className={`flex items-center justify-between p-3 rounded-lg border ${bg} ${border}`}><div className="flex items-center gap-2"><div className={text}>{i}</div><span className={`text-xs sm:text-sm ${d?'text-gray-300':'text-gray-600'}`}>{label}</span></div><span className={`font-bold text-base sm:text-lg ${text}`}>{v}{unit}</span></div>); }