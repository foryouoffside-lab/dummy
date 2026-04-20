'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Target, Zap, Clock, Award, Activity, 
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, 
  Eye, Timer, Crosshair, Brain, X, Trophy, Info
} from 'lucide-react';

export default function AutoPursuitPage() {
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
  const [trackingTime, setTrackingTime] = useState(0);
  const [bestTime, setBestTime] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [timeLeft, setTimeLeft] = useState(60);
  const [mistakes, setMistakes] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  
  const targetRef = useRef({ x: 0, y: 0, vx: 6, vy: 6, r: 30 });
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const trackingTimeRef = useRef(0);
  const bestTimeRef = useRef(0);
  const scoreRef = useRef(0);
  const totalFramesRef = useRef(0);
  const hitFramesRef = useRef(0);
  const offTargetFramesRef = useRef(0);
  const isActiveRef = useRef(false);
  const gameStateRef = useRef('start');
  const timerIntervalRef = useRef(null);
  const feedbackTimeoutRef = useRef(null);
  const audioCtxRef = useRef(null);
  const scoreAccumulatorRef = useRef(0);

  // Load best score from localStorage
  useEffect(() => {
    const savedBestScore = localStorage.getItem('autoPursuitBestScore');
    if (savedBestScore) {
      setBestScore(parseInt(savedBestScore, 10));
    }
  }, []);

  // Update best score ONLY when game ends
  const updateBestScore = (finalScore) => {
    const currentBestScore = parseInt(localStorage.getItem('autoPursuitBestScore') || '0', 10);
    if (finalScore > currentBestScore) {
      localStorage.setItem('autoPursuitBestScore', finalScore.toString());
      setBestScore(finalScore);
    }
  };

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
      
      if (type === 'record') {
        osc.frequency.value = 1046.5;
        gain.gain.value = 0.12;
      } else if (type === 'penalty') {
        osc.frequency.value = 440;
        gain.gain.value = 0.1;
      } else if (type === 'streak') {
        osc.frequency.value = 1318;
        gain.gain.value = 0.12;
      } else if (type === 'score') {
        osc.frequency.value = 880;
        gain.gain.value = 0.08;
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
            
            const finalAccuracy = totalFramesRef.current > 0 
              ? Math.round((hitFramesRef.current / totalFramesRef.current) * 100) 
              : 100;
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

  const addPenalty = () => {
    if (!isActiveRef.current) return;
    
    const penaltyPoints = 5;
    scoreRef.current = Math.max(0, scoreRef.current - penaltyPoints);
    setScore(scoreRef.current);
    setMistakes(prev => prev + 1);
    showFeedback(`✗ Off target! -${penaltyPoints}`, 'error');
    playSound('penalty');
    
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
      mousePositionRef.current = {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY
      };
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const resetPosition = (width, height) => {
    targetRef.current.x = width / 2 + (Math.random() - 0.5) * 200;
    targetRef.current.y = height / 2 + (Math.random() - 0.5) * 200;
    const angle = Math.random() * Math.PI * 2;
    targetRef.current.vx = Math.cos(angle) * 6;
    targetRef.current.vy = Math.sin(angle) * 6;
  };

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
      resetPosition(width, height);
    };

    const resizeObserver = new ResizeObserver(updateCanvasSize);
    if (containerRef.current) resizeObserver.observe(containerRef.current);
    window.addEventListener('resize', updateCanvasSize);
    updateCanvasSize();

    function update() {
      if (!isActiveRef.current) return;
      
      const target = targetRef.current;
      const mouse = mousePositionRef.current;
      
      target.x += target.vx;
      target.y += target.vy;
      
      if (Math.random() > 0.97) {
        target.vx += (Math.random() - 0.5) * 8;
        target.vy += (Math.random() - 0.5) * 8;
        const mag = Math.hypot(target.vx, target.vy);
        if (mag > 12) {
          target.vx *= 0.7;
          target.vy *= 0.7;
        }
      }
      
      if (target.x < 35 || target.x > cvs.width - 35) target.vx *= -1;
      if (target.y < 35 || target.y > cvs.height - 35) target.vy *= -1;
      
      target.x = Math.max(35, Math.min(cvs.width - 35, target.x));
      target.y = Math.max(35, Math.min(cvs.height - 35, target.y));
      
      const dist = Math.hypot(mouse.x - target.x, mouse.y - target.y);
      totalFramesRef.current++;
      
      if (dist < target.r) {
        trackingTimeRef.current++;
        hitFramesRef.current++;
        offTargetFramesRef.current = 0;
        setTrackingTime(trackingTimeRef.current);
        
        // Add score every second (60 frames)
        if (trackingTimeRef.current > 0 && trackingTimeRef.current % 60 === 0) {
          const pointsEarned = 5;
          scoreRef.current += pointsEarned;
          setScore(scoreRef.current);
          showFeedback(`+${pointsEarned} Tracking!`, 'success');
          playSound('score');
        }
      } else {
        trackingTimeRef.current = 0;
        setTrackingTime(0);
        offTargetFramesRef.current++;
        
        // Penalty after 1 second off target
        if (offTargetFramesRef.current > 60) {
          addPenalty();
          offTargetFramesRef.current = 0;
        }
      }
      
      // Update accuracy
      const accuracyPercent = totalFramesRef.current > 0 
        ? Math.round((hitFramesRef.current / totalFramesRef.current) * 100) 
        : 100;
      setAccuracy(accuracyPercent);
      
      // Check for record
      if (trackingTimeRef.current > bestTimeRef.current && trackingTimeRef.current > 180) {
        bestTimeRef.current = trackingTimeRef.current;
        setBestTime(bestTimeRef.current);
        playSound('record');
        showFeedback(`🏆 New Record! ${(bestTimeRef.current / 60).toFixed(1)}s`, 'success');
      }
      
      // Streak bonus notification
      if (trackingTimeRef.current > 0 && trackingTimeRef.current % 300 === 0) {
        playSound('streak');
        showFeedback(`🔥 ${trackingTimeRef.current / 60}s Streak!`, 'success');
      }
    }

    function draw() {
      ctx.fillStyle = isBoxDarkMode ? "#020202" : "#f9fafb";
      ctx.fillRect(0, 0, cvs.width, cvs.height);
      
      ctx.strokeStyle = isBoxDarkMode ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)';
      ctx.lineWidth = 1;
      for (let i = 0; i < cvs.width; i += 40) {
        ctx.beginPath();
        ctx.moveTo(i, 0); ctx.lineTo(i, cvs.height); ctx.stroke();
      }

      const target = targetRef.current;
      const isTracking = trackingTimeRef.current > 0;
      
      ctx.beginPath();
      ctx.arc(target.x, target.y, target.r, 0, Math.PI * 2);
      ctx.fillStyle = isTracking ? "#00ff88" : (isBoxDarkMode ? "#333333" : "#cccccc");
      ctx.shadowBlur = isTracking ? 20 : 0;
      ctx.shadowColor = "#00ff88";
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.strokeStyle = isTracking ? "#00cc66" : (isBoxDarkMode ? "#555555" : "#aaaaaa");
      ctx.lineWidth = 2.5;
      ctx.stroke();
      
      if (isTracking) {
        ctx.beginPath();
        ctx.arc(target.x, target.y, target.r * 0.3, 0, Math.PI * 2);
        ctx.fillStyle = "#FFFFFF";
        ctx.fill();
      }

      // Crosshair
      const m = mousePositionRef.current;
      if (m.x > 0 && m.x < cvs.width && m.y > 0 && m.y < cvs.height) {
        ctx.strokeStyle = "#00ff88";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(m.x - 15, m.y); ctx.lineTo(m.x + 15, m.y);
        ctx.moveTo(m.x, m.y - 15); ctx.lineTo(m.x, m.y + 15);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(m.x, m.y, 20, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(0, 255, 136, 0.3)';
        ctx.stroke();
        ctx.fillStyle = '#00ff88';
        ctx.fillRect(m.x - 2, m.y - 2, 4, 4);
      }

      animationRef.current = requestAnimationFrame(draw);
    }

    function loop() {
      update();
      draw();
      animationRef.current = requestAnimationFrame(loop);
    }

    animationRef.current = requestAnimationFrame(loop);

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
    setTrackingTime(0);
    setBestTime(0);
    setAccuracy(100);
    setTimeLeft(60);
    setMistakes(0);
    setFeedback('');
    
    isActiveRef.current = true;
    trackingTimeRef.current = 0;
    bestTimeRef.current = 0;
    scoreRef.current = 0;
    totalFramesRef.current = 0;
    hitFramesRef.current = 0;
    offTargetFramesRef.current = 0;
    scoreAccumulatorRef.current = 0;
    
    const cvs = canvasRef.current;
    if (cvs) resetPosition(cvs.width, cvs.height);
  };

  const resetGame = () => {
    isActiveRef.current = false;
    setGameState('start');
    gameStateRef.current = 'start';
    setScore(0);
    setTrackingTime(0);
    setBestTime(0);
    setAccuracy(100);
    setTimeLeft(60);
    setMistakes(0);
    setFeedback('');
  };

  const formatTime = (s) => `${s}s`;
  const formatTrackingTime = (frames) => (frames / 60).toFixed(1);

  if (loading || status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen select-none ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link href="/drills/visual" className={`inline-flex items-center gap-2 mb-4 ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>
            <ArrowLeft className="w-4 h-4" /> Back to Visual Drills
          </Link>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl">
                <Crosshair className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Auto-Pursuit</h1>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Smooth pursuit • 1 sec tracking = +5 pts</p>
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
          <StatCard icon={<Target className="text-blue-600" />} value={score} label="Score" isDark={isDarkMode} />
          <StatCard icon={<Trophy className="text-yellow-500" />} value={bestScore} label="Best" isDark={isDarkMode} />
          <StatCard icon={<Timer className={timeLeft < 15 ? 'text-red-600' : 'text-green-600'} />} value={timeLeft} label="Time" unit="s" isDark={isDarkMode} />
          <StatCard icon={<Zap className="text-orange-500" />} value={`${formatTrackingTime(trackingTime)}s`} label="Current" isDark={isDarkMode} />
          <StatCard icon={<Activity className="text-purple-500" />} value={accuracy} label="Accuracy" unit="%" isDark={isDarkMode} />
          <StatCard icon={<X className="text-red-500" />} value={`${mistakes}/5`} label="Mistakes" isDark={isDarkMode} />
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
                Score: <span className="text-yellow-400">{score}</span> | Tracking: <span className="text-green-400">{formatTrackingTime(trackingTime)}s</span> | Accuracy: <span className="text-cyan-400">{accuracy}%</span>
              </div>
            </>
          )}

          <canvas ref={canvasRef} style={{ display: 'block', position: 'absolute', cursor: 'none' }} />

          {/* Start Screen */}
          {gameState === 'start' && (
            <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
              <div className={`rounded-2xl p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <Crosshair className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Auto-Pursuit</h3>
                <p className={`mb-6 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>60-second challenge • 1 sec tracking = +5 pts</p>
                <button 
                  onClick={startGame} 
                  className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-lg w-full transition-all transform hover:scale-[1.02] active:scale-[0.98]"
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
                  <ResultCard label="Final Score" value={score} icon={<Target className="w-4 h-4" />} color="text-blue-500" />
                  <ResultCard label="Best Score" value={bestScore} icon={<Trophy className="w-4 h-4" />} color="text-yellow-500" />
                  <ResultCard label="Best Tracking" value={`${formatTrackingTime(bestTime)}s`} icon={<Timer className="w-4 h-4" />} color="text-green-500" />
                  <ResultCard label="Accuracy" value={accuracy} unit="%" icon={<Activity className="w-4 h-4" />} color="text-cyan-500" />
                  <ResultCard label="Mistakes" value={mistakes} icon={<X className="w-4 h-4" />} color="text-red-500" />
                  <ResultCard label="Record" value={bestTime > 0 ? '✓' : '—'} icon={<Award className="w-4 h-4" />} color="text-purple-500" />
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
                  <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Drill Rules & Instructions</h3>
                </div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">1</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-green-500">Keep cursor on the moving target</span> • Turns green when tracking
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">2</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-blue-500">1 second of tracking = +5 points</span> • Build your score
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-cyan-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">3</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-cyan-500">Random jitter for predictive training</span> • Stay adaptive
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">4</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-red-500">Off target &gt;1 sec = -5 points</span> • Counts as mistake
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">5</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-purple-500">Beat your record for bonus</span> • 5 sec streak notification
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">6</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-yellow-500">5 mistakes reset score</span> • Best Score saves locally
                      </p>
                    </div>
                  </div>
                </div>
                <div className={`mt-3 pt-3 border-t text-xs ${isDarkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'} flex items-center justify-between`}>
                  <span>🎯 Green ball = Tracking • Gray ball = Off target</span>
                  <span>⚡ 60 second challenge • +5 pts/sec tracking</span>
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
                   color === 'text-cyan-500' ? 'bg-cyan-500/10' :
                   color === 'text-red-500' ? 'bg-red-500/10' : 'bg-purple-500/10';
  
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