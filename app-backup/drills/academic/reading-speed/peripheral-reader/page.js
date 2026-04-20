'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  Eye, Zap, Award, 
  Volume2, VolumeX, Sun, Moon, 
  Target, Activity, AlertCircle,
  ArrowLeft, Maximize2, Minimize2, Timer, Trophy,
  ChevronUp, ChevronDown, MoveLeft, MoveRight, GitBranch,
  BarChart3, Info, CheckCircle2, XCircle
} from 'lucide-react';

export default function PeripheralReader() {
  const [gameState, setGameState] = useState('start');
  const [difficulty, setDifficulty] = useState('BOTH'); // LEFT, RIGHT, BOTH
  const [speed, setSpeed] = useState(500);
  const [wordPair, setWordPair] = useState({ left: 'READY', right: 'START' });
  
  // Metrics
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [totalFlashes, setTotalFlashes] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [combo, setCombo] = useState(0);
  
  // UI State
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

  const timerRef = useRef(null);
  const flashTimerRef = useRef(null);
  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const feedbackTimeoutRef = useRef(null);
  const audioCtxRef = useRef(null);

  // Expanded word bank
  const WORD_BANK = [
    'DATA', 'CORE', 'VIEW', 'FAST', 'SPAN', 'LINK', 'NODE', 'FLOW',
    'READ', 'MIND', 'EDGE', 'GRID', 'ZONE', 'PEAK', 'BOLD', 'TRUE',
    'CODE', 'SYNC', 'WAVE', 'PATH', 'VOID', 'RISE', 'DEEP', 'HIGH',
    'MOVE', 'JUMP', 'RACE', 'TIME', 'FOCUS', 'SHARP', 'QUICK', 'CLEAR',
    'BYTE', 'CHIP', 'DASH', 'ECHO', 'FLEX', 'GLOW', 'HASH', 'IRIS'
  ];

  // Load best score
  useEffect(() => {
    const savedBestScore = localStorage.getItem('peripheralReaderDrillBestScore');
    if (savedBestScore) {
      setBestScore(parseInt(savedBestScore, 10));
    }
  }, []);

  // Update best score
  useEffect(() => {
    if (gameState === 'gameOver' && score > bestScore) {
      setBestScore(score);
      localStorage.setItem('peripheralReaderDrillBestScore', score.toString());
    }
  }, [gameState, score, bestScore]);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  // Handle fullscreen change
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Toggle fullscreen
  const toggleFullscreen = async () => {
    try {
      if (!isFullscreen) {
        const element = containerRef.current;
        if (element.requestFullscreen) {
          await element.requestFullscreen();
          setIsFullscreen(true);
        }
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch (error) {
      console.error('Fullscreen error:', error);
    }
  };

  const showFeedbackMessage = (message, type) => {
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    setFeedback(message);
    setFeedbackType(type);
    feedbackTimeoutRef.current = setTimeout(() => {
      setFeedback('');
      setFeedbackType('');
    }, 500);
  };

  const initAudio = () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  };

  // Play sound effect
  const playSound = (type) => {
    if (!soundEnabled) return;
    try {
      const audioCtx = initAudio();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      
      if (type === 'correct') {
        oscillator.frequency.value = 880;
        gainNode.gain.value = 0.1;
        oscillator.start();
        gainNode.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 0.1);
        oscillator.stop(audioCtx.currentTime + 0.1);
      } else if (type === 'wrong') {
        oscillator.frequency.value = 440;
        gainNode.gain.value = 0.1;
        oscillator.start();
        gainNode.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 0.15);
        oscillator.stop(audioCtx.currentTime + 0.15);
      } else if (type === 'combo') {
        oscillator.frequency.value = 1046.5;
        gainNode.gain.value = 0.12;
        oscillator.start();
        gainNode.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 0.15);
        oscillator.stop(audioCtx.currentTime + 0.15);
      }
    } catch (e) {
      // Ignore audio errors
    }
  };

  // Generate unique word - based on difficulty mode
  const generateWordPair = useCallback(() => {
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
    setTotalFlashes(prev => prev + 1);
  }, [usedWords, difficulty]);

  // Flash effect
  useEffect(() => {
    if (gameState === 'playing' && !showInput) {
      flashTimerRef.current = setInterval(() => {
        generateWordPair();
      }, speed);
    }
    return () => clearInterval(flashTimerRef.current);
  }, [gameState, showInput, speed, generateWordPair]);

  // Timer
  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setGameState('gameOver');
            setShowInput(false);
            if (timerRef.current) clearInterval(timerRef.current);
            if (flashTimerRef.current) clearInterval(flashTimerRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameState, timeLeft]);

  // Keyboard handler
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (gameState === 'playing' && !showInput && e.code === 'Space') {
        e.preventDefault();
        handlePauseAndAnswer();
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameState, showInput]);

  const handlePauseAndAnswer = () => {
    if (flashTimerRef.current) clearInterval(flashTimerRef.current);
    
    let targetSide;
    if (difficulty === 'LEFT') {
      targetSide = 'left';
    } else if (difficulty === 'RIGHT') {
      targetSide = 'right';
    } else {
      targetSide = Math.random() < 0.5 ? 'left' : 'right';
    }
    
    setCurrentTargetSide(targetSide);
    setCurrentTargetWord(targetSide === 'left' ? wordPair.left : wordPair.right);
    setShowInput(true);
    setShowCorrectAnswer(false);
    setIsCorrect(false);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const getAccuracy = () => {
    const total = correctCount + incorrectCount;
    return total > 0 ? Math.round((correctCount / total) * 100) : 100;
  };

  const handleSubmitAnswer = () => {
    const answer = userAnswer.toUpperCase().trim();
    const correct = answer === currentTargetWord;
    
    setIsCorrect(correct);
    setShowCorrectAnswer(true);
    
    if (correct) {
      // Score: 2 points for BOTH mode, 1 point for LEFT/RIGHT mode
      const basePoints = difficulty === 'BOTH' ? 2 : 1;
      const comboBonus = Math.floor(combo / 3);
      const totalPoints = basePoints + comboBonus;
      
      setScore(prev => prev + totalPoints);
      setCorrectCount(prev => prev + 1);
      setCombo(prev => {
        const newCombo = prev + 1;
        if (newCombo > 0 && newCombo % 3 === 0) {
          playSound('combo');
          showFeedbackMessage(`🔥 ${newCombo}x Combo! +${comboBonus} bonus!`, 'success');
        }
        return newCombo;
      });
      playSound('correct');
      showFeedbackMessage(`✓ Correct! +${totalPoints}`, 'success');
      
      // Auto advance after correct
      setTimeout(() => {
        setUserAnswer('');
        setShowInput(false);
        setShowCorrectAnswer(false);
        setCurrentTargetSide(null);
        setCurrentTargetWord('');
        generateWordPair();
      }, 600);
    } else {
      setScore(prev => Math.max(0, prev - 1));
      setIncorrectCount(prev => prev + 1);
      setCombo(0);
      playSound('wrong');
      showFeedbackMessage(`✗ Wrong! Correct was: ${currentTargetWord}. -1`, 'error');
      
      // Longer delay for wrong answer
      setTimeout(() => {
        setUserAnswer('');
        setShowInput(false);
        setShowCorrectAnswer(false);
        setCurrentTargetSide(null);
        setCurrentTargetWord('');
        generateWordPair();
      }, 1200);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && userAnswer.trim() && !showCorrectAnswer) {
      handleSubmitAnswer();
    }
  };

  const startGame = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (flashTimerRef.current) clearInterval(flashTimerRef.current);
    
    setGameState('playing');
    setScore(0);
    setTimeLeft(60);
    setTotalFlashes(0);
    setCorrectCount(0);
    setIncorrectCount(0);
    setCombo(0);
    setShowInput(false);
    setUserAnswer('');
    setFeedback('');
    setShowCorrectAnswer(false);
    setUsedWords(new Set());
    setCurrentTargetSide(null);
    setCurrentTargetWord('');
    
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
  };

  const resetGame = () => {
    setGameState('start');
  };

  const handleSpeedUp = () => setSpeed(s => Math.max(100, s - 50));
  const handleSpeedDown = () => setSpeed(s => Math.min(1000, s + 50));

  const getDifficultyGradient = () => {
    if (difficulty === 'LEFT') return 'from-blue-500 to-cyan-600';
    if (difficulty === 'RIGHT') return 'from-green-500 to-emerald-600';
    return 'from-sky-500 to-blue-600';
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (flashTimerRef.current) clearInterval(flashTimerRef.current);
      if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-sky-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading drill...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen select-none ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6">
          <Link 
            href="/drills/academic" 
            className={`inline-flex items-center gap-2 mb-4 ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Academic Drills
          </Link>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-xl bg-gradient-to-r ${getDifficultyGradient()}`}>
                <Eye className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Peripheral Span Lab</h1>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Train extrafoveal processing • 60 seconds
                </p>
              </div>
            </div>
            
            {/* Control Buttons */}
            <div className="flex gap-2">
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

        {/* Stats Board - Peripheral Reader specific metrics */}
        <div className="grid grid-cols-7 gap-3 mb-4 h-[88px]">
          <StatCard icon={<Target className="text-blue-600" />} value={score} label="Score" isDark={isDarkMode} />
          <StatCard icon={<Trophy className="text-yellow-600" />} value={bestScore} label="Best Score" isDark={isDarkMode} />
          <StatCard icon={<Timer className={timeLeft <= 10 ? 'text-red-600' : 'text-green-600'} />} value={timeLeft} label="Time" unit="s" isDark={isDarkMode} />
          <StatCard icon={<CheckCircle2 className="text-emerald-600" />} value={correctCount} label="Correct" isDark={isDarkMode} />
          <StatCard icon={<BarChart3 className="text-purple-600" />} value={getAccuracy()} label="Accuracy" unit="%" isDark={isDarkMode} />
          <StatCard icon={<Zap className="text-orange-600" />} value={combo} label="Combo" isDark={isDarkMode} />
          <StatCard icon={difficulty === 'LEFT' ? <MoveLeft className="text-blue-600" /> : difficulty === 'RIGHT' ? <MoveRight className="text-green-600" /> : <GitBranch className="text-purple-600" />} value={difficulty} label="Mode" isDark={isDarkMode} />
        </div>

        {/* Feedback Bar */}
        <div className="h-8 mb-2 flex justify-center items-center">
          <div className={`px-4 py-1 rounded-lg text-white font-medium text-sm transition-opacity duration-150 ${feedback ? 'opacity-100' : 'opacity-0'} ${
            feedbackType === 'success' ? 'bg-green-500' : 'bg-red-500'
          }`}>
            {feedback || 'placeholder'}
          </div>
        </div>

        {/* Difficulty and Speed Controls - Below Stats Board */}
        {gameState === 'start' && (
          <div className="flex flex-wrap items-center justify-center gap-4 mb-4">
            {/* Difficulty Selector */}
            <div className={`flex p-1 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
              {[
                { id: 'LEFT', label: 'Left (1pt)', icon: <MoveLeft className="w-3 h-3" /> },
                { id: 'RIGHT', label: 'Right (1pt)', icon: <MoveRight className="w-3 h-3" /> },
                { id: 'BOTH', label: 'Both (2pt)', icon: <GitBranch className="w-3 h-3" /> }
              ].map(d => (
                <button
                  key={d.id}
                  onClick={() => setDifficulty(d.id)}
                  className={`px-5 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${
                    difficulty === d.id 
                      ? d.id === 'LEFT' 
                        ? 'bg-gradient-to-r from-blue-500 to-cyan-600 text-white shadow-lg'
                        : d.id === 'RIGHT'
                        ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg'
                        : 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg'
                      : `${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`
                  }`}
                >
                  {d.icon} {d.label}
                </button>
              ))}
            </div>
            
            {/* Speed Control */}
            <div className={`flex items-center gap-3 p-2 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white border border-gray-200'}`}>
              <span className={`text-sm font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Speed:
              </span>
              <button onClick={handleSpeedDown} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg">
                <ChevronDown className="w-4 h-4" />
              </button>
              <span className={`text-lg font-bold min-w-[60px] text-center ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{speed}ms</span>
              <button onClick={handleSpeedUp} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg">
                <ChevronUp className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Game Container - 16:9 Ratio Box */}
        <div 
          ref={containerRef}
          className={`relative ${isFullscreen ? 'fixed inset-0 z-50' : 'rounded-xl border-2'}`}
          style={{ 
            background: isBoxDarkMode ? "#0a0a0a" : "#ffffff",
            aspectRatio: '16/9',
            maxWidth: '100%',
            margin: '0 auto',
            borderColor: isDarkMode ? '#374151' : '#e5e7eb',
            overflow: 'hidden'
          }}
        >
          {isFullscreen && gameState === 'playing' && (
            <div className="absolute top-4 right-4 z-30 flex gap-3">
              <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 bg-black/50 rounded-lg text-white hover:bg-black/70 transition-all">{isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}</button>
              <button onClick={() => setIsBoxDarkMode(!isBoxDarkMode)} className="p-2 bg-black/50 rounded-lg text-white hover:bg-black/70 transition-all"><Eye className="w-5 h-5" /></button>
              <button onClick={() => setSoundEnabled(!soundEnabled)} className="p-2 bg-black/50 rounded-lg text-white hover:bg-black/70 transition-all">{soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}</button>
              <button onClick={toggleFullscreen} className="p-2 bg-black/50 rounded-lg text-white hover:bg-black/70 transition-all"><Minimize2 className="w-5 h-5" /></button>
            </div>
          )}

          {/* Content Area */}
          <div className="absolute inset-0 flex items-center justify-center p-8 overflow-y-auto">
            {/* Start Screen */}
            {gameState === 'start' && (
              <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
                <div className={`rounded-2xl p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                  <Eye className="w-16 h-16 text-sky-500 mx-auto mb-4" />
                  <h3 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Peripheral Span Lab</h3>
                  <p className={`mb-6 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>60-second challenge • {difficulty} mode • {speed}ms</p>
                  <button 
                    onClick={startGame} 
                    className={`px-8 py-3 bg-gradient-to-r ${getDifficultyGradient()} text-white rounded-xl font-semibold hover:shadow-lg w-full transition-all transform hover:scale-[1.02] active:scale-[0.98]`}
                  >
                    Start Drill
                  </button>
                </div>
              </div>
            )}

            {/* Playing Screen */}
            {gameState === 'playing' && (
              <div className="relative w-full h-full flex items-center justify-center">
                {!showInput ? (
                  <>
                    {/* Central Fixation Cross */}
                    <div className="absolute z-10 w-10 h-10 flex items-center justify-center">
                      <div className={`absolute w-full h-0.5 ${isBoxDarkMode ? 'bg-gray-600' : 'bg-gray-400'}`} />
                      <div className={`absolute h-full w-0.5 ${isBoxDarkMode ? 'bg-gray-600' : 'bg-gray-400'}`} />
                      <div className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
                    </div>

                    {/* Words at Extreme Edges */}
                    <div className="absolute inset-x-0 flex justify-between items-center px-4">
                      <div className={`text-4xl md:text-6xl font-bold tracking-tight ${
                        difficulty === 'LEFT' || difficulty === 'BOTH' 
                          ? isBoxDarkMode ? 'text-white' : 'text-gray-900'
                          : 'opacity-0'
                      }`}>
                        {difficulty === 'RIGHT' ? '' : wordPair.left}
                      </div>
                      <div className={`text-4xl md:text-6xl font-bold tracking-tight ${
                        difficulty === 'RIGHT' || difficulty === 'BOTH'
                          ? isBoxDarkMode ? 'text-white' : 'text-gray-900'
                          : 'opacity-0'
                      }`}>
                        {difficulty === 'LEFT' ? '' : wordPair.right}
                      </div>
                    </div>

                    <div className="absolute bottom-10 flex flex-col items-center gap-2">
                      <button 
                        onClick={handlePauseAndAnswer}
                        className={`px-8 py-3 bg-gradient-to-r ${getDifficultyGradient()} text-white rounded-xl font-bold hover:shadow-lg transition-all`}
                      >
                        Press SPACE to Answer
                      </button>
                      <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        Mode: {difficulty} ({difficulty === 'BOTH' ? '2' : '1'}pt) | Speed: {speed}ms
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="text-center w-full max-w-md">
                    <div className={`mb-6 p-4 rounded-xl ${isBoxDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                      <p className={`text-lg font-bold mb-2 ${
                        currentTargetSide === 'left' ? 'text-blue-500' : 'text-green-500'
                      }`}>
                        What word was on the <span className="uppercase">{currentTargetSide}</span> side?
                      </p>
                      {showCorrectAnswer && !isCorrect && (
                        <p className="text-green-500 font-bold">
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
                      className={`w-full p-4 rounded-xl text-center text-2xl font-bold outline-none border-2 transition-all ${
                        showCorrectAnswer 
                          ? isCorrect
                            ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                            : 'border-red-500 bg-red-50 dark:bg-red-900/20 opacity-50'
                          : isBoxDarkMode 
                            ? 'bg-gray-800 border-gray-700 text-white' 
                            : 'bg-gray-100 border-gray-200 text-gray-900'
                      }`}
                      placeholder={`Type the ${currentTargetSide} word...`}
                      autoFocus
                    />
                    {!showCorrectAnswer ? (
                      <div className="flex gap-3 mt-4">
                        <button
                          onClick={handleSubmitAnswer}
                          disabled={!userAnswer.trim()}
                          className={`flex-1 px-4 py-3 bg-gradient-to-r ${getDifficultyGradient()} text-white rounded-xl font-bold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed`}
                        >
                          Submit
                        </button>
                        <button
                          onClick={() => {
                            setShowInput(false);
                            setUserAnswer('');
                            setShowCorrectAnswer(false);
                            generateWordPair();
                          }}
                          className={`px-4 py-3 rounded-xl font-bold transition ${
                            isBoxDarkMode 
                              ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                          }`}
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          setShowInput(false);
                          setUserAnswer('');
                          setShowCorrectAnswer(false);
                          generateWordPair();
                        }}
                        className={`w-full mt-4 px-4 py-3 bg-gradient-to-r ${getDifficultyGradient()} text-white rounded-xl font-bold hover:shadow-lg transition-all`}
                      >
                        Continue
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Game Over Screen */}
            {gameState === 'gameOver' && (
              <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
                <div className={`rounded-2xl p-8 shadow-xl border w-[480px] ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                  <div className="flex items-center justify-center gap-3 mb-6">
                    <Trophy className="w-10 h-10 text-yellow-500" />
                    <h3 className={`text-2xl font-bold ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Drill Complete!</h3>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <ResultCard label="Final Score" value={score} icon={<Target className="w-4 h-4" />} color="text-yellow-500" />
                    <ResultCard label="Best Score" value={bestScore} icon={<Trophy className="w-4 h-4" />} color="text-yellow-500" />
                    <ResultCard label="Accuracy" value={getAccuracy()} unit="%" icon={<BarChart3 className="w-4 h-4" />} color="text-purple-500" />
                    <ResultCard label="Correct" value={correctCount} icon={<CheckCircle2 className="w-4 h-4" />} color="text-green-500" />
                    <ResultCard label="Errors" value={incorrectCount} icon={<XCircle className="w-4 h-4" />} color="text-red-500" />
                    <ResultCard label="Max Combo" value={`${combo}x`} icon={<Zap className="w-4 h-4" />} color="text-orange-500" />
                    <ResultCard label="Mode" value={difficulty} icon={difficulty === 'LEFT' ? <MoveLeft className="w-4 h-4" /> : difficulty === 'RIGHT' ? <MoveRight className="w-4 h-4" /> : <GitBranch className="w-4 h-4" />} color="text-cyan-500" />
                  </div>
                  
                  <div className="flex gap-4">
                    <Link href="/drills/academic" className="flex-1">
                      <button className={`w-full px-4 py-2.5 rounded-lg font-semibold transition-all ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                        ← Back
                      </button>
                    </Link>
                    <button 
                      onClick={resetGame} 
                      className={`flex-1 px-4 py-2.5 bg-gradient-to-r ${getDifficultyGradient()} text-white rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98]`}
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
                  <Info className={`w-4 h-4 ${isDarkMode ? 'text-sky-400' : 'text-sky-600'}`} />
                  <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Drill Rules & Scoring</h3>
                </div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-sky-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">1</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Keep eyes fixed on <span className="font-semibold text-sky-500">center cross</span> at all times</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">2</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Left/Right: <span className="font-semibold text-green-500">1 point</span> | Both: <span className="font-semibold text-green-500">2 points</span></p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">3</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Wrong: <span className="font-semibold text-red-500">-1 point</span> + correct answer revealed</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">4</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Every 3 correct = <span className="font-semibold text-blue-500">+1 combo bonus</span></p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">5</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Press <span className="font-semibold text-purple-500">SPACEBAR</span> to pause and answer</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">6</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Adjust speed <span className="font-semibold text-yellow-500">100-1000ms</span> before starting</p>
                    </div>
                  </div>
                </div>
                <div className={`mt-3 pt-3 border-t text-xs ${isDarkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'} flex items-center justify-between`}>
                  <span>👁️ Train extrafoveal processing • 40+ unique words</span>
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
                   color === 'text-orange-500' ? 'bg-orange-500/10' : 'bg-cyan-500/10';
  
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