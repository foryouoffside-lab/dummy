'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  Eye, Zap, Timer, Trophy, Volume2, VolumeX, Sun, Moon, 
  Target, Activity, Maximize2, Minimize2,
  Heart, Check, Info, RefreshCw,
  GraduationCap, Lightbulb, TrendingUp, Clock, BarChart3, CheckCircle2,
  Brain, Users, Star, ArrowRight, Share2, Copy, Lock, AlertCircle
} from 'lucide-react';

const BALL_RADIUS = 50;
const colorPalette = { GO: "#00ff77", NO_GO: "#ff3344" };

export default function ChromaSyncClient() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  
  const [gameState, setGameState] = useState('start');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isBoxDarkMode, setIsBoxDarkMode] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [bestReaction, setBestReaction] = useState(0);
  const [displayWindow, setDisplayWindow] = useState(250);
  const [timeLeft, setTimeLeft] = useState(60);
  const [lives, setLives] = useState(3);
  const [successfulHits, setSuccessfulHits] = useState(0);
  const [feedbackMsg, setFeedbackMsg] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const [pointerLocked, setPointerLocked] = useState(false);

  const virtualCrosshair = useRef({ x: 0, y: 0 });
  const crosshairInitRef = useRef(false);
  const stateRef = useRef("WAITING");
  const currentTargetColorRef = useRef("#020202");
  const startTimeRef = useRef(0);
  const displayTimeRef = useRef(250);
  const minDisplayTime = 80;
  const maxDisplayTime = 400;
  const streakRef = useRef(0);
  const scoreRef = useRef(0);
  const livesRef = useRef(3);
  const initializedRef = useRef(false);
  const feedbackTimeoutRef = useRef(null);
  const cycleTimeoutRef = useRef(null);
  const signalTimeoutRef = useRef(null);
  const timerIntervalRef = useRef(null);
  const isActiveRef = useRef(false);
  const gameStateRef = useRef('start');
  const audioCtxRef = useRef(null);
  const bestStreakRef = useRef(0);
  const canvasSizeRef = useRef({ width: 0, height: 0 });

  useEffect(() => { setIsClient(true); const timer = setTimeout(() => setLoading(false), 300); return () => clearTimeout(timer); }, []);
  useEffect(() => { try { const saved = localStorage.getItem('chromaSyncBest'); if (saved) { const p = parseInt(saved, 10); if (!isNaN(p)) setBestScore(p); } } catch (e) {} }, []);
  useEffect(() => { gameStateRef.current = gameState; }, [gameState]);

  const updateBestScore = useCallback((fs) => { try { const c = parseInt(localStorage.getItem('chromaSyncBest') || '0', 10); if (fs > c) { localStorage.setItem('chromaSyncBest', fs.toString()); setBestScore(fs); } } catch (e) {} }, []);
  const showFeedback = useCallback((m, t) => { if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current); setFeedbackMsg(m); setFeedbackType(t); feedbackTimeoutRef.current = setTimeout(() => { setFeedbackMsg(''); setFeedbackType(''); }, 600); }, []);
  const initAudio = useCallback(() => { try { if (!audioCtxRef.current) audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)(); if (audioCtxRef.current.state === 'suspended') audioCtxRef.current.resume(); return audioCtxRef.current; } catch (e) { return null; } }, []);
  const playSound = useCallback((type) => { if (!soundEnabled) return; try { const ctx = initAudio(); if (!ctx) return; const o = ctx.createOscillator(), g = ctx.createGain(); o.connect(g); g.connect(ctx.destination); const now = ctx.currentTime; const f = { success: 880, fail: 440, streak: 1046, inhibit: 660 }; o.frequency.setValueAtTime(f[type] || 440, now); g.gain.setValueAtTime(type === 'streak' ? 0.12 : type === 'inhibit' ? 0.08 : 0.1, now); g.gain.exponentialRampToValueAtTime(0.001, now + 0.12); o.start(now); o.stop(now + 0.12); } catch (e) {} }, [soundEnabled, initAudio]);

  // Pointer Lock
  const requestPointerLock = useCallback(() => { canvasRef.current?.requestPointerLock(); }, []);
  
  useEffect(() => {
    const h = () => {
      const l = document.pointerLockElement === canvasRef.current;
      setPointerLocked(l);
      if (l) crosshairInitRef.current = true;
      else if (gameState === 'playing') showFeedback('Cursor unlocked - Click canvas', 'error');
    };
    document.addEventListener('pointerlockchange', h);
    document.addEventListener('pointerlockerror', () => showFeedback('Lock failed', 'error'));
    return () => { document.removeEventListener('pointerlockchange', h); };
  }, [gameState, showFeedback]);

  useEffect(() => {
    const c = canvasRef.current; if (!c) return;
    const h = () => { if (gameState === 'playing' && !pointerLocked) requestPointerLock(); };
    c.addEventListener('click', h);
    return () => c.removeEventListener('click', h);
  }, [gameState, pointerLocked, requestPointerLock]);

  // Raw input
  useEffect(() => {
    const h = (e) => {
      if (document.pointerLockElement !== canvasRef.current) return;
      virtualCrosshair.current.x += e.movementX || 0;
      virtualCrosshair.current.y += e.movementY || 0;
      const c = canvasRef.current;
      if (c) { virtualCrosshair.current.x = Math.max(0, Math.min(c.width, virtualCrosshair.current.x)); virtualCrosshair.current.y = Math.max(0, Math.min(c.height, virtualCrosshair.current.y)); }
    };
    document.addEventListener('mousemove', h);
    return () => document.removeEventListener('mousemove', h);
  }, []);

  const toggleFullscreen = useCallback(async () => { try { if (!isFullscreen) { const el = containerRef.current; if (el?.requestFullscreen) { await el.requestFullscreen(); setIsFullscreen(true); } } else { if (document.fullscreenElement) await document.exitFullscreen(); setIsFullscreen(false); } } catch (e) {} }, [isFullscreen]);
  useEffect(() => { const h = () => setIsFullscreen(!!document.fullscreenElement); document.addEventListener('fullscreenchange', h); return () => document.removeEventListener('fullscreenchange', h); }, []);

  const sharePage = async () => { if (navigator.share) { try { await navigator.share({ title: 'Chroma-Sync Lab | SkillDrills', text: 'Train impulse control with Go/No-Go color response.', url: 'https://skilldrills.online/drills/visual/response-inhibition/chroma-sync' }); } catch (e) {} } else { navigator.clipboard.writeText('https://skilldrills.online/drills/visual/response-inhibition/chroma-sync'); } };
  const copyPageLink = () => { navigator.clipboard.writeText('https://skilldrills.online/drills/visual/response-inhibition/chroma-sync'); };

  const isMouseOverBall = useCallback((mx, my, cx, cy) => Math.hypot(mx - cx, my - cy) <= BALL_RADIUS, []);

  const startCycle = useCallback(() => {
    if (!isActiveRef.current) return;
    if (cycleTimeoutRef.current) clearTimeout(cycleTimeoutRef.current);
    if (signalTimeoutRef.current) clearTimeout(signalTimeoutRef.current);
    stateRef.current = "WAITING";
    currentTargetColorRef.current = isBoxDarkMode ? "#151515" : "#d1d5db";
    const delay = 600 + Math.random() * 900;
    cycleTimeoutRef.current = setTimeout(() => {
      if (stateRef.current !== "WAITING" || gameStateRef.current !== 'playing' || !isActiveRef.current) return;
      stateRef.current = "SIGNAL";
      const isGo = Math.random() < 0.5;
      if (isGo) {
        currentTargetColorRef.current = colorPalette.GO;
        startTimeRef.current = performance.now();
        signalTimeoutRef.current = setTimeout(() => { if (stateRef.current === "SIGNAL" && currentTargetColorRef.current === colorPalette.GO && isActiveRef.current) { stateRef.current = "WAITING"; startCycle(); } }, displayTimeRef.current);
      } else {
        currentTargetColorRef.current = colorPalette.NO_GO;
        signalTimeoutRef.current = setTimeout(() => {
          if (stateRef.current === "SIGNAL" && isActiveRef.current) {
            stateRef.current = "WAITING";
            streakRef.current++; setStreak(streakRef.current);
            if (streakRef.current > bestStreakRef.current) { bestStreakRef.current = streakRef.current; setBestStreak(streakRef.current); }
            playSound('inhibit');
            showFeedback('✓ Good restraint!', 'success');
            startCycle();
          }
        }, displayTimeRef.current);
      }
    }, delay);
  }, [isBoxDarkMode, playSound, showFeedback]);

  const applyPenalty = useCallback((reason) => {
    if (!isActiveRef.current) return;
    streakRef.current = 0; setStreak(0);
    if (livesRef.current > 0) { livesRef.current -= 1; setLives(livesRef.current); showFeedback(`✗ ${reason}! -1 life`, 'error'); playSound('fail'); if (livesRef.current === 0) { scoreRef.current = Math.max(0, scoreRef.current - 1); setScore(scoreRef.current); showFeedback('⚠️ No lives! -1 point', 'warning'); } }
    else { scoreRef.current = Math.max(0, scoreRef.current - 1); setScore(scoreRef.current); showFeedback(`✗ ${reason}! -1 point`, 'error'); playSound('fail'); }
    displayTimeRef.current = Math.min(maxDisplayTime, displayTimeRef.current + 40); setDisplayWindow(displayTimeRef.current);
  }, [playSound, showFeedback]);

  // Timer
  useEffect(() => {
    if (gameState !== 'playing') return;
    timerIntervalRef.current = setInterval(() => { setTimeLeft(prev => { if (prev <= 1) { setGameState('gameOver'); gameStateRef.current = 'gameOver'; isActiveRef.current = false; if (cycleTimeoutRef.current) clearTimeout(cycleTimeoutRef.current); if (signalTimeoutRef.current) clearTimeout(signalTimeoutRef.current); if (timerIntervalRef.current) { clearInterval(timerIntervalRef.current); timerIntervalRef.current = null; } updateBestScore(scoreRef.current); document.exitPointerLock(); return 0; } return prev - 1; }); }, 1000);
    return () => { if (timerIntervalRef.current) { clearInterval(timerIntervalRef.current); timerIntervalRef.current = null; } };
  }, [gameState, updateBestScore]);

  // Initialize cycle on first mouse move after start
  useEffect(() => {
    if (gameState !== 'playing') return;
    if (!initializedRef.current && crosshairInitRef.current) {
      initializedRef.current = true;
      startCycle();
    }
  }, [gameState, startCycle]);

  // Shot handler
  useEffect(() => {
    const h = (e) => {
      if (e.target.tagName === 'BUTTON' || e.target.closest('button')) return;
      if (!initializedRef.current || gameState !== 'playing' || !isActiveRef.current) return;
      const cvs = canvasRef.current; if (!cvs) return;
      const ch = virtualCrosshair.current;
      const cx = cvs.width / 2, cy = cvs.height / 2;
      if (!isMouseOverBall(ch.x, ch.y, cx, cy)) return;
      
      if (stateRef.current === "SIGNAL") {
        if (currentTargetColorRef.current === colorPalette.GO) {
          const reaction = Math.floor(performance.now() - startTimeRef.current);
          setSuccessfulHits(prev => prev + 1);
          if (bestReaction === 0 || reaction < bestReaction) setBestReaction(reaction);
          scoreRef.current += 1; setScore(scoreRef.current);
          streakRef.current++; setStreak(streakRef.current);
          if (streakRef.current > bestStreakRef.current) { bestStreakRef.current = streakRef.current; setBestStreak(streakRef.current); }
          if (streakRef.current % 5 === 0 && streakRef.current > 0) { playSound('streak'); showFeedback(`🔥 ${streakRef.current} Streak! +1`, 'success'); }
          else { playSound('success'); showFeedback(`✓ ${reaction}ms | +1`, 'success'); }
          const speedDiff = displayTimeRef.current - reaction;
          if (speedDiff > 50) displayTimeRef.current = Math.max(minDisplayTime, displayTimeRef.current - 20);
          else if (speedDiff < 10) displayTimeRef.current = Math.min(maxDisplayTime, displayTimeRef.current + 15);
          setDisplayWindow(displayTimeRef.current);
          if (signalTimeoutRef.current) clearTimeout(signalTimeoutRef.current);
          stateRef.current = "WAITING";
          startCycle();
        } else if (currentTargetColorRef.current === colorPalette.NO_GO) {
          if (cycleTimeoutRef.current) clearTimeout(cycleTimeoutRef.current);
          if (signalTimeoutRef.current) clearTimeout(signalTimeoutRef.current);
          applyPenalty("CLICKED RED");
          stateRef.current = "WAITING";
          setTimeout(() => { if (gameStateRef.current === 'playing') startCycle(); }, 400);
        }
      } else if (stateRef.current === "WAITING") {
        if (cycleTimeoutRef.current) clearTimeout(cycleTimeoutRef.current);
        if (signalTimeoutRef.current) clearTimeout(signalTimeoutRef.current);
        applyPenalty("EARLY CLICK");
        stateRef.current = "WAITING";
        setTimeout(() => { if (gameStateRef.current === 'playing') startCycle(); }, 400);
      }
    };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, [gameState, bestReaction, isMouseOverBall, applyPenalty, startCycle, playSound, showFeedback]);

  // Render loop
  useEffect(() => {
    if (gameState !== 'playing') return;
    const cvs = canvasRef.current; if (!cvs) return;
    const ctx = cvs.getContext('2d');
    const update = () => {
      const cr = containerRef.current; if (!cr) return;
      const rr = cr.getBoundingClientRect();
      let w = rr.width, h = w * (9 / 16);
      if (h > rr.height) { h = rr.height; w = h * (16 / 9); }
      cvs.width = w; cvs.height = h; canvasSizeRef.current = { width: w, height: h };
      cvs.style.position = 'absolute'; cvs.style.left = `${(rr.width - w) / 2}px`; cvs.style.top = `${(rr.height - h) / 2}px`;
      if (!crosshairInitRef.current) virtualCrosshair.current = { x: w / 2, y: h / 2 };
    };
    const ro = new ResizeObserver(update); if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener('resize', update); update();
    
    const draw = () => {
      const cx = cvs.width / 2, cy = cvs.height / 2;
      ctx.fillStyle = isBoxDarkMode ? "#020202" : "#f9fafb"; ctx.fillRect(0, 0, cvs.width, cvs.height);
      ctx.strokeStyle = isBoxDarkMode ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)'; ctx.lineWidth = 1;
      for (let i = 0; i < cvs.width; i += 40) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, cvs.height); ctx.stroke(); }
      
      ctx.beginPath(); ctx.arc(cx, cy, BALL_RADIUS, 0, Math.PI * 2);
      if (stateRef.current === "SIGNAL" && initializedRef.current) {
        ctx.fillStyle = currentTargetColorRef.current;
        ctx.shadowBlur = currentTargetColorRef.current === colorPalette.GO ? 12 : 8;
        ctx.shadowColor = currentTargetColorRef.current;
      } else { ctx.fillStyle = isBoxDarkMode ? "#151515" : "#d1d5db"; ctx.shadowBlur = 0; }
      ctx.fill(); ctx.shadowBlur = 0;
      ctx.beginPath(); ctx.arc(cx, cy, BALL_RADIUS - 3, 0, Math.PI * 2);
      ctx.strokeStyle = isBoxDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"; ctx.lineWidth = 1; ctx.stroke();
      ctx.beginPath(); ctx.arc(cx, cy, 4, 0, Math.PI * 2);
      ctx.fillStyle = stateRef.current === "SIGNAL" ? "#000000" : (isBoxDarkMode ? "#333333" : "#999999"); ctx.fill();
      
      // Professional crosshair
      const ch = virtualCrosshair.current;
      if (ch.x > 0 && ch.x < cvs.width && ch.y > 0 && ch.y < cvs.height) {
        const isOver = isMouseOverBall(ch.x, ch.y, cx, cy);
        const valid = stateRef.current === "SIGNAL" && currentTargetColorRef.current === colorPalette.GO;
        const cc = isOver && valid ? '#00ff88' : pointerLocked ? '#ffffff' : '#ff4444';
        
        ctx.strokeStyle = cc; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.arc(ch.x, ch.y, 12, 0, Math.PI * 2); ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(ch.x - 24, ch.y); ctx.lineTo(ch.x - 10, ch.y);
        ctx.moveTo(ch.x + 10, ch.y); ctx.lineTo(ch.x + 24, ch.y);
        ctx.moveTo(ch.x, ch.y - 24); ctx.lineTo(ch.x, ch.y - 10);
        ctx.moveTo(ch.x, ch.y + 10); ctx.lineTo(ch.x, ch.y + 24);
        ctx.stroke();
        ctx.fillStyle = cc; ctx.beginPath(); ctx.arc(ch.x, ch.y, 3, 0, Math.PI * 2); ctx.fill();
      }
      animationRef.current = requestAnimationFrame(draw);
    };
    animationRef.current = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(animationRef.current); window.removeEventListener('resize', update); ro.disconnect(); };
  }, [gameState, isBoxDarkMode, pointerLocked, isMouseOverBall]);

  const startGame = useCallback(() => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    setGameState('playing'); gameStateRef.current = 'playing';
    setScore(0); setStreak(0); setBestStreak(0); setBestReaction(0);
    setDisplayWindow(250); setTimeLeft(60); setLives(3); setSuccessfulHits(0); setFeedbackMsg('');
    isActiveRef.current = true; stateRef.current = "WAITING";
    displayTimeRef.current = 250; streakRef.current = 0; scoreRef.current = 0;
    livesRef.current = 3; bestStreakRef.current = 0; initializedRef.current = false;
    currentTargetColorRef.current = isBoxDarkMode ? "#151515" : "#d1d5db";
    crosshairInitRef.current = false;
    if (cycleTimeoutRef.current) clearTimeout(cycleTimeoutRef.current);
    if (signalTimeoutRef.current) clearTimeout(signalTimeoutRef.current);
    setTimeout(() => requestPointerLock(), 200);
    setTimeout(() => { crosshairInitRef.current = true; if (!initializedRef.current) { initializedRef.current = true; startCycle(); } }, 400);
  }, [isBoxDarkMode, requestPointerLock, startCycle]);

  const resetGame = useCallback(() => {
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    isActiveRef.current = false;
    setGameState('start'); gameStateRef.current = 'start';
    setScore(0); setStreak(0); setBestStreak(0); setBestReaction(0);
    setDisplayWindow(250); setTimeLeft(60); setLives(3); setSuccessfulHits(0); setFeedbackMsg('');
    scoreRef.current = 0; stateRef.current = "WAITING"; displayTimeRef.current = 250;
    streakRef.current = 0; livesRef.current = 3; bestStreakRef.current = 0; initializedRef.current = false;
    crosshairInitRef.current = false;
    currentTargetColorRef.current = isBoxDarkMode ? "#151515" : "#d1d5db";
    if (cycleTimeoutRef.current) clearTimeout(cycleTimeoutRef.current);
    if (signalTimeoutRef.current) clearTimeout(signalTimeoutRef.current);
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    document.exitPointerLock();
  }, [isBoxDarkMode]);

  useEffect(() => () => {
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    if (cycleTimeoutRef.current) clearTimeout(cycleTimeoutRef.current);
    if (signalTimeoutRef.current) clearTimeout(signalTimeoutRef.current);
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    document.exitPointerLock();
  }, []);

  if (loading || !isClient) return (<div className="min-h-screen flex items-center justify-center bg-gray-50"><div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto" /></div>);

  return (
    <div className={`min-h-screen select-none ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!isFullscreen && (
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex flex-wrap items-center gap-2 text-sm">
              <li><Link href="/" className={`hover:underline ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>Home</Link></li>
              <li className={isDarkMode ? 'text-gray-500' : 'text-gray-400'}>/</li>
              <li><Link href="/drills/visual" className={`hover:underline ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>Visual Drills</Link></li>
              <li className={isDarkMode ? 'text-gray-500' : 'text-gray-400'}>/</li>
              <li className={`font-medium ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>Chroma-Sync Lab</li>
            </ol>
          </nav>
        )}

        {!isFullscreen && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-green-500 to-teal-600 rounded-xl"><Target className="w-6 h-6 text-white" /></div>
              <div>
                <h1 className={`text-2xl sm:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Chroma-Sync Lab</h1>
                <p className={`text-sm sm:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{pointerLocked ? '🟢 Raw input active' : '🔴 Click canvas'} • Go/No-Go • 80-400ms</p>
              </div>
            </div>
            <div className="flex gap-2">
              {gameState === 'playing' && (<button onClick={resetGame} className={`p-2 rounded-lg border ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-100'}`}><RefreshCw className="w-5 h-5" /></button>)}
              <button onClick={() => setIsDarkMode(!isDarkMode)} className={`p-2 rounded-lg border ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`}>{isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}</button>
              <button onClick={() => setIsBoxDarkMode(!isBoxDarkMode)} className={`p-2 rounded-lg border ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`}><Eye className="w-5 h-5" /></button>
              <button onClick={() => setSoundEnabled(!soundEnabled)} className={`p-2 rounded-lg border ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`}>{soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}</button>
              <button onClick={toggleFullscreen} className={`p-2 rounded-lg border ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`}>{isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}</button>
              <button onClick={pointerLocked ? () => document.exitPointerLock() : requestPointerLock} className={`p-2 rounded-lg border ${pointerLocked ? 'bg-green-500 border-green-600 text-white' : isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`}><Lock className="w-5 h-5" /></button>
            </div>
          </div>
        )}

        {!isFullscreen && (
          <div className="grid grid-cols-6 gap-3 mb-4 h-[88px]">
            <StatCard icon={<Target className="text-blue-600" />} value={score} label="Score" d={isDarkMode} />
            <StatCard icon={<Trophy className="text-yellow-500" />} value={bestScore} label="Best" d={isDarkMode} />
            <StatCard icon={<Timer className={timeLeft < 15 ? 'text-red-600' : 'text-green-600'} />} value={timeLeft} label="Time" unit="s" d={isDarkMode} />
            <StatCard icon={<Zap className="text-orange-500" />} value={streak} label="Streak" d={isDarkMode} />
            <StatCard icon={<Activity className="text-purple-500" />} value={bestReaction || '-'} label="Best RT" unit="ms" d={isDarkMode} />
            <StatCard icon={<Heart className={lives > 0 ? 'text-red-500' : 'text-gray-500'} />} value={lives} label="Lives" d={isDarkMode} />
          </div>
        )}

        <div className="h-10 mb-2 flex justify-center items-center">
          <div className={`px-4 py-1.5 rounded-lg text-white font-semibold text-sm transition-all duration-200 ${feedbackMsg ? 'opacity-100 scale-100' : 'opacity-0 scale-95'} ${feedbackType === 'success' ? 'bg-green-500' : feedbackType === 'warning' ? 'bg-yellow-500' : 'bg-red-500'}`}>{feedbackMsg || '\u00A0'}</div>
        </div>

        <div ref={containerRef} className={`relative ${isFullscreen ? 'fixed inset-0 z-50' : 'rounded-xl border-2'}`} style={{ background: isBoxDarkMode ? "#020202" : "#fff", aspectRatio: isFullscreen ? 'auto' : '16/9', maxWidth: '100%', margin: '0 auto', borderColor: isDarkMode ? '#374151' : '#e5e7eb', overflow: 'hidden' }}>
          {isFullscreen && gameState === 'playing' && (<div className="absolute top-4 right-4 z-20 opacity-0 pointer-events-none"><button onClick={toggleFullscreen} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70"><Minimize2 className="w-5 h-5" /></button></div>)}

          {gameState === 'start' && (
            <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
              <div className={`rounded-2xl p-6 sm:p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <Target className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h2 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Chroma-Sync Lab</h2>
                <p className={`mb-4 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Raw input • Go/No-Go • 80-400ms adaptive</p>
                <div className={`mb-6 p-3 rounded-lg border ${isBoxDarkMode ? 'border-yellow-600 bg-yellow-900/20' : 'border-yellow-200 bg-yellow-50'}`}>
                  <div className="flex items-center gap-2 mb-2"><AlertCircle className="w-4 h-4 text-yellow-500" /><p className={`text-sm font-medium ${isBoxDarkMode ? 'text-yellow-400' : 'text-yellow-700'}`}>Raw Input via Pointer Lock</p></div>
                  <p className={`text-xs ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>GREEN = click. RED = don't click. ESC to unlock. Click canvas to re-lock.</p>
                </div>
                <button onClick={startGame} className="px-8 py-3 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-xl font-semibold hover:shadow-lg w-full">Start Training</button>
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
                  <RC label="Streak" v={bestStreak} i={<Zap className="w-4 h-4" />} c="orange" d={isBoxDarkMode} />
                  <RC label="Reaction" v={bestReaction || '-'} u="ms" i={<Timer className="w-4 h-4" />} c="cyan" d={isBoxDarkMode} />
                  <RC label="Hits" v={successfulHits} i={<Check className="w-4 h-4" />} c="emerald" d={isBoxDarkMode} />
                  <RC label="Lives" v={lives} i={<Heart className="w-4 h-4" />} c="red" d={isBoxDarkMode} />
                </div>
                <div className="flex gap-3">
                  <Link href="/drills/visual" className="flex-1"><button className={`w-full px-4 py-2.5 rounded-lg font-semibold ${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'}`}>← Back</button></Link>
                  <button onClick={startGame} className="flex-1 px-4 py-2.5 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-lg font-semibold">Play Again →</button>
                </div>
              </div>
            </div>
          )}
        </div>

        {!isFullscreen && (
          <footer className="mt-6">
            <div className={`rounded-xl border overflow-hidden ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <div className={`px-4 py-3 border-b ${isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'}`}>
                <div className="flex items-center gap-2"><Info className={`w-4 h-4 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} /><h2 className={`font-semibold text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Drill Rules & Professional Features</h2></div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-3">
                    <h3 className={`font-semibold flex items-center gap-2 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}><Target className="w-5 h-5" />How to Play</h3>
                    <ul className={`space-y-2 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      <li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">1</span><span>Click <span className="font-semibold text-green-400">Start Training</span></span></li>
                      <li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">2</span><span>Cursor locks for <span className="font-semibold text-green-400">raw input</span></span></li>
                      <li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">3</span><span>Click only on <span className="font-semibold text-green-400">GREEN</span> balls</span></li>
                      <li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">4</span><span>Do <span className="font-semibold text-red-400">NOT</span> click RED balls</span></li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h3 className={`font-semibold flex items-center gap-2 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}><Trophy className="w-5 h-5" />Scoring</h3>
                    <ul className={`space-y-2 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      <li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">+1</span><span><span className="font-semibold text-blue-400">Green hit</span> = +1 point</span></li>
                      <li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">-1</span><span><span className="font-semibold text-red-400">Red click</span> = -1 life</span></li>
                      <li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">-1</span><span><span className="font-semibold text-orange-400">Early click</span> = -1 life</span></li>
                      <li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-red-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">-1</span><span><span className="font-semibold text-red-400">0 lives</span> = -1 point penalty</span></li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h3 className={`font-semibold flex items-center gap-2 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`}><Zap className="w-5 h-5" />Pro Features</h3>
                    <ul className={`space-y-2 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      <li className="flex items-start gap-2"><Lock className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" /><span><span className="font-semibold text-green-400">Raw Input</span> - Pointer Lock API</span></li>
                      <li className="flex items-start gap-2"><Activity className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" /><span><span className="font-semibold text-blue-400">Adaptive</span> window 80-400ms</span></li>
                      <li className="flex items-start gap-2"><Timer className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" /><span><span className="font-semibold text-orange-400">Reaction</span> time tracking</span></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        )}

        {!isFullscreen && (
          <section className="mt-8" aria-label="About this drill">
            <div className={`rounded-xl border overflow-hidden ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <div className={`px-4 py-3 border-b ${isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'}`}>
                <div className="flex items-center gap-2"><GraduationCap className={`w-5 h-5 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} /><h2 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>About This Chroma-Sync Lab Drill</h2></div>
              </div>
              <div className="p-5">
                <p className={`text-sm leading-relaxed mb-5 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  This Chroma-Sync Lab drill trains response inhibition using a classic Go/No-Go paradigm with raw mouse input via Pointer Lock API. A central ball randomly turns GREEN (Go signal) or RED (No-Go signal) with an adaptive display window of 80-400ms. You must click only on GREEN balls while actively inhibiting the impulse to click RED balls. The adaptive window shrinks with fast accurate responses and expands with errors, creating a personalized difficulty curve. With a 3-lives penalty system, reaction time tracking, and streak bonuses, this drill builds the cognitive control needed for situations requiring quick decisions and impulse management.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
                  <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-green-50 border-green-100'}`}>
                    <div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-green-500 flex items-center justify-center"><GraduationCap className="w-4 h-4 text-white" /></div><h3 className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Who It's For</h3></div>
                    <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Competitive gamers needing impulse control, athletes requiring split-second decision making, professionals in high-stakes environments, students improving focus, and anyone wanting stronger cognitive control and response inhibition.</p>
                  </div>
                  <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-blue-50 border-blue-100'}`}>
                    <div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center"><TrendingUp className="w-4 h-4 text-white" /></div><h3 className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Skills Improved</h3></div>
                    <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Response inhibition, impulse control, selective attention, cognitive flexibility, reaction speed, error monitoring, and the ability to override automatic responses.</p>
                  </div>
                  <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-purple-50 border-purple-100'}`}>
                    <div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-purple-500 flex items-center justify-center"><BarChart3 className="w-4 h-4 text-white" /></div><h3 className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>What You'll Track</h3></div>
                    <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Score, best reaction time in milliseconds, streak of correct responses, successful hits count, lives remaining, and adaptive display window speed showing your current difficulty level.</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-yellow-50 border-yellow-100'}`}>
                    <div className="flex items-center gap-2 mb-3"><div className="w-8 h-8 rounded-lg bg-yellow-500 flex items-center justify-center"><Lightbulb className="w-4 h-4 text-white" /></div><h3 className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Why Practice Go/No-Go?</h3></div>
                    <ul className={`text-xs space-y-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      <li className="flex items-start gap-2"><CheckCircle2 className="w-3 h-3 text-yellow-500 mt-0.5 flex-shrink-0" />Builds the ability to stop automatic responses when needed</li>
                      <li className="flex items-start gap-2"><CheckCircle2 className="w-3 h-3 text-yellow-500 mt-0.5 flex-shrink-0" />Transfers to real-world situations requiring quick restraint</li>
                      <li className="flex items-start gap-2"><CheckCircle2 className="w-3 h-3 text-yellow-500 mt-0.5 flex-shrink-0" />Strengthens prefrontal cortex function for better decision making</li>
                    </ul>
                  </div>
                  <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-orange-50 border-orange-100'}`}>
                    <div className="flex items-center gap-2 mb-3"><div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center"><Clock className="w-4 h-4 text-white" /></div><h3 className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>How to Practice Effectively</h3></div>
                    <ol className={`text-xs space-y-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      <li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">1</span>Focus on accuracy over speed at first - avoid clicking red</li>
                      <li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">2</span>Watch for the adaptive window to shrink as you improve</li>
                      <li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">3</span>Track your best reaction time to measure progress</li>
                      <li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">4</span>Practice 10-15 minutes daily for best impulse control improvement</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {!isFullscreen && (
          <section className="mt-8" aria-label="Related drills">
            <div className="flex items-center gap-2 mb-4"><div className="w-1 h-6 rounded-full bg-gradient-to-b from-green-500 to-teal-600"></div><h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Explore Related Drills</h2></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { href: "/drills/visual/reaction-speed/light-reaction", color: "blue", icon: <Zap className="w-4 h-4 text-blue-600" />, cat: "Visual", title: "Light Reaction", desc: "Test and improve visual reaction speed with simple click response to color changes." },
                { href: "/drills/visual/tracking-accuracy/moving-target", color: "green", icon: <Target className="w-4 h-4 text-green-600" />, cat: "Visual", title: "Moving Target", desc: "Track and click moving targets to improve visual pursuit and hand-eye coordination." },
                { href: "/drills/fps/flick-shot-training", color: "purple", icon: <Target className="w-4 h-4 text-purple-600" />, cat: "FPS", title: "Flick Shot Trainer", desc: "Raw input flick training with adaptive target windows for competitive FPS gaming." },
                { href: "/drills/visual/peripheral-awareness", color: "orange", icon: <Eye className="w-4 h-4 text-orange-600" />, cat: "Visual", title: "Peripheral Awareness", desc: "Expand peripheral vision to detect targets appearing at screen edges." },
                { href: "/drills/cognitive/attention/divided-attention", color: "cyan", icon: <Users className="w-4 h-4 text-cyan-600" />, cat: "Cognitive", title: "Divided Attention", desc: "Handle multiple simultaneous tasks to improve multitasking and attention splitting." },
                { href: "/drills/cognitive/attention/selective-attention", color: "red", icon: <Brain className="w-4 h-4 text-red-600" />, cat: "Cognitive", title: "Selective Attention", desc: "Focus on relevant information while ignoring distracting stimuli." },
                { href: "/drills/visual/response-inhibition/stroop-test", color: "teal", icon: <Activity className="w-4 h-4 text-teal-600" />, cat: "Visual", title: "Stroop Test", desc: "Classic cognitive interference test challenging you to name colors against conflicting words." },
                { href: "/drills/motor/hand-eye-coordination/aim-trainer", color: "indigo", icon: <Star className="w-4 h-4 text-indigo-600" />, cat: "Motor", title: "Hand-Eye Coordination", desc: "General aim trainer for mouse precision and visual-motor coordination." }
              ].map((d, i) => {
                const cm = { blue: 'hover:border-blue-500', green: 'hover:border-green-500', purple: 'hover:border-purple-500', orange: 'hover:border-orange-500', cyan: 'hover:border-cyan-500', red: 'hover:border-red-500', teal: 'hover:border-teal-500', indigo: 'hover:border-indigo-500' };
                const cm2 = { blue: 'group-hover:text-blue-400', green: 'group-hover:text-green-400', purple: 'group-hover:text-purple-400', orange: 'group-hover:text-orange-400', cyan: 'group-hover:text-cyan-400', red: 'group-hover:text-red-400', teal: 'group-hover:text-teal-400', indigo: 'group-hover:text-indigo-400' };
                return (
                  <Link key={i} href={d.href} className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDarkMode ? 'bg-gray-800 border-gray-700 ' + cm[d.color] : 'bg-white border-gray-200 ' + cm[d.color]}`}>
                    <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-${d.color}-500 to-${d.color}-400`}></div>
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`w-8 h-8 rounded-lg bg-${d.color}-100 flex items-center justify-center`}>{d.icon}</div>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>{d.cat}</span>
                      </div>
                      <h3 className={`font-semibold text-sm mb-1 ${isDarkMode ? 'text-white ' + cm2[d.color] : 'text-gray-900 ' + cm2[d.color]} transition-colors`}>{d.title}</h3>
                      <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>{d.desc}</p>
                      <div className="flex items-center gap-1 mt-3 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: d.color === 'blue' ? '#3b82f6' : d.color === 'green' ? '#22c55e' : d.color === 'purple' ? '#a855f7' : d.color === 'orange' ? '#f97316' : d.color === 'cyan' ? '#06b6d4' : d.color === 'red' ? '#ef4444' : d.color === 'teal' ? '#14b8a6' : '#6366f1' }}>Start Drill <ArrowRight className="w-3 h-3" /></div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {!isFullscreen && (
          <footer className="mt-12 bg-gray-900 text-gray-400 rounded-xl py-10 px-6" role="contentinfo">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 mb-8">
                <div><h3 className="text-white font-semibold mb-3 text-sm">Visual Training</h3><ul className="space-y-2 text-sm"><li><Link href="/drills/visual/response-inhibition/chroma-sync" className="hover:text-white transition-colors">Chroma-Sync Lab</Link></li><li><Link href="/drills/visual/reaction-speed/light-reaction" className="hover:text-white transition-colors">Light Reaction</Link></li><li><Link href="/drills/visual/tracking-accuracy/moving-target" className="hover:text-white transition-colors">Moving Target</Link></li><li><Link href="/drills/visual" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">All Visual Drills →</Link></li></ul></div>
                <div><h3 className="text-white font-semibold mb-3 text-sm">Cognitive</h3><ul className="space-y-2 text-sm"><li><Link href="/drills/cognitive/attention/divided-attention" className="hover:text-white transition-colors">Divided Attention</Link></li><li><Link href="/drills/cognitive/attention/selective-attention" className="hover:text-white transition-colors">Selective Attention</Link></li><li><Link href="/drills/cognitive/problem-solving/logic-puzzles" className="hover:text-white transition-colors">Logic Puzzles</Link></li><li><Link href="/drills/cognitive" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">All Cognitive Drills →</Link></li></ul></div>
                <div><h3 className="text-white font-semibold mb-3 text-sm">FPS Training</h3><ul className="space-y-2 text-sm"><li><Link href="/drills/fps/flick-shot-training" className="hover:text-white transition-colors">Flick Shot Trainer</Link></li><li><Link href="/drills/fps/target-acquisition" className="hover:text-white transition-colors">Target Acquisition</Link></li><li><Link href="/drills/fps/reactive-tracking" className="hover:text-white transition-colors">Reactive Tracking</Link></li><li><Link href="/drills/fps" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">All FPS Drills →</Link></li></ul></div>
                <div><h3 className="text-white font-semibold mb-3 text-sm">Memory & Academic</h3><ul className="space-y-2 text-sm"><li><Link href="/drills/memory/working-memory/n-back" className="hover:text-white transition-colors">Dual N-Back</Link></li><li><Link href="/drills/academic/writing-speed/typing-test" className="hover:text-white transition-colors">Typing Speed Test</Link></li><li><Link href="/drills/academic/math-speed/mental-math" className="hover:text-white transition-colors">Mental Math</Link></li><li><Link href="/drills/memory" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">All Memory Drills →</Link></li></ul></div>
                <div><h3 className="text-white font-semibold mb-3 text-sm">More Categories</h3><ul className="space-y-2 text-sm"><li><Link href="/drills/motor" className="hover:text-white transition-colors">Motor (8 drills)</Link></li><li><Link href="/drills/productivity" className="hover:text-white transition-colors">Productivity (10 drills)</Link></li><li><Link href="/drills/mental-fitness" className="hover:text-white transition-colors">Mental Fitness (6 drills)</Link></li><li><Link href="/drills/physical" className="hover:text-white transition-colors">Physical (11 drills)</Link></li></ul></div>
              </div>
              <div className="border-t border-gray-800 pt-8 text-center">
                <div className="flex items-center justify-center gap-3 mb-4"><div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center"><Brain className="w-5 h-5 text-white" /></div><span className="text-white font-bold text-lg">SkillDrills</span></div>
                <p className="text-sm mb-2">&copy; 2026 SkillDrills. All rights reserved.</p>
                <p className="text-xs max-w-2xl mx-auto leading-relaxed mb-6">Free online Go/No-Go response inhibition drill with raw mouse input via Pointer Lock API. Click GREEN targets only while resisting RED targets. 3-lives penalty system with reaction time tracking and streak bonuses.</p>
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
function RC({ label, v, unit = '', i, c, d }) { const m = { blue:'bg-blue-500/10 border-blue-500/30 text-blue-500', yellow:'bg-yellow-500/10 border-yellow-500/30 text-yellow-500', emerald:'bg-emerald-500/10 border-emerald-500/30 text-emerald-500', orange:'bg-orange-500/10 border-orange-500/30 text-orange-500', cyan:'bg-cyan-500/10 border-cyan-500/30 text-cyan-500', red:'bg-red-500/10 border-red-500/30 text-red-500' }; const o = m[c] || m.blue; const [bg, border, text] = o.split(' '); return (<div className={`flex items-center justify-between p-3 rounded-lg border ${bg} ${border}`}><div className="flex items-center gap-2"><div className={text}>{i}</div><span className={`text-xs sm:text-sm ${d ? 'text-gray-300' : 'text-gray-600'}`}>{label}</span></div><span className={`font-bold text-base sm:text-lg ${text}`}>{v}{unit}</span></div>); }