'use client';

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { 
  ArrowLeft, Target, Zap, Clock, Award,
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, 
  Eye, Timer, Trophy, Info, Route, TrendingUp, RefreshCw,
  GraduationCap, Lightbulb, BarChart3, CheckCircle2, Star, ArrowRight, Share2, Copy, Heart,
  Brain, Activity
} from "lucide-react";

export default function PathTracingClient() {
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
  const [gameState, setGameState] = useState('start');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isBoxDarkMode, setIsBoxDarkMode] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  
  const [path, setPath] = useState([]);
  const [userPath, setUserPath] = useState([]);
  const [phase, setPhase] = useState("ready");
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [feedback, setFeedback] = useState("");
  const [feedbackType, setFeedbackType] = useState("");
  const [currentDot, setCurrentDot] = useState(null);
  const [resultMessage, setResultMessage] = useState("");
  const [isShowingResult, setIsShowingResult] = useState(false);
  const [wrongDotIndex, setWrongDotIndex] = useState(null);
  const [isClient, setIsClient] = useState(false);
  
  const timerIntervalRef = useRef(null);
  const resultTimerRef = useRef(null);
  const feedbackTimeoutRef = useRef(null);
  const containerRef = useRef(null);
  const audioCtxRef = useRef(null);
  const scoreRef = useRef(0);
  const streakRef = useRef(0);
  const levelRef = useRef(1);
  const gameStateRef = useRef('start');
  const isProcessingRef = useRef(false);
  const animationTimeoutsRef = useRef([]);
  const currentGridSizeRef = useRef(3);
  const phaseRef = useRef('ready');

  useEffect(() => {
    setIsClient(true);
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => { gameStateRef.current = gameState; }, [gameState]);
  useEffect(() => { levelRef.current = level; }, [level]);
  useEffect(() => { phaseRef.current = phase; }, [phase]);

  const getGridSize = useCallback(() => {
    const pathLength = levelRef.current + 3;
    if (pathLength <= 4) return 3;
    if (pathLength <= 6) return 4;
    if (pathLength <= 8) return 5;
    if (pathLength <= 10) return 6;
    return 7;
  }, []);

  const getPathLength = useCallback(() => {
    return levelRef.current + 3;
  }, []);

  useEffect(() => {
    try {
      const savedBestScore = localStorage.getItem('pathTracingBestScore');
      if (savedBestScore) {
        const parsed = parseInt(savedBestScore, 10);
        if (!isNaN(parsed)) setBestScore(parsed);
      }
    } catch (e) {}
  }, []);

  const updateBestScore = useCallback((finalScore) => {
    try {
      const currentBestScore = parseInt(localStorage.getItem('pathTracingBestScore') || '0', 10);
      if (finalScore > currentBestScore) {
        localStorage.setItem('pathTracingBestScore', finalScore.toString());
        setBestScore(finalScore);
      }
    } catch (e) {}
  }, []);

  const showFeedback = useCallback((message, type) => {
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    setFeedback(message);
    setFeedbackType(type);
    feedbackTimeoutRef.current = setTimeout(() => {
      setFeedback('');
      setFeedbackType('');
    }, 800);
  }, []);

  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      timerIntervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setGameState('gameOver');
            gameStateRef.current = 'gameOver';
            clearAnimationTimeouts();
            if (resultTimerRef.current) clearTimeout(resultTimerRef.current);
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
  }, [gameState, updateBestScore]);

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
      const freqMap = { correct: 880, wrong: 440, streak: 1046.5, click: 660, pathDot: 520 };
      
      osc.frequency.setValueAtTime(freqMap[type] || 660, now);
      gain.gain.setValueAtTime(type === 'wrong' ? 0.1 : type === 'streak' ? 0.12 : type === 'click' ? 0.08 : type === 'pathDot' ? 0.06 : 0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
      osc.start(now);
      osc.stop(now + 0.1);
    } catch (e) {}
  }, [soundEnabled, initAudio]);

  const clearAnimationTimeouts = useCallback(() => {
    animationTimeoutsRef.current.forEach(timeout => clearTimeout(timeout));
    animationTimeoutsRef.current = [];
  }, []);

  const getNeighbors = useCallback((index, size) => {
    const row = Math.floor(index / size);
    const col = index % size;
    const neighbors = [];
    if (row > 0) neighbors.push(index - size);
    if (row < size - 1) neighbors.push(index + size);
    if (col > 0) neighbors.push(index - 1);
    if (col < size - 1) neighbors.push(index + 1);
    return neighbors;
  }, []);

  const generatePath = useCallback(() => {
    const gSize = currentGridSizeRef.current;
    const pathLength = getPathLength();
    const totalCells = gSize * gSize;
    const newPath = [];
    
    let current = Math.floor(Math.random() * totalCells);
    newPath.push(current);
    
    for (let i = 1; i < pathLength; i++) {
      const neighbors = getNeighbors(current, gSize);
      const unvisited = neighbors.filter(n => !newPath.includes(n));
      const next = unvisited.length > 0 
        ? unvisited[Math.floor(Math.random() * unvisited.length)]
        : neighbors[Math.floor(Math.random() * neighbors.length)];
      newPath.push(next);
      current = next;
    }
    
    return newPath;
  }, [getPathLength, getNeighbors]);

  const startPathAnimation = useCallback((pathArray) => {
    setPath(pathArray);
    setUserPath([]);
    setCurrentDot(null);
    setResultMessage("");
    setIsShowingResult(false);
    setWrongDotIndex(null);
    setPhase("showing");
    phaseRef.current = "showing";
    isProcessingRef.current = false;
    
    clearAnimationTimeouts();
    
    pathArray.forEach((dot, i) => {
      const timeout = setTimeout(() => {
        setCurrentDot(dot);
        playSound('pathDot');
      }, i * 500);
      animationTimeoutsRef.current.push(timeout);
    });
    
    const finalTimeout = setTimeout(() => {
      setCurrentDot(null);
      setPhase("drawing");
      phaseRef.current = "drawing";
    }, pathArray.length * 500 + 400);
    animationTimeoutsRef.current.push(finalTimeout);
  }, [clearAnimationTimeouts, playSound]);

  const startNewRound = useCallback(() => {
    if (gameStateRef.current !== 'playing') return;
    
    if (resultTimerRef.current) clearTimeout(resultTimerRef.current);
    
    currentGridSizeRef.current = getGridSize();
    
    const newPath = generatePath();
    startPathAnimation(newPath);
  }, [getGridSize, generatePath, startPathAnimation]);

  const handleWrongClick = useCallback((wrongIndex) => {
    isProcessingRef.current = true;
    setIsShowingResult(true);
    setWrongDotIndex(wrongIndex);
    
    scoreRef.current = Math.max(0, scoreRef.current - 2);
    setScore(scoreRef.current);
    
    streakRef.current = 0;
    setStreak(0);
    playSound('wrong');
    showFeedback('✗ Wrong path! -2 points', 'error');
    
    setResultMessage("Wrong path 💪");
    
    resultTimerRef.current = setTimeout(() => {
      if (gameStateRef.current === 'playing') {
        startNewRound();
      }
    }, 1500);
  }, [playSound, showFeedback, startNewRound]);

  const handleDotClick = useCallback((index) => {
    if (phaseRef.current !== "drawing" || isProcessingRef.current || isShowingResult) return;
    if (userPath.includes(index)) return;
    
    const currentIndex = userPath.length;
    const isCorrectDot = path[currentIndex] === index;
    
    if (!isCorrectDot) {
      const newUserPath = [...userPath, index];
      setUserPath(newUserPath);
      playSound('click');
      handleWrongClick(index);
      return;
    }
    
    const newUserPath = [...userPath, index];
    setUserPath(newUserPath);
    playSound('click');
    
    if (newUserPath.length === path.length) {
      isProcessingRef.current = true;
      setIsShowingResult(true);
      
      scoreRef.current += 2;
      setScore(scoreRef.current);
      
      streakRef.current++;
      setStreak(streakRef.current);
      
      if (streakRef.current > bestStreak) {
        setBestStreak(streakRef.current);
      }
      
      playSound('correct');
      
      if (streakRef.current % 5 === 0 && streakRef.current > 0) {
        playSound('streak');
        showFeedback(`🔥 ${streakRef.current} Streak! +2`, 'success');
      } else {
        showFeedback('✓ Perfect! +2 points', 'success');
      }
      
      setResultMessage("Perfect! 🎉");
      levelRef.current += 1;
      setLevel(levelRef.current);
      
      resultTimerRef.current = setTimeout(() => {
        if (gameStateRef.current === 'playing') {
          startNewRound();
        }
      }, 1500);
    }
  }, [userPath, path, isShowingResult, bestStreak, playSound, showFeedback, handleWrongClick, startNewRound]);

  const startDrill = useCallback(() => {
    try {
      if (typeof window !== 'undefined' && !document.fullscreenElement) {
        if (typeof toggleFullscreen === 'function') toggleFullscreen();
      }
    } catch (err) {}

    setGameState('playing');
    gameStateRef.current = 'playing';
    setScore(0);
    setLevel(1);
    setStreak(0);
    setBestStreak(0);
    setTimeLeft(60);
    setFeedback('');
    
    scoreRef.current = 0;
    streakRef.current = 0;
    levelRef.current = 1;
    isProcessingRef.current = false;
    
    currentGridSizeRef.current = getGridSize();
    
    clearAnimationTimeouts();
    if (resultTimerRef.current) clearTimeout(resultTimerRef.current);
    
    startNewRound();
  }, [getGridSize, clearAnimationTimeouts, startNewRound]);

  const resetGame = useCallback(() => {
    clearAnimationTimeouts();
    if (resultTimerRef.current) clearTimeout(resultTimerRef.current);
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    
    setGameState('start');
    gameStateRef.current = 'start';
    setScore(0);
    setLevel(1);
    setStreak(0);
    setBestStreak(0);
    setTimeLeft(60);
    setFeedback('');
    setPhase("ready");
    phaseRef.current = "ready";
    setPath([]);
    setUserPath([]);
    setCurrentDot(null);
    setResultMessage("");
    setIsShowingResult(false);
    setWrongDotIndex(null);
    isProcessingRef.current = false;
  }, [clearAnimationTimeouts]);

  const toggleFullscreen = useCallback(async () => {
    try {
      const element = containerRef.current;
      if (!isFullscreen && element?.requestFullscreen) {
        await element.requestFullscreen();
        setIsFullscreen(true);
      } else if (document.fullscreenElement) {
        await document.exitFullscreen();
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

  const sharePage = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Free Path Tracing Memory Drill | SkillDrills',
          text: 'Train spatial sequence memory by retracing animated dot paths. Free!',
          url: 'https://skilldrills.online/drills/memory/spatial-memory/path-tracing'
        });
      } catch (e) {}
    } else {
      navigator.clipboard.writeText('https://skilldrills.online/drills/memory/spatial-memory/path-tracing');
      alert('Link copied!');
    }
  };

  const copyPageLink = () => {
    navigator.clipboard.writeText('https://skilldrills.online/drills/memory/spatial-memory/path-tracing');
    alert('Link copied!');
  };

  useEffect(() => {
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      clearAnimationTimeouts();
      if (resultTimerRef.current) clearTimeout(resultTimerRef.current);
      if (audioCtxRef.current) audioCtxRef.current.close();
    };
  }, [clearAnimationTimeouts]);

  if (loading || !isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading path tracing drill...</p>
        </div>
      </div>
    );
  }

  const currentGridSize = currentGridSizeRef.current;
  const totalCells = currentGridSize * currentGridSize;

  return (
    <div className={`min-h-screen select-none ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Path Tracing Drill - Spatial Sequence Memory & Route Recall Training",
            "url": "https://skilldrills.online/drills/memory/spatial-memory/path-tracing",
            "description": "Free spatial sequence memory drill with animated dot paths on expanding 3×3 to 7×7 grids. Watch paths animate at 500ms per dot then retrace in exact order. One wrong click ends the round. +2 for perfect recall -2 for wrong. 60-second timed challenge with streak tracking.",
            "applicationCategory": "EducationalApplication",
            "operatingSystem": "All",
            "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD", "availability": "https://schema.org/OnlineOnly" },
            "author": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online" },
            "publisher": { "@type": "Organization", "name": "SkillDrills" },
            "educationalUse": ["Spatial Memory Training", "Sequential Recall", "Route Memory", "Spatial Sequence Practice", "Cognitive Training"],
            "learningResourceType": ["Interactive Exercise", "Memory Drill", "Spatial Training"],
            "timeRequired": "PT60S",
            "interactivityType": "active",
            "inLanguage": "en-US",
            "teaches": ["Spatial Sequence Memory", "Path Recall", "Route Tracing", "Sequential Spatial Memory", "Spatial Working Memory"],
            "educationalLevel": "All Levels",
            "typicalAgeRange": "8-80",
            "datePublished": "2026-05-14",
            "dateModified": new Date().toISOString().split('T')[0],
            "version": "1.0",
            "isAccessibleForFree": true,
            "accessMode": ["visual"],
            "accessModeSufficient": ["visual"]
          })
        }}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!isFullscreen && (
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex flex-wrap items-center gap-2 text-sm">
              <li>
                <Link href="/" className={`hover:underline transition-colors ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>
                  Home
                </Link>
              </li>
              <li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} aria-hidden="true">/</li>
              <li>
                <Link href="/drills/memory" className={`hover:underline transition-colors ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>
                  Memory Drills
                </Link>
              </li>
              <li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} aria-hidden="true">/</li>
              <li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                Spatial Memory
              </li>
              <li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} aria-hidden="true">/</li>
              <li className={`font-medium ${isDarkMode ? 'text-amber-400' : 'text-amber-600'}`} aria-current="page">
                Path Tracing
              </li>
            </ol>
          </nav>
        )}
        
        {!isFullscreen && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl flex-shrink-0">
                <Route className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className={`text-2xl sm:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Path Tracing
                </h1>
                <p className={`text-sm sm:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Free spatial sequence memory drill • +2/-2 scoring • Expanding grid • 60s
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
        )}

        <section className="sr-only" aria-label="Drill description for search engines">
          <h2>Path Tracing - Spatial Sequence Memory Training</h2>
          <p>
            Train your spatial sequence memory by watching animated dot paths and retracing them.
            Progressive difficulty with expanding grids from 3×3 to 7×7.
            Path length = level + 3 dots, animated at 500ms per dot.
            +2 points for retracing the exact path in correct order.
            Clicking any wrong dot immediately ends the round (-2 points).
            Numbered dots show your progress. Correct path revealed in green after mistakes.
            60-second timed challenge with streak bonus every 5 perfect rounds.
          </p>
        </section>

        {!isFullscreen && (
          <div className="grid grid-cols-5 gap-3 mb-4 h-[88px]">
            <StatCard icon={<Target className="text-amber-600" />} value={score} label="Score" isDark={isDarkMode} />
            <StatCard icon={<Trophy className="text-yellow-500" />} value={bestScore} label="Best" isDark={isDarkMode} />
            <StatCard icon={<Timer className={timeLeft < 15 ? 'text-red-600' : 'text-green-600'} />} value={timeLeft} label="Time" unit="s" isDark={isDarkMode} />
            <StatCard icon={<TrendingUp className="text-purple-500" />} value={level} label="Level" isDark={isDarkMode} />
            <StatCard icon={<Zap className="text-orange-500" />} value={`${currentGridSize}×${currentGridSize}`} label="Grid" isDark={isDarkMode} />
          </div>
        )}

        <div className="h-10 mb-2 flex justify-center items-center">
          <div 
            className={`px-4 py-1.5 rounded-lg text-white font-semibold text-sm transition-all duration-200 ${
              feedback ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            } ${feedbackType === 'success' ? 'bg-green-500' : 'bg-red-500'}`}
            role="status"
            aria-live="polite"
            aria-atomic="true"
          >
            {feedback || '\u00A0'}
          </div>
        </div>

        <div 
          ref={containerRef}
          className={`relative ${isFullscreen ? 'fixed inset-0 z-50' : 'rounded-xl border-2'}`}
          style={{ 
            background: isBoxDarkMode ? "#1a1a1a" : "#f0f0f0",
            aspectRatio: isFullscreen ? 'auto' : '16/9',
            maxWidth: '100%',
            margin: '0 auto',
            borderColor: isDarkMode ? '#374151' : '#e5e7eb',
            overflow: 'hidden'
          }}
        >
          {/* Mobile Rotate Device Warning Overlay */}
      {showRotateWarning && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-gray-950/95 text-center p-6" aria-hidden="true">
          <div className="animate-bounce mb-4 text-blue-500">
            <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-white mb-2">{warningMessage}</h3>
          <p className="text-sm text-gray-400">Please use landscape orientation or fullscreen mode for the best training experience.</p>
        </div>
      )}

          {isFullscreen && gameState === 'playing' && (
            <div className="absolute top-4 right-4 z-30 flex gap-3">
              <button onClick={resetGame} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all" title="Reset session" aria-label="Reset drill session">
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
          )}

          <div className="absolute inset-0 flex items-center justify-center p-4 md:p-8">
            
            {gameState === 'start' && (
              <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
                <div className={`rounded-2xl p-6 sm:p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                  <div className="mb-4">
                    <Route className="w-16 h-16 text-amber-500 mx-auto" aria-hidden="true" />
                  </div>
                  <h2 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Path Tracing
                  </h2>
                  <p className={`mb-2 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    60-second challenge • Path length = level + 3 • Expanding grid
                  </p>
                  <p className={`mb-6 text-sm ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Watch the animated path, then retrace it in exact order. One wrong click ends the round. Grid expands as you level up.
                  </p>
                  <button 
                    onClick={startDrill} 
                    className="px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-xl font-semibold hover:shadow-lg w-full transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
                    aria-label="Start path tracing drill"
                  >
                    Start Free Drill
                  </button>
                </div>
              </div>
            )}

            {gameState === 'playing' && (
              <div className="w-full max-w-lg text-center">
                {phase === "showing" && (
                  <div className="space-y-6">
                    <p className={`text-sm font-bold ${isBoxDarkMode ? 'text-amber-400' : 'text-amber-600'}`}>
                      Watch the path • {path.length} dots • Level {level}
                    </p>
                    <div 
                      className="grid gap-2 md:gap-3 mx-auto"
                      style={{ 
                        gridTemplateColumns: `repeat(${currentGridSize}, 1fr)`,
                        maxWidth: '400px',
                        width: '100%'
                      }}
                    >
                      {Array.from({ length: totalCells }, (_, i) => {
                        const dotIndex = path.indexOf(i);
                        const isCurrentDot = currentDot === i;
                        const isPreviousDot = dotIndex !== -1 && dotIndex < path.indexOf(currentDot);
                        
                        return (
                          <div
                            key={`showing-${i}`}
                            className="aspect-square rounded-full transition-all border-2"
                            style={{
                              minWidth: '40px',
                              minHeight: '40px',
                              backgroundColor: isCurrentDot 
                                ? '#fbbf24' 
                                : isPreviousDot 
                                  ? 'rgba(251, 191, 36, 0.3)' 
                                  : isBoxDarkMode ? '#374151' : '#d1d5db',
                              borderColor: isCurrentDot 
                                ? '#f59e0b' 
                                : isPreviousDot 
                                  ? 'rgba(251, 191, 36, 0.5)' 
                                  : isBoxDarkMode ? '#4b5563' : '#9ca3af',
                              transform: isCurrentDot ? 'scale(1.15)' : 'scale(1)',
                              boxShadow: isCurrentDot ? '0 0 15px rgba(251, 191, 36, 0.5)' : 'none'
                            }}
                          />
                        );
                      })}
                    </div>
                    <p className={`text-sm animate-pulse ${isBoxDarkMode ? 'text-amber-400' : 'text-amber-600'}`}>
                      Memorizing path sequence...
                    </p>
                  </div>
                )}

                {phase === "drawing" && (
                  <div className="space-y-6">
                    <p className={`text-sm font-bold ${isBoxDarkMode ? 'text-cyan-400' : 'text-cyan-600'}`}>
                      Retrace the path • {userPath.length}/{path.length}
                    </p>
                    <div 
                      className="grid gap-2 md:gap-3 mx-auto"
                      style={{ 
                        gridTemplateColumns: `repeat(${currentGridSize}, 1fr)`,
                        maxWidth: '400px',
                        width: '100%'
                      }}
                    >
                      {Array.from({ length: totalCells }, (_, i) => {
                        const isClicked = userPath.includes(i);
                        const clickOrder = userPath.indexOf(i);
                        const isCorrect = path[clickOrder] === i;
                        const isWrongClick = wrongDotIndex === i;
                        const isCorrectPath = isShowingResult && path.includes(i) && !isClicked;
                        const correctOrder = isShowingResult ? path.indexOf(i) : -1;
                        
                        let bgColor, borderColor, textContent;
                        
                        if (isWrongClick) {
                          bgColor = '#ef4444';
                          borderColor = '#dc2626';
                          textContent = '✗';
                        } else if (isClicked && isCorrect) {
                          bgColor = '#3b82f6';
                          borderColor = '#2563eb';
                          textContent = clickOrder + 1;
                        } else if (isCorrectPath) {
                          bgColor = 'rgba(34, 197, 94, 0.3)';
                          borderColor = '#22c55e';
                          textContent = correctOrder + 1;
                        } else {
                          bgColor = isBoxDarkMode ? '#374151' : '#d1d5db';
                          borderColor = isBoxDarkMode ? '#4b5563' : '#9ca3af';
                          textContent = '';
                        }
                        
                        const isDisabled = isProcessingRef.current || isClicked;
                        
                        return (
                          <button
                            key={`drawing-${i}`}
                            onClick={() => handleDotClick(i)}
                            disabled={isDisabled}
                            className="aspect-square rounded-full transition-all transform flex items-center justify-center font-bold text-white border-2"
                            style={{
                              minWidth: '40px',
                              minHeight: '40px',
                              backgroundColor: bgColor,
                              borderColor: borderColor,
                              cursor: isDisabled ? 'default' : 'pointer',
                              opacity: isDisabled && !isClicked && !isCorrectPath ? 0.4 : 1
                            }}
                            onMouseEnter={(e) => {
                              if (!isDisabled) {
                                e.currentTarget.style.transform = 'scale(1.1)';
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (!isDisabled) {
                                e.currentTarget.style.transform = 'scale(1)';
                              }
                            }}
                            aria-label={isClicked ? `Dot ${clickOrder + 1}` : 'Empty dot'}
                          >
                            {textContent && <span className="text-sm md:text-base">{textContent}</span>}
                          </button>
                        );
                      })}
                    </div>
                    
                    <div className="h-12 flex items-center justify-center">
                      {isShowingResult && (
                        <p className={`text-xl md:text-2xl font-bold animate-bounce ${
                          resultMessage.includes("Perfect") ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {resultMessage}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {gameState === 'gameOver' && (
              <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
                <div className={`rounded-2xl p-6 md:p-8 shadow-xl border w-[95%] max-w-[480px] ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <Timer className="w-10 h-10 text-orange-500" aria-hidden="true" />
                    <h2 className={`text-2xl font-bold ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      Time&apos;s Up!
                    </h2>
                  </div>
                  
                  <p className={`text-center text-sm mb-6 ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Keep practicing to improve your spatial sequence memory.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <ResultCard label="Final Score" value={score} icon={<Target className="w-4 h-4" />} color="yellow" isDark={isBoxDarkMode} />
                    <ResultCard label="Best Score" value={bestScore} icon={<Trophy className="w-4 h-4" />} color="yellow" isDark={isBoxDarkMode} />
                    <ResultCard label="Highest Level" value={level} icon={<TrendingUp className="w-4 h-4" />} color="purple" isDark={isBoxDarkMode} />
                    <ResultCard label="Best Streak" value={bestStreak} icon={<Zap className="w-4 h-4" />} color="orange" isDark={isBoxDarkMode} />
                    <ResultCard label="Max Path Length" value={level + 3} icon={<Route className="w-4 h-4" />} color="cyan" isDark={isBoxDarkMode} />
                    <ResultCard label="Duration" value="60s" icon={<Timer className="w-4 h-4" />} color="blue" isDark={isBoxDarkMode} />
                  </div>
                  
                  <div className="flex gap-3">
                    <Link href="/drills/memory" className="flex-1">
                      <button className={`w-full px-4 py-2.5 rounded-lg font-semibold transition-all ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                        ← Back to Drills
                      </button>
                    </Link>
                    <button 
                      onClick={resetGame} 
                      className="flex-1 px-4 py-2.5 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
                    >
                      Play Again →
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {!isFullscreen && (
          <footer className="mt-6" aria-label="Drill rules and instructions">
            <div className={`rounded-xl border overflow-hidden ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <div className={`px-4 py-3 border-b ${isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'}`}>
                <div className="flex items-center gap-2">
                  <Info className={`w-4 h-4 ${isDarkMode ? 'text-amber-400' : 'text-amber-600'}`} aria-hidden="true" />
                  <h2 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Drill Rules & Instructions</h2>
                </div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">1</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Watch the <span className="font-semibold text-amber-500">animated path</span> carefully</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">2</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Click dots to <span className="font-semibold text-blue-500">retrace the exact path</span> in order</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">3</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}><span className="font-semibold text-red-500">One wrong click</span> ends the round (-2pts)</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">4</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Perfect path: <span className="font-semibold text-green-500">+2 points</span> & level up</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-cyan-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">5</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Grid: <span className="font-semibold text-cyan-500">3×3 → 7×7</span> • Path: 4→10+ dots</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">6</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Challenge lasts <span className="font-semibold text-yellow-500">60 seconds</span></p>
                    </div>
                  </div>
                </div>
                <div className={`mt-4 pt-3 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs ${isDarkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'}`}>
                  <span>🟡 Yellow = Current dot • 🔵 Blue = Your path • 🟢 Green = Correct (on mistake)</span>
                  <span>🏆 Best Score saves locally</span>
                </div>
              </div>
            </div>
          </footer>
        )}

        {!isFullscreen && (
          <section className="mt-8" aria-label="About this path tracing drill">
            <div className={`rounded-xl border overflow-hidden ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <div className={`px-4 py-3 border-b ${isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'}`}>
                <div className="flex items-center gap-2">
                  <GraduationCap className={`w-5 h-5 ${isDarkMode ? 'text-amber-400' : 'text-amber-600'}`} aria-hidden="true" />
                  <h2 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>About This Free Path Tracing Drill</h2>
                </div>
              </div>
              <div className="p-5">
                <p className={`text-sm leading-relaxed mb-5 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  This free path tracing drill trains spatial sequence memory by challenging you to watch animated dot paths and retrace them in exact order. Starting with 4-dot paths on a 3×3 grid, each dot illuminates at 500ms intervals creating a visual sequence to memorize. You then click dots in the correct order with numbered progress indicators. One wrong click immediately ends the round showing the correct path in green. The progressive difficulty system adds 1 more dot per level and expands the grid from 3×3 to 7×7 as paths grow longer. Perfect for students developing sequential memory, professionals strengthening route planning, gamers improving positional sequence recall, and anyone wanting better spatial working memory and sequential processing.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
                  <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-amber-50 border-amber-100'}`}>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center">
                        <GraduationCap className="w-4 h-4 text-white" />
                      </div>
                      <h3 className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Who It's For</h3>
                    </div>
                    <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      Students developing sequential memory, professionals strengthening route planning, gamers improving positional sequence recall, and anyone wanting better spatial working memory and sequential processing abilities.
                    </p>
                  </div>
                  <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-green-50 border-green-100'}`}>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-green-500 flex items-center justify-center">
                        <TrendingUp className="w-4 h-4 text-white" />
                      </div>
                      <h3 className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Skills Improved</h3>
                    </div>
                    <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      Spatial sequence memory, route recall, sequential spatial processing, path tracing accuracy, spatial working memory capacity, and the ability to encode and reproduce ordered spatial information.
                    </p>
                  </div>
                  <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-purple-50 border-purple-100'}`}>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-purple-500 flex items-center justify-center">
                        <BarChart3 className="w-4 h-4 text-white" />
                      </div>
                      <h3 className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>What You'll Track</h3>
                    </div>
                    <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      Score, level progression, streak count, grid size expansion, path length, numbered dot progress indicators, green correct path reveal on mistakes, and best performance records saved locally.
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-yellow-50 border-yellow-100'}`}>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-yellow-500 flex items-center justify-center">
                        <Lightbulb className="w-4 h-4 text-white" />
                      </div>
                      <h3 className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Why Practice Path Tracing?</h3>
                    </div>
                    <ul className={`text-xs space-y-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3 h-3 text-yellow-500 mt-0.5 flex-shrink-0" />
                        Builds sequential spatial memory essential for navigation and planning
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3 h-3 text-yellow-500 mt-0.5 flex-shrink-0" />
                        Animated dot paths provide engaging visual sequence memorization
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3 h-3 text-yellow-500 mt-0.5 flex-shrink-0" />
                        Instant fail mechanic trains precision and careful decision-making
                      </li>
                    </ul>
                  </div>
                  <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-orange-50 border-orange-100'}`}>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center">
                        <Clock className="w-4 h-4 text-white" />
                      </div>
                      <h3 className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>How to Practice Effectively</h3>
                    </div>
                    <ol className={`text-xs space-y-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      <li className="flex items-start gap-2">
                        <span className="w-5 h-5 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
                        Mentally trace the path with your eyes as each dot illuminates
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-5 h-5 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
                        Create a mental story connecting dot positions for easier recall
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-5 h-5 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
                        Be precise - one wrong click ends the round so verify before tapping
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-5 h-5 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">4</span>
                        Practice 10-15 minutes daily for best spatial sequence memory improvement
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {!isFullscreen && (
          <section className="mt-8" aria-label="Related memory and cognitive drills">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-6 rounded-full bg-gradient-to-b from-amber-500 to-orange-600"></div>
              <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Explore Related Memory Drills</h2>
              <span className={`text-xs px-2 py-0.5 rounded-full ${isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>8 drills</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link href="/drills/memory/spatial-memory/grid-memorization" className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-blue-500' : 'bg-white border-gray-200 hover:border-blue-300'}`}>
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-500"></div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                      <Star className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>Memory</span>
                  </div>
                  <h3 className={`font-semibold text-sm mb-1 ${isDarkMode ? 'text-white group-hover:text-blue-400' : 'text-gray-900 group-hover:text-blue-600'} transition-colors`}>Grid Memorization</h3>
                  <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Memorize lit cell positions on progressive grids with instant fail on wrong clicks.</p>
                  <div className="flex items-center gap-1 mt-3 text-blue-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Start Drill <ArrowRight className="w-3 h-3" /></div>
                </div>
              </Link>
              <Link href="/drills/memory/spatial-memory/object-location" className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-green-500' : 'bg-white border-gray-200 hover:border-green-300'}`}>
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 to-emerald-500"></div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                      <Star className="w-4 h-4 text-green-600" />
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>Memory</span>
                  </div>
                  <h3 className={`font-semibold text-sm mb-1 ${isDarkMode ? 'text-white group-hover:text-green-400' : 'text-gray-900 group-hover:text-green-600'} transition-colors`}>Object Location</h3>
                  <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Remember where emoji objects are placed on expanding grids then locate them.</p>
                  <div className="flex items-center gap-1 mt-3 text-green-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Start Drill <ArrowRight className="w-3 h-3" /></div>
                </div>
              </Link>
              <Link href="/drills/memory/short-term-memory/color-sequence" className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-purple-500' : 'bg-white border-gray-200 hover:border-purple-300'}`}>
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-violet-500"></div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
                      <Star className="w-4 h-4 text-purple-600" />
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>Memory</span>
                  </div>
                  <h3 className={`font-semibold text-sm mb-1 ${isDarkMode ? 'text-white group-hover:text-purple-400' : 'text-gray-900 group-hover:text-purple-600'} transition-colors`}>Color Sequence</h3>
                  <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Watch color sequences then tap colors in order with progressive difficulty.</p>
                  <div className="flex items-center gap-1 mt-3 text-purple-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Start Drill <ArrowRight className="w-3 h-3" /></div>
                </div>
              </Link>
              <Link href="/drills/memory/short-term-memory/digit-span" className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-orange-500' : 'bg-white border-gray-200 hover:border-orange-300'}`}>
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-amber-500"></div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center">
                      <Brain className="w-4 h-4 text-orange-600" />
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>Memory</span>
                  </div>
                  <h3 className={`font-semibold text-sm mb-1 ${isDarkMode ? 'text-white group-hover:text-orange-400' : 'text-gray-900 group-hover:text-orange-600'} transition-colors`}>Digit Span</h3>
                  <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Recall increasingly long digit sequences with infinite progressive levels.</p>
                  <div className="flex items-center gap-1 mt-3 text-orange-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Start Drill <ArrowRight className="w-3 h-3" /></div>
                </div>
              </Link>
              <Link href="/drills/memory/working-memory/n-back" className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-cyan-500' : 'bg-white border-gray-200 hover:border-cyan-300'}`}>
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-teal-500"></div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-cyan-100 flex items-center justify-center">
                      <Brain className="w-4 h-4 text-cyan-600" />
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>Memory</span>
                  </div>
                  <h3 className={`font-semibold text-sm mb-1 ${isDarkMode ? 'text-white group-hover:text-cyan-400' : 'text-gray-900 group-hover:text-cyan-600'} transition-colors`}>Dual N-Back</h3>
                  <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Gold standard working memory training with visual and auditory stimuli combined.</p>
                  <div className="flex items-center gap-1 mt-3 text-cyan-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Start Drill <ArrowRight className="w-3 h-3" /></div>
                </div>
              </Link>
              <Link href="/drills/memory/associative-memory/concept-linking" className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-red-500' : 'bg-white border-gray-200 hover:border-red-300'}`}>
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-rose-500"></div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center">
                      <Heart className="w-4 h-4 text-red-600" />
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>Memory</span>
                  </div>
                  <h3 className={`font-semibold text-sm mb-1 ${isDarkMode ? 'text-white group-hover:text-red-400' : 'text-gray-900 group-hover:text-red-600'} transition-colors`}>Concept Linking</h3>
                  <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Memorize and recall concept chains step by step with adaptive length progression.</p>
                  <div className="flex items-center gap-1 mt-3 text-red-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Start Drill <ArrowRight className="w-3 h-3" /></div>
                </div>
              </Link>
              <Link href="/drills/memory/long-term-memory/paired-associates" className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-teal-500' : 'bg-white border-gray-200 hover:border-teal-300'}`}>
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 to-emerald-500"></div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center">
                      <Heart className="w-4 h-4 text-teal-600" />
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>Memory</span>
                  </div>
                  <h3 className={`font-semibold text-sm mb-1 ${isDarkMode ? 'text-white group-hover:text-teal-400' : 'text-gray-900 group-hover:text-teal-600'} transition-colors`}>Paired Associates</h3>
                  <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Memorize word pairs then select the correct match from 3 options with adaptive rounds.</p>
                  <div className="flex items-center gap-1 mt-3 text-teal-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Start Drill <ArrowRight className="w-3 h-3" /></div>
                </div>
              </Link>
              <Link href="/drills/cognitive/memory/card-matching" className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-indigo-500' : 'bg-white border-gray-200 hover:border-indigo-300'}`}>
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-blue-500"></div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center">
                      <Activity className="w-4 h-4 text-indigo-600" />
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>Cognitive</span>
                  </div>
                  <h3 className={`font-semibold text-sm mb-1 ${isDarkMode ? 'text-white group-hover:text-indigo-400' : 'text-gray-900 group-hover:text-indigo-600'} transition-colors`}>Card Matching</h3>
                  <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Classic memory card game to improve visual memory and concentration skills.</p>
                  <div className="flex items-center gap-1 mt-3 text-indigo-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Start Drill <ArrowRight className="w-3 h-3" /></div>
                </div>
              </Link>
            </div>
          </section>
        )}

        {!isFullscreen && (
          <footer className="mt-12 bg-gray-900 text-gray-400 rounded-xl py-10 px-6" role="contentinfo">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 mb-8">
                <div>
                  <h3 className="text-white font-semibold mb-3 text-sm">Memory Training</h3>
                  <ul className="space-y-2 text-sm">
                    <li><Link href="/drills/memory/spatial-memory/path-tracing" className="hover:text-white transition-colors">Path Tracing</Link></li>
                    <li><Link href="/drills/memory/spatial-memory/grid-memorization" className="hover:text-white transition-colors">Grid Memorization</Link></li>
                    <li><Link href="/drills/memory/spatial-memory/object-location" className="hover:text-white transition-colors">Object Location</Link></li>
                    <li><Link href="/drills/memory" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">All 15 Memory Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-3 text-sm">Cognitive</h3>
                  <ul className="space-y-2 text-sm">
                    <li><Link href="/drills/cognitive/memory/card-matching" className="hover:text-white transition-colors">Memory Games</Link></li>
                    <li><Link href="/drills/cognitive/attention/divided-attention" className="hover:text-white transition-colors">Attention Drills</Link></li>
                    <li><Link href="/drills/cognitive/problem-solving/logic-puzzles" className="hover:text-white transition-colors">Logic Puzzles</Link></li>
                    <li><Link href="/drills/cognitive" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">All 16 Cognitive Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-3 text-sm">Academic</h3>
                  <ul className="space-y-2 text-sm">
                    <li><Link href="/drills/academic/writing-speed/typing-test" className="hover:text-white transition-colors">Typing Speed Test</Link></li>
                    <li><Link href="/drills/academic/reading-speed/speed-reader" className="hover:text-white transition-colors">Speed Reader</Link></li>
                    <li><Link href="/drills/academic/math-speed/mental-math" className="hover:text-white transition-colors">Mental Math</Link></li>
                    <li><Link href="/drills/academic" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">All 12 Academic Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-3 text-sm">FPS & Motor</h3>
                  <ul className="space-y-2 text-sm">
                    <li><Link href="/drills/fps/flick-shot-training" className="hover:text-white transition-colors">Flick Shot Trainer</Link></li>
                    <li><Link href="/drills/motor/hand-eye-coordination/aim-trainer" className="hover:text-white transition-colors">Hand-Eye Coordination</Link></li>
                    <li><Link href="/drills/visual/reaction-speed/light-reaction" className="hover:text-white transition-colors">Reaction Time Test</Link></li>
                    <li><Link href="/drills/fps" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">All 21 FPS Drills →</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-3 text-sm">More Categories</h3>
                  <ul className="space-y-2 text-sm">
                    <li><Link href="/drills/visual" className="hover:text-white transition-colors">Visual (14 drills)</Link></li>
                    <li><Link href="/drills/productivity" className="hover:text-white transition-colors">Productivity (10 drills)</Link></li>
                    <li><Link href="/drills/mental-fitness" className="hover:text-white transition-colors">Mental Fitness (6 drills)</Link></li>
                    <li><Link href="/drills/physical" className="hover:text-white transition-colors">Physical (11 drills)</Link></li>
                  </ul>
                </div>
              </div>
              <div className="border-t border-gray-800 pt-8 text-center">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                    <Brain className="w-5 h-5 text-white" aria-hidden="true" />
                  </div>
                  <span className="text-white font-bold text-lg">SkillDrills</span>
                </div>
                <p className="text-sm mb-2">&copy; 2026 SkillDrills. All rights reserved.</p>
                <p className="text-xs max-w-2xl mx-auto leading-relaxed mb-6">
                  Free online path tracing drill for spatial sequence memory training. Animated dot paths on expanding 3×3 to 7×7 grids with instant fail on wrong clicks. Numbered progress indicators and green correct path reveal. Perfect for students gamers and anyone wanting to improve sequential spatial memory. No registration required. More free memory drills at skilldrills.online.
                </p>
                <div className="flex items-center justify-center gap-5 flex-wrap">
                  <button onClick={sharePage} className="text-gray-500 hover:text-white transition-colors" title="Share this drill" aria-label="Share this free path tracing drill">
                    <Share2 className="w-5 h-5" />
                  </button>
                  <button onClick={copyPageLink} className="text-gray-500 hover:text-white transition-colors" title="Copy link" aria-label="Copy drill link to clipboard">
                    <Copy className="w-5 h-5" />
                  </button>
                  <a href="https://twitter.com/skilldrillss" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors" title="Follow on Twitter X" aria-label="Follow SkillDrills on Twitter X">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  </a>
                  <a href="https://instagram.com/skilldrills.online" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors" title="Follow on Instagram" aria-label="Follow SkillDrills on Instagram">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                  </a>
                  <a href="https://youtube.com/@skilldrills.online" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors" title="Subscribe on YouTube" aria-label="Subscribe to SkillDrills on YouTube">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                  </a>
                  <a href="https://pinterest.com/skilldrills" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors" title="Follow on Pinterest" aria-label="Follow SkillDrills on Pinterest">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/></svg>
                  </a>
                </div>
              </div>
            </div>
          </footer>
        )}
      </div>
    </div>
  );
}

function StatCard({ icon, value, label, unit = '', isDark }) {
  return (
    <div className={`rounded-xl shadow-sm border p-2 sm:p-3 text-center flex flex-col justify-center h-full transition-colors ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
      <div className="mb-1 flex justify-center" aria-hidden="true">{icon}</div>
      <p className={`text-lg md:text-xl font-bold truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>{value}{unit}</p>
      <p className={`text-[10px] sm:text-xs truncate ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{label}</p>
    </div>
  );
}

function ResultCard({ label, value, unit = '', icon, color, isDark }) {
  const colorMap = {
    yellow: { bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', text: 'text-yellow-500', icon: 'text-yellow-500' },
    purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-500', icon: 'text-purple-500' },
    orange: { bg: 'bg-orange-500/10', border: 'border-orange-500/30', text: 'text-orange-500', icon: 'text-orange-500' },
    cyan: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', text: 'text-cyan-500', icon: 'text-cyan-500' },
    blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-500', icon: 'text-blue-500' },
    red: { bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-500', icon: 'text-red-500' },
    emerald: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-500', icon: 'text-emerald-500' },
  };
  
  const colorsObj = colorMap[color] || colorMap.yellow;
  
  return (
    <div className={`flex items-center justify-between p-3 rounded-lg border ${colorsObj.bg} ${colorsObj.border}`}>
      <div className="flex items-center gap-2 min-w-0">
        <div className={colorsObj.icon} aria-hidden="true">{icon}</div>
        <span className={`text-xs sm:text-sm truncate ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{label}</span>
      </div>
      <span className={`font-bold text-base sm:text-lg flex-shrink-0 ml-2 ${colorsObj.text}`}>{value}{unit}</span>
    </div>
  );
}