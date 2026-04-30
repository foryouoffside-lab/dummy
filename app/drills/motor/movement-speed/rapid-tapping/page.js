'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Target, Zap, Clock, Award, Activity, 
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, 
  Eye, Brain, BarChart3, Timer, Trophy, Info, Disc, RefreshCw
} from 'lucide-react';

export default function PerpetualSingularityPage() {
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
  const [radius, setRadius] = useState(50);
  const [shrinkRate, setShrinkRate] = useState(45);
  const [difficultyTimer, setDifficultyTimer] = useState(0);
  const [survivalTime, setSurvivalTime] = useState(0);
  const [clicks, setClicks] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  
  const radiusRef = useRef(50);
  const shrinkRateRef = useRef(45);
  const baseShrinkRef = useRef(45);
  const difficultyTimerRef = useRef(0);
  const totalTimeRef = useRef(0);
  const scoreRef = useRef(0);
  const clicksRef = useRef(0);
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const feedbackTimeoutRef = useRef(null);
  const isActiveRef = useRef(false);
  const gameStateRef = useRef('start');
  const audioCtxRef = useRef(null);
  const survivalIntervalRef = useRef(null);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  // Load best score from localStorage on mount
  useEffect(() => {
    const savedBestScore = localStorage.getItem('perpetualSingularityBestScore');
    if (savedBestScore) {
      setBestScore(parseInt(savedBestScore, 10));
    }
  }, []);

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

  // Update best score when game ends
  const updateBestScore = (finalScore) => {
    const currentBestScore = parseInt(localStorage.getItem('perpetualSingularityBestScore') || '0', 10);
    if (finalScore > currentBestScore) {
      localStorage.setItem('perpetualSingularityBestScore', finalScore.toString());
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
      
      if (type === 'click') {
        osc.frequency.value = 880;
        gain.gain.value = 0.08;
      } else if (type === 'score') {
        osc.frequency.value = 1200;
        gain.gain.value = 0.12;
      } else if (type === 'collapse') {
        osc.frequency.value = 200;
        gain.gain.value = 0.15;
      } else if (type === 'difficulty') {
        osc.frequency.value = 440;
        gain.gain.value = 0.06;
      }
      osc.start();
      gain.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 0.15);
      osc.stop(audioCtx.currentTime + 0.15);
    } catch (e) {}
  };

  useEffect(() => {
    if (gameState !== 'playing') return;
    
    survivalIntervalRef.current = setInterval(() => {
      setSurvivalTime(prev => prev + 1);
      totalTimeRef.current += 1;
    }, 1000);
    
    return () => {
      if (survivalIntervalRef.current) clearInterval(survivalIntervalRef.current);
    };
  }, [gameState]);

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

  useEffect(() => {
    const handleMouseDown = () => {
      if (gameStateRef.current !== 'playing' || !isActiveRef.current) return;
      
      const mouse = mousePositionRef.current;
      const cvs = canvasRef.current;
      if (!cvs) return;
      
      const cx = cvs.width / 2;
      const cy = cvs.height / 2;
      const dist = Math.sqrt((mouse.x - cx) ** 2 + (mouse.y - cy) ** 2);

      // Click detection: Must be on the ball or its immediate vicinity
      if (dist < radiusRef.current + 15) {
        // Increase radius (max 140)
        radiusRef.current = Math.min(140, radiusRef.current + 10);
        setRadius(radiusRef.current);
        
        // Increment clicks
        clicksRef.current += 1;
        setClicks(clicksRef.current);
        
        // Check if we earned a point (every 10 clicks)
        if (clicksRef.current % 10 === 0) {
          scoreRef.current += 1;
          setScore(scoreRef.current);
          playSound('score');
          showFeedback(`⭐ +1 POINT! (${clicksRef.current} clicks)`, 'success');
        } else {
          playSound('click');
          const clicksMod = clicksRef.current % 10;
          showFeedback(`+1 click • ${10 - clicksMod} to next point`, 'success');
        }
      }
    };
    
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('contextmenu', (e) => e.preventDefault());
    
    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('contextmenu', (e) => e.preventDefault());
    };
  }, []);

  useEffect(() => {
    return () => {
      isActiveRef.current = false;
      if (survivalIntervalRef.current) clearInterval(survivalIntervalRef.current);
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
    
    let lastFrameTime = performance.now();

    function update(dt) {
      if (!isActiveRef.current) return;
      
      difficultyTimerRef.current += dt;
      totalTimeRef.current += dt;
      
      // Every 3 seconds, the difficulty spikes by 12%
      if (difficultyTimerRef.current > 3) {
        shrinkRateRef.current *= 1.12;
        setShrinkRate(shrinkRateRef.current);
        difficultyTimerRef.current = 0;
        setDifficultyTimer(0);
        playSound('difficulty');
        showFeedback(`⚠️ Difficulty +12%`, 'warning');
      }
      
      setDifficultyTimer(difficultyTimerRef.current);

      // Apply constant decay
      radiusRef.current -= shrinkRateRef.current * dt;
      setRadius(Math.max(0, radiusRef.current));

      // Auto-Reset on Collapse (Game Over)
      if (radiusRef.current <= 0) {
        playSound('collapse');
        isActiveRef.current = false;
        setGameState('gameOver');
        gameStateRef.current = 'gameOver';
        updateBestScore(scoreRef.current);
      }
    }

    function draw() {
      const now = performance.now();
      const dt = Math.min(0.033, (now - lastFrameTime) / 1000);
      lastFrameTime = now;
      
      update(dt);
      
      ctx.fillStyle = isBoxDarkMode ? "#020202" : "#f9fafb";
      ctx.fillRect(0, 0, cvs.width, cvs.height);

      const cx = cvs.width / 2;
      const cy = cvs.height / 2;
      const currentRadius = Math.max(0, radiusRef.current);

      // Draw shrinking ring indicator
      const maxRadius = 140;
      const fillPercent = currentRadius / maxRadius;
      
      ctx.beginPath();
      ctx.arc(cx, cy, maxRadius + 10, 0, Math.PI * 2);
      ctx.strokeStyle = isBoxDarkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Main circle
      ctx.beginPath();
      ctx.arc(cx, cy, currentRadius, 0, Math.PI * 2);
      ctx.strokeStyle = isBoxDarkMode ? "#ffffff" : "#000000";
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Inner fill with opacity based on size
      ctx.fillStyle = isBoxDarkMode 
        ? `rgba(255, 255, 255, ${0.05 + fillPercent * 0.1})` 
        : `rgba(0, 0, 0, ${0.03 + fillPercent * 0.07})`;
      ctx.fill();
      
      // Center dot
      ctx.beginPath();
      ctx.arc(cx, cy, 3, 0, Math.PI * 2);
      ctx.fillStyle = isBoxDarkMode ? "#ffffff" : "#000000";
      ctx.fill();

      // Size percentage text
      ctx.font = "12px monospace";
      ctx.fillStyle = isBoxDarkMode ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.3)";
      ctx.textAlign = "center";
      ctx.fillText(`${Math.floor(fillPercent * 100)}%`, cx, cy - currentRadius - 10);

      // Rounded Cursor Circle
      const mouse = mousePositionRef.current;
      if (mouse.x > 0 && mouse.x < cvs.width && mouse.y > 0 && mouse.y < cvs.height) {
        // Outer ring
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 10, 0, Math.PI * 2);
        ctx.strokeStyle = isBoxDarkMode ? "#ffffff" : "#000000";
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Inner dot
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = isBoxDarkMode ? "#ffffff" : "#000000";
        ctx.fill();
        
        // Crosshair lines
        ctx.strokeStyle = isBoxDarkMode ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.2)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(mouse.x - 20, mouse.y); ctx.lineTo(mouse.x - 14, mouse.y);
        ctx.moveTo(mouse.x + 14, mouse.y); ctx.lineTo(mouse.x + 20, mouse.y);
        ctx.moveTo(mouse.x, mouse.y - 20); ctx.lineTo(mouse.x, mouse.y - 14);
        ctx.moveTo(mouse.x, mouse.y + 14); ctx.lineTo(mouse.x, mouse.y + 20);
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
    setRadius(50);
    setShrinkRate(45);
    setDifficultyTimer(0);
    setSurvivalTime(0);
    setClicks(0);
    setFeedback('');
    
    isActiveRef.current = true;
    radiusRef.current = 50;
    shrinkRateRef.current = 45;
    difficultyTimerRef.current = 0;
    totalTimeRef.current = 0;
    scoreRef.current = 0;
    clicksRef.current = 0;
    
    showFeedback('10 clicks = 1 point • Click the ball!', 'success');
  };

  const resetGame = () => {
    isActiveRef.current = false;
    setGameState('start');
    gameStateRef.current = 'start';
    setScore(0);
    setRadius(50);
    setShrinkRate(45);
    setDifficultyTimer(0);
    setSurvivalTime(0);
    setClicks(0);
    setFeedback('');
    
    if (survivalIntervalRef.current) clearInterval(survivalIntervalRef.current);
  };

  const formatTime = (s) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

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
        <div className="mb-6">
          <Link href="/drills/motor" className={`inline-flex items-center gap-2 mb-4 ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>
            <ArrowLeft className="w-4 h-4" /> Back to Motor Drills
          </Link>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl">
                <Disc className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Perpetual Singularity</h1>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>10 clicks = 1 point • Endless survival • Difficulty +12% every 3s</p>
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
        <div className="grid grid-cols-5 gap-3 mb-4 h-[88px]">
          <StatCard icon={<Target className="text-blue-600" />} value={score} label="Score" isDark={isDarkMode} />
          <StatCard icon={<Trophy className="text-yellow-600" />} value={bestScore} label="Best Score" isDark={isDarkMode} />
          <StatCard icon={<Timer className="text-green-600" />} value={formatTime(survivalTime)} label="Survival" isDark={isDarkMode} />
          <StatCard icon={<Activity className="text-purple-600" />} value={clicks} label="Clicks" isDark={isDarkMode} />
          <StatCard icon={<Disc className="text-cyan-600" />} value={Math.floor(radius)} unit="px" label="Size" isDark={isDarkMode} />
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
            <div className="absolute top-4 right-4 z-30 flex gap-3">
              <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 bg-black/50 rounded-lg text-white hover:bg-black/70 transition-all">{isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}</button>
              <button onClick={() => setIsBoxDarkMode(!isBoxDarkMode)} className="p-2 bg-black/50 rounded-lg text-white hover:bg-black/70 transition-all"><Eye className="w-5 h-5" /></button>
              <button onClick={() => setSoundEnabled(!soundEnabled)} className="p-2 bg-black/50 rounded-lg text-white hover:bg-black/70 transition-all">{soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}</button>
              <button onClick={toggleFullscreen} className="p-2 bg-black/50 rounded-lg text-white hover:bg-black/70 transition-all"><Minimize2 className="w-5 h-5" /></button>
            </div>
          )}

          <canvas ref={canvasRef} style={{ display: 'block', position: 'absolute' }} />

          {/* Start Screen */}
          {gameState === 'start' && (
            <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
              <div className={`rounded-2xl p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <Disc className="w-16 h-16 text-purple-500 mx-auto mb-4" />
                <h3 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Perpetual Singularity</h3>
                <p className={`mb-2 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>10 clicks = 1 point</p>
                <p className={`mb-6 text-sm ${isBoxDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Click the ball to expand • Survive as long as possible</p>
                <button 
                  onClick={startGame} 
                  className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg w-full transition-all transform hover:scale-[1.02] active:scale-[0.98]"
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
                  <h3 className={`text-2xl font-bold ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Collapse!</h3>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <ResultCard label="Final Score" value={score} icon={<Target className="w-4 h-4" />} color="text-blue-500" isDark={isBoxDarkMode} />
                  <ResultCard label="Best Score" value={bestScore} icon={<Trophy className="w-4 h-4" />} color="text-yellow-500" isDark={isBoxDarkMode} />
                  <ResultCard label="Survival Time" value={formatTime(survivalTime)} icon={<Timer className="w-4 h-4" />} color="text-green-500" isDark={isBoxDarkMode} />
                  <ResultCard label="Total Clicks" value={clicks} icon={<Activity className="w-4 h-4" />} color="text-purple-500" isDark={isBoxDarkMode} />
                  <ResultCard label="Final Size" value={Math.floor(radius)} unit="px" icon={<Disc className="w-4 h-4" />} color="text-cyan-500" isDark={isBoxDarkMode} />
                  <ResultCard label="Max Difficulty" value={`+${Math.floor((shrinkRate / baseShrinkRef.current - 1) * 100)}%`} icon={<Zap className="w-4 h-4" />} color="text-orange-500" isDark={isBoxDarkMode} />
                </div>
                
                <div className="flex gap-4">
                  <Link href="/drills/motor" className="flex-1">
                    <button className={`w-full px-4 py-2.5 rounded-lg font-semibold transition-all ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                      ← Back
                    </button>
                  </Link>
                  <button 
                    onClick={startGame} 
                    className="flex-1 px-4 py-2.5 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98]"
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
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Click the <span className="font-semibold text-purple-500">central ball</span> to expand it (+10px)</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">2</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Ball constantly <span className="font-semibold text-red-500">shrinks at increasing rate</span></p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">3</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Every 3 seconds: <span className="font-semibold text-orange-500">difficulty +12%</span></p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">4</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Scoring: <span className="font-semibold text-green-500">1 point per 10 clicks</span></p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">5</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Game ends when <span className="font-semibold text-blue-500">ball shrinks to zero</span></p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">6</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Max size: <span className="font-semibold text-yellow-500">140px</span></p>
                    </div>
                  </div>
                </div>
                <div className={`mt-3 pt-3 border-t text-xs ${isDarkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'} flex items-center justify-between`}>
                  <span>🎯 Click ball to expand • Survive the perpetual collapse</span>
                  <span>🏆 Best Score saves locally</span>
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
                   color === 'text-green-500' ? 'bg-green-500/10' :
                   color === 'text-purple-500' ? 'bg-purple-500/10' :
                   color === 'text-cyan-500' ? 'bg-cyan-500/10' : 'bg-orange-500/10';
  
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