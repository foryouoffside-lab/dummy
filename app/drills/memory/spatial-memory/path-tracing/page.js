// app/drills/memory/spatial-memory/path-tracing/page.js
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { 
  ArrowLeft, Target, Zap, Clock, Award,
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, 
  Eye, Timer, Trophy, Info, Route, TrendingUp, RefreshCw
} from "lucide-react";

export default function PathTracingDrill() {
  const [loading, setLoading] = useState(true);
  const [gameState, setGameState] = useState('start');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isBoxDarkMode, setIsBoxDarkMode] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  
  const [path, setPath] = useState([]);
  const [userPath, setUserPath] = useState([]);
  const [phase, setPhase] = useState("ready");
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [feedback, setFeedback] = useState("");
  const [feedbackType, setFeedbackType] = useState("");
  const [currentDot, setCurrentDot] = useState(null);
  const [resultMessage, setResultMessage] = useState("");
  const [isShowingResult, setIsShowingResult] = useState(false);
  const [wrongDotIndex, setWrongDotIndex] = useState(null);
  
  const timerIntervalRef = useRef(null);
  const resultTimerRef = useRef(null);
  const feedbackTimeoutRef = useRef(null);
  const containerRef = useRef(null);
  const audioCtxRef = useRef(null);
  const scoreRef = useRef(0);
  const streakRef = useRef(0);
  const levelRef = useRef(1);
  const gameStateRef = useRef('start');
  const isProcessingRef = useRef(false);
  const animationTimeoutsRef = useRef([]);
  const currentGridSizeRef = useRef(3);

  const cleanButtonClass = "outline-none focus:outline-none ring-0 focus:ring-0 focus:ring-offset-0 focus:ring-transparent select-none active:outline-none shadow-none";

  const getGridSize = () => {
    const pathLength = levelRef.current + 3;
    if (pathLength <= 4) return 3;
    if (pathLength <= 6) return 4;
    if (pathLength <= 8) return 5;
    if (pathLength <= 10) return 6;
    return 7;
  };

  const getPathLength = () => {
    return levelRef.current + 3;
  };

  useEffect(() => {
    const savedBestScore = localStorage.getItem('pathTracingBestScore');
    if (savedBestScore) {
      setBestScore(parseInt(savedBestScore, 10));
    }
  }, []);

  const updateBestScore = (finalScore) => {
    const currentBestScore = parseInt(localStorage.getItem('pathTracingBestScore') || '0', 10);
    if (finalScore > currentBestScore) {
      localStorage.setItem('pathTracingBestScore', finalScore.toString());
      setBestScore(finalScore);
    }
  };

  useEffect(() => {
    gameStateRef.current = gameState;
  }, [gameState]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  const showFeedback = (message, type) => {
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    setFeedback(message);
    setFeedbackType(type);
    feedbackTimeoutRef.current = setTimeout(() => {
      setFeedback('');
      setFeedbackType('');
    }, 600);
  };

  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      timerIntervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setGameState('gameOver');
            gameStateRef.current = 'gameOver';
            clearAnimationTimeouts();
            if (resultTimerRef.current) clearTimeout(resultTimerRef.current);
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
  }, [gameState]);

  const initAudio = () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  };

  const playSound = (type) => {
    if (!soundEnabled) return;
    try {
      const audioCtx = initAudio();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      
      if (type === 'correct') {
        osc.frequency.value = 880;
        gain.gain.value = 0.12;
      } else if (type === 'wrong') {
        osc.frequency.value = 440;
        gain.gain.value = 0.1;
      } else if (type === 'streak') {
        osc.frequency.value = 1046.5;
        gain.gain.value = 0.12;
      } else if (type === 'click') {
        osc.frequency.value = 660;
        gain.gain.value = 0.08;
      } else if (type === 'pathDot') {
        osc.frequency.value = 520;
        gain.gain.value = 0.06;
      }
      osc.start();
      gain.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 0.1);
      osc.stop(audioCtx.currentTime + 0.1);
    } catch (e) {}
  };

  const clearAnimationTimeouts = () => {
    animationTimeoutsRef.current.forEach(timeout => clearTimeout(timeout));
    animationTimeoutsRef.current = [];
  };

  const getNeighbors = (index, size) => {
    const row = Math.floor(index / size);
    const col = index % size;
    const neighbors = [];
    if (row > 0) neighbors.push(index - size);
    if (row < size - 1) neighbors.push(index + size);
    if (col > 0) neighbors.push(index - 1);
    if (col < size - 1) neighbors.push(index + 1);
    return neighbors;
  };

  const generatePath = () => {
    const gSize = currentGridSizeRef.current;
    const pathLength = getPathLength();
    const totalCells = gSize * gSize;
    const newPath = [];
    
    let current = Math.floor(Math.random() * totalCells);
    newPath.push(current);
    
    for (let i = 1; i < pathLength; i++) {
      const neighbors = getNeighbors(current, gSize);
      const unvisited = neighbors.filter(n => !newPath.includes(n));
      const next = unvisited.length > 0 
        ? unvisited[Math.floor(Math.random() * unvisited.length)]
        : neighbors[Math.floor(Math.random() * neighbors.length)];
      newPath.push(next);
      current = next;
    }
    
    return newPath;
  };

  const startPathAnimation = (pathArray) => {
    setPath(pathArray);
    setUserPath([]);
    setCurrentDot(null);
    setResultMessage("");
    setIsShowingResult(false);
    setWrongDotIndex(null);
    setPhase("showing");
    isProcessingRef.current = false;
    
    clearAnimationTimeouts();
    
    pathArray.forEach((dot, i) => {
      const timeout = setTimeout(() => {
        setCurrentDot(dot);
        playSound('pathDot');
      }, i * 500);
      animationTimeoutsRef.current.push(timeout);
    });
    
    const finalTimeout = setTimeout(() => {
      setCurrentDot(null);
      setPhase("drawing");
    }, pathArray.length * 500 + 400);
    animationTimeoutsRef.current.push(finalTimeout);
  };

  const startNewRound = () => {
    if (gameStateRef.current !== 'playing') return;
    
    if (resultTimerRef.current) clearTimeout(resultTimerRef.current);
    
    currentGridSizeRef.current = getGridSize();
    
    const newPath = generatePath();
    startPathAnimation(newPath);
  };

  const handleWrongClick = (wrongIndex) => {
    isProcessingRef.current = true;
    setIsShowingResult(true);
    setWrongDotIndex(wrongIndex);
    
    // Penalty: -2 points
    scoreRef.current = Math.max(0, scoreRef.current - 2);
    setScore(scoreRef.current);
    
    streakRef.current = 0;
    setStreak(0);
    playSound('wrong');
    showFeedback(`✗ Wrong! -2 points`, 'error');
    
    setResultMessage("Wrong path 💪");
    
    // Move to next round after 1.5 seconds
    resultTimerRef.current = setTimeout(() => {
      if (gameStateRef.current === 'playing') {
        startNewRound();
      }
    }, 1500);
  };

  const handleDotClick = (index) => {
    if (phase !== "drawing" || isProcessingRef.current || isShowingResult) return;
    
    if (userPath.includes(index)) return;
    
    const currentIndex = userPath.length;
    const isCorrectDot = path[currentIndex] === index;
    
    // If wrong dot clicked, immediately end round
    if (!isCorrectDot) {
      const newUserPath = [...userPath, index];
      setUserPath(newUserPath);
      playSound('click');
      handleWrongClick(index);
      return;
    }
    
    // Correct dot
    const newUserPath = [...userPath, index];
    setUserPath(newUserPath);
    playSound('click');
    
    // Check if path is complete
    if (newUserPath.length === path.length) {
      isProcessingRef.current = true;
      setIsShowingResult(true);
      
      // Reward: +2 points
      scoreRef.current += 2;
      setScore(scoreRef.current);
      
      const newStreak = streakRef.current + 1;
      streakRef.current = newStreak;
      setStreak(newStreak);
      
      if (newStreak > bestStreak) {
        setBestStreak(newStreak);
      }
      
      playSound('correct');
      
      if (newStreak % 5 === 0 && newStreak > 0) {
        playSound('streak');
        showFeedback(`🔥 ${newStreak} Streak! +2`, 'success');
      } else {
        showFeedback(`✓ Perfect! +2 points`, 'success');
      }
      
      setResultMessage("Perfect! 🎉");
      levelRef.current += 1;
      setLevel(levelRef.current);
      
      // Move to next round after 1.5 seconds
      resultTimerRef.current = setTimeout(() => {
        if (gameStateRef.current === 'playing') {
          startNewRound();
        }
      }, 1500);
    }
  };

  const startDrill = () => {
    setGameState('playing');
    gameStateRef.current = 'playing';
    setScore(0);
    setLevel(1);
    setStreak(0);
    setBestStreak(0);
    setTimeLeft(60);
    setFeedback('');
    
    scoreRef.current = 0;
    streakRef.current = 0;
    levelRef.current = 1;
    isProcessingRef.current = false;
    
    currentGridSizeRef.current = getGridSize();
    
    clearAnimationTimeouts();
    if (resultTimerRef.current) clearTimeout(resultTimerRef.current);
    
    startNewRound();
  };

  const resetGame = () => {
    clearAnimationTimeouts();
    if (resultTimerRef.current) clearTimeout(resultTimerRef.current);
    setGameState('start');
    gameStateRef.current = 'start';
    setScore(0);
    setLevel(1);
    setStreak(0);
    setBestStreak(0);
    setTimeLeft(60);
    setFeedback('');
    setPhase("ready");
    setPath([]);
    setUserPath([]);
    setCurrentDot(null);
    setResultMessage("");
    setIsShowingResult(false);
    setWrongDotIndex(null);
    isProcessingRef.current = false;
  };

  const toggleFullscreen = async () => {
    try {
      const element = containerRef.current;
      if (!isFullscreen && element?.requestFullscreen) {
        await element.requestFullscreen();
        setIsFullscreen(true);
      } else if (document.exitFullscreen) {
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

  useEffect(() => {
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      clearAnimationTimeouts();
      if (resultTimerRef.current) clearTimeout(resultTimerRef.current);
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading drill...</p>
        </div>
      </div>
    );
  }

  const currentGridSize = currentGridSizeRef.current;
  const totalCells = currentGridSize * currentGridSize;

  return (
    <div className={`min-h-screen select-none ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6">
          <Link href="/drills/memory" className={`inline-flex items-center gap-2 mb-4 outline-none ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>
            <ArrowLeft className="w-4 h-4" />
            Back to Memory Drills
          </Link>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl">
                <Route className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Path Tracing</h1>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Remember and retrace the path - 60 seconds</p>
              </div>
            </div>
            
            <div className="flex gap-2">
              {gameState === 'playing' && (
                <button
                  onClick={resetGame}
                  className={`p-2 rounded-lg transition shadow-sm border hover:scale-105 active:scale-95 ${cleanButtonClass} ${
                    isDarkMode 
                      ? 'bg-gray-800 hover:bg-gray-700 text-gray-300 border-gray-700' 
                      : 'bg-white hover:bg-gray-100 text-gray-700 border-gray-200'
                  }`}
                  title="Reset session"
                >
                  <RefreshCw className="w-5 h-5" />
                </button>
              )}
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`p-2 rounded-lg transition shadow-sm border hover:scale-105 active:scale-95 ${cleanButtonClass} ${
                  isDarkMode 
                    ? 'bg-gray-800 hover:bg-gray-700 text-gray-300 border-gray-700' 
                    : 'bg-white hover:bg-gray-100 text-gray-700 border-gray-200'
                }`}
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button
                onClick={() => setIsBoxDarkMode(!isBoxDarkMode)}
                className={`p-2 rounded-lg transition shadow-sm border hover:scale-105 active:scale-95 ${cleanButtonClass} ${
                  isDarkMode 
                    ? 'bg-gray-800 hover:bg-gray-700 text-gray-300 border-gray-700' 
                    : 'bg-white hover:bg-gray-100 text-gray-700 border-gray-200'
                }`}
              >
                <Eye className="w-5 h-5" />
              </button>
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className={`p-2 rounded-lg transition shadow-sm border hover:scale-105 active:scale-95 ${cleanButtonClass} ${
                  isDarkMode 
                    ? 'bg-gray-800 hover:bg-gray-700 text-gray-300 border-gray-700' 
                    : 'bg-white hover:bg-gray-100 text-gray-700 border-gray-200'
                }`}
              >
                {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
              </button>
              <button
                onClick={toggleFullscreen}
                className={`p-2 rounded-lg transition shadow-sm border hover:scale-105 active:scale-95 ${cleanButtonClass} ${
                  isDarkMode 
                    ? 'bg-gray-800 hover:bg-gray-700 text-gray-300 border-gray-700' 
                    : 'bg-white hover:bg-gray-100 text-gray-700 border-gray-200'
                }`}
              >
                {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Stats Board */}
        <div className="grid grid-cols-5 gap-3 mb-4 h-[88px]">
          <StatCard icon={<Target className="text-amber-600" />} value={score} label="Score" isDark={isDarkMode} />
          <StatCard icon={<Trophy className="text-yellow-500" />} value={bestScore} label="Best" isDark={isDarkMode} />
          <StatCard icon={<Timer className={timeLeft < 15 ? 'text-red-600' : 'text-green-600'} />} value={timeLeft} label="Time" unit="s" isDark={isDarkMode} />
          <StatCard icon={<TrendingUp className="text-purple-500" />} value={level} label="Level" isDark={isDarkMode} />
          <StatCard icon={<Zap className="text-orange-500" />} value={`${currentGridSize}×${currentGridSize}`} label="Grid" isDark={isDarkMode} />
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
            background: isBoxDarkMode ? "#1a1a1a" : "#f0f0f0",
            aspectRatio: '16/9',
            maxWidth: '100%',
            margin: '0 auto',
            borderColor: isDarkMode ? '#374151' : '#e5e7eb',
            overflow: 'hidden'
          }}
        >
          {isFullscreen && gameState === 'playing' && (
            <div className="absolute top-4 right-4 z-30 flex gap-3">
              <button onClick={resetGame} className="p-2 bg-black/50 rounded-lg text-white hover:bg-black/70 transition-all" title="Reset session">
                <RefreshCw className="w-5 h-5" />
              </button>
              <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 bg-black/50 rounded-lg text-white hover:bg-black/70 transition-all">{isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}</button>
              <button onClick={() => setIsBoxDarkMode(!isBoxDarkMode)} className="p-2 bg-black/50 rounded-lg text-white hover:bg-black/70 transition-all"><Eye className="w-5 h-5" /></button>
              <button onClick={() => setSoundEnabled(!soundEnabled)} className="p-2 bg-black/50 rounded-lg text-white hover:bg-black/70 transition-all">{soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}</button>
              <button onClick={toggleFullscreen} className="p-2 bg-black/50 rounded-lg text-white hover:bg-black/70 transition-all"><Minimize2 className="w-5 h-5" /></button>
            </div>
          )}

          <div className="absolute inset-0 flex items-center justify-center p-4 md:p-8">
            {/* Start Screen */}
            {gameState === 'start' && (
              <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
                <div className={`rounded-2xl p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                  <Route className="w-16 h-16 text-amber-500 mx-auto mb-4" />
                  <h3 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Path Tracing</h3>
                  <p className={`mb-6 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>60-second challenge • Remember and retrace the path</p>
                  <button 
                    onClick={startDrill} 
                    className="px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-xl font-semibold hover:shadow-lg w-full transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Start Training
                  </button>
                </div>
              </div>
            )}

            {/* Playing Screen */}
            {gameState === 'playing' && (
              <div className="w-full max-w-lg text-center">
                {/* Showing Phase */}
                {phase === "showing" && (
                  <div className="space-y-6">
                    <div 
                      className="grid gap-2 md:gap-3 mx-auto"
                      style={{ 
                        gridTemplateColumns: `repeat(${currentGridSize}, 1fr)`,
                        maxWidth: '400px',
                        width: '100%'
                      }}
                    >
                      {Array.from({ length: totalCells }, (_, i) => {
                        const dotIndex = path.indexOf(i);
                        const isCurrentDot = currentDot === i;
                        const isPreviousDot = dotIndex !== -1 && dotIndex < path.indexOf(currentDot);
                        
                        return (
                          <div
                            key={`showing-${i}`}
                            className="aspect-square rounded-full transition-all border-2"
                            style={{
                              minWidth: '40px',
                              minHeight: '40px',
                              backgroundColor: isCurrentDot 
                                ? '#fbbf24' 
                                : isPreviousDot 
                                  ? 'rgba(251, 191, 36, 0.3)' 
                                  : isBoxDarkMode ? '#374151' : '#d1d5db',
                              borderColor: isCurrentDot 
                                ? '#f59e0b' 
                                : isPreviousDot 
                                  ? 'rgba(251, 191, 36, 0.5)' 
                                  : isBoxDarkMode ? '#4b5563' : '#9ca3af',
                              transform: isCurrentDot ? 'scale(1.15)' : 'scale(1)',
                              boxShadow: isCurrentDot ? '0 0 15px rgba(251, 191, 36, 0.5)' : 'none'
                            }}
                          />
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Drawing Phase */}
                {phase === "drawing" && (
                  <div className="space-y-6">
                    <div 
                      className="grid gap-2 md:gap-3 mx-auto"
                      style={{ 
                        gridTemplateColumns: `repeat(${currentGridSize}, 1fr)`,
                        maxWidth: '400px',
                        width: '100%'
                      }}
                    >
                      {Array.from({ length: totalCells }, (_, i) => {
                        const isClicked = userPath.includes(i);
                        const clickOrder = userPath.indexOf(i);
                        const isCorrect = path[clickOrder] === i;
                        const isWrongClick = wrongDotIndex === i;
                        
                        // Show correct path during result display
                        const isCorrectPath = isShowingResult && path.includes(i) && !isClicked;
                        const correctOrder = isShowingResult ? path.indexOf(i) : -1;
                        
                        let bgColor, borderColor, textContent;
                        
                        if (isWrongClick) {
                          bgColor = '#ef4444';
                          borderColor = '#dc2626';
                          textContent = '✗';
                        } else if (isClicked && isCorrect) {
                          bgColor = '#3b82f6';
                          borderColor = '#2563eb';
                          textContent = clickOrder + 1;
                        } else if (isCorrectPath) {
                          bgColor = 'rgba(34, 197, 94, 0.3)';
                          borderColor = '#22c55e';
                          textContent = correctOrder + 1;
                        } else {
                          bgColor = isBoxDarkMode ? '#374151' : '#d1d5db';
                          borderColor = isBoxDarkMode ? '#4b5563' : '#9ca3af';
                          textContent = '';
                        }
                        
                        const isDisabled = isProcessingRef.current || isClicked;
                        
                        return (
                          <button
                            key={`drawing-${i}`}
                            onClick={() => handleDotClick(i)}
                            disabled={isDisabled}
                            className="aspect-square rounded-full transition-all transform flex items-center justify-center font-bold text-white border-2"
                            style={{
                              minWidth: '40px',
                              minHeight: '40px',
                              backgroundColor: bgColor,
                              borderColor: borderColor,
                              cursor: isDisabled ? 'default' : 'pointer',
                              opacity: isDisabled && !isClicked && !isCorrectPath ? 0.4 : 1
                            }}
                            onMouseEnter={(e) => {
                              if (!isDisabled) {
                                e.currentTarget.style.transform = 'scale(1.1)';
                                e.currentTarget.style.backgroundColor = isBoxDarkMode ? '#4b5563' : '#9ca3af';
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (!isDisabled) {
                                e.currentTarget.style.transform = 'scale(1)';
                                e.currentTarget.style.backgroundColor = isBoxDarkMode ? '#374151' : '#d1d5db';
                              }
                            }}
                          >
                            {textContent && (
                              <span className="text-sm md:text-base">
                                {textContent}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                    
                    {/* Result message */}
                    <div className="h-12 flex items-center justify-center">
                      {isShowingResult && (
                        <p className={`text-xl md:text-2xl font-bold animate-bounce ${
                          resultMessage.includes("Perfect") ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {resultMessage}
                        </p>
                      )}
                      {!isShowingResult && (
                        <p className={`text-sm ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {userPath.length} / {path.length} dots
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Game Over Screen */}
            {gameState === 'gameOver' && (
              <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
                <div className={`rounded-2xl p-6 md:p-8 shadow-xl border w-[95%] max-w-[480px] ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                  <div className="flex items-center justify-center gap-3 mb-6">
                    <Award className="w-10 h-10 text-yellow-500" />
                    <h3 className={`text-2xl font-bold ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Session Complete!</h3>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <ResultCard label="Final Score" value={score} icon={<Target className="w-4 h-4" />} color="text-yellow-500" />
                    <ResultCard label="Best Score" value={bestScore} icon={<Trophy className="w-4 h-4" />} color="text-yellow-500" />
                    <ResultCard label="Highest Level" value={level} icon={<TrendingUp className="w-4 h-4" />} color="text-purple-500" />
                    <ResultCard label="Best Streak" value={bestStreak} icon={<Zap className="w-4 h-4" />} color="text-orange-500" />
                    <ResultCard label="Max Path Length" value={level + 3} icon={<Route className="w-4 h-4" />} color="text-cyan-500" />
                    <ResultCard label="Session Time" value="60s" icon={<Timer className="w-4 h-4" />} color="text-blue-500" />
                  </div>
                  
                  <div className="flex gap-4">
                    <Link href="/drills/memory" className="flex-1">
                      <button className={`w-full px-4 py-2.5 rounded-lg font-semibold transition-all ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                        ← Back
                      </button>
                    </Link>
                    <button 
                      onClick={resetGame} 
                      className="flex-1 px-4 py-2.5 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98]"
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
                  <Info className={`w-4 h-4 ${isDarkMode ? 'text-amber-400' : 'text-amber-600'}`} />
                  <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Drill Rules & Instructions</h3>
                </div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">1</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Watch the <span className="font-semibold text-amber-500">path animation</span> carefully</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">2</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Click dots to <span className="font-semibold text-blue-500">retrace the exact path</span> in order</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">3</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}><span className="font-semibold text-red-500">One wrong click</span> ends the round immediately</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">4</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Correct path: <span className="font-semibold text-green-500">+2 points</span></p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-cyan-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">5</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Wrong path: <span className="font-semibold text-cyan-500">-2 points</span></p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">6</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Challenge lasts <span className="font-semibold text-yellow-500">60 seconds</span></p>
                    </div>
                  </div>
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
      <p className={`text-lg md:text-xl font-bold truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>{value}{unit}</p>
      <p className={`text-xs truncate ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{label}</p>
    </div>
  );
}

function ResultCard({ label, value, unit = '', icon, color }) {
  const bgColor = color === 'text-yellow-500' ? 'bg-yellow-500/10' : 
                   color === 'text-purple-500' ? 'bg-purple-500/10' : 
                   color === 'text-orange-500' ? 'bg-orange-500/10' :
                   color === 'text-cyan-500' ? 'bg-cyan-500/10' : 
                   color === 'text-blue-500' ? 'bg-blue-500/10' : 'bg-red-500/10';
  
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