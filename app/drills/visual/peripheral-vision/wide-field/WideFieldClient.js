'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Zap, Clock, Award, Activity, 
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, 
  Eye, Timer, Brain, Target, Trophy, X, Info, Check, Heart, RefreshCw
} from 'lucide-react';

export default function WideFieldClient() {
  const containerRef = useRef(null);
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
  const [lives, setLives] = useState(3);
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  
  const [currentChar, setCurrentChar] = useState('A');
  const [isFlashing, setIsFlashing] = useState(false);
  const [flashPosition, setFlashPosition] = useState({ top: '20%', left: '20%' });
  const [isRecallMode, setIsRecallMode] = useState(false);
  const [recallInput, setRecallInput] = useState('');
  const [recallResults, setRecallResults] = useState([]);
  const [totalFlashes, setTotalFlashes] = useState(0);
  const [recallCount, setRecallCount] = useState(3);
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  
  const streakRef = useRef(0);
  const scoreRef = useRef(0);
  const livesRef = useRef(3);
  const flashTimeoutRef = useRef(null);
  const cycleTimeoutRef = useRef(null);
  const timerIntervalRef = useRef(null);
  const feedbackTimeoutRef = useRef(null);
  const isActiveRef = useRef(false);
  const gameStateRef = useRef('start');
  const audioCtxRef = useRef(null);
  const flashHistoryRef = useRef([]);
  const isRecallActiveRef = useRef(false);
  const flashesSinceLastRecallRef = useRef(0);
  const bestStreakRef = useRef(0);
  
  const positions = useRef([
    { top: '12%', left: '12%' },
    { top: '12%', left: '88%' },
    { top: '88%', left: '12%' },
    { top: '88%', left: '88%' }
  ]).current;
  
  const characters = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

  // Mark as client-side rendered
  useEffect(() => {
    setIsClient(true);
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    try {
      const savedBestScore = localStorage.getItem('wideFieldBestScore');
      if (savedBestScore) {
        const parsed = parseInt(savedBestScore, 10);
        if (!isNaN(parsed)) setBestScore(parsed);
      }
    } catch (e) { /* localStorage not available */ }
  }, []);

  const updateBestScore = useCallback((finalScore) => {
    try {
      const currentBestScore = parseInt(localStorage.getItem('wideFieldBestScore') || '0', 10);
      if (finalScore > currentBestScore) {
        localStorage.setItem('wideFieldBestScore', finalScore.toString());
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
    setFeedback(message);
    setFeedbackType(type);
    feedbackTimeoutRef.current = setTimeout(() => {
      setFeedback('');
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
      const freqMap = { correct: 880, miss: 440, streak: 1046.5, recall: 660 };
      
      osc.frequency.setValueAtTime(freqMap[type] || 440, now);
      gain.gain.setValueAtTime(type === 'miss' ? 0.08 : 0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      osc.start(now);
      osc.stop(now + 0.12);
    } catch (e) { /* Audio not supported */ }
  }, [soundEnabled, initAudio]);

  // Timer effect
  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      timerIntervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setGameState('gameOver');
            gameStateRef.current = 'gameOver';
            isActiveRef.current = false;
            isRecallActiveRef.current = false;
            if (flashTimeoutRef.current) clearTimeout(flashTimeoutRef.current);
            if (cycleTimeoutRef.current) clearTimeout(cycleTimeoutRef.current);
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

  const continueFlashing = useCallback(() => {
    if (gameStateRef.current !== 'playing' || !isActiveRef.current) return;
    if (isRecallActiveRef.current) return;
    
    if (cycleTimeoutRef.current) clearTimeout(cycleTimeoutRef.current);
    cycleTimeoutRef.current = setTimeout(() => {
      flashCharacter();
    }, 400);
  }, []);

  const closeRecallAndContinue = useCallback(() => {
    isRecallActiveRef.current = false;
    setIsRecallMode(false);
    setRecallResults([]);
    flashesSinceLastRecallRef.current = 0;
    
    if (isActiveRef.current && gameStateRef.current === 'playing') {
      continueFlashing();
    }
  }, [continueFlashing]);

  const startRecallMode = useCallback(() => {
    if (!isActiveRef.current) return;
    if (isRecallActiveRef.current) return;
    
    const historyLength = flashHistoryRef.current.length;
    let askCount = 1;
    
    if (historyLength >= 3) {
      askCount = Math.floor(Math.random() * 3) + 1;
    } else if (historyLength === 2) {
      askCount = Math.floor(Math.random() * 2) + 1;
    } else {
      askCount = 1;
    }
    
    setRecallCount(askCount);
    isRecallActiveRef.current = true;
    setIsRecallMode(true);
    setRecallInput('');
    setRecallResults([]);
    playSound('recall');
    
    setTimeout(() => {
      const input = document.getElementById('recall-input');
      if (input) input.focus();
    }, 100);
  }, [playSound]);

  const checkRecallAnswer = useCallback(() => {
    const historyLength = flashHistoryRef.current.length;
    const askCount = Math.min(recallCount, historyLength);
    const lastFlashes = flashHistoryRef.current.slice(-askCount);
    
    const userChars = recallInput.toUpperCase().split('').slice(0, askCount);
    
    const results = lastFlashes.map((flash, idx) => ({
      correct: flash.char,
      user: userChars[idx] || '',
      isCorrect: userChars[idx] === flash.char
    }));
    
    setRecallResults(results);
    
    const correctCount = results.filter(r => r.isCorrect).length;
    const allCorrect = correctCount === askCount;
    
    if (allCorrect) {
      const pointsEarned = askCount;
      scoreRef.current += pointsEarned;
      setScore(scoreRef.current);
      
      const newStreak = streakRef.current + 1;
      streakRef.current = newStreak;
      setStreak(newStreak);
      
      if (newStreak > bestStreakRef.current) {
        bestStreakRef.current = newStreak;
        setBestStreak(bestStreakRef.current);
      }
      
      if (newStreak % 5 === 0 && newStreak > 0) {
        playSound('streak');
        showFeedback(`🔥 ${newStreak} Streak! +${pointsEarned}`, 'success');
      } else {
        playSound('correct');
        showFeedback(`✓ Perfect! +${pointsEarned}`, 'success');
      }
    } else if (correctCount > 0) {
      const pointsEarned = correctCount;
      scoreRef.current += pointsEarned;
      setScore(scoreRef.current);
      
      streakRef.current = 0;
      setStreak(0);
      
      if (livesRef.current > 0) {
        livesRef.current -= 1;
        setLives(livesRef.current);
        playSound('miss');
        showFeedback(`✗ ${correctCount}/${askCount} correct! +${pointsEarned} but -1 life`, 'error');
      }
    } else {
      streakRef.current = 0;
      setStreak(0);
      
      if (livesRef.current > 0) {
        livesRef.current -= 1;
        setLives(livesRef.current);
        playSound('miss');
        showFeedback('✗ Incorrect! -1 life', 'error');
      }
    }
    
    setTimeout(() => {
      closeRecallAndContinue();
    }, 1500);
  }, [recallCount, recallInput, playSound, showFeedback, closeRecallAndContinue]);

  const handleRecallKeyPress = useCallback((e) => {
    if (e.key === 'Enter') {
      checkRecallAnswer();
    }
  }, [checkRecallAnswer]);

  const flashCharacter = useCallback(() => {
    if (gameStateRef.current !== 'playing' || !isActiveRef.current) return;
    if (isRecallActiveRef.current) return;
    
    const pos = positions[Math.floor(Math.random() * positions.length)];
    const char = characters[Math.floor(Math.random() * characters.length)];
    
    setFlashPosition(pos);
    setCurrentChar(char);
    setIsFlashing(true);
    
    const flashData = { char, timestamp: Date.now() };
    flashHistoryRef.current.push(flashData);
    if (flashHistoryRef.current.length > 10) {
      flashHistoryRef.current.shift();
    }
    
    setTotalFlashes(prev => prev + 1);
    flashesSinceLastRecallRef.current++;
    
    if (flashTimeoutRef.current) clearTimeout(flashTimeoutRef.current);
    
    flashTimeoutRef.current = setTimeout(() => {
      setIsFlashing(false);
      
      const hasEnoughFlashes = flashesSinceLastRecallRef.current >= 3;
      const shouldRecall = !isRecallActiveRef.current && 
                          flashHistoryRef.current.length >= 1 &&
                          hasEnoughFlashes &&
                          Math.random() < 0.12;
      
      if (shouldRecall && !isRecallActiveRef.current) {
        startRecallMode();
      } else if (!isRecallActiveRef.current) {
        continueFlashing();
      }
    }, 400);
  }, [positions, characters, startRecallMode, continueFlashing]);

  const startGame = useCallback(() => {
    setGameState('playing');
    gameStateRef.current = 'playing';
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setTimeLeft(60);
    setLives(3);
    setFeedback('');
    setIsFlashing(false);
    setIsRecallMode(false);
    setRecallInput('');
    setRecallResults([]);
    setTotalFlashes(0);
    
    streakRef.current = 0;
    scoreRef.current = 0;
    livesRef.current = 3;
    bestStreakRef.current = 0;
    flashHistoryRef.current = [];
    isActiveRef.current = true;
    isRecallActiveRef.current = false;
    flashesSinceLastRecallRef.current = 0;
    
    if (flashTimeoutRef.current) clearTimeout(flashTimeoutRef.current);
    if (cycleTimeoutRef.current) clearTimeout(cycleTimeoutRef.current);
    
    setTimeout(() => {
      if (isActiveRef.current && gameStateRef.current === 'playing') {
        flashCharacter();
      }
    }, 300);
  }, [flashCharacter]);

  const resetGame = useCallback(() => {
    isActiveRef.current = false;
    isRecallActiveRef.current = false;
    setGameState('start');
    gameStateRef.current = 'start';
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setTimeLeft(60);
    setLives(3);
    setFeedback('');
    setIsFlashing(false);
    setIsRecallMode(false);
    setRecallInput('');
    setRecallResults([]);
    setTotalFlashes(0);
    
    streakRef.current = 0;
    scoreRef.current = 0;
    livesRef.current = 3;
    bestStreakRef.current = 0;
    flashHistoryRef.current = [];
    flashesSinceLastRecallRef.current = 0;
    
    if (flashTimeoutRef.current) clearTimeout(flashTimeoutRef.current);
    if (cycleTimeoutRef.current) clearTimeout(cycleTimeoutRef.current);
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (flashTimeoutRef.current) clearTimeout(flashTimeoutRef.current);
      if (cycleTimeoutRef.current) clearTimeout(cycleTimeoutRef.current);
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    };
  }, []);

  const placeholderText = "_".repeat(recallCount);

  if (loading || !isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading wide field awareness drill...</p>
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
            "name": "Wide Field Awareness - Peripheral Vision Training",
            "url": "https://skilldrills.online/drills/visual/peripheral-vision/wide-field",
            "description": "Train peripheral vision by recalling characters flashed in 4 corner positions while fixating on center. Random 1-3 character recall quizzes with streak bonuses and 3 lives. 60-second challenge.",
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
            "educationalUse": ["Peripheral Vision", "Visual Memory", "Character Recognition", "Cognitive Training"],
            "learningResourceType": "Interactive Exercise",
            "timeRequired": "PT60S",
            "interactivityType": "active",
            "inLanguage": "en-US",
            "teaches": ["Wide Field Awareness", "Peripheral Character Detection", "Visual Memory", "Focus Training"]
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
              Peripheral Vision
            </li>
            <li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} aria-hidden="true">/</li>
            <li className={`font-medium ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} aria-current="page">
              Wide Field Awareness
            </li>
          </ol>
        </nav>
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex-shrink-0">
              <Eye className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className={`text-2xl sm:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Wide Field Awareness
              </h1>
              <p className={`text-sm sm:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Focus on center • Recall peripheral characters • 4 corner positions
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
          <h2>Wide Field Awareness - Peripheral Vision & Character Recall Training</h2>
          <p>
            Train your peripheral vision by recalling characters flashed in 4 corner positions while fixating on a center cross.
            Characters appear for 400ms at random corners (top-left, top-right, bottom-left, bottom-right).
            Random recall quizzes ask for the last 1-3 characters in order, testing visual memory and peripheral awareness.
            Perfect recall scores points equal to the number of characters. Partial recall scores points but loses 1 life.
            3 lives total with 5-streak bonus notifications. 60-second timed challenge with score tracking.
          </p>
        </section>

        {/* Stats Board */}
        <div className="grid grid-cols-6 gap-3 mb-4 h-[88px]">
          <StatCard icon={<Target className="text-blue-600" />} value={score} label="Score" isDark={isDarkMode} />
          <StatCard icon={<Trophy className="text-yellow-500" />} value={bestScore} label="Best" isDark={isDarkMode} />
          <StatCard icon={<Timer className={timeLeft < 15 ? 'text-red-600' : 'text-green-600'} />} value={timeLeft} label="Time" unit="s" isDark={isDarkMode} />
          <StatCard icon={<Zap className="text-orange-500" />} value={streak} label="Streak" isDark={isDarkMode} />
          <StatCard icon={<Eye className="text-cyan-500" />} value={totalFlashes} label="Flashes" isDark={isDarkMode} />
          <StatCard icon={<Heart className={lives > 0 ? 'text-red-500' : 'text-gray-500'} />} value={lives} label="Lives" isDark={isDarkMode} />
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
              <div className="absolute top-4 left-4 z-30 bg-black/50 backdrop-blur-sm rounded-lg px-4 py-2 text-white text-sm" aria-live="polite">
                Score: <span className="text-yellow-400 font-bold">{score}</span> | Flashes: <span className="text-cyan-400 font-bold">{totalFlashes}</span> | Lives: <span className="text-red-400 font-bold">{lives}</span>
              </div>
            </>
          )}

          {/* Center Fixation Cross */}
          <div 
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: '40px',
              color: isBoxDarkMode ? '#ffffff' : '#000000',
              fontFamily: 'monospace',
              userSelect: 'none',
              pointerEvents: 'none',
              zIndex: 10,
              opacity: 0.7
            }}
            aria-hidden="true"
          >
            +
          </div>

          {/* Flash Character */}
          {!isRecallMode && isFlashing && (
            <div 
              style={{
                position: 'absolute',
                fontFamily: 'monospace',
                fontSize: '60px',
                fontWeight: 'bold',
                color: isBoxDarkMode ? '#00ff88' : '#00cc66',
                userSelect: 'none',
                pointerEvents: 'none',
                zIndex: 20,
                textShadow: isBoxDarkMode ? '0 0 30px rgba(0,255,136,0.6)' : 'none',
                top: flashPosition.top,
                left: flashPosition.left,
                transform: flashPosition.left === '88%' ? 'translateX(-100%)' : 'none'
              }}
              aria-hidden="true"
            >
              {currentChar}
            </div>
          )}

          {/* Recall Input Screen */}
          {isRecallMode && recallResults.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-40">
              <div className={`rounded-2xl p-6 sm:p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <div className="mb-3">
                  <Brain className="w-12 h-12 text-purple-500 mx-auto" aria-hidden="true" />
                </div>
                <h3 className={`text-xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Recall Last {recallCount} Character{recallCount > 1 ? 's' : ''}
                </h3>
                <p className={`mb-4 text-sm ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Enter the last {recallCount} character{recallCount > 1 ? 's' : ''} in order as they appeared
                </p>
                <input
                  id="recall-input"
                  type="text"
                  value={recallInput}
                  onChange={(e) => setRecallInput(e.target.value.toUpperCase())}
                  onKeyPress={handleRecallKeyPress}
                  maxLength={recallCount}
                  className={`w-full px-4 py-3 text-center text-2xl font-mono tracking-widest rounded-xl border outline-none transition ${
                    isBoxDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white focus:border-purple-500' 
                      : 'bg-gray-100 border-gray-300 text-gray-900 focus:border-purple-500'
                  }`}
                  placeholder={placeholderText}
                  autoFocus
                  aria-label={`Enter the last ${recallCount} characters`}
                />
                <button
                  onClick={checkRecallAnswer}
                  className="mt-4 px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                  aria-label="Submit recall answer"
                >
                  Submit
                </button>
              </div>
            </div>
          )}

          {/* Recall Results Screen */}
          {isRecallMode && recallResults.length > 0 && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-40">
              <div className={`rounded-2xl p-6 sm:p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <h3 className={`text-xl font-bold mb-4 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Results
                </h3>
                <div className="flex justify-center gap-6 mb-4">
                  {recallResults.map((result, idx) => (
                    <div key={idx} className="text-center">
                      <div className={`text-3xl font-mono font-bold ${result.isCorrect ? 'text-green-500' : 'text-red-500'}`}>
                        {result.correct}
                      </div>
                      <div className={`text-lg font-mono ${result.isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                        {result.user || '—'}
                      </div>
                    </div>
                  ))}
                </div>
                <p className={`text-sm mb-4 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {recallResults.filter(r => r.isCorrect).length}/{recallResults.length} correct
                </p>
                <button
                  onClick={closeRecallAndContinue}
                  className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                  aria-label="Continue training"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* ============ START SCREEN ============ */}
          {gameState === 'start' && (
            <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
              <div className={`rounded-2xl p-6 sm:p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <div className="mb-4">
                  <Eye className="w-16 h-16 text-purple-500 mx-auto" aria-hidden="true" />
                </div>
                <h2 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Wide Field Awareness
                </h2>
                <p className={`mb-2 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  60-second challenge • Focus on center +
                </p>
                <p className={`mb-6 text-sm ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Characters flash in 4 corners. Random recall quizzes test 1-3 characters. Use peripheral vision only.
                </p>
                <button 
                  onClick={startGame} 
                  className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg w-full transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                  aria-label="Start wide field awareness training"
                >
                  Start Training
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
                  Keep practicing to expand your wide field awareness and visual memory.
                </p>
                
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <ResultCard label="Final Score" value={score} icon={<Target className="w-4 h-4" />} color="blue" isDark={isBoxDarkMode} />
                  <ResultCard label="Best Score" value={bestScore} icon={<Trophy className="w-4 h-4" />} color="yellow" isDark={isBoxDarkMode} />
                  <ResultCard label="Best Streak" value={bestStreak} icon={<Zap className="w-4 h-4" />} color="orange" isDark={isBoxDarkMode} />
                  <ResultCard label="Total Flashes" value={totalFlashes} icon={<Eye className="w-4 h-4" />} color="cyan" isDark={isBoxDarkMode} />
                  <ResultCard label="Lives Remaining" value={lives} icon={<Heart className="w-4 h-4" />} color="red" isDark={isBoxDarkMode} />
                </div>
                
                <div className="flex gap-3">
                  <Link href="/drills/visual" className="flex-1">
                    <button className={`w-full px-4 py-2.5 rounded-lg font-semibold transition-all ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                      ← Back to Drills
                    </button>
                  </Link>
                  <button 
                    onClick={startGame} 
                    className="flex-1 px-4 py-2.5 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
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
                  <Info className={`w-4 h-4 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} aria-hidden="true" />
                  <h2 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>How Wide Field Awareness Works</h2>
                </div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">1</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-purple-500">Fixate on the center + symbol</span> at all times
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">2</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-green-500">Characters flash in 4 corners</span> for 400ms each
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-cyan-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">3</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-cyan-500">Random recall quizzes (1-3 chars)</span> after every 3+ flashes
                      </p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">4</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-yellow-500">Perfect recall: +points (1 per char)</span> and streak bonus
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">5</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-red-500">Wrong/Partial: -1 life</span> (3 lives total)
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">6</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-orange-500">5-Streak bonus notification</span> • Best Score saves locally
                      </p>
                    </div>
                  </div>
                </div>
                <div className={`mt-4 pt-3 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs ${isDarkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'}`}>
                  <span>👁️ 4 corner positions • Use peripheral vision only</span>
                  <span>⚡ 400ms flash duration • Enter key to submit recall</span>
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
    cyan: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', text: 'text-cyan-500', icon: 'text-cyan-500' },
    red: { bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-500', icon: 'text-red-500' },
    purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-500', icon: 'text-purple-500' },
    green: { bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-500', icon: 'text-green-500' },
    emerald: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-500', icon: 'text-emerald-500' },
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