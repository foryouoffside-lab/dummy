'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Maximize2, Minimize2, Sun, Moon, 
  Eye, Volume2, VolumeX, Info, Activity, Target, Clock, Award, Trophy, Zap, RefreshCw, Heart
} from 'lucide-react';

export default function ConstantPrimePage() {
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);
  
  const [gameState, setGameState] = useState('start');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isBoxDarkMode, setIsBoxDarkMode] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  
  // Game state
  const [timeLeft, setTimeLeft] = useState(60);
  const [lives, setLives] = useState(3);
  const [currentStim, setCurrentStim] = useState('G');
  const [activeSet, setActiveSet] = useState('VOWELS');
  const [isHit, setIsHit] = useState(false);
  const [isMiss, setIsMiss] = useState(false);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [correctHits, setCorrectHits] = useState(0);
  const [misses, setMisses] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  const [processed, setProcessed] = useState(false);
  const [currentInterval, setCurrentInterval] = useState(800);
  
  // Refs
  const gameStateRef = useRef({
    timeLeft: 60,
    lives: 3,
    activeSet: 'VOWELS',
    currentStim: 'G',
    processed: false,
    streakCount: 0,
    correctHits: 0,
    misses: 0,
    score: 0,
    isGameActive: false,
    currentInterval: 800
  });

  const mainGameStateRef = useRef('start');
  const timerIntervalRef = useRef(null);
  const stimulusIntervalRef = useRef(null);
  const ruleIntervalRef = useRef(null);
  const feedbackTimeoutRef = useRef(null);
  const audioCtxRef = useRef(null);

  // Penalty settings
  const PENALTY = 1;

  // Data sets
  const vowels = ['A', 'E', 'I', 'O', 'U'];
  const consonants = ['B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Y', 'Z'];
  const primes = ['2', '3', '5', '7'];
  const nonPrimes = ['1', '4', '6', '8', '9'];

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  // Sync gameState to ref
  useEffect(() => {
    mainGameStateRef.current = gameState;
  }, [gameState]);

  // Load best scores
  useEffect(() => {
    const savedBestScore = localStorage.getItem('constantPrimeBestScore');
    const savedBestStreak = localStorage.getItem('constantPrimeBestStreak');
    
    if (savedBestScore) setBestScore(parseInt(savedBestScore, 10));
    if (savedBestStreak) setBestStreak(parseInt(savedBestStreak, 10));
  }, []);

  // Update best score
  const updateBestScore = (finalScore) => {
    const currentBestScore = parseInt(localStorage.getItem('constantPrimeBestScore') || '0', 10);
    if (finalScore > currentBestScore) {
      localStorage.setItem('constantPrimeBestScore', finalScore.toString());
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
    }, 500);
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
      
      if (type === 'hit') {
        osc.frequency.value = 880;
        gain.gain.value = 0.1;
        osc.start();
        gain.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 0.1);
        osc.stop(audioCtx.currentTime + 0.1);
      } else if (type === 'miss') {
        osc.frequency.value = 440;
        gain.gain.value = 0.1;
        osc.start();
        gain.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 0.15);
        osc.stop(audioCtx.currentTime + 0.15);
      } else if (type === 'ruleChange') {
        osc.frequency.value = 660;
        gain.gain.value = 0.08;
        osc.start();
        gain.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 0.1);
        osc.stop(audioCtx.currentTime + 0.1);
      } else if (type === 'streak') {
        osc.frequency.value = 1046.5;
        gain.gain.value = 0.12;
        osc.start();
        gain.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 0.1);
        osc.stop(audioCtx.currentTime + 0.1);
      } else if (type === 'lifeLost') {
        osc.frequency.value = 330;
        gain.gain.value = 0.15;
        osc.start();
        gain.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 0.2);
        osc.stop(audioCtx.currentTime + 0.2);
      } else if (type === 'speedUp') {
        osc.frequency.value = 1200;
        gain.gain.value = 0.08;
        osc.start();
        gain.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 0.08);
        osc.stop(audioCtx.currentTime + 0.08);
      }
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

  const updateAccuracy = () => {
    const state = gameStateRef.current;
    const total = state.correctHits + state.misses;
    if (total > 0) {
      setAccuracy(Math.round((state.correctHits / total) * 100));
    }
  };

  // Adaptive speed based on performance
  const updateSpeed = useCallback(() => {
    const state = gameStateRef.current;
    const totalAttempts = state.correctHits + state.misses;
    
    if (totalAttempts > 0) {
      const accuracy = (state.correctHits / totalAttempts) * 100;
      
      // Adjust interval based on accuracy
      if (accuracy >= 80 && state.currentInterval > 400) {
        // High accuracy - speed up
        state.currentInterval = Math.max(400, state.currentInterval - 50);
        setCurrentInterval(state.currentInterval);
        playSound('speedUp');
        showFeedback(`⚡ Speed increased! ${state.currentInterval}ms`, 'success');
        
        // Restart interval with new speed
        if (stimulusIntervalRef.current) {
          clearInterval(stimulusIntervalRef.current);
          stimulusIntervalRef.current = setInterval(updateStimulus, state.currentInterval);
        }
      } else if (accuracy < 50 && state.currentInterval < 800) {
        // Low accuracy - slow down
        state.currentInterval = Math.min(800, state.currentInterval + 50);
        setCurrentInterval(state.currentInterval);
        showFeedback(`🐢 Speed adjusted: ${state.currentInterval}ms`, 'warning');
        
        // Restart interval with new speed
        if (stimulusIntervalRef.current) {
          clearInterval(stimulusIntervalRef.current);
          stimulusIntervalRef.current = setInterval(updateStimulus, state.currentInterval);
        }
      }
    }
  }, []);

  const updateStimulus = useCallback(() => {
    if (!gameStateRef.current.isGameActive) return;
    
    const state = gameStateRef.current;
    state.processed = false;
    setProcessed(false);
    setIsHit(false);
    setIsMiss(false);
    
    // 30% chance of target
    const isTarget = Math.random() < 0.3;
    let newStim = '';
    
    if (state.activeSet === 'VOWELS') {
      newStim = isTarget 
        ? vowels[Math.floor(Math.random() * vowels.length)] 
        : consonants[Math.floor(Math.random() * consonants.length)];
    } else {
      newStim = isTarget 
        ? primes[Math.floor(Math.random() * primes.length)] 
        : nonPrimes[Math.floor(Math.random() * nonPrimes.length)];
    }
    
    state.currentStim = newStim;
    setCurrentStim(newStim);
    
    // Check speed adjustment every 5 stimuli
    if ((state.correctHits + state.misses) % 5 === 0 && (state.correctHits + state.misses) > 0) {
      updateSpeed();
    }
  }, [vowels, consonants, primes, nonPrimes, updateSpeed]);

  const handleInput = useCallback(() => {
    if (!gameStateRef.current.isGameActive) return;
    
    const state = gameStateRef.current;
    if (state.processed) return;
    
    state.processed = true;
    setProcessed(true);
    
    const targetSet = state.activeSet === 'VOWELS' ? vowels : primes;
    const isTarget = targetSet.includes(state.currentStim);
    
    if (isTarget) {
      // Hit!
      state.correctHits++;
      state.streakCount++;
      state.score += 1; // +1 point per correct hit
      
      setCorrectHits(state.correctHits);
      setStreak(state.streakCount);
      setScore(state.score);
      setIsHit(true);
      
      playSound('hit');
      showFeedback(`✓ Correct! +1 point`, 'success');
      
      if (state.streakCount > bestStreak) {
        setBestStreak(state.streakCount);
        localStorage.setItem('constantPrimeBestStreak', state.streakCount.toString());
      }
      
      if (state.streakCount % 5 === 0 && state.streakCount > 0) {
        playSound('streak');
        showFeedback(`🔥 ${state.streakCount} Streak!`, 'success');
      }
    } else {
      // Miss!
      state.misses++;
      state.streakCount = 0;
      setMisses(state.misses);
      setStreak(0);
      setIsMiss(true);
      
      // Check lives
      if (state.lives > 0) {
        // Still have lives - lose a life, NO penalty
        state.lives--;
        setLives(state.lives);
        playSound('miss');
        
        if (state.lives === 0) {
          playSound('lifeLost');
          showFeedback(`Out of lives! Penalty now active!`, 'warning');
        } else {
          showFeedback(`✗ Miss! No penalty • ${state.lives} lives left`, 'error');
        }
      } else {
        // Out of lives - apply penalty
        state.score = Math.max(0, state.score - PENALTY);
        setScore(state.score);
        playSound('miss');
        showFeedback(`✗ Miss! -${PENALTY} point penalty`, 'error');
      }
    }
    
    updateAccuracy();
    
    setTimeout(() => {
      setIsHit(false);
      setIsMiss(false);
    }, 150);
  }, [vowels, primes, bestStreak, PENALTY]);

  const changeRule = useCallback(() => {
    if (!gameStateRef.current.isGameActive) return;
    
    const state = gameStateRef.current;
    const newSet = state.activeSet === 'VOWELS' ? 'PRIMES' : 'VOWELS';
    state.activeSet = newSet;
    setActiveSet(newSet);
    
    playSound('ruleChange');
    showFeedback(`Rule changed to ${newSet}!`, 'warning');
  }, []);

  const endGame = () => {
    const state = gameStateRef.current;
    state.isGameActive = false;
    setGameState('gameOver');
    
    if (stimulusIntervalRef.current) clearInterval(stimulusIntervalRef.current);
    if (ruleIntervalRef.current) clearInterval(ruleIntervalRef.current);
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    
    // Update best score
    updateBestScore(state.score);
  };

  const startGame = () => {
    const state = gameStateRef.current;
    
    // Clear existing intervals
    if (stimulusIntervalRef.current) clearInterval(stimulusIntervalRef.current);
    if (ruleIntervalRef.current) clearInterval(ruleIntervalRef.current);
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    
    // Reset state
    state.timeLeft = 60;
    state.lives = 3;
    state.activeSet = 'VOWELS';
    state.processed = false;
    state.streakCount = 0;
    state.correctHits = 0;
    state.misses = 0;
    state.score = 0;
    state.currentInterval = 800;
    state.isGameActive = true;
    
    setTimeLeft(60);
    setLives(3);
    setActiveSet('VOWELS');
    setCurrentStim('G');
    setProcessed(false);
    setIsHit(false);
    setIsMiss(false);
    setScore(0);
    setStreak(0);
    setCorrectHits(0);
    setMisses(0);
    setAccuracy(100);
    setCurrentInterval(800);
    setGameState('playing');
    
    // Initial stimulus
    setTimeout(() => updateStimulus(), 50);
    
    // Stimulus interval (starts at 800ms)
    stimulusIntervalRef.current = setInterval(updateStimulus, 800);
    
    // Rule change interval (10 seconds)
    ruleIntervalRef.current = setInterval(changeRule, 10000);
    
    // Timer
    timerIntervalRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          endGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    showFeedback('60 seconds • Speed adapts to you!', 'success');
  };

  const resetGame = () => {
    gameStateRef.current.isGameActive = false;
    if (stimulusIntervalRef.current) clearInterval(stimulusIntervalRef.current);
    if (ruleIntervalRef.current) clearInterval(ruleIntervalRef.current);
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    if (audioCtxRef.current) {
      audioCtxRef.current.close();
      audioCtxRef.current = null;
    }
    
    setGameState('start');
    setScore(0);
    setStreak(0);
    setCorrectHits(0);
    setMisses(0);
    setAccuracy(100);
    setTimeLeft(60);
    setLives(3);
    setActiveSet('VOWELS');
    setCurrentStim('G');
    setProcessed(false);
    setIsHit(false);
    setIsMiss(false);
    setFeedback('');
    setCurrentInterval(800);
  };

  // Keyboard handler
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space' && gameState === 'playing') {
        e.preventDefault();
        handleInput();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState, handleInput]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (stimulusIntervalRef.current) clearInterval(stimulusIntervalRef.current);
      if (ruleIntervalRef.current) clearInterval(ruleIntervalRef.current);
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
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

  return (
    <div className={`min-h-screen select-none ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6">
          <Link href="/drills/productivity" className={`inline-flex items-center gap-2 mb-4 ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>
            <ArrowLeft className="w-4 h-4" /> Back to Productivity Drills
          </Link>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Constant Prime</h1>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>+1 correct • Adaptive speed 800-400ms • 3 lives • 60s</p>
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
          <StatCard icon={<Clock className={timeLeft <= 10 ? 'text-red-600' : 'text-cyan-600'} />} value={timeLeft} label="Time" unit="s" isDark={isDarkMode} />
          <StatCard icon={<Heart className={lives === 0 ? 'text-yellow-500' : 'text-red-500'} />} value={lives} label="Lives" isDark={isDarkMode} />
          <StatCard icon={<Zap className="text-orange-600" />} value={streak} label="Streak" isDark={isDarkMode} />
          <StatCard icon={<Award className="text-purple-600" />} value={accuracy} label="Accuracy" unit="%" isDark={isDarkMode} />
          <StatCard icon={<Activity className="text-emerald-600" />} value={currentInterval} label="Speed" unit="ms" isDark={isDarkMode} />
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
            background: isBoxDarkMode ? "#000000" : "#ffffff",
            aspectRatio: '16/9',
            maxWidth: '100%',
            margin: '0 auto',
            borderColor: isDarkMode ? '#374151' : '#e5e7eb',
            overflow: 'hidden'
          }}
          onClick={gameState === 'playing' ? handleInput : undefined}
        >
          {isFullscreen && gameState === 'playing' && (
            <>
              <div className="absolute top-4 right-4 z-30 flex gap-3">
                <button 
                  onClick={resetGame} 
                  className="p-2 bg-black/50 rounded-lg text-white hover:bg-black/70 transition-all" 
                  title="Reset session"
                >
                  <RefreshCw className="w-5 h-5" />
                </button>
                <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 bg-black/50 rounded-lg text-white hover:bg-black/70 transition-all">
                  {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
                <button onClick={() => setIsBoxDarkMode(!isBoxDarkMode)} className="p-2 bg-black/50 rounded-lg text-white hover:bg-black/70 transition-all">
                  <Eye className="w-5 h-5" />
                </button>
                <button onClick={() => setSoundEnabled(!soundEnabled)} className="p-2 bg-black/50 rounded-lg text-white hover:bg-black/70 transition-all">
                  {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                </button>
                <button onClick={toggleFullscreen} className="p-2 bg-black/50 rounded-lg text-white hover:bg-black/70 transition-all">
                  <Minimize2 className="w-5 h-5" />
                </button>
              </div>
              <div className="absolute top-4 left-4 z-30 bg-black/50 backdrop-blur-sm rounded-lg px-4 py-2 text-white text-sm">
                Score: <span className="text-yellow-400">{score}</span> | 
                Time: <span className={timeLeft <= 10 ? 'text-red-400' : 'text-green-400'}>{timeLeft}s</span> | 
                Speed: <span className="text-emerald-400">{currentInterval}ms</span>
              </div>
            </>
          )}

          {/* HUD */}
          <div className="absolute top-12 w-full text-center z-20 pointer-events-none">
            <div className={`text-xs tracking-wider mb-2 ${isBoxDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
              ACTIVE FILTER
            </div>
            <div className={`text-2xl font-bold ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {activeSet}
            </div>
          </div>

          {/* Stimulus */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span 
              className={`text-[12rem] font-black transition-all duration-100 ${
                isHit 
                  ? 'text-[#00ff41] scale-110' 
                  : isMiss 
                    ? 'text-[#ff3131]' 
                    : isBoxDarkMode ? 'text-white' : 'text-gray-900'
              }`}
            >
              {currentStim}
            </span>
          </div>

          {/* Speed Indicator */}
          <div className="absolute bottom-4 left-4 z-20 pointer-events-none">
            <span className={`text-xs ${isBoxDarkMode ? 'text-gray-600' : 'text-gray-400'}`}>
              {currentInterval}ms
            </span>
          </div>

          {/* Start Screen */}
          {gameState === 'start' && (
            <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
              <div className={`rounded-2xl p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <Activity className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
                <h3 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Constant Prime</h3>
                <p className={`mb-6 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>60-second challenge • Adaptive speed 800-400ms</p>
                <button 
                  onClick={startGame} 
                  className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-xl font-semibold hover:shadow-lg w-full transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  Start Training
                </button>
              </div>
            </div>
          )}

          {/* Game Over Screen */}
          {gameState === 'gameOver' && (
            <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
              <div className={`rounded-2xl p-8 shadow-xl border w-[480px] ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <div className="flex items-center justify-center gap-3 mb-6">
                  <Award className="w-10 h-10 text-yellow-500" />
                  <h3 className={`text-2xl font-bold ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Time's Up!
                  </h3>
                </div>
                
                <p className={`text-center mb-6 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  60 seconds completed!
                </p>
                
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <ResultCard label="Final Score" value={score} icon={<Target className="w-4 h-4" />} color="text-blue-500" isDark={isBoxDarkMode} />
                  <ResultCard label="Best Score" value={bestScore} icon={<Trophy className="w-4 h-4" />} color="text-yellow-500" isDark={isBoxDarkMode} />
                  <ResultCard label="Best Streak" value={bestStreak} icon={<Zap className="w-4 h-4" />} color="text-orange-500" isDark={isBoxDarkMode} />
                  <ResultCard label="Accuracy" value={accuracy} unit="%" icon={<Activity className="w-4 h-4" />} color="text-purple-500" isDark={isBoxDarkMode} />
                  <ResultCard label="Hits" value={correctHits} icon={<Target className="w-4 h-4" />} color="text-green-500" isDark={isBoxDarkMode} />
                  <ResultCard label="Misses" value={misses} icon={<RefreshCw className="w-4 h-4" />} color="text-red-500" isDark={isBoxDarkMode} />
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
                    className="flex-1 px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98]"
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
                  <Info className={`w-4 h-4 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
                  <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Drill Rules & Scoring</h3>
                </div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">1</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-emerald-500">Rule A (VOWELS):</span> Click on A, E, I, O, U
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">2</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-blue-500">Rule B (PRIMES):</span> Click on 2, 3, 5, 7
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">3</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Rule shifts <span className="font-semibold text-purple-500">every 10 seconds</span>
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">4</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-green-500">+1 point per correct hit</span>
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">5</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-red-500">-1 point penalty</span> ONLY when out of lives
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-pink-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">6</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-pink-500">3 lives protection</span> • No score penalty until lives reach 0
                      </p>
                    </div>
                  </div>
                </div>
                <div className={`mt-3 pt-3 border-t text-xs ${isDarkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'} flex items-center justify-between`}>
                  <span>⚡ Speed adapts: 800ms → 400ms based on accuracy</span>
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

function ResultCard({ label, value, unit = '', icon, color, isDark }) {
  const bgColor = color === 'text-blue-500' ? 'bg-blue-500/10' : 
                   color === 'text-yellow-500' ? 'bg-yellow-500/10' : 
                   color === 'text-orange-500' ? 'bg-orange-500/10' :
                   color === 'text-green-500' ? 'bg-green-500/10' :
                   color === 'text-purple-500' ? 'bg-purple-500/10' : 'bg-red-500/10';
  
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