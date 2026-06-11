'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  Target, Zap, Clock, Activity, 
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, 
  Eye, Layers, Brain, Trophy, Info, Timer, TrendingUp, Heart, RefreshCw,
  GraduationCap, Lightbulb, BarChart3, CheckCircle2, Star, ArrowRight, Share2, Copy,
  Search, Lock, AlertCircle
} from 'lucide-react';

export default function BatchProcessingClient() {
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
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [currentBatch, setCurrentBatch] = useState("");
  const [totalProcessed, setTotalProcessed] = useState(0);
  const [batchesCompleted, setBatchesCompleted] = useState(0);
  const [level, setLevel] = useState(1);
  const [itemsInBatch, setItemsInBatch] = useState(4);
  const [timeLeft, setTimeLeft] = useState(60);
  const [lives, setLives] = useState(3);
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  const [accuracy, setAccuracy] = useState(100);
  const [pointerLocked, setPointerLocked] = useState(false);
  
  const virtualCrosshair = useRef({ x: 0, y: 0 });
  const crosshairInitRef = useRef(false);
  const canvasSizeRef = useRef({ width: 0, height: 0 });
  const itemsRef = useRef([]);
  const streakRef = useRef(0);
  const scoreRef = useRef(0);
  const currentBatchRef = useRef("");
  const batchTimerRef = useRef(null);
  const timerIntervalRef = useRef(null);
  const feedbackTimeoutRef = useRef(null);
  const isActiveRef = useRef(false);
  const gameStateRef = useRef('start');
  const audioCtxRef = useRef(null);
  const livesRef = useRef(3);
  const bestStreakRef = useRef(0);
  const batchesCompletedRef = useRef(0);
  const levelRef = useRef(1);
  const itemsInBatchRef = useRef(4);

  const types = useRef(["RED", "BLUE", "GREEN"]);
  const colors = useRef({ "RED": "#FF3E3E", "BLUE": "#3E3EFF", "GREEN": "#3EFF3E" });
  const BATCH_TIME = 2000;

  useEffect(() => { setIsClient(true); const timer = setTimeout(() => setLoading(false), 300); return () => clearTimeout(timer); }, []);
  useEffect(() => { try { const s = localStorage.getItem('batchProcessingBest'); if (s) { const p = parseInt(s, 10); if (!isNaN(p)) setBestScore(p); } } catch (e) {} }, []);
  useEffect(() => { gameStateRef.current = gameState; }, [gameState]);

  const updateBestScore = useCallback((fs) => { try { const c = parseInt(localStorage.getItem('batchProcessingBest') || '0', 10); if (fs > c) { localStorage.setItem('batchProcessingBest', fs.toString()); setBestScore(fs); } } catch (e) {} }, []);
  const showFeedback = useCallback((m, t) => { if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current); setFeedback(m); setFeedbackType(t); feedbackTimeoutRef.current = setTimeout(() => { setFeedback(''); setFeedbackType(''); }, 600); }, []);
  const initAudio = useCallback(() => { try { if (!audioCtxRef.current) audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)(); if (audioCtxRef.current.state === 'suspended') audioCtxRef.current.resume(); return audioCtxRef.current; } catch (e) { return null; } }, []);
  const playSound = useCallback((type) => { if (!soundEnabled) return; try { const ctx = initAudio(); if (!ctx) return; const o = ctx.createOscillator(), g = ctx.createGain(); o.connect(g); g.connect(ctx.destination); const now = ctx.currentTime; const f = { correct: 880, wrong: 440, streak: 1046.5, batch: 660, penalty: 330 }; o.frequency.setValueAtTime(f[type] || 660, now); g.gain.setValueAtTime(type === 'penalty' ? 0.12 : 0.1, now); g.gain.exponentialRampToValueAtTime(0.001, now + 0.12); o.start(now); o.stop(now + 0.12); } catch (e) {} }, [soundEnabled, initAudio]);

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

  const updateLevel = useCallback(() => {
    const newLevel = Math.floor(batchesCompletedRef.current / 3) + 1;
    if (newLevel !== levelRef.current) { levelRef.current = newLevel; setLevel(newLevel); itemsInBatchRef.current = 4 + (newLevel - 1) * 2; setItemsInBatch(itemsInBatchRef.current); showFeedback(`⭐ Level ${newLevel}!`, 'success'); }
  }, [showFeedback]);

  const applyPenalty = useCallback(() => {
    if (!isActiveRef.current) return;
    if (livesRef.current > 0) { livesRef.current -= 1; setLives(livesRef.current); showFeedback(`⚠️ Lost 1 life!`, 'error'); playSound('wrong'); if (livesRef.current === 0) showFeedback('No lives! Penalties now deduct points!', 'warning'); }
    else { scoreRef.current = Math.max(0, scoreRef.current - 1); setScore(scoreRef.current); playSound('penalty'); showFeedback('No lives! -1 point penalty', 'error'); }
    streakRef.current = 0; setStreak(0);
  }, [playSound, showFeedback]);

  const forceNewBatch = useCallback(() => {
    if (!isActiveRef.current || gameStateRef.current !== 'playing') return;
    const cvs = canvasRef.current; if (!cvs) return;
    if (itemsRef.current.length > 0) applyPenalty();
    if (batchTimerRef.current) clearTimeout(batchTimerRef.current);
    itemsRef.current = [];
    for (let i = 0; i < itemsInBatchRef.current; i++) itemsRef.current.push(new Item(cvs));
    currentBatchRef.current = itemsRef.current[0].type; setCurrentBatch(currentBatchRef.current);
    batchTimerRef.current = setTimeout(() => { forceNewBatch(); }, BATCH_TIME);
  }, [applyPenalty]);

  const completeBatch = useCallback((cvs) => {
    if (!isActiveRef.current || gameStateRef.current !== 'playing') return;
    if (batchTimerRef.current) clearTimeout(batchTimerRef.current);
    const remainingTypes = [...new Set(itemsRef.current.map(i => i.type))];
    if (remainingTypes.length > 0) { currentBatchRef.current = remainingTypes[0]; setCurrentBatch(currentBatchRef.current); playSound('batch'); batchTimerRef.current = setTimeout(() => { forceNewBatch(); }, BATCH_TIME); }
    else { batchesCompletedRef.current++; setBatchesCompleted(batchesCompletedRef.current); updateLevel(); itemsRef.current = []; for (let i = 0; i < itemsInBatchRef.current; i++) itemsRef.current.push(new Item(cvs)); currentBatchRef.current = itemsRef.current[0].type; setCurrentBatch(currentBatchRef.current); batchTimerRef.current = setTimeout(() => { forceNewBatch(); }, BATCH_TIME); }
  }, [forceNewBatch, updateLevel, playSound]);

  // Timer
  useEffect(() => {
    if (gameState !== 'playing') return;
    timerIntervalRef.current = setInterval(() => { setTimeLeft(prev => { if (prev <= 1) { setGameState('gameOver'); gameStateRef.current = 'gameOver'; isActiveRef.current = false; if (batchTimerRef.current) clearTimeout(batchTimerRef.current); if (timerIntervalRef.current) { clearInterval(timerIntervalRef.current); timerIntervalRef.current = null; } updateBestScore(scoreRef.current); document.exitPointerLock(); return 0; } return prev - 1; }); }, 1000);
    return () => { if (timerIntervalRef.current) { clearInterval(timerIntervalRef.current); timerIntervalRef.current = null; } };
  }, [gameState, updateBestScore]);

  class Item {
    constructor(cvs) { this.type = types.current[Math.floor(Math.random() * types.current.length)]; this.x = 80 + Math.random() * (cvs.width - 160); this.y = 120 + Math.random() * (cvs.height - 200); this.r = 20; }
  }

  // Shot handler using virtual crosshair
  useEffect(() => {
    const h = (e) => {
      if (e.target.tagName === 'BUTTON' || e.target.closest('button')) return;
      if (gameState !== 'playing' || !isActiveRef.current || !crosshairInitRef.current) return;
      const cvs = canvasRef.current; if (!cvs) return;
      const ch = virtualCrosshair.current;
      let hitIdx = -1;
      for (let i = 0; i < itemsRef.current.length; i++) { if (Math.hypot(ch.x - itemsRef.current[i].x, ch.y - itemsRef.current[i].y) < itemsRef.current[i].r) { hitIdx = i; break; } }
      if (hitIdx !== -1) {
        if (itemsRef.current[hitIdx].type === currentBatchRef.current) {
          streakRef.current++; setStreak(streakRef.current); setTotalProcessed(prev => prev + 1);
          if (streakRef.current > bestStreakRef.current) { bestStreakRef.current = streakRef.current; setBestStreak(streakRef.current); }
          scoreRef.current += 1; setScore(scoreRef.current);
          if (streakRef.current % 5 === 0 && streakRef.current > 0) { playSound('streak'); showFeedback(`🔥 ${streakRef.current} Streak! +1`, 'success'); }
          else { playSound('correct'); showFeedback('✓ +1', 'success'); }
          itemsRef.current.splice(hitIdx, 1);
          if (!itemsRef.current.some(i => i.type === currentBatchRef.current)) completeBatch(cvs);
        } else { applyPenalty(); playSound('wrong'); showFeedback('✗ Wrong batch!', 'error'); }
      }
    };
    document.addEventListener('mousedown', h);
    document.addEventListener('contextmenu', (e) => e.preventDefault());
    return () => { document.removeEventListener('mousedown', h); document.removeEventListener('contextmenu', (e) => e.preventDefault()); };
  }, [gameState, applyPenalty, completeBatch, playSound, showFeedback]);

  // Render loop
  useEffect(() => {
    if (gameState !== 'playing') return;
    const cvs = canvasRef.current; if (!cvs) return; const ctx = cvs.getContext('2d');
    const updateCanvasSize = () => {
      const cr = containerRef.current; if (!cr) return;
      const rr = cr.getBoundingClientRect();
      let w = rr.width, h = w * (9 / 16);
      if (h > rr.height) { h = rr.height; w = h * (16 / 9); }
      cvs.width = w; cvs.height = h; canvasSizeRef.current = { width: w, height: h };
      cvs.style.position = 'absolute'; cvs.style.left = `${(rr.width - w) / 2}px`; cvs.style.top = `${(rr.height - h) / 2}px`;
      if (!crosshairInitRef.current) virtualCrosshair.current = { x: w / 2, y: h / 2 };
    };
    const ro = new ResizeObserver(updateCanvasSize); if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener('resize', updateCanvasSize); updateCanvasSize();
    itemsRef.current = []; for (let i = 0; i < itemsInBatchRef.current; i++) itemsRef.current.push(new Item(cvs));
    currentBatchRef.current = itemsRef.current[0].type; setCurrentBatch(currentBatchRef.current);
    batchTimerRef.current = setTimeout(() => { forceNewBatch(); }, BATCH_TIME);
    
    const draw = () => {
      ctx.fillStyle = isBoxDarkMode ? "#020202" : "#f9fafb"; ctx.fillRect(0, 0, cvs.width, cvs.height);
      ctx.strokeStyle = isBoxDarkMode ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)'; ctx.lineWidth = 1;
      for (let i = 0; i < cvs.width; i += 40) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, cvs.height); ctx.stroke(); }
      
      ctx.font = "bold 48px monospace"; ctx.textAlign = "center";
      ctx.fillStyle = colors.current[currentBatchRef.current] || "#FFFFFF";
      ctx.fillText(currentBatchRef.current, cvs.width / 2, 80);
      
      itemsRef.current.forEach(it => {
        ctx.beginPath(); ctx.arc(it.x, it.y, it.r, 0, Math.PI * 2);
        ctx.fillStyle = colors.current[it.type]; ctx.globalAlpha = 0.85; ctx.fill(); ctx.globalAlpha = 1.0;
        ctx.beginPath(); ctx.arc(it.x, it.y, it.r, 0, Math.PI * 2);
        ctx.strokeStyle = isBoxDarkMode ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.1)"; ctx.lineWidth = 2; ctx.stroke();
      });
      
      // Professional crosshair
      const ch = virtualCrosshair.current;
      if (ch.x > 0 && ch.x < cvs.width && ch.y > 0 && ch.y < cvs.height) {
        ctx.strokeStyle = pointerLocked ? '#00ff88' : '#ff4444'; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.arc(ch.x, ch.y, 12, 0, Math.PI * 2); ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(ch.x - 24, ch.y); ctx.lineTo(ch.x - 10, ch.y);
        ctx.moveTo(ch.x + 10, ch.y); ctx.lineTo(ch.x + 24, ch.y);
        ctx.moveTo(ch.x, ch.y - 24); ctx.lineTo(ch.x, ch.y - 10);
        ctx.moveTo(ch.x, ch.y + 10); ctx.lineTo(ch.x, ch.y + 24);
        ctx.stroke();
        ctx.fillStyle = pointerLocked ? '#00ff88' : '#ff4444';
        ctx.beginPath(); ctx.arc(ch.x, ch.y, 3, 0, Math.PI * 2); ctx.fill();
      }
      animationRef.current = requestAnimationFrame(draw);
    };
    animationRef.current = requestAnimationFrame(draw);
    return () => { if (animationRef.current) cancelAnimationFrame(animationRef.current); window.removeEventListener('resize', updateCanvasSize); ro.disconnect(); if (batchTimerRef.current) clearTimeout(batchTimerRef.current); };
  }, [gameState, isBoxDarkMode, pointerLocked, forceNewBatch]);

  const startGame = useCallback(() => {
    try {
      if (typeof window !== 'undefined' && !document.fullscreenElement) {
        if (typeof toggleFullscreen === 'function') toggleFullscreen();
      }
    } catch (err) {}

    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    setGameState('playing'); gameStateRef.current = 'playing';
    setScore(0); setStreak(0); setBestStreak(0); setTotalProcessed(0); setBatchesCompleted(0);
    setLevel(1); setItemsInBatch(4); setTimeLeft(60); setLives(3); setFeedback(''); setAccuracy(100);
    isActiveRef.current = true; streakRef.current = 0; bestStreakRef.current = 0; scoreRef.current = 0;
    livesRef.current = 3; batchesCompletedRef.current = 0; levelRef.current = 1; itemsInBatchRef.current = 4;
    itemsRef.current = []; crosshairInitRef.current = false;
    if (batchTimerRef.current) clearTimeout(batchTimerRef.current);
    setTimeout(() => requestPointerLock(), 200);
    setTimeout(() => { crosshairInitRef.current = true; }, 400);
  }, [requestPointerLock]);

  const resetGame = useCallback(() => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (batchTimerRef.current) clearTimeout(batchTimerRef.current);
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    isActiveRef.current = false; setGameState('start'); gameStateRef.current = 'start';
    setScore(0); setStreak(0); setBestStreak(0); setTotalProcessed(0); setBatchesCompleted(0);
    setLevel(1); setItemsInBatch(4); setTimeLeft(60); setLives(3); setFeedback(''); setAccuracy(100);
    crosshairInitRef.current = false; document.exitPointerLock();
  }, []);

  const sharePage = async () => { if (navigator.share) { try { await navigator.share({ title: 'Batch Processing | SkillDrills', text: 'Train efficient task grouping with color-coded batch processing.', url: 'https://skilldrills.online/drills/productivity/work-efficiency/batch-processing' }); } catch (e) {} } else { navigator.clipboard.writeText('https://skilldrills.online/drills/productivity/work-efficiency/batch-processing'); } };
  const copyPageLink = () => { navigator.clipboard.writeText('https://skilldrills.online/drills/productivity/work-efficiency/batch-processing'); };

  useEffect(() => () => { if (animationRef.current) cancelAnimationFrame(animationRef.current); if (timerIntervalRef.current) clearInterval(timerIntervalRef.current); if (batchTimerRef.current) clearTimeout(batchTimerRef.current); if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current); document.exitPointerLock(); }, []);

  if (loading || !isClient) return (<div className="min-h-screen flex items-center justify-center bg-gray-50"><div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto" /></div>);

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
              <li className={`font-medium ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`}>Batch Processing</li>
            </ol>
          </nav>
        )}

        {!isFullscreen && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl"><Layers className="w-6 h-6 text-white" /></div>
              <div>
                <h1 className={`text-2xl sm:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Batch Processing Trainer</h1>
                <p className={`text-sm sm:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{pointerLocked ? '🟢 Raw input active' : '🔴 Click canvas'} • 2s batches • Level up every 3</p>
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
          <div className="grid grid-cols-7 gap-3 mb-4 h-[88px]">
            <StatCard icon={<Target className="text-blue-600" />} value={score} label="Score" d={isDarkMode} />
            <StatCard icon={<Trophy className="text-yellow-500" />} value={bestScore} label="Best" d={isDarkMode} />
            <StatCard icon={<Timer className={timeLeft < 15 ? 'text-red-600' : 'text-green-600'} />} value={timeLeft} label="Time" unit="s" d={isDarkMode} />
            <StatCard icon={<TrendingUp className="text-purple-500" />} value={level} label="Level" d={isDarkMode} />
            <StatCard icon={<Layers className="text-cyan-500" />} value={totalProcessed} label="Processed" d={isDarkMode} />
            <StatCard icon={<Zap className="text-orange-500" />} value={streak} label="Streak" d={isDarkMode} />
            <StatCard icon={<Heart className={lives > 0 ? 'text-red-500' : 'text-gray-500'} />} value={lives} label="Lives" d={isDarkMode} />
          </div>
        )}

        <div className="h-10 mb-2 flex justify-center items-center">
          <div className={`px-4 py-1.5 rounded-lg text-white font-semibold text-sm transition-all duration-200 ${feedback ? 'opacity-100 scale-100' : 'opacity-0 scale-95'} ${feedbackType === 'success' ? 'bg-green-500' : feedbackType === 'warning' ? 'bg-yellow-500' : 'bg-red-500'}`}>{feedback || '\u00A0'}</div>
        </div>

        <div ref={containerRef} className={`relative ${isFullscreen ? 'fixed inset-0 z-50' : 'rounded-xl border-2'}`} style={{ background: isBoxDarkMode ? "#020202" : "#fff", aspectRatio: isFullscreen ? 'auto' : '16/9', maxWidth: '100%', margin: '0 auto', borderColor: isDarkMode ? '#374151' : '#e5e7eb', overflow: 'hidden' }}>
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

          {isFullscreen && gameState === 'playing' && (<div className="absolute top-4 right-4 z-20 opacity-0 pointer-events-none"><button onClick={toggleFullscreen} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70"><Minimize2 className="w-5 h-5" /></button></div>)}
          <canvas ref={canvasRef} style={{ display: 'block', position: 'absolute', cursor: 'none' }} />

          {gameState === 'start' && (
            <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
              <div className={`rounded-2xl p-6 sm:p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <Layers className="w-16 h-16 text-purple-500 mx-auto mb-4" />
                <h2 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Batch Processing Trainer</h2>
                <p className={`mb-4 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Raw input • 2s batches • Level up every 3</p>
                <div className={`mb-6 p-3 rounded-lg border ${isBoxDarkMode ? 'border-yellow-600 bg-yellow-900/20' : 'border-yellow-200 bg-yellow-50'}`}>
                  <div className="flex items-center gap-2 mb-2"><AlertCircle className="w-4 h-4 text-yellow-500" /><p className={`text-sm font-medium ${isBoxDarkMode ? 'text-yellow-400' : 'text-yellow-700'}`}>Raw Input via Pointer Lock</p></div>
                  <p className={`text-xs ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Click matching colored circles. ESC to unlock. Click canvas to re-lock.</p>
                </div>
                <button onClick={startGame} className="px-8 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg w-full">Start Training</button>
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
                  <RC label="Level" v={level} i={<TrendingUp className="w-4 h-4" />} c="purple" d={isBoxDarkMode} />
                  <RC label="Processed" v={totalProcessed} i={<Layers className="w-4 h-4" />} c="cyan" d={isBoxDarkMode} />
                  <RC label="Streak" v={`${bestStreak}x`} i={<Zap className="w-4 h-4" />} c="orange" d={isBoxDarkMode} />
                  <RC label="Batches" v={batchesCompleted} i={<Layers className="w-4 h-4" />} c="emerald" d={isBoxDarkMode} />
                </div>
                <div className="flex gap-3">
                  <Link href="/drills/productivity" className="flex-1"><button className={`w-full px-4 py-2.5 rounded-lg font-semibold ${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'}`}>← Back</button></Link>
                  <button onClick={startGame} className="flex-1 px-4 py-2.5 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg font-semibold">Play Again →</button>
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
                <div className="flex items-center gap-2"><Info className={`w-4 h-4 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} /><h2 className={`font-semibold text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Drill Rules & Professional Features</h2></div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-3">
                    <h3 className={`font-semibold flex items-center gap-2 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`}><Layers className="w-5 h-5" />How to Play</h3>
                    <ul className={`space-y-2 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      <li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">1</span><span>Click <span className="font-semibold text-purple-400">Start Training</span></span></li>
                      <li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">2</span><span>Cursor locks for <span className="font-semibold text-purple-400">raw input</span></span></li>
                      <li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">3</span><span>Click circles matching <span className="font-semibold text-purple-400">batch color</span></span></li>
                      <li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">4</span><span>Level up <span className="font-semibold">every 3 batches</span></span></li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h3 className={`font-semibold flex items-center gap-2 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}><Trophy className="w-5 h-5" />Scoring</h3>
                    <ul className={`space-y-2 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      <li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">+1</span><span><span className="font-semibold text-blue-400">Correct</span> = +1 point</span></li>
                      <li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">-1</span><span><span className="font-semibold text-red-400">Wrong</span> = -1 life</span></li>
                      <li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">-1</span><span><span className="font-semibold text-orange-400">0 lives</span> = -1 point</span></li>
                      <li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">🔥</span><span><span className="font-semibold text-purple-400">5 streak</span> combo bonus</span></li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h3 className={`font-semibold flex items-center gap-2 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`}><Zap className="w-5 h-5" />Pro Features</h3>
                    <ul className={`space-y-2 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      <li className="flex items-start gap-2"><Lock className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" /><span><span className="font-semibold text-green-400">Raw Input</span> - Pointer Lock API</span></li>
                      <li className="flex items-start gap-2"><Activity className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" /><span><span className="font-semibold text-blue-400">Progressive</span> difficulty scaling</span></li>
                      <li className="flex items-start gap-2"><Timer className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" /><span><span className="font-semibold text-orange-400">2-second</span> batch windows</span></li>
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
              <div className={`px-4 py-3 border-b ${isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'}`}><div className="flex items-center gap-2"><GraduationCap className={`w-5 h-5 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} /><h2 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>About This Free Batch Processing Drill</h2></div></div>
              <div className="p-5">
                <p className={`text-sm leading-relaxed mb-5 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>This free Batch Processing drill trains work efficiency by simulating the productivity technique of grouping similar tasks together with raw mouse input via Pointer Lock API. Three color-coded batch types (RED, BLUE, GREEN) appear as circles on the canvas with the current batch color displayed prominently at the top. You have 2 seconds per batch window to click all circles matching the current color. Each correct click earns +1 point and builds your streak. The progressive difficulty system adds 2 more items per batch every 3 completed batches, starting at 4 items and scaling up with no upper limit. A 3 lives system protects your score initially - mistakes cost lives before deducting points. Perfect for developing processing speed, task grouping efficiency, and the ability to quickly identify and handle similar items under time pressure - skills directly transferable to email triage, data processing, and workflow management.</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
                  <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-purple-50 border-purple-100'}`}><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-purple-500 flex items-center justify-center"><GraduationCap className="w-4 h-4 text-white" /></div><h3 className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Who It's For</h3></div><p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Professionals wanting better task grouping, knowledge workers improving email and data processing speed, and anyone wanting to develop workflow efficiency and batch processing habits.</p></div>
                  <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-green-50 border-green-100'}`}><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-green-500 flex items-center justify-center"><TrendingUp className="w-4 h-4 text-white" /></div><h3 className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Skills Improved</h3></div><p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Task batching efficiency, processing speed, color-coded task grouping, workflow optimization, and rapid item identification under time pressure.</p></div>
                  <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-purple-50 border-purple-100'}`}><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-purple-500 flex items-center justify-center"><BarChart3 className="w-4 h-4 text-white" /></div><h3 className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>What You'll Track</h3></div><p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Score, level progression, items processed, batches completed, streak count, lives remaining, and best performance records saved locally.</p></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-yellow-50 border-yellow-100'}`}><div className="flex items-center gap-2 mb-3"><div className="w-8 h-8 rounded-lg bg-yellow-500 flex items-center justify-center"><Lightbulb className="w-4 h-4 text-white" /></div><h3 className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Why Practice Batch Processing?</h3></div><ul className={`text-xs space-y-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}><li className="flex items-start gap-2"><CheckCircle2 className="w-3 h-3 text-yellow-500 mt-0.5 flex-shrink-0" />Core productivity technique used in GTD and time management methodologies</li><li className="flex items-start gap-2"><CheckCircle2 className="w-3 h-3 text-yellow-500 mt-0.5 flex-shrink-0" />Builds the habit of grouping similar tasks for efficient processing</li><li className="flex items-start gap-2"><CheckCircle2 className="w-3 h-3 text-yellow-500 mt-0.5 flex-shrink-0" />Progressive difficulty mirrors real-world increasing workload demands</li></ul></div>
                  <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-orange-50 border-orange-100'}`}><div className="flex items-center gap-2 mb-3"><div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center"><Clock className="w-4 h-4 text-white" /></div><h3 className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>How to Practice Effectively</h3></div><ol className={`text-xs space-y-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}><li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">1</span>Focus on one color at a time as displayed by the batch indicator</li><li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">2</span>Clear all matching circles before the 2-second batch timer expires</li><li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">3</span>Build streaks of 5+ for combo notifications and faster scoring</li><li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">4</span>Practice 10-15 minutes daily for best workflow efficiency improvement</li></ol></div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Related Drills - Preserved */}
        {!isFullscreen && (
          <section className="mt-8" aria-label="Related drills">
            <div className="flex items-center gap-2 mb-4"><div className="w-1 h-6 rounded-full bg-gradient-to-b from-purple-500 to-indigo-600"></div><h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Explore Related Drills</h2></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { href: "/drills/memory/working-memory/n-back", color: "blue", icon: <Brain className="w-4 h-4 text-blue-600" />, cat: "Memory", title: "3-Back Training", desc: "Classic N-Back working memory task at 3-back with 60 letters per round." },
                { href: "/drills/memory/working-memory/mental-arithmetic", color: "green", icon: <Star className="w-4 h-4 text-green-600" />, cat: "Memory", title: "Mental Arithmetic", desc: "Solve timed math problems with 4 operations across 8 adaptive levels." },
                { href: "/drills/memory/short-term-memory/digit-span", color: "purple", icon: <Brain className="w-4 h-4 text-purple-600" />, cat: "Memory", title: "Digit Span", desc: "Recall increasingly long digit sequences with infinite progressive levels." },
                { href: "/drills/visual/visual-recognition/visual-search", color: "orange", icon: <Star className="w-4 h-4 text-orange-600" />, cat: "Visual", title: "Visual Search", desc: "Find letter C among 160 rotated O distractors in a 16×10 grid." },
                { href: "/drills/visual/visual-recognition/entropic-grid", color: "cyan", icon: <Search className="w-4 h-4 text-cyan-600" />, cat: "Visual", title: "Entropic Grid", desc: "Find 2-char targets in 100-cell grid with entropy and stamina system." },
                { href: "/drills/fps/flick-shot-training", color: "red", icon: <Target className="w-4 h-4 text-red-600" />, cat: "FPS", title: "Flick Shot Trainer", desc: "Improve aim with raw mouse input flick training and adaptive target windows." },
                { href: "/drills/memory/spatial-memory/path-tracing", color: "teal", icon: <Star className="w-4 h-4 text-teal-600" />, cat: "Memory", title: "Path Tracing", desc: "Watch animated dot paths then retrace them in exact order on expanding grids." },
                { href: "/drills/cognitive/memory/card-matching", color: "indigo", icon: <Activity className="w-4 h-4 text-indigo-600" />, cat: "Cognitive", title: "Card Matching", desc: "Classic memory card game to improve visual memory and concentration." }
              ].map((d, i) => {
                const cm = { blue: 'hover:border-blue-500', green: 'hover:border-green-500', purple: 'hover:border-purple-500', orange: 'hover:border-orange-500', cyan: 'hover:border-cyan-500', red: 'hover:border-red-500', teal: 'hover:border-teal-500', indigo: 'hover:border-indigo-500' };
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
                <div><h3 className="text-white font-semibold mb-3 text-sm">Productivity</h3><ul className="space-y-2 text-sm"><li><Link href="/drills/productivity/work-efficiency/batch-processing" className="hover:text-white transition-colors">Batch Processing</Link></li><li><Link href="/drills/memory/working-memory/n-back" className="hover:text-white transition-colors">3-Back Training</Link></li><li><Link href="/drills/memory/working-memory/mental-arithmetic" className="hover:text-white transition-colors">Mental Arithmetic</Link></li><li><Link href="/drills/productivity" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">All Productivity Drills →</Link></li></ul></div>
                <div><h3 className="text-white font-semibold mb-3 text-sm">Memory</h3><ul className="space-y-2 text-sm"><li><Link href="/drills/memory/short-term-memory/digit-span" className="hover:text-white transition-colors">Digit Span</Link></li><li><Link href="/drills/memory/spatial-memory/path-tracing" className="hover:text-white transition-colors">Path Tracing</Link></li><li><Link href="/drills/memory/associative-memory/concept-linking" className="hover:text-white transition-colors">Concept Linking</Link></li><li><Link href="/drills/memory" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">All Memory Drills →</Link></li></ul></div>
                <div><h3 className="text-white font-semibold mb-3 text-sm">Visual</h3><ul className="space-y-2 text-sm"><li><Link href="/drills/visual/visual-recognition/visual-search" className="hover:text-white transition-colors">Visual Search</Link></li><li><Link href="/drills/visual/visual-recognition/entropic-grid" className="hover:text-white transition-colors">Entropic Grid</Link></li><li><Link href="/drills/visual/tracking-accuracy/moving-target" className="hover:text-white transition-colors">Moving Target</Link></li><li><Link href="/drills/visual" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">All Visual Drills →</Link></li></ul></div>
                <div><h3 className="text-white font-semibold mb-3 text-sm">FPS & Cognitive</h3><ul className="space-y-2 text-sm"><li><Link href="/drills/fps/flick-shot-training" className="hover:text-white transition-colors">Flick Shot Trainer</Link></li><li><Link href="/drills/cognitive/memory/card-matching" className="hover:text-white transition-colors">Card Matching</Link></li><li><Link href="/drills/cognitive/attention/divided-attention" className="hover:text-white transition-colors">Attention Drills</Link></li><li><Link href="/drills/cognitive" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">All Cognitive Drills →</Link></li></ul></div>
                <div><h3 className="text-white font-semibold mb-3 text-sm">More</h3><ul className="space-y-2 text-sm"><li><Link href="/drills/academic" className="hover:text-white transition-colors">Academic (12 drills)</Link></li><li><Link href="/drills/physical" className="hover:text-white transition-colors">Physical (11 drills)</Link></li><li><Link href="/drills/mental-fitness" className="hover:text-white transition-colors">Mental Fitness (6 drills)</Link></li><li><Link href="/drills" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">All Drills →</Link></li></ul></div>
              </div>
              <div className="border-t border-gray-800 pt-8 text-center">
                <div className="flex items-center justify-center gap-3 mb-4"><div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center"><Brain className="w-5 h-5 text-white" /></div><span className="text-white font-bold text-lg">SkillDrills</span></div>
                <p className="text-sm mb-2">&copy; 2026 SkillDrills. All rights reserved.</p>
                <p className="text-xs max-w-2xl mx-auto leading-relaxed mb-6">Free online batch processing drill with raw mouse input via Pointer Lock API. Color-coded RED BLUE GREEN batches with 2-second windows. Progressive difficulty adds items per level.</p>
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
function RC({ label, v, unit = '', i, c, d }) { const m = { blue:'bg-blue-500/10 border-blue-500/30 text-blue-500', yellow:'bg-yellow-500/10 border-yellow-500/30 text-yellow-500', purple:'bg-purple-500/10 border-purple-500/30 text-purple-500', cyan:'bg-cyan-500/10 border-cyan-500/30 text-cyan-500', orange:'bg-orange-500/10 border-orange-500/30 text-orange-500', emerald:'bg-emerald-500/10 border-emerald-500/30 text-emerald-500' }; const o = m[c] || m.blue; const [bg, border, text] = o.split(' '); return (<div className={`flex items-center justify-between p-3 rounded-lg border ${bg} ${border}`}><div className="flex items-center gap-2"><div className={text}>{i}</div><span className={`text-xs sm:text-sm ${d ? 'text-gray-300' : 'text-gray-600'}`}>{label}</span></div><span className={`font-bold text-base sm:text-lg ${text}`}>{v}{unit}</span></div>); }