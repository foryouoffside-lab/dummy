'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Grid, Zap, Clock, Award, 
  RotateCcw, Volume2, VolumeX, Maximize2, Minimize2,
  Sun, Moon, Fingerprint, Eye, ShieldCheck,
  ChevronRight, Compass, Target, Activity,
  BarChart3, Info, CheckCircle, XCircle, Trophy
} from 'lucide-react';

export default function SymbolMatchingDrill() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);
  
  // Professional Symbol Set
  const SYMBOLS = ['∆', 'Φ', 'Ω', 'Σ', 'Ξ', 'Π', 'Ψ', 'Γ', 'Θ'];
  
  // Drill State
  const [keyMap, setKeyMap] = useState([]);
  const [currentTarget, setCurrentTarget] = useState(null);
  const [gameState, setGameState] = useState('start');
  
  // Performance Metrics
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(75);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [reactionTimes, setReactionTimes] = useState([]);
  const [bestReactionTime, setBestReactionTime] = useState(0);
  const [combo, setCombo] = useState(0);
  const [bestCombo, setBestCombo] = useState(0);
  
  // UI State
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isBoxDarkMode, setIsBoxDarkMode] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [lastFeedback, setLastFeedback] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  
  const startTimeRef = useRef(null);
  const timerIntervalRef = useRef(null);
  const feedbackTimeoutRef = useRef(null);
  const audioContextRef = useRef(null);
  const scoreRef = useRef(0);
  const comboRef = useRef(0);
  const gameStateRef = useRef('start');

  // Load best score from localStorage on mount
  useEffect(() => {
    const savedBestScore = localStorage.getItem('symbolMatchingDrillBestScore');
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
      localStorage.setItem('symbolMatchingDrillBestScore', score.toString());
    }
  }, [gameState, score, bestScore]);

  // Cleanup timers
  useEffect(() => {
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
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
    }, 500);
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
        g.gain.value = 0.1;
        osc.start();
        g.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 0.1);
        osc.stop(ctx.currentTime + 0.1);
      } else if (type === 'combo') {
        osc.frequency.value = 1046.5;
        g.gain.value = 0.12;
        osc.start();
        g.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 0.15);
        osc.stop(ctx.currentTime + 0.15);
      }
    } catch (e) {}
  }, [soundEnabled, initAudio]);

  // Calculate metrics
  const getAccuracy = () => {
    const total = correctCount + wrongCount;
    if (total === 0) return 100;
    return Math.round((correctCount / total) * 100);
  };

  const getAvgReactionTime = () => {
    if (reactionTimes.length === 0) return 0;
    const avg = reactionTimes.reduce((a, b) => a + b, 0) / reactionTimes.length;
    return Math.round(avg);
  };

  // Timer Logic
  useEffect(() => {
    if (gameState !== 'playing') return;
    
    timerIntervalRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setGameState('gameOver');
          gameStateRef.current = 'gameOver';
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [gameState]);

  // Key Generation - Changes after each answer
  const generateKeyMap = useCallback(() => {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9].sort(() => Math.random() - 0.5);
    const newMap = SYMBOLS.map((symbol, i) => ({
      symbol,
      number: numbers[i]
    }));
    setKeyMap(newMap);
    return newMap;
  }, []);

  const nextTarget = useCallback((currentMap) => {
    const map = currentMap || keyMap;
    const randomEntry = map[Math.floor(Math.random() * map.length)];
    setCurrentTarget(randomEntry);
    startTimeRef.current = Date.now();
  }, [keyMap]);

  const handleInput = (num) => {
    if (gameStateRef.current !== 'playing' || !currentTarget) return;

    const rt = Date.now() - startTimeRef.current;
    setTotalAttempts(prev => prev + 1);

    if (num === currentTarget.number) {
      // Correct answer - Score based on reaction speed
      let pointsEarned = 0;
      let speedRating = '';
      if (rt < 500) {
        pointsEarned = 200;
        speedRating = '⚡ ELITE!';
      } else if (rt < 800) {
        pointsEarned = 150;
        speedRating = '🔥 GREAT!';
      } else if (rt < 1200) {
        pointsEarned = 100;
        speedRating = '👍 GOOD!';
      } else if (rt < 1800) {
        pointsEarned = 70;
        speedRating = '👌 DECENT!';
      } else {
        pointsEarned = 40;
        speedRating = '✓ CORRECT!';
      }
      
      const comboBonus = Math.floor(comboRef.current / 3) * 10;
      pointsEarned += comboBonus;
      
      scoreRef.current += pointsEarned;
      setScore(scoreRef.current);
      setCorrectCount(prev => prev + 1);
      setReactionTimes(prev => [...prev, rt]);
      if (bestReactionTime === 0 || rt < bestReactionTime) {
        setBestReactionTime(rt);
      }
      comboRef.current++;
      setCombo(comboRef.current);
      
      if (comboRef.current > bestCombo) {
        setBestCombo(comboRef.current);
      }
      
      setLastFeedback('correct');
      
      if (comboRef.current % 3 === 0) {
        playSound('combo');
        showFeedback(`🔥 ${comboRef.current}x Combo! ${speedRating} +${pointsEarned}`, 'success');
      } else {
        playSound('correct');
        showFeedback(`${speedRating} +${pointsEarned} (${rt}ms)`, 'success');
      }
      
      // Generate new key map and target after correct answer
      const newMap = generateKeyMap();
      nextTarget(newMap);
    } else {
      // Wrong answer - Penalty
      const penalty = 25;
      scoreRef.current = Math.max(0, scoreRef.current - penalty);
      setScore(scoreRef.current);
      setWrongCount(prev => prev + 1);
      comboRef.current = 0;
      setCombo(0);
      setLastFeedback('wrong');
      showFeedback(`❌ WRONG! -${penalty}`, 'error');
      playSound('wrong');
      
      // Still generate new key map after wrong answer
      const newMap = generateKeyMap();
      nextTarget(newMap);
    }

    setTimeout(() => {
      setLastFeedback(null);
    }, 300);
  };

  // Physical Keyboard Support
  useEffect(() => {
    const handleKeyDown = (e) => {
      const num = parseInt(e.key);
      if (num >= 1 && num <= 9) {
        handleInput(num);
        e.preventDefault();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState, currentTarget, keyMap]);

  const startDrill = () => {
    const map = generateKeyMap();
    setGameState('playing');
    gameStateRef.current = 'playing';
    setScore(0);
    setTimeLeft(75);
    setTotalAttempts(0);
    setCorrectCount(0);
    setWrongCount(0);
    setReactionTimes([]);
    setBestReactionTime(0);
    setCombo(0);
    setBestCombo(0);
    setLastFeedback(null);
    setFeedback('');
    
    scoreRef.current = 0;
    comboRef.current = 0;
    
    nextTarget(map);
  };

  const resetGame = () => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    setGameState('start');
    gameStateRef.current = 'start';
  };

  // Show loading state
  if (loading || status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-violet-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
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
              <div className="p-3 bg-gradient-to-r from-violet-500 to-purple-600 rounded-xl">
                <Compass className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Dynamic Symbol Lab</h1>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Keys change every answer • 75s</p>
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
          <StatCard icon={<Clock className={timeLeft < 20 ? 'text-red-600' : 'text-green-600'} />} value={`${timeLeft}s`} label="Time" isDark={isDarkMode} />
          <StatCard icon={<CheckCircle className="text-emerald-600" />} value={correctCount} label="Correct" isDark={isDarkMode} />
          <StatCard icon={<BarChart3 className="text-purple-600" />} value={getAccuracy()} label="Accuracy" unit="%" isDark={isDarkMode} />
          <StatCard icon={<Zap className="text-orange-600" />} value={combo} label="Combo" isDark={isDarkMode} />
          <StatCard icon={<Activity className="text-cyan-600" />} value={bestReactionTime || '-'} label="Best" unit="ms" isDark={isDarkMode} />
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
          className={`relative ${isFullscreen ? 'fixed inset-0 z-50 overflow-auto' : 'rounded-xl border-2'}`}
          style={{ 
            background: isBoxDarkMode ? "#020202" : "#ffffff",
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

          <div className="p-6 md:p-8">
            {/* The Coding Key (Reference Table) - Changes every answer */}
            <div className={`p-4 md:p-6 rounded-2xl mb-6 border-2 transition-all ${
              isBoxDarkMode ? 'bg-gray-900/50 border-gray-800' : 'bg-violet-50/50 border-violet-100'
            }`}>
              <h3 className={`text-center text-xs font-bold uppercase tracking-wider mb-4 ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Reference Key (Changes Every Answer)
              </h3>
              <div className="grid grid-cols-9 gap-2 md:gap-3">
                {keyMap.map((item, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div className={`w-full aspect-square flex items-center justify-center text-xl md:text-2xl font-bold rounded-t-xl border-b-2 transition-colors ${
                      isBoxDarkMode 
                        ? 'bg-gray-800 border-gray-700 text-white' 
                        : 'bg-white border-violet-200 text-gray-900'
                    }`}>
                      {item.symbol}
                    </div>
                    <div className={`w-full py-2 flex items-center justify-center text-lg font-bold rounded-b-xl ${
                      isBoxDarkMode ? 'bg-gray-700 text-violet-400' : 'bg-violet-100 text-violet-600'
                    }`}>
                      {item.number}
                    </div>
                  </div>
                ))}
                {keyMap.length === 0 && Array(9).fill(0).map((_, i) => (
                  <div key={i} className={`aspect-square rounded-2xl animate-pulse ${isBoxDarkMode ? 'bg-gray-800' : 'bg-gray-200'}`} />
                ))}
              </div>
            </div>

            {/* The Active Drill Zone */}
            <div className={`relative min-h-[400px] rounded-3xl p-6 md:p-8 flex flex-col items-center transition-all ${
              isBoxDarkMode ? 'bg-gray-900/30' : 'bg-white'
            }`}>
              
              {/* Start Screen */}
              {gameState === 'start' && (
                <div className="absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-3xl z-40">
                  <div className={`rounded-2xl p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                    <Compass className="w-16 h-16 text-violet-500 mx-auto mb-4" />
                    <h3 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Dynamic Symbol Lab</h3>
                    <p className={`mb-6 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>75-second challenge • Keys reshuffle every answer</p>
                    <button 
                      onClick={startDrill}
                      className="px-8 py-3 bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg w-full transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                    >
                      Start Challenge
                    </button>
                  </div>
                </div>
              )}

              {gameState === 'playing' && currentTarget && (
                <>
                  {/* Top section - Target label */}
                  <div className="text-center w-full">
                    <div className={`text-xs font-bold uppercase tracking-widest mb-2 ${isBoxDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                      Active Target
                    </div>
                  </div>
                  
                  {/* Target Symbol */}
                  <div className="flex-1 flex items-center justify-center w-full min-h-[150px]">
                    <div className={`text-[7rem] md:text-[8rem] font-bold leading-none transition-all ${
                      lastFeedback === 'wrong' 
                        ? 'text-red-500' 
                        : isBoxDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {currentTarget.symbol}
                    </div>
                  </div>
                  
                  {/* Virtual Numpad */}
                  <div className="w-full mt-6">
                    <div className="grid grid-cols-3 md:grid-cols-9 gap-2 max-w-2xl mx-auto">
                      {[1,2,3,4,5,6,7,8,9].map(n => (
                        <button
                          key={n}
                          onClick={() => handleInput(n)}
                          className={`h-12 md:h-14 rounded-xl font-bold text-lg flex items-center justify-center border-2 transition-all hover:scale-105 active:scale-95 ${
                            isBoxDarkMode 
                              ? 'bg-gray-800 border-gray-700 text-white hover:border-violet-500 hover:bg-gray-700' 
                              : 'bg-gray-50 border-gray-200 text-gray-900 hover:border-violet-500 hover:bg-white hover:shadow-lg'
                          }`}
                        >
                          {n}
                        </button>
                      ))}
                    </div>
                    
                    {/* Time Progress Bar */}
                    <div className="max-w-xs mx-auto mt-6">
                      <div className={`h-1.5 rounded-full overflow-hidden ${isBoxDarkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
                        <div 
                          className={`h-full transition-all duration-1000 ${
                            timeLeft < 20 
                              ? 'bg-gradient-to-r from-red-500 to-orange-600' 
                              : 'bg-gradient-to-r from-violet-500 to-purple-600'
                          }`}
                          style={{ width: `${(timeLeft / 75) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Game Over Screen */}
              {gameState === 'gameOver' && (
                <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-3xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
                  <div className={`rounded-2xl p-8 shadow-xl border w-[480px] ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                    <div className="flex items-center justify-center gap-3 mb-6">
                      <Trophy className="w-10 h-10 text-yellow-500" />
                      <h3 className={`text-2xl font-bold ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Session Complete!</h3>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-8">
                      <ResultCard label="Final Score" value={score} icon={<Target className="w-4 h-4" />} color="text-yellow-500" />
                      <ResultCard label="Best Score" value={bestScore} icon={<Trophy className="w-4 h-4" />} color="text-yellow-500" />
                      <ResultCard label="Accuracy" value={getAccuracy()} unit="%" icon={<BarChart3 className="w-4 h-4" />} color="text-purple-500" />
                      <ResultCard label="Correct" value={correctCount} icon={<CheckCircle className="w-4 h-4" />} color="text-green-500" />
                      <ResultCard label="Wrong" value={wrongCount} icon={<XCircle className="w-4 h-4" />} color="text-red-500" />
                      <ResultCard label="Best Combo" value={`${bestCombo}x`} icon={<Zap className="w-4 h-4" />} color="text-orange-500" />
                      <ResultCard label="Best Reaction" value={`${bestReactionTime || 0}ms`} icon={<Activity className="w-4 h-4" />} color="text-cyan-500" />
                      <ResultCard label="Avg Reaction" value={`${getAvgReactionTime()}ms`} icon={<Clock className="w-4 h-4" />} color="text-blue-500" />
                    </div>
                    
                    <div className="flex gap-4">
                      <Link href="/drills/cognitive" className="flex-1">
                        <button className={`w-full px-4 py-2.5 rounded-lg font-semibold transition-all ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                          ← Back
                        </button>
                      </Link>
                      <button 
                        onClick={resetGame}
                        className="flex-1 px-4 py-2.5 bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                      >
                        <RotateCcw className="w-4 h-4 inline mr-2" /> Play Again
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Rules Section */}
        {!isFullscreen && (
          <div className="mt-6">
            <div className={`rounded-xl border overflow-hidden ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <div className={`px-4 py-3 border-b ${isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'}`}>
                <div className="flex items-center gap-2">
                  <Info className={`w-4 h-4 ${isDarkMode ? 'text-violet-400' : 'text-violet-600'}`} />
                  <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Drill Rules & Scoring</h3>
                </div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-violet-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">1</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Reference key <span className="font-semibold text-violet-500">changes after every answer</span></p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">2</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Score based on <span className="font-semibold text-green-500">reaction speed</span> + combo</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">3</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Wrong answer: <span className="font-semibold text-red-500">-25 points</span></p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">4</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Every 3 combo = <span className="font-semibold text-blue-500">+10 bonus points</span></p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">5</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Speed tiers: &lt;500ms (200) • &lt;800ms (150) • &lt;1200ms (100)</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">6</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Use keyboard <span className="font-semibold text-yellow-500">(1-9)</span> for fastest response</p>
                    </div>
                  </div>
                </div>
                <div className={`mt-3 pt-3 border-t text-xs ${isDarkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'} flex items-center justify-between`}>
                  <span>⌨️ 9 unique symbols • 75-second challenge</span>
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
                   color === 'text-green-500' ? 'bg-green-500/10' :
                   color === 'text-red-500' ? 'bg-red-500/10' :
                   color === 'text-orange-500' ? 'bg-orange-500/10' :
                   color === 'text-cyan-500' ? 'bg-cyan-500/10' : 'bg-blue-500/10';
  
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