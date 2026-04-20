'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Target, Zap, Timer, Trophy, Heart, 
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, Eye,
  BarChart3, Info, Hash, Award, Crown
} from 'lucide-react';

export default function NumberRecallDrill() {
  const containerRef = useRef(null);
  
  // Drill Core State
  const [sequence, setSequence] = useState('');
  const [userInput, setUserInput] = useState('');
  const [gameState, setGameState] = useState('start');
  const [digitCount, setDigitCount] = useState(4);
  
  // Professional Metrics
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(60);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [combo, setCombo] = useState(0);
  const [bestCombo, setBestCombo] = useState(0);
  const [isMemoryMaster, setIsMemoryMaster] = useState(false);
  const [maxDigitsForLevel, setMaxDigitsForLevel] = useState(9);
  const [totalSequencesCompleted, setTotalSequencesCompleted] = useState(0);
  const [lives, setLives] = useState(3);
  
  // UI State
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isBoxDarkMode, setIsBoxDarkMode] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [displayDigit, setDisplayDigit] = useState('');
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  const inputRef = useRef(null);
  
  // Timers
  const sequenceTimerRef = useRef(null);
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
    const savedBestScore = localStorage.getItem('numberRecallDrillBestScore');
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
    if (gameState === 'gameOver' && score > bestScore) {
      setBestScore(score);
      localStorage.setItem('numberRecallDrillBestScore', score.toString());
    }
  }, [gameState, score, bestScore]);

  // Cleanup timers
  useEffect(() => {
    return () => {
      if (sequenceTimerRef.current) clearTimeout(sequenceTimerRef.current);
      if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      if (audioContextRef.current) audioContextRef.current.close();
    };
  }, []);

  // Timer logic - 60 second countdown
  useEffect(() => {
    if (gameState === 'playing' || gameState === 'showing' || gameState === 'input' || gameState === 'success' || gameState === 'fail') {
      timerIntervalRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            setGameState('gameOver');
            gameStateRef.current = 'gameOver';
            if (sequenceTimerRef.current) clearTimeout(sequenceTimerRef.current);
            if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, [gameState]);

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

  // Play digit tone
  const playDigitTone = useCallback((pos) => {
    if (!soundEnabled) return;
    
    try {
      const ctx = initAudio();
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.connect(g);
      g.connect(ctx.destination);
      osc.frequency.value = 440 + (pos * 40);
      osc.type = 'sine';
      g.gain.value = 0.1;
      osc.start();
      g.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 0.15);
      osc.stop(ctx.currentTime + 0.15);
    } catch (e) {}
  }, [soundEnabled, initAudio]);

  // Play success sound
  const playSuccessSound = useCallback(() => {
    if (!soundEnabled) return;
    try {
      const ctx = initAudio();
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.connect(g);
      g.connect(ctx.destination);
      osc.frequency.value = 880;
      g.gain.value = 0.12;
      osc.start();
      g.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 0.15);
      osc.stop(ctx.currentTime + 0.15);
    } catch (e) {}
  }, [soundEnabled, initAudio]);

  // Play fail sound
  const playFailSound = useCallback(() => {
    if (!soundEnabled) return;
    try {
      const ctx = initAudio();
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.connect(g);
      g.connect(ctx.destination);
      osc.frequency.value = 440;
      g.gain.value = 0.1;
      osc.start();
      g.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 0.15);
      osc.stop(ctx.currentTime + 0.15);
    } catch (e) {}
  }, [soundEnabled, initAudio]);

  // Play penalty sound
  const playPenaltySound = useCallback(() => {
    if (!soundEnabled) return;
    try {
      const ctx = initAudio();
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.connect(g);
      g.connect(ctx.destination);
      osc.frequency.value = 220;
      g.gain.value = 0.15;
      osc.start();
      g.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 0.15);
      osc.stop(ctx.currentTime + 0.15);
    } catch (e) {}
  }, [soundEnabled, initAudio]);

  // Play memory master celebration sound
  const playMasterSound = useCallback(() => {
    if (!soundEnabled) return;
    try {
      const ctx = initAudio();
      [523, 659, 783, 1046, 1318].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.connect(g);
        g.connect(ctx.destination);
        osc.frequency.value = freq;
        g.gain.value = 0.1;
        osc.start(ctx.currentTime + i * 0.1);
        g.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + i * 0.1 + 0.2);
        osc.stop(ctx.currentTime + i * 0.1 + 0.2);
      });
    } catch (e) {}
  }, [soundEnabled, initAudio]);

  // Get max digits for current level
  const getMaxDigitsForLevel = (level) => {
    if (level === 1) return 9;
    if (level === 2) return 16;
    if (level === 3) return 25;
    if (level === 4) return 36;
    if (level === 5) return 49;
    return level * level;
  };

  // Get starting digits for level
  const getStartDigitsForLevel = (level) => {
    if (level === 1) return 4;
    if (level === 2) return 8;
    if (level === 3) return 15;
    if (level === 4) return 25;
    if (level === 5) return 36;
    return Math.floor(level * level / 2);
  };

  // Get accuracy
  const getAccuracy = () => {
    const totalMisses = 3 - lives;
    const totalAttempts = totalSequencesCompleted + totalMisses;
    if (totalAttempts === 0) return 100;
    return Math.round((totalSequencesCompleted / totalAttempts) * 100);
  };

  const handleMiss = () => {
    // Use one life for miss
    if (livesRef.current > 0) {
      livesRef.current -= 1;
      setLives(livesRef.current);
      playFailSound();
      showFeedback(`✗ Incorrect! -1 life`, 'error');
    }
    
    // If no lives left, apply penalty of 3 points
    if (livesRef.current === 0) {
      scoreRef.current = Math.max(0, scoreRef.current - 3);
      setScore(scoreRef.current);
      playPenaltySound();
      showFeedback(`✗ -3 points!`, 'error');
    }
    
    comboRef.current = 0;
    setCombo(0);
  };

  // Start new round
  const startNewRound = useCallback(async (digits, resetLives = false) => {
    setGameState('showing');
    gameStateRef.current = 'showing';
    setUserInput('');
    setFeedback('');
    
    if (resetLives) {
      setLives(3);
      livesRef.current = 3;
    }
    
    const newSequence = Array.from({ length: digits }, () => Math.floor(Math.random() * 10)).join('');
    setSequence(newSequence);

    for (let i = 0; i < newSequence.length; i++) {
      setDisplayDigit(newSequence[i]);
      playDigitTone(i);
      await new Promise(r => {
        sequenceTimerRef.current = setTimeout(r, 800);
      });
      setDisplayDigit('');
      await new Promise(r => {
        sequenceTimerRef.current = setTimeout(r, 200);
      });
    }

    setGameState('input');
    gameStateRef.current = 'input';
    setTimeout(() => inputRef.current?.focus(), 100);
  }, [playDigitTone]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (gameStateRef.current !== 'input') return;
    if (clickCooldownRef.current) return;
    
    clickCooldownRef.current = true;
    
    if (userInput === sequence) {
      handleSuccess();
    } else {
      handleFailure();
    }
    
    setTimeout(() => {
      clickCooldownRef.current = false;
    }, 100);
  };

  const handleSuccess = () => {
    // +3 points for success
    scoreRef.current += 3;
    setScore(scoreRef.current);
    setTotalSequencesCompleted(prev => prev + 1);
    comboRef.current++;
    setCombo(comboRef.current);
    
    if (comboRef.current > bestCombo) {
      setBestCombo(comboRef.current);
    }
    
    setGameState('success');
    showFeedback(`✓ +3`, 'success');
    playSuccessSound();
    
    if (digitCount < maxDigitsForLevel) {
      feedbackTimeoutRef.current = setTimeout(() => {
        setDigitCount(prev => prev + 1);
        startNewRound(digitCount + 1, false);
      }, 800);
    } else if (currentLevel < 5) {
      const newLevel = currentLevel + 1;
      const newDigits = getStartDigitsForLevel(newLevel);
      feedbackTimeoutRef.current = setTimeout(() => {
        setCurrentLevel(newLevel);
        setDigitCount(newDigits);
        setMaxDigitsForLevel(getMaxDigitsForLevel(newLevel));
        startNewRound(newDigits, false);
      }, 800);
    } else {
      setGameState('memoryMaster');
      setIsMemoryMaster(true);
      playMasterSound();
    }
  };

  const handleFailure = () => {
    handleMiss();
    
    setGameState('fail');
    
    feedbackTimeoutRef.current = setTimeout(() => {
      // Keep current level and digit count, just try again
      startNewRound(digitCount, false);
    }, 1500);
  };

  // Start game
  const startGame = useCallback(() => {
    if (sequenceTimerRef.current) clearTimeout(sequenceTimerRef.current);
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    
    setGameState('playing');
    gameStateRef.current = 'playing';
    setTimeRemaining(60);
    setScore(0);
    setCurrentLevel(1);
    setDigitCount(4);
    setMaxDigitsForLevel(9);
    setCombo(0);
    setBestCombo(0);
    setUserInput('');
    setFeedback('');
    setIsMemoryMaster(false);
    setTotalSequencesCompleted(0);
    setLives(3);
    
    scoreRef.current = 0;
    comboRef.current = 0;
    livesRef.current = 3;
    clickCooldownRef.current = false;
    
    initAudio();
    
    setTimeout(() => startNewRound(4, true), 100);
  }, [startNewRound, initAudio]);

  const resetGame = () => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (sequenceTimerRef.current) clearTimeout(sequenceTimerRef.current);
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
              <div className="p-3 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl">
                <Hash className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Number Recall</h1>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Remember and recall digits • +3/-3 • 3 lives</p>
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
          <StatCard icon={<Award className="text-purple-600" />} value={`${currentLevel}/5`} label="Level" isDark={isDarkMode} />
          <StatCard icon={<Hash className="text-emerald-600" />} value={`${digitCount}/${maxDigitsForLevel}`} label="Digits" isDark={isDarkMode} />
          <StatCard icon={<BarChart3 className="text-amber-600" />} value={getAccuracy()} label="Acc" unit="%" isDark={isDarkMode} />
          <StatCard icon={<Zap className="text-orange-600" />} value={combo} label="Combo" isDark={isDarkMode} />
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

        {/* The Drill Core */}
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
          {isFullscreen && (gameState === 'playing' || gameState === 'showing' || gameState === 'input') && (
            <div className="absolute top-4 right-4 z-30 flex gap-3">
              <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 bg-black/50 rounded-lg text-white hover:bg-black/70 transition-all">{isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}</button>
              <button onClick={() => setIsBoxDarkMode(!isBoxDarkMode)} className="p-2 bg-black/50 rounded-lg text-white hover:bg-black/70 transition-all"><Eye className="w-5 h-5" /></button>
              <button onClick={() => setSoundEnabled(!soundEnabled)} className="p-2 bg-black/50 rounded-lg text-white hover:bg-black/70 transition-all">{soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}</button>
              <button onClick={toggleFullscreen} className="p-2 bg-black/50 rounded-lg text-white hover:bg-black/70 transition-all"><Minimize2 className="w-5 h-5" /></button>
            </div>
          )}

          {/* Game Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
            {/* Start Screen */}
            {gameState === 'start' && (
              <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
                <div className={`rounded-2xl p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                  <Hash className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
                  <h3 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Number Recall</h3>
                  <p className={`mb-6 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>60-second challenge • +3 per success • -3 penalty • 3 lives</p>
                  <button 
                    onClick={startGame}
                    className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-semibold hover:shadow-lg w-full transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Start Drill
                  </button>
                </div>
              </div>
            )}

            {/* Memory Master Screen */}
            {gameState === 'memoryMaster' && (
              <div className="text-center">
                <Crown className="w-24 h-24 text-yellow-500 mx-auto mb-4 animate-pulse" />
                <h2 className={`text-4xl font-bold mb-4 ${isBoxDarkMode ? 'text-yellow-400' : 'text-yellow-600'}`}>
                  Memory Master!
                </h2>
                <p className={`mb-6 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  You completed all 5 levels with 49 digits!
                </p>
                <button onClick={resetGame} className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-semibold hover:shadow-lg transition">
                  Play Again
                </button>
              </div>
            )}

            {/* Showing Screen */}
            {gameState === 'showing' && (
              <div className="text-center">
                <div className="text-[120px] md:text-[150px] font-black tracking-tighter text-emerald-500">
                  {displayDigit}
                </div>
                <div className="mt-6 flex gap-2 justify-center">
                  {sequence.split('').map((_, i) => (
                    <div 
                      key={i} 
                      className={`w-2.5 h-2.5 rounded-full ${
                        i < sequence.indexOf(displayDigit) + 1 ? 'bg-emerald-500' : isBoxDarkMode ? 'bg-zinc-800' : 'bg-zinc-200'
                      }`} 
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Input Screen */}
            {gameState === 'input' && (
              <div className="w-full max-w-md">
                <form onSubmit={handleSubmit}>
                  <input
                    ref={inputRef}
                    type="text"
                    pattern="\d*"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value.replace(/\D/g, ''))}
                    className={`w-full bg-transparent border-b-4 border-emerald-500 text-4xl font-black text-center outline-none py-4 mb-6 tracking-[0.2rem] ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}
                    placeholder={Array(digitCount).fill('?').join('')}
                    autoFocus
                  />
                  <button 
                    type="submit"
                    className={`w-full py-3 rounded-xl font-bold text-lg transition-all ${isBoxDarkMode ? 'bg-white text-zinc-900 hover:bg-gray-200' : 'bg-zinc-900 text-white hover:bg-zinc-800'}`}
                  >
                    SUBMIT
                  </button>
                </form>
                <div className="mt-4 flex justify-center gap-2">
                  <Heart className={`w-5 h-5 ${lives > 0 ? 'text-red-500' : 'text-gray-400'}`} />
                  <span className={`text-sm ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {lives}/3 Lives Remaining
                  </span>
                </div>
              </div>
            )}

            {/* Success Screen */}
            {gameState === 'success' && (
              <div className="text-center">
                <div className="text-6xl mb-3">✅</div>
                <h2 className={`text-3xl font-bold ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Correct! +3</h2>
              </div>
            )}

            {/* Fail Screen */}
            {gameState === 'fail' && (
              <div className="text-center">
                <div className="text-6xl mb-3">❌</div>
                <h2 className={`text-3xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Incorrect</h2>
                <p className={`${isBoxDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Sequence: <span className="font-bold text-rose-500">{sequence}</span>
                </p>
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
                    <ResultCard label="Max Level" value={`${currentLevel}/5`} icon={<Award className="w-4 h-4" />} color="text-emerald-500" />
                    <ResultCard label="Max Digits" value={digitCount} icon={<Hash className="w-4 h-4" />} color="text-blue-500" />
                    <ResultCard label="Best Combo" value={`${bestCombo}x`} icon={<Zap className="w-4 h-4" />} color="text-orange-500" />
                  </div>
                  
                  <div className="flex gap-4">
                    <Link href="/drills/cognitive" className="flex-1">
                      <span className={`block w-full px-4 py-2.5 rounded-lg font-semibold transition-all text-center ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                        ← Back
                      </span>
                    </Link>
                    <button 
                      onClick={resetGame}
                      className="flex-1 px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98]"
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
                  <Info className={`w-4 h-4 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
                  <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Drill Rules & Scoring</h3>
                </div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">1</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Watch and <span className="font-semibold text-emerald-500">memorize the digit sequence</span></p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">2</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Success: <span className="font-semibold text-green-500">+3 points</span> • Fixed reward</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">3</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Mistake: <span className="font-semibold text-red-500">-1 life</span> • 3 lives system</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">4</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>No lives left: <span className="font-semibold text-orange-500">-3 point penalty</span> per mistake</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">5</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Progress: Level 1 → 2 → 3 → 4 → <span className="font-semibold text-purple-500">5 (Master)</span></p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">6</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Complete Level 5 to become <span className="font-semibold text-yellow-500">Memory Master</span></p>
                    </div>
                  </div>
                </div>
                <div className={`mt-3 pt-3 border-t text-xs ${isDarkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'} flex items-center justify-between`}>
                  <span>🔢 L1: 4→9 • L2: 8→16 • L3: 15→25 • L4: 25→36 • L5: 36→49</span>
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
                   color === 'text-emerald-500' ? 'bg-emerald-500/10' :
                   color === 'text-blue-500' ? 'bg-blue-500/10' :
                   color === 'text-orange-500' ? 'bg-orange-500/10' :
                   color === 'text-green-500' ? 'bg-green-500/10' : 'bg-gray-400/10';
  
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