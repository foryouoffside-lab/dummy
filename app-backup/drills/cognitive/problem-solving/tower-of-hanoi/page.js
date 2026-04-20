'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Layers, Volume2, VolumeX, Maximize2, Minimize2, 
  Sun, Moon, Eye, Timer, Trophy, RotateCcw, Move,
  BarChart3, Info, Zap, Target, Award
} from 'lucide-react';

export default function TowerOfHanoiPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [gameState, setGameState] = useState('start');
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [level, setLevel] = useState(3);
  const [timeRemaining, setTimeRemaining] = useState(60);
  const [towers, setTowers] = useState([[3,2,1], [], []]);
  const [selectedTower, setSelectedTower] = useState(null);
  const [moves, setMoves] = useState(0);
  const [minimumMoves, setMinimumMoves] = useState(7);
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isBoxDarkMode, setIsBoxDarkMode] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [gameComplete, setGameComplete] = useState(false);
  const [bestCombo, setBestCombo] = useState(0);
  const [perfectLevels, setPerfectLevels] = useState(0);
  
  const containerRef = useRef(null);
  const feedbackTimeoutRef = useRef(null);
  const timerIntervalRef = useRef(null);
  const audioContextRef = useRef(null);
  const scoreRef = useRef(0);
  const gameStateRef = useRef('start');

  // Load best score from localStorage on mount
  useEffect(() => {
    const savedBestScore = localStorage.getItem('hanoiDrillBestScore');
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
    if (gameState === 'ended' && score > bestScore) {
      setBestScore(score);
      localStorage.setItem('hanoiDrillBestScore', score.toString());
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
      
      if (type === 'move') {
        osc.frequency.value = 660;
        gain.gain.value = 0.12;
        osc.start();
        gain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 0.1);
        osc.stop(ctx.currentTime + 0.1);
      } else if (type === 'select') {
        osc.frequency.value = 440;
        gain.gain.value = 0.08;
        osc.start();
        gain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 0.08);
        osc.stop(ctx.currentTime + 0.08);
      } else if (type === 'complete') {
        osc.frequency.value = 880;
        gain.gain.value = 0.15;
        osc.start();
        osc.frequency.linearRampToValueAtTime(1320, ctx.currentTime + 0.2);
        gain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 0.3);
        osc.stop(ctx.currentTime + 0.3);
      } else if (type === 'wrong') {
        osc.frequency.value = 220;
        gain.gain.value = 0.1;
        osc.start();
        gain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 0.1);
        osc.stop(ctx.currentTime + 0.1);
      } else if (type === 'perfect') {
        osc.frequency.value = 1046.5;
        gain.gain.value = 0.15;
        osc.start();
        osc.frequency.linearRampToValueAtTime(1568, ctx.currentTime + 0.15);
        gain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 0.25);
        osc.stop(ctx.currentTime + 0.25);
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

  // Calculate minimum moves for current level (2^n - 1)
  const calculateMinimumMoves = (disks) => {
    return Math.pow(2, disks) - 1;
  };

  // Initialize game with given number of disks
  const initializeGame = (diskCount) => {
    const newTowers = [[], [], []];
    for (let i = diskCount; i > 0; i--) {
      newTowers[0].push(i);
    }
    setTowers(newTowers);
    setSelectedTower(null);
    setMoves(0);
    setGameComplete(false);
    setMinimumMoves(calculateMinimumMoves(diskCount));
  };

  // Auto advance to next level
  const advanceToNextLevel = () => {
    if (level < 8) {
      const nextLevel = level + 1;
      setLevel(nextLevel);
      initializeGame(nextLevel);
      setGameComplete(false);
      setMoves(0);
      setSelectedTower(null);
      showFeedback(`Level ${nextLevel}! ${nextLevel} disks`, 'success');
      playSound('complete');
    } else {
      setGameState('ended');
      gameStateRef.current = 'ended';
      showFeedback('🏆 MASTER! All levels complete!', 'success');
    }
  };

  // Calculate score based on move efficiency
  const calculateLevelScore = (diskCount, movesMade) => {
    const minMoves = calculateMinimumMoves(diskCount);
    const maxPoints = 300;
    const minPoints = 50;
    
    if (movesMade === minMoves) {
      return maxPoints;
    }
    
    const extraMoves = movesMade - minMoves;
    const penalty = Math.floor(250 * (1 - Math.exp(-0.4 * extraMoves)));
    const calculatedScore = maxPoints - penalty;
    
    return Math.max(minPoints, calculatedScore);
  };

  // Get score breakdown for feedback
  const getScoreBreakdown = (diskCount, movesMade) => {
    const minMoves = calculateMinimumMoves(diskCount);
    if (movesMade === minMoves) {
      return { points: 300, message: 'PERFECT!' };
    }
    
    const points = calculateLevelScore(diskCount, movesMade);
    const extraMoves = movesMade - minMoves;
    
    if (extraMoves <= 3) {
      return { points, message: `Good! (+${extraMoves} moves)` };
    } else if (extraMoves <= 8) {
      return { points, message: `Okay (+${extraMoves} moves)` };
    } else {
      return { points, message: `Poor efficiency` };
    }
  };

  // Check if game is complete (all disks on last tower)
  const checkGameComplete = (currentTowers) => {
    if (currentTowers[2].length === level) {
      setGameComplete(true);
      
      const { points: pointsEarned, message } = getScoreBreakdown(level, moves);
      scoreRef.current += pointsEarned;
      setScore(scoreRef.current);
      
      if (moves === minimumMoves) {
        setPerfectLevels(prev => prev + 1);
        setBestCombo(prev => Math.max(prev, level));
        playSound('perfect');
        showFeedback(`🎯 PERFECT! +${pointsEarned} points!`, 'success');
      } else {
        playSound('complete');
        showFeedback(`✓ ${message} +${pointsEarned}`, 'success');
      }
      
      setTimeout(() => {
        advanceToNextLevel();
      }, 1500);
      
      return true;
    }
    return false;
  };

  // Handle tower click
  const handleTowerClick = (towerIndex) => {
    if (gameComplete || gameStateRef.current !== 'playing') return;
    
    if (selectedTower === null) {
      if (towers[towerIndex].length > 0) {
        setSelectedTower(towerIndex);
        playSound('select');
      }
      return;
    }
    
    const fromTower = selectedTower;
    const toTower = towerIndex;
    
    if (fromTower === toTower) {
      setSelectedTower(null);
      return;
    }
    
    const fromDisk = towers[fromTower][towers[fromTower].length - 1];
    const toDisk = towers[toTower][towers[toTower].length - 1];
    
    if (fromDisk && (!toDisk || fromDisk < toDisk)) {
      const newTowers = [...towers];
      const disk = newTowers[fromTower].pop();
      newTowers[toTower].push(disk);
      setTowers(newTowers);
      setMoves(prev => prev + 1);
      setSelectedTower(null);
      playSound('move');
      
      checkGameComplete(newTowers);
    } else {
      scoreRef.current = Math.max(0, scoreRef.current - 10);
      setScore(scoreRef.current);
      showFeedback('✗ Invalid move! -10', 'error');
      playSound('wrong');
      setSelectedTower(null);
    }
  };

  useEffect(() => {
    if (gameState === 'playing') {
      initializeGame(level);
    }
  }, [gameState, level]);

  const resetGame = () => {
    initializeGame(level);
    setMoves(0);
    setGameComplete(false);
    setSelectedTower(null);
  };

  const startGame = () => {
    setGameState('playing');
    gameStateRef.current = 'playing';
    setScore(0);
    setLevel(3);
    setTimeRemaining(60);
    setMoves(0);
    setGameComplete(false);
    setPerfectLevels(0);
    setBestCombo(0);
    setFeedback('');
    
    scoreRef.current = 0;
    
    initializeGame(3);
    playSound('select');
  };

  const getDiskColor = (diskSize) => {
    const colors = [
      'bg-red-500', 'bg-orange-500', 'bg-yellow-500', 
      'bg-green-500', 'bg-blue-500', 'bg-indigo-500', 
      'bg-purple-500', 'bg-pink-500'
    ];
    return colors[(diskSize - 1) % colors.length];
  };

  const getDiskWidth = (diskSize, maxDisks) => {
    const maxWidth = 140;
    const minWidth = 40;
    const width = minWidth + ((diskSize - 1) / (maxDisks - 1)) * (maxWidth - minWidth);
    return `${width}px`;
  };

  const getEfficiency = () => {
    if (moves === 0) return 100;
    const efficiency = (minimumMoves / moves) * 100;
    return Math.min(100, Math.round(efficiency));
  };

  // Show loading state
  if (loading || status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading drill...</p>
        </div>
      </div>
    );
  }

  if (status === 'unauthenticated') return null;

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
              <div className="p-3 bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl">
                <Layers className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Tower of Hanoi</h1>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Move all disks to rightmost tower • 60s</p>
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
          <StatCard icon={<Layers className="text-purple-500" />} value={level} label="Disks" isDark={isDarkMode} />
          <StatCard icon={<Move className="text-orange-500" />} value={`${moves}/${minimumMoves}`} label="Moves" isDark={isDarkMode} />
          <StatCard icon={<BarChart3 className="text-emerald-600" />} value={getEfficiency()} label="Efficiency" unit="%" isDark={isDarkMode} />
          <StatCard icon={<Award className="text-amber-600" />} value={perfectLevels} label="Perfect" isDark={isDarkMode} />
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
                  <Layers className="w-16 h-16 text-amber-500 mx-auto mb-4" />
                  <h3 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Tower of Hanoi</h3>
                  <p className={`mb-6 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>60-second challenge • 3 → 8 disks</p>
                  <button 
                    onClick={startGame}
                    className="px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-xl font-semibold hover:shadow-lg w-full transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Start Drill
                  </button>
                </div>
              </div>
            )}

            {/* Playing Screen - Towers */}
            {gameState === 'playing' && (
              <div className="w-full">
                <div className="flex justify-around items-end">
                  {[0, 1, 2].map((towerIdx) => (
                    <div 
                      key={towerIdx} 
                      onClick={() => handleTowerClick(towerIdx)}
                      className={`flex flex-col items-center cursor-pointer transition-all duration-200 ${selectedTower === towerIdx ? 'transform scale-105' : ''} hover:scale-102`}
                    >
                      <div className="relative flex flex-col items-center">
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3 rounded-t-full z-0"
                             style={{ height: `${level * 32 + 20}px`, background: isBoxDarkMode ? 'linear-gradient(135deg, #4a4a4a 0%, #2a2a2a 100%)' : 'linear-gradient(135deg, #9ca3af 0%, #6b7280 100%)' }} />
                        <div className="flex flex-col-reverse items-center mb-2 relative z-10">
                          {towers[towerIdx].map((disk, diskIdx) => (
                            <div 
                              key={diskIdx} 
                              className={`${getDiskColor(disk)} rounded-lg mb-0.5 transition-all duration-300 shadow-lg`}
                              style={{ width: getDiskWidth(disk, level), height: '28px', border: isBoxDarkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)' }} 
                            />
                          ))}
                        </div>
                      </div>
                      <div className="w-40 h-2.5 rounded-full mt-1"
                           style={{ background: isBoxDarkMode ? 'linear-gradient(135deg, #3a3a3a 0%, #1a1a1a 100%)' : 'linear-gradient(135deg, #d1d5db 0%, #9ca3af 100%)' }} />
                      <div className={`mt-3 text-sm font-medium ${selectedTower === towerIdx ? 'text-orange-500' : isBoxDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        Tower {towerIdx + 1}{selectedTower === towerIdx && ' ▼'}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-center gap-4 mt-8">
                  <button 
                    onClick={resetGame} 
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition hover:scale-105 active:scale-95 ${isBoxDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                  >
                    <RotateCcw className="w-4 h-4" /> Reset Level
                  </button>
                </div>
              </div>
            )}

            {/* Game Over Screen */}
            {gameState === 'ended' && (
              <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
                <div className={`rounded-2xl p-8 shadow-xl border w-[480px] ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                  <div className="flex items-center justify-center gap-3 mb-6">
                    <Trophy className="w-10 h-10 text-yellow-500" />
                    <h3 className={`text-2xl font-bold ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {level >= 8 ? 'MASTER!' : "Time's Up!"}
                    </h3>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <ResultCard label="Final Score" value={score} icon={<Target className="w-4 h-4" />} color="text-yellow-500" />
                    <ResultCard label="Best Score" value={bestScore} icon={<Trophy className="w-4 h-4" />} color="text-yellow-500" />
                    <ResultCard label="Max Disks" value={level} icon={<Layers className="w-4 h-4" />} color="text-purple-500" />
                    <ResultCard label="Perfect Levels" value={perfectLevels} icon={<Award className="w-4 h-4" />} color="text-amber-500" />
                    <ResultCard label="Total Moves" value={moves} icon={<Move className="w-4 h-4" />} color="text-orange-500" />
                    <ResultCard label="Efficiency" value={`${getEfficiency()}%`} icon={<BarChart3 className="w-4 h-4" />} color="text-green-500" />
                    <ResultCard label="Best Combo" value={bestCombo} icon={<Zap className="w-4 h-4" />} color="text-blue-500" />
                  </div>
                  
                  <div className="flex gap-4">
                    <Link href="/drills/cognitive" className="flex-1">
                      <button className={`w-full px-4 py-2.5 rounded-lg font-semibold transition-all ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                        ← Back
                      </button>
                    </Link>
                    <button 
                      onClick={startGame}
                      className="flex-1 px-4 py-2.5 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <RotateCcw className="w-4 h-4 inline mr-2" /> Play Again
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
                  <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Drill Rules & Scoring</h3>
                </div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">1</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Move all disks from <span className="font-semibold text-amber-500">Tower 1 to Tower 3</span></p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">2</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Perfect (min moves): <span className="font-semibold text-green-500">300 points</span></p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">3</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Invalid move: <span className="font-semibold text-red-500">-10 points</span></p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">4</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Score <span className="font-semibold text-blue-500">decreases with extra moves</span> (min 50)</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">5</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Auto-advances: 3 → 4 → ... → <span className="font-semibold text-purple-500">8 disks</span></p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">6</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Never place larger disk on <span className="font-semibold text-yellow-500">smaller disk</span></p>
                    </div>
                  </div>
                </div>
                <div className={`mt-3 pt-3 border-t text-xs ${isDarkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'} flex items-center justify-between`}>
                  <span>🎯 Min moves: 3→7, 4→15, 5→31, 6→63, 7→127, 8→255</span>
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
                   color === 'text-orange-500' ? 'bg-orange-500/10' :
                   color === 'text-green-500' ? 'bg-green-500/10' : 'bg-blue-500/10';
  
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