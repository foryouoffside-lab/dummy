'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Target, Zap, Clock, Award, Activity, 
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, 
  Eye, Brain, BarChart3, Timer, Trophy, Info, Waves
} from 'lucide-react';

export default function CalibratedDynamicFlowPage() {
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
  const [timeLeft, setTimeLeft] = useState(60);
  const [isLocked, setIsLocked] = useState(false);
  const [scrollSpeed, setScrollSpeed] = useState(180);
  const [currentAmplitude, setCurrentAmplitude] = useState(220);
  const [currentFrequency, setCurrentFrequency] = useState(0.35);
  const [accuracy, setAccuracy] = useState(100);
  const [phase, setPhase] = useState('Dynamic');
  const [penalties, setPenalties] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  
  const pointsRef = useRef([]);
  const scrollPosRef = useRef(0);
  const scrollSpeedRef = useRef(180);
  const currentAmplitudeRef = useRef(220);
  const currentFrequencyRef = useRef(0.35);
  const isLockedRef = useRef(false);
  const startTimeRef = useRef(0);
  const scoreRef = useRef(0);
  const scoreAccumulatorRef = useRef(0);
  const penaltiesRef = useRef(0);
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const totalFramesRef = useRef(0);
  const lockedFramesRef = useRef(0);
  const timerIntervalRef = useRef(null);
  const feedbackTimeoutRef = useRef(null);
  const isActiveRef = useRef(false);
  const gameStateRef = useRef('start');
  const audioCtxRef = useRef(null);
  const phaseOffsetRef = useRef(0);
  const flowTimeRef = useRef(0);

  // Load best score from localStorage on mount
  useEffect(() => {
    const savedBestScore = localStorage.getItem('calibratedDynamicFlowBestScore');
    if (savedBestScore) {
      setBestScore(parseInt(savedBestScore, 10));
    }
  }, []);

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

  // Calculate accuracy
  useEffect(() => {
    if (totalFramesRef.current > 0) {
      const acc = (lockedFramesRef.current / totalFramesRef.current) * 100;
      setAccuracy(Math.round(acc));
    } else {
      setAccuracy(100);
    }
  }, [score]);

  // Update best score when game ends
  const updateBestScore = (finalScore) => {
    const currentBestScore = parseInt(localStorage.getItem('calibratedDynamicFlowBestScore') || '0', 10);
    if (finalScore > currentBestScore) {
      localStorage.setItem('calibratedDynamicFlowBestScore', finalScore.toString());
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
    }, 300);
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
        gain.gain.value = 0.03;
      } else if (type === 'penalty') {
        osc.frequency.value = 300;
        gain.gain.value = 0.08;
      }
      osc.start();
      gain.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 0.1);
      osc.stop(audioCtx.currentTime + 0.1);
    } catch (e) {}
  };

  useEffect(() => {
    if (gameState !== 'playing') return;
    
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

  const addNewPoint = (cvs, index) => {
    const points = pointsRef.current;
    const lastP = points.length > 0 ? points[points.length - 1] : { x: cvs.width / 2, y: cvs.height };
    
    // Rich, complex waveform with multiple overlapping frequencies for organic flow
    const t = index * 0.12 + phaseOffsetRef.current + flowTimeRef.current * 0.1;
    
    // Primary wave
    const wave1 = Math.sin(t * currentFrequencyRef.current) * currentAmplitudeRef.current;
    
    // Secondary harmonic - adds complexity
    const wave2 = Math.cos(t * currentFrequencyRef.current * 1.7) * (currentAmplitudeRef.current * 0.4);
    
    // Tertiary flutter - adds micro-movements
    const wave3 = Math.sin(t * currentFrequencyRef.current * 3.2) * (currentAmplitudeRef.current * 0.2);
    
    // Quaternary drift - slow, sweeping changes
    const wave4 = Math.cos(t * currentFrequencyRef.current * 0.4) * (currentAmplitudeRef.current * 0.25);
    
    // Asymmetric bias - makes path more unpredictable
    const wave5 = Math.sin(t * currentFrequencyRef.current * 1.2) * Math.cos(t * 0.8) * (currentAmplitudeRef.current * 0.15);
    
    points.push({
      x: cvs.width / 2 + wave1 + wave2 + wave3 + wave4 + wave5,
      y: lastP.y - 180
    });
  };

  const initPoints = (cvs) => {
    pointsRef.current = [];
    phaseOffsetRef.current = Math.random() * Math.PI * 2;
    flowTimeRef.current = 0;
    for (let i = 0; i < 30; i++) {
      addNewPoint(cvs, i);
    }
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
      initPoints(cvs);
    };

    const resizeObserver = new ResizeObserver(updateCanvasSize);
    if (containerRef.current) resizeObserver.observe(containerRef.current);
    window.addEventListener('resize', updateCanvasSize);
    updateCanvasSize();
    
    let lastFrameTime = performance.now();

    function update(dt) {
      if (!isActiveRef.current) return;
      
      const elapsed = (performance.now() - startTimeRef.current) / 1000;
      scrollPosRef.current += scrollSpeedRef.current * dt;
      flowTimeRef.current += dt;

      // Enhanced Reactive Scaling Logic - 2 Phases with more flow
      if (elapsed < 30) {
        // Phase 1: Dynamic Flow (0-30s)
        // Rich, evolving amplitude and frequency
        const phaseProgress = elapsed / 30;
        const baseAmp = 200 + phaseProgress * 60;
        const ampVariation = Math.sin(elapsed * 0.6) * 40 + Math.cos(elapsed * 0.4) * 30;
        currentAmplitudeRef.current = baseAmp + ampVariation;
        
        const baseFreq = 0.32 + phaseProgress * 0.08;
        const freqVariation = Math.sin(elapsed * 0.5) * 0.04 + Math.cos(elapsed * 0.7) * 0.03;
        currentFrequencyRef.current = baseFreq + freqVariation;
        
        setPhase('Dynamic');
      } else {
        // Phase 2: Extreme Flow (30-60s)
        // Maximum complexity and amplitude
        const phaseProgress = (elapsed - 30) / 30;
        const baseAmp = 280 + phaseProgress * 80;
        const ampVariation = Math.sin(elapsed * 0.9) * 60 + Math.cos(elapsed * 0.6) * 50 + Math.sin(elapsed * 0.3) * 30;
        currentAmplitudeRef.current = baseAmp + ampVariation;
        
        const baseFreq = 0.42 + phaseProgress * 0.15;
        const freqVariation = Math.sin(elapsed * 0.8) * 0.06 + Math.cos(elapsed * 1.0) * 0.05 + Math.sin(elapsed * 0.5) * 0.03;
        currentFrequencyRef.current = baseFreq + freqVariation;
        
        setPhase('Extreme');
      }
      
      setCurrentAmplitude(Math.floor(currentAmplitudeRef.current));
      setCurrentFrequency(currentFrequencyRef.current);

      const points = pointsRef.current;
      if (points[points.length - 1].y + scrollPosRef.current > -200) {
        phaseOffsetRef.current += 0.015;
        addNewPoint(cvs, points.length);
      }

      totalFramesRef.current++;
      let onPath = false;
      const mouse = mousePositionRef.current;
      
      for (let i = 0; i < points.length - 1; i++) {
        const p1 = { x: points[i].x, y: points[i].y + scrollPosRef.current };
        const p2 = { x: points[i + 1].x, y: points[i + 1].y + scrollPosRef.current };
        
        if (mouse.y >= p2.y && mouse.y <= p1.y) {
          const t = (mouse.y - p1.y) / (p2.y - p1.y);
          const centerX = p1.x + t * (p2.x - p1.x);
          const dist = Math.abs(mouse.x - centerX);
          if (dist <= 7.0) {
            onPath = true;
          }
        }
      }

      const wasLocked = isLockedRef.current;
      isLockedRef.current = onPath;
      setIsLocked(onPath);
      
      if (onPath && !wasLocked) {
        playSound('lock');
      }

      if (onPath) {
        lockedFramesRef.current++;
        // Add score: exactly 1 point per second
        scoreAccumulatorRef.current += dt;
        if (scoreAccumulatorRef.current >= 1.0) {
          const pointsToAdd = Math.floor(scoreAccumulatorRef.current);
          scoreRef.current += pointsToAdd;
          setScore(scoreRef.current);
          scoreAccumulatorRef.current -= pointsToAdd;
        }
      } else {
        // Penalty when off path: lose score
        scoreAccumulatorRef.current += dt;
        if (scoreAccumulatorRef.current >= 1.0) {
          const pointsToSubtract = Math.floor(scoreAccumulatorRef.current) * 2;
          scoreRef.current = Math.max(0, scoreRef.current - pointsToSubtract);
          setScore(scoreRef.current);
          scoreAccumulatorRef.current = 0;
          penaltiesRef.current++;
          setPenalties(penaltiesRef.current);
          playSound('penalty');
          showFeedback(`-${pointsToSubtract}`, 'error');
        }
      }

      if (!isLockedRef.current) {
        scrollSpeedRef.current = Math.min(900, scrollSpeedRef.current + 4.0);
      } else {
        scrollSpeedRef.current = Math.max(160, scrollSpeedRef.current - 0.35);
      }
      setScrollSpeed(Math.floor(scrollSpeedRef.current));

      if (points[0].y + scrollPosRef.current > cvs.height + 250) {
        points.shift();
      }
    }

    function drawFluidPath() {
      const points = pointsRef.current;
      ctx.moveTo(points[0].x, points[0].y + scrollPosRef.current);
      for (let i = 0; i < points.length - 1; i++) {
        const p1 = points[i];
        const p2 = points[i + 1];
        const midX = (p1.x + p2.x) / 2;
        const midY = (p1.y + p2.y) / 2 + scrollPosRef.current;
        ctx.quadraticCurveTo(p1.x, p1.y + scrollPosRef.current, midX, midY);
      }
    }

    function draw() {
      const now = performance.now();
      const dt = Math.min(0.033, (now - lastFrameTime) / 1000);
      lastFrameTime = now;
      
      update(dt);
      
      ctx.fillStyle = isLockedRef.current 
        ? (isBoxDarkMode ? "#020202" : "#f9fafb")
        : (isBoxDarkMode ? "#1a0000" : "#fee2e2");
      ctx.fillRect(0, 0, cvs.width, cvs.height);

      ctx.lineJoin = "round";
      ctx.lineCap = "round";

      // Main Path
      ctx.beginPath();
      ctx.lineWidth = 10;
      ctx.strokeStyle = isLockedRef.current 
        ? (isBoxDarkMode ? "#ffffff" : "#000000")
        : "#ff2222";
      drawFluidPath();
      ctx.stroke();

      if (isLockedRef.current) {
        ctx.shadowBlur = 15;
        ctx.shadowColor = isBoxDarkMode ? "#ffffff" : "#000000";
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      // Cursor
      const mouse = mousePositionRef.current;
      if (mouse.x > 0 && mouse.x < cvs.width && mouse.y > 0 && mouse.y < cvs.height) {
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = isLockedRef.current 
          ? (isBoxDarkMode ? "#ffffff" : "#000000")
          : "#ff2222";
        ctx.fill();
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
    setTimeLeft(60);
    setIsLocked(false);
    setScrollSpeed(180);
    setCurrentAmplitude(220);
    setCurrentFrequency(0.35);
    setAccuracy(100);
    setPhase('Dynamic');
    setPenalties(0);
    setFeedback('');
    
    isActiveRef.current = true;
    startTimeRef.current = performance.now();
    scrollPosRef.current = 0;
    scrollSpeedRef.current = 180;
    currentAmplitudeRef.current = 220;
    currentFrequencyRef.current = 0.35;
    isLockedRef.current = false;
    scoreRef.current = 0;
    scoreAccumulatorRef.current = 0;
    penaltiesRef.current = 0;
    totalFramesRef.current = 0;
    lockedFramesRef.current = 0;
    flowTimeRef.current = 0;
    
    if (canvasRef.current) {
      initPoints(canvasRef.current);
    }
  };

  const resetGame = () => {
    isActiveRef.current = false;
    setGameState('start');
    gameStateRef.current = 'start';
    setScore(0);
    setTimeLeft(60);
    setIsLocked(false);
    setScrollSpeed(180);
    setCurrentAmplitude(220);
    setCurrentFrequency(0.35);
    setAccuracy(100);
    setPhase('Dynamic');
    setPenalties(0);
    setFeedback('');
    
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
  };

  const formatTime = (s) => `${s}s`;

  if (loading || status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
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
              <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl">
                <Waves className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Calibrated Dynamic Flow</h1>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Track the path • 1pt/sec on path</p>
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
          <StatCard icon={<Trophy className="text-yellow-600" />} value={bestScore} label="Best Score" isDark={isDarkMode} />
          <StatCard icon={<Timer className={timeLeft < 15 ? 'text-red-600' : 'text-green-600'} />} value={formatTime(timeLeft)} label="Time" isDark={isDarkMode} />
          <StatCard icon={<Activity className={isLocked ? 'text-green-600' : 'text-red-600'} />} value={isLocked ? 'ON' : 'OFF'} label="Tracking" isDark={isDarkMode} />
          <StatCard icon={<BarChart3 className="text-purple-600" />} value={accuracy} unit="%" label="Accuracy" isDark={isDarkMode} />
          <StatCard icon={<Waves className="text-cyan-600" />} value={phase} label="Phase" isDark={isDarkMode} />
        </div>

        {/* Feedback Bar */}
        <div className="h-8 mb-2 flex justify-center items-center">
          <div className={`px-4 py-1 rounded-lg text-white font-medium text-sm transition-opacity duration-150 ${feedback ? 'opacity-100' : 'opacity-0'} ${
            feedbackType === 'success' ? 'bg-green-500' : 'bg-red-500'
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
                <Waves className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                <h3 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Calibrated Dynamic Flow</h3>
                <p className={`mb-6 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>60-second challenge • 1pt/sec on path • -2pt/sec off path</p>
                <button 
                  onClick={startGame} 
                  className="px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg w-full transition-all transform hover:scale-[1.02] active:scale-[0.98]"
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
                  <ResultCard label="Max Phase" value={phase} icon={<Waves className="w-4 h-4" />} color="text-blue-500" />
                  <ResultCard label="Penalties" value={penalties} icon={<Activity className="w-4 h-4" />} color="text-red-500" />
                  <ResultCard label="Max Speed" value={scrollSpeed} icon={<Zap className="w-4 h-4" />} color="text-orange-500" />
                </div>
                
                <div className="flex gap-4">
                  <Link href="/drills/motor" className="flex-1">
                    <button className={`w-full px-4 py-2.5 rounded-lg font-semibold transition-all ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                      ← Back
                    </button>
                  </Link>
                  <button 
                    onClick={startGame} 
                    className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98]"
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
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Keep cursor on the <span className="font-semibold text-blue-500">white path</span></p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">2</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>On path: <span className="font-semibold text-green-500">+1 point/second</span></p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">3</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Off path: <span className="font-semibold text-red-500">-2 points/second</span> + speed increases</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">4</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Phases: Dynamic (0-30s) → Extreme (30-60s)</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">5</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Challenge lasts <span className="font-semibold text-purple-500">60 seconds</span></p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">6</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Path glows when <span className="font-semibold text-yellow-500">locked on</span></p>
                    </div>
                  </div>
                </div>
                <div className={`mt-3 pt-3 border-t text-xs ${isDarkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'} flex items-center justify-between`}>
                  <span>🎯 White = Locked • Red = Off-track • Speed adapts to performance</span>
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

function ResultCard({ label, value, unit = '', icon, color }) {
  const bgColor = color === 'text-yellow-500' ? 'bg-yellow-500/10' : 
                   color === 'text-purple-500' ? 'bg-purple-500/10' : 
                   color === 'text-blue-500' ? 'bg-blue-500/10' :
                   color === 'text-cyan-500' ? 'bg-cyan-500/10' :
                   color === 'text-red-500' ? 'bg-red-500/10' :
                   color === 'text-orange-500' ? 'bg-orange-500/10' : 'bg-green-500/10';
  
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