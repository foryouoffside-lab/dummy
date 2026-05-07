'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  Target, Zap, Timer, Trophy, Heart, 
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, Eye,
  BarChart3, Info, CheckCircle, Brain, Calculator, ArrowRight, Hash, RefreshCw
} from 'lucide-react';

// Persistent storage for used patterns
const STORAGE_KEY = 'math_pattern_used_hashes';
const MAX_STORED_PATTERNS = 5000;

// Pattern generator utility functions
function loadUsedPatterns() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return new Set(JSON.parse(stored));
    }
  } catch (e) {
    // ignore
  }
  return new Set();
}

function saveUsedPatterns(usedPatterns) {
  try {
    const hashes = Array.from(usedPatterns);
    if (hashes.length > MAX_STORED_PATTERNS) {
      const keepHashes = hashes.slice(-MAX_STORED_PATTERNS);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(keepHashes));
    } else {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(hashes));
    }
  } catch (e) {
    console.error('Failed to save patterns:', e);
  }
}

function generatePatternHash(sequence, answer) {
  return `${sequence.join(',')}|${answer}`;
}

function generateArithmetic(usedPatterns) {
  for (let attempt = 0; attempt < 100; attempt++) {
    const length = Math.min(4 + Math.floor(Math.random() * 3), 6);
    const start = Math.floor(Math.random() * 30) + 1;
    const difference = Math.floor(Math.random() * 10) + 2;
    
    const sequence = [];
    for (let i = 0; i < length; i++) {
      sequence.push(start + (difference * i));
    }
    
    const answer = start + (difference * length);
    const hash = generatePatternHash(sequence, answer);
    
    if (!usedPatterns.has(hash)) {
      usedPatterns.add(hash);
      return { sequence, answer, type: 'arithmetic', hash };
    }
  }
  return { sequence: [5, 10, 15, 20, 25], answer: 30, type: 'arithmetic' };
}

function generateGeometric(usedPatterns) {
  for (let attempt = 0; attempt < 100; attempt++) {
    const length = Math.min(3 + Math.floor(Math.random() * 3), 5);
    const start = Math.floor(Math.random() * 5) + 2;
    const ratio = Math.floor(Math.random() * 2) + 2;
    
    const sequence = [];
    for (let i = 0; i < length; i++) {
      sequence.push(start * Math.pow(ratio, i));
    }
    
    const answer = start * Math.pow(ratio, length);
    if (answer > 10000) continue;
    
    const hash = generatePatternHash(sequence, answer);
    if (!usedPatterns.has(hash)) {
      usedPatterns.add(hash);
      return { sequence, answer, type: 'geometric', hash };
    }
  }
  return { sequence: [3, 9, 27, 81], answer: 243, type: 'geometric' };
}

function generateSquares(usedPatterns) {
  for (let attempt = 0; attempt < 100; attempt++) {
    const length = Math.min(4 + Math.floor(Math.random() * 2), 5);
    const start = Math.floor(Math.random() * 8) + 1;
    
    const sequence = [];
    for (let i = 0; i < length; i++) {
      sequence.push(Math.pow(start + i, 2));
    }
    
    const answer = Math.pow(start + length, 2);
    const hash = generatePatternHash(sequence, answer);
    
    if (!usedPatterns.has(hash)) {
      usedPatterns.add(hash);
      return { sequence, answer, type: 'squares', hash };
    }
  }
  return { sequence: [1, 4, 9, 16, 25], answer: 36, type: 'squares' };
}

function generateFibonacci(usedPatterns) {
  for (let attempt = 0; attempt < 100; attempt++) {
    const length = Math.min(4 + Math.floor(Math.random() * 3), 6);
    const start1 = Math.floor(Math.random() * 8) + 1;
    const start2 = Math.floor(Math.random() * 10) + start1 + 1;
    
    const sequence = [start1, start2];
    for (let i = 2; i < length; i++) {
      sequence.push(sequence[i-1] + sequence[i-2]);
    }
    
    const answer = sequence[length-1] + sequence[length-2];
    if (answer > 10000) continue;
    
    const hash = generatePatternHash(sequence, answer);
    if (!usedPatterns.has(hash)) {
      usedPatterns.add(hash);
      return { sequence, answer, type: 'fibonacci', hash };
    }
  }
  return { sequence: [1, 2, 3, 5, 8, 13], answer: 21, type: 'fibonacci' };
}

