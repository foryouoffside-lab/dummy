'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Maximize2, Minimize2, Sun, Moon, 
  Eye, Volume2, VolumeX, Info, Activity, Target, Clock, Award, Trophy, Zap, RefreshCw, Heart
} from 'lucide-react';

export default function SwitchCostIntegratorPage() {
  const [loading, setLoading] = useState(true);
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  
  const [gameState, setGameState] = useState('start');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isBoxDarkMode, setIsBoxDarkMode] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  
  // Game state
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
  const [orbMode, setOrbMode] = useState('direct');
  const [currentInterval, setCurrentInterval] = useState(1000);
  
  // Refs
  const gameStateRef = useRef({
    mx: 0,
    my: 0,
    orb: { x: 0, y: 0, targetX: 0, mode: 'direct' },
    score: 0,
    lives: 3,
    streakCount: 0,
    hits: 0,
    misses: 0,
    wrongClicks: 0,
    isGameActive: false,
    isOrbActive: false,
    currentInterval: 1000
  });

  const timerIntervalRef = useRef(null);
  const feedbackTimeoutRef = useRef(null);
  const orbTimeoutRef = useRef(null);
  const audioCtxRef = useRef(null);

  // Penalty settings
  const WRONG_CLICK_PENALTY = 1;
  const BALL_RADIUS = 20;

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  // Load best scores
  useEffect(() => {
    const savedBestScore = localStorage.getItem('switchCostIntegratorBestScore');
    const savedBestStreak = localStorage.getItem('switchCostIntegratorBestStreak');
    
    if (savedBestScore) setBestScore(parseInt(savedBestScore, 10));
    if (savedBestStreak) setBestStreak(parseInt(savedBestStreak, 10));
  }, []);

  // Update best score
  const updateBestScore = (finalScore) => {
    const currentBestScore = parseInt(localStorage.getItem('switchCostIntegratorBestScore') || '0', 10);
    if (finalScore > currentBestScore) {
      localStorage.setItem('switchCostIntegratorBestScore', finalScore.toString());
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
      } else if (type === 'wrongClick') {
        osc.frequency.value = 220;
        gain.gain.value = 0.15;
        osc.start();
        gain.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 0.2);
        osc.stop(audioCtx.currentTime + 0.2);
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
    const total = state.hits + state.wrongClicks;
    if (total > 0) {
      setAccuracy(Math.round((state.hits / total) * 100));
    } else {
      setAccuracy(100);
    }
  };

  // Adaptive speed based on performance
  const updateSpeed = useCallback(() => {
    const state = gameStateRef.current;
    const totalAttempts = state.hits + state.wrongClicks;
    
    if (totalAttempts > 0) {
      const acc = (state.hits / totalAttempts) * 100;
      
      if (acc >= 75 && state.currentInterval > 400) {
        state.currentInterval = Math.max(400, state.currentInterval - 50);
        setCurrentInterval(state.currentInterval);
        playSound('speedUp');
        showFeedback(`⚡ Speed increased! ${state.currentInterval}ms`, 'success');
      } else if (acc < 45 && state.currentInterval < 1000) {
        state.currentInterval = Math.min(1000, state.currentInterval + 50);
        setCurrentInterval(state.currentInterval);
        showFeedback(`🐢 Speed adjusted: ${state.currentInterval}ms`, 'warning');
      }
    }
  }, []);

  const clearOrbTimeout = useCallback(() => {
    if (orbTimeoutRef.current) {
      clearTimeout(orbTimeoutRef.current);
      orbTimeoutRef.current = null;
    }
  }, []);

  const spawnOrb = useCallback(() => {
    const state = gameStateRef.current;
    const cvs = canvasRef.current;
    if (!cvs || !state.isGameActive) return;
    
    clearOrbTimeout();
    
    const padding = 200;
    const isTop = Math.random() > 0.5;
    const isLeft = Math.random() > 0.5;
    
    state.orb.y = isTop ? cvs.height * 0.25 : cvs.height * 0.75;
    state.orb.x = isLeft ? padding : cvs.width - padding;
    state.orb.mode = isTop ? 'opposite' : 'direct';
    setOrbMode(state.orb.mode);
    
    if (state.orb.mode === 'direct') {
      state.orb.targetX = state.orb.x;
    } else {
      state.orb.targetX = isLeft ? cvs.width - padding : padding;
    }
    
    state.isOrbActive = true;
    
    orbTimeoutRef.current = setTimeout(() => {
      if (gameStateRef.current.isGameActive && gameStateRef.current.isOrbActive) {
        triggerTimeout();
      }
    }, state.currentInterval);
  }, [clearOrbTimeout]);

  const triggerTimeout = useCallback(() => {
    const state = gameStateRef.current;
    if (!state.isGameActive || !state.isOrbActive) return;
    
    state.isOrbActive = false;
    
    state.misses++;
    setMisses(state.misses);
    state.streakCount = 0;
    setStreak(0);
    
    if (state.lives > 0) {
      state.lives--;
      setLives(state.lives);
      playSound('miss');
      
      if (state.lives === 0) {
        playSound('lifeLost');
        showFeedback(`Out of lives! Wrong clicks now cost points!`, 'warning');
      } else {
        showFeedback(`⏰ Timeout! No penalty • ${state.lives}  left`, 'error');
      }
    } else {
      // No penalty on timeout - just show message
      showFeedback(`⏰ Timeout! No penalty`, 'error');
    }
    
    // Don't count timeouts in accuracy calculation anymore
    // Only wrong clicks affect accuracy
    
    clearOrbTimeout();
    
    setTimeout(() => {
      if (gameStateRef.current.isGameActive) {
        spawnOrb();
      }
    }, 200);
  }, [spawnOrb, clearOrbTimeout]);

  const handleHit = useCallback((e) => {
    const state = gameStateRef.current;
    if (!state.isGameActive || !state.isOrbActive) return;
    
    // Check if click is within the ball radius
    const dist = Math.hypot(state.mx - state.orb.targetX, state.my - state.orb.y);
    
    state.isOrbActive = false;
    clearOrbTimeout();
    
    if (dist < BALL_RADIUS) {
      // Correct click
      state.hits++;
      state.score++;
      state.streakCount++;
      state.wrongClicks = state.wrongClicks || 0; // Ensure it exists
      setSuccessfulHits(state.hits);
      setScore(state.score);
      setStreak(state.streakCount);
      
      playSound('hit');
      showFeedback(`✓ Hit! +1 point`, 'success');
      
      if (state.streakCount > bestStreak) {
        setBestStreak(state.streakCount);
        localStorage.setItem('switchCostIntegratorBestStreak', state.streakCount.toString());
      }
      
      if (state.streakCount % 5 === 0 && state.streakCount > 0) {
        playSound('streak');
        showFeedback(`🔥 ${state.streakCount} Streak!`, 'success');
      }
    } else {
      // Wrong click - only apply penalty here
      state.wrongClicks++;
      state.streakCount = 0;
      setStreak(0);
      
      if (state.lives > 0) {
        state.lives--;
        setLives(state.lives);
        playSound('wrongClick');
        
        if (state.lives === 0) {
          playSound('lifeLost');
          showFeedback(`Wrong click! Last life lost • Penalties now active`, 'warning');
        } else {
          showFeedback(`Wrong click! Remaining lives: ${state.lives} `, 'error');
        }
      } else {
        // Apply penalty when out of lives
        state.score = Math.max(0, state.score - WRONG_CLICK_PENALTY);
        setScore(state.score);
        playSound('wrongClick');
        showFeedback(`Wrong click! -${WRONG_CLICK_PENALTY} point`, 'error');
      }
    }
    
    updateAccuracy();
    
    if ((state.hits + state.wrongClicks) % 5 === 0) {
      updateSpeed();
    }
    
    setTimeout(() => {
      if (gameStateRef.current.isGameActive) {
        spawnOrb();
      }
    }, 200);
  }, [bestStreak, WRONG_CLICK_PENALTY, spawnOrb, updateSpeed, clearOrbTimeout]);

  // Main game loop
  useEffect(() => {
    if (gameState !== 'playing') return;

    const cvs = canvasRef.current;
    if (!cvs) return;
    const ctx = cvs.getContext('2d', { alpha: false, desynchronized: true });

    const updateCanvasSize = () => {
      const container = containerRef.current;
      if (!container) return;
      const containerRect = container.getBoundingClientRect();
      let width = containerRect.width;
      let height = width * (9 / 16);
      if (height > containerRect.height) {
        height = containerRect.height;
        width = height * (16 / 9);
      }
      cvs.width = width;
      cvs.height = height;
      cvs.style.position = 'absolute';
      cvs.style.left = `${(containerRect.width - width) / 2}px`;
      cvs.style.top = `${(containerRect.height - height) / 2}px`;
    };

    const resizeObserver = new ResizeObserver(updateCanvasSize);
    if (containerRef.current) resizeObserver.observe(containerRef.current);
    window.addEventListener('resize', updateCanvasSize);
    updateCanvasSize();

    function draw() {
      const state = gameStateRef.current;

      ctx.fillStyle = isBoxDarkMode ? "#000" : "#f9fafb";
      ctx.fillRect(0, 0, cvs.width, cvs.height);

      // Midline Horizontal
      ctx.strokeStyle = isBoxDarkMode ? "#222" : "#e5e7eb";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, cvs.height/2);
      ctx.lineTo(cvs.width, cvs.height/2);
      ctx.stroke();

      // Draw Shadow Ball for opposite mode
      if (state.orb.mode === 'opposite') {
        ctx.beginPath();
        ctx.arc(state.orb.targetX, state.orb.y, BALL_RADIUS, 0, Math.PI * 2);
        ctx.fillStyle = isBoxDarkMode ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.1)";
        ctx.fill();
        ctx.strokeStyle = isBoxDarkMode ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.2)";
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // Draw The Stimulus Orb
      ctx.beginPath();
      ctx.arc(state.orb.x, state.orb.y, BALL_RADIUS, 0, Math.PI * 2);
      ctx.fillStyle = isBoxDarkMode ? "#FFF" : "#000";
      ctx.fill();
      
      // Orb glow
      ctx.beginPath();
      ctx.arc(state.orb.x, state.orb.y, BALL_RADIUS + 6, 0, Math.PI * 2);
      ctx.fillStyle = isBoxDarkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)";
      ctx.fill();

      // Target indicator ring
      ctx.beginPath();
      ctx.arc(state.orb.targetX, state.orb.y, BALL_RADIUS, 0, Math.PI * 2);
      ctx.strokeStyle = isBoxDarkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Cursor
      ctx.beginPath();
      ctx.arc(state.mx, state.my, 5, 0, Math.PI * 2);
      ctx.fillStyle = isBoxDarkMode ? "#FFF" : "#000";
      ctx.fill();

      animationRef.current = requestAnimationFrame(draw);
    }

    const handleMouseMove = (e) => {
      const rect = cvs.getBoundingClientRect();
      gameStateRef.current.mx = e.clientX - rect.left;
      gameStateRef.current.my = e.clientY - rect.top;
    };
    
    const handleClick = (e) => {
      if (gameState !== 'playing') return;
      const rect = cvs.getBoundingClientRect();
      gameStateRef.current.mx = e.clientX - rect.left;
      gameStateRef.current.my = e.clientY - rect.top;
      handleHit(e);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    cvs.addEventListener('click', handleClick);
    
    animationRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('mousemove', handleMouseMove);
      if (cvs) cvs.removeEventListener('click', handleClick);
      window.removeEventListener('resize', updateCanvasSize);
      resizeObserver.disconnect();
    };
  }, [gameState, isBoxDarkMode, handleHit]);

  const endGame = () => {
    const state = gameStateRef.current;
    state.isGameActive = false;
    state.isOrbActive = false;
    setGameState('gameOver');
    
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    clearOrbTimeout();
    
    updateBestScore(state.score);
  };

  const startGame = () => {
    const state = gameStateRef.current;
    
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    clearOrbTimeout();
    
    state.score = 0;
    state.lives = 3;
    state.streakCount = 0;
    state.hits = 0;
    state.misses = 0;
    state.wrongClicks = 0;
    state.isGameActive = true;
    state.isOrbActive = false;
    state.currentInterval = 1000;
    
    setScore(0);
    setLives(3);
    setStreak(0);
    setSuccessfulHits(0);
    setMisses(0);
    setAccuracy(100);
    setTimeLeft(60);
    setCurrentInterval(1000);
    setGameState('playing');
    
    setTimeout(() => spawnOrb(), 50);
    
    timerIntervalRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          endGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    showFeedback('60 seconds • Click the target zone!', 'success');
  };

  const resetGame = () => {
    gameStateRef.current.isGameActive = false;
    gameStateRef.current.isOrbActive = false;
    setGameState('start');
    
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    clearOrbTimeout();
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
  };

  useEffect(() => {
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      clearOrbTimeout();
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    };
  }, [clearOrbTimeout]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
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
              <div className="p-3 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Switch-Cost Integrator</h1>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>+1 correct • -1 wrong click • 3  • 60s</p>
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
            overflow: 'hidden',
            cursor: 'none'
          }}
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

          <canvas
            ref={canvasRef}
            style={{ 
              display: 'block',
              position: 'absolute',
              width: '100%',
              height: '100%'
            }}
          />

          {/* Start Screen */}
          {gameState === 'start' && (
            <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
              <div className={`rounded-2xl p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <Activity className="w-16 h-16 text-purple-500 mx-auto mb-4" />
                <h3 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Switch-Cost Integrator</h3>
                <p className={`mb-6 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>60-second challenge • Click the target zone</p>
                <button 
                  onClick={startGame} 
                  className="px-8 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg w-full transition-all transform hover:scale-[1.02] active:scale-[0.98]"
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
                  <ResultCard label="Hits" value={successfulHits} icon={<Target className="w-4 h-4" />} color="text-green-500" isDark={isBoxDarkMode} />
                  <ResultCard label="Wrong Clicks" value={gameStateRef.current.wrongClicks || 0} icon={<RefreshCw className="w-4 h-4" />} color="text-red-500" isDark={isBoxDarkMode} />
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
                    className="flex-1 px-4 py-2.5 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98]"
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
                  <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Drill Rules & Scoring</h3>
                </div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">1</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-purple-500">TOP ZONE:</span> Click the shadow on OPPOSITE side
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">2</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-blue-500">BOTTOM ZONE:</span> Click the orb on SAME side
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-cyan-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">3</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Speed adapts <span className="font-semibold text-cyan-500">1000ms → 400ms</span> based on accuracy
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
                        <span className="font-semibold text-red-500">-1 point for wrong clicks</span> (only when out of lives)
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-pink-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">6</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-pink-500">3  protection</span> • Timeouts are penalty-free, wrong clicks cost lives
                      </p>
                    </div>
                  </div>
                </div>
                <div className={`mt-3 pt-3 border-t text-xs ${isDarkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'} flex items-center justify-between`}>
                  <span>🎯 Click the orb or shadow • Shadow shows target for opposite mode</span>
                  <span>⚡ Best Score saves locally</span>
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