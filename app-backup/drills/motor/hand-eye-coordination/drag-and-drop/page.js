'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Target, Zap, Clock, Award, Activity, 
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, 
  Eye, Move, Brain, BarChart3, Timer, Trophy, Info
} from 'lucide-react';

export default function ExtremeConvergencePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
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
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [margin, setMargin] = useState(10);
  const [timer, setTimer] = useState(5.0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [mistakes, setMistakes] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  const [accuracy, setAccuracy] = useState(100);
  const [successfulDrops, setSuccessfulDrops] = useState(0);
  
  const ballRef = useRef({ x: 0, y: 0, r: 15, dragging: false });
  const bucketRef = useRef({ x: 0, y: 0, r: 25 });
  const scoreRef = useRef(0);
  const streakRef = useRef(0);
  const timerRef = useRef(5.0);
  const maxTimeRef = useRef(5.0);
  const activeRef = useRef(false);
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const totalAttemptsRef = useRef(0);
  const successfulDropsRef = useRef(0);
  const timerIntervalRef = useRef(null);
  const feedbackTimeoutRef = useRef(null);
  const isActiveRef = useRef(false);
  const gameStateRef = useRef('start');
  const audioCtxRef = useRef(null);

  // Load best score from localStorage on mount
  useEffect(() => {
    const savedBestScore = localStorage.getItem('extremeConvergenceBestScore');
    if (savedBestScore) {
      setBestScore(parseInt(savedBestScore, 10));
    }
  }, []);

  useEffect(() => {
    gameStateRef.current = gameState;
  }, [gameState]);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } else if (status === 'authenticated') {
      setLoading(false);
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

  // Calculate accuracy
  useEffect(() => {
    if (totalAttemptsRef.current > 0) {
      const acc = (successfulDropsRef.current / totalAttemptsRef.current) * 100;
      setAccuracy(Math.round(acc));
    } else {
      setAccuracy(100);
    }
  }, [score, mistakes]);

  // Update best score ONLY when game ends
  const updateBestScore = (finalScore) => {
    const currentBestScore = parseInt(localStorage.getItem('extremeConvergenceBestScore') || '0', 10);
    if (finalScore > currentBestScore) {
      localStorage.setItem('extremeConvergenceBestScore', finalScore.toString());
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
    }, 600);
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
      
      if (type === 'drag') {
        osc.frequency.value = 660;
        gain.gain.value = 0.08;
      } else if (type === 'drop') {
        osc.frequency.value = 880;
        gain.gain.value = 0.1;
      } else if (type === 'miss') {
        osc.frequency.value = 440;
        gain.gain.value = 0.1;
      } else if (type === 'streak') {
        osc.frequency.value = 1046.5;
        gain.gain.value = 0.12;
      } else if (type === 'timeout') {
        osc.frequency.value = 330;
        gain.gain.value = 0.1;
      }
      osc.start();
      gain.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 0.15);
      osc.stop(audioCtx.currentTime + 0.15);
    } catch (e) {}
  };

  useEffect(() => {
    if (gameState !== 'playing') return;
    
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    
    timerIntervalRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setGameState('gameOver');
          gameStateRef.current = 'gameOver';
          isActiveRef.current = false;
          if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
          updateBestScore(scoreRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [gameState]);

  const addPenalty = (reason) => {
    if (!isActiveRef.current) return;
    setMistakes(prev => prev + 1);
    setScore(prev => Math.max(0, prev - 30));
    scoreRef.current = Math.max(0, scoreRef.current - 30);
    showFeedback(`✗ ${reason}! -30`, 'error');
    playSound('miss');
    
    streakRef.current = 0;
    setStreak(0);
    activeRef.current = false;
    ballRef.current.dragging = false;
    
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
      
      if (ballRef.current.dragging) {
        ballRef.current.x = canvasX;
        ballRef.current.y = canvasY;
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const swapBucket = (cvs) => {
    if (!cvs) return;
    const padding = 120;
    bucketRef.current.x = padding + Math.random() * (cvs.width - padding * 2);
    bucketRef.current.y = padding + Math.random() * (cvs.height - padding * 2);
  };

  const resetPositions = (cvs, attemptCount = 0) => {
    if (!cvs || !isActiveRef.current) return;
    
    // Prevent infinite recursion
    if (attemptCount > 20) {
      // Force positions far apart
      ballRef.current.x = cvs.width * 0.25;
      ballRef.current.y = cvs.height * 0.5;
      bucketRef.current.x = cvs.width * 0.75;
      bucketRef.current.y = cvs.height * 0.5;
    } else {
      const padding = 120;
      ballRef.current.x = padding + Math.random() * (cvs.width - padding * 2);
      ballRef.current.y = padding + Math.random() * (cvs.height - padding * 2);
      bucketRef.current.x = padding + Math.random() * (cvs.width - padding * 2);
      bucketRef.current.y = padding + Math.random() * (cvs.height - padding * 2);
    }
    
    ballRef.current.dragging = false;
    
    const currentStreak = streakRef.current;
    let marginValue = Math.max(1, Math.min(10, 10 - (currentStreak * 0.4)));
    bucketRef.current.r = ballRef.current.r + marginValue;
    setMargin(parseFloat(marginValue.toFixed(1)));
    
    // Check if too close and try again (with attempt limit)
    const distance = Math.hypot(ballRef.current.x - bucketRef.current.x, ballRef.current.y - bucketRef.current.y);
    if (attemptCount <= 20 && distance < 250) {
      resetPositions(cvs, attemptCount + 1);
      return;
    }
    
    timerRef.current = maxTimeRef.current;
    setTimer(timerRef.current);
    activeRef.current = true;
  };

  useEffect(() => {
    const handleMouseDown = () => {
      if (gameState !== 'playing' || !isActiveRef.current) return;
      if (!activeRef.current) return;
      
      const mouse = mousePositionRef.current;
      const ball = ballRef.current;
      const dist = Math.hypot(mouse.x - ball.x, mouse.y - ball.y);
      
      if (dist < ball.r + 15) {
        ballRef.current.dragging = true;
        playSound('drag');
        if (canvasRef.current) {
          swapBucket(canvasRef.current);
        }
      }
    };
    
    const handleMouseUp = () => {
      if (gameState !== 'playing' || !isActiveRef.current) return;
      if (!ballRef.current.dragging) return;
      
      const ball = ballRef.current;
      const bucket = bucketRef.current;
      const dist = Math.hypot(ball.x - bucket.x, ball.y - bucket.y);
      const marginValue = bucket.r - ball.r;
      
      if (dist < marginValue) {
        totalAttemptsRef.current++;
        successfulDropsRef.current++;
        setSuccessfulDrops(successfulDropsRef.current);
        
        const pointsEarned = Math.floor(80 * (timerRef.current + 1) * (streakRef.current + 1));
        scoreRef.current += pointsEarned;
        setScore(scoreRef.current);
        
        const newStreak = streakRef.current + 1;
        streakRef.current = newStreak;
        setStreak(newStreak);
        
        if (newStreak > bestStreak) {
          setBestStreak(newStreak);
        }
        
        if (newStreak % 5 === 0 && newStreak > 0) {
          playSound('streak');
          showFeedback(`🔥 ${newStreak} Streak! +${pointsEarned}`, 'success');
        } else {
          playSound('drop');
          showFeedback(`✓ +${pointsEarned}`, 'success');
        }
        
        ballRef.current.dragging = false;
        
        if (canvasRef.current) {
          resetPositions(canvasRef.current, 0);
        }
      } else {
        addPenalty('Miss');
        totalAttemptsRef.current++;
        if (canvasRef.current) {
          setTimeout(() => {
            if (isActiveRef.current) {
              resetPositions(canvasRef.current, 0);
            }
          }, 800);
        }
      }
    };
    
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('contextmenu', (e) => e.preventDefault());
    
    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('contextmenu', (e) => e.preventDefault());
    };
  }, [gameState, bestStreak, mistakes]);

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
      resetPositions(cvs, 0);
    };

    const resizeObserver = new ResizeObserver(updateCanvasSize);
    if (containerRef.current) resizeObserver.observe(containerRef.current);
    window.addEventListener('resize', updateCanvasSize);
    updateCanvasSize();
    
    let lastFrameTime = performance.now();

    function update(dt) {
      if (activeRef.current && isActiveRef.current) {
        timerRef.current -= dt;
        setTimer(Math.max(0, timerRef.current));
        if (timerRef.current <= 0) {
          addPenalty('Timeout');
          totalAttemptsRef.current++;
          if (canvasRef.current) {
            setTimeout(() => {
              if (isActiveRef.current) {
                resetPositions(canvasRef.current, 0);
              }
            }, 800);
          }
        }
      }
    }

    function draw() {
      const now = performance.now();
      const dt = Math.min(0.033, (now - lastFrameTime) / 1000);
      lastFrameTime = now;
      
      update(dt);
      
      ctx.fillStyle = isBoxDarkMode ? "#020202" : "#f9fafb";
      ctx.fillRect(0, 0, cvs.width, cvs.height);
      
      ctx.strokeStyle = isBoxDarkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)';
      ctx.lineWidth = 1;
      for (let i = 0; i < cvs.width; i += 50) {
        ctx.beginPath();
        ctx.moveTo(i, 0); ctx.lineTo(i, cvs.height); ctx.stroke();
        ctx.moveTo(0, i); ctx.lineTo(cvs.width, i); ctx.stroke();
      }
      
      // Bucket
      const bucket = bucketRef.current;
      ctx.beginPath();
      ctx.arc(bucket.x, bucket.y, bucket.r, 0, Math.PI * 2);
      ctx.strokeStyle = activeRef.current ? "#00ff88" : "#444";
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Ball
      const ball = ballRef.current;
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
      
      if (ball.dragging) {
        ctx.fillStyle = "#00FFFF";
      } else if (activeRef.current) {
        ctx.fillStyle = "#00ff88";
      } else {
        ctx.fillStyle = "#444";
      }
      ctx.fill();
      
      // Connection line
      if (ball.dragging) {
        ctx.beginPath();
        ctx.moveTo(ball.x, ball.y);
        ctx.lineTo(bucket.x, bucket.y);
        ctx.strokeStyle = "rgba(0, 255, 136, 0.3)";
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      // Crosshair
      const m = mousePositionRef.current;
      if (m.x > 0 && m.x < cvs.width && m.y > 0 && m.y < cvs.height) {
        ctx.strokeStyle = "#00ff88";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(m.x - 12, m.y); ctx.lineTo(m.x + 12, m.y);
        ctx.moveTo(m.x, m.y - 12); ctx.lineTo(m.x, m.y + 12);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(m.x, m.y, 18, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(0, 255, 136, 0.3)';
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
  }, [gameState, isBoxDarkMode]);

  const startGame = () => {
    setGameState('playing');
    gameStateRef.current = 'playing';
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setMargin(10);
    setTimer(5.0);
    setTimeLeft(60);
    setMistakes(0);
    setFeedback('');
    setAccuracy(100);
    setSuccessfulDrops(0);
    
    isActiveRef.current = true;
    scoreRef.current = 0;
    streakRef.current = 0;
    timerRef.current = 5.0;
    activeRef.current = true;
    totalAttemptsRef.current = 0;
    successfulDropsRef.current = 0;
    ballRef.current.dragging = false;
    
    if (canvasRef.current) {
      resetPositions(canvasRef.current, 0);
    }
  };

  const resetGame = () => {
    isActiveRef.current = false;
    setGameState('start');
    gameStateRef.current = 'start';
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setMargin(10);
    setTimer(5.0);
    setTimeLeft(60);
    setMistakes(0);
    setFeedback('');
    setAccuracy(100);
    setSuccessfulDrops(0);
  };

  if (loading || status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }
  if (status === 'unauthenticated') return null;

  return (
    <div className={`min-h-screen select-none ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link href="/drills/motor" className={`inline-flex items-center gap-2 mb-4 ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>
            <ArrowLeft className="w-4 h-4" /> Back to Motor Drills
          </Link>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl">
                <Move className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Extreme Convergence</h1>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Drag ball to bucket - 60 seconds</p>
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
          <StatCard icon={<Trophy className="text-yellow-600" />} value={bestScore} label="Best Score" isDark={isDarkMode} />
          <StatCard icon={<Timer className={timeLeft < 15 ? 'text-red-600' : 'text-green-600'} />} value={timeLeft} label="Time" unit="s" isDark={isDarkMode} />
          <StatCard icon={<Zap className="text-orange-600" />} value={streak} label="Streak" isDark={isDarkMode} />
          <StatCard icon={<BarChart3 className="text-purple-600" />} value={accuracy} label="Accuracy" unit="%" isDark={isDarkMode} />
          <StatCard icon={<Award className="text-amber-600" />} value={bestStreak} label="Best Streak" isDark={isDarkMode} />
          <StatCard icon={<Activity className="text-cyan-600" />} value={margin} label="Margin" unit="px" isDark={isDarkMode} />
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

          <canvas ref={canvasRef} style={{ display: 'block', position: 'absolute', cursor: 'none' }} />

          {/* Start Screen */}
          {gameState === 'start' && (
            <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
              <div className={`rounded-2xl p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <Move className="w-16 h-16 text-cyan-500 mx-auto mb-4" />
                <h3 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Extreme Convergence</h3>
                <p className={`mb-6 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>60-second challenge • Drag ball to bucket</p>
                <button 
                  onClick={startGame} 
                  className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg w-full transition-all transform hover:scale-[1.02] active:scale-[0.98]"
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
                  <h3 className={`text-2xl font-bold ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Session Complete!</h3>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <ResultCard label="Final Score" value={score} icon={<Target className="w-4 h-4" />} color="text-yellow-500" />
                  <ResultCard label="Best Score" value={bestScore} icon={<Trophy className="w-4 h-4" />} color="text-yellow-500" />
                  <ResultCard label="Accuracy" value={accuracy} unit="%" icon={<BarChart3 className="w-4 h-4" />} color="text-purple-500" />
                  <ResultCard label="Successful Drops" value={successfulDrops} icon={<Move className="w-4 h-4" />} color="text-green-500" />
                  <ResultCard label="Best Streak" value={bestStreak} icon={<Zap className="w-4 h-4" />} color="text-orange-500" />
                  <ResultCard label="Mistakes" value={mistakes} icon={<Activity className="w-4 h-4" />} color="text-red-500" />
                  <ResultCard label="Smallest Margin" value={`+${margin}px`} icon={<Target className="w-4 h-4" />} color="text-cyan-500" />
                </div>
                
                <div className="flex gap-4">
                  <Link href="/drills/motor" className="flex-1">
                    <button className={`w-full px-4 py-2.5 rounded-lg font-semibold transition-all ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                      ← Back
                    </button>
                  </Link>
                  <button 
                    onClick={startGame} 
                    className="flex-1 px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98]"
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
                  <Info className={`w-4 h-4 ${isDarkMode ? 'text-cyan-400' : 'text-cyan-600'}`} />
                  <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Drill Rules & Instructions</h3>
                </div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-cyan-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">1</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Click and drag the <span className="font-semibold text-cyan-500">green ball</span> into the ring target</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">2</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Missing the target or timeout results in <span className="font-semibold text-red-500">-30 points</span></p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">3</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Every <span className="font-semibold text-orange-500">5 consecutive drops</span> triggers a streak bonus</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">4</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>The <span className="font-semibold text-blue-500">margin shrinks as your streak grows</span> - requiring more precision</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">5</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Challenge lasts <span className="font-semibold text-purple-500">60 seconds</span> - maximize your score</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">6</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}><span className="font-semibold text-yellow-500">5 mistakes reset your score</span> - stay precise and focused</p>
                    </div>
                  </div>
                </div>
                <div className={`mt-3 pt-3 border-t text-xs ${isDarkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'} flex items-center justify-between`}>
                  <span>🖱️ Drag ball to ring • 5 seconds per drop</span>
                  <span>⚡ Best Score saves locally and persists across sessions</span>
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
                   color === 'text-orange-500' ? 'bg-orange-500/10' :
                   color === 'text-red-500' ? 'bg-red-500/10' :
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