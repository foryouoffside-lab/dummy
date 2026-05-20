'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Target, Zap, Clock, Award, Activity, 
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, 
  Eye, Move, Brain, TrendingUp, Trophy, Info, Timer, AlertCircle, Grid, RefreshCw,
  Crosshair, Dumbbell, Database, Keyboard, Star, Users,
  GraduationCap, Lightbulb, CheckCircle2, ArrowRight,
  BookOpen, Hash, Code2, Heart
} from 'lucide-react';

class Ladder {
  constructor(yPos) {
    this.y = yPos;
    this.rungs = [
      { side: 'left', x: -40, active: false, stepped: false },
      { side: 'right', x: 40, active: false, stepped: false },
      { side: 'left', x: -40, active: false, stepped: false },
      { side: 'right', x: 40, active: false, stepped: false }
    ];
    this.currentRungIndex = 0;
    this.completed = false;
    this.failed = false;
  }

  checkStep(mouseX, mouseY, scrollOffset, canvasWidth, canvasHeight) {
    if (this.completed || this.failed) return false;
    const screenY = this.y + scrollOffset;
    const centerX = canvasWidth / 2;
    const rungSpacing = 45;
    if (screenY > canvasHeight + 100 || screenY < -100) return false;
    const currentRung = this.rungs[this.currentRungIndex];
    const rungY = screenY + (this.currentRungIndex * rungSpacing);
    const rungX = centerX + currentRung.x;
    const dist = Math.hypot(mouseX - rungX, mouseY - rungY);
    if (dist < 15 && !currentRung.stepped) {
      currentRung.stepped = true;
      currentRung.active = true;
      this.currentRungIndex++;
      if (this.currentRungIndex >= 4) { this.completed = true; return { type: 'complete', points: 2 }; }
      return { type: 'step', points: 1 };
    }
    return false;
  }

  checkFailure(scrollOffset, canvasHeight) {
    if (this.completed || this.failed) return false;
    const screenY = this.y + scrollOffset;
    if (screenY > canvasHeight - 50 && this.currentRungIndex < 4) { this.failed = true; return true; }
    return false;
  }

  draw(ctx, scrollOffset, canvasWidth, canvasHeight) {
    const screenY = this.y + scrollOffset;
    const centerX = canvasWidth / 2;
    const rungSpacing = 45;
    if (screenY > canvasHeight + 200 || screenY < -200) return;
    ctx.strokeStyle = "#333333"; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(centerX - 50, screenY - 20); ctx.lineTo(centerX - 50, screenY + 180);
    ctx.moveTo(centerX + 50, screenY - 20); ctx.lineTo(centerX + 50, screenY + 180); ctx.stroke();
    this.rungs.forEach((rung, i) => {
      const rungY = screenY + (i * rungSpacing); const rungX = centerX + rung.x;
      ctx.beginPath(); ctx.rect(rungX - 12, rungY - 12, 24, 24);
      if (rung.stepped) { ctx.fillStyle = "#FFFFFF"; ctx.fill(); }
      else if (i === this.currentRungIndex && !this.completed && !this.failed) { ctx.strokeStyle = "#00ff88"; ctx.lineWidth = 2; ctx.stroke(); }
      else { ctx.strokeStyle = this.failed ? "#222222" : "#555555"; ctx.lineWidth = 1.5; ctx.stroke(); }
    });
    if (this.completed) { ctx.beginPath(); ctx.moveTo(centerX - 8, screenY + 85); ctx.lineTo(centerX - 2, screenY + 93); ctx.lineTo(centerX + 10, screenY + 78); ctx.strokeStyle = "#00ff88"; ctx.lineWidth = 2; ctx.stroke(); }
  }
}

