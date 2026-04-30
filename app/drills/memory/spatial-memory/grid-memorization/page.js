'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Target, Zap, Award, Activity, 
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, 
  Eye, Brain, Trophy, Info, Timer, Grid3X3, RefreshCw, SkipForward
} from 'lucide-react';

export default function GridMemorizationDrill() {
  const [loading, setLoading] = useState(true);
  const [gameState, setGameState] = useState('start');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isBoxDarkMode, setIsBoxDarkMode] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  
  const [gridSize, setGridSize] = useState(4);
  const [litCells, setLitCells] = useState(5);
  const [cellStates, setCellStates] = useState([]);
  const [phase, setPhase] = useState("ready");
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [roundsCompleted, setRoundsCompleted] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [memorizeTime, setMemorizeTime] = useState(5);
  const [userSelections, setUserSelections] = useState(new Set());

  const containerRef = useRef(null);
  const timerIntervalRef = useRef(null);
  const memorizeTimerRef = useRef(null);
  const feedbackTimeoutRef = useRef(null);
  const scoreRef = useRef(0);
  const streakRef = useRef(0);
  const gridSizeRef = useRef(4);
  const litCellsRef = useRef(5);
  const correctPatternRef = useRef(new Set());
  const userSelectionsRef = useRef(new Set());
  const audioCtxRef = useRef(null);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  // Load best scores
  useEffect(() => {
    const savedBestScore = localStorage.getItem('gridMemorizationBestScore');
    const savedBestStreak = localStorage.getItem('gridMemorizationBestStreak');
    if (savedBestScore) setBestScore(parseInt(savedBestScore, 10));
    if (savedBestStreak) setBestStreak(parseInt(savedBestStreak, 10));
  }, []);

  const updateBestScore = (finalScore) => {
    const currentBest = parseInt(localStorage.getItem('gridMemorizationBestScore') || '0', 10);
    if (finalScore > currentBest) {
      localStorage.setItem('gridMemorizationBestScore', finalScore.toString());
      setBestScore(finalScore);
    }
  };

  const showFeedback = (message, type) => {
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    setFeedback(message);
    setFeedbackType(type);
    feedbackTimeoutRef.current = setTimeout(() => {
      setFeedback('');
      setFeedbackType('');
    }, 800);
  };

  const playSound = (type) => {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }
      const osc = audioCtxRef.current.createOscillator();
      const gain = audioCtxRef.current.createGain();
      osc.connect(gain);
      gain.connect(audioCtxRef.current.destination);
      
      if (type === 'correct') {
        osc.frequency.value = 880;
        gain.gain.value = 0.1;
      } else if (type === 'wrong') {
        osc.frequency.value = 200;
        gain.gain.value = 0.15;
        osc.start();
        gain.gain.exponentialRampToValueAtTime(0.00001, audioCtxRef.current.currentTime + 0.3);
        osc.stop(audioCtxRef.current.currentTime + 0.3);
        return;
      } else if (type === 'streak') {
        osc.frequency.value = 1046.5;
        gain.gain.value = 0.12;
      } else if (type === 'gridUp') {
        osc.frequency.value = 1200;
        gain.gain.value = 0.15;
      } else if (type === 'select') {
        osc.frequency.value = 660;
        gain.gain.value = 0.06;
      }
      osc.start();
      gain.gain.exponentialRampToValueAtTime(0.00001, audioCtxRef.current.currentTime + 0.1);
      osc.stop(audioCtxRef.current.currentTime + 0.1);
    } catch (e) {}
  };

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

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Memorize countdown
  useEffect(() => {
    if (phase === "memorize" && memorizeTime > 0) {
      memorizeTimerRef.current = setInterval(() => {
        setMemorizeTime(t => t - 1);
      }, 1000);
      return () => clearInterval(memorizeTimerRef.current);
    } else if (phase === "memorize" && memorizeTime === 0) {
      startRecall();
    }
  }, [phase, memorizeTime]);

  // 60 second game timer
  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      timerIntervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setGameState('gameOver');
            if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
            updateBestScore(scoreRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [gameState, timeLeft]);

  const generatePattern = (size, litCount) => {
    const totalCells = size * size;
    const pattern = new Set();
    
    while (pattern.size < litCount) {
      pattern.add(Math.floor(Math.random() * totalCells));
    }
    
    return pattern;
  };

  const startRecall = () => {
    setPhase("recall");
    setUserSelections(new Set());
    userSelectionsRef.current = new Set();
  };

  const skipMemorize = () => {
    if (memorizeTimerRef.current) clearInterval(memorizeTimerRef.current);
    setMemorizeTime(0);
    startRecall();
  };

  const generateRound = (size, litCount) => {
    const pattern = generatePattern(size, litCount);
    correctPatternRef.current = pattern;
    
    const states = Array(size * size).fill(false);
    pattern.forEach(idx => { states[idx] = true; });
    setCellStates(states);
    
    setGridSize(size);
    setLitCells(litCount);
    setMemorizeTime(5);
    setPhase("memorize");
    setIsProcessing(false);
    setUserSelections(new Set());
    userSelectionsRef.current = new Set();
  };

  const startGame = () => {
    setGameState('playing');
    setScore(0);
    setStreak(0);
    setTimeLeft(60);
    setTotalCorrect(0);
    setTotalAttempts(0);
    setRoundsCompleted(0);
    setFeedback('');
    
    scoreRef.current = 0;
    streakRef.current = 0;
    gridSizeRef.current = 4;
    litCellsRef.current = 5;
    
    generateRound(4, 5);
    showFeedback('60 seconds • Select all lit cells!', 'success');
  };

  const toggleCell = (index) => {
    if (phase !== "recall" || isProcessing) return;
    
    const correctPattern = correctPatternRef.current;
    
    // Check if clicked cell is in the correct pattern
    if (!correctPattern.has(index)) {
      // WRONG CELL! Immediate fail
      setIsProcessing(true);
      
      scoreRef.current = Math.max(0, scoreRef.current - 3);
      setScore(scoreRef.current);
      
      streakRef.current = 0;
      setStreak(0);
      
      setTotalAttempts(prev => prev + 1);
      
      playSound('wrong');
      showFeedback('✗ Wrong! -3', 'error');
      
      // Show correct pattern briefly
      setPhase("result");
      
      setTimeout(() => {
        if (gameState === 'playing') {
          generateRound(gridSizeRef.current, litCellsRef.current);
        }
      }, 800);
      
      return;
    }
    
    // Correct cell! Add to selections
    const newSelections = new Set(userSelectionsRef.current);
    
    if (newSelections.has(index)) {
      newSelections.delete(index);
    } else {
      newSelections.add(index);
    }
    
    userSelectionsRef.current = newSelections;
    setUserSelections(newSelections);
    
    playSound('select');
    
    // Check if all correct cells are selected
    if (newSelections.size === correctPattern.size) {
      // Verify all selections are correct
      let allCorrect = true;
      newSelections.forEach(idx => {
        if (!correctPattern.has(idx)) allCorrect = false;
      });
      
      if (allCorrect) {
        // PERFECT! All cells selected correctly
        setIsProcessing(true);
        
        setTotalCorrect(prev => prev + 1);
        setTotalAttempts(prev => prev + 1);
        
        scoreRef.current += 3;
        setScore(scoreRef.current);
        
        streakRef.current++;
        setStreak(streakRef.current);
        
        if (streakRef.current > bestStreak) {
          setBestStreak(streakRef.current);
          localStorage.setItem('gridMemorizationBestStreak', streakRef.current.toString());
        }
        
        playSound('correct');
        showFeedback('✓ Perfect! +3', 'success');
        
        setRoundsCompleted(prev => prev + 1);
        
        setTimeout(() => {
          advanceRound();
        }, 400);
      }
    }
  };

  const advanceRound = () => {
    const currentGridSize = gridSizeRef.current;
    const currentLitCells = litCellsRef.current;
    
    const nextLitCells = currentLitCells + 1;
    
    if (nextLitCells <= 9 && currentGridSize === 4) {
      litCellsRef.current = nextLitCells;
      
      setTimeout(() => {
        generateRound(4, nextLitCells);
      }, 300);
    } else if (currentGridSize === 4) {
      gridSizeRef.current = 5;
      litCellsRef.current = 5;
      
      playSound('gridUp');
      showFeedback('🎯 5×5 Grid!', 'success');
      
      setTimeout(() => {
        generateRound(5, 5);
      }, 500);
    } else if (nextLitCells <= 9 && currentGridSize === 5) {
      litCellsRef.current = nextLitCells;
      
      setTimeout(() => {
        generateRound(5, nextLitCells);
      }, 300);
    } else {
      generateRound(5, 5);
    }
  };

  const resetGame = () => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (memorizeTimerRef.current) clearInterval(memorizeTimerRef.current);
    setGameState('start');
    setPhase('ready');
    setScore(0);
    setStreak(0);
    setTimeLeft(60);
    setGridSize(4);
    setLitCells(5);
    setTotalCorrect(0);
    setTotalAttempts(0);
    setRoundsCompleted(0);
    gridSizeRef.current = 4;
    litCellsRef.current = 5;
    userSelectionsRef.current = new Set();
  };

  useEffect(() => {
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      if (memorizeTimerRef.current) clearInterval(memorizeTimerRef.current);
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
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
          <Link href="/drills/memory" className={`inline-flex items-center gap-2 mb-4 ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>
            <ArrowLeft className="w-4 h-4" /> Back to Memory Drills
          </Link>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl">
                <Grid3X3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Grid Memorization</h1>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>+3 perfect • -3 wrong cell • Instant fail • 5→9 cells • 60s</p>
              </div>
            </div>
            <div className="flex gap-2">
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

        {/* Stats Board */}
        <div className="grid grid-cols-7 gap-3 mb-4 h-[88px]">
          <StatCard icon={<Target className="text-blue-600" />} value={score} label="Score" isDark={isDarkMode} />
          <StatCard icon={<Trophy className="text-yellow-600" />} value={bestScore} label="Best Score" isDark={isDarkMode} />
          <StatCard icon={<Timer className={timeLeft <= 10 ? 'text-red-600' : 'text-green-600'} />} value={timeLeft} label="Time" unit="s" isDark={isDarkMode} />
          <StatCard icon={<Zap className="text-orange-600" />} value={streak} label="Streak" isDark={isDarkMode} />
          <StatCard icon={<Award className="text-purple-600" />} value={bestStreak} label="Best Streak" isDark={isDarkMode} />
          <StatCard icon={<Grid3X3 className="text-cyan-600" />} value={`${gridSize}×${gridSize}`} label="Grid" isDark={isDarkMode} />
          <StatCard icon={<Activity className="text-emerald-600" />} value={litCells} label="Cells" isDark={isDarkMode} />
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
            background: isBoxDarkMode ? "#0a0a1a" : "#eef2ff",
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

          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div className="w-full max-w-lg text-center">
              {/* Start Screen */}
              {gameState === 'start' && (
                <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
                  <div className={`rounded-2xl p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                    <Grid3X3 className="w-16 h-16 text-indigo-500 mx-auto mb-4" />
                    <h3 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Grid Memorization</h3>
                    <p className={`mb-6 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>60-second challenge • Select all lit cells</p>
                    <button 
                      onClick={startGame} 
                      className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg w-full transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                    >
                      Start Training
                    </button>
                  </div>
                </div>
              )}

              {/* Memorize Phase */}
              {gameState === 'playing' && phase === "memorize" && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-sm font-bold ${isBoxDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>
                      {memorizeTime}s
                    </span>
                    <button 
                      onClick={skipMemorize}
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                        isBoxDarkMode ? 'bg-indigo-500/20 text-indigo-400 hover:bg-indigo-500/30' : 'bg-indigo-100 text-indigo-600 hover:bg-indigo-200'
                      }`}
                    >
                      <SkipForward className="w-3.5 h-3.5" />
                      Skip
                    </button>
                  </div>
                  <div 
                    className="grid gap-1.5 mx-auto"
                    style={{ 
                      gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
                      maxWidth: gridSize === 5 ? '400px' : '320px'
                    }}
                  >
                    {cellStates.map((isLit, i) => (
                      <div
                        key={i}
                        className={`aspect-square rounded-lg transition-all ${
                          isLit 
                            ? 'bg-indigo-500 shadow-lg shadow-indigo-500/30' 
                            : isBoxDarkMode ? 'bg-white/5' : 'bg-indigo-50'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Recall Phase */}
              {gameState === 'playing' && phase === "recall" && (
                <div className="space-y-3">
                  <div className="text-center mb-2">
                    <span className={`text-sm font-bold ${isBoxDarkMode ? 'text-cyan-400' : 'text-cyan-600'}`}>
                      {userSelections.size}/{litCells}
                    </span>
                  </div>
                  <div 
                    className="grid gap-1.5 mx-auto"
                    style={{ 
                      gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
                      maxWidth: gridSize === 5 ? '400px' : '320px'
                    }}
                  >
                    {Array.from({ length: gridSize * gridSize }, (_, i) => (
                      <button
                        key={i}
                        onClick={() => toggleCell(i)}
                        disabled={isProcessing}
                        className={`aspect-square rounded-lg transition-all hover:scale-105 active:scale-95 ${
                          userSelections.has(i)
                            ? 'bg-cyan-500 shadow-lg shadow-cyan-500/30'
                            : isBoxDarkMode ? 'bg-white/10 hover:bg-white/20' : 'bg-indigo-100 hover:bg-indigo-200'
                        } disabled:opacity-50`}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Result Phase (shown on wrong answer) */}
              {gameState === 'playing' && phase === "result" && (
                <div className="space-y-3">
                  <div 
                    className="grid gap-1.5 mx-auto"
                    style={{ 
                      gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
                      maxWidth: gridSize === 5 ? '400px' : '320px'
                    }}
                  >
                    {cellStates.map((isLit, i) => (
                      <div
                        key={i}
                        className={`aspect-square rounded-lg ${
                          isLit 
                            ? 'bg-green-500 shadow-lg shadow-green-500/30' 
                            : isBoxDarkMode ? 'bg-white/5' : 'bg-indigo-50'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Game Over Screen */}
          {gameState === 'gameOver' && (
            <div className="absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40" style={{ background: isBoxDarkMode ? 'rgba(10,10,26,0.95)' : 'rgba(238,242,255,0.95)' }}>
              <div className={`rounded-2xl p-8 shadow-xl border w-[480px] ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <div className="flex items-center justify-center gap-3 mb-6">
                  <Award className="w-10 h-10 text-yellow-500" />
                  <h3 className={`text-2xl font-bold ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Time's Up!</h3>
                </div>
                
                <p className={`text-center mb-6 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  60 seconds completed!
                </p>
                
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <ResultCard label="Final Score" value={score} icon={<Target className="w-4 h-4" />} color="text-blue-500" isDark={isBoxDarkMode} />
                  <ResultCard label="Best Score" value={bestScore} icon={<Trophy className="w-4 h-4" />} color="text-yellow-500" isDark={isBoxDarkMode} />
                  <ResultCard label="Best Streak" value={bestStreak} icon={<Zap className="w-4 h-4" />} color="text-orange-500" isDark={isBoxDarkMode} />
                  <ResultCard label="Peak Grid" value={`${gridSize}×${gridSize}`} icon={<Grid3X3 className="w-4 h-4" />} color="text-purple-500" isDark={isBoxDarkMode} />
                  <ResultCard label="Rounds" value={roundsCompleted} icon={<Activity className="w-4 h-4" />} color="text-green-500" isDark={isBoxDarkMode} />
                  <ResultCard label="Max Cells" value={litCells} icon={<Brain className="w-4 h-4" />} color="text-cyan-500" isDark={isBoxDarkMode} />
                </div>
                
                <div className="flex gap-4">
                  <button 
                    onClick={resetGame} 
                    className={`flex-1 px-4 py-2.5 rounded-lg font-semibold transition-all ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                  >
                    ← Back
                  </button>
                  <button 
                    onClick={startGame} 
                    className="flex-1 px-4 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98]"
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
                  <Info className={`w-4 h-4 ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`} />
                  <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Drill Rules & Scoring</h3>
                </div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-indigo-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">1</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Memorize <span className="font-semibold text-indigo-500">all lit cells</span> for 5 seconds (or skip)
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">2</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        All correct = <span className="font-semibold text-green-500">+3 points</span>
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">3</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Click wrong cell = <span className="font-semibold text-red-500">-3 points + instant fail</span>
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-cyan-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">4</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-cyan-500">4×4</span> (5-9 cells) → <span className="font-semibold text-cyan-500">5×5</span> (5-9 cells)
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">5</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Click correct cells • <span className="font-semibold text-purple-500">First wrong click fails round</span>
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">6</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Challenge lasts <span className="font-semibold text-yellow-500">60 seconds</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className={`mt-3 pt-3 border-t text-xs ${isDarkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'} flex items-center justify-between`}>
                  <span>🔷 Purple = Lit • 🔵 Cyan = Selected • 🟢 Green = Correct</span>
                  <span>⚡ Best Score saves locally</span>
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

function ResultCard({ label, value, unit = '', icon, color, isDark }) {
  const bgColor = color === 'text-blue-500' ? 'bg-blue-500/10' : 
                   color === 'text-yellow-500' ? 'bg-yellow-500/10' : 
                   color === 'text-orange-500' ? 'bg-orange-500/10' :
                   color === 'text-green-500' ? 'bg-green-500/10' :
                   color === 'text-purple-500' ? 'bg-purple-500/10' : 'bg-cyan-500/10';
  
  return (
    <div className={`flex items-center justify-between p-3 rounded-lg ${bgColor}`}>
      <div className="flex items-center gap-2">
        <div className={color}>{icon}</div>
        <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{label}</span>
      </div>
      <span className={`font-bold text-lg ${color}`}>{value}{unit}</span>
    </div>
  );
}