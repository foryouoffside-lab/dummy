'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Eye, Zap, Award, 
  Volume2, VolumeX, Sun, Moon, 
  Target, Activity, AlertCircle,
  ArrowLeft, Maximize2, Minimize2, Timer, Trophy,
  ChevronUp, ChevronDown, MoveLeft, MoveRight, GitBranch,
  BarChart3, Info, CheckCircle2, XCircle, Heart, RefreshCw
} from 'lucide-react';
import Link from 'next/link';

// Move WORD_BANK outside component as a module-level constant
const WORD_BANK = [
  'DATA', 'CORE', 'VIEW', 'FAST', 'SPAN', 'LINK', 'NODE', 'FLOW',
  'READ', 'MIND', 'EDGE', 'GRID', 'ZONE', 'PEAK', 'BOLD', 'TRUE',
  'CODE', 'SYNC', 'WAVE', 'PATH', 'VOID', 'RISE', 'DEEP', 'HIGH',
  'MOVE', 'JUMP', 'RACE', 'TIME', 'FOCUS', 'SHARP', 'QUICK', 'CLEAR',
  'BYTE', 'CHIP', 'DASH', 'ECHO', 'FLEX', 'GLOW', 'HASH', 'IRIS'
];

export default function PeripheralReaderClient() {
  const [gameState, setGameState] = useState('start');
  const [difficulty, setDifficulty] = useState('BOTH');
  const [speed, setSpeed] = useState(500);
  const [wordPair, setWordPair] = useState({ left: 'READY', right: 'START' });
  
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [combo, setCombo] = useState(0);
  
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isBoxDarkMode, setIsBoxDarkMode] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [loading, setLoading] = useState(true);
  const [showInput, setShowInput] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  const [usedWords, setUsedWords] = useState(new Set());
  const [currentTargetSide, setCurrentTargetSide] = useState(null);
  const [currentTargetWord, setCurrentTargetWord] = useState('');
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [lives, setLives] = useState(3);
  const [isClient, setIsClient] = useState(false);

  const countdownTimerRef = useRef(null);
  const flashTimerRef = useRef(null);
  const answerTimeoutRef = useRef(null);
  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const feedbackTimeoutRef = useRef(null);
  const audioCtxRef = useRef(null);
  const livesRef = useRef(3);
  const scoreRef = useRef(0);
  const comboRef = useRef(0);
  const isGameRunningRef = useRef(false);
  const isWaitingForAnswerRef = useRef(false);
  const flashesBeforeQuestionRef = useRef(0);
  const targetFlashesBeforeQuestion = useRef(5);
  const gameStateRef = useRef('start');

  // Mark as client-side rendered
  useEffect(() => {
    setIsClient(true);
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  // Sync gameState to ref
  useEffect(() => {
    gameStateRef.current = gameState;
  }, [gameState]);

  useEffect(() => {
    try {
      const savedBestScore = localStorage.getItem('peripheralReaderDrillBestScore');
      if (savedBestScore) {
        const parsed = parseInt(savedBestScore, 10);
        if (!isNaN(parsed)) setBestScore(parsed);
      }
    } catch (e) { /* localStorage not available */ }
  }, []);

  useEffect(() => {
    if (gameState === 'gameOver' && score > bestScore) {
      setBestScore(score);
      try {
        localStorage.setItem('peripheralReaderDrillBestScore', score.toString());
      } catch (e) { /* localStorage not available */ }
    }
  }, [gameState, score, bestScore]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

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

  const showFeedbackMessage = useCallback((message, type) => {
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    setFeedback(message);
    setFeedbackType(type);
    feedbackTimeoutRef.current = setTimeout(() => {
      setFeedback('');
      setFeedbackType('');
    }, 800);
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
    } catch (e) { /* Audio not supported */ }
  }, [soundEnabled, initAudio]);

  const generateWordPair = useCallback(() => {
    if (gameStateRef.current !== 'playing') return;
    if (isWaitingForAnswerRef.current) return;
    
    const availableWords = WORD_BANK.filter(w => !usedWords.has(w));
    
    let left, right;
    
    if (availableWords.length >= 2) {
      const shuffled = [...availableWords].sort(() => Math.random() - 0.5);
      
      if (difficulty === 'LEFT') {
        left = shuffled[0];
        right = '----';
        setUsedWords(prev => new Set([...prev, left]));
      } else if (difficulty === 'RIGHT') {
        left = '----';
        right = shuffled[0];
        setUsedWords(prev => new Set([...prev, right]));
      } else {
        left = shuffled[0];
        right = shuffled[1];
        setUsedWords(prev => new Set([...prev, left, right]));
      }
    } else {
      setUsedWords(new Set());
      const shuffled = [...WORD_BANK].sort(() => Math.random() - 0.5);
      
      if (difficulty === 'LEFT') {
        left = shuffled[0];
        right = '----';
        setUsedWords(new Set([left]));
      } else if (difficulty === 'RIGHT') {
        left = '----';
        right = shuffled[0];
        setUsedWords(new Set([right]));
      } else {
        left = shuffled[0];
        right = shuffled[1];
        setUsedWords(new Set([left, right]));
      }
    }
    
    setWordPair({ left, right });
    
    // Increment flash counter for question scheduling
    flashesBeforeQuestionRef.current++;
    
    // Check if it's time to ask a question (after 5-10 flashes)
    if (flashesBeforeQuestionRef.current >= targetFlashesBeforeQuestion.current) {
      flashesBeforeQuestionRef.current = 0;
      targetFlashesBeforeQuestion.current = Math.floor(Math.random() * 6) + 5;
      askRandomQuestion();
    }
  }, [usedWords, difficulty]);

  const askRandomQuestion = useCallback(() => {
    if (isWaitingForAnswerRef.current || gameStateRef.current !== 'playing') {
      if (flashesBeforeQuestionRef.current >= targetFlashesBeforeQuestion.current) {
        flashesBeforeQuestionRef.current = 0;
        targetFlashesBeforeQuestion.current = Math.floor(Math.random() * 6) + 5;
      }
      return;
    }
    
    isWaitingForAnswerRef.current = true;
    
    if (flashTimerRef.current) {
      clearInterval(flashTimerRef.current);
      flashTimerRef.current = null;
    }
    
    let targetSide;
    if (difficulty === 'LEFT') {
      targetSide = 'left';
    } else if (difficulty === 'RIGHT') {
      targetSide = 'right';
    } else {
      targetSide = Math.random() < 0.5 ? 'left' : 'right';
    }
    
    const targetWord = targetSide === 'left' ? wordPair.left : wordPair.right;
    
    setCurrentTargetSide(targetSide);
    setCurrentTargetWord(targetWord);
    setShowInput(true);
    setShowCorrectAnswer(false);
    setIsCorrect(false);
    
    if (answerTimeoutRef.current) clearTimeout(answerTimeoutRef.current);
    answerTimeoutRef.current = setTimeout(() => {
      if (isWaitingForAnswerRef.current && gameStateRef.current === 'playing') {
        if (livesRef.current === 0) {
          scoreRef.current = Math.max(0, scoreRef.current - 1);
          setScore(scoreRef.current);
          setIncorrectCount(prev => prev + 1);
          comboRef.current = 0;
          setCombo(0);
          playSound('wrong');
          showFeedbackMessage(`⏰ Timeout! -1 point penalty`, 'error');
        } else {
          scoreRef.current = Math.max(0, scoreRef.current - 1);
          setScore(scoreRef.current);
          setIncorrectCount(prev => prev + 1);
          
          if (livesRef.current > 0) {
            livesRef.current -= 1;
            setLives(livesRef.current);
          }
          
          comboRef.current = 0;
          setCombo(0);
          playSound('wrong');
          showFeedbackMessage(`⏰ Timeout! -1 point | ${livesRef.current} lives left`, 'error');
        }
        
        setTimeout(() => {
          setShowInput(false);
          setShowCorrectAnswer(false);
          setUserAnswer('');
          setCurrentTargetSide(null);
          setCurrentTargetWord('');
          isWaitingForAnswerRef.current = false;
          
          if (flashTimerRef.current) clearInterval(flashTimerRef.current);
          flashTimerRef.current = setInterval(() => {
            if (gameStateRef.current === 'playing' && !isWaitingForAnswerRef.current) {
              generateWordPair();
            }
          }, speed);
        }, 1000);
      }
    }, 3000);
    
    setTimeout(() => {
      if (inputRef.current && !showCorrectAnswer) {
        inputRef.current.focus();
      }
    }, 100);
  }, [difficulty, speed, generateWordPair, playSound, showFeedbackMessage]);

  // Main game loop
  useEffect(() => {
    if (gameState === 'playing' && !isGameRunningRef.current) {
      isGameRunningRef.current = true;
      isWaitingForAnswerRef.current = false;
      flashesBeforeQuestionRef.current = 0;
      targetFlashesBeforeQuestion.current = Math.floor(Math.random() * 6) + 5;
      
      if (flashTimerRef.current) clearInterval(flashTimerRef.current);
      flashTimerRef.current = setInterval(() => {
        if (gameStateRef.current === 'playing' && !isWaitingForAnswerRef.current) {
          generateWordPair();
        }
      }, speed);
      
      if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);
      countdownTimerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);
            if (flashTimerRef.current) clearInterval(flashTimerRef.current);
            if (answerTimeoutRef.current) clearTimeout(answerTimeoutRef.current);
            setGameState('gameOver');
            gameStateRef.current = 'gameOver';
            setShowInput(false);
            isGameRunningRef.current = false;
            isWaitingForAnswerRef.current = false;
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => {
      if (gameState !== 'playing' && isGameRunningRef.current) {
        if (flashTimerRef.current) clearInterval(flashTimerRef.current);
        if (answerTimeoutRef.current) clearTimeout(answerTimeoutRef.current);
        if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);
        isGameRunningRef.current = false;
        isWaitingForAnswerRef.current = false;
      }
    };
  }, [gameState, speed, generateWordPair]);

  const getAccuracy = useCallback(() => {
    const total = correctCount + incorrectCount;
    return total > 0 ? Math.round((correctCount / total) * 100) : 100;
  }, [correctCount, incorrectCount]);

  const handleSubmitAnswer = useCallback(() => {
    if (answerTimeoutRef.current) {
      clearTimeout(answerTimeoutRef.current);
    }
    
    const answer = userAnswer.toUpperCase().trim();
    const correct = answer === currentTargetWord;
    
    if (correct) {
      const basePoints = difficulty === 'BOTH' ? 2 : 1;
      const comboBonus = Math.floor(comboRef.current / 3);
      const totalPoints = basePoints + comboBonus;
      
      scoreRef.current += totalPoints;
      setScore(scoreRef.current);
      setCorrectCount(prev => prev + 1);
      comboRef.current++;
      setCombo(comboRef.current);
      
      if (comboRef.current % 3 === 0 && comboRef.current > 0) {
        playSound('combo');
        showFeedbackMessage(`🔥 ${comboRef.current}x Combo! +${comboBonus} bonus!`, 'success');
      } else {
        playSound('correct');
        showFeedbackMessage(`✓ Correct! +${totalPoints}`, 'success');
      }
      
      setTimeout(() => {
        setUserAnswer('');
        setShowInput(false);
        setShowCorrectAnswer(false);
        setCurrentTargetSide(null);
        setCurrentTargetWord('');
        isWaitingForAnswerRef.current = false;
        
        if (flashTimerRef.current) clearInterval(flashTimerRef.current);
        flashTimerRef.current = setInterval(() => {
          if (gameStateRef.current === 'playing' && !isWaitingForAnswerRef.current) {
            generateWordPair();
          }
        }, speed);
      }, 600);
    } else {
      if (livesRef.current === 0) {
        scoreRef.current = Math.max(0, scoreRef.current - 1);
        setScore(scoreRef.current);
        setIncorrectCount(prev => prev + 1);
        comboRef.current = 0;
        setCombo(0);
        playSound('wrong');
        showFeedbackMessage(`✗ Wrong! Correct: ${currentTargetWord}. -1 point penalty`, 'error');
      } else {
        scoreRef.current = Math.max(0, scoreRef.current - 1);
        setScore(scoreRef.current);
        setIncorrectCount(prev => prev + 1);
        
        if (livesRef.current > 0) {
          livesRef.current -= 1;
          setLives(livesRef.current);
        }
        
        comboRef.current = 0;
        setCombo(0);
        playSound('wrong');
        showFeedbackMessage(`✗ Wrong! Correct: ${currentTargetWord}. -1 point | ${livesRef.current} lives left`, 'error');
      }
      
      setTimeout(() => {
        setUserAnswer('');
        setShowInput(false);
        setShowCorrectAnswer(false);
        setCurrentTargetSide(null);
        setCurrentTargetWord('');
        isWaitingForAnswerRef.current = false;
        
        if (flashTimerRef.current) clearInterval(flashTimerRef.current);
        flashTimerRef.current = setInterval(() => {
          if (gameStateRef.current === 'playing' && !isWaitingForAnswerRef.current) {
            generateWordPair();
          }
        }, speed);
      }, 1200);
    }
  }, [userAnswer, currentTargetWord, difficulty, speed, generateWordPair, playSound, showFeedbackMessage]);

  const handleKeyPress = useCallback((e) => {
    if (e.key === 'Enter' && userAnswer.trim() && !showCorrectAnswer) {
      handleSubmitAnswer();
    }
  }, [userAnswer, showCorrectAnswer, handleSubmitAnswer]);

  const startGame = useCallback(() => {
    if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);
    if (flashTimerRef.current) clearInterval(flashTimerRef.current);
    if (answerTimeoutRef.current) clearTimeout(answerTimeoutRef.current);
    
    setGameState('playing');
    gameStateRef.current = 'playing';
    setScore(0);
    setTimeLeft(60);
    setCorrectCount(0);
    setIncorrectCount(0);
    setCombo(0);
    setLives(3);
    setShowInput(false);
    setUserAnswer('');
    setFeedback('');
    setShowCorrectAnswer(false);
    setUsedWords(new Set());
    setCurrentTargetSide(null);
    setCurrentTargetWord('');
    
    scoreRef.current = 0;
    comboRef.current = 0;
    livesRef.current = 3;
    isGameRunningRef.current = false;
    isWaitingForAnswerRef.current = false;
    flashesBeforeQuestionRef.current = 0;
    targetFlashesBeforeQuestion.current = Math.floor(Math.random() * 6) + 5;
    
    const shuffled = [...WORD_BANK].sort(() => Math.random() - 0.5);
    
    if (difficulty === 'LEFT') {
      setWordPair({ left: shuffled[0], right: '----' });
      setUsedWords(new Set([shuffled[0]]));
    } else if (difficulty === 'RIGHT') {
      setWordPair({ left: '----', right: shuffled[0] });
      setUsedWords(new Set([shuffled[0]]));
    } else {
      setWordPair({ left: shuffled[0], right: shuffled[1] });
      setUsedWords(new Set([shuffled[0], shuffled[1]]));
    }
  }, [difficulty]);

  const resetGame = useCallback(() => {
    if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);
    if (flashTimerRef.current) clearInterval(flashTimerRef.current);
    if (answerTimeoutRef.current) clearTimeout(answerTimeoutRef.current);
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    setGameState('start');
    gameStateRef.current = 'start';
    isGameRunningRef.current = false;
    isWaitingForAnswerRef.current = false;
    setShowInput(false);
    setFeedback('');
    setFeedbackType('');
  }, []);

  const handleSpeedUp = useCallback(() => setSpeed(s => Math.max(100, s - 50)), []);
  const handleSpeedDown = useCallback(() => setSpeed(s => Math.min(1000, s + 50)), []);

  const getDifficultyGradient = useCallback(() => {
    if (difficulty === 'LEFT') return 'from-blue-500 to-cyan-600';
    if (difficulty === 'RIGHT') return 'from-green-500 to-emerald-600';
    return 'from-purple-500 to-pink-600';
  }, [difficulty]);

  useEffect(() => {
    return () => {
      if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);
      if (flashTimerRef.current) clearInterval(flashTimerRef.current);
      if (answerTimeoutRef.current) clearTimeout(answerTimeoutRef.current);
      if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    };
  }, []);

  if (loading || !isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading peripheral reader drill...</p>
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
            "name": "Peripheral Span Lab",
            "url": "https://skilldrills.online/drills/academic/reading-speed/peripheral-reader",
            "description": "Train extrafoveal vision and expand visual span for faster reading. 3 modes (Left, Right, Both) with adjustable flash speed 100-1000ms. Random recall questions every 5-10 flashes to test peripheral word recognition.",
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
            "educationalUse": ["Peripheral Vision Training", "Speed Reading", "Visual Span Expansion", "Cognitive Training"],
            "learningResourceType": "Interactive Exercise",
            "timeRequired": "PT60S",
            "interactivityType": "active",
            "inLanguage": "en-US",
            "teaches": ["Peripheral Vision", "Extrafoveal Processing", "Visual Span", "Word Recognition"]
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
              Reading Speed
            </li>
            <li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} aria-hidden="true">/</li>
            <li className={`font-medium ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} aria-current="page">
              Peripheral Span Lab
            </li>
          </ol>
        </nav>
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-xl bg-gradient-to-r ${getDifficultyGradient()} flex-shrink-0`}>
              <Eye className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className={`text-2xl sm:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Peripheral Span Lab
              </h1>
              <p className={`text-sm sm:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Train extrafoveal processing • Questions after 5-10 flashes
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
          <h2>Peripheral Span Lab - Extrafoveal Vision Training</h2>
          <p>
            Train your peripheral vision and expand your visual span for faster reading.
            Words flash on left and right sides while you maintain fixation on the center cross.
            3 modes: Left only (1pt), Right only (1pt), or Both sides (2pt).
            Adjustable flash speed from 100ms to 1000ms. Random recall questions appear every 5-10 flashes
            to test your peripheral word recognition. 60-second challenge with 3 lives and combo streaks.
          </p>
        </section>

        {/* Stats Board */}
        <div className="grid grid-cols-8 gap-3 mb-4 h-[88px]">
          <StatCard icon={<Target className="text-blue-600" />} value={score} label="Score" isDark={isDarkMode} />
          <StatCard icon={<Trophy className="text-yellow-600" />} value={bestScore} label="Best" isDark={isDarkMode} />
          <StatCard icon={<Timer className={timeLeft <= 10 ? 'text-red-600' : 'text-green-600'} />} value={timeLeft} label="Time" unit="s" isDark={isDarkMode} />
          <StatCard icon={<Heart className={lives > 0 ? 'text-red-500' : 'text-gray-500'} />} value={lives} label="Lives" isDark={isDarkMode} />
          <StatCard icon={<CheckCircle2 className="text-emerald-600" />} value={correctCount} label="Correct" isDark={isDarkMode} />
          <StatCard icon={<XCircle className="text-red-500" />} value={incorrectCount} label="Wrong" isDark={isDarkMode} />
          <StatCard icon={<BarChart3 className="text-purple-600" />} value={getAccuracy()} label="Accuracy" unit="%" isDark={isDarkMode} />
          <StatCard icon={<Zap className="text-orange-600" />} value={combo} label="Combo" isDark={isDarkMode} />
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

        {/* Mode & Speed Controls */}
        {gameState === 'start' && (
          <div className="flex flex-wrap items-center justify-center gap-4 mb-4">
            <div className={`flex p-1 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'}`} role="radiogroup" aria-label="Training mode">
              {[
                { id: 'LEFT', label: 'Left (1pt)', icon: <MoveLeft className="w-3 h-3" /> },
                { id: 'RIGHT', label: 'Right (1pt)', icon: <MoveRight className="w-3 h-3" /> },
                { id: 'BOTH', label: 'Both (2pt)', icon: <GitBranch className="w-3 h-3" /> }
              ].map(d => (
                <button
                  key={d.id}
                  onClick={() => setDifficulty(d.id)}
                  role="radio"
                  aria-checked={difficulty === d.id}
                  className={`px-5 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${
                    difficulty === d.id 
                      ? d.id === 'LEFT' 
                        ? 'bg-gradient-to-r from-blue-500 to-cyan-600 text-white shadow-lg'
                        : d.id === 'RIGHT'
                        ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg'
                        : 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg'
                      : `${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'}`
                  } focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2`}
                  aria-label={`${d.label} training mode`}
                >
                  {d.icon} {d.label}
                </button>
              ))}
            </div>
            
            <div className={`flex items-center gap-3 p-2 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white border border-gray-200'}`}>
              <span className={`text-sm font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Speed:
              </span>
              <button onClick={handleSpeedDown} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition" aria-label="Decrease flash speed">
                <ChevronDown className="w-4 h-4" />
              </button>
              <span className={`text-lg font-bold min-w-[60px] text-center ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{speed}ms</span>
              <button onClick={handleSpeedUp} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition" aria-label="Increase flash speed">
                <ChevronUp className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

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
                    <Eye className="w-16 h-16 text-purple-500 mx-auto" aria-hidden="true" />
                  </div>
                  <h2 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Peripheral Span Lab
                  </h2>
                  <p className={`mb-2 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    60-second challenge • {difficulty} mode • Questions every 5-10 flashes
                  </p>
                  <p className={`mb-6 text-sm ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Keep your eyes fixed on the center cross. Words flash on the sides. Answer recall questions to test your peripheral word recognition.
                  </p>
                  <button 
                    onClick={startGame} 
                    className={`px-8 py-3 bg-gradient-to-r ${getDifficultyGradient()} text-white rounded-xl font-semibold hover:shadow-lg w-full transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2`}
                    aria-label="Start peripheral vision training"
                  >
                    Start Drill
                  </button>
                </div>
              </div>
            )}

            {/* ============ PLAYING SCREEN ============ */}
            {gameState === 'playing' && (
              <div className="relative w-full h-full flex items-center justify-center">
                {!showInput ? (
                  <>
                    {/* Center Fixation Cross */}
                    <div className="absolute z-10 w-10 h-10 flex items-center justify-center" aria-hidden="true">
                      <div className={`absolute w-full h-0.5 ${isBoxDarkMode ? 'bg-gray-600' : 'bg-gray-400'}`} />
                      <div className={`absolute h-full w-0.5 ${isBoxDarkMode ? 'bg-gray-600' : 'bg-gray-400'}`} />
                      <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
                    </div>

                    {/* Word Display */}
                    <div className="absolute inset-x-0 flex justify-between items-center px-4 sm:px-8">
                      <div className={`text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight transition-opacity duration-100 ${
                        difficulty === 'LEFT' || difficulty === 'BOTH' 
                          ? isBoxDarkMode ? 'text-white' : 'text-gray-900'
                          : 'opacity-0'
                      }`}>
                        {difficulty === 'RIGHT' ? '' : wordPair.left}
                      </div>
                      <div className={`text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight transition-opacity duration-100 ${
                        difficulty === 'RIGHT' || difficulty === 'BOTH'
                          ? isBoxDarkMode ? 'text-white' : 'text-gray-900'
                          : 'opacity-0'
                      }`}>
                        {difficulty === 'LEFT' ? '' : wordPair.right}
                      </div>
                    </div>

                    <div className="absolute bottom-8 sm:bottom-10 text-center">
                      <p className={`text-xs sm:text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        Fixate on center • Mode: {difficulty} ({difficulty === 'BOTH' ? '2' : '1'}pt) • Speed: {speed}ms
                      </p>
                    </div>
                  </>
                ) : (
                  /* Question Input Screen */
                  <div className="text-center w-full max-w-md px-4">
                    <div className={`mb-6 p-4 rounded-xl ${isBoxDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-gray-100 border border-gray-200'}`}>
                      <p className={`text-base sm:text-lg font-bold mb-2 ${
                        currentTargetSide === 'left' ? 'text-blue-500' : 'text-green-500'
                      }`}>
                        What word was on the <span className="uppercase underline">{currentTargetSide}</span> side?
                      </p>
                      {showCorrectAnswer && !isCorrect && (
                        <p className="text-green-500 font-bold mt-2">
                          Correct answer: {currentTargetWord}
                        </p>
                      )}
                    </div>
                    <input
                      ref={inputRef}
                      type="text"
                      value={userAnswer}
                      onChange={(e) => setUserAnswer(e.target.value)}
                      onKeyPress={handleKeyPress}
                      disabled={showCorrectAnswer}
                      className={`w-full p-4 rounded-xl text-center text-xl sm:text-2xl font-bold outline-none border-2 transition-all ${
                        showCorrectAnswer 
                          ? isCorrect
                            ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                            : 'border-red-500 bg-red-50 dark:bg-red-900/20 opacity-50'
                          : isBoxDarkMode 
                            ? 'bg-gray-800 border-gray-700 text-white focus:border-purple-500' 
                            : 'bg-gray-100 border-gray-200 text-gray-900 focus:border-purple-500'
                      }`}
                      placeholder={`Type the ${currentTargetSide} word...`}
                      autoFocus
                      aria-label={`Type the word from the ${currentTargetSide} side`}
                    />
                    {!showCorrectAnswer ? (
                      <button
                        onClick={handleSubmitAnswer}
                        disabled={!userAnswer.trim()}
                        className={`w-full mt-4 px-4 py-3 bg-gradient-to-r ${getDifficultyGradient()} text-white rounded-xl font-bold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2`}
                        aria-label="Submit your answer"
                      >
                        Submit Answer
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setUserAnswer('');
                          setShowInput(false);
                          setShowCorrectAnswer(false);
                        }}
                        className={`w-full mt-4 px-4 py-3 bg-gradient-to-r ${getDifficultyGradient()} text-white rounded-xl font-bold hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2`}
                        aria-label="Continue to next flash"
                      >
                        Continue
                      </button>
                    )}
                    <p className={`text-xs mt-2 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                      3 seconds to answer • Press Enter to submit
                    </p>
                  </div>
                )}
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
                    Keep practicing to expand your peripheral vision and reading speed.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <ResultCard label="Final Score" value={score} icon={<Target className="w-4 h-4" />} color="yellow" isDark={isBoxDarkMode} />
                    <ResultCard label="Best Score" value={bestScore} icon={<Trophy className="w-4 h-4" />} color="yellow" isDark={isBoxDarkMode} />
                    <ResultCard label="Accuracy" value={getAccuracy()} unit="%" icon={<BarChart3 className="w-4 h-4" />} color="purple" isDark={isBoxDarkMode} />
                    <ResultCard label="Correct" value={correctCount} icon={<CheckCircle2 className="w-4 h-4" />} color="emerald" isDark={isBoxDarkMode} />
                    <ResultCard label="Wrong" value={incorrectCount} icon={<XCircle className="w-4 h-4" />} color="red" isDark={isBoxDarkMode} />
                    <ResultCard label="Max Combo" value={`${combo}x`} icon={<Zap className="w-4 h-4" />} color="orange" isDark={isBoxDarkMode} />
                  </div>
                  
                  <div className="flex gap-3">
                    <Link href="/drills/academic" className="flex-1">
                      <button className={`w-full px-4 py-2.5 rounded-lg font-semibold transition-all ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                        ← Back to Drills
                      </button>
                    </Link>
                    <button 
                      onClick={startGame} 
                      className={`flex-1 px-4 py-2.5 bg-gradient-to-r ${getDifficultyGradient()} text-white rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2`}
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
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Keep eyes fixed on <span className="font-semibold text-purple-500">center cross</span> at all times</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">2</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Left/Right: <span className="font-semibold text-green-500">1 point</span> | Both: <span className="font-semibold text-green-500">2 points</span></p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">3</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Wrong/Timeout (has lives): <span className="font-semibold text-red-500">-1pt & -1 life</span></p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">4</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Wrong/Timeout (0 lives): <span className="font-semibold text-orange-500">-1pt only</span></p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">5</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Questions appear <span className="font-semibold text-blue-500">randomly after 5-10 flashes</span></p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">6</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Combo bonus: <span className="font-semibold text-yellow-500">+1 per 3 streak</span> (Both mode only)</p>
                    </div>
                  </div>
                </div>
                <div className={`mt-4 pt-3 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs ${isDarkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'}`}>
                  <span>👁️ Train extrafoveal processing • 40 unique words • Speed 100-1000ms</span>
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
    cyan: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', text: 'text-cyan-500', icon: 'text-cyan-500' },
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