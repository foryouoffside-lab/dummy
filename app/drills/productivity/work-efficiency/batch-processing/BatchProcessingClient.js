'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Target, Zap, Clock, Award, Activity, 
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, 
  Eye, Layers, Brain, X, Trophy, Info, Timer, TrendingUp, Heart, RefreshCw,
  GraduationCap, Lightbulb, BarChart3, CheckCircle2, Star, ArrowRight, Share2, Copy
} from 'lucide-react';

export default function BatchProcessingClient() {
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
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
  
  const itemsRef = useRef([]);
  const streakRef = useRef(0);
  const scoreRef = useRef(0);
  const currentBatchRef = useRef("");
  const mousePositionRef = useRef({ x: 0, y: 0 });
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

  useEffect(() => {
    setIsClient(true);
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    try {
      const savedBestScore = localStorage.getItem('batchProcessingBestScore');
      if (savedBestScore) setBestScore(parseInt(savedBestScore, 10));
    } catch (e) {}
  }, []);

  const updateBestScore = useCallback((finalScore) => {
    try {
      const currentBestScore = parseInt(localStorage.getItem('batchProcessingBestScore') || '0', 10);
      if (finalScore > currentBestScore) {
        localStorage.setItem('batchProcessingBestScore', finalScore.toString());
        setBestScore(finalScore);
      }
    } catch (e) {}
  }, []);

  useEffect(() => { gameStateRef.current = gameState; }, [gameState]);

  const toggleFullscreen = useCallback(async () => {
    try {
      if (!isFullscreen) {
        const element = containerRef.current;
        if (element?.requestFullscreen) { await element.requestFullscreen(); setIsFullscreen(true); }
      } else {
        if (document.fullscreenElement) await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch (error) { console.error('Fullscreen error:', error); }
  }, [isFullscreen]);

  useEffect(() => {
    const handleFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const showFeedback = useCallback((message, type) => {
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    setFeedback(message); setFeedbackType(type);
    feedbackTimeoutRef.current = setTimeout(() => { setFeedback(''); setFeedbackType(''); }, 600);
  }, []);

  const initAudio = useCallback(() => {
    try {
      if (!audioCtxRef.current) audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      if (audioCtxRef.current.state === 'suspended') audioCtxRef.current.resume();
      return audioCtxRef.current;
    } catch (e) { return null; }
  }, []);

  const playSound = useCallback((type) => {
    if (!soundEnabled) return;
    try {
      const audioCtx = initAudio(); if (!audioCtx) return;
      const osc = audioCtx.createOscillator(); const gain = audioCtx.createGain();
      osc.connect(gain); gain.connect(audioCtx.destination);
      const now = audioCtx.currentTime;
      const freqMap = { correct: 880, wrong: 440, streak: 1046.5, batch: 660, penalty: 330 };
      osc.frequency.setValueAtTime(freqMap[type] || 660, now);
      gain.gain.setValueAtTime(type === 'penalty' ? 0.12 : 0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      osc.start(now); osc.stop(now + 0.12);
    } catch (e) {}
  }, [soundEnabled, initAudio]);

  const updateLevel = useCallback(() => {
    const newLevel = Math.floor(batchesCompletedRef.current / 3) + 1;
    if (newLevel !== levelRef.current) {
      levelRef.current = newLevel; setLevel(newLevel);
      itemsInBatchRef.current = 4 + (newLevel - 1) * 2; setItemsInBatch(itemsInBatchRef.current);
      showFeedback(`⭐ Level ${newLevel}!`, 'success');
    }
  }, [showFeedback]);

  const applyPenalty = useCallback(() => {
    if (!isActiveRef.current) return;
    if (livesRef.current > 0) { livesRef.current -= 1; setLives(livesRef.current); showFeedback(`⚠️ Lost 1 life! ${livesRef.current} lives left`, 'error'); playSound('wrong'); if (livesRef.current === 0) showFeedback('No lives left! Penalties now deduct points!', 'warning'); }
    else { scoreRef.current = Math.max(0, scoreRef.current - 1); setScore(scoreRef.current); playSound('penalty'); showFeedback('No lives! -1 point penalty', 'error'); }
    streakRef.current = 0; setStreak(0);
  }, [playSound, showFeedback]);

  const forceNewBatch = useCallback(() => {
    if (!isActiveRef.current || gameStateRef.current !== 'playing') return;
    const cvs = canvasRef.current; if (!cvs) return;
    if (itemsRef.current.length > 0) applyPenalty();
    if (batchTimerRef.current) clearTimeout(batchTimerRef.current);
    itemsRef.current = [];
    for(let i = 0; i < itemsInBatchRef.current; i++) itemsRef.current.push(new Item(cvs));
    currentBatchRef.current = itemsRef.current[0].type; setCurrentBatch(currentBatchRef.current);
    batchTimerRef.current = setTimeout(() => { forceNewBatch(); }, BATCH_TIME);
  }, [applyPenalty]);

  const completeBatch = useCallback((cvs) => {
    if (!isActiveRef.current || gameStateRef.current !== 'playing') return;
    if (batchTimerRef.current) clearTimeout(batchTimerRef.current);
    const remainingTypes = [...new Set(itemsRef.current.map(i => i.type))];
    if (remainingTypes.length > 0) { currentBatchRef.current = remainingTypes[0]; setCurrentBatch(currentBatchRef.current); playSound('batch'); batchTimerRef.current = setTimeout(() => { forceNewBatch(); }, BATCH_TIME); }
    else { batchesCompletedRef.current++; setBatchesCompleted(batchesCompletedRef.current); updateLevel(); itemsRef.current = []; for(let i = 0; i < itemsInBatchRef.current; i++) itemsRef.current.push(new Item(cvs)); currentBatchRef.current = itemsRef.current[0].type; setCurrentBatch(currentBatchRef.current); batchTimerRef.current = setTimeout(() => { forceNewBatch(); }, BATCH_TIME); }
  }, [forceNewBatch, updateLevel, playSound]);

  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      timerIntervalRef.current = setInterval(() => { setTimeLeft(prev => { if (prev <= 1) { setGameState('gameOver'); gameStateRef.current = 'gameOver'; isActiveRef.current = false; if (batchTimerRef.current) clearTimeout(batchTimerRef.current); if (timerIntervalRef.current) { clearInterval(timerIntervalRef.current); timerIntervalRef.current = null; } const total = totalProcessed; const finalAccuracy = total === 0 ? 100 : Math.round((totalProcessed / total) * 100); setAccuracy(finalAccuracy); updateBestScore(scoreRef.current); return 0; } return prev - 1; }); }, 1000);
    }
    return () => { if (timerIntervalRef.current) { clearInterval(timerIntervalRef.current); timerIntervalRef.current = null; } };
  }, [gameState, totalProcessed, updateBestScore]);

  useEffect(() => {
    const handleMouseMove = (e) => { const cvs = canvasRef.current; if (!cvs) return; const rect = cvs.getBoundingClientRect(); const scaleX = cvs.width / rect.width; const scaleY = cvs.height / rect.height; mousePositionRef.current = { x: (e.clientX - rect.left) * scaleX, y: (e.clientY - rect.top) * scaleY }; };
    window.addEventListener('mousemove', handleMouseMove); return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  class Item {
    constructor(cvs) { this.type = types.current[Math.floor(Math.random() * types.current.length)]; this.x = 80 + Math.random() * (cvs.width - 160); this.y = 120 + Math.random() * (cvs.height - 200); this.r = 20; }
    draw(ctx, isDark) { ctx.beginPath(); ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2); ctx.fillStyle = colors.current[this.type]; ctx.globalAlpha = 0.85; ctx.fill(); ctx.globalAlpha = 1.0; ctx.beginPath(); ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2); ctx.strokeStyle = isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.1)"; ctx.lineWidth = 2; ctx.stroke(); }
  }

  useEffect(() => {
    const handleMouseDown = (e) => {
      if (e.button !== 0) return;
      if (gameState !== 'playing' || !isActiveRef.current) return;
      const cvs = canvasRef.current; if (!cvs) return;
      const mouse = mousePositionRef.current; let hitIdx = -1;
      for (let i = 0; i < itemsRef.current.length; i++) { const dist = Math.hypot(mouse.x - itemsRef.current[i].x, mouse.y - itemsRef.current[i].y); if (dist < itemsRef.current[i].r) { hitIdx = i; break; } }
      if (hitIdx !== -1) {
        if (itemsRef.current[hitIdx].type === currentBatchRef.current) {
          const newStreak = streakRef.current + 1; streakRef.current = newStreak; setStreak(newStreak); setTotalProcessed(prev => prev + 1);
          if (newStreak > bestStreakRef.current) { bestStreakRef.current = newStreak; setBestStreak(newStreak); }
          scoreRef.current += 1; setScore(scoreRef.current);
          if (newStreak % 5 === 0 && newStreak > 0) { playSound('streak'); showFeedback(`🔥 ${newStreak} Streak! +1`, 'success'); }
          else { playSound('correct'); showFeedback('✓ +1', 'success'); }
          itemsRef.current.splice(hitIdx, 1);
          if (!itemsRef.current.some(i => i.type === currentBatchRef.current)) completeBatch(cvs);
        } else { applyPenalty(); playSound('wrong'); showFeedback('✗ Wrong batch!', 'error'); }
      }
    };
    window.addEventListener('mousedown', handleMouseDown); window.addEventListener('contextmenu', (e) => e.preventDefault());
    return () => { window.removeEventListener('mousedown', handleMouseDown); window.removeEventListener('contextmenu', (e) => e.preventDefault()); };
  }, [gameState, applyPenalty, completeBatch, playSound, showFeedback]);

  useEffect(() => { return () => { isActiveRef.current = false; if (timerIntervalRef.current) clearInterval(timerIntervalRef.current); if (batchTimerRef.current) clearTimeout(batchTimerRef.current); }; }, []);

  useEffect(() => {
    if (gameState !== 'playing') return;
    const cvs = canvasRef.current; if (!cvs) return; const ctx = cvs.getContext('2d');
    const updateCanvasSize = () => { const container = containerRef.current; if (!container) return; const containerRect = container.getBoundingClientRect(); let width = containerRect.width; let height = width * (9 / 16); if (height > containerRect.height) { height = containerRect.height; width = height * (16 / 9); } cvs.width = width; cvs.height = height; cvs.style.position = 'absolute'; cvs.style.left = `${(containerRect.width - width) / 2}px`; cvs.style.top = `${(containerRect.height - height) / 2}px`; };
    const resizeObserver = new ResizeObserver(updateCanvasSize); if (containerRef.current) resizeObserver.observe(containerRef.current);
    window.addEventListener('resize', updateCanvasSize); updateCanvasSize();
    itemsRef.current = []; for(let i = 0; i < itemsInBatchRef.current; i++) itemsRef.current.push(new Item(cvs));
    currentBatchRef.current = itemsRef.current[0].type; setCurrentBatch(currentBatchRef.current);
    batchTimerRef.current = setTimeout(() => { forceNewBatch(); }, BATCH_TIME);
    function draw() { ctx.fillStyle = isBoxDarkMode ? "#020202" : "#f9fafb"; ctx.fillRect(0, 0, cvs.width, cvs.height); ctx.strokeStyle = isBoxDarkMode ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)'; ctx.lineWidth = 1; for (let i = 0; i < cvs.width; i += 40) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, cvs.height); ctx.stroke(); } ctx.font = "bold 48px monospace"; ctx.textAlign = "center"; ctx.fillStyle = colors.current[currentBatchRef.current] || "#FFFFFF"; ctx.fillText(currentBatchRef.current, cvs.width / 2, 80); itemsRef.current.forEach(it => it.draw(ctx, isBoxDarkMode)); const m = mousePositionRef.current; if (m.x > 0 && m.x < cvs.width && m.y > 0 && m.y < cvs.height) { ctx.strokeStyle = "#00ff88"; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(m.x - 14, m.y); ctx.lineTo(m.x + 14, m.y); ctx.moveTo(m.x, m.y - 14); ctx.lineTo(m.x, m.y + 14); ctx.stroke(); ctx.beginPath(); ctx.arc(m.x, m.y, 20, 0, Math.PI * 2); ctx.strokeStyle = 'rgba(0, 255, 136, 0.3)'; ctx.stroke(); ctx.fillStyle = '#00ff88'; ctx.fillRect(m.x - 2, m.y - 2, 4, 4); } animationRef.current = requestAnimationFrame(draw); }
    animationRef.current = requestAnimationFrame(draw);
    return () => { if (animationRef.current) cancelAnimationFrame(animationRef.current); window.removeEventListener('resize', updateCanvasSize); resizeObserver.disconnect(); if (batchTimerRef.current) clearTimeout(batchTimerRef.current); };
  }, [gameState, isBoxDarkMode, forceNewBatch]);

  const startGame = useCallback(() => { setGameState('playing'); gameStateRef.current = 'playing'; setScore(0); setStreak(0); setBestStreak(0); setTotalProcessed(0); setBatchesCompleted(0); setLevel(1); setItemsInBatch(4); setTimeLeft(60); setLives(3); setFeedback(''); setAccuracy(100); isActiveRef.current = true; streakRef.current = 0; bestStreakRef.current = 0; scoreRef.current = 0; livesRef.current = 3; batchesCompletedRef.current = 0; levelRef.current = 1; itemsInBatchRef.current = 4; itemsRef.current = []; if (batchTimerRef.current) clearTimeout(batchTimerRef.current); }, []);
  const resetGame = useCallback(() => { if (timerIntervalRef.current) clearInterval(timerIntervalRef.current); if (batchTimerRef.current) clearTimeout(batchTimerRef.current); if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current); isActiveRef.current = false; if (animationRef.current) cancelAnimationFrame(animationRef.current); setGameState('start'); gameStateRef.current = 'start'; setScore(0); setStreak(0); setBestStreak(0); setTotalProcessed(0); setBatchesCompleted(0); setLevel(1); setItemsInBatch(4); setTimeLeft(60); setLives(3); setFeedback(''); setAccuracy(100); }, []);

  const sharePage = async () => { if (navigator.share) { try { await navigator.share({ title: 'Free Batch Processing Productivity Drill | SkillDrills', text: 'Train efficient task grouping with color-coded batch processing. Free!', url: 'https://skilldrills.online/drills/productivity/work-efficiency/batch-processing' }); } catch (e) {} } else { navigator.clipboard.writeText('https://skilldrills.online/drills/productivity/work-efficiency/batch-processing'); alert('Link copied!'); } };
  const copyPageLink = () => { navigator.clipboard.writeText('https://skilldrills.online/drills/productivity/work-efficiency/batch-processing'); alert('Link copied!'); };

  useEffect(() => { return () => { if (animationRef.current) cancelAnimationFrame(animationRef.current); if (timerIntervalRef.current) clearInterval(timerIntervalRef.current); if (batchTimerRef.current) clearTimeout(batchTimerRef.current); if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current); if (audioCtxRef.current) { audioCtxRef.current.close(); audioCtxRef.current = null; } }; }, []);

  if (loading || !isClient) return (<div className="min-h-screen flex items-center justify-center bg-gray-50"><div className="text-center"><div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div><p className="text-gray-600">Loading batch processing drill...</p></div></div>);

  return (
    <div className={`min-h-screen select-none ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", "name": "Batch Processing Drill - Work Efficiency & Task Grouping Training", "url": "https://skilldrills.online/drills/productivity/work-efficiency/batch-processing", "description": "Free work efficiency drill training task grouping with color-coded RED BLUE GREEN batches. Process matching colored circles in 2-second batch windows. Progressive difficulty adds 2 items per level every 3 completed batches. 3 lives system with penalty scoring. 60-second timed challenge with streak tracking.", "applicationCategory": "EducationalApplication", "operatingSystem": "All", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD", "availability": "https://schema.org/OnlineOnly" }, "author": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online" }, "publisher": { "@type": "Organization", "name": "SkillDrills" }, "educationalUse": ["Work Efficiency Training", "Task Batching Practice", "Processing Speed", "Productivity Development", "Cognitive Training"], "learningResourceType": ["Interactive Exercise", "Productivity Drill", "Processing Training"], "timeRequired": "PT60S", "interactivityType": "active", "inLanguage": "en-US", "teaches": ["Batch Processing", "Task Grouping", "Workflow Efficiency", "Processing Speed", "Time Management"], "educationalLevel": "All Levels", "typicalAgeRange": "12-80", "datePublished": "2026-05-14", "dateModified": new Date().toISOString().split('T')[0], "version": "1.0", "isAccessibleForFree": true, "accessMode": ["visual"], "accessModeSufficient": ["visual"] }) }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!isFullscreen && (<nav aria-label="Breadcrumb" className="mb-4"><ol className="flex flex-wrap items-center gap-2 text-sm"><li><Link href="/" className={`hover:underline transition-colors ${isDarkMode?'text-gray-400 hover:text-gray-200':'text-gray-600 hover:text-gray-900'}`}>Home</Link></li><li className={`${isDarkMode?'text-gray-500':'text-gray-400'}`} aria-hidden="true">/</li><li><Link href="/drills" className={`hover:underline transition-colors ${isDarkMode?'text-gray-400 hover:text-gray-200':'text-gray-600 hover:text-gray-900'}`}>Drills</Link></li><li className={`${isDarkMode?'text-gray-500':'text-gray-400'}`} aria-hidden="true">/</li><li><Link href="/drills/productivity" className={`hover:underline transition-colors ${isDarkMode?'text-gray-400 hover:text-gray-200':'text-gray-600 hover:text-gray-900'}`}>Productivity</Link></li><li className={`${isDarkMode?'text-gray-500':'text-gray-400'}`} aria-hidden="true">/</li><li className={`${isDarkMode?'text-gray-500':'text-gray-400'}`}>Work Efficiency</li><li className={`${isDarkMode?'text-gray-500':'text-gray-400'}`} aria-hidden="true">/</li><li className={`font-medium ${isDarkMode?'text-purple-400':'text-purple-600'}`} aria-current="page">Batch Processing</li></ol></nav>)}
        {!isFullscreen && (<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6"><div className="flex items-center gap-3"><div className="p-3 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl flex-shrink-0"><Layers className="w-6 h-6 text-white" /></div><div><h1 className={`text-2xl sm:text-3xl font-bold ${isDarkMode?'text-white':'text-gray-900'}`}>Batch Processing</h1><p className={`text-sm sm:text-base ${isDarkMode?'text-gray-400':'text-gray-500'}`}>Free work efficiency drill • 2 sec per batch • 3 lives • Level up every 3 batches • 60s</p></div></div><div className="flex gap-2 flex-shrink-0">{gameState==='playing'&&<button onClick={resetGame} className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode?'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700':'bg-white border-gray-200 text-gray-700 hover:bg-gray-100'}`} title="Reset" aria-label="Reset"><RefreshCw className="w-5 h-5" /></button>}<button onClick={()=>setIsDarkMode(!isDarkMode)} className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode?'bg-gray-800 border-gray-700 text-gray-300':'bg-white border-gray-200 text-gray-700'}`} aria-label={isDarkMode?'Light mode':'Dark mode'}>{isDarkMode?<Sun className="w-5 h-5" />:<Moon className="w-5 h-5" />}</button><button onClick={()=>setIsBoxDarkMode(!isBoxDarkMode)} className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode?'bg-gray-800 border-gray-700 text-gray-300':'bg-white border-gray-200 text-gray-700'}`} aria-label="Theme"><Eye className="w-5 h-5" /></button><button onClick={()=>setSoundEnabled(!soundEnabled)} className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode?'bg-gray-800 border-gray-700 text-gray-300':'bg-white border-gray-200 text-gray-700'}`} aria-label="Sound">{soundEnabled?<Volume2 className="w-5 h-5" />:<VolumeX className="w-5 h-5" />}</button><button onClick={toggleFullscreen} className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode?'bg-gray-800 border-gray-700 text-gray-300':'bg-white border-gray-200 text-gray-700'}`} aria-label="Fullscreen">{isFullscreen?<Minimize2 className="w-5 h-5" />:<Maximize2 className="w-5 h-5" />}</button></div></div>)}
        <section className="sr-only"><h2>Batch Processing - Work Efficiency & Task Grouping Training</h2><p>Train efficient task grouping by processing color-coded batches under time pressure. Click circles matching the current batch color (RED, BLUE, or GREEN) displayed at top. 2 seconds per batch to clear all matching items. New batch spawns after clearing or timeout. Level up every 3 completed batches - each level adds 2 more items per batch (starts at 4). 3 lives protect your score from mistakes. After lives reach 0, wrong clicks/timeouts deduct 1 point. +1 point per correct item with combo streaks every 5 consecutive correct clicks. 60-second challenge with progressive difficulty and accuracy tracking.</p></section>
        {!isFullscreen && (<div className="grid grid-cols-7 gap-3 mb-4 h-[88px]"><StatCard icon={<Target className="text-blue-600" />} value={score} label="Score" isDark={isDarkMode} /><StatCard icon={<Trophy className="text-yellow-500" />} value={bestScore} label="Best" isDark={isDarkMode} /><StatCard icon={<Timer className={timeLeft<15?'text-red-600':'text-green-600'} />} value={timeLeft} label="Time" unit="s" isDark={isDarkMode} /><StatCard icon={<TrendingUp className="text-purple-500" />} value={level} label="Level" isDark={isDarkMode} /><StatCard icon={<Layers className="text-cyan-500" />} value={totalProcessed} label="Processed" isDark={isDarkMode} /><StatCard icon={<Zap className="text-orange-500" />} value={streak} label="Streak" isDark={isDarkMode} /><StatCard icon={<Heart className={lives>0?'text-red-500':'text-gray-500'} />} value={lives} label="Lives" isDark={isDarkMode} /></div>)}
        <div className="h-10 mb-2 flex justify-center items-center"><div className={`px-4 py-1.5 rounded-lg text-white font-semibold text-sm transition-all duration-200 ${feedback?'opacity-100 scale-100':'opacity-0 scale-95'} ${feedbackType==='success'?'bg-green-500':feedbackType==='warning'?'bg-yellow-500':'bg-red-500'}`} role="status" aria-live="polite" aria-atomic="true">{feedback||'\u00A0'}</div></div>
        <div ref={containerRef} className={`relative ${isFullscreen?'fixed inset-0 z-50':'rounded-xl border-2'}`} style={{background:isBoxDarkMode?"#020202":"#ffffff",aspectRatio:isFullscreen?'auto':'16/9',maxWidth:'100%',margin:'0 auto',borderColor:isDarkMode?'#374151':'#e5e7eb',overflow:'hidden'}}>
          {isFullscreen&&gameState==='playing'&&(<><div className="absolute top-4 right-4 z-30 flex gap-3"><button onClick={resetGame} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all" title="Reset" aria-label="Reset"><RefreshCw className="w-5 h-5" /></button><button onClick={()=>setIsDarkMode(!isDarkMode)} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all" aria-label="Dark mode">{isDarkMode?<Sun className="w-5 h-5" />:<Moon className="w-5 h-5" />}</button><button onClick={()=>setIsBoxDarkMode(!isBoxDarkMode)} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all" aria-label="Theme"><Eye className="w-5 h-5" /></button><button onClick={()=>setSoundEnabled(!soundEnabled)} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all" aria-label="Sound">{soundEnabled?<Volume2 className="w-5 h-5" />:<VolumeX className="w-5 h-5" />}</button><button onClick={toggleFullscreen} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all" aria-label="Exit fullscreen"><Minimize2 className="w-5 h-5" /></button></div><div className="absolute top-4 left-4 z-30 bg-black/50 backdrop-blur-sm rounded-lg px-4 py-2 text-white text-sm" aria-live="polite">Lv.{level} | Score: <span className="text-yellow-400 font-bold">{score}</span> | Lives: <span className="text-red-400 font-bold">{lives}</span> | Batch: <span style={{color:colors.current[currentBatch]}} className="font-bold">{currentBatch}</span></div></>)}
          <canvas ref={canvasRef} style={{display:'block',position:'absolute',cursor:'none'}} aria-hidden="true" />
          {gameState==='start'&&(<div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode?'bg-gray-900/95':'bg-white/95'}`}><div className={`rounded-2xl p-6 sm:p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode?'bg-gray-800 border-gray-700':'bg-white border-gray-200'}`}><div className="mb-4"><Layers className="w-16 h-16 text-purple-500 mx-auto" aria-hidden="true" /></div><h2 className={`text-2xl font-bold mb-2 ${isBoxDarkMode?'text-white':'text-gray-900'}`}>Batch Processing</h2><p className={`mb-2 ${isBoxDarkMode?'text-gray-300':'text-gray-600'}`}>2 sec per batch • 3 lives • +1 per item • Level up every 3 batches</p><p className={`mb-6 text-sm ${isBoxDarkMode?'text-gray-400':'text-gray-500'}`}>Click circles matching the batch color at top. Clear all to complete. More items each level.</p><button onClick={startGame} className="px-8 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg w-full transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2" aria-label="Start batch processing">Start Free Drill</button></div></div>)}
          {gameState==='gameOver'&&(<div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode?'bg-gray-900/95':'bg-white/95'}`}><div className={`rounded-2xl p-6 sm:p-8 shadow-xl border w-full max-w-[480px] mx-4 ${isBoxDarkMode?'bg-gray-800 border-gray-700':'bg-white border-gray-200'}`}><div className="flex items-center justify-center gap-3 mb-4"><Clock className="w-10 h-10 text-orange-500" aria-hidden="true" /><h2 className={`text-2xl font-bold ${isBoxDarkMode?'text-white':'text-gray-900'}`}>Session Complete!</h2></div><p className={`text-center text-sm mb-6 ${isBoxDarkMode?'text-gray-400':'text-gray-500'}`}>Batch processing practice improves workflow efficiency and task grouping speed.</p><div className="grid grid-cols-2 gap-3 mb-6"><ResultCard label="Final Score" value={score} icon={<Target className="w-4 h-4" />} color="blue" isDark={isBoxDarkMode} /><ResultCard label="Best Score" value={bestScore} icon={<Trophy className="w-4 h-4" />} color="yellow" isDark={isBoxDarkMode} /><ResultCard label="Max Level" value={level} icon={<TrendingUp className="w-4 h-4" />} color="purple" isDark={isBoxDarkMode} /><ResultCard label="Items Done" value={totalProcessed} icon={<Layers className="w-4 h-4" />} color="cyan" isDark={isBoxDarkMode} /><ResultCard label="Best Streak" value={`${bestStreak}x`} icon={<Zap className="w-4 h-4" />} color="orange" isDark={isBoxDarkMode} /><ResultCard label="Batches" value={batchesCompleted} icon={<Layers className="w-4 h-4" />} color="emerald" isDark={isBoxDarkMode} /></div><div className="flex gap-3"><Link href="/drills/productivity" className="flex-1"><button className={`w-full px-4 py-2.5 rounded-lg font-semibold transition-all ${isDarkMode?'bg-gray-700 text-gray-300 hover:bg-gray-600':'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>← Back</button></Link><button onClick={startGame} className="flex-1 px-4 py-2.5 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">Play Again →</button></div></div></div>)}
        </div>
        {!isFullscreen&&(<footer className="mt-6" aria-label="Drill rules"><div className={`rounded-xl border overflow-hidden ${isDarkMode?'bg-gray-800 border-gray-700':'bg-white border-gray-200'}`}><div className={`px-4 py-3 border-b ${isDarkMode?'border-gray-700 bg-gray-800/50':'border-gray-200 bg-gray-50'}`}><div className="flex items-center gap-2"><Info className={`w-4 h-4 ${isDarkMode?'text-purple-400':'text-purple-600'}`} aria-hidden="true" /><h2 className={`font-semibold ${isDarkMode?'text-white':'text-gray-900'}`}>Drill Rules & Scoring</h2></div></div><div className="p-4"><div className="grid grid-cols-1 md:grid-cols-2 gap-4"><div className="space-y-3"><div className="flex items-start gap-2"><div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">1</div><p className={`text-sm ${isDarkMode?'text-gray-300':'text-gray-600'}`}><span className="font-semibold text-purple-500">2 seconds per batch</span> • Click matching colored circles</p></div><div className="flex items-start gap-2"><div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">2</div><p className={`text-sm ${isDarkMode?'text-gray-300':'text-gray-600'}`}>Correct click: <span className="font-semibold text-green-500">+1 point</span></p></div><div className="flex items-start gap-2"><div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">3</div><p className={`text-sm ${isDarkMode?'text-gray-300':'text-gray-600'}`}>Level up <span className="font-semibold text-blue-500">every 3 batches</span> • +2 items per level</p></div></div><div className="space-y-3"><div className="flex items-start gap-2"><div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">4</div><p className={`text-sm ${isDarkMode?'text-gray-300':'text-gray-600'}`}>Wrong click/timeout (has lives): <span className="font-semibold text-red-500">-1 life</span></p></div><div className="flex items-start gap-2"><div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">5</div><p className={`text-sm ${isDarkMode?'text-gray-300':'text-gray-600'}`}>Wrong click/timeout (0 lives): <span className="font-semibold text-orange-500">-1 point penalty</span></p></div><div className="flex items-start gap-2"><div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">6</div><p className={`text-sm ${isDarkMode?'text-gray-300':'text-gray-600'}`}>5 streak = <span className="font-semibold text-yellow-500">combo notification</span> • Score never below 0</p></div></div></div><div className={`mt-4 pt-3 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs ${isDarkMode?'border-gray-700 text-gray-400':'border-gray-200 text-gray-500'}`}><span>📦 RED • BLUE • GREEN batches | Progressive difficulty</span><span>🏆 Best Score saves locally</span></div></div></div></footer>)}

        {!isFullscreen && (
          <section className="mt-8" aria-label="About this batch processing productivity drill">
            <div className={`rounded-xl border overflow-hidden ${isDarkMode?'bg-gray-800 border-gray-700':'bg-white border-gray-200'}`}><div className={`px-4 py-3 border-b ${isDarkMode?'border-gray-700 bg-gray-800/50':'border-gray-200 bg-gray-50'}`}><div className="flex items-center gap-2"><GraduationCap className={`w-5 h-5 ${isDarkMode?'text-purple-400':'text-purple-600'}`} aria-hidden="true" /><h2 className={`font-semibold ${isDarkMode?'text-white':'text-gray-900'}`}>About This Free Batch Processing Drill</h2></div></div>
              <div className="p-5">
                <p className={`text-sm leading-relaxed mb-5 ${isDarkMode?'text-gray-300':'text-gray-600'}`}>This free Batch Processing drill trains work efficiency by simulating the productivity technique of grouping similar tasks together. Three color-coded batch types (RED, BLUE, GREEN) appear as circles on the canvas with the current batch color displayed prominently at the top. You have 2 seconds per batch window to click all circles matching the current color. Each correct click earns +1 point and builds your streak. The progressive difficulty system adds 2 more items per batch every 3 completed batches, starting at 4 items and scaling up with no upper limit. A 3 lives system protects your score initially - mistakes cost lives before deducting points. Perfect for developing processing speed, task grouping efficiency, and the ability to quickly identify and handle similar items under time pressure - skills directly transferable to email triage, data processing, and workflow management.</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
                  <div className={`p-4 rounded-xl border ${isDarkMode?'bg-gray-700/50 border-gray-600':'bg-purple-50 border-purple-100'}`}><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-purple-500 flex items-center justify-center"><GraduationCap className="w-4 h-4 text-white" /></div><h3 className={`text-sm font-semibold ${isDarkMode?'text-white':'text-gray-900'}`}>Who It's For</h3></div><p className={`text-xs leading-relaxed ${isDarkMode?'text-gray-400':'text-gray-500'}`}>Professionals wanting better task grouping, knowledge workers improving email and data processing speed, and anyone wanting to develop workflow efficiency and batch processing habits.</p></div>
                  <div className={`p-4 rounded-xl border ${isDarkMode?'bg-gray-700/50 border-gray-600':'bg-green-50 border-green-100'}`}><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-green-500 flex items-center justify-center"><TrendingUp className="w-4 h-4 text-white" /></div><h3 className={`text-sm font-semibold ${isDarkMode?'text-white':'text-gray-900'}`}>Skills Improved</h3></div><p className={`text-xs leading-relaxed ${isDarkMode?'text-gray-400':'text-gray-500'}`}>Task batching efficiency, processing speed, color-coded task grouping, workflow optimization, and rapid item identification under time pressure.</p></div>
                  <div className={`p-4 rounded-xl border ${isDarkMode?'bg-gray-700/50 border-gray-600':'bg-purple-50 border-purple-100'}`}><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-purple-500 flex items-center justify-center"><BarChart3 className="w-4 h-4 text-white" /></div><h3 className={`text-sm font-semibold ${isDarkMode?'text-white':'text-gray-900'}`}>What You'll Track</h3></div><p className={`text-xs leading-relaxed ${isDarkMode?'text-gray-400':'text-gray-500'}`}>Score, level progression, items processed, batches completed, streak count, lives remaining, and best performance records saved locally.</p></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className={`p-4 rounded-xl border ${isDarkMode?'bg-gray-700/50 border-gray-600':'bg-yellow-50 border-yellow-100'}`}><div className="flex items-center gap-2 mb-3"><div className="w-8 h-8 rounded-lg bg-yellow-500 flex items-center justify-center"><Lightbulb className="w-4 h-4 text-white" /></div><h3 className={`text-sm font-semibold ${isDarkMode?'text-white':'text-gray-900'}`}>Why Practice Batch Processing?</h3></div><ul className={`text-xs space-y-2 ${isDarkMode?'text-gray-400':'text-gray-600'}`}><li className="flex items-start gap-2"><CheckCircle2 className="w-3 h-3 text-yellow-500 mt-0.5 flex-shrink-0" />Core productivity technique used in GTD and time management methodologies</li><li className="flex items-start gap-2"><CheckCircle2 className="w-3 h-3 text-yellow-500 mt-0.5 flex-shrink-0" />Builds the habit of grouping similar tasks for efficient processing</li><li className="flex items-start gap-2"><CheckCircle2 className="w-3 h-3 text-yellow-500 mt-0.5 flex-shrink-0" />Progressive difficulty mirrors real-world increasing workload demands</li></ul></div>
                  <div className={`p-4 rounded-xl border ${isDarkMode?'bg-gray-700/50 border-gray-600':'bg-orange-50 border-orange-100'}`}><div className="flex items-center gap-2 mb-3"><div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center"><Clock className="w-4 h-4 text-white" /></div><h3 className={`text-sm font-semibold ${isDarkMode?'text-white':'text-gray-900'}`}>How to Practice Effectively</h3></div><ol className={`text-xs space-y-2 ${isDarkMode?'text-gray-400':'text-gray-600'}`}><li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">1</span>Focus on one color at a time as displayed by the batch indicator</li><li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">2</span>Clear all matching circles before the 2-second batch timer expires</li><li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">3</span>Build streaks of 5+ for combo notifications and faster scoring</li><li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">4</span>Practice 10-15 minutes daily for best workflow efficiency improvement</li></ol></div>
                </div>
              </div>
            </div>
          </section>
        )}

        {!isFullscreen && (
          <section className="mt-8" aria-label="Related productivity and cognitive drills">
            <div className="flex items-center gap-2 mb-4"><div className="w-1 h-6 rounded-full bg-gradient-to-b from-purple-500 to-indigo-600"></div><h2 className={`text-xl font-bold ${isDarkMode?'text-white':'text-gray-900'}`}>Explore Related Drills</h2><span className={`text-xs px-2 py-0.5 rounded-full ${isDarkMode?'bg-gray-700 text-gray-400':'bg-gray-100 text-gray-500'}`}>8 drills</span></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link href="/drills/memory/working-memory/n-back" className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDarkMode?'bg-gray-800 border-gray-700 hover:border-blue-500':'bg-white border-gray-200 hover:border-blue-300'}`}><div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-500"></div><div className="p-4"><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center"><Brain className="w-4 h-4 text-blue-600" /></div><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isDarkMode?'bg-gray-700 text-gray-400':'bg-gray-100 text-gray-500'}`}>Memory</span></div><h3 className={`font-semibold text-sm mb-1 ${isDarkMode?'text-white group-hover:text-blue-400':'text-gray-900 group-hover:text-blue-600'} transition-colors`}>3-Back Training</h3><p className={`text-xs leading-relaxed ${isDarkMode?'text-gray-500':'text-gray-400'}`}>Classic N-Back working memory task at 3-back with 60 letters per round.</p><div className="flex items-center gap-1 mt-3 text-blue-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Start Drill <ArrowRight className="w-3 h-3" /></div></div></Link>
              <Link href="/drills/memory/working-memory/mental-arithmetic" className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDarkMode?'bg-gray-800 border-gray-700 hover:border-green-500':'bg-white border-gray-200 hover:border-green-300'}`}><div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 to-emerald-500"></div><div className="p-4"><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center"><Star className="w-4 h-4 text-green-600" /></div><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isDarkMode?'bg-gray-700 text-gray-400':'bg-gray-100 text-gray-500'}`}>Memory</span></div><h3 className={`font-semibold text-sm mb-1 ${isDarkMode?'text-white group-hover:text-green-400':'text-gray-900 group-hover:text-green-600'} transition-colors`}>Mental Arithmetic</h3><p className={`text-xs leading-relaxed ${isDarkMode?'text-gray-500':'text-gray-400'}`}>Solve timed math problems with 4 operations across 8 adaptive levels.</p><div className="flex items-center gap-1 mt-3 text-green-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Start Drill <ArrowRight className="w-3 h-3" /></div></div></Link>
              <Link href="/drills/memory/short-term-memory/digit-span" className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDarkMode?'bg-gray-800 border-gray-700 hover:border-purple-500':'bg-white border-gray-200 hover:border-purple-300'}`}><div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-violet-500"></div><div className="p-4"><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center"><Brain className="w-4 h-4 text-purple-600" /></div><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isDarkMode?'bg-gray-700 text-gray-400':'bg-gray-100 text-gray-500'}`}>Memory</span></div><h3 className={`font-semibold text-sm mb-1 ${isDarkMode?'text-white group-hover:text-purple-400':'text-gray-900 group-hover:text-purple-600'} transition-colors`}>Digit Span</h3><p className={`text-xs leading-relaxed ${isDarkMode?'text-gray-500':'text-gray-400'}`}>Recall increasingly long digit sequences with infinite progressive levels.</p><div className="flex items-center gap-1 mt-3 text-purple-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Start Drill <ArrowRight className="w-3 h-3" /></div></div></Link>
              <Link href="/drills/visual/visual-recognition/visual-search" className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDarkMode?'bg-gray-800 border-gray-700 hover:border-orange-500':'bg-white border-gray-200 hover:border-orange-300'}`}><div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-amber-500"></div><div className="p-4"><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center"><Star className="w-4 h-4 text-orange-600" /></div><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isDarkMode?'bg-gray-700 text-gray-400':'bg-gray-100 text-gray-500'}`}>Visual</span></div><h3 className={`font-semibold text-sm mb-1 ${isDarkMode?'text-white group-hover:text-orange-400':'text-gray-900 group-hover:text-orange-600'} transition-colors`}>Visual Search</h3><p className={`text-xs leading-relaxed ${isDarkMode?'text-gray-500':'text-gray-400'}`}>Find letter C among 160 rotated O distractors in a 16×10 grid.</p><div className="flex items-center gap-1 mt-3 text-orange-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Start Drill <ArrowRight className="w-3 h-3" /></div></div></Link>
              <Link href="/drills/visual/visual-recognition/entropic-grid" className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDarkMode?'bg-gray-800 border-gray-700 hover:border-cyan-500':'bg-white border-gray-200 hover:border-cyan-300'}`}><div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-teal-500"></div><div className="p-4"><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-cyan-100 flex items-center justify-center"><Search className="w-4 h-4 text-cyan-600" /></div><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isDarkMode?'bg-gray-700 text-gray-400':'bg-gray-100 text-gray-500'}`}>Visual</span></div><h3 className={`font-semibold text-sm mb-1 ${isDarkMode?'text-white group-hover:text-cyan-400':'text-gray-900 group-hover:text-cyan-600'} transition-colors`}>Entropic Grid</h3><p className={`text-xs leading-relaxed ${isDarkMode?'text-gray-500':'text-gray-400'}`}>Find 2-char targets in 100-cell grid with entropy and stamina system.</p><div className="flex items-center gap-1 mt-3 text-cyan-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Start Drill <ArrowRight className="w-3 h-3" /></div></div></Link>
              <Link href="/drills/fps/flick-shot-training" className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDarkMode?'bg-gray-800 border-gray-700 hover:border-red-500':'bg-white border-gray-200 hover:border-red-300'}`}><div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-rose-500"></div><div className="p-4"><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center"><Target className="w-4 h-4 text-red-600" /></div><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isDarkMode?'bg-gray-700 text-gray-400':'bg-gray-100 text-gray-500'}`}>FPS</span></div><h3 className={`font-semibold text-sm mb-1 ${isDarkMode?'text-white group-hover:text-red-400':'text-gray-900 group-hover:text-red-600'} transition-colors`}>Flick Shot Trainer</h3><p className={`text-xs leading-relaxed ${isDarkMode?'text-gray-500':'text-gray-400'}`}>Improve aim with raw mouse input flick training and adaptive target windows.</p><div className="flex items-center gap-1 mt-3 text-red-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Start Drill <ArrowRight className="w-3 h-3" /></div></div></Link>
              <Link href="/drills/memory/spatial-memory/path-tracing" className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDarkMode?'bg-gray-800 border-gray-700 hover:border-teal-500':'bg-white border-gray-200 hover:border-teal-300'}`}><div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 to-emerald-500"></div><div className="p-4"><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center"><Star className="w-4 h-4 text-teal-600" /></div><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isDarkMode?'bg-gray-700 text-gray-400':'bg-gray-100 text-gray-500'}`}>Memory</span></div><h3 className={`font-semibold text-sm mb-1 ${isDarkMode?'text-white group-hover:text-teal-400':'text-gray-900 group-hover:text-teal-600'} transition-colors`}>Path Tracing</h3><p className={`text-xs leading-relaxed ${isDarkMode?'text-gray-500':'text-gray-400'}`}>Watch animated dot paths then retrace them in exact order on expanding grids.</p><div className="flex items-center gap-1 mt-3 text-teal-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Start Drill <ArrowRight className="w-3 h-3" /></div></div></Link>
              <Link href="/drills/cognitive/memory/card-matching" className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDarkMode?'bg-gray-800 border-gray-700 hover:border-indigo-500':'bg-white border-gray-200 hover:border-indigo-300'}`}><div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-blue-500"></div><div className="p-4"><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center"><Activity className="w-4 h-4 text-indigo-600" /></div><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isDarkMode?'bg-gray-700 text-gray-400':'bg-gray-100 text-gray-500'}`}>Cognitive</span></div><h3 className={`font-semibold text-sm mb-1 ${isDarkMode?'text-white group-hover:text-indigo-400':'text-gray-900 group-hover:text-indigo-600'} transition-colors`}>Card Matching</h3><p className={`text-xs leading-relaxed ${isDarkMode?'text-gray-500':'text-gray-400'}`}>Classic memory card game to improve visual memory and concentration.</p><div className="flex items-center gap-1 mt-3 text-indigo-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Start Drill <ArrowRight className="w-3 h-3" /></div></div></Link>
            </div>
          </section>
        )}

        {!isFullscreen && (
          <footer className="mt-12 bg-gray-900 text-gray-400 rounded-xl py-10 px-6" role="contentinfo">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 mb-8">
                <div><h3 className="text-white font-semibold mb-3 text-sm">Productivity</h3><ul className="space-y-2 text-sm"><li><Link href="/drills/productivity/work-efficiency/batch-processing" className="hover:text-white transition-colors">Batch Processing</Link></li><li><Link href="/drills/memory/working-memory/n-back" className="hover:text-white transition-colors">3-Back Training</Link></li><li><Link href="/drills/memory/working-memory/mental-arithmetic" className="hover:text-white transition-colors">Mental Arithmetic</Link></li><li><Link href="/drills/productivity" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">All 10 Productivity Drills →</Link></li></ul></div>
                <div><h3 className="text-white font-semibold mb-3 text-sm">Memory</h3><ul className="space-y-2 text-sm"><li><Link href="/drills/memory/short-term-memory/digit-span" className="hover:text-white transition-colors">Digit Span</Link></li><li><Link href="/drills/memory/spatial-memory/path-tracing" className="hover:text-white transition-colors">Path Tracing</Link></li><li><Link href="/drills/memory/associative-memory/concept-linking" className="hover:text-white transition-colors">Concept Linking</Link></li><li><Link href="/drills/memory" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">All 15 Memory Drills →</Link></li></ul></div>
                <div><h3 className="text-white font-semibold mb-3 text-sm">Visual</h3><ul className="space-y-2 text-sm"><li><Link href="/drills/visual/visual-recognition/visual-search" className="hover:text-white transition-colors">Visual Search</Link></li><li><Link href="/drills/visual/visual-recognition/entropic-grid" className="hover:text-white transition-colors">Entropic Grid</Link></li><li><Link href="/drills/visual/tracking-accuracy/moving-target" className="hover:text-white transition-colors">Kinetic Intercept</Link></li><li><Link href="/drills/visual" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">All 14 Visual Drills →</Link></li></ul></div>
                <div><h3 className="text-white font-semibold mb-3 text-sm">FPS & Cognitive</h3><ul className="space-y-2 text-sm"><li><Link href="/drills/fps/flick-shot-training" className="hover:text-white transition-colors">Flick Shot Trainer</Link></li><li><Link href="/drills/cognitive/memory/card-matching" className="hover:text-white transition-colors">Card Matching</Link></li><li><Link href="/drills/cognitive/attention/divided-attention" className="hover:text-white transition-colors">Attention Drills</Link></li><li><Link href="/drills/cognitive" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">All 16 Cognitive Drills →</Link></li></ul></div>
                <div><h3 className="text-white font-semibold mb-3 text-sm">More Categories</h3><ul className="space-y-2 text-sm"><li><Link href="/drills/academic" className="hover:text-white transition-colors">Academic (12 drills)</Link></li><li><Link href="/drills/physical" className="hover:text-white transition-colors">Physical (11 drills)</Link></li><li><Link href="/drills/mental-fitness" className="hover:text-white transition-colors">Mental Fitness (6 drills)</Link></li><li><Link href="/drills" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">All Drills →</Link></li></ul></div>
              </div>
              <div className="border-t border-gray-800 pt-8 text-center">
                <div className="flex items-center justify-center gap-3 mb-4"><div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center"><Brain className="w-5 h-5 text-white" aria-hidden="true" /></div><span className="text-white font-bold text-lg">SkillDrills</span></div>
                <p className="text-sm mb-2">&copy; 2026 SkillDrills. All rights reserved.</p>
                <p className="text-xs max-w-2xl mx-auto leading-relaxed mb-6">Free online batch processing drill for work efficiency training. Color-coded RED BLUE GREEN batches with 2-second windows. Progressive difficulty adds items per level. Perfect for professionals wanting better task grouping. No registration required. More free drills at skilldrills.online.</p>
                <div className="flex items-center justify-center gap-5 flex-wrap">
                  <button onClick={sharePage} className="text-gray-500 hover:text-white transition-colors" title="Share" aria-label="Share"><Share2 className="w-5 h-5" /></button>
                  <button onClick={copyPageLink} className="text-gray-500 hover:text-white transition-colors" title="Copy" aria-label="Copy"><Copy className="w-5 h-5" /></button>
                  <a href="https://twitter.com/skilldrillss" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors" title="Twitter" aria-label="Twitter"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
                  <a href="https://instagram.com/skilldrills.online" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors" title="Instagram" aria-label="Instagram"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg></a>
                  <a href="https://youtube.com/@skilldrills.online" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors" title="YouTube" aria-label="YouTube"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg></a>
                  <a href="https://pinterest.com/skilldrills" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors" title="Pinterest" aria-label="Pinterest"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/></svg></a>
                </div>
              </div>
            </div>
          </footer>
        )}
      </div>
    </div>
  );
}

function StatCard({ icon, value, label, unit = '', isDark }) { return (<div className={`rounded-xl shadow-sm border p-2 sm:p-3 text-center flex flex-col justify-center h-full transition-colors ${isDark?'bg-gray-800 border-gray-700':'bg-white border-gray-100'}`}><div className="mb-1 flex justify-center" aria-hidden="true">{icon}</div><p className={`text-lg sm:text-xl font-bold truncate ${isDark?'text-white':'text-gray-900'}`}>{value}{unit}</p><p className={`text-[10px] sm:text-xs truncate ${isDark?'text-gray-400':'text-gray-500'}`}>{label}</p></div>); }
function ResultCard({ label, value, unit = '', icon, color, isDark }) { const colorMap = { blue:{bg:'bg-blue-500/10',border:'border-blue-500/30',text:'text-blue-500',icon:'text-blue-500'}, yellow:{bg:'bg-yellow-500/10',border:'border-yellow-500/30',text:'text-yellow-500',icon:'text-yellow-500'}, purple:{bg:'bg-purple-500/10',border:'border-purple-500/30',text:'text-purple-500',icon:'text-purple-500'}, cyan:{bg:'bg-cyan-500/10',border:'border-cyan-500/30',text:'text-cyan-500',icon:'text-cyan-500'}, orange:{bg:'bg-orange-500/10',border:'border-orange-500/30',text:'text-orange-500',icon:'text-orange-500'}, green:{bg:'bg-green-500/10',border:'border-green-500/30',text:'text-green-500',icon:'text-green-500'}, emerald:{bg:'bg-emerald-500/10',border:'border-emerald-500/30',text:'text-emerald-500',icon:'text-emerald-500'}, red:{bg:'bg-red-500/10',border:'border-red-500/30',text:'text-red-500',icon:'text-red-500'} }; const c=colorMap[color]||colorMap.blue; return (<div className={`flex items-center justify-between p-3 rounded-lg border ${c.bg} ${c.border}`}><div className="flex items-center gap-2 min-w-0"><div className={c.icon} aria-hidden="true">{icon}</div><span className={`text-xs sm:text-sm truncate ${isDark?'text-gray-300':'text-gray-600'}`}>{label}</span></div><span className={`font-bold text-base sm:text-lg flex-shrink-0 ml-2 ${c.text}`}>{value}{unit}</span></div>); }