'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Target, Zap, Timer, Trophy, Heart, 
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, Eye,
  BarChart3, Info, Grid3X3, CheckCircle2, RefreshCw
} from 'lucide-react';

export default function SudokuProblemSolvingPage() {
  const containerRef = useRef(null);
  
  // Game State
  const [gameState, setGameState] = useState('start');
  const [grid, setGrid] = useState([]);
  const [solution, setSolution] = useState([]);
  const [initialIndices, setInitialIndices] = useState(new Set());
  const [selectedCell, setSelectedCell] = useState(null);
  const [gridSize, setGridSize] = useState(4);
  
  // Stats
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(60);
  const [combo, setCombo] = useState(0);
  const [bestCombo, setBestCombo] = useState(0);
  const [completedGrids, setCompletedGrids] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [lives, setLives] = useState(3);
  
  // UI State
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isBoxDarkMode, setIsBoxDarkMode] = useState(true);
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  const [isMasterComplete, setIsMasterComplete] = useState(false);
  
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
    const savedBestScore = localStorage.getItem('sudokuDrillBestScore');
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
      localStorage.setItem('sudokuDrillBestScore', score.toString());
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
  const initAudio = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }
    return audioContextRef.current;
  };

  // Play sound
  const playSound = (type) => {
    if (!soundEnabled) return;
    try {
      const ctx = initAudio();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      if (type === 'correct') {
        osc.frequency.value = 880;
        gain.gain.value = 0.12;
        osc.start();
        gain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 0.1);
        osc.stop(ctx.currentTime + 0.1);
      } else if (type === 'wrong') {
        osc.frequency.value = 440;
        gain.gain.value = 0.1;
        osc.start();
        gain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 0.1);
        osc.stop(ctx.currentTime + 0.1);
      } else if (type === 'penalty') {
        osc.frequency.value = 220;
        gain.gain.value = 0.15;
        osc.start();
        gain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 0.15);
        osc.stop(ctx.currentTime + 0.15);
      } else if (type === 'combo') {
        osc.frequency.value = 1046.5;
        gain.gain.value = 0.12;
        osc.start();
        gain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 0.15);
        osc.stop(ctx.currentTime + 0.15);
      } else if (type === 'complete') {
        osc.frequency.value = 660;
        gain.gain.value = 0.15;
        osc.start();
        osc.frequency.linearRampToValueAtTime(880, ctx.currentTime + 0.1);
        osc.frequency.linearRampToValueAtTime(1320, ctx.currentTime + 0.2);
        gain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 0.3);
        osc.stop(ctx.currentTime + 0.3);
      }
    } catch (e) {}
  };

  // Timer Logic
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

  // Check if number is valid in position
  const isValid = (grid, row, col, num, size) => {
    for (let x = 0; x < size; x++) {
      if (grid[row * size + x] === num) return false;
    }
    
    for (let x = 0; x < size; x++) {
      if (grid[x * size + col] === num) return false;
    }
    
    let boxSize;
    if (size === 4) boxSize = 2;
    else if (size === 6) boxSize = 2;
    else boxSize = Math.floor(Math.sqrt(size));
    
    if (size === 6) {
      const boxRow = Math.floor(row / 2);
      const boxCol = Math.floor(col / 3);
      for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 3; j++) {
          if (grid[(boxRow * 2 + i) * size + (boxCol * 3 + j)] === num) return false;
        }
      }
    } else if (size === 5 || size === 7) {
      return true;
    } else {
      for (let i = 0; i < boxSize; i++) {
        for (let j = 0; j < boxSize; j++) {
          if (grid[(Math.floor(row / boxSize) * boxSize + i) * size + (Math.floor(col / boxSize) * boxSize + j)] === num) {
            return false;
          }
        }
      }
    }
    return true;
  };

  // Solve Sudoku using backtracking
  const solveSudoku = (grid, size) => {
    const solve = (gridArray) => {
      for (let i = 0; i < size * size; i++) {
        if (gridArray[i] === null) {
          const row = Math.floor(i / size);
          const col = i % size;
          
          const numbers = Array.from({ length: size }, (_, i) => i + 1);
          for (let k = numbers.length - 1; k > 0; k--) {
            const j = Math.floor(Math.random() * (k + 1));
            [numbers[k], numbers[j]] = [numbers[j], numbers[k]];
          }
          
          for (const num of numbers) {
            if (isValid(gridArray, row, col, num, size)) {
              gridArray[i] = num;
              if (solve(gridArray)) return true;
              gridArray[i] = null;
            }
          }
          return false;
        }
      }
      return true;
    };
    
    const gridCopy = [...grid];
    solve(gridCopy);
    return gridCopy;
  };

  // Generate Sudoku based on size
  const generateSudoku = (size) => {
    const totalCells = size * size;
    const emptyGrid = Array(totalCells).fill(null);
    const solved = solveSudoku(emptyGrid, size);
    
    const puzzle = [...solved];
    const initial = new Set();
    
    let cellsToKeep;
    if (size === 4) cellsToKeep = 8;
    else if (size === 5) cellsToKeep = 10;
    else if (size === 6) cellsToKeep = 14;
    else cellsToKeep = 18;
    
    const indices = Array.from({ length: totalCells }, (_, i) => i).sort(() => Math.random() - 0.5);
    
    for (let i = 0; i < totalCells; i++) {
      if (i < cellsToKeep) {
        initial.add(indices[i]);
      } else {
        puzzle[indices[i]] = null;
      }
    }

    setSolution(solved);
    setGrid(puzzle);
    setInitialIndices(initial);
  };

  const handleCellClick = (index) => {
    if (gameStateRef.current !== 'playing' || initialIndices.has(index) || isMasterComplete) return;
    setSelectedCell(index);
  };

  const getAccuracy = () => {
    const total = totalCorrect + mistakes;
    if (total === 0) return 100;
    return Math.round((totalCorrect / total) * 100);
  };

  const handleMiss = () => {
    setMistakes(prev => prev + 1);
    comboRef.current = 0;
    setCombo(0);
    
    // Use one life for wrong answer
    if (livesRef.current > 0) {
      livesRef.current -= 1;
      setLives(livesRef.current);
      playSound('wrong');
      showFeedback(`✗ Wrong! -1 life`, 'error');
    }
    
    // If no lives left, apply penalty of 10 points
    if (livesRef.current === 0) {
      scoreRef.current = Math.max(0, scoreRef.current - 10);
      setScore(scoreRef.current);
      playSound('penalty');
      showFeedback(`✗ Wrong! -10 points`, 'error');
    }
  };

  const handleNumberInput = (num) => {
    if (selectedCell === null || gameStateRef.current !== 'playing' || isMasterComplete) return;
    if (clickCooldownRef.current) return;
    
    clickCooldownRef.current = true;

    const isCorrect = solution[selectedCell] === num;
    
    if (isCorrect) {
      const newGrid = [...grid];
      newGrid[selectedCell] = num;
      setGrid(newGrid);
      
      // +10 points for correct answer
      scoreRef.current += 10;
      setScore(scoreRef.current);
      setTotalCorrect(prev => prev + 1);
      comboRef.current++;
      setCombo(comboRef.current);
      
      if (comboRef.current > bestCombo) {
        setBestCombo(comboRef.current);
      }
      
      if (comboRef.current % 5 === 0) {
        playSound('combo');
        showFeedback(`🔥 ${comboRef.current}x Combo! +10`, 'success');
      } else {
        playSound('correct');
        showFeedback(`✓ +10`, 'success');
      }
      
      setSelectedCell(null);
      
      if (!newGrid.includes(null)) {
        setCompletedGrids(prev => prev + 1);
        const levelBonus = 10 * gridSize;
        scoreRef.current += levelBonus;
        setScore(scoreRef.current);
        playSound('complete');
        
        if (gridSize === 4) {
          showFeedback(`🎯 4×4 Complete! Moving to 5×5! +${levelBonus}`, 'success');
          setGridSize(5);
          setTimeout(() => generateSudoku(5), 100);
        } else if (gridSize === 5) {
          showFeedback(`🎯 5×5 Complete! Moving to 6×6! +${levelBonus}`, 'success');
          setGridSize(6);
          setTimeout(() => generateSudoku(6), 100);
        } else if (gridSize === 6) {
          showFeedback(`🎯 6×6 Complete! Moving to 7×7! +${levelBonus}`, 'success');
          setGridSize(7);
          setTimeout(() => generateSudoku(7), 100);
        } else if (gridSize === 7) {
          setIsMasterComplete(true);
          setGameState('ended');
          gameStateRef.current = 'ended';
          showFeedback(`🏆 MASTER! All grids completed! +${levelBonus}`, 'success');
          playSound('complete');
        }
      }
    } else {
      handleMiss();
    }
    
    setTimeout(() => {
      clickCooldownRef.current = false;
    }, 100);
  };

  const startGame = () => {
    setGameState('playing');
    gameStateRef.current = 'playing';
    setScore(0);
    setGridSize(4);
    setTimeRemaining(60);
    setCombo(0);
    setBestCombo(0);
    setMistakes(0);
    setCompletedGrids(0);
    setTotalCorrect(0);
    setLives(3);
    setSelectedCell(null);
    setIsMasterComplete(false);
    setFeedback('');
    
    scoreRef.current = 0;
    comboRef.current = 0;
    livesRef.current = 3;
    clickCooldownRef.current = false;
    
    generateSudoku(4);
    playSound('correct');
  };

  const resetGame = () => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    
    setGameState('start');
    gameStateRef.current = 'start';
    setScore(0);
    setGridSize(4);
    setTimeRemaining(60);
    setCombo(0);
    setBestCombo(0);
    setMistakes(0);
    setCompletedGrids(0);
    setTotalCorrect(0);
    setLives(3);
    setSelectedCell(null);
    setIsMasterComplete(false);
    setGrid([]);
    setSolution([]);
    setInitialIndices(new Set());
    setFeedback('');
    
    scoreRef.current = 0;
    comboRef.current = 0;
    livesRef.current = 3;
    clickCooldownRef.current = false;
  };

  const getCellSize = () => {
    const baseSize = 65;
    const minSize = 38;
    return Math.max(minSize, baseSize - (gridSize - 4) * 8);
  };

  const getFontSize = () => {
    const baseFont = 26;
    const minFont = 15;
    return Math.max(minFont, baseFont - (gridSize - 4) * 3);
  };

  const getGridLabel = () => {
    if (gridSize === 4) return '4×4';
    if (gridSize === 5) return '5×5';
    if (gridSize === 6) return '6×6';
    return '7×7';
  };

  const getAvailableNumbers = () => {
    return Array.from({ length: gridSize }, (_, i) => i + 1);
  };

  const getRuleDescription = () => {
    if (gridSize === 5 || gridSize === 7) {
      return `Each row and column must contain numbers 1-${gridSize} once`;
    } else if (gridSize === 6) {
      return `Each row, column, and 2×3 box must contain 1-6 once`;
    } else {
      return `Each row, column, and ${Math.sqrt(gridSize)}×${Math.sqrt(gridSize)} box must contain 1-${gridSize} once`;
    }
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
              <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl">
                <Grid3X3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Sudoku Speed-Logic</h1>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>4×4 → 7×7 • +10/-10 • 3 lives</p>
              </div>
            </div>
            
            {/* Control Buttons */}
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
          <StatCard icon={<Grid3X3 className="text-amber-500" />} value={getGridLabel()} label="Grid" isDark={isDarkMode} />
          <StatCard icon={<CheckCircle2 className="text-emerald-500" />} value={`${completedGrids}/4`} label="Done" isDark={isDarkMode} />
          <StatCard icon={<BarChart3 className="text-purple-600" />} value={getAccuracy()} label="Acc" unit="%" isDark={isDarkMode} />
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

          <div className="absolute inset-0 flex items-center justify-center p-4">
            {/* Start Screen */}
            {gameState === 'start' && (
              <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
                <div className={`rounded-2xl p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                  <Grid3X3 className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                  <h3 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Sudoku Speed-Logic</h3>
                  <p className={`mb-6 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>60-second challenge • +10 per correct • 3 lives system</p>
                  <button 
                    onClick={startGame}
                    className="px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg w-full transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Start Drill
                  </button>
                </div>
              </div>
            )}

            {/* Playing Screen */}
            {gameState === 'playing' && (
              <div className="w-full max-w-lg">
                <div className="grid gap-1.5 mb-6 mx-auto" style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)`, maxWidth: `${gridSize * getCellSize()}px` }}>
                  {grid.map((val, i) => {
                    const isInitial = initialIndices.has(i);
                    const isSelected = selectedCell === i;
                    
                    return (
                      <button 
                        key={i} 
                        onClick={() => handleCellClick(i)}
                        className={`aspect-square rounded-lg font-bold transition-all flex items-center justify-center relative
                          ${isInitial ? (isBoxDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-200 text-gray-600') : 
                            val !== null ? (isBoxDarkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-700') :
                            (isBoxDarkMode ? 'bg-gray-600 text-white hover:bg-gray-500' : 'bg-blue-50 text-blue-600 hover:bg-blue-100')}
                          ${isSelected ? 'ring-4 ring-blue-400 transform scale-105 z-10' : ''} hover:scale-105 active:scale-95`}
                        style={{ width: `${getCellSize()}px`, height: `${getCellSize()}px`, fontSize: `${getFontSize()}px`, border: isInitial ? '2px solid ' + (isBoxDarkMode ? '#4a4a4a' : '#d1d5db') : 'none' }}>
                        {val}
                        {isSelected && !isInitial && !val && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>

                <div className={`text-center mb-4 text-xs ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {getRuleDescription()}
                </div>

                <div className="flex justify-center gap-2 flex-wrap">
                  {getAvailableNumbers().map(num => (
                    <button 
                      key={num} 
                      onClick={() => handleNumberInput(num)}
                      className={`py-3 px-5 rounded-xl text-xl font-black transition-all active:scale-95
                        ${isBoxDarkMode ? 'bg-blue-900 text-white hover:bg-blue-800' : 'bg-blue-600 text-white hover:bg-blue-700'} hover:scale-105`}
                      style={{ minWidth: `${Math.max(50, 70 - (gridSize - 4) * 5)}px` }}>
                      {num}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Game Over Screen */}
            {gameState === 'ended' && (
              <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
                <div className={`rounded-2xl p-8 shadow-xl border w-[480px] ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                  {isMasterComplete ? (
                    <>
                      <Trophy className="w-20 h-20 text-yellow-500 mx-auto mb-4" />
                      <h3 className={`text-3xl font-bold mb-2 ${isBoxDarkMode ? 'text-yellow-400' : 'text-yellow-600'}`}>SUDOKU MASTER!</h3>
                      <p className={`mb-4 text-lg ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>You've conquered all grids!</p>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center justify-center gap-3 mb-6">
                        <Trophy className="w-10 h-10 text-yellow-500" />
                        <h3 className={`text-2xl font-bold ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Time's Up!</h3>
                      </div>
                    </>
                  )}
                  
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <ResultCard label="Final Score" value={score} icon={<Target className="w-4 h-4" />} color="text-yellow-500" />
                    <ResultCard label="Best Score" value={bestScore} icon={<Trophy className="w-4 h-4" />} color="text-yellow-500" />
                    <ResultCard label="Accuracy" value={getAccuracy()} unit="%" icon={<BarChart3 className="w-4 h-4" />} color="text-purple-500" />
                    <ResultCard label="Grids Done" value={`${completedGrids}/4`} icon={<Grid3X3 className="w-4 h-4" />} color="text-amber-500" />
                    <ResultCard label="Correct" value={totalCorrect} icon={<CheckCircle2 className="w-4 h-4" />} color="text-green-500" />
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
                      className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <RefreshCw className="w-4 h-4 inline mr-2" /> Play Again
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
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Complete 4×4 → 5×5 → 6×6 → <span className="font-semibold text-blue-500">7×7</span></p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">2</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Correct: <span className="font-semibold text-green-500">+10 points</span> • High scoring</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">3</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Wrong: <span className="font-semibold text-red-500">-1 life</span> • 3 lives system</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">4</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>No lives left: <span className="font-semibold text-orange-500">-10 point penalty</span> per mistake</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">5</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Complete grid: <span className="font-semibold text-amber-500">+10 × grid size bonus</span></p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">6</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Complete all 4 grids = <span className="font-semibold text-purple-500">Sudoku Master</span></p>
                    </div>
                  </div>
                </div>
                <div className={`mt-3 pt-3 border-t text-xs ${isDarkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'} flex items-center justify-between`}>
                  <span>🔢 4×4 (2×2 boxes) • 5×5 (rows/cols) • 6×6 (2×3 boxes) • 7×7 (rows/cols)</span>
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
                   color === 'text-amber-500' ? 'bg-amber-500/10' :
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