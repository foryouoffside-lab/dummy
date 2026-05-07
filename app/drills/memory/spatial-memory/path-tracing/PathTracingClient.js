'use client';

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { 
  ArrowLeft, Target, Zap, Clock, Award,
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, 
  Eye, Timer, Trophy, Info, Route, TrendingUp, RefreshCw
} from "lucide-react";

export default function PathTracingClient() {
  const [loading, setLoading] = useState(true);
  const [gameState, setGameState] = useState('start');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
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

  // Mark as client-side rendered
  useEffect(() => {
    setIsClient(true);
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  // Sync refs
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

  // Load best score
  useEffect(() => {
    try {
      const savedBestScore = localStorage.getItem('pathTracingBestScore');
      if (savedBestScore) {
        const parsed = parseInt(savedBestScore, 10);
        if (!isNaN(parsed)) setBestScore(parsed);
      }
    } catch (e) { /* localStorage not available */ }
  }, []);

  const updateBestScore = useCallback((finalScore) => {
    try {
      const currentBestScore = parseInt(localStorage.getItem('pathTracingBestScore') || '0', 10);
      if (finalScore > currentBestScore) {
        localStorage.setItem('pathTracingBestScore', finalScore.toString());
        setBestScore(finalScore);
      }
    } catch (e) { /* localStorage not available */ }
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

  // Timer effect
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
    } catch (e) { /* Audio not supported */ }
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

  // Cleanup on unmount
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
      {/* SEO Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Path Tracing Drill",
            "url": "https://skilldrills.online/drills/memory/spatial-memory/path-tracing",
            "description": "Train spatial sequence memory by watching animated dot paths then retracing them. Progressive 3×3 to 7×7 grid with path length = level + 3. +2 for perfect, -2 for wrong click. 60-second timed challenge.",
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
            "educationalUse": ["Spatial Memory", "Sequential Recall", "Route Memory", "Cognitive Training"],
            "learningResourceType": "Interactive Exercise",
            "timeRequired": "PT60S",
            "interactivityType": "active",
            "inLanguage": "en-US",
            "teaches": ["Spatial Sequence Memory", "Path Recall", "Route Tracing", "Sequential Spatial Memory"]
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
        
        {/* Header */}
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
                Spatial sequence memory • +2/-2 scoring • Expanding grid • 60s
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

        {/* Stats Board */}
        <div className="grid grid-cols-5 gap-3 mb-4 h-[88px]">
          <StatCard icon={<Target className="text-amber-600" />} value={score} label="Score" isDark={isDarkMode} />
          <StatCard icon={<Trophy className="text-yellow-500" />} value={bestScore} label="Best" isDark={isDarkMode} />
          <StatCard icon={<Timer className={timeLeft < 15 ? 'text-red-600' : 'text-green-600'} />} value={timeLeft} label="Time" unit="s" isDark={isDarkMode} />
          <StatCard icon={<TrendingUp className="text-purple-500" />} value={level} label="Level" isDark={isDarkMode} />
          <StatCard icon={<Zap className="text-orange-500" />} value={`${currentGridSize}×${currentGridSize}`} label="Grid" isDark={isDarkMode} />
        </div>

        {/* Feedback Bar */}
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

        {/* Game Container */}
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
          {/* Fullscreen Controls */}
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
            
            {/* ============ START SCREEN ============ */}
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
                    Start Training
                  </button>
                </div>
              </div>
            )}

            {/* ============ PLAYING SCREEN ============ */}
            {gameState === 'playing' && (
              <div className="w-full max-w-lg text-center">
                {/* Showing Phase */}
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

                {/* Drawing Phase */}
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

            {/* ============ GAME OVER SCREEN ============ */}
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

        {/* Rules Section */}
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
      </div>
    </div>
  );
}

// ============ HELPER COMPONENTS ============

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