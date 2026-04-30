'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Target, Zap, Clock, Award, Activity, 
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, 
  Eye, Brain, BarChart3, Timer, Trophy, Info, Route, Repeat
} from 'lucide-react';

export default function SustainedCircuitPage() {
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
  const [laps, setLaps] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestLapStreak, setBestLapStreak] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [corridorWidth, setCorridorWidth] = useState(50);
  const [lapTime, setLapTime] = useState(30);
  const [bestLapTime, setBestLapTime] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  
  const pathRef = useRef([]);
  const lapsRef = useRef(0);
  const streakRef = useRef(0);
  const scoreRef = useRef(0);
  const corridorWidthRef = useRef(50);
  const lapTimeRef = useRef(30);
  const bestLapTimeRef = useRef(0);
  const currentLapStartTimeRef = useRef(0);
  const stateRef = useRef('WAITING');
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const totalFramesRef = useRef(0);
  const onPathFramesRef = useRef(0);
  const failMsgRef = useRef("");
  const timerIntervalRef = useRef(null);
  const feedbackTimeoutRef = useRef(null);
  const isActiveRef = useRef(false);
  const gameStateRef = useRef('start');
  const audioCtxRef = useRef(null);

  const stripW = 20;
  const stripH = 120;
  const stripOffset = 40;

  // Load best score from localStorage on mount
  useEffect(() => {
    const savedBestScore = localStorage.getItem('sustainedCircuitBestScore');
    if (savedBestScore) {
      setBestScore(parseInt(savedBestScore, 10));
    }
  }, []);

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

  // Update best score ONLY when game ends
  const updateBestScore = (finalScore) => {
    const currentBestScore = parseInt(localStorage.getItem('sustainedCircuitBestScore') || '0', 10);
    if (finalScore > currentBestScore) {
      localStorage.setItem('sustainedCircuitBestScore', finalScore.toString());
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
    }, 500);
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
      
      if (type === 'lap') {
        osc.frequency.value = 880;
        gain.gain.value = 0.1;
      } else if (type === 'fail') {
        osc.frequency.value = 300;
        gain.gain.value = 0.12;
      } else if (type === 'streak') {
        osc.frequency.value = 1046.5;
        gain.gain.value = 0.1;
      } else if (type === 'start') {
        osc.frequency.value = 660;
        gain.gain.value = 0.08;
      } else if (type === 'penalty') {
        osc.frequency.value = 200;
        gain.gain.value = 0.1;
      } else if (type === 'bestLap') {
        osc.frequency.value = 1318.5;
        gain.gain.value = 0.12;
      }
      osc.start();
      gain.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 0.15);
      osc.stop(audioCtx.currentTime + 0.15);
    } catch (e) {}
  };

  useEffect(() => {
    if (gameState !== 'playing') return;
    
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    
    timerIntervalRef.current = setInterval(() => {
      // Main timer is handled in the animation loop
    }, 100);
    
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [gameState]);

  // Track mouse position
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

  const generatePath = (cvs) => {
    if (!cvs) return;
    
    const path = [];
    let curY = cvs.height / 2;
    const segments = 45;
    const startX = stripOffset + stripW;
    const endX = cvs.width - (stripOffset + stripW);
    const step = (endX - startX) / segments;
    
    for (let i = 0; i <= segments; i++) {
      if (i === 0 || i === segments) {
        curY = cvs.height / 2;
      } else {
        curY += (Math.random() - 0.5) * 300;
        curY = Math.max(150, Math.min(cvs.height - 150, curY));
      }
      path.push({x: startX + i * step, y: curY});
    }
    pathRef.current = path;
  };

  const applyPenalty = () => {
    if (!isActiveRef.current) return;
    
    const penaltyPoints = 15;
    scoreRef.current = Math.max(0, scoreRef.current - penaltyPoints);
    setScore(scoreRef.current);
    playSound('penalty');
    showFeedback(`✗ Mistake! -${penaltyPoints} points`, 'error');
  };

  const triggerFail = (msg, cvs) => {
    stateRef.current = 'FAIL';
    failMsgRef.current = msg;
    streakRef.current = 0;
    setStreak(0);
    corridorWidthRef.current = 50;
    setCorridorWidth(50);
    playSound('fail');
    applyPenalty();
    
    setTimeout(() => {
      if (cvs && isActiveRef.current) {
        stateRef.current = 'WAITING';
        failMsgRef.current = "";
        generatePath(cvs);
      }
    }, 1000);
  };

  const checkCollision = (cvs) => {
    if (stateRef.current !== 'ACTIVE') return;
    
    if (lapTimeRef.current <= 0) {
      triggerFail("TIME EXPIRED", cvs);
      return;
    }
    
    const mouse = mousePositionRef.current;
    const startX = stripOffset + stripW;
    const endX = cvs.width - (stripOffset + stripW);
    let onPath = false;
    
    if (mouse.x <= startX || mouse.x >= endX) {
      onPath = true;
    } else {
      for (let i = 0; i < pathRef.current.length - 1; i++) {
        const p1 = pathRef.current[i];
        const p2 = pathRef.current[i + 1];
        if (mouse.x >= p1.x && mouse.x <= p2.x) {
          const t = (mouse.x - p1.x) / (p2.x - p1.x);
          const targetY = p1.y + t * (p2.y - p1.y);
          if (Math.abs(mouse.y - targetY) < corridorWidthRef.current / 2) {
            onPath = true;
          }
          break;
        }
      }
    }
    
    if (!onPath) {
      triggerFail("OFF PATH", cvs);
      return;
    }
    
    totalFramesRef.current++;
    onPathFramesRef.current++;
    
    if (mouse.x > cvs.width - (stripOffset + stripW)) {
      // Lap complete! - 15 points per lap
      lapsRef.current++;
      setLaps(lapsRef.current);
      
      const lapCompletionTime = 30 - lapTimeRef.current;
      if (bestLapTimeRef.current === 0 || lapCompletionTime < bestLapTimeRef.current) {
        bestLapTimeRef.current = lapCompletionTime;
        setBestLapTime(lapCompletionTime);
        playSound('bestLap');
        showFeedback(`🏆 Best Lap! ${lapCompletionTime.toFixed(1)}s`, 'success');
      }
      
      const newStreak = streakRef.current + 1;
      streakRef.current = newStreak;
      setStreak(newStreak);
      
      if (newStreak > bestLapStreak) {
        setBestLapStreak(newStreak);
      }
      
      // 15 points per completed lap
      const pointsEarned = 15;
      scoreRef.current += pointsEarned;
      setScore(scoreRef.current);
      
      // Update best score
      if (scoreRef.current > bestScore) {
        setBestScore(scoreRef.current);
      }
      
      if (newStreak % 5 === 0 && newStreak > 0) {
        playSound('streak');
        showFeedback(`🔥 ${newStreak} Lap Streak! +${pointsEarned}`, 'success');
      } else {
        playSound('lap');
        showFeedback(`✓ Lap ${lapsRef.current} Complete! +${pointsEarned}`, 'success');
      }
      
      corridorWidthRef.current = Math.max(12, 50 - (newStreak * 2));
      setCorridorWidth(corridorWidthRef.current);
      stateRef.current = 'WAITING';
      generatePath(cvs);
    }
  };

  // Handle mouse clicks for start
  useEffect(() => {
    const handleMouseDown = () => {
      if (gameStateRef.current !== 'playing' || !isActiveRef.current) return;
      
      const cvs = canvasRef.current;
      if (!cvs) return;
      
      const mouse = mousePositionRef.current;
      
      if (stateRef.current === 'WAITING' && 
          mouse.x >= stripOffset && 
          mouse.x <= stripOffset + stripW && 
          Math.abs(mouse.y - cvs.height / 2) < stripH / 2) {
        stateRef.current = 'ACTIVE';
        lapTimeRef.current = 30;
        setLapTime(30);
        currentLapStartTimeRef.current = performance.now();
        playSound('start');
        showFeedback('▶ Lap Started!', 'success');
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
      
      generatePath(cvs);
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
      
      if (stateRef.current === 'ACTIVE') {
        lapTimeRef.current -= dt;
        setLapTime(Math.max(0, lapTimeRef.current));
      }
      
      checkCollision(cvs);
    }

    function draw() {
      const now = performance.now();
      const dt = Math.min(0.033, (now - lastFrameTime) / 1000);
      lastFrameTime = now;
      
      update(dt);
      
      ctx.fillStyle = isBoxDarkMode ? "#020202" : "#f9fafb";
      ctx.fillRect(0, 0, cvs.width, cvs.height);
      
      // Subtle grid
      ctx.strokeStyle = isBoxDarkMode ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)';
      ctx.lineWidth = 1;
      for (let i = 0; i < cvs.width; i += 50) {
        ctx.beginPath();
        ctx.moveTo(i, 0); ctx.lineTo(i, cvs.height); ctx.stroke();
        ctx.moveTo(0, i); ctx.lineTo(cvs.width, i); ctx.stroke();
      }
      
      // Draw corridor
      if (stateRef.current === 'ACTIVE' || stateRef.current === 'FAIL') {
        ctx.beginPath();
        ctx.strokeStyle = stateRef.current === 'FAIL' 
          ? (isBoxDarkMode ? "#400" : "#fee") 
          : (isBoxDarkMode ? "#800" : "#fca5a5");
        ctx.lineWidth = corridorWidthRef.current;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.moveTo(pathRef.current[0]?.x, pathRef.current[0]?.y);
        for (let i = 1; i < pathRef.current.length; i++) {
          ctx.lineTo(pathRef.current[i].x, pathRef.current[i].y);
        }
        ctx.stroke();
        
        // Path center line
        ctx.beginPath();
        ctx.strokeStyle = stateRef.current === 'ACTIVE' 
          ? (isBoxDarkMode ? "#ff4444" : "#dc2626") 
          : (isBoxDarkMode ? "#200" : "#fecaca");
        ctx.lineWidth = 2;
        ctx.moveTo(pathRef.current[0]?.x, pathRef.current[0]?.y);
        for (let i = 1; i < pathRef.current.length; i++) {
          ctx.lineTo(pathRef.current[i].x, pathRef.current[i].y);
        }
        ctx.stroke();
        
        // Cursor - Circle with plus inside
        const mouse = mousePositionRef.current;
        
        // Outer circle
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 10, 0, Math.PI * 2);
        ctx.fillStyle = stateRef.current === 'FAIL' ? "#ff4444" : "#00ff88";
        ctx.fill();
        
        // Inner circle (slightly smaller)
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 6, 0, Math.PI * 2);
        ctx.fillStyle = isBoxDarkMode ? "#020202" : "#ffffff";
        ctx.fill();
        
        // Plus sign
        ctx.strokeStyle = stateRef.current === 'FAIL' ? "#ff4444" : "#00ff88";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(mouse.x - 5, mouse.y);
        ctx.lineTo(mouse.x + 5, mouse.y);
        ctx.moveTo(mouse.x, mouse.y - 5);
        ctx.lineTo(mouse.x, mouse.y + 5);
        ctx.stroke();
      }
      
      // Start/End strips
      const stripY = cvs.height / 2 - stripH / 2;
      ctx.fillStyle = isBoxDarkMode ? "#ffffff" : "#000000";
      ctx.fillRect(stripOffset, stripY, stripW, stripH);
      ctx.fillRect(cvs.width - (stripOffset + stripW), stripY, stripW, stripH);
      
      // Timer bar
      if (stateRef.current === 'ACTIVE') {
        const barHeight = 3;
        const timerPercent = lapTimeRef.current / 30;
        ctx.fillStyle = lapTimeRef.current < 5 ? "#ff4444" : "#00ff88";
        ctx.fillRect(0, 0, cvs.width * timerPercent, barHeight);
      }
      
      // Waiting screen
      if (stateRef.current === 'WAITING') {
        ctx.fillStyle = isBoxDarkMode ? "#ffffff" : "#000000";
        ctx.font = "bold 16px monospace";
        ctx.textAlign = "center";
        ctx.fillText(`LAP ${lapsRef.current + 1} READY`, cvs.width / 2, cvs.height / 2 - 20);
        ctx.fillStyle = isBoxDarkMode ? "#888" : "#666";
        ctx.font = "11px monospace";
        ctx.fillText("CLICK LEFT STRIP TO START", cvs.width / 2, cvs.height / 2 + 15);
      }
      
      // Fail message
      if (stateRef.current === 'FAIL') {
        ctx.fillStyle = "#ff4444";
        ctx.font = "bold 18px monospace";
        ctx.textAlign = "center";
        ctx.fillText(failMsgRef.current, cvs.width / 2, cvs.height / 2);
      }
      
      // Crosshair when not active - Circle with plus
      const mouse = mousePositionRef.current;
      if (stateRef.current !== 'ACTIVE' && mouse.x > 0 && mouse.x < cvs.width && mouse.y > 0 && mouse.y < cvs.height) {
        // Outer circle
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 10, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0, 255, 136, 0.3)";
        ctx.fill();
        
        // Inner circle
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 6, 0, Math.PI * 2);
        ctx.fillStyle = isBoxDarkMode ? "#020202" : "#ffffff";
        ctx.fill();
        
        // Plus sign
        ctx.strokeStyle = "#00ff88";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(mouse.x - 5, mouse.y);
        ctx.lineTo(mouse.x + 5, mouse.y);
        ctx.moveTo(mouse.x, mouse.y - 5);
        ctx.lineTo(mouse.x, mouse.y + 5);
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
    setLaps(0);
    setStreak(0);
    setBestLapStreak(0);
    setCorridorWidth(50);
    setLapTime(30);
    setBestLapTime(0);
    setFeedback('');
    
    isActiveRef.current = true;
    scoreRef.current = 0;
    lapsRef.current = 0;
    streakRef.current = 0;
    corridorWidthRef.current = 50;
    lapTimeRef.current = 30;
    bestLapTimeRef.current = 0;
    stateRef.current = 'WAITING';
    totalFramesRef.current = 0;
    onPathFramesRef.current = 0;
    
    if (canvasRef.current) {
      generatePath(canvasRef.current);
    }
  };

  const resetGame = () => {
    isActiveRef.current = false;
    setGameState('start');
    gameStateRef.current = 'start';
    setScore(0);
    setLaps(0);
    setStreak(0);
    setBestLapStreak(0);
    setCorridorWidth(50);
    setLapTime(30);
    setBestLapTime(0);
    setFeedback('');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
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
              <div className="p-3 bg-gradient-to-r from-red-500 to-orange-600 rounded-xl">
                <Route className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Sustained Circuit</h1>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Complete laps • 15 points per lap</p>
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

        {/* Stats Board - No Lives */}
        <div className="grid grid-cols-6 gap-3 mb-4 h-[88px]">
          <StatCard icon={<Target className="text-blue-600" />} value={score} label="Score" isDark={isDarkMode} />
          <StatCard icon={<Trophy className="text-yellow-600" />} value={bestScore} label="Best" isDark={isDarkMode} />
          <StatCard icon={<Repeat className="text-green-600" />} value={laps} label="Laps" isDark={isDarkMode} />
          <StatCard icon={<Timer className={lapTime < 5 ? 'text-red-600' : 'text-cyan-600'} />} value={lapTime.toFixed(1)} label="Lap Time" unit="s" isDark={isDarkMode} />
          <StatCard icon={<Zap className="text-orange-600" />} value={streak} label="Streak" isDark={isDarkMode} />
          <StatCard icon={<Clock className="text-purple-600" />} value={bestLapTime > 0 ? bestLapTime.toFixed(1) : '-'} label="Best Lap" unit="s" isDark={isDarkMode} />
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
            <div className="absolute top-4 right-4 z-30 flex gap-3">
              <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 bg-black/50 rounded-lg text-white hover:bg-black/70 transition-all">{isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}</button>
              <button onClick={() => setIsBoxDarkMode(!isBoxDarkMode)} className="p-2 bg-black/50 rounded-lg text-white hover:bg-black/70 transition-all"><Eye className="w-5 h-5" /></button>
              <button onClick={() => setSoundEnabled(!soundEnabled)} className="p-2 bg-black/50 rounded-lg text-white hover:bg-black/70 transition-all">{soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}</button>
              <button onClick={toggleFullscreen} className="p-2 bg-black/50 rounded-lg text-white hover:bg-black/70 transition-all"><Minimize2 className="w-5 h-5" /></button>
            </div>
          )}

          <canvas ref={canvasRef} style={{ display: 'block', position: 'absolute', cursor: 'none' }} />

          {/* Start Screen - No rules inside */}
          {gameState === 'start' && (
            <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
              <div className={`rounded-2xl p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <Route className="w-16 h-16 text-red-500 mx-auto mb-4" />
                <h3 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Sustained Circuit</h3>
                <p className={`mb-6 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Complete laps • 15 points per lap</p>
                <button 
                  onClick={startGame} 
                  className="px-8 py-3 bg-gradient-to-r from-red-500 to-orange-600 text-white rounded-xl font-semibold hover:shadow-lg w-full transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  Start Circuit
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
                  <h3 className={`text-2xl font-bold ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Circuit Complete!</h3>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <ResultCard label="Final Score" value={score} icon={<Target className="w-4 h-4" />} color="text-yellow-500" />
                  <ResultCard label="Best Score" value={bestScore} icon={<Trophy className="w-4 h-4" />} color="text-yellow-500" />
                  <ResultCard label="Total Laps" value={laps} icon={<Repeat className="w-4 h-4" />} color="text-green-500" />
                  <ResultCard label="Best Lap" value={bestLapTime > 0 ? bestLapTime.toFixed(1) : '-'} unit="s" icon={<Clock className="w-4 h-4" />} color="text-purple-500" />
                  <ResultCard label="Best Streak" value={bestLapStreak} icon={<Zap className="w-4 h-4" />} color="text-orange-500" />
                  <ResultCard label="Min Corridor" value={`${corridorWidth}px`} icon={<Target className="w-4 h-4" />} color="text-cyan-500" />
                </div>
                
                <div className="flex gap-4">
                  <Link href="/drills/motor" className="flex-1">
                    <button className={`w-full px-4 py-2.5 rounded-lg font-semibold transition-all ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                      ← Back
                    </button>
                  </Link>
                  <button 
                    onClick={startGame} 
                    className="flex-1 px-4 py-2.5 bg-gradient-to-r from-red-500 to-orange-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Play Again →
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Rules Section - Below the drill box */}
        {!isFullscreen && (
          <div className="mt-6">
            <div className={`rounded-xl border overflow-hidden ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <div className={`px-4 py-3 border-b ${isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'}`}>
                <div className="flex items-center gap-2">
                  <Info className={`w-4 h-4 ${isDarkMode ? 'text-red-400' : 'text-red-600'}`} />
                  <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Circuit Rules & Scoring</h3>
                </div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">1</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Click left strip to start • Follow the <span className="font-semibold text-red-500">red path</span></p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">2</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Complete lap: <span className="font-semibold text-green-500">+15 points</span></p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">3</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Corridor <span className="font-semibold text-orange-500">shrinks with streak</span> (min 12px)</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">4</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Off path/Timeout: <span className="font-semibold text-blue-500">-15 points</span></p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">5</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}><span className="font-semibold text-purple-500">30 seconds</span> per lap time limit</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">6</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Cursor is a <span className="font-semibold text-yellow-500">circle with plus inside</span> • Best Score saves locally</p>
                    </div>
                  </div>
                </div>
                <div className={`mt-3 pt-3 border-t text-xs ${isDarkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'} flex items-center justify-between`}>
                  <span>🎯 Stay within corridor • Timer bar at top • Best lap tracked</span>
                  <span>💰 15 points per lap • -15 points penalty for mistakes</span>
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
                   color === 'text-green-500' ? 'bg-green-500/10' :
                   color === 'text-orange-500' ? 'bg-orange-500/10' :
                   color === 'text-red-500' ? 'bg-red-500/10' : 
                   color === 'text-blue-500' ? 'bg-blue-500/10' : 'bg-cyan-500/10';
  
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