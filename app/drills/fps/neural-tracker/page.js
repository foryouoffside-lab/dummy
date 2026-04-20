'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Target, Zap, Timer, Trophy, 
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, Eye,
  Info, Award, Activity, MousePointer
} from 'lucide-react';

export default function SmoothTrackingPage() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [gameState, setGameState] = useState('start');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isBoxDarkMode, setIsBoxDarkMode] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  
  // Drill-specific stats
  const [trackingScore, setTrackingScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [trackingAccuracy, setTrackingAccuracy] = useState(100);
  const [bestAccuracy, setBestAccuracy] = useState(0);
  const [trackingCombo, setTrackingCombo] = useState(0);
  const [bestCombo, setBestCombo] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  const [totalHits, setTotalHits] = useState(0);
  
  const ballsRef = useRef([]);
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const targetIndexRef = useRef(0);
  const canvasSizeRef = useRef({ width: 0, height: 0 });
  const animationFrameRef = useRef(null);
  const isInitializedRef = useRef(false);
  const scoreRef = useRef(0);
  const comboRef = useRef(0);
  const trackingAccuracyRef = useRef(100);
  const timerIntervalRef = useRef(null);
  const feedbackTimeoutRef = useRef(null);
  const isActiveRef = useRef(false);
  const gameStateRef = useRef('start');
  const audioCtxRef = useRef(null);
  const timeLeftRef = useRef(60);
  const totalHitsRef = useRef(0);
  const trackingTimeRef = useRef(0);
  
  const ballRadius = 24;
  const movementSpeed = 3.5;
  const BALL_COUNT = 5;

  // Load best score from localStorage
  useEffect(() => {
    const savedBestScore = localStorage.getItem('smoothTrackingBestScore');
    if (savedBestScore) {
      setBestScore(parseInt(savedBestScore, 10));
    }
  }, []);

  // Update best score ONLY when game ends
  const updateBestScore = (finalScore) => {
    const currentBestScore = parseInt(localStorage.getItem('smoothTrackingBestScore') || '0', 10);
    if (finalScore > currentBestScore) {
      localStorage.setItem('smoothTrackingBestScore', finalScore.toString());
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
      
      if (type === 'success') {
        osc.frequency.value = 880;
        gain.gain.value = 0.1;
      } else if (type === 'combo') {
        osc.frequency.value = 1046;
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

  // Ball class
  class Ball {
    constructor(id, isTarget) {
      this.id = id;
      this.isTarget = isTarget;
      this.radius = ballRadius;
      this.x = 0;
      this.y = 0;
      this.vx = 0;
      this.vy = 0;
    }

    init(width, height) {
      let overlapping;
      let attempts = 0;
      const maxAttempts = 200;
      
      do {
        overlapping = false;
        this.x = this.radius + 20 + Math.random() * (width - this.radius * 2 - 40);
        this.y = this.radius + 20 + Math.random() * (height - this.radius * 2 - 40);
        
        for (const ball of ballsRef.current) {
          if (ball !== this) {
            const dx = ball.x - this.x;
            const dy = ball.y - this.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < this.radius + ball.radius + 15) {
              overlapping = true;
              break;
            }
          }
        }
        attempts++;
      } while (overlapping && attempts < maxAttempts);
      
      const angle = Math.random() * Math.PI * 2;
      const speed = movementSpeed * (0.8 + Math.random() * 0.5);
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed;
    }

    update(width, height) {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < this.radius) {
        this.x = this.radius;
        this.vx = Math.abs(this.vx);
      } else if (this.x > width - this.radius) {
        this.x = width - this.radius;
        this.vx = -Math.abs(this.vx);
      }
      
      if (this.y < this.radius) {
        this.y = this.radius;
        this.vy = Math.abs(this.vy);
      } else if (this.y > height - this.radius) {
        this.y = height - this.radius;
        this.vy = -Math.abs(this.vy);
      }
      
      const currentSpeed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
      if (currentSpeed > movementSpeed * 1.3) {
        this.vx *= movementSpeed * 1.2 / currentSpeed;
        this.vy *= movementSpeed * 1.2 / currentSpeed;
      }
      if (currentSpeed < movementSpeed * 0.7) {
        this.vx *= movementSpeed * 0.9 / currentSpeed;
        this.vy *= movementSpeed * 0.9 / currentSpeed;
      }
    }

    draw(ctx, isBoxDarkMode) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      
      if (this.isTarget) {
        ctx.shadowBlur = 20;
        ctx.shadowColor = "#00ff88";
        ctx.fillStyle = "#00ff88";
        ctx.fill();
        ctx.shadowBlur = 0;
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
        ctx.lineWidth = 2;
        ctx.stroke();
      } else {
        ctx.shadowBlur = 0;
        ctx.fillStyle = isBoxDarkMode ? "#e0e0e0" : "#9ca3af";
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.strokeStyle = isBoxDarkMode ? "rgba(255, 255, 255, 0.15)" : "rgba(0, 0, 0, 0.1)";
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }
    }
  }

  const resolveCollisions = useCallback(() => {
    const balls = ballsRef.current;
    const count = balls.length;
    
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const b1 = balls[i];
        const b2 = balls[j];
        const dx = b2.x - b1.x;
        const dy = b2.y - b1.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const minDist = b1.radius + b2.radius;
        
        if (dist < minDist) {
          const nx = dx / dist;
          const ny = dy / dist;
          
          const overlap = minDist - dist;
          const separateX = nx * overlap * 0.5;
          const separateY = ny * overlap * 0.5;
          
          b1.x -= separateX;
          b1.y -= separateY;
          b2.x += separateX;
          b2.y += separateY;
          
          const dvx = b2.vx - b1.vx;
          const dvy = b2.vy - b1.vy;
          const vn = dvx * nx + dvy * ny;
          
          if (vn < 0) {
            const impulse = vn * 0.9;
            b1.vx += impulse * nx;
            b1.vy += impulse * ny;
            b2.vx -= impulse * nx;
            b2.vy -= impulse * ny;
          }
        }
      }
    }
  }, []);

  const gameLoop = useCallback(() => {
    if (gameState !== 'playing') return;
    
    const cvs = canvasRef.current;
    if (!cvs) return;
    
    const ctx = cvs.getContext('2d');
    const width = canvasSizeRef.current.width;
    const height = canvasSizeRef.current.height;
    
    ballsRef.current.forEach(ball => ball.update(width, height));
    
    for (let pass = 0; pass < 3; pass++) {
      resolveCollisions();
    }
    
    const target = ballsRef.current[targetIndexRef.current];
    const mouse = mousePositionRef.current;
    
    if (target) {
      const dx = target.x - mouse.x;
      const dy = target.y - mouse.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const maxDistance = 120;
      const closeness = Math.max(0, 100 - (distance / maxDistance) * 100);
      
      trackingAccuracyRef.current = Math.round(closeness);
      setTrackingAccuracy(trackingAccuracyRef.current);
      
      if (trackingAccuracyRef.current > bestAccuracy) {
        setBestAccuracy(trackingAccuracyRef.current);
      }
    }
    
    ctx.fillStyle = isBoxDarkMode ? '#020202' : '#f9fafb';
    ctx.fillRect(0, 0, width, height);
    
    ctx.strokeStyle = isBoxDarkMode ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)';
    ctx.lineWidth = 1;
    for (let i = 0; i < width; i += 40) {
      ctx.beginPath();
      ctx.moveTo(i, 0); ctx.lineTo(i, height); ctx.stroke();
    }
    
    ballsRef.current.forEach(ball => ball.draw(ctx, isBoxDarkMode));
    
    if (mouse.x > 0 && mouse.x < width && mouse.y > 0 && mouse.y < height) {
      const trackingQuality = target ? Math.max(0, 1 - Math.sqrt(Math.pow(target.x - mouse.x, 2) + Math.pow(target.y - mouse.y, 2)) / 120) : 0;
      const crosshairColor = trackingQuality > 0.4 ? '#00ff88' : '#ff4444';
      
      ctx.strokeStyle = crosshairColor;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(mouse.x - 15, mouse.y); ctx.lineTo(mouse.x + 15, mouse.y);
      ctx.moveTo(mouse.x, mouse.y - 15); ctx.lineTo(mouse.x, mouse.y + 15);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 20, 0, Math.PI * 2);
      ctx.strokeStyle = crosshairColor + '40';
      ctx.stroke();
      ctx.fillStyle = crosshairColor;
      ctx.fillRect(mouse.x - 2, mouse.y - 2, 4, 4);
    }
    
    animationFrameRef.current = requestAnimationFrame(gameLoop);
  }, [gameState, isBoxDarkMode, resolveCollisions]);

  useEffect(() => {
    if (gameState !== 'playing') {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      isInitializedRef.current = false;
      return;
    }

    const cvs = canvasRef.current;
    if (!cvs) return;

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
      
      if (!isInitializedRef.current) {
        ballsRef.current = [];
        for (let i = 0; i < BALL_COUNT; i++) {
          const ball = new Ball(i, i === 0);
          ballsRef.current.push(ball);
        }
        ballsRef.current.forEach(ball => ball.init(width, height));
        targetIndexRef.current = 0;
        isInitializedRef.current = true;
      }
    };

    updateCanvasSize();

    if (!animationFrameRef.current) {
      animationFrameRef.current = requestAnimationFrame(gameLoop);
    }

    const handleResize = () => {
      updateCanvasSize();
    };

    window.addEventListener('resize', handleResize);
    
    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      window.removeEventListener('resize', handleResize);
      resizeObserver.disconnect();
    };
  }, [gameState, gameLoop]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const cvs = canvasRef.current;
      if (!cvs) return;
      
      const rect = cvs.getBoundingClientRect();
      const scaleX = cvs.width / rect.width;
      const scaleY = cvs.height / rect.height;
      
      mousePositionRef.current = {
        x: Math.min(cvs.width, Math.max(0, (e.clientX - rect.left) * scaleX)),
        y: Math.min(cvs.height, Math.max(0, (e.clientY - rect.top) * scaleY))
      };
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Tracking update interval - 2 seconds = +1 score
  useEffect(() => {
    if (gameState !== 'playing') return;
    
    const interval = setInterval(() => {
      if (!isActiveRef.current) return;
      
      const accuracy = trackingAccuracyRef.current;
      
      if (accuracy > 60) {
        // Good tracking for 2 seconds = +1 point
        trackingTimeRef.current += 2;
        
        if (trackingTimeRef.current >= 2) {
          scoreRef.current += 1;
          comboRef.current += 1;
          totalHitsRef.current += 1;
          
          setTrackingScore(scoreRef.current);
          setTrackingCombo(comboRef.current);
          setTotalHits(totalHitsRef.current);
          
          if (comboRef.current > bestCombo) {
            setBestCombo(comboRef.current);
          }
          
          showFeedback(`✓ +1`, 'success');
          playSound('success');
          
          if (comboRef.current % 5 === 0) {
            playSound('combo');
            showFeedback(`🔥 ${comboRef.current} Combo!`, 'success');
          }
          
          trackingTimeRef.current = 0;
        }
      } else {
        trackingTimeRef.current = 0;
        comboRef.current = 0;
        setTrackingCombo(0);
      }
    }, 2000);
    
    return () => clearInterval(interval);
  }, [gameState]);

  const startGame = () => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
    
    isInitializedRef.current = false;
    scoreRef.current = 0;
    comboRef.current = 0;
    trackingAccuracyRef.current = 100;
    totalHitsRef.current = 0;
    trackingTimeRef.current = 0;
    
    setGameState('playing');
    gameStateRef.current = 'playing';
    setTrackingScore(0);
    setTrackingAccuracy(100);
    setBestAccuracy(0);
    setTrackingCombo(0);
    setBestCombo(0);
    timeLeftRef.current = 60;
    setTimeLeft(60);
    setTotalHits(0);
    setFeedback('');
    
    isActiveRef.current = true;
    
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
    setTrackingAccuracy(100);
    setBestAccuracy(0);
    setTrackingCombo(0);
    setBestCombo(0);
    timeLeftRef.current = 60;
    setTimeLeft(60);
    setTotalHits(0);
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
              <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl">
                <MousePointer className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Smooth Tracking</h1>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Track green target • 2 sec tracking = +1</p>
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
          <StatCard icon={<Target className="text-blue-600" />} value={trackingScore} label="Score" isDark={isDarkMode} />
          <StatCard icon={<Trophy className="text-yellow-500" />} value={bestScore} label="Best" isDark={isDarkMode} />
          <StatCard icon={<Timer className={timeLeft <= 10 ? 'text-red-600' : 'text-green-600'} />} value={timeLeft} label="Time" unit="s" isDark={isDarkMode} />
          <StatCard icon={<Activity className="text-green-500" />} value={trackingAccuracy} label="Accuracy" unit="%" isDark={isDarkMode} />
          <StatCard icon={<Zap className="text-orange-500" />} value={trackingCombo} label="Combo" isDark={isDarkMode} />
          <StatCard icon={<Target className="text-purple-500" />} value={totalHits} label="Hits" isDark={isDarkMode} />
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
                Score: <span className="text-yellow-400">{trackingScore}</span> | Accuracy: <span className="text-green-400">{trackingAccuracy}%</span> | Combo: <span className="text-purple-400">{trackingCombo}x</span>
              </div>
            </>
          )}

          <canvas ref={canvasRef} style={{ display: 'block', position: 'absolute', cursor: 'none' }} />

          {/* Start Screen */}
          {gameState === 'start' && (
            <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
              <div className={`rounded-2xl p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <MousePointer className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Smooth Tracking</h3>
                <p className={`mb-6 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>60-second challenge • 2 sec tracking = +1</p>
                <button 
                  onClick={startGame} 
                  className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-lg w-full transition-all transform hover:scale-[1.02] active:scale-[0.98]"
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
                  <ResultCard label="Best Score" value={bestScore} icon={<Trophy className="w-4 h-4" />} color="text-yellow-500" />
                  <ResultCard label="Best Accuracy" value={bestAccuracy} unit="%" icon={<Activity className="w-4 h-4" />} color="text-green-500" />
                  <ResultCard label="Best Combo" value={bestCombo} icon={<Zap className="w-4 h-4" />} color="text-orange-500" />
                  <ResultCard label="Total Hits" value={totalHits} icon={<Target className="w-4 h-4" />} color="text-purple-500" />
                  <ResultCard label="Efficiency" value={timeLeft > 0 ? (trackingScore / (60 - timeLeft)).toFixed(1) : 0} unit="/s" icon={<Timer className="w-4 h-4" />} color="text-cyan-500" />
                </div>
                
                <div className="flex gap-4">
                  <Link 
                    href="/drills/fps"
                    className={`flex-1 px-4 py-2.5 rounded-lg font-semibold transition-all text-center ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                  >
                    ← Back
                  </Link>
                  <button 
                    onClick={startGame} 
                    className="flex-1 px-4 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98]"
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
                  <Info className={`w-4 h-4 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />
                  <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Smooth Tracking Rules</h3>
                </div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">1</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-green-500">Track the GREEN target ball</span> • Ignore gray decoys
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">2</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-blue-500">2 seconds of tracking = +1 point</span> • Build your score
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-cyan-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">3</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-cyan-500">60%+ accuracy required for points</span> • Keep cursor close
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">4</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-purple-500">Build combos for bonus</span> • 5x combo bonus sound
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">5</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-orange-500">No penalties - pure positive training</span> • Just keep tracking
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">6</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-yellow-500">Best Score saves locally</span> • 60 second challenge
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
                   color === 'text-purple-500' ? 'bg-purple-500/10' : 'bg-cyan-500/10';
  
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