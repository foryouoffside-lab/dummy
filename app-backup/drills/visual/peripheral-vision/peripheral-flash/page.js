'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useCallback, useRef } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Target, Zap, Clock, Award, Activity, 
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, 
  Eye, AlertCircle, Check, X, Brain, Trophy, Info, Timer
} from 'lucide-react';

export default function PeripheralFlashPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [gameState, setGameState] = useState('start');
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [timeLeft, setTimeLeft] = useState(60);
  const [currentFlash, setCurrentFlash] = useState(null);
  const [correctHits, setCorrectHits] = useState(0);
  const [missedHits, setMissedHits] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [bestReaction, setBestReaction] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isBoxDarkMode, setIsBoxDarkMode] = useState(true);
  
  const gameContainerRef = useRef(null);
  const flashTimeoutRef = useRef(null);
  const gameLoopRef = useRef(null);
  const timerIntervalRef = useRef(null);
  const feedbackTimeoutRef = useRef(null);
  const isActiveRef = useRef(false);
  const gameStateRef = useRef('start');
  const audioCtxRef = useRef(null);
  const streakRef = useRef(0);
  const scoreRef = useRef(0);

  const positions = [
    { angle: 0, name: 'Top', direction: '↑' },
    { angle: 45, name: 'Top-Right', direction: '↗' },
    { angle: 90, name: 'Right', direction: '→' },
    { angle: 135, name: 'Bottom-Right', direction: '↘' },
    { angle: 180, name: 'Bottom', direction: '↓' },
    { angle: 225, name: 'Bottom-Left', direction: '↙' },
    { angle: 270, name: 'Left', direction: '←' },
    { angle: 315, name: 'Top-Left', direction: '↖' }
  ];

  // Load best score from localStorage
  useEffect(() => {
    const savedBestScore = localStorage.getItem('peripheralFlashBestScore');
    if (savedBestScore) {
      setBestScore(parseInt(savedBestScore, 10));
    }
  }, []);

  // Update best score ONLY when game ends
  const updateBestScore = (finalScore) => {
    const currentBestScore = parseInt(localStorage.getItem('peripheralFlashBestScore') || '0', 10);
    if (finalScore > currentBestScore) {
      localStorage.setItem('peripheralFlashBestScore', finalScore.toString());
      setBestScore(finalScore);
    }
  };

  useEffect(() => {
    gameStateRef.current = gameState;
  }, [gameState]);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } else if (status === 'authenticated') {
      setLoading(false);
    }
  }, [status, router]);

  const toggleFullscreen = async () => {
    try {
      if (!isFullscreen) {
        const element = gameContainerRef.current;
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

  const showFeedback = (message, type) => {
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    setFeedback(message);
    setFeedbackType(type);
    feedbackTimeoutRef.current = setTimeout(() => {
      setFeedback('');
      setFeedbackType('');
    }, 400);
  };

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
      } else if (type === 'miss') {
        osc.frequency.value = 330;
        gain.gain.value = 0.1;
      } else if (type === 'levelup') {
        osc.frequency.value = 1046.5;
        gain.gain.value = 0.12;
      } else if (type === 'streak') {
        osc.frequency.value = 1318.5;
        gain.gain.value = 0.12;
      }
      osc.start();
      gain.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 0.12);
      osc.stop(audioCtx.currentTime + 0.12);
    } catch (e) {}
  };

  // Calculate points based on reaction time
  const calculatePoints = (reactionTime) => {
    let points = 10;
    if (reactionTime < 200) points = 40;
    else if (reactionTime < 300) points = 30;
    else if (reactionTime < 400) points = 20;
    
    const streakBonus = Math.floor(streakRef.current / 3) * 5;
    return points + streakBonus;
  };

  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      timerIntervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setGameState('gameOver');
            gameStateRef.current = 'gameOver';
            isActiveRef.current = false;
            if (flashTimeoutRef.current) clearTimeout(flashTimeoutRef.current);
            if (gameLoopRef.current) clearTimeout(gameLoopRef.current);
            
            const total = correctHits + missedHits;
            const finalAccuracy = total === 0 ? 100 : Math.round((correctHits / total) * 100);
            setAccuracy(finalAccuracy);
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
  }, [gameState, timeLeft, correctHits, missedHits]);

  const getFlashDelay = useCallback(() => {
    const baseDelay = 1800 - (level - 1) * 100;
    const variation = (Math.random() - 0.5) * baseDelay * 0.3;
    return Math.max(400, Math.min(2000, baseDelay + variation));
  }, [level]);

  const generateFlash = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * positions.length);
    const position = positions[randomIndex];
    const distanceMultiplier = Math.min(1.4, 0.7 + (level / 12));
    
    return {
      id: Date.now() + Math.random(),
      position,
      x: position.angle === 0 || position.angle === 180 ? 0 : 
         position.angle < 180 ? distanceMultiplier * 50 : -distanceMultiplier * 50,
      y: position.angle === 90 || position.angle === 270 ? 0 : 
         position.angle > 90 && position.angle < 270 ? distanceMultiplier * 50 : -distanceMultiplier * 50,
      startTime: 0,
      duration: Math.max(120, 350 - (level - 1) * 15)
    };
  }, [level]);

  const scheduleNextFlash = () => {
    if (gameState !== 'playing' || !isActiveRef.current) return;
    
    const delay = getFlashDelay();
    gameLoopRef.current = setTimeout(() => {
      showFlash();
    }, delay);
  };

  const showFlash = () => {
    if (gameState !== 'playing' || !isActiveRef.current) return;
    
    const flash = generateFlash();
    setCurrentFlash(flash);
    flash.startTime = Date.now();
    
    flashTimeoutRef.current = setTimeout(() => {
      if (currentFlash && currentFlash.id === flash.id && isActiveRef.current) {
        handleMiss();
        setCurrentFlash(null);
      }
    }, flash.duration);
  };

  const handleMiss = () => {
    if (!isActiveRef.current) return;
    
    const penaltyPoints = calculatePoints(500);
    
    setMissedHits(prev => prev + 1);
    setMistakes(prev => prev + 1);
    streakRef.current = 0;
    setStreak(0);
    const newScore = Math.max(0, scoreRef.current - penaltyPoints);
    scoreRef.current = newScore;
    setScore(newScore);
    showFeedback(`✗ Missed! -${penaltyPoints}`, 'error');
    playSound('miss');
    
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
    
    scheduleNextFlash();
  };

  const handleFlashClick = (direction) => {
    if (!currentFlash || gameState !== 'playing' || !isActiveRef.current) return;
    
    const reactionTime = Date.now() - currentFlash.startTime;
    const isCorrect = direction === currentFlash.position.name;
    
    if (flashTimeoutRef.current) {
      clearTimeout(flashTimeoutRef.current);
    }
    
    if (isCorrect) {
      if (bestReaction === 0 || reactionTime < bestReaction) {
        setBestReaction(reactionTime);
      }
      
      const pointsEarned = calculatePoints(reactionTime);
      scoreRef.current += pointsEarned;
      setScore(scoreRef.current);
      setCorrectHits(prev => prev + 1);
      streakRef.current = streakRef.current + 1;
      setStreak(streakRef.current);
      
      if (streakRef.current > bestStreak) {
        setBestStreak(streakRef.current);
      }
      
      if (streakRef.current % 5 === 0 && streakRef.current > 0) {
        playSound('streak');
        showFeedback(`🔥 ${streakRef.current} Streak! +${pointsEarned}`, 'success');
      } else {
        playSound('correct');
        showFeedback(`✓ ${reactionTime}ms | +${pointsEarned}`, 'success');
      }
      
      if ((correctHits + 1) % 8 === 0 && level < 10) {
        setLevel(prev => prev + 1);
        showFeedback(`🎉 Level ${level + 1}!`, 'success');
        playSound('levelup');
      }
    } else {
      const penaltyPoints = calculatePoints(500);
      
      setMissedHits(prev => prev + 1);
      setMistakes(prev => prev + 1);
      streakRef.current = 0;
      setStreak(0);
      const newScore = Math.max(0, scoreRef.current - penaltyPoints);
      scoreRef.current = newScore;
      setScore(newScore);
      showFeedback(`✗ Wrong! -${penaltyPoints}`, 'error');
      playSound('wrong');
      
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
    
    setCurrentFlash(null);
    scheduleNextFlash();
  };

  const startFlashLoop = () => {
    isActiveRef.current = true;
    scheduleNextFlash();
  };

  useEffect(() => {
    if (gameState === 'playing') {
      startFlashLoop();
      
      return () => {
        isActiveRef.current = false;
        if (flashTimeoutRef.current) clearTimeout(flashTimeoutRef.current);
        if (gameLoopRef.current) clearTimeout(gameLoopRef.current);
      };
    }
  }, [gameState, level]);

  const startGame = () => {
    setGameState('playing');
    gameStateRef.current = 'playing';
    setScore(0);
    setLevel(1);
    setTimeLeft(60);
    setCorrectHits(0);
    setMissedHits(0);
    setMistakes(0);
    setStreak(0);
    setBestStreak(0);
    setBestReaction(0);
    setFeedback('');
    setAccuracy(100);
    setCurrentFlash(null);
    
    streakRef.current = 0;
    scoreRef.current = 0;
    isActiveRef.current = true;
    
    if (flashTimeoutRef.current) clearTimeout(flashTimeoutRef.current);
    if (gameLoopRef.current) clearTimeout(gameLoopRef.current);
  };

  const resetGame = () => {
    isActiveRef.current = false;
    setGameState('start');
    gameStateRef.current = 'start';
    setScore(0);
    setLevel(1);
    setTimeLeft(60);
    setCorrectHits(0);
    setMissedHits(0);
    setMistakes(0);
    setStreak(0);
    setBestStreak(0);
    setBestReaction(0);
    setFeedback('');
    setAccuracy(100);
    setCurrentFlash(null);
    
    if (flashTimeoutRef.current) clearTimeout(flashTimeoutRef.current);
    if (gameLoopRef.current) clearTimeout(gameLoopRef.current);
  };

  const formatTime = (s) => `${s}s`;

  if (loading || status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }
  if (status === 'unauthenticated') return null;

  return (
    <div className={`min-h-screen select-none ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link href="/drills/visual" className={`inline-flex items-center gap-2 mb-4 ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>
            <ArrowLeft className="w-4 h-4" /> Back to Visual Drills
          </Link>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Peripheral Flash</h1>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Click flash direction • Keep eyes on center</p>
              </div>
            </div>
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
          <StatCard icon={<Trophy className="text-yellow-500" />} value={bestScore} label="Best" isDark={isDarkMode} />
          <StatCard icon={<Timer className={timeLeft < 15 ? 'text-red-600' : 'text-green-600'} />} value={timeLeft} label="Time" unit="s" isDark={isDarkMode} />
          <StatCard icon={<Zap className="text-orange-500" />} value={streak} label="Streak" isDark={isDarkMode} />
          <StatCard icon={<Award className="text-purple-500" />} value={bestStreak} label="Best Streak" isDark={isDarkMode} />
          <StatCard icon={<Activity className="text-green-500" />} value={bestReaction || '-'} label="Best RT" unit="ms" isDark={isDarkMode} />
          <StatCard icon={<X className="text-red-500" />} value={`${mistakes}/5`} label="Mistakes" isDark={isDarkMode} />
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
          ref={gameContainerRef}
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
            <>
              <div className="absolute top-4 right-4 z-20 flex gap-3">
                <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 bg-black/50 rounded-lg text-white hover:bg-black/70 transition-all">{isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}</button>
                <button onClick={() => setIsBoxDarkMode(!isBoxDarkMode)} className="p-2 bg-black/50 rounded-lg text-white hover:bg-black/70 transition-all"><Eye className="w-5 h-5" /></button>
                <button onClick={() => setSoundEnabled(!soundEnabled)} className="p-2 bg-black/50 rounded-lg text-white hover:bg-black/70 transition-all">{soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}</button>
                <button onClick={toggleFullscreen} className="p-2 bg3530ack/50 rounded-lg text-white hover:bg-black/70 transition-all"><Minimize2 className="w-5 h-5" /></button>
              </div>
              <div className="absolute top-4 left-4 z-20 bg-black/50 backdrop-blur-sm rounded-lg px-4 py-2 text-white text-sm">
                Score: <span className="text-yellow-400">{score}</span> | Level: <span className="text-purple-400">{level}</span> | Streak: <span className="text-orange-400">{streak}</span>
              </div>
            </>
          )}

          {gameState === 'playing' && (
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Center Focus Dot */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                <div className={`w-6 h-6 rounded-full ${isBoxDarkMode ? 'bg-red-500' : 'bg-red-500'} shadow-lg`}></div>
              </div>
              
              {/* Flash Effect */}
              {currentFlash && (
                <div
                  className="absolute rounded-full animate-ping z-20"
                  style={{
                    left: `calc(50% + ${currentFlash.x}% - 25px)`,
                    top: `calc(50% + ${currentFlash.y}% - 25px)`,
                    width: '50px',
                    height: '50px',
                    background: isBoxDarkMode ? '#00ff88' : '#00cc66',
                    opacity: 0.7
                  }}
                />
              )}
              
              {/* Direction Buttons */}
              <button onClick={() => handleFlashClick('Top')} className="absolute top-4 left-1/2 transform -translate-x-1/2 w-14 h-14 rounded-full bg-gray-700 hover:bg-gray-600 text-white text-xl flex items-center justify-center z-30 transition-all hover:scale-105">↑</button>
              <button onClick={() => handleFlashClick('Top-Right')} className="absolute top-12 right-12 w-14 h-14 rounded-full bg-gray-700 hover:bg-gray-600 text-white text-xl flex items-center justify-center z-30 transition-all hover:scale-105">↗</button>
              <button onClick={() => handleFlashClick('Right')} className="absolute top-1/2 right-4 transform -translate-y-1/2 w-14 h-14 rounded-full bg-gray-700 hover:bg-gray-600 text-white text-xl flex items-center justify-center z-30 transition-all hover:scale-105">→</button>
              <button onClick={() => handleFlashClick('Bottom-Right')} className="absolute bottom-12 right-12 w-14 h-14 rounded-full bg-gray-700 hover:bg-gray-600 text-white text-xl flex items-center justify-center z-30 transition-all hover:scale-105">↘</button>
              <button onClick={() => handleFlashClick('Bottom')} className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-14 h-14 rounded-full bg-gray-700 hover:bg-gray-600 text-white text-xl flex items-center justify-center z-30 transition-all hover:scale-105">↓</button>
              <button onClick={() => handleFlashClick('Bottom-Left')} className="absolute bottom-12 left-12 w-14 h-14 rounded-full bg-gray-700 hover:bg-gray-600 text-white text-xl flex items-center justify-center z-30 transition-all hover:scale-105">↙</button>
              <button onClick={() => handleFlashClick('Left')} className="absolute top-1/2 left-4 transform -translate-y-1/2 w-14 h-14 rounded-full bg-gray-700 hover:bg-gray-600 text-white text-xl flex items-center justify-center z-30 transition-all hover:scale-105">←</button>
              <button onClick={() => handleFlashClick('Top-Left')} className="absolute top-12 left-12 w-14 h-14 rounded-full bg-gray-700 hover:bg-gray-600 text-white text-xl flex items-center justify-center z-30 transition-all hover:scale-105">↖</button>
            </div>
          )}

          {/* Start Screen */}
          {gameState === 'start' && (
            <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
              <div className={`rounded-2xl p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <Eye className="w-16 h-16 text-purple-500 mx-auto mb-4" />
                <h3 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Peripheral Flash</h3>
                <p className={`mb-6 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>60-second challenge • Click flash direction</p>
                <button 
                  onClick={startGame} 
                  className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg w-full transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  Start Training
                </button>
              </div>
            </div>
          )}

          {/* Game Over Screen */}
          {gameState === 'gameOver' && (
            <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
              <div className={`rounded-2xl p-8 shadow-xl border w-[480px] ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <div className="flex items-center justify-center gap-3 mb-6">
                  <Award className="w-10 h-10 text-yellow-500" />
                  <h3 className={`text-2xl font-bold ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Session Complete!</h3>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <ResultCard label="Final Score" value={score} icon={<Target className="w-4 h-4" />} color="text-blue-500" />
                  <ResultCard label="Best Score" value={bestScore} icon={<Trophy className="w-4 h-4" />} color="text-yellow-500" />
                  <ResultCard label="Correct Hits" value={correctHits} icon={<Check className="w-4 h-4" />} color="text-green-500" />
                  <ResultCard label="Best Streak" value={bestStreak} icon={<Zap className="w-4 h-4" />} color="text-orange-500" />
                  <ResultCard label="Best Reaction" value={bestReaction || '-'} unit="ms" icon={<Timer className="w-4 h-4" />} color="text-cyan-500" />
                  <ResultCard label="Accuracy" value={accuracy} unit="%" icon={<Activity className="w-4 h-4" />} color="text-purple-500" />
                  <ResultCard label="Max Level" value={level} icon={<Award className="w-4 h-4" />} color="text-pink-500" />
                  <ResultCard label="Mistakes" value={mistakes} icon={<X className="w-4 h-4" />} color="text-red-500" />
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
                    className="flex-1 px-4 py-2.5 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98]"
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
                  <Info className={`w-4 h-4 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
                  <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Drill Rules & Instructions</h3>
                </div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">1</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-purple-500">Keep eyes on the CENTER dot</span> • Flashes appear in peripheral vision
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">2</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-green-500">Click direction button where flash appears</span> • 8 possible directions
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-cyan-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">3</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-cyan-500">Faster reaction = More points</span> (&lt;200ms: +40, &lt;300ms: +30)
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">4</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-red-500">Penalty = Potential Gain</span> (Wrong/Miss loses what correct would earn)
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">5</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-orange-500">Level up every 8 correct hits</span> • Flashes get faster
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">6</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-yellow-500">5 mistakes reset score</span> • Best Score saves locally
                      </p>
                    </div>
                  </div>
                </div>
                <div className={`mt-3 pt-3 border-t text-xs ${isDarkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'} flex items-center justify-between`}>
                  <span>👁️ Streak bonus: +5 per 3 streak • 5 streak bonus notification</span>
                  <span>⚡ Green flash = Active target</span>
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
  const bgColor = color === 'text-blue-500' ? 'bg-blue-500/10' : 
                   color === 'text-yellow-500' ? 'bg-yellow-500/10' : 
                   color === 'text-green-500' ? 'bg-green-500/10' :
                   color === 'text-orange-500' ? 'bg-orange-500/10' :
                   color === 'text-cyan-500' ? 'bg-cyan-500/10' :
                   color === 'text-purple-500' ? 'bg-purple-500/10' :
                   color === 'text-pink-500' ? 'bg-pink-500/10' : 'bg-red-500/10';
  
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