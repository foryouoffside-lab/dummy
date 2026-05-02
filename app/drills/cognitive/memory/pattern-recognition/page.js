'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Target, Zap, Timer, Trophy, Heart, 
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, Eye,
  BarChart3, Info, CheckCircle, Brain, Calculator, ArrowRight, Hash, RefreshCw
} from 'lucide-react';

// Persistent storage for used patterns (survives page refreshes)
const STORAGE_KEY = 'math_pattern_used_hashes';
const MAX_STORED_PATTERNS = 5000;

// Pattern generator that NEVER repeats patterns
class PatternGenerator {
  constructor() {
    this.loadUsedPatterns();
  }

  loadUsedPatterns() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const hashes = JSON.parse(stored);
        this.usedPatterns = new Set(hashes);
      } else {
        this.usedPatterns = new Set();
      }
    } catch (e) {
      this.usedPatterns = new Set();
    }
    this.patternHistory = [];
    this.newPatternsInSession = 0;
  }

  saveUsedPatterns() {
    try {
      const hashes = Array.from(this.usedPatterns);
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

  generatePatternHash(sequence, answer) {
    return `${sequence.join(',')}|${answer}`;
  }

  isPatternUsed(hash) {
    return this.usedPatterns.has(hash);
  }

  markPatternUsed(hash) {
    this.usedPatterns.add(hash);
    this.newPatternsInSession++;
    this.patternHistory.push({ hash, timestamp: Date.now() });
    
    if (this.newPatternsInSession % 5 === 0) {
      this.saveUsedPatterns();
    }
  }

  finalizeSession() {
    this.saveUsedPatterns();
  }

  generateArithmetic(difficulty) {
    const maxAttempts = 100;
    
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      const length = Math.min(4 + Math.floor(difficulty / 2), 7);
      const start = Math.floor(Math.random() * 30) + 1;
      const difference = Math.floor(Math.random() * 10) + 2;
      
      const sequence = [];
      for (let i = 0; i < length; i++) {
        sequence.push(start + (difference * i));
      }
      
      const answer = start + (difference * length);
      const hash = this.generatePatternHash(sequence, answer);
      
      if (!this.isPatternUsed(hash)) {
        this.markPatternUsed(hash);
        return { sequence, answer, type: 'arithmetic', difficulty: 1 + Math.floor(difference / 5) };
      }
    }
    
    const timestamp = Date.now();
    const start = (timestamp % 30) + 5;
    const difference = (timestamp % 8) + 3;
    const sequence = [start, start + difference, start + difference * 2, start + difference * 3];
    const answer = start + difference * 4;
    const hash = this.generatePatternHash(sequence, answer);
    this.markPatternUsed(hash);
    return { sequence, answer, type: 'arithmetic', difficulty: 1 };
  }

  generateGeometric(difficulty) {
    for (let attempt = 0; attempt < 100; attempt++) {
      const length = Math.min(4 + Math.floor(difficulty / 3), 6);
      const start = Math.floor(Math.random() * 6) + 2;
      const ratio = Math.floor(Math.random() * 3) + 2;
      
      const sequence = [];
      for (let i = 0; i < length; i++) {
        sequence.push(start * Math.pow(ratio, i));
      }
      
      const answer = start * Math.pow(ratio, length);
      
      if (answer > 10000) continue;
      
      const hash = this.generatePatternHash(sequence, answer);
      
      if (!this.isPatternUsed(hash)) {
        this.markPatternUsed(hash);
        return { sequence, answer, type: 'geometric', difficulty: 2 + Math.floor(ratio / 2) };
      }
    }
    
    return { sequence: [3, 9, 27, 81], answer: 243, type: 'geometric', difficulty: 2 };
  }

  generateSquares(difficulty) {
    for (let attempt = 0; attempt < 100; attempt++) {
      const length = Math.min(4 + Math.floor(difficulty / 2), 6);
      const start = Math.floor(Math.random() * 10) + 1;
      
      const sequence = [];
      for (let i = 0; i < length; i++) {
        sequence.push(Math.pow(start + i, 2));
      }
      
      const answer = Math.pow(start + length, 2);
      const hash = this.generatePatternHash(sequence, answer);
      
      if (!this.isPatternUsed(hash)) {
        this.markPatternUsed(hash);
        return { sequence, answer, type: 'squares', difficulty: 2 + Math.floor(start / 3) };
      }
    }
    
    return { sequence: [1, 4, 9, 16, 25], answer: 36, type: 'squares', difficulty: 2 };
  }

  generateFibonacci(difficulty) {
    for (let attempt = 0; attempt < 100; attempt++) {
      const length = Math.min(5 + Math.floor(difficulty / 3), 7);
      const start1 = Math.floor(Math.random() * 10) + 1;
      const start2 = Math.floor(Math.random() * 12) + start1 + 1;
      
      const sequence = [start1, start2];
      for (let i = 2; i < length; i++) {
        sequence.push(sequence[i-1] + sequence[i-2]);
      }
      
      const answer = sequence[length-1] + sequence[length-2];
      
      if (answer > 10000) continue;
      
      const hash = this.generatePatternHash(sequence, answer);
      
      if (!this.isPatternUsed(hash)) {
        this.markPatternUsed(hash);
        return { sequence, answer, type: 'fibonacci', difficulty: 3 };
      }
    }
    
    return { sequence: [1, 2, 3, 5, 8, 13], answer: 21, type: 'fibonacci', difficulty: 3 };
  }

  generateAlternating(difficulty) {
    for (let attempt = 0; attempt < 100; attempt++) {
      const length = Math.min(5 + Math.floor(difficulty / 2), 7);
      const start = Math.floor(Math.random() * 30) + 5;
      const add = Math.floor(Math.random() * 10) + 3;
      const subtract = Math.floor(Math.random() * 8) + 2;
      
      const sequence = [start];
      for (let i = 1; i < length; i++) {
        if (i % 2 === 1) {
          sequence.push(sequence[i-1] + add);
        } else {
          sequence.push(sequence[i-1] - subtract);
        }
      }
      
      const answer = length % 2 === 1 ? sequence[length-1] + add : sequence[length-1] - subtract;
      const hash = this.generatePatternHash(sequence, answer);
      
      if (!this.isPatternUsed(hash)) {
        this.markPatternUsed(hash);
        return { sequence, answer, type: 'alternating', difficulty: 3 };
      }
    }
    
    return { sequence: [10, 17, 13, 20, 16], answer: 23, type: 'alternating', difficulty: 3 };
  }

  generatePattern(userLevel, recentAccuracy) {
    const baseDifficulty = Math.min(5, userLevel);
    const performanceBonus = recentAccuracy > 80 ? 1 : recentAccuracy > 60 ? 0 : 0;
    const effectiveDifficulty = Math.min(6, baseDifficulty + performanceBonus);
    
    const availableGenerators = [];
    
    if (effectiveDifficulty >= 1) {
      availableGenerators.push({ generator: this.generateArithmetic, weight: 40 });
    }
    if (effectiveDifficulty >= 2) {
      availableGenerators.push(
        { generator: this.generateGeometric, weight: 25 },
        { generator: this.generateSquares, weight: 25 }
      );
    }
    if (effectiveDifficulty >= 3) {
      availableGenerators.push(
        { generator: this.generateFibonacci, weight: 20 },
        { generator: this.generateAlternating, weight: 20 }
      );
    }
    
    const totalWeight = availableGenerators.reduce((sum, g) => sum + g.weight, 0);
    let random = Math.random() * totalWeight;
    
    let selectedGenerator = availableGenerators[0].generator;
    for (const item of availableGenerators) {
      random -= item.weight;
      if (random <= 0) {
        selectedGenerator = item.generator;
        break;
      }
    }
    
    return selectedGenerator.call(this, effectiveDifficulty);
  }

  getStats() {
    return {
      totalPatternsUsed: this.usedPatterns.size,
      patternsInSession: this.newPatternsInSession
    };
  }
}

