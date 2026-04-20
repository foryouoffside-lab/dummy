'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Target, Zap, Timer, Trophy, Heart, 
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, Eye,
  Info, Award, Activity, Check, Grid
} from 'lucide-react';

export default function ClinicalGrayGridPage() {
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
  const [reactionCount, setReactionCount] = useState(0);
  const [missedCount, setMissedCount] = useState(0);
  const [combo, setCombo] = useState(0);
  const [bestCombo, setBestCombo] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [bestReaction, setBestReaction] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [lives, setLives] = useState(5);
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  
  const nodesRef = useRef([]);
  const activeIndexRef = useRef(-1);
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const timeoutRef = useRef(null);
  const flashTimeoutRef = useRef(null);
  const reactionStartTimeRef = useRef(0);
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
  const isFlashingRef = useRef(false);
  const BALL_RADIUS = 45;
  const SPACING = 180;

  // Load best score from localStorage
  useEffect(() => {
    const savedBestScore = localStorage.getItem('gridDrillBestScore');
    if (savedBestScore) {
      setBestScore(parseInt(savedBestScore, 10));
    }
  }, []);

  // Update best score ONLY when game ends
  const updateBestScore = (finalScore) => {
    const currentBestScore = parseInt(localStorage.getItem('gridDrillBestScore') || '0', 10);
    if (finalScore > currentBestScore) {
      localStorage.setItem('gridDrillBestScore', finalScore.toString());
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
          if (flashTimeoutRef.current) clearTimeout(flashTimeoutRef.current);
          if (timeoutRef.current) clearTimeout(timeoutRef.current);
          setGameState('gameOver');
          gameStateRef.current = 'gameOver';
          isActiveRef.current = false;
          isFlashingRef.current = false;
          
          const total = reactionCount + missedCount;
          const finalAccuracy = total === 0 ? 100 : Math.round((reactionCount / total) * 100);
          setAccuracy(finalAccuracy);
          updateBestScore(scoreRef.current);
        }
      }
    }, 1000);
  }, [reactionCount, missedCount]);

  const handleMissClick = () => {
    if (!isActiveRef.current) return;
    
    setMissedCount(prev => prev + 1);
    comboRef.current = 0;
    setCombo(0);
    
    // Use one life for wrong click (only when target is active)
    if (livesRef.current > 0) {
      livesRef.current -= 1;
      setLives(livesRef.current);
      playSound('fail');
      showFeedback(`✗ Miss! -1 life`, 'error');
    }
    
    // If no lives left, apply penalty
    if (livesRef.current === 0) {
      scoreRef.current = Math.max(0, scoreRef.current - 1);
      setScore(scoreRef.current);
      playSound('penalty');
      showFeedback(`✗ -1 point!`, 'error');
    }
  };

  // Schedule next target - extracted to reusable function
  const scheduleNextTarget = useCallback(() => {
    if (!isActiveRef.current) return;
    if (gameStateRef.current !== 'playing') return;
    
    const waitTime = 400 + Math.random() * 800;
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    
    timeoutRef.current = setTimeout(() => {
      if (!isActiveRef.current) return;
      if (gameStateRef.current !== 'playing') return;
      
      const nodes = nodesRef.current;
      if (nodes.length === 0) return;
      
      activeIndexRef.current = Math.floor(Math.random() * nodes.length);
      isFlashingRef.current = true;
      reactionStartTimeRef.current = performance.now();
      
      if (flashTimeoutRef.current) {
        clearTimeout(flashTimeoutRef.current);
        flashTimeoutRef.current = null;
      }
      
      flashTimeoutRef.current = setTimeout(() => {
        if (activeIndexRef.current !== -1 && isActiveRef.current && gameStateRef.current === 'playing') {
          activeIndexRef.current = -1;
          isFlashingRef.current = false;
        }
        scheduleNextTarget();
      }, 450);
      
    }, waitTime);
  }, []);

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
      const nodes = nodesRef.current;
      
      clickCooldownRef.current = true;
      
      // Only process clicks when there's an active target
      if (activeIndexRef.current === -1) {
        // No active target - just ignore the click (no penalty)
        setTimeout(() => { clickCooldownRef.current = false; }, 50);
        return;
      }

      const activeNode = nodes[activeIndexRef.current];
      if (!activeNode) {
        setTimeout(() => { clickCooldownRef.current = false; }, 50);
        return;
      }
      
      const dist = Math.hypot(mouse.x - activeNode.x, mouse.y - activeNode.y);
      const reactionTime = performance.now() - reactionStartTimeRef.current;
      
      if (dist < BALL_RADIUS + 15) {
        // Hit the active target - +1 point
        scoreRef.current += 1;
        setScore(scoreRef.current);
        setReactionCount(prev => prev + 1);
        comboRef.current++;
        setCombo(comboRef.current);
        if (comboRef.current > bestCombo) setBestCombo(comboRef.current);
        
        if (bestReaction === 0 || reactionTime < bestReaction) {
          setBestReaction(Math.round(reactionTime));
        }
        
        playSound('success');
        
        if (comboRef.current % 5 === 0) {
          playSound('combo');
          showFeedback(`🔥 ${comboRef.current} Combo!`, 'success');
        }
        
        showFeedback(`✓ +1 | ${Math.round(reactionTime)}ms`, 'success');
        
        // Clear active target and cancel flash timeout
        if (flashTimeoutRef.current) {
          clearTimeout(flashTimeoutRef.current);
          flashTimeoutRef.current = null;
        }
        
        // Cancel the scheduling timeout if it exists
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }
        
        activeIndexRef.current = -1;
        isFlashingRef.current = false;
        
        // Schedule the next target after a successful hit
        scheduleNextTarget();
      } else {
        // Clicked elsewhere while target is active - penalty
        handleMissClick();
      }
      
      setTimeout(() => {
        clickCooldownRef.current = false;
      }, 50);
    };
    
    window.addEventListener('mousedown', handleMouseDown);
    return () => window.removeEventListener('mousedown', handleMouseDown);
  }, [gameState, bestReaction, scheduleNextTarget]);

  function generateSquare(cvs) {
    const nodes = [];
    const cx = cvs.width / 2;
    const cy = cvs.height / 2;
    const startX = cx - SPACING * 1.5;
    const startY = cy - SPACING * 1.5;

    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        nodes.push({ x: startX + col * SPACING, y: startY + row * SPACING });
      }
    }
    return nodes;
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
      
      nodesRef.current = generateSquare(cvs);
    };

    updateCanvasSize();
    
    // Reset flash state and start loop
    isFlashingRef.current = false;
    activeIndexRef.current = -1;
    
    // Start the first target scheduling
    scheduleNextTarget();

    const BG_COLOR = isBoxDarkMode ? "#020202" : "#f9fafb";
    const NODE_INACTIVE = isBoxDarkMode ? "#1a1a1a" : "#d1d5db";
    const TARGET_COLOR = "#ff3333";
    const GRID_LINE = isBoxDarkMode ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.05)";
    
    function draw() {
      if (!isActiveRef.current) return;
      
      ctx.fillStyle = BG_COLOR;
      ctx.fillRect(0, 0, cvs.width, cvs.height);
      
      ctx.strokeStyle = GRID_LINE;
      ctx.lineWidth = 1;
      nodesRef.current.forEach(n => {
        ctx.beginPath();
        ctx.moveTo(n.x, 0);
        ctx.lineTo(n.x, cvs.height);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, n.y);
        ctx.lineTo(cvs.width, n.y);
        ctx.stroke();
      });
      
      for (let i = 0; i < nodesRef.current.length; i++) {
        const n = nodesRef.current[i];
        
        ctx.beginPath();
        ctx.arc(n.x, n.y, BALL_RADIUS, 0, Math.PI * 2);
        
        if (i === activeIndexRef.current) {
          ctx.fillStyle = TARGET_COLOR;
          ctx.shadowBlur = 30;
          ctx.shadowColor = TARGET_COLOR;
        } else {
          ctx.fillStyle = NODE_INACTIVE;
          ctx.shadowBlur = 0;
        }
        ctx.fill();
        ctx.shadowBlur = 0;
        
        ctx.beginPath();
        ctx.arc(n.x, n.y, BALL_RADIUS, 0, Math.PI * 2);
        ctx.strokeStyle = isBoxDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)";
        ctx.lineWidth = 1.5;
        ctx.stroke();
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
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      if (flashTimeoutRef.current) {
        clearTimeout(flashTimeoutRef.current);
        flashTimeoutRef.current = null;
      }
      window.removeEventListener('resize', handleResize);
      resizeObserver.disconnect();
    };
  }, [gameState, isBoxDarkMode, scheduleNextTarget]);

  const startGame = () => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (flashTimeoutRef.current) {
      clearTimeout(flashTimeoutRef.current);
      flashTimeoutRef.current = null;
    }
    
    setGameState('playing');
    gameStateRef.current = 'playing';
    setScore(0);
    setReactionCount(0);
    setMissedCount(0);
    setCombo(0);
    setBestCombo(0);
    timeLeftRef.current = 60;
    setTimeLeft(60);
    setBestReaction(0);
    setAccuracy(100);
    setLives(5);
    setFeedback('');
    
    isActiveRef.current = true;
    scoreRef.current = 0;
    comboRef.current = 0;
    livesRef.current = 5;
    activeIndexRef.current = -1;
    clickCooldownRef.current = false;
    isFlashingRef.current = false;
    
    startTimer();
  };

  const resetGame = () => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (flashTimeoutRef.current) {
      clearTimeout(flashTimeoutRef.current);
      flashTimeoutRef.current = null;
    }
    
    isActiveRef.current = false;
    setGameState('start');
    gameStateRef.current = 'start';
    setScore(0);
    setReactionCount(0);
    setMissedCount(0);
    setCombo(0);
    setBestCombo(0);
    timeLeftRef.current = 60;
    setTimeLeft(60);
    setBestReaction(0);
    setAccuracy(100);
    setLives(5);
    setFeedback('');
    activeIndexRef.current = -1;
    isFlashingRef.current = false;
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
              <div className="p-3 bg-gradient-to-r from-gray-700 to-gray-900 rounded-xl">
                <Grid className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Clinical Gray Grid</h1>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>4x4 grid • 450ms targets • 5 lives system</p>
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
          <StatCard icon={<Check className="text-green-500" />} value={reactionCount} label="Hits" isDark={isDarkMode} />
          <StatCard icon={<Activity className="text-purple-500" />} value={bestReaction || '-'} label="Best" unit="ms" isDark={isDarkMode} />
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
                Score: <span className="text-yellow-400">{score}</span> | Hits: <span className="text-green-400">{reactionCount}</span> | Lives: <span className="text-red-400">{lives}</span>
              </div>
            </>
          )}

          <canvas ref={canvasRef} style={{ display: 'block', position: 'absolute', cursor: 'none' }} />

          {/* Start Screen */}
          {gameState === 'start' && (
            <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
              <div className={`rounded-2xl p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <Grid className="w-16 h-16 text-red-500 mx-auto mb-4" />
                <h3 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Clinical Gray Grid</h3>
                <p className={`mb-6 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>60-second challenge • 4x4 grid • 5 lives system</p>
                <button 
                  onClick={startGame} 
                  className="px-8 py-3 bg-gradient-to-r from-gray-700 to-gray-900 text-white rounded-xl font-semibold hover:shadow-lg w-full transition-all transform hover:scale-[1.02] active:scale-[0.98]"
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
                  <ResultCard label="Hits" value={reactionCount} icon={<Check className="w-4 h-4" />} color="text-green-500" />
                  <ResultCard label="Best Combo" value={bestCombo} icon={<Zap className="w-4 h-4" />} color="text-orange-500" />
                  <ResultCard label="Best Reaction" value={bestReaction || '-'} unit="ms" icon={<Timer className="w-4 h-4" />} color="text-cyan-500" />
                  <ResultCard label="Accuracy" value={accuracy} unit="%" icon={<Activity className="w-4 h-4" />} color="text-purple-500" />
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
                    className="flex-1 px-4 py-2.5 bg-gradient-to-r from-gray-700 to-gray-900 text-white rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98]"
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
                  <Info className={`w-4 h-4 ${isDarkMode ? 'text-red-400' : 'text-red-600'}`} />
                  <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Drill Rules & Instructions</h3>
                </div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">1</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-red-500">RED target activates on 4x4 grid</span> • 450ms window
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">2</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-green-500">+1 point for hitting target</span> • Simple scoring system
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
                      <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">4</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-blue-500">5 Lives system</span> • Only miss during active target uses 1 life
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
                        <span className="font-semibold text-yellow-500">Clicks between targets = no penalty</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className={`mt-3 pt-3 border-t text-xs ${isDarkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'} flex items-center justify-between`}>
                  <span>🎲 Random delays 400-1200ms between targets</span>
                  <span>⚡ Click on RED target to score</span>
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
                   color === 'text-cyan-500' ? 'bg-cyan-500/10' :
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