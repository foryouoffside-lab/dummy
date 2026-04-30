'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Target, Zap, Timer, Trophy, Heart, 
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, Eye,
  Info, Award, Activity, Brain
} from 'lucide-react';

export default function GhostLinkPage() {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const containerRef = useRef(null);
  const [gameState, setGameState] = useState('start');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isBoxDarkMode, setIsBoxDarkMode] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  
  // Drill-specific tracking stats
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [phase, setPhase] = useState("MEMORIZE");
  const [memorizeTimer, setMemorizeTimer] = useState(2.0);
  const [identificationPhase, setIdentificationPhase] = useState(false);
  const [selectedBalls, setSelectedBalls] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  
  const ballsRef = useRef([]);
  const targetIndicesRef = useRef([]);
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const phaseRef = useRef("MEMORIZE");
  const timerRef = useRef(2.0);
  const canvasSizeRef = useRef({ width: 0, height: 0 });
  const timerIntervalRef = useRef(null);
  const isActiveRef = useRef(false);
  const gameStateRef = useRef('start');
  const audioCtxRef = useRef(null);
  const timeLeftRef = useRef(60);
  const radius = 25;
  const speed = 5;
  const config = { targets: 4, total: 11 }; // 4 targets, 11 total balls

  // Load best score from localStorage
  useEffect(() => {
    const savedBestScore = localStorage.getItem('ghostLinkBestScore');
    if (savedBestScore) {
      setBestScore(parseInt(savedBestScore, 10));
    }
  }, []);

  // Update best score
  const updateBestScore = (finalScore) => {
    const currentBestScore = parseInt(localStorage.getItem('ghostLinkBestScore') || '0', 10);
    if (finalScore > currentBestScore) {
      localStorage.setItem('ghostLinkBestScore', finalScore.toString());
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
      
      if (type === 'select') {
        osc.frequency.value = 880;
        gain.gain.value = 0.12;
      } else if (type === 'deselect') {
        osc.frequency.value = 440;
        gain.gain.value = 0.08;
      } else if (type === 'memorize') {
        osc.frequency.value = 660;
        gain.gain.value = 0.1;
      } else if (type === 'tracking') {
        osc.frequency.value = 880;
        gain.gain.value = 0.12;
      } else if (type === 'bonus') {
        osc.frequency.value = 1318;
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
      if (gameStateRef.current === 'playing' && isActiveRef.current && !identificationPhase) {
        timeLeftRef.current -= 1;
        setTimeLeft(timeLeftRef.current);
        
        if (timeLeftRef.current <= 0) {
          clearInterval(timerIntervalRef.current);
          timerIntervalRef.current = null;
          startIdentificationPhase();
        }
      }
    }, 1000);
  }, [identificationPhase]);

  const startIdentificationPhase = () => {
    setIdentificationPhase(true);
    isActiveRef.current = false;
    playSound('tracking');
  };

  const calculateBonus = () => {
    const correctSelections = selectedBalls.filter(idx => targetIndicesRef.current.includes(idx)).length;
    const bonus = correctSelections * 5;
    setCorrectCount(correctSelections);
    setScore(bonus);
    setShowResults(true);
    
    if (bonus > 0) {
      playSound('bonus');
    }
    
    // Update best score
    updateBestScore(bonus);
    
    // End game after showing results
    setTimeout(() => {
      setGameState('gameOver');
      gameStateRef.current = 'gameOver';
    }, 2000);
  };

  const handleBallClick = (index) => {
    if (!identificationPhase || showResults) return;
    
    if (selectedBalls.includes(index)) {
      // Deselect
      setSelectedBalls(prev => prev.filter(i => i !== index));
      playSound('deselect');
    } else {
      // Only allow selecting up to 4 balls
      if (selectedBalls.length >= config.targets) {
        return;
      }
      // Select
      setSelectedBalls(prev => [...prev, index]);
      playSound('select');
    }
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

  useEffect(() => {
    const handleMouseDown = (e) => {
      if (gameState !== 'playing') return;
      
      const cvs = canvasRef.current;
      if (!cvs) return;
      
      const rect = cvs.getBoundingClientRect();
      const scaleX = cvs.width / rect.width;
      const scaleY = cvs.height / rect.height;
      const clickX = (e.clientX - rect.left) * scaleX;
      const clickY = (e.clientY - rect.top) * scaleY;
      
      if (identificationPhase && !showResults) {
        // Check if clicked on a ball
        ballsRef.current.forEach((ball, index) => {
          const dist = Math.hypot(clickX - ball.x, clickY - ball.y);
          if (dist < ball.r) {
            handleBallClick(index);
          }
        });
      }
    };
    
    window.addEventListener('mousedown', handleMouseDown);
    return () => window.removeEventListener('mousedown', handleMouseDown);
  }, [gameState, identificationPhase, showResults, selectedBalls]);

  const initDrill = () => {
    const cvs = canvasRef.current;
    if (!cvs) return;
    
    ballsRef.current = [];
    targetIndicesRef.current = [];
    setSelectedBalls([]);
    setShowResults(false);
    setScore(0);
    setCorrectCount(0);
    
    const indices = [];
    while (indices.length < config.targets) {
      const idx = Math.floor(Math.random() * config.total);
      if (!indices.includes(idx)) {
        indices.push(idx);
      }
    }
    targetIndicesRef.current = indices;
    
    for (let i = 0; i < config.total; i++) {
      const angle = Math.random() * Math.PI * 2;
      ballsRef.current.push({
        x: radius + Math.random() * (cvs.width - radius * 2),
        y: radius + Math.random() * (cvs.height - radius * 2),
        r: radius,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        isTarget: targetIndicesRef.current.includes(i)
      });
    }
    
    phaseRef.current = "MEMORIZE";
    setPhase("MEMORIZE");
    timerRef.current = 2.0;
    setMemorizeTimer(2.0);
    setIdentificationPhase(false);
    playSound('memorize');
  };

  const updatePhysics = () => {
    const cvs = canvasRef.current;
    if (!cvs) return;
    
    ballsRef.current.forEach((ball) => {
      ball.x += ball.vx;
      ball.y += ball.vy;
      if (ball.x < ball.r || ball.x > cvs.width - ball.r) ball.vx *= -1;
      if (ball.y < ball.r || ball.y > cvs.height - ball.r) ball.vy *= -1;
    });
  };

  useEffect(() => {
    if (gameState !== 'playing' && gameState !== 'gameOver') return;

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
      
      if (gameState === 'playing' && ballsRef.current.length === 0) {
        initDrill();
      }
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

    function drawBalls() {
      ballsRef.current.forEach((ball, index) => {
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
        
        if (identificationPhase) {
          // Identification phase - show selection state
          if (showResults) {
            // Show results - reveal which were targets
            if (ball.isTarget) {
              ctx.fillStyle = "#00ff88";
              ctx.shadowBlur = 30;
              ctx.shadowColor = "#00ff88";
            } else {
              ctx.fillStyle = isBoxDarkMode ? "#333333" : "#cccccc";
              ctx.shadowBlur = 0;
            }
          } else {
            // Selection phase
            if (selectedBalls.includes(index)) {
              ctx.fillStyle = "#ffaa00";
              ctx.shadowBlur = 30;
              ctx.shadowColor = "#ffaa00";
            } else {
              ctx.fillStyle = "#ffffff";
              ctx.shadowBlur = 0;
            }
          }
        } else if (phaseRef.current === "MEMORIZE") {
          if (ball.isTarget) {
            ctx.fillStyle = "#00ff88";
            ctx.shadowBlur = 30;
            ctx.shadowColor = "#00ff88";
          } else {
            ctx.fillStyle = isBoxDarkMode ? "#1a1a1a" : "#cccccc";
            ctx.shadowBlur = 0;
          }
        } else {
          ctx.fillStyle = "#ffffff";
          ctx.shadowBlur = 0;
        }
        
        ctx.fill();
        ctx.shadowBlur = 0;
        
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
        ctx.strokeStyle = isBoxDarkMode ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.1)";
        ctx.lineWidth = 1.5;
        ctx.stroke();
        
        // Draw checkmark for selected balls
        if (identificationPhase && !showResults && selectedBalls.includes(index)) {
          ctx.font = "bold 24px Arial";
          ctx.fillStyle = "#ffffff";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText("✓", ball.x, ball.y);
        }
      });
    }

    function drawIdentificationUI() {
      if (!identificationPhase) return;
      
      // Draw instruction
      ctx.font = "bold 20px Arial";
      ctx.fillStyle = "#ffffff";
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      
      if (showResults) {
        ctx.fillText(`You tracked ${correctCount}/${config.targets} correctly! +${score} points!`, cvs.width / 2, 20);
      } else {
        ctx.fillText(`Click the ${config.targets} balls you tracked! (${selectedBalls.length}/${config.targets} selected)`, cvs.width / 2, 20);
      }
      
      // Draw confirm button
      if (!showResults && selectedBalls.length === config.targets) {
        const btnX = cvs.width / 2 - 60;
        const btnY = cvs.height - 60;
        const btnW = 120;
        const btnH = 40;
        
        ctx.fillStyle = "#00ff88";
        ctx.fillRect(btnX, btnY, btnW, btnH);
        ctx.fillStyle = "#000000";
        ctx.font = "bold 16px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("CONFIRM", cvs.width / 2, btnY + btnH / 2);
      }
    }

    function drawCrosshair() {
      if (identificationPhase) return;
      
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
    }

    let lastTime = performance.now();

    function render(now) {
      const dt = Math.min(0.033, (now - lastTime) / 1000);
      lastTime = now;
      
      if (gameState === 'playing' && isActiveRef.current && !identificationPhase) {
        if (phaseRef.current === "MEMORIZE") {
          timerRef.current -= dt;
          setMemorizeTimer(timerRef.current);
          if (timerRef.current <= 0) {
            phaseRef.current = "TRACKING";
            setPhase("TRACKING");
            playSound('tracking');
          }
        } else if (phaseRef.current === "TRACKING") {
          updatePhysics();
        }
      }
      
      drawBackground();
      drawBalls();
      drawIdentificationUI();
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
  }, [gameState, isBoxDarkMode, identificationPhase, showResults, selectedBalls, correctCount]);

  // Check for confirm button click
  useEffect(() => {
    const handleConfirmClick = (e) => {
      if (!identificationPhase || showResults) return;
      if (selectedBalls.length !== config.targets) return;
      
      const cvs = canvasRef.current;
      if (!cvs) return;
      
      const rect = cvs.getBoundingClientRect();
      const scaleX = cvs.width / rect.width;
      const scaleY = cvs.height / rect.height;
      const clickX = (e.clientX - rect.left) * scaleX;
      const clickY = (e.clientY - rect.top) * scaleY;
      
      const btnX = cvs.width / 2 - 60;
      const btnY = cvs.height - 60;
      const btnW = 120;
      const btnH = 40;
      
      if (clickX >= btnX && clickX <= btnX + btnW && clickY >= btnY && clickY <= btnY + btnH) {
        calculateBonus();
      }
    };
    
    window.addEventListener('mousedown', handleConfirmClick);
    return () => window.removeEventListener('mousedown', handleConfirmClick);
  }, [identificationPhase, showResults, selectedBalls]);

  const startGame = () => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
    
    setGameState('playing');
    gameStateRef.current = 'playing';
    setScore(0);
    timeLeftRef.current = 60;
    setTimeLeft(60);
    setPhase("MEMORIZE");
    setIdentificationPhase(false);
    setSelectedBalls([]);
    setShowResults(false);
    setCorrectCount(0);
    
    isActiveRef.current = true;
    ballsRef.current = [];
    targetIndicesRef.current = [];
    
    startTimer();
    setTimeout(() => initDrill(), 50);
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
    timeLeftRef.current = 60;
    setTimeLeft(60);
    setIdentificationPhase(false);
    setSelectedBalls([]);
    setShowResults(false);
    setCorrectCount(0);
  };

  return (
    <div className={`min-h-screen select-none ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link href="/drills/visual" className={`inline-flex items-center gap-2 mb-4 ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>
            <ArrowLeft className="w-4 h-4" /> Back to Visual Drills
          </Link>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Ghost-Link Tracking</h1>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Memorize 4 targets • Track for 60s • +5 per correct ball</p>
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

        {/* Stats Board - 3 columns */}
        <div className="grid grid-cols-3 gap-3 mb-4 h-[88px]">
          <StatCard icon={<Trophy className="text-yellow-500" />} value={score} label="Score" isDark={isDarkMode} />
          <StatCard icon={<Award className="text-purple-500" />} value={bestScore} label="Best Score" isDark={isDarkMode} />
          <StatCard icon={<Timer className={timeLeft <= 10 ? 'text-red-600' : 'text-green-600'} />} value={timeLeft} label="Time Left" unit="s" isDark={isDarkMode} />
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
          <canvas ref={canvasRef} style={{ display: 'block', position: 'absolute', cursor: gameState === 'playing' && !identificationPhase ? 'none' : 'default' }} />

          {/* Start Screen - Clean without rules */}
          {gameState === 'start' && (
            <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
              <div className={`rounded-2xl p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <Brain className="w-16 h-16 text-purple-500 mx-auto mb-4" />
                <h3 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Ghost-Link Tracking</h3>
                <p className={`mb-6 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>60s • Memorize 4 targets • Track with cursor</p>
                <button 
                  onClick={startGame} 
                  className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg w-full transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  Start Tracking
                </button>
              </div>
            </div>
          )}

          {/* Game Over Screen */}
          {gameState === 'gameOver' && (
            <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
              <div className={`rounded-2xl p-8 shadow-xl border w-[400px] ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <div className="flex items-center justify-center gap-3 mb-6">
                  <Award className="w-10 h-10 text-yellow-500" />
                  <h3 className={`text-2xl font-bold ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Session Complete!</h3>
                </div>
                
                <div className="text-center mb-8">
                  <p className={`text-lg mb-2 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>You tracked</p>
                  <p className={`text-5xl font-bold mb-2 ${correctCount === config.targets ? 'text-green-500' : correctCount >= 2 ? 'text-yellow-500' : 'text-red-500'}`}>
                    {correctCount}/{config.targets}
                  </p>
                  <p className={`text-lg ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>targets correctly!</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <ResultCard label="Final Score" value={score} icon={<Target className="w-4 h-4" />} color="text-blue-500" />
                  <ResultCard label="Best Score" value={bestScore} icon={<Trophy className="w-4 h-4" />} color="text-yellow-500" />
                </div>
                
                <div className="flex gap-4">
                  <Link 
                    href="/drills/visual"
                    className={`flex-1 px-4 py-2.5 rounded-lg font-semibold transition-all text-center ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                  >
                    ← Back
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

        {/* Rules Section - Below game container */}
        {!isFullscreen && (
          <div className="mt-6">
            <div className={`rounded-xl border overflow-hidden ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <div className={`px-4 py-3 border-b ${isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'}`}>
                <div className="flex items-center gap-2">
                  <Info className={`w-4 h-4 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
                  <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Multi-Object Tracking Rules</h3>
                </div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">1</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-purple-500">Memorize 4 GREEN targets</span> • 2 seconds
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">2</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-blue-500">Track original targets for 60s</span> • All balls turn white
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">3</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-green-500">Identify phase after 60s</span> • Click the 4 balls you tracked
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">4</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-orange-500">+5 points per correct ball</span> • Maximum 20 points
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">5</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-yellow-500">Select exactly 4 balls</span> • Confirm to see results
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-cyan-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">6</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-cyan-500">Best Score saves locally</span> • Try to get 20 points!
                      </p>
                    </div>
                  </div>
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
  const bgColor = color === 'text-blue-500' ? 'bg-blue-500/10' : 'bg-yellow-500/10';
  
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