'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Target, Zap, Timer, Trophy, Heart, 
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, Eye,
  BarChart3, Info, Layers, Circle, Hash, RefreshCw
} from 'lucide-react';

export default function DividedAttentionClient() {
  const [gameState, setGameState] = useState('start');
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [bestCombo, setBestCombo] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(60);
  const [lives, setLives] = useState(5);
  
  // Task 1: Visual Tracking (Ball)
  const [currentTarget, setCurrentTarget] = useState(null);
  const [visualHits, setVisualHits] = useState(0);
  
  // Task 2: Cognitive Stream (Numbers)
  const [currentNumber, setCurrentNumber] = useState(null);
  const [numberHits, setNumberHits] = useState(0);
  const [missedCount, setMissedCount] = useState(0);
  const [wrongMatches, setWrongMatches] = useState(0);
  
  // UI State
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isBoxDarkMode, setIsBoxDarkMode] = useState(true);
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  
  // Refs for values that shouldn't trigger re-renders
  const gameContainerRef = useRef(null);
  const numberIntervalRef = useRef(null);
  const ballIntervalRef = useRef(null);
  const timerRef = useRef(null);
  const prevNumberRef = useRef(null);
  const wasMatchedRef = useRef(true);
  const scoreRef = useRef(0);
  const comboRef = useRef(0);
  const livesRef = useRef(5);
  const feedbackTimeoutRef = useRef(null);
  const audioCtxRef = useRef(null);
  const gameStateRef = useRef('start');
  const soundEnabledRef = useRef(true);
  const currentTargetRef = useRef(null);
  const currentNumberRef = useRef(null);
  const bestComboRef = useRef(0);

  // Mark as client-side rendered
  useEffect(() => {
    setIsClient(true);
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  // Sync states to refs
  useEffect(() => {
    gameStateRef.current = gameState;
  }, [gameState]);

  useEffect(() => {
    soundEnabledRef.current = soundEnabled;
  }, [soundEnabled]);

  useEffect(() => {
    currentTargetRef.current = currentTarget;
  }, [currentTarget]);

  useEffect(() => {
    currentNumberRef.current = currentNumber;
  }, [currentNumber]);

  useEffect(() => {
    bestComboRef.current = bestCombo;
  }, [bestCombo]);

  // Load best score
  useEffect(() => {
    try {
      const savedBestScore = localStorage.getItem('dividedAttentionDrillBestScore');
      if (savedBestScore) {
        const parsed = parseInt(savedBestScore, 10);
        if (!isNaN(parsed)) setBestScore(parsed);
      }
    } catch (e) { /* localStorage not available */ }
  }, []);

  // Update best score
  useEffect(() => {
    if (gameState === 'ended' && score > bestScore) {
      setBestScore(score);
      try {
        localStorage.setItem('dividedAttentionDrillBestScore', score.toString());
      } catch (e) { /* localStorage not available */ }
    }
  }, [gameState, score, bestScore]);

  useEffect(() => {
    const handleFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = useCallback(async () => {
    try {
      if (!isFullscreen) {
        await gameContainerRef.current?.requestFullscreen();
      } else {
        if (document.fullscreenElement) {
          await document.exitFullscreen();
        }
      }
    } catch (err) {
      console.error(err);
    }
  }, [isFullscreen]);

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
    if (!soundEnabledRef.current) return;
    try {
      const audioCtx = initAudio();
      if (!audioCtx) return;
      
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      
      const now = audioCtx.currentTime;
      const freqMap = { correct: 880, wrong: 440, penalty: 220, combo: 1046.5 };
      
      osc.frequency.setValueAtTime(freqMap[type] || 660, now);
      gain.gain.setValueAtTime(type === 'combo' ? 0.12 : type === 'penalty' ? 0.15 : 0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      osc.start(now);
      osc.stop(now + 0.15);
    } catch (error) { /* Audio not supported */ }
  }, [initAudio]);

  const getAccuracy = useCallback(() => {
    const total = visualHits + numberHits + missedCount + wrongMatches;
    if (total === 0) return 100;
    return Math.round(((visualHits + numberHits) / total) * 100);
  }, [visualHits, numberHits, missedCount, wrongMatches]);

  // Core game functions using refs to avoid dependency changes
  const handleMiss = useCallback((reason) => {
    if (gameStateRef.current !== 'playing') return;
    
    setMissedCount(prev => prev + 1);
    comboRef.current = 0;
    setCombo(0);
    
    if (livesRef.current > 0) {
      livesRef.current -= 1;
      setLives(livesRef.current);
      playSound('wrong');
      showFeedback(`✗ ${reason}! -1 life`, 'error');
    }
    
    if (livesRef.current === 0) {
      scoreRef.current = Math.max(0, scoreRef.current - 2);
      setScore(scoreRef.current);
      playSound('penalty');
      showFeedback(`✗ ${reason}! -2 points`, 'error');
    }
  }, [playSound, showFeedback]);

  const spawnNewBall = useCallback(() => {
    if (ballIntervalRef.current) {
      clearTimeout(ballIntervalRef.current);
      ballIntervalRef.current = null;
    }
    
    const newTarget = { 
      id: Date.now(), 
      x: Math.random() * 80 + 10, 
      y: Math.random() * 70 + 15 
    };
    
    setCurrentTarget(newTarget);
    
    ballIntervalRef.current = setTimeout(() => {
      if (gameStateRef.current === 'playing') {
        handleMiss('Ball Miss');
        spawnNewBall();
      }
    }, 1200);
  }, [handleMiss]);

  const handleVisualClick = useCallback((e) => {
    e.stopPropagation();
    if (gameStateRef.current !== 'playing' || !currentTargetRef.current) return;
    
    setVisualHits(prev => prev + 1);
    scoreRef.current += 2;
    setScore(scoreRef.current);
    comboRef.current++;
    setCombo(comboRef.current);
    
    if (comboRef.current > bestComboRef.current) {
      setBestCombo(comboRef.current);
    }
    
    if (comboRef.current % 5 === 0) {
      playSound('combo');
      showFeedback(`🔥 ${comboRef.current}x Combo!`, 'success');
    } else {
      playSound('correct');
      showFeedback('✓ +2', 'success');
    }
    
    // Clear existing timeout and spawn new ball
    if (ballIntervalRef.current) {
      clearTimeout(ballIntervalRef.current);
      ballIntervalRef.current = null;
    }
    spawnNewBall();
  }, [playSound, showFeedback, spawnNewBall]);

  const startNumberStream = useCallback(() => {
    if (numberIntervalRef.current) {
      clearTimeout(numberIntervalRef.current);
      numberIntervalRef.current = null;
    }
    
    // Check if previous number was missed (even number that wasn't matched)
    const prevNum = currentNumberRef.current;
    if (prevNum !== null && prevNum % 2 === 0 && !wasMatchedRef.current) {
      handleMiss('Number Miss');
    }

    let nextNum;
    do {
      nextNum = Math.floor(Math.random() * 10);
    } while (nextNum === prevNumberRef.current);
    
    prevNumberRef.current = nextNum;
    wasMatchedRef.current = false;
    setCurrentNumber(nextNum);
    
    numberIntervalRef.current = setTimeout(() => {
      if (gameStateRef.current === 'playing') {
        startNumberStream();
      }
    }, 1200);
  }, [handleMiss]);

  const handleNumberCheck = useCallback(() => {
    if (gameStateRef.current !== 'playing') return;
    
    const prevNum = currentNumberRef.current;
    const isCorrect = prevNum !== null && prevNum % 2 === 0;

    if (isCorrect) {
      setNumberHits(prev => prev + 1);
      scoreRef.current += 2;
      setScore(scoreRef.current);
      comboRef.current++;
      setCombo(comboRef.current);
      
      if (comboRef.current > bestComboRef.current) {
        setBestCombo(comboRef.current);
      }
      
      wasMatchedRef.current = true;
      
      if (comboRef.current % 5 === 0) {
        playSound('combo');
        showFeedback(`🔥 ${comboRef.current}x Combo!`, 'success');
      } else {
        playSound('correct');
        showFeedback('✓ +2', 'success');
      }
    } else {
      setWrongMatches(prev => prev + 1);
      handleMiss('Wrong Match');
    }
  }, [playSound, showFeedback, handleMiss]);

  // Main Game Loop - Fixed: only runs when gameState changes to 'playing'
  useEffect(() => {
    if (gameState === 'playing') {
      // Start the game loops
      spawnNewBall();
      startNumberStream();
    }
    
    return () => {
      // Cleanup when gameState changes
      if (numberIntervalRef.current) {
        clearTimeout(numberIntervalRef.current);
        numberIntervalRef.current = null;
      }
      if (ballIntervalRef.current) {
        clearTimeout(ballIntervalRef.current);
        ballIntervalRef.current = null;
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState]);

  // Timer
  useEffect(() => {
    if (gameState !== 'playing') return;
    
    timerRef.current = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          setGameState('ended');
          gameStateRef.current = 'ended';
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [gameState]);

  // Cleanup when game ends
  useEffect(() => {
    if (gameState === 'ended') {
      if (numberIntervalRef.current) {
        clearTimeout(numberIntervalRef.current);
        numberIntervalRef.current = null;
      }
      if (ballIntervalRef.current) {
        clearTimeout(ballIntervalRef.current);
        ballIntervalRef.current = null;
      }
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  }, [gameState]);

  const startGame = useCallback(() => {
    // Clean up any existing intervals/timeouts
    if (timerRef.current) clearInterval(timerRef.current);
    if (numberIntervalRef.current) clearTimeout(numberIntervalRef.current);
    if (ballIntervalRef.current) clearTimeout(ballIntervalRef.current);
    
    // Reset refs
    timerRef.current = null;
    numberIntervalRef.current = null;
    ballIntervalRef.current = null;
    
    // Reset game state refs
    scoreRef.current = 0;
    comboRef.current = 0;
    livesRef.current = 5;
    prevNumberRef.current = null;
    wasMatchedRef.current = true;
    
    // Reset state
    setScore(0);
    setCombo(0);
    setBestCombo(0);
    setTimeRemaining(60);
    setVisualHits(0);
    setNumberHits(0);
    setMissedCount(0);
    setWrongMatches(0);
    setLives(5);
    setFeedback('');
    setCurrentTarget(null);
    setCurrentNumber(null);
    
    // Set game state last to trigger the main game loop
    gameStateRef.current = 'playing';
    setGameState('playing');
    
    playSound('correct');
  }, [playSound]);

  const resetGame = useCallback(() => {
    // Clean up everything
    if (timerRef.current) clearInterval(timerRef.current);
    if (numberIntervalRef.current) clearTimeout(numberIntervalRef.current);
    if (ballIntervalRef.current) clearTimeout(ballIntervalRef.current);
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    
    timerRef.current = null;
    numberIntervalRef.current = null;
    ballIntervalRef.current = null;
    
    // Reset refs
    scoreRef.current = 0;
    comboRef.current = 0;
    livesRef.current = 5;
    
    // Reset state
    gameStateRef.current = 'start';
    setGameState('start');
    setScore(0);
    setCombo(0);
    setBestCombo(0);
    setTimeRemaining(60);
    setVisualHits(0);
    setNumberHits(0);
    setMissedCount(0);
    setWrongMatches(0);
    setLives(5);
    setFeedback('');
    setCurrentTarget(null);
    setCurrentNumber(null);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (numberIntervalRef.current) clearTimeout(numberIntervalRef.current);
      if (ballIntervalRef.current) clearTimeout(ballIntervalRef.current);
      if (timerRef.current) clearInterval(timerRef.current);
      if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    };
  }, []);

  if (loading || !isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading divided attention drill...</p>
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
            "name": "Divided Attention Drill",
            "url": "https://skilldrills.online/drills/cognitive/attention/divided-attention",
            "description": "Dual-task cognitive training drill combining visual tracking (click moving balls) with number matching (identify even numbers). 60-second challenge with 5 lives, combo streaks, and dual scoring for multitasking improvement.",
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
            "educationalUse": ["Divided Attention", "Multitasking", "Cognitive Training", "Visual Tracking"],
            "learningResourceType": "Interactive Exercise",
            "timeRequired": "PT60S",
            "interactivityType": "active",
            "inLanguage": "en-US",
            "teaches": ["Divided Attention", "Visual Tracking", "Number Recognition", "Dual-Task Processing"]
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
              Attention
            </li>
            <li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} aria-hidden="true">/</li>
            <li className={`font-medium ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} aria-current="page">
              Divided Attention
            </li>
          </ol>
        </nav>
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex-shrink-0">
              <Layers className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className={`text-2xl sm:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Divided Attention
              </h1>
              <p className={`text-sm sm:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Dual-task training • Track ball + Match even numbers • 60-second challenge
              </p>
            </div>
          </div>
          
          <div className="flex gap-2 flex-shrink-0">
            {gameState === 'playing' && (
              <button 
                onClick={resetGame} 
                className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-100'}`} 
                title="Reset session"
                aria-label="Reset divided attention drill"
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
          <h2>Divided Attention - Dual-Task Cognitive Training</h2>
          <p>
            Train your multitasking and divided attention skills with this dual-task cognitive drill.
            Task 1: Click moving blue balls that spawn randomly across the screen (+2 points per hit).
            Task 2: Press MATCH when the displayed number is EVEN (+2 points per correct match).
            Manage both tasks simultaneously in a 60-second challenge with 5 lives.
            Misses cost 1 life; at 0 lives, each mistake deducts 2 points.
            Build combo streaks with 5x combo sound notifications.
          </p>
        </section>

        {/* Stats Board */}
        <div className="grid grid-cols-8 gap-3 mb-4 h-[88px]">
          <StatCard icon={<Target className="text-blue-600" />} value={score} label="Score" isDark={isDarkMode} />
          <StatCard icon={<Trophy className="text-yellow-600" />} value={bestScore} label="Best" isDark={isDarkMode} />
          <StatCard icon={<Timer className={timeRemaining <= 10 ? 'text-red-600' : 'text-green-600'} />} value={`${timeRemaining}s`} label="Time" isDark={isDarkMode} />
          <StatCard icon={<Circle className="text-blue-500" />} value={visualHits} label="Ball" isDark={isDarkMode} />
          <StatCard icon={<Hash className="text-indigo-500" />} value={numberHits} label="Number" isDark={isDarkMode} />
          <StatCard icon={<BarChart3 className="text-purple-600" />} value={getAccuracy()} label="Accuracy" unit="%" isDark={isDarkMode} />
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
          ref={gameContainerRef} 
          className={`relative overflow-hidden ${isFullscreen ? 'fixed inset-0 z-50' : 'rounded-xl border-2'}`} 
          style={{ 
            background: isBoxDarkMode ? '#0a0a0a' : '#ffffff', 
            aspectRatio: isFullscreen ? 'auto' : '16/9', 
            maxWidth: '100%', 
            margin: '0 auto', 
            borderColor: isDarkMode ? '#374151' : '#e5e7eb' 
          }}
        >
          {/* Fullscreen Controls */}
          {isFullscreen && gameState === 'playing' && (
            <div className="absolute top-4 right-4 z-30 flex gap-3">
              <button 
                onClick={resetGame} 
                className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all" 
                title="Reset session"
                aria-label="Reset divided attention drill"
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

          {/* Ball Tracking Area */}
          <div className={`absolute inset-0 ${isFullscreen ? 'right-80' : ''}`}>
            {gameState === 'playing' && currentTarget && (
              <button 
                onClick={handleVisualClick} 
                className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10 transition-all duration-300 focus:outline-none"
                style={{ left: `${currentTarget.x}%`, top: `${currentTarget.y}%` }}
                aria-label="Click the blue ball"
              >
                <div className={`relative flex items-center justify-center ${isFullscreen ? 'w-28 h-28' : 'w-20 h-20'} hover:scale-110 transition-transform`}>
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-400 to-blue-600 shadow-[0_0_30px_rgba(37,99,235,0.4)] border-3 border-white/20"></div>
                </div>
              </button>
            )}
          </div>

          {/* Number Matching Panel */}
          <div 
            className={`absolute top-0 right-0 h-full flex flex-col p-6 z-30 ${isFullscreen ? 'w-80 border-l border-white/10 bg-black/40 backdrop-blur-3xl' : 'w-64 border-l border-gray-200 dark:border-gray-700'}`} 
            style={{ background: isFullscreen ? undefined : (isBoxDarkMode ? '#1a1a1a' : '#f9fafb') }}
          >
            <div className="flex-1 flex flex-col items-center justify-center space-y-6">
              <h3 className={`text-lg sm:text-xl font-bold ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Match <span className="text-blue-500">Even</span>
              </h3>
              <div className={`relative flex items-center justify-center ${isFullscreen ? 'w-36 h-36 text-6xl' : 'w-32 h-32 text-5xl'} font-bold rounded-xl border-3 ${isBoxDarkMode ? 'border-blue-500/30 text-blue-400' : 'border-blue-500/30 text-blue-600'}`} aria-live="polite">
                {currentNumber !== null ? currentNumber : '?'}
              </div>
              <button 
                onClick={handleNumberCheck} 
                disabled={gameState !== 'playing'} 
                className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold text-lg active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-label="Press to match if number is even"
              >
                MATCH
              </button>
              <p className={`text-xs text-center ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Press only when number is EVEN
              </p>
            </div>
          </div>

          {/* ============ START SCREEN ============ */}
          {gameState === 'start' && (
            <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
              <div className={`rounded-2xl p-6 sm:p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <div className="mb-4">
                  <Layers className="w-16 h-16 text-blue-500 mx-auto" aria-hidden="true" />
                </div>
                <h2 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Divided Attention
                </h2>
                <p className={`mb-2 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  60-second dual-task challenge
                </p>
                <p className={`mb-6 text-sm ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Click moving blue balls (+2pts) while matching even numbers (+2pts). 5 lives protect your score. Build combos for bonus notifications.
                </p>
                <button 
                  onClick={startGame} 
                  className="px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg w-full transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  aria-label="Start divided attention training"
                >
                  Start Drill
                </button>
              </div>
            </div>
          )}

          {/* ============ GAME OVER SCREEN ============ */}
          {gameState === 'ended' && (
            <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
              <div className={`rounded-2xl p-6 sm:p-8 shadow-xl border w-full max-w-[480px] mx-4 ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Timer className="w-10 h-10 text-orange-500" aria-hidden="true" />
                  <h2 className={`text-2xl font-bold ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Time&apos;s Up!
                  </h2>
                </div>
                
                <p className={`text-center text-sm mb-6 ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Keep practicing to improve your dual-task processing and divided attention skills.
                </p>
                
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <ResultCard label="Final Score" value={score} icon={<Target className="w-4 h-4" />} color="yellow" isDark={isBoxDarkMode} />
                  <ResultCard label="Best Score" value={bestScore} icon={<Trophy className="w-4 h-4" />} color="yellow" isDark={isBoxDarkMode} />
                  <ResultCard label="Accuracy" value={getAccuracy()} unit="%" icon={<BarChart3 className="w-4 h-4" />} color="purple" isDark={isBoxDarkMode} />
                  <ResultCard label="Ball Hits" value={visualHits} icon={<Circle className="w-4 h-4" />} color="blue" isDark={isBoxDarkMode} />
                  <ResultCard label="Number Hits" value={numberHits} icon={<Hash className="w-4 h-4" />} color="indigo" isDark={isBoxDarkMode} />
                  <ResultCard label="Max Combo" value={`${bestCombo}x`} icon={<Zap className="w-4 h-4" />} color="orange" isDark={isBoxDarkMode} />
                </div>
                
                <div className="flex gap-3">
                  <Link href="/drills/cognitive" className="flex-1">
                    <span className={`block w-full px-4 py-2.5 rounded-lg font-semibold transition-all text-center ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                      ← Back to Drills
                    </span>
                  </Link>
                  <button 
                    onClick={startGame} 
                    className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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
                  <Info className={`w-4 h-4 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} aria-hidden="true" />
                  <h2 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Drill Rules & Scoring</h2>
                </div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">1</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Click <span className="font-semibold text-blue-500">moving blue balls</span> • +2 points per hit</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-indigo-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">2</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Press MATCH when number is <span className="font-semibold text-indigo-500">EVEN only</span> • +2 points</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">3</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Build combos • <span className="font-semibold text-green-500">5x combo bonus notification</span></p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">4</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Any miss/wrong: <span className="font-semibold text-red-500">-1 life</span> • 5 lives total</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">5</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>At 0 lives: <span className="font-semibold text-orange-500">-2 point penalty</span> per mistake</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">6</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Challenge: <span className="font-semibold text-purple-500">60 seconds</span> dual-task processing</p>
                    </div>
                  </div>
                </div>
                <div className={`mt-4 pt-3 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs ${isDarkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'}`}>
                  <span>🎯 Ball spawns every 1.2s • Number changes every 1.2s</span>
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
    indigo: { bg: 'bg-indigo-500/10', border: 'border-indigo-500/30', text: 'text-indigo-500', icon: 'text-indigo-500' },
    red: { bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-500', icon: 'text-red-500' },
    orange: { bg: 'bg-orange-500/10', border: 'border-orange-500/30', text: 'text-orange-500', icon: 'text-orange-500' },
    amber: { bg: 'bg-amber-500/10', border: 'border-amber-500/30', text: 'text-amber-500', icon: 'text-amber-500' },
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