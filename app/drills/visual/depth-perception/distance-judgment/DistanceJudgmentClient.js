'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  Eye, Zap, Clock, Award, Volume2, VolumeX, Sun, Moon, 
  Target, MoveVertical, ShieldCheck, Activity, Maximize2, Minimize2,
  ArrowLeft, Timer, X, Trophy, Info, TrendingUp, RefreshCw
} from 'lucide-react';

export default function DistanceJudgmentClient() {
  const containerRef = useRef(null);
  
  // Drill State
  const [gameState, setGameState] = useState('start');
  const [targetDepth, setTargetDepth] = useState(50);
  const [currentZ, setCurrentZ] = useState(0);
  const [roundState, setRoundState] = useState('idle');
  
  // Performance Metrics
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [perfectHits, setPerfectHits] = useState(0);
  const [closeHits, setCloseHits] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [accuracy, setAccuracy] = useState(100);
  const [feedbackMsg, setFeedbackMsg] = useState('');
  const [feedbackType, setFeedbackType] = useState('');

  // UI State
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isBoxDarkMode, setIsBoxDarkMode] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  
  const requestRef = useRef();
  const lastTimeRef = useRef();
  const timerIntervalRef = useRef(null);
  const feedbackTimeoutRef = useRef(null);
  const nextTrialTimeoutRef = useRef(null);
  const isActiveRef = useRef(false);
  const gameStateRef = useRef('start');
  const scoreRef = useRef(0);
  const audioCtxRef = useRef(null);

  // Mark as client-side rendered
  useEffect(() => {
    setIsClient(true);
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  // Load best score
  useEffect(() => {
    try {
      const savedBestScore = localStorage.getItem('distanceJudgmentBestScore');
      if (savedBestScore) {
        const parsed = parseFloat(savedBestScore);
        if (!isNaN(parsed)) setBestScore(parsed);
      }
    } catch (e) { /* localStorage not available */ }
  }, []);

  // Update best score ONLY when game ends
  const updateBestScore = useCallback((finalScore) => {
    try {
      const currentBestScore = parseFloat(localStorage.getItem('distanceJudgmentBestScore') || '0');
      if (finalScore > currentBestScore) {
        localStorage.setItem('distanceJudgmentBestScore', finalScore.toString());
        setBestScore(finalScore);
      }
    } catch (e) { /* localStorage not available */ }
  }, []);

  useEffect(() => {
    gameStateRef.current = gameState;
  }, [gameState]);

  const toggleFullscreen = useCallback(async () => {
    try {
      if (!isFullscreen) {
        const element = containerRef.current;
        if (element?.requestFullscreen) {
          await element.requestFullscreen();
          setIsFullscreen(true);
        }
      } else {
        if (document.fullscreenElement) {
          await document.exitFullscreen();
        }
        setIsFullscreen(false);
      }
    } catch (error) {
      console.error('Fullscreen error:', error);
    }
  }, [isFullscreen]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const showFeedback = useCallback((message, type) => {
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    setFeedbackMsg(message);
    setFeedbackType(type);
    feedbackTimeoutRef.current = setTimeout(() => {
      setFeedbackMsg('');
      setFeedbackType('');
    }, 500);
  }, []);

  const initAudio = useCallback(() => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }
      return audioCtxRef.current;
    } catch (e) {
      return null;
    }
  }, []);

  const playSound = useCallback((type) => {
    if (!soundEnabled) return;
    try {
      const audioCtx = initAudio();
      if (!audioCtx) return;
      
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      
      const now = audioCtx.currentTime;
      
      const freqMap = { perfect: 880, close: 660, far: 330, streak: 1046.5, penalty: 220 };
      const gainMap = { perfect: 0.12, close: 0.1, far: 0.1, streak: 0.12, penalty: 0.15 };
      
      osc.frequency.setValueAtTime(freqMap[type] || 440, now);
      gain.gain.setValueAtTime(gainMap[type] || 0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
      osc.start(now);
      osc.stop(now + 0.2);
    } catch (e) { /* Audio not supported */ }
  }, [soundEnabled, initAudio]);

  // Calculate points based on deviation
  const calculatePoints = useCallback((deviation) => {
    if (deviation < 5) return 1.0;
    if (deviation < 15) return 0.5;
    return 0;
  }, []);

  // Timer effect
  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      timerIntervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setGameState('gameOver');
            gameStateRef.current = 'gameOver';
            isActiveRef.current = false;
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
            if (nextTrialTimeoutRef.current) clearTimeout(nextTrialTimeoutRef.current);
            if (timerIntervalRef.current) {
              clearInterval(timerIntervalRef.current);
              timerIntervalRef.current = null;
            }
            updateBestScore(scoreRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
      }
    };
  }, [gameState, timeLeft, updateBestScore]);

  const animateApproach = useCallback((time) => {
    if (!isActiveRef.current) return;
    
    if (lastTimeRef.current !== undefined) {
      const deltaTime = time - lastTimeRef.current;
      const speed = 0.02 + (level * 0.008);
      
      setCurrentZ(prev => {
        const next = prev + speed * deltaTime;
        if (next >= 100) {
          handleAutoFail();
          return 0;
        }
        return next;
      });
    }
    lastTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animateApproach);
  }, [level]);

  const startTrial = useCallback(() => {
    if (!isActiveRef.current) return;
    if (nextTrialTimeoutRef.current) clearTimeout(nextTrialTimeoutRef.current);
    setRoundState('approaching');
    setTargetDepth(25 + Math.random() * 60);
    setCurrentZ(0);
    setFeedbackMsg('');
    lastTimeRef.current = undefined;
    requestRef.current = requestAnimationFrame(animateApproach);
  }, [animateApproach]);

  const handleCapture = useCallback(() => {
    if (!isActiveRef.current || roundState !== 'approaching') return;
    
    if (requestRef.current) {
      cancelAnimationFrame(requestRef.current);
    }
    
    const deviation = Math.abs(currentZ - targetDepth);
    setAttempts(prev => prev + 1);

    const pointsEarned = calculatePoints(deviation);
    scoreRef.current = parseFloat((scoreRef.current + pointsEarned).toFixed(1));
    setScore(scoreRef.current);
    
    if (deviation < 5) {
      setPerfectHits(prev => prev + 1);
      playSound('perfect');
      showFeedback(`✓ PERFECT! +${pointsEarned} point`, 'success');
    } else if (deviation < 15) {
      setCloseHits(prev => prev + 1);
      playSound('close');
      showFeedback(`✓ CLOSE! +${pointsEarned} point`, 'success');
    } else {
      playSound('far');
      showFeedback(`✗ FAR! No points`, 'error');
    }

    setRoundState('results');
    
    const acc = attempts > 0 ? ((perfectHits + closeHits + (deviation < 15 ? 1 : 0)) / (attempts + 1)) * 100 : 100;
    setAccuracy(Math.round(acc));
    
    if (attempts > 0 && (attempts + 1) % 5 === 0) {
      setLevel(prev => prev + 1);
      playSound('streak');
      showFeedback(`⭐ Level ${level + 1}! Speed increased!`, 'success');
    }
    
    nextTrialTimeoutRef.current = setTimeout(() => {
      if (isActiveRef.current && gameStateRef.current === 'playing') {
        startTrial();
      }
    }, 1000);
  }, [roundState, currentZ, targetDepth, calculatePoints, playSound, showFeedback, attempts, perfectHits, closeHits, level, startTrial]);

  const handleAutoFail = useCallback(() => {
    if (!isActiveRef.current) return;
    
    if (requestRef.current) {
      cancelAnimationFrame(requestRef.current);
    }
    
    setAttempts(prev => prev + 1);
    
    playSound('far');
    showFeedback(`⏰ TIMEOUT! 0 points`, 'error');
    
    setRoundState('results');
    
    const acc = attempts > 0 ? ((perfectHits + closeHits) / (attempts + 1)) * 100 : 100;
    setAccuracy(Math.round(acc));
    
    nextTrialTimeoutRef.current = setTimeout(() => {
      if (isActiveRef.current && gameStateRef.current === 'playing') {
        startTrial();
      }
    }, 1000);
  }, [playSound, showFeedback, attempts, perfectHits, closeHits, startTrial]);

  // Assign handleAutoFail to animateApproach via ref
  const handleAutoFailRef = useRef(handleAutoFail);
  useEffect(() => {
    handleAutoFailRef.current = handleAutoFail;
  }, [handleAutoFail]);

  const startGame = useCallback(() => {
    setGameState('playing');
    gameStateRef.current = 'playing';
    setScore(0);
    setAttempts(0);
    setLevel(1);
    setPerfectHits(0);
    setCloseHits(0);
    setTimeLeft(60);
    setAccuracy(100);
    setFeedbackMsg('');
    
    isActiveRef.current = true;
    scoreRef.current = 0;
    setRoundState('idle');
    
    startTrial();
  }, [startTrial]);

  const resetGame = useCallback(() => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    isActiveRef.current = false;
    if (requestRef.current) cancelAnimationFrame(requestRef.current);
    if (nextTrialTimeoutRef.current) clearTimeout(nextTrialTimeoutRef.current);
    setGameState('start');
    gameStateRef.current = 'start';
    setRoundState('idle');
    setScore(0);
    setAttempts(0);
    setLevel(1);
    setPerfectHits(0);
    setCloseHits(0);
    setTimeLeft(60);
    setAccuracy(100);
    scoreRef.current = 0;
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      if (nextTrialTimeoutRef.current) clearTimeout(nextTrialTimeoutRef.current);
    };
  }, []);

  if (loading || !isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-rose-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading distance judgment drill...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen select-none ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* SEO Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Distance Judgment Lab",
            "url": "https://skilldrills.online/drills/visual/depth-perception/distance-judgment",
            "description": "Depth perception training drill. Intercept a moving sphere at the target depth with Perfect (<5%), Close (<15%), and Far (≥15%) accuracy ratings. 60-second challenge with auto-leveling and score tracking.",
            "applicationCategory": "EducationalApplication",
            "operatingSystem": "Web",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "author": {
              "@type": "Organization",
              "name": "Global Drill System"
            },
            "educationalUse": ["Depth Perception", "Spatial Awareness", "Visual Training", "Cognitive Assessment"],
            "learningResourceType": "Interactive Exercise",
            "timeRequired": "PT60S",
            "interactivityType": "active",
            "inLanguage": "en-US",
            "teaches": ["Depth Judgment", "Spatial Estimation", "Visual Processing", "Distance Perception"]
          })
        }}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-4">
          <ol className="flex flex-wrap items-center gap-2 text-sm">
            <li>
              <Link href="/" className={`hover:underline transition-colors ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>
                Home
              </Link>
            </li>
            <li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} aria-hidden="true">/</li>
            <li>
              <Link href="/drills/visual" className={`hover:underline transition-colors ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>
                Visual Drills
              </Link>
            </li>
            <li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} aria-hidden="true">/</li>
            <li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
              Depth Perception
            </li>
            <li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} aria-hidden="true">/</li>
            <li className={`font-medium ${isDarkMode ? 'text-rose-400' : 'text-rose-600'}`} aria-current="page">
              Distance Judgment Lab
            </li>
          </ol>
        </nav>
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-r from-rose-500 to-pink-600 rounded-xl flex-shrink-0">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className={`text-2xl sm:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Distance Judgment Lab
              </h1>
              <p className={`text-sm sm:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Depth interception • 60 second challenge • Auto-leveling speed
              </p>
            </div>
          </div>
          
          <div className="flex gap-2 flex-shrink-0">
            {gameState === 'playing' && (
              <button 
                onClick={resetGame} 
                className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-100'}`} 
                title="Reset session"
                aria-label="Reset drill session"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
            )}
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)} 
              className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`}
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              title={isDarkMode ? 'Light mode' : 'Dark mode'}
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button 
              onClick={() => setIsBoxDarkMode(!isBoxDarkMode)} 
              className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`}
              aria-label="Toggle drill area theme"
              title="Toggle drill area theme"
            >
              <Eye className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setSoundEnabled(!soundEnabled)} 
              className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`}
              aria-label={soundEnabled ? 'Mute sounds' : 'Enable sounds'}
              title={soundEnabled ? 'Mute' : 'Unmute'}
            >
              {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            </button>
            <button 
              onClick={toggleFullscreen} 
              className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`}
              aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
              title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
            >
              {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* SEO Content */}
        <section className="sr-only" aria-label="Drill description for search engines">
          <h2>Distance Judgment Lab - Depth Perception & Spatial Awareness Training</h2>
          <p>
            Train your depth perception and spatial judgment by intercepting a moving sphere at the target depth.
            Perfect accuracy (less than 5% error) scores 1 point, Close (less than 15% error) scores 0.5 points,
            and Far (15% or more error) scores 0 points. Speed auto-levels every 5 trials. 
            60-second challenge with automatic trial progression.
            Sphere color and blur provide real-time visual feedback on alignment accuracy.
          </p>
        </section>

        {/* Stats Board */}
        <div className="grid grid-cols-5 gap-3 mb-4 h-[88px]">
          <StatCard icon={<Target className="text-blue-600" />} value={score.toFixed(1)} label="Score" isDark={isDarkMode} />
          <StatCard icon={<Trophy className="text-yellow-500" />} value={bestScore.toFixed(1)} label="Best" isDark={isDarkMode} />
          <StatCard icon={<Timer className={timeLeft < 15 ? 'text-red-600' : 'text-green-600'} />} value={timeLeft} label="Time" unit="s" isDark={isDarkMode} />
          <StatCard icon={<TrendingUp className="text-purple-500" />} value={level} label="Level" isDark={isDarkMode} />
          <StatCard icon={<Award className="text-green-500" />} value={perfectHits} label="Perfect" isDark={isDarkMode} />
        </div>

        {/* Feedback Bar */}
        <div className="h-10 mb-2 flex justify-center items-center">
          <div 
            className={`px-4 py-1.5 rounded-lg text-white font-semibold text-sm transition-all duration-200 ${
              feedbackMsg ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            } ${
              feedbackType === 'success' ? 'bg-green-500' : feedbackType === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
            }`}
            role="status"
            aria-live="polite"
            aria-atomic="true"
          >
            {feedbackMsg || '\u00A0'}
          </div>
        </div>

        {/* Game Container */}
        <div 
          ref={containerRef}
          className={`relative ${isFullscreen ? 'fixed inset-0 z-50' : 'rounded-xl border-2'}`}
          style={{ 
            background: isBoxDarkMode ? "#020202" : "#ffffff",
            aspectRatio: isFullscreen ? 'auto' : '16/9',
            maxWidth: '100%',
            margin: '0 auto',
            borderColor: isDarkMode ? '#374151' : '#e5e7eb',
            overflow: 'hidden'
          }}
        >
          {/* Fullscreen Controls */}
          {isFullscreen && gameState === 'playing' && (
            <>
              <div className="absolute top-4 right-4 z-20 flex gap-3">
                <button 
                  onClick={resetGame} 
                  className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all" 
                  title="Reset session"
                  aria-label="Reset drill session"
                >
                  <RefreshCw className="w-5 h-5" />
                </button>
                <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all" aria-label="Toggle dark mode">
                  {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
                <button onClick={() => setIsBoxDarkMode(!isBoxDarkMode)} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all" aria-label="Toggle drill area theme">
                  <Eye className="w-5 h-5" />
                </button>
                <button onClick={() => setSoundEnabled(!soundEnabled)} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all" aria-label="Toggle sound">
                  {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                </button>
                <button onClick={toggleFullscreen} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all" aria-label="Exit fullscreen">
                  <Minimize2 className="w-5 h-5" />
                </button>
              </div>
              <div className="absolute top-4 left-4 z-20 bg-black/50 backdrop-blur-sm rounded-lg px-4 py-2 text-white text-sm" aria-live="polite">
                Score: <span className="text-yellow-400 font-bold">{score.toFixed(1)}</span> | Level: <span className="text-purple-400 font-bold">{level}</span>
              </div>
            </>
          )}

          {/* ============ START SCREEN ============ */}
          {gameState === 'start' && (
            <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
              <div className={`rounded-2xl p-6 sm:p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <div className="mb-4">
                  <Target className="w-16 h-16 text-rose-500 mx-auto" aria-hidden="true" />
                </div>
                <h2 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Distance Judgment Lab
                </h2>
                <p className={`mb-2 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  60-second challenge • Intercept at target depth
                </p>
                <p className={`mb-6 text-sm ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Click INTERCEPT when the moving sphere aligns with the dashed target ring. Auto-levels every 5 trials.
                </p>
                <button 
                  onClick={startGame} 
                  className="px-8 py-3 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg w-full transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
                  aria-label="Start distance judgment drill"
                >
                  Start Drill
                </button>
              </div>
            </div>
          )}

          {/* ============ GAME OVER SCREEN ============ */}
          {gameState === 'gameOver' && (
            <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
              <div className={`rounded-2xl p-6 sm:p-8 shadow-xl border w-full max-w-[480px] mx-4 ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Timer className="w-10 h-10 text-orange-500" aria-hidden="true" />
                  <h2 className={`text-2xl font-bold ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Time&apos;s Up!
                  </h2>
                </div>
                
                <p className={`text-center text-sm mb-6 ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Keep practicing to improve your depth perception and spatial judgment accuracy.
                </p>
                
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <ResultCard label="Final Score" value={score.toFixed(1)} icon={<Target className="w-4 h-4" />} color="blue" isDark={isBoxDarkMode} />
                  <ResultCard label="Best Score" value={bestScore.toFixed(1)} icon={<Trophy className="w-4 h-4" />} color="yellow" isDark={isBoxDarkMode} />
                  <ResultCard label="Perfect Hits" value={perfectHits} icon={<Award className="w-4 h-4" />} color="emerald" isDark={isBoxDarkMode} />
                  <ResultCard label="Close Hits" value={closeHits} icon={<Activity className="w-4 h-4" />} color="cyan" isDark={isBoxDarkMode} />
                  <ResultCard label="Max Level" value={level} icon={<TrendingUp className="w-4 h-4" />} color="purple" isDark={isBoxDarkMode} />
                  <ResultCard label="Accuracy" value={accuracy} unit="%" icon={<ShieldCheck className="w-4 h-4" />} color="orange" isDark={isBoxDarkMode} />
                </div>
                
                <div className="flex gap-3">
                  <Link href="/drills/visual" className="flex-1">
                    <button className={`w-full px-4 py-2.5 rounded-lg font-semibold transition-all ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                      ← Back to Drills
                    </button>
                  </Link>
                  <button 
                    onClick={startGame} 
                    className="flex-1 px-4 py-2.5 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
                  >
                    Play Again →
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ============ PLAYING SCREEN ============ */}
          {gameState === 'playing' && (
            <div className="relative h-full w-full flex items-center justify-center">
              {/* Static Depth Goal Ring */}
              <div 
                className="absolute border-[4px] border-dashed rounded-full transition-all duration-300"
                style={{
                  borderColor: isBoxDarkMode ? '#444' : '#ccc',
                  width: `${200 * (1 - targetDepth/100)}px`,
                  height: `${200 * (1 - targetDepth/100)}px`,
                  opacity: 0.6
                }}
                aria-hidden="true"
              />

              {/* Moving Sphere */}
              <div 
                className="rounded-full shadow-2xl transition-colors duration-300"
                style={{
                  width: `${200 * (1 - currentZ/100)}px`,
                  height: `${200 * (1 - currentZ/100)}px`,
                  background: `radial-gradient(circle at 30% 30%, 
                    ${!isActiveRef.current ? '#666' : 
                      (Math.abs(currentZ - targetDepth) < 5 ? '#4ade80' : 
                       Math.abs(currentZ - targetDepth) < 15 ? '#fbbf24' : '#f43f5e')}, 
                    ${!isActiveRef.current ? '#444' : 
                      (Math.abs(currentZ - targetDepth) < 5 ? '#166534' : 
                       Math.abs(currentZ - targetDepth) < 15 ? '#92400e' : '#9f1239')})`,
                  filter: `blur(${Math.abs(currentZ - targetDepth) * 0.1}px)`,
                  transition: 'background 0.2s ease'
                }}
                aria-hidden="true"
              />

              {/* Target Depth Indicator */}
              <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-black/30 backdrop-blur-sm px-4 py-1 rounded-full">
                <span className="text-white text-sm font-medium">Target: {targetDepth.toFixed(0)}%</span>
              </div>

              {/* Intercept Button */}
              {roundState === 'approaching' && (
                <button 
                  onMouseDown={handleCapture}
                  className="absolute bottom-8 w-64 py-4 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-xl font-bold text-xl shadow-lg active:scale-95 transition-all hover:shadow-rose-500/25 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
                  aria-label="Click to intercept the sphere at current depth"
                >
                  INTERCEPT
                </button>
              )}

              {/* Results Overlay */}
              {roundState === 'results' && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm" role="alert">
                  <div className={`text-4xl font-bold mb-2 ${
                    Math.abs(currentZ - targetDepth) < 5 ? 'text-green-400' : 
                    Math.abs(currentZ - targetDepth) < 15 ? 'text-yellow-400' : 'text-red-400'
                  }`}>
                    {Math.abs(currentZ - targetDepth) < 5 ? 'PERFECT!' : 
                     Math.abs(currentZ - targetDepth) < 15 ? 'CLOSE!' : 'FAR!'}
                  </div>
                  <p className="text-white/70 font-medium mb-2">
                    Error: {Math.abs(currentZ - targetDepth).toFixed(2)}%
                  </p>
                  <p className="text-white/50 text-sm">
                    Points: {calculatePoints(Math.abs(currentZ - targetDepth)).toFixed(1)}
                  </p>
                  <p className="text-white/40 text-xs mt-2">
                    Next trial starting...
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Rules Section */}
        {!isFullscreen && (
          <footer className="mt-6" aria-label="Drill rules and scoring information">
            <div className={`rounded-xl border overflow-hidden ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <div className={`px-4 py-3 border-b ${isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'}`}>
                <div className="flex items-center gap-2">
                  <Info className={`w-4 h-4 ${isDarkMode ? 'text-rose-400' : 'text-rose-600'}`} aria-hidden="true" />
                  <h2 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>How Distance Judgment Works</h2>
                </div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">1</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-green-500">PERFECT (&lt;5% error): +1 point</span> • Green sphere
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">2</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-yellow-500">CLOSE (&lt;15% error): +0.5 points</span> • Yellow sphere
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">3</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-red-500">FAR (≥15% error): 0 points</span> • Red sphere
                      </p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">4</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-purple-500">No Lives System</span> • Focus purely on accuracy
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">5</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-blue-500">Auto-levels every 5 trials</span> • Approach speed increases
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-cyan-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">6</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-cyan-500">Auto-advance after 1 second</span> • Sphere blur = misalignment
                      </p>
                    </div>
                  </div>
                </div>
                <div className={`mt-4 pt-3 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs ${isDarkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'}`}>
                  <span>🎯 Target: 25-85% depth • Sphere color & blur indicate alignment</span>
                  <span>⚡ Auto-advance trials • Best Score saves locally</span>
                </div>
              </div>
            </div>
          </footer>
        )}
      </div>
    </div>
  );
}

// ============ HELPER COMPONENTS ============

function StatCard({ icon, value, label, unit = '', isDark }) {
  return (
    <div className={`rounded-xl shadow-sm border p-2 sm:p-3 text-center flex flex-col justify-center h-full transition-colors ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
      <div className="mb-1 flex justify-center" aria-hidden="true">{icon}</div>
      <p className={`text-lg sm:text-xl font-bold truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>{value}{unit}</p>
      <p className={`text-[10px] sm:text-xs truncate ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{label}</p>
    </div>
  );
}

function ResultCard({ label, value, unit = '', icon, color, isDark }) {
  const colorMap = {
    blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-500', icon: 'text-blue-500' },
    yellow: { bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', text: 'text-yellow-500', icon: 'text-yellow-500' },
    green: { bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-500', icon: 'text-green-500' },
    emerald: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-500', icon: 'text-emerald-500' },
    cyan: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', text: 'text-cyan-500', icon: 'text-cyan-500' },
    purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-500', icon: 'text-purple-500' },
    orange: { bg: 'bg-orange-500/10', border: 'border-orange-500/30', text: 'text-orange-500', icon: 'text-orange-500' },
    red: { bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-500', icon: 'text-red-500' },
  };
  
  const colors = colorMap[color] || colorMap.blue;
  
  return (
    <div className={`flex items-center justify-between p-3 rounded-lg border ${colors.bg} ${colors.border}`}>
      <div className="flex items-center gap-2 min-w-0">
        <div className={colors.icon} aria-hidden="true">{icon}</div>
        <span className={`text-xs sm:text-sm truncate ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{label}</span>
      </div>
      <span className={`font-bold text-base sm:text-lg flex-shrink-0 ml-2 ${colors.text}`}>{value}{unit}</span>
    </div>
  );
}