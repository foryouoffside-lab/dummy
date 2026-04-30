'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Target, Zap, Award, 
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, 
  Eye, Timer, Activity, Trophy, Info, RefreshCw
} from 'lucide-react';

export default function DualTargetFlowPage() {
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);
  const leftContainerRef = useRef(null);
  const rightContainerRef = useRef(null);
  const animationFrameRef = useRef(null);
  
  const [gameState, setGameState] = useState('start');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isBoxDarkMode, setIsBoxDarkMode] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  
  // Scoring
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [timeLeft, setTimeLeft] = useState(60);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [successfulHits, setSuccessfulHits] = useState(0);
  const [misses, setMisses] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  
  // Targets
  const [leftTarget, setLeftTarget] = useState('▲');
  const [rightTarget, setRightTarget] = useState('●');
  
  // Refs for game state
  const scoreRef = useRef(0);
  const livesRef = useRef(3);
  const streakRef = useRef(0);
  const hitsRef = useRef(0);
  const missesRef = useRef(0);
  const isActiveRef = useRef(false);
  const gameStateRef = useRef('start');
  const timerIntervalRef = useRef(null);
  const spawnIntervalLeftRef = useRef(null);
  const spawnIntervalRightRef = useRef(null);
  const targetIntervalRef = useRef(null);
  const feedbackTimeoutRef = useRef(null);
  const audioCtxRef = useRef(null);
  const shapesRef = useRef(['▲', '●', '■', '★', '◆', '⬣', '❖', '⏣']);

  // Penalty settings
  const PENALTY = 1;

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  // Load best score
  useEffect(() => {
    const savedBestScore = localStorage.getItem('dualTargetFlowBestScore');
    if (savedBestScore) {
      setBestScore(parseInt(savedBestScore, 10));
    }
  }, []);

  // Update best score
  const updateBestScore = (finalScore) => {
    const currentBestScore = parseInt(localStorage.getItem('dualTargetFlowBestScore') || '0', 10);
    if (finalScore > currentBestScore) {
      localStorage.setItem('dualTargetFlowBestScore', finalScore.toString());
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
    setFeedback(message);
    setFeedbackType(type);
    feedbackTimeoutRef.current = setTimeout(() => {
      setFeedback('');
      setFeedbackType('');
    }, 800);
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
        gain.gain.value = 0.12;
        osc.start();
        gain.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 0.1);
        osc.stop(audioCtx.currentTime + 0.1);
      } else if (type === 'miss') {
        osc.frequency.value = 440;
        gain.gain.value = 0.1;
        osc.start();
        gain.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 0.15);
        osc.stop(audioCtx.currentTime + 0.15);
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
      }
    } catch (e) {}
  };

  const initTargets = useCallback(() => {
    const shapes = shapesRef.current;
    const shuffled = [...shapes].sort(() => 0.5 - Math.random());
    const newLeft = shuffled[0];
    let newRight = shuffled[1];
    
    // Ensure targets are different
    if (newLeft === newRight) {
      newRight = shuffled[2] || shapes.find(s => s !== newLeft);
    }
    
    setLeftTarget(newLeft);
    setRightTarget(newRight);
  }, []);

  const handleHit = (side) => {
    if (!isActiveRef.current || gameStateRef.current !== 'playing') return;
    
    hitsRef.current++;
    setSuccessfulHits(prev => prev + 1);
    
    const newStreak = streakRef.current + 1;
    streakRef.current = newStreak;
    setStreak(newStreak);
    
    if (newStreak > bestStreak) {
      setBestStreak(newStreak);
    }
    
    // +1 point per correct hit
    scoreRef.current += 1;
    setScore(scoreRef.current);
    
    playSound('hit');
    
    if (newStreak % 5 === 0 && newStreak > 0) {
      playSound('streak');
      showFeedback(`🔥 ${newStreak} Streak! +1`, 'success');
    } else {
      showFeedback(`✓ Hit! +1 • ${side} target`, 'success');
    }
    
    // Update accuracy
    const total = hitsRef.current + missesRef.current;
    if (total > 0) {
      setAccuracy(Math.round((hitsRef.current / total) * 100));
    }
  };

  const handleMiss = (reason) => {
    if (!isActiveRef.current || gameStateRef.current !== 'playing') return;
    
    missesRef.current++;
    setMisses(prev => prev + 1);
    
    streakRef.current = 0;
    setStreak(0);
    
    // Check lives
    if (livesRef.current > 0) {
      livesRef.current--;
      setLives(livesRef.current);
      playSound('miss');
      
      if (livesRef.current === 0) {
        playSound('lifeLost');
        showFeedback(`Out of lives! Penalty now active!`, 'warning');
      } else {
        showFeedback(`✗ ${reason}! No penalty • ${livesRef.current} lives left`, 'error');
      }
    } else {
      // Apply penalty
      scoreRef.current = Math.max(0, scoreRef.current - PENALTY);
      setScore(scoreRef.current);
      playSound('miss');
      showFeedback(`✗ ${reason}! -${PENALTY} point penalty`, 'error');
    }
    
    // Update accuracy
    const total = hitsRef.current + missesRef.current;
    if (total > 0) {
      setAccuracy(Math.round((hitsRef.current / total) * 100));
    }
  };

  const createShape = useCallback((side) => {
    if (!isActiveRef.current || gameStateRef.current !== 'playing') return;
    
    const container = side === 'left' ? leftContainerRef.current : rightContainerRef.current;
    const targetGlyph = side === 'left' ? leftTarget : rightTarget;
    
    if (!container) return;
    
    const el = document.createElement('div');
    el.style.position = 'absolute';
    el.style.fontSize = '6.8rem';
    el.style.color = isBoxDarkMode ? '#d1d5db' : '#4a5568';
    el.style.cursor = 'pointer';
    el.style.lineHeight = '1';
    el.style.willChange = 'transform, left';
    el.style.textShadow = '0 0 6px rgba(209, 213, 219, 0.2)';
    el.style.transition = 'transform 0.1s ease-out';
    el.style.zIndex = '10';
    
    const isTarget = Math.random() < 0.35;
    const shapes = shapesRef.current;
    let glyph = isTarget ? targetGlyph : shapes[Math.floor(Math.random() * shapes.length)];
    
    // Prevent accidental target overlap
    if (!isTarget && glyph === targetGlyph) {
      glyph = shapes.find(s => s !== targetGlyph) || '■';
    }
    
    el.textContent = glyph;
    
    const containerRect = container.getBoundingClientRect();
    const startX = side === 'left' ? containerRect.width : -120;
    const endX = side === 'left' ? -120 : containerRect.width;
    
    const top = Math.random() * (containerRect.height - 150);
    el.style.top = `${top}px`;
    el.style.left = `${startX}px`;
    
    container.appendChild(el);
    
    const speed = 3.8;
    const duration = 4000 / speed;
    const startTime = performance.now();
    let hit = false;
    
    const handleClick = (e) => {
      e.stopPropagation();
      if (hit) return;
      
      if (glyph === targetGlyph) {
        hit = true;
        el.style.color = '#60a5fa';
        el.style.textShadow = '0 0 20px #60a5fa';
        handleHit(side);
      } else {
        handleMiss('WRONG SHAPE');
      }
    };
    
    el.addEventListener('mousedown', handleClick);
    
    function animate(currentTime) {
      if (!el.isConnected) return;
      
      const elapsed = currentTime - startTime;
      const progress = elapsed / duration;
      
      if (progress < 1) {
        const currentX = startX + (endX - startX) * progress;
        el.style.left = `${currentX}px`;
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        el.removeEventListener('mousedown', handleClick);
        el.remove();
        
        // If it was a target and wasn't hit, count as miss
        if (glyph === targetGlyph && !hit && isActiveRef.current && gameStateRef.current === 'playing') {
          handleMiss('TIMEOUT');
        }
      }
    }
    
    animationFrameRef.current = requestAnimationFrame(animate);
  }, [leftTarget, rightTarget, isBoxDarkMode]);

  const clearAllIntervals = () => {
    if (spawnIntervalLeftRef.current) clearInterval(spawnIntervalLeftRef.current);
    if (spawnIntervalRightRef.current) clearInterval(spawnIntervalRightRef.current);
    if (targetIntervalRef.current) clearInterval(targetIntervalRef.current);
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
  };

  const startGame = () => {
    // Clear existing intervals
    clearAllIntervals();
    
    // Clear containers
    if (leftContainerRef.current) leftContainerRef.current.innerHTML = '';
    if (rightContainerRef.current) rightContainerRef.current.innerHTML = '';
    
    // Reset state
    setGameState('playing');
    gameStateRef.current = 'playing';
    setScore(0);
    setLives(3);
    setTimeLeft(60);
    setStreak(0);
    setSuccessfulHits(0);
    setMisses(0);
    setAccuracy(100);
    setFeedback('');
    
    scoreRef.current = 0;
    livesRef.current = 3;
    streakRef.current = 0;
    hitsRef.current = 0;
    missesRef.current = 0;
    isActiveRef.current = true;
    
    // Initialize targets
    initTargets();
    
    // Start spawn intervals
    spawnIntervalLeftRef.current = setInterval(() => createShape('left'), 600);
    spawnIntervalRightRef.current = setInterval(() => createShape('right'), 600);
    
    // Refresh targets every 30 seconds
    targetIntervalRef.current = setInterval(() => {
      if (isActiveRef.current) {
        initTargets();
        showFeedback('🔄 Targets changed!', 'success');
      }
    }, 30000);
    
    // Timer
    timerIntervalRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          // Game over
          setGameState('gameOver');
          gameStateRef.current = 'gameOver';
          isActiveRef.current = false;
          clearAllIntervals();
          
          // Clear shapes
          if (leftContainerRef.current) leftContainerRef.current.innerHTML = '';
          if (rightContainerRef.current) rightContainerRef.current.innerHTML = '';
          
          // Update best score
          updateBestScore(scoreRef.current);
          
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    showFeedback('Go! Click on target shapes!', 'success');
  };

  const resetGame = () => {
    clearAllIntervals();
    isActiveRef.current = false;
    setGameState('start');
    gameStateRef.current = 'start';
    
    // Clear containers
    if (leftContainerRef.current) leftContainerRef.current.innerHTML = '';
    if (rightContainerRef.current) rightContainerRef.current.innerHTML = '';
  };

  const refreshTargets = () => {
    if (gameState === 'playing') {
      initTargets();
      showFeedback('🔄 Targets refreshed!', 'success');
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearAllIntervals();
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
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
              <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Dual-Target Flow</h1>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>+1 correct • -1 penalty after lives empty • 3 lives • 60s</p>
              </div>
            </div>
            <div className="flex gap-2">
              {gameState === 'playing' && (
                <button onClick={refreshTargets} className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`} title="Refresh targets">
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
          <StatCard icon={<Target className="text-blue-600" />} value={score} label="Score" isDark={isDarkMode} />
          <StatCard icon={<Trophy className="text-yellow-500" />} value={bestScore} label="Best Score" isDark={isDarkMode} />
          <StatCard icon={<Timer className={timeLeft < 15 ? 'text-red-600' : 'text-green-600'} />} value={timeLeft} label="Time" unit="s" isDark={isDarkMode} />
          <StatCard icon={<Activity className={lives === 0 ? 'text-yellow-500' : 'text-green-500'} />} value={lives} label="Lives" isDark={isDarkMode} />
          <StatCard icon={<Zap className="text-orange-500" />} value={streak} label="Streak" isDark={isDarkMode} />
          <StatCard icon={<Award className="text-purple-500" />} value={bestStreak} label="Best Streak" isDark={isDarkMode} />
        </div>

        {/* Feedback Bar */}
        <div className="h-8 mb-2 flex justify-center items-center">
          <div className={`px-4 py-1 rounded-lg text-white font-medium text-sm transition-opacity duration-150 ${feedback ? 'opacity-100' : 'opacity-0'} ${
            feedbackType === 'success' ? 'bg-green-500' : feedbackType === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
          }`}>
            {feedback || 'placeholder'}
          </div>
        </div>

        {/* Game Canvas Box */}
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
        >
          {/* Target Headers */}
          <div className="absolute top-5 w-full flex justify-between px-16 z-20 pointer-events-none">
            <div className="flex flex-col items-center gap-1">
              <span className={`text-sm tracking-wider font-bold ${isBoxDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>LEFT TARGET</span>
              <span className={`text-6xl ${isBoxDarkMode ? 'text-white' : 'text-gray-800'}`} style={{ textShadow: '0 0 15px rgba(255,255,255,0.4)' }}>
                {leftTarget}
              </span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className={`text-sm tracking-wider font-bold ${isBoxDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>RIGHT TARGET</span>
              <span className={`text-6xl ${isBoxDarkMode ? 'text-white' : 'text-gray-800'}`} style={{ textShadow: '0 0 15px rgba(255,255,255,0.4)' }}>
                {rightTarget}
              </span>
            </div>
          </div>

          {/* Divider Line */}
          <div className="absolute top-0 left-1/2 w-px h-full bg-white/5 z-10" />

          {/* Flow Containers */}
          <div 
            ref={leftContainerRef}
            className="absolute top-0 left-0 w-1/2 h-full overflow-hidden"
          />
          <div 
            ref={rightContainerRef}
            className="absolute top-0 right-0 w-1/2 h-full overflow-hidden"
          />

          {isFullscreen && gameState === 'playing' && (
            <div className="absolute top-4 right-4 z-30 flex gap-3">
              <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 bg-black/50 rounded-lg text-white hover:bg-black/70 transition-all">{isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}</button>
              <button onClick={() => setIsBoxDarkMode(!isBoxDarkMode)} className="p-2 bg-black/50 rounded-lg text-white hover:bg-black/70 transition-all"><Eye className="w-5 h-5" /></button>
              <button onClick={() => setSoundEnabled(!soundEnabled)} className="p-2 bg-black/50 rounded-lg text-white hover:bg-black/70 transition-all">{soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}</button>
              <button onClick={toggleFullscreen} className="p-2 bg-black/50 rounded-lg text-white hover:bg-black/70 transition-all"><Minimize2 className="w-5 h-5" /></button>
            </div>
          )}

          {/* Start Screen */}
          {gameState === 'start' && (
            <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
              <div className={`rounded-2xl p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <Target className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                <h3 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Dual-Target Flow</h3>
                <p className={`mb-6 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>60-second challenge • Click matching shapes • 3 lives protection</p>
                <button 
                  onClick={startGame} 
                  className="px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg w-full transition-all transform hover:scale-[1.02] active:scale-[0.98]"
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
                  <h3 className={`text-2xl font-bold ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Time's Up!
                  </h3>
                </div>
                
                <p className={`text-center mb-6 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  60 seconds completed!
                </p>
                
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <ResultCard label="Final Score" value={score} icon={<Target className="w-4 h-4" />} color="text-blue-500" />
                  <ResultCard label="Best Score" value={bestScore} icon={<Trophy className="w-4 h-4" />} color="text-yellow-500" />
                  <ResultCard label="Best Streak" value={bestStreak} icon={<Zap className="w-4 h-4" />} color="text-orange-500" />
                  <ResultCard label="Accuracy" value={accuracy} unit="%" icon={<Activity className="w-4 h-4" />} color="text-purple-500" />
                  <ResultCard label="Hits" value={successfulHits} icon={<Target className="w-4 h-4" />} color="text-green-500" />
                  <ResultCard label="Misses" value={misses} icon={<RefreshCw className="w-4 h-4" />} color="text-red-500" />
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
                    className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98]"
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
                  <Info className={`w-4 h-4 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                  <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Drill Rules & Scoring</h3>
                </div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">1</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-blue-500">Click matching shapes</span> that match your assigned targets
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">2</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Targets change <span className="font-semibold text-green-500">every 30 seconds</span> - stay alert!
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-cyan-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">3</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Shapes flow from <span className="font-semibold text-cyan-500">center outward</span> in both directions
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">4</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-emerald-500">+1 point per correct hit</span>
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
                  <span>🛡️ Lives protect your score • Refresh targets manually with ↻ button</span>
                  <span>⚡ Score never goes below 0</span>
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
                   color === 'text-green-500' ? 'bg-green-500/10' :
                   color === 'text-purple-500' ? 'bg-purple-500/10' : 'bg-red-500/10';
  
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