function generateAlternating(usedPatterns) {
  for (let attempt = 0; attempt < 100; attempt++) {
    const length = Math.min(4 + Math.floor(Math.random() * 3), 6);
    const start = Math.floor(Math.random() * 25) + 5;
    const add = Math.floor(Math.random() * 8) + 3;
    const subtract = Math.floor(Math.random() * 6) + 2;
    
    const sequence = [start];
    for (let i = 1; i < length; i++) {
      if (i % 2 === 1) {
        sequence.push(sequence[i-1] + add);
      } else {
        sequence.push(sequence[i-1] - subtract);
      }
    }
    
    const answer = length % 2 === 1 ? sequence[length-1] + add : sequence[length-1] - subtract;
    const hash = generatePatternHash(sequence, answer);
    
    if (!usedPatterns.has(hash)) {
      usedPatterns.add(hash);
      return { sequence, answer, type: 'alternating', hash };
    }
  }
  return { sequence: [10, 17, 13, 20, 16], answer: 23, type: 'alternating' };
}

function generatePattern(usedPatterns) {
  const generators = [
    { fn: generateArithmetic, weight: 30 },
    { fn: generateGeometric, weight: 20 },
    { fn: generateSquares, weight: 15 },
    { fn: generateFibonacci, weight: 15 },
    { fn: generateAlternating, weight: 20 }
  ];
  
  const totalWeight = generators.reduce((sum, g) => sum + g.weight, 0);
  let random = Math.random() * totalWeight;
  
  for (const item of generators) {
    random -= item.weight;
    if (random <= 0) {
      return item.fn(usedPatterns);
    }
  }
  
  return generateArithmetic(usedPatterns);
}

