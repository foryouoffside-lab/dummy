'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  Target, Zap, Timer, Trophy, 
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, Eye,
  Info, Activity, Crosshair,
  Lock, AlertCircle, RefreshCw,
  Crosshair as CrosshairIcon, Dumbbell, Database, Keyboard, Star, Users,
  GraduationCap, Lightbulb, TrendingUp, Clock, ArrowRight,
  BookOpen, Brain, Code2, Hash, Calculator,
  BarChart3, CheckCircle2
} from 'lucide-react';

const TARGET_FPS = 360;
const TARGET_RADIUS = 25;
const GAME_DURATION = 60;
const SCORE_INTERVAL = 2000;

export default function ProSmoothPursuitClient() {
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
  const [trackingAccuracy, setTrackingAccuracy] = useState(0);
  const [bestAccuracy, setBestAccuracy] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  const [isClient, setIsClient] = useState(false);
  const [pointerLocked, setPointerLocked] = useState(false);
  const [lockCooldown, setLockCooldown] = useState(false);
  
  const tRef = useRef(0);
  const speedRef = useRef(1.5);
  const isHitRef = useRef(false);
  const framesOnTargetRef = useRef(0);
  const totalFramesRef = useRef(0);
  const scoreRef = useRef(0);
  const streakRef = useRef(0);
  const bestAccuracyRef = useRef(0);
  const bestStreakRef = useRef(0);
  const trackingAccumulatorRef = useRef(0);
  const timerIntervalRef = useRef(null);
  const feedbackTimeoutRef = useRef(null);
  const isActiveRef = useRef(false);
  const gameStateRef = useRef('start');
  const audioCtxRef = useRef(null);
  const virtualCrosshair = useRef({ x: 0, y: 0 });
  const canvasSizeRef = useRef({ width: 0, height: 0 });

  useEffect(() => { setIsClient(true); const timer = setTimeout(() => setLoading(false), 300); return () => clearTimeout(timer); }, []);
  useEffect(() => { try { const s = localStorage.getItem('proSmoothPursuitBestScore'); if (s) { const p = parseInt(s, 10); if (!isNaN(p)) setBestScore(p); } } catch (e) {} }, []);
  const updateBestScore = useCallback((finalScore) => { try { const c = parseInt(localStorage.getItem('proSmoothPursuitBestScore') || '0', 10); if (finalScore > c) { localStorage.setItem('proSmoothPursuitBestScore', finalScore.toString()); setBestScore(finalScore); } } catch (e) {} }, []);
  useEffect(() => { gameStateRef.current = gameState; }, [gameState]);

  const showFeedback = useCallback((message, type) => { if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current); setFeedback(message); setFeedbackType(type); feedbackTimeoutRef.current = setTimeout(() => { setFeedback(''); setFeedbackType(''); }, 1000); }, []);
  const initAudio = useCallback(() => { try { if (!audioCtxRef.current) audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)(); if (audioCtxRef.current.state === 'suspended') audioCtxRef.current.resume(); return audioCtxRef.current; } catch (e) { return null; } }, []);
  const playSound = useCallback((type) => { if (!soundEnabled) return; try { const a = initAudio(); if (!a) return; const o = a.createOscillator(), g = a.createGain(); o.connect(g); g.connect(a.destination); const n = a.currentTime; const f = { score: 880, streak: 1046 }; o.frequency.setValueAtTime(f[type] || 880, n); g.gain.setValueAtTime(type === 'streak' ? 0.12 : 0.08, n); g.gain.exponentialRampToValueAtTime(0.001, n + 0.12); o.start(n); o.stop(n + 0.12); } catch (e) {} }, [soundEnabled, initAudio]);

  const toggleFullscreen = useCallback(async () => { try { if (!isFullscreen) { const el = containerRef.current; if (el?.requestFullscreen) { await el.requestFullscreen(); setIsFullscreen(true); } } else { if (document.fullscreenElement) await document.exitFullscreen(); setIsFullscreen(false); } } catch (e) {} }, [isFullscreen]);
  useEffect(() => { const h = () => setIsFullscreen(!!document.fullscreenElement); document.addEventListener('fullscreenchange', h); return () => document.removeEventListener('fullscreenchange', h); }, []);

  const requestPointerLock = useCallback(() => { if (!lockCooldown && canvasRef.current) canvasRef.current.requestPointerLock(); }, [lockCooldown]);
  useEffect(() => { const h = () => { const l = document.pointerLockElement === canvasRef.current; setPointerLocked(l); if (!l && gameState === 'playing') { setLockCooldown(true); setTimeout(() => setLockCooldown(false), 1000); } }; const e = () => { setLockCooldown(true); setTimeout(() => setLockCooldown(false), 1000); }; document.addEventListener('pointerlockchange', h); document.addEventListener('pointerlockerror', e); return () => { document.removeEventListener('pointerlockchange', h); document.removeEventListener('pointerlockerror', e); }; }, [gameState]);
  useEffect(() => { const c = canvasRef.current; if (!c) return; const h = () => { if (gameState === 'playing' && !pointerLocked && !lockCooldown) requestPointerLock(); }; c.addEventListener('click', h); return () => c.removeEventListener('click', h); }, [gameState, pointerLocked, requestPointerLock, lockCooldown]);

  useEffect(() => { const h = (e) => { const cvs = canvasRef.current; if (!cvs) return; if (document.pointerLockElement === cvs) { virtualCrosshair.current.x += e.movementX || 0; virtualCrosshair.current.y += e.movementY || 0; } virtualCrosshair.current.x = Math.max(0, Math.min(cvs.width, virtualCrosshair.current.x)); virtualCrosshair.current.y = Math.max(0, Math.min(cvs.height, virtualCrosshair.current.y)); }; window.addEventListener('mousemove', h); return () => window.removeEventListener('mousemove', h); }, []);

  useEffect(() => { if (gameState === 'playing' && timeLeft > 0) { timerIntervalRef.current = setInterval(() => { setTimeLeft(prev => { if (prev <= 1) { setGameState('gameOver'); gameStateRef.current = 'gameOver'; isActiveRef.current = false; if (timerIntervalRef.current) { clearInterval(timerIntervalRef.current); timerIntervalRef.current = null; } updateBestScore(scoreRef.current); document.exitPointerLock(); return 0; } return prev - 1; }); }, 1000); } return () => { if (timerIntervalRef.current) { clearInterval(timerIntervalRef.current); timerIntervalRef.current = null; } }; }, [gameState, timeLeft, updateBestScore]);

  useEffect(() => {
    if (gameState !== 'playing') return;
    const cvs = canvasRef.current; if (!cvs) return;
    const ctx = cvs.getContext('2d');
    const updateCanvasSize = () => { const container = containerRef.current; if (!container) return; const rr = container.getBoundingClientRect(); let w = rr.width, h = w * (9 / 16); if (h > rr.height) { h = rr.height; w = h * (16 / 9); } cvs.width = w; cvs.height = h; canvasSizeRef.current = { width: w, height: h }; cvs.style.position = 'absolute'; cvs.style.left = `${(rr.width - w) / 2}px`; cvs.style.top = `${(rr.height - h) / 2}px`; virtualCrosshair.current = { x: w / 2, y: h / 2 }; };
    const ro = new ResizeObserver(updateCanvasSize); if (containerRef.current) ro.observe(containerRef.current); window.addEventListener('resize', updateCanvasSize); updateCanvasSize();
    const STEP = 1 / TARGET_FPS; let lastTime = performance.now(); let dt = 0; tRef.current = 0; trackingAccumulatorRef.current = 0;
    function update(step) { if (!isActiveRef.current) return { tx: 0, ty: 0 }; tRef.current += speedRef.current * step; const w = cvs.width, h = cvs.height; const tx = w / 2 + Math.cos(tRef.current * 0.8) * (w / 2.5); const ty = h / 2 + Math.sin(tRef.current * 1.2) * (h / 3); const ch = virtualCrosshair.current; const dist = Math.hypot(ch.x - tx, ch.y - ty); isHitRef.current = dist < TARGET_RADIUS; totalFramesRef.current++; if (isHitRef.current) { framesOnTargetRef.current++; streakRef.current++; setStreak(streakRef.current); if (streakRef.current > bestStreakRef.current) { bestStreakRef.current = streakRef.current; setBestStreak(streakRef.current); } trackingAccumulatorRef.current += step * 1000; while (trackingAccumulatorRef.current >= SCORE_INTERVAL) { scoreRef.current += 1; setScore(scoreRef.current); trackingAccumulatorRef.current -= SCORE_INTERVAL; playSound('score'); showFeedback('✓ +1', 'success'); } } else { trackingAccumulatorRef.current = 0; if (streakRef.current > 0) { streakRef.current = 0; setStreak(0); } } if (totalFramesRef.current % 10 === 0) { const acc = (framesOnTargetRef.current / totalFramesRef.current) * 100; setTrackingAccuracy(Math.round(acc * 10) / 10); if (acc > bestAccuracyRef.current) { bestAccuracyRef.current = acc; setBestAccuracy(Math.round(acc * 10) / 10); } } return { tx, ty }; }
    function draw(tx, ty) { ctx.fillStyle = isBoxDarkMode ? '#020202' : '#f9fafb'; ctx.fillRect(0, 0, cvs.width, cvs.height); ctx.strokeStyle = isBoxDarkMode ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)'; ctx.lineWidth = 1; for (let i = 0; i < cvs.width; i += 40) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, cvs.height); ctx.stroke(); } ctx.beginPath(); ctx.arc(tx, ty, TARGET_RADIUS, 0, Math.PI * 2); if (isHitRef.current) { ctx.fillStyle = '#00ff88'; ctx.shadowColor = '#00ff88'; ctx.shadowBlur = 12; } else { ctx.fillStyle = '#ffffff'; ctx.shadowBlur = 0; } ctx.fill(); ctx.shadowBlur = 0; ctx.beginPath(); ctx.arc(tx, ty, TARGET_RADIUS * 0.5, 0, Math.PI * 2); ctx.strokeStyle = isHitRef.current ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.15)'; ctx.lineWidth = 1.5; ctx.stroke(); ctx.beginPath(); ctx.arc(tx, ty, 2, 0, Math.PI * 2); ctx.fillStyle = '#000000'; ctx.fill(); const ch = virtualCrosshair.current; if (ch.x > 0 && ch.x < cvs.width && ch.y > 0 && ch.y < cvs.height) { const cc = isHitRef.current ? '#00ff88' : 'rgba(255,255,255,0.6)'; const lc = pointerLocked ? cc : 'rgba(255,255,255,0.4)'; ctx.strokeStyle = lc; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(ch.x, ch.y, 12, 0, Math.PI * 2); ctx.stroke(); ctx.beginPath(); ctx.moveTo(ch.x - 24, ch.y); ctx.lineTo(ch.x - 10, ch.y); ctx.moveTo(ch.x + 10, ch.y); ctx.lineTo(ch.x + 24, ch.y); ctx.moveTo(ch.x, ch.y - 24); ctx.lineTo(ch.x, ch.y - 10); ctx.moveTo(ch.x, ch.y + 10); ctx.lineTo(ch.x, ch.y + 24); ctx.stroke(); ctx.fillStyle = lc; ctx.beginPath(); ctx.arc(ch.x, ch.y, 3, 0, Math.PI * 2); ctx.fill(); } }
    function loop(now) { if (!isActiveRef.current) return; dt += Math.min(1, (now - lastTime) / 1000); lastTime = now; let tp = { tx: cvs.width / 2, ty: cvs.height / 2 }; while (dt > STEP) { tp = update(STEP); dt -= STEP; } draw(tp.tx, tp.ty); animationRef.current = requestAnimationFrame(loop); }
    animationRef.current = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(animationRef.current); window.removeEventListener('resize', updateCanvasSize); ro.disconnect(); };
  }, [gameState, isBoxDarkMode, pointerLocked, playSound, showFeedback]);

  const startGame = useCallback(() => { setGameState('playing'); gameStateRef.current = 'playing'; setScore(0); setStreak(0); setBestStreak(0); setTrackingAccuracy(0); setBestAccuracy(0); setTimeLeft(GAME_DURATION); setFeedback(''); isActiveRef.current = true; scoreRef.current = 0; streakRef.current = 0; bestStreakRef.current = 0; bestAccuracyRef.current = 0; framesOnTargetRef.current = 0; totalFramesRef.current = 0; tRef.current = 0; trackingAccumulatorRef.current = 0; setTimeout(() => requestPointerLock(), 300); showFeedback('Track the target! +1pt every 2s', 'success'); }, [showFeedback, requestPointerLock]);
  const resetGame = useCallback(() => { isActiveRef.current = false; if (timerIntervalRef.current) clearInterval(timerIntervalRef.current); if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current); setGameState('start'); gameStateRef.current = 'start'; setFeedback(''); setFeedbackType(''); document.exitPointerLock(); setLockCooldown(true); setTimeout(() => setLockCooldown(false), 1000); }, []);
  useEffect(() => () => { if (timerIntervalRef.current) clearInterval(timerIntervalRef.current); if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current); if (animationRef.current) cancelAnimationFrame(animationRef.current); document.exitPointerLock(); }, []);

  const sharePage = async () => { if (navigator.share) { try { await navigator.share({ title: 'Free Pro Smooth Pursuit Tracking Drill | SkillDrills', text: 'Train smooth aim tracking with Lissajous curve at 360Hz. Free!', url: 'https://skilldrills.online/drills/fps/pro-smooth-pursuit' }); } catch (e) {} } else { navigator.clipboard.writeText('https://skilldrills.online/drills/fps/pro-smooth-pursuit'); alert('Link copied!'); } };
  const copyPageLink = () => { navigator.clipboard.writeText('https://skilldrills.online/drills/fps/pro-smooth-pursuit'); alert('Link copied!'); };

  if (loading || !isClient) return (<div className="min-h-screen flex items-center justify-center bg-gray-50"><div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto" /></div>);

  return (
    <div className={`min-h-screen select-none ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!isFullscreen && (
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex flex-wrap items-center gap-2 text-sm">
              <li><Link href="/" className={`hover:underline ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>Home</Link></li>
              <li className={isDarkMode ? 'text-gray-500' : 'text-gray-400'}>/</li>
              <li><Link href="/drills/fps" className={`hover:underline ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>FPS Drills</Link></li>
              <li className={isDarkMode ? 'text-gray-500' : 'text-gray-400'}>/</li>
              <li className={`font-medium ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>Pro Smooth Pursuit</li>
            </ol>
          </nav>
        )}
        
        {!isFullscreen && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl"><Crosshair className="w-6 h-6 text-white" /></div>
              <div><h1 className={`text-2xl sm:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Pro Smooth Pursuit</h1><p className={`text-sm sm:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Raw input • +1pt/2s • Lissajous curve • 360Hz • Free FPS tracking training</p></div>
            </div>
            <div className="flex gap-2">
              {gameState === 'playing' && (<button onClick={resetGame} className={`p-2 rounded-lg border ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`} title="Reset"><RefreshCw className="w-5 h-5" /></button>)}
              <button onClick={() => setIsDarkMode(!isDarkMode)} className={`p-2 rounded-lg border ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`}>{isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}</button>
              <button onClick={() => setIsBoxDarkMode(!isBoxDarkMode)} className={`p-2 rounded-lg border ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`}><Eye className="w-5 h-5" /></button>
              <button onClick={() => setSoundEnabled(!soundEnabled)} className={`p-2 rounded-lg border ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`}>{soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}</button>
              <button onClick={toggleFullscreen} className={`p-2 rounded-lg border ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`}>{isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}</button>
              <button onClick={pointerLocked ? () => { document.exitPointerLock(); setLockCooldown(true); setTimeout(() => setLockCooldown(false), 1000); } : requestPointerLock} className={`p-2 rounded-lg border ${pointerLocked ? 'bg-green-500 border-green-600 text-white' : isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`}><Lock className="w-5 h-5" /></button>
            </div>
          </div>
        )}

        <section className="sr-only" aria-label="Drill description">
          <h2>Free Pro Smooth Pursuit Tracking Drill - FPS Aim Training for Valorant CS2 Overwatch Apex</h2>
          <p>Train smooth aim tracking with this free Lissajous curve tracking drill at 360Hz. Uses Pointer Lock API for raw mouse input. Score +1 point every 2 seconds on target. Perfect for FPS gaming aim training in Valorant CS2 Overwatch Apex Legends and competitive shooters. No registration required.</p>
        </section>
        
        {!isFullscreen && (
          <div className="grid grid-cols-5 gap-3 mb-4 h-[88px]">
            <StatCard icon={<Target className="text-blue-600" />} value={score} label="Score" d={isDarkMode} />
            <StatCard icon={<Trophy className="text-yellow-500" />} value={bestScore} label="Best" d={isDarkMode} />
            <StatCard icon={<Timer className={timeLeft < 15 ? 'text-red-600' : 'text-green-600'} />} value={timeLeft} label="Time" unit="s" d={isDarkMode} />
            <StatCard icon={<Activity className="text-purple-500" />} value={trackingAccuracy} label="Accuracy" unit="%" d={isDarkMode} />
            <StatCard icon={<Zap className="text-orange-500" />} value={streak} label="Streak" d={isDarkMode} />
          </div>
        )}
        
        <div className="h-10 mb-2 flex justify-center items-center"><div className={`px-4 py-1.5 rounded-lg text-white font-semibold text-sm transition-all duration-200 ${feedback ? 'opacity-100 scale-100' : 'opacity-0 scale-95'} ${feedbackType === 'success' ? 'bg-green-500' : 'bg-yellow-500'}`}>{feedback || '\u00A0'}</div></div>
        
        <div ref={containerRef} className={`relative ${isFullscreen ? 'fixed inset-0 z-50' : 'rounded-xl border-2'}`} style={{ background: isBoxDarkMode ? '#020202' : '#f9fafb', aspectRatio: isFullscreen ? 'auto' : '16/9', maxWidth: '100%', margin: '0 auto', borderColor: isDarkMode ? '#374151' : '#e5e7eb', overflow: 'hidden', cursor: 'none' }}>
          {isFullscreen && gameState === 'playing' && (<div className="absolute top-4 right-4 z-20 pointer-events-none"><span className="text-white/40 text-xs font-medium bg-black/40 backdrop-blur-sm rounded-lg px-3 py-1.5">Press <span className="text-white/70 font-bold">ESC</span> to exit fullscreen</span></div>)}
          <canvas ref={canvasRef} style={{ display: 'block', position: 'absolute' }} />
          
          {gameState === 'start' && (
            <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
              <div className={`rounded-2xl p-6 sm:p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <Crosshair className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h2 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Pro Smooth Pursuit</h2>
                <p className={`mb-4 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Raw input • +1pt/2s • Lissajous curve • 360Hz • Max 30</p>
                <div className={`mb-6 p-3 rounded-lg border ${isBoxDarkMode ? 'border-yellow-600 bg-yellow-900/20' : 'border-yellow-200 bg-yellow-50'}`}>
                  <div className="flex items-center gap-2 mb-2"><AlertCircle className="w-4 h-4 text-yellow-500" /><p className={`text-sm font-medium ${isBoxDarkMode ? 'text-yellow-400' : 'text-yellow-700'}`}>Raw Input via Pointer Lock</p></div>
                  <p className={`text-xs ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Track the moving target with smooth mouse movements. +1pt every 2s on target. Perfect for FPS tracking practice.</p>
                </div>
                <button onClick={startGame} className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-lg w-full">Start Free Drill</button>
              </div>
            </div>
          )}
          
          {gameState === 'gameOver' && (
            <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
              <div className={`rounded-2xl p-6 sm:p-8 shadow-xl border max-w-[520px] mx-4 ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <div className="flex items-center justify-center gap-3 mb-4"><Trophy className="w-10 h-10 text-yellow-500" /><h2 className={`text-2xl font-bold ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Training Complete</h2></div>
                <p className={`text-center text-sm mb-4 ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Max possible: 30 points (60s ÷ 2s with perfect tracking). Keep practicing to improve smooth aim.</p>
                <div className="grid grid-cols-2 gap-3 mb-4"><RC label="Score" v={score} i={<Target className="w-4 h-4" />} c="blue" d={isBoxDarkMode} /><RC label="Best" v={bestScore} i={<Trophy className="w-4 h-4" />} c="yellow" d={isBoxDarkMode} /><RC label="Accuracy" v={bestAccuracy} u="%" i={<Activity className="w-4 h-4" />} c="purple" d={isBoxDarkMode} /><RC label="Streak" v={bestStreak} i={<Zap className="w-4 h-4" />} c="orange" d={isBoxDarkMode} /></div>
                <div className="flex gap-3"><Link href="/drills/fps" className="flex-1"><button className={`w-full px-4 py-2.5 rounded-lg font-semibold ${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'}`}>← Back</button></Link><button onClick={startGame} className="flex-1 px-4 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-semibold">Track Again →</button></div>
              </div>
            </div>
          )}
        </div>
        
        {/* 1. DRILL RULES */}
        {!isFullscreen && (
          <footer className="mt-6">
            <div className={`rounded-xl border overflow-hidden ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <div className={`px-4 py-3 border-b ${isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'}`}><div className="flex items-center gap-2"><Info className={`w-4 h-4 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} /><h2 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Drill Rules & Scoring</h2></div></div>
              <div className="p-5"><div className="grid grid-cols-1 md:grid-cols-3 gap-4"><div className="space-y-2"><h3 className={`font-semibold text-sm ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>How to Play</h3><ul className={`text-xs space-y-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}><li>Track the moving white target</li><li>Cursor locks for raw input</li><li>Green = on target</li></ul></div><div className="space-y-2"><h3 className={`font-semibold text-sm ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>Scoring</h3><ul className={`text-xs space-y-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}><li>+1 point every 2 seconds</li><li>Max 30 with perfect tracking</li><li>No penalties</li></ul></div><div className="space-y-2"><h3 className={`font-semibold text-sm ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`}>Pro Features</h3><ul className={`text-xs space-y-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}><li>Pointer Lock API</li><li>Lissajous curve 360Hz</li><li>Real-time accuracy</li></ul></div></div><div className={`mt-3 pt-3 border-t text-xs flex justify-between ${isDarkMode ? 'border-gray-700 text-gray-500' : 'border-gray-200 text-gray-400'}`}><span>🎯 Smooth pursuit tracking • 60 second challenge</span><span>🏆 Best Score saves locally • Free forever</span></div></div>
            </div>
          </footer>
        )}

        {/* 2. ABOUT THIS DRILL */}
        {!isFullscreen && (
          <section className="mt-8" aria-label="About this tracking drill">
            <div className={`rounded-xl border overflow-hidden ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <div className={`px-4 py-3 border-b ${isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'}`}><div className="flex items-center gap-2"><GraduationCap className={`w-5 h-5 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} /><h2 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>About This Free Tracking Drill</h2></div></div>
              <div className="p-5">
                <p className={`text-sm leading-relaxed mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>This pro-level smooth pursuit drill trains your ability to smoothly track moving targets using raw mouse input via the Pointer Lock API. The target follows a Lissajous curve at 360Hz for buttery-smooth motion. Perfect for FPS games like Valorant, CS2, Overwatch, and Apex Legends.</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                  <div className={`p-3 rounded-xl border ${isDarkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-green-50 border-green-100'}`}><div className="flex items-center gap-2 mb-1"><div className="w-7 h-7 rounded-lg bg-green-500 flex items-center justify-center"><GraduationCap className="w-3.5 h-3.5 text-white" /></div><h3 className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Who It's For</h3></div><p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Competitive FPS gamers, Valorant, CS2, Overwatch, Apex players wanting smoother tracking aim.</p></div>
                  <div className={`p-3 rounded-xl border ${isDarkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-emerald-50 border-emerald-100'}`}><div className="flex items-center gap-2 mb-1"><div className="w-7 h-7 rounded-lg bg-emerald-500 flex items-center justify-center"><TrendingUp className="w-3.5 h-3.5 text-white" /></div><h3 className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Skills Improved</h3></div><p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Smooth tracking, mouse control precision, hand-eye coordination, and target prediction.</p></div>
                  <div className={`p-3 rounded-xl border ${isDarkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-purple-50 border-purple-100'}`}><div className="flex items-center gap-2 mb-1"><div className="w-7 h-7 rounded-lg bg-purple-500 flex items-center justify-center"><BarChart3 className="w-3.5 h-3.5 text-white" /></div><h3 className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>What You'll Track</h3></div><p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Score, tracking accuracy percentage, streak duration, and best performance.</p></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className={`p-3 rounded-xl border ${isDarkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-yellow-50 border-yellow-100'}`}><div className="flex items-center gap-2 mb-2"><div className="w-7 h-7 rounded-lg bg-yellow-500 flex items-center justify-center"><Lightbulb className="w-3.5 h-3.5 text-white" /></div><h3 className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Why Practice Tracking?</h3></div><ul className={`text-xs space-y-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}><li className="flex items-start gap-1"><CheckCircle2 className="w-3 h-3 text-yellow-500 mt-0.5 flex-shrink-0" /> Essential for tracking weapons in FPS games</li><li className="flex items-start gap-1"><CheckCircle2 className="w-3 h-3 text-yellow-500 mt-0.5 flex-shrink-0" /> Improves mouse control and smoothness</li></ul></div>
                  <div className={`p-3 rounded-xl border ${isDarkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-amber-50 border-amber-100'}`}><div className="flex items-center gap-2 mb-2"><div className="w-7 h-7 rounded-lg bg-amber-500 flex items-center justify-center"><Clock className="w-3.5 h-3.5 text-white" /></div><h3 className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>How to Practice</h3></div><ol className={`text-xs space-y-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}><li className="flex items-start gap-1"><span className="w-4 h-4 rounded-full bg-amber-500 text-white text-xs flex items-center justify-center flex-shrink-0">1</span> Keep crosshair on target smoothly</li><li className="flex items-start gap-1"><span className="w-4 h-4 rounded-full bg-amber-500 text-white text-xs flex items-center justify-center flex-shrink-0">2</span> Practice 5-10 minutes daily</li></ol></div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 3. RELATED DRILLS */}
        {!isFullscreen && (
          <section className="mt-8" aria-label="Related training drills">
            <div className="flex items-center gap-2 mb-4"><div className="w-1 h-6 rounded-full bg-gradient-to-b from-green-500 to-emerald-600"></div><h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Explore Related Free Drills</h2></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link href="/drills/fps/pro-tracking" className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-blue-500' : 'bg-white border-gray-200 hover:border-blue-300'}`}><div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-500"></div><div className="p-4"><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center"><CrosshairIcon className="w-4 h-4 text-blue-600" /></div><span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">FPS Tracking</span></div><h3 className="font-semibold text-sm mb-1">Pro Tracking</h3><p className="text-xs text-gray-500">Advanced target tracking with unpredictable movement patterns.</p></div></Link>
              <Link href="/drills/fps/reactive-tracking" className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-purple-500' : 'bg-white border-gray-200 hover:border-purple-300'}`}><div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-violet-500"></div><div className="p-4"><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center"><Zap className="w-4 h-4 text-purple-600" /></div><span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">FPS Tracking</span></div><h3 className="font-semibold text-sm mb-1">Reactive Tracking</h3><p className="text-xs text-gray-500">React to direction changes with fast aim adjustments.</p></div></Link>
              <Link href="/drills/fps/flick-shot-training" className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-orange-500' : 'bg-white border-gray-200 hover:border-orange-300'}`}><div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-red-500"></div><div className="p-4"><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center"><Target className="w-4 h-4 text-orange-600" /></div><span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">FPS Aim</span></div><h3 className="font-semibold text-sm mb-1">Flick Shot Training</h3><p className="text-xs text-gray-500">Improve one-tap flick accuracy for Valorant and CS2.</p></div></Link>
              <Link href="/drills/fps/360fps-reflex" className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-red-500' : 'bg-white border-gray-200 hover:border-red-300'}`}><div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-rose-500"></div><div className="p-4"><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center"><Timer className="w-4 h-4 text-red-600" /></div><span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">FPS Reflex</span></div><h3 className="font-semibold text-sm mb-1">360 FPS Reflex</h3><p className="text-xs text-gray-500">Ultra-fast reflex training at 360 FPS for competitive gaming.</p></div></Link>
            </div>
          </section>
        )}

        {/* 4. GLOBAL FOOTER */}
        {!isFullscreen && (<footer className="mt-12 bg-gray-900 text-gray-400 rounded-xl py-10 px-6" role="contentinfo"><div className="max-w-7xl mx-auto"><div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 mb-8"><div><h3 className="text-white font-semibold mb-3 text-sm">FPS Training</h3><ul className="space-y-2 text-sm"><li><Link href="/drills/fps/flick-shot-training" className="hover:text-white transition-colors">Flick Shot Trainer</Link></li><li><Link href="/drills/fps/target-acquisition" className="hover:text-white transition-colors">Target Acquisition</Link></li><li><Link href="/drills/fps/reactive-tracking" className="hover:text-white transition-colors">Reactive Tracking</Link></li><li><Link href="/drills/fps" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">All 21 FPS Drills →</Link></li></ul></div><div><h3 className="text-white font-semibold mb-3 text-sm">Cognitive</h3><ul className="space-y-2 text-sm"><li><Link href="/drills/cognitive/memory/card-matching" className="hover:text-white transition-colors">Memory Games</Link></li><li><Link href="/drills/cognitive/attention/divided-attention" className="hover:text-white transition-colors">Attention Drills</Link></li><li><Link href="/drills/cognitive/problem-solving/logic-puzzles" className="hover:text-white transition-colors">Logic Puzzles</Link></li><li><Link href="/drills/cognitive" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">All 16 Cognitive Drills →</Link></li></ul></div><div><h3 className="text-white font-semibold mb-3 text-sm">Academic</h3><ul className="space-y-2 text-sm"><li><Link href="/drills/academic/writing-speed/typing-test" className="hover:text-white transition-colors">Typing Speed Test</Link></li><li><Link href="/drills/academic/reading-speed/speed-reader" className="hover:text-white transition-colors">Speed Reader</Link></li><li><Link href="/drills/academic/math-speed/mental-math" className="hover:text-white transition-colors">Mental Math</Link></li><li><Link href="/drills/academic" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">All 12 Academic Drills →</Link></li></ul></div><div><h3 className="text-white font-semibold mb-3 text-sm">Visual & Motor</h3><ul className="space-y-2 text-sm"><li><Link href="/drills/visual/reaction-speed/light-reaction" className="hover:text-white transition-colors">Reaction Time Test</Link></li><li><Link href="/drills/motor/hand-eye-coordination/aim-trainer" className="hover:text-white transition-colors">Hand-Eye Coordination</Link></li><li><Link href="/drills/visual/tracking-accuracy/moving-target" className="hover:text-white transition-colors">Moving Target Tracking</Link></li><li><Link href="/drills/visual" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">All 14 Visual Drills →</Link></li></ul></div><div><h3 className="text-white font-semibold mb-3 text-sm">More Categories</h3><ul className="space-y-2 text-sm"><li><Link href="/drills/memory" className="hover:text-white transition-colors">Memory (15 drills)</Link></li><li><Link href="/drills/productivity" className="hover:text-white transition-colors">Productivity (10 drills)</Link></li><li><Link href="/drills/mental-fitness" className="hover:text-white transition-colors">Mental Fitness (6 drills)</Link></li><li><Link href="/drills/physical" className="hover:text-white transition-colors">Physical (11 drills)</Link></li></ul></div></div><div className="border-t border-gray-800 pt-8 text-center"><div className="flex items-center justify-center gap-3 mb-4"><div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center"><Target className="w-5 h-5 text-white" /></div><span className="text-white font-bold text-lg">SkillDrills</span></div><p className="text-sm mb-2">&copy; 2026 SkillDrills. All rights reserved.</p><p className="text-xs max-w-2xl mx-auto leading-relaxed mb-6">Free online pro smooth pursuit tracking drill for FPS aim training. Track Lissajous curve targets at 360Hz with raw mouse input via Pointer Lock API. Perfect for Valorant CS2 Overwatch Apex Legends and competitive FPS gaming. No registration required. More free drills at skilldrills.online.</p><div className="flex items-center justify-center gap-5 flex-wrap"><button onClick={sharePage} className="text-gray-500 hover:text-white transition-colors" title="Share"><svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/></svg></button><button onClick={copyPageLink} className="text-gray-500 hover:text-white transition-colors" title="Copy link"><svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/></svg></button><a href="https://twitter.com/skilldrillss" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a><a href="https://instagram.com/skilldrills.online" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg></a><a href="https://youtube.com/@skilldrills.online" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg></a><a href="https://pinterest.com/skilldrills" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/></svg></a></div></div></div></footer>)}
      </div>
    </div>
  );
}

function StatCard({ icon, value, label, unit = '', d }) { return (<div className={`rounded-xl shadow-sm border p-2 sm:p-3 text-center flex flex-col justify-center h-full ${d ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}><div className="mb-1 flex justify-center">{icon}</div><p className={`text-lg sm:text-xl font-bold truncate ${d ? 'text-white' : 'text-gray-900'}`}>{value}{unit}</p><p className={`text-[10px] sm:text-xs truncate ${d ? 'text-gray-400' : 'text-gray-500'}`}>{label}</p></div>); }
function RC({ label, v, unit = '', i, c, d }) { const m = { blue: 'bg-blue-500/10 border-blue-500/30 text-blue-500', yellow: 'bg-yellow-500/10 border-yellow-500/30 text-yellow-500', orange: 'bg-orange-500/10 border-orange-500/30 text-orange-500', purple: 'bg-purple-500/10 border-purple-500/30 text-purple-500' }; const o = m[c] || m.blue; const [bg, border, text] = o.split(' '); return (<div className={`flex items-center justify-between p-3 rounded-lg border ${bg} ${border}`}><div className="flex items-center gap-2"><div className={text}>{i}</div><span className={`text-xs sm:text-sm ${d ? 'text-gray-300' : 'text-gray-600'}`}>{label}</span></div><span className={`font-bold text-base sm:text-lg ${text}`}>{v}{unit}</span></div>); }