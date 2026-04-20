'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Zap, Clock, Award, Activity, 
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, 
  Eye, Timer, Brain, Target, Trophy, X, Info, Check
} from 'lucide-react';

export default function PeripheralAwarenessPage() {
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);
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
  const [mistakes, setMistakes] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  
  // Flash state
  const [currentChar, setCurrentChar] = useState('A');
  const [isFlashing, setIsFlashing] = useState(false);
  const [flashPosition, setFlashPosition] = useState({ top: '20%', left: '20%' });
  const [isRecallMode, setIsRecallMode] = useState(false);
  const [recallInput, setRecallInput] = useState('');
  const [flashHistory, setFlashHistory] = useState([]);
  const [recallResults, setRecallResults] = useState([]);
  const [totalFlashes, setTotalFlashes] = useState(0);
  
  const streakRef = useRef(0);
  const scoreRef = useRef(0);
  const flashTimeoutRef = useRef(null);
  const cycleTimeoutRef = useRef(null);
  const timerIntervalRef = useRef(null);
  const feedbackTimeoutRef = useRef(null);
  const isActiveRef = useRef(false);
  const gameStateRef = useRef('start');
  const audioCtxRef = useRef(null);
  const flashHistoryRef = useRef([]);
  const isRecallActiveRef = useRef(false);
  
  const positions = [
    { name: 'top-left', top: '12%', left: '12%' },
    { name: 'top-right', top: '12%', left: '88%', transform: 'translateX(-100%)' },
    { name: 'bottom-left', top: '88%', left: '12%', transform: 'translateY(-100%)' },
    { name: 'bottom-right', top: '88%', left: '88%', transform: 'translate(-100%, -100%)' }
  ];
  
  const characters = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

  // Load best score from localStorage
  useEffect(() => {
    const savedBestScore = localStorage.getItem('peripheralAwarenessBestScore');
    if (savedBestScore) {
      setBestScore(parseInt(savedBestScore, 10));
    }
  }, []);

  // Update best score ONLY when game ends
  const updateBestScore = (finalScore) => {
    const currentBestScore = parseInt(localStorage.getItem('peripheralAwarenessBestScore') || '0', 10);
    if (finalScore > currentBestScore) {
      localStorage.setItem('peripheralAwarenessBestScore', finalScore.toString());
      setBestScore(finalScore);
    }
  };

  useEffect(() => {
    gameStateRef.current = gameState;
  }, [gameState]);

  useEffect(() => {
    } else if (status === 'authenticated') {
      setLoading(false);
    }
  }, [status, router]);

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
        gain.gain.value = 0.1;
      } else if (type === 'miss') {
        osc.frequency.value = 440;
        gain.gain.value = 0.08;
      } else if (type === 'streak') {
        osc.frequency.value = 1046.5;
        gain.gain.value = 0.1;
      } else if (type === 'recall') {
        osc.frequency.value = 660;
        gain.gain.value = 0.08;
      }
      osc.start();
      gain.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 0.12);
      osc.stop(audioCtx.currentTime + 0.12);
    } catch (e) {}
  };

  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      timerIntervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setGameState('gameOver');
            gameStateRef.current = 'gameOver';
            isActiveRef.current = false;
            isRecallActiveRef.current = false;
            if (flashTimeoutRef.current) clearTimeout(flashTimeoutRef.current);
            if (cycleTimeoutRef.current) clearTimeout(cycleTimeoutRef.current);
            
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

  const continueFlashing = () => {
    if (gameStateRef.current !== 'playing' || !isActiveRef.current) return;
    if (isRecallActiveRef.current) return;
    
    if (cycleTimeoutRef.current) clearTimeout(cycleTimeoutRef.current);
    cycleTimeoutRef.current = setTimeout(() => {
      flashCharacter();
    }, 400);
  };

  const startRecallMode = () => {
    if (!isActiveRef.current) return;
    
    isRecallActiveRef.current = true;
    setIsRecallMode(true);
    setRecallInput('');
    setRecallResults([]);
    playSound('recall');
    
    // Focus on input
    setTimeout(() => {
      const input = document.getElementById('recall-input');
      if (input) input.focus();
    }, 100);
  };

  const closeRecallAndContinue = () => {
    isRecallActiveRef.current = false;
    setIsRecallMode(false);
    setRecallResults([]);
    
    // Continue the game
    if (isActiveRef.current && gameStateRef.current === 'playing') {
      continueFlashing();
    }
  };

  const checkRecallAnswer = () => {
    const correctChars = flashHistoryRef.current.slice(-3).map(f => f.char);
    const userChars = recallInput.toUpperCase().split('');
    
    const results = correctChars.map((char, idx) => ({
      correct: char,
      user: userChars[idx] || '',
      isCorrect: userChars[idx] === char
    }));
    
    setRecallResults(results);
    
    const allCorrect = results.every(r => r.isCorrect) && userChars.length === 3;
    const correctCount = results.filter(r => r.isCorrect).length;
    
    if (allCorrect) {
      // All 3 correct - big bonus
      const pointsEarned = 150 + streakRef.current * 10;
      scoreRef.current += pointsEarned;
      setScore(scoreRef.current);
      
      const newStreak = streakRef.current + 1;
      streakRef.current = newStreak;
      setStreak(newStreak);
      
      if (newStreak > bestStreak) {
        setBestStreak(newStreak);
      }
      
      if (newStreak % 5 === 0 && newStreak > 0) {
        playSound('streak');
      } else {
        playSound('correct');
      }
      showFeedback(`🎉 Perfect Recall! +${pointsEarned}`, 'success');
    } else if (correctCount >= 1) {
      // Partial credit
      const pointsEarned = 30 * correctCount + streakRef.current * 5;
      scoreRef.current += pointsEarned;
      setScore(scoreRef.current);
      
      streakRef.current = 0;
      setStreak(0);
      setMistakes(prev => prev + 1);
      
      playSound('correct');
      showFeedback(`✓ ${correctCount}/3 correct! +${pointsEarned}`, 'success');
      
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
    } else {
      // All wrong - penalty
      const penaltyPoints = 100 + streakRef.current * 10;
      scoreRef.current = Math.max(0, scoreRef.current - penaltyPoints);
      setScore(scoreRef.current);
      
      streakRef.current = 0;
      setStreak(0);
      setMistakes(prev => prev + 1);
      
      playSound('miss');
      showFeedback(`✗ Incorrect! -${penaltyPoints}`, 'error');
      
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
    
    // Close recall mode and continue after delay
    setTimeout(() => {
      closeRecallAndContinue();
    }, 1500);
  };

  const handleRecallKeyPress = (e) => {
    if (e.key === 'Enter') {
      checkRecallAnswer();
    }
  };

  const flashCharacter = () => {
    if (gameStateRef.current !== 'playing' || !isActiveRef.current) return;
    if (isRecallActiveRef.current) return;
    
    const pos = positions[Math.floor(Math.random() * positions.length)];
    const char = characters[Math.floor(Math.random() * characters.length)];
    
    setFlashPosition(pos);
    setCurrentChar(char);
    setIsFlashing(true);
    
    // Add to history (keep last 10)
    const flashData = { char, pos: pos.name, timestamp: Date.now() };
    flashHistoryRef.current.push(flashData);
    if (flashHistoryRef.current.length > 10) {
      flashHistoryRef.current.shift();
    }
    setFlashHistory([...flashHistoryRef.current]);
    
    const newTotal = totalFlashes + 1;
    setTotalFlashes(newTotal);
    
    if (flashTimeoutRef.current) clearTimeout(flashTimeoutRef.current);
    
    flashTimeoutRef.current = setTimeout(() => {
      setIsFlashing(false);
      
      // Random chance to trigger recall (15% chance after having at least 3 flashes)
      const shouldRecall = flashHistoryRef.current.length >= 3 && Math.random() < 0.15;
      
      if (shouldRecall && !isRecallActiveRef.current) {
        startRecallMode();
      } else if (!isRecallActiveRef.current) {
        // Continue flashing
        continueFlashing();
      }
    }, 400);
  };

  const startGame = () => {
    setGameState('playing');
    gameStateRef.current = 'playing';
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setTimeLeft(60);
    setMistakes(0);
    setFeedback('');
    setIsFlashing(false);
    setIsRecallMode(false);
    setRecallInput('');
    setFlashHistory([]);
    setRecallResults([]);
    setTotalFlashes(0);
    
    streakRef.current = 0;
    scoreRef.current = 0;
    flashHistoryRef.current = [];
    isActiveRef.current = true;
    isRecallActiveRef.current = false;
    
    if (flashTimeoutRef.current) clearTimeout(flashTimeoutRef.current);
    if (cycleTimeoutRef.current) clearTimeout(cycleTimeoutRef.current);
    
    setTimeout(() => {
      if (isActiveRef.current && gameStateRef.current === 'playing') {
        flashCharacter();
      }
    }, 300);
  };

  const resetGame = () => {
    isActiveRef.current = false;
    isRecallActiveRef.current = false;
    setGameState('start');
    gameStateRef.current = 'start';
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setTimeLeft(60);
    setMistakes(0);
    setFeedback('');
    setIsFlashing(false);
    setIsRecallMode(false);
    setRecallInput('');
    setFlashHistory([]);
    setRecallResults([]);
    setTotalFlashes(0);
    
    flashHistoryRef.current = [];
    
    if (flashTimeoutRef.current) clearTimeout(flashTimeoutRef.current);
    if (cycleTimeoutRef.current) clearTimeout(cycleTimeoutRef.current);
  };

  useEffect(() => {
    return () => {
      if (flashTimeoutRef.current) clearTimeout(flashTimeoutRef.current);
      if (cycleTimeoutRef.current) clearTimeout(cycleTimeoutRef.current);
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, []);

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
                <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Peripheral Awareness</h1>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Random recall • Memory challenge</p>
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
        <div className="grid grid-cols-6 gap-3 mb-4 h-[88px]">
          <StatCard icon={<Target className="text-blue-600" />} value={score} label="Score" isDark={isDarkMode} />
          <StatCard icon={<Trophy className="text-yellow-500" />} value={bestScore} label="Best" isDark={isDarkMode} />
          <StatCard icon={<Timer className={timeLeft < 15 ? 'text-red-600' : 'text-green-600'} />} value={timeLeft} label="Time" unit="s" isDark={isDarkMode} />
          <StatCard icon={<Zap className="text-orange-500" />} value={streak} label="Streak" isDark={isDarkMode} />
          <StatCard icon={<Eye className="text-cyan-500" />} value={totalFlashes} label="Flashes" isDark={isDarkMode} />
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
            <>
              <div className="absolute top-4 right-4 z-30 flex gap-3">
                <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 bg-black/50 rounded-lg text-white hover:bg-black/70 transition-all">{isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}</button>
                <button onClick={() => setIsBoxDarkMode(!isBoxDarkMode)} className="p-2 bg-black/50 rounded-lg text-white hover:bg-black/70 transition-all"><Eye className="w-5 h-5" /></button>
                <button onClick={() => setSoundEnabled(!soundEnabled)} className="p-2 bg-black/50 rounded-lg text-white hover:bg-black/70 transition-all">{soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}</button>
                <button onClick={toggleFullscreen} className="p-2 bg-black/50 rounded-lg text-white hover:bg-black/70 transition-all"><Minimize2 className="w-5 h-5" /></button>
              </div>
              <div className="absolute top-4 left-4 z-30 bg-black/50 backdrop-blur-sm rounded-lg px-4 py-2 text-white text-sm">
                Score: <span className="text-yellow-400">{score}</span> | Flashes: <span className="text-cyan-400">{totalFlashes}</span> | Streak: <span className="text-orange-400">{streak}</span>
              </div>
            </>
          )}

          {/* Central Fixation Crosshair */}
          <div 
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: '40px',
              color: isBoxDarkMode ? '#ffffff' : '#000000',
              fontFamily: 'monospace',
              userSelect: 'none',
              pointerEvents: 'none',
              zIndex: 10,
              opacity: 0.7
            }}
          >
            +
          </div>

          {/* Peripheral Flash Target */}
          {!isRecallMode && (
            <div 
              style={{
                position: 'absolute',
                fontFamily: 'monospace',
                fontSize: '80px',
                fontWeight: 'bold',
                color: isBoxDarkMode ? '#00ff88' : '#00cc66',
                userSelect: 'none',
                pointerEvents: 'none',
                zIndex: 20,
                textShadow: isBoxDarkMode ? '0 0 30px rgba(0,255,136,0.6)' : 'none',
                opacity: isFlashing ? 1 : 0,
                transition: 'opacity 0.05s',
                ...flashPosition
              }}
            >
              {currentChar}
            </div>
          )}

          {/* Recall Mode */}
          {isRecallMode && recallResults.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-40">
              <div className={`rounded-2xl p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <Brain className="w-12 h-12 text-purple-500 mx-auto mb-3" />
                <h3 className={`text-xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Recall Last 3 Characters</h3>
                <p className={`mb-4 text-sm ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Enter the last 3 characters in order</p>
                <input
                  id="recall-input"
                  type="text"
                  value={recallInput}
                  onChange={(e) => setRecallInput(e.target.value.toUpperCase())}
                  onKeyPress={handleRecallKeyPress}
                  maxLength={3}
                  className={`w-full px-4 py-3 text-center text-2xl font-mono tracking-widest rounded-xl border outline-none ${
                    isBoxDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-gray-100 border-gray-300 text-gray-900'
                  }`}
                  placeholder="___"
                  autoFocus
                />
                <button
                  onClick={checkRecallAnswer}
                  className="mt-4 px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                >
                  Submit
                </button>
              </div>
            </div>
          )}

          {/* Recall Results */}
          {isRecallMode && recallResults.length > 0 && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-40">
              <div className={`rounded-2xl p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <h3 className={`text-xl font-bold mb-4 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Results</h3>
                <div className="flex justify-center gap-6 mb-4">
                  {recallResults.map((result, idx) => (
                    <div key={idx} className="text-center">
                      <div className={`text-3xl font-mono font-bold ${result.isCorrect ? 'text-green-500' : 'text-red-500'}`}>
                        {result.correct}
                      </div>
                      <div className={`text-lg font-mono ${result.isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                        {result.user || '—'}
                      </div>
                    </div>
                  ))}
                </div>
                <p className={`text-sm mb-4 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {recallResults.filter(r => r.isCorrect).length}/3 correct
                </p>
                <button
                  onClick={closeRecallAndContinue}
                  className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* Start Screen */}
          {gameState === 'start' && (
            <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
              <div className={`rounded-2xl p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <Eye className="w-16 h-16 text-purple-500 mx-auto mb-4" />
                <h3 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Peripheral Awareness</h3>
                <p className={`mb-6 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>60-second challenge • Random recall questions</p>
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
                  <ResultCard label="Best Streak" value={bestStreak} icon={<Zap className="w-4 h-4" />} color="text-orange-500" />
                  <ResultCard label="Total Flashes" value={totalFlashes} icon={<Eye className="w-4 h-4" />} color="text-cyan-500" />
                  <ResultCard label="Mistakes" value={mistakes} icon={<X className="w-4 h-4" />} color="text-red-500" />
                  <ResultCard label="Accuracy" value={totalFlashes > 0 ? Math.round((totalFlashes - mistakes * 3) / totalFlashes * 100) : 0} unit="%" icon={<Activity className="w-4 h-4" />} color="text-purple-500" />
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
                        <span className="font-semibold text-purple-500">Focus on center +</span> • Characters flash in peripheral corners
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">2</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-green-500">Random recall questions</span> • 15% chance after each flash (min 3 flashes)
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-cyan-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">3</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-cyan-500">Perfect recall (3/3): +150 + streak bonus</span> • Maintains streak
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">4</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-yellow-500">Partial recall: +30 per correct</span> • Resets streak
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">5</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-red-500">All wrong: -100 - streak bonus</span> • Resets streak
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">6</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-orange-500">5 mistakes reset score</span> • Best Score saves locally
                      </p>
                    </div>
                  </div>
                </div>
                <div className={`mt-3 pt-3 border-t text-xs ${isDarkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'} flex items-center justify-between`}>
                  <span>👁️ 400ms flash duration • Streak bonus: +10 per streak level</span>
                  <span>⚡ Game continues after recall • Click Continue or wait</span>
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
                   color === 'text-orange-500' ? 'bg-orange-500/10' :
                   color === 'text-cyan-500' ? 'bg-cyan-500/10' :
                   color === 'text-red-500' ? 'bg-red-500/10' : 'bg-purple-500/10';
  
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