'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Target, Zap, Clock, Award, Activity, 
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, 
  Eye, Crosshair, Brain, Trophy, Info, Timer, TrendingUp, RefreshCw
} from 'lucide-react';

export default function KineticArrestPage() {
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
  const [timeLeft, setTimeLeft] = useState(60);
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  const [cursorSpeed, setCursorSpeed] = useState(0);
  const [currentSpeed, setCurrentSpeed] = useState(400);
  const [arrestsCount, setArrestsCount] = useState(0);
  const [misses, setMisses] = useState(0);
  const [activeNodes, setActiveNodes] = useState(1);
  
  const nodesRef = useRef([]);
  const scoreRef = useRef(0);
  const streakRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const lastMouseRef = useRef({ x: 0, y: 0 });
  const cursorVelRef = useRef(0);
  const lastTimeRef = useRef(performance.now());
  const timerIntervalRef = useRef(null);
  const feedbackTimeoutRef = useRef(null);
  const isActiveRef = useRef(false);
  const gameStateRef = useRef('start');
  const audioCtxRef = useRef(null);
  const speedRef = useRef(400);
  const arrestCountRef = useRef(0);
  const missesRef = useRef(0);
  const isFullscreenRef = useRef(false);
  const spawnTimerRef = useRef(0);

  // Load best score from localStorage on mount
  useEffect(() => {
    const savedBestScore = localStorage.getItem('kineticArrestBestScore');
    if (savedBestScore) {
      setBestScore(parseInt(savedBestScore, 10));
    }
  }, []);

  // Track fullscreen state in ref for game loop
  useEffect(() => {
    isFullscreenRef.current = isFullscreen;
    setActiveNodes(isFullscreen ? 2 : 1);
  }, [isFullscreen]);

  const updateBestScore = (finalScore) => {
    const currentBest = parseInt(localStorage.getItem('kineticArrestBestScore') || '0', 10);
    if (finalScore > currentBest) {
      localStorage.setItem('kineticArrestBestScore', finalScore.toString());
      setBestScore(finalScore);
    }
  };

  useEffect(() => {
    gameStateRef.current = gameState;
  }, [gameState]);

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
    }, 800);
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
      
      if (type === 'arrest') {
        osc.frequency.value = 880;
        gain.gain.value = 0.08;
      } else if (type === 'miss') {
        osc.frequency.value = 330;
        gain.gain.value = 0.1;
      } else if (type === 'streak') {
        osc.frequency.value = 1046.5;
        gain.gain.value = 0.1;
      } else if (type === 'speedup') {
        osc.frequency.value = 1318.5;
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

  const spawnNode = (cvs) => {
    if (!cvs) return null;
    const side = Math.floor(Math.random() * 4);
    
    const isFullscreenMode = isFullscreenRef.current;
    const baseSpeed = isFullscreenMode ? 600 : 400;
    const scoreBonus = Math.min(scoreRef.current * 20, 500);
    const streakBonus = Math.min(streakRef.current * 15, 300);
    const speed = baseSpeed + scoreBonus + streakBonus;
    
    speedRef.current = speed;
    setCurrentSpeed(Math.round(speed));
    
    let node;
    if (side === 0) {
      node = { x: -20, y: Math.random() * cvs.height, vx: speed, vy: 0, active: true };
    } else if (side === 1) {
      node = { x: cvs.width + 20, y: Math.random() * cvs.height, vx: -speed, vy: 0, active: true };
    } else if (side === 2) {
      node = { x: Math.random() * cvs.width, y: -20, vx: 0, vy: speed, active: true };
    } else {
      node = { x: Math.random() * cvs.width, y: cvs.height + 20, vx: 0, vy: -speed, active: true };
    }
    
    return node;
  };

  const handleMiss = (nodeIndex) => {
    if (!isActiveRef.current) return;
    
    // Reset streak only - NO score penalty
    streakRef.current = 0;
    setStreak(0);
    
    // Track misses for stats
    missesRef.current += 1;
    setMisses(missesRef.current);
    
    // Remove the missed node
    if (nodeIndex !== undefined) {
      nodesRef.current.splice(nodeIndex, 1);
    }
    
    showFeedback(`✗ Miss! Streak reset`, 'warning');
    playSound('miss');
    
    // Spawn replacement node
    setTimeout(() => {
      if (isActiveRef.current) {
        const isFullscreenMode = isFullscreenRef.current;
        const maxNodes = isFullscreenMode ? 2 : 1;
        
        while (nodesRef.current.length < maxNodes && isActiveRef.current) {
          const newNode = spawnNode(canvasRef.current);
          if (newNode) nodesRef.current.push(newNode);
        }
      }
    }, 300);
  };

  const handleArrest = (nodeIndex) => {
    if (!isActiveRef.current) return;
    
    arrestCountRef.current += 1;
    setArrestsCount(arrestCountRef.current);
    
    const newStreak = streakRef.current + 1;
    streakRef.current = newStreak;
    setStreak(newStreak);
    
    if (newStreak > bestStreak) {
      setBestStreak(newStreak);
    }
    
    // Score increases with streak bonuses
    const pointsEarned = 1 + Math.floor(newStreak / 5);
    scoreRef.current += pointsEarned;
    setScore(Math.floor(scoreRef.current));
    
    // Remove the arrested node
    nodesRef.current.splice(nodeIndex, 1);
    
    if (newStreak % 5 === 0 && newStreak > 0) {
      playSound('streak');
      showFeedback(`🔥 ${newStreak} Streak! +${pointsEarned}`, 'success');
    } else if (newStreak % 10 === 0 && newStreak > 0) {
      playSound('speedup');
      showFeedback(`⚡ Speed increasing! +${pointsEarned}`, 'success');
    } else {
      playSound('arrest');
      showFeedback(`✓ Arrested! +${pointsEarned}`, 'success');
    }
    
    // Spawn replacement node
    setTimeout(() => {
      if (isActiveRef.current) {
        const isFullscreenMode = isFullscreenRef.current;
        const maxNodes = isFullscreenMode ? 2 : 1;
        
        while (nodesRef.current.length < maxNodes && isActiveRef.current) {
          const newNode = spawnNode(canvasRef.current);
          if (newNode) nodesRef.current.push(newNode);
        }
      }
    }, 150);
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      const cvs = canvasRef.current;
      if (!cvs) return;
      const rect = cvs.getBoundingClientRect();
      const scaleX = cvs.width / rect.width;
      const scaleY = cvs.height / rect.height;
      
      mouseRef.current = {
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
      
      if (isActiveRef.current) {
        const isFullscreenMode = isFullscreenRef.current;
        const maxNodes = isFullscreenMode ? 2 : 1;
        
        nodesRef.current = [];
        for (let i = 0; i < maxNodes; i++) {
          const newNode = spawnNode(cvs);
          if (newNode) nodesRef.current.push(newNode);
        }
      }
    };

    const resizeObserver = new ResizeObserver(updateCanvasSize);
    if (containerRef.current) resizeObserver.observe(containerRef.current);
    window.addEventListener('resize', updateCanvasSize);
    updateCanvasSize();
    
    function draw() {
      const now = performance.now();
      const dt = (now - lastTimeRef.current) / 1000;
      lastTimeRef.current = now;
      
      const mouse = mouseRef.current;
      
      const velX = mouse.x - lastMouseRef.current.x;
      const velY = mouse.y - lastMouseRef.current.y;
      cursorVelRef.current = Math.hypot(velX, velY);
      setCursorSpeed(Math.round(cursorVelRef.current * 10) / 10);
      
      lastMouseRef.current.x = mouse.x;
      lastMouseRef.current.y = mouse.y;
      
      if (isActiveRef.current) {
        const isFullscreenMode = isFullscreenRef.current;
        const maxNodes = isFullscreenMode ? 2 : 1;
        
        while (nodesRef.current.length > maxNodes) {
          nodesRef.current.pop();
        }
        
        while (nodesRef.current.length < maxNodes) {
          const newNode = spawnNode(cvs);
          if (newNode) nodesRef.current.push(newNode);
        }
      }
      
      for (let i = nodesRef.current.length - 1; i >= 0; i--) {
        const node = nodesRef.current[i];
        if (!node || !node.active) continue;
        
        node.x += node.vx * dt;
        node.y += node.vy * dt;
        
        const dist = Math.hypot(mouse.x - node.x, mouse.y - node.y);
        
        if (dist < 20 && isActiveRef.current) {
          if (cursorVelRef.current < 1.5) {
            handleArrest(i);
            break;
          } else {
            handleMiss(i);
            break;
          }
        }
        
        const padding = 100;
        if (node.x < -padding || node.x > cvs.width + padding || 
            node.y < -padding || node.y > cvs.height + padding) {
          handleMiss(i);
          break;
        }
      }
      
      ctx.fillStyle = isBoxDarkMode ? "#020202" : "#f9fafb";
      ctx.fillRect(0, 0, cvs.width, cvs.height);
      
      ctx.strokeStyle = isBoxDarkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)';
      ctx.lineWidth = 1;
      for (let i = 0; i < cvs.width; i += 50) {
        ctx.beginPath();
        ctx.moveTo(i, 0); ctx.lineTo(i, cvs.height); ctx.stroke();
        ctx.moveTo(0, i); ctx.lineTo(cvs.width, i); ctx.stroke();
      }
      
      ctx.fillStyle = isBoxDarkMode ? "#0a0a0a" : "#e5e7eb";
      ctx.font = "bold 120px Courier New";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(scoreRef.current, cvs.width / 2, cvs.height / 2);
      
      nodesRef.current.forEach(node => {
        if (!node || !node.active) return;
        
        const speedIntensity = Math.min(1, (speedRef.current - 400) / 800);
        const glowColor = speedIntensity > 0.5 ? 
          `rgba(255, ${Math.floor(255 * (1 - speedIntensity))}, 0, 0.6)` : 
          `rgba(0, 255, 136, 0.6)`;
        
        ctx.shadowBlur = 15 + speedIntensity * 10;
        ctx.shadowColor = glowColor;
        
        ctx.beginPath();
        ctx.arc(node.x, node.y, 10, 0, Math.PI * 2);
        
        if (speedIntensity > 0.5) {
          const r = 255;
          const g = Math.floor(255 * (1 - speedIntensity));
          ctx.fillStyle = `rgb(${r}, ${g}, 0)`;
          ctx.strokeStyle = `rgb(${r}, ${g}, 0)`;
        } else {
          ctx.fillStyle = "#00ff88";
          ctx.strokeStyle = "#00ff88";
        }
        ctx.fill();
        
        ctx.shadowBlur = 0;
        
        const angle = Math.atan2(node.vy, node.vx);
        ctx.beginPath();
        ctx.moveTo(node.x, node.y);
        ctx.lineTo(
          node.x - Math.cos(angle) * 15,
          node.y - Math.sin(angle) * 15
        );
        ctx.strokeStyle = ctx.fillStyle;
        ctx.lineWidth = 2;
        ctx.stroke();
        
        ctx.beginPath();
        ctx.arc(node.x, node.y, 20, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 + speedIntensity * 0.4})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      });
      
      if (isFullscreenRef.current && isActiveRef.current) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.font = '12px monospace';
        ctx.textAlign = 'left';
        ctx.fillText('FULLSCREEN MODE • 2x NODES • HIGH SPEED • NO PENALTY', 10, 20);
      }
      
      if (mouse.x > 0 && mouse.x < cvs.width && mouse.y > 0 && mouse.y < cvs.height) {
        const isStill = cursorVelRef.current < 1.5;
        
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 15, 0, Math.PI * 2);
        ctx.strokeStyle = isStill ? "#00ff88" : "#FF3E3E";
        ctx.lineWidth = 2;
        ctx.stroke();
        
        ctx.strokeStyle = isStill ? "#00ff88" : "#FF3E3E";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(mouse.x - 12, mouse.y);
        ctx.lineTo(mouse.x + 12, mouse.y);
        ctx.moveTo(mouse.x, mouse.y - 12);
        ctx.lineTo(mouse.x, mouse.y + 12);
        ctx.stroke();
        
        ctx.fillStyle = isStill ? "#00ff88" : "#FF3E3E";
        ctx.font = "10px monospace";
        ctx.textAlign = "center";
        ctx.fillText(
          isStill ? "ARREST READY" : `VEL: ${cursorVelRef.current.toFixed(1)}`,
          mouse.x, 
          mouse.y - 25
        );
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
    setTimeLeft(60);
    setFeedback('');
    setCursorSpeed(0);
    setCurrentSpeed(isFullscreenRef.current ? 600 : 400);
    setArrestsCount(0);
    setMisses(0);
    setActiveNodes(isFullscreenRef.current ? 2 : 1);
    
    isActiveRef.current = true;
    scoreRef.current = 0;
    streakRef.current = 0;
    speedRef.current = isFullscreenRef.current ? 600 : 400;
    arrestCountRef.current = 0;
    missesRef.current = 0;
    nodesRef.current = [];
    
    if (canvasRef.current) {
      const maxNodes = isFullscreenRef.current ? 2 : 1;
      for (let i = 0; i < maxNodes; i++) {
        const newNode = spawnNode(canvasRef.current);
        if (newNode) nodesRef.current.push(newNode);
      }
    }
  };

  const resetGame = () => {
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    isActiveRef.current = false;
    setGameState('start');
    gameStateRef.current = 'start';
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setTimeLeft(60);
    setFeedback('');
    setCursorSpeed(0);
    setCurrentSpeed(400);
    setArrestsCount(0);
    setMisses(0);
    setActiveNodes(1);
    nodesRef.current = [];
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
        <div className="mb-6">
          <Link href="/drills/physical" className={`inline-flex items-center gap-2 mb-4 ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>
            <ArrowLeft className="w-4 h-4" /> Back to Physical Drills
          </Link>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl">
                <Crosshair className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Kinetic Arrest</h1>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Stop cursor to arrest nodes • No penalty for misses • {isFullscreen ? 'Fullscreen: 2x Nodes + Speed' : '60-sec challenge'}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              {gameState === 'playing' && (
                <button 
                  onClick={resetGame} 
                  className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`} 
                  title="Reset session"
                >
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
        <div className="grid grid-cols-6 gap-3 mb-4 h-[88px]">
          <StatCard icon={<Target className="text-green-500" />} value={score} label="Score" isDark={isDarkMode} />
          <StatCard icon={<Trophy className="text-yellow-500" />} value={bestScore} label="Best" isDark={isDarkMode} />
          <StatCard icon={<Timer className={timeLeft < 15 ? 'text-red-600' : 'text-green-600'} />} value={timeLeft} label="Time" unit="s" isDark={isDarkMode} />
          <StatCard icon={<TrendingUp className="text-orange-500" />} value={currentSpeed} label="Speed" unit="px/s" isDark={isDarkMode} />
          <StatCard icon={<Zap className="text-purple-500" />} value={streak} label="Streak" isDark={isDarkMode} />
          <StatCard icon={<Activity className="text-blue-500" />} value={`${activeNodes}x`} label="Nodes" isDark={isDarkMode} />
        </div>

        {/* Feedback Bar */}
        <div className="h-8 mb-2 flex justify-center items-center">
          <div className={`px-4 py-1 rounded-lg text-white font-medium text-sm transition-opacity duration-150 ${feedback ? 'opacity-100' : 'opacity-0'} ${
            feedbackType === 'success' ? 'bg-green-500' : feedbackType === 'warning' ? 'bg-orange-500' : 'bg-red-500'
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
              <button 
                onClick={resetGame} 
                className="p-2 bg-black/50 rounded-lg text-white hover:bg-black/70 transition-all" 
                title="Reset session"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
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
                <Crosshair className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Kinetic Arrest</h3>
                <p className={`mb-6 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  60-second challenge • No penalties • Speed scales with skill
                  <br />
                  <span className="text-green-400 text-sm font-semibold"></span>
                </p>
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
              <div className={`rounded-2xl p-8 shadow-xl border w-[520px] ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <div className="flex items-center justify-center gap-3 mb-6">
                  <Award className="w-10 h-10 text-yellow-500" />
                  <h3 className={`text-2xl font-bold ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Session Complete!</h3>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <ResultCard label="Final Score" value={score} icon={<Target className="w-4 h-4" />} color="text-green-500" />
                  <ResultCard label="Best Score" value={bestScore} icon={<Trophy className="w-4 h-4" />} color="text-yellow-500" />
                  <ResultCard label="Arrests" value={arrestsCount} icon={<Crosshair className="w-4 h-4" />} color="text-green-500" />
                  <ResultCard label="Best Streak" value={bestStreak} icon={<Zap className="w-4 h-4" />} color="text-orange-500" />
                  <ResultCard label="Peak Speed" value={currentSpeed} unit="px/s" icon={<TrendingUp className="w-4 h-4" />} color="text-red-500" />
                  <ResultCard label="Misses" value={misses} icon={<Activity className="w-4 h-4" />} color="text-purple-500" />
                </div>
                
                <div className="flex gap-4">
                  <Link href="/drills/physical" className="flex-1">
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
                        <span className="font-semibold text-green-500">Stop cursor completely</span> when node passes under it
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">2</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-blue-500">No penalties!</span> • Miss only resets streak, score unaffected
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">3</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-purple-500">Ring turns green</span> when cursor is still enough to arrest
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">4</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-orange-500">Fullscreen = 2x simultaneous nodes</span> + higher base speed
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-cyan-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">5</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-cyan-500">Every 5 streak = +1 bonus point</span> and speed increases
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">6</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-yellow-500">Node color changes</span> • Green = slow, Orange/Red = fast
                      </p>
                    </div>
                  </div>
                </div>
                <div className={`mt-3 pt-3 border-t text-xs ${isDarkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'} flex items-center justify-between`}>
                  <span>🎯 Focus on arrests • Misses only affect streak, not score</span>
                  <span>⚡ Speed: 400-1400 px/s • Pure skill-based scoring</span>
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
  const bgColor = color === 'text-green-500' ? 'bg-green-500/10' : 
                   color === 'text-yellow-500' ? 'bg-yellow-500/10' : 
                   color === 'text-orange-500' ? 'bg-orange-500/10' : 
                   color === 'text-purple-500' ? 'bg-purple-500/10' :
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