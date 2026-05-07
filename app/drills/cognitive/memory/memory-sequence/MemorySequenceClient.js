'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Target, Zap, Timer, Trophy, Heart, 
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, Eye,
  BarChart3, Info, Brain, Grid, Activity, RefreshCw
} from 'lucide-react';

export default function MemorySequenceClient() {
  const containerRef = useRef(null);
  
  // Drill Core State
  const [gridSize, setGridSize] = useState(4);
  const [grid, setGrid] = useState([]);
  const [sequence, setSequence] = useState([]);
  const [userSequence, setUserSequence] = useState([]);
  const [gameState, setGameState] = useState('start');
  const [sequenceLength, setSequenceLength] = useState(8);
  
  // Professional Metrics
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(60);
  const [lives, setLives] = useState(3);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [activeBlock, setActiveBlock] = useState(null);
  const [maxSequenceForCurrentGrid, setMaxSequenceForCurrentGrid] = useState(16);
  const [isMemoryMaster, setIsMemoryMaster] = useState(false);
  const [totalSequencesCompleted, setTotalSequencesCompleted] = useState(0);
  
  // UI State
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isBoxDarkMode, setIsBoxDarkMode] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  
  // Timers
  const sequenceTimerRef = useRef(null);
  const feedbackTimeoutRef = useRef(null);
  const timerIntervalRef = useRef(null);
  const audioContextRef = useRef(null);
  const scoreRef = useRef(0);
  const livesRef = useRef(3);
  const gameStateRef = useRef('start');
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
      const savedBestScore = localStorage.getItem('memorySequenceDrillBestScore');
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
        localStorage.setItem('memorySequenceDrillBestScore', score.toString());
      } catch (e) { /* localStorage not available */ }
    }
  }, [gameState, score, bestScore]);

  // Cleanup timers
  useEffect(() => {
    return () => {
      if (sequenceTimerRef.current) clearTimeout(sequenceTimerRef.current);
      if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      if (audioContextRef.current) audioContextRef.current.close();
    };
  }, []);

  // Timer logic
  useEffect(() => {
    if (gameState === 'playing' || gameState === 'showing' || gameState === 'input' || gameState === 'success' || gameState === 'fail') {
      timerIntervalRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            setGameState('gameOver');
            gameStateRef.current = 'gameOver';
            if (timerIntervalRef.current) {
              clearInterval(timerIntervalRef.current);
              timerIntervalRef.current = null;
            }
            if (sequenceTimerRef.current) clearTimeout(sequenceTimerRef.current);
            if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
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
  }, [gameState]);

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

  const playTone = useCallback((index) => {
    if (!soundEnabled) return;
    try {
      const ctx = initAudio();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.connect(g);
      g.connect(ctx.destination);
      osc.frequency.setValueAtTime(440 + index * 30, ctx.currentTime);
      g.gain.setValueAtTime(0.1, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.15);
    } catch (e) { /* Audio not supported */ }
  }, [soundEnabled, initAudio]);

  const playSuccessSound = useCallback(() => {
    if (!soundEnabled) return;
    try {
      const ctx = initAudio();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.connect(g);
      g.connect(ctx.destination);
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      g.gain.setValueAtTime(0.12, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.15);
    } catch (e) { /* Audio not supported */ }
  }, [soundEnabled, initAudio]);

  const playFailSound = useCallback(() => {
    if (!soundEnabled) return;
    try {
      const ctx = initAudio();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.connect(g);
      g.connect(ctx.destination);
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      g.gain.setValueAtTime(0.1, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.15);
    } catch (e) { /* Audio not supported */ }
  }, [soundEnabled, initAudio]);

  const playPenaltySound = useCallback(() => {
    if (!soundEnabled) return;
    try {
      const ctx = initAudio();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.connect(g);
      g.connect(ctx.destination);
      osc.frequency.setValueAtTime(220, ctx.currentTime);
      g.gain.setValueAtTime(0.15, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.15);
    } catch (e) { /* Audio not supported */ }
  }, [soundEnabled, initAudio]);

  const playMasterSound = useCallback(() => {
    if (!soundEnabled) return;
    try {
      const ctx = initAudio();
      if (!ctx) return;
      [523, 659, 783, 1046, 1318].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.connect(g);
        g.connect(ctx.destination);
        const startTime = ctx.currentTime + i * 0.1;
        osc.frequency.setValueAtTime(freq, startTime);
        g.gain.setValueAtTime(0.1, startTime);
        g.gain.exponentialRampToValueAtTime(0.001, startTime + 0.2);
        osc.start(startTime);
        osc.stop(startTime + 0.2);
      });
    } catch (e) { /* Audio not supported */ }
  }, [soundEnabled, initAudio]);

  // Generate sequence
  const generateSequence = useCallback((length, size) => {
    const newSequence = [];
    const totalCells = size * size;
    for (let i = 0; i < length; i++) {
      let nextId;
      do {
        nextId = Math.floor(Math.random() * totalCells);
      } while (i > 0 && nextId === newSequence[i-1]);
      newSequence.push(nextId);
    }
    return newSequence;
  }, []);

  const getAccuracy = useCallback(() => {
    if (totalSequencesCompleted === 0) return 100;
    const totalMisses = 3 - lives;
    const totalAttempts = totalSequencesCompleted + totalMisses;
    return Math.round((totalSequencesCompleted / Math.max(1, totalAttempts)) * 100);
  }, [totalSequencesCompleted, lives]);

  const getMaxSequenceForGrid = useCallback((size) => {
    const s = Math.max(4, size);
    if (s === 4) return 16;
    if (s === 5) return 25;
    if (s === 6) return 36;
    return 49;
  }, []);

  const getStartSequenceForGrid = useCallback((size) => {
    const s = Math.max(4, size);
    if (s === 4) return 8;
    if (s === 5) return 15;
    if (s === 6) return 25;
    return 36;
  }, []);

  const handleMiss = useCallback((reason) => {
    if (livesRef.current > 0) {
      livesRef.current -= 1;
      setLives(livesRef.current);
      playFailSound();
      showFeedback(`✗ ${reason}! -1 life`, 'error');
    }
    
    if (livesRef.current === 0) {
      scoreRef.current = Math.max(0, scoreRef.current - 10);
      setScore(scoreRef.current);
      playPenaltySound();
      showFeedback('✗ -10 points!', 'error');
    }
    
    setCurrentStreak(0);
  }, [playFailSound, playPenaltySound, showFeedback]);

  // Start new round
  const startNewRound = useCallback(async (size, seqLen, resetLives = false) => {
    const actualSize = Math.max(4, size);
    
    setGameState('showing');
    gameStateRef.current = 'showing';
    setUserSequence([]);
    setFeedback('');
    
    if (resetLives) {
      setLives(3);
      livesRef.current = 3;
    }
    
    const newGrid = Array(actualSize * actualSize).fill(null);
    setGrid(newGrid);
    
    const newSequence = generateSequence(seqLen, actualSize);
    setSequence(newSequence);

    const displayTime = Math.max(400, 600 - (actualSize - 4) * 20);
    const pauseTime = Math.max(200, 350 - (actualSize - 4) * 15);
    
    for (let i = 0; i < newSequence.length; i++) {
      await new Promise(r => {
        sequenceTimerRef.current = setTimeout(r, displayTime + pauseTime);
      });
      if (gameStateRef.current === 'gameOver' || gameStateRef.current === 'start') return;
      setActiveBlock(newSequence[i]);
      playTone(newSequence[i]);
      await new Promise(r => {
        sequenceTimerRef.current = setTimeout(r, displayTime);
      });
      if (gameStateRef.current === 'gameOver' || gameStateRef.current === 'start') return;
      setActiveBlock(null);
    }

    if (gameStateRef.current !== 'gameOver' && gameStateRef.current !== 'start') {
      setGameState('input');
      gameStateRef.current = 'input';
    }
  }, [generateSequence, playTone]);

  const handleBlockClick = useCallback((index) => {
    if (gameStateRef.current !== 'input') return;
    if (clickCooldownRef.current) return;
    
    clickCooldownRef.current = true;

    const newUserSequence = [...userSequence, index];
    setUserSequence(newUserSequence);
    playTone(index);
    
    setActiveBlock(index);
    setTimeout(() => setActiveBlock(null), 200);

    const currentIndex = newUserSequence.length - 1;
    
    if (newUserSequence[currentIndex] !== sequence[currentIndex]) {
      handleMiss('Wrong');
      setGameState('fail');
      gameStateRef.current = 'fail';
      
      feedbackTimeoutRef.current = setTimeout(() => {
        startNewRound(Math.max(4, gridSize), sequenceLength, false);
      }, 1000);
    } else if (newUserSequence.length === sequence.length) {
      scoreRef.current += 10;
      setScore(scoreRef.current);
      setTotalSequencesCompleted(prev => prev + 1);
      setGameState('success');
      gameStateRef.current = 'success';
      showFeedback('✓ +10', 'success');
      
      setCurrentStreak(prev => {
        const newStreak = prev + 1;
        if (newStreak > bestStreak) {
          setBestStreak(newStreak);
        }
        return newStreak;
      });
      
      playSuccessSound();
      
      const currentGridSize = Math.max(4, gridSize);
      const maxSeqForThisGrid = getMaxSequenceForGrid(currentGridSize);
      
      if (sequenceLength < maxSeqForThisGrid) {
        feedbackTimeoutRef.current = setTimeout(() => {
          setSequenceLength(prev => prev + 1);
          startNewRound(currentGridSize, sequenceLength + 1, false);
        }, 800);
      } else if (currentGridSize < 7) {
        const newSize = currentGridSize + 1;
        const newSeqLen = getStartSequenceForGrid(newSize);
        feedbackTimeoutRef.current = setTimeout(() => {
          setGridSize(newSize);
          setSequenceLength(newSeqLen);
          setMaxSequenceForCurrentGrid(getMaxSequenceForGrid(newSize));
          setCurrentLevel(prev => prev + 1);
          startNewRound(newSize, newSeqLen, false);
        }, 800);
      } else {
        setGameState('memoryMaster');
        gameStateRef.current = 'memoryMaster';
        setIsMemoryMaster(true);
        playMasterSound();
      }
    }
    
    setTimeout(() => {
      clickCooldownRef.current = false;
    }, 100);
  }, [userSequence, sequence, gridSize, sequenceLength, bestStreak, playTone, playSuccessSound, playMasterSound, handleMiss, startNewRound, getMaxSequenceForGrid, getStartSequenceForGrid, showFeedback]);

  // Start game
  const startGame = useCallback(() => {
    if (sequenceTimerRef.current) clearTimeout(sequenceTimerRef.current);
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    
    setGameState('playing');
    gameStateRef.current = 'playing';
    setTimeRemaining(60);
    setScore(0);
    setGridSize(4);
    setSequenceLength(8);
    setMaxSequenceForCurrentGrid(16);
    setCurrentLevel(1);
    setCurrentStreak(0);
    setBestStreak(0);
    setTotalSequencesCompleted(0);
    setLives(3);
    setUserSequence([]);
    setFeedback('');
    setIsMemoryMaster(false);
    
    scoreRef.current = 0;
    livesRef.current = 3;
    clickCooldownRef.current = false;
    
    initAudio();
    
    setTimeout(() => startNewRound(4, 8, true), 100);
  }, [startNewRound, initAudio]);

  const resetGame = useCallback(() => {
    if (sequenceTimerRef.current) clearTimeout(sequenceTimerRef.current);
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    
    setGameState('start');
    gameStateRef.current = 'start';
    setGridSize(4);
    setSequenceLength(8);
    setMaxSequenceForCurrentGrid(16);
    setCurrentLevel(1);
    setScore(0);
    setCurrentStreak(0);
    setBestStreak(0);
    setTotalSequencesCompleted(0);
    setLives(3);
    setUserSequence([]);
    setGrid([]);
    setSequence([]);
    setActiveBlock(null);
    setFeedback('');
    setIsMemoryMaster(false);
    setFeedbackType('');
    
    scoreRef.current = 0;
    livesRef.current = 3;
    clickCooldownRef.current = false;
  }, []);

  const getGridCellSize = useCallback(() => {
    const size = Math.max(4, gridSize);
    if (size === 4) return 'minmax(40px, 60px)';
    if (size === 5) return 'minmax(32px, 48px)';
    if (size === 6) return 'minmax(26px, 40px)';
    return 'minmax(22px, 34px)';
  }, [gridSize]);

  const getGridMaxWidth = useCallback(() => {
    const size = Math.max(4, gridSize);
    if (size === 4) return '320px';
    if (size === 5) return '320px';
    return '300px';
  }, [gridSize]);

  const displayGridSize = Math.max(4, gridSize);

  if (loading || !isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading memory sequence drill...</p>
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
            "name": "Memory Sequence Drill",
            "url": "https://skilldrills.online/drills/cognitive/memory/memory-sequence",
            "description": "Spatial working memory training: watch and repeat sequences on expanding 4×4 to 7×7 grids. Sequences grow from 8 to 49 steps. 60-second challenge with lives system and Memory Master achievement.",
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
            "educationalUse": ["Working Memory", "Spatial Memory", "Sequence Recall", "Cognitive Training"],
            "learningResourceType": "Interactive Exercise",
            "timeRequired": "PT60S",
            "interactivityType": "active",
            "inLanguage": "en-US",
            "teaches": ["Working Memory", "Spatial Recall", "Pattern Recognition", "Sequence Memory"]
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
              Memory
            </li>
            <li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} aria-hidden="true">/</li>
            <li className={`font-medium ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} aria-current="page">
              Memory Sequence
            </li>
          </ol>
        </nav>
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex-shrink-0">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className={`text-2xl sm:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Memory Sequence
              </h1>
              <p className={`text-sm sm:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Remember & repeat • 4×4 → 7×7 grids • +10 per sequence • 3 lives
              </p>
            </div>
          </div>
          
          <div className="flex gap-2 flex-shrink-0">
            {(gameState === 'playing' || gameState === 'showing' || gameState === 'input' || gameState === 'success' || gameState === 'fail') && (
              <button 
                onClick={resetGame} 
                className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-100'}`} 
                title="Reset session"
                aria-label="Reset memory sequence drill"
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
          <h2>Memory Sequence - Spatial Working Memory Training</h2>
          <p>
            Train your working memory by watching and repeating spatial sequences on grids.
            Start at 4×4 with 8-step sequences and progress to 7×7 with up to 49 steps.
            Each grid completion earns +10 points. 3 lives protect your score; at 0 lives, mistakes deduct 10 points.
            Build streak counters and aim for the Memory Master achievement by completing the 7×7 grid.
            60-second timed challenge with best score saved locally.
          </p>
        </section>

        {/* Stats Board */}
        <div className="grid grid-cols-8 gap-3 mb-4 h-[88px]">
          <StatCard icon={<Target className="text-blue-600" />} value={score} label="Score" isDark={isDarkMode} />
          <StatCard icon={<Trophy className="text-yellow-600" />} value={bestScore} label="Best" isDark={isDarkMode} />
          <StatCard icon={<Timer className={timeRemaining <= 10 ? 'text-red-600' : 'text-green-600'} />} value={`${timeRemaining}s`} label="Time" isDark={isDarkMode} />
          <StatCard icon={<Grid className="text-purple-600" />} value={`${displayGridSize}×${displayGridSize}`} label="Grid" isDark={isDarkMode} />
          <StatCard icon={<Activity className="text-emerald-600" />} value={`${sequenceLength}/${maxSequenceForCurrentGrid}`} label="Sequence" isDark={isDarkMode} />
          <StatCard icon={<BarChart3 className="text-amber-600" />} value={getAccuracy()} label="Accuracy" unit="%" isDark={isDarkMode} />
          <StatCard icon={<Zap className="text-orange-600" />} value={currentStreak} label="Streak" isDark={isDarkMode} />
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
            background: isBoxDarkMode ? '#0a0a0a' : '#ffffff',
            aspectRatio: isFullscreen ? 'auto' : '16/9',
            maxWidth: '100%',
            margin: '0 auto',
            borderColor: isDarkMode ? '#374151' : '#e5e7eb',
            overflow: 'hidden'
          }}
        >
          {/* Fullscreen Controls */}
          {isFullscreen && (gameState === 'playing' || gameState === 'showing' || gameState === 'input' || gameState === 'success' || gameState === 'fail') && (
            <div className="absolute top-4 right-4 z-30 flex gap-3">
              <button 
                onClick={resetGame} 
                className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all" 
                title="Reset session"
                aria-label="Reset memory sequence drill"
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
            
            {/* ============ START SCREEN ============ */}
            {gameState === 'start' && (
              <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
                <div className={`rounded-2xl p-6 sm:p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                  <div className="mb-4">
                    <Brain className="w-16 h-16 text-blue-500 mx-auto" aria-hidden="true" />
                  </div>
                  <h2 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Memory Sequence
                  </h2>
                  <p className={`mb-2 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    60-second challenge • 4×4 → 7×7 grids • +10 per sequence
                  </p>
                  <p className={`mb-6 text-sm ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Watch the sequence, then repeat it in order. Grids expand as you progress. Complete 7×7 to become a Memory Master.
                  </p>
                  <button 
                    onClick={startGame}
                    className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg w-full transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    aria-label="Start memory sequence drill"
                  >
                    Start Drill
                  </button>
                </div>
              </div>
            )}

            {/* ============ MEMORY MASTER SCREEN ============ */}
            {gameState === 'memoryMaster' && (
              <div className="text-center">
                <Trophy className="w-20 h-20 text-yellow-500 mx-auto mb-4" aria-hidden="true" />
                <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${isBoxDarkMode ? 'text-yellow-400' : 'text-yellow-600'}`}>
                  🏆 Memory Master!
                </h2>
                <p className={`mb-6 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  You completed the 7×7 grid! Outstanding working memory!
                </p>
                <div className="flex gap-3 justify-center">
                  <button 
                    onClick={resetGame} 
                    className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Play Again
                  </button>
                </div>
              </div>
            )}

            {/* ============ PLAYING / SHOWING / INPUT SCREENS ============ */}
            {(gameState === 'playing' || gameState === 'showing' || gameState === 'input' || gameState === 'success' || gameState === 'fail') && (
              <div className="w-full h-full flex flex-col items-center justify-center">
                <div 
                  className="grid gap-2 place-items-center"
                  style={{ 
                    gridTemplateColumns: `repeat(${displayGridSize}, 1fr)`,
                    maxWidth: getGridMaxWidth(),
                    width: '100%'
                  }}
                  role="grid"
                  aria-label={`${displayGridSize} by ${displayGridSize} memory grid. ${gameState === 'showing' ? 'Watch the sequence' : gameState === 'input' ? 'Repeat the sequence' : ''}`}
                >
                  {grid.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleBlockClick(idx)}
                      className={`
                        aspect-square rounded-lg transition-all duration-200 shadow-sm w-full
                        ${activeBlock === idx ? 'bg-blue-500 scale-90 ring-2 ring-blue-300' : isBoxDarkMode ? 'bg-zinc-800 hover:bg-zinc-700' : 'bg-slate-100 hover:bg-slate-200'}
                        ${gameState === 'showing' ? 'cursor-wait' : 'cursor-pointer'}
                        hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500
                      `}
                      style={{
                        maxWidth: getGridCellSize(),
                        maxHeight: getGridCellSize()
                      }}
                      disabled={gameState !== 'input'}
                      aria-label={`Cell ${idx + 1}${activeBlock === idx ? ' - active' : ''}`}
                    />
                  ))}
                </div>

                {/* Success Overlay */}
                {gameState === 'success' && (
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-500 text-white px-6 py-3 rounded-xl font-bold text-xl shadow-lg pointer-events-none">
                    ✓ +10
                  </div>
                )}

                {/* Fail Overlay */}
                {gameState === 'fail' && (
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-500 text-white px-6 py-3 rounded-xl font-bold text-xl shadow-lg pointer-events-none">
                    ✗ Wrong sequence
                  </div>
                )}

                {/* Bottom Info Bar */}
                <div className="absolute bottom-4 left-4 flex gap-3">
                  <div className={`px-4 py-2 rounded-lg font-bold text-sm ${isBoxDarkMode ? 'bg-zinc-800 text-gray-300' : 'bg-gray-200 text-gray-700'}`}>
                    Level {currentLevel}/4
                  </div>
                  <div className={`px-4 py-2 rounded-lg font-bold flex items-center gap-2 text-sm ${lives <= 1 ? 'bg-red-500/20 text-red-500' : isBoxDarkMode ? 'bg-zinc-800 text-red-400' : 'bg-gray-200 text-red-600'}`}>
                    <Heart className="w-4 h-4" />
                    {lives}/3 Lives
                  </div>
                </div>

                {/* Game State Indicator */}
                <div className="absolute bottom-4 right-4">
                  <div className={`px-4 py-2 rounded-lg font-bold text-sm ${isBoxDarkMode ? 'bg-zinc-800 text-gray-300' : 'bg-gray-200 text-gray-700'}`}>
                    {gameState === 'showing' ? '👀 Watching...' : gameState === 'input' ? '🎯 Your turn!' : ''}
                  </div>
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
                    Keep practicing to improve your working memory and sequence recall capacity.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <ResultCard label="Final Score" value={score} icon={<Target className="w-4 h-4" />} color="yellow" isDark={isBoxDarkMode} />
                    <ResultCard label="Best Score" value={bestScore} icon={<Trophy className="w-4 h-4" />} color="yellow" isDark={isBoxDarkMode} />
                    <ResultCard label="Accuracy" value={getAccuracy()} unit="%" icon={<BarChart3 className="w-4 h-4" />} color="purple" isDark={isBoxDarkMode} />
                    <ResultCard label="Max Grid" value={`${displayGridSize}×${displayGridSize}`} icon={<Grid className="w-4 h-4" />} color="blue" isDark={isBoxDarkMode} />
                    <ResultCard label="Max Sequence" value={sequenceLength} icon={<Activity className="w-4 h-4" />} color="emerald" isDark={isBoxDarkMode} />
                    <ResultCard label="Best Streak" value={bestStreak} icon={<Zap className="w-4 h-4" />} color="orange" isDark={isBoxDarkMode} />
                  </div>
                  
                  <div className="flex gap-3">
                    <Link href="/drills/cognitive" className="flex-1">
                      <span className={`block w-full px-4 py-2.5 rounded-lg font-semibold transition-all text-center ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                        ← Back to Drills
                      </span>
                    </Link>
                    <button 
                      onClick={resetGame}
                      className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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
          <footer className="mt-6" aria-label="Drill rules and scoring information">
            <div className={`rounded-xl border overflow-hidden ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <div className={`px-4 py-3 border-b ${isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'}`}>
                <div className="flex items-center gap-2">
                  <Info className={`w-4 h-4 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} aria-hidden="true" />
                  <h2 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Drill Rules & Scoring</h2>
                </div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">1</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Watch and <span className="font-semibold text-blue-500">repeat the sequence</span> in exact order</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">2</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Success: <span className="font-semibold text-green-500">+10 points</span> per sequence completed</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">3</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Wrong click: <span className="font-semibold text-red-500">-1 life</span> • 3 lives total</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">4</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>At 0 lives: <span className="font-semibold text-orange-500">-10 point penalty</span> per mistake</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">5</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Progression: 4×4 → 5×5 → 6×6 → <span className="font-semibold text-purple-500">7×7 (Memory Master)</span></p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">6</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>4×4: 8→16 • 5×5: 15→25 • 6×6: 25→36 • <span className="font-semibold text-yellow-500">7×7: 36→49</span></p>
                    </div>
                  </div>
                </div>
                <div className={`mt-4 pt-3 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs ${isDarkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'}`}>
                  <span>🧠 Spatial working memory training with progressive difficulty</span>
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
    blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-500', icon: 'text-blue-500' },
    green: { bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-500', icon: 'text-green-500' },
    emerald: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-500', icon: 'text-emerald-500' },
    orange: { bg: 'bg-orange-500/10', border: 'border-orange-500/30', text: 'text-orange-500', icon: 'text-orange-500' },
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