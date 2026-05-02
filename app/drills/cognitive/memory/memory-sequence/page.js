'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Target, Zap, Timer, Trophy, Heart, 
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, Eye,
  BarChart3, Info, Brain, Grid, Activity, RefreshCw
} from 'lucide-react';

export default function MemorySequenceDrill() {
  const containerRef = useRef(null);
  
  // Drill Core State - HARDCODED TO 4
  const [gridSize, setGridSize] = useState(4);
  const [grid, setGrid] = useState([]);
  const [sequence, setSequence] = useState([]);
  const [userSequence, setUserSequence] = useState([]);
  const [gameState, setGameState] = useState('start');
  const [sequenceLength, setSequenceLength] = useState(8);
  
  // Professional Metrics
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(60);
  const [lives, setLives] = useState(3);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [activeBlock, setActiveBlock] = useState(null);
  const [maxSequenceForCurrentGrid, setMaxSequenceForCurrentGrid] = useState(16);
  const [isMemoryMaster, setIsMemoryMaster] = useState(false);
  const [totalSequencesCompleted, setTotalSequencesCompleted] = useState(0);
  
  // UI State
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isBoxDarkMode, setIsBoxDarkMode] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  
  // Timers
  const sequenceTimerRef = useRef(null);
  const feedbackTimeoutRef = useRef(null);
  const timerIntervalRef = useRef(null);
  const audioContextRef = useRef(null);
  const roundStartTimeRef = useRef(null);
  const scoreRef = useRef(0);
  const livesRef = useRef(3);
  const gameStateRef = useRef('start');
  const clickCooldownRef = useRef(false);

  // Force grid size to always be at least 4
  useEffect(() => {
    if (gridSize < 4) {
      setGridSize(4);
    }
  }, [gridSize]);

  // Load best score from localStorage on mount
  useEffect(() => {
    const savedBestScore = localStorage.getItem('memorySequenceDrillBestScore');
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
      localStorage.setItem('memorySequenceDrillBestScore', score.toString());
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

  // Play tone
  const playTone = useCallback((index) => {
    if (!soundEnabled) return;
    try {
      const ctx = initAudio();
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.connect(g);
      g.connect(ctx.destination);
      osc.frequency.value = 440 + index * 30;
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

  // Generate sequence
  const generateSequence = useCallback((length, size) => {
    const newSequence = [];
    const totalCells = size * size;
    for (let i = 0; i < length; i++) {
      let nextId;
      do {
        nextId = Math.floor(Math.random() * totalCells);
      } while (i > 0 && nextId === newSequence[i-1]);
      newSequence.push(nextId);
    }
    return newSequence;
  }, []);

  // Get accuracy
  const getAccuracy = () => {
    if (totalSequencesCompleted === 0) return 100;
    const totalMisses = 3 - lives;
    const totalAttempts = totalSequencesCompleted + totalMisses;
    return Math.round((totalSequencesCompleted / totalAttempts) * 100);
  };

  // Get max sequence for grid size - ALWAYS USE CORRECT VALUES
  const getMaxSequenceForGrid = (size) => {
    const gridSizeToUse = Math.max(4, size);
    if (gridSizeToUse === 4) return 16;
    if (gridSizeToUse === 5) return 25;
    if (gridSizeToUse === 6) return 36;
    if (gridSizeToUse === 7) return 49;
    return gridSizeToUse * gridSizeToUse;
  };

  // Get starting sequence for grid size - ALWAYS USE CORRECT VALUES
  const getStartSequenceForGrid = (size) => {
    const gridSizeToUse = Math.max(4, size);
    if (gridSizeToUse === 4) return 8;
    if (gridSizeToUse === 5) return 15;
    if (gridSizeToUse === 6) return 25;
    if (gridSizeToUse === 7) return 36;
    return Math.floor(gridSizeToUse * gridSizeToUse / 2);
  };

  const handleMiss = (isWrongClick = false) => {
    if (livesRef.current > 0) {
      livesRef.current -= 1;
      setLives(livesRef.current);
      playFailSound();
      showFeedback(`✗ ${isWrongClick ? 'Wrong click' : 'Miss'}! -1 life`, 'error');
    }
    
    if (livesRef.current === 0) {
      scoreRef.current = Math.max(0, scoreRef.current - 10);
      setScore(scoreRef.current);
      playPenaltySound();
      showFeedback(`✗ -10 points!`, 'error');
    }
    
    setCurrentStreak(0);
  };

  // Start new round
  const startNewRound = useCallback(async (size, seqLen, resetLives = false) => {
    const actualSize = Math.max(4, size);
    
    setGameState('showing');
    gameStateRef.current = 'showing';
    setUserSequence([]);
    setFeedback('');
    roundStartTimeRef.current = Date.now();
    
    if (resetLives) {
      setLives(3);
      livesRef.current = 3;
    }
    
    const newGrid = Array(actualSize * actualSize).fill(null);
    setGrid(newGrid);
    
    const newSequence = generateSequence(seqLen, actualSize);
    setSequence(newSequence);

    const displayTime = Math.max(400, 600 - (actualSize - 4) * 20);
    const pauseTime = Math.max(200, 350 - (actualSize - 4) * 15);
    
    for (let i = 0; i < newSequence.length; i++) {
      await new Promise(r => {
        sequenceTimerRef.current = setTimeout(r, displayTime + pauseTime);
      });
      setActiveBlock(newSequence[i]);
      playTone(newSequence[i]);
      await new Promise(r => {
        sequenceTimerRef.current = setTimeout(r, displayTime);
      });
      setActiveBlock(null);
    }

    setGameState('input');
    gameStateRef.current = 'input';
  }, [generateSequence, playTone]);

  const handleBlockClick = (index) => {
    if (gameStateRef.current !== 'input') return;
    if (clickCooldownRef.current) return;
    
    clickCooldownRef.current = true;

    const newUserSequence = [...userSequence, index];
    setUserSequence(newUserSequence);
    playTone(index);
    
    setActiveBlock(index);
    setTimeout(() => setActiveBlock(null), 200);

    const currentIndex = newUserSequence.length - 1;
    
    if (newUserSequence[currentIndex] !== sequence[currentIndex]) {
      handleMiss(true);
      setGameState('fail');
      
      feedbackTimeoutRef.current = setTimeout(() => {
        startNewRound(Math.max(4, gridSize), sequenceLength, false);
      }, 1000);
    } else if (newUserSequence.length === sequence.length) {
      scoreRef.current += 10;
      setScore(scoreRef.current);
      setTotalSequencesCompleted(prev => prev + 1);
      setGameState('success');
      showFeedback(`✓ +10`, 'success');
      
      setCurrentStreak(prev => {
        const newStreak = prev + 1;
        if (newStreak > bestStreak) {
          setBestStreak(newStreak);
        }
        return newStreak;
      });
      
      playSuccessSound();
      
      const currentGridSize = Math.max(4, gridSize);
      const maxSeqForThisGrid = getMaxSequenceForGrid(currentGridSize);
      
      if (sequenceLength < maxSeqForThisGrid) {
        feedbackTimeoutRef.current = setTimeout(() => {
          setSequenceLength(prev => prev + 1);
          startNewRound(currentGridSize, sequenceLength + 1, false);
        }, 800);
      } else if (currentGridSize < 7) {
        const newSize = currentGridSize + 1;
        const newSeqLen = getStartSequenceForGrid(newSize);
        feedbackTimeoutRef.current = setTimeout(() => {
          setGridSize(newSize);
          setSequenceLength(newSeqLen);
          setMaxSequenceForCurrentGrid(getMaxSequenceForGrid(newSize));
          setCurrentLevel(prev => prev + 1);
          startNewRound(newSize, newSeqLen, false);
        }, 800);
      } else {
        setGameState('memoryMaster');
        setIsMemoryMaster(true);
        playMasterSound();
      }
    }
    
    setTimeout(() => {
      clickCooldownRef.current = false;
    }, 100);
  };

  // Start game - FORCE 4x4
  const startGame = useCallback(() => {
    if (sequenceTimerRef.current) clearTimeout(sequenceTimerRef.current);
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    
    setGameState('playing');
    gameStateRef.current = 'playing';
    setTimeRemaining(60);
    setScore(0);
    setGridSize(4);
    setSequenceLength(8);
    setMaxSequenceForCurrentGrid(16);
    setCurrentLevel(1);
    setCurrentStreak(0);
    setBestStreak(0);
    setTotalSequencesCompleted(0);
    setLives(3);
    setUserSequence([]);
    setFeedback('');
    setIsMemoryMaster(false);
    
    scoreRef.current = 0;
    livesRef.current = 3;
    clickCooldownRef.current = false;
    
    initAudio();
    
    setTimeout(() => startNewRound(4, 8, true), 100);
  }, [startNewRound, initAudio]);

  const resetGame = () => {
    if (sequenceTimerRef.current) clearTimeout(sequenceTimerRef.current);
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    
    setGameState('start');
    gameStateRef.current = 'start';
    setGridSize(4);
    setSequenceLength(8);
    setMaxSequenceForCurrentGrid(16);
    setCurrentLevel(1);
    setScore(0);
    setCurrentStreak(0);
    setBestStreak(0);
    setTotalSequencesCompleted(0);
    setLives(3);
    setUserSequence([]);
    setGrid([]);
    setSequence([]);
    setActiveBlock(null);
    setFeedback('');
    setIsMemoryMaster(false);
    
    scoreRef.current = 0;
    livesRef.current = 3;
    clickCooldownRef.current = false;
  };

  const getGridCellSize = () => {
    const size = Math.max(4, gridSize);
    if (size === 4) return 'minmax(40px, 60px)';
    if (size === 5) return 'minmax(32px, 48px)';
    if (size === 6) return 'minmax(26px, 40px)';
    return 'minmax(22px, 34px)';
  };

  const getGridMaxWidth = () => {
    const size = Math.max(4, gridSize);
    if (size === 4) return '320px';
    if (size === 5) return '320px';
    if (size === 6) return '300px';
    return '300px';
  };

  const displayGridSize = Math.max(4, gridSize);

  return (
    <div className={`min-h-screen select-none ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link href="/drills/cognitive" className={`inline-flex items-center gap-2 mb-4 ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>
            <ArrowLeft className="w-4 h-4" /> Back to Cognitive Drills
          </Link>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Memory Sequence</h1>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Remember and repeat • +10/-10 • 3 lives</p>
              </div>
            </div>
            
            <div className="flex gap-2">
              {/* Reset button - only visible during active gameplay */}
              {(gameState === 'playing' || gameState === 'showing' || gameState === 'input' || gameState === 'success' || gameState === 'fail') && (
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

        <div className="grid grid-cols-8 gap-3 mb-4 h-[88px]">
          <StatCard icon={<Target className="text-blue-600" />} value={score} label="Score" isDark={isDarkMode} />
          <StatCard icon={<Trophy className="text-yellow-600" />} value={bestScore} label="Best" isDark={isDarkMode} />
          <StatCard icon={<Timer className={timeRemaining <= 10 ? 'text-red-600' : 'text-green-600'} />} value={`${timeRemaining}s`} label="Time" isDark={isDarkMode} />
          <StatCard icon={<Grid className="text-purple-600" />} value={`${displayGridSize}×${displayGridSize}`} label="Grid" isDark={isDarkMode} />
          <StatCard icon={<Activity className="text-emerald-600" />} value={`${sequenceLength}/${maxSequenceForCurrentGrid}`} label="Seq" isDark={isDarkMode} />
          <StatCard icon={<BarChart3 className="text-amber-600" />} value={getAccuracy()} label="Acc" unit="%" isDark={isDarkMode} />
          <StatCard icon={<Zap className="text-orange-600" />} value={currentStreak} label="Streak" isDark={isDarkMode} />
          <StatCard icon={<Heart className="text-red-500" />} value={lives} label="Lives" isDark={isDarkMode} />
        </div>

        <div className="h-8 mb-2 flex justify-center items-center">
          <div className={`px-4 py-1 rounded-lg text-white font-medium text-sm transition-opacity duration-150 ${feedback ? 'opacity-100' : 'opacity-0'} ${
            feedbackType === 'success' ? 'bg-green-500' : 'bg-red-500'
          }`}>
            {feedback || 'placeholder'}
          </div>
        </div>

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
          {isFullscreen && (gameState === 'playing' || gameState === 'showing' || gameState === 'input' || gameState === 'success' || gameState === 'fail') && (
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

          <div className="absolute inset-0 flex items-center justify-center p-4">
            {gameState === 'start' && (
              <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
                <div className={`rounded-2xl p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                  <Brain className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                  <h3 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Memory Sequence</h3>
                  <p className={`mb-6 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>60-second challenge • 4×4 → 7×7 • +10/-10 • 3 lives</p>
                  <button 
                    onClick={startGame}
                    className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg w-full transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Start Drill
                  </button>
                </div>
              </div>
            )}

            {gameState === 'memoryMaster' && (
              <div className="text-center">
                <Trophy className="w-20 h-20 text-yellow-500 mx-auto mb-4" />
                <h2 className={`text-4xl font-bold mb-4 ${isBoxDarkMode ? 'text-yellow-400' : 'text-yellow-600'}`}>Memory Master!</h2>
                <p className={`mb-6 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>You completed the 7×7 grid!</p>
                <div className="flex gap-3 justify-center">
                  <button onClick={resetGame} className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition">
                    Play Again
                  </button>
                </div>
              </div>
            )}

            {(gameState === 'playing' || gameState === 'showing' || gameState === 'input' || gameState === 'success' || gameState === 'fail') && (
              <div className="w-full h-full flex flex-col items-center justify-center">
                <div 
                  className="grid gap-2 place-items-center"
                  style={{ 
                    gridTemplateColumns: `repeat(${displayGridSize}, 1fr)`,
                    maxWidth: getGridMaxWidth(),
                    width: '100%'
                  }}
                >
                  {grid.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleBlockClick(idx)}
                      className={`
                        aspect-square rounded-lg transition-all duration-200 shadow-sm w-full
                        ${activeBlock === idx ? 'bg-blue-500 scale-90' : isBoxDarkMode ? 'bg-zinc-800 hover:bg-zinc-700' : 'bg-slate-100 hover:bg-slate-200'}
                        ${gameState === 'showing' ? 'cursor-wait' : 'cursor-pointer'}
                        hover:scale-105 active:scale-95
                      `}
                      style={{
                        maxWidth: getGridCellSize(),
                        maxHeight: getGridCellSize()
                      }}
                      disabled={gameState !== 'input'}
                    />
                  ))}
                </div>

                {gameState === 'success' && (
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-500 text-white px-6 py-3 rounded-xl font-bold text-xl shadow-lg">
                    ✓ +10
                  </div>
                )}

                {gameState === 'fail' && (
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-500 text-white px-6 py-3 rounded-xl font-bold text-xl shadow-lg">
                    ✗ Wrong sequence
                  </div>
                )}

                <div className="absolute bottom-4 left-4 flex gap-3">
                  <div className={`px-4 py-2 rounded-lg font-bold ${isBoxDarkMode ? 'bg-zinc-800 text-gray-300' : 'bg-gray-200 text-gray-700'}`}>
                    Level {currentLevel}/4
                  </div>
                  <div className={`px-4 py-2 rounded-lg font-bold flex items-center gap-2 ${lives <= 1 ? 'bg-red-500/20 text-red-500' : isBoxDarkMode ? 'bg-zinc-800 text-red-400' : 'bg-gray-200 text-red-600'}`}>
                    <Heart className="w-4 h-4" />
                    {lives}/3 Lives
                  </div>
                </div>
              </div>
            )}

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
                    <ResultCard label="Max Grid" value={`${displayGridSize}×${displayGridSize}`} icon={<Grid className="w-4 h-4" />} color="text-blue-500" />
                    <ResultCard label="Max Sequence" value={sequenceLength} icon={<Activity className="w-4 h-4" />} color="text-green-500" />
                    <ResultCard label="Best Streak" value={bestStreak} icon={<Zap className="w-4 h-4" />} color="text-orange-500" />
                  </div>
                  
                  <div className="flex gap-4">
                    <Link href="/drills/cognitive" className="flex-1">
                      <span className={`block w-full px-4 py-2.5 rounded-lg font-semibold transition-all text-center ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                        ← Back
                      </span>
                    </Link>
                    <button 
                      onClick={resetGame}
                      className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                    >
                      Play Again →
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

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
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Watch and <span className="font-semibold text-blue-500">repeat the sequence</span> in order</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">2</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Success: <span className="font-semibold text-green-500">+10 points per grid</span> • Fixed reward</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">3</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Wrong click: <span className="font-semibold text-red-500">-1 life</span> • 3 lives system</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">4</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>No lives left: <span className="font-semibold text-orange-500">-10 point penalty</span> per mistake</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">5</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Progress: 4×4 → 5×5 → 6×6 → <span className="font-semibold text-purple-500">7×7</span></p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">6</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Complete 7×7 to become <span className="font-semibold text-yellow-500">Memory Master</span></p>
                    </div>
                  </div>
                </div>
                <div className={`mt-3 pt-3 border-t text-xs ${isDarkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'} flex items-center justify-between`}>
                  <span>🧠 4×4: 8→16 • 5×5: 15→25 • 6×6: 25→36 • 7×7: 36→49</span>
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
                   color === 'text-blue-500' ? 'bg-blue-500/10' :
                   color === 'text-green-500' ? 'bg-green-500/10' :
                   color === 'text-orange-500' ? 'bg-orange-500/10' :
                   color === 'text-emerald-500' ? 'bg-emerald-500/10' : 'bg-gray-400/10';
  
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