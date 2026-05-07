'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  Calculator, Zap, RotateCcw, 
  Volume2, VolumeX, Sun, Moon, 
  Target, Activity, Hash,
  ArrowLeft, Eye, Maximize2, Minimize2, Timer, Trophy,
  BarChart3, Info, CheckCircle2, XCircle, Heart, RefreshCw
} from 'lucide-react';

export default function ArithmeticRaceClient() {
  // Drill Configuration
  const [gameState, setGameState] = useState('start');
  const [difficulty, setDifficulty] = useState('PRO');
  const [currentProblem, setCurrentProblem] = useState({ query: '', answer: 0, options: [] });
  
  // Performance Metrics
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [solvedCount, setSolvedCount] = useState(0);
  const [errorCount, setErrorCount] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [lives, setLives] = useState(3);
  
  // UI State
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isBoxDarkMode, setIsBoxDarkMode] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [selectedOption, setSelectedOption] = useState(null);
  const [loading, setLoading] = useState(true);
  const [canSelect, setCanSelect] = useState(true);
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const timerRef = useRef(null);
  const containerRef = useRef(null);
  const usedQuestionsRef = useRef(new Set());
  const timeoutRef = useRef(null);
  const feedbackTimeoutRef = useRef(null);
  const audioCtxRef = useRef(null);
  const livesRef = useRef(3);
  const scoreRef = useRef(0);
  const comboRef = useRef(0);

  // Mark as client-side rendered
  useEffect(() => {
    setIsClient(true);
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  // Load best score
  useEffect(() => {
    try {
      const savedBestScore = localStorage.getItem('arithmeticRaceDrillBestScore');
      if (savedBestScore) {
        const parsed = parseFloat(savedBestScore);
        if (!isNaN(parsed)) {
          setBestScore(parsed);
        }
      }
    } catch (e) { /* localStorage not available */ }
  }, []);

  // Update best score
  useEffect(() => {
    if (gameState === 'gameOver' && score > bestScore) {
      setBestScore(score);
      try {
        localStorage.setItem('arithmeticRaceDrillBestScore', score.toString());
      } catch (e) { /* localStorage not available */ }
    }
  }, [gameState, score, bestScore]);

  // Handle fullscreen change
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
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

  // Play sound effect
  const playSound = useCallback((type) => {
    if (!soundEnabled) return;
    try {
      const audioCtx = initAudio();
      if (!audioCtx) return;
      
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      
      const now = audioCtx.currentTime;
      
      if (type === 'correct') {
        oscillator.frequency.setValueAtTime(880, now);
        gainNode.gain.setValueAtTime(0.1, now);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
        oscillator.start(now);
        oscillator.stop(now + 0.1);
      } else if (type === 'wrong') {
        oscillator.frequency.setValueAtTime(440, now);
        gainNode.gain.setValueAtTime(0.1, now);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
        oscillator.start(now);
        oscillator.stop(now + 0.15);
      } else if (type === 'combo') {
        oscillator.frequency.setValueAtTime(1046.5, now);
        gainNode.gain.setValueAtTime(0.12, now);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
        oscillator.start(now);
        oscillator.stop(now + 0.2);
      }
    } catch (e) {
      // Audio not supported
    }
  }, [soundEnabled, initAudio]);

  // Get points based on difficulty
  const getPointsForCorrect = useCallback(() => {
    if (difficulty === 'ELITE') return 1.5;
    if (difficulty === 'PRO') return 1;
    return 0.5;
  }, [difficulty]);

  // Get penalty based on difficulty
  const getPenaltyPoints = useCallback(() => {
    if (difficulty === 'ELITE') return 1.5;
    if (difficulty === 'PRO') return 1;
    return 0.5;
  }, [difficulty]);

  // Generate unique problem
  const generateProblem = useCallback(() => {
    const ops = ['+', '-', '*'];
    let a, b, op, query, answer;
    let attempts = 0;
    const maxAttempts = 100;
    
    const allowRepeats = usedQuestionsRef.current.size > 50;
    
    do {
      if (difficulty === 'BASIC') {
        a = Math.floor(Math.random() * 20) + 1;
        b = Math.floor(Math.random() * 20) + 1;
        op = ops[Math.floor(Math.random() * 2)]; // + and - only
      } else if (difficulty === 'PRO') {
        a = Math.floor(Math.random() * 50) + 10;
        b = Math.floor(Math.random() * 30) + 5;
        op = ops[Math.floor(Math.random() * 3)];
      } else {
        a = Math.floor(Math.random() * 100) + 20;
        b = Math.floor(Math.random() * 90) + 10;
        op = ops[Math.floor(Math.random() * 3)];
        if (op === '*') { 
          a = Math.floor(a / 4); 
          b = Math.floor(b / 2); 
        }
      }

      switch (op) {
        case '+': query = `${a} + ${b}`; answer = a + b; break;
        case '-': query = `${a} - ${b}`; answer = a - b; break;
        case '*': query = `${a} × ${b}`; answer = a * b; break;
        default: query = `${a} + ${b}`; answer = a + b;
      }
      
      attempts++;
      
      if (attempts >= maxAttempts) break;
    } while (!allowRepeats && usedQuestionsRef.current.has(`${query}=${answer}`));
    
    usedQuestionsRef.current.add(`${query}=${answer}`);
    
    // Generate unique options
    const options = [answer];
    while (options.length < 4) {
      let fakeAnswer;
      const variation = difficulty === 'BASIC' ? 8 : difficulty === 'PRO' ? 15 : 25;
      fakeAnswer = answer + (Math.floor(Math.random() * variation * 2) - variation);
      
      if (fakeAnswer > 0 && !options.includes(fakeAnswer)) {
        options.push(fakeAnswer);
      }
    }
    
    // Shuffle options
    const shuffledOptions = [...options].sort(() => Math.random() - 0.5);
    
    setCurrentProblem({ query, answer, options: shuffledOptions });
    setSelectedOption(null);
    setCanSelect(true);
    setShowCorrectAnswer(false);
  }, [difficulty]);

  const getAccuracy = useCallback(() => {
    const total = solvedCount + errorCount;
    return total > 0 ? Math.round((solvedCount / total) * 100) : 100;
  }, [solvedCount, errorCount]);

  // Handle option selection
  const handleOptionSelect = useCallback((selectedAnswer) => {
    if (!canSelect || selectedOption !== null) return;
    if (timeLeft <= 0) return;
    
    setSelectedOption(selectedAnswer);
    setCanSelect(false);
    
    if (selectedAnswer === currentProblem.answer) {
      // Correct answer
      const pointsEarned = getPointsForCorrect();
      
      scoreRef.current = parseFloat((scoreRef.current + pointsEarned).toFixed(1));
      setScore(scoreRef.current);
      setSolvedCount(prev => prev + 1);
      comboRef.current = comboRef.current + 1;
      setCombo(comboRef.current);
      
      if (comboRef.current > 0 && comboRef.current % 3 === 0) {
        playSound('combo');
        showFeedback(`🔥 ${comboRef.current}x Combo!`, 'success');
      }
      playSound('correct');
      showFeedback(`✓ Correct! +${pointsEarned}`, 'success');
      
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        generateProblem();
        timeoutRef.current = null;
      }, 400);
    } else {
      // Wrong answer
      setErrorCount(prev => prev + 1);
      comboRef.current = 0;
      setCombo(0);
      setShowCorrectAnswer(true);
      
      const penaltyPoints = getPenaltyPoints();
      
      if (livesRef.current > 0) {
        livesRef.current -= 1;
        setLives(livesRef.current);
        playSound('wrong');
        showFeedback(`✗ Wrong! -1 life (${livesRef.current} lives left)`, 'error');
        
        if (livesRef.current === 0) {
          showFeedback(`⚠️ No lives left! Now penalties deduct ${penaltyPoints} points!`, 'warning');
        }
      } else {
        scoreRef.current = parseFloat(Math.max(0, scoreRef.current - penaltyPoints).toFixed(1));
        setScore(scoreRef.current);
        playSound('wrong');
        showFeedback(`✗ Wrong! -${penaltyPoints} point penalty`, 'error');
      }
      
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        generateProblem();
        timeoutRef.current = null;
      }, 800);
    }
  }, [canSelect, selectedOption, timeLeft, currentProblem, getPointsForCorrect, getPenaltyPoints, playSound, showFeedback, generateProblem]);

  // Handle keyboard input
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (gameState !== 'playing' || !canSelect || selectedOption !== null) return;
      
      const keyMap = { '1': 0, '2': 1, '3': 2, '4': 3 };
      const idx = keyMap[e.key];
      if (idx !== undefined && idx < currentProblem.options.length) {
        handleOptionSelect(currentProblem.options[idx]);
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameState, canSelect, selectedOption, currentProblem, handleOptionSelect]);

  const startGame = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    
    setGameState('playing');
    setScore(0);
    setTimeLeft(60);
    setSolvedCount(0);
    setErrorCount(0);
    setCombo(0);
    setLives(3);
    setSelectedOption(null);
    setCanSelect(true);
    setFeedback('');
    setShowCorrectAnswer(false);
    usedQuestionsRef.current = new Set();
    
    livesRef.current = 3;
    scoreRef.current = 0;
    comboRef.current = 0;
    
    generateProblem();
    playSound('correct');
  }, [generateProblem, playSound]);

  const resetGame = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    setGameState('start');
    setFeedback('');
    setFeedbackType('');
  }, []);

  // Timer effect
  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setGameState('gameOver');
            if (timerRef.current) {
              clearInterval(timerRef.current);
              timerRef.current = null;
            }
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [gameState]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    };
  }, []);

  if (loading || !isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading arithmetic race drill...</p>
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
            "name": "Arithmetic Race Drill",
            "url": "https://skilldrills.online/drills/academic/math-speed/arithmetic-race",
            "description": "Speed math drill with 3 difficulty levels (Basic 0.5pt, Pro 1pt, Elite 1.5pt). Practice addition, subtraction, and multiplication in a 60-second timed race with lives system and combo bonuses.",
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
            "educationalUse": ["Mental Math", "Arithmetic Practice", "Speed Calculation", "Number Skills"],
            "learningResourceType": "Interactive Exercise",
            "timeRequired": "PT60S",
            "interactivityType": "active",
            "inLanguage": "en-US",
            "teaches": ["Addition", "Subtraction", "Multiplication", "Mental Calculation", "Speed Math"]
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
              <Link href="/drills/academic" className={`hover:underline transition-colors ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>
                Academic Drills
              </Link>
            </li>
            <li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} aria-hidden="true">/</li>
            <li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
              Math Speed
            </li>
            <li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} aria-hidden="true">/</li>
            <li className={`font-medium ${isDarkMode ? 'text-orange-400' : 'text-orange-600'}`} aria-current="page">
              Arithmetic Race
            </li>
          </ol>
        </nav>
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex-shrink-0">
              <Calculator className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className={`text-2xl sm:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Arithmetic Race
              </h1>
              <p className={`text-sm sm:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Speed math • 60-second challenge • 3 difficulty levels
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
          <h2>Arithmetic Race - Speed Math Training Drill</h2>
          <p>
            Boost your mental calculation speed with this timed arithmetic challenge. 
            Choose from 3 difficulty levels: Basic (0.5 points), Pro (1 point), and Elite (1.5 points).
            Practice addition, subtraction, and multiplication with unique, non-repeating problems.
            Includes a lives system (3 lives) protecting your score, combo bonuses every 3 correct answers,
            and keyboard shortcuts (1-4 keys) for rapid answering. 60-second race format.
          </p>
        </section>

        {/* Stats Board */}
        <div className="grid grid-cols-7 gap-3 mb-4 h-[88px]">
          <StatCard icon={<Target className="text-blue-600" />} value={score.toFixed(1)} label="Score" isDark={isDarkMode} />
          <StatCard icon={<Trophy className="text-yellow-600" />} value={bestScore.toFixed(1)} label="Best" isDark={isDarkMode} />
          <StatCard icon={<Timer className={timeLeft <= 10 ? 'text-red-600' : 'text-green-600'} />} value={timeLeft} label="Time" unit="s" isDark={isDarkMode} />
          <StatCard icon={<CheckCircle2 className="text-emerald-600" />} value={solvedCount} label="Solved" isDark={isDarkMode} />
          <StatCard icon={<BarChart3 className="text-purple-600" />} value={getAccuracy()} label="Accuracy" unit="%" isDark={isDarkMode} />
          <StatCard icon={<Zap className="text-orange-600" />} value={combo} label="Combo" isDark={isDarkMode} />
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

        {/* Difficulty Selector */}
        <div className="flex justify-center gap-3 mb-4">
          <div className={`flex p-1 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'}`} role="radiogroup" aria-label="Difficulty level">
            {['BASIC', 'PRO', 'ELITE'].map(d => {
              const points = d === 'BASIC' ? '0.5' : d === 'PRO' ? '1' : '1.5';
              return (
                <button
                  key={d}
                  onClick={() => setDifficulty(d)}
                  role="radio"
                  aria-checked={difficulty === d}
                  className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${
                    difficulty === d 
                      ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg' 
                      : `${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'}`
                  } focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2`}
                  aria-label={`${d} difficulty - ${points} points per correct answer`}
                >
                  {d} ({points}pt)
                </button>
              );
            })}
          </div>
        </div>

        {/* Game Container */}
        <div 
          ref={containerRef}
          className={`relative ${isFullscreen ? 'fixed inset-0 z-50' : 'rounded-xl border-2'}`}
          style={{ 
            background: isBoxDarkMode ? "#0a0a0a" : "#ffffff",
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

          <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-8 overflow-y-auto">
            
            {/* ============ START SCREEN ============ */}
            {gameState === 'start' && (
              <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
                <div className={`rounded-2xl p-6 sm:p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                  <div className="mb-4">
                    <Calculator className="w-16 h-16 text-orange-500 mx-auto" aria-hidden="true" />
                  </div>
                  <h2 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Arithmetic Race
                  </h2>
                  <p className={`mb-2 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    60-second challenge • {difficulty} mode • +{getPointsForCorrect()}pt per correct
                  </p>
                  <p className={`mb-6 text-sm ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    3 lives protect your score. After lives are gone, wrong answers deduct {getPenaltyPoints()}pt. Use keys 1-4 for faster answering.
                  </p>
                  <button 
                    onClick={startGame} 
                    className="px-8 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl font-semibold hover:shadow-lg w-full transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                    aria-label="Start arithmetic race drill"
                  >
                    Start Drill
                  </button>
                </div>
              </div>
            )}

            {/* ============ PLAYING SCREEN ============ */}
            {gameState === 'playing' && (
              <div className="w-full max-w-2xl">
                <div className={`text-4xl sm:text-5xl md:text-7xl font-bold text-center mb-6 sm:mb-8 ${
                  isBoxDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {currentProblem.query} = ?
                </div>
                
                <div className="grid grid-cols-2 gap-3 sm:gap-4" role="radiogroup" aria-label="Answer options">
                  {currentProblem.options.map((option, index) => {
                    const isSelected = selectedOption === option;
                    const isCorrect = option === currentProblem.answer;
                    const keyNum = index + 1;
                    
                    let buttonClass = `p-4 sm:p-6 rounded-2xl text-xl sm:text-2xl md:text-3xl font-bold transition-all relative `;
                    
                    if (isSelected || (showCorrectAnswer && isCorrect)) {
                      if (isSelected && !isCorrect) {
                        buttonClass += 'bg-red-500 text-white scale-95 shadow-lg';
                      } else if (isCorrect && showCorrectAnswer) {
                        buttonClass += 'bg-green-500 text-white scale-105 shadow-lg ring-2 ring-green-300';
                      } else if (isSelected && isCorrect) {
                        buttonClass += 'bg-green-500 text-white scale-105 shadow-lg ring-2 ring-green-300';
                      }
                    } else {
                      buttonClass += isBoxDarkMode 
                        ? 'bg-gray-800 text-white hover:bg-gray-700 border border-gray-700' 
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200 border border-gray-200';
                      buttonClass += canSelect && selectedOption === null
                        ? ' hover:scale-105 hover:shadow-lg cursor-pointer active:scale-[0.98]' 
                        : ' opacity-60 cursor-not-allowed';
                    }
                    
                    return (
                      <button
                        key={index}
                        onClick={() => canSelect && selectedOption === null && handleOptionSelect(option)}
                        disabled={!canSelect || selectedOption !== null}
                        className={buttonClass}
                        aria-label={`Option ${keyNum}: ${option}`}
                      >
                        <span className="absolute top-2 left-3 text-xs opacity-50 font-mono">{keyNum}</span>
                        {option}
                      </button>
                    );
                  })}
                </div>
                
                <p className={`text-center mt-4 text-xs ${isBoxDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                  Press 1-4 keys to answer faster
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
                    Keep practicing to improve your mental math speed and accuracy.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <ResultCard label="Final Score" value={score.toFixed(1)} icon={<Target className="w-4 h-4" />} color="yellow" isDark={isBoxDarkMode} />
                    <ResultCard label="Best Score" value={bestScore.toFixed(1)} icon={<Trophy className="w-4 h-4" />} color="yellow" isDark={isBoxDarkMode} />
                    <ResultCard label="Accuracy" value={getAccuracy()} unit="%" icon={<BarChart3 className="w-4 h-4" />} color="purple" isDark={isBoxDarkMode} />
                    <ResultCard label="Solved" value={solvedCount} icon={<CheckCircle2 className="w-4 h-4" />} color="emerald" isDark={isBoxDarkMode} />
                    <ResultCard label="Errors" value={errorCount} icon={<XCircle className="w-4 h-4" />} color="red" isDark={isBoxDarkMode} />
                    <ResultCard label="Lives Left" value={lives} icon={<Heart className="w-4 h-4" />} color="red" isDark={isBoxDarkMode} />
                    <ResultCard label="Max Combo" value={`${combo}x`} icon={<Zap className="w-4 h-4" />} color="orange" isDark={isBoxDarkMode} />
                    <ResultCard label="Difficulty" value={difficulty} icon={<Hash className="w-4 h-4" />} color="cyan" isDark={isBoxDarkMode} />
                  </div>
                  
                  <div className="flex gap-3">
                    <Link href="/drills/academic" className="flex-1">
                      <button className={`w-full px-4 py-2.5 rounded-lg font-semibold transition-all ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                        ← Back to Drills
                      </button>
                    </Link>
                    <button 
                      onClick={startGame} 
                      className="flex-1 px-4 py-2.5 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
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
                  <Info className={`w-4 h-4 ${isDarkMode ? 'text-orange-400' : 'text-orange-600'}`} aria-hidden="true" />
                  <h2 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Drill Rules & Scoring</h2>
                </div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">1</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Choose from <span className="font-semibold text-orange-500">4 options</span> - one chance per problem</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">2</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Correct: <span className="font-semibold text-green-500">+{getPointsForCorrect()}pt</span></p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">3</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Wrong: <span className="font-semibold text-red-500">-1 life first, then -{getPenaltyPoints()}pt</span></p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">4</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Every 3 correct = <span className="font-semibold text-blue-500">Combo notification</span></p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">5</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Keyboard shortcuts: <span className="font-semibold text-yellow-500">Press 1-4 to answer</span></p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">6</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Questions <span className="font-semibold text-purple-500">never repeat</span> in same session</p>
                    </div>
                  </div>
                </div>
                <div className={`mt-4 pt-3 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs ${isDarkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'}`}>
                  <span>➕➖✖️ 3 operations • 3 difficulty modes • 60 second challenge</span>
                  <span>🏆 Score never below 0 • Best Score saves locally</span>
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
    green: { bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-500', icon: 'text-green-500' },
    emerald: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-500', icon: 'text-emerald-500' },
    red: { bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-500', icon: 'text-red-500' },
    orange: { bg: 'bg-orange-500/10', border: 'border-orange-500/30', text: 'text-orange-500', icon: 'text-orange-500' },
    cyan: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', text: 'text-cyan-500', icon: 'text-cyan-500' },
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