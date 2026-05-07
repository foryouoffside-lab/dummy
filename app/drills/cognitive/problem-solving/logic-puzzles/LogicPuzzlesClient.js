'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Target, Zap, Timer, Trophy,
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, Eye,
  BarChart3, Info, CheckCircle, Puzzle, Lightbulb, TrendingUp, Infinity, RefreshCw
} from 'lucide-react';

export default function LogicPuzzlesClient() {
  const containerRef = useRef(null);
  
  const [gameState, setGameState] = useState('start');
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [timeRemaining, setTimeRemaining] = useState(60);
  const [currentPuzzle, setCurrentPuzzle] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  const [combo, setCombo] = useState(0);
  const [bestCombo, setBestCombo] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isBoxDarkMode, setIsBoxDarkMode] = useState(true);
  const [showHint, setShowHint] = useState(false);
  const [hintUsed, setHintUsed] = useState(false);
  const [totalSolved, setTotalSolved] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [usedPuzzleIds, setUsedPuzzleIds] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  
  const inputRef = useRef(null);
  const feedbackTimeoutRef = useRef(null);
  const timerIntervalRef = useRef(null);
  const audioContextRef = useRef(null);
  const scoreRef = useRef(0);
  const comboRef = useRef(0);
  const gameStateRef = useRef('start');
  const soundEnabledRef = useRef(true);
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
      const savedBestScore = localStorage.getItem('logicPuzzlesDrillBestScore');
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

  // Sync soundEnabled to ref
  useEffect(() => {
    soundEnabledRef.current = soundEnabled;
  }, [soundEnabled]);

  // Update best score
  useEffect(() => {
    if (gameState === 'ended' && score > bestScore) {
      setBestScore(score);
      try {
        localStorage.setItem('logicPuzzlesDrillBestScore', score.toString());
      } catch (e) { /* localStorage not available */ }
    }
  }, [gameState, score, bestScore]);

  // Cleanup timers
  useEffect(() => {
    return () => {
      if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      if (audioContextRef.current) {
        try { audioContextRef.current.close(); } catch (e) { /* ignore */ }
      }
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
    if (!soundEnabledRef.current) return;
    try {
      const ctx = initAudio();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.connect(g);
      g.connect(ctx.destination);
      
      const now = ctx.currentTime;
      const freqMap = { correct: 880, wrong: 440, combo: 1046.5, hint: 660 };
      
      osc.frequency.setValueAtTime(freqMap[type] || 660, now);
      g.gain.setValueAtTime(type === 'combo' ? 0.12 : type === 'hint' ? 0.08 : 0.1, now);
      g.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      osc.start(now);
      osc.stop(now + 0.15);
    } catch (e) { /* Audio not supported */ }
  }, [initAudio]);

  // Timer logic
  useEffect(() => {
    if (gameState !== 'playing') return;
    
    timerIntervalRef.current = setInterval(() => {
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
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
      }
    };
  }, [gameState]);

  // Puzzle template generators - using useMemo for performance
  const puzzleGenerators = useMemo(() => ({
    sequence_add: () => {
      const start = Math.floor(Math.random() * 5) + 2;
      const increment = Math.floor(Math.random() * 3) + 2;
      const seq = [start, start + increment, start + increment * 2, start + increment * 3];
      return {
        id: `seq_add_${start}_${increment}_${Date.now()}`,
        question: `What comes next? ${seq[0]}, ${seq[1]}, ${seq[2]}, ${seq[3]}, ?`,
        answer: (start + increment * 4).toString(),
        hint: `Add ${increment} each time`,
        pattern: "Arithmetic Sequence"
      };
    },
    sequence_multiply: () => {
      const start = Math.floor(Math.random() * 3) + 2;
      const multiplier = Math.floor(Math.random() * 2) + 2;
      const seq = [start, start * multiplier, start * multiplier * multiplier, start * multiplier * multiplier * multiplier];
      return {
        id: `seq_mult_${start}_${multiplier}_${Date.now()}`,
        question: `What comes next? ${seq[0]}, ${seq[1]}, ${seq[2]}, ${seq[3]}, ?`,
        answer: (seq[3] * multiplier).toString(),
        hint: `Multiply by ${multiplier} each time`,
        pattern: "Geometric Sequence"
      };
    },
    algebra_simple: () => {
      const x = Math.floor(Math.random() * 20) + 5;
      const result = x * 3 - 7;
      return {
        id: `algebra_${x}_${Date.now()}`,
        question: `If 3x - 7 = ${result}, what is x?`,
        answer: x.toString(),
        hint: `Add 7 to both sides, then divide by 3`,
        pattern: "Basic Algebra"
      };
    },
    order_of_operations: () => {
      const a = Math.floor(Math.random() * 10) + 5;
      const b = Math.floor(Math.random() * 5) + 2;
      const c = Math.floor(Math.random() * 5) + 3;
      const answer = a + b * c - Math.floor(b / 2);
      return {
        id: `pemdas_${a}_${b}_${c}_${Date.now()}`,
        question: `Calculate: ${a} + ${b} × ${c} - ${Math.floor(b/2)} = ?`,
        answer: answer.toString(),
        hint: `Remember PEMDAS: Multiply first`,
        pattern: "Order of Operations"
      };
    },
    fibonacci_like: () => {
      const a = Math.floor(Math.random() * 5) + 2;
      const b = Math.floor(Math.random() * 5) + 3;
      const c = a + b;
      const d = b + c;
      const e = c + d;
      return {
        id: `fib_${a}_${b}_${Date.now()}`,
        question: `Find next: ${a}, ${b}, ${c}, ${d}, ${e}, ?`,
        answer: (d + e).toString(),
        hint: `Each number is sum of previous two`,
        pattern: "Fibonacci-like Sequence"
      };
    },
    exponent_pattern: () => {
      const base = Math.floor(Math.random() * 3) + 2;
      const seq = [base, base**2, base**3, base**4];
      return {
        id: `exp_${base}_${Date.now()}`,
        question: `What comes next? ${seq[0]}, ${seq[1]}, ${seq[2]}, ${seq[3]}, ?`,
        answer: (base**5).toString(),
        hint: `Powers of ${base}`,
        pattern: "Exponential Sequence"
      };
    },
    reverse_number: () => {
      const num = Math.floor(Math.random() * 900) + 100;
      const reversed = parseInt(num.toString().split('').reverse().join(''));
      return {
        id: `reverse_${num}_${Date.now()}`,
        question: `Take ${num}, reverse its digits (${reversed}), and add them. What's the sum?`,
        answer: (num + reversed).toString(),
        hint: `${num} + ${reversed} = ?`,
        pattern: "Number Manipulation"
      };
    },
    percentage_calculation: () => {
      const total = Math.floor(Math.random() * 200) + 50;
      const percent = Math.floor(Math.random() * 40) + 10;
      return {
        id: `percent_${total}_${percent}_${Date.now()}`,
        question: `What is ${percent}% of ${total}?`,
        answer: Math.round(total * percent / 100).toString(),
        hint: `Multiply ${total} by ${percent}/100`,
        pattern: "Percentages"
      };
    }
  }), []);

  const generateNewPuzzle = useCallback(() => {
    const generators = Object.values(puzzleGenerators);
    let attempts = 0;
    let newPuzzle = null;
    
    while (attempts < 50) {
      const generator = generators[Math.floor(Math.random() * generators.length)];
      newPuzzle = generator();
      
      if (!usedPuzzleIds.has(newPuzzle.id)) {
        break;
      }
      attempts++;
      newPuzzle = null;
    }
    
    if (!newPuzzle) {
      const generator = generators[Math.floor(Math.random() * generators.length)];
      newPuzzle = generator();
      newPuzzle.id = `${newPuzzle.id}_${Date.now()}_${Math.random()}`;
    }
    
    setCurrentPuzzle(newPuzzle);
    setUsedPuzzleIds(prev => new Set([...prev, newPuzzle.id]));
    setUserAnswer('');
    setShowHint(false);
    setHintUsed(false);
    setTimeout(() => inputRef.current?.focus(), 50);
  }, [puzzleGenerators, usedPuzzleIds]);

  useEffect(() => {
    if (gameState === 'playing' && currentPuzzle === null) {
      generateNewPuzzle();
    }
  }, [gameState, currentPuzzle, generateNewPuzzle]);

  const getAccuracy = useCallback(() => {
    if (totalAttempts === 0) return 100;
    return Math.round((totalSolved / totalAttempts) * 100);
  }, [totalAttempts, totalSolved]);

  const checkAnswer = useCallback(() => {
    if (!currentPuzzle || !userAnswer.trim()) return;
    if (clickCooldownRef.current) return;
    
    clickCooldownRef.current = true;
    setTotalAttempts(prev => prev + 1);
    
    const userAnswerLower = userAnswer.toLowerCase().trim();
    const correctAnswerLower = currentPuzzle.answer.toLowerCase();
    const isCorrect = userAnswerLower === correctAnswerLower;
    
    if (isCorrect) {
      if (!hintUsed) {
        scoreRef.current += 1;
        setScore(scoreRef.current);
        comboRef.current++;
        setCombo(comboRef.current);
        
        if (comboRef.current > bestCombo) {
          setBestCombo(comboRef.current);
        }
        
        playSound('correct');
        showFeedback('✓ +1 point!', 'success');
        
        if (comboRef.current % 5 === 0) {
          playSound('combo');
          showFeedback(`🔥 ${comboRef.current}x Combo!`, 'success');
        }
      } else {
        comboRef.current = 0;
        setCombo(0);
        playSound('hint');
        showFeedback('✓ Solved (hint used) • 0 points', 'success');
      }
      
      setTotalSolved(prev => prev + 1);
      
      if (totalSolved + 1 >= level * 3) {
        setLevel(prev => prev + 1);
      }
      
      generateNewPuzzle();
    } else {
      scoreRef.current = Math.max(0, scoreRef.current - 1);
      setScore(scoreRef.current);
      comboRef.current = 0;
      setCombo(0);
      
      playSound('wrong');
      showFeedback('✗ Wrong! -1 point', 'error');
    }
    
    setTimeout(() => {
      clickCooldownRef.current = false;
    }, 100);
  }, [currentPuzzle, userAnswer, hintUsed, bestCombo, level, totalSolved, generateNewPuzzle, playSound, showFeedback]);

  const handleShowHint = useCallback(() => {
    setShowHint(prev => !prev);
    if (!showHint) {
      setHintUsed(true);
    }
  }, [showHint]);

  const startGame = useCallback(() => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    
    setGameState('playing');
    gameStateRef.current = 'playing';
    setScore(0);
    setLevel(1);
    setTimeRemaining(60);
    setCombo(0);
    setBestCombo(0);
    setTotalSolved(0);
    setTotalAttempts(0);
    setUsedPuzzleIds(new Set());
    setCurrentPuzzle(null);
    setFeedback('');
    setFeedbackType('');
    
    scoreRef.current = 0;
    comboRef.current = 0;
    clickCooldownRef.current = false;
    
    playSound('correct');
  }, [playSound]);

  const resetGame = useCallback(() => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    setGameState('start');
    gameStateRef.current = 'start';
    setScore(0);
    setCombo(0);
    setBestCombo(0);
    setLevel(1);
    setTotalSolved(0);
    setTotalAttempts(0);
    setCurrentPuzzle(null);
    setUserAnswer('');
    setShowHint(false);
    setHintUsed(false);
    setFeedback('');
    setFeedbackType('');
    
    scoreRef.current = 0;
    comboRef.current = 0;
  }, []);

  if (loading || !isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading logic puzzles drill...</p>
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
            "name": "Logic Puzzles Drill",
            "url": "https://skilldrills.online/drills/cognitive/problem-solving/logic-puzzles",
            "description": "Solve 8 types of unique logic puzzles: Arithmetic Sequences, Geometric Sequences, Algebra, PEMDAS, Fibonacci-like, Exponents, Number Manipulation, and Percentages. 60-second challenge with hint system and combo streaks.",
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
            "educationalUse": ["Problem Solving", "Logical Reasoning", "Mathematical Thinking", "Cognitive Training"],
            "learningResourceType": "Interactive Exercise",
            "timeRequired": "PT60S",
            "interactivityType": "active",
            "inLanguage": "en-US",
            "teaches": ["Problem Solving", "Logical Reasoning", "Mathematical Patterns", "Critical Thinking"]
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
              Problem Solving
            </li>
            <li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} aria-hidden="true">/</li>
            <li className={`font-medium ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} aria-current="page">
              Logic Puzzles
            </li>
          </ol>
        </nav>
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl flex-shrink-0">
              <Infinity className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className={`text-2xl sm:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Logic Puzzles
              </h1>
              <p className={`text-sm sm:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Solve puzzles • +1 per solve • -1 per miss • Hint = 0 points
              </p>
            </div>
          </div>
          
          <div className="flex gap-2 flex-shrink-0">
            {gameState === 'playing' && (
              <button 
                onClick={resetGame} 
                className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-100'}`} 
                title="Reset session"
                aria-label="Reset logic puzzles drill"
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
          <h2>Logic Puzzles - Problem Solving & Mathematical Reasoning Training</h2>
          <p>
            Solve 8 types of unique logic puzzles that never repeat.
            Arithmetic Sequences: find the next number with constant addition.
            Geometric Sequences: find the next number with constant multiplication.
            Basic Algebra: solve for x in linear equations.
            Order of Operations (PEMDAS): calculate expressions with mixed operations.
            Fibonacci-like Sequences: each number is the sum of the previous two.
            Exponential Sequences: powers of a base number.
            Number Manipulation: reverse digits and perform operations.
            Percentages: calculate percentage of a number.
            Hints available but award 0 points when used. Build combo streaks every 5 correct.
            60-second timed challenge with best score saved locally.
          </p>
        </section>

        {/* Stats Board */}
        <div className="grid grid-cols-7 gap-3 mb-4 h-[88px]">
          <StatCard icon={<Target className="text-blue-600" />} value={score} label="Score" isDark={isDarkMode} />
          <StatCard icon={<Trophy className="text-yellow-600" />} value={bestScore} label="Best" isDark={isDarkMode} />
          <StatCard icon={<Timer className={timeRemaining <= 10 ? 'text-red-600' : 'text-green-600'} />} value={`${timeRemaining}s`} label="Time" isDark={isDarkMode} />
          <StatCard icon={<CheckCircle className="text-emerald-600" />} value={totalSolved} label="Solved" isDark={isDarkMode} />
          <StatCard icon={<BarChart3 className="text-purple-600" />} value={getAccuracy()} label="Accuracy" unit="%" isDark={isDarkMode} />
          <StatCard icon={<Zap className="text-orange-600" />} value={combo} label="Combo" isDark={isDarkMode} />
          <StatCard icon={<Puzzle className="text-cyan-600" />} value={currentPuzzle?.pattern || '-'} label="Type" isDark={isDarkMode} />
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
          {isFullscreen && gameState === 'playing' && (
            <div className="absolute top-4 right-4 z-30 flex gap-3">
              <button 
                onClick={resetGame} 
                className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all" 
                title="Reset session"
                aria-label="Reset logic puzzles drill"
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

          <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-8">
            
            {/* ============ START SCREEN ============ */}
            {gameState === 'start' && (
              <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
                <div className={`rounded-2xl p-6 sm:p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                  <div className="mb-4">
                    <Puzzle className="w-16 h-16 text-purple-500 mx-auto" aria-hidden="true" />
                  </div>
                  <h2 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Logic Puzzles
                  </h2>
                  <p className={`mb-2 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    60-second challenge • +1 per solve • -1 per miss
                  </p>
                  <p className={`mb-6 text-sm ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    8 puzzle types: Sequences, Algebra, PEMDAS, Fibonacci, Exponents, Percentages & more. Hints available but award 0 points.
                  </p>
                  <button 
                    onClick={startGame}
                    className="px-8 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg w-full transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                    aria-label="Start logic puzzles drill"
                  >
                    Start Drill
                  </button>
                </div>
              </div>
            )}

            {/* ============ PLAYING SCREEN ============ */}
            {gameState === 'playing' && currentPuzzle && (
              <div className="w-full max-w-2xl">
                <div className={`rounded-xl p-4 sm:p-6 mb-6 ${isBoxDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100'}`}>
                  <p className={`text-lg sm:text-xl font-medium ${isBoxDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                    {currentPuzzle.question}
                  </p>
                </div>

                <div className="mb-4">
                  <label className={`block text-sm font-medium mb-2 ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-700'}`} htmlFor="puzzle-answer">
                    Your Answer:
                  </label>
                  <div className="flex gap-3">
                    <input 
                      ref={inputRef} 
                      id="puzzle-answer"
                      type="text" 
                      value={userAnswer} 
                      onChange={(e) => setUserAnswer(e.target.value)} 
                      onKeyDown={(e) => e.key === 'Enter' && checkAnswer()}
                      className={`flex-1 px-4 py-3 border-2 rounded-xl outline-none transition ${isBoxDarkMode ? 'bg-gray-700 border-gray-600 text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500' : 'bg-white border-gray-200 text-gray-900 focus:border-purple-500 focus:ring-2 focus:ring-purple-500'}`}
                      placeholder="Type your answer here..." 
                      autoFocus 
                      aria-label="Type your answer"
                    />
                    <button 
                      onClick={checkAnswer} 
                      className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg transition hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                      aria-label="Submit answer"
                    >
                      Submit
                    </button>
                  </div>
                </div>

                <button 
                  onClick={handleShowHint} 
                  className={`flex items-center gap-2 text-sm transition mb-4 ${isBoxDarkMode ? 'text-purple-400 hover:text-purple-300' : 'text-purple-600 hover:text-purple-700'} focus:outline-none focus:ring-2 focus:ring-purple-500 rounded`}
                  aria-expanded={showHint}
                  aria-label={showHint ? 'Hide hint' : 'Show hint'}
                >
                  <Lightbulb className="w-4 h-4" />
                  {showHint ? 'Hide Hint' : 'Show Hint'} {hintUsed && '(used - 0 points)'}
                </button>

                {showHint && (
                  <div className={`rounded-lg p-4 ${isBoxDarkMode ? 'bg-yellow-900/30 border border-yellow-700' : 'bg-yellow-50 border border-yellow-200'}`}>
                    <p className={`text-sm ${isBoxDarkMode ? 'text-yellow-300' : 'text-yellow-800'}`}>
                      <strong>💡 Hint:</strong> {currentPuzzle.hint}
                    </p>
                    <p className={`text-xs mt-1 ${isBoxDarkMode ? 'text-yellow-400/70' : 'text-yellow-600'}`}>
                      Using hint = correct answer gives 0 points
                    </p>
                  </div>
                )}
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
                    Keep practicing to improve your problem solving and logical reasoning speed.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <ResultCard label="Final Score" value={score} icon={<Target className="w-4 h-4" />} color="yellow" isDark={isBoxDarkMode} />
                    <ResultCard label="Best Score" value={bestScore} icon={<Trophy className="w-4 h-4" />} color="yellow" isDark={isBoxDarkMode} />
                    <ResultCard label="Accuracy" value={getAccuracy()} unit="%" icon={<BarChart3 className="w-4 h-4" />} color="purple" isDark={isBoxDarkMode} />
                    <ResultCard label="Puzzles Solved" value={totalSolved} icon={<CheckCircle className="w-4 h-4" />} color="emerald" isDark={isBoxDarkMode} />
                    <ResultCard label="Best Combo" value={`${bestCombo}x`} icon={<Zap className="w-4 h-4" />} color="orange" isDark={isBoxDarkMode} />
                    <ResultCard label="Final Level" value={level} icon={<TrendingUp className="w-4 h-4" />} color="blue" isDark={isBoxDarkMode} />
                  </div>
                  
                  <div className="flex gap-3">
                    <Link href="/drills/cognitive" className="flex-1">
                      <span className={`block w-full px-4 py-2.5 rounded-lg font-semibold transition-all text-center ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                        ← Back to Drills
                      </span>
                    </Link>
                    <button 
                      onClick={startGame}
                      className="flex-1 px-4 py-2.5 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
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
                  <Info className={`w-4 h-4 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} aria-hidden="true" />
                  <h2 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Drill Rules & Scoring</h2>
                </div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">1</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Solve <span className="font-semibold text-purple-500">unique logic puzzles</span> - never repeats</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">2</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Correct (no hint): <span className="font-semibold text-green-500">+1 point</span> • Builds combo</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">3</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Wrong answer: <span className="font-semibold text-red-500">-1 point</span> • Breaks combo</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">4</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Using hint: <span className="font-semibold text-yellow-500">0 points</span> • Still counts as solved</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">5</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>8 types: <span className="font-semibold text-blue-500">Sequences, Algebra, PEMDAS, Fibonacci, Exponents, etc.</span></p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">6</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>5x combo <span className="font-semibold text-orange-500">bonus notification</span> • Level up every 3 solved</p>
                    </div>
                  </div>
                </div>
                <div className={`mt-4 pt-3 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs ${isDarkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'}`}>
                  <span>🧩 8 puzzle types • Hint = 0 points but counts as solved</span>
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
    green: { bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-500', icon: 'text-green-500' },
    emerald: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-500', icon: 'text-emerald-500' },
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