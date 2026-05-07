'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Target, Zap, Timer, Trophy, Heart, 
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, Eye,
  BarChart3, Info, Grid3X3, CheckCircle2, RefreshCw
} from 'lucide-react';

export default function SudokuClient() {
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
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  
  const feedbackTimeoutRef = useRef(null);
  const timerIntervalRef = useRef(null);
  const audioContextRef = useRef(null);
  const scoreRef = useRef(0);
  const comboRef = useRef(0);
  const livesRef = useRef(3);
  const gameStateRef = useRef('start');
  const clickCooldownRef = useRef(false);

  // Mark as client-side rendered
  useEffect(() => {
    setIsClient(true);
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  // Load best score
  useEffect(() => {
    try {
      const savedBestScore = localStorage.getItem('sudokuDrillBestScore');
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

  // Update best score
  useEffect(() => {
    if (gameState === 'ended' && score > bestScore) {
      setBestScore(score);
      try {
        localStorage.setItem('sudokuDrillBestScore', score.toString());
      } catch (e) { /* localStorage not available */ }
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

  // Handle fullscreen change
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
    if (!soundEnabled) return;
    try {
      const ctx = initAudio();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      const now = ctx.currentTime;
      const freqMap = { correct: 880, wrong: 440, penalty: 220, combo: 1046.5, complete: 660 };
      
      if (type === 'complete') {
        osc.frequency.setValueAtTime(660, now);
        osc.frequency.linearRampToValueAtTime(880, now + 0.1);
        osc.frequency.linearRampToValueAtTime(1320, now + 0.2);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
        osc.start(now);
        osc.stop(now + 0.3);
      } else {
        osc.frequency.setValueAtTime(freqMap[type] || 660, now);
        gain.gain.setValueAtTime(type === 'combo' ? 0.12 : type === 'penalty' ? 0.15 : 0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
        osc.start(now);
        osc.stop(now + 0.15);
      }
    } catch (e) { /* Audio not supported */ }
  }, [soundEnabled, initAudio]);

  // Timer Logic
  useEffect(() => {
    if (gameState !== 'playing') return;
    
    timerIntervalRef.current = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          setGameState('ended');
          gameStateRef.current = 'ended';
          if (timerIntervalRef.current) {
            clearInterval(timerIntervalRef.current);
            timerIntervalRef.current = null;
          }
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

  // Check if number is valid in position
  const isValid = useCallback((grid, row, col, num, size) => {
    // Check row
    for (let x = 0; x < size; x++) {
      if (grid[row * size + x] === num) return false;
    }
    // Check column
    for (let x = 0; x < size; x++) {
      if (grid[x * size + col] === num) return false;
    }
    // Check box
    if (size === 6) {
      const boxRow = Math.floor(row / 2);
      const boxCol = Math.floor(col / 3);
      for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 3; j++) {
          if (grid[(boxRow * 2 + i) * size + (boxCol * 3 + j)] === num) return false;
        }
      }
    } else if (size === 5 || size === 7) {
      return true; // No box constraints for 5×5 and 7×7
    } else {
      const boxSize = Math.floor(Math.sqrt(size));
      for (let i = 0; i < boxSize; i++) {
        for (let j = 0; j < boxSize; j++) {
          if (grid[(Math.floor(row / boxSize) * boxSize + i) * size + (Math.floor(col / boxSize) * boxSize + j)] === num) {
            return false;
          }
        }
      }
    }
    return true;
  }, []);

  // Solve Sudoku using backtracking
  const solveSudoku = useCallback((grid, size) => {
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
  }, [isValid]);

  // Generate Sudoku
  const generateSudoku = useCallback((size) => {
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
  }, [solveSudoku]);

  const getAccuracy = useCallback(() => {
    const total = totalCorrect + mistakes;
    if (total === 0) return 100;
    return Math.round((totalCorrect / total) * 100);
  }, [totalCorrect, mistakes]);

  const handleMiss = useCallback(() => {
    setMistakes(prev => prev + 1);
    comboRef.current = 0;
    setCombo(0);
    
    if (livesRef.current > 0) {
      livesRef.current -= 1;
      setLives(livesRef.current);
      playSound('wrong');
      showFeedback('✗ Wrong! -1 life', 'error');
    }
    
    if (livesRef.current === 0) {
      scoreRef.current = Math.max(0, scoreRef.current - 10);
      setScore(scoreRef.current);
      playSound('penalty');
      showFeedback('✗ Wrong! -10 points', 'error');
    }
  }, [playSound, showFeedback]);

  const handleNumberInput = useCallback((num) => {
    if (selectedCell === null || gameStateRef.current !== 'playing' || isMasterComplete) return;
    if (clickCooldownRef.current) return;
    
    clickCooldownRef.current = true;

    const isCorrect = solution[selectedCell] === num;
    
    if (isCorrect) {
      const newGrid = [...grid];
      newGrid[selectedCell] = num;
      setGrid(newGrid);
      
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
        showFeedback('✓ +10', 'success');
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
  }, [selectedCell, isMasterComplete, solution, grid, gridSize, bestCombo, playSound, showFeedback, handleMiss, generateSudoku]);

  const handleCellClick = useCallback((index) => {
    if (gameStateRef.current !== 'playing' || initialIndices.has(index) || isMasterComplete) return;
    setSelectedCell(index);
  }, [initialIndices, isMasterComplete]);

  const startGame = useCallback(() => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    
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
  }, [generateSudoku, playSound]);

  const resetGame = useCallback(() => {
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
    setFeedbackType('');
    
    scoreRef.current = 0;
    comboRef.current = 0;
    livesRef.current = 3;
    clickCooldownRef.current = false;
  }, []);

  const getCellSize = useCallback(() => {
    const baseSize = 65;
    const minSize = 38;
    return Math.max(minSize, baseSize - (gridSize - 4) * 8);
  }, [gridSize]);

  const getFontSize = useCallback(() => {
    const baseFont = 26;
    const minFont = 15;
    return Math.max(minFont, baseFont - (gridSize - 4) * 3);
  }, [gridSize]);

  const getGridLabel = useCallback(() => {
    if (gridSize === 4) return '4×4';
    if (gridSize === 5) return '5×5';
    if (gridSize === 6) return '6×6';
    return '7×7';
  }, [gridSize]);

  const getAvailableNumbers = useCallback(() => {
    return Array.from({ length: gridSize }, (_, i) => i + 1);
  }, [gridSize]);

  const getRuleDescription = useCallback(() => {
    if (gridSize === 5 || gridSize === 7) {
      return `Each row and column must contain numbers 1-${gridSize} once`;
    } else if (gridSize === 6) {
      return `Each row, column, and 2×3 box must contain 1-6 once`;
    } else {
      return `Each row, column, and ${Math.sqrt(gridSize)}×${Math.sqrt(gridSize)} box must contain 1-${gridSize} once`;
    }
  }, [gridSize]);

  if (loading || !isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading sudoku drill...</p>
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
            "name": "Sudoku Speed-Logic Drill",
            "url": "https://skilldrills.online/drills/cognitive/problem-solving/sudoku",
            "description": "Progressive Sudoku from 4×4 to 7×7 with adaptive box constraints. Complete all 4 grid sizes to become a Sudoku Master. 60-second challenge with lives system, combo streaks, and level completion bonuses.",
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
            "educationalUse": ["Logical Deduction", "Problem Solving", "Number Placement", "Cognitive Training"],
            "learningResourceType": "Interactive Exercise",
            "timeRequired": "PT60S",
            "interactivityType": "active",
            "inLanguage": "en-US",
            "teaches": ["Logical Deduction", "Pattern Recognition", "Constraint Satisfaction", "Problem Solving"]
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
              Problem Solving
            </li>
            <li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} aria-hidden="true">/</li>
            <li className={`font-medium ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} aria-current="page">
              Sudoku Speed-Logic
            </li>
          </ol>
        </nav>
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl flex-shrink-0">
              <Grid3X3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className={`text-2xl sm:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Sudoku Speed-Logic
              </h1>
              <p className={`text-sm sm:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                4×4 → 7×7 progressive grids • +10 per correct • 3 lives
              </p>
            </div>
          </div>
          
          <div className="flex gap-2 flex-shrink-0">
            {gameState === 'playing' && (
              <button 
                onClick={resetGame} 
                className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-100'}`} 
                title="Reset session"
                aria-label="Reset sudoku drill"
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
          <h2>Sudoku Speed-Logic - Progressive Grid Puzzle Training</h2>
          <p>
            Master Sudoku with progressive grid sizes from 4×4 to 7×7.
            4×4 uses standard 2×2 boxes; 5×5 uses row/column constraints only.
            6×6 uses 2×3 boxes; 7×7 uses row/column constraints only.
            Each correct cell placement earns +10 points with combo streaks at 5x.
            Complete each grid for level bonus (+40, +50, +60, +70 points).
            Complete all 4 grids to achieve Sudoku Master status.
            3 lives protect your score; at 0 lives, wrong placements deduct 10 points.
            60-second timed challenge with best score saved locally.
          </p>
        </section>

        {/* Stats Board */}
        <div className="grid grid-cols-8 gap-3 mb-4 h-[88px]">
          <StatCard icon={<Target className="text-blue-600" />} value={score} label="Score" isDark={isDarkMode} />
          <StatCard icon={<Trophy className="text-yellow-600" />} value={bestScore} label="Best" isDark={isDarkMode} />
          <StatCard icon={<Timer className={timeRemaining <= 10 ? 'text-red-600' : 'text-green-600'} />} value={`${timeRemaining}s`} label="Time" isDark={isDarkMode} />
          <StatCard icon={<Grid3X3 className="text-amber-500" />} value={getGridLabel()} label="Grid" isDark={isDarkMode} />
          <StatCard icon={<CheckCircle2 className="text-emerald-500" />} value={`${completedGrids}/4`} label="Done" isDark={isDarkMode} />
          <StatCard icon={<BarChart3 className="text-purple-600" />} value={getAccuracy()} label="Accuracy" unit="%" isDark={isDarkMode} />
          <StatCard icon={<Zap className="text-orange-600" />} value={combo} label="Combo" isDark={isDarkMode} />
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
                aria-label="Reset sudoku drill"
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

          <div className="absolute inset-0 flex items-center justify-center p-2 sm:p-4">
            
            {/* ============ START SCREEN ============ */}
            {gameState === 'start' && (
              <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
                <div className={`rounded-2xl p-6 sm:p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                  <div className="mb-4">
                    <Grid3X3 className="w-16 h-16 text-blue-500 mx-auto" aria-hidden="true" />
                  </div>
                  <h2 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Sudoku Speed-Logic
                  </h2>
                  <p className={`mb-2 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    60-second challenge • +10 per correct • 4 grid sizes
                  </p>
                  <p className={`mb-6 text-sm ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Place numbers 1-N in each row, column, and box. Start at 4×4 and work up to 7×7. Complete all 4 to become a Sudoku Master.
                  </p>
                  <button 
                    onClick={startGame}
                    className="px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg w-full transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    aria-label="Start sudoku drill"
                  >
                    Start Drill
                  </button>
                </div>
              </div>
            )}

            {/* ============ PLAYING SCREEN ============ */}
            {gameState === 'playing' && (
              <div className="w-full max-w-lg">
                <div className="grid gap-1 sm:gap-1.5 mb-4 sm:mb-6 mx-auto" style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)`, maxWidth: `${gridSize * getCellSize()}px` }}>
                  {grid.map((val, i) => {
                    const isInitial = initialIndices.has(i);
                    const isSelected = selectedCell === i;
                    
                    return (
                      <button 
                        key={i} 
                        onClick={() => handleCellClick(i)}
                        className={`aspect-square rounded-lg font-bold transition-all flex items-center justify-center relative
                          ${isInitial ? (isBoxDarkMode ? 'bg-gray-700 text-gray-400 cursor-default' : 'bg-gray-200 text-gray-600 cursor-default') : 
                            val !== null ? (isBoxDarkMode ? 'bg-green-900/50 text-green-300 cursor-default' : 'bg-green-100 text-green-700 cursor-default') :
                            (isBoxDarkMode ? 'bg-gray-600 text-white hover:bg-gray-500 cursor-pointer' : 'bg-blue-50 text-blue-600 hover:bg-blue-100 cursor-pointer')}
                          ${isSelected ? 'ring-4 ring-blue-400 transform scale-105 z-10' : ''} hover:scale-105 active:scale-95 focus:outline-none`}
                        style={{ width: `${getCellSize()}px`, height: `${getCellSize()}px`, fontSize: `${getFontSize()}px` }}
                        aria-label={`Cell ${i + 1}${val ? `, value ${val}` : ', empty'}${isInitial ? ', given' : ''}${isSelected ? ', selected' : ''}`}
                      >
                        {val}
                        {isSelected && !isInitial && !val && (
                          <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
                            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>

                <div className={`text-center mb-3 sm:mb-4 text-xs ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {getRuleDescription()}
                </div>

                <div className="flex justify-center gap-1.5 sm:gap-2 flex-wrap" role="group" aria-label="Number buttons">
                  {getAvailableNumbers().map(num => (
                    <button 
                      key={num} 
                      onClick={() => handleNumberInput(num)}
                      className={`py-2.5 sm:py-3 px-4 sm:px-5 rounded-xl text-lg sm:text-xl font-black transition-all active:scale-95
                        ${isBoxDarkMode ? 'bg-blue-900 text-white hover:bg-blue-800' : 'bg-blue-600 text-white hover:bg-blue-700'} hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400`}
                      style={{ minWidth: `${Math.max(44, 65 - (gridSize - 4) * 5)}px` }}
                      aria-label={`Place number ${num}`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ============ GAME OVER SCREEN ============ */}
            {gameState === 'ended' && (
              <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
                <div className={`rounded-2xl p-6 sm:p-8 shadow-xl border w-full max-w-[480px] mx-4 ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                  {isMasterComplete ? (
                    <>
                      <Trophy className="w-20 h-20 text-yellow-500 mx-auto mb-4" aria-hidden="true" />
                      <h2 className={`text-3xl font-bold mb-2 text-center ${isBoxDarkMode ? 'text-yellow-400' : 'text-yellow-600'}`}>
                        🏆 SUDOKU MASTER!
                      </h2>
                      <p className={`mb-6 text-center text-lg ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        You&apos;ve conquered all 4 grids!
                      </p>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center justify-center gap-3 mb-4">
                        <Timer className="w-10 h-10 text-orange-500" aria-hidden="true" />
                        <h2 className={`text-2xl font-bold ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          Time&apos;s Up!
                        </h2>
                      </div>
                      <p className={`text-center text-sm mb-6 ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        Keep practicing to improve your logical deduction and Sudoku solving speed.
                      </p>
                    </>
                  )}
                  
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <ResultCard label="Final Score" value={score} icon={<Target className="w-4 h-4" />} color="yellow" isDark={isBoxDarkMode} />
                    <ResultCard label="Best Score" value={bestScore} icon={<Trophy className="w-4 h-4" />} color="yellow" isDark={isBoxDarkMode} />
                    <ResultCard label="Accuracy" value={getAccuracy()} unit="%" icon={<BarChart3 className="w-4 h-4" />} color="purple" isDark={isBoxDarkMode} />
                    <ResultCard label="Grids Done" value={`${completedGrids}/4`} icon={<Grid3X3 className="w-4 h-4" />} color="amber" isDark={isBoxDarkMode} />
                    <ResultCard label="Correct" value={totalCorrect} icon={<CheckCircle2 className="w-4 h-4" />} color="emerald" isDark={isBoxDarkMode} />
                    <ResultCard label="Best Combo" value={`${bestCombo}x`} icon={<Zap className="w-4 h-4" />} color="orange" isDark={isBoxDarkMode} />
                  </div>
                  
                  <div className="flex gap-3">
                    <Link href="/drills/cognitive" className="flex-1">
                      <span className={`block w-full px-4 py-2.5 rounded-lg font-semibold transition-all text-center ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                        ← Back to Drills
                      </span>
                    </Link>
                    <button 
                      onClick={resetGame}
                      className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Place numbers 1-N in <span className="font-semibold text-blue-500">each row, column & box</span> once</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">2</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Correct placement: <span className="font-semibold text-green-500">+10 points</span></p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">3</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Wrong placement: <span className="font-semibold text-red-500">-1 life</span> • 3 lives total</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">4</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>At 0 lives: <span className="font-semibold text-orange-500">-10 point penalty</span> per mistake</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">5</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Grid complete: <span className="font-semibold text-amber-500">+10 × grid size bonus</span> (+40 to +70)</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">6</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Complete 4×4→5×5→6×6→<span className="font-semibold text-purple-500">7×7 for Master</span></p>
                    </div>
                  </div>
                </div>
                <div className={`mt-4 pt-3 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs ${isDarkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'}`}>
                  <span>🔢 4×4 (2×2) • 5×5 (rows/cols) • 6×6 (2×3) • 7×7 (rows/cols)</span>
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
    amber: { bg: 'bg-amber-500/10', border: 'border-amber-500/30', text: 'text-amber-500', icon: 'text-amber-500' },
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