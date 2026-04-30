'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Target, Zap, Clock, Award, Activity, 
  Volume2, VolumeX, Maximize2, Minimize2, Sun, Moon, 
  Eye, Timer, Radio, Brain, X, Trophy, Info, Check, Heart
} from 'lucide-react';

export default function NeuroSwitchPage() {
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
  const [bestReaction, setBestReaction] = useState(0);
  const [windowTime, setWindowTime] = useState(1000);
  const [timeLeft, setTimeLeft] = useState(60);
  const [lives, setLives] = useState(3);
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  const [successfulHits, setSuccessfulHits] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [greenHits, setGreenHits] = useState(0);
  const [redHits, setRedHits] = useState(0);
  const [currentCommand, setCurrentCommand] = useState('');
  const [penaltyCount, setPenaltyCount] = useState(0);
  
  const stateRef = useRef("IDLE");
  const activeCommandRef = useRef("");
  const startTimeRef = useRef(0);
  const windowTimeRef = useRef(1000);
  const minWindowTime = 300;
  const maxWindowTime = 1000;
  const streakRef = useRef(0);
  const scoreRef = useRef(0);
  const livesRef = useRef(3);
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const greenBallRef = useRef({ x: 0, y: 0, r: 22 });
  const redBallRef = useRef({ x: 0, y: 0, r: 22 });
  const audioCtxRef = useRef(null);
  const timeoutRef = useRef(null);
  const cycleTimeoutRef = useRef(null);
  const feedbackTimeoutRef = useRef(null);
  const timerIntervalRef = useRef(null);
  const isActiveRef = useRef(false);
  const gameStateRef = useRef('start');
  const currentSoundRef = useRef(null);
  const canClickRef = useRef(true);
  const waitingForNextRef = useRef(false);

  // Load best score from localStorage
  useEffect(() => {
    const savedBestScore = localStorage.getItem('neuroSwitchBestScore');
    if (savedBestScore) {
      setBestScore(parseInt(savedBestScore, 10));
    }
  }, []);

  const updateBestScore = (finalScore) => {
    const currentBestScore = parseInt(localStorage.getItem('neuroSwitchBestScore') || '0', 10);
    if (finalScore > currentBestScore) {
      localStorage.setItem('neuroSwitchBestScore', finalScore.toString());
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
      if (currentSoundRef.current) {
        try { currentSoundRef.current.stop(); } catch (e) {}
      }
      
      const audioCtx = initAudio();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      
      if (type === 'green') {
        osc.frequency.value = 1200;
        osc.type = 'sine';
        gain.gain.value = 0.15;
      } else if (type === 'red') {
        osc.frequency.value = 250;
        osc.type = 'sawtooth';
        gain.gain.value = 0.15;
      } else if (type === 'streak') {
        osc.frequency.value = 1046.5;
        osc.type = 'sine';
        gain.gain.value = 0.12;
      } else if (type === 'fail') {
        osc.frequency.value = 440;
        osc.type = 'sine';
        gain.gain.value = 0.1;
      } else if (type === 'penalty') {
        osc.frequency.value = 220;
        osc.type = 'square';
        gain.gain.value = 0.08;
      }
      
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      currentSoundRef.current = osc;
      
      gain.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 0.2);
      setTimeout(() => {
        try { osc.stop(); } catch (e) {}
        currentSoundRef.current = null;
      }, 200);
    } catch (e) {
      console.log('Audio error:', e);
    }
  };

  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      timerIntervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setGameState('gameOver');
            gameStateRef.current = 'gameOver';
            isActiveRef.current = false;
            clearAllTimeouts();
            
            const total = successfulHits + (3 - livesRef.current);
            const finalAccuracy = total === 0 ? 100 : Math.round((successfulHits / total) * 100);
            setAccuracy(finalAccuracy);
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
  }, [gameState, timeLeft, successfulHits]);

  const clearAllTimeouts = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (cycleTimeoutRef.current) clearTimeout(cycleTimeoutRef.current);
  };

  const spawn = () => {
    clearAllTimeouts();
    
    if (!isActiveRef.current || gameStateRef.current !== 'playing') return;
    
    const cvs = canvasRef.current;
    if (!cvs) return;
    
    const pad = 80;
    const minDistance = 80;
    
    // Generate positions with better spacing
    greenBallRef.current.x = pad + Math.random() * (cvs.width - pad * 2);
    greenBallRef.current.y = pad + Math.random() * (cvs.height - pad * 2);
    
    let attempts = 0;
    let validPosition = false;
    
    while (!validPosition && attempts < 50) {
      redBallRef.current.x = pad + Math.random() * (cvs.width - pad * 2);
      redBallRef.current.y = pad + Math.random() * (cvs.height - pad * 2);
      const distance = Math.hypot(greenBallRef.current.x - redBallRef.current.x, 
                                  greenBallRef.current.y - redBallRef.current.y);
      if (distance >= minDistance) {
        validPosition = true;
      }
      attempts++;
    }

    // Randomly choose target
    if (Math.random() > 0.5) {
      activeCommandRef.current = "GREEN";
      setCurrentCommand("GREEN");
      playSound('green');
    } else {
      activeCommandRef.current = "RED";
      setCurrentCommand("RED");
      playSound('red');
    }

    stateRef.current = "ACTIVE";
    startTimeRef.current = performance.now();
    canClickRef.current = true;
    waitingForNextRef.current = false;
    
    // Timeout for flash duration - no penalty for missing
    timeoutRef.current = setTimeout(() => {
      if (stateRef.current === "ACTIVE" && isActiveRef.current && !waitingForNextRef.current) {
        // Just move to next round without penalty for missing
        stateRef.current = "IDLE";
        moveToNextRound();
      }
    }, windowTimeRef.current);
  };

  const moveToNextRound = () => {
    if (waitingForNextRef.current) return;
    waitingForNextRef.current = true;
    clearAllTimeouts();
    stateRef.current = "FEEDBACK";
    
    setTimeout(() => {
      if (isActiveRef.current && gameStateRef.current === 'playing') {
        spawn();
      }
    }, 300);
  };

  const applyPenalty = () => {
    const penaltyAmount = 1;
    scoreRef.current = Math.max(0, scoreRef.current - penaltyAmount);
    setScore(scoreRef.current);
    setPenaltyCount(prev => prev + 1);
    showFeedback(`⚠️ -${penaltyAmount} point penalty!`, 'warning');
    playSound('penalty');
  };

  const fail = (reason) => {
    if (!isActiveRef.current) return;
    if (!canClickRef.current) return;
    
    clearAllTimeouts();
    canClickRef.current = false;
    
    streakRef.current = 0;
    setStreak(0);
    
    // Check if we still have lives
    if (livesRef.current > 0) {
      // Use a life
      livesRef.current -= 1;
      setLives(livesRef.current);
      showFeedback(`✗ ${reason}! -1 life`, 'error');
      playSound('fail');
    } else {
      // No lives left - apply penalty
      applyPenalty();
    }
    
    // Adjust window (loosen on mistake)
    windowTimeRef.current = Math.min(maxWindowTime, windowTimeRef.current + 50);
    setWindowTime(windowTimeRef.current);
    
    stateRef.current = "FEEDBACK";
    
    setTimeout(() => {
      if (isActiveRef.current && gameStateRef.current === 'playing') {
        spawn();
      }
    }, 500);
  };

  const handleSuccess = () => {
    if (!isActiveRef.current) return;
    if (!canClickRef.current) return;
    
    clearAllTimeouts();
    canClickRef.current = false;
    
    const reaction = Math.floor(performance.now() - startTimeRef.current);
    setSuccessfulHits(prev => prev + 1);
    
    if (activeCommandRef.current === "GREEN") {
      setGreenHits(prev => prev + 1);
    } else {
      setRedHits(prev => prev + 1);
    }
    
    if (bestReaction === 0 || reaction < bestReaction) {
      setBestReaction(reaction);
    }
    
    const newStreak = streakRef.current + 1;
    streakRef.current = newStreak;
    setStreak(newStreak);
    
    if (newStreak > bestStreak) {
      setBestStreak(newStreak);
    }
    
    // Add 1 point for correct click
    scoreRef.current += 1;
    setScore(scoreRef.current);
    
    if (newStreak % 5 === 0 && newStreak > 0) {
      playSound('streak');
      showFeedback(`🔥 ${newStreak} Streak! +1 point`, 'success');
    } else {
      showFeedback(`✓ Correct! +1 point (${reaction}ms)`, 'success');
    }
    
    // Adjust window (tighten on success)
    windowTimeRef.current = Math.max(minWindowTime, windowTimeRef.current - 25);
    setWindowTime(windowTimeRef.current);
    
    // Move to next round immediately
    moveToNextRound();
  };

  // Improved click handler with better detection
  const handleClick = useCallback((e) => {
    if (gameState !== 'playing' || !isActiveRef.current) return;
    if (stateRef.current !== "ACTIVE") return;
    if (!canClickRef.current) return;
    if (waitingForNextRef.current) return;
    
    const cvs = canvasRef.current;
    if (!cvs) return;
    
    const rect = cvs.getBoundingClientRect();
    const scaleX = cvs.width / rect.width;
    const scaleY = cvs.height / rect.height;
    const mouseX = (e.clientX - rect.left) * scaleX;
    const mouseY = (e.clientY - rect.top) * scaleY;
    
    mousePositionRef.current = { x: mouseX, y: mouseY };
    
    const greenBall = greenBallRef.current;
    const redBall = redBallRef.current;
    
    // Calculate distances
    const distToGreen = Math.hypot(mouseX - greenBall.x, mouseY - greenBall.y);
    const distToRed = Math.hypot(mouseX - redBall.x, mouseY - redBall.y);
    
    // Check if clicked on any circle (with improved hit radius)
    const hitRadius = greenBall.r + 5;
    
    if (distToGreen <= hitRadius) {
      e.preventDefault();
      e.stopPropagation();
      if (activeCommandRef.current === "GREEN") {
        handleSuccess();
      } else {
        fail("WRONG BALL");
      }
      return;
    }
    
    if (distToRed <= hitRadius) {
      e.preventDefault();
      e.stopPropagation();
      if (activeCommandRef.current === "RED") {
        handleSuccess();
      } else {
        fail("WRONG BALL");
      }
      return;
    }
  }, [gameState]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.addEventListener('mousedown', handleClick);
      return () => canvas.removeEventListener('mousedown', handleClick);
    }
  }, [handleClick]);

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
      clearAllTimeouts();
      if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      if (currentSoundRef.current) {
        try { currentSoundRef.current.stop(); } catch (e) {}
      }
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

    function draw() {
      ctx.fillStyle = isBoxDarkMode ? "#020202" : "#f9fafb";
      ctx.fillRect(0, 0, cvs.width, cvs.height);
      
      // Subtle grid
      ctx.strokeStyle = isBoxDarkMode ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)';
      ctx.lineWidth = 1;
      for (let i = 0; i < cvs.width; i += 40) {
        ctx.beginPath();
        ctx.moveTo(i, 0); ctx.lineTo(i, cvs.height); ctx.stroke();
      }

      if (stateRef.current === "ACTIVE" || stateRef.current === "FEEDBACK") {
        // Green circle - Simple 2D filled circle
        ctx.beginPath();
        ctx.arc(greenBallRef.current.x, greenBallRef.current.y, greenBallRef.current.r, 0, Math.PI * 2);
        ctx.fillStyle = "#4CAF50";
        ctx.fill();
        ctx.strokeStyle = "#2E7D32";
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Red circle - Simple 2D filled circle
        ctx.beginPath();
        ctx.arc(redBallRef.current.x, redBallRef.current.y, redBallRef.current.r, 0, Math.PI * 2);
        ctx.fillStyle = "#E53935";
        ctx.fill();
        ctx.strokeStyle = "#B71C1C";
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // Show current command at top
      if (stateRef.current === "ACTIVE") {
        ctx.font = "bold 20px Arial";
        ctx.textAlign = "center";
        ctx.fillStyle = activeCommandRef.current === "GREEN" ? "#4CAF50" : "#E53935";
        ctx.fillText(`CLICK ${activeCommandRef.current} CIRCLE`, cvs.width / 2, 50);
      }

      // Crosshair
      const m = mousePositionRef.current;
      if (m.x > 0 && m.x < cvs.width && m.y > 0 && m.y < cvs.height) {
        ctx.strokeStyle = "#00ff88";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(m.x - 15, m.y); ctx.lineTo(m.x + 15, m.y);
        ctx.moveTo(m.x, m.y - 15); ctx.lineTo(m.x, m.y + 15);
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
    setBestReaction(0);
    setWindowTime(1000);
    setTimeLeft(60);
    setLives(3);
    setSuccessfulHits(0);
    setAccuracy(100);
    setGreenHits(0);
    setRedHits(0);
    setFeedback('');
    setCurrentCommand('');
    setPenaltyCount(0);
    
    isActiveRef.current = true;
    stateRef.current = "IDLE";
    windowTimeRef.current = 1000;
    streakRef.current = 0;
    scoreRef.current = 0;
    livesRef.current = 3;
    activeCommandRef.current = "";
    canClickRef.current = true;
    waitingForNextRef.current = false;
    
    clearAllTimeouts();
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    
    if (audioCtxRef.current) {
      audioCtxRef.current.close();
      audioCtxRef.current = null;
    }
    
    setTimeout(() => {
      if (isActiveRef.current) {
        initAudio();
        spawn();
      }
    }, 300);
  };

  const resetGame = () => {
    isActiveRef.current = false;
    clearAllTimeouts();
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    
    setGameState('start');
    gameStateRef.current = 'start';
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setBestReaction(0);
    setWindowTime(1000);
    setTimeLeft(60);
    setLives(3);
    setSuccessfulHits(0);
    setAccuracy(100);
    setGreenHits(0);
    setRedHits(0);
    setFeedback('');
    setPenaltyCount(0);
    
    stateRef.current = "IDLE";
    windowTimeRef.current = 1000;
    streakRef.current = 0;
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
                <Radio className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Neuro-Switch</h1>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Audio-cued • High pitch=Green / Low pitch=Red</p>
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
          <StatCard icon={<Heart className="text-red-500" />} value={lives} label="Lives" isDark={isDarkMode} />
          <StatCard icon={<Radio className="text-gray-500" />} value={greenHits} label="Green" isDark={isDarkMode} />
        </div>

        {/* Feedback Bar */}
        <div className="h-8 mb-2 flex justify-center items-center">
          <div className={`px-4 py-1 rounded-lg text-white font-medium text-sm transition-opacity duration-150 ${feedback ? 'opacity-100' : 'opacity-0'} ${
            feedbackType === 'success' ? 'bg-green-500' : feedbackType === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
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
                Score: <span className="text-yellow-400">{score}</span> | Command: <span style={{color: currentCommand === 'GREEN' ? '#4CAF50' : '#E53935'}}>{currentCommand || 'WAIT'}</span>
              </div>
            </>
          )}

          <canvas ref={canvasRef} style={{ display: 'block', position: 'absolute', cursor: 'none' }} />

          {/* Start Screen - No rules here */}
          {gameState === 'start' && (
            <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 ${isBoxDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}`}>
              <div className={`rounded-2xl p-8 text-center max-w-md mx-4 shadow-xl border ${isBoxDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <Radio className="w-16 h-16 text-purple-500 mx-auto mb-4" />
                <h3 className={`text-2xl font-bold mb-2 ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Neuro-Switch</h3>
                <p className={`mb-6 ${isBoxDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>React to audio cues and click the matching circle</p>
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
                  <h3 className={`text-2xl font-bold ${isBoxDarkMode ? 'text-white' : 'text-gray-900'}`}>Session Complete!</h3>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <ResultCard label="Final Score" value={score} icon={<Target className="w-4 h-4" />} color="text-blue-500" />
                  <ResultCard label="Best Score" value={bestScore} icon={<Trophy className="w-4 h-4" />} color="text-yellow-500" />
                  <ResultCard label="Green Hits" value={greenHits} icon={<Radio className="w-4 h-4" />} color="text-green-500" />
                  <ResultCard label="Red Hits" value={redHits} icon={<Radio className="w-4 h-4" />} color="text-red-500" />
                  <ResultCard label="Best Streak" value={bestStreak} icon={<Zap className="w-4 h-4" />} color="text-orange-500" />
                  <ResultCard label="Best Reaction" value={bestReaction || '-'} unit="ms" icon={<Timer className="w-4 h-4" />} color="text-cyan-500" />
                  {penaltyCount > 0 && (
                    <ResultCard label="Penalties" value={penaltyCount} icon={<X className="w-4 h-4" />} color="text-red-500" />
                  )}
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

        {/* Rules Section - Below the drill box */}
        <div className="mt-6">
          <div className={`rounded-xl border overflow-hidden ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <div className={`px-4 py-3 border-b ${isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'}`}>
              <div className="flex items-center gap-2">
                <Info className={`w-4 h-4 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
                <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>How to Play</h3>
              </div>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">1</div>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      <span className="font-semibold text-purple-500">High pitch sound (1200Hz) = Click GREEN circle</span>
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">2</div>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      <span className="font-semibold text-red-500">Low pitch sound (250Hz) = Click RED circle</span>
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">3</div>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      <span className="font-semibold text-green-500">Correct click: +1 point</span>
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">4</div>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      <span className="font-semibold text-orange-500">Wrong click = -1 life</span>
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">5</div>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      <span className="font-semibold text-yellow-500">No lives left = -1 point penalty</span>
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-cyan-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">6</div>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      <span className="font-semibold text-cyan-500">Missing the click = No penalty, just next round</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className={`mt-3 pt-3 border-t text-xs ${isDarkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'} text-center`}>
                ⚡ 3 Lives • 60 second challenge • Save your best score! • Window adjusts: Success -25ms • Mistake +50ms
              </div>
            </div>
          </div>
        </div>
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
                   color === 'text-gray-500' ? 'bg-gray-500/10' :
                   color === 'text-red-500' ? 'bg-red-500/10' :
                   color === 'text-orange-500' ? 'bg-orange-500/10' :
                   color === 'text-green-500' ? 'bg-green-500/10' :
                   color === 'text-cyan-500' ? 'bg-cyan-500/10' : 'bg-purple-500/10';
  
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