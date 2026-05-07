'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Target, Zap, Timer, Trophy, Heart, 
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, Eye,
  BarChart3, Info, Hash, Award, Crown, RefreshCw
} from 'lucide-react';

export default function NumberRecallClient() {
  const containerRef = useRef(null);
  
  // Drill Core State
  const [sequence, setSequence] = useState('');
  const [userInput, setUserInput] = useState('');
  const [gameState, setGameState] = useState('start');
  const [digitCount, setDigitCount] = useState(4);
  
  // Professional Metrics
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(60);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [combo, setCombo] = useState(0);
  const [bestCombo, setBestCombo] = useState(0);
  const [isMemoryMaster, setIsMemoryMaster] = useState(false);
  const [maxDigitsForLevel, setMaxDigitsForLevel] = useState(9);
  const [totalSequencesCompleted, setTotalSequencesCompleted] = useState(0);
  const [lives, setLives] = useState(3);
  
  // UI State
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isBoxDarkMode, setIsBoxDarkMode] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [displayDigit, setDisplayDigit] = useState('');
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const inputRef = useRef(null);
  
  // Timers
  const sequenceTimerRef = useRef(null);
  const feedbackTimeoutRef = useRef(null);
  const timerIntervalRef = useRef(null);
  const audioContextRef = useRef(null);
  const scoreRef = useRef(0);
  const comboRef = useRef(0);
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
      const savedBestScore = localStorage.getItem('numberRecallDrillBestScore');
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
        localStorage.setItem('numberRecallDrillBestScore', score.toString());
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

  const playDigitTone = useCallback((pos) => {
    if (!soundEnabled) return;
    try {
      const ctx = initAudio();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.connect(g);
      g.connect(ctx.destination);
      osc.frequency.setValueAtTime(440 + (pos * 40), ctx.currentTime);
      osc.type = 'sine';
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

  const getMaxDigitsForLevel = useCallback((level) => {
    if (level === 1) return 9;
    if (level === 2) return 16;
    if (level === 3) return 25;
    if (level === 4) return 36;
    if (level === 5) return 49;
    return level * level;
  }, []);

  const getStartDigitsForLevel = useCallback((level) => {
    if (level === 1) return 4;
    if (level === 2) return 8;
    if (level === 3) return 15;
    if (level === 4) return 25;
    if (level === 5) return 36;
    return Math.floor(level * level / 2);
  }, []);

  const getAccuracy = useCallback(() => {
    const totalMisses = 3 - lives;
    const totalAttempts = totalSequencesCompleted + totalMisses;
    if (totalAttempts === 0) return 100;
    return Math.round((totalSequencesCompleted / Math.max(1, totalAttempts)) * 100);
  }, [totalSequencesCompleted, lives]);

  const handleMiss = useCallback(() => {
    if (livesRef.current > 0) {
      livesRef.current -= 1;
      setLives(livesRef.current);
      playFailSound();
      showFeedback('✗ Incorrect! -1 life', 'error');
    }
    
    if (livesRef.current === 0) {
      scoreRef.current = Math.max(0, scoreRef.current - 3);
      setScore(scoreRef.current);
      playPenaltySound();
      showFeedback('✗ -3 points!', 'error');
    }
    
    comboRef.current = 0;
    setCombo(0);
  }, [playFailSound, playPenaltySound, showFeedback]);

  // Start new round
  const startNewRound = useCallback(async (digits, resetLives = false) => {
    if (gameStateRef.current === 'gameOver' || gameStateRef.current === 'start') return;
    
    setGameState('showing');
    gameStateRef.current = 'showing';
    setUserInput('');
    setFeedback('');
    
    if (resetLives) {
      setLives(3);
      livesRef.current = 3;
    }
    
    const newSequence = Array.from({ length: digits }, () => Math.floor(Math.random() * 10)).join('');
    setSequence(newSequence);

    for (let i = 0; i < newSequence.length; i++) {
      if (gameStateRef.current === 'gameOver' || gameStateRef.current === 'start') return;
      setDisplayDigit(newSequence[i]);
      playDigitTone(i);
      await new Promise(r => {
        sequenceTimerRef.current = setTimeout(r, 800);
      });
      setDisplayDigit('');
      if (i < newSequence.length - 1) {
        await new Promise(r => {
          sequenceTimerRef.current = setTimeout(r, 200);
        });
      }
    }

    if (gameStateRef.current !== 'gameOver' && gameStateRef.current !== 'start') {
      setGameState('input');
      gameStateRef.current = 'input';
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [playDigitTone]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (gameStateRef.current !== 'input') return;
    if (clickCooldownRef.current) return;
    
    clickCooldownRef.current = true;
    
    if (userInput === sequence) {
      scoreRef.current += 3;
      setScore(scoreRef.current);
      setTotalSequencesCompleted(prev => prev + 1);
      comboRef.current++;
      setCombo(comboRef.current);
      
      if (comboRef.current > bestCombo) {
        setBestCombo(comboRef.current);
      }
      
      setGameState('success');
      gameStateRef.current = 'success';
      showFeedback('✓ +3', 'success');
      playSuccessSound();
      
      if (digitCount < maxDigitsForLevel) {
        feedbackTimeoutRef.current = setTimeout(() => {
          setDigitCount(prev => prev + 1);
          startNewRound(digitCount + 1, false);
        }, 800);
      } else if (currentLevel < 5) {
        const newLevel = currentLevel + 1;
        const newDigits = getStartDigitsForLevel(newLevel);
        feedbackTimeoutRef.current = setTimeout(() => {
          setCurrentLevel(newLevel);
          setDigitCount(newDigits);
          setMaxDigitsForLevel(getMaxDigitsForLevel(newLevel));
          startNewRound(newDigits, false);
        }, 800);
      } else {
        setGameState('memoryMaster');
        gameStateRef.current = 'memoryMaster';
        setIsMemoryMaster(true);
        playMasterSound();
      }
    } else {
      handleMiss();
      setGameState('fail');
      gameStateRef.current = 'fail';
      
      feedbackTimeoutRef.current = setTimeout(() => {
        startNewRound(digitCount, false);
      }, 1500);
    }
    
    setTimeout(() => {
      clickCooldownRef.current = false;
    }, 100);
  }, [userInput, sequence, digitCount, maxDigitsForLevel, currentLevel, bestCombo, playSuccessSound, playMasterSound, handleMiss, startNewRound, getMaxDigitsForLevel, getStartDigitsForLevel, showFeedback]);

  // Start game
  const startGame = useCallback(() => {
    if (sequenceTimerRef.current) clearTimeout(sequenceTimerRef.current);
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    
    setGameState('playing');
    gameStateRef.current = 'playing';
    setTimeRemaining(60);
    setScore(0);
    setCurrentLevel(1);
    setDigitCount(4);
    setMaxDigitsForLevel(9);
    setCombo(0);
    setBestCombo(0);
    setUserInput('');
    setFeedback('');
    setIsMemoryMaster(false);
    setTotalSequencesCompleted(0);
    setLives(3);
    
    scoreRef.current = 0;
    comboRef.current = 0;
    livesRef.current = 3;
    clickCooldownRef.current = false;
    
    initAudio();
    
    setTimeout(() => startNewRound(4, true), 100);
  }, [startNewRound, initAudio]);

  const resetGame = useCallback(() => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (sequenceTimerRef.current) clearTimeout(sequenceTimerRef.current);
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    setGameState('start');
    gameStateRef.current = 'start';
    setFeedback('');
    setFeedbackType('');
  }, []);

  if (loading || !isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading number recall drill...</p>
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
            "name": "Number Recall Drill - Digit Span Training",
            "url": "https://skilldrills.online/drills/cognitive/memory/number-recall",
            "description": "Digit span working memory training: memorize and recall progressively longer number sequences from 4 to 49 digits across 5 levels. 60-second challenge with lives system and Memory Master achievement.",
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
            "educationalUse": ["Working Memory", "Digit Span", "Numerical Memory", "Cognitive Assessment"],
            "learningResourceType": "Interactive Exercise",
            "timeRequired": "PT60S",
            "interactivityType": "active",
            "inLanguage": "en-US",
            "teaches": ["Digit Span", "Working Memory", "Numerical Recall", "Sequence Memory"]
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
            <li className={`font-medium ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`} aria-current="page">
              Number Recall
            </li>
          </ol>
        </nav>
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl flex-shrink-0">
              <Hash className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className={`text-2xl sm:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Number Recall
              </h1>
              <p className={`text-sm sm:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Memorize & recall digits • +3 per success • 5 levels • 3 lives
              </p>
            </div>
          </div>
          
          <div className="flex gap-2 flex-shrink-0">
            {(gameState === 'playing' || gameState === 'showing' || gameState === 'input' || gameState === 'success' || gameState === 'fail') && (
              <button 
                onClick={resetGame} 
                className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-100'}`} 
                title="Reset session"
                aria-label="Reset number recall drill"
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
          <h2>Number Recall - Digit Span Working Memory Training</h2>
          <p>
            Train your digit span working memory by watching and recalling progressively longer number sequences.
            Start at level 1 with 4 digits and progress to level 5 with up to 49 digits.
            Each sequence is displayed one digit at a time with audio tones for multi-sensory encoding.
            Correct recall earns +3 points. 3 lives protect your score; at 0 lives, mistakes deduct 3 points.
            Complete all 5 levels to achieve Memory Master status.
            60-second timed challenge with best score saved locally.
          </p>
        </section>

        {/* Stats Board */}
        <div className="grid grid-cols-8 gap-3 mb-4 h-[88px]">
          <StatCard icon={<Target className="text-blue-600" />} value={score} label="Score" isDark={isDarkMode} />
          <StatCard icon={<Trophy className="text-yellow-600" />} value={bestScore} label="Best" isDark={isDarkMode} />
          <StatCard icon={<Timer className={timeRemaining <= 10 ? 'text-red-600' : 'text-green-600'} />} value={`${timeRemaining}s`} label="Time" isDark={isDarkMode} />
          <StatCard icon={<Award className="text-purple-600" />} value={`${currentLevel}/5`} label="Level" isDark={isDarkMode} />
          <StatCard icon={<Hash className="text-emerald-600" />} value={`${digitCount}/${maxDigitsForLevel}`} label="Digits" isDark={isDarkMode} />
          <StatCard icon={<BarChart3 className="text-amber-600" />} value={getAccuracy()} label="Accuracy" unit="%" isDark={isDarkMode} />
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
                aria-label="Reset number recall drill"
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

          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 sm:p-8">
            
            {/* ============ START SCREEN ============ */}
            {gameState === 'start' && (
              <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
                <div className={`rounded-2xl p-6 sm:p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                  <div className="mb-4">
                    <Hash className="w-16 h-16 text-emerald-500 mx-auto" aria-hidden="true" />
                  </div>
                  <h2 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Number Recall
                  </h2>
                  <p className={`mb-2 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    60-second challenge • +3 per success • 5 levels
                  </p>
                  <p className={`mb-6 text-sm ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Digits flash one at a time. Memorize the sequence and type it back. Progress from 4 to 49 digits across 5 levels.
                  </p>
                  <button 
                    onClick={startGame}
                    className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-semibold hover:shadow-lg w-full transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                    aria-label="Start number recall drill"
                  >
                    Start Drill
                  </button>
                </div>
              </div>
            )}

            {/* ============ MEMORY MASTER SCREEN ============ */}
            {gameState === 'memoryMaster' && (
              <div className="text-center">
                <Crown className="w-24 h-24 text-yellow-500 mx-auto mb-4 animate-pulse" aria-hidden="true" />
                <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${isBoxDarkMode ? 'text-yellow-400' : 'text-yellow-600'}`}>
                  🏆 Memory Master!
                </h2>
                <p className={`mb-6 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  You completed all 5 levels with 49 digits! Outstanding working memory!
                </p>
                <button 
                  onClick={resetGame} 
                  className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-semibold hover:shadow-lg transition focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                >
                  Play Again
                </button>
              </div>
            )}

            {/* ============ SHOWING SCREEN ============ */}
            {gameState === 'showing' && (
              <div className="text-center">
                <div className="text-[100px] sm:text-[120px] md:text-[150px] font-black tracking-tighter text-emerald-500 select-none">
                  {displayDigit}
                </div>
                <div className="mt-6 flex gap-2 justify-center">
                  {sequence.split('').map((_, i) => (
                    <div 
                      key={i} 
                      className={`w-2.5 h-2.5 rounded-full transition-colors duration-200 ${
                        i < sequence.indexOf(displayDigit) + 1 && displayDigit !== ''
                          ? 'bg-emerald-500' 
                          : isBoxDarkMode ? 'bg-zinc-800' : 'bg-zinc-200'
                      }`}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className={`mt-4 text-sm ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {digitCount} digits • Level {currentLevel}
                </p>
              </div>
            )}

            {/* ============ INPUT SCREEN ============ */}
            {gameState === 'input' && (
              <div className="w-full max-w-md">
                <form onSubmit={handleSubmit}>
                  <input
                    ref={inputRef}
                    type="text"
                    pattern="\d*"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value.replace(/\D/g, ''))}
                    className={`w-full bg-transparent border-b-4 border-emerald-500 text-3xl sm:text-4xl font-black text-center outline-none py-4 mb-6 tracking-[0.2rem] ${isBoxDarkMode ? 'text-white placeholder-gray-600' : 'text-gray-900 placeholder-gray-300'}`}
                    placeholder={Array(digitCount).fill('?').join('')}
                    autoFocus
                    maxLength={digitCount}
                    aria-label={`Type the ${digitCount}-digit sequence`}
                  />
                  <button 
                    type="submit"
                    className={`w-full py-3 rounded-xl font-bold text-lg transition-all ${isBoxDarkMode ? 'bg-white text-zinc-900 hover:bg-gray-200' : 'bg-zinc-900 text-white hover:bg-zinc-800'} focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2`}
                    aria-label="Submit your answer"
                  >
                    SUBMIT
                  </button>
                </form>
                <div className="mt-4 flex justify-center items-center gap-2">
                  <Heart className={`w-5 h-5 ${lives > 0 ? 'text-red-500' : 'text-gray-400'}`} />
                  <span className={`text-sm ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {lives}/3 Lives Remaining
                  </span>
                </div>
              </div>
            )}

            {/* ============ SUCCESS SCREEN ============ */}
            {gameState === 'success' && (
              <div className="text-center">
                <div className="text-6xl mb-3">✅</div>
                <h2 className={`text-2xl sm:text-3xl font-bold ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Correct! +3</h2>
              </div>
            )}

            {/* ============ FAIL SCREEN ============ */}
            {gameState === 'fail' && (
              <div className="text-center">
                <div className="text-6xl mb-3">❌</div>
                <h2 className={`text-2xl sm:text-3xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Incorrect</h2>
                <p className={`${isBoxDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Sequence: <span className="font-bold text-rose-500 tracking-wider">{sequence}</span>
                </p>
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
                    Keep practicing to improve your digit span and working memory capacity.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <ResultCard label="Final Score" value={score} icon={<Target className="w-4 h-4" />} color="yellow" isDark={isBoxDarkMode} />
                    <ResultCard label="Best Score" value={bestScore} icon={<Trophy className="w-4 h-4" />} color="yellow" isDark={isBoxDarkMode} />
                    <ResultCard label="Accuracy" value={getAccuracy()} unit="%" icon={<BarChart3 className="w-4 h-4" />} color="purple" isDark={isBoxDarkMode} />
                    <ResultCard label="Max Level" value={`${currentLevel}/5`} icon={<Award className="w-4 h-4" />} color="emerald" isDark={isBoxDarkMode} />
                    <ResultCard label="Max Digits" value={digitCount} icon={<Hash className="w-4 h-4" />} color="blue" isDark={isBoxDarkMode} />
                    <ResultCard label="Best Combo" value={`${bestCombo}x`} icon={<Zap className="w-4 h-4" />} color="orange" isDark={isBoxDarkMode} />
                  </div>
                  
                  <div className="flex gap-3">
                    <Link href="/drills/cognitive" className="flex-1">
                      <span className={`block w-full px-4 py-2.5 rounded-lg font-semibold transition-all text-center ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                        ← Back to Drills
                      </span>
                    </Link>
                    <button 
                      onClick={startGame}
                      className="flex-1 px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
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
                  <Info className={`w-4 h-4 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`} aria-hidden="true" />
                  <h2 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Drill Rules & Scoring</h2>
                </div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">1</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Watch and <span className="font-semibold text-emerald-500">memorize the digit sequence</span> one at a time</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">2</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Success: <span className="font-semibold text-green-500">+3 points</span> per correct sequence</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">3</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Mistake: <span className="font-semibold text-red-500">-1 life</span> • 3 lives total</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">4</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>At 0 lives: <span className="font-semibold text-orange-500">-3 point penalty</span> per mistake</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">5</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Progress: L1 → L2 → L3 → L4 → <span className="font-semibold text-purple-500">L5 (Memory Master)</span></p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">6</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>🔢 L1: 4→9 • L2: 8→16 • L3: 15→25 • L4: 25→36 • <span className="font-semibold text-yellow-500">L5: 36→49</span></p>
                    </div>
                  </div>
                </div>
                <div className={`mt-4 pt-3 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs ${isDarkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'}`}>
                  <span>🎵 Audio tones for multi-sensory encoding • 800ms display per digit</span>
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
    emerald: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-500', icon: 'text-emerald-500' },
    blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-500', icon: 'text-blue-500' },
    orange: { bg: 'bg-orange-500/10', border: 'border-orange-500/30', text: 'text-orange-500', icon: 'text-orange-500' },
    green: { bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-500', icon: 'text-green-500' },
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