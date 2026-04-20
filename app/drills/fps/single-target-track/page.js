'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Target, Zap, Timer, Trophy, 
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, Eye,
  BarChart3, Info, Activity, Award, MousePointer
} from 'lucide-react';

export default function SmoothTrackingPage() {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const containerRef = useRef(null);
  
  const [gameState, setGameState] = useState('start');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isBoxDarkMode, setIsBoxDarkMode] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  
  // Drill-specific stats
  const [trackingScore, setTrackingScore] = useState(0);
  const [bestTrackingScore, setBestTrackingScore] = useState(0);
  const [trackingAccuracy, setTrackingAccuracy] = useState(0);
  const [bestAccuracy, setBestAccuracy] = useState(0);
  const [trackingStreak, setTrackingStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  
  const targetRef = useRef({
    x: 0, y: 0, vx: 0, vy: 0, r: 30, isTracked: false
  });
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const canvasSizeRef = useRef({ width: 0, height: 0 });
  const initializedRef = useRef(false);
  const speed = 8;
  const lastChangeRef = useRef(0);
  const scoreRef = useRef(0);
  const streakRef = useRef(0);
  const accuracyRef = useRef(0);
  const timerIntervalRef = useRef(null);
  const feedbackTimeoutRef = useRef(null);
  const isActiveRef = useRef(false);
  const gameStateRef = useRef('start');
  const audioCtxRef = useRef(null);
  const timeLeftRef = useRef(60);
  const lastScoreTimeRef = useRef(0);

  // Load best tracking score from localStorage
  useEffect(() => {
    const savedBestScore = localStorage.getItem('smoothTrackingBestScore');
    if (savedBestScore) {
      setBestTrackingScore(parseInt(savedBestScore, 10));
    }
  }, []);

  // Update best tracking score ONLY when game ends
  const updateBestScore = (finalScore) => {
    const currentBestScore = parseInt(localStorage.getItem('smoothTrackingBestScore') || '0', 10);
    if (finalScore > currentBestScore) {
      localStorage.setItem('smoothTrackingBestScore', finalScore.toString());
      setBestTrackingScore(finalScore);
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
      
      if (type === 'lock') {
        osc.frequency.value = 880;
        gain.gain.value = 0.12;
      } else if (type === 'unlock') {
        osc.frequency.value = 440;
        gain.gain.value = 0.08;
      } else if (type === 'streak') {
        osc.frequency.value = 1046;
        gain.gain.value = 0.12;
      } else if (type === 'score') {
        osc.frequency.value = 1320;
        gain.gain.value = 0.1;
      }
      osc.start();
      gain.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 0.1);
      osc.stop(audioCtx.currentTime + 0.1);
    } catch (e) {}
  };

  // Timer function
  const startTimer = useCallback(() => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
    }
    
    timerIntervalRef.current = setInterval(() => {
      if (gameStateRef.current === 'playing' && isActiveRef.current) {
        timeLeftRef.current -= 1;
        setTimeLeft(timeLeftRef.current);
        
        if (timeLeftRef.current <= 0) {
          clearInterval(timerIntervalRef.current);
          timerIntervalRef.current = null;
          setGameState('gameOver');
          gameStateRef.current = 'gameOver';
          isActiveRef.current = false;
          updateBestScore(scoreRef.current);
        }
      }
    }, 1000);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const cvs = canvasRef.current;
      if (!cvs) return;
      
      const rect = cvs.getBoundingClientRect();
      const scaleX = cvs.width / rect.width;
      const scaleY = cvs.height / rect.height;
      
      mousePositionRef.current = {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY
      };
      
      if (gameState === 'playing' && !initializedRef.current) {
        initializedRef.current = true;
        updateDirection();
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [gameState]);

  function updateDirection() {
    const angle = Math.random() * Math.PI * 2;
    targetRef.current.vx = Math.cos(angle) * speed;
    targetRef.current.vy = Math.sin(angle) * speed;
    lastChangeRef.current = performance.now();
  }

  // Tracking update interval - runs every 100ms
  useEffect(() => {
    if (gameState !== 'playing') return;
    
    const interval = setInterval(() => {
      if (!isActiveRef.current) return;
      
      const target = targetRef.current;
      const mouse = mousePositionRef.current;
      const dist = Math.hypot(mouse.x - target.x, mouse.y - target.y);
      const isTracked = dist < target.r;
      
      target.isTracked = isTracked;
      
      // Calculate accuracy (0-100%)
      const currentAccuracy = Math.max(0, Math.min(100, Math.round(100 - (dist / target.r) * 100)));
      accuracyRef.current = currentAccuracy;
      setTrackingAccuracy(currentAccuracy);
      
      if (currentAccuracy > bestAccuracy) {
        setBestAccuracy(currentAccuracy);
      }
      
      const now = performance.now();
      const timeSinceLastScore = now - lastScoreTimeRef.current;
      
      // Award +1 point when cursor is on the ball (every 200ms to prevent too rapid scoring)
      if (isTracked && timeSinceLastScore >= 200) {
        scoreRef.current += 1;
        setTrackingScore(scoreRef.current);
        streakRef.current++;
        setTrackingStreak(streakRef.current);
        
        if (streakRef.current > bestStreak) {
          setBestStreak(streakRef.current);
        }
        
        playSound('score');
        showFeedback(`✓ +1`, 'success');
        
        if (streakRef.current % 10 === 0) {
          playSound('streak');
          showFeedback(`🔥 ${streakRef.current} Streak!`, 'success');
        }
        
        lastScoreTimeRef.current = now;
      } else if (!isTracked) {
        if (streakRef.current > 0) {
          streakRef.current = 0;
          setTrackingStreak(0);
        }
      }
    }, 100);
    
    return () => clearInterval(interval);
  }, [gameState]);

  useEffect(() => {
    if (gameState !== 'playing') return;

    const cvs = canvasRef.current;
    if (!cvs) return;

    const ctx = cvs.getContext('2d');

    const updateCanvasSize = () => {
      const container = containerRef.current;
      if (!container) return;
      
      const containerRect = container.getBoundingClientRect();
      const containerWidth = containerRect.width;
      const containerHeight = containerRect.height;
      
      let width = containerWidth;
      let height = width * (9 / 16);
      
      if (height > containerHeight) {
        height = containerHeight;
        width = height * (16 / 9);
      }
      
      cvs.width = width;
      cvs.height = height;
      canvasSizeRef.current = { width, height };
      
      cvs.style.position = 'absolute';
      cvs.style.left = `${(containerWidth - width) / 2}px`;
      cvs.style.top = `${(containerHeight - height) / 2}px`;
      
      targetRef.current.x = width / 2;
      targetRef.current.y = height / 2;
    };

    updateCanvasSize();

    function drawBackground() {
      ctx.fillStyle = isBoxDarkMode ? '#020202' : '#f9fafb';
      ctx.fillRect(0, 0, cvs.width, cvs.height);
      
      ctx.strokeStyle = isBoxDarkMode ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)';
      ctx.lineWidth = 1;
      for (let i = 0; i < cvs.width; i += 40) {
        ctx.beginPath();
        ctx.moveTo(i, 0); ctx.lineTo(i, cvs.height); ctx.stroke();
      }
    }

    function drawTarget() {
      const target = targetRef.current;
      
      if (initializedRef.current && isActiveRef.current) {
        target.x += target.vx;
        target.y += target.vy;
        
        if (target.x < target.r) {
          target.x = target.r;
          target.vx *= -1;
        }
        if (target.x > cvs.width - target.r) {
          target.x = cvs.width - target.r;
          target.vx *= -1;
        }
        if (target.y < target.r) {
          target.y = target.r;
          target.vy *= -1;
        }
        if (target.y > cvs.height - target.r) {
          target.y = cvs.height - target.r;
          target.vy *= -1;
        }
        
        if (performance.now() - lastChangeRef.current > 400 + Math.random() * 600) {
          updateDirection();
        }
        
        const dist = Math.hypot(mousePositionRef.current.x - target.x, mousePositionRef.current.y - target.y);
        const wasTracked = target.isTracked;
        target.isTracked = dist < target.r;
        
        if (wasTracked !== target.isTracked) {
          if (target.isTracked) {
            playSound('lock');
          } else {
            playSound('unlock');
          }
        }
      }
      
      ctx.beginPath();
      ctx.arc(target.x, target.y, target.r, 0, Math.PI * 2);
      
      if (target.isTracked) {
        ctx.fillStyle = '#00ff88';
        ctx.shadowBlur = 30;
        ctx.shadowColor = '#00ff88';
      } else {
        ctx.fillStyle = isBoxDarkMode ? '#1a1a1a' : '#cccccc';
        ctx.shadowBlur = 0;
      }
      ctx.fill();
      ctx.shadowBlur = 0;
      
      ctx.beginPath();
      ctx.arc(target.x, target.y, target.r, 0, Math.PI * 2);
      ctx.strokeStyle = target.isTracked ? 'rgba(0, 255, 136, 0.8)' : 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      if (!target.isTracked) {
        ctx.beginPath();
        ctx.moveTo(target.x, target.y);
        ctx.lineTo(target.x + target.vx * 5, target.y + target.vy * 5);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        const angle = Math.atan2(target.vy, target.vx);
        const arrowX = target.x + target.vx * 5;
        const arrowY = target.y + target.vy * 5;
        const arrowSize = 6;
        
        ctx.beginPath();
        ctx.moveTo(arrowX, arrowY);
        ctx.lineTo(arrowX - arrowSize * Math.cos(angle - 0.7), arrowY - arrowSize * Math.sin(angle - 0.7));
        ctx.lineTo(arrowX - arrowSize * Math.cos(angle + 0.7), arrowY - arrowSize * Math.sin(angle + 0.7));
        ctx.closePath();
        ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.fill();
      }
      
      ctx.beginPath();
      ctx.arc(target.x, target.y, 4, 0, Math.PI * 2);
      ctx.fillStyle = target.isTracked ? '#000000' : (isBoxDarkMode ? '#333333' : '#999999');
      ctx.fill();
    }

    function drawCrosshair() {
      const mouse = mousePositionRef.current;
      if (mouse.x > 0 && mouse.x < cvs.width && mouse.y > 0 && mouse.y < cvs.height) {
        const target = targetRef.current;
        const dist = Math.hypot(mouse.x - target.x, mouse.y - target.y);
        const crosshairColor = target.isTracked ? '#00ff88' : 'rgba(255, 255, 255, 0.6)';
        const size = 12;
        const gap = 3;
        
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 16, 0, Math.PI * 2);
        ctx.strokeStyle = crosshairColor;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(mouse.x - gap - size, mouse.y);
        ctx.lineTo(mouse.x - gap, mouse.y);
        ctx.moveTo(mouse.x + gap, mouse.y);
        ctx.lineTo(mouse.x + gap + size, mouse.y);
        ctx.moveTo(mouse.x, mouse.y - gap - size);
        ctx.lineTo(mouse.x, mouse.y - gap);
        ctx.moveTo(mouse.x, mouse.y + gap);
        ctx.lineTo(mouse.x, mouse.y + gap + size);
        ctx.strokeStyle = crosshairColor;
        ctx.lineWidth = 1.8;
        ctx.stroke();
        
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = crosshairColor;
        ctx.fill();
        
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 1.5, 0, Math.PI * 2);
        ctx.fill();
        
        if (target.isTracked) {
          ctx.beginPath();
          ctx.arc(mouse.x, mouse.y, target.r, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(0, 255, 136, 0.25)';
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
      }
    }

    function render() {
      if (!isActiveRef.current && gameState !== 'playing') return;
      drawBackground();
      drawTarget();
      drawCrosshair();
      animationRef.current = requestAnimationFrame(render);
    }

    render();

    const handleResize = () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      updateCanvasSize();
      animationRef.current = requestAnimationFrame(render);
    };

    window.addEventListener('resize', handleResize);
    
    const resizeObserver = new ResizeObserver(() => handleResize());
    if (containerRef.current) resizeObserver.observe(containerRef.current);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', handleResize);
      resizeObserver.disconnect();
    };
  }, [gameState, isBoxDarkMode]);

  const startGame = () => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
    
    setGameState('playing');
    gameStateRef.current = 'playing';
    setTrackingScore(0);
    setTrackingAccuracy(0);
    setBestAccuracy(0);
    setTrackingStreak(0);
    setBestStreak(0);
    timeLeftRef.current = 60;
    setTimeLeft(60);
    setFeedback('');
    
    isActiveRef.current = true;
    scoreRef.current = 0;
    streakRef.current = 0;
    accuracyRef.current = 0;
    initializedRef.current = false;
    lastScoreTimeRef.current = 0;
    
    if (canvasRef.current) {
      targetRef.current.x = canvasRef.current.width / 2;
      targetRef.current.y = canvasRef.current.height / 2;
    }
    targetRef.current.isTracked = false;
    
    startTimer();
  };

  const resetGame = () => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
    
    isActiveRef.current = false;
    setGameState('start');
    gameStateRef.current = 'start';
    setTrackingScore(0);
    setTrackingAccuracy(0);
    setBestAccuracy(0);
    setTrackingStreak(0);
    setBestStreak(0);
    timeLeftRef.current = 60;
    setTimeLeft(60);
    setFeedback('');
  };

  return (
    <div className={`min-h-screen select-none ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link href="/drills/fps" className={`inline-flex items-center gap-2 mb-4 ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>
            <ArrowLeft className="w-4 h-4" /> Back to FPS Drills
          </Link>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-gray-700 to-gray-900 rounded-xl">
                <MousePointer className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Smooth Tracking</h1>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Keep cursor on target • +1 per hit</p>
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

        {/* Drill-Specific Stats Board */}
        <div className="grid grid-cols-5 gap-3 mb-4 h-[88px]">
          <StatCard icon={<Target className="text-blue-600" />} value={trackingScore} label="Score" isDark={isDarkMode} />
          <StatCard icon={<Trophy className="text-yellow-500" />} value={bestTrackingScore} label="Best" isDark={isDarkMode} />
          <StatCard icon={<Timer className={timeLeft <= 10 ? 'text-red-600' : 'text-green-600'} />} value={timeLeft} label="Time" unit="s" isDark={isDarkMode} />
          <StatCard icon={<Activity className="text-purple-500" />} value={trackingAccuracy} label="Accuracy" unit="%" isDark={isDarkMode} />
          <StatCard icon={<Zap className="text-orange-500" />} value={trackingStreak} label="Streak" isDark={isDarkMode} />
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
                Score: <span className="text-yellow-400">{trackingScore}</span> | Accuracy: <span className="text-green-400">{trackingAccuracy}%</span> | Streak: <span className="text-purple-400">{trackingStreak}</span>
              </div>
            </>
          )}

          <canvas ref={canvasRef} style={{ display: 'block', position: 'absolute', cursor: 'none' }} />

          {/* Start Screen */}
          {gameState === 'start' && (
            <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
              <div className={`rounded-2xl p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <MousePointer className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                <h3 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Smooth Tracking</h3>
                <p className={`mb-6 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>60-second challenge • +1 per hit</p>
                <button 
                  onClick={startGame} 
                  className="px-8 py-3 bg-gradient-to-r from-gray-700 to-gray-900 text-white rounded-xl font-semibold hover:shadow-lg w-full transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  Start Tracking
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
                  <ResultCard label="Final Score" value={trackingScore} icon={<Target className="w-4 h-4" />} color="text-blue-500" />
                  <ResultCard label="Best Score" value={bestTrackingScore} icon={<Trophy className="w-4 h-4" />} color="text-yellow-500" />
                  <ResultCard label="Best Accuracy" value={bestAccuracy} unit="%" icon={<Activity className="w-4 h-4" />} color="text-green-500" />
                  <ResultCard label="Best Streak" value={bestStreak} icon={<Zap className="w-4 h-4" />} color="text-orange-500" />
                </div>
                
                <div className="flex gap-4">
                  <Link href="/drills/fps" className="flex-1">
                    <span className={`block w-full px-4 py-2.5 rounded-lg font-semibold transition-all text-center ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                      ← Back
                    </span>
                  </Link>
                  <button 
                    onClick={startGame} 
                    className="flex-1 px-4 py-2.5 bg-gradient-to-r from-gray-700 to-gray-900 text-white rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Track Again →
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
                  <Info className={`w-4 h-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                  <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Tracking Drill Rules</h3>
                </div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">1</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-green-500">Keep cursor on the green target</span> • Glows when tracked
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">2</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-blue-500">Cursor on target = +1 point</span> • Simple scoring
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">3</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-purple-500">Build streak for bonus</span> • 10 streak bonus sound
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-cyan-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">4</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-cyan-500">Accuracy = Cursor proximity</span> • Higher is better
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">5</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-orange-500">Arrow shows movement direction</span> • When off-target
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">6</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-yellow-500">No penalties • Pure positive training</span>
                      </p>
                    </div>
                  </div>
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
                   color === 'text-cyan-500' ? 'bg-cyan-500/10' : 'bg-purple-500/10';
  
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