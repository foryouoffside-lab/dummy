'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Target, Zap, Timer, Trophy, Heart, 
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, Eye,
  BarChart3, Info, Grid, Award, CheckCircle, RefreshCw
} from 'lucide-react';

export default function ConcentrationGridClient() {
  const [gameState, setGameState] = useState('start');
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [timeRemaining, setTimeRemaining] = useState(60);
  const [gridSize, setGridSize] = useState(3);
  const [grid, setGrid] = useState([]);
  const [currentNumber, setCurrentNumber] = useState(1);
  const [foundNumbers, setFoundNumbers] = useState([]);
  const [totalClicks, setTotalClicks] = useState(0);
  const [combo, setCombo] = useState(0);
  const [bestCombo, setBestCombo] = useState(0);
  const [lives, setLives] = useState(3);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isBoxDarkMode, setIsBoxDarkMode] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  
  // Refs for game logic
  const containerRef = useRef(null);
  const scoreRef = useRef(0);
  const comboRef = useRef(0);
  const livesRef = useRef(3);
  const gameStateRef = useRef('start');
  const timerIntervalRef = useRef(null);
  const feedbackTimeoutRef = useRef(null);
  const audioContextRef = useRef(null);
  const clickCooldownRef = useRef(false);

  // Mark as client-side rendered
  useEffect(() => {
    setIsClient(true);
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  // Load best score
  useEffect(() => {
    try {
      const savedBestScore = localStorage.getItem('concentrationGridDrillBestScore');
      if (savedBestScore) {
        const parsed = parseInt(savedBestScore, 10);
        if (!isNaN(parsed)) setBestScore(parsed);
      }
    } catch (e) { /* localStorage not available */ }
  }, []);

  // Sync gameState to ref
  useEffect(() => {
    gameStateRef.current = gameState;
  }, [gameState]);

  // Update best score
  useEffect(() => {
    if (gameState === 'gameOver' && score > bestScore) {
      setBestScore(score);
      try {
        localStorage.setItem('concentrationGridDrillBestScore', score.toString());
      } catch (e) { /* localStorage not available */ }
    }
  }, [gameState, score, bestScore]);

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
      if (audioContextRef.current) audioContextRef.current.close();
    };
  }, []);

  // Toggle fullscreen
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

  // Handle fullscreen change
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const showFeedback = useCallback((message, type) => {
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    setFeedback(message);
    setFeedbackType(type);
    feedbackTimeoutRef.current = setTimeout(() => {
      setFeedback('');
      setFeedbackType('');
    }, 600);
  }, []);

  const initAudio = useCallback(() => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume();
      }
      return audioContextRef.current;
    } catch (e) {
      return null;
    }
  }, []);

  const playSound = useCallback((type) => {
    if (!soundEnabled) return;
    try {
      const ctx = initAudio();
      if (!ctx) return;
      
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.connect(g);
      g.connect(ctx.destination);
      
      const now = ctx.currentTime;
      
      if (type === 'correct') {
        osc.frequency.setValueAtTime(880, now);
        g.gain.setValueAtTime(0.12, now);
        g.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
        osc.start(now);
        osc.stop(now + 0.1);
      } else if (type === 'wrong') {
        osc.frequency.setValueAtTime(440, now);
        g.gain.setValueAtTime(0.1, now);
        g.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
        osc.start(now);
        osc.stop(now + 0.1);
      } else if (type === 'penalty') {
        osc.frequency.setValueAtTime(220, now);
        g.gain.setValueAtTime(0.15, now);
        g.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
        osc.start(now);
        osc.stop(now + 0.15);
      } else if (type === 'complete') {
        osc.frequency.setValueAtTime(660, now);
        g.gain.setValueAtTime(0.15, now);
        osc.frequency.linearRampToValueAtTime(880, now + 0.1);
        osc.frequency.linearRampToValueAtTime(1320, now + 0.2);
        g.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
        osc.start(now);
        osc.stop(now + 0.3);
      } else if (type === 'combo') {
        osc.frequency.setValueAtTime(1046.5, now);
        g.gain.setValueAtTime(0.12, now);
        g.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
        osc.start(now);
        osc.stop(now + 0.15);
      }
    } catch (e) { /* Audio not supported */ }
  }, [soundEnabled, initAudio]);

  // Generate grid with random numbers
  const generateGrid = useCallback((size) => {
    const totalNumbers = size * size;
    const numbers = Array.from({ length: totalNumbers }, (_, i) => i + 1);
    for (let i = numbers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }
    
    const newGrid = [];
    for (let i = 0; i < size; i++) {
      newGrid.push(numbers.slice(i * size, (i + 1) * size));
    }
    return newGrid;
  }, []);

  // Initialize grid
  const initGrid = useCallback(() => {
    const newGrid = generateGrid(gridSize);
    setGrid(newGrid);
    setCurrentNumber(1);
    setFoundNumbers([]);
  }, [gridSize, generateGrid]);

  // Game timer
  useEffect(() => {
    if (gameState !== 'playing') return;
    
    timerIntervalRef.current = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          setGameState('gameOver');
          gameStateRef.current = 'gameOver';
          if (timerIntervalRef.current) {
            clearInterval(timerIntervalRef.current);
            timerIntervalRef.current = null;
          }
          playSound('complete');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
      }
    };
  }, [gameState, playSound]);

  // Initialize grid when game starts
  useEffect(() => {
    if (gameState === 'playing') {
      initGrid();
    }
  }, [gameState, gridSize, initGrid]);

  const handleMiss = useCallback(() => {
    comboRef.current = 0;
    setCombo(0);
    
    if (livesRef.current > 0) {
      livesRef.current -= 1;
      setLives(livesRef.current);
      playSound('wrong');
      showFeedback('✗ Wrong! -1 life', 'error');
    }
    
    if (livesRef.current === 0) {
      scoreRef.current = Math.max(0, scoreRef.current - 5);
      setScore(scoreRef.current);
      playSound('penalty');
      showFeedback('✗ Wrong! -5 points', 'error');
    }
  }, [playSound, showFeedback]);

  const levelComplete = useCallback(() => {
    const completionBonus = 25 * level;
    
    scoreRef.current += completionBonus;
    setScore(scoreRef.current);
    playSound('complete');
    showFeedback(`🎯 Level ${level} Complete! +${completionBonus}`, 'success');
    
    setTimeout(() => {
      if (gridSize < 8) {
        setLevel(prev => prev + 1);
        setGridSize(prev => prev + 1);
        setCurrentNumber(1);
        setFoundNumbers([]);
        setTotalClicks(0);
        comboRef.current = 0;
        setCombo(0);
      } else {
        setGameState('gameOver');
        gameStateRef.current = 'gameOver';
        playSound('complete');
        showFeedback('🏆 All 6 levels mastered!', 'success');
      }
    }, 800);
  }, [level, gridSize, playSound, showFeedback]);

  const handleCellClick = useCallback((row, col, value) => {
    if (gameStateRef.current !== 'playing') return;
    if (clickCooldownRef.current) return;
    if (foundNumbers.includes(value)) return;
    
    clickCooldownRef.current = true;
    setTotalClicks(prev => prev + 1);
    
    if (value === currentNumber) {
      scoreRef.current += 5;
      setScore(scoreRef.current);
      setFoundNumbers(prev => [...prev, value]);
      setCurrentNumber(prev => prev + 1);
      comboRef.current++;
      setCombo(comboRef.current);
      
      if (comboRef.current > bestCombo) {
        setBestCombo(comboRef.current);
      }
      
      if (comboRef.current % 5 === 0) {
        playSound('combo');
        showFeedback(`🔥 ${comboRef.current}x Combo! +5`, 'success');
      } else {
        playSound('correct');
        showFeedback('✓ +5', 'success');
      }
      
      const totalNumbers = gridSize * gridSize;
      if (currentNumber === totalNumbers) {
        levelComplete();
      }
    } else {
      handleMiss();
    }
    
    setTimeout(() => {
      clickCooldownRef.current = false;
    }, 100);
  }, [currentNumber, foundNumbers, gridSize, bestCombo, playSound, showFeedback, levelComplete, handleMiss]);

  const startGame = useCallback(() => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    
    setGameState('playing');
    gameStateRef.current = 'playing';
    setScore(0);
    setLevel(1);
    setGridSize(3);
    setTimeRemaining(60);
    setTotalClicks(0);
    setCombo(0);
    setBestCombo(0);
    setLives(3);
    setCurrentNumber(1);
    setFoundNumbers([]);
    setFeedback('');
    
    scoreRef.current = 0;
    comboRef.current = 0;
    livesRef.current = 3;
    clickCooldownRef.current = false;
    
    playSound('correct');
  }, [playSound]);

  const resetGame = useCallback(() => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    
    setGameState('start');
    gameStateRef.current = 'start';
    setScore(0);
    setLevel(1);
    setGridSize(3);
    setTimeRemaining(60);
    setTotalClicks(0);
    setCombo(0);
    setBestCombo(0);
    setLives(3);
    setCurrentNumber(1);
    setFoundNumbers([]);
    setGrid([]);
    setFeedback('');
    
    scoreRef.current = 0;
    comboRef.current = 0;
    livesRef.current = 3;
    clickCooldownRef.current = false;
  }, []);

  const getCellStyle = useCallback((value) => {
    const isFound = foundNumbers.includes(value);
    
    if (isFound) {
      return isBoxDarkMode 
        ? 'bg-green-900/50 text-green-300 cursor-default opacity-50'
        : 'bg-green-500/50 text-white cursor-default opacity-40';
    }
    
    return isBoxDarkMode
      ? 'bg-gray-700 text-gray-200 hover:bg-gray-600 cursor-pointer'
      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 cursor-pointer';
  }, [foundNumbers, isBoxDarkMode]);

  const getAccuracy = useCallback(() => {
    if (totalClicks === 0) return 100;
    return Math.round((foundNumbers.length / totalClicks) * 100);
  }, [foundNumbers.length, totalClicks]);

  const getCellSize = useCallback(() => {
    const baseSize = 75;
    const minSize = 40;
    return Math.max(minSize, Math.min(baseSize, baseSize - (gridSize - 3) * 6));
  }, [gridSize]);

  if (loading || !isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading concentration grid drill...</p>
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
            "name": "Concentration Grid Drill",
            "url": "https://skilldrills.online/drills/cognitive/focus/concentration-grid",
            "description": "Sequential number search drill on expanding grids from 3×3 to 8×8. Find numbers in order with 3 lives, combo streaks, and level completion bonuses up to +150 points. 60-second timed challenge.",
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
            "educationalUse": ["Concentration Training", "Visual Scanning", "Focus Exercise", "Cognitive Assessment"],
            "learningResourceType": "Interactive Exercise",
            "timeRequired": "PT60S",
            "interactivityType": "active",
            "inLanguage": "en-US",
            "teaches": ["Concentration", "Sequential Processing", "Visual Search", "Sustained Focus"]
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
              <Link href="/drills/cognitive" className={`hover:underline transition-colors ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>
                Cognitive Drills
              </Link>
            </li>
            <li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} aria-hidden="true">/</li>
            <li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
              Focus
            </li>
            <li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} aria-hidden="true">/</li>
            <li className={`font-medium ${isDarkMode ? 'text-cyan-400' : 'text-cyan-600'}`} aria-current="page">
              Concentration Grid
            </li>
          </ol>
        </nav>
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex-shrink-0">
              <Grid className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className={`text-2xl sm:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Concentration Grid
              </h1>
              <p className={`text-sm sm:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Find numbers in sequence • 60-second challenge • 3 lives system
              </p>
            </div>
          </div>
          
          <div className="flex gap-2 flex-shrink-0">
            {gameState === 'playing' && (
              <button 
                onClick={resetGame} 
                className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-100'}`} 
                title="Reset session"
                aria-label="Reset concentration grid drill"
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
          <h2>Concentration Grid - Sequential Number Search Training</h2>
          <p>
            Train visual scanning and concentration by finding numbers in sequential order (1, 2, 3...) on randomized grids.
            Grids expand from 3×3 to 8×8 across 6 levels as you complete each grid.
            Each correct find earns +5 points with combo streaks at 5x intervals.
            Completion bonus of +25 points per level (up to +150 at level 6).
            3 lives protect your score; at 0 lives, wrong clicks deduct 5 points.
            60-second timed challenge with best score saved locally.
          </p>
        </section>

        {/* Stats Board */}
        <div className="grid grid-cols-8 gap-3 mb-4 h-[88px]">
          <StatCard icon={<Target className="text-blue-600" />} value={score} label="Score" isDark={isDarkMode} />
          <StatCard icon={<Trophy className="text-yellow-600" />} value={bestScore} label="Best" isDark={isDarkMode} />
          <StatCard icon={<Timer className={timeRemaining <= 10 ? 'text-red-600' : 'text-green-600'} />} value={`${timeRemaining}s`} label="Time" isDark={isDarkMode} />
          <StatCard icon={<Award className="text-purple-500" />} value={level} label="Level" isDark={isDarkMode} />
          <StatCard icon={<Grid className="text-cyan-500" />} value={`${gridSize}×${gridSize}`} label="Grid" isDark={isDarkMode} />
          <StatCard icon={<BarChart3 className="text-emerald-600" />} value={getAccuracy()} label="Accuracy" unit="%" isDark={isDarkMode} />
          <StatCard icon={<Zap className="text-orange-600" />} value={combo} label="Combo" isDark={isDarkMode} />
          <StatCard icon={<Heart className="text-red-500" />} value={lives} label="Lives" isDark={isDarkMode} />
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
            background: isBoxDarkMode ? '#020202' : '#ffffff',
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
                aria-label="Reset concentration grid drill"
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

          {/* Next Number Indicator */}
          {gameState === 'playing' && currentNumber <= gridSize * gridSize && (
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
              <div className={`inline-flex items-center gap-3 rounded-full px-6 py-2 shadow-md border ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <Eye className="w-5 h-5 text-blue-500" aria-hidden="true" />
                <span className={`text-sm ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Find next:</span>
                <span className={`text-2xl font-bold ${isBoxDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>{currentNumber}</span>
              </div>
            </div>
          )}

          {/* ============ START SCREEN ============ */}
          {gameState === 'start' && (
            <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
              <div className={`rounded-2xl p-6 sm:p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <div className="mb-4">
                  <Grid className="w-16 h-16 text-cyan-500 mx-auto" aria-hidden="true" />
                </div>
                <h2 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Concentration Grid
                </h2>
                <p className={`mb-2 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  60-second challenge • +5 per find • 3 lives • 6 levels
                </p>
                <p className={`mb-6 text-sm ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Find numbers in order (1→2→3...) on expanding grids from 3×3 to 8×8. Complete grids for bonus points.
                </p>
                <button 
                  onClick={startGame}
                  className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg w-full transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
                  aria-label="Start concentration grid drill"
                >
                  Start Drill
                </button>
              </div>
            </div>
          )}

          {/* ============ PLAYING SCREEN ============ */}
          {gameState === 'playing' && grid.length > 0 && (
            <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-8">
              <div className="w-full max-w-2xl">
                <div 
                  className="grid gap-2 mx-auto"
                  style={{
                    gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
                    maxWidth: `${gridSize * getCellSize() + (gridSize - 1) * 8}px`
                  }}
                  role="grid"
                  aria-label={`${gridSize} by ${gridSize} number grid. Find numbers in order starting from ${currentNumber}`}
                >
                  {grid.map((row, rowIdx) => (
                    row.map((cell, colIdx) => (
                      <button
                        key={`${rowIdx}-${colIdx}`}
                        onClick={() => handleCellClick(rowIdx, colIdx, cell)}
                        disabled={foundNumbers.includes(cell)}
                        className={`
                          aspect-square rounded-xl font-bold transition-all duration-200
                          ${getCellStyle(cell)}
                          hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-cyan-500
                        `}
                        style={{ 
                          fontSize: `${Math.max(16, getCellSize() / 3)}px`,
                          width: `${getCellSize()}px`,
                          height: `${getCellSize()}px`
                        }}
                        aria-label={`Number ${cell}${foundNumbers.includes(cell) ? ' - already found' : ''}`}
                      >
                        {cell}
                      </button>
                    ))
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ============ GAME OVER SCREEN ============ */}
          {gameState === 'gameOver' && (
            <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
              <div className={`rounded-2xl p-6 sm:p-8 shadow-xl border w-full max-w-[480px] mx-4 ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Trophy className="w-10 h-10 text-yellow-500" aria-hidden="true" />
                  <h2 className={`text-2xl font-bold ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {level > 1 && foundNumbers.length === gridSize * gridSize ? 'Mastery Achieved!' : "Time's Up!"}
                  </h2>
                </div>
                
                <p className={`text-center text-sm mb-6 ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Keep practicing to improve your concentration and visual scanning speed.
                </p>
                
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <ResultCard label="Final Score" value={score} icon={<Target className="w-4 h-4" />} color="yellow" isDark={isBoxDarkMode} />
                  <ResultCard label="Best Score" value={bestScore} icon={<Trophy className="w-4 h-4" />} color="yellow" isDark={isBoxDarkMode} />
                  <ResultCard label="Accuracy" value={getAccuracy()} unit="%" icon={<BarChart3 className="w-4 h-4" />} color="purple" isDark={isBoxDarkMode} />
                  <ResultCard label="Level" value={`${level}/6`} icon={<Award className="w-4 h-4" />} color="cyan" isDark={isBoxDarkMode} />
                  <ResultCard label="Numbers Found" value={foundNumbers.length} icon={<CheckCircle className="w-4 h-4" />} color="emerald" isDark={isBoxDarkMode} />
                  <ResultCard label="Max Combo" value={`${bestCombo}x`} icon={<Zap className="w-4 h-4" />} color="orange" isDark={isBoxDarkMode} />
                </div>
                
                <div className="flex gap-3">
                  <Link href="/drills/cognitive" className="flex-1">
                    <span className={`block w-full px-4 py-2.5 rounded-lg font-semibold transition-all text-center ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                      ← Back to Drills
                    </span>
                  </Link>
                  <button 
                    onClick={resetGame}
                    className="flex-1 px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
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
                  <Info className={`w-4 h-4 ${isDarkMode ? 'text-cyan-400' : 'text-cyan-600'}`} aria-hidden="true" />
                  <h2 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Drill Rules & Scoring</h2>
                </div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-cyan-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">1</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Find numbers <span className="font-semibold text-cyan-500">1 → 2 → 3 ...</span> in sequential order</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">2</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Correct find: <span className="font-semibold text-green-500">+5 points</span></p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">3</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Wrong click: <span className="font-semibold text-red-500">-1 life</span> • 3 lives total</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">4</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>At 0 lives: <span className="font-semibold text-orange-500">-5 point penalty</span> per mistake</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">5</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Grid complete: <span className="font-semibold text-blue-500">+25 × level bonus</span> (up to +150)</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">6</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Progression: <span className="font-semibold text-purple-500">3×3 → 4×4 → ... → 8×8</span></p>
                    </div>
                  </div>
                </div>
                <div className={`mt-4 pt-3 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs ${isDarkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'}`}>
                  <span>🎯 6 levels • 5x combo bonus notifications • Numbers randomly shuffled</span>
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
      <p className={`text-lg sm:text-xl font-bold truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>{value}{unit}</p>
      <p className={`text-[10px] sm:text-xs truncate ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{label}</p>
    </div>
  );
}

function ResultCard({ label, value, unit = '', icon, color, isDark }) {
  const colorMap = {
    yellow: { bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', text: 'text-yellow-500', icon: 'text-yellow-500' },
    purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-500', icon: 'text-purple-500' },
    cyan: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', text: 'text-cyan-500', icon: 'text-cyan-500' },
    green: { bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-500', icon: 'text-green-500' },
    emerald: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-500', icon: 'text-emerald-500' },
    red: { bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-500', icon: 'text-red-500' },
    orange: { bg: 'bg-orange-500/10', border: 'border-orange-500/30', text: 'text-orange-500', icon: 'text-orange-500' },
    blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-500', icon: 'text-blue-500' },
  };
  
  const colors = colorMap[color] || colorMap.yellow;
  
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