export default function AgilityLadderClient() {
  const [loading, setLoading] = useState(true);
  const canvasRef = useRef(null);
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
  const [timeLeft, setTimeLeft] = useState(60);
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  const [laddersCompleted, setLaddersCompleted] = useState(0);
  const [currentSpeed, setCurrentSpeed] = useState(150);
  const [isClient, setIsClient] = useState(false);
  
  const mousePos = useRef({ x: 0, y: 0 });
  const ladders = useRef([]);
  const scrollY = useRef(0);
  const scrollSpeed = useRef(150);
  const isPenaltyActive = useRef(false);
  const animationId = useRef(null);
  const timerInterval = useRef(null);
  const audioCtx = useRef(null);
  const scoreValue = useRef(0);
  const streakValue = useRef(0);
  const laddersValue = useRef(0);
  const bestStreakValue = useRef(0);
  const canvasSize = useRef({ width: 0, height: 0 });
  const gameStateRef = useRef('start');

  useEffect(() => { setIsClient(true); const t = setTimeout(() => setLoading(false), 300); return () => clearTimeout(t); }, []);
  useEffect(() => { gameStateRef.current = gameState; }, [gameState]);
  useEffect(() => { try { const s = localStorage.getItem('monochromeAgilityBestScore'); if (s) { const p = parseInt(s, 10); if (!isNaN(p)) setBestScore(p); } } catch (e) {} }, []);

  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      timerInterval.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) { setGameState('gameOver'); gameStateRef.current = 'gameOver'; if (timerInterval.current) { clearInterval(timerInterval.current); timerInterval.current = null; } if (animationId.current) cancelAnimationFrame(animationId.current); const fs = Math.floor(scoreValue.current); try { const sb = parseInt(localStorage.getItem('monochromeAgilityBestScore') || '0', 10); if (fs > sb) { localStorage.setItem('monochromeAgilityBestScore', fs.toString()); setBestScore(fs); } } catch (e) {} return 0; } return prev - 1; });
      }, 1000);
    }
    return () => { if (timerInterval.current) { clearInterval(timerInterval.current); timerInterval.current = null; } };
  }, [gameState]);

  const playSound = useCallback((type) => {
    if (!soundEnabled) return;
    try { if (!audioCtx.current) audioCtx.current = new (window.AudioContext || window.webkitAudioContext)(); if (audioCtx.current.state === 'suspended') audioCtx.current.resume(); const o = audioCtx.current.createOscillator(); const g = audioCtx.current.createGain(); o.connect(g); g.connect(audioCtx.current.destination); const n = audioCtx.current.currentTime; const fm = { step: 660, complete: 880, fail: 440 }; o.frequency.setValueAtTime(fm[type] || 660, n); g.gain.setValueAtTime(type === 'complete' ? 0.12 : type === 'fail' ? 0.1 : 0.08, n); g.gain.exponentialRampToValueAtTime(0.001, n + 0.15); o.start(n); o.stop(n + 0.15); } catch (e) {} }, [soundEnabled]);

  const showFeedback = useCallback((message, type) => { setFeedback(message); setFeedbackType(type); setTimeout(() => { setFeedback(''); setFeedbackType(''); }, 800); }, []);

  const applyPenalty = useCallback(() => {
    if (isPenaltyActive.current) return;
    isPenaltyActive.current = true;
    scoreValue.current = Math.max(0, scoreValue.current - 10); setScore(scoreValue.current);
    streakValue.current = 0; setStreak(0);
    playSound('fail'); showFeedback('✗ Missed ladder! -10 points', 'error');
    scrollSpeed.current = Math.max(100, scrollSpeed.current - 20); setCurrentSpeed(Math.floor(scrollSpeed.current));
    setTimeout(() => { isPenaltyActive.current = false; }, 300);
  }, [playSound, showFeedback]);

  useEffect(() => {
    const h = (e) => { const c = canvasRef.current; if (!c) return; const r = c.getBoundingClientRect(); const sx = c.width / r.width; const sy = c.height / r.height; mousePos.current = { x: (e.clientX - r.left) * sx, y: (e.clientY - r.top) * sy }; };
    window.addEventListener('mousemove', h); return () => window.removeEventListener('mousemove', h);
  }, []);

  useEffect(() => {
    if (gameState !== 'playing') return;
    const c = canvasRef.current; if (!c) return;
    const rc = () => { const ct = containerRef.current; if (!ct) return; const cr = ct.getBoundingClientRect(); let w = cr.width; let h = w * (9 / 16); if (h > cr.height) { h = cr.height; w = h * (16 / 9); } c.width = w; c.height = h; c.style.position = 'absolute'; c.style.left = `${(cr.width - w) / 2}px`; c.style.top = `${(cr.height - h) / 2}px`; canvasSize.current = { width: w, height: h }; };
    const ro = new ResizeObserver(rc); if (containerRef.current) ro.observe(containerRef.current); rc();
    ladders.current = []; for (let i = 0; i < 5; i++) ladders.current.push(new Ladder(-i * 250)); scrollY.current = 0;
    let lft = performance.now();
    const dr = () => { const n = performance.now(); let dt = Math.min(0.033, (n - lft) / 1000); lft = n; if (dt > 0.05) dt = 0.033; const ctx = c.getContext('2d'); const { width: cw, height: ch } = canvasSize.current; if (cw === 0 || ch === 0) { animationId.current = requestAnimationFrame(dr); return; } scrollY.current += scrollSpeed.current * dt;
    for (let i = 0; i < ladders.current.length; i++) { const ld = ladders.current[i]; const rs = ld.checkStep(mousePos.current.x, mousePos.current.y, scrollY.current, cw, ch); if (rs) { if (rs.type === 'step') { streakValue.current++; scoreValue.current += rs.points; setScore(scoreValue.current); setStreak(streakValue.current); if (streakValue.current > bestStreakValue.current) { bestStreakValue.current = streakValue.current; setBestStreak(bestStreakValue.current); } playSound('step'); showFeedback(`✓ Rung! +${rs.points}`, 'success'); } else if (rs.type === 'complete') { streakValue.current++; scoreValue.current += rs.points; laddersValue.current++; scrollSpeed.current += 8; setScore(scoreValue.current); setStreak(streakValue.current); setLaddersCompleted(laddersValue.current); setCurrentSpeed(Math.floor(scrollSpeed.current)); if (streakValue.current > bestStreakValue.current) { bestStreakValue.current = streakValue.current; setBestStreak(bestStreakValue.current); } playSound('complete'); showFeedback(`🎉 Ladder Complete! +${rs.points}`, 'success'); } break; } if (ld.checkFailure(scrollY.current, ch)) { applyPenalty(); break; } }
    if (ladders.current.length > 0 && ladders.current[0].y + scrollY.current > ch + 300) { ladders.current.shift(); const ly = ladders.current[ladders.current.length - 1].y; ladders.current.push(new Ladder(ly - 250)); }
    ctx.fillStyle = isBoxDarkMode ? "#020202" : "#f9fafb"; ctx.fillRect(0, 0, cw, ch);
    ctx.strokeStyle = isBoxDarkMode ? "#0a0a0a" : "#e5e7eb"; ctx.lineWidth = 0.5; for (let i = 0; i < cw; i += 100) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, ch); ctx.stroke(); }
    ladders.current.forEach(ld => ld.draw(ctx, scrollY.current, cw, ch));
    ctx.strokeStyle = isBoxDarkMode ? "#111111" : "#dddddd"; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(cw / 2, 0); ctx.lineTo(cw / 2, ch); ctx.stroke();
    const ms = mousePos.current; if (ms.x > 0 && ms.x < cw && ms.y > 0 && ms.y < ch) { ctx.beginPath(); ctx.arc(ms.x, ms.y, 5, 0, Math.PI * 2); ctx.fillStyle = isPenaltyActive.current ? "#ff0000" : "#FFFFFF"; ctx.fill(); ctx.beginPath(); ctx.arc(ms.x, ms.y, 8, 0, Math.PI * 2); ctx.strokeStyle = isPenaltyActive.current ? "#ff0000" : "#FFFFFF"; ctx.lineWidth = 1; ctx.stroke(); }
    animationId.current = requestAnimationFrame(dr); };
    animationId.current = requestAnimationFrame(dr);
    return () => { if (animationId.current) cancelAnimationFrame(animationId.current); ro.disconnect(); };
  }, [gameState, isBoxDarkMode, applyPenalty, playSound, showFeedback]);

  const toggleFullscreen = useCallback(async () => { try { if (!isFullscreen) { const e = containerRef.current; if (e?.requestFullscreen) { await e.requestFullscreen(); setIsFullscreen(true); } } else { if (document.fullscreenElement) await document.exitFullscreen(); setIsFullscreen(false); } } catch (e) { console.error('Fullscreen error:', e); } }, [isFullscreen]);

  const startGame = useCallback(() => { if (timerInterval.current) clearInterval(timerInterval.current); setGameState('playing'); gameStateRef.current = 'playing'; setScore(0); setStreak(0); setBestStreak(0); setTimeLeft(60); setFeedback(''); setLaddersCompleted(0); setCurrentSpeed(150); scoreValue.current = 0; streakValue.current = 0; bestStreakValue.current = 0; laddersValue.current = 0; scrollSpeed.current = 150; scrollY.current = 0; isPenaltyActive.current = false; ladders.current = []; }, []);
  const resetGame = useCallback(() => { if (animationId.current) cancelAnimationFrame(animationId.current); if (timerInterval.current) clearInterval(timerInterval.current); setGameState('start'); gameStateRef.current = 'start'; setFeedback(''); }, []);
  useEffect(() => { return () => { if (animationId.current) cancelAnimationFrame(animationId.current); if (timerInterval.current) clearInterval(timerInterval.current); }; }, []);

  const sharePage = async () => { if (navigator.share) { try { await navigator.share({ title: 'Free Agility Ladder Drill | SkillDrills', text: 'Train motor sequencing with this free agility drill!', url: 'https://skilldrills.online/drills/physical/Fitness/agility-ladder' }); } catch (e) {} } else { navigator.clipboard.writeText('https://skilldrills.online/drills/physical/Fitness/agility-ladder'); alert('Link copied!'); } };
  const copyPageLink = () => { navigator.clipboard.writeText('https://skilldrills.online/drills/physical/Fitness/agility-ladder'); alert('Link copied!'); };

  if (loading || !isClient) { return (<div className="min-h-screen flex items-center justify-center bg-gray-50"><div className="text-center"><div className="w-16 h-16 border-4 border-gray-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div><p className="text-gray-600">Loading agility ladder drill...</p></div></div>); }

  return (
    <div className={`min-h-screen select-none ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <nav aria-label="Breadcrumb" className="mb-4">
          <ol className="flex flex-wrap items-center gap-2 text-sm">
            <li><Link href="/" className={`hover:underline transition-colors ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>Home</Link></li>
            <li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} aria-hidden="true">/</li>
            <li><Link href="/drills/physical" className={`hover:underline transition-colors ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>Physical Drills</Link></li>
            <li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} aria-hidden="true">/</li>
            <li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Fitness</li>
            <li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} aria-hidden="true">/</li>
            <li className={`font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} aria-current="page">Agility Ladder</li>
          </ol>
        </nav>
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-r from-gray-600 to-gray-800 rounded-xl flex-shrink-0"><Grid className="w-6 h-6 text-white" /></div>
            <div><h1 className={`text-2xl sm:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Agility Ladder</h1><p className={`text-sm sm:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Motor sequencing • Left→Right pattern • 60s challenge • Free coordination training</p></div>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            {gameState === 'playing' && (<button onClick={resetGame} className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-100'}`} title="Reset session" aria-label="Reset agility ladder drill"><RefreshCw className="w-5 h-5" /></button>)}
            <button onClick={() => setIsDarkMode(!isDarkMode)} className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`} aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'} title={isDarkMode ? 'Light mode' : 'Dark mode'}>{isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}</button>
            <button onClick={() => setIsBoxDarkMode(!isBoxDarkMode)} className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`} aria-label="Toggle drill area theme" title="Toggle drill area theme"><Eye className="w-5 h-5" /></button>
            <button onClick={() => setSoundEnabled(!soundEnabled)} className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`} aria-label={soundEnabled ? 'Mute sounds' : 'Enable sounds'} title={soundEnabled ? 'Mute' : 'Unmute'}>{soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}</button>
            <button onClick={toggleFullscreen} className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`} aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'} title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}>{isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}</button>
          </div>
        </div>

        <section className="sr-only" aria-label="Drill description for search engines">
          <h2>Free Agility Ladder Drill - Motor Sequencing & Coordination Training for Athletes Gamers Fitness</h2>
          <p>Train motor sequencing and agility with this free interactive agility ladder drill. Navigate scrolling ladder rungs in Left Right Left Right sequence. Adaptive speed increases with each completion. 60 second challenge with scoring penalties and best performance saving. Perfect for athletes gamers and fitness enthusiasts. No registration required.</p>
        </section>

        <div className="grid grid-cols-5 gap-3 mb-4 h-[88px]">
          <StatCard icon={<Target className="text-blue-600" />} value={score} label="Score" isDark={isDarkMode} />
          <StatCard icon={<Trophy className="text-yellow-500" />} value={bestScore} label="Best" isDark={isDarkMode} />
          <StatCard icon={<Timer className={timeLeft < 15 ? 'text-red-600' : 'text-green-600'} />} value={timeLeft} label="Time" unit="s" isDark={isDarkMode} />
          <StatCard icon={<Grid className="text-gray-500" />} value={laddersCompleted} label="Ladders" isDark={isDarkMode} />
          <StatCard icon={<TrendingUp className="text-orange-500" />} value={currentSpeed} label="Speed" unit="px/s" isDark={isDarkMode} />
        </div>

        <div className="h-10 mb-2 flex justify-center items-center"><div className={`px-4 py-1.5 rounded-lg text-white font-semibold text-sm transition-all duration-200 ${feedback ? 'opacity-100 scale-100' : 'opacity-0 scale-95'} ${feedbackType === 'success' ? 'bg-green-500' : 'bg-red-500'}`} role="status" aria-live="polite" aria-atomic="true">{feedback || '\u00A0'}</div></div>

        <div ref={containerRef} className={`relative ${isFullscreen ? 'fixed inset-0 z-50' : 'rounded-xl border-2'}`} style={{ background: isBoxDarkMode ? "#020202" : "#ffffff", aspectRatio: isFullscreen ? 'auto' : '16/9', maxWidth: '100%', margin: '0 auto', borderColor: isDarkMode ? '#374151' : '#e5e7eb', overflow: 'hidden' }}>
          {isFullscreen && gameState === 'playing' && (<div className="absolute top-4 right-4 z-30 flex gap-3"><button onClick={resetGame} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all" title="Reset session" aria-label="Reset agility ladder drill"><RefreshCw className="w-5 h-5" /></button><button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all" aria-label="Toggle dark mode">{isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}</button><button onClick={() => setIsBoxDarkMode(!isBoxDarkMode)} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all" aria-label="Toggle drill area theme"><Eye className="w-5 h-5" /></button><button onClick={() => setSoundEnabled(!soundEnabled)} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all" aria-label="Toggle sound">{soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}</button><button onClick={toggleFullscreen} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all" aria-label="Exit fullscreen"><Minimize2 className="w-5 h-5" /></button></div>)}
          <canvas ref={canvasRef} style={{ display: 'block', position: 'absolute', cursor: 'none' }} aria-label="Agility ladder canvas - move cursor to step on rungs in sequence" />
          {gameState === 'start' && (<div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}><div className={`rounded-2xl p-6 sm:p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}><div className="mb-4"><Grid className="w-16 h-16 text-gray-500 mx-auto" aria-hidden="true" /></div><h2 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Agility Ladder</h2><p className={`mb-2 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Step rungs in sequence • Left→Right→Left→Right</p><p className={`mb-6 text-sm ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Ladders scroll upward. +1 per rung, +2 for completion. Speed increases with each ladder. Miss a ladder = -10 points. Perfect for motor coordination and reaction training.</p><button onClick={startGame} className="px-8 py-3 bg-gradient-to-r from-gray-600 to-gray-800 text-white rounded-xl font-semibold hover:shadow-lg w-full transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2" aria-label="Start free agility ladder training">Start Free Drill</button></div></div>)}
          {gameState === 'gameOver' && (<div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}><div className={`rounded-2xl p-6 sm:p-8 shadow-xl border w-full max-w-[520px] mx-4 ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}><div className="flex items-center justify-center gap-3 mb-4"><Timer className="w-10 h-10 text-orange-500" aria-hidden="true" /><h2 className={`text-2xl font-bold ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Session Complete!</h2></div><p className={`text-center text-sm mb-6 ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Regular agility ladder training improves motor sequencing and speed adaptation for gaming and sports.</p><div className="grid grid-cols-2 gap-3 mb-6"><ResultCard label="Final Score" value={score} icon={<Target className="w-4 h-4" />} color="yellow" isDark={isBoxDarkMode} /><ResultCard label="Best Score" value={bestScore} icon={<Trophy className="w-4 h-4" />} color="yellow" isDark={isBoxDarkMode} /><ResultCard label="Best Streak" value={bestStreak} icon={<Zap className="w-4 h-4" />} color="orange" isDark={isBoxDarkMode} /><ResultCard label="Ladders Done" value={laddersCompleted} icon={<Grid className="w-4 h-4" />} color="gray" isDark={isBoxDarkMode} /><ResultCard label="Peak Speed" value={currentSpeed} unit="px/s" icon={<Activity className="w-4 h-4" />} color="purple" isDark={isBoxDarkMode} /></div><div className="flex gap-3"><Link href="/drills/physical" className="flex-1"><button className={`w-full px-4 py-2.5 rounded-lg font-semibold transition-all ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>← Back to Drills</button></Link><button onClick={startGame} className="flex-1 px-4 py-2.5 bg-gradient-to-r from-gray-600 to-gray-800 text-white rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">Play Again →</button></div></div></div>)}
        </div>

        {/* 1. DRILL RULES */}
        {!isFullscreen && (<footer className="mt-6" aria-label="Drill rules and instructions"><div className={`rounded-xl border overflow-hidden ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}><div className={`px-4 py-3 border-b ${isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'}`}><div className="flex items-center gap-2"><Info className={`w-4 h-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} aria-hidden="true" /><h2 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Drill Rules & Scoring</h2></div></div><div className="p-4"><div className="grid grid-cols-1 md:grid-cols-2 gap-4"><div className="space-y-3"><div className="flex items-start gap-2"><div className="w-5 h-5 rounded-full bg-gray-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">1</div><p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Step rungs in sequence: <span className="font-semibold">Left→Right→Left→Right</span></p></div><div className="flex items-start gap-2"><div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">2</div><p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Correct rung: <span className="font-semibold text-green-500">+1 point</span></p></div><div className="flex items-start gap-2"><div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">3</div><p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Complete 4 rungs: <span className="font-semibold text-emerald-500">+2 bonus</span> + speed ↑</p></div></div><div className="space-y-3"><div className="flex items-start gap-2"><div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">4</div><p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Miss ladder: <span className="font-semibold text-red-500">-10 point penalty</span></p></div><div className="flex items-start gap-2"><div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">5</div><p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Speed increases <span className="font-semibold text-purple-500">+8 px/s per ladder</span></p></div><div className="flex items-start gap-2"><div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">6</div><p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>60 second timer • <span className="font-semibold text-yellow-500">Best Score saves locally</span></p></div></div></div><div className={`mt-4 pt-3 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs ${isDarkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'}`}><span>⬅️ Left → ➡️ Right → ⬅️ Left → ➡️ Right pattern</span><span>🏆 Best Score saves locally • Free forever</span></div></div></div></footer>)}

        {/* 2. ABOUT THIS DRILL */}
        {!isFullscreen && (
          <section className="mt-8" aria-label="About this agility ladder drill">
            <div className={`rounded-xl border overflow-hidden ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <div className={`px-4 py-3 border-b ${isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'}`}>
                <div className="flex items-center gap-2"><GraduationCap className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} aria-hidden="true" /><h2 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>About This Free Agility Ladder Drill</h2></div>
              </div>
              <div className="p-5">
                <p className={`text-sm leading-relaxed mb-5 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>This free agility ladder drill trains motor sequencing and coordination by having you navigate scrolling ladder rungs in a Left→Right→Left→Right pattern. Adaptive speed increases with each completed ladder, creating a progressively challenging workout for your reflexes and motor planning skills.</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
                  <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-50 border-gray-200'}`}><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-gray-500 flex items-center justify-center"><GraduationCap className="w-4 h-4 text-white" /></div><h3 className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Who It's For</h3></div><p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Athletes, gamers, fitness enthusiasts, and anyone wanting improved motor coordination and reaction speed.</p></div>
                  <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-green-50 border-green-100'}`}><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-green-500 flex items-center justify-center"><TrendingUp className="w-4 h-4 text-white" /></div><h3 className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Skills Improved</h3></div><p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Motor sequencing, hand-eye coordination, reaction time, pattern recognition, and speed adaptation.</p></div>
                  <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-purple-50 border-purple-100'}`}><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-purple-500 flex items-center justify-center"><Activity className="w-4 h-4 text-white" /></div><h3 className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>What You'll Track</h3></div><p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Score, ladders completed, current speed, streak, and best performance.</p></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-yellow-50 border-yellow-100'}`}><div className="flex items-center gap-2 mb-3"><div className="w-8 h-8 rounded-lg bg-yellow-500 flex items-center justify-center"><Lightbulb className="w-4 h-4 text-white" /></div><h3 className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Why Practice Motor Sequencing?</h3></div><ul className={`text-xs space-y-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}><li className="flex items-start gap-2"><CheckCircle2 className="w-3 h-3 text-yellow-500 mt-0.5 flex-shrink-0" /> Improves neural pathways for coordinated movement</li><li className="flex items-start gap-2"><CheckCircle2 className="w-3 h-3 text-yellow-500 mt-0.5 flex-shrink-0" /> Enhances gaming performance through faster reactions</li><li className="flex items-start gap-2"><CheckCircle2 className="w-3 h-3 text-yellow-500 mt-0.5 flex-shrink-0" /> Builds cognitive flexibility and pattern recognition</li></ul></div>
                  <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-amber-50 border-amber-100'}`}><div className="flex items-center gap-2 mb-3"><div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center"><Clock className="w-4 h-4 text-white" /></div><h3 className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>How to Practice Effectively</h3></div><ol className={`text-xs space-y-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}><li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-amber-500 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">1</span> Keep cursor centered and move precisely to each rung</li><li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-amber-500 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">2</span> Focus on accuracy first, speed will come naturally</li><li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-amber-500 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">3</span> The green outline shows which rung to step next</li><li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-amber-500 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">4</span> Practice 2-3 times daily for best improvement in 1-2 weeks</li></ol></div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 3. RELATED DRILLS */}
        {!isFullscreen && (
          <section className="mt-8" aria-label="Related training drills">
            <div className="flex items-center gap-2 mb-4"><div className="w-1 h-6 rounded-full bg-gradient-to-b from-gray-500 to-gray-700"></div><h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Explore Related Free Drills</h2><span className={`text-xs px-2 py-0.5 rounded-full ${isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>8 drills</span></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link href="/drills/physical/Fitness/jump-sequence" className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-orange-500' : 'bg-white border-gray-200 hover:border-orange-300'}`}><div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-red-500"></div><div className="p-4"><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center"><Zap className="w-4 h-4 text-orange-600" /></div><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>Fitness</span></div><h3 className={`font-semibold text-sm mb-1 ${isDarkMode ? 'text-white group-hover:text-orange-400' : 'text-gray-900 group-hover:text-orange-600'} transition-colors`}>Jump Sequence</h3><p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Time jumps in sequence patterns to improve coordination.</p><div className="flex items-center gap-1 mt-3 text-orange-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Start Drill <ArrowRight className="w-3 h-3" /></div></div></Link>
              <Link href="/drills/physical/Fitness/speed-drill" className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-blue-500' : 'bg-white border-gray-200 hover:border-blue-300'}`}><div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-500"></div><div className="p-4"><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center"><Timer className="w-4 h-4 text-blue-600" /></div><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>Fitness</span></div><h3 className={`font-semibold text-sm mb-1 ${isDarkMode ? 'text-white group-hover:text-blue-400' : 'text-gray-900 group-hover:text-blue-600'} transition-colors`}>Speed Drill</h3><p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Test and improve movement speed with rapid target acquisition.</p><div className="flex items-center gap-1 mt-3 text-blue-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Start Drill <ArrowRight className="w-3 h-3" /></div></div></Link>
              <Link href="/drills/physical/Balance-Training/dynamic-balance" className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-purple-500' : 'bg-white border-gray-200 hover:border-purple-300'}`}><div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-violet-500"></div><div className="p-4"><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center"><Brain className="w-4 h-4 text-purple-600" /></div><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>Balance</span></div><h3 className={`font-semibold text-sm mb-1 ${isDarkMode ? 'text-white group-hover:text-purple-400' : 'text-gray-900 group-hover:text-purple-600'} transition-colors`}>Dynamic Balance</h3><p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Track moving targets while maintaining balance control.</p><div className="flex items-center gap-1 mt-3 text-purple-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Start Drill <ArrowRight className="w-3 h-3" /></div></div></Link>
              <Link href="/drills/physical/Reflex-Training/drop-catch" className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-cyan-500' : 'bg-white border-gray-200 hover:border-cyan-300'}`}><div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-teal-500"></div><div className="p-4"><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-cyan-100 flex items-center justify-center"><Move className="w-4 h-4 text-cyan-600" /></div><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>Reflex</span></div><h3 className={`font-semibold text-sm mb-1 ${isDarkMode ? 'text-white group-hover:text-cyan-400' : 'text-gray-900 group-hover:text-cyan-600'} transition-colors`}>Drop Catch</h3><p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>React to falling objects with quick response training.</p><div className="flex items-center gap-1 mt-3 text-cyan-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Start Drill <ArrowRight className="w-3 h-3" /></div></div></Link>
              <Link href="/drills/motor/hand-eye-coordination/aim-trainer" className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-rose-500' : 'bg-white border-gray-200 hover:border-rose-300'}`}><div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-500 to-pink-500"></div><div className="p-4"><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-rose-100 flex items-center justify-center"><Target className="w-4 h-4 text-rose-600" /></div><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>Motor</span></div><h3 className={`font-semibold text-sm mb-1 ${isDarkMode ? 'text-white group-hover:text-rose-400' : 'text-gray-900 group-hover:text-rose-600'} transition-colors`}>Aim Trainer</h3><p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Hand-eye coordination with target clicking practice.</p><div className="flex items-center gap-1 mt-3 text-rose-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Start Drill <ArrowRight className="w-3 h-3" /></div></div></Link>
              <Link href="/drills/fps/flick-shot-training" className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-emerald-500' : 'bg-white border-gray-200 hover:border-emerald-300'}`}><div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-green-500"></div><div className="p-4"><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center"><Crosshair className="w-4 h-4 text-emerald-600" /></div><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>FPS</span></div><h3 className={`font-semibold text-sm mb-1 ${isDarkMode ? 'text-white group-hover:text-emerald-400' : 'text-gray-900 group-hover:text-emerald-600'} transition-colors`}>Flick Shot Training</h3><p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Improve aim accuracy with flick shot precision drills.</p><div className="flex items-center gap-1 mt-3 text-emerald-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Start Drill <ArrowRight className="w-3 h-3" /></div></div></Link>
              <Link href="/drills/cognitive/processing-speed/reaction-time" className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-red-500' : 'bg-white border-gray-200 hover:border-red-300'}`}><div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-rose-500"></div><div className="p-4"><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center"><Zap className="w-4 h-4 text-red-600" /></div><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>Cognitive</span></div><h3 className={`font-semibold text-sm mb-1 ${isDarkMode ? 'text-white group-hover:text-red-400' : 'text-gray-900 group-hover:text-red-600'} transition-colors`}>Reaction Time</h3><p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Test and improve visual reaction speed with simple click response.</p><div className="flex items-center gap-1 mt-3 text-red-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Start Drill <ArrowRight className="w-3 h-3" /></div></div></Link>
              <Link href="/drills/visual/tracking-accuracy/moving-target" className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-teal-500' : 'bg-white border-gray-200 hover:border-teal-300'}`}><div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 to-green-500"></div><div className="p-4"><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center"><Eye className="w-4 h-4 text-teal-600" /></div><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>Visual</span></div><h3 className={`font-semibold text-sm mb-1 ${isDarkMode ? 'text-white group-hover:text-teal-400' : 'text-gray-900 group-hover:text-teal-600'} transition-colors`}>Moving Target</h3><p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Track and follow moving targets for visual coordination.</p><div className="flex items-center gap-1 mt-3 text-teal-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Start Drill <ArrowRight className="w-3 h-3" /></div></div></Link>
            </div>
          </section>
        )}

        {/* 4. GLOBAL FOOTER */}
        {!isFullscreen && (<footer className="mt-12 bg-gray-900 text-gray-400 rounded-xl py-10 px-6" role="contentinfo"><div className="max-w-7xl mx-auto"><div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 mb-8"><div><h3 className="text-white font-semibold mb-3 text-sm">FPS Training</h3><ul className="space-y-2 text-sm"><li><Link href="/drills/fps/flick-shot-training" className="hover:text-white transition-colors">Flick Shot Trainer</Link></li><li><Link href="/drills/fps/target-acquisition" className="hover:text-white transition-colors">Target Acquisition</Link></li><li><Link href="/drills/fps/reactive-tracking" className="hover:text-white transition-colors">Reactive Tracking</Link></li><li><Link href="/drills/fps" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">All 21 FPS Drills →</Link></li></ul></div><div><h3 className="text-white font-semibold mb-3 text-sm">Cognitive</h3><ul className="space-y-2 text-sm"><li><Link href="/drills/cognitive/memory/card-matching" className="hover:text-white transition-colors">Memory Games</Link></li><li><Link href="/drills/cognitive/attention/divided-attention" className="hover:text-white transition-colors">Attention Drills</Link></li><li><Link href="/drills/cognitive/problem-solving/logic-puzzles" className="hover:text-white transition-colors">Logic Puzzles</Link></li><li><Link href="/drills/cognitive" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">All 16 Cognitive Drills →</Link></li></ul></div><div><h3 className="text-white font-semibold mb-3 text-sm">Academic</h3><ul className="space-y-2 text-sm"><li><Link href="/drills/academic/writing-speed/typing-test" className="hover:text-white transition-colors">Typing Speed Test</Link></li><li><Link href="/drills/academic/reading-speed/speed-reader" className="hover:text-white transition-colors">Speed Reader</Link></li><li><Link href="/drills/academic/math-speed/mental-math" className="hover:text-white transition-colors">Mental Math</Link></li><li><Link href="/drills/academic" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">All 12 Academic Drills →</Link></li></ul></div><div><h3 className="text-white font-semibold mb-3 text-sm">Visual & Motor</h3><ul className="space-y-2 text-sm"><li><Link href="/drills/visual/reaction-speed/light-reaction" className="hover:text-white transition-colors">Reaction Time Test</Link></li><li><Link href="/drills/motor/hand-eye-coordination/aim-trainer" className="hover:text-white transition-colors">Hand-Eye Coordination</Link></li><li><Link href="/drills/visual/tracking-accuracy/moving-target" className="hover:text-white transition-colors">Moving Target Tracking</Link></li><li><Link href="/drills/visual" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">All 14 Visual Drills →</Link></li></ul></div><div><h3 className="text-white font-semibold mb-3 text-sm">More Categories</h3><ul className="space-y-2 text-sm"><li><Link href="/drills/memory" className="hover:text-white transition-colors">Memory (15 drills)</Link></li><li><Link href="/drills/productivity" className="hover:text-white transition-colors">Productivity (10 drills)</Link></li><li><Link href="/drills/mental-fitness" className="hover:text-white transition-colors">Mental Fitness (6 drills)</Link></li><li><Link href="/drills/physical" className="hover:text-white transition-colors">Physical (11 drills)</Link></li></ul></div></div><div className="border-t border-gray-800 pt-8 text-center"><div className="flex items-center justify-center gap-3 mb-4"><div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center"><Target className="w-5 h-5 text-white" aria-hidden="true" /></div><span className="text-white font-bold text-lg">SkillDrills</span></div><p className="text-sm mb-2">&copy; 2026 SkillDrills. All rights reserved.</p><p className="text-xs max-w-2xl mx-auto leading-relaxed mb-6">Free online agility ladder drill for motor sequencing and coordination training. Navigate scrolling ladder rungs in Left Right pattern with adaptive speed. Perfect for athletes gamers and fitness enthusiasts. No registration required. More free drills at skilldrills.online.</p><div className="flex items-center justify-center gap-5 flex-wrap"><button onClick={sharePage} className="text-gray-500 hover:text-white transition-colors" title="Share this drill" aria-label="Share this free agility ladder drill"><svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/></svg></button><button onClick={copyPageLink} className="text-gray-500 hover:text-white transition-colors" title="Copy link" aria-label="Copy drill link to clipboard"><svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/></svg></button><a href="https://twitter.com/skilldrillss" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors" title="Follow on Twitter X" aria-label="Follow SkillDrills on Twitter X"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a><a href="https://instagram.com/skilldrills.online" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors" title="Follow on Instagram" aria-label="Follow SkillDrills on Instagram"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg></a><a href="https://youtube.com/@skilldrills.online" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors" title="Subscribe on YouTube" aria-label="Subscribe to SkillDrills on YouTube"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg></a><a href="https://pinterest.com/skilldrills" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors" title="Follow on Pinterest" aria-label="Follow SkillDrills on Pinterest"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/></svg></a></div></div></div></footer>)}
      </div>
    </div>
  );
}

function StatCard({ icon, value, label, unit = '', isDark }) {
  return (<div className={`rounded-xl shadow-sm border p-2 sm:p-3 text-center flex flex-col justify-center h-full transition-colors ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}><div className="mb-1 flex justify-center" aria-hidden="true">{icon}</div><p className={`text-lg sm:text-xl font-bold truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>{value}{unit}</p><p className={`text-[10px] sm:text-xs truncate ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{label}</p></div>);
}

function ResultCard({ label, value, unit = '', icon, color, isDark }) {
  const colorMap = { yellow: { bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', text: 'text-yellow-500', icon: 'text-yellow-500' }, orange: { bg: 'bg-orange-500/10', border: 'border-orange-500/30', text: 'text-orange-500', icon: 'text-orange-500' }, gray: { bg: 'bg-gray-500/10', border: 'border-gray-500/30', text: 'text-gray-500', icon: 'text-gray-500' }, purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-500', icon: 'text-purple-500' }, green: { bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-500', icon: 'text-green-500' }, emerald: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-500', icon: 'text-emerald-500' }, red: { bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-500', icon: 'text-red-500' } };
  const colors = colorMap[color] || colorMap.yellow;
  return (<div className={`flex items-center justify-between p-3 rounded-lg border ${colors.bg} ${colors.border}`}><div className="flex items-center gap-2 min-w-0"><div className={colors.icon} aria-hidden="true">{icon}</div><span className={`text-xs sm:text-sm truncate ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{label}</span></div><span className={`font-bold text-base sm:text-lg flex-shrink-0 ml-2 ${colors.text}`}>{value}{unit}</span></div>);
}