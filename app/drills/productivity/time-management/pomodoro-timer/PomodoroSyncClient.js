'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Target, Zap, Clock, Award, Activity, 
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, 
  Eye, Timer, Play, Pause, RotateCcw, Brain, Info, RefreshCw
} from 'lucide-react';

export default function PomodoroSyncClient() {
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
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
  const bestStreakRef = useRef(0);
  
  const FOCUS_TIME = 25 * 60;
  const BREAK_TIME = 5 * 60;

  // Mark as client-side rendered
  useEffect(() => {
    setIsClient(true);
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    gameStateRef.current = gameState;
  }, [gameState]);

  const toggleFullscreen = useCallback(async () => {
    try {
      if (!isFullscreen) {
        const element = containerRef.current;
        if (element?.requestFullscreen) {
          await element.requestFullscreen();
          setIsFullscreen(true);
        }
      } else {
        if (document.fullscreenElement) {
          await document.exitFullscreen();
        }
        setIsFullscreen(false);
      }
    } catch (error) {
      console.error('Fullscreen error:', error);
    }
  }, [isFullscreen]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const showFeedback = useCallback((message, type) => {
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    setFeedback(message);
    setFeedbackType(type);
    feedbackTimeoutRef.current = setTimeout(() => {
      setFeedback('');
      setFeedbackType('');
    }, 800);
  }, []);

  const initAudio = useCallback(() => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }
      return audioCtxRef.current;
    } catch (e) {
      return null;
    }
  }, []);

  const playSound = useCallback((type) => {
    if (!soundEnabled) return;
    try {
      const audioCtx = initAudio();
      if (!audioCtx) return;
      
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      
      const now = audioCtx.currentTime;
      
      if (type === 'focus') {
        osc.frequency.setValueAtTime(880, now);
        gain.gain.setValueAtTime(0.1, now);
      } else if (type === 'break') {
        osc.frequency.setValueAtTime(660, now);
        gain.gain.setValueAtTime(0.1, now);
      } else if (type === 'complete') {
        osc.frequency.setValueAtTime(1046.5, now);
        gain.gain.setValueAtTime(0.12, now);
      }
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      osc.start(now);
      osc.stop(now + 0.15);
    } catch (e) { /* Audio not supported */ }
  }, [soundEnabled, initAudio]);

  // Mouse tracking
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

  const updateTimer = useCallback(() => {
    const now = performance.now();
    const dt = Math.min(0.1, (now - lastTimeRef.current) / 1000);
    lastTimeRef.current = now;

    if (runningRef.current && secondsRef.current > 0) {
      secondsRef.current -= dt;
      
      if (!isBreakRef.current) {
        focusSecondsRef.current += dt;
        focusScoreTimerRef.current += dt;
        
        if (focusScoreTimerRef.current >= 60) {
          const minutesEarned = Math.floor(focusScoreTimerRef.current / 60);
          scoreRef.current += minutesEarned;
          setScore(scoreRef.current);
          focusScoreTimerRef.current -= minutesEarned * 60;
          if (minutesEarned > 0) {
            showFeedback(`+${minutesEarned} Focus Point${minutesEarned > 1 ? 's' : ''}!`, 'success');
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
          showFeedback('✓ Pomodoro Complete! Great work!', 'success');
          
          if (newCount > bestStreakRef.current) {
            bestStreakRef.current = newCount;
            setBestStreak(newCount);
          }
        } else {
          playSound('break');
          showFeedback('☕ Break Complete! Ready for next session?', 'success');
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
  }, [completedPomodoros, playSound, showFeedback]);

  const toggleTimer = useCallback(() => {
    if (!isActiveRef.current) return;
    runningRef.current = !runningRef.current;
    setIsRunning(runningRef.current);
    lastTimeRef.current = performance.now();
  }, []);

  const resetTimer = useCallback(() => {
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
    showFeedback('⏱️ Timer Reset', 'warning');
  }, [showFeedback]);

  const endSession = useCallback(() => {
    setGameState('gameOver');
    gameStateRef.current = 'gameOver';
    isActiveRef.current = false;
    runningRef.current = false;
    setIsRunning(false);
  }, []);

  // Cleanup
  useEffect(() => {
    return () => {
      isActiveRef.current = false;
      if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    };
  }, []);

  // Canvas animation
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
      
      // Subtle grid
      ctx.strokeStyle = isBoxDarkMode ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)';
      ctx.lineWidth = 1;
      for (let i = 0; i < cvs.width; i += 40) {
        ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, cvs.height); ctx.stroke();
      }
      for (let i = 0; i < cvs.height; i += 40) {
        ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(cvs.width, i); ctx.stroke();
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

      // Crosshair cursor
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
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', updateCanvasSize);
      resizeObserver.disconnect();
    };
  }, [gameState, isBoxDarkMode, updateTimer]);

  const startGame = useCallback(() => {
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
    bestStreakRef.current = 0;
    focusSecondsRef.current = 0;
    focusScoreTimerRef.current = 0;
    const m = Math.floor(FOCUS_TIME / 60);
    const s = FOCUS_TIME % 60;
    setDisplayTime(`${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`);
    soundPlayedRef.current = false;
    lastTimeRef.current = performance.now();
  }, []);

  const resetGame = useCallback(() => {
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    isActiveRef.current = false;
    runningRef.current = false;
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    
    setGameState('start');
    gameStateRef.current = 'start';
    setScore(0);
    setCompletedPomodoros(0);
    setBestStreak(0);
    setFeedback('');
    setTotalFocusTime(0);
    setCurrentStreak(0);
    setIsRunning(false);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
        audioCtxRef.current = null;
      }
    };
  }, []);

  if (loading || !isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Pomodoro timer...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen select-none ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* SEO Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Pomodoro Sync - Focus Timer",
            "url": "https://skilldrills.online/drills/productivity/time-management/pomodoro-timer",
            "description": "Boost productivity with the Pomodoro technique. 25-minute focus sessions with 5-minute breaks. Earn 1 point per minute of focus. Track completed pomodoros, streaks, and total focus time.",
            "applicationCategory": "ProductivityApplication",
            "operatingSystem": "Web",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "author": {
              "@type": "Organization",
              "name": "Global Drill System"
            },
            "educationalUse": ["Time Management", "Productivity", "Focus Training", "Study Timer"],
            "learningResourceType": "Interactive Exercise",
            "interactivityType": "active",
            "inLanguage": "en-US",
            "teaches": ["Time Management", "Pomodoro Technique", "Focus Stamina", "Productivity Habits"]
          })
        }}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-4">
          <ol className="flex flex-wrap items-center gap-2 text-sm">
            <li>
              <Link href="/" className={`hover:underline transition-colors ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>
                Home
              </Link>
            </li>
            <li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} aria-hidden="true">/</li>
            <li>
              <Link href="/drills" className={`hover:underline transition-colors ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>
                Drills
              </Link>
            </li>
            <li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} aria-hidden="true">/</li>
            <li>
              <Link href="/drills/productivity" className={`hover:underline transition-colors ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>
                Productivity
              </Link>
            </li>
            <li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} aria-hidden="true">/</li>
            <li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
              Time Management
            </li>
            <li className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} aria-hidden="true">/</li>
            <li className={`font-medium ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} aria-current="page">
              Pomodoro Sync
            </li>
          </ol>
        </nav>
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex-shrink-0">
              <Timer className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className={`text-2xl sm:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Pomodoro Sync
              </h1>
              <p className={`text-sm sm:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                25min focus / 5min break • 1 minute focus = 1 point
              </p>
            </div>
          </div>
          
          <div className="flex gap-2 flex-shrink-0">
            {gameState === 'playing' && (
              <button 
                onClick={resetGame} 
                className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-100'}`} 
                title="Reset session"
                aria-label="Reset Pomodoro timer"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
            )}
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)} 
              className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`}
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              title={isDarkMode ? 'Light mode' : 'Dark mode'}
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button 
              onClick={() => setIsBoxDarkMode(!isBoxDarkMode)} 
              className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`}
              aria-label="Toggle timer area theme"
              title="Toggle timer area theme"
            >
              <Eye className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setSoundEnabled(!soundEnabled)} 
              className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`}
              aria-label={soundEnabled ? 'Mute sounds' : 'Enable sounds'}
              title={soundEnabled ? 'Mute' : 'Unmute'}
            >
              {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            </button>
            <button 
              onClick={toggleFullscreen} 
              className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`}
              aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
              title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
            >
              {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* SEO Content */}
        <section className="sr-only" aria-label="Drill description for search engines">
          <h2>Pomodoro Sync - Focus Timer & Productivity Tracker</h2>
          <p>
            Boost your productivity with the Pomodoro Technique timer.
            25-minute focus sessions followed by 5-minute break periods.
            Earn 1 focus point for every minute of active focus time.
            Track completed pomodoros, current streak, and best streak.
            Canvas-based progress ring shows remaining time visually.
            Green ring indicates focus mode, blue ring indicates break mode.
            Play/Pause to control the timer. Reset or End Session anytime.
            No penalties - resetting the timer is free.
          </p>
        </section>

        {/* Stats Board */}
        <div className="grid grid-cols-5 gap-3 mb-4 h-[88px]">
          <StatCard icon={<Target className="text-blue-600" />} value={score} label="Focus Score" isDark={isDarkMode} />
          <StatCard icon={<Timer className="text-green-600" />} value={completedPomodoros} label="Pomodoros" isDark={isDarkMode} />
          <StatCard icon={<Zap className="text-orange-500" />} value={currentStreak} label="Streak" isDark={isDarkMode} />
          <StatCard icon={<Award className="text-yellow-500" />} value={bestStreak} label="Best Streak" isDark={isDarkMode} />
          <StatCard icon={<Clock className="text-purple-500" />} value={totalFocusTime} label="Focus Time" unit="m" isDark={isDarkMode} />
        </div>

        {/* Feedback Bar */}
        <div className="h-10 mb-2 flex justify-center items-center">
          <div 
            className={`px-4 py-1.5 rounded-lg text-white font-semibold text-sm transition-all duration-200 ${
              feedback ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            } ${feedbackType === 'success' ? 'bg-green-500' : feedbackType === 'warning' ? 'bg-yellow-500' : 'bg-red-500'}`}
            role="status"
            aria-live="polite"
            aria-atomic="true"
          >
            {feedback || '\u00A0'}
          </div>
        </div>

        {/* Game Canvas Box */}
        <div 
          ref={containerRef}
          className={`relative ${isFullscreen ? 'fixed inset-0 z-50' : 'rounded-xl border-2'}`}
          style={{ 
            background: isBoxDarkMode ? "#020202" : "#ffffff",
            aspectRatio: isFullscreen ? 'auto' : '16/9',
            maxWidth: '100%',
            margin: '0 auto',
            borderColor: isDarkMode ? '#374151' : '#e5e7eb',
            overflow: 'hidden'
          }}
        >
          {/* Fullscreen Controls */}
          {isFullscreen && gameState === 'playing' && (
            <>
              <div className="absolute top-4 right-4 z-30 flex gap-3">
                <button onClick={resetGame} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all" title="Reset session" aria-label="Reset Pomodoro timer">
                  <RefreshCw className="w-5 h-5" />
                </button>
                <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all" aria-label="Toggle dark mode">
                  {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
                <button onClick={() => setIsBoxDarkMode(!isBoxDarkMode)} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all" aria-label="Toggle timer area theme">
                  <Eye className="w-5 h-5" />
                </button>
                <button onClick={() => setSoundEnabled(!soundEnabled)} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all" aria-label="Toggle sound">
                  {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                </button>
                <button onClick={toggleFullscreen} className="p-2.5 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all" aria-label="Exit fullscreen">
                  <Minimize2 className="w-5 h-5" />
                </button>
              </div>
              <div className="absolute top-4 left-4 z-30 bg-black/50 backdrop-blur-sm rounded-lg px-4 py-2 text-white text-sm" aria-live="polite">
                Score: <span className="text-yellow-400 font-bold">{score}</span> | 
                Pomodoros: <span className="text-green-400 font-bold">{completedPomodoros}</span> | 
                Mode: <span className={`font-bold ${mode === "FOCUS" ? "text-green-400" : "text-blue-400"}`}>{mode}</span>
              </div>
            </>
          )}

          <canvas ref={canvasRef} style={{ display: 'block', position: 'absolute', cursor: 'none' }} aria-hidden="true" />

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
                aria-live="polite"
                aria-atomic="true"
              >
                <div 
                  style={{
                    fontSize: 'clamp(40px, 8vw, 80px)',
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
                <button 
                  onClick={toggleTimer} 
                  className={`p-4 rounded-full transition-all duration-200 hover:scale-105 ${isBoxDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'}`}
                  aria-label={isRunning ? 'Pause timer' : 'Start timer'}
                >
                  {isRunning ? 
                    <Pause className={`w-6 h-6 ${isBoxDarkMode ? 'text-white' : 'text-gray-700'}`} /> : 
                    <Play className={`w-6 h-6 ${isBoxDarkMode ? 'text-white' : 'text-gray-700'}`} />
                  }
                </button>
                <button 
                  onClick={resetTimer} 
                  className={`p-4 rounded-full transition-all duration-200 hover:scale-105 ${isBoxDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'}`}
                  aria-label="Reset timer to 25:00"
                >
                  <RotateCcw className={`w-6 h-6 ${isBoxDarkMode ? 'text-white' : 'text-gray-700'}`} />
                </button>
              </div>

              {/* End Session Button */}
              <button 
                onClick={endSession}
                className="absolute bottom-8 right-8 z-20 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
                aria-label="End current session and view results"
              >
                End Session
              </button>
            </>
          )}

          {/* ============ START SCREEN ============ */}
          {gameState === 'start' && (
            <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
              <div className={`rounded-2xl p-6 sm:p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <div className="mb-4">
                  <Timer className="w-16 h-16 text-green-500 mx-auto" aria-hidden="true" />
                </div>
                <h2 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Pomodoro Sync
                </h2>
                <p className={`mb-2 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  25min focus • 5min break • 1 minute = 1 point
                </p>
                <p className={`mb-6 text-sm ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Start the timer and focus. Earn points for every minute of deep work. Complete pomodoros to build streaks.
                </p>
                <button 
                  onClick={startGame} 
                  className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-lg w-full transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  aria-label="Start Pomodoro timer"
                >
                  Start Timer
                </button>
              </div>
            </div>
          )}

          {/* ============ GAME OVER SCREEN ============ */}
          {gameState === 'gameOver' && (
            <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
              <div className={`rounded-2xl p-6 sm:p-8 shadow-xl border w-full max-w-[480px] mx-4 ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Award className="w-10 h-10 text-yellow-500" aria-hidden="true" />
                  <h2 className={`text-2xl font-bold ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Session Complete!
                  </h2>
                </div>
                
                <p className={`text-center text-sm mb-6 ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Great work! Regular Pomodoro sessions build lasting productivity habits.
                </p>
                
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <ResultCard label="Focus Score" value={score} icon={<Target className="w-4 h-4" />} color="blue" isDark={isBoxDarkMode} />
                  <ResultCard label="Pomodoros" value={completedPomodoros} icon={<Timer className="w-4 h-4" />} color="emerald" isDark={isBoxDarkMode} />
                  <ResultCard label="Best Streak" value={`${bestStreak}x`} icon={<Award className="w-4 h-4" />} color="yellow" isDark={isBoxDarkMode} />
                  <ResultCard label="Focus Time" value={totalFocusTime} unit=" min" icon={<Clock className="w-4 h-4" />} color="purple" isDark={isBoxDarkMode} />
                </div>
                
                <div className="flex gap-3">
                  <Link href="/drills/productivity" className="flex-1">
                    <button className={`w-full px-4 py-2.5 rounded-lg font-semibold transition-all ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                      ← Back
                    </button>
                  </Link>
                  <button 
                    onClick={startGame} 
                    className="flex-1 px-4 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  >
                    New Session →
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Rules Section */}
        {!isFullscreen && (
          <footer className="mt-6" aria-label="Drill rules and instructions">
            <div className={`rounded-xl border overflow-hidden ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <div className={`px-4 py-3 border-b ${isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'}`}>
                <div className="flex items-center gap-2">
                  <Info className={`w-4 h-4 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} aria-hidden="true" />
                  <h2 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>How Pomodoro Sync Works</h2>
                </div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">1</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-green-500">1 minute of focus = 1 point</span> • Earn continuously
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">2</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Complete <span className="font-semibold text-blue-500">25min focus / 5min break</span> cycles
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">3</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Streak = <span className="font-semibold text-orange-500">consecutive pomodoros</span> • Resets on break
                      </p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">4</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-purple-500">Play/Pause</span> to control the timer anytime
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-cyan-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">5</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Click <span className="font-semibold text-cyan-500">&quot;End Session&quot;</span> to finish and view results
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">6</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Timer reset is <span className="font-semibold text-yellow-500">free - no penalties</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className={`mt-4 pt-3 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs ${isDarkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'}`}>
                  <span>🍅 Green ring = Focus • Blue ring = Break</span>
                  <span>⚡ 25min focus / 5min break cycle</span>
                </div>
              </div>
            </div>
          </footer>
        )}
      </div>
    </div>
  );
}

// ============ HELPER COMPONENTS ============

function StatCard({ icon, value, label, unit = '', isDark }) {
  return (
    <div className={`rounded-xl shadow-sm border p-2 sm:p-3 text-center flex flex-col justify-center h-full transition-colors ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
      <div className="mb-1 flex justify-center" aria-hidden="true">{icon}</div>
      <p className={`text-lg sm:text-xl font-bold truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>{value}{unit}</p>
      <p className={`text-[10px] sm:text-xs truncate ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{label}</p>
    </div>
  );
}

function ResultCard({ label, value, unit = '', icon, color, isDark }) {
  const colorMap = {
    blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-500', icon: 'text-blue-500' },
    green: { bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-500', icon: 'text-green-500' },
    emerald: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-500', icon: 'text-emerald-500' },
    yellow: { bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', text: 'text-yellow-500', icon: 'text-yellow-500' },
    purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-500', icon: 'text-purple-500' },
    orange: { bg: 'bg-orange-500/10', border: 'border-orange-500/30', text: 'text-orange-500', icon: 'text-orange-500' },
    red: { bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-500', icon: 'text-red-500' },
  };
  
  const colors = colorMap[color] || colorMap.blue;
  
  return (
    <div className={`flex items-center justify-between p-3 rounded-lg border ${colors.bg} ${colors.border}`}>
      <div className="flex items-center gap-2 min-w-0">
        <div className={colors.icon} aria-hidden="true">{icon}</div>
        <span className={`text-xs sm:text-sm truncate ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{label}</span>
      </div>
      <span className={`font-bold text-base sm:text-lg flex-shrink-0 ml-2 ${colors.text}`}>{value}{unit}</span>
    </div>
  );
}