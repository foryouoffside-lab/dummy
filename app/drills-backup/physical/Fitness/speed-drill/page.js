'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Target, Zap, Clock, Award, Activity, 
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, 
  Eye, Brain, Trophy, Info, Timer, TrendingUp
} from 'lucide-react';

export default function SpeedDrillElitePage() {
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
  const [velocity, setVelocity] = useState(1.8);
  const [bestVelocity, setBestVelocity] = useState(1.8);
  const [bestReaction, setBestReaction] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [penalties, setPenalties] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  const [accuracy, setAccuracy] = useState(100);
  const [hitsCount, setHitsCount] = useState(0);
  
  const targetRef = useRef({ x: 0, y: 0, r: 0, maxR: 45 });
  const scoreRef = useRef(0);
  const streakRef = useRef(0);
  const velocityRef = useRef(1.8);
  const stateRef = useRef('WAITING');
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const lastTimeRef = useRef(performance.now());
  const spawnTimeRef = useRef(0);
  const totalAttemptsRef = useRef(0);
  const hitsRef = useRef(0);
  const timerIntervalRef = useRef(null);
  const feedbackTimeoutRef = useRef(null);
  const isActiveRef = useRef(false);
  const gameStateRef = useRef('start');
  const audioCtxRef = useRef(null);

  // Load best score from localStorage on mount
  useEffect(() => {
    const savedBestScore = localStorage.getItem('speedDrillBestScore');
    if (savedBestScore) {
      setBestScore(parseInt(savedBestScore, 10));
    }
  }, []);

  // Update best score only when game ends
  const updateBestScore = (finalScore) => {
    const currentBest = parseInt(localStorage.getItem('speedDrillBestScore') || '0', 10);
    if (finalScore > currentBest) {
      localStorage.setItem('speedDrillBestScore', finalScore.toString());
      setBestScore(finalScore);
    }
  };

  // Calculate accuracy
  useEffect(() => {
    if (totalAttemptsRef.current > 0) {
      const acc = (hitsRef.current / totalAttemptsRef.current) * 100;
      setAccuracy(Math.round(acc));
    }
  }, [hitsCount, penalties]);

  // Update best velocity
  useEffect(() => {
    if (velocityRef.current > bestVelocity) {
      setBestVelocity(velocityRef.current);
    }
  }, [velocity]);

  useEffect(() => {
    gameStateRef.current = gameState;
  }, [gameState]);

  useEffect(() => {
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
      
      if (type === 'hit') {
        osc.frequency.value = 880;
        gain.gain.value = 0.1;
      } else if (type === 'miss') {
        osc.frequency.value = 440;
        gain.gain.value = 0.1;
      } else if (type === 'streak') {
        osc.frequency.value = 1046.5;
        gain.gain.value = 0.12;
      } else if (type === 'speed') {
        osc.frequency.value = 1318.52;
        gain.gain.value = 0.1;
      }
      osc.start();
      gain.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 0.15);
      osc.stop(audioCtx.currentTime + 0.15);
    } catch (e) {}
  };

  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      timerIntervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setGameState('gameOver');
            gameStateRef.current = 'gameOver';
            isActiveRef.current = false;
            
            // Update best score ONLY when game ends
            const finalScore = Math.floor(scoreRef.current);
            updateBestScore(finalScore);
            
            if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [gameState]);

  const addPenalty = (reason) => {
    if (!isActiveRef.current) return;
    
    totalAttemptsRef.current++;
    setPenalties(prev => prev + 1);
    
    // Score penalty - minimum 0 (no negative scores)
    scoreRef.current = Math.max(0, scoreRef.current - 30);
    setScore(Math.floor(scoreRef.current));
    
    streakRef.current = 0;
    setStreak(0);
    velocityRef.current = Math.max(1.5, velocityRef.current - 0.3);
    setVelocity(velocityRef.current);
    
    showFeedback(`âœ— ${reason}! -30`, 'error');
    playSound('miss');
  };

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
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const spawn = (cvs) => {
    if (!cvs || !isActiveRef.current) return;
    
    const padding = 120;
    targetRef.current.x = padding + Math.random() * (cvs.width - padding * 2);
    targetRef.current.y = padding + Math.random() * (cvs.height - padding * 2);
    targetRef.current.r = targetRef.current.maxR;
    stateRef.current = 'ACTIVE';
    spawnTimeRef.current = performance.now();
  };

  useEffect(() => {
    const handleMouseDown = () => {
      if (gameState !== 'playing' || !isActiveRef.current) return;
      if (stateRef.current !== 'ACTIVE') return;
      
      const mouse = mousePositionRef.current;
      const target = targetRef.current;
      const dist = Math.hypot(mouse.x - target.x, mouse.y - target.y);
      
      if (dist < target.r + 12) {
        totalAttemptsRef.current++;
        hitsRef.current++;
        setHitsCount(hitsRef.current);
        
        const reactionMs = Math.floor(performance.now() - spawnTimeRef.current);
        
        if (bestReaction === 0 || reactionMs < bestReaction) {
          setBestReaction(reactionMs);
        }
        
        const newStreak = streakRef.current + 1;
        streakRef.current = newStreak;
        setStreak(newStreak);
        
        if (newStreak > bestStreak) {
          setBestStreak(newStreak);
        }
        
        let pointsEarned = 100;
        if (newStreak % 5 === 0 && newStreak > 0) {
          pointsEarned += 50;
          playSound('streak');
          showFeedback(`ðŸ”¥ ${newStreak} Streak! +${pointsEarned}`, 'success');
        } else {
          playSound('hit');
          showFeedback(`âœ“ ${reactionMs}ms | +${pointsEarned}`, 'success');
        }
        
        // Speed bonus for high velocity
        if (velocityRef.current > 3.5) {
          pointsEarned += 40;
          playSound('speed');
        } else if (velocityRef.current > 2.8) {
          pointsEarned += 20;
        } else if (velocityRef.current > 2.2) {
          pointsEarned += 10;
        }
        
        scoreRef.current += pointsEarned;
        setScore(Math.floor(scoreRef.current));
        
        // Increase velocity on streak milestones
        if (newStreak % 3 === 0) {
          velocityRef.current = Math.min(5.0, velocityRef.current + 0.2);
          setVelocity(velocityRef.current);
        }
        
        if (canvasRef.current) {
          spawn(canvasRef.current);
        }
      } else {
        addPenalty('Miss');
        if (canvasRef.current) {
          spawn(canvasRef.current);
        }
      }
    };
    
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('contextmenu', (e) => e.preventDefault());
    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('contextmenu', (e) => e.preventDefault());
    };
  }, [gameState, bestReaction, bestStreak]);

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
      spawn(cvs);
    };

    const resizeObserver = new ResizeObserver(updateCanvasSize);
    if (containerRef.current) resizeObserver.observe(containerRef.current);
    window.addEventListener('resize', updateCanvasSize);
    updateCanvasSize();
    
    let lastFrameTime = performance.now();

    function update(dt) {
      if (stateRef.current === 'ACTIVE' && isActiveRef.current) {
        targetRef.current.r -= (targetRef.current.maxR * velocityRef.current) * dt;
        if (targetRef.current.r <= 0) {
          addPenalty('Timeout');
          if (canvasRef.current) {
            spawn(canvasRef.current);
          }
        }
      }
    }

    function draw() {
      const now = performance.now();
      const dt = Math.min(0.033, (now - lastFrameTime) / 1000);
      lastFrameTime = now;
      
      update(dt);
      
      // Clear canvas - no text inside
      ctx.fillStyle = isBoxDarkMode ? "#020202" : "#f9fafb";
      ctx.fillRect(0, 0, cvs.width, cvs.height);
      
      // Background grid
      ctx.strokeStyle = isBoxDarkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)';
      ctx.lineWidth = 1;
      for (let i = 0; i < cvs.width; i += 50) {
        ctx.beginPath();
        ctx.moveTo(i, 0); ctx.lineTo(i, cvs.height); ctx.stroke();
        ctx.moveTo(0, i); ctx.lineTo(cvs.width, i); ctx.stroke();
      }
      
      const target = targetRef.current;
      const isHighStreak = streakRef.current > 10;
      const isExtremeVelocity = velocityRef.current > 3.5;
      
      if (stateRef.current === 'ACTIVE') {
        // Outer reference ring (faint)
        ctx.beginPath();
        ctx.arc(target.x, target.y, target.maxR, 0, Math.PI * 2);
        ctx.strokeStyle = isBoxDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)";
        ctx.lineWidth = 1;
        ctx.stroke();
        
        // Shrinking target ring
        ctx.beginPath();
        ctx.arc(target.x, target.y, Math.max(0, target.r), 0, Math.PI * 2);
        
        let strokeColor;
        if (isExtremeVelocity) {
          strokeColor = "#FF4500";
        } else if (isHighStreak) {
          strokeColor = "#00FFFF";
        } else if (velocityRef.current > 2.5) {
          strokeColor = "#FFA500";
        } else {
          strokeColor = "#00ff88";
        }
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = 3.5;
        ctx.stroke();
        
        // Center dot
        ctx.beginPath();
        ctx.arc(target.x, target.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = strokeColor;
        ctx.fill();
      }

      // Crosshair
      const m = mousePositionRef.current;
      if (m.x > 0 && m.x < cvs.width && m.y > 0 && m.y < cvs.height) {
        ctx.strokeStyle = "#00ff88";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(m.x - 14, m.y); ctx.lineTo(m.x + 14, m.y);
        ctx.moveTo(m.x, m.y - 14); ctx.lineTo(m.x, m.y + 14);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(m.x, m.y, 22, 0, Math.PI * 2);
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
    setVelocity(1.8);
    setBestVelocity(1.8);
    setBestReaction(0);
    setTimeLeft(60);
    setPenalties(0);
    setFeedback('');
    setAccuracy(100);
    setHitsCount(0);
    
    isActiveRef.current = true;
    scoreRef.current = 0;
    streakRef.current = 0;
    velocityRef.current = 1.8;
    stateRef.current = 'WAITING';
    totalAttemptsRef.current = 0;
    hitsRef.current = 0;
    
    if (canvasRef.current) {
      spawn(canvasRef.current);
    }
  };

  const formatTime = (s) => `${s}s`;

  if (loading || status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen select-none ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link href="/drills/physical" className={`inline-flex items-center gap-2 mb-4 ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>
            <ArrowLeft className="w-4 h-4" /> Back to Physical Drills
          </Link>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Speed Drill Elite</h1>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Click shrinking rings before they disappear - 60 second challenge</p>
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

        {/* Drill-specific stats board */}
        <div className="grid grid-cols-5 gap-3 mb-4 h-[88px]">
          <StatCard icon={<Target className="text-blue-600" />} value={score} label="Current Score" isDark={isDarkMode} />
          <StatCard icon={<Trophy className="text-yellow-500" />} value={bestScore} label="Best Score" isDark={isDarkMode} />
          <StatCard icon={<Timer className={timeLeft < 15 ? 'text-red-600' : 'text-green-600'} />} value={timeLeft} label="Time Left" unit="s" isDark={isDarkMode} />
          <StatCard icon={<TrendingUp className="text-orange-500" />} value={velocity.toFixed(1)} label="Velocity" unit="x" isDark={isDarkMode} />
          <StatCard icon={<Zap className="text-purple-500" />} value={streak} label="Current Streak" isDark={isDarkMode} />
        </div>

        {/* Feedback Bar */}
        <div className="h-8 mb-2 flex justify-center items-center">
          <div className={`px-4 py-1 rounded-lg text-white font-medium text-sm transition-opacity duration-150 ${feedback ? 'opacity-100' : 'opacity-0'} ${
            feedbackType === 'success' ? 'bg-green-500' : feedbackType === 'warning' ? 'bg-orange-500' : 'bg-red-500'
          }`}>
            {feedback || 'placeholder'}
          </div>
        </div>

        {/* Game Canvas Box - No text inside */}
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

          {/* Start Screen - Clean with only start button */}
          {gameState === 'start' && (
            <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
              <div className={`rounded-2xl p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <Zap className="w-16 h-16 text-orange-500 mx-auto mb-4" />
                <h3 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Speed Drill Elite</h3>
                <p className={`mb-6 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>60-second challenge â€¢ Click shrinking rings before they disappear</p>
                <button 
                  onClick={startGame} 
                  className="px-8 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl font-semibold hover:shadow-lg w-full transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  Start Training
                </button>
              </div>
            </div>
          )}

          {/* Game Over Screen - Optimized results layout */}
          {gameState === 'gameOver' && (
            <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
              <div className={`rounded-2xl p-8 shadow-xl border w-[520px] ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <div className="flex items-center justify-center gap-3 mb-6">
                  <Award className="w-10 h-10 text-yellow-500" />
                  <h3 className={`text-2xl font-bold ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Session Complete!</h3>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <ResultCard label="Final Score" value={score} icon={<Target className="w-4 h-4" />} color="text-yellow-500" />
                  <ResultCard label="Best Score" value={bestScore} icon={<Trophy className="w-4 h-4" />} color="text-yellow-500" />
                  <ResultCard label="Peak Velocity" value={bestVelocity.toFixed(1)} unit="x" icon={<TrendingUp className="w-4 h-4" />} color="text-orange-500" />
                  <ResultCard label="Best Reaction" value={bestReaction || '-'} unit="ms" icon={<Zap className="w-4 h-4" />} color="text-purple-500" />
                  <ResultCard label="Best Streak" value={bestStreak} icon={<Activity className="w-4 h-4" />} color="text-green-500" />
                  <ResultCard label="Accuracy" value={accuracy} unit="%" icon={<Target className="w-4 h-4" />} color="text-cyan-500" />
                  <ResultCard label="Hits" value={hitsCount} icon={<Target className="w-4 h-4" />} color="text-blue-500" />
                  <ResultCard label="Penalties" value={penalties} icon={<Info className="w-4 h-4" />} color="text-red-500" />
                </div>
                
                <div className="flex gap-4">
                  <Link href="/drills/physical" className="flex-1">
                    <button className={`w-full px-4 py-2.5 rounded-lg font-semibold transition-all ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                      â† Back
                    </button>
                  </Link>
                  <button 
                    onClick={startGame} 
                    className="flex-1 px-4 py-2.5 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Play Again â†’
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Drill Rules Section */}
        {!isFullscreen && (
          <div className="mt-6">
            <div className={`rounded-xl border overflow-hidden ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <div className={`px-4 py-3 border-b ${isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'}`}>
                <div className="flex items-center gap-2">
                  <Info className={`w-4 h-4 ${isDarkMode ? 'text-orange-400' : 'text-orange-600'}`} />
                  <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Drill Rules & Instructions</h3>
                </div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">1</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Click the <span className="font-semibold text-green-500">shrinking ring</span> before it disappears</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">2</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}><span className="font-semibold text-orange-500">Velocity increases</span> with every 3 successful hits</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">3</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Higher velocity = <span className="font-semibold text-purple-500">faster shrinking = more points</span></p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">4</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}><span className="font-semibold text-red-500">Penalty (-30)</span> for missing or timeout (score never goes below 0)</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-cyan-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">5</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Every <span className="font-semibold text-cyan-500">5 consecutive hits</span> gives +50 bonus points</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">6</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Challenge lasts <span className="font-semibold text-yellow-500">60 seconds</span> - achieve maximum velocity</p>
                    </div>
                  </div>
                </div>
                <div className={`mt-3 pt-3 border-t text-xs ${isDarkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'} flex items-center justify-between`}>
                  <span>ðŸŽ¯ Base hit: +100pts â€¢ Velocity bonus: +10-40pts</span>
                  <span>âš¡ Ring colors: Green â†’ Orange â†’ Red as velocity increases</span>
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
                   color === 'text-orange-500' ? 'bg-orange-500/10' : 
                   color === 'text-purple-500' ? 'bg-purple-500/10' :
                   color === 'text-green-500' ? 'bg-green-500/10' :
                   color === 'text-cyan-500' ? 'bg-cyan-500/10' :
                   color === 'text-blue-500' ? 'bg-blue-500/10' : 'bg-red-500/10';
  
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