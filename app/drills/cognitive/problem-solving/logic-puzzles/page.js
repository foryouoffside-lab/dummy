'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Target, Zap, Timer, Trophy, Heart, 
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, Eye,
  BarChart3, Info, CheckCircle, Puzzle, Lightbulb, TrendingUp, Infinity
} from 'lucide-react';

export default function LogicPuzzlesPage() {
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
  const [lives, setLives] = useState(3);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isBoxDarkMode, setIsBoxDarkMode] = useState(true);
  const [showHint, setShowHint] = useState(false);
  const [hintUsed, setHintUsed] = useState(false);
  const [totalSolved, setTotalSolved] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [usedPuzzleIds, setUsedPuzzleIds] = useState(new Set());
  
  const inputRef = useRef(null);
  const feedbackTimeoutRef = useRef(null);
  const timerIntervalRef = useRef(null);
  const audioContextRef = useRef(null);
  const scoreRef = useRef(0);
  const comboRef = useRef(0);
  const livesRef = useRef(3);
  const gameStateRef = useRef('start');
  const clickCooldownRef = useRef(false);

  // Load best score from localStorage on mount
  useEffect(() => {
    const savedBestScore = localStorage.getItem('logicPuzzlesDrillBestScore');
    if (savedBestScore) {
      setBestScore(parseInt(savedBestScore, 10));
    }
  }, []);

  // Sync gameState to ref
  useEffect(() => {
    gameStateRef.current = gameState;
  }, [gameState]);

  // Update best score when game ends
  useEffect(() => {
    if (gameState === 'ended' && score > bestScore) {
      setBestScore(score);
      localStorage.setItem('logicPuzzlesDrillBestScore', score.toString());
    }
  }, [gameState, score, bestScore]);

  // Cleanup timers
  useEffect(() => {
    return () => {
      if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      if (audioContextRef.current) audioContextRef.current.close();
    };
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

  // Initialize audio context
  const initAudio = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }
    return audioContextRef.current;
  }, []);

  // Play sound
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
      } else if (type === 'wrong') {
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
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [gameState]);

  // Puzzle template generators
  const puzzleGenerators = {
    sequence_add: (level) => {
      const start = Math.floor(Math.random() * 5) + 2;
      const increment = Math.floor(Math.random() * 3) + 2;
      const seq = [start, start + increment, start + increment * 2, start + increment * 3];
      const answer = start + increment * 4;
      return {
        id: `seq_add_${start}_${increment}_${Date.now()}`,
        question: `What comes next? ${seq[0]}, ${seq[1]}, ${seq[2]}, ${seq[3]}, ?`,
        answer: answer.toString(),
        hint: `Add ${increment} each time`,
        pattern: "Arithmetic Sequence"
      };
    },
    
    sequence_multiply: (level) => {
      const start = Math.floor(Math.random() * 3) + 2;
      const multiplier = Math.floor(Math.random() * 2) + 2;
      const seq = [start, start * multiplier, start * multiplier * multiplier, start * multiplier * multiplier * multiplier];
      const answer = seq[3] * multiplier;
      return {
        id: `seq_mult_${start}_${multiplier}_${Date.now()}`,
        question: `What comes next? ${seq[0]}, ${seq[1]}, ${seq[2]}, ${seq[3]}, ?`,
        answer: answer.toString(),
        hint: `Multiply by ${multiplier} each time`,
        pattern: "Geometric Sequence"
      };
    },

    algebra_simple: (level) => {
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

    order_of_operations: (level) => {
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

    fibonacci_like: (level) => {
      const a = Math.floor(Math.random() * 5) + 2;
      const b = Math.floor(Math.random() * 5) + 3;
      const c = a + b;
      const d = b + c;
      const e = c + d;
      const answer = d + e;
      return {
        id: `fib_${a}_${b}_${Date.now()}`,
        question: `Find next: ${a}, ${b}, ${c}, ${d}, ${e}, ?`,
        answer: answer.toString(),
        hint: `Each number is sum of previous two`,
        pattern: "Fibonacci-like Sequence"
      };
    },

    exponent_pattern: (level) => {
      const base = Math.floor(Math.random() * 3) + 2;
      const seq = [base, base**2, base**3, base**4];
      const answer = base**5;
      return {
        id: `exp_${base}_${Date.now()}`,
        question: `What comes next? ${seq[0]}, ${seq[1]}, ${seq[2]}, ${seq[3]}, ?`,
        answer: answer.toString(),
        hint: `Powers of ${base}`,
        pattern: "Exponential Sequence"
      };
    },

    reverse_number: (level) => {
      const num = Math.floor(Math.random() * 900) + 100;
      const reversed = parseInt(num.toString().split('').reverse().join(''));
      const answer = num + reversed;
      return {
        id: `reverse_${num}_${Date.now()}`,
        question: `Take ${num}, reverse its digits (${reversed}), and add them. What's the sum?`,
        answer: answer.toString(),
        hint: `${num} + ${reversed} = ?`,
        pattern: "Number Manipulation"
      };
    },

    percentage_calculation: (level) => {
      const total = Math.floor(Math.random() * 200) + 50;
      const percent = Math.floor(Math.random() * 40) + 10;
      const answer = Math.round(total * percent / 100);
      return {
        id: `percent_${total}_${percent}_${Date.now()}`,
        question: `What is ${percent}% of ${total}?`,
        answer: answer.toString(),
        hint: `Multiply ${total} by ${percent}/100`,
        pattern: "Percentages"
      };
    }
  };

  const getGeneratorByLevel = (currentLevel) => {
    return Object.values(puzzleGenerators);
  };

  const generateNewPuzzle = useCallback(() => {
    const generators = getGeneratorByLevel(level);
    let attempts = 0;
    let newPuzzle = null;
    let generator;
    
    while (attempts < 50) {
      generator = generators[Math.floor(Math.random() * generators.length)];
      newPuzzle = generator(level);
      
      if (!usedPuzzleIds.has(newPuzzle.id)) {
        break;
      }
      attempts++;
      newPuzzle = null;
    }
    
    if (!newPuzzle) {
      generator = generators[Math.floor(Math.random() * generators.length)];
      newPuzzle = generator(level);
      newPuzzle.id = `${newPuzzle.id}_${Date.now()}_${Math.random()}`;
    }
    
    setCurrentPuzzle(newPuzzle);
    setUsedPuzzleIds(prev => new Set([...prev, newPuzzle.id]));
    setUserAnswer('');
    setShowHint(false);
    setHintUsed(false);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [level, usedPuzzleIds]);

  useEffect(() => {
    if (gameState === 'playing' && currentPuzzle === null) {
      generateNewPuzzle();
    }
  }, [gameState, currentPuzzle, generateNewPuzzle]);

  const getAccuracy = () => {
    if (totalAttempts === 0) return 100;
    return Math.round((totalSolved / totalAttempts) * 100);
  };

  const handleMiss = () => {
    comboRef.current = 0;
    setCombo(0);
    
    // Use one life for wrong answer
    if (livesRef.current > 0) {
      livesRef.current -= 1;
      setLives(livesRef.current);
      playSound('wrong');
      showFeedback(`✗ Wrong! -1 life`, 'error');
    }
    
    // If no lives left, apply penalty of 5 points
    if (livesRef.current === 0) {
      scoreRef.current = Math.max(0, scoreRef.current - 5);
      setScore(scoreRef.current);
      playSound('penalty');
      showFeedback(`✗ Wrong! -5 points`, 'error');
    }
  };

  const checkAnswer = () => {
    if (!currentPuzzle || !userAnswer.trim()) return;
    if (clickCooldownRef.current) return;
    
    clickCooldownRef.current = true;
    setTotalAttempts(prev => prev + 1);
    
    const userAnswerLower = userAnswer.toLowerCase().trim();
    const correctAnswerLower = currentPuzzle.answer.toLowerCase();
    
    const isCorrect = userAnswerLower === correctAnswerLower;
    
    if (isCorrect) {
      // +5 points for correct answer
      scoreRef.current += 5;
      setScore(scoreRef.current);
      comboRef.current++;
      setCombo(comboRef.current);
      
      if (comboRef.current > bestCombo) {
        setBestCombo(comboRef.current);
      }
      
      setTotalSolved(prev => prev + 1);
      
      if (comboRef.current % 5 === 0) {
        playSound('combo');
        showFeedback(`🔥 ${comboRef.current}x Combo! +5`, 'success');
      } else {
        playSound('correct');
        showFeedback(`✓ +5`, 'success');
      }
      
      if (totalSolved + 1 >= level * 3) {
        setLevel(prev => prev + 1);
      }
      
      generateNewPuzzle();
    } else {
      handleMiss();
      // Keep same puzzle on wrong answer
    }
    
    setTimeout(() => {
      clickCooldownRef.current = false;
    }, 100);
  };

  const handleShowHint = () => {
    setShowHint(!showHint);
    if (!showHint) {
      setHintUsed(true);
    }
  };

  const startGame = () => {
    setGameState('playing');
    gameStateRef.current = 'playing';
    setScore(0);
    setLevel(1);
    setTimeRemaining(60);
    setCombo(0);
    setBestCombo(0);
    setLives(3);
    setTotalSolved(0);
    setTotalAttempts(0);
    setUsedPuzzleIds(new Set());
    setCurrentPuzzle(null);
    setFeedback('');
    
    scoreRef.current = 0;
    comboRef.current = 0;
    livesRef.current = 3;
    clickCooldownRef.current = false;
    
    playSound('correct');
  };

  const resetGame = () => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    setGameState('start');
    gameStateRef.current = 'start';
  };

  return (
    <div className={`min-h-screen select-none ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6">
          <Link href="/drills/cognitive" className={`inline-flex items-center gap-2 mb-4 ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>
            <ArrowLeft className="w-4 h-4" /> Back to Cognitive Drills
          </Link>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl">
                <Infinity className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Logic Puzzles</h1>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Solve puzzles • +5/-5 • 3 lives</p>
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

        {/* Stats Board - 8 columns */}
        <div className="grid grid-cols-8 gap-3 mb-4 h-[88px]">
          <StatCard icon={<Target className="text-blue-600" />} value={score} label="Score" isDark={isDarkMode} />
          <StatCard icon={<Trophy className="text-yellow-600" />} value={bestScore} label="Best" isDark={isDarkMode} />
          <StatCard icon={<Timer className={timeRemaining <= 10 ? 'text-red-600' : 'text-green-600'} />} value={`${timeRemaining}s`} label="Time" isDark={isDarkMode} />
          <StatCard icon={<CheckCircle className="text-emerald-600" />} value={totalSolved} label="Solved" isDark={isDarkMode} />
          <StatCard icon={<BarChart3 className="text-purple-600" />} value={getAccuracy()} label="Acc" unit="%" isDark={isDarkMode} />
          <StatCard icon={<Zap className="text-orange-600" />} value={combo} label="Combo" isDark={isDarkMode} />
          <StatCard icon={<Puzzle className="text-cyan-600" />} value={currentPuzzle?.pattern || '-'} label="Type" isDark={isDarkMode} />
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
              <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 bg-black/50 rounded-lg text-white hover:bg-black/70 transition-all">{isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}</button>
              <button onClick={() => setIsBoxDarkMode(!isBoxDarkMode)} className="p-2 bg-black/50 rounded-lg text-white hover:bg-black/70 transition-all"><Eye className="w-5 h-5" /></button>
              <button onClick={() => setSoundEnabled(!soundEnabled)} className="p-2 bg-black/50 rounded-lg text-white hover:bg-black/70 transition-all">{soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}</button>
              <button onClick={toggleFullscreen} className="p-2 bg-black/50 rounded-lg text-white hover:bg-black/70 transition-all"><Minimize2 className="w-5 h-5" /></button>
            </div>
          )}

          <div className="absolute inset-0 flex items-center justify-center p-8">
            {/* Start Screen */}
            {gameState === 'start' && (
              <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
                <div className={`rounded-2xl p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                  <Puzzle className="w-16 h-16 text-purple-500 mx-auto mb-4" />
                  <h3 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Logic Puzzles</h3>
                  <p className={`mb-6 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>60-second challenge • +5 per solve • -5 penalty • 3 lives</p>
                  <button 
                    onClick={startGame}
                    className="px-8 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg w-full transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Start Drill
                  </button>
                </div>
              </div>
            )}

            {/* Playing Screen */}
            {gameState === 'playing' && currentPuzzle && (
              <div className="w-full max-w-2xl">
                <div className={`rounded-xl p-6 mb-6 ${isBoxDarkMode ? 'bg-gray-800' : 'bg-gradient-to-r from-indigo-50 to-purple-50'}`}>
                  <p className={`text-xl font-medium ${isBoxDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                    {currentPuzzle.question}
                  </p>
                </div>

                <div className="mb-4">
                  <label className={`block text-sm font-medium mb-2 ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                    Your Answer:
                  </label>
                  <div className="flex gap-3">
                    <input 
                      ref={inputRef} 
                      type="text" 
                      value={userAnswer} 
                      onChange={(e) => setUserAnswer(e.target.value)} 
                      onKeyPress={(e) => e.key === 'Enter' && checkAnswer()}
                      className={`flex-1 px-4 py-3 border-2 rounded-xl outline-none transition ${isBoxDarkMode ? 'bg-gray-700 border-gray-600 text-white focus:ring-2 focus:ring-purple-500' : 'bg-white border-gray-200 text-gray-900 focus:ring-2 focus:ring-purple-500'}`}
                      placeholder="Type your answer here..." 
                      autoFocus 
                    />
                    <button 
                      onClick={checkAnswer} 
                      className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg transition hover:scale-105 active:scale-95"
                    >
                      Submit
                    </button>
                  </div>
                </div>

                <button 
                  onClick={handleShowHint} 
                  className={`flex items-center gap-2 text-sm transition mb-4 ${isBoxDarkMode ? 'text-purple-400 hover:text-purple-300' : 'text-purple-600 hover:text-purple-700'}`}
                >
                  <Lightbulb className="w-4 h-4" />
                  {showHint ? 'Hide Hint' : 'Show Hint'}
                </button>

                {showHint && (
                  <div className={`rounded-lg p-4 ${isBoxDarkMode ? 'bg-yellow-900/30 border border-yellow-700' : 'bg-yellow-50 border border-yellow-200'}`}>
                    <p className={`text-sm ${isBoxDarkMode ? 'text-yellow-300' : 'text-yellow-800'}`}>
                      <strong>💡 Hint:</strong> {currentPuzzle.hint}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Game Over Screen */}
            {gameState === 'ended' && (
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
                    <ResultCard label="Puzzles Solved" value={totalSolved} icon={<CheckCircle className="w-4 h-4" />} color="text-green-500" />
                    <ResultCard label="Best Combo" value={`${bestCombo}x`} icon={<Zap className="w-4 h-4" />} color="text-orange-500" />
                    <ResultCard label="Final Level" value={level} icon={<TrendingUp className="w-4 h-4" />} color="text-blue-500" />
                  </div>
                  
                  <div className="flex gap-4">
                    <Link href="/drills/cognitive" className="flex-1">
                      <span className={`block w-full px-4 py-2.5 rounded-lg font-semibold transition-all text-center ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                        ← Back
                      </span>
                    </Link>
                    <button 
                      onClick={resetGame}
                      className="flex-1 px-4 py-2.5 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98]"
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
                  <Info className={`w-4 h-4 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
                  <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Drill Rules & Scoring</h3>
                </div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">1</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Solve <span className="font-semibold text-purple-500">unique logic puzzles</span> - never repeats</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">2</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Correct: <span className="font-semibold text-green-500">+5 points</span> • Fixed reward</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">3</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Wrong: <span className="font-semibold text-red-500">-1 life</span> • 3 lives system</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">4</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>No lives left: <span className="font-semibold text-orange-500">-5 point penalty</span> per mistake</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">5</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>8 puzzle types: <span className="font-semibold text-blue-500">Sequences, Algebra, PEMDAS, etc.</span></p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">6</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Use <span className="font-semibold text-yellow-500">hints</span> if you get stuck (no penalty)</p>
                    </div>
                  </div>
                </div>
                <div className={`mt-3 pt-3 border-t text-xs ${isDarkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'} flex items-center justify-between`}>
                  <span>🧩 Level up every 3 solved puzzles • 5 combo bonus notification</span>
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