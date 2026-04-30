'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Target, Zap, Clock, Award, Activity, 
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, 
  Eye, Timer, Play, Pause, RotateCcw, Brain, Info
} from 'lucide-react';

export default function PomodoroSyncPage() {
  const [loading, setLoading] = useState(true);
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const containerRef = useRef(null);
  const [gameState, setGameState] = useState('start');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isBoxDarkMode, setIsBoxDarkMode] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  
  const [displayTime, setDisplayTime] = useState("25:00");
  const [mode, setMode] = useState("FOCUS");
  const [isRunning, setIsRunning] = useState(false);
  const [score, setScore] = useState(0);
  const [completedPomodoros, setCompletedPomodoros] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [totalFocusTime, setTotalFocusTime] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  
  const secondsRef = useRef(25 * 60);
  const totalRef = useRef(25 * 60);
  const isBreakRef = useRef(false);
  const runningRef = useRef(false);
  const lastTimeRef = useRef(performance.now());
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const soundPlayedRef = useRef(false);
  const feedbackTimeoutRef = useRef(null);
  const audioCtxRef = useRef(null);
  const isActiveRef = useRef(false);
  const gameStateRef = useRef('start');
  const scoreRef = useRef(0);
  const focusSecondsRef = useRef(0);
  const focusScoreTimerRef = useRef(0);
  
  const FOCUS_TIME = 25 * 60;
  const BREAK_TIME = 5 * 60;

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
      
      if (type === 'focus') {
        osc.frequency.value = 880;
        gain.gain.value = 0.1;
      } else if (type === 'break') {
        osc.frequency.value = 660;
        gain.gain.value = 0.1;
      } else if (type === 'complete') {
        osc.frequency.value = 1046.5;
        gain.gain.value = 0.12;
      }
      osc.start();
      gain.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 0.15);
      osc.stop(audioCtx.currentTime + 0.15);
    } catch (e) {}
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

  const updateTimer = () => {
    const now = performance.now();
    const dt = Math.min(0.1, (now - lastTimeRef.current) / 1000);
    lastTimeRef.current = now;

    if (runningRef.current && secondsRef.current > 0) {
      secondsRef.current -= dt;
      
      // Track focus time and add score every minute (1 min = 1 point)
      if (!isBreakRef.current) {
        focusSecondsRef.current += dt;
        focusScoreTimerRef.current += dt;
        
        // Add 1 point for every 60 seconds (1 minute) of focus
        if (focusScoreTimerRef.current >= 60) {
          const minutesEarned = Math.floor(focusScoreTimerRef.current / 60);
          scoreRef.current += minutesEarned;
          setScore(scoreRef.current);
          focusScoreTimerRef.current -= minutesEarned * 60;
          if (minutesEarned > 0) {
            showFeedback(`+${minutesEarned} Focus Points!`, 'success');
          }
        }
        
        setTotalFocusTime(Math.floor(focusSecondsRef.current / 60));
      }
      
      const m = Math.floor(secondsRef.current / 60);
      const s = Math.floor(secondsRef.current % 60);
      setDisplayTime(`${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`);
      
    } else if (secondsRef.current <= 0 && isActiveRef.current) {
      if (!soundPlayedRef.current) {
        soundPlayedRef.current = true;
        
        if (!isBreakRef.current) {
          const newCount = completedPomodoros + 1;
          setCompletedPomodoros(newCount);
          setCurrentStreak(newCount);
          
          playSound('focus');
          showFeedback(`✓ Pomodoro Complete!`, 'success');
          
          if (newCount > bestStreak) {
            setBestStreak(newCount);
          }
        } else {
          playSound('break');
          showFeedback(`☕ Break Complete!`, 'success');
          setCurrentStreak(0);
        }
        
        isBreakRef.current = !isBreakRef.current;
        secondsRef.current = isBreakRef.current ? BREAK_TIME : FOCUS_TIME;
        totalRef.current = secondsRef.current;
        setMode(isBreakRef.current ? "BREAK" : "FOCUS");
        runningRef.current = false;
        setIsRunning(false);
        
        setTimeout(() => {
          soundPlayedRef.current = false;
        }, 1000);
        
        const m = Math.floor(secondsRef.current / 60);
        const s = Math.floor(secondsRef.current % 60);
        setDisplayTime(`${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`);
      }
    }
  };

  const toggleTimer = () => {
    if (!isActiveRef.current) return;
    runningRef.current = !runningRef.current;
    setIsRunning(runningRef.current);
    lastTimeRef.current = performance.now();
  };

  const resetTimer = () => {
    if (!isActiveRef.current) return;
    runningRef.current = false;
    setIsRunning(false);
    isBreakRef.current = false;
    secondsRef.current = FOCUS_TIME;
    totalRef.current = FOCUS_TIME;
    setMode("FOCUS");
    const m = Math.floor(FOCUS_TIME / 60);
    const s = FOCUS_TIME % 60;
    setDisplayTime(`${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`);
    soundPlayedRef.current = false;
    showFeedback(`⏱️ Timer Reset`, 'warning');
  };

  const endSession = () => {
    setGameState('gameOver');
    gameStateRef.current = 'gameOver';
    isActiveRef.current = false;
    runningRef.current = false;
    setIsRunning(false);
  };

  useEffect(() => {
    return () => {
      isActiveRef.current = false;
      if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
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

    function draw() {
      updateTimer();
      
      ctx.fillStyle = isBoxDarkMode ? "#020202" : "#f9fafb";
      ctx.fillRect(0, 0, cvs.width, cvs.height);
      
      // Subtle grid pattern
      ctx.strokeStyle = isBoxDarkMode ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)';
      ctx.lineWidth = 1;
      for (let i = 0; i < cvs.width; i += 40) {
        ctx.beginPath();
        ctx.moveTo(i, 0); ctx.lineTo(i, cvs.height); ctx.stroke();
      }
      for (let i = 0; i < cvs.height; i += 40) {
        ctx.beginPath();
        ctx.moveTo(0, i); ctx.lineTo(cvs.width, i); ctx.stroke();
      }

      const cx = cvs.width / 2;
      const cy = cvs.height / 2;
      const radius = Math.min(cvs.width, cvs.height) * 0.35;
      const progress = secondsRef.current / totalRef.current;

      // Background Ring
      ctx.strokeStyle = isBoxDarkMode ? "#1a1a1a" : "#e5e7eb";
      ctx.lineWidth = 8;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.stroke();

      // Progress Ring
      if (runningRef.current || progress < 1) {
        const ringColor = isBreakRef.current 
          ? (isBoxDarkMode ? "#0088FF" : "#3b82f6")
          : (isBoxDarkMode ? "#00FF41" : "#10b981");
        ctx.strokeStyle = ringColor;
        ctx.lineWidth = 8;
        ctx.beginPath();
        ctx.arc(cx, cy, radius, -Math.PI/2, (-Math.PI/2) + (Math.PI * 2 * progress));
        ctx.stroke();
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
        ctx.arc(m.x, m.y, 20, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(0, 255, 136, 0.3)';
        ctx.stroke();
        ctx.fillStyle = '#00ff88';
        ctx.fillRect(m.x - 2, m.y - 2, 4, 4);
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
    setCompletedPomodoros(0);
    setBestStreak(0);
    setFeedback('');
    setTotalFocusTime(0);
    setCurrentStreak(0);
    
    isActiveRef.current = true;
    runningRef.current = false;
    setIsRunning(false);
    isBreakRef.current = false;
    secondsRef.current = FOCUS_TIME;
    totalRef.current = FOCUS_TIME;
    setMode("FOCUS");
    scoreRef.current = 0;
    focusSecondsRef.current = 0;
    focusScoreTimerRef.current = 0;
    const m = Math.floor(FOCUS_TIME / 60);
    const s = FOCUS_TIME % 60;
    setDisplayTime(`${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`);
    soundPlayedRef.current = false;
    lastTimeRef.current = performance.now();
  };

  const resetGame = () => {
    isActiveRef.current = false;
    setGameState('start');
    gameStateRef.current = 'start';
    setScore(0);
    setCompletedPomodoros(0);
    setBestStreak(0);
    setFeedback('');
    setTotalFocusTime(0);
    setCurrentStreak(0);
  };

  if (loading) {
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
          <Link href="/drills/productivity" className={`inline-flex items-center gap-2 mb-4 ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>
            <ArrowLeft className="w-4 h-4" /> Back to Productivity Drills
          </Link>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl">
                <Timer className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Pomodoro Sync</h1>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>25min focus / 5min break • 1 min = 1 point</p>
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

        {/* Stats Board - Removed Mistakes */}
        <div className="grid grid-cols-5 gap-3 mb-4 h-[88px]">
          <StatCard icon={<Target className="text-blue-600" />} value={score} label="Focus Score" isDark={isDarkMode} />
          <StatCard icon={<Timer className="text-green-600" />} value={completedPomodoros} label="Pomodoros" isDark={isDarkMode} />
          <StatCard icon={<Zap className="text-orange-500" />} value={currentStreak} label="Current Streak" isDark={isDarkMode} />
          <StatCard icon={<Award className="text-yellow-500" />} value={bestStreak} label="Best Streak" isDark={isDarkMode} />
          <StatCard icon={<Clock className="text-purple-500" />} value={totalFocusTime} label="Focus Time" unit="m" isDark={isDarkMode} />
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
            <>
              <div className="absolute top-4 right-4 z-30 flex gap-3">
                <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 bg-black/50 rounded-lg text-white hover:bg-black/70 transition-all">{isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}</button>
                <button onClick={() => setIsBoxDarkMode(!isBoxDarkMode)} className="p-2 bg-black/50 rounded-lg text-white hover:bg-black/70 transition-all"><Eye className="w-5 h-5" /></button>
                <button onClick={() => setSoundEnabled(!soundEnabled)} className="p-2 bg-black/50 rounded-lg text-white hover:bg-black/70 transition-all">{soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}</button>
                <button onClick={toggleFullscreen} className="p-2 bg-black/50 rounded-lg text-white hover:bg-black/70 transition-all"><Minimize2 className="w-5 h-5" /></button>
              </div>
              <div className="absolute top-4 left-4 z-30 bg-black/50 backdrop-blur-sm rounded-lg px-4 py-2 text-white text-sm">
                Score: <span className="text-yellow-400">{score}</span> | Pomodoros: <span className="text-green-400">{completedPomodoros}</span> | Mode: <span className={mode === "FOCUS" ? "text-green-400" : "text-blue-400"}>{mode}</span>
              </div>
            </>
          )}

          <canvas ref={canvasRef} style={{ display: 'block', position: 'absolute', cursor: 'none' }} />

          {/* Timer Display */}
          {gameState === 'playing' && (
            <>
              <div 
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  textAlign: 'center',
                  pointerEvents: 'none',
                  zIndex: 10
                }}
              >
                <div 
                  style={{
                    fontSize: '80px',
                    color: isBoxDarkMode ? '#FFFFFF' : '#000000',
                    fontWeight: 'bold',
                    fontFamily: 'monospace'
                  }}
                >
                  {displayTime}
                </div>
                <div 
                  style={{
                    fontSize: '14px',
                    color: isRunning 
                      ? (mode === "BREAK" ? (isBoxDarkMode ? "#0088FF" : "#3b82f6") : (isBoxDarkMode ? "#00FF41" : "#10b981"))
                      : (isBoxDarkMode ? "#444" : "#aaa"),
                    letterSpacing: '4px',
                    textTransform: 'uppercase',
                    marginTop: '5px'
                  }}
                >
                  {mode}
                </div>
              </div>

              {/* Control Buttons */}
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-4 z-20">
                <button onClick={toggleTimer} className={`p-4 rounded-full transition-all duration-200 hover:scale-105 ${isBoxDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'}`}>
                  {isRunning ? 
                    <Pause className={`w-6 h-6 ${isBoxDarkMode ? 'text-white' : 'text-gray-700'}`} /> : 
                    <Play className={`w-6 h-6 ${isBoxDarkMode ? 'text-white' : 'text-gray-700'}`} />
                  }
                </button>
                <button onClick={resetTimer} className={`p-4 rounded-full transition-all duration-200 hover:scale-105 ${isBoxDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'}`}>
                  <RotateCcw className={`w-6 h-6 ${isBoxDarkMode ? 'text-white' : 'text-gray-700'}`} />
                </button>
              </div>

              {/* End Session Button */}
              <button 
                onClick={endSession}
                className="absolute bottom-8 right-8 z-20 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-all"
              >
                End Session
              </button>
            </>
          )}

          {/* Start Screen */}
          {gameState === 'start' && (
            <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
              <div className={`rounded-2xl p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <Timer className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Pomodoro Sync</h3>
                <p className={`mb-6 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>25min focus • 5min break • 1 min = 1 point</p>
                <button 
                  onClick={startGame} 
                  className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-lg w-full transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  Start Timer
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
                  <ResultCard label="Focus Score" value={score} icon={<Target className="w-4 h-4" />} color="text-blue-500" />
                  <ResultCard label="Pomodoros" value={completedPomodoros} icon={<Timer className="w-4 h-4" />} color="text-green-500" />
                  <ResultCard label="Best Streak" value={bestStreak} icon={<Award className="w-4 h-4" />} color="text-yellow-500" />
                  <ResultCard label="Focus Time" value={totalFocusTime} unit=" min" icon={<Clock className="w-4 h-4" />} color="text-purple-500" />
                  <ResultCard label="Efficiency" value={totalFocusTime > 0 ? Math.round((score / totalFocusTime) * 10) / 10 : 0} unit="/min" icon={<Activity className="w-4 h-4" />} color="text-orange-500" />
                </div>
                
                <div className="flex gap-4">
                  <Link href="/drills/productivity" className="flex-1">
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
                  <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Drill Rules & Instructions</h3>
                </div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">1</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-green-500">1 minute of focus = 1 point</span> • Earn points continuously
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">2</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-blue-500">Complete Pomodoro cycle</span> • 25min focus / 5min break
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">3</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-orange-500">Streak = Consecutive Pomodoros</span> • Resets on break
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">4</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-purple-500">Use Play/Pause to control timer</span>
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-cyan-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">5</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-cyan-500">Click "End Session"</span> to finish and see results
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">6</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-yellow-500">Reset timer is free (no penalty)</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className={`mt-3 pt-3 border-t text-xs ${isDarkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'} flex items-center justify-between`}>
                  <span>🍅 Green ring = Focus • Blue ring = Break</span>
                  <span>⚡ 25min focus / 5min break cycle</span>
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
                   color === 'text-green-500' ? 'bg-green-500/10' :
                   color === 'text-yellow-500' ? 'bg-yellow-500/10' : 
                   color === 'text-purple-500' ? 'bg-purple-500/10' :
                   color === 'text-red-500' ? 'bg-red-500/10' : 'bg-orange-500/10';
  
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