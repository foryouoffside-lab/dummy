'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  Eye, Zap, Clock, Award, Volume2, VolumeX, Sun, Moon, 
  Target, ShieldCheck, Activity, Maximize2, Minimize2,
  ArrowLeft, Timer, X, Trophy, Info, TrendingUp, Heart, Check
} from 'lucide-react';

export default function ChromaSyncPage() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  
  // Drill State
  const [gameState, setGameState] = useState('start');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isBoxDarkMode, setIsBoxDarkMode] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  
  // Performance Metrics
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [lastReaction, setLastReaction] = useState(0);
  const [bestReaction, setBestReaction] = useState(0);
  const [displayWindow, setDisplayWindow] = useState(250);
  const [timeLeft, setTimeLeft] = useState(60);
  const [lives, setLives] = useState(3);
  const [successfulHits, setSuccessfulHits] = useState(0);
  const [feedbackMsg, setFeedbackMsg] = useState('');
  const [feedbackType, setFeedbackType] = useState('');

  // Game Refs
  const stateRef = useRef("WAITING");
  const currentTargetColorRef = useRef("#020202");
  const startTimeRef = useRef(0);
  const displayTimeRef = useRef(250);
  const minDisplayTime = 80;
  const maxDisplayTime = 400;
  const streakRef = useRef(0);
  const scoreRef = useRef(0);
  const livesRef = useRef(3);
  const initializedRef = useRef(false);
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const feedbackTimeoutRef = useRef(null);
  const cycleTimeoutRef = useRef(null);
  const signalTimeoutRef = useRef(null);
  const timerIntervalRef = useRef(null);
  const isActiveRef = useRef(false);
  const gameStateRef = useRef('start');
  const audioCtxRef = useRef(null);
  const canClickRef = useRef(true);

  const colorPalette = {
    GO: "#00ff77",      // Green - Click this
    NO_GO: "#ff3344"    // Red - Do NOT click
  };

  const ballRadius = 50;
  const ballCenter = { x: 0, y: 0 };

  // Load best score from localStorage
  useEffect(() => {
    const savedBestScore = localStorage.getItem('chromaSyncBestScore');
    if (savedBestScore) {
      setBestScore(parseInt(savedBestScore, 10));
    }
  }, []);

  // Update best score ONLY when game ends
  const updateBestScore = (finalScore) => {
    const currentBestScore = parseInt(localStorage.getItem('chromaSyncBestScore') || '0', 10);
    if (finalScore > currentBestScore) {
      localStorage.setItem('chromaSyncBestScore', finalScore.toString());
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
    setFeedbackMsg(message);
    setFeedbackType(type);
    feedbackTimeoutRef.current = setTimeout(() => {
      setFeedbackMsg('');
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
      } else if (type === 'streak') {
        osc.frequency.value = 1046.5;
        gain.gain.value = 0.12;
      } else if (type === 'inhibit') {
        osc.frequency.value = 660;
        gain.gain.value = 0.08;
      }
      osc.start();
      gain.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 0.12);
      osc.stop(audioCtx.currentTime + 0.12);
    } catch (e) {}
  };

  const isMouseOverBall = (mouseX, mouseY, centerX, centerY) => {
    const dist = Math.sqrt(Math.pow(mouseX - centerX, 2) + Math.pow(mouseY - centerY, 2));
    return dist <= ballRadius;
  };

  // 1 point for correct click
  const calculatePoints = (reaction) => {
    return 1;
  };

  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      timerIntervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setGameState('gameOver');
            gameStateRef.current = 'gameOver';
            isActiveRef.current = false;
            if (cycleTimeoutRef.current) clearTimeout(cycleTimeoutRef.current);
            if (signalTimeoutRef.current) clearTimeout(signalTimeoutRef.current);
            
            updateBestScore(scoreRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [gameState, timeLeft]);

  const startCycle = () => {
    if (!isActiveRef.current) return;
    if (cycleTimeoutRef.current) clearTimeout(cycleTimeoutRef.current);
    if (signalTimeoutRef.current) clearTimeout(signalTimeoutRef.current);
    
    stateRef.current = "WAITING";
    currentTargetColorRef.current = "#151515";
    canClickRef.current = true;
    
    const delay = 600 + Math.random() * 900;
    
    cycleTimeoutRef.current = setTimeout(() => {
      if (stateRef.current !== "WAITING" || gameState !== 'playing' || !isActiveRef.current) return;
      
      stateRef.current = "SIGNAL";
      
      const isGo = Math.random() < 0.5;
      
      if (isGo) {
        currentTargetColorRef.current = colorPalette.GO;
        startTimeRef.current = performance.now();
        
        signalTimeoutRef.current = setTimeout(() => {
          if (stateRef.current === "SIGNAL" && currentTargetColorRef.current === colorPalette.GO && isActiveRef.current) {
            // Flash ended - NO PENALTY for missing green
            stateRef.current = "WAITING";
            startCycle();
          }
        }, displayTimeRef.current);
      } else {
        currentTargetColorRef.current = colorPalette.NO_GO;
        
        signalTimeoutRef.current = setTimeout(() => {
          if (stateRef.current === "SIGNAL" && isActiveRef.current) {
            // Successfully avoided clicking red
            stateRef.current = "WAITING";
            const newStreak = streakRef.current + 1;
            streakRef.current = newStreak;
            setStreak(newStreak);
            
            if (newStreak > bestStreak) {
              setBestStreak(newStreak);
            }
            
            playSound('inhibit');
            showFeedback(`✓ Good restraint!`, 'success');
            startCycle();
          }
        }, displayTimeRef.current);
      }
    }, delay);
  };

  const applyPenalty = (reason) => {
    if (!isActiveRef.current) return;
    
    streakRef.current = 0;
    setStreak(0);
    
    // Lose 1 life on mistake (only when clicking wrong)
    if (livesRef.current > 0) {
      livesRef.current -= 1;
      setLives(livesRef.current);
      showFeedback(`✗ ${reason}! -1 life`, 'error');
      playSound('fail');
      
      // Check if lives reached 0
      if (livesRef.current === 0) {
        scoreRef.current = Math.max(0, scoreRef.current - 1);
        setScore(scoreRef.current);
        showFeedback(`⚠️ No lives left! -1 point penalty!`, 'warning');
      }
    } else {
      scoreRef.current = Math.max(0, scoreRef.current - 1);
      setScore(scoreRef.current);
      showFeedback(`✗ ${reason}! -1 point penalty!`, 'error');
      playSound('fail');
    }
    
    displayTimeRef.current = Math.min(maxDisplayTime, displayTimeRef.current + 40);
    setDisplayWindow(displayTimeRef.current);
  };

  useEffect(() => {
    const handleMouseDown = (e) => {
      if (!initializedRef.current || gameState !== 'playing' || !isActiveRef.current) return;
      
      const cvs = canvasRef.current;
      if (!cvs) return;
      
      const rect = cvs.getBoundingClientRect();
      const scaleX = cvs.width / rect.width;
      const scaleY = cvs.height / rect.height;
      const mouseX = (e.clientX - rect.left) * scaleX;
      const mouseY = (e.clientY - rect.top) * scaleY;
      
      const centerX = cvs.width / 2;
      const centerY = cvs.height / 2;
      
      if (!isMouseOverBall(mouseX, mouseY, centerX, centerY)) return;

      if (stateRef.current === "SIGNAL") {
        if (currentTargetColorRef.current === colorPalette.GO) {
          // CORRECT: Clicked GREEN ball
          const reaction = Math.floor(performance.now() - startTimeRef.current);
          setLastReaction(reaction);
          setSuccessfulHits(prev => prev + 1);
          
          if (bestReaction === 0 || reaction < bestReaction) {
            setBestReaction(reaction);
          }
          
          const pointsEarned = calculatePoints(reaction);
          scoreRef.current += pointsEarned;
          setScore(scoreRef.current);
          
          const newStreak = streakRef.current + 1;
          streakRef.current = newStreak;
          setStreak(newStreak);
          
          if (newStreak > bestStreak) {
            setBestStreak(newStreak);
          }
          
          if (newStreak % 5 === 0 && newStreak > 0) {
            playSound('streak');
            showFeedback(`🔥 ${newStreak} Streak! +${pointsEarned} point`, 'success');
          } else {
            playSound('success');
            showFeedback(`✓ ${reaction}ms | +${pointsEarned} point`, 'success');
          }
          
          // Adjust window based on reaction time
          let speedDiff = displayTimeRef.current - reaction;
          if (speedDiff > 50) {
            displayTimeRef.current = Math.max(minDisplayTime, displayTimeRef.current - 20);
          } else if (speedDiff < 10) {
            displayTimeRef.current = Math.min(maxDisplayTime, displayTimeRef.current + 15);
          }
          setDisplayWindow(displayTimeRef.current);
          
          if (signalTimeoutRef.current) clearTimeout(signalTimeoutRef.current);
          
          stateRef.current = "WAITING";
          startCycle();
        } else if (currentTargetColorRef.current === colorPalette.NO_GO) {
          // PENALTY: Clicked RED ball
          if (cycleTimeoutRef.current) clearTimeout(cycleTimeoutRef.current);
          if (signalTimeoutRef.current) clearTimeout(signalTimeoutRef.current);
          
          applyPenalty("CLICKED RED");
          
          stateRef.current = "WAITING";
          
          setTimeout(() => {
            if (gameState === 'playing' && isActiveRef.current) {
              startCycle();
            }
          }, 400);
        }
      } else if (stateRef.current === "WAITING") {
        // PENALTY: Clicked when no signal (early click)
        if (cycleTimeoutRef.current) clearTimeout(cycleTimeoutRef.current);
        if (signalTimeoutRef.current) clearTimeout(signalTimeoutRef.current);
        
        applyPenalty("EARLY CLICK");
        
        stateRef.current = "WAITING";
        
        setTimeout(() => {
          if (gameState === 'playing' && isActiveRef.current) {
            startCycle();
          }
        }, 400);
      }
    };
    
    window.addEventListener('mousedown', handleMouseDown);
    return () => window.removeEventListener('mousedown', handleMouseDown);
  }, [gameState, bestReaction]);

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
      
      if (!initializedRef.current && gameState === 'playing') {
        initializedRef.current = true;
        startCycle();
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [gameState]);

  useEffect(() => {
    return () => {
      if (cycleTimeoutRef.current) clearTimeout(cycleTimeoutRef.current);
      if (signalTimeoutRef.current) clearTimeout(signalTimeoutRef.current);
      if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
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
    };

    const resizeObserver = new ResizeObserver(() => updateCanvasSize());
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    
    window.addEventListener('resize', updateCanvasSize);
    updateCanvasSize();

    function draw() {
      ctx.fillStyle = isBoxDarkMode ? "#020202" : "#f9fafb";
      ctx.fillRect(0, 0, cvs.width, cvs.height);
      
      ctx.strokeStyle = isBoxDarkMode ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)';
      ctx.lineWidth = 1;
      for (let i = 0; i < cvs.width; i += 40) {
        ctx.beginPath();
        ctx.moveTo(i, 0); ctx.lineTo(i, cvs.height); ctx.stroke();
      }
      
      const centerX = cvs.width / 2;
      const centerY = cvs.height / 2;
      ballCenter.x = centerX;
      ballCenter.y = centerY;
      
      ctx.beginPath();
      ctx.arc(centerX, centerY, ballRadius, 0, Math.PI * 2);
      
      if (stateRef.current === "SIGNAL" && initializedRef.current) {
        ctx.fillStyle = currentTargetColorRef.current;
        ctx.shadowBlur = currentTargetColorRef.current === colorPalette.GO ? 35 : 20;
        ctx.shadowColor = currentTargetColorRef.current;
      } else {
        ctx.fillStyle = isBoxDarkMode ? "#151515" : "#e0e0e0";
        ctx.shadowBlur = 0;
      }
      ctx.fill();
      ctx.shadowBlur = 0;
      
      ctx.beginPath();
      ctx.arc(centerX, centerY, ballRadius - 3, 0, Math.PI * 2);
      ctx.strokeStyle = isBoxDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)";
      ctx.lineWidth = 1;
      ctx.stroke();
      
      ctx.beginPath();
      ctx.arc(centerX, centerY, 4, 0, Math.PI * 2);
      ctx.fillStyle = stateRef.current === "SIGNAL" ? "#000000" : (isBoxDarkMode ? "#333333" : "#999999");
      ctx.fill();
      
      const mouse = mousePositionRef.current;
      if (mouse.x > 0 && mouse.x < cvs.width && mouse.y > 0 && mouse.y < cvs.height) {
        const isOverBall = isMouseOverBall(mouse.x, mouse.y, centerX, centerY);
        const isValidTarget = stateRef.current === "SIGNAL" && currentTargetColorRef.current === colorPalette.GO;
        
        ctx.strokeStyle = isOverBall && isValidTarget ? "#00ff88" : (isBoxDarkMode ? "#666666" : "#cccccc");
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(mouse.x - 15, mouse.y);
        ctx.lineTo(mouse.x + 15, mouse.y);
        ctx.moveTo(mouse.x, mouse.y - 15);
        ctx.lineTo(mouse.x, mouse.y + 15);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 12, 0, Math.PI * 2);
        ctx.strokeStyle = isOverBall && isValidTarget ? 'rgba(0, 255, 136, 0.5)' : 'rgba(255, 255, 255, 0.2)';
        ctx.stroke();
        
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = isOverBall && isValidTarget ? "#00ff88" : (isBoxDarkMode ? "#888888" : "#666666");
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
    setStreak(0);
    setBestStreak(0);
    setLastReaction(0);
    setBestReaction(0);
    setDisplayWindow(250);
    setTimeLeft(60);
    setLives(3);
    setSuccessfulHits(0);
    setFeedbackMsg('');
    
    isActiveRef.current = true;
    stateRef.current = "WAITING";
    displayTimeRef.current = 250;
    streakRef.current = 0;
    scoreRef.current = 0;
    livesRef.current = 3;
    initializedRef.current = false;
    currentTargetColorRef.current = "#151515";
    canClickRef.current = true;
    
    if (cycleTimeoutRef.current) clearTimeout(cycleTimeoutRef.current);
    if (signalTimeoutRef.current) clearTimeout(signalTimeoutRef.current);
  };

  const resetGame = () => {
    isActiveRef.current = false;
    setGameState('start');
    gameStateRef.current = 'start';
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setLastReaction(0);
    setBestReaction(0);
    setDisplayWindow(250);
    setTimeLeft(60);
    setLives(3);
    setSuccessfulHits(0);
    setFeedbackMsg('');
    
    stateRef.current = "WAITING";
    displayTimeRef.current = 250;
    streakRef.current = 0;
    initializedRef.current = false;
    
    if (cycleTimeoutRef.current) clearTimeout(cycleTimeoutRef.current);
    if (signalTimeoutRef.current) clearTimeout(signalTimeoutRef.current);
  };

  return (
    <div className={`min-h-screen select-none ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6">
          <Link href="/drills/visual" className={`inline-flex items-center gap-2 mb-4 ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>
            <ArrowLeft className="w-4 h-4" /> Back to Visual Drills
          </Link>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-green-500 to-teal-600 rounded-xl">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Chroma-Sync Lab</h1>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Click GREEN only • Never click RED</p>
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
          <StatCard icon={<Trophy className="text-yellow-500" />} value={bestScore} label="Best" isDark={isDarkMode} />
          <StatCard icon={<Timer className={timeLeft < 15 ? 'text-red-600' : 'text-green-600'} />} value={timeLeft} label="Time" unit="s" isDark={isDarkMode} />
          <StatCard icon={<Zap className="text-orange-500" />} value={streak} label="Streak" isDark={isDarkMode} />
          <StatCard icon={<Activity className="text-purple-500" />} value={bestReaction || '-'} label="Best RT" unit="ms" isDark={isDarkMode} />
          <StatCard icon={<Heart className="text-red-500" />} value={lives} label="Lives" isDark={isDarkMode} />
        </div>

        {/* Feedback Bar */}
        <div className="h-8 mb-2 flex justify-center items-center">
          <div className={`px-4 py-1 rounded-lg text-white font-medium text-sm transition-opacity duration-150 ${feedbackMsg ? 'opacity-100' : 'opacity-0'} ${
            feedbackType === 'success' ? 'bg-green-500' : feedbackType === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
          }`}>
            {feedbackMsg || 'placeholder'}
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
                Score: <span className="text-yellow-400">{score}</span> | Window: <span className="text-cyan-400">{displayWindow}ms</span> | Lives: <span className="text-red-400">{lives}</span>
              </div>
            </>
          )}

          <canvas ref={canvasRef} style={{ display: 'block', position: 'absolute' }} />

          {/* Start Screen */}
          {gameState === 'start' && (
            <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
              <div className={`rounded-2xl p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <Target className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Chroma-Sync Lab</h3>
                <p className={`mb-6 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>60-second challenge • Click GREEN only</p>
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
                  <ResultCard label="Best Streak" value={bestStreak} icon={<Zap className="w-4 h-4" />} color="text-orange-500" />
                  <ResultCard label="Best Reaction" value={bestReaction || '-'} unit="ms" icon={<Timer className="w-4 h-4" />} color="text-cyan-500" />
                  <ResultCard label="Green Hits" value={successfulHits} icon={<Check className="w-4 h-4" />} color="text-green-500" />
                  <ResultCard label="Lives Lost" value={3 - lives} icon={<Heart className="w-4 h-4" />} color="text-red-500" />
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
                        <span className="font-semibold text-green-500">GREEN ball appears</span> • Click it for +1 point
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">2</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-red-500">RED ball appears</span> • DO NOT click
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">3</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-orange-500">Clicking RED or clicking early</span> • -1 life
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">4</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-purple-500">3 Lives system</span> • No lives left = -1 point penalty
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">5</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-blue-500">5 streak = bonus sound</span> • Build your streak!
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-cyan-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">6</div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-cyan-500">Missing GREEN = No penalty</span> • Just wait for next flash
                      </p>
                    </div>
                  </div>
                </div>
                <div className={`mt-3 pt-3 border-t text-xs ${isDarkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'} flex items-center justify-between`}>
                  <span>🟢 Click GREEN = +1 point • 🔴 Click RED = -1 life</span>
                  <span>⚡ Missing GREEN = No penalty • Cursor turns green on valid target</span>
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
                   color === 'text-cyan-500' ? 'bg-cyan-500/10' :
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