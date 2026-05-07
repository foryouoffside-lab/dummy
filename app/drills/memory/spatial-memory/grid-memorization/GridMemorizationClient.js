'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Target, Zap, Award, Activity, 
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, 
  Eye, Brain, Trophy, Info, Timer, Grid3X3, RefreshCw, SkipForward
} from 'lucide-react';

export default function GridMemorizationClient() {
  const [loading, setLoading] = useState(true);
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
  
  const [gridSize, setGridSize] = useState(4);
  const [litCells, setLitCells] = useState(5);
  const [cellStates, setCellStates] = useState([]);
  const [phase, setPhase] = useState("ready");
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [roundsCompleted, setRoundsCompleted] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [memorizeTime, setMemorizeTime] = useState(5);
  const [userSelections, setUserSelections] = useState(new Set());
  const [isClient, setIsClient] = useState(false);

  const containerRef = useRef(null);
  const timerIntervalRef = useRef(null);
  const memorizeTimerRef = useRef(null);
  const feedbackTimeoutRef = useRef(null);
  const scoreRef = useRef(0);
  const streakRef = useRef(0);
  const gridSizeRef = useRef(4);
  const litCellsRef = useRef(5);
  const correctPatternRef = useRef(new Set());
  const userSelectionsRef = useRef(new Set());
  const audioCtxRef = useRef(null);
  const gameStateRef = useRef('start');
  const phaseRef = useRef('ready');

  // Mark as client-side rendered
  useEffect(() => {
    setIsClient(true);
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  // Sync refs
  useEffect(() => { gameStateRef.current = gameState; }, [gameState]);
  useEffect(() => { phaseRef.current = phase; }, [phase]);

  // Load best scores
  useEffect(() => {
    try {
      const savedBestScore = localStorage.getItem('gridMemorizationBestScore');
      const savedBestStreak = localStorage.getItem('gridMemorizationBestStreak');
      if (savedBestScore) {
        const parsed = parseInt(savedBestScore, 10);
        if (!isNaN(parsed)) setBestScore(parsed);
      }
      if (savedBestStreak) {
        const parsed = parseInt(savedBestStreak, 10);
        if (!isNaN(parsed)) setBestStreak(parsed);
      }
    } catch (e) { /* localStorage not available */ }
  }, []);

  const updateBestScore = useCallback((finalScore) => {
    try {
      const currentBest = parseInt(localStorage.getItem('gridMemorizationBestScore') || '0', 10);
      if (finalScore > currentBest) {
        localStorage.setItem('gridMemorizationBestScore', finalScore.toString());
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

  const playSound = useCallback((type) => {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }
      const osc = audioCtxRef.current.createOscillator();
      const gain = audioCtxRef.current.createGain();
      osc.connect(gain);
      gain.connect(audioCtxRef.current.destination);
      
      const now = audioCtxRef.current.currentTime;
      
      if (type === 'wrong') {
        osc.frequency.setValueAtTime(200, now);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
        osc.start(now);
        osc.stop(now + 0.3);
        return;
      }
      
      const freqMap = { correct: 880, streak: 1046.5, gridUp: 1200, select: 660 };
      osc.frequency.setValueAtTime(freqMap[type] || 660, now);
      gain.gain.setValueAtTime(type === 'select' ? 0.06 : type === 'gridUp' ? 0.15 : type === 'streak' ? 0.12 : 0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
      osc.start(now);
      osc.stop(now + 0.1);
    } catch (e) { /* Audio not supported */ }
  }, [soundEnabled]);

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

  // Memorize countdown
  useEffect(() => {
    if (phase === "memorize" && memorizeTime > 0) {
      memorizeTimerRef.current = setInterval(() => {
        setMemorizeTime(t => t - 1);
      }, 1000);
      return () => {
        if (memorizeTimerRef.current) clearInterval(memorizeTimerRef.current);
      };
    } else if (phase === "memorize" && memorizeTime === 0) {
      startRecall();
    }
  }, [phase, memorizeTime]);

  // 60 second game timer
  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      timerIntervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setGameState('gameOver');
            gameStateRef.current = 'gameOver';
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
  }, [gameState, updateBestScore]);

  const generatePattern = useCallback((size, litCount) => {
    const totalCells = size * size;
    const pattern = new Set();
    
    while (pattern.size < litCount) {
      pattern.add(Math.floor(Math.random() * totalCells));
    }
    
    return pattern;
  }, []);

  const startRecall = useCallback(() => {
    setPhase("recall");
    phaseRef.current = "recall";
    setUserSelections(new Set());
    userSelectionsRef.current = new Set();
  }, []);

  const skipMemorize = useCallback(() => {
    if (memorizeTimerRef.current) clearInterval(memorizeTimerRef.current);
    setMemorizeTime(0);
    startRecall();
  }, [startRecall]);

  const generateRound = useCallback((size, litCount) => {
    const pattern = generatePattern(size, litCount);
    correctPatternRef.current = pattern;
    
    const states = Array(size * size).fill(false);
    pattern.forEach(idx => { states[idx] = true; });
    setCellStates(states);
    
    setGridSize(size);
    setLitCells(litCount);
    setMemorizeTime(5);
    setPhase("memorize");
    phaseRef.current = "memorize";
    setIsProcessing(false);
    setUserSelections(new Set());
    userSelectionsRef.current = new Set();
  }, [generatePattern]);

  const startGame = useCallback(() => {
    setGameState('playing');
    gameStateRef.current = 'playing';
    setScore(0);
    setStreak(0);
    setTimeLeft(60);
    setTotalCorrect(0);
    setTotalAttempts(0);
    setRoundsCompleted(0);
    setFeedback('');
    
    scoreRef.current = 0;
    streakRef.current = 0;
    gridSizeRef.current = 4;
    litCellsRef.current = 5;
    
    generateRound(4, 5);
    showFeedback('60 seconds • Select all lit cells!', 'success');
  }, [generateRound, showFeedback]);

  const advanceRound = useCallback(() => {
    const currentGridSize = gridSizeRef.current;
    const currentLitCells = litCellsRef.current;
    const nextLitCells = currentLitCells + 1;
    
    if (nextLitCells <= 9 && currentGridSize === 4) {
      litCellsRef.current = nextLitCells;
      setTimeout(() => { generateRound(4, nextLitCells); }, 300);
    } else if (currentGridSize === 4) {
      gridSizeRef.current = 5;
      litCellsRef.current = 5;
      playSound('gridUp');
      showFeedback('🎯 5×5 Grid!', 'success');
      setTimeout(() => { generateRound(5, 5); }, 500);
    } else if (nextLitCells <= 9 && currentGridSize === 5) {
      litCellsRef.current = nextLitCells;
      setTimeout(() => { generateRound(5, nextLitCells); }, 300);
    } else {
      generateRound(5, 5);
    }
  }, [generateRound, playSound, showFeedback]);

  const toggleCell = useCallback((index) => {
    if (phaseRef.current !== "recall" || isProcessing) return;
    
    const correctPattern = correctPatternRef.current;
    
    if (!correctPattern.has(index)) {
      setIsProcessing(true);
      
      scoreRef.current = Math.max(0, scoreRef.current - 3);
      setScore(scoreRef.current);
      
      streakRef.current = 0;
      setStreak(0);
      
      setTotalAttempts(prev => prev + 1);
      
      playSound('wrong');
      showFeedback('✗ Wrong cell! -3', 'error');
      
      setPhase("result");
      phaseRef.current = "result";
      
      setTimeout(() => {
        if (gameStateRef.current === 'playing') {
          generateRound(gridSizeRef.current, litCellsRef.current);
        }
      }, 800);
      
      return;
    }
    
    const newSelections = new Set(userSelectionsRef.current);
    
    if (newSelections.has(index)) {
      newSelections.delete(index);
    } else {
      newSelections.add(index);
    }
    
    userSelectionsRef.current = newSelections;
    setUserSelections(newSelections);
    
    playSound('select');
    
    if (newSelections.size === correctPattern.size) {
      let allCorrect = true;
      newSelections.forEach(idx => {
        if (!correctPattern.has(idx)) allCorrect = false;
      });
      
      if (allCorrect) {
        setIsProcessing(true);
        
        setTotalCorrect(prev => prev + 1);
        setTotalAttempts(prev => prev + 1);
        
        scoreRef.current += 3;
        setScore(scoreRef.current);
        
        streakRef.current++;
        setStreak(streakRef.current);
        
        if (streakRef.current > bestStreak) {
          setBestStreak(streakRef.current);
          try {
            localStorage.setItem('gridMemorizationBestStreak', streakRef.current.toString());
          } catch (e) { /* localStorage not available */ }
        }
        
        playSound('correct');
        showFeedback('✓ Perfect! +3', 'success');
        
        setRoundsCompleted(prev => prev + 1);
        
        setTimeout(() => { advanceRound(); }, 400);
      }
    }
  }, [isProcessing, bestStreak, playSound, showFeedback, generateRound, advanceRound]);

  const resetGame = useCallback(() => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (memorizeTimerRef.current) clearInterval(memorizeTimerRef.current);
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    
    setGameState('start');
    gameStateRef.current = 'start';
    setPhase('ready');
    phaseRef.current = 'ready';
    setScore(0);
    setStreak(0);
    setTimeLeft(60);
    setGridSize(4);
    setLitCells(5);
    setTotalCorrect(0);
    setTotalAttempts(0);
    setRoundsCompleted(0);
    setCellStates([]);
    setUserSelections(new Set());
    setFeedback('');
    
    scoreRef.current = 0;
    streakRef.current = 0;
    gridSizeRef.current = 4;
    litCellsRef.current = 5;
    userSelectionsRef.current = new Set();
    correctPatternRef.current = new Set();
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      if (memorizeTimerRef.current) clearInterval(memorizeTimerRef.current);
      if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
      if (audioCtxRef.current) audioCtxRef.current.close();
    };
  }, []);

  if (loading || !isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading grid memorization drill...</p>
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
            "name": "Grid Memorization Drill",
            "url": "https://skilldrills.online/drills/memory/spatial-memory/grid-memorization",
            "description": "Train spatial memory with progressive grid memorization. 4×4 grid (5-9 lit cells) advancing to 5×5. 5-second memorization with instant fail on wrong click. +3 for perfect pattern recall, -3 for wrong cell.",
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
            "educationalUse": ["Spatial Memory", "Visual Pattern Recognition", "Spatial Cognition", "Cognitive Training"],
            "learningResourceType": "Interactive Exercise",
            "timeRequired": "PT60S",
            "interactivityType": "active",
            "inLanguage": "en-US",
            "teaches": ["Spatial Memory", "Pattern Recognition", "Visual-Spatial Recall", "Grid Memorization"]
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
            <li className={`font-medium ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`} aria-current="page">
              Grid Memorization
            </li>
          </ol>
        </nav>
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex-shrink-0">
              <Grid3X3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className={`text-2xl sm:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Grid Memorization
              </h1>
              <p className={`text-sm sm:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Spatial memory • +3 perfect / -3 wrong cell • 5→9 cells • 60s challenge
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
          <h2>Grid Memorization - Spatial Memory & Visual Pattern Training</h2>
          <p>
            Train your spatial memory by memorizing the positions of lit cells on a grid.
            Starts with 4×4 grid (5 lit cells) and progresses to 5×5 grid (5-9 lit cells).
            5-second memorization phase with skip option, then tap all cells that were lit.
            +3 points for perfect recall selecting all correct cells. Clicking any wrong cell
            results in instant fail (-3 points) and shows the correct pattern. 60-second timed challenge.
          </p>
        </section>

        {/* Stats Board */}
        <div className="grid grid-cols-7 gap-3 mb-4 h-[88px]">
          <StatCard icon={<Target className="text-blue-600" />} value={score} label="Score" isDark={isDarkMode} />
          <StatCard icon={<Trophy className="text-yellow-600" />} value={bestScore} label="Best" isDark={isDarkMode} />
          <StatCard icon={<Timer className={timeLeft <= 10 ? 'text-red-600' : 'text-green-600'} />} value={timeLeft} label="Time" unit="s" isDark={isDarkMode} />
          <StatCard icon={<Zap className="text-orange-600" />} value={streak} label="Streak" isDark={isDarkMode} />
          <StatCard icon={<Award className="text-purple-600" />} value={bestStreak} label="Best Streak" isDark={isDarkMode} />
          <StatCard icon={<Grid3X3 className="text-cyan-600" />} value={`${gridSize}×${gridSize}`} label="Grid" isDark={isDarkMode} />
          <StatCard icon={<Activity className="text-emerald-600" />} value={litCells} label="Cells" isDark={isDarkMode} />
        </div>

        {/* Feedback Bar */}
        <div className="h-10 mb-2 flex justify-center items-center">
          <div 
            className={`px-4 py-1.5 rounded-lg text-white font-semibold text-sm transition-all duration-200 ${
              feedback ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            } ${feedbackType === 'success' ? 'bg-green-500' : feedbackType === 'warning' ? 'bg-yellow-500' : 'bg-red-500'}`}
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
            background: isBoxDarkMode ? "#0a0a1a" : "#eef2ff",
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
          )}

          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div className="w-full max-w-lg text-center">
              
              {/* ============ START SCREEN ============ */}
              {gameState === 'start' && (
                <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
                  <div className={`rounded-2xl p-6 sm:p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                    <div className="mb-4">
                      <Grid3X3 className="w-16 h-16 text-indigo-500 mx-auto" aria-hidden="true" />
                    </div>
                    <h2 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      Grid Memorization
                    </h2>
                    <p className={`mb-2 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      60-second challenge • 4×4 → 5×5 grid • 5-9 lit cells
                    </p>
                    <p className={`mb-6 text-sm ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      Memorize lit cell positions for 5 seconds, then tap them. Wrong cell = instant fail (-3). Perfect = +3 & advance.
                    </p>
                    <button 
                      onClick={startGame} 
                      className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg w-full transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      aria-label="Start grid memorization drill"
                    >
                      Start Training
                    </button>
                  </div>
                </div>
              )}

              {/* ============ MEMORIZE PHASE ============ */}
              {gameState === 'playing' && phase === "memorize" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-sm font-bold px-3 py-1 rounded-full ${isBoxDarkMode ? 'bg-indigo-500/20 text-indigo-400' : 'bg-indigo-100 text-indigo-600'}`}>
                      {memorizeTime}s remaining
                    </span>
                    <button 
                      onClick={skipMemorize}
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                        isBoxDarkMode ? 'bg-indigo-500/20 text-indigo-400 hover:bg-indigo-500/30' : 'bg-indigo-100 text-indigo-600 hover:bg-indigo-200'
                      } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                      aria-label="Skip memorization"
                    >
                      <SkipForward className="w-3.5 h-3.5" />
                      Skip
                    </button>
                  </div>
                  <p className={`text-sm ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Memorize the {litCells} lit cells on the {gridSize}×{gridSize} grid:
                  </p>
                  <div 
                    className="grid gap-1.5 mx-auto"
                    style={{ 
                      gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
                      maxWidth: gridSize === 5 ? '400px' : '320px'
                    }}
                    role="grid"
                    aria-label={`${gridSize} by ${gridSize} grid with ${litCells} lit cells`}
                  >
                    {cellStates.map((isLit, i) => (
                      <div
                        key={i}
                        className={`aspect-square rounded-lg transition-all ${
                          isLit 
                            ? 'bg-indigo-500 shadow-lg shadow-indigo-500/30' 
                            : isBoxDarkMode ? 'bg-white/5 border border-white/10' : 'bg-indigo-50 border border-indigo-100'
                        }`}
                        role="gridcell"
                        aria-label={isLit ? 'Lit cell' : 'Empty cell'}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* ============ RECALL PHASE ============ */}
              {gameState === 'playing' && phase === "recall" && (
                <div className="space-y-4">
                  <div className="text-center mb-2">
                    <span className={`text-sm font-bold ${isBoxDarkMode ? 'text-cyan-400' : 'text-cyan-600'}`}>
                      Tap all lit cells • {userSelections.size}/{litCells}
                    </span>
                  </div>
                  <div 
                    className="grid gap-1.5 mx-auto"
                    style={{ 
                      gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
                      maxWidth: gridSize === 5 ? '400px' : '320px'
                    }}
                    role="grid"
                    aria-label={`Select the ${litCells} cells that were lit`}
                  >
                    {Array.from({ length: gridSize * gridSize }, (_, i) => (
                      <button
                        key={i}
                        onClick={() => toggleCell(i)}
                        disabled={isProcessing}
                        className={`aspect-square rounded-lg transition-all hover:scale-105 active:scale-95 disabled:cursor-not-allowed ${
                          userSelections.has(i)
                            ? 'bg-cyan-500 shadow-lg shadow-cyan-500/30' 
                            : isBoxDarkMode ? 'bg-white/10 hover:bg-white/20 border border-white/10' : 'bg-indigo-100 hover:bg-indigo-200 border border-indigo-100'
                        } disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                        aria-label={userSelections.has(i) ? 'Selected cell' : 'Empty cell'}
                        aria-pressed={userSelections.has(i)}
                      />
                    ))}
                  </div>
                  <p className={`text-xs ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Wrong cell = instant fail (-3pts)
                  </p>
                </div>
              )}

              {/* ============ RESULT PHASE (Wrong Answer) ============ */}
              {gameState === 'playing' && phase === "result" && (
                <div className="space-y-4">
                  <p className={`text-sm font-bold ${isBoxDarkMode ? 'text-red-400' : 'text-red-600'}`}>
                    Correct pattern:
                  </p>
                  <div 
                    className="grid gap-1.5 mx-auto"
                    style={{ 
                      gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
                      maxWidth: gridSize === 5 ? '400px' : '320px'
                    }}
                  >
                    {cellStates.map((isLit, i) => (
                      <div
                        key={i}
                        className={`aspect-square rounded-lg ${
                          isLit 
                            ? 'bg-green-500 shadow-lg shadow-green-500/30' 
                            : isBoxDarkMode ? 'bg-white/5' : 'bg-indigo-50'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ============ GAME OVER SCREEN ============ */}
          {gameState === 'gameOver' && (
            <div className="absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40" style={{ background: isBoxDarkMode ? 'rgba(10,10,26,0.95)' : 'rgba(238,242,255,0.95)' }}>
              <div className={`rounded-2xl p-6 sm:p-8 shadow-xl border w-full max-w-[480px] mx-4 ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Timer className="w-10 h-10 text-orange-500" aria-hidden="true" />
                  <h2 className={`text-2xl font-bold ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Time&apos;s Up!
                  </h2>
                </div>
                
                <p className={`text-center text-sm mb-6 ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Keep practicing to improve your spatial memory and pattern recall.
                </p>
                
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <ResultCard label="Final Score" value={score} icon={<Target className="w-4 h-4" />} color="blue" isDark={isBoxDarkMode} />
                  <ResultCard label="Best Score" value={bestScore} icon={<Trophy className="w-4 h-4" />} color="yellow" isDark={isBoxDarkMode} />
                  <ResultCard label="Best Streak" value={bestStreak} icon={<Zap className="w-4 h-4" />} color="orange" isDark={isBoxDarkMode} />
                  <ResultCard label="Peak Grid" value={`${gridSize}×${gridSize}`} icon={<Grid3X3 className="w-4 h-4" />} color="purple" isDark={isBoxDarkMode} />
                  <ResultCard label="Rounds" value={roundsCompleted} icon={<Activity className="w-4 h-4" />} color="emerald" isDark={isBoxDarkMode} />
                  <ResultCard label="Max Cells" value={litCells} icon={<Brain className="w-4 h-4" />} color="cyan" isDark={isBoxDarkMode} />
                </div>
                
                <div className="flex gap-3">
                  <Link href="/drills/memory" className="flex-1">
                    <button className={`w-full px-4 py-2.5 rounded-lg font-semibold transition-all ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                      ← Back to Drills
                    </button>
                  </Link>
                  <button 
                    onClick={startGame} 
                    className="flex-1 px-4 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Play Again →
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Rules Section */}
        {!isFullscreen && (
          <footer className="mt-6" aria-label="Drill rules and scoring information">
            <div className={`rounded-xl border overflow-hidden ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <div className={`px-4 py-3 border-b ${isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'}`}>
                <div className="flex items-center gap-2">
                  <Info className={`w-4 h-4 ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`} aria-hidden="true" />
                  <h2 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Drill Rules & Scoring</h2>
                </div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-indigo-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">1</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Memorize <span className="font-semibold text-indigo-500">all lit cells</span> for 5 seconds (or skip)
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">2</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        All correct cells = <span className="font-semibold text-green-500">+3 points</span> & advance
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">3</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Wrong cell click = <span className="font-semibold text-red-500">-3 points + instant fail</span>
                      </p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-cyan-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">4</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-cyan-500">4×4 grid</span> (5-9 cells) → <span className="font-semibold text-cyan-500">5×5 grid</span> (5-9 cells)
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">5</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Tap to <span className="font-semibold text-purple-500">select/deselect</span> cells before submitting
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">6</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Challenge lasts <span className="font-semibold text-yellow-500">60 seconds</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className={`mt-4 pt-3 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs ${isDarkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'}`}>
                  <span>🔷 Purple = Lit • 🔵 Cyan = Selected • 🟢 Green = Correct</span>
                  <span>🏆 Best Score & Streak save locally</span>
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
    orange: { bg: 'bg-orange-500/10', border: 'border-orange-500/30', text: 'text-orange-500', icon: 'text-orange-500' },
    green: { bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-500', icon: 'text-green-500' },
    emerald: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-500', icon: 'text-emerald-500' },
    purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-500', icon: 'text-purple-500' },
    cyan: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', text: 'text-cyan-500', icon: 'text-cyan-500' },
  };
  
  const colorsObj = colorMap[color] || colorMap.blue;
  
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