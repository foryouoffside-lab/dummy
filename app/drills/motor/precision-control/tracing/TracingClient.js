'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  Sun, Moon, Maximize2, Minimize2, Eye, 
  Volume2, VolumeX, Activity, Target, Timer, Zap, 
  Info, Trophy, RefreshCw,
  Crosshair, GraduationCap, Lightbulb, TrendingUp, Clock, ArrowRight,
  Brain, BarChart3, CheckCircle2, Lock, AlertCircle
} from 'lucide-react';

export default function TracingClient() {
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
  const [flowState, setFlowState] = useState(100);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  const [pointerLocked, setPointerLocked] = useState(false);
  
  const virtualCrosshair = useRef({ x: 0, y: 0 });
  const crosshairInitRef = useRef(false);
  const tolerance = 45;
  const speed = 4.2;
  let points = [];
  let offset = 0;
  let isStopped = false;
  let globalTime = 0;
  
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

  useEffect(() => { setIsClient(true); const t = setTimeout(() => setLoading(false), 300); return () => clearTimeout(t); }, []);
  useEffect(() => { try { const s = localStorage.getItem('tracingBest'); if (s) { const p = parseInt(s, 10); if (!isNaN(p)) setBestScore(p); } } catch (e) {} }, []);
  useEffect(() => { gameStateRef.current = gameState; }, [gameState]);

  const updateBestScore = useCallback((fs) => { try { const c = parseInt(localStorage.getItem('tracingBest') || '0', 10); if (fs > c) { localStorage.setItem('tracingBest', fs.toString()); setBestScore(fs); } } catch (e) {} }, []);
  const showFeedback = useCallback((m, t) => { if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current); setFeedback(m); setFeedbackType(t); feedbackTimeoutRef.current = setTimeout(() => { setFeedback(''); setFeedbackType(''); }, 500); }, []);

  // Pointer Lock
  const requestPointerLock = useCallback(() => { canvasRef.current?.requestPointerLock(); }, []);
  
  useEffect(() => {
    const h = () => { const l = document.pointerLockElement === canvasRef.current; setPointerLocked(l); if (l) crosshairInitRef.current = true; else if (gameState === 'playing') showFeedback('Cursor unlocked - Click canvas', 'error'); };
    document.addEventListener('pointerlockchange', h);
    document.addEventListener('pointerlockerror', () => showFeedback('Lock failed', 'error'));
    return () => { document.removeEventListener('pointerlockchange', h); };
  }, [gameState, showFeedback]);

  useEffect(() => { const c = canvasRef.current; if (!c) return; const h = () => { if (gameState === 'playing' && !pointerLocked) requestPointerLock(); }; c.addEventListener('click', h); return () => c.removeEventListener('click', h); }, [gameState, pointerLocked, requestPointerLock]);

  useEffect(() => {
    const h = (e) => { if (document.pointerLockElement !== canvasRef.current) return; virtualCrosshair.current.x += e.movementX || 0; virtualCrosshair.current.y += e.movementY || 0; const c = canvasRef.current; if (c) { virtualCrosshair.current.x = Math.max(0, Math.min(c.width, virtualCrosshair.current.x)); virtualCrosshair.current.y = Math.max(0, Math.min(c.height, virtualCrosshair.current.y)); } };
    document.addEventListener('mousemove', h);
    return () => document.removeEventListener('mousemove', h);
  }, []);

  const toggleFullscreen = useCallback(async () => { try { if (!isFullscreen) { const el = containerRef.current; if (el?.requestFullscreen) { await el.requestFullscreen(); setIsFullscreen(true); } } else { if (document.fullscreenElement) await document.exitFullscreen(); setIsFullscreen(false); } } catch (e) {} }, [isFullscreen]);
  useEffect(() => { const h = () => setIsFullscreen(!!document.fullscreenElement); document.addEventListener('fullscreenchange', h); return () => document.removeEventListener('fullscreenchange', h); }, []);

  // Timer
  useEffect(() => {
    if (gameState !== 'playing') return;
    timerIntervalRef.current = setInterval(() => { setTimeLeft(prev => { if (prev <= 1) { setGameState('gameOver'); gameStateRef.current = 'gameOver'; isActiveRef.current = false; if (timerIntervalRef.current) clearInterval(timerIntervalRef.current); updateBestScore(scoreRef.current); document.exitPointerLock(); return 0; } return prev - 1; }); }, 1000);
    return () => { if (timerIntervalRef.current) clearInterval(timerIntervalRef.current); };
  }, [gameState, updateBestScore]);

  function getY(x, cvsHeight) { const xPos = (x + offset) * 0.004; const phase = (globalTime % 12); if (phase < 6) return (cvsHeight / 2) + Math.sin(xPos * 8.0) * 110 + Math.sin(xPos * 18.5) * 25; else return (cvsHeight / 2) + Math.sin(xPos * 2.2) * 160; }

  // Render loop
  useEffect(() => {
    if (gameState !== 'playing') return;
    const cvs = canvasRef.current; if (!cvs) return;
    const ctx = cvs.getContext('2d', { alpha: false, desynchronized: true });
    const updateCanvasSize = () => { const cr = containerRef.current; if (!cr) return; const rr = cr.getBoundingClientRect(); let w = rr.width, h = w * (9 / 16); if (h > rr.height) { h = rr.height; w = h * (16 / 9); } cvs.width = w; cvs.height = h; cvs.style.position = 'absolute'; cvs.style.left = `${(rr.width - w) / 2}px`; cvs.style.top = `${(rr.height - h) / 2}px`; if (!crosshairInitRef.current) virtualCrosshair.current = { x: w / 2, y: h / 2 }; points = []; for (let i = 0; i < cvs.width; i++) points[i] = getY(i, cvs.height); };
    const ro = new ResizeObserver(updateCanvasSize); if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener('resize', updateCanvasSize); updateCanvasSize();
    offset = 0; isStopped = false; globalTime = 0;
    let lft = performance.now();
    
    function updateGame(dt, cvs) {
      if (!isActiveRef.current) return;
      const ch = virtualCrosshair.current;
      const mouseIdx = Math.floor(ch.x);
      const targetY = (mouseIdx >= 0 && mouseIdx < points.length) ? points[mouseIdx] : cvs.height / 2;
      const distFromWave = Math.abs(ch.y - targetY);
      if (distFromWave < tolerance) { flowRef.current = Math.min(100, flowRef.current + 5 * dt); streakRef.current++; setStreak(streakRef.current); if (streakRef.current > bestStreakRef.current) { bestStreakRef.current = streakRef.current; setBestStreak(streakRef.current); } focusTimerRef.current += dt; if (focusTimerRef.current >= 1.0) { const pts = Math.floor(focusTimerRef.current); scoreRef.current += pts; setScore(scoreRef.current); focusTimerRef.current -= pts; if (pts > 0) showFeedback(`+${pts} Flow!`, 'success'); } distractionTimerRef.current = 0; }
      else { flowRef.current = Math.max(0, flowRef.current - 15 * dt); streakRef.current = 0; setStreak(0); distractionTimerRef.current += dt; focusTimerRef.current = 0; }
      setFlowState(Math.floor(flowRef.current));
      if (isStopped) { if (distFromWave < tolerance) isStopped = false; return; }
      offset += speed; globalTime += dt; points.shift(); points.push(getY(cvs.width + offset, cvs.height));
      if (distFromWave > tolerance) { isStopped = true; showFeedback('⚠️ Lost Wave!', 'warning'); }
    }
    
    function draw() { const now = performance.now(); const dt = Math.min(0.033, (now - lft) / 1000); lft = now; updateGame(dt, cvs);
      ctx.fillStyle = isBoxDarkMode ? "#020202" : "#f9fafb"; ctx.fillRect(0, 0, cvs.width, cvs.height);
      ctx.strokeStyle = isBoxDarkMode ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)'; ctx.lineWidth = 1;
      for (let i = 0; i < cvs.width; i += 40) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, cvs.height); ctx.stroke(); }
      ctx.beginPath(); ctx.lineWidth = 2; ctx.lineJoin = "round"; ctx.strokeStyle = isStopped ? "#FF3E3E" : "#FF0000";
      ctx.moveTo(0, points[0]); for (let i = 1; i < points.length; i += 2) ctx.lineTo(i, points[i]); ctx.stroke();
      
      // Original crosshair style preserved
      const ch = virtualCrosshair.current;
      if (ch.x > 0 && ch.x < cvs.width && ch.y > 0 && ch.y < cvs.height) {
        ctx.beginPath(); ctx.arc(ch.x, ch.y, 8, 0, Math.PI * 2); ctx.fillStyle = isStopped ? "#666" : "#00ff88"; ctx.fill();
        ctx.strokeStyle = isBoxDarkMode ? "#444" : "#ccc"; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.moveTo(ch.x - 18, ch.y); ctx.lineTo(ch.x + 18, ch.y); ctx.moveTo(ch.x, ch.y - 18); ctx.lineTo(ch.x, ch.y + 18); ctx.stroke();
        if (!isStopped) { ctx.beginPath(); ctx.arc(ch.x, ch.y, 14, 0, Math.PI * 2); ctx.strokeStyle = "#00ff88"; ctx.lineWidth = 1.5; ctx.stroke(); }
      }
      animationRef.current = requestAnimationFrame(draw);
    }
    draw();
    return () => { if (animationRef.current) cancelAnimationFrame(animationRef.current); window.removeEventListener('resize', updateCanvasSize); ro.disconnect(); };
  }, [gameState, isBoxDarkMode, pointerLocked, showFeedback]);

  const startGame = useCallback(() => {
    try {
      if (typeof window !== 'undefined' && !document.fullscreenElement) {
        if (typeof toggleFullscreen === 'function') toggleFullscreen();
      }
    } catch (err) {}
 if (timerIntervalRef.current) clearInterval(timerIntervalRef.current); setGameState('playing'); gameStateRef.current = 'playing'; setScore(0); setTimeLeft(60); setFlowState(100); setStreak(0); setBestStreak(0); setFeedback(''); isActiveRef.current = true; scoreRef.current = 0; streakRef.current = 0; bestStreakRef.current = 0; flowRef.current = 100; focusTimerRef.current = 0; distractionTimerRef.current = 0; crosshairInitRef.current = false; setTimeout(() => requestPointerLock(), 200); setTimeout(() => { crosshairInitRef.current = true; }, 400); }, [requestPointerLock]);

  const resetGame = useCallback(() => { if (animationRef.current) cancelAnimationFrame(animationRef.current); if (timerIntervalRef.current) clearInterval(timerIntervalRef.current); if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current); isActiveRef.current = false; setGameState('start'); gameStateRef.current = 'start'; setScore(0); setTimeLeft(60); setFlowState(100); setStreak(0); setBestStreak(0); setFeedback(''); crosshairInitRef.current = false; document.exitPointerLock(); }, []);

  const sharePage = async () => { if (navigator.share) { try { await navigator.share({ title: 'Wave Tracing | SkillDrills', text: 'Follow the red wave filament with your cursor.', url: 'https://skilldrills.online/drills/motor/precision-control/tracing' }); } catch (e) {} } else { navigator.clipboard.writeText('https://skilldrills.online/drills/motor/precision-control/tracing'); } };
  const copyPageLink = () => { navigator.clipboard.writeText('https://skilldrills.online/drills/motor/precision-control/tracing'); };

  useEffect(() => () => { if (animationRef.current) cancelAnimationFrame(animationRef.current); if (timerIntervalRef.current) clearInterval(timerIntervalRef.current); document.exitPointerLock(); }, []);

  if (loading || !isClient) return (<div className="min-h-screen flex items-center justify-center bg-gray-50"><div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto" /></div>);

  return (
    <div className={`min-h-screen select-none ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!isFullscreen && (<nav className="mb-4"><ol className="flex flex-wrap items-center gap-2 text-sm"><li><Link href="/" className={`hover:underline ${isDarkMode?'text-gray-400 hover:text-gray-200':'text-gray-600 hover:text-gray-900'}`}>Home</Link></li><li className={isDarkMode?'text-gray-500':'text-gray-400'}>/</li><li><Link href="/drills/motor" className={`hover:underline ${isDarkMode?'text-gray-400 hover:text-gray-200':'text-gray-600 hover:text-gray-900'}`}>Motor Drills</Link></li><li className={isDarkMode?'text-gray-500':'text-gray-400'}>/</li><li className={`font-medium ${isDarkMode?'text-red-400':'text-red-600'}`}>Wave Tracing</li></ol></nav>)}
        
        {!isFullscreen && (<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6"><div className="flex items-center gap-3"><div className="p-3 bg-gradient-to-r from-red-500 to-rose-600 rounded-xl"><Activity className="w-6 h-6 text-white" /></div><div><h1 className={`text-2xl sm:text-3xl font-bold ${isDarkMode?'text-white':'text-gray-900'}`}>Wave Tracing Trainer</h1><p className={`text-sm sm:text-base ${isDarkMode?'text-gray-400':'text-gray-500'}`}>{pointerLocked ? '🟢 Raw input active' : '🔴 Click canvas'} • +1/sec on wave • 45px tolerance</p></div></div><div className="flex gap-2">{gameState==='playing'&&<button onClick={resetGame} className={`p-2 rounded-lg border ${isDarkMode?'bg-gray-800 border-gray-700 text-gray-300':'bg-white border-gray-200 text-gray-700'}`}><RefreshCw className="w-5 h-5" /></button>}<button onClick={()=>setIsDarkMode(!isDarkMode)} className={`p-2 rounded-lg border ${isDarkMode?'bg-gray-800 border-gray-700 text-gray-300':'bg-white border-gray-200 text-gray-700'}`}>{isDarkMode?<Sun className="w-5 h-5"/>:<Moon className="w-5 h-5"/>}</button><button onClick={()=>setIsBoxDarkMode(!isBoxDarkMode)} className={`p-2 rounded-lg border ${isDarkMode?'bg-gray-800 border-gray-700 text-gray-300':'bg-white border-gray-200 text-gray-700'}`}><Eye className="w-5 h-5"/></button><button onClick={()=>setSoundEnabled(!soundEnabled)} className={`p-2 rounded-lg border ${isDarkMode?'bg-gray-800 border-gray-700 text-gray-300':'bg-white border-gray-200 text-gray-700'}`}>{soundEnabled?<Volume2 className="w-5 h-5"/>:<VolumeX className="w-5 h-5"/>}</button><button onClick={toggleFullscreen} className={`p-2 rounded-lg border ${isDarkMode?'bg-gray-800 border-gray-700 text-gray-300':'bg-white border-gray-200 text-gray-700'}`}>{isFullscreen?<Minimize2 className="w-5 h-5"/>:<Maximize2 className="w-5 h-5"/>}</button><button onClick={pointerLocked?()=>document.exitPointerLock():requestPointerLock} className={`p-2 rounded-lg border ${pointerLocked?'bg-green-500 border-green-600 text-white':isDarkMode?'bg-gray-800 border-gray-700 text-gray-300':'bg-white border-gray-200 text-gray-700'}`}><Lock className="w-5 h-5"/></button></div></div>)}

        {!isFullscreen && (<div className="grid grid-cols-5 gap-3 mb-4 h-[88px]"><StatCard icon={<Target className="text-blue-600" />} value={score} label="Flow Score" d={isDarkMode} /><StatCard icon={<Trophy className="text-yellow-500" />} value={bestScore} label="Best" d={isDarkMode} /><StatCard icon={<Timer className={timeLeft<15?'text-red-600':'text-green-600'} />} value={timeLeft} label="Time" unit="s" d={isDarkMode} /><StatCard icon={<Activity className="text-green-600" />} value={flowState} label="Flow" unit="%" d={isDarkMode} /><StatCard icon={<Zap className="text-orange-500" />} value={streak} label="Streak" d={isDarkMode} /></div>)}

        <div className="h-10 mb-2 flex justify-center items-center"><div className={`px-4 py-1.5 rounded-lg text-white font-semibold text-sm transition-all duration-200 ${feedback?'opacity-100 scale-100':'opacity-0 scale-95'} ${feedbackType==='success'?'bg-green-500':feedbackType==='warning'?'bg-yellow-500':'bg-red-500'}`}>{feedback||'\u00A0'}</div></div>

        <div ref={containerRef} className={`relative ${isFullscreen?'fixed inset-0 z-50':'rounded-xl border-2'}`} style={{background:isBoxDarkMode?"#020202":"#fff",aspectRatio:isFullscreen?'auto':'16/9',maxWidth:'100%',margin:'0 auto',borderColor:isDarkMode?'#374151':'#e5e7eb',overflow:'hidden'}}>
          {/* Mobile Rotate Device Warning Overlay */}
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-gray-950/95 text-center p-6 md:hidden portrait:flex landscape:hidden" aria-hidden="true">
            <div className="animate-bounce mb-4 text-blue-500">
              <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Rotate Your Device</h3>
            <p className="text-sm text-gray-400">Please rotate your device to landscape orientation for the best training experience.</p>
          </div>

          {isFullscreen&&gameState==='playing'&&(<div className="absolute top-4 right-4 z-20 opacity-0 pointer-events-none"><button onClick={toggleFullscreen} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70"><Minimize2 className="w-5 h-5"/></button></div>)}
          <canvas ref={canvasRef} style={{display:'block',position:'absolute',cursor:'none'}} />
          
          {gameState==='start'&&(<div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm z-40 ${isBoxDarkMode?'bg-gray-900/95':'bg-white/95'}`}><div className={`rounded-2xl p-6 sm:p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode?'bg-gray-800 border-gray-700':'bg-white border-gray-200'}`}><Activity className="w-16 h-16 text-red-500 mx-auto mb-4" /><h2 className={`text-2xl font-bold mb-2 ${isBoxDarkMode?'text-white':'text-gray-900'}`}>Wave Tracing Trainer</h2><p className={`mb-4 ${isBoxDarkMode?'text-gray-300':'text-gray-600'}`}>Raw input • +1/sec on wave • 45px tolerance</p><div className={`mb-6 p-3 rounded-lg border ${isBoxDarkMode?'border-yellow-600 bg-yellow-900/20':'border-yellow-200 bg-yellow-50'}`}><div className="flex items-center gap-2 mb-2"><AlertCircle className="w-4 h-4 text-yellow-500" /><p className={`text-sm font-medium ${isBoxDarkMode?'text-yellow-400':'text-yellow-700'}`}>Raw Input via Pointer Lock</p></div><p className={`text-xs ${isBoxDarkMode?'text-gray-400':'text-gray-600'}`}>Follow the red wave. ESC to unlock. Click canvas to re-lock.</p></div><button onClick={startGame} className="px-8 py-3 bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-xl font-semibold hover:shadow-lg w-full">Start Training</button></div></div>)}
          
          {gameState==='gameOver'&&(<div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm z-40 ${isBoxDarkMode?'bg-gray-900/95':'bg-white/95'}`}><div className={`rounded-2xl p-6 sm:p-8 shadow-xl border max-w-[520px] mx-4 ${isBoxDarkMode?'bg-gray-800 border-gray-700':'bg-white border-gray-200'}`}><div className="flex items-center justify-center gap-3 mb-4"><Trophy className="w-10 h-10 text-yellow-500" /><h2 className={`text-2xl font-bold ${isBoxDarkMode?'text-white':'text-gray-900'}`}>Training Complete</h2></div><div className="grid grid-cols-2 gap-3 mb-4"><RC label="Score" v={score} i={<Target className="w-4 h-4" />} c="blue" d={isBoxDarkMode} /><RC label="Best" v={bestScore} i={<Trophy className="w-4 h-4" />} c="yellow" d={isBoxDarkMode} /><RC label="Streak" v={bestStreak} i={<Zap className="w-4 h-4" />} c="orange" d={isBoxDarkMode} /><RC label="Peak Flow" v={flowState} u="%" i={<Activity className="w-4 h-4" />} c="green" d={isBoxDarkMode} /></div><div className="flex gap-3"><Link href="/drills/motor" className="flex-1"><button className={`w-full px-4 py-2.5 rounded-lg font-semibold ${isDarkMode?'bg-gray-700 text-gray-300':'bg-gray-200 text-gray-700'}`}>← Back</button></Link><button onClick={startGame} className="flex-1 px-4 py-2.5 bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-lg font-semibold">Play Again →</button></div></div></div>)}
        </div>

        {/* Drill Rules */}
        {!isFullscreen&&(<footer className="mt-6"><div className={`rounded-xl border overflow-hidden ${isDarkMode?'bg-gray-800 border-gray-700':'bg-white border-gray-200'}`}><div className={`px-4 py-3 border-b ${isDarkMode?'border-gray-700 bg-gray-800/50':'border-gray-200 bg-gray-50'}`}><div className="flex items-center gap-2"><Info className={`w-4 h-4 ${isDarkMode?'text-red-400':'text-red-600'}`} /><h2 className={`font-semibold text-lg ${isDarkMode?'text-white':'text-gray-900'}`}>Drill Rules & Professional Features</h2></div></div><div className="p-6"><div className="grid grid-cols-1 md:grid-cols-3 gap-6"><div className="space-y-3"><h3 className={`font-semibold flex items-center gap-2 ${isDarkMode?'text-red-400':'text-red-600'}`}><Activity className="w-5 h-5" />How to Play</h3><ul className={`space-y-2 text-sm ${isDarkMode?'text-gray-300':'text-gray-600'}`}><li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">1</span><span>Click <span className="font-semibold text-red-400">Start Training</span></span></li><li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">2</span><span>Cursor locks for <span className="font-semibold text-red-400">raw input</span></span></li><li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">3</span><span>Follow the <span className="font-semibold text-red-400">red wave</span></span></li><li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">4</span><span>Wave <span className="font-semibold">auto-pauses/resumes</span></span></li></ul></div><div className="space-y-3"><h3 className={`font-semibold flex items-center gap-2 ${isDarkMode?'text-blue-400':'text-blue-600'}`}><Trophy className="w-5 h-5" />Scoring</h3><ul className={`space-y-2 text-sm ${isDarkMode?'text-gray-300':'text-gray-600'}`}><li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">+1</span><span><span className="font-semibold text-blue-400">On wave</span> = +1 pt/sec</span></li><li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">✓</span><span><span className="font-semibold text-green-400">No penalties</span> - pure practice</span></li><li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">🔥</span><span><span className="font-semibold text-purple-400">Streak</span> tracking</span></li><li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">🌊</span><span><span className="font-semibold text-orange-400">2 modes</span> - Pulse & Harmonic</span></li></ul></div><div className="space-y-3"><h3 className={`font-semibold flex items-center gap-2 ${isDarkMode?'text-purple-400':'text-purple-600'}`}><Zap className="w-5 h-5" />Pro Features</h3><ul className={`space-y-2 text-sm ${isDarkMode?'text-gray-300':'text-gray-600'}`}><li className="flex items-start gap-2"><Lock className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" /><span><span className="font-semibold text-green-400">Raw Input</span> - Pointer Lock API</span></li><li className="flex items-start gap-2"><Activity className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" /><span><span className="font-semibold text-blue-400">Flow meter</span> - Real-time tracking</span></li><li className="flex items-start gap-2"><Crosshair className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" /><span><span className="font-semibold text-orange-400">45px</span> tolerance zone</span></li></ul></div></div></div></div></footer>)}

        {/* About Section - Preserved */}
        {!isFullscreen && (
          <section className="mt-8" aria-label="About this drill">
            <div className={`rounded-xl border overflow-hidden ${isDarkMode?'bg-gray-800 border-gray-700':'bg-white border-gray-200'}`}><div className={`px-4 py-3 border-b ${isDarkMode?'border-gray-700 bg-gray-800/50':'border-gray-200 bg-gray-50'}`}><div className="flex items-center gap-2"><GraduationCap className={`w-5 h-5 ${isDarkMode?'text-red-400':'text-red-600'}`} /><h2 className={`font-semibold ${isDarkMode?'text-white':'text-gray-900'}`}>About This Free Wave Tracing Drill</h2></div></div>
              <div className="p-5">
                <p className={`text-sm leading-relaxed mb-5 ${isDarkMode?'text-gray-300':'text-gray-600'}`}>This free wave tracing drill trains smooth cursor tracking with raw mouse input via Pointer Lock API. Follow a dynamic red wave filament staying within 45px to earn points and build flow. The wave auto-pauses when you leave and resumes when you return. Two waveform modes alternate automatically.</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
                  <div className={`p-4 rounded-xl border ${isDarkMode?'bg-gray-700/50 border-gray-600':'bg-red-50 border-red-100'}`}><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-red-500 flex items-center justify-center"><GraduationCap className="w-4 h-4 text-white" /></div><h3 className={`text-sm font-semibold ${isDarkMode?'text-white':'text-gray-900'}`}>Who It's For</h3></div><p className={`text-xs leading-relaxed ${isDarkMode?'text-gray-400':'text-gray-500'}`}>Gamers, digital artists, anyone wanting smoother mouse control and better hand-eye coordination.</p></div>
                  <div className={`p-4 rounded-xl border ${isDarkMode?'bg-gray-700/50 border-gray-600':'bg-green-50 border-green-100'}`}><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-green-500 flex items-center justify-center"><TrendingUp className="w-4 h-4 text-white" /></div><h3 className={`text-sm font-semibold ${isDarkMode?'text-white':'text-gray-900'}`}>Skills Improved</h3></div><p className={`text-xs leading-relaxed ${isDarkMode?'text-gray-400':'text-gray-500'}`}>Cursor tracking, flow state endurance, hand-eye coordination, and smooth motor control.</p></div>
                  <div className={`p-4 rounded-xl border ${isDarkMode?'bg-gray-700/50 border-gray-600':'bg-purple-50 border-purple-100'}`}><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-purple-500 flex items-center justify-center"><BarChart3 className="w-4 h-4 text-white" /></div><h3 className={`text-sm font-semibold ${isDarkMode?'text-white':'text-gray-900'}`}>What You'll Track</h3></div><p className={`text-xs leading-relaxed ${isDarkMode?'text-gray-400':'text-gray-500'}`}>Flow score, flow percentage, streak length, and best performance across sessions.</p></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className={`p-4 rounded-xl border ${isDarkMode?'bg-gray-700/50 border-gray-600':'bg-yellow-50 border-yellow-100'}`}><div className="flex items-center gap-2 mb-3"><div className="w-8 h-8 rounded-lg bg-yellow-500 flex items-center justify-center"><Lightbulb className="w-4 h-4 text-white" /></div><h3 className={`text-sm font-semibold ${isDarkMode?'text-white':'text-gray-900'}`}>Why Practice Wave Tracing?</h3></div><ul className={`text-xs space-y-2 ${isDarkMode?'text-gray-400':'text-gray-600'}`}><li className="flex items-start gap-2"><CheckCircle2 className="w-3 h-3 text-yellow-500 mt-0.5 flex-shrink-0" />Builds smooth, precise cursor control</li><li className="flex items-start gap-2"><CheckCircle2 className="w-3 h-3 text-yellow-500 mt-0.5 flex-shrink-0" />Trains flow state endurance for gaming</li><li className="flex items-start gap-2"><CheckCircle2 className="w-3 h-3 text-yellow-500 mt-0.5 flex-shrink-0" />Improves hand-eye coordination naturally</li></ul></div>
                  <div className={`p-4 rounded-xl border ${isDarkMode?'bg-gray-700/50 border-gray-600':'bg-amber-50 border-amber-100'}`}><div className="flex items-center gap-2 mb-3"><div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center"><Clock className="w-4 h-4 text-white" /></div><h3 className={`text-sm font-semibold ${isDarkMode?'text-white':'text-gray-900'}`}>How to Practice Effectively</h3></div><ol className={`text-xs space-y-2 ${isDarkMode?'text-gray-400':'text-gray-600'}`}><li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-amber-500 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">1</span>Keep your cursor on the red wave filament</li><li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-amber-500 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">2</span>Stay relaxed - tension reduces precision</li><li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-amber-500 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">3</span>The wave auto-resumes when you reconnect</li><li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-amber-500 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">4</span>Practice 2-3 times daily for best improvement</li></ol></div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Related Drills - Preserved */}
        {!isFullscreen && (
          <section className="mt-8" aria-label="Related drills">
            <div className="flex items-center gap-2 mb-4"><div className="w-1 h-6 rounded-full bg-gradient-to-b from-red-500 to-rose-600"></div><h2 className={`text-xl font-bold ${isDarkMode?'text-white':'text-gray-900'}`}>Explore Related Free Drills</h2></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { href: "/drills/motor/precision-control/steady-hand", color: "blue", icon: <Target className="w-4 h-4 text-blue-600" />, cat: "Precision Control", title: "Steady Hand", desc: "Navigate tight paths without touching the edges to build precision." },
                { href: "/drills/motor/precision-control/fine-motor", color: "purple", icon: <Brain className="w-4 h-4 text-purple-600" />, cat: "Precision Control", title: "Fine Motor", desc: "Precision clicking on small targets to build fine motor control." },
                { href: "/drills/motor/hand-eye-coordination/aim-trainer", color: "orange", icon: <Crosshair className="w-4 h-4 text-orange-600" />, cat: "Coordination", title: "Aim Trainer", desc: "Click targets quickly and accurately for hand-eye coordination." },
                { href: "/drills/motor/timing-accuracy/rhythm-tap", color: "cyan", icon: <Zap className="w-4 h-4 text-cyan-600" />, cat: "Timing Accuracy", title: "Rhythm Tap", desc: "Tap in sync with rhythmic beats to build timing accuracy." },
                { href: "/drills/motor/hand-eye-coordination/click-accuracy", color: "teal", icon: <Target className="w-4 h-4 text-teal-600" />, cat: "Coordination", title: "Click Accuracy", desc: "Click precisely on targets to improve pointing accuracy and speed." },
                { href: "/drills/motor/timing-accuracy/stopwatch-click", color: "red", icon: <Timer className="w-4 h-4 text-red-600" />, cat: "Timing Accuracy", title: "Stopwatch Click", desc: "Stop the timer at exact targets to build precision timing." },
                { href: "/drills/fps/flick-shot-training", color: "emerald", icon: <Crosshair className="w-4 h-4 text-emerald-600" />, cat: "FPS Training", title: "Flick Shot Training", desc: "Improve FPS aim with rapid target flicking and precision clicking." },
                { href: "/drills/visual/tracking-accuracy/moving-target", color: "indigo", icon: <Eye className="w-4 h-4 text-indigo-600" />, cat: "Visual Tracking", title: "Moving Target", desc: "Track moving targets with your eyes to improve visual pursuit." }
              ].map((d, i) => {
                const cm = { blue:'hover:border-blue-500', purple:'hover:border-purple-500', orange:'hover:border-orange-500', cyan:'hover:border-cyan-500', teal:'hover:border-teal-500', red:'hover:border-red-500', emerald:'hover:border-emerald-500', indigo:'hover:border-indigo-500' };
                return (<Link key={i} href={d.href} className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDarkMode ? 'bg-gray-800 border-gray-700 ' + cm[d.color] : 'bg-white border-gray-200 ' + cm[d.color]}`}><div className="p-4"><div className="flex items-center gap-2 mb-2"><div className={`w-8 h-8 rounded-lg bg-${d.color}-100 flex items-center justify-center`}>{d.icon}</div><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isDarkMode?'bg-gray-700 text-gray-400':'bg-gray-100 text-gray-500'}`}>{d.cat}</span></div><h3 className={`font-semibold text-sm mb-1 ${isDarkMode?'text-white group-hover:text-'+d.color+'-400':'text-gray-900 group-hover:text-'+d.color+'-600'} transition-colors`}>{d.title}</h3><p className={`text-xs leading-relaxed ${isDarkMode?'text-gray-500':'text-gray-400'}`}>{d.desc}</p><div className="flex items-center gap-1 mt-3 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Start Drill <ArrowRight className="w-3 h-3" /></div></div></Link>);
              })}
            </div>
          </section>
        )}

        {/* Footer - Preserved */}
        {!isFullscreen && (<footer className="mt-12 bg-gray-900 text-gray-400 rounded-xl py-10 px-6" role="contentinfo"><div className="max-w-7xl mx-auto"><div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 mb-8"><div><h3 className="text-white font-semibold mb-3 text-sm">FPS Training</h3><ul className="space-y-2 text-sm"><li><Link href="/drills/fps/flick-shot-training" className="hover:text-white transition-colors">Flick Shot Trainer</Link></li><li><Link href="/drills/fps/target-acquisition" className="hover:text-white transition-colors">Target Acquisition</Link></li><li><Link href="/drills/fps/reactive-tracking" className="hover:text-white transition-colors">Reactive Tracking</Link></li><li><Link href="/drills/fps" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">All FPS Drills →</Link></li></ul></div><div><h3 className="text-white font-semibold mb-3 text-sm">Cognitive</h3><ul className="space-y-2 text-sm"><li><Link href="/drills/cognitive/memory/card-matching" className="hover:text-white transition-colors">Memory Games</Link></li><li><Link href="/drills/cognitive/attention/divided-attention" className="hover:text-white transition-colors">Attention Drills</Link></li><li><Link href="/drills/cognitive/problem-solving/logic-puzzles" className="hover:text-white transition-colors">Logic Puzzles</Link></li><li><Link href="/drills/cognitive" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">All Cognitive Drills →</Link></li></ul></div><div><h3 className="text-white font-semibold mb-3 text-sm">Motor</h3><ul className="space-y-2 text-sm"><li><Link href="/drills/motor/hand-eye-coordination/aim-trainer" className="hover:text-white transition-colors">Aim Trainer</Link></li><li><Link href="/drills/motor/precision-control/steady-hand" className="hover:text-white transition-colors">Steady Hand</Link></li><li><Link href="/drills/motor/precision-control/tracing" className="hover:text-white transition-colors">Wave Tracing</Link></li><li><Link href="/drills/motor" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">All Motor Drills →</Link></li></ul></div><div><h3 className="text-white font-semibold mb-3 text-sm">Visual & Academic</h3><ul className="space-y-2 text-sm"><li><Link href="/drills/visual/reaction-speed/light-reaction" className="hover:text-white transition-colors">Reaction Time Test</Link></li><li><Link href="/drills/visual/tracking-accuracy/moving-target" className="hover:text-white transition-colors">Moving Target</Link></li><li><Link href="/drills/academic/writing-speed/typing-test" className="hover:text-white transition-colors">Typing Speed Test</Link></li><li><Link href="/drills/academic/math-speed/mental-math" className="hover:text-white transition-colors">Mental Math</Link></li></ul></div><div><h3 className="text-white font-semibold mb-3 text-sm">More</h3><ul className="space-y-2 text-sm"><li><Link href="/drills/memory" className="hover:text-white transition-colors">Memory (15 drills)</Link></li><li><Link href="/drills/productivity" className="hover:text-white transition-colors">Productivity (10 drills)</Link></li><li><Link href="/drills/mental-fitness" className="hover:text-white transition-colors">Mental Fitness (6 drills)</Link></li><li><Link href="/drills/physical" className="hover:text-white transition-colors">Physical (11 drills)</Link></li></ul></div></div><div className="border-t border-gray-800 pt-8 text-center"><div className="flex items-center justify-center gap-3 mb-4"><div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center"><Brain className="w-5 h-5 text-white" /></div><span className="text-white font-bold text-lg">SkillDrills</span></div><p className="text-sm mb-2">&copy; 2026 SkillDrills. All rights reserved.</p><p className="text-xs max-w-2xl mx-auto leading-relaxed mb-6">Free wave tracing drill with raw mouse input. Follow the red wave filament with auto-pause/resume.</p><div className="flex items-center justify-center gap-5 flex-wrap"><button onClick={sharePage} className="text-gray-500 hover:text-white transition-colors"><svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/></svg></button><button onClick={copyPageLink} className="text-gray-500 hover:text-white transition-colors"><svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/></svg></button></div></div></div></footer>)}
      </div>
    </div>
  );
}

function StatCard({ icon, value, label, unit = '', d }) { return (<div className={`rounded-xl shadow-sm border p-2 sm:p-3 text-center flex flex-col justify-center h-full ${d?'bg-gray-800 border-gray-700':'bg-white border-gray-100'}`}><div className="mb-1 flex justify-center">{icon}</div><p className={`text-lg sm:text-xl font-bold truncate ${d?'text-white':'text-gray-900'}`}>{value}{unit}</p><p className={`text-[10px] sm:text-xs truncate ${d?'text-gray-400':'text-gray-500'}`}>{label}</p></div>); }
function RC({ label, v, unit = '', i, c, d }) { const m = { blue:'bg-blue-500/10 border-blue-500/30 text-blue-500', yellow:'bg-yellow-500/10 border-yellow-500/30 text-yellow-500', orange:'bg-orange-500/10 border-orange-500/30 text-orange-500', green:'bg-green-500/10 border-green-500/30 text-green-500' }; const o = m[c] || m.blue; const [bg, border, text] = o.split(' '); return (<div className={`flex items-center justify-between p-3 rounded-lg border ${bg} ${border}`}><div className="flex items-center gap-2"><div className={text}>{i}</div><span className={`text-xs sm:text-sm ${d?'text-gray-300':'text-gray-600'}`}>{label}</span></div><span className={`font-bold text-base sm:text-lg ${text}`}>{v}{unit}</span></div>); }