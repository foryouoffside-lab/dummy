'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  Eye, Zap, Clock, Award, Volume2, VolumeX, Sun, Moon, 
  Target, MoveVertical, ShieldCheck, Activity, Maximize2, Minimize2,
  ArrowLeft, Timer, X, Trophy, Info, TrendingUp, Heart, RefreshCw
} from 'lucide-react';

export default function DistanceJudgmentDrill() {
  const containerRef = useRef(null);
  
  // Drill State
  const [gameState, setGameState] = useState('start');
  const [targetDepth, setTargetDepth] = useState(50);
  const [currentZ, setCurrentZ] = useState(0);
  const [roundState, setRoundState] = useState('idle'); // idle, approaching, results
  
  // Performance Metrics - SIMPLIFIED SCORING
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [perfectHits, setPerfectHits] = useState(0);
  const [closeHits, setCloseHits] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [lives, setLives] = useState(3);
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
  const nextTrialTimeoutRef = useRef(null);
  const isActiveRef = useRef(false);
  const gameStateRef = useRef('start');
  const scoreRef = useRef(0);
  const livesRef = useRef(3);
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
        osc.frequency.value = 660;
        gain.gain.value = 0.1;
      } else if (type === 'far') {
        osc.frequency.value = 330;
        gain.gain.value = 0.1;
      } else if (type === 'streak') {
        osc.frequency.value = 1046.5;
        gain.gain.value = 0.12;
      } else if (type === 'penalty') {
        osc.frequency.value = 220;
        gain.gain.value = 0.15;
      }
      osc.start();
      gain.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 0.2);
      osc.stop(audioCtx.currentTime + 0.2);
    } catch (e) {}
  };

  // Calculate points based on deviation
  const calculatePoints = (deviation) => {
    if (deviation < 5) return 1.0;
    if (deviation < 15) return 0.5;
    return 0;
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
            if (nextTrialTimeoutRef.current) clearTimeout(nextTrialTimeoutRef.current);
            
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
      const speed = 0.02 + (level * 0.008);
      
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
    if (nextTrialTimeoutRef.current) clearTimeout(nextTrialTimeoutRef.current);
    setRoundState('approaching');
    setTargetDepth(25 + Math.random() * 60);
    setCurrentZ(0);
    setFeedbackMsg('');
    lastTimeRef.current = undefined;
    requestRef.current = requestAnimationFrame(animateApproach);
  };

  const handleCapture = () => {
    if (!isActiveRef.current || roundState !== 'approaching') return;
    
    if (requestRef.current) {
      cancelAnimationFrame(requestRef.current);
    }
    
    const deviation = Math.abs(currentZ - targetDepth);
    setAttempts(prev => prev + 1);

    const pointsEarned = calculatePoints(deviation);
    scoreRef.current = parseFloat((scoreRef.current + pointsEarned).toFixed(1));
    setScore(scoreRef.current);
    
    if (deviation < 5) {
      setPerfectHits(prev => prev + 1);
      playSound('perfect');
      showFeedback(`✓ PERFECT! +${pointsEarned} point`, 'success');
    } else if (deviation < 15) {
      setCloseHits(prev => prev + 1);
      playSound('close');
      showFeedback(`✓ CLOSE! +${pointsEarned} point`, 'success');
    } else {
      // FAR hit - check lives
      if (livesRef.current > 0) {
        livesRef.current -= 1;
        setLives(livesRef.current);
        playSound('far');
        showFeedback(`✗ FAR! No points! -1 life`, 'error');
        
        if (livesRef.current === 0) {
          scoreRef.current = Math.max(0, scoreRef.current - 1);
          setScore(scoreRef.current);
          showFeedback(` No lives left! -1 point penalty!`, 'warning');
          playSound('penalty');
        }
      } else {
        scoreRef.current = Math.max(0, scoreRef.current - 1);
        setScore(scoreRef.current);
        showFeedback(`✗ FAR! -1 point penalty!`, 'error');
        playSound('penalty');
      }
    }

    setRoundState('results');
    
    const acc = attempts > 0 ? ((perfectHits + closeHits) / (attempts + 1)) * 100 : 100;
    setAccuracy(Math.round(acc));
    
    if (attempts > 0 && (attempts + 1) % 5 === 0) {
      setLevel(prev => prev + 1);
      playSound('streak');
      showFeedback(`⭐ Level ${level + 1}! Speed increased!`, 'success');
    }
    
    // Auto start next trial after 1 second
    nextTrialTimeoutRef.current = setTimeout(() => {
      if (isActiveRef.current && gameState === 'playing') {
        startTrial();
      }
    }, 1000);
  };

  const handleAutoFail = () => {
    if (!isActiveRef.current) return;
    
    if (requestRef.current) {
      cancelAnimationFrame(requestRef.current);
    }
    
    setAttempts(prev => prev + 1);
    
    if (livesRef.current > 0) {
      livesRef.current -= 1;
      setLives(livesRef.current);
      playSound('far');
      showFeedback(`⏰ TIMEOUT! -1 life`, 'error');
      
      if (livesRef.current === 0) {
        scoreRef.current = Math.max(0, scoreRef.current - 1);
        setScore(scoreRef.current);
        showFeedback(` No lives left! -1 point penalty!`, 'warning');
        playSound('penalty');
      }
    } else {
      scoreRef.current = Math.max(0, scoreRef.current - 1);
      setScore(scoreRef.current);
      showFeedback(`⏰ TIMEOUT! -1 point penalty!`, 'error');
      playSound('penalty');
    }
    
    setRoundState('results');
    
    const acc = attempts > 0 ? ((perfectHits + closeHits) / (attempts + 1)) * 100 : 100;
    setAccuracy(Math.round(acc));
    
    // Auto start next trial after 1 second
    nextTrialTimeoutRef.current = setTimeout(() => {
      if (isActiveRef.current && gameState === 'playing') {
        startTrial();
      }
    }, 1000);
  };

  const startGame = () => {
    setGameState('playing');
    gameStateRef.current = 'playing';
    setScore(0);
    setAttempts(0);
    setLevel(1);
    setPerfectHits(0);
    setCloseHits(0);
    setTimeLeft(60);
    setLives(3);
    setAccuracy(100);
    setFeedbackMsg('');
    
    isActiveRef.current = true;
    scoreRef.current = 0;
    livesRef.current = 3;
    setRoundState('idle');
    
    startTrial();
  };

  const resetGame = () => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    isActiveRef.current = false;
    if (requestRef.current) cancelAnimationFrame(requestRef.current);
    if (nextTrialTimeoutRef.current) clearTimeout(nextTrialTimeoutRef.current);
    setGameState('start');
    gameStateRef.current = 'start';
    setRoundState('idle');
    setScore(0);
    setAttempts(0);
    setLevel(1);
    setPerfectHits(0);
    setCloseHits(0);
    setTimeLeft(60);
    setLives(3);
    setAccuracy(100);
  };

  return (
    <div className={`min-h-screen select-none ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6">
          <Link href="/drills/visual" className={`inline-flex items-center gap-2 mb-4 ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>
            <ArrowLeft className="w-4 h-4" />
            Back to Visual Drills
          </Link>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-rose-500 to-pink-600 rounded-xl">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Distance Judgment Lab</h1>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Depth interception • 60 second challenge</p>
              </div>
            </div>
            
            <div className="flex gap-2">
              {gameState === 'playing' && (
                <button 
                  onClick={resetGame} 
                  className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`} 
                  title="Reset session"
                >
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
        <div className="grid grid-cols-6 gap-3 mb-4 h-[88px]">
          <StatCard icon={<Target className="text-blue-600" />} value={score.toFixed(1)} label="Score" isDark={isDarkMode} />
          <StatCard icon={<Trophy className="text-yellow-500" />} value={bestScore} label="Best" isDark={isDarkMode} />
          <StatCard icon={<Timer className={timeLeft < 15 ? 'text-red-600' : 'text-green-600'} />} value={timeLeft} label="Time" unit="s" isDark={isDarkMode} />
          <StatCard icon={<TrendingUp className="text-purple-500" />} value={level} label="Level" isDark={isDarkMode} />
          <StatCard icon={<Award className="text-green-500" />} value={perfectHits} label="Perfect" isDark={isDarkMode} />
          <StatCard icon={<Heart className="text-red-500" />} value={lives} label="Lives" isDark={isDarkMode} />
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
              <div className="absolute top-4 left-4 z-20 bg-black/50 backdrop-blur-sm rounded-lg px-4 py-2 text-white text-sm">
                Score: <span className="text-yellow-400">{score.toFixed(1)}</span> | Level: <span className="text-purple-400">{level}</span> | Lives: <span className="text-red-400">{lives}</span>
              </div>
            </>
          )}

          {/* Start Screen - Clean without rules */}
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
                  <ResultCard label="Final Score" value={score.toFixed(1)} icon={<Target className="w-4 h-4" />} color="text-blue-500" />
                  <ResultCard label="Best Score" value={bestScore} icon={<Trophy className="w-4 h-4" />} color="text-yellow-500" />
                  <ResultCard label="Perfect Hits" value={perfectHits} icon={<Award className="w-4 h-4" />} color="text-green-500" />
                  <ResultCard label="Close Hits" value={closeHits} icon={<Activity className="w-4 h-4" />} color="text-cyan-500" />
                  <ResultCard label="Max Level" value={level} icon={<TrendingUp className="w-4 h-4" />} color="text-purple-500" />
                  <ResultCard label="Accuracy" value={accuracy} unit="%" icon={<ShieldCheck className="w-4 h-4" />} color="text-orange-500" />
                  <ResultCard label="Lives Lost" value={3 - lives} icon={<Heart className="w-4 h-4" />} color="text-red-500" />
                </div>
                
                <div className="flex gap-4">
                  <Link 
                    href="/drills/visual"
                    className={`flex-1 px-4 py-2.5 rounded-lg font-semibold transition-all text-center ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                  >
                    ← Back
                  </Link>
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
                className="rounded-full shadow-2xl transition-colors duration-300"
                style={{
                  width: `${200 * (1 - currentZ/100)}px`,
                  height: `${200 * (1 - currentZ/100)}px`,
                  background: `radial-gradient(circle at 30% 30%, 
                    ${!isActiveRef.current ? '#666' : 
                      (Math.abs(currentZ - targetDepth) < 5 ? '#4ade80' : 
                       Math.abs(currentZ - targetDepth) < 15 ? '#fbbf24' : '#f43f5e')}, 
                    ${!isActiveRef.current ? '#444' : 
                      (Math.abs(currentZ - targetDepth) < 5 ? '#166534' : 
                       Math.abs(currentZ - targetDepth) < 15 ? '#92400e' : '#9f1239')})`,
                  filter: `blur(${Math.abs(currentZ - targetDepth) * 0.1}px)`,
                  transition: 'background 0.2s ease'
                }}
              />

              {/* Target Depth Indicator */}
              <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-black/30 backdrop-blur-sm px-4 py-1 rounded-full">
                <span className="text-white text-sm font-medium">Target: {targetDepth.toFixed(0)}%</span>
              </div>

              {/* Lives Indicator */}
              <div className="absolute top-8 right-8 flex gap-1">
                {[...Array(3)].map((_, i) => (
                  <Heart key={i} className={`w-5 h-5 ${i < lives ? 'text-red-500 fill-red-500' : 'text-gray-600'}`} />
                ))}
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
                    Math.abs(currentZ - targetDepth) < 5 ? 'text-green-400' : 
                    Math.abs(currentZ - targetDepth) < 15 ? 'text-yellow-400' : 'text-red-400'
                  }`}>
                    {Math.abs(currentZ - targetDepth) < 5 ? 'PERFECT!' : 
                     Math.abs(currentZ - targetDepth) < 15 ? 'CLOSE!' : 'FAR!'}
                  </div>
                  <p className="text-white/70 font-medium mb-2">
                    Error: {Math.abs(currentZ - targetDepth).toFixed(2)}%
                  </p>
                  <p className="text-white/50 text-sm">
                    Points: {calculatePoints(Math.abs(currentZ - targetDepth))}
                  </p>
                  <p className="text-white/40 text-xs mt-2">
                    Next trial in...
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Rules Section - Below game container */}
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
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">1</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-green-500">PERFECT (&lt;5% error): +1 point</span> • Sphere turns green
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">2</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-yellow-500">CLOSE (&lt;15% error): +0.5 points</span> • Sphere turns yellow
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">3</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-red-500">FAR (≥15% error): 0 points, -1 life</span> • Sphere turns red
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">4</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-purple-500">3 Lives System</span> • No lives left = -1 point penalty
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">5</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-blue-500">Level up every 5 trials</span> • Speed increases
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-cyan-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">6</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-cyan-500">Auto-advance after 1 second</span> • No need to click Next
                      </p>
                    </div>
                  </div>
                </div>
                <div className={`mt-3 pt-3 border-t text-xs ${isDarkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'} flex items-center justify-between`}>
                  <span>🎯 Target: 25-85% depth • Sphere blurs when misaligned</span>
                  <span>⚡ Next trial starts automatically after 1 second</span>
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
                   color === 'text-orange-500' ? 'bg-orange-500/10' : 'bg-red-500/10';
  
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