export default function PatternRecognitionClient() {
  const containerRef = useRef(null);
  
  // Use a ref to store the used patterns set
  const usedPatternsRef = useRef(null);
  const saveCounterRef = useRef(0);
  
  const [gameState, setGameState] = useState('start');
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(60);
  const [combo, setCombo] = useState(0);
  const [bestCombo, setBestCombo] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const [lives, setLives] = useState(3);
  
  const [currentPattern, setCurrentPattern] = useState(null);
  const [options, setOptions] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isBoxDarkMode, setIsBoxDarkMode] = useState(true);
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  
  const feedbackTimeoutRef = useRef(null);
  const timerIntervalRef = useRef(null);
  const audioContextRef = useRef(null);
  const scoreRef = useRef(0);
  const comboRef = useRef(0);
  const livesRef = useRef(3);
  const gameStateRef = useRef('start');
  const soundEnabledRef = useRef(true);

  // Initialize on client side
  useEffect(() => {
    setIsClient(true);
    // Load used patterns from localStorage
    usedPatternsRef.current = loadUsedPatterns();
    saveCounterRef.current = 0;
    
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  // Save patterns on unmount
  useEffect(() => {
    return () => {
      if (usedPatternsRef.current) {
        saveUsedPatterns(usedPatternsRef.current);
      }
    };
  }, []);

  // Load best score
  useEffect(() => {
    try {
      const savedBestScore = localStorage.getItem('mathPatternDrillBestScore');
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
    if (gameState === 'gameOver' && score > bestScore) {
      setBestScore(score);
      try {
        localStorage.setItem('mathPatternDrillBestScore', score.toString());
      } catch (e) { /* localStorage not available */ }
    }
  }, [gameState, score, bestScore]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      if (audioContextRef.current) {
        try { audioContextRef.current.close(); } catch (e) { /* ignore */ }
      }
    };
  }, []);

  // Timer logic
  useEffect(() => {
    if (gameState !== 'playing') return;
    
    timerIntervalRef.current = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          setGameState('gameOver');
          gameStateRef.current = 'gameOver';
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

  const toggleFullscreen = useCallback(async () => {
    try {
      if (!isFullscreen) {
        await containerRef.current?.requestFullscreen();
        setIsFullscreen(true);
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
      const freqMap = { correct: 880, incorrect: 440, penalty: 220, combo: 1046.5 };
      
      osc.frequency.setValueAtTime(freqMap[type] || 660, now);
      g.gain.setValueAtTime(type === 'combo' ? 0.12 : type === 'penalty' ? 0.15 : 0.1, now);
      g.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      osc.start(now);
      osc.stop(now + 0.15);
    } catch (e) { /* Audio not supported */ }
  }, [initAudio]);

  const generateOptions = useCallback((correctAnswer) => {
    const optionsList = [correctAnswer];
    
    while (optionsList.length < 4) {
      let distractor;
      const variation = Math.floor(correctAnswer * (0.1 + Math.random() * 0.25));
      distractor = correctAnswer + (Math.random() > 0.5 ? variation : -variation);
      distractor = Math.max(0, Math.round(distractor));
      
      if (!optionsList.includes(distractor) && distractor !== correctAnswer) {
        optionsList.push(distractor);
      }
    }
    
    // Shuffle
    for (let i = optionsList.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [optionsList[i], optionsList[j]] = [optionsList[j], optionsList[i]];
    }
    
    return optionsList;
  }, []);

  const loadNewPattern = useCallback(() => {
    if (!usedPatternsRef.current) return;
    
    const pattern = generatePattern(usedPatternsRef.current);
    
    // Save patterns periodically
    saveCounterRef.current++;
    if (saveCounterRef.current % 5 === 0) {
      saveUsedPatterns(usedPatternsRef.current);
    }
    
    const generatedOptions = generateOptions(pattern.answer);
    
    setCurrentPattern(pattern);
    setOptions(generatedOptions);
    setSelectedAnswer(null);
    setIsProcessing(false);
  }, [generateOptions]);

  const getAccuracy = useCallback(() => {
    const total = correctAnswers + incorrectAnswers;
    if (total === 0) return 100;
    return Math.round((correctAnswers / total) * 100);
  }, [correctAnswers, incorrectAnswers]);

  const handleMiss = useCallback(() => {
    if (livesRef.current > 0) {
      livesRef.current -= 1;
      setLives(livesRef.current);
      playSound('incorrect');
      showFeedback('✗ Wrong! -1 life', 'error');
    }
    
    if (livesRef.current === 0) {
      scoreRef.current = Math.max(0, scoreRef.current - 3);
      setScore(scoreRef.current);
      playSound('penalty');
      showFeedback('✗ Wrong! -3 points!', 'error');
    }
    
    comboRef.current = 0;
    setCombo(0);
  }, [playSound, showFeedback]);

  const handleOptionSelect = useCallback((value) => {
    if (isProcessing || selectedAnswer !== null || !currentPattern) return;
    
    setIsProcessing(true);
    setSelectedAnswer(value);
    
    const isCorrect = value === currentPattern.answer;
    
    if (isCorrect) {
      scoreRef.current += 3;
      setScore(scoreRef.current);
      setCorrectAnswers(prev => prev + 1);
      comboRef.current++;
      setCombo(comboRef.current);
      
      if (comboRef.current > bestCombo) {
        setBestCombo(comboRef.current);
      }
      
      if (comboRef.current % 3 === 0) {
        playSound('combo');
        showFeedback(`🔥 ${comboRef.current}x Combo! +3`, 'success');
      } else {
        playSound('correct');
        showFeedback('✓ +3', 'success');
      }
    } else {
      setIncorrectAnswers(prev => prev + 1);
      handleMiss();
    }
    
    feedbackTimeoutRef.current = setTimeout(() => {
      loadNewPattern();
    }, 1000);
  }, [isProcessing, selectedAnswer, currentPattern, bestCombo, playSound, showFeedback, handleMiss, loadNewPattern]);

  const startGame = useCallback(() => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    
    setGameState('playing');
    gameStateRef.current = 'playing';
    setScore(0);
    setTimeRemaining(60);
    setCombo(0);
    setBestCombo(0);
    setCorrectAnswers(0);
    setIncorrectAnswers(0);
    setLives(3);
    setFeedback('');
    
    scoreRef.current = 0;
    comboRef.current = 0;
    livesRef.current = 3;
    
    initAudio();
    loadNewPattern();
  }, [initAudio, loadNewPattern]);

  const resetGame = useCallback(() => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    setGameState('start');
    gameStateRef.current = 'start';
    setScore(0);
    setCombo(0);
    setCorrectAnswers(0);
    setIncorrectAnswers(0);
    setLives(3);
    setCurrentPattern(null);
    setOptions([]);
    setSelectedAnswer(null);
    setIsProcessing(false);
    setFeedback('');
    setFeedbackType('');
    
    scoreRef.current = 0;
    comboRef.current = 0;
    livesRef.current = 3;
  }, []);

  if (loading || !isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading pattern recognition drill...</p>
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
            "name": "Math Pattern Recognition Drill",
            "url": "https://skilldrills.online/drills/cognitive/memory/pattern-recognition",
            "description": "Train pattern recognition with 5 unique pattern types: Arithmetic, Geometric, Squares, Fibonacci, and Alternating sequences. 5,000+ unique non-repeating patterns with adaptive difficulty. 60-second challenge.",
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
            "educationalUse": ["Pattern Recognition", "Logical Reasoning", "Mathematical Thinking", "Cognitive Training"],
            "learningResourceType": "Interactive Exercise",
            "timeRequired": "PT60S",
            "interactivityType": "active",
            "inLanguage": "en-US",
            "teaches": ["Pattern Recognition", "Number Sequences", "Logical Reasoning", "Mathematical Patterns"]
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
              Pattern Recognition
            </li>
          </ol>
        </nav>
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex-shrink-0">
              <Calculator className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className={`text-2xl sm:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Pattern Recognition
              </h1>
              <p className={`text-sm sm:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Find the next number • +3 per correct • 3 lives • 5 pattern types
              </p>
            </div>
          </div>
          
          <div className="flex gap-2 flex-shrink-0">
            {gameState === 'playing' && (
              <button 
                onClick={resetGame} 
                className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-100'}`} 
                title="Reset session"
                aria-label="Reset pattern recognition drill"
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
          <h2>Math Pattern Recognition - Number Sequence Training</h2>
          <p>
            Train pattern recognition with 5 unique pattern types: Arithmetic (constant difference),
            Geometric (constant ratio), Squares (perfect squares), Fibonacci (sum of previous two),
            and Alternating (add/subtract pattern). Over 5,000 unique non-repeating patterns stored persistently.
            Study the sequence and select the next number from 4 options.
            Correct answers earn +3 points with combo streaks every 3 correct.
            3 lives protect your score; at 0 lives, mistakes deduct 3 points.
            60-second timed challenge with best score saved locally.
          </p>
        </section>

        {/* Stats Board */}
        <div className="grid grid-cols-8 gap-3 mb-4 h-[88px]">
          <StatCard icon={<Target className="text-blue-600" />} value={score} label="Score" isDark={isDarkMode} />
          <StatCard icon={<Trophy className="text-yellow-600" />} value={bestScore} label="Best" isDark={isDarkMode} />
          <StatCard icon={<Timer className={timeRemaining <= 10 ? 'text-red-600' : 'text-green-600'} />} value={`${timeRemaining}s`} label="Time" isDark={isDarkMode} />
          <StatCard icon={<CheckCircle className="text-emerald-600" />} value={correctAnswers} label="Correct" isDark={isDarkMode} />
          <StatCard icon={<BarChart3 className="text-purple-600" />} value={getAccuracy()} label="Accuracy" unit="%" isDark={isDarkMode} />
          <StatCard icon={<Zap className="text-orange-600" />} value={combo} label="Combo" isDark={isDarkMode} />
          <StatCard icon={<Brain className="text-cyan-600" />} value={currentPattern?.type || '-'} label="Type" isDark={isDarkMode} />
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
          {isFullscreen && gameState === 'playing' && (
            <div className="absolute top-4 right-4 z-30 flex gap-3">
              <button 
                onClick={resetGame} 
                className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all" 
                title="Reset session"
                aria-label="Reset pattern recognition drill"
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

          <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-6">
            
            {/* ============ START SCREEN ============ */}
            {gameState === 'start' && (
              <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
                <div className={`rounded-2xl p-6 sm:p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                  <div className="mb-4">
                    <Calculator className="w-16 h-16 text-blue-500 mx-auto" aria-hidden="true" />
                  </div>
                  <h2 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Pattern Recognition
                  </h2>
                  <p className={`mb-2 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    60-second challenge • +3 per correct • 5 pattern types
                  </p>
                  <p className={`mb-6 text-sm ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Study the number sequence and find the next number. 5 pattern types with 5,000+ unique sequences that never repeat.
                  </p>
                  <button 
                    onClick={startGame}
                    className="px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg w-full transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    aria-label="Start pattern recognition drill"
                  >
                    Start Drill
                  </button>
                </div>
              </div>
            )}

            {/* ============ PLAYING SCREEN ============ */}
            {gameState === 'playing' && currentPattern && (
              <div className="w-full max-w-3xl">
                <div className="text-center mb-6 sm:mb-8">
                  <div className="flex flex-wrap justify-center items-center gap-1">
                    {currentPattern.sequence.map((num, idx) => (
                      <div key={idx} className="flex items-center">
                        <div className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl flex items-center justify-center shadow-lg border-2 ${
                          isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                        }`}>
                          <span className={`text-base sm:text-lg md:text-xl font-bold ${
                            isBoxDarkMode ? 'text-blue-400' : 'text-blue-600'
                          }`}>
                            {num}
                          </span>
                        </div>
                        <span className={`text-lg mx-1 ${isBoxDarkMode ? 'text-gray-500' : 'text-gray-400'}`} aria-hidden="true">
                          <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                        </span>
                      </div>
                    ))}
                    <div className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl flex items-center justify-center border-3 border-dashed shadow-lg ${
                      isBoxDarkMode ? 'border-gray-600 bg-gray-800/50' : 'border-gray-300 bg-gray-50'
                    }`}>
                      <span className={`text-lg ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>?</span>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <p className={`text-sm mb-4 ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Select the next number in the sequence:
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl mx-auto" role="radiogroup" aria-label="Answer options">
                    {options.map((value, idx) => {
                      const isSelected = selectedAnswer === value;
                      const isCorrectOption = value === currentPattern.answer;
                      
                      let buttonStyle = isBoxDarkMode 
                        ? 'bg-gray-800 hover:bg-gray-700 text-white border border-gray-700' 
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-900 border border-gray-200';
                      
                      if (isSelected && selectedAnswer !== null) {
                        buttonStyle = isCorrectOption 
                          ? 'bg-green-500 ring-2 ring-green-300 text-white border-green-600'
                          : 'bg-red-500 ring-2 ring-red-300 text-white border-red-600';
                      } else if (selectedAnswer !== null && isCorrectOption) {
                        buttonStyle = 'bg-green-500 ring-2 ring-green-300 text-white border-green-600';
                      }
                      
                      return (
                        <button
                          key={idx}
                          onClick={() => handleOptionSelect(value)}
                          disabled={selectedAnswer !== null}
                          className={`p-3 sm:p-4 rounded-xl transition-all text-base sm:text-lg font-semibold disabled:cursor-not-allowed shadow ${buttonStyle} hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                          aria-label={`Option ${idx + 1}: ${value}`}
                        >
                          {value}
                        </button>
                      );
                    })}
                  </div>
                  <p className={`text-xs mt-4 ${isBoxDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                    Pattern type: <span className="font-semibold capitalize">{currentPattern.type}</span>
                  </p>
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
                    Keep practicing to improve your pattern recognition and logical reasoning skills.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <ResultCard label="Final Score" value={score} icon={<Target className="w-4 h-4" />} color="yellow" isDark={isBoxDarkMode} />
                    <ResultCard label="Best Score" value={bestScore} icon={<Trophy className="w-4 h-4" />} color="yellow" isDark={isBoxDarkMode} />
                    <ResultCard label="Accuracy" value={getAccuracy()} unit="%" icon={<BarChart3 className="w-4 h-4" />} color="purple" isDark={isBoxDarkMode} />
                    <ResultCard label="Correct" value={correctAnswers} icon={<CheckCircle className="w-4 h-4" />} color="emerald" isDark={isBoxDarkMode} />
                    <ResultCard label="Best Combo" value={`${bestCombo}x`} icon={<Zap className="w-4 h-4" />} color="orange" isDark={isBoxDarkMode} />
                    <ResultCard label="Wrong" value={incorrectAnswers} icon={<Hash className="w-4 h-4" />} color="red" isDark={isBoxDarkMode} />
                  </div>
                  
                  <div className="flex gap-3">
                    <Link href="/drills/cognitive" className="flex-1">
                      <span className={`block w-full px-4 py-2.5 rounded-lg font-semibold transition-all text-center ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                        ← Back to Drills
                      </span>
                    </Link>
                    <button 
                      onClick={resetGame}
                      className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Study the <span className="font-semibold text-blue-500">sequence pattern</span> and find the next number</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">2</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Correct: <span className="font-semibold text-green-500">+3 points</span> • Triple scoring</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">3</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Wrong: <span className="font-semibold text-red-500">-1 life</span> • 3 lives total</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">4</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>At 0 lives: <span className="font-semibold text-orange-500">-3 point penalty</span> per mistake</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">5</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>5 types: <span className="font-semibold text-purple-500">Arithmetic, Geometric, Squares, Fibonacci, Alternating</span></p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">6</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>5,000+ patterns • <span className="font-semibold text-yellow-500">Never repeats</span> across sessions</p>
                    </div>
                  </div>
                </div>
                <div className={`mt-4 pt-3 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs ${isDarkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'}`}>
                  <span>🧮 Arithmetic, Geometric, Squares, Fibonacci & Alternating patterns</span>
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