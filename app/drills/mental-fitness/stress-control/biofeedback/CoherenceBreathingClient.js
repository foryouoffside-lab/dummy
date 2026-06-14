'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, 
  Eye, Timer, TrendingUp, Wind, Brain, Info, Trophy, RefreshCw,
  GraduationCap, Lightbulb, Clock, ArrowRight,
  CheckCircle2, BarChart3, Heart, Zap, Award, Target
} from 'lucide-react';

export default function CoherenceBreathingClient() {
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
  const pacerRef = useRef(null);
  const [gameState, setGameState] = useState('start');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isBoxDarkMode, setIsBoxDarkMode] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [totalBreaths, setTotalBreaths] = useState(0);
  const [timeLeft, setTimeLeft] = useState(300);
  const [instruction, setInstruction] = useState('');
  const [bestBreaths, setBestBreaths] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  const [isClient, setIsClient] = useState(false);
  
  const isActiveRef = useRef(false);
  const timerIntervalRef = useRef(null);
  const inhaleTimeoutRef = useRef(null);
  const exhaleTimeoutRef = useRef(null);
  const feedbackTimeoutRef = useRef(null);
  const gameStateRef = useRef('start');
  
  const inhaleTime = 5000;
  const exhaleTime = 6000;

  useEffect(() => { setIsClient(true); const t = setTimeout(() => setLoading(false), 0); return () => clearTimeout(t); }, []);
  useEffect(() => { gameStateRef.current = gameState; }, [gameState]);

  const showFeedback = useCallback((msg, type) => {
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    setFeedback(msg); setFeedbackType(type);
    feedbackTimeoutRef.current = setTimeout(() => { setFeedback(''); setFeedbackType(''); }, 800);
  }, []);

  useEffect(() => {
    try { 
      const s = localStorage.getItem('coherenceBreathingBestBreaths'); 
      if (s) { 
        const p = parseInt(s, 10); 
        if (!isNaN(p)) setBestBreaths(p); 
      } 
    } catch (e) {}
  }, []);

  useEffect(() => {
    if (gameState === 'gameOver' && totalBreaths > bestBreaths) { 
      setBestBreaths(totalBreaths); 
      try { localStorage.setItem('coherenceBreathingBestBreaths', totalBreaths.toString()); } catch (e) {} 
      showFeedback('New Record! ' + totalBreaths + ' breaths', 'success'); 
    }
  }, [gameState, totalBreaths, bestBreaths, showFeedback]);

  const toggleFullscreen = useCallback(async () => {
    try {
      if (!isFullscreen) { 
        const el = containerRef.current; 
        if (el && el.requestFullscreen) { 
          await el.requestFullscreen(); 
          setIsFullscreen(true); 
        } 
      } else { 
        if (document.fullscreenElement) {
          await document.exitFullscreen(); 
          setIsFullscreen(false); 
        }
      }
    } catch (e) {}
  }, [isFullscreen]);

  useEffect(() => {
    const handleFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const playSound = useCallback((type) => {
    if (!soundEnabled) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioContext();
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.connect(g);
      g.connect(ctx.destination);
      const now = ctx.currentTime;
      
      if (type === 'inhale') { 
        o.frequency.setValueAtTime(523.25, now); 
        g.gain.setValueAtTime(0.08, now); 
        g.gain.exponentialRampToValueAtTime(0.001, now + 0.2); 
        o.start(now); 
        o.stop(now + 0.2); 
      } else if (type === 'exhale') { 
        o.frequency.setValueAtTime(392.00, now); 
        g.gain.setValueAtTime(0.08, now); 
        g.gain.exponentialRampToValueAtTime(0.001, now + 0.3); 
        o.start(now); 
        o.stop(now + 0.3); 
      } else if (type === 'complete') { 
        o.frequency.setValueAtTime(1046.5, now); 
        g.gain.setValueAtTime(0.1, now); 
        g.gain.exponentialRampToValueAtTime(0.001, now + 0.3); 
        o.start(now); 
        o.stop(now + 0.3); 
      }
    } catch (e) {}
  }, [soundEnabled]);

  const formatTime = useCallback((s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return m.toString().padStart(2, '0') + ':' + sec.toString().padStart(2, '0');
  }, []);

  const runCycle = useCallback(() => {
    if (!isActiveRef.current) return;
    
    setInstruction('INHALE');
    if (pacerRef.current) { 
      pacerRef.current.style.transition = 'transform ' + inhaleTime + 'ms cubic-bezier(0.4, 0, 0.2, 1)'; 
      pacerRef.current.style.transform = 'scale(2.5)'; 
    }
    playSound('inhale');
    
    inhaleTimeoutRef.current = setTimeout(() => {
      if (!isActiveRef.current) return;
      
      setInstruction('EXHALE');
      if (pacerRef.current) { 
        pacerRef.current.style.transition = 'transform ' + exhaleTime + 'ms cubic-bezier(0.4, 0, 0.2, 1)'; 
        pacerRef.current.style.transform = 'scale(1)'; 
      }
      playSound('exhale');
      
      setTotalBreaths(prev => { 
        const nc = prev + 1; 
        if (nc % 10 === 0) showFeedback(nc + ' Breaths Complete!', 'success'); 
        return nc; 
      });
      
      exhaleTimeoutRef.current = setTimeout(() => { 
        runCycle(); 
      }, exhaleTime);
    }, inhaleTime);
  }, [playSound, showFeedback]);

  const startDrill = useCallback(() => {
    try {
      if (typeof window !== 'undefined' && !document.fullscreenElement && toggleFullscreen) {
        toggleFullscreen();
      }
    } catch (err) {}

    setGameState('playing'); 
    gameStateRef.current = 'playing';
    if (isActiveRef.current) return;
    
    isActiveRef.current = true; 
    setTimeLeft(300); 
    setTotalBreaths(0); 
    setInstruction('INHALE');
    
    if (pacerRef.current) { 
      pacerRef.current.style.transform = 'scale(1)'; 
      pacerRef.current.style.transition = 'none'; 
    }
    
    if (inhaleTimeoutRef.current) clearTimeout(inhaleTimeoutRef.current);
    if (exhaleTimeoutRef.current) clearTimeout(exhaleTimeoutRef.current);
    
    setTimeout(() => {
      runCycle();
    }, 500);
    
    timerIntervalRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          if (timerIntervalRef.current) { 
            clearInterval(timerIntervalRef.current); 
            timerIntervalRef.current = null; 
          }
          if (inhaleTimeoutRef.current) clearTimeout(inhaleTimeoutRef.current);
          if (exhaleTimeoutRef.current) clearTimeout(exhaleTimeoutRef.current);
          isActiveRef.current = false; 
          setInstruction('COMPLETE'); 
          playSound('complete');
          setGameState('gameOver'); 
          gameStateRef.current = 'gameOver'; 
          showFeedback('Session Complete!', 'success');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [runCycle, playSound, showFeedback, toggleFullscreen]);

  const resetGame = useCallback(() => {
    if (timerIntervalRef.current) { 
      clearInterval(timerIntervalRef.current); 
      timerIntervalRef.current = null; 
    }
    if (inhaleTimeoutRef.current) clearTimeout(inhaleTimeoutRef.current);
    if (exhaleTimeoutRef.current) clearTimeout(exhaleTimeoutRef.current);
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    
    isActiveRef.current = false; 
    setGameState('start'); 
    gameStateRef.current = 'start';
    setInstruction(''); 
    setTotalBreaths(0); 
    setTimeLeft(300); 
    setFeedback('');
    
    if (pacerRef.current) {
      pacerRef.current.style.transform = 'scale(1)';
      pacerRef.current.style.transition = 'none';
    }
  }, []);

  useEffect(() => {
    return () => { 
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current); 
      if (inhaleTimeoutRef.current) clearTimeout(inhaleTimeoutRef.current); 
      if (exhaleTimeoutRef.current) clearTimeout(exhaleTimeoutRef.current); 
      if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current); 
    };
  }, []);

  const sharePage = async () => { 
    if (navigator.share) { 
      try { 
        await navigator.share({ 
          title: 'Free Coherence Breathing Drill | SkillDrills', 
          text: '5:6 ratio breathing for HRV optimization. Free!', 
          url: 'https://skilldrills.online/drills/mental-fitness/stress-control/biofeedback' 
        }); 
      } catch (e) {} 
    } else { 
      navigator.clipboard.writeText('https://skilldrills.online/drills/mental-fitness/stress-control/biofeedback'); 
      alert('Link copied!'); 
    } 
  };
  
  const copyPageLink = () => { 
    navigator.clipboard.writeText('https://skilldrills.online/drills/mental-fitness/stress-control/biofeedback'); 
    alert('Link copied!'); 
  };

  if (loading || !isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading breathing drill...</p>
        </div>
      </div>
    );
  }

  const boxBg = isBoxDarkMode ? '#0a0a1a' : '#f0f9ff';
  const overlayBg = isBoxDarkMode ? 'rgba(10,10,26,0.95)' : 'rgba(240,249,255,0.95)';
  const textColor = isBoxDarkMode ? '#38bdf8' : '#0284c7';
  const circleGlow = isBoxDarkMode ? 'rgba(56,189,248,0.4)' : 'rgba(2,132,199,0.25)';
  const gradientGlow = isBoxDarkMode ? 'rgba(56,189,248,0.12)' : 'rgba(2,132,199,0.08)';

  return (
    <div className={'min-h-screen select-none ' + (isDarkMode ? 'bg-gray-900' : 'bg-gray-50')}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Coherence Breathing - 5:6 HRV Biofeedback",
        "url": "https://skilldrills.online/drills/mental-fitness/stress-control/biofeedback",
        "description": "5:6 ratio coherence breathing to optimize heart rate variability. 5s inhale, 6s exhale with visual pacer and audio tones. 5-minute guided session.",
        "applicationCategory": "HealthApplication",
        "operatingSystem": "Web",
        "offers": {"@type": "Offer", "price": "0", "priceCurrency": "USD"},
        "author": {"@type": "Organization", "name": "SkillDrills"}
      })}}/>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-3 sm:mb-4">
          <ol className="flex flex-wrap items-center gap-2 text-xs sm:text-sm">
            <li><Link href="/" className={'hover:underline transition-colors ' + (isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900')}>Home</Link></li>
            <li className={isDarkMode ? 'text-gray-500' : 'text-gray-400'} aria-hidden="true">/</li>
            <li><Link href="/drills/mental-fitness" className={'hover:underline transition-colors ' + (isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900')}>Mental Fitness</Link></li>
            <li className={isDarkMode ? 'text-gray-500' : 'text-gray-400'} aria-hidden="true">/</li>
            <li className={isDarkMode ? 'text-gray-500' : 'text-gray-400'}>Stress Control</li>
            <li className={isDarkMode ? 'text-gray-500' : 'text-gray-400'} aria-hidden="true">/</li>
            <li className={'font-medium ' + (isDarkMode ? 'text-cyan-400' : 'text-cyan-600')} aria-current="page">Coherence Breathing</li>
          </ol>
        </nav>
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-3 sm:mb-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="p-2 sm:p-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg sm:rounded-xl flex-shrink-0">
              <Wind className="w-5 h-5 sm:w-6 sm:h-6 text-white"/>
            </div>
            <div>
              <h1 className={'text-xl sm:text-2xl lg:text-3xl font-bold ' + (isDarkMode ? 'text-white' : 'text-gray-900')}>Coherence Breathing</h1>
              <p className={'text-xs sm:text-sm ' + (isDarkMode ? 'text-gray-400' : 'text-gray-500')}>5:6 ratio • 5-min session • HRV training</p>
            </div>
          </div>
          <div className="flex gap-1 sm:gap-2 flex-shrink-0">
            {gameState === 'playing' && (
              <button onClick={resetGame} className={'p-1.5 sm:p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ' + (isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-100')} title="Reset" aria-label="Reset session">
                <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5"/>
              </button>
            )}
            <button onClick={() => setIsDarkMode(!isDarkMode)} className={'p-1.5 sm:p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ' + (isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700')} aria-label={isDarkMode ? 'Light mode' : 'Dark mode'}>
              {isDarkMode ? <Sun className="w-4 h-4 sm:w-5 sm:h-5"/> : <Moon className="w-4 h-4 sm:w-5 sm:h-5"/>}
            </button>
            <button onClick={() => setIsBoxDarkMode(!isBoxDarkMode)} className={'p-1.5 sm:p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ' + (isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700')} aria-label="Toggle drill area theme">
              <Eye className="w-4 h-4 sm:w-5 sm:h-5"/>
            </button>
            <button onClick={() => setSoundEnabled(!soundEnabled)} className={'p-1.5 sm:p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ' + (isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700')} aria-label={soundEnabled ? 'Mute' : 'Unmute'}>
              {soundEnabled ? <Volume2 className="w-4 h-4 sm:w-5 sm:h-5"/> : <VolumeX className="w-4 h-4 sm:w-5 sm:h-5"/>}
            </button>
            <button onClick={toggleFullscreen} className={'p-1.5 sm:p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ' + (isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700')} aria-label={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}>
              {isFullscreen ? <Minimize2 className="w-4 h-4 sm:w-5 sm:h-5"/> : <Maximize2 className="w-4 h-4 sm:w-5 sm:h-5"/>}
            </button>
          </div>
        </div>

        {/* Stats Board */}
        <div className="grid grid-cols-4 gap-2 sm:gap-3 mb-3 sm:mb-4 h-auto min-h-[88px] py-1">
          <SCard icon={<Wind className="text-cyan-500"/>} value={totalBreaths} label="Breaths" dark={isDarkMode}/>
          <SCard icon={<Trophy className="text-yellow-500"/>} value={bestBreaths} label="Best" dark={isDarkMode}/>
          <SCard icon={<Timer className={timeLeft < 60 ? 'text-red-500' : 'text-blue-500'}/>} value={formatTime(timeLeft)} label="Time" dark={isDarkMode}/>
          <SCard icon={<TrendingUp className="text-purple-500"/>} value="5:6" label="Ratio" dark={isDarkMode}/>
        </div>

        {/* Feedback */}
        <div className="h-8 sm:h-10 mb-2 flex justify-center items-center">
          <div className={'px-3 sm:px-4 py-1 sm:py-1.5 rounded-lg text-white font-semibold text-xs sm:text-sm transition-all duration-200 ' + (feedback ? 'opacity-100 scale-100' : 'opacity-0 scale-95') + ' ' + (feedbackType === 'success' ? 'bg-green-500' : feedbackType === 'warning' ? 'bg-orange-500' : 'bg-red-500')} role="status" aria-live="polite">
            {feedback || '\u00A0'}
          </div>
        </div>

        {/* Drill Box */}
        <div 
          ref={containerRef} 
          className={'relative overflow-hidden ' + (isFullscreen ? 'fixed inset-0 z-50' : 'rounded-xl border-2')} 
          style={{
            background: boxBg, 
            aspectRatio: isFullscreen ? 'auto' : '16/9', 
            maxWidth: '100%', 
            margin: '0 auto', 
            borderColor: isDarkMode ? '#374151' : '#e5e7eb'
          }}
        >
          {/* Rotate Warning */}
          {showRotateWarning && (
            <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-gray-950/95 text-center p-4 sm:p-6" aria-hidden="true">
              <div className="animate-bounce mb-3 sm:mb-4 text-blue-500">
                <svg className="w-12 h-12 sm:w-16 sm:h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white mb-2">{warningMessage}</h3>
              <p className="text-xs sm:text-sm text-gray-400 mb-4 sm:mb-6">Please use landscape orientation or fullscreen mode.</p>
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

          {/* Fullscreen Controls */}
          {isFullscreen && gameState === 'playing' && (
            <div className="absolute top-2 right-2 sm:top-4 sm:right-4 z-30 flex gap-2 sm:gap-3">
              <button onClick={resetGame} className="p-1.5 sm:p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all" title="Reset"><RefreshCw className="w-4 h-4 sm:w-5 sm:h-5"/></button>
              <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-1.5 sm:p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all">{isDarkMode ? <Sun className="w-4 h-4 sm:w-5 sm:h-5"/> : <Moon className="w-4 h-4 sm:w-5 sm:h-5"/>}</button>
              <button onClick={() => setIsBoxDarkMode(!isBoxDarkMode)} className="p-1.5 sm:p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all"><Eye className="w-4 h-4 sm:w-5 sm:h-5"/></button>
              <button onClick={() => setSoundEnabled(!soundEnabled)} className="p-1.5 sm:p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all">{soundEnabled ? <Volume2 className="w-4 h-4 sm:w-5 sm:h-5"/> : <VolumeX className="w-4 h-4 sm:w-5 sm:h-5"/>}</button>
              <button onClick={toggleFullscreen} className="p-1.5 sm:p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all"><Minimize2 className="w-4 h-4 sm:w-5 sm:h-5"/></button>
            </div>
          )}

          {/* Box Content */}
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
            
            {/* START SCREEN */}
            {gameState === 'start' && (
              <div className="absolute inset-0 flex items-center justify-center z-10 px-4" style={{background: overlayBg}}>
                <div className={'rounded-xl sm:rounded-2xl p-3 sm:p-5 md:p-6 text-center w-full max-w-[85%] sm:max-w-sm mx-auto shadow-xl border ' + (isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200')}>
                  <Wind className="w-10 h-10 sm:w-12 sm:h-12 text-cyan-500 mx-auto mb-2 sm:mb-3"/>
                  <h2 className={'text-lg sm:text-xl font-bold mb-1 ' + (isBoxDarkMode ? 'text-white' : 'text-gray-900')}>Coherence Breathing</h2>
                  <p className={'text-xs mb-1 ' + (isBoxDarkMode ? 'text-gray-300' : 'text-gray-600')}>5:6 breath ratio • 5-minute session</p>
                  <p className={'text-[10px] sm:text-xs mb-3 sm:mb-4 leading-relaxed ' + (isBoxDarkMode ? 'text-gray-400' : 'text-gray-500')}>Optimizes heart rate variability. Inhale 5s as circle expands, exhale 6s as it contracts.</p>
                  <button onClick={startDrill} className="px-5 py-2 sm:px-6 sm:py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg sm:rounded-xl font-semibold hover:shadow-lg w-full transition-all transform hover:scale-[1.02] active:scale-[0.98] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500">
                    Start Free Drill
                  </button>
                </div>
              </div>
            )}

            {/* PLAYING SCREEN */}
            {gameState === 'playing' && (
              <div className="text-center flex flex-col items-center justify-center h-full w-full px-4">
                {/* Instruction */}
                <div style={{
                  fontSize: isFullscreen ? 'clamp(1.2rem, 2vw, 2rem)' : 'clamp(0.9rem, 3.5vw, 1.3rem)', 
                  height: isFullscreen ? '36px' : '24px', 
                  marginBottom: isFullscreen ? 'clamp(20px, 3vw, 40px)' : 'clamp(15px, 2.5vw, 25px)', 
                  letterSpacing: '2px', 
                  userSelect: 'none', 
                  color: textColor, 
                  fontWeight: 'bold'
                }}>
                  {instruction}
                </div>
                
                {/* Circle Container */}
                <div style={{
                  position: 'relative', 
                  width: isFullscreen ? 'min(280px, 55vw, 55vh)' : 'min(180px, 40vw, 40vh)', 
                  height: isFullscreen ? 'min(280px, 55vw, 55vh)' : 'min(180px, 40vw, 40vh)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  margin: 'auto'
                }}>
                  {/* Outer Glow */}
                  <div style={{
                    position: 'absolute', 
                    width: '100%', 
                    height: '100%', 
                    borderRadius: '50%', 
                    background: 'radial-gradient(circle, ' + gradientGlow + ' 0%, transparent 70%)'
                  }}/>
                  
                  {/* Pacer Circle */}
                  <div 
                    ref={pacerRef} 
                    style={{
                      width: isFullscreen ? 'min(100px, 18vw)' : 'min(70px, 16vw)', 
                      height: isFullscreen ? 'min(100px, 18vw)' : 'min(70px, 16vw)', 
                      background: textColor, 
                      borderRadius: '50%', 
                      boxShadow: '0 0 40px ' + circleGlow
                    }}
                  />
                </div>
                
                {/* Timer */}
                <div style={{
                  marginTop: isFullscreen ? 'clamp(20px, 3vw, 50px)' : 'clamp(15px, 2.5vw, 30px)', 
                  fontSize: isFullscreen ? 'clamp(1.2rem, 2.5vw, 2rem)' : 'clamp(1rem, 4vw, 1.5rem)', 
                  letterSpacing: '2px', 
                  userSelect: 'none', 
                  color: textColor
                }}>
                  {formatTime(timeLeft)}
                </div>
                
                {/* End Session Button */}
                <button 
                  onClick={() => {
                    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
                    if (inhaleTimeoutRef.current) clearTimeout(inhaleTimeoutRef.current);
                    if (exhaleTimeoutRef.current) clearTimeout(exhaleTimeoutRef.current);
                    isActiveRef.current = false;
                    setGameState('gameOver');
                    gameStateRef.current = 'gameOver';
                  }} 
                  className="mt-4 sm:mt-6 px-4 sm:px-6 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm transition-all hover:border-red-500 hover:text-red-500" 
                  style={{
                    background: 'transparent',
                    border: '1px solid ' + (isBoxDarkMode ? '#333' : '#ddd'),
                    color: isBoxDarkMode ? '#666' : '#999'
                  }}
                >
                  End Session
                </button>
              </div>
            )}

            {/* GAME OVER SCREEN */}
            {gameState === 'gameOver' && (
              <div className="absolute inset-0 flex items-center justify-center z-20 px-3 overflow-auto" style={{background: overlayBg}}>
                <div className={'rounded-xl sm:rounded-2xl p-3 sm:p-5 md:p-6 shadow-xl border w-full max-w-[88%] sm:max-w-sm mx-auto my-2 ' + (isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200')}>
                  <div className="flex items-center justify-center gap-2 mb-2 sm:mb-3">
                    <Award className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-500"/>
                    <h2 className={'text-lg sm:text-xl font-bold ' + (isBoxDarkMode ? 'text-white' : 'text-gray-900')}>Complete</h2>
                  </div>
                  <p className={'text-center text-[10px] sm:text-xs mb-3 sm:mb-4 ' + (isBoxDarkMode ? 'text-gray-400' : 'text-gray-500')}>
                    Regular practice improves HRV and reduces stress.
                  </p>
                  <div className="grid grid-cols-2 gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                    <RCard label="Breaths" value={totalBreaths} icon={<Wind className="w-3 h-3 sm:w-3.5 sm:h-3.5"/>} color="cyan" dark={isBoxDarkMode}/>
                    <RCard label="Best" value={bestBreaths} icon={<Trophy className="w-3 h-3 sm:w-3.5 sm:h-3.5"/>} color="yellow" dark={isBoxDarkMode}/>
                    <RCard label="Duration" value="5:00" icon={<Timer className="w-3 h-3 sm:w-3.5 sm:h-3.5"/>} color="blue" dark={isBoxDarkMode}/>
                    <RCard label="Ratio" value="5:6" icon={<TrendingUp className="w-3 h-3 sm:w-3.5 sm:h-3.5"/>} color="purple" dark={isBoxDarkMode}/>
                  </div>
                  <div className="flex gap-2">
                    <Link href="/drills/mental-fitness" className="flex-1">
                      <button className={'w-full px-3 py-1.5 sm:py-2 rounded-lg font-semibold text-xs sm:text-sm transition-all ' + (isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300')}>
                        Back
                      </button>
                    </Link>
                    <button onClick={startDrill} className="flex-1 px-3 py-1.5 sm:py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] text-xs sm:text-sm">
                      Again
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* DRILL RULES */}
        {!isFullscreen && (
          <footer className="mt-4 sm:mt-6">
            <div className={'rounded-lg sm:rounded-xl border overflow-hidden ' + (isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200')}>
              <div className={'px-3 sm:px-4 py-2 sm:py-3 border-b ' + (isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50')}>
                <div className="flex items-center gap-2">
                  <Info className={'w-3 h-3 sm:w-4 sm:h-4 ' + (isDarkMode ? 'text-cyan-400' : 'text-cyan-600')}/>
                  <h2 className={'font-semibold text-sm sm:text-base ' + (isDarkMode ? 'text-white' : 'text-gray-900')}>Coherence Breathing Protocol</h2>
                </div>
              </div>
              <div className="p-3 sm:p-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex items-start gap-1 sm:gap-2">
                      <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-cyan-500 flex items-center justify-center text-white text-[10px] sm:text-xs font-bold flex-shrink-0 mt-0.5">1</div>
                      <p className={'text-[10px] sm:text-xs ' + (isDarkMode ? 'text-gray-300' : 'text-gray-600')}><span className="font-semibold text-cyan-500">INHALE (5s)</span> - Circle expands</p>
                    </div>
                    <div className="flex items-start gap-1 sm:gap-2">
                      <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-[10px] sm:text-xs font-bold flex-shrink-0 mt-0.5">2</div>
                      <p className={'text-[10px] sm:text-xs ' + (isDarkMode ? 'text-gray-300' : 'text-gray-600')}><span className="font-semibold text-blue-500">EXHALE (6s)</span> - Circle contracts</p>
                    </div>
                  </div>
                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex items-start gap-1 sm:gap-2">
                      <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-[10px] sm:text-xs font-bold flex-shrink-0 mt-0.5">3</div>
                      <p className={'text-[10px] sm:text-xs ' + (isDarkMode ? 'text-gray-300' : 'text-gray-600')}><span className="font-semibold text-green-500">Audio</span> - 523Hz/392Hz tones</p>
                    </div>
                    <div className="flex items-start gap-1 sm:gap-2">
                      <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-[10px] sm:text-xs font-bold flex-shrink-0 mt-0.5">4</div>
                      <p className={'text-[10px] sm:text-xs ' + (isDarkMode ? 'text-gray-300' : 'text-gray-600')}><span className="font-semibold text-purple-500">5 min</span> - Complete full session</p>
                    </div>
                  </div>
                </div>
                <div className={'mt-3 sm:mt-4 pt-2 sm:pt-3 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 sm:gap-2 text-[10px] sm:text-xs ' + (isDarkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500')}>
                  <span>Heart rate variability and vagal tone</span>
                  <span>Audio guided • Free forever</span>
                </div>
              </div>
            </div>
          </footer>
        )}

        {/* ABOUT THIS DRILL */}
        {!isFullscreen && (
          <section className="mt-6 sm:mt-8">
            <div className={'rounded-xl border overflow-hidden ' + (isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200')}>
              <div className={'px-4 py-3 border-b ' + (isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50')}>
                <div className="flex items-center gap-2">
                  <GraduationCap className={'w-5 h-5 ' + (isDarkMode ? 'text-cyan-400' : 'text-cyan-600')}/>
                  <h2 className={'font-semibold ' + (isDarkMode ? 'text-white' : 'text-gray-900')}>About This Free Coherence Breathing Drill</h2>
                </div>
              </div>
              <div className="p-5">
                <p className={'text-sm leading-relaxed mb-5 ' + (isDarkMode ? 'text-gray-300' : 'text-gray-600')}>
                  This free coherence breathing drill uses the scientifically-proven 5:6 breath ratio to optimize heart rate variability (HRV). Inhale for 5 seconds as the visual pacer expands, exhale for 6 seconds as it contracts. Audio tones at 523Hz and 392Hz guide your breathing rhythm.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
                  <div className={'p-4 rounded-xl border ' + (isDarkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-cyan-50 border-cyan-100')}>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-cyan-500 flex items-center justify-center"><Wind className="w-4 h-4 text-white" /></div>
                      <h3 className={'text-sm font-semibold ' + (isDarkMode ? 'text-white' : 'text-gray-900')}>Who It's For</h3>
                    </div>
                    <p className={'text-xs leading-relaxed ' + (isDarkMode ? 'text-gray-400' : 'text-gray-500')}>Anyone seeking stress reduction, better emotional regulation, improved sleep, and enhanced HRV.</p>
                  </div>
                  <div className={'p-4 rounded-xl border ' + (isDarkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-green-50 border-green-100')}>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-green-500 flex items-center justify-center"><TrendingUp className="w-4 h-4 text-white" /></div>
                      <h3 className={'text-sm font-semibold ' + (isDarkMode ? 'text-white' : 'text-gray-900')}>Benefits</h3>
                    </div>
                    <p className={'text-xs leading-relaxed ' + (isDarkMode ? 'text-gray-400' : 'text-gray-500')}>Improves HRV, vagal tone, stress resilience, and emotional regulation.</p>
                  </div>
                  <div className={'p-4 rounded-xl border ' + (isDarkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-purple-50 border-purple-100')}>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-purple-500 flex items-center justify-center"><BarChart3 className="w-4 h-4 text-white" /></div>
                      <h3 className={'text-sm font-semibold ' + (isDarkMode ? 'text-white' : 'text-gray-900')}>What You'll Track</h3>
                    </div>
                    <p className={'text-xs leading-relaxed ' + (isDarkMode ? 'text-gray-400' : 'text-gray-500')}>Total breaths, session duration, breath ratio, and best performance.</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className={'p-4 rounded-xl border ' + (isDarkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-yellow-50 border-yellow-100')}>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-yellow-500 flex items-center justify-center"><Lightbulb className="w-4 h-4 text-white" /></div>
                      <h3 className={'text-sm font-semibold ' + (isDarkMode ? 'text-white' : 'text-gray-900')}>Why Practice?</h3>
                    </div>
                    <ul className={'text-xs space-y-2 ' + (isDarkMode ? 'text-gray-400' : 'text-gray-600')}>
                      <li className="flex items-start gap-2"><CheckCircle2 className="w-3 h-3 text-yellow-500 mt-0.5 flex-shrink-0" /> Optimizes heart rate variability</li>
                      <li className="flex items-start gap-2"><CheckCircle2 className="w-3 h-3 text-yellow-500 mt-0.5 flex-shrink-0" /> Activates parasympathetic system</li>
                      <li className="flex items-start gap-2"><CheckCircle2 className="w-3 h-3 text-yellow-500 mt-0.5 flex-shrink-0" /> Reduces cortisol and stress</li>
                    </ul>
                  </div>
                  <div className={'p-4 rounded-xl border ' + (isDarkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-amber-50 border-amber-100')}>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center"><Clock className="w-4 h-4 text-white" /></div>
                      <h3 className={'text-sm font-semibold ' + (isDarkMode ? 'text-white' : 'text-gray-900')}>How to Practice</h3>
                    </div>
                    <ol className={'text-xs space-y-2 ' + (isDarkMode ? 'text-gray-400' : 'text-gray-600')}>
                      <li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-amber-500 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">1</span> Sit comfortably with spine straight</li>
                      <li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-amber-500 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">2</span> Follow the expanding/contracting circle</li>
                      <li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-amber-500 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">3</span> Practice daily for best results</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* RELATED DRILLS */}
        {!isFullscreen && (
          <section className="mt-6 sm:mt-8">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-6 rounded-full bg-gradient-to-b from-cyan-500 to-blue-600"></div>
              <h2 className={'text-xl font-bold ' + (isDarkMode ? 'text-white' : 'text-gray-900')}>Explore Related Free Drills</h2>
              <span className={'text-xs px-2 py-0.5 rounded-full ' + (isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500')}>4 drills</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link href="/drills/mental-fitness/breathing-exercises/4-7-8" className={'group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ' + (isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-blue-500' : 'bg-white border-gray-200 hover:border-blue-300')}>
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-500"></div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center"><Wind className="w-4 h-4 text-blue-600" /></div>
                    <span className={'text-xs px-2 py-0.5 rounded-full font-medium ' + (isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500')}>Breathing</span>
                  </div>
                  <h3 className={'font-semibold text-sm mb-1 ' + (isDarkMode ? 'text-white group-hover:text-blue-400' : 'text-gray-900 group-hover:text-blue-600') + ' transition-colors'}>4-7-8 Breathing</h3>
                  <p className={'text-xs leading-relaxed ' + (isDarkMode ? 'text-gray-500' : 'text-gray-400')}>Deep relaxation for sleep and anxiety.</p>
                  <div className="flex items-center gap-1 mt-3 text-blue-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Start Drill <ArrowRight className="w-3 h-3" /></div>
                </div>
              </Link>
              <Link href="/drills/mental-fitness/breathing-exercises/box-breathing" className={'group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ' + (isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-teal-500' : 'bg-white border-gray-200 hover:border-teal-300')}>
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 to-green-500"></div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center"><Brain className="w-4 h-4 text-teal-600" /></div>
                    <span className={'text-xs px-2 py-0.5 rounded-full font-medium ' + (isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500')}>Breathing</span>
                  </div>
                  <h3 className={'font-semibold text-sm mb-1 ' + (isDarkMode ? 'text-white group-hover:text-teal-400' : 'text-gray-900 group-hover:text-teal-600') + ' transition-colors'}>Box Breathing</h3>
                  <p className={'text-xs leading-relaxed ' + (isDarkMode ? 'text-gray-500' : 'text-gray-400')}>Navy SEAL technique for focus and calm.</p>
                  <div className="flex items-center gap-1 mt-3 text-teal-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Start Drill <ArrowRight className="w-3 h-3" /></div>
                </div>
              </Link>
              <Link href="/drills/mental-fitness/breathing-exercises/wim-hof" className={'group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ' + (isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-orange-500' : 'bg-white border-gray-200 hover:border-orange-300')}>
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-red-500"></div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center"><Zap className="w-4 h-4 text-orange-600" /></div>
                    <span className={'text-xs px-2 py-0.5 rounded-full font-medium ' + (isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500')}>Breathing</span>
                  </div>
                  <h3 className={'font-semibold text-sm mb-1 ' + (isDarkMode ? 'text-white group-hover:text-orange-400' : 'text-gray-900 group-hover:text-orange-600') + ' transition-colors'}>Wim Hof Method</h3>
                  <p className={'text-xs leading-relaxed ' + (isDarkMode ? 'text-gray-500' : 'text-gray-400')}>Energizing breathwork for vitality.</p>
                  <div className="flex items-center gap-1 mt-3 text-orange-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Start Drill <ArrowRight className="w-3 h-3" /></div>
                </div>
              </Link>
              <Link href="/drills/mental-fitness/stress-control/calm-under-pressure" className={'group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ' + (isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-purple-500' : 'bg-white border-gray-200 hover:border-purple-300')}>
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-violet-500"></div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center"><Heart className="w-4 h-4 text-purple-600" /></div>
                    <span className={'text-xs px-2 py-0.5 rounded-full font-medium ' + (isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500')}>Stress Control</span>
                  </div>
                  <h3 className={'font-semibold text-sm mb-1 ' + (isDarkMode ? 'text-white group-hover:text-purple-400' : 'text-gray-900 group-hover:text-purple-600') + ' transition-colors'}>Calm Under Pressure</h3>
                  <p className={'text-xs leading-relaxed ' + (isDarkMode ? 'text-gray-500' : 'text-gray-400')}>Train composure in stressful scenarios.</p>
                  <div className="flex items-center gap-1 mt-3 text-purple-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Start Drill <ArrowRight className="w-3 h-3" /></div>
                </div>
              </Link>
            </div>
          </section>
        )}

        {/* GLOBAL FOOTER */}
        {!isFullscreen && (
          <footer className="mt-8 sm:mt-12 bg-gray-900 text-gray-400 rounded-xl py-6 sm:py-10 px-4 sm:px-6" role="contentinfo">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 mb-6 sm:mb-8">
                <div>
                  <h3 className="text-white font-semibold mb-3 text-sm">FPS Training</h3>
                  <ul className="space-y-2 text-xs sm:text-sm">
                    <li><Link href="/drills/fps/flick-shot-training" className="hover:text-white transition-colors">Flick Shot Trainer</Link></li>
                    <li><Link href="/drills/fps" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">All 21 FPS →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-3 text-sm">Cognitive</h3>
                  <ul className="space-y-2 text-xs sm:text-sm">
                    <li><Link href="/drills/cognitive/memory/card-matching" className="hover:text-white transition-colors">Memory Games</Link></li>
                    <li><Link href="/drills/cognitive" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">All 16 Cognitive →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-3 text-sm">Mental Fitness</h3>
                  <ul className="space-y-2 text-xs sm:text-sm">
                    <li><Link href="/drills/mental-fitness/breathing-exercises/box-breathing" className="hover:text-white transition-colors">Box Breathing</Link></li>
                    <li><Link href="/drills/mental-fitness" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">All 6 Mental →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-3 text-sm">Visual & Motor</h3>
                  <ul className="space-y-2 text-xs sm:text-sm">
                    <li><Link href="/drills/visual/reaction-speed/light-reaction" className="hover:text-white transition-colors">Reaction Time Test</Link></li>
                    <li><Link href="/drills/visual" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">All 14 Visual →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-3 text-sm">More</h3>
                  <ul className="space-y-2 text-xs sm:text-sm">
                    <li><Link href="/drills/memory" className="hover:text-white transition-colors">Memory (15)</Link></li>
                    <li><Link href="/drills/productivity" className="hover:text-white transition-colors">Productivity (10)</Link></li>
                  </ul>
                </div>
              </div>
              <div className="border-t border-gray-800 pt-6 sm:pt-8 text-center">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                    <Target className="w-5 h-5 text-white" aria-hidden="true" />
                  </div>
                  <span className="text-white font-bold text-lg">SkillDrills</span>
                </div>
                <p className="text-xs sm:text-sm mb-2">&copy; 2026 SkillDrills. All rights reserved.</p>
                <p className="text-[10px] sm:text-xs max-w-2xl mx-auto leading-relaxed mb-6">
                  Free online coherence breathing drill with 5:6 breath ratio for HRV biofeedback training. 5 minute guided session. No registration required. More free drills at skilldrills.online.
                </p>
                <div className="flex items-center justify-center gap-4 sm:gap-5 flex-wrap">
                  <button onClick={sharePage} className="text-gray-500 hover:text-white transition-colors" title="Share">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/>
                    </svg>
                  </button>
                  <button onClick={copyPageLink} className="text-gray-500 hover:text-white transition-colors" title="Copy link">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </footer>
        )}
      </div>
    </div>
  );
}

function SCard({ icon, value, label, unit, dark }) {
  return (
    <div className={'rounded-lg sm:rounded-xl shadow-sm border p-2 sm:p-3 text-center flex flex-col justify-center h-full transition-colors ' + (dark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100')}>
      <div className="mb-1 flex justify-center" aria-hidden="true">{icon}</div>
      <p className={'text-sm sm:text-base lg:text-lg font-bold truncate ' + (dark ? 'text-white' : 'text-gray-900')}>{value}{unit || ''}</p>
      <p className={'text-[8px] sm:text-[10px] lg:text-xs truncate ' + (dark ? 'text-gray-400' : 'text-gray-500')}>{label}</p>
    </div>
  );
}

function RCard({ label, value, unit, icon, color, dark }) {
  const colorMap = { 
    cyan: 'bg-cyan-500/10 border-cyan-500/30 text-cyan-500', 
    yellow: 'bg-yellow-500/10 border-yellow-500/30 text-yellow-500', 
    blue: 'bg-blue-500/10 border-blue-500/30 text-blue-500', 
    purple: 'bg-purple-500/10 border-purple-500/30 text-purple-500' 
  };
  const c = colorMap[color] || colorMap.cyan;
  const parts = c.split(' ');
  return (
    <div className={'flex items-center justify-between p-2 sm:p-2.5 rounded-lg border ' + parts[0] + ' ' + parts[1]}>
      <div className="flex items-center gap-1 sm:gap-1.5 min-w-0">
        <div className={parts[2]} aria-hidden="true">{icon}</div>
        <span className={'text-[10px] sm:text-xs truncate ' + (dark ? 'text-gray-300' : 'text-gray-600')}>{label}</span>
      </div>
      <span className={'font-bold text-xs sm:text-sm flex-shrink-0 ml-1 ' + parts[2]}>{value}{unit || ''}</span>
    </div>
  );
}