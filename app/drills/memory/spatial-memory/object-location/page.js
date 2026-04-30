// app/drills/memory/spatial-memory/object-location/page.js
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { 
  ArrowLeft, Target, Zap, Clock, Award,
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, 
  Eye, Timer, Trophy, Info, MapPin, TrendingUp
} from "lucide-react";

const objects = ["🌟", "💎", "🔑", "🎯", "🔥", "⭐", "💡", "🎵", "🌺", "🦋"];

export default function ObjectLocationDrill() {
  const [loading, setLoading] = useState(true);
  const [gameState, setGameState] = useState('start');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isBoxDarkMode, setIsBoxDarkMode] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  
  const [objectLocations, setObjectLocations] = useState({});
  const [targetObject, setTargetObject] = useState("");
  const [phase, setPhase] = useState("ready"); // ready, memorize, locate
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [feedback, setFeedback] = useState("");
  const [feedbackType, setFeedbackType] = useState("");
  const [lastResult, setLastResult] = useState(null); // 'correct' or 'wrong'
  const [showResult, setShowResult] = useState(false);
  
  const timerIntervalRef = useRef(null);
  const memorizationTimerRef = useRef(null);
  const resultTimerRef = useRef(null);
  const feedbackTimeoutRef = useRef(null);
  const containerRef = useRef(null);
  const audioCtxRef = useRef(null);
  const scoreRef = useRef(0);
  const streakRef = useRef(0);
  const levelRef = useRef(1);
  const gameStateRef = useRef('start');
  const isProcessingRef = useRef(false);

  const cleanButtonClass = "outline-none focus:outline-none ring-0 focus:ring-0 focus:ring-offset-0 focus:ring-transparent select-none active:outline-none shadow-none";

  // Calculate grid size based on level
  const getGridSize = () => {
    const objectCount = levelRef.current + 1;
    if (objectCount <= 8) return 3;   // 3x3 grid for 2-8 objects
    if (objectCount <= 16) return 4;   // 4x4 grid for 9-16 objects
    if (objectCount <= 25) return 5;   // 5x5 grid for 17-25 objects
    if (objectCount <= 36) return 6;   // 6x6 grid for 26-36 objects
    return 7;                          // 7x7 grid for 37+ objects
  };

  // Calculate cell size based on grid
  const getCellStyle = (gridSize) => {
    if (gridSize <= 3) return { fontSize: '2.5rem' };
    if (gridSize === 4) return { fontSize: '2rem' };
    if (gridSize === 5) return { fontSize: '1.5rem' };
    if (gridSize === 6) return { fontSize: '1.25rem' };
    return { fontSize: '1rem' };
  };

  // Load best score from localStorage
  useEffect(() => {
    const savedBestScore = localStorage.getItem('objectLocationBestScore');
    if (savedBestScore) {
      setBestScore(parseInt(savedBestScore, 10));
    }
  }, []);

  // Update best score
  const updateBestScore = (finalScore) => {
    const currentBestScore = parseInt(localStorage.getItem('objectLocationBestScore') || '0', 10);
    if (finalScore > currentBestScore) {
      localStorage.setItem('objectLocationBestScore', finalScore.toString());
      setBestScore(finalScore);
    }
  };

  useEffect(() => {
    gameStateRef.current = gameState;
  }, [gameState]);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  // Show feedback
  const showFeedback = (message, type) => {
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    setFeedback(message);
    setFeedbackType(type);
    feedbackTimeoutRef.current = setTimeout(() => {
      setFeedback('');
      setFeedbackType('');
    }, 600);
  };

  // Timer effect
  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      timerIntervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setGameState('gameOver');
            gameStateRef.current = 'gameOver';
            clearAllTimers();
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

  // Play sound effect
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
      }
      osc.start();
      gain.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 0.15);
      osc.stop(audioCtx.currentTime + 0.15);
    } catch (e) {}
  };

  // Clear all timers
  const clearAllTimers = () => {
    if (memorizationTimerRef.current) {
      clearTimeout(memorizationTimerRef.current);
      memorizationTimerRef.current = null;
    }
    if (resultTimerRef.current) {
      clearTimeout(resultTimerRef.current);
      resultTimerRef.current = null;
    }
  };

  // Generate objects with unique objects only
  const generateObjects = () => {
    const gridSize = getGridSize();
    const totalCells = gridSize * gridSize;
    const expectedObjects = Math.min(levelRef.current + 1, totalCells);
    const actualNumObjects = Math.min(expectedObjects, objects.length);
    const locations = {};
    const usedPositions = new Set();
    const usedObjects = new Set();
    
    for (let i = 0; i < actualNumObjects; i++) {
      // Pick unique position
      let position;
      do {
        position = Math.floor(Math.random() * totalCells);
      } while (usedPositions.has(position));
      usedPositions.add(position);
      
      // Pick unique object
      let object;
      do {
        object = objects[Math.floor(Math.random() * objects.length)];
      } while (usedObjects.has(object));
      usedObjects.add(object);
      
      locations[position] = object;
    }
    
    setObjectLocations(locations);
    
    // Pick a random target object from the placed ones
    const placedObjects = Object.values(locations);
    setTargetObject(placedObjects[Math.floor(Math.random() * placedObjects.length)]);
    setLastResult(null);
    setShowResult(false);
  };

  // Start memorization phase
  const startMemorization = () => {
    if (gameStateRef.current !== 'playing') return;
    
    clearAllTimers();
    
    generateObjects();
    setPhase("memorize");
    isProcessingRef.current = false;
    
    // Set timer to switch to locate phase based on complexity
    const memorizeTime = levelRef.current <= 3 ? 3000 : 4000;
    memorizationTimerRef.current = setTimeout(() => {
      if (gameStateRef.current === 'playing') {
        setPhase("locate");
      }
    }, memorizeTime);
  };

  const handleCellClick = (index) => {
    if (phase !== "locate" || isProcessingRef.current) return;
    
    isProcessingRef.current = true;
    
    const isCorrect = objectLocations[index] === targetObject;
    
    if (isCorrect) {
      // +1 point for correct answer
      scoreRef.current += 1;
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
        showFeedback(`🔥 ${newStreak} Streak!`, 'success');
      } else {
        showFeedback(`✓ Correct!`, 'success');
      }
      
      setLastResult('correct');
      setShowResult(true);
      
      // Increase level
      levelRef.current += 1;
      setLevel(levelRef.current);
    } else {
      // -1 point for wrong answer
      scoreRef.current = Math.max(0, scoreRef.current - 1);
      setScore(scoreRef.current);
      
      streakRef.current = 0;
      setStreak(0);
      playSound('wrong');
      showFeedback(`✗ Wrong! -1 point`, 'error');
      
      setLastResult('wrong');
      setShowResult(true);
    }
    
    // Move to next round after 1.5 seconds
    resultTimerRef.current = setTimeout(() => {
      if (gameStateRef.current === 'playing') {
        startMemorization();
      }
    }, 1500);
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
    setLastResult(null);
    setShowResult(false);
    
    scoreRef.current = 0;
    streakRef.current = 0;
    levelRef.current = 1;
    isProcessingRef.current = false;
    
    // Clear any existing timers
    clearAllTimers();
    
    startMemorization();
  };

  const resetGame = () => {
    clearAllTimers();
    setGameState('start');
    gameStateRef.current = 'start';
    setScore(0);
    setLevel(1);
    setStreak(0);
    setBestStreak(0);
    setTimeLeft(60);
    setFeedback('');
    setPhase("ready");
    setObjectLocations({});
    setTargetObject("");
    setLastResult(null);
    setShowResult(false);
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

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      clearAllTimers();
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading drill...</p>
        </div>
      </div>
    );
  }

  const currentGridSize = getGridSize();
  const cellStyle = getCellStyle(currentGridSize);

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
              <div className="p-3 bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Object Location</h1>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Remember where objects are placed - 60 seconds</p>
              </div>
            </div>
            
            {/* Control Buttons */}
            <div className="flex gap-2">
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
          <StatCard icon={<Target className="text-emerald-600" />} value={score} label="Score" isDark={isDarkMode} />
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
            background: isBoxDarkMode ? "#020202" : "#ffffff",
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

          <div className="absolute inset-0 flex items-center justify-center p-4 md:p-8">
            {/* Start Screen */}
            {gameState === 'start' && (
              <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
                <div className={`rounded-2xl p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                  <MapPin className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
                  <h3 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Object Location</h3>
                  <p className={`mb-6 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>60-second challenge • Remember object positions</p>
                  <button 
                    onClick={startDrill} 
                    className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-xl font-semibold hover:shadow-lg w-full transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Start Training
                  </button>
                </div>
              </div>
            )}

            {/* Playing Screen */}
            {gameState === 'playing' && (
              <div className="w-full max-w-lg text-center">
                {/* Memorize Phase */}
                {phase === "memorize" && (
                  <div className="space-y-4">
                    <p className={`text-lg md:text-xl mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      Remember the positions
                    </p>
                    <p className={`text-sm ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {Object.keys(objectLocations).length} objects • {currentGridSize}×{currentGridSize} grid
                    </p>
                    <div 
                      className="grid gap-1 md:gap-2 mb-4 mx-auto"
                      style={{ 
                        gridTemplateColumns: `repeat(${currentGridSize}, 1fr)`,
                        maxWidth: currentGridSize <= 4 ? '320px' : currentGridSize <= 5 ? '380px' : '440px'
                      }}
                    >
                      {Array.from({ length: currentGridSize * currentGridSize }, (_, i) => (
                        <div 
                          key={i} 
                          className={`aspect-square rounded-lg md:rounded-xl flex items-center justify-center transition-all ${
                            isBoxDarkMode ? 'bg-gray-800/50' : 'bg-gray-100'
                          }`}
                          style={{
                            minWidth: currentGridSize >= 6 ? '40px' : '48px',
                            minHeight: currentGridSize >= 6 ? '40px' : '48px'
                          }}
                        >
                          <span style={cellStyle}>{objectLocations[i] || ""}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center justify-center gap-2 text-emerald-400">
                      <Clock className="w-5 h-5 animate-pulse" />
                      <span>Memorizing...</span>
                    </div>
                  </div>
                )}

                {/* Locate Phase */}
                {phase === "locate" && (
                  <div className="space-y-4">
                    <p className={`text-lg md:text-xl mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Where was the</p>
                    <p className="text-4xl md:text-5xl mb-4">{targetObject}</p>
                    <div 
                      className="grid gap-1 md:gap-2 mx-auto"
                      style={{ 
                        gridTemplateColumns: `repeat(${currentGridSize}, 1fr)`,
                        maxWidth: currentGridSize <= 4 ? '320px' : currentGridSize <= 5 ? '380px' : '440px'
                      }}
                    >
                      {Array.from({ length: currentGridSize * currentGridSize }, (_, i) => (
                        <button
                          key={i}
                          onClick={() => handleCellClick(i)}
                          disabled={isProcessingRef.current || showResult}
                          className={`aspect-square rounded-lg md:rounded-xl transition-all transform hover:scale-105 active:scale-95 ${
                            isBoxDarkMode 
                              ? 'bg-gray-800/50 hover:bg-gray-700/50' 
                              : 'bg-gray-100 hover:bg-gray-200'
                          } ${
                            showResult && objectLocations[i] === targetObject 
                              ? 'bg-green-500/30 border-2 border-green-500' 
                              : ''
                          }`}
                          style={{
                            minWidth: currentGridSize >= 6 ? '40px' : '48px',
                            minHeight: currentGridSize >= 6 ? '40px' : '48px'
                          }}
                        />
                      ))}
                    </div>
                    {showResult && (
                      <p className={`text-xl md:text-2xl font-bold ${lastResult === 'correct' ? 'text-green-400' : 'text-red-400'}`}>
                        {lastResult === 'correct' ? "Correct! 🎉" : "Wrong location 💪"}
                      </p>
                    )}
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
                    <ResultCard label="Max Objects" value={Math.min(level + 1, 49)} icon={<MapPin className="w-4 h-4" />} color="text-cyan-500" />
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
                      className="flex-1 px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                    >
                      Play Again →
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Rules Section - Below the drill box */}
        {!isFullscreen && (
          <div className="mt-6">
            <div className={`rounded-xl border overflow-hidden ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <div className={`px-4 py-3 border-b ${isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'}`}>
                <div className="flex items-center gap-2">
                  <Info className={`w-4 h-4 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
                  <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Drill Rules & Instructions</h3>
                </div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">1</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Memorize the <span className="font-semibold text-emerald-500">positions of objects</span> on the grid</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">2</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>After memorization, <span className="font-semibold text-green-500">find where the target object was</span></p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-cyan-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">3</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Correct answer: <span className="font-semibold text-cyan-500">+1 point</span></p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">4</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Wrong answer: <span className="font-semibold text-red-500">-1 point</span></p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">5</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Every <span className="font-semibold text-orange-500">5 correct answers</span> = streak bonus notification</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">6</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Challenge lasts <span className="font-semibold text-yellow-500">60 seconds</span> - auto-advancing rounds</p>
                    </div>
                  </div>
                </div>
                <div className={`mt-3 pt-3 border-t text-xs ${isDarkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'} flex items-center justify-between`}>
                  <span>📐 Grid expands: 3×3 → 4×4 → 5×5 → 6×6 → 7×7</span>
                  <span>🔄 Auto-advances 1.5s after answer</span>
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