export default function MathPatternRecognitionPage() {
  const containerRef = useRef(null);
  const patternGeneratorRef = useRef(null);
  
  const [gameState, setGameState] = useState('start');
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(60);
  const [combo, setCombo] = useState(0);
  const [bestCombo, setBestCombo] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const [recentAnswers, setRecentAnswers] = useState([]);
  const [lives, setLives] = useState(3);
  
  const [currentPattern, setCurrentPattern] = useState(null);
  const [options, setOptions] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isBoxDarkMode, setIsBoxDarkMode] = useState(true);
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  
  const feedbackTimeoutRef = useRef(null);
  const timerIntervalRef = useRef(null);
  const audioContextRef = useRef(null);
  const scoreRef = useRef(0);
  const comboRef = useRef(0);
  const livesRef = useRef(3);
  const gameStateRef = useRef('start');

  // Load best score from localStorage on mount
  useEffect(() => {
    const savedBestScore = localStorage.getItem('mathPatternDrillBestScore');
    if (savedBestScore) {
      setBestScore(parseInt(savedBestScore, 10));
    }
  }, []);

  // Sync gameState to ref
  useEffect(() => {
    gameStateRef.current = gameState;
  }, [gameState]);

  useEffect(() => {
    patternGeneratorRef.current = new PatternGenerator();
  }, []);

  const getRecentAccuracy = useCallback(() => {
    if (recentAnswers.length === 0) return 100;
    const correct = recentAnswers.filter(a => a.correct).length;
    return Math.round((correct / recentAnswers.length) * 100);
  }, [recentAnswers]);

  // Update best score when game ends
  useEffect(() => {
    if (gameState === 'gameOver' && score > bestScore) {
      setBestScore(score);
      localStorage.setItem('mathPatternDrillBestScore', score.toString());
    }
  }, [gameState, score, bestScore]);

  // Cleanup timers
  useEffect(() => {
    return () => {
      if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      if (audioContextRef.current) audioContextRef.current.close();
      if (patternGeneratorRef.current) {
        patternGeneratorRef.current.finalizeSession();
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
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [gameState]);

  const toggleFullscreen = async () => {
    try {
      if (!isFullscreen) {
        await containerRef.current?.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch (error) {
      console.error('Fullscreen error:', error);
    }
  };

  // Handle fullscreen change
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const showFeedback = (message, type) => {
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    setFeedback(message);
    setFeedbackType(type);
    feedbackTimeoutRef.current = setTimeout(() => {
      setFeedback('');
      setFeedbackType('');
    }, 500);
  };

  const initAudio = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }
    return audioContextRef.current;
  }, []);

  const playSound = useCallback((type) => {
    if (!soundEnabled) return;
    
    try {
      const ctx = initAudio();
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.connect(g);
      g.connect(ctx.destination);
      
      if (type === 'correct') {
        osc.frequency.value = 880;
        g.gain.value = 0.12;
        osc.start();
        g.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 0.15);
        osc.stop(ctx.currentTime + 0.15);
      } else if (type === 'incorrect') {
        osc.frequency.value = 440;
        g.gain.value = 0.1;
        osc.start();
        g.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 0.15);
        osc.stop(ctx.currentTime + 0.15);
      } else if (type === 'penalty') {
        osc.frequency.value = 220;
        g.gain.value = 0.15;
        osc.start();
        g.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 0.15);
        osc.stop(ctx.currentTime + 0.15);
      } else if (type === 'combo') {
        osc.frequency.value = 1046.5;
        g.gain.value = 0.12;
        osc.start();
        g.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 0.15);
        osc.stop(ctx.currentTime + 0.15);
      }
    } catch (e) {}
  }, [soundEnabled, initAudio]);

  const generateOptions = useCallback((correctAnswer, difficulty) => {
    const optionsList = [correctAnswer];
    const range = Math.max(15, Math.floor(correctAnswer * 0.25));
    
    while (optionsList.length < 4) {
      let distractor;
      if (difficulty < 3) {
        distractor = correctAnswer + (Math.floor(Math.random() * range) - Math.floor(range / 2));
      } else {
        const variation = Math.floor(correctAnswer * (0.1 + Math.random() * 0.2));
        distractor = correctAnswer + (Math.random() > 0.5 ? variation : -variation);
      }
      distractor = Math.max(0, Math.round(distractor));
      
      if (!optionsList.includes(distractor) && distractor !== correctAnswer) {
        optionsList.push(distractor);
      }
    }
    
    for (let i = optionsList.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [optionsList[i], optionsList[j]] = [optionsList[j], optionsList[i]];
    }
    
    return optionsList;
  }, []);

  const loadNewPattern = useCallback(() => {
    if (!patternGeneratorRef.current) return;
    
    const recentAccuracy = getRecentAccuracy();
    const pattern = patternGeneratorRef.current.generatePattern(Math.floor(scoreRef.current / 150) + 1, recentAccuracy);
    const generatedOptions = generateOptions(pattern.answer, pattern.difficulty);
    
    setCurrentPattern(pattern);
    setOptions(generatedOptions);
    setSelectedAnswer(null);
    setIsAnswerCorrect(null);
    setIsProcessing(false);
  }, [getRecentAccuracy, generateOptions]);

  const getAccuracy = () => {
    const total = correctAnswers + incorrectAnswers;
    if (total === 0) return 100;
    return Math.round((correctAnswers / total) * 100);
  };

  const handleMiss = () => {
    // Use one life for miss
    if (livesRef.current > 0) {
      livesRef.current -= 1;
      setLives(livesRef.current);
      playSound('incorrect');
      showFeedback(`✗ Wrong! Answer: ${currentPattern.answer} -1 life`, 'error');
    }
    
    // If no lives left, apply penalty
    if (livesRef.current === 0) {
      scoreRef.current = Math.max(0, scoreRef.current - 3);
      setScore(scoreRef.current);
      playSound('penalty');
      showFeedback(`✗ Wrong! Answer: ${currentPattern.answer} -3 points!`, 'error');
    }
    
    comboRef.current = 0;
    setCombo(0);
  };

  const processAnswer = (answer) => {
    if (!currentPattern) return;
    
    setIsProcessing(true);
    setSelectedAnswer(answer);
    
    const isCorrect = answer === currentPattern.answer;
    setIsAnswerCorrect(isCorrect);
    
    setRecentAnswers(prev => {
      const updated = [...prev, { correct: isCorrect, timestamp: Date.now() }];
      return updated.slice(-5);
    });
    
    if (isCorrect) {
      // +3 points for correct answer
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
        showFeedback(`✓ +3`, 'success');
      }
    } else {
      setIncorrectAnswers(prev => prev + 1);
      handleMiss();
    }
    
    feedbackTimeoutRef.current = setTimeout(() => {
      loadNewPattern();
    }, 1500);
  };

  const handleOptionSelect = (value) => {
    if (isProcessing || selectedAnswer !== null || !currentPattern) return;
    processAnswer(value);
  };

  const startGame = useCallback(() => {
    setGameState('playing');
    gameStateRef.current = 'playing';
    setScore(0);
    setTimeRemaining(60);
    setCombo(0);
    setBestCombo(0);
    setCorrectAnswers(0);
    setIncorrectAnswers(0);
    setRecentAnswers([]);
    setLives(3);
    setFeedback('');
    
    scoreRef.current = 0;
    comboRef.current = 0;
    livesRef.current = 3;
    
    initAudio();
    loadNewPattern();
  }, [initAudio, loadNewPattern]);

  const resetGame = () => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    setGameState('start');
    gameStateRef.current = 'start';
    setScore(0);
    setCombo(0);
    setCorrectAnswers(0);
    setIncorrectAnswers(0);
    setRecentAnswers([]);
    setLives(3);
    setCurrentPattern(null);
    setOptions([]);
    setSelectedAnswer(null);
    setIsAnswerCorrect(null);
    setIsProcessing(false);
    setFeedback('');
    
    scoreRef.current = 0;
    comboRef.current = 0;
    livesRef.current = 3;
  };

  return (
    <div className={`min-h-screen select-none ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link 
            href="/drills/cognitive" 
            className={`inline-flex items-center gap-2 mb-4 ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Cognitive Drills
          </Link>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl">
                <Calculator className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Math Pattern Recognition
                </h1>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Find the next number • +3/-3 • 3 lives
                </p>
              </div>
            </div>
            
            <div className="flex gap-2">
              {/* Reset button - only visible during gameplay */}
              {gameState === 'playing' && (
                <button onClick={resetGame} className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`} title="Reset session">
                  <RefreshCw className="w-5 h-5" />
                </button>
              )}
              <button onClick={() => setIsDarkMode(!isDarkMode)} className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`}>
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button onClick={() => setIsBoxDarkMode(!isBoxDarkMode)} className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`}>
                <Eye className="w-5 h-5" />
              </button>
              <button onClick={() => setSoundEnabled(!soundEnabled)} className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`}>
                {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
              </button>
              <button onClick={toggleFullscreen} className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`}>
                {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Stats Board - 8 columns */}
        <div className="grid grid-cols-8 gap-3 mb-4 h-[88px]">
          <StatCard icon={<Target className="text-blue-600" />} value={score} label="Score" isDark={isDarkMode} />
          <StatCard icon={<Trophy className="text-yellow-600" />} value={bestScore} label="Best" isDark={isDarkMode} />
          <StatCard icon={<Timer className={timeRemaining <= 10 ? 'text-red-600' : 'text-green-600'} />} value={`${timeRemaining}s`} label="Time" isDark={isDarkMode} />
          <StatCard icon={<CheckCircle className="text-emerald-600" />} value={correctAnswers} label="Correct" isDark={isDarkMode} />
          <StatCard icon={<BarChart3 className="text-purple-600" />} value={getAccuracy()} label="Acc" unit="%" isDark={isDarkMode} />
          <StatCard icon={<Zap className="text-orange-600" />} value={combo} label="Combo" isDark={isDarkMode} />
          <StatCard icon={<Brain className="text-cyan-600" />} value={currentPattern?.type || '-'} label="Type" isDark={isDarkMode} />
          <StatCard icon={<Heart className="text-red-500" />} value={lives} label="Lives" isDark={isDarkMode} />
        </div>

        {/* Feedback Bar */}
        <div className="h-8 mb-2 flex justify-center items-center">
          <div className={`px-4 py-1 rounded-lg text-white font-medium text-sm transition-opacity duration-150 ${feedback ? 'opacity-100' : 'opacity-0'} ${
            feedbackType === 'success' ? 'bg-green-500' : 'bg-red-500'
          }`}>
            {feedback || 'placeholder'}
          </div>
        </div>

        {/* Game Container */}
        <div 
          ref={containerRef}
          className={`relative ${isFullscreen ? 'fixed inset-0 z-50' : 'rounded-xl border-2'}`}
          style={{ 
            background: isBoxDarkMode ? '#0a0a0a' : '#ffffff',
            aspectRatio: '16/9',
            maxWidth: '100%',
            margin: '0 auto',
            borderColor: isDarkMode ? '#374151' : '#e5e7eb',
            overflow: 'hidden'
          }}
        >
          {isFullscreen && gameState === 'playing' && (
            <div className="absolute top-4 right-4 z-30 flex gap-3">
              {/* Reset button in fullscreen */}
              <button 
                onClick={resetGame} 
                className="p-2 bg-black/50 rounded-lg text-white hover:bg-black/70 transition-all" 
                title="Reset session"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
              <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 bg-black/50 rounded-lg text-white hover:bg-black/70 transition-all">{isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}</button>
              <button onClick={() => setIsBoxDarkMode(!isBoxDarkMode)} className="p-2 bg-black/50 rounded-lg text-white hover:bg-black/70 transition-all"><Eye className="w-5 h-5" /></button>
              <button onClick={() => setSoundEnabled(!soundEnabled)} className="p-2 bg-black/50 rounded-lg text-white hover:bg-black/70 transition-all">{soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}</button>
              <button onClick={toggleFullscreen} className="p-2 bg-black/50 rounded-lg text-white hover:bg-black/70 transition-all"><Minimize2 className="w-5 h-5" /></button>
            </div>
          )}

          <div className="absolute inset-0 flex items-center justify-center p-6">
            {/* Start Screen */}
            {gameState === 'start' && (
              <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
                <div className={`rounded-2xl p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                  <Calculator className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                  <h3 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Math Pattern Recognition</h3>
                  <p className={`mb-6 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>60-second challenge • +3 per correct • 3 lives system</p>
                  <button 
                    onClick={startGame}
                    className="px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg w-full transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Start Drill
                  </button>
                </div>
              </div>
            )}

            {/* Playing Screen */}
            {gameState === 'playing' && currentPattern && (
              <div className="w-full max-w-3xl">
                <div className="text-center mb-8">
                  <div className="flex justify-center items-center gap-1 flex-wrap">
                    {currentPattern.sequence.map((num, idx) => (
                      <div key={idx} className="flex items-center">
                        <div className={`w-14 h-14 md:w-16 md:h-16 rounded-xl flex items-center justify-center shadow-lg border-2 ${
                          isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                        }`}>
                          <span className={`text-lg md:text-xl font-bold ${
                            isBoxDarkMode ? 'text-blue-400' : 'text-blue-600'
                          }`}>
                            {num}
                          </span>
                        </div>
                        <span className={`text-lg mx-1 ${isBoxDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                          <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    ))}
                    <div className={`w-14 h-14 md:w-16 md:h-16 rounded-xl flex items-center justify-center border-3 border-dashed shadow-lg ${
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
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl mx-auto">
                    {options.map((value, idx) => {
                      const isSelected = selectedAnswer === value;
                      const isCorrectOption = value === currentPattern.answer;
                      
                      let buttonStyle = isBoxDarkMode 
                        ? 'bg-gray-800 hover:bg-gray-700 text-white' 
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-900';
                      
                      if (isSelected) {
                        buttonStyle = isCorrectOption 
                          ? 'bg-green-500 ring-2 ring-green-300 text-white'
                          : 'bg-red-500 ring-2 ring-red-300 text-white';
                      } else if (selectedAnswer !== null && isCorrectOption) {
                        buttonStyle = 'bg-green-500 ring-2 ring-green-300 text-white';
                      }
                      
                      return (
                        <button
                          key={idx}
                          onClick={() => handleOptionSelect(value)}
                          disabled={selectedAnswer !== null}
                          className={`p-4 rounded-xl transition-all text-lg font-semibold disabled:opacity-75 disabled:cursor-not-allowed shadow ${buttonStyle} hover:scale-105 active:scale-95`}
                        >
                          {value}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Game Over Screen */}
            {gameState === 'gameOver' && (
              <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
                <div className={`rounded-2xl p-8 shadow-xl border w-[480px] ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                  <div className="flex items-center justify-center gap-3 mb-6">
                    <Trophy className="w-10 h-10 text-yellow-500" />
                    <h3 className={`text-2xl font-bold ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Time's Up!</h3>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <ResultCard label="Final Score" value={score} icon={<Target className="w-4 h-4" />} color="text-yellow-500" />
                    <ResultCard label="Best Score" value={bestScore} icon={<Trophy className="w-4 h-4" />} color="text-yellow-500" />
                    <ResultCard label="Accuracy" value={getAccuracy()} unit="%" icon={<BarChart3 className="w-4 h-4" />} color="text-purple-500" />
                    <ResultCard label="Correct" value={correctAnswers} icon={<CheckCircle className="w-4 h-4" />} color="text-green-500" />
                    <ResultCard label="Best Combo" value={`${bestCombo}x`} icon={<Zap className="w-4 h-4" />} color="text-orange-500" />
                    <ResultCard label="Incorrect" value={incorrectAnswers} icon={<Hash className="w-4 h-4" />} color="text-red-500" />
                  </div>
                  
                  <div className="flex gap-4">
                    <Link href="/drills/cognitive" className="flex-1">
                      <span className={`block w-full px-4 py-2.5 rounded-lg font-semibold transition-all text-center ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                        ← Back
                      </span>
                    </Link>
                    <button 
                      onClick={resetGame}
                      className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98]"
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
          <div className="mt-6">
            <div className={`rounded-xl border overflow-hidden ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <div className={`px-4 py-3 border-b ${isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'}`}>
                <div className="flex items-center gap-2">
                  <Info className={`w-4 h-4 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                  <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Drill Rules & Scoring</h3>
                </div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">1</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Study the <span className="font-semibold text-blue-500">sequence pattern</span> and find the next number</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">2</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Correct: <span className="font-semibold text-green-500">+3 points</span> • Triple scoring</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">3</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Wrong: <span className="font-semibold text-red-500">-1 life</span> • 3 lives system</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">4</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>No lives left: <span className="font-semibold text-orange-500">-3 points penalty</span> per mistake</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">5</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Patterns: <span className="font-semibold text-purple-500">Arithmetic, Geometric, Squares, Fibonacci, Alternating</span></p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">6</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Each pattern is <span className="font-semibold text-yellow-500">unique and never repeats</span></p>
                    </div>
                  </div>
                </div>
                <div className={`mt-3 pt-3 border-t text-xs ${isDarkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'} flex items-center justify-between`}>
                  <span>🧮 5 pattern types • Adaptive difficulty based on performance</span>
                  <span>🏆 Best Score saves locally</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ icon, value, label, unit = '', isDark }) {
  return (
    <div className={`rounded-xl shadow-sm border p-3 text-center flex flex-col justify-center h-full ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
      <div className="mb-1 flex justify-center">{icon}</div>
      <p className={`text-xl font-bold truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>{value}{unit}</p>
      <p className={`text-xs truncate ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{label}</p>
    </div>
  );
}

function ResultCard({ label, value, unit = '', icon, color }) {
  const bgColor = color === 'text-yellow-500' ? 'bg-yellow-500/10' : 
                   color === 'text-purple-500' ? 'bg-purple-500/10' : 
                   color === 'text-green-500' ? 'bg-green-500/10' :
                   color === 'text-red-500' ? 'bg-red-500/10' :
                   color === 'text-orange-500' ? 'bg-orange-500/10' : 'bg-blue-500/10';
  
  return (
    <div className={`flex items-center justify-between p-3 rounded-lg ${bgColor}`}>
      <div className="flex items-center gap-2">
        <div className={color}>{icon}</div>
        <span className="text-sm text-gray-600 dark:text-gray-300">{label}</span>
      </div>
      <span className={`font-bold text-lg ${color}`}>{value}{unit}</span>
    </div>
  );
}