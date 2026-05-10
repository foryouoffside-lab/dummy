'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Award, Clock, Eye,
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, 
  Timer, Trophy, Heart, Wind, Brain, Info, TrendingUp, RefreshCw
} from 'lucide-react';

export default function VagalBrakeClient() {
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);
  const nodeRef = useRef(null);
  const [gameState, setGameState] = useState('start');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isBoxDarkMode, setIsBoxDarkMode] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [cycleCount, setCycleCount] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [action, setAction] = useState('READY');
  const [timerDisplay, setTimerDisplay] = useState(4);
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  const [isClient, setIsClient] = useState(false);
  
  const timerIntervalRef = useRef(null);
  const countdownIntervalRef = useRef(null);
  const phaseTimeoutRef = useRef(null);
  const isActiveRef = useRef(false);
  const cycleCountRef = useRef(0);
  const scoreRef = useRef(0);
  const startTimeRef = useRef(0);
  const feedbackTimeoutRef = useRef(null);
  const audioCtxRef = useRef(null);
  const gameStateRef = useRef('start');

  useEffect(() => { setIsClient(true); const t = setTimeout(() => setLoading(false), 300); return () => clearTimeout(t); }, []);
  useEffect(() => { gameStateRef.current = gameState; }, [gameState]);

  const showFeedback = useCallback((msg, type) => {
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    setFeedback(msg); setFeedbackType(type);
    feedbackTimeoutRef.current = setTimeout(() => { setFeedback(''); setFeedbackType(''); }, 800);
  }, []);

  useEffect(() => {
    try { const s = localStorage.getItem('vagalBrakeBestScore'); if (s) { const p = parseInt(s, 10); if (!isNaN(p)) setBestScore(p); } } catch (e) {}
  }, []);

  useEffect(() => {
    if (gameState === 'gameOver' && score > bestScore) { setBestScore(score); try { localStorage.setItem('vagalBrakeBestScore', score.toString()); } catch (e) {} showFeedback('🏆 New Record!', 'success'); }
  }, [gameState, score, bestScore, showFeedback]);

  const toggleFullscreen = useCallback(async () => {
    try {
      if (!isFullscreen) { const el = containerRef.current; if (el?.requestFullscreen) { await el.requestFullscreen(); setIsFullscreen(true); } }
      else { if (document.fullscreenElement) await document.exitFullscreen(); setIsFullscreen(false); }
    } catch (e) {}
  }, [isFullscreen]);

  useEffect(() => {
    const h = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', h);
    return () => document.removeEventListener('fullscreenchange', h);
  }, []);

  const playSound = useCallback((type) => {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef.current) audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      if (audioCtxRef.current.state === 'suspended') audioCtxRef.current.resume();
      const ctx = audioCtxRef.current, o = ctx.createOscillator(), g = ctx.createGain();
      o.connect(g); g.connect(ctx.destination);
      const now = ctx.currentTime;
      const f = { inhale: 528, hold: 432, exhale: 392, complete: 1046.5 };
      const d = { inhale: 0.15, hold: 0.1, exhale: 0.2, complete: 0.3 };
      o.frequency.setValueAtTime(f[type] || 528, now);
      g.gain.setValueAtTime(type === 'hold' ? 0.06 : type === 'complete' ? 0.1 : 0.08, now);
      g.gain.exponentialRampToValueAtTime(0.001, now + (d[type] || 0.15));
      o.start(now); o.stop(now + (d[type] || 0.15));
    } catch (e) {}
  }, [soundEnabled]);

  const formatTime = useCallback((s) => {
    const m = Math.floor(s / 60), sec = s % 60;
    return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  }, []);

  const startCountdown = useCallback((seconds, onComplete) => {
    let left = seconds; setTimerDisplay(left);
    if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    countdownIntervalRef.current = setInterval(() => {
      left--;
      if (left > 0) setTimerDisplay(left);
      else { if (countdownIntervalRef.current) { clearInterval(countdownIntervalRef.current); countdownIntervalRef.current = null; } if (onComplete) onComplete(); }
    }, 1000);
  }, []);

  const runInhalePhase = useCallback(() => {
    if (!isActiveRef.current) return;
    setAction("INHALE");
    if (nodeRef.current) { nodeRef.current.style.transition = "transform 4000ms linear, opacity 4000ms linear"; nodeRef.current.style.transform = "scale(6)"; nodeRef.current.style.opacity = "1"; }
    playSound('inhale');
    startCountdown(4, () => { if (!isActiveRef.current) return; runHoldPhase(); });
  }, [playSound, startCountdown]);

  const runHoldPhase = useCallback(() => {
    if (!isActiveRef.current) return;
    setAction("HOLD");
    if (nodeRef.current) nodeRef.current.style.transition = "none";
    playSound('hold');
    startCountdown(7, () => { if (!isActiveRef.current) return; runExhalePhase(); });
  }, [playSound, startCountdown]);

  const runExhalePhase = useCallback(() => {
    if (!isActiveRef.current) return;
    setAction("EXHALE");
    if (nodeRef.current) { nodeRef.current.style.transition = "transform 8000ms linear, opacity 8000ms linear"; nodeRef.current.style.transform = "scale(1)"; nodeRef.current.style.opacity = "0.3"; }
    playSound('exhale');
    startCountdown(8, () => {
      if (!isActiveRef.current) return;
      cycleCountRef.current += 1; setCycleCount(cycleCountRef.current);
      scoreRef.current += 1; setScore(scoreRef.current);
      playSound('complete');
      showFeedback('✓ Cycle Complete! +1', 'success');
      runInhalePhase();
    });
  }, [playSound, startCountdown, showFeedback, runInhalePhase]);

  const startSession = useCallback(() => {
    setGameState('playing'); gameStateRef.current = 'playing';
    if (phaseTimeoutRef.current) clearTimeout(phaseTimeoutRef.current);
    if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    isActiveRef.current = true; cycleCountRef.current = 0; scoreRef.current = 0;
    setIsActive(true); setScore(0); setCycleCount(0); setTimeElapsed(0); setAction("INHALE");
    startTimeRef.current = Date.now();
    if (nodeRef.current) { nodeRef.current.style.transform = "scale(1)"; nodeRef.current.style.opacity = "1"; }
    setTimeout(() => { if (isActiveRef.current) runInhalePhase(); }, 300);
    timerIntervalRef.current = setInterval(() => { const e = Math.floor((Date.now() - startTimeRef.current) / 1000); setTimeElapsed(e); }, 1000);
  }, [runInhalePhase]);

  const stopSession = useCallback(() => {
    isActiveRef.current = false; setIsActive(false); setGameState('gameOver'); gameStateRef.current = 'gameOver';
    if (timerIntervalRef.current) { clearInterval(timerIntervalRef.current); timerIntervalRef.current = null; }
    if (countdownIntervalRef.current) { clearInterval(countdownIntervalRef.current); countdownIntervalRef.current = null; }
    if (phaseTimeoutRef.current) clearTimeout(phaseTimeoutRef.current);
  }, []);

  const resetGame = useCallback(() => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    if (phaseTimeoutRef.current) clearTimeout(phaseTimeoutRef.current);
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    isActiveRef.current = false; setIsActive(false);
    if (audioCtxRef.current) { audioCtxRef.current.close(); audioCtxRef.current = null; }
    setGameState('start'); gameStateRef.current = 'start'; setAction('READY'); setTimerDisplay(4);
    if (nodeRef.current) { nodeRef.current.style.transform = "scale(1)"; nodeRef.current.style.opacity = "1"; }
    setCycleCount(0); cycleCountRef.current = 0; setScore(0); scoreRef.current = 0; setTimeElapsed(0); setFeedback('');
  }, []);

  useEffect(() => () => { isActiveRef.current = false; if (timerIntervalRef.current) clearInterval(timerIntervalRef.current); if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current); if (phaseTimeoutRef.current) clearTimeout(phaseTimeoutRef.current); if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current); if (audioCtxRef.current) audioCtxRef.current.close(); }, []);

  if (loading || !isClient) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-600">Loading breathing exercise...</p>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen select-none ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", "name": "4-7-8 Vagal Brake - Breathing Exercise", "url": "https://skilldrills.online/drills/mental-fitness/breathing-exercises/4-7-8", "description": "Guided 4-7-8 breathing technique to activate the vagus nerve. Inhale 4s, hold 7s, exhale 8s with expanding/shrinking visual pacer and audio cues. Free relaxation drill with cycle tracking.", "applicationCategory": "HealthApplication", "operatingSystem": "Web", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }, "author": { "@type": "Organization", "name": "Global Drill System" }, "educationalUse": ["Breathing Exercise", "Stress Relief", "Relaxation", "Vagal Tone"], "learningResourceType": "Interactive Exercise", "interactivityType": "active", "inLanguage": "en-US", "teaches": ["4-7-8 Breathing", "Vagal Braking", "Parasympathetic Activation", "Stress Management"] }) }} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-4">
          <ol className="flex flex-wrap items-center gap-2 text-sm">
            <li><Link href="/" className={`hover:underline ${isDarkMode?'text-gray-400 hover:text-gray-200':'text-gray-600 hover:text-gray-900'}`}>Home</Link></li>
            <li className={isDarkMode?'text-gray-500':'text-gray-400'}>/</li>
            <li><Link href="/drills/mental-fitness" className={`hover:underline ${isDarkMode?'text-gray-400 hover:text-gray-200':'text-gray-600 hover:text-gray-900'}`}>Mental Fitness</Link></li>
            <li className={isDarkMode?'text-gray-500':'text-gray-400'}>/</li>
            <li className={isDarkMode?'text-gray-500':'text-gray-400'}>Breathing Exercises</li>
            <li className={isDarkMode?'text-gray-500':'text-gray-400'}>/</li>
            <li className={`font-medium ${isDarkMode?'text-amber-400':'text-amber-600'}`}>4-7-8 Vagal Brake</li>
          </ol>
        </nav>
        
        {/* Header + Stats Row - Tight spacing like ProFlick */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-r from-amber-500 to-yellow-600 rounded-xl"><Heart className="w-6 h-6 text-white" /></div>
            <div>
              <h1 className={`text-2xl sm:text-3xl font-bold ${isDarkMode?'text-white':'text-gray-900'}`}>4-7-8 Vagal Brake</h1>
              <p className={`text-sm sm:text-base ${isDarkMode?'text-gray-400':'text-gray-500'}`}>Relaxation breathing • 1 point per cycle • No time limit</p>
            </div>
          </div>
          <div className="flex gap-2">
            {gameState === 'playing' && <button onClick={resetGame} className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode?'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700':'bg-white border-gray-200 text-gray-700 hover:bg-gray-100'}`} title="Reset"><RefreshCw className="w-5 h-5" /></button>}
            <button onClick={() => setIsDarkMode(!isDarkMode)} className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode?'bg-gray-800 border-gray-700 text-gray-300':'bg-white border-gray-200 text-gray-700'}`} title={isDarkMode?'Light':'Dark'}>{isDarkMode?<Sun className="w-5 h-5"/>:<Moon className="w-5 h-5"/>}</button>
            <button onClick={() => setIsBoxDarkMode(!isBoxDarkMode)} className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode?'bg-gray-800 border-gray-700 text-gray-300':'bg-white border-gray-200 text-gray-700'}`} title="Toggle box theme"><Eye className="w-5 h-5"/></button>
            <button onClick={() => setSoundEnabled(!soundEnabled)} className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode?'bg-gray-800 border-gray-700 text-gray-300':'bg-white border-gray-200 text-gray-700'}`} title={soundEnabled?'Mute':'Unmute'}>{soundEnabled?<Volume2 className="w-5 h-5"/>:<VolumeX className="w-5 h-5"/>}</button>
            <button onClick={toggleFullscreen} className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode?'bg-gray-800 border-gray-700 text-gray-300':'bg-white border-gray-200 text-gray-700'}`} title={isFullscreen?'Exit fullscreen':'Fullscreen'}>{isFullscreen?<Minimize2 className="w-5 h-5"/>:<Maximize2 className="w-5 h-5"/>}</button>
          </div>
        </div>

        {/* Stats Board - Directly below header, no gap */}
        <div className="grid grid-cols-4 gap-3 mb-4 h-[88px]">
          <SCard icon={<Heart className="text-amber-500"/>} value={score} label="Calm Score" dark={isDarkMode}/>
          <SCard icon={<Trophy className="text-yellow-500"/>} value={bestScore} label="Best" dark={isDarkMode}/>
          <SCard icon={<Timer className="text-blue-500"/>} value={formatTime(timeElapsed)} label="Time" dark={isDarkMode}/>
          <SCard icon={<Wind className="text-green-500"/>} value={cycleCount} label="Cycles" dark={isDarkMode}/>
        </div>

        {/* Feedback Bar - Tight spacing */}
        <div className="h-10 mb-2 flex justify-center items-center">
          <div className={`px-4 py-1.5 rounded-lg text-white font-semibold text-sm transition-all duration-200 ${feedback?'opacity-100 scale-100':'opacity-0 scale-95'} ${feedbackType==='success'?'bg-green-500':'bg-red-500'}`}>{feedback||'\u00A0'}</div>
        </div>

        {/* Game Container */}
        <div ref={containerRef} className={`relative ${isFullscreen?'fixed inset-0 z-50':'rounded-xl border-2'}`} style={{background:isBoxDarkMode?'#030303':'#ffffff',aspectRatio:isFullscreen?'auto':'16/9',maxWidth:'100%',margin:'0 auto',borderColor:isDarkMode?'#374151':'#e5e7eb'}}>
          {isFullscreen && gameState === 'playing' && (
            <>
              <div className="absolute top-4 right-4 z-30 flex gap-3">
                <button onClick={resetGame} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg hover:bg-black/70 transition text-white" title="Reset"><RefreshCw className="w-5 h-5"/></button>
                <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg hover:bg-black/70 transition text-white">{isDarkMode?<Sun className="w-5 h-5"/>:<Moon className="w-5 h-5"/>}</button>
                <button onClick={() => setIsBoxDarkMode(!isBoxDarkMode)} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg hover:bg-black/70 transition text-white"><Eye className="w-5 h-5"/></button>
                <button onClick={() => setSoundEnabled(!soundEnabled)} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg hover:bg-black/70 transition text-white">{soundEnabled?<Volume2 className="w-5 h-5"/>:<VolumeX className="w-5 h-5"/>}</button>
                <button onClick={toggleFullscreen} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg hover:bg-black/70 transition text-white"><Minimize2 className="w-5 h-5"/></button>
              </div>
              <div className="absolute top-4 left-4 z-30 bg-black/50 backdrop-blur-sm rounded-lg px-4 py-2 text-white text-sm">Score: <span className="text-yellow-400 font-bold">{score}</span> | Cycles: <span className="text-green-400 font-bold">{cycleCount}</span></div>
            </>
          )}

          <div className="absolute inset-0 flex items-center justify-center">
            {gameState === 'start' && (
              <div className="absolute inset-0 flex items-center justify-center rounded-xl z-10 backdrop-blur-sm" style={{background:isBoxDarkMode?'rgba(3,3,3,0.95)':'rgba(255,255,255,0.95)'}}>
                <div className={`rounded-2xl p-6 sm:p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode?'bg-gray-800 border-gray-700':'bg-white border-gray-200'}`}>
                  <Heart className="w-16 h-16 text-amber-500 mx-auto mb-4"/>
                  <h2 className={`text-2xl font-bold mb-2 ${isBoxDarkMode?'text-white':'text-gray-900'}`}>4-7-8 Vagal Brake</h2>
                  <p className={`mb-2 ${isBoxDarkMode?'text-gray-300':'text-gray-600'}`}>Relaxation breathing • 1 point per complete cycle</p>
                  <p className={`mb-6 text-sm ${isBoxDarkMode?'text-gray-400':'text-gray-500'}`}>Follow the expanding/shrinking golden node. Inhale 4s, hold 7s, exhale 8s. Activates vagus nerve for deep calm.</p>
                  <button onClick={startSession} className="px-8 py-3 bg-gradient-to-r from-amber-500 to-yellow-600 text-white rounded-xl font-semibold hover:shadow-lg w-full transition-all transform hover:scale-[1.02] active:scale-[0.98]">Start Relaxation</button>
                </div>
              </div>
            )}

            {gameState === 'playing' && (
              <div className="text-center" style={{width:isFullscreen?'550px':'400px'}}>
                <div style={{fontSize:isFullscreen?'3rem':'2.2rem',fontWeight:'200',letterSpacing:'8px',height:isFullscreen?'85px':'65px',color:isBoxDarkMode?'#ffffff':'#000000',textTransform:'uppercase'}}>{action}</div>
                <div className="pacer-ring" style={{width:isFullscreen?'280px':'200px',height:isFullscreen?'280px':'200px',border:`1px solid ${isBoxDarkMode?'rgba(251,191,36,0.1)':'rgba(245,158,11,0.15)'}`,borderRadius:'50%',margin:'0 auto 50px',display:'flex',justifyContent:'center',alignItems:'center',position:'relative'}}>
                  <div ref={nodeRef} style={{width:isFullscreen?'28px':'20px',height:isFullscreen?'28px':'20px',background:isBoxDarkMode?'#fbbf24':'#f59e0b',borderRadius:'50%',boxShadow:`0 0 30px ${isBoxDarkMode?'#fbbf24':'#f59e0b'}`,transitionTimingFunction:'cubic-bezier(0.4, 0, 0.2, 1)',transform:'scale(1)',opacity:1}}/>
                </div>
                <div style={{fontSize:isFullscreen?'2rem':'1.5rem',fontFamily:'monospace',color:isBoxDarkMode?'#fbbf24':'#f59e0b',opacity:0.6}}>{timerDisplay}</div>
                <button onClick={stopSession} className="mt-5 px-6 py-2 rounded-full text-sm transition-all hover:border-red-500 hover:text-red-500" style={{background:'transparent',border:`1px solid ${isBoxDarkMode?'#333':'#ddd'}`,color:isBoxDarkMode?'#666':'#999'}}>End Session</button>
              </div>
            )}

            {gameState === 'gameOver' && (
              <div className="absolute inset-0 flex items-center justify-center rounded-xl z-20 backdrop-blur-sm" style={{background:isBoxDarkMode?'rgba(3,3,3,0.95)':'rgba(255,255,255,0.95)'}}>
                <div className={`rounded-2xl p-6 sm:p-8 shadow-xl border w-full max-w-[480px] mx-4 ${isBoxDarkMode?'bg-gray-800 border-gray-700':'bg-white border-gray-200'}`}>
                  <div className="flex items-center justify-center gap-3 mb-4"><Award className="w-10 h-10 text-yellow-500"/><h2 className={`text-2xl font-bold ${isBoxDarkMode?'text-white':'text-gray-900'}`}>Session Complete</h2></div>
                  <p className={`text-center text-sm mb-6 ${isBoxDarkMode?'text-gray-400':'text-gray-500'}`}>Regular 4-7-8 practice improves heart rate variability and reduces stress.</p>
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <RCard label="Calm Score" value={score} icon={<Heart className="w-4 h-4"/>} color="amber" dark={isBoxDarkMode}/>
                    <RCard label="Best Score" value={bestScore} icon={<Trophy className="w-4 h-4"/>} color="yellow" dark={isBoxDarkMode}/>
                    <RCard label="Cycles" value={cycleCount} icon={<Wind className="w-4 h-4"/>} color="green" dark={isBoxDarkMode}/>
                    <RCard label="Duration" value={formatTime(timeElapsed)} icon={<Timer className="w-4 h-4"/>} color="blue" dark={isBoxDarkMode}/>
                    <RCard label="Relaxation" value={Math.min(100, Math.floor(score * 5))} unit="%" icon={<Brain className="w-4 h-4"/>} color="cyan" dark={isBoxDarkMode}/>
                  </div>
                  <div className="flex gap-3">
                    <Link href="/drills/mental-fitness" className="flex-1"><button className={`w-full px-4 py-2.5 rounded-lg font-semibold ${isDarkMode?'bg-gray-700 text-gray-300 hover:bg-gray-600':'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>← Back</button></Link>
                    <button onClick={startSession} className="flex-1 px-4 py-2.5 bg-gradient-to-r from-amber-500 to-yellow-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98]">Relax Again →</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Instructions Footer */}
        {!isFullscreen && (
          <footer className="mt-6">
            <div className={`rounded-xl border overflow-hidden ${isDarkMode?'bg-gray-800 border-gray-700':'bg-white border-gray-200'}`}>
              <div className={`px-4 py-3 border-b ${isDarkMode?'border-gray-700 bg-gray-800/50':'border-gray-200 bg-gray-50'}`}>
                <div className="flex items-center gap-2"><Info className={`w-4 h-4 ${isDarkMode?'text-amber-400':'text-amber-600'}`}/><h2 className={`font-semibold text-lg ${isDarkMode?'text-white':'text-gray-900'}`}>4-7-8 Breathing Instructions</h2></div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex items-start gap-2"><div className="w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">1</div><p className={`text-sm ${isDarkMode?'text-gray-300':'text-gray-600'}`}><span className="font-semibold text-amber-500">INHALE</span> deeply through your nose for <span className="font-semibold">4 seconds</span></p></div>
                    <div className="flex items-start gap-2"><div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">2</div><p className={`text-sm ${isDarkMode?'text-gray-300':'text-gray-600'}`}><span className="font-semibold text-blue-500">HOLD</span> your breath for <span className="font-semibold">7 seconds</span></p></div>
                    <div className="flex items-start gap-2"><div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">3</div><p className={`text-sm ${isDarkMode?'text-gray-300':'text-gray-600'}`}><span className="font-semibold text-green-500">EXHALE</span> slowly through your mouth for <span className="font-semibold">8 seconds</span></p></div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2"><div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">4</div><p className={`text-sm ${isDarkMode?'text-gray-300':'text-gray-600'}`}>Each complete cycle earns <span className="font-semibold text-purple-500">1 calm point</span></p></div>
                    <div className="flex items-start gap-2"><div className="w-5 h-5 rounded-full bg-cyan-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">5</div><p className={`text-sm ${isDarkMode?'text-gray-300':'text-gray-600'}`}>Follow the <span className="font-semibold text-cyan-500">golden node</span> - expands for inhale, shrinks for exhale</p></div>
                    <div className="flex items-start gap-2"><div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">6</div><p className={`text-sm ${isDarkMode?'text-gray-300':'text-gray-600'}`}>No time limit • <span className="font-semibold text-yellow-500">Continue as long as you like</span></p></div>
                  </div>
                </div>
                <div className={`mt-4 pt-3 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs ${isDarkMode?'border-gray-700 text-gray-400':'border-gray-200 text-gray-500'}`}>
                  <span>🧘 Activates vagus nerve for deep relaxation • Developed by Dr. Andrew Weil</span>
                  <span>🎵 Audio cues guide your breathing rhythm</span>
                </div>
              </div>
            </div>
          </footer>
        )}
      </div>
    </div>
  );
}

