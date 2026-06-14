'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Award, Wind, Clock, Eye,
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, 
  Timer, Trophy, Square, Brain, Info, TrendingUp, RefreshCw,
  Crosshair, Dumbbell, Database, Keyboard, Star, Users,
  GraduationCap, Lightbulb, ArrowRight, CheckCircle2,
  BookOpen, Hash, Code2, Zap, Target, Activity, BarChart3,
  Heart  // ← Add this line
} from 'lucide-react';

export default function BoxBreathingClient() {
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
  const containerRef = useRef(null);
  const dotRef = useRef(null);
  const [gameState, setGameState] = useState('start');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isBoxDarkMode, setIsBoxDarkMode] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [action, setAction] = useState('READY');
  const [timer, setTimer] = useState(4);
  const [currentState, setCurrentState] = useState(0);
  const [totalBreaths, setTotalBreaths] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [combo, setCombo] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  const [isClient, setIsClient] = useState(false);
  
  const timerIntervalRef = useRef(null);
  const countdownIntervalRef = useRef(null);
  const stateTimeoutRef = useRef(null);
  const startTimeRef = useRef(0);
  const isActiveRef = useRef(false);
  const currentStateRef = useRef(0);
  const totalBreathsRef = useRef(0);
  const scoreRef = useRef(0);
  const comboRef = useRef(0);
  const feedbackTimeoutRef = useRef(null);
  const gameStateRef = useRef('start');

  const states = useRef([
    { label: "INHALE", top: "0%", left: "100%" },
    { label: "HOLD", top: "100%", left: "100%" },
    { label: "EXHALE", top: "100%", left: "0%" },
    { label: "HOLD", top: "0%", left: "0%" }
  ]).current;

  useEffect(() => { setIsClient(true); const t = setTimeout(() => setLoading(false), 0); return () => clearTimeout(t); }, []);
  useEffect(() => { gameStateRef.current = gameState; }, [gameState]);

  const showFeedback = useCallback((msg, type) => {
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    setFeedback(msg); setFeedbackType(type);
    feedbackTimeoutRef.current = setTimeout(() => { setFeedback(''); setFeedbackType(''); }, 800);
  }, []);

  useEffect(() => {
    try { const s = localStorage.getItem('boxBreathingBestScore'); if (s) { const p = parseInt(s, 10); if (!isNaN(p)) setBestScore(p); } } catch (e) {}
  }, []);

  useEffect(() => {
    if (gameState === 'gameOver' && score > bestScore) { setBestScore(score); try { localStorage.setItem('boxBreathingBestScore', score.toString()); } catch (e) {} showFeedback('🏆 New Record!', 'success'); }
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
      const ctx = new (window.AudioContext || window.webkitAudioContext)(), o = ctx.createOscillator(), g = ctx.createGain();
      o.connect(g); g.connect(ctx.destination);
      const now = ctx.currentTime;
      const f = { tick: 880, transition: 660, complete: 1046.5, combo: 660 };
      o.frequency.setValueAtTime(f[type] || 660, now);
      g.gain.setValueAtTime(type==='tick'?0.05:type==='combo'?0.06:type==='complete'?0.1:0.08, now);
      g.gain.exponentialRampToValueAtTime(0.001, now+(type==='complete'?0.3:0.15));
      o.start(now); o.stop(now+(type==='complete'?0.3:0.15));
    } catch (e) {}
  }, [soundEnabled]);

  const formatTime = useCallback((s) => {
    const m = Math.floor(s/60), sec = s%60;
    return `${m.toString().padStart(2,'0')}:${sec.toString().padStart(2,'0')}`;
  }, []);

  const updateDotPosition = useCallback((idx) => {
    if (dotRef.current) { const st = states[idx]; dotRef.current.style.top = `calc(${st.top} - 6px)`; dotRef.current.style.left = `calc(${st.left} - 6px)`; }
  }, [states]);

  const runBoxCycle = useCallback(() => {
    if (!isActiveRef.current) return;
    const idx = currentStateRef.current, st = states[idx];
    setAction(st.label); setCurrentState(idx); updateDotPosition(idx); playSound('transition');
    let count = 4; setTimer(count);
    if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    countdownIntervalRef.current = setInterval(() => {
      count--;
      if (count > 0) { setTimer(count); if (count===1) playSound('tick'); }
      else { if (countdownIntervalRef.current) { clearInterval(countdownIntervalRef.current); countdownIntervalRef.current = null; } }
    }, 1000);
    if (idx===3) {
      totalBreathsRef.current+=1; setTotalBreaths(totalBreathsRef.current);
      comboRef.current+=1; setCombo(comboRef.current);
      const base=5, bonus=Math.floor(comboRef.current/3)*2, pts=base+bonus;
      scoreRef.current+=pts; setScore(scoreRef.current);
      if (comboRef.current>0&&comboRef.current%3===0) { playSound('combo'); showFeedback(`🔥 ${comboRef.current} Breath Combo! +${bonus} bonus`,'success'); }
    }
    if (stateTimeoutRef.current) clearTimeout(stateTimeoutRef.current);
    stateTimeoutRef.current = setTimeout(() => { currentStateRef.current=(currentStateRef.current+1)%4; runBoxCycle(); }, 4000);
  }, [states, updateDotPosition, playSound, showFeedback]);

  const startSession = useCallback(() => {
    try {
      if (typeof window !== 'undefined' && !document.fullscreenElement) {
        if (typeof toggleFullscreen === 'function') toggleFullscreen();
      }
    } catch (err) {}

    setGameState('playing'); gameStateRef.current='playing';
    if (stateTimeoutRef.current) clearTimeout(stateTimeoutRef.current);
    if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    isActiveRef.current=true; currentStateRef.current=0; totalBreathsRef.current=0; scoreRef.current=0; comboRef.current=0;
    setIsActive(true); setScore(0); setTotalBreaths(0); setCombo(0); setTimeElapsed(0); setCurrentState(0); setAction('INHALE'); setTimer(4);
    startTimeRef.current=Date.now();
    if (dotRef.current) { dotRef.current.style.top='calc(0% - 6px)'; dotRef.current.style.left='calc(0% - 6px)'; }
    setTimeout(() => { if (isActiveRef.current) runBoxCycle(); }, 300);
    timerIntervalRef.current=setInterval(() => { const e=Math.floor((Date.now()-startTimeRef.current)/1000); setTimeElapsed(e); }, 1000);
  }, [runBoxCycle]);

  const stopSession = useCallback(() => {
    isActiveRef.current=false; setIsActive(false); setGameState('gameOver'); gameStateRef.current='gameOver';
    if (timerIntervalRef.current) { clearInterval(timerIntervalRef.current); timerIntervalRef.current=null; }
    if (countdownIntervalRef.current) { clearInterval(countdownIntervalRef.current); countdownIntervalRef.current=null; }
    if (stateTimeoutRef.current) clearTimeout(stateTimeoutRef.current);
  }, []);

  const resetGame = useCallback(() => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    if (stateTimeoutRef.current) clearTimeout(stateTimeoutRef.current);
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    isActiveRef.current=false; setIsActive(false);
    setGameState('start'); gameStateRef.current='start'; setCurrentState(0); currentStateRef.current=0; setAction('READY'); setTimer(4);
    setTotalBreaths(0); totalBreathsRef.current=0; setScore(0); scoreRef.current=0; setCombo(0); comboRef.current=0; setTimeElapsed(0); setFeedback('');
    if (dotRef.current) { dotRef.current.style.top='calc(0% - 6px)'; dotRef.current.style.left='calc(0% - 6px)'; }
  }, []);

  useEffect(() => () => { isActiveRef.current=false; if (timerIntervalRef.current) clearInterval(timerIntervalRef.current); if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current); if (stateTimeoutRef.current) clearTimeout(stateTimeoutRef.current); if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current); }, []);

  const sharePage = async () => { if (navigator.share) { try { await navigator.share({ title: 'Free Box Breathing Drill | SkillDrills', text: 'Navy SEAL tactical breathing. Reduce stress!', url: 'https://skilldrills.online/drills/mental-fitness/breathing-exercises/box-breathing' }); } catch (e) {} } else { navigator.clipboard.writeText('https://skilldrills.online/drills/mental-fitness/breathing-exercises/box-breathing'); alert('Link copied!'); } };
  const copyPageLink = () => { navigator.clipboard.writeText('https://skilldrills.online/drills/mental-fitness/breathing-exercises/box-breathing'); alert('Link copied!'); };

  if (loading||!isClient) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-cyan-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Loading box breathing drill...</p>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen select-none ${isDarkMode?'bg-gray-900':'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-3 sm:mb-4">
          <ol className="flex flex-wrap items-center gap-2 text-xs sm:text-sm">
            <li><Link href="/" className={`hover:underline transition-colors ${isDarkMode?'text-gray-400 hover:text-gray-200':'text-gray-600 hover:text-gray-900'}`}>Home</Link></li>
            <li className={isDarkMode?'text-gray-500':'text-gray-400'} aria-hidden="true">/</li>
            <li><Link href="/drills/mental-fitness" className={`hover:underline transition-colors ${isDarkMode?'text-gray-400 hover:text-gray-200':'text-gray-600 hover:text-gray-900'}`}>Mental Fitness</Link></li>
            <li className={isDarkMode?'text-gray-500':'text-gray-400'} aria-hidden="true">/</li>
            <li className={isDarkMode?'text-gray-500':'text-gray-400'}>Breathing</li>
            <li className={isDarkMode?'text-gray-500':'text-gray-400'} aria-hidden="true">/</li>
            <li className={`font-medium ${isDarkMode?'text-cyan-400':'text-cyan-600'}`} aria-current="page">Box Breathing</li>
          </ol>
        </nav>
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-3 sm:mb-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="p-2 sm:p-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg sm:rounded-xl flex-shrink-0">
              <Square className="w-5 h-5 sm:w-6 sm:h-6 text-white"/>
            </div>
            <div>
              <h1 className={`text-xl sm:text-2xl lg:text-3xl font-bold ${isDarkMode?'text-white':'text-gray-900'}`}>Box Breathing</h1>
              <p className={`text-xs sm:text-sm ${isDarkMode?'text-gray-400':'text-gray-500'}`}>Tactical 4-4-4-4 • 5 pts/breath • Combo bonuses</p>
            </div>
          </div>
          <div className="flex gap-1 sm:gap-2 flex-shrink-0">
            {gameState==='playing'&&<button onClick={resetGame} className={`p-1.5 sm:p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode?'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700':'bg-white border-gray-200 text-gray-700 hover:bg-gray-100'}`} title="Reset" aria-label="Reset box breathing session"><RefreshCw className="w-4 h-4 sm:w-5 sm:h-5"/></button>}
            <button onClick={()=>setIsDarkMode(!isDarkMode)} className={`p-1.5 sm:p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode?'bg-gray-800 border-gray-700 text-gray-300':'bg-white border-gray-200 text-gray-700'}`} aria-label={isDarkMode?'Switch to light mode':'Switch to dark mode'}>{isDarkMode?<Sun className="w-4 h-4 sm:w-5 sm:h-5"/>:<Moon className="w-4 h-4 sm:w-5 sm:h-5"/>}</button>
            <button onClick={()=>setIsBoxDarkMode(!isBoxDarkMode)} className={`p-1.5 sm:p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode?'bg-gray-800 border-gray-700 text-gray-300':'bg-white border-gray-200 text-gray-700'}`} aria-label="Toggle drill area theme"><Eye className="w-4 h-4 sm:w-5 sm:h-5"/></button>
            <button onClick={()=>setSoundEnabled(!soundEnabled)} className={`p-1.5 sm:p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode?'bg-gray-800 border-gray-700 text-gray-300':'bg-white border-gray-200 text-gray-700'}`} aria-label={soundEnabled?'Mute sounds':'Enable sounds'}>{soundEnabled?<Volume2 className="w-4 h-4 sm:w-5 sm:h-5"/>:<VolumeX className="w-4 h-4 sm:w-5 sm:h-5"/>}</button>
            <button onClick={toggleFullscreen} className={`p-1.5 sm:p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode?'bg-gray-800 border-gray-700 text-gray-300':'bg-white border-gray-200 text-gray-700'}`} aria-label={isFullscreen?'Exit fullscreen':'Enter fullscreen'}>{isFullscreen?<Minimize2 className="w-4 h-4 sm:w-5 sm:h-5"/>:<Maximize2 className="w-4 h-4 sm:w-5 sm:h-5"/>}</button>
          </div>
        </div>

        <section className="sr-only" aria-label="Drill description for search engines">
          <h2>Free Box Breathing Drill - 4-4-4-4 Tactical Breathing Exercise for Stress Relief & Focus</h2>
          <p>Practice box breathing with this free interactive drill. Follow the dot around the square with 4 second inhale, 4 second hold, 4 second exhale, 4 second hold pattern. Used by Navy SEALs for stress control and focus enhancement. Track breath count, focus score, combo streaks, and session duration. No registration required.</p>
        </section>

        {/* STAT BOARD - 4 columns like Vagal Brake */}
        <div className="grid grid-cols-4 sm:grid-cols-4 gap-2 sm:gap-3 mb-3 sm:mb-4 h-auto min-h-[88px] py-1">
          <StatCard icon={<Brain className="text-cyan-500 w-3 h-3 sm:w-4 sm:h-4"/>} value={score} label="Focus" isDark={isDarkMode} />
          <StatCard icon={<Trophy className="text-yellow-500 w-3 h-3 sm:w-4 sm:h-4"/>} value={bestScore} label="Best" isDark={isDarkMode} />
          <StatCard icon={<Timer className="text-blue-500 w-3 h-3 sm:w-4 sm:h-4"/>} value={formatTime(timeElapsed)} label="Time" isDark={isDarkMode} />
          <StatCard icon={<Wind className="text-green-500 w-3 h-3 sm:w-4 sm:h-4"/>} value={totalBreaths} label="Breaths" isDark={isDarkMode} />
        </div>

        {/* Feedback */}
        <div className="h-8 sm:h-10 mb-2 flex justify-center items-center">
          <div className={`px-3 sm:px-4 py-1 sm:py-1.5 rounded-lg text-white font-semibold text-xs sm:text-sm transition-all duration-200 ${feedback?'opacity-100 scale-100':'opacity-0 scale-95'} ${feedbackType==='success'?'bg-green-500':feedbackType==='warning'?'bg-orange-500':'bg-red-500'}`} role="status" aria-live="polite" aria-atomic="true">{feedback||'\u00A0'}</div>
        </div>

        {/* DRILL BOX - Reduced size, everything contained */}
        <div ref={containerRef} className={`relative overflow-hidden ${isFullscreen?'fixed inset-0 z-50':'rounded-xl border-2'}`} style={{
          background:isBoxDarkMode?'#030303':'#ffffff',
          aspectRatio:isFullscreen?'auto':'16/9',
          maxWidth:'100%',
          margin:'0 auto',
          borderColor:isDarkMode?'#374151':'#e5e7eb'
        }}>
          {/* Mobile Rotate Device Warning Overlay */}
          {showRotateWarning && (
            <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-gray-950/95 text-center p-4 sm:p-6" aria-hidden="true">
              <div className="animate-bounce mb-3 sm:mb-4 text-blue-500">
                <svg className="w-12 h-12 sm:w-16 sm:h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white mb-2">{warningMessage}</h3>
              <p className="text-xs sm:text-sm text-gray-400 mb-4 sm:mb-6">Please use landscape orientation or fullscreen mode for the best training experience.</p>
              <Link href="/drills/mental-fitness">
                <button className="px-4 sm:px-5 py-2 sm:py-2.5 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-350 hover:text-white font-bold rounded-lg text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Go Back
                </button>
              </Link>
            </div>
          )}

{/* Fullscreen controls */}
{isFullscreen&&gameState==='playing'&&(
  <>
    <div className="absolute top-2 right-2 sm:top-4 sm:right-4 z-30 flex gap-2 sm:gap-3">
      <button onClick={resetGame} className="p-1.5 sm:p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all" title="Reset"><RefreshCw className="w-4 h-4 sm:w-5 sm:h-5"/></button>
      <button onClick={()=>setIsDarkMode(!isDarkMode)} className="p-1.5 sm:p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all">{isDarkMode?<Sun className="w-4 h-4 sm:w-5 sm:h-5"/>:<Moon className="w-4 h-4 sm:w-5 sm:h-5"/>}</button>
      <button onClick={()=>setIsBoxDarkMode(!isBoxDarkMode)} className="p-1.5 sm:p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all"><Eye className="w-4 h-4 sm:w-5 sm:h-5"/></button>
      <button onClick={()=>setSoundEnabled(!soundEnabled)} className="p-1.5 sm:p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all">{soundEnabled?<Volume2 className="w-4 h-4 sm:w-5 sm:h-5"/>:<VolumeX className="w-4 h-4 sm:w-5 sm:h-5"/>}</button>
      <button onClick={toggleFullscreen} className="p-1.5 sm:p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all"><Minimize2 className="w-4 h-4 sm:w-5 sm:h-5"/></button>
    </div>
  </>
)}

          {/* Box content - all contained within */}
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
            {/* START SCREEN - contained within box */}
            {gameState==='start'&&(
              <div className={`absolute inset-0 flex items-center justify-center z-10 px-4`} style={{background:isBoxDarkMode?'rgba(3,3,3,0.95)':'rgba(255,255,255,0.95)'}}>
                <div className={`rounded-xl sm:rounded-2xl p-3 sm:p-5 md:p-6 text-center w-full max-w-[85%] sm:max-w-sm mx-auto shadow-xl border ${isBoxDarkMode?'bg-gray-800 border-gray-700':'bg-white border-gray-200'}`}>
                  <Square className="w-8 h-8 sm:w-12 sm:h-12 text-cyan-500 mx-auto mb-2 sm:mb-3"/>
                  <h2 className={`text-lg sm:text-xl font-bold mb-1 ${isBoxDarkMode?'text-white':'text-gray-900'}`}>Box Breathing</h2>
                  <p className={`text-xs mb-1 ${isBoxDarkMode?'text-gray-300':'text-gray-600'}`}>5 points per breath • Combo bonuses</p>
                  <p className={`text-[10px] sm:text-xs mb-3 sm:mb-4 leading-relaxed ${isBoxDarkMode?'text-gray-400':'text-gray-500'}`}>4-4-4-4 tactical breathing used by Navy SEALs. Follow the dot around the square.</p>
                  <button onClick={startSession} className="px-5 py-2 sm:px-6 sm:py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg sm:rounded-xl font-semibold hover:shadow-lg w-full transition-all transform hover:scale-[1.02] active:scale-[0.98] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2">Start Free Breathing</button>
                </div>
              </div>
            )}

            {/* PLAYING STATE - Reduced box size */}
            {gameState==='playing'&&(
              <div className="text-center w-full h-full flex flex-col items-center justify-center px-4">
                <div className="hud-frame relative flex items-center justify-center flex-shrink-0" style={{
                  width: isFullscreen ? 'min(280px, 60vw, 60vh)' : 'min(160px, 38vw, 38vh)',
                  height: isFullscreen ? 'min(280px, 60vw, 60vh)' : 'min(160px, 38vw, 38vh)'
                }}>
                  <div className="box-outline absolute inset-0" style={{
                    border:`1px solid ${isBoxDarkMode?'rgba(0,242,254,0.12)':'rgba(2,132,199,0.18)'}`,
                    borderRadius:'4px'
                  }}/>
                  <div ref={dotRef} className="absolute" style={{
                    width: isFullscreen ? 'min(14px, 2.5vw)' : 'min(8px, 2vw)',
                    height: isFullscreen ? 'min(14px, 2.5vw)' : 'min(8px, 2vw)',
                    background:isBoxDarkMode?'#00f2fe':'#0284c7',
                    borderRadius:'2px',
                    boxShadow:`0 0 10px ${isBoxDarkMode?'#00f2fe':'#0284c7'}`,
                    top:'calc(0% - 4px)',
                    left:'calc(0% - 4px)',
                    transition:'all 4000ms linear'
                  }}/>
                  <div className="center-label text-center z-10">
                    <div style={{
                      fontSize: isFullscreen ? 'clamp(0.9rem, 1.8vw, 1.5rem)' : 'clamp(0.7rem, 3.5vw, 1.1rem)',
                      letterSpacing:'3px',
                      textTransform:'uppercase',
                      color:isBoxDarkMode?'#00f2fe':'#0284c7',
                      marginBottom:'6px',
                      fontWeight:'300'
                    }}>{action}</div>
                    <div style={{
                      fontFamily:'monospace',
                      fontSize: isFullscreen ? 'clamp(1.3rem, 2.5vw, 2rem)' : 'clamp(1rem, 5vw, 1.5rem)',
                      opacity:0.5,
                      color:isBoxDarkMode?'#ffffff':'#000000'
                    }}>{timer}</div>
                  </div>
                </div>
                <button onClick={stopSession} className="mt-3 sm:mt-4 px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm transition-all hover:border-red-500 hover:text-red-500 flex-shrink-0" style={{
                  background:'transparent',
                  border:`1px solid ${isBoxDarkMode?'#333':'#ddd'}`,
                  color:isBoxDarkMode?'#666':'#999'
                }}>End Session</button>
              </div>
            )}

            {/* GAME OVER SCREEN - contained within box */}
            {gameState==='gameOver'&&(
              <div className={`absolute inset-0 flex items-center justify-center z-20 px-3 overflow-auto`} style={{background:isBoxDarkMode?'rgba(3,3,3,0.95)':'rgba(255,255,255,0.95)'}}>
                <div className={`rounded-xl sm:rounded-2xl p-3 sm:p-5 md:p-6 shadow-xl border w-full max-w-[88%] sm:max-w-sm mx-auto my-2 ${isBoxDarkMode?'bg-gray-800 border-gray-700':'bg-white border-gray-200'}`}>
                  <div className="flex items-center justify-center gap-2 mb-2 sm:mb-3">
                    <Award className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-500"/>
                    <h2 className={`text-lg sm:text-xl font-bold ${isBoxDarkMode?'text-white':'text-gray-900'}`}>Complete</h2>
                  </div>
                  <p className={`text-center text-[10px] sm:text-xs mb-3 sm:mb-4 ${isBoxDarkMode?'text-gray-400':'text-gray-500'}`}>Regular box breathing improves focus and reduces stress.</p>
                  <div className="grid grid-cols-2 gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                    <ResultCard label="Focus" value={score} icon={<Brain className="w-3 h-3 sm:w-3.5 sm:h-3.5"/>} color="cyan" isDark={isBoxDarkMode}/>
                    <ResultCard label="Best" value={bestScore} icon={<Trophy className="w-3 h-3 sm:w-3.5 sm:h-3.5"/>} color="yellow" isDark={isBoxDarkMode}/>
                    <ResultCard label="Breaths" value={totalBreaths} icon={<Wind className="w-3 h-3 sm:w-3.5 sm:h-3.5"/>} color="green" isDark={isBoxDarkMode}/>
                    <ResultCard label="Time" value={formatTime(timeElapsed)} icon={<Timer className="w-3 h-3 sm:w-3.5 sm:h-3.5"/>} color="blue" isDark={isBoxDarkMode}/>
                  </div>
                  <div className="flex gap-2">
                    <Link href="/drills/mental-fitness" className="flex-1">
                      <button className={`w-full px-3 py-1.5 sm:py-2 rounded-lg font-semibold text-xs sm:text-sm transition-all ${isDarkMode?'bg-gray-700 text-gray-300 hover:bg-gray-600':'bg-gray-200 text-gray-700 hover:bg-gray-300'} focus:outline-none focus:ring-2 focus:ring-gray-500`}>← Back</button>
                    </Link>
                    <button onClick={startSession} className="flex-1 px-3 py-1.5 sm:py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500">Again →</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 1. DRILL RULES & INSTRUCTIONS */}
        {!isFullscreen && (
          <footer className="mt-4 sm:mt-6" aria-label="Drill rules and scoring information">
            <div className={`rounded-lg sm:rounded-xl border overflow-hidden ${isDarkMode?'bg-gray-800 border-gray-700':'bg-white border-gray-200'}`}>
              <div className={`px-3 sm:px-4 py-2 sm:py-3 border-b ${isDarkMode?'border-gray-700 bg-gray-800/50':'border-gray-200 bg-gray-50'}`}>
                <div className="flex items-center gap-2"><Info className={`w-3 h-3 sm:w-4 sm:h-4 ${isDarkMode?'text-cyan-400':'text-cyan-600'}`} aria-hidden="true"/><h2 className={`font-semibold text-sm sm:text-base ${isDarkMode?'text-white':'text-gray-900'}`}>Box Breathing Instructions</h2></div>
              </div>
              <div className="p-3 sm:p-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex items-start gap-1 sm:gap-2"><div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-cyan-500 flex items-center justify-center text-white text-[10px] sm:text-xs font-bold flex-shrink-0 mt-0.5">1</div><p className={`text-[10px] sm:text-xs lg:text-sm ${isDarkMode?'text-gray-300':'text-gray-600'}`}><span className="font-semibold text-cyan-500">INHALE</span> through nose for <span className="font-semibold">4 seconds</span></p></div>
                    <div className="flex items-start gap-1 sm:gap-2"><div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-[10px] sm:text-xs font-bold flex-shrink-0 mt-0.5">2</div><p className={`text-[10px] sm:text-xs lg:text-sm ${isDarkMode?'text-gray-300':'text-gray-600'}`}><span className="font-semibold text-blue-500">HOLD</span> breath for <span className="font-semibold">4 seconds</span></p></div>
                    <div className="flex items-start gap-1 sm:gap-2"><div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-[10px] sm:text-xs font-bold flex-shrink-0 mt-0.5">3</div><p className={`text-[10px] sm:text-xs lg:text-sm ${isDarkMode?'text-gray-300':'text-gray-600'}`}><span className="font-semibold text-green-500">EXHALE</span> through mouth for <span className="font-semibold">4 seconds</span></p></div>
                  </div>
                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex items-start gap-1 sm:gap-2"><div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-[10px] sm:text-xs font-bold flex-shrink-0 mt-0.5">4</div><p className={`text-[10px] sm:text-xs lg:text-sm ${isDarkMode?'text-gray-300':'text-gray-600'}`}><span className="font-semibold text-purple-500">HOLD</span> again for <span className="font-semibold">4 seconds</span></p></div>
                    <div className="flex items-start gap-1 sm:gap-2"><div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-orange-500 flex items-center justify-center text-white text-[10px] sm:text-xs font-bold flex-shrink-0 mt-0.5">5</div><p className={`text-[10px] sm:text-xs lg:text-sm ${isDarkMode?'text-gray-300':'text-gray-600'}`}>Each breath: <span className="font-semibold text-orange-500">5 points</span> + combo bonuses</p></div>
                    <div className="flex items-start gap-1 sm:gap-2"><div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-yellow-500 flex items-center justify-center text-white text-[10px] sm:text-xs font-bold flex-shrink-0 mt-0.5">6</div><p className={`text-[10px] sm:text-xs lg:text-sm ${isDarkMode?'text-gray-300':'text-gray-600'}`}>Used by <span className="font-semibold text-yellow-500">Navy SEALs</span></p></div>
                  </div>
                </div>
                <div className={`mt-3 sm:mt-4 pt-2 sm:pt-3 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 sm:gap-2 text-[10px] sm:text-xs ${isDarkMode?'border-gray-700 text-gray-400':'border-gray-200 text-gray-500'}`}>
                  <span>🧘 Reduces stress • Improves concentration</span>
                  <span>🎵 Audio cues guide breathing • Free forever</span>
                </div>
              </div>
            </div>
          </footer>
        )}

        {/* 2. ABOUT THIS DRILL */}
        {!isFullscreen && (
          <section className="mt-6 sm:mt-8" aria-label="About this box breathing drill">
            <div className={`rounded-xl border overflow-hidden ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <div className={`px-4 py-3 border-b ${isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'}`}><div className="flex items-center gap-2"><GraduationCap className={`w-5 h-5 ${isDarkMode ? 'text-cyan-400' : 'text-cyan-600'}`} aria-hidden="true" /><h2 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>About This Free Box Breathing Drill</h2></div></div>
              <div className="p-5">
                <p className={`text-sm leading-relaxed mb-5 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>This free box breathing drill guides you through the 4-4-4-4 tactical breathing pattern used by Navy SEALs and first responders. Follow the glowing dot around the square as it paces your inhale, hold, exhale, and hold phases.</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
                  <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-cyan-50 border-cyan-100'}`}><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-cyan-500 flex items-center justify-center"><Wind className="w-4 h-4 text-white" /></div><h3 className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Who It's For</h3></div><p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Anyone seeking stress relief, better focus, anxiety management, or pre-performance calming.</p></div>
                  <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-green-50 border-green-100'}`}><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-green-500 flex items-center justify-center"><TrendingUp className="w-4 h-4 text-white" /></div><h3 className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Benefits</h3></div><p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Reduces cortisol, lowers heart rate, improves concentration, activates parasympathetic nervous system.</p></div>
                  <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-purple-50 border-purple-100'}`}><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-purple-500 flex items-center justify-center"><BarChart3 className="w-4 h-4 text-white" /></div><h3 className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>What You'll Track</h3></div><p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Focus score, breath count, session duration, and best performance.</p></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-yellow-50 border-yellow-100'}`}><div className="flex items-center gap-2 mb-3"><div className="w-8 h-8 rounded-lg bg-yellow-500 flex items-center justify-center"><Lightbulb className="w-4 h-4 text-white" /></div><h3 className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>When to Practice</h3></div><ul className={`text-xs space-y-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}><li className="flex items-start gap-2"><CheckCircle2 className="w-3 h-3 text-yellow-500 mt-0.5 flex-shrink-0" /> Before stressful meetings or presentations</li><li className="flex items-start gap-2"><CheckCircle2 className="w-3 h-3 text-yellow-500 mt-0.5 flex-shrink-0" /> During study breaks to reset focus</li><li className="flex items-start gap-2"><CheckCircle2 className="w-3 h-3 text-yellow-500 mt-0.5 flex-shrink-0" /> Morning routine for calm start to the day</li></ul></div>
                  <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-amber-50 border-amber-100'}`}><div className="flex items-center gap-2 mb-3"><div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center"><Clock className="w-4 h-4 text-white" /></div><h3 className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>How to Practice</h3></div><ol className={`text-xs space-y-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}><li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-amber-500 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">1</span> Sit comfortably with back straight</li><li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-amber-500 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">2</span> Follow the dot around the square</li><li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-amber-500 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">3</span> Practice 5-10 minutes daily</li></ol></div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 3. RELATED DRILLS */}
        {!isFullscreen && (
          <section className="mt-6 sm:mt-8" aria-label="Related training drills and resources">
            <div className="flex items-center gap-2 mb-4"><div className="w-1 h-6 rounded-full bg-gradient-to-b from-cyan-500 to-blue-600"></div><h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Explore Related Free Drills</h2><span className={`text-xs px-2 py-0.5 rounded-full ${isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>8 drills</span></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link href="/drills/mental-fitness/breathing-exercises/4-7-8" className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-amber-500' : 'bg-white border-gray-200 hover:border-amber-300'}`}><div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-yellow-500"></div><div className="p-4"><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center"><Heart className="w-4 h-4 text-amber-600" /></div><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>Breathing</span></div><h3 className={`font-semibold text-sm mb-1 ${isDarkMode ? 'text-white group-hover:text-amber-400' : 'text-gray-900 group-hover:text-amber-600'} transition-colors`}>4-7-8 Vagal Brake</h3><p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Deep relaxation technique for sleep and anxiety relief.</p><div className="flex items-center gap-1 mt-3 text-amber-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Start Drill <ArrowRight className="w-3 h-3" /></div></div></Link>
              <Link href="/drills/mental-fitness/breathing-exercises/wim-hof" className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-orange-500' : 'bg-white border-gray-200 hover:border-orange-300'}`}><div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-red-500"></div><div className="p-4"><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center"><Zap className="w-4 h-4 text-orange-600" /></div><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>Breathing</span></div><h3 className={`font-semibold text-sm mb-1 ${isDarkMode ? 'text-white group-hover:text-orange-400' : 'text-gray-900 group-hover:text-orange-600'} transition-colors`}>Wim Hof Method</h3><p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Energizing breathwork with retention phases and recovery breath.</p><div className="flex items-center gap-1 mt-3 text-orange-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Start Drill <ArrowRight className="w-3 h-3" /></div></div></Link>
              <Link href="/drills/mental-fitness/stress-control/calm-under-pressure" className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-blue-500' : 'bg-white border-gray-200 hover:border-blue-300'}`}><div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-500"></div><div className="p-4"><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center"><Brain className="w-4 h-4 text-blue-600" /></div><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>Stress Control</span></div><h3 className={`font-semibold text-sm mb-1 ${isDarkMode ? 'text-white group-hover:text-blue-400' : 'text-gray-900 group-hover:text-blue-600'} transition-colors`}>Calm Under Pressure</h3><p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Reaction time training with stress-inducing challenges.</p><div className="flex items-center gap-1 mt-3 text-blue-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Start Drill <ArrowRight className="w-3 h-3" /></div></div></Link>
              
              <Link href="/drills/productivity/focus-endurance/deep-work" className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-rose-500' : 'bg-white border-gray-200 hover:border-rose-300'}`}><div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-500 to-pink-500"></div><div className="p-4"><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-rose-100 flex items-center justify-center"><Timer className="w-4 h-4 text-rose-600" /></div><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>Productivity</span></div><h3 className={`font-semibold text-sm mb-1 ${isDarkMode ? 'text-white group-hover:text-rose-400' : 'text-gray-900 group-hover:text-rose-600'} transition-colors`}>Deep Work Timer</h3><p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Build focus endurance with structured deep work sessions.</p><div className="flex items-center gap-1 mt-3 text-rose-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Start Drill <ArrowRight className="w-3 h-3" /></div></div></Link>
              <Link href="/drills/cognitive/focus/concentration-grid" className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-teal-500' : 'bg-white border-gray-200 hover:border-teal-300'}`}><div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 to-green-500"></div><div className="p-4"><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center"><Target className="w-4 h-4 text-teal-600" /></div><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>Focus</span></div><h3 className={`font-semibold text-sm mb-1 ${isDarkMode ? 'text-white group-hover:text-teal-400' : 'text-gray-900 group-hover:text-teal-600'} transition-colors`}>Concentration Grid</h3><p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Find numbers in sequence under time pressure.</p><div className="flex items-center gap-1 mt-3 text-teal-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Start Drill <ArrowRight className="w-3 h-3" /></div></div></Link>
              <Link href="/drills/cognitive/memory/card-matching" className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-purple-500' : 'bg-white border-gray-200 hover:border-purple-300'}`}><div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-violet-500"></div><div className="p-4"><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center"><Database className="w-4 h-4 text-purple-600" /></div><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>Memory</span></div><h3 className={`font-semibold text-sm mb-1 ${isDarkMode ? 'text-white group-hover:text-purple-400' : 'text-gray-900 group-hover:text-purple-600'} transition-colors`}>Card Matching</h3><p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Remember and match card positions to improve memory.</p><div className="flex items-center gap-1 mt-3 text-purple-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Start Drill <ArrowRight className="w-3 h-3" /></div></div></Link>
              <Link href="/drills/physical/reflex-training/reaction-chain" className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-red-500' : 'bg-white border-gray-200 hover:border-red-300'}`}><div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-rose-500"></div><div className="p-4"><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center"><Zap className="w-4 h-4 text-red-600" /></div><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>Reflex</span></div><h3 className={`font-semibold text-sm mb-1 ${isDarkMode ? 'text-white group-hover:text-red-400' : 'text-gray-900 group-hover:text-red-600'} transition-colors`}>Reaction Chain</h3><p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Chain multiple reactions in sequence for reflex training.</p><div className="flex items-center gap-1 mt-3 text-red-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Start Drill <ArrowRight className="w-3 h-3" /></div></div></Link>
            </div>
          </section>
        )}

        {/* 4. GLOBAL FOOTER */}
        {!isFullscreen && (<footer className="mt-8 sm:mt-12 bg-gray-900 text-gray-400 rounded-xl py-6 sm:py-10 px-4 sm:px-6" role="contentinfo"><div className="max-w-7xl mx-auto"><div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 mb-6 sm:mb-8"><div><h3 className="text-white font-semibold mb-3 text-sm">FPS Training</h3><ul className="space-y-2 text-xs sm:text-sm"><li><Link href="/drills/fps/flick-shot-training" className="hover:text-white transition-colors">Flick Shot Trainer</Link></li><li><Link href="/drills/fps/target-acquisition" className="hover:text-white transition-colors">Target Acquisition</Link></li><li><Link href="/drills/fps" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">All 21 FPS Drills →</Link></li></ul></div><div><h3 className="text-white font-semibold mb-3 text-sm">Cognitive</h3><ul className="space-y-2 text-xs sm:text-sm"><li><Link href="/drills/cognitive/memory/card-matching" className="hover:text-white transition-colors">Memory Games</Link></li><li><Link href="/drills/cognitive/attention/divided-attention" className="hover:text-white transition-colors">Divided Attention</Link></li><li><Link href="/drills/cognitive" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">All 16 Cognitive →</Link></li></ul></div><div><h3 className="text-white font-semibold mb-3 text-sm">Academic</h3><ul className="space-y-2 text-xs sm:text-sm"><li><Link href="/drills/academic/writing-speed/typing-test" className="hover:text-white transition-colors">Typing Speed Test</Link></li><li><Link href="/drills/academic/reading-speed/speed-reader" className="hover:text-white transition-colors">Speed Reader</Link></li><li><Link href="/drills/academic" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">All 12 Academic →</Link></li></ul></div><div><h3 className="text-white font-semibold mb-3 text-sm">Visual & Motor</h3><ul className="space-y-2 text-xs sm:text-sm"><li><Link href="/drills/visual/reaction-speed/light-reaction" className="hover:text-white transition-colors">Reaction Time Test</Link></li><li><Link href="/drills/motor/hand-eye-coordination/aim-trainer" className="hover:text-white transition-colors">Hand-Eye Coordination</Link></li><li><Link href="/drills/visual" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">All 14 Visual →</Link></li></ul></div><div><h3 className="text-white font-semibold mb-3 text-sm">More</h3><ul className="space-y-2 text-xs sm:text-sm"><li><Link href="/drills/memory" className="hover:text-white transition-colors">Memory (15)</Link></li><li><Link href="/drills/productivity" className="hover:text-white transition-colors">Productivity (10)</Link></li><li><Link href="/drills/mental-fitness" className="hover:text-white transition-colors">Mental Fitness (6)</Link></li><li><Link href="/drills/physical" className="hover:text-white transition-colors">Physical (11)</Link></li></ul></div></div><div className="border-t border-gray-800 pt-6 sm:pt-8 text-center"><div className="flex items-center justify-center gap-3 mb-4"><div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center"><Target className="w-5 h-5 text-white" aria-hidden="true" /></div><span className="text-white font-bold text-lg">SkillDrills</span></div><p className="text-xs sm:text-sm mb-2">&copy; 2026 SkillDrills. All rights reserved.</p><p className="text-[10px] sm:text-xs max-w-2xl mx-auto leading-relaxed mb-6">Free online box breathing drill with 4-4-4-4 tactical breathing pattern. Follow the visual square pacer for inhale, hold, exhale, hold phases. Used by Navy SEALs for stress control. No registration required. More free drills at skilldrills.online.</p><div className="flex items-center justify-center gap-4 sm:gap-5 flex-wrap"><button onClick={sharePage} className="text-gray-500 hover:text-white transition-colors" title="Share" aria-label="Share this drill"><svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/></svg></button><button onClick={copyPageLink} className="text-gray-500 hover:text-white transition-colors" title="Copy link" aria-label="Copy link"><svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/></svg></button><a href="https://twitter.com/skilldrillss" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors" aria-label="Twitter X"><svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a></div></div></div></footer>)}
      </div>
    </div>
  );
}

function StatCard({ icon, value, label, unit = '', isDark }) {
  return (
    <div className={`rounded-lg sm:rounded-xl shadow-sm border p-2 sm:p-3 text-center flex flex-col justify-center h-full transition-colors ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
      <div className="mb-1 flex justify-center" aria-hidden="true">{icon}</div>
      <p className={`text-sm sm:text-base lg:text-lg font-bold truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>{value}{unit}</p>
      <p className={`text-[8px] sm:text-[10px] lg:text-xs truncate ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{label}</p>
    </div>
  );
}

function ResultCard({ label, value, unit = '', icon, color, isDark }) {
  const colorMap = { 
    cyan: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', text: 'text-cyan-500', icon: 'text-cyan-500' }, 
    yellow: { bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', text: 'text-yellow-500', icon: 'text-yellow-500' }, 
    green: { bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-500', icon: 'text-green-500' }, 
    blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-500', icon: 'text-blue-500' }
  };
  const colors = colorMap[color] || colorMap.cyan;
  return (
    <div className={`flex items-center justify-between p-2 sm:p-2.5 rounded-lg border ${colors.bg} ${colors.border}`}>
      <div className="flex items-center gap-1 sm:gap-1.5 min-w-0"><div className={colors.icon} aria-hidden="true">{icon}</div><span className={`text-[10px] sm:text-xs truncate ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{label}</span></div>
      <span className={`font-bold text-xs sm:text-sm flex-shrink-0 ml-1 ${colors.text}`}>{value}{unit}</span>
    </div>
  );
}