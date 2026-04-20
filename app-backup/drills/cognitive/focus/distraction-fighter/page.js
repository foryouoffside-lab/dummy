'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Volume2, VolumeX, Maximize2, Minimize2, 
  Sun, Moon, Eye, Timer, Trophy, ShieldCheck, CheckCircle, XCircle,
  BarChart3, Info, Zap, Target, AlertCircle
} from 'lucide-react';

export default function DistractionFighterPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);
  
  // Game State
  const [gameState, setGameState] = useState('start');
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(60);
  
  // Target Logic
  const [currentTarget, setCurrentTarget] = useState(null);
  const [options, setOptions] = useState([]);
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  const timeoutRef = useRef(null);
  
  // Professional Metrics
  const [correctCount, setCorrectCount] = useState(0);
  const [errorCount, setErrorCount] = useState(0);
  const [timeoutCount, setTimeoutCount] = useState(0);
  const [combo, setCombo] = useState(0);
  const [bestCombo, setBestCombo] = useState(0);
  const [startTime, setStartTime] = useState(null);

  // Settings
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isBoxDarkMode, setIsBoxDarkMode] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const scoreRef = useRef(0);
  const comboRef = useRef(0);
  const gameStateRef = useRef('start');
  const timerIntervalRef = useRef(null);
  const feedbackTimeoutRef = useRef(null);
  const audioContextRef = useRef(null);

  // 8 Most Known Colors
  const allColors = [
    { name: 'Red', class: 'bg-red-500', text: 'text-red-500' },
    { name: 'Blue', class: 'bg-blue-500', text: 'text-blue-500' },
    { name: 'Green', class: 'bg-green-500', text: 'text-green-500' },
    { name: 'Yellow', class: 'bg-yellow-500', text: 'text-yellow-500' },
    { name: 'Purple', class: 'bg-purple-500', text: 'text-purple-500' },
    { name: 'Orange', class: 'bg-orange-500', text: 'text-orange-500' },
    { name: 'Pink', class: 'bg-pink-500', text: 'text-pink-500' },
    { name: 'Brown', class: 'bg-amber-700', text: 'text-amber-700' },
  ];

  // Load best score from localStorage on mount
  useEffect(() => {
    const savedBestScore = localStorage.getItem('distractionFighterDrillBestScore');
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
    if (gameState === 'gameOver' && score > bestScore) {
      setBestScore(score);
      localStorage.setItem('distractionFighterDrillBestScore', score.toString());
    }
  }, [gameState, score, bestScore]);

  // Cleanup timers
  useEffect(() => {
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
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
    }, 400);
  };

  // Initialize audio context
  const initAudio = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }
    return audioContextRef.current;
  }, []);

  // Play sound
  const playSound = useCallback((type) => {
    if (!soundEnabled) return;
    
    try {
      const ctx = initAudio();
      
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.connect(g);
      g.connect(ctx.destination);
      
      if (type === 'correct') {
        osc.frequency.value = 880;
        g.gain.value = 0.12;
        osc.start();
        g.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 0.1);
        osc.stop(ctx.currentTime + 0.1);
      } else if (type === 'wrong') {
        osc.frequency.value = 440;
        g.gain.value = 0.08;
        osc.start();
        g.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 0.1);
        osc.stop(ctx.currentTime + 0.1);
      } else if (type === 'timeout') {
        osc.frequency.value = 330;
        g.gain.value = 0.06;
        osc.start();
        g.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 0.15);
        osc.stop(ctx.currentTime + 0.15);
      } else if (type === 'combo') {
        osc.frequency.value = 1046.5;
        g.gain.value = 0.12;
        osc.start();
        g.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 0.15);
        osc.stop(ctx.currentTime + 0.15);
      }
    } catch (e) {}
  }, [soundEnabled, initAudio]);

  const getAccuracy = () => {
    const total = correctCount + errorCount + timeoutCount;
    if (total === 0) return 100;
    return Math.round((correctCount / total) * 100);
  };

  // Clear timeout on unmount or new trial
  const clearTargetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  // Generate "Incongruent" Stimuli (Stroop Effect)
  const generateTrial = useCallback(() => {
    clearTargetTimeout();
    
    const targetColorObj = allColors[Math.floor(Math.random() * allColors.length)];
    const textColorObj = allColors[Math.floor(Math.random() * allColors.length)];
    
    const posX = Math.floor(Math.random() * 50) + 25;
    const posY = Math.floor(Math.random() * 40) + 20;

    setCurrentTarget({
      instruction: targetColorObj.name,
      displayWord: textColorObj.name,
      displayColorClass: targetColorObj.text,
      trueColor: targetColorObj.name,
      x: posX,
      y: posY
    });

    const otherColors = allColors.filter(c => c.name !== targetColorObj.name);
    const shuffledOthers = otherColors.sort(() => Math.random() - 0.5);
    const selectedOptions = [targetColorObj, ...shuffledOthers.slice(0, 3)];
    
    setOptions(selectedOptions.sort(() => Math.random() - 0.5));
    setStartTime(Date.now());
    
    timeoutRef.current = setTimeout(() => {
      if (gameStateRef.current === 'playing') {
        setTimeoutCount(prev => prev + 1);
        comboRef.current = 0;
        setCombo(0);
        setScore(prev => Math.max(0, prev - 30));
        scoreRef.current = Math.max(0, scoreRef.current - 30);
        showFeedback('✗ Timeout! -30', 'error');
        playSound('timeout');
        
        setTimeout(() => {
          if (gameStateRef.current === 'playing') {
            generateTrial();
          }
        }, 400);
      }
    }, 1500);
    
  }, [playSound]);

  // Timer Logic
  useEffect(() => {
    if (gameState !== 'playing') return;
    
    timerIntervalRef.current = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          setGameState('gameOver');
          gameStateRef.current = 'gameOver';
          playSound('timeout');
          clearTargetTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [gameState, playSound]);

  useEffect(() => {
    if (gameState === 'playing') {
      generateTrial();
    }
    return () => clearTargetTimeout();
  }, [gameState, generateTrial]);

  // Handle Answer
  const handleAnswer = (selectedName) => {
    if (gameStateRef.current !== 'playing' || !currentTarget) return;
    
    clearTargetTimeout();
    
    const responseTime = Date.now() - startTime;
    
    if (selectedName === currentTarget.trueColor) {
      let pointsEarned = 0;
      if (responseTime < 400) pointsEarned = 250;
      else if (responseTime < 550) pointsEarned = 200;
      else if (responseTime < 700) pointsEarned = 150;
      else if (responseTime < 900) pointsEarned = 100;
      else if (responseTime < 1200) pointsEarned = 60;
      else pointsEarned = 30;
      
      scoreRef.current += pointsEarned;
      setScore(scoreRef.current);
      setCorrectCount(prev => prev + 1);
      comboRef.current++;
      setCombo(comboRef.current);
      
      if (comboRef.current > bestCombo) {
        setBestCombo(comboRef.current);
      }
      
      if (comboRef.current % 3 === 0) {
        playSound('combo');
        showFeedback(`🔥 ${comboRef.current}x Combo! +${pointsEarned}`, 'success');
      } else {
        playSound('correct');
        showFeedback(`✓ +${pointsEarned} (${responseTime}ms)`, 'success');
      }
    } else {
      setScore(prev => Math.max(0, prev - 40));
      scoreRef.current = Math.max(0, scoreRef.current - 40);
      setErrorCount(prev => prev + 1);
      comboRef.current = 0;
      setCombo(0);
      showFeedback(`✗ Wrong! -40`, 'error');
      playSound('wrong');
    }

    setTimeout(() => {
      if (gameStateRef.current === 'playing') {
        generateTrial();
      }
    }, 300);
  };

  const startDrill = () => {
    setGameState('playing');
    gameStateRef.current = 'playing';
    setScore(0);
    setTimeRemaining(60);
    setCorrectCount(0);
    setErrorCount(0);
    setTimeoutCount(0);
    setCombo(0);
    setBestCombo(0);
    setFeedback('');
    clearTargetTimeout();
    
    scoreRef.current = 0;
    comboRef.current = 0;
  };

  const resetGame = () => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    clearTargetTimeout();
    setGameState('start');
    gameStateRef.current = 'start';
  };

  // Show loading state
  if (loading || status === 'loading') {
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
            <ArrowLeft className="w-4 h-4" /> Back to Cognitive Drills
          </Link>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-rose-500 to-pink-600 rounded-xl">
                <ShieldCheck className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Distraction Fighter</h1>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Stroop Test • Ignore word, click ink color</p>
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
          <StatCard icon={<CheckCircle className="text-emerald-500" />} value={correctCount} label="Correct" isDark={isDarkMode} />
          <StatCard icon={<BarChart3 className="text-purple-600" />} value={getAccuracy()} label="Accuracy" unit="%" isDark={isDarkMode} />
          <StatCard icon={<Zap className="text-orange-600" />} value={combo} label="Combo" isDark={isDarkMode} />
          <StatCard icon={<AlertCircle className="text-amber-500" />} value={timeoutCount} label="Timeouts" isDark={isDarkMode} />
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
            background: isBoxDarkMode ? '#0a0a0a' : '#fafafa',
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

          <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
            {/* Start Screen */}
            {gameState === 'start' && (
              <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
                <div className={`rounded-2xl p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                  <ShieldCheck className="w-16 h-16 text-rose-500 mx-auto mb-4" />
                  <h3 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Distraction Fighter</h3>
                  <p className={`mb-6 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>60-second challenge • Ignore word, click ink color</p>
                  <button 
                    onClick={startDrill}
                    className="px-8 py-3 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg w-full transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Start Drill
                  </button>
                </div>
              </div>
            )}

            {/* Playing Screen */}
            {gameState === 'playing' && currentTarget && (
              <>
                {/* The Distractor Stimulus */}
                <div 
                  className="absolute transition-all duration-300 flex flex-col items-center"
                  style={{ left: `${currentTarget.x}%`, top: `${currentTarget.y}%`, transform: 'translate(-50%, -50%)' }}
                >
                  <div className={`text-7xl md:text-9xl font-black tracking-tighter ${currentTarget.displayColorClass} transition-all duration-200 ${feedbackType === 'error' ? 'animate-shake' : ''}`}>
                    {currentTarget.displayWord}
                  </div>
                </div>

                {/* Option Buttons */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-full max-w-xl px-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {options.map((opt) => (
                      <button
                        key={opt.name}
                        onClick={() => handleAnswer(opt.name)}
                        className={`py-5 rounded-xl font-bold text-lg transition-all border-2 hover:scale-105 active:scale-95 ${
                          isBoxDarkMode 
                            ? 'bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700 hover:border-gray-500' 
                            : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400'
                        }`}
                      >
                        {opt.name}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Game Over Screen */}
            {gameState === 'gameOver' && (
              <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
                <div className={`rounded-2xl p-8 shadow-xl border w-[480px] ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                  <div className="flex items-center justify-center gap-3 mb-6">
                    <Trophy className="w-10 h-10 text-yellow-500" />
                    <h3 className={`text-2xl font-bold ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Drill Complete!</h3>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <ResultCard label="Final Score" value={score} icon={<Target className="w-4 h-4" />} color="text-yellow-500" />
                    <ResultCard label="Best Score" value={bestScore} icon={<Trophy className="w-4 h-4" />} color="text-yellow-500" />
                    <ResultCard label="Accuracy" value={getAccuracy()} unit="%" icon={<BarChart3 className="w-4 h-4" />} color="text-purple-500" />
                    <ResultCard label="Correct" value={correctCount} icon={<CheckCircle className="w-4 h-4" />} color="text-green-500" />
                    <ResultCard label="Wrong" value={errorCount} icon={<XCircle className="w-4 h-4" />} color="text-red-500" />
                    <ResultCard label="Timeouts" value={timeoutCount} icon={<AlertCircle className="w-4 h-4" />} color="text-amber-500" />
                    <ResultCard label="Max Combo" value={`${bestCombo}x`} icon={<Zap className="w-4 h-4" />} color="text-orange-500" />
                  </div>
                  
                  <div className="flex gap-4">
                    <Link href="/drills/cognitive" className="flex-1">
                      <button className={`w-full px-4 py-2.5 rounded-lg font-semibold transition-all ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                        ← Back
                      </button>
                    </Link>
                    <button 
                      onClick={resetGame}
                      className="flex-1 px-4 py-2.5 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98]"
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
                  <Info className={`w-4 h-4 ${isDarkMode ? 'text-rose-400' : 'text-rose-600'}`} />
                  <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Drill Rules & Scoring</h3>
                </div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-rose-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">1</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Click button matching <span className="font-semibold text-rose-500">INK COLOR</span> (ignore word)</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">2</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Correct: <span className="font-semibold text-green-500">30-250 points</span> based on speed</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">3</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Wrong: <span className="font-semibold text-red-500">-40 points</span> + combo resets</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">4</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Timeout (1.5s): <span className="font-semibold text-amber-500">-30 points</span></p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">5</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Every 3 combo = <span className="font-semibold text-blue-500">bonus notification</span></p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">6</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Challenge lasts <span className="font-semibold text-purple-500">60 seconds</span></p>
                    </div>
                  </div>
                </div>
                <div className={`mt-3 pt-3 border-t text-xs ${isDarkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'} flex items-center justify-between`}>
                  <span>🎯 &lt;400ms: 250 • &lt;550ms: 200 • &lt;700ms: 150 • &lt;900ms: 100 • &lt;1200ms: 60 • 1200ms+: 30</span>
                  <span>🏆 Best Score saves locally</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-12px); }
          75% { transform: translateX(12px); }
        }
        .animate-shake { animation: shake 0.2s ease-in-out; }
      `}</style>
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
                   color === 'text-green-500' ? 'bg-green-500/10' :
                   color === 'text-red-500' ? 'bg-red-500/10' :
                   color === 'text-amber-500' ? 'bg-amber-500/10' : 'bg-orange-500/10';
  
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