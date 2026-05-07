'use client';

import { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Maximize2, Minimize2, Sun, Moon, 
  Eye, Volume2, VolumeX, Info, Activity, Target, Clock, Award, 
  Trophy, Zap, RefreshCw, Heart
} from 'lucide-react';

export default function ConcentrationStaminaClient() {
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const containerRef = useRef(null);
  
  const [gameState, setGameState] = useState('start');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isBoxDarkMode, setIsBoxDarkMode] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  
  // Game state
  const [timeLeft, setTimeLeft] = useState(60);
  const [lives, setLives] = useState(3);
  const [currentStim, setCurrentStim] = useState('G');
  const [activeSet, setActiveSet] = useState('VOWELS');
  const [isHit, setIsHit] = useState(false);
  const [isMiss, setIsMiss] = useState(false);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [correctHits, setCorrectHits] = useState(0);
  const [misses, setMisses] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  const [processed, setProcessed] = useState(false);
  const [currentInterval, setCurrentInterval] = useState(800);
  
  // Refs
  const gameStateRef = useRef({
    timeLeft: 60,
    lives: 3,
    activeSet: 'VOWELS',
    currentStim: 'G',
    processed: false,
    streakCount: 0,
    correctHits: 0,
    misses: 0,
    score: 0,
    isGameActive: false,
    currentInterval: 800
  });
  const mainGameStateRef = useRef('start');
  const timerIntervalRef = useRef(null);
  const stimulusIntervalRef = useRef(null);
  const ruleIntervalRef = useRef(null);
  const feedbackTimeoutRef = useRef(null);
  const audioCtxRef = useRef(null);
  const bestStreakRef = useRef(0);

  const PENALTY = 1;

  // Data sets - memoized
  const dataSets = useMemo(() => ({
    vowels: ['A', 'E', 'I', 'O', 'U'],
    consonants: ['B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Y', 'Z'],
    primes: ['2', '3', '5', '7'],
    nonPrimes: ['1', '4', '6', '8', '9']
  }), []);

  // Mark as client-side rendered
  useEffect(() => {
    setIsClient(true);
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  // Sync gameState to ref
  useEffect(() => {
    mainGameStateRef.current = gameState;
  }, [gameState]);

  // Load best scores
  useEffect(() => {
    try {
      const savedBestScore = localStorage.getItem('constantPrimeBestScore');
      const savedBestStreak = localStorage.getItem('constantPrimeBestStreak');
      if (savedBestScore) setBestScore(parseInt(savedBestScore, 10));
      if (savedBestStreak) {
        const parsed = parseInt(savedBestStreak, 10);
        setBestStreak(parsed);
        bestStreakRef.current = parsed;
      }
    } catch (e) { /* localStorage not available */ }
  }, []);

  // Update best score
  const updateBestScore = useCallback((finalScore) => {
    try {
      const currentBestScore = parseInt(localStorage.getItem('constantPrimeBestScore') || '0', 10);
      if (finalScore > currentBestScore) {
        localStorage.setItem('constantPrimeBestScore', finalScore.toString());
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
    }, 600);
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
      const freqMap = { hit: 880, miss: 440, ruleChange: 660, streak: 1046.5, lifeLost: 330, speedUp: 1200 };
      const durMap = { hit: 0.1, miss: 0.15, ruleChange: 0.1, streak: 0.2, lifeLost: 0.2, speedUp: 0.08 };
      
      osc.frequency.setValueAtTime(freqMap[type] || 660, now);
      gain.gain.setValueAtTime(type === 'lifeLost' ? 0.15 : type === 'streak' ? 0.12 : 0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + (durMap[type] || 0.15));
      osc.start(now);
      osc.stop(now + (durMap[type] || 0.15));
    } catch (e) { /* Audio not supported */ }
  }, [soundEnabled, initAudio]);

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

  const updateAccuracy = useCallback(() => {
    const state = gameStateRef.current;
    const total = state.correctHits + state.misses;
    if (total > 0) {
      setAccuracy(Math.round((state.correctHits / total) * 100));
    }
  }, []);

  // Adaptive speed based on performance
  const updateSpeed = useCallback(() => {
    const state = gameStateRef.current;
    const totalAttempts = state.correctHits + state.misses;
    
    if (totalAttempts > 0) {
      const currentAccuracy = (state.correctHits / totalAttempts) * 100;
      
      if (currentAccuracy >= 80 && state.currentInterval > 400) {
        state.currentInterval = Math.max(400, state.currentInterval - 50);
        setCurrentInterval(state.currentInterval);
        playSound('speedUp');
        showFeedback(`⚡ Speed increased! ${state.currentInterval}ms`, 'success');
        
        if (stimulusIntervalRef.current) {
          clearInterval(stimulusIntervalRef.current);
          stimulusIntervalRef.current = setInterval(updateStimulus, state.currentInterval);
        }
      } else if (currentAccuracy < 50 && state.currentInterval < 800) {
        state.currentInterval = Math.min(800, state.currentInterval + 50);
        setCurrentInterval(state.currentInterval);
        showFeedback(`🐢 Speed adjusted: ${state.currentInterval}ms`, 'warning');
        
        if (stimulusIntervalRef.current) {
          clearInterval(stimulusIntervalRef.current);
          stimulusIntervalRef.current = setInterval(updateStimulus, state.currentInterval);
        }
      }
    }
  }, [playSound, showFeedback]);

  const updateStimulus = useCallback(() => {
    if (!gameStateRef.current.isGameActive) return;
    
    const state = gameStateRef.current;
    state.processed = false;
    setProcessed(false);
    setIsHit(false);
    setIsMiss(false);
    
    const isTarget = Math.random() < 0.3;
    let newStim = '';
    
    if (state.activeSet === 'VOWELS') {
      newStim = isTarget 
        ? dataSets.vowels[Math.floor(Math.random() * dataSets.vowels.length)] 
        : dataSets.consonants[Math.floor(Math.random() * dataSets.consonants.length)];
    } else {
      newStim = isTarget 
        ? dataSets.primes[Math.floor(Math.random() * dataSets.primes.length)] 
        : dataSets.nonPrimes[Math.floor(Math.random() * dataSets.nonPrimes.length)];
    }
    
    state.currentStim = newStim;
    setCurrentStim(newStim);
    
    if ((state.correctHits + state.misses) % 5 === 0 && (state.correctHits + state.misses) > 0) {
      updateSpeed();
    }
  }, [dataSets, updateSpeed]);

  const handleInput = useCallback(() => {
    if (!gameStateRef.current.isGameActive) return;
    
    const state = gameStateRef.current;
    if (state.processed) return;
    
    state.processed = true;
    setProcessed(true);
    
    const targetSet = state.activeSet === 'VOWELS' ? dataSets.vowels : dataSets.primes;
    const isTarget = targetSet.includes(state.currentStim);
    
    if (isTarget) {
      // Correct hit
      state.correctHits++;
      state.streakCount++;
      state.score += 1;
      
      setCorrectHits(state.correctHits);
      setStreak(state.streakCount);
      setScore(state.score);
      setIsHit(true);
      
      playSound('hit');
      showFeedback(`✓ Correct! +1 point`, 'success');
      
      if (state.streakCount > bestStreakRef.current) {
        bestStreakRef.current = state.streakCount;
        setBestStreak(state.streakCount);
        try {
          localStorage.setItem('constantPrimeBestStreak', state.streakCount.toString());
        } catch (e) { /* localStorage not available */ }
      }
      
      if (state.streakCount % 5 === 0 && state.streakCount > 0) {
        playSound('streak');
        showFeedback(`🔥 ${state.streakCount} Streak!`, 'success');
      }
    } else {
      // Miss
      state.misses++;
      state.streakCount = 0;
      setMisses(state.misses);
      setStreak(0);
      setIsMiss(true);
      
      if (state.lives > 0) {
        state.lives--;
        setLives(state.lives);
        playSound('miss');
        
        if (state.lives === 0) {
          playSound('lifeLost');
          showFeedback('⚠️ Out of lives! Penalty now active!', 'warning');
        } else {
          showFeedback(`✗ Miss! No penalty • ${state.lives} lives left`, 'error');
        }
      } else {
        state.score = Math.max(0, state.score - PENALTY);
        setScore(state.score);
        playSound('miss');
        showFeedback(`✗ Miss! -${PENALTY} point penalty`, 'error');
      }
    }
    
    updateAccuracy();
    
    setTimeout(() => {
      setIsHit(false);
      setIsMiss(false);
    }, 150);
  }, [dataSets, PENALTY, playSound, showFeedback, updateAccuracy]);

  const changeRule = useCallback(() => {
    if (!gameStateRef.current.isGameActive) return;
    
    const state = gameStateRef.current;
    const newSet = state.activeSet === 'VOWELS' ? 'PRIMES' : 'VOWELS';
    state.activeSet = newSet;
    setActiveSet(newSet);
    
    playSound('ruleChange');
    showFeedback(`🔄 Rule changed to ${newSet}!`, 'warning');
  }, [playSound, showFeedback]);

  const endGame = useCallback(() => {
    const state = gameStateRef.current;
    state.isGameActive = false;
    setGameState('gameOver');
    mainGameStateRef.current = 'gameOver';
    
    if (stimulusIntervalRef.current) clearInterval(stimulusIntervalRef.current);
    if (ruleIntervalRef.current) clearInterval(ruleIntervalRef.current);
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    
    updateBestScore(state.score);
  }, [updateBestScore]);

  const startGame = useCallback(() => {
    // Clear existing intervals
    if (stimulusIntervalRef.current) clearInterval(stimulusIntervalRef.current);
    if (ruleIntervalRef.current) clearInterval(ruleIntervalRef.current);
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    
    // Reset ref state
    const state = gameStateRef.current;
    state.timeLeft = 60;
    state.lives = 3;
    state.activeSet = 'VOWELS';
    state.processed = false;
    state.streakCount = 0;
    state.correctHits = 0;
    state.misses = 0;
    state.score = 0;
    state.currentInterval = 800;
    state.isGameActive = true;
    
    // Reset UI state
    setTimeLeft(60);
    setLives(3);
    setActiveSet('VOWELS');
    setCurrentStim('G');
    setProcessed(false);
    setIsHit(false);
    setIsMiss(false);
    setScore(0);
    setStreak(0);
    setCorrectHits(0);
    setMisses(0);
    setAccuracy(100);
    setCurrentInterval(800);
    setGameState('playing');
    mainGameStateRef.current = 'playing';
    
    // Initial stimulus
    setTimeout(() => updateStimulus(), 50);
    
    // Stimulus interval
    stimulusIntervalRef.current = setInterval(updateStimulus, 800);
    
    // Rule change interval (10 seconds)
    ruleIntervalRef.current = setInterval(changeRule, 10000);
    
    // Timer countdown
    timerIntervalRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          endGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    showFeedback('60 seconds • Speed adapts to your accuracy!', 'success');
  }, [updateStimulus, changeRule, endGame, showFeedback]);

  const resetGame = useCallback(() => {
    gameStateRef.current.isGameActive = false;
    if (stimulusIntervalRef.current) clearInterval(stimulusIntervalRef.current);
    if (ruleIntervalRef.current) clearInterval(ruleIntervalRef.current);
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    
    setGameState('start');
    mainGameStateRef.current = 'start';
    setScore(0);
    setStreak(0);
    setCorrectHits(0);
    setMisses(0);
    setAccuracy(100);
    setTimeLeft(60);
    setLives(3);
    setActiveSet('VOWELS');
    setCurrentStim('G');
    setProcessed(false);
    setIsHit(false);
    setIsMiss(false);
    setFeedback('');
    setCurrentInterval(800);
  }, []);

  // Keyboard handler
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space' && mainGameStateRef.current === 'playing') {
        e.preventDefault();
        handleInput();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleInput]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (stimulusIntervalRef.current) clearInterval(stimulusIntervalRef.current);
      if (ruleIntervalRef.current) clearInterval(ruleIntervalRef.current);
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
        audioCtxRef.current = null;
      }
    };
  }, []);

  if (loading || !isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading concentration drill...</p>
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
            "name": "Constant Prime - Concentration Stamina Drill",
            "url": "https://skilldrills.online/drills/productivity/focus-endurance/concentration-stamina",
            "description": "Sustained attention training with alternating Vowels/Primes rule sets. Adaptive speed 800-400ms based on accuracy. 60-second challenge with 3 lives, automatic rule changes every 10 seconds, and combo streaks.",
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
            "educationalUse": ["Sustained Attention", "Cognitive Flexibility", "Task Switching", "Focus Training"],
            "learningResourceType": "Interactive Exercise",
            "timeRequired": "PT60S",
            "interactivityType": "active",
            "inLanguage": "en-US",
            "teaches": ["Sustained Attention", "Cognitive Flexibility", "Task Switching", "Focus Endurance"]
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
              <Link href="/drills" className={`hover:underline transition-colors ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>
                Drills
              </Link>
            </li>
            <li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} aria-hidden="true">/</li>
            <li>
              <Link href="/drills/productivity" className={`hover:underline transition-colors ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>
                Productivity
              </Link>
            </li>
            <li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} aria-hidden="true">/</li>
            <li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
              Focus Endurance
            </li>
            <li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} aria-hidden="true">/</li>
            <li className={`font-medium ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`} aria-current="page">
              Constant Prime
            </li>
          </ol>
        </nav>
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl flex-shrink-0">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className={`text-2xl sm:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Constant Prime
              </h1>
              <p className={`text-sm sm:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Sustained attention • Adaptive speed 800-400ms • 3 lives • 60s
              </p>
            </div>
          </div>
          
          <div className="flex gap-2 flex-shrink-0">
            {gameState === 'playing' && (
              <button 
                onClick={resetGame} 
                className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-100'}`} 
                title="Reset session"
                aria-label="Reset concentration drill"
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
          <h2>Constant Prime - Sustained Attention & Cognitive Flexibility Training</h2>
          <p>
            Train sustained attention and cognitive flexibility with alternating rule sets.
            Rule A (VOWELS): Click or press Space when you see vowels A, E, I, O, U among consonants.
            Rule B (PRIMES): Click or press Space when you see prime numbers 2, 3, 5, 7 among non-primes.
            Rules automatically switch every 10 seconds, testing task-switching ability.
            Adaptive speed tightens from 800ms to 400ms based on accuracy (80%+ accelerates, below 50% slows).
            3 lives protect your score from early mistakes. After lives reach 0, each miss deducts 1 point.
            60-second challenge with combo streaks every 5 correct hits.
          </p>
        </section>

        {/* Stats Board */}
        <div className="grid grid-cols-7 gap-3 mb-4 h-[88px]">
          <StatCard icon={<Target className="text-blue-600" />} value={score} label="Score" isDark={isDarkMode} />
          <StatCard icon={<Trophy className="text-yellow-600" />} value={bestScore} label="Best" isDark={isDarkMode} />
          <StatCard icon={<Clock className={timeLeft <= 10 ? 'text-red-600' : 'text-cyan-600'} />} value={timeLeft} label="Time" unit="s" isDark={isDarkMode} />
          <StatCard icon={<Heart className={lives === 0 ? 'text-yellow-500' : 'text-red-500'} />} value={lives} label="Lives" isDark={isDarkMode} />
          <StatCard icon={<Zap className="text-orange-600" />} value={streak} label="Streak" isDark={isDarkMode} />
          <StatCard icon={<Award className="text-purple-600" />} value={accuracy} label="Accuracy" unit="%" isDark={isDarkMode} />
          <StatCard icon={<Activity className="text-emerald-600" />} value={currentInterval} label="Speed" unit="ms" isDark={isDarkMode} />
        </div>

        {/* Feedback Bar */}
        <div className="h-10 mb-2 flex justify-center items-center">
          <div 
            className={`px-4 py-1.5 rounded-lg text-white font-semibold text-sm transition-all duration-200 ${
              feedback ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            } ${
              feedbackType === 'success' ? 'bg-green-500' : feedbackType === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
            }`}
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
            background: isBoxDarkMode ? "#000000" : "#ffffff",
            aspectRatio: isFullscreen ? 'auto' : '16/9',
            maxWidth: '100%',
            margin: '0 auto',
            borderColor: isDarkMode ? '#374151' : '#e5e7eb',
            overflow: 'hidden'
          }}
          onClick={gameState === 'playing' ? handleInput : undefined}
          role={gameState === 'playing' ? 'button' : undefined}
          tabIndex={gameState === 'playing' ? 0 : undefined}
          aria-label={gameState === 'playing' ? `Click or press Space when target appears. Current rule: ${activeSet}` : undefined}
          onKeyDown={gameState === 'playing' ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleInput(); }} : undefined}
        >
          {/* Fullscreen Controls */}
          {isFullscreen && gameState === 'playing' && (
            <>
              <div className="absolute top-4 right-4 z-30 flex gap-3">
                <button onClick={resetGame} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all" title="Reset session" aria-label="Reset concentration drill">
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
              <div className="absolute top-4 left-4 z-30 bg-black/50 backdrop-blur-sm rounded-lg px-4 py-2 text-white text-sm" aria-live="polite">
                Score: <span className="text-yellow-400 font-bold">{score}</span> | 
                Time: <span className={`font-bold ${timeLeft <= 10 ? 'text-red-400' : 'text-green-400'}`}>{timeLeft}s</span> | 
                Speed: <span className="text-emerald-400 font-bold">{currentInterval}ms</span>
              </div>
            </>
          )}

          {/* HUD - Active Rule */}
          <div className="absolute top-12 w-full text-center z-20 pointer-events-none">
            <div className={`text-xs tracking-widest uppercase mb-2 ${isBoxDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
              Active Filter
            </div>
            <div className={`text-2xl font-bold tracking-wide ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {activeSet}
            </div>
          </div>

          {/* Stimulus Display */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span 
              className={`text-[10rem] sm:text-[12rem] font-black transition-all duration-100 ${
                isHit 
                  ? 'text-[#00ff41] scale-110' 
                  : isMiss 
                    ? 'text-[#ff3131]' 
                    : isBoxDarkMode ? 'text-white' : 'text-gray-900'
              }`}
              aria-live="assertive"
            >
              {currentStim}
            </span>
          </div>

          {/* Speed Indicator */}
          <div className="absolute bottom-4 left-4 z-20 pointer-events-none">
            <span className={`text-xs font-mono ${isBoxDarkMode ? 'text-gray-600' : 'text-gray-400'}`}>
              {currentInterval}ms
            </span>
          </div>

          {/* ============ START SCREEN ============ */}
          {gameState === 'start' && (
            <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
              <div className={`rounded-2xl p-6 sm:p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <div className="mb-4">
                  <Activity className="w-16 h-16 text-emerald-500 mx-auto" aria-hidden="true" />
                </div>
                <h2 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Constant Prime
                </h2>
                <p className={`mb-2 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  60-second challenge • Adaptive speed 800-400ms
                </p>
                <p className={`mb-6 text-sm ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Click or press Space when target appears. Rules switch every 10 seconds between VOWELS and PRIMES.
                </p>
                <button 
                  onClick={startGame} 
                  className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-xl font-semibold hover:shadow-lg w-full transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                  aria-label="Start concentration training"
                >
                  Start Training
                </button>
              </div>
            </div>
          )}

          {/* ============ GAME OVER SCREEN ============ */}
          {gameState === 'gameOver' && (
            <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
              <div className={`rounded-2xl p-6 sm:p-8 shadow-xl border w-full max-w-[480px] mx-4 ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Clock className="w-10 h-10 text-orange-500" aria-hidden="true" />
                  <h2 className={`text-2xl font-bold ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Time&apos;s Up!
                  </h2>
                </div>
                
                <p className={`text-center text-sm mb-6 ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Regular sustained attention training improves focus endurance and cognitive flexibility.
                </p>
                
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <ResultCard label="Final Score" value={score} icon={<Target className="w-4 h-4" />} color="blue" isDark={isBoxDarkMode} />
                  <ResultCard label="Best Score" value={bestScore} icon={<Trophy className="w-4 h-4" />} color="yellow" isDark={isBoxDarkMode} />
                  <ResultCard label="Best Streak" value={`${bestStreak}x`} icon={<Zap className="w-4 h-4" />} color="orange" isDark={isBoxDarkMode} />
                  <ResultCard label="Accuracy" value={accuracy} unit="%" icon={<Activity className="w-4 h-4" />} color="purple" isDark={isBoxDarkMode} />
                  <ResultCard label="Correct Hits" value={correctHits} icon={<Target className="w-4 h-4" />} color="emerald" isDark={isBoxDarkMode} />
                  <ResultCard label="Misses" value={misses} icon={<RefreshCw className="w-4 h-4" />} color="red" isDark={isBoxDarkMode} />
                </div>
                
                <div className="flex gap-3">
                  <Link href="/drills/productivity" className="flex-1">
                    <button className={`w-full px-4 py-2.5 rounded-lg font-semibold transition-all ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                      ← Back
                    </button>
                  </Link>
                  <button 
                    onClick={startGame} 
                    className="flex-1 px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
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
                  <Info className={`w-4 h-4 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`} aria-hidden="true" />
                  <h2 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Drill Rules & Scoring</h2>
                </div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">1</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-emerald-500">Rule A (VOWELS):</span> Click/space on A, E, I, O, U
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">2</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-blue-500">Rule B (PRIMES):</span> Click/space on 2, 3, 5, 7
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">3</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Rules switch <span className="font-semibold text-purple-500">every 10 seconds</span> automatically
                      </p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">4</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Correct hit: <span className="font-semibold text-green-500">+1 point</span>
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">5</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Miss: <span className="font-semibold text-red-500">-1pt only when 0 lives</span> (3 lives protection)
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">6</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Speed adapts: <span className="font-semibold text-yellow-500">800-400ms</span> based on accuracy
                      </p>
                    </div>
                  </div>
                </div>
                <div className={`mt-4 pt-3 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs ${isDarkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'}`}>
                  <span>⚡ 80%+ accuracy accelerates speed • Below 50% slows down</span>
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