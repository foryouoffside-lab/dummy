'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Target, Volume2, VolumeX, Maximize2, Minimize2, 
  Sun, Moon, Eye, Timer, Trophy, Wind, Zap, Activity, Award, Info
} from 'lucide-react';

export default function HighSpeedKineticTrainerPage() {
  const [loading, setLoading] = useState(true);
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const containerRef = useRef(null);
  const [gameState, setGameState] = useState('start');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isBoxDarkMode, setIsBoxDarkMode] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  
  // Drill-specific stats
  const [kineticScore, setKineticScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [hits, setHits] = useState(0);
  const [misses, setMisses] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [combo, setCombo] = useState(0);
  const [bestCombo, setBestCombo] = useState(0);
  const [targetSpeed, setTargetSpeed] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  
  const targetRef = useRef({ x: 0, y: 0, r: 17.5 });
  const velRef = useRef({ x: 8, y: 6 });
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const canvasSizeRef = useRef({ width: 0, height: 0 });
  const lastTimeRef = useRef(performance.now());
  const teleportTimerRef = useRef(0);
  const lastPositionsRef = useRef([]);
  const scoreRef = useRef(0);
  const comboRef = useRef(0);
  const timerIntervalRef = useRef(null);
  const feedbackTimeoutRef = useRef(null);
  const isActiveRef = useRef(false);
  const gameStateRef = useRef('start');
  const audioCtxRef = useRef(null);
  const timeLeftRef = useRef(60);
  const TARGET_SIZE = 35;
  const MAX_POINTS = 50;

  // Load best score from localStorage
  useEffect(() => {
    const savedBestScore = localStorage.getItem('kineticDrillBestScore');
    if (savedBestScore) {
      setBestScore(parseInt(savedBestScore, 10));
    }
  }, []);

  // Update best score ONLY when game ends
  const updateBestScore = (finalScore) => {
    const currentBestScore = parseInt(localStorage.getItem('kineticDrillBestScore') || '0', 10);
    if (finalScore > currentBestScore) {
      localStorage.setItem('kineticDrillBestScore', finalScore.toString());
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
      
      if (type === 'hit') {
        osc.frequency.value = 880;
        gain.gain.value = 0.12;
      } else if (type === 'miss') {
        osc.frequency.value = 220;
        gain.gain.value = 0.1;
      } else if (type === 'teleport') {
        osc.frequency.value = 660;
        gain.gain.value = 0.12;
      } else if (type === 'combo') {
        osc.frequency.value = 1046.5;
        gain.gain.value = 0.12;
      } else if (type === 'perfect') {
        osc.frequency.value = 1318;
        gain.gain.value = 0.12;
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

  const handlePenalty = (reason) => {
    if (!isActiveRef.current) return;
    
    const penaltyPoints = MAX_POINTS;
    
    setMisses(prev => prev + 1);
    comboRef.current = 0;
    setCombo(0);
    scoreRef.current = Math.max(0, scoreRef.current - penaltyPoints);
    setKineticScore(scoreRef.current);
    playSound('miss');
    showFeedback(`âœ— ${reason}! -${penaltyPoints}`, 'error');
    
    const total = hits + misses + 1;
    setAccuracy(Math.round((hits / total) * 100));
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

  const getRandomPosition = (avoidCurrent = true) => {
    const { width, height } = canvasSizeRef.current;
    if (width === 0 || height === 0) return { x: width / 2, y: height / 2 };
    
    const padding = TARGET_SIZE + 25;
    const currentX = targetRef.current.x;
    const currentY = targetRef.current.y;
    
    let newX, newY;
    let attempts = 0;
    let isTooClose = true;
    
    while (isTooClose && attempts < 100) {
      newX = padding + Math.random() * (width - padding * 2);
      newY = padding + Math.random() * (height - padding * 2);
      
      if (avoidCurrent) {
        const distanceFromCurrent = Math.hypot(newX - currentX, newY - currentY);
        isTooClose = distanceFromCurrent < 120;
      }
      
      if (!isTooClose && lastPositionsRef.current.length > 0) {
        for (const pos of lastPositionsRef.current) {
          if (Math.hypot(newX - pos.x, newY - pos.y) < 100) {
            isTooClose = true;
            break;
          }
        }
      }
      
      attempts++;
    }
    
    lastPositionsRef.current.push({ x: newX, y: newY });
    if (lastPositionsRef.current.length > 5) {
      lastPositionsRef.current.shift();
    }
    
    return { x: newX, y: newY };
  };

  const teleport = (isHit = false) => {
    const { width, height } = canvasSizeRef.current;
    if (width === 0 || height === 0) return;
    
    const newPos = getRandomPosition(true);
    targetRef.current.x = newPos.x;
    targetRef.current.y = newPos.y;
    
    const speedMultiplier = 1 + Math.min(0.8, comboRef.current / 30);
    const baseSpeed = 6 + Math.random() * 14;
    
    velRef.current = {
      x: (Math.random() > 0.5 ? 1 : -1) * (baseSpeed * speedMultiplier),
      y: (Math.random() > 0.5 ? 1 : -1) * (baseSpeed * speedMultiplier)
    };
    
    velRef.current.x = Math.max(-30, Math.min(30, velRef.current.x));
    velRef.current.y = Math.max(-30, Math.min(30, velRef.current.y));
    
    const currentSpeed = Math.abs(velRef.current.x) + Math.abs(velRef.current.y);
    setTargetSpeed(Math.round(currentSpeed));
    
    if (!isHit) playSound('teleport');
  };

  const calculateScoreFromSpeed = () => {
    const speed = Math.abs(velRef.current.x) + Math.abs(velRef.current.y);
    const speedBonus = Math.floor(speed / 3);
    const comboBonus = Math.floor(comboRef.current / 3) * 5;
    return 10 + speedBonus + comboBonus;
  };

  useEffect(() => {
    const handleMouseDown = (e) => {
      if (gameState !== 'playing' || !isActiveRef.current) return;
      
      const mouse = mousePositionRef.current;
      const target = targetRef.current;
      
      const dist = Math.hypot(mouse.x - target.x, mouse.y - target.y);
      
      if (dist < target.r + 10) {
        const pointsEarned = calculateScoreFromSpeed();
        scoreRef.current += pointsEarned;
        setKineticScore(scoreRef.current);
        setHits(prev => prev + 1);
        comboRef.current++;
        setCombo(comboRef.current);
        if (comboRef.current > bestCombo) setBestCombo(comboRef.current);
        
        playSound('hit');
        showFeedback(`âœ“ +${pointsEarned}`, 'success');
        
        if (comboRef.current % 3 === 0) playSound('combo');
        if (comboRef.current % 5 === 0) {
          playSound('perfect');
          showFeedback(`ðŸ”¥ ${comboRef.current} Combo!`, 'success');
        }
        
        teleport(true);
        
        const total = hits + 1 + misses;
        setAccuracy(Math.round(((hits + 1) / total) * 100));
      } else {
        handlePenalty('Miss');
      }
    };
    
    window.addEventListener('mousedown', handleMouseDown);
    return () => window.removeEventListener('mousedown', handleMouseDown);
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
      
      const centerPos = getRandomPosition(false);
      targetRef.current.x = centerPos.x;
      targetRef.current.y = centerPos.y;
      velRef.current = { x: 8, y: 6 };
      setTargetSpeed(14);
    };

    updateCanvasSize();
    teleportTimerRef.current = 0;

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

    function drawTarget(now) {
      const target = targetRef.current;
      
      const pulse = Math.sin(now / 130) * 2;
      const currentR = target.r + pulse;
      
      ctx.shadowBlur = 20;
      ctx.shadowColor = '#00ff88';
      
      const gradient = ctx.createRadialGradient(target.x - 5, target.y - 5, 0, target.x, target.y, currentR);
      gradient.addColorStop(0, '#00ff88');
      gradient.addColorStop(0.6, '#00cc66');
      gradient.addColorStop(1, '#009955');
      ctx.fillStyle = gradient;
      
      ctx.beginPath();
      ctx.arc(target.x, target.y, currentR, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.shadowBlur = 0;
      
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(target.x, target.y, currentR * 0.5, 0, Math.PI * 2);
      ctx.stroke();
    }

    function drawCrosshair() {
      const mouse = mousePositionRef.current;
      if (mouse.x > 0 && mouse.x < cvs.width && mouse.y > 0 && mouse.y < cvs.height) {
        ctx.strokeStyle = "#00ff88";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(mouse.x - 15, mouse.y); ctx.lineTo(mouse.x + 15, mouse.y);
        ctx.moveTo(mouse.x, mouse.y - 15); ctx.lineTo(mouse.x, mouse.y + 15);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 20, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(0, 255, 136, 0.3)';
        ctx.stroke();
        ctx.fillStyle = '#00ff88';
        ctx.fillRect(mouse.x - 2, mouse.y - 2, 4, 4);
        
        const target = targetRef.current;
        ctx.beginPath();
        ctx.moveTo(mouse.x, mouse.y);
        ctx.lineTo(target.x, target.y);
        ctx.strokeStyle = 'rgba(0, 255, 136, 0.15)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }

    function render(now) {
      const dt = Math.min(0.033, (now - lastTimeRef.current) / 1000);
      lastTimeRef.current = now;
      
      if (isActiveRef.current) {
        const target = targetRef.current;
        const { width, height } = canvasSizeRef.current;
        
        if (width > 0 && height > 0) {
          target.x += velRef.current.x * dt * 60;
          target.y += velRef.current.y * dt * 60;
          
          const radius = target.r;
          
          if (target.x - radius < 0) {
            target.x = radius;
            velRef.current.x = Math.abs(velRef.current.x);
          } else if (target.x + radius > width) {
            target.x = width - radius;
            velRef.current.x = -Math.abs(velRef.current.x);
          }
          
          if (target.y - radius < 0) {
            target.y = radius;
            velRef.current.y = Math.abs(velRef.current.y);
          } else if (target.y + radius > height) {
            target.y = height - radius;
            velRef.current.y = -Math.abs(velRef.current.y);
          }
          
          teleportTimerRef.current += dt;
          const teleportInterval = Math.max(0.7, 1.8 - comboRef.current * 0.02);
          
          if (teleportTimerRef.current > teleportInterval) {
            teleportTimerRef.current = 0;
            if (Math.random() < 0.55) {
              teleport(false);
            }
          }
        }
      }
      
      drawBackground();
      drawTarget(now);
      drawCrosshair();
      
      animationRef.current = requestAnimationFrame(render);
    }

    animationRef.current = requestAnimationFrame(render);

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
    setKineticScore(0);
    setHits(0);
    setMisses(0);
    setAccuracy(100);
    setCombo(0);
    setBestCombo(0);
    timeLeftRef.current = 60;
    setTimeLeft(60);
    setFeedback('');
    
    isActiveRef.current = true;
    scoreRef.current = 0;
    comboRef.current = 0;
    lastPositionsRef.current = [];
    
    const { width, height } = canvasSizeRef.current;
    if (width > 0 && height > 0) {
      const startPos = getRandomPosition(false);
      targetRef.current.x = startPos.x;
      targetRef.current.y = startPos.y;
    }
    targetRef.current.r = TARGET_SIZE / 2;
    velRef.current = { x: 8, y: 6 };
    setTargetSpeed(14);
    teleportTimerRef.current = 0;
    
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
    setKineticScore(0);
    setHits(0);
    setMisses(0);
    setAccuracy(100);
    setCombo(0);
    setBestCombo(0);
    timeLeftRef.current = 60;
    setTimeLeft(60);
    setFeedback('');
  };

  const formatTime = (s) => `${s}s`;

  if (loading || status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading drill...</p>
        </div>
      </div>
    );
  }


  return (
    <div className={`min-h-screen select-none ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link href="/drills/fps" className={`inline-flex items-center gap-2 mb-4 ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>
            <ArrowLeft className="w-4 h-4" /> Back to FPS Drills
          </Link>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl">
                <Wind className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Kinetic Trainer</h1>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Track and click â€¢ Speed increases with combo</p>
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
        <div className="grid grid-cols-6 gap-3 mb-4 h-[88px]">
          <StatCard icon={<Target className="text-blue-600" />} value={kineticScore} label="Kinetic Score" isDark={isDarkMode} />
          <StatCard icon={<Trophy className="text-yellow-500" />} value={bestScore} label="Best Score" isDark={isDarkMode} />
          <StatCard icon={<Timer className={timeLeft <= 10 ? 'text-red-600' : 'text-green-600'} />} value={timeLeft} label="Time Left" unit="s" isDark={isDarkMode} />
          <StatCard icon={<Zap className="text-orange-500" />} value={combo} label="Combo" isDark={isDarkMode} />
          <StatCard icon={<Activity className="text-purple-500" />} value={accuracy} label="Accuracy" unit="%" isDark={isDarkMode} />
          <StatCard icon={<Wind className="text-cyan-500" />} value={targetSpeed} label="Speed" unit="px/s" isDark={isDarkMode} />
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
                Score: <span className="text-yellow-400">{kineticScore}</span> | Combo: <span className="text-purple-400">{combo}x</span> | Speed: <span className="text-cyan-400">{targetSpeed}</span>
              </div>
            </>
          )}

          <canvas ref={canvasRef} style={{ display: 'block', position: 'absolute', cursor: 'none' }} />

          {/* Start Screen */}
          {gameState === 'start' && (
            <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
              <div className={`rounded-2xl p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <Wind className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                <h3 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Kinetic Trainer</h3>
                <p className={`mb-6 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>60-second challenge â€¢ Click the bouncing target</p>
                <button 
                  onClick={startGame} 
                  className="px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg w-full transition-all transform hover:scale-[1.02] active:scale-[0.98]"
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
                  <ResultCard label="Kinetic Score" value={kineticScore} icon={<Target className="w-4 h-4" />} color="text-blue-500" />
                  <ResultCard label="Best Score" value={bestScore} icon={<Trophy className="w-4 h-4" />} color="text-yellow-500" />
                  <ResultCard label="Hits" value={hits} icon={<Target className="w-4 h-4" />} color="text-green-500" />
                  <ResultCard label="Best Combo" value={bestCombo} icon={<Zap className="w-4 h-4" />} color="text-orange-500" />
                  <ResultCard label="Accuracy" value={accuracy} unit="%" icon={<Activity className="w-4 h-4" />} color="text-purple-500" />
                  <ResultCard label="Max Speed" value={targetSpeed} unit="px/s" icon={<Wind className="w-4 h-4" />} color="text-cyan-500" />
                </div>
                
                <div className="flex gap-4">
                  <button 
                    onClick={resetGame} 
                    className={`flex-1 px-4 py-2.5 rounded-lg font-semibold transition-all ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                  >
                    â† Back
                  </button>
                  <button 
                    onClick={startGame} 
                    className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Play Again â†’
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
                  <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Drill Rules & Instructions</h3>
                </div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">1</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-blue-500">Click the bouncing green target</span> â€¢ As quickly as possible
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">2</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-green-500">Target teleports randomly</span> â€¢ Stays unpredictable
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">3</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-purple-500">Combo bonus: +5 per 3 hits</span> â€¢ 5 combo streak bonus
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">4</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-red-500">Miss = -50 points</span> â€¢ Penalty equals max points
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">5</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-orange-500">Speed increases with combo</span> â€¢ Higher challenge
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">6</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-yellow-500">Best Score saves locally</span> â€¢ 60 second challenge
                      </p>
                    </div>
                  </div>
                </div>
                <div className={`mt-3 pt-3 border-t text-xs ${isDarkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'} flex items-center justify-between`}>
                  <span>ðŸŽ¯ Faster target = More points (Speed bonus)</span>
                  <span>âš¡ Click on green target to score</span>
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