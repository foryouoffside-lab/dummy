'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useCallback, useRef } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Target, Volume2, VolumeX, Maximize2, Minimize2, 
  Sun, Moon, Eye, Timer, Trophy, Grid, Hash, Award, AlertCircle,
  BarChart3, Info, Zap, CheckCircle, XCircle
} from 'lucide-react';

export default function ConcentrationGridPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [gameState, setGameState] = useState('start');
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [timeRemaining, setTimeRemaining] = useState(60);
  const [gridSize, setGridSize] = useState(3);
  const [grid, setGrid] = useState([]);
  const [currentNumber, setCurrentNumber] = useState(1);
  const [foundNumbers, setFoundNumbers] = useState([]);
  const [mistakes, setMistakes] = useState(0);
  const [totalClicks, setTotalClicks] = useState(0);
  const [combo, setCombo] = useState(0);
  const [bestCombo, setBestCombo] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isBoxDarkMode, setIsBoxDarkMode] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  const [startTime, setStartTime] = useState(null);
  
  const containerRef = useRef(null);
  const scoreRef = useRef(0);
  const comboRef = useRef(0);
  const gameStateRef = useRef('start');
  const timerIntervalRef = useRef(null);
  const feedbackTimeoutRef = useRef(null);
  const audioContextRef = useRef(null);

  // Load best score from localStorage on mount
  useEffect(() => {
    const savedBestScore = localStorage.getItem('concentrationGridDrillBestScore');
    if (savedBestScore) {
      setBestScore(parseInt(savedBestScore, 10));
    }
  }, []);

  // Sync gameState to ref
  useEffect(() => {
    gameStateRef.current = gameState;
  }, [gameState]);

  // Check authentication
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } else if (status === 'authenticated') {
      setLoading(false);
    }
  }, [status, router]);

  // Update best score when game ends
  useEffect(() => {
    if (gameState === 'gameOver' && score > bestScore) {
      setBestScore(score);
      localStorage.setItem('concentrationGridDrillBestScore', score.toString());
    }
  }, [gameState, score, bestScore]);

  // Cleanup timers
  useEffect(() => {
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
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
        g.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 0.1);
        osc.stop(ctx.currentTime + 0.1);
      } else if (type === 'wrong') {
        osc.frequency.value = 440;
        g.gain.value = 0.08;
        osc.start();
        g.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 0.1);
        osc.stop(ctx.currentTime + 0.1);
      } else if (type === 'complete') {
        osc.frequency.value = 660;
        g.gain.value = 0.15;
        osc.start();
        osc.frequency.linearRampToValueAtTime(880, ctx.currentTime + 0.1);
        osc.frequency.linearRampToValueAtTime(1320, ctx.currentTime + 0.2);
        g.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 0.3);
        osc.stop(ctx.currentTime + 0.3);
      } else if (type === 'combo') {
        osc.frequency.value = 1046.5;
        g.gain.value = 0.12;
        osc.start();
        g.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 0.15);
        osc.stop(ctx.currentTime + 0.15);
      }
    } catch (e) {}
  }, [soundEnabled, initAudio]);

  // Generate grid with random numbers 1 to gridSize^2
  const generateGrid = useCallback((size) => {
    const totalNumbers = size * size;
    const numbers = Array.from({ length: totalNumbers }, (_, i) => i + 1);
    // Shuffle numbers
    for (let i = numbers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }
    
    const newGrid = [];
    for (let i = 0; i < size; i++) {
      newGrid.push(numbers.slice(i * size, (i + 1) * size));
    }
    return newGrid;
  }, []);

  // Initialize or reset grid
  const initGrid = useCallback(() => {
    const newGrid = generateGrid(gridSize);
    setGrid(newGrid);
    setCurrentNumber(1);
    setFoundNumbers([]);
    setStartTime(Date.now());
  }, [gridSize, generateGrid]);

  // Game timer
  useEffect(() => {
    if (gameState !== 'playing') return;
    
    timerIntervalRef.current = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          setGameState('gameOver');
          gameStateRef.current = 'gameOver';
          playSound('complete');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [gameState, playSound]);

  // Initialize grid when game starts or size changes
  useEffect(() => {
    if (gameState === 'playing') {
      initGrid();
    }
  }, [gameState, gridSize, initGrid]);

  const handleCellClick = (row, col, value) => {
    if (gameStateRef.current !== 'playing') return;
    
    // Check if already found
    if (foundNumbers.includes(value)) return;
    
    setTotalClicks(prev => prev + 1);
    
    if (value === currentNumber) {
      // Correct click - found the next number in sequence
      const timeElapsed = (Date.now() - startTime) / 1000;
      const speedBonus = Math.max(0, Math.floor(30 - timeElapsed * 10));
      const pointsEarned = 10 + speedBonus;
      
      scoreRef.current += pointsEarned;
      setScore(scoreRef.current);
      setFoundNumbers(prev => [...prev, value]);
      setCurrentNumber(prev => prev + 1);
      comboRef.current++;
      setCombo(comboRef.current);
      
      if (comboRef.current > bestCombo) {
        setBestCombo(comboRef.current);
      }
      
      setStartTime(Date.now());
      
      if (comboRef.current % 5 === 0) {
        playSound('combo');
        showFeedback(`🔥 ${comboRef.current}x Combo!`, 'success');
      } else {
        playSound('correct');
        showFeedback(`✓ +${pointsEarned}`, 'success');
      }
      
      // Check if grid is complete - ALL numbers found
      const totalNumbers = gridSize * gridSize;
      if (currentNumber === totalNumbers) {
        levelComplete();
      }
    } else {
      // Wrong click - penalty
      setScore(prev => Math.max(0, prev - 10));
      scoreRef.current = Math.max(0, scoreRef.current - 10);
      comboRef.current = 0;
      setCombo(0);
      playSound('wrong');
      showFeedback(`✗ Wrong! -10`, 'error');
      
      setMistakes(prev => {
        const newMistakes = prev + 1;
        if (newMistakes >= 5) {
          setScore(0);
          scoreRef.current = 0;
          showFeedback('⚠️ Score reset! 5 mistakes!', 'warning');
          return 0;
        }
        return newMistakes;
      });
    }
  };

  const levelComplete = () => {
    const completionBonus = 100 * level;
    const accuracyBonus = totalClicks > 0 ? Math.floor((foundNumbers.length / totalClicks) * 50) : 0;
    const totalBonus = completionBonus + accuracyBonus;
    
    scoreRef.current += totalBonus;
    setScore(scoreRef.current);
    playSound('complete');
    showFeedback(`🎯 Level ${level} Complete! +${totalBonus}`, 'success');
    
    setTimeout(() => {
      if (gridSize < 8) {
        setLevel(prev => prev + 1);
        setGridSize(prev => prev + 1);
        setCurrentNumber(1);
        setFoundNumbers([]);
        setMistakes(0);
        setTotalClicks(0);
        comboRef.current = 0;
        setCombo(0);
        setStartTime(Date.now());
      } else {
        // Game complete - all levels done
        setGameState('gameOver');
        gameStateRef.current = 'gameOver';
        playSound('complete');
      }
    }, 800);
  };

  const startGame = () => {
    setGameState('playing');
    gameStateRef.current = 'playing';
    setScore(0);
    setLevel(1);
    setGridSize(3);
    setTimeRemaining(60);
    setMistakes(0);
    setTotalClicks(0);
    setCombo(0);
    setBestCombo(0);
    setCurrentNumber(1);
    setFoundNumbers([]);
    setFeedback('');
    setStartTime(Date.now());
    
    scoreRef.current = 0;
    comboRef.current = 0;
    
    playSound('correct');
  };

  const resetGame = () => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    setGameState('start');
    gameStateRef.current = 'start';
  };

  const getCellStyle = (value) => {
    const isFound = foundNumbers.includes(value);
    
    if (isFound) {
      return isBoxDarkMode 
        ? 'bg-green-900/50 text-green-300 cursor-default opacity-50'
        : 'bg-green-500/50 text-white cursor-default opacity-40';
    }
    
    return isBoxDarkMode
      ? 'bg-gray-700 text-gray-200 hover:bg-gray-600 cursor-pointer'
      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 cursor-pointer';
  };

  const getAccuracy = () => {
    if (totalClicks === 0) return 100;
    return Math.round((foundNumbers.length / totalClicks) * 100);
  };

  // Calculate cell size based on grid size
  const getCellSize = () => {
    const baseSize = 75;
    const minSize = 40;
    return Math.max(minSize, Math.min(baseSize, baseSize - (gridSize - 3) * 6));
  };

  // Show loading state
  if (loading || status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading drill...</p>
        </div>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return null;
  }

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
              <div className="p-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl">
                <Grid className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Concentration Grid</h1>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Find numbers in sequence • 60s</p>
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

        {/* Stats Board */}
        <div className="grid grid-cols-7 gap-3 mb-4 h-[88px]">
          <StatCard icon={<Target className="text-blue-600" />} value={score} label="Score" isDark={isDarkMode} />
          <StatCard icon={<Trophy className="text-yellow-600" />} value={bestScore} label="Best Score" isDark={isDarkMode} />
          <StatCard icon={<Timer className={timeRemaining <= 10 ? 'text-red-600' : 'text-green-600'} />} value={`${timeRemaining}s`} label="Time" isDark={isDarkMode} />
          <StatCard icon={<Award className="text-purple-500" />} value={level} label="Level" isDark={isDarkMode} />
          <StatCard icon={<Grid className="text-cyan-500" />} value={`${gridSize}×${gridSize}`} label="Grid" isDark={isDarkMode} />
          <StatCard icon={<BarChart3 className="text-emerald-600" />} value={getAccuracy()} label="Accuracy" unit="%" isDark={isDarkMode} />
          <StatCard icon={<Zap className="text-orange-600" />} value={combo} label="Combo" isDark={isDarkMode} />
        </div>

        {/* Feedback Bar */}
        <div className="h-8 mb-2 flex justify-center items-center">
          <div className={`px-4 py-1 rounded-lg text-white font-medium text-sm transition-opacity duration-150 ${feedback ? 'opacity-100' : 'opacity-0'} ${
            feedbackType === 'success' ? 'bg-green-500' : feedbackType === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
          }`}>
            {feedback || 'placeholder'}
          </div>
        </div>

        {/* Game Container */}
        <div 
          ref={containerRef}
          className={`relative ${isFullscreen ? 'fixed inset-0 z-50' : 'rounded-xl border-2'}`}
          style={{ 
            background: isBoxDarkMode ? '#020202' : '#ffffff',
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

          {/* Next Number Indicator */}
          {gameState === 'playing' && currentNumber <= gridSize * gridSize && (
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
              <div className={`inline-flex items-center gap-3 rounded-full px-6 py-2 shadow-md ${isBoxDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <Eye className="w-5 h-5 text-blue-500" />
                <span className={isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}>Find next:</span>
                <span className={`text-2xl font-bold ${isBoxDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>{currentNumber}</span>
              </div>
            </div>
          )}

          {/* Start Screen */}
          {gameState === 'start' && (
            <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
              <div className={`rounded-2xl p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <Grid className="w-16 h-16 text-cyan-500 mx-auto mb-4" />
                <h3 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Concentration Grid</h3>
                <p className={`mb-6 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>60-second challenge • 3×3 → 8×8</p>
                <button 
                  onClick={startGame}
                  className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg w-full transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  Start Drill
                </button>
              </div>
            </div>
          )}

          {/* Playing Screen - Grid */}
          {gameState === 'playing' && grid.length > 0 && (
            <div className="absolute inset-0 flex items-center justify-center p-8">
              <div className="w-full max-w-2xl">
                <div 
                  className="grid gap-2 mx-auto"
                  style={{
                    gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
                    maxWidth: `${gridSize * getCellSize()}px`
                  }}
                >
                  {grid.map((row, rowIdx) => (
                    row.map((cell, colIdx) => (
                      <button
                        key={`${rowIdx}-${colIdx}`}
                        onClick={() => handleCellClick(rowIdx, colIdx, cell)}
                        disabled={foundNumbers.includes(cell)}
                        className={`
                          aspect-square rounded-xl font-bold transition-all duration-200
                          ${getCellStyle(cell)}
                          hover:scale-105 active:scale-95
                        `}
                        style={{ 
                          fontSize: `${Math.max(16, getCellSize() / 3)}px`,
                          width: `${getCellSize()}px`,
                          height: `${getCellSize()}px`
                        }}
                      >
                        {cell}
                      </button>
                    ))
                  ))}
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
                  <h3 className={`text-2xl font-bold ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {level === 6 && foundNumbers.length === gridSize * gridSize ? 'Mastery Achieved!' : "Drill Complete!"}
                  </h3>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <ResultCard label="Final Score" value={score} icon={<Target className="w-4 h-4" />} color="text-yellow-500" />
                  <ResultCard label="Best Score" value={bestScore} icon={<Trophy className="w-4 h-4" />} color="text-yellow-500" />
                  <ResultCard label="Accuracy" value={getAccuracy()} unit="%" icon={<BarChart3 className="w-4 h-4" />} color="text-purple-500" />
                  <ResultCard label="Level Reached" value={`${level}/6`} icon={<Award className="w-4 h-4" />} color="text-cyan-500" />
                  <ResultCard label="Numbers Found" value={foundNumbers.length} icon={<CheckCircle className="w-4 h-4" />} color="text-green-500" />
                  <ResultCard label="Mistakes" value={mistakes} icon={<XCircle className="w-4 h-4" />} color="text-red-500" />
                  <ResultCard label="Max Combo" value={`${bestCombo}x`} icon={<Zap className="w-4 h-4" />} color="text-orange-500" />
                  <ResultCard label="Final Grid" value={`${gridSize}×${gridSize}`} icon={<Grid className="w-4 h-4" />} color="text-blue-500" />
                </div>
                
                <div className="flex gap-4">
                  <Link href="/drills/cognitive" className="flex-1">
                    <button className={`w-full px-4 py-2.5 rounded-lg font-semibold transition-all ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                      ← Back
                    </button>
                  </Link>
                  <button 
                    onClick={resetGame}
                    className="flex-1 px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Play Again →
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Rules Section */}
        {!isFullscreen && (
          <div className="mt-6">
            <div className={`rounded-xl border overflow-hidden ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <div className={`px-4 py-3 border-b ${isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'}`}>
                <div className="flex items-center gap-2">
                  <Info className={`w-4 h-4 ${isDarkMode ? 'text-cyan-400' : 'text-cyan-600'}`} />
                  <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Drill Rules & Scoring</h3>
                </div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-cyan-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">1</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Find numbers <span className="font-semibold text-cyan-500">1 → 2 → 3 ...</span> in order</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">2</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Correct: <span className="font-semibold text-green-500">10 + speed bonus</span> (up to +30)</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">3</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Wrong: <span className="font-semibold text-red-500">-10 points</span></p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">4</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Complete grid: <span className="font-semibold text-blue-500">+100 × level bonus</span></p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">5</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Progress: 3×3 → 4×4 → ... → <span className="font-semibold text-purple-500">8×8</span></p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">6</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}><span className="font-semibold text-yellow-500">5 mistakes reset score</span> to 0</p>
                    </div>
                  </div>
                </div>
                <div className={`mt-3 pt-3 border-t text-xs ${isDarkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'} flex items-center justify-between`}>
                  <span>🎯 5x Combo bonus • Accuracy bonus on level complete</span>
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
                   color === 'text-cyan-500' ? 'bg-cyan-500/10' :
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