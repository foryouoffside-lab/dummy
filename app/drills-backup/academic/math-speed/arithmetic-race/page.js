'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  Calculator, Zap, RotateCcw, 
  Volume2, VolumeX, Sun, Moon, 
  Target, Activity, Hash,
  ArrowLeft, Eye, Maximize2, Minimize2, Timer, Trophy,
  BarChart3, Info, CheckCircle2, XCircle
} from 'lucide-react';

export default function ArithmeticRaceDrill() {
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

  const startTimeRef = useRef(null);
  const timerRef = useRef(null);
  const containerRef = useRef(null);
  const usedQuestionsRef = useRef(new Set());
  const timeoutRef = useRef(null);
  const feedbackTimeoutRef = useRef(null);
  const audioCtxRef = useRef(null);

  // Load best score
  useEffect(() => {
    const savedBestScore = localStorage.getItem('arithmeticRaceDrillBestScore');
    if (savedBestScore) {
      setBestScore(parseInt(savedBestScore, 10));
    }
  }, []);

  // Update best score
  useEffect(() => {
    if (gameState === 'gameOver' && score > bestScore) {
      setBestScore(score);
      localStorage.setItem('arithmeticRaceDrillBestScore', score.toString());
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

  const showFeedback = (message, type) => {
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
        op = ops[Math.floor(Math.random() * 2)];
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
    
    // Generate options
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
    startTimeRef.current = Date.now();
    setSelectedOption(null);
    setCanSelect(true);
    setShowCorrectAnswer(false);
  }, [difficulty]);

  const getAccuracy = () => {
    const total = solvedCount + errorCount;
    return total > 0 ? Math.round((solvedCount / total) * 100) : 100;
  };

  // Handle option selection
  const handleOptionSelect = (selectedAnswer) => {
    if (!canSelect || selectedOption !== null) return;
    if (timeLeft <= 0) return;
    
    setSelectedOption(selectedAnswer);
    setCanSelect(false);
    
    if (selectedAnswer === currentProblem.answer) {
      // Correct answer
      const basePoints = difficulty === 'ELITE' ? 20 : difficulty === 'PRO' ? 15 : 10;
      const comboBonus = Math.floor(combo / 3) * 3;
      const totalPoints = basePoints + comboBonus;
      
      setScore(prev => prev + totalPoints);
      setSolvedCount(prev => prev + 1);
      setCombo(prev => {
        const newCombo = prev + 1;
        if (newCombo > 0 && newCombo % 3 === 0) {
          playSound('combo');
          showFeedback(`🔥 ${newCombo}x Combo! +${comboBonus} bonus!`, 'success');
        }
        return newCombo;
      });
      playSound('correct');
      showFeedback(`✓ Correct! +${totalPoints}`, 'success');
      
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        generateProblem();
        timeoutRef.current = null;
      }, 400);
    } else {
      // Wrong answer - reveal correct and move to next
      setErrorCount(prev => prev + 1);
      setCombo(0);
      setScore(prev => Math.max(0, prev - 8));
      setShowCorrectAnswer(true);
      playSound('wrong');
      showFeedback(`✗ Wrong! Correct was ${currentProblem.answer}. -8`, 'error');
      
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        generateProblem();
        timeoutRef.current = null;
      }, 800); // Longer delay to show correct answer
    }
  };

  const startGame = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    
    setGameState('playing');
    setScore(0);
    setTimeLeft(60);
    setSolvedCount(0);
    setErrorCount(0);
    setCombo(0);
    setSelectedOption(null);
    setCanSelect(true);
    setFeedback('');
    setShowCorrectAnswer(false);
    usedQuestionsRef.current = new Set();
    generateProblem();
    playSound('correct');
  };

  const resetGame = () => {
    setGameState('start');
  };

  // Timer effect
  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setGameState('gameOver');
            if (timerRef.current) clearInterval(timerRef.current);
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
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

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
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
              <div className="p-3 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl">
                <Calculator className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Arithmetic Race</h1>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Speed math • 60 seconds</p>
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

        {/* Stats Board - Arithmetic Race specific metrics */}
        <div className="grid grid-cols-7 gap-3 mb-4 h-[88px]">
          <StatCard icon={<Target className="text-blue-600" />} value={score} label="Score" isDark={isDarkMode} />
          <StatCard icon={<Trophy className="text-yellow-600" />} value={bestScore} label="Best Score" isDark={isDarkMode} />
          <StatCard icon={<Timer className={timeLeft <= 10 ? 'text-red-600' : 'text-green-600'} />} value={timeLeft} label="Time" unit="s" isDark={isDarkMode} />
          <StatCard icon={<CheckCircle2 className="text-emerald-600" />} value={solvedCount} label="Solved" isDark={isDarkMode} />
          <StatCard icon={<BarChart3 className="text-purple-600" />} value={getAccuracy()} label="Accuracy" unit="%" isDark={isDarkMode} />
          <StatCard icon={<Zap className="text-orange-600" />} value={combo} label="Combo" isDark={isDarkMode} />
          <StatCard icon={<Hash className="text-cyan-600" />} value={difficulty} label="Difficulty" isDark={isDarkMode} />
        </div>

        {/* Feedback Bar */}
        <div className="h-8 mb-2 flex justify-center items-center">
          <div className={`px-4 py-1 rounded-lg text-white font-medium text-sm transition-opacity duration-150 ${feedback ? 'opacity-100' : 'opacity-0'} ${
            feedbackType === 'success' ? 'bg-green-500' : 'bg-red-500'
          }`}>
            {feedback || 'placeholder'}
          </div>
        </div>

        {/* Difficulty Selector */}
        {gameState === 'start' && (
          <div className="flex justify-center gap-3 mb-4">
            <div className={`flex p-1 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
              {['BASIC', 'PRO', 'ELITE'].map(d => (
                <button
                  key={d}
                  onClick={() => setDifficulty(d)}
                  className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${
                    difficulty === d 
                      ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg' 
                      : `${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`
                  }`}
                >
                  {d} {d === 'BASIC' ? '(10pt)' : d === 'PRO' ? '(15pt)' : '(20pt)'}
                </button>
              ))}
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
                  <Calculator className="w-16 h-16 text-orange-500 mx-auto mb-4" />
                  <h3 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Arithmetic Race</h3>
                  <p className={`mb-6 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>60-second challenge • {difficulty} mode</p>
                  <button 
                    onClick={startGame} 
                    className="px-8 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl font-semibold hover:shadow-lg w-full transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Start Drill
                  </button>
                </div>
              </div>
            )}

            {/* Playing Screen */}
            {gameState === 'playing' && (
              <div className="w-full max-w-2xl">
                <div className={`text-5xl md:text-7xl font-bold text-center mb-8 ${
                  isBoxDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {currentProblem.query} = ?
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  {currentProblem.options.map((option, index) => {
                    const isSelected = selectedOption === option;
                    const isCorrect = option === currentProblem.answer;
                    
                    let buttonClass = `p-6 rounded-2xl text-2xl md:text-3xl font-bold transition-all `;
                    
                    if (isSelected || (showCorrectAnswer && isCorrect)) {
                      if (isSelected && !isCorrect) {
                        buttonClass += 'bg-red-500 text-white scale-95';
                      } else if (isCorrect && showCorrectAnswer) {
                        buttonClass += 'bg-green-500 text-white scale-105 shadow-lg';
                      } else if (isSelected && isCorrect) {
                        buttonClass += 'bg-green-500 text-white scale-105 shadow-lg';
                      }
                    } else {
                      buttonClass += isBoxDarkMode 
                        ? 'bg-gray-800 text-white hover:bg-gray-700' 
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200';
                      buttonClass += canSelect && selectedOption === null
                        ? ' hover:scale-105 hover:shadow-lg cursor-pointer' 
                        : ' opacity-50 cursor-not-allowed';
                    }
                    
                    return (
                      <button
                        key={index}
                        onClick={() => canSelect && selectedOption === null && handleOptionSelect(option)}
                        disabled={!canSelect || selectedOption !== null}
                        className={buttonClass}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
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
                    <ResultCard label="Solved" value={solvedCount} icon={<CheckCircle2 className="w-4 h-4" />} color="text-green-500" />
                    <ResultCard label="Errors" value={errorCount} icon={<XCircle className="w-4 h-4" />} color="text-red-500" />
                    <ResultCard label="Max Combo" value={`${combo}x`} icon={<Zap className="w-4 h-4" />} color="text-orange-500" />
                    <ResultCard label="Difficulty" value={difficulty} icon={<Hash className="w-4 h-4" />} color="text-cyan-500" />
                  </div>
                  
                  <div className="flex gap-4">
                    <Link href="/drills/academic" className="flex-1">
                      <button className={`w-full px-4 py-2.5 rounded-lg font-semibold transition-all ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                        ← Back
                      </button>
                    </Link>
                    <button 
                      onClick={resetGame} 
                      className="flex-1 px-4 py-2.5 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98]"
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
                  <Info className={`w-4 h-4 ${isDarkMode ? 'text-orange-400' : 'text-orange-600'}`} />
                  <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Drill Rules & Scoring</h3>
                </div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">1</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Choose from <span className="font-semibold text-orange-500">4 possible answers</span> - one chance only</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">2</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Correct: <span className="font-semibold text-green-500">10-20 points + combo bonus</span></p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">3</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Wrong: <span className="font-semibold text-red-500">-8 points</span> + correct answer revealed</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">4</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Every 3 correct = <span className="font-semibold text-blue-500">+3 combo bonus</span></p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">5</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Questions <span className="font-semibold text-purple-500">never repeat</span> in same session</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">6</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Wrong answer = <span className="font-semibold text-yellow-500">immediate next question</span></p>
                    </div>
                  </div>
                </div>
                <div className={`mt-3 pt-3 border-t text-xs ${isDarkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'} flex items-center justify-between`}>
                  <span>🧮 BASIC: 10pt • PRO: 15pt • ELITE: 20pt per correct</span>
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