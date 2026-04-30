'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Target, Zap, Clock, Award, Activity, 
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, 
  Eye, GitBranch, X, Trophy, Info, Timer, Heart, RefreshCw
} from 'lucide-react';

export default function SynchronizationElitePage() {
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
  const [velocity, setVelocity] = useState(400);
  const [accuracy, setAccuracy] = useState(100);
  const [perfectHits, setPerfectHits] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [lives, setLives] = useState(3);
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  const [roundActive, setRoundActive] = useState(false);
  
  const barsRef = useRef({ pos: 0, speed: 400, active: false });
  const lastResultRef = useRef({ error: 0, show: false, timer: 0 });
  const scoreRef = useRef(0);
  const streakRef = useRef(0);
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const totalAttemptsRef = useRef(0);
  const hitsRef = useRef(0);
  const perfectHitsRef = useRef(0);
  const resetTimeoutRef = useRef(null);
  const timerIntervalRef = useRef(null);
  const feedbackTimeoutRef = useRef(null);
  const isActiveRef = useRef(false);
  const gameStateRef = useRef('start');
  const audioCtxRef = useRef(null);
  const animationFrameRef = useRef(null);
  const livesRef = useRef(3);

  // Load best score from localStorage
  useEffect(() => {
    const savedBestScore = localStorage.getItem('synchronizationBestScore');
    const savedBestStreak = localStorage.getItem('synchronizationBestStreak');
    if (savedBestScore) setBestScore(parseInt(savedBestScore, 10));
    if (savedBestStreak) setBestStreak(parseInt(savedBestStreak, 10));
  }, []);

  // Update best score ONLY when game ends
  const updateBestScore = (finalScore) => {
    const currentBestScore = parseInt(localStorage.getItem('synchronizationBestScore') || '0', 10);
    if (finalScore > currentBestScore) {
      localStorage.setItem('synchronizationBestScore', finalScore.toString());
      setBestScore(finalScore);
    }
  };

  useEffect(() => {
    gameStateRef.current = gameState;
  }, [gameState]);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

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
      
      if (type === 'perfect') {
        osc.frequency.value = 880;
        gain.gain.value = 0.12;
      } else if (type === 'miss') {
        osc.frequency.value = 440;
        gain.gain.value = 0.1;
      } else if (type === 'streak') {
        osc.frequency.value = 1046.5;
        gain.gain.value = 0.12;
      } else if (type === 'penalty') {
        osc.frequency.value = 330;
        gain.gain.value = 0.15;
      } else if (type === 'reset') {
        osc.frequency.value = 660;
        gain.gain.value = 0.08;
      }
      osc.start();
      gain.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 0.12);
      osc.stop(audioCtx.currentTime + 0.12);
    } catch (e) {}
  };

  // Calculate points - SIMPLIFIED: 1 point for perfect hit
  const calculatePoints = () => 1;

  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      timerIntervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setGameState('gameOver');
            gameStateRef.current = 'gameOver';
            isActiveRef.current = false;
            if (resetTimeoutRef.current) clearTimeout(resetTimeoutRef.current);
            
            const total = totalAttemptsRef.current;
            const finalAccuracy = total === 0 ? 100 : Math.round((hitsRef.current / total) * 100);
            setAccuracy(finalAccuracy);
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

  // Apply penalty for mistakes
  const applyPenalty = () => {
    if (!isActiveRef.current) return;
    
    // Check if lives are available
    if (livesRef.current > 0) {
      // Has lives: lose 1 life only, no point penalty
      livesRef.current -= 1;
      setLives(livesRef.current);
      showFeedback(` Miss! -1 life (${livesRef.current} lives left)`, 'error');
      playSound('miss');
      
      if (livesRef.current === 0) {
        showFeedback(` No lives left! Now penalties will deduct points!`, 'warning');
      }
    } else {
      // No lives left: -1 point penalty
      scoreRef.current = Math.max(0, scoreRef.current - 1);
      setScore(scoreRef.current);
      playSound('penalty');
      showFeedback(` Miss! -1 point penalty (No lives left)`, 'error');
    }
    
    // Reset streak on any mistake
    streakRef.current = 0;
    setStreak(0);
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
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const resetBars = (cvs) => {
    if (!cvs || !isActiveRef.current || gameStateRef.current !== 'playing') return;
    
    barsRef.current.pos = -cvs.width / 2;
    const newSpeed = 400 + Math.random() * 800;
    barsRef.current.speed = newSpeed;
    setVelocity(newSpeed);
    barsRef.current.active = true;
    setRoundActive(true);
    playSound('reset');
  };

  const startNextRound = () => {
    if (!isActiveRef.current || gameStateRef.current !== 'playing') return;
    
    const cvs = canvasRef.current;
    if (cvs) {
      resetBars(cvs);
    }
  };

  useEffect(() => {
    const handleMouseDown = () => {
      if (gameState !== 'playing' || !isActiveRef.current) return;
      if (!barsRef.current.active) return;
      
      const errorMs = (barsRef.current.pos / barsRef.current.speed) * 1000;
      const absError = Math.abs(errorMs);
      
      totalAttemptsRef.current++;
      lastResultRef.current = { error: errorMs, show: true, timer: 0.8 };
      
      if (absError < 50) { // Within 50ms is a hit
        hitsRef.current++;
        
        if (absError < 16.6) {
          // PERFECT HIT
          perfectHitsRef.current++;
          setPerfectHits(perfectHitsRef.current);
          
          const pointsEarned = calculatePoints();
          scoreRef.current += pointsEarned;
          setScore(scoreRef.current);
          
          const newStreak = streakRef.current + 1;
          streakRef.current = newStreak;
          setStreak(newStreak);
          
          if (newStreak > bestStreak) {
            setBestStreak(newStreak);
            localStorage.setItem('synchronizationBestStreak', newStreak.toString());
          }
          
          if (newStreak % 5 === 0 && newStreak > 0) {
            playSound('streak');
            showFeedback(`🔥 ${newStreak} Streak! +${pointsEarned}`, 'success');
          } else {
            playSound('perfect');
            showFeedback(`✓ PERFECT! +${pointsEarned}`, 'success');
          }
        } else {
          // GOOD HIT - also counts but no point penalty
          const pointsEarned = calculatePoints();
          scoreRef.current += pointsEarned;
          setScore(scoreRef.current);
          
          const newStreak = streakRef.current + 1;
          streakRef.current = newStreak;
          setStreak(newStreak);
          
          if (newStreak > bestStreak) {
            setBestStreak(newStreak);
            localStorage.setItem('synchronizationBestStreak', newStreak.toString());
          }
          
          playSound('perfect');
          showFeedback(`✓ HIT! +${pointsEarned}`, 'success');
        }
      } else {
        // Miss - apply penalty
        applyPenalty();
        lastResultRef.current.error = 999;
      }
      
      barsRef.current.active = false;
      setRoundActive(false);
      
      const accuracyPercent = totalAttemptsRef.current > 0 
        ? (hitsRef.current / totalAttemptsRef.current) * 100 
        : 100;
      setAccuracy(Math.round(accuracyPercent));
      
      // Schedule next round
      if (resetTimeoutRef.current) clearTimeout(resetTimeoutRef.current);
      resetTimeoutRef.current = setTimeout(() => {
        if (isActiveRef.current && gameStateRef.current === 'playing') {
          startNextRound();
        }
      }, 400);
    };
    
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('contextmenu', (e) => e.preventDefault());
    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('contextmenu', (e) => e.preventDefault());
    };
  }, [gameState, bestStreak]);

  // Game loop
  useEffect(() => {
    if (gameState !== 'playing') return;

    const cvs = canvasRef.current;
    if (!cvs) return;

    const ctx = cvs.getContext('2d', { alpha: false, desynchronized: true });

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
      
      cvs.style.position = 'absolute';
      cvs.style.left = `${(containerWidth - width) / 2}px`;
      cvs.style.top = `${(containerHeight - height) / 2}px`;
      
      // Only reset if game is active and no round is currently active
      if (isActiveRef.current && gameStateRef.current === 'playing' && !barsRef.current.active) {
        resetBars(cvs);
      }
    };

    const resizeObserver = new ResizeObserver(() => updateCanvasSize());
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    
    window.addEventListener('resize', updateCanvasSize);
    updateCanvasSize();
    
    let lastFrameTime = performance.now();

    function update(dt) {
      if (!isActiveRef.current) return;
      
      if (barsRef.current.active) {
        barsRef.current.pos += barsRef.current.speed * dt;
        
        // Bars passed center - timeout penalty
        if (barsRef.current.pos > 100) {
          applyPenalty();
          barsRef.current.active = false;
          setRoundActive(false);
          lastResultRef.current = { error: 999, show: true, timer: 0.8 };
          
          // Schedule next round
          if (resetTimeoutRef.current) clearTimeout(resetTimeoutRef.current);
          resetTimeoutRef.current = setTimeout(() => {
            if (isActiveRef.current && gameStateRef.current === 'playing') {
              startNextRound();
            }
          }, 400);
        }
      }
      
      if (lastResultRef.current.timer > 0) {
        lastResultRef.current.timer -= dt;
      }
    }

    function draw() {
      const now = performance.now();
      const dt = Math.min(0.033, (now - lastFrameTime) / 1000);
      lastFrameTime = now;
      
      update(dt);
      
      ctx.fillStyle = isBoxDarkMode ? "#020202" : "#f9fafb";
      ctx.fillRect(0, 0, cvs.width, cvs.height);
      
      // Subtle grid pattern
      ctx.strokeStyle = isBoxDarkMode ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)';
      ctx.lineWidth = 1;
      for (let i = 0; i < cvs.width; i += 40) {
        ctx.beginPath();
        ctx.moveTo(i, 0); ctx.lineTo(i, cvs.height); ctx.stroke();
      }
      
      const cx = cvs.width / 2;
      const cy = cvs.height / 2;
      
      // Contact Line
      ctx.strokeStyle = isBoxDarkMode ? "#333" : "#e0e0e0";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(cx, cy - 100);
      ctx.lineTo(cx, cy + 100);
      ctx.stroke();
      
      // Center marker
      ctx.beginPath();
      ctx.arc(cx, cy, 6, 0, Math.PI * 2);
      ctx.fillStyle = isBoxDarkMode ? "#FFF" : "#000";
      ctx.fill();
      
      if (barsRef.current.active) {
        const isNearCenter = Math.abs(barsRef.current.pos) < 20;
        const barColor = isNearCenter ? "#00ff88" : (isBoxDarkMode ? "#FFF" : "#000");
        ctx.fillStyle = barColor;
        
        const barWidth = 40;
        const barHeight = 120;
        const barY = cy - barHeight / 2;
        
        ctx.fillRect(cx + barsRef.current.pos - barWidth, barY, barWidth, barHeight);
        ctx.fillRect(cx - barsRef.current.pos, barY, barWidth, barHeight);
        
        if (isNearCenter) {
          ctx.shadowBlur = 15;
          ctx.shadowColor = "#00ff88";
          ctx.fillRect(cx + barsRef.current.pos - barWidth, barY, barWidth, barHeight);
          ctx.fillRect(cx - barsRef.current.pos, barY, barWidth, barHeight);
          ctx.shadowBlur = 0;
        }
      }
      
      // Result Feedback
      if (lastResultRef.current.show && lastResultRef.current.timer > 0) {
        const isMiss = lastResultRef.current.error === 999;
        const errorValue = lastResultRef.current.error;
        const isPerfect = !isMiss && Math.abs(errorValue) < 16.6;
        
        ctx.fillStyle = isMiss ? "#FF3E3E" : (isPerfect ? "#00ff88" : "#00FFFF");
        ctx.font = "bold 32px monospace";
        ctx.textAlign = "center";
        
        if (isMiss) {
          ctx.fillText("MISS", cx, cy + 150);
        } else {
          ctx.fillText(`${errorValue > 0 ? "+" : ""}${errorValue.toFixed(1)}ms`, cx, cy + 150);
        }
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

      animationFrameRef.current = requestAnimationFrame(draw);
    }

    animationFrameRef.current = requestAnimationFrame(draw);

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      window.removeEventListener('resize', updateCanvasSize);
      resizeObserver.disconnect();
    };
  }, [gameState, isBoxDarkMode]);

  const startGame = () => {
    // Cancel any existing animation frame
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    
    setGameState('playing');
    gameStateRef.current = 'playing';
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setVelocity(400);
    setAccuracy(100);
    setPerfectHits(0);
    setTimeLeft(60);
    setLives(3);
    setFeedback('');
    setRoundActive(false);
    
    isActiveRef.current = true;
    scoreRef.current = 0;
    streakRef.current = 0;
    livesRef.current = 3;
    totalAttemptsRef.current = 0;
    hitsRef.current = 0;
    perfectHitsRef.current = 0;
    barsRef.current.active = false;
    lastResultRef.current = { error: 0, show: false, timer: 0 };
    
    if (resetTimeoutRef.current) clearTimeout(resetTimeoutRef.current);
    
    showFeedback('60 seconds • Click when bars align!', 'success');
    
    // Start first round after a short delay
    setTimeout(() => {
      if (isActiveRef.current && gameStateRef.current === 'playing' && canvasRef.current) {
        resetBars(canvasRef.current);
      }
    }, 200);
  };

  const resetGame = () => {
    isActiveRef.current = false;
    setGameState('start');
    gameStateRef.current = 'start';
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setVelocity(400);
    setAccuracy(100);
    setPerfectHits(0);
    setTimeLeft(60);
    setLives(3);
    setFeedback('');
    setRoundActive(false);
    
    barsRef.current.active = false;
    if (resetTimeoutRef.current) clearTimeout(resetTimeoutRef.current);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
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
          <Link href="/drills/motor" className={`inline-flex items-center gap-2 mb-4 ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>
            <ArrowLeft className="w-4 h-4" />
            Back to Motor Drills
          </Link>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl">
                <GitBranch className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Synchronization Elite</h1>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>+1 per hit • -1 penalty after lives empty • 3  • 60s</p>
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
          <StatCard icon={<Timer className={timeLeft <= 10 ? 'text-red-600' : 'text-green-600'} />} value={timeLeft} label="Time" unit="s" isDark={isDarkMode} />
          <StatCard icon={<Heart className={lives === 0 ? 'text-yellow-500' : 'text-red-500'} />} value={lives} label="Lives" isDark={isDarkMode} />
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
            overflow: 'hidden',
            cursor: 'none'
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
                Score: <span className="text-yellow-400">{score}</span> | Velocity: <span className="text-cyan-400">{velocity}px/s</span> | Lives: <span className={lives === 0 ? 'text-yellow-400' : 'text-red-400'}>{lives}</span>
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
            <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
              <div className={`rounded-2xl p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <GitBranch className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Synchronization Elite</h3>
                <p className={`mb-6 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>60-second challenge • Click when bars align</p>
                <button 
                  onClick={startGame} 
                  className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-lg w-full transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  Begin Sync Training
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
                  <ResultCard label="Perfect Syncs" value={perfectHits} icon={<Award className="w-4 h-4" />} color="text-green-500" isDark={isBoxDarkMode} />
                  <ResultCard label="Lives Left" value={lives} icon={<Heart className="w-4 h-4" />} color="text-red-500" isDark={isBoxDarkMode} />
                </div>
                
                <div className="flex gap-4">
                  <Link href="/drills/motor" className="flex-1">
                    <button className={`w-full px-4 py-2.5 rounded-lg font-semibold transition-all ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                      ← Back
                    </button>
                  </Link>
                  <button 
                    onClick={startGame} 
                    className="flex-1 px-4 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98]"
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
                  <Info className={`w-4 h-4 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />
                  <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Drill Rules & Scoring</h3>
                </div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">1</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-green-500">Click when bars align with center line</span> • Bars glow green when near
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">2</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-emerald-500">+1 point per successful hit</span>
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">3</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-red-500">-1 point penalty</span> ONLY when out of lives
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">4</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-purple-500">Variable velocity: 400-1200 px/s</span> • Random each round
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-pink-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">5</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-pink-500">3  protection</span> • No score penalty until lives reach 0
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">6</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Challenge lasts <span className="font-semibold text-yellow-500">60 seconds</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className={`mt-3 pt-3 border-t text-xs ${isDarkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'} flex items-center justify-between`}>
                  <span>🎯 400ms cooldown between rounds • 5 streak bonus notification</span>
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