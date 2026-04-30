'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Target, Zap, Clock, Award, Activity, 
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, 
  Eye, Timer, Brain, X, Trophy, Info, RefreshCw
} from 'lucide-react';

export default function SustainedInterceptElitePage() {
  const [loading, setLoading] = useState(true);
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
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
  const [targetTime, setTargetTime] = useState(1000);
  const [lastError, setLastError] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [misses, setMisses] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  const [state, setState] = useState('TARGET');
  const [displayTimer, setDisplayTimer] = useState(1.5);
  const [perfectHits, setPerfectHits] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [clickedTime, setClickedTime] = useState(0);
  
  const scoreRef = useRef(0);
  const streakRef = useRef(0);
  const targetTimeRef = useRef(1000);
  const lastErrorRef = useRef(0);
  const stateRef = useRef('TARGET');
  const startTimeRef = useRef(0);
  const displayTimerRef = useRef(1.5);
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const lastFrameTimeRef = useRef(performance.now());
  const totalAttemptsRef = useRef(0);
  const hitsRef = useRef(0);
  const perfectHitsRef = useRef(0);
  const timerIntervalRef = useRef(null);
  const feedbackTimeoutRef = useRef(null);
  const isActiveRef = useRef(false);
  const gameStateRef = useRef('start');
  const audioCtxRef = useRef(null);
  const clickedTimeRef = useRef(0);

  // Penalty settings
  const PENALTY = 1;

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  // Load best score from localStorage
  useEffect(() => {
    const savedBestScore = localStorage.getItem('sustainedInterceptBestScore');
    const savedBestStreak = localStorage.getItem('sustainedInterceptBestStreak');
    if (savedBestScore) setBestScore(parseInt(savedBestScore, 10));
    if (savedBestStreak) setBestStreak(parseInt(savedBestStreak, 10));
  }, []);

  // Update best score ONLY when game ends
  const updateBestScore = (finalScore) => {
    const currentBestScore = parseInt(localStorage.getItem('sustainedInterceptBestScore') || '0', 10);
    if (finalScore > currentBestScore) {
      localStorage.setItem('sustainedInterceptBestScore', finalScore.toString());
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
      
      if (type === 'perfect') {
        osc.frequency.value = 1046.5;
        gain.gain.value = 0.12;
      } else if (type === 'good') {
        osc.frequency.value = 880;
        gain.gain.value = 0.1;
      } else if (type === 'miss') {
        osc.frequency.value = 440;
        gain.gain.value = 0.1;
      } else if (type === 'streak') {
        osc.frequency.value = 1318.52;
        gain.gain.value = 0.15;
      } else if (type === 'ready') {
        osc.frequency.value = 660;
        gain.gain.value = 0.08;
      }
      osc.start();
      gain.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 0.12);
      osc.stop(audioCtx.currentTime + 0.12);
    } catch (e) {}
  };

  // Calculate accuracy
  const updateAccuracy = useCallback(() => {
    const total = totalAttemptsRef.current;
    if (total > 0) {
      const acc = (hitsRef.current / total) * 100;
      setAccuracy(Math.round(acc));
    } else {
      setAccuracy(100);
    }
  }, []);

  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      timerIntervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setGameState('gameOver');
            gameStateRef.current = 'gameOver';
            isActiveRef.current = false;
            
            // Update best score
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

  const handleMiss = useCallback((reason) => {
    if (!isActiveRef.current) return;
    
    totalAttemptsRef.current++;
    setMisses(prev => prev + 1);
    
    streakRef.current = 0;
    setStreak(0);
    
    // Apply penalty on every miss
    scoreRef.current = Math.max(0, scoreRef.current - PENALTY);
    setScore(scoreRef.current);
    playSound('miss');
    showFeedback(`✗ ${reason}! -${PENALTY} point penalty`, 'error');
    
    updateAccuracy();
  }, [PENALTY, updateAccuracy]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const cvs = canvasRef.current;
      if (!cvs) return;
      
      const rect = cvs.getBoundingClientRect();
      const scaleX = cvs.width / rect.width;
      const scaleY = cvs.height / rect.height;
      
      const canvasX = (e.clientX - rect.left) * scaleX;
      const canvasY = (e.clientY - rect.top) * scaleY;
      
      mousePositionRef.current = { x: canvasX, y: canvasY };
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const generateNewRound = useCallback(() => {
    if (!isActiveRef.current) return;
    const newTargetTime = 1000 + Math.random() * 7000;
    targetTimeRef.current = newTargetTime;
    setTargetTime(newTargetTime);
    stateRef.current = 'TARGET';
    setState('TARGET');
    displayTimerRef.current = 1.5;
    setDisplayTimer(1.5);
    playSound('ready');
  }, []);

  useEffect(() => {
    const handleMouseDown = () => {
      if (gameState !== 'playing' || !isActiveRef.current) return;
      
      if (stateRef.current === 'TIMER') {
        const now = performance.now();
        const elapsed = now - startTimeRef.current;
        const error = elapsed - targetTimeRef.current;
        lastErrorRef.current = error;
        setLastError(error);
        clickedTimeRef.current = elapsed;
        setClickedTime(elapsed);
        
        totalAttemptsRef.current++;
        const errorAbs = Math.abs(error);
        
        if (errorAbs < 150) {
          // Hit!
          hitsRef.current++;
          if (errorAbs < 25) {
            perfectHitsRef.current++;
            setPerfectHits(perfectHitsRef.current);
            playSound('perfect');
          } else {
            playSound('good');
          }
          
          // +1 point per hit (regardless of accuracy tier)
          scoreRef.current += 1;
          setScore(scoreRef.current);
          
          const newStreak = streakRef.current + 1;
          streakRef.current = newStreak;
          setStreak(newStreak);
          
          if (newStreak > bestStreak) {
            setBestStreak(newStreak);
            localStorage.setItem('sustainedInterceptBestStreak', newStreak.toString());
          }
          
          if (newStreak % 5 === 0 && newStreak > 0) {
            playSound('streak');
            showFeedback(`🔥 ${newStreak} Streak! +1`, 'success');
          } else {
            const rating = errorAbs < 25 ? 'PERFECT' : errorAbs < 75 ? 'GOOD' : 'OK';
            showFeedback(`✓ ${rating}! +1 point`, 'success');
          }
          
          updateAccuracy();
        } else {
          handleMiss('MISS');
        }
        
        stateRef.current = 'RESULT';
        setState('RESULT');
      } else if (stateRef.current === 'RESULT') {
        generateNewRound();
      }
    };
    
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('contextmenu', (e) => e.preventDefault());
    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('contextmenu', (e) => e.preventDefault());
    };
  }, [gameState, bestStreak, handleMiss, generateNewRound, updateAccuracy]);

  useEffect(() => {
    return () => {
      isActiveRef.current = false;
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (gameState !== 'playing') return;

    const cvs = canvasRef.current;
    if (!cvs) return;
    const ctx = cvs.getContext('2d');

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
    
    generateNewRound();
    let lastFrameTime = performance.now();

    function update(dt) {
      if (!isActiveRef.current) return;
      
      if (stateRef.current === 'TARGET') {
        displayTimerRef.current -= dt;
        setDisplayTimer(displayTimerRef.current);
        
        if (displayTimerRef.current <= 0) {
          stateRef.current = 'TIMER';
          setState('TIMER');
          startTimeRef.current = performance.now();
        }
      }
    }

    function draw() {
      const now = performance.now();
      const dt = Math.min(0.033, (now - lastFrameTime) / 1000);
      lastFrameTime = now;
      
      update(dt);
      
      const cx = cvs.width / 2;
      const cy = cvs.height / 2;
      
      ctx.fillStyle = isBoxDarkMode ? "#020202" : "#f9fafb";
      ctx.fillRect(0, 0, cvs.width, cvs.height);
      
      // Subtle grid pattern
      ctx.strokeStyle = isBoxDarkMode ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)';
      ctx.lineWidth = 1;
      for (let i = 0; i < cvs.width; i += 40) {
        ctx.beginPath();
        ctx.moveTo(i, 0); ctx.lineTo(i, cvs.height); ctx.stroke();
      }
      
      if (stateRef.current === 'TARGET') {
        ctx.fillStyle = isBoxDarkMode ? "#FFFFFF" : "#000000";
        ctx.font = "bold 50px monospace";
        ctx.textAlign = "center";
        ctx.fillText(`${(targetTimeRef.current / 1000).toFixed(3)}s`, cx, cy);
        
        ctx.fillStyle = "#00ff88";
        ctx.font = "14px monospace";
        ctx.fillText("TARGET", cx, cy + 50);
      }
      
      if (stateRef.current === 'TIMER') {
        const elapsed = performance.now() - startTimeRef.current;
        ctx.fillStyle = isBoxDarkMode ? "#FFFFFF" : "#000000";
        ctx.font = "bold 80px monospace";
        ctx.textAlign = "center";
        ctx.fillText((elapsed / 1000).toFixed(3), cx, cy);
        
        ctx.fillStyle = "#00ff88";
        ctx.font = "14px monospace";
        ctx.fillText("CLICK", cx, cy + 60);
      }
      
      if (stateRef.current === 'RESULT') {
        const error = lastErrorRef.current;
        const errorAbs = Math.abs(error);
        let rating = '';
        let color = '';
        
        if (errorAbs < 25) {
          rating = 'PERFECT';
          color = '#00ff88';
        } else if (errorAbs < 75) {
          rating = 'GOOD';
          color = '#00FFFF';
        } else if (errorAbs < 150) {
          rating = 'OK';
          color = '#FFA500';
        } else {
          rating = 'MISS';
          color = '#FF3E3E';
        }
        
        ctx.fillStyle = color;
        ctx.font = "bold 50px monospace";
        ctx.textAlign = "center";
        ctx.fillText(rating, cx, cy - 40);
        
        ctx.fillStyle = isBoxDarkMode ? "#888" : "#666";
        ctx.font = "20px monospace";
        ctx.fillText(`${(clickedTimeRef.current / 1000).toFixed(3)}s`, cx, cy + 10);
        
        ctx.fillStyle = color;
        ctx.font = "16px monospace";
        ctx.fillText(`${error > 0 ? '+' : ''}${error.toFixed(0)}ms`, cx, cy + 40);
        
        // Click to continue
        ctx.fillStyle = "#00ff88";
        ctx.font = "12px monospace";
        ctx.fillText("Click to continue", cx, cy + 80);
      }

      // Rounded Cursor Circle
      const m = mousePositionRef.current;
      if (m.x > 0 && m.x < cvs.width && m.y > 0 && m.y < cvs.height) {
        // Outer ring
        ctx.beginPath();
        ctx.arc(m.x, m.y, 10, 0, Math.PI * 2);
        ctx.strokeStyle = "#00ff88";
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Inner dot
        ctx.beginPath();
        ctx.arc(m.x, m.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = "#00ff88";
        ctx.fill();
        
        // Crosshair lines
        ctx.strokeStyle = "rgba(0, 255, 136, 0.3)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(m.x - 20, m.y); ctx.lineTo(m.x - 14, m.y);
        ctx.moveTo(m.x + 14, m.y); ctx.lineTo(m.x + 20, m.y);
        ctx.moveTo(m.x, m.y - 20); ctx.lineTo(m.x, m.y - 14);
        ctx.moveTo(m.x, m.y + 14); ctx.lineTo(m.x, m.y + 20);
        ctx.stroke();
      }

      animationRef.current = requestAnimationFrame(draw);
    }

    animationRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', updateCanvasSize);
      resizeObserver.disconnect();
    };
  }, [gameState, isBoxDarkMode, generateNewRound]);

  const startGame = () => {
    setGameState('playing');
    gameStateRef.current = 'playing';
    setScore(0);
    setStreak(0);
    setTargetTime(1000);
    setLastError(0);
    setTimeLeft(60);
    setMisses(0);
    setFeedback('');
    setPerfectHits(0);
    setAccuracy(100);
    setClickedTime(0);
    
    isActiveRef.current = true;
    scoreRef.current = 0;
    streakRef.current = 0;
    totalAttemptsRef.current = 0;
    hitsRef.current = 0;
    perfectHitsRef.current = 0;
    
    generateNewRound();
    showFeedback('60 seconds • Click at target time!', 'success');
  };

  const resetGame = () => {
    isActiveRef.current = false;
    setGameState('start');
    gameStateRef.current = 'start';
    setScore(0);
    setStreak(0);
    setTargetTime(1000);
    setLastError(0);
    setTimeLeft(60);
    setMisses(0);
    setFeedback('');
    setAccuracy(100);
    
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
  };

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
        <div className="mb-6">
          <Link href="/drills/motor" className={`inline-flex items-center gap-2 mb-4 ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>
            <ArrowLeft className="w-4 h-4" /> Back to Motor Drills
          </Link>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl">
                <Timer className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Sustained Intercept</h1>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>+1 per hit • -1 per miss • 60s</p>
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
        <div className="grid grid-cols-6 gap-3 mb-4 h-[88px]">
          <StatCard icon={<Target className="text-blue-600" />} value={score} label="Score" isDark={isDarkMode} />
          <StatCard icon={<Trophy className="text-yellow-600" />} value={bestScore} label="Best Score" isDark={isDarkMode} />
          <StatCard icon={<Timer className={timeLeft <= 10 ? 'text-red-600' : 'text-green-600'} />} value={timeLeft} label="Time" unit="s" isDark={isDarkMode} />
          <StatCard icon={<Zap className="text-orange-600" />} value={streak} label="Streak" isDark={isDarkMode} />
          <StatCard icon={<Award className="text-purple-600" />} value={perfectHits} label="Perfect" isDark={isDarkMode} />
          <StatCard icon={<Activity className="text-cyan-600" />} value={accuracy} label="Accuracy" unit="%" isDark={isDarkMode} />
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
            background: isBoxDarkMode ? "#020202" : "#ffffff",
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
                <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 bg-black/50 rounded-lg text-white hover:bg-black/70 transition-all">{isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}</button>
                <button onClick={() => setIsBoxDarkMode(!isBoxDarkMode)} className="p-2 bg-black/50 rounded-lg text-white hover:bg-black/70 transition-all"><Eye className="w-5 h-5" /></button>
                <button onClick={() => setSoundEnabled(!soundEnabled)} className="p-2 bg-black/50 rounded-lg text-white hover:bg-black/70 transition-all">{soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}</button>
                <button onClick={toggleFullscreen} className="p-2 bg-black/50 rounded-lg text-white hover:bg-black/70 transition-all"><Minimize2 className="w-5 h-5" /></button>
              </div>
              <div className="absolute top-4 left-4 z-30 bg-black/50 backdrop-blur-sm rounded-lg px-4 py-2 text-white text-sm">
                Score: <span className="text-yellow-400">{score}</span> | Target: <span className="text-cyan-400">{(targetTime / 1000).toFixed(2)}s</span> | Streak: <span className="text-orange-400">{streak}</span>
              </div>
            </>
          )}

          <canvas ref={canvasRef} style={{ display: 'block', position: 'absolute' }} />

          {/* Start Screen */}
          {gameState === 'start' && (
            <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
              <div className={`rounded-2xl p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <Timer className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                <h3 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Sustained Intercept</h3>
                <p className={`mb-6 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>60-second challenge • Click at exact target time</p>
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
                  <h3 className={`text-2xl font-bold ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Time's Up!</h3>
                </div>
                
                <p className={`text-center mb-6 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  60 seconds completed!
                </p>
                
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <ResultCard label="Final Score" value={score} icon={<Target className="w-4 h-4" />} color="text-blue-500" isDark={isBoxDarkMode} />
                  <ResultCard label="Best Score" value={bestScore} icon={<Trophy className="w-4 h-4" />} color="text-yellow-500" isDark={isBoxDarkMode} />
                  <ResultCard label="Best Streak" value={bestStreak} icon={<Zap className="w-4 h-4" />} color="text-orange-500" isDark={isBoxDarkMode} />
                  <ResultCard label="Accuracy" value={accuracy} unit="%" icon={<Activity className="w-4 h-4" />} color="text-purple-500" isDark={isBoxDarkMode} />
                  <ResultCard label="Perfect Hits" value={perfectHits} icon={<Award className="w-4 h-4" />} color="text-green-500" isDark={isBoxDarkMode} />
                  <ResultCard label="Misses" value={misses} icon={<X className="w-4 h-4" />} color="text-red-500" isDark={isBoxDarkMode} />
                </div>
                
                <div className="flex gap-4">
                  <Link href="/drills/motor" className="flex-1">
                    <button className={`w-full px-4 py-2.5 rounded-lg font-semibold transition-all ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                      ← Back
                    </button>
                  </Link>
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
                        <span className="font-semibold text-blue-500">Memorize target time (1-8 seconds)</span> shown with "TARGET" label
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">2</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-green-500">+1 point per hit</span> (within 150ms of target)
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">3</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-red-500">-1 point penalty</span> for each miss
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-cyan-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">4</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-cyan-500">PERFECT (&lt;25ms) • GOOD (&lt;75ms) • OK (&lt;150ms)</span>
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">5</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Challenge lasts <span className="font-semibold text-yellow-500">60 seconds</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className={`mt-3 pt-3 border-t text-xs ${isDarkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'} flex items-center justify-between`}>
                  <span>⏱️ Green = PERFECT • Cyan = GOOD • Orange = OK • Red = MISS</span>
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