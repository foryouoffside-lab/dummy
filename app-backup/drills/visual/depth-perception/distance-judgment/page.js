'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  Eye, Zap, Clock, Award, Volume2, VolumeX, Sun, Moon, 
  Target, MoveVertical, ShieldCheck, Activity, Maximize2, Minimize2,
  ArrowLeft, Timer, X, Trophy, Info, TrendingUp
} from 'lucide-react';

export default function DistanceJudgmentDrill() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const containerRef = useRef(null);
  
  // Drill State
  const [gameState, setGameState] = useState('start');
  const [targetDepth, setTargetDepth] = useState(50);
  const [currentZ, setCurrentZ] = useState(0);
  const [roundState, setRoundState] = useState('idle'); // idle, approaching, results
  
  // Performance Metrics
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [totalDeviation, setTotalDeviation] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [perfectHits, setPerfectHits] = useState(0);
  const [closeHits, setCloseHits] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [mistakes, setMistakes] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [feedbackMsg, setFeedbackMsg] = useState('');
  const [feedbackType, setFeedbackType] = useState('');

  // UI State
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isBoxDarkMode, setIsBoxDarkMode] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  const requestRef = useRef();
  const lastTimeRef = useRef();
  const timerIntervalRef = useRef(null);
  const feedbackTimeoutRef = useRef(null);
  const isActiveRef = useRef(false);
  const gameStateRef = useRef('start');
  const scoreRef = useRef(0);
  const audioCtxRef = useRef(null);

  // Load best score from localStorage
  useEffect(() => {
    const savedBestScore = localStorage.getItem('distanceJudgmentBestScore');
    if (savedBestScore) {
      setBestScore(parseInt(savedBestScore, 10));
    }
  }, []);

  // Update best score ONLY when game ends
  const updateBestScore = (finalScore) => {
    const currentBestScore = parseInt(localStorage.getItem('distanceJudgmentBestScore') || '0', 10);
    if (finalScore > currentBestScore) {
      localStorage.setItem('distanceJudgmentBestScore', finalScore.toString());
      setBestScore(finalScore);
    }
  };

  useEffect(() => {
    gameStateRef.current = gameState;
  }, [gameState]);

  // Check authentication
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
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
    setFeedbackMsg(message);
    setFeedbackType(type);
    feedbackTimeoutRef.current = setTimeout(() => {
      setFeedbackMsg('');
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
      
      if (type === 'perfect') {
        osc.frequency.value = 880;
        gain.gain.value = 0.12;
      } else if (type === 'close') {
        osc.frequency.value = 440;
        gain.gain.value = 0.1;
      } else if (type === 'far') {
        osc.frequency.value = 220;
        gain.gain.value = 0.1;
      } else if (type === 'streak') {
        osc.frequency.value = 1046.5;
        gain.gain.value = 0.12;
      }
      osc.start();
      gain.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 0.2);
      osc.stop(audioCtx.currentTime + 0.2);
    } catch (e) {}
  };

  // Calculate points based on deviation
  const calculatePoints = (deviation) => {
    if (deviation < 2) return 500;
    if (deviation < 7) return 200;
    return 50;
  };

  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      timerIntervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setGameState('gameOver');
            gameStateRef.current = 'gameOver';
            isActiveRef.current = false;
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
            
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

  const animateApproach = useCallback((time) => {
    if (!isActiveRef.current) return;
    
    if (lastTimeRef.current !== undefined) {
      const deltaTime = time - lastTimeRef.current;
      const speed = 0.015 + (level * 0.005);
      
      setCurrentZ(prev => {
        const next = prev + speed * deltaTime;
        if (next >= 100) {
          handleAutoFail();
          return 0;
        }
        return next;
      });
    }
    lastTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animateApproach);
  }, [level]);

  const startTrial = () => {
    if (!isActiveRef.current) return;
    setRoundState('approaching');
    setTargetDepth(30 + Math.random() * 50);
    setCurrentZ(0);
    setFeedback(null);
    lastTimeRef.current = undefined;
    requestRef.current = requestAnimationFrame(animateApproach);
  };

  const handleCapture = () => {
    if (!isActiveRef.current) return;
    cancelAnimationFrame(requestRef.current);
    
    const deviation = Math.abs(currentZ - targetDepth);
    setTotalDeviation(prev => prev + deviation);
    setAttempts(prev => prev + 1);

    const pointsEarned = calculatePoints(deviation);
    scoreRef.current += pointsEarned;
    setScore(scoreRef.current);
    
    if (deviation < 2) {
      setFeedback('perfect');
      setPerfectHits(prev => prev + 1);
      playSound('perfect');
      showFeedback(`✓ PERFECT! +${pointsEarned}`, 'success');
    } else if (deviation < 7) {
      setFeedback('close');
      setCloseHits(prev => prev + 1);
      playSound('close');
      showFeedback(`✓ CLOSE! +${pointsEarned}`, 'success');
    } else {
      setFeedback('far');
      setMistakes(prev => prev + 1);
      playSound('far');
      showFeedback(`✗ FAR! +${pointsEarned}`, 'error');
      
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

    setRoundState('results');
    
    const acc = attempts > 0 ? ((perfectHits + closeHits) / (attempts + 1)) * 100 : 100;
    setAccuracy(Math.round(acc));
    
    if (attempts > 0 && (attempts + 1) % 3 === 0) {
      setLevel(prev => prev + 1);
      showFeedback(`⭐ Level ${level + 1}!`, 'success');
    }
  };

  const handleAutoFail = () => {
    if (!isActiveRef.current) return;
    cancelAnimationFrame(requestRef.current);
    
    setFeedback('far');
    setAttempts(prev => prev + 1);
    setMistakes(prev => prev + 1);
    setRoundState('results');
    playSound('far');
    showFeedback('✗ TIMEOUT!', 'error');
    
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
  };

  const startGame = () => {
    setGameState('playing');
    gameStateRef.current = 'playing';
    setScore(0);
    setAttempts(0);
    setTotalDeviation(0);
    setLevel(1);
    setPerfectHits(0);
    setCloseHits(0);
    setTimeLeft(60);
    setMistakes(0);
    setAccuracy(100);
    setFeedbackMsg('');
    
    isActiveRef.current = true;
    scoreRef.current = 0;
    
    startTrial();
  };

  const resetGame = () => {
    isActiveRef.current = false;
    setGameState('start');
    gameStateRef.current = 'start';
    setRoundState('idle');
    if (requestRef.current) cancelAnimationFrame(requestRef.current);
    setScore(0);
    setAttempts(0);
    setTotalDeviation(0);
    setLevel(1);
    setPerfectHits(0);
    setCloseHits(0);
    setTimeLeft(60);
    setMistakes(0);
    setAccuracy(100);
  };

  const formatTime = (s) => `${s}s`;

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-rose-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
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
            <ArrowLeft className="w-4 h-4" />
            Back to Cognitive Drills
          </Link>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-rose-500 to-pink-600 rounded-xl">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Distance Judgment Lab</h1>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Depth interception • Visual scale estimation</p>
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
          <StatCard icon={<TrendingUp className="text-purple-500" />} value={level} label="Level" isDark={isDarkMode} />
          <StatCard icon={<Award className="text-green-500" />} value={perfectHits} label="Perfect" isDark={isDarkMode} />
          <StatCard icon={<Activity className="text-cyan-500" />} value={closeHits} label="Close" isDark={isDarkMode} />
          <StatCard icon={<X className="text-red-500" />} value={`${mistakes}/5`} label="Mistakes" isDark={isDarkMode} />
        </div>

        {/* Feedback Bar */}
        <div className="h-8 mb-2 flex justify-center items-center">
          <div className={`px-4 py-1 rounded-lg text-white font-medium text-sm transition-opacity duration-150 ${feedbackMsg ? 'opacity-100' : 'opacity-0'} ${
            feedbackType === 'success' ? 'bg-green-500' : feedbackType === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
          }`}>
            {feedbackMsg || 'placeholder'}
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
              <div className="absolute top-4 right-4 z-20 flex gap-3">
                <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 bg-black/50 rounded-lg text-white hover:bg-black/70 transition-all">{isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}</button>
                <button onClick={() => setIsBoxDarkMode(!isBoxDarkMode)} className="p-2 bg-black/50 rounded-lg text-white hover:bg-black/70 transition-all"><Eye className="w-5 h-5" /></button>
                <button onClick={() => setSoundEnabled(!soundEnabled)} className="p-2 bg-black/50 rounded-lg text-white hover:bg-black/70 transition-all">{soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}</button>
                <button onClick={toggleFullscreen} className="p-2 bg-black/50 rounded-lg text-white hover:bg-black/70 transition-all"><Minimize2 className="w-5 h-5" /></button>
              </div>
              <div className="absolute top-4 left-4 z-20 bg-black/50 backdrop-blur-sm rounded-lg px-4 py-2 text-white text-sm">
                Score: <span className="text-yellow-400">{score}</span> | Level: <span className="text-purple-400">{level}</span> | Target: <span className="text-cyan-400">{targetDepth.toFixed(0)}%</span>
              </div>
            </>
          )}

          {gameState === 'start' && (
            <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
              <div className={`rounded-2xl p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <Target className="w-16 h-16 text-rose-500 mx-auto mb-4" />
                <h3 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Distance Judgment Lab</h3>
                <p className={`mb-6 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>60-second challenge • Intercept at target depth</p>
                <button 
                  onClick={startGame} 
                  className="px-8 py-3 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg w-full transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  Start Drill
                </button>
              </div>
            </div>
          )}

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
                  <ResultCard label="Perfect Hits" value={perfectHits} icon={<Award className="w-4 h-4" />} color="text-green-500" />
                  <ResultCard label="Close Hits" value={closeHits} icon={<Activity className="w-4 h-4" />} color="text-cyan-500" />
                  <ResultCard label="Max Level" value={level} icon={<TrendingUp className="w-4 h-4" />} color="text-purple-500" />
                  <ResultCard label="Accuracy" value={accuracy} unit="%" icon={<ShieldCheck className="w-4 h-4" />} color="text-orange-500" />
                  <ResultCard label="Mean Deviation" value={attempts > 0 ? `${(totalDeviation/attempts).toFixed(2)}%` : '--'} icon={<MoveVertical className="w-4 h-4" />} color="text-pink-500" />
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
                    className="flex-1 px-4 py-2.5 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Play Again →
                  </button>
                </div>
              </div>
            </div>
          )}

          {gameState === 'playing' && (
            <div className="relative h-full w-full flex items-center justify-center">
              {/* Static Depth Goal Ring */}
              <div 
                className="absolute border-[4px] border-dashed rounded-full transition-all duration-300"
                style={{
                  borderColor: isBoxDarkMode ? '#444' : '#ccc',
                  width: `${200 * (1 - targetDepth/100)}px`,
                  height: `${200 * (1 - targetDepth/100)}px`,
                  opacity: 0.6
                }}
              />

              {/* Moving Sphere */}
              <div 
                className={`rounded-full shadow-2xl transition-colors duration-300 ${
                  feedback === 'perfect' ? 'bg-emerald-500' : 
                  feedback === 'close' ? 'bg-amber-500' : 'bg-rose-600'
                }`}
                style={{
                  width: `${200 * (1 - currentZ/100)}px`,
                  height: `${200 * (1 - currentZ/100)}px`,
                  filter: `blur(${Math.abs(currentZ - targetDepth) * 0.08}px)`
                }}
              />

              {/* Target Depth Indicator */}
              <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-black/30 backdrop-blur-sm px-4 py-1 rounded-full">
                <span className="text-white text-sm font-medium">Target: {targetDepth.toFixed(0)}%</span>
              </div>

              {roundState === 'approaching' && (
                <button 
                  onMouseDown={handleCapture}
                  className="absolute bottom-8 w-64 py-4 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-xl font-bold text-xl shadow-lg active:scale-95 transition-all"
                >
                  INTERCEPT
                </button>
              )}

              {roundState === 'results' && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm">
                  <div className={`text-4xl font-bold mb-2 ${
                    feedback === 'perfect' ? 'text-emerald-400' : 
                    feedback === 'close' ? 'text-amber-400' : 'text-rose-400'
                  }`}>
                    {feedback === 'perfect' ? 'PERFECT' : feedback === 'close' ? 'CLOSE' : 'FAR'}
                  </div>
                  <p className="text-white/70 font-medium mb-6">
                    Error: {Math.abs(currentZ - targetDepth).toFixed(2)}%
                  </p>
                  <button 
                    onClick={startTrial} 
                    className="px-8 py-3 bg-white text-gray-900 rounded-xl font-semibold hover:bg-gray-100 transition-all"
                  >
                    Next Trial
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Rules Section */}
        {!isFullscreen && (
          <div className="mt-6">
            <div className={`rounded-xl border overflow-hidden ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <div className={`px-4 py-3 border-b ${isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'}`}>
                <div className="flex items-center gap-2">
                  <Info className={`w-4 h-4 ${isDarkMode ? 'text-rose-400' : 'text-rose-600'}`} />
                  <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Drill Rules & Instructions</h3>
                </div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-rose-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">1</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-rose-500">Intercept when sphere matches target ring</span> • Click INTERCEPT button
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">2</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-emerald-500">PERFECT (&lt;2% error): +500 points</span> • Green feedback
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">3</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-amber-500">CLOSE (&lt;7% error): +200 points</span> • Yellow feedback
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">4</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-red-500">FAR (≥7% error): +50 points</span> • Counts as mistake
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">5</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-purple-500">Level up every 3 trials</span> • Speed increases
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">6</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-yellow-500">5 FAR results reset score</span> • Best Score saves locally
                      </p>
                    </div>
                  </div>
                </div>
                <div className={`mt-3 pt-3 border-t text-xs ${isDarkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'} flex items-center justify-between`}>
                  <span>🎯 Target: 30-80% depth • Sphere blurs when misaligned</span>
                  <span>⚡ Timeout counts as FAR • 60 second challenge</span>
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
                   color === 'text-cyan-500' ? 'bg-cyan-500/10' :
                   color === 'text-purple-500' ? 'bg-purple-500/10' :
                   color === 'text-orange-500' ? 'bg-orange-500/10' :
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