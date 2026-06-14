'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  Target, Zap, Clock, Activity, Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, 
  Eye, Timer, Crosshair, Brain, Trophy, Info, RefreshCw,
  GraduationCap, Lightbulb, TrendingUp, BarChart3, CheckCircle2, Star, ArrowRight, Share2, Copy, Lock, AlertCircle
} from 'lucide-react';

export default function AutoPursuitClient() {
  const [showRotateWarning, setShowRotateWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState("Rotate Your Device");

  useEffect(() => {
    const checkSize = () => {
      if (typeof window === 'undefined') return;
      const ua = navigator.userAgent || '';
      const isMobile = /Mobi|Android|iPhone|iPad|iPod|Windows Phone/i.test(ua) || 
                       (navigator.maxTouchPoints > 0 && 
                        window.screen && Math.max(window.screen.width, window.screen.height) < 1024);
      if (isMobile) {
        setShowRotateWarning(true);
        setWarningMessage("This drill cannot be played on mobile phones");
        return;
      }
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
  const [trackingTime, setTrackingTime] = useState(0);
  const [bestTime, setBestTime] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [timeLeft, setTimeLeft] = useState(60);
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const pointerLocked = true;
  
  const virtualCrosshair = useRef({ x: 0, y: 0 });
  const crosshairInitRef = useRef(false);
  const targetRef = useRef({ x: 0, y: 0, vx: 6, vy: 6, r: 30 });
  const trackingTimeRef = useRef(0);
  const bestTimeRef = useRef(0);
  const scoreRef = useRef(0);
  const totalFramesRef = useRef(0);
  const hitFramesRef = useRef(0);
  const isActiveRef = useRef(false);
  const gameStateRef = useRef('start');
  const timerIntervalRef = useRef(null);
  const feedbackTimeoutRef = useRef(null);
  const audioCtxRef = useRef(null);
  const lastScoreTimeRef = useRef(0);

  useEffect(() => { setIsClient(true); const t = setTimeout(() => setLoading(false), 0); return () => clearTimeout(t); }, []);
  useEffect(() => { try { const s = localStorage.getItem('autoPursuitBest'); if (s) { const p = parseInt(s,10); if (!isNaN(p)) setBestScore(p); } } catch(e) {} }, []);
  useEffect(() => { gameStateRef.current = gameState; }, [gameState]);

  const updateBestScore = useCallback((fs) => { try { const c = parseInt(localStorage.getItem('autoPursuitBest')||'0',10); if (fs > c) { localStorage.setItem('autoPursuitBest', fs.toString()); setBestScore(fs); } } catch(e) {} }, []);
  const showFeedback = useCallback((m, t) => { if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current); setFeedback(m); setFeedbackType(t); feedbackTimeoutRef.current = setTimeout(() => { setFeedback(''); setFeedbackType(''); }, 600); }, []);
  const initAudio = useCallback(() => { try { if (!audioCtxRef.current) audioCtxRef.current = new (window.AudioContext||window.webkitAudioContext)(); if (audioCtxRef.current.state==='suspended') audioCtxRef.current.resume(); return audioCtxRef.current; } catch(e) { return null; } }, []);
  const playSound = useCallback((type) => { if (!soundEnabled) return; try { const ctx = initAudio(); if (!ctx) return; const o = ctx.createOscillator(); const g = ctx.createGain(); o.connect(g); g.connect(ctx.destination); const now = ctx.currentTime; const f = { record:1046.5, score:880, streak:1318 }; o.frequency.setValueAtTime(f[type]||440,now); g.gain.setValueAtTime(type==='streak'?0.12:0.08,now); g.gain.exponentialRampToValueAtTime(0.001,now+0.15); o.start(now); o.stop(now+0.15); } catch(e) {} }, [soundEnabled, initAudio]);

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

  const toggleFullscreen = useCallback(async () => { try { if (!isFullscreen) { const el = containerRef.current; if (el?.requestFullscreen) { await el.requestFullscreen(); setIsFullscreen(true); } } else { if (document.fullscreenElement) await document.exitFullscreen(); setIsFullscreen(false); } } catch(e) {} }, [isFullscreen]);
  useEffect(() => { const h = () => setIsFullscreen(!!document.fullscreenElement); document.addEventListener('fullscreenchange',h); return () => document.removeEventListener('fullscreenchange',h); }, []);

  const resetPosition = useCallback((w,h) => { targetRef.current.x = w/2 + (Math.random()-0.5)*200; targetRef.current.y = h/2 + (Math.random()-0.5)*200; const a = Math.random()*Math.PI*2; targetRef.current.vx = Math.cos(a)*6; targetRef.current.vy = Math.sin(a)*6; }, []);

  // Timer
  useEffect(() => {
    if (gameState !== 'playing') return;
    timerIntervalRef.current = setInterval(() => { setTimeLeft(p => { if (p<=1) { setGameState('gameOver'); gameStateRef.current='gameOver'; isActiveRef.current=false; const fa = totalFramesRef.current>0?Math.round((hitFramesRef.current/totalFramesRef.current)*100):100; setAccuracy(fa); updateBestScore(scoreRef.current); if (timerIntervalRef.current) { clearInterval(timerIntervalRef.current); timerIntervalRef.current=null; }  return 0; } return p-1; }); },1000);
    return () => { if (timerIntervalRef.current) { clearInterval(timerIntervalRef.current); timerIntervalRef.current=null; } };
  }, [gameState, updateBestScore]);

  // Render loop
  useEffect(() => {
    if (gameState!=='playing') return;
    const cvs = canvasRef.current; if (!cvs) return; const ctx = cvs.getContext('2d');
    const updateSize = () => { const ct = containerRef.current; if (!ct) return; const cr = ct.getBoundingClientRect(); let w=cr.width, h=w*(9/16); if (h>cr.height) { h=cr.height; w=h*(16/9); } cvs.width=w; cvs.height=h; cvs.style.position='absolute'; cvs.style.left=`${(cr.width-w)/2}px`; cvs.style.top=`${(cr.height-h)/2}px`; if (!crosshairInitRef.current) virtualCrosshair.current = { x: w/2, y: h/2 }; resetPosition(w,h); };
    const ro = new ResizeObserver(updateSize); if (containerRef.current) ro.observe(containerRef.current); window.addEventListener('resize',updateSize); updateSize();
    
    function update() { if (!isActiveRef.current) return; const t=targetRef.current, ch=virtualCrosshair.current; t.x+=t.vx; t.y+=t.vy; if (Math.random()>0.97) { t.vx+=(Math.random()-0.5)*8; t.vy+=(Math.random()-0.5)*8; const mag=Math.hypot(t.vx,t.vy); if (mag>12) { t.vx*=0.7; t.vy*=0.7; } } if (t.x<35||t.x>cvs.width-35) t.vx*=-1; if (t.y<35||t.y>cvs.height-35) t.vy*=-1; t.x=Math.max(35,Math.min(cvs.width-35,t.x)); t.y=Math.max(35,Math.min(cvs.height-35,t.y)); const dist=Math.hypot(ch.x-t.x,ch.y-t.y); totalFramesRef.current++; if (dist<t.r) { trackingTimeRef.current++; hitFramesRef.current++; setTrackingTime(trackingTimeRef.current); if (trackingTimeRef.current>=lastScoreTimeRef.current+30) { lastScoreTimeRef.current=trackingTimeRef.current; scoreRef.current+=1; setScore(scoreRef.current); showFeedback('+1 point!','success'); playSound('score'); } } else { trackingTimeRef.current=0; setTrackingTime(0); lastScoreTimeRef.current=0; } const ap=totalFramesRef.current>0?Math.round((hitFramesRef.current/totalFramesRef.current)*100):100; setAccuracy(ap); if (trackingTimeRef.current>bestTimeRef.current&&trackingTimeRef.current>30) { bestTimeRef.current=trackingTimeRef.current; setBestTime(bestTimeRef.current); playSound('record'); showFeedback(`🏆 New Record! ${(bestTimeRef.current/60).toFixed(1)}s`,'success'); } if (trackingTimeRef.current>0&&trackingTimeRef.current%150===0) { playSound('streak'); showFeedback(`🔥 ${(trackingTimeRef.current/60).toFixed(1)}s Streak!`,'success'); } }
    
    function draw() { update(); ctx.fillStyle=isBoxDarkMode?"#020202":"#f9fafb"; ctx.fillRect(0,0,cvs.width,cvs.height); ctx.strokeStyle=isBoxDarkMode?'rgba(255,255,255,0.02)':'rgba(0,0,0,0.02)'; ctx.lineWidth=1; for (let i=0;i<cvs.width;i+=40){ctx.beginPath();ctx.moveTo(i,0);ctx.lineTo(i,cvs.height);ctx.stroke();} const t=targetRef.current, isTracking=trackingTimeRef.current>0; ctx.beginPath(); ctx.arc(t.x,t.y,t.r,0,Math.PI*2); ctx.fillStyle=isTracking?"#00ff88":(isBoxDarkMode?"#333333":"#cccccc"); ctx.shadowBlur=isTracking?12:0; ctx.shadowColor="#00ff88"; ctx.fill(); ctx.shadowBlur=0; ctx.strokeStyle=isTracking?"#00cc66":(isBoxDarkMode?"#555555":"#aaaaaa"); ctx.lineWidth=2.5; ctx.stroke(); if (isTracking) { ctx.beginPath(); ctx.arc(t.x,t.y,t.r*0.3,0,Math.PI*2); ctx.fillStyle="#FFFFFF"; ctx.fill(); }
      // Professional crosshair
      const ch=virtualCrosshair.current;
      if (ch.x>0&&ch.x<cvs.width&&ch.y>0&&ch.y<cvs.height) { const over=Math.hypot(ch.x-t.x,ch.y-t.y)<t.r; const cc=over?'#00ff88':pointerLocked?'#ffffff':'#ff4444'; ctx.strokeStyle=cc; ctx.lineWidth=2; ctx.beginPath(); ctx.arc(ch.x,ch.y,12,0,Math.PI*2); ctx.stroke(); ctx.beginPath(); ctx.moveTo(ch.x-24,ch.y);ctx.lineTo(ch.x-10,ch.y);ctx.moveTo(ch.x+10,ch.y);ctx.lineTo(ch.x+24,ch.y);ctx.moveTo(ch.x,ch.y-24);ctx.lineTo(ch.x,ch.y-10);ctx.moveTo(ch.x,ch.y+10);ctx.lineTo(ch.x,ch.y+24);ctx.stroke();ctx.fillStyle=cc;ctx.beginPath();ctx.arc(ch.x,ch.y,3,0,Math.PI*2);ctx.fill(); }
      animationRef.current=requestAnimationFrame(draw); }
    animationRef.current=requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(animationRef.current); window.removeEventListener('resize',updateSize); ro.disconnect(); };
  }, [gameState,isBoxDarkMode,pointerLocked,resetPosition,showFeedback,playSound]);

  const startGame = useCallback(() => {
    try {
      if (typeof window !== 'undefined' && !document.fullscreenElement) {
        if (typeof toggleFullscreen === 'function') toggleFullscreen();
      }
    } catch (err) {}

    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    setGameState('playing'); gameStateRef.current='playing';
    setScore(0); setTrackingTime(0); setBestTime(0); setAccuracy(100); setTimeLeft(60); setFeedback('');
    isActiveRef.current=true; trackingTimeRef.current=0; bestTimeRef.current=0; scoreRef.current=0;
    totalFramesRef.current=0; hitFramesRef.current=0; lastScoreTimeRef.current=0;
    crosshairInitRef.current = false;
    const c=canvasRef.current; if (c) resetPosition(c.width,c.height);
    setTimeout(() => requestPointerLock(), 200);
    setTimeout(() => { crosshairInitRef.current = true; }, 400);
  }, [resetPosition, requestPointerLock]);

  const resetGame = useCallback(() => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    isActiveRef.current=false;
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    setGameState('start'); gameStateRef.current='start';
    setScore(0); setTrackingTime(0); setBestTime(0); setAccuracy(100); setTimeLeft(60); setFeedback(''); setFeedbackType('');
    crosshairInitRef.current = false;
    
  }, []);

  const sharePage = async () => { if (navigator.share) { try { await navigator.share({ title: 'Auto-Pursuit Tracking Drill | SkillDrills', text: 'Train smooth pursuit by tracking a randomly moving target.', url: 'https://skilldrills.online/drills/visual/tracking-accuracy/pursuit-tracker' }); } catch (e) {} } else { navigator.clipboard.writeText('https://skilldrills.online/drills/visual/tracking-accuracy/pursuit-tracker'); } };
  const copyPageLink = () => { navigator.clipboard.writeText('https://skilldrills.online/drills/visual/tracking-accuracy/pursuit-tracker'); };

  useEffect(() => { return () => { if (timerIntervalRef.current) clearInterval(timerIntervalRef.current); if (animationRef.current) cancelAnimationFrame(animationRef.current);  }; }, []);

  const formatTrackingTime = (frames) => (frames/60).toFixed(1);

  if (loading||!isClient) return (<div className="min-h-screen flex items-center justify-center bg-gray-50"><div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto" /></div>);

  return (
    <div className={`min-h-screen select-none ${isDarkMode?'bg-gray-900':'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!isFullscreen && (<nav className="mb-4"><ol className="flex flex-wrap items-center gap-2 text-sm"><li><Link href="/" className={`hover:underline ${isDarkMode?'text-gray-400 hover:text-gray-200':'text-gray-600 hover:text-gray-900'}`}>Home</Link></li><li className={isDarkMode?'text-gray-500':'text-gray-400'}>/</li><li><Link href="/drills/visual" className={`hover:underline ${isDarkMode?'text-gray-400 hover:text-gray-200':'text-gray-600 hover:text-gray-900'}`}>Visual Drills</Link></li><li className={isDarkMode?'text-gray-500':'text-gray-400'}>/</li><li className={`font-medium ${isDarkMode?'text-green-400':'text-green-600'}`}>Auto-Pursuit</li></ol></nav>)}
        
        {!isFullscreen && (<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6"><div className="flex items-center gap-3"><div className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl"><Crosshair className="w-6 h-6 text-white" /></div><div><h1 className={`text-2xl sm:text-3xl font-bold ${isDarkMode?'text-white':'text-gray-900'}`}>Auto-Pursuit Trainer</h1><p className={`text-sm sm:text-base ${isDarkMode?'text-gray-400':'text-gray-500'}`}> +1pt/0.5s • 60s challenge</p></div></div><div className="flex gap-2">{gameState==='playing' && <button onClick={resetGame} className={`p-2 rounded-lg border ${isDarkMode?'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700':'bg-white border-gray-200 text-gray-700 hover:bg-gray-100'}`}><RefreshCw className="w-5 h-5" /></button>}<button onClick={()=>setIsDarkMode(!isDarkMode)} className={`p-2 rounded-lg border ${isDarkMode?'bg-gray-800 border-gray-700 text-gray-300':'bg-white border-gray-200 text-gray-700'}`}>{isDarkMode?<Sun className="w-5 h-5" />:<Moon className="w-5 h-5" />}</button><button onClick={()=>setIsBoxDarkMode(!isBoxDarkMode)} className={`p-2 rounded-lg border ${isDarkMode?'bg-gray-800 border-gray-700 text-gray-300':'bg-white border-gray-200 text-gray-700'}`}><Eye className="w-5 h-5" /></button><button onClick={()=>setSoundEnabled(!soundEnabled)} className={`p-2 rounded-lg border ${isDarkMode?'bg-gray-800 border-gray-700 text-gray-300':'bg-white border-gray-200 text-gray-700'}`}>{soundEnabled?<Volume2 className="w-5 h-5" />:<VolumeX className="w-5 h-5" />}</button><button onClick={toggleFullscreen} className={`p-2 rounded-lg border ${isDarkMode?'bg-gray-800 border-gray-700 text-gray-300':'bg-white border-gray-200 text-gray-700'}`}>{isFullscreen?<Minimize2 className="w-5 h-5" />:<Maximize2 className="w-5 h-5" />}</button></div></div>)}

        {!isFullscreen && (<div className="grid grid-cols-3 sm:grid-cols-5 gap-2 sm:gap-3 mb-4 h-auto min-h-[88px] py-1"><StatCard icon={<Target className="text-blue-600" />} value={score} label="Score" d={isDarkMode} /><StatCard icon={<Trophy className="text-yellow-500" />} value={bestScore} label="Best" d={isDarkMode} /><StatCard icon={<Timer className={timeLeft<15?'text-red-600':'text-green-600'} />} value={timeLeft} label="Time" unit="s" d={isDarkMode} /><StatCard icon={<Zap className="text-orange-500" />} value={`${formatTrackingTime(trackingTime)}s`} label="Current" d={isDarkMode} /><StatCard icon={<Activity className="text-purple-500" />} value={accuracy} label="Accuracy" unit="%" d={isDarkMode} /></div>)}

        <div className="h-10 mb-2 flex justify-center items-center"><div className={`px-4 py-1.5 rounded-lg text-white font-semibold text-sm transition-all duration-200 ${feedback?'opacity-100 scale-100':'opacity-0 scale-95'} ${feedbackType==='success'?'bg-green-500':'bg-yellow-500'}`}>{feedback||'\u00A0'}</div></div>

        <div ref={containerRef} className={`relative ${isFullscreen?'fixed inset-0 z-50':'rounded-xl border-2'}`} style={{ background:isBoxDarkMode?"#020202":"#fff", aspectRatio:isFullscreen?'auto':'16/9', maxWidth:'100%', margin:'0 auto', borderColor:isDarkMode?'#374151':'#e5e7eb', overflow:'hidden' }}>
          {/* Mobile Rotate Device Warning Overlay */}
      {showRotateWarning && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-gray-950/95 text-center p-6" aria-hidden="true">
          <div className="animate-bounce mb-4 text-blue-500">
            <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-white mb-2">{warningMessage}</h3>
          <p className="text-sm text-gray-400 mb-6">{warningMessage === "This drill cannot be played on mobile phones" ? "This drill requires a physical mouse or keyboard and cannot be played on touchscreen devices." : "Please use landscape orientation or fullscreen mode for the best training experience."}</p>
          <Link href="/drills/visual">
            <button className="px-5 py-2.5 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-350 hover:text-white font-bold rounded-lg text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Go Back
            </button>
          </Link>
        </div>
      )}

          {isFullscreen && gameState==='playing' && (<div className="absolute top-4 right-4 z-20 opacity-0 pointer-events-none"><button onClick={toggleFullscreen} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70"><Minimize2 className="w-5 h-5" /></button></div>)}
          <canvas ref={canvasRef} style={{ display:'block', position:'absolute', cursor:'none', touchAction: 'none' }} />

          {gameState==='start' && (<div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm z-40 ${isBoxDarkMode?'bg-gray-900/95':'bg-white/95'}`}><div className={`rounded-2xl p-6 sm:p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode?'bg-gray-800 border-gray-700':'bg-white border-gray-200'}`}><Crosshair className="w-16 h-16 text-green-500 mx-auto mb-4" /><h2 className={`text-2xl font-bold mb-2 ${isBoxDarkMode?'text-white':'text-gray-900'}`}>Auto-Pursuit Trainer</h2><p className={`mb-4 ${isBoxDarkMode?'text-gray-300':'text-gray-600'}`}>Raw input • +1pt/0.5s tracking • 60s challenge</p><button onClick={startGame} className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-lg w-full">Start Training</button></div></div>)}

          {gameState==='gameOver' && (<div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm z-40 ${isBoxDarkMode?'bg-gray-900/95':'bg-white/95'}`}><div className={`rounded-2xl p-6 sm:p-8 shadow-xl border max-w-[520px] mx-4 ${isBoxDarkMode?'bg-gray-800 border-gray-700':'bg-white border-gray-200'}`}><div className="flex items-center justify-center gap-3 mb-4"><Trophy className="w-10 h-10 text-yellow-500" /><h2 className={`text-2xl font-bold ${isBoxDarkMode?'text-white':'text-gray-900'}`}>Training Complete</h2></div><div className="grid grid-cols-2 gap-3 mb-4"><RC label="Score" v={score} i={<Target className="w-4 h-4" />} c="blue" d={isBoxDarkMode} /><RC label="Best" v={bestScore} i={<Trophy className="w-4 h-4" />} c="yellow" d={isBoxDarkMode} /><RC label="Best Track" v={`${formatTrackingTime(bestTime)}s`} i={<Timer className="w-4 h-4" />} c="emerald" d={isBoxDarkMode} /><RC label="Accuracy" v={accuracy} u="%" i={<Activity className="w-4 h-4" />} c="cyan" d={isBoxDarkMode} /></div><div className="flex gap-3"><Link href="/drills/visual" className="flex-1"><button className={`w-full px-4 py-2.5 rounded-lg font-semibold ${isDarkMode?'bg-gray-700 text-gray-300':'bg-gray-200 text-gray-700'}`}>← Back</button></Link><button onClick={startGame} className="flex-1 px-4 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-semibold">Play Again →</button></div></div></div>)}
        </div>

        {!isFullscreen && (<footer className="mt-6"><div className={`rounded-xl border overflow-hidden ${isDarkMode?'bg-gray-800 border-gray-700':'bg-white border-gray-200'}`}><div className={`px-4 py-3 border-b ${isDarkMode?'border-gray-700 bg-gray-800/50':'border-gray-200 bg-gray-50'}`}><div className="flex items-center gap-2"><Info className={`w-4 h-4 ${isDarkMode?'text-green-400':'text-green-600'}`} /><h2 className={`font-semibold text-lg ${isDarkMode?'text-white':'text-gray-900'}`}>Drill Rules & Professional Features</h2></div></div><div className="p-6"><div className="grid grid-cols-1 md:grid-cols-3 gap-6"><div className="space-y-3"><h3 className={`font-semibold flex items-center gap-2 ${isDarkMode?'text-green-400':'text-green-600'}`}><Crosshair className="w-5 h-5" />How to Play</h3><ul className={`space-y-2 text-sm ${isDarkMode?'text-gray-300':'text-gray-600'}`}><li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">1</span><span>Click <span className="font-semibold text-green-400">Start Training</span></span></li><li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">2</span><span>Cursor locks for <span className="font-semibold text-green-400">raw input</span></span></li><li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">3</span><span>Keep crosshair <span className="font-semibold text-green-400">on the target</span></span></li><li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">4</span><span>Target glows <span className="font-semibold">green</span> when tracked</span></li></ul></div><div className="space-y-3"><h3 className={`font-semibold flex items-center gap-2 ${isDarkMode?'text-blue-400':'text-blue-600'}`}><Trophy className="w-5 h-5" />Scoring</h3><ul className={`space-y-2 text-sm ${isDarkMode?'text-gray-300':'text-gray-600'}`}><li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">+1</span><span><span className="font-semibold text-blue-400">Tracking</span> = +1 pt/0.5s</span></li><li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">🔥</span><span><span className="font-semibold text-orange-400">Streak</span> every 2.5s</span></li><li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">🏆</span><span><span className="font-semibold text-purple-400">Records</span> - best tracking time</span></li><li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-cyan-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">✓</span><span><span className="font-semibold text-cyan-400">No penalties</span> - pure practice</span></li></ul></div><div className="space-y-3"><h3 className={`font-semibold flex items-center gap-2 ${isDarkMode?'text-purple-400':'text-purple-600'}`}><Zap className="w-5 h-5" />Pro Features</h3><ul className={`space-y-2 text-sm ${isDarkMode?'text-gray-300':'text-gray-600'}`}><li className="flex items-start gap-2"><Lock className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" /><span><span className="font-semibold text-green-400">Raw Input</span> - Pointer Lock API</span></li><li className="flex items-start gap-2"><Activity className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" /><span><span className="font-semibold text-blue-400">Real-time</span> accuracy tracking</span></li><li className="flex items-start gap-2"><Timer className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" /><span><span className="font-semibold text-orange-400">Records</span> - tracking streaks</span></li></ul></div></div></div></div></footer>)}

        {!isFullscreen && (<section className="mt-8" aria-label="About this drill"><div className={`rounded-xl border overflow-hidden ${isDarkMode?'bg-gray-800 border-gray-700':'bg-white border-gray-200'}`}><div className={`px-4 py-3 border-b ${isDarkMode?'border-gray-700 bg-gray-800/50':'border-gray-200 bg-gray-50'}`}><div className="flex items-center gap-2"><GraduationCap className={`w-5 h-5 ${isDarkMode?'text-green-400':'text-green-600'}`} /><h2 className={`font-semibold ${isDarkMode?'text-white':'text-gray-900'}`}>About This Auto-Pursuit Drill</h2></div></div><div className="p-5"><p className={`text-sm leading-relaxed mb-5 ${isDarkMode?'text-gray-300':'text-gray-600'}`}>This Auto-Pursuit drill trains smooth pursuit tracking using raw mouse input via Pointer Lock API. A randomly moving target with directional jitter challenges you to maintain continuous cursor-on-target contact. +1 point is awarded every 0.5 seconds of sustained tracking. The target glows green with a white center dot when successfully tracked, providing clear visual feedback. With no lives or penalties, this is pure tracking practice focused on building endurance and smooth motor control.</p><div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5"><div className={`p-4 rounded-xl border ${isDarkMode?'bg-gray-700/50 border-gray-600':'bg-green-50 border-green-100'}`}><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-green-500 flex items-center justify-center"><GraduationCap className="w-4 h-4 text-white" /></div><h3 className={`text-sm font-semibold ${isDarkMode?'text-white':'text-gray-900'}`}>Who It's For</h3></div><p className={`text-xs leading-relaxed ${isDarkMode?'text-gray-400':'text-gray-500'}`}>Gamers improving smooth tracking aim, athletes developing hand-eye coordination, designers enhancing cursor precision, and anyone wanting better continuous visual-motor integration.</p></div><div className={`p-4 rounded-xl border ${isDarkMode?'bg-gray-700/50 border-gray-600':'bg-blue-50 border-blue-100'}`}><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center"><TrendingUp className="w-4 h-4 text-white" /></div><h3 className={`text-sm font-semibold ${isDarkMode?'text-white':'text-gray-900'}`}>Skills Improved</h3></div><p className={`text-xs leading-relaxed ${isDarkMode?'text-gray-400':'text-gray-500'}`}>Smooth pursuit tracking, hand-eye coordination, predictive motor control, sustained attention, and motor precision for prolonged cursor-on-target maintenance.</p></div><div className={`p-4 rounded-xl border ${isDarkMode?'bg-gray-700/50 border-gray-600':'bg-purple-50 border-purple-100'}`}><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-purple-500 flex items-center justify-center"><BarChart3 className="w-4 h-4 text-white" /></div><h3 className={`text-sm font-semibold ${isDarkMode?'text-white':'text-gray-900'}`}>What You'll Track</h3></div><p className={`text-xs leading-relaxed ${isDarkMode?'text-gray-400':'text-gray-500'}`}>Score, best score, current tracking time, best tracking streak record, accuracy percentage, and performance records saved locally.</p></div></div><div className="grid grid-cols-1 sm:grid-cols-2 gap-4"><div className={`p-4 rounded-xl border ${isDarkMode?'bg-gray-700/50 border-gray-600':'bg-yellow-50 border-yellow-100'}`}><div className="flex items-center gap-2 mb-3"><div className="w-8 h-8 rounded-lg bg-yellow-500 flex items-center justify-center"><Lightbulb className="w-4 h-4 text-white" /></div><h3 className={`text-sm font-semibold ${isDarkMode?'text-white':'text-gray-900'}`}>Why Practice Smooth Pursuit?</h3></div><ul className={`text-xs space-y-2 ${isDarkMode?'text-gray-400':'text-gray-600'}`}><li className="flex items-start gap-2"><CheckCircle2 className="w-3 h-3 text-yellow-500 mt-0.5 flex-shrink-0" />Essential skill for competitive gaming requiring sustained tracking aim</li><li className="flex items-start gap-2"><CheckCircle2 className="w-3 h-3 text-yellow-500 mt-0.5 flex-shrink-0" />Builds motor endurance for prolonged precision tasks</li><li className="flex items-start gap-2"><CheckCircle2 className="w-3 h-3 text-yellow-500 mt-0.5 flex-shrink-0" />Random jitter trains predictive tracking beyond simple following</li></ul></div><div className={`p-4 rounded-xl border ${isDarkMode?'bg-gray-700/50 border-gray-600':'bg-orange-50 border-orange-100'}`}><div className="flex items-center gap-2 mb-3"><div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center"><Clock className="w-4 h-4 text-white" /></div><h3 className={`text-sm font-semibold ${isDarkMode?'text-white':'text-gray-900'}`}>How to Practice Effectively</h3></div><ol className={`text-xs space-y-2 ${isDarkMode?'text-gray-400':'text-gray-600'}`}><li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">1</span>Watch for the target to glow green confirming successful tracking</li><li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">2</span>Anticipate directional changes from the random jitter pattern</li><li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">3</span>Build streaks beyond 2.5 seconds for tracking notifications</li><li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">4</span>Practice 10-15 minutes daily for best pursuit tracking improvement</li></ol></div></div></div></div></section>)}

        {!isFullscreen && (<section className="mt-8" aria-label="Related drills"><div className="flex items-center gap-2 mb-4"><div className="w-1 h-6 rounded-full bg-gradient-to-b from-green-500 to-emerald-600"></div><h2 className={`text-xl font-bold ${isDarkMode?'text-white':'text-gray-900'}`}>Explore Related Drills</h2><span className={`text-xs px-2 py-0.5 rounded-full ${isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>8 drills</span></div><div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">{[{href:"/drills/visual/tracking-accuracy/moving-target",color:"blue",icon:<Target className="w-4 h-4 text-blue-600"/>,cat:"Visual",title:"Kinetic Intercept",desc:"Click fast-moving targets spawning from edges."},{href:"/drills/visual/tracking-accuracy/multiple-targets",color:"green",icon:<Brain className="w-4 h-4 text-green-600"/>,cat:"Visual",title:"Ghost-Link Tracking",desc:"Memorize targets among moving balls."},{href:"/drills/fps/flick-shot-training",color:"purple",icon:<Crosshair className="w-4 h-4 text-purple-600"/>,cat:"FPS",title:"Flick Shot Trainer",desc:"Raw input flick training for FPS gaming."},{href:"/drills/visual/reaction-speed/sound-reaction",color:"orange",icon:<Star className="w-4 h-4 text-orange-600"/>,cat:"Visual",title:"Neuro-Switch",desc:"React to audio cues with color circles."},{href:"/drills/memory/working-memory/n-back",color:"cyan",icon:<Brain className="w-4 h-4 text-cyan-600"/>,cat:"Memory",title:"3-Back Training",desc:"Classic N-Back working memory task."},{href:"/drills/memory/spatial-memory/path-tracing",color:"red",icon:<Star className="w-4 h-4 text-red-600"/>,cat:"Memory",title:"Path Tracing",desc:"Retrace animated dot paths in order."},{href:"/drills/memory/short-term-memory/color-sequence",color:"teal",icon:<Star className="w-4 h-4 text-teal-600"/>,cat:"Memory",title:"Color Sequence",desc:"Tap color sequences in order."},{href:"/drills/cognitive/memory/card-matching",color:"indigo",icon:<Activity className="w-4 h-4 text-indigo-600"/>,cat:"Cognitive",title:"Card Matching",desc:"Classic memory card game."}].map((d,i)=>{const cm={blue:'hover:border-blue-500',green:'hover:border-green-500',purple:'hover:border-purple-500',orange:'hover:border-orange-500',cyan:'hover:border-cyan-500',red:'hover:border-red-500',teal:'hover:border-teal-500',indigo:'hover:border-indigo-500'};const ct={blue:'text-blue-500',green:'text-green-500',purple:'text-purple-500',orange:'text-orange-500',cyan:'text-cyan-500',red:'text-red-500',teal:'text-teal-500',indigo:'text-indigo-500'};return(<Link key={i} href={d.href} className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDarkMode?'bg-gray-800 border-gray-700 '+cm[d.color]:'bg-white border-gray-200 '+cm[d.color]}`}><div className="p-4"><div className="flex items-center gap-2 mb-2"><div className={`w-8 h-8 rounded-lg bg-${d.color}-100 flex items-center justify-center`}>{d.icon}</div><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isDarkMode?'bg-gray-700 text-gray-400':'bg-gray-100 text-gray-500'}`}>{d.cat}</span></div><h3 className={`font-semibold text-sm mb-1 ${isDarkMode?'text-white group-hover:'+ct[d.color]:'text-gray-900 group-hover:'+ct[d.color]} transition-colors`}>{d.title}</h3><p className={`text-xs leading-relaxed ${isDarkMode?'text-gray-500':'text-gray-400'}`}>{d.desc}</p><div className={`flex items-center gap-1 mt-3 ${ct[d.color]} text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity`}>Start Drill <ArrowRight className="w-3 h-3"/></div></div></Link>)})}</div></section>)}

        {!isFullscreen && (<footer className="mt-12 bg-gray-900 text-gray-400 rounded-xl py-10 px-6" role="contentinfo"><div className="max-w-7xl mx-auto"><div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 mb-8"><div><h3 className="text-white font-semibold mb-3 text-sm">Visual Training</h3><ul className="space-y-2 text-sm"><li><Link href="/drills/visual/tracking-accuracy/pursuit-tracker" className="hover:text-white transition-colors">Auto-Pursuit</Link></li><li><Link href="/drills/visual/tracking-accuracy/moving-target" className="hover:text-white transition-colors">Kinetic Intercept</Link></li><li><Link href="/drills/visual" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">All Visual Drills →</Link></li></ul></div><div><h3 className="text-white font-semibold mb-3 text-sm">FPS Training</h3><ul className="space-y-2 text-sm"><li><Link href="/drills/fps/flick-shot-training" className="hover:text-white transition-colors">Flick Shot Trainer</Link></li><li><Link href="/drills/fps/reactive-tracking" className="hover:text-white transition-colors">Reactive Tracking</Link></li><li><Link href="/drills/fps" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">All FPS Drills →</Link></li></ul></div><div><h3 className="text-white font-semibold mb-3 text-sm">Memory</h3><ul className="space-y-2 text-sm"><li><Link href="/drills/memory/working-memory/n-back" className="hover:text-white transition-colors">3-Back Training</Link></li><li><Link href="/drills/memory/spatial-memory/path-tracing" className="hover:text-white transition-colors">Path Tracing</Link></li><li><Link href="/drills/memory" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">All Memory Drills →</Link></li></ul></div><div><h3 className="text-white font-semibold mb-3 text-sm">Cognitive</h3><ul className="space-y-2 text-sm"><li><Link href="/drills/cognitive/memory/card-matching" className="hover:text-white transition-colors">Memory Games</Link></li><li><Link href="/drills/cognitive/attention/divided-attention" className="hover:text-white transition-colors">Attention Drills</Link></li><li><Link href="/drills/cognitive" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">All Cognitive Drills →</Link></li></ul></div><div><h3 className="text-white font-semibold mb-3 text-sm">More Categories</h3><ul className="space-y-2 text-sm"><li><Link href="/drills/academic" className="hover:text-white transition-colors">Academic (12 drills)</Link></li><li><Link href="/drills/productivity" className="hover:text-white transition-colors">Productivity (10 drills)</Link></li><li><Link href="/drills/mental-fitness" className="hover:text-white transition-colors">Mental Fitness (6 drills)</Link></li><li><Link href="/drills/physical" className="hover:text-white transition-colors">Physical (11 drills)</Link></li></ul></div></div><div className="border-t border-gray-800 pt-8 text-center"><div className="flex items-center justify-center gap-3 mb-4"><div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center"><Brain className="w-5 h-5 text-white" /></div><span className="text-white font-bold text-lg">SkillDrills</span></div><p className="text-sm mb-2">&copy; 2026 SkillDrills. All rights reserved.</p><p className="text-xs max-w-2xl mx-auto leading-relaxed mb-6">Free online auto-pursuit drill for smooth pursuit tracking with raw mouse input via Pointer Lock API. +1 point every 0.5 seconds of continuous tracking. No registration required.</p><div className="flex items-center justify-center gap-5 flex-wrap"><button onClick={sharePage} className="text-gray-500 hover:text-white transition-colors" title="Share this drill" aria-label="Share this free drill"><svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/></svg></button><button onClick={copyPageLink} className="text-gray-500 hover:text-white transition-colors" title="Copy link" aria-label="Copy drill link to clipboard"><svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/></svg></button><a href="https://twitter.com/skilldrillss" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors" title="Follow on Twitter X" aria-label="Follow SkillDrills on Twitter X"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a><a href="https://instagram.com/skilldrills.online" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors" title="Follow on Instagram" aria-label="Follow SkillDrills on Instagram"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg></a><a href="https://youtube.com/@skilldrills.online" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors" title="Subscribe on YouTube" aria-label="Subscribe to SkillDrills on YouTube"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg></a><a href="https://pinterest.com/skilldrills" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors" title="Follow on Pinterest" aria-label="Follow SkillDrills on Pinterest"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/></svg></a></div></div></div></footer>)}
      </div>
    </div>
  );
}

function StatCard({ icon, value, label, unit = '', d }) { return (<div className={`rounded-xl shadow-sm border p-2 sm:p-3 text-center flex flex-col justify-center h-full ${d?'bg-gray-800 border-gray-700':'bg-white border-gray-100'}`}><div className="mb-1 flex justify-center">{icon}</div><p className={`text-lg sm:text-xl font-bold truncate ${d?'text-white':'text-gray-900'}`}>{value}{unit}</p><p className={`text-[10px] sm:text-xs truncate ${d?'text-gray-400':'text-gray-500'}`}>{label}</p></div>); }
function RC({ label, v, unit = '', i, c, d }) { const m = { blue:'bg-blue-500/10 border-blue-500/30 text-blue-500', yellow:'bg-yellow-500/10 border-yellow-500/30 text-yellow-500', emerald:'bg-emerald-500/10 border-emerald-500/30 text-emerald-500', cyan:'bg-cyan-500/10 border-cyan-500/30 text-cyan-500' }; const o = m[c] || m.blue; const [bg, border, text] = o.split(' '); return (<div className={`flex items-center justify-between p-3 rounded-lg border ${bg} ${border}`}><div className="flex items-center gap-2"><div className={text}>{i}</div><span className={`text-xs sm:text-sm ${d?'text-gray-300':'text-gray-600'}`}>{label}</span></div><span className={`font-bold text-base sm:text-lg ${text}`}>{v}{unit}</span></div>); }