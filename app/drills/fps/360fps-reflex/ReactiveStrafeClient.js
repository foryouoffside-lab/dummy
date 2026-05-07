'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  Target, Zap, Timer, Trophy, 
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, Eye,
  Info, Activity,
  Lock, AlertCircle
} from 'lucide-react';

const SCORE_INTERVAL = 800; // +1 point every 800ms on target

export default function ReactiveStrafeClient() {
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
  const [trackingAccuracy, setTrackingAccuracy] = useState(100);
  const [combo, setCombo] = useState(0);
  const [bestCombo, setBestCombo] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [speed, setSpeed] = useState(18);
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const [pointerLocked, setPointerLocked] = useState(false);
  const [lockCooldown, setLockCooldown] = useState(false);
  
  const targetRef = useRef({ x: 0, y: 0, size: 60, speed: 18, direction: 1, changeChance: 0.02 });
  const virtualCrosshair = useRef({ x: 0, y: 0 });
  const canvasSizeRef = useRef({ width: 0, height: 0 });
  const scoreRef = useRef(0);
  const comboRef = useRef(0);
  const timerIntervalRef = useRef(null);
  const feedbackTimeoutRef = useRef(null);
  const isActiveRef = useRef(false);
  const gameStateRef = useRef('start');
  const audioCtxRef = useRef(null);
  const timeLeftRef = useRef(60);
  const trackingIntervalRef = useRef(null);
  const bestComboRef = useRef(0);
  const trackingAccumulatorRef = useRef(0);
  const fixedYRef = useRef(0);
  const isOnTargetRef = useRef(false);

  useEffect(() => { setIsClient(true); const timer = setTimeout(() => setLoading(false), 300); return () => clearTimeout(timer); }, []);

  useEffect(() => {
    try { const s = localStorage.getItem('strafeDrillBestScore'); if (s) { const p = parseInt(s, 10); if (!isNaN(p)) setBestScore(p); } } catch (e) {}
  }, []);

  const updateBestScore = useCallback((finalScore) => {
    try { const c = parseInt(localStorage.getItem('strafeDrillBestScore') || '0', 10); if (finalScore > c) { localStorage.setItem('strafeDrillBestScore', finalScore.toString()); setBestScore(finalScore); } } catch (e) {}
  }, []);

  useEffect(() => { gameStateRef.current = gameState; }, [gameState]);

  const showFeedback = useCallback((m, t) => { if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current); setFeedback(m); setFeedbackType(t); feedbackTimeoutRef.current = setTimeout(() => { setFeedback(''); setFeedbackType(''); }, 600); }, []);
  const initAudio = useCallback(() => { try { if (!audioCtxRef.current) audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)(); if (audioCtxRef.current.state === 'suspended') audioCtxRef.current.resume(); return audioCtxRef.current; } catch (e) { return null; } }, []);
  const playSound = useCallback((type) => { if (!soundEnabled) return; try { const ctx = initAudio(); if (!ctx) return; const o = ctx.createOscillator(), g = ctx.createGain(); o.connect(g); g.connect(ctx.destination); const now = ctx.currentTime; o.frequency.setValueAtTime(type === 'combo' ? 1046 : 880, now); g.gain.setValueAtTime(type === 'combo' ? 0.12 : 0.08, now); g.gain.exponentialRampToValueAtTime(0.001, now + 0.1); o.start(now); o.stop(now + 0.1); } catch (e) {} }, [soundEnabled, initAudio]);

  const toggleFullscreen = useCallback(async () => { try { if (!isFullscreen) { const el = containerRef.current; if (el?.requestFullscreen) { await el.requestFullscreen(); setIsFullscreen(true); } } else { if (document.fullscreenElement) await document.exitFullscreen(); setIsFullscreen(false); } } catch (e) {} }, [isFullscreen]);
  useEffect(() => { const h = () => setIsFullscreen(!!document.fullscreenElement); document.addEventListener('fullscreenchange', h); return () => document.removeEventListener('fullscreenchange', h); }, []);

  const requestPointerLock = useCallback(() => { if (!lockCooldown && canvasRef.current) canvasRef.current.requestPointerLock(); }, [lockCooldown]);
  
  useEffect(() => {
    const h = () => { const l = document.pointerLockElement === canvasRef.current; setPointerLocked(l); if (!l && gameState === 'playing') { setLockCooldown(true); setTimeout(() => setLockCooldown(false), 1000); } };
    const e = () => { setLockCooldown(true); setTimeout(() => setLockCooldown(false), 1000); };
    document.addEventListener('pointerlockchange', h); document.addEventListener('pointerlockerror', e);
    return () => { document.removeEventListener('pointerlockchange', h); document.removeEventListener('pointerlockerror', e); };
  }, [gameState]);

  useEffect(() => { const c = canvasRef.current; if (!c) return; const h = () => { if (gameState === 'playing' && !pointerLocked && !lockCooldown) requestPointerLock(); }; c.addEventListener('click', h); return () => c.removeEventListener('click', h); }, [gameState, pointerLocked, requestPointerLock, lockCooldown]);

  useEffect(() => {
    const h = (e) => {
      const cvs = canvasRef.current; if (!cvs) return;
      if (document.pointerLockElement === cvs) { virtualCrosshair.current.x += e.movementX || 0; virtualCrosshair.current.y += e.movementY || 0; }
      virtualCrosshair.current.x = Math.max(0, Math.min(cvs.width, virtualCrosshair.current.x));
      virtualCrosshair.current.y = Math.max(0, Math.min(cvs.height, virtualCrosshair.current.y));
    };
    window.addEventListener('mousemove', h); return () => window.removeEventListener('mousemove', h);
  }, []);

  const startTimer = useCallback(() => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    timerIntervalRef.current = setInterval(() => {
      if (gameStateRef.current === 'playing' && isActiveRef.current) { timeLeftRef.current -= 1; setTimeLeft(timeLeftRef.current); if (timeLeftRef.current <= 0) { clearInterval(timerIntervalRef.current); timerIntervalRef.current = null; if (trackingIntervalRef.current) clearInterval(trackingIntervalRef.current); setGameState('gameOver'); gameStateRef.current = 'gameOver'; isActiveRef.current = false; updateBestScore(scoreRef.current); document.exitPointerLock(); } }
    }, 1000);
  }, [updateBestScore]);

  // Fixed: Accumulator-based scoring every 800ms when on target
  useEffect(() => {
    if (gameState !== 'playing') { if (trackingIntervalRef.current) clearInterval(trackingIntervalRef.current); return; }
    trackingIntervalRef.current = setInterval(() => {
      if (!isActiveRef.current) return;
      const t = targetRef.current, ch = virtualCrosshair.current;
      const dist = Math.hypot(ch.x - t.x, ch.y - t.y);
      const radius = t.size / 2;
      isOnTargetRef.current = dist <= radius + 5; // Slightly forgiving
      
      // Calculate accuracy for display
      const ca = Math.max(0, Math.min(100, Math.round(100 - (dist / (radius + 10)) * 100)));
      setTrackingAccuracy(ca);
      
      if (isOnTargetRef.current) {
        trackingAccumulatorRef.current += 50; // 50ms per check
        comboRef.current++; setCombo(comboRef.current);
        if (comboRef.current > bestComboRef.current) { bestComboRef.current = comboRef.current; setBestCombo(bestComboRef.current); }
        
        while (trackingAccumulatorRef.current >= SCORE_INTERVAL) {
          scoreRef.current += 1; setScore(scoreRef.current);
          trackingAccumulatorRef.current -= SCORE_INTERVAL;
          playSound('combo');
          showFeedback('✓ +1', 'success');
          if (comboRef.current % 5 === 0) { showFeedback(`🔥 ${comboRef.current} Combo!`, 'success'); }
        }
        
        // Adaptive speed
        if (ca > 70 && t.speed < 35) { t.speed = Math.min(35, t.speed + 0.1); setSpeed(Math.floor(t.speed)); }
        else if (ca < 30 && t.speed > 12) { t.speed = Math.max(12, t.speed - 0.05); setSpeed(Math.floor(t.speed)); }
      } else {
        trackingAccumulatorRef.current = 0;
        if (comboRef.current > 0) { comboRef.current = 0; setCombo(0); }
      }
    }, 50);
    return () => { if (trackingIntervalRef.current) clearInterval(trackingIntervalRef.current); };
  }, [gameState, playSound, showFeedback]);

  // Render loop
  useEffect(() => {
    if (gameState !== 'playing') return;
    const cvs = canvasRef.current; if (!cvs) return;
    const ctx = cvs.getContext('2d');
    
    const updateCanvasSize = () => {
      const cr = containerRef.current; if (!cr) return;
      const rr = cr.getBoundingClientRect();
      let w = rr.width, h = w * (9 / 16);
      if (h > rr.height) { h = rr.height; w = h * (16 / 9); }
      cvs.width = w; cvs.height = h; canvasSizeRef.current = { width: w, height: h };
      cvs.style.position = 'absolute'; cvs.style.left = `${(rr.width - w) / 2}px`; cvs.style.top = `${(rr.height - h) / 2}px`;
      fixedYRef.current = h * 0.65;
      virtualCrosshair.current = { x: w / 2, y: h / 2 };
      if (targetRef.current.x === 0) targetRef.current = { x: w / 2, y: fixedYRef.current, size: 60, speed: 18, direction: 1, changeChance: 0.02 };
    };
    updateCanvasSize();
    
    const ro = new ResizeObserver(updateCanvasSize);
    if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener('resize', updateCanvasSize);
    
    function updateTarget() {
      if (!isActiveRef.current) return;
      const t = targetRef.current, r = t.size / 2;
      t.y = fixedYRef.current;
      if (Math.random() < t.changeChance) t.direction *= -1;
      t.x += t.speed * t.direction;
      if (t.x - r < 0) { t.x = r; t.direction = 1; }
      else if (t.x + r > cvs.width) { t.x = cvs.width - r; t.direction = -1; }
    }
    
    function draw() {
      ctx.fillStyle = isBoxDarkMode ? '#020202' : '#f9fafb'; ctx.fillRect(0, 0, cvs.width, cvs.height);
      ctx.strokeStyle = isBoxDarkMode ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)'; ctx.lineWidth = 1;
      for (let i = 0; i < cvs.width; i += 40) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, cvs.height); ctx.stroke(); }
      
      // Guide line
      ctx.beginPath(); ctx.moveTo(0, fixedYRef.current); ctx.lineTo(cvs.width, fixedYRef.current);
      ctx.strokeStyle = isBoxDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'; ctx.setLineDash([5, 10]); ctx.stroke(); ctx.setLineDash([]);
      
      // Target
      const t = targetRef.current, rad = t.size / 2, ch = virtualCrosshair.current;
      const dist = Math.hypot(ch.x - t.x, ch.y - t.y);
      const isHit = dist <= rad + 5;
      
      ctx.shadowBlur = isHit ? 12 : 0; ctx.shadowColor = '#00ff88';
      ctx.beginPath(); ctx.arc(t.x, t.y, rad, 0, Math.PI * 2);
      const g = ctx.createLinearGradient(t.x - 20, t.y - 20, t.x + 20, t.y + 20);
      g.addColorStop(0, '#FFFFFF'); g.addColorStop(1, '#E0E0E0'); ctx.fillStyle = g; ctx.fill();
      ctx.shadowBlur = 0;
      
      // Pupil
      ctx.beginPath(); ctx.arc(t.x, t.y, 5, 0, Math.PI * 2); ctx.fillStyle = '#000000'; ctx.fill();
      
      // Highlight
      ctx.beginPath(); ctx.arc(t.x - 10, t.y - 10, 6, 0, Math.PI * 2); ctx.fillStyle = 'rgba(255,255,255,0.7)'; ctx.fill();
      
      // Tracking ring
      if (isHit) { ctx.beginPath(); ctx.arc(t.x, t.y, rad + 3, 0, Math.PI * 2); ctx.strokeStyle = dist <= 5 ? '#00ff88' : '#ffaa00'; ctx.lineWidth = 2; ctx.stroke(); }
      
      // Professional crosshair
      if (ch.x > 0 && ch.x < cvs.width && ch.y > 0 && ch.y < cvs.height) {
        const cc = isHit ? '#00ff88' : 'rgba(255,255,255,0.6)', lc = pointerLocked ? cc : 'rgba(255,255,255,0.4)';
        ctx.strokeStyle = lc; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.arc(ch.x, ch.y, 12, 0, Math.PI * 2); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(ch.x - 24, ch.y); ctx.lineTo(ch.x - 10, ch.y); ctx.moveTo(ch.x + 10, ch.y); ctx.lineTo(ch.x + 24, ch.y); ctx.moveTo(ch.x, ch.y - 24); ctx.lineTo(ch.x, ch.y - 10); ctx.moveTo(ch.x, ch.y + 10); ctx.lineTo(ch.x, ch.y + 24); ctx.stroke();
        ctx.fillStyle = lc; ctx.beginPath(); ctx.arc(ch.x, ch.y, 3, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.moveTo(ch.x, ch.y); ctx.lineTo(t.x, t.y); ctx.strokeStyle = `rgba(0,255,136,${0.15 + (isHit ? 0.2 : 0)})`; ctx.lineWidth = 1; ctx.stroke();
      }
    }
    
    function loop() { updateTarget(); draw(); animationRef.current = requestAnimationFrame(loop); }
    animationRef.current = requestAnimationFrame(loop);
    
    return () => { cancelAnimationFrame(animationRef.current); window.removeEventListener('resize', updateCanvasSize); ro.disconnect(); };
  }, [gameState, isBoxDarkMode, pointerLocked]);

  const startGame = useCallback(() => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (trackingIntervalRef.current) clearInterval(trackingIntervalRef.current);
    setGameState('playing'); gameStateRef.current = 'playing';
    setScore(0); setTrackingAccuracy(100); setCombo(0); setBestCombo(0);
    timeLeftRef.current = 60; setTimeLeft(60); setSpeed(18); setFeedback('');
    isActiveRef.current = true; scoreRef.current = 0; comboRef.current = 0; bestComboRef.current = 0;
    trackingAccumulatorRef.current = 0;
    setTimeout(() => requestPointerLock(), 300);
    startTimer();
  }, [startTimer, requestPointerLock]);

  const resetGame = useCallback(() => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (trackingIntervalRef.current) clearInterval(trackingIntervalRef.current);
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    isActiveRef.current = false; setGameState('start'); gameStateRef.current = 'start';
    setScore(0); setTrackingAccuracy(100); setCombo(0); setBestCombo(0);
    timeLeftRef.current = 60; setTimeLeft(60); setSpeed(18); setFeedback('');
    document.exitPointerLock();
    setLockCooldown(true); setTimeout(() => setLockCooldown(false), 1000);
  }, []);

  useEffect(() => () => { if (timerIntervalRef.current) clearInterval(timerIntervalRef.current); if (trackingIntervalRef.current) clearInterval(trackingIntervalRef.current); if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current); if (animationRef.current) cancelAnimationFrame(animationRef.current); document.exitPointerLock(); }, []);

  if (loading || !isClient) return (<div className="min-h-screen flex items-center justify-center bg-gray-50"><div className="w-16 h-16 border-4 border-orange-600 border-t-transparent rounded-full animate-spin mx-auto" /></div>);

  return (
    <div className={`min-h-screen select-none ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!isFullscreen && (<nav className="mb-4"><ol className="flex flex-wrap items-center gap-2 text-sm"><li><Link href="/" className={`hover:underline ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>Home</Link></li><li className={isDarkMode ? 'text-gray-500' : 'text-gray-400'}>/</li><li><Link href="/drills/fps" className={`hover:underline ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>FPS Drills</Link></li><li className={isDarkMode ? 'text-gray-500' : 'text-gray-400'}>/</li><li className={`font-medium ${isDarkMode ? 'text-orange-400' : 'text-orange-600'}`}>Reactive Strafe Tracking</li></ol></nav>)}
        {!isFullscreen && (<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6"><div className="flex items-center gap-3"><div className="p-3 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl"><Target className="w-6 h-6 text-white" /></div><div><h1 className={`text-2xl sm:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Reactive Strafe Tracking</h1><p className={`text-sm sm:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{pointerLocked ? '🟢 Raw input active' : '🔴 Click canvas'} • +1pt/800ms • Adaptive speed • ~75 max</p></div></div><div className="flex gap-2"><button onClick={() => setIsDarkMode(!isDarkMode)} className={`p-2 rounded-lg border ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`}>{isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}</button><button onClick={() => setIsBoxDarkMode(!isBoxDarkMode)} className={`p-2 rounded-lg border ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`}><Eye className="w-5 h-5" /></button><button onClick={() => setSoundEnabled(!soundEnabled)} className={`p-2 rounded-lg border ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`}>{soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}</button><button onClick={toggleFullscreen} className={`p-2 rounded-lg border ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`}>{isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}</button><button onClick={pointerLocked ? () => { document.exitPointerLock(); setLockCooldown(true); setTimeout(() => setLockCooldown(false), 1000); } : requestPointerLock} className={`p-2 rounded-lg border ${pointerLocked ? 'bg-green-500 border-green-600 text-white' : isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`}><Lock className="w-5 h-5" /></button></div></div>)}
        {!isFullscreen && (<div className="grid grid-cols-5 gap-3 mb-4 h-[88px]"><StatCard icon={<Target className="text-blue-600" />} value={score} label="Score" d={isDarkMode} /><StatCard icon={<Trophy className="text-yellow-500" />} value={bestScore} label="Best" d={isDarkMode} /><StatCard icon={<Timer className={timeLeft <= 10 ? 'text-red-600' : 'text-green-600'} />} value={timeLeft} label="Time" unit="s" d={isDarkMode} /><StatCard icon={<Zap className="text-orange-500" />} value={combo} label="Combo" d={isDarkMode} /><StatCard icon={<Target className="text-cyan-500" />} value={speed} label="Speed" unit="px/s" d={isDarkMode} /></div>)}
        <div className="h-10 mb-2 flex justify-center items-center"><div className={`px-4 py-1.5 rounded-lg text-white font-semibold text-sm transition-all duration-200 ${feedback ? 'opacity-100 scale-100' : 'opacity-0 scale-95'} ${feedbackType === 'success' ? 'bg-green-500' : 'bg-gray-500'}`}>{feedback || '\u00A0'}</div></div>
        <div ref={containerRef} className={`relative ${isFullscreen ? 'fixed inset-0 z-50' : 'rounded-xl border-2'}`} style={{ background: isBoxDarkMode ? '#020202' : '#ffffff', aspectRatio: isFullscreen ? 'auto' : '16/9', maxWidth: '100%', margin: '0 auto', borderColor: isDarkMode ? '#374151' : '#e5e7eb', overflow: 'hidden', cursor: 'none' }}>
          {isFullscreen && gameState === 'playing' && (<div className="absolute top-4 right-4 z-20 pointer-events-none"><span className="text-white/40 text-xs font-medium bg-black/40 backdrop-blur-sm rounded-lg px-3 py-1.5">Press <span className="text-white/70 font-bold">ESC</span> to exit fullscreen</span></div>)}
          <canvas ref={canvasRef} style={{ display: 'block', position: 'absolute' }} />
          {gameState === 'start' && (<div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}><div className={`rounded-2xl p-6 sm:p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}><Target className="w-16 h-16 text-orange-500 mx-auto mb-4" /><h2 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Reactive Strafe Tracking</h2><p className={`mb-4 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Raw input • +1pt/800ms • Adaptive speed • ~75 max</p><div className={`mb-6 p-3 rounded-lg border ${isBoxDarkMode ? 'border-yellow-600 bg-yellow-900/20' : 'border-yellow-200 bg-yellow-50'}`}><div className="flex items-center gap-2 mb-2"><AlertCircle className="w-4 h-4 text-yellow-500" /><p className={`text-sm font-medium ${isBoxDarkMode ? 'text-yellow-400' : 'text-yellow-700'}`}>Raw Input via Pointer Lock</p></div><p className={`text-xs ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Track the target. +1pt/800ms on target. Adaptive speed 12-35px/s. Press ESC to unlock.</p></div><button onClick={startGame} className="px-8 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl font-semibold hover:shadow-lg w-full">Start Training</button><button onClick={resetGame} className="mt-3 w-full px-4 py-2 rounded-lg border border-gray-500 text-gray-400 hover:bg-gray-700 transition-all text-sm">Reset Session</button></div></div>)}
          {gameState === 'gameOver' && (<div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}><div className={`rounded-2xl p-6 sm:p-8 shadow-xl border max-w-[520px] mx-4 ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}><div className="flex items-center justify-center gap-3 mb-4"><Trophy className="w-10 h-10 text-yellow-500" /><h2 className={`text-2xl font-bold ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Training Complete</h2></div><div className="grid grid-cols-2 gap-3 mb-4"><RC label="Score" v={score} i={<Target className="w-4 h-4" />} c="blue" d={isBoxDarkMode} /><RC label="Best" v={bestScore} i={<Trophy className="w-4 h-4" />} c="yellow" d={isBoxDarkMode} /><RC label="Combo" v={bestCombo} i={<Zap className="w-4 h-4" />} c="orange" d={isBoxDarkMode} /><RC label="Speed" v={speed} u="px/s" i={<Target className="w-4 h-4" />} c="cyan" d={isBoxDarkMode} /></div><div className="flex gap-3"><Link href="/drills/fps" className="flex-1"><button className={`w-full px-4 py-2.5 rounded-lg font-semibold ${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'}`}>← Back</button></Link><button onClick={startGame} className="flex-1 px-4 py-2.5 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg font-semibold">Track Again →</button></div></div></div>)}
        </div>
        {!isFullscreen && (<footer className="mt-6"><div className={`rounded-xl border overflow-hidden ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}><div className={`px-4 py-3 border-b ${isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'}`}><div className="flex items-center gap-2"><Info className={`w-4 h-4 ${isDarkMode ? 'text-orange-400' : 'text-orange-600'}`} /><h2 className={`font-semibold text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Drill Rules & Professional Features</h2></div></div><div className="p-6"><div className="grid grid-cols-1 md:grid-cols-3 gap-6"><div className="space-y-3"><h3 className={`font-semibold ${isDarkMode ? 'text-orange-400' : 'text-orange-600'}`}>How to Play</h3><ul className={`space-y-2 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}><li>• Track the horizontally moving target</li><li>• Cursor locks for raw input</li><li>• Score anywhere on the ball</li><li>• Speed adapts to your accuracy</li></ul></div><div className="space-y-3"><h3 className={`font-semibold ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>Scoring</h3><ul className={`space-y-2 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}><li>• +1 point every 800ms on target</li><li>• ~75 max with perfect tracking</li><li>• Combo streak bonuses</li><li>• No penalties</li></ul></div><div className="space-y-3"><h3 className={`font-semibold ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`}>Pro Features</h3><ul className={`space-y-2 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}><li>• Pointer Lock API</li><li>• Adaptive speed 12-35px/s</li><li>• Horizontal strafe tracking</li><li>• Best score saved</li></ul></div></div></div></div></footer>)}
      </div>
    </div>
  );
}

function StatCard({ icon, value, label, unit = '', d }) { return (<div className={`rounded-xl shadow-sm border p-2 sm:p-3 text-center flex flex-col justify-center h-full ${d ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}><div className="mb-1 flex justify-center">{icon}</div><p className={`text-lg sm:text-xl font-bold truncate ${d ? 'text-white' : 'text-gray-900'}`}>{value}{unit}</p><p className={`text-[10px] sm:text-xs truncate ${d ? 'text-gray-400' : 'text-gray-500'}`}>{label}</p></div>); }
function RC({ label, v, unit = '', i, c, d }) { const m = { blue: 'bg-blue-500/10 border-blue-500/30 text-blue-500', yellow: 'bg-yellow-500/10 border-yellow-500/30 text-yellow-500', orange: 'bg-orange-500/10 border-orange-500/30 text-orange-500', cyan: 'bg-cyan-500/10 border-cyan-500/30 text-cyan-500' }; const o = m[c] || m.blue; const [bg, border, text] = o.split(' '); return (<div className={`flex items-center justify-between p-3 rounded-lg border ${bg} ${border}`}><div className="flex items-center gap-2"><div className={text}>{i}</div><span className={`text-xs sm:text-sm ${d ? 'text-gray-300' : 'text-gray-600'}`}>{label}</span></div><span className={`font-bold text-base sm:text-lg ${text}`}>{v}{unit}</span></div>); }