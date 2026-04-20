'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Target, Zap, Timer, Trophy, Heart, 
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, Eye,
  Info, Award, Activity, Check, TrendingUp
} from 'lucide-react';

export default function PredictiveTrackingPage() {
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
  const [predictions, setPredictions] = useState(0);
  const [missedCount, setMissedCount] = useState(0);
  const [combo, setCombo] = useState(0);
  const [bestCombo, setBestCombo] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [accuracy, setAccuracy] = useState(100);
  const [lives, setLives] = useState(5);
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  
  const ghostRef = useRef({ x: 0, y: 0, vx: 5, vy: 2, r: 22 });
  const fragmentsRef = useRef([]);
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const canvasSizeRef = useRef({ width: 0, height: 0 });
  const scoreRef = useRef(0);
  const comboRef = useRef(0);
  const timerIntervalRef = useRef(null);
  const feedbackTimeoutRef = useRef(null);
  const isActiveRef = useRef(false);
  const gameStateRef = useRef('start');
  const audioCtxRef = useRef(null);
  const timeLeftRef = useRef(60);
  const livesRef = useRef(5);
  const clickCooldownRef = useRef(false);
  const LEAD_FRAMES = 12;
  const baseSpeed = 5;

  // Load best score from localStorage
  useEffect(() => {
    const savedBestScore = localStorage.getItem('predictiveTrackingBestScore');
    if (savedBestScore) {
      setBestScore(parseInt(savedBestScore, 10));
    }
  }, []);

  // Update best score ONLY when game ends
  const updateBestScore = (finalScore) => {
    const currentBestScore = parseInt(localStorage.getItem('predictiveTrackingBestScore') || '0', 10);
    if (finalScore > currentBestScore) {
      localStorage.setItem('predictiveTrackingBestScore', finalScore.toString());
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
        gain.gain.value = 0.12;
      } else if (type === 'fail') {
        osc.frequency.value = 440;
        gain.gain.value = 0.1;
      } else if (type === 'combo') {
        osc.frequency.value = 1046;
        gain.gain.value = 0.12;
      } else if (type === 'penalty') {
        osc.frequency.value = 220;
        gain.gain.value = 0.15;
      }
      osc.start();
      gain.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 0.15);
      osc.stop(audioCtx.currentTime + 0.15);
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
          
          const total = predictions + missedCount;
          const finalAccuracy = total === 0 ? 100 : Math.round((predictions / total) * 100);
          setAccuracy(finalAccuracy);
          updateBestScore(scoreRef.current);
        }
      }
    }, 1000);
  }, [predictions, missedCount]);

  const handleMissClick = (reason) => {
    if (!isActiveRef.current) return;
    
    setMissedCount(prev => prev + 1);
    comboRef.current = 0;
    setCombo(0);
    
    // Use one life for miss
    if (livesRef.current > 0) {
      livesRef.current -= 1;
      setLives(livesRef.current);
      playSound('fail');
      showFeedback(`✗ ${reason}! -1 life`, 'error');
    }
    
    // If no lives left, apply penalty
    if (livesRef.current === 0) {
      scoreRef.current = Math.max(0, scoreRef.current - 1);
      setScore(scoreRef.current);
      playSound('penalty');
      showFeedback(`✗ -1 point!`, 'error');
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
    const handleMouseDown = (e) => {
      // Prevent clicks on buttons from triggering the game
      const target = e.target;
      if (target.tagName === 'BUTTON' || target.closest('button')) {
        return;
      }
      
      if (gameState !== 'playing' || !isActiveRef.current) return;
      if (clickCooldownRef.current) return;
      
      const mouse = mousePositionRef.current;
      const ghost = ghostRef.current;
      
      clickCooldownRef.current = true;
      
      const predictX = ghost.x + (ghost.vx * LEAD_FRAMES);
      const predictY = ghost.y + (ghost.vy * LEAD_FRAMES);
      
      const dist = Math.hypot(mouse.x - predictX, mouse.y - predictY);
      
      if (dist < 35) {
        // Hit the prediction circle - +1 point
        scoreRef.current += 1;
        setScore(scoreRef.current);
        setPredictions(prev => prev + 1);
        comboRef.current++;
        setCombo(comboRef.current);
        if (comboRef.current > bestCombo) setBestCombo(comboRef.current);
        
        playSound('success');
        showFeedback(`✓ +1`, 'success');
        
        if (comboRef.current % 5 === 0) {
          playSound('combo');
          showFeedback(`🔥 ${comboRef.current} Combo!`, 'success');
        }
        
        spawnGhost();
        createShatterEffect();
        
        const total = predictions + 1 + missedCount;
        setAccuracy(Math.round(((predictions + 1) / total) * 100));
      } else {
        // Clicked but missed - lose 1 life
        handleMissClick('Miss');
      }
      
      setTimeout(() => {
        clickCooldownRef.current = false;
      }, 50);
    };
    
    window.addEventListener('mousedown', handleMouseDown);
    return () => window.removeEventListener('mousedown', handleMouseDown);
  }, [gameState]);

  function createShatterEffect() {
    const ghost = ghostRef.current;
    for(let i = 0; i < 10; i++) {
      fragmentsRef.current.push({
        x: ghost.x, y: ghost.y,
        vx: (Math.random() - 0.5) * 10,
        vy: (Math.random() - 0.5) * 10,
        life: 1.0
      });
    }
  }

  function spawnGhost() {
    const cvs = canvasRef.current;
    if (!cvs) return;
    
    ghostRef.current.x = Math.random() * cvs.width;
    ghostRef.current.y = Math.random() * cvs.height;
    const angle = Math.random() * Math.PI * 2;
    const speed = baseSpeed + Math.random() * 5;
    ghostRef.current.vx = Math.cos(angle) * speed;
    ghostRef.current.vy = Math.sin(angle) * speed;
  }

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
      
      spawnGhost();
    };

    updateCanvasSize();

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

    function draw() {
      if (!isActiveRef.current) return;
      
      drawBackground();
      
      // Update ghost position
      ghostRef.current.x += ghostRef.current.vx;
      ghostRef.current.y += ghostRef.current.vy;
      
      const ghost = ghostRef.current;
      
      // Bounce logic
      if (ghost.x < ghost.r) {
        ghost.x = ghost.r;
        ghost.vx *= -1;
      }
      if (ghost.x > cvs.width - ghost.r) {
        ghost.x = cvs.width - ghost.r;
        ghost.vx *= -1;
      }
      if (ghost.y < ghost.r) {
        ghost.y = ghost.r;
        ghost.vy *= -1;
      }
      if (ghost.y > cvs.height - ghost.r) {
        ghost.y = cvs.height - ghost.r;
        ghost.vy *= -1;
      }
      
      const predictX = ghost.x + (ghost.vx * LEAD_FRAMES);
      const predictY = ghost.y + (ghost.vy * LEAD_FRAMES);
      
      // Velocity vector line
      ctx.beginPath();
      ctx.moveTo(ghost.x, ghost.y);
      ctx.lineTo(ghost.x + ghost.vx * 6, ghost.y + ghost.vy * 6);
      ctx.strokeStyle = 'rgba(0, 255, 136, 0.35)';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Arrow head
      const angle = Math.atan2(ghost.vy, ghost.vx);
      const arrowX = ghost.x + ghost.vx * 6;
      const arrowY = ghost.y + ghost.vy * 6;
      const arrowSize = 7;
      
      ctx.beginPath();
      ctx.moveTo(arrowX, arrowY);
      ctx.lineTo(arrowX - arrowSize * Math.cos(angle - 0.7), arrowY - arrowSize * Math.sin(angle - 0.7));
      ctx.lineTo(arrowX - arrowSize * Math.cos(angle + 0.7), arrowY - arrowSize * Math.sin(angle + 0.7));
      ctx.closePath();
      ctx.fillStyle = 'rgba(0, 255, 136, 0.5)';
      ctx.fill();
      
      // Prediction line
      ctx.beginPath();
      ctx.moveTo(ghost.x, ghost.y);
      ctx.lineTo(predictX, predictY);
      ctx.strokeStyle = 'rgba(0, 255, 136, 0.5)';
      ctx.lineWidth = 2;
      ctx.setLineDash([6, 5]);
      ctx.stroke();
      ctx.setLineDash([]);
      
      // Prediction target circle
      ctx.beginPath();
      ctx.arc(predictX, predictY, 30, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(0, 255, 136, 0.7)';
      ctx.lineWidth = 2.5;
      ctx.stroke();
      
      // Inner prediction ring
      ctx.beginPath();
      ctx.arc(predictX, predictY, 20, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(0, 255, 136, 0.35)';
      ctx.lineWidth = 1.5;
      ctx.stroke();
      
      // Ghost (current position)
      ctx.beginPath();
      ctx.arc(ghost.x, ghost.y, ghost.r, 0, Math.PI * 2);
      ctx.fillStyle = isBoxDarkMode ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.05)';
      ctx.fill();
      ctx.strokeStyle = isBoxDarkMode ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.12)';
      ctx.lineWidth = 1.5;
      ctx.stroke();
      
      // Ghost center dot
      ctx.beginPath();
      ctx.arc(ghost.x, ghost.y, 3, 0, Math.PI * 2);
      ctx.fillStyle = isBoxDarkMode ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.18)';
      ctx.fill();
      
      // Shatter fragments
      for (let i = fragmentsRef.current.length - 1; i >= 0; i--) {
        const f = fragmentsRef.current[i];
        f.x += f.vx;
        f.y += f.vy;
        f.life -= 0.02;
        ctx.fillStyle = `rgba(0, 255, 136, ${f.life})`;
        ctx.fillRect(f.x - 2, f.y - 2, 4, 4);
        if (f.life <= 0) fragmentsRef.current.splice(i, 1);
      }
      
      // Crosshair
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
      }
      
      animationRef.current = requestAnimationFrame(draw);
    }
    
    draw();

    const handleResize = () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      updateCanvasSize();
      animationRef.current = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', handleResize);
    
    const resizeObserver = new ResizeObserver(() => handleResize());
    if (containerRef.current) resizeObserver.observe(containerRef.current);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', handleResize);
      resizeObserver.disconnect();
      fragmentsRef.current = [];
    };
  }, [gameState, isBoxDarkMode]);

  const startGame = () => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
    
    setGameState('playing');
    gameStateRef.current = 'playing';
    setScore(0);
    setPredictions(0);
    setMissedCount(0);
    setCombo(0);
    setBestCombo(0);
    timeLeftRef.current = 60;
    setTimeLeft(60);
    setAccuracy(100);
    setLives(5);
    setFeedback('');
    
    isActiveRef.current = true;
    scoreRef.current = 0;
    comboRef.current = 0;
    livesRef.current = 5;
    fragmentsRef.current = [];
    clickCooldownRef.current = false;
    spawnGhost();
    
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
    setScore(0);
    setPredictions(0);
    setMissedCount(0);
    setCombo(0);
    setBestCombo(0);
    timeLeftRef.current = 60;
    setTimeLeft(60);
    setAccuracy(100);
    setLives(5);
    setFeedback('');
    fragmentsRef.current = [];
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
              <div className="p-3 bg-gradient-to-r from-green-500 to-teal-600 rounded-xl">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Predictive Tracking</h1>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Click the green prediction circle • 5 lives system</p>
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

        {/* Stats Board - 7 columns */}
        <div className="grid grid-cols-7 gap-3 mb-4 h-[88px]">
          <StatCard icon={<Target className="text-blue-600" />} value={score} label="Score" isDark={isDarkMode} />
          <StatCard icon={<Trophy className="text-yellow-500" />} value={bestScore} label="Best" isDark={isDarkMode} />
          <StatCard icon={<Timer className={timeLeft <= 10 ? 'text-red-600' : 'text-green-600'} />} value={timeLeft} label="Time" unit="s" isDark={isDarkMode} />
          <StatCard icon={<Zap className="text-orange-500" />} value={combo} label="Combo" isDark={isDarkMode} />
          <StatCard icon={<Check className="text-green-500" />} value={predictions} label="Hits" isDark={isDarkMode} />
          <StatCard icon={<Activity className="text-purple-500" />} value={accuracy} label="Accuracy" unit="%" isDark={isDarkMode} />
          <StatCard icon={<Heart className="text-red-500" />} value={lives} label="Lives" isDark={isDarkMode} />
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
                Score: <span className="text-yellow-400">{score}</span> | Hits: <span className="text-green-400">{predictions}</span> | Lives: <span className="text-red-400">{lives}</span>
              </div>
            </>
          )}

          <canvas ref={canvasRef} style={{ display: 'block', position: 'absolute', cursor: 'none' }} />

          {/* Start Screen */}
          {gameState === 'start' && (
            <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
              <div className={`rounded-2xl p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <TrendingUp className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Predictive Tracking</h3>
                <p className={`mb-6 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>60-second challenge • Click the green prediction circle • 5 lives system</p>
                <button 
                  onClick={startGame} 
                  className="px-8 py-3 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-xl font-semibold hover:shadow-lg w-full transition-all transform hover:scale-[1.02] active:scale-[0.98]"
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
                  <ResultCard label="Hits" value={predictions} icon={<Check className="w-4 h-4" />} color="text-green-500" />
                  <ResultCard label="Best Combo" value={bestCombo} icon={<Zap className="w-4 h-4" />} color="text-orange-500" />
                  <ResultCard label="Accuracy" value={accuracy} unit="%" icon={<Activity className="w-4 h-4" />} color="text-purple-500" />
                  <ResultCard label="Misses" value={missedCount} icon={<Heart className="w-4 h-4" />} color="text-red-500" />
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
                    className="flex-1 px-4 py-2.5 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98]"
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
                        <span className="font-semibold text-green-500">Click the GREEN prediction circle</span> • 12 frames ahead
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">2</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-blue-500">+1 point for hitting target</span> • Simple scoring system
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">3</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-purple-500">Build combo streaks</span> • 5 combo streak bonus
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">4</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-red-500">ANY wrong click = -1 life</span> • Miss or click off target
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">5</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-orange-500">-1 point penalty</span> • Only after all 5 lives are used
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">6</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-yellow-500">Arrow shows velocity direction</span> • Faint ghost = current position
                      </p>
                    </div>
                  </div>
                </div>
                <div className={`mt-3 pt-3 border-t text-xs ${isDarkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'} flex items-center justify-between`}>
                  <span>🎯 Shatter effect confirms successful hits</span>
                  <span>⚡ Click the prediction circle to score</span>
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
                   color === 'text-purple-500' ? 'bg-purple-500/10' : 'bg-red-500/10';
  
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