function SCard({ icon, value, label, unit = '', dark }) {
  return (
    <div className={`rounded-xl shadow-sm border p-2 sm:p-3 text-center flex flex-col justify-center h-full ${dark?'bg-gray-800 border-gray-700':'bg-white border-gray-100'}`}>
      <div className="mb-1 flex justify-center">{icon}</div>
      <p className={`text-lg sm:text-xl font-bold truncate ${dark?'text-white':'text-gray-900'}`}>{value}{unit}</p>
      <p className={`text-[10px] sm:text-xs truncate ${dark?'text-gray-400':'text-gray-500'}`}>{label}</p>
    </div>
  );
}

function RCard({ label, value, unit = '', icon, color, dark }) {
  const m = { amber:'bg-amber-500/10 border-amber-500/30 text-amber-500', yellow:'bg-yellow-500/10 border-yellow-500/30 text-yellow-500', green:'bg-green-500/10 border-green-500/30 text-green-500', blue:'bg-blue-500/10 border-blue-500/30 text-blue-500', cyan:'bg-cyan-500/10 border-cyan-500/30 text-cyan-500' };
  const c = m[color]||m.amber, [bg,border,text] = c.split(' ');
  return (
    <div className={`flex items-center justify-between p-3 rounded-lg border ${bg} ${border}`}>
      <div className="flex items-center gap-2 min-w-0"><div className={text}>{icon}</div><span className={`text-xs sm:text-sm truncate ${dark?'text-gray-300':'text-gray-600'}`}>{label}</span></div>
      <span className={`font-bold text-base sm:text-lg flex-shrink-0 ml-2 ${text}`}>{value}{unit}</span>
    </div>
  );
}